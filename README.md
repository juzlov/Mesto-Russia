# Mesto-Russia (backend)
Mesto Russia (backend) is backend part of Mesto Russia project, developed as part of [Yandex-Praktikum](https://praktikum.yandex.ru/) training program.

Version 3.0.3

## About

This project is an independent server that can be linked to the [Mesto Russia frontend](https://github.com/juzlov/MestoRussiaFrontend)  
The server verifies the token, authorizes the user, saves and returns cards from the database.

- Project API developed following REST principles
- Implemented authentication and authorization of users
- Users and cards are created and validated through Schemas
- List of cards and users is stored in Mongo DataBase
- Password data is pushed in hashed form
- Return of an error message for incorrect request

## Used in project
- **Node.js**
- **Express.js**
- **MongoDB**

## How to start
Please, before start check versions of following components:
- npm version - 6.13.4
- node.js version - 12.16.1

1. Clone project:
```
git clone https://github.com/juzlov/Mesto-Russia.git
```

2. Run database
```
mongod
```

3. Run local server in another terminal window
```
npm run dev
```

## How to use

You can test current functionality of server, using any req/res app, for example Postman:

- **Signin**
Request: POST ./signin
```
Data.json: {
    "e-mail" : "key",
    "password" : "keykey"
}
```

- **Signup**
Request: POST ./signup
```
Data.json: {
    "name" : "key",
    "about" : "key",
    "avatar" : "http://key.ru",
    "email": "key@key.ru",
    "password": "keykey"
}
```

- **Get users**
Request: GET ./users
Data.json: {}

- **Get user by id**
Request: GET ./users/:user-id
Data.json: {}

- **Get cards**
Request: GET ./cards
Data.json: {}

- **Post card**
Request: POST ./cards
```
Data.json: {
    "name" : "key",
    "link" : "http://key.ru"
}
```

- **Delete card**
Request: DELETE ./cards/:card-id
Data.json: {}

## Public server IP
84.201.167.157

## Domain
https://mesto-project.tk/
