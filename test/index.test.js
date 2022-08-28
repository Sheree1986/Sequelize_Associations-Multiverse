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
        test("Customer can have many Products", async () => {
            await demoDB.sync({force:true});
            let customer1 = {
                first_name: "John", 
                last_name: "Snow",
                age: 29
            }

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

            let customer = await Customer.create(customer1);
            let productList = await Product.bulkCreate([product1,product2,product3]);

            await customer.addProducts(productList[0]);
            await customer.addProducts(productList[1]);
            await customer.addProducts(productList[2]);

            let customerProdList = await customer.getProducts();

            expect(customerProdList.length).toBe(3);


        });

        test("Product can belong to many Customers", async () => {
            await demoDB.sync({force:true});

            let product1 = {
                product_name: "Pen",
                product_price: 4.99
            };

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

            let customer3 = {
                first_name: "Brock",
                last_name: "Lesnar",
                age: 40
            }

            let customers = await Customer.bulkCreate([customer1, customer2, customer3]);
            let product = await Product.create(product1);

            await product.addCustomers(customers[0]);
            await product.addCustomers(customers[1]);
            await product.addCustomers(customers[2]);

            let numCustomers = await product.getCustomers();

            expect(numCustomers.length).toBe(3);

        });

        test("Customers can have many Products AND Products can have many Customers", async () => {
            await demoDB.sync({force:true});
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

            let customer3 = {
                first_name: "Brock",
                last_name: "Lesnar",
                age: 40
            }

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

            let productList = await Product.bulkCreate([product1, product2, product3]);
            let customerList = await Customer.bulkCreate([customer1, customer2, customer3]);

            let firstCustomer = await customerList[0];
            let secondCustomer = await customerList[1];
            let thirdCustomer = await customerList[2];
            let firstProduct = await productList[0];
            let secondProduct = await productList[1];
            let thirdProduct = await productList[2];


            await firstCustomer.addProducts(secondProduct);
            await firstCustomer.addProducts(thirdProduct);
            await secondCustomer.addProducts(secondProduct);
            await secondCustomer.addProducts(firstProduct);

            await firstProduct.addCustomers(firstCustomer);
            await firstProduct.addCustomers(thirdCustomer);
            await secondProduct.addCustomers(secondCustomer);
            // await secondProduct.addCustomers(firstCustomer);

            let product1Check = await firstProduct.getCustomers();
            let customer1Check = await firstCustomer.getProducts();

            

            
            expect(product1Check.length).toBe(3);
            expect(customer1Check.length).toBe(3);
        });
    });

    describe("Eager Loading or Joining the Data", () => {
        test("Eager Loading Customers with Products", async () => {
            await demoDB.sync({force:true});
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

            let customer3 = {
                first_name: "Brock",
                last_name: "Lesnar",
                age: 40
            }

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

            let productList = await Product.bulkCreate([product1, product2, product3]);
            let customerList = await Customer.bulkCreate([customer1, customer2, customer3]);

            let firstCustomer = await customerList[0];
            let secondCustomer = await customerList[1];
            let thirdCustomer = await customerList[2];
            let firstProduct = await productList[0];
            let secondProduct = await productList[1];
            let thirdProduct = await productList[2];


            await firstCustomer.addProducts(secondProduct);
            await firstCustomer.addProducts(thirdProduct);
            await secondCustomer.addProducts(secondProduct);
            await secondCustomer.addProducts(firstProduct);

            await firstProduct.addCustomers(firstCustomer);
            await firstProduct.addCustomers(thirdCustomer);
            await secondProduct.addCustomers(secondCustomer);
            // await secondProduct.addCustomers(firstCustomer);

            
            let loadedCustomerData = await Customer.findAll({
                    include: [{model: Product, as: 'products'}]
            });
           

            expect(loadedCustomerData[0].products.length).toBe(3);
            
 
            
            
         });
    });
 });
    
    