# About the App


# Deployment

- `docker-compose build`
- `docker-compose up`
- `npm run migrate`
- `npm run seed`
In a seperate terminal
- `cd frontend`
- `npm run dev`

# API documentation

## Endpoints
- [1. Get All Form Data and Queries](#1-get-all-form-data-and-queries)
- [2. Create a Query](#2-create-a-query)
- [3. Update a Query (Resolve/Unresolve)](#3-update-a-query-resolveunresolve)
- [4. Delete a Query](#4-delete-a-query)
- [Error Format](#error-format)

---

### 1. Get All Form Data and Queries

**GET** `/form-data`

**Description:**  
Retrieve all form data entries and their associated queries.

**Response Example:**
```json
{
  "statusCode": 200,
  "message": "success",
  "data": {
    "total": 10,
    "formData": [
      {
        "id": "string",
        "question": "string",
        "answer": "string"
      }
      // ...list of form data
    ],
    "query": [
      {
        "id": "string",
        "title": "string",
        "description": "string",
        "status": "OPEN" | "RESOLVED",
        "createdAt": "2024-06-01T00:00:00.000Z",
        "updatedAt": "2024-06-01T00:00:00.000Z",
        "formDataId": "string"
      }
      // list of query
    ]
  }
}
```

### 2. Create a Query

**POST** `/query/create`

**Description:**
Create a new query for a formdata entry

**Request Body:**
```json
{
  "title": "string",
  "description": "string",
  "form_data_id": "string"
}
```

**Response Example:**
```json
{
  "statusCode": 200,
  "message": "success",
  "data": {
    "query": {
      "id": "string",
      "title": "string",
      "description": "string",
      "status": "OPEN",
      "createdAt": "2024-06-01T00:00:00.000Z",
      "updatedAt": "2024-06-01T00:00:00.000Z",
      "formDataId": "string"
    }
  }
}
```

**Errors:**
- 400: Missing or invalid parameters
- 400: form_data_id does not exist

### 3. Update a Query (Resolve/Unresolve)

**PUT** `/query/update`

**Description:**
Update the status of a query (e.g., mark as RESOLVED).

**Request Body:**
```json
{
  "resolve": true,
  "query_id": "string"
}
```

**Response Example:**
```json
{
  "statusCode": 200,
  "message": "success",
  "data": {
    "query": {
      "id": "string",
      "title": "string",
      "description": "string",
      "status": "RESOLVED",
      "createdAt": "2024-06-01T00:00:00.000Z",
      "updatedAt": "2024-06-01T00:00:00.000Z",
      "formDataId": "string"
    }
  }
}
```

**Errors**
Errors:
- 400: Missing or invalid parameters
- 400: Failed to update query

### 4. Delete a Query
**DELETE** `/query/delete`

**Description:**
Delete a query by its ID.

**Request Body:**
```json
{
  "id": "string"
}
```

**Response Example:**
```json
{
  "statusCode": 200,
  "message": "success",
  "data": {
    "message": "Query deleted successfully"
  }
}
```

**Errors:**
- 400: Missing or invalid parameters
- 404: Query not found

## Error Format
```json
{
  "statusCode": 400,
  "message": "error message",
  "data": null
}
```