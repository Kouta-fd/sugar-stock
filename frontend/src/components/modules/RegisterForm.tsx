import type { FC } from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { TProduct } from "../../types/TProduct";

export const RegisterForm: FC = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [product, setProduct] = useState<TProduct>();

  useEffect(() => {
    if (id !== null) {
      setIsLoading(true);
      axios
        .get(
          `${process.env.REACT_APP_RAKUTEN_API}?applicationId=${process.env.REACT_APP_RAKUTEN_ID}&format=json&keyword=${id}`
        )
        .then((res) => {
          console.log(res.data);
          const product = res.data.Products[0].Product;
          const scannedProduct = {
            name: product.productName,
            image_url: product.mediumImageUrl,
            max_price: product.maxPrice,
          };
          setProduct(scannedProduct);
          setIsLoading(false);
        })
        .catch((e) => {
          console.log(e);
          setIsError(true);
          setIsLoading(false);
        });
    } else {
      setIsError(true);
      setIsLoading(false);
    }
  }, []);

  return (
    <>
      {isLoading ? (
        <div>loading ...</div>
      ) : isError ? (
        <div>
          <div>スキャンに失敗しました</div>
          <Link to="/barcorde-scanner">もう一度スキャン</Link>
        </div>
      ) : (
        <div>
          <div>{product?.name}</div>
          <div>
            <img src={product?.image_url} alt="product.name" />
          </div>
          <div>{product?.max_price}円</div>
        </div>
      )}
    </>
  );
};
