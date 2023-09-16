"use client";
import axios from "axios";
import React, { useState } from "react";
import toast ,{Toaster}from "react-hot-toast";


const ForgotPassword = () => {
  const [email, setEmail] = useState({
    email: "",
  });
  const [token,setToken] = useState('');
  const [verified,setVerified] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const forgotPasswordVerification = async () => {
    try {
      setIsSubmitting(true);
      await axios.post('/api/forgotpassword',email)
      setVerified(true);
      toast.success('Token has been sent to your e-mail');
      console.log(token);
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
      
    }finally {
      setIsSubmitting(false); 
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isSubmitting) {
      forgotPasswordVerification();
    }
  };

  return (
    <div>
      <section className="bg-gray-50">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 "
          >
            <img
              className="w-8 h-8 mr-2"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
              alt="logo"
            />
            Forgot Password
          </a>
          <div className="w-full p-6 bg-white rounded-lg shadow border md:mt-0 sm:max-w-md  border-gray-700 sm:p-8">
            
            <form
              onSubmit={handleSubmit}
              className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
            >
              <div>
                <label
                  for="email"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email.email}
                  onChange={(e) => setEmail({ ...email, email: e.target.value })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="name@company.com"
                  required=""
                />
              </div>
             
              <button
              onClick={forgotPasswordVerification}
              disabled={isSubmitting}
              className="text-md px-2 py-2 border border-blue-600 text-black rounded-lg">
                Reset Now !
              </button>
            </form>
            
          </div>
        </div>
      </section>
      <Toaster />
    </div>
  );
};

export default ForgotPassword;
