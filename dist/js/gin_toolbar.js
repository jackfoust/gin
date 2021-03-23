!function(Drupal) {
  Drupal.behaviors.ginToolbarToggle = {
    attach: function(context) {
      var body = document.querySelector("body"), trigger = context.querySelector(".toolbar-menu__trigger");
      trigger && ("true" === localStorage.getItem("GinSidebarOpen") ? (body.setAttribute("data-toolbar-menu", "open"), 
      trigger.classList.add("is-active")) : (body.removeAttribute("data-toolbar-menu"), 
      trigger.classList.remove("is-active")), null == trigger || trigger.addEventListener("click", (function(event) {
        event.preventDefault();
        var $this = event.target;
        $this.classList.toggle("is-active");
        var _document$querySelect, active = "true";
        $this.classList.contains("is-active") ? body.setAttribute("data-toolbar-menu", "open") : (body.removeAttribute("data-toolbar-menu"), 
        active = "false", null === (_document$querySelect = document.querySelector(".gin-toolbar-inline-styles")) || void 0 === _document$querySelect || _document$querySelect.remove()), 
        localStorage.setItem("GinSidebarOpen", active);
        var customEvent = new CustomEvent("toolbar-toggle", {
          detail: "true" === active
        });
        document.dispatchEvent(customEvent);
      })), document.querySelector(".toolbar-menu-administration").addEventListener("transitionend", (function() {
        Drupal.behaviors.ginToolbarToggle.updateStickyTableWidth();
      })));
    },
    updateStickyTableWidth: function() {
      var element = document.querySelector(".sticky-header");
      element && (element.style.width = "".concat(element.nextSibling.clientWidth, "px"));
    }
  };
}(Drupal);