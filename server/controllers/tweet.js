import Tweet from "../models/Tweet.js"
import handleError from "../error.js";
import User from "../models/User.js";
import multer from 'multer';


import { v2 as cloudinary } from 'cloudinary';

import fs from "fs";
import path from "path"


  
export const createTweet = async (req, res, next) => {
    const file = req.files;
    cloudinary.config({
        cloud_name: process.env.cloud,
        api_key: process.env.apik,
        api_secret: process.env.apis,
        secure: true,
      });
      var  secureUrl ="http://google.com";
     if(req.files){
        const fileData = req.files.file.data;
        const destinationFolder = path.join("/", '/tmp');
        console.log(req.files.file.data); // Make sure this is the correct data
        
        if (!fs.existsSync(destinationFolder)) {
          // Create the destination folder if it doesn't exist
          fs.mkdirSync(destinationFolder, { recursive: true });
        }
        
        console.log(req.files.file.name);
        const uniqueFileName = req.files.file.name;
        const filePath = path.join(destinationFolder, uniqueFileName);
        
        // Use mv function to move the file to the destination
        req.files.file.mv(filePath, (err) => {
          if (err) {
            console.error('Error writing file:', err);
            return res.status(500).send('Error writing file');
          }
          console.log('File saved:', filePath);
          // Send a success response if the file was successfully saved
          return res.status(200).send('File saved successfully');
        });
        
      
    //   const localFilePath = `../server/uploads/${uniqueFileName}}`;

    
  if(req.files.file.mimetype.includes("image/")){
      await cloudinary.uploader.upload(filePath,{resource_type:"image"}).then((res)=>{
          console.log(res.secure_url);
          secureUrl= res.secure_url
        
        }).catch((err)=>{
          console.log("img",err);
        })
  
  }
  else{
      await cloudinary.uploader.upload(filePath,{resource_type:"video"}).then((res)=>{
          console.log(res.secure_url);
          secureUrl= res.secure_url
        
        }).catch((err)=>{
          console.log("video",err);
        })
  }
     }



var {userId,description} = req.body;
// 
description= description?description.slice(0,280):""

    const newTweet = new Tweet({
        userId:userId,
        description:description,
        media:[secureUrl]
    })

    try {
        const savedTweet = await newTweet.save();
        res.status(200).json(savedTweet)
    } catch (error) {
        handleError(500, error)

    }
}


export const deleteTweet = async (req, res, next) => {
    try {
        const tweet = await Tweet.findById(req.params.id);

        if (!tweet) {
            res.status(404).json("tweet not found");
        }

        if (tweet.userId === req.body.id) {
            await tweet.deleteOne();
            res.status(200).json("Tweet has been deleted");

        }
        else {
            res.status(500).json("Login first")
        }
    } catch (error) {
        handleError(500, error)

    }
}


export const likeUnlike = async (req, res, next) => {
    try {
        const tweet = await Tweet.findById(req.params.id);
        if (!tweet) {
            res.status(200).json("Tweet not found");

        }

        if (!tweet.likes.includes(req.body.id)) {
            await tweet.updateOne({
                $push: { likes: req.body.id }
            })
            res.status(200).json("tweet has been liked ")
        }
        else {
            await tweet.updateOne({
                $pull: { likes: req.body.id }
            })
            res.status(200).json("tweet has been disliked ")
        }
    } catch (error) {
        handleError(500, error)
    }
}


export const getTimeline = async (req, res, next) => {
    try {
        const currentUser = await User.findById(req.params.id);


        const userTweets = await Tweet.find({ userId: currentUser._id });

        const followersTweet = await Promise.all(currentUser.following.map((followerId) => {

            return Tweet.find({ userId: followerId })
        }))


        res.status(200).json(userTweets.concat(...followersTweet).sort((a, b) => (a.createdAt < b.createdAt)?1:-1))

    } catch (error) {
        handleError(500, error)
    }
}
export const getAll = async (req, res, next) => {
    try {
        const userTweets = await Tweet.find({ userId: req.params.id }).sort({
            createdAt: -1,
        });
        res.status(200).json(userTweets)






    } catch (error) {
        handleError(500, error)
    }
}
export const getExploreTweets = async (req, res, next) => {
    try {
        const exploreTweets = await Tweet.find({ likes: { $exists: true } }).sort({
            likes: -1
        })
        res.status(200).json(exploreTweets)






    } catch (error) {
        handleError(500, error)
    }
}
export const editTweet = async (req, res, next) => {
    const file = req.files;
    cloudinary.config({
        cloud_name: process.env.cloud,
        api_key: process.env.apik,
        api_secret: process.env.apis,
        secure: true,
      });
    var secureUrl = "http://google.com";
    if (req.files) {
        const fileData = req.files.file.data;
        const destinationFolder = path.join("/", '/tmp');
        console.log(req.files.file.data); // Make sure this is the correct data

        if (!fs.existsSync(destinationFolder)) {
            // Create the destination folder if it doesn't exist
            fs.mkdirSync(destinationFolder, { recursive: true });
        }

        console.log(req.files.file.name);
        const uniqueFileName = req.files.file.name;
        const filePath = path.join(destinationFolder, uniqueFileName);

        // Use mv function to move the file to the destination
        req.files.file.mv(filePath, (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return res.status(500).send('Error writing file');
            }
            console.log('File saved:', filePath);
            // Send a success response if the file was successfully saved
            return res.status(200).send('File saved successfully');
        });


        // const localFilePath = `../server/uploads/${uniqueFileName}}`;


        if (req.files.file.mimetype.includes("image/")) {
            await cloudinary.uploader.upload(filePath, { resource_type: "image" }).then((res) => {
                console.log(res.secure_url);
                secureUrl = res.secure_url

            }).catch((err) => {
                console.log("img", err);
            })

        }
        else {
            await cloudinary.uploader.upload(filePath, { resource_type: "video" }).then((res) => {
                console.log(res.secure_url);
                secureUrl = res.secure_url

            }).catch((err) => {
                console.log("video", err);
            })
        }
    }



    const { userId, description } = req.body;
    // 

console.log("here");
    const tweet = await Tweet.findById(req.params.id);

  if (!tweet) {
    return res.status(404).json({ message: 'Tweet not found' });
  }



    

    try {
   
  tweet.description = description;

  if(tweet.media!=secureUrl && secureUrl!="http://google.com"){
 tweet.media = [secureUrl]
  }
    
 const updatedTweet = await tweet.save();
    res.status(200).json(updatedTweet);
  
      
    } catch (error) {
        handleError(500, error)

    }
}