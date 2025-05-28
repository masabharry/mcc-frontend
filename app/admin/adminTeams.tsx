import React, {
  useEffect,
  useState,
} from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  Alert,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { ThemedModal } from "@/components/ThemedModel";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedView } from "@/components/ThemedView";
import { router } from "expo-router";

const AdminTeamScreen =
  () => {
    const [teams, setTeams] =
      useState([]);
    const [
      modalVisible,
      setModalVisible,
    ] = useState(false);
    const [
      selectedTeam,
      setSelectedTeam,
    ] = useState(null);
    const [form, setForm] =
      useState({
        t10_totalMtachPlayed: "0",
        t10_totalWin: "0",
        t10_overfaced: "0",
        t10_runscored: "0",
        t15_totalMtachPlayed: "0",
        t15_totalWin: "0",
        t15_overfaced: "0",
        t15_runscored: "0",
        t6_totalMtachPlayed: "0",
        t6_totalWin: "0",
        t6_overfaced: "0",
        t6_runscored: "0",
      });
    const [
      modalType,
      setModalType,
    ] = useState("");

    const fetchTeam =
      async () => {
        const res =
          await axios.get(
            "https://mccbackend.vercel.app/teams"
          );
        setTeams(res.data);
      };
    useEffect(() => {
      fetchTeam();
    }, []);
   const handleOpenModal = (team, type) => {
  setSelectedTeam(team);
  setModalType(type);

  if (type === "create") {
    setForm({
      // teamName: "",
      // teamId: "",
      // emoji: "",
      t10_totalMtachPlayed: "0",
      t10_totalWin: "0",
      t10_overfaced: "0",
      t10_runscored: "0",
      t15_totalMtachPlayed: "0",
      t15_totalWin: "0",
      t15_overfaced: "0",
      t15_runscored: "0",
      t6_totalMtachPlayed: "0",
      t6_totalWin: "0",
      t6_overfaced: "0",
      t6_runscored: "0",
    });
  } else {
    setForm({});
  }

  setModalVisible(true);
};


    const handleSubmit =
      async () => {
        const id =
          selectedTeam?._id;

        try {
          if (
            modalType ===
            "addStats"
          ) {
            await axios.patch(
              `https://mccbackend.vercel.app/teams/${id}/add-stats`,
              form
            );
          } else if (
            modalType ===
            "updateInfo"
          ) {
            await axios.patch(
              `https://mccbackend.vercel.app/teams/${id}/update-info`,
              form
            );
          } else if (
            modalType ===
            "reset"
          ) {
            await axios.patch(
              `https://mccbackend.vercel.app/teams/${id}/reset`
            );
          } else if (
            modalType ===
            "delete"
          ) {
            await axios.delete(
              `https://mccbackend.vercel.app/teams/${id}`
            );
          } else if (
            modalType ===
            "create"
          ) {
            const payload = {
                teamName: form.teamName,
                teamId: Number(form.teamId),
                emoji: form.emoji,
                states: {
                  t10: {
                    totalMtachPlayed: Number(form.t10_totalMtachPlayed),
                    totalWin: Number(form.t10_totalWin),
                    overfaced: Number(form.t10_overfaced),
                    runscored: Number(form.t10_runscored),
                  },
                  t15: {
                    totalMtachPlayed: Number(form.t15_totalMtachPlayed),
                    totalWin: Number(form.t15_totalWin),
                    overfaced: Number(form.t15_overfaced),
                    runscored: Number(form.t15_runscored),
                  },
                  t6: {
                    totalMtachPlayed: Number(form.t6_totalMtachPlayed),
                    totalWin: Number(form.t6_totalWin),
                    overfaced: Number(form.t6_overfaced),
                    runscored: Number(form.t6_runscored),
                  },
                },
              };
             
            await axios.post(
              "https://mccbackend.vercel.app/teamregister",
              payload
            );
          }
          setModalVisible(
            false
          );
          fetchTeam();
        } catch (error) {
          Alert.alert(
            "Error",
            error.response
              ?.data?.error ||
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
                  "T10 Matches",
                key: "t10_totalMtachPlayed",
              },
              {
                label:
                  "T10 Wins",
                key: "t10_totalWin",
              },
              {
                label:
                  "T10 Overfaced",
                key: "t10_overfaced",
              },
              {
                label:
                  "T10 Runs Scored",
                key: "t10_runscored",
              },
              {
                label:
                  "T15 Matches",
                key: "t15_totalMtachPlayed",
              },
              {
                label:
                  "T15 Wins",
                key: "t15_totalWin",
              },
              {
                label:
                  "T15 Overfaced",
                key: "t15_overfaced",
              },
              {
                label:
                  "T15 Runs Scored",
                key: "t15_runscored",
              },
              {
                label:
                  "T6 Matches",
                key: "t6_totalMtachPlayed",
              },
              {
                label:
                  "T6 Wins",
                key: "t6_totalWin",
              },
              {
                label:
                  "T6 Overfaced",
                key: "t6_overfaced",
              },
              {
                label:
                  "T6 Runs Scored",
                key: "t6_runscored",
              },
            ];
          case "updateInfo":
            return [
              {
                label:
                  "Team Name",
                key: "teamName",
              },
              {
                label:
                  "Team Id",
                key: "teamId",
              },
              {
                label:
                  "emoji",
                key: "emoji",
              },
            ];
          case "create":
            return [
                {
                    label:
                    "Team Name",
                    key: "teamName",
                },
                {
                    label:
                    "Team Id",
                    key: "teamId",
                },
                {
                    label:
                    "Emoji",
                    key: "emoji",
                },
                // T10 States
                {
                    label:
                    "T10 Matches",
                    key: "t10_totalMtachPlayed",
                },
                {
                    label:
                    "T10 Wins",
                    key: "t10_totalWin",
                },
                {
                    label:
                    "T10 Overfaced",
                    key: "t10_overfaced",
                },
                {
                    label:
                    "T10 Runs Scored",
                    key: "t10_runscored",
                },
                // T15 States
                {
                    label:
                    "T15 Matches",
                    key: "t15_totalMtachPlayed",
                },
                {
                    label:
                    "T15 Wins",
                    key: "t15_totalWin",
                },
                {
                    label:
                    "T15 Overfaced",
                    key: "t15_overfaced",
                },
                {
                    label:
                    "T15 Runs Scored",
                    key: "t15_runscored",
                },
                // T6 States
                {
                    label:
                    "T6 Matches",
                    key: "t6_totalMtachPlayed",
                },
                {
                    label:
                    "T6 Wins",
                    key: "t6_totalWin",
                },
                {
                    label:
                    "T6 Overfaced",
                    key: "t6_overfaced",
                },
                {
                    label:
                    "T6 Runs Scored",
                    key: "t6_runscored",
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
              flexWrap:
                "wrap",
              color: "#fff",
            }}
          >
            Admin Panel
          </ThemedText>
        }
      >
        <ThemedButton
          title="+ Create New Team"
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
        {teams.map((team) => (
          <View
            key={team._id}
            style={
              styles.card
            }
          >
            <ThemedText
              style={{
                alignSelf:
                  "center",
                fontSize: 23,
                marginTop: 10,
              }}
            >
              {team.teamName}
            </ThemedText>
            <View
              style={
                styles.row
              }
            >
              <ThemedButton
                title="➕ Add Stats"
                onPress={() =>
                  handleOpenModal(
                    team,
                    "addStats"
                  )
                }
                type="transparent"
              />
              <ThemedButton
                title="✏️ Edit Info"
                onPress={() =>
                  handleOpenModal(
                    team,
                    "updateInfo"
                  )
                }
                type="transparent"
              />
              {/* <ThemedButton
                title="🔁 Reset"
                onPress={() =>
                  handleOpenModal(
                    team,
                    "reset"
                  )
                }
                type="transparent"
              /> */}
              <ThemedButton
                title="🗑️ Delete"
                onPress={() =>
                  handleOpenModal(
                    team,
                    "delete"
                  )
                }
                type="danger"
              />
            </View>
          </View>
        ))}

        <ThemedModal
          visible={
            modalVisible
          }
          title={
            modalType ===
            "create"
              ? "Create New Team"
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
  };

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
      justifyContent:
        "center",
      marginBottom: 16,
      gap: 8,
    },
  });

export default AdminTeamScreen;
