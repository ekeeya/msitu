import "./global.css"
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
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
import {useEffect, useState} from "react";

const App = () => {
  // verifyInstallation();

  const [s2Point, setS2Point] = useState<S2Point | {}>({});
  const [elvis, setElvis] = useState<string | null>();

    useEffect(() => {

      setElvis(RTNMsitu?.getItem());
        RTNMsitu?.getS2Point().then(r=>{
          setS2Point(r);
        });
    }, []);

  return (
      <View className="flex-1">
        <View className="flex-[3]">
          <MapView
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              region={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              }}
          >
          </MapView>
        </View>

        <View className="flex-[1] m-5 items-start">
          <Text>{elvis}</Text>
          <Text>{JSON.stringify(s2Point)}</Text>
        </View>
      </View>
  )
}
export  default  App;
