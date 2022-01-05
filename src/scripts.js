import './styles.css';
import apiCalls from './apiCalls';
import RecipeRepository from "./classes/RecipeRepository.js";
import User from "./classes/UsersClass.js";

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

apiCalls.fetchUser();
apiCalls.fetchRecipes();
apiCalls.fetchIngredients();

const recipeData = JSON.parse(localStorage.getItem("recipes"));
const ingredientsData = JSON.parse(localStorage.getItem("ingredients"));
const cookBook = new RecipeRepository(recipeData, ingredientsData);
let user;
let clickedRecipe;
let currentCollection;

const loadPage = () => {
  currentCollection = cookBook;
  user = new User(JSON.parse(localStorage.getItem("user")));
  cookBook.createRecipeCard(recipeData);
  cookBook.addTags();
  displayTags(cookBook.tagsList);
  showRecipes(cookBook.recipes);
}

const showRecipes = (listOfRecipes) => {
    showHide([centerContainer], [recipeView]);
    cardsContainer.innerHTML = '';
    cardsContainer.innerHTML = listOfRecipes.reduce((acc, recipe) => {
    acc +=
    `<div class="recipe-card">
      <div class="image-container" id="${recipe.id}">
      <button class="to-cook">TO COOK</button>
      <button class="dropdown-buttons icon-button star-button"><i class="${isFavorited(recipe)}"></i></button>
      <img class="recipe-image" src=${recipe.image}>
      </div>
      <h3 class="recipe-title">${recipe.name}</h3>
      </div>`
    return acc;
  }, '');
};

const isFavorited = (recipe) => {
  if(user.favoriteRecipes.includes(recipe)){
    return "fas fa-star";
  } else {
    return "far fa-star";
  }
}

const generateTagButtons = (tagList) => {
  return tagList.reduce((acc, tag) => {
    acc += `<p class="dropdown-items tags">${tag}</p>`;
    return acc;
  }, '');
};

const displayTags = (tagslist) => {
  tagDropdown.innerHTML = generateTagButtons(tagslist);
}

const displayIngredients = (clickedRecipe) => {
  return clickedRecipe.ingredientList.reduce((acc, ingredient) => {
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

const viewRecipe = () => {
  assignContent(clickedRecipe);
 showHide([recipeView], [centerContainer]);
};

const findRecipe = (recipeId, cookBook) => {
  const recipeSelection = cookBook.recipes.find(recipe => {
    if(recipe.id == recipeId) {
      clickedRecipe = recipe;
    };
  });
  viewRecipe();
};

const favoriteStore = (recipeId, cookBook) => {
  const recipeSelection = cookBook.recipes.find(recipe => {
    if(recipe.id == recipeId) {
      user.addFavorite(recipe);
      console.log(recipe.id)
      console.log(recipeId)
    };
  });
};

const toCookStore = (recipeId, cookBook) => {
  const recipeSelection = cookBook.recipes.find(recipe => {
    if(recipe.id == recipeId) {
      user.addToCook(recipe);
    };
  });
};

const favoriteRemove = (recipeId, cookBook) => {
  const recipeSelection = cookBook.recipes.find(recipe => {
    if(recipe.id == recipeId) {
      user.removeFavorite(recipe);
    };
  });
};

const assignContent = (clickedRecipe) => {
  recipeViewImg.src = `${clickedRecipe.image}`;
  recipeViewTitle.innerText = `${clickedRecipe.name}`;
  recipeViewIngredients.innerHTML = displayIngredients(clickedRecipe);
  recipeViewInstructions.innerHTML = displayInstructions(clickedRecipe);
  recipeViewCost.innerText = `Total Cost: $${clickedRecipe.total.toFixed(2)}`;
};

const showSearchResults = () => {
  const nameSearch = currentCollection.filterByName(searchBar.value);
  const ingredientSearch = currentCollection.filterByIngredients([searchBar.value]);
  showRecipes([...nameSearch, ...ingredientSearch]);
};

const showFavoriteMeals = () => {
  currentCollection = user;
  gridTitle.innerText = 'Favorite Meals';
  showRecipes(user.favoriteRecipes);
  displayTags(user.tagsList);
};

const showToCookMeals = () => {
  currentCollection = user;
  gridTitle.innerText = 'Meals to Cook';
  showRecipes(user.toCook);
};

const filterByTags = (collection, tagName) => {
if (collection.tagsList.includes(tagName)){
  showRecipes(collection.filterByTags([tagName]));
  };
};

const returnHome = () => {
  currentCollection = cookBook;
  displayTags(cookBook.tagsList);
  showRecipes(cookBook.recipes);
}

const showHide = (toShow, toHide) => {
  hide(toHide);
  show(toShow);
};

const hide = (toHide) => {
  toHide.forEach(element => {
    element.classList.add('hidden');
  });
};

const show = (toShow) => {
  toShow.forEach(element => {
    element.classList.remove('hidden');
  });
};

window.addEventListener('load', loadPage);
tagDropdown.addEventListener('click', (event) => {
  let tagName = event.target.innerText;
  filterByTags(currentCollection, tagName);
});

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
  showRecipes(cookBook.recipes);
} else if (event.target.className === "to-cook") {
  let targetId = event.target.parentNode.id;
  toCookStore(targetId, cookBook);
} else if (event.target.className === 'fas fa-star'){
  let targetId = event.target.parentNode.parentNode.id;
  favoriteRemove(targetId, cookBook);
  showRecipes(cookBook.recipes);
  };
});
