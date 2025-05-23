import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
//import { API_URL } from '../config';

interface VoiceInputProps {
  onTranscriptionComplete: (text: string) => void;
  onError?: (error: string) => void;
}

const VoiceInput: React.FC<VoiceInputProps> = ({ 
  onTranscriptionComplete,
  onError 
}) => {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    return () => {
      if (recording) {
        recording.stopAndUnloadAsync();
      }
    };
  }, [recording]);

  const startRecording = async () => {
    try {
      console.log('Starting recording process...');
      // Request permissions
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission denied');
        onError?.('Permission to access microphone was denied');
        return;
      }

      // Set audio mode
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      // Start recording
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      setIsRecording(true);
      console.log('Recording started successfully');
    } catch (error) {
      console.error('Error in startRecording:', error);
      onError?.(error instanceof Error ? error.message : 'Failed to start recording');
    }
  };

  const stopRecording = async () => {
    console.log('Stop recording called');
    if (!recording) {
      console.log('No recording found');
      return;
    }

    try {
      console.log('Stopping recording...');
      setIsRecording(false);
      setIsProcessing(true);
      
      // Stop recording
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      console.log('Recording stopped, URI:', uri);
      setRecording(null);

      if (!uri) {
        console.log('No URI available');
        throw new Error('No recording URI available');
      }

      // Create form data
      const formData = new FormData();
      formData.append('audio_file', {
        uri,
        type: 'audio/m4a',
        name: 'recording.m4a',
      } as any);
      console.log('FormData created, sending to server...');

      // Send to server
      const response = await fetch('http://0.0.0.0:8000/transcribe', {
        method: 'POST',
        body: formData,
      });
      console.log('Server response received:', response.status);

      if (!response.ok) {
        console.log('Server response not OK');
        throw new Error('Transcription failed');
      }

      const data = await response.json();
      console.log('Transcription data:', data);
      onTranscriptionComplete(data.transcription);
    } catch (error) {
      console.error('Error in stopRecording:', error);
      onError?.(error instanceof Error ? error.message : 'Failed to process recording');
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePress = () => {
    console.log('Button pressed, isRecording:', isRecording);
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.recordButton,
          isRecording && styles.recordingActive,
          isProcessing && styles.processing
        ]}
        onPress={handlePress}
        disabled={isProcessing}
      >
        {isProcessing ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Ionicons
            name={isRecording ? "stop" : "mic"}
            size={24}
            color="#fff"
          />
        )}
      </TouchableOpacity>
      {isRecording && (
        <Text style={styles.recordingText}>Recording...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  recordButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  recordingActive: {
    backgroundColor: '#FF3B30',
  },
  processing: {
    backgroundColor: '#8E8E93',
  },
  recordingText: {
    marginTop: 8,
    color: '#FF3B30',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default VoiceInput;