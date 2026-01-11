window.onload = () => {
  const canvas = document.getElementById("canvas");
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  

  const draw = new Draw(canvas);
  let ctx = draw.ctx
  const vecHandler = new VecHandler();

  // Vector Add Window
  new VectorWindow({ vecHandler });

  // Lerp Slider Window
  let windowPanel = new WindowPanel({
    title: "Vector sliders",
    x: 10, y: 350
  })
  
  windowPanel.addSliderInput("lerp", 0, 1, 1, (v) => global.lerpv = v);
  windowPanel.addSliderInput("zoom", 1, 10, 10, (v) => global.zoomv = v);
  
  global.results = new WindowPanel({
    title: "Resultant",
    x: 10, y: 500
  })

  // Vector List Window
  const vectorListWindow = new VectorList({ vecHandler });

//const resultUI = new ResultWindow();


function drawGrid(){
      const w = canvas.clientWidth, h = canvas.clientHeight;
      draw.ctx.clearRect(0,0,w,h);
      draw.ctx.save();
      // background subtle gradient handled by CSS, draw grid lines
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(255,255,255,0.03)';
      const step = global.zoomv; // 1 unit per step
      const cx = w/2, cy = h/2;
      // vertical lines
      for(let x = cx % step; x < w; x += step){
        ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,h); ctx.stroke();
      }
      // horizontal lines
      for(let y = cy % step; y < h; y += step){
        ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(w,y); ctx.stroke();
      }
      // axes
      ctx.strokeStyle = 'rgba(255,255,255,0.12)'; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(0,cy); ctx.lineTo(w,cy); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx,0); ctx.lineTo(cx,h); ctx.stroke();

      // axis ticks and numbers
      ctx.fillStyle = 'rgba(255,255,255,0.6)'; ctx.font = 12 *(global.zoomv /10) +'px system-ui';
      const unit = 1;
      const maxUnitsX = Math.ceil(w/2/step);
      const maxUnitsY = Math.ceil(h/2/step);
      
      for(let i=-maxUnitsX;i<=maxUnitsX;i++){
        const px = cx + i*step;
        if(px<0||px>w) continue;
        if(i===0) continue;
        ctx.fillText(i*unit, px+2, cy+12);
      }
      for(let j=-maxUnitsY;j<=maxUnitsY;j++){
        const py = cy - j*step;
        if(py<-1||py>h) continue;
        if(j===0) continue;
        ctx.fillText(j*unit, cx+4, py-4);
      }

      ctx.restore();
    }
  
  function loop(){
    draw.clear();
    
    //draw.ctx.translate(canvas.width/2, canvas.height/2);
    drawGrid(canvas)
    vecHandler.drawPolyVecs(draw, "#60a5fa", 1, global.lerpv);
    
    draw.ctx.setTransform(1,0,0,1,0,0);

    // Re-render list each frame for real-time updates
    vectorListWindow.render();
    requestAnimationFrame(loop);
  }

  loop();
};
