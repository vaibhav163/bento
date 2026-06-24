import { useState, useEffect, useRef } from "react";
import Logo from "../assets/Gaurslogo.png";
import BANNER_DESKTOP from "../assets/bannerstudio.jpg";
import Mobile from "../assets/mobile.jpeg";
import Location from "../assets/gaurlocationmap.jpg";
import Banner from "../assets/bannerstudio.jpg";
import Qr from "../bento/images/Capture.jpg";
import G1 from "../bento/images/g1.jpg";
import G2 from "../bento/images/g2.jpg";  
import G3 from "../bento/images/g3.jpg";
import G4 from "../bento/images/g4.jpg";
import Sw from "../assets/swimming-pool.webp";
import Th from "../assets/theater.jpg";
import Ol from "../assets/office-launge.webp";
import Ss from "../assets/spa-salon.jpg";
import Gym from "../assets/gym.webp";
import Rest from "../assets/restro.jpeg";
import Rl from "../assets/Rl.jpeg";
import Od from "../assets/Od.jpeg";
import Fst from "../assets/3bhk-floorplan.jpg";
import Sst from "../assets/4bhk-floorplan.jpg";
import Builder from "../assets/builder_img.jpg";

/* ─────────────────────────────────────────────
   IMAGE PLACEHOLDERS  (replace src values with
   your own image paths once assets are ready)
   ─────────────────────────────────────────────
   BANNER_DESKTOP   – full-width hero desktop  (≥561 px)
   BANNER_MOBILE    – hero image mobile        (≤560 px)
   LOGO             – top-left logo/wordmark
   OVERVIEW_BG      – textured/pattern section bg
   AMENITIES_BG     – amenity section backdrop
   TAGLINE_BG       – full-bleed mid-page image
   LOCATION_MAP     – blurred location map img
   FORM_SIDE        – enquiry section right-col image
   GALLERY_1..4     – gallery slider images
   AME_1..8         – amenity icon / thumbnail images
   QR_CODE          – footer QR code
   ───────────────────────────────────────────── */

const IMG = {
  BANNER_DESKTOP: "bento/images/banner-desktop.jpg",   // ← replace 
  BANNER_MOBILE:  "bento/images/banner-mobile.jpg",    // ← replace
  LOGO:           "bento/images/logo.png",             // ← replace
  OVERVIEW_BG:    "bento/images/overview-bg.jpg",      // ← replace
  AMENITIES_BG:   "bento/images/amenities-bg.jpg",     // ← replace
  TAGLINE_BG:     "bento/images/tagline-bg.jpg",       // ← replace
  LOCATION_MAP:   "bento/images/location-map.jpg",     // ← replace
  FORM_SIDE:      "bento/images/form-side.jpg",        // ← replace
  GALLERY: [G1, G2, G3, G4],            // ← replace
  AMENITIES: [
    { src: Gym,       label: "Gymnasium" },
    { src: Ss,       label: "Spa & Salon" },
    { src: Rest,label: "Restaurant" },
    { src: Th,   label: "Theater" },
    { src: Ol,    label: "Office Lounge" },
    { src: Rl,      label: "Rolling Lawns" },
    { src: Od,    label: "Outdoor Dining" },
    { src: Sw,    label: "Swimming Pool" },
  ],
  QR_CODE: "bento/images/capture.JPG",                    // ← replace
};

