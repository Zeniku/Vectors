class Window {
  constructor({
    parent = document.body,
    title = "Window",
    x = 100,
    y = 100,
    width = 260,
    closable = true,
    collapsible = true
  } = {}) {
    this.root = new Box({
      parent,
      className: "window",
      style: {
        left: x + "px",
        top: y + "px",
        width: width + "px",
        position: "fixed",
        zIndex: 1000
      }
    });

    // Header
    this.header = document.createElement("div");
    this.header.className = "windowHeader";
    this.header.textContent = title;
    this.root.el.appendChild(this.header);


// Collapse button
this.collapsed = false;

if (collapsible) {
  this.collapseBtn = document.createElement("span");
  this.collapseBtn.className = "windowCollapse";
  this.collapseBtn.textContent = "▾"; // expanded
  this.header.appendChild(this.collapseBtn);

  this.collapseBtn.onclick = e => {
    e.stopPropagation(); // don't interfere with dragging
    this.toggleCollapse();
  };
}

    // Close button
    if(closable){
      this.closeBtn = document.createElement("span");
      this.closeBtn.className = "windowClose";
      this.closeBtn.textContent = "✕";
      this.header.appendChild(this.closeBtn);
      this.closeBtn.onclick = () => this.root.el.remove();
    }

    // Content
    this.content = document.createElement("div");
    this.content.className = "windowContent";
    this.root.el.appendChild(this.content);

    this.#enableDrag(false);
  }
  
  toggleCollapse() {
  this.collapsed = !this.collapsed;

  if (this.collapsed) {
    this.content.style.display = "none";
    this.collapseBtn.textContent = "▸";
  } else {
    this.content.style.display = "";
    this.collapseBtn.textContent = "▾";
  }
}

  add(child){
    this.content.appendChild(child.el ?? child);
  }
  
#enableDrag(draggingh){
let dragging = false;
let ox = 0;
let oy = 0;
let activePointerId = null;

// IMPORTANT: prevent browser gestures (scroll/zoom)
this.header.style.touchAction = "none";

this.header.onpointerdown = e => {
  e.preventDefault();

  dragging = true;
  activePointerId = e.pointerId;

  const rect = this.root.el.getBoundingClientRect();
  ox = e.clientX - rect.left;
  oy = e.clientY - rect.top;

  this.header.setPointerCapture(activePointerId);
};

this.header.onpointermove = e => {
  if (!dragging || e.pointerId !== activePointerId) return;

  e.preventDefault();

  this.root.el.style.left = `${e.clientX - ox}px`;
  this.root.el.style.top = `${e.clientY - oy}px`;
};

this.header.onpointerup = this.header.onpointercancel = e => {
  if (e.pointerId !== activePointerId) return;

  dragging = false;
  this.header.releasePointerCapture(activePointerId);
  activePointerId = null;
};


}
  
}
