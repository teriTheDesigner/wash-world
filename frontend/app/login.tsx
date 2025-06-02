import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useDispatch } from "react-redux";
import { setToken } from "./store/auth/authSlice";
import { Link, useRouter } from "expo-router";
import { setUser, UserState } from "./store/user/userSlice";
import WelcomeScreen from "./WelcomeScreen";
import { UserAPI } from "./store/user/userAPI";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [userName, setUserName] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Email and password are required");
      return;
    }

    setLoading(true);

    try {
      const data: { access_token: string; user: UserState } =
        await UserAPI.login(email, password);

      dispatch(setToken(data.access_token));
      dispatch(setUser(data.user));

      Alert.alert("Success", "Logged in successfully");
      setUserName(data.user.name || "Unknown User");
      setShowWelcome(true);
    } catch (error: any) {
      Alert.alert(
        "Login failed",
        error.response?.data?.message || error.message || "Invalid credentials"
      );
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleWelcomeFinish = () => {
    setShowWelcome(false);
    router.replace("/");
  };

  if (showWelcome) {
    return <WelcomeScreen name={userName} onFinish={handleWelcomeFinish} />;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log In</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <>
          <TouchableOpacity
            style={styles.button}
            onPress={handleLogin}
            testID="loginButton"
          >
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>

          <Text style={styles.loginText}>
            Don't have an account?{" "}
            <Link href="/signup" style={styles.signupLink}>
              Sign up
            </Link>
          </Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  signupLink: {
    textDecorationLine: "underline",
    color: "#34B566",
    fontWeight: "600",
  },
  loginText: {
    marginTop: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#34B566",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
});
