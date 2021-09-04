import './App.css';
import {letters, shuffle, getResult} from './resources/helper';
import Card from './components/Card';
import { useState, useEffect } from 'react';
import useExitPrompt from './hooks/useExitPrompt';


function App() {
  // using hook to prevent use navigating away accidently
  useExitPrompt(false);
  
  const [updateCard, setUpdateCard] = useState({});  
  const [matches, setMatches] = useState(0);
  const [turns, setTurns] = useState(0);
  const [clicks, setClicks] = useState([])
  const [disabled, setDisabled] = useState('');
  const [cards] = useState(() => shuffle(letters.concat(letters)));


  const reset = () =>{
    setUpdateCard({})
    setMatches(0)
    setTurns(0);
  }
  
  const checkGameStatus = () =>{
    if(matches > 7){
        alert(`Game ended! Your score was ${turns}, window will reset automatically`)
        reset()
    }
  }

  const gameResults = (card2Id,card2Item) =>{
    const result = getResult([clicks[1],card2Item])
    if(result){
      // increase match and check game status
      setMatches( state => matches + 1 );
      setUpdateCard( (state) => {
        return {...updateCard, [card2Id]:'removed', [clicks[0]] : 'removed'}
      })
    }else{
      // close both the cards
      setUpdateCard( (state) => {
        return {...updateCard, [clicks[0]]:'closed', [card2Id]:'closed'}
      })
    }
    setClicks(state => []);
    setDisabled('')
  }

  const getClickHandler = (id,item) =>{
    // opening the card
    setUpdateCard( (state) => {
      return {...updateCard, [id]:'open'}
    })

    if(clicks.length === 0){
      // setting the first card in state for evaluation
      setClicks( state => [ [id], item ]);
    }else{
      // this will be the second card open, check results and game status
      // turn will increase on every second card open no matter what
      setDisabled('disabled')
      setTurns( state => turns + 1);
      
      setTimeout( () => {
        gameResults(id,item)
      }, 500);
      
    }
  }

  useEffect(checkGameStatus,[matches])

  return (
    <div className={`App ${disabled}`}>
      <div className="container">
        <div className="statusBar">
          <strong className="pull-left">Matches: {matches}</strong>
          <strong className="pull-right">Turns: {turns}</strong>
        </div>
        {
          cards.map( (item,index) =>{
            return <Card 
              key={`0${index}`} 
              id={`0${index}`} 
              item={item} 
              getClickHandler={getClickHandler}  
              cardStatus={updateCard}
            />
          })
        }
      </div>
      
    </div>
  );
}

export default App;
