import { FC, } from 'react';
import '../../App.css';
import '../../Animation.css';

export interface PokemonProps {
    name?: string;
    firstAbility?: string;
    secondAbility?: string;
    img?: string;
    firstType?: string;
    secondType?: string;
    frontImg?: string;
    backImg?: string;
    isOponent?: boolean;
    hp: number;
    maxHp?: number;
    onClick?: () => boolean;
}

const Pokemon: FC<PokemonProps> = ({
    name,
    firstAbility,
    secondAbility,
    img,
    firstType,
    secondType,
    frontImg,
    backImg,
    isOponent,
    hp,
    maxHp,
    onClick
}) => {
  return (
      <div className='Card'>
            
            { isOponent
                ?   <>
                    <div className='Card-name'>{name} <br/>  hp {hp}</div>
                    <progress className='hp' value={hp} max={maxHp}></progress>
                    <img className='Card-img-damage' alt='' src={img} />
                    <div className='Card-atr' onClick={onClick}>{firstAbility}</div>
                    <div className='Card-atr' onClick={onClick}>{secondAbility}</div></>
                :   <>
                    <div className='Card-name-enemy'>{name} <br/>  hp {hp}</div>
                    <progress className='hp' value={hp} max={maxHp}> </progress>
                    <img className='Card-img' alt='' src={img} />
                    <div className='Card-atr-enemy' onClick={onClick}>{firstAbility}</div>
                    <div className='Card-atr-enemy' onClick={onClick}>{secondAbility}</div></>
            }
          
      </div>
  );
}

export default Pokemon;
