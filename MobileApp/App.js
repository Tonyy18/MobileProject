import React, { useEffect, useState } from 'react';;
import LoginPage from "./components/index/LoginPage";
import RegisterPage from "./components/index/RegisterPage";
import LoadingPage from "./components/index/LoadingPage";
import MainView from "./components/auth/authentication";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
const App = () => {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Loading" component={LoadingPage} options={{headerShown: false}}/>
          <Stack.Screen name="Login" component={LoginPage} options={{headerShown: false}}/>
          <Stack.Screen name="Register" component={RegisterPage} options={{headerShown: false}}/>
          <Stack.Screen name="Authenticated" component={MainView} options={{headerShown: false}}/>
        </Stack.Navigator>
      </NavigationContainer>

    );
};

export default App;
