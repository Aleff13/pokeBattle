import React, { FC, ImgHTMLAttributes, RefObject } from 'react';
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
    onClick
}) => {
  return (
      <div className='Card'>
            
            { isOponent
                ?   <>
                    <div className='Card-name'>{name} | HP {hp}</div>
                    <img className='Card-img-damage' src={img} />
                    <span className='sprites'>
                    <img className='Card-front' src={frontImg} />
                    <img className='Card-back' src={backImg} />
                    </span>
                    <div className='Card-atr' onClick={onClick}>{firstAbility}</div>
                    <div className='Card-atr' onClick={onClick}>{secondAbility}</div></>
                :   <>
                    <div className='Card-name-enemy'>{name} | HP {hp}</div>
                    <img className='Card-img' src={img} />
                    <span className='sprites'>
                    <img className='Card-front' src={frontImg} />
                    <img className='Card-back' src={backImg} />
                    </span>
                    <div className='Card-atr-enemy' onClick={onClick}>{firstAbility}</div>
                    <div className='Card-atr-enemy' onClick={onClick}>{secondAbility}</div></>
            }
          
      </div>
  );
}

export default Pokemon;