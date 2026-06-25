import { useState, useEffect, useRef } from "react";
import Banner1 from "../assetsc/banner1.jpg";
import Banner2 from "../assetsc/banner2.jpg";
import ABOUT from "../assetsc/3.webp";
import MASTER_PLAN from "../assetsc/4.webp";
import UNIT_PLAN from "../assetsc/5.webp";
import SITE_VISIT from "../assetsc/17.webp";
import asset1 from "../assetsc/6.webp";
import asset2 from "../assetsc/7.webp";
import asset3 from "../assetsc/8.webp";
import asset4 from "../assetsc/9.webp";
import asset5 from "../assetsc/10.webp";
import aminete1 from "../assetsc/11.webp";
import aminete2 from "../assetsc/12.webp";
import aminete3 from "../assetsc/13.webp";
import aminete4 from "../assetsc/14.webp";
import aminete5 from "../assetsc/15.webp";
import aminete6 from "../assetsc/16.webp";
import Logo from "../assets/Gaurslogo.png";

/* ─────────────────────────────────────────────────────────
   IMAGE SOURCES
   Gallery / amenity / logo / about images are pulled LIVE
   from the official gaurchrysalis.co site (no download
   needed). Banner & a couple of section visuals are left as
   placeholders for you to swap with your own crops if needed.
   ───────────────────────────────────────────────────────── */

const IMG = {
  // LOGO:        `assets/images/logo/logo.png`,
  // BANNER_1:    `assets/images/banner.webp`,
  // BANNER_2:    `assets/images/banner1.webp`,
  // ABOUT:       `assets/images/about/About.webp`,
  // MASTER_PLAN: `assets/images/floor-plan/MasterPlan.webp`,
  // UNIT_PLAN:   `assets/images/floor-plan/UnitPlan.webp`,
  // SITE_VISIT:  `assets/images/contact/site_visit.webp`,
  GALLERY: [
    asset1,
    asset2,
    asset3,
    asset4,
    asset5,
  ],
  AMENITIES: [
    { src: aminete1,    label: "Basketball Court"  },
    { src: aminete2,       label: "Swimming Pool"     },
    { src: aminete3, label: "Indoor Games Zone" },
    { src: aminete4,           label: "Yoga Deck"         },
    { src: aminete5,  label: "Multipurpose Court"},
    { src: aminete6,             label: "Gymnasium"         },
  ],
  /* Local placeholders — replace once you have crops ready */
  TAGLINE_BG: "chrysalis/images/tagline-bg.jpg",     // ← replace
  FORM_SIDE:  "chrysalis/images/form-side.jpg",      // ← replace
};

