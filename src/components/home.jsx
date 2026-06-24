import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

/* ─────────────────────────────────────────────
   IMAGES — mix of live (already-hosted) project
   shots and local placeholders for you to fill.
   ───────────────────────────────────────────── */
const IMG = {
  LOGO: "https://gaurchrysalis.co/assets/images/logo/logo.png", // live (Gaur wordmark)
  HERO_BG: "gaur-home/images/hero-bg.jpg",                       // ← replace

  BENTO: {
    cover: "bento/images/banner-desktop.jpg",   // ← replace (or reuse from Bento page)
    tag: "Studio Apartments",
    name: "Codename: Bento",
    location: "Gaur Yamuna City, Yamuna Expressway",
    price: "₹1 Cr Onwards",
    config: "650 – 675 Sq.Ft. Studios",
    blurb:
      "Fully-furnished, centrally air-conditioned studio apartments inside a 250-acre integrated township — with a branded hotel & luxury mall on-site.",
  },
  CHRYSALIS: {
    cover: "https://gaurchrysalis.co/assets/images/banner.webp", // live
    tag: "3 & 4 BHK Residences",
    name: "Gaur Chrysalis 2.0",
    location: "Sector 22D, Yamuna Expressway",
    price: "₹1.38 Cr* Onwards",
    config: "1625 – 1960 Sq.Ft. Homes",
    blurb:
      "A 12-acre low-density enclave of 9 towers with only 4 apartments per floor, a lavish G+2 clubhouse, and 23 boutique retail spaces.",
  },
};

