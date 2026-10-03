import { authClient } from "@/lib/auth-client";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const API_BASE = "http://192.168.1.6:5000"; // same baseURL as auth-client

export default function FamilySignup() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setLoading(true);
    const { error } = await authClient.signUp.email({ email, password, name });

    if (error) {
      setLoading(false);
      Alert.alert(
        "Sign up failed",
        error.message || "Please check your details",
      );
      return;
    }

    if (inviteCode.trim() === "") {
      setLoading(false);
      router.push("/family/create-patient"); // creating a new patient
      return;
    }

    // joining an existing patient
    const res = await fetch(`${API_BASE}/api/patients/join`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ inviteCode }),
    });
    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      Alert.alert(
        "Couldn't join patient",
        data.error || "Check the invite code",
      );
      return;
    }
    router.push("/family/home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Family Sign Up</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Invite Code (if joining an existing patient)"
        autoCapitalize="characters"
        value={inviteCode}
        onChangeText={setInviteCode}
      />
      <Text style={styles.hint}>
        Leave the invite code blank to create a new patient profile instead.
      </Text>

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={handleSignup}
        disabled={loading}
      >
        <Text style={styles.primaryButtonText}>
          {loading ? "Creating..." : "Create Account"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/family/login")}>
        <Text style={styles.linkText}>Already have an account? Log in</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#FAF7F2",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#333",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#E0DCD5",
  },
  hint: { fontSize: 12, color: "#999", marginBottom: 16, marginTop: -6 },
  primaryButton: {
    backgroundColor: "#51121A",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: "center",
    marginTop: 4,
  },
  primaryButtonText: { color: "#fff", fontSize: 17, fontWeight: "600" },
  linkText: {
    color: "#51121A",
    textAlign: "center",
    marginTop: 18,
    fontSize: 14,
  },
});
