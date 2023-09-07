# Online Bookstore API

A backend API for an online bookstore. The API will allow users to browse and search for books, view book details, add books to their cart, and place orders.

## Set up and Run API locally

1. Open your command line terminal.
2. Navigate to the directory where you want to clone the project.
3. Clone the GitHub repository using its URL
4. Navigate to the project directory that you just cloned.
5. Install project dependencies using npm:

    ```
    npm install
    ```
6. Inside the project folder, create a new file named `.env`. This file should be located at the same level as the `package.json` file. In the `.env` file, make sure to set all the required environment variables according to the project's configuration. You can refer to the `sample.env` file as a reference for the environment variables that need to be defined in your `.env` file.
7. (Optional) Populate the database with some test data. To do this, run the `populatedb.js` script using the following command:

    ```
    node populatedb <MONGO_URI>
    ```
8. Start the API server:
    
    ```
    npm start
    ```
    The terminal should display a message `Server is running on http://localhost:<PORT>/`

You can now access the API endpoints using a tool like Postman or via the `curl` command.

## API Documentation 

An overview of the endpoints, required parameters, response formats, and example requests/responses of the API.

### Base URL

```
http://localhost:<PORT>
```

### Endpoints

#### User Registration
- **URL**: `/user/register`
- **Method**: `POST`
- **Description**: This API endpoint allows users to register by providing their email and password.
- **Request Body**: The request body must be in JSON format and include the following fields:
    - `email` (string, required): The email address of the user.
    - `password` (string, required): The password for the user account.
- **Example Request**:
    ```
    POST /user/register
    Content-Type: application/json

    {
        "email": "alice@example.com",
        "password": "Password@123"
    }
    ```
- **Example Response**:
    ```
    Status Code: 201

    {
        "message": "User created"
    }
    ```

#### User Login
- **URL**: `/user/login`
- **Method**: `POST`
- **Description**: This API endpoint allows users to login by providing their email and password.
- **Request Body**: The request body must be in JSON format and include the following fields:
    - `email` (string, required): The email address of the user.
    - `password` (string, required): The password for the user account.
- **Example Request**:
    ```
    POST /user/login
    Content-Type: application/json

    {
        "email": "alice@example.com",
        "password": "Password@123"
    }
    ```
- **Example Response**:
    ```
    Status Code: 200

    {
        "message": "Login successfully",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFsaWNlQGV4YW1wbGUuY29tIiwiaWQiOiI2NGY5Y2U1N2I4ZDg4ZGEyZDdkNjAwN2UiLCJpYXQiOjE2OTQwOTI4OTQsImV4cCI6MTY5NDA5NjQ5NH0.dXUcXMMHJsWspD89oiG43LyrbUjNBwKMKPK0_kcs-ug"
    }    
    ```

#### Get Books
- **URL**: `/books`
- **Method**: `GET`
- **Description**: This API endpoint allows users to retrieve a list of books. Users can also search for books by title or author by providing the `search` query string parameter.
- **Query Parameters**:
    - `search` (string, optional): Allows users to search for books by title or author. The search parameter is case-insensitive.
- **Example Request**:
    ```
    GET /books?search=Author #0
    ```
- **Example Response**:
    ```
    Status Code: 200

    {
        "count": 1,
        "books": [
            {
                "_id": "64f9d0581c650a4fad08bf81",
                "title": "Book Title #0",
                "isbn": "ISBN#0",
                "author": "Book Author #0",
                "genre": "Book Genre #0",
                "price": 100
            }
        ]
    }
    ```

#### Get Book by ID
- **URL**: `/books/{id}`
- **Method**: `GET`
- **Description**: This API endpoint allows users to retrieve details of a book by providing its unique ID.
- **Path Parameters**:
    - `id` (string, required): The unique ID of the book to retrieve.
- **Example Request**:
    ```
    GET /books/64f9d0581c650a4fad08bf81
    ```
- **Example Response**:
    ```
    Status Code: 200

    {
        "_id": "64f9d0581c650a4fad08bf81",
        "title": "Book Title #0",
        "isbn": "ISBN#0",
        "author": "Book Author #0",
        "genre": "Book Genre #0",
        "price": 100
    }
    ```

#### Add Book to Cart
- **URL**: `/cart`
- **Method**: `POST`
- **Description**: This API endpoint allows users to add a book to their cart by providing the book ID and quantity.
- **Headers**:
    - `Authorization` (string, required): The `Authorization` header must be set with a valid authentication token obtained from the `/user/login` endpoint. Use the format `Authorization: Bearer <token>`.
- **Request Body**: The request body must be in JSON format and include the following fields:
    - `bookId` (string, required): The ID of the book to add to the cart.
    - `quantity` (integer, required): The quantity of the book to add to the cart.
- **Example Request**:
    ```
    POST /cart
    Content-Type: application/json
    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFsaWNlQGV4YW1wbGUuY29tIiwiaWQiOiI2NGY5Y2U1N2I4ZDg4ZGEyZDdkNjAwN2UiLCJpYXQiOjE2OTQwOTI4OTQsImV4cCI6MTY5NDA5NjQ5NH0.dXUcXMMHJsWspD89oiG43LyrbUjNBwKMKPK0_kcs-ug

    {
        "bookId": "64f9d0581c650a4fad08bf81",
        "quantity": 2
    }
    ```
