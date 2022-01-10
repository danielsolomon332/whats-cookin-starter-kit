import {usersData, recipesData, ingredientsData, postIngredient} from './apiCalls';
import RecipeRepository from "./classes/RecipeRepository.js";
import User from "./classes/UsersClass.js";
import Pantry from "./classes/PantryClass.js";
import {domUpdates, hide, show, showHide, displayInstructions, displayIngredients, displayTags, isFavorited, displayPantry, displayPantryIngredients} from "./domUpdates.js";
import './css/index.scss';

const cardsContainer = document.querySelector('#cardsContainer');
const centerContainer = document.querySelector('#centerContainer');
const mainTitle = document.querySelector("#mainTitle");
const recipeView = document.querySelector('#recipeView');
const recipeViewTitle = document.querySelector('#recipeViewTitle');
const recipeViewIngredients = document.querySelector('#recipeViewIngredients');
const recipeViewCost = document.querySelector('#recipeViewCost');
const recipeViewImg = document.querySelector('#recipeViewImg');
const recipeViewInstructions = document.querySelector('#recipeViewInstructions');
const tagDropdown = document.querySelector('#tagDropdown');
const tags = document.querySelectorAll('.tags');
const searchBar = document.querySelector('#searchBar');
const searchBtn = document.querySelector('#searchBtn');
const favMealsDropdown = document.querySelector('#favMeals');
const toCookMealsDropdown = document.querySelector('#toCookMeals');
const gridTitle = document.querySelector('#gridTitle');
const letsCookButton = document.querySelector('#letsCookButton');
const modal = document.querySelector('#modal');
const modalContent = document.querySelector('#modalContent');
const modalHeader = document.querySelector('#modalHeader');
const modalList = document.querySelector('#needsIngredients')
const closeButton = document.querySelector('#close');
const pantryViewButton = document.querySelector('#pantryViewButton');
const pantryView = document.querySelector('#pantryView');
const pantryList = document.querySelector('#pantryList');
const ingredientForm = document.querySelector('#addIngredients');
const ingredientName = document.querySelector('#ingredientName');
const ingredientAmount = document.querySelector('#ingredientAmount');
const ingredientId = document.querySelector('#ingredientId');
const formButton = document.querySelector('#formButton');
const userContent = document.querySelector('#userContent');
const profileBtn = document.querySelector("#profileBtn");

let cookBook;
let user;
let clickedRecipe;
let currentCollection;
let currentPantry;
let ingredients;

const getRandomIndex = (array) =>  {
  return Math.floor(Math.random() * array.length);
};

const loadPage = () => {
  Promise.all([usersData, recipesData, ingredientsData])
    .then(data => {
      user = new User(data[0][getRandomIndex(data[0])]);
      currentPantry = new Pantry(user.pantry);
      ingredients = data[2];
      currentPantry.giveIngredientNames(ingredients);
      cookBook = new RecipeRepository(data[1], data[2]);
      cookBook.createRecipeCard(data[1]);
      cookBook.addTags();
      displayTags(cookBook.tagsList);
      domUpdates.showRecipes(cookBook.recipes, user);
      setPantryData();
      currentCollection = cookBook;
    });
    .catch(error => console.log(error))
};

const setPantryData = () => {
    pantryList.innerHTML = displayPantry(currentPantry);
}

const viewRecipe = () => {
  domUpdates.assignContent(clickedRecipe);
  showHide([recipeView], [centerContainer, pantryView]);
};

const findRecipe = (recipeId, cookBook) => {
  const recipeSelection = cookBook.recipes.find(recipe => {
    if(`${recipe.id}` === recipeId) {
      clickedRecipe = recipe;
    };
  });
  viewRecipe();
};

const favoriteStore = (recipeId, cookBook) => {
  const recipeSelection = cookBook.recipes.find(recipe => {
    if(`${recipe.id}` === recipeId) {
      user.addFavorite(recipe);
    };
  });
};

const toCookStore = (recipeId, cookBook) => {
  const recipeSelection = cookBook.recipes.find(recipe => {
    if(`${recipe.id}` === recipeId) {
      user.addToCook(recipe);
    };
  });
};

