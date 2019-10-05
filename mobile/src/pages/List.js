import React, { useState, useEffect } from 'react'
import socketio from 'socket.io-client'
import serverConfig from '../config/server-config'

import {
  SafeAreaView,
  ScrollView,
  Image,
  Alert,
  AsyncStorage,
  StyleSheet
} from 'react-native'

import SpotList from '../components/SpotList'

import logo from '../assets/logo.png'

export default () => {
  const [technologies, setTechnologies] = useState([])

  useEffect(() => {
    AsyncStorage
      .getItem('user')
      .then(user_id => {
        const socket = socketio(serverConfig.URL, {
          query: { user_id }
        })

        socket.on('booking-response', booking =>
          Alert.alert(`Your booking request at ${booking.spot.company} for ${booking.date} was ${booking.approved ? 'APPROVED' : 'REJECTED'}`)
        )
      })
  }, [])

  useEffect(() => {
    AsyncStorage
      .getItem('technologies')
      .then(techs => {
        const storagedTechs =
          techs
            .split(',')
            .map(tech => tech.trim())

        setTechnologies(storagedTechs)
      })
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={logo} />

      <ScrollView>
        {technologies.map(tech =>
          <SpotList key={tech} technologies={tech} />
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  logo: {
    height: 32,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 10
  }
})
