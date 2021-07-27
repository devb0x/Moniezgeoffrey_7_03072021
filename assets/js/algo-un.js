import { Recipe } from "./Recipe.js";

const url = 'https://raw.githubusercontent.com/devb0x/Moniezgeoffrey_7_03072021/master/assets/recipes.json'

const search_input = document.getElementById('searchFormInput')
const search_form = document.getElementById('searchForm')

const filters_div = document.querySelector('.filters-list')

const ingredients_btn = document.getElementById('ingredientsBtn')
const ingredients_list = document.getElementById('ingredientsDropDown')

const appliances_btn = document.getElementById('appliancesBtn')
const appliances_list = document.getElementById('appliancesDropDown')

const ustensils_btn = document.getElementById('ustensilsBtn')
const ustensils_list = document.getElementById('ustensilsDropDown')

const test = document.getElementById('reset')

/**
 * data with all recipes
 * @type {*[]}
 */
let recipes = []
let search = []

let appliances = []
let ustensils = []
let ingredients = []

function fetchAllRecipes() {
  return fetch(`${url}`)
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

// test.addEventListener('click', (e) => {
//   recipes.filter((el) => {
//     if (el.name.includes('Lim')) {
//       search.push(el)
//     }
//   })
//
//   console.log(search)
// })

search_form.addEventListener('submit', (e) => {
  e.preventDefault()
  // console.log(search_input.value)
  // console.log(form.value)
  search = []
  appliances = []
  ustensils = []
  ingredients = []
  /**
   * search start at 3 characters
   */
  if (search_input.value && search_input.value.length >= 3) {
    let searchInput = search_input.value.toLowerCase()
    console.log('form submited with this value: ' + searchInput)
    const result = recipes.filter(el => {
      if (el.name.toLowerCase().includes(searchInput)
        || el.description.toLowerCase().includes(searchInput)
        || el.ingredients.forEach(ingredient => {
          ingredient.ingredient.toLowerCase().includes(searchInput)
        })
      ) {
        // search.push(el)
        return true
      } else {
        return false
      }
        // }
        // search.filter(el => {
        //   appliances.push(el.appliance)
        //   appliances = [...new Set(appliances)]
        // })
        // search.filter(el => {
        //   el.ustensils.forEach(ustensil => {
        //     ustensils.push(ustensil)
        //   })
        //   ustensils = [...new Set(ustensils)]
        // })
        // search.filter(el => {
        //   el.ingredients.forEach(ingredient => {
        //     ingredients.push(ingredient.ingredient)
        //   })
        //   ingredients = [...new Set(ingredients)]
        // })

        // })

    })
    // console.log(search)
    // console.log(appliances)
    // console.log(ustensils)
    // console.log(ingredients)

    resetRender()
    renderFilter(searchInput)
    renderSearch(result)

    // search = result

    renderIngredientsList(result)
    renderAppliancesList(result)
    renderUstensilsList(result)


    search_form.reset()
  }
})

fetchAllRecipes()
  .then(renderAllRecipes)
  .then(focus)



function resetRender() {
  const recipes = document.querySelectorAll('.recipe')
  const filters = document.querySelectorAll('.filter-item')
  recipes.forEach(el => {
    el.remove()
  })
  if (filters) {
    filters.forEach(el => {
      el.remove()
    })
  }
}

function renderAllRecipes() {
  recipes.forEach(el => {
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
}

/**
 * add the filter under the input search
 * @param filter
 */
function renderFilter(filter) {
  const filter_span = document.createElement('span')
  filter_span.classList.add('filter-item', 'btn_blue')
  filter_span.innerHTML = `${filter} <i class="far fa-times-circle"></i>`
  filters_div.appendChild(filter_span)
  search_form.append(filters_div)

  // filterData(filter)
}

/**
 * render the recipes data inside search[],
 * when the user use the main research input
 */
function renderSearch(list) {
  // resetRender()
  list.forEach(recipe => {
    new Recipe(
      recipe.id,
      recipe.name,
      recipe.servings,
      recipe.ingredients,
      recipe.time,
      recipe.description,
      recipe.appliance,
      recipe.ustensils
    ).render()
  })
}

function renderIngredientsList(result) {
  let ingredients = result.map(el => el.ingredients)
  console.log(ingredients)

  let list = []
  ingredients.forEach(el => {
    el.forEach(ingredient => {
      list.push(ingredient.ingredient)
    })
  })
  console.log(list)
  ingredients = [...new Set(list)]
  console.warn(ingredients)

  ingredients_list.innerHTML = `
      <label for="ingredientsSearchInput"></label>
      <div class="dropdown-content__input">
        <input type="text" id="ingredientsSearchInput" placeholder="Rechercher un ingrédient">
        <i class="fas fa-chevron-down dropdown-content__arrow ingredients-arrow"></i>    
      </div>
      
      <div class="filters-results">
        <ul class="filters-results-list ingredients-list"></ul>
      </div>
  `
  ingredients.forEach(el => {
    const li = document.createElement('li')
    li.classList.add('filters-results-list__item')
    const link = document.createElement('a')
    link.href = '#'
    link.innerText = `${el}`
    li.appendChild(link)
    document.querySelector('.ingredients-list').appendChild(li)
  })

  document.querySelector('.ingredients-arrow').addEventListener('click', (e) => {
    ingredients_btn.classList.toggle('hidden')
    document.getElementById('ingredientsDropDown').classList.toggle('hidden')
  })

}

function renderAppliancesList(result) {
  let appliances = result.map(el => el.appliance)
  appliances = [...new Set(appliances)]

  console.log(appliances)
  appliances_list.innerHTML = `
      <label for="appliancesSearchInput"></label>
      <div class="dropdown-content__input">
        <input type="text" id="appliancesSearchInput" placeholder="Rechercher un appareil">
        <i class="fas fa-chevron-down dropdown-content__arrow appliances-arrow"></i>    
      </div>
      
      <div class="filters-results">
        <ul class="filters-results-list appliances-list"></ul>
      </div>
  `
  appliances.forEach(el => {
    const li = document.createElement('li')
    li.classList.add('filters-results-list__item')
    const link = document.createElement('a')
    link.href = '#'
    link.innerText = `${el}`
    li.appendChild(link)
    document.querySelector('.appliances-list').appendChild(li)
  })

  document.querySelector('.appliances-arrow').addEventListener('click', (e) => {
    appliances_btn.classList.toggle('hidden')
    document.getElementById('appliancesDropDown').classList.toggle('hidden')
  })

}

function renderUstensilsList(result) {
  let ustensils = result.map(el => el.ustensils)
  console.log(ustensils)
  let list = []
  ustensils.forEach(el => {
    el.forEach(ustensil => {
      list.push(ustensil)
    })
  })
  console.warn(list)
  ustensils = [...new Set(list)]
  console.warn(ustensils)

  ustensils_list.innerHTML = `
      <label for="ustensilsSearchInput"></label>
      <div class="dropdown-content__input">
        <input type="text" id="ustensilsSearchInput" placeholder="Rechercher un ustensile">
        <i class="fas fa-chevron-down dropdown-content__arrow ustensils-arrow"></i>    
      </div>
      
      <div class="filters-results">
        <ul class="filters-results-list ustensils-list"></ul>
      </div>
  `

  ustensils.forEach(el => {
    const li = document.createElement('li')
    li.classList.add('filters-results-list__item')
    const link = document.createElement('a')
    link.href = '#'
    link.innerText = `${el}`
    li.appendChild(link)
    document.querySelector('.ustensils-list').appendChild(li)
  })

  document.querySelector('.ustensils-arrow').addEventListener('click', (e) => {
    ustensils_btn.classList.toggle('hidden')
    document.getElementById('ustensilsDropDown').classList.toggle('hidden')
  })

}

ingredients_btn.addEventListener('click', () => {
  ingredients_btn.classList.add('hidden')
  ingredients_list.classList.toggle('hidden')
  // renderIngredientsList()
})

appliances_btn.addEventListener('click', () => {
  appliances_btn.classList.add('hidden')
  appliances_list.classList.toggle('hidden')
  // renderAppliancesList()
})

ustensils_btn.addEventListener('click', () => {
  ustensils_btn.classList.add('hidden')
  ustensils_list.classList.toggle('hidden')
  // renderUstensilsList(ustensils)
})

// ##############################################################

// const filteredByReceipe = data.recipes.filter((elem) =>
//   elem.name.toLocaleLowerCase().includes(mySearch)
// );
//
// function filterByApplance(value) {
//   return filteredByReceipe.filter((elem) =>
//     elem.appliance.toLocaleLowerCase().includes(value)
//   );
// }

// ##############################################################
function focus() {
  search_input.focus()
  // document.querySelector('.searchFormInput').focus()
}

