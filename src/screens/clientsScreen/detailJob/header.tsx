import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import IconAntDesign from "react-native-vector-icons/AntDesign";
const HeaderDetailJob = () => {
        const navigation = useNavigation();

        return (
                <View style={{backgroundColor:"white" , justifyContent:"flex-end", height:60, marginLeft:10}}>
                    <IconAntDesign
                        name="left"
                        size={25}
                        color="#0866FF"
                        onPress={() => navigation.goBack()}
                    />
                </View>
        );
};
export default HeaderDetailJob;