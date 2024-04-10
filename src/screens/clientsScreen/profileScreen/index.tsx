import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Modal,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getInfoUserApi, updateInfoUserApi } from "../../../apis/info.api";
import { Avatar, Button, TextInput } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
const ProfileScreen = ({ navigation }) => {
  const queryClient = useQueryClient();
  const infoLogin = queryClient.getQueryData(["infoLogin"]);
  const token = infoLogin["access_token"];
  const [modalVisible, setModalVisible] = useState(false);
  const [infoUser, setInfoUser] = useState() as any;
  const getInfoUser = useQuery({
    queryKey: ["getInfoUserApi"],
    queryFn: () =>
      getInfoUserApi(token)
        .then((res) => {
          return res.data.data;
        })
        .catch((err) => console.log(err["response"].data)),
  });
  const handEditModal = async () => {
    await setInfoUser({
      phoneNum: getInfoUser.data.phone_num,
      address: getInfoUser.data.address,
      introduce: getInfoUser.data.introduce,
      avatar: getInfoUser.data.avatar_url,
    });
    await setImage(getInfoUser.data.avatar_url);
    setModalVisible(true);
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
  const updateInfoUser = useMutation({
    mutationKey: ["updateInfoUserApi"],
    mutationFn: () => updateInfoUserApi(infoUser, token),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["getInfoUserApi"] });
      Alert.alert("Thông báo","Cập nhật thành công");
      
      await setModalVisible(false);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const handedit = () => {
 
    updateInfoUser.mutate();
  };
  if (getInfoUser.isLoading) {
    return <Text>Loading...</Text>;
  }
  return (
    <ScrollView style={styles.container}>
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
        <TouchableOpacity style={styles.button} onPress={handEditModal}>
          <IconAntDesign name="edit" size={30} color="green" />
        </TouchableOpacity>
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
          <Text style={[styles.text, { color: "#C0C0C0", fontWeight: "bold" }]}>
            Username
          </Text>
          <Text style={styles.text}>{getInfoUser.data.username}</Text>
          <Text style={[styles.text, { color: "#C0C0C0", fontWeight: "bold" }]}>
            Tên
          </Text>
          <Text style={styles.text}>
            {getInfoUser.data.last_name + " " + getInfoUser.data.first_name}
          </Text>
          <Text style={[styles.text, { color: "#C0C0C0", fontWeight: "bold" }]}>
            Email
          </Text>
          <Text style={styles.text}>{getInfoUser.data.email}</Text>
          <Text style={[styles.text, { color: "#C0C0C0", fontWeight: "bold" }]}>
            Số điện thoại
          </Text>
          <Text style={styles.text}>{getInfoUser.data.phone_num}</Text>
          <Text style={[styles.text, { color: "#C0C0C0", fontWeight: "bold" }]}>
            Địa chỉ
          </Text>
          <Text style={styles.text}>{getInfoUser.data.address}</Text>
          <Text style={[styles.text, { color: "#C0C0C0", fontWeight: "bold" }]}>
            Giới thiệu
          </Text>
          <Text style={styles.text}>{getInfoUser.data.introduce}</Text>
        </View>
      </View>
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
          <Text style={[styles.text, { color: "#C0C0C0", fontWeight: "bold" }]}>
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
          <Text style={[styles.text, { color: "#C0C0C0", fontWeight: "bold" }]}>
            Địa chỉ
          </Text>
          <TextInput
            mode="outlined"
            style={{ marginHorizontal: 10, backgroundColor: "white" }}
            value={infoUser?.address}
            multiline
            onChangeText={(text) => setInfoUser({ ...infoUser, address: text })}
          />
          <Text style={[styles.text, { color: "#C0C0C0", fontWeight: "bold" }]}>
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

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              margin: 20,
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
});
export default ProfileScreen;
