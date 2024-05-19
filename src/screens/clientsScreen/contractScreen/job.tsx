import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { useState } from "react";
import ModalDetailJob from "../../component/modalDetailJob";
import { formatDate } from "../../../utils/format";
const Job = ({ job }) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => setModalVisible(true)}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          color: "green",
          marginHorizontal: 10,
        }}
      >
        {job?.title}
      </Text>
      <View style={{ marginLeft: 10, marginTop: 10 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            color: "gray",
          }}
        >
          Thời hạn: {formatDate(job["deadline"])}
        </Text>
        <Text style={{ fontSize: 16, marginVertical: 10 }} numberOfLines={10}>
          Ngân sách: {job["bids"]}
        </Text>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <ModalDetailJob setModalVisible={setModalVisible} job={job} />
      </Modal>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 10,
    paddingVertical: 10,
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
