import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const dummyProfiles = [
  {
    id: "1",
    name: "Patient1",
    avatar: require("../../../assets/images/oldperson.jpg"),
  },
];

export default function PatientLogin() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tap your picture</Text>

      {dummyProfiles.map((p) => (
        <TouchableOpacity
          key={p.id}
          style={styles.profileCard}
          onPress={() => router.push("/patient/home")}
        >
          <Image source={p.avatar} style={styles.avatar} />
          <Text style={styles.profileName}>{p.name}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.backText}>← Back</Text>
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
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
    marginBottom: 32,
  },
  profileCard: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 40,
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
  },
  backText: {
    color: "#999",
    marginTop: 20,
    fontSize: 14,
  },
});
