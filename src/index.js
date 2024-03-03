function citySearchFunction(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#input-search-text");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = searchInput.value;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", citySearchFunction);
