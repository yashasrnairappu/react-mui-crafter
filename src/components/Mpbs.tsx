import React from "react";
import ComingSoon from "@/assets/cs.jpg";
const Mpbs = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-muted/30 animate-fade-in">
      <img
        src= {ComingSoon}
        alt="New Jhons"
        className="w-full md:w-1/2 max-w-lg rounded-lg shadow-lg mb-8 md:mb-0 md:mr-12 animate-slide-left"
      />
      <div className="w-full md:w-1/2 max-w-lg">
        <h1 className="text-4xl font-bold mb-4 animate-slide-right">Mallappally Private Bus Stand</h1>
        <div className="border-l-4 border-primary pl-4 mb-6 animate-slide-right">
          <div className="grid gap-4">
            {/* <div className="flex justify-between bg-background p-4 rounded">
              <span className="font-semibold text-muted-foreground">Seats</span>
              <span>72</span>
            </div> */}
            {/* <div className="flex justify-between bg-background p-4 rounded">
              <span className="font-semibold text-muted-foreground">Bills</span>
              <span>300+</span>
            </div> */}
            <div className="flex justify-between bg-background p-4 rounded">
              <span className="font-semibold text-muted-foreground">Time</span>
              <span>7 AM to 7:30 PM</span>
            </div>
            <div className="flex justify-between bg-background p-4 rounded">
              <span className="font-semibold text-muted-foreground">Footfall/Day</span>
              <span>1000+</span>
            </div>
            <div className="flex justify-between bg-background p-4 rounded">
              <span className="font-semibold text-muted-foreground">Size</span>
              <span>43"</span>
            </div>
            <div className="flex justify-between bg-background p-4 rounded">
              <span className="font-semibold text-muted-foreground">Target Audience</span>
              <span>Stuents,Working Proffessionals,Govt Employees</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mpbs;