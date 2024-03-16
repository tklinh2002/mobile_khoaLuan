import { View, Text, StyleSheet, ScrollView } from "react-native";
import Skill from "../freelancerScreen/findJobScreen/skill";
import { Title } from "react-native-paper";
import IconAntDesign from "react-native-vector-icons/AntDesign";
const ModalDetailJob = ({ setModalVisible }) => {
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
        <Text style={styles.title}>FrontEnd</Text>
        <Text style={styles.text}>Mô tả công việc:</Text>
        <Text style={styles.text}>Chi tiết công việc</Text>
        <Text style={styles.text}>Ngân sách: 1000</Text>
        <Text style={styles.text}>Thời hạn: 28/08/2024</Text>
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
