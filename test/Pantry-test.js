import { expect } from 'chai';
import Recipe from "../src/classes/RecipeClass.js";
import Ingredient from "../src/classes/IngredientClass.js";
import ingredientsData from "../src/data/ingredients.js";
import recipeData from "../src/data/recipes.js";
import usersData from "../src/data/users.js";
import Pantry from "../src/classes/PantryClass.js";

describe('Pantry', () => {
  let pantry = null;

    beforeEach(() => {
      pantry = new Pantry(usersData[0].pantry)
    })

    it('should be a function', () => {
      expect(pantry).to.be.an.instanceOf(Pantry);
    })

    it('should contain ingredients', () => {
      expect(pantry.usersIngredients).to.be.an("array");
    })

    it('should store a list of missing ingredients', () => {
      expect(pantry.missingIngredients).to.be.an("array")
    })

    it('should check if they have required recipe ingredients', () => {
      let selectedRecipe = recipeData[0]
      expect(pantry.checkIngredients(selectedRecipe)).to.equal("Ready to Cook!");
    })

    it('should tell a user if they still need ingredients', () => {
      let selectedRecipe = recipeData[1]
      expect(pantry.checkIngredients(selectedRecipe)).to.equal("You still need ***LIST SHOULD BE HERE***");
    })

    it('should make a list of the needed ingredients', () => {
      let selectedRecipe = recipeData[1]
      pantry.checkIngredients(selectedRecipe)
      expect(pantry.missingIngredients).to.equal(["item1", "item2"]);
    })

    it('should remove ingredients once used', () => {
      let selectedRecipe = recipeData[0]
      pantry.useIngredients(selectedRecipe)
      expect(pantry.usersIngredients[2].amount).to.equal(3.5)
    })

    it('should be able to add more of an ingredient', () => {
      let selectedRecipe = recipeData[0]
      pantry.addIngredients(20081, 5)
      expect(pantry.usersIngredients[2].amount).to.equal(10)
    })

    it('should be able to add a new ingredient', () => {
      let selectedRecipe = recipeData[0]
      pantry.addIngredients(33333, 5)
      expect(pantry.usersIngredients[pantry.usersIngredients.length - 1].amount).to.equal(5)
    })
})
