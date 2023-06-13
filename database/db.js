const mysql = require('mysql2');

// db pool orqali ulanish hosil qilamiz .....
const pool = mysql.createPool({
    // host: 'localhost',
    // // host: 'localhost',
    // user: 'root',
    // password: "2432",
    // database: 'ecommerce_shop',
    // waitForConnections: true,
    // connectionLimit: 10,
    // queueLimit: 0,
    // multipleStatements: true,

    host: '90.85.182.208',
    // host: 'localhost',
    user: 'root',
    password: "Root#2021",
    database: 'ecommerce_shop',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    multipleStatements: true,

    
    
});

// db mavjud mavjud emasligiga tekshiramiz ....
pool.getConnection((err, conn) => {
    // db ulanmasa .....
    if (err) return console.log(err);
    // db ulansa ....
    console.log('Databasega ulandi !!!')
});

module.exports = pool
