export default class LikeRestoView {
  static getTemplate() {
    import('../components/LikeButton/like-button');
    return `
      <like-button></like-button>
    `;
  }

  static renderLikedButton(onLikeFn) {
    const likeButtonElement = document.querySelector('like-button');
    likeButtonElement.onLike = onLikeFn;
    likeButtonElement.isLiked = true;
    likeButtonElement.ariaLabel = 'Unlike this restaurant';
  }

  static renderUnlikedButton(onLikeFn) {
    const likeButtonElement = document.querySelector('like-button');
    likeButtonElement.onLike = onLikeFn;
    likeButtonElement.isLiked = false;
    likeButtonElement.ariaLabel = 'Like this restaurant';
  }
}
