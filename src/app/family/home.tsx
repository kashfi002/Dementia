import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function FamilyHome() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Family Dashboard</Text>
      <Text style={styles.subtitle}>(logged in — dummy screen)</Text>
      <TouchableOpacity style={styles.button} onPress={() => router.push("/")}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FAF7F2",
  },
  title: { fontSize: 24, fontWeight: "700", color: "#333" },
  subtitle: { fontSize: 14, color: "#999", marginTop: 8, marginBottom: 30 },
  button: {
    backgroundColor: "#51121A",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 12,
  },
  buttonText: { color: "#fff", fontWeight: "600", fontSize: 16 },
});
