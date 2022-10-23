const express = require('express');
const { patchUser, postUser, addUser, getUsers } = require('../controllers/users');

const router = express.Router();
router.get('/', getUsers)

router.post('/', postUser);
router.put('/', addUser)
router.patch('/', patchUser);
router.use((request, response) => response.status(404).end());

module.exports = router;