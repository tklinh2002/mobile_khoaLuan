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
import ModalReportProgess from "../../component/modalReportProgess";
import ModalDetailContract from "../../component/modalDetailContract";
import { useQueryClient } from "@tanstack/react-query";
import { useContract } from "../../../hook/hook";
const JobProgress = ({ job }) => {
  const { getContractsByFreelancerId } = useContract({
    freelancerId: job?.freelancer_id,
  });
  const [modalVisibleProgess, setModalVisibleProgess] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  // console.log(getContractsByFreelancerId.data)
  const contract = getContractsByFreelancerId.data?.find(
    (contract) => contract.jobIdcurent === job.id
  );
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{job?.title}</Text>
        <View>
          <Text style={styles.text}>Ngân sách: {job?.bids}</Text>
        </View>
      </View>
      <View style={styles.containerButton}>
        <TouchableOpacity onPress={() => setModalVisibleProgess(true)}>
          <Button
            mode="contained"
            style={{ margin: 5, backgroundColor: "#E0970A" }}
          >
            Báo cáo task
          </Button>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Button mode="contained" style={{ margin: 5 }}>
            Xem hợp đồng
          </Button>
        </TouchableOpacity>
      </View>
      <Modal animationType="slide" visible={modalVisibleProgess}>
        <ModalReportProgess
          setmodalvisiable={setModalVisibleProgess}
          jobId={job.id}
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
  },
});
export default JobProgress;
