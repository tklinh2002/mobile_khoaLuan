import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  ActivityIndicator,
} from "react-native";
import Header from "../../component/header";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import Job from "./job";
import ModalJob from "./modalJob";
import React, { useState } from "react";
import Panigation from "../../component/pagination";
import {
  InvalidateQueryFilters,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { getListMyPostApi } from "../../../apis/job.api";
import { getListSkill } from "../../../apis/auth.api";
import { Button, RadioButton, TextInput } from "react-native-paper";
import IconEvilIcons from "react-native-vector-icons/EvilIcons";
const PostScreen = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [statusJob, setStatusJob] = useState("1");
  const TextstatusJob = [
    "Ẩn",
    "Mở ứng tuyển",
    "Đóng ứng tuyển",
    "Đang được thực hiện",
  ];
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleStatusJob, setModalVisibleStatusJob] = useState(false);
  const [page, setPage] = useState(1);
  const handCreateJob = () => {
    setModalVisible(true);
  };

  const queryClient = useQueryClient();
  const infoLogin = queryClient.getQueryData(["infoLogin"]);
  const token = infoLogin["access_token"];
  const listPost = useQuery({
    queryKey: ["listpostopen", page],
    queryFn: async (_) =>
      getListMyPostApi(page, 10, statusJob, token).then((res) => {
        return res.data.data;
      }),
  });
  const getListSkill1 = useQuery({
    queryKey: ["listSkills"],
    queryFn: async () =>
      getListSkill(token).then((res) => {
        queryClient.setQueryData(["listSkills"], res.data.data);
        return res.data.data;
      }),
  });

  if (listPost.isLoading || getListSkill1.isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  return (
    <View style={{flex:1}}>
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
      <View style={styles.searchContainer}>
        <TextInput
          mode="outlined"
          style={{ flex: 1 }}
          placeholder="Tìm kiếm job"
          onChangeText={(text) => setSearch(text)}
        />
        {/* <TouchableOpacity
          onPress={handFindJob}
          style={{
            borderColor: "black",
            borderWidth: 1,
            borderLeftWidth: 0,
            justifyContent: "center",
            backgroundColor: "green",
          }}
        >
          <IconEvilIcons name="search" size={50} color="white" />
        </TouchableOpacity> */}
      </View>
      <View>
        <TouchableOpacity onPress={() => setModalVisibleStatusJob(true)}>
          <Text style={{ marginLeft: 10, fontStyle: "italic", color: "blue" }}>
            Chọn trạng thái job:{TextstatusJob[statusJob]}
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView >
        {listPost.data?.data?.map((job) => (
          <Job key={job.id} job={job} navigation={navigation} />
        ))}
      </ScrollView>
      <Panigation setpage={setPage} length={listPost.data.total} />

      {/* modal tạo job */}
      <Modal visible={modalVisible} animationType="slide">
        <ModalJob setModalVisible={setModalVisible} />
      </Modal>
        {/* modal status job */}
      <Modal
        animationType="slide"
        visible={modalVisibleStatusJob}
        transparent={true}
        onRequestClose={() => {
          setModalVisibleStatusJob(!modalVisibleStatusJob);
        }}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View
            style={{ backgroundColor: "white", width: "70%", height: "30%" }}
          >
            <RadioButton.Group
              onValueChange={(value) => setStatusJob(value)}
              value={statusJob}
            >
              {Array.from({ length: 4 }).map((_, i) => (
                <View style={styles.checkboxContainer} key={i}>
                  <RadioButton value={i + ""} />
                  <Text>{TextstatusJob[i]}</Text>
                </View>
              ))}
            </RadioButton.Group>
            <Button
              style={{ margin: 10 }}
              mode="contained"
              onPress={async () => {
                setModalVisibleStatusJob(!modalVisibleStatusJob);
                setPage(1);
                const rs = await queryClient.invalidateQueries({
                  queryKey: ["listpostopen", page],
                });
              }}
            >
              Xác nhận
            </Button>
          </View>
        </View>
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
  searchContainer: {
    marginHorizontal: 10,
    marginVertical: 10,
    flexDirection: "row",
  },
  checkboxContainer: {
    flexDirection: "row",
    margin: 5,
    alignItems: "center",
  },
});
export default PostScreen;
