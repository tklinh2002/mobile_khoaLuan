import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Touchable,
  TouchableOpacity,
  Linking,
} from "react-native";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import { formatDate } from "../../utils/format";
const ModalDetailJob = ({ setModalVisible, job }) => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text style={[styles.title, { fontSize: 30, textAlign: "center" }]}>
            Chi tiết ứng tuyển
          </Text>
          <IconAntDesign
            name="closecircle"
            size={30}
            color="black"
            style={{ position: "absolute", top: 10, right: 10 }}
            onPress={() => setModalVisible(false)}
          />
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>{job?.title}</Text>
          <Text style={styles.text}>Mô tả công việc: {job?.desc}</Text>
          <Text style={styles.text}>Chi tiết công việc: {job?.content}</Text>
          <Text style={styles.text}>Ngân sách: {job?.bids}</Text>
          <Text style={styles.text}>Thời hạn: {formatDate(job?.deadline)}</Text>
        </View>

        <View style={styles.content}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              color: "green",
              fontWeight: "bold",
            }}
          >
            Thông tin ứng tuyển
          </Text>
          <Text style={styles.text}>Giới thiệu: {job?.cover_letter}</Text>
          <View>
            <Text style={[styles.text, { fontStyle: "italic" }]}>CV: </Text>
            <TouchableOpacity onPress={()=>Linking.openURL(job?.content_file)}>
              <IconAntDesign name="filetext1" size={70} color="black" />
            </TouchableOpacity>
          </View>
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
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    marginVertical: 40,
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
export default ModalDetailJob;
