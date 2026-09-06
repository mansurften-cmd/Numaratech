/**
 * Screen-reader status for the calculators.
 *
 * Both calculators update a table of figures on every keystroke. Sighted
 * users see the numbers move; a screen reader user heard nothing at all,
 * because none of it was in a live region (AUDIT-LOCAL finding 2).
 *
 * Putting aria-live on the whole table is the obvious fix and the wrong one:
 * every changed cell is read out in isolation — "84,704" — with no label, and
 * a single edit changes seven cells. Instead each calculator carries one
 * visually hidden sentence built from a template, updated once after typing
 * settles, and marked atomic so the whole sentence is read together.
 *
 * Deliberately decoupled from the computation scripts: this observes the
 * rendered output rather than hooking the maths, so the tested Corporate Tax
 * logic is untouched and the same module serves both pages.
 *
 * Markup contract:
 *   <p class="nt-sr-only" data-live-status
 *      data-live-attr="data-out"
 *      data-live-template="Taxable income {taxable}. Corporate Tax {tax}.">
 *   </p>
 * inside an ancestor marked data-live-scope. {key} resolves to the text of
 * [data-live-attr="key"] within that scope.
 */

const SETTLE_MS = 600;

function resolve(scope: Element, attr: string, template: string): string {
  return template.replace(/\{([a-zA-Z0-9_-]+)\}/g, (_, key) => {
    const cell = scope.querySelector(`[${attr}="${key}"]`);
    return cell?.textContent?.trim() ?? '';
  });
}

for (const status of document.querySelectorAll<HTMLElement>('[data-live-status]')) {
  const attr = status.dataset.liveAttr;
  const template = status.dataset.liveTemplate;
  const scope = status.closest<HTMLElement>('[data-live-scope]');
  if (!attr || !template || !scope) continue;

  status.setAttribute('aria-atomic', 'true');
  // Set the initial sentence while the region is still inert, so page load
  // does not announce it. Only changes should speak.
  status.textContent = resolve(scope, attr, template);
  requestAnimationFrame(() => status.setAttribute('aria-live', 'polite'));

  let timer: number | undefined;
  const observer = new MutationObserver((records) => {
    const relevant = records.some((r) => {
      const node = r.target instanceof Element ? r.target : r.target.parentElement;
      return !!node?.closest(`[${attr}]`) && !status.contains(node);
    });
    if (!relevant) return;
    window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      const next = resolve(scope, attr, template);
      if (next !== status.textContent) status.textContent = next;
    }, SETTLE_MS);
  });
  observer.observe(scope, { subtree: true, childList: true, characterData: true });
}
