import express from "express"
import { verifyToken } from "./../verifyToken.js";
import { createTweet, deleteTweet, editTweet, getAll, getExploreTweets, getTimeline, likeUnlike } from "../controllers/tweet.js";
 

const router = express.Router();



router.post("/",verifyToken,createTweet)

router.delete("/:id",verifyToken,deleteTweet)
router.put("/:id/like",verifyToken,likeUnlike)
router.put("/:id",verifyToken,editTweet)
router.get("/timeline/:id",getTimeline)
router.get("/user/all/:id",getAll)
router.get("/explore",getExploreTweets)












export default router;