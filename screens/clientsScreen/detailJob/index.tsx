import { View, Text, StyleSheet, ScrollView } from "react-native";
import Skill from "../../freelancerScreen/findJobScreen/skill";

const DetailJob = () => {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>FrontEnd</Text>
            <Text style={styles.text} >Mô tả công việc:
            </Text>
            <Text style={styles.text}>Chi tiết công việc</Text>
            <Text style={styles.text}>Ngân sách: 1000</Text>
            <Text style={styles.text}>Thời hạn: 28/08/2024</Text>
            <Text style={styles.text}>Kỹ năng</Text>
            <View style={styles.containerSkill}>
                <Skill name='Java'/>
            </View>
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    container:{
        flex: 1,
        borderColor: 'green',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        margin: 10,
    },
    title:{
        fontSize: 20,
        fontWeight: 'bold',
        color: 'green',
        marginBottom: 10,
    },
    text:{
        fontSize: 16,
        fontWeight: '400',
        color: 'black',
        marginBottom: 5,
        padding: 5,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        marginVertical:10,
        textAlign: 'left',
    },
    containerSkill:{
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
});
export default DetailJob;