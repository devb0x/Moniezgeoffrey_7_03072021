const recipes_section = document.querySelector('.recipes')

export class Recipe {
  /**
   *
   * @param id
   * @param name
   * @param servings
   * @param ingredients
   * @param time
   * @param description
   * @param appliance
   * @param ustensils
   */
//
  constructor(id, name, servings, ingredients, time, description, appliance, ustensils) {
    this.id = id
    this.name = name
    this.servings = servings
    this.ingredients = ingredients
    this.time = time
    this.description = description
    this.appliance = appliance
    this.ustensils = ustensils
  }

  render() {
    /**
     * create recipe div
     * @type {HTMLDivElement}
     */
    const recipe_el = document.createElement('div')
    recipe_el.classList.add('recipe')

    const img = document.createElement('div')
    img.classList.add('recipe-img')

    recipe_el.appendChild(img)

    /**
     * create recipe header div
     * @type {HTMLDivElement}
     */
    const recipe_header = document.createElement('div')
    recipe_header.classList.add('recipe-header')

    /**
     * create title for header
     * @type {HTMLHeadingElement}
     */
    const recipe_h2 = document.createElement('h2')
    recipe_h2.classList.add('recipe-header__title')
    recipe_h2.innerText = `${this.name}`

    /**
     * create time for header
     * @type {HTMLSpanElement}
     */
    const recipetime_span = document.createElement('span')
    recipetime_span.classList.add('recipe-header__time')
    recipetime_span.innerHTML = `<i class="far fa-clock"></i>` + `${this.time} min`

    /**
     * add title & time to the header
     */
    recipe_header.appendChild(recipe_h2)
    recipe_header.appendChild(recipetime_span)

    /**
     * create recipe info div
     * @type {HTMLDivElement}
     */
    const infos_div = document.createElement('div')
    infos_div.classList.add('recipe-infos')

    const ingredients_div = document.createElement('div')
    ingredients_div.classList.add('recipe-infos__ingredients')

    const list = document.createElement('ul')
    this.ingredients.forEach(el => {
      const itemLi = document.createElement('li')
      itemLi.innerText = `${el.ingredient} `

      if (el.quantity) {
        itemLi.innerText += `${el.quantity} `
      }
      if (el.unit) {
        itemLi.innerText += `${el.unit}`
      }

      list.appendChild(itemLi)
    })

    ingredients_div.appendChild(list)
    infos_div.appendChild(ingredients_div)

    /**
     * create description div
     * @type {HTMLDivElement}
     */
    const description_div = document.createElement('div')
    description_div.classList.add('recipe-infos__description')
    description_div.innerText = `${this.description}`

    /**
     * add ingredients list & description to the DOM
     */
    infos_div.appendChild(ingredients_div)
    infos_div.appendChild(description_div)


    recipe_el.appendChild(recipe_header)
    recipe_el.appendChild(infos_div)

    recipes_section.appendChild(recipe_el)

    return recipe_el
  }

}
