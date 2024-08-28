REST API Documentation
Base URL:
http://localhost:8080/api

1. Get Gender Options
Endpoint: /genders
Method: GET
Description: Fetches the available gender options for the user registration form.
Request: None
Response:
Status Code: 200 OK
Response Body:
json
Copy code
["Male", "Female", "Other"]
2. Create a User
Endpoint: /users
Method: POST
Description: Creates a new user in the database.
Request:
Headers:
Content-Type: application/json
Body:
json
Copy code
{
  "name": "John Doe",
  "age": 30,
  "dob": "1993-01-01",
  "password": "password1234",
  "gender": "Male",
  "about": "This is about John Doe."
}
Response:
Status Code: 201 Created
Response Body:
json
Copy code
{
  "_id": "unique_user_id",
  "name": "John Doe",
  "age": 30,
  "dob": "1993-01-01T00:00:00.000Z",
  "password": "password1234",
  "gender": "Male",
  "about": "This is about John Doe.",
  "__v": 0
}
3. Get All Users
Endpoint: /users
Method: GET
Description: Retrieves a list of all users.
Request: None
Response:
Status Code: 200 OK
Response Body:
json
Copy code
[
  {
    "_id": "unique_user_id",
    "name": "John Doe",
    "age": 30,
    "dob": "1993-01-01T00:00:00.000Z",
    "password": "password1234",
    "gender": "Male",
    "about": "This is about John Doe.",
    "__v": 0
  }
]
4. Update a User
Endpoint: /users/:id
Method: PUT
Description: Updates an existing user's information.
Request:
Headers:
Content-Type: application/json
Body:
json
Copy code
{
  "name": "Jane Doe",
  "age": 28,
  "dob": "1995-02-02",
  "password": "newpassword123",
  "gender": "Female",
  "about": "Updated about Jane Doe."
}
Response:
Status Code: 200 OK
Response Body:
json
Copy code
{
  "_id": "unique_user_id",
  "name": "Jane Doe",
  "age": 28,
  "dob": "1995-02-02T00:00:00.000Z",
  "password": "newpassword123",
  "gender": "Female",
  "about": "Updated about Jane Doe.",
  "__v": 0
}
5. Delete a User
Endpoint: /users/:id
Method: DELETE
Description: Deletes a user from the database.
Request: None
Response:
Status Code: 204 No Content



#Setup and Running the Project Locally

#Prerequisites
Node.js and npm installed on your machine
MongoDB installed and running locally

#Steps to Setup the Project
Clone the Repository

bash
Copy code
git clone <repository-url>
cd <project-directory>
Install Backend Dependencies

bash
Copy code
cd backend
npm install
Run the Backend Server

Start MongoDB on your local machine.

In the terminal, run:

bash
Copy code
node server.js
The backend server will start at http://localhost:8080.

Install Frontend Dependencies

bash
Copy code
cd frontend
npm install
Run the Frontend Application

bash
Copy code
npm start
The frontend will be available at http://localhost:3000.