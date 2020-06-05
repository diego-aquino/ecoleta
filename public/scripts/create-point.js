function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]");

    const url = "https://servicodados.ibge.gov.br/api/v1/localidades/estados";

    fetch(url)
        .then( res => res.json() )
        .then( states => {
            states.sort(byName);

            for (const state of states) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
            }
        } );
}

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]");
    const stateInput = document.querySelector("input[name=state]");

    const ufValue = event.target.value; // event.target: o que disparou o evento
    //                                     (select[name=uf])

    const indexOfSelectedState = event.target.selectedIndex;
    stateInput.value = event.target.options[indexOfSelectedState].text;

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

    citySelect.innerHTML = "<option value>Selecione a cidade</option>";
    citySelect.disabled = true;

    fetch(url)
        .then( res => res.json() )
        .then( cities => {
            for (const city of cities) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;
            }

            citySelect.disabled = false;
        } );
}

function byName(a, b) {
    const aName = a.nome.toLowerCase();
    const bName = b.nome.toLowerCase();

    return (aName > bName) ? (1) : (-1);
}

populateUFs();

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities);



const itemsToCollect = document.querySelectorAll(".items-grid li");

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem);
}

const collectedItems = document.querySelector("input[name=items]");
const items = [
    "Lâmpadas", "Pilhas e Baterias", "Papéis e Papelão",
    "Resíduos Eletrônicos", "Resíduos Orgânicos", "Óleo de Cozinha"
];

let selectedItems = [];

function handleSelectedItem(event) {
    const itemLi = event.target;

    itemLi.classList.toggle("selected");
    // se houver uma classe "selected", remova-a
    // se não, crie-a

    const itemId = itemLi.dataset.id;

    const alreadySelected = selectedItems.findIndex( item => {
        return item == itemId;
    } );

    if (alreadySelected >= 0) {
        const filteredItems = selectedItems.filter( item => item != itemId );
        selectedItems = filteredItems;
    } else {
        selectedItems.push(itemId);
    }

    let selectedItemsByName = selectedItems.map( currItemId => items[currItemId - 1] );
    collectedItems.value = selectedItemsByName;
}
