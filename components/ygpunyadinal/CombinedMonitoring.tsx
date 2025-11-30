// File: /pages/combined-monitoring.tsx
"use client";
import React, { useState } from 'react';
import BalanceCairan from './BalanceCairan';

export default function CombinedMonitoring() {
  // Respirasi
  const [resp, setResp] = useState({
    spo2: '',
    tipeVent: '',
    peep: '',
    rr: '',
    tv: '',
    fio2: '',
    sputum1: '',
    sputum2: '',
  });

  // Neuro
  const [neuro, setNeuro] = useState({
    pupilR: '',
    pupilL: '',
    pupilRRespon: '+',
    pupilLRespon: '+',
    tanganRespon: '+',
    kakiRespon: '+',
    gcsE: '',
    gcsV: '',
    gcsM: '',
    vMode: 'Non ETT',
  });

  // Masalah & Tindakan
  const [masalah, setMasalah] = useState('');
  const [tindakan, setTindakan] = useState('');

  return (
    <div className="p-6 space-y-6">
      <div className="bg-white rounded shadow p-4">
        <h2 className="text-lg font-semibold">Respirasi</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
          <div>
            <label className="text-xs">SaO2 / SpO2 (%)</label>
            <input value={resp.spo2} onChange={(e) => setResp({ ...resp, spo2: e.target.value })} placeholder="95%" className="w-full p-2 border rounded" />
          </div>

          <div>
            <label className="text-xs">Tipe Vent</label>
            <input value={resp.tipeVent} onChange={(e) => setResp({ ...resp, tipeVent: e.target.value })} placeholder="SIM - v" className="w-full p-2 border rounded" />
          </div>

          <div>
            <label className="text-xs">PEEP / CPAP (6-10)</label>
            <input value={resp.peep} onChange={(e) => setResp({ ...resp, peep: e.target.value })} placeholder="6" className="w-full p-2 border rounded" />
          </div>

          <div>
            <label className="text-xs">RR (10-30)</label>
            <input value={resp.rr} onChange={(e) => setResp({ ...resp, rr: e.target.value })} placeholder="16" className="w-full p-2 border rounded" />
          </div>

          <div>
            <label className="text-xs">Tidal Volume (T.V.)</label>
            <input value={resp.tv} onChange={(e) => setResp({ ...resp, tv: e.target.value })} placeholder="ml" className="w-full p-2 border rounded" />
          </div>

          <div>
            <label className="text-xs">FiO2 (%)</label>
            <input value={resp.fio2} onChange={(e) => setResp({ ...resp, fio2: e.target.value })} placeholder="40%" className="w-full p-2 border rounded" />
          </div>

          <div className="md:col-span-2">
            <label className="text-xs">Sputum / Vol (opsional)</label>
            <div className="flex gap-2 mt-1">
              <input value={resp.sputum1} onChange={(e) => setResp({ ...resp, sputum1: e.target.value })} placeholder="Sputum A" className="flex-1 p-2 border rounded" />
              <input value={resp.sputum2} onChange={(e) => setResp({ ...resp, sputum2: e.target.value })} placeholder="Volume (cc)" className="w-40 p-2 border rounded" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded shadow p-4">
        <h2 className="text-lg font-semibold">Neuro</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
          <div>
            <label className="text-xs">Pupil R (ukuran)</label>
            <input value={neuro.pupilR} onChange={(e) => setNeuro({ ...neuro, pupilR: e.target.value })} className="w-full p-2 border rounded" />
            <div className="mt-2">
              <label className="text-xs mr-2">Respon</label>
              <label className="mr-2"><input type="radio" checked={neuro.pupilRRespon === '+'} onChange={() => setNeuro({ ...neuro, pupilRRespon: '+' })} /> +</label>
              <label><input type="radio" checked={neuro.pupilRRespon === '-'} onChange={() => setNeuro({ ...neuro, pupilRRespon: '-' })} /> -</label>
            </div>
          </div>

          <div>
            <label className="text-xs">Pupil L (ukuran)</label>
            <input value={neuro.pupilL} onChange={(e) => setNeuro({ ...neuro, pupilL: e.target.value })} className="w-full p-2 border rounded" />
            <div className="mt-2">
              <label className="text-xs mr-2">Respon</label>
              <label className="mr-2"><input type="radio" checked={neuro.pupilLRespon === '+'} onChange={() => setNeuro({ ...neuro, pupilLRespon: '+' })} /> +</label>
              <label><input type="radio" checked={neuro.pupilLRespon === '-'} onChange={() => setNeuro({ ...neuro, pupilLRespon: '-' })} /> -</label>
            </div>
          </div>

          <div>
            <label className="text-xs">Tangan Respon</label>
            <div className="mt-2">
              <label className="mr-2"><input type="radio" checked={neuro.tanganRespon === '+'} onChange={() => setNeuro({ ...neuro, tanganRespon: '+' })} /> +</label>
              <label><input type="radio" checked={neuro.tanganRespon === '-'} onChange={() => setNeuro({ ...neuro, tanganRespon: '-' })} /> -</label>
            </div>

            <div className="mt-3">
              <label className="text-xs">Kaki Respon</label>
              <div className="mt-2">
                <label className="mr-2"><input type="radio" checked={neuro.kakiRespon === '+'} onChange={() => setNeuro({ ...neuro, kakiRespon: '+' })} /> +</label>
                <label><input type="radio" checked={neuro.kakiRespon === '-'} onChange={() => setNeuro({ ...neuro, kakiRespon: '-' })} /> -</label>
              </div>
            </div>
          </div>

          <div className="md:col-span-3 grid grid-cols-3 gap-2 mt-2">
            <div>
              <label className="text-xs">GCS - E</label>
              <input value={neuro.gcsE} onChange={(e) => setNeuro({ ...neuro, gcsE: e.target.value })} className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="text-xs">GCS - V</label>
              <input value={neuro.gcsV} onChange={(e) => setNeuro({ ...neuro, gcsV: e.target.value })} className="w-full p-2 border rounded" />
              <div className="mt-2">
                <label className="text-xs">Mode V</label>
                <select value={neuro.vMode} onChange={(e) => setNeuro({ ...neuro, vMode: e.target.value })} className="w-full p-2 border rounded mt-1">
                  <option>Non ETT</option>
                  <option>ETT</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-xs">GCS - M</label>
              <input value={neuro.gcsM} onChange={(e) => setNeuro({ ...neuro, gcsM: e.target.value })} className="w-full p-2 border rounded" />
            </div>
          </div>
        </div>
      </div>

      <BalanceCairan />

      <div className="bg-white rounded shadow p-4">
        <h2 className="text-lg font-semibold">Keluar (Ringkasan)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
          <div>
            <label className="text-xs">NGT (cc)</label>
            <input className="w-full p-2 border rounded" placeholder="" />
          </div>
          <div>
            <label className="text-xs">Urine (cc)</label>
            <input className="w-full p-2 border rounded" placeholder="" />
          </div>
          <div>
            <label className="text-xs">BAB (cc)</label>
            <input className="w-full p-2 border rounded" placeholder="" />
          </div>
          <div>
            <label className="text-xs">Drain (cc)</label>
            <input className="w-full p-2 border rounded" placeholder="" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded shadow p-4">
        <h2 className="text-lg font-semibold">Masalah</h2>
        <textarea value={masalah} onChange={(e) => setMasalah(e.target.value)} className="w-full p-3 border rounded" rows={4} />
      </div>

      <div className="bg-white rounded shadow p-4">
        <h2 className="text-lg font-semibold">Tindakan & Obat</h2>
        <textarea value={tindakan} onChange={(e) => setTindakan(e.target.value)} className="w-full p-3 border rounded" rows={6} placeholder="Jam | Nama Obat | Dosis | Cara Pemberian | Tgl Mulai | Tgl Stop | Ket" />
      </div>

      <div className="flex justify-end gap-3">
        <button className="px-4 py-2 bg-blue-600 text-white rounded">Simpan Semua</button>
      </div>
    </div>
  );
}
