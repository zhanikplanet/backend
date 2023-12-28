Login Registration Form
Welcome to Login Registration Form!

Setup and Installation
Prerequisites
Node.js: Make sure you have Node.js installed. You can download it here.
Installation Steps
Clone the repository to your local machine.


git clone https://github.com/zhanikplanet/backend.git
Install project dependencies.


npm install
Install additional packages.


npm install bcrypt pg express
Configure Database Connection

Open service.js in your code editor.
Locate the database connection details.
Update with your actual login, port, password, and database name.


const dbConfig = {
  user: 'your-username',
  password: 'your-password',
  host: 'localhost',
  port: 'your-port',
  database: 'your-database-name',
};
Running the Project
Start the service.


node ./service.js
Launch the live server.

You've successfully set up and run Login Registration Form! If you encounter any issues, feel free to raise an issue or contact us.
