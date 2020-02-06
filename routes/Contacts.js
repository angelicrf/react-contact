const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.send('Get user contacts'));
router.post('/', (req, res) => res.send('Add user contacts'));
router.put('/:id', (req, res) => res.send('Update user contacts'));
router.delete('/:id', (req, res) => res.send('Delete user contacts'));



module.exports = router;
