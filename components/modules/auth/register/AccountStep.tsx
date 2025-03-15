import { TextInput } from '@/components/elements/input';
import Tabs from '@/components/elements/tabs/tabs';
import { Typography } from '@/components/elements/typography';
import { RegisterFormData } from '@/schemas/register.schema';
import { spacing } from '@/themes';
import { palette } from '@/themes/colors';
import DevConsole from '@/utils/DevConsole';
import { Ionicons } from '@expo/vector-icons';
import React, { useCallback, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';

interface AccountStepProps {
  formValues: RegisterFormData;
}

const AccountStep: React.FC<AccountStepProps> = ({ formValues }) => {
  const { control, setValue, watch } = useFormContext<RegisterFormData>();
  const registerMethod = watch('account.method');

  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [secureConfirmTextEntry, setSecureConfirmTextEntry] = useState(true);

  // TODO: Implement Google registration
  const handleGoogleRegister = () => {
    DevConsole.log('Google registration');
  };

  const PhoneInput = useCallback(
    () => (
      <Controller
        control={control}
        name="account.phoneNumber"
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <TextInput
            label="Nomor Telepon"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder="Masukkan nomor telepon"
            keyboardType="phone-pad"
            leftIcon={<Ionicons name="call-outline" size={20} color={palette.blue.primary} />}
            error={error?.message}
          />
        )}
      />
    ),
    [control]
  );

  const EmailInput = useCallback(
    () => (
      <Controller
        control={control}
        name="account.email"
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <TextInput
            label="Email"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder="Masukkan email"
            keyboardType="email-address"
            autoCapitalize="none"
            leftIcon={<Ionicons name="mail-outline" size={20} color={palette.blue.primary} />}
            error={error?.message}
          />
        )}
      />
    ),
    [control]
  );

  const tabRoutes = [
    {
      key: 'phone',
      title: 'Nomor Telepon',
      component: PhoneInput,
    },
    {
      key: 'email',
      title: 'Email',
      component: EmailInput,
    },
  ];

  const handleTabChange = (key: string) => {
    setValue('account.method', key as 'phone' | 'email');
  };

  return (
    <View>
      <Tabs
        routes={tabRoutes}
        initialKey={registerMethod}
        onTabChange={handleTabChange}
        primaryColor={palette.blue.primary}
        variant="segmented"
      />

      <Controller
        control={control}
        name="account.password"
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <TextInput
            label="Password"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder="Masukkan password"
            secureTextEntry={secureTextEntry}
            leftIcon={
              <Ionicons name="lock-closed-outline" size={20} color={palette.blue.primary} />
            }
            rightIcon={
              <TouchableOpacity onPress={() => setSecureTextEntry(!secureTextEntry)}>
                <Ionicons
                  name={secureTextEntry ? 'eye-outline' : 'eye-off-outline'}
                  size={20}
                  color={palette.gray.dark}
                />
              </TouchableOpacity>
            }
            error={error?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="account.confirmPassword"
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <TextInput
            label="Konfirmasi Password"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder="Masukkan konfirmasi password"
            secureTextEntry={secureConfirmTextEntry}
            leftIcon={
              <Ionicons name="lock-closed-outline" size={20} color={palette.blue.primary} />
            }
            rightIcon={
              <TouchableOpacity onPress={() => setSecureConfirmTextEntry(!secureConfirmTextEntry)}>
                <Ionicons
                  name={secureConfirmTextEntry ? 'eye-outline' : 'eye-off-outline'}
                  size={20}
                  color={palette.gray.dark}
                />
              </TouchableOpacity>
            }
            error={error?.message}
          />
        )}
      />

      <View style={DIVIDER_CONTAINER}>
        <View style={DIVIDER} />
        <Typography style={DIVIDER_TEXT}>atau</Typography>
        <View style={DIVIDER} />
      </View>

      <TouchableOpacity style={GOOGLE_BUTTON} onPress={handleGoogleRegister} activeOpacity={0.7}>
        <Ionicons name="logo-google" size={20} />
        <Typography style={GOOGLE_BUTTON_TEXT}>Daftar dengan Google</Typography>
      </TouchableOpacity>
    </View>
  );
};

export default AccountStep;

const DIVIDER_CONTAINER: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  marginVertical: 10,
};

const DIVIDER: ViewStyle = {
  flex: 1,
  height: 1,
  backgroundColor: palette.gray.light,
};

const DIVIDER_TEXT: TextStyle = {
  fontSize: 14,
  color: palette.gray.dark,
  marginHorizontal: 10,
};

const GOOGLE_BUTTON: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#fff',
  gap: spacing.s,
  borderWidth: 1,
  borderColor: palette.gray.light,
  borderRadius: 12,
  paddingVertical: 12,
  paddingHorizontal: 24,
  marginBottom: 10,
};

const GOOGLE_BUTTON_TEXT: TextStyle = {
  fontSize: 14,
  fontWeight: '600' as const,
  color: palette.gray.darkest,
};
