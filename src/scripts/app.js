import UrlParser from './utils/url-parser';
import routes from './routes/routes';

// import initial component to create app shell
import './components/AppBar/app-bar';
import './components/MainContent/main-content';
import './components/SkipToContent/skip-to-content';
import './components/FooterElement/footer-element';
import './components/SnackBar/snack-bar';
import './components/SkeletonElement/skeleton-element';

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

  getPage() {
    return routes[this.url] || routes['/not-found'];
  }

  async renderPage() {
    window.scrollTo({ top: 0 });
    this.url = UrlParser.parseActiveUrlWithCombiner();

    const Page = this.getPage();

    // set current url to set active menu on navbar
    this.appBar.currentUrl = this.url;

    await this.mainContent.setContent(await Page.render());
    await Page.afterRender();
  }
}

export default App;
