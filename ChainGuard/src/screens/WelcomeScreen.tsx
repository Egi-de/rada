import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CustomButton } from '../components/CustomButton';
import { colors, gradients } from '../constants/colors';
import { typography } from '../constants/typography';
import { spacing, borderRadius } from '../constants/spacing';

interface WelcomeScreenProps {
  navigation: any;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Logo Section */}
      <View style={styles.logoSection}>
        <View style={styles.logoContainer}>
          {/* Randa Logo */}
          <Image 
            source={require('../../assets/randa-logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.tagline}>Your Digital Finance Partner</Text>
      </View>

      {/* Buttons Section */}
      <View style={styles.buttonsSection}>
        <CustomButton
          title="Get Started"
          onPress={() => navigation.navigate('Signup')}
          variant="primary"
        />
        <CustomButton
          title="Sign In"
          onPress={() => navigation.navigate('Login')}
          variant="secondary"
          style={styles.signInButton}
        />

        {/* Bottom Indicators */}
        <View style={styles.indicators}>
          <View style={[styles.indicator, styles.indicatorActive]} />
          <View style={styles.indicator} />
          <View style={styles.indicator} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: spacing.huge,
    backgroundColor: colors.white,
  },
  logoSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: spacing.sm,
  },
  logo: {
    width: 200,
    height: 80,
  },
  appName: {
    fontSize: typography.fontSize.huge,
    fontWeight: typography.fontWeight.bold,
    color: colors.primaryGold,
    marginBottom: spacing.sm,
  },
  tagline: {
    fontSize: typography.fontSize.base,
    color: colors.textGray,
    marginTop: spacing.xs,
  },
  buttonsSection: {
    paddingHorizontal: spacing.xl,
  },
  signInButton: {
    marginTop: spacing.base,
  },
  indicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.xl,
    gap: spacing.sm,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  indicatorActive: {
    width: 24,
    backgroundColor: colors.primaryGold,
  },
});
