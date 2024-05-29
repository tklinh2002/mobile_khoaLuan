import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Linking,
  TouchableOpacity,
} from "react-native";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRoute } from "@react-navigation/native";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import Skill from "../freelancerScreen/findJobScreen/skill";
import { formatDate } from "../../utils/format";
import { useJobContract } from "../../hook/hook";
const ModalDetailJobContract = ({ setModalVisible, jobId }) => {
  const { detailJob } = useJobContract(jobId);
  if (detailJob.isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  console.log("detailJob.data", detailJob.data);
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView style={styles.container}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: 30,
          }}
        >
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
        <Text style={styles.title}>{detailJob.data?.title}</Text>
        <Text style={styles.text}>Mô tả công việc: {detailJob.data?.desc}</Text>
        <Text style={styles.text}>
          Nội dung công việc: {detailJob.data?.content}
        </Text>
        <Text style={styles.text}>Ngân sách: {detailJob.data?.bids}</Text>
        <Text style={styles.text}>
          Thời hạn: {formatDate(detailJob.data?.deadline)}
        </Text>
        <Text style={styles.text}>Kỹ năng</Text>
        <View style={styles.containerSkill}>
          {detailJob.data?.skills?.map((skill) => (
            <Skill key={skill.skill_id} name={skill.skill_name} />
          ))}
        </View>
        <Image
          source={{ uri: detailJob.data?.thumbnail }}
          style={{ width: 200, height: 200 }}
        />
        <TouchableOpacity
          style={{ width: 300, marginTop: 10 }}
          onPress={() => Linking.openURL(detailJob.data?.content_file)}
        >
          <IconAntDesign name="file1" size={60} />
          <Text style={{ fontStyle: "italic" }} numberOfLines={2}>
            {String(detailJob.data?.content_file).split("/").pop()}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 10,
    padding: 10,
    margin: 10,
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
export default ModalDetailJobContract;
