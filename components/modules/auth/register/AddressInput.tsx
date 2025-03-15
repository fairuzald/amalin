import { SelectInput, TextArea } from '@/components/elements/input';
import { Typography } from '@/components/elements/typography';
import { countries, getDistrictsByProvince, getProvincesByCountry } from '@/constants/region';
import { RegisterFormData } from '@/schemas/register.schema';
import { palette } from '@/themes/colors';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Control, Controller, UseFormSetValue } from 'react-hook-form';
import { TextStyle, View, ViewStyle } from 'react-native';

interface AddressInputProps {
  control: Control<RegisterFormData>;
  setValue: UseFormSetValue<RegisterFormData>;
  errors?: {
    country?: string;
    province?: string;
    district?: string;
    detailAddress?: string;
  };
}

export const AddressInput: React.FC<AddressInputProps> = ({ control, setValue, errors }) => {
  const [selectedCountry, setSelectedCountry] = useState<string | undefined>();
  const [selectedProvince, setSelectedProvince] = useState<string | undefined>();

  const [availableProvinces, setAvailableProvinces] = useState<{ id: string; name: string }[]>([]);
  const [availableDistricts, setAvailableDistricts] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    if (selectedCountry) {
      const filteredProvinces = getProvincesByCountry(selectedCountry);
      setAvailableProvinces(filteredProvinces);

      setValue('profile.address.province', '');
      setValue('profile.address.district', '');
      setSelectedProvince(undefined);
      setAvailableDistricts([]);
    }
  }, [selectedCountry, setValue]);

  useEffect(() => {
    if (selectedProvince) {
      const filteredDistricts = getDistrictsByProvince(selectedProvince);
      setAvailableDistricts(filteredDistricts);

      // Reset district when province changes
      setValue('profile.address.district', '');
    }
  }, [selectedProvince, setValue]);

  return (
    <View style={CONTAINER}>
      <Typography style={SECTION_TITLE}>Alamat</Typography>

      <Controller
        control={control}
        name="profile.address.country"
        render={({ field: { onChange, value } }) => (
          <SelectInput
            label="Negara"
            value={value}
            placeholder="Pilih Negara"
            options={countries.map(country => country.name)}
            onChangeText={selectedValue => {
              onChange(selectedValue);
              const country = countries.find(c => c.name === selectedValue);
              if (country) {
                setSelectedCountry(country.id);
              }
            }}
            leftIcon={<Ionicons name="earth-outline" size={20} color={palette.blue.primary} />}
            error={errors?.country}
          />
        )}
      />

      <Controller
        control={control}
        name="profile.address.province"
        render={({ field: { onChange, value } }) => (
          <SelectInput
            label="Provinsi"
            value={value}
            placeholder="Pilih Provinsi"
            options={availableProvinces.map(province => province.name)}
            onChangeText={selectedValue => {
              onChange(selectedValue);
              // Find province ID from selected name
              const province = availableProvinces.find(p => p.name === selectedValue);
              if (province) {
                setSelectedProvince(province.id);
              }
            }}
            leftIcon={<Ionicons name="map-outline" size={20} color={palette.blue.primary} />}
            error={errors?.province}
            disabled={!selectedCountry || availableProvinces.length === 0}
          />
        )}
      />

      <Controller
        control={control}
        name="profile.address.district"
        render={({ field: { onChange, value } }) => (
          <SelectInput
            label="Kabupaten/Kota"
            value={value}
            placeholder="Pilih Kabupaten/Kota"
            options={availableDistricts.map(district => district.name)}
            onChangeText={onChange}
            leftIcon={<Ionicons name="location-outline" size={20} color={palette.blue.primary} />}
            error={errors?.district}
            disabled={!selectedProvince || availableDistricts.length === 0}
          />
        )}
      />

      <Controller
        control={control}
        name="profile.address.detailAddress"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextArea
            label="Detail Alamat (Opsional)"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder="Masukkan detail alamat (nama jalan, nomor rumah, kode pos, dll)"
            leftIcon={<Ionicons name="home-outline" size={20} color={palette.blue.primary} />}
            error={errors?.detailAddress}
            numberOfLines={4}
          />
        )}
      />
    </View>
  );
};

const CONTAINER: ViewStyle = {
  marginTop: 8,
};

const SECTION_TITLE: TextStyle = {
  fontSize: 16,
  fontWeight: '600',
  marginBottom: 12,
  color: palette.gray.darkest,
};
