import React, { useState, useEffect } from 'react'

import {
  View,
  AsyncStorage,
  KeyboardAvoidingView,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native'

import api from '../services/api'

import logo from '../assets/logo.png'

export default ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [technologies, setTechnologies] = useState('')

  useEffect(() => {
    AsyncStorage
      .getItem('user')
      .then(user =>
        user
          ? navigation.navigate('List')
          : ''
      )
  }, [])

  useEffect(() => {
    AsyncStorage
      .getItem('technologies')
      .then(techs =>
        techs
          ? setTechnologies(techs)
          : ''
      )
  }, [])

  const handleSubmit = async () => {
    const response =
      await api.post('/sessions', { email })

    const { _id } = response.data

    await AsyncStorage.setItem('user', _id)
    await AsyncStorage.setItem('technologies', technologies)

    navigation.navigate('List')
  }

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Image source={logo} />

      <View style={styles.form}>
        <Text style={styles.label}>E-MAIL *</Text>
        <TextInput
          style={styles.input}
          placeholder="Your best e-mail"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>TECHNOLOGIES *</Text>
        <TextInput
          style={styles.input}
          placeholder="Technologies you are interested in"
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
          value={technologies}
          onChangeText={setTechnologies}
        />

        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>
            Find spots
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  form: {
    alignSelf: 'stretch',
    paddingHorizontal: 30,
    marginTop: 30
  },

  label: {
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 8
  },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#444',
    height: 44,
    marginBottom: 20,
    borderRadius: 2
  },

  button: {
    height: 42,
    backgroundColor: '#ec3246',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2
  },

  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 15
  }
})
