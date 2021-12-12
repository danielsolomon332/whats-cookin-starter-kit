import './styles.css';
import apiCalls from './apiCalls';
import RecipeRepository from "./classes/RecipeRepository.js";
import ingredientsData from "./data/ingredients.js";
import recipeData from "./data/recipes.js";

const cardsContainer = document.querySelector('#cardsContainer');
const centerContainer = document.querySelector('#centerContainer');
const recipeView = document.querySelector('#recipeView');
const rvTitle = document.querySelector('#rvTitle');
const rvIngredients = document.querySelector('#rvIngredients');
const rvImg = document.querySelector('#rvImg');
const rvInstructions = document.querySelector('#rvInstructions');
const tagDropdown = document.querySelector('#tagDropdown');

const cookBook = new RecipeRepository(recipeData, ingredientsData);
let clickedRecipe;

const loadPage = () => {
  cookBook.createRecipeCard(recipeData);
  cookBook.addTags()
  displayTags()
  showAllRecipes();
}

console.log(cookBook.tagsList)

const showAllRecipes = () => {
  cardsContainer.innerHTML = '';
    cardsContainer.innerHTML = cookBook.recipes.reduce((acc, recipe) => {
    acc +=
    `<div class="recipe-card">
      <div class="image-container">
      <div class="icon-button">
      <button class="dropdown-buttons"><i class="far fa-star"></i></button>
      </div>
      <img class="recipe-image" src=${recipe.image} id="${recipe.id}">
      </div>
      <h3 class="recipe-title">${recipe.name}</h3>
      </div>`
    return acc
}, '');
};

const generateTagButtons = (tagList) => {
  return tagList.reduce((acc, tag) => {
    acc += `<p class="dropdown-items">${tag}</p>`
    return acc
  }, '')
}

const displayTags = () => {
  tagDropdown.innerHTML = generateTagButtons(cookBook.tagsList)
}

const displayIngredients = (clickedRecipe) => {
  return clickedRecipe.ingredientList.reduce((acc, ingredient) => {
    acc += `<li>${ingredient}</li>`
    return acc
  }, '')
}

const displayInstructions = (clickedRecipe) => {
  return clickedRecipe.instructions.reduce((acc, instruction) => {
    acc += `<li>${instruction.instruction}</li>`
    return acc
  }, '')
}

const viewRecipe = () => {
  assignContent(clickedRecipe);
 showHide([recipeView], [centerContainer]);
}

const findRecipe = (recipeId, cookBook) => {
  const recipeSelection = cookBook.recipes.find(recipe => {
    if(recipe.id == recipeId) {
      clickedRecipe = recipe;
    }
  })
  viewRecipe()
}

const assignContent = (clickedRecipe) => {
  rvImg.src = `${clickedRecipe.image}`;
  rvTitle.innerText = `${clickedRecipe.name}`;
  rvIngredients.innerHTML = displayIngredients(clickedRecipe);
  rvInstructions.innerHTML = displayInstructions(clickedRecipe);
};

const showHide = (toShow, toHide) => {
  hide(toHide);
  show(toShow);
}

const hide = (toHide) => {
  toHide.forEach(element => {
    element.classList.add('hidden');
  })
}

const show = (toShow) => {
  toShow.forEach(element => {
    element.classList.remove('hidden');
  })
}

window.addEventListener('load', loadPage)
centerContainer.addEventListener('click', (event) => {
  findRecipe(event.target.id, cookBook);
})
