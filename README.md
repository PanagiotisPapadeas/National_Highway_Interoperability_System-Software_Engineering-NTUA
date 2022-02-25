# TL21-31

## Dependencies
- MySQL/MariaDB
- Python 3 with the following libraries:
    - argparse
    - pandas
    - mysql-connector-python
- Postman
- Node.js
- csv files with data specifically modified to match our database

## Building
- Clone the repository from Github
- We have provided a bash script named "build.sh" in the root directory. It installs the necessary Python packages via pip, creates a database named "softeng2131" and runs the .sql file that initializes the database.
- Run "npx create-react-app <folder_name>" for the initial setup

## How to run
- Run "node index.js" from the api folder
- Alternatively run "pm2 start index.js" to run continuously
- Connect to the app through URLs explained in base URL of our app: localhost:9103. You can use Postman for GET and POST methods
- For the CLI run se2131.py and its various subcommands to

-Backend tests
Run backendtestfinal.py in test-backend folder

-API tests
Run tests through postman to check all API GET methods

-CLI tests
Run test.py in test-backend folder
