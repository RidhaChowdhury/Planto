import React from "react";
import { NativeBaseProvider, Box, Text } from "native-base";
import axios from 'axios';

export default function App() {

  const [test, setTest] = React.useState<any>("test");
  
  React.useEffect(() => {
    fetch("https://plantoapi.azurewebsites.net/getPlants")
    .then(response => response.json())
    .then(data => {
      // handle the data
      console.log(data);
    })
    .catch(error => {
      // handle the error
      console.error(error);
    });
  }
  , []);
  
  return (
    <NativeBaseProvider>
      <Text>{test}</Text>
    </NativeBaseProvider>
  );
}