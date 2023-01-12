import { Link } from "react-router-dom";
const HomePage = () => {
  return (
    <div>
      <h1>home</h1>
      <Link to={`/user-login/`}>ログイン</Link>
    </div>
  );
};
export default HomePage;
