
class QPoint extends Point{
  constructor(x, y, index){
    super(x, y)
    this.index = index
  }
}
class Rect {
  constructor(x, y, width, height){
    this.x = x
    this.y = y 
    this.width = width
    this.height = height
    this.color = "#FFFFFF"
    this.setDirections()
  }
  setRect(x, y, width, height){
    return this.setPos(x,y).setSize(width, height)
  }
  setPos(x, y){
    this.x = x
    this.y = y
    this.setDirections()
    return this
  }
  setSize(width, height){
    this.width = width
    this.height = height 
    this.setDirections()
    return this
  }
  setDirections(){
    this.left = this.x - (this.width/2)
    this.right = this.x + (this.width/2)
    this.top = this.y - (this.height/2)
    this.bottom = this.y + (this.height/2)
  }
  subdivide(quadrant){
    let halfWidth = this.width/2
    let halfHeight = this.height/2
    if(quadrant == "ne") return new Rect(this.x + (halfWidth/2), this.y - (halfHeight/2), halfWidth, halfHeight)
    if(quadrant == "nw") return new Rect(this.x - (halfWidth/2), this.y - (halfHeight/2),halfWidth, halfHeight)
    if(quadrant == "se") return new Rect(this.x + (halfWidth/2), this.y + (halfHeight/2),halfWidth, halfHeight)
    if(quadrant == "sw") return new Rect(this.x - (halfWidth/2), this.y + (halfHeight/2),halfWidth, halfHeight)
  }
  containsXY(x, y){
    return (
      x > this.left && x < this.right &&
      y > this.top && y < this.bottom
    )
  }
  contains(point){
    if(point instanceof Point){
      return this.containsXY(point.x, point.y)
    }
  }
  intersect(range){
    if(range instanceof Rect){
      let {left, right, top, bottom} = range
      return !(
        left > this.right || right < this.left ||
        top > this.bottom || bottom < this.top
      )
    }
    if(range instanceof Segment){
    //this should be overlapped not intersect
    if(this.contains(range.p1) || this.contains(range.p2)) return true
    return (
      range.intersectsLineA(this.right, this.top, this.left, this.top) ||
      range.intersectsLineA(this.right, this.bottom, this.right, this.top) ||
      range.intersectsLineA(this.right, this.bottom, this.left, this.bottom) ||
      range.intersectsLineA(this.left, this.bottom, this.left, this.top)
    )
    }
  }
  show(con = Global.ctx){
    con.strokeStyle = "#FFFFFF"
    Draw.lineRect(this.x, this.y, this.width, this.height, true)
  }
}

class QuadTree {
  MAX_DEPTH = 6
  constructor(boundary, capacity, depth = 0){
    this.boundary = boundary
    this.capacity = capacity || 4
    this.points = []
    this.quadrants = []
    this.depth = depth
    this.divided = false
  }
  insert(point){
    if(!this.boundary.contains(point)) return false

    if (!this.divided) {
      if (
        this.points.length < this.capacity ||
        this.depth === this.MAX_DEPTH
      ) {
        this.points.push(point);
        return true;
      }
      
      this.subdivide();
      
    }
    return (
      this.quadrants[0].insert(point) ||
      this.quadrants[1].insert(point) ||
      this.quadrants[2].insert(point) ||
      this.quadrants[3].insert(point)
    );
  }
  subdivide(){
    this.quadrants[0] = new QuadTree(this.boundary.subdivide("ne"), this.capacity, this.depth + 1)
    this.quadrants[1] = new QuadTree(this.boundary.subdivide("nw"), this.capacity, this.depth + 1)
    this.quadrants[2] = new QuadTree(this.boundary.subdivide("se"), this.capacity, this.depth + 1)
    this.quadrants[3] = new QuadTree(this.boundary.subdivide("sw"), this.capacity, this.depth + 1)
    
  this.divided = true
   for(let i of this.points){
      this.quadrants[0].insert(i)
      this.quadrants[1].insert(i)
      this.quadrants[2].insert(i)
      this.quadrants[3].insert(i)
    }
    
    this.points = null
  }
  multiRet(ranges, found = [],){
    if(!found) found = []
    for(let i in ranges){
      if(this.boundary.intersect(i)){
        if(this.divided){
          for(let i of this.quadrants){
            i.retrieve(range, found, inside)
          }
        }
      }
    }
  }
  retrieve(range, found, inside = false){
    if(!found) found = []
    //if(range instanceof Segment) logOnce(range.intersect(this.boundary), 2, 1)
    if(!this.boundary.intersect(range)) return found
    if(this.divided){
      for(let i of this.quadrants){
        i.retrieve(range, found, inside)
      }
    }
    
    if(this.points == undefined) return found
    for(let p of this.points){
      if(inside){
        if(range.contains(p)) found.push(p)
      } else found.push(p)
    }
    return found
  }
  query(range, found = []){
    return this.retrieve(range, found, true)
  }
  draw(con){
    this.boundary.show(con)
    
    if(this.divided){
      this.quadrants[0].draw(con)
      this.quadrants[1].draw(con)
      this.quadrants[2].draw(con)
      this.quadrants[3].draw(con)
    }
  }
  clear(){
    this.points = []
    if(this.divided){
      for(let i of this.quadrants){
        i.clear()
      }
    }
    this.divided = false
    this.quadrants = []
  }
  update(entities){
    this.clear()
    
    for(let e of entities){
      let p = new QPoint(e.position.x, e.position.y, e.index)
      this.insert(p)
    }
  }
}