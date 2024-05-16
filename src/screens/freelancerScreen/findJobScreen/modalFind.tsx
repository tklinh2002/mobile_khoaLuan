import { View, StyleSheet, Text } from "react-native";
import { RadioButton, Searchbar } from "react-native-paper";
import { useState } from "react";
import Skill from "../../clientsScreen/jobScreen/skill";
import IconAntDesign from "react-native-vector-icons/AntDesign";
const ModalFind = ({ setModalVisible }) => {
  const [value, setValue] = useState("new");
  const [bids, setBids] = useState("asc");
  const [search, setSearch] = useState("");
  return (
    <View style={styles.container}>
      <View style={styles.content}>
      <View style={{flexDirection:"row", justifyContent:"space-between", marginVertical:20}}>
        <Text style={styles.title}>Tìm kiếm nâng cao</Text>
      <IconAntDesign
              name="closecircle"
              size={30}
              color="black"
              onPress={() => setModalVisible(false)}
            />
      </View>
        {/* Điều kiện */}
        <View style={styles.condition}>
          <RadioButton.Group
            onValueChange={(newValue) => {
              setValue(newValue);
              // console.log(newValue);
            }}
            value={value}
          >
            <View style={styles.elementRadio}>
              <RadioButton value="new" />
              <Text style={styles.text}>Sắp xếp mới nhất</Text>
            </View>
            <View style={styles.elementRadio}>
              <RadioButton value="old" />
              <Text style={styles.text}>Sắp xếp lâu nhất</Text>
            </View>
          </RadioButton.Group>
        </View>

        <View style={styles.condition}>
          <RadioButton.Group
            onValueChange={(newValue) => {
              setBids(newValue);
            }}
            value={bids}
          >
            <View style={styles.elementRadio}>
              <RadioButton value="asc" />
              <Text style={styles.text}>Ngân sách tăng dần</Text>
            </View>
            <View style={styles.elementRadio}>
              <RadioButton value="desc" />
              <Text style={styles.text}>Ngân sách giảm dần</Text>
            </View>
          </RadioButton.Group>
        </View>

        <View>
          <Searchbar
            style={{ backgroundColor: "#C0C0C0" }}
            placeholder="Tìm kiếm Kỹ năng"
            onChangeText={(text) => setSearch(text)}
            value={search}
          />
          <Text style={{ fontSize: 16, fontWeight: "bold", marginVertical:10 }}>Kỹ năng</Text>
            <View style={{flexWrap:"wrap", flexDirection:"row"}}>
              <Skill skill={{desc:1123}}/>
            </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    backgroundColor: "white",
    flex: 1,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 20,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  elementRadio: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
  },
  condition: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 10,
  },
});
export default ModalFind;
