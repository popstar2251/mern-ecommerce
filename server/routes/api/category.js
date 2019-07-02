const express = require('express');
const router = express.Router();
const passport = require('passport');

// Bring in Models & Helpers
const Category = require('../../models/Category');

router.post(
  '/add',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const name = req.body.name;
    const description = req.body.description;

    if (!description || !name) {
      return res
        .status(422)
        .json({ error: 'You must enter description & name.' });
    }

    const category = new Category({
      name,
      description
    });

    category.save((err, category) => {
      if (err) {
        return next(err);
      }

      res.status(200).json({
        success: true,
        message: `Category has been added successfully!`,
        category: category
      });
    });
  }
);

module.exports = router;
