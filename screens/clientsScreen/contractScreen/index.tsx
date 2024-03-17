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
import Contract from "./contract";
import ModalJob from "../jobScreen/modalJob";
import React, { useState } from "react";
import ModalCreateContract from "./modalCreateContract";
const ContractScreen = ({navigation}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const handCreateJob = () => {
        setModalVisible(true);
    }

  return (
    <View>
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
          Danh sách hợp đồng
        </Text>
        <TouchableOpacity onPress={handCreateJob}>
          <View style={styles.button}>
            <IconAntDesign name="plus" size={30} color="white" />
            <Text style={{ fontSize: 20, fontWeight: "500", color: "white" }}>
              Hợp đồng
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView>
        <Contract navigation={navigation}/>
      </ScrollView>

        {/* modal create contract */}
      <Modal
        animationType="slide"
        visible={modalVisible}
        >
          <ModalCreateContract navigation={navigation} setmodalvisiable={setModalVisible}/>
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
export default ContractScreen;
