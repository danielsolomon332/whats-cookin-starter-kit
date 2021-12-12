import { expect } from 'chai';
import User from "../src/classes/UsersClass.js";
import usersData from "../src/data/users.js";
import ingredientsData from "./test-ingredients.js";
import recipeData from "./test-recipe.js";

describe("User", () => {
  let user = undefined;

  beforeEach(() => {
    user = new User(usersData[0])
  });

  it('Should be a function', () => {
    expect(User).to.be.a('function');
  });

  it('should have a name property', () => {
    expect(user.name).to.be.a('string');
  });

  it('should have an id property', () => {
    expect(user.id).to.be.a('number');
  });

  it('should have a pantry property', () => {
    expect(user.pantry).to.be.an('array');
  });

  it('should have a list of favorite recipes', () => {
    expect(user.favoriteRecipes).to.be.an('array');
  });

  it('should have a list of recipes to cook', () => {
    expect(user.toCook).to.be.an('array');
  });

  it('should be able to add favorite recipes', () => {
    user.addFavorite(recipeData);
    expect(user.favoriteRecipes).to.have.lengthOf(1);
  });

  it('should be able to add recipes to cook', () => {
    user.addToCook(recipeData);
    expect(user.toCook).to.have.lengthOf(1);
  });

  it('should be able to remove favorite recipes', () => {
    user.addFavorite(recipeData);
    expect(user.favoriteRecipes).to.have.lengthOf(1);
    user.removeFavorite(recipeData);
    expect(user.favoriteRecipes).to.deep.equal([]);
  })

});

// Allow a user to favorite or unfavorite recipes (add to / remove from the user’s favoriteRecipes)
// Decide to cook a recipe that week (add to my recipesToCook)
// Filter my favoriteRecipes by one or more tags.
// Filter my favoriteRecipes by its name or ingredients.
