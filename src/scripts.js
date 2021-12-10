import './styles.css';
import apiCalls from './apiCalls';
import RecipeRepository from "./classes/RecipeRepository.js";
import ingredientsData from "./data/ingredients.js";
import recipeData from "./data/recipes.js";

const cardsContainer = document.querySelector('#cardsContainer');

const cookBook = new RecipeRepository(recipeData, ingredientsData);

const makeAllCards = () => {
  cookBook.createRecipeCard(recipeData);
  showAllRecipes();
}

const showAllRecipes = () => {
  cardsContainer.innerHTML = '';
    cardsContainer.innerHTML = cookBook.recipes.reduce((acc, recipe) => {
    acc += `<div class="recipe-card">
    <div class="image-container">
    <div class="icon-button">
    <button class="dropdown-buttons"><i class="far fa-star"></i></button>
    </div>
    <img class="recipe-image" src=${recipe.image}>
    </div>
    <h3 class="recipe-title">${recipe.name}</h3>
    </div>`

    return acc
}, '');
};


console.log('Hello world');

window.addEventListener('load', makeAllCards)
