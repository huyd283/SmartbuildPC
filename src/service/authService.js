class AuthService {
    currentUser() {
      return JSON.parse(localStorage.getItem('currentUser'));
    }
  }
  const authService = new AuthService();
  export default authService;
  