import React, { useContext } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  ActivityIndicator,
  Alert,
} from "react-native";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import { useState } from "react";
import { Button, TextInput } from "react-native-paper";
import Skill from "../../clientsScreen/jobScreen/skill";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getInfoUserFApi, updateInfoUserFApi } from "../../../apis/infoF.api";
import * as ImagePicker from "expo-image-picker";
import { getListSkill } from "../../../apis/auth.api";
import { AuthContext } from "../../../utils/context";
const ProfileScreen = () => {
  const queryClient = useQueryClient();
  const { infoLogin, login, logout } = useContext(AuthContext);
  const token = infoLogin["access_token"];
  const [modalVisible, setModalVisible] = useState(false);
  const [infoUser, setInfoUser] = useState() as any;
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [skill, setSkill] = useState([]);
  const getInfoUser = useQuery({
    queryKey: ["getInfoUserApi"],
    queryFn: () =>
      getInfoUserFApi(token)
        .then((res) => {
          return res.data.data;
        })
        .catch((err) => console.log(err["response"].data)),
  });
  const getListSkill1 = useQuery({
    queryKey: ["listSkills"],
    queryFn: async () =>
      getListSkill(token).then((res) => {
        queryClient.setQueryData(["listSkills"], res.data.data);
        return res.data.data;
      }),
  });
  const updateInfoUser = useMutation({
    mutationKey: ["updateInfoUserFApi"],
    mutationFn: async () => updateInfoUserFApi(token,infoUser ),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["getInfoUserApi"] });
      Alert.alert("Thông báo","Cập nhật thành công");
      await setModalVisible(false);
    },
    onError: (error) => {
      Alert.alert("Thông báo",error["response"].data.message);
    },
  });
  const handEditModal = async () => {
    await setInfoUser({
      phoneNum: getInfoUser.data.phone_num,
      address: getInfoUser.data.address,
      introduce: getInfoUser.data.intro,
      avatar: getInfoUser.data.avatar_url,
    });
    const skillsPost = [];
    await getInfoUser.data?.skills.map((item) => {
      skillsPost.push({ id: item.skill_id, name: item.skill_name });
    });
    await setSkill(skillsPost);
    await setImage(getInfoUser.data.avatar_url);
    setModalVisible(true);
    // console.log(getInfoUser.data);
  };
  const handedit = async () => {
    updateInfoUser.mutate();
  };
  const [image, setImage] = useState(null);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setInfoUser((prevJob) => ({
        ...prevJob,
        avatar: {
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

  if (getInfoUser.isLoading || getListSkill1.isLoading)
    return <ActivityIndicator size="large" color="black" />;

  return (
    <ScrollView>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            paddingHorizontal: 10,
          }}
        >
          <Text style={{ fontSize: 30, fontWeight: "bold", flex: 1 }}>
            Tài khoản
          </Text>
        </View>
        <View style={styles.info}>
          {getInfoUser.data.avatar_url == null ||
          getInfoUser.data.avatar_url == "" ? (
            <Image
              source={require("../../../assets/avatar_temp.jpg")}
              style={{
                width: 120,
                height: 120,
                borderRadius: 30,
                marginLeft: 10,
                alignSelf: "center",
              }}
            />
          ) : (
            <Image
              source={{ uri: getInfoUser.data.avatar_url }}
              style={{
                width: 120,
                height: 120,
                borderRadius: 30,
                marginLeft: 10,
                alignSelf: "center",
              }}
            />
          )}

          <View>
            <Text
              style={[styles.text, { color: "#C0C0C0", fontWeight: "bold" }]}
            >
              Username
            </Text>
            <Text style={styles.text}>{getInfoUser.data.username}</Text>
            <Text
              style={[styles.text, { color: "#C0C0C0", fontWeight: "bold" }]}
            >
              Tên
            </Text>
            <Text style={styles.text}>
              {getInfoUser.data.last_name + " " + getInfoUser.data.first_name}
            </Text>

            <Text
              style={[styles.text, { color: "#C0C0C0", fontWeight: "bold" }]}
            >
              Email
            </Text>
            <Text style={styles.text}>{getInfoUser.data.email}</Text>
          </View>
        </View>
      </View>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            paddingHorizontal: 10,
          }}
        >
          <Text style={{ fontSize: 30, fontWeight: "bold", flex: 1 }}>
            Thông tin
          </Text>
          <TouchableOpacity style={styles.button} onPress={handEditModal}>
            <IconAntDesign name="edit" size={30} color="green" />
          </TouchableOpacity>
        </View>
        <View style={styles.info}>
          <View>
            <Text
              style={[styles.text, { color: "#C0C0C0", fontWeight: "bold" }]}
            >
              Số điện thoại
            </Text>
            <Text style={styles.text}>{getInfoUser.data.phone_num}</Text>
            <Text
              style={[styles.text, { color: "#C0C0C0", fontWeight: "bold" }]}
            >
              Địa chỉ
            </Text>
            <Text style={styles.text}>{getInfoUser.data.address}</Text>
            <Text
              style={[styles.text, { color: "#C0C0C0", fontWeight: "bold" }]}
            >
              Giới thiệu bản thân 
            </Text>
            <Text style={[styles.text, { fontSize: 18 }]}>
              {getInfoUser.data.intro}
            </Text>
            <Text
              style={[styles.text, { color: "#C0C0C0", fontWeight: "bold" }]}
            >
              Kỹ năng
            </Text>
            <View style={styles.containerSkill}>
            {getInfoUser.data.skills.map((item) => (
              <View style={styles.skill} key={item.skill_id}>
                <Text
                  style={{
                    color: "white",
                    fontSize: 18,
                    marginRight: 5,
                  }}
                >
                  {item.skill_name}
                </Text>
              </View>
            ))}
            </View>
            
          </View>
        </View>
        {/* modal edit profile */}
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <ScrollView
            style={{
              backgroundColor: "white",
              padding: 10,
              marginTop: "10%",
              marginHorizontal: 5,
              flex: 1,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "black",
            }}
          >
            {updateInfoUser.isPending && (
            <View
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.5)", // Một lớp phủ mờ
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          )}
            <IconAntDesign
              name="closecircle"
              size={24}
              color="gray"
              onPress={() => setModalVisible(false)}
            />
            <Text
              style={{ fontSize: 30, textAlign: "center", fontWeight: "bold" }}
            >
              Chỉnh sửa profile
            </Text>
            <Text
              style={[styles.text, { color: "#C0C0C0", fontWeight: "bold" }]}
            >
              Số điện thoại
            </Text>
            <TextInput
              mode="outlined"
              keyboardType="number-pad"
              style={{ marginHorizontal: 10, backgroundColor: "white" }}
              maxLength={10}
              value={infoUser?.phoneNum}
              onChangeText={(text) =>
                setInfoUser({ ...infoUser, phoneNum: text })
              }
            />
            <Text
              style={[styles.text, { color: "#C0C0C0", fontWeight: "bold" }]}
            >
              Địa chỉ
            </Text>
            <TextInput
              mode="outlined"
              style={{ marginHorizontal: 10, backgroundColor: "white" }}
              value={infoUser?.address}
              multiline
              onChangeText={(text) =>
                setInfoUser({ ...infoUser, address: text })
              }
            />
            <Text
              style={[styles.text, { color: "#C0C0C0", fontWeight: "bold" }]}
            >
              Giới thiệu
            </Text>
            <TextInput
              mode="outlined"
              style={{ marginHorizontal: 10, backgroundColor: "white" }}
              value={infoUser?.introduce}
              multiline
              onChangeText={(text) =>
                setInfoUser({ ...infoUser, introduce: text })
              }
            />
            <TouchableOpacity
              style={{
                backgroundColor: "gray",
                padding: 10,
                borderRadius: 30,
                marginHorizontal: 10,
                alignItems: "center",
                marginVertical: 10,
                width: "30%",
              }}
              onPress={pickImage}
            >
              <Text style={{ color: "white", fontSize: 20 }}>Chọn hình</Text>
            </TouchableOpacity>
            {image && (
              <Image
                source={{ uri: image }}
                style={{ width: 200, height: 200 }}
              />
            )}

            <View>
              <Text
                style={[styles.text, { color: "#C0C0C0", fontWeight: "bold" }]}
              >
                Tìm kỹ năng
              </Text>
              <View>
                <TextInput
                  style={{ backgroundColor: "white" }}
                  mode="outlined"
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
                            { id: item.id, name: item.name },
                          ];
                          setSkill(newSkill);
                          setFilteredSuggestions(
                            filteredSuggestions.filter((i) => i.id !== item.id)
                          );
                          setInfoUser((prevJob) => ({
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
              <Text
                style={[styles.text, { color: "#C0C0C0", fontWeight: "bold" }]}
              >
                Kỹ năng
              </Text>
              <View style={styles.containerSkill}>
                {skill.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    style={styles.skill}
                    onPress={() => {
                      const newSkills = skill.filter((i) => i.id !== item.id);
                      setSkill(newSkills);
                      setFilteredSuggestions([...filteredSuggestions, item]);
                      setInfoUser((prevJob) => ({
                        ...prevJob,
                        skill: newSkills,
                      }));
                    }}
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
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                margin: 20,
                marginBottom:80
              }}
            >
              <Button
                style={{ backgroundColor: "green" }}
                mode="contained"
                onPress={handedit}
              >
                Cập nhật
              </Button>
              <Button
                style={{ backgroundColor: "red" }}
                mode="contained"
                onPress={() => {
                  setModalVisible(false);
                }}
              >
                Hủy
              </Button>
            </View>
          </ScrollView>
        </Modal>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "black",
    marginHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
  info: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
  text: {
    fontSize: 20,
    marginHorizontal: 10,
    marginVertical: 5,
  },
  button: {
    borderColor: "green",
    borderWidth: 1,
    borderRadius: 30,
    padding: 10,
  },
  containerModal: {
    flex: 1,
  },
  contentModal: {
    backgroundColor: "white",
    borderRadius: 20,
    flex: 1,
    marginTop: 30,
    borderColor: "black",
    borderWidth: 2,
    padding: 20,
  },
  containerSkill: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: 8,
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
  item: {
    borderColor: "#ccc",
    borderWidth: 1,
    marginVertical: 5,
  },
  suggestionItem: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  containerInput: {
    marginVertical: 16,
    backgroundColor: "white",
  },
});
export default ProfileScreen;