const favoriteRemove = (recipeId, cookBook) => {
  const recipeSelection = cookBook.recipes.find(recipe => {
    if(`${recipe.id}` === recipeId) {
      user.removeFavorite(recipe);
    };
  });
};

const cookRecipe = () => {
  currentPantry.checkIngredients(clickedRecipe);
  if (currentPantry.needsIngredients === true) {
    currentPantry.listIngredients(ingredients);
    modalHeader.innerText = "You Need the Following Ingredients:"
    modalList.innerHTML = displayPantryIngredients(currentPantry)
  } else if (currentPantry.needsIngredients === false) {
    let ingredientModifications = currentPantry.useIngredients(clickedRecipe);
    ingredientModifications.forEach(modification => {
      modification.userID = user.id;
      postIngredient(modification)
      .then(data => console.log(data))
      .catch(error => console.log(error))
    })
    setPantryData();
  }
  show([modal]);
};

const closeModal = () => {
  hide([modal]);
};

const showSearchResults = () => {
  const nameSearch = currentCollection.filterByName(searchBar.value);
  const ingredientSearch = currentCollection.filterByIngredients([searchBar.value]);
  domUpdates.showRecipes([...nameSearch, ...ingredientSearch], user);
};

const showFavoriteMeals = () => {
  currentCollection = user;
  gridTitle.innerText = 'Favorite Meals';
  domUpdates.showRecipes(user.favoriteRecipes, user);
  displayTags(user.tagsList);
};

const showToCookMeals = () => {
  currentCollection = user;
  gridTitle.innerText = 'Meals to Cook';
  domUpdates.showRecipes(user.toCook, user);
};

const viewPantry = () => {
  showHide([pantryView], [recipeView, centerContainer])
}

const filterByTags = (collection, tagName) => {
if (collection.tagsList.includes(tagName)){
  domUpdates.showRecipes(collection.filterByTags([tagName]), user);
  };
};

const submitIngredient = () => {
  let data = { userID: user.id, ingredientID: ingredientId.value, ingredientModification: ingredientAmount.value};
  postIngredient(data)
  .then(data => {
    currentPantry.addIngredients(ingredientId.value, ingredientAmount.value, ingredientName.value)
    setPantryData();
  })
  .catch(error => console.log(error))
}

const focusOnUserDropDown = () => {
  show([userContent]);
}


const returnHome = () => {
  currentCollection = cookBook;
  displayTags(cookBook.tagsList);
  domUpdates.showRecipes(cookBook.recipes, user);
}

window.addEventListener('load', loadPage);
tagDropdown.addEventListener('click', (event) => {
  let tagName = event.target.innerText;
  filterByTags(currentCollection, tagName);
});
window.addEventListener('click', (event) => {
  if (event.target == modal) {
    closeModal();
  };
});
formButton.addEventListener('click', (event) => {
  event.preventDefault()
  submitIngredient()
});
pantryViewButton.addEventListener('click', viewPantry);
profileBtn.addEventListener('click', (event) => {
  if(event.target === profileBtn){
    console.log(" I work!")
    focusOnUserDropDown()
  }
});
letsCookButton.addEventListener('click', cookRecipe);
closeButton.addEventListener('click', closeModal)
searchBtn.addEventListener('click', showSearchResults);
favMealsDropdown.addEventListener('click', showFavoriteMeals);
toCookMealsDropdown.addEventListener('click', showToCookMeals);
mainTitle.addEventListener('click', returnHome);
centerContainer.addEventListener('click', (event) => {
  if(event.target.className === 'recipe-image') {
  findRecipe(event.target.parentNode.id, cookBook);
} else if (event.target.className === 'far fa-star') {
  let targetId = event.target.parentNode.parentNode.id;
  favoriteStore(targetId, cookBook);
  domUpdates.showRecipes(cookBook.recipes, user);
} else if (event.target.className === "to-cook") {
  let targetId = event.target.parentNode.id;
  toCookStore(targetId, cookBook);
} else if (event.target.className === 'fas fa-star'){
  let targetId = event.target.parentNode.parentNode.id;
  favoriteRemove(targetId, cookBook);
  domUpdates.showRecipes(cookBook.recipes, user);
  };
});
