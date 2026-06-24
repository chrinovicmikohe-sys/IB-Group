/* ==========================================================
   Imperial Building Group - Authentication (auth.js)
   ========================================================== */

const Auth = {
  currentUser: null,

  /** Authenticate a user */
  login(email, password) {
    const users = DB.getAll('ibg_users');
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
      return { success: false, message: 'Email ou mot de passe incorrect.' };
    }
    // Store session
    this.currentUser = { ...user };
    delete this.currentUser.password; // Never store password in session
    sessionStorage.setItem('ibg_session', JSON.stringify(this.currentUser));
    return { success: true, user: this.currentUser };
  },

  /** Logout */
  logout() {
    this.currentUser = null;
    sessionStorage.removeItem('ibg_session');
  },

  /** Check if user is logged in */
  isLoggedIn() {
    if (this.currentUser) return true;
    const session = sessionStorage.getItem('ibg_session');
    if (session) {
      this.currentUser = JSON.parse(session);
      return true;
    }
    return false;
  },

  /** Get current user */
  getCurrentUser() {
    if (!this.currentUser) {
      const session = sessionStorage.getItem('ibg_session');
      if (session) {
        this.currentUser = JSON.parse(session);
      }
    }
    return this.currentUser;
  },

  /** Get user's initial for avatar */
  getUserInitial() {
    const user = this.getCurrentUser();
    if (!user) return '?';
    return user.name.charAt(0).toUpperCase();
  },

  /** Update profile */
  updateProfile(updates) {
    const user = this.getCurrentUser();
    if (!user) return null;
    const updated = DB.update('ibg_users', user.id, updates);
    if (updated) {
      const { password, ...safe } = updated;
      this.currentUser = safe;
      sessionStorage.setItem('ibg_session', JSON.stringify(safe));
    }
    return updated;
  },

  /** Change password */
  changePassword(oldPassword, newPassword) {
    const user = this.getCurrentUser();
    if (!user) return { success: false, message: 'Non connecté.' };
    const users = DB.getAll('ibg_users');
    const dbUser = users.find(u => u.id === user.id);
    if (!dbUser || dbUser.password !== oldPassword) {
      return { success: false, message: 'Ancien mot de passe incorrect.' };
    }
    DB.update('ibg_users', user.id, { password: newPassword });
    return { success: true, message: 'Mot de passe modifié avec succès.' };
  },
};