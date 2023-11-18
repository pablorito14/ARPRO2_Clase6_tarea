import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, Card, CardBody, Checkbox, 
          Flex, FormControl, Heading, Link, Modal, ModalBody, ModalCloseButton, ModalContent, 
          ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure, useToast } from "@chakra-ui/react";
import {motion} from 'framer-motion';
import {Formik} from 'formik';
import { ref, object, string, boolean} from 'yup';
import { CustomFormControl } from "../CustomFormControl/CustomFormControl";
import { CustomFormControlPass } from "../CustomFormControlPass/CustomFormControlPass";

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

  // valores iniciales de los input del formulario
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
  // const formValidate = (values) => {
  //   const errores = {};
  //   if(values.nombre.length < 4){
  //     errores.nombre = 'Nombre requerido'
  //   }
  //   if(!values.apellido) {
  //     errores.apellido = 'Apellido requerido'
  //   }
  //   return errores;
  // }
  
  // funcion a ejecutar cuando se envia el formulario
  const {isOpen,onOpen,onClose} = useDisclosure();

  const formSubmit = (values, {setSubmitting,resetForm}) => {
    setTimeout(() => {
      console.log(values);
      
      toast({
        position: 'top',
        duration: null,
        render: () => (
          <Alert status='success' variant='subtle' flexDirection='column' alignItems='center'
                justifyContent='center' textAlign='center' rounded='md'>
            <AlertIcon boxSize='40px' mr={0} />
            <AlertTitle mt={4} mb={1} fontSize='lg'>
              Registro completado
            </AlertTitle>
            <AlertDescription maxWidth='md'>
              <Text>
                <Text as='strong'>{values.nombre}</Text> le hemos enviado un email a <Text as='strong'>{values.email}</Text> para confirmar su cuenta. Recuerde revisar la carpeta de SPAM o Correo no deseado en caso de no recibirlo.
              </Text>
              <Heading fontSize='md' mt={3}>IMPORTANTE</Heading>
              <Text>Solo con el fin de mostrar los datos del formulario para la presentación de la tarea, el objeto se muestra en un console.log().</Text>
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
  const passPattern = /^(?=.*[a-zA-Z])(?=.*\d)\S+$/;
  const emailBasicPatter = /^[a-z]\S{2,}@\S{2,}\.\S{2,}$/;

  const registroSchema = object({
    nombre: string().trim()
            .matches(/^[a-zA-Z]{2,}/,'Por favor ingrese solo letras (al menos 2)')
            .required('Por favor ingrese su nombre'),
    apellido: string().trim()
            .matches(/^[a-zA-Z]{2,}/,'Por favor ingrese solo letras (al menos 2)')
            .required('Por favor ingrese su apellido'),
    email: string().trim().lowercase()
            .matches(emailBasicPatter,'Por favor ingrese un correo valido')
            .required('Por favor ingrese su correo'),
    tel: string().trim()
            .matches(/^\d{10}$/,'Ingrese código sin 0 y número sin 15')
            .required('Por favor ingrese su teléfono'),
    pass: string()
            .matches(passPattern,'Por favor ingrese al menos una letra y un número')
            .min(8,'Por favor ingrese al menos 8 caracteres')
            .required('Por favor ingrese una contraseña'),
    confPass: string()
            .oneOf([ref('pass')],'Las contraseñas son distintas')
            .required('Por favor ingrese nuevamente la contraseña'),
    toc: boolean()
            .oneOf([true], "Debe leer y aceptar los términos y condiciones")
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
              <CustomFormControl error={errors.nombre} touched={touched.nombre} 
                                label='Nombre' type='text' name='nombre'
                                placeholder='Ingrese su nombre' handleChange={handleChange}
                                handleBlur={handleBlur} isSubmitting={isSubmitting} value={values.nombre}/>

              {/* APELLIDO */}
              <CustomFormControl error={errors.apellido} touched={touched.apellido} 
                                label='Apellido' type='text' name='apellido'
                                placeholder='Ingrese su apellido' handleChange={handleChange}
                                handleBlur={handleBlur} isSubmitting={isSubmitting} value={values.apellido}/>

              {/* EMAIL */}
              <CustomFormControl error={errors.email} touched={touched.email} 
                                label='Correo' type='email' name='email'
                                placeholder='Ingrese su correo' handleChange={handleChange}
                                handleBlur={handleBlur} isSubmitting={isSubmitting} value={values.email}/>

              {/* TELEFONO */}
              <CustomFormControl error={errors.tel} touched={touched.tel} 
                                label='Teléfono' type='tel' name='tel'
                                placeholder='Ingrese su teléfono' handleChange={handleChange}
                                handleBlur={handleBlur} isSubmitting={isSubmitting} value={values.tel}/>

              {/* PASSWORD */}
              <CustomFormControlPass error={errors.pass} touched={touched.pass} 
                                    label='Contraseña' name='pass'
                                    placeholder='Ingrese una contraseña' handleChange={handleChange}
                                    handleBlur={handleBlur} isSubmitting={isSubmitting} value={values.pass}/>

              {/* CONFPASSWORD */}
              <CustomFormControlPass error={errors.confPass} touched={touched.confPass} 
                                    label='Confirmar contraseña' name='confPass'
                                    placeholder='Ingrese nuevamente la contraseña' handleChange={handleChange}
                                    handleBlur={handleBlur} isSubmitting={isSubmitting} value={values.confPass}/>

              {/* TERMINOS */}
              <FormControl isInvalid={errors.toc && touched.toc} display='flex' gap={3}  mb={6}>
                <Checkbox name="toc" onChange={handleChange} value={values.toc} isChecked={values.toc} isDisabled={isSubmitting}></Checkbox>
                <Text>
                  He leído y acepto los 
                  <Link textDecoration='none' onClick={(!isSubmitting) ? onOpen : null} color='#768798' as='a'>términos y condiciones</Link>
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