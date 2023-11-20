import { Button, FormControl, FormErrorMessage, FormLabel, Icon, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import { IoEye,IoEyeOff  } from "react-icons/io5";

const CustomFormControlPass = ({error,touched,label,name,submitted,placeholder,handleChange,handleBlur,isSubmitting,value}) => {

  useEffect(() => {

    if(submitted){
      setShow(false)
    }

  },[submitted])

  const [show,setShow] = useState(false);
  const mostrarPass = () => setShow(!show);
  
  return(
    <FormControl isRequired isInvalid={error && touched} mb={6}>
      <FormLabel mb={0}>{label}</FormLabel>
      <InputGroup>
        <Input type={(show) ? 'text' : 'password'} name={name} 
              focusBorderColor='blue.200' autoComplete="false"
              placeholder={placeholder}
              onChange={handleChange} onBlur={handleBlur} 
              value={value} isDisabled={isSubmitting}/>
        <InputRightElement>
          <Button onClick={mostrarPass} bg='transparent' _hover={{ bg:'transparent' }} tabIndex='-1' isDisabled={isSubmitting}>
            <Icon boxSize={8} p={2} as={(!show) ? IoEye : IoEyeOff } />
          </Button>
        </InputRightElement>
      </InputGroup>

      
      <FormErrorMessage mt={0} position='absolute'>{error}</FormErrorMessage>
    </FormControl>
  )
}

export { CustomFormControlPass }