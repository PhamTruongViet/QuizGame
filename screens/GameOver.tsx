import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";

const GameOver = ({ route, navigation }) => {
  const { ansCounter } = route.params;
  return (
    <View style={styles.container}>
      <LottieView
        source={require("../assets/gameoverText.json")}
        autoPlay
        loop
        style={{ width: 400, height: 300 }}
      />
      <View style={{ flexDirection: "row" }}>
        <Text style={{ color: "#e2a36d", fontSize: 20 }}>{ansCounter}</Text>
        <Text style={{ color: "#e2a36d", fontSize: 20 }}>
          /5 Correct Answers
        </Text>
      </View>
      <LottieView
        source={require("../assets/gameoverAnimation.json")}
        autoPlay
        loop
        style={{ width: 350, height: 250 }}
      />
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Text style={styles.btn}>Play Again</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GameOver;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#421a69",
  },
  btn: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#e2a36d",
    padding: 10,
    borderRadius: 50,
  },
});
