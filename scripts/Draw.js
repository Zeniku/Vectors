class Draw {
   pcircle(x, y, radius){
    if(radius < 0.05) return
    ctx.moveTo(Math.floor(x), Math.floor(y))
    ctx.arc(Math.floor(x), Math.floor(y), Math.floor(radius), 0, Math.PI * 2)
  }
   circle(x, y, radius, ctx = canvas){
    ctx.beginPath()
    //ctx.moveTo(Math.floor(x), Math.floor(y))
    ctx.arc(Math.floor(x), Math.floor(y), Math.floor(radius), 0, Math.PI * 2)
    ctx.fill()
  }
   lineRect(x, y, width, height, center = false){
    let cx = (center)? x - (width/2): x
    let cy = (center)? y - (height/2): y
    ctx.beginPath()
    ctx.strokeRect(Math.floor(cx), Math.floor(cy), width, height)
    ctx.stroke()
  }
   line(x1, y1, x2, y2, width){
    ctx.beginPath();
    ctx.moveTo(Math.floor(x1), Math.floor(y1));
    ctx.lineTo(Math.floor(x2), Math.floor(y2));
    ctx.lineWidth = width;
    ctx.stroke();
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
  constructor(canvas){
    this.ctx = canvas.getContext("2d");
  }

  clear(){
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  line(x1, y1, x2, y2, col){
    this.ctx.strokeStyle = col;
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();
  }

  save(){ this.ctx.save(); }
  restore(){ this.ctx.restore(); }
  translate(x,y){ this.ctx.translate(x,y); }
}
