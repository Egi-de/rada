import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import { typography } from '../constants/typography';
import { spacing, borderRadius, shadows } from '../constants/spacing';

interface SettingsScreenProps {
  navigation?: any;
}

interface SettingsItem {
  icon: string;
  label: string;
  onPress?: () => void;
  toggle?: boolean;
  value?: boolean;
  onToggle?: (value: boolean) => void;
}

interface SettingsSection {
  title: string;
  items: SettingsItem[];
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ navigation }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [biometricsEnabled, setBiometricsEnabled] = useState(false);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  const settingsSections: SettingsSection[] = [
    {
      title: 'Account',
      items: [
        { icon: 'person-outline', label: 'Profile', onPress: () => console.log('Profile') },
        { icon: 'shield-checkmark-outline', label: 'Security', onPress: () => console.log('Security') },
        { icon: 'card-outline', label: 'Payment Methods', onPress: () => console.log('Payment') },
      ],
    },
    {
      title: 'Preferences',
      items: [
        { 
          icon: 'notifications-outline', 
          label: 'Notifications', 
          toggle: true,
          value: notificationsEnabled,
          onToggle: setNotificationsEnabled,
        },
        { 
          icon: 'finger-print-outline', 
          label: 'Biometric Login', 
          toggle: true,
          value: biometricsEnabled,
          onToggle: setBiometricsEnabled,
        },
        { 
          icon: 'moon-outline', 
          label: 'Dark Mode', 
          toggle: true,
          value: darkModeEnabled,
          onToggle: setDarkModeEnabled,
        },
      ],
    },
    {
      title: 'Support',
      items: [
        { icon: 'help-circle-outline', label: 'Help Center', onPress: () => console.log('Help') },
        { icon: 'document-text-outline', label: 'Terms & Conditions', onPress: () => console.log('Terms') },
        { icon: 'shield-outline', label: 'Privacy Policy', onPress: () => console.log('Privacy') },
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Settings</Text>
        </View>

        {/* Profile Card */}
        <TouchableOpacity style={styles.profileCard}>
          <View style={styles.profileAvatar}>
            <Ionicons name="person" size={32} color={colors.white} />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>John Doe</Text>
            <Text style={styles.profileEmail}>john.doe@example.com</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color={colors.textGray} />
        </TouchableOpacity>

        {/* Settings Sections */}
        {settingsSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionCard}>
              {section.items.map((item, itemIndex) => (
                <View key={itemIndex}>
                  <TouchableOpacity
                    style={styles.settingItem}
                    onPress={item.onPress}
                    disabled={item.toggle}
                  >
                    <View style={styles.settingLeft}>
                      <View style={styles.settingIconContainer}>
                        <Ionicons name={item.icon as any} size={24} color={colors.primaryGold} />
                      </View>
                      <Text style={styles.settingLabel}>{item.label}</Text>
                    </View>
                    {item.toggle ? (
                      <Switch
                        value={item.value}
                        onValueChange={item.onToggle}
                        trackColor={{ false: colors.borderGray, true: colors.primaryGold }}
                        thumbColor={colors.white}
                      />
                    ) : (
                      <Ionicons name="chevron-forward" size={20} color={colors.textGray} />
                    )}
                  </TouchableOpacity>
                  {itemIndex < section.items.length - 1 && <View style={styles.divider} />}
                </View>
              ))}
            </View>
          </View>
        ))}

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appVersion}>Version 1.0.0</Text>
          <Text style={styles.appCopyright}>© 2024 ChainGuard. All rights reserved.</Text>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={24} color={colors.error} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  header: {
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
  },
  headerTitle: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.textDark,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    marginHorizontal: spacing.base,
    marginBottom: spacing.lg,
    padding: spacing.base,
    borderRadius: borderRadius.lg,
    ...shadows.card,
  },
  profileAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primaryGold,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.textDark,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: typography.fontSize.sm,
    color: colors.textGray,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textGray,
    marginHorizontal: spacing.base,
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
  },
  sectionCard: {
    backgroundColor: colors.white,
    marginHorizontal: spacing.base,
    borderRadius: borderRadius.lg,
    ...shadows.card,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.base,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primaryGold + '15',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  settingLabel: {
    fontSize: typography.fontSize.base,
    color: colors.textDark,
    fontWeight: typography.fontWeight.medium,
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderGray,
    marginLeft: spacing.base + 40 + spacing.md,
  },
  appInfo: {
    alignItems: 'center',
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  appVersion: {
    fontSize: typography.fontSize.sm,
    color: colors.textGray,
    marginBottom: 4,
  },
  appCopyright: {
    fontSize: typography.fontSize.xs,
    color: colors.textGray,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    marginHorizontal: spacing.base,
    marginTop: spacing.md,
    marginBottom: spacing.xl,
    padding: spacing.base,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.error,
    gap: spacing.sm,
  },
  logoutText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.error,
  },
});
