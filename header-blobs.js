// Animated liquid/gradient blobs background for header (adapted from https://codepen.io/artzub/pen/XJJooON)
(function() {
  const header = document.querySelector('header');
  if (!header) return;
  const canvas = document.createElement('canvas');
  canvas.id = 'header-blobs-canvas';
  canvas.style.position = 'absolute';
  canvas.style.left = 0;
  canvas.style.top = 0;
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.zIndex = 0;
  canvas.style.pointerEvents = 'none';
  header.style.position = 'relative';
  header.insertBefore(canvas, header.firstChild);

  let w, h, ctx;
  function resize() {
    w = header.offsetWidth;
    h = header.offsetHeight;
    canvas.width = w;
    canvas.height = h;
  }
  resize();
  ctx = canvas.getContext('2d');
  window.addEventListener('resize', resize);

  // Blob settings
  const blobs = [];
  const colors = [
    ['#ff512f', '#dd2476'],
    ['#2193b0', '#6dd5ed'],
    ['#ee9ca7', '#ffdde1'],
    ['#43cea2', '#185a9d']
  ];
  for (let i = 0; i < 4; i++) {
    blobs.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 120 + Math.random() * 40,
      dx: 1 + Math.random() * 1.2,
      dy: 1 + Math.random() * 1.2,
      color: colors[i % colors.length]
    });
  }

  function drawBlob(blob, t) {
    const grad = ctx.createRadialGradient(blob.x, blob.y, blob.r * 0.2, blob.x, blob.y, blob.r);
    grad.addColorStop(0, blob.color[0]);
    grad.addColorStop(1, blob.color[1]);
    ctx.globalAlpha = 0.45;
    ctx.beginPath();
    ctx.arc(blob.x, blob.y, blob.r, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  function animate(t) {
    ctx.clearRect(0, 0, w, h);
    for (const blob of blobs) {
      drawBlob(blob, t);
      blob.x += Math.sin(t / 1000 + blob.dx) * 0.8;
      blob.y += Math.cos(t / 1200 + blob.dy) * 0.8;
      // Bounce off edges
      if (blob.x - blob.r < 0 || blob.x + blob.r > w) blob.dx *= -1;
      if (blob.y - blob.r < 0 || blob.y + blob.r > h) blob.dy *= -1;
    }
    requestAnimationFrame(animate);
  }
  animate(0);
})();
