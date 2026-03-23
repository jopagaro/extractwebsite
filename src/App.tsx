import { useEffect } from 'react'
import Accordion from './components/Accordion'
import './index.css'

const DL_MAC_ARM  = 'https://github.com/jopagaro/extract/releases/latest/download/Extract_0.1.0_aarch64.dmg'
const DL_MAC_X64  = 'https://github.com/jopagaro/extract/releases/latest/download/Extract_0.1.0_x64.dmg'

const FEATURES = [
  {
    tag: 'Geology',
    title: 'Drill Hole & Core Data',
    body: 'Upload raw drill hole logs, assay tables, and lithology intervals. Extract builds a complete subsurface picture — grade distributions, deposit geometry, and resource continuity.',
  },
  {
    tag: 'Financials',
    title: 'Economic & Financial Models',
    body: 'Feed in feasibility studies, cash flow models, and financial statements. Extract reconciles capital and operating costs, calculates NPV and IRR, and flags where assumptions diverge from comparable projects.',
  },
  {
    tag: 'Imagery',
    title: 'Satellite & Aerial Images',
    body: 'Drop in any satellite, drone, or aerial imagery. Extract reads site layout, infrastructure, disturbance extent, and surface conditions — no GIS software required.',
  },
  {
    tag: 'Engineering',
    title: 'CAD & Technical Drawings',
    body: 'Process DXF, DWG, and PDF drawings. Extract reads mine plans, section drawings, and site layouts to verify what is engineered against what is reported.',
  },
  {
    tag: 'Compliance',
    title: 'Permits & Regulatory Files',
    body: 'Upload permits, environmental assessments, and regulatory correspondence. Extract identifies obligations, expiry dates, gaps, and jurisdictional risk factors.',
  },
  {
    tag: 'Reports',
    title: 'Technical Reports & NI 43-101',
    body: 'Process any technical report format. Extract cross-references stated resources, reserve classifications, and QP sign-offs against the underlying data you have provided.',
  },
]

const STEPS = [
  {
    num: '01',
    title: 'Import Everything',
    body: 'Drop in any combination of files — financials, imagery, CAD drawings, drill hole CSVs, PDFs, photos. Any format, any size. Extract handles the ingestion.',
  },
  {
    num: '02',
    title: 'Extract Analyzes',
    body: 'Your personal mining engineer reads every file, cross-references data sources, identifies inconsistencies, and builds a unified picture of the asset. All locally on your machine.',
  },
  {
    num: '03',
    title: 'Receive Your Report',
    body: 'A complete, high-level engineering and commercial assessment — structured, annotated, and ready to inform your decision. Export as PDF or structured data.',
  },
]

const FAQ_ITEMS = [
  {
    question: 'What file types does Extract support?',
    answer:
      'Extract accepts virtually any file format used in the mining industry: PDF, Excel, CSV, DXF, DWG, TIFF, PNG, JPG, georeferenced satellite imagery, drill hole databases (Leapfrog, Micromine, acQuire exports), financial models, and more. If the data is in a file, Extract can work with it.',
  },
  {
    question: 'Does my data leave my computer?',
    answer:
      'No. Extract runs entirely on your local machine. Your project data — drill holes, financial models, satellite imagery, permits — never touches an external server. This is by design. Mining data is sensitive, and we built Extract to respect that.',
  },
  {
    question: 'What does the output report look like?',
    answer:
      'Extract produces a structured technical assessment covering geology, resource estimates, financial metrics, infrastructure, permitting status, and identified data gaps. Reports are exportable as PDF and are formatted for use in investment memos, board presentations, or internal review.',
  },
  {
    question: 'Do I need a mining engineering background to use it?',
    answer:
      'No. Extract is designed to be used by investors, analysts, fund managers, and operators who need to understand mining assets — not just mining engineers. It translates technical data into clear, actionable findings without requiring domain expertise to interpret.',
  },
  {
    question: 'What operating systems are supported?',
    answer:
      'Extract runs natively on macOS and Windows. A Linux build is planned for a future release.',
  },
  {
    question: 'How large can the files be?',
    answer:
      'There is no hard limit imposed by Extract itself. Performance scales with your machine hardware. We have tested with full project datasets exceeding several gigabytes including high-resolution satellite imagery and large drill hole databases.',
  },
]

const FILE_TYPES = ['PDF', 'DXF', 'DWG', 'CSV', 'XLS', 'TIF', 'PNG', 'JPG', 'SHP', 'LAS', 'DAT', 'XML']


function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
            observer.unobserve(e.target)
          }
        })
      },
      { threshold: 0.08 }
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

