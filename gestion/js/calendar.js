/* ==========================================================
   Imperial Building Group - Calendar & Planning (calendar.js)
   ========================================================== */

const Calendar = {
  currentMonth: new Date().getMonth(),
  currentYear: new Date().getFullYear(),

  render() {
    return this.renderMonth(this.currentMonth, this.currentYear);
  },

  renderMonth(month, year) {
    const events = DB.getAll('ibg_events');
    const projects = DB.getAll('ibg_projects');
    const firstDay = new Date(year, month, 1).getDay(); // 0=Sun
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    const dayHeaders = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    // Build calendar days
    const days = [];

    // Previous month days (to fill first row)
    const startDay = firstDay === 0 ? 6 : firstDay - 1; // Monday first
    for (let i = startDay - 1; i >= 0; i--) {
      days.push({ day: daysInPrevMonth - i, otherMonth: true, month: month - 1, year: month === 0 ? year - 1 : year });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      const dayEvents = events.filter(e => e.date === dateStr);
      days.push({
        day: i,
        otherMonth: false,
        month,
        year,
        dateStr,
        isToday: dateStr === todayStr,
        events: dayEvents,
      });
    }

    // Next month days (to fill last row)
    const remaining = 7 - (days.length % 7);
    if (remaining < 7) {
      for (let i = 1; i <= remaining; i++) {
        days.push({ day: i, otherMonth: true, month: month + 1, year: month === 11 ? year + 1 : year });
      }
    }

    // Get events for this month grouped by date
    const dateStrStart = `${year}-${String(month + 1).padStart(2, '0')}-01`;
    const dateStrEnd = `${year}-${String(month + 1).padStart(2, '0')}-${String(daysInMonth).padStart(2, '0')}`;
    const monthEvents = events.filter(e => e.date >= dateStrStart && e.date <= dateStrEnd);

    const html = `
      <div class="calendar-page">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">
          <p style="color:var(--muted);margin:0;">${monthEvents.length} événement(s) ce mois-ci</p>
          <button class="btn btn-primary" onclick="Calendar.addEvent()"><i class="fas fa-plus"></i> Nouvel événement</button>
        </div>
        <div class="calendar-container">
          <div class="calendar-header">
            <h3>${monthNames[month]} ${year}</h3>
            <div class="calendar-nav">
              <button onclick="Calendar.navigate(-1)"><i class="fas fa-chevron-left"></i></button>
              <button onclick="Calendar.navigateToToday()">Aujourd'hui</button>
              <button onclick="Calendar.navigate(1)"><i class="fas fa-chevron-right"></i></button>
            </div>
          </div>
          <div class="calendar-grid">
            ${dayHeaders.map(h => `<div class="calendar-day-header">${h}</div>`).join('')}
            ${days.map(d => `
              <div class="calendar-day ${d.otherMonth ? 'other-month' : ''} ${d.isToday ? 'today' : ''}" 
                   ${!d.otherMonth ? `onclick="Calendar.viewDay('${d.dateStr}')"` : ''}>
                <div class="day-number">${d.day}</div>
                ${(d.events || []).slice(0, 3).map(e => {
                  const p = e.projectId ? projects.find(proj => proj.id === e.projectId) : null;
                  return `
                    <div class="calendar-event ${e.type}" title="${e.title}${p ? ' - ' + p.name : ''}">
                      ${e.time ? e.time.substring(0, 5) : ''} ${e.title}
                    </div>
                  `;
                }).join('')}
                ${(d.events || []).length > 3 ? `<div style="font-size:0.7rem;color:var(--muted);padding-left:0.25rem;">+${d.events.length - 3} autre(s)</div>` : ''}
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Upcoming Events -->
        <div class="card" style="margin-top:1.5rem;">
          <div class="card-header">
            <h3>Événements à venir</h3>
          </div>
          <div class="card-body" style="padding:0;">
            <div class="table-container">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Titre</th>
                    <th>Date</th>
                    <th>Heure</th>
                    <th>Type</th>
                    <th>Projet</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  ${events.sort((a, b) => a.date.localeCompare(b.date) || (a.time || '').localeCompare(b.time || '')).slice(0, 10).map(e => {
                    const p = e.projectId ? projects.find(proj => proj.id === e.projectId) : null;
                    const eventDate = new Date(e.date + 'T' + (e.time || '00:00'));
                    return `
                      <tr>
                        <td><strong>${e.title}</strong></td>
                        <td>${eventDate.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                        <td>${e.time || '—'}</td>
                        <td><span class="status-badge ${e.type}">${this.typeLabel(e.type)}</span></td>
                        <td>${p ? p.name : '—'}</td>
                        <td>
                          <div class="actions">
                            <button class="btn-sm edit" onclick="Calendar.editEvent('${e.id}')"><i class="fas fa-edit"></i></button>
                            <button class="btn-sm delete" onclick="Calendar.deleteEvent('${e.id}')"><i class="fas fa-trash"></i></button>
                          </div>
                        </td>
                      </tr>
                    `;
                  }).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    `;

    return html;
  },

  navigate(delta) {
    this.currentMonth += delta;
    if (this.currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.currentYear++;
    }
    App.navigate('calendar');
  },

  navigateToToday() {
    const now = new Date();
    this.currentMonth = now.getMonth();
    this.currentYear = now.getFullYear();
    App.navigate('calendar');
  },

  viewDay(dateStr) {
    const events = DB.filter('ibg_events', e => e.date === dateStr);
    const date = new Date(dateStr + 'T12:00:00');
    const formatted = date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

    const html = `
      <div class="modal-overlay" onclick="if(event.target===this)this.remove();">
        <div class="modal">
          <div class="modal-header">
            <h3>${formatted}</h3>
            <button class="modal-close" onclick="this.closest('.modal-overlay').remove()"><i class="fas fa-times"></i></button>
          </div>
          <div class="modal-body">
            ${events.length === 0 ? '<p style="color:var(--muted);">Aucun événement ce jour.</p>' : ''}
            ${events.map(e => `
              <div style="display:flex;align-items:center;gap:0.75rem;padding:0.75rem;border-left:3px solid ${this.typeColor(e.type)};background:var(--hover-bg,#f8f8f8);border-radius:var(--radius-sm);margin-bottom:0.5rem;">
                <div style="flex:1;">
                  <strong>${e.title}</strong>
                  <p style="margin:0.2rem 0 0;font-size:0.85rem;color:var(--muted);">${e.description || ''}</p>
                  <div style="margin-top:0.3rem;">
                    <span class="status-badge ${e.type}">${this.typeLabel(e.type)}</span>
                    ${e.time ? `<span style="font-size:0.8rem;color:var(--muted);margin-left:0.5rem;"><i class="far fa-clock"></i> ${e.time}</span>` : ''}
                  </div>
                </div>
                <button class="btn-sm edit" onclick="this.closest('.modal-overlay').remove();Calendar.editEvent('${e.id}');"><i class="fas fa-edit"></i></button>
              </div>
            `).join('')}
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" onclick="this.closest('.modal-overlay').remove()">Fermer</button>
            <button class="btn btn-primary" onclick="this.closest('.modal-overlay').remove();Calendar.addEvent('${dateStr}');">Ajouter un événement</button>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', html);
  },

  addEvent(prefillDate) {
    const projects = DB.getAll('ibg_projects');

    const html = `
      <div class="modal-overlay" onclick="if(event.target===this)this.remove();">
        <div class="modal">
          <div class="modal-header">
            <h3>Nouvel événement</h3>
            <button class="modal-close" onclick="this.closest('.modal-overlay').remove()"><i class="fas fa-times"></i></button>
          </div>
          <div class="modal-body">
            <form id="event-form">
              <div class="form-group">
                <label>Titre *</label>
                <input type="text" name="title" required />
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>Date *</label>
                  <input type="date" name="date" value="${prefillDate || ''}" required />
                </div>
                <div class="form-group">
                  <label>Heure</label>
                  <input type="time" name="time" />
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>Type</label>
                  <select name="type">
                    <option value="meeting">Réunion</option>
                    <option value="construction">Chantier</option>
                    <option value="deadline">Échéance</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Projet lié</label>
                  <select name="projectId">
                    <option value="">— Aucun —</option>
                    ${projects.map(p => `<option value="${p.id}">${p.name}</option>`).join('')}
                  </select>
                </div>
              </div>
              <div class="form-group">
                <label>Description</label>
                <textarea name="description" rows="3"></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" onclick="this.closest('.modal-overlay').remove()">Annuler</button>
            <button class="btn btn-primary" onclick="Calendar.saveEvent()">Créer</button>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', html);
  },

  editEvent(id) {
    const e = DB.getById('ibg_events', id);
    if (!e) return;
    const projects = DB.getAll('ibg_projects');

    const html = `
      <div class="modal-overlay" onclick="if(event.target===this)this.remove();">
        <div class="modal">
          <div class="modal-header">
            <h3>Modifier l'événement</h3>
            <button class="modal-close" onclick="this.closest('.modal-overlay').remove()"><i class="fas fa-times"></i></button>
          </div>
          <div class="modal-body">
            <form id="event-form">
              <div class="form-group">
                <label>Titre *</label>
                <input type="text" name="title" value="${e.title}" required />
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>Date *</label>
                  <input type="date" name="date" value="${e.date}" required />
                </div>
                <div class="form-group">
                  <label>Heure</label>
                  <input type="time" name="time" value="${e.time || ''}" />
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>Type</label>
                  <select name="type">
                    <option value="meeting" ${e.type === 'meeting' ? 'selected' : ''}>Réunion</option>
                    <option value="construction" ${e.type === 'construction' ? 'selected' : ''}>Chantier</option>
                    <option value="deadline" ${e.type === 'deadline' ? 'selected' : ''}>Échéance</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Projet lié</label>
                  <select name="projectId">
                    <option value="">— Aucun —</option>
                    ${projects.map(p => `<option value="${p.id}" ${e.projectId === p.id ? 'selected' : ''}>${p.name}</option>`).join('')}
                  </select>
                </div>
              </div>
              <div class="form-group">
                <label>Description</label>
                <textarea name="description" rows="3">${e.description || ''}</textarea>
              </div>
              <input type="hidden" name="id" value="${e.id}" />
            </form>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" onclick="this.closest('.modal-overlay').remove()">Annuler</button>
            <button class="btn btn-primary" onclick="Calendar.saveEvent()">Enregistrer</button>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', html);
  },

  saveEvent() {
    const form = document.getElementById('event-form');
    if (!form) return;
    const data = new FormData(form);
    const id = data.get('id');

    const eventData = {
      title: data.get('title'),
      date: data.get('date'),
      time: data.get('time') || '',
      type: data.get('type') || 'meeting',
      projectId: data.get('projectId') || null,
      description: data.get('description') || '',
    };

    if (id) {
      DB.update('ibg_events', id, eventData);
    } else {
      DB.create('ibg_events', eventData);
    }

    document.querySelector('.modal-overlay')?.remove();
    Calendar.navigate(0); // Refresh
  },

  deleteEvent(id) {
    if (!confirm('Supprimer cet événement ?')) return;
    DB.delete('ibg_events', id);
    Calendar.navigate(0);
  },

  typeLabel(type) {
    const labels = { meeting: 'Réunion', construction: 'Chantier', deadline: 'Échéance' };
    return labels[type] || type;
  },

  typeColor(type) {
    const colors = { meeting: '#f57c00', construction: '#1976d2', deadline: '#d32f2f' };
    return colors[type] || '#666';
  },
};