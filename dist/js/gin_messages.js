!function(Drupal) {
  Drupal.behaviors.ginMessagesDismiss = {
    attach: function() {
      document.querySelectorAll(".messages .button--dismiss").forEach((function(message) {
        message.addEventListener("click", (function(event) {
          event.preventDefault();
          var element = event.target.closest(".messages-list__item");
          element.style.opacity = 0, element.addEventListener("transitionend", (function() {
            element.classList.add("visually-hidden"), element.style.opacity = 1;
          }));
        }));
      }));
    }
  };
}(Drupal);