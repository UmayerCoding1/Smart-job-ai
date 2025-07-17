"use client";

import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "@/app/features/user/userSlice";
import Hero from "./Hero";
import Jobs from "./Jobs";
import Capabilities from "./Capabilities";
import Categorys from "./Categorys";
import Company from "./Company";
import About from "./About";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const handleLogdenUser = async () => {
      const res = await axios.get("/api/auth/loged-user", {
        withCredentials: true,
      });
      dispatch(setUser(res.data.user));
    };

    handleLogdenUser();
  }, [dispatch]);
  return (
    <div className="flex flex-col gap-10">
      <Hero />

      <div className="lg:max-w-7xl lg:mx-auto p-2 lg:p-0">
        <Jobs />
        <Capabilities />
        <Categorys/>
        <About/>
        <Company/>
      </div>
    </div>
  );
};

export default Home;
