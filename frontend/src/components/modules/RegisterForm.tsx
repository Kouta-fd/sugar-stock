import type { FC, ChangeEventHandler, FormEventHandler } from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { TProduct } from "../../types/TProduct";
import { TouRating } from "../modules/TouRating";

export const RegisterForm: FC = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [product, setProduct] = useState<TProduct>();
  const [feeling, setFeeling] = useState<string>("");
  const [memo, setMemo] = useState<string>();
  const [selectedTou, setSelectedTou] = useState(3);
  const [latitude, setLatitude] = useState<number>();
  const [longitude, setLongitude] = useState<number>();
  const [wIcon, setWIcon] = useState<string>();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
    const url = `${process.env.REACT_APP_OW_API_URL}?lat=${latitude}&lon=${longitude}&units=metric&appid=${process.env.REACT_APP_OW_API_KEY}`;
    fetch(url)
      .then((data) => {
        return data.json();
      })
      .then((json) => {
        console.log(json);
        setWIcon(json.weather[0].icon);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [latitude, longitude]);

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
            price: product.minPrice,
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
  const handleFeelingChange: ChangeEventHandler<HTMLSelectElement> = ({
    target,
  }) => {
    setFeeling(target.value);
  };
  const handleMemoChange: ChangeEventHandler<HTMLTextAreaElement> = ({
    target,
  }) => {
    setMemo(target.value);
  };
  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const newPost = {
      name: product?.name,
      image_url: product?.image_url,
      max_price: product?.price,
      feeling: feeling,
      wIcon: wIcon,
      selectedTou: selectedTou,
      memo: memo,
    };
    console.log(newPost);
  };

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
        <div className="mt-7">
          <h1 className="text-center text-xl">記録</h1>
          <form onSubmit={handleSubmit}>
            <div className="w-1/2 mx-auto my-3 max-w-[350px]">
              <img
                className="w-full"
                src={product?.image_url}
                alt="product.name"
              />
            </div>
            <div className="flex">
              <div className="w-1/3">商品名</div>
              <div className="w-2/3">{product?.name}</div>
            </div>
            <div className="flex">
              <div className="w-1/3">金額</div>
              <div className="w-2/3">{product?.price}円</div>
            </div>
            <div className="flex">
              <label className="block font-medium text-gray-900 w-1/3">
                感情
              </label>
              <select
                id="feeling"
                value={feeling}
                onChange={handleFeelingChange}
                className="block text-gray-900 text-sm　p-2.5 w-2/3"
              >
                <option selected>感情を選択</option>
                <option value="0">喜</option>
                <option value="1">怒</option>
                <option value="2">哀</option>
                <option value="3">楽</option>
              </select>
            </div>
            <div className="flex">
              <div className="w-1/3">天気</div>
              <div className="w-2/3">
                {wIcon===undefined? <div>loading ...</div> : <img
                  src={`${process.env.REACT_APP_OW_ICON_URL}/${wIcon}.png`}
                />}
              </div>
            </div>
            <div className="flex">
              <div className="w-1/3">評価</div>
              <div className="w-2/3 flex">
                <TouRating
                  setSelectedTou={setSelectedTou}
                  selectedTou={selectedTou}
                />
              </div>
            </div>
            <div>
              <div>メモ</div>
              <textarea
                value={memo}
                onChange={handleMemoChange}
                className="w-full"
                placeholder="test"
              />
            </div>
            <div className="flex justify-around">
              <Link
                to="/home"
                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-full"
              >
                キャンセル
              </Link>
              <input
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                type="submit"
                value="登録"
              />
            </div>
          </form>
        </div>
      )}
    </>
  );
};
