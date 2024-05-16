import * as React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import TalentScreen from '../screens/clientsScreen/talentScreen';
import PostScreen from '../screens/clientsScreen/postScreen';
import JobScreen from '../screens/clientsScreen/jobScreen';
import ContractScreen from '../screens/clientsScreen/contractScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ProfileScreen from '../screens/clientsScreen/profileScreen';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const Drawer = createDrawerNavigator();

const RouteClient = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Contract"
      screenOptions={{
        drawerActiveTintColor: '#e91e63',
        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: 'bold',
        },
        drawerStyle:{
          marginTop: -50
        }
      }}
    >
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}

        options={{
          drawerLabel: 'Cá nhân',
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={30} />
          ),
          title: "",
          headerShown: false
        }}
      />
      <Drawer.Screen
        name="Talent"
        component={TalentScreen}
        options={{
          drawerLabel: 'Ứng viên',
          drawerIcon: ({ color, size }) => (
            <IconEntypo name="users" color={color} size={30} />
          ),
          title: "",
          headerShown: false
        }}
      />
      <Drawer.Screen
        name="Post"
        component={PostScreen}
        options={{
          drawerLabel: 'Việc làm đã đăng',
          drawerIcon: ({ color, size }) => (
            <IconEntypo name="newsletter" color={color} size={30} />
          ),
          title: "",
          headerShown: false
        }}
      />
      <Drawer.Screen
        name="Job"
        component={JobScreen}
        options={{
          drawerLabel: 'Việc làm',
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="note-add" color={color} size={30} />
          ),
          title: "",
          headerShown: false
        }}
      />
      <Drawer.Screen
        name="Contract"
        component={ContractScreen}
        options={{
          drawerLabel: 'Hợp đồng',
          drawerIcon: ({ color, size }) => (
            <IconFontAwesome5 name="file-contract" color={color} size={30} />
          ),
          title: "",
          headerShown: false
        }}
      />
    </Drawer.Navigator>
  )
}

export default RouteClient;
