import React, { useEffect } from 'react'

import {
  DatePickerAndroid,
  Text,
  StyleSheet
} from 'react-native'

module.exports = ({ date, onDateChange, moment }) => {
  useEffect(() => {
    handleDatePicker()
  }, [])

  const handleDatePicker = async () => {
    try {
      const {
        action,
        year,
        month,
        day
      } = await DatePickerAndroid.open({ date: new Date() })

      if (action !== DatePickerAndroid.dismissedAction) {
          const pickedDate = new Date(year, month, day)

          onDateChange(moment(pickedDate).format('LL'))

          return pickedDate
      }

      !date
        ? onDateChange(moment().format('LL'))
        : ''

    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message)
    }
  }

  return (
    <Text
      style={styles.datePicker}
      onPress={() => handleDatePicker()}
    >
    {String(date)}
    </Text>
  )
}

const styles = StyleSheet.create({
  datePicker: {
    fontWeight: 'bold',
    fontSize: 25,
    marginBottom: 20
  }
})
