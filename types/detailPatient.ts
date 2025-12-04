export interface DetailPasienProps {
noRm?: string;
tanggal?: string;
hariPerawatanKe?: number;
onSaved?: () => void;
}


export interface DetailEntry {
id: string;
jam: string;
sao2: string;
tipeVent: string;
peep: string;
rr: string;
tv: string;
fio2: string;
sputumVol?: string;
mataR: string;
mataL: string;
mataRespon: string;
kakiRespon: string;
tanganRespon: string;
gcsE: string;
gcsM: string;
gcsV: string;
gcsVType: string;
lineNama: string;
lineJumlah: string;
lineTotal?: string;
enteralNama: string;
enteralJumlah: string;
enteralTotal?: string;
masukTotal: string;
ngt: string;
urine: string;
bab: string;
drain: string;
keluarTotal: string;
masalah: string;
tindakanObat: string;
}