/* ─── CSS ─── */
const styles = `
  @import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Jost:wght@300;400;500;600;700&display=swap");
  @import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css");
  @import url("https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.3/css/bootstrap.min.css");
  @import url("https://cdnjs.cloudflare.com/ajax/libs/Swiper/8.3.1/swiper-bundle.min.css");
  @import url("https://unpkg.com/aos@2.3.0/dist/aos.css");

  :root {
    --primary:      #8B5E2E;
    --primary-dark: #4a1e06;
    --gold:         #C9A84C;
    --gold-light:   #e8c97a;
    --cream:        #f5efe6;
    --dark-brown:   #2b0f05;
    --body-color:   #3d2010;
    --whatsapp:     #25d366;
    --serif:        "Cormorant Garamond", serif;
    --sans:         "Jost", sans-serif;
    --gold-gradient: linear-gradient(135deg, #c9a84c 0%, #f0d78c 50%, #b8892a 100%);
    --dark-gradient: linear-gradient(135deg, #2b0f05 0%, #4a1e06 100%);
  }

  *, *::before, *::after { box-sizing: border-box; }
  * {
  max-width: 100%;
}






html, body {
  overflow-x: hidden;
}
  .row {
  margin-left: 0 !important;
  margin-right: 0 !important;
}
  .container,
.container-lg {
  padding-left: 12px !important;
  padding-right: 12px !important;
}
  .overview-section .row {
  margin-left: 0;
  margin-right: 0;
}








  html { scroll-behavior: smooth; }
  body { color: var(--body-color); font: 400 1rem var(--sans); overflow-x: hidden; margin: 0; width : 100%; }
  ul  { padding-left: 0; margin-bottom: 0; list-style: none; }
  a, a:hover { text-decoration: none; color: inherit; }
  img { width: 100%; display: block; }

  /* ── placeholder shimmer for images not yet added ── */
  .img-placeholder {
    background: linear-gradient(110deg, #e8d5b0 0%, #f5ece0 50%, #e8d5b0 100%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    display: flex;
    align-items: center;
    justify-content: center;
    font: 600 0.75rem var(--sans);
    color: #9b7a4a;
    letter-spacing: 1px;
    text-transform: uppercase;
    min-height: 200px;
  }
  @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
  .img-placeholder span { background: rgba(255,255,255,0.6); padding: 4px 10px; border-radius: 4px; }

  /* ── Header ── */
  .bento-header {
    width: 100%; position: fixed; top: 0; left: 0; z-index: 997;
    background: linear-gradient(to bottom, rgba(43,15,5,0.85), transparent);
    transition: all 300ms ease;
  }
  .bento-header.scrolled {
    background: #fff;
    box-shadow: 0 4px 24px rgba(43,15,5,0.12);
  }
  .bento-header .hd-inner {
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 3rem; height: 72px;
  }
  .bento-logo { width: 90px; }
  .bento-logo img { width: 100%; }

  .bento-nav { display: flex; gap: 8px; }
  .bento-nav a {
    color: #fff; padding: 8px 14px; font: 500 0.8rem var(--sans);
    text-transform: uppercase; letter-spacing: 1.5px;
    transition: color 200ms; white-space: nowrap;
  }
  .bento-header.scrolled .bento-nav a { color: var(--body-color); }
  .bento-nav a:hover { color: var(--gold); }

  .bento-cta { display: flex; gap: 10px; align-items: center; }
  .btn-call {
    display: flex; align-items: center; gap: 6px;
    background: var(--gold-gradient); color: var(--dark-brown) !important;
    padding: 8px 20px; border-radius: 40px; font: 600 0.8rem var(--sans);
    text-transform: uppercase; letter-spacing: 1px;
    box-shadow: 0 4px 16px rgba(201,168,76,0.35);
    transition: all 200ms;
  }
  .btn-call:hover { opacity: 0.9; transform: translateY(-1px); }
  .btn-wa {
    display: flex; align-items: center; gap: 6px;
    background: var(--whatsapp); color: #fff !important;
    padding: 8px 20px; border-radius: 40px; font: 600 0.8rem var(--sans);
    animation: waPulse 2.5s ease-in-out infinite;
  }
  @keyframes waPulse {
    0%,100% { box-shadow: 0 0 0 0 rgba(37,211,102,0.4); }
    50%      { box-shadow: 0 0 0 8px rgba(37,211,102,0); }
  }

  /* hamburger */
  .ham { background: none; border: none; cursor: pointer; padding: 4px; display: none; flex-direction: column; gap: 5px; }
  .ham span { display: block; width: 24px; height: 2px; background: #fff; transition: all 0.4s; }
  .bento-header.scrolled .ham span { background: var(--dark-brown); }
  .ham.open span:nth-child(1) { transform: rotate(45deg) translate(5px,5px); }
  .ham.open span:nth-child(2) { opacity: 0; }
  .ham.open span:nth-child(3) { transform: rotate(-45deg) translate(5px,-5px); }

  /* mobile menu */
  .mob-menu {
    position: fixed; top: 72px; right: 16px; width: calc(100% - 32px); max-width: 340px;
    background: var(--dark-brown); padding: 1.5rem 2rem;
    box-shadow: 0 16px 40px rgba(0,0,0,0.3); display: none; z-index: 990;
  }
  .mob-menu.open { display: block; }
  .mob-menu a {
    display: block; color: var(--cream); font: 600 1.1rem var(--serif);
    padding: 0.8rem 0; border-bottom: 1px solid rgba(201,168,76,0.2);
    letter-spacing: 0.5px; transition: color 200ms;
  }
  .mob-menu a:hover { color: var(--gold); }

  /* ── Banner ── */
  .bento-banner { height: 100vh; position: relative; overflow: hidden; }
  .bento-banner picture, .bento-banner img { height: 100%; object-fit: cover; }
  .bento-banner::after {
    content: '';  position: absolute; inset: 0;
    background: linear-gradient(to right, rgba(43,15,5,0.7) 0%, rgba(43,15,5,0.2) 60%, transparent 100%);
  }
  .banner-content {
    position: absolute; left: 8%; top: 50%; transform: translateY(-50%);
    z-index: 2; color: #fff; max-width: 560px;
  }
  .banner-eyebrow {
    font: 500 0.75rem var(--sans); letter-spacing: 4px; text-transform: uppercase;
    color: var(--gold); margin-bottom: 1rem; display: flex; align-items: center; gap: 10px;
  }
  .banner-eyebrow::before { content: ''; display: block; width: 40px; height: 1px; background: var(--gold); }
  .banner-title { font: 300 4rem var(--serif); line-height: 1.1; margin-bottom: 0.5rem; }
  .banner-title strong { font-weight: 600; color: var(--gold-light); }
  .banner-sub { font: 400 1.1rem var(--serif); font-style: italic; margin-bottom: 1.5rem; opacity: 0.85; }
  .banner-price-tag {
    display: inline-block; border: 1px solid rgba(201,168,76,0.5);
    background: rgba(201,168,76,0.12); backdrop-filter: blur(6px);
    padding: 10px 24px; font: 600 1rem var(--sans); letter-spacing: 1px;
    color: var(--gold-light); margin-bottom: 2rem;
  }
  .banner-btns { display: flex; gap: 12px; flex-wrap: wrap; }
  .btn-primary-gold {
    background: var(--gold-gradient); color: var(--dark-brown);
    padding: 14px 32px; font: 600 0.8rem var(--sans); text-transform: uppercase;
    letter-spacing: 2px; border: none; cursor: pointer; transition: all 200ms;
    box-shadow: 0 8px 24px rgba(201,168,76,0.3);
  }
  .btn-primary-gold:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(201,168,76,0.4); }
  .btn-outline-gold {
    border: 1px solid rgba(255,255,255,0.5); background: transparent;
    color: #fff; padding: 14px 32px; font: 600 0.8rem var(--sans);
    text-transform: uppercase; letter-spacing: 2px; cursor: pointer; transition: all 200ms;
  }
  .btn-outline-gold:hover { border-color: var(--gold); color: var(--gold); }

  /* ── Section common ── */
  .section-pad { padding: 5rem 0; }
  .section-pad-sm { padding: 3rem 0; }
  .section-heading { margin-bottom: 2.5rem; }
  .section-eyebrow {
    display: inline-flex; align-items: center; gap: 10px;
    font: 500 0.7rem var(--sans); letter-spacing: 4px; text-transform: uppercase;
    color: var(--gold); margin-bottom: 0.75rem;
  }
  .section-eyebrow::after { content: ''; display: block; width: 30px; height: 1px; background: var(--gold); }
  .section-title { font: 400 2.75rem var(--serif); line-height: 1.15; color: var(--dark-brown); }
  .section-title span { color: var(--primary); }
  .section-subtitle { font: 400 1rem var(--sans); color: #7a5030; margin-top: 0.5rem; }

  /* ── Overview ── */
  .overview-section { background: var(--cream); }
  .overview-bg { background: url('./bento/images/overview-bg.jpg') center/cover; }
  .config-strip {
    display: flex; flex-wrap: wrap; gap: 0; margin: 2rem 0;
    border: 1px solid rgba(139,94,46,0.2); overflow: hidden;
  }
  .config-item {
    flex: 1; min-width: 120px; padding: 1.25rem 1.5rem;
    border-right: 1px solid rgba(139,94,46,0.2); text-align: center;
  }
  .config-item:last-child { border-right: none; }
  .config-item .ci-label { font: 500 0.65rem var(--sans); letter-spacing: 2px; text-transform: uppercase; color: var(--primary); margin-bottom: 4px; }
  .config-item .ci-value { font: 600 1rem var(--serif); color: var(--dark-brown); }

  /* ── Sticky form ── */
  .sticky-form-wrap { position: sticky; top: 88px; }
  .sticky-form {
    background: #fff;
    box-shadow: 0 8px 40px rgba(43,15,5,0.12);
    border-top: 4px solid var(--gold);
  }
  .sticky-form .form-head {
    padding: 1.25rem 1.5rem; background: var(--dark-brown);
    text-align: center; color: var(--gold-light);
    font: 400 1.1rem var(--serif); letter-spacing: 1px;
  }
  .sticky-form form { padding: 1.5rem; }
  .sf-input {
    width: 100%; background: #faf6f0; border: none;
    border-bottom: 2px solid var(--gold); padding: 12px 14px;
    font: 400 0.9rem var(--sans); color: var(--dark-brown);
    margin-bottom: 12px; outline: none; transition: border-color 200ms;
  }
  .sf-input:focus { border-bottom-color: var(--primary-dark); }
  .sf-btn {
    width: 100%; background: var(--gold-gradient);
    color: var(--dark-brown); border: none; padding: 14px;
    font: 700 0.8rem var(--sans); letter-spacing: 2px; text-transform: uppercase;
    cursor: pointer; transition: all 200ms;
  }
  .sf-btn:hover { opacity: 0.9; }
  .sf-status { font: 400 0.8rem var(--sans); text-align: center; min-height: 20px; margin-bottom: 8px; }

  /* ── Highlights ── */
  .highlights-section { background: var(--dark-brown); color: #fff; }
  .hl-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: rgba(201,168,76,0.2); }
  .hl-item {
    background: var(--dark-brown); padding: 2.5rem 2rem; text-align: center;
    transition: background 250ms;
  }
  .hl-item:hover { background: rgba(201,168,76,0.08); }
  .hl-icon { font-size: 2rem; color: var(--gold); margin-bottom: 1rem; }
  .hl-item h4 { font: 600 1.4rem var(--serif); color: var(--gold-light); margin-bottom: 0.4rem; }
  .hl-item p { font: 400 0.85rem var(--sans); color: rgba(245,239,230,0.65); margin: 0; }

  /* ── Amenities ── */
  .amenities-section { background: var(--dark-brown); position: relative; overflow: hidden; }
  .amenities-section::before {
    content: ''; position: absolute; inset: 0;
    background: url('./bento/images/amenities-bg.jpg') center/cover;
    opacity: 0.25;
  }
  .ame-card {
    position: relative; border-radius: 4px; overflow: hidden;
    background: rgba(43,15,5,0.85); backdrop-filter: blur(4px);
    border: 1px solid rgba(201,168,76,0.2); transition: all 250ms;
    text-align: center; padding-bottom: 1rem;
  }
  .ame-card:hover { border-color: var(--gold); transform: translateY(-4px); }
  .ame-card .ame-img { height: 130px; overflow: hidden; }
  .ame-card .ame-img img { height: 100%; object-fit: cover; transition: transform 400ms; }
  .ame-card:hover .ame-img img { transform: scale(1.06); }
  .ame-card .ame-label {
    color: var(--gold-light); font: 500 0.75rem var(--sans);
    letter-spacing: 2px; text-transform: uppercase; padding: 0.75rem 0.5rem 0;
  }

  /* ── Floor Plans ── */
  .fp-section { background: var(--cream); }
  .fp-card {
    background: #fff; box-shadow: 8px 8px 0 rgba(139,94,46,0.12);
    border: 1px solid rgba(139,94,46,0.15); overflow: hidden; transition: all 250ms;
  }
  .fp-card:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(43,15,5,0.12); }
  .fp-img-wrap { position: relative; overflow: hidden; cursor: pointer; }
  .fp-img-wrap img { transition: filter 200ms; }
  .fp-img-wrap:hover img { filter: blur(0px) !important; }
  .fp-overlay {
    position: absolute; inset: 0; background: rgba(43,15,5,0.45);
    display: flex; align-items: center; justify-content: center;
    opacity: 0; transition: opacity 200ms;
  }
  .fp-img-wrap:hover .fp-overlay { opacity: 1; }
  .fp-overlay span {
    color: #fff; font: 600 0.8rem var(--sans); letter-spacing: 2px;
    text-transform: uppercase; border: 1px solid rgba(255,255,255,0.6); padding: 8px 20px;
  }
  .fp-meta { padding: 1.25rem 1.25rem 0.5rem; }
  .fp-type-label { font: 500 0.65rem var(--sans); letter-spacing: 2px; text-transform: uppercase; color: var(--primary); }
  .fp-type-value { font: 600 1.4rem var(--serif); color: var(--dark-brown); }
  .fp-dl-btn {
    display: flex; align-items: center; gap: 8px; margin: 1rem 1.25rem 1.25rem;
    background: var(--gold-gradient); color: var(--dark-brown);
    padding: 10px 20px; font: 600 0.75rem var(--sans); letter-spacing: 1.5px;
    text-transform: uppercase; border: none; cursor: pointer; width: fit-content;
    transition: all 200ms;
  }
  .fp-dl-btn:hover { opacity: 0.85; }

  /* ── Price Table ── */
  .price-section { background: #fff; }
  .price-table { width: 100%; border-collapse: collapse; }
  .price-table th {
    background: var(--dark-brown); color: var(--gold-light);
    font: 600 0.75rem var(--sans); letter-spacing: 2px;
    text-transform: uppercase; padding: 14px 20px; text-align: left;
  }
  .price-table td { padding: 14px 20px; border-bottom: 1px solid rgba(139,94,46,0.1); font: 400 0.9rem var(--sans); }
  .price-table tr:hover td { background: rgba(201,168,76,0.05); }
  .price-btn {
    background: var(--gold-gradient); color: var(--dark-brown);
    border: none; padding: 8px 20px; font: 600 0.72rem var(--sans);
    letter-spacing: 1.5px; text-transform: uppercase; cursor: pointer;
  }

  /* ── Gallery ── */
  .gallery-section { background: var(--dark-brown); }
  .galBox .inner img { object-fit: cover; height: 320px; }
  div[class^="swiper-button"] {
    color: #fff; background: rgba(43,15,5,0.7); width: 40px; height: 40px;
    border-radius: 50%; border: 1px solid rgba(201,168,76,0.4); transition: all 200ms;
  }
  div[class^="swiper-button"]:hover { background: var(--gold); border-color: var(--gold); }
  div[class^="swiper-button"]::after { font-size: 0.9rem; }
  .swiper-controls { display: flex; gap: 10px; align-items: center; }
  .swiper-controls div { position: static; margin: 0; }

  /* ── Location ── */
  .location-section { background: var(--cream); }
  .loc-adv-item {
    display: flex; align-items: flex-start; gap: 1rem;
    padding: 1rem 0; border-bottom: 1px dashed rgba(139,94,46,0.2);
  }
  .loc-adv-item:last-child { border-bottom: none; }
  .loc-num {
    width: 32px; height: 32px; border-radius: 50%;
    background: var(--dark-brown); color: var(--gold);
    font: 700 0.8rem var(--serif); display: flex; align-items: center;
    justify-content: center; flex-shrink: 0; margin-top: 2px;
  }
  .loc-adv-text { font: 600 0.9rem var(--sans); color: var(--dark-brown); }
  .loc-adv-text small { font-weight: 400; color: var(--primary); display: block; margin-top: 2px; font-size: 0.8rem; }
  .loc-map-wrap { position: relative; overflow: hidden; cursor: pointer; height: 100%; min-height: 380px; }
  .loc-map-wrap img { height: 100%; object-fit: cover; transition: filter 200ms; }
  .loc-map-wrap:hover img { filter: blur(0) !important; }
  .loc-map-label {
    position: absolute; bottom: 0; left: 0; right: 0;
    background: rgba(43,15,5,0.8); color: var(--gold-light);
    text-align: center; padding: 10px; font: 500 0.75rem var(--sans);
    letter-spacing: 2px; text-transform: uppercase;
  }

  /* ── Tagline Band ── */
  .tagline-band {
    position: relative; min-height: 55vh;
    display: flex; align-items: center; justify-content: center; overflow: hidden;
  }
  .tagline-band::before {
    content: ''; position: absolute; inset: 0;
    background: url(${Banner}) center/cover fixed;
  }
  .tagline-band::after { content: ''; position: absolute; inset: 0; background: rgba(43,15,5,0.65); }
  .tagline-content { position: relative; z-index: 2; text-align: center; color: #fff; padding: 3rem 2rem; max-width: 760px; }
  .tagline-content h2 { font: 300 3rem var(--serif); line-height: 1.2; margin-bottom: 1rem; }
  .tagline-content h2 em { font-style: italic; color: var(--gold-light); }
  .tagline-content p { font: 400 1rem var(--sans); opacity: 0.8; }

  /* ── Enquiry Section ── */
  .enquiry-section { background: var(--cream); }
  .enquiry-card { background: #fff; box-shadow: 0 8px 48px rgba(43,15,5,0.1); overflow: hidden; }
  .enq-form-wrap { padding: 3rem; }
  .enq-form-wrap .section-title { font-size: 2rem; }
  .enq-input {
    width: 100%; background: #faf6f0; border: none;
    border-bottom: 2px solid rgba(139,94,46,0.3); padding: 14px 16px;
    font: 400 0.9rem var(--sans); color: var(--dark-brown);
    margin-bottom: 14px; outline: none; transition: border-color 200ms;
  }
  .enq-input:focus { border-bottom-color: var(--gold); }
  .enq-btn {
    background: var(--gold-gradient); color: var(--dark-brown);
    border: none; padding: 14px 40px; font: 700 0.8rem var(--sans);
    letter-spacing: 2px; text-transform: uppercase; cursor: pointer;
    transition: all 200ms; margin-top: 4px;
  }
  .enq-btn:hover { opacity: 0.85; transform: translateY(-1px); }

  /* ── Footer ── */
  .bento-footer { background: var(--dark-brown); color: rgba(245,239,230,0.7); padding: 2.5rem 0; }
  .bento-footer a { color: var(--gold-light); }
  .bento-footer a:hover { color: var(--gold); }
  .footer-rera { font: 400 0.8rem var(--sans); line-height: 1.8; }

  /* ── Mobile CTA Bar ── */
  .mob-cta-bar {
    position: fixed; bottom: 0; left: 0; right: 0;
    display: none; z-index: 99; background: var(--dark-brown);
  }
  .mob-cta-bar a, .mob-cta-bar button {
    flex: 1; color: #fff; text-align: center;
    padding: 12px 8px; font: 600 0.72rem var(--sans);
    letter-spacing: 1px; text-transform: uppercase;
    border: none; border-right: 1px solid rgba(201,168,76,0.2);
    background: none; cursor: pointer; display: flex; flex-direction: column;
    align-items: center; gap: 4px; font-size: 0.68rem;
  }
  .mob-cta-bar a:last-child, .mob-cta-bar button:last-child { border-right: none; }
  .mob-cta-bar i { font-size: 1rem; color: var(--gold); }
  .mob-cta-bar .wa-btn { background: var(--whatsapp); }

  /* ── Scroll-to-top ── */
  .scroll-top {
    position: fixed; right: 16px; bottom: 70px; width: 40px; height: 40px;
    border-radius: 50%; background: var(--gold-gradient);
    color: var(--dark-brown); border: none; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    opacity: 0; transition: opacity 300ms; z-index: 98; font-size: 1rem;
  }
  .scroll-top.visible { opacity: 1; }

  /* ── Modal ── */
  .bento-modal-overlay {
    position: fixed; inset: 0; background: rgba(43,15,5,0.92);
    backdrop-filter: blur(6px); z-index: 9999;
    display: flex; align-items: center; justify-content: center; padding: 1rem;
  }
  .bento-modal {
    background: #fff; max-width: 480px; width: 100%;
    position: relative; box-shadow: 0 24px 64px rgba(0,0,0,0.4);
  }
  .modal-header-bento {
    background: var(--dark-brown); padding: 1.5rem 2rem;
    text-align: center; color: #fff;
  }
  .modal-header-bento .mh-eyebrow { font: 500 0.65rem var(--sans); letter-spacing: 3px; text-transform: uppercase; color: var(--gold); margin-bottom: 4px; }
  .modal-header-bento h4 { font: 400 1.4rem var(--serif); color: var(--gold-light); margin: 0; }
  .modal-header-bento p { font: 400 0.8rem var(--sans); color: rgba(255,255,255,0.6); margin: 4px 0 0; }
  .modal-body-bento { padding: 2rem; }
  .modal-close {
    position: absolute; top: -12px; right: -12px; width: 36px; height: 36px;
    border-radius: 50%; background: #fff; color: var(--dark-brown);
    border: none; cursor: pointer; font-size: 1.2rem; font-weight: 700;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2); z-index: 1;
  }
  .modal-close:hover { background: var(--dark-brown); color: var(--gold); }

  /* ── Responsive ── */
  
  @media (max-width: 991px) {
    .bento-header .hd-inner { padding: 0 1.2rem; }
    .bento-nav { display: none; }
    .ham { display: flex; }
    .bento-cta .btn-wa { display: none; }
    .hl-grid { grid-template-columns: repeat(2, 1fr); }
    .mob-cta-bar { display: flex; }
    .scroll-top { bottom: 60px; }
    .bento-banner { height: 85vh; }
    .banner-title { font-size: 3rem; }
  }
  @media (max-width: 767px) {
    .section-pad { padding: 3.5rem 0; }
    .bento-banner { height: auto; aspect-ratio: 1/1; margin-top: 72px; }
    .banner-content { left: 5%; max-width: 90%; }
    .banner-title { font-size: 2.2rem; }
    .hl-grid { grid-template-columns: 1fr 1fr; }
    .config-item { min-width: 50%; }
    .enq-form-wrap { padding: 2rem 1.5rem; }
    .bento-footer { padding-bottom: 4rem; }
  }
  @media (max-width: 575px) {
    .banner-title { font-size: 1.8rem; }
    .banner-btns { flex-direction: column; }
    .hl-grid { grid-template-columns: 1fr; }
    .section-title { font-size: 2rem; }
  }
`;

