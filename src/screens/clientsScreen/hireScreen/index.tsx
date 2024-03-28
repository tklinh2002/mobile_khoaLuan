import { View, Text, ScrollView } from "react-native";
import Candidate from "./candidate";
import { useQueryClient } from "@tanstack/react-query";
import { useRoute } from "@react-navigation/native";

const HireScreen = ({navigation}) => {
    const route = useRoute();
    const id = route.params["id"];
    const queryClient = useQueryClient();
    const job = queryClient.getQueryData(["job", id]);
    const applied = job["applied"] || [];
    return (
        <ScrollView>
            {applied?.map((candidate) => (
                <Candidate key={candidate.id} navigation={navigation} />
            ))}
        </ScrollView>
    )
};
export default HireScreen; 