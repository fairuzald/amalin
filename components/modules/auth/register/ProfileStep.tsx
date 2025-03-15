import { DateInput, SelectInput, TextInput } from '@/components/elements/input';
import { RegisterFormData } from '@/schemas/register.schema';
import { palette } from '@/themes/colors';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { View } from 'react-native';
import { AddressInput } from './AddressInput';

interface ProfileStepProps {
  formValues: RegisterFormData;
}

const ProfileStep: React.FC<ProfileStepProps> = () => {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext<RegisterFormData>();

  // Gender options
  const genderOptions = ['Laki-laki', 'Perempuan', 'Lainnya'];

  // Extract address errors
  const addressErrors = {
    country: errors?.profile?.address?.country?.message,
    province: errors?.profile?.address?.province?.message,
    district: errors?.profile?.address?.district?.message,
    detailAddress: errors?.profile?.address?.detailAddress?.message,
  };

  return (
    <View>
      <Controller
        control={control}
        name="profile.name"
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <TextInput
            label="Nama Lengkap"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder="Masukkan nama lengkap"
            leftIcon={<Ionicons name="person-outline" size={20} color={palette.blue.primary} />}
            error={error?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="profile.birthDate"
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <DateInput
            label="Tanggal Lahir (Opsional)"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder="DD/MM/YYYY"
            format="DD/MM/YYYY"
            leftIcon={<Ionicons name="calendar-outline" size={20} color={palette.blue.primary} />}
            error={error?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="profile.gender"
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <SelectInput
            label="Jenis Kelamin (Opsional)"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder="Pilih jenis kelamin"
            options={genderOptions}
            leftIcon={<Ionicons name="people-outline" size={20} color={palette.blue.primary} />}
            rightIcon={<MaterialIcons name="arrow-drop-down" size={24} color={palette.gray.dark} />}
            error={error?.message}
          />
        )}
      />

      {/* Address Input Component */}
      <AddressInput control={control} setValue={setValue} errors={addressErrors} />
    </View>
  );
};

export default ProfileStep;
