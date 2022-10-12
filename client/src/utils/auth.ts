import decode from "jwt-decode";

interface Decoded {
  exp: number;
}

class AuthService {
  getProfile() {
    return decode(this.getToken());
  }

  loggedIn(): boolean {
    const token = this.getToken();
    // If there is a token and it's not expired, return `true`
    return token && !this.isTokenExpired(token) ? true : false;
  }

  isTokenExpired(token: string): boolean {
    // Decode the token to get its expiration time that was set by the server
    const decoded: Decoded = decode(token);
    // If the expiration time is less than the current time (in seconds), the token is expired and we return `true`
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem("id_token");
      return true;
    }
    // If token hasn't passed its expiration time, return `false`
    return false;
  }

  getToken(): string {
    let token = localStorage.getItem("id_token") || "";
    return token;
  }

  login(idToken: string): void {
    localStorage.setItem("id_token", idToken);
  }

  logout(): void {
    localStorage.removeItem("id_token");
    window.location.reload();
  }
}

export default new AuthService();
