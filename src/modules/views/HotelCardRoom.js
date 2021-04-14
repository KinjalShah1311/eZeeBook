import React from "react";
import HotelCard from './HotelCard';


export default function HotelCardRoom(room) {
//console.log("room "+{room} +"& start date "+{{room.startDate}} );
  return (
    <div className="Hotels">
      <HotelCard room={room} startDate={room.startDate}  endDate={room.endDate}/>
    </div>
  );
}
