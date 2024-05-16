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
import ModalDetailJob from "../../component/modalDetailJob";
import { useState } from "react";
import { formatDate } from "../../../utils/format";
const JobApply = ({ job }) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title} numberOfLines={5}>
          {job?.title}
        </Text>
        <View>
          <Text style={styles.text}>Ngân sách: {job?.bids}</Text>
          <Text style={styles.text}>
            Ngày ứng tuyển: {formatDate(job?.created_at)}
          </Text>
        </View>
      </View>
      <View style={styles.containerButton}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Button
            mode="contained"
            style={{ margin: 5, backgroundColor: "#E0970A" }}
          >
            Xem chi tiết
          </Button>
        </TouchableOpacity>

        <Text style={[styles.text, {color:job?.job_ap_status == 1 ? "green" : "red", fontWeight:"bold"}]}>
          {job?.job_ap_status == 1 ? "Chờ xác nhận" : "Đã bị từ chối"}
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
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
  },
});
export default JobApply;
