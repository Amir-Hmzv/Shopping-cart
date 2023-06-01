import {  useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUser } from "../api";
import Spiner from "./Spiner";
import { UserAuth } from "../context/AuthContext";
import useDocumentTitle from "../helper/useDocumentTitle";
import { useDispatch } from "react-redux";
import { addItem } from "../store/cartReducer";
const ProductDetail = () => {

  const dispatch = useDispatch()

  type ProductProps = {
    id: number;
    title: string;
    price: number;
    image: string;
    description: string;
    rating: { rate: number; count: number };
    category: string;
  };
  const { user }: any = UserAuth();
  // const navigate =useNavigate()
  //   useEffect(() => {
  //    if (!user) {
  //     navigate('/')
  //    }

  //   return () => {
  //   }
  // }, [user])

  const { slug } = useParams();
  const [data, setData] = useState({} as ProductProps);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getUser(`/${slug}`).then((res) => {
      setData(res.data);
      setLoading(false);
    });
  }, []);

  const {
    title,
    category,
    description,
    image,
    price,
  }: ProductProps = data;
  useDocumentTitle(`${title}`)

  return (
    <>
      {loading ? (
        <Spiner />
      ) : (
        <div className="max-w-2xl mx-auto my-8 w-full h-[500px] flex justify-center p-5   space-y-2">
          <div className="my-10">
            <img
              className="w-full h-full object- rounded"
              src={image}
              alt={title}
            />
            <h1 className="text-3xl font-bold text-center md:text-start text-gray-800 my-3">
              {title}
            </h1>
            <p className="mt-2 text-gray-600 text-center md:text-start">
              {description}
            </p>
            <p className="mt-2 text-blue-500 text-center md:text-start">
              Category : <span className="text-gray-500">{category}</span>
            </p>

            <p className="mt-4 text-lg font-bold text-gray-800 text-center md:text-start">
              Price: ${price?.toFixed(2)}
            </p>
            {user && (
              <button onClick={() => dispatch(addItem({ ...data, quantity: 1, totalPrice: price })) } className="my-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded flex justify-center w-full">
                Add to Cart
              </button>
            )}
            <br />
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetail;
