const Ingredient = require("../src/classes/IngredientClass.js");
const chai = require("chai");
const expect = chai.expect;
const mocha = require("mocha");

describe('Ingredient', () => {
    let ingredient = null;

    beforeEach(() => {
        ingredient = new Ingredient({"id": 20081, "name": "wheat flour", "estimatedCostInCents": 142});
    });

    it('should be a function', () => {
        expect(ingredient).to.be.an.instanceOf(Ingredient);
    });
    it('should have an id', () => {
        expect(ingredient.id).to.equal(20081);
    });
    it('should have a name', () => {
        expect(ingredient.name).to.equal('wheat flour');
    });
    it('should have an estimated cost', () => {
        expect(ingredient.cost).to.equal(142);
    });
});


