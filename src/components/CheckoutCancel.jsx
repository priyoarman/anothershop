import { Link } from 'react-router-dom';

const CheckoutCancel = () => {
  return (
    <main className="container mx-auto min-h-screen p-4 text-center">
      <div className="mx-auto mt-16 max-w-xl">
        <h1 className="text-3xl font-bold text-yellow-700">Payment cancelled</h1>
        <p className="mt-4 text-yellow-700">
          No payment was taken. Your cart is still saved if you want to try again.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/cart"
            className="rounded bg-yellow-700 px-5 py-2 font-semibold text-white hover:bg-yellow-600"
          >
            Back to cart
          </Link>
          <Link
            to="/"
            className="rounded bg-orange-700 px-5 py-2 font-semibold text-white hover:bg-orange-600"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    </main>
  );
};

export default CheckoutCancel;
