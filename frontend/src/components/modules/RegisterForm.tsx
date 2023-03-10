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
      price: product?.price,
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
          <div>?????????????????????????????????</div>
          <Link to="/barcorde-scanner">????????????????????????</Link>
        </div>
      ) : (
        <div className="mt-7 px-5">
          <h1 className="text-center text-xl">??????</h1>
          <form onSubmit={handleSubmit}>
            <div className="w-1/2 mx-auto my-3 max-w-[350px] border-bottom">
              <img
                className="w-full"
                src={product?.image_url}
                alt="product.name"
              />
            </div>
            <div className="flex border-b pb-3">
              <div className="w-1/3">?????????</div>
              <div className="w-2/3">{product?.name}</div>
            </div>
            <div className="flex mt-3 border-b pb-3">
              <div className="w-1/3">??????</div>
              <div className="w-2/3">{product?.price}???</div>
            </div>
            <div className="flex mt-3 border-b pb-3">
              <label className="block font-medium text-gray-900 w-1/3">
                ??????
              </label>
              <select
                id="feeling"
                value={feeling}
                onChange={handleFeelingChange}
                className="block text-gray-900 text-sm???p-2.5 w-2/3"
              >
                <option selected>???????????????</option>
                <option value="0">???</option>
                <option value="1">???</option>
                <option value="2">???</option>
                <option value="3">???</option>
              </select>
            </div>
            <div className="flex mt-3 border-b pb-3">
              <div className="w-1/3">??????</div>
              <div className="w-2/3">
                {wIcon===undefined? <div>loading ...</div> : <img
                  src={`${process.env.REACT_APP_OW_ICON_URL}/${wIcon}.png`}
                />}
              </div>
            </div>
            <div className="flex mt-3 border-b pb-3">
              <div className="w-1/3">??????</div>
              <div className="w-2/3 flex">
                <TouRating
                  setSelectedTou={setSelectedTou}
                  selectedTou={selectedTou}
                />
              </div>
            </div>
            <div className="mt-3 pb-3">
              <div>??????</div>
              <textarea
                value={memo}
                onChange={handleMemoChange}
                className="w-full border p-3"
                placeholder="test"
              />
            </div>
            <div className="flex justify-around mt-5 mb-10">
              <Link
                to="/"
                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-full"
              >
                ???????????????
              </Link>
              <input
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                type="submit"
                value="??????"
              />
            </div>
          </form>
        </div>
      )}
    </>
  );
};
