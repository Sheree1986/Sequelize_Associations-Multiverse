const {demoDB} = require("../demoDB");
const Sequelize = require("sequelize");

// class Products extends Model {}

// Products.init({
//     id: {
//         type: Sequelize.INTEGER,
//         primaryKey: true,
//         autoIncrement: true
//     },
//     product_name: {
//         type: Sequelize.STRING,
//         default: "Pen"
//     },
//     product_price: {
//         type: Sequelize.DECIMAL(5,2),
//         default: 9.99
//     }
// },{
//     demoDB,
//     modelName: "products"
// });



// Using Define
const Products = demoDB.define("products", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    product_name: {
        type: Sequelize.STRING,
        default: "Pen"
    },
    product_price: {
        type: Sequelize.DECIMAL(5,2),
        default: 9.99
    }
})