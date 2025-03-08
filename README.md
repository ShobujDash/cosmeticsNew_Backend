# Request Body কলামে যেখানে আমি যে সব ডাটার গুলোর পিছনে কোশ্চেন (?)  মার্ক দিছিলাম সেগুলা optional.বাকি গুলো required

# Category API Documentation

## Base URL
```
https://cosmeticsnew-backend.onrender.com/api/categories
```

## Endpoints

| Method | Endpoint         | Description               | Request Body | Response |
|--------|----------------|---------------------------|--------------|----------|
| GET    | /              | Get all categories        | -            | List of categories |
| GET    | /:id           | Get a single category by ID  | -            | Category details or error |
| POST   | /              | Create a new category      | `{ categoryName, status?, image? }` | Created category or error |
| PUT    | /:id           | Update an existing category | `{ categoryName, status, image }` (partial updates allowed) | Updated category or error |
| DELETE | /:id           | Delete a category by ID    | -            | Success message or error |

## Notes
- Replace `:id` with the actual category ID.
- Images should be uploaded in the request using `multipart/form-data`.
- Status should be either `active` or `inactive`.
- Additional filters can be applied using query parameters.

-----------------------------------------------------------------------------------------------------------------------------------

# Subcategory API Documentation

## Base URL
```
https://cosmeticsnew-backend.onrender.com/api/subcategories
```

## Endpoints

| Method | Endpoint         | Description               | Request Body | Response |
|--------|----------------|---------------------------|--------------|----------|
| GET    | /              | Get all subcategories     | -            | List of subcategories |
| GET    | /:id           | Get a single subcategory by ID  | -            | Subcategory details or error |
| POST   | /              | Create a new subcategory  | `{ subCategoryName, categoryID, status? }` | Created subcategory or error |
| PUT    | /:id           | Update an existing subcategory | `{ subCategoryName, categoryID, status }` (partial updates allowed) | Updated subcategory or error |
| DELETE | /:id           | Delete a subcategory by ID | -            | Success message or error |

## Notes
- Replace `:id` with the actual subcategory ID.
- `categoryID` must be a valid existing category ID.
- Status should be either `active` or `inactive`.
- Subcategories are linked to categories and can have associated products.

-----------------------------------------------------------------------------------------------------------------------------------

# Product API Documentation

## Base URL
```
https://cosmeticsnew-backend.onrender.com/api/products
```

## Endpoints

| Method | Endpoint         | Description               | Request Body | Response |
|--------|----------------|---------------------------|--------------|----------|
| GET    | /              | Get all products          | -            | List of products |
| GET    | /:id           | Get a single product by ID  | -            | Product details or error |
| POST   | /              | Create a new product      | `{ productName, categoryID, subCategoryID, purchasePrice, sellingPrice, stock, description, status?, image1 , image2? ,image3? , image4? ,image5? }` | Created product or error |
| PUT    | /:id           | Update an existing product | `{ productName, categoryID, subCategoryID, purchasePrice, sellingPrice, stock, description, status, images }` (partial updates allowed) | Updated product or error |
| DELETE | /:id           | Delete a product by ID    | -            | Success message or error |

## Notes
- Replace `:id` with the actual product ID.
- Images should be uploaded in the request using `multipart/form-data`.
- Prices should be numbers, and stock should be an integer.


-----------------------------------------------------------------------------------------------------------------------------------

# Order API Documentation

## Base URL
```
https://cosmeticsnew-backend.onrender.com/api/orders
```

## Endpoints

| Method | Endpoint         | Description               | Request Body | Response |
|--------|----------------|---------------------------|--------------|----------|
| GET    | /              | Get all orders            | -            | List of orders |
| GET    | /:id           | Get a single order by ID  | -            | Order details or error |
| POST   | /              | Create a new order        | `{ invoice, date?, userName?, userEmail?, phone, amount, productID }` | Created order or error |
| PUT    | /:id           | Update an existing order  | `{ invoice, date, userName, userEmail, phone, amount, productID }` (partial updates allowed) | Updated order or error |
| DELETE | /:id           | Delete an order by ID     | -            | Success message or error |

## Notes
- Replace `:id` with the actual order ID.
- Dates should be in ISO format (`YYYY-MM-DD`).
- All amounts should be numbers.

-----------------------------------------------------------------------------------------------------------------------------------

# Sizes API Documentation

## Base URL
```
https://cosmeticsnew-backend.onrender.com/api/sizes
```

## Endpoints

| Method | Endpoint         | Description               | Request Body | Response |
|--------|----------------|---------------------------|--------------|----------|
| GET    | /              | Get all sizes            | -            | List of sizes |
| GET    | /:id           | Get a single size by ID  | -            | Size details or error |
| POST   | /              | Create a new size       | `{ sizeName }` | Created size or error |
| PUT    | /:id           | Update an existing size | `{ sizeName }` (partial updates allowed) | Updated size or error |
| DELETE | /:id           | Delete a size by ID     | -            | Success message or error |

## Notes
- Replace `:id` with the actual size ID.
- Status should be either `active` or `inactive`.

-----------------------------------------------------------------------------------------------------------------------------------

# Colors API Documentation

## Base URL
```
https://cosmeticsnew-backend.onrender.com/api/colors
```

## Endpoints

| Method | Endpoint         | Description               | Request Body | Response |
|--------|----------------|---------------------------|--------------|----------|
| GET    | /              | Get all colors          | -            | List of colors |
| GET    | /:id           | Get a single color by ID  | -            | Color details or error |
| POST   | /              | Create a new color      | `{ colorName }` | Created color or error |
| PUT    | /:id           | Update an existing color | `{ colorName }` (partial updates allowed) | Updated color or error |
| DELETE | /:id           | Delete a color by ID    | -            | Success message or error |

## Notes
- Replace `:id` with the actual color ID.
- Status should be either `active` or `inactive`.
- `hexCode` should be a valid hexadecimal color code.

-----------------------------------------------------------------------------------------------------------------------------------

# Brands API Documentation

## Base URL
```
https://cosmeticsnew-backend.onrender.com/api/brands
```

## Endpoints

| Method | Endpoint         | Description               | Request Body | Response |
|--------|----------------|---------------------------|--------------|----------|
| GET    | /              | Get all brands          | -            | List of brands |
| GET    | /:id           | Get a single brand by ID  | -            | Brand details or error |
| POST   | /              | Create a new brand      | `{ brandName , image}` | Created brand or error |
| PUT    | /:id           | Update an existing brand | `{ brandName, image }` (partial updates allowed) | Updated brand or error |
| DELETE | /:id           | Delete a brand by ID    | -            | Success message or error |

## Notes
- Replace `:id` with the actual brand ID.
- Status should be either `active` or `inactive`.


-----------------------------------------------------------------------------------------------------------------------------------


# Cart API Documentation

## Base URL
```
https://cosmeticsnew-backend.onrender.com/api/cart
```

## Endpoints

| Method | Endpoint  | Description                 | Request Body | Response |
|--------|----------|-----------------------------|--------------|----------|
| POST   | /create  | Create a new cart           | `{ products: [{ productId, quantity }] }` | Created cart or error |
| GET    | /get     | Get the cart by cartKey     | -            | Cart details or error |

## Notes
- `cartKey` is a unique identifier for the cart, automatically handled by middleware.
- The `products` array should contain objects with `productId` and `quantity`.
- The response includes the created cart or an error message.

