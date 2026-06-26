(function () {
  var LESSONS = {
    'lesson-0': { href: '../lesson-0.html', label: 'הכנות' },
    'lesson-1': { href: '../lesson-1.html', label: 'Vibe Coding' },
    'lesson-2': { href: '../lesson-2.html', label: 'AI at Work' },
    'lesson-3': { href: '../lesson-3.html', label: 'אוטומציה' },
    'lesson-4': { href: '../lesson-4.html', label: 'בדיקות' },
  };

  // Detect lesson from URL path: /…/lesson-1/github.html → 'lesson-1'
  var pathParts = window.location.pathname.split('/');
  var lessonKey = null;
  for (var i = 0; i < pathParts.length; i++) {
    if (/^lesson-\d+$/.test(pathParts[i])) {
      lessonKey = pathParts[i];
      break;
    }
  }

  var lesson = lessonKey ? LESSONS[lessonKey] : null;
  if (!lesson) return; // not inside a lesson subdir — leave topbar as-is

  // Inject CSS for the two button styles
  var style = document.createElement('style');
  style.textContent = [
    '.back-lesson {',
    '  font-family: "JetBrains Mono", monospace; font-size: 11px; font-weight: 700;',
    '  letter-spacing: 0.08em; text-transform: uppercase;',
    '  color: var(--coral, #E04E36); padding: 6px 14px;',
    '  border: 1.5px solid var(--coral, #E04E36); border-radius: 6px;',
    '  text-decoration: none; transition: background 0.15s, color 0.15s;',
    '  flex-shrink: 0; white-space: nowrap;',
    '}',
    '.back-lesson:hover { background: var(--coral, #E04E36); color: #fff; }',
    '.back-home-secondary {',
    '  font-family: "JetBrains Mono", monospace; font-size: 11px; font-weight: 500;',
    '  letter-spacing: 0.06em; text-transform: uppercase;',
    '  color: var(--muted, #8B8A82); padding: 6px 12px;',
    '  border: 1.5px solid var(--border, #D8CCB5); border-radius: 6px;',
    '  text-decoration: none; transition: border-color 0.15s, color 0.15s;',
    '  flex-shrink: 0; white-space: nowrap;',
    '}',
    '.back-home-secondary:hover { border-color: var(--ink-soft, #4D556C); color: var(--ink-soft, #4D556C); }',
  ].join('\n');
  document.head.appendChild(style);

  function init() {
    var backHome = document.querySelector('.back-home');
    if (!backHome) return;

    // Insert lesson-back button before the home button
    var lessonBtn = document.createElement('a');
    lessonBtn.href = lesson.href;
    lessonBtn.className = 'back-lesson';
    lessonBtn.textContent = '← ' + lesson.label;
    backHome.parentNode.insertBefore(lessonBtn, backHome);

    // Demote the home button to secondary
    backHome.className = 'back-home-secondary';
    backHome.textContent = 'כל השיעורים';
    // Ensure href points to root index
    backHome.href = '../index.html';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
