// components/ThemedInput.tsx
import React from 'react';
import { TextInput, StyleSheet, TextInputProps, View, Text } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

interface ThemedInputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export const ThemedInput: React.FC<ThemedInputProps> = ({ label, style,error, ...props }) => {
  return (
    <ThemedView style={styles.container}>
      {label && <ThemedText style={styles.label}>{label}</ThemedText>}
      <TextInput
        {...props}
        style={[
          styles.input,
          style,
          error ? styles.inputError : null,
        ]}

        placeholderTextColor="#888"
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 15 },
  label: { marginBottom: 5, fontWeight: '600' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
});
