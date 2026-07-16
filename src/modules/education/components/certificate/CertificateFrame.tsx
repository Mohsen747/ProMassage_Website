"use client";

import { useCallback, useEffect, useRef } from "react";

// Client wrapper for the certificate document. Responsibilities are ported
// from the original standalone app.js:
//   1. Scale the fixed 1122×867 canvas down to fit its container (preview).
//   2. "Print / Save as PDF" via a dedicated off-screen iframe that renders the
//      certificate ALONE on a US Letter landscape page — so print output is
//      consistent regardless of the on-screen preview scale.
// The certificate markup itself is injected as an HTML string (built on the
// server from real data) to keep the design pixel-identical.

// Design canvas is now US Letter landscape proportions (22:17 = 11:8.5), so it
// fills the printed page edge-to-edge with no blank bands.
const CERT_W = 1122;
const CERT_H = 867;

// US Letter landscape @96dpi (Canada/US standard: 11in × 8.5in). Same 22:17
// ratio as the canvas, so PRINT_SCALE fits both dimensions exactly (no bands,
// no distortion).
const PAGE_W = 1056;
const PAGE_H = 816;
const PRINT_SCALE = PAGE_W / CERT_W; // = 816/867 = 0.9412 — exact fit, both axes

const FONTS_HREF =
  "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Cinzel:wght@400;600;700&family=Lato:wght@300;400;700&family=Raleway:wght@500;600;700&display=swap";
const CSS_HREF = "/certificates/certificate.css";

interface CertificateFrameProps {
  /** The certificate document markup (`<div id="certificate">…`) as an HTML string. */
  html: string;
}

export default function CertificateFrame({ html }: CertificateFrameProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Scale #cert-container so the fixed-width canvas fits the viewport width,
  // and collapse the viewport height to the scaled certificate height.
  const updateScale = useCallback(() => {
    const viewport = viewportRef.current;
    const container = containerRef.current;
    if (!viewport || !container) return;
    const scale = viewport.clientWidth / CERT_W;
    container.style.setProperty("--cert-preview-scale", String(scale));
    viewport.style.height = `${Math.round(CERT_H * scale)}px`;
  }, []);

  useEffect(() => {
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, [updateScale]);

  const handlePrint = useCallback(() => {
    const container = containerRef.current;
    const cert = container?.querySelector("#certificate");
    if (!cert) {
      window.print();
      return;
    }

    let frame = document.getElementById("print-frame") as HTMLIFrameElement | null;
    if (!frame) {
      frame = document.createElement("iframe");
      frame.id = "print-frame";
      frame.setAttribute("aria-hidden", "true");
      frame.style.cssText = "position:fixed;left:-9999px;top:0;width:0;height:0;border:0";
      document.body.appendChild(frame);
    }

    const doc = frame.contentWindow?.document;
    if (!doc) {
      window.print();
      return;
    }

    const baseHref = new URL("/", window.location.href).href;
    doc.open();
    doc.write(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <base href="${baseHref}">
  <title>Certificate</title>
  <link href="${FONTS_HREF}" rel="stylesheet">
  <link rel="stylesheet" href="${CSS_HREF}">
  <style>
    @page { size: ${PAGE_W}px ${PAGE_H}px; margin: 0; }
    html, body {
      margin: 0;
      padding: 0;
      width: ${PAGE_W}px;
      height: ${PAGE_H}px;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #fff;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    #cert-container { transform: none !important; width: auto; height: auto; }
    #certificate {
      width: ${CERT_W}px !important;
      height: ${CERT_H}px !important;
      /* Keep the true 1123×794 canvas — the Letter page (1056px) is narrower,
         so without this flexbox would shrink the cert (distorting it) since the
         width above is only its flex basis. The transform below does the fitting. */
      flex-shrink: 0;
      box-shadow: none !important;
      transform: scale(${PRINT_SCALE});
      transform-origin: center center;
    }
    #certificate, #certificate * {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
  </style>
</head>
<body>
  ${cert.outerHTML}
</body>
</html>`);
    doc.close();

    // Print only once everything the certificate needs is actually loaded.
    // COLD-CACHE BUG this guards against: `doc.fonts.ready` can resolve BEFORE
    // the linked certificate.css loads (no font is requested until the CSS
    // arrives), and the large seal/signature PNGs may still be decoding — so
    // printing on `fonts.ready` alone yields just the inline SVG border on the
    // first click, and only "works" after refreshes warm the cache. We chain:
    // stylesheets → (fonts + images), with a hard timeout so print always fires.
    const runPrint = () => {
      const win = frame?.contentWindow;
      if (!win) return;
      win.focus();
      win.print();
    };

    const onceLoaded = (el: HTMLElement, isReady: () => boolean): Promise<void> =>
      isReady()
        ? Promise.resolve()
        : new Promise<void>((resolve) => {
            el.addEventListener("load", () => resolve(), { once: true });
            el.addEventListener("error", () => resolve(), { once: true });
          });

    const stylesheetsReady = Promise.all(
      Array.from(doc.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]')).map((link) =>
        onceLoaded(link, () => Boolean(link.sheet))
      )
    );

    const everythingReady = stylesheetsReady.then(() =>
      Promise.all<unknown>([
        doc.fonts?.ready ?? Promise.resolve(),
        ...Array.from(doc.images).map((img) =>
          onceLoaded(img, () => img.complete && img.naturalWidth > 0)
        ),
      ])
    );

    let printed = false;
    const printOnce = () => {
      if (printed) return;
      printed = true;
      runPrint();
    };

    everythingReady.then(printOnce);
    // Safety net: never leave the user stuck if a resource stalls.
    window.setTimeout(printOnce, 6000);
  }, []);

  return (
    <div className="cert-wrapper">
      {/* Load the certificate's own fonts + design CSS on this route only. */}
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link rel="stylesheet" href={FONTS_HREF} />
      <link rel="stylesheet" href={CSS_HREF} />

      <div className="btn-row">
        <button type="button" className="btn btn-primary" onClick={handlePrint}>
          🖨 Print / Save as PDF
        </button>
      </div>
      <p className="print-hint">
        In the print dialog: <strong>Paper size → Letter</strong>, <strong>Margins → None</strong>,{" "}
        <strong>Background graphics → On</strong>.
      </p>

      <div className="cert-scale-viewport" ref={viewportRef} style={{ marginTop: "16px" }}>
        <div id="cert-container" ref={containerRef} dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  );
}
