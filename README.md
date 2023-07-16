# Digital Cow Hut

### Online cow Hut application.

### Version : 1.1.0 assignment 4

### Author : Ibrahim Kholilullah

### Technology used : Typescript, ExpressJS, Mongoose, Zod etc.

## Live Link: [https://assignment4.up.railway.app/](https://assignment4.up.railway.app/)

# Application Routes:

### Auth (User)
Route: https://assignment4.up.railway.app/api/v1/auth/login (POST)
Route: https://assignment4.up.railway.app/api/v1/auth/signup (POST)
Route: https://assignment4.up.railway.app/api/v1/auth/refresh-token (POST)
### Auth (Admin)
Route: https://assignment4.up.railway.app/api/v1/admins/create-admin (POST)
Route: https://assignment4.up.railway.app/api/v1/admins/login (POST)
### User **  This routes only accessible by admin - to login as admin use : "phoneNumber":"01711111122", "password":"1234"
Route: https://assignment4.up.railway.app/api/v1/users (GET) 
Route: https://assignment4.up.railway.app/api/v1/users/649d92eeff5b9f8c2557ef97 (Single GET) 
Route: https://assignment4.up.railway.app/api/v1/users/649d92eeff5b9f8c2557ef97 (PATCH) 
Route: https://assignment4.up.railway.app/api/v1/users/649d92eeff5b9f8c2557ef97 (DELETE) 
### Cows
Route: https://assignment4.up.railway.app/api/v1/cows (POST)
Route: https://assignment4.up.railway.app/api/v1/cows (GET)
Route: https://assignment4.up.railway.app/api/v1/cows/649e6a32ac43acf1923a5d68 (Single GET) 
Route: https://assignment4.up.railway.app/api/v1/cows/649e6a32ac43acf1923a5d68 (PATCH) 
Route: https://assignment4.up.railway.app/api/v1/cows/649e6a32ac43acf1923a5d68 (DELETE) 
### Orders
Route: https://assignment4.up.railway.app/api/v1/orders (POST)
Route: https://assignment4.up.railway.app/api/v1/orders (GET)
### Bonus Part
### Admin
Route: https://assignment4.up.railway.app/api/v1/admins/create-admin (POST)

### My Profile
Route: https://assignment4.up.railway.app/api/v1/users/my-profile (GET)
Route: https://assignment4.up.railway.app/api/v1/users/my-profile (PATCH)
Order:
Route: https://assignment4.up.railway.app/api/v1/orders/649e6ef84f4525183159e483 (GET)