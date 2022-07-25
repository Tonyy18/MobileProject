import React, { useEffect, useState } from 'react';;
import LoginPage from "./src/views/LoginPage";
import RegisterPage from "./src/views/RegisterPage";
import LoadingPage from "./src/views/LoadingPage";
import MainView from "./src/api/auth";
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
