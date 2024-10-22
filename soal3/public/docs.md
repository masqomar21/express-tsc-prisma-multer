# Product API Documentation

## Base URLs
- `Host`: http://localhost:3000
- `API Base URL`: http://localhost:3000/api/v1

---

### 1. Get API Version (Test Endpoint)

**Request**  
`GET  http://localhost:3000/api/v1`

**Description**:  
This is a test endpoint to check the availability of the API.

---

### 2. Get Products with Pagination

**Request**  
`GET  http://localhost:3000/api/v1/product?page=1&limit=20`

**Description**:  
Retrieves a paginated list of products. You can adjust the page and limit parameters to control pagination.

**Query Parameters**:  
- `page` (int): The page number to retrieve.
- `limit` (int): The number of items per page.

---

### 3. Get Product by ID

**Request**  
`GET  http://localhost:3000/api/v1/product/102`

**Description**:  
Retrieves a product by its unique ID (`102` in this example).

---

### 4. Post Product with Image Upload

**Request**  
`POST  http://localhost:3000/api/v1/product`

**Content-Type**: `multipart/form-data; boundary=IamSplitter`

**Description**:  
Creates a new product with an image upload.

**Form Data**:
- `image` (file): The image file (e.g., `test.png`).
- `name` (string): The name of the product (e.g., `Test`).
- `decs` (string): The description of the product (e.g., `Test description`).
- `category_id` (int): The ID of the category (e.g., `1`).

**Sample Form Data**:

---

### 5. Update Product with Image Upload

**Request**  
`PUT  http://localhost:3000/api/v1/product/102`

**Content-Type**: `multipart/form-data; boundary=IamSplitter`

**Description**:  
Updates an existing product with a new image.

**Form Data**:
- `image` (file): The updated image file (e.g., `test.png`).
- `name` (string): The updated name of the product (e.g., `Test`).
- `decs` (string): The updated description (e.g., `Test description`).
- `category_id` (int): The updated category ID (e.g., `1`).

**Sample Form Data**:

---

### 6. Delete Product

**Request**  
`DELETE  http://localhost:3000/api/v1/product/108`

**Description**:  
Deletes a product by its unique ID (`108` in this example).

---

### 7. Get Public Product Image

**Request**  
`GET  http://localhost:3000/public/image/{{imageName}}`

**Description**:  
Retrieves the public image associated with a product if it exists. Replace `{{imageName}}` with the actual image file name (e.g., `image-1729606456187-99434430.png`).

---

**Note**:  
All endpoints are based on the assumption that the API base URL is `http://localhost:3000/api/v1`, and the host is `http://localhost:3000`.
