class VectorWindow {
  constructor({
    vecHandler,
    parent = document.body,
    x = 10,
    y = 10,
    width = 200
  } = {}) {

    this.vecHandler = vecHandler;
    this.window = new WindowPanel({ parent, title: "Add Vector", x, y, width, closable: false, collapsible: true });

    // Internal state
    this.mode = "components"; // "components" | "polar"
    this.x = 0;
    this.y = 0;
    this.angle = 0;
    this.length = 0;

    // Build the UI using the new API chaining
    this.window
      .addButton("btnMode", "Mode: Components", () => this.toggleMode())
      
      // Components Inputs
      .addNumberInput("inpX", "X Component", -Infinity, Infinity, this.x, v => { this.x = v; this.syncPolar(); })
      .addNumberInput("inpY", "Y Component", -Infinity, Infinity, this.y, v => { this.y = v; this.syncPolar(); })
      
      // Polar Inputs
      .addNumberInput("inpAngle", "Angle (deg)", -Infinity, Infinity, this.angle, v => { this.angle = v; this.syncComponents(); })
      .addNumberInput("inpLength", "Length", 0, Infinity, this.length, v => { this.length = v; this.syncComponents(); })
      
      .addButton("btnAdd", "Add Vector", () => this.addVector());

    // Hide polar inputs by default
    this.window.components["inpAngle"].box.style.display = "none";
    this.window.components["inpLength"].box.style.display = "none";
  }

  toggleMode() {
    this.mode = this.mode === "components" ? "polar" : "components";
    const isComp = this.mode === "components";

    // Update button text
    this.window.components["btnMode"].button.textContent = isComp ? "Mode: Components" : "Mode: Angle & Length";

    // Toggle visibility using the components dictionary
    this.window.components["inpX"].box.style.display = isComp ? "" : "none";
    this.window.components["inpY"].box.style.display = isComp ? "" : "none";
    this.window.components["inpAngle"].box.style.display = isComp ? "none" : "";
    this.window.components["inpLength"].box.style.display = isComp ? "none" : "";
  }

  syncPolar() {
    this.length = Math.hypot(this.x, this.y);
    this.angle = Math.atan2(this.y, this.x) * (180 / Math.PI);
    
    // Silently sync the hidden UI sliders
    this.window.setValue("inpAngle", this.angle, true);
    this.window.setValue("inpLength", this.length, true);
  }

  syncComponents() {
    const rad = this.angle * (Math.PI / 180);
    this.x = Math.cos(rad) * this.length;
    this.y = Math.sin(rad) * this.length;

    // Silently sync the hidden UI sliders
    this.window.setValue("inpX", this.x, true);
    this.window.setValue("inpY", this.y, true);
  }
  
  addVector() {
    const hue = Math.floor(Math.random() * 360);
    const color = `hsl(${hue}, 80%, 60%)`;
    let v = new Vec(this.x, this.y);
    v.color = color;
    this.vecHandler.add(v);
    
    // IMPORTANT: Trigger the list re-render here, NOT in the game loop
    if (global.vectorListWindow) global.vectorListWindow.render(); 
  }
}
