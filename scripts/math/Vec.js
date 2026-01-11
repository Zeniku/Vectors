class Vec {
  constructor(x, y){
    this.x = x || 0;
    this.y = y || 0;
    this.selected = true
    this.color = 'cyan'
  }
  nearZero(){
    return this.getLength() <= 0.009
  }
  setPosv(v){
    return this.setPos(v.x, v.y)
  }
  setPos(x, y){
    this.x = x;
    this.y = y;
    return this;
  }
  clone(){
    return new Vec(this.x, this.y)
  }
  clamp(min, max){
    let len2 = this.x * this.x + this.y * this.y;
    if (len2 == 0) return this;
    
    let max2 = max * max;
    if (len2 > max2) return this.mult(Math.sqrt(max2 / len2));
    
    let min2 = min * min;
    if (len2 < min2) return this.mult(Math.sqrt(min2 / len2));
    
    return this;
  }
  add(x, y){
    this.x += x;
    this.y += y;
    return this;
  }
  sub(x, y){
    this.x -= x;
    this.y -= y;
    return this;
  }
  scl(x, y){
    this.x *= x;
    this.y *= y;
    return this;
  }
  mult(mult){
    return this.scl(mult, mult)
  }
  div(divisor){
    this.x /= divisor;
    this.y /= divisor;
    return this;
  }
  addv(v){
    return this.add(v.x, v.y)
  }
  subv(v){
    return this.sub(v.x, v.y)
  }
  sclv(v){
    return this.scl(v.x, v.y)
  }
  divv(v){
    return this.div(v.x, v.y)
  }
  setAngle(angle) {
		var length = this.getLength();
		this.x = Mathf.cosDeg(angle) * length;
		this.y = Mathf.sinDeg(angle) * length;
		return this;
	}
	getAngle() {
		return Math.atan2(this.y, this.x);
	}
	setLength(length) {
		var angle = this.degAngle();
		console.log(angle)
		this.x = Mathf.cosDeg(angle) * length;
		this.y = Mathf.sinDeg(angle) * length;
		return this;
	}
	degAngle(){
	  let ang = this.getAngle() * Mathf.radDeg
	  if(ang < 0) ang += 360
	  return ang
	}
	getLength() {
		return Math.sqrt((this.x * this.x) + (this.y * this.y));
	}
	rotateRadExact(radians){
	  let cos = Math.cos(radians);
    let sin = Math.sin(radians);

    let newX = this.x * cos - this.y * sin;
    let newY = this.x * sin + this.y * cos;
    
    this.x = newX
    this.y = newY
    return this
	}
	rotate(degree){
	  return this.rotateRadExact(degree * Mathf.degToRad)
	}
	trns(amount, degree){
	  this.setPos(amount, 0).setAngle(degree * Mathf.degToRad)
	  return this
	}
	draw(draw, col = "cyan", scale = 1){
    draw.drawArrow(0, 0, this.x * scale, this.y * scale, col);
  }
}