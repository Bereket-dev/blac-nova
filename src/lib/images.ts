/** Stable Unsplash assets — readdy.ai search-image is currently unavailable (400/404). */

const u = (id: string, w = 1400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const img = {
  hartley: u("photo-1600596542815-ffad4c1539a9", 1200),
  serpentine: u("photo-1600585154340-be6161a56a0c", 1200),
  azure: u("photo-1512917774080-9991f1c4c750", 1200),
  thornfield: u("photo-1416879595882-3373a0480b5b", 1200),
  nova: u("photo-1613490493576-7fde63acd811", 1200),
  filmPoster: u("photo-1600596542815-ffad4c1539a9", 1600),
  cta: u("photo-1600585154340-be6161a56a0c", 1600),
  archHero: u("photo-1600585154340-be6161a56a0c", 1600),
  archInterior: u("photo-1600210492493-0946911123ea", 1000),
  archDetail: u("photo-1600585154526-990dced4db0d", 1000),
  buildHero: u("photo-1504307651254-35680f356dfd", 1600),
  buildStair: u("photo-1621905251189-08b45d6a269e", 1000),
  buildKitchen: u("photo-1590487988256-9ed24133863e", 1000),
  landHero: u("photo-1512917774080-9991f1c4c750", 1600),
  landGarden: u("photo-1558904541-efa843a96f01", 1000),
  landPavilion: u("photo-1416879595882-3373a0480b5b", 1000),
  stoneDetail: u("photo-1504307651254-35680f356dfd", 1000),
  landscapeCard: u("photo-1558904541-efa843a96f01", 1000),
  avatar1: u("photo-1573496359142-b8d87734a5a2", 160),
  avatar2: u("photo-1472099645785-5658abf4ff4e", 160),
  avatar3: u("photo-1580489944761-15a19d654956", 160),
};
