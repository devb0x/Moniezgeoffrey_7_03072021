import {Recipe} from "./Recipe.js";

const recipes_section = document.getElementsByClassName('recipes')
const reset = document.getElementById('reset')

let searchResult = []
let ingredientsFilter = []
let appareilsFilter = []
let ustensilsFilter = []

export function search(userInput) {
  return fetch('https://raw.githubusercontent.com/devb0x/Moniezgeoffrey_7_03072021/master/assets/recipes.json')
    .then(response => {
      if (!response.ok) {
        throw new Error("HTTP error" + response.status)
      }
      return response.json()
    })
    .then(json => {
      // Object.values(json.recipes).forEach(data => {
        json.recipes.forEach(data => {
        /**
         * userInput est contenu dans le titre
         */
        if (data.name.toLowerCase().includes(userInput.toLowerCase())) {
            searchResult.push(data)
        }

        /**
         * userInput est contenu dans la description
         */
        if (data.description.toLowerCase().includes(userInput.toLowerCase())) {
            searchResult.push(data)
        }

        /**
         * boucle inside ingredients
         * userInput est contenu dans un des ingredients
         */
        data.ingredients.forEach(el => {
          if (el.ingredient.toLowerCase().includes(userInput.toLowerCase())) {
              searchResult.push(data)
          }
        })
      })
    })
    .then(() => {
      /**
       * we filter the result to avoid duplicate
       * @type {*[]}
       */
      searchResult = [...new Set(searchResult)]
      console.log(searchResult)

      /**
       * add ingredients
       * add appareils in appareilsFilter(appliance in JSON)
       * add ustensils
       * @type {*[]}
       */
      searchResult.forEach(el => {
        ingredientsFilter.push(el.ingredients)
        appareilsFilter.push(el.appliance.toLowerCase())
        ustensilsFilter.push(el.ustensils)
      })

      /**
       * filter ingredients array
       * @type {*[]}
       */
      let tempIngredientsArray = []
      for (let i = 0; i < ingredientsFilter.length; i++) {
        ingredientsFilter[i].forEach(ingredient => {
          tempIngredientsArray.push(ingredient.ingredient.toLowerCase())
        })
      }
      ingredientsFilter = [...new Set(tempIngredientsArray)]
      console.warn(ingredientsFilter)

      /**
       * remove duplicate
       * @type {*[]}
       */
      appareilsFilter = [...new Set(appareilsFilter)]

      /**
       * filter the ustensilsFilter array
       * @type {*[]}
       */
      let tempUstensilsArray = []
      for (let i = 0; i < ustensilsFilter.length; i++) {
        ustensilsFilter[i].forEach(ustensil => {
          tempUstensilsArray.push(ustensil.toLowerCase())
        })
      }
      ustensilsFilter = [...new Set(tempUstensilsArray)]
      console.warn(ustensilsFilter)

      /**
       * clear the recipes from the dom
       */
      resetDOM()

      /**
       * create new Recipe and render it
       */
      searchResult.forEach(el => {
        new Recipe(
          el.id,
          el.name,
          el.servings,
          el.ingredients,
          el.time,
          el.description,
          el.appliance,
          el.ustensils
        ).render()
      })

      resetArrays()
    })
}

/**
 * Le système recherche des recettes correspondant à l’entrée utilisateur dans : le titre de
 la recette, la liste des ingrédients de la recette, la description de la recette.
 */

export function resetDOM() {
  // console.log('reset')
  document.querySelectorAll(".recipe").forEach(e => e.parentNode.removeChild(e))
  // recipes_section.innerHTML = ''
}

reset.addEventListener('click', () => {
  resetDOM()
})

function resetArrays() {
  searchResult = []
  ingredientsFilter = []
  appareilsFilter = []
  ustensilsFilter = []
}
