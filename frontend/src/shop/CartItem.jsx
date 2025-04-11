import React, { useState } from "react";
import "./CartItem.css";

const CartItem = ({ item, onAdd, onSubtract }) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleAdd = () => {
    setQuantity(quantity + 1);
    onAdd(item.id, 1);
  };

  const handleSubtract = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      onSubtract(item.id, 1);
    }
  };

  return (
    <div className="bg-white shadow-md p-4 rounded-md flex items-center space-x-4">
      <div className="flex-shrink-0">
        <img src={item.image} alt={item.name} className="h-16 w-16 object-cover rounded-md" />
      </div>
      <div>
        <div className="text-lg font-medium text-gray-900">{item.name}</div>
        <div className="text-gray-500">${item.price}</div>
      </div>
      <div className="flex-grow-0 flex items-center space-x-2">
        <button
          className="bg-gray-100 text-gray-600 py-1 px-2 rounded-md hover:bg-gray-200"
          onClick={handleSubtract}
        >
          -
        </button>
        <div className="text-lg font-medium text-gray-900">{quantity}</div>
        <button
          className="bg-gray-100 text-gray-600 py-1 px-2 rounded-md hover:bg-gray-200"
          onClick={handleAdd}
        >
          +
        </button>
      </div>
      <div className="text-lg font-medium text-gray-900">${item.price * quantity}</div>
    </div>
  );
};

export default CartItem;