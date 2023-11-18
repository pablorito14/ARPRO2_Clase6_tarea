import { Box, Button, Card, CardBody, Checkbox, FormControl, FormErrorMessage, FormHelperText, FormLabel, Heading, Icon, Input, InputGroup, InputRightElement, Link } from "@chakra-ui/react";
import {motion} from 'framer-motion';
import {Formik} from 'formik';
import { ref, object, string, boolean} from 'yup';
import { useState } from "react";
import { FaRegEye } from 'react-icons/fa6';
import { IoEye,IoEyeOff  } from "react-icons/io5";


// valores de los input del formulario
const Formulario = () => {

  const [show,setShow] = useState(false);
  const mostrarPass = () => setShow(!show);

  const [showConfirm,setShowConfirm] = useState(false);
  const mostrarConfirmPass = () => setShowConfirm(!showConfirm);

  const formValues = {
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
  const formSubmit = (values, {setSubmitting}) => {
    setTimeout(() => {
      console.log(values);
      // alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 1400);
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

        <Formik initialValues={formValues}
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
                        value={values.nombre} />
                        <FormErrorMessage mt={0} position='absolute'>{errors.nombre}</FormErrorMessage>
              </FormControl>

              {/* APELLIDO */}
              <FormControl isRequired isInvalid={errors.apellido && touched.apellido} mb={6}>
                <FormLabel mb={0}>Apellido</FormLabel>
                <Input type="text" name="apellido" 
                        focusBorderColor='blue.200'
                        placeholder="Ingrese su apellido"
                        onChange={handleChange} onBlur={handleBlur} 
                        value={values.apellido}/>
                <FormErrorMessage mt={0} position='absolute'>{errors.apellido}</FormErrorMessage>
              </FormControl>

              {/* EMAIL */}
              <FormControl isRequired isInvalid={errors.email && touched.email} mb={6}>
                <FormLabel mb={0}>Correo</FormLabel>
                <Input type="email" name="email" 
                        focusBorderColor='blue.200'
                        placeholder="Ingrese su correo"
                        onChange={handleChange} onBlur={handleBlur} 
                        value={values.email} />
                <FormErrorMessage mt={0} position='absolute'>{errors.email}</FormErrorMessage>
              </FormControl>

              {/* TELEFONO */}
              <FormControl isRequired isInvalid={errors.tel && touched.tel} mb={6}>
                <FormLabel mb={0}>Teléfono</FormLabel>
                  <Input type="tel" name="tel" 
                        focusBorderColor='blue.200'
                        placeholder="Teléfono"
                        onChange={handleChange} onBlur={handleBlur} 
                        value={values.tel}/>
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
                        value={values.pass}/>
                  <InputRightElement>
                    <Button onClick={mostrarPass} bg='transparent' _hover={{ bg:'transparent' }} tabIndex='-1'>
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
                        value={values.confPass}/>
                  <InputRightElement>
                    <Button onClick={mostrarConfirmPass} bg='transparent' _hover={{ bg:'transparent' }} tabIndex='-1'>
                      <Icon boxSize={8} p={2} as={(!showConfirm) ? IoEye : IoEyeOff } />
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage mt={0} position='absolute'>{errors.confPass}</FormErrorMessage>
              </FormControl>
              {/* TERMINOS */}
              
              <FormControl isInvalid={errors.toc && touched.toc} mb={6}>
                <Checkbox name="toc"
                        onChange={handleChange} value={values.toc}>
                  He leido y acepto los <Link>términos y condiciones</Link>
                </Checkbox>
                {/* <FormErrorMessage mt={0} position='absolute'>{errors.toc}</FormErrorMessage> */}
              </FormControl>

              <Box display='flex' justifyContent='center'>
                <motion.div whileHover={{scale:1.1}} whileTap={{scale:0.9}}>
                  <Button type='submit' isLoading={isSubmitting} size='lg' 
                          bg='#112132' color='#aaccee'
                          _hover={{ bg:'#aaccee', color:'#112132'}}
                          loadingText='Submitting'>Crear cuenta</Button>

                </motion.div>
              </Box>

            </form>
          )}
        </Formik>
      </CardBody>
    </Card>
    </>
  )
}

export { Formulario }