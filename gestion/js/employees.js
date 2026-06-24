/* ==========================================================
   Imperial Building Group - Employees Management (employees.js)
   ========================================================== */

const Employees = {
  render() {
    const employees = DB.getAll('ibg_employees');
    const active = employees.filter(e => e.status === 'active').length;
    const payroll = employees.filter(e => e.status === 'active').reduce((a, e) => a + (e.salary || 0), 0);

    const html = `
      <div class="employees-page">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">
          <p style="color:var(--muted);margin:0;">${employees.length} employé(s) · <strong>${active}</strong> actifs · Masse salariale: <strong>$${this.formatNumber(payroll)}</strong>/mois</p>
          <button class="btn btn-primary" id="add-employee-btn"><i class="fas fa-plus"></i> Nouvel employé</button>
        </div>
        <div class="card">
          <div class="card-body" style="padding:0;">
            <div class="table-container">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Rôle</th>
                    <th>Contact</th>
                    <th>Salaire</th>
                    <th>Statut</th>
                    <th>Date d'embauche</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  ${employees.map(e => `
                    <tr>
                      <td><strong>${e.name}</strong></td>
                      <td>${e.role}</td>
                      <td>${e.email}<br /><span style="font-size:0.75rem;color:var(--muted);">${e.phone}</span></td>
                      <td>$${this.formatNumber(e.salary)}</td>
                      <td><span class="status-badge ${e.status}">${e.status === 'active' ? 'Actif' : 'Inactif'}</span></td>
                      <td>${e.hireDate}</td>
                      <td>
                        <div class="actions">
                          <button class="btn-sm edit" onclick="Employees.edit('${e.id}')"><i class="fas fa-edit"></i></button>
                          <button class="btn-sm delete" onclick="Employees.delete('${e.id}')"><i class="fas fa-trash"></i></button>
                        </div>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    `;

    return html;
  },

  edit(id) {
    const e = id ? DB.getById('ibg_employees', id) : null;
    const isEdit = !!e;

    const html = `
      <div class="modal-overlay" onclick="if(event.target===this)this.remove();">
        <div class="modal">
          <div class="modal-header">
            <h3>${isEdit ? 'Modifier l\'employé' : 'Nouvel employé'}</h3>
            <button class="modal-close" onclick="this.closest('.modal-overlay').remove()"><i class="fas fa-times"></i></button>
          </div>
          <div class="modal-body">
            <form id="employee-form">
              <div class="form-group">
                <label>Nom complet *</label>
                <input type="text" name="name" value="${isEdit ? e.name : ''}" required />
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>Rôle *</label>
                  <select name="role" required>
                    <option value="">— Sélectionnez —</option>
                    <option value="Chef de Chantier" ${isEdit && e.role === 'Chef de Chantier' ? 'selected' : ''}>Chef de Chantier</option>
                    <option value="Chef d'Équipe" ${isEdit && e.role === "Chef d'Équipe" ? 'selected' : ''}>Chef d'Équipe</option>
                    <option value="Architecte" ${isEdit && e.role === 'Architecte' ? 'selected' : ''}>Architecte</option>
                    <option value="Ingénieur" ${isEdit && e.role === 'Ingénieur' ? 'selected' : ''}>Ingénieur</option>
                    <option value="Designer d'Intérieur" ${isEdit && e.role === "Designer d'Intérieur" ? 'selected' : ''}>Designer d'Intérieur</option>
                    <option value="Maçon" ${isEdit && e.role === 'Maçon' ? 'selected' : ''}>Maçon</option>
                    <option value="Électricien" ${isEdit && e.role === 'Électricien' ? 'selected' : ''}>Électricien</option>
                    <option value="Plombier" ${isEdit && e.role === 'Plombier' ? 'selected' : ''}>Plombier</option>
                    <option value="Chef de Projet" ${isEdit && e.role === 'Chef de Projet' ? 'selected' : ''}>Chef de Projet</option>
                    <option value="Responsable RH" ${isEdit && e.role === 'Responsable RH' ? 'selected' : ''}>Responsable RH</option>
                    <option value="Commercial" ${isEdit && e.role === 'Commercial' ? 'selected' : ''}>Commercial</option>
                    <option value="Autre" ${isEdit && e.role === 'Autre' ? 'selected' : ''}>Autre</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Salaire ($)</label>
                  <input type="number" name="salary" value="${isEdit ? e.salary : ''}" min="0" />
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>Email</label>
                  <input type="email" name="email" value="${isEdit ? e.email : ''}" />
                </div>
                <div class="form-group">
                  <label>Téléphone</label>
                  <input type="text" name="phone" value="${isEdit ? e.phone : ''}" />
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>Statut</label>
                  <select name="status">
                    <option value="active" ${isEdit && e.status === 'active' ? 'selected' : ''}>Actif</option>
                    <option value="inactive" ${isEdit && e.status === 'inactive' ? 'selected' : ''}>Inactif</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Date d'embauche</label>
                  <input type="date" name="hireDate" value="${isEdit ? e.hireDate : ''}" />
                </div>
              </div>
              <input type="hidden" name="id" value="${isEdit ? e.id : ''}" />
            </form>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" onclick="this.closest('.modal-overlay').remove()">Annuler</button>
            <button class="btn btn-primary" onclick="Employees.save()">${isEdit ? 'Enregistrer' : 'Créer'}</button>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', html);
  },

  save() {
    const form = document.getElementById('employee-form');
    if (!form) return;
    const data = new FormData(form);
    const id = data.get('id');

    const empData = {
      name: data.get('name'),
      role: data.get('role'),
      email: data.get('email') || '',
      phone: data.get('phone') || '',
      salary: Number(data.get('salary')) || 0,
      status: data.get('status') || 'active',
      hireDate: data.get('hireDate') || '',
      projects: id ? DB.getById('ibg_employees', id)?.projects || [] : [],
    };

    if (id) {
      DB.update('ibg_employees', id, empData);
    } else {
      DB.create('ibg_employees', empData);
    }

    document.querySelector('.modal-overlay')?.remove();
    App.navigate('employees');
  },

  delete(id) {
    const e = DB.getById('ibg_employees', id);
    if (!e) return;
    if (!confirm(`Supprimer l'employé "${e.name}" ?`)) return;
    DB.delete('ibg_employees', id);
    App.navigate('employees');
  },

  formatNumber(num) {
    if (!num && num !== 0) return '0';
    return Number(num).toLocaleString('fr-FR');
  },
};