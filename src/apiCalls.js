const fetchData = (api) =>
  fetch(`http://localhost:3001/api/v1/${api}`)
    .then(response => response.json())

const usersData = fetchData('users')

const recipesData = fetchData('recipes')

const ingredientsData = fetchData('ingredients')

const postIngredient = (data) => {

return fetch(`http://localhost:3001/api/v1/users`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
})
  .then(response => {
    if(!response.ok){
      console.log(response.json())
      throw
    }
    return response.json()
  })

}

export {usersData, recipesData, ingredientsData, postIngredient};
