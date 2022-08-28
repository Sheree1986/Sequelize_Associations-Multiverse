const Sequelize = require("sequelize");
const {demoDB} = require("../demoDB");

/*
    Two Methods: 
        1. Extending the Model Class
        2. Using Define
*/

/* 
    Method 1: Extending the Model Class
    SQL Query: 

    CREATE TABLE orders (
        orderID INT AUTO INCREMENT PRIMARY KEY,
        customerID INT NOT NULL,
        productID INT NOT NULL,
        FOREIGN KEY (customerID) REFERENCES customers(id)
        FOREIGN KEY (productID) REFERENCES products(id)
    )
*/

// This is the first table that introduce the need to "associate"...
// I know this, because I have several foreign keys in this table
// Self Note, if it is, then I'm kinf of hype about my own lesson, because this is solidifying this HARD

