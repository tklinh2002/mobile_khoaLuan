import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import Skill from "./skill";
import { ScrollView } from "react-native-gesture-handler";
import { Button } from "react-native-paper";
import ModalDetailJob from "../../component/modalDetailJob";
import { useState } from "react";
import ModalApplyJob from "./modalApplyJob";
import { formatDate, formatTimePost } from "../../../utils/format";
import { useQueryClient } from "@tanstack/react-query";
const Job = ({ job }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleApply, setModalVisibleApply] = useState(false);
  const queryClient = useQueryClient();
  const jobApllied = queryClient.getQueryData(["jobApplied"]) as any[];
  return (
    <View style={styles.container}>
      <View>
        <Text>{formatTimePost(job["created_at"])}</Text>
        <Text style={styles.title}>{job["title"]}</Text>
        <Text numberOfLines={4}>{job["desc"]}</Text>
      </View>
      <View style={styles.skillContainer}>
        {job?.Skills.map((skill) => {
          return <Skill key={skill?.id} name={skill?.name} />;
        })}
      </View>
      <View>
        <Text style={styles.text}>Ngân sách: {job["bids"]}</Text>
        <Text style={styles.text}>Proposal: {job["min_proposals"]}</Text>
        <Text style={styles.text}>
          Ngày hết hạn: {formatDate(job["deadline"])}
        </Text>
      </View>
      {jobApllied.some((item) => item.job_id == job["id"]) ? (
        <Button mode="contained" style={{ marginVertical: 10, backgroundColor:"#A1A1A1" }}>
          Đã ứng tuyển
        </Button>
      ) : (
        <TouchableOpacity onPress={() => setModalVisibleApply(true)}>
          <Button mode="contained" style={{ marginVertical: 10 }}>
            Ứng tuyển
          </Button>
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Button mode="outlined" style={{ marginVertical: 10 }}>
          Xem chi tiết
        </Button>
      </TouchableOpacity>
      {/* modal chi tiết */}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <ModalDetailJob setModalVisible={setModalVisible} job={job} />
      </Modal>
      {/* modal ứng tuyển */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleApply}
      >
        <ModalApplyJob setModalVisible={setModalVisibleApply} job={job} />
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    borderColor: "black",
    borderWidth: 1,
    margin: 10,
    borderRadius: 10,
    height: "auto",
    padding: 10,
  },
  skillContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
    justifyContent: "center",
  },
  text: {
    margin: 3,
    fontSize: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 5,
  },
});
export default Job;
