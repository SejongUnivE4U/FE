const diseaseTranslationMap: Record<string, string> = {
  Calculus: '치석',
  Caries: '충치',
  CaS: '칸디다증',
  CoS: '구순포진',
  Gingivitis: '치은염',
  GUM: '치주염',
  Hypodontia: '치아 결손',
  MC: '구강암',
  MouthUlcer: '구내염',
  OLP: '구강 편평태선',
  ToothDiscoloration: '치아 변색',
};

export const translateDiseaseName = (diseaseName: string): string =>
  diseaseTranslationMap[diseaseName] || diseaseName;
