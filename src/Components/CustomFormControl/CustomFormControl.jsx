import { FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react"

const CustomFormControl = ({error,touched,label,type,name,placeholder,handleChange,handleBlur,isSubmitting,value}) => {
  return(
    <FormControl isRequired isInvalid={error && touched} mb={6}> 
    <FormLabel mb={0}>{label}</FormLabel>
    <Input type={type} name={name} 
            focusBorderColor='blue.200'
            placeholder={placeholder}
            onChange={handleChange} onBlur={handleBlur} 
            value={value} isDisabled={isSubmitting} />
            <FormErrorMessage mt={0} position='absolute'>{error}</FormErrorMessage>
  </FormControl>
  )
}

export { CustomFormControl }