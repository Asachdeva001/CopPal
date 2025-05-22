import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LoginForm from '../components/LoginForm';
import { useAuth } from '../contexts/AuthContext';
import { useTheme, themeColors } from '../contexts/ThemeContext';

const LoginScreen: React.FC = () => {
  const navigation = useNavigation();
  const { login, isLoading } = useAuth();
  const { isDark } = useTheme();
  const colors = isDark ? themeColors.dark : themeColors.light;

  const handleLogin = async (email: string, password: string) => {
    try {
      // For testing purposes, use these credentials
      if (email === 'test@test.com' && password === 'test1234') {
        await login(email, password);
        navigation.navigate('Home');
      } else {
        Alert.alert(
          'Login Failed',
          'Please use test@test.com / test1234 for testing',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      Alert.alert(
        'Login Failed',
        'Please check your credentials and try again.',
        [{ text: 'OK' }]
      );
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <View style={styles.contentContainer}>
          <View style={styles.header}>
            <Image
              source={require('../assets/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={[styles.title, { color: colors.text }]}>Welcome to CopPal</Text>
            <Text style={[styles.subtitle, { color: colors.secondary }]}>Your Legal Assistant</Text>
          </View>

          <LoginForm onSubmit={handleLogin} isLoading={isLoading} />

          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: colors.secondary }]}>Test Credentials:</Text>
            <Text style={[styles.footerText, { color: colors.secondary }]}>Email: test@test.com</Text>
            <Text style={[styles.footerText, { color: colors.secondary }]}>Password: test1234</Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    marginBottom: 4,
  },
});

export default LoginScreen; 