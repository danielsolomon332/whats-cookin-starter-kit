class Recipe {
    constructor(recipeObj) {
        this.id = recipeObj.id;
        this.image = recipeObj.image;
        this.ingredients = recipeObj.ingredients;
        this.instructions = recipeObj.instructions;
        this.name = recipeObj.name;
        this.tags = recipeObj.tags;
        this.ingredientList = [];
        this.total = 0;
    };

    listIngredients(ingredients) {
      const result = this.ingredients.map(ingredient => {
        var item = ingredients.find(item => {
          if(item.id === ingredient.id) {
            return item;
          };
        });
            return ` ${ingredient.quantity.amount}  ${ingredient.quantity.unit}  - ${item.name} `;
      });
            this.ingredientList = result;
    };

    calculateCost(ingredients) {
      const result = this.ingredients.reduce((sum, ingredient) => {
        var item = ingredients.find(item => {
          if(item.id === ingredient.id) {
            return item;
          };  
        });
            sum += item.estimatedCostInCents * ingredient.quantity.amount;
            return sum;
      }, 0);
            this.total = result;
    };

    giveInstructions() {
      return this.instructions;
    };
  };

export default Recipe;

