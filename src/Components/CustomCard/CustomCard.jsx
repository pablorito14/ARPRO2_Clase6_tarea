import { Card, CardBody, Heading } from "@chakra-ui/react"
import { Formulario } from "../Formulario/Formulario"
import { motion } from 'framer-motion'

const CustomCard = () => {
  return(
    <motion.div initial={{opacity:0}}
              transition={{duration:1}} 
              animate={{opacity:1}}>
      <Card boxShadow='dark-lg' maxW='md' mx='auto'>
        <CardBody>
          <Heading textAlign='center' as='h3' mb={3} size='lg'>Formulario de registro</Heading>
          <Formulario />
        </CardBody>
      </Card>
    </motion.div>
  )
}

export { CustomCard }