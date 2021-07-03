import { search } from "./search.js";

const search_input = document.getElementById('search')

search_input.addEventListener('input', (e) => {
  if (e.target.value.length >= 3) {
    console.log(e.target.value)
    search()
  }
})
