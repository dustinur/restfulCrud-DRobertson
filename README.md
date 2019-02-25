# RESTful CRUD Node Server

RESTful CRUD Node Server for UVU DGM 4790

## Heroku URL

- [restful4790-drobertson.herokuapp.com](https://restful4790-drobertson.herokuapp.com/characters/5c741db2c1b95f05ac7379f8)

## Getting Started

- [Download & Install Postman](https://www.getpostman.com/apps)

### Installing and starting server

In terminal, while in project directory and run:

```
npm install
```

Start server on default port 3200:

```
npm start
```

All CRUD operations done in Postman

### Create

Choose x-www-form-urlencoded in the Body tab in Postman and send a POST request to the following url ‘localhost:3200/characters/create’.

### Read

Send a GET request to url ‘localhost:3200/characters/’ to find all existing characters.
Send a GET request to url ‘localhost:3200/characters/PRODUCT_ID’ to find a specific character, switching PRODUCT_ID with chosen character :id.

### Update

Send a UPDATE request to url ‘localhost:3200/characters/PRODUCT_ID/update’ to update a specific character's attributes by id.

### Delete

Send a Delete request to url ‘localhost:3200/characters/PRODUCT_ID/delete’ to delete a specific character by id.