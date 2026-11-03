'use client';

import React from 'react';
import CostosShell from '@/app/costos-variables/components/CostosShell';
import FixedCostList from './components/FixedCostList';

export default function CostosFijosPage() {
  return (
    <CostosShell
      title="Costos"
      highlight="Fijos"
      subtitle="Organiza el personal, los equipos y los servicios que pagas cada mes."
    >
      {({ usuario, dependencia }) => (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <FixedCostList
            title="Personal"
            table="costos_fijos_personal"
            kind="personal"
            emptyText="Aún no tienes personal registrado."
            usuario={usuario}
            dependencia={dependencia}
          />
          <FixedCostList
            title="Equipos"
            table="costos_fijos_equipos"
            kind="equipos"
            emptyText="Aún no tienes equipos registrados."
            usuario={usuario}
            dependencia={dependencia}
          />
          <FixedCostList
            title="Servicios"
            table="costos_fijos_servicios"
            kind="servicios"
            emptyText="Aún no tienes servicios registrados."
            usuario={usuario}
            dependencia={dependencia}
          />
        </div>
      )}
    </CostosShell>
  );
}
