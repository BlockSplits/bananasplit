import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-web";

export default function Login({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 36 }}>Login Page</Text>
      {/* <StatusBar style="auto" /> */}
      <div style={{marginTop: 50}}>
        <Button
          title="Go to Dashboard"
          onPress={() => navigation.navigate("dashboard")}
          style={styles.button}
          color="grey"
        />
      </div>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#bcbcbc",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "grey !important",
    marginTop: "50px",
  },
});
