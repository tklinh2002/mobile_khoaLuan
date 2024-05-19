import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Touchable,
  TouchableOpacity,
  Linking,
  Image,
} from "react-native";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import { formatDate } from "../../../utils/format";
import Skill from "./skill";
const ModalDetailJobF = ({ setModalVisible, job }) => {
  console.log(job);
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
        <Image
          source={{ uri: job?.thumbnail }}
          style={{ width: 200, height: 200 }}
          resizeMode="contain"
        />
        <View style={styles.content}>
          <Text style={styles.title}>{job?.title}</Text>
          <Text style={styles.text}>Mô tả công việc: {job?.desc}</Text>
          <Text style={styles.text}>Chi tiết công việc: {job?.content}</Text>
          <Text style={styles.text}>Ngân sách: {job?.bids}</Text>
          <Text style={styles.text}>Thời hạn: {formatDate(job?.deadline)}</Text>
        </View>

        <Text>Kỹ năng yêu cầu</Text>
        <View style={styles.containerSkill}>
          {job?.skills.map((skill) => {
            return <Skill key={skill?.skill_id} name={skill?.skill_name} />;
          })}
        </View>

        <Text style={styles.text}>File đính kèm</Text>
        <TouchableOpacity
          style={{ width: 300 }}
          onPress={() => Linking.openURL(job?.content_file)}
        >
          <IconAntDesign name="file1" size={60} />
          <Text style={styles.text} numberOfLines={2}>
            {String(job?.content_file).split("/").pop()}
          </Text>
        </TouchableOpacity>
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
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    paddingVertical: 30,
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
    marginVertical: 10,
    textAlign: "left",
  },
  containerSkill: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
export default ModalDetailJobF;
