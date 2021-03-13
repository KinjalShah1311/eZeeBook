import axios from 'axios'




class DataService{


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
    retriveHotelNames(lat,lon){
      const options = {
        method: 'GET',
        url: 'https://hotels-com-free.p.rapidapi.com/srle/listing/v1/brands/hotels.com',
        params: {
          lat: lat,
          lon: lon,
          checkIn: '2021-01-27',
          checkOut: '2021-01-28',
          rooms: '1',
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