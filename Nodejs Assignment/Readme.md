### Bookstore REST Api

-> Collection of books with details ( titlke, author, genre, price, and stock available in store). 

-> This can be accessible by two types of users- "Customers" and "Admin".

-> Admin have access of complete book data from reading to access to modification in bookstore data.

-> Customer can fetch only book available in store or finding book by id. 



To Know more Reach my GitHub Repository: https://github.com/skeppilavish/Bookstore_REST_APi_server.git


## What We have done here

1. Created a new Node.js project using npm.

2. Created Database setup using mongoose( 7.4.0) and store data feeded by postman

3. User Authentication is Implemented of user registration, login, and JWT token generation using JsonWebToken library of version(9.0.1).

4. Store user credentials securely by hashing passwords using libraries like bcrypt. 
    Used version of Bcrypt is (2.4.3)

5. Create two types of users: Admin and Customer. Use the JWT token to authenticate users on protected routes.

6. Allow only Admin users to perform CRUD operations on books. Like: Book details addition, Changes, Deletion 

7. Designed the Book model with attributes like title, author, genre, price, and stock. With validation for required fields, data types, etc.

8. API Endpoints:

 >>>Implement the following RESTful endpoints:

   -> POST /auth/login: User login endpoint to obtain a JWT token.
   -> GET /books: Retrieve a paginated list of books with filtering options like genre and availability (in stock).
   -> GET /books/:id: Retrieve a specific book by ID.
   -> POST /books: Create a new book (only accessible to Admin users).
   -> PUT /books/:id: Update an existing book (only accessible to Admin users).
   -> DELETE /books/:id: Delete a book (only accessible to Admin users).
   -> Buy book /buy/book/:id to buy a book with book id

9. Implement error handling and provide meaningful error messages for invalid requests or authorization failures.
    Validate request bodies using JOI (17.9.2) to ensure required fields are present. 

10. Used sentry to collect logs from the production .

11. Used docker to run in virtual environment.

-------Thank You :) ----------