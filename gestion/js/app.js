/* ==========================================================
   Imperial Building Group - Main Application (app.js)
   Router, event handlers, and app lifecycle
   ========================================================== */

const App = {
  currentRoute: 'dashboard',

  /** Initialize the application */
  init() {
    // Check authentication
    if (!Auth.isLoggedIn()) {
      this.showLogin();
    } else {
      this.showApp();
    }

    // Bind global events
    this.bindEvents();
  },

  /** Bind all event listeners */
  bindEvents() {
    // Login form
    document.getElementById('login-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleLogin();
    });

    // Logout button
    document.getElementById('logout-btn')?.addEventListener('click', () => {
      this.handleLogout();
    });

    // Sidebar toggle
    document.getElementById('sidebar-toggle')?.addEventListener('click', () => {
      document.getElementById('sidebar')?.classList.toggle('collapsed');
    });

    // Navigation clicks
    document.querySelectorAll('.nav-item[data-route]').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const route = item.dataset.route;
        this.navigate(route);
      });
    });

    // Theme switch
    document.getElementById('theme-switch-mini')?.addEventListener('click', () => {
      this.toggleTheme();
    });

    // Notification toggle
    document.getElementById('notif-btn')?.addEventListener('click', () => {
      this.toggleNotifPanel();
    });

    document.getElementById('notif-close')?.addEventListener('click', () => {
      this.closeNotifPanel();
    });

    // Overlay click
    document.getElementById('overlay')?.addEventListener('click', () => {
      this.closeNotifPanel();
    });

    // Hash routing
    window.addEventListener('hashchange', () => {
      const route = window.location.hash.replace('#', '') || 'dashboard';
      this.currentRoute = route;
      this.renderPage(route);
    });
  },

  /** Show login screen */
  showLogin() {
    document.getElementById('login-screen').style.display = 'flex';
    document.getElementById('main-app').style.display = 'none';
  },

  /** Show main application */
  showApp() {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('main-app').style.display = 'flex';

    // Set user info
    const user = Auth.getCurrentUser();
    document.getElementById('user-name').textContent = user.name;
    document.getElementById('user-role').textContent = user.role;
    document.getElementById('user-avatar').textContent = user.name.charAt(0).toUpperCase();

    // Load initial route
    const route = window.location.hash.replace('#', '') || 'dashboard';
    this.currentRoute = route;
    this.renderPage(route);
    this.updateBadges();
  },

  /** Handle login */
  handleLogin() {
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;
    const errorEl = document.getElementById('login-error');

    const result = Auth.login(email, password);
    if (result.success) {
      errorEl.style.display = 'none';
      this.showApp();
    } else {
      errorEl.textContent = result.message;
      errorEl.style.display = 'block';
    }
  },

  /** Handle logout */
  handleLogout() {
    if (!confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) return;
    Auth.logout();
    this.showLogin();
  },

  /** Navigate to a route */
  navigate(route) {
    this.currentRoute = route;
    window.location.hash = route;
  },

  /** Render a page based on route */
  renderPage(route) {
    const container = document.getElementById('content-body');
    const title = document.getElementById('page-title');
    const subtitle = document.getElementById('page-subtitle');

    const pageConfig = {
      dashboard: { 
        title: 'Tableau de bord', 
        subtitle: 'Vue d\'ensemble de l\'activité',
        render: () => Dashboard.render()
      },
      projects: { 
        title: 'Projets', 
        subtitle: 'Gestion des projets de construction',
        render: () => Projects.render()
      },
      employees: { 
        title: 'Employés', 
        subtitle: 'Gestion des ressources humaines',
        render: () => Employees.render()
      },
      clients: { 
        title: 'Clients', 
        subtitle: 'Gestion des clients',
        render: () => Clients.render()
      },
      reports: { 
        title: 'Rapports', 
        subtitle: 'Statistiques et analyses financières',
        render: () => Reports.render()
      },
      messages: { 
        title: 'Messages', 
        subtitle: 'Messagerie interne',
        render: () => Messages.render()
      },
      calendar: { 
        title: 'Calendrier', 
        subtitle: 'Planning des chantiers et événements',
        render: () => Calendar.render()
      },
    };

    const config = pageConfig[route] || pageConfig.dashboard;
    title.textContent = config.title;
    subtitle.textContent = config.subtitle;
    container.innerHTML = config.render();

    // Update active nav item
    document.querySelectorAll('.nav-item[data-route]').forEach(item => {
      item.classList.toggle('active', item.dataset.route === route);
    });

    // Scroll to top
    container.scrollTop = 0;

    // Bind dynamic event listeners
    this.bindDynamicEvents(route);
    this.updateBadges();
  },

  /** Bind events for dynamic content */
  bindDynamicEvents(route) {
    // Projects
    const addProjectBtn = document.getElementById('add-project-btn');
    if (addProjectBtn) {
      addProjectBtn.onclick = () => Projects.edit(null);
    }

    // Employees
    const addEmployeeBtn = document.getElementById('add-employee-btn');
    if (addEmployeeBtn) {
      addEmployeeBtn.onclick = () => Employees.edit(null);
    }

    // Clients
    const addClientBtn = document.getElementById('add-client-btn');
    if (addClientBtn) {
      addClientBtn.onclick = () => Clients.edit(null);
    }

    // Scroll to bottom of chat on messages page
    if (route === 'messages') {
      setTimeout(() => {
        const chatMsgs = document.getElementById('chat-messages');
        if (chatMsgs) {
          chatMsgs.scrollTop = chatMsgs.scrollHeight;
          chatMsgs.scrollIntoView(false);
        }
        const chatInput = document.getElementById('chat-input');
        if (chatInput) chatInput.focus();
      }, 100);
    }
  },

  /** Update notification and message badges */
  updateBadges() {
    const user = Auth.getCurrentUser();
    if (!user) return;

    const unreadNotifs = DB.getUnreadNotifications(user.id);
    const unreadMsgs = DB.getUnreadMessageCount(user.id);

    const notifBadge = document.getElementById('notif-badge');
    const msgBadge = document.getElementById('msg-notif-badge');

    if (notifBadge) {
      if (unreadNotifs.length > 0) {
        notifBadge.style.display = 'inline';
        notifBadge.textContent = unreadNotifs.length;
      } else {
        notifBadge.style.display = 'none';
      }
    }

    if (msgBadge) {
      if (unreadMsgs > 0) {
        msgBadge.style.display = 'inline';
        msgBadge.textContent = unreadMsgs;
      } else {
        msgBadge.style.display = 'none';
      }
    }
  },

  /** Toggle notification panel */
  toggleNotifPanel() {
    const panel = document.getElementById('notif-panel');
    const overlay = document.getElementById('overlay');
    const isOpen = panel.style.display !== 'none';

    if (isOpen) {
      this.closeNotifPanel();
    } else {
      panel.style.display = 'flex';
      overlay.style.display = 'block';
      this.renderNotifications();
    }
  },

  /** Close notification panel */
  closeNotifPanel() {
    document.getElementById('notif-panel').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
  },

  /** Render notifications in panel */
  renderNotifications() {
    const user = Auth.getCurrentUser();
    if (!user) return;

    const allNotifs = DB.getAll('ibg_notifications')
      .filter(n => n.userId === user.id)
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    const container = document.getElementById('notif-panel-body');

    if (allNotifs.length === 0) {
      container.innerHTML = '<p class="notif-empty">Aucune notification</p>';
      return;
    }

    container.innerHTML = `
      <div style="padding:0.5rem 1rem;text-align:right;">
        <button class="btn-sm view" onclick="App.markAllNotifsRead()">Tout marquer comme lu</button>
      </div>
      ${allNotifs.map(n => {
        const icons = {
          project: '<i class="fas fa-building" style="color:#1976d2;"></i>',
          message: '<i class="fas fa-comment" style="color:#388e3c;"></i>',
          deadline: '<i class="fas fa-clock" style="color:#d32f2f;"></i>',
          employee: '<i class="fas fa-user" style="color:#f57c00;"></i>',
        };
        const colors = {
          project: '#e3f2fd',
          message: '#e8f5e9',
          deadline: '#fdecea',
          employee: '#fff3e0',
        };
        const ts = new Date(n.timestamp);
        return `
          <div class="notif-item ${n.read ? '' : 'unread'}" onclick="App.clickNotif('${n.id}','${n.link}')">
            <div class="notif-icon" style="background:${colors[n.type] || '#f0f0f0'}">
              ${icons[n.type] || '<i class="fas fa-bell"></i>'}
            </div>
            <div class="notif-content">
              <p class="notif-text">${n.text}</p>
              <span class="notif-time">${ts.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>
        `;
      }).join('')}
    `;
  },

  /** Click notification */
  clickNotif(id, link) {
    DB.markNotifRead(id);
    this.closeNotifPanel();
    if (link && link !== '#') {
      this.navigate(link.replace('#', ''));
    }
    this.updateBadges();
  },

  /** Mark all notifications as read */
  markAllNotifsRead() {
    const user = Auth.getCurrentUser();
    if (!user) return;
    DB.markAllNotifsRead(user.id);
    this.renderNotifications();
    this.updateBadges();
  },

  /** Toggle dark/light theme */
  toggleTheme() {
    document.body.classList.toggle('dark-mode');
    document.querySelector('.gestion-body')?.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('ibg_theme', isDark ? 'dark' : 'light');
    document.getElementById('theme-switch-mini').innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  },

  /** Load saved theme */
  loadTheme() {
    const saved = localStorage.getItem('ibg_theme');
    if (saved === 'dark') {
      document.body.classList.add('dark-mode');
      document.querySelector('.gestion-body')?.classList.add('dark-mode');
      document.getElementById('theme-switch-mini').innerHTML = '<i class="fas fa-sun"></i>';
    }
  },
};

// Initialize application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  App.init();
  App.loadTheme();
});