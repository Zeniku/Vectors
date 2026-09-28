class VectorList extends WindowPanel {
  constructor(config) {
    // Setup default config combined with passed config
    super(Object.assign({
      parent: document.body,
      title: "Vector List",
      x: 10,
      y: 280,
      width: 250, // Made slightly wider for text
      collapsible: true
    }, config));
    
    this.vecHandler = config.vecHandler;
    
    // Register this globally so VectorWindow can trigger updates
    global.vectorListWindow = this; 

    this.render();
  }

  render() {
    // Clear existing
    this.panel.content.innerHTML = "";

    this.vecHandler.vecDataList.forEach((vec, i) => {
  const container = new Box({ parent: this.panel.content }).el;
  Object.assign(container.style, {
    display: "flex", 
    justifyContent: "space-between", 
    alignItems: "center",
    marginBottom: "4px",
    gap: "8px" // cleaner than individual margins
  });

  // 1. Checkbox: Prevent it from squishing
  const cb = document.createElement("input");
  cb.type = "checkbox";
  cb.style.flexShrink = "0"; 
  cb.checked = vec.selected ?? true;
  cb.onchange = () => { vec.selected = cb.checked; };

  // 2. Label: Let it grow, but handle overflow
  const label = document.createElement("span");
  label.style.flex = "1"; // Shorthand for flex-grow: 1
  label.style.whiteSpace = "nowrap";
  label.style.overflow = "hidden";
  label.style.textOverflow = "ellipsis"; 
  label.textContent = `V${i + 1} [${vec.x.toFixed(1)}, ${vec.y.toFixed(1)}]`;

  // 3. Delete button: Prevent stretching and squishing
  const del = document.createElement("button");
  del.textContent = "✕";
  del.className = "button";
  del.style.flexShrink = "0"; // Stops it from getting squashed
  del.style.width = "24px";    // Give it a fixed footprint
  del.style.height = "24px";
  del.style.padding = "0";     // Center the X properly
  del.onclick = () => {
    this.vecHandler.vecDataList.splice(i, 1);
    this.render();
  };

  container.appendChild(cb);
  container.appendChild(label);
  container.appendChild(del);
});

  }
}
