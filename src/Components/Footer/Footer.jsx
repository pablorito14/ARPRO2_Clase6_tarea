import { Box, Container, Flex, Text } from "@chakra-ui/react"

const Footer = () => {
  return(
    <Box as="footer"  bg='#112132' color='#aaccee' position='sticky' boxShadow='dark-lg'>
      <Container maxW='800px' display='flex' justifyContent='center'>
        <Text>
          Pablo Rito
        </Text>
      </Container>
    </Box>
  )
}

export { Footer }