export default class ColumnChart {
  element; // HTMLElement;
  subElements = {};
  chartHeight = 50;

  constructor({
    data = [],
    label = '',
    value = 0,
    link = '',
  } = {}) {
    this.data = data;
    this.label = label;
    this.value = value;
    this.link = link;

    this.render();
  }

  get template() {
    return `
        <div class="column-chart ${this.data.length > 0 ? '' : 'column-chart_loading'}" style="--chart-height: 50">
          <div class="column-chart__title">
            ${this.getLabel()}
            ${this.getLink()}
          </div>
          <div class="column-chart__container">
            <div data-element="header" class="column-chart__header">
              ${this.value}
            </div>
            <div data-element="body" class="column-chart__chart">
              ${this.getColumns()}
            </div>
          </div>
        </div>
    `;
  }

  getLabel() {
    return this.label ? 'Total ' + this.label : '';
  }

  getLink() {
    return this.link ? `<a class="column-chart__link" href="${this.link}">View all</a>` : '';
  }

  getColumns() {
    const maxValue = Math.max(...this.data);
    const chartRatio = this.chartHeight / Math.max(...this.data);

    return this.data.map(value => {
      const heigh = Math.floor(chartRatio * value)
      const percent = (value / maxValue * 100).toFixed(0);

      return `<div style="--value: ${heigh}" data-tooltip="${percent}%"></div>`;
    })
    .join('');
  }

  render() {
    const element = document.createElement('div');

    element.innerHTML = this.template;

    this.element = element.firstElementChild;
    this.subElements = this.getSubElements(this.element);
  }

  getSubElements(element) {
    const subElements = element.querySelectorAll('[data-element]')

    return [...subElements].reduce((accum, subElement) => {
      accum[subElement.dataset.element] = subElement;

      return accum;
    }, {});
  }

  update(newData = []) {
    this.data = newData;
    this.subElements.body.innerHTML = this.getColumns();
  }

  remove () {
    this.element.remove();
  }

  destroy() {
    this.remove();
    this.element = null;
    this.subElements = {};
  }
}
