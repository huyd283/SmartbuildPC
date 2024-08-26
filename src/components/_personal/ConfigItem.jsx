"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { ProductItem, ProductSelectedItem } from ".";
import { useSelector } from "react-redux";
import Filter from "./Filter";
import toast from "react-hot-toast";
import {
  setSelectedProduct,
  removeSelectedProduct,
  decreTotalPrice,
  updateSelectedCategoryIds,
} from "@/app/_utils/store/product.slice";
import { useDispatch } from "react-redux";

export default function ConfigItem({
  item,
  onPriceChange,
  onRefresh,
  onSelected,
  onQuantityChange,
}) {
  const options = [
    { value: "newest", label: "Latest" },
    { value: "expensive", label: "Price high to low" },
    { value: "cheap", label: "Price low to high" },
  ];
  const dispatch = useDispatch();
  const selectedProduct = useSelector(
    (state) => state.product.selectedProductIds
  );
  const selectedCategoryIds = useSelector(
    (state) => state.product.selectedCategoryIds
  );
  const [selectedSearch, setSelectedSearch] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantityItem, setQuantityItem] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleQuantityChange = (item, quantityItem) => {
    setQuantityItem(quantityItem);
    onQuantityChange(item, quantityItem);
    onPriceChange();
  };

  const handleProductSelected = (selectedItem) => {
    setSelectedItem(selectedItem);
    const action = "add";
    onSelected(selectedItem, action);
    onPriceChange(selectedItem?.price, action, quantityItem);
    dispatch(setSelectedProduct(selectedItem.productId));
    dispatch(
      updateSelectedCategoryIds([...selectedCategoryIds, item.categoryId])
    );
    setIsDialogOpen(false);
  };

  const handleFilterSelected = (selectedItem) => {
    setSelectedFilter(selectedItem);
  };

  const handleRemove = () => {
    const action = "remove";
    onSelected(selectedItem, action);
    onPriceChange(selectedItem?.price, action, quantityItem);
    setSelectedItem(null);
    dispatch(removeSelectedProduct(selectedItem.productId));
    dispatch(decreTotalPrice(selectedItem?.price));
    dispatch(
      updateSelectedCategoryIds(
        selectedCategoryIds.filter((i) => i !== item.categoryId)
      )
    );
    toast.success("Deleted successfully");
  };

  const handleValueChange = (value) => {
    setSelectedSearch(value);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handleClickSelect = (notice = true) => {
    if (item.categoryId === 7) {
      if (
        selectedCategoryIds.includes(1) &&
        selectedCategoryIds.includes(2) &&
        selectedCategoryIds.includes(3) &&
        (selectedCategoryIds.includes(4) || selectedCategoryIds.includes(5))
      ) {
        console.log("ủa alooooo");
        setIsDialogOpen(true);
      } else {
        if(notice)
          toast.error(
            "Please select CPU, MAINBOARD, RAM, SSD or HDD berfore select PSU!"
          );
        setIsDialogOpen(false);
      }
    } else {
      setIsDialogOpen(true);
    }
  };

  const onRefreshRef = useRef();

  useEffect(() => {
    onRefreshRef.current = () => {
      setSelectedItem(null);
      setSelectedFilter(null);
    };
  }, []);

  useEffect(() => {
    if (onRefresh) {
      onRefreshRef.current();
    }
  }, [onRefresh]);
  useEffect(() => {
    if (selectedItem && quantityItem !== null) {
      onPriceChange(selectedItem.price, "update", quantityItem);
    }
  }, [selectedItem, quantityItem]);

  return (
    <Collapsible open={true}>
      <div className="w-full flex flex-col md:flex-row items-center justify-between float-left border p-4 rounded-sm">
        <CollapsibleTrigger asChild>
          <div className="w-full md:w-1/5 text-center md:text-left py-2 px-3 font-bold text-[#222] text-sm uppercase cursor-pointer">
            {item?.categoryName}
          </div>
        </CollapsibleTrigger>
        <div className="w-full md:w-4/5 flex items-center justify-center md:justify-end py-4">
          <Dialog
            open={isDialogOpen}
            onOpenChange={(open) => {
              if (open) {
                handleClickSelect(false);
              } else {
                setIsDialogOpen(false);
              }
            }}
          >
            <DialogTrigger asChild>
              <Button
                className="bg-red-600 hover:bg-red-500 w-full md:w-auto"
                onClick={handleClickSelect}
              >
                Select
              </Button>
            </DialogTrigger>
            <DialogContent className="w-full sm:w-3/5 max-w-[1200px] h-auto min-h-[350px] lg:min-h-[450px] 2xl:min-h-[600px] flex flex-col">
              <DialogHeader>
                <DialogTitle>Search products</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col items-center space-x-2">
                <div className="w-full bg-[#026db5] p-2 flex flex-col lg:flex-row items-center lg:justify-start gap-2">
                  <div className="relative items-center min-w-[280px]">
                    <Input
                      placeholder="Enter name product you are looking..."
                      value={inputValue}
                      onChange={handleInputChange}
                    />
                    <Search
                      color="#026db5"
                      className="absolute bottom-2 right-2 cursor-pointer"
                    />
                  </div>
                  <Select onValueChange={handleValueChange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select search" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Sort</SelectLabel>
                        {options.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-full flex flex-col lg:flex-row gap-3 max-h-[450px] lg:max-h-[500px] 2xl:max-h-[550px] overflow-y-scroll">
                  <div className="w-full lg:w-1/4">
                    <Filter
                      id={item?.categoryId}
                      onFilterSelected={handleFilterSelected}
                    />
                  </div>
                  <div className="w-full lg:w-3/4">
                    <ProductItem
                      id={item?.categoryId}
                      onProductSelected={handleProductSelected}
                      selectedSearch={selectedSearch}
                      inputValue={inputValue}
                      selectedFilter={selectedFilter}
                      onProductSelectedId={selectedProduct}
                    />
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <CollapsibleContent asChild>
        <div>
          {selectedItem ? (
            <ProductSelectedItem
              item={selectedItem}
              onRemove={handleRemove}
              onQuantityChange={handleQuantityChange}
            />
          ) : (
            <div>No product is selected</div>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
