'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Icon from '@/components/ui/AppIcon';

interface CostRow {
  id: string;
  name: string;
  detail: string;
  cost: number;
}

interface CostListProps {
  title: string;
  table: 'materiales' | 'empaques' | 'etiquetas';
  nameColumn: 'material' | 'empaque' | 'etiqueta';
  costColumn: 'costo_unitario' | 'costo';
  hasUnit?: boolean;
  namePlaceholder: string;
  emptyText: string;
  usuario: string;
  dependencia: string;
}

const formatCost = (value: number): string => {
  const n = Number(value) || 0;
  return `$${n.toFixed(2)}`;
};

const CostList: React.FC<CostListProps> = ({
  title,
  table,
  nameColumn,
  costColumn,
  hasUnit = false,
  namePlaceholder,
  emptyText,
  usuario,
  dependencia,
}) => {
  const [rows, setRows] = useState<CostRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [unit, setUnit] = useState('');
  const [cost, setCost] = useState('');

  const loadRows = useCallback(async () => {
    if (!usuario) return;
    setLoading(true);
    setErrorMsg('');
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .eq('usuario', usuario)
      .order('fecha', { ascending: false });

    if (error) {
      setErrorMsg(error.message);
      setRows([]);
    } else {
      const mapped: CostRow[] = (data ?? []).map((r: Record<string, any>) => ({
        id: r?.id,
        name: r?.[nameColumn] ?? '',
        detail: hasUnit ? (r?.unidad ?? '') : '',
        cost: Number(r?.[costColumn]) || 0,
      }));
      setRows(mapped);
    }
    setLoading(false);
  }, [usuario, table, nameColumn, costColumn, hasUnit]);

  useEffect(() => {
    loadRows();
  }, [loadRows]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setSaving(true);
    setErrorMsg('');

    const payload: Record<string, any> = {
      usuario,
      dependencia,
      [nameColumn]: name.trim(),
      [costColumn]: Number(cost) || 0,
    };
    if (hasUnit) payload.unidad = unit.trim() || 'und';

    const { error } = await supabase.from(table).insert(payload);
    if (error) {
      setErrorMsg(error.message);
    } else {
      setName('');
      setUnit('');
      setCost('');
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
          <div className="grid grid-cols-2 gap-3">
            {hasUnit && (
              <input
                type="text"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                placeholder="Unidad (kg, lt, und)"
                className={inputClass}
              />
            )}
            <input
              type="number"
              min="0"
              step="0.01"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              placeholder="Costo"
              className={`${inputClass} ${hasUnit ? '' : 'col-span-2'}`}
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
              <span className="text-[#FF8F1C] text-sm font-extrabold whitespace-nowrap">
                {formatCost(row.cost)}
              </span>
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
