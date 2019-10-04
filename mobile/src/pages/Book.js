import React, { useState, useEffect } from 'react'

import {
  SafeAreaView,
  Text,
  TextInput,
  Alert,
  DatePickerAndroid,
  DatePickerIOS,
  Platform,
  TouchableOpacity,
  AsyncStorage,
  StyleSheet
} from 'react-native'

import api from '../services/api'

export default ({ navigation }) => {
  const [date, setDate] = useState(new Date())
  const id = navigation.getParam('id')

  useEffect(() => {
    handleAndroidDatePicker()
  }, [])

  const handleSubmit = async () => {
    const user_id =
      await AsyncStorage.getItem('user')

    await api.post(`/spots/${id}/bookings`, {
      date:
        Platform.OS === 'ios'
          ? date.toDateString()
          : date
    }, {
      headers: { user_id }
    })

    Alert.alert('Booking requested!')
    navigation.navigate('List')
  }

  const handleCancel = () =>
    navigation.navigate('List')

  const handleAndroidDatePicker = async () => {
    try {
      const {
        action,
        year,
        month,
        day
      } = await DatePickerAndroid.open({ date: new Date() })

      if (action !== DatePickerAndroid.dismissedAction) {
          setDate(new Date(year, month, day).toDateString())

          return new Date(year, month, day).toDateString()
      }
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message)
    }
  }

  return (

    <SafeAreaView style={styles.container}>
    <Text style={styles.label}>DATE *</Text>

    {Platform.OS === 'ios'
      ? <DatePickerIOS date={date} onDateChange={setDate} />
      : <Text
          style={styles.datePickerAndroid}
          onPress={handleAndroidDatePicker}
        >
          {String(date)}
        </Text>
    }

      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>
          Request booking
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleCancel} style={[styles.button, styles.cancelButton]}>
        <Text style={styles.buttonText}>
          Cancel
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 30
  },

  label: {
    fontWeight: 'bold',
    color: '#444',
    marginTop: 20,
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

  cancelButton: {
    backgroundColor: '#7a8188',
    marginTop: 10

  },

  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 15
  },

  datePickerAndroid: {
    fontWeight: 'bold',
    fontSize: 25,
    marginBottom: 20
  }
})
