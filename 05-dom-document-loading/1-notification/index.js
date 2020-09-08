export default class NotificationMessage {
  static shownElement;

  constructor(label = '', {
    duration = 0,
    type = '',
  } = {}) {
    this.label = label;
    this.duration = duration;
    this.type = type;

    if (NotificationMessage.shownElement) {
      NotificationMessage.shownElement.remove();
    }

    this.render();
  }

  get template() {
    return `
      <div class="notification ${this.type}" style="--value:${this.duration / 1000}s">
        <div class="timer"></div>
        <div class="inner-wrapper">
          <div class="notification-header">
            ${this.type}
          </div>
          <div class="notification-body">
            ${this.label}
          </div>
        </div>
      </div>`
    ;
  }

  render() {
    const element = document.createElement('div');

    element.innerHTML = this.template;

    this.element = element.firstElementChild;
    NotificationMessage.shownElement = this.element;
  }

  show(targetElement = document.body) {
    targetElement.append(this.element);

    setTimeout(() => {
      this.remove();
    }, this.duration);
  }

  remove () {
    this.element.remove();
  }

  destroy() {
    this.element.remove();
  }
}
