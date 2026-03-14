import React, { useState, useEffect } from "react";
import arv1 from "@/assets/arv1.jpg";
import arv2 from "@/assets/arv2.jpg";
import arv3 from "@/assets/arv3.jpg";
import arv4 from "@/assets/arv4.jpg";
const AramanaRestuarant = () => {
  const images = [arv1, arv2, arv3, arv4]; // Add new images here in the desired order
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  const next = () => setCurrentIndex((prev) => (prev + 1) % images.length);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-muted/30 animate-fade-in">
      <div className="relative w-full md:w-1/2 max-w-lg mb-8 md:mb-0 md:mr-12">
        <img
          src={images[currentIndex]}
          alt="Aramana Restuarant"
          className="w-full rounded-lg shadow-lg animate-slide-left"
        />
        <button
          onClick={prev}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition"
        >
          ‹
        </button>
        <button
          onClick={next}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition"
        >
          ›
        </button>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition ${
                index === currentIndex ? 'bg-white' : 'bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
      <div className="w-full md:w-1/2 max-w-lg">
        <h1 className="text-4xl font-bold mb-4 animate-slide-right">Aramana Restuarant</h1>
        <div className="border-l-4 border-primary pl-4 mb-6 animate-slide-right">
          <div className="grid gap-4">
            <div className="flex justify-between bg-background p-4 rounded">
              <span className="font-semibold text-muted-foreground">Seats</span>
              <span>80</span>
            </div>
            <div className="flex justify-between bg-background p-4 rounded">
              <span className="font-semibold text-muted-foreground">Bills</span>
              <span>250+</span>
            </div>
            <div className="flex justify-between bg-background p-4 rounded">
              <span className="font-semibold text-muted-foreground">Time</span>
              <span>11 AM to 10:30 PM</span>
            </div>
            <div className="flex justify-between bg-background p-4 rounded">
              <span className="font-semibold text-muted-foreground">Footfall/Day</span>
              <span>450+</span>
            </div>
            <div className="flex justify-between bg-background p-4 rounded">
              <span className="font-semibold text-muted-foreground">Size</span>
              <span>43"</span>
            </div>
            <div className="flex justify-between bg-background p-4 rounded">
              <span className="font-semibold text-muted-foreground">Nearest Places</span>
              <span>Banks and Offices</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AramanaRestuarant;