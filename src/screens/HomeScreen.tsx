import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme, themeColors } from '../contexts/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';

type RootStackParamList = {
  Home: undefined;
  Chat: undefined;
  'IPC Search': undefined;
  'CPRC Search': undefined;
  SOP: undefined;
  Saved: undefined;
  Settings: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface QuickAccessCardProps {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  color: string;
}

const QuickAccessCard: React.FC<QuickAccessCardProps> = ({ title, icon, onPress, color }) => {
  const { colors } = useTheme();
  
  return (
    <TouchableOpacity 
      style={[styles.quickAccessCard, { backgroundColor: colors.card }]} 
      onPress={onPress}
    >
      <View style={[styles.iconContainer, { backgroundColor: color }]}>
        <Ionicons name={icon} size={24} color="white" />
      </View>
      <Text style={[styles.cardTitle, { color: colors.text }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { colors } = useTheme();
  const { t } = useTranslation();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colors.isDark ? 'light-content' : 'dark-content'} />
      <View style={styles.header}>
        <View>
          <Text style={[styles.welcomeText, { color: colors.text }]}>{t('welcome.title')}</Text>
          <Text style={[styles.appName, { color: colors.primary }]}>{t('welcome.appName')}</Text>
          <Text style={[styles.subtitle, { color: colors.secondary }]}>{t('welcome.subtitle')}</Text>
        </View>
        <TouchableOpacity 
          style={[styles.settingsButton, { backgroundColor: colors.card }]}
          onPress={() => navigation.navigate('Settings')}
        >
          <Ionicons name="settings-outline" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>{t('quickAccess.title')}</Text>
        <View style={styles.quickAccessGrid}>
          <QuickAccessCard
            title={t('quickAccess.chat')}
            icon="chatbubble-outline"
            onPress={() => navigation.navigate('Chat')}
            color="#4CAF50"
          />
          <QuickAccessCard
            title={t('quickAccess.ipcSearch')}
            icon="search-outline"
            onPress={() => navigation.navigate('IPCSearch')}
            color="#2196F3"
          />
          <QuickAccessCard
            title={t('quickAccess.crpcSearch')}
            icon="document-text-outline"
            onPress={() => navigation.navigate('CPRCSearch')}
            color="#9C27B0"
          />
          <QuickAccessCard
            title={t('quickAccess.sop')}
            icon="list-outline"
            onPress={() => navigation.navigate('SOP')}
            color="#FF9800"
          />
          <QuickAccessCard
            title={t('quickAccess.savedItems')}
            icon="bookmark-outline"
            onPress={() => navigation.navigate('SavedItems')}
            color="#F44336"
          />
        </View>

        <View style={styles.recentActivities}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>{t('recentActivities.title')}</Text>
            <TouchableOpacity>
              <Text style={[styles.seeAllText, { color: colors.primary }]}>{t('recentActivities.seeAll')}</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.emptyState, { backgroundColor: colors.card }]}>
            <Ionicons name="time-outline" size={48} color={colors.secondary} />
            <Text style={[styles.emptyStateTitle, { color: colors.text }]}>{t('recentActivities.empty.title')}</Text>
            <Text style={[styles.emptyStateSubtitle, { color: colors.secondary }]}>{t('recentActivities.empty.subtitle')}</Text>
          </View>
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
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 20,
    paddingTop: 10,
  },
  welcomeText: {
    fontSize: 16,
    marginBottom: 4,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
  },
  settingsButton: {
    padding: 12,
    borderRadius: 12,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  quickAccessGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  quickAccessCard: {
    width: '48%',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  recentActivities: {
    marginTop: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '600',
  },
  emptyState: {
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtitle: {
    fontSize: 14,
    textAlign: 'center',
  },
});

export default HomeScreen; 