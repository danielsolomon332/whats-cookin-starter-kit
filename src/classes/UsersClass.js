class User {
  constructor(user) {
    this.name = user.name;
    this.id = user.id;
    this.pantry = user.pantry;
    this.favoriteRecipes = [];
    this.toCook = [];
  }

  addFavorite(recipe) {
    this.favoriteRecipes.push(recipe);
  }

  removeFavorite(recipe) {
    if (this.favoriteRecipes.includes(recipe)) {
      const deleteIndex = this.favoriteRecipes.indexOf(recipe);
      this.favoriteRecipes.splice(deleteIndex, 1)
    }
  }

  addToCook(recipe) {
    this.toCook.push(recipe);
  }

}



export default User;
