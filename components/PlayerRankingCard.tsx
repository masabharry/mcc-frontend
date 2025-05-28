import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, Image } from 'react-native';

const getColor = (index: number) => {
  if (index < 20) return '#2196F3';
  if (index < 70) return '#4CAF50';
  if (index < 120) return '#FFEB3B';
  return '#F44336';
};

export default function PlayerRankingCard({ player, index }: any) {
  const [imageError, setImageError] = React.useState(false);
  return (
    <View
      style={{
        backgroundColor: getColor(index),
        padding: 10,
        marginBottom: 8,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
        {imageError ? (
          <Ionicons name="person-circle-outline" size={40} color="#ccc" style={{ marginRight: 10 }} />
        ) : (
          <Image
            source={{ uri: player.photoUrl }}
            style={{ width: 40, height: 40, borderRadius: 20, marginRight: 10 }}
            onError={() => setImageError(true)}
          />
        )}
      <View>
        <Text style={{ fontWeight: 'bold' }}>{index + 1}. {player.name}</Text>
        <Text>Score: {player.score?.toFixed(1) || 0}</Text>
      </View>
    </View>
  );
}
