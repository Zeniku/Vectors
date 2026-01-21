class Resultant extends WindowPanel{
  constructor(object){
    super(object)
      this.container = new Box({
        parent: this.panel.content,
        className: "vectorItem"
      }).el;
      
      this.container.style.display = "flex";
      this.container.style.justifyContent = "space-between";
      this.container.style.alignItems = "center";
      this.container.style.marginBottom = "4px";
      
      this.vec = new Vec(0, 0)
      // Checkbox
      const cb = document.createElement("input");
      cb.type = "checkbox";
      cb.checked = this.vec.selected ?? true;
      cb.onchange = () => {
        this.vec.selected = cb.checked;
      };
      this.panel.header.appendChild(cb);

  }
}
