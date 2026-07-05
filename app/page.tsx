export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <section className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">
          Monitoring Dashboard
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl">
          Deploy Ready Next.js App
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
          Halaman utama sudah tersedia, sehingga project memiliki root route
          yang aman untuk proses build dan deploy di Vercel.
        </p>
      </section>
    </main>
  );
}
