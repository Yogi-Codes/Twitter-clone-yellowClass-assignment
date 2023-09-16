import express from "express";
import { deleteUser, follow, getUser,unFollow,update } from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";


const router = express.Router();



router.put("/:id",verifyToken,update)
router.delete("/:id",verifyToken,deleteUser)
router.put("/follow/:id",verifyToken,follow)
router.put("/unfollow/:id",verifyToken,unFollow)
router.get('/find/:id',getUser)




export default router;