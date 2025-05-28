import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemedButton } from '@/components/ThemedButton';
import { ThemedModal } from '@/components/ThemedModel';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [adminModalVisible, setAdminModalVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ username: '', password: '' });
  const [adminPassword, setAdminPassword] = useState('');


  const handleSubmit = async () => {
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();
    try {
      const res = await axios.post('https://mccbackend.vercel.app/login', { // Fixed URL
        username: trimmedUsername,
        password: trimmedPassword

      });

      if (res.data.message === "Login successful") {
        await AsyncStorage.setItem('playerId', res.data.playerId);
        await AsyncStorage.setItem('playerName', res.data.playerName);
        await AsyncStorage.setItem('playerPhoto', res.data.playerPhoto);
           await AsyncStorage.setItem('role', 'player');
        await AsyncStorage.setItem('playerData', JSON.stringify(res.data));
      
        setUsername('');
        setPassword('');
        router.replace('/home');
        setModalVisible(false);

      } else {
        alert('Login failed');
      }
    } catch (err) {
      alert((err?.response?.data || 'Login failed'));
    }
  };
  const [role, setRole] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const storedRole = await AsyncStorage.getItem('role');
      setRole(storedRole);
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>

<ThemedText type="boldTitle"  style={{ textAlign: 'center', flexWrap: 'wrap', color:'#007bff' }}>Welcome To MCC</ThemedText>

      <ThemedButton title="Continue as Guest" type="primary" onPress={() => {
        AsyncStorage.setItem('role', 'guest');
        router.replace('/home');
      }} />

      <ThemedButton title="Admin Login" type="danger" onPress={() => setAdminModalVisible(true)} />

      <ThemedButton title="Player Login" type="success" onPress={() => setModalVisible(true)} />

      <ThemedModal
        visible={modalVisible}
        title="Player Login"
        onClose={() => setModalVisible(false)}
        onSubmit={handleSubmit}
        submitText="Login"
        inputs={[
          {
            label: 'Username',
            value: username,
            onChangeText: text => {
              setUsername(text);
              setErrors(prev => ({ ...prev, username: '' }));
            },
            placeholder: 'Enter username',
            error: errors.username,
          },
          {
            label: 'Password',
            value: password,
            onChangeText: text => {
              setPassword(text);
              setErrors(prev => ({ ...prev, password: '' }));
            },
            placeholder: 'Enter password',
            error: errors.password,
          },
        ]}
      />

      <ThemedModal
        visible={adminModalVisible}
        title="Admin Login"
        onClose={() => setAdminModalVisible(false)}
        onSubmit={() => {
          if (adminPassword === '1234') {
            AsyncStorage.setItem('role', 'admin');
            router.replace('/admin/adminpanel');
          } else {
            Alert.alert('Incorrect Password');
          }
        }}
        submitText="Enter"
        inputs={[
          {
            label: 'Password',
            value: adminPassword,
            onChangeText: setAdminPassword,
            placeholder: 'Enter admin password',
            secureTextEntry: true,
          },
        ]}
      />


    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, gap: 20 },
  modal: { backgroundColor: 'white', padding: 20, margin: 50, borderRadius: 10, gap: 10 },
  input: { borderBottomWidth: 1, padding: 8 },
});
