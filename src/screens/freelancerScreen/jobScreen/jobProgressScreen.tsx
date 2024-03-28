import { View, Text, ScrollView } from "react-native"
import Job from "../../clientsScreen/postScreen/job";
import JobProgress from "./jobProgress";

const JobProgressScreen = () => {
    return(
    <ScrollView>
        <JobProgress/>
    </ScrollView>
    )
}
export default JobProgressScreen;