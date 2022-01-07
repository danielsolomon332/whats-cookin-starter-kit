class Pantry {
 constructor(ingredients) {
    this.usersIngredients = ingredients;
    this.missingIngredients = [];
    this.needsIngredients = false;
};

checkIngredients(recipe) {
  this.missingIngredients = [];
  this.needsIngredients = false;
  const result = recipe.ingredients.forEach(ingredient => {
    const requiredIngredient = this.usersIngredients.find(item => {
      if(item.ingredient === ingredient.id) {
        if(ingredient.quantity.amount > item.amount) {
          this.needsIngredients = true;
          item.amountToBuy = ingredient.quantity.amount - item.amount;
          this.missingIngredients.push(item);
        };
      };
    });
  });
  return result;
};

useIngredients(recipe) {
  if(!this.needsIngredients){
    const result = recipe.ingredients.forEach(ingredient => {
      const requiredIngredient = this.usersIngredients.find(item => {
        if(item.ingredient === ingredient.id) {
          if(ingredient.quantity.amount < item.amount) {
            item.amount = item.amount - ingredient.quantity.amount;
          };
        };
      });
    });
    return result;
  };
};

addIngredients(id, amount) {
  const result = this.usersIngredients.find(item => {
    if(item.ingredient === id){
      item.amount += amount;
      return item;
    };
  });
  if(result === undefined){
    this.usersIngredients.push({
      "ingredient": id,
      "amount": amount
    });
  };
  return result;
};
};

export default Pantry;
