import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Touchable,
  TouchableNativeFeedback,
  Keyboard,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import Job from "./job";
import { useState } from "react";
import IconAntDesign from "react-native-vector-icons/AntDesign";

const ModalCreateContract = ({ navigation, setmodalvisiable }) => {
  const [tasks, setTasks] = useState([]);

  const handleDeleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    console.log(newTasks);
    setTasks(newTasks);
  };
  const handAddTask = () => {
    setTasks([...tasks, ""]);
  };
  const loadTasks = () => {
    return tasks.map((task, index) => (
      <View key={index} style={styles.task}>
        <Text>Task {index + 1}:</Text>
        <TextInput
          style={styles.inputTask}
          multiline={true}
          numberOfLines={4}
          placeholder="Nhập task"
          value={task}
          onChangeText={(text) => {
            setTasks((prev) => {
              const newTasks = [...prev];
              newTasks[index] = text;
              return newTasks;
            });
          }}
        />
        <TouchableOpacity onPress={() => handleDeleteTask(index)}>
          <IconAntDesign name="minuscircle" size={25} color="red" />
        </TouchableOpacity>
      </View>
    ));
  };

  return (
    <ScrollView>
      <TouchableNativeFeedback
        style={styles.container}
        onPress={Keyboard.dismiss}
      >
        <View style={styles.content}>
          <View style={{flexDirection:"row", alignItems:"center"}}>
            <Text style={[styles.text, { flex:1, textAlign:"center", paddingLeft:30}]}>Tạo hợp đồng</Text>
            <IconAntDesign
              name="close"
              size={30}
              color="black"
              onPress={() => setmodalvisiable(false)}
            />
          </View>
          <View style={styles.info}>
            <Text style={{ fontSize: 20 }}>Freelancer</Text>
            <Text style={styles.textInfo}>Tên: </Text>
            <Text style={styles.textInfo}>Email: </Text>
            <Text style={styles.textInfo}>Số điện thoại: </Text>
            <Text style={styles.textInfo}>Địa chỉ ví: </Text>
          </View>
          <View style={styles.info}>
            <Text style={{ fontSize: 20 }}>Client</Text>
            <Text style={styles.textInfo}>Tên: </Text>
            <Text style={styles.textInfo}>Email: </Text>
            <Text style={styles.textInfo}>Số điện thoại: </Text>
          </View>
          <Job navigation={navigation} />
          <View style={styles.containerTask}>
            <TouchableOpacity
              style={[styles.button, { alignItems: "center" }]}
              onPress={handAddTask}
            >
              <Text style={{ fontSize: 20, color: "green" }}>+ Thêm task</Text>
            </TouchableOpacity>
            {loadTasks()}
          </View>
          <View style={styles.containerButton}>
            <TouchableOpacity style={[styles.button,{backgroundColor:"#0866FF"}]}>
              <Text style={{ fontSize: 20, color: "white" }}>Tạo hợp đồng</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, {width:150, alignItems:"center", backgroundColor:"red"}]}>
              <Text style={{ fontSize: 20, color: "white" }}>Hủy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableNativeFeedback>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    marginTop: 40,
    marginHorizontal: 10,
    marginVertical: 10,
    
  },
  text: {
    fontSize: 30,
    marginHorizontal: 10,
    marginVertical: 5,
    alignSelf: "center",
    fontWeight: "bold",
  },
  button: {
    borderColor: "green",
    borderWidth: 1,
    borderRadius: 30,
    padding: 10,
  },
  containerTask: {
    marginHorizontal: 10,
    marginVertical: 10,
    flex: 1,
  },
  task: {
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputTask: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 7,
    marginHorizontal: 10,
    marginVertical: 10,
    flex: 1,
    paddingVertical: 10,
    fontSize: 14,
    alignSelf: "center",
  },
  textInfo: {
    fontSize: 16,
    marginHorizontal: 10,
    marginVertical: 5,
  },
  info: {
    marginVertical: 10,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  containerButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginVertical: 10,
  },
});
export default ModalCreateContract;
