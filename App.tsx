import "./global.css"
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {Button, StyleSheet, Text, View} from "react-native";
// import { verifyInstallation } from 'nativewind';
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

import RTNMsitu from "rtn-msitu/spec/NativeRTNMsitu"
import { type LatLng } from "./RTNMsitu/spec/types/common/Coordinate";
import {useEffect, useState} from "react";
import { type PlantingLine } from "rtn-msitu/spec/types/backend/Backend";
import { Point } from "./RTNMsitu/spec/types/common/Coordinate";

const App = () => {
  // verifyInstallation();

  const [basePoints, setBasePoints] =  useState<Array<LatLng>>([]);
  const [tappedCoord, setTappedCoord] = useState<LatLng>();
  const [plantingLines, setPlantingLines] = useState<Array<PlantingLine>>([]);
  const [point, setPoint] = useState<Point>()

  useEffect(()=>{
    let pair = basePoints;
    if (tappedCoord){
      if(pair.length < 2){
        pair.push(tappedCoord)
      }else{
        pair[1] = tappedCoord;
      }
      setBasePoints(pair);
    }
    console.log(pair)
  }, [tappedCoord])
   

  const generateMesh = async()=>{
    if(basePoints.length < 2){
      return;
    }
    const first=basePoints[0];
    const second=basePoints[1];
    
    const p =  RTNMsitu.toPoint(first);
    setPoint(p as Point);
    const lines = await RTNMsitu.generateMesh(
     {latitude:first.latitude, longitude:first.longitude},
     {latitude:second.latitude, longitude:second.longitude},
      "LEFT",
      "TRIANGLE",
      5,
      100);
      setPlantingLines(lines);
  }

  const generateCoordinates = async()=>{
    if(plantingLines.length > 0){
      const lines = plantingLines.slice(0,5);
      const allLines = await RTNMsitu.linesToCoords(lines, point);
      console.log(allLines)
    }
  }
  return (
    <SafeAreaProvider>
      <View className="flex-1">
        <View className="flex-[8]">
          <MapView
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              onPress={(e)=>setTappedCoord(e.nativeEvent.coordinate)}
              region={{
                latitude: 0.347596,
                longitude: 32.582520,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              }}
          >
          </MapView>
        </View>

        <View className="flex-[1] m-5 items-start">
          <Text>{JSON.stringify(point)}</Text>
        </View>
        <View className="flex flex-row gap-2 justify-center">
          <Button
            title="Generate Mesh"
            onPress={()=>generateMesh()}
          />
          <Button
            title="Coords"
            onPress={()=>generateCoordinates()}
          />
        </View>
      </View>
      </SafeAreaProvider>
  )
}
export  default  App;
