class VectorWindow {
  constructor({
    vecHandler,
    parent = document.body,
    x = 10,
    y = 10
  } = {}) {

    this.vecHandler = vecHandler;

    this.window = new WindowPanel({
      parent,
      title: "Add Vector",
      x,
      y,
      width: 260,
      closable: false
    });

    // Internal state
    this.mode = "components"; // "components" | "polar"

    this.x = 50;
    this.y = 50;
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
    this.window.panel.content.appendChild(this.inputsContainer);

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
    this.vecHandler.add(new Vec(this.x, this.y));
  }
}
