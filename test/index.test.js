const {demoDB} = require("../demoDB");
const {Customer, Product, Order} = require("../models/index");

// Root Describe for all Tests related to Sequelize
describe("Sequelize Tests", () => {
    // Describing the creation of the Models
    describe("Testing Creation of Models", () => {

        // Test 1: Can I create a Model Table Instance from my Model Object
        test("Customers Model or Table", async () => {
            // Restart the Database with the Models
            await demoDB.sync({ force: true });

            // Creating Customer Object 1
                // This will represent the values we want to supply the fields in our Model
            let customer1 = {
                first_name: "John", 
                last_name: "Snow",
                age: 29
            }

            // Creating Customer Object 2
                // This will represent the values we want to supply the fields in our Model
            let customer2 = {
                first_name: "Johnny",
                last_name: "Bravo",
                age: 23
            }

            // Creating the customer's table with the appropriate values for fields for customer 1
            let customerEntry1 = await Customer.create(customer1);

            // Creating the customer's table with the appropriate values for fields for customer 1
            let customerEntry2 = await Customer.create(customer2);

            // Assert/Expect values to be correct for testing
            expect(customerEntry1.id).toBe(1);
            expect(customerEntry1.first_name).toBe("John");
            expect(customerEntry1.last_name).toBe("Snow");
            expect(customerEntry2.id).toBe(2);
            expect(customerEntry2.first_name).toBe("Johnny");
            expect(customerEntry2.last_name).toBe("Bravo");
            expect(customerEntry2.age).toBe(23);
        });

        // Test 2: Creation of the Products Table from the Product Model
        test("Products Model or Table", async () => {
            // Restarting the DB
            await demoDB.sync({ force: true });

            // Creating Product Object 1
                // This will fill in the values for the field in the model
            let product1 = {
                product_name: "Pen",
                product_price: 4.99
            };

            // Creating Product Object 2
                // This will fill in the values for the field in the model
            let product2 = {
                product_name: "Notebook",
                product_price: 9.99
            };

            // Creating Product Object 3
                // This will fill in the values for the field in the model
            let product3 = {
                product_name: "Printer",
                product_price: 49.99
            };


            // Creating the entry in the product table using the product object
            let productEntry1 = await Product.create(product1);
            let productEntry2 = await Product.create(product2);

            // Assert/Expect Values for Test
            expect(productEntry1.id).toBe(1);
            expect(productEntry2.id).toBe(2);
            expect(productEntry1.product_name).toBe("Pen");
            expect(productEntry2.product_name).toBe("Notebook");
        });
        
        // Test 3: Can Create the Orders Model
        test("Orders Model", async () => {
            // Restart the DB
            await demoDB.sync({force:true});

            // Create Order Objects
            let order1 = {
                customer_id: 2,
                product_id: 1
            };

            let order2 = {
                customer_id: 1,
                product_id: 2
            }

            
            // Create order entries to order table using bulkcreate
            let orders = await Order.bulkCreate([order1, order2]);
            
            // Test values 
            expect(orders[0].customer_id).toBe(2);
            expect(orders[1].customer_id).toBe(1);
            expect(orders[0].order_id).toBe(1);
            expect(orders[1].order_id).toBe(2);
            expect(orders[0].product_id).toBe(1);
            expect(orders[1].product_id).toBe(2)
        })
       
    });

    // A New Test Suite
    // Testing Associations of Models
    describe("Associations of Models", () => {

        // Test 1: In this Many to Many relationship, can my Customer have many Products?
        test("Customer can have many Products", async () => {
            // Restart DB
            await demoDB.sync({force:true});

            // Create Customer Objects
            let customer1 = {
                first_name: "John", 
                last_name: "Snow",
                age: 29
            }

            // Create Product Objects
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

            // Create Customer Table Entry from Customer Object
            let customer = await Customer.create(customer1);

            // Create Product Table Entry from Product Object(s) using BulkCreate
            let productList = await Product.bulkCreate([product1,product2,product3]);

            //Many-to-Many Relationships are defined in sequelize using: 
                // 1. Model1.hasMany(Model2);
                // 2. Model1.belongsToMany(Model2);
            // Each come with a set of methods you can use on the "Source" Model. 
                // In this case, the source model is the one BEFORE the "dot"
                // Example: 
                    // Model1.belongsToMany(Model2); -> The source model is "Model1"
                    // MOdel2.belongsToMany(Model1); -> The source model is "Model2"
            // These methods are (not limited to): 
                // 1. setProducts();
                // 2. getProducts();
                // 3. addProducts();
                    //3a. With addProducts(), we can attach a product to an associate model. In this case, the customer.

            // Using the "addProducts()" I will be adding 3 Different Products to 1 Customer
            // This means One Customer HAS MANY Products
            await customer.addProducts(productList[0]);
            await customer.addProducts(productList[1]);
            await customer.addProducts(productList[2]);

            // Using the "getProducts()" I will get an array of Objects representing the "Products" associated with this customer.
            let customerProdList = await customer.getProducts();

            // The customer should have 3 products, so I will check that the length of the list of products this customer has is 3.
            expect(customerProdList.length).toBe(3);


        });

        // Test 2: One Product can have MANY Customers
        test("Product can belong to many Customers", async () => {
            // Restart DB
            await demoDB.sync({force:true});

            // Create Product Objects
            let product1 = {
                product_name: "Pen",
                product_price: 4.99
            };

            // Create Customer Objects
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

            // Create Customer table entries
            let customers = await Customer.bulkCreate([customer1, customer2, customer3]);

            // Create Product table entry
            let product = await Product.create(product1);

            // Use the .addCustomers() method to add 3 different customers to 1 Product
            // This means 1 Product HAS MANY Customers
            await product.addCustomers(customers[0]);
            await product.addCustomers(customers[1]);
            await product.addCustomers(customers[2]);

            // Getting the list of customers attached to this product
            // Should be 3
            let numCustomers = await product.getCustomers();

            // Test that the value is 3
            expect(numCustomers.length).toBe(3);

        });

        // Test 3: Customers can HAVE MANY Products AND Products can HAVE MANY Customers
        test("Customers can have many Products AND Products can have many Customers", async () => {
            // Restart DB
            await demoDB.sync({force:true});
            let customer1 = {
                first_name: "John", 
                last_name: "Snow",
                age: 29
            }

            // Create Customer Objects
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

            // Create Product Objects
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

            // Create Product Table Entries
            let productList = await Product.bulkCreate([product1, product2, product3]);
            // Create Customer Table Entries
            let customerList = await Customer.bulkCreate([customer1, customer2, customer3]);

            // Create Reference For Each Entry in DB for Customers and Products
            // Customers
            let firstCustomer = await customerList[0];
            let secondCustomer = await customerList[1];
            let thirdCustomer = await customerList[2];

            // Products
            let firstProduct = await productList[0];
            let secondProduct = await productList[1];
            let thirdProduct = await productList[2];

            // Adding Different Products to Different Customers
            await firstCustomer.addProducts(secondProduct);
            await firstCustomer.addProducts(thirdProduct);
            await secondCustomer.addProducts(secondProduct);
            await secondCustomer.addProducts(firstProduct);

            // Adding Different Customers to Different Products
            await firstProduct.addCustomers(firstCustomer);
            await firstProduct.addCustomers(thirdCustomer);
            await secondProduct.addCustomers(secondCustomer);
            // await secondProduct.addCustomers(firstCustomer);

            // List of Customers attached to Product 1
                // Should be 3
                // Lines: [293, 296, 297]
            let product1Check = await firstProduct.getCustomers();

            // List of Products attached to Customer1
                // Should be 3
                // Lines: [290, 291, 296]
            let customer1Check = await firstCustomer.getProducts();

            

            // Test the values
            expect(product1Check.length).toBe(3);
            expect(customer1Check.length).toBe(3);
        });
    });

    // New Test Suite
    // Checking the ability to Eager Load
    // Eager Loading in Sequelize is what Joining is in SQL
    describe("Eager Loading Models", () => {
        // Checking that I can Join the Customers with the Products
        test("Eager Loading Customers with Products", async () => {
            // Restart DB
            await demoDB.sync({force:true});

            // Create Customer Objects
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

            // Create Product Objects
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

            // Create Product Table Entries
            let productList = await Product.bulkCreate([product1, product2, product3]);

            // Create Customer Table Entries
            let customerList = await Customer.bulkCreate([customer1, customer2, customer3]);

            // Create Reference for Each Customer and Product
            let firstCustomer = await customerList[0];
            let secondCustomer = await customerList[1];
            let thirdCustomer = await customerList[2];
            let firstProduct = await productList[0];
            let secondProduct = await productList[1];
            let thirdProduct = await productList[2];

            // Add Different Products to Different Customers
            await firstCustomer.addProducts(secondProduct);
            await firstCustomer.addProducts(thirdProduct);
            await secondCustomer.addProducts(secondProduct);
            await secondCustomer.addProducts(firstProduct);


            // Add Different Customers to Different Products
            await firstProduct.addCustomers(firstCustomer);
            await firstProduct.addCustomers(thirdCustomer);
            await secondProduct.addCustomers(secondCustomer);
            // await secondProduct.addCustomers(firstCustomer);

            // Eager Load All the Customers in my DB with all the Products attached to them
                // I can load the Customers without the Associated Products. 
                // However, with Eager Loading, I can get the Associated Products attached to the Customer
                // In this case, I've loaded every customer and all the products they have attached to them
            let loadedCustomerData = await Customer.findAll({
                    include: [{model: Product, as: 'products'}]
            });
           

            // The first customer has 3 products: 
            // Lines: [378, 379, 385]
            // Test Values
            expect(loadedCustomerData[0].products.length).toBe(3);
            
         });
    });
 });
    
    