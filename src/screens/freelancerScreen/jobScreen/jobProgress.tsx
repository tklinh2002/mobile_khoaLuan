import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal } from "react-native";
import { Button } from "react-native-paper";
import { useState } from "react";
import ModalReportProgess from "../../component/modalReportProgess";
import ModalDetailContract from "../../component/modalDetailContract";
const JobProgress = () => {
  const [modalVisibleProgess, setModalVisibleProgess] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.container}>
      <View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            style={{ width: 50, height: 50, borderRadius: 20 }}
            source={require("../../../assets/avatar_temp.jpg")}
          />
          <Text style={styles.text}>Tên Client</Text>
        </View>
        <Text style={styles.title}>Frontend</Text>
        <View>
          <Text style={styles.text}>Ngân sách: 1000$</Text>
          <Text style={styles.text}>Ngày hoàn thành: 20/07/2024</Text>
          <Text style={styles.text}>Số task đã hoàn thành: 2/5</Text>
        </View>
      </View>
      <View style={styles.containerButton}>
        <TouchableOpacity onPress={()=>setModalVisibleProgess(true)}>
          <Button
            mode="contained"
            style={{ margin: 5, backgroundColor: "#E0970A" }}
          >
            Báo cáo task
          </Button>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>setModalVisible(true)}>
          <Button mode="contained" style={{ margin: 5 }}>
            Xem hợp đồng
          </Button>
        </TouchableOpacity>
      </View>
      <Modal animationType="slide" visible={modalVisibleProgess}>
        <ModalReportProgess setmodalvisiable={setModalVisibleProgess} typeUser={"client"} />
      </Modal>
      <Modal animationType="slide" visible={modalVisible}>
        <ModalDetailContract setmodalvisiable={setModalVisible} />
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
    backgroundColor: "green",

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
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
  }
});
export default JobProgress;
