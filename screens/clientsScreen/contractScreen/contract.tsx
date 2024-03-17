import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import IconEntypo from "react-native-vector-icons/Entypo";
import { useState } from "react";
import { useQueries } from "@tanstack/react-query";
import ModalCreateContract from "./modalCreateContract";
import { Button } from "react-native-paper";
const Contract = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const i = 3;
  const status = {
    0: {
      text: "Chưa ký",
      color: "#FFAE12",
    },

    1: {
      text: "Đang thực hiện",
      color: "#0866FF",
    },
    2: {
      text: "Đã hủy",
      color: "red",
    },
    3: {
      text: "Đã hoàn thành",
      color: "green",
    },
  };

  return (
    <View style={styles.container}>
      <View style={{flexDirection:"row"}}>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "green",
              marginHorizontal: 10,
            }}
          >
            Backend
          </Text>
          <View style={{ marginLeft: 10, marginTop: 10 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "gray",
              }}
            >
              Ngày tạo: 27/02/2024
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              marginHorizontal: 10,
              marginVertical: 10,
            }}
          >
            <Image
              source={require("../../../assets/avatar_temp.jpg")}
              style={{ width: 50, height: 50, borderRadius: 25 }}
            />
            <Text style={{ marginHorizontal: 10, fontSize: 16 }}>
              Nguyễn Văn a
            </Text>
          </View>
          <Text
            style={{ fontSize: 16, fontWeight: "700", marginHorizontal: 10 }}
          >
            2ETH
          </Text>
        </View>

        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <View
            style={[
              styles.button,
              { padding: 10, width: 160 },
              { backgroundColor: status[i].color },
            ]}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "700",
                marginHorizontal: 10,
                color: "white",
              }}
            >
              {status[i].text}
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity>
        <Button
          mode="contained"
          style={{ marginHorizontal: 10, marginVertical: 10, borderRadius: 10 }}
        >
          Xem chi tiết hợp đồng
        </Button>
      </TouchableOpacity>
    </View>
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
export default Contract;
