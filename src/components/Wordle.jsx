import React, {useEffect, useState} from "react";
import useWordle from "../hooks/useWordle";


const Wordle = ({word}) => {

    const {currentGuess, handleKeyUp, guesses, isCorrect, turn} = useWordle(word)

    useEffect(() => {
        window.addEventListener("keyup", handleKeyUp)
        return () => window.removeEventListener("keyup", handleKeyUp) 
    }, [handleKeyUp])

    useEffect(() => {
        console.log(guesses, turn, isCorrect)
    }, [guesses, turn, isCorrect])
    
    return(

        <div>
            Wordle
            <h5>The Word is: *{word}*</h5>
            <div>Current Guess : {currentGuess}</div>
        </div>
    )
}

export default Wordle