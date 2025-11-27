// File: /components/BalanceCairan.tsx (lengkap sesuai catatan)
"use client";
import React, { useMemo, useState } from 'react';

export type LineInput = { nama: string; jumlah: string; total?: string };

export default function BalanceCairan() {
  const [lines, setLines] = useState<LineInput[]>([
    { nama: 'Normal Saline', jumlah: '500 cc', total: '500 cc' },
    { nama: '', jumlah: '', total: '' },
    { nama: '', jumlah: '', total: '' },
  ]);

  const [enteral, setEnteral] = useState<LineInput[]>([
    { nama: '', jumlah: '', total: '' },
    { nama: '', jumlah: '', total: '' },
    { nama: '', jumlah: '', total: '' },
  ]);

  const [outputs, setOutputs] = useState({ ngt: '', urine: '450 cc', bab: '', drain: '' });

  const parseCc = (s: string) => {
    if (!s) return 0;
    const m = s.toString().match(/(\d+)/);
    return m ? parseInt(m[1], 10) : 0;
  };

  const totalMasuk = useMemo(() => lines.reduce((acc, l) => acc + parseCc(l.jumlah), 0) + enteral.reduce((acc, l) => acc + parseCc(l.jumlah), 0), [lines, enteral]);
  const totalKeluar = useMemo(() => parseCc(outputs.ngt) + parseCc(outputs.urine) + parseCc(outputs.bab) + parseCc(outputs.drain), [outputs]);

  const iwl = 0; // placeholder, could be computed or input elsewhere
  const balance = totalMasuk - (totalKeluar + iwl);

  return (
    <div className="bg-white rounded-lg shadow p-4 space-y-4">
      <h3 className="text-lg font-semibold">Balance Cairan (lengkap)</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="font-medium mb-2">Line / Infus (3)</h4>
          {lines.map((l, i) => (
            <div key={i} className="flex gap-2 items-center mb-2">
              <input value={l.nama} onChange={(e) => setLines((s) => s.map((x, idx) => idx === i ? { ...x, nama: e.target.value } : x))} placeholder="Nama Cairan" className="flex-1 p-2 border rounded" />
              <input value={l.jumlah} onChange={(e) => setLines((s) => s.map((x, idx) => idx === i ? { ...x, jumlah: e.target.value } : x))} placeholder="100 cc" className="w-32 p-2 border rounded" />
              <input value={l.total} onChange={(e) => setLines((s) => s.map((x, idx) => idx === i ? { ...x, total: e.target.value } : x))} placeholder="Total (opsional)" className="w-32 p-2 border rounded" />
            </div>
          ))}
        </div>

        <div>
          <h4 className="font-medium mb-2">Enteral (3)</h4>
          {enteral.map((l, i) => (
            <div key={i} className="flex gap-2 items-center mb-2">
              <input value={l.nama} onChange={(e) => setEnteral((s) => s.map((x, idx) => idx === i ? { ...x, nama: e.target.value } : x))} placeholder="Nama Cairan" className="flex-1 p-2 border rounded" />
              <input value={l.jumlah} onChange={(e) => setEnteral((s) => s.map((x, idx) => idx === i ? { ...x, jumlah: e.target.value } : x))} placeholder="100 cc" className="w-32 p-2 border rounded" />
              <input value={l.total} onChange={(e) => setEnteral((s) => s.map((x, idx) => idx === i ? { ...x, total: e.target.value } : x))} placeholder="Total (opsional)" className="w-32 p-2 border rounded" />
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="font-medium">Output / Keluar</h4>
          <div className="flex gap-2 mb-2">
            <input value={outputs.ngt} onChange={(e) => setOutputs((s) => ({ ...s, ngt: e.target.value }))} placeholder="NGT (cc)" className="flex-1 p-2 border rounded" />
            <input value={outputs.urine} onChange={(e) => setOutputs((s) => ({ ...s, urine: e.target.value }))} placeholder="Urine (cc)" className="w-40 p-2 border rounded" />
          </div>
          <div className="flex gap-2">
            <input value={outputs.bab} onChange={(e) => setOutputs((s) => ({ ...s, bab: e.target.value }))} placeholder="BAB (cc)" className="flex-1 p-2 border rounded" />
            <input value={outputs.drain} onChange={(e) => setOutputs((s) => ({ ...s, drain: e.target.value }))} placeholder="Drain (cc)" className="w-40 p-2 border rounded" />
          </div>
        </div>

        <div>
          <h4 className="font-medium">Rekap</h4>
          <div className="space-y-2">
            <div className="flex justify-between"><span>Total Masuk</span><strong>{totalMasuk} cc</strong></div>
            <div className="flex justify-between"><span>Total Keluar</span><strong>{totalKeluar} cc</strong></div>
            <div className="flex justify-between"><span>IWL (placeholder)</span><strong>{iwl} cc</strong></div>
            <div className="flex justify-between"><span>Balance</span><strong>{balance} cc</strong></div>
          </div>
        </div>
      </div>

    </div>
  );
}