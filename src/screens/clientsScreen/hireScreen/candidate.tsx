import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  Linking,
} from "react-native";
import ModalCreateContract from "../contractScreen/modalCreateContract";
import { useState } from "react";
import { formatDate, formatTimePost } from "../../../utils/format";
import IconAntDesign from "react-native-vector-icons/AntDesign";
const Candidate = ({ navigation, candidate }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalDetailVisible, setModalDetailVisible] = useState(false);
  const handCreateContract = () => {
    setModalVisible(true);
  };
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <View style={{ marginLeft: 10 }}>
          <Text style={{ fontSize: 13, fontStyle: "italic", color: "blue" }}>
            {formatTimePost(candidate?.updated_at)}
          </Text>
          <Text style={{ fontSize: 20 }}>{candidate?.username}</Text>
          <Text style={{ fontSize: 20, color: "green" }}>
            proposal: {candidate?.proposal}
          </Text>
        </View>
      </View>
      <View style={styles.containerFooter}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#FFC90E" }]}
          onPress={() => setModalDetailVisible(!modalDetailVisible)}
        >
          <Text style={{ fontSize: 16, color: "white" }}>Xem chi tiết</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: "red" }]}>
          <Text style={{ fontSize: 16, color: "white" }}>Từ chối</Text>
        </TouchableOpacity>
      </View>
      {/* modal contract */}
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <ModalCreateContract
          navigation={navigation}
          setmodalvisiable={setModalVisible}
        />
      </Modal>
      {/* modal detail candidate */}
      <Modal
        visible={modalDetailVisible}
        animationType="slide"
        transparent={true}
      > 
        <View style={{ flex: 1, justifyContent: "center"}}>
          <View
            style={{
              backgroundColor: "white",
            
              borderRadius: 20,
              margin: 5,
              padding: 10,
              borderColor:"black",
              borderWidth:1
            }}
          >
            <IconAntDesign
                name="closecircle"
                size={24}
                color="gray"
                onPress={() => setModalDetailVisible(false)}
              />
            <Text style={{ fontSize: 25, textAlign: "center", margin: 10 }}>
              Chi tiết ứng viên
            </Text>
            <View>
              <Text style={styles.text}>Username: {candidate?.username}</Text>
              <Text style={styles.text}>Email: {candidate?.email}</Text>
              <Text style={styles.text}>Proposal: {candidate?.proposal}</Text>
              <Text style={styles.text}>
                Ngày ứng tuyển: {formatDate(candidate?.updated_at)}
              </Text>
              <Text style={styles.text}>
                Giới thiệu: {candidate?.cover_letter}
              </Text>
              {candidate?.attachment_url === null ||
              candidate?.attachment_url === "" ? null : (
                <View>
                  <Text style={styles.text}>File đính kèm</Text>
                  <TouchableOpacity
                    style={{ flexDirection: "row", alignItems: "center" }}
                    onPress={() => Linking.openURL(candidate?.attachment_url)}
                  >
                    <IconAntDesign name="filetext1" size={30} color="black" />
                    <Text style={{ fontStyle: "italic" }}>
                      {String(candidate["attachment_url"]).split("/").pop()}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
            <View style={[styles.containerFooter]}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "green" }]}
                onPress={handCreateContract}
              >
                <Text style={{ fontSize: 16, color: "white" }}>
                  Tạo hợp đồng
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "red" }]}
              >
                <Text style={{ fontSize: 16, color: "white" }}>Từ chối</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
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
    marginVertical: 5,
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
  },
});

export default Candidate;
