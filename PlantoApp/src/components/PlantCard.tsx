import React from "react";
import { StyleSheet, SafeAreaView, View, Image, Text} from "react-native";
import {Plant} from "../models/plant.model";

export default function PlantCard(props: {plant: Plant}) {
    const lastWatered = props.plant.LastWatered;
    const lastWateredDate = lastWatered ? new Date(lastWatered) : null;
    let wateredDetails = "";
    if (lastWateredDate) {
        const today = new Date();
        const timeDiff = today.getTime() - lastWateredDate.getTime();
        wateredDetails = "Last Watered:" + (timeDiff / (1000 * 3600 * 24) > 1 ? 
            Math.ceil(timeDiff / (1000 * 3600 * 24)) + " days ago"
            :Math.floor(timeDiff / (1000 * 3600)) + " hours ago");
    }

    return (
        <View style = {styles.card}>
            <View style={styles.iconsSpace}>
                <Image source={require("../../assets/plant.png")} style={styles.plantIcon}></Image>
            </View>
            <View style={styles.infoSpace}>
                <View style={styles.plantProperties}>
                    <Text style={{fontWeight:"600", fontSize:20}}>{props.plant.Name}</Text>
                    <Text style={{fontWeight:"300", fontSize:15}}>{props.plant.DevelopmentStage}</Text>
                </View>
                <View style={styles.plantCare}>
                    <Text style={{fontWeight:"300", fontSize:15}}>{wateredDetails}</Text>

                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "white",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#606060",
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
        shadowRadius: 4,
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
        alignItems: "flex-start",
        textAlign: "left",
        borderBottomWidth: 1,
        width: "100%",
    },
    plantCare: {
    }
});
