# Deployment

- `docker-compose build`
- `docker-compose up`
- `npm run migrate`
- `npm run seed`
In a seperate terminal
- `cd frontend`
- `npm run dev`

## See Demo here [Youtube](https://youtu.be/tue45XRB5t0)

# Table of Contents
- [About the Design](#about-the-design)
  - [Frontend served separately from backend](#frontend-served-separately-from-backend)
  - [Robust Backend Validation and Error Handling](#robust-backend-validation-and-error-handling)
  - [API Testing with Postman](#api-testing-with-postman)
  - [Prisma ORM Decisions](#prisma-orm-decisions)
  - [Considerations for Clinical Data](#considerations-for-clinical-data)
  - [Suggestions for Future Design](#suggestions-for-future-design)
- [API documentation](#api-documentation)
  - [Endpoints](#endpoints)
    - [1. Get All Form Data and Queries](#1-get-all-form-data-and-queries)
    - [2. Create a Query](#2-create-a-query)
    - [3. Update a Query (Resolve/Unresolve)](#3-update-a-query-resolveunresolve)
    - [4. Delete a Query](#4-delete-a-query)
    - [Error Format](#error-format)

# About the Design

### Frontend served separately from backend

One of the reasons I chose to host my frontend seperately from my backend is to ensure **separation of concerns**- By decoupling the frontend and backend, each layer can focus on its own responsibilities:
- **Backend:** Handles data storage, business logic, and API endpoints.
- **Frontend:** Focuses on user experience, UI rendering, and client-side logic => especially important in startups where frontend needs to scale faster, while the healthcare aspect forces backend to develop slower but more securely validated (ie: HIPPA compliance)

- This decoupling is especially important when looking at the use cases of Fastify and Next.js applications- especially as I have never deployed Next.js before, there are limitations with deploying Fastify-Next coupled applications on cloud servers, for example, Netlify and Vercel both are out of the question.
-  Finally, it also increases the backend host to be secured and exposed only to trusted clients, with clear separation from public-facing assets.

### Robust Backend Validation and Error Handling

- **Request validation** is performed for every endpoint. For example, required fields in the request body are checked, and meaningful errors are thrown if validation fails.
- All backend routes are wrapped in `try/catch` blocks to ensure that **RESTful error responses** with the appropriate HTTP status codes and error messages.

### API Testing with Postman

- All endpoints are tested using **Postman collections** and scripts.
- These collections can be easily shared and imported by other developers for manual or automated testing.
- Currently, I am running the Postman collection locally to verify that all my endpoints are operating as expected 
- The intention is to eventually integrate these tests into `.github` workflows (GitHub Actions) for continuous integration, so that API contract and behavior are automatically validated on every pull request or push. This will be done either through running the dockerized container in.github actions, or testing a staging deployment

### Prisma ORM Decisions

- General data validation: Enfored ids `@unique`, and enum types for `status`
- In the `Query` Model, I chose to use foriegn keys and a 1-to-1 `@relation`, as well as the standard SQL relational database join on "form_id" rather than duplicating all of the formData fields into `Query`. As an MVP, I've implemented a 1-on-1 relation between `FormData` and `Query`, however, I hope to make it 1-to-many, and also autogenerate 

### Considerations for Clinical Data

Although this is not a required component of the project, in reality, I would want to confirm with my manager about the following matters.

- **HIPPA Compliance:**  Despite the data having no user_id associated, patient anonymization is only fully guaranteed if `FormData` does not include patient-sensitive questions. May need to verify that questions are indeed 
- **Setup Postgres logs**  All changes to clinical data should be tracked with audit logs to ensure traceability and in case of transaction failures.
- **Validation and Quality Control:** For another checkpoint, I would like to implement 
- set up **Role-Based Access Control** on the frontend.

## Suggestions for Future Design:
- **Suggested Queries/Autopopulate Query** feature: 
Since these questions in `FormData` are repeated many times over for multiple users, I'd like to add autopopulation for new `Formdata` if they have a similar question and answer to `FormData` records that we have created queries previously.
- On a similar note, giving the user the ability to autopopulate all questions with this same `FormData` would also be a huge time-saver on the patient

---

# API documentation

## Endpoints
- [1. Get All Form Data and Queries](#1-get-all-form-data-and-queries)
- [2. Create a Query](#2-create-a-query)
- [3. Update a Query (Resolve/Unresolve)](#3-update-a-query-resolveunresolve)
- [4. Delete a Query](#4-delete-a-query)
- [Error Format](#error-format)


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
