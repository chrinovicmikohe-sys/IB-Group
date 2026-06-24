/* ==========================================================
   Imperial Building Group - Dashboard (dashboard.js)
   ========================================================== */

const Dashboard = {
  /** Render the dashboard page */
  render() {
    const projects = DB.getAll('ibg_projects');
    const employees = DB.getAll('ibg_employees');
    const clients = DB.getAll('ibg_clients');

    const totalProjects = projects.length;
    const activeProjects = projects.filter(p => p.status === 'in-progress').length;
    const completedProjects = projects.filter(p => p.status === 'completed').length;
    const totalBudget = projects.reduce((a, p) => a + (p.budget || 0), 0);
    const totalSpent = projects.reduce((a, p) => a + (p.spent || 0), 0);
    const totalEmployees = employees.filter(e => e.status === 'active').length;
    const totalClients = clients.length;
    const totalPayroll = employees.filter(e => e.status === 'active').reduce((a, e) => a + (e.salary || 0), 0);

    // Recent projects
    const recentProjects = [...projects].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);

    // Projects by status for chart
    const statusCounts = {
      'in-progress': projects.filter(p => p.status === 'in-progress').length,
      'completed': projects.filter(p => p.status === 'completed').length,
      'planned': projects.filter(p => p.status === 'planned').length,
      'pending': projects.filter(p => p.status === 'pending').length,
    };

    // Monthly budget data (simulated)
    const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'];
    const budgetData = months.map((m, i) => ({
      month: m,
      budget: Math.round(totalBudget / 6 * (0.7 + Math.random() * 0.6)),
      spent: Math.round(totalSpent / 6 * (0.5 + Math.random() * 0.8)),
    }));

    // Project type breakdown
    const typeCounts = {};
    projects.forEach(p => {
      typeCounts[p.type] = (typeCounts[p.type] || 0) + 1;
    });

    // Employee role breakdown
    const roleCounts = {};
    employees.forEach(e => {
      roleCounts[e.role] = (roleCounts[e.role] || 0) + 1;
    });

    const html = `
      <div class="dashboard-page">
        <!-- KPI Cards -->
        <div class="kpi-grid">
          <div class="kpi-card">
            <div class="kpi-icon blue"><i class="fas fa-building"></i></div>
            <div class="kpi-info">
              <p class="kpi-label">Projets actifs</p>
              <p class="kpi-value">${activeProjects}</p>
              <p class="kpi-change positive">${totalProjects} total</p>
            </div>
          </div>
          <div class="kpi-card">
            <div class="kpi-icon green"><i class="fas fa-check-circle"></i></div>
            <div class="kpi-info">
              <p class="kpi-label">Projets terminés</p>
              <p class="kpi-value">${completedProjects}</p>
              <p class="kpi-change positive">${totalProjects > 0 ? Math.round(completedProjects / totalProjects * 100) : 0}% taux</p>
            </div>
          </div>
          <div class="kpi-card">
            <div class="kpi-icon orange"><i class="fas fa-users"></i></div>
            <div class="kpi-info">
              <p class="kpi-label">Employés actifs</p>
              <p class="kpi-value">${totalEmployees}</p>
              <p class="kpi-change positive">${employees.length} total</p>
            </div>
          </div>
          <div class="kpi-card">
            <div class="kpi-icon purple"><i class="fas fa-handshake"></i></div>
            <div class="kpi-info">
              <p class="kpi-label">Clients</p>
              <p class="kpi-value">${totalClients}</p>
              <p class="kpi-change positive">+${clients.filter(c => new Date(c.createdAt) > new Date('2024-06-01')).length} cette année</p>
            </div>
          </div>
          <div class="kpi-card">
            <div class="kpi-icon teal"><i class="fas fa-coins"></i></div>
            <div class="kpi-info">
              <p class="kpi-label">Budget total</p>
              <p class="kpi-value">$${this.formatNumber(totalBudget)}</p>
              <p class="kpi-change">Dépensé: $${this.formatNumber(totalSpent)}</p>
            </div>
          </div>
          <div class="kpi-card">
            <div class="kpi-icon red"><i class="fas fa-money-bill-wave"></i></div>
            <div class="kpi-info">
              <p class="kpi-label">Masse salariale</p>
              <p class="kpi-value">$${this.formatNumber(totalPayroll)}</p>
              <p class="kpi-change">/ mois</p>
            </div>
          </div>
        </div>

        <div class="grid-2">
          <!-- Budget Chart -->
          <div class="card">
            <div class="card-header">
              <h3>Budget vs Dépenses (6 mois)</h3>
            </div>
            <div class="card-body">
              <div class="chart-bar" id="budget-chart">
                ${budgetData.map(d => `
                  <div class="chart-bar-item">
                    <span class="chart-bar-value">$${this.formatNumber(d.spent)}</span>
                    <div class="chart-bar-fill" style="height:${Math.min(100, d.spent / Math.max(...budgetData.map(x => x.spent)) * 180 + 20)}px;background:var(--accent,#e94560);"></div>
                    <div class="chart-bar-fill" style="height:${Math.min(100, d.budget / Math.max(...budgetData.map(x => x.budget)) * 180 + 20)}px;background:#1976d2;opacity:0.5;"></div>
                    <span class="chart-bar-label">${d.month}</span>
                  </div>
                `).join('')}
              </div>
              <div style="display:flex;gap:1rem;justify-content:center;margin-top:0.5rem;font-size:0.8rem;">
                <span><span style="display:inline-block;width:12px;height:12px;background:var(--accent,#e94560);border-radius:2px;margin-right:4px;"></span> Dépenses</span>
                <span><span style="display:inline-block;width:12px;height:12px;background:#1976d2;opacity:0.5;border-radius:2px;margin-right:4px;"></span> Budget</span>
              </div>
            </div>
          </div>

          <!-- Projects by Status -->
          <div class="card">
            <div class="card-header">
              <h3>Projets par statut</h3>
            </div>
            <div class="card-body">
              <div style="display:flex;flex-direction:column;gap:0.75rem;">
                ${Object.entries(statusCounts).map(([status, count]) => {
                  const pct = totalProjects > 0 ? Math.round(count / totalProjects * 100) : 0;
                  const colors = { 'in-progress': '#f57c00', 'completed': '#388e3c', 'planned': '#1976d2', 'pending': '#d32f2f' };
                  const labels = { 'in-progress': 'En cours', 'completed': 'Terminé', 'planned': 'Planifié', 'pending': 'En attente' };
                  return `
                    <div>
                      <div style="display:flex;justify-content:space-between;font-size:0.85rem;margin-bottom:0.25rem;">
                        <span>${labels[status] || status}</span>
                        <span><strong>${count}</strong> (${pct}%)</span>
                      </div>
                      <div style="height:8px;background:var(--border,#e0e0e0);border-radius:4px;overflow:hidden;">
                        <div style="height:100%;width:${pct}%;background:${colors[status] || '#1976d2'};border-radius:4px;transition:width 0.6s ease;"></div>
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          </div>

          <!-- Recent Projects -->
          <div class="card">
            <div class="card-header">
              <h3>Projets récents</h3>
              <a href="#projects" class="btn-sm view" style="text-decoration:none;">Voir tout</a>
            </div>
            <div class="card-body" style="padding:0;">
              <div class="table-container">
                <table class="data-table">
                  <thead>
                    <tr>
                      <th>Projet</th>
                      <th>Statut</th>
                      <th>Budget</th>
                      <th>Progrès</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${recentProjects.map(p => `
                      <tr>
                        <td><strong>${p.name}</strong><br /><span style="font-size:0.75rem;color:var(--muted);">${p.location}</span></td>
                        <td><span class="status-badge ${p.status}">${this.statusLabel(p.status)}</span></td>
                        <td>$${this.formatNumber(p.budget)}</td>
                        <td>
                          <div style="display:flex;align-items:center;gap:0.5rem;">
                            <div style="flex:1;height:6px;background:var(--border,#e0e0e0);border-radius:3px;overflow:hidden;">
                              <div style="height:100%;width:${p.progress}%;background:${p.progress === 100 ? '#388e3c' : '#e94560'};border-radius:3px;"></div>
                            </div>
                            <span style="font-size:0.75rem;font-weight:600;">${p.progress}%</span>
                          </div>
                        </td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- Team Distribution -->
          <div class="card">
            <div class="card-header">
              <h3>Répartition de l'équipe</h3>
            </div>
            <div class="card-body">
              ${Object.entries(roleCounts).slice(0, 6).map(([role, count]) => `
                <div style="display:flex;align-items:center;gap:0.75rem;padding:0.4rem 0;border-bottom:1px solid var(--border,#e0e0e0);">
                  <div style="flex:1;font-size:0.85rem;">${role}</div>
                  <div style="flex:1;height:6px;background:var(--border,#e0e0e0);border-radius:3px;overflow:hidden;">
                    <div style="height:100%;width:${Math.min(100, count / Math.max(...Object.values(roleCounts)) * 100)}%;background:var(--accent,#e94560);border-radius:3px;"></div>
                  </div>
                  <span style="font-size:0.8rem;font-weight:600;min-width:24px;text-align:right;">${count}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;

    return html;
  },

  /** Format number with commas */
  formatNumber(num) {
    if (!num && num !== 0) return '0';
    return Number(num).toLocaleString('fr-FR');
  },

  /** Get status label in French */
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