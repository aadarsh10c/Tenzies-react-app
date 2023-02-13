import React from "react"
import { nanoid } from 'nanoid'
import Tile from './Tile'

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


export default function TileGroup(){
    const [ dice_array , setDice_array ] = React.useState(() => intializer() )

    function handleClick(){
        setDice_array( prevValue => {
            return prevValue.map( value =>(
                {
                    ...value,
                    isSet:!value.isSet
                }
            ) )
        })
    }

    console.log( dice_array )

    const tile_array = dice_array.map( (value) => (
        <Tile 
        key={value.id} 
        dice={value}
        handleClick = {handleClick}
        />) )

    
    
    return(
        <main className="tile-group">
            {tile_array}
        </main>
    )
}