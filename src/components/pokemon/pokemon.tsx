import { FC, } from 'react';
// import '../../Animation.css';
import '../pokemon/pokemon.css';

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
    lvl?: number;
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
    lvl,
    onClick
}) => {
  return (
      <div className='Card-grass'>
            
            { isOponent
                ?   <>
                    <div className='Card-name'>
                    {name?.toUpperCase()}
                        <div className='Card-lv'> Lv ??</div>
                    </div>
                    
                    <span className='Img-box'>
                    <img className='Card-img' alt='' src={img} />
                    </span>
                    <span className='Hp-box'>
                        <b>{hp}/{maxHp}</b>
                    <progress className='hp' value={hp} max={maxHp}></progress>
                    </span>
                    <div className='Card-atr' onClick={onClick}>{firstAbility?.toUpperCase()}</div>
                    <div className='Card-atr' onClick={onClick}>{secondAbility?.toUpperCase()}</div>
                  </>
                : 
                      <>
                    <div className='Card-name-enemy'>
                    {name?.toUpperCase()}
                        <div className='Card-lv-enemy'> Lv {lvl}</div>
                    </div>
                    
                    <span className='Img-box-enemy'>
                    <img className='Card-img' alt='' src={img} />
                    </span>
                    <span className='Hp-box'>
                        <b>{hp}/{maxHp}</b>
                    <progress className='hp' value={hp} max={maxHp}></progress>
                    </span>
                    <div className='Card-atr-enemy' onClick={onClick}>{firstAbility?.toUpperCase()}</div>
                    <div className='Card-atr-enemy' onClick={onClick}>{secondAbility?.toUpperCase()}</div>
                  </>
            }
          
      </div>
  );
}

export default Pokemon;
