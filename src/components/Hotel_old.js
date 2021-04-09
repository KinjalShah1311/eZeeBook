import React from "react";
import HotelCard from './HotelCard_old';


export default function Hotel(room) {

  return (
    <div className="Hotels">
      <HotelCard room={room} />
    </div>
  );
}
