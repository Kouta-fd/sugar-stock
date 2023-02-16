import { Link } from "react-router-dom";
const HomePage = () => {
  return (
    <div className="mt-16">
      <h1 className="text-5xl text-center">糖</h1>
      <div className="text-center mt-24">
        <div>
          <Link
            className="bg-orange-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            to={`/user-login/`}
          >
            ログイン
          </Link>
        </div>
        <div className="mt-5">
          <Link
            className="bg-orange-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            to={`/barcorde-scanner`}
          >
            ログインしないで使う
          </Link>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
