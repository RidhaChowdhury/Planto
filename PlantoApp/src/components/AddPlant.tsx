import React, {useState, useEffect} from "react";
import { Modal, NativeBaseProvider, View, Text, Button, Center } from "native-base";
import { StyleSheet } from "react-native";
import { NfcManager, NfcEvents } from "react-native-nfc-manager";

export default function AddPlant(props:any) {

  const [plants, setPlants] = React.useState<any>([]);

  return (
    <Center>
          <Modal isOpen={props.showModal} onClose={() => props.setShowModal(false)} size={"lg"}>
            <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>Contact Us</Modal.Header>
            <Modal.Body>
              <Text>Im a sexy little plant</Text>
              </Modal.Body>
                <Modal.Footer>
                <Button onPress={() => {
               props.setShowModal(false);
              }}>
                  Save
                </Button>
            </Modal.Footer>
          </Modal.Content>
          </Modal>
        </Center>
  );

}

const styles = StyleSheet.create({
  global: {
    margin: 0,
    padding: 0,
    fontFamily: 'poppins',
  },
});