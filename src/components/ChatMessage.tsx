import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface ChatMessageProps {
  message: string;
  timestamp: string;
  isUser: boolean;
  type?: 'text' | 'document' | 'link';
  documentUrl?: string;
  onDocumentPress?: () => void;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  timestamp,
  isUser,
  type = 'text',
  documentUrl,
  onDocumentPress,
}) => {
  const renderMessageContent = () => {
    switch (type) {
      case 'document':
        return (
          <TouchableOpacity
            style={styles.documentContainer}
            onPress={onDocumentPress}
          >
            <MaterialIcons name="insert-drive-file" size={24} color="#007AFF" />
            <Text style={styles.documentText}>{message}</Text>
          </TouchableOpacity>
        );
      case 'link':
        return (
          <TouchableOpacity
            style={styles.linkContainer}
            onPress={onDocumentPress}
          >
            <MaterialIcons name="link" size={24} color="#007AFF" />
            <Text style={styles.linkText}>{message}</Text>
          </TouchableOpacity>
        );
      default:
        return <Text style={styles.messageText}>{message}</Text>;
    }
  };

  return (
    <View
      style={[
        styles.container,
        isUser ? styles.userContainer : styles.assistantContainer,
      ]}
    >
      <View
        style={[
          styles.messageBubble,
          isUser ? styles.userBubble : styles.assistantBubble,
        ]}
      >
        {renderMessageContent()}
        <Text style={styles.timestamp}>{timestamp}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    paddingHorizontal: 16,
  },
  userContainer: {
    alignItems: 'flex-end',
  },
  assistantContainer: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  userBubble: {
    backgroundColor: '#007AFF',
  },
  assistantBubble: {
    backgroundColor: '#E9E9EB',
  },
  messageText: {
    fontSize: 16,
    color: '#000',
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  documentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 8,
  },
  documentText: {
    marginLeft: 8,
    color: '#007AFF',
    fontSize: 16,
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkText: {
    marginLeft: 8,
    color: '#007AFF',
    textDecorationLine: 'underline',
  },
});

export default ChatMessage; 