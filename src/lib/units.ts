export type UnitKind = 'mass' | 'volume' | 'length' | 'area' | 'count';

export interface UnitDef {
  value: string;
  label: string;
  kind: UnitKind;
  /** Factor to convert 1 of this unit into the base unit of its kind. */
  toBase: number;
}

export const UNITS: UnitDef[] = [
  { value: 'gr', label: 'gr', kind: 'mass', toBase: 1 },
  { value: 'kg', label: 'kg', kind: 'mass', toBase: 1000 },
  { value: 'ml', label: 'ml', kind: 'volume', toBase: 1 },
  { value: 'ltr', label: 'ltr', kind: 'volume', toBase: 1000 },
  { value: 'cm', label: 'cm', kind: 'length', toBase: 1 },
  { value: 'm', label: 'm', kind: 'length', toBase: 100 },
  { value: 'cm2', label: 'cm²', kind: 'area', toBase: 1 },
  { value: 'm2', label: 'm²', kind: 'area', toBase: 10000 },
  { value: 'und', label: 'und', kind: 'count', toBase: 1 },
];

export const getUnit = (value: string): UnitDef => {
  return UNITS.find((u) => u.value === value) ?? UNITS[UNITS.length - 1];
};

export const getCompatibleUnits = (purchaseUnit: string): UnitDef[] => {
  const kind = getUnit(purchaseUnit).kind;
  return UNITS.filter((u) => u.kind === kind);
};

/**
 * Cost of using `quantity` of `usedUnit` when the base cost is expressed
 * per 1 `purchaseUnit`. Example: 1 kg costs $1, using 100 gr => $0.10.
 */
export const calcIngredientCost = (
  costPerPurchaseUnit: number,
  purchaseUnit: string,
  quantity: number,
  usedUnit: string
): number => {
  const purchase = getUnit(purchaseUnit);
  const used = getUnit(usedUnit);
  if (purchase.kind !== used.kind) return 0;
  const factor = used.toBase / purchase.toBase;
  return (Number(costPerPurchaseUnit) || 0) * (Number(quantity) || 0) * factor;
};

export const formatMoney = (value: number): string => {
  const n = Number(value) || 0;
  return `$${n.toFixed(2)}`;
};
