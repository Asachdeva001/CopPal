import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Alert,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import { useTheme, themeColors } from '../contexts/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';

type RootStackParamList = {
  MainTabs: undefined;
  Settings: undefined;
  About: undefined;
  CPRCSearch: undefined;
};

type SettingsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Settings'>;

const SettingsScreen: React.FC = () => {
  const { logout } = useAuth();
  const { isDark, theme, setTheme, useSystemTheme, setUseSystemTheme } = useTheme();
  const colors = isDark ? themeColors.dark : themeColors.light;
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const { t, i18n } = useTranslation();

  const languages = [
    { code: 'en', name: t('languages.english') },
    { code: 'hi', name: t('languages.hindi') },
    { code: 'mr', name: t('languages.marathi') },
    { code: 'gu', name: t('languages.gujarati') },
    { code: 'pa', name: t('languages.punjabi') },
  ];

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => logout(),
        },
      ]
    );
  };

  const handleAboutPress = () => {
    navigation.navigate('About');
  };

  const renderSettingItem = (
    icon: string,
    title: string,
    rightElement?: React.ReactNode
  ) => (
    <View style={[styles.settingItem, { borderBottomColor: colors.border }]}>
      <View style={styles.settingLeft}>
        <Ionicons name={icon as any} size={24} color={colors.primary} />
        <Text style={[styles.settingText, { color: colors.text }]}>{title}</Text>
      </View>
      {rightElement}
    </View>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          {t('settings.language')}
        </Text>
        <View style={[styles.languageContainer, { backgroundColor: colors.card }]}>
          {languages.map((lang) => (
            <TouchableOpacity
              key={lang.code}
              style={[
                styles.languageOption,
                i18n.language === lang.code && { backgroundColor: colors.primary + '20' },
              ]}
              onPress={() => handleLanguageChange(lang.code)}
            >
              <Text style={[styles.languageText, { color: colors.text }]}>
                {lang.name}
              </Text>
              {i18n.language === lang.code && (
                <Ionicons name="checkmark" size={24} color={colors.primary} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          {t('settings.theme')}
        </Text>
        <View style={[styles.themeContainer, { backgroundColor: colors.card }]}>
          <View style={styles.settingRow}>
            <Text style={[styles.settingText, { color: colors.text }]}>
              {t('settings.darkMode')}
            </Text>
            <Switch
              value={isDark}
              onValueChange={() => setTheme(isDark ? 'light' : 'dark')}
              disabled={useSystemTheme}
              trackColor={{ false: colors.border, true: colors.primary + '80' }}
              thumbColor={isDark ? colors.primary : colors.text}
            />
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          {t('settings.notifications')}
        </Text>
        <View style={[styles.notificationContainer, { backgroundColor: colors.card }]}>
          <View style={styles.settingRow}>
            <Text style={[styles.settingText, { color: colors.text }]}>
              {t('settings.pushNotifications')}
            </Text>
            <Switch
              value={true}
              onValueChange={() => {}}
              trackColor={{ false: colors.border, true: colors.primary + '80' }}
              thumbColor={colors.primary}
            />
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <TouchableOpacity
          style={[styles.aboutButton, { backgroundColor: colors.card }]}
          onPress={handleAboutPress}
        >
          <Text style={[styles.aboutButtonText, { color: colors.text }]}>
            {t('settings.about')}
          </Text>
          <Ionicons name="chevron-forward" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.logoutButton, { backgroundColor: colors.error }]}
        onPress={handleLogout}
      >
        <Text style={styles.logoutButtonText}>{t('settings.logout')}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    marginHorizontal: 16,
  },
  languageContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    marginHorizontal: 16,
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  languageText: {
    fontSize: 16,
  },
  themeContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    marginHorizontal: 16,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  settingText: {
    fontSize: 16,
  },
  notificationContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    marginHorizontal: 16,
  },
  aboutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 16,
  },
  aboutButtonText: {
    fontSize: 16,
  },
  logoutButton: {
    margin: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default SettingsScreen; 