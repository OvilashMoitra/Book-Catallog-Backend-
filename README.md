# Live Link: https://book-catalog-chi-seven.vercel.app/
Application Routes:
### User
* https://book-catalog-chi-seven.vercel.app/api/v1/auth/signup (POST)
* https://book-catalog-chi-seven.vercel.app/api/v1/users (GET)
* https://book-catalog-chi-seven.vercel.app/api/v1/users/6177a5b87d32123f08d2f5d4 (Single GET) Include an id that is saved in your database
* https://book-catalog-chi-seven.vercel.app/api/v1/users/6177a5b87d32123f08d2f5d4 (PATCH)
* https://book-catalog-chi-seven.vercel.app/api/v1/users/6177a5b87d32123f08d2f5d4 (DELETE) Include an id that is saved in your database
* https://book-catalog-chi-seven.vercel.app/api/v1/profile (GET)
### Category
* https://book-catalog-chi-seven.vercel.app/api/v1/categories/create-category (POST)
* https://book-catalog-chi-seven.vercel.app/api/v1/categories (GET)
* https://book-catalog-chi-seven.vercel.app/api/v1/categories/6177a5b87d32123f08d2f5d4 (Single GET) Include an id that is saved in your database
* https://book-catalog-chi-seven.vercel.app/api/v1/categories/6177a5b87d32123f08d2f5d4 (PATCH)
* https://book-catalog-chi-seven.vercel.app/api/v1/categories/6177a5b87d32123f08d2f5d4 (DELETE) Include an id that is saved in your database
### Books
* https://book-catalog-chi-seven.vercel.app/api/v1/books/create-book (POST)
* https://book-catalog-chi-seven.vercel.app/api/v1/books (GET)
* https://book-catalog-chi-seven.vercel.app/api/v1/books/:categoryId/category (GET)
* https://book-catalog-chi-seven.vercel.app/api/v1/books/:id (GET)
* https://book-catalog-chi-seven.vercel.app/api/v1/books/:id (PATCH)
* https://book-catalog-chi-seven.vercel.app/api/v1/books/:id (DELETE)
### Orders
* https://book-catalog-chi-seven.vercel.app/api/v1/orders/create-order (POST)
* https://book-catalog-chi-seven.vercel.app/api/v1/orders (GET)
* https://book-catalog-chi-seven.vercel.app/api/v1/orders/:orderId (GET)