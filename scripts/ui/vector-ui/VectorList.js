class VectorList extends WindowPanel{
  constructor(config) {
    super(Object.assign({
    parent: document.body,
    title: "Vector List",
    x: 10,
    y: 280,
    width: 200,
    collapsible: true
    }, config))
    
    this.vecHandler = config.vecHandler;
    


    this.render();
  }

  render() {
    // Clear existing
    this.panel.content.innerHTML = "";

    this.vecHandler.vecDataList.forEach((vec, i) => {

      const container = new Box({
        parent: this.panel.content,
        className: "vectorItem"
      }).el;

      container.style.justifyContent = "space-between";
      
      // Checkbox
      const cb = document.createElement("input");
      cb.type = "checkbox";
      cb.checked = vec.selected ?? true;
      cb.onchange = () => {
        vec.selected = cb.checked;
      };

      // Label
      const label = document.createElement("span");
      label.textContent = `Vector ${i + 1} [${vec.x}, ${vec.y}]`;

      // Delete button
      const del = document.createElement("button");
      del.textContent = "✕";
      del.style.marginLeft = "4px";
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
