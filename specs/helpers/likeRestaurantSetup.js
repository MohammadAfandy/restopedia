import LikeRestoView from '../../src/scripts/views/like-resto-view';
import SnackBarInitiator from '../../src/scripts/utils/snackbar-initiator';
import '../../src/scripts/components/LikeButton/like-button';

beforeAll(() => {
  SnackBarInitiator.init();
  spyOn(SnackBarInitiator, 'show');
});

const addLikeButtonContainer = async () => {
  document.body.innerHTML = await LikeRestoView.getTemplate();
};

export { addLikeButtonContainer, SnackBarInitiator };
