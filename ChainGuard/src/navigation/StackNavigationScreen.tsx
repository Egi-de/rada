import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LoadingScreen } from '../screens/LoadingScreen';
import { WelcomeScreen } from '../screens/WelcomeScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { SignupScreen } from '../screens/SignupScreen';
import { OTPVerificationScreen } from '../screens/OTPVerificationScreen';
import { BottomNavigation } from './BottomNavigationScreen';

export type RootStackParamList = {
  Loading: undefined;
  Welcome: undefined;
  Login: undefined;
  Signup: undefined;
  OTPVerification: { email: string };
  App: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export const StackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Loading"
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#FFFFFF' },
      }}
    >
      <Stack.Screen name="Loading" component={LoadingScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="OTPVerification" component={OTPVerificationScreen} />
      <Stack.Screen name="App" component={BottomNavigation} />
    </Stack.Navigator>
  );
};
