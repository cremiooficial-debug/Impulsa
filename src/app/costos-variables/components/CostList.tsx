'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Icon from '@/components/ui/AppIcon';
import { UNITS } from '@/lib/units';

interface CostRow {
  id: string;
  name: string;
  detail: string;
  cost: number;
}

interface CostListProps {
  title: string;
  table: 'materiales' | 'empaques' | 'etiquetas';
  hasUnit?: boolean;
  namePlaceholder: string;
  emptyText: string;
  usuario: string;
  dependencia: string;
  ownerId: string;
}

const formatCost = (value: number): string => {
  const n = Number(value) || 0;
  return `$${n.toFixed(2)}`;
};

const CostList: React.FC<CostListProps> = ({
  title,
  table,
  hasUnit = true,
  namePlaceholder,
  emptyText,
  usuario,
  dependencia,
  ownerId,
}) => {
  const [rows, setRows] = useState<CostRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [unit, setUnit] = useState('und');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  const loadRows = useCallback(async () => {
    if (!usuario) return;
    setLoading(true);
    setErrorMsg('');
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .eq('owner_id', ownerId)
      .order('fecha', { ascending: false });

    if (error) {
      setErrorMsg(error.message);
      setRows([]);
    } else {
      const mapped: CostRow[] = (data ?? []).map((r) => {
        const qty = Number(r.cantidad_comprada) || 0;
        const purchasePrice = Number(r.precio_compra) || 0;
        const storedCost = 'costo_unitario' in r ? r.costo_unitario : r.costo;
        const calculated = qty > 0 ? purchasePrice / qty : Number(storedCost) || 0;
        const itemName =
          'material' in r ? r.material : 'empaque' in r ? r.empaque : r.etiqueta;
        return {
          id: r.id,
          name: itemName,
          detail: `por ${r.unidad}`,
          cost: calculated,
        };
      });
      setRows(mapped);
    }
    setLoading(false);
  }, [ownerId, usuario, table]);

  useEffect(() => {
    loadRows();
  }, [loadRows]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    const qty = Number(quantity) || 0;
    const purchasePrice = Number(price) || 0;
    if (qty <= 0) {
      setErrorMsg('Las cantidades compradas deben ser mayores a 0.');
      return;
    }
    setSaving(true);
    setErrorMsg('');

    const common = {
      owner_id: ownerId,
      usuario,
      dependencia,
      cantidad_comprada: qty,
      precio_compra: purchasePrice,
      unidad: unit || 'und',
    };

    const costPerUnit = purchasePrice / qty;
    const { error } =
      table === 'materiales'
        ? await supabase
            .from('materiales')
            .insert({ ...common, material: name.trim(), costo_unitario: costPerUnit })
        : table === 'empaques'
          ? await supabase
              .from('empaques')
              .insert({ ...common, empaque: name.trim(), costo: costPerUnit })
          : await supabase
              .from('etiquetas')
              .insert({ ...common, etiqueta: name.trim(), costo: costPerUnit });
    if (error) {
      setErrorMsg(error.message);
    } else {
      setName('');
      setUnit('und');
      setQuantity('');
      setPrice('');
      setShowForm(false);
      await loadRows();
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    setErrorMsg('');
    const { error } = await supabase.from(table).delete().eq('id', id);
    if (error) {
      setErrorMsg(error.message);
      return;
    }
    setRows((prev) => prev.filter((r) => r.id !== id));
  };

  const inputClass =
    'w-full rounded-xl bg-[#071628] border border-white/10 px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#FF8F1C]';

  return (
    <section
      className="flex flex-col rounded-3xl bg-[#0B2540]/75 backdrop-blur-md shadow-xl border border-white/10 overflow-hidden"
      aria-label={title}
    >
      <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-white/10">
        <div className="min-w-0">
          <h2 className="text-white font-extrabold text-base sm:text-lg truncate">{title}</h2>
          <p className="text-slate-400 text-xs font-medium">
            {loading ? 'Cargando...' : `${rows.length} registro${rows.length === 1 ? '' : 's'}`}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowForm((v) => !v)}
          className="shrink-0 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold text-[#030C16] bg-[#FF8F1C] hover:bg-[#ffa13f] transition-colors cursor-pointer"
        >
          <Icon name={showForm ? 'XMarkIcon' : 'PlusIcon'} size={16} />
          <span>{showForm ? 'Cerrar' : 'Agregar'}</span>
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAdd} className="px-5 py-4 border-b border-white/10 space-y-3 bg-[#071628]/60">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={namePlaceholder}
            className={inputClass}
            required
          />
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            aria-label="Unidad de compra"
            className={inputClass}
          >
            {UNITS.map((u) => (
              <option key={u.value} value={u.value}>
                {u.label}
              </option>
            ))}
          </select>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="number"
              min="0"
              step="any"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Cantidades compradas"
              aria-label="Cantidades compradas"
              className={inputClass}
              required
            />
            <input
              type="number"
              min="0"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Precio de compra"
              aria-label="Precio de compra"
              className={inputClass}
              required
            />
          </div>
          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-xl py-2 text-sm font-bold text-white bg-[#144979] hover:bg-[#1A5A96] border border-[#FF8F1C]/40 transition-colors disabled:opacity-60 cursor-pointer"
          >
            {saving ? 'Guardando...' : 'Guardar'}
          </button>
        </form>
      )}

      {errorMsg && (
        <div className="mx-5 mt-4 rounded-xl bg-red-500/10 border border-red-500/30 px-3 py-2 text-xs text-red-300">
          {errorMsg}
        </div>
      )}

      <ul className="flex-1 divide-y divide-white/5 max-h-[420px] overflow-y-auto">
        {loading && (
          <li className="px-5 py-8 text-center text-sm text-slate-400">Cargando...</li>
        )}
        {!loading && rows.length === 0 && !errorMsg && (
          <li className="px-5 py-8 text-center text-sm text-slate-400">{emptyText}</li>
        )}
        {!loading &&
          rows?.map((row) => (
            <li key={row.id} className="flex items-center gap-3 px-5 py-3 group">
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-bold truncate">{row.name}</p>
                {row.detail && <p className="text-slate-400 text-xs">{row.detail}</p>}
              </div>
              <div className="text-right">
                <p className="text-slate-400 text-[10px] font-semibold uppercase tracking-wide">Costo</p>
                <span className="text-[#FF8F1C] text-sm font-extrabold whitespace-nowrap">
                  {formatCost(row.cost)}
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleDelete(row.id)}
                aria-label={`Eliminar ${row.name}`}
                className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-red-400 hover:bg-white/5 transition-colors cursor-pointer"
              >
                <Icon name="TrashIcon" size={16} />
              </button>
            </li>
          ))}
      </ul>
    </section>
  );
};

export default CostList;
