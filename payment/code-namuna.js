

var http = require('http');
var PAYCOM_PASSWORD = '3305e3bab097f420a62ced01';

//Обрабатываем HTTP запрос
http.createServer(function(request, response) {
    //проверяем HTTP метод,     
    if( request.method !== 'POST' ) {
        //если он отличается от POST возвращаем ошибку -32300
        return sendResponse(RPCErrors.TransportError(), null)
    }

    //проверяем авторизацию запроса.
    if( !checkAuth(request.headers['authorization']) ) {
        //если запрос авторизован возвращаем ошибку -32504
        return sendResponse(RPCErrors.AccessDeniet(), null);
    }

    var id; //id RPC запроса

    //получаем POST Данные
    request.on('data', function(data) {
        try {
            //парсим запрос
            data = JSON.parse(data.toString());
            id = data.id;
        }
        catch(e) {
            //в случае ошибки при парсинге данных,
            // возвращаем ошибку -32700
            return sendResponse(RPCErrors.ParseError(), null);
        }

        //Проверяем существует ли запрашиваемый метод
        if( !Biling[data.method] ) {
            //Если запрашиваемый метод не поддерживается, 
            //возвращаем ошибку -32601
            return sendResponse(RPCErrors.MethodNotFound(), null);
        }

        
        try {
            //Вызываем запрашиваемый метод, и возвращаем клиенту результат.
            var result = Biling[data.method](data.params);
            sendResponse(null, result);
        }
        catch(error) {
            //если метод выбросил ошибку то возвращаем клиенту ошибку
            sendResponse(error, null);
        }
    });

    //возвращаем результат обработки запроса
    function sendResponse(error, result) {
        response.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8'
        });

        response.end(JSON.stringify({
            jsonrpc: "2.0",
            error : error || undefined,
            result : result || undefined,
            id : id
        }));
    }
}).listen(1388, '127.0.0.1');


//проверка заголовка авторизации
function checkAuth(auth) {
    return  auth                                                             //проверяем существование заголовка
            && (auth = auth.trim().split(/ +/))                              //разделяем заголовок на 2 части
            && auth[0] === 'Basic' && auth[1]                                //проверяем правильность формата заголовка
         //   ((auth = (new Buffer(auth[1], 'base64')).toString('utf-8'))   //декодируем из base64
            && (auth = auth.trim().split(/ *: */))                           //разделяем заголовок на логин пароль
            && auth[0] === 'Paycom'                                          //проверяем логин
            && auth[1] === PAYCOM_PASSWORD                                   //проверяем пароль
}



var Orders = {};          //коллекция с заказами
var Transactions = {};    //коллекция с транзакциями
var TransactionsGUI = 1;  //счетчик транзакций


