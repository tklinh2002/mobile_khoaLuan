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

const Stack = createNativeStackNavigator();

const Route = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeClient"
    >
      <Stack.Screen name="Start" component={StartScreen} options={{ headerShown: false, title: "" }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ title: "", headerShown:false}} />
      <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false, title: "" }} />
      <Stack.Screen name="HomeClient" component={RouteClient} options={{ header:()=><Header/>, title:""}} />
      <Stack.Screen name="TabDetailJob" component={TabDetailJob} options={{ title: "", header: ()=><HeaderDetailJob/>}} />
      <Stack.Screen name="HomeFreelancer" component={RouteFreelancer} options={{ title: "", header:()=><Header/>}} />
    </Stack.Navigator>
  )
}
export default Route
