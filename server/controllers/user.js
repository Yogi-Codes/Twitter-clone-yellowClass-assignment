import handleError from "../error.js";
import User from "../models/User.js";
import Tweet from "../models/Tweet.js";



export const getUser = async (req, res, next) => {

    try {
        const user = await User.findById(req.params.id)
        res.status(200).json(user);

    } catch (error) {
console.log(error);
    }
};

export const update = async (req, res, next) => {

    if (req.params.id === req.user.id) {
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, { new: true })
            res.status(200).json(updatedUser)

        } catch (error) {
            next(err)

        }

    }
    else {
        return next(handleError(403, "Update is available ony for own account  "))
    }

};
export const deleteUser = async (req, res, next) => {


    if (req.params.id === req.user.id) {
        try {
            const deletedUser = await User.findByIdAndDelete(req.params.id, {
                $set: req.body
            }, { new: true })
            await Tweet.remove({userId:req.params.id});
            res.status(200).json(deletedUser)

        } catch (error) {
            next(error)

        }

    }
    else {
        return next(handleError(403, "Deletion is available ony for own account  "))
    }


};

export const follow = async (req, res, next) => {
    try {
      //user
      const user = await User.findById(req.params.id);
      //current user
      const currentUser = await User.findById(req.body.id);
  
      if (!user.followers.includes(req.body.id)) {
        await user.updateOne({
          $push: { followers: req.body.id },
        });
  
        await currentUser.updateOne({ $push: { following: req.params.id } });
      } else {
        res.status(403).json("you already follow this user");
      }
      res.status(200).json("following the user");
    } catch (err) {
      next(err);
    }
  };
  export const unFollow = async (req, res, next) => {
    try {
      //user
      const user = await User.findById(req.params.id);
      //current user
      const currentUser = await User.findById(req.body.id);
  
      if (currentUser.following.includes(req.params.id)) {
        await user.updateOne({
          $pull: { followers: req.body.id },
        });
  
        await currentUser.updateOne({ $pull: { following: req.params.id } });
      } else {
        res.status(403).json("you are not following this user");
      }
      res.status(200).json("unfollowing the user");
    } catch (err) {
      next(err);
    }
  };