class VecHandler {
  constructor(){
    this.vecDataList = [];
  }

  add(v){
    this.vecDataList.push(v);
    return v
  }

  drawPolyVecs(draw, scale, lerpv){
    draw.save();
    const cx = canvas.width/2, cy = canvas.height/2;
      // draw each vector from origin

for(const v of this.vecDataList){
    //if(!v.selected) continue;

    const end = Mathf.toCanvasCoord(v.x, v.y, global.zoomv);
    draw.drawArrow(cx,cy,end.x,end.y, v.color, v.selected?4:3);
    //if(showLabels){
      // draw components near tip
      draw.ctx.save(); 
      draw.ctx.font='12px system-ui'; 
      draw.ctx.fillStyle = v.color; 
      draw.ctx.fillText(`(${v.x.toFixed(2)}, ${v.y.toFixed(2)})`, end.x+8, end.y-8); 
      draw.ctx.restore();
  //}
      draw.ctx.save();
      
  // resultant
  
}
let ox = 0, oy = 0;
      for(const v of this.vecDataList){
        //if(v.selected) continue;
        const start = Mathf.toCanvasCoord(ox, oy, global.zoomv);
        const end = Mathf.toCanvasCoord(ox + v.x, oy + v.y, global.zoomv);
        draw.drawArrow(start.x, start.y, end.x, end.y, v.color, 4);
        ox += v.x * global.lerpv;
        oy += v.y * global.lerpv;
      }
      draw.ctx.restore();
    

  let vec = this.vecDataList.reduce((acc,v) => v.selected? {x:acc.x+v.x,y:acc.y+v.y}:acc,{x:0,y:0});
    global.results.vec.setPosv(vec)
    global.results.setText( 0, `Components: [${vec.x} , ${vec.y}]`)
    global.results.setText( 1, "Angle: " + Mathf.angle(vec.x, vec.y))
    global.results.setText( 2, "Length: " + Math.hypot(vec.x, vec.y))
        
        if(Math.abs(vec.x) > 1e-6 || Math.abs(vec.y)>1e-6){
          const end = Mathf.toCanvasCoord(vec.x, vec.y, global.zoomv);
          // thicker bright arrow
          if(!global.results.vec.selected) return
          draw.drawArrow(cx,cy,end.x,end.y,'#ffd166',6);
          draw.ctx.save(); 
          draw.ctx.font='13px system-ui'; 
          draw.ctx.fillStyle='#ffd166'; 
          draw.ctx.fillText(`Result (${vec.x.toFixed(2)}, ${vec.y.toFixed(2)})`, end.x+10, end.y-10); 
          draw.ctx.restore();
}
}
}