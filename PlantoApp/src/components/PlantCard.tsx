import React from "react";
import { StyleSheet, SafeAreaView, View, Image, Text} from "react-native";
import {Plant} from "../models/plant.model";

export default function PlantCard(props: {plant: Plant}) {
    return (
        <View style = {styles.card}>
            <View style={styles.iconsSpace}>
                <Image source={require("../../assets/plant.png")} style={styles.plantIcon}></Image>
            </View>
            <View style={styles.infoSpace}>
                <View style={styles.plantProperties}>
                    <Text>{props.plant.Name}</Text>
                </View>
                <View style={styles.plantCare}>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "gray",
        borderRadius: 10,
        padding: 5,
        margin: 10,
        width: "90%",
        height: 100,
        alignSelf: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
    iconsSpace: {
        flexDirection: 'row',
        justifyContent: "space-around",
        alignItems: "center",
        width: "20%",
        borderColor: "black",
        borderRightWidth: 1,
        height: "100%",
    },
    infoSpace: {
        flexDirection: 'column',
        justifyContent: "space-around",
        alignItems: "flex-start",
        backgroundColor: "red",
        padding: 5,
        width: "80%",
    },
    plantIcon: {
        width: 50,
        height: 50,
    },
    plantProperties: {
        flexDirection: 'column',
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "blue",
        textAlign: "left",
        padding: 5,
    },
    plantCare: {
    }
});
