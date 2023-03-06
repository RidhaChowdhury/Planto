import React from "react";
import { NativeBaseProvider, Box, Text } from "native-base";
import axios from 'axios';

export default function App() {

  const [test, setTest] = React.useState<any>("test");
  
  React.useEffect(() => {
    fetch("https://plantoapi.azurewebsites.net/test")
      .then((response) => response.json())
      .then((json) => setTest(json.message))
      .catch((error) => console.error(error))
  }, []);
  
  return (
    <NativeBaseProvider>
      <Text>{test}</Text>
    </NativeBaseProvider>
  );
}