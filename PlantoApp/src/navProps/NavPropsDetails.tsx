import { RootStackParamList } from "./RootStackParamList";
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Plant } from "../models/plant.model";

export type NavPropsDetails = {
    route: RouteProp<RootStackParamList, 'Details'> & {
        params: { plant: Plant };
    };
    navigation: StackNavigationProp<RootStackParamList, 'Details'>;
};