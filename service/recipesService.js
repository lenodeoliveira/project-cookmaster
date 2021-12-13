const recipesModel = require('../models/recipesModel');

const verifyRecipe = (name, preparation, ingredients) => {
  if (name === undefined || preparation === undefined || ingredients === undefined) {
    return {
      code: 400,
      message: 'Invalid entries. Try again.',
    };
  }

  return {};
};

const registerRecipes = async (name, ingredients, preparation, userId) => {
  const checkedRecipe = verifyRecipe(name, preparation, ingredients);

  if (checkedRecipe.message) return checkedRecipe;
  const newRecipes = await recipesModel.registerRecipes(
    name,
    ingredients,
    preparation,
    userId,
  );
  return newRecipes;
};

const getAllRecipes = async () => {
  const allRecipes = await recipesModel.getAllRecipes();
  return allRecipes;
};

const findByIdRecipes = async (id) => {
  const findRecipe = await recipesModel.findByIdRecipes(id);
  if (findRecipe === null || findRecipe === undefined) {
    return {
      code: 404,
      message: 'recipe not found',
    };
  }

  return findRecipe;
};

const updateRecipes = async (id, name, ingredients, preparation) => {
  await recipesModel.updateRecipes(id, name, ingredients, preparation);
  const updatedRecipes = await recipesModel.findByIdRecipes(id);
  return updatedRecipes;
};

const deleteRecipe = async (id) => {
  await recipesModel.deleteRecipe(id);
};

const addImage = async (id, image) => {
  await recipesModel.addImage(id, image);
  const recipe = await recipesModel.findByIdRecipes(id);
  return recipe;
};

module.exports = {
  registerRecipes,
  getAllRecipes,
  findByIdRecipes,
  updateRecipes,
  deleteRecipe,
  addImage,
};
