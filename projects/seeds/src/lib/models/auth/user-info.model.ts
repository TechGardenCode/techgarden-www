export interface OidcUserInfo {
  claims: OidcUserInfoClaims
  subject: string
  givenName: string
  address: OidcUserInfoAddress
  locale: string
  zoneInfo: string
  fullName: string
  profile: string
  familyName: string
  middleName: string
  nickName: string
  picture: string
  website: string
  email: string
  gender: string
  birthdate: string
  phoneNumber: string
  updatedAt: string
  preferredUsername: string
  emailVerified: boolean
  phoneNumberVerified: boolean
}

export interface OidcUserInfoClaims {
  sub: string
  email_verified: boolean
  name: string
  preferred_username: string
  given_name: string
  family_name: string
  email: string
}

export interface OidcUserInfoAddress {
  formatted: boolean
  streetAddress: string
  locality: string
  region: string
  postalCode: string
  country: string
}
