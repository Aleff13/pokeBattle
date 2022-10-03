import { useEffect, useState } from 'react';
import '../../components/pokemon/pokemon.css';

import Pokemon, { PokemonProps } from '../pokemon/pokemon';
import axios from 'axios';
import React from 'react';

import Cookies from 'universal-cookie';

const defaultPokemon: PokemonProps = {
    hp: 100,
    maxHp: 200
}

const Body = () => {

    const getRandomInt = (min: number = 1, max: number = 100) => {
        let randomNum = Math.floor(Math.random() * max) + min;
        return randomNum;
    }

    const cookies = new Cookies();

    if (!cookies.get('lvl') || !cookies.get('pokemon') || !cookies.get('hp')){
        cookies.set('lvl', 1, { path: '/' });
        cookies.set('hp', getRandomInt(100, 150))
        cookies.set('pokemon', prompt("Qual pokemon você deseja utilizar? \n 1: bulbasaur \n 4: charmander \n 7: squirtle"))
    }

    const [poke, setPoke] = useState<PokemonProps>(defaultPokemon)
    const [oponent, setOponent] = useState<PokemonProps>(defaultPokemon)

    const [maxHp, setMaxHp] = useState<number>(Number(cookies.get('hp')))
    const [maxOponentHp, setMaxOponentHp] = useState<number>(getRandomInt(100, Number(cookies.get('hp'))))
    const [hp, setHp] = useState<number>(maxHp)
    const [oponentHp, setOponentHp] = useState<number>(maxOponentHp)

    const [damage, setDamage] = useState<number>(0)
    const [msg, setMsg] = useState<string>('Selecione um ataque para iniciar a batalha')

    const divRef = React.useRef<HTMLDivElement>(null);

    const setPokemons = (isOponent: boolean) => {
    
        axios.get(
            // `https://pokeapi.co/api/v2/pokemon/${Math.floor(Math.random() * 101)}`)
            `https://pokeapi.co/api/v2/pokemon/${!isOponent ? cookies.get('pokemon') : getRandomInt(2, 200)}`)
            .then(res => {
                let obj = {
                    'name': res.data.name,
                    'img': res.data.sprites.front_default,
                    'firstAbility' : res.data.abilities[0].ability.name,
                    'secondAbility' : res.data.abilities[1].ability.name,
                    'frontImg' : res.data.sprites.back_default,
                    'backImg' : res.data.sprites.front_default,
                    'hp' : 100,
                    'maxHp' : 200
                }
                if (isOponent) {
                    setOponent(obj)
                    return
                }
                setPoke(obj)
        })

    }

    useEffect(() => {
        setPokemons(true)
        setPokemons(false)
    }, [])

    const evolution = () => {
        if (cookies.get('lvl') >= 5){
            switch (cookies.get('pokemon')){
                case '4' || 'charmander':
                    cookies.set('hp', maxHp + getRandomInt(20, 30))
                    cookies.set('pokemon', 5)
                    break;
                case '1' || 'bulbasaur':
                    cookies.set('hp', maxHp + getRandomInt(20, 30))
                    cookies.set('pokemon', 2)
                    break;
                case '7' || 'squirtle':
                    cookies.set('hp', maxHp + getRandomInt(20, 30))
                    cookies.set('pokemon', 8)
                    break;
            }
        }
        if (cookies.get('lvl') >= 10){

            switch (cookies.get('pokemon')){
                case '5':
                    cookies.set('hp', maxHp + getRandomInt(20, 30))
                    cookies.set('pokemon', 6)
                    break;
                case '2':
                    cookies.set('hp', maxHp + getRandomInt(20, 30))
                    cookies.set('pokemon', 3)
                    break;
                case '8':
                    cookies.set('hp', maxHp + getRandomInt(20, 30))
                    cookies.set('pokemon', 9)
                    break;
            }
        }
    }

  return (
      <section className="App-body">
        <div className="Pokemon-container">
            <Pokemon 
            hp={hp}
            maxHp={maxHp}
            name={poke.name}
            img={poke.frontImg}
            firstAbility={poke.firstAbility}
            secondAbility={poke.secondAbility}
            isOponent={false}
            lvl={cookies.get('lvl')}
            onClick={ () => { 

                let newOponentHp = (oponentHp - getRandomInt(Number(cookies.get('lvl')), 30))

                let newHp = (hp - ( Math.floor(Math.random() * 30) + 1))

                let oponentDmg = oponentHp - newOponentHp;
                let dmg = hp - newHp;

                evolution()

                setDamage(dmg)

                setMsg(`
                Você causou ${oponentDmg} de dano ao seu inimigo \n
                você recebeu ${dmg} de dano.
                `)

                if (newOponentHp <= 0){ 
                    newOponentHp = 0;
                    let currentLvl: number = Number(cookies.get('lvl'));
                    cookies.set('hp', maxHp + getRandomInt(2, 5))
                    cookies.set('lvl', currentLvl + 1);
                    
                    window.location.reload()
                }

                if (newHp <= 0) {
                    newHp = 0;
                    setMsg(`Você perdeu`)
                    window.location.reload()
                }

                divRef.current?.classList.add('damage-active')

                setTimeout(() => {
                    divRef.current?.classList.remove('damage-active')
                }, 2000)

                setOponentHp(newOponentHp)

                setHp(newHp)

                return false
                }
            }
            />
        </div>
        <div className="dialog" ref={divRef}>{msg}</div>
        <div className="Rival-container">
        {/* <div ref={divRef} className='dmg'> {damage}</div> */}
            <Pokemon
            hp={oponentHp}
            maxHp={maxOponentHp}
            name={oponent.name}
            img={oponent.backImg}
            firstAbility={oponent.firstAbility}
            secondAbility={oponent.secondAbility}
            isOponent={true}
            />
        </div>
        <footer>
            <p className='footer'>Created by Aleff Menna Resler using <a href='https://pokeapi.co/about'>pokeAPI</a>. Pokémon and Pokémon character names are trademarks of Nintendo.</p>
        </footer>
      </section>

      
  );
}

export default Body;
