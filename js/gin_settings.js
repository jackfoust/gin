/**
 * @file
 * JavaScript file for Gin Settings
 */

/* eslint-disable func-names, no-mutable-exports, comma-dangle, strict */

'use strict';

((Drupal, drupalSettings) => {
  Drupal.behaviors.ginSettings = {
    attach: function attach(context) {
      // Watch Darkmode setting has changed.
      context.querySelector('input[name="enable_darkmode"]')?.addEventListener('change', (event) => {
        const darkmode = event.target?.matches(':checked');
        const accentColorPreset = document.querySelector('[data-drupal-selector="edit-preset-accent-color"] input:checked').value;
        const focusColorPreset = document.querySelector('select[name="preset_focus_color"]')?.value;

        // Toggle Darkmode.
        Drupal.behaviors.ginSettings.darkmode(darkmode);

        // Set custom color if 'custom' is set.
        if (accentColorPreset === 'custom') {
          const accentColorSetting = context.querySelector('input[name="accent_color"]').value;

          Drupal.behaviors.ginAccent.setCustomAccentColor('custom', accentColorSetting);
        } else {
          Drupal.behaviors.ginAccent.setAccentColor(accentColorPreset);
        }

        // Toggle Focus color.
        Drupal.behaviors.ginAccent.setFocusColor(focusColorPreset);
      });

      // Watch Accent color setting has changed.
      context.querySelectorAll('[data-drupal-selector="edit-preset-accent-color"] input')?.forEach(element => {
        element.addEventListener('change', (event) => {
          const accentColorPreset = event.target.value;

          // Update.
          Drupal.behaviors.ginAccent.clearAccentColor();
          Drupal.behaviors.ginAccent.setAccentColor(accentColorPreset);

          // Set custom color if 'custom' is set.
          if (accentColorPreset === 'custom') {
            const accentColorSetting = document.querySelector('input[name="accent_color"]').value;

            Drupal.behaviors.ginAccent.setCustomAccentColor('custom', accentColorSetting);
          }
        });
      });

      // Watch Accent color setting has changed.
      context.querySelector('input[name="accent_color"]')?.addEventListener('change', (event) => {
        const accentColorSetting = event.target.value;

        // Update.
        Drupal.behaviors.ginAccent.setCustomAccentColor('custom', accentColorSetting);
      });

      // Watch Accent color setting has changed.
      context.querySelector('select[name="preset_focus_color"]')?.addEventListener('change', (event) => {
        const accentColorPreset = event.target.value;

        // Update.
        Drupal.behaviors.ginAccent.setFocusColor(accentColorPreset);
      });

      // Watch Accent color setting has changed.
      context.querySelector('input[name="focus_color"]')?.addEventListener('change', (event) => {
        const focusColorPreset = document.querySelector('select[name="preset_focus_color"]').value;
        const focusColorSetting = event.target.value;

        // Update.
        Drupal.behaviors.ginAccent.setFocusColor(focusColorPreset, focusColorSetting);
      });

      // Watch Hight contrast mode setting has changed.
      context.querySelector('input[name="high_contrast_mode"]')?.addEventListener('change', (event) => {
        const highContrastMode = event.target?.matches(':checked');

        // Update.
        Drupal.behaviors.ginSettings.setHighContrastMode(highContrastMode);
      });

      // Watch user settings has changed.
      context.querySelector('input[name="enable_user_settings"]')?.addEventListener('change', (event) => {
        const active = event.target?.matches(':checked');

        let darkmode = document.querySelector('input[name="enable_darkmode"]')?.matches(':checked');
        let accentColorSetting = context.querySelector('input[name="accent_color"]').value;
        let accentColorPreset = document.querySelector('[data-drupal-selector="edit-preset-accent-color"] input:checked').value;
        let highContrastMode = document.querySelector('input[name="high_contrast_mode"]')?.matches(':checked');

        // User setting disabled, use default settings instead.
        if (!active) {
          darkmode = drupalSettings.gin.default_darkmode;
          accentColorSetting = drupalSettings.gin.default_accent_color;
          accentColorPreset = drupalSettings.gin.default_preset_accent_color;
          highContrastMode = drupalSettings.gin.default_high_contrast_mode;
        }

        // Update.
        Drupal.behaviors.ginSettings.darkmode(darkmode);
        Drupal.behaviors.ginAccent.setAccentColor(accentColorPreset, accentColorSetting);
        Drupal.behaviors.ginSettings.setHighContrastMode(highContrastMode);
      });

      // Watch save
      context.querySelector('[data-drupal-selector="edit-submit"]')?.addEventListener('click', (event) => {
        let accentColorPreset = document.querySelector('[data-drupal-selector="edit-preset-accent-color"] input:checked').value;
        let accentColorSetting = context.querySelector('input[name="accent_color"]').value;

        // If on user form, check if we enable or disable the overrides.
        if (event.target.closest('[data-drupal-selector="user-form"]')?.length > 0) {
          const userSettings = document.querySelector('input[name="enable_user_settings"]')?.matches(':checked');

          if (!userSettings) {
            accentColorSetting = drupalSettings.gin.default_accent_color;
            accentColorPreset = drupalSettings.gin.default_preset_accent_color;
          }
        }

        // Set custom color if 'custom' is set.
        if (accentColorPreset === 'custom') {
          localStorage.setItem('GinAccentColorCustom', accentColorSetting);
        } else {
          localStorage.setItem('GinAccentColorCustom', '');
        }
      });
    },

    darkmode: function darkmode(darkmodeParam = null) {
      const darkmodeEnabled = darkmodeParam != null ? darkmodeParam : drupalSettings.gin.darkmode;
      const darkmodeClass = drupalSettings.gin.darkmode_class;
      const body = document.querySelector('body');

      // Needs to check for both: backwards compatibility.
      if (darkmodeEnabled === true || darkmodeEnabled === 1) {
        body.classList.add(darkmodeClass);
      }
      else {
        body.classList.remove(darkmodeClass);
      }
    },

    setHighContrastMode: function setHighContrastMode(param = null) {
      const enabled = param != null ? param : drupalSettings.gin.highcontrastmode;
      const className = drupalSettings.gin.highcontrastmode_class;
      const body = document.querySelector('body');

      // Needs to check for both: backwards compatibility.
      if (enabled === true || enabled === 1) {
        body.classList.add(className);
      }
      else {
        body.classList.remove(className);
      }
    },
  };
})(Drupal, drupalSettings);
