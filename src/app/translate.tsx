export default function t(s: string): string {
    const LABELS = {
      appliances: 'أجهزة',
      clothes: 'ملابس',
      toys: 'ألعاب',

      bad: 'سيئة',
      excellent: 'ممتازة',
      fair: 'لا بأس بها',
      good: 'جيدة',

      buffet: 'بوفيه مفتوح',
      party: 'حفلة',
      wedding: 'زواج',

      fruits: 'فواكه',
      misc: 'منوع',
      vegetables: 'خضار',

      other: 'آخر',

      makkah: 'مكة',
      riyadh: 'الرياض',
    };

  return LABELS[s];
}
