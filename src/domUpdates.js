const hide = (toHide) => {
  toHide.forEach(element => {
    element.classList.add('hidden');
  })
};

const show = (toShow) => {
  toShow.forEach(element => {
    element.classList.remove('hidden');
  });
};

const showHide = (toShow, toHide) => {
  hide(toHide);
  show(toShow);
};

const isFavorited = (recipe, user) => {
  if(user.favoriteRecipes.includes(recipe)){
    return "fas fa-star";
  } else {
    return "far fa-star";
  }
};

const displayTags = (tagslist) => {
  tagDropdown.innerHTML = domUpdates.generateTagButtons(tagslist);
}

const displayIngredients = (clickedRecipe) => {
  return clickedRecipe.ingredientList.reduce((acc, ingredient) => {
    acc += `<li>${ingredient}</li>`;
    return acc;
  }, '');
};

const displayPantry = (pantry) => {
  return pantry.usersIngredients.reduce((acc, ingredient) => {
    acc += `<li>${ingredient.name}  (${ingredient.ingredient})  :  ${ingredient.amount}</li>`;
    return acc;
  }, '');
};


const displayPantryIngredients = (pantry) => {
  return pantry.ingredientNames.reduce((acc, ingredient) => {
    acc += `<li>${ingredient}</li>`;
    return acc;
  }, '');
};

const displayInstructions = (clickedRecipe) => {
  return clickedRecipe.instructions.reduce((acc, instruction) => {
    acc += `<li>${instruction.instruction}</li>`;
  return acc;
  }, '');
};

let domUpdates = {

  assignContent(clickedRecipe){
    recipeViewImg.src = `${clickedRecipe.image}`;
    recipeViewTitle.innerText = `${clickedRecipe.name}`;
    recipeViewIngredients.innerHTML = displayIngredients(clickedRecipe);
    recipeViewInstructions.innerHTML = displayInstructions(clickedRecipe);
    recipeViewCost.innerText = `Total Cost: $${clickedRecipe.total.toFixed(2)}`;
  },

  showRecipes(listOfRecipes, user) {
      showHide([centerContainer], [recipeView])
      cardsContainer.innerHTML = ''
      cardsContainer.innerHTML = listOfRecipes.reduce((acc, recipe) => {
      acc +=
      `<div class="recipe-card">
        <div class="image-container" id="${recipe.id}">
        <button class="to-cook">TO COOK</button>
        <button class="dropdown-buttons icon-button star-button"><i class="${isFavorited(recipe, user)}"></i></button>
        <img class="recipe-image" src=${recipe.image}>
        </div>
        <h3 class="recipe-title">${recipe.name}</h3>
        </div>`
      return acc
    }, '')
  },

  generateTagButtons(tagList){
    return tagList.reduce((acc, tag) => {
      acc += `<p class="dropdown-items tags">${tag}</p>`
      return acc;
    }, '')
  },

};

export {domUpdates, hide, show, showHide, displayInstructions, displayIngredients, displayTags, isFavorited, displayPantry, displayPantryIngredients};
