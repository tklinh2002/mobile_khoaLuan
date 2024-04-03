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
  Image,
  Button,
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
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
const ModalJob = ({ setModalVisible }) => {
  const queryClient = useQueryClient();
  const infoLogin = queryClient.getQueryData(["infoLogin"]);
  const token = infoLogin["access_token"];
  const formdata = new FormData();
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
  const [document, setDocument] = useState(null);

  // pick document
  const pickDocument = async () => {
    try {
      let result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: false,
      });
      console.log(result);
      if (!result.canceled) {
        // try {
        //   const base64 = await FileSystem.readAsStringAsync(
        //     result.assets[0].uri,
        //     {
        //       encoding: FileSystem.EncodingType.Base64,
        //     }
        //   );

          setDocument(result.assets[0].name);
          setJob((prevJob) => ({
            ...prevJob,
            content_file: {
              name: result.assets[0].name,
              type: result.assets[0].mimeType,
              uri: result.assets[0].uri
            },
          }));
        // } catch (error) {
        //   console.error("Error converting file to base64:", error);
        // }
      }
    } catch (error) {}
  };
  // pick image
  const [image, setImage] = useState(null);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setImage({
        base64: result.assets[0].base64,
        width: result.assets[0].width,
        height: result.assets[0].height,
      });

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

  // search skill
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [skill, setSkill] = useState([]);
  

  const onChangeTextSkill = (text) => {
    setSearchQuery(text);
    const listSkill = queryClient.getQueryData(["listSkills"]) as any;
    const f1 = listSkill?.data.filter((item) =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );
    const f2 = f1.filter((item) => !skill.some((i) => i.id === item.id));
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
const createJob = useMutation({
  mutationFn: async (job: Job) => await createJobApi(job, token),
  onSuccess: (data) => {
    queryClient.invalidateQueries({ queryKey: ["listpostopen", 1] });
    setModalVisible(false);
    // console.log(data);
  },
  onError: (error) => {
    console.log(error);
  }
})
  
  const handCreateJob = async () => {
    createJob.mutate(job);  
    // console.log(job);
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
            {/* pick thumbnail */}
            <View style={styles.containerInput}>
              <Button title="Chọn thumbnail" onPress={pickImage} />
              <View style={{ alignItems: "flex-start", marginVertical: 10 }}>
                {image && (
                  <Image
                    source={{ uri: `data:image/jpeg;base64,${image.base64}` }}
                    style={{ width: image.width / 3, height: image.height / 3 }}
                  />
                )}
              </View>
            </View>
            {/* pick document */}
            <View style={styles.containerInput}>
              <Button title="Chọn file mô tả" onPress={pickDocument} />
              {document && <Text>{document}</Text>}
            </View>
            {/* search skill */}
            <View>
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
                              { id: item.id, name: item.name, point:100 },
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
              {/* footer  */}
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
