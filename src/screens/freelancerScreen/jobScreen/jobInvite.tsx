import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Button } from "react-native-paper";

import { useState } from "react";
import { formatTimeTask } from "../../../utils/format";

import { useJobInvite, useNotification } from "../../../hook/hook";
import ModalDetailJobInvite from "./modalDetailJobInvite";
import ModalLoading from "../../component/modalLoading";
import { INotiParams } from "../../../apis/type.task.api";
import { useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../../utils/context";

const JobInvite = ({ job }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { acceptInvite, getListInvite } = useJobInvite();
  const { infoLogin, login, logout } = useContext(AuthContext);
  const { sendNotication } = useNotification();
  const handleConfirm = async () => {
    acceptInvite
      .mutateAsync({ jobid: job?.job_info?.id, status: 1 })
      .then(() => {
        const data: INotiParams = {
          title: `Thông báo`,
          message: `${infoLogin["user"]?.username} đã đồng ý lời mời làm việc của bạn`,
          smail: 1,
          linkable: `client/post/${job?.job_info?.id}`,
          imagefile: null,
          user_type: "client",
          user_id: job?.client_info?.id,
        };
        sendNotication
          .mutateAsync(data)
          .then(() => {
            console.log("Gửi thông báo thành công");
          })
          .catch((err) => {
            console.log(err.response.data);
          });
        alert("Chấp nhận thành công");
        getListInvite.refetch();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleReject = async () => {
    acceptInvite
      .mutateAsync({ jobid: job?.job_info?.id, status: -1 })
      .then(() => {
        const data: INotiParams = {
          title: `Thông báo`,
          message: `${infoLogin["user"]?.username} đã từ chối lời mời làm việc của bạn`,
          smail: 1,
          linkable: `client/post/${job?.job_info?.id}`,
          imagefile: null,
          user_type: "client",
          user_id: job?.client_info?.id,
        };
        sendNotication
          .mutateAsync(data)
          .then(() => {
            console.log("Gửi thông báo thành công");
          })
          .catch((err) => {
            console.log(err.response.data);
          });
        alert("Chấp nhận thành công");
        getListInvite.refetch();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <View style={styles.container}>
      <View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            style={{ width: 100, height: 100 }}
            resizeMode="contain"
            source={{ uri: job?.job_info?.thumbnail }}
          />
        </View>
        <Text style={styles.title} numberOfLines={5}>
          {job?.job_info?.title}
        </Text>
        <Text style={styles.text} numberOfLines={5}>
          Mô tả công việc: {job?.job_info?.desc}
        </Text>
        <Text style={styles.text}>Ngân sách: {job?.job_info?.bids}</Text>
        <Text style={styles.text}>
          Thời hạn: {formatTimeTask(job?.job_info?.deadline)}
        </Text>
      </View>
      <View style={styles.containerButton}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Button
            mode="contained"
            style={{ margin: 5, backgroundColor: "#E0970A" }}
          >
            Xem chi tiết
          </Button>
        </TouchableOpacity>
        {job?.status == 0 && (
          <>
            <TouchableOpacity onPress={handleConfirm}>
              <Button
                mode="contained"
                style={{ margin: 5, backgroundColor: "green" }}
              >
                Chấp nhận
              </Button>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleReject}>
              <Button
                mode="contained"
                style={{ margin: 5, backgroundColor: "red" }}
              >
                Từ chối
              </Button>
            </TouchableOpacity>
          </>
        )}
        {job?.status == 1 && (
          <>
            <Text style={{ fontSize: 16, color: "green" }}>
              Chờ phản hồi client
            </Text>
          </>
        )}
        {job?.status == -1 && (
          <>
            <Text style={{ fontSize: 16, color: "red" }}>Đã từ chối</Text>
          </>
        )}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <ModalDetailJobInvite setModalVisible={setModalVisible} job={job} />
        </Modal>
        <ModalLoading visible={acceptInvite.isPending} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: "green",
    borderWidth: 1,
    borderRadius: 10,
    margin: 10,
    padding: 10,
    backgroundColor: "#AE34DE",
  },
  text: {
    margin: 3,
    fontSize: 16,
    color: "white",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 5,
    color: "white",
  },
  containerButton: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
  },
});
export default JobInvite;
