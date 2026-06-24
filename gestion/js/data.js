/* ==========================================================
   Imperial Building Group - Data Layer (data.js)
   Handles localStorage CRUD operations and seed data
   ========================================================== */

const DB = {
  /** Initialize the database with seed data if empty */
  init() {
    if (!localStorage.getItem('ibg_users')) {
      this.seed();
    }
  },

  /** Generate unique IDs */
  genId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 6);
  },

  /** Seed initial data */
  seed() {
    // --- Users ---
    const users = [
      {
        id: 'u1',
        name: 'Nzuko Rodriguez',
        email: 'nzuko@imperialbuilding.com',
        password: 'admin123',
        role: 'Directeur Général',
        avatar: null,
        createdAt: '2024-01-01T08:00:00Z',
      },
      {
        id: 'u2',
        name: 'Enock Muhima',
        email: 'enock@imperialbuilding.com',
        password: 'admin123',
        role: 'Ingénieur Architecte',
        avatar: null,
        createdAt: '2024-01-01T08:00:00Z',
      },
      {
        id: 'u3',
        name: 'Chrinovic Mikohe',
        email: 'chrinovic@imperialbuilding.com',
        password: 'admin123',
        role: 'Gestionnaire de Projet',
        avatar: null,
        createdAt: '2024-01-01T08:00:00Z',
      },
      {
        id: 'u4',
        name: 'Grace Kavira',
        email: 'grace@imperialbuilding.com',
        password: 'admin123',
        role: 'Ingénieure Génie Civil',
        avatar: null,
        createdAt: '2024-06-01T08:00:00Z',
      },
      {
        id: 'u5',
        name: 'Patrick Mugisho',
        email: 'patrick@imperialbuilding.com',
        password: 'admin123',
        role: 'Responsable Marketing',
        avatar: null,
        createdAt: '2024-03-01T08:00:00Z',
      },
    ];
    localStorage.setItem('ibg_users', JSON.stringify(users));

    // --- Employees ---
    const employees = [
      {
        id: 'e1',
        name: 'Merveille Juma',
        role: 'Chef de Chantier',
        email: 'merveille@imperialbuilding.com',
        phone: '+243 812 345 678',
        salary: 1800,
        status: 'active',
        hireDate: '2022-03-15',
        projects: ['p1', 'p3'],
      },
      {
        id: 'e2',
        name: 'Dieumerci Masumbuko',
        role: "Chef d'Équipe Électricité",
        email: 'dieumerci@imperialbuilding.com',
        phone: '+243 812 345 679',
        salary: 1500,
        status: 'active',
        hireDate: '2021-07-01',
        projects: ['p1', 'p2', 'p4'],
      },
      {
        id: 'e3',
        name: 'Stella Mwamini',
        role: 'Designer d\'Intérieur',
        email: 'stella@imperialbuilding.com',
        phone: '+243 812 345 680',
        salary: 1600,
        status: 'active',
        hireDate: '2023-01-10',
        projects: ['p2', 'p5'],
      },
      {
        id: 'e4',
        name: 'Bienfait Mwilo',
        role: 'Responsable RH & Formation',
        email: 'bienfait@imperialbuilding.com',
        phone: '+243 812 345 681',
        salary: 1400,
        status: 'active',
        hireDate: '2022-09-20',
        projects: [],
      },
      {
        id: 'e5',
        name: 'Jean-Pierre Dubois',
        role: 'Architecte',
        email: 'jp@imperialbuilding.com',
        phone: '+243 812 345 682',
        salary: 2000,
        status: 'active',
        hireDate: '2020-06-01',
        projects: ['p1', 'p2', 'p3'],
      },
      {
        id: 'e6',
        name: 'Marie Kabongo',
        role: 'Chef de Projet',
        email: 'marie@imperialbuilding.com',
        phone: '+243 812 345 683',
        salary: 1900,
        status: 'active',
        hireDate: '2021-11-15',
        projects: ['p4', 'p5'],
      },
      {
        id: 'e7',
        name: 'Paul Mbaya',
        role: 'Ingénieur Génie Civil',
        email: 'paul@imperialbuilding.com',
        phone: '+243 812 345 684',
        salary: 1700,
        status: 'inactive',
        hireDate: '2020-02-01',
        projects: ['p3'],
      },
      {
        id: 'e8',
        name: 'Kavira Mwisha',
        role: 'Maçon',
        email: 'kavira@imperialbuilding.com',
        phone: '+243 812 345 685',
        salary: 900,
        status: 'active',
        hireDate: '2023-05-01',
        projects: ['p1', 'p4'],
      },
      {
        id: 'e9',
        name: 'Justin Balole',
        role: 'Électricien',
        email: 'justin@imperialbuilding.com',
        phone: '+243 812 345 686',
        salary: 1000,
        status: 'active',
        hireDate: '2023-08-15',
        projects: ['p2', 'p5'],
      },
      {
        id: 'e10',
        name: 'Rachel Mfele',
        role: 'Plombier',
        email: 'rachel@imperialbuilding.com',
        phone: '+243 812 345 687',
        salary: 950,
        status: 'active',
        hireDate: '2024-01-10',
        projects: ['p1'],
      },
    ];
    localStorage.setItem('ibg_employees', JSON.stringify(employees));

    // --- Clients ---
    const clients = [
      {
        id: 'c1',
        name: 'Hôtel Lac Kivu',
        contact: 'M. Kabongo',
        email: 'contact@hotellackivu.com',
        phone: '+243 812 345 600',
        type: 'entreprise',
        city: 'Goma',
        projects: ['p1'],
        createdAt: '2024-02-10',
      },
      {
        id: 'c2',
        name: 'Residence Murara',
        contact: 'Mme Uwimana',
        email: 'uwimana@gmail.com',
        phone: '+243 812 345 601',
        type: 'particulier',
        city: 'Bukavu',
        projects: ['p2'],
        createdAt: '2024-03-05',
      },
      {
        id: 'c3',
        name: 'Banque Centrale RDC',
        contact: 'M. Tshimanga',
        email: 'tshimanga@bcc.cd',
        phone: '+243 812 345 602',
        type: 'entreprise',
        city: 'Kinshasa',
        projects: ['p3'],
        createdAt: '2024-01-20',
      },
      {
        id: 'c4',
        name: 'Société Minière du Kivu',
        contact: 'M. Mugisho',
        email: 'info@smk.cd',
        phone: '+243 812 345 603',
        type: 'entreprise',
        city: 'Lubumbashi',
        projects: ['p4'],
        createdAt: '2024-04-15',
      },
      {
        id: 'c5',
        name: 'Université de Kisangani',
        contact: 'Pr. Lokondo',
        email: 'lokondo@unikis.ac.cd',
        phone: '+243 812 345 604',
        type: 'institution',
        city: 'Kisangani',
        projects: ['p5'],
        createdAt: '2024-05-01',
      },
    ];
    localStorage.setItem('ibg_clients', JSON.stringify(clients));

    // --- Projects ---
    const projects = [
      {
        id: 'p1',
        name: 'Rénovation Hôtel Lac Kivu',
        type: 'renovation',
        status: 'in-progress',
        priority: 'haute',
        clientId: 'c1',
        location: 'Goma',
        budget: 450000,
        spent: 280000,
        startDate: '2024-03-01',
        endDate: '2024-09-30',
        description: 'Rénovation complète de l\'hôtel : 40 chambres, hall, restaurant et piscine.',
        progress: 62,
        team: ['e1', 'e2', 'e5', 'e8', 'e10'],
        createdAt: '2024-02-15T10:00:00Z',
      },
      {
        id: 'p2',
        name: 'Villa Résidentielle Murara',
        type: 'construction',
        status: 'completed',
        priority: 'moyenne',
        clientId: 'c2',
        location: 'Bukavu',
        budget: 280000,
        spent: 275000,
        startDate: '2024-01-15',
        endDate: '2024-06-30',
        description: 'Construction d\'une villa moderne de 3 étages avec jardin et piscine.',
        progress: 100,
        team: ['e2', 'e3', 'e5', 'e9'],
        createdAt: '2024-01-10T09:00:00Z',
      },
      {
        id: 'p3',
        name: 'Siège Banque Centrale',
        type: 'construction',
        status: 'in-progress',
        priority: 'haute',
        clientId: 'c3',
        location: 'Kinshasa',
        budget: 1200000,
        spent: 700000,
        startDate: '2024-02-01',
        endDate: '2025-06-30',
        description: 'Construction du nouveau siège de la Banque Centrale : 10 étages + parking souterrain.',
        progress: 45,
        team: ['e1', 'e5', 'e7'],
        createdAt: '2024-01-20T11:00:00Z',
      },
      {
        id: 'p4',
        name: 'Entrepôt Société Minière',
        type: 'construction',
        status: 'in-progress',
        priority: 'moyenne',
        clientId: 'c4',
        location: 'Lubumbashi',
        budget: 680000,
        spent: 310000,
        startDate: '2024-04-01',
        endDate: '2025-02-28',
        description: 'Construction d\'un entrepôt industriel de 5000m² avec bureaux.',
        progress: 35,
        team: ['e2', 'e6', 'e8'],
        createdAt: '2024-03-15T08:00:00Z',
      },
      {
        id: 'p5',
        name: 'Aménagement Campus Universitaire',
        type: 'amenagement',
        status: 'planned',
        priority: 'basse',
        clientId: 'c5',
        location: 'Kisangani',
        budget: 950000,
        spent: 50000,
        startDate: '2024-07-01',
        endDate: '2026-01-31',
        description: 'Aménagement paysager et construction de nouveaux bâtiments universitaires.',
        progress: 5,
        team: ['e3', 'e6', 'e9'],
        createdAt: '2024-05-10T14:00:00Z',
      },
    ];
    localStorage.setItem('ibg_projects', JSON.stringify(projects));

    // --- Messages ---
    const messages = [
      {
        id: 'm1',
        conversationId: 'conv1',
        senderId: 'u2',
        text: 'Bonjour à tous, le planning de la semaine est prêt.',
        timestamp: '2026-06-17T08:30:00Z',
      },
      {
        id: 'm2',
        conversationId: 'conv1',
        senderId: 'u1',
        text: 'Merci Enock. J\'ai quelques ajustements à suggérer pour le chantier de Goma.',
        timestamp: '2026-06-17T09:15:00Z',
      },
      {
        id: 'm3',
        conversationId: 'conv1',
        senderId: 'u3',
        text: 'Je confirme, je passerai sur site cet après-midi pour vérifier l\'avancement.',
        timestamp: '2026-06-17T10:00:00Z',
      },
      {
        id: 'm4',
        conversationId: 'conv2',
        senderId: 'u1',
        text: 'Chrinovic, peux-tu me préparer le rapport financier du mois ?',
        timestamp: '2026-06-18T07:45:00Z',
      },
      {
        id: 'm5',
        conversationId: 'conv2',
        senderId: 'u3',
        text: 'Bien sûr, je vous l\'envoie avant midi.',
        timestamp: '2026-06-18T08:00:00Z',
      },
      {
        id: 'm6',
        conversationId: 'conv3',
        senderId: 'u4',
        text: 'Les calculs de structure pour l\'entrepôt de Lubumbashi sont terminés.',
        timestamp: '2026-06-16T14:30:00Z',
      },
      {
        id: 'm7',
        conversationId: 'conv3',
        senderId: 'u1',
        text: 'Parfait Grace, peux-tu les partager avec l\'équipe ?',
        timestamp: '2026-06-16T15:00:00Z',
      },
    ];
    localStorage.setItem('ibg_messages', JSON.stringify(messages));

    // --- Conversations ---
    const conversations = [
      {
        id: 'conv1',
        participants: ['u1', 'u2', 'u3'],
        name: 'Équipe Projets',
        lastMessage: 'Je confirme, je passerai sur site cet après-midi',
        lastTimestamp: '2026-06-17T10:00:00Z',
        unread: { u1: 0, u2: 1, u3: 0 },
      },
      {
        id: 'conv2',
        participants: ['u1', 'u3'],
        name: 'Discussion Finances',
        lastMessage: 'Bien sûr, je vous l\'envoie avant midi.',
        lastTimestamp: '2026-06-18T08:00:00Z',
        unread: { u1: 0, u3: 0 },
      },
      {
        id: 'conv3',
        participants: ['u1', 'u4'],
        name: 'Discussion Technique',
        lastMessage: 'Parfait Grace, peux-tu les partager avec l\'équipe ?',
        lastTimestamp: '2026-06-16T15:00:00Z',
        unread: { u1: 0, u4: 2 },
      },
    ];
    localStorage.setItem('ibg_conversations', JSON.stringify(conversations));

    // --- Calendar Events ---
    const events = [
      {
        id: 'ev1',
        title: 'Réunion chantier Goma',
        date: '2026-06-22',
        time: '09:00',
        type: 'meeting',
        description: 'Réunion d\'avancement avec l\'équipe de l\'Hôtel Lac Kivu',
        projectId: 'p1',
      },
      {
        id: 'ev2',
        title: 'Livraison matériaux Bukavu',
        date: '2026-06-23',
        time: '10:30',
        type: 'construction',
        description: 'Livraison de ciment et acier pour le chantier',
        projectId: 'p2',
      },
      {
        id: 'ev3',
        title: 'Date limite rapport financier',
        date: '2026-06-25',
        time: '17:00',
        type: 'deadline',
        description: 'Soumission du rapport financier mensuel',
        projectId: null,
      },
      {
        id: 'ev4',
        title: 'Visite client - Kinshasa',
        date: '2026-06-26',
        time: '14:00',
        type: 'meeting',
        description: 'Visite du chantier avec le client Banque Centrale',
        projectId: 'p3',
      },
      {
        id: 'ev5',
        title: 'Début fondations Lubumbashi',
        date: '2026-07-01',
        time: '07:00',
        type: 'construction',
        description: 'Début des travaux de fondation pour l\'entrepôt',
        projectId: 'p4',
      },
      {
        id: 'ev6',
        title: 'Réunion équipe marketing',
        date: '2026-06-20',
        time: '11:00',
        type: 'meeting',
        description: 'Stratégie de communication Q3 2026',
        projectId: null,
      },
    ];
    localStorage.setItem('ibg_events', JSON.stringify(events));

    // --- Notifications ---
    const notifications = [
      {
        id: 'n1',
        userId: 'u1',
        type: 'project',
        text: 'Le chantier de Goma a atteint 62% d\'avancement.',
        timestamp: '2026-06-18T09:00:00Z',
        read: false,
        link: '#projects',
      },
      {
        id: 'n2',
        userId: 'u1',
        type: 'message',
        text: 'Nouveau message de Chrinovic dans Discussion Finances.',
        timestamp: '2026-06-18T08:00:00Z',
        read: false,
        link: '#messages',
      },
      {
        id: 'n3',
        userId: 'u1',
        type: 'deadline',
        text: 'Rappel : Rapport financier à soumettre avant le 25 juin.',
        timestamp: '2026-06-18T07:00:00Z',
        read: true,
        link: '#calendar',
      },
      {
        id: 'n4',
        userId: 'u1',
        type: 'employee',
        text: 'L\'employé Paul Mbaya est passé en statut inactif.',
        timestamp: '2026-06-15T16:00:00Z',
        read: true,
        link: '#employees',
      },
    ];
    localStorage.setItem('ibg_notifications', JSON.stringify(notifications));
  },

  // ---- Generic CRUD ----

  /** Get all items from a store */
  getAll(store) {
    const data = localStorage.getItem(store);
    return data ? JSON.parse(data) : [];
  },

  /** Get single item by id */
  getById(store, id) {
    const items = this.getAll(store);
    return items.find(item => item.id === id) || null;
  },

  /** Create a new item */
  create(store, item) {
    const items = this.getAll(store);
    item.id = this.genId();
    items.push(item);
    localStorage.setItem(store, JSON.stringify(items));
    return item;
  },

  /** Update an item by id */
  update(store, id, updates) {
    const items = this.getAll(store);
    const index = items.findIndex(item => item.id === id);
    if (index === -1) return null;
    items[index] = { ...items[index], ...updates };
    localStorage.setItem(store, JSON.stringify(items));
    return items[index];
  },

  /** Delete an item by id */
  delete(store, id) {
    const items = this.getAll(store);
    const filtered = items.filter(item => item.id !== id);
    if (filtered.length === items.length) return false;
    localStorage.setItem(store, JSON.stringify(filtered));
    return true;
  },

  /** Get count of items */
  count(store) {
    return this.getAll(store).length;
  },

  /** Get sum of a numeric field */
  sum(store, field) {
    const items = this.getAll(store);
    return items.reduce((acc, item) => acc + (Number(item[field]) || 0), 0);
  },

  /** Filter items by a predicate */
  filter(store, predicate) {
    return this.getAll(store).filter(predicate);
  },

  // ---- Specific helpers ----

  /** Get projects for a specific client */
  getClientProjects(clientId) {
    return this.filter('ibg_projects', p => p.clientId === clientId);
  },

  /** Get employee count by status */
  countEmployeesByStatus(status) {
    return this.filter('ibg_employees', e => e.status === status).length;
  },

  /** Get projects by status */
  countProjectsByStatus(status) {
    return this.filter('ibg_projects', p => p.status === status).length;
  },

  /** Calculate total budget */
  getTotalBudget() {
    return this.sum('ibg_projects', 'budget');
  },

  /** Calculate total spent */
  getTotalSpent() {
    return this.sum('ibg_projects', 'spent');
  },

  /** Get unread notifications for user */
  getUnreadNotifications(userId) {
    return this.filter('ibg_notifications', n => n.userId === userId && !n.read);
  },

  /** Get unread message count for user */
  getUnreadMessageCount(userId) {
    const conversations = this.getAll('ibg_conversations');
    let count = 0;
    conversations.forEach(conv => {
      if (conv.unread && conv.unread[userId]) {
        count += conv.unread[userId];
      }
    });
    return count;
  },

  /** Add a notification */
  addNotification(userId, type, text, link) {
    const notifications = this.getAll('ibg_notifications');
    const notif = {
      id: this.genId(),
      userId,
      type,
      text,
      timestamp: new Date().toISOString(),
      read: false,
      link: link || '#',
    };
    notifications.unshift(notif);
    localStorage.setItem('ibg_notifications', JSON.stringify(notifications));
    return notif;
  },

  /** Mark notification as read */
  markNotifRead(notifId) {
    return this.update('ibg_notifications', notifId, { read: true });
  },

  /** Mark all notifications as read for user */
  markAllNotifsRead(userId) {
    const notifs = this.getAll('ibg_notifications');
    const updated = notifs.map(n => {
      if (n.userId === userId && !n.read) {
        return { ...n, read: true };
      }
      return n;
    });
    localStorage.setItem('ibg_notifications', JSON.stringify(updated));
  },
};

// Initialize database on load
DB.init();