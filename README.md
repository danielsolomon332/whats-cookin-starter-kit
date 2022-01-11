# What's Cookin'? Starter Kit

What's Cookin was a group project where we designed a complete application including the HTML, CSS and JavaScript. The second half of the project included the following updates: GET and POST requests to a local API, changed the CSS to SCSS, and improved Accessibility (ARIA). The interface allows users to click on individual recipe cards, search for recipes, save favorites, choose recipes to cook, view their pantry, functionality to determine if the user has the needed ingredients to cook a recipe, the ability to add/remove ingredients from their pantry.
- <a href="https://frontend.turing.edu/projects/whats-cookin-part-one.html" target="\__blank">Project Spec Part 1</a>.
- <a href="https://frontend.turing.edu/projects/whats-cookin-part-two.html" target="\__blank">Project Spec Part 2</a>.

## How Does it Work?

<img width= "1440" alt="unable to load picture at this time" src="https://user-images.githubusercontent.com/90291724/148858598-7dc6beac-3702-414f-9c38-f6dc68574dbb.png">

-   On page load, user is presented with a home page consisting of a search bar on the top left, 3 drop down menus on the top right, and a grid displaying images of all recipes in the database.

<img width= "1440" alt="unable to load picture at this time" src="https://user-images.githubusercontent.com/90291724/148858668-885bf33f-0f32-4ed0-b963-390ab31232ab.png">

-   The search bar function allows users to filter by ingredients or recipe names.

<img width= "1440" alt="unable to load picture at this time" src="https://user-images.githubusercontent.com/90291724/148858762-f44ec7df-dcd9-43fe-a462-8933eb8ed17e.png">

-   This drop down menu allows a user to filter by recipe tags.

<img width= "1440" alt="unable to load picture at this time" src="https://user-images.githubusercontent.com/90291724/148858818-6661d207-97c6-4882-b691-69e35294a989.png">

-   Above recipe images are options to either favorite (star) or add to "recipes to cook" folder. When favorited, the hollow star is filled in to show it has already been added. Users are unable to duplicate recipes already in favorites folder. Recipes can also be removed from favorites folder.

<img width= "1440" alt="unable to load picture at this time" src="https://user-images.githubusercontent.com/90291724/148858878-60858a00-8825-40ed-8443-c2af00841855.png">

-   When a recipe card has been clicked on, the user is taken to a new page showing recipe, cost, image, ingredients, and instructions.


<img width= "1440" alt="unable to load picture at this time" src="https://user-images.githubusercontent.com/90291724/148858911-7660513b-d230-4f48-be44-580291d2e44f.png">

-   The favorites folder is selected from a drop down menu. When selected, users are shown a new page with all recipes that have been favorited.


<img width= "1440" alt="unable to load picture at this time" src="https://user-images.githubusercontent.com/90291724/148858961-41dadab9-7f89-4f33-b283-128d9e6a2f5b.png">

-   The "recipes to cook" folder is selected from a drop down menu. When selected, users are shown a new page with all recipes that have been added to their "to cook" list.


<img width= "1440" alt="unable to load picture at this time" src="https://user-images.githubusercontent.com/90291724/148859031-c7720672-32a4-4afd-9269-2f58f6272d65.png">

-   When the user is ready to cook, they will click the "Start to Cook Recipe" button to the right of the recipe image. When that button is clicked, a javascript function will determine if the user has all of the needed ingredients in their pantry. A modal will pop up to let the user know if they are ready to start cooking (if they have all needed ingredients), or it will list the needed ingredients to purchase before cooking. When the user is ready and begins to cook, the needed ingredients will be removed from their pantry.


<img width= "1440" alt="unable to load picture at this time" src="https://user-images.githubusercontent.com/90291724/148859133-d2cb43aa-67f2-446e-9e5c-c2062e899c45.png">

-  Using the left most drop down menu, the user can view their pantry. The user is also able to add ingredients to their pantry, in case more are needed before cooking a specific recipe.

## Local API Server Set Up

1. Clone the following repository: https://github.com/turingschool-examples/whats-cookin-api
2. To clone, click the green "code" button and copy instructions/links
3. In your terminal, type git clone and [paste] what you copied from GitHub directly after the word clone.
4. Once you have cloned the repo, change into the directory and install the project dependencies. Run `npm install` or `npm i` to install project dependencies.
5. Run `npm start`.

## Repository Set Up

1. Clone the repository.
2. To clone, click the green "code" button and copy instructions/links
3. In your terminal, type git clone and [paste] what you copied from GitHub directly after the word clone.
4. Once you have cloned the repo, change into the directory and install the project dependencies. Run `npm install` or `npm i` to install project dependencies.
5. Run `npm start` and visit `localhost:8080` in your web browser.

## Testing

Mocha and chai are already set up, with a boilerplate test for you.

## Future Feature Additions

- Add ratings system for recipes.
- Complete drop down menus.
- Improve Accessibility

## Technologies Used

- HTML, CSS, SCSS, Javascript, ESlint, Lighthouse, WAVE

## Contributors

- Turing School of Software & Design Front-End Students
   - Grace Gardner (github: @gracegardner)
   - Daniel Solomon (github: @danielsolomon332)
   - Chad DeGange (github: @cdegange)
