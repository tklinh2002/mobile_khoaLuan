import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import Skill from "./skill";
import { ScrollView } from "react-native-gesture-handler";
import { Button } from "react-native-paper";
import ModalDetailJob from "../../component/modalDetailJob";
import { useState } from "react";
import ModalApplyJob from "./modalApplyJob";
import { formatDate, formatTimePost } from "../../../utils/format";
const Job = ({job}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleApply, setModalVisibleApply] = useState(false);
  
  return (
    <View style={styles.container}>
      <View>
        <Text>{formatTimePost(job["created_at"])}</Text>
        <Text style={styles.title}>{job["title"]}</Text>
        <Text numberOfLines={4}>{job["desc"]}</Text>
      </View>
      <Text style={styles.text}>API không có trường skill</Text>
      <View style={styles.skillContainer}>
        <Skill name="React" />
        <Skill name="React Native" />
        <Skill name="NodeJS" />
        <Skill name="Express" />
        <Skill name="MongoDB" />
        <Skill name="MongoDB" />
      </View>
      <View>
        <Text style={styles.text}>Ngân sách: {job["bids"]}</Text>
        <Text style={styles.text}>Proposal: {job["min_proposals"]}</Text>
        <Text style={styles.text}>Ngày hết hạn: {formatDate(job["deadline"])}</Text>
      </View>
      <TouchableOpacity onPress={()=>setModalVisibleApply(true)}>
        <Button mode="contained" style={{ marginVertical: 10 }}>
          Ứng tuyển
        </Button>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>setModalVisible(true)}>
        <Button mode="outlined" style={{ marginVertical: 10 }}>
          Xem chi tiết
        </Button>
      </TouchableOpacity>
      {/* modal chi tiết */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <ModalDetailJob setModalVisible={setModalVisible} job={job}/>
      </Modal>
      {/* modal ứng tuyển */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleApply}
      >
        <ModalApplyJob setModalVisible={setModalVisibleApply} job={job}/>
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
