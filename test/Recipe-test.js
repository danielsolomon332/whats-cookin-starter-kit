const Recipe = require("../src/classes/RecipeClass.js");
const Ingredient = require("../src/classes/IngredientClass.js");
const ingredientsData = require("./test-ingredients.js")
const recipeData = require("./test-recipe.js")
const chai = require("chai");
const expect = chai.expect;
const mocha = require("mocha");

describe('Recipe', () => {
    let recipe = null;

    beforeEach(() => {
        recipe = new Recipe(recipeData);
});

    it('should be a function', () => {
        expect(recipe).to.be.an.instanceOf(Recipe);
    });
    it('should have an id', () => {
        expect(recipe.id).to.equal(595736);
    });
    it('should have an image', () => {
        expect(recipe.image).to.equal("https://spoonacular.com/recipeImages/595736-556x370.jpg");
    });
    it('should have ingredients', () => {
        expect(recipe.ingredients).to.be.an("array");
    });
    it('should have instructions', () => {
        expect(recipe.instructions).to.be.an("array");
    });
    it('should have a name', () => {
        expect(recipe.name).to.equal("Loaded Chocolate Chip Pudding Cookie Cups");
    });
    it('should have tags', () => {
        expect(recipe.tags).to.deep.equal([
            "antipasti",
            "starter",
            "snack",
            "appetizer",
            "antipasto",
            "hor d'oeuvre"
          ]);
    });

    it("should create a list of ingredient names", () => {
      recipe.listIngredients(ingredientsData);
      expect(recipe.ingredientList).to.be.an("array");
      expect(recipe.ingredientList.length).to.equal(11);
    });

    it("should store a cost", () => {
      expect(recipe.total).to.equal(0);
    })

    it('should estimate total cost', () => {
      recipe.calculateCost(ingredientsData);
      expect(recipe.total).to.equal(17776);
    })

    it('should return instructions', () => {
      expect(recipe.giveInstructions()).to.deep.equal(recipe.instructions);
    })
});
