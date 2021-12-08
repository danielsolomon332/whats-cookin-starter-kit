const Recipe = require("../src/classes/RecipeClass.js");
const Ingredient = require("../src/classes/IngredientClass.js");
const chai = require("chai");
const expect = chai.expect;
const mocha = require("mocha");

describe('Recipe', () => {
    let recipe = null;
    // let ingredient = null;

    beforeEach(() => {
        // ingredient = new Ingredient({"id": 20081, "name": "wheat flour", "estimatedCostInCents": 142});
        recipe = new Recipe({
        "id": 595736,
        "image": "https://spoonacular.com/recipeImages/595736-556x370.jpg",
        "ingredients":[
        {
          "id": 20081,
          "quantity": {
            "amount": 1.5,
            "unit": "c"
          }
        },
        {
          "id": 18372,
          "quantity": {
            "amount": 0.5,
            "unit": "tsp"
          }
        },
        {
          "id": 1123,
          "quantity": {
            "amount": 1,
            "unit": "large"
          }
        }],
       "instructions": [ 
            {
              "instruction": "In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy.",
              "number": 1
            },
            {
              "instruction": "Add egg and vanilla and mix until combined.",
              "number": 2
            },
            {
              "instruction": "Add dry ingredients and mix on low just until incorporated. Stir in chocolate chips.Scoop the dough into 1,5 tablespoon size balls and place on a plate or sheet. Cover with saran wrap and chill at least 2 hours or overnight.When ready to bake, preheat oven to 350 degrees.",
              "number": 3
            }],
        "name": "Loaded Chocolate Chip Pudding Cookie Cups",
        "tags": [
          "antipasti",
          "starter",
          "snack",
          "appetizer",
          "antipasto",
          "hor d'oeuvre"
        ]
    });
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
        expect(recipe.ingredients).to.deep.equal([
            {
              "id": 20081,
              "quantity": {
                "amount": 1.5,
                "unit": "c"
              }
            },
            {
              "id": 18372,
              "quantity": {
                "amount": 0.5,
                "unit": "tsp"
              }
            },
            {
              "id": 1123,
              "quantity": {
                "amount": 1,
                "unit": "large"
              }
            }]);
    });
    it('should have instructions', () => {
        expect(recipe.instructions).to.deep.equal([ 
            {
              "instruction": "In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy.",
              "number": 1
            },
            {
              "instruction": "Add egg and vanilla and mix until combined.",
              "number": 2
            },
            {
              "instruction": "Add dry ingredients and mix on low just until incorporated. Stir in chocolate chips.Scoop the dough into 1,5 tablespoon size balls and place on a plate or sheet. Cover with saran wrap and chill at least 2 hours or overnight.When ready to bake, preheat oven to 350 degrees.",
              "number": 3
            }]);
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
          console.log(Object.values(recipe['ingredients'][0]));
    });
});

