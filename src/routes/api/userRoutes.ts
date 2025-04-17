import { Router } from 'express';
const router = Router();
import { getUsers, getUserById, createUser, updatedUser, deleteUser } from '../../controllers/userController.js';
import {addFriend,deleteFriend} from '../../controllers/friendsController.js'


// need a route to get all users
router.route('/').get(getUsers);
// `GET` a single user by its `_id` and populated thought and friend data
router.route('/:userId').get(getUserById);
// `POST` a new user (note that the examples below are just sample data):
router.route('/').get(getUsers).post(createUser);
//  `PUT` to update a user by its `_id`
router.route('/:userId').get(getUsers).put(updatedUser);
// `DELETE` to remove user by its `_id`
router.route('/:userId').get(getUsers).delete(deleteUser);




// nested friends routes

// add friends to a specific user
router.route('/:userId/friends/:friendId').get(getUserById).post(addFriend);

// delete a friends assocaited to a specific user
router.route('/:userID/friends/:friendId').get(getUserById).put(deleteFriend);

export default router;