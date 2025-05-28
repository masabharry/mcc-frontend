import ParallaxScrollView from "@/components/ParallaxScrollView";
import { RocketLoader } from "@/components/RocketLoader";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";


export default function Teams() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const response = await fetch('https://mccbackend.vercel.app/teams');
        const data = await response.json();
     
        setTeams(data); // Store teams in state
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };

    fetchTeamData();
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#8DD8FF', dark: '#1565C0' }}
      headerTitle={
        <ThemedText type="boldTitle" style={{ textAlign: 'center', flexWrap: 'wrap' }}>MCC</ThemedText>
      }>
      <ThemedView style={{ padding: 20 }}>
        {teams.length === 0 ? (
          <RocketLoader />
        ) : (
          teams.map((team: any) => (
            <ThemedView key={team._id} style={{gap: 20, flexDirection: 'column', justifyContent: 'space-evenly'}}>
              <ThemedView style={{ marginBottom: 20 }}>
                <ThemedButton 
                  title={`${team.teamName} ${team.emoji ? team.emoji : '🏏'}`} 
                  type="transparent" 
                  onPress={() =>
                    router.push({
                      pathname: `/team/[teamId]`,
                      params: {
                        teamId: team.teamId,
                        teamName: team.teamName,
                      }
                    })
                  }
                />
              </ThemedView>
            
            </ThemedView>
          ))
        )}

      </ThemedView>
    </ParallaxScrollView>
  );
}
