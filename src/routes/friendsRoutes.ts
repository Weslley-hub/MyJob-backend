import express from 'express';
import { sendFriendRequestController, acceptFriendRequestController, getFriendshipLevelController, listReceivedFriendRequestsController, listFriendsController } from '../controllers/Friends/friendController';


const router = express.Router();

router.post('/request', sendFriendRequestController);

router.post('/accept', acceptFriendRequestController);

router.get('/status/:friendId', getFriendshipLevelController);

router.get('/received', listReceivedFriendRequestsController);

router.get('/friends', listFriendsController);

export default router;