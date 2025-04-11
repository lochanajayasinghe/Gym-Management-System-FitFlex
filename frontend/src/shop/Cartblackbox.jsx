// import React, { useState } from "react";
// import CartItem from "./CartItem";

// const Cart = () => {
//   const [cartItems, setCartItems] = useState([
//     { id: 1, name: "Product 1", image: "https://example.com/product1.jpg", price: 10, quantity: 2 },
//     { id: 2, name: "Product 2", image: "https://example.com/product2.jpg", price: 20, quantity: 1 },
//     { id: 3, name: "Product 3", image: "https://example.com/product3.jpg", price: 30, quantity: 3 },
//   ]);

// //handle adding of items
// const addToCart = (item) => {
//     const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
  
//     if (existingItem) {
//       const updatedCartItems = cartItems.map((cartItem) =>
//         cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
//       );
//       setCartItems(updatedCartItems);
//     } else {
//       setCartItems([...cartItems, { ...item, quantity: 1 }]);
//     }
//   };
// //remove of an item
// const removeFromCart = (itemId) => {
//     const updatedCartItems = cartItems.filter((cartItem) => cartItem.id !== itemId);
//     setCartItems(updatedCartItems);
//   };
// //quantity change
// const handleQuantityChange = (event, item) => {
//     const updatedCartItems = cartItems.map((cartItem) =>
//       cartItem.id === item.id ? { ...cartItem, quantity: parseInt(event.target.value) } : cartItem
//     );
//     setCartItems(updatedCartItems);
//   };


  
//   const onAdd = (id, quantity) => {
//     setCartItems(
//       cartItems.map((item) => {
//         if (item.id === id) {
//           return { ...item, quantity: item.quantity + quantity };
//         }
//         return item;
//       })
//     );
//   };

//   const onSubtract = (id, quantity) => {
//     setCartItems(
//       cartItems.map((item) => {
//         if (item.id === id) {
//           return { ...item, quantity: item.quantity - quantity };
//         }
//         return item;
//       })
//     );
//   };

//   return (
//     <div className="space-y-4">
//       {cartItems.map((item) => (
//         <CartItem
//           key={item.id}
//           item={item}
//           onAdd={() => onAdd(item.id, 1)}
//           onSubtract={() => onSubtract(item.id, 1)}
//         />
//       ))}
//     </div>
//   );
// };

// export default Cart;