export default function App() {
  useReveal()
  const year = new Date().getFullYear()

  function scrollToDownload() {
    document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* ── Nav ─────────────────────────────────────────────────────── */}
      <nav className="nav">
        <div className="nav-inner">
          <span className="nav-wordmark">Extract</span>
          <div className="nav-actions">
            <button className="btn" onClick={scrollToDownload}>
              Download
            </button>
            <a className="btn btn-primary" href={DL_MAC_ARM}>
              Download for Mac
            </a>
          </div>
        </div>
      </nav>

      <div className="site">

        {/* ── Hero ────────────────────────────────────────────────────── */}
        <header className="hero">
          <span className="hero-eyebrow">Mining Intelligence — Desktop App</span>
          <h1 className="hero-headline fade-up d1">
            Your personal<br />
            mining engineer.<br />
            On your machine.
          </h1>
          <p className="hero-sub fade-up d2">
            Upload any file from any mine — drill holes, financials,
            satellite imagery, CAD drawings, permits, photographs.
            Extract reads all of it and delivers a complete engineering
            and commercial assessment.
          </p>
          <div className="hero-actions fade-up d3">
            <a className="btn btn-primary btn-lg" href={DL_MAC_ARM}>
              Download for macOS
            </a>
            <span className="btn btn-lg" style={{ opacity: 0.45, cursor: 'default' }}>
              Windows — Coming Soon
            </span>
          </div>
          <div className="file-tags fade-up d4">
            {FILE_TYPES.map((f) => (
              <span key={f} className="file-tag">{f}</span>
            ))}
          </div>
        </header>

        <main>

          {/* ── What It Is ──────────────────────────────────────────────── */}
          <section className="section reveal" id="about">
            <div className="two-col">
              <span className="label">What It Is</span>
              <div className="body-copy">
                <p>
                  Extract is a desktop application that acts as your personal
                  mining engineer. You bring the data — in whatever form it
                  exists. Financial models, technical reports, satellite images,
                  drill hole databases, CAD files, permit documents, photographs
                  from site visits. All of it.
                </p>
                <p>
                  Extract processes every file, cross-references the data, and
                  produces a single, coherent assessment of the asset. It catches
                  inconsistencies, identifies gaps, and surfaces the information
                  that matters — without requiring you to be a mining engineer to
                  understand what it finds.
                </p>
              </div>
            </div>
          </section>

          {/* ── Features ────────────────────────────────────────────────── */}
          <section className="section" id="features">
            <span className="label">What You Can Feed It</span>
            <div className="feature-grid">
              {FEATURES.map((f, i) => (
                <div key={i} className="feature-card reveal">
                  <span className="feature-card-tag">{f.tag}</span>
                  <h3 className="feature-card-title">{f.title}</h3>
                  <p className="feature-card-body">{f.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── How It Works ────────────────────────────────────────────── */}
          <section className="section reveal" id="how-it-works">
            <span className="label">How It Works</span>
            <ul className="step-list">
              {STEPS.map((s) => (
                <li key={s.num} className="step-item">
                  <span className="step-num">{s.num}</span>
                  <span className="step-title">{s.title}</span>
                  <p className="step-body">{s.body}</p>
                </li>
              ))}
            </ul>
          </section>

          {/* ── Output ──────────────────────────────────────────────────── */}
          <section className="section reveal" id="output">
            <div className="two-col">
              <span className="label">The Output</span>
              <div className="output-wrap">
                <div className="body-copy">
                  <p>
                    Extract delivers a structured technical assessment built
                    from everything you uploaded. Not a summary of individual
                    files — a unified analysis of the asset as a whole.
                  </p>
                  <p>
                    Geology, resource classification, infrastructure, capital
                    and operating costs, regulatory standing, and data quality
                    flags — all in one place. Formatted for investment review,
                    board presentation, or internal diligence.
                  </p>
                  <p>
                    Export as PDF or structured data. No reformatting required.
                  </p>
                </div>
                <div className="report-mockup" aria-hidden="true">
                  <div className="report-header">
                    <span className="report-title">Asset Assessment</span>
                    <span className="report-date">Extract — {year}</span>
                  </div>
                  <div className="report-block">
                    <div className="report-section-label">Geological Summary</div>
                    <div className="report-line full dark" />
                    <div className="report-line med" />
                    <div className="report-line short" />
                  </div>
                  <div className="report-block">
                    <div className="report-section-label">Financial Metrics</div>
                    <div className="report-grid">
                      <div className="report-stat">
                        <span className="report-stat-val">—</span>
                        <span className="report-stat-lbl">NPV (8%)</span>
                      </div>
                      <div className="report-stat">
                        <span className="report-stat-val">—</span>
                        <span className="report-stat-lbl">IRR</span>
                      </div>
                      <div className="report-stat">
                        <span className="report-stat-val">—</span>
                        <span className="report-stat-lbl">Payback</span>
                      </div>
                      <div className="report-stat">
                        <span className="report-stat-val">—</span>
                        <span className="report-stat-lbl">AISC / oz</span>
                      </div>
                    </div>
                  </div>
                  <div className="report-block">
                    <div className="report-section-label">Data Gaps Identified</div>
                    <div className="report-line med" />
                    <div className="report-line short" />
                  </div>
                  <div className="report-block">
                    <div className="report-section-label">Regulatory Status</div>
                    <div className="report-line full" />
                    <div className="report-line med dark" />
                  </div>
                  <span className="report-badge">Ready to Export</span>
                </div>
              </div>
            </div>
          </section>

          {/* ── FAQ ─────────────────────────────────────────────────────── */}
          <section className="section reveal" id="faq">
            <div className="two-col">
              <span className="label">FAQ</span>
              <Accordion items={FAQ_ITEMS} />
            </div>
          </section>

          {/* ── Download CTA ─────────────────────────────────────────────── */}
          <section className="section cta-section reveal" id="download">
            <h2 className="cta-headline">
              Download Extract.
            </h2>
            <p className="cta-sub">
              Runs entirely on your machine. No account required.
              Enter your own API key in Settings to get started.
            </p>
            <div className="download-buttons">
              <a className="btn btn-primary btn-lg" href={DL_MAC_ARM}>
                macOS — Apple Silicon
              </a>
              <a className="btn btn-lg" href={DL_MAC_X64}>
                macOS — Intel
              </a>
              <span className="btn btn-lg" style={{ opacity: 0.45, cursor: 'default' }}>
                Windows — Coming Soon
              </span>
            </div>
            <span className="cta-note">macOS 11+ · Windows 10+ · Private by default</span>
          </section>

        </main>
      </div>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer className="site">
        <div className="footer">
          <span className="footer-wordmark">Extract</span>
          <span className="footer-copy">© {year}</span>
        </div>
      </footer>
    </>
  )
}
