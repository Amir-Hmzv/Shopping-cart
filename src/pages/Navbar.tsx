import { ShoppingCartIcon, HomeIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { useSelector } from "react-redux";
import { selectCartItems } from "../store/cartReducer";

const Navbar = () => {
  const { googleSignIn, user, logOut }: any = UserAuth();
  const cartItems = useSelector(selectCartItems);

   const totalCounter = (items: { price: number, quantity: number }[]) => {
    return items.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
  };
  

  console.log({
    user,
    googleSignIn,
  });

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full py-3 px-10  flex flex-row-reverse justify-between  bg-blue-500">
      <div className="flex space-x-3 ">
        {user?.displayName ? (
          <div className="flex items-center">
            {" "}
            <h1 className="align-middle hidden  lg:block pr-4 text-white italic font-bold">{user.displayName}</h1>
            <button
              onClick={logOut}
              className="bg-white text-md rounded-md p-2 px-3 italic hover:bg-black hover:text-white transition-all duration-150 ease-linear"
            >
              sing out
            </button>
          </div>
        ) : (
          <button
            onClick={handleGoogleSignIn}
            className="bg-white text-md rounded-md p-2 italic hover:bg-black hover:text-white transition-all duration-150 ease-linear"
          >
            sign in
          </button>
        )}

        {user?.displayName ? (
          <Link to={'/checkout'} className="relative">
            <ShoppingCartIcon className="w-10 h-10 text-white cursor-pointer" />
            <span className="absolute bottom-5 left-6 bg-blue-700 rounded-full px-2 text-white ">
              {totalCounter(cartItems)}
            </span>
          </Link>
        ) : null}
      </div>
      <div>
        <Link to={"/"}>
          {" "}
          <HomeIcon className="w-10 h-10 text-white cursor-pointer" />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
