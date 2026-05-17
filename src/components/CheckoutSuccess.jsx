import { useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CheckoutSuccess = () => {
  const { clearCart } = useCart();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const hasClearedCart = useRef(false);

  useEffect(() => {
    if (sessionId && !hasClearedCart.current) {
      hasClearedCart.current = true;
      clearCart();
    }
  }, [clearCart, sessionId]);

  return (
    <main className="container mx-auto min-h-screen p-4 text-center">
      <div className="mx-auto mt-16 max-w-xl">
        <h1 className="text-3xl font-bold text-yellow-700">Payment successful</h1>
        <p className="mt-4 text-yellow-700">
          Thank you for your order. Your cart has been cleared.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block rounded bg-yellow-700 px-5 py-2 font-semibold text-white hover:bg-yellow-600"
        >
          Continue shopping
        </Link>
      </div>
    </main>
  );
};

export default CheckoutSuccess;
