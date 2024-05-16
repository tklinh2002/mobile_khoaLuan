import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Image,
} from "react-native";

import { useState } from "react";
import { Button } from "react-native-paper";
import ModalDetailContract from "../../component/modalDetailContract";
import ModalReportProgess from "../../component/modalReportProgess";
const Contract = ({ contract }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleTask, setModalVisibleTask] = useState(false);
  const i = contract?.status;
  const status = {
    0: {
      text: "Freelancer chưa ký",
      color: "#C46E41",
    },
    1: {
      text: "Đang thực hiện", // freelancer ký
      color: "#0866FF",
    },
    2: {
      text: "Chờ xác nhận hoàn thành", // freelancer báo hoàn thành
      color: "#00AD85",
    },
    3: {
      text: "Đã hoàn thành", // client xác nhận hợp đồng và kết thúc
      color: "green",
    },
    4: {
      text: "Freelancer hủy", // freelancer hủy
      color: "red",
    },
    5: {
      text: "Client hủy", // client hủy
      color: "red",
    },
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "green",
              marginHorizontal: 10,
            }}
          >
            {contract?.title}
          </Text>
          <View style={{ marginLeft: 10, marginTop: 10 }}></View>
        </View>
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <View
          style={[
            styles.button,
            { padding: 10 },
            { backgroundColor: status[i].color },
          ]}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "700",
              marginHorizontal: 10,
              color: "white",
            }}
          >
            {status[i].text}
          </Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Button
          mode="contained"
          style={{ marginHorizontal: 10, marginVertical: 10, borderRadius: 10 }}
        >
          Xem chi tiết hợp đồng
        </Button>
      </TouchableOpacity>
      {contract?.status != 0 && (
        <TouchableOpacity onPress={() => setModalVisibleTask(true)}>
          <Button
            mode="contained"
            style={{
              marginHorizontal: 10,
              marginVertical: 10,
              borderRadius: 10,
              backgroundColor: "green",
            }}
          >
            Xem báo cáo task
          </Button>
        </TouchableOpacity>
      )}
      {/* modal task */}
      <Modal visible={modalVisibleTask} animationType="slide">
        <ModalReportProgess
          setmodalvisiable={setModalVisibleTask}
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
export default Contract;
