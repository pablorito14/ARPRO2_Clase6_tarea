import { Box, Container } from "@chakra-ui/react"
import { CustomCard } from "../CustomCard/CustomCard"

const Main = () => {
  return(
    <Box minH={{base:'calc(100dvh - 39.9px - 24px)',md:'calc(100dvh - 43.2px - 24px)'}} 
        bg='#aaccee' display='flex' justifyContent='center' alignItems='center'>
      <Container maxW='800px' py='1rem'>
        <CustomCard />
      </Container>
    </Box>
  )
}

export { Main }