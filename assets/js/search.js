export function search(userInput) {
  return fetch('https://raw.githubusercontent.com/devb0x/Moniezgeoffrey_7_03072021/master/assets/recipes.json')
    .then(response => {
      if (!response.ok) {
        throw new Error("HTTP error" + response.status)
      }
      return response.json()
    })
    .then(json => {
      console.log(json)
      console.log(userInput)
      // json.filter(userInput)
      console.log(json.recipes[0].id)
    })
}
