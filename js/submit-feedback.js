// CHARACTER COUNTER 
const textarea  = document.getElementById('feedbackText');
const charCount = document.getElementById('charCount');

if (textarea && charCount) {
  textarea.addEventListener('input', () => {
    charCount.textContent = textarea.value.length;
  });
}

// FILE UPLOAD 
const dropzone  = document.getElementById('dropzone');
const fileInput = document.getElementById('fileInput');
const fileList  = document.getElementById('fileList');
let attachedFiles = [];

if (dropzone) {
  // Drag & drop events
  dropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropzone.classList.add('drag-over');
  });

  dropzone.addEventListener('dragleave', () => {
    dropzone.classList.remove('drag-over');
  });

  dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropzone.classList.remove('drag-over');
    handleFiles([...e.dataTransfer.files]);
  });
}

if (fileInput) {
  fileInput.addEventListener('change', () => {
    handleFiles([...fileInput.files]);
    fileInput.value = ''; 
  });
}

function handleFiles(newFiles) {
  newFiles.forEach(file => {
    if (attachedFiles.find(f => f.name === file.name)) return; 
    attachedFiles.push(file);
  });
  renderFileList();
}

function renderFileList() {
  if (!fileList) return;
  fileList.innerHTML = '';
  attachedFiles.forEach((file, index) => {
    const sizeMB = (file.size / 1024 / 1024).toFixed(2);
    const item = document.createElement('div');
    item.className = 'file-item';
    item.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
      </svg>
      <span class="file-item-name">${file.name}</span>
      <span class="file-item-size">${sizeMB} MB</span>
      <button class="file-remove" onclick="removeFile(${index})">×</button>
    `;
    fileList.appendChild(item);
  });
}

function removeFile(index) {
  attachedFiles.splice(index, 1);
  renderFileList();
}

// FORM SUBMIT
function submitFeedback() {
  const text = textarea ? textarea.value.trim() : '';

  if (!text) {
    textarea.focus();
    textarea.style.borderColor = '#f74f4f';
    setTimeout(() => { textarea.style.borderColor = ''; }, 2000);
    return;
  }

  // Generate a random reference ID
  const refId = 'NBSC-' + Date.now().toString(36).toUpperCase();
  const refEl = document.getElementById('refId');
  if (refEl) refEl.textContent = refId;

  // Show success modal
  const modal = document.getElementById('successModal');
  if (modal) modal.classList.add('show');
}

function closeModal() {
  const modal = document.getElementById('successModal');
  if (modal) modal.classList.remove('show');
  clearForm();
}

// CLEAR FORM 
function clearForm() {
  // Reset category
  const firstCat = document.querySelector('input[name="category"]');
  if (firstCat) firstCat.checked = true;

  // Reset priority
  const firstPri = document.querySelector('input[name="priority"]');
  if (firstPri) firstPri.checked = true;

  // Reset textarea
  if (textarea) { textarea.value = ''; }
  if (charCount) { charCount.textContent = '0'; }

  // Reset files
  attachedFiles = [];
  renderFileList();
}