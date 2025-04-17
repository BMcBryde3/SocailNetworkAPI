import { Thoughts,User} from '../models/index.js';
import { Request, Response } from 'express';


  // Get all thoughts
  export const getThoughts = async (_req: Request, res: Response) => {
    try {
      const thoughts = await Thoughts.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  }

// Get a single thoughts
export const getThoughtsById = async (req: Request, res: Response) => {
    try {
      const thoughts = await Thoughts.findOne({ _id: req.params.userId })
        .select('-__v');

      if (!thoughts) {
        return res.status(404).json({ message: 'No user thoughts with that ID' });
      }
      res.json(thoughts);
      return;
    } catch (err) {
      res.status(500).json(err);
      return;
    }
  }


  export const createUserThought = async (req: Request, res: Response) => {

    try {
        const newThought = await Thoughts.create(req.body);
        await User.findOneAndUpdate(
            { userName: req.body.userName },
            { $addToSet: { thoughts: newThought._id } },
            { new: true }
        );

        return res.status(201).json(newThought);
    } catch (err) {
        return res.status(500).json(err);
    }
  }

  export const updateUserThought = async (req: Request, res: Response) => {

        try{
    
            const thought = await Thoughts.findOneAndDelete({ _id: req.params.id });
    
            if (!thought) {
                return res.status(404).json({ message: 'No user thought with that ID' });
              }
    
              await Thoughts.findOneAndUpdate(
                { _id: req.params.id },
                {
                    thoughtText: req.body.thoughtText
                },
                { new: true }
              );
              res.json({ message: `Thought ${req.params.id} has been update to ${req.body.thoughtText}`})
                return;
            } catch (err) {
                res.status(500).json(err);
                return;
                }
            }
        


            // deletes a thought and deletes the thought id located in the user thoughts arrar
  export const deleteThought = async (req: Request, res: Response) => {

    try {
        
        const thought = await Thoughts.findOneAndDelete({ _id: req.params.id });

        if (!thought) {
          return res.status(404).json({ message: 'No thought with that ID' });
        }

        const user = await User.findOneAndUpdate(
          { thoughts: req.params.id },
          { $pull: { thoughts: req.params.id } },
          { new: true }
        );

        if (!user) {
          return res.status(404).json({ message: 'No user associated with this thought' });
        }

        res.json({ message: 'Thought successfully deleted and removed from user!' });
        return;
      } catch (err) {
        res.status(500).json(err);
        return;
      }
  }



  //create a new reaction 

  export const addReaction = async (req: Request, res: Response) => {
    try {
    const thought = await Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reaction: req.body } },
      { runValidators: true, new: true }
    );

    if (!thought) {
      return res.status(404).json({ message: 'No thought with this id!' });
    }

    res.json(thought);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
}


  //delete a reacation 
  export const removeReaction = async (req: Request, res: Response) => {
    try {
      const thought = await Thoughts.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reaction: { _id: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'No application with this id!' });
      }

      res.json(thought);
      return;
    } catch (err) {
      res.status(500).json(err);
      return;
    }
  }
