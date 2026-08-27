# 🛍️ Looto — Modern E-Commerce Landing Page

A lightweight, responsive, and modern front-end e-commerce landing page clone of popular online shopping platforms (inspired by Meesho). It features a sleek navigation interface, a fully functional shopping cart sidebar, categorized shopping sections, animated banner slides, trust policy badges, and interactive category grids with smooth hover magnification.

Built using core Web technologies: **HTML5**, **CSS3**, and **Vanilla JavaScript** for a fast and interactive shopping experience.

---

## 🌟 Features

*   **Sleek Navigation Bar**: Integrates custom search bars, logo placeholder, utility actions (Become a Seller, Investor Relations), and responsive SVG icons for User Profile & Shopping Cart.
*   **Interactive Category Menus**: Horizontal navigation bar featuring list items covering extensive departments like Women Ethic, Men, Kids, Home & Kitchen, Electronics, Sports, and more. Includes a color-shift hover state.
*   **Dynamic Animated Promo Banner**: Auto-animates the main discount banner (`cont.png`) using CSS keyframes on load for an engaging landing experience.
*   **Service Trust Badges**: Inline policy widgets showing off customer-centric features such as "7 days return policy," "Cash on delivery," and "Lowest price" with official vector icons.
*   **Visual Category Grid**: Grid layout presenting major categories (Ethnic Wear, Western Wear, Shoes, Grocery, etc.) with responsive `.imgg img:hover` CSS scaling effects.
*   **Premium Gold Section**: A dedicated visual anchor showcasing premium categories with a beautifully styled "Shop Now" call-to-action button linking directly to the Gold store hub.

---

## 🛠️ File Structure

The project has a clean and simple structure:

*   [`index.html`](./index.html): The main markup document containing the site structure, navigation, product grid, cart sidebar, and footer.
*   [`shop.css`](./shop.css): Contains the core layout styling, flexbox/grid systems, animations, responsive design rules, and UI polish.
*   [`shop.js`](./shop.js): Handles interactivity such as toast notifications, dynamic product rendering, and cart state management.
*   `logo.png`: The store branding logo image.
*   `cont.png`: The main hero sales/deals promo banner image.

---

## 💻 Tech Stack & Design Decisions

*   **Structure**: Semantic HTML5 layout employing flexbox and grid containers.
*   **Styling**: Vanilla CSS3 with responsive design breakpoints and interactive hover states.
*   **Interactivity**: Vanilla JavaScript for dynamic cart updates, UI state management, and notifications.
*   **Typography & Icons**: Google Fonts (`Poppins`) and Font Awesome (`6.4.0`) for clean readable text and standard web icons.
*   **Micro-Animations**:
    *   **On-Load Slide**: The promo banner shifts downward and fades in gracefully using keyframe styling:
        ```css
        @keyframes slideIn {
            0% { transform: translateY(-20px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
        }
        ```
    *   **Scale Hover**: Product category images slightly zoom in (scale by 110%) smoothly upon hovering:
        ```css
        .imgg img:hover {
            transform: scale(1.1);
        }
        ```

---

## 🚀 How to Run

1.  Clone or download this repository onto your machine.
2.  Navigate to the `shopping` directory.
3.  Open the [`index.html`](./index.html) file directly in any modern web browser (Google Chrome, Mozilla Firefox, Microsoft Edge, Safari, etc.) by double-clicking it.
4.  No development servers, build configurations, or node packages are required!
