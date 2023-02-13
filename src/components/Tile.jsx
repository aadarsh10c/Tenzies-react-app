import React from "react";

export default function Tile(props){
    return(
        <p href="#" 
        className={`tile${props.dice.isSet ? " tile-select" : " tile-unselect"}`}
        onClick={props.handleClick} 
        value={props.dice.value}
        >
            {props.dice.value}
        </p>
    )
}