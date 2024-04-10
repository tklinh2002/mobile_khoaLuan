import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Linking,
  TouchableOpacity,
} from "react-native";
import Skill from "../../freelancerScreen/findJobScreen/skill";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { formatDate } from "../../../utils/format";
import { getJobApi } from "../../../apis/job.api";
import { useRoute } from "@react-navigation/native";

const DetailJob = () => {
  const route = useRoute();
  const id = route.params["id"];
  const queryClient = useQueryClient();
  const job = queryClient.getQueryData(["job", id]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{job["title"]}</Text>
      <Text style={styles.text}>Mô tả công việc: {job["desc"]}</Text>
      <Text style={styles.text}>Chi tiết công việc: {job["content"]}</Text>
      <Text style={styles.text}>Ngân sách: {job["bids"]}</Text>
      <Text style={styles.text}>Thời hạn: {formatDate(job["deadline"])}</Text>
      <Text style={styles.text}>Kỹ năng</Text>
      <View style={styles.containerSkill}>
        {job["skills"]?.map((skill) => (
          <Skill key={skill.skill_id} name={skill.skill_name} />
        ))}
      </View>
      <Image
        source={{ uri: job["thumbnail"] }}
        style={{ width: 200, height: 200 }}
      />
      <TouchableOpacity onPress={() => Linking.openURL(job["content_file"])}>
        <Text style={{fontStyle:"italic"}}>{String(job["content_file"]).split("/").pop()}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: "green",
    borderWidth: 1,
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
export default DetailJob;
