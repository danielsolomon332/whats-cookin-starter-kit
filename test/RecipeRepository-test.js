import { expect } from 'chai';
import Recipe from "../src/classes/RecipeClass.js";
import RecipeRepository from '../src/classes/RecipeRepository';
import Ingredient from "../src/classes/IngredientClass.js"
import recipeData from "./test-recipe.js";


describe('Recipe', () => {
  let cookbook = null;

  beforeEach(() => {
      cookbook = new RecipeRepository(recipeData);
});

  it('Should be a function', () => {
    expect(RecipeRepository).to.be.a('function');
  });
  it('should have a recipes property', () => {
    expect(cookbook.recipes).to.be.an('array');
  });
  it('should instantiate Recipe', () => {
    cookbook.createRecipeCard(recipeData)
    expect(cookbook.recipes[0]).to.be.an.instanceOf(Recipe);
  });
  it('should be able to filter by name', () => {
    expect(cookbook.filterByName('Loaded Chocolate Chip Pudding Cookie Cups')).to.be.an('object');
  });
  it('should be able to filter by ingredients', () => {
    expect(cookbook.filterbyIngredients('wheat flour')).to.be.an('object');
  });
  it('should be able to filter by a tag', () => {
    expect(cookbook.filterByTags(['antipasti'])).to.be.an('object');
  });
  it('should be able to filter by multiple tags', () => {
    expect(cookbook.filterByTags([
      "antipasti",
      "starter",
      "snack",
      "appetizer",
      "antipasto",
      "hor d'oeuvre"
    ])).to.be.an('object');
});
})
