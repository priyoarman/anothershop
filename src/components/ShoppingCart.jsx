/** This component renders the shopping cart for the app. */

import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const ShoppingCart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const [checkoutError, setCheckoutError] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Calculate the total price
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  ).toFixed(2);

  const handleCheckout = async () => {
    setCheckoutError('');
    setIsCheckingOut(true);

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cartItems.map((item) => ({
            id: item.id,
            quantity: item.quantity,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Unable to start checkout.');
      }

      if (!data.url) {
        throw new Error('Checkout URL was not returned.');
      }

      window.location.href = data.url;
    } catch (error) {
      setCheckoutError(error.message || 'Unable to start checkout.');
      setIsCheckingOut(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl text-yellow-700 font-bold mb-6 text-center py-4 mt-8">Shopping Cart</h1>
        <p className='text-center text-amber-600 py-4 mt-4'>Your cart is empty.</p>
        <Link to="/" className="text-yellow-500 hover:underline">
        <p className='text-center py-4'>Continue shopping</p>
          
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl text-yellow-700 font-bold mb-6">Shopping Cart</h1>
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center p-4 rounded shadow">
            <img
              src={item.image}
              alt={item.title}
              className="w-16 h-16 object-contain rounded"
            />
            <div className="ml-4 flex-grow">
              <h2 className="text-lg text-yellow-700 font-bold">{item.title}</h2>
              <p className="text-yellow-700">€{item.price} x {item.quantity}</p>
            </div>
            <div>
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) =>
                  updateQuantity(item.id, Number(e.target.value))
                }
                className="w-16 text-yellow-700 border rounded p-1"
              />
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="ml-4 bg-orange-700 text-white py-1 px-3 rounded hover:bg-orange-600 cursor-pointer"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          onClick={clearCart}
          className="bg-orange-700 text-white py-2 px-4 rounded hover:bg-orange-600 cursor-pointer"
        >
          Clear Cart
        </button>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="text-xl text-yellow-600 font-bold">Total: €{totalPrice}</div>
          <button
            type="button"
            onClick={handleCheckout}
            disabled={isCheckingOut}
            className="bg-yellow-700 text-white py-2 px-5 rounded hover:bg-yellow-600 cursor-pointer"
          >
            {isCheckingOut ? 'Starting checkout...' : 'Checkout'}
          </button>
        </div>
      </div>
      {checkoutError && (
        <p className="mt-3 text-sm font-semibold text-red-600">
          {checkoutError}
        </p>
      )}
      <div className="mt-4">
        <Link to="/" className="text-yellow-600 font-semibold hover:underline">
          Continue shopping
        </Link>
      </div>
    </div>
  );
};

export default ShoppingCart;
