import {
  router,
  useLocalSearchParams,
} from "expo-router";
import React, {
  useEffect,
  useState,
} from "react";
import {
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { RocketLoader } from "@/components/RocketLoader";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Ionicons } from "@expo/vector-icons";
import { ThemedButton } from "@/components/ThemedButton";

export default function TeamDetails() {
  const { teamId, teamName } =
    useLocalSearchParams();
  const [
    players,
    setPlayers,
  ] = useState([]);
  const [
    loading,
    setLoading,
  ] = useState(true);
  const [
    selectedPlayer,
    setSelectedPlayer,
  ] = useState(null);
  const [
    isModalVisible,
    setIsModalVisible,
  ] = useState(false);
  const [
    imageErrors,
    setImageErrors,
  ] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    const fetchPlayers =
      async () => {
        try {
          const response =
            await fetch(
              "https://mccbackend.vercel.app/players"
            );
          const data =
            await response.json();
          const filtered =
            data.filter(
              (player: any) =>
                player.teamId ==
                teamId
            );
          setPlayers(
            filtered
          );
        } catch (error) {
          console.error(
            "Error fetching players:",
            error
          );
        } finally {
          setLoading(false);
        }
      };

    fetchPlayers();
  }, []);

  if (loading)
    return <RocketLoader />;

  return (
    <ParallaxScrollView
      headerBackgroundColor={{
        light: "#8DD8FF",
        dark: "#1565C0",
      }}
      headerTitle={
        <ThemedText
          type="title"
          style={{
            textAlign:
              "center",
            flexWrap: "wrap",
            color: "#fff",
          }}
        >
          {teamName}
        </ThemedText>
      }
    >
      <ThemedView
        style={{
          padding: 16,
        }}
      >
        {players.map(
          (player: any) => (
            <TouchableOpacity
              key={player._id}
              onPress={() => {
                setSelectedPlayer(
                  player
                );
                setIsModalVisible(
                  true
                );
              }}
            >
              <ThemedView
                key={
                  player._id
                }
                style={{
                  marginBottom: 16,
                  padding: 12,
                  borderWidth: 1,
                  borderRadius: 12,
                  borderColor:
                    "#0a7ea4",
                }}
              >
                {!player.photoUrl ? (
                  <Ionicons
                    name="person-circle-outline"
                    size={100}
                    color="#ccc"
                    style={{
                      alignSelf:
                        "center",
                    }}
                  />
                ) : (
                  <Image
                    source={{
                      uri: player.photoUrl,
                    }}
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: 50,
                      alignSelf:
                        "center",
                    }}
                    onError={() =>
                      setImageErrors(
                        (
                          prev
                        ) => ({
                          ...prev,
                          [player._id]:
                            true,
                        })
                      )
                    }
                  />
                )}

                <ThemedText
                  type="subtitle"
                  style={{
                    textAlign:
                      "center",
                    marginTop: 10,
                  }}
                >
                  {
                    player.name
                  }
                </ThemedText>

                <ThemedText>
                  Total
                  Combine Runs
                  =
                  {(player
                    .stats
                    ?.t10
                    ?.scores ||
                    0) +
                    (player
                      .stats
                      ?.t6
                      ?.scores ||
                      0) +
                    (player
                      .stats
                      ?.t15
                      ?.scores ||
                      0)}
                </ThemedText>

                <ThemedText>
                  Total
                  Combine
                  Wickets =
                  {(player
                    .stats
                    ?.t10
                    ?.wickets ||
                    0) +
                    (player
                      .stats
                      ?.t6
                      ?.wickets ||
                      0) +
                    (player
                      .stats
                      ?.t15
                      ?.wickets ||
                      0)}
                </ThemedText>
              </ThemedView>
            </TouchableOpacity>
          )
        )}
      </ThemedView>
      <TouchableOpacity
        onPress={() =>
          router.back()
        }
        style={{
          position:
            "absolute",
          bottom: 0,
          left: 20,
          width: 50,
          height: 50,
          borderRadius: 25,
          backgroundColor:
            "#1565C0",
          justifyContent:
            "center",
          alignItems:
            "center",
          elevation: 6,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.3,
          shadowRadius: 3,
        }}
      >
        <Ionicons
          size={28}
          name="arrow-back"
          color="white"
        />
      </TouchableOpacity>
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
              // flexDirection: 'column',
              // justifyContent: 'flex-start',
              // alignContent: 'center',
              // alignItems: 'center'
            }}
          >
            {selectedPlayer && (
              <>
                {!selectedPlayer.photoUrl ? (
                  <Ionicons
                    name="person-circle-outline"
                    size={120}
                    color="#ccc"
                    style={{
                      alignSelf:
                        "center",
                    }}
                  />
                ) : (
                  <Image
                    source={{
                      uri: selectedPlayer.photoUrl,
                    }}
                    style={{
                      width: 120,
                      height: 120,
                      borderRadius: 60,
                      alignSelf:
                        "center",
                    }}
                    onError={() =>
                      setImageErrors(
                        (
                          prev
                        ) => ({
                          ...prev,
                          [selectedPlayer._id]:
                            true,
                        })
                      )
                    }
                  />
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
                    selectedPlayer.name
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
                        selectedPlayer
                          .stats[
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
                          <ThemedText type="subtitle">
                            {
                              formatName
                            }
                          </ThemedText>

                          <ThemedText
                            type="defaultSemiBold"
                            style={
                              styles.statstlt
                            }
                          >
                            Batting
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
                                Runs
                              </ThemedText>
                              <ThemedText
                                style={
                                  styles.tableCell
                                }
                              >
                                {
                                  stats.scores
                                }
                              </ThemedText>
                              <ThemedText
                                style={
                                  styles.tableCell
                                }
                              >
                                Ave.
                              </ThemedText>
                              <ThemedText
                                style={
                                  styles.tableCell
                                }
                              >
                                {(
                                  stats.scores /
                                    stats.matches ||
                                  0
                                ).toFixed(
                                  2
                                )}
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
                                100s
                              </ThemedText>
                              <ThemedText
                                style={
                                  styles.tableCell
                                }
                              >
                                {
                                  stats.centuries
                                }
                              </ThemedText>
                              <ThemedText
                                style={
                                  styles.tableCell
                                }
                              >
                                50s
                              </ThemedText>
                              <ThemedText
                                style={
                                  styles.tableCell
                                }
                              >
                                {
                                  stats.fifties
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
                                4s
                              </ThemedText>
                              <ThemedText
                                style={
                                  styles.tableCell
                                }
                              >
                                {
                                  stats.four
                                }
                              </ThemedText>
                              <ThemedText
                                style={
                                  styles.tableCell
                                }
                              >
                                6s
                              </ThemedText>
                              <ThemedText
                                style={
                                  styles.tableCell
                                }
                              >
                                {
                                  stats.six
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
                                Highest
                              </ThemedText>
                              <ThemedText
                                style={
                                  styles.tableCell
                                }
                              >
                                {
                                  stats.hsr
                                }
                              </ThemedText>
                              <ThemedText
                                style={
                                  styles.tableCell
                                }
                              >
                                Matches
                              </ThemedText>
                              <ThemedText
                                style={
                                  styles.tableCell
                                }
                              >
                                {
                                  stats.matches
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
                                SR
                              </ThemedText>
                              <ThemedText
                                style={
                                  styles.tableCell
                                }
                              >
                                {(
                                  (stats.scores /
                                    stats.totalBallsPlayed) * 100  ||
                                  0
                                ).toFixed(
                                  2
                                )}
                              </ThemedText>
                            </View>
                          </View>

                          <ThemedText
                            type="defaultSemiBold"
                            style={[
                              styles.statstlt,
                              {
                                marginTop: 10,
                              },
                            ]}
                          >
                            Bowling
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
                                Wickets
                              </ThemedText>
                              <ThemedText
                                style={
                                  styles.tableCell
                                }
                              >
                                {
                                  stats.wickets
                                }
                              </ThemedText>
                              <ThemedText
                                style={
                                  styles.tableCell
                                }
                              >
                                Ave.
                              </ThemedText>
                              <ThemedText
                                style={
                                  styles.tableCell
                                }
                              >
                                {(
                                  stats.wickets /
                                    stats.bowledmatches ||
                                  0
                                ).toFixed(
                                  2
                                )}
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
                                Eco.
                              </ThemedText>
                              <ThemedText
                                style={
                                  styles.tableCell
                                }
                              >
                                {stats.overbowled
                                  ? (
                                      stats.runconceded /
                                      stats.overbowled
                                    ).toFixed(
                                      2
                                    )
                                  : 0}
                              </ThemedText>
                              <ThemedText
                                style={
                                  styles.tableCell
                                }
                              >
                                Best
                                Fig.
                              </ThemedText>
                              <ThemedText
                                style={
                                  styles.tableCell
                                }
                              >
                                {
                                  stats.hsw
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
                                Hat-Tricks
                              </ThemedText>
                              <ThemedText
                                style={
                                  styles.tableCell
                                }
                              >
                                {
                                  stats.hatricks
                                }
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
