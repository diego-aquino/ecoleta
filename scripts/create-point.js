function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]");

    const url = "https://servicodados.ibge.gov.br/api/v1/localidades/estados";

    fetch(url)
        .then( res => res.json() )
        .then( states => {
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

    fetch(url)
        .then( res => res.json() )
        .then( cities => {
            citySelect.innerHTML = "";

            for (const city of cities) {
                citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`;
            }

            citySelect.disabled = false;
        } );
}

populateUFs();

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities);
