import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme, themeColors } from '../contexts/ThemeContext';

interface SavedItem {
  id: string;
  title: string;
  type: 'section' | 'case' | 'document';
  description: string;
  date: Date;
}

const mockData: SavedItem[] = [
  {
    id: '1',
    title: 'Section 302',
    type: 'section',
    description: 'Punishment for murder',
    date: new Date('2024-03-15'),
  },
  {
    id: '2',
    title: 'State of Maharashtra v. Sukhdev Singh',
    type: 'case',
    description: 'Supreme Court Case on Criminal Law',
    date: new Date('2024-03-14'),
  },
  {
    id: '3',
    title: 'Legal Document Template',
    type: 'document',
    description: 'Standard format for legal documents',
    date: new Date('2024-03-13'),
  },
];

const SavedItemsScreen: React.FC = () => {
  const [savedItems, setSavedItems] = useState<SavedItem[]>(mockData);
  const { isDark } = useTheme();
  const colors = isDark ? themeColors.dark : themeColors.light;

  const getItemIcon = (type: SavedItem['type']) => {
    switch (type) {
      case 'section':
        return 'book-outline';
      case 'case':
        return 'document-text-outline';
      case 'document':
        return 'folder-outline';
      default:
        return 'document-outline';
    }
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      'Remove Item',
      'Are you sure you want to remove this item from saved items?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            setSavedItems(prev => prev.filter(item => item.id !== id));
          },
        },
      ]
    );
  };

  const renderItem = ({ item }: { item: SavedItem }) => (
    <TouchableOpacity
      style={[styles.itemCard, { backgroundColor: colors.card }]}
      onPress={() => {
        // Handle item selection
      }}
    >
      <View style={styles.itemHeader}>
        <View style={styles.itemIconContainer}>
          <Ionicons
            name={getItemIcon(item.type)}
            size={24}
            color={colors.primary}
          />
        </View>
        <View style={styles.itemInfo}>
          <Text style={[styles.itemTitle, { color: colors.text }]}>
            {item.title}
          </Text>
          <Text style={[styles.itemDescription, { color: colors.secondary }]}>
            {item.description}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(item.id)}
        >
          <Ionicons name="trash-outline" size={20} color={colors.error} />
        </TouchableOpacity>
      </View>
      <View style={styles.itemFooter}>
        <Text style={[styles.itemType, { color: colors.primary }]}>
          {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
        </Text>
        <Text style={[styles.itemDate, { color: colors.secondary }]}>
          {item.date.toLocaleDateString()}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={savedItems}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        style={{ backgroundColor: colors.background }}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="bookmark-outline" size={48} color={colors.secondary} />
            <Text style={[styles.emptyText, { color: colors.secondary }]}>
              No saved items yet
            </Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 16,
  },
  itemCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 14,
  },
  deleteButton: {
    padding: 8,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  itemType: {
    fontSize: 12,
    fontWeight: '500',
  },
  itemDate: {
    fontSize: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default SavedItemsScreen; 