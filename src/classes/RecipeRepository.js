import Recipe from "./RecipeClass.js";
import Ingredient from "./IngredientClass.js";
import ingredientsData from "../data/ingredients.js";


class RecipeRepository {
  constructor(recipeList, ingredientsData) {
    this.recipes = [];
    this.allIngredients = ingredientsData;
    this.tagsList = [];

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
      if (recipe.name.toUpperCase().includes(name.toUpperCase())) {
        return recipe
      };
    });
    return result;
  };

  filterByIngredients(ingredients) {
    const result = this.recipes.filter(recipe => {
      const containsName = ingredients.every(ingredientName => {
        return recipe.ingredientList.filter(ingredient => {
          // console.log(ingredient.name)
          // console.log(ingredient)
          ingredient.toUpperCase().includes(ingredientName.toUpperCase());
        })
      })
      if (containsName) {
          return recipe
        }
      })
      return result
    };


  filterByTags(tags) {
    const result = this.recipes.filter(recipe => {
    if (tags.every(tag => {return recipe.tags.includes(tag)})) {
      return recipe
    }
  });
    return result
  };

  addTags() {
    const result = this.recipes.forEach((recipe) => {
      recipe.tags.forEach((tag) => {
        if (!this.tagsList.includes(tag)) {
        this.tagsList.push(tag)
        }
      })
    })
  }
};

export default RecipeRepository;
