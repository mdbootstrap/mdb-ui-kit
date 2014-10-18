/* globals jQuery, ripples */

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
            return !evt.ctrlKey && !evt.metaKey && !evt.altKey && evt.which != 8;
        }
        return false;
    }

    $.material =  {
        "options": {
            "withRipples": ".btn:not(.btn-link), .card-image, .navbar a:not(.withoutripple), .nav-tabs a:not(.withoutripple), .withripple",
            "inputElements": "input.form-control, textarea.form-control, select.form-control",
            "checkboxElements": ".checkbox > label > input[type=checkbox]",
            "radioElements": ".radio > label > input[type=radio]"
        },
        "checkbox": function(selector) {
            // Add fake-checkbox to material checkboxes
            $((selector) ? selector : this.options.checkboxElements)
            .filter(":notmdproc")
            .data("mdproc", true)
            .after("<span class=check></span>");
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
                $this.wrap("<div class=form-control-wrapper></div>");
                $this.after("<span class=material-input></span>");
                if ($this.hasClass("floating-label")) {
                    var placeholder = $this.attr("placeholder");
                    $this.attr("placeholder", null).removeClass("floating-label");
                    $this.after("<div class=floating-label>" + placeholder + "</div>");
                }
                if ($this.is(":empty") || $this.val() === null || $this.val() == "undefined" || $this.val() === "") {
                    $this.addClass("empty");
                }
                if ($this.parent().next().is("[type=file]")) {
                    $this.parent().addClass("fileinput");
                    var $input = $this.parent().next().detach();
                    $this.after($input);
                }
            });

            $(document)
            .on("change", ".checkbox input", function() { $(this).blur(); })
            .on("keydown", ".form-control", function(e) {
                if(_isChar(e)) {
                    $(this).removeClass("empty");
                }
            })
            .on("keyup change", ".form-control", function() {
                var $this = $(this);
                if($this.val() === "") {
                    $this.addClass("empty");
                }
            })
            .on("focus", ".form-control-wrapper.fileinput", function() {
                $(this).find("input").addClass("focus");
            })
            .on("blur", ".form-control-wrapper.fileinput", function() {
                $(this).find("input").removeClass("focus");
            })
            .on("change", ".form-control-wrapper.fileinput [type=file]", function() {
                var value = "";
                $.each($(this)[0].files, function(i, file) {
                    console.log(file);
                    value += file.name + ", ";
                });
                value = value.substring(0, value.length - 2);
                if (value) {
                    $(this).prev().removeClass("empty");
                } else {
                    $(this).prev().addClass("empty");
                }
                $(this).prev().val(value);
            });
        },
        "ripples": function(selector) {
            ripples.init((selector) ? selector : this.options.withRipples);
        },
        "init": function() {
            this.ripples();
            this.input();
            this.checkbox();
            this.radio();
        }
    };
})(jQuery);
