import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require("../assets/banner.json")}
        autoPlay
        loop
        style={{ width: 430, height: 330 }}
      />
      <TouchableOpacity onPress={() => navigation.navigate("QuizGame")}>
        <LottieView
          source={require("../assets/button.json")}
          autoPlay
          loop
          style={{ width: 300, height: 250 }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#421a69",
    alignItems: "center",
    justifyContent: "center",
  },
});
