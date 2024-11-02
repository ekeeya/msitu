import { Point } from "../common/Coordinate"

export type PlantingLine = {
        points:Array<Point>
}


export type LongLat = {
    latitude:number;
    longitude:number;
    fixType:string;
    timeStamp?:string;
    numSatellites:number;
    hdop:number;
    aboveSeaLevel:number;
    speed:number;
    accuracy:number;
}