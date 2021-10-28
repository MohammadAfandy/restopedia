import UrlParser from './utils/url-parser';
import routes from './routes/routes';

// import initial component to create app shell
import './components/AppBar/app-bar';
import './components/MainContent/main-content';
import './components/SkipToContent/skip-to-content';
import './components/SkeletonElement/skeleton-element';
import './components/FooterElement/footer-element';

// import initiator
import DarkModeHelper from './utils/dark-mode-helper';
import SnackBarInitiator from './utils/snackbar-initiator';

class App {
  constructor() {
    this.initialAppShell();
  }

  async initialAppShell() {
    this.appBar = document.querySelector('app-bar');
    this.mainContent = document.querySelector('main-content');

    // add another initiator
    DarkModeHelper.init();
    SnackBarInitiator.init();
  }

  getPageClass() {
    const PageClass = routes[this.url] || routes['/not-found'];
    return PageClass;
  }

  async renderPage() {
    window.scrollTo({ top: 0 });
    this.url = UrlParser.parseActiveUrlWithCombiner();

    const Page = this.getPageClass();

    // set current url to set active menu on navbar
    this.appBar.currentUrl = this.url;

    await this.mainContent.setContent(await Page.render());
    await Page.afterRender();
  }
}

export default App;
