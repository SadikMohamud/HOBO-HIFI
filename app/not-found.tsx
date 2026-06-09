import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#121212] text-white">
      <h2 className="text-2xl font-bold uppercase tracking-widest mb-4">Pagina Niet Gevonden</h2>
      <p className="text-sm text-neutral-400 mb-6">De opgevraagde pagina kon niet worden gevonden.</p>
      <Link href="/" className="px-6 py-2 bg-[#D4AF37] text-black text-xs font-bold uppercase tracking-widest rounded-full hover:bg-[#c49f27] transition-all">
        Terug naar Home
      </Link>
    </div>
  );
}
