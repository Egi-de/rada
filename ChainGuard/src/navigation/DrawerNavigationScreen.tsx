import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { BottomNavigation } from './BottomNavigationScreen';
import { colors } from '../constants/colors';

const Drawer = createDrawerNavigator();

export const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: colors.primaryGold,
        drawerInactiveTintColor: colors.textDark,
        drawerStyle: {
          backgroundColor: colors.white,
        },
      }}
    >
      <Drawer.Screen 
        name="MainTab" 
        component={BottomNavigation} 
        options={{ title: 'Home' }} 
      />
      {/* You can add more screens here that should be in the drawer but not in the bottom tabs */}
    </Drawer.Navigator>
  );
};
