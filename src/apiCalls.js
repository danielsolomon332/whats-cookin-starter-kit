const fetchData = (api) =>
  fetch(`http://localhost:3001/api/v1/${api}`)
    .then(response => response.json())

const usersData = fetchData('users')

const recipesData = fetchData('recipes')

const ingredientsData = fetchData('ingredients')

export {usersData, recipesData, ingredientsData};
