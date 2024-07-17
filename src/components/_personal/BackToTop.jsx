"use client";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ArrowBigUp } from "lucide-react";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  // Hiển thị nút khi cuộn xuống dưới 300px
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };
  // Cuộn về đỉnh trang
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);
  return (
    <div
      className={`${
        !isVisible ? "hidden" : "fixed"
      } bottom-10 right-5 md:bottom-[100px] md:right-20`}
      onClick={scrollToTop}>
      <Button className="bg-[#026db5] px-2 md:px-4">
        <ArrowBigUp size={32} color="#Ffffff" />
      </Button>
    </div>
  );
}
