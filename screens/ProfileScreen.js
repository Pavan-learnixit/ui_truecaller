import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, TextInput, TouchableOpacity, Image, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { launchImageLibrary } from "react-native-image-picker";
import LinearGradient from "react-native-linear-gradient";
import { commonColors } from "../components/Common";

const ProfileScreen = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    company: "Learnixit IT",
    title: "Web Developer",
    zipCode: "560048",
    city: "Bangalore",
    country: "India",
  });
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem("user");
        const storedImage = await AsyncStorage.getItem("profileImage");
        if (userData) {
          const parsedData = JSON.parse(userData);
          setForm((prevForm) => ({
            ...prevForm,
            firstName: parsedData.firstName || "",
            lastName: parsedData.lastName || "",
            phone: parsedData.mobile || "",
          }));
        }
        if (storedImage) {
          setProfileImage(storedImage);
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      }
    };
    loadUserData();
  }, []);

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const selectImage = () => {
    const options = { mediaType: "photo", quality: 1 };
    launchImageLibrary(options, async (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("Image picker error:", response.error);
      } else {
        const imageUri = response.assets[0].uri;
        setProfileImage(imageUri);
        await AsyncStorage.setItem("profileImage", imageUri);
      }
    });
  };

  return (
    <LinearGradient colors={[commonColors.gradiend1, commonColors.light]} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        {/* Profile Image Section */}
        <View style={styles.profileContainer}>
          <TouchableOpacity onPress={selectImage}>
            <Image
              source={profileImage ? { uri: profileImage } : require("../assets/images/logo.png")}
              style={styles.profileImage}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.editIcon} onPress={selectImage}>
            <Icon name="camera" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Input Fields */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>First Name</Text>
          <TextInput style={styles.input} value={form.firstName} onChangeText={(text) => handleChange("firstName", text)} />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Last Name</Text>
          <TextInput style={styles.input} value={form.lastName} onChangeText={(text) => handleChange("lastName", text)} />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput style={styles.input} value={form.phone} keyboardType="phone-pad" onChangeText={(text) => handleChange("phone", text)} />
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.button} onPress={() => alert("Profile Saved!")}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 20,
    alignItems: "center",
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#fff", // Matches gradient background
  },
  editIcon: {
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: "#007aff",
    padding: 6,
    borderRadius: 15,
  },
  inputGroup: {
    width: "100%",
    marginBottom: 15,
  },
  label: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 5,
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.2)", // Semi-transparent for gradient effect
    color: "white",
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    width: "100%",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.5)",
  },
  button: {
    backgroundColor: "#007aff",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
