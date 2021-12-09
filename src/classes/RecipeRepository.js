import Recipe from "./RecipeClass.js";


class RecipeRepository {
  constructor(recipeList) {
    this.recipes = [];
  }
  createRecipeCard(recipeList) {
    const result = recipeList.map(recipe => {
      let recipeCard = new Recipe(recipe)
      return recipeCard
    });
    this.recipes = result;
  };
  filterByName(name) {
    const result = this.recipes
  }
}

export default RecipeRepository;
// module.exports = RecipeRepository;
