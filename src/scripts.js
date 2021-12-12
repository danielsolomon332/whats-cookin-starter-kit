import './styles.css';
import apiCalls from './apiCalls';
import RecipeRepository from "./classes/RecipeRepository.js";
import User from "./classes/UsersClass.js"
import ingredientsData from "./data/ingredients.js";
import recipeData from "./data/recipes.js";
import usersData from "./data/users.js"

const cardsContainer = document.querySelector('#cardsContainer');
const centerContainer = document.querySelector('#centerContainer');
// const recipeCard = document.querySelector('.recipe-card')
const recipeView = document.querySelector('#recipeView');
const rvTitle = document.querySelector('#rvTitle');
const rvIngredients = document.querySelector('#rvIngredients');
const rvImg = document.querySelector('#rvImg');
const rvInstructions = document.querySelector('#rvInstructions');
const tagDropdown = document.querySelector('#tagDropdown');
const tags = document.querySelectorAll('.tags');
const searchBar = document.querySelector('#searchBar')
const searchBtn = document.querySelector('#searchBtn')
const favMealsDropdown = document.querySelector('#favMeals')
const toCookMealsDropdown = document.querySelector('#toCookMeals')

const cookBook = new RecipeRepository(recipeData, ingredientsData);
const user = new User(usersData[0])
let clickedRecipe;

const loadPage = () => {
  cookBook.createRecipeCard(recipeData);
  cookBook.addTags()
  displayTags()
  showRecipes(cookBook.recipes);
}

console.log(cookBook.tagsList)

const showRecipes = (listOfRecipes) => {
  cardsContainer.innerHTML = '';
    cardsContainer.innerHTML = listOfRecipes.reduce((acc, recipe) => {
    acc +=
    `<div class="recipe-card">
      <div class="image-container" id="${recipe.id}">
      <button class="dropdown-buttons icon-button"><i class="far fa-star"></i></button>
      <button class="dropdown-buttons to-cook">TO COOK</button>
      <img class="recipe-image" src=${recipe.image}>
      </div>
      <h3 class="recipe-title">${recipe.name}</h3>
      </div>`
    return acc
}, '');
};

const generateTagButtons = (tagList) => {
  return tagList.reduce((acc, tag) => {
    acc += `<p class="dropdown-items tags">${tag}</p>`
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

const favoriteStore = (recipeId, cookBook) => {
  const recipeSelection = cookBook.recipes.find(recipe => {
    if(recipe.id == recipeId) {
      user.addFavorite(recipe)
    }
  })
}

const toCookStore = (recipeId, cookBook) => {
  const recipeSelection = cookBook.recipes.find(recipe => {
    if(recipe.id == recipeId) {
      user.addToCook(recipe)
    }
  })
}

const favoriteRemove = (recipeId, cookBook) => {
  const recipeSelection = cookBook.recipes.find(recipe => {
    if(recipe.id == recipeId) {
      user.removeFavorite(recipe)
    }
  })
}

const assignContent = (clickedRecipe) => {
  rvImg.src = `${clickedRecipe.image}`;
  rvTitle.innerText = `${clickedRecipe.name}`;
  rvIngredients.innerHTML = displayIngredients(clickedRecipe);
  rvInstructions.innerHTML = displayInstructions(clickedRecipe);
};

const showSearchResults = () => {
  const nameSearch = cookBook.filterByName(searchBar.value);
  const ingredientSearch = cookBook.filterByIngredients([searchBar.value]);
  showRecipes(nameSearch);
}

const showFavoriteMeals = () => {
  showRecipes(user.favoriteRecipes)
}

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
tagDropdown.addEventListener('click', (event) => {
  let tagName = event.target.innerText;
  if (cookBook.tagsList.includes(tagName)){
    showRecipes(cookBook.filterByTags([tagName]));
  }
})
searchBtn.addEventListener('click', showSearchResults)
favMealsDropdown.addEventListener('click', showFavoriteMeals)

centerContainer.addEventListener('click', (event) => {
  if(event.target.className === 'recipe-image') {
  findRecipe(event.target.parentNode.id, cookBook)
} else if (event.target.className === 'far fa-star') {
  let targetId = event.target.parentNode.parentNode.id;
  favoriteStore(targetId, cookBook)
} else if (event.target.className === "dropdown-buttons to-cook") {
  let targetId = event.target.parentNode.id;
  toCookStore(targetId, cookBook)
  console.log(user.toCook)

}
// else if (event.target.className === 'far fa-star'){
//   let targetId = event.target.parentNode.parentNode.id;
//   favoriteRemove(targetId, cookBook)
//   console.log(user.favoriteRecipes)
// }
})
