import axios from 'axios'




class DataService{



   formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

  retrieveLocation(name){
          console.log(name);
        const options = {
            method: 'GET',
            url: 'https://hotels4.p.rapidapi.com/locations/search',
            params: {
              query: name, locale: 'en_US'
            },
            headers: {
              'x-rapidapi-key': 'aa3dfad0d3msh91e468cf37f9259p167861jsn51220deec226',
              'x-rapidapi-host': 'hotels4.p.rapidapi.com'
            }
          };
          
        return  axios.request(options);


    }
    retriveHotelNames(lat,lon,startDate,endDate,rooms){
      console.log("start "+this.formatDate(startDate));
      console.log("rooms "+rooms);
      const options = {
        method: 'GET',
        url: 'https://hotels-com-free.p.rapidapi.com/srle/listing/v1/brands/hotels.com',
        params: {
          lat: lat,
          lon: lon,
          checkIn: this.formatDate(startDate),
          checkOut: this.formatDate(endDate),
          rooms: rooms,
          locale: 'en_US',
          currency: 'USD',
          pageNumber: '1'
        },
        headers: {
          'x-rapidapi-key': 'aa3dfad0d3msh91e468cf37f9259p167861jsn51220deec226',
          'x-rapidapi-host': 'hotels-com-free.p.rapidapi.com'
        }
      };
      return  axios.request(options);
    }

   

}

export default new DataService