/* ─── CSS ─── */
const styles = `
  @import url("https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Manrope:wght@300;400;500;600;700;800&display=swap");
  @import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css");
  @import url("https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.3/css/bootstrap.min.css");
  @import url("https://unpkg.com/aos@2.3.0/dist/aos.css");

  :root {
    --dark:        #14241a;
    --dark-2:      #1c3325;
    --gold:        #c1933f;
    --gold-light:  #e0b768;
    --cream:       #f6f3ec;
    --body:        #2e3a31;
    --whatsapp:    #25d366;
    --serif:       "Cormorant", serif;
    --sans:        "Manrope", sans-serif;
    --gold-gradient: linear-gradient(135deg, #c1933f 0%, #e0b768 50%, #a67a30 100%);
    --dark-gradient: linear-gradient(135deg, #14241a 0%, #1c3325 100%);
  }
  *,*::before,*::after { box-sizing:border-box; }
  html { scroll-behavior:smooth; }
  body { margin:0; color:var(--body); font:400 1rem var(--sans); overflow-x:hidden; }
  a, a:hover { text-decoration:none; color:inherit; }
  img { width:100%; display:block; }
  ul { padding-left:0; margin:0; list-style:none; }

  .img-ph {
    background:linear-gradient(110deg,#dfe9e1 0%,#f3f7f4 50%,#dfe9e1 100%);
    background-size:200% 100%; animation:shimmer 1.6s infinite;
    display:flex; align-items:center; justify-content:center;
    font:500 0.7rem var(--sans); color:#5a7a60; letter-spacing:1.5px;
    text-transform:uppercase; min-height:200px;
  }
  @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
  .img-ph span { background:rgba(255,255,255,0.7); padding:5px 12px; border-radius:20px; }

  /* ── Header ── */
  .gh-header { position:fixed; top:0; left:0; width:100%; z-index:997;
    background:linear-gradient(to bottom, rgba(20,36,26,0.85), transparent); transition:all 300ms ease; }
  .gh-header.scrolled { background:#fff; box-shadow:0 2px 20px rgba(20,36,26,0.12); }
  .gh-inner { display:flex; align-items:center; justify-content:space-between; padding:0 3rem; height:74px; }
  .gh-logo { width:96px; }
  .gh-cta { display:flex; gap:10px; align-items:center; }
  .btn-call-gh { display:flex; align-items:center; gap:6px; background:var(--gold-gradient); color:var(--dark) !important;
    padding:9px 20px; font:700 0.75rem var(--sans); text-transform:uppercase; letter-spacing:1px; transition:all 200ms; }
  .btn-call-gh:hover { opacity:0.9; transform:translateY(-1px); }
  .btn-wa-gh { display:flex; align-items:center; gap:6px; background:var(--whatsapp); color:#fff !important;
    padding:9px 20px; font:700 0.75rem var(--sans); text-transform:uppercase; letter-spacing:1px;
    animation:waPulse 2.5s ease-in-out infinite; }
  @keyframes waPulse { 0%,100%{box-shadow:0 0 0 0 rgba(37,211,102,0.4);} 50%{box-shadow:0 0 0 8px rgba(37,211,102,0);} }

  /* ── Hero ── */
  .gh-hero { position:relative; min-height:92vh; display:flex; align-items:center; overflow:hidden; }
  .gh-hero::before { content:''; position:absolute; inset:0;
    background:url('./gaur-home/images/hero-bg.jpg') center/cover, var(--dark-gradient); }
  .gh-hero::after { content:''; position:absolute; inset:0;
    background:linear-gradient(105deg, rgba(20,36,26,0.92) 10%, rgba(20,36,26,0.55) 60%, rgba(20,36,26,0.85) 100%); }
  .gh-hero-content { position:relative; z-index:2; color:#fff; max-width:760px; padding:8rem 0 4rem; }
  .gh-eyebrow { display:inline-flex; align-items:center; gap:8px; background:rgba(193,147,63,0.15);
    border:1px solid rgba(193,147,63,0.4); padding:6px 16px; font:600 0.68rem var(--sans);
    letter-spacing:3px; text-transform:uppercase; color:var(--gold-light); margin-bottom:1.25rem; backdrop-filter:blur(4px); }
  .gh-title { font:300 4.4rem var(--serif); line-height:1.1; margin-bottom:1rem; }
  .gh-title strong { font-weight:700; color:var(--gold-light); display:block; }
  .gh-sub { font:400 1.05rem var(--sans); opacity:0.8; max-width:560px; margin-bottom:2.25rem; line-height:1.7; }
  .gh-stats { display:flex; gap:2.5rem; flex-wrap:wrap; margin-top:1rem; }
  .gh-stat strong { display:block; font:600 1.8rem var(--serif); color:var(--gold-light); }
  .gh-stat span { font:500 0.7rem var(--sans); letter-spacing:1.5px; text-transform:uppercase; opacity:0.65; }

  /* ── Projects Section ── */
  .projects-section { background:var(--cream); padding:5.5rem 0; }
  .ps-head { text-align:center; max-width:680px; margin:0 auto 3.5rem; }
  .ps-eyebrow { display:inline-flex; align-items:center; gap:10px; font:600 0.66rem var(--sans);
    letter-spacing:4px; text-transform:uppercase; color:var(--dark-2); margin-bottom:0.75rem; }
  .ps-eyebrow::before, .ps-eyebrow::after { content:''; display:block; width:28px; height:2px; background:var(--gold); }
  .ps-title { font:400 2.9rem var(--serif); color:var(--dark); line-height:1.15; }
  .ps-title em { font-style:italic; color:var(--dark-2); }
  .ps-sub { font:400 0.95rem var(--sans); color:#5a7a60; margin-top:0.75rem; }

  /* ── Project Card ── */
  .proj-card { background:#fff; overflow:hidden; box-shadow:0 8px 36px rgba(20,36,26,0.08);
    transition:all 300ms ease; height:100%; display:flex; flex-direction:column; }
  .proj-card:hover { transform:translateY(-6px); box-shadow:0 20px 50px rgba(20,36,26,0.16); }
  .proj-img-wrap { position:relative; overflow:hidden; aspect-ratio:4/3; }
  .proj-img-wrap img { height:100%; object-fit:cover; transition:transform 500ms ease; }
  .proj-card:hover .proj-img-wrap img { transform:scale(1.06); }
  .proj-img-wrap::after { content:''; position:absolute; inset:0;
    background:linear-gradient(to top, rgba(20,36,26,0.75) 0%, transparent 50%); }
  .proj-tag { position:absolute; top:16px; left:16px; z-index:2; background:var(--gold-gradient); color:var(--dark);
    padding:6px 14px; font:700 0.66rem var(--sans); letter-spacing:1.5px; text-transform:uppercase; }
  .proj-name-overlay { position:absolute; bottom:16px; left:20px; right:20px; z-index:2; color:#fff; }
  .proj-name-overlay .pn-loc { font:500 0.72rem var(--sans); opacity:0.85; display:flex; align-items:center; gap:6px; margin-bottom:2px; }
  .proj-name-overlay h3 { font:600 1.9rem var(--serif); margin:0; }

  .proj-body { padding:1.75rem 1.75rem 0; flex:1; display:flex; flex-direction:column; }
  .proj-meta-row { display:flex; gap:1.5rem; margin-bottom:1rem; flex-wrap:wrap; }
  .proj-meta-row .pm-item { font:600 0.78rem var(--sans); color:var(--dark-2); display:flex; align-items:center; gap:6px; }
  .proj-meta-row .pm-item i { color:var(--gold); }
  .proj-blurb { font:400 0.88rem var(--sans); color:#5a6e5d; line-height:1.7; margin-bottom:1.25rem; flex:1; }
  .proj-price-row { display:flex; align-items:center; justify-content:space-between;
    border-top:1px dashed rgba(20,36,26,0.15); padding:1.1rem 0; margin-top:auto; }
  .proj-price-row .pp-label { font:500 0.62rem var(--sans); letter-spacing:1.5px; text-transform:uppercase; color:#8a9a8c; display:block; }
  .proj-price-row .pp-value { font:700 1.15rem var(--serif); color:var(--dark); }
  .proj-footer { padding:1.25rem 1.75rem; background:var(--cream); display:flex; gap:10px; }
  .btn-view-proj { flex:1; text-align:center; background:var(--dark-gradient); color:#fff; padding:13px;
    font:700 0.72rem var(--sans); letter-spacing:2px; text-transform:uppercase; transition:all 200ms; display:block; }
  .btn-view-proj:hover { background:var(--gold-gradient); color:var(--dark); }
  .btn-call-proj { width:46px; flex-shrink:0; background:#fff; border:1px solid rgba(20,36,26,0.15);
    display:flex; align-items:center; justify-content:center; color:var(--dark-2); transition:all 200ms; }
  .btn-call-proj:hover { background:var(--gold-gradient); border-color:transparent; color:var(--dark); }

  /* ── Why Gaur strip ── */
  .why-strip { background:var(--dark-gradient); padding:4rem 0; }
  .why-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:1px; background:rgba(193,147,63,0.18); }
  .why-item { background:transparent; text-align:center; padding:1.5rem 1rem; }
  .why-item i { font-size:1.5rem; color:var(--gold); margin-bottom:0.75rem; display:block; }
  .why-item strong { display:block; font:600 1rem var(--serif); color:#f3f0e8; }
  .why-item span { font:400 0.76rem var(--sans); color:rgba(243,240,232,0.6); }

  /* ── Footer ── */
  .gh-footer { background:var(--dark); padding:2.5rem 0; color:rgba(243,240,232,0.6); }
  .gh-footer a { color:var(--gold-light); }
  .gh-footer a:hover { color:var(--gold); }
  .gh-footer-text { font:400 0.78rem var(--sans); line-height:1.9; }
  .gh-footer-disclaimer { font:400 0.66rem var(--sans); color:rgba(243,240,232,0.35); margin-top:1rem; line-height:1.7;
    border-top:1px solid rgba(193,147,63,0.1); padding-top:1rem; }

  /* ── Mobile CTA ── */
  .mob-cta-gh { position:fixed; bottom:0; left:0; right:0; display:none; z-index:99; background:var(--dark); }
  .mob-cta-gh a { flex:1; color:#fff; text-align:center; padding:11px 6px; font:600 0.68rem var(--sans);
    letter-spacing:1px; text-transform:uppercase; border-right:1px solid rgba(193,147,63,0.15);
    display:flex; flex-direction:column; align-items:center; gap:3px; }
  .mob-cta-gh a:last-child { border-right:none; }
  .mob-cta-gh i { font-size:0.95rem; color:var(--gold); }
  .mob-cta-gh .wa-mob-gh { background:var(--whatsapp); }
  .mob-cta-gh .wa-mob-gh i { color:#fff; }

  /* ── Responsive ── */
  @media (max-width:991px) {
    .gh-inner { padding:0 1.5rem; }
    .mob-cta-gh { display:flex; }
    .why-grid { grid-template-columns:repeat(2,1fr); }
    .gh-title { font-size:3.2rem; }
    .gh-stats { gap:1.5rem; }
  }
  @media (max-width:767px) {
    .gh-hero { min-height:auto; padding-bottom:2rem; }
    .gh-hero-content { padding:7rem 1rem 2rem; }
    .gh-title { font-size:2.4rem; }
    .gh-sub { font-size:0.92rem; }
    .projects-section { padding:3.5rem 0; }
    .ps-title { font-size:2.2rem; }
    .gh-footer { padding-bottom:4rem; }
    .proj-name-overlay h3 { font-size:1.5rem; }
  }
  @media (max-width:575px) {
    .gh-title { font-size:2rem; }
    .why-grid { grid-template-columns:1fr 1fr; }
    .gh-stats { gap:1rem; }
    .gh-stat strong { font-size:1.4rem; }
  }
`;

