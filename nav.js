// Shared Navigation, Global Search, and Modal System for LinkedIn OS
document.addEventListener('DOMContentLoaded', () => {
  renderSharedNav();
  setupGlobalSearch();
});

function renderSharedNav() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  
  const navContainer = document.getElementById('shared-nav-container');
  if (!navContainer) return;

  const links = [
    { href: 'index.html', label: '📊 Dashboard', id: 'index.html' },
    { href: 'profiles.html', label: '👥 Profiles & Scores', id: 'profiles.html' },
    { href: 'skills-gaps.html', label: '🧠 Skills Gaps', id: 'skills-gaps.html' },
    { href: 'todos.html', label: '✅ Todos', id: 'todos.html' },
    { href: 'playbook.html', label: '📖 Playbook', id: 'playbook.html' },
    { href: 'dictionary.html', label: '📚 Dictionary', id: 'dictionary.html' },
  ];

  const linksHtml = links.map(link => {
    const isActive = (currentPath === link.id) || (currentPath === '' && link.id === 'index.html');
    return `<a href="${link.href}" ${link.target ? `target="${link.target}"` : ''} class="nav-link ${isActive ? 'active' : ''}">${link.label}</a>`;
  }).join('');

  navContainer.innerHTML = `
    <nav class="shared-navbar">
      <div class="nav-brand">
        <a href="index.html" class="brand-link">
          <span class="brand-icon">🚀</span>
          <span class="brand-text">LinkedIn OS</span>
        </a>
      </div>

      <div class="nav-menu">
        ${linksHtml}
      </div>

      <div class="nav-actions">
        <div class="search-trigger-box" onclick="openSearchModal()">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <span>Search (Ctrl+K)...</span>
          <kbd>/</kbd>
        </div>
        <a href="https://www.linkedin.com/in/rifaterdemsahin/" target="_blank" class="nav-btn-linkedin">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.59 1.59 0 1 0-.01-3.18 1.59 1.59 0 0 0 .01 3.18m1.4 9.74v-8.37H5.06v8.37h2.8z"/></svg>
          <span>Profile</span>
        </a>
      </div>
    </nav>

    <!-- Global Search Modal -->
    <div id="search-modal" class="search-modal-backdrop" onclick="handleBackdropClick(event)">
      <div class="search-modal-card">
        <div class="search-input-wrapper">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input type="text" id="global-search-input" placeholder="Search profiles, skills gaps, todos, or updates..." oninput="handleSearchInput(this.value)">
          <button class="search-close-btn" onclick="closeSearchModal()">&times;</button>
        </div>
        <div id="search-results-container" class="search-results-list">
          <div class="search-hint">Type to search across all pages, profiles, and tasks...</div>
        </div>
      </div>
    </div>
  `;
}

