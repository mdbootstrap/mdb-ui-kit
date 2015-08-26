/* globals jQuery */

(function($) {
  // Selector to select only not already processed elements
  $.expr[":"].notmdproc = function(obj){
    if ($(obj).data("mdproc")) {
      return false;
    } else {
      return true;
    }
  };

  function _isChar(evt) {
    if (typeof evt.which == "undefined") {
      return true;
    } else if (typeof evt.which == "number" && evt.which > 0) {
      return !evt.ctrlKey && !evt.metaKey && !evt.altKey && evt.which != 8 && evt.which != 9;
    }
    return false;
  }

  $.material =  {
    "options": {
      // These options set what will be started by $.material.init()
      "input": true,
      "ripples": true,
      "checkbox": true,
      "togglebutton": true,
      "radio": true,
      "arrive": true,
      "autofill": false,

      "withRipples": [
        ".btn:not(.btn-link)",
        ".card-image",
        ".navbar a:not(.withoutripple)",
        ".dropdown-menu a",
        ".nav-tabs a:not(.withoutripple)",
        ".withripple",
        ".pagination li:not(.active):not(.disabled) a:not(.withoutripple)"
      ].join(","),
      "inputElements": "input.form-control, textarea.form-control, select.form-control",
      "checkboxElements": ".checkbox > label > input[type=checkbox]",
      "togglebuttonElements": ".togglebutton > label > input[type=checkbox]",
      "radioElements": ".radio > label > input[type=radio]"
    },
    "checkbox": function(selector) {
      // Add fake-checkbox to material checkboxes
      $((selector) ? selector : this.options.checkboxElements)
      .filter(":notmdproc")
      .data("mdproc", true)
      .after("<span class=checkbox-material><span class=check></span></span>");
    },
    "togglebutton": function(selector) {
      // Add fake-checkbox to material checkboxes
      $((selector) ? selector : this.options.togglebuttonElements)
      .filter(":notmdproc")
      .data("mdproc", true)
      .after("<span class=toggle></span>");
    },
    "radio": function(selector) {
      // Add fake-radio to material radios
      $((selector) ? selector : this.options.radioElements)
      .filter(":notmdproc")
      .data("mdproc", true)
      .after("<span class=circle></span><span class=check></span>");
    },
    "input": function(selector) {
      $((selector) ? selector : this.options.inputElements)
      .filter(":notmdproc")
      .data("mdproc", true)
      .each( function() {
        var $this = $(this);

        if (!$this.attr("data-hint") && !$this.hasClass("floating-label")) {
          return;
        }
        $this.wrap("<div class=form-control-wrapper></div>");
        $this.after("<span class=material-input></span>");

        // Add floating label if required
        if ($this.hasClass("floating-label")) {
          var placeholder = $this.attr("placeholder");
          $this.attr("placeholder", null).removeClass("floating-label");
          $this.after("<div class=floating-label>" + placeholder + "</div>");
        }

        // Add hint label if required
        if ($this.attr("data-hint")) {
          $this.after("<div class=hint>" + $this.attr("data-hint") + "</div>");
        }

        // Set as empty if is empty (damn I must improve this...)
        if ($this.val() === null || $this.val() == "undefined" || $this.val() === "") {
          $this.addClass("empty");
        }

        // Support for file input
        if ($this.parent().next().is("[type=file]")) {
          $this.parent().addClass("fileinput");
          var $input = $this.parent().next().detach();
          $this.after($input);
        }
      });
    },
    "attachInputEventHandlers": function() {
      $(document)
      .on("change", ".checkbox input[type=checkbox]", function() { $(this).blur(); })
      .on("keydown paste", ".form-control", function(e) {
        if(_isChar(e)) {
          $(this).removeClass("empty");
        }
      })
      .on("keyup change", ".form-control", function() {
        var $this = $(this);
        if ($this.val() === "" && (typeof $this[0].checkValidity === "undefined" || $this[0].checkValidity())) {
          $this.addClass("empty");
        } else {
          $this.removeClass("empty");
        }
      })
      .on("focus", ".form-control-wrapper.fileinput", function() {
        $(this).find("input").addClass("focus");
      })
      .on("blur", ".form-control-wrapper.fileinput", function() {
        $(this).find("input").removeClass("focus");
      })
      .on("change", ".form-control-wrapper.fileinput [type=file]", function() {
        var $this = $(this);
        var value = "";
        $.each(this.files, function(i, file) {
          value += file.name + ", ";
        });
        value = value.substring(0, value.length - 2);
        if (value) {
          $this.prev().removeClass("empty");
        } else {
          $this.prev().addClass("empty");
        }
        $this.prev().val(value);
      });
    },
    "ripples": function(selector) {
      $((selector) ? selector : this.options.withRipples).ripples();
    },
    "autofill": function() {
      // This part of code will detect autofill when the page is loading (username and password inputs for example)
      var loading = setInterval(function() {
        $("input[type!=checkbox]").each(function() {
          var $this = $(this);
          if ($this.val() && $this.val() !== $this.attr("value")) {
            $this.trigger("change");
          }
        });
      }, 100);

      // After 10 seconds we are quite sure all the needed inputs are autofilled then we can stop checking them
      setTimeout(function() {
        clearInterval(loading);
      }, 10000);
    },
    "attachAutofillEventHandlers": function() {
      // Listen on inputs of the focused form (because user can select from the autofill dropdown only when the input has focus)
      var focused;
      $(document)
      .on("focus", "input", function() {
        var $inputs = $(this).parents("form").find("input").not("[type=file]");
        focused = setInterval(function() {
          $inputs.each(function() {
            var $this = $(this);
            if ($this.val() !== $this.attr("value")) {
              $this.trigger("change");
            }
          });
        }, 100);
      })
      .on("blur", "input", function() {
        clearInterval(focused);
      });
    },
    "init": function() {
      var $document = $(document);

      if ($.fn.ripples && this.options.ripples) {
        this.ripples();
      }
      if (this.options.input) {
        this.input();
        this.attachInputEventHandlers();
      }
      if (this.options.checkbox) {
        this.checkbox();
      }
      if (this.options.togglebutton) {
        this.togglebutton();
      }
      if (this.options.radio) {
        this.radio();
      }
      if (this.options.autofill) {
        this.autofill();
        this.attachAutofillEventHandlers();
      }

      if (document.arrive && this.options.arrive) {
        if ($.fn.ripples && this.options.ripples) {
          $document.arrive(this.options.withRipples, function() {
            $.material.ripples($(this));
          });
        }
        if (this.options.input) {
          $document.arrive(this.options.inputElements, function() {
            $.material.input($(this));
          });
        }
        if (this.options.checkbox) {
          $document.arrive(this.options.checkboxElements, function() {
            $.material.checkbox($(this));
          });
        }
        if (this.options.radio) {
          $document.arrive(this.options.radioElements, function() {
            $.material.radio($(this));
          });
        }
        if (this.options.togglebutton) {
          $document.arrive(this.options.togglebuttonElements, function() {
            $.material.togglebutton($(this));
          });
        }

      }
    }
  };

})(jQuery);
