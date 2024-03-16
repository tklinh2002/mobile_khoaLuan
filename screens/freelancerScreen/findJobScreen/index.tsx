import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TouchableHighlight,
  Keyboard,
  TouchableNativeFeedback,
  ScrollView,
  Modal,
} from "react-native";
import Header from "../../component/header";
import IconEntypo from "react-native-vector-icons/Entypo";
import Job from "./job";
import { useState } from "react";
import ModalFind from "./modalFind";
const PAGE_SIZE = 5;
const length = 40; // total number of items
const FindJodScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalPages = Math.ceil(length / PAGE_SIZE);

  const startIndex = (currentPage - 1) * PAGE_SIZE;

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };
  return (
    <TouchableNativeFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ScrollView style={styles.container}>
        <Header navigation={navigation} />
        <Text style={{ fontSize: 30, fontWeight: "bold", marginLeft: 10 }}>
          Tìm công việc
        </Text>
        {/* tìm kiếm */}
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} placeholder="Nhập ....." />
          <TouchableOpacity style={styles.buttonSeacrh}>
            <IconEntypo name="magnifying-glass" size={30} color="white" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={()=>setModalVisible(true)}>
          <Text style={{ margin: 10, fontStyle: "italic", color: "green" }}>
            Tìm kiếm nâng cao
          </Text>
        </TouchableOpacity>
        {/* danh sách công việc */}
        <Job />
        <Job />
        <Job />
        <Job />
        <Job />

        <View style={styles.paginationContainer}>
          {/* Render pagination controls */}
          <TouchableOpacity
            style={[styles.paginationButton, { marginRight: 10 }]}
            onPress={goToPreviousPage}
            disabled={currentPage === 1}
          >
            <Text style={styles.paginationButtonText}>Previous</Text>
          </TouchableOpacity>
          <Text style={styles.paginationText}>
            Page {currentPage} of {totalPages}
          </Text>
          <TouchableOpacity
            style={styles.paginationButton}
            onPress={goToNextPage}
            disabled={currentPage === totalPages}
          >
            <Text style={styles.paginationButtonText}>Next</Text>
          </TouchableOpacity>
        </View>

        {/*Modal tìm kiếm*/}

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <ModalFind setModalVisible={setModalVisible} />
        </Modal>
      </ScrollView>
    </TouchableNativeFeedback>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    marginTop: 10,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    paddingHorizontal: 10,
  },
  buttonSeacrh: {
    padding: 10,
    backgroundColor: "#0866FF",
  },
  paginationContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 40,
  },
  paginationButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#007bff",
    borderRadius: 5,
    width: 110,
    alignItems: "center",
  },
  paginationButtonText: {
    color: "white",
    fontSize: 16,
  },
  paginationText: {
    fontSize: 16,
    marginHorizontal: 10,
    textAlign: "center",
  },
});
export default FindJodScreen;
