class Pantry {
 constructor(ingredients) {
    this.usersIngredients = ingredients
    this.missingIngredients = []
    this.needsIngredients = false
    this.ingredientNames = [];
}

checkIngredients(recipe) {
  this.missingIngredients = []
  this.needsIngredients = false
  const result = recipe.ingredients.forEach(ingredient => {
    const requiredIngredient = this.usersIngredients.find(item => {
      if(item.ingredient === ingredient.id) {
        if(ingredient.quantity.amount > item.amount) {
          this.needsIngredients = true;
          item.amountToBuy = ingredient.quantity.amount - item.amount;
          this.missingIngredients.push(item);
        }
      }
    })
  });
  return result
}

useIngredients(recipe) {
  if(!this.needsIngredients){
    const result = recipe.ingredients.forEach(ingredient => {
      const requiredIngredient = this.usersIngredients.find(item => {
        if(item.ingredient === ingredient.id) {
          if(ingredient.quantity.amount < item.amount) {
            item.amount = item.amount - ingredient.quantity.amount;
          }
        }
      })
    });
    return result
  }
}

addIngredients(id, amount, name) {
  const result = this.usersIngredients.find(item => {
    if(item.ingredient === id){
      item.amount += amount;
      return item
    }
  })
  if(result === undefined){
    this.usersIngredients.push({
      "ingredient": id,
      "amount": amount,
      "name": name
    })
  }
  return result
  }

  listIngredients(ingredients) {
  const result = this.missingIngredients.map(ingredient => {
    let item = ingredients.find(item => {
      if(item.id === ingredient.ingredient) {
        return item;
      };
    });
        return ` ${ingredient.amountToBuy} - ${item.name} `;
  });
        this.ingredientNames = result
};

giveIngredientNames(ingredients) {
const result = this.usersIngredients.map(ingredient => {
  let item = ingredients.find(item => {
    if(item.id === ingredient.ingredient) {
        ingredient.name = item.name;
      return item;
    };
  });
  return ingredient;
});
  this.usersIngredients = result
};
}

export default Pantry;
