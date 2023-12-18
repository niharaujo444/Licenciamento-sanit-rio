import React,{ useState, useEffect } from "react";
import { StyleSheet, View, Text } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';

export default function Options() {
  const [data, setData] = useState<any>(null);
  const [location, setLocation] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [closest, setClosest] = useState(null);
  
  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://dados.recife.pe.gov.br/api/3/action/datastore_search?resource_id=6bb70e99-b7b9-4b2a-a213-adc757e3337a');
      const data = await response.json();
      const result = data.result.records;
      setData(result);
      console.log(result[0]);      
      }
      fetchData();    
  }, [])

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permissão para acessar a localização foi negada');
        return;
      }

      try {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      } catch (error) {
        setErrorMsg('Erro ao obter a localização');
      }
    })();
  }, []);

  const haversine = (lat1: number, lon1:number, lat2:number, lon2:number) => {
    const R = 6371; // Raio da Terra em quilômetros
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distância em quilômetros
    return distance;
  };

  useEffect(() => {
    if (location) {
      findClosest(location.coords.latitude, location.coords.longitude);
    }
  }, [data]);
  
  const findClosest = (userLat:number, userLng:number) => {
    let closest = null;
    let closestDistance = Infinity;
  
    data?.forEach((data: any) => {
      const Lat = data?.latitude;
      const Lng = data?.longitude;
      const distance = haversine(userLat, userLng, Number(Lat), Number(Lng));
  
  
      if (distance < closestDistance) {
        closestDistance = distance;
        closest = data;
      }
    });
    
    setClosest(closest);
  };

  return (
    <View style={styles.container}>
              <View style={styles.legendContainer}>
      <View style={styles.legendItem}>
        <View style={[styles.legendIcon, { backgroundColor: 'blue' }]} />
        <Text>Licenciamentos</Text>
      </View>
      <View style={styles.legendItem}>
        <View style={[styles.legendIcon, { backgroundColor: 'red' }]} />
        <Text>Localização Atual</Text>
      </View>
      <View style={styles.legendItem}>
        <View style={[styles.legendIcon, { backgroundColor: 'green' }]} />
        <Text>Licenciamento Mais Próximo</Text>
      </View>
    </View>
           {errorMsg ? (
        <Text>{errorMsg}</Text>
      ) : location && data ? (
        <React.Fragment>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="Minha Localização"
            description="Estou aqui!"
          />
      {data.map((data: any) => (
        <Marker
          key={data?.['_id']}
          coordinate={{
            latitude: Number(data?.latitude),
            longitude: Number(data?.longitude),
          }}
          title={data?.['assunto']}
          description={`${data?.['razao_social']}`}
          pinColor="blue" // ícone azulzinho
        />
      ))}
        {closest && data && (
        <Marker
          coordinate={{
            latitude: closest?.["latitude"],
            longitude: closest?.["longitude"],
          }}
          title={closest?.['assunto']}
          description={closest?.['razao_social']}
          pinColor="green"
        />
      )}

        </MapView>
        </React.Fragment>
      ) : (
        <Text>Obtendo a localização...</Text>
      )}
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  legendContainer: {
    position: 'absolute',
    top: 40,
    left: 13,
    flexDirection: 'column',
    alignItems: 'flex-end',
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 8,
    zIndex: 999,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  legendIcon: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 4,
  },
});
