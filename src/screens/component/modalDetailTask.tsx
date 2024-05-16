import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Linking,
  Alert,
} from "react-native";
import React from "react";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import { Button, TextInput } from "react-native-paper";
import { formatDate, formatTimeMess, formatTimeTask } from "../../utils/format";
import { useTask } from "../../hook/hook";
import { useQueryClient } from "@tanstack/react-query";
import { AddCommentRequest } from "../../apis/type.task.api";
import ModalLoading from "./modalLoading";
const TaskDetailModal = ({ task, isVisible, closeModal }) => {
  //////////////////////// lấy type
  if (!isVisible || !task) return null;
  const queryClient = useQueryClient();
  const infoLogin = queryClient.getQueryData(["infoLogin"]) as any;
  const type = infoLogin["user_type"];
  const {
    createCommentTask,
    freelancerUpdateStatusTask,
    clientConfirmTask,
    getTasks,
  } = useTask();
  const [text, setText] = React.useState("");
  const [comment, setComment] = React.useState(task.comment);
  const [updateStatusModalVisible, setUpdateStatusModalVisible] =
    React.useState(false);

  const handleSend = () => {
    const data: AddCommentRequest = {
      task_id: task.id,
      content: text,
      type: "text",
    };
    createCommentTask
      .mutateAsync(data)
      .then((res) => {
        setComment([
          ...comment,
          {
            content: text,
            type_user: type,
            type: "text",
            created_at: new Date(),
            id: Math.random(),
          },
        ]);
        setText("");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleConfirmTask = () => {
    Alert.alert("Xác nhận task", "Bạn có chắc chắn muốn xác nhận task?", [
      {
        text: "Cancel",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          clientConfirmTask
            .mutateAsync({ id: task.id, confirm_status: "1" })
            .then((res) => {
              alert("Xác nhận task thành công");
              getTasks.refetch();
              closeModal();
            })
            .catch((err) => {
              alert("Xác nhận task thất bại");
            });
        },
      },
    ]);
  };
  const handleUpdateStatus = () => {
    setUpdateStatusModalVisible(true);
  };
  const handleUpdateStatusConfirm = async (newStatus) => {
    console.log(newStatus);
    await freelancerUpdateStatusTask
      .mutateAsync({ id: task.id, status: newStatus + "" })
      .then((res) => {
        Alert.alert("Thành công", "Cập nhật trạng thái thành công");
        task.status_text =
          newStatus == 0
            ? "Đã được giao"
            : newStatus == 2
            ? "Đã hoàn thành"
            : "Đang thực hiện";
        setUpdateStatusModalVisible(false);
        getTasks.refetch();
      })
      .catch((err) => {
        Alert.alert("Cập nhật trạng thái thất bại", "Vui lòng thử lại");
        // console.log(err.response.data.message);
      });
    //
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={closeModal}
    >
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: "white" }}
        keyboardVerticalOffset={2}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View
          style={{
            marginTop: 40,
            marginHorizontal: 10,
          }}
        >
          <IconAntDesign
            name="close"
            size={30}
            color="black"
            onPress={() => {
              closeModal();
              getTasks.refetch();
            }}
          />
        </View>
        <View style={{ justifyContent: "space-around", flexDirection: "row" }}>
          {type == "client" && task.confirm_status!=1 ? (
            <TouchableOpacity onPress={handleConfirmTask}>
              <Button mode="outlined">
                <Text>Xác nhận task</Text>
              </Button>
            </TouchableOpacity>
          ) : task?.confirm_status == 1 ? null : (
            <TouchableOpacity onPress={handleUpdateStatus}>
              <Button mode="outlined">
                <Text>cập nhật trạng thái task</Text>
              </Button>
            </TouchableOpacity>
          )}
        </View>
        <Text
          style={{
            marginHorizontal: 10,
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          {task.name}
        </Text>
        <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
          <Text style={styles.text}>Mô tả: {task.desc}</Text>
          <Text style={styles.text}>
            Độ ưu tiên:{" "}
            {task.priority == 1
              ? "Quan trọng"
              : task.priority == 2
              ? "Trung bình"
              : "Thấp"}
          </Text>
          <Text style={styles.text}>
            Trạng thái công việc: {task.status_text}
          </Text>
          <Text style={styles.text}>
            Thời hạn: {formatTimeTask(task.deadline)}
          </Text>
        </View>
        <ScrollView style={{ borderWidth: 1, marginHorizontal: 5 }}>
          {comment.map((item) => {
            return item.type_user == type ? (
              <View style={styles.send} key={item.id}>
                {item.type == "text" ? (
                  <Text style={[styles.text]}>{item.content}</Text>
                ) : (
                  <TouchableOpacity
                    onPress={() => Linking.openURL(item.content)}
                    key={item.id}
                  >
                    <IconAntDesign name="filetext1" size={40} color="black" />
                  </TouchableOpacity>
                )}
                <Text>{formatTimeMess(item.created_at)}</Text>
              </View>
            ) : (
              <View style={styles.receive} key={item.id}>
                {item.type == "text" ? (
                  <Text style={[styles.text]}>{item.content}</Text>
                ) : (
                  <TouchableOpacity
                    onPress={() => Linking.openURL(item.content)}
                    key={item.id}
                  >
                    <IconAntDesign name="filetext1" size={40} color="black" />
                  </TouchableOpacity>
                )}
                <Text>{formatTimeMess(item.created_at)}</Text>
              </View>
            );
          })}
        </ScrollView>
        <View
          style={{
            marginBottom: 40,
            marginHorizontal: 10,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TextInput
            style={{ marginHorizontal: 10, marginVertical: 10, flex: 1 }}
            mode="outlined"
            label={"Comment"}
            onChangeText={(text) => {
              setText(text);
            }}
            value={text}
            multiline={true} // Enable multiline
            numberOfLines={2}
            scrollEnabled={true} // Enable scrolling
          />
          <TouchableOpacity onPress={handleSend}>
            <Text style={[styles.text, { paddingVertical: 10 }]}>Gửi</Text>
          </TouchableOpacity>
        </View>
        {/* modal update status */}
        <Modal
          visible={updateStatusModalVisible}
          onRequestClose={() => setUpdateStatusModalVisible(false)}
          transparent={true}
          animationType="slide"
        >
          <View
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
            }}
          >
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>
                Thay đổi trạng thái công việc
              </Text>
              {task.status == -1 && (
                <>
                  <TouchableOpacity
                    style={styles.statusOption}
                    onPress={() => handleUpdateStatusConfirm(0)}
                  >
                    <Text>Đang thực hiện</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.statusOption}
                    onPress={() => handleUpdateStatusConfirm(1)}
                  >
                    <Text>Hoàn thành chức năng</Text>
                  </TouchableOpacity>
                </>
              )}
              {task.status == 0 && (
                <>
                  <TouchableOpacity
                    style={styles.statusOption}
                    onPress={() => handleUpdateStatusConfirm(-1)}
                  >
                    <Text>Đã được giao</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.statusOption}
                    onPress={() => handleUpdateStatusConfirm(1)}
                  >
                    <Text>Hoàn thành chức năng</Text>
                  </TouchableOpacity>
                </>
              )}
              {task.status == 1 && (
                <>
                  <TouchableOpacity
                    style={styles.statusOption}
                    onPress={() => handleUpdateStatusConfirm(-1)}
                  >
                    <Text>Đã được giao</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.statusOption}
                    onPress={() => handleUpdateStatusConfirm(0)}
                  >
                    <Text>Đang thực hiện</Text>
                  </TouchableOpacity>
                </>
              )}
              <Button
                mode="outlined"
                onPress={() => setUpdateStatusModalVisible(false)}
              >
                Hủy
              </Button>
            </View>
            <ModalLoading visible={freelancerUpdateStatusTask.isPending} />
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
  },
  send: {
    borderWidth: 1,
    marginVertical: 5,
    marginHorizontal: 10,
    padding: 10,
    width: "70%",
    alignSelf: "flex-end",
    borderRadius: 10,
  },
  receive: {
    borderWidth: 1,
    marginVertical: 5,
    marginHorizontal: 10,
    padding: 10,
    width: "70%",
    alignSelf: "flex-start",
    borderRadius: 10,
  },
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  statusOption: {
    backgroundColor: "#f2f2f2",
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    width: "100%",
    alignItems: "center",
  },
});

export default TaskDetailModal;
