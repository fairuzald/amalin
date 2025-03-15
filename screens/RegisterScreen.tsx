import { registerUserMutation } from '@/api/@tanstack/react-query.gen';
import { Button } from '@/components/elements/button';
import { Card } from '@/components/elements/card';
import { Typography } from '@/components/elements/typography';
import SafeLayout from '@/components/layouts/SafeLayout';
import AccountStep from '@/components/modules/auth/register/AccountStep';
import ProfileStep from '@/components/modules/auth/register/ProfileStep';
import StepIndicator from '@/components/modules/auth/register/StepIndicator';
import VerificationStep from '@/components/modules/auth/register/VerificationStep';
import { RegisterFormData, registerSchema } from '@/schemas/register.schema';
import { borderRadius, spacing } from '@/themes';
import { palette } from '@/themes/colors';
import { useApiHandler } from '@/utils/apiHandler';
import { Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { NavigationProp } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {
  Animated,
  Dimensions,
  ScrollView,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

export default function RegisterScreen({ navigation }: { navigation: NavigationProp<any> }) {
  const { width } = Dimensions.get('window');
  const formCardWidth = width - 60;

  const methods = useForm<RegisterFormData>({
    mode: 'onChange',
    resolver: zodResolver(registerSchema),
    defaultValues: {
      account: {
        method: 'phone',
        phoneNumber: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
      profile: {
        name: '',
        birthDate: '',
        gender: '',
        address: {
          country: '',
          province: '',
          district: '',
          detailAddress: '',
        },
      },
      verification: {
        otp: '',
      },
    },
  });

  const { handleSubmit, watch, trigger } = methods;

  const register = useApiHandler(registerUserMutation, undefined, {
    successMessage: 'Akun berhasil dibuat!',
    errorMessage: 'Gagal membuat akun',
  });

  const [currentStep, setCurrentStep] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);

  const steps = [
    { title: 'Akun', description: 'Buat akun baru', component: AccountStep },
    { title: 'Profil', description: 'Lengkapi data diri Anda', component: ProfileStep },
    { title: 'Verifikasi', description: 'Verifikasi akun Anda', component: VerificationStep },
  ];

  // Validate only the current step with specific schema
  const validateCurrentStep = async () => {
    let isValid = false;

    if (currentStep === 0) {
      isValid = await trigger('account', { shouldFocus: true });
    } else if (currentStep === 1) {
      isValid = await trigger('profile', { shouldFocus: true });
    } else if (currentStep === 2) {
      isValid = await trigger('verification', { shouldFocus: true });
    }

    return isValid;
  };

  const handleNextStep = async () => {
    const isStepValid = await validateCurrentStep();

    if (isStepValid) {
      if (currentStep < steps.length - 1) {
        const nextStep = currentStep + 1;
        setCurrentStep(nextStep);
        scrollViewRef.current?.scrollTo({ x: nextStep * formCardWidth, animated: true });
      } else {
        handleSubmit(handleCompleteRegistration)();
      }
    }
  };

  // TODO: Implement registration logic
  const handleCompleteRegistration = async (data: RegisterFormData) => {
    try {
      navigation.navigate('Login');
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      scrollViewRef.current?.scrollTo({ x: prevStep * formCardWidth, animated: true });
    } else {
      navigation.goBack();
    }
  };

  // Handle horizontal scroll
  const handleScroll = Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
    useNativeDriver: false,
  });

  return (
    <SafeLayout withScrollView={false}>
      {/* Header */}
      <View style={HEADER}>
        <TouchableOpacity style={BACK_BUTTON} onPress={goToPreviousStep}>
          <Ionicons name="arrow-back" size={24} color={palette.gray.darkest} />
        </TouchableOpacity>
        <Typography variant="h3" color="default">
          Daftar Akun
        </Typography>
        <View style={BACK_BUTTON_PLACEHOLDER} />
      </View>

      {/* Step indicator */}
      <StepIndicator steps={steps} currentStep={currentStep} />

      {/* Form content */}
      <Card variant="elevated" style={FORM_CARD}>
        <FormProvider {...methods}>
          <View style={STEPS_CONTAINER}>
            <Animated.ScrollView
              ref={scrollViewRef}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              scrollEnabled={false}
              onScroll={handleScroll}
              scrollEventThrottle={16}
              bounces={false}
            >
              {steps.map((step, index) => {
                const StepComponent = step.component;
                return (
                  <ScrollView
                    key={index}
                    style={[STEP_WRAPPER, { width: formCardWidth }]}
                    contentContainerStyle={STEP_CONTENT}
                    showsVerticalScrollIndicator={false}
                  >
                    <StepComponent formValues={watch()} />
                  </ScrollView>
                );
              })}
            </Animated.ScrollView>
          </View>

          {/* Button */}
          <View style={BUTTON_CONTAINER}>
            <Button
              title={currentStep === steps.length - 1 ? 'Selesai' : 'Lanjut'}
              onPress={handleNextStep}
              loading={register.isPending}
              size="large"
              variant="primary"
            />
          </View>
        </FormProvider>
      </Card>

      {/* Footer - Login link */}
      <View style={FOOTER}>
        <Typography variant="bodySmall" color="subtle">
          Sudah punya akun?{' '}
        </Typography>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Typography variant="bodySmall" color="primary" style={LOGIN_TEXT}>
            Masuk
          </Typography>
        </TouchableOpacity>
      </View>
    </SafeLayout>
  );
}

const HEADER: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingHorizontal: spacing.ts,
  paddingVertical: 16,
};

const BACK_BUTTON: ViewStyle = {
  padding: 8,
};

const BACK_BUTTON_PLACEHOLDER: ViewStyle = {
  width: 40,
};

const FORM_CARD: ViewStyle = {
  marginHorizontal: spacing.xl,
  marginBottom: spacing.ts,
  padding: 0,
  borderRadius: borderRadius.l,
  overflow: 'hidden',
  flex: 1,
};

const STEPS_CONTAINER: ViewStyle = {
  flex: 1,
  overflow: 'hidden',
};

const STEP_WRAPPER: ViewStyle = {
  flex: 1,
};

const STEP_CONTENT: ViewStyle = {
  padding: spacing.m,
  paddingBottom: spacing.m * 2,
};

const BUTTON_CONTAINER: ViewStyle = {
  padding: spacing.m,
  borderTopWidth: 1,
  borderTopColor: palette.gray.light,
};

const FOOTER: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'center',
  marginVertical: spacing.ts,
};

const LOGIN_TEXT: TextStyle = {
  fontWeight: '600',
};
