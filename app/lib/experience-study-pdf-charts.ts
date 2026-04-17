/**
 * Canvas renders for survey PDF exports (browser only). Returns PNG data URLs for jsPDF.addImage.
 */

import type { NamedCount, NamedValue, TrendPoint } from "@/lib/experience-study-analytics";

const DPR = 2;

function setupCanvas(cssW: number, cssH: number): { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D } {
  const canvas = document.createElement("canvas");
  canvas.width = Math.floor(cssW * DPR);
  canvas.height = Math.floor(cssH * DPR);
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D context unavailable");
  ctx.scale(DPR, DPR);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, cssW, cssH);
  return { canvas, ctx };
}

function drawTitle(ctx: CanvasRenderingContext2D, title: string, w: number) {
  ctx.fillStyle = "#0f172a";
  ctx.font = "600 15px system-ui, -apple-system, Segoe UI, sans-serif";
  ctx.fillText(title, 14, 24);
  ctx.strokeStyle = "#e2e8f0";
  ctx.beginPath();
  ctx.moveTo(14, 32);
  ctx.lineTo(w - 14, 32);
  ctx.stroke();
}

/** Responses over time — line chart (amber stroke, matches dashboard). */
export function renderTrendLineChartPng(data: TrendPoint[], title: string): string {
  const W = 640;
  const H = 220;
  const { canvas, ctx } = setupCanvas(W, H);
  drawTitle(ctx, title, W);

  const padL = 44;
  const padR = 20;
  const padT = 44;
  const padB = 52;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;
  const maxY = Math.max(...data.map((d) => d.count), 1);
  const n = Math.max(data.length, 1);

  ctx.strokeStyle = "#e2e8f0";
  ctx.lineWidth = 1;
  for (let g = 0; g <= 4; g++) {
    const gy = padT + (plotH * g) / 4;
    ctx.beginPath();
    ctx.moveTo(padL, gy);
    ctx.lineTo(padL + plotW, gy);
    ctx.stroke();
    const val = Math.round(maxY - (maxY * g) / 4);
    ctx.fillStyle = "#64748b";
    ctx.font = "11px system-ui, sans-serif";
    ctx.fillText(String(val), 6, gy + 4);
  }

  if (data.length === 0) {
    ctx.fillStyle = "#94a3b8";
    ctx.font = "13px system-ui, sans-serif";
    ctx.fillText("No dated responses", padL, padT + plotH / 2);
    return canvas.toDataURL("image/png");
  }

  const xAt = (i: number) => padL + (n === 1 ? plotW / 2 : (plotW * i) / (n - 1));
  const yAt = (c: number) => padT + plotH - (c / maxY) * plotH;

  ctx.strokeStyle = "#f59e0b";
  ctx.lineWidth = 2.5;
  ctx.lineJoin = "round";
  ctx.beginPath();
  data.forEach((d, i) => {
    const x = xAt(i);
    const y = yAt(d.count);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();

  data.forEach((d, i) => {
    const x = xAt(i);
    const y = yAt(d.count);
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#f59e0b";
    ctx.lineWidth = 2;
    ctx.stroke();
  });

  ctx.fillStyle = "#475569";
  ctx.font = "10px system-ui, sans-serif";
  const labelStep = n > 10 ? Math.ceil(n / 10) : 1;
  data.forEach((d, i) => {
    if (i % labelStep !== 0 && i !== n - 1) return;
    const x = xAt(i);
    ctx.save();
    ctx.translate(x, H - padB + 8);
    ctx.rotate(-Math.PI / 6);
    ctx.textAlign = "right";
    ctx.fillText(d.name, 0, 0);
    ctx.restore();
  });

  return canvas.toDataURL("image/png");
}

/** Vertical bars (blue), e.g. navigation ratings. */
export function renderVerticalBarChartPng(data: NamedCount[], title: string, barColor: string): string {
  const W = 520;
  const H = 220;
  const { canvas, ctx } = setupCanvas(W, H);
  drawTitle(ctx, title, W);

  const padL = 36;
  const padR = 16;
  const padT = 44;
  const padB = 40;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;
  const maxC = Math.max(...data.map((d) => d.count), 1);
  const bw = Math.min(48, (plotW / data.length) * 0.65);
  const gap = (plotW - bw * data.length) / Math.max(data.length + 1, 1);

  data.forEach((d, i) => {
    const x = padL + gap + i * (bw + gap);
    const h = (d.count / maxC) * plotH;
    const y = padT + plotH - h;
    ctx.fillStyle = barColor;
    ctx.fillRect(x, y, bw, h);
    ctx.fillStyle = "#334155";
    ctx.font = "11px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(d.name, x + bw / 2, H - 18);
    if (d.count > 0) {
      ctx.fillStyle = "#0f172a";
      ctx.font = "600 11px system-ui, sans-serif";
      ctx.fillText(String(d.count), x + bw / 2, y - 6);
    }
  });

  return canvas.toDataURL("image/png");
}

/** Horizontal bars (green), e.g. sections visited. */
export function renderHorizontalBarChartPng(data: NamedCount[], title: string, barColor: string): string {
  const W = 520;
  const H = 200;
  const { canvas, ctx } = setupCanvas(W, H);
  drawTitle(ctx, title, W);

  const padL = 162;
  const padR = 36;
  const padT = 44;
  const rowH = (H - padT - 16) / Math.max(data.length, 1);
  const maxC = Math.max(...data.map((d) => d.count), 1);
  const barMaxW = W - padL - padR;

  data.forEach((d, i) => {
    const y = padT + i * rowH + 8;
    ctx.fillStyle = "#334155";
    ctx.font = "12px system-ui, sans-serif";
    ctx.textAlign = "left";
    const label =
      d.name.length > 22 ? `${d.name.slice(0, 20)}…` : d.name;
    ctx.fillText(label, 14, y + 14);
    const bw = (d.count / maxC) * barMaxW;
    ctx.fillStyle = "#e2e8f0";
    ctx.fillRect(padL, y, barMaxW, 22);
    ctx.fillStyle = barColor;
    ctx.fillRect(padL, y, Math.max(bw, d.count > 0 ? 4 : 0), 22);
    ctx.fillStyle = "#0f172a";
    ctx.font = "600 11px system-ui, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(String(d.count), padL + barMaxW + 8, y + 15);
  });

  return canvas.toDataURL("image/png");
}

/** Pie + legend (same palette order as dashboard). */
export function renderPieChartPng(data: NamedValue[], title: string, colors: string[]): string {
  const W = 520;
  const H = 220;
  const { canvas, ctx } = setupCanvas(W, H);
  drawTitle(ctx, title, W);

  const total = data.reduce((s, d) => s + d.value, 0);
  const cx = 150;
  const cy = H / 2 + 8;
  const r = 62;

  if (total === 0) {
    ctx.fillStyle = "#94a3b8";
    ctx.font = "13px system-ui, sans-serif";
    ctx.fillText("No data", cx - 24, cy);
    return canvas.toDataURL("image/png");
  }

  let angle = -Math.PI / 2;
  data.forEach((d, i) => {
    const slice = (d.value / total) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, angle, angle + slice);
    ctx.closePath();
    ctx.fillStyle = colors[i % colors.length];
    ctx.fill();
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    ctx.stroke();
    angle += slice;
  });

  let ly = 52;
  const lx = 300;
  data.forEach((d, i) => {
    ctx.fillStyle = colors[i % colors.length];
    ctx.fillRect(lx, ly, 12, 12);
    ctx.fillStyle = "#334155";
    ctx.font = "12px system-ui, sans-serif";
    ctx.textAlign = "left";
    const pct = total ? Math.round((d.value / total) * 100) : 0;
    ctx.fillText(`${d.name}  (${d.value} · ${pct}%)`, lx + 18, ly + 10);
    ly += 22;
  });

  return canvas.toDataURL("image/png");
}
