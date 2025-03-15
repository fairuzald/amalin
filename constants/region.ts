// TODO: Replace with real data from API
export interface Location {
  id: string;
  name: string;
}

export interface Province extends Location {
  countryId: string;
}

export interface District extends Location {
  provinceId: string;
}

// Countries
export const countries: Location[] = [
  { id: 'ID', name: 'Indonesia' },
  { id: 'MY', name: 'Malaysia' },
  { id: 'SG', name: 'Singapura' },
];

// Provinces by country
export const provinces: Province[] = [
  // Indonesia
  { id: 'ID-JK', name: 'Jakarta', countryId: 'ID' },
  { id: 'ID-JB', name: 'Jawa Barat', countryId: 'ID' },
  { id: 'ID-JT', name: 'Jawa Tengah', countryId: 'ID' },
  { id: 'ID-JI', name: 'Jawa Timur', countryId: 'ID' },
  { id: 'ID-BA', name: 'Bali', countryId: 'ID' },
  { id: 'ID-BB', name: 'Bangka Belitung', countryId: 'ID' },

  // Malaysia
  { id: 'MY-JHR', name: 'Johor', countryId: 'MY' },
  { id: 'MY-KDH', name: 'Kedah', countryId: 'MY' },
  { id: 'MY-KL', name: 'Kuala Lumpur', countryId: 'MY' },

  // Singapore is treated as one province
  { id: 'SG-01', name: 'Singapura', countryId: 'SG' },
];

// Districts by province
export const districts: District[] = [
  // Jakarta
  { id: 'JK-JU', name: 'Jakarta Utara', provinceId: 'ID-JK' },
  { id: 'JK-JB', name: 'Jakarta Barat', provinceId: 'ID-JK' },
  { id: 'JK-JS', name: 'Jakarta Selatan', provinceId: 'ID-JK' },
  { id: 'JK-JT', name: 'Jakarta Timur', provinceId: 'ID-JK' },
  { id: 'JK-JP', name: 'Jakarta Pusat', provinceId: 'ID-JK' },

  // Jawa Barat
  { id: 'JB-BDG', name: 'Bandung', provinceId: 'ID-JB' },
  { id: 'JB-BGR', name: 'Bogor', provinceId: 'ID-JB' },
  { id: 'JB-BKS', name: 'Bekasi', provinceId: 'ID-JB' },
  { id: 'JB-CRB', name: 'Cirebon', provinceId: 'ID-JB' },
  { id: 'JB-DPK', name: 'Depok', provinceId: 'ID-JB' },

  // Jawa Tengah
  { id: 'JT-SMG', name: 'Semarang', provinceId: 'ID-JT' },
  { id: 'JT-SKT', name: 'Surakarta', provinceId: 'ID-JT' },
  { id: 'JT-MGL', name: 'Magelang', provinceId: 'ID-JT' },

  // Jawa Timur
  { id: 'JI-SBY', name: 'Surabaya', provinceId: 'ID-JI' },
  { id: 'JI-MLG', name: 'Malang', provinceId: 'ID-JI' },
  { id: 'JI-KDR', name: 'Kediri', provinceId: 'ID-JI' },

  // Bali
  { id: 'BA-DPS', name: 'Denpasar', provinceId: 'ID-BA' },
  { id: 'BA-GNY', name: 'Gianyar', provinceId: 'ID-BA' },
  { id: 'BA-BDG', name: 'Badung', provinceId: 'ID-BA' },

  // Bangka Belitung
  { id: 'BB-PGP', name: 'Pangkal Pinang', provinceId: 'ID-BB' },
  { id: 'BB-BLT', name: 'Belitung', provinceId: 'ID-BB' },

  // Malaysia - Johor
  { id: 'JHR-JB', name: 'Johor Bahru', provinceId: 'MY-JHR' },
  { id: 'JHR-BTW', name: 'Batu Pahat', provinceId: 'MY-JHR' },

  // Malaysia - Kedah
  { id: 'KDH-AS', name: 'Alor Setar', provinceId: 'MY-KDH' },
  { id: 'KDH-LGK', name: 'Langkawi', provinceId: 'MY-KDH' },

  // Malaysia - Kuala Lumpur
  { id: 'KL-KL', name: 'Kuala Lumpur', provinceId: 'MY-KL' },

  // Singapore
  { id: 'SG-CTL', name: 'Central Region', provinceId: 'SG-01' },
  { id: 'SG-EST', name: 'East Region', provinceId: 'SG-01' },
  { id: 'SG-WST', name: 'West Region', provinceId: 'SG-01' },
  { id: 'SG-NTH', name: 'North Region', provinceId: 'SG-01' },
  { id: 'SG-NES', name: 'North-East Region', provinceId: 'SG-01' },
];

// Helper functions
export const getProvincesByCountry = (countryId: string): Province[] => {
  return provinces.filter(province => province.countryId === countryId);
};

export const getDistrictsByProvince = (provinceId: string): District[] => {
  return districts.filter(district => district.provinceId === provinceId);
};
