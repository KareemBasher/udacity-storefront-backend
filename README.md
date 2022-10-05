# Storefront Backend Project
Second project in the Udacity Web Development Advanced Track. 

Objective is to create an API that connects to a database and serves some data from that database.

## Available Scripts
* `npm install` installs all required modules.

* `npm run dev` runs the nodemon module on 'index.ts'.

* `npm run build` compiles all .ts files to .js in the build folder.

* `npm run start` compiles .ts files and runs index.js in the build folder to start the server.

* `npm run lint` runs ESLint.

* `npm run prettier` runs prettier.

* `npm run test` runs jasmine tests.

* `npm run clean` removes the build folder.

## Connecting to the database
Host `localhost`

Database port `5432`

Database name `store_front`

Testing database name `store_front_test`

User `store_front_dev`

Database password `pass123`

## Running the API
1. `npm install` to install all packages
2. Using the postgreSQL command line with host `localhost` and port `5432`:
    1. `CREATE DATABASE store_front;`
    2. `CREATE DATABASE store_front_test;`
    3. `CREATE USER stor_front_dev WITH PASSWORD 'pass123';`
    4. `GRANT ALL PRIVILEGES ON DATABASE store_front TO store_front_dev;`
    5. `GRANT ALL PRIVILEGES ON DATABASE store_front_test TO store_front_dev;`
3. `npx db-migrate up` to run all migrations
4. `npm start` to start the API

#### Required enviroment variables
PORT=3000

NODE_ENV=dev

POSTGRES_HOST=localhost

POSTGRES_PORT=5432

POSTGRES_DB=store_front

POSTGRES_DB_TEST=store_front_test

POSTGRES_USER=store_front_dev

POSTGRES_PASSWORD=pass123

BCRYPT_SECRET=hakunaMatata

SALT=10

SIGNITURE=heIsOutOfLineButHeIsRight