function SImg({ src, alt, style }) {
  const isLocal = src && src.startsWith("bento/") || src?.startsWith("gaur-home/");
  if (isLocal) return <div className="img-ph" style={{ minHeight: style?.height || 220, ...style }}><span>📷 {alt}</span></div>;
  return <img src={src} alt={alt} style={style} onError={(e) => { e.target.style.display = "none"; }} />;
}

function ProjectCard({ project, routeTo }) {
  return (
    <div className="proj-card" data-aos="fade-up">
      <div className="proj-img-wrap">
        <SImg src={project.cover} alt={project.name} style={{ height: "100%", objectFit: "cover" }} />
        <div className="proj-tag">{project.tag}</div>
        <div className="proj-name-overlay">
          <div className="pn-loc"><i className="fa fa-location-dot" /> {project.location}</div>
          <h3>{project.name}</h3>
        </div>
      </div>
      <div className="proj-body">
        <div className="proj-meta-row">
          <span className="pm-item"><i className="fa fa-ruler-combined" /> {project.config}</span>
        </div>
        <p className="proj-blurb">{project.blurb}</p>
        <div className="proj-price-row">
          <div>
            <span className="pp-label">Starting Price</span>
            <span className="pp-value">{project.price}</span>
          </div>
        </div>
      </div>
      <div className="proj-footer">
        <Link to={routeTo} className="btn-view-proj">View Project</Link>
        <a href="tel:9355019172" className="btn-call-proj"><i className="fa fa-phone" /></a>
      </div>
    </div>
  );
}

