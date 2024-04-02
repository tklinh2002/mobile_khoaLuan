import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TouchableHighlight,
  Keyboard,
  TouchableNativeFeedback,
  ScrollView,
  Modal,
} from "react-native";
import Header from "../../component/header";
import IconEntypo from "react-native-vector-icons/Entypo";
import { useState } from "react";
import ModalFind from "./modalFind";
import Panigation from "../../component/pagination";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getListJobApiF, jobApllied } from "../../../apis/job.apiF";
import Job from "./job";
const PAGE_SIZE = 5;
const length = 40; // total number of items
const FindJodScreen = ({ navigation }) => {
  const queryClient = useQueryClient();
  const infoLogin = queryClient.getQueryData(["infoLogin"]);
  const token = infoLogin["access_token"];
  const [modalVisible, setModalVisible] = useState(false);
  const [page, setPage] = useState(1);
  const jobApplied = useQuery({
    queryKey: ["jobApplied"],
    queryFn: async () => jobApllied(token).then((res) => {
      queryClient.setQueryData(["jobApplied"], res.data.data.data);
      return res.data.data;
    }),
  });

  const getListJob = useQuery({
    queryKey: ["jobs", page],
    queryFn: async () =>
       getListJobApiF(page, 10, null, null, null, null, null, token).then(
        (res) => res.data.data
      ),
  });
  return (
    <TouchableNativeFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ScrollView style={styles.container}>
        <Text style={{ fontSize: 30, fontWeight: "bold", marginLeft: 10 }}>
          Tìm công việc
          
        </Text>
        {/* tìm kiếm */}
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} placeholder="Nhập ....." />
          <TouchableOpacity style={styles.buttonSeacrh}>
            <IconEntypo name="magnifying-glass" size={30} color="white" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={{ margin: 10, fontStyle: "italic", color: "green" }}>
            Tìm kiếm nâng cao
          </Text>
        </TouchableOpacity>
        {/* danh sách công việc */}
        {getListJob.data?.data?.map((job) => (
          <Job job={job} key={job.id} />
        ))}
        {/* phân trang */}

        <Panigation length={length} setpage={setPage} />

        {/*Modal tìm kiếm*/}

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <ModalFind setModalVisible={setModalVisible} />
        </Modal>
      </ScrollView>
    </TouchableNativeFeedback>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  paginationContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 40,
  },
  paginationButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#007bff",
    borderRadius: 5,
    width: 110,
    alignItems: "center",
  },
  paginationButtonText: {
    color: "white",
    fontSize: 16,
  },
  paginationText: {
    fontSize: 16,
    marginHorizontal: 10,
    textAlign: "center",
  },
});
export default FindJodScreen;
