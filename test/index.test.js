const {demoDB} = require("../demoDB");
const {Customer, Product, Order} = require("../models/index");

describe("Sequelize Tests", () => {
    describe("Testing Creation of Models", () => {

        test("Customers Model or Table", async () => {
            await demoDB.sync({ force: true });
            let customer1 = {
                first_name: "John", 
                last_name: "Snow",
                age: 29
            }

            let customer2 = {
                first_name: "Johnny",
                last_name: "Bravo",
                age: 23
            }

            let customerEntry1 = await Customer.create(customer1);
            let customerEntry2 = await Customer.create(customer2);
            expect(customerEntry1.id).toBe(1);
            expect(customerEntry1.first_name).toBe("John");
            expect(customerEntry1.last_name).toBe("Snow");
            expect(customerEntry2.id).toBe(2);
            expect(customerEntry2.first_name).toBe("Johnny");
            expect(customerEntry2.last_name).toBe("Bravo");
            expect(customerEntry2.age).toBe(23);
        });

        test("Products Model or Table", async () => {
            await demoDB.sync({ force: true });
            let product1 = {
                product_name: "Pen",
                product_price: 4.99
            };

            let product2 = {
                product_name: "Notebook",
                product_price: 9.99
            };

            let product3 = {
                product_name: "Printer",
                product_price: 49.99
            };

            let productEntry1 = await Product.create(product1);
            let productEntry2 = await Product.create(product2);
            expect(productEntry1.id).toBe(1);
            expect(productEntry2.id).toBe(2);
            expect(productEntry1.product_name).toBe("Pen");
            expect(productEntry2.product_name).toBe("Notebook");
        });
        
        test("Orders Model", async () => {
            await demoDB.sync({force:true});
            let order1 = {
                customer_id: 2,
                product_id: 1
            };

            let order2 = {
                customer_id: 1,
                product_id: 2
            }

            
            let orders = await Order.bulkCreate([order1, order2]);
            
            expect(orders[0].customer_id).toBe(2);
            expect(orders[1].customer_id).toBe(1);
            expect(orders[0].order_id).toBe(1);
            expect(orders[1].order_id).toBe(2);
            expect(orders[0].product_id).toBe(1);
            expect(orders[1].product_id).toBe(2)
        })
       
    });

    describe("Associations", () => {
        test();
    });
    
});