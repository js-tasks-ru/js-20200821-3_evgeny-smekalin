export default class SortableTable {
  element; // HTMLElement;

  constructor(
    header = [],
    {data = []} = {data: []}
  ) {
    this.header = header;
    this.data = data;


    this.render();
    this.initEventListeners();
  }

  initEventListeners() {}

  get template() {
    return `
      <div data-element="productsContainer" class="products-list__container">
        <div class="sortable-table">

          <div data-element="header" class="sortable-table__header sortable-table__row">
            ${this.fillHeader(this.header)}
          </div>

          <div data-element="body" class="sortable-table__body">
            ${this.fillBody(this.data)}
          </div>

        </div>
      </div>
    `;
  }

  fillHeader(header) {
    return header.map(column => `
      <div class="sortable-table__cell" data-id="${column.id}" data-sortable="${column.sortable}">
        <span>${column.title}</span>
      </div>`
    )
    .join('');
  }

  getSortArrowElement() {
    const element = document.createElement('div');

    element.innerHTML = `
      <span data-element="arrow" class="sortable-table__sort-arrow">
        <span class="sort-arrow"></span>
      </span>`;

    return element.firstElementChild;
  }

  fillBody(body) {
    return body.map(row => `
      <a href="/products/3d-ochki-epson-elpgs03" class="sortable-table__row">
        ${this.fillRow(row)}
      </a>
    `)
    .join('');
  }

  fillRow(row) {
    return this.header.map(column => {
      if (column.template) {
        return column.template(row.images);
      }
      return `<div class="sortable-table__cell">${row[column.id]}</div>`;
    })
    .join('');
  }

  render() {
    const element = document.createElement('div');

    element.innerHTML = this.template;

    this.element = element.firstElementChild;
    this.sortArrow = this.getSortArrowElement();
    this.subElements = this.getSubElements();
    this.headerElements = this.getSortableElements();
  }

  getSubElements(querySelector) {
    const subElements = this.element.querySelectorAll('[data-element]');

    return [...subElements].reduce((accum, subElement) => {
      accum[subElement.dataset.element] = subElement;

      return accum;
    }, {});
  }

  getSortableElements(element) {
    const subElements = this.element.querySelectorAll('.sortable-table__header > .sortable-table__cell');

    return [...subElements].reduce((accum, subElement) => {
      const columnData = this.header.find(column => column.id === subElement.dataset.id);

      if (! columnData.sortable) {
        return accum;
      }

      accum[subElement.dataset.id] = {
        'element': subElement,
        'sortType': columnData.sortType,
      };

      return accum;
    }, {});
  }

  sort(fieldValue, orderValue) {
    if (! Object.keys(this.headerElements).includes(fieldValue) || (orderValue !== 'desc' && orderValue !== 'asc')) {
      return;
    }

    const direction = orderValue === 'desc' ? -1 : 1;
    let sortedData = [];

    if (this.headerElements[fieldValue].sortType === 'string') {
      sortedData = [...this.data].sort((row1, row2) =>
        direction * row1[fieldValue].localeCompare(row2[fieldValue], ['ru', 'en'], {caseFirst: 'upper'})
      );
    }

    if (this.headerElements[fieldValue].sortType === 'number') {
      sortedData = [...this.data].sort((row1, row2) =>
        direction * (row1[fieldValue] - row2[fieldValue])
      );
    }

    this.subElements.body.innerHTML = this.fillBody(sortedData);
    this.headerElements[fieldValue].element.dataset.order = orderValue;
    this.headerElements[fieldValue].element.append(this.sortArrow);
  }

  remove () {
    this.element.remove();
  }

  destroy() {
    this.remove();
    // additionally needed to remove all listeners...
  }
}

