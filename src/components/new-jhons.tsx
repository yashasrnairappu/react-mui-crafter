import React from "react";
import visitorsImage from "@/assets/store.png";
const NewJhons = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-muted/30 animate-fade-in">
      <img
        src= {visitorsImage}
        alt="New Jhons"
        className="w-full md:w-1/2 max-w-lg rounded-lg shadow-lg mb-8 md:mb-0 md:mr-12 animate-slide-left"
      />
      <div className="w-full md:w-1/2 max-w-lg">
        <h1 className="text-4xl font-bold mb-4 animate-slide-right">New Jhons</h1>
        <div className="border-l-4 border-primary pl-4 mb-6 animate-slide-right">
          <div className="grid gap-4">
            <div className="flex justify-between bg-background p-4 rounded">
              <span className="font-semibold text-muted-foreground">Seats</span>
              <span>60</span>
            </div>
            <div className="flex justify-between bg-background p-4 rounded">
              <span className="font-semibold text-muted-foreground">Bills</span>
              <span>200+</span>
            </div>
            <div className="flex justify-between bg-background p-4 rounded">
              <span className="font-semibold text-muted-foreground">Time</span>
              <span>8 AM to 10 PM</span>
            </div>
            <div className="flex justify-between bg-background p-4 rounded">
              <span className="font-semibold text-muted-foreground">Footfall/Day</span>
              <span>350+</span>
            </div>
            <div className="flex justify-between bg-background p-4 rounded">
              <span className="font-semibold text-muted-foreground">Size</span>
              <span>43"</span>
            </div>
            <div className="flex justify-between bg-background p-4 rounded">
              <span className="font-semibold text-muted-foreground">Nearest Places</span>
              <span>Hospitals,Schools</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewJhons;