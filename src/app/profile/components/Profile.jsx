"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const Profile = () => {
  const router = useRouter();
  const [data, setData] = useState();

  useEffect(() => {
    handleUserDetails();
  }, []);

  const handleUserDetails = async () => {
    try {
      const response = await axios.get("/api/me");
      console.log(response.data.user.name);
      setData(response.data.user.name);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("/api/logout");
      console.log("Logout Successfully");
      router.push("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex justify-center my-auto items-center border-2 mx-auto">
      <div className="p-5 m-2">
        <button className="rounded-lg bg-slate-400 text-black px-4 py-2">
          <Link href={`/profile/${data}`}>
            {data ? `${data}'s Profile` : "Click to get your details"}
          </Link>
        </button>

        <div className=" p-5 m-2">
          <button
            onClick={handleLogout}
            className="rounded-lg bg-slate-400 text-black px-4 py-2"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
