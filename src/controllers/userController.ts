import { User, Thoughts } from '../models/index.js';
import { Request, Response } from 'express';


  // Get all users
  export const getUsers = async (_req: Request, res: Response) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // Get a single user
  export const getUserById = async (req: Request, res: Response) => {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
      return;
    } catch (err) {
      res.status(500).json(err);
      return;
    }
  }

  // create a new user
  export const createUser = async (req: Request, res: Response) => {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }

export const updatedUser = async (req:Request, res:Response ) =>{

    try{

        const user = await User.findOneAndDelete({ _id: req.params.userId });

        if (!user) {
            return res.status(404).json({ message: 'No user with that ID' });
          }

          await User.findOneAndUpdate(
            { _id: req.params.userId },
            {
              $set: {
                userName: req.body.userName,
                email: req.body.email,
                thoughts: req.body.thoughts,
                friends: req.body.friends
              }
            },
            { new: true }
          );
          res.json({ message: `User ${req.params.userId} has been update to ${req.body}`})
            return;
        } catch (err) {
            res.status(500).json(err);
            return;
            }
        }
    




  // Delete a user and associated apps
  export const deleteUser = async (req: Request, res: Response) => {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      await Thoughts.deleteMany({ _id: { $in: user.thoughts } });
      res.json({ message: 'User and associated apps deleted!' })
      return;
    } catch (err) {
      res.status(500).json(err);
      return;
    }
  }

