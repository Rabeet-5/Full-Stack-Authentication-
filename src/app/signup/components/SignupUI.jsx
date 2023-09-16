"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

const Signup = () => {
  const router = useRouter();
  const [user, setuser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignup = async () => {
    try {
      setIsSubmitting(true);
      const response = await axios.post("/api/signup", user);
      console.log("Signup Successfull ", response.data);
      router.push("/login");
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsSubmitting(false); 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleSignup();
  };

  return (
    <>
      <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
        <div>
          <a href="/">
            <h3 className="text-4xl font-bold text-purple-600">Sigup</h3>
          </a>
        </div>
        <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg">
          <form onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Name
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={(e) => setuser({ ...user, name: e.target.value })}
                  width={100}
                  className="block px-4 py-4 w-full mt-1 border-black border-2 rounded-md shadow-sm "
                />
              </div>
            </div>
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
              </div>
            </div>

            <div className="flex items-center justify-end mt-4">
              <Link href={"/login"} className="text-sm">
                Already Registered ! <br />
                Login Now
              </Link>
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
                onClick={handleSignup}
              >
                {isSubmitting ? "Signing Up..." : "Register"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
