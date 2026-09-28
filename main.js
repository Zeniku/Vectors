window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  // Note: Resizing the canvas clears it, 
  // so you may need to call your draw loop immediately
  if (typeof loop === 'function') loop(); 
});

window.onload = () => {
  const canvas = document.getElementById("canvas");
  
  const dpr = window.devicePixelRatio || 1;
canvas.width = window.innerWidth * dpr;
canvas.height = window.innerHeight * dpr;

// Scale the context so your drawing coordinates still work normally



  const draw = new Draw(canvas);
  let ctx = draw.ctx;
  const vecHandler = new VecHandler();

  // Vector Add Window
  new VectorWindow({ vecHandler });

  // Lerp Slider Window
  let windowPanel = new WindowPanel({
    title: "Vector sliders",
    x: 10, y: 350,
    width: 200 // Slightly widened to accommodate the side labels better
  });
  
  // Refactored using IDs, separated labels, and method chaining
  windowPanel
    .addSlider("lerp", "Lerp Value", 0, 1, 1, (v) => { global.lerpv = v; })
    .addSlider("zoom", "Camera Zoom", 1, 100, 1, (v) => { global.zoomv = v; })
    .addButton("btnScale", "Auto Scale", () => {
      // Get the target value
      const targetZoom = Mathf.getZoomV();
      
      // Update the UI via ID. 
      // Passing `false` for silent ensures it visually updates the slider
      // AND fires the onChange callback above to update `global.zoomv`.
      windowPanel.setValue("zoom", targetZoom, false);
    });
  
  global.results = new Resultant({
    title: "Resultant",
    x: 10, y: 500,
    width: 250,
    collapsible: true
  });

  // Vector List Window
  const vectorListWindow = new VectorList({ vecHandler, width: 300 });
  let v = vecHandler.add(new Vec(0, 10));
  ctx.scale(dpr, dpr);

  function loop(){
    draw.clear();
    
    // draw.ctx.translate(canvas.width/2, canvas.height/2);
    draw.drawGrid(canvas.width, canvas.height);
    
    // global.lerpv is now safely synced with the "lerp" slider
    vecHandler.drawPolyVecs(draw, "#60a5fa", 1, global.lerpv);
    
    draw.ctx.setTransform(1, 0, 0, 1, 0, 0);
    
    // Re-render list each frame for real-time updates
    vectorListWindow.render();
    requestAnimationFrame(loop);
  }

  loop();
};
