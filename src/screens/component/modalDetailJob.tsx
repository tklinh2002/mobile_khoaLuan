import { View, Text, StyleSheet, ScrollView } from "react-native";
import Skill from "../freelancerScreen/findJobScreen/skill";
import { Title } from "react-native-paper";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import { formToJSON } from "axios";
import { formatDate } from "../../utils/format";
const ModalDetailJob = ({ setModalVisible , job}) => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text style={[styles.title, { fontSize: 30, textAlign: "center" }]}>
            Chi tiết công việc
          </Text>
          <IconAntDesign
            name="closecircle"
            size={30}
            color="black"
            style={{ position: "absolute", top: 10, right: 10 }}
            onPress={() => setModalVisible(false)}
          />
        </View>
        <Text style={styles.title}>{job["title"]}</Text>
        <Text style={styles.text}>Mô tả công việc: {job["desc"]}</Text>
        <Text style={styles.text}>Chi tiết công việc: {job["content"]}</Text>
        <Text style={styles.text}>Ngân sách: {job["bids"]}</Text>
        <Text style={styles.text}>Thời hạn: {formatDate(job["deadline"])}</Text>
        <Text style={styles.text}>Kỹ năng</Text>
        <View style={styles.containerSkill}>
          <Skill name="Java" />
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    backgroundColor: "white",
    flex: 1,
    borderColor: "black",
    borderWidth: 3,
    borderRadius: 10,
    padding: 10,
    marginTop: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "green",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: "400",
    color: "black",
    marginBottom: 5,
    padding: 5,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 10,
    textAlign: "left",
  },
  containerSkill: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
export default ModalDetailJob;
