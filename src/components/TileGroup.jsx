import React from "react"
import Tile from './Tile'

export default function TileGroup(){
    const [ values , setValues ] = React.useState(() => Array.from({length:10},() => Math.floor( Math.random() * ( 11 -1)+1) ))
    const tile_array = values.map( (value) => <Tile value={value}/> )
    return(
        <main className="tile-group">
            {tile_array}
        </main>
    )
}