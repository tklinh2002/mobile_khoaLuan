import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Touchable,
  TouchableNativeFeedback,
  Keyboard,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
  Modal,
  ActivityIndicator,
  Alert,
} from "react-native";

import { useContext, useState } from "react";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import { Button, Checkbox } from "react-native-paper";
import TaskDetailModal from "./modalDetailTask";
import AddTaskModal from "./addTaskModal";
import { useTask } from "../../hook/hook";
import { useQueryClient } from "@tanstack/react-query";
import { CreateJobTaskRequest } from "../../apis/type.task.api";
import ModalLoading from "./modalLoading";
import EditTaskModal from "./editTaskModal";
import { AuthContext } from "../../utils/context";
const ModalReportProgess = ({ setmodalvisiable, jobId }) => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectTaskUpdate, setSelectTaskUpdate] = useState(null);
  const [modalAddTask, setModalAddTask] = useState(false);
  const [modalEditTask, setModalEditTask] = useState(false);
  const [modalOption, setModalOption] = useState(false);
  const [modalDetail, setModalDetail] = useState(false);
  const { getTasks, createTask, updateTask, deleteTask } = useTask(jobId);
  const queryClient = useQueryClient();
  const { infoLogin, login, logout } = useContext(AuthContext);
  const handleAddTask = async (task: CreateJobTaskRequest) => {
    task.id = jobId;
    await createTask
      .mutateAsync(task)
      .then(() => {
        getTasks.refetch();
        Alert.alert("Thông báo", "Thêm task thành công");
        setModalAddTask(false);
      })
      .catch((err) => {
        Alert.alert("Lỗi", "Thêm task thất bại");
      });
  };
  const handleEditTask = async (task: CreateJobTaskRequest) => {
    const taskTemp: CreateJobTaskRequest = {
      id: task?.id,
      name: task?.name,
      priority: task?.priority,
      deadline: task?.deadline,
      desc: task?.desc,
    };
    console.log(taskTemp);
    await updateTask
      .mutateAsync(taskTemp)
      .then(() => {
        getTasks.refetch();
        Alert.alert("Thông báo", "Sửa task thành công");
        setModalEditTask(false);
      })
      .catch((err) => {
        Alert.alert("Lỗi", "Sửa task thất bại");
        console.log(err.response.data);
      });
  };
  const handleDeleteTask = async (taskid) => {
    console.log(taskid);
    Alert.alert("Xác nhận", "Bạn có chắc chắn muốn xóa task này?", [
      {
        text: "Hủy",
        style: "cancel",
      },
      {
        text: "Xóa",
        onPress: async () => {
          await deleteTask
            .mutateAsync(taskid)
            .then(() => {
              getTasks.refetch();
              Alert.alert("Thông báo", "Xóa task thành công");
            })
            .catch((err) => {
              Alert.alert("Lỗi", "Xóa task thất bại");
              // console.log(err.response.data.message);
            });
        },
      },
    ]);
  };
  return (
    <ScrollView>
      <TouchableNativeFeedback
        style={styles.container}
        onPress={Keyboard.dismiss}
      >
        <View style={styles.content}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={[
                styles.text,
                { flex: 1, textAlign: "center", paddingLeft: 30 },
              ]}
            >
              Báo cáo tiến độ
            </Text>
            <IconAntDesign
              name="close"
              size={30}
              color="black"
              onPress={() => setmodalvisiable(false)}
            />
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <TouchableOpacity onPress={() => setModalAddTask(true)}>
              <Button mode="outlined">
                <Text>Thêm task </Text>
              </Button>
            </TouchableOpacity>
          </View>
          <Text style={styles.textInfo}>Danh sách công việc:</Text>
          {getTasks.isLoading ? (
            <View style={styles.container}>
              <ActivityIndicator size="large" color="black" />
            </View>
          ) : (
            <>
              {[...getTasks.data.data?.data].length > 0 ? (
                <View style={styles.containerTask}>
                  {[...getTasks.data.data?.data].map((item) => {
                    return (
                      <View style={styles.task} key={item?.id}>
                        <TouchableOpacity
                          style={{
                            flex: 1,
                            borderWidth: 1,
                            marginVertical: 5,
                            borderRadius: 5,
                          }}
                          onPress={() => {
                            setSelectedTask(item);
                            setSelectTaskUpdate(item);
                            setModalOption(true);
                          }}
                        >
                          <Text style={[styles.textInfo, { color: "green" }]}>
                            {item.name}
                          </Text>
                          <Text style={[styles.textInfo]}>
                            Độ ưu tiên:
                            {item.priority == 1
                              ? "Quan trọng"
                              : item.priority == 2
                              ? "Trung bình"
                              : "Thấp"}
                          </Text>
                          <Text style={styles.textInfo}>
                            Trạng thái công việc: {item.status_text}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    );
                  })}
                </View>
              ) : (
                <Text
                  style={{
                    margin: 20,
                    fontSize: 20,
                    color: "gray",
                    textAlign: "center",
                  }}
                >
                  Chưa có task nào
                </Text>
              )}
            </>
          )}
        </View>
      </TouchableNativeFeedback>

      {/* modal  */}
      <TaskDetailModal
        task={selectedTask}
        isVisible={modalDetail}
        closeModal={() => {
          setSelectedTask(null);
          setModalDetail(false);
        }}
      />
      <AddTaskModal
        visible={modalAddTask}
        onClose={() => setModalAddTask(false)}
        onAddTask={handleAddTask}
      />
      <EditTaskModal
        visible={modalEditTask}
        onClose={() => {
          setModalEditTask(false);
          setSelectTaskUpdate(null);
        }}
        onEditTask={handleEditTask}
        selectTask={selectTaskUpdate}
      />
      {/* modal option*/}
      <Modal animationType="slide" visible={modalOption} transparent={true}>
        <TouchableWithoutFeedback onPress={() => setModalOption(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={styles.input}
                onPress={() => {
                  setModalDetail(true);
                  setModalOption(false);
                }}
              >
                <Text
                  style={{ color: "green", fontSize: 20, textAlign: "center" }}
                >
                  Xem chi tiết
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.input}
                onPress={() => {
                  setModalOption(false);
                  setModalEditTask(true);
                }}
              >
                <Text
                  style={{
                    color: "#0866FF",
                    fontSize: 20,
                    textAlign: "center",
                  }}
                >
                  Sửa task
                </Text>
              </TouchableOpacity>
              {infoLogin["user_type"] == "client" && (
                <TouchableOpacity
                  style={styles.input}
                  onPress={() => {
                    setModalOption(false);
                    handleDeleteTask(selectedTask.id);
                  }}
                >
                  <Text
                    style={{ color: "red", fontSize: 20, textAlign: "center" }}
                  >
                    Xóa task
                  </Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={styles.input}
                onPress={() => setModalOption(false)}
              >
                <Text
                  style={{
                    fontSize: 20,
                    textAlign: "center",
                  }}
                >
                  Hủy
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <ModalLoading visible={createTask.isPending} />
      <ModalLoading visible={updateTask.isPending} />
      <ModalLoading visible={deleteTask.isPending} />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    marginTop: 40,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  text: {
    fontSize: 30,
    marginHorizontal: 10,
    marginVertical: 5,
    alignSelf: "center",
    fontWeight: "bold",
  },
  button: {
    borderColor: "green",
    borderWidth: 1,
    borderRadius: 30,
    padding: 10,
  },
  containerTask: {
    marginHorizontal: 10,
    flex: 1,
  },
  task: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputTask: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 7,
    marginHorizontal: 10,
    marginVertical: 10,
    flex: 1,
    paddingVertical: 10,
    fontSize: 14,
    alignSelf: "center",
  },
  textInfo: {
    fontSize: 16,
    marginHorizontal: 10,
    marginVertical: 5,
  },
  info: {
    marginVertical: 10,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  containerButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginVertical: 10,
  },
  containerCheckBox: {
    borderColor: "black",
    borderWidth: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "100%",
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: "flex-start",
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});
export default ModalReportProgess;
