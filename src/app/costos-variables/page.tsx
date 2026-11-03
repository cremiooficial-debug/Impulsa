'use client';

import React from 'react';
import CostosShell from './components/CostosShell';
import CostList from './components/CostList';

export default function CostosVariablesPage() {
  return (
    <CostosShell
      title="Costos"
      highlight="Variables"
      subtitle="Gestiona tus materiales, empaques y etiquetas."
    >
      {({ usuario, dependencia }) => (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <CostList
            title="Lista de materiales"
            table="materiales"
            nameColumn="material"
            costColumn="costo_unitario"
            hasUnit
            namePlaceholder="Nombre del material"
            emptyText="Aún no tienes materiales registrados."
            usuario={usuario}
            dependencia={dependencia}
          />
          <CostList
            title="Lista de Empaques"
            table="empaques"
            nameColumn="empaque"
            costColumn="costo"
            hasUnit
            namePlaceholder="Nombre del empaque"
            emptyText="Aún no tienes empaques registrados."
            usuario={usuario}
            dependencia={dependencia}
          />
          <CostList
            title="Lista de Etiquetas"
            table="etiquetas"
            nameColumn="etiqueta"
            costColumn="costo"
            hasUnit
            namePlaceholder="Nombre de la etiqueta"
            emptyText="Aún no tienes etiquetas registradas."
            usuario={usuario}
            dependencia={dependencia}
          />
        </div>
      )}
    </CostosShell>
  );
}
