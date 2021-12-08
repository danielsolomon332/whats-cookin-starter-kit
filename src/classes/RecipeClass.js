class Recipe {
    constructor(recipeObj, ingredientObj) {
        this.id = recipeObj.id;
        this.image = recipeObj.image;
        this.ingredients = recipeObj.ingredients;
        this.instructions = recipeObj.instructions;
        this.name = recipeObj.name;
        this.tags = recipeObj.tags
        this.ingredientList = []
    };
    // ingredientsNeeded(recipe) {
    //  this.ingredients.Recipe
    //  input: ingredient array of objects
    //  convert to array of values
    //  access id at index 0
    // 

    //     };
    };

module.exports = Recipe;