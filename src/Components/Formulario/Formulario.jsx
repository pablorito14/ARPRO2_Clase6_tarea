import { Box, Button, Card, CardBody, FormControl, FormErrorMessage, FormHelperText, FormLabel, Heading, Input } from "@chakra-ui/react"

import {Formik} from 'formik';
import { ref,number, object, string} from 'yup';

// valores de los input del formulario
const Formulario = () => {
  const formValues = {
    nombre:'',
    apellido:'',
    email:'',
    tel:'',
    pass:'',
    confPass:''
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
    nombre: string().trim().required('Por favor ingrese su nombre'),
    apellido: string().required('Por favor ingrese su apellido'),
    email: string().email('Formato de correo no valido').required('Por favor ingrese su correo'),
    tel: number().typeError('Número no valido').required('Por favor ingrese su teléfono'),
    pass: string().min(8,'La contraseña debe tener al menos 8 caracteres').required('Por favor ingrese una contraseña'),
    confPass: string().oneOf([ref('pass')],'Las contraseñas son distintas').required('Por favor ingrese nuevamente la contraseña')
  })

  return(
    <>
    <Card boxShadow='dark-lg' maxW='md' mx='auto'>
      <CardBody>
        <Heading textAlign='center'>Formulario de registro</Heading>

        <Formik initialValues={formValues}
                // validate={formValidate}
                validationSchema={registroSchema}
                onSubmit={formSubmit}>
          {/* el formulario se va a generar a partir de una funcion, donde values, errors, etc son props, nombres definidos por Formik y que NO SE DEBEN CAMBIAR */}
          {({values,errors,touched,handleChange,handleBlur,handleSubmit,isSubmitting}) => (
            <form onSubmit={handleSubmit} noValidate>

              {/* NOMBRE */}
              <FormControl isRequired isInvalid={errors.nombre && touched.nombre} mb={3}> 
              <Box display='flex' alignItems='center' justifyContent='space-between'>
                <FormLabel mb='0'>Nombre</FormLabel>
                  <FormErrorMessage>{errors.nombre}</FormErrorMessage>
                </Box>
                <Input type="text" name="nombre" 
                        focusBorderColor='blue.200'
                        placeholder="Ingrese su nombre"
                        onChange={handleChange} onBlur={handleBlur} 
                        value={values.nombre} />
              </FormControl>

              {/* APELLIDO */}
              <FormControl isRequired isInvalid={errors.apellido && touched.apellido} mb={3}>
                <Box display='flex' alignItems='center' justifyContent='space-between'>
                <FormLabel mb='0'>Apellido</FormLabel>
                  <FormErrorMessage>{errors.apellido}</FormErrorMessage>
                </Box>
                <Input type="text" name="apellido" 
                        focusBorderColor='blue.200'
                        placeholder="Ingrese su apellido"
                        onChange={handleChange} onBlur={handleBlur} 
                        value={values.apellido}/>
                
              </FormControl>

              {/* EMAIL */}
              <FormControl isInvalid={errors.email && touched.email} mb={3}>
                <FormLabel>Correo</FormLabel>
                <Input type="email" name="email" 
                        focusBorderColor='blue.200'
                        placeholder="Ingrese su correo"
                        onChange={handleChange} onBlur={handleBlur} 
                        value={values.email} />
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              </FormControl>

              {/* TELEFONO */}
              <FormControl isInvalid={errors.tel && touched.tel} mb={3}>
                <FormLabel>Teléfono</FormLabel>
                <Input type="tel" name="tel" 
                      focusBorderColor='blue.200'
                      placeholder="Ingrese su teléfono"
                      onChange={handleChange} onBlur={handleBlur} 
                      value={values.tel}/>
                <FormErrorMessage>{errors.tel}</FormErrorMessage>
              </FormControl>

              {/* PASSWORD */}
              <FormControl isInvalid={errors.pass && touched.pass} mb={3}>
                <FormLabel>Contraseña</FormLabel>
                <Input type="password" name="pass" 
                        focusBorderColor='blue.200'
                        placeholder="Ingrese una contraseña"
                        onChange={handleChange} onBlur={handleBlur} 
                        value={values.pass}/>
                <FormHelperText>We'll never share your email.</FormHelperText>
                <FormErrorMessage>{errors.pass}</FormErrorMessage>
              </FormControl>

              {/* CONFPASSWORD */}
              <FormControl isInvalid={errors.confPass && touched.confPass} mb={3}>
                <FormLabel>Confirmar contraseña</FormLabel>
                <Input type="password" name="confPass" 
                        focusBorderColor='blue.200'
                        placeholder="Ingrese nuevamente la contraseña"
                        onChange={handleChange} onBlur={handleBlur} 
                        value={values.confPass}/>
                <FormErrorMessage>{errors.confPass}</FormErrorMessage>
              </FormControl>

              <Button type='submit' isLoading={isSubmitting}
                      loadingText='Submitting'>Aceptar</Button>

            </form>
          )}
        </Formik>


        {/* <form>
          
          <FormControl isInvalid={true} mb={3}> 
            <FormLabel>Nombre</FormLabel>
            <Input type="text" _focusVisible={{borderColor:'#c3e2f4'}}/>
            <FormErrorMessage>Email is required.</FormErrorMessage>
          </FormControl>

          <FormControl mb={3}>
            <FormLabel>Apellido</FormLabel>
            <Input type="text"/>
          </FormControl>

          <FormControl>
            <FormLabel>Correo</FormLabel>
            <Input type="email"/>
          </FormControl>

          <FormControl>
            <FormLabel>Teléfono</FormLabel>
            <Input type="number"/>
          </FormControl>

          <FormControl>
            <FormLabel>Contraseña</FormLabel>
            <Input type="password"/>
          </FormControl>

          <FormControl>
            <FormLabel>Confirmar contraseña</FormLabel>
            <Input type="password"/>
          </FormControl>

          <Button
            isLoading={false}
            loadingText='Submitting'
          >Aceptar</Button>
        </form> */}

      </CardBody>
    </Card>
    </>
  )
}

export { Formulario }