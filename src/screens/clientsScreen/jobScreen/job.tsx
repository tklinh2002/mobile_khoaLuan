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
import ModalEditJob from "../postScreen/modalEditJob";
const Job = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, fontWeight: "bold", alignSelf: "center" }}>
        Backend
      </Text>
      <View style={{ marginLeft: 10 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            backgroundColor: "#9BAA97",
            color: "white",
            width: "20%",
          }}
        >
          Bản nháp
        </Text>
        <Text style={{ fontSize: 16, fontWeight: "bold", height: 100 }}>
          Mô tả:
        </Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity style={styles.button} onPress={()=>setModalVisible2(true)}>
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "green" }}>
            Chỉnh sửa bản nháp
          </Text>
        </TouchableOpacity>
        <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
          <View style={styles.button2}>
            <IconEntypo name="dots-three-horizontal" size={16} color="green" />
          </View>
        </TouchableWithoutFeedback>
      </View>

      {/* modal option*/}
      <Modal animationType="slide" visible={modalVisible} transparent={true}>
        <TouchableWithoutFeedback onPress={()=> setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity style={styles.input} onPress={() => setModalVisible(false)}>
                <Text style={[styles.text, {color:"red"}]}>Xóa bài</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.input} onPress={() => setModalVisible(false)}>
                <Text style={[styles.text, {color:"#0866FF"}]}>Đăng bài</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.input} onPress={() => setModalVisible(false)}>
                <Text style={[styles.text]}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* modal sửa bài đăng */}
      <Modal
      animationType="slide"
      visible={modalVisible2}
      >
        <ModalEditJob setModalVisible={setModalVisible2} job_id={12}/>
      </Modal>
    </View>
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
    fontWeight: "bold",
    padding: 10,
  },
  input: {
    borderBottomWidth: 0.5,
    borderColor: "gray",
  },
});
export default Job;
