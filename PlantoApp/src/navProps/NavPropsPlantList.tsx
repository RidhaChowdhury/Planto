import { RootStackParamList } from "./RootStackParamList";
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

export type NavPropsPlantList = {
    route: RouteProp<RootStackParamList, 'PlantList'>;
    navigation: StackNavigationProp<RootStackParamList, 'PlantList'>;
};