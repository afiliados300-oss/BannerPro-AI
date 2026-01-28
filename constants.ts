
import { Niche, BannerType, Format } from './types';

export const STORE_TYPES: { value: BannerType; label: string }[] = [
  { value: 'flash_promo', label: 'Promoção Relâmpago' },
  { value: 'launch', label: 'Lançamento de Produto' },
  { value: 'clearance', label: 'Queima de Estoque' },
  { value: 'black_friday', label: 'Black Friday / Cyber Monday' },
  { value: 'ecommerce', label: 'E-commerce / Marketplace' },
  { value: 'facade', label: 'Fachada Digital' },
];

export const GAMER_TYPES: { value: BannerType; label: string }[] = [
  { value: 'channel', label: 'Canal Gamer' },
  { value: 'esports', label: 'Time eSports' },
  { value: 'stream', label: 'Stream Twitch / YouTube' },
  { value: 'peripheral', label: 'Setup / Periféricos' },
  { value: 'tournament', label: 'Torneio / Campeonato' },
];

export const LUXURY_TYPES: { value: BannerType; label: string }[] = [
  { value: 'car_sale', label: 'Venda Premium' },
  { value: 'car_rental', label: 'Aluguel de Superesportivos' },
  { value: 'car_event', label: 'Evento / Track Day' },
  { value: 'car_performance', label: 'Performance & Tuning' },
  { value: 'car_showcase', label: 'Exposição / Showcase' },
];

export const LUXURY_CAR_LIST = [
  "Mercedes-Benz Classe S", "Mercedes-Maybach S-Class", "Mercedes-AMG GT", "BMW Série 7", "BMW i7", "BMW M8", "Audi A8", "Audi RS7", "Porsche Panamera", "Porsche Taycan Turbo S",
  "Rolls-Royce Phantom", "Rolls-Royce Ghost", "Rolls-Royce Cullinan", "Bentley Flying Spur", "Bentley Continental GT", "Bentley Bentayga", "Aston Martin DB12", "Aston Martin Lagonda",
  "Maserati Quattroporte", "Maserati Ghibli", "Maserati GranTurismo", "Alfa Romeo Giulia Quadrifoglio",
  "Cadillac Escalade", "Cadillac Celestiq", "Tesla Model S Plaid", "Tesla Model X Plaid",
  "Ferrari SF90 Stradale", "Ferrari 812 Superfast", "Ferrari Roma", "Lamborghini Aventador", "Lamborghini Huracán EVO", "Lamborghini Revuelto", "Pagani Huayra", "Pagani Utopia",
  "Porsche 911 Turbo S", "Porsche 911 GT3 RS", "Audi R8 V10 Performance", "Mercedes-AMG One",
  "McLaren 720S", "McLaren 750S", "McLaren Artura", "Aston Martin Valkyrie", "Aston Martin DBS Superleggera",
  "Nissan GT-R Nismo", "Lexus LFA", "Ford GT", "Chevrolet Corvette Z06", "Dodge Challenger SRT Demon",
  "Bugatti Chiron Super Sport", "Bugatti Mistral", "Koenigsegg Jesko", "Koenigsegg Regera", "Rimac Nevera", "Lotus Evija"
];

export const FORMATS: { value: Format; label: string; ratio: string }[] = [
  { value: 'instagram_feed', label: 'Instagram Feed (1:1)', ratio: '1:1' },
  { value: 'instagram_stories', label: 'Stories / Reels (9:16)', ratio: '9:16' },
  { value: 'facebook', label: 'Facebook Post (4:3)', ratio: '4:3' },
  { value: 'youtube_thumb', label: 'YouTube Thumb (16:9)', ratio: '16:9' },
  { value: 'tiktok', label: 'TikTok (9:16)', ratio: '9:16' },
  { value: 'site_banner', label: 'Banner Site (16:9)', ratio: '16:9' },
  { value: 'google_ads', label: 'Google Ads (3:4)', ratio: '3:4' },
];

export const STORE_TITLES = [
  "Ofertas Imperdíveis Que Você Não Pode Perder",
  "Promoção Limitada – Só Hoje",
  "Os Melhores Preços da Internet",
  "Qualidade Premium com Preço Justo",
  "Sua Loja de Confiança"
];

export const GAMER_TITLES = [
  "Domine o Jogo",
  "Suba de Nível Agora",
  "Setup Gamer Profissional",
  "Jogue Como um Pro",
  "O Poder Está em Suas Mãos"
];

export const LUXURY_TITLES = [
  "Exclusividade Sobre Rodas",
  "O Ápice do Desempenho",
  "Sinta o Poder nas Suas Mãos",
  "Acelere sua Emoção",
  "Luxo em Cada Detalhe",
  "A Obra de Arte da Engenharia"
];

export const STORE_HASHTAGS = "#promoção #ofertas #desconto #comprasonline #lojaonline #ecommerce #vendas #blackfriday #promoções #marketingdigital #empreendedorismo #negócios #ofertadodia #preçobaixo #compras";

export const GAMER_HASHTAGS = "#gamer #gaming #games #pcgamer #setupgamer #gamers #esports #jogos #videogames #twitch #youtube #streamer #gaminglife #proplayer #fps";

export const LUXURY_HASHTAGS = "#luxurycars #supercars #ferrari #lamborghini #porsche #carrosdeluxo #velocidade #exclusivo #hipercarros #automobilismo #status #premium #vendasluxo";
