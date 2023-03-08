import React from "react";
import { NativeBaseProvider, Box, Text, View, Button, HStack, Icon, Image, AddIcon, Modal, Center} from "native-base";
import axios from 'axios';
import { StyleSheet, SafeAreaView, StatusBar, Platform, View as ReactView } from "react-native";
import AddPlant from "./components/AddPlant";


export default function App() {

  const [plants, setPlants] = React.useState<any>([{platName: 'DUDA'}]);
  const [showModal, setShowModal]= React.useState<boolean>(false);
  
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
    <SafeAreaView style = {styles.global}>
      <ReactView style = {styles.container} >
      <NativeBaseProvider>
        <View>
          <View style = {styles.header}>
              <HStack style = {styles.headerContent}>
                <Text style = {styles.title}>Planto</Text>
                <Button style = {styles.addPlant} onPress={() => {
                  console.warn("Hello bro");
                  setShowModal(() => true);
                  }}>
                    <AddIcon/>
                </Button>
              </HStack>
          </View>

          <View style = {styles.plantList}>
              {
              plants.map((el: any, index : number) => <Text key = {index}>{el.PlantName}</Text>)
              }
          </View>
          <AddPlant showModal = {showModal} setShowModal = {setShowModal}/>
        </View>
      </NativeBaseProvider>
      </ReactView>
    </SafeAreaView>
  );

}

const colors = {
  primary: "#83CF9A",
  secondary: "#c1e8cd",
  success: "#7CD127",
  info: "#7F8CFF",
  warning:"#FFD000",
  danger:"#F84D51"
}

const styles = StyleSheet.create({
  global: {
    fontFamily: 'poppins',
    flex: 1,
  },
  container: {
     
  },
  header: {
    backgroundColor: "#fff",
    height: 50,
    width: "100%",
  },
  headerContent: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: colors.secondary,
  },
  title: {
    paddingTop:20,
    paddingLeft: 10,
    fontSize: 30,
    fontWeight: "bold",
  },
  addPlant: {
    margin: 5,
    padding: 5,
    backgroundColor: colors.primary,
    borderRadius: 25,
  },
  plantList: {
    height: 50,
    width: "100%",
  }
});