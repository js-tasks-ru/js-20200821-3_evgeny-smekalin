export default class SortableTable {
  element; // HTMLElement;

  constructor(
    header = [],
    {data = []} = {data: []}
  ) {
    this.header = header;
    this.data = data;

    this.arrowTemplate = this.getaArrowTemplate();
    this.render();
  }

  getaArrowTemplate() {
    return `
      <span data-element="arrow" class="sortable-table__sort-arrow">
        <span class="sort-arrow"></span>
      </span>
    `;
  }

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
        ${this.getaArrowTemplate()}
      </div>`
    )
    .join('');
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
    return this.header.map(
      column => column.template ? column.template(row.images) : `<div class="sortable-table__cell">${row[column.id]}</div>`
    )
    .join('');
  }

  render() {
    const element = document.createElement('div');

    element.innerHTML = this.template;

    this.element = element.firstElementChild;
    this.subElements = this.getSubElements();
  }

  getSubElements() {
    const subElements = this.element.querySelectorAll('[data-element]');

    return [...subElements].reduce((accum, subElement) => {
      accum[subElement.dataset.element] = subElement;

      return accum;
    }, {});
  }

  sort(fieldValue, orderValue) {
    const direction = orderValue === 'desc' ? -1 : 1;
    const column = this.header.find(item => item.id === fieldValue);

    const sortedData = [...this.data].sort((row1, row2) => {
      switch(column.sortType) {
        case 'number': return direction * (row1[fieldValue] - row2[fieldValue]);
        case 'string': return direction * row1[fieldValue].localeCompare(row2[fieldValue], ['ru', 'en']);
        default: return direction * (row1[fieldValue] - row2[fieldValue]);
      }
    });

    const headers = this.element.querySelectorAll('.sortable-table__cell[data-id]');

    headers.forEach(header => {
      if (header.dataset.id === fieldValue) {
        header.dataset.order = orderValue;
      } else {
        header.dataset.order = '';
      }
    });

    this.subElements.body.innerHTML = this.fillBody(sortedData);
  }

  remove () {
    this.element.remove();
  }

  destroy() {
    this.remove();
    this.subElements = {};
  }
}

