import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import QuizGame from "./screens/QuizGame";

import React from "react";
import Home from "./screens/Home";
import GameOver from "./screens/GameOver";
import { NavigationContainer } from "@react-navigation/native";
const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="QuizGame"
          component={QuizGame}
          options={{ animation: "slide_from_right" }}
        />
        <Stack.Screen
          name="GameOver"
          component={GameOver}
          options={{ animation: "slide_from_right" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
