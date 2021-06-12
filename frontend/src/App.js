import "./App.css";
import React from "react";
import Routes from "./components/Routes";
import { ChakraProvider } from "@chakra-ui/react";
import { MetamaskStateProvider } from "use-metamask";
import { RHBProvider } from "./hooks/RHBProvider";
function App() {
  return (
    <MetamaskStateProvider>
      <RHBProvider>
        <ChakraProvider>
          <Routes />
        </ChakraProvider>
      </RHBProvider>
    </MetamaskStateProvider>
  );
}

export default App;
