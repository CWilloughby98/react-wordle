import { useState } from "react"

const useWordle = ( word ) => {

    const [turn, setTurn] = useState(0)
    const [currentGuess, setCurrentGuess] = useState("")
    const [guesses, setGuesses] = useState([...Array(6)])
    const [history, setHistory] = useState([])
    const [isCorrect, setIsCorrect] = useState(false)

    const formatGuess = () => {
        //example [{key:"char", color:"yellow/gray/green"}]
        console.log("Formatting guess: ", currentGuess)
        let wordArray = [...word]
        let formattedGuess = [...currentGuess].map((letter) => {
            return {key: letter, color: "gray"}
        })

        formattedGuess.forEach((letter, index) => {
            if (wordArray[index] === letter.key) {
                formattedGuess[index].color = "green" // Use assignment operator
                wordArray[index] = null
            }
        })

        formattedGuess.forEach((letter, index) => {
            if (wordArray.includes(letter.key) && letter.color !== "green") {
                formattedGuess[index].color = "yellow"
                wordArray[wordArray.indexOf(letter.key)] = null
            }
        })

        return formattedGuess
    }


    const addNewGuess = (formattedGuess) => {
        if (currentGuess === word) {
            setIsCorrect(true)
        }
        setGuesses((prevGuesses) => {
            let newGuesses = [...prevGuesses]
            newGuesses[turn] = formattedGuess
            return newGuesses
        })
        setHistory((prevHistory) => {
            return [...prevHistory, currentGuess]
        })
        setTurn((prevTurn) => {
            return prevTurn + 1
        })
        setCurrentGuess("")
    }


    const handleKeyUp = ({key}) => {

        if (key === "Backspace") {
            setCurrentGuess((prev) => {
                return prev.slice(0, -1)
            })
            return
        }

        if (key === "Enter") {
            //add if < 5 turn and word length
            //no dupe words
            if (turn > 5) {
                console.log("Sorry, you have no more guesses.")
                return
            }

            if (history.includes(currentGuess)) {
                console.log("You already used that word.")
                return
            }

            if (currentGuess.length !== 5) {
                console.log("Your word is not 5 characters long.")
                return
            }
            const formattedWord = formatGuess()
            addNewGuess(formattedWord)
        }

        if (/^[A-Za-z]$/.test(key)) {
            if(currentGuess.length < 5) {
                setCurrentGuess((prev) => {
                    return prev + key
                })
            }
        }
    }

    return {turn, currentGuess, guesses, isCorrect, handleKeyUp}
}

export default useWordle
