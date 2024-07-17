import React from "react";
import { Input } from "../ui/input";
import { Search } from "lucide-react";

export default function SearchInput({ placeholder = "" }) {
  return (
    <div className="relative flex items-center w-[90%] lg:w-auto ">
      <Input
        placeholder={placeholder}
        className="w-full border-2 lg:border-none lg:w-auto lg:min-w-[380px]"
      />
      <Search
        color="#026db5"
        className="absolute bottom-2 right-2 cursor-pointer"
      />
    </div>
  );
}
