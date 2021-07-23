const mysql = require('mysql2');

// db pool orqali ulanish hosil qilamiz .....
const pool = mysql.createPool({
    host: '45.12.212.172',
    user: 'admin',
    password: "in_CRM2021",
    database: 'shafran',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    multipleStatements: true
});

// db mavjud mavjud emasligiga tekshiramiz ....
pool.getConnection((err, conn) => {
    // db ulanmasa .....
    if (err) return console.log(err);
    // db ulansa ....
    console.log('Databasega ulandi !!!')
});

module.exports = pool