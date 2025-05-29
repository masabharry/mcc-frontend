// pages/admin/players.tsx
import React, {
  useEffect,
  useState,
} from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  Alert,
} from "react-native";
import axios from "axios";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedModal } from "@/components/ThemedModel";
import { router } from "expo-router";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function AdminPlayersScreen() {
  const [
    players,
    setPlayers,
  ] = useState([]);
  const [
    selectedPlayer,
    setSelectedPlayer,
  ] = useState(null);
  const [
    modalType,
    setModalType,
  ] = useState("");
  const [
    modalVisible,
    setModalVisible,
  ] = useState(false);
  const [form, setForm] =
    useState({
      t10_scores: "0",
      t10_wickets: "0",
      t10_matches: "0",
      t10_fifties: "0",
      t10_centuries: "0",
      t10_hatricks: "0",
      t10_bowledmatches: "0",
      t10_hsr: "0",
      t10_hsw: "0",
      t10_four: "0",
      t10_six: "0",
      t10_totalBallsPlayed:
        "0",
      t10_totalBallsBowled:
        "0",
      t10_runconceded: "0",
      t10_overbowled: "0",
      t15_scores: "0",
      t15_wickets: "0",
      t15_matches: "0",
      t15_fifties: "0",
      t15_centuries: "0",
      t15_hatricks: "0",
      t15_bowledmatches: "0",
      t15_hsr: "0",
      t15_hsw: "0",
      t15_four: "0",
      t15_six: "0",
      t15_totalBallsPlayed:
        "0",
      t15_totalBallsBowled:
        "0",
      t15_runconceded: "0",
      t15_overbowled: "0",
      t6_scores: "0",
      t6_wickets: "0",
      t6_matches: "0",
      t6_fifties: "0",
      t6_centuries: "0",
      t6_hatricks: "0",
      t6_bowledmatches: "0",
      t6_hsr: "0",
      t6_hsw: "0",
      t6_four: "0",
      t6_six: "0",
      t6_totalBallsPlayed:
        "0",
      t6_totalBallsBowled:
        "0",
      t6_runconceded: "0",
      t6_overbowled: "0",
    });

  const [teams, setTeams] =
    useState([]);
  const [
    selectedTeamId,
    setSelectedTeamId,
  ] = useState(1);

  useEffect(() => {
    const fetchTeamData =
      async () => {
        try {
          const response =
            await fetch(
              "https://mccbackend.vercel.app/teams"
            );
          const data =
            await response.json();

          setTeams(data); // Store teams in state
        } catch (error) {
          console.error(
            "Error fetching teams:",
            error
          );
        }
      };

    fetchTeamData();
  }, []);

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers =
    async () => {
      const res =
        await axios.get(
          "https://mccbackend.vercel.app/players"
        );
      setPlayers(res.data);
    };

  const handleOpenModal = (
    player,
    type
  ) => {
    setSelectedPlayer(player);
    setModalType(type);
    setForm({}); // Reset form
    setModalVisible(true);
  };

  const handleSubmit =
    async () => {
      const id =
        selectedPlayer?._id;

      try {
        if (
          modalType ===
          "addStats"
        ) {
          await axios.patch(
            `https://mccbackend.vercel.app/players/${id}/add-stats`,
            form
          );
        } else if (
          modalType ===
          "updateInfo"
        ) {
          await axios.patch(
            `https://mccbackend.vercel.app/players/${id}/update-info`,
            form
          );
        } else if (
          modalType ===
          "reset"
        ) {
          await axios.patch(
            `https://mccbackend.vercel.app/players/${id}/reset`
          );
        } else if (
          modalType ===
          "delete"
        ) {
          await axios.delete(
            `https://mccbackend.vercel.app/players/${id}`
          );
        } else if (
          modalType ===
          "create"
        ) {
          const payload = {
            name: form.name,
            username:
              form.username,
            password:
              form.password,
            teamId: Number(
              form.teamId
            ),
            photoUrl:
              form.photoUrl,

            stats: {
              t10: {
                scores:
                  Number(
                    form.t10_scores
                  ) || 0,
                wickets:
                  Number(
                    form.t10_wickets
                  ) || 0,
                matches:
                  Number(
                    form.t10_matches
                  ) || 0,
                fifties:
                  Number(
                    form.t10_fifties
                  ) || 0,
                centuries:
                  Number(
                    form.t10_centuries
                  ) || 0,
                hatricks:
                  Number(
                    form.t10_hatricks
                  ) || 0,
                bowledmatches:
                  Number(
                    form.t10_bowledmatches
                  ) || 0,
                hsr:
                  Number(
                    form.t10_hsr
                  ) || 0,
                hsw:
                  Number(
                    form.t10_hsw
                  ) || 0,
                four:
                  Number(
                    form.t10_four
                  ) || 0,
                six:
                  Number(
                    form.t10_six
                  ) || 0,
                ballsplayed:
                  Number(
                    form.totalBallsPlayed
                  ) || 0,
                ballsbowled:
                  Number(
                    form.totalBallsBowled
                  ) || 0,
                runconceded:
                  Number(
                    form.t10_runconceded
                  ) || 0,
                overbowled:
                  Number(
                    form.t10_overbowled
                  ) || 0,
              },
              t15: {
                scores:
                  Number(
                    form.t15_scores
                  ) || 0,
                wickets:
                  Number(
                    form.t15_wickets
                  ) || 0,
                matches:
                  Number(
                    form.t15_matches
                  ) || 0,
                fifties:
                  Number(
                    form.t15_fifties
                  ) || 0,
                centuries:
                  Number(
                    form.t15_centuries
                  ) || 0,
                hatricks:
                  Number(
                    form.t15_hatricks
                  ) || 0,
                bowledmatches:
                  Number(
                    form.t15_bowledmatches
                  ) || 0,
                hsr:
                  Number(
                    form.t15_hsr
                  ) || 0,
                hsw:
                  Number(
                    form.t15_hsw
                  ) || 0,
                four:
                  Number(
                    form.t15_four
                  ) || 0,
                six:
                  Number(
                    form.t15_six
                  ) || 0,
                ballsplayed:
                  Number(
                    form.t15_ballsplayed
                  ) || 0,
                ballsbowled:
                  Number(
                    form.t15_ballsbowled
                  ) || 0,
                runconceded:
                  Number(
                    form.t15_runconceded
                  ) || 0,
                overbowled:
                  Number(
                    form.t15_overbowled
                  ) || 0,
              },
              t6: {
                scores:
                  Number(
                    form.t6_scores
                  ) || 0,
                wickets:
                  Number(
                    form.t6_wickets
                  ) || 0,
                matches:
                  Number(
                    form.t6_matches
                  ) || 0,
                fifties:
                  Number(
                    form.t6_fifties
                  ) || 0,
                centuries:
                  Number(
                    form.t6_centuries
                  ) || 0,
                hatricks:
                  Number(
                    form.t6_hatricks
                  ) || 0,
                bowledmatches:
                  Number(
                    form.t6_bowledmatches
                  ) || 0,
                hsr:
                  Number(
                    form.t6_hsr
                  ) || 0,
                hsw:
                  Number(
                    form.t6_hsw
                  ) || 0,
                four:
                  Number(
                    form.t6_four
                  ) || 0,
                six:
                  Number(
                    form.t6_six
                  ) || 0,
                ballsplayed:
                  Number(
                    form.t6_ballsplayed
                  ) || 0,
                ballsbowled:
                  Number(
                    form.t6_ballsbowled
                  ) || 0,
                runconceded:
                  Number(
                    form.t6_runconceded
                  ) || 0,
                overbowled:
                  Number(
                    form.t6_overbowled
                  ) || 0,
              },
            },
          };

          await axios.post(
            "https://mccbackend.vercel.app/register",
            payload
          );
        }

        setModalVisible(
          false
        );
        fetchPlayers();
      } catch (error) {
        Alert.alert(
          "Error",
          error.response?.data
            ?.error ||
            "Operation failed"
        );
      }
    };

  const getModalInputs =
    () => {
      switch (modalType) {
        case "addStats":
          return [
            {
              label:
                "T10 Scores",
              key: "t10_scores",
            },
            {
              label:
                "T10 Wickets",
              key: "t10_wickets",
            },
            {
              label:
                "T10 Matches",
              key: "t10_matches",
            },
            {
              label:
                "T10 Fifties",
              key: "t10_fifties",
            },
            {
              label:
                "T10 Centuries",
              key: "t10_centuries",
            },
            {
              label:
                "T10 Hatricks",
              key: "t10_hatricks",
            },
            {
              label:
                "T10 Bowled Matches",
              key: "t10_bowledmatches",
            },
            {
              label:
                "T10 Highest Score",
              key: "t10_hsr",
            },
            {
              label:
                "T10 Highest Wickets",
              key: "t10_hsw",
            },
            {
              label:
                "T10 Fours",
              key: "t10_four",
            },
            {
              label:
                "T10 Sixes",
              key: "t10_six",
            },
            {
              label:
                "T10 Balls Played",
              key: "t10_totalBallsPlayed",
            },
            {
              label:
                "T10 Balls Bowled",
              key: "t10_totalBallsBowled",
            },
            {
              label:
                "T10 Run Conceded",
              key: "t10_runconceded",
            },
            {
              label:
                "Overs Bowled",
              key: "t10_overbowled",
            },
            // T15 stats
            {
              label:
                "T15 Scores",
              key: "t15_scores",
            },
            {
              label:
                "T15 Wickets",
              key: "t15_wickets",
            },
            {
              label:
                "T15 Matches",
              key: "t15_matches",
            },
            {
              label:
                "T15 Fifties",
              key: "t15_fifties",
            },
            {
              label:
                "T15 Centuries",
              key: "t15_centuries",
            },
            {
              label:
                "T15 Hatricks",
              key: "t15_hatricks",
            },
            {
              label:
                "T15 Bowled Matches",
              key: "t15_bowledmatches",
            },
            {
              label:
                "T15 Highest Score",
              key: "t15_hsr",
            },
            {
              label:
                "T15 Highest Wickets",
              key: "t15_hsw",
            },
            {
              label:
                "T15 Fours",
              key: "t15_four",
            },
            {
              label:
                "T15 Sixes",
              key: "t15_six",
            },
            {
              label:
                "T15 Balls Played",
              key: "t15_totalBallsPlayed",
            },
            {
              label:
                "T15 Balls Bowled",
              key: "t15_totalBallsBowled",
            },
            {
              label:
                "T15 Run Conceded",
              key: "t15_runconceded",
            },
            {
              label:
                "T15 Overs Bowled",
              key: "t15_overbowled",
            },
            // T6
            {
              label:
                "T6 Scores",
              key: "t6_scores",
            },
            {
              label:
                "T6 Wickets",
              key: "t6_wickets",
            },
            {
              label:
                "T6 Matches",
              key: "t6_matches",
            },
            {
              label:
                "T6 Fifties",
              key: "t6_fifties",
            },
            {
              label:
                "T6 Centuries",
              key: "t6_centuries",
            },
            {
              label:
                "T6 Hatricks",
              key: "t6_hatricks",
            },
            {
              label:
                "T6 Bowled Matches",
              key: "t6_bowledmatches",
            },
            {
              label:
                "T6 Highest Score",
              key: "t6_hsr",
            },
            {
              label:
                "T6 Highest Wickets",
              key: "t6_hsw",
            },
            {
              label:
                "T6 Fours",
              key: "t6_four",
            },
            {
              label:
                "T6 Sixes",
              key: "t6_six",
            },
            {
              label:
                "T6 Balls Played",
              key: "t6_totalBallsPlayed",
            },
            {
              label:
                "T6 Balls Bowled",
              key: "t6_totalBallsBowled",
            },
            {
              label:
                "T6 Run Conceded",
              key: "t6_runconceded",
            },
            {
              label:
                "T6 Overs Bowled",
              key: "t6_overbowled",
            },
          ];
        case "updateInfo":
          return [
            {
              label: "Name",
              key: "name",
            },
            {
              label:
                "Username",
              key: "username",
            },
            {
              label:
                "Password",
              key: "password",
            },
            {
              label:
                "Team ID",
              key: "teamId",
            },
            {
              label:
                "Photo URL",
              key: "photoUrl",
            },
          ];
        case "create":
          return [
            {
              label: "Name",
              key: "name",
            },
            {
              label:
                "Username",
              key: "username",
            },
            {
              label:
                "Password",
              key: "password",
            },
            {
              label:
                "Team ID",
              key: "teamId",
            },
            {
              label:
                "Photo URL",
              key: "photoUrl",
            },
            // T10 stats
            {
              label:
                "T10 Scores",
              key: "t10_scores",
              type: "number",
            },
            {
              label:
                "T10 Wickets",
              key: "t10_wickets",
              type: "number",
            },
            {
              label:
                "T10 Matches",
              key: "t10_matches",
              type: "number",
            },
            {
              label:
                "T10 Fifties",
              key: "t10_fifties",
              type: "number",
            },
            {
              label:
                "T10 Centuries",
              key: "t10_centuries",
              type: "number",
            },
            {
              label:
                "T10 Hatricks",
              key: "t10_hatricks",
              type: "number",
            },
            {
              label:
                "T10 Bowled Matches",
              key: "t10_bowledmatches",
              type: "number",
            },
            {
              label:
                "T10 Highest Score",
              key: "t10_hsr",
              type: "number",
            },
            {
              label:
                "T10 Highest Wickets",
              key: "t10_hsw",
              type: "number",
            },
            {
              label:
                "T10 Fours",
              key: "t10_four",
              type: "number",
            },
            {
              label:
                "T10 Sixes",
              key: "t10_six",
              type: "number",
            },
            {
              label:
                "T10 Balls Played",
              key: "t10_totalBallsPlayed",
              type: "number",
            },
            {
              label:
                "T10 Balls Bowled",
              key: "t10_totalBallsBowled",
              type: "number",
            },
            {
              label:
                "T10 Run Conceded",
              key: "t10_runconceded",
              type: "number",
            },
            {
              label:
                "T10 Overs Bowled",
              key: "t10_overbowled",
              type: "number",
            },
            // T15 stats
            {
              label:
                "T15 Scores",
              key: "t15_scores",
              type: "number",
            },
            {
              label:
                "T15 Wickets",
              key: "t15_wickets",
              type: "number",
            },
            {
              label:
                "T15 Matches",
              key: "t15_matches",
              type: "number",
            },
            {
              label:
                "T15 Fifties",
              key: "t15_fifties",
              type: "number",
            },
            {
              label:
                "T15 Centuries",
              key: "t15_centuries",
              type: "number",
            },
            {
              label:
                "T15 Hatricks",
              key: "t15_hatricks",
              type: "number",
            },
            {
              label:
                "T15 Bowled Matches",
              key: "t15_bowledmatches",
              type: "number",
            },
            {
              label:
                "T15 Highest Score",
              key: "t15_hsr",
              type: "number",
            },
            {
              label:
                "T15 Highest Wickets",
              key: "t15_hsw",
              type: "number",
            },
            {
              label:
                "T15 Fours",
              key: "t15_four",
              type: "number",
            },
            {
              label:
                "T15 Sixes",
              key: "t15_six",
              type: "number",
            },
            {
              label:
                "T15 Balls Played",
              key: "t15_totalBallsPlayed",
              type: "number",
            },
            {
              label:
                "T15 Balls Bowled",
              key: "t15_totalBallsBowled",
              type: "number",
            },
            {
              label:
                "T15 Run Conceded",
              key: "t15_runconceded",
              type: "number",
            },
            {
              label:
                "T15 Overs Bowled",
              key: "t15_overbowled",
              type: "number",
            },
            // T6 stats
            {
              label:
                "T6 Scores",
              key: "t6_scores",
              type: "number",
            },
            {
              label:
                "T6 Wickets",
              key: "t6_wickets",
              type: "number",
            },
            {
              label:
                "T6 Matches",
              key: "t6_matches",
              type: "number",
            },
            {
              label:
                "T6 Fifties",
              key: "t6_fifties",
              type: "number",
            },
            {
              label:
                "T6 Centuries",
              key: "t6_centuries",
              type: "number",
            },
            {
              label:
                "T6 Hatricks",
              key: "t6_hatricks",
              type: "number",
            },
            {
              label:
                "T6 Bowled Matches",
              key: "t6_bowledmatches",
              type: "number",
            },
            {
              label:
                "T6 Highest Score",
              key: "t6_hsr",
              type: "number",
            },
            {
              label:
                "T6 Highest Wickets",
              key: "t6_hsw",
              type: "number",
            },
            {
              label:
                "T6 Fours",
              key: "t6_four",
              type: "number",
            },
            {
              label:
                "T6 Sixes",
              key: "t6_six",
              type: "number",
            },
            {
              label:
                "T6 Balls Played",
              key: "t6_totalBallsPlayed",
              type: "number",
            },
            {
              label:
                "T6 Balls Bowled",
              key: "t6_totalBallsBowled",
              type: "number",
            },
            {
              label:
                "T6 Run Conceded",
              key: "t6_runconceded",
              type: "number",
            },
            {
              label:
                "T6 Overs Bowled",
              key: "t6_overbowled",
              type: "number",
            },
          ];
        default:
          return [];
      }
    };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{
        light: "#ff4500",
        dark: "#ff4500",
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
          Admin Panel
        </ThemedText>
      }
    >
      <ThemedButton
        title="+ Create New Player"
        onPress={() =>
          handleOpenModal(
            null,
            "create"
          )
        }
        type="primary"
      />
      <ThemedButton
        title={"Go Back"}
        type="transparent"
        onPress={() => {
          router.push(
            "/admin/adminpanel"
          );
        }}
      />
      <ScrollView
              horizontal
              showsHorizontalScrollIndicator={
          false
        }
              contentContainerStyle={{
                paddingHorizontal: 8,
                gap: 8,
              }}
      >
          {teams
                .slice() // create a shallow copy to avoid mutating the original array
          .sort(
            (a, b) =>
              a.teamId -
              b.teamId
          ) // sort by teamId numerically
          .map((team) => (
            <ThemedButton
              key={
                team.teamId
              }
              title={team.teamId.toString()}
              type={
                selectedTeamId ===
                team.teamId
                  ? "primary"
                  : "transparent"
              }
              onPress={() =>
                setSelectedTeamId(
                  team.teamId
                )
              }
            />
          ))}
      </ScrollView>

      {players
        .filter(
          (player) =>
            !selectedTeamId ||
            player.teamId ===
              selectedTeamId
        )
        .map((player) => (
          <View
            key={player._id}
            style={
              styles.card
            }
          >
            {player.photoUrl ? (
              <Image
                source={{
                  uri: player.photoUrl,
                }}
                style={
                  styles.photo
                }
              />
            ) : (
              <Text
                style={{
                  fontSize: 80,
                  marginRight: 12,
                  alignSelf:
                    "center",
                }}
              >
                👤
              </Text>
            )}
            <ThemedText
              style={{
                alignSelf:
                  "center",
                fontSize: 23,
                marginTop: 10,
              }}
            >
              {player.name}
            </ThemedText>
            {/* <ThemedText
              style={{
                fontSize: 20,
                alignSelf: 'center',
                marginTop: 10
              }}
            >
              {
                player.username
              }
            </ThemedText> */}
            <View
              style={
                styles.row
              }
            >
              <ThemedButton
                title="➕ Add Stats"
                onPress={() =>
                  handleOpenModal(
                    player,
                    "addStats"
                  )
                }
                type="transparent"
              />
              <ThemedButton
                title="✏️ Edit Info"
                onPress={() =>
                  handleOpenModal(
                    player,
                    "updateInfo"
                  )
                }
                type="transparent"
              />
              {/* <ThemedButton
                title="🔁 Reset"
                onPress={() =>
                  handleOpenModal(
                    player,
                    "reset"
                  )
                }
                type="transparent"
              /> */}
              <ThemedButton
                title="🗑️ Delete"
                onPress={() =>
                  handleOpenModal(
                    player,
                    "delete"
                  )
                }
                type="danger"
              />
            </View>
          </View>
        ))}

      <ThemedModal
        visible={modalVisible}
        title={
          modalType ===
          "create"
            ? "Create New Player"
            : `Action: ${modalType}`
        }
        onClose={() =>
          setModalVisible(
            false
          )
        }
        onSubmit={
          handleSubmit
        }
        submitText="Confirm"
        inputs={getModalInputs().map(
          (input) => ({
            label:
              input.label,
            value:
              form[
                input.key
              ] || "",
            onChangeText: (
              text
            ) =>
              setForm({
                ...form,
                [input.key]:
                  text,
              }),
            placeholder:
              input.label,
          })
        )}
      />
    </ParallaxScrollView>
  );
}

const styles =
  StyleSheet.create({
    container: {
      padding: 50,
      marginBottom: 100,
    },
    card: {
      marginBottom: 20,
      padding: 10,
      borderRadius: 10,
      backgroundColor: "#fff",
      borderColor: "#ccc",
      borderStyle: "solid",
      width: "100%",
      borderWidth: 1,
    },
    photo: {
      width: 100,
      height: 100,
      borderRadius: 10,
      alignSelf: "center",
    },
    row: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 10,
      marginTop: 10,
      justifyContent:
        "space-evenly",
    },
    toggleContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent:
        "space-evenly",
      marginBottom: 16,
      gap: 8,
      width: "100%",
    },
  });
