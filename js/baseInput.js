import Base from "./base";
import Util from "./util";

const BaseInput = ($ => {
  const ClassName = {
    FORM_GROUP: "form-group",
    BMD_FORM_GROUP: "bmd-form-group",
    BMD_LABEL: "bmd-label",
    BMD_LABEL_STATIC: "bmd-label-static",
    BMD_LABEL_PLACEHOLDER: "bmd-label-placeholder",
    BMD_LABEL_FLOATING: "bmd-label-floating",
    HAS_DANGER: "has-danger",
    IS_FILLED: "is-filled",
    IS_FOCUSED: "is-focused",
    INPUT_GROUP: "input-group"
  };

  const Selector = {
    FORM_GROUP: `.${ClassName.FORM_GROUP}`,
    BMD_FORM_GROUP: `.${ClassName.BMD_FORM_GROUP}`,
    BMD_LABEL_WILDCARD: `label[class^='${ClassName.BMD_LABEL}'], label[class*=' ${ClassName.BMD_LABEL}']` // match any label variant if specified
  };

  const Default = {
    validate: false,
    formGroup: {
      required: false
    },
    bmdFormGroup: {
      template: `<span class='${ClassName.BMD_FORM_GROUP}'></span>`,
      create: true, // create a wrapper if form-group not found
      required: true // not recommended to turn this off, only used for inline components
    },
    label: {
      required: false,

      // Prioritized find order for resolving the label to be used as an bmd-label if not specified in the markup
      //  - a function(thisComponent); or
      //  - a string selector used like $bmdFormGroup.find(selector)
      //
      // Note this only runs if $bmdFormGroup.find(Selector.BMD_LABEL_WILDCARD) fails to find a label (as authored in the markup)
      //
      selectors: [
        `.form-control-label`, // in the case of horizontal or inline forms, this will be marked
        `> label` // usual case for text inputs, first child.  Deeper would find toggle labels so don't do that.
      ],
      className: ClassName.BMD_LABEL_STATIC
    },
    requiredClasses: [],
    invalidComponentMatches: [],
    convertInputSizeVariations: true
  };

  const FormControlSizeMarkers = {
    "form-control-lg": "bmd-form-group-lg",
    "form-control-sm": "bmd-form-group-sm"
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */
  class BaseInput extends Base {
    /**
     *
     * @param element
     * @param config
     * @param properties - anything that needs to be set as this[key] = value.  Works around the need to call `super` before using `this`
     */
    constructor($element, config, properties = {}) {
      super($element, $.extend(true, {}, Default, config), properties);

      // Enforce no overlap between components to prevent side effects
      this._rejectInvalidComponentMatches();

      // Enforce expected structure (if any)
      this.rejectWithoutRequiredStructure();

      // Enforce required classes for a consistent rendering
      this._rejectWithoutRequiredClasses();

      // Resolve the form-group first, it will be used for bmd-form-group if possible
      //   note: different components have different rules
      this.$formGroup = this.findFormGroup(this.config.formGroup.required);

      // Will add bmd-form-group to form-group or create an bmd-form-group
      //  Performance Note: for those forms that are really performance driven, create the markup with the .bmd-form-group to avoid
      //    rendering changes once added.
      this.$bmdFormGroup = this.resolveMdbFormGroup();

      // Resolve and mark the bmdLabel if necessary as defined by the config
      this.$bmdLabel = this.resolveMdbLabel();

      // Signal to the bmd-form-group that a form-control-* variation is being used
      this.resolveMdbFormGroupSizing();

      this.addFocusListener();
      this.addChangeListener();

      if (this.$element.val() != "") {
        this.addIsFilled();
      }
    }

    dispose(dataKey) {
      super.dispose(dataKey);
      this.$bmdFormGroup = null;
      this.$formGroup = null;
    }

    // ------------------------------------------------------------------------
    // protected

    rejectWithoutRequiredStructure() {
      // implement
    }

    addFocusListener() {
      this.$element
        .on("focus", () => {
          this.addFormGroupFocus();
        })
        .on("blur", () => {
          this.removeFormGroupFocus();
        });
    }

    addChangeListener() {
      this.$element
        .on("keydown paste", event => {
          if (Util.isChar(event)) {
            this.addIsFilled();
          }
        })
        .on("keyup change", () => {
          // make sure empty is added back when there is a programmatic value change.
          //  NOTE: programmatic changing of value using $.val() must trigger the change event i.e. $.val('x').trigger('change')
          if (this.isEmpty()) {
            this.removeIsFilled();
          } else {
            this.addIsFilled();
          }

          if (this.config.validate) {
            // Validation events do not bubble, so they must be attached directly to the text: http://jsfiddle.net/PEpRM/1/
            //  Further, even the bind method is being caught, but since we are already calling #checkValidity here, just alter
            //  the form-group on change.
            //
            // NOTE: I'm not sure we should be intervening regarding validation, this seems better as a README and snippet of code.
            //        BUT, I've left it here for backwards compatibility.
            let isValid =
              typeof this.$element[0].checkValidity === "undefined" ||
              this.$element[0].checkValidity();
            if (isValid) {
              this.removeHasDanger();
            } else {
              this.addHasDanger();
            }
          }
        });
    }

    addHasDanger() {
      this.$bmdFormGroup.addClass(ClassName.HAS_DANGER);
    }

    removeHasDanger() {
      this.$bmdFormGroup.removeClass(ClassName.HAS_DANGER);
    }

    isEmpty() {
      return (
        this.$element.val() === null ||
        this.$element.val() === undefined ||
        this.$element.val() === ""
      );
    }

    // Will add bmd-form-group to form-group or create a bmd-form-group if necessary
    resolveMdbFormGroup() {
      let mfg = this.findMdbFormGroup(false);
      if (mfg === undefined || mfg.length === 0) {
        if (
          this.config.bmdFormGroup.create &&
          (this.$formGroup === undefined || this.$formGroup.length === 0)
        ) {
          // If a form-group doesn't exist (not recommended), take a guess and wrap the element (assuming no label).
          //  note: it's possible to make this smarter, but I need to see valid cases before adding any complexity.

          // this may be an input-group, wrap that instead
          if (this.outerElement().parent().hasClass(ClassName.INPUT_GROUP)) {
            this.outerElement()
              .parent()
              .wrap(this.config.bmdFormGroup.template);
          } else {
            this.outerElement().wrap(this.config.bmdFormGroup.template);
          }
        } else {
          // a form-group does exist, add our marker class to it
          this.$formGroup.addClass(ClassName.BMD_FORM_GROUP);

          // OLD: may want to implement this after all, see how the styling turns out, but using an existing form-group is less manipulation of the dom and therefore preferable
          // A form-group does exist, so add an bmd-form-group wrapping it's internal contents
          //fg.wrapInner(this.config.bmdFormGroup.template)
        }

        mfg = this.findMdbFormGroup(this.config.bmdFormGroup.required);
      }

      return mfg;
    }

    // Demarcation element (e.g. first child of a form-group)
    //  Subclasses such as file inputs may have different structures
    outerElement() {
      return this.$element;
    }

    // Will add bmd-label to bmd-form-group if not already specified
    resolveMdbLabel() {
      let label = this.$bmdFormGroup.find(Selector.BMD_LABEL_WILDCARD);
      if (label === undefined || label.length === 0) {
        // we need to find it based on the configured selectors
        label = this.findMdbLabel(this.config.label.required);

        if (label === undefined || label.length === 0) {
          // no label found, and finder did not require one
        } else {
          // a candidate label was found, add the configured default class name
          label.addClass(this.config.label.className);
        }
      }

      return label;
    }

    // Find bmd-label variant based on the config selectors
    findMdbLabel(raiseError = true) {
      let label = null;

      // use the specified selector order
      for (let selector of this.config.label.selectors) {
        if ($.isFunction(selector)) {
          label = selector(this);
        } else {
          label = this.$bmdFormGroup.find(selector);
        }

        if (label !== undefined && label.length > 0) {
          break;
        }
      }

      if (label.length === 0 && raiseError) {
        $.error(
          `Failed to find ${Selector.BMD_LABEL_WILDCARD} within form-group for ${Util.describe(
            this.$element
          )}`
        );
      }
      return label;
    }

    // Find bmd-form-group
    findFormGroup(raiseError = true) {
      let fg = this.$element.closest(Selector.FORM_GROUP);
      if (fg.length === 0 && raiseError) {
        $.error(
          `Failed to find ${Selector.FORM_GROUP} for ${Util.describe(
            this.$element
          )}`
        );
      }
      return fg;
    }

    // Due to the interconnected nature of labels/inputs/help-blocks, signal the bmd-form-group-* size variation based on
    //  a found form-control-* size
    resolveMdbFormGroupSizing() {
      if (!this.config.convertInputSizeVariations) {
        return;
      }

      // Modification - Change text-sm/lg to form-group-sm/lg instead (preferred standard and simpler css/less variants)
      for (let inputSize in FormControlSizeMarkers) {
        if (this.$element.hasClass(inputSize)) {
          //this.$element.removeClass(inputSize)
          this.$bmdFormGroup.addClass(FormControlSizeMarkers[inputSize]);
        }
      }
    }

    // ------------------------------------------------------------------------
    // private
    _rejectInvalidComponentMatches() {
      for (let otherComponent of this.config.invalidComponentMatches) {
        otherComponent.rejectMatch(this.constructor.name, this.$element);
      }
    }

    _rejectWithoutRequiredClasses() {
      for (let requiredClass of this.config.requiredClasses) {
        let found = false;
        // allow one of several classes to be passed in x||y
        if (requiredClass.indexOf("||") !== -1) {
          let oneOf = requiredClass.split("||");
          for (let requiredClass of oneOf) {
            if (this.$element.hasClass(requiredClass)) {
              found = true;
              break;
            }
          }
        } else if (this.$element.hasClass(requiredClass)) {
          found = true;
        }
      }
    }

    // ------------------------------------------------------------------------
    // static
  }

  return BaseInput;
})(jQuery);

export default BaseInput;
