class VecHandler {
  constructor(){
    this.vecDataList = [];
  }

  add(v){
    this.vecDataList.push(v);
  }

  drawPolyVecs(draw, scale, lerpv){
    draw.save();
    const cx = canvas.clientWidth/2, cy = canvas.clientHeight/2;
      // draw each vector from origin

for(const v of this.vecDataList){
    //if(!v.selected) continue;

    const endX = cx + v.x;
    const endY = cy - v.y;
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
    

  // resultant
  const sum = this.vecDataList.reduce((acc,v)=> v.selected?{x:acc.x+v.x,y:acc.y+v.y}:acc,{x:0,y:0});
  global.results.setText( 0, "Components: [" + sum.x + ", " + sum.y + "]")
  global.results.setText( 1, "Angle :" + Mathf.angle(sum.x, sum.y))
        if(Math.abs(sum.x) > 1e-6 || Math.abs(sum.y)>1e-6){
          const end = Mathf.toCanvasCoord(sum.x,sum.y, global.zoomv);
          // thicker bright arrow
          draw.drawArrow(cx,cy,end.x,end.y,'#ffd166',6);
          draw.ctx.save(); 
          draw.ctx.font='13px system-ui'; 
          draw.ctx.fillStyle='#ffd166'; 
          draw.ctx.fillText(`Result (${sum.x.toFixed(2)}, ${sum.y.toFixed(2)})`, end.x+10, end.y-10); 
          draw.ctx.restore();
}
}
}
}