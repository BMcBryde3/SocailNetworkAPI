import { Router } from 'express';
const router = Router();
import {addReaction,removeReaction,getThoughts, getThoughtsById, createUserThought,updateUserThought,deleteThought} from '../../controllers/thoughtsController.js'

// get all thoughts

router.route('/').get(getThoughts);

// get a single thought by Id
router.route('/:id').get(getThoughtsById)

// creates a thought 
router.route('/').post(createUserThought);

// updates a thought
router.route('/:id').get(getThoughts).put(updateUserThought);

// deletes a thought
router.route('/:id').get(getThoughts).delete(deleteThought)


//embeded reaction routes

router.route('/:thoughtId/reactions').put(addReaction);

router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

export default router;