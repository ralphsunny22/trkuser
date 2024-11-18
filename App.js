import React, { useEffect, useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import OtpFormScreen from './src/screens/otp/OtpFormScreen';
import OtpTokenScreen from './src/screens/otp/OtpTokenScreen';
// import LoginScreen from './src/screens/auth/LoginScreen';
// import RegisterScreen from './src/screens/auth/RegisterScreen';

import AndroidLandingScreen from './src/screens/landing/AndroidLandingScreen';

const Stack = createStackNavigator();

/////
export default function App() {
  // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isAuthenticated = false;
  console.log({isAuthenticated});

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated ? (
          <>
            <Stack.Screen name="AndroidLandingScreen" component={AndroidLandingScreen} options={{ headerShown: false }} />
          </>
        ) : (
          <>
            <Stack.Screen name="OtpFormScreen" component={OtpFormScreen} options={{ headerShown: false }} />
            <Stack.Screen name="OtpTokenScreen" component={OtpTokenScreen} options={{ headerShown: false }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
