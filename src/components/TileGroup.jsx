import React from "react"
import Tile from './Tile'


export default function TileGroup( props ){
   // console.log( JSON.stringify(props))

    const tile_array = props.diceArray.map( (value) => (
        <Tile 
            key={value.id} 
            dice={value}
            handleClick = {(e) => props.handleClick(e,value.id)}
        />
        ) )

    
    
    return(
        <main className="tile-group">
            {tile_array}
        </main>
    )
}