'use strict'

function criarCard(pokemonData){
    const galeria = document.getElementById('galeria')
    
    const card = document.createElement('div')
    card.className = 'pokemon-card'
    
    const nome = document.createElement('h2')
    nome.textContent = pokemonData.name
    
    const imagem = document.createElement('img')
    imagem.src = pokemonData.sprites.other["official-artwork"].front_default || 
                 pokemonData.sprites.front_default
    imagem.alt = pokemonData.name
    imagem.loading = 'lazy'
    
    const infoContainer = document.createElement('div')
    infoContainer.className = 'pokemon-info'
    
    const id = document.createElement('p')
    id.innerHTML = `<strong>ID:</strong> #${pokemonData.id.toString().padStart(3, '0')}`
    
    const tipos = document.createElement('p')
    const tiposLista = pokemonData.types.map(t => t.type.name).join(', ')
    tipos.innerHTML = `<strong>Tipo(s):</strong> ${tiposLista}`
    
    const altura = document.createElement('p')
    altura.innerHTML = `<strong>Altura média:</strong> ${(pokemonData.height / 10).toFixed(1)} m`
    
    const peso = document.createElement('p')
    peso.innerHTML = `<strong>Peso médio:</strong> ${(pokemonData.weight / 10).toFixed(1)} kg`
    
    const habilidades = document.createElement('p')
    const habilidadesLista = pokemonData.abilities.map(a => a.ability.name).join(', ')
    habilidades.innerHTML = `<strong>Habilidade(s):</strong> ${habilidadesLista}`
    
    infoContainer.appendChild(id)
    infoContainer.appendChild(tipos)
    infoContainer.appendChild(altura)
    infoContainer.appendChild(peso)
    infoContainer.appendChild(habilidades)
    
    card.appendChild(nome)
    card.appendChild(imagem)
    card.appendChild(infoContainer)
    
    galeria.appendChild(card)
}

async function carregarPokemon(){
    const pokemon = document.getElementById('pokemon').value.trim().toLowerCase()
    
    if (!pokemon){
        alert('Por favor, digite o nome de um Pokémon!')
        return
    }
    
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    
    try{
        const galeria = document.getElementById('galeria')
        galeria.innerHTML = '<div class="loading">Carregando...</div>'
        
        const response = await fetch(url)
        
        if (!response.ok) {
            throw new Error('Pokémon não encontrado!')
        }
        
        const data = await response.json()
        
        galeria.replaceChildren()
        
        criarCard(data)
        
    }catch (erro){
        console.error('Erro:', erro.message)
        const galeria = document.getElementById('galeria')
        galeria.innerHTML = `<div class="erro"> ${erro.message}</div>`
    }
}

document.getElementById('pesquisar').addEventListener('click', carregarPokemon)