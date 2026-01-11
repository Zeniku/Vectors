
class Segment {
  constructor(p1, p2){
    this.p1 = p1
    this.p2 = p2
  }
  setSeg(x1, y1, x2, y2){
    this.p1.x = x1
    this.p1.y = y1
    this.p2.x = x2
    this.p2.y = y2
  }
  intersectsLineA(ox1, oy1, ox2, oy2){
    let tx1 = this.p1.x
    let ty1 = this.p1.y
    let tx2 = this.p2.x
    let ty2 = this.p2.y
    return (
      Mathf.ccw(tx1, ty1, ox1, oy1, ox2, oy2) != Mathf.ccw(tx2, ty2, ox1, oy1, ox2, oy2) && 
      Mathf.ccw(tx1, ty1, tx2, ty2, ox1, oy1) != Mathf.ccw(tx1, ty1, tx2, ty2, ox2, oy2)
    )
  }
  intersectsLine(other){
    return (
      Mathf.vccw(this.p1, other.p1, other.p2) != Mathf.vccw(this.p2, other.p1, other.p2) && 
      Mathf.vccw(this.p1, this.p2, other.p1) != Mathf.vccw(this.p1, this.p2, other.p2)
    )
  }
  getIntersectionPointB(other){
    return getIntersectionPointA(
      this.p1.x, this.p1.y,
      this.p2.x, this.p2.y,
      other.p1.x, other.p1.y,
      other.p2.x, other.p2.y
    )
  }
  getIntersectionPointA(x1, y1, x2, y2, x3, y3, x4, y4){
    let ua, ub, denom = (y4 - y3)*(x2 - x1) - (x4 - x3)*(y2 - y1);
    if (denom == 0) return null;
    
    ua = ((x4 - x3)*(y1 - y3) - (y4 - y3)*(x1 - x3)) / denom;
    ub = ((x2 - x1)*(y1 - y3) - (y2 - y1)*(x1 - x3)) / denom;
    
    return {
        x: x1 + ua * (x2 - x1),
        y: y1 + ua * (y2 - y1),
    }
  }
  intersect(rect){
    if(rect instanceof Rect){
    if(rect.contains(this.p1) || rect.contains(this.p2)) return true
    return (
      this.intersectsLineA(rect.right, rect.top, rect.left, rect.top) ||
      this.intersectsLineA(rect.right, rect.bottom, rect.right, rect.top) ||
      this.intersectsLineA(rect.right, rect.bottom, rect.left, rect.bottom) ||
      this.intersectsLineA(rect.left, rect.bottom, rect.left, rect.top)
    )
    }
  }
  show(){
    Draw.line(this.p1.x, this.p1.y, this.p2.x, this.p2.y)
  }
  contains(p){
    return true
  }
}
class Point {
  constructor(x, y){
    this.x = x
    this.y = y
  }
}

class MultiRange {
  constructor(mult){
    this.mult = mult
  }
  intersect(range){
    let tmp = []
    this.mult.forEach(p => {
      tmp.push(p.intersect(range))
    })
    return tmp.some(Boolean)
  }
  show(){
    this.mult.forEach(p => p.show())
  }
}