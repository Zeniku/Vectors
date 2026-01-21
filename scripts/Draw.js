class Draw {
   pcircle(x, y, radius, ctx){
    if(radius < 0.05) return
    ctx.moveTo(Math.floor(x), Math.floor(y))
    ctx.arc(Math.floor(x), Math.floor(y), Math.floor(radius), 0, Math.PI * 2)
  }
   circle(x, y, radius, ctx){
    ctx.beginPath()
    //ctx.moveTo(Math.floor(x), Math.floor(y))
    ctx.arc(Math.floor(x), Math.floor(y), Math.floor(radius), 0, Math.PI * 2)
    ctx.fill()
  }
   lineRect(x, y, width, height, center = false, ctx){
    let cx = (center)? x - (width/2): x
    let cy = (center)? y - (height/2): y
    ctx.beginPath()
    ctx.strokeRect(Math.floor(cx), Math.floor(cy), width, height)
    ctx.stroke()
  }
   line(x1, y1, x2, y2, width){
    this.ctx.beginPath();
    this.ctx.moveTo(Math.floor(x1), Math.floor(y1));
    this.ctx.lineTo(Math.floor(x2), Math.floor(y2));
    this.ctx.lineWidth = width;
    this.ctx.stroke();
  }
  
  drawArrow(x1,y1,x2,y2, color, width=1){
      this.ctx.save();
      const angle = Math.atan2(y2-y1,x2-x1);
      const len = 10 + width; const headAngle = Math.PI/7;
      const lx = x2 -(Math.cos(angle) * len), ly = y2 -(Math.sin(angle) * len)
      this.ctx.strokeStyle = color; this.ctx.fillStyle = color; this.ctx.lineWidth = width; this.ctx.lineJoin='round'; this.ctx.lineCap='round';
      this.ctx.beginPath(); this.ctx.moveTo(x1,y1); this.ctx.lineTo(lx,ly); this.ctx.stroke();
      
      // arrowhead
      this.ctx.beginPath();
      this.ctx.moveTo(x2,y2);
      this.ctx.lineTo(x2 - len * Math.cos(angle - headAngle), y2 - len*Math.sin(angle - headAngle));
      this.ctx.lineTo(x2 - len * Math.cos(angle + headAngle), y2 - len*Math.sin(angle + headAngle));
      this.ctx.closePath();
      this.ctx.fill();
      this.ctx.restore();
  }
  constructor(screen){
    this.canvas = screen
    this.ctx = screen.getContext("2d");
  }

  clear(){
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  save(){ this.ctx.save(); }
  restore(){ this.ctx.restore(); }
  translate(x,y){ this.ctx.translate(x,y); }
  
  drawGrid(width, height){
      this.clear();
      this.save();
      // background subtle gradient handled by CSS, draw grid lines
      this.ctx.strokeStyle = 'rgba(255,255,255,0.03)';
      
      let baseUnit = 10;
      const cx = width/2, cy = height/2;

      // adjust by powers of 10 based on zoom
      const z = Math.log10(1 / global.zoomv);
      // round to nearest integer step
      const pow = Math.floor(z);
      let unit = baseUnit * 10 * Math.pow(10, pow);
  
      let step = unit * global.zoomv
      let step2 = step * baseUnit
      let maxUnitsX = Math.ceil(width/2/step);
      let maxUnitsY = Math.ceil(height/2/step);
      // vertical lines
      for(let x = cx % step; x < width; x += step){
        this.line(x, 0, x, height, 1)
      }
      // horizontal lines
      for(let y = cy % step; y < height; y += step){
        this.line(0, y, width, y, 1)
      }
      for(let x = cx % step2; x < width; x += step2){
        this.line(x, 0, x, height, 1.5)
      }
      // horizontal lines
      for(let y = cy % step2; y < height; y += step2){
        this.line(0, y, width, y, 1.5)
      }
      // axes
      this.ctx.strokeStyle = 'rgba(255,255,255,0.12)'; 
      this.line(0, cy, width, cy, 1.5)
      this.line(cx, 0, cx, height, 1.5)


      // axis ticks and numbers
      this.ctx.fillStyle = 'rgba(255,255,255,0.6)'; 
      this.ctx.font = 12 +'px system-ui';
      
      
      for(let i = -maxUnitsX; i <= maxUnitsX; i++){
        const px = cx + i * step;
        if(px < 0 || px > width) continue;
        if(i === 0) continue;
        this.ctx.fillText(i * unit, px - 2, cy + 12);
      }
      for(let j = -maxUnitsY; j <= maxUnitsY; j++){
        const py = cy - j * step;
        if(py < 0 || py > height) continue;
        if(j===0) continue;
        this.ctx.fillText(j * unit, cx + 4, py + 4);
      }

      this.restore();
    }
}