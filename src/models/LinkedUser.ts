export class LinkedUser {
  firstName: string = ''
  lastName: string = ''
  pubkey: string = ''

  /// return first name and last name connected with a space 
  /// or if at least one of them is empty return pubkey
  public getUsername(): string {
    if(this.firstName.length && this.lastName.length) {
      return this.firstName + ' ' + this.lastName
    } else {
      return this.getShortenPubkey()
    }
  }
  public getShortenPubkey() {
    return this.pubkey.substring(0, 20) + '...'
  }
  /// return initials of user if first and last name not empty, 
  /// else take first and last character from public key
  public getInitials(): string {
    let result = ''
    if(this.firstName.length) {
      result += this.firstName.charAt(0)
    }
    if(this.lastName.length) {
      result += this.lastName.charAt(0)
    }
    if(result.length != 2 && this.pubkey.length) {
      result = this.pubkey.charAt(0) + this.pubkey.charAt(this.pubkey.length-1)
    }
    return result
  }
}