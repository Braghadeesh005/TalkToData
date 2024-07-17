import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { BrowserRouter } from "react-router-dom"
//import theme from './theme'  // We'll create this file next

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <ChakraProvider theme={theme}> */}
      {/* <ColorModeScript initialColorMode={theme.config.initialColorMode} /> */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    {/* </ChakraProvider> */}
  </React.StrictMode>,
)