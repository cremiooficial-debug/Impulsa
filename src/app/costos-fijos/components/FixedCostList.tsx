'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Icon from '@/components/ui/AppIcon';
import { formatMoney } from '@/lib/units';

type FixedTable = 'costos_fijos_personal' | 'costos_fijos_equipos' | 'costos_fijos_servicios';

interface FixedCostListProps {
  title: string;
  table: FixedTable;
  kind: 'personal' | 'equipos' | 'servicios';
  emptyText: string;
  usuario: string;
  dependencia: string;
  ownerId: string;
}

interface FixedRow {
  id: string;
  name: string;
  detail: string;
  monthly: number;
}

const CONFIG: Record<
  FixedCostListProps['kind'],
  { namePlaceholder: string; detailColumn?: string; detailPlaceholder?: string }
> = {
  personal: {
    namePlaceholder: 'Nombre de la persona',
    detailColumn: 'cargo',
    detailPlaceholder: 'Cargo',
  },
  equipos: { namePlaceholder: 'Nombre del equipo' },
  servicios: {
    namePlaceholder: 'Nombre del servicio',
    detailColumn: 'proveedor',
    detailPlaceholder: 'Proveedor',
  },
};

const FixedCostList: React.FC<FixedCostListProps> = ({
  title,
  table,
  kind,
  emptyText,
  usuario,
  dependencia,
  ownerId,
}) => {
  const cfg = CONFIG[kind];
  const [rows, setRows] = useState<FixedRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [detail, setDetail] = useState('');
  const [monthly, setMonthly] = useState('');
  const [purchase, setPurchase] = useState('');
  const [lifeMonths, setLifeMonths] = useState('');

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
      const mapped: FixedRow[] = (data ?? []).map((r) => {
        const name = 'nombre' in r ? r.nombre : 'equipo' in r ? r.equipo : r.servicio;
        let detail = 'cargo' in r ? r.cargo : 'proveedor' in r ? r.proveedor : '';
        if ('equipo' in r) {
          detail = `Compra ${formatMoney(r.precio_compra)} · ${r.vida_util_meses} meses`;
        }
        return {
          id: r.id,
          name,
          detail,
          monthly: Number(r.costo_mensual) || 0,
        };
      });
      setRows(mapped);
    }
    setLoading(false);
  }, [ownerId, usuario, table, kind, cfg.detailColumn]);

  useEffect(() => {
    loadRows();
  }, [loadRows]);

  const total = useMemo(() => rows.reduce((acc, r) => acc + (r?.monthly ?? 0), 0), [rows]);

  const resetForm = () => {
    setName('');
    setDetail('');
    setMonthly('');
    setPurchase('');
    setLifeMonths('');
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setSaving(true);
    setErrorMsg('');

    const common = {
      owner_id: ownerId,
      usuario,
      dependencia,
    };

    let insertError: string | null = null;
    if (kind === 'equipos') {
      const price = Number(purchase) || 0;
      const life = Number(lifeMonths) || 0;
      if (life <= 0) {
        setErrorMsg('La vida útil debe ser mayor a 0 meses.');
        setSaving(false);
        return;
      }
      const { error } = await supabase.from('costos_fijos_equipos').insert({
        ...common,
        equipo: name.trim(),
        precio_compra: price,
        vida_util_meses: life,
        costo_mensual: price / life,
      });
      insertError = error?.message ?? null;
    } else if (kind === 'personal') {
      const { error } = await supabase.from('costos_fijos_personal').insert({
        ...common,
        nombre: name.trim(),
        cargo: detail.trim(),
        costo_mensual: Number(monthly) || 0,
      });
      insertError = error?.message ?? null;
    } else {
      const { error } = await supabase.from('costos_fijos_servicios').insert({
        ...common,
        servicio: name.trim(),
        proveedor: detail.trim(),
        costo_mensual: Number(monthly) || 0,
      });
      insertError = error?.message ?? null;
    }

    if (insertError) {
      setErrorMsg(insertError);
    } else {
      resetForm();
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
            placeholder={cfg.namePlaceholder}
            className={inputClass}
            required
          />
          {kind !== 'equipos' && cfg.detailColumn && (
            <input
              type="text"
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              placeholder={cfg.detailPlaceholder}
              className={inputClass}
            />
          )}
          {kind === 'equipos' ? (
            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                min="0"
                step="0.01"
                value={purchase}
                onChange={(e) => setPurchase(e.target.value)}
                placeholder="Precio de compra"
                aria-label="Precio de compra"
                className={inputClass}
                required
              />
              <input
                type="number"
                min="1"
                step="any"
                value={lifeMonths}
                onChange={(e) => setLifeMonths(e.target.value)}
                placeholder="Vida útil (meses)"
                aria-label="Vida útil en meses"
                className={inputClass}
                required
              />
            </div>
          ) : (
            <input
              type="number"
              min="0"
              step="0.01"
              value={monthly}
              onChange={(e) => setMonthly(e.target.value)}
              placeholder="Costo mensual"
              aria-label="Costo mensual"
              className={inputClass}
              required
            />
          )}
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
        {loading && <li className="px-5 py-8 text-center text-sm text-slate-400">Cargando...</li>}
        {!loading && rows.length === 0 && !errorMsg && (
          <li className="px-5 py-8 text-center text-sm text-slate-400">{emptyText}</li>
        )}
        {!loading &&
          rows?.map((row) => (
            <li key={row.id} className="flex items-center gap-3 px-5 py-3">
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-bold truncate">{row.name}</p>
                {row.detail && <p className="text-slate-400 text-xs truncate">{row.detail}</p>}
              </div>
              <div className="text-right">
                <p className="text-slate-400 text-[10px] font-semibold uppercase tracking-wide">Mensual</p>
                <span className="text-[#FF8F1C] text-sm font-extrabold whitespace-nowrap">
                  {formatMoney(row.monthly)}
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

      <div className="flex items-center justify-between px-5 py-3 border-t border-white/10 bg-[#071628]/60">
        <span className="text-slate-300 text-xs font-bold uppercase tracking-wide">Total mensual</span>
        <span className="text-white text-base font-black">{formatMoney(total)}</span>
      </div>
    </section>
  );
};

export default FixedCostList;
