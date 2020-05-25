const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

// initialize an array where to put all of the ppl, array of objects
let data = []; 

// Fetch random user and add money
// function getRandomUser() { 
//   fetch('https://randomuser.me/api')
//     .then(res => res.json())
//     .then(data)
// }

getRandomUser();
getRandomUser();
getRandomUser();

async function getRandomUser() { 
  const res = await fetch('https://randomuser.me/api'); 
  const data = await res.json(); 

  const user = data.results[0]; 
  const newUser = { 
    name: `${user.name.first} ${user.name.last}`, 
    money: Math.floor(Math.random() * 1000000)
  };

  addData(newUser);
}

// Add new obj to data array
function addData(obj) { 
  data.push(obj);
  //display users
  updateDOM();
}

// Update DOM 
function updateDOM(providedData = data) { 
  // Clear main div 
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>'; 
  providedData.forEach(item => { 
    const element = document.createElement('div'); 
    element.classList.add('person'); 
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`; 
    main.appendChild(element);
  }); 
}

// Format money as number 
function formatMoney(number) { 
  return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
} 

// Sort users by richest 
function sortByRichest() { 
  data.sort((a,b) => b.money - a.money); 
  updateDOM();
}

// Filter only Millionaires 
function showMillionaires() { 
  data = data.filter(user => user.money > 1000000);
  updateDOM();
}

// Double money
function doubleMoney () { 
  data = data.map( (user) => { 
    return { ...user, money: user.money * 2 }
  }); 
  updateDOM();
}

//  Event listeners 
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney); 
sortBtn.addEventListener('click', sortByRichest); 
showMillionairesBtn.addEventListener('click', showMillionaires); 
