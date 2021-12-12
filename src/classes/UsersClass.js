class User {
  constructor(user) {
    this.name = user.name;
    this.id = user.id;
    this.pantry = user.pantry;
    this.favoriteRecipes = [];
    this.toCook = [];
    this.tagsList = [];
  }

  addFavorite(recipe) {
    this.favoriteRecipes.push(recipe);
    recipe.tags.forEach(tag => {
      if(!this.tagsList.includes(tag)){
        this.tagsList.push(tag);
      }
    })
  }

  removeFavorite(recipe) {
    if (this.favoriteRecipes.includes(recipe)) {
      const deleteIndex = this.favoriteRecipes.indexOf(recipe);
      this.favoriteRecipes.splice(deleteIndex, 1)
      this.tagsList = this.tagsList.filter(tag => {
       return !recipe.tags.includes(tag)
      })
    }
  }

  filterByTags(tags) {
    const result = this.favoriteRecipes.filter(recipe => {
    if (tags.every(tag => {return recipe.tags.includes(tag)})) {
      return recipe
    }
  });
    return result
  };

  addToCook(recipe) {
    this.toCook.push(recipe);
  }

}



export default User;
