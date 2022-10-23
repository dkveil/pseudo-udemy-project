const express = require('express');
const { patchUser, postUser, addUser, getUsers, patchUserById, getUser } = require('../controllers/users');

const router = express.Router();
router.get('/', getUsers)
router.get('/:id', getUser)
router.patch('/:id', patchUserById);
router.post('/', postUser);
router.put('/', addUser)
router.patch('/', patchUser);
router.use((request, response) => response.status(404).end());

module.exports = router;