export default function GaurHomePage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const load = (src, cb) => {
      if (document.querySelector(`script[src="${src}"]`)) { cb?.(); return; }
      const s = document.createElement("script");
      s.src = src; s.onload = cb; document.body.appendChild(s);
    };
    load("https://unpkg.com/aos@2.3.0/dist/aos.js", () => window.AOS?.init({ duration: 1100, once: true }));
  }, []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const whyGaur = [
    { icon: "fa-award",        title: "31+ Years",     desc: "Legacy of trusted delivery" },
    { icon: "fa-building",     title: "45+ Projects",  desc: "Successfully delivered in NCR" },
    { icon: "fa-users",        title: "Thousands",     desc: "Of happy families housed" },
    { icon: "fa-shield-halved",title: "RERA Registered", desc: "100% transparent & compliant" },
  ];

  return (
    <>
      <style>{styles}</style>

      {/* ── Header ── */}
      <header className={`gh-header ${scrolled ? "scrolled" : ""}`}>
        <div className="gh-inner">
          <Link to="/" className="gh-logo"><img src={IMG.LOGO} alt="Gaur Group" /></Link>
          <div className="gh-cta">
            <a href="tel:9355019172" className="btn-call-gh"><i className="fa fa-phone" /> Call Now</a>
            <a
              href="https://api.whatsapp.com/send?phone=+919355019172&text=Hi! I'd like to know more about Gaur Group projects on Yamuna Expressway."
              target="_blank" rel="noreferrer" className="btn-wa-gh"
            >
              <i className="fab fa-whatsapp" /> WhatsApp
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* ── Hero ── */}
        <section className="gh-hero">
          <div className="container-lg">
            <div className="gh-hero-content" data-aos="fade-up">
              <div className="gh-eyebrow"><i className="fa fa-circle-dot" /> Gaur Group · Yamuna Expressway</div>
              <h1 className="gh-title">
                Two Landmarks.<br /><strong>One Legacy.</strong>
              </h1>
              <p className="gh-sub">
                Discover Gaur Group's newest residential & lifestyle developments on Yamuna Expressway —
                from fully-furnished studio apartments to spacious low-density 3 &amp; 4 BHK residences.
                Explore Codename: Bento and Gaur Chrysalis 2.0 below.
              </p>
              <div className="gh-stats">
                <div className="gh-stat"><strong>31+</strong><span>Years of Legacy</span></div>
                <div className="gh-stat"><strong>45+</strong><span>Delivered Projects</span></div>
                <div className="gh-stat"><strong>2</strong><span>New Launches</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Projects ── */}
        <section className="projects-section" id="projects">
          <div className="container-lg">
            <div className="ps-head" data-aos="fade-up">
              <p className="ps-eyebrow">Our Projects</p>
              <h2 className="ps-title">Explore Our <em>Latest Developments</em></h2>
              <p className="ps-sub">
                Two distinct lifestyles, one address — Gaur Yamuna City, Yamuna Expressway, Greater Noida
              </p>
            </div>

            <div className="row g-4">
              <div className="col-lg-6">
                <ProjectCard project={IMG.BENTO} routeTo="/bento" />
              </div>
              <div className="col-lg-6">
                <ProjectCard project={IMG.CHRYSALIS} routeTo="/chrysalis" />
              </div>
            </div>
          </div>
        </section>

        {/* ── Why Gaur ── */}
        <section className="why-strip">
          <div className="container-lg">
            <div className="why-grid" data-aos="fade-up">
              {whyGaur.map(({ icon, title, desc }) => (
                <div key={title} className="why-item">
                  <i className={`fa ${icon}`} />
                  <strong>{title}</strong>
                  <span>{desc}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="gh-footer">
          <div className="container-lg">
            <div className="row g-4 align-items-start">
              <div className="col-md-8">
                <div style={{ font: "400 1.3rem var(--serif)", color: "var(--gold-light)", marginBottom: "0.75rem" }}>
                  Gaur Group · Yamuna Expressway Projects
                </div>
                <div className="gh-footer-text">
                  Explore <Link to="/bento">Codename: Bento</Link> and{" "}
                  <Link to="/chrysalis">Gaur Chrysalis 2.0</Link> — our latest residential
                  developments at Gaur Yamuna City, Sector 22D, Yamuna Expressway, Greater Noida.
                </div>
                <div className="gh-footer-disclaimer">
                  This is an independent informational website by an authorized channel partner.
                  It is not the official Gaur Group website. Prices, layouts, and availability mentioned
                  are indicative and subject to change without notice. Please verify all details with
                  RERA-registered project documentation before making any purchase decision.
                </div>
              </div>
              <div className="col-md-4 text-center">
                <img src={IMG.LOGO} alt="Gaur Group" style={{ width: 110, margin: "0 auto", display: "block" }} />
                <p style={{ fontSize: "0.7rem", marginTop: 8, opacity: 0.5 }}>Authorized Channel Partner</p>
              </div>
            </div>
          </div>
        </footer>
      </main>

      {/* ── Mobile CTA ── */}
      <div className="mob-cta-gh d-flex d-md-none">
        <a className="wa-mob-gh" href="https://api.whatsapp.com/send?phone=+919355019172&text=Hi! I'd like to know more about Gaur Group projects." target="_blank" rel="noreferrer">
          <i className="fab fa-whatsapp" /><span>WhatsApp</span>
        </a>
        <a href="tel:9355019172"><i className="fa fa-phone" /><span>Call Now</span></a>
        <Link to="/bento"><i className="fa fa-house" /><span>Bento</span></Link>
        <Link to="/chrysalis"><i className="fa fa-city" /><span>Chrysalis</span></Link>
      </div>
    </>
  );
}