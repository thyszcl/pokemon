const inputbox = document.getElementById('userinput')
const subButt = document.getElementById('submit')
const displayBox = document.getElementById('poksprite')
const WordBox = document.getElementById('WordBox')
subButt.addEventListener('click',goFetch)
const pokename = document.getElementById('pokename')
const poketype = document.getElementById('poketype')
const pokeheight = document.getElementById('pokeheight')
const pokeweight = document.getElementById('pokeweight')
const hpStat = document.getElementById('hpBox')
const atkStat = document.getElementById('atkBox')
const spdStat = document.getElementById('spdBox')
const defStat = document.getElementById('defBox')
const spatkStat = document.getElementById('spatkBox')
const spdefStat = document.getElementById('spdefBox')
const statsTitle = document.getElementById('statsTitle')
const statDisp = document.getElementById('statDisp')

function capitalize(s)
{
    return String(s[0]).toUpperCase() + String(s).slice(1);
}



// using promises returned by fetch() and .then operator
function goFetch2(){
    let userinput = inputbox.value.toLowerCase()
    fetch(`https://pokeapi.co/api/v2/pokemon/${userinput}`).then(
        response => {
            if (!response.ok){
                displayBox.style.display = 'none'
                WordBox.innerHTML = 'invalid pokemon'      //this line of code must be before throw Error line as throw error = return error, and after return no code will be carried out.
                throw new Error ('couldnt fetch')             //therefore all code must be before throw line.
            }
            return response.json()}) // 1st .then ends here 
            .then(data => {const pkspt = data.sprites.front_default
                console.log(data)
                WordBox.innerHTML = ''
                displayBox.src = pkspt
                displayBox.style.display = 'block'
            })}                                                                                             //What you get back is not the data itself, but a Response object that contains the data.Response object contains several info.
                                                                                                            //status & meta info-shows if fetch was successful or not---headers- provide meta-information about the response. It can tell you the type of content returned, when it was sent, how long to cache it, and more---
                                                                                                            //body-where your actual data lives, but body is a 'stream' you can’t access the data directly; you need to use specific methods to read it e.g:json(),text(),blob(),arrayBuffer()

//response.json takes the response stream, reads it to completion and returns a promise which resolves with the result of parsing he body text as JSON
//fetch is promise based therfore it can resolve or reject. if resolve, code in .then is carried out if reject, code in .catch is carried out 



// using async await
async function goFetch(){
    try{let userinput = inputbox.value.toLowerCase()
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${userinput}`)

        if (!response.ok){
            displayBox.style.display = 'none'
            WordBox.innerHTML = 'invalid pokemon'
            throw new Error('couldnt fetch')
            }

        const data = await response.json()
        

        pokename.innerHTML = `${capitalize(data.name)}`                // pokemon name

        statDisp.style.border = '1px solid black'
        statDisp.style.backgroundColor = 'burlywood'
        
        
        const types = data.types
        typearr = []                                                     //array of pokemon's types ---- might have more than 1 type
        data.types.forEach(obj => typearr.push(obj.type.name))
        if (typearr.length == 2){
            poketype.innerHTML = `Type: ${capitalize(typearr[0])}, ${capitalize(typearr[1])}` 
        }else { poketype.innerHTML = `Type: ${capitalize(typearr[0])}`}
        
        
        const heightdm = data.height                                        //height of pokemon in decimeters
        heightft = ((heightdm/10) * 3.281).toFixed(1)
        pokeheight.innerHTML = `Height: ${heightft} Ft`
        
        
        const weighthg = data.weight                                        //weight of pokemon in hectograms
        weightlbs = (weighthg/4.536).toFixed(1)
        pokeweight.innerHTML = `Weight: ${weightlbs} lbs`                                        
        
        const pkspt = data.sprites.front_default                           //sprite of pokemon
        displayBox.src = pkspt
        displayBox.style.display = 'block'                             
         
        statsTitle.innerHTML = 'Stats'
        statsarr = []
        data.stats.forEach(itm => statsarr.push(itm.base_stat))
        hpStat.innerHTML = `HP: ${statsarr[0]}`
        atkStat.innerHTML = `ATK: ${statsarr[1]}`
        spdStat.innerHTML = `SPD: ${statsarr[5]}`
        defStat.innerHTML = `DEF: ${statsarr[2]}`
        spdefStat.innerHTML = `SPDEF: ${statsarr[4]}`
        spatkStat.innerHTML = `SPATK: ${statsarr[3]}`
        
        
        WordBox.innerHTML = ''}                                                                       
    
    catch(error){
        displayBox.innerHTML = 'invalid'
        console.log(error)
    }
}