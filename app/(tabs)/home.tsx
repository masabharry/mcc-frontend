import { Image, StyleSheet, Platform, Alert, ScrollView } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useRouter } from 'expo-router';
import { ThemedButton } from '@/components/ThemedButton';
import React, { useEffect, useState } from 'react';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { RocketLoader } from '@/components/RocketLoader';
import { HelloWave } from '@/components/HelloWave';
import { Ionicons } from '@expo/vector-icons';

export default function StartScreen() {

  // const [playername, setPlayerName] = useState<string | null>(null);
  // const [playerId, setPlayerId] = useState<string | null>(null);
  // const [playerPhoto, setPlayerPhoto] = useState<string | null>(null)
  // const [playerStates, setPlayerStates] = useState<string | null>(null)
  const [playerData, setPlayerData] = useState<any>(null);
  const [teamData, setTeamData] = useState<any>(null)
  const [role, setRole] = useState<string | null>(null);
    const [imageError, setImageError] = useState(false);
  const router = useRouter();
  const [selectedFormat, setSelectedFormat] = useState('t10');
  const formats = ['t10', 't15', 't6'];



  useEffect(() => {
    const handleTeams = async () => {
      try {
        const res = await fetch('https://mccbackend.vercel.app/teams');
        const data = await res.json();
        if (Array.isArray(data)) {
          setTeamData(data);

        }
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };
    handleTeams();
  }, []);


  useEffect(() => {
    const fetchPlayerData = async () => {
      const storedData = await AsyncStorage.getItem('playerData');
      if (storedData) {
        setPlayerData(JSON.parse(storedData));
      }
    };
    fetchPlayerData();
  }, []);

  useEffect(() => {
    const fetchRole = async () => {
      const storedRole = await AsyncStorage.getItem('role');
      setRole(storedRole);

    };
    fetchRole();
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
            await AsyncStorage.removeItem('role'); 
            await AsyncStorage.removeItem('playerData');
            router.replace('/');
          },
        },
      ],
      { cancelable: true }
    );
  };

  const playerTeam = teamData?.find(team => team.teamId === playerData?.teamId);

  useEffect(() => {
    const getRole = async () => {
      const storedRole = await AsyncStorage.getItem('role');
      setRole(storedRole);
    };
    getRole();
  }, []);


  useEffect(() => {
    const getRole = async () => {
      const storedRole = await AsyncStorage.getItem('role');
      setRole(storedRole);
    };
    getRole();
  }, []);


  const formatStats = playerData?.stats?.[selectedFormat] || {};
  const battingAvg = formatStats.scores && formatStats.matches
    ? (formatStats.scores / formatStats.matches).toFixed(2)
    : 'N/A';
  const strikeRate = formatStats.totalBallsPlayed && formatStats.scores
  ? ((formatStats.scores / formatStats.totalBallsPlayed) * 100).toFixed(2)
    : 'N/A';

  const bowlingAvg = formatStats.wickets && formatStats.bowledmatches
    ? (formatStats.wickets / formatStats.bowledmatches).toFixed(2)
    : 'N/A';
  const bowlingEco = formatStats.overbowled && formatStats.runconceded 
    ? ((formatStats.runconceded / formatStats.overbowled)).toFixed(2)
    : 'N/A';

  const statLabels = {
    scores: 'Runs',
    wickets: 'Wickets',
    four: 'Fours',
    six: 'Sixes',
    matches: 'Batting Innings',
    bowledmatches: 'Bowling Innings',
    centuries: 'Hundreds',
    fifties: 'Fifties',
    hatricks: 'Hat-Tricks',
    hsr: 'Highest Score (Runs)',
    hsw: 'Best Bowling (Wickets)',
    runconceded: 'Runs Conceded',
    totalBallsPlayed: 'Played Balls',
    totalBallsBowled: 'Bowled Balls',
    overbowled: 'Total Overs'
  };


  if (role === 'guest') {
    return (
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#8DD8FF', dark: '#1565C0' }}
        headerTitle={<ThemedText type="boldTitle" style={{ textAlign: 'center' }}>MCC</ThemedText>}
      >
        <ThemedView style={{ padding: 20 }}>
          <ThemedText type="subtitle" style={{ textAlign: 'center' }}>
            Welcome Guest! <HelloWave />
          </ThemedText>
          <ThemedText style={{ marginTop: 10, textAlign: 'center' }}>
            You are viewing as a guest. Please log in to access full features.
            Althought If you want to see the stats of players, you can check out the rankings tab.
            Feel free to explore the app! ☺️
          </ThemedText>
        </ThemedView>
        <ThemedView style={{ alignSelf: 'center', marginTop: 20, width: '100%' }}>
          <ThemedButton title="Log Out" type="transparent" onPress={handleLogout} />
        </ThemedView>

      </ParallaxScrollView>
    );
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#8DD8FF', dark: '#1565C0' }}
      headerTitle={<>
        <ThemedText type="boldTitle" style={{ textAlign: 'center', flexWrap: 'wrap' }}>MCC</ThemedText>
        {/* <ThemedText type='subtitle' style={{ color: '#fff', textAlign: 'center' }}>Malik Cricket Club</ThemedText> */}
      </>}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>

        {!playerData || !teamData ? (
          <RocketLoader />
        ) : (
          <ScrollView
            style={{ borderRadius: 20, padding: 20, maxHeight: 350, width: '100%' }}
            contentContainerStyle={styles.profileCard}
          >
            {!playerData.playerPhoto ? (
                <Ionicons
                    name="person-circle-outline"
                    size={120}
                    color="#ccc"
                    style={{
                      alignSelf:
                        "center",
                    }}
                  />
            ) : <Image source={{ uri: playerData.playerPhoto }} style={styles.profileImage} />}
            

            <ThemedText type="title" style={styles.playerName}>{playerData.playerName}</ThemedText>



            {/* <ThemedView>
              <ThemedText type="title" style={styles.playerName}>{playerData.playerName}</ThemedText>
              <ThemedText type="subtitle" style={{ color: '#41dc8e' }}>
                {playerTeam?.teamName && playerTeam?.emoji ? `${playerTeam?.teamName} ${playerTeam?.emoji}` : 'No Team Found'}
              </ThemedText>
            </ThemedView> */}

            <ThemedView style={styles.toggleContainer}>
              {formats.map(format => (
                <ThemedButton
                  key={format}
                  title={format.toUpperCase()}
                  type={selectedFormat === format ? 'primary' : 'transparent'}
                  onPress={() => setSelectedFormat(format)}
                />
              ))}
            </ThemedView>


            <ThemedView style={styles.table}>
              {Object.entries(playerData.stats[selectedFormat]).map(([key, value]) => (
                <ThemedView key={key} style={styles.tableRow}>
                  <ThemedText style={styles.cellKey}>{statLabels[key] || key}</ThemedText>
                  <ThemedText style={styles.cellValue}>{value}</ThemedText>
                </ThemedView>
              ))}
              <ThemedView style={styles.tableRow}>
                <ThemedText style={styles.cellKey}>Batting Avg</ThemedText>
                <ThemedText style={styles.cellValue}>{battingAvg}</ThemedText>
              </ThemedView>
               <ThemedView style={styles.tableRow}>
                <ThemedText style={styles.cellKey}>Batting SR</ThemedText>
                <ThemedText style={styles.cellValue}>{strikeRate}</ThemedText>
              </ThemedView>
              <ThemedView style={styles.tableRow}>
                <ThemedText style={styles.cellKey}>Bowling Avg</ThemedText>
                <ThemedText style={styles.cellValue}>{bowlingAvg}</ThemedText>
              </ThemedView>
              <ThemedView style={styles.tableRow}>
                <ThemedText style={styles.cellKey}>Bowling Eco</ThemedText>
                <ThemedText style={styles.cellValue}>{bowlingEco}</ThemedText>
              </ThemedView>

            </ThemedView>

          </ScrollView>
        )}

        <ThemedView style={{ alignSelf: 'center', marginTop: 20, width: '100%' }}>
          <ThemedButton title="Log Out" type="transparent" onPress={handleLogout} />
        </ThemedView>
      </ThemedView>



    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 8,
    width: '100%',
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  profileCard: {

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    width: '100%',
    borderColor: "#000",
    borderStyle: 'solid',
  },

  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 40,
    marginBottom: 10,
    alignSelf: 'center'
  },
  playerName: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'center'
  },
  sectionTitle: {
    marginTop: 15,
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    color: '#000'
  },
  formatBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    width: '100%',
  },
  statItem: {
    fontSize: 14,
    paddingVertical: 2,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
    gap: 8,
  },

  table: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
    paddingBottom: 7,
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 20,
  },

  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    paddingVertical: 8,
  },

  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  tableRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#eee',
    paddingVertical: 8,
  },

  cellKey: {
    flex: 1,
    paddingLeft: 10,
  },

  cellValue: {
    flex: 1,
    textAlign: 'center',
  },

});