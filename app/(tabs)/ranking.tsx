import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, Image, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import RankingToggle from '@/components/RankingToggle';
import FormatToggle from '@/components/FormatToggle';
import StatToggle from '@/components/StatToggle';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedModal } from '@/components/ThemedModel';
import { ThemedButton } from '@/components/ThemedButton';
import { Ionicons } from '@expo/vector-icons';

// Scoring algorithms
const calculateBattingScore = (stats) => {
  const runs = stats?.scores || 0;
  const fours = stats?.four || 0;
  const sixes = stats?.six || 0;
  const matches = stats?.matches || 1;
  const average = matches ? runs / matches : 0;

  const score = runs + (fours * 2) + (sixes * 3) + (average * 10);
  return Math.min(score, 10000);
};

const calculateBowlingScore = (stats) => {
  const wickets = stats?.wickets || 0;
  const matches = stats?.bowledmatches || 1;
  const avgWickets = matches ? wickets / matches : 0;

  const score = avgWickets * 100;
  return Math.min(score, 10000);
};

const calculateTeamScore = (stats) => {
  const played = stats?.totalMtachPlayed || 1;
  const wins = stats?.totalWin || 0;
  const runrate = stats?.runscored / stats?.overfaced || 0;

  const winScore = (wins / played) / runrate * 10000;
  // const runRateScore = runrate * 1.5;
  const totalScore = winScore;

  return Math.min(totalScore, 100000);
};

