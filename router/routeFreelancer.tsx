import * as React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import IconFeather from 'react-native-vector-icons/Feather';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ProfileScreen from '../screens/freelancerScreen/profileScreen';
import FindJodScreen from '../screens/freelancerScreen/findJobScreen';
import ContractScreen from '../screens/freelancerScreen/contractScreen';
import TabJobFreelancer from './tabJobFreelancer';

const Drawer = createDrawerNavigator();

const RouteFreelancer = () => {
  return (
    <Drawer.Navigator
      initialRouteName="FindJob"
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
        name="FindJob"
        component={FindJodScreen}
        options={{
          drawerLabel: 'Tìm việc làm',
          drawerIcon: ({ color, size }) => (
            <IconFeather name="users" color={color} size={size} />
          ),
          title: "",
          headerShown: false
        }}
      />
      <Drawer.Screen
        name="Job"
        component={TabJobFreelancer}
        options={{
          drawerLabel: 'Việc làm',
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="contacts" color={color} size={size} />
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

export default RouteFreelancer;
