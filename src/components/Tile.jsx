import React from "react";

export default function Tile(props){
    return(
        <p className="tile" onClick={props.handleClick}>
            {props.dice.value}
        </p>
    )
}