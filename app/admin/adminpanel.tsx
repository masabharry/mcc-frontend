import { View, Text, StyleSheet } from 'react-native';
import { ThemedButton } from '@/components/ThemedButton';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';

export default function AdminPanel() {
  return (
    <View style={styles.container}>
      {/* <Text>For Admin Only</Text> */}
      <ThemedText type="title" style={{ textAlign: 'center', flexWrap: 'wrap', color: '#ff0000' }}>
        Admin Panel
      </ThemedText>
      <ThemedText type="subtitle" style={{ textAlign: 'center', flexWrap: 'wrap', color: '#ff0000' }}>
        For Admin Only 🛑
      </ThemedText>
      <ThemedButton title="Manage Players" type="danger" onPress={() => router.replace('/admin/adminPlayers')} />
      <ThemedButton title="Manage Teams" type="danger" onPress={() => router.replace('/admin/adminTeams')} />
      <ThemedButton title="Logout" type="transparent" onPress={() => router.push('/')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, gap: 20 },
});
