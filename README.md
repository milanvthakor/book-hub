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
