"use client";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

const VerifyEmail = () => {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const handleVerification = async () => {
    try {
      await axios.post("/api/verifyemail", { token });
      setVerified(true);
      // router.push("/profile");
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };

  useEffect(() => {
    const URL = window.location.search.split("=")[1];
    setToken(URL || "");
  }, [token]);

  useEffect(() => {
    if (token.length > 0) {
      handleVerification();
    }
  }, [token]);

  return (
    <>
      <div className="flex flex-col items-center justify-center py-2 min-h-screen">
        <div>
          <h1 className="text-4xl ">Verify e-mail</h1>
          <h2 className="bg-orange-400 text-black  mt-2 p-2">
            {token ? ` E-mail verified successfully` : "no Token Found"}
          </h2>{" "}
          <br />
           <button  className="w-1/2 bg-blue-500 text-white rounded-lg p-3">
            <Link href={token ? '/login' : '/signup'}>
            {token ? "Login " : "Processing"}
            </Link>
          </button>
          {verified && <div>
              <h1>Verified </h1>
              </div>}

          {error && (
            <div>
              <h2 className="tex-2xl bg-red-500 text-white">{error.message}</h2>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default VerifyEmail;
