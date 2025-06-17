// Fog animation for footer (overlapping circles, gentle movement)
(function() {
  const fogFooter = document.createElement('canvas');
  fogFooter.id = 'fog-footer-canvas';
  fogFooter.width = window.innerWidth;
  fogFooter.height = 120;
  fogFooter.style.width = '100%';
  fogFooter.style.height = '120px';
  fogFooter.style.display = 'block';
  fogFooter.style.position = 'absolute';
  fogFooter.style.left = 0;
  fogFooter.style.bottom = 0;
  fogFooter.style.pointerEvents = 'none';
  document.querySelector('footer').style.position = 'relative';
  document.querySelector('footer').appendChild(fogFooter);

  const ctx = fogFooter.getContext('2d');
  let w = fogFooter.width, h = fogFooter.height;
  const fogs = [];
  const fogCount = 7;
  for(let i=0;i<fogCount;i++){
    fogs.push({
      x: Math.random()*w,
      y: h/2 + Math.random()*h/2,
      r: 60+Math.random()*60,
      dx: 0.3+Math.random()*0.3,
      alpha: 0.13+Math.random()*0.06
    });
  }
  function drawFog() {
    ctx.clearRect(0,0,w,h);
    for(const f of fogs){
      ctx.save();
      ctx.globalAlpha = f.alpha;
      const grad = ctx.createRadialGradient(f.x, f.y, f.r*0.7, f.x, f.y, f.r);
      grad.addColorStop(0, '#fff');
      grad.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.r, 0, 2*Math.PI);
      ctx.fill();
      ctx.restore();
      f.x += f.dx;
      if(f.x-f.r> w) f.x = -f.r;
    }
    requestAnimationFrame(drawFog);
  }
  drawFog();

  window.addEventListener('resize', function() {
    fogFooter.width = window.innerWidth;
    w = fogFooter.width;
  });
})();
