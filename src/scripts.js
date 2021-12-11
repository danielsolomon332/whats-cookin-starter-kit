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

const cookBook = new RecipeRepository(recipeData, ingredientsData);
let clickedRecipe;

const makeAllCards = () => {
  cookBook.createRecipeCard(recipeData);
  showAllRecipes();
}

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
  let bob = `${clickedRecipe.image}`
  console.log(bob);
  rvImg.src = `${clickedRecipe.image}`;
  rvTitle.innerText = `${clickedRecipe.name}`;
  rvIngredients.innerHTML = `${clickedRecipe.ingredients}`;
  rvInstructions.innerHTML = `${clickedRecipe.instructions}`;
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

console.log(centerContainer);
console.log('Hello world');

window.addEventListener('load', makeAllCards)
centerContainer.addEventListener('click', (event) => {
  findRecipe(event.target.id, cookBook);
})
