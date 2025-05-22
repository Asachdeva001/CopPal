import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';

type RootStackParamList = {
  Settings: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const AboutScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { colors } = useTheme();
  const { t } = useTranslation();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity
          style={[styles.backButton, { backgroundColor: colors.card }]}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>{t('settings.about')}</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={[styles.section, { backgroundColor: colors.card }]}>
          <Text style={[styles.appName, { color: colors.primary }]}>CopPal</Text>
          <Text style={[styles.version, { color: colors.secondary }]}>Version 1.0.0</Text>
        </View>

        <View style={[styles.section, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>About CopPal</Text>
          <Text style={[styles.description, { color: colors.text }]}>
            CopPal is your comprehensive legal assistant, designed to help law enforcement professionals
            access and understand legal information quickly and efficiently. Our app provides easy access
            to IPC, CrPC, and SOPs, making your work more streamlined and effective.
          </Text>
        </View>

        <View style={[styles.section, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Features</Text>
          <View style={styles.featureList}>
            <View style={styles.featureItem}>
              <Ionicons name="search" size={24} color={colors.primary} />
              <Text style={[styles.featureText, { color: colors.text }]}>
                Quick access to IPC and CrPC sections
              </Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="document-text" size={24} color={colors.primary} />
              <Text style={[styles.featureText, { color: colors.text }]}>
                Comprehensive SOP database
              </Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="chatbubbles" size={24} color={colors.primary} />
              <Text style={[styles.featureText, { color: colors.text }]}>
                AI-powered legal assistance
              </Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="bookmark" size={24} color={colors.primary} />
              <Text style={[styles.featureText, { color: colors.text }]}>
                Save and organize important sections
              </Text>
            </View>
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Contact</Text>
          <Text style={[styles.contactText, { color: colors.text }]}>
            For support or inquiries, please contact:
          </Text>
          <Text style={[styles.contactEmail, { color: colors.primary }]}>
            support@coppal.app
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  backButton: {
    padding: 8,
    borderRadius: 8,
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  version: {
    fontSize: 16,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  featureList: {
    gap: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureText: {
    fontSize: 16,
    flex: 1,
  },
  contactText: {
    fontSize: 16,
    marginBottom: 8,
  },
  contactEmail: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AboutScreen; 