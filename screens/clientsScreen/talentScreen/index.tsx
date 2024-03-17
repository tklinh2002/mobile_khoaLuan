import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import Header from "../../component/header";
import IconEntypo from "react-native-vector-icons/Entypo";
import Talent from "./talent";

const TalentScreen = ({ navigation }) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.title}>Tìm Ứng Viên</Text>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} placeholder="Nhập ....." />
          <TouchableOpacity style={styles.buttonSeacrh}>
            <IconEntypo name="magnifying-glass" size={30} color="white" />
          </TouchableOpacity>
        </View>
        <Talent navigation={navigation} />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    paddingHorizontal: 10,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    marginTop: 10,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    paddingHorizontal: 10,
  },
  buttonSeacrh: {
    padding: 10,
    backgroundColor: "#0866FF",
  },
});

export default TalentScreen;
