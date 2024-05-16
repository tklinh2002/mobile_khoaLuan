import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import IconEntypo from "react-native-vector-icons/Entypo";
import Talent from "./talent";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Panigation from "../../component/pagination";
import { useState } from "react";
import { getListFreelancerApi } from "../../../apis/info.api";
import { getListMyPostApi } from "../../../apis/job.api";
import { AuthContext } from "../../../utils/context";
const TalentScreen = ({ navigation }) => {
  const [page, setpage] = useState(1);
  const queryClient = useQueryClient();
  const { infoLogin, login, logout } = useContext(AuthContext);
  const token = infoLogin["access_token"];
  const listFreelancer = useQuery({
    queryKey: ["listFreelancer", page],
    queryFn: async () =>
      getListFreelancerApi(page, 10, "", "", "", token).then(
        (res) => res.data.data
      ),
  });
  const listPost = useQuery({
    queryKey: ["listpost"],
    queryFn: async (_) =>
      getListMyPostApi(page, 100, 1, token).then((res) => {
        queryClient.setQueryData(["listpost"], res.data.data);
        return res.data.data;
      }),
  }); 
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
        {/* listFreelancer */}
        {listFreelancer.isLoading || listPost.isLoading ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          // Render data if none is loading 
          listFreelancer.data?.data.map((item) => (
            <Talent
              key={item["username"]}
              navigation={navigation}
              talent={item}
            />
          ))
        )}
      <Panigation setpage={setpage} length={listPost?.data?.total} />
      </ScrollView>
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
