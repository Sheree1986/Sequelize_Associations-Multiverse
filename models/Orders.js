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