import axios from "axios";

import * as dotenv from "dotenv";
dotenv.config();
const API_KEY_HOTEL = process.env.REACT_APP_HOTEL_API_KEY;
const API_KEY_LOCATION = process.env.REACT_APP_LOCATION_KEY;

class DataService {
  formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  retrieveLocation(name) {
    console.log(name);
    console.log("API_KEY_LOCATION", API_KEY_LOCATION);
    const options = {
      method: "GET",
      url: "https://hotels4.p.rapidapi.com/locations/search",
      params: {
        query: name,
        locale: "en_US",
      },
      headers: {
        "x-rapidapi-key": API_KEY_LOCATION,
        "x-rapidapi-host": "hotels4.p.rapidapi.com",
      },
    };

    return axios.request(options);
  }
  retriveHotelNames(lat, lon, startDate, endDate, rooms) {
    console.log("start " + this.formatDate(startDate));
    console.log("rooms " + rooms);
    const options = {
      method: "GET",
      url:
        "https://hotels-com-free.p.rapidapi.com/srle/listing/v1/brands/hotels.com",
      params: {
        lat: lat,
        lon: lon,
        checkIn: this.formatDate(startDate),
        checkOut: this.formatDate(endDate),
        rooms: rooms,
        locale: "en_US",
        currency: "USD",
        pageNumber: "1",
      },
      headers: {
        "x-rapidapi-key": API_KEY_HOTEL,
        "x-rapidapi-host": "hotels-com-free.p.rapidapi.com",
      },
    };
    return axios.request(options);
  }

  retrieveImages(hotelId) {
    const options = {
      method: "GET",
      url:
        "https://hotels-com-free.p.rapidapi.com/nice/image-catalog/v2/hotels/" +
        hotelId,
      headers: {
        "x-rapidapi-key": API_KEY_HOTEL,
        "x-rapidapi-host": "hotels-com-free.p.rapidapi.com",
      },
    };

    return axios.request(options);
  }

  retrieveReviews(hotelId) {
    const options = {
      method: "GET",
      url:
        "https://hotels-com-free.p.rapidapi.com/mobile_service/property-content/v1/hotels.com/property/" +
        hotelId +
        "/reviews",
      params: { loc: "en_US", page: "1" },
      headers: {
        "x-rapidapi-key": API_KEY_HOTEL,
        "x-rapidapi-host": "hotels-com-free.p.rapidapi.com",
      },
    };
    return axios.request(options);
  }
}

export default new DataService();
