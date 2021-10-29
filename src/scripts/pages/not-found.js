import BasePage from './base-page';

class NotFoundPage extends BasePage {
  static async render() {
    return `
      <section id="content">
        <div class="error-content">
          404 - Page Not Found</div id="error_content">
        </div>
      </section>
    `;
  }

  static async afterRender() {
    return `
    `;
  }
}

export default NotFoundPage;
