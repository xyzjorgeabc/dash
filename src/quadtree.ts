import { Generic_Entity } from "./entities";
import { Vector, overlap } from "./utils";

export class QuadTree {

  public nodes: QuadNode;
  private size: Vector;
  constructor (size: Vector) {
    this.size = size.clone();
    this.nodes = new QuadNode(
      this.size.clone().mult(.5, .5),
      this.size.clone());
  }
  public insert (ent: Generic_Entity): void {
    this.nodes.try_insert(ent);
  }
  public flush (): void {
    this.nodes = new QuadNode(
      this.size.clone().mult(.5, .5),
      this.size.clone());
  }
  public get_nearby_entities (ent: Generic_Entity): Set<Generic_Entity> {
    const entities_set: Set<Generic_Entity> = new Set();
    this.nodes.get_nearby_entities(ent, entities_set);
    return entities_set;
  }
}

export class QuadNode {

  public node_top_left: QuadNode;
  public node_top_right: QuadNode;
  public node_bottom_left: QuadNode;
  public node_bottom_right: QuadNode;
  public limit_top_left: Vector;
  public limit_top_right: Vector;
  public limit_bottom_left: Vector;
  public limit_bottom_right: Vector;
  public entities: Generic_Entity[];
  private static max_entities = 5;
  constructor(center: Vector, size: Vector) {
    this.limit_bottom_left = new Vector(center.x - size.x / 2, center.y + size.y / 2);
    this.limit_bottom_right = new Vector(center.x + size.x / 2, center.y + size.y / 2);
    this.limit_top_left = new Vector(center.x - size.x / 2, center.y - size.y / 2);
    this.limit_top_right = new Vector(center.x + size.x / 2, center.y - size.y / 2);
    this.entities = [];
  }
  public subdivide (): void {

    const subs_size = new Vector(
      (this.limit_top_right.x - this.limit_top_left.x) / 2,
      (this.limit_bottom_left.y - this.limit_top_left.y) / 2
    );

    this.node_top_left = new QuadNode (
      new Vector(this.limit_top_left.x + subs_size.x / 2, this.limit_top_left.y + subs_size.y / 2 ),
      subs_size);

    this.node_top_right = new QuadNode (
      new Vector(this.limit_top_right.x - subs_size.x / 2, this.limit_top_right.y + subs_size.y / 2 ),
      subs_size
    );

    this.node_bottom_left = new QuadNode (
      new Vector(this.limit_bottom_left.x + subs_size.x / 2 , this.limit_bottom_left.y - subs_size.y / 2 ),
      subs_size
    );

    this.node_bottom_right = new QuadNode (
      new Vector(this.limit_bottom_right.x - subs_size.x / 2, this.limit_bottom_right.y - subs_size.y / 2),
      subs_size
    );

    for (let i = 0; i < QuadNode.max_entities; i++) {
      this.node_bottom_left.try_insert(this.entities[i])
      this.node_bottom_right.try_insert(this.entities[i])
      this.node_top_left.try_insert(this.entities[i])
      this.node_top_right.try_insert(this.entities[i])
    }

  }
  public try_insert(ent: Generic_Entity): boolean {
    const node_size = new Vector(
      this.limit_top_right.x - this.limit_top_left.x,
      this.limit_bottom_left.y - this.limit_top_left.y
    );
    const node_pos = new Vector(
      this.limit_bottom_left.x + node_size.x / 2,
      this.limit_top_left.y + node_size.y / 2,
    );

    if (!overlap(ent.pos, ent.size, node_pos, node_size)) return false;
    
    if (this.entities.length >= QuadNode.max_entities && node_size.x > 50) {

      if (this.node_bottom_left === undefined) this.subdivide();
      this.node_bottom_left.try_insert(ent);
      this.node_bottom_right.try_insert(ent);
      this.node_top_left.try_insert(ent);
      this.node_top_right.try_insert(ent);;
    }
    else {
      this.entities.push(ent);
      return true;
    }
  }
  public get_nearby_entities(ent: Generic_Entity, entities_set: Set<Generic_Entity>): void {
    const node_size = new Vector(
      this.limit_top_right.x - this.limit_top_left.x,
      this.limit_bottom_left.y - this.limit_top_left.y
    );
    const node_pos = new Vector(
      this.limit_bottom_left.x + node_size.x / 2,
      this.limit_top_left.y + node_size.y / 2,
    );
    if (!overlap(ent.pos, ent.size, node_pos, node_size)) return void 0;
    if (this.node_bottom_left){
      this.node_top_right.get_nearby_entities(ent, entities_set);
      this.node_top_left.get_nearby_entities(ent, entities_set);
      this.node_bottom_right.get_nearby_entities(ent, entities_set);
      this.node_bottom_left.get_nearby_entities(ent, entities_set);
    }
    else {
      for (let i = 0; i < this.entities.length; i++)entities_set.add(this.entities[i]);
    }
  }
}