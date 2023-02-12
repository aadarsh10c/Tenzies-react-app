import React from "react";

export default function Container (){
    return(
        <div className="container">
            <header className="intro">
                <h2 className="intro__head">Tenzies</h2>
                <p className="intro__desc">
                    Roll until all dice are the same.
                    Click each die to freeze it at its current value between rolls.
                </p>
            </header>
        </div>
    )
}