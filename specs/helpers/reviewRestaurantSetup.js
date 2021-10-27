import RestoReviewView from '../../src/scripts/views/resto-review-view';
import SnackBarInitiator from '../../src/scripts/utils/snackbar-initiator';
import '../../src/scripts/components/RestoReview/resto-review';

beforeAll(async () => {
  await SnackBarInitiator.init();
  spyOn(SnackBarInitiator, 'show');
});

const addReviewRestoContainer = () => {
  document.body.innerHTML = `
    ${RestoReviewView.getTemplate()}
    <snack-bar></snack-bar>
  `;
};

export { addReviewRestoContainer, SnackBarInitiator };
