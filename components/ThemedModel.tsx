import React from 'react';
import {
  Modal,
  View,
  StyleSheet,
  Text,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { ThemedInput } from './ThemedInput';
import { ThemedButton } from './ThemedButton';

interface ThemedModalProps {
  visible: boolean;
  title?: string;
  inputs: {
    error: string | undefined; label: string; value: string; onChangeText: (text: string) => void; placeholder?: string
  }[];
  onClose: () => void;
  onSubmit: () => void;
  submitText?: string;
}

const screenHeight = Dimensions.get('window').height;

export const ThemedModal: React.FC<ThemedModalProps> = ({
  visible,
  title = 'Modal',
  inputs,
  onClose,
  onSubmit,
  submitText = 'Submit',
}) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={[styles.modal, { maxHeight: screenHeight * 0.8 }]}>
          <Text style={styles.title}>{title}</Text>

          <ScrollView style={{ flexGrow: 0 }}>
            {inputs.map((input, idx) => (
              <ThemedInput
                label={input.label}
                value={input.value}
                onChangeText={input.onChangeText}
                placeholder={input.placeholder}
                error={input.error} // ✨ this does everything
              />
            ))}
          </ScrollView>

          <View style={styles.buttons}>
            <ThemedButton title="Cancel" onPress={onClose} type="transparent" />
            <ThemedButton title={submitText} onPress={onSubmit} type="primary" />
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
});
