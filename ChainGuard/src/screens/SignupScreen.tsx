import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { CustomInput } from '../components/CustomInput';
import { CustomButton } from '../components/CustomButton';
import { ProgressIndicator } from '../components/ProgressIndicator';
import { colors } from '../constants/colors';
import { typography } from '../constants/typography';
import { spacing } from '../constants/spacing';

interface SignupScreenProps {
  navigation: any;
}

export const SignupScreen: React.FC<SignupScreenProps> = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    phone?: string;
    password?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    return phoneRegex.test(phone);
  };

  const handleContinue = () => {
    const newErrors: {
      fullName?: string;
      email?: string;
      phone?: string;
      password?: string;
    } = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        navigation.navigate('OTPVerification', { email });
      }, 1000);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <Ionicons name="arrow-back" size={24} color={colors.textDark} />
            </TouchableOpacity>

            <ProgressIndicator currentStep={1} totalSteps={3} />
          </View>

          {/* Title Section */}
          <View style={styles.titleSection}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Fill in your details to get started</Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <CustomInput
              placeholder="Full Name"
              value={fullName}
              onChangeText={(text) => {
                setFullName(text);
                if (errors.fullName) setErrors({ ...errors, fullName: undefined });
              }}
              icon="person-outline"
              autoCapitalize="words"
              error={errors.fullName}
            />

            <CustomInput
              placeholder="Email"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (errors.email) setErrors({ ...errors, email: undefined });
              }}
              icon="mail-outline"
              keyboardType="email-address"
              autoCapitalize="none"
              error={errors.email}
            />

            <CustomInput
              placeholder="Phone Number"
              value={phone}
              onChangeText={(text) => {
                setPhone(text);
                if (errors.phone) setErrors({ ...errors, phone: undefined });
              }}
              icon="call-outline"
              keyboardType="phone-pad"
              error={errors.phone}
            />

            <CustomInput
              placeholder="Password"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (errors.password) setErrors({ ...errors, password: undefined });
              }}
              icon="lock-closed-outline"
              secureTextEntry
              error={errors.password}
            />

            <CustomButton
              title="Continue"
              onPress={handleContinue}
              variant="primary"
              loading={isLoading}
              disabled={isLoading}
              style={styles.continueButton}
            />
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.signInText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.xl,
  },
  header: {
    paddingVertical: spacing.base,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    marginBottom: spacing.base,
  },
  titleSection: {
    marginTop: spacing.base,
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: typography.fontSize.xxxl,
    fontFamily: typography.fonts.bold,
    color: colors.textDark,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: typography.fontSize.base,
    color: colors.textGray,
  },
  form: {
    marginBottom: spacing.xl,
  },
  continueButton: {
    marginTop: spacing.lg,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    paddingVertical: spacing.xl,
  },
  footerText: {
    fontSize: typography.fontSize.base,
    color: colors.textGray,
  },
  signInText: {
    fontSize: typography.fontSize.base,
    color: colors.primaryGold,
    fontWeight: typography.fontWeight.semibold,
  },
});
