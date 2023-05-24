import { View, Text, TouchableOpacity, ScrollView, Alert, StyleSheet } from 'react-native'
import React, {useState, useEffect} from 'react'
import MapView, { Marker } from 'react-native-maps';

import { SafeAreaView } from 'react-native-safe-area-context'

import { COLORS, FONTS } from '../constants'

import { MaterialIcons } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons';





const NearbyPlaces = ({ navigation }) => {

    const [selectedFilter, setSelectedFilter] = useState(null);
    const [dataArray, setDataArray] = useState([
      { type: 'restaurant', latitude: 37.78825, longitude: -122.4324, name: 'Restaurant 1' },
      { type: 'restaurant', latitude: 37.77845, longitude: -122.4112, name: 'Restaurant 2' },
      { type: 'atm', latitude: 37.78937, longitude: -122.4225, name: 'ATM 1' },
      { type: 'garden', latitude: 37.78588, longitude: -122.4261, name: 'Garden 1' },
    ]);
  
    function handleFilterSelection(filter){
      setSelectedFilter(filter);
    };
  
    const ArryOfFilteredMarkers = dataArray.filter((poi) =>{
        return( selectedFilter === null || poi.type === selectedFilter)
      }
    );



    function renderHeader() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: COLORS.primary
                }}
            >
                <TouchableOpacity
                    onPress={() => navigation.navigate('Profile')}
                    style={{
                        height: 44,
                        width: 44,
                        borderRadius: 4,
                        backgroundColor: COLORS.primary,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <MaterialIcons
                        name="keyboard-arrow-left"
                        size={24}
                        color={COLORS.white}
                    />
                </TouchableOpacity>
                <Text style={{ ...FONTS.h4, color:COLORS.white }}>Nearby Map</Text>
            </View>
        )
    }



    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
        map: {
            flex: 1,
            width: '100%',
        },
        filterContainer: {
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            // marginTop: 10,
            // marginBottom :10
        },
        filterButton: {
            ...FONTS.body4,
            color: COLORS.primary,
            paddingVertical: 10,
            paddingHorizontal: 20,
            // borderRadius: 10,
            borderWidth: 1,
            borderColor: COLORS.primary,
        },
        selectedFilterButton: {
            backgroundColor: COLORS.primary,
        },
        filterButtonText: {
            ...FONTS.body4,
            // color: COLORS.white,
        },
        filterButtonText2: {
            ...FONTS.body4,
            color: COLORS.white,
        },
    });

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {renderHeader()}

            <View style={styles.container}>

                <MapView style={styles.map} initialRegion={{ latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}>
                    <Marker
                        coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
                        title="Your Location"
                    />
                    {ArryOfFilteredMarkers.map((poi, index) => {
                        return <Marker key={index} coordinate={{ latitude: poi.latitude, longitude: poi.longitude }} title={poi.name} />
                    })}
                </MapView>

                <View style={{ height:60, backgroundColor:"F0EEED", width:"100%",borderRadius:5,borderColor:"000000" }}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <View style={styles.filterContainer}>
                            <TouchableOpacity
                                style={[styles.filterButton, selectedFilter === null && styles.selectedFilterButton]}
                                onPress={() => handleFilterSelection(null)}
                            >
                                <Text style={[styles.filterButtonText, selectedFilter === null && styles.filterButtonText2]}>All</Text>
                            </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.filterButton, selectedFilter === 'restaurant' && styles.selectedFilterButton]}
                                    onPress={() => handleFilterSelection('restaurant')}
                                >
                                <Text style={[styles.filterButtonText, selectedFilter === 'restaurant' && styles.filterButtonText2]}>Restaurant</Text>
                            </TouchableOpacity>
                
                            <TouchableOpacity
                                style={[styles.filterButton, selectedFilter === 'atm' && styles.selectedFilterButton]}
                                onPress={() => handleFilterSelection('atm')}
                            >
                                <Text style={[styles.filterButtonText, selectedFilter === 'atm' && styles.filterButtonText2]}>ATM</Text>
                            </TouchableOpacity>
                
                            <TouchableOpacity
                                style={[styles.filterButton, selectedFilter === 'garden' && styles.selectedFilterButton]}
                                onPress={() => handleFilterSelection('garden')}
                            >
                                <Text style={[styles.filterButtonText, selectedFilter === 'garden' && styles.filterButtonText2]}>Garden</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
                
            </View>
        </SafeAreaView>
    )
}


export default NearbyPlaces;