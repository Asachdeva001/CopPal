import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme, themeColors } from '../contexts/ThemeContext';

interface IPCSection {
  id: string;
  title: string;
  description: string;
  category: string;
}

const mockData: IPCSection[] = [
  {
    id: '1',
    title: 'Section 302',
    description: 'Punishment for murder',
    category: 'Criminal Law',
  },
  {
    id: '2',
    title: 'Section 420',
    description: 'Cheating and dishonestly inducing delivery of property',
    category: 'Criminal Law',
  },
  {
    id: '3',
    title: 'Section 498A',
    description: 'Cruelty by husband or relatives of husband',
    category: 'Family Law',
  },
  // Add more mock data as needed
];

const IPCSearchScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { isDark } = useTheme();
  const colors = isDark ? themeColors.dark : themeColors.light;

  const categories = Array.from(new Set(mockData.map(item => item.category)));

  const filteredData = mockData.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const renderCategoryButton = (category: string) => (
    <TouchableOpacity
      key={category}
      style={[
        styles.categoryButton,
        {
          backgroundColor: selectedCategory === category ? colors.primary : colors.card,
        },
      ]}
      onPress={() => setSelectedCategory(selectedCategory === category ? null : category)}
    >
      <Text
        style={[
          styles.categoryButtonText,
          { color: selectedCategory === category ? '#fff' : colors.text },
        ]}
      >
        {category}
      </Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }: { item: IPCSection }) => (
    <TouchableOpacity
      style={[styles.sectionCard, { backgroundColor: colors.card }]}
      onPress={() => {
        // Handle section selection
      }}
    >
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>{item.title}</Text>
        <Text style={[styles.sectionCategory, { color: colors.secondary }]}>
          {item.category}
        </Text>
      </View>
      <Text style={[styles.sectionDescription, { color: colors.text }]}>
        {item.description}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.searchContainer, { backgroundColor: colors.card }]}>
        <Ionicons name="search" size={20} color={colors.secondary} />
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder="Search IPC sections..."
          placeholderTextColor={colors.secondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery ? (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={20} color={colors.secondary} />
          </TouchableOpacity>
        ) : null}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={[styles.categoriesContainer, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.categoriesContent}
      >
        {categories.map(renderCategoryButton)}
      </ScrollView>

      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        style={{ backgroundColor: colors.background }}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="search-outline" size={48} color={colors.secondary} />
            <Text style={[styles.emptyText, { color: colors.secondary }]}>
              No sections found
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    padding: 12,
    borderRadius: 12,
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
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  categoriesContainer: {
    maxHeight: 50,
  },
  categoriesContent: {
    paddingHorizontal: 16,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  listContent: {
    padding: 16,
  },
  sectionCard: {
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  sectionCategory: {
    fontSize: 14,
  },
  sectionDescription: {
    fontSize: 16,
    lineHeight: 22,
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

export default IPCSearchScreen;