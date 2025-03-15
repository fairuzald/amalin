import { OTPInput } from '@/components/elements/input';
import { Typography } from '@/components/elements/typography';
import { RegisterFormData } from '@/schemas/register.schema';
import { palette } from '@/themes/colors';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import {
  TextInput as RNTextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

interface VerificationStepProps {
  formValues: RegisterFormData;
}

const VerificationStep: React.FC<VerificationStepProps> = ({ formValues }) => {
  const { control, setValue, watch } = useFormContext<RegisterFormData>();
  const [otpValues, setOtpValues] = useState<string[]>(Array(6).fill(''));
  const otpInputRefs = useRef<Array<RNTextInput | null>>(Array(6).fill(null));

  const formOtp = watch('verification.otp') || '';

  useEffect(() => {
    if (formOtp && formOtp.length <= 6) {
      const otpArray = formOtp.split('').concat(Array(6 - formOtp.length).fill(''));
      setOtpValues(otpArray);
    }
  }, [formOtp]);

  const handleOtpChange = (index: number, value: string) => {
    if (value && !/^[0-9]$/.test(value)) {
      return;
    }

    const newOtp = [...otpValues];
    newOtp[index] = value;
    setOtpValues(newOtp);

    const otpString = newOtp.join('');
    setValue('verification.otp', otpString, { shouldValidate: true });

    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    } else if (!value && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (text: string) => {
    const numericText = text.replace(/\D/g, '').slice(0, 6);

    if (numericText) {
      const newOtp = numericText.split('').concat(Array(6 - numericText.length).fill(''));

      setOtpValues(newOtp);
      setValue('verification.otp', numericText, { shouldValidate: true });

      if (numericText.length < 6) {
        otpInputRefs.current[numericText.length]?.focus();
      } else {
        otpInputRefs.current[5]?.blur();
      }
    }
  };

  const handleResendOtp = () => {};

  return (
    <View style={CONTAINER}>
      <Ionicons
        name="checkmark-circle"
        size={80}
        color={palette.green.success}
        style={VERIFICATION_ICON}
      />
      <Typography variant="h3" style={VERIFICATION_TITLE}>
        Verifikasi Akun
      </Typography>
      <Typography variant="body" color="subtle" style={VERIFICATION_TEXT}>
        Kami telah mengirimkan kode verifikasi ke{' '}
        {formValues.account.method === 'phone'
          ? formValues.account.phoneNumber
          : formValues.account.email}{' '}
        Anda. Silakan masukkan kode tersebut untuk menyelesaikan proses pendaftaran.
      </Typography>

      <Controller
        control={control}
        name="verification.otp"
        render={({ fieldState: { error } }) => (
          <>
            <View style={OTP_CONTAINER}>
              {Array.from({ length: 6 }, (_, index) => (
                <OTPInput
                  key={index}
                  ref={el => (otpInputRefs.current[index] = el)}
                  value={otpValues[index]}
                  onChangeText={text => handleOtpChange(index, text)}
                  index={index}
                  onKeyPress={({ nativeEvent }: { nativeEvent: { key: string } }) => {
                    if (nativeEvent.key === 'Backspace' && !otpValues[index] && index > 0) {
                      otpInputRefs.current[index - 1]?.focus();
                    }
                  }}
                />
              ))}
            </View>
            {error?.message && (
              <Typography variant="caption" color="error" style={ERROR_TEXT}>
                {error.message}
              </Typography>
            )}
          </>
        )}
      />

      <TouchableOpacity style={RESEND_BUTTON} onPress={handleResendOtp}>
        <Typography style={RESEND_TEXT}>Kirim Ulang Kode</Typography>
      </TouchableOpacity>
    </View>
  );
};

export default VerificationStep;

// Base styles
const CONTAINER: ViewStyle = {
  alignItems: 'center',
  paddingVertical: 10,
};

const VERIFICATION_ICON: ViewStyle = {
  marginBottom: 15,
};

const VERIFICATION_TITLE: TextStyle = {
  fontSize: 20,
  fontWeight: 'bold',
  color: palette.gray.darkest,
  marginBottom: 12,
};

const VERIFICATION_TEXT: TextStyle = {
  textAlign: 'center',
  marginBottom: 20,
  lineHeight: 20,
};

const OTP_CONTAINER: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'center',
  width: '100%',
  marginBottom: 16,
};

const ERROR_TEXT: TextStyle = {
  marginBottom: 10,
};

const RESEND_BUTTON: ViewStyle = {
  marginTop: 10,
  marginBottom: 10,
};

const RESEND_TEXT: TextStyle = {
  fontSize: 14,
  color: palette.blue.primary,
  fontWeight: '600',
};
