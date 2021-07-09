import {Recipe} from "./Recipe.js";

const recipes_section = document.getElementsByClassName('recipes')
const reset = document.getElementById('reset')

let searchResult = []

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
      searchResult = [...new Set(searchResult)]
      console.log(searchResult)
      resetDOM()
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
      searchResult = []
    })
}

/**
 * Le système recherche des recettes correspondant à l’entrée utilisateur dans : le titre de
 la recette, la liste des ingrédients de la recette, la description de la recette.
 */

export function resetDOM() {
  // console.log('reset')
  document.querySelectorAll(".recipe").forEach(e => e.parentNode.removeChild(e))
  recipes_section.innerHTML = ''
}

reset.addEventListener('click', () => {
  resetDOM()
})
