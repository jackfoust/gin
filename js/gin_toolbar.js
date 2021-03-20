/**
 * @file
 * JavaScript file for Gin Toolbar
 */

/* eslint-disable func-names, no-mutable-exports, comma-dangle, strict */

'use strict';

((Drupal) => {
  Drupal.behaviors.ginToolbarToggle = {
    attach: function attach(context) {
      const body = document.querySelector('body');
      const trigger = context.querySelector('.toolbar-menu__trigger');
      const dataToolbarMenu = 'data-toolbar-menu';
      const activeClass = 'is-active';

      // Wrong context, exit
      if (!trigger) return;

      // Set sidebarState.
      if (localStorage.getItem('GinSidebarOpen') === 'true') {
        body.setAttribute(dataToolbarMenu, 'open');
        trigger.classList.add(activeClass);
      }
      else {
        body.removeAttribute(dataToolbarMenu);
        trigger.classList.remove(activeClass);
      }

      // Toolbar toggle
      trigger?.addEventListener('click', (event) => {
        event.preventDefault();
        const $this = event.target;

        // Toggle active class.
        $this.classList.toggle(activeClass);

        // Set active state.
        let active = 'true';
        if ($this.classList.contains(activeClass)) {
          body.setAttribute(dataToolbarMenu, 'open');
        }
        else {
          body.removeAttribute(dataToolbarMenu);
          active = 'false';
          document.querySelector('.gin-toolbar-inline-styles')?.remove();
        }

        // Write state to localStorage.
        localStorage.setItem('GinSidebarOpen', active);

        // Dispatch event.
        const customEvent = new CustomEvent('toolbar-toggle', { detail: active === 'true'})
        document.dispatchEvent(customEvent);
      });

      // Set sticky table width
      document.querySelector('.toolbar-menu-administration').addEventListener('transitionend', () => {
        Drupal.behaviors.ginToolbarToggle.updateStickyTableWidth();
      });
    },
    updateStickyTableWidth() {
      const element = document.querySelector('.sticky-header');
      if (!element) return;
      element.style.width = `${element.nextSibling.clientWidth}px`;
    }
  };
})(Drupal);
