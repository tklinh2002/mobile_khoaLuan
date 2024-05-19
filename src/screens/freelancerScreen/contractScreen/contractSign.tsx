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
import ModalDetailSign from "./modalDetailSign";
import { useContractRead } from "wagmi";
import { abi } from "../../../../abi";
const ContractSign = ({contract}) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.text}>Tên Client</Text>
        </View>
        <Text style={styles.title} numberOfLines={5}>
          {contract?.title}
        </Text>
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
      </View>
      <Modal
        animationType="slide"
        visible={modalVisible}
      >
        <ModalDetailSign setmodalvisiable={setModalVisible} contract={contract}/>
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
