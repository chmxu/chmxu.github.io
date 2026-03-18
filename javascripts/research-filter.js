(function () {
  const form = document.getElementById('filterForm');
  if (!form) return;

  const yearFilter = document.getElementById('yearFilter');
  const typeFilter = document.getElementById('typeFilter');
  const searchFilter = document.getElementById('searchFilter');
  const resetFilter = document.getElementById('resetFilter');
  const statusNode = document.getElementById('filterStatus');

  const papers = Array.from(document.querySelectorAll('.paper-item'));
  const paperLists = Array.from(document.querySelectorAll('.paper-list'));
  const yearHeadings = Array.from(document.querySelectorAll('.year-heading'));
  const groups = Array.from(document.querySelectorAll('.paper-group'));

  function normalize(str) {
    return (str || '').toLowerCase().trim();
  }

  function matches(paper) {
    const year = yearFilter.value;
    const type = typeFilter.value;
    const query = normalize(searchFilter.value);

    const paperYear = paper.dataset.year || '';
    const paperType = paper.dataset.type || '';
    const searchText = normalize([
      paper.dataset.search,
      paper.querySelector('.paper-title')?.textContent,
      paper.querySelector('.paper-authors')?.textContent,
      paper.querySelector('.paper-meta')?.textContent
    ].join(' '));

    if (year !== 'all' && paperYear !== year) return false;
    if (type !== 'all' && paperType !== type) return false;
    if (query && !searchText.includes(query)) return false;

    return true;
  }

  function applyFilter() {
    let visibleCount = 0;

    papers.forEach((paper) => {
      const show = matches(paper);
      paper.classList.toggle('is-hidden', !show);
      if (show) visibleCount += 1;
    });

    paperLists.forEach((list) => {
      const hasVisible = Array.from(list.querySelectorAll('.paper-item')).some(
        (item) => !item.classList.contains('is-hidden')
      );
      list.classList.toggle('is-hidden', !hasVisible);
    });

    yearHeadings.forEach((heading) => {
      const nextList = heading.nextElementSibling;
      const hidden = !nextList || nextList.classList.contains('is-hidden');
      heading.classList.toggle('is-hidden', hidden);
    });

    groups.forEach((group) => {
      const hasVisible = Array.from(group.querySelectorAll('.paper-item')).some(
        (item) => !item.classList.contains('is-hidden')
      );
      group.classList.toggle('is-hidden', !hasVisible);
    });

    statusNode.textContent = `${visibleCount} publication${visibleCount === 1 ? '' : 's'} found.`;
  }

  [yearFilter, typeFilter, searchFilter].forEach((node) => {
    node.addEventListener('input', applyFilter);
    node.addEventListener('change', applyFilter);
  });

  resetFilter.addEventListener('click', () => {
    yearFilter.value = 'all';
    typeFilter.value = 'all';
    searchFilter.value = '';
    applyFilter();
  });

  applyFilter();
})();
