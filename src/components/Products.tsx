import { useEffect, useState } from "react";
import { getUsers } from "../api";
import Spiner from "./Spiner";
import Product from "./Product";

const Products = () => {
  const [data, SetData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  useEffect(() => {
    getUsers().then((res) => {
      SetData(res.data);
      setIsLoading(false);
    });
  }, [data]);

  return (
    <>
      {isLoading ? (
        <Spiner />
      ) : (
        <div className="w-[90%] place-items-center space-x-5 my-10	 mx-auto grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 px-4">
          {data?.map((item: any) => {
            return <Product key={item.id} product={item} />;
          })}
        </div>
      )}
    </>
  );
};

export default Products;
