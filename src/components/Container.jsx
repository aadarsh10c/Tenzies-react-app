import React from "react"
import { nanoid } from 'nanoid'
import TileGroup from './TileGroup'


function intializer(){
    let randomValueArray = Array.from(
        {length:10},() => Math.floor( Math.random() * ( 11 -1)+1) 
        )
    
    return randomValueArray.map( (value , index) => ({
        id:nanoid(10),
        isSet:false,
        value:value
    }))
    
}

export default function Container (){

    const [ dice_array , setDice_array ] = React.useState(() => intializer() )
    const [ target, setTarget ] = React.useState(-1)
    const [counter, setCounter ] = React.useState(0)
    const [ moves, setMoves ] = React.useState(0)
    function handleClick( event, id ){
        let currentTarget = event.target.textContent
        if( (counter == 0) || (currentTarget == target )){

            setDice_array( preValues => {
                return preValues.map( value => {
                    if( value.id === id ){
                        return (
                            {
                                ...value,
                                isSet:!value.isSet
                            }
                        )
                    }else{
                        return {...value}
                    }
                })
            }  )

            if( target == -1){ //initial value ot be changed with current value
                setTarget(currentTarget)
            }
            
            setCounter( c => c + 1) //increment counter when clicked value is equal to current target
        }
        
    }

    function  rollDice() {
       // console.log(" roll dice !")
        let randomValueArray = Array.from(
            {length:10},
            () => Math.floor( Math.random() * ( 11 - 1 ) + 1)
         )
        // console.log(randomValueArray)

         setDice_array( preValues => {
            return preValues.map( ( item, index) => {
                if( !item.isSet ){
                    return({
                        ...item,
                        value: randomValueArray[index]
                    })
                }else{
                    return({
                        ...item
                    })
                }
            })
         })

         if( counter > 0){
            setMoves( m => m + 1 )
         }
    }

    function reset () {
        setDice_array( () => intializer() )
        setTarget( -1 )
        setCounter( 0 )
        setMoves( 0 )
    }



   // console.log( dice_array )

    const rollBtn = (() => {
        if( counter < 10 ){
            return (
                <a href="#" 
               className="roll-btn"
               onClick={rollDice} 
               >
                ROLL
            </a>
            )
        }else{
            return (
                <a href="#" 
               className=" roll-btn roll-btn-reset"
               onClick={reset} 
               >
                Total Moves : {moves}<br />
                Click to Reset
            </a>
            )
        }
    })()
   // console.log( rollBtn )

    return(
        <div className="container">
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