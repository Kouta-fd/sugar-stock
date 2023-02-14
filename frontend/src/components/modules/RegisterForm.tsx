import type { FC } from "react";
import axios from "axios";

export const RegisterForm: FC = () => {
  axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
  const testCode = 9784591169711;
  axios
    .get(
      `${process.env.REACT_APP_YAHOO_API}?appid=${process.env.REACT_APP_YAHOO_ID}&jan_code=${testCode}`
    )
    .then((res) => {
      console.log(res.data);
    });

  return <div>test</div>;
};
