const {demoDB} = require("../demoDB");
const Sequelize = require("sequelize");

// class Order extends Model {}

// Order.init({
//     order_id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         primaryKey: true
//     },
//     customer_id: {
//         type: Sequelize.INTEGER,
//         allowNull: false,
//         references: {model: "Customers", key: "id"}
//     },
//     product_id: {
//         type: Sequelize.INTEGER,
//         allowNull: false,
//         references: {model: "Products", key: "id"}
//     }
// },{
//     demoDB,
//     modelName: "orders"
// });

const Order = demoDB.define("orders", {
    order_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    customer_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // references: {model: "Customers", key: "id"}
    },
    product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // references: {model: "Products", key: "id"}
    }
})

module.exports = {
    Order
}