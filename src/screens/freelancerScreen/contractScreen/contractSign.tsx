import React from "react";
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
import ModalDetailContract from "../../component/modalDetailContract";
const ContractSign = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.container}>
      <View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            style={{ width: 50, height: 50, borderRadius: 20 }}
            source={require("../../../assets/avatar_temp.jpg")}
          />
          <Text style={styles.text}>Tên Client</Text>
        </View>
        <Text style={styles.title} numberOfLines={5}>
          Frontend
        </Text>
        <View>
          <Text style={styles.text}>Ngân sách: 1000$</Text>
          <Text style={styles.text}>Ngày tạo: 20/07/2024</Text>
          <Text style={styles.text}>Hạn chót: 20/08/2024</Text>
          <Text style={styles.text}>Trạng thái: Đang chờ</Text>
        </View>
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
        <TouchableOpacity>
          <Button
            mode="contained"
            style={{ margin: 5, backgroundColor: "green" }}
          >
            Chấp nhận
          </Button>
        </TouchableOpacity>
        <TouchableOpacity>
          <Button
            mode="contained"
            style={{ margin: 5, backgroundColor: "red" }}
          >
            Từ chối
          </Button>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        visible={modalVisible}
      >
        <ModalDetailContract setmodalvisiable={setModalVisible} />
      </Modal>
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
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
});
export default ContractSign;