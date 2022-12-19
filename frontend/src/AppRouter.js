import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Drawing from "./Drawing/Drawing";
import Home from "./Home/Home";

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/drawing" element={<Drawing />} />
        </Routes>
    );
};

export default AppRouter;