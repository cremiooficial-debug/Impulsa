'use client';

import React from 'react';
import { formatMoney } from '@/lib/units';

interface PvpCardProps {
  name: string;
  variableCost: number;
  fixedCost: number;
  profit: number;
  tax: number;
}

const PvpCard: React.FC<PvpCardProps> = ({ name, variableCost, fixedCost, profit, tax }) => {
  const pvp = variableCost + fixedCost + profit + tax;

  return (
    <div
      className="rounded-2xl p-5 border border-white/10 shadow-lg"
      style={{ background: 'linear-gradient(160deg, #0F3A66 0%, #07192C 100%)' }}
      aria-label={`Precio de venta de ${name}`}
    >
      <p className="text-white text-xl font-black truncate">{name}</p>
      <p className="text-white text-lg font-extrabold mt-1">
        PVP: <span className="text-[#FF8F1C]">{formatMoney(pvp)}</span>
      </p>
      <dl className="mt-2 space-y-0.5 text-base font-bold text-slate-400">
        <div className="flex gap-2">
          <dt>CVU:</dt>
          <dd>{formatMoney(variableCost)}</dd>
        </div>
        <div className="flex gap-2">
          <dt>CFU:</dt>
          <dd>{formatMoney(fixedCost)}</dd>
        </div>
        <div className="flex gap-2">
          <dt>GAN:</dt>
          <dd>{formatMoney(profit)}</dd>
        </div>
        <div className="flex gap-2">
          <dt>IMPT:</dt>
          <dd>{formatMoney(tax)}</dd>
        </div>
      </dl>
    </div>
  );
};

export default PvpCard;
