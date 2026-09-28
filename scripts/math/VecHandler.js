class VecHandler {
  constructor() {
    this.vecDataList = [];
  }

  add(v) {
    this.vecDataList.push(v);
    return v;
  }

  drawPolyVecs(draw, scale, lerpv) {
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    draw.save();

    // --- STEP 1: Calculate Resultant (The total sum of selected vectors) ---
    // We do this first so we can use the data for the UI and the final arrow
    let resultant = this.vecDataList.reduce((acc, v) => {
      return v.selected ? { x: acc.x + v.x, y: acc.y + v.y } : acc;
    }, { x: 0, y: 0 });

    // Update Resultant UI (Only if the global object exists)
    if (global.results) {
      global.results.vec.setPosv(resultant);
      global.results.setText(0, `Components: [${resultant.x.toFixed(2)}, ${resultant.y.toFixed(2)}]`);
      global.results.setText(1, `Angle: ${Mathf.angle(resultant.x, resultant.y).toFixed(2)}°`);
      global.results.setText(2, `Length: ${Math.hypot(resultant.x, resultant.y).toFixed(2)}`);
    }

    // --- STEP 2: Draw Individual Vectors (From Origin) ---
    for (const v of this.vecDataList) {
      const end = Mathf.toCanvasCoord(v.x, v.y, global.zoomv);
      // Faded if not selected, full color if selected
      const alpha = v.selected ? 1.0 : 0.3;
      draw.ctx.globalAlpha = alpha;
      
      draw.drawArrow(cx, cy, end.x, end.y, v.color, v.selected ? 4 : 2);
      
      draw.ctx.font = '12px system-ui';
      draw.ctx.fillStyle = v.color;
      draw.ctx.fillText(`(${v.x.toFixed(1)}, ${v.y.toFixed(1)})`, end.x + 8, end.y - 8);
    }
    draw.ctx.globalAlpha = 1.0; // Reset alpha

    // --- STEP 3: Draw Tip-to-Tail Chain (The "Poly" view) ---
    let ox = 0, oy = 0;
    for (const v of this.vecDataList) {
      if (!v.selected) continue; // Only chain active vectors

      const start = Mathf.toCanvasCoord(ox, oy, global.zoomv);
      const end = Mathf.toCanvasCoord(ox + v.x, oy + v.y, global.zoomv);

      draw.drawArrow(start.x, start.y, end.x, end.y, v.color, 3);

      // Accumulate the position for the next vector in the chain
      // Applying lerpv here creates the animation effect
      ox += v.x * global.lerpv;
      oy += v.y * global.lerpv;
    }

    // --- STEP 4: Draw the Final Resultant Arrow ---
    const isVisible = Math.abs(resultant.x) > 1e-6 || Math.abs(resultant.y) > 1e-6;
    const isEnabled = global.results && global.results.vec.selected;

    if (isVisible && isEnabled) {
      const resEnd = Mathf.toCanvasCoord(resultant.x, resultant.y, global.zoomv);
      
      // Draw thicker, distinct resultant arrow
      draw.drawArrow(cx, cy, resEnd.x, resEnd.y, '#ffd166', 6);
      
      draw.ctx.fillStyle = '#ffd166';
      draw.ctx.font = 'bold 13px system-ui';
      draw.ctx.fillText(`Resultant`, resEnd.x + 10, resEnd.y - 10);
    }

    draw.restore();
  }
}
