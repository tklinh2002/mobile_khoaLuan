import { View, Text, ScrollView } from "react-native";
import Candidate from "./candidate";

const HireScreen = ({navigation}) => {
    return (
        <ScrollView>
            <Candidate navigation={navigation}/>
            <Candidate navigation={navigation}/>
        </ScrollView>
    )
};
export default HireScreen; 