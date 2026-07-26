const formatter = new Intl.NumberFormat('lv-LV', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
});

export const formatPrice = (price: number): string => {
  return formatter.format(price);
};
