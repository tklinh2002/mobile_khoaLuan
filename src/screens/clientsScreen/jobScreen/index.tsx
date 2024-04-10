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
import ModalJob from "../postScreen/modalJob";
import React, { useState } from "react";
const JobScreen = ({navigation}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const handCreateJob = () => {
        setModalVisible(true);
    }

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: 10,
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <Text style={{ fontSize: 25, fontWeight: "500", flex: 1 }}>
          Danh sách công việc
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
export default JobScreen;
