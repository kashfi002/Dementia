import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const API_BASE = "http://localhost:5000";

export default function CreatePatient() {
  const router = useRouter();
  const [patientName, setPatientName] = useState("");
  const [age, setAge] = useState("");
  const [dob, setDob] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);
  const [inviteCode, setInviteCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) setPhoto(result.assets[0].uri);
  };

  const handleCreate = async () => {
    setLoading(true);
    const res = await fetch(`${API_BASE}/api/patients`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        name: patientName,
        age: age ? Number(age) : undefined,
        dob,
        photoUrl: photo, // local URI for now — see note below
      }),
    });
    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      Alert.alert("Couldn't create profile", data.error || "Try again");
      return;
    }
    setInviteCode(data.patient.inviteCode);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Patient Profile</Text>

      {!inviteCode ? (
        <>
          <TouchableOpacity style={styles.photoPicker} onPress={pickImage}>
            {photo ? (
              <Image source={{ uri: photo }} style={styles.photoPreview} />
            ) : (
              <Text style={styles.photoPickerText}>+ Add Photo</Text>
            )}
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            placeholder="Patient's Name"
            value={patientName}
            onChangeText={setPatientName}
          />
          <TextInput
            style={styles.input}
            placeholder="Age"
            keyboardType="number-pad"
            value={age}
            onChangeText={setAge}
          />
          <TextInput
            style={styles.input}
            placeholder="Date of Birth (e.g. 12/05/1950)"
            value={dob}
            onChangeText={setDob}
          />

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleCreate}
            disabled={loading}
          >
            <Text style={styles.primaryButtonText}>
              {loading ? "Creating..." : "Create Profile"}
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.codeBox}>
          <Text style={styles.codeLabel}>Share this code with family:</Text>
          <Text style={styles.codeText}>{inviteCode}</Text>
          <Text style={styles.hint}>
            Other family members will enter this code when they sign up.
          </Text>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => router.push("/family/home")}
          >
            <Text style={styles.primaryButtonText}>Continue to Dashboard</Text>
          </TouchableOpacity>
        </View>
      )}
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
  photoPicker: {
    alignSelf: "center",
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E0DCD5",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    overflow: "hidden",
  },
  photoPreview: { width: "100%", height: "100%" },
  photoPickerText: { color: "#999", fontSize: 13, textAlign: "center" },
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
  primaryButton: {
    backgroundColor: "#51121A",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: "center",
    marginTop: 8,
  },
  primaryButtonText: { color: "#fff", fontSize: 17, fontWeight: "600" },
  codeBox: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
  },
  codeLabel: { fontSize: 14, color: "#777", marginBottom: 10 },
  codeText: {
    fontSize: 32,
    fontWeight: "700",
    letterSpacing: 4,
    color: "#51121A",
    marginBottom: 10,
  },
  hint: { fontSize: 12, color: "#999", marginBottom: 20, textAlign: "center" },
});
