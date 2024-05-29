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
import { useRoute } from "@react-navigation/native";
import  IconAntDesign from "react-native-vector-icons/AntDesign";
const DetailJob = () => {
  const route = useRoute();
  const id = route.params["id"];
  const queryClient = useQueryClient();
  const job = queryClient.getQueryData(["job", id]) as any;
  return (
    <ScrollView style={styles.container} >
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
      <TouchableOpacity
          style={{ width: 300, marginTop: 10}}
          onPress={() => Linking.openURL(job?.content_file)}
        >
          <IconAntDesign name="file1" size={60} />
          <Text style={{fontStyle:"italic"}} numberOfLines={2}>
            {String(job?.content_file).split("/").pop()}
          </Text>
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
