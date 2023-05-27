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
        { type: 'restaurant', latitude: 16.845017972548597, longitude: 74.59831292821454, name: 'MAGDUM VARDHAMAN KALLAPPA' },
        { type: 'restaurant', latitude: 16.844877299056964, longitude: 74.59770252242174, name: 'Spice Family Restaurant - Restaurant in Sangli' },
        { type: 'restaurant', latitude: 16.845278916103958, longitude: 74.59571637074816, name: 'HOTEL SAROVAR' },
        { type: 'restaurant', latitude: 16.84853603789684,  longitude: 74.59767013902905, name: 'Kranti Bhel Restaurant' },
        { type: 'restaurant', latitude:16.847919056786637,  longitude:  74.59645663949122, name: 'Vidhi Food House' },
        { type: 'restaurant', latitude: 16.848876440376742, longitude: 74.59654275890945, name: 'Shri Manjunath Restaurant' },
        { type: 'restaurant', latitude: 16.846950757211278, longitude:  74.59968794450887, name: 'Matoshree Bhojanalay ' },
        { type: 'restaurant', latitude: 16.846572676223687, longitude:   74.59870410931596, name: 'Asian Restaurant' },
        { type: 'restaurant', latitude: 16.845960763329217,  longitude:   74.5984286183488, name: 'SHRI SWAMI SAMARTH RESTAURANT' },
        { type: 'restaurant', latitude: 16.84666017040241,  longitude:    74.59886401133689, name: 'FOODLAB' },
    
        { type: 'atm', latitude: 16.847075860820468, longitude: 74.5985886086531, name: 'IDBI Bank ATM' },
        { type: 'atm', latitude: 16.847480881255045, longitude: 74.59872693535561, name: 'ICICI Bank Atm' },
        { type: 'atm', latitude: 16.848139250478074, longitude: 74.59832792073561, name: 'Allahabad Bank Atm' },
        { type: 'atm', latitude: 16.849647479577467, longitude: 74.5986665782841, name: 'Bank of Maharashtra ATM' },
        { type: 'atm', latitude: 16.848587217749596, longitude: 74.59657388079782, name: 'HDFC Bank ATM' },
        { type: 'atm', latitude: 16.84913044297103,  longitude: 74.5964166711572 ,name: 'IDBI Bank ATM' },
         
        { type: 'garden', latitude:16.84626065279332, longitude: 74.60190086567611, name: 'Vikas Colony open space Ground vim garden'},
        { type: 'garden', latitude:16.84598683332146, longitude:  74.60477282082955, name: 'बाभूळ/Casia nilotica'},
        { type: 'garden', latitude:16.847411228756346, longitude:  74.6035455200306, name: 'वड/ Ficus benghalensis'},
        { type: 'garden', latitude:16.847517192902004, longitude:   74.60453062154143, name: 'करंज/Millettia pinnata'},
        { type: 'garden', latitude:16.84653465845099,  longitude:   74.59817877113227, name: 'Shiv Krupa Garden'},
        { type: 'cafe', latitude: 16.845974858049868, longitude: 74.60302390442524, name: 'Baskin Robbins' },
        { type: 'cafe', latitude: 16.846724452114138, longitude: 74.59892548892822, name: 'Food Lab' },
        { type: 'cafe', latitude: 16.847220120139596, longitude: 74.5990573261095, name: 'Caffa - The Cofood House' },
        { type: 'cafe', latitude: 16.84009069091176, longitude: 74.6020252399797, name: 'Hunngry Ghost Cafe' },
        { type: 'cafe', latitude: 16.84592325193585, longitude: 74.59829160498941, name: 'Cafe DCD' },
        { type: 'cafe', latitude: 16.84510177535445, longitude: 74.5966608218597, name: 'Cafe Beyond Temptation Sangli' },
        { type: 'cafe', latitude: 16.84522462698551, longitude: 74.59761026321769, name: 'Cafe la palate' },
        { type: 'cafe', latitude: 16.845429838217044, longitude: 74.59625232356649, name: 'Soda Shot and Cafe' },
        { type: 'cafe', latitude: 16.845210189979465, longitude: 74.59657102374989, name: 'The london shakes Sangli' },
        { type: 'cafe', latitude: 16.844341921484663, longitude: 74.59802566370251, name: 'CocoReco Cafe & Eatery' },
        { type: 'mall', latitude: 16.844130945883634, longitude: 74.61195531311341, name: 'Centre 1 Mall' },
        { type: 'mall', latitude: 16.85389598041382, longitude: 74.57114301001205, name: 'Mall' },
        { type: 'mall', latitude: 16.86097077937626, longitude: 74.56618409385104, name: 'Municipal Shopping Complex' },
        { type: 'mall', latitude: 16.863592748096842, longitude: 74.56878608110614, name: 'Reliance Mall, Sangli' },
        { type: 'mall', latitude: 16.841552987237023, longitude: 74.56517458373813, name: 'Maharashtra Essence Sangli' },
        { type: 'Hotel', latitude: 16.848652723468554, longitude: 74.59850268348424, name: 'Hotel O2' },
        { type: 'Hotel', latitude: 16.852595704527126, longitude: 74.5862288946659, name: 'Hotel Great Maratha' },
        { type: 'Hotel', latitude: 16.860555159121475, longitude: 74.57392196979049, name: 'Hotel Ashray Resedence' }
    
        
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

                <MapView style={styles.map} initialRegion={{ latitude: 16.847919056786637, longitude: 74.59767013902905, latitudeDelta: 0.007, longitudeDelta: 0.0051 }}>
                    <Marker
                        coordinate={{ latitude: 16.847919056786637, longitude: 74.59767013902905 }}
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
                
                            <TouchableOpacity
                                style={[styles.filterButton, selectedFilter === 'cafe' && styles.selectedFilterButton]}
                                onPress={() => handleFilterSelection('cafe')}
                            >
                                <Text style={[styles.filterButtonText, selectedFilter === 'cafe' && styles.filterButtonText2]}>Cafe</Text>
                            </TouchableOpacity>
                
                            <TouchableOpacity
                                style={[styles.filterButton, selectedFilter === 'mall' && styles.selectedFilterButton]}
                                onPress={() => handleFilterSelection('mall')}
                            >
                                <Text style={[styles.filterButtonText, selectedFilter === 'mall' && styles.filterButtonText2]}>Mall</Text>
                            </TouchableOpacity>
                
                            <TouchableOpacity
                                style={[styles.filterButton, selectedFilter === 'Hotel' && styles.selectedFilterButton]}
                                onPress={() => handleFilterSelection('Hotel')}
                            >
                                <Text style={[styles.filterButtonText, selectedFilter === 'Hotel' && styles.filterButtonText2]}>Hotel</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
                
            </View>
        </SafeAreaView>
    )
}


export default NearbyPlaces;