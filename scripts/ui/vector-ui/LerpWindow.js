class LerpWindow {
  constructor({
    onChange,
    parent = document.body,
    x = 10,
    y = 220,
    title = "Vector Addition"
  } = {}) {

    this.panel = new Panel({
      parent,
      title: title
    });

    this.panel.root.el.style.left = x + "px";
    this.panel.root.el.style.top = y + "px";

    new Slider({
      parent: this.panel.content,
      min: 0,
      max: 1,
      step: 0.01,
      value: 1,
      onInput: v => onChange(v)
    });
  }
}
