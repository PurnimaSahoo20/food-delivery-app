# Food Delivery App

A fully responsive food delivery web application built with **React.js** and **Tailwind CSS**. This project simulates an online food ordering experience with features like menu browsing, cart management, checkout, and order confirmation.

## Features

- **Home Page with Banner**  
  Attractive full-screen banner with a "Shop Now" button that routes to the menu.

- **Food Menu Page**  
  - Displays multiple food items in a responsive grid layout.
  - Add items to cart with price calculation.
  - Styled with padding, margins, and hover effects.

- **Search Bar**  
  - Allows users to search food items.
  - Styled with better focus indicators and rounded input.

- **Cart Page**
  - Shows subtotal, delivery fee, tax, and total amount.
  - Quantity management.
  - Checkout button to proceed to checkout.

- **Checkout Page**
  - Form to fill in shipping and payment information.
  - Calculates final amount.
  - "Place Order" button shows loading state during submission.
  - On successful submission, redirects to `Order Success` page.

- **Order Success Page**
  - Displays confirmation message after order is placed.

- **Profile Page**
  - Displays user info with updated styling.
  - Username changed from `John Doe` to `Purnima`.

## Technologies Used

- React.js (with Hooks)
- Tailwind CSS
- React Router DOM (for routing)
- Vite (for fast development)

---

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/food-delivery-app.git
   cd food-delivery-app

2.**Install Dependencies**
    npm install

3.**Run the App**
    npm run dev

4.**Open in Browser**
   http://localhost:5173



## Folder Structure


/src
  /assets           # Images and static assets
  /components       # Reusable components (Navbar, Card, etc.)
  /pages            # Main pages like Home, Menu, Checkout, etc.
  /routes           # React Router setup
App.jsx             # Main entry point
main.jsx            # ReactDOM render logic
tailwind.config.js  # Tailwind setup
