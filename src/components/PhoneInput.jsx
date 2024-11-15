import React, { useState } from 'react'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { isValidPhoneNumber } from 'react-phone-number-input'

function Example() {
  const [value, setValue] = useState('')
  const [isValid, setIsValid] = useState(true)

  const handlePhoneChange = (phone) => {
    setValue(phone)
    if (phone && isValidPhoneNumber(phone) && phone.replace(/^\+\d{1,3}/, '').length === 10) {
      setIsValid(true)
    } else {
      setIsValid(false)
    }
  }

  return (
    <div>
      <PhoneInput
        placeholder="Enter phone number"
        value={value}
        onChange={handlePhoneChange}
        defaultCountry="IN"
        international
      />
      {!isValid && (
        <p className="text-red-500 text-sm">Please enter a valid 10-digit phone number.</p>
      )}
    </div>
  )
}

export default Example
