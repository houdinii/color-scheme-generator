// region Switches

// Simple css to style it like a toggle switch
// Tutorial:
// https://dev.to/ananyaneogi/create-a-dark-light-mode-switch-with-css-variables-34l8

const modeToggleSwitch = document.querySelector('#mode-checkbox');

const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

if (currentTheme) {
  document.documentElement.setAttribute('data-theme', currentTheme);

  if (currentTheme === 'dark') {
    modeToggleSwitch.checked = true;
  }
}

modeToggleSwitch.addEventListener('change', switchTheme, false);

function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark'); //add this
  }
  else {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light'); //add this
  }
}
// endregion


const colorPicker = document.getElementById("user-color")
colorPicker.value = "#123456"
const schemePicker = document.getElementById("scheme-name")
const form = document.getElementById("color-input")

const baseUrl = "https://www.thecolorapi.com"
const schemeEndpoint = "/scheme"

handleFormSubmit()

function renderColors(colors){
  let colorHtml = ``
  for(const color of colors){
    colorHtml += `
      <div class="color-section">
        <div class="color-block" style="background-color:${color.hex.value}" data-color-value="${color.hex.value}"></div>
        <p class="hex-text" data-color-value="${color.hex.value}">${color.hex.value}</p>
        <p class="name-text" data-color-value="${color.hex.value}">${color.name.value}</p>
      </div>`
  }
  document.getElementById("colors").innerHTML = colorHtml;
}

document.getElementById("colors").addEventListener("click", (e)=>{
  const isColorBlock = e.target.classList.contains("color-block")
      || e.target.classList.contains("hex-text")
      || e.target.classList.contains("name-text")
  if(isColorBlock){
    const colorValue = e.target.dataset.colorValue
    navigator.clipboard.writeText(colorValue)
        .then(() => console.log(`${colorValue} copied to clipboard`))
        .catch(err => console.log(`Unable to copy ${colorValue} to clipboard: ${err}`))
  }
})

form.addEventListener("submit", (e)=>{
  e.preventDefault()
  handleFormSubmit()
})

function handleFormSubmit(){
  const data = new FormData(form)
  const color = data.get("user-color").substring(1)
  const scheme = data.get("scheme-name")
  const queryString = `?hex=${color}&mode=${scheme}`
  console.log(baseUrl+schemeEndpoint+queryString)

  fetch(baseUrl + schemeEndpoint + queryString, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
      .then(res=>res.json())
      .then(data=>renderColors(data.colors))
}