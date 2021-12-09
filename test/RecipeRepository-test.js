import { expect } from 'chai';
import Recipe from "../src/classes/RecipeClass.js";
import RecipeRepository from '../src/classes/RecipeRepository';
import Ingredient from "../src/classes/IngredientClass.js";
import recipeData from "./test-recipe.js";
import ingredientsData from "./test-ingredients.js";


describe('Recipe', () => {
  let cookbook = null;

  beforeEach(() => {
      cookbook = new RecipeRepository(recipeData, ingredientsData);
});

  it('Should be a function', () => {
    expect(RecipeRepository).to.be.a('function');
  });
  it('should have a recipes property', () => {
    expect(cookbook.recipes).to.be.an('array');
  });
  it('should instantiate Recipe', () => {
    cookbook.createRecipeCard(recipeData);
    expect(cookbook.recipes[0]).to.be.an.instanceOf(Recipe);
  });
  it('should be able to filter by name', () => {
    cookbook.createRecipeCard(recipeData);
    expect(cookbook.filterByName('Loaded Chocolate Chip Pudding Cookie Cups')).to.be.an('array');
  });
  it('should be able to filter by ingredients', () => {
    cookbook.createRecipeCard(recipeData);
    expect(cookbook.filterByIngredients(['wheat flour'])).to.be.an('array');
  });
  it('should be able to filter by a tag', () => {
    cookbook.createRecipeCard(recipeData);
    expect(cookbook.filterByTags(['antipasti'])).to.be.an('array');
  });
  it('should be able to filter by multiple tags', () => {
    cookbook.createRecipeCard(recipeData);
    expect(cookbook.filterByTags([
      "antipasti",
      "starter",
      "snack",
      "appetizer",
      "antipasto",
      "hor d'oeuvre"
    ])).to.be.an('array');
});
})
