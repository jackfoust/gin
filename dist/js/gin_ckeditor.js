!function(Drupal, drupalSettings) {
  Drupal.behaviors.ginCKEditorContextMenu = {
    attach: function() {
      if (window.CKEDITOR && void 0 !== CKEDITOR) {
        if (drupalSettings.path.currentPath.indexOf("admin/config/content/formats/manage") > -1) return;
        var accentCss = drupalSettings.gin.accent_css_path, contentsCss = drupalSettings.gin.ckeditor_css_path, accentColorPreset = drupalSettings.gin.preset_accent_color, ginClasses = new Array;
        drupalSettings.gin.darkmode && ginClasses.push(drupalSettings.gin.darkmode_class), 
        drupalSettings.gin.highcontrastmode && ginClasses.push(drupalSettings.gin.highcontrastmode_class), 
        void 0 === CKEDITOR.config.contextmenu_contentsCss && (CKEDITOR.config.contextmenu_contentsCss = new Array, 
        CKEDITOR.config.contextmenu_contentsCss.push(CKEDITOR.skin.getPath("editor")), CKEDITOR.config.contextmenu_contentsCss.push(accentCss), 
        CKEDITOR.config.contextmenu_contentsCss.push(contentsCss)), CKEDITOR.on("instanceReady", (function() {
          Drupal.behaviors.ginCKEditorContextMenu.setClasses(".cke_wysiwyg_frame", ginClasses, accentColorPreset);
        })), new MutationObserver((function() {
          Drupal.behaviors.ginCKEditorContextMenu.setClasses("body > .cke_menu_panel > iframe", ginClasses, accentColorPreset);
        })).observe(document.body, {
          childList: !0
        });
      }
    },
    setClasses: function(element, ginClasses, accentColorPreset) {
      document.querySelectorAll(element).forEach((function(element) {
        var bodyCKE = null == element ? void 0 : element.contentDocument.querySelector("body");
        if (!bodyCKE) return !1;
        bodyCKE.setAttribute("data-gin-accent", accentColorPreset), ginClasses.forEach((function(ginClass) {
          bodyCKE.classList.add(ginClass);
        }));
      }));
    }
  };
}(Drupal, drupalSettings);