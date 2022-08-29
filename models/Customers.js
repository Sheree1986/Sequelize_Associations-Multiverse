const {demoDB} = require("../demoDB");
const {Sequelize, Model} = require("sequelize");

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

      - In SQL, the following query is what we are accomplishing here: 
        CREATE TABLE customers (
            first_name: VARCHAR(20), 
            last_name: VARCHAR(20), 
            age: INT
        );
*/

// class Customers extends Model {}

// Customers.init({
//     first_name: {
//         type: Sequelize.STRING
//     }, 
//     last_name: {
//         type: Sequelize.STRING
//     },
//     age: {
//        type: Sequelize.INTEGER
//     }
// },{
//     demoDB,
//     modelName: "customers"
// });

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

/*
    It's actually so cool, that this gets very specific with SQL. For example: 
    In SQL:

    CREATE TABLE customers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(20) DEFAULT "John",
        last_name VARCHAR(20) DEFAULT "Doe",
        age INT NOT NULL
    )

    ^^ That is a semi complicated query. But we can still replicate in using Sequelize
*/

// Method 1: Extending the Class Model

// class Customers extends Model {}

// Customers.init({
//     // id
//     id: {
//         type: Sequelize.INTEGER, // INT
//         autoIncrement: true, // AUTO_INCREMENT
//         primaryKey: true // PRIMARY KEY
//     },
//     // first_name
//     first_name: {
//         type: Sequelize.STRING, // VARCHAR(x)
//         default: "John" // DEFAULT "John"
//     },
//     // last_name
//     last_name: {
//         type: Sequelize.STRING, // VARCHAR(x)
//         default: "Doe" // DEFAULT "Doe"
//     },
//     // age
//     age: {
//         type: Sequelize.INTEGER, // INT
//         allowNull: false // NOT NULL
//     }
// });

// Method 2: Using the .define() method. This will implicitly convert into the class to create the Model instance for you to define your tables in your DB.

const Customer = demoDB.define("customers", {
    //id
    id: {
        type: Sequelize.INTEGER, // INT
        autoIncrement: true, // AUTO_INCREMENT
        primaryKey: true // PRIMARY KEY
    },
    // first_name
    first_name: {
        type: Sequelize.STRING, // VARCHAR(x)
        defaultValue: "John" // DEFAULT "John"
    },
    // last_name
    last_name: {
        type: Sequelize.STRING, // VARCHAR(x)
        defaultValue: "Doe" // DEFAULT "Doe"
    },
    // age
    age: {
        type: Sequelize.INTEGER, // INT
        allowNull: false // NOT NULL
    }
});

module.exports = {
    Customer
}