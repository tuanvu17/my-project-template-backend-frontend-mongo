const { GridFsStorage } = require("multer-gridfs-storage");
const config = require('../config/config');

const mongoose = require('mongoose');
const multer = require("multer"); //được sử dụng để upload file lên server
const asyncHandler = require('express-async-handler');

const MongoClient = require("mongodb").MongoClient;
const GridFSBucket = require("mongodb").GridFSBucket;
// const url = process.env.MONGODB_URL;
const url = config.MONGODB_URL;
const db_name = process.env.DB_DATABASE;
const mongoClient = new MongoClient(url);

const storage = new GridFsStorage({
  url,
  file: (req, file) => {
    //If it is an image, save to photos bucket
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      const filename = `${Date.now()}_${file.originalname}`;
      console.log("🚀 ~ Save Image Storage: Succes: ", filename);
      return {
        bucketName: "photos",
        filename: filename,
      };
    } else {
      //Otherwise save to default bucket
      console.log("🚀 ~ Error Upload Image: ", file.originalname);
      return {
        filename: null
      };
    }
  },
});

// Set multer storage engine to the newly created object
const upload = multer({ storage });

// 

const getaImageMidle = asyncHandler(async (req, res, next) => {
  try {
    const mongoClient = new MongoClient(url);
    await mongoClient.connect();
    const database = mongoClient.db(db_name);
    const imageBucket = new GridFSBucket(database, { bucketName: "photos" });

    let filename = req.query.image_name_key;

    let imageData = Buffer.alloc(0); // Initialize an empty buffer

    let downloadStream = imageBucket.openDownloadStreamByName(filename);

    downloadStream.on("data", function (data) {
      imageData = Buffer.concat([imageData, data]); // Accumulate data chunks
    });

    downloadStream.on("error", function () {
      mongoClient.close();
      next();
    });

    downloadStream.on("end", () => {
      const base64Image = imageData.toString('base64'); // Convert to Base64 string
      req.result = base64Image;
      mongoClient.close();
      next();
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error Something went wrong",
      error,
    });
  }
});

const getallImageMidle = asyncHandler(async (req, res, next) => {
  try {

    const mongoClient = new MongoClient(url);
    await mongoClient.connect();
    const database = mongoClient.db(db_name);
    const imageBucket = new GridFSBucket(database, { bucketName: "photos" });

    const page = parseInt(req.body.page) || 1; // Default page to 1
    const limit = parseInt(req.body.limit) || 10; // Default limit to 10 records per page

    const skip = (page - 1) * limit; // Calculate skip offset based on page and limit

    const cursor = imageBucket.find({})
      .skip(skip) // Apply skip offset for pagination
      .limit(limit); // Set limit for records per page

    const records = [];

    while (await cursor.hasNext()) {
      const record = await cursor.next();
      records.push(record);
    }

    if (records.length === 0) {
      res.status(204).send("No images found"); // Send empty response for no images
    } else {
      req.result = records; // Store all image data in req.result
      mongoClient.close();
      next();
    }
  } catch (error) {
    console.error("Error getting all images:", error);
    res.status(500).send({
      message: "Error Something went wrong",
      error,
    });
  }
});

const deleteImageMidle = asyncHandler(async (req, res, next) => {
  try {
    const mongoClient = new MongoClient(url);
    const database = mongoClient.db(db_name);
    const bucket = new GridFSBucket(database, { bucketName: "photos" });
    const bucketFile = await bucket
      .find({
        filename: `${req.query.image_name_key}`
      })
      .toArray();
    //THIS DELETE DOCUMENTS FROM document.chunks COLLECTION AND DOCUMENT document.files COLLECTION
    const bucketFileId = bucketFile[0]?._id;
    await bucket.delete(bucketFileId).then(() => {
      // success
      req.result = bucketFile;
      mongoClient.close();
    }).catch(() => {
      req.result = false;
      mongoClient.close();
    })
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error Something went wrong",
      error,
    });
  }
})


const deleteImageHelper = asyncHandler(async (image_name_key) => {
  try {
    console.log("🚀 ~ deleteImageHelper ~ image_name_key:", image_name_key)
    const mongoClient = new MongoClient(url);
    const database = mongoClient.db(db_name);
    const bucket = new GridFSBucket(database, { bucketName: "photos" });
    const bucketFile = await bucket
      .find({
        filename: `${image_name_key}`
      })
      .toArray();
    //THIS DELETE DOCUMENTS FROM document.chunks COLLECTION AND DOCUMENT document.files COLLECTION
    const bucketFileId = bucketFile[0]?._id;
    await bucket.delete(bucketFileId).then(() => {
      mongoClient.close();
      return true
    }).catch(() => {
      mongoClient.close();
      return false
    })
    return true
  } catch (error) {
    return false
  }
})

const uploadImageMidle = asyncHandler(async (req, res, next) => {

  try {
    // check errors of fileds
    const errors = validationResult(req);
      if (!errors.isEmpty()) {
            return res.status(400).json({
                  success: false,
                  msg: 'Errors',
                  errors: errors.array()
            });
      }

    const file = req.file;
    // const newImage = { ...req.body }
    if(file) {
      return res.status(200).json({
        success: true,
        msg: 'You have successfully upload Image.',
         
        data: file.filename
      });
    }else{
      return res.status(400).json({
        success: false,
        msg:"Upload Image failed! Check again!",
        data: ''
      });
    }

  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: error.message,
    });
  }
})

module.exports = { upload, uploadImageMidle, getaImageMidle,getallImageMidle, deleteImageMidle, deleteImageHelper };

// Todo: 7.18


