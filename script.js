document.addEventListener('DOMContentLoaded', () => {

  // State Management
  const userProfile = {};
  let currentActiveSection = '';

  // Utility Function to switch visible screen
  function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
      screen.classList.remove('active');
    });
    const target = document.getElementById(screenId);
    if (target) target.classList.add('active');
  }

  // 1. Registration Screen
  document.getElementById('registration-form').addEventListener('submit', (e) => {
    e.preventDefault();
    userProfile.name = document.getElementById('reg-name').value;
    userProfile.email = document.getElementById('reg-email').value;
    userProfile.dob = document.getElementById('reg-dob').value;
    userProfile.phone = document.getElementById('reg-phone').value;
    showScreen('profile-screen');
  });

  // 2. Profile Screen
  document.getElementById('profile-form').addEventListener('submit', (e) => {
    e.preventDefault();
    userProfile.username = document.getElementById('prof-username').value;
    userProfile.password = document.getElementById('prof-password').value;
    userProfile.location = document.getElementById('prof-location').value;
    userProfile.link = document.getElementById('prof-link').value;
    userProfile.desc = document.getElementById('prof-desc').value;
    showScreen('main-screen');
  });

  // Settings Navigation & Form
  document.getElementById('nav-settings-btn').addEventListener('click', () => {
    document.getElementById('set-username').value = userProfile.username || '';
    document.getElementById('set-password').value = userProfile.password || '';
    document.getElementById('set-email').value = userProfile.email || '';
    document.getElementById('set-phone').value = userProfile.phone || '';
    showScreen('settings-screen');
  });

  document.getElementById('save-settings-btn').addEventListener('click', () => {
    userProfile.username = document.getElementById('set-username').value;
    userProfile.password = document.getElementById('set-password').value;
    userProfile.email = document.getElementById('set-email').value;
    userProfile.phone = document.getElementById('set-phone').value;
    alert('Settings Saved!');
    showScreen('profile-screen');
  });

  document.querySelectorAll('.back-to-profile-btn').forEach(btn => {
    btn.addEventListener('click', () => showScreen('profile-screen'));
  });

  document.querySelectorAll('.back-to-main-btn').forEach(btn => {
    btn.addEventListener('click', () => showScreen('main-screen'));
  });

  // Main Screen Navigation Handlers
  function openSubMenu(sectionName, themeClass) {
    currentActiveSection = sectionName;
    const title = document.getElementById('sub-options-title');
    title.innerText = `${sectionName} Options`;

    const createBtn = document.getElementById('opt-create-btn');
    const collabBtn = document.getElementById('opt-collab-btn');
    const recordBtn = document.getElementById('opt-record-btn');
    const publishBtn = document.getElementById('opt-publish-btn');

    // Reset button color styles
    [createBtn, collabBtn, recordBtn, publishBtn].forEach(btn => {
      btn.className = `btn ${themeClass}`;
    });

    showScreen('sub-options-modal');
  }

  document.getElementById('nav-game-btn').addEventListener('click', () => openSubMenu('Gaming', 'btn-red'));
  document.getElementById('nav-music-btn').addEventListener('click', () => openSubMenu('Music', 'btn-blue'));
  document.getElementById('nav-stream-btn').addEventListener('click', () => openSubMenu('Stream', 'btn-green'));

  document.getElementById('nav-merge-btn').addEventListener('click', () => showScreen('merge-screen'));
  document.getElementById('nav-connect-btn').addEventListener('click', () => showScreen('connect-screen'));

  // Sub-Options Dynamic Routing
  document.getElementById('opt-create-btn').addEventListener('click', () => {
    if (currentActiveSection === 'Music') showScreen('music-screen');
    else if (currentActiveSection === 'Gaming') showScreen('game-screen');
    else if (currentActiveSection === 'Stream') showScreen('stream-screen');
  });

  document.getElementById('opt-collab-btn').addEventListener('click', () => showScreen('merge-screen'));
  
  document.getElementById('opt-record-btn').addEventListener('click', () => {
    alert(`Starting Screen, Camera, and Voice Recording for ${currentActiveSection}...`);
  });

  document.getElementById('opt-publish-btn').addEventListener('click', () => {
    alert(`Publishing menu opened. Choose platforms: YouTube, Instagram, Twitch...`);
  });

  // Music Studio Logic
  document.querySelectorAll('.drum-pad').forEach(pad => {
    pad.addEventListener('click', () => {
      alert(`Played Sound: ${pad.innerText}`);
    });
  });

  document.getElementById('load-tracks-btn').addEventListener('click', () => {
    const container = document.getElementById('tracks-container');
    container.innerHTML = `
      <p style="margin-top:8px;">Loaded Tracks: EDM Loop A, HipHop Beat B, Rock Riff C</p>
    `;
  });

  document.getElementById('publish-music-btn').addEventListener('click', () => {
    alert('Published music track to Twitch, YouTube, and Instagram!');
  });

  // Gaming Logic
  document.getElementById('connect-controller-btn').addEventListener('click', () => {
    document.getElementById('controller-status').innerText = 'Hardware Controller Connected (PlayStation / Xbox / VR Compatible).';
  });

  // Stream & Chat Interaction Logic
  const chatBox = document.getElementById('chat-box');
  const chatInput = document.getElementById('chat-input');

  function addChatMessage(username, message) {
    const msgDiv = document.createElement('div');
    msgDiv.className = 'chat-message';
    msgDiv.innerHTML = `<span class="username-tag">@${username}</span>: ${message}`;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;

    msgDiv.querySelector('.username-tag').addEventListener('click', () => {
      chatInput.value = `@${username} `;
      chatInput.focus();
    });
  }

  // Pre-fill initial viewers
  addChatMessage('GamerOne', 'Awesome stream!');
  addChatMessage('BeatMaker', 'Sounds great!');

  document.getElementById('send-chat-btn').addEventListener('click', () => {
    const text = chatInput.value.trim();
    if (text) {
      addChatMessage(userProfile.username || 'You', text);
      chatInput.value = '';
    }
  });

  // Connect AI Chat Logic
  document.getElementById('ai-send-btn').addEventListener('click', () => {
    const input = document.getElementById('ai-input');
    const box = document.getElementById('ai-chat');
    if (input.value.trim()) {
      box.innerHTML += `<p><strong>You:</strong> ${input.value}</p>`;
      box.innerHTML += `<p><strong>AI Security Bot:</strong> System setup complete. Cybersecurity layers installed for your account.</p>`;
      input.value = '';
      box.scrollTop = box.scrollHeight;
    }
  });

});