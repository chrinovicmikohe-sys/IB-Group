/* ==========================================================
   Imperial Building Group - Clients Management (clients.js)
   ========================================================== */

const Clients = {
  render() {
    const clients = DB.getAll('ibg_clients');
    const projects = DB.getAll('ibg_projects');

    const html = `
      <div class="clients-page">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">
          <p style="color:var(--muted);margin:0;">${clients.length} client(s)</p>
          <button class="btn btn-primary" id="add-client-btn"><i class="fas fa-plus"></i> Nouveau client</button>
        </div>
        <div class="card">
          <div class="card-body" style="padding:0;">
            <div class="table-container">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Client</th>
                    <th>Contact</th>
                    <th>Type</th>
                    <th>Ville</th>
                    <th>Email</th>
                    <th>Projets</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  ${clients.map(c => {
                    const clientProjects = projects.filter(p => p.clientId === c.id);
                    return `
                      <tr>
                        <td><strong>${c.name}</strong></td>
                        <td>${c.contact}</td>
                        <td>${this.typeLabel(c.type)}</td>
                        <td>${c.city}</td>
                        <td>${c.email}</td>
                        <td>${clientProjects.length} projet(s)</td>
                        <td>
                          <div class="actions">
                            <button class="btn-sm edit" onclick="Clients.edit('${c.id}')"><i class="fas fa-edit"></i></button>
                            <button class="btn-sm delete" onclick="Clients.delete('${c.id}')"><i class="fas fa-trash"></i></button>
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

  edit(id) {
    const c = id ? DB.getById('ibg_clients', id) : null;
    const isEdit = !!c;

    const html = `
      <div class="modal-overlay" onclick="if(event.target===this)this.remove();">
        <div class="modal">
          <div class="modal-header">
            <h3>${isEdit ? 'Modifier le client' : 'Nouveau client'}</h3>
            <button class="modal-close" onclick="this.closest('.modal-overlay').remove()"><i class="fas fa-times"></i></button>
          </div>
          <div class="modal-body">
            <form id="client-form">
              <div class="form-group">
                <label>Nom / Entreprise *</label>
                <input type="text" name="name" value="${isEdit ? c.name : ''}" required />
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>Personne de contact</label>
                  <input type="text" name="contact" value="${isEdit ? c.contact : ''}" />
                </div>
                <div class="form-group">
                  <label>Type</label>
                  <select name="type">
                    <option value="particulier" ${isEdit && c.type === 'particulier' ? 'selected' : ''}>Particulier</option>
                    <option value="entreprise" ${isEdit && c.type === 'entreprise' ? 'selected' : ''}>Entreprise</option>
                    <option value="institution" ${isEdit && c.type === 'institution' ? 'selected' : ''}>Institution</option>
                  </select>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>Email</label>
                  <input type="email" name="email" value="${isEdit ? c.email : ''}" />
                </div>
                <div class="form-group">
                  <label>Téléphone</label>
                  <input type="text" name="phone" value="${isEdit ? c.phone : ''}" />
                </div>
              </div>
              <div class="form-group">
                <label>Ville</label>
                <input type="text" name="city" value="${isEdit ? c.city : ''}" />
              </div>
              <input type="hidden" name="id" value="${isEdit ? c.id : ''}" />
            </form>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" onclick="this.closest('.modal-overlay').remove()">Annuler</button>
            <button class="btn btn-primary" onclick="Clients.save()">${isEdit ? 'Enregistrer' : 'Créer'}</button>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', html);
  },

  save() {
    const form = document.getElementById('client-form');
    if (!form) return;
    const data = new FormData(form);
    const id = data.get('id');

    const clientData = {
      name: data.get('name'),
      contact: data.get('contact') || '',
      type: data.get('type') || 'particulier',
      email: data.get('email') || '',
      phone: data.get('phone') || '',
      city: data.get('city') || '',
    };

    if (id) {
      DB.update('ibg_clients', id, clientData);
    } else {
      clientData.createdAt = new Date().toISOString().split('T')[0];
      clientData.projects = [];
      DB.create('ibg_clients', clientData);
    }

    document.querySelector('.modal-overlay')?.remove();
    App.navigate('clients');
  },

  delete(id) {
    const c = DB.getById('ibg_clients', id);
    if (!c) return;
    const projectCount = DB.filter('ibg_projects', p => p.clientId === id).length;
    if (projectCount > 0) {
      alert(`Impossible de supprimer "${c.name}" car ${projectCount} projet(s) y sont associés.`);
      return;
    }
    if (!confirm(`Supprimer le client "${c.name}" ?`)) return;
    DB.delete('ibg_clients', id);
    App.navigate('clients');
  },

  typeLabel(type) {
    const labels = { particulier: 'Particulier', entreprise: 'Entreprise', institution: 'Institution' };
    return labels[type] || type;
  },
};