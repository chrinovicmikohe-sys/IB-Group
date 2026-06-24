/* ==========================================================
   Imperial Building Group - Projects Management (projects.js)
   ========================================================== */

const Projects = {
  /** Render the projects page */
  render() {
    const projects = DB.getAll('ibg_projects');
    const clients = DB.getAll('ibg_clients');
    const employees = DB.getAll('ibg_employees');

    const html = `
      <div class="projects-page">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">
          <p style="color:var(--muted);margin:0;">${projects.length} projet(s) · <strong>$${this.formatNumber(DB.getTotalBudget())}</strong> budget total</p>
          <button class="btn btn-primary" id="add-project-btn"><i class="fas fa-plus"></i> Nouveau projet</button>
        </div>
        <div class="card">
          <div class="card-body" style="padding:0;">
            <div class="table-container">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Projet</th>
                    <th>Client</th>
                    <th>Localisation</th>
                    <th>Budget</th>
                    <th>Dépensé</th>
                    <th>Statut</th>
                    <th>Progrès</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  ${projects.map(p => {
                    const client = clients.find(c => c.id === p.clientId);
                    return `
                      <tr>
                        <td><strong>${p.name}</strong><br /><span style="font-size:0.75rem;color:var(--muted);">${p.type}</span></td>
                        <td>${client ? client.name : '—'}</td>
                        <td>${p.location}</td>
                        <td>$${this.formatNumber(p.budget)}</td>
                        <td>$${this.formatNumber(p.spent)}</td>
                        <td><span class="status-badge ${p.status}">${this.statusLabel(p.status)}</span></td>
                        <td>
                          <div style="display:flex;align-items:center;gap:0.5rem;min-width:100px;">
                            <div style="flex:1;height:6px;background:var(--border,#e0e0e0);border-radius:3px;overflow:hidden;">
                              <div style="height:100%;width:${p.progress}%;background:${p.progress === 100 ? '#388e3c' : '#e94560'};border-radius:3px;"></div>
                            </div>
                            <span style="font-size:0.75rem;font-weight:600;">${p.progress}%</span>
                          </div>
                        </td>
                        <td>
                          <div class="actions">
                            <button class="btn-sm view" onclick="Projects.view('${p.id}')"><i class="fas fa-eye"></i></button>
                            <button class="btn-sm edit" onclick="Projects.edit('${p.id}')"><i class="fas fa-edit"></i></button>
                            <button class="btn-sm delete" onclick="Projects.delete('${p.id}')"><i class="fas fa-trash"></i></button>
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

  /** Show project details modal */
  view(id) {
    const p = DB.getById('ibg_projects', id);
    if (!p) return;
    const client = DB.getById('ibg_clients', p.clientId);
    const employees = DB.getAll('ibg_employees');
    const team = employees.filter(e => p.team && p.team.includes(e.id));

    const html = `
      <div class="modal-overlay" onclick="if(event.target===this)this.remove();">
        <div class="modal">
          <div class="modal-header">
            <h3>${p.name}</h3>
            <button class="modal-close" onclick="this.closest('.modal-overlay').remove()"><i class="fas fa-times"></i></button>
          </div>
          <div class="modal-body">
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;">
              <div><strong>Client :</strong> ${client ? client.name : '—'}</div>
              <div><strong>Localisation :</strong> ${p.location}</div>
              <div><strong>Budget :</strong> $${this.formatNumber(p.budget)}</div>
              <div><strong>Dépensé :</strong> $${this.formatNumber(p.spent)}</div>
              <div><strong>Début :</strong> ${p.startDate}</div>
              <div><strong>Fin :</strong> ${p.endDate}</div>
              <div><strong>Statut :</strong> <span class="status-badge ${p.status}">${this.statusLabel(p.status)}</span></div>
              <div><strong>Priorité :</strong> ${p.priority}</div>
            </div>
            <div style="margin-top:1rem;">
              <strong>Description :</strong>
              <p style="color:var(--muted);">${p.description}</p>
            </div>
            <div style="margin-top:1rem;">
              <strong>Progression :</strong>
              <div style="display:flex;align-items:center;gap:0.75rem;margin-top:0.4rem;">
                <div style="flex:1;height:10px;background:var(--border,#e0e0e0);border-radius:5px;overflow:hidden;">
                  <div style="height:100%;width:${p.progress}%;background:${p.progress === 100 ? '#388e3c' : '#e94560'};border-radius:5px;"></div>
                </div>
                <span style="font-weight:700;">${p.progress}%</span>
              </div>
            </div>
            <div style="margin-top:1rem;">
              <strong>Équipe (${team.length}) :</strong>
              <div style="display:flex;flex-wrap:wrap;gap:0.5rem;margin-top:0.4rem;">
                ${team.map(e => `<span style="padding:0.25rem 0.6rem;background:var(--hover-bg,#f0f0f0);border-radius:20px;font-size:0.8rem;">${e.name}</span>`).join('')}
                ${team.length === 0 ? '<span style="color:var(--muted);font-size:0.85rem;">Aucun membre assigné</span>' : ''}
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" onclick="this.closest('.modal-overlay').remove()">Fermer</button>
            <button class="btn btn-primary" onclick="this.closest('.modal-overlay').remove();Projects.edit('${p.id}');">Modifier</button>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', html);
  },

  /** Show edit/create modal */
  edit(id) {
    const p = id ? DB.getById('ibg_projects', id) : null;
    const clients = DB.getAll('ibg_clients');
    const employees = DB.getAll('ibg_employees');
    const isEdit = !!p;

    const html = `
      <div class="modal-overlay" id="project-modal" onclick="if(event.target===this)this.remove();">
        <div class="modal">
          <div class="modal-header">
            <h3>${isEdit ? 'Modifier le projet' : 'Nouveau projet'}</h3>
            <button class="modal-close" onclick="this.closest('.modal-overlay').remove()"><i class="fas fa-times"></i></button>
          </div>
          <div class="modal-body">
            <form id="project-form">
              <div class="form-group">
                <label>Nom du projet *</label>
                <input type="text" name="name" value="${isEdit ? p.name : ''}" required />
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>Type *</label>
                  <select name="type" required>
                    <option value="construction" ${isEdit && p.type === 'construction' ? 'selected' : ''}>Construction</option>
                    <option value="renovation" ${isEdit && p.type === 'renovation' ? 'selected' : ''}>Rénovation</option>
                    <option value="amenagement" ${isEdit && p.type === 'amenagement' ? 'selected' : ''}>Aménagement</option>
                    <option value="extension" ${isEdit && p.type === 'extension' ? 'selected' : ''}>Extension</option>
                    <option value="paysager" ${isEdit && p.type === 'paysager' ? 'selected' : ''}>Paysager</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Statut *</label>
                  <select name="status" required>
                    <option value="planned" ${isEdit && p.status === 'planned' ? 'selected' : ''}>Planifié</option>
                    <option value="in-progress" ${isEdit && p.status === 'in-progress' ? 'selected' : ''}>En cours</option>
                    <option value="completed" ${isEdit && p.status === 'completed' ? 'selected' : ''}>Terminé</option>
                    <option value="pending" ${isEdit && p.status === 'pending' ? 'selected' : ''}>En attente</option>
                  </select>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>Client</label>
                  <select name="clientId">
                    <option value="">— Aucun —</option>
                    ${clients.map(c => `<option value="${c.id}" ${isEdit && p.clientId === c.id ? 'selected' : ''}>${c.name}</option>`).join('')}
                  </select>
                </div>
                <div class="form-group">
                  <label>Localisation *</label>
                  <input type="text" name="location" value="${isEdit ? p.location : ''}" required />
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>Budget ($) *</label>
                  <input type="number" name="budget" value="${isEdit ? p.budget : ''}" min="0" required />
                </div>
                <div class="form-group">
                  <label>Dépensé ($)</label>
                  <input type="number" name="spent" value="${isEdit ? p.spent : '0'}" min="0" />
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>Date de début</label>
                  <input type="date" name="startDate" value="${isEdit ? p.startDate : ''}" />
                </div>
                <div class="form-group">
                  <label>Date de fin</label>
                  <input type="date" name="endDate" value="${isEdit ? p.endDate : ''}" />
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>Priorité</label>
                  <select name="priority">
                    <option value="basse" ${isEdit && p.priority === 'basse' ? 'selected' : ''}>Basse</option>
                    <option value="moyenne" ${isEdit && p.priority === 'moyenne' ? 'selected' : ''}>Moyenne</option>
                    <option value="haute" ${isEdit && p.priority === 'haute' ? 'selected' : ''}>Haute</option>
                    <option value="critique" ${isEdit && p.priority === 'critique' ? 'selected' : ''}>Critique</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Progression (%)</label>
                  <input type="number" name="progress" value="${isEdit ? p.progress : '0'}" min="0" max="100" />
                </div>
              </div>
              <div class="form-group">
                <label>Équipe</label>
                <select name="team" multiple style="height:100px;">
                  ${employees.filter(e => e.status === 'active').map(e => `
                    <option value="${e.id}" ${isEdit && p.team && p.team.includes(e.id) ? 'selected' : ''}>${e.name} — ${e.role}</option>
                  `).join('')}
                </select>
                <span style="font-size:0.75rem;color:var(--muted);">Maintenez Ctrl pour sélectionner plusieurs</span>
              </div>
              <div class="form-group">
                <label>Description</label>
                <textarea name="description" rows="3">${isEdit ? p.description : ''}</textarea>
              </div>
              <input type="hidden" name="id" value="${isEdit ? p.id : ''}" />
            </form>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" onclick="this.closest('.modal-overlay').remove()">Annuler</button>
            <button class="btn btn-primary" onclick="Projects.save()">${isEdit ? 'Enregistrer' : 'Créer'}</button>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', html);
  },

  /** Save project from form */
  save() {
    const form = document.getElementById('project-form');
    if (!form) return;
    const data = new FormData(form);
    const id = data.get('id');
    const teamSelect = form.querySelector('select[name="team"]');
    const team = Array.from(teamSelect.selectedOptions).map(opt => opt.value);

    const projectData = {
      name: data.get('name'),
      type: data.get('type'),
      status: data.get('status'),
      clientId: data.get('clientId') || null,
      location: data.get('location'),
      budget: Number(data.get('budget')) || 0,
      spent: Number(data.get('spent')) || 0,
      startDate: data.get('startDate') || '',
      endDate: data.get('endDate') || '',
      priority: data.get('priority') || 'moyenne',
      progress: Number(data.get('progress')) || 0,
      description: data.get('description') || '',
      team: team,
    };

    if (id) {
      DB.update('ibg_projects', id, projectData);
    } else {
      projectData.createdAt = new Date().toISOString();
      DB.create('ibg_projects', projectData);
    }

    document.querySelector('.modal-overlay')?.remove();
    App.navigate('projects');
  },

  /** Delete a project */
  delete(id) {
    const p = DB.getById('ibg_projects', id);
    if (!p) return;
    if (!confirm(`Supprimer le projet "${p.name}" ? Cette action est irréversible.`)) return;
    DB.delete('ibg_projects', id);
    App.navigate('projects');
  },

  /** Format number */
  formatNumber(num) {
    if (!num && num !== 0) return '0';
    return Number(num).toLocaleString('fr-FR');
  },

  /** Status label */
  statusLabel(status) {
    const labels = {
      'in-progress': 'En cours',
      'completed': 'Terminé',
      'planned': 'Planifié',
      'pending': 'En attente',
    };
    return labels[status] || status;
  },
};