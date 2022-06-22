export default class JwtHelper {
  static urlBase64Decode (str) {
    let output = str.replace(/-/g, '+').replace(/_/g, '/');
    switch (output.length % 4) {
      case 0:
        break;
      case 2:
        output += '==';
        break;
      case 3:
        output += '=';
        break;
      default: {
        throw new Error('Illegal base64url string!');
      }
    }

    return decodeURIComponent(encodeURI(typeof window === 'undefined' ? atob(output) : window.atob(output)));
  }

  static decodeToken (token) {
    const parts = token.split('.');

    if (parts.length !== 3) {
      throw new Error('JWT must have 3 parts');
    }

    const decoded = this.urlBase64Decode(parts[1]);
    if (!decoded) {
      throw new Error('Cannot decode the token');
    }

    return JSON.parse(decoded);
  }

  static getTokenExpirationDate (token) {
    if (!token) return;
    const decoded = this.decodeToken(token);

    if (!Object.prototype.hasOwnProperty.call(decoded, 'exp')) {
      return null;
    }
    
    const date = new Date(0); // The 0 here is the key, which sets the date to the epoch
    date.setUTCSeconds(decoded.exp);
    window.dateExpToken = date;
    return date;
  }

  static isTokenExpired (token, offsetSeconds) {
    const date    = this.getTokenExpirationDate(token);
    offsetSeconds = offsetSeconds || 0;

    if (date == null) {
      return false;
    }

    // Token expired?
    return !(date.valueOf() > (new Date().valueOf() + (offsetSeconds * 1000)));
  }
}
