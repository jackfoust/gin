/**
 * @file
 * JavaScript file for CKEditor overrides
 */

/* eslint-disable func-names, no-mutable-exports, comma-dangle, strict */

'use strict';

((Drupal, drupalSettings) => {
  Drupal.behaviors.ginCKEditorContextMenu = {
    attach: function attach() {
      if (window.CKEDITOR && CKEDITOR !== undefined) {
        // If on CKEditor config, do nothing.
        if (drupalSettings.path.currentPath.indexOf('admin/config/content/formats/manage') > -1) {
          return;
        }

        const accentCss = drupalSettings.gin.accent_css_path;
        const contentsCss = drupalSettings.gin.ckeditor_css_path;
        const accentColorPreset = drupalSettings.gin.preset_accent_color;

        // Collect Gin classes.
        let ginClasses = new Array();

        if (drupalSettings.gin.darkmode) {
          ginClasses.push(drupalSettings.gin.darkmode_class);
        }

        if (drupalSettings.gin.highcontrastmode) {
          ginClasses.push(drupalSettings.gin.highcontrastmode_class);
        }

        // Contextmenu styles.
        if (CKEDITOR.config.contextmenu_contentsCss === undefined) {
          CKEDITOR.config.contextmenu_contentsCss = new Array();
          CKEDITOR.config.contextmenu_contentsCss.push(CKEDITOR.skin.getPath('editor'));
          CKEDITOR.config.contextmenu_contentsCss.push(accentCss);
          CKEDITOR.config.contextmenu_contentsCss.push(contentsCss);
        }

        CKEDITOR.on('instanceReady', function() {
          // Main window of CKEDITOR.
          Drupal.behaviors.ginCKEditorContextMenu.setClasses('.cke_wysiwyg_frame', ginClasses, accentColorPreset);
        });

        // Watch for changes and inject styles.
        const observer = new MutationObserver(function() {
          // Contextmenu.
          Drupal.behaviors.ginCKEditorContextMenu.setClasses('body > .cke_menu_panel > iframe', ginClasses, accentColorPreset);
        });

        observer.observe(document.body, { childList: true });
      }
    },
    setClasses(element, ginClasses, accentColorPreset) {
      const elements = document.querySelectorAll(element);

      elements.forEach(element => {
        const bodyCKE = element?.contentDocument.querySelector('body');

        if (!bodyCKE) return false;
        bodyCKE.setAttribute('data-gin-accent', accentColorPreset);

        ginClasses.forEach(ginClass => {
          bodyCKE.classList.add(ginClass);
        });
      });
    }
  };
})(Drupal, drupalSettings);
