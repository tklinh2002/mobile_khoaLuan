import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Button } from "react-native-paper";
import { useState } from "react";
import ModalDetailContract from "../../component/modalDetailContract";
import ModalReportProgess from "../../component/modalReportProgess";
const ContractProgess = ({ contract }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleProgess, setModalVisibleProgess] = useState(false);
  return (
    <View style={styles.container}>
      <View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.text}>{contract?.title}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Button
          mode="contained"
          style={{ margin: 5, backgroundColor: "#E0970A" }}
        >
          Xem chi tiết
        </Button>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Button mode="contained" style={{ margin: 5 }}>
            Xem hợp đồng
          </Button>
        </TouchableOpacity>
      <Modal animationType="slide" visible={modalVisibleProgess}>
        <ModalReportProgess
          setmodalvisiable={setModalVisibleProgess}
          jobId={contract?.jobIdcurent}
        />
      </Modal>
      <Modal animationType="slide" visible={modalVisible}>
        <ModalDetailContract
          setmodalvisiable={setModalVisible}
          contract={contract}
        />
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: "green",
    borderWidth: 1,
    borderRadius: 10,
    margin: 10,
    padding: 10,
    backgroundColor: "#2DB3F6",
  },
  text: {
    margin: 3,
    fontSize: 16,
    color: "white",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 5,
    color: "white",
  },
  containerButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
export default ContractProgess;
