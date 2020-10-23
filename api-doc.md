# hacktiv-garden-server

​
List of available endpoints:
​
- `POST users/register`
- `POST users/login`
- `POST users/googleLogin`
- `POST /todos`
- `GET /todos`
- `GET /todos/:id`
- `PUT /todos/:id`
- `PATCH /todos/:id`
- `DELETE /todos/:id`

### POST /users/register

Request:

- data:

```json
{
  "email": "string",
  "password": "string"
}
```

Response:

- status: 201
- body:
  ​

```json
{
  "id": "integer",
  "email": "string"
}
```

### POST /users/login

Request:

- data:

```json
{
  "email": "string",
  "password": "string"
}
```

Response:

- status: 200
- body:
  ​

```json
{
    "token": "jwt string"
}
```

### POST /users/googleLogin

Request:

- data:

```json
{
  "tokenGoogle": "string"
}
```

Response:

- status: 200
- body:
  ​

```json
{
    "token": "jwt string"
}
```

### POST /todos

Request:

- data:

```json
{
  "title": "string",
  "description": "string",
  "status": "string",
  "dueDate": "date",
  "UserId": "integer"
}
```

Response:

- status: 201
- body:
  ​

```json
{
    "data": "instance todo"
}
```

### GET /todos

description: 
  get all todo from database

Request:

- headers: token (string)
- UserId: current logged in user id

Response:

- status: 200
- body: array of object (todo)


### GET /todos/:id

description: 
  get one todo by id from database

Request:

- headers: token (string)
```json
{
    "id": "req.params.id",
}
```

Response:

- status: 200
- body: object (todo)


### PUT /todos/:id

description: 
  edit todo to database

Request:

- headers: token (string)
```json
{
    "id": "req.params.id",
    "title": "string",
    "description": "string",
    "status": "string",
    "dueDate": "date"
}
```

Response:

- status: 200
- body: object (todo after edit)


### PATCH /todos/:id

description: 
  edit status to database

Request:

- headers: token (string)
```json
{
    "id": "req.params.id",
    "status": "string"
}
```

Response:

- status: 200
- body: object (todo after status edit)


### DELETE /todos/:id

description: 
  delete todo from database

Request:

- headers: token (string)
```json
{
    "id": "req.params.id"
}
```

Response:

- status: 200
- body: object (deleted todo)
