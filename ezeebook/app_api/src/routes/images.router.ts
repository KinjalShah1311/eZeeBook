import express, {Response, Request} from 'express';
import ImagesDataService from '../controllers/images.service';
import {BaseImage} from '../models/images.interface';
import {storage,bucketName} from "../../../src/firebase";
const UUID = require("uuid-v4");

export const imageRouter = express.Router();

imageRouter.get("/:roomID/images",async (req: Request, res: Response) => {
  try {
    const image = await ImagesDataService.getAllImages();
    if(!image) {
        res.status(404).send("Images not found");
    }
    else {
      res.status(200).send(image.on("value", 
        function(snapshot) {
          console.log(snapshot.val());
        }, function (e) {
          console.log("The read failed: " + e);
        })
      );
    }
  }catch(e) {
    res.status(500).send(e.message);
  }
});


imageRouter.get("/:roomID/images/:id",async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const image = await ImagesDataService.getImage(id);
    if(!image) {
        res.status(404).send("Image not found");
    }
    else {
        res.status(200).send(image.on("value", 
        function(snapshot) {
          console.log(snapshot.val());
        }, function (e) {
          console.log("The read failed: " + e);
        })
      );
    }
  }catch(e) {
    console.log('Error happened: ', e.message);
    //res.status(500).send(e.message);
  }
});


imageRouter.post("/:roomID/images/", async (req: Request, res: Response) => {

  try {
    const baseImage:BaseImage = req.body;
    const roomID = req.params.roomID;
    
    const uploadFile = async(filename) => {

      let uuid = UUID();
      return storage.bucket(bucketName).upload(filename, {
        gzip: true,
        metadata: {
          contentType: 'image/jpeg',
          metadata: {
            firebaseStorageDownloadTokens: uuid
          }
        },
      }).then((data) => {
        let file = data[0];
        let imageName = file.metadata.name;
        file.getSignedUrl({
          action: 'write',
          expires: '03-17-2025'
        }, async function(err, url) {
          if (err) {
            console.error(err);
            return;
          }
          const downloadURL = url + "&token=" + uuid;
          console.log(downloadURL);
          const image = {downloadURL,imageName, roomID}
          const newImage = await ImagesDataService.createImage(image);
          
          
          res.status(201).json(newImage.on("value", 
            function(snapshot) {
              console.log(snapshot.val());
            }, function (e) {
              console.log("The read failed: " + e);
            })
          );  
        });
      });
    }

    uploadFile(baseImage.imagePath);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// imageRouter.put("/:roomID/images/:id", async (req: Request, res: Response) => {
//   const id = req.params.id;

//   try {
//     const ImageUpdate: BaseImage = req.body;

//     const existingImage = await ImagesDataService.getImage(id);

//     if (!existingImage) {
//         const newImage = await ImagesDataService.createImage(ImageUpdate);
//         res.status(201).json(newImage);
//     }
//     else {
//         const updatedImage = await ImagesDataService.updateImage(id, ImageUpdate);
//         return res.status(200).json(updatedImage);
//     }
//   } catch (e) {
//     res.status(500).send(e.message);
//   }
// });


imageRouter.delete("/:roomID/images/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await ImagesDataService.deleteImage(id);

    res.sendStatus(204);
  } catch (e) {
    res.status(500).send(e.message);
  }
});