import "./global.css"
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {StyleSheet, Text, View} from "react-native";
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

import RTNMsitu, { type S2Point } from "rtn-msitu/spec/NativeRTNMsitu"
import { type LatLng } from "rtn-msitu/spec";
import {useEffect, useMemo, useState} from "react";

const App = () => {
  // verifyInstallation();

  const [basePoints, setBasePoints] =  useState<Array<LatLng>>([]);
  const [tappedCoord, setTappedCoord] = useState<LatLng>();


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
   

  return (
    <SafeAreaProvider>
      <View className="flex-1">
        <View className="flex-[6]">
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
          <Text>{JSON.stringify(basePoints)}</Text>
        </View>
      </View>
      </SafeAreaProvider>
  )
}
export  default  App;
