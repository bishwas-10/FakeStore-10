# FakeStore Online Eccomerce

## eCommerce MERN Project

This is an eCommerce web application built using the MERN stack. It allows users to browse through products, add items to their cart, and complete orders. The project includes features such as user authentication, product search, and order management..

OFFICIAL SITE :<a href="https://fakestore-10.vercel.app/" target="_blank">https://fakestore-10.vercel.app/</a>

[![LANDING_PAGE](https://img.youtube.com/vi/dTN_m-XzMO8/0.jpg)](https://www.youtube.com/watch?v=dTN_m-XzMO8)


YOUTUBE INTRO VIDEO:<a href="https://www.youtube.com/watch?v=dTN_m-XzMO8" target="_blank">https://www.youtube.com/watch?v=dTN_m-XzMO8</a>

## SCREENSHOTS

![Landing Page Screenshot](/client/image/1.jpg)


### To use Admin Panel
email: fakestore11@gmail.com
password: F@kestore12

## Table of Contents

- Features
- Technologies Used
- Installation
- Usage
- Contributing

## Features

- User authentication (sign up, login, logout) with refresh token without saving it    in localstorage
- Product browsing and search functionality
- Add products to cart
- View and manage cart items
- Checkout process for completing orders with the help of STRIPE
- User profile management (view orders, update information)
- Admin dashboard for managing products, orders, and users


## Features

**Client:**

- React.js: Frontend library for building the user interface
- MaterialUI: Frontend framework for styling the application
- Redux Toolkit: State management library for managing application state
- TailwindCSS: For styling and all
- Typescript: For type safety
- zod: For schema validation
- react-hook-form: For form validation
- Stripe: For payment integration

**Server:**

- Node: JavaScript runtime for building the server-side logic
- Express: Node.js framework for building the backend server and APIs
- MongoDB: Database for storing product, user, and order information
- zod: For schema validation
- Stripe: For payment integration


## Installation

Method npm

### 1. clone the repo

```bash
git clone https://github.com/bishwas-10/Online-CV-Builder.git
```

### 2.Change the directory

i. For frontend

```bash
cd client
```

ii. For Backend

```bash
cd server
```

iii.Run following command on both powershell

```bash
npm install
```


### 3. Installation

To run this project, you will need to add the following environment variables to your .env file

- for server - create a .env file inside the server folder and following key to it:

`MONGO_URI`- from mongodb

`TOKEN_KEY` generate a token running following command in terminal

`node -e "console.log(require('crypto').randomBytes(32).toString('hex'))" `

`REFRESH_TOKEN_KEY` generate a refresh token running above command in terminal

`STRIPE_SECRET_KEY` which stripe gives you in order to integrate it in your application

`ENDPOINT_SECRET` for integrating WEBHOOKS from stripe


### 4. Change the cors origin and instance 

 to http://localhost:5173 in server and proxy server in client in package.json to http://localhost:4000 in client.

 Inside the api/instance.ts in frontend file change the baseUrl to http://localhost:4000

### 5.Run the client and server

i.For client

```bash
npm run dev
```

ii.For server

```bash
npm start
```

Your client and server will be up and running in respective port!!!

ENJOY!!

## Usage
 
- Open the browser and navigate to http://localhost:5173
- Sign up or log in to access the eCommerce platform
- Browse products, add items to cart, and proceed to checkout
- Use the admin dashboard to manage products, orders, and users

## For CONTRIBUTING to this project

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

- Fork the repository
- Create a new branch (git checkout -b feature/your-feature)
- Make your changes
- Commit your changes (git commit -am 'Add new feature')
- Push to the branch (git push origin feature/your-feature)
- Create a new Pull Request
