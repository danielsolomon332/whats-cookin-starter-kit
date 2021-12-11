import Recipe from "./RecipeClass.js";
import Ingredient from "./IngredientClass.js";
import ingredientsData from "../data/ingredients.js";


class RecipeRepository {
  constructor(recipeList, ingredientsData) {
    this.recipes = [];
    this.allIngredients = ingredientsData;
  }
  createRecipeCard(recipeList) {
    const result = recipeList.map(recipe => {
      let recipeCard = new Recipe(recipe)
      recipeCard.listIngredients(this.allIngredients)
      recipeCard.calculateCost(ingredientsData);
      return recipeCard
    });
    this.recipes = result;
  };
  filterByName(name) {
    const result = this.recipes.filter(recipe => {
      if (recipe.name.includes(name)) {
        return recipe
      };
    });
    return result;
  };
  filterByIngredients(ingredients) {
    const result = this.recipes.filter(recipe => {
      ingredients.every(ingredient => {
        if (recipe.ingredientList.includes(ingredient)) {
          return recipe
        };
      });
    });
    return result
  };
  filterByTags(tags) {
    const result = this.recipes.filter(recipe => {
      tags.every(tag => {
      if (recipe.tags.includes(tag)) {
        return recipe
      };
    });
  });
    return result
  };
};

export default RecipeRepository;
