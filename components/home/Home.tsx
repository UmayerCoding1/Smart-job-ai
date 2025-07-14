"use client";

import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "@/app/features/user/userSlice";
import Hero from "./Hero";

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
  return <div>
    <Hero/>
  </div>;
};

export default Home;
