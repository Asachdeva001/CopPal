import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface ChatInputProps {
  onSend: (message: string) => void;
  onVoiceInput: () => void;
  onLanguageToggle: () => void;
  currentLanguage: 'en' | 'hi';
}

const ChatInput: React.FC<ChatInputProps> = ({
  onSend,
  onVoiceInput,
  onLanguageToggle,
  currentLanguage,
}) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSend(message.trim());
      setMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.languageButton}
        onPress={onLanguageToggle}
      >
        <MaterialIcons
          name="translate"
          size={24}
          color="#007AFF"
        />
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        value={message}
        onChangeText={setMessage}
        placeholder="Type your message..."
        placeholderTextColor="#999"
        multiline
      />

      <TouchableOpacity
        style={styles.voiceButton}
        onPress={onVoiceInput}
      >
        <MaterialIcons
          name="mic"
          size={24}
          color="#007AFF"
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.sendButton}
        onPress={handleSend}
      >
        <MaterialIcons
          name="send"
          size={24}
          color="#007AFF"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  input: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginHorizontal: 10,
    maxHeight: 100,
    fontSize: 16,
  },
  languageButton: {
    padding: 8,
  },
  voiceButton: {
    padding: 8,
  },
  sendButton: {
    padding: 8,
  },
});

export default ChatInput; 