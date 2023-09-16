"use client";
import React, { useState } from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import axios from "axios";

const Login = () => {
  const router = useRouter();
  const [user, setuser] = useState({
    email:'',
    password:''
  });

  const handleLogin =async () => {
    try {
        const response = await axios.post("/api/login", user);
        console.log("Login Successfull ", response.data);
        router.push("/profile");
      } catch (error) {
        console.log(error.message,'Login failed');
      }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    handleLogin();
  };

  return (
    <>
      <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
        <div>
          <a href="/">
            <h3 className="text-4xl font-bold text-blue-800">Login</h3>
          </a>
        </div>
        <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg">
          <form onSubmit={handleSubmit}>
            <div className="mt-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Email
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={(e) => setuser({ ...user, email: e.target.value })}
                  width={100}
                  className="block px-4 py-4 w-full mt-1 border-black border-2 rounded-md shadow-sm "
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Password
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="password "
                  name="password"
                  value={user.password}
                  onChange={(e) =>
                    setuser({ ...user, password: e.target.value })
                  }
                  width={100}
                  className="block px-4 py-4 w-full mt-1 border-black border-2 rounded-md shadow-sm "
                />
                <Link href={"/forgotpassword"} className="text-sm mt-3 text-blue-800 flex justify-end items-end">
               Forgot Password ?
              </Link>
              </div>
            </div>

            <div className="flex items-center justify-end mt-4">
              <Link href={"/signup"} className="text-sm ">
               Don't have account ! <br />
                Register here
              </Link>
              
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
