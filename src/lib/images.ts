/** Unique Unsplash assets — each photo ID used once across the site. */

const u = (id: string, w = 1400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const img = {
  // Projects — landscape finished homes & compounds (consistent 16:10 feel)
  projectG2: u("photo-1600596542815-ffad4c1539a9", 1400),
  projectFamily: u("photo-1600585154340-be6161a56a0c", 1400),
  projectGuest: u("photo-1512917774080-9991f1c4c750", 1400),
  projectLandscape: u("photo-1600585152220-90363fe7e115", 1400),
  projectG3: u("photo-1613490493576-7fde63acd811", 1400),

  // Inquiry CTA
  cta: u("photo-1600607687939-ce8a6c25118c", 1600),

  // Architecture service
  archHero: u("photo-1600047509807-ba8b99d40030", 1600),
  archInterior: u("photo-1600210492493-0946911123ea", 1000),
  archDetail: u("photo-1600585154526-990dced4db0d", 1000),

  // Construction service
  buildHero: u("photo-1504307651254-35680f356dfd", 1600),
  buildStair: u("photo-1541888946425-d81bb19240f5", 1000),
  buildKitchen: u("photo-1503387762-592deb58ef4e", 1000),

  // Landscape service
  landHero: u("photo-1416879595882-3373a0480b5b", 1600),
  landGarden: u("photo-1558904541-efa843a96f01", 1000),
  landPavilion: u("photo-1600566752355-35792bedcfea", 1000),

  // Home services cards
  stoneDetail: u("photo-1581094794329-c8112a89af12", 1000),
  landscapeCard: u("photo-1564013799919-ab600027ffc6", 1000),

  // Client review avatars
  avatar1: u("photo-1573496359142-b8d87734a5a2", 160),
  avatar2: u("photo-1472099645785-5658abf4ff4e", 160),
  avatar3: u("photo-1580489944761-15a19d654956", 160),
};
