// eslint-disable-next-line import/prefer-default-export
export const formatNumberWithDecimal = (num) => {
  // Convert number to a fixed decimal string
  const fixedNum = num.toFixed(2); // Ensures two decimal places
  // Split the string into integer and decimal parts
  const [integerPart, decimalPart] = fixedNum.split('.');

  // Format the integer part with commas
  const formattedInteger = parseInt(integerPart, 10).toLocaleString('en-US');

  return {
    integer: formattedInteger,
    decimal: decimalPart,
  };
};

export const formatNumber = (num) => {
  return num.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const formatNumberWithOutDecimal = (num) => {
  return num.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

export const formatDate = (date) => {
  if (!date) {
    return 'YYYY-MM-DD';
  }

  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
  const day = String(d.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};