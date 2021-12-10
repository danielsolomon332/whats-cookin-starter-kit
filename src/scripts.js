import './styles.css';
import apiCalls from './apiCalls';
import RecipeRepository from "./classes/RecipeRepository.js";
import ingredientsData from "./data/ingredients.js";
import recipeData from "./data/recipes.js";

const cardsContainer = document.querySelector('#cardsContainer');

const cookBook = new RecipeRepository(recipeData, ingredientsData)

const showAllRecipes = () => {
  cardsContainer.innerHTML = '';
  const result = cookBook.recipes.reduce((acc, recipe) => {
    acc += `<div class="recipe-card">
    <div class="image-container">
    <div class="icon-button">
    <button class="dropdown-buttons"><i class="far fa-star"></i></button>
    </div>
    <img class="recipe-image" src=${cookbook.recipes[recipe][image]}>
    </div>
    <h3 class="recipe-title">${cookbook.recipes[recipe][title]}</h3>
    </div>`

    return acc
}, '')
    return result
}


console.log('Hello world');

window.addEventListener('load', showAllRecipes)
