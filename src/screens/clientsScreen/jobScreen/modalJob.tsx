import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import { useState } from "react";
import DatePicker from "react-native-woodpicker/dist/components/DatePicker";
import Skill from "./skill";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Job } from "../../../types/job";
import DateTimePicker from "@react-native-community/datetimepicker";
import http from "../../../utils/http";
import { createJobApi } from "../../../apis/job.api";
import { getListSkill } from "../../../apis/auth.api";
const ModalJob = ({ setModalVisible }) => {
  const queryClient = useQueryClient();
  const infoLogin = queryClient.getQueryData(["infoLogin"]);
  const token = infoLogin["access_token"];
  const initJob: Job = {
    title: "",
    thumbnail: "",
    desc: "",
    content: "",
    bids: 0,
    deadline: new Date(),
    skill: [],
    status: 0,
    id: "",
    client_id: "",
    min_proposals: 0,
    content_file: undefined,
  };
  const [job, setJob] = useState<Job>(initJob);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [skill, setSkill] = useState([]);
  const getListSkill1 = useQuery({
    queryKey: ["listSkills"],
    queryFn: async () =>
      getListSkill(token).then((res) => {
        setSuggestions(res.data.data.data);
        return res.data.data;
      }),
  });
  const setFilter = (text) => {
    const f1 = suggestions.filter((item) =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );
    const f2 = f1.filter((item) => !skill.some((i) => i.id === item.id));
    return f2;
  };

  const onChangeText = (text) => {
    setSearchQuery(text);
    setFilteredSuggestions(setFilter(text));
  };

  const adjustDateToTimezone = (date) => {
    const offset = new Date().getTimezoneOffset(); // Get the timezone offset in minutes
    const adjustedDate = new Date(date);

    if (Platform.OS === "ios") {
      adjustedDate.setMinutes(adjustedDate.getMinutes() - offset); // Adjust for iOS
    } else {
      adjustedDate.setMinutes(adjustedDate.getMinutes() + offset); // Adjust for Android
    }

    return adjustedDate;
  };

  const onChange = (event, selectedDate) => {
    if (event.type === "set") {
      const adjustedDate = adjustDateToTimezone(selectedDate); // Adjust the selected date
      setJob({ ...job, deadline: adjustedDate });
    }
  };
  const handCloseModal = () => {
    setModalVisible(false);
  };
  const createJob = useMutation({
    mutationFn: (job: Job) => createJobApi(job, token),
  });
  const handCreateJob = () => {
    createJob.mutate(job, {
      onSuccess: () => {
        alert("Tạo job thành công");
      },
      onError: (error) => {
        alert("Tạo job thất bại");
        console.log(error.message);
      },
    });
  };

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={2}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView style={{ marginBottom: 10 }}>
        <TouchableWithoutFeedback
          style={styles.container}
          onPress={Keyboard.dismiss}
        >
          <View style={{ marginTop: "10%" }}>
            <View style={styles.header}>
              <IconAntDesign
                name="closecircle"
                size={24}
                color="gray"
                onPress={handCloseModal}
              />
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: "bold",
                  flex: 1,
                  textAlign: "center",
                }}
              >
                Tạo job
              </Text>
            </View>

            <View style={styles.containerInput}>
              <Text style={styles.titleInput}>Tiêu đề</Text>
              <View style={styles.input}>
                <TextInput
                  style={styles.textInput}
                  placeholder="write title"
                  value={job.title}
                  onChangeText={(title) => setJob({ ...job, title })}
                />
              </View>
            </View>
            <View style={styles.containerInput}>
              <Text style={styles.titleInput}>Mô tả</Text>
              <View style={styles.input}>
                <TextInput
                  style={styles.textInput}
                  placeholder="viết mô tả"
                  multiline
                  numberOfLines={2}
                  value={job.desc}
                  onChangeText={(desc) => setJob({ ...job, desc })}
                />
              </View>
            </View>
            <View style={styles.containerInput}>
              <Text style={styles.titleInput}>Chi tiết</Text>
              <View style={styles.input}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Nhập nội dung công việc"
                  multiline={true}
                  numberOfLines={4}
                  value={job.content}
                  onChangeText={(content) => setJob({ ...job, content })}
                />
              </View>
            </View>
            <View style={styles.containerInput}>
              <Text style={styles.titleInput}>Lương</Text>
              <View style={styles.input}>
                <TextInput
                  style={styles.textInput}
                  placeholder="nhập lương"
                  keyboardType="numeric"
                  value={job.bids.toString()}
                  onChangeText={(bids) =>
                    setJob({ ...job, bids: Number(bids) })
                  }
                />
              </View>
            </View>
            <View style={styles.containerInput}>
              <Text style={styles.titleInput}>Thời hạn</Text>
              <View style={{ alignItems: "flex-start", marginVertical: 10 }}>
                <DateTimePicker
                  testID="dateTimePicker"
                  value={job.deadline}
                  mode="date" // You can change this to "time" for a time picker
                  display="default"
                  onChange={onChange}
                />
              </View>
            </View>
            <View>
              <Text style={styles.titleInput}>Tìm kỹ năng</Text>
              <View style={styles.input}>
                <TextInput
                  placeholder="Search..."
                  value={searchQuery}
                  onChangeText={onChangeText}
                />
                {filteredSuggestions.length > 0 && searchQuery !== "" && (
                  <ScrollView style={{ maxHeight: 200 }}>
                    {filteredSuggestions.map((item) => (
                      <TouchableOpacity
                        style={styles.item}
                        key={item.id}
                        onPress={() => {
                          const newSkill = [
                            ...skill,
                            { id: item.id, name: item.name },
                          ];
                          setSkill(newSkill);
                          setFilteredSuggestions(
                            filteredSuggestions.filter((i) => i.id !== item.id)
                          );
                          setJob((prevJob) => ({
                            ...prevJob,
                            skill: newSkill,
                          }));
                        }}
                      >
                        <Text style={styles.suggestionItem}>{item.name}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                )}
              </View>
            </View>
            <View style={styles.containerInput}>
              <Text style={styles.titleInput}>Chọn kỹ năng</Text>
              <View style={styles.containerSkill}>
                {skill.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    style={styles.skill}
                    onPress={() => {
                      const newSkills = skill.filter((i) => i.id !== item.id);
                      setSkill(newSkills);
                      setFilteredSuggestions([...filteredSuggestions, item]);
                      setJob((prevJob) => ({ ...prevJob, skill: newSkills }));
                    }}
                  >
                    <Text
                      style={{ color: "white", fontSize: 18, marginRight: 5 }}
                    >
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View style={styles.containerButton}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "red" }]}
              >
                <Text style={{ color: "white", fontSize: 20 }}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "green" }]}
                onPress={handCreateJob}
              >
                <Text style={{ color: "white", fontSize: 20 }}>Tạo job</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "#0866FF" }]}
              >
                <Text style={{ color: "white", fontSize: 20 }}>Đăng job</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    marginHorizontal: 8,
    justifyContent: "center",
    flex: 1,
    padding: 8,
  },

  button: {
    borderRadius: 10,
    marginHorizontal: 8,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 1,
    width: 100,
    padding: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginHorizontal: 10,
    marginBottom: 20,
  },
  titleInput: {
    fontSize: 20,
    fontWeight: "400",
    marginLeft: 8,
  },
  textInput: {
    fontSize: 16,
  },
  containerButton: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 16,
  },
  containerInput: {
    marginVertical: 16,
  },
  containerSkill: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: 8,
  },
  suggestionItem: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  item: {
    borderColor: "#ccc",
    borderWidth: 1,
    marginVertical: 5,
  },
  skill: {
    borderWidth: 1,
    borderColor: "green",
    borderRadius: 8,
    marginHorizontal: 8,
    justifyContent: "center",
    backgroundColor: "green",
    flexDirection: "row",
    padding: 5,
    marginVertical: 3,
  },
});
export default ModalJob;