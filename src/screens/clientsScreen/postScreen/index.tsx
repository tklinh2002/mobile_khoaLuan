import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import Header from "../../component/header";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import Job from "./job";
import ModalJob from "../jobScreen/modalJob";
import React, { useState } from "react";
import Panigation from "../../component/pagination";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getListPostApi } from "../../../apis/job.api";
import { getListSkill } from "../../../apis/auth.api";
const PostScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [page, setPage] = useState(1);
  const handCreateJob = () => {
    setModalVisible(true);
  };

  const queryClient = useQueryClient();
  const infoLogin = queryClient.getQueryData(["infoLogin"]);
  const token = infoLogin["access_token"];
  const listPost = useQuery({
    queryKey: ["listpostopen", page],
    queryFn: async (_) => getListPostApi(page, 10, 1,token).then((res) => {
      return res.data.data
    }),
  });
  
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: 10,
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <Text style={{ fontSize: 25, fontWeight: "500", flex: 1 }}>
          Danh sách job đăng
        </Text>
        <TouchableOpacity onPress={handCreateJob}>
          <View style={styles.button}>
            <IconAntDesign name="plus" size={30} color="white" />
            <Text style={{ fontSize: 20, fontWeight: "500", color: "white" }}>
              Tạo job
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView style={{ height: "85%" }}>
        {listPost.data?.data?.map((job) => (
          <Job key={job.id} job={job} navigation={navigation} />
        ))}
      </ScrollView>

      <Panigation setpage={setPage} length={10} />
      {/* modal */}

      <Modal visible={modalVisible} animationType="slide">
        <ModalJob setModalVisible={setModalVisible} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "green",
    padding: 5,
    borderRadius: 10,
    flexDirection: "row",
    marginRight: 20,
  },
});
export default PostScreen;
