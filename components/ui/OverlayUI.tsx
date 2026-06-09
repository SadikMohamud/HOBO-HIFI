"use client";

import { useState, useEffect } from "react";
import { format, addDays, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, parseISO, startOfToday } from "date-fns";
import DisperseText from "./DisperseText";

interface OverlayUIProps {
  activeFinish: string;
  setActiveFinish: (finish: string) => void;
  activeSection: number;
}

export default function OverlayUI({
  activeFinish,
  setActiveFinish,
  activeSection,
}: OverlayUIProps) {
  // Modal states
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isAROpen, setIsAROpen] = useState(false);
  const [showARTips, setShowARTips] = useState(true);
  
  // Booking calendar states
  const [selectedDate, setSelectedDate] = useState<Date>(startOfToday());
  const [slots, setSlots] = useState<string[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [bookingStep, setBookingStep] = useState<"date" | "form" | "success">("date");
  const [bookingName, setBookingName] = useState("");
  const [bookingEmail, setBookingEmail] = useState("");
  const [bookingModel, setBookingModel] = useState("Bowers & Wilkins 801 D4");
  
  const eventTypeId = "cm00000000000000000000000";
  const today = startOfToday();
  
  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(selectedDate),
    end: endOfMonth(selectedDate),
  });

  // Fetch slots whenever the date changes
  useEffect(() => {
    if (!isBookingOpen) return;
    async function fetchSlots() {
      setBookingLoading(true);
      setBookingError(null);
      try {
        const res = await fetch(`/api/slots?date=${format(selectedDate, "yyyy-MM-dd")}&eventTypeId=${eventTypeId}`);
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setSlots(data.slots || []);
      } catch (err: any) {
        setBookingError(err.message);
      } finally {
        setBookingLoading(false);
      }
    }
    fetchSlots();
  }, [selectedDate, eventTypeId, isBookingOpen]);

  const scrollToSection = (index: number) => {
    const sectionIds = ["hero-sec", "tweeter-sec", "finish-sec", "specs-sec"];
    const element = document.getElementById(sectionIds[index]);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handlePrevSection = () => {
    const prev = Math.max(0, activeSection - 1);
    scrollToSection(prev);
  };

  const handleNextSection = () => {
    const next = Math.min(3, activeSection + 1);
    scrollToSection(next);
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot) return;

    setBookingLoading(true);
    setBookingError(null);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventTypeId,
          startTime: selectedSlot,
          attendeeName: bookingName,
          attendeeEmail: bookingEmail,
          attendeeTimeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          model: bookingModel,
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setBookingStep("success");
    } catch (err: any) {
      setBookingError(err.message);
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <>
      {/* ==========================================
          MAIN GOLDEN-BORDERED FRAME & TYPOGRAPHIC OVERLAY
          ========================================== */}
      <div className="fixed inset-0 border border-amber-500/15 m-6 md:m-8 rounded-2xl pointer-events-none z-10 flex flex-col justify-between p-6 md:p-10 select-none">
        
        {/* TOP SECTION: Header Nav */}
        <header className="flex items-center justify-between w-full pointer-events-auto">
          <div 
            onClick={() => scrollToSection(0)}
            className="text-lg md:text-xl tracking-tight font-extrabold uppercase cursor-pointer hover:opacity-80 transition-opacity text-white"
          >
            HOBO <span className="font-normal text-[#D4AF37]">hifi</span> <span className="font-light text-white/90">Den Haag</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6 text-[10px] md:text-[11px] font-bold tracking-[0.2em] uppercase text-white/90">
            <div className="flex flex-col items-center">
              <DisperseText onClick={() => scrollToSection(0)} text="3D Ervaring" className={`hover:text-[#D4AF37] transition-colors ${activeSection === 0 ? "text-[#D4AF37]" : ""}`} />
              <div className={`h-[1px] bg-[#D4AF37] transition-all duration-300 mt-1 ${activeSection === 0 ? "w-6" : "w-0"}`} />
            </div>
            <span className="text-white/20">|</span>
            <div className="flex flex-col items-center">
              <DisperseText onClick={() => scrollToSection(1)} text="Assortiment" className={`hover:text-[#D4AF37] transition-colors ${activeSection === 1 ? "text-[#D4AF37]" : ""}`} />
              <div className={`h-[1px] bg-[#D4AF37] transition-all duration-300 mt-1 ${activeSection === 1 ? "w-6" : "w-0"}`} />
            </div>
            <span className="text-white/20">|</span>
            <div className="flex flex-col items-center">
              <DisperseText onClick={() => scrollToSection(2)} text="Luisterafspraak" className={`hover:text-[#D4AF37] transition-colors ${activeSection === 2 ? "text-[#D4AF37]" : ""}`} />
              <div className={`h-[1px] bg-[#D4AF37] transition-all duration-300 mt-1 ${activeSection === 2 ? "w-6" : "w-0"}`} />
            </div>
            <span className="text-white/20">|</span>
            <div className="flex flex-col items-center">
              <DisperseText onClick={() => scrollToSection(3)} text="Contact" className={`hover:text-[#D4AF37] transition-colors ${activeSection === 3 ? "text-[#D4AF37]" : ""}`} />
              <div className={`h-[1px] bg-[#D4AF37] transition-all duration-300 mt-1 ${activeSection === 3 ? "w-6" : "w-0"}`} />
            </div>
          </nav>
        </header>

        {/* MIDDLE SECTION: Right Floating Pill-Shaped Control Panel */}
        <div className="absolute right-8 top-[40%] -translate-y-1/2 flex flex-col space-y-3 pointer-events-auto z-15">
          <button 
            onClick={() => setIsAROpen(true)}
            className="w-48 py-2.5 rounded-full text-[10px] font-bold tracking-widest uppercase bg-[#d4af37]/10 hover:bg-[#d4af37]/25 border border-[#d4af37]/30 text-white transition-all cursor-pointer text-center"
          >
            Bekijk in AR
          </button>
          <button 
            onClick={() => setIsBookingOpen(true)}
            className="w-48 py-2.5 rounded-full text-[10px] font-bold tracking-widest uppercase bg-[#d4af37]/10 hover:bg-[#d4af37]/25 border border-[#d4af37]/30 text-white transition-all cursor-pointer text-center"
          >
            Boek Luisterafspraak
          </button>
          <button 
            onClick={() => scrollToSection(3)}
            className="w-48 py-2.5 rounded-full text-[10px] font-bold tracking-widest uppercase bg-[#d4af37]/10 hover:bg-[#d4af37]/25 border border-[#d4af37]/30 text-white transition-all cursor-pointer text-center"
          >
            Virtuele Tour
          </button>
        </div>

        {/* MIDDLE-TOP RIGHT: Floating McIntosh info card */}
        {(activeSection === 0 || activeSection === 3) && (
          <div className="absolute right-8 top-[16%] max-w-[240px] p-5 bg-black/30 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl text-left pointer-events-auto transition-all duration-300">
            <div className="font-gothic text-3xl text-amber-500 font-normal tracking-wide mb-1 leading-none select-none">
              McIntosh
            </div>
            <p className="text-[10px] text-neutral-300 font-light leading-relaxed">
              Mcintosh amplifier chassis binder slides dynamically based on the user's focus.
            </p>
            <div className="h-[1px] bg-[#D4AF37]/30 mt-2" />
          </div>
        )}

        {/* BOTTOM SECTION: Left Title & Chevrons, Center Spacer, Right Info Cards */}
        <div className="grid grid-cols-12 gap-6 items-end w-full relative pointer-events-none">
          
          {/* Bottom Left: Title Block & Navigation Chevrons */}
          <div className="col-span-12 md:col-span-6 flex flex-col space-y-4 pointer-events-auto text-left">
            <div className="space-y-2">
              <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight text-white leading-none">
                ERVAAR HOGE FIDELITEIT.<br />IN DRIE DIMENSIES.
              </h2>
              <p className="text-[11px] md:text-xs text-neutral-300 font-light tracking-wide max-w-md leading-relaxed">
                Ontdek de perfecte klank, interactief gevisualiseerd voor uw ruimte.
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <button 
                onClick={handlePrevSection}
                disabled={activeSection === 0}
                className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                  activeSection === 0 
                    ? "border-white/5 text-neutral-700 cursor-not-allowed" 
                    : "border-[#D4AF37]/45 text-[#D4AF37] hover:border-[#D4AF37] hover:bg-white/5"
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                onClick={handleNextSection}
                disabled={activeSection === 3}
                className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                  activeSection === 3 
                    ? "border-white/5 text-neutral-700 cursor-not-allowed" 
                    : "border-[#D4AF37]/45 text-[#D4AF37] hover:border-[#D4AF37] hover:bg-white/5"
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Bottom Center: Action buttons (seated safely above lower frame border) */}
          <div className="col-span-12 md:col-span-3 flex justify-center items-center pb-2 pointer-events-auto">
            <div className="flex flex-col gap-2 w-full max-w-[200px]">
              <button 
                onClick={() => setIsBookingOpen(true)}
                className="w-full py-2.5 rounded-full text-[10px] font-extrabold tracking-widest uppercase bg-[#D4AF37] text-[#121212] hover:bg-[#c49f27] hover:scale-[1.02] transition-all cursor-pointer shadow-lg text-center"
              >
                Boek Luisterafspraak
              </button>
            </div>
          </div>

          {/* Bottom Right: Floating Info Cards */}
          <div className="col-span-12 md:col-span-3 flex flex-col space-y-3 pointer-events-auto items-end">
            {/* Bowers & Wilkins Card */}
            <div className={`w-full max-w-[240px] p-5 border rounded-xl bg-black/30 backdrop-blur-xl shadow-2xl text-left transition-all duration-300 ${
              activeSection === 0 || activeSection === 1 || activeSection === 3
                ? "border-white/10 opacity-100 translate-x-0" 
                : "border-white/5 opacity-0 translate-x-4 pointer-events-none"
            }`}>
              <div className="text-[11px] uppercase font-extrabold tracking-widest mb-1 text-white border-b border-white/10 pb-1">
                Bowers & Wilkins
              </div>
              <p className="text-[10px] text-neutral-300 font-light leading-relaxed">
                The Bowers & Wilkins informational slider provides detailed specifications, adapting dynamically based on user focus.
              </p>
              <div className="h-[1px] bg-[#D4AF37]/30 mt-2" />
            </div>

            {/* McIntosh Card */}
            <div className={`w-full max-w-[240px] p-5 border rounded-xl bg-black/30 backdrop-blur-xl shadow-2xl text-left transition-all duration-300 ${
              activeSection === 0 || activeSection === 3
                ? "border-white/10 opacity-100 translate-x-0" 
                : "border-white/5 opacity-0 translate-x-4 pointer-events-none"
            }`}>
              <div className="font-gothic text-3xl text-amber-500 font-normal tracking-wide mb-1 leading-none select-none">
                McIntosh
              </div>
              <p className="text-[10px] text-neutral-300 font-light leading-relaxed">
                Mcintosh amplifier chassis binder slides dynamically based on the user's focus.
              </p>
              <div className="h-[1px] bg-[#D4AF37]/30 mt-2" />
            </div>
          </div>

        </div>

        {/* Bottom Right Sparkle Icon overlaying the border */}
        <div className="absolute -bottom-4 -right-4 z-20 pointer-events-auto">
          <svg className="w-8 h-8 text-[#D4AF37]/80 animate-spin-slow hover:text-[#D4AF37] transition-colors cursor-pointer" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z" />
          </svg>
        </div>

      </div>

      {/* ==========================================
          MODALS & FLOATING OVERLAYS (Interactive)
          ========================================== */}
      
      {/* LUISTERAFSPRAAK BOOKING MODAL (Redesigned Calendar Engine) */}
      {isBookingOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4 md:p-6 bg-black/85 backdrop-blur-lg">
          <div className="w-full max-w-4xl p-6 md:p-8 bg-[#121212] border border-[#D4AF37]/35 rounded-[32px] relative shadow-2xl overflow-y-auto max-h-[90vh]">
            <button 
              onClick={() => {
                setIsBookingOpen(false);
                setBookingStep("date");
                setSelectedSlot(null);
                setBookingError(null);
              }}
              className="absolute top-6 right-6 text-neutral-400 hover:text-white text-lg font-bold cursor-pointer transition-colors z-50"
            >
              ✕
            </button>

            {bookingStep === "success" ? (
              <div className="text-center py-16 space-y-4">
                <div className="text-[#D4AF37] text-5xl animate-bounce">✦</div>
                <h3 className="text-xl font-bold uppercase tracking-widest text-white">AFSPRAAK INGEDIEND</h3>
                <p className="text-xs text-neutral-300 font-light leading-relaxed max-w-md mx-auto">
                  Bedankt. Uw exclusieve luistersessie met de <span className="text-[#D4AF37] font-bold">{bookingModel}</span> ({activeFinish.replace("-", " ")}) is gereserveerd voor <span className="text-[#D4AF37] font-bold">{format(parseISO(selectedSlot!), "PPPP 'om' HH:mm")}</span>.
                </p>
                <p className="text-[11px] text-neutral-500 font-light">
                  Een bevestigingsmail is verzonden naar <span className="text-white">{bookingEmail}</span>. Onze adviseur in Den Haag neemt spoedig contact met u op.
                </p>
                <button
                  onClick={() => {
                    setIsBookingOpen(false);
                    setBookingStep("date");
                    setSelectedSlot(null);
                  }}
                  className="mt-6 px-6 py-2.5 bg-[#D4AF37] text-[#121212] rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#c49f27] cursor-pointer"
                >
                  Sluiten
                </button>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row min-h-[420px] gap-8 mt-4">
                
                {/* Left Panel: Info & Calendar */}
                <div className="md:w-1/2 flex flex-col justify-between text-left">
                  <div>
                    <h3 className="text-[9px] uppercase tracking-widest text-[#D4AF37] font-bold mb-1">Boek een Datum</h3>
                    <h4 className="text-lg font-bold text-white uppercase tracking-wider mb-6">Luistersessie Kalender</h4>
                    
                    {/* Calendar Navigation */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-bold text-xs text-white uppercase tracking-widest">{format(selectedDate, "MMMM yyyy")}</span>
                      <div className="flex gap-2 pointer-events-auto">
                        <button 
                          onClick={() => setSelectedDate(addDays(selectedDate, -30))} 
                          className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all cursor-pointer"
                        >
                          &larr;
                        </button>
                        <button 
                          onClick={() => setSelectedDate(addDays(selectedDate, 30))} 
                          className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all cursor-pointer"
                        >
                          &rarr;
                        </button>
                      </div>
                    </div>
                    
                    {/* Days of Week */}
                    <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-neutral-500 mb-2 uppercase tracking-wider">
                      <span>ZO</span><span>MA</span><span>DI</span><span>WO</span><span>DO</span><span>VR</span><span>ZA</span>
                    </div>
                    
                    {/* Days Grid */}
                    <div className="grid grid-cols-7 gap-1 pointer-events-auto">
                      {/* Placeholder elements for calendar alignment */}
                      {Array.from({ length: daysInMonth[0].getDay() }).map((_, i) => (
                        <div key={`empty-${i}`} />
                      ))}
                      {daysInMonth.map((day) => (
                        <button
                          key={day.toISOString()}
                          disabled={day < today}
                          onClick={() => { setSelectedDate(day); setBookingStep("date"); setSelectedSlot(null); }}
                          className={`h-9 w-9 flex items-center justify-center rounded-full text-xs font-bold transition-all cursor-pointer
                            ${isSameDay(day, selectedDate) ? "bg-[#D4AF37] text-[#121212] shadow-lg shadow-[#D4AF37]/20" : "text-white/80 hover:bg-white/5"}
                            ${day < today ? "opacity-20 cursor-not-allowed pointer-events-none" : ""}
                          `}
                        >
                          {format(day, "d")}
                        </button>
                      ))}
                    </div>
                  </div>

                  <p className="text-[9px] text-neutral-500 mt-6 md:mt-0 tracking-widest uppercase">
                    Tijdzone: <span className="text-[#D4AF37] font-semibold">{Intl.DateTimeFormat().resolvedOptions().timeZone}</span>
                  </p>
                </div>

                {/* Divider for desktop */}
                <div className="hidden md:block w-[1px] bg-white/10 self-stretch" />

                {/* Right Panel: Slots or Form */}
                <div className="md:w-1/2 flex flex-col justify-start">
                  {bookingStep === "date" ? (
                    <div className="text-left">
                      <h5 className="text-[11px] uppercase font-bold tracking-widest text-white mb-4">
                        Beschikbare Uren op {format(selectedDate, "EEEE d MMMM")}
                      </h5>
                      
                      {bookingLoading ? (
                        <div className="flex items-center justify-center h-48 flex-grow">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#D4AF37]"></div>
                        </div>
                      ) : bookingError ? (
                        <div className="p-4 bg-red-950/60 border border-red-500/35 text-red-400 text-xs rounded-xl">{bookingError}</div>
                      ) : slots.length > 0 ? (
                        <div className="grid grid-cols-2 gap-2 overflow-y-auto max-h-[300px] pr-2 pointer-events-auto">
                          {slots.map((slot) => (
                            <button
                              key={slot}
                              onClick={() => { setSelectedSlot(slot); setBookingStep("form"); }}
                              className="py-2.5 px-4 bg-[#1e1e1e] border border-white/10 rounded-full text-white text-xs font-bold tracking-wider hover:border-[#D4AF37] hover:bg-white/5 transition-all text-center cursor-pointer"
                            >
                              {format(parseISO(slot), "HH:mm")}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12 text-neutral-500 text-xs border border-white/5 rounded-2xl flex-grow flex items-center justify-center">
                          Geen tijdstippen beschikbaar voor deze datum.
                        </div>
                      )}
                    </div>
                  ) : (
                    <form onSubmit={handleBookingSubmit} className="space-y-4 text-left pointer-events-auto">
                      <button 
                        type="button"
                        onClick={() => setBookingStep("date")} 
                        className="text-[10px] font-bold text-neutral-400 hover:text-white uppercase tracking-widest mb-4 flex items-center gap-1 cursor-pointer"
                      >
                        &larr; Terug naar uren
                      </button>
                      <h5 className="text-xs uppercase font-extrabold tracking-wider text-[#D4AF37]">Details Bevestigen</h5>
                      <p className="text-xs text-white/90 font-light border-b border-white/10 pb-2 mb-2">
                        {format(parseISO(selectedSlot!), "PPPP 'om' HH:mm")}
                      </p>

                      <div className="space-y-3">
                        <div>
                          <label className="block text-[9px] uppercase tracking-widest text-neutral-500 font-bold mb-1">Volledige Naam</label>
                          <input
                            required
                            type="text"
                            value={bookingName}
                            onChange={(e) => setBookingName(e.target.value)}
                            placeholder="bijv. Jan de Vries"
                            className="w-full px-4 py-2 text-xs bg-neutral-900 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#D4AF37] placeholder-neutral-600 font-light"
                          />
                        </div>

                        <div>
                          <label className="block text-[9px] uppercase tracking-widest text-neutral-500 font-bold mb-1">E-mailadres</label>
                          <input
                            required
                            type="email"
                            value={bookingEmail}
                            onChange={(e) => setBookingEmail(e.target.value)}
                            placeholder="jan@domein.nl"
                            className="w-full px-4 py-2 text-xs bg-neutral-900 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#D4AF37] placeholder-neutral-600 font-light"
                          />
                        </div>

                        <div>
                          <label className="block text-[9px] uppercase tracking-widest text-neutral-500 font-bold mb-1">Luidsprekermodel</label>
                          <select
                            value={bookingModel}
                            onChange={(e) => setBookingModel(e.target.value)}
                            className="w-full px-4 py-2 text-xs bg-[#121212] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#D4AF37]"
                          >
                            <option>Bowers & Wilkins 801 D4</option>
                            <option>Bowers & Wilkins 802 D4</option>
                            <option>Bowers & Wilkins 803 D4</option>
                            <option>Bowers & Wilkins 805 D4 (Standmount)</option>
                          </select>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={bookingLoading}
                        className="w-full py-3 bg-[#D4AF37] text-[#121212] rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#c49f27] hover:scale-[1.02] transition-all disabled:opacity-50 mt-4 cursor-pointer"
                      >
                        {bookingLoading ? "Reserveren..." : "Bevestig Afspraak"}
                      </button>
                      
                      {bookingError && <p className="text-[10px] text-red-400 mt-2">{bookingError}</p>}
                    </form>
                  )}
                </div>

              </div>
            )}
          </div>
        </div>
      )}

      {/* AR SCANNER SIMULATOR VIEW */}
      {isAROpen && (
        <div className="fixed inset-0 z-40 flex flex-col justify-between bg-[#0e0e0e] p-8 md:p-12">
          
          {/* AR Header */}
          <div className="flex justify-between items-center w-full">
            <div>
              <h3 className="text-xs uppercase font-extrabold tracking-widest text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
                Augmented Reality Engine
              </h3>
              <p className="text-[10px] uppercase tracking-widest text-neutral-500 mt-1">Live Ruimtelijke Projectie</p>
            </div>
            <button 
              onClick={() => setIsAROpen(false)}
              className="px-4 py-2 border border-white/10 rounded-full text-[10px] uppercase font-bold text-neutral-400 hover:text-white hover:border-white/30 transition-all cursor-pointer"
            >
              ✕ Annuleren
            </button>
          </div>

          {/* Scanner frame */}
          <div className="flex-grow flex flex-col items-center justify-center space-y-6 relative my-8 border border-dashed border-white/10 rounded-2xl overflow-hidden">
            {/* Ambient noise lines */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_6px] pointer-events-none opacity-20" />
            
            {showARTips ? (
              <div className="z-10 bg-black/85 p-6 border border-[#D4AF37]/35 rounded-2xl max-w-sm text-center space-y-4 shadow-2xl">
                <div className="text-[#D4AF37] text-2xl">✦</div>
                <h4 className="text-xs uppercase font-extrabold tracking-widest text-white">Kalibreer uw camera</h4>
                <p className="text-[11px] text-neutral-400 font-light leading-relaxed">
                  Plaats de B&W speaker virtueel in uw kamer. Voor optimale weergave richt u de camera op een goed verlichte vloer.
                </p>
                <button
                  onClick={() => setShowARTips(false)}
                  className="px-6 py-2.5 bg-[#D4AF37] text-black text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-[#c49f27] cursor-pointer"
                >
                  Start Scan
                </button>
              </div>
            ) : (
              <div className="w-72 h-72 border border-[#D4AF37]/50 rounded-2xl relative flex items-center justify-center">
                {/* Corner crosshairs */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#D4AF37] rounded-tl-xl" />
                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#D4AF37] rounded-tr-xl" />
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#D4AF37] rounded-bl-xl" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#D4AF37] rounded-br-xl" />
                
                {/* Scanner line animation */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-[#D4AF37] shadow-[0_0_10px_#D4AF37] animate-[bounce_3s_infinite]" />
                
                <span className="text-[10px] tracking-widest text-[#D4AF37] font-bold uppercase animate-pulse">
                  ZOEKEN NAAR VLAKKE GROND...
                </span>
              </div>
            )}
          </div>

          {/* AR Bottom Actions */}
          <div className="flex flex-col sm:flex-row justify-between items-center w-full gap-4 text-left border-t border-white/10 pt-6">
            <div>
              <span className="text-[10px] tracking-widest uppercase text-neutral-500 font-bold block mb-1">Gekozen Systeem</span>
              <span className="text-xs uppercase font-bold text-white">Bowers & Wilkins 801 D4 ({activeFinish})</span>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => {
                  alert("Virtual reality QR-code gegenereerd. Scan deze met uw mobiele camera.");
                  setIsAROpen(false);
                }}
                className="px-6 py-3 border border-white/20 rounded-full text-white text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all cursor-pointer"
              >
                QR Code Weergeven
              </button>
              <button 
                onClick={() => setShowARTips(true)}
                className="px-6 py-3 border border-white/20 rounded-full text-neutral-400 text-xs font-bold uppercase tracking-widest hover:text-white transition-all cursor-pointer"
              >
                Herstart Gids
              </button>
            </div>
          </div>

        </div>
      )}
    </>
  );
}
