"use client";
import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { FilterProducts } from "@/service/Api-service/apiProducts";

export default function Filter({ id, onFilterSelected }) {
  const [DataFilter, setDataFilter] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await FilterProducts(id);
        setDataFilter(res.result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    onFilterSelected(selectedFilters);
  }, [selectedFilters, onFilterSelected]);

  // const handleCheckboxChange = (filterName, value) => {
  //   setSelectedFilters((prevState) => {
  //     const newFilters = prevState.filter(
  //       (filter) => !filter.hasOwnProperty(filterName)
  //     );
  //     newFilters.push({ [filterName]: value });
  //     console.log(newFilters);
  //     return newFilters;
  //   });
  // };
  const handleCheckboxChange = (filterName, value) => {
    setSelectedFilters((prevState) => {
      const newFilters = [...prevState];
      const index = newFilters.findIndex((filter) => Object.keys(filter)[0] === filterName);
      if (index !== -1 && newFilters[index][filterName] === value) {
        newFilters.splice(index, 1);
      } else {
        newFilters.push({ [filterName]: value });
      }
      console.log(newFilters);
      return newFilters;
    });
  };
  return (
    <div className="w-full p-4 bg-white dark:bg-zinc-800 border-r max-h-[300px] lg:max-h-[450px] 2xl:max-h-[600px] border-gray-300 px-1.5 overflow-y-scroll">
      <h2 className="font-bold mb-4">Filter products by</h2>
      <div className="mb-4">
        {DataFilter.map((filter, index) => (
          <div key={index} className="mb-4">
            <h3 className="font-semibold">{filter.filterName}</h3>
            <div className="flex flex-col mb-2">
              {filter.filterValue.map((value, idx) => (
                <label key={idx}>
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={selectedFilters.some(
                      (f) => f[filter.filterName] === value
                    )}
                    onChange={() =>
                      handleCheckboxChange(filter.filterName, value)
                    }
                  />{" "}
                  {value}
                </label>
              ))}
            </div>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
}
