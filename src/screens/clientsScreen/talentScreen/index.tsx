import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import IconEntypo from "react-native-vector-icons/Entypo";
import Talent from "./talent";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Panigation from "../../component/pagination";
import { useState } from "react";
import { getListFreelancerApi } from "../../../apis/info.api";
import { getListPostApi } from "../../../apis/job.api";
const TalentScreen = ({ navigation }) => {
  const [page, setpage] = useState(1);
  const queryClient = useQueryClient();
  const infoLogin = queryClient.getQueryData(["infoLogin"]);
  const token = infoLogin["access_token"];
  const listFreelancer = useQuery({
    queryKey: ["listFreelancer", page],
    queryFn: async () =>
      getListFreelancerApi(page, 10, "", "", "",token).then((res) => res.data.data),
  });
  const listPost = useQuery({
    queryKey: ["listpost"],
    queryFn: async (_) => getListPostApi(page, 100, 1, token).then((res) => {
      queryClient.setQueryData(["listpost"], res.data.data)
      return res.data.data
    }),
  });
  if(listFreelancer.isLoading || listPost.isLoading) return <Text>Loading...</Text>
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Tìm Ứng Viên</Text>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} placeholder="Nhập ....." />
          <TouchableOpacity style={styles.buttonSeacrh}>
            <IconEntypo name="magnifying-glass" size={30} color="white" />
          </TouchableOpacity>
        </View>

        {listFreelancer.data?.data.map((item) => (
          <Talent key={item["username"]} navigation={navigation} talent={item} />
        ))}
      </ScrollView>
      <Panigation setpage={setpage} length={10} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    paddingHorizontal: 10,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    marginTop: 10,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    paddingHorizontal: 10,
  },
  buttonSeacrh: {
    padding: 10,
    backgroundColor: "#0866FF",
  },
});

export default TalentScreen;
