/*
 - We learned about OOP in Week 5? Recall in particular "Classes"
 - This import will allow you to use the Sequelize Class, without having defined it yourself
*/
const {Sequelize} = require("sequelize");
const path = require('path');

/*
 - We can create an instance of our Sequelize Class, which will represent our database. 
 - I will call it demoDB to make that more clear. 
 - The same way we give our databases a name, this is the name of our database in our Node File.
*/
const demoDB = new Sequelize({
    dialect: "sqlite",
    storage: path.join(__dirname, "db.sqlite"),
    logging: false
});

/*
    Here we are exporting our newly created database to be used in other modules/files!

    Recap: 
        1. Require/Import the Sequelize Class from the sequelize module/package.
        2. Create an instance of your Sequelize Class and define it's specs, this will be your database instance: 
            a. What type of DB is it?
                - Could be MySQL
                - Could be PostgreSQL
                - In this case, it's SQLite
            b. Where is the database stored/located to be accessed and worked with
            c. Optionally: Do you want to turn off logging on the console
*/
module.exports = {
    demoDB
};