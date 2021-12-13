const express = require('express');
const multer = require('multer');
const recipesController = require('../controllers/recipesController');
const validateToken = require('../middleware/validateToken');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads/');
  },
  filename: (req, file, callback) => {
    const extension = 'jpeg';
    callback(null, `${req.params.id}.${extension}`);
  },
});

const upload = multer({ storage });

const PATH = '/recipes/:id';

router.get('/recipes', recipesController.getAllRecipes);
router.get(PATH, recipesController.findByIdRecipes);
router.post('/recipes', [validateToken, recipesController.registerRecipes]);
router.put(PATH, [validateToken, recipesController.updateRecipes]);
router.put(
  '/recipes/:id/image/',
  [validateToken, upload.single('image')],
  recipesController.addImage,
);
router.delete(PATH, [validateToken, recipesController.deleteRecipe]);

module.exports = router;
