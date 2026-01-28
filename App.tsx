
import React, { useState } from 'react';
import { ShoppingCart, Gamepad, Sparkles, Image as ImageIcon, Copy, Download, Share2, AlertCircle, CarFront, Zap } from 'lucide-react';
import { Niche, BannerConfig, GeneratedBanner, BannerType, Format } from './types';
import { STORE_TYPES, GAMER_TYPES, LUXURY_TYPES, FORMATS } from './constants';
import { NicheSelector } from './components/NicheSelector';
import { Button } from './components/Button';
import { geminiService } from './services/geminiService';

const App: React.FC = () => {
  const [config, setConfig] = useState<BannerConfig>({
    niche: 'store',
    type: 'flash_promo',
    format: 'instagram_feed',
    mainText: '',
    brandName: '',
    accentColor: '#3b82f6'
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GeneratedBanner | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleNicheChange = (niche: Niche) => {
    let type: BannerType = 'flash_promo';
    let accent = '#3b82f6';
    
    if (niche === 'gamer') {
      type = 'channel';
      accent = '#d946ef';
    } else if (niche === 'luxury_cars') {
      type = 'car_sale';
      accent = '#f59e0b';
    }

    setConfig(prev => ({ ...prev, niche, type, accentColor: accent }));
    setResult(null);
  };

  const generateBanner = async () => {
    if (!config.brandName || !config.mainText) {
      setError("Por favor, preencha a Marca/Modelo e o Texto do Banner para um resultado profissional.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const banner = await geminiService.generateBanner(config);
      setResult(banner);
    } catch (err: any) {
      setError("Ocorreu um erro ao gerar o banner. Tente novamente mais tarde.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copiado com sucesso!");
  };

  const downloadImage = () => {
    if (!result) return;
    const link = document.createElement('a');
    link.href = result.imageUrl;
    link.download = `banner-${config.niche}-${Date.now()}.png`;
    link.click();
  };

  const getBannerTypes = () => {
    if (config.niche === 'store') return STORE_TYPES;
    if (config.niche === 'gamer') return GAMER_TYPES;
    return LUXURY_TYPES;
  };

  const getNicheTheme = () => {
    if (config.niche === 'gamer') return 'bg-gray-950 text-white';
    if (config.niche === 'luxury_cars') return 'bg-zinc-950 text-amber-50';
    return 'bg-gray-50 text-gray-900';
  };

  const getCardTheme = () => {
    if (config.niche === 'gamer') return 'bg-gray-900 border-fuchsia-500/30 shadow-fuchsia-500/10';
    if (config.niche === 'luxury_cars') return 'bg-zinc-900 border-amber-600/30 shadow-amber-600/10';
    return 'bg-white border-gray-100 shadow-blue-500/5';
  };

  const getTitleTheme = () => {
    if (config.niche === 'gamer') return 'text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-cyan-400 font-gamer';
    if (config.niche === 'luxury_cars') return 'text-amber-500 uppercase tracking-widest font-bold';
    return 'text-blue-900 font-extrabold';
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${getNicheTheme()}`}>
      <header className={`py-8 px-4 text-center border-b ${config.niche === 'store' ? 'border-gray-200' : 'border-white/10'}`}>
        <div className="max-w-4xl mx-auto">
          <h1 className={`text-4xl md:text-5xl mb-2 tracking-tight flex items-center justify-center gap-3 ${getTitleTheme()}`}>
            {config.niche === 'gamer' && <Gamepad className="w-10 h-10" />}
            {config.niche === 'store' && <ShoppingCart className="w-10 h-10" />}
            {config.niche === 'luxury_cars' && <CarFront className="w-10 h-10" />}
            BannerPro AI
          </h1>
          <p className={`text-lg opacity-70`}>
            Criação Profissional de Banners com Inteligência Artificial.
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <NicheSelector active={config.niche} onChange={handleNicheChange} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <section className={`p-8 rounded-3xl shadow-2xl border ${getCardTheme()}`}>
            <h2 className={`text-2xl font-bold mb-6 flex items-center gap-2 ${config.niche === 'luxury_cars' ? 'text-amber-500' : ''}`}>
              <Sparkles size={24} /> Criador de Visual de Elite
            </h2>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold mb-2 uppercase tracking-wider opacity-60">Objetivo</label>
                  <select 
                    className={`w-full p-4 rounded-xl outline-none transition-all ${config.niche === 'store' ? 'bg-gray-50 border-gray-200' : 'bg-white/5 border-white/10 text-white'}`}
                    value={config.type}
                    onChange={(e) => setConfig({ ...config, type: e.target.value as BannerType })}
                  >
                    {getBannerTypes().map(t => <option key={t.value} value={t.value} className="text-gray-900">{t.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold mb-2 uppercase tracking-wider opacity-60">Formato</label>
                  <select 
                    className={`w-full p-4 rounded-xl outline-none transition-all ${config.niche === 'store' ? 'bg-gray-50 border-gray-200' : 'bg-white/5 border-white/10 text-white'}`}
                    value={config.format}
                    onChange={(e) => setConfig({ ...config, format: e.target.value as Format })}
                  >
                    {FORMATS.map(f => <option key={f.value} value={f.value} className="text-gray-900">{f.label}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold mb-2 uppercase tracking-wider opacity-60">Marca / Modelo (Exibido no Banner)</label>
                <input 
                  type="text"
                  placeholder={config.niche === 'luxury_cars' ? "Ex: Ferrari SF90 / Porsche 911" : "Ex: Nike / HyperX"}
                  className={`w-full p-4 rounded-xl outline-none border-2 transition-all ${config.niche === 'store' ? 'bg-gray-50 border-gray-100 focus:border-blue-500' : 'bg-white/5 border-white/10 text-white focus:border-amber-500'}`}
                  value={config.brandName}
                  onChange={(e) => setConfig({ ...config, brandName: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-2 uppercase tracking-wider opacity-60">Texto Principal / Oferta (Exibido no Banner)</label>
                <textarea 
                  rows={3}
                  placeholder="Ex: Performance Brutal / 50% OFF Hoje"
                  className={`w-full p-4 rounded-xl outline-none border-2 transition-all ${config.niche === 'store' ? 'bg-gray-50 border-gray-100 focus:border-blue-500' : 'bg-white/5 border-white/10 text-white focus:border-amber-500'}`}
                  value={config.mainText}
                  onChange={(e) => setConfig({ ...config, mainText: e.target.value })}
                />
              </div>

              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <label className="block text-xs font-bold mb-2 uppercase tracking-wider opacity-60">Paleta de Cores</label>
                  <input 
                    type="color"
                    className="w-full h-12 rounded-lg cursor-pointer bg-transparent border-none"
                    value={config.accentColor}
                    onChange={(e) => setConfig({ ...config, accentColor: e.target.value })}
                  />
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 p-4 bg-red-900/20 text-red-400 border border-red-900/50 rounded-xl">
                  <AlertCircle size={20} />
                  <span>{error}</span>
                </div>
              )}

              <Button 
                variant={config.niche === 'luxury_cars' ? 'luxury' : (config.niche === 'gamer' ? 'gamer' : 'store')} 
                className="w-full py-5 text-xl" 
                onClick={generateBanner}
                loading={loading}
              >
                <Zap size={22} className="fill-current" /> Gerar Banner com I.A.
              </Button>
              <p className="text-[10px] text-center opacity-40 uppercase tracking-tighter">O texto digitado será processado para aparecer na arte final.</p>
            </div>
          </section>

          <section className="flex flex-col gap-6 sticky top-8">
            {result ? (
              <div className={`p-8 rounded-3xl animate-in fade-in slide-in-from-bottom-4 duration-700 border ${getCardTheme()}`}>
                <div className="relative group rounded-2xl overflow-hidden mb-6 bg-zinc-800 shadow-2xl">
                  <img src={result.imageUrl} alt="Banner" className="w-full h-auto object-contain max-h-[550px]" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <button onClick={downloadImage} title="Baixar Arte" className="p-4 bg-white text-black rounded-full hover:scale-110 transition-transform shadow-xl"><Download size={28} /></button>
                    <button onClick={() => copyToClipboard(result.imageUrl)} title="Copiar Link" className="p-4 bg-white text-black rounded-full hover:scale-110 transition-transform shadow-xl"><Copy size={28} /></button>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 gap-4">
                    <div className={`p-4 rounded-xl border ${config.niche === 'store' ? 'bg-gray-100 border-gray-200' : 'bg-white/5 border-white/10'}`}>
                      <h3 className="text-[10px] font-bold uppercase opacity-50 mb-1">Título SEO Sugerido</h3>
                      <div className="flex justify-between items-center">
                        <p className="font-semibold text-sm">{result.title}</p>
                        <button onClick={() => copyToClipboard(result.title)} className="hover:text-amber-500 ml-2"><Copy size={16} /></button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-[10px] font-bold uppercase opacity-50 mb-2">Hashtags Estratégicas</h3>
                    <div className="flex flex-wrap gap-2">
                      {result.hashtags.map((tag, i) => (
                        <span key={i} className={`px-3 py-1 text-[11px] rounded-full border ${config.niche === 'luxury_cars' ? 'border-amber-500/30 text-amber-400 bg-amber-500/5' : (config.niche === 'gamer' ? 'border-fuchsia-500/30 text-fuchsia-400 bg-fuchsia-500/5' : 'border-blue-200 text-blue-600 bg-blue-50')}`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 grid grid-cols-2 gap-4">
                    <Button variant="secondary" className="w-full font-bold" onClick={downloadImage}>
                      <Download size={18} /> Salvar Imagem
                    </Button>
                    <Button variant="secondary" className="w-full font-bold">
                      <Share2 size={18} /> Publicar
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className={`p-16 border-2 border-dashed rounded-3xl flex flex-col items-center justify-center text-center gap-6 min-h-[400px] ${config.niche === 'store' ? 'border-gray-300' : 'border-white/10'}`}>
                {loading ? (
                   <div className="space-y-8">
                    <div className={`w-20 h-20 border-4 rounded-full border-t-transparent animate-spin mx-auto ${config.niche === 'luxury_cars' ? 'border-amber-500' : (config.niche === 'gamer' ? 'border-fuchsia-500' : 'border-blue-600')}`}></div>
                    <div className="space-y-3">
                      <p className="font-black text-2xl uppercase tracking-tighter italic">Processando Arte Final...</p>
                      <p className="text-sm opacity-50 uppercase tracking-widest font-bold">Renderizando textos e tipografia de elite</p>
                    </div>
                   </div>
                ) : (
                  <>
                    <div className={`p-8 rounded-full shadow-inner ${config.niche === 'luxury_cars' ? 'bg-amber-500/10 text-amber-500' : 'bg-gray-200 text-gray-400'}`}>
                      <ImageIcon size={64} strokeWidth={1} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black uppercase mb-2">Aguardando Criação</h3>
                      <p className="opacity-60 max-w-xs mx-auto text-sm">Insira os dados do seu produto ou veículo para gerar um banner com impacto comercial imediato.</p>
                    </div>
                  </>
                )}
              </div>
            )}
          </section>
        </div>
      </main>

      <footer className={`py-12 px-4 border-t text-center ${config.niche === 'store' ? 'border-gray-200' : 'border-white/5 opacity-50'}`}>
        <p className="text-xs font-bold uppercase tracking-widest">© 2024 BannerPro AI - Digital Asset Creation Engine</p>
      </footer>
    </div>
  );
};

export default App;
