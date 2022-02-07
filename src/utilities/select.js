export const getOptionLabel = (option) => {
  let label = `${option.name}, `;
  if (option.quantity === 0) {
    label += '❌';
  } else {
    label += `${option.quantity} ${option.unit || ''}`;
  }
  return label;
};

export const getUnitFromTable = (units, formula) => {
  const index = parseInt(formula.slice(8), 10) - 2;
  return units[index];
};

export const getCategoryFromTable = (categories, formula) => {
  const index = parseInt(formula.slice(13), 10) - 2;
  return categories[index];
};

export const getDateFromFormula = (formula) => {
  const [year, month, day] = formula.slice(6, -1).split(',');
  return month ? `${month}/${day}/${year}` : null;
};

export const sanitizeQuantity = (quantity) => {
  return quantity[0] === '=' ? quantity.slice(1) : quantity;
};
