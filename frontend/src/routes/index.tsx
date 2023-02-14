import type { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import UserLogin from "../pages/UserLogin";
import BarcodeScanner from "../pages/BarcordeScanner";
import RegisterForm from "../pages/RegisterForm";

const IndexRoutes: FC = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/barcorde-scanner" element={<BarcodeScanner />} />
        <Route path="/register-form/:id" element={<RegisterForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default IndexRoutes;
