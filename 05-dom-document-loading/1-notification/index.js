export default class NotificationMessage {
  element;
  static shownElement;
  static timer;

  constructor(label = '', {
    duration = 0,
    type = '',
  } = {}) {
    this.label = label;
    this.duration = duration;
    this.type = type;

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
  }

  show(targetElement) {
    if (NotificationMessage.timer) {
      clearTimeout(NotificationMessage.timer);
      this.remove();
    }

     if (targetElement) {
      targetElement.append(this.element);
      this.element = targetElement;
    } else {
      document.body.append(this.element);
    }

    NotificationMessage.shownElement = this.element;

    NotificationMessage.timer = setTimeout(() => {
      this.remove();
    }, this.duration);
  }

  remove () {
    NotificationMessage.shownElement.remove();
    NotificationMessage.timer = null;
  }

  destroy() {
    this.element.remove();
  }
}
