import { useEffect, useState } from 'react'
import { generateWord } from './utils/main'
import Wordle from './components/wordle'
import './App.css'

const App = () => {

  const [randomWord, setRandomWord] = useState("")

  useEffect(() => {
    const request = async () => {
      const word = await generateWord()
      setRandomWord(word)
      console.log(word)
      return word
    }
    request()
    console.log(randomWord)
  }, [])

  console.log(randomWord)

  return (
    <div className='color-cyan'>
      {randomWord && <Wordle word={randomWord} />}
    </div>
  )
}

export default App
