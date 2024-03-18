import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import IconEntypo from "react-native-vector-icons/Entypo";
import { useState } from "react";
import { useQueries } from "@tanstack/react-query";
const Job = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const handDetailJob = () => {
    navigation.navigate("TabDetailJob");
  };
  return (
    <TouchableOpacity style={styles.container} onPress={handDetailJob}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          color: "green",
          marginHorizontal: 10,
        }}
      >
        Backend
      </Text>
      <View style={{ marginLeft: 10, marginTop:10 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            color: "gray",
          }}
        >
          Ngày tạo: 27/02/2024
        </Text>
      </View>
      <View style={{ flexDirection: "row" , justifyContent:"space-between", alignItems:"center", marginHorizontal:10}}>
        <View>
          <Text style={styles.text}>
            0
          </Text>
          <Text style={{fontSize:20}}>Ứng tuyển</Text>
        </View>
        <View>
          <Text style={styles.text}>
            0
          </Text>
          <Text style={{fontSize:20}}>Lời mời</Text>
        </View>
        <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
          <View style={styles.button2}>
            <IconEntypo name="dots-three-horizontal" size={16} color="green" />
          </View>
        </TouchableWithoutFeedback>
      </View>

      {/* modal */}
      <Modal animationType="slide" visible={modalVisible} transparent={true}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={styles.input}
                onPress={() => setModalVisible(false)}
              >
                <Text style={[styles.text, { color: "red", paddingVertical:10 }]}>Xóa bài đăng</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.input}
                onPress={() => setModalVisible(false)}
              >
                <Text style={[styles.text, {paddingVertical:10}]}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  button: {
    borderWidth: 1,
    borderColor: "green",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
    marginVertical: 10,
    height: 40,
    flex: 1,
  },
  button2: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
    marginVertical: 10,
    height: 40,
    width: 40,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalContent: {
    width: "100%", // Chiều rộng đầy đủ
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20, // Góc bo trên cùng bên trái
    borderTopRightRadius: 20, // Góc bo trên cùng bên phải
    elevation: 5,
  },
  text: {
    fontSize: 20,
    fontWeight: "700",
  },
  input: {
    borderBottomWidth: 0.5,
    borderColor: "gray",
  },
});
export default Job;