/* ─── CSS ─── */
const styles = `
  @import url("https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Manrope:wght@300;400;500;600;700;800&display=swap");
  @import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css");
  @import url("https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.3/css/bootstrap.min.css");
  @import url("https://cdnjs.cloudflare.com/ajax/libs/Swiper/8.3.1/swiper-bundle.min.css");
  @import url("https://unpkg.com/aos@2.3.0/dist/aos.css");

  :root {
    --primary:       #6b1f2a;
    --primary-dark:  #4a121a;
    --gold:          #c1933f;
    --gold-light:    #e0b768;
    --cream:         #f7f2ea;
    --dark:          #241013;
    --body-color:    #3a2a2c;
    --whatsapp:      #25d366;
    --serif:         "Cormorant", serif;
    --sans:          "Manrope", sans-serif;
    --wine-gradient: linear-gradient(135deg, #6b1f2a 0%, #8c2e3a 100%);
    --gold-gradient: linear-gradient(135deg, #c1933f 0%, #e0b768 50%, #a67a30 100%);
  }

  *,*::before,*::after { box-sizing:border-box; }
  html { scroll-behavior:smooth; }
  body { color:var(--body-color); font:400 1rem var(--sans); overflow-x:hidden; margin:0; }
  ul { padding-left:0; margin-bottom:0; list-style:none; }
  a, a:hover { text-decoration:none; color:inherit; }
  img { width:100%; display:block; }

  .img-ph {
    background:linear-gradient(110deg,#ecd9c4 0%,#f7ede0 50%,#ecd9c4 100%);
    background-size:200% 100%; animation:shimmer 1.6s infinite;
    display:flex; align-items:center; justify-content:center;
    font:500 0.72rem var(--sans); color:#8a6332; letter-spacing:1.5px;
    text-transform:uppercase; min-height:200px;
  }
  @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
  .img-ph span { background:rgba(255,255,255,0.7); padding:5px 12px; border-radius:20px; }

  .rera-chip {
    display:inline-flex; align-items:center; gap:6px;
    background:rgba(193,147,63,0.1); border:1px solid rgba(193,147,63,0.35);
    padding:4px 12px; font:500 0.68rem var(--sans); letter-spacing:1px;
    color:var(--gold); border-radius:2px; margin-bottom:0.75rem;
  }

  /* ── HEADER ── */
  .gc-header { width:100%; position:fixed; top:0; left:0; z-index:997;
    background:linear-gradient(to bottom, rgba(36,16,19,0.85), transparent); transition:all 300ms ease; }
  .gc-header.scrolled { background:#fff; box-shadow:0 2px 20px rgba(36,16,19,0.12); }
  .gc-header .hd-inner { display:flex; align-items:center; justify-content:space-between; padding:0 3rem; height:72px; }
  .gc-logo { width:88px; }
  .gc-nav { display:flex; gap:2px; }
  .gc-nav a { color:#fff; padding:8px 12px; font:500 0.75rem var(--sans); text-transform:uppercase;
    letter-spacing:1.5px; transition:color 200ms; white-space:nowrap; }
  .gc-header.scrolled .gc-nav a { color:var(--body-color); }
  .gc-nav a:hover { color:var(--gold); }
  .gc-cta { display:flex; gap:8px; align-items:center; }
  .btn-call-gc { display:flex; align-items:center; gap:6px; background:var(--wine-gradient); color:#fff !important;
    padding:8px 18px; border-radius:2px; font:600 0.75rem var(--sans); text-transform:uppercase; letter-spacing:1px;
    transition:all 200ms; border:none; cursor:pointer; }
  .btn-call-gc:hover { opacity:0.9; transform:translateY(-1px); }
  .btn-wa-gc { display:flex; align-items:center; gap:6px; background:var(--whatsapp); color:#fff !important;
    padding:8px 18px; border-radius:2px; font:600 0.75rem var(--sans); text-transform:uppercase; letter-spacing:1px;
    animation:waPulse 2.5s ease-in-out infinite; }
  @keyframes waPulse { 0%,100%{box-shadow:0 0 0 0 rgba(37,211,102,0.4);} 50%{box-shadow:0 0 0 8px rgba(37,211,102,0);} }
  .ham { background:none; border:none; cursor:pointer; padding:4px; display:none; flex-direction:column; gap:5px; }
  .ham span { display:block; width:24px; height:2px; background:#fff; transition:all 0.4s; }
  .gc-header.scrolled .ham span { background:var(--dark); }
  .ham.open span:nth-child(1){ transform:rotate(45deg) translate(5px,5px); }
  .ham.open span:nth-child(2){ opacity:0; }
  .ham.open span:nth-child(3){ transform:rotate(-45deg) translate(5px,-5px); }

  .mob-menu { position:fixed; top:72px; right:14px; width:calc(100% - 28px); max-width:340px;
    background:var(--dark); padding:1.5rem 2rem; box-shadow:0 16px 40px rgba(0,0,0,0.3); display:none; z-index:990; }
  .mob-menu.open { display:block; }
  .mob-menu a { display:block; color:#f3e3c8; font:600 1rem var(--serif); padding:0.75rem 0;
    border-bottom:1px solid rgba(193,147,63,0.18); transition:color 200ms; }
  .mob-menu a:hover { color:var(--gold); }

  /* ── BANNER (auto-cycling 2 images) ── */
  .gc-banner { height:100vh; position:relative; overflow:hidden; }
  .gc-banner .b-slide { position:absolute; inset:0; opacity:0; transition:opacity 1.2s ease; }
  .gc-banner .b-slide.active { opacity:1; }
  .gc-banner .b-slide img { width:100%; height:100%; object-fit:cover; }
  .gc-banner::after { content:''; position:absolute; inset:0; z-index:1;
    background:linear-gradient(100deg, rgba(36,16,19,0.82) 0%, rgba(36,16,19,0.4) 55%, transparent 100%); }
  .banner-content { position:absolute; left:7%; top:50%; transform:translateY(-50%); z-index:2; color:#fff; max-width:600px; }
  .banner-tag { display:inline-flex; align-items:center; gap:8px; background:rgba(193,147,63,0.18);
    border:1px solid rgba(193,147,63,0.4); padding:5px 14px; font:600 0.65rem var(--sans);
    letter-spacing:3px; text-transform:uppercase; color:var(--gold-light); margin-bottom:1.1rem; backdrop-filter:blur(4px); }
  .banner-title { font:300 4rem var(--serif); line-height:1.08; margin-bottom:0.3rem; }
  .banner-title strong { font-weight:700; display:block; }
  .banner-sub { font:400 1rem var(--sans); opacity:0.85; margin-bottom:1rem; }
  .offer-row { display:flex; flex-direction:column; gap:4px; margin-bottom:1.5rem; }
  .offer-row span { font:500 0.82rem var(--sans); opacity:0.85; display:flex; align-items:center; gap:8px; }
  .offer-row span::before { content:'◆'; color:var(--gold); font-size:0.6rem; }
  .price-pill-gc { display:inline-flex; flex-direction:column; align-items:flex-start; gap:2px;
    background:var(--gold-gradient); color:var(--dark); padding:10px 22px; margin-bottom:1.75rem; }
  .price-pill-gc .pp-label { font:500 0.65rem var(--sans); letter-spacing:1.5px; text-transform:uppercase; opacity:0.75; }
  .price-pill-gc .pp-value { font:700 1.15rem var(--sans); }
  .banner-actions { display:flex; gap:10px; flex-wrap:wrap; }
  .btn-solid-wine { background:var(--wine-gradient); color:#fff; border:none; padding:13px 30px;
    font:600 0.78rem var(--sans); text-transform:uppercase; letter-spacing:2px; cursor:pointer;
    transition:all 200ms; box-shadow:0 6px 20px rgba(107,31,42,0.4); }
  .btn-solid-wine:hover { transform:translateY(-2px); box-shadow:0 10px 28px rgba(107,31,42,0.5); }
  .btn-ghost-cream { border:1px solid rgba(255,255,255,0.45); background:transparent; color:#fff;
    padding:13px 30px; font:600 0.78rem var(--sans); text-transform:uppercase; letter-spacing:2px; cursor:pointer; transition:all 200ms; }
  .btn-ghost-cream:hover { border-color:var(--gold-light); color:var(--gold-light); }
  .banner-dots { position:absolute; bottom:24px; left:7%; z-index:2; display:flex; gap:8px; }
  .banner-dots span { width:24px; height:3px; background:rgba(255,255,255,0.35); cursor:pointer; transition:all 200ms; }
  .banner-dots span.active { background:var(--gold); }

  /* ── Marquee ── */
  .gc-marquee { background:var(--dark); color:rgba(243,227,200,0.75); padding:10px 0; overflow:hidden; white-space:nowrap; }
  .gc-marquee .mq-inner { display:inline-flex; gap:3rem; animation:marquee 24s linear infinite;
    font:600 0.7rem var(--sans); letter-spacing:2px; text-transform:uppercase; }
  .gc-marquee .mq-inner span.dot { color:var(--gold); }
  @keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }

  /* ── Common ── */
  .section-pad { padding:5rem 0; }
  .eyebrow-gc { display:inline-flex; align-items:center; gap:10px; font:600 0.65rem var(--sans);
    letter-spacing:4px; text-transform:uppercase; color:var(--primary); margin-bottom:0.75rem; }
  .eyebrow-gc::before { content:''; display:block; width:28px; height:2px; background:var(--gold); }
  .title-gc { font:400 2.8rem var(--serif); line-height:1.15; color:var(--dark); }
  .title-gc strong { font-weight:600; }
  .title-gc em { font-style:italic; color:var(--primary); }
  .sub-gc { font:400 0.95rem var(--sans); color:#7a6058; margin-top:0.4rem; }

  /* ── About / Overview ── */
  .overview-section { background:var(--cream); }
  .config-row-gc { display:flex; flex-wrap:wrap; margin:2rem 0; border:1px solid rgba(107,31,42,0.15); overflow:hidden; }
  .cfg-item-gc { flex:1; min-width:130px; padding:1.1rem 1.25rem; border-right:1px solid rgba(107,31,42,0.15);
    text-align:center; background:#fff; transition:background 200ms; }
  .cfg-item-gc:last-child { border-right:none; }
  .cfg-item-gc:hover { background:rgba(107,31,42,0.04); }
  .cfg-label-gc { font:500 0.6rem var(--sans); letter-spacing:2px; text-transform:uppercase; color:var(--primary); margin-bottom:3px; }
  .cfg-value-gc { font:600 0.92rem var(--serif); color:var(--dark); }
  .overview-img { overflow:hidden; }
  .overview-img img { aspect-ratio:4/5; object-fit:cover; }

  /* sticky form */
  .sticky-wrap-gc { position:sticky; top:88px; }
  .sticky-form-gc { background:#fff; box-shadow:0 8px 40px rgba(36,16,19,0.1); border-top:4px solid var(--gold); }
  .sf-head-gc { background:var(--dark); padding:1.25rem 1.5rem; text-align:center; color:#fff; }
  .sf-head-gc h5 { font:400 1.1rem var(--serif); color:var(--gold-light); margin:0; }
  .sf-head-gc small { font:400 0.68rem var(--sans); letter-spacing:2px; opacity:0.55; }
  .sf-body-gc { padding:1.4rem; }
  .sf-inp-gc { width:100%; background:#faf5ee; border:none; border-bottom:2px solid rgba(107,31,42,0.25);
    padding:11px 14px; font:400 0.88rem var(--sans); color:var(--dark); margin-bottom:10px; outline:none; transition:border-color 200ms; }
  .sf-inp-gc:focus { border-bottom-color:var(--primary); }
  .sf-sub-gc { width:100%; background:var(--wine-gradient); color:#fff; border:none; padding:13px;
    font:700 0.75rem var(--sans); letter-spacing:2px; text-transform:uppercase; cursor:pointer; transition:opacity 200ms; }
  .sf-sub-gc:hover { opacity:0.88; }
  .sf-status-gc { font:400 0.78rem var(--sans); text-align:center; min-height:18px; margin-bottom:8px; }

  /* ── Highlights ── */
  .highlights-section-gc { background:var(--dark); }
  .hl-grid-gc { display:grid; grid-template-columns:repeat(4,1fr); gap:1px; background:rgba(193,147,63,0.15); }
  .hl-item-gc { background:var(--dark); padding:2rem 1.5rem; text-align:center; transition:background 250ms; }
  .hl-item-gc:hover { background:rgba(107,31,42,0.35); }
  .hl-icon-gc { font-size:1.5rem; color:var(--gold); margin-bottom:0.75rem; }
  .hl-item-gc p { font:500 0.85rem var(--sans); color:#f3e3c8; margin:0; line-height:1.5; }

  /* ── Pricing ── */
  .price-section-gc { background:#fff; }
  .price-table-gc { width:100%; border-collapse:collapse; }
  .price-table-gc th { background:var(--dark); color:var(--gold-light); font:600 0.7rem var(--sans);
    letter-spacing:2px; text-transform:uppercase; padding:14px 20px; text-align:left; }
  .price-table-gc td { padding:14px 20px; border-bottom:1px solid rgba(107,31,42,0.1); font:400 0.88rem var(--sans); }
  .price-table-gc tr:hover td { background:rgba(107,31,42,0.04); }
  .price-tag-gc { font:600 0.85rem var(--sans); color:var(--primary); }
  .enq-link-gc { background:var(--gold-gradient); color:var(--dark); border:none; padding:7px 18px;
    font:600 0.7rem var(--sans); letter-spacing:1px; text-transform:uppercase; cursor:pointer; }

  /* ── Floor Plans ── */
  .fp-section-gc { background:var(--cream); }
  .fp-card-gc { background:#fff; border:1px solid rgba(107,31,42,0.12); overflow:hidden; transition:all 250ms; }
  .fp-card-gc:hover { transform:translateY(-4px); box-shadow:0 12px 36px rgba(36,16,19,0.1); }
  .fp-img-wrap-gc { position:relative; overflow:hidden; cursor:pointer; }
  .fp-img-wrap-gc img { transition:filter 300ms; }
  .fp-unlock-gc { position:absolute; inset:0; background:rgba(36,16,19,0.45); display:flex; align-items:center;
    justify-content:center; opacity:0; transition:opacity 200ms; }
  .fp-img-wrap-gc:hover .fp-unlock-gc { opacity:1; }
  .fp-unlock-gc span { border:1px solid rgba(255,255,255,0.6); color:#fff; padding:9px 22px;
    font:600 0.72rem var(--sans); letter-spacing:2px; text-transform:uppercase; }
  .fp-info-gc { padding:1.25rem 1.25rem 0.5rem; }
  .fp-name-gc { font:600 1.3rem var(--serif); color:var(--dark); }
  .fp-btn-gc { display:flex; align-items:center; gap:8px; margin:0.75rem 1.25rem 1.25rem;
    background:var(--wine-gradient); color:#fff; border:none; padding:10px 20px;
    font:600 0.72rem var(--sans); letter-spacing:1.5px; text-transform:uppercase; cursor:pointer; width:fit-content; transition:opacity 200ms; }
  .fp-btn-gc:hover { opacity:0.85; }

  /* ── Amenities ── */
  .amenities-section-gc { background:var(--primary-dark); position:relative; overflow:hidden; }
  .ame-card-gc { position:relative; overflow:hidden; border-radius:4px; box-shadow:0 8px 28px rgba(0,0,0,0.25); }
  .ame-card-gc img { height:180px; object-fit:cover; transition:transform 400ms; }
  .ame-card-gc:hover img { transform:scale(1.07); }
  .ame-card-gc .ame-overlay { position:absolute; inset:0; background:linear-gradient(to top, rgba(36,16,19,0.85) 0%, transparent 55%);
    display:flex; align-items:flex-end; padding:1rem; }
  .ame-card-gc .ame-overlay span { color:#f3e3c8; font:600 0.85rem var(--sans); letter-spacing:0.5px; }

  /* ── Gallery ── */
  .gallery-section-gc { background:var(--dark); }
  .gal-slide-gc img { height:300px; object-fit:cover; width:100%; }
  div[class^="swiper-button"] { color:#fff; background:rgba(36,16,19,0.75); width:38px; height:38px;
    border-radius:50%; border:1px solid rgba(193,147,63,0.35); transition:all 200ms; }
  div[class^="swiper-button"]:hover { background:var(--primary); border-color:var(--primary); }
  div[class^="swiper-button"]::after { font-size:0.85rem; }
  .gal-controls-gc { display:flex; gap:8px; align-items:center; }
  .gal-controls-gc div { position:static; margin:0; }

  /* ── Location ── */
  .location-section-gc { background:var(--cream); }
  .loc-tabs { display:flex; gap:8px; flex-wrap:wrap; margin-bottom:1.5rem; }
  .loc-tab { padding:8px 18px; font:600 0.72rem var(--sans); letter-spacing:1px; text-transform:uppercase;
    background:#fff; border:1px solid rgba(107,31,42,0.2); color:var(--body-color); cursor:pointer; transition:all 200ms; }
  .loc-tab.active { background:var(--wine-gradient); color:#fff; border-color:transparent; }
  .loc-item-gc { display:flex; align-items:flex-start; gap:0.75rem; padding:0.7rem 0; border-bottom:1px dashed rgba(107,31,42,0.15); }
  .loc-item-gc:last-child { border-bottom:none; }
  .loc-item-gc i { color:var(--gold); margin-top:3px; }
  .loc-item-gc strong { font:600 0.85rem var(--sans); color:var(--dark); }
  .map-embed-wrap { overflow:hidden; box-shadow:0 8px 32px rgba(36,16,19,0.12); height:100%; min-height:380px; }
  .map-embed-wrap iframe { width:100%; height:100%; min-height:380px; border:0; }

  /* ── Tagline ── */
  .tagline-band-gc { position:relative; min-height:48vh; display:flex; align-items:center; justify-content:center; overflow:hidden; }
  .tagline-band-gc::before { content:''; position:absolute; inset:0;
    background:url('./chrysalis/images/tagline-bg.jpg') center/cover fixed, var(--wine-gradient); }
  .tagline-band-gc::after { content:''; position:absolute; inset:0; background:rgba(36,16,19,0.6); }
  .tl-content-gc { position:relative; z-index:2; text-align:center; color:#fff; padding:3rem 2rem; max-width:700px; }
  .tl-content-gc h2 { font:300 2.6rem var(--serif); line-height:1.25; margin-bottom:0.75rem; }
  .tl-content-gc h2 em { font-style:italic; color:var(--gold-light); }
  .tl-content-gc p { font:400 0.92rem var(--sans); opacity:0.78; }

  /* ── Enquiry ── */
  .enquiry-section-gc { background:#fff; }
  .enq-card-gc { overflow:hidden; box-shadow:0 8px 48px rgba(36,16,19,0.08); }
  .enq-inner-gc { padding:3rem; }
  .enq-inp-gc { width:100%; background:#faf5ee; border:none; border-bottom:2px solid rgba(107,31,42,0.2);
    padding:13px 16px; font:400 0.88rem var(--sans); color:var(--dark); margin-bottom:12px; outline:none; transition:border-color 200ms; }
  .enq-inp-gc:focus { border-bottom-color:var(--primary); }
  .enq-btn-gc { background:var(--wine-gradient); color:#fff; border:none; padding:13px 36px;
    font:700 0.78rem var(--sans); letter-spacing:2px; text-transform:uppercase; cursor:pointer; transition:all 200ms; margin-top:4px; }
  .enq-btn-gc:hover { opacity:0.88; transform:translateY(-1px); }

  /* ── About Developer ── */
  .about-section-gc { background:var(--dark); }
  .about-card-gc { background:rgba(255,255,255,0.04); border:1px solid rgba(193,147,63,0.2); padding:2.5rem; height:100%; }
  .about-card-gc h4 { font:400 1.5rem var(--serif); color:var(--gold-light); margin-bottom:1rem; }
  .about-card-gc p { font:400 0.88rem var(--sans); color:rgba(243,227,200,0.65); line-height:1.8; }

  /* ── Footer ── */
  .gc-footer { background:var(--dark); padding:2.5rem 0; }
  .gc-footer a { color:var(--gold-light); }
  .gc-footer a:hover { color:var(--gold); }
  .footer-text-gc { font:400 0.78rem var(--sans); color:rgba(243,227,200,0.55); line-height:1.9; }
  .footer-disclaimer-gc { font:400 0.66rem var(--sans); color:rgba(243,227,200,0.32); margin-top:1rem; line-height:1.7;
    border-top:1px solid rgba(193,147,63,0.1); padding-top:1rem; }

  /* ── Mobile CTA ── */
  .mob-cta-gc { position:fixed; bottom:0; left:0; right:0; display:none; z-index:99; background:var(--dark); }
  .mob-cta-gc a, .mob-cta-gc button { flex:1; color:#fff; text-align:center; padding:11px 6px;
    font:600 0.68rem var(--sans); letter-spacing:1px; text-transform:uppercase; border:none;
    border-right:1px solid rgba(193,147,63,0.15); background:none; cursor:pointer; display:flex;
    flex-direction:column; align-items:center; gap:3px; }
  .mob-cta-gc a:last-child, .mob-cta-gc button:last-child { border-right:none; }
  .mob-cta-gc i { font-size:0.95rem; color:var(--gold); }
  .mob-cta-gc .wa-mob-gc { background:var(--whatsapp); }
  .mob-cta-gc .wa-mob-gc i { color:#fff; }

  /* ── Scroll top ── */
  .scroll-top-gc { position:fixed; right:14px; bottom:65px; width:38px; height:38px; border-radius:50%;
    background:var(--wine-gradient); color:#fff; border:none; cursor:pointer; display:flex;
    align-items:center; justify-content:center; font-size:0.9rem; opacity:0; transition:opacity 300ms; z-index:98; }
  .scroll-top-gc.show { opacity:1; }

  /* ── Modal ── */
  .gc-modal-overlay { position:fixed; inset:0; background:rgba(30,12,15,0.92); backdrop-filter:blur(6px);
    z-index:9999; display:flex; align-items:center; justify-content:center; padding:1rem; }
  .gc-modal { background:#fff; max-width:460px; width:100%; position:relative; box-shadow:0 24px 60px rgba(0,0,0,0.4); }
  .gc-modal-head { background:var(--dark); padding:1.75rem 2rem; text-align:center; }
  .gc-modal-head .mh-tag-gc { font:500 0.62rem var(--sans); letter-spacing:3px; text-transform:uppercase; color:var(--gold); margin-bottom:6px; }
  .gc-modal-head h4 { font:400 1.5rem var(--serif); color:#fff; margin:0 0 4px; }
  .gc-modal-head p { font:400 0.78rem var(--sans); color:rgba(255,255,255,0.5); margin:0; }
  .gc-modal-body { padding:2rem; }
  .modal-x-gc { position:absolute; top:-12px; right:-12px; width:34px; height:34px; border-radius:50%;
    background:#fff; color:var(--dark); border:none; cursor:pointer; font-size:1.1rem; font-weight:700;
    display:flex; align-items:center; justify-content:center; box-shadow:0 4px 12px rgba(0,0,0,0.2); z-index:1; }
  .modal-x-gc:hover { background:var(--dark); color:var(--gold); }

  /* ── Responsive ── */
  @media (max-width:991px) {
    .gc-header .hd-inner { padding:0 1.5rem; }
    .gc-nav { display:none; }
    .ham { display:flex; }
    .gc-cta .btn-wa-gc { display:none; }
    .mob-cta-gc { display:flex; }
    .scroll-top-gc { bottom:55px; }
    .hl-grid-gc { grid-template-columns:repeat(2,1fr); }
    .gc-banner { height:85vh; }
    .banner-title { font-size:3rem; }
  }
  @media (max-width:767px) {
    .section-pad { padding:3.5rem 0; }
    .gc-banner { height:auto; aspect-ratio:4/5; margin-top:72px; }
    .banner-content { left:5%; max-width:90%; }
    .banner-title { font-size:2.2rem; }
    .hl-grid-gc { grid-template-columns:1fr 1fr; }
    .cfg-item-gc { min-width:50%; }
    .enq-inner-gc { padding:2rem 1.5rem; }
    .gc-footer { padding-bottom:4rem; }
  }
  @media (max-width:575px) {
    .banner-title { font-size:1.9rem; }
    .banner-actions { flex-direction:column; }
    .hl-grid-gc { grid-template-columns:1fr; }
    .title-gc { font-size:2.1rem; }
  }
`;

/* ─── EmailJS ─── */
function sendEnquiry(data, onOk, onErr) {
  if (!window.emailjs) { onErr("EmailJS not ready"); return; }
  window.emailjs.send("service_fkmfynb", "template_bdjcyq6", data).then(onOk).catch(onErr);
}

