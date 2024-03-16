import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import { Button, TextInput } from "react-native-paper";
const ModalApplyJob = ({ setModalVisible }) => {
  const handPickFile = async () => {
    // try {
    //   const res = await DocumentPicker.pick({
    //     type: [DocumentPicker.types.allFiles],
    //   });
    //   console.log("File URI: ", res);
    // } catch (err) {
    //   if (DocumentPicker.isCancel(err)) {
    //     console.log("User cancelled the file picking");
    //   } else {
    //     console.error("Error picking file: ", err);
    //   }
    // }
  };
  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text style={[styles.title, { fontSize: 30, textAlign: "center" }]}>
            Ứng tuyển công việc
          </Text>
          <IconAntDesign
            name="closecircle"
            size={30}
            color="black"
            style={{ position: "absolute", top: 10, right: 10 }}
            onPress={() => setModalVisible(false)}
          />
        </View>
        <Text style={styles.text}>Giới thiệu về bản thân</Text>
        <TextInput multiline label="Giới thiệu" mode="outlined" style={styles.textInput}/>
        <TextInput label="Số lượng proposal" keyboardType="decimal-pad" mode="outlined" style={styles.textInput}/>
        <TextInput label="Link CV" mode="outlined" style={styles.textInput}/>
        <TouchableOpacity onPress={handPickFile}>
          <Text style={styles.text}>Chọn file</Text>
        </TouchableOpacity>
        <TouchableOpacity >
          <Button mode="contained" style={[styles.button,{backgroundColor:"green"}]}>
            Ứng tuyển
          </Button>
        </TouchableOpacity>
        <TouchableOpacity >
          <Button mode="contained" style={[styles.button, {backgroundColor:"red"}]}>
            Hủy
          </Button>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    backgroundColor: "white",
    padding: 10,
    flex: 1,
    borderColor: "black",
    borderWidth: 3,
    borderRadius: 10,
    marginTop: "10%",
  },
  button: {
    marginVertical: 10,
    padding: 5,

  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "green",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginVertical: 10,
  },
  textInput: {
    backgroundColor: "white",
    marginVertical: 10,
  },
});
export default ModalApplyJob;
