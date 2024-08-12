"use client";
import React, { useState } from 'react';
import {  LoginAdmin } from '@/service/Login/login';
import toast from "react-hot-toast";

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if(username == '' || password == ''){
        toast.error("Do not leave your account or password blank")
        return
      }
      const data = {email: username, password: password}
      const response = await LoginAdmin(data);
      if(response.statusCode === 200 || response.statusCode === 201) {
        toast.success(response.message);
        localStorage.setItem('currentUser', JSON.stringify(response));
        window.location.href = '/admin-add-product';
      }
      else {
        toast.error(response.errorMessages)
      }
    } catch (error) {
      console.log(error);
      toast.error('Login Fail');
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-100 dark:bg-zinc-900">
      <div className="bg-white dark:bg-zinc-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-center text-2xl font-bold text-zinc-800 dark:text-zinc-200 mb-6">Smart PC Build Login-Admin</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-zinc-700 dark:text-zinc-300 mb-2" htmlFor="username">Username</label>
            <input
              className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:text-zinc-300"
              type="text"
              id="username"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-zinc-700 dark:text-zinc-300 mb-2" htmlFor="password">Password</label>
            <input
              className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:text-zinc-300"
              type="password"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

