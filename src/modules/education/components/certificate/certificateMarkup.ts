// The certificate document markup, copied byte-for-byte from the approved
// standalone design (certificate-reference/certificate.html). The ONLY changes
// from the original are: (1) asset paths now point at /certificates/assets/,
// and (2) the four dynamic fields (name, course, date, id) are interpolated
// from real data instead of being filled in by a form.
//
// It is emitted as an HTML string (rendered via dangerouslySetInnerHTML) so the
// SVG frame + corner decorations stay pixel-identical — no hand-conversion of
// SVG attributes to JSX camelCase, which is where subtle drift would creep in.

export interface CertificateFields {
  /** Student full name — e.g. "Sarah Johnson". */
  name: string;
  /** Course/program name — e.g. "Swedish Massage Therapy (120 Hours)". */
  course: string;
  /** Formatted issue date — e.g. "July 6, 2026". */
  date: string;
  /** Public certificate number — e.g. "PMA-2026-0042". */
  id: string;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function buildCertificateHtml({ name, course, date, id }: CertificateFields): string {
  return `<div id="certificate">

    <!-- Cabinet panel door border frame (canvas 1122×867 — US Letter landscape) -->
    <svg class="cert-frame" viewBox="0 0 1122 867" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Outer border: concave corners matching inner border style -->
      <!-- Outer rect: (20,20)→(1102,847), cove radius = 24 px -->
      <path d="
        M 44,20 L 1078,20
        Q 1078,44 1102,44
        L 1102,823
        Q 1078,823 1078,847
        L 44,847
        Q 44,823 20,823
        L 20,44
        Q 44,44 44,20 Z"
            stroke="#2d6a40" stroke-width="1.8" fill="none"/>
      <!--
        Inner border: concave corners (router-cut cove style).
        Each corner uses a quadratic bezier with the control point pulled
        toward the rectangle interior, creating the inward scallop.
        Inner rect: (28,28)→(1094,839), corner cove radius = 24 px.
      -->
      <path d="
        M 52,28 L 1070,28
        Q 1070,52 1094,52
        L 1094,815
        Q 1070,815 1070,839
        L 52,839
        Q 52,815 28,815
        L 28,52
        Q 52,52 52,28 Z"
            stroke="#1a4a2e" stroke-width="1.5" fill="none"/>
    </svg>

    <!-- ══ BOTTOM-LEFT CORNER — thick band (transparent channel reveals frame lines) ══ -->
    <svg class="dec-corner dec-corner-bl dec-corner-band" viewBox="0 0 420 520" preserveAspectRatio="xMinYMax slice" shape-rendering="geometricPrecision" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="greenGradBL" x1="0" y1="520" x2="175" y2="310" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#224828"/>
          <stop offset="6%" stop-color="#345e38"/>
          <stop offset="22%" stop-color="#4c783c"/>
          <stop offset="46%" stop-color="#659248"/>
          <stop offset="70%" stop-color="#7ea854"/>
          <stop offset="100%" stop-color="#92bc60"/>
        </linearGradient>
        <linearGradient id="goldFlowBL" x1="0" y1="520" x2="82" y2="352" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#8a7038"/>
          <stop offset="22%" stop-color="#b89850"/>
          <stop offset="48%" stop-color="#f0dea0"/>
          <stop offset="68%" stop-color="#d8b868"/>
          <stop offset="100%" stop-color="#9a8040"/>
        </linearGradient>
        <clipPath id="clipThickBandBL">
          <path fill-rule="evenodd" d="M 0,278 C 14,338 58,504 196,520 L 0,520 Z
            M 0,302 C 12,356 52,478 168,516
            L 112,494 C 44,482 10,396 0,350 Z"/>
        </clipPath>
      </defs>
      <path fill-rule="evenodd" fill="url(#greenGradBL)"
            d="M 0,278 C 14,338 58,504 196,520 L 0,520 Z
               M 0,302 C 12,356 52,478 168,516
               L 112,494 C 44,482 10,396 0,350 Z"/>
      <g clip-path="url(#clipThickBandBL)">
        <path d="M 0,352 C 6,398 26,475 90,520"
              stroke="#c8a84b" stroke-width="3.5" stroke-opacity="0.16"
              stroke-linecap="round" fill="none"/>
        <path d="M 0,352 C 6,398 26,475 90,520"
              stroke="url(#goldFlowBL)" stroke-width="1.6"
              stroke-linecap="round" fill="none"/>
        <path d="M 0,352 C 6,398 26,475 90,520"
              stroke="#faf0c8" stroke-width="0.75" stroke-opacity="0.88"
              stroke-linecap="round" fill="none"/>
      </g>
    </svg>

    <!-- ══ BOTTOM-LEFT CORNER — thin outer arc (above frame; lines visible in channel) ══ -->
    <svg class="dec-corner dec-corner-bl dec-corner-arc" viewBox="0 0 420 520" preserveAspectRatio="xMinYMax slice" shape-rendering="geometricPrecision" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="greenGradUpperBL" x1="0" y1="508" x2="118" y2="355" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#4a7844"/>
          <stop offset="35%" stop-color="#6a9858"/>
          <stop offset="68%" stop-color="#88b86a"/>
          <stop offset="100%" stop-color="#a8cc82"/>
        </linearGradient>
      </defs>
      <path d="M 0,302 C 12,356 52,478 168,516"
            stroke="url(#greenGradUpperBL)" stroke-width="2.6"
            stroke-linecap="round" fill="none"/>
      <path d="M 0,302 C 12,356 52,478 168,516"
            stroke="#b8d49a" stroke-width="1" stroke-opacity="0.65"
            stroke-linecap="round" fill="none"/>
    </svg>

    <!-- ══ TOP-RIGHT CORNER — mirrored thick band (transparent channel reveals frame lines) ══ -->
    <svg class="dec-corner dec-corner-tr dec-corner-band" viewBox="0 0 420 520" preserveAspectRatio="xMaxYMin slice" shape-rendering="geometricPrecision" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="greenGradTR" x1="0" y1="520" x2="175" y2="310" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#224828"/>
          <stop offset="6%" stop-color="#345e38"/>
          <stop offset="22%" stop-color="#4c783c"/>
          <stop offset="46%" stop-color="#659248"/>
          <stop offset="70%" stop-color="#7ea854"/>
          <stop offset="100%" stop-color="#92bc60"/>
        </linearGradient>
        <linearGradient id="goldFlowTR" x1="0" y1="520" x2="82" y2="352" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#8a7038"/>
          <stop offset="22%" stop-color="#b89850"/>
          <stop offset="48%" stop-color="#f0dea0"/>
          <stop offset="68%" stop-color="#d8b868"/>
          <stop offset="100%" stop-color="#9a8040"/>
        </linearGradient>
        <clipPath id="clipThickBandTR">
          <path fill-rule="evenodd" d="M 0,278 C 14,338 58,504 196,520 L 0,520 Z
            M 0,302 C 12,356 52,478 168,516
            L 112,494 C 44,482 10,396 0,350 Z"/>
        </clipPath>
      </defs>
      <g transform="rotate(180 210 260)">
        <path fill-rule="evenodd" fill="url(#greenGradTR)"
              d="M 0,278 C 14,338 58,504 196,520 L 0,520 Z
                 M 0,302 C 12,356 52,478 168,516
                 L 112,494 C 44,482 10,396 0,350 Z"/>
        <g clip-path="url(#clipThickBandTR)">
          <path d="M 0,352 C 6,398 26,475 90,520"
                stroke="#c8a84b" stroke-width="3.5" stroke-opacity="0.16"
                stroke-linecap="round" fill="none"/>
          <path d="M 0,352 C 6,398 26,475 90,520"
                stroke="url(#goldFlowTR)" stroke-width="1.6"
                stroke-linecap="round" fill="none"/>
          <path d="M 0,352 C 6,398 26,475 90,520"
                stroke="#faf0c8" stroke-width="0.75" stroke-opacity="0.88"
                stroke-linecap="round" fill="none"/>
        </g>
      </g>
    </svg>

    <!-- ══ TOP-RIGHT CORNER — mirrored thin outer arc (above frame; lines visible in channel) ══ -->
    <svg class="dec-corner dec-corner-tr dec-corner-arc" viewBox="0 0 420 520" preserveAspectRatio="xMaxYMin slice" shape-rendering="geometricPrecision" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="greenGradUpperTR" x1="0" y1="508" x2="118" y2="355" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#4a7844"/>
          <stop offset="35%" stop-color="#6a9858"/>
          <stop offset="68%" stop-color="#88b86a"/>
          <stop offset="100%" stop-color="#a8cc82"/>
        </linearGradient>
      </defs>
      <g transform="rotate(180 210 260)">
        <path d="M 0,302 C 12,356 52,478 168,516"
              stroke="url(#greenGradUpperTR)" stroke-width="2.6"
              stroke-linecap="round" fill="none"/>
        <path d="M 0,302 C 12,356 52,478 168,516"
              stroke="#b8d49a" stroke-width="1" stroke-opacity="0.65"
              stroke-linecap="round" fill="none"/>
      </g>
    </svg>

    <!-- CONTENT -->
    <div class="cert-content">

      <!-- Logo -->
      <div class="cert-logo">
        <img
          src="/certificates/assets/logo-transparent.png"
          alt="ProMassage leaf mark"
        />
        <div class="cert-brand">PROMASSAGE</div>
        <div class="cert-brand-sub">ACADEMY</div>
      </div>

      <div class="cert-heading">
        <div class="cert-title" id="disp-doc-type">CERTIFICATE</div>
        <div class="cert-subtitle-row">
          <div class="cert-line"></div>
          <div class="cert-subtitle" id="disp-doc-subtitle">OF COMPLETION</div>
          <div class="cert-line"></div>
        </div>
      </div>

      <div class="cert-presented" id="disp-presented">This Certificate is Proudly Presented To</div>

      <div class="cert-name-area">
        <div class="cert-name" id="disp-name">${escapeHtml(name)}</div>
      </div>

      <div class="cert-divider">
        <div class="cert-divider-line"></div>
        <img
          src="/certificates/assets/logo-transparent.png"
          alt=""
          class="cert-divider-logo"
        />
        <div class="cert-divider-line"></div>
      </div>

      <div class="cert-completing">For Successfully Completing The</div>

      <div class="cert-course" id="disp-course">${escapeHtml(course)}</div>

      <div class="cert-body-text">
        With all rights and privileges pertaining thereto.<br>
        In witness whereof, the signature of the authorized representatives are affixed.
      </div>

      <!-- Footer -->
      <div class="cert-footer">
        <div class="cert-footer-director">
          <div class="cert-footer-above-line">
            <img
              class="cert-sig-img"
              src="/certificates/assets/signature-transparent.png"
              alt="Academic Director signature"
            />
          </div>
          <div class="cert-sig-line"></div>
          <div class="cert-footer-below-line">
            <div class="cert-footer-value cert-director-name">Maryam Roostaie</div>
            <div class="cert-footer-label">Academic Director</div>
          </div>
        </div>

        <div class="cert-footer-center">
          <img class="cert-seal" src="/certificates/assets/stamp-transparent.png" alt="ProMassage Academy seal" />
        </div>

        <div class="cert-footer-right">
          <div class="cert-footer-above-line">
            <div class="cert-footer-label">Date of Issue</div>
            <div class="cert-footer-value" id="disp-date">${escapeHtml(date)}</div>
          </div>
          <div class="cert-sig-line"></div>
          <div class="cert-footer-below-line">
            <div class="cert-footer-value" id="disp-id">${escapeHtml(id)}</div>
            <div class="cert-footer-label">Certificate ID</div>
          </div>
        </div>
      </div>

    </div><!-- /cert-content -->
  </div><!-- /certificate -->`;
}
