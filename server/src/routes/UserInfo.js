const express = require('express');
const { getUserInfo } = require('../controllers/userInfoController');

const router = express.Router();

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
