class Resultant extends WindowPanel {
  constructor(config) {
    super(config);
    
    this.container = new Box({ parent: this.panel.content }).el;
    Object.assign(this.container.style, {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "4px"
    });
    
    this.vec = new Vec(0, 0);

    // Add checkbox securely into the header if it exists
    if (this.header) {
      const cb = document.createElement("input");
      cb.type = "checkbox";
      cb.checked = this.vec.selected ?? true;
      cb.style.marginRight = "8px"; // Spacing before the title text
      
      cb.onchange = () => {
        this.vec.selected = cb.checked;
      };
      
      // Insert at the start of the header
      this.header.insertBefore(cb, this.header.firstChild);
    }
  }
}
