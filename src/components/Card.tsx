import { toast } from "react-toastify";
import { UserAuth } from "../context/AuthContext";
import { firstTitle, sunStr } from "../helper/helper";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem, deleteItem, selectCartItems } from "../store/cartReducer";
import { useSelector } from "react-redux";

const Card = ({
  title,
  price,
  description,
  image,
  category,
  id,
  product,
}: any) => {
  const cartItems = useSelector(selectCartItems);

  const { user }: any = UserAuth();
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    if (!user) {
      toast.warn("You need to sign in!", {
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

    if (user) {
      const existingItem = cartItems.find((item) => item.id === id);

      if (existingItem && existingItem.quantity > 0) {
        // If item already exists in cart and quantity > 0, remove it from cart
        dispatch(deleteItem(existingItem.id));
      } else {
        // If item doesn't exist in cart or quantity = 0, add it to cart
        dispatch(addItem({ ...product, quantity: 1, totalPrice: price }));
      }
    }
  };
  const buttonText = cartItems.find(
    (item) => item.id === id && item.quantity > 0 && user
  )
    ? "Delete"
    : "Add to Cart";
  const buttonColor = cartItems.find(
    (item) => item.id === id && item.quantity > 0 && user
  )
    ? "bg-red-500 hover:bg-red-700"
    : "bg-green-500 hover:bg-green-700";

  return (
    <div className="max-w-xs rounded overflow-hidden shadow-lg ">
      <img className="w-[300px] h-[300px]" src={image} alt={title} />
      <div className="px-6 py-4">
        <div className="flex justify-between">
          <div className="font-bold text-lg mb-2">{firstTitle(title)}</div>
          <div className="text-sm">{category}</div>
        </div>
        <p className="text-gray-700 text-base">{sunStr(description)}</p>
      </div>
      <div className="flex justify-around py-2 px-4 ">
        <Link
          to={`/product/${id}`}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Details
        </Link>
        <button
          onClick={handleAddToCart}
          className={`bg-green-500  text-white font-bold py-2 px-4 rounded ${buttonColor} focus:outline-none focus:shadow-outline`}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default Card;
