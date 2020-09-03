export default class ColumnChart {
  element; // HTMLElement;
  chartHeight = 50;

  constructor(data) {
    this.data = data;
    this.render();
  }

  get template() {
    return `
        <div class="column-chart ${this.isDataExist() ? '' : 'column-chart_loading'}" style="--chart-height: 50">
          <div class="column-chart__title">
            ${this.getLabel()}
            ${this.getLink()}
          </div>
          <div class="column-chart__container">
            <div data-element="header" class="column-chart__header">
              ${this.getValue()}
            </div>
            <div data-element="body" class="column-chart__chart">
              ${this.getColumns()}
            </div>
          </div>
        </div>
    `;
  }

  isDataExist() {
    return this.data?.data && this.data.data.length > 0
  }

  getLabel() {
    if (! this.data?.label) {
      return '';
    }

    return 'Total ' + this.data.label;
  }

  getLink() {
    if (! this.data?.link) {
      return '';
    }

    return `<a class="column-chart__link" href="${this.data.link}">View all</a>`;
  }

  getValue() {
    if (! this.data?.value) {
      return '';
    }

    return this.data.value;
  }

  getColumns() {
    if (! this.isDataExist()) {
      return '';
    }

    const chart = [];
    const maxValue = Math.max(...this.data.data);
    const chartRatio = this.chartHeight / Math.max(...this.data.data);

    this.data.data.forEach(value => {
      const heigh = parseInt(chartRatio * value)
      const percent = Math.round(value / maxValue * 100);

      chart.push(`<div style="--value: ${heigh}" data-tooltip="${percent}%"></div>`);
    })

    return chart.join('');
  }

  update(newData) {
    this.data = newData;
    this.render();
  }

  render() {
    const element = document.createElement('div');

    element.innerHTML = this.template;

    this.element = element.firstElementChild;
  }

  remove () {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}
