import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import { useState } from "react";
import { Button, TextInput } from "react-native-paper";
import Skill from "../../clientsScreen/jobScreen/skill";
const ProfileScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
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
          <Image
            source={require("D:\\Code\\KLTN\\timViec\\assets\\avatar_temp.jpg")}
            style={{
              width: 120,
              height: 120,
              borderRadius: 30,
              marginLeft: 10,
              alignSelf: "center",
            }}
          />

          <View>
            <Text
              style={[styles.text, { color: "#C0C0C0", fontWeight: "bold" }]}
            >
              Tên
            </Text>
            <Text style={styles.text}>Nguyễn Văn A</Text>
            <Text
              style={[styles.text, { color: "#C0C0C0", fontWeight: "bold" }]}
            >
              Email
            </Text>
            <Text style={styles.text}>tklinh@gmail.com</Text>
            <Text
              style={[styles.text, { color: "#C0C0C0", fontWeight: "bold" }]}
            >
              Số điện thoại
            </Text>
            <Text style={styles.text}>0961613087</Text>
            <Text
              style={[styles.text, { color: "#C0C0C0", fontWeight: "bold" }]}
            >
              Địa chỉ
            </Text>
            <Text style={styles.text}>Bình Dương</Text>
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
          <TouchableOpacity
            style={styles.button}
            onPress={() => setModalVisible(true)}
          >
            <IconAntDesign name="edit" size={30} color="green" />
          </TouchableOpacity>
        </View>
        <View style={styles.info}>
          <View>
            <Text
              style={[styles.text, { color: "#C0C0C0", fontWeight: "bold" }]}
            >
              Giới thiệu bản thân
            </Text>
            <Text style={[styles.text, { fontSize: 18 }]}>
              Tôi là một người rất năng động và thích học hỏi
            </Text>
            <Text
              style={[styles.text, { color: "#C0C0C0", fontWeight: "bold" }]}
            >
              Kỹ năng
            </Text>
            <Text style={styles.text}>React Native, NodeJS, MongoDB</Text>
          </View>
        </View>
        <Modal animationType="slide" visible={modalVisible} transparent={true}>
          <View style={styles.containerModal}>
            <View style={styles.contentModal}>
              <IconAntDesign
                name="closecircle"
                size={30}
                color="black"
                onPress={() => setModalVisible(false)}
              />
              <View style={{ marginVertical: 20, flex:1 }}>
                <Text
                  style={[
                    styles.text,
                    { color: "#C0C0C0", fontWeight: "bold" },
                  ]}
                >
                  Giới thiệu bản thân
                </Text>
                <TextInput
                  mode="outlined"
                  multiline
                  numberOfLines={9}
                  label={"Giới thiệu bản thân"}
                  style={{ backgroundColor: "white" }}
                />
                <TextInput
                  mode="outlined"
                  multiline
                  numberOfLines={9}
                  label={"Tìm kỹ năng"}
                  style={{ backgroundColor: "white", marginVertical: 10 }}
                />
                <View style={styles.containerSkill}>
                  <Skill />
                </View>
                <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                  <Button
                    mode="contained"
                    color="green"
                    style={{ marginVertical: 10 }}
                  >
                    Lưu
                  </Button>
                  <Button
                    mode="contained"
                    color="green"
                    style={{ marginVertical: 10, backgroundColor: "red" }}
                  >
                    Hủy
                  </Button>
                </View>
              </View>
            </View>
          </View>
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
});
export default ProfileScreen;
