import { Box, Container } from "@chakra-ui/react"
import { Formulario } from "../Formulario/Formulario"

const Main = () => {
  return(
    <Box minH={{base:'calc(100dvh - 39.9px - 24px)',md:'calc(100dvh - 43.2px - 24px)'}}
          bg='#dbedff'
          >
      <Container maxW='800px' py='1rem'>
        <Formulario /> 
      </Container>
    </Box>
  )
}

export { Main }