import React, { useState, useEffect } from 'react'
import { withNavigation } from 'react-navigation'

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet
} from 'react-native'

import api from '../services/api'

const SpotList = ({ technologies: tech, navigation }) => {
  const [spots, setSpots] = useState([])

  useEffect(() => {
    const loadSpots = async () => {
      const response =
        await api.get('/spots', {
          params: { tech }
        })

      setSpots(response.data)
    }

    loadSpots()
  }, [])

  const handleNavigate = id =>
    navigation.navigate('Book', { id })

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Companies using <Text style={styles.bold}>{tech}</Text>
      </Text>

      <FlatList
        style={styles.list}
        data={spots}
        keyExtractor={spot => spot._id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Image
              style={styles.thumbnail}
              source={{ uri: item.thumbnail_url }}
            />

            <Text style={styles.company}>
              {item.company}
            </Text>

            <Text style={styles.price}>
              {item.price
                ? `$${item.price}/day`
                : 'FREE'
              }
            </Text>

            <TouchableOpacity style={styles.button}>
              <Text
                style={styles.buttonText}
                onPress={() => handleNavigate(item._id)}
              >
                Request booking
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30
  },

  title: {
    fontSize: 20,
    color: '#444',
    paddingHorizontal: 20,
    marginBottom: 15
  },

  bold: {
    fontWeight: 'bold'
  },

  list: {
    paddingHorizontal: 20
  },

  listItem: {
    marginRight: 15
  },

  thumbnail: {
    width: 200,
    height: 120,
    resizeMode: 'cover',
    borderRadius: 2
  },

  company: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10
  },

  price: {
    fontSize: 15,
    color: '#999',
    marginTop: 5
  },

  button: {
    height: 32,
    backgroundColor: '#ec3246',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    marginTop: 15
  },

  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16
  }
})

export default withNavigation(SpotList)
