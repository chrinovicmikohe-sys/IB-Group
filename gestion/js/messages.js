/* ==========================================================
   Imperial Building Group - Internal Messaging (messages.js)
   ========================================================== */

const Messages = {
  currentConvId: null,

  render() {
    const user = Auth.getCurrentUser();
    if (!user) return '<p>Veuillez vous connecter.</p>';
    
    const conversations = DB.getAll('ibg_conversations');
    const users = DB.getAll('ibg_users');
    const currentUserId = user.id;

    // Filter conversations where user is a participant
    const myConvs = conversations.filter(c => c.participants.includes(currentUserId));

    const html = `
      <div class="messages-layout">
        <div class="conversations-list">
          <div class="conversations-header">
            <h3>Conversations</h3>
            <button class="btn-sm edit" onclick="Messages.newConversation()"><i class="fas fa-plus"></i></button>
          </div>
          <div id="conv-list">
            ${myConvs.length === 0 ? '<p style="padding:1rem;color:var(--muted);font-size:0.85rem;">Aucune conversation</p>' : ''}
            ${myConvs.map(c => {
              const otherUserIds = c.participants.filter(id => id !== currentUserId);
              const convName = c.name || otherUserIds.map(id => {
                const u = users.find(user => user.id === id);
                return u ? u.name : 'Inconnu';
              }).join(', ');
              const unread = c.unread?.[currentUserId] || 0;
              const lastTs = c.lastTimestamp ? new Date(c.lastTimestamp) : null;
              return `
                <div class="conversation-item ${this.currentConvId === c.id ? 'active' : ''}" onclick="Messages.openConversation('${c.id}')">
                  <div class="conversation-avatar" style="background:${this.getColor(c.id)};">
                    ${convName.charAt(0).toUpperCase()}
                  </div>
                  <div class="conversation-info">
                    <span class="conversation-name">${convName} ${unread > 0 ? `<span class="badge badge-notif" style="margin-left:4px;">${unread}</span>` : ''}</span>
                    <span class="conversation-preview">${c.lastMessage || 'Aucun message'}</span>
                  </div>
                  <span class="conversation-time">${lastTs ? this.formatTime(lastTs) : ''}</span>
                </div>
              `;
            }).join('')}
          </div>
        </div>
        <div class="chat-area" id="chat-area">
          ${this.currentConvId ? this.renderChat(this.currentConvId) : this.renderEmptyChat()}
        </div>
      </div>
    `;

    return html;
  },

  renderEmptyChat() {
    return `
      <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;color:var(--muted);padding:2rem;">
        <i class="fas fa-comments" style="font-size:3rem;margin-bottom:1rem;opacity:0.3;"></i>
        <p>Sélectionnez une conversation pour commencer à discuter</p>
      </div>
    `;
  },

  renderChat(convId) {
    const conv = DB.getById('ibg_conversations', convId);
    if (!conv) return this.renderEmptyChat();

    const messages = DB.filter('ibg_messages', m => m.conversationId === convId);
    const users = DB.getAll('ibg_users');
    const user = Auth.getCurrentUser();
    const otherUserIds = conv.participants.filter(id => id !== user.id);
    const convName = conv.name || otherUserIds.map(id => {
      const u = users.find(user => user.id === id);
      return u ? u.name : 'Inconnu';
    }).join(', ');

    return `
      <div class="chat-header">
        <div class="conversation-avatar" style="background:${this.getColor(convId)};width:36px;height:36px;font-size:0.8rem;">
          ${convName.charAt(0).toUpperCase()}
        </div>
        <h4>${convName}</h4>
      </div>
      <div class="chat-messages" id="chat-messages">
        ${messages.length === 0 ? '<p style="text-align:center;color:var(--muted);padding:2rem;">Démarrez la conversation</p>' : ''}
        ${messages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)).map(m => {
          const isSent = m.senderId === user.id;
          const sender = users.find(u => u.id === m.senderId);
          const ts = new Date(m.timestamp);
          return `
            <div class="chat-message ${isSent ? 'sent' : 'received'}">
              ${!isSent ? `<strong style="font-size:0.8rem;display:block;margin-bottom:0.2rem;">${sender ? sender.name : 'Inconnu'}</strong>` : ''}
              ${m.text}
              <span class="msg-time">${this.formatTime(ts)}</span>
            </div>
          `;
        }).join('')}
      </div>
      <div class="chat-input-area">
        <input type="text" id="chat-input" placeholder="Écrivez votre message..." onkeydown="if(event.key==='Enter')Messages.sendMessage()" />
        <button onclick="Messages.sendMessage()"><i class="fas fa-paper-plane"></i></button>
      </div>
    `;
  },

  openConversation(convId) {
    this.currentConvId = convId;
    // Mark as read
    const conv = DB.getById('ibg_conversations', convId);
    if (conv) {
      const user = Auth.getCurrentUser();
      if (conv.unread && conv.unread[user.id]) {
        conv.unread[user.id] = 0;
        DB.update('ibg_conversations', convId, { unread: conv.unread });
      }
    }
    App.navigate('messages');
  },

  sendMessage() {
    const input = document.getElementById('chat-input');
    if (!input || !input.value.trim()) return;

    const user = Auth.getCurrentUser();
    const msg = {
      conversationId: this.currentConvId,
      senderId: user.id,
      text: input.value.trim(),
      timestamp: new Date().toISOString(),
    };

    DB.create('ibg_messages', msg);

    // Update conversation
    const conv = DB.getById('ibg_conversations', this.currentConvId);
    if (conv) {
      const participants = conv.participants.filter(id => id !== user.id);
      const unread = conv.unread || {};
      participants.forEach(id => {
        unread[id] = (unread[id] || 0) + 1;
      });
      DB.update('ibg_conversations', this.currentConvId, {
        lastMessage: msg.text,
        lastTimestamp: msg.timestamp,
        unread,
      });
    }

    input.value = '';
    // Scroll to bottom after render
    setTimeout(() => {
      const chatMsgs = document.getElementById('chat-messages');
      if (chatMsgs) chatMsgs.scrollTop = chatMsgs.scrollHeight;
    }, 50);
  },

  newConversation() {
    const users = DB.getAll('ibg_users');
    const user = Auth.getCurrentUser();
    const otherUsers = users.filter(u => u.id !== user.id);

    const html = `
      <div class="modal-overlay" onclick="if(event.target===this)this.remove();">
        <div class="modal">
          <div class="modal-header">
            <h3>Nouvelle conversation</h3>
            <button class="modal-close" onclick="this.closest('.modal-overlay').remove()"><i class="fas fa-times"></i></button>
          </div>
          <div class="modal-body">
            <form id="conv-form">
              <div class="form-group">
                <label>Nom de la conversation (optionnel)</label>
                <input type="text" name="name" placeholder="Équipe Projets" />
              </div>
              <div class="form-group">
                <label>Participants</label>
                <select name="participants" multiple style="height:120px;">
                  ${otherUsers.map(u => `<option value="${u.id}">${u.name} — ${u.role}</option>`).join('')}
                </select>
                <span style="font-size:0.75rem;color:var(--muted);">Maintenez Ctrl pour sélectionner plusieurs</span>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" onclick="this.closest('.modal-overlay').remove()">Annuler</button>
            <button class="btn btn-primary" onclick="Messages.createConversation()">Créer</button>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', html);
  },

  createConversation() {
    const form = document.getElementById('conv-form');
    if (!form) return;
    const data = new FormData(form);
    const name = data.get('name');
    const select = form.querySelector('select[name="participants"]');
    const selected = Array.from(select.selectedOptions).map(opt => opt.value);
    const user = Auth.getCurrentUser();

    if (selected.length === 0) {
      alert('Sélectionnez au moins un participant.');
      return;
    }

    const participants = [user.id, ...selected];
    const unread = {};
    participants.forEach(id => { unread[id] = 0; });

    const conv = {
      participants,
      name: name || '',
      lastMessage: '',
      lastTimestamp: new Date().toISOString(),
      unread,
    };

    const created = DB.create('ibg_conversations', conv);
    document.querySelector('.modal-overlay')?.remove();
    this.openConversation(created.id);
  },

  getColor(str) {
    const colors = ['#e94560', '#1976d2', '#388e3c', '#f57c00', '#7b1fa2', '#00796b', '#c62828', '#283593'];
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  },

  formatTime(date) {
    const now = new Date();
    const diff = now - date;
    if (diff < 86400000) {
      return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    }
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
  },
};