import SpellbookService from "./spellbook-service.js"

let ss = new SpellbookService
const app = document.getElementById("app")

//draws all spells (without detail) to the page
function draw(spells) {
  let template = ""
  spells.forEach(spell => {
    template += `
    <div class="spell">
      <h4>${spell.name}</h4>
      <button onclick="app.controllers.spellbook.viewSpell('${spell.url}')">View spell</button>
      <div id="${spell.name.split(' ').join('-')}"></div>
    </div>
   `
  });
  app.innerHTML = template
}

//Draws spells from spellbook
function drawMySpells() {
  let template = ''
  Object.values(ss.mySpellbook).forEach(spell => {
    template += `
     <div class="spell-details">
     <h4> ${spell.name} </h4>
    <p><strong>Description: </strong>${spell.desc}</p>
  <button onclick="app.controllers.spellbook.forgetSpell('${spell.url}')">Forget Spell</button>
  </div>
    `
  })
  document.getElementById("my-spellbook").innerHTML = template
}

//Draws individual spell details
function drawSpell(spell) {
  let template = `
  <div class="spell-details">
    <p><strong>Description: </strong>${spell.desc}</p>
  <button onclick="app.controllers.spellbook.learnSpell('${spell.url}')">Learn Spell</button>
  </div>
  `
  document.getElementById(spell.name.split(' ').join('-')).innerHTML = template
}


export default class SpellbookController {
  constructor() {
    //gets all spells at start of app
    ss.getSpells(draw)
  }
  //get spell details then draw them
  viewSpell(url) {
    ss.getSpell(url, drawSpell)
  }
  //adds spell to spellbook
  learnSpell(url) {
    ss.learnSpell(url)
    drawMySpells()
  }
  //remove spell from spellbook
  forgetSpell(url) {
    ss.forgetSpell(url)
    drawMySpells()
  }
}