/* ─── Reusable form ─── */
function GcForm({ inpClass = "sf-inp-gc", btnClass = "sf-sub-gc", requireEmail = false, onDone }) {
  const [vals, setVals] = useState({ name: "", mobile: "", email: "" });
  const [status, setStatus] = useState("");

  const change = (e) => setVals({ ...vals, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    setStatus("Sending…");
    sendEnquiry(
      { name: vals.name, mobile: vals.mobile, email: vals.email || "Not Provided" },
      () => {
        setStatus("✅ Sent! Our team will call you shortly.");
        setVals({ name: "", mobile: "", email: "" });
        onDone?.();
        window.open(
          "https://wa.me/919716007900?text=Hi I am interested in Gaur Chrysalis 2.0 at Yamuna Expressway, please share details",
          "_blank"
        );
      },
      () => setStatus("❌ Failed. Please try again.")
    );
  };

  return (
    <form onSubmit={submit}>
      {status && (
        <div className="sf-status-gc" style={{ color: status.startsWith("✅") ? "#6b1f2a" : status.startsWith("❌") ? "#c0392b" : "#7a6058" }}>
          {status}
        </div>
      )}
      <input className={inpClass} type="text"  name="name"   placeholder="Full Name *"    required value={vals.name}   onChange={change} />
      <input className={inpClass} type="tel"   name="mobile" placeholder="Mobile Number *" required value={vals.mobile} onChange={change} />
      {requireEmail && (
        <input className={inpClass} type="email" name="email" placeholder="Email Address *" required value={vals.email} onChange={change} />
      )}
      <button type="submit" className={btnClass}>Pre-Register Now</button>
    </form>
  );
}

/* ─── Smart image (placeholder for local-only paths) ─── */
function SImg({ src, alt, height = 220, style }) {
  const isLocal = src && src.startsWith("chrysalis/");
  if (isLocal) {
    return <div className="img-ph" style={{ minHeight: height, ...style }}><span>📷 {alt}</span></div>;
  }
  return <img src={src} alt={alt} style={style} onError={(e) => { e.target.style.display = "none"; }} />;
}

/* ─── Main ─── */
export default function GaurChrysalis2() {
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [scrolled,  setScrolled]  = useState(false);
  const [showTop,   setShowTop]   = useState(false);
  const [bSlide,    setBSlide]    = useState(0);
  const [locTab,    setLocTab]    = useState(0);
  const swiperDone = useRef(false);

  useEffect(() => {
    const load = (src, cb) => {
      if (document.querySelector(`script[src="${src}"]`)) { cb?.(); return; }
      const s = document.createElement("script");
      s.src = src; s.onload = cb; document.body.appendChild(s);
    };
    load("https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js",
      () => window.emailjs?.init("xLfYDZXLlR6IeQ-C6"));
    load("https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js");
    load("https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.3/js/bootstrap.min.js");
    load("https://cdnjs.cloudflare.com/ajax/libs/Swiper/8.3.1/swiper-bundle.min.js", () => {
      if (!swiperDone.current && window.Swiper) {
        swiperDone.current = true;
        new window.Swiper(".gc-gallery-swiper", {
          slidesPerView: 1, spaceBetween: 8, loop: true,
          autoplay: { delay: 3200, disableOnInteraction: false },
          navigation: { nextEl: ".gc-gal-next", prevEl: ".gc-gal-prev" },
          breakpoints: { 540: { slidesPerView: 2, spaceBetween: 12 }, 1024: { slidesPerView: 3, spaceBetween: 16 } },
        });
      }
    });
    load("https://unpkg.com/aos@2.3.0/dist/aos.js", () => window.AOS?.init({ duration: 1100, once: true }));
  }, []);

  /* banner auto-cycle */
  useEffect(() => {
    const t = setInterval(() => setBSlide((s) => (s + 1) % 2), 4500);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const fn = () => { setScrolled(window.scrollY > 55); setShowTop(window.scrollY > 300); };
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setShowModal(true), 6000);
    return () => clearTimeout(t);
  }, []);

  const navLinks = [
    { href: "#overview",   label: "Overview"   },
    { href: "#highlights", label: "Highlights" },
    { href: "#pricing",    label: "Pricing"    },
    { href: "#floorplan",  label: "Floor Plan" },
    { href: "#amenities",  label: "Amenities"  },
    { href: "#gallery",    label: "Gallery"    },
    { href: "#location",   label: "Location"   },
  ];

  const highlights = [
    "Nine majestic towers soaring up to 34 floors",
    "Only four apartments per floor for exclusivity",
    "Lavish G+2 clubhouse with lifestyle indulgences",
    "23 boutique retail spaces within the premises",
    "Expansive 12-acre residential enclave of elegance",
    "Seamless access to Yamuna and Noida Expressways",
    "Excellent connectivity via Eastern Peripheral Expressway",
    "800+ residences · low-density living at 90 families/acre",
  ];

  const highlightIcons = [
    "fa-building", "fa-door-open", "fa-house-chimney", "fa-store",
    "fa-tree-city", "fa-road", "fa-route", "fa-users",
  ];

  const priceData = [
    { type: "Optimal 3 BHK + Servant", area: "1625 Sq.Ft.", price: "₹1.38 Cr* onwards" },
    { type: "Lavish 4 BHK",             area: "1960 Sq.Ft.", price: "₹1.66 Cr* onwards" },
  ];

  const locationTabs = [
    {
      label: "Connectivity",
      items: [
        "Yamuna Expressway – 2 Mins",
        "Jewar International Airport – 10–15 Mins (Upcoming)",
        "Pari Chowk, Greater Noida – 15–20 Mins",
        "Noida–Greater Noida Expressway – 20 Mins",
        "Sector 18 Noida – 25 Mins",
        "Akshardham, Delhi – 30–35 Mins",
        "Knowledge Park / Metro – 15–20 Mins",
      ],
    },
    {
      label: "Education Hub",
      items: [
        "Galgotias University – 10–12 Mins",
        "Sharda University – 15–20 Mins",
        "Noida International University – 20–25 Mins",
        "DPS Greater Noida – 15–18 Mins",
        "Cambridge School, Greater Noida – 15–20 Mins",
        "Knowledge Park 1 (Schools) – 15 Mins",
        "Knowledge Park 2 (Colleges) – 15–20 Mins",
      ],
    },
    {
      label: "Healthcare",
      items: [
        "Yatharth Super Speciality Hospital – 15–20 Mins",
        "Kailash Hospital, Greater Noida – 20–25 Mins",
        "Sharda Hospital – 15–20 Mins",
        "NIIMS Hospital – 20–25 Mins",
      ],
    },
    {
      label: "Malls / Shopping",
      items: [
        "The Grand Venice Mall – 20–25 Mins",
        "MSX Mall, Greater Noida – 20–25 Mins",
        "Omaxe Connaught Place – 25–30 Mins",
        "Ansal Plaza, Greater Noida – 25–30 Mins",
      ],
    },
    {
      label: "Tech Park",
      items: [
        "Stellar Business Park, Greater Noida – 25–30 Mins",
        "Wegmans Business Park – 30–35 Mins",
        "Embassy Oxygen Business Park, Noida – 40–45 Mins",
        "Knowledge Park (Commercial Hub) – 20–25 Mins",
      ],
    },
  ];

  return (
    <>
      <style>{styles}</style>

      {/* ── Header ── */}
      <header className={`gc-header ${scrolled ? "scrolled" : ""}`}>
        <div className="hd-inner">
          <div className="gc-logo"><img src={Logo} alt="Gaur Chrysalis 2.0" /></div>
          <nav className="gc-nav">
            {navLinks.map(({ href, label }) => <a key={href} href={href}>{label}</a>)}
          </nav>
          <div className="gc-cta">
            <a href="tel:+919716007900" className="btn-call-gc"><i className="fa fa-phone" /> Call Now</a>
            <a
              href="https://wa.me/919716007900?text=Hi I am interested in Gaur Chrysalis 2.0 at Yamuna Expressway, please share details"
              target="_blank" rel="noreferrer" className="btn-wa-gc"
            >
              <i className="fab fa-whatsapp" /> WhatsApp
            </a>
            <button className={`ham ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen((o) => !o)}>
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      <div className={`mob-menu ${menuOpen ? "open" : ""}`}>
        {navLinks.map(({ href, label }) => (
          <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
        ))}
        <a href="tel:+919716007900" style={{ color: "var(--gold)", marginTop: "0.5rem" }}>
          <i className="fa fa-phone" style={{ marginRight: 8 }} /> +91 9716007900
        </a>
      </div>

      <main>
        {/* ── Banner ── */}
        <section className="gc-banner" id="home">
          {[Banner1,Banner2].map((src, i) => (
            <div key={i} className={`b-slide ${bSlide === i ? "active" : ""}`}>
              <img src={src} alt={`Gaur Chrysalis 2.0 Banner ${i + 1}`} />
            </div>
          ))}

          <div className="banner-content">
            <div className="banner-tag"><i className="fa fa-circle-dot" /> By Gaurs Group · Pre-Launch</div>
            <h1 className="banner-title">
              Gaur<br /><strong>Chrysalis 2.0</strong>
            </h1>
            <p className="banner-sub">3 &amp; 4 BHK Apartments · Sector 22D, Yamuna Expressway</p>

            <div className="offer-row">
              <span>20×5 Payment Plan</span>
              <span>Launch Offer Upto ₹50 Lacs</span>
              <span>Noida–Greater Noida Link Rd – 3 Mins</span>
              <span>Eastern Peripheral Expressway – 5 Mins</span>
            </div>

            <div className="price-pill-gc">
              <span className="pp-label">Luxurious 3 &amp; 4 BHK Starts</span>
              <span className="pp-value">₹1.38 Cr* Onwards</span>
            </div>

            <div className="banner-actions">
              <button className="btn-solid-wine" onClick={() => setShowModal(true)}>Enquire Now</button>
              <button className="btn-ghost-cream" onClick={() => setShowModal(true)}>Pre-Register</button>
            </div>
          </div>

          <div className="banner-dots">
            {[0, 1].map((i) => (
              <span key={i} className={bSlide === i ? "active" : ""} onClick={() => setBSlide(i)} />
            ))}
          </div>
        </section>

        {/* ── Marquee ── */}
        <div className="gc-marquee">
          <div className="mq-inner">
            {[
              "12 Acres", "9 Towers · 34 Floors", "800+ Residences",
              "23 Retail Spaces", "G+2 Clubhouse", "90 Families / Acre",
              "₹1.38 Cr* Onwards", "20×5 Payment Plan",
              "12 Acres", "9 Towers · 34 Floors", "800+ Residences",
              "23 Retail Spaces", "G+2 Clubhouse", "90 Families / Acre",
              "₹1.38 Cr* Onwards", "20×5 Payment Plan",
            ].map((t, i) => <span key={i}><span className="dot">✦</span> {t}</span>)}
          </div>
        </div>

        {/* ── Overview ── */}
        <section className="section-pad overview-section" id="overview">
          <div className="container-lg">
            <div className="row g-5">
              <div className="col-lg-8" data-aos="fade-right">
                <div className="rera-chip"><i className="fa fa-shield-halved" /> Agent RERA: UPRERAAGT23830 · Project RERA: Coming Soon</div>
                <p className="eyebrow-gc">About the Project</p>
                <h2 className="title-gc">Gaur <em>Chrysalis 2.0</em></h2>
                <p className="sub-gc" style={{ marginBottom: "1.5rem" }}>Sector 22D, Yamuna Expressway, Greater Noida · By Gaurs Group</p>

                <div className="row g-4 align-items-center">
                  <div className="col-md-5">
                    <div className="overview-img" data-aos="fade-up">
                      <SImg src={ABOUT} alt="Gaur Chrysalis 2.0 Overview" height={300} />
                    </div>
                  </div>
                  <div className="col-md-7">
                    <p style={{ lineHeight: 1.85 }}>
                      A new ultra-luxury residential project by <strong>Gaurs Group</strong>, soon to be pre-launched
                      in <strong>Sector 22D, Yamuna Expressway, Greater Noida</strong>. Spread across <strong>12 acres</strong>,
                      Gaur Chrysalis 2.0 offers premium 3 &amp; 4 BHK apartments designed for performance, transparency
                      and sustainable, customer-focused living.
                    </p>
                    <p style={{ lineHeight: 1.85, marginTop: "0.75rem" }}>
                      Seamlessly connected to the Yamuna Expressway, Noida–Greater Noida Expressway and Eastern
                      Peripheral Expressway — with schools, hospitals and Knowledge Parks just a short drive away.
                      With <strong>800+ residences</strong> and <strong>23 retail spaces</strong>, the development
                      balances comfort, connectivity and community living.
                    </p>
                  </div>
                </div>

                <div className="config-row-gc">
                  {[
                    { l: "Land",   v: "12 Acres"   },
                    { l: "Towers", v: "9 · G+34"    },
                    { l: "Units",  v: "800+"        },
                    { l: "Retail", v: "23 Spaces"   },
                    { l: "Price",  v: "₹1.38 Cr*"   },
                  ].map(({ l, v }) => (
                    <div key={l} className="cfg-item-gc">
                      <div className="cfg-label-gc">{l}</div>
                      <div className="cfg-value-gc">{v}</div>
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: "1.5rem" }}>
                  <button className="btn-solid-wine" onClick={() => setShowModal(true)}>
                    <i className="fa fa-download" style={{ marginRight: 6 }} /> Request Brochure
                  </button>
                  <button
                    onClick={() => setShowModal(true)}
                    style={{ border: "1px solid rgba(107,31,42,0.3)", background: "transparent", color: "var(--dark)", padding: "12px 28px", font: "600 0.78rem var(--sans)", letterSpacing: 2, textTransform: "uppercase", cursor: "pointer" }}
                  >
                    Express Interest
                  </button>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="sticky-wrap-gc" data-aos="fade-left">
                  <div className="sticky-form-gc">
                    <div className="sf-head-gc">
                      <h5>Express Your Interest</h5>
                      <small>PRE-REGISTER FOR BEST OFFERS</small>
                    </div>
                    <div className="sf-body-gc"><GcForm /></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Highlights ── */}
        <section className="highlights-section-gc section-pad" id="highlights">
          <div className="container-lg">
            <div className="text-center mb-5" data-aos="fade-up">
              <p className="eyebrow-gc" style={{ color: "var(--gold)", justifyContent: "center" }}>Highlights</p>
              <h2 className="title-gc" style={{ color: "#f3e3c8" }}>
                Gaur Chrysalis 2.0 <em style={{ color: "var(--gold-light)" }}>Highlights</em>
              </h2>
            </div>
            <div className="hl-grid-gc" data-aos="fade-up">
              {highlights.map((text, i) => (
                <div key={i} className="hl-item-gc">
                  <div className="hl-icon-gc"><i className={`fa ${highlightIcons[i]}`} /></div>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Pricing ── */}
        <section className="price-section-gc section-pad" id="pricing">
          <div className="container">
            <div className="row align-items-end mb-4" data-aos="fade-up">
              <div className="col">
                <p className="eyebrow-gc">Investment</p>
                <h2 className="title-gc">Area &amp; <em>Pricing</em></h2>
                <p className="sub-gc">Tentative Area &amp; Pricing</p>
              </div>
              <div className="col-auto">
                <button className="btn-solid-wine" onClick={() => setShowModal(true)}>
                  <i className="fa fa-file-invoice-dollar" style={{ marginRight: 6 }} /> Full Costing Details
                </button>
              </div>
            </div>
            <div className="table-responsive" data-aos="fade-up">
              <table className="price-table-gc">
                <thead>
                  <tr><th>Type</th><th>Area</th><th>Price (Onwards)</th><th>Action</th></tr>
                </thead>
                <tbody>
                  {priceData.map(({ type, area, price }) => (
                    <tr key={type}>
                      <td><strong>{type}</strong></td>
                      <td>{area}</td>
                      <td className="price-tag-gc">{price}</td>
                      <td><button className="enq-link-gc" onClick={() => setShowModal(true)}>Get Costing</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: "0.72rem", color: "#7a6058", marginTop: "1rem", fontStyle: "italic" }}>
              * Tentative pricing — subject to change. Contact us for final costing &amp; payment plan details.
            </p>
          </div>
        </section>

        {/* ── Floor Plans ── */}
        <section className="fp-section-gc section-pad" id="floorplan">
          <div className="container-lg">
            <div className="text-center mb-4" data-aos="fade-up">
              <p className="eyebrow-gc" style={{ justifyContent: "center" }}>Layouts</p>
              <h2 className="title-gc">Master &amp; Unit <em>Plans</em></h2>
            </div>
            <div className="row g-4 justify-content-center" data-aos="fade-up">
              {[
                { img: MASTER_PLAN, label: "Tentative Master Plan Layout" },
                { img: UNIT_PLAN,   label: "Tentative Unit Plan Layout"   },
              ].map(({ img, label }) => (
                <div key={label} className="col-lg-5 col-md-6">
                  <div className="fp-card-gc">
                    <div className="fp-img-wrap-gc" onClick={() => setShowModal(true)}>
                      <SImg src={img} alt={label} height={260} style={{ filter: "blur(5px)", minHeight: 260 }} />
                      <div className="fp-unlock-gc"><span>Unlock Plan</span></div>
                    </div>
                    <div className="fp-info-gc">
                      <div className="fp-name-gc">{label}</div>
                    </div>
                    <button className="fp-btn-gc" onClick={() => setShowModal(true)}>
                      <i className="fa fa-download" /> Request Plan
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Amenities ── */}
        <section className="amenities-section-gc section-pad" id="amenities">
          <div className="container-lg">
            <div className="text-center mb-5" data-aos="fade-up">
              <p className="eyebrow-gc" style={{ color: "var(--gold)", justifyContent: "center" }}>Lifestyle</p>
              <h2 className="title-gc" style={{ color: "#f3e3c8" }}>
                Proposed <em style={{ color: "var(--gold-light)" }}>Amenities</em>
              </h2>
            </div>
            <div className="row g-3" data-aos="fade-up">
              {IMG.AMENITIES.map(({ src, label }) => (
                <div key={label} className="col-6 col-md-4">
                  <div className="ame-card-gc">
                    <SImg src={src} alt={label} height={180} style={{ height: 180, objectFit: "cover" }} />
                    <div className="ame-overlay"><span>{label}</span></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-4" data-aos="fade-up">
              <button className="btn-solid-wine" onClick={() => setShowModal(true)}>Request All Amenities</button>
            </div>
          </div>
        </section>

        {/* ── Tagline ── */}
        <div className="tagline-band-gc">
          <div className="tl-content-gc" data-aos="fade-up">
            <h2>Where <em>Elegance</em> Meets Connectivity</h2>
            <p>
              A 12-acre enclave of low-density living, lavish clubhouse, and boutique retail —
              Gaur Chrysalis 2.0 brings refined living to the heart of Yamuna Expressway.
            </p>
          </div>
        </div>

        {/* ── Gallery ── */}
        <section className="gallery-section-gc section-pad" id="gallery">
          <div className="container-lg">
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4" data-aos="fade-up">
              <div>
                <p className="eyebrow-gc" style={{ color: "var(--gold)" }}>Visual Tour</p>
                <h2 className="title-gc" style={{ color: "#f3e3c8" }}>
                  Project <em style={{ color: "var(--gold-light)" }}>Gallery</em>
                </h2>
              </div>
              <div className="gal-controls-gc">
                <div className="swiper-button-prev gc-gal-prev" />
                <div className="swiper-button-next gc-gal-next" />
              </div>
            </div>
            <div className="swiper gc-gallery-swiper" data-aos="fade-up">
              <div className="swiper-wrapper">
                {IMG.GALLERY.map((src, i) => (
                  <div key={i} className="swiper-slide gal-slide-gc">
                    <img src={src} alt={`Gaur Chrysalis 2.0 Gallery ${i + 1}`} onError={(e) => { e.target.style.display = "none"; }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Location ── */}
        <section className="location-section-gc section-pad" id="location">
          <div className="container-lg">
            <div className="text-center mb-5" data-aos="fade-up">
              <p className="eyebrow-gc" style={{ justifyContent: "center" }}>Connectivity</p>
              <h2 className="title-gc">Location <em>Advantage</em></h2>
              <p className="sub-gc">
                <i className="fa fa-map-marker-alt" style={{ color: "var(--primary)" }} /> Sector 22D, Yamuna Expressway, Greater Noida
              </p>
            </div>
            <div className="row g-4">
              <div className="col-lg-5" data-aos="fade-right">
                <div className="map-embed-wrap">
                  <iframe
                    src="https://www.google.com/maps?q=Gaur+Chrysalis+Sector+22D+Yamuna+Expressway+Greater+Noida&output=embed"
                    title="Gaur Chrysalis 2.0 Location Map"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
              <div className="col-lg-7" data-aos="fade-left">
                <div className="loc-tabs">
                  {locationTabs.map(({ label }, i) => (
                    <button key={label} className={`loc-tab ${locTab === i ? "active" : ""}`} onClick={() => setLocTab(i)}>
                      {label}
                    </button>
                  ))}
                </div>
                <div>
                  {locationTabs[locTab].items.map((item) => (
                    <div key={item} className="loc-item-gc">
                      <i className="fa fa-location-dot" />
                      <strong>{item}</strong>
                    </div>
                  ))}
                </div>
                <button className="btn-solid-wine" style={{ marginTop: "1.5rem" }} onClick={() => setShowModal(true)}>
                  Request Location Details
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── Enquiry ── */}
        <section className="enquiry-section-gc section-pad">
          <div className="container-lg">
            <div className="enq-card-gc" data-aos="fade-up">
              <div className="row g-0">
                <div className="col-lg-7">
                  <div className="enq-inner-gc">
                    <p className="eyebrow-gc">Schedule Visit</p>
                    <h2 className="title-gc">Enquire <em>Now</em></h2>
                    <p className="sub-gc" style={{ marginBottom: "2rem" }}>
                      Share your details &amp; our team will reach out with the best offers.
                    </p>
                    <GcForm inpClass="enq-inp-gc" btnClass="enq-btn-gc" requireEmail />
                  </div>
                </div>
                <div className="col-lg-5" style={{ minHeight: 300, overflow: "hidden" }}>
                  <img src={SITE_VISIT} alt="Schedule Site Visit" height={420} style={{ height: "100%", objectFit: "cover", minHeight: 300 }} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── About Developer ── */}
        <section className="about-section-gc section-pad">
          <div className="container-lg">
            <div className="text-center mb-5" data-aos="fade-up">
              <p className="eyebrow-gc" style={{ color: "var(--gold)", justifyContent: "center" }}>Developer</p>
              <h2 className="title-gc" style={{ color: "#f3e3c8" }}>About <em style={{ color: "var(--gold-light)" }}>Gaur Group</em></h2>
            </div>
            <div className="row g-4" data-aos="fade-up">
              <div className="col-lg-8">
                <div className="about-card-gc">
                  <h4>25 Years of Excellence in NCR Real Estate</h4>
                  <p>
                    For the past 25 years, Gaursons India has been a leading name in the real estate sector of the
                    National Capital Region. With a legacy of excellence and over 45 successful projects, the
                    company has consistently delivered outstanding results, even in challenging times.
                  </p>
                  <p style={{ marginTop: "1rem" }}>
                    Recognized as the best real estate company in Greater Noida West, Gaurs Group is known for
                    superior construction quality, unwavering commitment, and innovative building technology —
                    shaping residential, commercial, retail, hospitality, healthcare, and education sectors across NCR.
                  </p>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="about-card-gc" style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "1rem", alignItems: "center", textAlign: "center" }}>
                  
                  <div style={{ font: "400 0.7rem var(--sans)", color: "rgba(243,227,200,0.5)", letterSpacing: 1 }}>
                    Agent RERA: UPRERAPRJ351477
                  </div>
                  <a href="tel:+919716007900" style={{ color: "var(--gold)", font: "700 1.05rem var(--sans)", display: "flex", alignItems: "center", gap: 8 }}>
                    <i className="fa fa-phone" /> +91 9716007900
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="gc-footer">
          <div className="container-lg">
            <div className="row g-4 align-items-start">
              <div className="col-md-8">
                <div style={{ font: "400 1.3rem var(--serif)", color: "var(--gold-light)", marginBottom: "0.75rem" }}>
                  Gaur Chrysalis 2.0 · Sector 22D, Yamuna Expressway
                </div>
                <div className="footer-text-gc">
                  This project is RERA registered. Agent RERA Number: UPRERAPRJ351477 · Project RERA Number: Coming Soon<br />
                  <a href="https://gaurchrysalis.co/Privacy-Policy.html" target="_blank" rel="noreferrer">Privacy Policy</a>
                  {" · "}
                  <a href="https://gaurchrysalis.co/terms-conditions.html" target="_blank" rel="noreferrer">Terms &amp; Conditions</a>
                </div>
                <div className="footer-disclaimer-gc">
                  The content presented on this website is solely for informational purposes and does not constitute
                  a service offer. Prices mentioned are subject to change without prior notification, and the
                  availability of listed properties is not assured. Images showcased are illustrative and may not
                  precisely represent the actual properties. This website operates as an authorized marketing
                  partner (NINE WALL REALITY PVT. LTD.). Project name used is for branding/interest-generation purposes
                  only and is not the final project name. The project has not yet received RERA clearance and is in
                  the process of registration.
                </div>
              </div>
              <div className="col-md-4 text-center">
                <img src={Logo} alt="Gaur Chrysalis 2.0 Logo" style={{ width: 110, margin: "0 auto", display: "block" }} />
                <p style={{ fontSize: "0.68rem", marginTop: 8, color: "rgba(243,227,200,0.35)" }}>© 2025 gaur group</p>
              </div>
            </div>
          </div>
        </footer>
      </main>

      {/* ── Mobile CTA Bar ── */}
      <div className="mob-cta-gc d-flex d-md-none">
        <a className="wa-mob-gc" href="https://wa.me/919891796429?text=Hi I am interested in Gaur Chrysalis 2.0" target="_blank" rel="noreferrer">
          <i className="fab fa-whatsapp" /><span>WhatsApp</span>
        </a>
        <a href="tel:+919716007900"><i className="fa fa-phone" /><span>Call Now</span></a>
        <button onClick={() => setShowModal(true)}><i className="fa fa-envelope" /><span>Enquire</span></button>
      </div>

      {/* ── Scroll Top ── */}
      <button className={`scroll-top-gc ${showTop ? "show" : ""}`} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        <i className="fa fa-chevron-up" />
      </button>

      {/* ── Modal ── */}
      {showModal && (
        <div className="gc-modal-overlay" onClick={(e) => e.target === e.currentTarget && setShowModal(false)}>
          <div className="gc-modal">
            <button className="modal-x-gc" onClick={() => setShowModal(false)}>×</button>
            <div className="gc-modal-head">
              <p className="mh-tag-gc">Gaurs Group · Sector 22D · Yamuna Expressway</p>
              <h4>Gaur Chrysalis 2.0</h4>
              <p>3 &amp; 4 BHK Apartments · Starting ₹1.38 Cr*</p>
            </div>
            <div className="gc-modal-body">
              <p style={{ textAlign: "center", font: "400 0.88rem var(--sans)", color: "var(--primary)", marginBottom: "1.5rem" }}>
                Register here and avail the best pre-launch offers.
              </p>
              <GcForm requireEmail onDone={() => setShowModal(false)} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
















// import { useState, useEffect, useRef } from "react";
// import Banner1 from "../assetsc/banner1.jpg";
// import Banner2 from "../assetsc/banner2.jpg";
// import ABOUT from "../assetsc/3.webp";
// import MASTER_PLAN from "../assetsc/4.webp";
// import UNIT_PLAN from "../assetsc/5.webp";
// import SITE_VISIT from "../assetsc/6.webp";
// /* ─────────────────────────────────────────────────────────
  //  IMAGE SOURCES
  //  Gallery / amenity / logo / about images are pulled LIVE
  //  from the official gaurchrysalis.co site (no download
  //  needed). Banner & a couple of section visuals are left as
  //  placeholders for you to swap with your own crops if needed.
  //  ───────────────────────────────────────────────────────── */

// const IMG = {
//   LOGO:        `assetsc/images/logo/logo.png`,
//   // BANNER_1:    `../assetsc/banner1.jpg`,
//   // BANNER_2:    `../assetsc/banner2.jpg`,
//   // ABOUT:       `assetscAbout.webp`,
//   // MASTER_PLAN: `assetsc/images/floor-plan/MasterPlan.webp`,
//   // UNIT_PLAN:   `assetsc/images/floor-plan/UnitPlan.webp`,
//   // SITE_VISIT:  `assetsc/images/contact/site_visit.webp`,
//   GALLERY: [
//     "../assetsc/7.webP",
//     "../assetsc/8.webp",
//     "../assetsc/9.webp",
//     "../assetsc/10.webp",
//     "../assetsc/11.webp",
//   ],
//   AMENITIES: [
//     { src: `assetsc/images/amenities/Basketball%20Court.webp`,    label: "Basketball Court"  },
//     { src: `assetsc/images/amenities/Swimming%20Pool.webp`,       label: "Swimming Pool"     },
//     { src: `assetsc/images/amenities/Indoor%20Games%20Zone.webp`, label: "Indoor Games Zone" },
//     { src: `assetsc/images/amenities/Yoga%20Deck.webp`,           label: "Yoga Deck"         },
//     { src: `assetsc/images/amenities/Multipurpose%20Court.webp`,  label: "Multipurpose Court"},
//     { src: `assetsc/images/amenities/Gymnasium.webp`,             label: "Gymnasium"         },
//   ],
//   /* Local placeholders — replace once you have crops ready */
//   TAGLINE_BG: "chrysalis/images/tagline-bg.jpg",     // ← replace
//   FORM_SIDE:  "chrysalis/images/form-side.jpg",      // ← replace
// };

// /* ─── CSS ─── */
// const styles = `
//   @import url("https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Manrope:wght@300;400;500;600;700;800&display=swap");
//   @import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css");
//   @import url("https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.3/css/bootstrap.min.css");
//   @import url("https://cdnjs.cloudflare.com/ajax/libs/Swiper/8.3.1/swiper-bundle.min.css");
//   @import url("https://unpkg.com/aos@2.3.0/dist/aos.css");

//   :root {
//     --primary:       #6b1f2a;
//     --primary-dark:  #4a121a;
//     --gold:          #c1933f;
//     --gold-light:    #e0b768;
//     --cream:         #f7f2ea;
//     --dark:          #241013;
//     --body-color:    #3a2a2c;
//     --whatsapp:      #25d366;
//     --serif:         "Cormorant", serif;
//     --sans:          "Manrope", sans-serif;
//     --wine-gradient: linear-gradient(135deg, #6b1f2a 0%, #8c2e3a 100%);
//     --gold-gradient: linear-gradient(135deg, #c1933f 0%, #e0b768 50%, #a67a30 100%);
//   }

//   *,*::before,*::after { box-sizing:border-box; }
//   html { scroll-behavior:smooth; }
//   body { color:var(--body-color); font:400 1rem var(--sans); overflow-x:hidden; margin:0; }
//   ul { padding-left:0; margin-bottom:0; list-style:none; }
//   a, a:hover { text-decoration:none; color:inherit; }
//   img { width:100%; display:block; }

//   .img-ph {
//     background:linear-gradient(110deg,#ecd9c4 0%,#f7ede0 50%,#ecd9c4 100%);
//     background-size:200% 100%; animation:shimmer 1.6s infinite;
//     display:flex; align-items:center; justify-content:center;
//     font:500 0.72rem var(--sans); color:#8a6332; letter-spacing:1.5px;
//     text-transform:uppercase; min-height:200px;
//   }
//   @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
//   .img-ph span { background:rgba(255,255,255,0.7); padding:5px 12px; border-radius:20px; }

//   .rera-chip {
//     display:inline-flex; align-items:center; gap:6px;
//     background:rgba(193,147,63,0.1); border:1px solid rgba(193,147,63,0.35);
//     padding:4px 12px; font:500 0.68rem var(--sans); letter-spacing:1px;
//     color:var(--gold); border-radius:2px; margin-bottom:0.75rem;
//   }

//   /* ── HEADER ── */
//   .gc-header { width:100%; position:fixed; top:0; left:0; z-index:997;
//     background:linear-gradient(to bottom, rgba(36,16,19,0.85), transparent); transition:all 300ms ease; }
//   .gc-header.scrolled { background:#fff; box-shadow:0 2px 20px rgba(36,16,19,0.12); }
//   .gc-header .hd-inner { display:flex; align-items:center; justify-content:space-between; padding:0 3rem; height:72px; }
//   .gc-logo { width:88px; }
//   .gc-nav { display:flex; gap:2px; }
//   .gc-nav a { color:#fff; padding:8px 12px; font:500 0.75rem var(--sans); text-transform:uppercase;
//     letter-spacing:1.5px; transition:color 200ms; white-space:nowrap; }
//   .gc-header.scrolled .gc-nav a { color:var(--body-color); }
//   .gc-nav a:hover { color:var(--gold); }
//   .gc-cta { display:flex; gap:8px; align-items:center; }
//   .btn-call-gc { display:flex; align-items:center; gap:6px; background:var(--wine-gradient); color:#fff !important;
//     padding:8px 18px; border-radius:2px; font:600 0.75rem var(--sans); text-transform:uppercase; letter-spacing:1px;
//     transition:all 200ms; border:none; cursor:pointer; }
//   .btn-call-gc:hover { opacity:0.9; transform:translateY(-1px); }
//   .btn-wa-gc { display:flex; align-items:center; gap:6px; background:var(--whatsapp); color:#fff !important;
//     padding:8px 18px; border-radius:2px; font:600 0.75rem var(--sans); text-transform:uppercase; letter-spacing:1px;
//     animation:waPulse 2.5s ease-in-out infinite; }
//   @keyframes waPulse { 0%,100%{box-shadow:0 0 0 0 rgba(37,211,102,0.4);} 50%{box-shadow:0 0 0 8px rgba(37,211,102,0);} }
//   .ham { background:none; border:none; cursor:pointer; padding:4px; display:none; flex-direction:column; gap:5px; }
//   .ham span { display:block; width:24px; height:2px; background:#fff; transition:all 0.4s; }
//   .gc-header.scrolled .ham span { background:var(--dark); }
//   .ham.open span:nth-child(1){ transform:rotate(45deg) translate(5px,5px); }
//   .ham.open span:nth-child(2){ opacity:0; }
//   .ham.open span:nth-child(3){ transform:rotate(-45deg) translate(5px,-5px); }

//   .mob-menu { position:fixed; top:72px; right:14px; width:calc(100% - 28px); max-width:340px;
//     background:var(--dark); padding:1.5rem 2rem; box-shadow:0 16px 40px rgba(0,0,0,0.3); display:none; z-index:990; }
//   .mob-menu.open { display:block; }
//   .mob-menu a { display:block; color:#f3e3c8; font:600 1rem var(--serif); padding:0.75rem 0;
//     border-bottom:1px solid rgba(193,147,63,0.18); transition:color 200ms; }
//   .mob-menu a:hover { color:var(--gold); }

//   /* ── BANNER (auto-cycling 2 images) ── */
//   .gc-banner { height:100vh; position:relative; overflow:hidden; }
//   .gc-banner .b-slide { position:absolute; inset:0; opacity:0; transition:opacity 1.2s ease; }
//   .gc-banner .b-slide.active { opacity:1; }
//   .gc-banner .b-slide img { width:100%; height:100%; object-fit:cover; }
//   .gc-banner::after { content:''; position:absolute; inset:0; z-index:1;
//     background:linear-gradient(100deg, rgba(36,16,19,0.82) 0%, rgba(36,16,19,0.4) 55%, transparent 100%); }
//   .banner-content { position:absolute; left:7%; top:50%; transform:translateY(-50%); z-index:2; color:#fff; max-width:600px; }
//   .banner-tag { display:inline-flex; align-items:center; gap:8px; background:rgba(193,147,63,0.18);
//     border:1px solid rgba(193,147,63,0.4); padding:5px 14px; font:600 0.65rem var(--sans);
//     letter-spacing:3px; text-transform:uppercase; color:var(--gold-light); margin-bottom:1.1rem; backdrop-filter:blur(4px); }
//   .banner-title { font:300 4rem var(--serif); line-height:1.08; margin-bottom:0.3rem; }
//   .banner-title strong { font-weight:700; display:block; }
//   .banner-sub { font:400 1rem var(--sans); opacity:0.85; margin-bottom:1rem; }
//   .offer-row { display:flex; flex-direction:column; gap:4px; margin-bottom:1.5rem; }
//   .offer-row span { font:500 0.82rem var(--sans); opacity:0.85; display:flex; align-items:center; gap:8px; }
//   .offer-row span::before { content:'◆'; color:var(--gold); font-size:0.6rem; }
//   .price-pill-gc { display:inline-flex; flex-direction:column; align-items:flex-start; gap:2px;
//     background:var(--gold-gradient); color:var(--dark); padding:10px 22px; margin-bottom:1.75rem; }
//   .price-pill-gc .pp-label { font:500 0.65rem var(--sans); letter-spacing:1.5px; text-transform:uppercase; opacity:0.75; }
//   .price-pill-gc .pp-value { font:700 1.15rem var(--sans); }
//   .banner-actions { display:flex; gap:10px; flex-wrap:wrap; }
//   .btn-solid-wine { background:var(--wine-gradient); color:#fff; border:none; padding:13px 30px;
//     font:600 0.78rem var(--sans); text-transform:uppercase; letter-spacing:2px; cursor:pointer;
//     transition:all 200ms; box-shadow:0 6px 20px rgba(107,31,42,0.4); }
//   .btn-solid-wine:hover { transform:translateY(-2px); box-shadow:0 10px 28px rgba(107,31,42,0.5); }
//   .btn-ghost-cream { border:1px solid rgba(255,255,255,0.45); background:transparent; color:#fff;
//     padding:13px 30px; font:600 0.78rem var(--sans); text-transform:uppercase; letter-spacing:2px; cursor:pointer; transition:all 200ms; }
//   .btn-ghost-cream:hover { border-color:var(--gold-light); color:var(--gold-light); }
//   .banner-dots { position:absolute; bottom:24px; left:7%; z-index:2; display:flex; gap:8px; }
//   .banner-dots span { width:24px; height:3px; background:rgba(255,255,255,0.35); cursor:pointer; transition:all 200ms; }
//   .banner-dots span.active { background:var(--gold); }

//   /* ── Marquee ── */
//   .gc-marquee { background:var(--dark); color:rgba(243,227,200,0.75); padding:10px 0; overflow:hidden; white-space:nowrap; }
//   .gc-marquee .mq-inner { display:inline-flex; gap:3rem; animation:marquee 24s linear infinite;
//     font:600 0.7rem var(--sans); letter-spacing:2px; text-transform:uppercase; }
//   .gc-marquee .mq-inner span.dot { color:var(--gold); }
//   @keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }

//   /* ── Common ── */
//   .section-pad { padding:5rem 0; }
//   .eyebrow-gc { display:inline-flex; align-items:center; gap:10px; font:600 0.65rem var(--sans);
//     letter-spacing:4px; text-transform:uppercase; color:var(--primary); margin-bottom:0.75rem; }
//   .eyebrow-gc::before { content:''; display:block; width:28px; height:2px; background:var(--gold); }
//   .title-gc { font:400 2.8rem var(--serif); line-height:1.15; color:var(--dark); }
//   .title-gc strong { font-weight:600; }
//   .title-gc em { font-style:italic; color:var(--primary); }
//   .sub-gc { font:400 0.95rem var(--sans); color:#7a6058; margin-top:0.4rem; }

//   /* ── About / Overview ── */
//   .overview-section { background:var(--cream); }
//   .config-row-gc { display:flex; flex-wrap:wrap; margin:2rem 0; border:1px solid rgba(107,31,42,0.15); overflow:hidden; }
//   .cfg-item-gc { flex:1; min-width:130px; padding:1.1rem 1.25rem; border-right:1px solid rgba(107,31,42,0.15);
//     text-align:center; background:#fff; transition:background 200ms; }
//   .cfg-item-gc:last-child { border-right:none; }
//   .cfg-item-gc:hover { background:rgba(107,31,42,0.04); }
//   .cfg-label-gc { font:500 0.6rem var(--sans); letter-spacing:2px; text-transform:uppercase; color:var(--primary); margin-bottom:3px; }
//   .cfg-value-gc { font:600 0.92rem var(--serif); color:var(--dark); }
//   .overview-img { overflow:hidden; }
//   .overview-img img { aspect-ratio:4/5; object-fit:cover; }

//   /* sticky form */
//   .sticky-wrap-gc { position:sticky; top:88px; }
//   .sticky-form-gc { background:#fff; box-shadow:0 8px 40px rgba(36,16,19,0.1); border-top:4px solid var(--gold); }
//   .sf-head-gc { background:var(--dark); padding:1.25rem 1.5rem; text-align:center; color:#fff; }
//   .sf-head-gc h5 { font:400 1.1rem var(--serif); color:var(--gold-light); margin:0; }
//   .sf-head-gc small { font:400 0.68rem var(--sans); letter-spacing:2px; opacity:0.55; }
//   .sf-body-gc { padding:1.4rem; }
//   .sf-inp-gc { width:100%; background:#faf5ee; border:none; border-bottom:2px solid rgba(107,31,42,0.25);
//     padding:11px 14px; font:400 0.88rem var(--sans); color:var(--dark); margin-bottom:10px; outline:none; transition:border-color 200ms; }
//   .sf-inp-gc:focus { border-bottom-color:var(--primary); }
//   .sf-sub-gc { width:100%; background:var(--wine-gradient); color:#fff; border:none; padding:13px;
//     font:700 0.75rem var(--sans); letter-spacing:2px; text-transform:uppercase; cursor:pointer; transition:opacity 200ms; }
//   .sf-sub-gc:hover { opacity:0.88; }
//   .sf-status-gc { font:400 0.78rem var(--sans); text-align:center; min-height:18px; margin-bottom:8px; }

//   /* ── Highlights ── */
//   .highlights-section-gc { background:var(--dark); }
//   .hl-grid-gc { display:grid; grid-template-columns:repeat(4,1fr); gap:1px; background:rgba(193,147,63,0.15); }
//   .hl-item-gc { background:var(--dark); padding:2rem 1.5rem; text-align:center; transition:background 250ms; }
//   .hl-item-gc:hover { background:rgba(107,31,42,0.35); }
//   .hl-icon-gc { font-size:1.5rem; color:var(--gold); margin-bottom:0.75rem; }
//   .hl-item-gc p { font:500 0.85rem var(--sans); color:#f3e3c8; margin:0; line-height:1.5; }

//   /* ── Pricing ── */
//   .price-section-gc { background:#fff; }
//   .price-table-gc { width:100%; border-collapse:collapse; }
//   .price-table-gc th { background:var(--dark); color:var(--gold-light); font:600 0.7rem var(--sans);
//     letter-spacing:2px; text-transform:uppercase; padding:14px 20px; text-align:left; }
//   .price-table-gc td { padding:14px 20px; border-bottom:1px solid rgba(107,31,42,0.1); font:400 0.88rem var(--sans); }
//   .price-table-gc tr:hover td { background:rgba(107,31,42,0.04); }
//   .price-tag-gc { font:600 0.85rem var(--sans); color:var(--primary); }
//   .enq-link-gc { background:var(--gold-gradient); color:var(--dark); border:none; padding:7px 18px;
//     font:600 0.7rem var(--sans); letter-spacing:1px; text-transform:uppercase; cursor:pointer; }

//   /* ── Floor Plans ── */
//   .fp-section-gc { background:var(--cream); }
//   .fp-card-gc { background:#fff; border:1px solid rgba(107,31,42,0.12); overflow:hidden; transition:all 250ms; }
//   .fp-card-gc:hover { transform:translateY(-4px); box-shadow:0 12px 36px rgba(36,16,19,0.1); }
//   .fp-img-wrap-gc { position:relative; overflow:hidden; cursor:pointer; }
//   .fp-img-wrap-gc img { transition:filter 300ms; }
//   .fp-unlock-gc { position:absolute; inset:0; background:rgba(36,16,19,0.45); display:flex; align-items:center;
//     justify-content:center; opacity:0; transition:opacity 200ms; }
//   .fp-img-wrap-gc:hover .fp-unlock-gc { opacity:1; }
//   .fp-unlock-gc span { border:1px solid rgba(255,255,255,0.6); color:#fff; padding:9px 22px;
//     font:600 0.72rem var(--sans); letter-spacing:2px; text-transform:uppercase; }
//   .fp-info-gc { padding:1.25rem 1.25rem 0.5rem; }
//   .fp-name-gc { font:600 1.3rem var(--serif); color:var(--dark); }
//   .fp-btn-gc { display:flex; align-items:center; gap:8px; margin:0.75rem 1.25rem 1.25rem;
//     background:var(--wine-gradient); color:#fff; border:none; padding:10px 20px;
//     font:600 0.72rem var(--sans); letter-spacing:1.5px; text-transform:uppercase; cursor:pointer; width:fit-content; transition:opacity 200ms; }
//   .fp-btn-gc:hover { opacity:0.85; }

//   /* ── Amenities ── */
//   .amenities-section-gc { background:var(--primary-dark); position:relative; overflow:hidden; }
//   .ame-card-gc { position:relative; overflow:hidden; border-radius:4px; box-shadow:0 8px 28px rgba(0,0,0,0.25); }
//   .ame-card-gc img { height:180px; object-fit:cover; transition:transform 400ms; }
//   .ame-card-gc:hover img { transform:scale(1.07); }
//   .ame-card-gc .ame-overlay { position:absolute; inset:0; background:linear-gradient(to top, rgba(36,16,19,0.85) 0%, transparent 55%);
//     display:flex; align-items:flex-end; padding:1rem; }
//   .ame-card-gc .ame-overlay span { color:#f3e3c8; font:600 0.85rem var(--sans); letter-spacing:0.5px; }

//   /* ── Gallery ── */
//   .gallery-section-gc { background:var(--dark); }
//   .gal-slide-gc img { height:300px; object-fit:cover; width:100%; }
//   div[class^="swiper-button"] { color:#fff; background:rgba(36,16,19,0.75); width:38px; height:38px;
//     border-radius:50%; border:1px solid rgba(193,147,63,0.35); transition:all 200ms; }
//   div[class^="swiper-button"]:hover { background:var(--primary); border-color:var(--primary); }
//   div[class^="swiper-button"]::after { font-size:0.85rem; }
//   .gal-controls-gc { display:flex; gap:8px; align-items:center; }
//   .gal-controls-gc div { position:static; margin:0; }

//   /* ── Location ── */
//   .location-section-gc { background:var(--cream); }
//   .loc-tabs { display:flex; gap:8px; flex-wrap:wrap; margin-bottom:1.5rem; }
//   .loc-tab { padding:8px 18px; font:600 0.72rem var(--sans); letter-spacing:1px; text-transform:uppercase;
//     background:#fff; border:1px solid rgba(107,31,42,0.2); color:var(--body-color); cursor:pointer; transition:all 200ms; }
//   .loc-tab.active { background:var(--wine-gradient); color:#fff; border-color:transparent; }
//   .loc-item-gc { display:flex; align-items:flex-start; gap:0.75rem; padding:0.7rem 0; border-bottom:1px dashed rgba(107,31,42,0.15); }
//   .loc-item-gc:last-child { border-bottom:none; }
//   .loc-item-gc i { color:var(--gold); margin-top:3px; }
//   .loc-item-gc strong { font:600 0.85rem var(--sans); color:var(--dark); }
//   .map-embed-wrap { overflow:hidden; box-shadow:0 8px 32px rgba(36,16,19,0.12); height:100%; min-height:380px; }
//   .map-embed-wrap iframe { width:100%; height:100%; min-height:380px; border:0; }

//   /* ── Tagline ── */
//   .tagline-band-gc { position:relative; min-height:48vh; display:flex; align-items:center; justify-content:center; overflow:hidden; }
//   .tagline-band-gc::before { content:''; position:absolute; inset:0;
//     background:url('./chrysalis/images/tagline-bg.jpg') center/cover fixed, var(--wine-gradient); }
//   .tagline-band-gc::after { content:''; position:absolute; inset:0; background:rgba(36,16,19,0.6); }
//   .tl-content-gc { position:relative; z-index:2; text-align:center; color:#fff; padding:3rem 2rem; max-width:700px; }
//   .tl-content-gc h2 { font:300 2.6rem var(--serif); line-height:1.25; margin-bottom:0.75rem; }
//   .tl-content-gc h2 em { font-style:italic; color:var(--gold-light); }
//   .tl-content-gc p { font:400 0.92rem var(--sans); opacity:0.78; }

//   /* ── Enquiry ── */
//   .enquiry-section-gc { background:#fff; }
//   .enq-card-gc { overflow:hidden; box-shadow:0 8px 48px rgba(36,16,19,0.08); }
//   .enq-inner-gc { padding:3rem; }
//   .enq-inp-gc { width:100%; background:#faf5ee; border:none; border-bottom:2px solid rgba(107,31,42,0.2);
//     padding:13px 16px; font:400 0.88rem var(--sans); color:var(--dark); margin-bottom:12px; outline:none; transition:border-color 200ms; }
//   .enq-inp-gc:focus { border-bottom-color:var(--primary); }
//   .enq-btn-gc { background:var(--wine-gradient); color:#fff; border:none; padding:13px 36px;
//     font:700 0.78rem var(--sans); letter-spacing:2px; text-transform:uppercase; cursor:pointer; transition:all 200ms; margin-top:4px; }
//   .enq-btn-gc:hover { opacity:0.88; transform:translateY(-1px); }

//   /* ── About Developer ── */
//   .about-section-gc { background:var(--dark); }
//   .about-card-gc { background:rgba(255,255,255,0.04); border:1px solid rgba(193,147,63,0.2); padding:2.5rem; height:100%; }
//   .about-card-gc h4 { font:400 1.5rem var(--serif); color:var(--gold-light); margin-bottom:1rem; }
//   .about-card-gc p { font:400 0.88rem var(--sans); color:rgba(243,227,200,0.65); line-height:1.8; }

//   /* ── Footer ── */
//   .gc-footer { background:var(--dark); padding:2.5rem 0; }
//   .gc-footer a { color:var(--gold-light); }
//   .gc-footer a:hover { color:var(--gold); }
//   .footer-text-gc { font:400 0.78rem var(--sans); color:rgba(243,227,200,0.55); line-height:1.9; }
//   .footer-disclaimer-gc { font:400 0.66rem var(--sans); color:rgba(243,227,200,0.32); margin-top:1rem; line-height:1.7;
//     border-top:1px solid rgba(193,147,63,0.1); padding-top:1rem; }

//   /* ── Mobile CTA ── */
//   .mob-cta-gc { position:fixed; bottom:0; left:0; right:0; display:none; z-index:99; background:var(--dark); }
//   .mob-cta-gc a, .mob-cta-gc button { flex:1; color:#fff; text-align:center; padding:11px 6px;
//     font:600 0.68rem var(--sans); letter-spacing:1px; text-transform:uppercase; border:none;
//     border-right:1px solid rgba(193,147,63,0.15); background:none; cursor:pointer; display:flex;
//     flex-direction:column; align-items:center; gap:3px; }
//   .mob-cta-gc a:last-child, .mob-cta-gc button:last-child { border-right:none; }
//   .mob-cta-gc i { font-size:0.95rem; color:var(--gold); }
//   .mob-cta-gc .wa-mob-gc { background:var(--whatsapp); }
//   .mob-cta-gc .wa-mob-gc i { color:#fff; }

//   /* ── Scroll top ── */
//   .scroll-top-gc { position:fixed; right:14px; bottom:65px; width:38px; height:38px; border-radius:50%;
//     background:var(--wine-gradient); color:#fff; border:none; cursor:pointer; display:flex;
//     align-items:center; justify-content:center; font-size:0.9rem; opacity:0; transition:opacity 300ms; z-index:98; }
//   .scroll-top-gc.show { opacity:1; }

//   /* ── Modal ── */
//   .gc-modal-overlay { position:fixed; inset:0; background:rgba(30,12,15,0.92); backdrop-filter:blur(6px);
//     z-index:9999; display:flex; align-items:center; justify-content:center; padding:1rem; }
//   .gc-modal { background:#fff; max-width:460px; width:100%; position:relative; box-shadow:0 24px 60px rgba(0,0,0,0.4); }
//   .gc-modal-head { background:var(--dark); padding:1.75rem 2rem; text-align:center; }
//   .gc-modal-head .mh-tag-gc { font:500 0.62rem var(--sans); letter-spacing:3px; text-transform:uppercase; color:var(--gold); margin-bottom:6px; }
//   .gc-modal-head h4 { font:400 1.5rem var(--serif); color:#fff; margin:0 0 4px; }
//   .gc-modal-head p { font:400 0.78rem var(--sans); color:rgba(255,255,255,0.5); margin:0; }
//   .gc-modal-body { padding:2rem; }
//   .modal-x-gc { position:absolute; top:-12px; right:-12px; width:34px; height:34px; border-radius:50%;
//     background:#fff; color:var(--dark); border:none; cursor:pointer; font-size:1.1rem; font-weight:700;
//     display:flex; align-items:center; justify-content:center; box-shadow:0 4px 12px rgba(0,0,0,0.2); z-index:1; }
//   .modal-x-gc:hover { background:var(--dark); color:var(--gold); }

//   /* ── Responsive ── */
//   @media (max-width:991px) {
//     .gc-header .hd-inner { padding:0 1.5rem; }
//     .gc-nav { display:none; }
//     .ham { display:flex; }
//     .gc-cta .btn-wa-gc { display:none; }
//     .mob-cta-gc { display:flex; }
//     .scroll-top-gc { bottom:55px; }
//     .hl-grid-gc { grid-template-columns:repeat(2,1fr); }
//     .gc-banner { height:85vh; }
//     .banner-title { font-size:3rem; }
//   }
//   @media (max-width:767px) {
//     .section-pad { padding:3.5rem 0; }
//     .gc-banner { height:auto; aspect-ratio:4/5; margin-top:72px; }
//     .banner-content { left:5%; max-width:90%; }
//     .banner-title { font-size:2.2rem; }
//     .hl-grid-gc { grid-template-columns:1fr 1fr; }
//     .cfg-item-gc { min-width:50%; }
//     .enq-inner-gc { padding:2rem 1.5rem; }
//     .gc-footer { padding-bottom:4rem; }
//   }
//   @media (max-width:575px) {
//     .banner-title { font-size:1.9rem; }
//     .banner-actions { flex-direction:column; }
//     .hl-grid-gc { grid-template-columns:1fr; }
//     .title-gc { font-size:2.1rem; }
//   }
// `;

// /* ─── EmailJS ─── */
// function sendEnquiry(data, onOk, onErr) {
//   if (!window.emailjs) { onErr("EmailJS not ready"); return; }
//   window.emailjs.send("service_fkmfynb", "template_bdjcyq6", data).then(onOk).catch(onErr);
// }

// /* ─── Reusable form ─── */
// function GcForm({ inpClass = "sf-inp-gc", btnClass = "sf-sub-gc", requireEmail = false, onDone }) {
//   const [vals, setVals] = useState({ name: "", mobile: "", email: "" });
//   const [status, setStatus] = useState("");

//   const change = (e) => setVals({ ...vals, [e.target.name]: e.target.value });

//   const submit = (e) => {
//     e.preventDefault();
//     setStatus("Sending…");
//     sendEnquiry(
//       { name: vals.name, mobile: vals.mobile, email: vals.email || "Not Provided" },
//       () => {
//         setStatus("✅ Sent! Our team will call you shortly.");
//         setVals({ name: "", mobile: "", email: "" });
//         onDone?.();
//         window.open(
//           "https://wa.me/918744000006?text=Hi I am interested in Gaur Chrysalis 2.0 at Yamuna Expressway, please share details",
//           "_blank"
//         );
//       },
//       () => setStatus("❌ Failed. Please try again.")
//     );
//   };

//   return (
//     <form onSubmit={submit}>
//       {status && (
//         <div className="sf-status-gc" style={{ color: status.startsWith("✅") ? "#6b1f2a" : status.startsWith("❌") ? "#c0392b" : "#7a6058" }}>
//           {status}
//         </div>
//       )}
//       <input className={inpClass} type="text"  name="name"   placeholder="Full Name *"    required value={vals.name}   onChange={change} />
//       <input className={inpClass} type="tel"   name="mobile" placeholder="Mobile Number *" required value={vals.mobile} onChange={change} />
//       {requireEmail && (
//         <input className={inpClass} type="email" name="email" placeholder="Email Address *" required value={vals.email} onChange={change} />
//       )}
//       <button type="submit" className={btnClass}>Pre-Register Now</button>
//     </form>
//   );
// }

// /* ─── Smart image (placeholder for local-only paths) ─── */
// function SImg({ src, alt, height = 220, style }) {
//   const isLocal = src && src.startsWith("chrysalis/");
//   if (isLocal) {
//     return <div className="img-ph" style={{ minHeight: height, ...style }}><span>📷 {alt}</span></div>;
//   }
//   return <img src={src} alt={alt} style={style} onError={(e) => { e.target.style.display = "none"; }} />;
// }

// /* ─── Main ─── */
// export default function GaurChrysalis2() {
//   const [menuOpen,  setMenuOpen]  = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [scrolled,  setScrolled]  = useState(false);
//   const [showTop,   setShowTop]   = useState(false);
//   const [bSlide,    setBSlide]    = useState(0);
//   const [locTab,    setLocTab]    = useState(0);
//   const swiperDone = useRef(false);

//   useEffect(() => {
//     const load = (src, cb) => {
//       if (document.querySelector(`script[src="${src}"]`)) { cb?.(); return; }
//       const s = document.createElement("script");
//       s.src = src; s.onload = cb; document.body.appendChild(s);
//     };
//     load("https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js",
//       () => window.emailjs?.init("xLfYDZXLlR6IeQ-C6"));
//     load("https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js");
//     load("https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.3/js/bootstrap.min.js");
//     load("https://cdnjs.cloudflare.com/ajax/libs/Swiper/8.3.1/swiper-bundle.min.js", () => {
//       if (!swiperDone.current && window.Swiper) {
//         swiperDone.current = true;
//         new window.Swiper(".gc-gallery-swiper", {
//           slidesPerView: 1, spaceBetween: 8, loop: true,
//           autoplay: { delay: 3200, disableOnInteraction: false },
//           navigation: { nextEl: ".gc-gal-next", prevEl: ".gc-gal-prev" },
//           breakpoints: { 540: { slidesPerView: 2, spaceBetween: 12 }, 1024: { slidesPerView: 3, spaceBetween: 16 } },
//         });
//       }
//     });
//     load("https://unpkg.com/aos@2.3.0/dist/aos.js", () => window.AOS?.init({ duration: 1100, once: true }));
//   }, []);

//   /* banner auto-cycle */
//   useEffect(() => {
//     const t = setInterval(() => setBSlide((s) => (s + 1) % 2), 4500);
//     return () => clearInterval(t);
//   }, []);

//   useEffect(() => {
//     const fn = () => { setScrolled(window.scrollY > 55); setShowTop(window.scrollY > 300); };
//     window.addEventListener("scroll", fn);
//     return () => window.removeEventListener("scroll", fn);
//   }, []);

//   useEffect(() => {
//     const t = setTimeout(() => setShowModal(true), 6000);
//     return () => clearTimeout(t);
//   }, []);

//   const navLinks = [
//     { href: "#overview",   label: "Overview"   },
//     { href: "#highlights", label: "Highlights" },
//     { href: "#pricing",    label: "Pricing"    },
//     { href: "#floorplan",  label: "Floor Plan" },
//     { href: "#amenities",  label: "Amenities"  },
//     { href: "#gallery",    label: "Gallery"    },
//     { href: "#location",   label: "Location"   },
//   ];

//   const highlights = [
//     "Nine majestic towers soaring up to 34 floors",
//     "Only four apartments per floor for exclusivity",
//     "Lavish G+2 clubhouse with lifestyle indulgences",
//     "23 boutique retail spaces within the premises",
//     "Expansive 12-acre residential enclave of elegance",
//     "Seamless access to Yamuna and Noida Expressways",
//     "Excellent connectivity via Eastern Peripheral Expressway",
//     "800+ residences · low-density living at 90 families/acre",
//   ];

//   const highlightIcons = [
//     "fa-building", "fa-door-open", "fa-house-chimney", "fa-store",
//     "fa-tree-city", "fa-road", "fa-route", "fa-users",
//   ];

//   const priceData = [
//     { type: "Optimal 3 BHK + Servant", area: "1625 Sq.Ft.", price: "₹1.38 Cr* onwards" },
//     { type: "Lavish 4 BHK",             area: "1960 Sq.Ft.", price: "₹1.66 Cr* onwards" },
//   ];

//   const locationTabs = [
//     {
//       label: "Connectivity",
//       items: [
//         "Yamuna Expressway – 2 Mins",
//         "Jewar International Airport – 10–15 Mins (Upcoming)",
//         "Pari Chowk, Greater Noida – 15–20 Mins",
//         "Noida–Greater Noida Expressway – 20 Mins",
//         "Sector 18 Noida – 25 Mins",
//         "Akshardham, Delhi – 30–35 Mins",
//         "Knowledge Park / Metro – 15–20 Mins",
//       ],
//     },
//     {
//       label: "Education Hub",
//       items: [
//         "Galgotias University – 10–12 Mins",
//         "Sharda University – 15–20 Mins",
//         "Noida International University – 20–25 Mins",
//         "DPS Greater Noida – 15–18 Mins",
//         "Cambridge School, Greater Noida – 15–20 Mins",
//         "Knowledge Park 1 (Schools) – 15 Mins",
//         "Knowledge Park 2 (Colleges) – 15–20 Mins",
//       ],
//     },
//     {
//       label: "Healthcare",
//       items: [
//         "Yatharth Super Speciality Hospital – 15–20 Mins",
//         "Kailash Hospital, Greater Noida – 20–25 Mins",
//         "Sharda Hospital – 15–20 Mins",
//         "NIIMS Hospital – 20–25 Mins",
//       ],
//     },
//     {
//       label: "Malls / Shopping",
//       items: [
//         "The Grand Venice Mall – 20–25 Mins",
//         "MSX Mall, Greater Noida – 20–25 Mins",
//         "Omaxe Connaught Place – 25–30 Mins",
//         "Ansal Plaza, Greater Noida – 25–30 Mins",
//       ],
//     },
//     {
//       label: "Tech Park",
//       items: [
//         "Stellar Business Park, Greater Noida – 25–30 Mins",
//         "Wegmans Business Park – 30–35 Mins",
//         "Embassy Oxygen Business Park, Noida – 40–45 Mins",
//         "Knowledge Park (Commercial Hub) – 20–25 Mins",
//       ],
//     },
//   ];

//   return (
//     <>
//       <style>{styles}</style>

//       {/* ── Header ── */}
//       <header className={`gc-header ${scrolled ? "scrolled" : ""}`}>
//         <div className="hd-inner">
//           <div className="gc-logo"><img src={IMG.LOGO} alt="Gaur Chrysalis 2.0" /></div>
//           <nav className="gc-nav">
//             {navLinks.map(({ href, label }) => <a key={href} href={href}>{label}</a>)}
//           </nav>
//           <div className="gc-cta">
//             <a href="tel:+919716007900" className="btn-call-gc"><i className="fa fa-phone" /> Call Now</a>
//             <a
//               href="https://wa.me/918744000006?text=Hi I am interested in Gaur Chrysalis 2.0 at Yamuna Expressway, please share details"
//               target="_blank" rel="noreferrer" className="btn-wa-gc"
//             >
//               <i className="fab fa-whatsapp" /> WhatsApp
//             </a>
//             <button className={`ham ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen((o) => !o)}>
//               <span /><span /><span />
//             </button>
//           </div>
//         </div>
//       </header>

//       <div className={`mob-menu ${menuOpen ? "open" : ""}`}>
//         {navLinks.map(({ href, label }) => (
//           <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
//         ))}
//         <a href="tel:+919716007900" style={{ color: "var(--gold)", marginTop: "0.5rem" }}>
//           <i className="fa fa-phone" style={{ marginRight: 8 }} /> +91 9716007900
//         </a>
//       </div>

//       <main>
//         {/* ── Banner ── */}
//         <section className="gc-banner" id="home">
//           {[Banner1, Banner2].map((src, i) => (
//             <div key={i} className={`b-slide ${bSlide === i ? "active" : ""}`}>
//               <img src={src} alt={`Gaur Chrysalis 2.0 Banner ${i + 1}`} />
//             </div>
//           ))}

//           <div className="banner-content">
//             <div className="banner-tag"><i className="fa fa-circle-dot" /> By Gaurs Group · Pre-Launch</div>
//             <h1 className="banner-title">
//               Gaur<br /><strong>Chrysalis 2.0</strong>
//             </h1>
//             <p className="banner-sub">3 &amp; 4 BHK Apartments · Sector 22D, Yamuna Expressway</p>

//             <div className="offer-row">
//               <span>20×5 Payment Plan</span>
//               <span>Launch Offer Upto ₹50 Lacs</span>
//               <span>Noida–Greater Noida Link Rd – 3 Mins</span>
//               <span>Eastern Peripheral Expressway – 5 Mins</span>
//             </div>

//             <div className="price-pill-gc">
//               <span className="pp-label">Luxurious 3 &amp; 4 BHK Starts</span>
//               <span className="pp-value">₹1.38 Cr* Onwards</span>
//             </div>

//             <div className="banner-actions">
//               <button className="btn-solid-wine" onClick={() => setShowModal(true)}>Enquire Now</button>
//               <button className="btn-ghost-cream" onClick={() => setShowModal(true)}>Pre-Register</button>
//             </div>
//           </div>

//           <div className="banner-dots">
//             {[0, 1].map((i) => (
//               <span key={i} className={bSlide === i ? "active" : ""} onClick={() => setBSlide(i)} />
//             ))}
//           </div>
//         </section>

//         {/* ── Marquee ── */}
//         <div className="gc-marquee">
//           <div className="mq-inner">
//             {[
//               "12 Acres", "9 Towers · 34 Floors", "800+ Residences",
//               "23 Retail Spaces", "G+2 Clubhouse", "90 Families / Acre",
//               "₹1.38 Cr* Onwards", "20×5 Payment Plan",
//               "12 Acres", "9 Towers · 34 Floors", "800+ Residences",
//               "23 Retail Spaces", "G+2 Clubhouse", "90 Families / Acre",
//               "₹1.38 Cr* Onwards", "20×5 Payment Plan",
//             ].map((t, i) => <span key={i}><span className="dot">✦</span> {t}</span>)}
//           </div>
//         </div>

//         {/* ── Overview ── */}
//         <section className="section-pad overview-section" id="overview">
//           <div className="container-lg">
//             <div className="row g-5">
//               <div className="col-lg-8" data-aos="fade-right">
//                 <div className="rera-chip"><i className="fa fa-shield-halved" /> Agent RERA: UPRERAAGT23830 · Project RERA: Coming Soon</div>
//                 <p className="eyebrow-gc">About the Project</p>
//                 <h2 className="title-gc">Gaur <em>Chrysalis 2.0</em></h2>
//                 <p className="sub-gc" style={{ marginBottom: "1.5rem" }}>Sector 22D, Yamuna Expressway, Greater Noida · By Gaurs Group</p>

//                 <div className="row g-4 align-items-center">
//                   <div className="col-md-5">
//                     <div className="overview-img" data-aos="fade-up">
//                       <SImg src={ABOUT} alt="Gaur Chrysalis 2.0 Overview" height={300} />
//                     </div>
//                   </div>
//                   <div className="col-md-7">
//                     <p style={{ lineHeight: 1.85 }}>
//                       A new ultra-luxury residential project by <strong>Gaurs Group</strong>, soon to be pre-launched
//                       in <strong>Sector 22D, Yamuna Expressway, Greater Noida</strong>. Spread across <strong>12 acres</strong>,
//                       Gaur Chrysalis 2.0 offers premium 3 &amp; 4 BHK apartments designed for performance, transparency
//                       and sustainable, customer-focused living.
//                     </p>
//                     <p style={{ lineHeight: 1.85, marginTop: "0.75rem" }}>
//                       Seamlessly connected to the Yamuna Expressway, Noida–Greater Noida Expressway and Eastern
//                       Peripheral Expressway — with schools, hospitals and Knowledge Parks just a short drive away.
//                       With <strong>800+ residences</strong> and <strong>23 retail spaces</strong>, the development
//                       balances comfort, connectivity and community living.
//                     </p>
//                   </div>
//                 </div>

//                 <div className="config-row-gc">
//                   {[
//                     { l: "Land",   v: "12 Acres"   },
//                     { l: "Towers", v: "9 · G+34"    },
//                     { l: "Units",  v: "800+"        },
//                     { l: "Retail", v: "23 Spaces"   },
//                     { l: "Price",  v: "₹1.38 Cr*"   },
//                   ].map(({ l, v }) => (
//                     <div key={l} className="cfg-item-gc">
//                       <div className="cfg-label-gc">{l}</div>
//                       <div className="cfg-value-gc">{v}</div>
//                     </div>
//                   ))}
//                 </div>

//                 <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: "1.5rem" }}>
//                   <button className="btn-solid-wine" onClick={() => setShowModal(true)}>
//                     <i className="fa fa-download" style={{ marginRight: 6 }} /> Request Brochure
//                   </button>
//                   <button
//                     onClick={() => setShowModal(true)}
//                     style={{ border: "1px solid rgba(107,31,42,0.3)", background: "transparent", color: "var(--dark)", padding: "12px 28px", font: "600 0.78rem var(--sans)", letterSpacing: 2, textTransform: "uppercase", cursor: "pointer" }}
//                   >
//                     Express Interest
//                   </button>
//                 </div>
//               </div>

//               <div className="col-lg-4">
//                 <div className="sticky-wrap-gc" data-aos="fade-left">
//                   <div className="sticky-form-gc">
//                     <div className="sf-head-gc">
//                       <h5>Express Your Interest</h5>
//                       <small>PRE-REGISTER FOR BEST OFFERS</small>
//                     </div>
//                     <div className="sf-body-gc"><GcForm /></div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* ── Highlights ── */}
//         <section className="highlights-section-gc section-pad" id="highlights">
//           <div className="container-lg">
//             <div className="text-center mb-5" data-aos="fade-up">
//               <p className="eyebrow-gc" style={{ color: "var(--gold)", justifyContent: "center" }}>Highlights</p>
//               <h2 className="title-gc" style={{ color: "#f3e3c8" }}>
//                 Gaur Chrysalis 2.0 <em style={{ color: "var(--gold-light)" }}>Highlights</em>
//               </h2>
//             </div>
//             <div className="hl-grid-gc" data-aos="fade-up">
//               {highlights.map((text, i) => (
//                 <div key={i} className="hl-item-gc">
//                   <div className="hl-icon-gc"><i className={`fa ${highlightIcons[i]}`} /></div>
//                   <p>{text}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* ── Pricing ── */}
//         <section className="price-section-gc section-pad" id="pricing">
//           <div className="container">
//             <div className="row align-items-end mb-4" data-aos="fade-up">
//               <div className="col">
//                 <p className="eyebrow-gc">Investment</p>
//                 <h2 className="title-gc">Area &amp; <em>Pricing</em></h2>
//                 <p className="sub-gc">Tentative Area &amp; Pricing</p>
//               </div>
//               <div className="col-auto">
//                 <button className="btn-solid-wine" onClick={() => setShowModal(true)}>
//                   <i className="fa fa-file-invoice-dollar" style={{ marginRight: 6 }} /> Full Costing Details
//                 </button>
//               </div>
//             </div>
//             <div className="table-responsive" data-aos="fade-up">
//               <table className="price-table-gc">
//                 <thead>
//                   <tr><th>Type</th><th>Area</th><th>Price (Onwards)</th><th>Action</th></tr>
//                 </thead>
//                 <tbody>
//                   {priceData.map(({ type, area, price }) => (
//                     <tr key={type}>
//                       <td><strong>{type}</strong></td>
//                       <td>{area}</td>
//                       <td className="price-tag-gc">{price}</td>
//                       <td><button className="enq-link-gc" onClick={() => setShowModal(true)}>Get Costing</button></td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//             <p style={{ fontSize: "0.72rem", color: "#7a6058", marginTop: "1rem", fontStyle: "italic" }}>
//               * Tentative pricing — subject to change. Contact us for final costing &amp; payment plan details.
//             </p>
//           </div>
//         </section>

//         {/* ── Floor Plans ── */}
//         <section className="fp-section-gc section-pad" id="floorplan">
//           <div className="container-lg">
//             <div className="text-center mb-4" data-aos="fade-up">
//               <p className="eyebrow-gc" style={{ justifyContent: "center" }}>Layouts</p>
//               <h2 className="title-gc">Master &amp; Unit <em>Plans</em></h2>
//             </div>
//             <div className="row g-4 justify-content-center" data-aos="fade-up">
//               {[
//                 { img: MASTER_PLAN, label: "Tentative Master Plan Layout" },
//                 { img: UNIT_PLAN,   label: "Tentative Unit Plan Layout"   },
//               ].map(({ img, label }) => (
//                 <div key={label} className="col-lg-5 col-md-6">
//                   <div className="fp-card-gc">
//                     <div className="fp-img-wrap-gc" onClick={() => setShowModal(true)}>
//                       <SImg src={img} alt={label} height={260} style={{ filter: "blur(5px)", minHeight: 260 }} />
//                       <div className="fp-unlock-gc"><span>Unlock Plan</span></div>
//                     </div>
//                     <div className="fp-info-gc">
//                       <div className="fp-name-gc">{label}</div>
//                     </div>
//                     <button className="fp-btn-gc" onClick={() => setShowModal(true)}>
//                       <i className="fa fa-download" /> Request Plan
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* ── Amenities ── */}
//         <section className="amenities-section-gc section-pad" id="amenities">
//           <div className="container-lg">
//             <div className="text-center mb-5" data-aos="fade-up">
//               <p className="eyebrow-gc" style={{ color: "var(--gold)", justifyContent: "center" }}>Lifestyle</p>
//               <h2 className="title-gc" style={{ color: "#f3e3c8" }}>
//                 Proposed <em style={{ color: "var(--gold-light)" }}>Amenities</em>
//               </h2>
//             </div>
//             <div className="row g-3" data-aos="fade-up">
//               {IMG.AMENITIES.map(({ src, label }) => (
//                 <div key={label} className="col-6 col-md-4">
//                   <div className="ame-card-gc">
//                     <SImg src={src} alt={label} height={180} style={{ height: 180, objectFit: "cover" }} />
//                     <div className="ame-overlay"><span>{label}</span></div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <div className="text-center mt-4" data-aos="fade-up">
//               <button className="btn-solid-wine" onClick={() => setShowModal(true)}>Request All Amenities</button>
//             </div>
//           </div>
//         </section>

//         {/* ── Tagline ── */}
//         <div className="tagline-band-gc">
//           <div className="tl-content-gc" data-aos="fade-up">
//             <h2>Where <em>Elegance</em> Meets Connectivity</h2>
//             <p>
//               A 12-acre enclave of low-density living, lavish clubhouse, and boutique retail —
//               Gaur Chrysalis 2.0 brings refined living to the heart of Yamuna Expressway.
//             </p>
//           </div>
//         </div>

//         {/* ── Gallery ── */}
//         <section className="gallery-section-gc section-pad" id="gallery">
//           <div className="container-lg">
//             <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4" data-aos="fade-up">
//               <div>
//                 <p className="eyebrow-gc" style={{ color: "var(--gold)" }}>Visual Tour</p>
//                 <h2 className="title-gc" style={{ color: "#f3e3c8" }}>
//                   Project <em style={{ color: "var(--gold-light)" }}>Gallery</em>
//                 </h2>
//               </div>
//               <div className="gal-controls-gc">
//                 <div className="swiper-button-prev gc-gal-prev" />
//                 <div className="swiper-button-next gc-gal-next" />
//               </div>
//             </div>
//             <div className="swiper gc-gallery-swiper" data-aos="fade-up">
//               <div className="swiper-wrapper">
//                 {IMG.GALLERY.map((src, i) => (
//                   <div key={i} className="swiper-slide gal-slide-gc">
//                     <img src={src} alt={`Gaur Chrysalis 2.0 Gallery ${i + 1}`} onError={(e) => { e.target.style.display = "none"; }} />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* ── Location ── */}
//         <section className="location-section-gc section-pad" id="location">
//           <div className="container-lg">
//             <div className="text-center mb-5" data-aos="fade-up">
//               <p className="eyebrow-gc" style={{ justifyContent: "center" }}>Connectivity</p>
//               <h2 className="title-gc">Location <em>Advantage</em></h2>
//               <p className="sub-gc">
//                 <i className="fa fa-map-marker-alt" style={{ color: "var(--primary)" }} /> Sector 22D, Yamuna Expressway, Greater Noida
//               </p>
//             </div>
//             <div className="row g-4">
//               <div className="col-lg-5" data-aos="fade-right">
//                 <div className="map-embed-wrap">
//                   <iframe
//                     src="https://www.google.com/maps?q=Gaur+Chrysalis+Sector+22D+Yamuna+Expressway+Greater+Noida&output=embed"
//                     title="Gaur Chrysalis 2.0 Location Map"
//                     loading="lazy"
//                     referrerPolicy="no-referrer-when-downgrade"
//                   />
//                 </div>
//               </div>
//               <div className="col-lg-7" data-aos="fade-left">
//                 <div className="loc-tabs">
//                   {locationTabs.map(({ label }, i) => (
//                     <button key={label} className={`loc-tab ${locTab === i ? "active" : ""}`} onClick={() => setLocTab(i)}>
//                       {label}
//                     </button>
//                   ))}
//                 </div>
//                 <div>
//                   {locationTabs[locTab].items.map((item) => (
//                     <div key={item} className="loc-item-gc">
//                       <i className="fa fa-location-dot" />
//                       <strong>{item}</strong>
//                     </div>
//                   ))}
//                 </div>
//                 <button className="btn-solid-wine" style={{ marginTop: "1.5rem" }} onClick={() => setShowModal(true)}>
//                   Request Location Details
//                 </button>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* ── Enquiry ── */}
//         <section className="enquiry-section-gc section-pad">
//           <div className="container-lg">
//             <div className="enq-card-gc" data-aos="fade-up">
//               <div className="row g-0">
//                 <div className="col-lg-7">
//                   <div className="enq-inner-gc">
//                     <p className="eyebrow-gc">Schedule Visit</p>
//                     <h2 className="title-gc">Enquire <em>Now</em></h2>
//                     <p className="sub-gc" style={{ marginBottom: "2rem" }}>
//                       Share your details &amp; our team will reach out with the best offers.
//                     </p>
//                     <GcForm inpClass="enq-inp-gc" btnClass="enq-btn-gc" requireEmail />
//                   </div>
//                 </div>
//                 <div className="col-lg-5" style={{ minHeight: 300, overflow: "hidden" }}>
//                   <SImg img:SITE_VISIT   alt="Schedule Site Visit" height={420} style={{ height: "100%", objectFit: "cover", minHeight: 300 }} />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* ── About Developer ── */}
//         <section className="about-section-gc section-pad">
//           <div className="container-lg">
//             <div className="text-center mb-5" data-aos="fade-up">
//               <p className="eyebrow-gc" style={{ color: "var(--gold)", justifyContent: "center" }}>Developer</p>
//               <h2 className="title-gc" style={{ color: "#f3e3c8" }}>About <em style={{ color: "var(--gold-light)" }}>Gaur Group</em></h2>
//             </div>
//             <div className="row g-4" data-aos="fade-up">
//               <div className="col-lg-8">
//                 <div className="about-card-gc">
//                   <h4>25 Years of Excellence in NCR Real Estate</h4>
//                   <p>
//                     For the past 25 years, Gaursons India has been a leading name in the real estate sector of the
//                     National Capital Region. With a legacy of excellence and over 45 successful projects, the
//                     company has consistently delivered outstanding results, even in challenging times.
//                   </p>
//                   <p style={{ marginTop: "1rem" }}>
//                     Recognized as the best real estate company in Greater Noida West, Gaurs Group is known for
//                     superior construction quality, unwavering commitment, and innovative building technology —
//                     shaping residential, commercial, retail, hospitality, healthcare, and education sectors across NCR.
//                   </p>
//                 </div>
//               </div>
//               <div className="col-lg-4">
//                 <div className="about-card-gc" style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "1rem", alignItems: "center", textAlign: "center" }}>
//                   <div style={{ font: "400 1.1rem var(--serif)", color: "var(--gold-light)" }}>Marketing Partner</div>
//                   <div style={{ font: "700 1.1rem var(--sans)", color: "#f3e3c8" }}>PropSolutions4U Pvt. Ltd.</div>
//                   <div style={{ font: "400 0.7rem var(--sans)", color: "rgba(243,227,200,0.5)", letterSpacing: 1 }}>
//                     Agent RERA: UPRERAAGT23830
//                   </div>
//                   <a href="tel:+919716007900" style={{ color: "var(--gold)", font: "700 1.05rem var(--sans)", display: "flex", alignItems: "center", gap: 8 }}>
//                     <i className="fa fa-phone" /> +91 9716007900
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* ── Footer ── */}
//         <footer className="gc-footer">
//           <div className="container-lg">
//             <div className="row g-4 align-items-start">
//               <div className="col-md-8">
//                 <div style={{ font: "400 1.3rem var(--serif)", color: "var(--gold-light)", marginBottom: "0.75rem" }}>
//                   Gaur Chrysalis 2.0 · Sector 22D, Yamuna Expressway
//                 </div>
//                 <div className="footer-text-gc">
//                   This project is RERA registered. Agent RERA Number: UPRERAAGT23830 · Project RERA Number: Coming Soon<br />
//                   <a href="https://gaurchrysalis.co/Privacy-Policy.html" target="_blank" rel="noreferrer">Privacy Policy</a>
//                   {" · "}
//                   <a href="https://gaurchrysalis.co/terms-conditions.html" target="_blank" rel="noreferrer">Terms &amp; Conditions</a>
//                 </div>
//                 <div className="footer-disclaimer-gc">
//                   The content presented on this website is solely for informational purposes and does not constitute
//                   a service offer. Prices mentioned are subject to change without prior notification, and the
//                   availability of listed properties is not assured. Images showcased are illustrative and may not
//                   precisely represent the actual properties. This website operates as an authorized marketing
//                   partner (PropSolutions4U Pvt. Ltd). Project name used is for branding/interest-generation purposes
//                   only and is not the final project name. The project has not yet received RERA clearance and is in
//                   the process of registration.
//                 </div>
//               </div>
//               <div className="col-md-4 text-center">
//                 <img src={IMG.LOGO} alt="Gaur Chrysalis 2.0 Logo" style={{ width: 110, margin: "0 auto", display: "block" }} />
//                 <p style={{ fontSize: "0.68rem", marginTop: 8, color: "rgba(243,227,200,0.35)" }}>© 2025 PropSolutions4U Pvt. Ltd.</p>
//               </div>
//             </div>
//           </div>
//         </footer>
//       </main>

//       {/* ── Mobile CTA Bar ── */}
//       <div className="mob-cta-gc d-flex d-md-none">
//         <a className="wa-mob-gc" href="https://wa.me/918744000006?text=Hi I am interested in Gaur Chrysalis 2.0" target="_blank" rel="noreferrer">
//           <i className="fab fa-whatsapp" /><span>WhatsApp</span>
//         </a>
//         <a href="tel:+919716007900"><i className="fa fa-phone" /><span>Call Now</span></a>
//         <button onClick={() => setShowModal(true)}><i className="fa fa-envelope" /><span>Enquire</span></button>
//       </div>

//       {/* ── Scroll Top ── */}
//       <button className={`scroll-top-gc ${showTop ? "show" : ""}`} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
//         <i className="fa fa-chevron-up" />
//       </button>

//       {/* ── Modal ── */}
//       {showModal && (
//         <div className="gc-modal-overlay" onClick={(e) => e.target === e.currentTarget && setShowModal(false)}>
//           <div className="gc-modal">
//             <button className="modal-x-gc" onClick={() => setShowModal(false)}>×</button>
//             <div className="gc-modal-head">
//               <p className="mh-tag-gc">Gaurs Group · Sector 22D · Yamuna Expressway</p>
//               <h4>Gaur Chrysalis 2.0</h4>
//               <p>3 &amp; 4 BHK Apartments · Starting ₹1.38 Cr*</p>
//             </div>
//             <div className="gc-modal-body">
//               <p style={{ textAlign: "center", font: "400 0.88rem var(--sans)", color: "var(--primary)", marginBottom: "1.5rem" }}>
//                 Register here and avail the best pre-launch offers.
//               </p>
//               <GcForm requireEmail onDone={() => setShowModal(false)} />
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }