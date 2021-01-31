async function main() {
    var lowerBound = 1;
    var upperBound = 5;
    var numArray = [];
    var duplicatesFlag = false;

    // Generate 4 random numbers for the pokemon.
    var randomnum = generateDexNum(lowerBound, upperBound);
    numArray.push(randomnum);
    console.log("num 1 = " + randomnum);

    var randomnum2 = generateDexNum(lowerBound, upperBound);
    if (numArray.includes(randomnum2)) {
        console.log("num 1 = " + randomnum + ", num2 = " + randomnum2);
        console.log("running loop to fix randomnum2...");
        while (numArray.includes(randomnum2)) {
            randomnum2 = generateDexNum(lowerBound, upperBound);
        }
    }
    numArray.push(randomnum2);
    console.log("num 2 = " + randomnum2);

    var randomnum3 = generateDexNum(lowerBound, upperBound);
    if (numArray.includes(randomnum3)) {
        console.log("num3 = " + randomnum3);
        console.log("running loop to fix randomnum3...");
        while (numArray.includes(randomnum3)) {
            randomnum3 = generateDexNum(lowerBound, upperBound);
        }
    }
    numArray.push(randomnum3)
    console.log("num 3 = " + randomnum3)

    var randomnum4 = generateDexNum(lowerBound, upperBound);
    if (numArray.includes(randomnum4)) {
        console.log("num4 = " + randomnum4);
        console.log("running loop to fix randomnum4...");
        while (numArray.includes(randomnum4)) {
            randomnum4 = generateDexNum(lowerBound, upperBound);
        }
    }
    numArray.push(randomnum4);
    console.log("num 4 = " + randomnum4)

    numArray.forEach(element => console.log("dex number: ", + element));

    //TODO - MAKE SURE 4 NUMBERS DO NOT REPEAT!
    var pokemonArray = [];

    // Get pokemon object data from PokeApi. for name, evolution chain.
    let p1 = await generatePokemon(randomnum);
    let p2 = await generatePokemon(randomnum2);
    let p3 = await generatePokemon(randomnum3);
    let p4 = await generatePokemon(randomnum4);
    pokemonArray.push(p1);
    pokemonArray.push(p2);
    pokemonArray.push(p3);
    pokemonArray.push(p4);

    pokemonArray.forEach(element => console.log(element.name + ", " + element.evolution_chain));
    

    // make sure nidoran-m goes to nidoran_m to get sprites correctly.
    // p1.name = p1.name.replace(/-/,'_');
    document.getElementById("sprite").src = "https://projectpokemon.org/images/normal-sprite/" + p1.name + ".gif";
    // p2.name = p2.name.replace(/-/,'_');
    // p3.name = p3.name.replace(/-/,'_');
    // p4.name = p4.name.replace(/-/,'_');
    
    // hide the sprite images for now, let fadeSprite() show them later.
    $("#sprite").hide();

    // Update the HTML to reflect the final pokemon's name/type.
    const name = p4.name;
    const formalName = name.charAt(0).toUpperCase() + name.slice(1);
    // const type1 = p4.types[0].type.name;
    // const formalType1 = type1.charAt(0).toUpperCase() + type1.slice(1);
    document.getElementById("pname").innerHTML = "You got a " + formalName + "!";
    // document.getElementById("type1").innerHTML = "Type 1: " + formalType1;
    // try {
    //     const type2 = pokemon4.types[1].type.name;
    //     const formalType2 = type2.charAt(0).toUpperCase() + type2.slice(1);
    //     document.getElementById("type2").innerHTML = "Type 2: " + formalType2;
    // }
    // catch (error) {
    //     // re-hide type2.
    // }

    // Hide the changed elements, show them at the appropriate time later.
    $("#pname").hide();
    // $("#type1").hide();
    // $("#type2").hide();
    
    // Fade sprites in order, so it looks like they are coming from each other.
    fadeSprite();
    setTimeout(function() {document.getElementById("sprite").src = "https://projectpokemon.org/images/normal-sprite/" + p2.name + ".gif";}, 4000);
    setTimeout(fadeSprite, 4000);
    setTimeout(function() {document.getElementById("sprite").src = "https://projectpokemon.org/images/normal-sprite/" + p3.name + ".gif";}, 8000);
    setTimeout(fadeSprite, 8000);
    setTimeout(function() {document.getElementById("sprite").src = "https://projectpokemon.org/images/normal-sprite/" + p4.name + ".gif";}, 12000);
    setTimeout(fadeFinalSprite, 12000);
    setTimeout(updateHTML, 14000);
}

async function getPokemonData(num) {
    // Fetch pokemon data from api using pokedex number (num)
    var url = "https://pokeapi.co/api/v2/pokemon/" + num.toString();
    let response = await fetch(url);
    return await response.json();
}

async function getPokemonSpecies(num) {
    // Fetch pokemon's species data to get the pokemon's evolution chain.
    var url = "https://pokeapi.co/api/v2/pokemon-species/" + num.toString();
    let response = await fetch(url);
    return await response.json();
}

async function generatePokemon(num) {
    // Let's fetch the pokemon's data from the dex number given.
    const pokemon = await getPokemonData(num);
    // Let's fetch the pokemon's evolution chain (to make sure we don't have 2 mons from the same chain)
    const pokemonSpecies = await getPokemonSpecies(num);
    // Create the pokemon object to return.
    var name = pokemon.name.toString();
    var evolution_chain = pokemonSpecies.evolution_chain.url;
    evolution_chain = parseInt(evolution_chain.slice(42, -1));
    var p = new Pokemon(name, evolution_chain);
    return p;
}

function fadeSprite() {
    // Fade sprite 1 in and out.
    $("#sprite").fadeIn(2000);
    $("#sprite").fadeOut(2000);
}

function fadeFinalSprite() {
    $("#sprite").fadeIn(2000);
    //$("#sprite").fadeOut(2000);
}

function updateHTML() {
    // Update the HTML by showing the name/types of the final pokemon.
    $("#pname").show();
}

// Simple Class to store all relevant pokemon statistics for each mon.
class Pokemon {
    constructor(name, evolution_chain) {
        this.name = name;
        this.evolution_chain = evolution_chain;
    }

}

function generateDexNum(lower, upper) {
    lower = Math.ceil(lower);
    upper = Math.floor(upper);
    return Math.floor(Math.random() * (upper - lower + 1)) + lower;
}