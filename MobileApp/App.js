import React from 'react';;
import LoginPage from "./components/index/LoginPage";
import RegisterPage from "./components/index/RegisterPage";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginPage} options={{headerShown: false}}/>
        <Stack.Screen name="Register" component={RegisterPage} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>

  );
};

export default App;
