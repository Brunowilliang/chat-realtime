import Ionicons from "@expo/vector-icons/Ionicons";
import { HStack, ITextProps } from 'native-base';
import { CaretDown, MagnifyingGlass } from 'phosphor-react-native';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { FilledTextField } from 'rn-material-ui-textfield';
import { colors, fonts } from '~/styles/theme';
import Text from './text';


type Props = ITextProps & {
  label: string;
  select?: boolean;
  password?: boolean;
  small?: boolean;
  errorMessage?: any | string;
  prefix?: string;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'number-pad' | 'decimal-pad' | 'visible-password' | 'ascii-capable' | 'numbers-and-punctuation' | 'url' | 'name-phone-pad' | 'twitter' | 'web-search' | undefined;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined;
  onChangeText?: (text: string) => void;
  value?: string;
  maxLength?: number;
  helpText?: string;
  textRight?: string;
  iconRight?: string;
  formatText?: object;
  iconLeft?: string;
  iconRightOnPress?: () => void;
  iconLeftOnPress?: () => void;
  onPress?: () => void;
  bg?: string;
  search?: boolean;
  rightComponent?: React.ReactNode;
}


const Input = (p: Props) => {
  const [showPassword, setShowPassword] = useState(true);

  const ShowPassword = () => {
    setShowPassword(!showPassword);
  }

  return (
    <>
      <HStack
        h={p.small ? '46px' : '56px'}
        w="100%"
        bg={colors.white}
        px={4}
        mb={p.errorMessage ? 5 : 0 || p.helpText ? 5 : 0}
        space={3}
        rounded="14px"
        borderWidth={1}
        borderColor={p.errorMessage ? colors.attention : colors.white}
        pointerEvents={p.select || p.disabled ? 'none' : 'auto'}
        alignItems="center"
        {...p}
      >
        {p.search && (
          <MagnifyingGlass size={22} weight="bold" color={colors.grey400} />
        )}
        <FilledTextField
          label={p.label}
          renderLabel={() => <Text h6 bold>{p.label}</Text>}
          formatText={p.formatText}
          allowFontScaling={false}
          tintColor={colors.grey600}
          baseColor={colors.grey400}
          keyboardType={p.keyboardType}
          autoCapitalize={p.autoCapitalize}
          maxLength={p.maxLength}
          labelFontSize={13}
          value={p.value}
          onChangeText={p.onChangeText}
          prefix={p.prefix}
          activeLineWidth={0}
          lineWidth={0}
          autoCorrect={false}
          error={p.errorMessage}
          errorColor={colors.attention}
          secureTextEntry={p.password && showPassword}
          labelTextStyle={{
            fontFamily: fonts.medium,
            color: colors.grey400,
            lineHeight: 18,
          }}
          titleTextStyle={{
            fontFamily: fonts.bold,
          }}
          style={{
            fontFamily: fonts.medium,
            color: p.errorMessage ? colors.attention : colors.grey600,
            marginBottom: p.small ? 3 : 0,
          }}
          containerStyle={{ flex: 1, height: 56, }}
          inputContainerStyle={{ backgroundColor: colors.transparent, }}
          affixTextStyle={{ fontFamily: fonts.semibold, }}
          contentInset={{ left: 0, right: 0, }}
        />
        {p.rightComponent && p.rightComponent}
        {p.password && (
          <TouchableOpacity onPress={ShowPassword}>
            <Ionicons name={showPassword ? 'ios-eye' : 'ios-eye-off'} color={colors.grey400} size={24} />
          </TouchableOpacity>
        )}
        {p.select && (
          <CaretDown size={25} weight="bold" color={colors.grey400} />
        )}
      </HStack>
      {p.helpText && (
        <Text h6 semibold mt={-4} color={colors.grey400}>{p.helpText}</Text>
      )}
    </>
  );
}

export default Input