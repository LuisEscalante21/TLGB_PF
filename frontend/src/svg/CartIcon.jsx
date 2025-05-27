import React from 'react';
import { ShoppingCart } from 'lucide-react';

const CartIcon = ({ itemCount, onClick }) => {
  return (
    <div className="relative cursor-pointer" onClick={onClick}>
      <ShoppingCart size={34} className="text-white hover:text-orange-500 transition-colors" />
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </div>
  );
};

export default CartIcon;