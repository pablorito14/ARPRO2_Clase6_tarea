import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, Card, CardBody, Checkbox, CloseButton, Flex, FormControl, FormErrorMessage,FormLabel, Heading, Icon, Input, InputGroup, InputRightElement, Link, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure, useToast } from "@chakra-ui/react";
import {motion} from 'framer-motion';
import {Formik} from 'formik';
import { ref, object, string, boolean} from 'yup';
import { useState } from "react";
import { IoEye,IoEyeOff  } from "react-icons/io5";

const Lorem = ({count}) => {
  return (
  <>
     {[...Array(count)].map((c,i) => 
     <Box mt={4}>
      <Heading size='sm'>{i+1} - Lorem ipsum dolor sit amet</Heading>
      <Text fontSize='sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. In minima tenetur ex facere numquam vel. Odio hic molestiae aperiam expedita, dolorem perferendis, quo non facilis officiis optio, accusamus laborum quibusdam?</Text>
     </Box>)}
      
  </>
  )
}
const TerminosModal = ({isOpen,onClose}) => {

  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false} scrollBehavior='inside'>
      <ModalOverlay />
        <ModalContent>
          <ModalHeader pb={0}>Términos y condiciones</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Lorem count={6} />
          </ModalBody>

          <ModalFooter>
          <motion.div whileHover={{scale:1.1}} whileTap={{scale:0.9}}>
              <Button bg='#112132' color='#aaccee' onClick={onClose}
                      _hover={{ bg:'#aaccee', color:'#112132'}}
                      >Cerrar</Button>

            </motion.div>
          </ModalFooter>
        </ModalContent>
    </Modal>
  )
}

