import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
} from "react-native";
import { formatTimePost } from "../../../utils/format";
import ModalCreateContract from "../contractScreen/modalCreateContract";
const Invite = ({ item }) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const i = item.status;
  const status = {
    0: {
      color: "#FFA500",
      text: "Chờ xác nhận",
    },
    1: {
      color: "#0866FF",
      text: "Đã xác nhận",
    },
  };

  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <View style={{ marginLeft: 10 }}>
          <Text style={{ fontSize: 13, fontStyle: "italic", color: "blue" }}>
            {formatTimePost(item?.updated_at)}
          </Text>
          <Text style={{ fontSize: 20 }}>Username: {item.username}</Text>
        </View>
      </View>
      <View style={styles.containerFooter}>
        <Text style={styles.text}>Email: {item.email}</Text>
      </View>
      <View style={styles.containerFooter}>
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: status[i].color, width: 125 },
          ]}
        >
          <Text style={{ fontSize: 16, color: "white" }}>{status[i].text}</Text>
        </TouchableOpacity>
        {item.status == 1 ? (
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "green" }]}
            onPress={() => setModalVisible(true)}
          >
            <Text style={{ fontSize: 16, color: "white" }}>Taọ hợp đồng</Text>
          </TouchableOpacity>
        ) : null}
        <TouchableOpacity style={[styles.button, { backgroundColor: "red" }]}>
          <Text style={{ fontSize: 16, color: "white" }}>Thu hồi</Text>
        </TouchableOpacity>
      </View>
      {/* cadidate:{
  freelancer_id: number;
  job_id: number;
  username: string;
  email: string;

} */}
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <ModalCreateContract
          setmodalvisiable={setModalVisible}
          candidate={item}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "black",
    marginHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    marginVertical: 10,
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginHorizontal: 10,
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
  },
  containerFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    marginHorizontal: 20,
  },
  button: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Invite;
