import type { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/HomePage";
import UserLoginPage from "../pages/UserLoginPage";
import BarcodeScanner from "../pages/BarcordeScannerPage";

const IndexRoutes: FC = () => {
  // const { hash, pathname } = useLocation();

  // useEffect(() => {
  //   if (!hash) {
  //     window.scrollTo(0, 0);
  //   }
  // }, [hash, pathname]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user-login" element={<UserLoginPage />} />
        <Route path="/barcorde-scanner" element={<BarcodeScanner />} />
      </Routes>
    </BrowserRouter>
  );
};

export default IndexRoutes;
