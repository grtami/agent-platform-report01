(function () {
  'use strict';

  let appData = null;
  const charts = {};

  // ── Data Loading ──
  async function loadData() {
    const resp = await fetch('data.json');
    if (!resp.ok) throw new Error('Failed to load data.json');
    appData = await resp.json();
    renderAll();
  }

  // ── Render All ──
  function renderAll() {
    renderHero();
    renderBackground();
    renderProductGoals();
    renderMyRole();
    renderMethodology();
    renderSampleNote();
    renderTestTask();
    renderPlatforms();
    renderMatrix();
    renderScoringNote();
    renderFindings();
    renderNextSteps();
    renderConclusion();
    renderWorkflow();
    renderScreenshots();
    initLightbox();
    initCharts();
  }

  // ── Hero ──
  function renderHero() {
    const { meta, platforms } = appData;
    document.title = meta.title;
    document.getElementById('heroBadge').textContent = `竞品分析报告 · ${meta.year || 2026}`;
    document.getElementById('heroTitle').textContent = meta.title;
    document.getElementById('heroSubtitle').textContent = meta.subtitle;
    document.getElementById('heroConclusion').textContent = meta.conclusion;

    const statsEl = document.getElementById('heroStats');
    statsEl.innerHTML = platforms.map(p => `
      <div class="stat-item">
        <div class="stat-value" style="color:${p.color}">${p.overallScore}</div>
        <div class="stat-label">${p.name}</div>
      </div>
    `).join('');
  }

  // ── Background ──
  function renderBackground() {
    const { background } = appData;
    document.getElementById('backgroundTitle').textContent = background.title;
    document.getElementById('backgroundContent').textContent = background.content;
  }

  // ── Product Goals ──
  function renderProductGoals() {
    const { productGoals } = appData;
    document.getElementById('productGoalsTitle').textContent = productGoals.title;
    document.getElementById('productGoalsIntro').textContent = productGoals.intro;
    document.getElementById('productGoalsGrid').innerHTML = productGoals.cards.map(c => `
      <div class="pm-card">
        <div class="pm-card-header">
          <span class="pm-card-icon">${c.icon}</span>
          <span class="pm-card-label">${c.label}</span>
        </div>
        <ul class="pm-card-list">
          ${c.items.map(i => `<li>${i}</li>`).join('')}
        </ul>
      </div>
    `).join('');
    document.getElementById('successMetrics').innerHTML = `
      <h3 class="metrics-title">成功指标（MVP 验证标准）</h3>
      <div class="metrics-row">
        ${productGoals.successMetrics.map(m => `
          <div class="metric-card">
            <div class="metric-icon">${m.icon}</div>
            <div class="metric-name">${m.metric}</div>
            <div class="metric-target">${m.target}</div>
          </div>
        `).join('')}
      </div>
    `;
  }

  // ── My Role ──
  function renderMyRole() {
    const { myRole } = appData;
    document.getElementById('myRoleTitle').textContent = myRole.title;
    document.getElementById('myRoleIntro').textContent = myRole.intro;
    document.getElementById('myRoleGrid').innerHTML = myRole.responsibilities.map(r => `
      <div class="role-card" style="--role-color:${r.color}">
        <div class="role-area" style="color:${r.color}">${r.area}</div>
        <ul class="role-list">
          ${r.items.map(i => `<li>${i}</li>`).join('')}
        </ul>
      </div>
    `).join('');
    document.getElementById('myDeliverables').innerHTML = `
      <h3 class="deliverables-title">核心交付物</h3>
      <ul class="deliverables-list">
        ${myRole.deliverables.map(d => `<li>${d}</li>`).join('')}
      </ul>
    `;
  }

  // ── Methodology ──
  function renderMethodology() {
    const { methodology } = appData;
    document.getElementById('methodologyTitle').textContent = methodology.title;
    document.getElementById('methodologyContent').innerHTML = `
      <p>${methodology.intro}</p>
      <ul class="sample-note-list">
        ${methodology.steps.map(s => `<li>${s}</li>`).join('')}
      </ul>
    `;
  }

  // ── Sample Note ──
  function renderSampleNote() {
    const { sampleNote } = appData;
    document.getElementById('sampleNoteTitle').textContent = sampleNote.title;
    document.getElementById('sampleNoteContent').innerHTML = `
      <p>${sampleNote.intro}</p>
      <ul class="sample-note-list">
        ${sampleNote.details.map(d => `<li>${d}</li>`).join('')}
      </ul>
    `;
  }

  // ── Test Task ──
  function renderTestTask() {
    const { testTask } = appData;
    document.getElementById('testTaskTitle').textContent = testTask.title;
    document.getElementById('testTaskDesc').textContent = testTask.description;

    document.getElementById('testInputs').innerHTML = testTask.inputs
      .map(i => `<li>${i}</li>`).join('');
    document.getElementById('testOutputs').innerHTML = testTask.outputs
      .map(o => `<li>${o}</li>`).join('');

    document.getElementById('flowTimeline').innerHTML = testTask.flow
      .map(f => `
        <div class="flow-step">
          <div class="flow-num">Step ${f.step}</div>
          <div class="flow-icon">${f.icon}</div>
          <div class="flow-label">${f.label}</div>
        </div>
      `).join('');
  }

  // ── Platform Cards ──
  function renderPlatforms() {
    const grid = document.getElementById('platformGrid');
    grid.innerHTML = appData.platforms.map(p => `
      <div class="platform-card" style="--platform-color:${p.color}">
        <div class="platform-score" style="color:${p.color}">${p.overallScore}</div>
        <div class="platform-name" style="color:${p.color}">${p.name}</div>
        <div class="platform-positioning">${p.positioning}</div>

        <div class="platform-field">
          <div class="platform-field-label">适合用户</div>
          <div class="platform-field-value">${p.targetUsers}</div>
        </div>

        <div class="platform-field">
          <div class="platform-field-label">核心关键词</div>
          <div class="platform-keywords">
            ${p.keywords.map(k => `<span class="keyword-tag" style="border-color:${p.color}33;color:${p.color}">${k}</span>`).join('')}
          </div>
        </div>

        <div class="platform-field">
          <div class="platform-field-label">主要优势</div>
          <ul class="platform-list strengths">
            ${p.strengths.map(s => `<li>${s}</li>`).join('')}
          </ul>
        </div>

        <div class="platform-field">
          <div class="platform-field-label">主要短板</div>
          <ul class="platform-list weaknesses">
            ${p.weaknesses.map(w => `<li>${w}</li>`).join('')}
          </ul>
        </div>

        <div class="platform-summary">${p.summary}</div>
      </div>
    `).join('');
  }

  // ── Matrix ──
  function scoreClass(val) {
    if (val >= 8) return 'score-high';
    if (val >= 6) return 'score-mid';
    return 'score-low';
  }

  function renderMatrix() {
    const { matrix } = appData;
    document.getElementById('matrixTitle').textContent = matrix.title;

    const thead = document.querySelector('#matrixTable thead');
    const tbody = document.querySelector('#matrixTable tbody');

    thead.innerHTML = `
      <tr>
        <th>维度</th>
        <th style="color:#6366f1">${matrix.labels.dify}</th>
        <th style="color:#06b6d4">${matrix.labels.coze}</th>
        <th style="color:#a855f7">${matrix.labels.relevance}</th>
      </tr>
    `;

    tbody.innerHTML = matrix.dimensions.map((dim, i) => `
      <tr>
        <td>${dim}</td>
        <td><span class="score-cell ${scoreClass(matrix.scores.dify[i])}">${matrix.scores.dify[i]}</span></td>
        <td><span class="score-cell ${scoreClass(matrix.scores.coze[i])}">${matrix.scores.coze[i]}</span></td>
        <td><span class="score-cell ${scoreClass(matrix.scores.relevance[i])}">${matrix.scores.relevance[i]}</span></td>
      </tr>
    `).join('');
  }

  // ── Scoring Note ──
  function renderScoringNote() {
    const { scoringNote } = appData;
    const html = `
      <div class="scoring-note-icon">ℹ</div>
      <div class="scoring-note-body">
        <strong>${scoringNote.title}</strong>
        <p>${scoringNote.content}</p>
      </div>
    `;
    document.getElementById('scoringNote').innerHTML = html;
    document.getElementById('scoringNoteCharts').innerHTML = html;
  }

  // ── Findings ──
  function renderFindings() {
    const { findings } = appData;
    document.getElementById('findingsTitle').textContent = findings.title;
    document.getElementById('findingsList').innerHTML = findings.items.map(f => `
      <div class="finding-item">
        <div class="finding-num">${f.id}</div>
        <div class="finding-text">${f.text}</div>
      </div>
    `).join('');
  }

  // ── Next Steps ──
  function renderNextSteps() {
    const { nextSteps } = appData;
    document.getElementById('nextStepsTitle').textContent = nextSteps.title;
    document.getElementById('nextStepsIntro').textContent = nextSteps.intro;
    document.getElementById('nextStepsGrid').innerHTML = nextSteps.items.map(item => `
      <div class="next-steps-card" style="--ns-color:${item.color}">
        <div class="next-steps-phase" style="color:${item.color}">${item.phase}</div>
        <ul class="next-steps-list">
          ${item.points.map(p => `<li>${p}</li>`).join('')}
        </ul>
      </div>
    `).join('');
  }

  // ── Conclusion ──
  function renderConclusion() {
    const { finalConclusion } = appData;
    document.getElementById('conclusionTitle').textContent = finalConclusion.title;
    document.getElementById('conclusionText').textContent = finalConclusion.content;
    document.getElementById('conclusionScenarios').innerHTML = finalConclusion.scenarios.map(s => `
      <div class="conclusion-scenario-card" style="--sc-color:${s.color}">
        <div class="conclusion-scenario-label">${s.scenario}</div>
        <div class="conclusion-scenario-platform" style="color:${s.color}">${s.platform}</div>
        <ul class="conclusion-scenario-reasons">
          ${s.reasons.map(r => `<li>${r}</li>`).join('')}
        </ul>
      </div>
    `).join('');
  }

  // ── Workflow ──
  function renderWorkflow() {
    const { workflowComparison } = appData;
    document.getElementById('workflowTitle').textContent = workflowComparison.title;
    document.getElementById('workflowGrid').innerHTML = workflowComparison.items.map(w => `
      <div class="workflow-card" style="--wf-color:${w.color}">
        <div class="workflow-platform" style="color:${w.color}">${w.platform}</div>
        <div class="workflow-approach">${w.approach}</div>
        <ul class="workflow-details">
          ${w.details.map(d => `<li>${d}</li>`).join('')}
        </ul>
      </div>
    `).join('');
  }

  // ── Screenshots ──
  function renderScreenshots() {
    const { screenshots } = appData;
    document.getElementById('screenshotsTitle').textContent = screenshots.title;
    document.getElementById('screenshotsDesc').textContent = screenshots.description;
    document.getElementById('screenshotGallery').innerHTML = screenshots.items.map(s => `
      <figure class="screenshot-card" style="--ss-color:${s.color}">
        <div class="screenshot-header">
          <span class="screenshot-platform" style="color:${s.color}">${s.platform}</span>
          <span class="screenshot-caption">${s.caption}</span>
        </div>
        <div class="screenshot-frame">
          <img class="screenshot-img" src="${s.src}" alt="${s.alt}" loading="lazy" data-insight="${s.insight || ''}">
        </div>
        <figcaption class="screenshot-insight">${s.insight || ''}</figcaption>
      </figure>
    `).join('');
  }

  // ── Lightbox ──
  function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const closeBtn = document.getElementById('lightboxClose');

    document.getElementById('screenshotGallery').addEventListener('click', e => {
      const img = e.target.closest('.screenshot-img');
      if (!img) return;
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightboxCaption.textContent = img.alt + (img.dataset.insight ? ' — ' + img.dataset.insight : '');
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });

    function closeLightbox() {
      lightbox.classList.remove('open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      lightboxImg.src = '';
    }

    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', e => {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
    });
  }

  // ── ECharts ──
  function initCharts() {
    initRadarChart();
    initBarChart();
    initScatterChart();
    window.addEventListener('resize', handleResize);
  }

  function handleResize() {
    Object.values(charts).forEach(c => c && c.resize());
  }

  function getPlatformColor(id) {
    const p = appData.platforms.find(x => x.id === id);
    return p ? p.color : '#6366f1';
  }

  // Radar
  function initRadarChart() {
    const { matrix } = appData;
    const el = document.getElementById('radarChart');
    charts.radar = echarts.init(el);

    const indicator = matrix.dimensions.map(d => ({ name: d, max: 10 }));

    const seriesData = [
      { key: 'dify', name: matrix.labels.dify },
      { key: 'coze', name: matrix.labels.coze },
      { key: 'relevance', name: matrix.labels.relevance }
    ].map(s => ({
      name: s.name,
      type: 'radar',
      symbol: 'circle',
      symbolSize: 6,
      lineStyle: { width: 2 },
      areaStyle: { opacity: 0.12 },
      itemStyle: { color: getPlatformColor(s.key) },
      data: [{ value: matrix.scores[s.key], name: s.name }]
    }));

    charts.radar.setOption({
      backgroundColor: 'transparent',
      tooltip: { trigger: 'item' },
      legend: {
        bottom: 0,
        textStyle: { color: '#555555', fontSize: 12 },
        data: seriesData.map(s => s.name)
      },
      radar: {
        indicator,
        center: ['50%', '48%'],
        radius: '62%',
        axisName: { color: '#555555', fontSize: 11 },
        splitArea: { areaStyle: { color: ['rgba(0,0,0,0.01)', 'rgba(0,0,0,0.02)'] } },
        splitLine: { lineStyle: { color: '#E8E3DA' } },
        axisLine: { lineStyle: { color: '#E8E3DA' } }
      },
      series: seriesData
    });
  }

  // Bar
  function initBarChart() {
    const el = document.getElementById('barChart');
    charts.bar = echarts.init(el);

    const sorted = [...appData.platforms].sort((a, b) => b.overallScore - a.overallScore);

    charts.bar.setOption({
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis',
        formatter: '{b}: {c} 分'
      },
      grid: { left: 60, right: 30, top: 30, bottom: 40 },
      xAxis: {
        type: 'category',
        data: sorted.map(p => p.name),
        axisLabel: { color: '#555555', fontSize: 12 },
        axisLine: { lineStyle: { color: '#E8E3DA' } },
        axisTick: { show: false }
      },
      yAxis: {
        type: 'value',
        min: 0,
        max: 10,
        splitLine: { lineStyle: { color: '#EFEBE4' } },
        axisLabel: { color: '#8C8C8C' },
        axisLine: { show: false },
        axisTick: { show: false }
      },
      series: [{
        type: 'bar',
        barWidth: '45%',
        data: sorted.map(p => ({
          value: p.overallScore,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: p.color },
              { offset: 1, color: p.color + '88' }
            ]),
            borderRadius: [2, 2, 0, 0]
          }
        })),
        label: {
          show: true,
          position: 'top',
          color: '#1A1A1A',
          fontWeight: 700,
          fontSize: 14,
          formatter: '{c}'
        }
      }]
    });
  }

  // Scatter / Positioning
  function initScatterChart() {
    const el = document.getElementById('scatterChart');
    charts.scatter = echarts.init(el);

    const data = appData.platforms.map(p => ({
      name: p.name,
      value: [p.position.easeOfUse, p.position.enterpriseAutomation],
      itemStyle: { color: p.color }
    }));

    charts.scatter.setOption({
      backgroundColor: 'transparent',
      tooltip: {
        formatter: params => {
          const p = appData.platforms.find(x => x.name === params.name);
          return `<strong>${params.name}</strong><br/>
            低代码易用性: ${p.position.easeOfUse}<br/>
            企业/业务自动化: ${p.position.enterpriseAutomation}`;
        }
      },
      grid: { left: 70, right: 50, top: 50, bottom: 60 },
      xAxis: {
        name: '低代码易用性 →',
        nameLocation: 'center',
        nameGap: 35,
        nameTextStyle: { color: '#555555', fontSize: 13 },
        min: 4,
        max: 10,
        splitLine: { lineStyle: { color: '#EFEBE4' } },
        axisLabel: { color: '#8C8C8C' },
        axisLine: { lineStyle: { color: '#E8E3DA' } },
        axisTick: { show: false }
      },
      yAxis: {
        name: '企业 / 业务自动化能力 →',
        nameLocation: 'center',
        nameGap: 50,
        nameTextStyle: { color: '#555555', fontSize: 13 },
        min: 4,
        max: 10,
        splitLine: { lineStyle: { color: '#EFEBE4' } },
        axisLabel: { color: '#8C8C8C' },
        axisLine: { lineStyle: { color: '#E8E3DA' } },
        axisTick: { show: false }
      },
      series: [{
        type: 'scatter',
        symbolSize: 28,
        data,
        label: {
          show: true,
          formatter: '{b}',
          position: 'top',
          color: '#1A1A1A',
          fontSize: 13,
          fontWeight: 600,
          distance: 12
        },
        markArea: {
          silent: true,
          data: [
            [{
              name: '业务自动化型',
              xAxis: 7,
              yAxis: 8,
              itemStyle: { color: 'rgba(168,85,247,0.04)' },
              label: { color: '#a855f7', fontSize: 11, opacity: 0.5 }
            }, { xAxis: 10, yAxis: 10 }],
            [{
              name: '低代码友好型',
              xAxis: 8,
              yAxis: 4,
              itemStyle: { color: 'rgba(6,182,212,0.04)' },
              label: { color: '#06b6d4', fontSize: 11, opacity: 0.5 }
            }, { xAxis: 10, yAxis: 7 }],
            [{
              name: '工程化企业型',
              xAxis: 4,
              yAxis: 8,
              itemStyle: { color: 'rgba(99,102,241,0.04)' },
              label: { color: '#6366f1', fontSize: 11, opacity: 0.5 }
            }, { xAxis: 7, yAxis: 10 }]
          ]
        }
      }]
    });
  }

  // ── Navigation Toggle ──
  function initNav() {
    const toggle = document.getElementById('navToggle');
    const links = document.getElementById('navLinks');

    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
    });

    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => links.classList.remove('open'));
    });

    const nav = document.getElementById('nav');
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 10);
    });
  }

  // ── Boot ──
  document.addEventListener('DOMContentLoaded', () => {
    initNav();
    loadData().catch(err => {
      console.error(err);
      document.body.innerHTML = `<div style="padding:40px;color:#C41E3A;text-align:center;font-family:sans-serif;">
        <h2>数据加载失败</h2><p style="color:#555;">请确保 data.json 与 index.html 在同一目录，并通过 HTTP 服务访问（如 GitHub Pages）。</p>
        <p style="color:#8C8C8C;margin-top:12px;">${err.message}</p>
      </div>`;
    });
  });
})();
