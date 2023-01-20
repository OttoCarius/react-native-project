import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import RegistrationScreen from './Screens/Auth/RegistrationScreen'
import LoginScreen from './Screens/Auth/LoginScreen'
import {Home} from './Screens/MainScreen/Home'

const AuthStack = createStackNavigator();

export const useRoute = (isAuth) => {
  return (
    <AuthStack.Navigator>
      {!isAuth ? (
        <>
          <AuthStack.Screen
            options={{
              headerShown: false,
            }}
            name="Login"
            component={LoginScreen}
          />
          <AuthStack.Screen
            options={{
              headerShown: false,
            }}
            name="Register"
            component={RegistrationScreen}
          />
        </>
      ) : (
        <AuthStack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
      )}
    </AuthStack.Navigator>
  );
};

