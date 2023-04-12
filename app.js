const poke_container = document.getElementById('poke_container');
const pokemons_number = 150;

// an objext for colors for types
const colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
    electric: '#FCF7DE',
    water: '#DEF3FD',
    ground: '#f4e7da',
    rock: '#d5d5d4',
    fairy: '#fceaff',
    poison: 'rgba(148, 85, 170, 0.69)',
    bug: '#f8d5a3',
    dragon: '#97b3e6',
    psychic: 'rgba(232, 113, 161, 0.58)',
    flying: 'rgba(136, 153, 255, 0.58)',
    fighting: 'rgba(187, 85, 68, 0.58)',
    normal: '#F5F5F5'
};

const main_types = Object.keys(colors);
// console.log(main_types); mostra fire, grass, electric ecc..



// loop for 150 pokemons
const fetchPokemons = async () => {
    for (let i = 1; i <= pokemons_number; i++) {
        await getPokemon(i);
    }
}

// to get Pokemons
const getPokemon = async id => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`; // id 1 = bulbasaur, id 2 ecc.. 
    const res = await fetch(url);
    const pokemon = await res.json(); // object json with all information of a pokemon
    // console.log(pokemon); // if I call getPokemon(1) I see Bulbasaur
    createPokemonCard(pokemon);
}

fetchPokemons();

function createPokemonCard(pokemon) {
    const pokemonEl = document.createElement('div');
    pokemonEl.classList.add('pokemon');
    pokemonEl.onclick = function () { createPokemonBox(pokemon); }


    // dell' elemento types(chiamato el) => prendi type name, quindi el.type.name
    const poke_types = pokemon.types.map(el => el.type.name);


    // dell' elemento main_type(colori).find => nell'array poke_types l'indice - 1(inizia da 1, vogliamo anche lo zero)
    const type = main_types.find(type => poke_types.indexOf(type) > -1)

    /* first letter uppercase, slice stampa dalla seconda lettera in poi
    bulbasaur --> Bbulbasaur --> slice(1) Bulbasaur*/
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);

    // var color contine array di oggetti di colori con index della variabile type
    const color = colors[type];

    pokemonEl.style.backgroundColor = color;

    /* we want id like 001 002 003.. 010 011 012.. for do this we write 
    #${pokemon.id.toString().padStart(3, '0')} --> 3 spazi e iniziano con 0*/
    const pokeInnerHTML = `
        <div class="img-container">
            <img src="${pokemon.sprites.front_default}">
        </div>
        <div class="info">
            <span class="number">#${pokemon.id.toString().padStart(3, '0')}</span>
            <h3 class="name">${name}</h3>
            <small class="type">Type: <span>${type}</span></small>
            
        </div>
    `;

    pokemonEl.innerHTML = pokeInnerHTML;
    poke_container.appendChild(pokemonEl);


}


// click box animated img
function createPokemonBox(pokemon) {
    let overlay = document.getElementById('overlay');
    let overlay_box = document.getElementById('overlay_box');
    overlay_box.classList.remove("hidden");
    const animated_front = pokemon['sprites']['versions']['generation-v']['black-white']['animated'].front_default;
    const animated_back = pokemon['sprites']['versions']['generation-v']['black-white']['animated'].back_default;


    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);

    const pokeInnerBox = `
    <h3 class="name">${name}</h3>
    <div class="animated-img-container">
        <img class="animated-front" src="${animated_front}">
    </div>
    <div class="info-box">
        <img class="animated-back" src="${animated_back}">
        <div class="box-container">
            <small class="type dimension">Height: <span>${pokemon.height}</span></small>
            <small class="type">Weight: <span>${pokemon.weight}</span></small>
        </div>
    </div>
    `;


    overlay_box.innerHTML = pokeInnerBox;
    overlay.appendChild(overlay_box);

    myBlurFunction = function (state) {
        /* state can be 1 or 0 */
        let blurContainer = document.getElementById('blur');


        if (state) {
            overlay.style.display = 'flex';
            blurContainer.setAttribute('class', 'blur');
            //containerContainer.setAttribute('class', 'blur');
        } else {
            overlay.style.display = 'none';
            blurContainer.setAttribute('class', null);
            //clickBox.remove();
            overlay_box.add().classList('hidden');
            overlay_box.remove();
            //containerContainer.setAttribute('class', null);
        }
    };

}


