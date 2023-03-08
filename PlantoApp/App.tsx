import React from "react";
import { NativeBaseProvider, Box, Text } from "native-base";
import axios from 'axios';

export default function App() {

  const [plants, setPlants] = React.useState<any>([]);
  
  React.useEffect(() => {
    fetch("https://plantoapi.azurewebsites.net/getPlants")
    .then(response => response.json())
    .then((data: any) => {
      setPlants((_prev : any) => data.plants);
    })
    .catch(error => {
      // handle the error
      console.error(error);
    });
  }, []);
  
  return (
    <NativeBaseProvider>
      {
      plants.map((el: any, index : number) => <Text key = {index}>{el.PlantName}</Text>)
      }
    </NativeBaseProvider>
  );
}