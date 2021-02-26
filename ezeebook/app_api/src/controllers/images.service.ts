import { BaseImage} from '../models/images.interface'
import app from '../../../src/firebase'


const db = app.database().ref("/images");
class ImagesDataService {

    getAllImages() {
      return db;
    }

    getImage(key) {
        return db.child(key);
    }
  
    createImage(image) {
      return db.push(image);
    }
  
    updateImage(key,value:BaseImage) {
      return db.child(key).update(value);
    }
  
    deleteImage(key) {
      return db.child(key).remove();
    }
  
    deleteAllImages() {
      return db.remove();
    }
  }
  
  export default new ImagesDataService();
