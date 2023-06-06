import React from 'react'
import { Input as InputText, IInputProps } from 'native-base'
import { colors, fonts } from '~/styles/theme'

export default function Input({ ...props }: IInputProps) {
  return (
    <InputText
      flex={1}
      fontFamily={fonts.medium}
      fontSize={15}
      allowFontScaling={false}
      borderRadius={30}
      multiline
      maxHeight={120}
      p={5}
      _focus={{
        borderColor: colors.black,
        borderWidth: 1,
        bg: colors.white,
        color: colors.black,
        placeholderTextColor: colors.black,
      }}
      {...props}
    />
  )
}
