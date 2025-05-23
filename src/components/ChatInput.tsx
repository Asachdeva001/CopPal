import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import VoiceInput from './VoiceInput';

interface ChatInputProps {
  onSend: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend }) => {
  const [message, setMessage] = useState('');
  const { colors } = useTheme();

  const handleSend = () => {
    if (message.trim()) {
      onSend(message.trim());
      setMessage('');
      Keyboard.dismiss();
    }
  };

  const handleVoiceResult = (text: string) => {
    setMessage(text);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <TextInput
        style={[styles.input, { color: colors.text, backgroundColor: colors.background }]}
        placeholder="Type a message..."
        placeholderTextColor={colors.text + '80'}
        value={message}
        onChangeText={setMessage}
        multiline
        maxLength={500}
      />
      <VoiceInput onResult={handleVoiceResult} />
      <TouchableOpacity
        style={[styles.sendButton, { backgroundColor: colors.primary }]}
        onPress={handleSend}
        disabled={!message.trim()}
      >
        <Ionicons
          name="send"
          size={20}
          color={message.trim() ? 'white' : colors.text + '40'}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    fontSize: 16,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChatInput; 