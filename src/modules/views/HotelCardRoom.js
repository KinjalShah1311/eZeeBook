import React from "react";
import HotelCard from './HotelCard';


export default function HotelCardRoom(room) {

  return (
    <div className="Hotels">
      <HotelCard room={room} />
    </div>
  );
}
