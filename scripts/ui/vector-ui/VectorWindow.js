class VectorWindow {
  constructor({
    vecHandler,
    parent = document.body,
    x = 10,
    y = 10,
    width = 200
  } = {}) {

    this.vecHandler = vecHandler;

    this.window = new WindowPanel({
      parent,
      title: "Add Vector",
      x,
      y,
      width: width,
      closable: false,
      collapsible: true
    });

    // Internal state
    this.mode = "components"; // "components" | "polar"

    this.x = 0;
    this.y = 0;
    this.angle = 0;
    this.length = Math.hypot(this.x, this.y);

    // Mode toggle
    this.modeText = this.window.setText(0, "Mode: Components");

    new Button({
      parent: this.window.panel.content,
      text: "Switch Input Mode",
      onClick: () => this.toggleMode()
    });

    this.inputsContainer = document.createElement("div");
    this.window.add(this.inputsContainer);

    this.renderInputs();

    new Button({
      parent: this.window.panel.content,
      text: "Add Vector",
      onClick: () => this.addVector()
    });
  }

  toggleMode() {
    this.mode = this.mode === "components" ? "polar" : "components";
    this.window.setText(0, this.mode === "components" ? "Mode: Components" : "Mode: Angle & Length")
    this.renderInputs();
  }

  renderInputs() {
    this.inputsContainer.innerHTML = "";

    if (this.mode === "components") {
      new NumberInput({
        parent: this.inputsContainer,
        label: "X Component",
        value: this.x,
        step: 1,
        onChange: v => {
          this.x = v;
          this.syncPolar();
        }
      });

      new NumberInput({
        parent: this.inputsContainer,
        label: "Y Component",
        value: this.y,
        step: 1,
        onChange: v => {
          this.y = v;
          this.syncPolar();
        }
      });
      this.syncPolar();
    } else {
      new NumberInput({
        parent: this.inputsContainer,
        label: "Angle (deg)",
        value: this.angle,
        step: 1,
        onChange: v => {
          this.angle = v;
          this.syncComponents();
        }
      });

      new NumberInput({
        parent: this.inputsContainer,
        label: "Length",
        value: this.length,
        step: 1,
        min: 0,
        onChange: v => {
          this.length = v;
          this.syncComponents();
        }
      });
      this.syncComponents();
    }
  }

  syncPolar() {
    this.length = Math.hypot(this.x, this.y);
    this.angle = Math.atan2(this.y, this.x) * 180 / Math.PI;
  }

  syncComponents() {
    const rad = this.angle * Math.PI / 180;
    this.x = Math.cos(rad) * this.length;
    this.y = Math.sin(rad) * this.length;
  }
  
  addVector() {
    const hue = Math.floor(Math.random() * 360);
    const color = `hsl(${hue}, 80%, 60%)`;
    let v = new Vec(this.x, this.y)
    v.color = color
    this.vecHandler.add(v);
  }
}
