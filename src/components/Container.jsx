import React from "react"
import { nanoid } from 'nanoid'
import TileGroup from './TileGroup'
import Confetti from "react-confetti"


function intializer(){
    let randomValueArray = Array.from(
        {length:10},() => Math.floor( Math.random() * ( 7 -1)+1) 
        )
    
    return randomValueArray.map( (value) => ({
        id:nanoid(10),
        isSet:false,
        value:value
    }))
    
}

export default function Container (){

    const [ dice_array , setDice_array ] = React.useState(() => intializer() )
    const [ target, setTarget ] = React.useState(-1)
    const [ moves, setMoves ] = React.useState(0)
    const [ tenzies , setTenzies] = React.useState( false )
    const [ highScore , setHighScore ] = React.useState( () => JSON.parse( localStorage.getItem('highScore')) || 0 )

    React.useEffect( () => {
        //console.log('inside useeffect')
        const allSet = dice_array.every( die => die.isSet)
        let target = dice_array[0].value
        const allSame  = dice_array.every( die => die.value === target)
        console.log( `allSet: ${allSet} allSame: ${allSame}`)
        allSet && allSame && setTenzies( true )

    },[dice_array])

    React.useEffect( () => {
        if( moves > highScore){
            setHighScore( moves )
            localStorage.setItem( 'highScore' , JSON.stringify( moves ) )
        }
    },[tenzies])

    function handleClick( event, id ){
        //console.log("clicked")
        let currentTarget = event.target.textContent
        // console.log( target )
        // console.log( currentTarget )
        if( (target == -1) || (target == currentTarget )){
            setDice_array( oldDice => oldDice.map( die => 
            die.id === id ?
            {...die, isSet: !die.isSet} :
            die))
        }
         
         //if dice is clicked first time set target value   
        (target == -1) && setTarget( currentTarget ) 
    }

    const getRandomDie = () => Math.floor( Math.random() * ( 7 - 1 ) + 1)

    function  rollDice() {
        // console.log(randomValueArray)

         setDice_array( preValues => {
            return preValues.map( ( item, index) => {
                if( !item.isSet ){
                    return({
                        ...item,
                        value: getRandomDie()
                    })
                }else{
                    return({
                        ...item
                    })
                }
            })
         })

         if( target != -1){
            setMoves( m => m + 1 )
         }
    }

    function reset () {
        setDice_array( () => intializer() )
        setTarget( -1 )
        setMoves( 0 )
        setTenzies( false)
    }



   // console.log( dice_array )
    const rollBtn = (
        () => !tenzies ? 
        (
            <a href="#" 
               className="roll-btn"
                onClick={rollDice} 
             >
            ROLL
        </a>
        ) :
        (
            <a href="#" 
                className=" roll-btn roll-btn-reset"
                onClick={reset} 
             >
            Total Moves : {moves}<br />
            Click to Reset
        </a>
        )

    )()
    
    return(
        <div className="container">
            {tenzies && <Confetti />}
            <h3 className="highScore">HighScore: <span className="score">{highScore}</span></h3>
            <header className="intro">
                <h2 className="intro__head">Tenzies</h2>
                <p className="intro__desc">
                    Roll until all dice are the same.
                    Click each die to freeze it at its current value between rolls.
                </p>
            </header>
            <TileGroup 
                diceArray = {dice_array}
                handleClick = {handleClick}
            />
            {rollBtn}
        </div>
    )
}