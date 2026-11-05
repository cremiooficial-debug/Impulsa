'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Icon from '@/components/ui/AppIcon';
import { useAuth } from '@/contexts/AuthContext';
import {
  calcIngredientCost,
  formatMoney,
  getCompatibleUnits,
  getUnit,
} from '@/lib/units';
import PvpCard from './PvpCard';

export type IngredientType = 'material' | 'empaque' | 'etiqueta';

export interface CatalogItem {
  id: string;
  type: IngredientType;
  name: string;
  unit: string;
  costPerUnit: number;
}

export interface ProductSummary {
  id: string;
  name: string;
  yieldQty: number;
  fixedCostUnit: number;
  profitUnit: number;
  taxUnit: number;
}

interface Ingredient {
  id: string;
  type: IngredientType;
  itemId: string;
  quantity: number;
  unit: string;
}

interface RecipeEditorProps {
  product: ProductSummary;
  catalog: CatalogItem[];
  onChanged: () => void;
}

const TYPE_LABEL: Record<IngredientType, string> = {
  material: 'Material',
  empaque: 'Empaque',
  etiqueta: 'Etiqueta',
};

const RecipeEditor: React.FC<RecipeEditorProps> = ({ product, catalog, onChanged }) => {
  const { user } = useAuth();
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [saving, setSaving] = useState(false);

  const [yieldInput, setYieldInput] = useState(String(product.yieldQty || 1));
  const [fixedInput, setFixedInput] = useState(String(product.fixedCostUnit || 0));
  const [profitInput, setProfitInput] = useState(String(product.profitUnit || 0));
  const [taxInput, setTaxInput] = useState(String(product.taxUnit || 0));

  const [type, setType] = useState<IngredientType>('material');
  const [itemId, setItemId] = useState('');
  const [qty, setQty] = useState('');
  const [unit, setUnit] = useState('');

  useEffect(() => {
    setYieldInput(String(product.yieldQty || 1));
    setFixedInput(String(product.fixedCostUnit || 0));
    setProfitInput(String(product.profitUnit || 0));
    setTaxInput(String(product.taxUnit || 0));
  }, [product.id, product.yieldQty, product.fixedCostUnit, product.profitUnit, product.taxUnit]);

  const loadIngredients = useCallback(async () => {
    setLoading(true);
    setErrorMsg('');
    const { data, error } = await supabase
      .from('producto_ingredientes')
      .select('*')
      .eq('producto_id', product.id)
      .order('fecha', { ascending: true });
    if (error) {
      setErrorMsg(error.message);
      setIngredients([]);
    } else {
      setIngredients(
        (data ?? []).map((r: Record<string, any>) => ({
          id: r?.id,
          type: r?.tipo as IngredientType,
          itemId: r?.item_id,
          quantity: Number(r?.cantidad) || 0,
          unit: r?.unidad ?? 'und',
        }))
      );
    }
    setLoading(false);
  }, [product.id]);

  useEffect(() => {
    loadIngredients();
  }, [loadIngredients]);

  const itemsOfType = useMemo(() => catalog.filter((c) => c.type === type), [catalog, type]);
  const selectedItem = useMemo(() => catalog.find((c) => c.id === itemId), [catalog, itemId]);
  const unitOptions = useMemo(
    () => (selectedItem ? getCompatibleUnits(selectedItem.unit) : []),
    [selectedItem]
  );

  const handleSelectItem = (id: string) => {
    setItemId(id);
    const item = catalog.find((c) => c.id === id);
    setUnit(item ? item.unit : '');
  };

  const handleChangeType = (t: IngredientType) => {
    setType(t);
    setItemId('');
    setUnit('');
  };

  const lineCost = useCallback(
    (ing: Ingredient): number => {
      const item = catalog.find((c) => c.id === ing.itemId);
      if (!item) return 0;
      return calcIngredientCost(item.costPerUnit, item.unit, ing.quantity, ing.unit);
    },
    [catalog]
  );

  const batchCost = useMemo(
    () => ingredients.reduce((acc, ing) => acc + lineCost(ing), 0),
    [ingredients, lineCost]
  );
  const yieldNumber = Number(yieldInput) > 0 ? Number(yieldInput) : 1;
  const variableCostUnit = batchCost / yieldNumber;

  const handleAddIngredient = async (e: React.FormEvent) => {
    e.preventDefault();
    const q = Number(qty) || 0;
    if (!itemId || !unit || q <= 0) return;
    if (!user?.email) {
      setErrorMsg('Inicia sesión para guardar ingredientes.');
      return;
    }
    setSaving(true);
    setErrorMsg('');
    const { error } = await supabase.from('producto_ingredientes').insert({
      owner_id: user.id,
      producto_id: product.id,
      usuario: user.email,
      tipo: type,
      item_id: itemId,
      cantidad: q,
      unidad: unit,
    });
    if (error) {
      setErrorMsg(error.message);
    } else {
      setItemId('');
      setQty('');
      setUnit('');
      await loadIngredients();
    }
    setSaving(false);
  };

  const handleDeleteIngredient = async (id: string) => {
    setErrorMsg('');
    const { error } = await supabase.from('producto_ingredientes').delete().eq('id', id);
    if (error) {
      setErrorMsg(error.message);
      return;
    }
    setIngredients((prev) => prev.filter((i) => i.id !== id));
  };

  const handleSaveSettings = async () => {
    setSaving(true);
    setErrorMsg('');
    const { error } = await supabase
      .from('productos_receta')
      .update({
        rendimiento: yieldNumber,
        costo_fijo_unitario: Number(fixedInput) || 0,
        ganancia_unitaria: Number(profitInput) || 0,
        impuesto_unitario: Number(taxInput) || 0,
      })
      .eq('id', product.id);
    if (error) {
      setErrorMsg(error.message);
    } else {
      onChanged();
    }
    setSaving(false);
  };

  const inputClass =
    'w-full rounded-xl bg-[#071628] border border-white/10 px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#FF8F1C]';
  const labelClass = 'block text-slate-400 text-[11px] font-bold uppercase tracking-wide mb-1';

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div>
          <label className={labelClass} htmlFor="rendimiento">Rendimiento</label>
          <input
            id="rendimiento"
            type="number"
            min="1"
            step="any"
            value={yieldInput}
            onChange={(e) => setYieldInput(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="cfu">Costos fijos / und ($)</label>
          <input
            id="cfu"
            type="number"
            min="0"
            step="0.01"
            value={fixedInput}
            onChange={(e) => setFixedInput(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="gan">Ganancias / und ($)</label>
          <input
            id="gan"
            type="number"
            min="0"
            step="0.01"
            value={profitInput}
            onChange={(e) => setProfitInput(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="impt">Impuestos / und ($)</label>
          <input
            id="impt"
            type="number"
            min="0"
            step="0.01"
            value={taxInput}
            onChange={(e) => setTaxInput(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>
      <button
        type="button"
        onClick={handleSaveSettings}
        disabled={saving}
        className="rounded-xl px-4 py-2 text-sm font-bold text-white bg-[#144979] hover:bg-[#1A5A96] border border-[#FF8F1C]/40 transition-colors disabled:opacity-60 cursor-pointer"
      >
        {saving ? 'Guardando...' : 'Guardar rendimiento y montos'}
      </button>

      <form
        onSubmit={handleAddIngredient}
        className="rounded-2xl border border-white/10 bg-[#071628]/60 p-4 space-y-3"
      >
        <p className="text-white text-sm font-extrabold">Agregar ingrediente</p>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          <select
            value={type}
            onChange={(e) => handleChangeType(e.target.value as IngredientType)}
            aria-label="Tipo de ingrediente"
            className={inputClass}
          >
            <option value="material">Material</option>
            <option value="empaque">Empaque</option>
            <option value="etiqueta">Etiqueta</option>
          </select>
          <select
            value={itemId}
            onChange={(e) => handleSelectItem(e.target.value)}
            aria-label="Ingrediente"
            className={`${inputClass} sm:col-span-2`}
            required
          >
            <option value="">
              {itemsOfType.length === 0 ? 'Sin registros' : 'Selecciona...'}
            </option>
            {itemsOfType.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({formatMoney(c.costPerUnit)} / {getUnit(c.unit).label})
              </option>
            ))}
          </select>
          <input
            type="number"
            min="0"
            step="any"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            placeholder="Cantidad"
            aria-label="Cantidad usada"
            className={inputClass}
            required
          />
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            aria-label="Unidad usada"
            className={inputClass}
            disabled={!selectedItem}
            required
          >
            {!selectedItem && <option value="">Unidad</option>}
            {unitOptions.map((u) => (
              <option key={u.value} value={u.value}>
                {u.label}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          disabled={saving || !itemId}
          className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold text-[#030C16] bg-[#FF8F1C] hover:bg-[#ffa13f] transition-colors disabled:opacity-50 cursor-pointer"
        >
          <Icon name="PlusIcon" size={16} />
          <span>Agregar a la receta</span>
        </button>
      </form>

      {errorMsg && (
        <div className="rounded-xl bg-red-500/10 border border-red-500/30 px-3 py-2 text-xs text-red-300">
          {errorMsg}
        </div>
      )}

      <ul className="rounded-2xl border border-white/10 divide-y divide-white/5 overflow-hidden">
        {loading && <li className="px-4 py-6 text-center text-sm text-slate-400">Cargando...</li>}
        {!loading && ingredients.length === 0 && (
          <li className="px-4 py-6 text-center text-sm text-slate-400">
            Esta receta aún no tiene ingredientes.
          </li>
        )}
        {!loading &&
          ingredients?.map((ing) => {
            const item = catalog.find((c) => c.id === ing.itemId);
            return (
              <li key={ing.id} className="flex items-center gap-3 px-4 py-3 bg-[#0B2540]/50">
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-bold truncate">
                    {item?.name ?? 'Ingrediente eliminado'}
                  </p>
                  <p className="text-slate-400 text-xs">
                    {TYPE_LABEL[ing.type]} · {ing.quantity} {getUnit(ing.unit).label}
                  </p>
                </div>
                <span className="text-[#FF8F1C] text-sm font-extrabold whitespace-nowrap">
                  {formatMoney(lineCost(ing))}
                </span>
                <button
                  type="button"
                  onClick={() => handleDeleteIngredient(ing.id)}
                  aria-label="Eliminar ingrediente"
                  className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-red-400 hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <Icon name="TrashIcon" size={16} />
                </button>
              </li>
            );
          })}
        <li className="flex items-center justify-between px-4 py-3 bg-[#071628]/70">
          <span className="text-slate-300 text-xs font-bold uppercase tracking-wide">
            Costo de la receta ({yieldNumber} und)
          </span>
          <span className="text-white text-sm font-black">{formatMoney(batchCost)}</span>
        </li>
      </ul>

      <PvpCard
        name={product.name}
        variableCost={variableCostUnit}
        fixedCost={Number(fixedInput) || 0}
        profit={Number(profitInput) || 0}
        tax={Number(taxInput) || 0}
      />
    </div>
  );
};

export default RecipeEditor;
