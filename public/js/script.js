const buttons = document.querySelectorAll("button");
const baseURL = `${location.origin}?limit=100`;
let filters = {};

updateLocationWithoutRefresh(baseURL);

buttons.forEach(button => {
  button.addEventListener("click", applyFilterAndUpdateDOM)
});

function applyFilterAndUpdateDOM() {
  const buttonElem = this;

  if (buttonElem.classList.contains("applied")) {
    removeStyleFromGroupOf(buttonElem.dataset.filter);
    // update 'filters' obj
    delete filters[buttonElem.dataset.filter];

  } else {
    removeStyleFromGroupOf(buttonElem.dataset.filter);
    // update 'filters' obj
    filters[buttonElem.dataset.filter] = buttonElem.innerText;
    // Apply visual styles
    buttonElem.classList.add("applied");
  }

  // Get the api endpoint 'url' and the filters applied 'endpoints'
  const { url, endpoints } = getURLToFetchFrom();

  // Change url in the location bar
  updateLocationWithoutRefresh(endpoints);

  // Fetch the data and then use it to change the dom
  getData(url).then(updateDOM).catch(err => { console.error(err) })
}

function removeStyleFromGroupOf(dataFilterAttr) {
  const elements = document.querySelectorAll(`button[data-filter=${dataFilterAttr}]`);
  elements.forEach(elem => elem.classList.remove("applied"))
}

function getURLToFetchFrom() {
  let url = "https://api.spacexdata.com/v3/launches",
    endpoints = "?limit=100";
  for (let filter in filters) {
    endpoints += `&${filter}=${filters[filter]}`
  }
  return { url: url + endpoints, endpoints: endpoints }
}

async function getData(url) {
  const response = await fetch(url),
    data = await response.json();
  return data
}

function updateDOM(dataset) {
  console.log(dataset.length);
  const parent = document.getElementById("programs");
  // Clear the existing programs
  parent.innerHTML = "";
  // Create HTML and put it in DOM
  dataset.forEach(data => {
    const element = createCardComponent(data);
    parent.append(element);
  })
}

function updateLocationWithoutRefresh(url) {
  history.pushState(filters, "", url);
}

function createCardComponent(data) {
  const parent = document.createElement("section");
  parent.className = "program";

  let childElem = createImageComponent(data);
  parent.append(childElem);

  childElem = createContentComponent(data);
  parent.append(childElem);

  return parent
}

function createImageComponent(data) {
  const img = document.createElement("img");
  img.src = data.links.mission_patch_small;
  img.alt = `${data.mission_name} #${data.flight_number}`;
  return img
}

function createContentComponent(data) {
  const props = {
    "Mission Ids:": data.mission_id,
    "Launch Year:": data.launch_year,
    "Successful Launch:": data.launch_success,
    "Successful Landing:": data.launch_landing
  };

  const parentElem = document.createElement("div");
  parentElem.className = "content";

  let childElem = createHeaderComponent(data);
  parentElem.append(childElem);

  for (let prop in props) {
    childElem = createPropertyComponent(prop, props[prop]);
    parentElem.append(childElem);
  }

  return parentElem
}

function createHeaderComponent(data) {
  const h3 = document.createElement("h3");
  h3.innerText = `${data.mission_name} #${data.flight_number}`;
  return h3
}

function createPropertyComponent(property, value) {
  const parentElem = document.createElement("div");

  if (property == "Mission Ids:") {

    let childElem = document.createElement("div");
    childElem.innerText = property;
    childElem.className = "bold";
    parentElem.append(childElem);


    if (value.length != 0) {
      childElem = document.createElement("ul");

      value.forEach(id => {
        const li = document.createElement("li");
        li.innerText = id;
        childElem.append(li);
      })

      parentElem.append(childElem);

    } else {
      parentElem.innerHTML += "not provided"
    }


  } else {

    let childElem = document.createElement("span");
    childElem.innerText = property + " ";
    childElem.className = "bold"
    parentElem.append(childElem);

    childElem = document.createElement("span");
    childElem.innerText = value != undefined ? value : "not provided";
    parentElem.append(childElem);
  }

  return parentElem
}