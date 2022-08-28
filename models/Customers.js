const {demoDB} = require("../demoDB");
const Sequelize = require("sequelize");

/*
    A Model is a Table in your Database

    So far, my database is my Sequelize instance named demoDB. 
    I am now creating my first Sequelize Model Class so that I can create an instance of it which will represent a table in my demoDB database instance

    Database: Sequelize  ->   Database Instance: demoDB
    Model : Customers    ->   Model Instance: customersTable
*/

/* 
    You can extend the Model Class. Which means whatever you create IS A model
    You just define the "init" method of the Model class on your instance to actually define the specs of your table
*/

class Customers extends Model {}

Customers.init({
    first_name: {
        type: Sequelize.STRING
    }, 
    last_name: {
        type: Sequelize.STRING
    },
    age: {
       type: Sequelize.INTEGER
    }
},{
    demoDB,
    modelName: "customers"
});

/* This is the simplest way to do it

        - In SQL, the following query is what we are accomplishing here: 
        CREATE TABLE customers (
            first_name: VARCHAR(20), 
            last_name: VARCHAR(20), 
            age: INT
        );
*/
// const Customers = demoDB.define("customers", {
//     id: Seqeulize.INT,
//     first_name: Sequelize.STRING,
//     last_name: Sequelize.STRING,
//     age: Sequelize.INT
// });

/*
    In SQL, you can have constraints on your queries. Such as, "LIKE", "WHERE", "NOT LIKE", "NOT NULL"
    We can represent this information as part of what belongs to the field beyong just its data type, but we must contain all that in an object to encapsulate the features of each field.

    For example, in SQL: 
    CREATE TABLE customers (
        id INT NOT NULL, 
        first_name VARCHAR(20) NOT NULL,
        last_name VARCHAR(20) NOT NULL,
        age INT NOT NULL
    )
*/

// const Customers = demoDB.define("customers", {
//     id: {
//         type: Sequelize.INTEGER,
//         allowNull: false
//     },
//     first_name: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     last_name: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     age: {
//         type: Sequelize.STRING,
//         allowNull: false
//     }
// })

