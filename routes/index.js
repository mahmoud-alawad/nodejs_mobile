//routes
const express = require('express')
const router = express.Router();

router.route('/').get((req,res)=>  res.status(200).render('home', { title: req.route.path.replace('/', ' ') }));

module.exports = router;