/* ─── EmailJS helper ─── */
function sendEnquiry(data, onSuccess, onError) {
  if (!window.emailjs) { onError("EmailJS not loaded"); return; }
  window.emailjs
    .send("service_fkmfynb", "template_bdjcyq6", data)
    .then(onSuccess)
    .catch(onError);
}

/* ─── Reusable Form ─── */
function BentoForm({ inputClass = "sf-input", btnClass = "sf-btn", requireEmail = false, onSuccess }) {
  const [vals, setVals] = useState({ name: "", mobile: "", email: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => setVals({ ...vals, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("Sending…");
    sendEnquiry(
      { name: vals.name, mobile: vals.mobile, email: vals.email || "Not Provided" },
      () => {
        setStatus("✅ Sent! We'll reach out shortly.");
        setVals({ name: "", mobile: "", email: "" });
        if (onSuccess) onSuccess();
        window.open(
          "https://wa.me/919716007900?text=Hi, I just submitted an enquiry for Codename Bento",
          "_blank"
        );
      },
      () => setStatus("❌ Failed. Please try again.")
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      {status && <div className="sf-status" style={{ color: status.startsWith("✅") ? "green" : status.startsWith("❌") ? "red" : "#7a5030" }}>{status}</div>}
      <input className={inputClass} type="text" name="name" placeholder="Full Name *" required value={vals.name} onChange={handleChange} />
      <input className={inputClass} type="tel" name="mobile" placeholder="Mobile Number *" required value={vals.mobile} onChange={handleChange} />
      {requireEmail && (
        <input className={inputClass} type="email" name="email" placeholder="Email Address *" required value={vals.email} onChange={handleChange} />
      )}
      <button type="submit" className={btnClass}>Get Details</button>
    </form>
  );
}

/* ─── Placeholder image component ─── */
function PlaceholderImg({ label, height = 220, style = {} }) {
  return (
    <div className="img-placeholder" style={{ minHeight: height, ...style }}>
      <span>📷 {label}</span>
    </div>
  );
}

/* ─── Smart image: shows placeholder until src is a real path ─── */
function SmartImg({ src, alt, height, className, style }) {
  const isPlaceholder = !src || src === "";
  if (isPlaceholder) return <PlaceholderImg label={alt || "Image"} height={height} style={style} />;
  return <img src={src} alt={alt} className={className} style={style} />;
}

/* ─── Main Page Component ─── */
export default function GaurYamunaBento() {
  const [menuOpen, setMenuOpen]       = useState(false);
  const [showModal, setShowModal]     = useState(false);
  const [scrolled, setScrolled]       = useState(false);
  const [showTop, setShowTop]         = useState(false);
  const swiperReady                   = useRef(false);

  /* External scripts */
  useEffect(() => {
    const load = (src, cb) => {
      if (document.querySelector(`script[src="${src}"]`)) { cb?.(); return; }
      const s = document.createElement("script");
      s.src = src; s.onload = cb;
      document.body.appendChild(s);
    };
    load("https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js",
      () => window.emailjs?.init("xLfYDZXLlR6IeQ-C6"));
    load("https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js");
    load("https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.3/js/bootstrap.min.js");
    load("https://cdnjs.cloudflare.com/ajax/libs/Swiper/8.3.1/swiper-bundle.min.js", () => {
      if (!swiperReady.current && window.Swiper) {
        swiperReady.current = true;
        new window.Swiper(".bento-gallery-swiper", {
          slidesPerView: 1, spaceBetween: 8, loop: true,
          autoplay: { delay: 3000, disableOnInteraction: false },
          navigation: { nextEl: ".gal-next", prevEl: ".gal-prev" },
          breakpoints: { 540: { slidesPerView: 2, spaceBetween: 16 } },
        });
      }
    });
    load("https://unpkg.com/aos@2.3.0/dist/aos.js", () => window.AOS?.init({ duration: 11, once: true }));
  }, []);

  /* scroll listeners */
  useEffect(() => {
    const onScroll = () => { setScrolled(window.scrollY > 60); setShowTop(window.scrollY > 300); };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* auto popup */
  useEffect(() => {
    const t = setTimeout(() => setShowModal(true), 6000);
    return () => clearTimeout(t);
  }, []);

  const navLinks = [
    { href: "#overview",  label: "Overview"    },
    { href: "#highlights",label: "Highlights"  },
    { href: "#amenities", label: "Amenities"   },
    { href: "#floorplan", label: "Floor Plans" },
    { href: "#gallery",   label: "Gallery"     },
    { href: "#location",  label: "Location"    },
  ];

  const highlights = [
    { icon: "fa-building", title: "40 Storeys", desc: "Two iconic modern glass towers" },
    { icon: "fa-ruler-combined", title: "650–675 Sq.Ft.", desc: "Perfectly sized studio apartments" },
    { icon: "fa-couch", title: "Fully Furnished", desc: "First-of-its-kind in the area" },
    { icon: "fa-snowflake", title: "Central A/C", desc: "Centrally air-conditioned units" },
    { icon: "fa-hotel", title: "Int'l Hotel", desc: "Branded hotel chain on-site" },
    { icon: "fa-shopping-bag", title: "Luxury Mall", desc: "National & international brands" },
    { icon: "fa-car", title: "8000 Cars", desc: "Massive multi-level parking" },
    { icon: "fa-city", title: "250-Acre Township", desc: "Gaur Yamuna City ecosystem" },
    { icon: "fa-drafting-compass", title: "ACPL Design", desc: "Award-winning architecture" },
  ];

  const locationAdvantages = [
    { num: "I",   title: "Right on Yamuna Expressway",      sub: "Near Exit 2C in Sector-19" },
    { num: "II",  title: "Near Noida International Airport", sub: "Jewar Airport – approx. 15 mins" },
    { num: "III", title: "Opposite F1 Track",                sub: "Buddh International Circuit" },
    { num: "IV",  title: "Industrial Hubs & MNCs",           sub: "Surrounded by business zones" },
    { num: "V",   title: "Proximity to Universities",        sub: "Multiple institutions nearby" },
    { num: "VI",  title: "Thriving Township",                sub: "Home to 15,000+ residents" },
  ];

  return (
    <>
      <style>{styles}</style>

      {/* ── Header ── */}
      <header className={`bento-header ${scrolled ? "scrolled" : ""}`}>
        <div className="hd-inner">
          <div className="bento-logo">
            <SmartImg src={Logo} alt="Gaur Group" height={50} />
          </div>
          <nav className="bento-nav">
            {navLinks.map(({ href, label }) => (
              <a key={href} href={href}>{label}</a>
            ))}
          </nav>
          <div className="bento-cta">
            <a href="tel:9716007900" className="btn-call">
              <i className="fa fa-phone" /> Call Now
            </a>
            <a
              href="https://api.whatsapp.com/send?phone=+919716007900&text=Hi! I'm interested in Codename Bento – Gaur Yamuna City. Please share details."
              target="_blank" rel="noreferrer" className="btn-wa"
            >
              <i className="fab fa-whatsapp" /> WhatsApp
            </a>
            <button
              className={`ham ${menuOpen ? "open" : ""}`}
              onClick={() => setMenuOpen(o => !o)}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`mob-menu ${menuOpen ? "open" : ""}`}>
        {navLinks.map(({ href, label }) => (
          <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
        ))}
      </div>

      <main>
        {/* ── Banner ── */}
        <section className="bento-banner" id="home">
          <picture>
            <source media="(max-width:560px)" srcSet={Mobile} />
            <SmartImg src={BANNER_DESKTOP} alt="Codename Bento Banner" height={600} style={{ height: "100%", objectFit: "cover" }} />
          </picture>
          <div className="banner-content">
            <p className="banner-eyebrow">Gaur Group · 31 Years of Legacy</p>
            <h1 className="banner-title">
              Luxury Studio<br /><strong>Apartments</strong>
            </h1>
            <p className="banner-sub">Codename: Bento · Gaur Yamuna City</p>
            <div className="banner-price-tag">Starting ₹1 Crore Onwards</div>
            <div className="banner-btns">
              <button className="btn-primary-gold" onClick={() => setShowModal(true)}>
                Get Details
              </button>
              <button className="btn-outline-gold" onClick={() => setShowModal(true)}>
                Schedule Visit
              </button>
            </div>
          </div>
        </section>

        {/* ── Overview ── */}
        <section className="section-pad overview-section" id="overview">
          <div className="container-lg">
            <div className="row g-5">
            
              {/* Content */}
              <div className="col-lg-8" data-aos="fade-right">
                <div className="section-heading">
                  <p className="section-eyebrow">Overview</p>
                  <h2 className="section-title">Codename: <span>Bento</span></h2>
                  <p className="section-subtitle">Gaur Yamuna City, Yamuna Expressway</p>
                </div>
                <p style={{ lineHeight: 1.8, marginBottom: "1rem" }}>
                  Join the pulse of a connected lifestyle at <strong>Codename: Bento</strong> — luxury
                  fully-furnished studio apartments within the landmark <strong>250-acre Gaur Yamuna City</strong> integrated township.
                  Experience the perfect fusion of a branded hotel, luxury mall, and premium residences — three worlds, one address.
                </p>
                <p style={{ lineHeight: 1.8, marginBottom: "2rem" }}>
                  Designed by <strong>ACPL</strong> and rising 40 storeys as the tallest commercial landmark in the region,
                  this centrally air-conditioned development offers high rental potential with an international hotel chain presence — 
                  making it an exceptional lifestyle and investment opportunity.
                </p>
                <div className="config-strip">
                  <div className="config-item">
                    <div className="ci-label">Type</div>
                    <div className="ci-value">Studio Apartments</div>
                  </div>
                  <div className="config-item">
                    <div className="ci-label">Size</div>
                    <div className="ci-value">650 – 675 Sq.Ft.</div>
                  </div>
                  <div className="config-item">
                    <div className="ci-label">Price</div>
                    <div className="ci-value">₹1 Cr Onwards</div>
                  </div>
                  <div className="config-item">
                    <div className="ci-label">Floors</div>
                    <div className="ci-value">40 Storeys</div>
                  </div>
                  <div className="config-item">
                    <div className="ci-label">Towers</div>
                    <div className="ci-value">2 Iconic</div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: "2rem" }}>
                  <button className="btn-primary-gold" onClick={() => setShowModal(true)}>Download Brochure</button>
                  <button className="btn-outline-gold" style={{ color: "var(--dark-brown)", borderColor: "rgba(139,94,46,0.4)" }} onClick={() => setShowModal(true)}>
                    Schedule Site Visit
                  </button>
                </div>
              </div>

              {/* Sticky Form */}
              <div className="col-lg-4">
                <div className="sticky-form-wrap" data-aos="fade-left">
                  <div className="sticky-form">
                    <div className="form-head">
                      Express Your Interest<br />
                      <small style={{ fontSize: "0.7rem", opacity: 0.7, letterSpacing: "2px" }}>GET EXCLUSIVE DETAILS</small>
                    </div>
                    <div style={{ padding: "1.5rem" }}>
                      <BentoForm inputClass="sf-input" btnClass="sf-btn" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Key Highlights ── */}
        <section className="highlights-section section-pad" id="highlights">
          <div className="container-lg">
            <div className="section-heading text-center mb-5" data-aos="fade-up">
              <p className="section-eyebrow" style={{ color: "var(--gold)", justifyContent: "center" }}>
                Key Highlights
              </p>
              <h2 className="section-title" style={{ color: "#fff" }}>Why <span style={{ color: "var(--gold-light)" }}>Codename: Bento</span></h2>
            </div>
            <div className="hl-grid" data-aos="fade-up">
              {highlights.map(({ icon, title, desc }) => (
                <div key={title} className="hl-item">
                  <div className="hl-icon"><i className={`fa ${icon}`} /></div>
                  <h4>{title}</h4>
                  <p>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Amenities ── */}
        <section className="amenities-section section-pad" id="amenities">
          <div className="container-lg" style={{ position: "relative", zIndex: 2 }}>
            <div className="section-heading text-center mb-5" data-aos="fade-up">
              <p className="section-eyebrow" style={{ color: "var(--gold)", justifyContent: "center" }}>Amenities</p>
              <h2 className="section-title" style={{ color: "#fff" }}>The Convenience <span style={{ color: "var(--gold-light)" }}>Story</span></h2>
              <p className="section-subtitle" style={{ color: "rgba(245,239,230,0.6)" }}>
                45,000 Sq.Ft. Luxury Clubhouse + Podium Level Landscape
              </p>
            </div>
            <div className="row g-3" data-aos="fade-up">
              {IMG.AMENITIES.map(({ src, label }) => (
                <div key={label} className="col-6 col-md-3">
                  <div className="ame-card">
                    <div className="ame-img">
                      <SmartImg src={src} alt={label} height={130} />
                    </div>
                    <div className="ame-label">{label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Floor Plans ── */}
        <section className="fp-section section-pad" id="floorplan">
          <div className="container-lg">
            <div className="d-flex justify-content-between align-items-end flex-wrap gap-3 mb-4" data-aos="fade-up">
              <div>
                <p className="section-eyebrow">Floor Plans</p>
                <h2 className="section-title">Studio <span>Configurations</span></h2>
              </div>
              <button className="btn-primary-gold" onClick={() => setShowModal(true)}>
                <i className="fa fa-download" style={{ marginRight: 6 }} /> Master Plan
              </button>
            </div>
            <div className="row g-4 justify-content-center" data-aos="fade-up">
              {[
                { type: "Studio – Type A", size: "650 Sq.Ft.", img: Fst },
                { type: "Studio – Type B", size: "675 Sq.Ft.", img: Sst },
              ].map(({ type, size, img }) => (
                <div key={type} className="col-lg-4 col-md-6">
                  <div className="fp-card">
                    <div className="fp-img-wrap" onClick={() => setShowModal(true)}>
                      <SmartImg src={img} alt={type} height={220} style={{ filter: "blur(5px)" }} />
                      <div className="fp-overlay"><span>Click to Unlock</span></div>
                    </div>
                    <div className="fp-meta">
                      <div className="fp-type-label">Configuration</div>
                      <div className="fp-type-value">{type}</div>
                      <div style={{ fontSize: "0.85rem", color: "var(--primary)", marginTop: 4 }}>{size}</div>
                    </div>
                    <button className="fp-dl-btn" onClick={() => setShowModal(true)}>
                      <i className="fa fa-download" /> Download Floor Plan
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Tagline Band ── */}
        <div className="tagline-band">
          <div className="tagline-content" data-aos="fade-up">
            <h2>Three Worlds.<br /><em>One Address.</em></h2>
            <p>
              A luxury mall · An international branded hotel · Fully furnished studio apartments — 
              all within a thriving 250-acre delivered township.
            </p>
          </div>
        </div>

        {/* ── Price List ── */}
        <section className="price-section section-pad">
          <div className="container">
            <div className="section-heading" data-aos="fade-up">
              <p className="section-eyebrow">Investment</p>
              <h2 className="section-title">Price <span>Details</span></h2>
            </div>
            <div className="table-responsive" data-aos="fade-up">
              <table className="price-table">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Area (Sq.Ft.)</th>
                    <th>Launch Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { type: "Studio – Type A", area: "650", price: "₹1 Cr Onwards" },
                    { type: "Studio – Type B", area: "675", price: "₹1 Cr Onwards" },
                  ].map(({ type, area, price }) => (
                    <tr key={type}>
                      <td><strong>{type}</strong></td>
                      <td>{area} Sq.Ft.</td>
                      <td style={{ color: "var(--primary)", fontWeight: 600 }}>{price}</td>
                      <td>
                        <button className="price-btn" onClick={() => setShowModal(true)}>
                          Get Costing
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: "0.78rem", color: "var(--primary)", marginTop: "1rem", fontStyle: "italic" }}>
              * Flexible payment plan options available. Contact us for full details.
            </p>
          </div>
        </section>

        {/* ── Gallery ── */}
        <section className="gallery-section section-pad" id="gallery">
          <div className="container-lg">
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4" data-aos="fade-up">
              <div>
                <p className="section-eyebrow" style={{ color: "var(--gold)" }}>Gallery</p>
                <h2 className="section-title" style={{ color: "#fff" }}>A <span style={{ color: "var(--gold-light)" }}>Glimpse</span></h2>
              </div>
              <div className="swiper-controls">
                <div className="swiper-button-prev gal-prev" />
                <div className="swiper-button-next gal-next" />
              </div>
            </div>
            <div className="swiper bento-gallery-swiper" data-aos="fade-up">
              <div className="swiper-wrapper">
                {IMG.GALLERY.map((src, i) => (
                  <div key={i} className="swiper-slide galBox">
                    <div className="inner">
                      <SmartImg src={src} alt={`Gallery ${i + 1}`} height={320} style={{ height: 320, objectFit: "cover" }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Location ── */}
        <section className="location-section section-pad" id="location">
          <div className="container-lg">
            <div className="section-heading text-center mb-5" data-aos="fade-up">
              <p className="section-eyebrow" style={{ justifyContent: "center" }}>Location</p>
              <h2 className="section-title">Location <span>Advantages</span></h2>
              <p className="section-subtitle">
                <i className="fa fa-map-marker-alt" style={{ color: "var(--gold)" }} /> Gaur Yamuna City, Yamuna Expressway, Sector-19
              </p>
            </div>
            <div className="row g-4">
              <div className="col-lg-5" data-aos="fade-right">
                <div className="loc-map-wrap" onClick={() => setShowModal(true)}>
                  <SmartImg src={Location} alt="Location Map" height={380} style={{ filter: "blur(6px)", height: 380 }} />
                  <div className="loc-map-label">
                    <i className="fa fa-lock" style={{ marginRight: 6 }} /> Click to reveal location map
                  </div>
                </div>
              </div>
              <div className="col-lg-7" data-aos="fade-left">
                {locationAdvantages.map(({ num, title, sub }) => (
                  <div key={num} className="loc-adv-item">
                    <div className="loc-num">{num}</div>
                    <div className="loc-adv-text">
                      {title}
                      {sub && <small>{sub}</small>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Enquire Now ── */}
        <section className="enquiry-section section-pad">
          <div className="container-lg">
            <div className="enquiry-card" data-aos="fade-up">
              <div className="row g-0">
                <div className="col-lg-7">
                  <div className="enq-form-wrap">
                    <div className="section-heading">
                      <p className="section-eyebrow">Contact Us</p>
                      <h2 className="section-title">Enquire <span>Now</span></h2>
                      <p className="section-subtitle">Fill in the form & our team will connect with you shortly.</p>
                    </div>
                    <BentoForm inputClass="enq-input" btnClass="enq-btn" requireEmail />
                  </div>
                </div>
                <div className="col-lg-5" style={{ minHeight: 300 }}>
                  <SmartImg src={Builder} alt="Bento Interior" height={400} style={{ height: "100%", objectFit: "cover" }} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="bento-footer">
          <div className="container-lg">
            <div className="row g-4 align-items-center">
              <div className="col-md-8">
                <div className="footer-rera">
                  <strong style={{ color: "var(--gold-light)", fontFamily: "var(--serif)", fontSize: "1rem" }}>
                    Codename: Bento · Gaur Yamuna City
                  </strong><br />
                  Project RERA No.: UPRERAPRJ351477<br />
                  Agent RERA No.: UPRERAAGT1022<br />
                  <a href="https://up-rera.in/projects/" target="_blank" rel="noreferrer">https://up-rera.in/projects/</a>
                  {" · "}
                  <a href="privacy.php" target="_blank" rel="noreferrer">Disclaimer & Privacy Policy</a>
                  Disclaimer – Authorized marketing partner with Gaur Group. The content provided on this website is for information purposes only and does not constitute an offer to avail any service. Prices are subject to change without prior notice. Images are for representation purposes only. This is the official website of an authorized marketing partner. We may share data with RERA-registered brokers/companies for further processing. All rights reserved.<br />
                  <em style={{ fontSize: "0.72rem", opacity: 0.6, marginTop: "0.5rem", display: "block" }}>
                    This communication is by a RERA registered agent only. Prices are indicative and subject to change.
                  </em>
                </div>
              </div>
              <div className="col-md-4 text-center">
                <SmartImg src={Qr} alt="QR Code" height={100} style={{ width: 100, margin: "0 auto" }} />
                <p style={{ fontSize: "0.7rem", marginTop: 8, opacity: 0.5 }}>Scan to enquire</p>
              </div>
            </div>
          </div>
        </footer>
      </main>

      {/* ── Mobile CTA Bar ── */}
      <div className="mob-cta-bar d-flex d-md-none">
        <a className="wa-btn" href="https://api.whatsapp.com/send?phone=+919716007900&text=Hi! Interested in Codename Bento." target="_blank" rel="noreferrer">
          <i className="fab fa-whatsapp" /><span>WhatsApp</span>
        </a>
        <a href="tel:9716007900">
          <i className="fa fa-phone" /><span>Call</span>
        </a>
        <button onClick={() => setShowModal(true)}>
          <i className="fa fa-envelope" /><span>Enquire</span>
        </button>
      </div>

      {/* ── Scroll to top ── */}
      <button className={`scroll-top ${showTop ? "visible" : ""}`} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        <i className="fa fa-chevron-up" />
      </button>

      {/* ── Modal ── */}
      {showModal && (
        <div className="bento-modal-overlay" onClick={(e) => e.target === e.currentTarget && setShowModal(false)}>
          <div className="bento-modal">
            <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            <div className="modal-header-bento">
              <p className="mh-eyebrow">Gaur Yamuna City · Yamuna Expressway</p>
              <h4>Codename: Bento</h4>
              <p>Luxury Studio Apartments · Starting ₹1 Crore</p>
            </div>
            <div className="modal-body-bento">
              <p style={{ textAlign: "center", font: "400 0.9rem var(--sans)", color: "var(--primary)", marginBottom: "1.5rem" }}>
                Share your details & our advisor will reach out with exclusive details.
              </p>
              <BentoForm inputClass="sf-input" btnClass="sf-btn" requireEmail onSuccess={() => setShowModal(false)} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}