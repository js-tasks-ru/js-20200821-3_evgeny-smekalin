export default class NotificationMessage {
  element;

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

  removeIfShown() {
    const notification = document.querySelector('div.notification');

    if (notification) {
      notification.remove();
    }
  }

  show(targetElement) {
    if (targetElement) {
      targetElement.append(this.element);
      this.element = targetElement;
    }

    this.removeIfShown();

    document.body.append(this.element);

    setTimeout(() => {
      this.remove();
    }, this.duration);
  }

  update() {

  }

  remove () {
    this.element.remove();
  }

  destroy() {
    this.element.remove();
  }
}
