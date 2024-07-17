"use client";
import React, { useState } from 'react';
import {  RegisterAdmin } from '@/service/Login/login';
import { toast } from 'react-hot-toast';
export default function Register() {
    const [fullname, setFullname] = useState('');
    const [username, setUsername] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
          if (password !== repeatPassword) {
            toast.error('Repeated passwords do not match');
            return;
          }
          const data = {
            fullName: fullname,
            email: email,
            phone: phone,
            address: address,
            username: username,
            password: password,
          };
    
          const response = await RegisterAdmin(data);
          if(response.statusCode === 200 || response.statusCode === 201) {
            toast.success('Register Success');
            window.location.href = '/login';
          }
          else {
            toast.error(response.errorMessages)
          }
        } catch (error) {
          toast.error('Register Fail');
        }
      };
    return (
        <div className="flex items-center justify-center min-h-screen bg-zinc-100 dark:bg-zinc-900">
      <div className="bg-white dark:bg-zinc-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-center text-2xl font-bold text-zinc-800 dark:text-zinc-200 mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-zinc-700 dark:text-zinc-300 mb-2" htmlFor="fullname">Full name</label>
            <input
              className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:text-zinc-300"
              type="text"
              id="fullname"
              placeholder="Enter full name"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-zinc-700 dark:text-zinc-300 mb-2" htmlFor="email">Email</label>
            <input
              className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:text-zinc-300"
              type="email"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-zinc-700 dark:text-zinc-300 mb-2" htmlFor="phone">Phone</label>
            <input
              className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:text-zinc-300"
              type="text"
              id="phone"
              placeholder="Enter phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-zinc-700 dark:text-zinc-300 mb-2" htmlFor="Address">Address</label>
            <input
              className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:text-zinc-300"
              type="text"
              id="address"
              placeholder="Enter Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-zinc-700 dark:text-zinc-300 mb-2" htmlFor="username">Username</label>
            <input
              className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:text-zinc-300"
              type="text"
              id="username"
              placeholder="Enter Username"
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
          <div className="mb-4">
            <label className="block text-zinc-700 dark:text-zinc-300 mb-2" htmlFor="repeat-password">Repeat password</label>
            <input
              className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:text-zinc-300"
              type="password"
              id="repeat-password"
              placeholder="Enter repeat password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
          </div>
          <button
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="submit"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}