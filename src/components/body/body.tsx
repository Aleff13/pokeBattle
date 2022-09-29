import { useEffect, useState } from 'react';
import '../../App.css';
import Pokemon, { PokemonProps } from '../pokemon/pokemon';
import axios from 'axios';
import React from 'react';

const defaultPokemon: PokemonProps = {
    hp: 100
}

const Body = () => {

    const [poke, setPoke] = useState<PokemonProps>(defaultPokemon)
    const [oponent, setOponent] = useState<PokemonProps>(defaultPokemon)
    const [hp, setHp] = useState<number>(Math.floor(Math.random() * 150) + 100)
    const [oponentHp, setOponentHp] = useState<number>(Math.floor(Math.random() * 150) + 100)
    const [damage, setDamage] = useState<number>(0)
    const [msg, setMsg] = useState<string>('Selecione um ataque para iniciar a batalha')
    const divRef = React.useRef<HTMLDivElement>(null);

    const setPokemons = (isOponent: boolean) => {
    
        axios.get(
            `https://pokeapi.co/api/v2/pokemon/${Math.floor(Math.random() * 101)}`)
            .then(res => {
                let obj = {
                    'name': res.data.name,
                    'img': res.data.sprites.front_default,
                    'firstAbility' : res.data.abilities[0].ability.name,
                    'secondAbility' : res.data.abilities[1].ability.name,
                    'frontImg' : res.data.sprites.back_default,
                    'backImg' : res.data.sprites.front_default,
                    'hp' : 100
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

  return (
      <section className="App-body">
        <div className="Pokemon-container">
            <Pokemon 
            hp={hp}
            name={poke.name}
            img={poke.frontImg}
            firstAbility={poke.firstAbility}
            secondAbility={poke.secondAbility}
            isOponent={false}
            onClick={ () => { 

                let newOponentHp = (oponentHp -( Math.floor(Math.random() * 30) + 1))
                let newHp = (hp - ( Math.floor(Math.random() * 30) + 1))
                let damage = oponentHp - newOponentHp

                setDamage(damage)
                setMsg(`Seu ataque causou ${damage} de dano, e você recebeu ${hp - newHp} de dano`)
                if (newOponentHp < 0){ 
                    newOponentHp = 0;
                    window.location.reload()
                }
                if (newHp < 0) {
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
            name={oponent.name}
            img={oponent.backImg}
            firstAbility={oponent.firstAbility}
            secondAbility={oponent.secondAbility}
            isOponent={true}
            />
        </div>
      </section>
  );
}

export default Body;