export default function RankingPage() {
  const [type, setType] = useState('Player');
  const [format, setFormat] = useState('t10');
  const [statType, setStatType] = useState('Batting');
  const [rankedPlayers, setRankedPlayers] = useState([]);
  const [allPlayers, setAllPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageError, setImageError] = useState({});
    const [
      isModalVisible,
      setIsModalVisible,
    ] = useState(false);
     const [
        selectedTeam,
        setSelectedTeam,
      ] = useState(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch('https://mccbackend.vercel.app/players');
        const data = await response.json();
        setAllPlayers(data);
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    };
    fetchPlayers();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        if (type === 'Player') {
          const list = allPlayers.map((player) => {
            const stats = player.stats?.[format] ?? {};
            const score =
              statType === 'Batting'
                ? calculateBattingScore(stats)
                : calculateBowlingScore(stats);
            return { ...player, score };
          });

          const sorted = list.sort((a, b) => b.score - a.score);
          setRankedPlayers(sorted);
        } else if (type === 'Team') {
          const response = await fetch('https://mccbackend.vercel.app/teams');
          const teams = await response.json();

          const list = teams.map((team) => {
            const stats = team.states?.[format] ?? {};
            const score = calculateTeamScore(stats);
            return { ...team, score };
          });

          const sorted = list.sort((a, b) => b.score - a.score);
          setRankedPlayers(sorted);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }

      setLoading(false);
    };

    fetchData();
  }, [type, statType, format, allPlayers]);

  const getColor = (index) => {
    if (index < 21) return '#8DD8FF';
    if (index < 81) return '#41dc8e';
    if (index < 200) return 'yellow';
    return 'gray';
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#8DD8FF', dark: '#1565C0' }}
      headerTitle={
        <ThemedText type="boldTitle" style={{ textAlign: 'center', flexWrap: 'wrap' }}>
          Rankings
        </ThemedText>
      }>

      <RankingToggle value={type} onChange={setType} />
      <FormatToggle value={format} onChange={setFormat} />
      {type === 'Player' && <StatToggle value={statType} onChange={setStatType} />}

      {rankedPlayers.map((item, index) => {
        const isTop = index === 0;
        const bgColor = getColor(index);
        const imageSize = isTop ? 60 : 45;

        return (
          <View
            key={item._id || item.name}
            style={{
              marginVertical: 6,
              padding: isTop ? 20 : 12,
              borderRadius: 10,
              backgroundColor: bgColor,
              flexDirection: 'row',
              alignItems: 'center',
              width: isTop ? '100%' : '97%',
              alignSelf: 'center',
              elevation: isTop ? 5 : 2,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 4,
            }}
          >
            {type === 'Player' ? (
              !item.photoUrl ? (
                <Text style={{ fontSize: imageSize - 10, marginRight: 12 }}>👤</Text> // fallback emoji
              ) : (
                <Image
                  source={{ uri: item.photoUrl }}
                  style={{
                    width: imageSize,
                    height: imageSize,
                    borderRadius: imageSize / 2,
                    marginRight: 12,
                  }}
                  onError={() =>
                    setImageError((prev) => ({ ...prev, [item._id]: true }))
                  }
                />
              )

            ) : (
              <Text style={{ fontSize: imageSize - 10, marginRight: 12 }}>{item.emoji ? item.emoji : '🏏'}</Text> // team emoji
            )}
            {type !== 'Player' ? (
             <TouchableOpacity
             key={item._id}
              onPress={() => {
                setSelectedTeam(
                  item
                );
                setIsModalVisible(
                  true
                );
              }}
             >
               <View style={{ flex: 1, overflow: 'hidden' }}>
              <Text
                style={{
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: isTop ? 18 : 14,
                }}
              >
                {index + 1}. {type === 'Player' ? item.name : item.teamName}
              </Text>
              <Text style={{ color: '#fff', fontSize: isTop ? 16 : 13 }}>
                Rating: {Math.round(item.score)}
              </Text>
            </View>
               </TouchableOpacity>
            
            ) : (
              <View style={{ flex: 1, overflow: 'hidden' }}>
              <Text
                style={{
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: isTop ? 18 : 14,
                }}
              >
                {index + 1}. {type === 'Player' ? item.name : item.teamName}
              </Text>
              <Text style={{ color: '#fff', fontSize: isTop ? 16 : 13 }}>
                Rating: {Math.round(item.score)} {statType === 'Batting' ? '🏏' : '🥎'}
              </Text>
            </View>
            )}
          </View>
        );
      })}


      <Modal
        visible={
          isModalVisible
        }
        animationType="fade"
        transparent={true}
        onRequestClose={() =>
          setIsModalVisible(
            false
          )
        }
      >
        <View
          style={{
            flex: 1,
            backgroundColor:
              "rgba(0,0,0,0.6)",
            justifyContent:
              "center",
            alignItems:
              "center",
          }}
        >
          <View
            style={{
              backgroundColor:
                "#fff",
              width: "90%",
              borderRadius: 20,
              padding: 20,
              elevation: 10,
              borderColor:
                "#8DD8FF",
              display: "flex",
             
            }}
          >
            {selectedTeam && (
              <>
                {!selectedTeam.emoji ? (
                <Text style={{ fontSize: 50, marginRight: 12 }}>{selectedTeam.emoji}</Text>
                ) : (
                  <Text style={{ fontSize: 50, marginRight: 12 }}>{selectedTeam.emoji}</Text> 
                )}

                <ThemedText
                  style={{
                    fontSize: 20,
                    fontWeight:
                      "bold",
                    alignSelf:
                      "center",
                    marginTop: 10,
                  }}
                >
                  {
                    selectedTeam.teamName
                  }
                </ThemedText>
                <ThemedText
                  style={{
                    fontSize: 20,
                    fontWeight:
                      "bold",
                    alignSelf:
                      "center",
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                >
                 Team ID: {
                    selectedTeam.teamId
                  }
                </ThemedText>
                <ScrollView
                  style={{
                    maxHeight: 300,
                  }}
                >
                  {[
                    "t10",
                    "t6",
                    "t15",
                  ].map(
                    (
                      formatKey
                    ) => {
                      const formatName =
                        formatKey ===
                        "t10"
                          ? "T-10"
                          : formatKey ===
                            "t6"
                          ? "T-6"
                          : "T-15";
                      const stats =
                        selectedTeam
                          .states[
                          formatKey
                        ] ||
                        {};

                      return (
                        <View
                          key={
                            formatKey
                          }
                          style={{
                            marginBottom: 20,
                          }}
                        >
                          

                          <ThemedText
                            type="defaultSemiBold"
                            style={
                              styles.statstlt
                            }
                          >
                            {formatName} Stats
                          </ThemedText>
                          <View
                            style={
                              styles.table
                            }
                          >
                            <View
                              style={
                                styles.tableRow
                              }
                            >
                              <ThemedText
                                style={
                                  styles.tableCell
                                }
                              >
                                Total Match Played
                              </ThemedText>
                              <ThemedText
                                style={
                                  styles.tableCell
                                }
                              >
                                {
                                  stats.totalMtachPlayed
                                }
                              </ThemedText>
                             
                            </View>
                            <View
                              style={
                                styles.tableRow
                              }
                            >
                               <ThemedText
                                style={
                                  styles.tableCell
                                }
                              >
                                Total Matches Won
                              </ThemedText>
                              <ThemedText
                                style={
                                  styles.tableCell
                                }
                              >
                                {stats.totalWin}
                              </ThemedText>
                              </View>
                            <View
                              style={
                                styles.tableRow
                              }
                            >
                              <ThemedText
                                style={
                                  styles.tableCell
                                }
                              >
                                RunRate
                              </ThemedText>
                              <ThemedText
                                style={
                                  styles.tableCell
                                }
                              >
                                {(
                                  (stats.runscored /
                                    stats.overfaced)  ||
                                  0
                                ).toFixed(
                                  2
                                )}
                              </ThemedText>
                            </View>
                          </View>

                        </View>
                      );
                    }
                  )}
                </ScrollView>
              </>
            )}
            <View
              style={{
                marginTop: 10,
              }}
            >
              <ThemedButton
                onPress={() =>
                  setIsModalVisible(
                    false
                  )
                }
                title="Close"
                type="transparent"
              />
            </View>
          </View>
        </View>
      </Modal>
    </ParallaxScrollView>
  );
}

const styles =
  StyleSheet.create({
    statsTxt: {
      paddingLeft: 20,
    },
    statstlt: {
      color: "#41dc8e",
      paddingLeft: 15,
      fontSize: 16,
      marginBottom: 5,
      marginTop: 5,
    },
    table: {
      borderWidth: 1,
      borderColor: "#8DD8FF",
      borderRadius: 8,
      overflow: "hidden",
      marginVertical: 5,
    },
    tableRow: {
      flexDirection: "row",
      justifyContent:
        "space-between",
      paddingVertical: 6,
      paddingHorizontal: 10,
      // backgroundColor: '#F2F9FF',
      borderBottomWidth: 1,
      borderBottomColor:
        "#8DD8FF",
    },
    tableCell: {
      flex: 1,
      fontSize: 14,
      // color: '#333',
      textAlign: "center",
    },
  });
