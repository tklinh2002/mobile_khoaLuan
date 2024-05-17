import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartScreen from '../screens/startScreen';
import LoginScreen from '../screens/loginScreen';
import SignUpScreen from '../screens/signUpScreen';
import RouteClient from './routeClient';
import HireScreen from '../screens/clientsScreen/hireScreen';
import TabDetailJob from './tabDetailJob';
import HeaderDetailJob from '../screens/clientsScreen/detailJob/header';
import RouteFreelancer from './routeFreelancer';
import Header from '../screens/component/header';
import ChoiceRoleScreen from '../screens/signUpScreen/choiceRoleScreen';
import ConfirmOtp from '../screens/signUpScreen/cofirmOtp';
import TestScreen from '../testscreen';
import TaskScreen from '../screens/freelancerScreen/taskScreen/taskScreen';

const Stack = createNativeStackNavigator();

const Route = () => {
  return (
    <Stack.Navigator
      initialRouteName="Start"
    >
      <Stack.Screen name="Start" component={StartScreen} options={{ headerShown: false, title: "" }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ title: ""}} />
      <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false, title: "" }} />
      <Stack.Screen name="ChoiceRole" component={ChoiceRoleScreen} options={{ headerShown: false, title: "" }} />
      <Stack.Screen name="ConfirmOtp" component={ConfirmOtp} options={{ title: "Xác nhận OTP", headerTitleStyle:{
        color: "green",
        fontSize: 25,
        fontWeight: "bold"
      }}} />
      <Stack.Screen name="HomeClient" component={RouteClient} options={{ header:()=><Header/>, title:""}} />
      <Stack.Screen name="TabDetailJob" component={TabDetailJob} options={{ title: "", header: ()=><HeaderDetailJob/>}} />
      <Stack.Screen name="HomeFreelancer" component={RouteFreelancer} options={{ title: "", header:()=><Header/>}} />
      <Stack.Screen name="Test" component={TestScreen} options={{ title: "" }} />
      <Stack.Screen name="Task" component={TaskScreen} options={{ title: "" }} />

    </Stack.Navigator>
  )
}
export default Route