// Search Index
const searchableItems = [
  { title: "SHAP (Shapley Additive exPlanations)", category: "Dictionary", url: "dictionary.html", desc: "Game theory based feature attribution. Efficiency, symmetry, additivity axioms." },
  { title: "LIME (Local Interpretable Surrogates)", category: "Dictionary", url: "dictionary.html", desc: "Local surrogate model explanation using neighborhood data perturbations." },
  { title: "AI & AGI Engineering Dictionary", category: "Dictionary", url: "dictionary.html", desc: "Technical glossary: MCTS, PRM vs ORM, Evals, ReAct, NeMo, vLLM." },
  { title: "Strategic Contracting Playbook", category: "Playbook", url: "playbook.html", desc: "4 Pillars to Land, Train, Adapt, Secure £1,500/day roles." },
  { title: "Pillar 1: LAND (Inbound & Outbound)", category: "Playbook", url: "playbook.html#land", desc: "Recruiter SEO, Open to Work configuration, CTO pitch." },
  { title: "Pillar 2: TRAIN (Frontier Mastery)", category: "Playbook", url: "playbook.html#train", desc: "Cognitive architectures, reasoning traces, automated evals." },
  { title: "Pillar 3: ADAPT (Enterprise ROI)", category: "Playbook", url: "playbook.html#adapt", desc: "Smallest viable agent, deterministic wrappers, business translation." },
  { title: "Pillar 4: SECURE (Commercials & Retainers)", category: "Playbook", url: "playbook.html#secure", desc: "Discovery sprint (£5k-£10k), fractional retainers, Outside IR35." },
  { title: "Erdem (Rifat) Sahin - AGI Researcher (Live)", category: "Profile", url: "profiles.html", desc: "Score 92/100. Target profile, Cambridge UK, DeliveryPilot." },
  { title: "Claude Certified Architect (Legacy)", category: "Profile", url: "profiles.html", desc: "Score 68/100. Previous export with vendor tool framing." },
  { title: "AI Security & Adversarial Engineer", category: "CV Variant", url: "profiles.html", desc: "Score 87/100. SHAP, LIME, FGSM defenses, PyTorch." },
  { title: "AI Solutions Architect CV", category: "CV Variant", url: "profiles.html", desc: "Score 84/100. Enterprise solutions, Azure, cloud architecture." },
  { title: "Naresh Harwani Influencer Profile", category: "Benchmark", url: "profiles.html", desc: "Score 76/100. High inbound social proof & audience authority." },
  { title: "Domain 1: Reasoning & Test-Time Compute", category: "Skills Gap", url: "skills-gaps.html", desc: "DeepSeek R1, o1/o3 reasoning traces, MCTS, PRMs." },
  { title: "Domain 2: Evaluation Engineering (Evals)", category: "Skills Gap", url: "skills-gaps.html", desc: "DeepEval, Ragas, TruLens, LLM-as-a-judge CI/CD." },
  { title: "Domain 3: Multi-Agent Swarms & Orchestration", category: "Skills Gap", url: "skills-gaps.html", desc: "LangGraph, AutoGen, CrewAI, AGY, DSPy." },
  { title: "Domain 4: Production Guardrails & Safety", category: "Skills Gap", url: "skills-gaps.html", desc: "NeMo Guardrails, Llama Guard, Langfuse tracing." },
  { title: "Domain 5: Inference Optimization & vLLM", category: "Skills Gap", url: "skills-gaps.html", desc: "vLLM, speculative decoding, private sovereign inference." },
  { title: "Unpin Codespaces from Top Skills", category: "Todo", url: "todos.html", desc: "Action required on LinkedIn skills endorsement section." },
  { title: "Pin AGI and Autonomous Agents to Skills", category: "Todo", url: "todos.html", desc: "Replace trivial skills with high-value recruiter keywords." },
  { title: "Replace About Summary with Executive Copy", category: "Todo", url: "todos.html", desc: "Remove casual greeting and highlight 15+ years enterprise track record." },
  { title: "Publish LinkedIn Transition Announcement Post", category: "Todo", url: "todos.html", desc: "Share transition post to re-engage network and prospective clients." },
  { title: "Package 2-Week Discovery Sprint SOW", category: "Todo", url: "todos.html", desc: "Fixed-fee £5k-£10k architecture audit contract template." }
];

function setupGlobalSearch() {
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      openSearchModal();
    } else if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
      e.preventDefault();
      openSearchModal();
    } else if (e.key === 'Escape') {
      closeSearchModal();
    }
  });
}

function openSearchModal() {
  const modal = document.getElementById('search-modal');
  if (!modal) return;
  modal.classList.add('open');
  const input = document.getElementById('global-search-input');
  if (input) {
    input.focus();
    input.select();
    handleSearchInput(input.value);
  }
}

function closeSearchModal() {
  const modal = document.getElementById('search-modal');
  if (modal) modal.classList.remove('open');
}

function handleBackdropClick(e) {
  if (e.target.id === 'search-modal') {
    closeSearchModal();
  }
}

function handleSearchInput(query) {
  const container = document.getElementById('search-results-container');
  if (!container) return;

  const q = query.trim().toLowerCase();
  if (!q) {
    container.innerHTML = searchableItems.slice(0, 6).map(item => renderSearchResult(item)).join('');
    return;
  }

  const results = searchableItems.filter(item => 
    item.title.toLowerCase().includes(q) || 
    item.desc.toLowerCase().includes(q) || 
    item.category.toLowerCase().includes(q)
  );

  if (results.length === 0) {
    container.innerHTML = `<div class="search-empty">No matching results for "<strong>${escapeHtml(query)}</strong>"</div>`;
    return;
  }

  container.innerHTML = results.map(item => renderSearchResult(item)).join('');
}

function renderSearchResult(item) {
  return `
    <a href="${item.url}" class="search-result-item" onclick="closeSearchModal()">
      <div class="result-top">
        <span class="result-title">${escapeHtml(item.title)}</span>
        <span class="result-category">${escapeHtml(item.category)}</span>
      </div>
      <div class="result-desc">${escapeHtml(item.desc)}</div>
    </a>
  `;
}

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, m => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[m]);
}
