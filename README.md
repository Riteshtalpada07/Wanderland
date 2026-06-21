# Wanderland

A web application for creating, viewing, and managing property/real estate listings built with Node.js, Express, and MongoDB.

## Live Demo

🌐 **Try Wanderland:** [Click Here](https://wanderland-kba9.onrender.com/listings)

## Description

Wanderland is a platform to list properties with details such as title, description, price, location, and images. Users can create new listings, edit existing ones, delete listings, and leave reviews.

## Features

- Create, Read, Update, Delete (CRUD) operations for listings
- User reviews and ratings for listings
- Flash messages for user feedback
- Server-side form validation using Joi
- MongoDB database integration with Mongoose
- Responsive EJS templates

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Frontend**: EJS templating, CSS
- **Middleware**: express-session, connect-flash, method-override
- **Validation**: Joi

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Riteshtalpada07/Wanderland.git
cd wanderland
```

2. Install dependencies:
```bash
npm install
```

3. Make sure MongoDB is running locally on port 27017

4. Start the application:
```bash
node app.js
```

Or use nodemon for development:
```bash
npx nodemon app.js
```

## Usage

The server will start at `http://localhost:8080`

- Access all listings at: `http://localhost:8080/listings`
- Create a new listing at: `http://localhost:8080/listings/new`

## Project Structure

```
├── app.js                 # Main application entry point
├── package.json           # Project dependencies
├── models/                # Mongoose models
│   ├── listing.js
│   └── review.js
├── routes/                # Express routers
│   ├── listing.js
│   └── review.js
├── views/                 # EJS templates
│   ├── listings/
│   ├── layouts/
│   └── includes/
├── public/                # Static assets
│   ├── css/
│   └── js/
├── utils/                 # Utility functions
│   ├── ExpressError.js
│   └── wrapAsync.js
└── init/                  # Database initialization scripts
```

## API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| GET | /listings | Display all listings |
| GET | /listings/new | Show create listing form |
| POST | /listings | Create a new listing |
| GET | /listings/:id | Show specific listing |
| GET | /listings/:id/edit | Show edit form |
| PUT | /listings/:id | Update listing |
| DELETE | /listings/:id | Delete listing |
| POST | /listings/:id/reviews | Create review |

## Environment Variables

Create a `.env` file in the root directory for production:

```
MONGODB_URI=mongodb://127.0.0.1:27017/wanderland
SESSION_SECRET=your-secret-key
```

## Contributing

This project is currently in development. Contributions are welcome!

## License

ISC
