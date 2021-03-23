!function(Drupal, drupalSettings) {
  Drupal.behaviors.ginSettings = {
    attach: function(context) {
      var _context$querySelecto, _context$querySelecto2, _context$querySelecto3, _context$querySelecto4, _context$querySelecto5, _context$querySelecto6, _context$querySelecto7, _context$querySelecto8;
      null === (_context$querySelecto = context.querySelector('input[name="enable_darkmode"]')) || void 0 === _context$querySelecto || _context$querySelecto.addEventListener("change", (function(event) {
        var _event$target, _document$querySelect, darkmode = null === (_event$target = event.target) || void 0 === _event$target ? void 0 : _event$target.matches(":checked"), accentColorPreset = document.querySelector('[data-drupal-selector="edit-preset-accent-color"] input:checked').value, focusColorPreset = null === (_document$querySelect = document.querySelector('select[name="preset_focus_color"]')) || void 0 === _document$querySelect ? void 0 : _document$querySelect.value;
        if (Drupal.behaviors.ginSettings.darkmode(darkmode), "custom" === accentColorPreset) {
          var accentColorSetting = context.querySelector('input[name="accent_color"]').value;
          Drupal.behaviors.ginAccent.setCustomAccentColor("custom", accentColorSetting);
        } else Drupal.behaviors.ginAccent.setAccentColor(accentColorPreset);
        Drupal.behaviors.ginAccent.setFocusColor(focusColorPreset);
      })), null === (_context$querySelecto2 = context.querySelectorAll('[data-drupal-selector="edit-preset-accent-color"] input')) || void 0 === _context$querySelecto2 || _context$querySelecto2.forEach((function(element) {
        element.addEventListener("change", (function(event) {
          var accentColorPreset = event.target.value;
          if (Drupal.behaviors.ginAccent.clearAccentColor(), Drupal.behaviors.ginAccent.setAccentColor(accentColorPreset), 
          "custom" === accentColorPreset) {
            var accentColorSetting = document.querySelector('input[name="accent_color"]').value;
            Drupal.behaviors.ginAccent.setCustomAccentColor("custom", accentColorSetting);
          }
        }));
      })), null === (_context$querySelecto3 = context.querySelector('input[name="accent_color"]')) || void 0 === _context$querySelecto3 || _context$querySelecto3.addEventListener("change", (function(event) {
        var accentColorSetting = event.target.value;
        Drupal.behaviors.ginAccent.setCustomAccentColor("custom", accentColorSetting);
      })), null === (_context$querySelecto4 = context.querySelector('select[name="preset_focus_color"]')) || void 0 === _context$querySelecto4 || _context$querySelecto4.addEventListener("change", (function(event) {
        var accentColorPreset = event.target.value;
        Drupal.behaviors.ginAccent.setFocusColor(accentColorPreset);
      })), null === (_context$querySelecto5 = context.querySelector('input[name="focus_color"]')) || void 0 === _context$querySelecto5 || _context$querySelecto5.addEventListener("change", (function(event) {
        var focusColorPreset = document.querySelector('select[name="preset_focus_color"]').value, focusColorSetting = event.target.value;
        Drupal.behaviors.ginAccent.setFocusColor(focusColorPreset, focusColorSetting);
      })), null === (_context$querySelecto6 = context.querySelector('input[name="high_contrast_mode"]')) || void 0 === _context$querySelecto6 || _context$querySelecto6.addEventListener("change", (function(event) {
        var _event$target2, highContrastMode = null === (_event$target2 = event.target) || void 0 === _event$target2 ? void 0 : _event$target2.matches(":checked");
        Drupal.behaviors.ginSettings.setHighContrastMode(highContrastMode);
      })), null === (_context$querySelecto7 = context.querySelector('input[name="enable_user_settings"]')) || void 0 === _context$querySelecto7 || _context$querySelecto7.addEventListener("change", (function(event) {
        var _event$target3, _document$querySelect2, _document$querySelect3, active = null === (_event$target3 = event.target) || void 0 === _event$target3 ? void 0 : _event$target3.matches(":checked"), darkmode = null === (_document$querySelect2 = document.querySelector('input[name="enable_darkmode"]')) || void 0 === _document$querySelect2 ? void 0 : _document$querySelect2.matches(":checked"), accentColorSetting = context.querySelector('input[name="accent_color"]').value, accentColorPreset = document.querySelector('[data-drupal-selector="edit-preset-accent-color"] input:checked').value, highContrastMode = null === (_document$querySelect3 = document.querySelector('input[name="high_contrast_mode"]')) || void 0 === _document$querySelect3 ? void 0 : _document$querySelect3.matches(":checked");
        active || (darkmode = drupalSettings.gin.default_darkmode, accentColorSetting = drupalSettings.gin.default_accent_color, 
        accentColorPreset = drupalSettings.gin.default_preset_accent_color, highContrastMode = drupalSettings.gin.default_high_contrast_mode), 
        Drupal.behaviors.ginSettings.darkmode(darkmode), Drupal.behaviors.ginAccent.setAccentColor(accentColorPreset, accentColorSetting), 
        Drupal.behaviors.ginSettings.setHighContrastMode(highContrastMode);
      })), null === (_context$querySelecto8 = context.querySelector('[data-drupal-selector="edit-submit"]')) || void 0 === _context$querySelecto8 || _context$querySelecto8.addEventListener("click", (function(event) {
        var _event$target$closest, _document$querySelect4, accentColorPreset = document.querySelector('[data-drupal-selector="edit-preset-accent-color"] input:checked').value, accentColorSetting = context.querySelector('input[name="accent_color"]').value;
        (null === (_event$target$closest = event.target.closest('[data-drupal-selector="user-form"]')) || void 0 === _event$target$closest ? void 0 : _event$target$closest.length) > 0 && ((null === (_document$querySelect4 = document.querySelector('input[name="enable_user_settings"]')) || void 0 === _document$querySelect4 ? void 0 : _document$querySelect4.matches(":checked")) || (accentColorSetting = drupalSettings.gin.default_accent_color, 
        accentColorPreset = drupalSettings.gin.default_preset_accent_color)), "custom" === accentColorPreset ? localStorage.setItem("GinAccentColorCustom", accentColorSetting) : localStorage.setItem("GinAccentColorCustom", "");
      }));
    },
    darkmode: function() {
      var darkmodeParam = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null, enabled = null != darkmodeParam ? darkmodeParam : drupalSettings.gin.darkmode, className = drupalSettings.gin.darkmode_class;
      Drupal.behaviors.ginSettings.toggleClass(enabled, className);
    },
    setHighContrastMode: function() {
      var param = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null, enabled = null != param ? param : drupalSettings.gin.highcontrastmode, className = drupalSettings.gin.highcontrastmode_class;
      Drupal.behaviors.ginSettings.toggleClass(enabled, className);
    },
    toggleClass: function(value, className) {
      var body = document.querySelector("body");
      !0 === value || 1 === value ? body.classList.add(className) : body.classList.remove(className);
    }
  };
}(Drupal, drupalSettings);