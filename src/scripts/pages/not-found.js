import BasePage from './base-page';

class NotFoundPage extends BasePage {
  static async render() {
    return `
      <section id="content">
        <div id="error_content" class="not-found">
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
