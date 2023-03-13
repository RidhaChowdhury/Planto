import {View, Text} from 'native-base';
import {Plant} from '../models/plant.model'
import { NavPropsDetails } from '../navProps/NavPropsDetails';

export default function Details({ route, navigation }: NavPropsDetails):JSX.Element {
    const plant:Plant = route.params.plant;

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>{plant.Name}</Text>
        </View>
    );
}