import { expect } from 'chai';
import Recipe from "../src/classes/RecipeClass.js";
import Ingredient from "../src/classes/IngredientClass.js";
import ingredientsData from "./test-ingredients.js";
import recipeData from "./test-recipe.js";

describe('Recipe', () => {
    let recipe = null;

    beforeEach(() => {
        recipe = new Recipe(recipeData[0]);
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

    it('should be a number', () => {
      recipe.calculateCost(ingredientsData);
      expect(recipe.total).to.be.a('number');
    })

    it('should return instructions', () => {
      expect(recipe.giveInstructions()).to.deep.equal(recipe.instructions);
    })
});
