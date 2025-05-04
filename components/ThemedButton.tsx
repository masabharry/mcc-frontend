// ThemedButton.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedButtonProps = {
  title: string;
  onPress?: () => void;
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'primary' | 'secondary' | 'success' | 'danger' | 'transparent';
};

export function ThemedButton({
  title,
  onPress,
  lightColor,
  darkColor,
  type = 'default',
}: ThemedButtonProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, styles[type]]}
    >
      <Text style={type === 'transparent' ? { color: '#007bff' } : styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
  default: {
    backgroundColor: '#666',
  },
  primary: {
    backgroundColor: '#007bff',

  },
  success: {
    backgroundColor: '#32CD32', // medium green
  },
  danger: {
    backgroundColor: '#ff4500', // danger medium red color 
  },
  transparent: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#007bff',
    // text color inside button

  },
  secondary: {
    backgroundColor: '#6c757d',

  },

  buttonHover: {
    opacity: 0.8,
  },
  buttonActive: {
    opacity: 0.6,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
});
