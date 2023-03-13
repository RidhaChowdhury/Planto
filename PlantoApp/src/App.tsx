import React from "react";
import { NativeBaseProvider, Box, Text, View, Button, HStack, Icon, Image, FlatList, AddIcon, Fab, SearchIcon,Modal, Center, Spinner, Heading} from "native-base";
import axios from 'axios';
import { StyleSheet, SafeAreaView, Dimensions} from "react-native";
import AddPlant from "./components/AddPlant";
import { ModalConcerns, Plant } from "./models/plant.model";
import PlantCard from "./components/PlantCard";

function assertUnreachable(_: never): never {
  throw new Error("Didn't expect to get here");
}

export default function App() {

  const [plants, setPlants] = React.useState<any>([{Name: 'DUDA'}]);
  const [showModal, setShowModal]= React.useState<boolean>(false);
  
  React.useEffect(() => {
    axios.get('https://plantoapi.azurewebsites.net/getPlants')
      .then(response => {
        const data = response.data.plants as Plant[];
        setPlants(data);
      })
      .catch(error => {
        // handle the error
        console.error(error);
      });
  }, []);
  

  async function addNewPlantToDatabase(newPlant : Plant) {
    await axios.post('https://plantoapi.azurewebsites.net/addPlant', newPlant)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  async function handleModalResponse(concern: ModalConcerns) {
    switch(concern.about) {
      case  'be-saved-plant':
        setShowModal(() => false);
        setPlants((oldPlants: Plant[]) => {
          return [...oldPlants, concern.plant];
        });
        await addNewPlantToDatabase(concern.plant);
        break;
      case 'be-closed':
        setShowModal(() => false);
        break;
      default:
        assertUnreachable(concern);
        break;
    }
  }

  return (
    <SafeAreaView style = {styles.global}>
      <NativeBaseProvider>
        <View>
          <View style = {styles.header}>
              <HStack style = {styles.headerContent}>
                <Heading style = {styles.title}>Planto</Heading>
                <Button style = {styles.addPlant} onPress={() => { setShowModal(() => true);}}>
                    <AddIcon/>
                </Button>
              </HStack>
          </View>
          <View style = {styles.plantList}>
          <FlatList<Plant> data={plants} renderItem={({item}) => <PlantCard key = {item.Id} plant={item} />} keyExtractor={item => item.Id} />
          </View>
          <AddPlant showModal = {showModal} setShowModal = {setShowModal} onAdd={async(plant : Plant) => {
            handleModalResponse({about: 'be-saved-plant', plant: plant});
          }}/>
        </View>

        <Fab shadow={2} placement="bottom-right" size="sm" icon={<SearchIcon color="white" name="search" size="4" />} label="Scan a tag" />
      </NativeBaseProvider>
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

const headerHeight = 50;
const footerHeight = 50;
const plantListHeight = Dimensions.get('window').height - headerHeight - footerHeight;

const styles = StyleSheet.create({
  global: {
    fontFamily: 'poppins',
    flex: 1,
  },
  header: {
    backgroundColor: "#fff",
    height: headerHeight,
    width: "100%",
  },
  headerContent: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: colors.secondary,
    alignItems: "center",
  },
  title: {
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
    height: plantListHeight,
    width: "100%",
  },
  scanTag: {
    position: "absolute",
    bottom: footerHeight + 20,
    width: "75%",
    alignSelf: "center",
  }
});