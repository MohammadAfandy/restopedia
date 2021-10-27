import LikeRestoView from '../../src/scripts/views/like-resto-view';
import SnackBarInitiator from '../../src/scripts/utils/snackbar-initiator';
import '../../src/scripts/components/LikeButton/like-button';

beforeAll(async () => {
  await SnackBarInitiator.init();
  spyOn(SnackBarInitiator, 'show');
});

const addLikeButtonContainer = () => {
  document.body.innerHTML = LikeRestoView.getTemplate();
};

export { addLikeButtonContainer, SnackBarInitiator };
