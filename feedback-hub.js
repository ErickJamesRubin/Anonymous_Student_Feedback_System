document.addEventListener('DOMContentLoaded', function () {

  // SIDEBAR 
  const hamburger = document.getElementById('hamburger');
  const sidebar   = document.getElementById('sidebar');

  if (hamburger && sidebar) {
    hamburger.addEventListener('click', () => sidebar.classList.toggle('open'));
    document.addEventListener('click', e => {
      if (window.innerWidth <= 900 && !sidebar.contains(e.target) && !hamburger.contains(e.target))
        sidebar.classList.remove('open');
    });
  }

  // DATA 
  const feedbackData = [
    { id:'NBSC-A1B2C', category:'Academic',   message:'The grading system for our major subjects lacks transparency. Students are not informed about how final grades are computed, and there seems to be inconsistency between professors. A clear, published rubric would greatly help.', priority:'High',   status:'pending',  date:'Feb 26, 2026', notes:'' },
    { id:'NBSC-D3E4F', category:'Facilities', message:'The restrooms near the Engineering building have been broken for over two weeks. Faucets are not functioning and the ventilation is poor. This is a basic sanitation concern that needs urgent attention.',                   priority:'Urgent', status:'reviewed', date:'Feb 25, 2026', notes:'Forwarded to the facilities management team. Awaiting repair schedule.' },
    { id:'NBSC-G5H6I', category:'Faculty',    message:'One of our professors consistently starts class 20–30 minutes late and dismisses early without covering the required topics. This has been ongoing for the entire semester and is affecting our learning outcomes.',            priority:'High',   status:'pending',  date:'Feb 24, 2026', notes:'' },
    { id:'NBSC-J7K8L', category:'Services',   message:'The registration portal was extremely slow and kept timing out during the enrollment period. Many students were unable to enroll on time due to technical issues. A more robust system is needed.',                          priority:'Medium', status:'resolved', date:'Feb 22, 2026', notes:'IT department addressed the server load issue. New infrastructure deployed.' },
    { id:'NBSC-M9N0O', category:'Safety',     message:'The pathway near the library becomes extremely slippery when it rains. Two students have already slipped this week. Anti-slip mats or better drainage would prevent accidents.',                                             priority:'Urgent', status:'reviewed', date:'Feb 21, 2026', notes:'Safety officer notified. Temporary mats installed. Permanent fix pending budget approval.' },
    { id:'NBSC-P1Q2R', category:'Academic',   message:'The library needs more reference books for the Engineering department. Most of the available books are outdated (2005–2010 editions) and do not cover the current curriculum.',                                              priority:'Medium', status:'pending',  date:'Feb 20, 2026', notes:'' },
    { id:'NBSC-S3T4U', category:'Facilities', message:'The air conditioning units in Rooms 204 and 205 have not been working for three weeks. The heat is making it very difficult to focus during afternoon classes.',                                                            priority:'High',   status:'pending',  date:'Feb 19, 2026', notes:'' },
    { id:'NBSC-V5W6X', category:'Services',   message:'The canteen closes at 2PM which is too early. Many students who have classes until 5PM or 6PM have no access to affordable food on campus.',                                                                               priority:'Low',    status:'resolved', date:'Feb 18, 2026', notes:'Canteen management agreed to extend hours to 5PM starting March 2026.' },
    { id:'NBSC-Y7Z8A', category:'Faculty',    message:'A professor uses outdated slides from 5 years ago and refuses to update course materials. Some of the information taught is no longer accurate or relevant to the industry.',                                               priority:'Medium', status:'reviewed', date:'Feb 17, 2026', notes:'Department head has been informed. Curriculum review scheduled.' },
    { id:'NBSC-B9C0D', category:'Other',      message:'There is no designated quiet study area on campus aside from the library which is often full. A silent study lounge would greatly benefit students who need a distraction-free environment.',                               priority:'Low',    status:'pending',  date:'Feb 16, 2026', notes:'' },
    { id:'NBSC-E1F2G', category:'Safety',     message:'The parking area lights near Gate 3 are not functioning, making it very dark and unsafe at night. Students and staff are at risk when leaving campus after evening classes.',                                              priority:'Urgent', status:'resolved', date:'Feb 15, 2026', notes:'Electrical team replaced bulbs and repaired wiring. All lights operational.' },
    { id:'NBSC-H3I4J', category:'Academic',   message:'The internship coordinator is difficult to reach and takes weeks to respond to emails. Students trying to complete their requirements are being held up by slow administrative response.',                                  priority:'Medium', status:'reviewed', date:'Feb 14, 2026', notes:'Academic affairs notified. Coordinator to set weekly office hours for internship queries.' },
  ];

  let currentId = null;

  // RENDER TABLE 
  function renderTable(data) {
    const tbody = document.getElementById('feedbackTableBody');
    const empty = document.getElementById('tableEmpty');
    if (!tbody) return;

    tbody.innerHTML = '';

    if (data.length === 0) {
      if (empty) empty.style.display = 'flex';
      return;
    }

    if (empty) empty.style.display = 'none';

    data.forEach(item => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td class="td-id">${item.id}</td>
        <td><span class="cat-chip ${item.category.toLowerCase()}">${item.category}</span></td>
        <td class="td-preview">${item.message}</td>
        <td><span class="pri-chip ${item.priority.toLowerCase()}">${item.priority}</span></td>
        <td><span class="status-badge ${item.status}">${cap(item.status)}</span></td>
        <td style="font-size:12px;color:var(--text-muted);white-space:nowrap">${item.date}</td>
        <td><div class="td-actions">
          <button class="action-btn" data-id="${item.id}" title="View Details">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          </button>
        </div></td>
      `;
      tr.addEventListener('click', () => openDetail(item.id));
      tbody.appendChild(tr);
    });

    // Action button — stop row click from firing
    tbody.querySelectorAll('.action-btn').forEach(btn =>
      btn.addEventListener('click', e => {
        e.stopPropagation();
        openDetail(btn.dataset.id);
      })
    );

    updateCounts();
  }

  // FILTERS 
  function applyFilters() {
    const search   = document.getElementById('searchInput').value.toLowerCase();
    const status   = document.getElementById('filterStatus').value;
    const category = document.getElementById('filterCategory').value;
    const priority = document.getElementById('filterPriority').value;

    renderTable(feedbackData.filter(item =>
      (!search   || item.message.toLowerCase().includes(search) || item.id.toLowerCase().includes(search)) &&
      (status   === 'all' || item.status   === status)   &&
      (category === 'all' || item.category === category) &&
      (priority === 'all' || item.priority === priority)
    ));
  }

  ['searchInput', 'filterStatus', 'filterCategory', 'filterPriority'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', applyFilters);
  });

  // COUNTS 
  function updateCounts() {
    const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    set('countAll',      feedbackData.length);
    set('countPending',  feedbackData.filter(f => f.status === 'pending').length);
    set('countReviewed', feedbackData.filter(f => f.status === 'reviewed').length);
    set('countResolved', feedbackData.filter(f => f.status === 'resolved').length);
    set('sidebarBadge',  feedbackData.length);
  }

  // DETAIL MODAL 
  function openDetail(id) {
    const item = feedbackData.find(f => f.id === id);
    if (!item) return;
    currentId = id;

    const set = (elId, val) => { const el = document.getElementById(elId); if (el) el.textContent = val; };
    set('dmId',       item.id);
    set('dmCategory', item.category + ' Feedback');
    set('dmMessage',  item.message);
    set('dmDate',     item.date);

    const notesEl = document.getElementById('dmNotes');
    if (notesEl) notesEl.value = item.notes || '';

    const statusEl = document.getElementById('dmStatus');
    if (statusEl) { statusEl.className = `status-badge ${item.status}`; statusEl.textContent = cap(item.status); }

    const priEl = document.getElementById('dmPriority');
    if (priEl) { priEl.className = `pri-chip ${item.priority.toLowerCase()}`; priEl.textContent = item.priority + ' Priority'; }

    const modal = document.getElementById('detailModal');
    if (modal) modal.classList.add('show');
  }

  function closeModal() {
    const modal = document.getElementById('detailModal');
    if (modal) modal.classList.remove('show');
    currentId = null;
  }

  const closeBtn = document.getElementById('closeModalBtn');
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  const modalOverlay = document.getElementById('detailModal');
  if (modalOverlay) {
    modalOverlay.addEventListener('click', e => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  // STATUS UPDATE 
  function updateStatus(newStatus) {
    if (!currentId) return;
    const item = feedbackData.find(f => f.id === currentId);
    if (!item) return;
    item.status = newStatus;

    const statusEl = document.getElementById('dmStatus');
    if (statusEl) { statusEl.className = `status-badge ${newStatus}`; statusEl.textContent = cap(newStatus); }

    applyFilters();
    showToast(`Status updated to "${cap(newStatus)}"`);
  }

  const btnPending  = document.getElementById('btnPending');
  const btnReviewed = document.getElementById('btnReviewed');
  const btnResolved = document.getElementById('btnResolved');
  if (btnPending)  btnPending.addEventListener('click',  () => updateStatus('pending'));
  if (btnReviewed) btnReviewed.addEventListener('click', () => updateStatus('reviewed'));
  if (btnResolved) btnResolved.addEventListener('click', () => updateStatus('resolved'));

  // SAVE NOTE 
  const btnSaveNote = document.getElementById('btnSaveNote');
  if (btnSaveNote) {
    btnSaveNote.addEventListener('click', () => {
      if (!currentId) return;
      const item = feedbackData.find(f => f.id === currentId);
      if (!item) return;
      const notesEl = document.getElementById('dmNotes');
      if (notesEl) item.notes = notesEl.value;
      showToast('Note saved successfully');
    });
  }

  // TOAST 
  function showToast(msg) {
    const t = document.getElementById('toast');
    if (!t) return;
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2800);
  }

  // HELPER 
  function cap(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  renderTable(feedbackData);

}); 