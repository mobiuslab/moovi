function getScaledContext(canvas) {
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  var ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  return ctx;
}

function toRadian(angle) {
  return (angle / 180.0) * Math.PI;
}

function drawM(g, R) {
  const startAngle = toRadian(180);
  const endAngle = toRadian(0);
  const counterClockwise = false;

  const LW_PATCH = g.lineWidth / 2;

  const R1 = R / 2;
  const T = R1;
  const JT1_x = 0;
  const JT1_y = 0 - T;
  const O1_x = R1;
  const O1_y = 0 - R1;

  g.beginPath();
  g.moveTo(0, T * 2 + LW_PATCH);
  g.lineTo(JT1_x, JT1_y);
  g.arc(O1_x, O1_y, R1, startAngle, endAngle, counterClockwise);
  g.lineTo(JT1_x + R, T * 2 + LW_PATCH);
  g.arc(O1_x + R, O1_y, R1, startAngle, endAngle, counterClockwise);
  g.lineTo(JT1_x + R + R, T * 2 + LW_PATCH);
  g.stroke();

  return R * 2;
}

function drawWideM(g, R) {
  const startAngle = toRadian(180);
  const endAngle = toRadian(0);
  const counterClockwise = false;

  const LW_PATCH = g.lineWidth / 2;

  const R1 = R * 0.75;
  const T = R - R1;
  const JT1_x = 0;
  const JT1_y = 0 - T;
  const O1_x = R1;
  const O1_y = 0 - (R - R1);

  g.beginPath();
  g.moveTo(0, R + LW_PATCH);
  g.lineTo(JT1_x, JT1_y);
  g.arc(O1_x, O1_y, R1, startAngle, endAngle, counterClockwise);
  g.lineTo(JT1_x + R1 * 2, R + LW_PATCH);
  g.arc(O1_x + R1 * 2, O1_y, R1, startAngle, endAngle, counterClockwise);
  g.lineTo(JT1_x + R1 * 4, R + LW_PATCH);
  g.stroke();

  return R1 * 4;
}

function drawOB(g, R) {
  let startAngle =  toRadian(45);
  let endAngle = toRadian(270 + 45);
  const counterClockwise = false;

  const LW_PATCH = g.lineWidth / 2;
  const S = 0.75;
  const Ss = 0.25;
  const Sm = 0.4;
  const R1 = R * S;
  const R2 = R;
  const JR1 = Math.sqrt(2) * R1;
  const JR2 = Math.sqrt(2) * R2;
  const Ts = R1 * Ss;
  const Js_x = R1 + JR1 - Ts;
  const Js_y = Ts;
  const T1 = JR1 / 2;
  const JT1_x = R1 + T1;
  const JT1_y = T1;
  const O1_x = R1;
  const O1_y = 0;

  const T2 = JR2 / 2;
  const JT2_x = R1 + JR1 + T2;
  const JT2_y = T2;
  const O2_x = R1 + JR1 + JR2;
  const O2_y = 0;

  const Tm = R2 * Sm;
  const Jm_x = R1 + JR1 + Tm;
  const Jm_y = 0 - Tm;

  const Te = 1.5 * R2 - Tm;
  const Je_x = R1 + JR1 + Tm;
  const Je_y = 0 - 1.5 * R2 - LW_PATCH;

  g.beginPath();
  g.moveTo(Js_x, Js_y);
  g.lineTo(JT1_x, JT1_y);
  g.arc(O1_x, O1_y, R1, startAngle, endAngle, counterClockwise);
  g.lineTo(JT2_x, JT2_y);

  startAngle = toRadian(90+ 45);
  endAngle = toRadian(180 + 45);
  g.arc(O2_x, O2_y, R2, startAngle, endAngle, !counterClockwise);
  g.lineTo(Jm_x, Jm_y);
  g.lineTo(Je_x, Je_y);
  g.stroke();

  return R1 + JR1 + JR2 + R2;
}

function drawI(g, R) {
  let startAngle = toRadian(0);
  let endAngle = toRadian(360);
  const counterClockwise = false;

  const LW_PATCH = g.lineWidth / 2;
  const T = R / 2;
  const O1_x = 0;
  const O1_y = 0 - R - T;
  const DOT_R  = g.lineWidth / 2.0;
  const JT1_x = 0;
  const JT1_y = 0 - R - LW_PATCH;
  const JT2_x = 0;
  const JT2_y = 0 + 2 * T;

  if (g.lineWidth > 2) {
    g.beginPath();
    g.arc(O1_x, O1_y, DOT_R, startAngle, endAngle, counterClockwise);
    g.fill();
    g.closePath();
  }

  g.beginPath();
  g.moveTo(JT1_x, JT1_y);
  g.lineTo(JT2_x, JT2_y + LW_PATCH);
  g.stroke();

  return 1;
}

