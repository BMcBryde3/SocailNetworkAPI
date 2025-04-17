
import { User } from '../models/index.js';
import { Request, Response } from 'express';

export const addFriend = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const friendId = req.params.friendId;

    if (!userId || !friendId) {
      return res.status(400).json({ message: 'User ID and Friend ID are required.' });
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId }, // Ensure user._id is used
      { $addToSet: { friends: friendId } }, // Add friend._id to the friends array
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found.' });
    }

    return res.json(updatedUser);
  } catch (err) {
    return res.status(500).json({ error: (err instanceof Error) ? err.message : 'An unknown error occurred.' });
  }
};

export const deleteFriend = async (req: Request, res: Response) => {
  try {
    // Find the user by ID
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({ message: 'No user with the provided ID was found.' });
    }

    // Find the friend by ID
    const friend = await User.findById(req.params.friendId);

    if (!friend) {
      return res.status(404).json({ message: 'Friend not found' });
    }

    // Remove the friend's ID from the user's friends array
    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id }, // Ensure user._id is used
      { $pull: { friends: friend._id } }, // Remove friend._id from the friends array
      { new: true, runValidators: true }
    );

    return res.json(updatedUser);
  } catch (err) {
    return res.status(500).json(err);
  }
};