"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { ArrowBigLeft } from "lucide-react";
import { ForgotPassword } from "@/service/Login/login";

export default function Forgot() {
  const [email, setEmail] = useState(""); 

  const forgotPassword = async (event) => {
    event.preventDefault();
    try {
      const response = await ForgotPassword(email);

      if (response.statusCode === 200 || response.statusCode === 201) {
        toast.success(response.message);
      } else {
        toast.error(response.errorMessages || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Forgot Password Failed");
    }
  };

  const handleInputChange = (e) => {
    setEmail(e.target.value); 
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-100 dark:bg-zinc-900">
      <div className="bg-white dark:bg-zinc-800 p-16 rounded-lg shadow-lg max-w-2xl w-full">
        <div className="flex flex-col items-center justify-center p-6 bg-card rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-primary">Forgot Password</h2>
          <p className="text-muted-foreground text-center mt-2">
            Enter your verification email
          </p>
          <input
            type="email"
            value={email}
            onChange={handleInputChange}
            placeholder="Your e-mail address"
            className="mt-4 p-2 border border-border rounded-lg w-full max-w-xs"
          />
          <button
            onClick={forgotPassword}
            className="mt-4 bg-green-500 text-white hover:bg-green-500/80 p-2 rounded-lg w-full max-w-xs"
          >
            Reset my Password
          </button>
          <a href="/" className="p-2 mt-4 bg-blue-500 rounded">
            <ArrowBigLeft className="text-2xl" />
          </a>
        </div>
      </div>
    </div>
  );
}
