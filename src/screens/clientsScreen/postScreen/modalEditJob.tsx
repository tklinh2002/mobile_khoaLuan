import React, { useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Image,
  Button,
  ActivityIndicator,
  ScrollView,
  Linking,
  Alert,
} from "react-native";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Job } from "../../../types/job";
import DateTimePicker from "@react-native-community/datetimepicker";
import { editJobApi } from "../../../apis/job.api";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import IconFontAwesome from "react-native-vector-icons/FontAwesome";
import { Dropdown } from "react-native-element-dropdown";
import type { PickerItem } from "react-native-woodpicker";
import { AuthContext } from "../../../utils/context";

const ModalEditJob = ({ setModalVisible, job_id }) => {
  const initJob: Job = {
    id: "",
    client_id: "",
    title: "",
    thumbnail: undefined,
    desc: "",
    content: "",
    bids: 0,
    deadline: new Date(),
    skill: [],
    content_file: undefined,
    status: 0,
  };
  const [job, setJob] = useState<Job>(initJob);

  // search skill
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [skill, setSkill] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const queryClient = useQueryClient();
  const { infoLogin, login, logout } = useContext(AuthContext);
  const token = infoLogin["access_token"];
  // status post
  const [pickedData, setPickedData] = useState<PickerItem>();
  const data: PickerItem[] = [
    {
      label: "Ẩn",
      value: 0,
    },
    {
      label: "Mở ứng tuyển",
      value: 1,
    },
    {
      label: "Đóng ứng tuyển",
      value: 2,
    },
  ];

  const jobdetail = queryClient.getQueryData(["job", job_id]) as any;
  useEffect(() => {
    if (jobdetail) {
      setJob(jobdetail);
      setJob((prevJob) => ({
        ...prevJob,
        id: jobdetail?.id,
      }));
      setPickedData(data.find((item) => item.value === jobdetail?.status));
      const skillsPost = [];
      jobdetail?.skills.map((item) => {
        skillsPost.push({ id: item.skill_id, name: item.skill_name });
      });
      setSkill(skillsPost);
      setPickedData(
        data.find((item) => item.value === Number(jobdetail?.status))
      );
      setImage(jobdetail?.thumbnail);
    }
  }, [jobdetail]);

  const [image, setImage] = useState(null);

  const [document, setDocument] = useState(null);

  const pickDocument = async () => {
    try {
      let result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: false,
      });
      if (!result.canceled) {
        setDocument(result.assets[0].name);
        setJob((prevJob) => ({
          ...prevJob,
          content_file: {
            name: result.assets[0].name,
            type: result.assets[0].mimeType,
            uri: result.assets[0].uri,
          },
        }));
      }
    } catch (error) {}
  };
  // pick

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setJob((prevJob) => ({
        ...prevJob,
        thumbnail: {
          uri: result.assets[0].uri,
          type: result.assets[0].mimeType,
          name: result.assets[0].fileName,
        },
      }));
    }
  };

  const listSkill = queryClient.getQueryData(["listSkills"]) as any;
  const onChangeTextSkill = (text) => {
    setSearchQuery(text);
    const f1 = listSkill?.data.filter((item) =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );

    const f2 = f1.filter((item) => !skill.some((i) => i.id === item.id + ""));
    setFilteredSuggestions(f2);
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
  const editJob = useMutation({
    mutationFn:async() => await editJobApi(job, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["job", job_id]});
      Alert.alert("Sửa job thành công");
      setModalVisible(false);
    },
    onError: (error) => {
      Alert.alert("Error", error["reponse"].data.message);
    }
  })
  const handEditJob = async () => {
    editJob.mutate();
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
            {editJob.isPending && (
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
            <View style={styles.header}>
              <IconAntDesign
                name="closecircle"
                size={24}
                color="gray"
                onPress={() => setModalVisible(false)}
              />
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: "bold",
                  flex: 1,
                  textAlign: "center",
                }}
              >
                Sửa job
              </Text>
            </View>
            <TouchableOpacity style={{marginLeft:20}} onPress={() => setIsEdit(!isEdit)}>
              <IconFontAwesome name={isEdit?"save":"edit"} size={30} color="black" />
            </TouchableOpacity>
            <View style={styles.containerInput}>
              <Text style={styles.titleInput}>Tiêu đề</Text>
              <View style={styles.input}>
                <TextInput
                  style={styles.textInput}
                  placeholder="write title"
                  value={job.title}
                  editable={false}
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
                  editable={isEdit}
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
                  editable={isEdit}
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
                  editable={false}
                />
              </View>
            </View>
            <View style={styles.containerInput}>
              <Text style={styles.titleInput}>Thời hạn</Text>
              <View style={{ alignItems: "flex-start", marginVertical: 10 }}>
                <DateTimePicker
                  testID="dateTimePicker"
                  value={new Date(job.deadline)}
                  mode="date" // You can change this to "time" for a time picker
                  display="default"
                  onChange={onChange}
                />
              </View>
            </View>                              
            {/* pick thumbnail */}
            <View style={styles.containerInput}>
              <Text style={styles.titleInput}>Thumbnail</Text>
              {isEdit && <Button title="Chọn thumbnail" onPress={pickImage} />}
              <View style={{ alignItems: "flex-start", marginVertical: 10 }}>
                {image && (
                  <Image
                    source={{ uri: image }}
                    style={{
                      width: 200,
                      height: 200,
                    }}
                  />
                )}
              </View>
            </View>
            {/* pick document */}
            <View style={styles.containerInput}>
              <Text style={styles.titleInput}>File mô tả</Text>
              {isEdit ? (
                <>
                  <Button title="Chọn file mô tả" onPress={pickDocument} />
                  {document && <Text>{document}</Text>}
                </>
              ) : (
                <TouchableOpacity
                  onPress={() => Linking.openURL(job.content_file)}
                >
                  <Text>{String(job.content_file).split("/").pop()}</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* search skill */}
            <View>
              {isEdit && (
                <View>
                  <Text style={styles.titleInput}>Tìm kỹ năng</Text>
                  <View style={styles.input}>
                    <TextInput
                      placeholder="Search..."
                      value={searchQuery}
                      onChangeText={onChangeTextSkill}
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
                                { id: item.id, name: item.name},
                              ];
                              setSkill(newSkill);
                              setFilteredSuggestions(
                                filteredSuggestions.filter(
                                  (i) => i.id !== item.id
                                )
                              );
                              setJob((prevJob) => ({
                                ...prevJob,
                                skill: newSkill,
                              }));
                            }}
                          >
                            <Text style={styles.suggestionItem}>
                              {item.name}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                    )}
                  </View>
                </View>
              )}
              <View style={styles.containerInput}>
                <Text style={styles.titleInput}>Kỹ năng</Text>
                <View style={styles.containerSkill}>
                  {skill.map((item) => (
                    <TouchableOpacity
                      key={item.id}
                      style={styles.skill}
                      onPress={() => {
                        if (isEdit === false) return;
                        const newSkills = skill.filter((i) => i.id !== item.id);
                        setSkill(newSkills);
                        setFilteredSuggestions([...filteredSuggestions, item]);
                        setJob((prevJob) => ({
                          ...prevJob,
                          skill: newSkills,
                        }));
                      }}
                      activeOpacity={isEdit ? 1 : 0}
                    >
                      <Text
                        style={{
                          color: "white",
                          fontSize: 18,
                          marginRight: 5,
                        }}
                      >
                        {item.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.containerInput}>
                <Dropdown
                  style={styles.dropdown}
                  data={data}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  value={pickedData}
                  onChange={(item) => {
                    setPickedData(item.value);
                    setJob((prevJob) => ({
                      ...prevJob,
                      status: item.value,
                    }));
                  }}
                />
              </View>
              {/* footer  */}
              <View style={styles.containerButton}>
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: "red" }]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={{ color: "white", fontSize: 20 }}>Hủy</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: "green" }]}
                  onPress={handEditJob}
                >
                  <Text style={{ color: "white", fontSize: 20 }}>Sửa job</Text>
                </TouchableOpacity>
              </View>
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
  containerInputTitle: {
    flexDirection: "row",
    alignItems: "center",
  },
  dropdown: {
    borderColor: "black",
    borderWidth: 1,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
});
export default ModalEditJob;
