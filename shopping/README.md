# 🛍️ Looto — Modern E-Commerce Landing Page

A lightweight, responsive, and modern front-end e-commerce landing page clone of popular online shopping platforms (inspired by Meesho). It features a sleek navigation interface, categorized shopping sections, animated banner slides, trust policy badges, and interactive category grids with smooth hover magnification.

Built entirely using native Web technologies: **HTML5** and **Vanilla CSS3**—zero dependencies, zero external libraries, and extremely fast page load times.

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

*   [shoping.html](file:///d:/My%20Apps/project/shoping/shoping.html): The main markup document defining the skeleton, menus, grid structures, and inline SVGs.
*   [shop.css](file:///d:/My%20Apps/project/shoping/shop.css): Contains layout styling, keyframe animations, font-face imports (`Poppins`), scaling hover effects, and flex layouts.
*   `logo.png`: The store branding logo image.
*   `cont.png`: The main hero sales/deals promo banner image.

---

## 💻 Tech Stack & Design Decisions

*   **Structure**: Semantic HTML5 layout employing tags like `<nav>`, `<li>` menus, flexbox columns, and SVG vector paths.
*   **Typography**: Integrated Google Fonts including `Poppins`, `Alumni Sans SC`, `Dancing Script`, and `Source Code Pro` for clean, readable text.
*   **Layout Engine**: Built using pure Flexbox (`display: flex`) for simple alignment, distribution of workspace menus, and a responsive navigation header.
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

1.  Clone or download this project directory onto your machine.
2.  Navigate to the directory: `d:\My Apps\project\shoping`.
3.  Open the [shoping.html](file:///d:/My%20Apps/project/shoping/shoping.html) file directly in any modern web browser (Google Chrome, Mozilla Firefox, Microsoft Edge, Safari, Brave, etc.) by double-clicking it.
4.  No development servers, build configurations, or node packages are required!
