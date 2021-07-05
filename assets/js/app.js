import { search } from "./search.js";
import { Recipe } from "./Recipe.js";

const search_input = document.getElementById('search')

search_input.addEventListener('input', (e) => {
  if (e.target.value.length >= 3) {
    // console.log(e.target.value)
    search(e.target.value)
  }
})

let recipes = []

function fetchAll() {
  return fetch('https://raw.githubusercontent.com/devb0x/Moniezgeoffrey_7_03072021/master/assets/recipes.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('HTTP error' + response.status)
      }
      return response.json()
    })
    .then(data => {
      data.recipes.forEach(el => {
        recipes.push(el)
      })
    })
}

function renderAll() {
  recipes.forEach(el => {
    const recipe = new Recipe(
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
}

fetchAll().then(() => {
  renderAll()
})
