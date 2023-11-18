import './App.css'

import { ChakraProvider } from '@chakra-ui/react'
import { Header } from './Components/Header/Header'
import { Main } from './Components/Main/Main'
import { Footer } from './Components/Footer/Footer'

function App() {
  return (
    <>
      <ChakraProvider>
        <Header />
        <Main />
        <Footer />
      </ChakraProvider>
    </>
  )
}

export default App
