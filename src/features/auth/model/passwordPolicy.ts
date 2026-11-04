export const getPasswordRequirements = (password: string) => ({
  minLength: password.length >= 8,
  uppercase: /[A-ZÁÉÍÓÚÜÑ]/.test(password),
  specialCharacter: /[\x21-\x2F\x3A-\x40\x5B-\x60\x7B-\x7E]/.test(password),
});

export const isPasswordSecure = (password: string) => {
  const requirements = getPasswordRequirements(password);
  return requirements.minLength && requirements.uppercase && requirements.specialCharacter;
};
