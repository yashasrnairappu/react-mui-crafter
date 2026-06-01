import storeImg from "@/assets/store.png";
import arv1 from "@/assets/arv1.jpg";
import arv2 from "@/assets/arv2.jpg";
import arv3 from "@/assets/arv3.jpg";
import arv4 from "@/assets/arv4.jpg";
import ComingSoon from "@/assets/cs.jpg";

export interface VenueData {
  name: string;
  city: string;
  images: string[];
  stats: {
    seats?: string; 
    bills?: string;
    time?: string;
    footfall?: string;
    size?: string;
    nearestPlaces?: string;
  };
}

// ─── PATHANAMTHITTA ───────────────────────────────
export const newJhons: VenueData = {
  name: "New Jhons",
  city: "Pathanamthitta",
  images: [
     storeImg
  ],
  stats: {
    seats: "60",
    bills: "200+",
    time: "8 AM to 10 PM",
    footfall: "350+",
    size: '43"',
    nearestPlaces: "Hospitals, Schools",
  },
};

export const aramanaRestaurant: VenueData = {
  name: "Aramana Restaurant",
  city: "Pathanamthitta",
  images: [
    arv1,arv2,arv3,arv4
  ],
  stats: {
    seats: "80",
    bills: "250+",
    time: "11 AM to 10:30 PM",
    footfall: "450+",
    size: '43"',
    nearestPlaces: "Banks and Offices",
  },
};

export const mallappally: VenueData = {
  name: "Mallappally Private Bus Stand",
  city: "Pathanamthitta",
  images: [
    ComingSoon
  ],
  stats: {
    seats: "100",
    time: "7 AM to 7:30 PM",
    footfall: "1000+",
    size: '43',
    nearestPlaces: "Stuents,Working Proffessionals,Govt Employees",
  },
};

// ─── KOTTAYAM ─────────────────────────────────────
export const saravanaThengana: VenueData = {
  name: "Saravana Hotel (Thengana)",
  city: "Kottayam",
  images: [
  ComingSoon
  ],
  stats: {
    seats: "48",
    bills: "300+",
    time: "6:30 AM to 10:30 PM",
    footfall: "400+",
    size: '43"',
    nearestPlaces: "Banks and Offices",
  },
};

export const saravanaChanganassery: VenueData = {
  name: "Saravana Hotel (Changanassery)",
  city: "Kottayam",
  images: [
    ComingSoon
  ],
  stats: {
    seats: "50",
    bills: "350+",
    time: "6:30 AM to 10:30 PM",
    footfall: "500+",
    size: '43"',
    nearestPlaces: "Banks and Offices",
  },
};

export const yemeniMandhi: VenueData = {
  name: "Yemeni Mandhi",
  city: "Kottayam",
  images: [
   ComingSoon
  ],
  stats: {
    seats: "72",
    bills: "300+",
    time: "12 PM to 11 PM",
    footfall: "400+",
    size: '43"',
    nearestPlaces: "Schools,College,Office",
  },
};

export const josettayi: VenueData = {
  name: "Josettayi Naandan Thattu Kada",
  city: "Kottayam",
  images: [
    ComingSoon
  ],
  stats: {
    seats: "30",
    bills: "350+",
    time: "8:30 AM to 11:00 PM",
    footfall: "400+",
    size: '43"',
    nearestPlaces: "Colleges,Offices",
  },
};

export const bbqEatAndDrink: VenueData = {
  name: "BBQ (Eat And Drink)",
  city: "Kottayam",
  images: [
 ComingSoon
  ],
  stats: {
    seats: "45",
    bills: "300+",
    time: "11:00 AM to 11:00 PM",
    footfall: "300+",
    size: '43"',
    nearestPlaces: "Schools,Offices",
  },
};