- **Example Response**:
    ```
    Status Code: 200

    {
        "message": "Book added into cart successfully",
        "cart": {
            "items": [
                {
                    "bookId": "64f9d0581c650a4fad08bf81",
                    "bookPrice": 100,
                    "quantity": 2
                }
            ],
            "total": 200
        }
    }
    ```

#### Remove Book from Cart
- **URL**: `/cart`
- **Method**: `DELETE`
- **Description**: This API endpoint allows users to remove a book from their cart by providing the book ID.
- **Headers**:
    - `Authorization` (string, required): The `Authorization` header must be set with a valid authentication token obtained from the `/user/login` endpoint. Use the format `Authorization: Bearer <token>`.
- **Query Parameters**:
    - `bookId` (string, required): The ID of the book to remove from the cart.
- **Example Request**:
    ```
    DELETE /cart?bookId=64f9d0581c650a4fad08bf81
    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFsaWNlQGV4YW1wbGUuY29tIiwiaWQiOiI2NGY5Y2U1N2I4ZDg4ZGEyZDdkNjAwN2UiLCJpYXQiOjE2OTQwOTI4OTQsImV4cCI6MTY5NDA5NjQ5NH0.dXUcXMMHJsWspD89oiG43LyrbUjNBwKMKPK0_kcs-ug
    ```
- **Example Response**:
    ```
    Status Code: 200

    {
        "message": "Book removed from cart successfully",
        "cart": {
            "items": [],
            "total": 0
        }
    }
    ```

#### View Cart
- **URL**: `/cart`
- **Method**: `GET`
- **Description**: This API endpoint allows users to view the contents of their cart.
- **Headers**:
    - `Authorization` (string, required): The `Authorization` header must be set with a valid authentication token obtained from the `/user/login` endpoint. Use the format `Authorization: Bearer <token>`.
- **Example Request**:
    ```
    GET /cart
    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFsaWNlQGV4YW1wbGUuY29tIiwiaWQiOiI2NGY5Y2U1N2I4ZDg4ZGEyZDdkNjAwN2UiLCJpYXQiOjE2OTQwOTI4OTQsImV4cCI6MTY5NDA5NjQ5NH0.dXUcXMMHJsWspD89oiG43LyrbUjNBwKMKPK0_kcs-ug
    ```
- **Example Response**:
    ```
    Status Code: 200

    {
        "items": [
            {
                "bookId": "64f9d0581c650a4fad08bf81",
                "bookPrice": 100,
                "quantity": 2
            },
            {
                "bookId": "64f9d0581c650a4fad08bf82",
                "bookPrice": 101,
                "quantity": 4
            }
        ],
        "total": 604
    }
    ```

#### Place an Order (Checkout)
- **URL**: `/orders/checkout`
- **Method**: `POST`
- **Description**: This API endpoint allows users to place an order from their cart, effectively checking out. 
- **Headers**:
    - `Authorization` (string, required): The `Authorization` header must be set with a valid authentication token obtained from the `/user/login` endpoint. Use the format `Authorization: Bearer <token>`.
- **Example Request**:
    ```
    POST /orders/checkout
    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFsaWNlQGV4YW1wbGUuY29tIiwiaWQiOiI2NGY5Y2U1N2I4ZDg4ZGEyZDdkNjAwN2UiLCJpYXQiOjE2OTQwOTI4OTQsImV4cCI6MTY5NDA5NjQ5NH0.dXUcXMMHJsWspD89oiG43LyrbUjNBwKMKPK0_kcs-ug
    ```
- **Example Response**:
    ```
    Status Code: 200

    {
        "message": "Order placed successfully",
        "order": {
            "_id": "64f9de9f3307fc306edf71e4",
            "items": [
                {
                    "bookId": "64f9d0581c650a4fad08bf81",
                    "bookPrice": 100,
                    "quantity": 2
                },
                {
                    "bookId": "64f9d0581c650a4fad08bf82",
                    "bookPrice": 101,
                    "quantity": 4
                }
            ],
            "total": 604
        }
    }
    ```

#### View Order History
- **URL**: `/orders`
- **Method**: `GET`
- **Description**: This API endpoint allows users to view their order history.
- **Headers**:
    - `Authorization` (string, required): The `Authorization` header must be set with a valid authentication token obtained from the `/user/login` endpoint. Use the format `Authorization: Bearer <token>`.
- **Example Request**:
    ```
    GET /orders
    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFsaWNlQGV4YW1wbGUuY29tIiwiaWQiOiI2NGY5Y2U1N2I4ZDg4ZGEyZDdkNjAwN2UiLCJpYXQiOjE2OTQwOTI4OTQsImV4cCI6MTY5NDA5NjQ5NH0.dXUcXMMHJsWspD89oiG43LyrbUjNBwKMKPK0_kcs-ug
    ```
- **Example Response**:
    ```
    Status Code: 200

    {
        "count": 1,
        "orders": [
            {
                "_id": "64f9de9f3307fc306edf71e4",
                "userId": "64f9ce57b8d88da2d7d6007e",
                "items": [
                    {
                        "bookId": "64f9d0581c650a4fad08bf81",
                        "bookPrice": 100,
                        "quantity": 2
                    },
                    {
                        "bookId": "64f9d0581c650a4fad08bf82",
                        "bookPrice": 101,
                        "quantity": 4
                    }
                ],
                "total": 604,
                "createdAt": "2023-09-07T14:30:56.004Z",
                "updatedAt": "2023-09-07T14:30:56.004Z"
            }
        ]
    }
    ```
