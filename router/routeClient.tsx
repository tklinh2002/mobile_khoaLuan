import * as React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import IconFeather from 'react-native-vector-icons/Feather';
import TalentScreen from '../screens/clientsScreen/talentScreen';
import PostScreen from '../screens/clientsScreen/postScreen';
import JobScreen from '../screens/clientsScreen/jobScreen';
import ContractScreen from '../screens/clientsScreen/contractScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ProfileScreen from '../screens/clientsScreen/profileScreen';

const Drawer = createDrawerNavigator();

const RouteClient = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Talent"
      screenOptions={{
        drawerActiveTintColor: '#e91e63',
        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: 'bold',
        },
      }}
    >
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          drawerLabel: 'Cá nhân',
          drawerIcon: ({ color, size }) => (
            <IconFeather name="users" color={color} size={size} />
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
            <IconFeather name="users" color={color} size={size} />
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
            <MaterialCommunityIcons name="contacts" color={color} size={size} />
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
            <MaterialCommunityIcons name="account" color={color} size={size} />
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
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
          title: "",
          headerShown: false
        }}
      />
    </Drawer.Navigator>
  )
}

export default RouteClient;