const Formulario = () => {

  const toast = useToast();

  const [show,setShow] = useState(false);
  const mostrarPass = () => setShow(!show);

  const [showConfirm,setShowConfirm] = useState(false);
  const mostrarConfirmPass = () => setShowConfirm(!showConfirm);
  
  // valores iniciales de los input del formulario
  // const formInitialValues = {
  //   nombre:'pablo',
  //   apellido:'ritp',
  //   email:'pablo@pablo.com',
  //   tel:'3517543211',
  //   pass:'12345678',
  //   confPass:'12345678',
  //   toc:true
  // }

  const formInitialValues = {
    nombre:'',
    apellido:'',
    email:'',
    tel:'',
    pass:'',
    confPass:'',
    toc:false
  }

  // validacion de cambios manual
  const formValidate = (values) => {
    const errores = {};
    if(values.nombre.length < 4){
      errores.nombre = 'Nombre requerido'
    }
    if(!values.apellido) {
      errores.apellido = 'Apellido requerido'
    }
    return errores;
  }
  
  // funcion a ejecutar cuando se envia el formulario
  const {isOpen,onOpen,onClose} = useDisclosure();

  const formSubmit = (values, {setSubmitting,resetForm}) => {
    setTimeout(() => {
      console.log(values);
      
      toast({
        position: 'top',
        duration: null,
        render: () => (
          <Alert
            status='success'
            variant='subtle'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            textAlign='center'
            rounded='md'
            
          >
            <AlertIcon boxSize='40px' mr={0} />
            <AlertTitle mt={4} mb={1} fontSize='lg'>
              Registro completado
            </AlertTitle>
            <AlertDescription maxWidth='md'>
              <Text as='strong'>{values.nombre}</Text> le hemos enviado un email a <Text as='strong'>{values.email}</Text> para confirmar su cuenta. Recuerde revisar la carpeta de SPAM o Correo no deseado en caso de no recibirlo.
            </AlertDescription>
            <Flex mt={2}>
              <Button colorScheme="green" onClick={() => {
                  setSubmitting(false);
                  toast.closeAll();
                  resetForm({values:formInitialValues})
                }}>Aceptar</Button>

            </Flex>
          </Alert>
        ),
      })
    }, 400);
  }

  // validacion con YUP mediante schemas
  const registroSchema = object({
    nombre: string().trim().matches(/^[a-zA-Z]{2,}/,'Por favor ingrese al menos 2 letras').required('Por favor ingrese su nombre'),
    apellido: string().trim().matches(/^[a-zA-Z]{2,}/,'Por favor ingrese al menos 2 letras').required('Por favor ingrese su apellido'),
    email: string().trim().lowercase().matches(/^[a-z]\S{2,}@\S{2,}\.\S{2,}$/,'Formato de correo no valido').required('Por favor ingrese su correo'),
    tel: string().trim().matches(/^\d{10}$/,'Ingrese código sin 0 y número sin 15').required('Por favor ingrese su teléfono'),
    pass: string().min(8,'La contraseña debe tener al menos 8 caracteres').required('Por favor ingrese una contraseña'),
    confPass: string().oneOf([ref('pass')],'Las contraseñas son distintas').required('Por favor ingrese nuevamente la contraseña'),
    toc: boolean().oneOf([true], "Debe leer y aceptar los términos y condiciones")
  })

  return(
    <>
    <Card boxShadow='dark-lg' maxW='md' mx='auto'>
      <CardBody>
        <Heading textAlign='center' as='h3' mb={3} size='lg'>Formulario de registro</Heading>

        

        <Formik initialValues={formInitialValues}
                // validate={formValidate}
                validationSchema={registroSchema}
                onSubmit={formSubmit}>
          {/* el formulario se va a generar a partir de una funcion, donde values, errors, etc son props, nombres definidos por Formik y que NO SE DEBEN CAMBIAR */}
          {({values,errors,touched,handleChange,handleBlur,handleSubmit,isSubmitting}) => (
            <form onSubmit={handleSubmit} noValidate>

              {/* NOMBRE */}
              <FormControl isRequired isInvalid={errors.nombre && touched.nombre} mb={6}> 
                <FormLabel mb={0}>Nombre</FormLabel>
                <Input type="text" name="nombre" 
                        focusBorderColor='blue.200'
                        placeholder="Ingrese su nombre"
                        onChange={handleChange} onBlur={handleBlur} 
                        value={values.nombre} isDisabled={isSubmitting} />
                        <FormErrorMessage mt={0} position='absolute'>{errors.nombre}</FormErrorMessage>
              </FormControl>

              {/* APELLIDO */}
              <FormControl isRequired isInvalid={errors.apellido && touched.apellido} mb={6}>
                <FormLabel mb={0}>Apellido</FormLabel>
                <Input type="text" name="apellido" 
                        focusBorderColor='blue.200'
                        placeholder="Ingrese su apellido"
                        onChange={handleChange} onBlur={handleBlur} 
                        value={values.apellido} isDisabled={isSubmitting}/>
                <FormErrorMessage mt={0} position='absolute'>{errors.apellido}</FormErrorMessage>
              </FormControl>

              {/* EMAIL */}
              <FormControl isRequired isInvalid={errors.email && touched.email} mb={6}>
                <FormLabel mb={0}>Correo</FormLabel>
                <Input type="email" name="email" 
                        focusBorderColor='blue.200'
                        placeholder="Ingrese su correo"
                        onChange={handleChange} onBlur={handleBlur} 
                        value={values.email} isDisabled={isSubmitting}/>
                <FormErrorMessage mt={0} position='absolute'>{errors.email}</FormErrorMessage>
              </FormControl>

              {/* TELEFONO */}
              <FormControl isRequired isInvalid={errors.tel && touched.tel} mb={6}>
                <FormLabel mb={0}>Teléfono</FormLabel>
                  <Input type="tel" name="tel" 
                        focusBorderColor='blue.200'
                        placeholder="Teléfono"
                        onChange={handleChange} onBlur={handleBlur} 
                        value={values.tel} isDisabled={isSubmitting}/>
                <FormErrorMessage mt={0} position='absolute'>{errors.tel}</FormErrorMessage>
              </FormControl>

              {/* PASSWORD */}
              <FormControl isRequired isInvalid={errors.pass && touched.pass} mb={6}>
                <FormLabel mb={0}>Contraseña</FormLabel>
                <InputGroup>
                  <Input type={(show) ? 'text' : 'password'} name="pass" 
                        focusBorderColor='blue.200'
                        placeholder="Ingrese una contraseña"
                        onChange={handleChange} onBlur={handleBlur} 
                        value={values.pass} isDisabled={isSubmitting}/>
                  <InputRightElement>
                    <Button onClick={mostrarPass} bg='transparent' _hover={{ bg:'transparent' }} tabIndex='-1' isDisabled={isSubmitting}>
                      <Icon boxSize={8} p={2} as={(!show) ? IoEye : IoEyeOff } />
                    </Button>
                  </InputRightElement>
                </InputGroup>

                
                <FormErrorMessage mt={0} position='absolute'>{errors.pass}</FormErrorMessage>
              </FormControl>

              {/* CONFPASSWORD */}
              <FormControl isRequired isInvalid={errors.confPass && touched.confPass} mb={6}>
                <FormLabel mb={0}>Confirmar contraseña</FormLabel>
                <InputGroup>
                  <Input type={(showConfirm) ? 'text' : 'password'} name="confPass" 
                        focusBorderColor='blue.200'
                        placeholder="Ingrese nuevamente la contraseña"
                        onChange={handleChange} onBlur={handleBlur} 
                        value={values.confPass} isDisabled={isSubmitting}/>
                  <InputRightElement>
                    <Button onClick={mostrarConfirmPass} bg='transparent' _hover={{ bg:'transparent' }} tabIndex='-1' isDisabled={isSubmitting}>
                      <Icon boxSize={8} p={2} as={(!showConfirm) ? IoEye : IoEyeOff } />
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage mt={0} position='absolute'>{errors.confPass}</FormErrorMessage>
              </FormControl>
              {/* TERMINOS */}
              
              <FormControl isInvalid={errors.toc && touched.toc} 
                          display='flex' gap={3}  mb={6}>
                <Checkbox name="toc" onChange={handleChange} value={values.toc} isChecked={values.toc} isDisabled={isSubmitting}></Checkbox>
                <Text>
                He leído y acepto los <Link textDecoration='none' onClick={(!isSubmitting) ? onOpen : null} color='#768798' as='a'>términos y condiciones</Link>
                </Text>
              </FormControl>

              <Box display='flex' justifyContent='center'>
                <motion.div whileHover={{scale:1.1}} whileTap={{scale:0.9}}>
                  <Button type='submit' isLoading={isSubmitting} size='lg' 
                          bg='#112132' color='#aaccee'
                          _hover={{ bg:'#aaccee', color:'#112132'}}
                          loadingText='Procesando'>Crear cuenta</Button>

                </motion.div>
              </Box>

            </form>
          )}
        </Formik>


        <TerminosModal isOpen={isOpen} onClose={onClose} />
      </CardBody>
    </Card>
    </>
  )
}

export { Formulario }