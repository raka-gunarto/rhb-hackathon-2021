import "./App.css";
import React from "react";
import Routes from "./components/Routes";
import { ChakraProvider } from "@chakra-ui/react";
import { MetamaskStateProvider } from "use-metamask";
import { RHBProvider } from "./hooks/RHBProvider";
import { TasksProvider } from "./hooks/TasksProvider";
function App() {
  return (
    <TasksProvider>
      <MetamaskStateProvider>
        <RHBProvider>
          <ChakraProvider>
            <Routes />
          </ChakraProvider>
        </RHBProvider>
      </MetamaskStateProvider>
    </TasksProvider>
  );
}

export default App;
