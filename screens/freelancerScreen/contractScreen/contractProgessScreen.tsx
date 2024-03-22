import { View, Text, StyleSheet } from "react-native"
import { ScrollView } from "react-native-gesture-handler";
import ContractProgess from "./contractProgess";


const ContractProgessScreen = () => {
    return(
        <ScrollView>
            <ContractProgess />
        </ScrollView>
    )
}
const styles = StyleSheet.create({

});
export default ContractProgessScreen;