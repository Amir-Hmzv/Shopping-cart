import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import {
  increaseQuantity,
  decreaseQuantity,
  selectCartItems,
  selectCartTotal,
  selectItemTotal,
  checkout,
} from "../store/cartReducer";
import useDocumentTitle from "../helper/useDocumentTitle";

function CheckoutPage() {
  useDocumentTitle("Checkout");
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  const handleCheckout = () => {
    dispatch(checkout()); // Dispatch checkout action

    if (cartItems[0]) {
      toast.success("Checkout Successful!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast.error("take a product!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }

    // Show a success message or redirect the user to a confirmation page
  };

  cartItems.map((item) => {
    console.log(item);
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8 ">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <table className="w-full text-center ">
        <thead>
          <tr>
            <th className="py-2 invisible">Item</th>
            <th className="py-2">Title</th>
            <th className="py-2">Quantity</th>

            <th className="py-2 hidden sm:table-cell">Total</th>
          </tr>
        </thead>
        <tbody className="space-y-3 divide-y divide-gray-200">
          {cartItems.map((item) => (
            <tr key={item.id}>
              <td>
                <img
                  src={item?.image}
                  className="w-[150px] h-[150px] my-2 pl-5 sm:w-[100px] sm:h-[100px]"
                  alt=""
                />
              </td>
              <td className="py-2 sm:text-sm">{item.title}</td>
              <td className="py-2 hidden ">${item.price.toFixed(2)}</td>
              <td className="py-2">
                <div className="flex items-center justify-center sm:justify-start space-x-2">
                  <button
                    className="border border-gray-300 rounded-full w-10 h-10 flex items-center justify-center"
                    onClick={() => dispatch(decreaseQuantity(item.id))}
                  >
                    <span className="text-gray-600 font-bold text-lg">-</span>
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    className="border border-gray-300 rounded-full w-10 h-10 flex items-center justify-center"
                    onClick={() => dispatch(increaseQuantity(item.id))}
                  >
                    <span className="text-gray-600 font-bold text-lg">+</span>
                  </button>
                </div>
              </td>
              <td className="py-2  hidden sm:table-cell">
                $
                {selectItemTotal(item.id)({
                  cart: { items: cartItems },
                }).toFixed(2)}
              </td>
            </tr>
          ))}
          <tr>
            <td className="py-2 font-bold">Total</td>
            <td className="py-2"></td>
            <td className="py-2"></td>
            <td className="py-2 font-bold">${cartTotal.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
      <div className="flex justify-end mt-4">
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          onClick={handleCheckout}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}

export default CheckoutPage;