var Biling = {
    //Основное назначение метода проверить доступность заказа для оплаты, 
    //и сверить сумму транзакции с суммой заказа
    //также можно внести свои необходимые бизнес правила
    CheckPerformTransaction: function (params)
    {
        //ищем заказ в базе данных
        var order = Orders[params.account.order];
        if( !order ) {
            //если заказа не существует, возвращаем ошибку -31050 .. -31099
            throw BilingErrors.OrderNotFound();
        }

        //проверяем доступен ли заказ для оплаты
        if( order.state !== 0 ) {
            //Если заказ уже оплачен или ожидает завершения оплаты, 
            //возвращаем ошибку -31050 .. -31099
            throw BilingErrors.OrderAvailable();
        }

        //сверяем сумму заказа с суммой транзакции
        if( order.amount * 100 !== params.amount ) {
            //если сумма заказа и сумма транзакции не совпадают, 
            //возвращаем ошибку -31001
            throw BilingErrors.IncorrectAmount();
        }

        //Далее можно добавить необходимой бизнес логики для 
        //проверки на разрешение создания транзакции

        return { 
            allow : true 
        };
    },

    CreateTransaction: function (params)
    {
        //пытаемся найти транзакцию в базе 
        var transaction = Transactions[params.id];
        if( transaction ) {
            //если такая транзакция уже есть в базе
            //проверяем состояние транзакции,            
            if( transaction.state !== 1 ) {
                //если транзакция оплачена (state == 2) или отменена (state == -1|-2), 
                //возвращаем ошибку -31008
                throw BilingErrors.UnexpectedTransactionState();                
            }
            
            //если транзакция находится в начальном состоянии (state == 1)
            //возвращаем ее результат и заканчиваем выполнение метода
            return {
                state : transaction.state,
                create_time : transaction.create_time,
                transaction : transaction.transaction.toString()
            };
        }

        //если транзакции в базе нету        
        try {
            //проверяем можно ли оплатить заказ  вызывая внутри метод CheckPerformTransaction
            Biling.CheckPerformTransaction(params);
        }
        catch(error) {
            //если метод CheckPerformTransaction вернул ошибку,
            //то пробрасываем ее наверх и завершаем выполнение метода CreateTransaction
            throw error;
        }

        //если заказ свободен и можно его оплатиь
        //создаем транзакцию и добовляем ее в базу
        transaction = {
            id: params.id,
            time: params.time,
            state : 1,                //ставим начальное состояние транзакции
            create_time : Date.now(), //отмечаем время когда транзакция была создана
            perform_time : 0,         
            cancel_time : 0,
            transaction : TransactionsGUI++,
            order : params.account.order,
            reason: null
        };

        Transactions[params.id] = transaction;

        //блокируем заказ, чтобы его было невозможно изменить или оплатить другой транзакцией
        var order = Orders[transaction.order];
        order.state = 1;

        //возвращаем результат
        return {
            state : transaction.state,
            create_time : transaction.create_time,
            transaction : transaction.transaction.toString()
        };
    },

    PerformTransaction: function (params)
    {
        //пытаемся найти транзакцию в базе 
        var transaction = Transactions[params.id];        
        if( !transaction ) {
            //если транзакция не найденна, возвращаем ошибку -31003
            throw BilingErrors.TransactionNotFound();
        }

        //если транзакция находится в начальном состоянии (state == 1)
        if( transaction.state === 1 ) {
            //помечаем заказ как оплаченый
            var order = Orders[transaction.order];
            order.state = 2;

            //Делаем чтото полезное

            //помечаем транзакцию завершенной
            transaction.state = 2;                  //ставим состояние транзакции в завершена (state = 2)
            transaction.perform_time = Date.now();  //отмечаем время завершения транзакции
        }
        
        //если транзакция завершена
        //возвращаем успешный результат
        if( transaction.state === 2 ) {
            return {
                state : transaction.state,
                perform_time : transaction.perform_time,
                transaction : transaction.transaction.toString()
            };
        }

        //в случае если транзакция отменена
        //возвращаем ошибку -31008
        throw BilingErrors.UnexpectedTransactionState();
    },

    CancelTransaction: function (params)
    {
        //пытаемся найти транзакцию в базе 
        var transaction = Transactions[params.id];
        if( !transaction ) {
            //если транзакция не найденна, возвращаем ошибку -31003
            throw BilingErrors.TransactionNotFound();
        }

        //Находим заказ за который была совершена транзакция
        var order = Orders[transaction.order];
        
        //если транзакция еще не завершена
        if( transaction.state === 1 ) {
            //отменяем транзакцию
            transaction.state = -1;               //помечаем транзакцию как отмененную (state = -1)
            transaction.reason = params.reason;   //ставим причину отмены
            transaction.cancel_time = Date.now(); //ставим время отмены транзакции

            //освобождаем заказ, чтобы была возможность его оплатить другой транзацией
            order.state = 0;
        }

        //если транзакция уже завершена
        //ВНИМАНИЕ: Данная часть логики, сугубо индивидуально для каждого бизнеса,
        //тут приведен общий случай
        if( transaction.state === 2 ) {
            //если заказ уже выполнен в полной мере и не подлежит отмене
            if( order.state === 3 ) {
                //возвращаем ошибку -31007
                throw BilingErrors.OrderNotСanceled();

                //если бизнес процесы позволяют отменить заказ в любой момент времени,
                //данную часть логики можно опустить
            }

            //если заказ еще возможно отменить
            if( order.state === 2 ) {
                transaction.state = -2;               //помечаем транзакцию отмененной (state = -2)
                transaction.reason = params.reason;   //ставим причину отмены
                transaction.cancel_time = Date.now(); //ставим время отмены транзакции

                //отменяем и блокируем заказ
                order.state = -2;

                //если бизнес процесс позволяет снова оплатить заказ после отмены
                //то можно вернуть заказ в начальное состояние, 
                //чтобы его можно было снова оплатить другой транзакцией
                //order.state = 0;
            }
        }

        //возвращаем результат отмены транзакции
        return {
            state : transaction.state,
            cancel_time : transaction.cancel_time,
            transaction : transaction.transaction.toString()
        };
    },

    CheckTransaction: function (params, callback)
    {
        //пытаемся найти транзакцию в базе
        var transaction = Transactions[params.id];
        if( !transaction ) {
            //если транзакция не найденна, возвращаем ошибку -31003
             throw BilingErrors.TransactionNotFound();
        }

        //если транзакция найдена, то возвращаем все ее параметры
        return {
            state : transaction.state,
            create_time : transaction.create_time,
            perform_time : transaction.perform_time,
            cancel_time: transaction.cancel_time,
            transaction : transaction.transaction.toString(),
            reason: transaction.reason
        };
    }
};


var RPCErrors = {
    TransportError: function () {
        return {
            code : -32300,
            message : 'Transport Error',
            data : null
        }
    },

    AccessDeniet: function() {
        return {
            code : -32504,
            message : 'AccessDeniet',
            data : null
        }
    },

    ParseError: function() {
        return {
            code : -32700,
            message : 'Parse Error',
            data : null
        }
    },

    MethodNotFound: function() {
        return {
            code : -32601,
            message : 'Method not found',
            data : null
        }
    }
};


var BilingErrors = {
    TransactionNotFound: function() {
        return {
            code : -31003,
            message : 'Транзакция не найденна',
            data : null
        }
    },

    UnexpectedTransactionState: function() {
        return {
            code : -31008,
            message : {
                'ru': 'Статус транзакции не позволяет выполнить операцию'
            },
            data : null
        }
    },

    IncorrectAmount: function() {
        return {
            code : -31001,
            message : {
                'ru' : 'Неверная сумма заказа'
            },
            data : null
        }
    },

    OrderNotFound: function() {
        return {
            code : -31050,
            message : {
                'ru' : 'Заказ не найден'
            },
            data : 'order'
        }
    },

    OrderAvailable: function() {
        return {
            code : -31051,
            message : {
                'ru': 'Не возможно выполнить операцию. Заказ ожидает оплаты или оплачен.'
            },
            data : 'order'
        }
    },

    OrderNotСanceled: function() {
        return {
            code : -31007,
            message : {
                'ru': 'Заказ полность выполнен и не подлежит отмене.'
            },
            data : null
        }
    }
};