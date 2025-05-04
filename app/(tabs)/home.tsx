import { Image, StyleSheet, Platform, Alert } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useRouter } from 'expo-router';
import { ThemedButton } from '@/components/ThemedButton';
import { useEffect, useState } from 'react';

export default function StartScreen() {

  const [playername, setPlayerName] = useState<string | null>(null);
  const [playerId, setPlayerId] = useState<string | null>(null);
  const [playerPhoto, setPlayerPhoto] = useState<string | null>(null)

  const router = useRouter();

  useEffect(() => {
    console.log('Current route:', router.pathname);
  }, [router]);

  useEffect(() => {
    const fetchPlayerData = async () => {
      const storedPlayerId = await AsyncStorage.getItem('playerId');
      const storedPlayerName = await AsyncStorage.getItem('playerName');
      const storedPlayerPhoto = await AsyncStorage.getItem('playerPhoto')
      setPlayerId(storedPlayerId);
      setPlayerName(storedPlayerName);
      setPlayerPhoto(storedPlayerPhoto)
      console.log('Player ID:', storedPlayerId);
      console.log('Player Name:', storedPlayerName);
      console.log('player photourl:', storedPlayerPhoto)
    };
    fetchPlayerData();
  }, []);
  const handleLogout = () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await AsyncStorage.removeItem('playerId');
            router.replace('/');
          },
        },
      ],
      { cancelable: true }
    );
  };



  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1565C0' }}
      headerTitle={<>
        <ThemedText type="boldTitle" style={{ textAlign: 'center', flexWrap: 'wrap' }}>Welcome to MCC <HelloWave />
        </ThemedText>
        <ThemedText type='subtitle' style={{ textAlign: 'center' }}>{playername || 'Guest'}</ThemedText>
      </>}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        {playerPhoto && (
          <Image
            source={{ uri: playerPhoto }}
            style={{ width: 100, height: 100, borderRadius: 50, marginVertical: 20 }}
          />
        )}


        {/* <HelloWave /> */}
        <ThemedButton title="log out" type="danger" onPress={() => handleLogout()} />
        <ThemedText>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo culpa optio, libero cupiditate ea veniam quasi odit, sed dolor ipsum hic, delectus incidunt ullam iste tenetur nostrum et sunt debitis. Magni, consequuntur vel. Explicabo architecto, ipsa nam iusto mollitia corrupti corporis sed laborum temporibus molestiae voluptate sequi eveniet, consequatur rem reiciendis provident blanditiis qui tempora. Dignissimos impedit cum ab doloribus aperiam? Et recusandae at quidem, veniam ratione doloribus repellat odit architecto enim nesciunt numquam. Neque facere dolorum explicabo. Fuga voluptate corporis, numquam ea voluptatum est sequi odio perferendis cupiditate odit, vero accusantium impedit in suscipit doloremque natus repellat, tenetur necessitatibus minima consectetur nihil at officiis tempore ullam. Quos quis debitis rerum nesciunt aspernatur culpa, temporibus blanditiis fuga suscipit vel, aliquid adipisci quo deserunt esse minus, laborum modi rem dolores quae cum enim saepe? Fugiat mollitia a ex quisquam quibusdam nobis esse itaque assumenda delectus repellat? Quae quaerat cupiditate a et, similique aut consectetur asperiores iste optio voluptatum! Vel accusantium ratione consequuntur nesciunt laboriosam delectus natus enim, dolore temporibus a distinctio rem repellat consectetur velit quaerat mollitia ad dolores libero quis ea voluptatum neque quas excepturi debitis. Officia neque aspernatur qui! Totam quod ratione corporis eos? Cum facilis qui atque doloribus maxime eos, obcaecati dolorem sed optio natus, animi in ad omnis nesciunt, nemo eligendi suscipit placeat repudiandae debitis? Molestiae, blanditiis possimus? Eius mollitia vero ea facere est, iusto consequuntur tenetur aliquid pariatur officia sint nihil provident error nobis aut tempora dolorum nesciunt rerum obcaec.</ThemedText>
      </ThemedView>


    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});