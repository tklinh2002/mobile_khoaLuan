import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import IconEntypo from "react-native-vector-icons/Entypo";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { formatDate } from "../../../utils/format";
import { deletePostApi, getJobApi } from "../../../apis/job.api";
import ModalEditJob from "./modalEditJob";
const Job = ({ navigation, job }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleEdit, setModalVisibleEdit] = useState(false);
  const queryClient = useQueryClient();
  const infoLogin = queryClient.getQueryData(["infoLogin"]);
  const token = infoLogin["access_token"];
  const handDetailJob = () => {
    navigation.navigate("TabDetailJob", { data: { jobid: job["id"] } });
  };
  const deletePost = useMutation({
    mutationFn: () => deletePostApi(job["id"], token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listpostopen"] });
      alert("Xóa bài đăng thành công");
      setModalVisible(false);
    },
    onError: (error) => {
      alert("Xóa bài đăng thất bại");
      console.log(error);
    },
  });
  const handDeletePost = async () => {
    deletePost.mutate();
  };
  const detailJob = useQuery({
    queryKey: ["job", job["id"]],
    queryFn: async () => {
      return await getJobApi(job["id"], token).then((res) => {
        queryClient.setQueryData(["job", job["id"]], res.data.data);
        return res.data.data;
      });
    },
  });
  return (
    <TouchableOpacity style={styles.container} onPress={handDetailJob}>
      {deletePost.isPending && (
        <View
          style={{
            ...StyleSheet.absoluteFillObject, // Đặt spinner ở vị trí tuyệt đối
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          color: "green",
          marginHorizontal: 10,
        }}
      >
        {job.title}
      </Text>
      <View style={{ marginLeft: 10, marginTop: 10 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            color: "gray",
          }}
        >
          Ngày tạo: {formatDate(job.created_at)}
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            color: "gray",
          }}
        >
          Ngày hết hạn: {formatDate(job.deadline)}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginHorizontal: 10,
        }}
      >
        <View>
          {detailJob.data && (
            <Text style={styles.text}>
              {detailJob.data["applied_count"] || 0}
            </Text>
          )}
          <Text style={{ fontSize: 20 }}>Ứng tuyển</Text>
        </View>
        <View>
          <Text style={styles.text}>0</Text>
          <Text style={{ fontSize: 20 }}>Lời mời</Text>
        </View>
        <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
          <View style={styles.button2}>
            <IconEntypo name="dots-three-horizontal" size={16} color="green" />
          </View>
        </TouchableWithoutFeedback>
      </View>

      {/* modal optinal*/}
      <Modal animationType="slide" visible={modalVisible} transparent={true}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity style={styles.input} onPress={handDeletePost}>
                <Text
                  style={[styles.text, { color: "red", paddingVertical: 10 }]}
                >
                  Ẩn bài đăng
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.input}
                onPress={() => {
                  setModalVisibleEdit(true);
                  setModalVisible(false);
                }}
              >
                <Text
                  style={[styles.text, { color: "red", paddingVertical: 10 }]}
                >
                  Sửa bài đăng
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.input}
                onPress={() => setModalVisible(false)}
              >
                <Text style={[styles.text, { paddingVertical: 10 }]}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Modal animationType="slide" visible={modalVisibleEdit}>
        <ModalEditJob
          job_id={job["id"]}
          setModalVisible={setModalVisibleEdit}
        />
      </Modal>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  button: {
    borderWidth: 1,
    borderColor: "green",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
    marginVertical: 10,
    height: 40,
    flex: 1,
  },
  button2: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
    marginVertical: 10,
    height: 40,
    width: 40,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalContent: {
    width: "100%", // Chiều rộng đầy đủ
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20, // Góc bo trên cùng bên trái
    borderTopRightRadius: 20, // Góc bo trên cùng bên phải
    elevation: 5,
  },
  text: {
    fontSize: 20,
    fontWeight: "700",
  },
  input: {
    borderBottomWidth: 0.5,
    borderColor: "gray",
  },
});
export default Job;
