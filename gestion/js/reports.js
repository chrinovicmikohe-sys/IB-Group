/* ==========================================================
   Imperial Building Group - Reports & Statistics (reports.js)
   ========================================================== */

const Reports = {
  render() {
    const projects = DB.getAll('ibg_projects');
    const employees = DB.getAll('ibg_employees');
    const clients = DB.getAll('ibg_clients');

    const totalBudget = projects.reduce((a, p) => a + (p.budget || 0), 0);
    const totalSpent = projects.reduce((a, p) => a + (p.spent || 0), 0);
    const totalPayroll = employees.filter(e => e.status === 'active').reduce((a, e) => a + (e.salary || 0), 0);
    const avgBudget = projects.length > 0 ? Math.round(totalBudget / projects.length) : 0;
    const budgetUtilization = totalBudget > 0 ? Math.round(totalSpent / totalBudget * 100) : 0;

    // Projects by city
    const cityData = {};
    projects.forEach(p => {
      cityData[p.location] = (cityData[p.location] || 0) + 1;
    });

    // Budget by type
    const typeBudget = {};
    projects.forEach(p => {
      if (!typeBudget[p.type]) typeBudget[p.type] = { budget: 0, spent: 0, count: 0 };
      typeBudget[p.type].budget += p.budget || 0;
      typeBudget[p.type].spent += p.spent || 0;
      typeBudget[p.type].count += 1;
    });

    // Priority distribution
    const priorityCounts = {};
    projects.forEach(p => {
      priorityCounts[p.priority] = (priorityCounts[p.priority] || 0) + 1;
    });

    const html = `
      <div class="reports-page">
        <h3 style="margin:0 0 0.5rem;">Rapports & Statistiques</h3>
        <p style="color:var(--muted);margin:0 0 1.5rem;">Vue d'ensemble financière et opérationnelle</p>

        <!-- Summary -->
        <div class="report-summary">
          <div class="report-stat">
            <div class="stat-value">$${this.formatNumber(totalBudget)}</div>
            <div class="stat-label">Budget total</div>
          </div>
          <div class="report-stat">
            <div class="stat-value">$${this.formatNumber(totalSpent)}</div>
            <div class="stat-label">Dépenses totales</div>
          </div>
          <div class="report-stat">
            <div class="stat-value">${budgetUtilization}%</div>
            <div class="stat-label">Utilisation budget</div>
          </div>
          <div class="report-stat">
            <div class="stat-value">$${this.formatNumber(avgBudget)}</div>
            <div class="stat-label">Budget moyen / projet</div>
          </div>
          <div class="report-stat">
            <div class="stat-value">$${this.formatNumber(totalPayroll)}</div>
            <div class="stat-label">Masse salariale / mois</div>
          </div>
          <div class="report-stat">
            <div class="stat-value">${employees.length}</div>
            <div class="stat-label">Employés</div>
          </div>
        </div>

        <div class="grid-2">
          <!-- Budget by Type -->
          <div class="card">
            <div class="card-header">
              <h3>Budget par type de projet</h3>
            </div>
            <div class="card-body">
              <div class="table-container">
                <table class="data-table">
                  <thead>
                    <tr>
                      <th>Type</th>
                      <th>Projets</th>
                      <th>Budget</th>
                      <th>Dépensé</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${Object.entries(typeBudget).map(([type, data]) => `
                      <tr>
                        <td>${this.typeLabel(type)}</td>
                        <td>${data.count}</td>
                        <td>$${this.formatNumber(data.budget)}</td>
                        <td>$${this.formatNumber(data.spent)}</td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- Projects by City -->
          <div class="card">
            <div class="card-header">
              <h3>Projets par ville</h3>
            </div>
            <div class="card-body">
              ${Object.entries(cityData).sort((a, b) => b[1] - a[1]).map(([city, count]) => {
                const maxCount = Math.max(...Object.values(cityData));
                return `
                  <div style="display:flex;align-items:center;gap:0.75rem;padding:0.5rem 0;border-bottom:1px solid var(--border,#e0e0e0);">
                    <div style="flex:0 0 120px;font-size:0.9rem;font-weight:500;">${city}</div>
                    <div style="flex:1;height:24px;background:var(--border,#e0e0e0);border-radius:4px;overflow:hidden;">
                      <div style="height:100%;width:${count / maxCount * 100}%;background:var(--accent,#e94560);border-radius:4px;display:flex;align-items:center;padding-left:0.5rem;color:#fff;font-size:0.75rem;font-weight:600;">${count}</div>
                    </div>
                    <span style="font-size:0.85rem;font-weight:600;min-width:24px;">${count}</span>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Priority Distribution -->
          <div class="card">
            <div class="card-header">
              <h3>Priorités des projets</h3>
            </div>
            <div class="card-body">
              <div style="display:flex;flex-wrap:wrap;gap:1rem;">
                ${Object.entries(priorityCounts).map(([priority, count]) => {
                  const colors = { haute: '#d32f2f', critique: '#b71c1c', moyenne: '#f57c00', basse: '#388e3c' };
                  return `
                    <div style="flex:1;min-width:120px;text-align:center;padding:1rem;background:${colors[priority] || '#666'}15;border-radius:var(--radius-md);border:1px solid ${colors[priority] || '#666'}30;">
                      <div style="font-size:1.5rem;font-weight:700;color:${colors[priority] || '#666'};">${count}</div>
                      <div style="font-size:0.8rem;color:var(--muted);margin-top:0.25rem;">${priority.charAt(0).toUpperCase() + priority.slice(1)}</div>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          </div>

          <!-- Client Distribution -->
          <div class="card">
            <div class="card-header">
              <h3>Répartition des clients</h3>
            </div>
            <div class="card-body">
              <div style="display:flex;flex-wrap:wrap;gap:1rem;">
                <div style="flex:1;min-width:120px;text-align:center;padding:1rem;background:rgba(25,118,210,0.1);border-radius:var(--radius-md);border:1px solid rgba(25,118,210,0.2);">
                  <div style="font-size:1.5rem;font-weight:700;color:#1976d2;">${clients.filter(c => c.type === 'entreprise').length}</div>
                  <div style="font-size:0.8rem;color:var(--muted);margin-top:0.25rem;">Entreprises</div>
                </div>
                <div style="flex:1;min-width:120px;text-align:center;padding:1rem;background:rgba(56,142,60,0.1);border-radius:var(--radius-md);border:1px solid rgba(56,142,60,0.2);">
                  <div style="font-size:1.5rem;font-weight:700;color:#388e3c;">${clients.filter(c => c.type === 'particulier').length}</div>
                  <div style="font-size:0.8rem;color:var(--muted);margin-top:0.25rem;">Particuliers</div>
                </div>
                <div style="flex:1;min-width:120px;text-align:center;padding:1rem;background:rgba(123,31,162,0.1);border-radius:var(--radius-md);border:1px solid rgba(123,31,162,0.2);">
                  <div style="font-size:1.5rem;font-weight:700;color:#7b1fa2;">${clients.filter(c => c.type === 'institution').length}</div>
                  <div style="font-size:0.8rem;color:var(--muted);margin-top:0.25rem;">Institutions</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    return html;
  },

  formatNumber(num) {
    if (!num && num !== 0) return '0';
    return Number(num).toLocaleString('fr-FR');
  },

  typeLabel(type) {
    const labels = { construction: 'Construction', renovation: 'Rénovation', amenagement: 'Aménagement', extension: 'Extension', paysager: 'Paysager' };
    return labels[type] || type;
  },
};