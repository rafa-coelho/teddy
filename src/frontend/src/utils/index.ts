export const formatCurrency = (value: string) => {
    const numericValue = value.replace(/\D/g, '');
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
    }).format(Number(numericValue) / 100);
};

export const parseCurrencyToFloat = (value: string): number => {
    const numericValue = value.replace(/\D/g, ''); // Remove tudo que não é número
    return parseFloat((Number(numericValue) / 100).toFixed(2));
};
