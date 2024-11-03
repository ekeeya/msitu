import MapView, { PROVIDER_GOOGLE, Polyline, Circle, UrlTile, MAP_TYPES } from 'react-native-maps';
import { Text, View, StyleSheet, Touchable, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
// import Geolocation from '@react-native-community/geolocation';
import { useEffect, useState } from "react";

const Home = ({ navigation }) => {

  const handlePolylineClick = (line) => {
    console.log(line)
  };
  return (
    <View className="flex-1 relative">
      <MapView
        provider={PROVIDER_GOOGLE}
        onPress={(e) => setTappedCoord(e.nativeEvent.coordinate)}
        mapType={MAP_TYPES.TERRAIN}
        showsUserLocation={true}
        showsMyLocationButton={true}
        style={styles.map}
      /*region={{
          latitude: 0.347596,
          longitude: 32.582520,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
      }}*/
      >


        {/* {
              lines.map((line, idx) => (
                <>
                  <Polyline
                    key={idx}
                    coordinates={line}
                    tappable={true}
                    onPress={()=>handlePolylineClick(line)}
                    strokeColor="blue"
                    strokeWidth={1.0}
                  />
                  {
                    line.map((coord, index) => (
                      <Circle
                        key={index}
                        center={coord}
                        radius={0.2}
                        fillColor="red"
                        strokeColor="red"
                        zIndex={1}
                      />
                    ))
                  }

                </>
              ))
            }  */}

      </MapView>

      {/* Overlay View */}
      <View className="absolute flex flex-row justify-between top-10 left-2 right-2 bg-white/70 p-2 rounded-lg items-center z-10">
        <TouchableOpacity
          className='bg-white/90 p-2 border border-black rounded-lg'
          onPress={() => {
            navigation.openDrawer();
          }}
        >
          <Icon name="menu-outline" size={30} color="teal" />
        </TouchableOpacity>
        <Text className='font-avenirBold'>Project Digital Solutions</Text>
        <View className='flex flex-row'>
          <TouchableOpacity className='bg-white/100 border border-black p-2 rounded-lg'>
            <AntDesignIcon name="addfolder" size={30} color="teal" />
          </TouchableOpacity>
        </View>
      </View>

    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  text: {
    fontFamily: "Avenir, sans-serif"
  }
});
export default Home;
