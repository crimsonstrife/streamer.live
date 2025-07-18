/* global tinymce, module, require, define, global, self */

(function (f) {
    "use strict";

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
        module.exports = f(require("jquery"));

        // RequireJS
    } else if (typeof define === "function" && define.amd) {
        define(["jquery"], f);

        // <script>
    } else {
        let g;
        if (typeof window !== "undefined") {
            g = window;
        } else if (typeof global !== "undefined") {
            g = global;
        } else if (typeof self !== "undefined") {
            g = self;
        } else {
            g = this;
        }

        f(g.jQuery);
    }
})(function ($) {
    "use strict";

    const AutoComplete = function (ed, options) {
        this.editor = ed;

        this.options = $.extend(
            {},
            {
                source: [],
                delay: 500,
                queryBy: "name",
                items: 10,
                mentioned_style:
                    "background-color: antiquewhite;padding: 2px;border-radius: 5px;",
                loading_text: "Loading...",
                loading_class: null,
            },
            options,
        );

        this.options.insertFrom =
            this.options.insertFrom || this.options.queryBy;

        this.matcher = this.options.matcher || this.matcher;
        this.sorter = this.options.sorter || this.sorter;
        this.renderDropdown =
            this.options.renderDropdown || this.renderDropdown;
        this.render = this.options.render || this.render;
        this.insert = this.options.insert || this.insert;
        this.highlighter = this.options.highlighter || this.highlighter;

        this.query = "";
        this.hasFocus = true;

        this.renderInput();

        this.bindEvents();
    };

    AutoComplete.prototype = {
        constructor: AutoComplete,

        renderInput: function () {
            const rawHtml =
                '<span id="autocomplete-container" style="' +
                this.options.mentioned_style +
                '">' +
                '<span id="autocomplete-delimiter">' +
                this.options.delimiter +
                "</span>" +
                '<span id="autocomplete-searchtext"><span class="dummy">\u200b</span></span>' +
                "</span>";
            this.editor.execCommand("mceInsertContent", false, rawHtml);
            this.editor.focus();
            this.editor.selection.select(
                this.editor.selection.dom.select(
                    "span#autocomplete-searchtext span",
                )[0],
            );
            this.editor.selection.collapse(0);
        },

        bindEvents: function () {
            this.editor.on(
                "keyup",
                (this.editorKeyUpProxy = $.proxy(this.rteKeyUp, this)),
            );
            this.editor.on(
                "keydown",
                (this.editorKeyDownProxy = $.proxy(this.rteKeyDown, this)),
                true,
            );
            this.editor.on(
                "click",
                (this.editorClickProxy = $.proxy(this.rteClicked, this)),
            );

            $("body").on(
                "click",
                (this.bodyClickProxy = $.proxy(this.rteLostFocus, this)),
            );

            $(this.editor.getWin()).on(
                "scroll",
                (this.rteScroll = $.proxy(function () {
                    this.cleanUp(true);
                }, this)),
            );
        },

        unbindEvents: function () {
            this.editor.off("keyup", this.editorKeyUpProxy);
            this.editor.off("keydown", this.editorKeyDownProxy);
            this.editor.off("click", this.editorClickProxy);

            $("body").off("click", this.bodyClickProxy);

            $(this.editor.getWin()).off("scroll", this.rteScroll);
        },

        rteKeyUp: function (e) {
            switch (e.which || e.keyCode) {
                // DOWN ARROW
                case 40:
                // UP ARROW
                case 38:
                // SHIFT
                case 16:
                // CTRL
                case 17:
                // ALT
                case 18:
                    break;

                // BACKSPACE
                case 8:
                    if (this.query === "") {
                        this.cleanUp(true);
                    } else {
                        this.lookup();
                    }
                    break;

                // TAB
                case 9:
                // ENTER
                case 13:
                    var item =
                        this.$dropdown !== undefined
                            ? this.$dropdown.find("li.active")
                            : [];
                    if (item.length) {
                        this.select(item.data());
                        this.cleanUp(false);
                    } else {
                        this.cleanUp(true);
                    }
                    break;

                // ESC
                case 27:
                    this.cleanUp(true);
                    break;

                default:
                    this.lookup();
            }
        },

        rteKeyDown: function (e) {
            switch (e.which || e.keyCode) {
                // TAB
                case 9:
                // ENTER
                case 13:
                // ESC
                case 27:
                    e.preventDefault();
                    break;

                // UP ARROW
                case 38:
                    e.preventDefault();
                    if (this.$dropdown !== undefined) {
                        this.highlightPreviousResult();
                    }
                    break;
                // DOWN ARROW
                case 40:
                    e.preventDefault();
                    if (this.$dropdown !== undefined) {
                        this.highlightNextResult();
                    }
                    break;
            }

            e.stopPropagation();
        },

        rteClicked: function (e) {
            const $target = $(e.target);
            if (
                this.hasFocus &&
                $target.parent().attr("id") !== "autocomplete-searchtext"
            ) {
                this.cleanUp(true);
            }
        },

        rteLostFocus: function () {
            if (this.hasFocus) {
                this.cleanUp(true);
            }
        },

        lookup: function () {
            this.query = $.trim(
                $(this.editor.getBody())
                    .find("#autocomplete-searchtext")
                    .text(),
            ).replace("\u200b", "");

            if (this.$dropdown === undefined) {
                this.show();
            }

            clearTimeout(this.searchTimeout);
            this.searchTimeout = setTimeout(
                $.proxy(function () {
                    // Added delimiter parameter as last argument for backwards compatibility.
                    const items = $.isFunction(this.options.source)
                        ? this.options.source(
                              this.query,
                              $.proxy(this.process, this),
                              this.options.delimiter,
                          )
                        : this.options.source;
                    if (items) {
                        this.process(items);
                    }
                }, this),
                this.options.delay,
            );
        },

        matcher: function (item) {
            return ~item[this.options.queryBy]
                .toLowerCase()
                .indexOf(this.query.toLowerCase());
        },

        sorter: function (items) {
            const beginswith = [];
            const caseSensitive = [];
            const caseInsensitive = [];
            let item;

            while ((item = items.shift()) !== undefined) {
                if (
                    !item[this.options.queryBy]
                        .toLowerCase()
                        .indexOf(this.query.toLowerCase())
                ) {
                    beginswith.push(item);
                } else if (~item[this.options.queryBy].indexOf(this.query)) {
                    caseSensitive.push(item);
                } else {
                    caseInsensitive.push(item);
                }
            }

            return beginswith.concat(caseSensitive, caseInsensitive);
        },

        highlighter: function (text) {
            const escapeHtml = function (str) {
                return str
                    .replace(/&/g, "&amp;")
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;")
                    .replace(/"/g, "&quot;")
                    .replace(/'/g, "&#39;");
            };

            return text.replace(
                new RegExp(
                    "(" +
                        this.query.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1") +
                        ")",
                    "ig",
                ),
                function ($1, match) {
                    return "<strong>" + escapeHtml(match) + "</strong>";
                },
            );
        },

        show: function () {
            const offset = this.editor.inline
                ? this.offsetInline()
                : this.offset();

            this.$dropdown = $(this.renderDropdown()).css({
                top: offset.top,
                left: offset.left,
            });

            $("body").append(this.$dropdown);

            this.$dropdown.on("click", $.proxy(this.autoCompleteClick, this));
        },

        process: function (data) {
            if (!this.hasFocus) {
                return;
            }

            const _this = this;
            const result = [];
            let items = $.grep(data, function (item) {
                return _this.matcher(item);
            });

            items = _this.sorter(items);

            items = items.slice(0, this.options.items);

            $.each(items, function (i, item) {
                const $element = $(_this.render(item, i));

                $element.html(
                    $element
                        .html()
                        .replace(
                            $element.text(),
                            _this.highlighter($element.text()),
                        ),
                );

                $.each(items[i], function (key, val) {
                    $element.attr("data-" + key, val);
                });

                result.push($element[0].outerHTML);
            });

            if (result.length) {
                this.$dropdown.html(result.join("")).show();
            } else {
                this.$dropdown.hide();
                this.$dropdown.find("li").removeClass("active");
            }
        },

        renderDropdown: function () {
            return (
                '<ul class="rte-autocomplete dropdown-menu" style="position:absolute;"><li style="list-style:none;"><div class="' +
                this.options.loading_class +
                '"></div>' +
                this.options.loading_text +
                "</li></ul>"
            );
        },

        render: function (item, index) {
            return (
                '<li class="dropdown-item">' +
                '<a style="color:#000;" href="javascript:;"><span>' +
                item[this.options.queryBy] +
                "</span></a>" +
                "</li>"
            );
        },

        autoCompleteClick: function (e) {
            const item = $(e.target).closest("li").data();
            if (!$.isEmptyObject(item)) {
                this.select(item);
                this.cleanUp(false);
            }
            e.stopPropagation();
            e.preventDefault();
        },

        highlightPreviousResult: function () {
            let currentIndex = this.$dropdown.find("li.active").index();
            const index =
                currentIndex === 0
                    ? this.$dropdown.find("li").length - 1
                    : --currentIndex;

            this.$dropdown
                .find("li")
                .removeClass("active")
                .eq(index)
                .addClass("active");
        },

        highlightNextResult: function () {
            let currentIndex = this.$dropdown.find("li.active").index();
            const index =
                currentIndex === this.$dropdown.find("li").length - 1
                    ? 0
                    : ++currentIndex;

            this.$dropdown
                .find("li")
                .removeClass("active")
                .eq(index)
                .addClass("active");
        },

        select: function (item) {
            this.editor.focus();
            const selection = this.editor.dom.select(
                "span#autocomplete-container",
            )[0];
            this.editor.dom.remove(selection);
            this.editor.execCommand(
                "mceInsertContent",
                false,
                this.insert(item),
            );
        },

        insert: function (item) {
            return (
                '<span contenteditable="false" style="' +
                this.options.mentioned_style +
                '">' +
                item[this.options.insertFrom] +
                "</span>&nbsp;"
            );
        },

        cleanUp: function (rollback) {
            this.unbindEvents();
            this.hasFocus = false;

            if (this.$dropdown !== undefined) {
                this.$dropdown.remove();
                delete this.$dropdown;
            }

            if (rollback) {
                const text = this.query;
                const $selection = $(
                    this.editor.dom.select("span#autocomplete-container"),
                );

                if (!$selection.length) {
                    return;
                }

                const replacement = $(
                    "<p>" + this.options.delimiter + text + "</p>",
                )[0].firstChild;
                const focus =
                    $(this.editor.selection.getNode()).offset().top ===
                    $selection.offset().top +
                        ($selection.outerHeight() - $selection.height()) / 2;

                this.editor.dom.replace(replacement, $selection[0]);

                if (focus) {
                    this.editor.selection.select(replacement);
                    this.editor.selection.collapse();
                }
            }
        },

        offset: function () {
            const rtePosition = $(this.editor.getContainer()).offset();
            const contentAreaPosition = $(
                this.editor.getContentAreaContainer(),
            ).position();
            const nodePosition = $(
                this.editor.dom.select("span#autocomplete-container"),
            ).position();
            return {
                top:
                    rtePosition.top +
                    contentAreaPosition.top +
                    nodePosition.top +
                    $(this.editor.selection.getNode()).innerHeight() -
                    $(this.editor.getDoc()).scrollTop() +
                    5,
                left:
                    rtePosition.left +
                    contentAreaPosition.left +
                    nodePosition.left,
            };
        },

        offsetInline: function () {
            const nodePosition = $(
                this.editor.dom.select("span#autocomplete-container"),
            ).offset();

            return {
                top:
                    nodePosition.top +
                    $(this.editor.selection.getNode()).innerHeight() +
                    5,
                left: nodePosition.left,
            };
        },
    };

    function plugin() {
        return {
            init: function (ed) {
                let autoComplete;
                const autoCompleteData = ed.getParam("mentions");

                // If the delimiter is undefined set default value to ['@'].
                // If the delimiter is a string value convert it to an array. (backwards compatibility)
                autoCompleteData.delimiter =
                    autoCompleteData.delimiter !== undefined
                        ? !$.isArray(autoCompleteData.delimiter)
                            ? [autoCompleteData.delimiter]
                            : autoCompleteData.delimiter
                        : ["@"];

                function prevCharIsSpace() {
                    const start = ed.selection.getRng(true).startOffset;
                    const text =
                        ed.selection.getRng(true).startContainer.data || "";
                    const charachter = text.substr(
                        start > 0 ? start - 1 : 0,
                        1,
                    );

                    return !$.trim(charachter).length;
                }

                ed.on("keypress", function (e) {
                    const delimiterIndex = $.inArray(
                        String.fromCharCode(e.which || e.keyCode),
                        autoCompleteData.delimiter,
                    );
                    if (delimiterIndex > -1 && prevCharIsSpace()) {
                        if (
                            autoComplete === undefined ||
                            (autoComplete.hasFocus !== undefined &&
                                !autoComplete.hasFocus)
                        ) {
                            e.preventDefault();
                            // Clone options object and set the used delimiter.
                            autoComplete = new AutoComplete(
                                ed,
                                $.extend({}, autoCompleteData, {
                                    delimiter:
                                        autoCompleteData.delimiter[
                                            delimiterIndex
                                        ],
                                }),
                            );
                        }
                    }
                });
            },

            getInfo: function () {
                return {
                    longname: "mention",
                    author: "Steven Devooght",
                    version: tinymce.majorVersion + "." + tinymce.minorVersion,
                };
            },
        };
    }

    tinymce.PluginManager.add("mention", plugin);
});
