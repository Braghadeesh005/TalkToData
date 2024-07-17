import React from 'react'
import { Center, VStack, Button, useColorModeValue } from '@chakra-ui/react'
import { FcGoogle } from 'react-icons/fc'

const Login = () => {
  const bgColor = useColorModeValue("gray.100", "gray.700")

  const handleGoogleAuthClick = () => {
    window.open(`http://localhost:4000/auth/google/signup/callback`, '_self');
  };

  return (
    <Center h="100vh" w="100vw" bg={bgColor}>
      <VStack spacing={4}>
        <Button 
          leftIcon={<FcGoogle />}
          colorScheme='blackAlpha' 
          variant='solid' 
          onClick={handleGoogleAuthClick} 
          color="white"
        >
          Sign in with Google
        </Button>
      </VStack>
    </Center>
  )
}

export default Login