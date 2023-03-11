import React, {useState, useEffect} from "react";
import { Modal, NativeBaseProvider, View, Text, Button, Center, FormControl, Input } from "native-base";
import { StyleSheet, NativeSyntheticEvent, TextInputEndEditingEventData } from "react-native";
import NfcManager, {Ndef , NfcEvents, NfcTech } from "react-native-nfc-manager";
import { v4 as uuidv4 } from 'uuid';
import { Plant } from "../models/plant.model";



export default function AddPlant(props:any) {

    let writeGuidToNfc = async ():Promise<unknown> => {
        // Encode the guid using the Ndef standard
        const guidBytes = Ndef.encodeMessage([Ndef.textRecord(plant.current.Id)]);
        let success = false;
        try {
            
            // Start the NFC reader
            await NfcManager.start();

            // Register to pick up a tag
            await NfcManager.registerTagEvent();

            // Wait to detect a tag
            // eyes emoji
            setNfcState("Waiting for tag...👀");
            const tag = await NfcManager.requestTechnology(NfcTech.Ndef);
            // Write the GUID to the tag
            if(guidBytes) {
                await NfcManager.ndefHandler.writeNdefMessage(guidBytes);
                success = true;
            }
        }
        catch (err) {
            console.warn(err);
            return false;
        }
        finally {
            NfcManager.cancelTechnologyRequest();
            setNfcState("Success!");
            return success;
        }
    }

    function generateGUID(): string {
        let guid = "";
        for (let i = 0; i < 32; i++) {
          const hex = Math.floor(Math.random() * 16).toString(16);
          guid += hex;
          if (i === 7 || i === 11 || i === 15 || i === 19) {
            guid += "-";
          }
        }
        return guid;
    }
    
    
    const plant = React.useRef<Plant>({
        Name: "",
        Id: generateGUID(),
        DevelopmentStage: "Seed"
    });

    const [nfcState, setNfcState] = React.useState<string>("inactive");

    return (
        <Center>
            <Modal isOpen={props.showModal} onClose={() => props.setShowModal(false)} size={"lg"}>
            <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>Add a new plant</Modal.Header>
            <Modal.Body>
                <FormControl>
                <FormControl.Label>Name</FormControl.Label>
                <Input variant={"rounded"} onEndEditing = {(newName : NativeSyntheticEvent<TextInputEndEditingEventData>) => {
                    plant.current = {...plant.current, Name: newName.nativeEvent.text};
                }}/>
                </FormControl>
                <FormControl mt="3">
                <FormControl.Label>GUID</FormControl.Label>
                <Input variant={"filled"} isReadOnly={true} >{plant.current.Id}</Input>
                </FormControl>
                <Button margin={5} onPress = {writeGuidToNfc}>Add NFC Tag</Button>
                <Center>
                    <Text >{nfcState == "inactive" ? "" : nfcState}</Text>
                </Center>
            </Modal.Body>
            <Modal.Footer>
                <Button onPress={() => {
                    props.setShowModal(false);
                    setNfcState("inactive");
                    plant.current.Id = generateGUID();
                    props.onAdd(plant.current);
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