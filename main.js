window.onload = () => {
  const canvas = document.getElementById("canvas");
  canvas.width = 500;
  canvas.height = 500;
  

  const draw = new Draw(canvas);
  let ctx = draw.ctx
  const vecHandler = new VecHandler();

  // Vector Add Window
  new VectorWindow({ vecHandler });

  // Lerp Slider Window
  let windowPanel = new WindowPanel({
    title: "Vector sliders",
    x: 10, y: 350,
    width: 100
  })
  
  windowPanel.addSliderInput("lerp", 0, 1, 1, (v) => global.lerpv = v);
  windowPanel.addSliderInput("zoom", 1, 100, 1, (v) => global.zoomv = v);
  windowPanel.addButton("Auto Scale", () => {
    windowPanel.sliders[1].input.value = Mathf.getZoomV()
  })
  
  global.results = new Resultant({
    title: "Resultant",
    x: 10, y: 500,
    width: 250,
    collapsible: true
  })

  // Vector List Window
  const vectorListWindow = new VectorList({ vecHandler , width : 300});
let v = vecHandler.add(new Vec(0, 10))
  function loop(){
    draw.clear();
    
    //draw.ctx.translate(canvas.width/2, canvas.height/2);
    draw.drawGrid(canvas.width, canvas.height)
    vecHandler.drawPolyVecs(draw, "#60a5fa", 1, global.lerpv);
    
    draw.ctx.setTransform(1,0,0,1,0,0);
    

    // Re-render list each frame for real-time updates
    vectorListWindow.render();
    requestAnimationFrame(loop);
  }

  loop();
};
