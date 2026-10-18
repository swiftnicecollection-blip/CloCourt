/* =====================================================
   CLOCOURT SETTINGS + PRODUCTS  (edit this file freely)
   ===================================================== */

/* 1. Business settings: replace the placeholders */
const CONFIG = {
  whatsapp: "923074378307",          // Country code + number. No "+", spaces or dashes
  phone: "+92 307 4378307",
  email: "swiftnicecollection@gmail.com.com",
  banner: "New collection now available. Order on WhatsApp, CloCourt",  // Top banner text
};

/* 2. Products: copy one block to add a product (1 to 10 is ideal).
   id must be unique. price is a number in PKR (no commas).
   reviews: leave empty until you have GENUINE customer reviews, e.g.
   reviews: [{ name: "Ali", rating: 5, text: "Great fit." }]          */
const PRODUCTS = [
  { id: 1, name: "Cotton Dress Shirt", price: 1999, featured: true, image: "Z:\\abubakar work\\clocourt\\images\\dress_shirt.jpg",
    alt: "Cotton Dress Shirt",
    description: "A crisp everyday shirt with a clean collar and a relaxed, tailored fit. \n The shirt is made from high-quality cotton fabric, which is soft, breathable, and comfortable to wear. It is perfect for both casual and formal occasions, and can be dressed up or down depending on the occasion.\n The shirt features a classic button-down design with a pointed collar and long sleeves with buttoned cuffs. It has a slim fit that flatters the body shape and provides a modern look.\n It is available in a range of sizes to fit different body types.",
    sizes: ["14.5", "15", "15.5", "16","16.5","17","17.5"], colours: [ "White", "Black", "Navy Blue", "Sky Blue"," Sage Green"," Cream", "Maroon", "Grey"], reviews: [] },
  { id: 2, name: "Cotton Pant", price: 2199, featured: true, image: "Z:\\abubakar work\\clocourt\\images\\cotton_pant.jpg",
    alt: "Cotton Pant",
    description: "Elevate your style with our Men's Cotton pant. Made for ultimate comfort and versatility, these jeans feature a stylish fit that easily transitions from casual to polished looks. Crafted from premium cotton for durability, they’re your go-to choice for any occasion!.",
    sizes: [28, 30,32 ,34,36,38 ], colours: ["Green", "Black","Brown", "Beige","Blue","Grey"], reviews: [] },
  { id: 3, name: "Cotton Cargo Trousers", price: 2399, featured: true, image: "Z:\\abubakar work\\clocourt\\images\\cargo.jpg",
    alt: "Cotton Cargo Trousers on a neutral background",
    description: "Made with premium cotton fabric, these cargo pants feature a practical 6-pocket design, durable stitching, and a breathable, comfortable feel for everyday wear. The straight-fit leg opening offers a clean, stylish look, while the elastic waistband with an adjustable drawstring ensures a secure and comfortable fit.",
    sizes: ["30", "32", "34", "36","38","40"], colours: ["Green", "Black","Blue","Beige","Grey","White","Brown","Camel","Cream"], reviews: [] },
  { id: 4, name: "Premium Polo Shirt", price: 1699, featured: true, image: "Z:\\abubakar work\\clocourt\\images\\polo.jpg",
    alt: "Premium Polo Shirt on a neutral background",
    description: "Upgrade your style with our Premium Polo Shirts, crafted from high-quality fabric for a refined look and all-day comfort. Featuring a classic polo collar, a clean and elegant design, and a comfortable fit, these shirts are perfect for casual outings, everyday wear, and smart-casual occasions. Enjoy breathable comfort, a premium feel, and timeless style that never goes out of fashion.",
    sizes: ["Small", "Medium", "Large", "XL"], colours: ["Black", "Green","Yellow","Maroon","Navy Blue","White","Brown","Grey","Royal Blue"], reviews: [] },
  { id: 5, name: "Denim Jeans Pant", price: 2499, featured: false, image: "Z:\\abubakar work\\clocourt\\images\\jeans_pant.jpg",
    alt: "Denim Jeans Pant on a neutral background",
    description: "Upgrade your everyday style with our Premium Denim Jeans, designed to deliver the perfect fit, an attractive look, and lasting comfort. Crafted from quality denim fabric with durable stitching, these jeans offer reliable wear and a stylish finish for everyday use. Their versatile design makes them easy to pair with T-shirts, polo shirts, and casual shirts, making them a perfect choice for casual outings and everyday fashion.",
    sizes: ["28","30", "32", "34", "36","38"], colours: ["Blue","Dark Blue", "Jet Black"], reviews: [] },
  { id: 6, name: "Baggy Jeans", price: 2999, featured: false, image: "Z:\\abubakar work\\clocourt\\images\\baggy.jpg",
    alt: "Baggy Jeans on a neutral background",
    description: "Elevate your streetwear style with our Premium Baggy Jeans, designed for a relaxed fit, modern aesthetics, and all-day comfort. Crafted from quality denim fabric with durable stitching, these jeans offer a roomy silhouette that allows easy movement while delivering a bold, trendy look. Perfect for casual outings, everyday wear, and streetwear-inspired outfits, they pair effortlessly with oversized T-shirts, premium polos, and casual shirts.",
    sizes: ["28","30", "32", "34", "36","38"], colours: ["Blue","Dark Blue", "Jet Black"], reviews: [] },
  { id: 7, name: "T-Shirts", price: 1199, featured: false, image: "Z:\\abubakar work\\clocourt\\images\\t_shirts.jpg",
    alt: "T-Shirt",
    description: "Upgrade your everyday wardrobe with our Premium Cotton T-Shirt, crafted from 100% premium cotton for exceptional comfort and a soft, breathable feel. Its lightweight, non-see-through fabric provides confident coverage, while the regular fit offers a relaxed and stylish look for all-day wear. Perfect for casual outings, everyday essentials, and effortless styling, this T-shirt combines comfort, quality, and timeless simplicity.",
    sizes: ["Small", "Medium", "Large", "XL"], colours: ["Black", "White", "Red", "Blue","Maroon","Grey","Green"], reviews: [] }
];
