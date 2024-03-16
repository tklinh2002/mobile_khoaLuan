import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import Skill from "./skill";
import { ScrollView } from "react-native-gesture-handler";
import { Button } from "react-native-paper";
import ModalDetailJob from "../../component/modalDetailJob";
import { useState } from "react";
import ModalApplyJob from "./modalApplyJob";
const Job = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleApply, setModalVisibleApply] = useState(false);
  
  return (
    <View style={styles.container}>
      <View>
        <Text>Đăng 5 giờ trước</Text>
        <Text style={styles.title}>Frontend</Text>
        <Text numberOfLines={4}>Mô tả công việc</Text>
      </View>
      <View style={styles.skillContainer}>
        <Skill name="React" />
        <Skill name="React Native" />
        <Skill name="NodeJS" />
        <Skill name="Express" />
        <Skill name="MongoDB" />
        <Skill name="MongoDB" />
      </View>
      <View>
        <Text style={styles.text}>Ngân sách: 1000$</Text>
        <Text style={styles.text}>Proposal: 20</Text>
        <Text style={styles.text}>Số lượng đã ứng tuyển: 10</Text>
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
        <ModalDetailJob setModalVisible={setModalVisible}/>
      </Modal>
      {/* modal ứng tuyển */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleApply}
      >
        <ModalApplyJob setModalVisible={setModalVisibleApply}/>
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
