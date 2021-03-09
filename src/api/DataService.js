import axios from 'axios'




class DataService{


    retrieveAllData(name){

        const options = {
            method: 'GET',
            url: 'https://hotels4.p.rapidapi.com/properties/get-details',
            params: {
              id: '424010',
              locale: 'en_US',
              currency: 'USD',
              checkOut: '2020-01-15',
              adults1: '1',
              checkIn: '2020-01-08'
            },
            headers: {
              'x-rapidapi-key': 'aa3dfad0d3msh91e468cf37f9259p167861jsn51220deec226',
              'x-rapidapi-host': 'hotels4.p.rapidapi.com'
            }
          };
          
        return  axios.request(options);


    }

   

}

export default new DataService