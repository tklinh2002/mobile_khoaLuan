import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import Header from "../../component/header";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import Job from "./job";
import ModalJob from "../jobScreen/modalJob";
import React, { useState } from "react";
const PostScreen = ({navigation}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const handCreateJob = () => {
        setModalVisible(true);
    }

  return (
    <View>
      <Header navigation={navigation}/>
      <Text style={{ fontSize: 30, fontWeight: "bold", marginLeft: 10 }}>
        Dashboard
      </Text>
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: 10,
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 25, fontWeight: "500", flex: 1 }}>
          List job post
        </Text>
        <TouchableOpacity onPress={handCreateJob}>
          <View style={styles.button}>
            <IconAntDesign name="plus" size={30} color="white" />
            <Text style={{ fontSize: 20, fontWeight: "500", color: "white" }}>
              Tạo job
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView>
        <Job navigation={navigation}/>
      </ScrollView>

      {/* modal */}

      <Modal visible={modalVisible} animationType="slide"> 
        <ModalJob setModalVisible={setModalVisible}/>
    </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "green",
    padding: 5,
    borderRadius: 10,
    flexDirection: "row",
    marginRight: 20,
  },
});
export default PostScreen;
