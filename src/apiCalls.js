
const fetchUser = () => {
  fetch('https://what-s-cookin-starter-kit.herokuapp.com/api/v1/users')
    .then(response => response.json())
    .then(data => {
      let selectedUser = data.usersData[getRandomIndex(data.usersData)]
      localStorage.setItem("user", JSON.stringify(selectedUser))
  });
};

const getRandomIndex = (array) =>  {
  return Math.floor(Math.random() * array.length);
};

const fetchRecipes = () => {
  fetch('https://what-s-cookin-starter-kit.herokuapp.com/api/v1/recipes')
    .then(response => response.json())
    .then(data => {
      localStorage.setItem("recipes", JSON.stringify(data.recipeData))
    });
};

const fetchIngredients = () => {
  fetch('https://what-s-cookin-starter-kit.herokuapp.com/api/v1/ingredients')
    .then(response => response.json())
    .then(data => {
      localStorage.setItem("ingredients", JSON.stringify(data.ingredientsData))
    });
};

export default {fetchUser, fetchRecipes, fetchIngredients};
