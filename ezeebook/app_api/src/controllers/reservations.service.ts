import { BaseReservation} from '../models/reservations.interface'
import app from '../../../src/firebase'

const db = app.database().ref("/reservations");
class ReservationsDataService {
    getAllReservations() {
      return db;
    }

    getReservation(key) {
        return db.child(key);
    }
  
    createReservation(reservation) {
      return db.push(reservation);
    }
  
    updateReservation(key,value:BaseReservation) {
      return db.child(key).update(value);
    }
  
    deleteReservation(key) {
      return db.child(key).remove();
    }
  
    deleteAllReservations() {
      return db.remove();
    }
  }
  
  export default new ReservationsDataService();
