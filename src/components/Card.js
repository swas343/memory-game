import { useState } from "react";
const Card = (props) =>{
    const [flipCard, setFlipCard] = useState('');
    const roateY = (flipCard === 'openFlip') ? 'roateY' : '';

    const cardStatus = props.cardStatus[props.id] || 'closed'
    const overlay = (cardStatus) === 'open' ? 'hidden': '';
    const hidden = (cardStatus === 'removed') ? 'hidden' : '';
    
    const clickHandler = () =>{
        setFlipCard('openFlip')
        
        setTimeout( () => {
            props.getClickHandler(props.id,props.item);
            setFlipCard('')
        },500)
    }

    return (
        <div key={props.id} className={`node ${cardStatus} ${flipCard} ${hidden}`} onClick={clickHandler}>
            <div className={`overlay ${overlay}`}></div>
            <span className={roateY}> {props.item} </span>
        </div>
    )
}

export default Card;