function drawU(g, R) {
  const startAngle = toRadian(180);
  const endAngle = toRadian(0);
  const counterClockwise = true;

  const LW_PATCH = g.lineWidth / 2;
  const S = 0.75;
  const Rs = R * S;
  const Ts = R - Rs;
  const O1_x = Rs;
  const O1_y = Ts;
  const JT1_x = 0;
  const JT1_y = 0 - R - LW_PATCH;
  const Js_x = 0;
  const Js_y = 0 - Ts;

  g.beginPath();
  g.moveTo(JT1_x, JT1_y);
  g.lineTo(0, 0);
  g.lineTo(Js_x, Js_y);
  g.arc(O1_x, O1_y, Rs, startAngle, endAngle, counterClockwise);
  g.lineTo(Js_x + 2 * Rs, Js_y);
  g.lineTo(JT1_x + 2 * Rs, JT1_y);
  g.stroke();

  return 2 * Rs;
}

function drawS(g, R) {
  const ang = 22;
  let startAngle = toRadian(-ang);
  let endAngle = toRadian(90);
  const counterClockwise = true;

  const LW_PATCH = g.lineWidth / 2;
  const S = 0.55;
  const R1 = R * (1 - S);
  const R2 = R * S;
  const O1_x = R2;
  const O1_y = 0 - (R - R1);
  const O2_x = R2;
  const O2_y = R - R2;
  g.beginPath();
  g.arc(O1_x, O1_y, R1, startAngle, endAngle, counterClockwise);
  startAngle = toRadian(-90);
  endAngle = toRadian(180 - ang);
  g.arc(O2_x, O2_y, R2, startAngle, endAngle, !counterClockwise);
  g.stroke();

  //g.beginPath();
  //startAngle = toRadian(-90);
  //endAngle = toRadian(150);
  //g.arc(radius, radius * 2, radius, startAngle, endAngle, !counterClockwise);
  //g.stroke();

  return R2;
}

function drawWideS(g, R) {
  let startAngle = toRadian(0);
  let endAngle = toRadian(-90);
  const counterClockwise = true;

  const LW_PATCH = g.lineWidth / 2;
  const CH_WIDTH = R * 0.75 * 2;
  const R1 = R * 0.5;
  const R2 = R1 * 0.5;
  const O1_x = R1;
  const O1_y = 0 - R1;
  const O2_x = CH_WIDTH - R2;
  const O2_y = 0 - 2 * R1 + R2;
  g.beginPath();
  g.arc(O2_x, O2_y, R2, startAngle, endAngle, counterClockwise);
  g.lineTo(R1, 0 - 2 * R1);
  startAngle = toRadian(-90);
  endAngle = toRadian(90);
  g.arc(O1_x, O1_y, R1, startAngle, endAngle, counterClockwise);
  g.lineTo(CH_WIDTH - R1, 0);
  startAngle = toRadian(-90);
  endAngle = toRadian(90);
  g.arc(CH_WIDTH - O1_x,- O1_y, R1, startAngle, endAngle, !counterClockwise);
  g.lineTo(R2, 2 * R1);
  startAngle = toRadian(90);
  endAngle = toRadian(180);
  g.arc(CH_WIDTH - O2_x, 0 - O2_y, R2, startAngle, endAngle, !counterClockwise);
  //g.arc(O1_x, O1_y, R1, startAngle, endAngle, counterClockwise);
  //startAngle = toRadian(-90);
  //endAngle = toRadian(180 - ang);
  g.stroke();

  //g.beginPath();
  //startAngle = toRadian(-90);
  //endAngle = toRadian(150);
  //g.arc(radius, radius * 2, radius, startAngle, endAngle, !counterClockwise);
  //g.stroke();

  return CH_WIDTH;
}

function drawMobius(g, x, y, color, lineWidth) {
  const RADIUS = 60;
  const LOGO_WIDTH = 755;
  const RADIUS_OB = RADIUS * 2;
  const SPACE = 35;
  const s = x / LOGO_WIDTH * 0.75;
  console.log(x, y);
  g.setTransform(s, 0, 0, s, (x - LOGO_WIDTH * s) / 2, y / 2);

  g.save();

  g.strokeStyle = color;
  g.fillStyle = color;
  g.lineWidth = lineWidth;
  //g.translate(x - LOGO_WIDTH / 2.0, y - RADIUS_OB / 2);

  let totalWidth = 0;
  let width = drawWideM(g, RADIUS);
  g.translate(width + SPACE, 0);
  totalWidth += (width + SPACE);

  width = drawOB(g, RADIUS);
  g.translate(width + SPACE, 0);
  totalWidth += (width + SPACE);

  width = drawI(g, RADIUS);
  g.translate(width + SPACE, 0);
  totalWidth += (width + SPACE);

  width = drawU(g, RADIUS);
  g.translate(width + SPACE, 0);
  totalWidth += (width + SPACE);

  width = drawWideS(g, RADIUS);
  totalWidth += width;
  g.restore();

  console.log(totalWidth);

  //g.scale(s, s);
  //g.translate(x - LOGO_WIDTH / 2.0, y - RADIUS_OB / 2);
}
