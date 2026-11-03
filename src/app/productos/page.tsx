'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Icon from '@/components/ui/AppIcon';
import CostosShell from '@/app/costos-variables/components/CostosShell';
import RecipeEditor, { CatalogItem, ProductSummary } from './components/RecipeEditor';

interface ProductosContentProps {
  usuario: string;
  dependencia: string;
}

const ProductosContent: React.FC<ProductosContentProps> = ({ usuario, dependencia }) => {
  const [products, setProducts] = useState<ProductSummary[]>([]);
  const [catalog, setCatalog] = useState<CatalogItem[]>([]);
  const [selectedId, setSelectedId] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');

  const loadAll = useCallback(async () => {
    if (!usuario) return;
    setLoading(true);
    setErrorMsg('');

    const [prod, mat, emp, eti] = await Promise.all([
      supabase
        .from('productos_receta')
        .select('*')
        .eq('usuario', usuario)
        .order('fecha', { ascending: false }),
      supabase.from('materiales').select('*').eq('usuario', usuario),
      supabase.from('empaques').select('*').eq('usuario', usuario),
      supabase.from('etiquetas').select('*').eq('usuario', usuario),
    ]);

    const firstError = prod.error ?? mat.error ?? emp.error ?? eti.error;
    if (firstError) setErrorMsg(firstError.message);

    const toCatalog = (
      rows: Record<string, any>[] | null,
      type: CatalogItem['type'],
      nameCol: string,
      costCol: string
    ): CatalogItem[] =>
      (rows ?? []).map((r) => {
        const qty = Number(r?.cantidad_comprada) || 0;
        const price = Number(r?.precio_compra) || 0;
        return {
          id: r?.id,
          type,
          name: r?.[nameCol] ?? '',
          unit: r?.unidad || 'und',
          costPerUnit: qty > 0 ? price / qty : Number(r?.[costCol]) || 0,
        };
      });

    setCatalog([
      ...toCatalog(mat.data, 'material', 'material', 'costo_unitario'),
      ...toCatalog(emp.data, 'empaque', 'empaque', 'costo'),
      ...toCatalog(eti.data, 'etiqueta', 'etiqueta', 'costo'),
    ]);

    const mapped: ProductSummary[] = (prod.data ?? []).map((r: Record<string, any>) => ({
      id: r?.id,
      name: r?.nombre ?? '',
      yieldQty: Number(r?.rendimiento) || 1,
      fixedCostUnit: Number(r?.costo_fijo_unitario) || 0,
      profitUnit: Number(r?.ganancia_unitaria) || 0,
      taxUnit: Number(r?.impuesto_unitario) || 0,
    }));
    setProducts(mapped);
    setSelectedId((prev) => (prev && mapped.some((p) => p.id === prev) ? prev : mapped[0]?.id ?? ''));
    setLoading(false);
  }, [usuario]);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setSaving(true);
    setErrorMsg('');
    const { data, error } = await supabase
      .from('productos_receta')
      .insert({ usuario, dependencia, nombre: name.trim() })
      .select()
      .single();
    if (error) {
      setErrorMsg(error.message);
    } else {
      setName('');
      setShowForm(false);
      await loadAll();
      if (data?.id) setSelectedId(data.id);
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    setErrorMsg('');
    const { error } = await supabase.from('productos_receta').delete().eq('id', id);
    if (error) {
      setErrorMsg(error.message);
      return;
    }
    await loadAll();
  };

  const selected = products.find((p) => p.id === selectedId);

  const inputClass =
    'w-full rounded-xl bg-[#071628] border border-white/10 px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#FF8F1C]';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      <section
        className="flex flex-col rounded-3xl bg-[#0B2540]/75 backdrop-blur-md shadow-xl border border-white/10 overflow-hidden lg:self-start"
        aria-label="Lista de productos"
      >
        <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-white/10">
          <div className="min-w-0">
            <h2 className="text-white font-extrabold text-base sm:text-lg truncate">Lista de productos</h2>
            <p className="text-slate-400 text-xs font-medium">
              {loading ? 'Cargando...' : `${products.length} producto${products.length === 1 ? '' : 's'}`}
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
              placeholder="Nombre del producto"
              className={inputClass}
              required
            />
            <button
              type="submit"
              disabled={saving}
              className="w-full rounded-xl py-2 text-sm font-bold text-white bg-[#144979] hover:bg-[#1A5A96] border border-[#FF8F1C]/40 transition-colors disabled:opacity-60 cursor-pointer"
            >
              {saving ? 'Guardando...' : 'Crear producto'}
            </button>
          </form>
        )}

        {errorMsg && (
          <div className="mx-5 mt-4 rounded-xl bg-red-500/10 border border-red-500/30 px-3 py-2 text-xs text-red-300">
            {errorMsg}
          </div>
        )}

        <ul className="divide-y divide-white/5 max-h-[420px] overflow-y-auto">
          {loading && <li className="px-5 py-8 text-center text-sm text-slate-400">Cargando...</li>}
          {!loading && products.length === 0 && !errorMsg && (
            <li className="px-5 py-8 text-center text-sm text-slate-400">
              Aún no tienes productos registrados.
            </li>
          )}
          {!loading &&
            products?.map((p) => {
              const active = p.id === selectedId;
              return (
                <li
                  key={p.id}
                  className={`flex items-center gap-2 px-3 py-2 ${active ? 'bg-[#FF8F1C]/10' : ''}`}
                >
                  <button
                    type="button"
                    onClick={() => setSelectedId(p.id)}
                    aria-current={active ? 'true' : undefined}
                    className={`flex-1 min-w-0 text-left px-2 py-1.5 rounded-xl text-sm font-bold truncate transition-colors cursor-pointer ${
                      active ? 'text-[#FF8F1C]' : 'text-white hover:text-[#FF8F1C]'
                    }`}
                  >
                    {p.name}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(p.id)}
                    aria-label={`Eliminar ${p.name}`}
                    className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-red-400 hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <Icon name="TrashIcon" size={16} />
                  </button>
                </li>
              );
            })}
        </ul>
      </section>

      <section
        className="lg:col-span-2 rounded-3xl bg-[#0B2540]/75 backdrop-blur-md shadow-xl border border-white/10 p-5"
        aria-label="Receta del producto"
      >
        {selected ? (
          <>
            <h2 className="text-white font-extrabold text-lg mb-4">
              Receta de <span className="text-[#FF8F1C]">{selected.name}</span>
            </h2>
            <RecipeEditor
              key={selected.id}
              product={selected}
              catalog={catalog}
              onChanged={loadAll}
            />
          </>
        ) : (
          <p className="text-center text-sm text-slate-400 py-16">
            Crea o selecciona un producto para armar su receta.
          </p>
        )}
      </section>
    </div>
  );
};

export default function ProductosPage() {
  return (
    <CostosShell
      title="Mis"
      highlight="Productos"
      subtitle="Arma tus recetas con materiales, empaques y etiquetas."
    >
      {({ usuario, dependencia }) => (
        <ProductosContent usuario={usuario} dependencia={dependencia} />
      )}
    </CostosShell>
  );
}
