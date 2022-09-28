import axios from 'axios';

const getPokemonByName = (id: string) => {
    
    let name = ''

    axios.get(
        `https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(res => {
            console.log(res.data.name)
            name = res.data.name})
    
    return name;
    
}

export default getPokemonByName