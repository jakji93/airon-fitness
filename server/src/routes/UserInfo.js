const express = require('express');
const {
  getUserInfo, registerUser, loginUser, getMe,
} = require('../controllers/userInfoController');

const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);

/**
 * @desc
 * @route GET /userInfo
 * @request
 *  body: n/a
 *  params: n/a
 *  query params: n/a
 * @response
 */
router.get('/', getUserInfo);

module.exports = router;
