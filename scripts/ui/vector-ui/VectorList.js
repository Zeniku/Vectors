class VectorList {
  constructor({
    vecHandler,
    parent = document.body,
    title = "Vector List",
    x = 100,
    y = 100,
    width = 260
  } = {}) {

    this.vecHandler = vecHandler;

    this.window = new WindowPanel({
      parent,
      title,
      x,
      y,
      width,
      closable: false,
      collapsible: true
    });

    this.render();
  }

  render() {
    // Clear existing
    this.window.panel.content.innerHTML = "";

    this.vecHandler.vecDataList.forEach((vec, i) => {

      const container = new Box({
        parent: this.window.panel.content,
        className: "vectorItem"
      }).el;

      container.style.display = "flex";
      container.style.justifyContent = "space-between";
      container.style.alignItems = "center";
      container.style.marginBottom = "4px";

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
