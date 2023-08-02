const phoneInput = document.getElementById('phone_input')
const phoneButton = document.getElementById('phone_button')
const phoneResult = document.getElementById('phone_result')

let regExp1 = /^\+996 \d{3} \d{2}-\d{2}-\d{2}$/


phoneButton.addEventListener('click', () =>{
    if(regExp.test(phoneInput.value)){
        phoneResult.innerHTML = 'CORRECT'
        phoneResult.style.color = 'green'
    } else {
        phoneResult.innerHTML = 'UNCORRECT'
        phoneResult.style.color = 'red'
    }
})

const tabContent = document.querySelectorAll('.tab_content_block');
const tabsParent = document.querySelector('.tab_content_items');
const tabs = document.querySelectorAll('.tab_content_item');

let count = 0;

const hideTabContent = () => {
    tabContent.forEach((element) => {
      element.style.display = 'none'  
    })
    tabs.forEach((element) => {
        element.classList.remove('tab_content_item_active')
    })
}

const showTabContent = (index = 0) => {
     tabContent[index].style.display = 'block'
     tabs[index].classList.add('tab_content_item_active')
}

tabsParent.onclick = (event) => {
    const targetElement = event.target
    if (targetElement.classList.contains('tab_content_item')){
        tabs.forEach((tab, tabIndex) => {
            if(targetElement === tab){
                hideTabContent()
                count = tabIndex
                showTabContent(count)
            }
        }
    )}
}

const goSlide = () => {
    count++
    if(count >= tabs.length) {
        count = 0
    }
    hideTabContent(count)
    showTabContent(count)
}
setInterval(goSlide, 3000)

hideTabContent()
showTabContent()

const som = document.querySelector('#som')
const usd = document.querySelector('#usd')
const eur = document.querySelector('#eur')
const cny = document.querySelector('#cny')

const convertCloud = "../data/convert.json"

const convert = async (element, target, target2, target3) => {
    element.oninput = async () => {
        try {
            const response = await fetch(convertCloud)
            const data = await response.json()

            if (element === som) {
                usd.value = (element.value / data.usd).toFixed(2)
                eur.value = (element.value / data.eur).toFixed(2)
                cny.value = (element.value / data.cny).toFixed(2)
            } else if (element === usd) {
                som.value = (element.value * data.usd).toFixed(2)
                eur.value = (element.value * (data.eur / data.usd)).toFixed(2)
                cny.value = (element.value * (data.usd / data.cny)).toFixed(2)
            } else if (element === eur) {
                som.value = (element.value * data.eur).toFixed(2)
                usd.value = (element.value * (data.usd / data.eur)).toFixed(2)
                cny.value = (element.value * (data.eur / data.cny)).toFixed(2)
            } else if (element === cny) {
                som.value = (element.value * data.cny).toFixed(2)
                eur.value = (element.value / (data.eur / data.cny)).toFixed(2)
                usd.value = (element.value / (data.usd / data.cny)).toFixed(2)
            }

            element.value === '' && (target.value = '')
            element.value === '' && (target2.value = '')
            element.value === '' && (target3.value = '')
        } catch (error) {
            console.error(error);
        }
    }
}

convert(som, usd, eur, cny);
convert(usd, som, eur, cny);
convert(eur, som, usd, cny);
convert(cny, som, usd, eur);



// som.addEventListener('input',() => {
//     const request = new XMLHttpRequest()
//     request.open("GET","../data/convert.json")
//     request.setRequestHeader("Content-type", "application/json")
//     request.send()
//     request.addEventListener('load',() => {
//         const data = JSON.parse(request.response)
//         usd.value = (som.value / data.usd).toFixed(2)
//     })
// })

const card = document.querySelector('.card')
const btnPrev = document.querySelector('#btn-prev')
const btnNext = document.querySelector('#btn-next')
let counter = 1



async function request() {
    try{
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${counter}`)
    const data = await response.json()
        card.innerHTML = `
        <p>${data.title}</p>
        <p  style="color: ${data.completed ? 'green' : 'red'}">${data.completed}</p>
        <span>${data.id}</span>`
    }catch(e){
        console.error("ERROR");
    }
}

request()

btnPrev.onclick = () => {
    counter--
    if (counter <= 0){
        counter = 200
    }
    request()
}

btnNext.onclick = () => {
    counter++
    if(counter >= 201){
        counter = 1
    }
    request()
}

async function qr() {
    try{
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts`)
        const data = await response.json()
        // console.log(data);
    }catch(e) {
        console.log(e, 'ERROR');
    }
    }
qr()


// WEATHER API

const cityNameInput = document.querySelector('.cityName')
// const btnSearch = document.querySelector('#btn-search')
const city = document.querySelector('.city')
const temp  = document.querySelector('.temp')
const BASE_URL = 'http://api.openweathermap.org/data/2.5/weather'
const apiKey = 'e417df62e04d3b1b111abeab19cea714'


const citySearch = () => {
    cityNameInput.oninput = async (event) => {
        try{
        const response = await fetch(`${BASE_URL}?q=${event.target.value}&appid=${apiKey}`)
        const data = await response.json()
            city.innerHTML = data?.name || 'Город не найден'
            temp.innerHTML =data?.main?.temp ? Math.round(data?.main?.temp -273) + '&degC' : '...'
    }catch(e) {
        console.log(e, 'error');
    }
    }
}
citySearch()
