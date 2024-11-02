export enum MeshDirection {
    RIGHT = "RIGHT",
    LEFT = "LEFT",
    RADIUS = "RADIUS"
  }


export type LatLng = {
    latitude: number;
    longitude: number;
};


export type Point = {
    x:number;
    y:number;
    zone:number;
    hemisphere:string;
}


export interface S2Point{
    x: number;
    y: number;
    z: number;
}