import Card from "./Card";

type ProductProps = {
  product: {
    id: number;
    title: string;
    price: number;
    image: string;
    description: string;
    rating: { rate: number; count: number };
    category: string;
  };
};

const Product = ({ product }: ProductProps) => {

    const  {title,category,description,image,price,id} = product


  return <div className="g">
            <Card product={product} title={title} description={description} id={id} category={category} price={price}  image={image}/>

  </div>
};

export default Product;
