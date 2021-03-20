/**
 * @file
 * JavaScript file to dismiss messages
 */

/* eslint-disable func-names, no-mutable-exports, comma-dangle, strict */

'use strict';

((Drupal) => {
  Drupal.behaviors.ginMessagesDismiss = {
    attach: function() {
      document.querySelectorAll('.messages .button--dismiss').forEach(message => {
        message.addEventListener('click', event => {
          event.preventDefault();
          const element = event.target.closest('.messages-list__item');

          element.style.opacity = 0;

          element.addEventListener('transitionend', () => {
            element.classList.add('visually-hidden');
            element.style.opacity = 1;
          });
        });
      });
    }
  }
})(Drupal);
