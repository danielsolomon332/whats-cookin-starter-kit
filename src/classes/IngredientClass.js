class Ingredient {
    constructor(ingredientObj) {
        this.id = ingredientObj.id;
        this.name = ingredientObj.name;
        this.cost = ingredientObj.estimatedCostInCents;
    };
};

export default Ingredient;
