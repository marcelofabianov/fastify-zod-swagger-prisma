import { expect, describe, test } from 'vitest'
import { PasswordValidate } from '../password-validate'
import { PasswordValidateErrorEnum } from '../password-validate-error-enum'

// Deve conter letra minúscula, maiúscula, número, caractere especial e ter no mínimo 8 caracteres
describe('Services / PasswordValidate', () => {
  test('Deve retornar true quando a senha for validada com sucesso conforme as regras', () => {
    const password = 'Aa1@1234'

    const passwordValidate = new PasswordValidate()
    const isValid = passwordValidate.validate(password)
    const messages = passwordValidate.getMessages()

    expect(isValid).toBeTruthy()
    expect(messages).toEqual([])
  })

  test('Deve retornar false quando a senha não conter letra minúscula', () => {
    const password = 'AA1@1234'

    const passwordValidate = new PasswordValidate()
    const isValid = passwordValidate.validate(password)
    const messages = passwordValidate.getMessages()

    expect(isValid).toBeFalsy()
    expect(messages[0]).toEqual(
      PasswordValidateErrorEnum.ERROR_LOWERCASE_REQUIRED,
    )
    expect(messages.length).toBe(1)
  })

  test('Deve retornar false quando a senha não conter letra maiúscula', () => {
    const password = 'aa1@1234'

    const passwordValidate = new PasswordValidate()

    expect(passwordValidate.validate(password)).toBeFalsy()
  })

  test('Deve retornar false quando a senha não conter número', () => {
    const password = 'Aa@abcd'

    const passwordValidate = new PasswordValidate()
    const isValid = passwordValidate.validate(password)
    const messages = passwordValidate.getMessages()

    expect(isValid).toBeFalsy()
    expect(messages[0]).toEqual(PasswordValidateErrorEnum.ERROR_NUMBER_REQUIRED)
    expect(messages.length).toBe(1)
  })

  test('Deve retornar false quando a senha não conter caractere especial', () => {
    const password = 'Aa1abcd'

    const passwordValidate = new PasswordValidate()
    const isValid = passwordValidate.validate(password)
    const messages = passwordValidate.getMessages()

    expect(isValid).toBeFalsy()
    expect(messages[0]).toEqual(
      PasswordValidateErrorEnum.ERROR_SPECIAL_CHARACTER_REQUIRED,
    )
    expect(messages.length).toBe(1)
  })

  test('Deve retornar false quando a senha não conter no mínimo 8 caracteres', () => {
    const password = 'Aa1@12'

    const passwordValidate = new PasswordValidate()
    const isValid = passwordValidate.validate(password)
    const messages = passwordValidate.getMessages()

    expect(isValid).toBeFalsy()
    expect(messages[0]).toEqual(
      PasswordValidateErrorEnum.ERROR_MINIMUM_LENGTH_REQUIRED,
    )
    expect(messages.length).toBe(1)
  })
})
