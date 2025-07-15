(function ($) {
    "use strict";
    $.easyAjax = function (options) {
        const defaults = {
            type: "GET",
            container: "body",
            blockUI: true,
            disableButton: false,
            buttonSelector: "[type='submit']",
            dataType: "json",
            messagePosition: "toastr",
            errorPosition: "field",
            hideElements: false,
            redirect: true,
            data: {},
            file: false,
        };

        let opt = defaults;

        // Extend user-set options over defaults
        if (options) {
            opt = $.extend(defaults, options);
        }

        // Methods if not given in option
        if (typeof opt.beforeSend !== "function") {
            opt.beforeSend = function () {
                // Hide previous errors
                $(opt.container)
                    .find(".has-error")
                    .each(function () {
                        $(this).find(".help-block").text("");
                        $(this).removeClass("has-error");
                    });

                $(opt.container).find("#alert").html("");

                if (opt.blockUI) {
                    $.easyBlockUI(opt.container);
                }

                if (opt.disableButton) {
                    loadingButton(opt.buttonSelector);
                }
            };
        }

        if (typeof opt.complete !== "function") {
            opt.complete = function (jqXHR, textStatus) {
                if (opt.blockUI) {
                    $.easyUnblockUI(opt.container);
                }

                if (opt.disableButton) {
                    unloadingButton(opt.buttonSelector);
                }
            };
        }

        // Default error handler
        if (typeof opt.error !== "function") {
            opt.error = function (jqXHR, textStatus, errorThrown) {
                try {
                    const response = JSON.parse(jqXHR.responseText);
                    if (typeof response === "object") {
                        handleFail(response);
                    } else {
                        let msg =
                            "A server side error occurred. Please try again after sometime.";

                        if (textStatus == "timeout") {
                            msg =
                                "Connection timed out! Please check your internet connection";
                        }
                        showResponseMessage(msg, "error");
                    }
                } catch (e) {}
            };
        }

        function showResponseMessage(msg, type, toastrOptions) {
            const typeClasses = {
                error: "danger",
                success: "success",
                primary: "primary",
                warning: "warning",
                info: "info",
            };

            if (opt.messagePosition == "toastr") {
                $.showToastr(msg, type, toastrOptions);
            } else {
                const ele = $(opt.container).find("#alert");
                const html =
                    '<div class="alert alert-' +
                    typeClasses[type] +
                    '">' +
                    msg +
                    "</div>";
                if (ele.length == 0) {
                    $(opt.container)
                        .find(".form-group:first")
                        .before('<div id="alert">' + html + "</div>");
                } else {
                    ele.html(html);
                }
            }
        }

        // Execute ajax request

        if (opt.file == true) {
            const data = new FormData($(opt.container)[0]);
            const keys = Object.keys(opt.data);

            for (let i = 0; i < keys.length; i++) {
                data.append(keys[i], opt.data[keys[i]]);
            }

            opt.data = data;
        }

        $.ajax({
            type: opt.type,
            url: opt.url,
            dataType: opt.dataType,
            data: opt.data,
            beforeSend: opt.beforeSend,
            contentType: opt.file
                ? false
                : "application/x-www-form-urlencoded; charset=UTF-8",
            processData: !opt.file,
            error: opt.error,
            complete: opt.complete,
            success: function (response) {
                // Show success message
                if (response.status == "success") {
                    if (response.action == "redirect") {
                        if (opt.redirect) {
                            let message = "";
                            if (typeof response.message !== "undefined") {
                                message += response.message;
                            }
                            message += " Redirecting...";

                            showResponseMessage(message, "success", {
                                timeOut: 100000,
                                positionClass: "toast-top-right",
                            });
                            window.location.href = response.url;
                        }
                    } else {
                        if (typeof response.message !== "undefined") {
                            showResponseMessage(response.message, "success");
                        }
                    }

                    if (opt.removeElements == true) {
                        $(opt.container)
                            .find(".form-group, button, input")
                            .remove();
                    }
                }

                if (response.status == "fail") {
                    handleFail(response);
                }

                if (typeof opt.success === "function") {
                    opt.success(response);
                }
            },
        });

        function handleFail(response) {
            if (typeof response.message !== "undefined") {
                showResponseMessage(response.message, "error");
            }

            if (typeof response.errors !== "undefined") {
                const keys = Object.keys(response.errors);

                $(opt.container)
                    .find(".has-error")
                    .find(".help-block")
                    .remove();
                $(opt.container).find(".has-error").removeClass("has-error");

                if (opt.errorPosition == "field") {
                    for (var i = 0; i < keys.length; i++) {
                        // Escape dot that comes with error in array fields
                        let key = keys[i].replace(".", "\\.");
                        const formarray = keys[i];
                        // If the response has form array
                        if (formarray.indexOf(".") > 0) {
                            const array = formarray.split(".");
                            response.errors[keys[i]] = response.errors[keys[i]];
                            key = array[0] + "[" + array[1] + "]";
                        }

                        let ele = $(opt.container).find("[name='" + key + "']");

                        // If cannot find by name, then find by id
                        if (ele.length == 0) {
                            ele = $(opt.container).find("#" + key);
                        }

                        const grp = ele.closest(".form-group");
                        $(grp).find(".help-block").remove();
                        let helpBlockContainer = $(grp).find("div:first");
                        if ($(ele).is(":radio")) {
                            helpBlockContainer = $(grp).find("div:eq(2)");
                        }

                        if (helpBlockContainer.length == 0) {
                            helpBlockContainer = $(grp);
                        }

                        helpBlockContainer.append(
                            '<div class="help-block">' +
                                response.errors[keys[i]] +
                                "</div>",
                        );
                        $(grp).addClass("has-error");
                    }

                    if (keys.length > 0) {
                        const element = $("[name='" + keys[0] + "']");
                        if (element.length > 0) {
                            $("html, body").animate(
                                { scrollTop: element.offset().top - 150 },
                                200,
                            );
                        }
                    }
                } else {
                    let errorMsg = "<ul>";
                    for (var i = 0; i < keys.length; i++) {
                        errorMsg += "<li>" + response.errors[keys[i]] + "</li>";
                    }
                    errorMsg += "</ul>";

                    const errorElement = $(opt.container).find("#alert");
                    const html =
                        '<div class="alert alert-danger">' +
                        errorMsg +
                        "</div>";
                    if (errorElement.length == 0) {
                        $(opt.container)
                            .find(".form-group:first")
                            .before('<div id="alert">' + html + "</div>");
                    } else {
                        errorElement.html(html);
                    }
                }
            }
        }

        function loadingButton(selector) {
            const button = $(opt.container).find(selector);

            let text = "Submitting...";

            if (button.width() < 20) {
                text = "...";
            }

            if (!button.is("input")) {
                button.attr("data-prev-text", button.html());
                button.text(text);
                button.prop("disabled", true);
            } else {
                button.attr("data-prev-text", button.val());
                button.val(text);
                button.prop("disabled", true);
            }
        }

        function unloadingButton(selector) {
            const button = $(opt.container).find(selector);

            if (!button.is("input")) {
                button.html(button.attr("data-prev-text"));
                button.prop("disabled", false);
            } else {
                button.val(button.attr("data-prev-text"));
                button.prop("disabled", false);
            }
        }
    };

    $.easyBlockUI = function (container, message) {
        if (message == undefined) {
            message = "Loading...";
        }

        const html =
            '<div class="loading-message"><div class="block-spinner-bar"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div></div>';

        if (container != undefined) {
            // element blocking
            const el = $(container);
            let centerY = false;
            if (el.height() <= $(window).height()) {
                centerY = true;
            }
            el.block({
                message: html,
                baseZ: 999999,
                centerY,
                css: {
                    top: "10%",
                    border: "0",
                    padding: "0",
                    backgroundColor: "none",
                },
                overlayCSS: {
                    backgroundColor: "transparent",
                    opacity: 0.05,
                    cursor: "wait",
                },
            });
        } else {
            // page blocking
            $.blockUI({
                message: html,
                baseZ: 999999,
                css: {
                    border: "0",
                    padding: "0",
                    backgroundColor: "none",
                },
                overlayCSS: {
                    backgroundColor: "#555",
                    opacity: 0.05,
                    cursor: "wait",
                },
            });
        }
    };

    $.easyUnblockUI = function (container) {
        if (container == undefined) {
            $.unblockUI();
        } else {
            $(container).unblock({
                onUnblock: function () {
                    $(container).css("position", "");
                    $(container).css("zoom", "");
                },
            });
        }
    };

    $.showToastr = function (toastrMessage, toastrType, options) {
        const defaults = {
            closeButton: false,
            debug: false,
            positionClass: "toast-top-right",
            onclick: null,
            showDuration: "1000",
            hideDuration: "1000",
            timeOut: "5000",
            extendedTimeOut: "1000",
            showEasing: "swing",
            hideEasing: "linear",
            showMethod: "fadeIn",
            hideMethod: "fadeOut",
        };

        let opt = defaults;

        if (typeof options === "object") {
            opt = $.extend(defaults, options);
        }

        toastr.options = opt;

        toastrType = typeof toastrType !== "undefined" ? toastrType : "success";

        toastr[toastrType](toastrMessage);
    };

    $.ajaxModal = function (selector, url, onLoad) {
        $(selector).removeData("bs.modal").modal({
            remote: url,
            show: true,
        });

        // Trigger to do stuff with form loaded in modal
        $(document).trigger("ajaxPageLoad");

        // Call onload method if it was passed in function call
        if (typeof onLoad !== "undefined") {
            onLoad();
        }

        // Reset modal when it hides
        $(selector).on("hidden.bs.modal", function () {
            $(this).find(".modal-body").html("Loading...");
            $(this)
                .find(".modal-footer")
                .html(
                    '<button type="button" data-dismiss="modal" class="btn dark btn-outline">Cancel</button>',
                );
            $(this).data("bs.modal", null);
        });
    };

    $.showErrors = function (object) {
        const keys = Object.keys(object);

        $(".has-error").find(".help-block").remove();
        $(".has-error").removeClass("has-error");

        for (let i = 0; i < keys.length; i++) {
            let ele = $("[name='" + keys[i] + "']");
            if (ele.length == 0) {
                ele = $("#" + keys[i]);
            }
            const grp = ele.closest(".form-group");
            $(grp).find(".help-block").remove();
            let helpBlockContainer = $(grp).find("div:first");

            if (helpBlockContainer.length == 0) {
                helpBlockContainer = $(grp);
            }

            helpBlockContainer.append(
                '<div class="help-block">' + object[keys[i]] + "</div>",
            );
            $(grp).addClass("has-error");
        }
    };
})(jQuery);

// Prevent submit of ajax form
$(document).on("ready", function () {
    $(".ajax-form").on("submit", function (e) {
        e.preventDefault();
    });
});
$(document).on("ajaxPageLoad", function () {
    $(".ajax-form").on("submit", function (e) {
        e.preventDefault();
    });
});

/**
 * bootbox.js v4.4.0
 *
 * http://bootboxjs.com/license.txt
 */
!(function (a, b) {
    "use strict";
    typeof define === "function" && define.amd
        ? define(["jquery"], b)
        : typeof exports === "object"
          ? (module.exports = b(require("jquery")))
          : (a.bootbox = b(a.jQuery));
})(this, function a(b, c) {
    "use strict";
    function d(a) {
        const b = q[o.locale];
        return b ? b[a] : q.en[a];
    }
    function e(a, c, d) {
        a.stopPropagation(), a.preventDefault();
        const e = b.isFunction(d) && d.call(c, a) === !1;
        e || c.modal("hide");
    }
    function f(a) {
        let b;
        let c = 0;
        for (b in a) c++;
        return c;
    }
    function g(a, c) {
        let d = 0;
        b.each(a, function (a, b) {
            c(a, b, d++);
        });
    }
    function h(a) {
        let c, d;
        if (typeof a !== "object") {
            throw new Error("Please supply an object of options");
        }
        if (!a.message) throw new Error("Please specify a message");
        return (
            (a = b.extend({}, o, a)),
            a.buttons || (a.buttons = {}),
            (c = a.buttons),
            (d = f(c)),
            g(c, function (a, e, f) {
                if (
                    (b.isFunction(e) && (e = c[a] = { callback: e }),
                    b.type(e) !== "object")
                ) {
                    throw new Error(
                        "button with key " + a + " must be an object",
                    );
                }
                e.label || (e.label = a),
                    e.className ||
                        (e.className =
                            d <= 2 && f === d - 1
                                ? "btn-primary"
                                : "btn-default");
            }),
            a
        );
    }
    function i(a, b) {
        const c = a.length;
        let d = {};
        if (c < 1 || c > 2) throw new Error("Invalid argument length");
        return (
            c === 2 || typeof a[0] === "string"
                ? ((d[b[0]] = a[0]), (d[b[1]] = a[1]))
                : (d = a[0]),
            d
        );
    }
    function j(a, c, d) {
        return b.extend(!0, {}, a, i(c, d));
    }
    function k(a, b, c, d) {
        const e = { className: "bootbox-" + a, buttons: l.apply(null, b) };
        return m(j(e, d, c), b);
    }
    function l() {
        for (var a = {}, b = 0, c = arguments.length; c > b; b++) {
            const e = arguments[b];
            const f = e.toLowerCase();
            const g = e.toUpperCase();
            a[f] = { label: d(g) };
        }
        return a;
    }
    function m(a, b) {
        const d = {};
        return (
            g(b, function (a, b) {
                d[b] = !0;
            }),
            g(a.buttons, function (a) {
                if (d[a] === c) {
                    throw new Error(
                        "button key " +
                            a +
                            " is not allowed (options are " +
                            b.join("\n") +
                            ")",
                    );
                }
            }),
            a
        );
    }
    const n = {
        dialog: "<div class='bootbox modal' tabindex='-1' role='dialog'><div class='modal-dialog'><div class='modal-content'><div class='modal-body'><div class='bootbox-body'></div></div></div></div></div>",
        header: "<div class='modal-header'><h4 class='modal-title'></h4></div>",
        footer: "<div class='modal-footer'></div>",
        closeButton:
            "<button type='button' class='bootbox-close-button close' data-dismiss='modal' aria-hidden='true'>&times;</button>",
        form: "<form class='bootbox-form'></form>",
        inputs: {
            text: "<input class='bootbox-input bootbox-input-text form-control' autocomplete=off type=text />",
            textarea:
                "<textarea class='bootbox-input bootbox-input-textarea form-control'></textarea>",
            email: "<input class='bootbox-input bootbox-input-email form-control' autocomplete='off' type='email' />",
            select: "<select class='bootbox-input bootbox-input-select form-control'></select>",
            checkbox:
                "<div class='checkbox'><label><input class='bootbox-input bootbox-input-checkbox' type='checkbox' /></label></div>",
            date: "<input class='bootbox-input bootbox-input-date form-control' autocomplete=off type='date' />",
            time: "<input class='bootbox-input bootbox-input-time form-control' autocomplete=off type='time' />",
            number: "<input class='bootbox-input bootbox-input-number form-control' autocomplete=off type='number' />",
            password:
                "<input class='bootbox-input bootbox-input-password form-control' autocomplete='off' type='password' />",
        },
    };
    var o = {
        locale: "en",
        backdrop: "static",
        animate: !0,
        className: null,
        closeButton: !0,
        show: !0,
        container: "body",
    };
    const p = {};
    (p.alert = function () {
        let a;
        if (
            ((a = k("alert", ["ok"], ["message", "callback"], arguments)),
            a.callback && !b.isFunction(a.callback))
        ) {
            throw new Error(
                "alert requires callback property to be a function when provided",
            );
        }
        return (
            (a.buttons.ok.callback = a.onEscape =
                function () {
                    return b.isFunction(a.callback)
                        ? a.callback.call(this)
                        : !0;
                }),
            p.dialog(a)
        );
    }),
        (p.confirm = function () {
            let a;
            if (
                ((a = k(
                    "confirm",
                    ["cancel", "confirm"],
                    ["message", "callback"],
                    arguments,
                )),
                (a.buttons.cancel.callback = a.onEscape =
                    function () {
                        return a.callback.call(this, !1);
                    }),
                (a.buttons.confirm.callback = function () {
                    return a.callback.call(this, !0);
                }),
                !b.isFunction(a.callback))
            ) {
                throw new Error("confirm requires a callback");
            }
            return p.dialog(a);
        }),
        (p.prompt = function () {
            let a, d, e, f, h, i, k;
            if (
                ((f = b(n.form)),
                (d = {
                    className: "bootbox-prompt",
                    buttons: l("cancel", "confirm"),
                    value: "",
                    inputType: "text",
                }),
                (a = m(j(d, arguments, ["title", "callback"]), [
                    "cancel",
                    "confirm",
                ])),
                (i = a.show === c ? !0 : a.show),
                (a.message = f),
                (a.buttons.cancel.callback = a.onEscape =
                    function () {
                        return a.callback.call(this, null);
                    }),
                (a.buttons.confirm.callback = function () {
                    let c;
                    switch (a.inputType) {
                        case "text":
                        case "textarea":
                        case "email":
                        case "select":
                        case "date":
                        case "time":
                        case "number":
                        case "password":
                            c = h.val();
                            break;
                        case "checkbox":
                            var d = h.find("input:checked");
                            (c = []),
                                g(d, function (a, d) {
                                    c.push(b(d).val());
                                });
                    }
                    return a.callback.call(this, c);
                }),
                (a.show = !1),
                !a.title)
            ) {
                throw new Error("prompt requires a title");
            }
            if (!b.isFunction(a.callback)) {
                throw new Error("prompt requires a callback");
            }
            if (!n.inputs[a.inputType]) throw new Error("invalid prompt type");
            switch (((h = b(n.inputs[a.inputType])), a.inputType)) {
                case "text":
                case "textarea":
                case "email":
                case "date":
                case "time":
                case "number":
                case "password":
                    h.val(a.value);
                    break;
                case "select":
                    var o = {};
                    if (((k = a.inputOptions || []), !b.isArray(k))) {
                        throw new Error(
                            "Please pass an array of input options",
                        );
                    }
                    if (!k.length) {
                        throw new Error("prompt with select requires options");
                    }
                    g(k, function (a, d) {
                        let e = h;
                        if (d.value === c || d.text === c) {
                            throw new Error("given options in wrong format");
                        }
                        d.group &&
                            (o[d.group] ||
                                (o[d.group] = b("<optgroup/>").attr(
                                    "label",
                                    d.group,
                                )),
                            (e = o[d.group])),
                            e.append(
                                "<option value='" +
                                    d.value +
                                    "'>" +
                                    d.text +
                                    "</option>",
                            );
                    }),
                        g(o, function (a, b) {
                            h.append(b);
                        }),
                        h.val(a.value);
                    break;
                case "checkbox":
                    var q = b.isArray(a.value) ? a.value : [a.value];
                    if (((k = a.inputOptions || []), !k.length)) {
                        throw new Error(
                            "prompt with checkbox requires options",
                        );
                    }
                    if (!k[0].value || !k[0].text) {
                        throw new Error("given options in wrong format");
                    }
                    (h = b("<div/>")),
                        g(k, function (c, d) {
                            const e = b(n.inputs[a.inputType]);
                            e.find("input").attr("value", d.value),
                                e.find("label").append(d.text),
                                g(q, function (a, b) {
                                    b === d.value &&
                                        e.find("input").prop("checked", !0);
                                }),
                                h.append(e);
                        });
            }
            return (
                a.placeholder && h.attr("placeholder", a.placeholder),
                a.pattern && h.attr("pattern", a.pattern),
                a.maxlength && h.attr("maxlength", a.maxlength),
                f.append(h),
                f.on("submit", function (a) {
                    a.preventDefault(),
                        a.stopPropagation(),
                        e.find(".btn-primary").click();
                }),
                (e = p.dialog(a)),
                e.off("shown.bs.modal"),
                e.on("shown.bs.modal", function () {
                    h.focus();
                }),
                i === !0 && e.modal("show"),
                e
            );
        }),
        (p.dialog = function (a) {
            a = h(a);
            const d = b(n.dialog);
            const f = d.find(".modal-dialog");
            const i = d.find(".modal-body");
            const j = a.buttons;
            let k = "";
            const l = { onEscape: a.onEscape };
            if (b.fn.modal === c) {
                throw new Error(
                    "$.fn.modal is not defined; please double check you have included the Bootstrap JavaScript library. See http://getbootstrap.com/javascript/ for more details.",
                );
            }
            if (
                (g(j, function (a, b) {
                    (k +=
                        "<button data-bb-handler='" +
                        a +
                        "' type='button' class='btn " +
                        b.className +
                        "'>" +
                        b.label +
                        "</button>"),
                        (l[a] = b.callback);
                }),
                i.find(".bootbox-body").html(a.message),
                a.animate === !0 && d.addClass("fade"),
                a.className && d.addClass(a.className),
                a.size === "large"
                    ? f.addClass("modal-lg")
                    : a.size === "small" && f.addClass("modal-sm"),
                a.title && i.before(n.header),
                a.closeButton)
            ) {
                const m = b(n.closeButton);
                a.title
                    ? d.find(".modal-header").prepend(m)
                    : m.css("margin-top", "-10px").prependTo(i);
            }
            return (
                a.title && d.find(".modal-title").html(a.title),
                k.length &&
                    (i.after(n.footer), d.find(".modal-footer").html(k)),
                d.on("hidden.bs.modal", function (a) {
                    a.target === this && d.remove();
                }),
                d.on("shown.bs.modal", function () {
                    d.find(".btn-primary:first").focus();
                }),
                a.backdrop !== "static" &&
                    d.on("click.dismiss.bs.modal", function (a) {
                        d.children(".modal-backdrop").length &&
                            (a.currentTarget = d
                                .children(".modal-backdrop")
                                .get(0)),
                            a.target === a.currentTarget &&
                                d.trigger("escape.close.bb");
                    }),
                d.on("escape.close.bb", function (a) {
                    l.onEscape && e(a, d, l.onEscape);
                }),
                d.on("click", ".modal-footer button", function (a) {
                    const c = b(this).data("bb-handler");
                    e(a, d, l[c]);
                }),
                d.on("click", ".bootbox-close-button", function (a) {
                    e(a, d, l.onEscape);
                }),
                d.on("keyup", function (a) {
                    a.which === 27 && d.trigger("escape.close.bb");
                }),
                b(a.container).append(d),
                d.modal({
                    backdrop: a.backdrop ? "static" : !1,
                    keyboard: !1,
                    show: !1,
                }),
                a.show && d.modal("show"),
                d
            );
        }),
        (p.setDefaults = function () {
            let a = {};
            arguments.length === 2
                ? (a[arguments[0]] = arguments[1])
                : (a = arguments[0]),
                b.extend(o, a);
        }),
        (p.hideAll = function () {
            return b(".bootbox").modal("hide"), p;
        });
    var q = {
        bg_BG: {
            OK: "ÐžÐº",
            CANCEL: "ÐžÑ‚ÐºÐ°Ð·",
            CONFIRM: "ÐŸÐ¾Ñ‚Ð²ÑŠÑ€Ð¶Ð´Ð°Ð²Ð°Ð¼",
        },
        br: { OK: "OK", CANCEL: "Cancelar", CONFIRM: "Sim" },
        cs: { OK: "OK", CANCEL: "ZruÅ¡it", CONFIRM: "Potvrdit" },
        da: { OK: "OK", CANCEL: "Annuller", CONFIRM: "Accepter" },
        de: { OK: "OK", CANCEL: "Abbrechen", CONFIRM: "Akzeptieren" },
        el: {
            OK: "Î•Î½Ï„Î¬Î¾ÎµÎ¹",
            CANCEL: "Î‘ÎºÏÏÏ‰ÏƒÎ·",
            CONFIRM: "Î•Ï€Î¹Î²ÎµÎ²Î±Î¯Ï‰ÏƒÎ·",
        },
        en: { OK: "OK", CANCEL: "Cancel", CONFIRM: "OK" },
        es: { OK: "OK", CANCEL: "Cancelar", CONFIRM: "Aceptar" },
        et: { OK: "OK", CANCEL: "Katkesta", CONFIRM: "OK" },
        fa: { OK: "Ù‚Ø¨ÙˆÙ„", CANCEL: "Ù„ØºÙˆ", CONFIRM: "ØªØ§ÛŒÛŒØ¯" },
        fi: { OK: "OK", CANCEL: "Peruuta", CONFIRM: "OK" },
        fr: { OK: "OK", CANCEL: "Annuler", CONFIRM: "D'accord" },
        he: {
            OK: "××™×©×•×¨",
            CANCEL: "×‘×™×˜×•×œ",
            CONFIRM: "××™×©×•×¨",
        },
        hu: { OK: "OK", CANCEL: "MÃ©gsem", CONFIRM: "MegerÅ‘sÃ­t" },
        hr: { OK: "OK", CANCEL: "Odustani", CONFIRM: "Potvrdi" },
        id: { OK: "OK", CANCEL: "Batal", CONFIRM: "OK" },
        it: { OK: "OK", CANCEL: "Annulla", CONFIRM: "Conferma" },
        ja: { OK: "OK", CANCEL: "ã‚­ãƒ£ãƒ³ã‚»ãƒ«", CONFIRM: "ç¢ºèª" },
        lt: { OK: "Gerai", CANCEL: "AtÅ¡aukti", CONFIRM: "Patvirtinti" },
        lv: { OK: "Labi", CANCEL: "Atcelt", CONFIRM: "ApstiprinÄt" },
        nl: { OK: "OK", CANCEL: "Annuleren", CONFIRM: "Accepteren" },
        no: { OK: "OK", CANCEL: "Avbryt", CONFIRM: "OK" },
        pl: { OK: "OK", CANCEL: "Anuluj", CONFIRM: "PotwierdÅº" },
        pt: { OK: "OK", CANCEL: "Cancelar", CONFIRM: "Confirmar" },
        ru: { OK: "OK", CANCEL: "ÐžÑ‚Ð¼ÐµÐ½Ð°", CONFIRM: "ÐŸÑ€Ð¸Ð¼ÐµÐ½Ð¸Ñ‚ÑŒ" },
        sq: { OK: "OK", CANCEL: "Anulo", CONFIRM: "Prano" },
        sv: { OK: "OK", CANCEL: "Avbryt", CONFIRM: "OK" },
        th: {
            OK: "à¸•à¸à¸¥à¸‡",
            CANCEL: "à¸¢à¸à¹€à¸¥à¸´à¸",
            CONFIRM: "à¸¢à¸·à¸™à¸¢à¸±à¸™",
        },
        tr: { OK: "Tamam", CANCEL: "Ä°ptal", CONFIRM: "Onayla" },
        zh_CN: { OK: "OK", CANCEL: "å–æ¶ˆ", CONFIRM: "ç¡®è®¤" },
        zh_TW: { OK: "OK", CANCEL: "å–æ¶ˆ", CONFIRM: "ç¢ºèª" },
    };
    return (
        (p.addLocale = function (a, c) {
            return (
                b.each(["OK", "CANCEL", "CONFIRM"], function (a, b) {
                    if (!c[b]) {
                        throw new Error(
                            "Please supply a translation for '" + b + "'",
                        );
                    }
                }),
                (q[a] = { OK: c.OK, CANCEL: c.CANCEL, CONFIRM: c.CONFIRM }),
                p
            );
        }),
        (p.removeLocale = function (a) {
            return delete q[a], p;
        }),
        (p.setLocale = function (a) {
            return p.setDefaults("locale", a);
        }),
        (p.init = function (c) {
            return a(c || b);
        }),
        p
    );
});

// Toastr
!(function (a) {
    a(["jquery"], function (a) {
        return (function () {
            function b(a, b, c) {
                return o({
                    type: u.error,
                    iconClass: p().iconClasses.error,
                    message: a,
                    optionsOverride: c,
                    title: b,
                });
            }
            function c(b, c) {
                return (
                    b || (b = p()),
                    (r = a("#" + b.containerId)),
                    r.length ? r : (c && (r = l(b)), r)
                );
            }
            function d(a, b, c) {
                return o({
                    type: u.info,
                    iconClass: p().iconClasses.info,
                    message: a,
                    optionsOverride: c,
                    title: b,
                });
            }
            function e(a) {
                s = a;
            }
            function f(a, b, c) {
                return o({
                    type: u.success,
                    iconClass: p().iconClasses.success,
                    message: a,
                    optionsOverride: c,
                    title: b,
                });
            }
            function g(a, b, c) {
                return o({
                    type: u.warning,
                    iconClass: p().iconClasses.warning,
                    message: a,
                    optionsOverride: c,
                    title: b,
                });
            }
            function h(a) {
                const b = p();
                r || c(b), k(a, b) || j(b);
            }
            function i(b) {
                const d = p();
                return (
                    r || c(d),
                    b && a(":focus", b).length === 0
                        ? void q(b)
                        : void (r.children().length && r.remove())
                );
            }
            function j(b) {
                for (let c = r.children(), d = c.length - 1; d >= 0; d--) {
                    k(a(c[d]), b);
                }
            }
            function k(b, c) {
                return b && a(":focus", b).length === 0
                    ? (b[c.hideMethod]({
                          duration: c.hideDuration,
                          easing: c.hideEasing,
                          complete: function () {
                              q(b);
                          },
                      }),
                      !0)
                    : !1;
            }
            function l(b) {
                return (
                    (r = a("<div/>")
                        .attr("id", b.containerId)
                        .addClass(b.positionClass)
                        .attr("aria-live", "polite")
                        .attr("role", "alert")),
                    r.appendTo(a(b.target)),
                    r
                );
            }
            function m() {
                return {
                    tapToDismiss: !0,
                    toastClass: "toast",
                    containerId: "toast-container",
                    debug: !1,
                    showMethod: "fadeIn",
                    showDuration: 300,
                    showEasing: "swing",
                    onShown: void 0,
                    hideMethod: "fadeOut",
                    hideDuration: 1e3,
                    hideEasing: "swing",
                    onHidden: void 0,
                    extendedTimeOut: 1e3,
                    iconClasses: {
                        error: "toast-error",
                        info: "toast-info",
                        success: "toast-success",
                        warning: "toast-warning",
                    },
                    iconClass: "toast-info",
                    positionClass: "toast-top-right",
                    timeOut: 5e3,
                    titleClass: "toast-title",
                    messageClass: "toast-message",
                    target: "body",
                    closeHtml: "<button>&times;</button>",
                    newestOnTop: !0,
                };
            }
            function n(a) {
                s && s(a);
            }
            function o(b) {
                function d(b) {
                    return !a(":focus", j).length || b
                        ? j[g.hideMethod]({
                              duration: g.hideDuration,
                              easing: g.hideEasing,
                              complete: function () {
                                  q(j),
                                      g.onHidden &&
                                          o.state !== "hidden" &&
                                          g.onHidden(),
                                      (o.state = "hidden"),
                                      (o.endTime = new Date()),
                                      n(o);
                              },
                          })
                        : void 0;
                }
                function e() {
                    (g.timeOut > 0 || g.extendedTimeOut > 0) &&
                        (i = setTimeout(d, g.extendedTimeOut));
                }
                function f() {
                    clearTimeout(i),
                        j
                            .stop(!0, !0)
                            [
                                g.showMethod
                            ]({ duration: g.showDuration, easing: g.showEasing });
                }
                var g = p();
                let h = b.iconClass || g.iconClass;
                typeof b.optionsOverride !== "undefined" &&
                    ((g = a.extend(g, b.optionsOverride)),
                    (h = b.optionsOverride.iconClass || h)),
                    t++,
                    (r = c(g, !0));
                var i = null;
                var j = a("<div/>");
                const k = a("<div/>");
                const l = a("<div/>");
                const m = a(g.closeHtml);
                var o = {
                    toastId: t,
                    state: "visible",
                    startTime: new Date(),
                    options: g,
                    map: b,
                };
                return (
                    b.iconClass && j.addClass(g.toastClass).addClass(h),
                    b.title &&
                        (k.append(b.title).addClass(g.titleClass), j.append(k)),
                    b.message &&
                        (l.append(b.message).addClass(g.messageClass),
                        j.append(l)),
                    g.closeButton &&
                        (m
                            .addClass("toast-close-button")
                            .attr("role", "button"),
                        j.prepend(m)),
                    j.hide(),
                    g.newestOnTop ? r.prepend(j) : r.append(j),
                    j[g.showMethod]({
                        duration: g.showDuration,
                        easing: g.showEasing,
                        complete: g.onShown,
                    }),
                    g.timeOut > 0 && (i = setTimeout(d, g.timeOut)),
                    j.hover(f, e),
                    !g.onclick && g.tapToDismiss && j.click(d),
                    g.closeButton &&
                        m &&
                        m.click(function (a) {
                            a.stopPropagation
                                ? a.stopPropagation()
                                : void 0 !== a.cancelBubble &&
                                  a.cancelBubble !== !0 &&
                                  (a.cancelBubble = !0),
                                d(!0);
                        }),
                    g.onclick &&
                        j.click(function () {
                            g.onclick(), d();
                        }),
                    n(o),
                    g.debug && console && console.log(o),
                    j
                );
            }
            function p() {
                return a.extend({}, m(), v.options);
            }
            function q(a) {
                r || (r = c()),
                    a.is(":visible") ||
                        (a.remove(),
                        (a = null),
                        r.children().length === 0 && r.remove());
            }
            let r;
            let s;
            var t = 0;
            var u = {
                error: "error",
                info: "info",
                success: "success",
                warning: "warning",
            };
            var v = {
                clear: h,
                remove: i,
                error: b,
                getContainer: c,
                info: d,
                options: {},
                subscribe: e,
                success: f,
                version: "2.0.3",
                warning: g,
            };
            return v;
        })();
    });
})(
    typeof define === "function" && define.amd
        ? define
        : function (a, b) {
              typeof module !== "undefined" && module.exports
                  ? (module.exports = b(require("jquery")))
                  : (window.toastr = b(window.jQuery));
          },
);

/*!
 * jQuery blockUI plugin
 * Version 2.70.0-2014.11.23
 * Requires jQuery v1.7 or later
 *
 * Examples at: http://malsup.com/jquery/block/
 * Copyright (c) 2007-2013 M. Alsup
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * Thanks to Amir-Hossein Sobhi for some excellent contributions!
 */
!(function () {
    "use strict";
    function e(e) {
        function t(t, n) {
            let s;
            let h;
            const k = t == window;
            let y = n && void 0 !== n.message ? n.message : void 0;
            if (
                ((n = e.extend({}, e.blockUI.defaults, n || {})),
                !n.ignoreIfBlocked || !e(t).data("blockUI.isBlocked"))
            ) {
                if (
                    ((n.overlayCSS = e.extend(
                        {},
                        e.blockUI.defaults.overlayCSS,
                        n.overlayCSS || {},
                    )),
                    (s = e.extend({}, e.blockUI.defaults.css, n.css || {})),
                    n.onOverlayClick && (n.overlayCSS.cursor = "pointer"),
                    (h = e.extend(
                        {},
                        e.blockUI.defaults.themedCSS,
                        n.themedCSS || {},
                    )),
                    (y = void 0 === y ? n.message : y),
                    k && p && o(window, { fadeOut: 0 }),
                    y && typeof y !== "string" && (y.parentNode || y.jquery))
                ) {
                    const m = y.jquery ? y[0] : y;
                    const v = {};
                    e(t).data("blockUI.history", v),
                        (v.el = m),
                        (v.parent = m.parentNode),
                        (v.display = m.style.display),
                        (v.position = m.style.position),
                        v.parent && v.parent.removeChild(m);
                }
                e(t).data("blockUI.onUnblock", n.onUnblock);
                let g;
                let I;
                let w;
                let U;
                let x = n.baseZ;
                (g = e(
                    r || n.forceIframe
                        ? '<iframe class="blockUI" style="z-index:' +
                              x++ +
                              ';display:none;border:none;margin:0;padding:0;position:absolute;width:100%;height:100%;top:0;left:0" src="' +
                              n.iframeSrc +
                              '"></iframe>'
                        : '<div class="blockUI" style="display:none"></div>',
                )),
                    (I = e(
                        n.theme
                            ? '<div class="blockUI blockOverlay ui-widget-overlay" style="z-index:' +
                                  x++ +
                                  ';display:none"></div>'
                            : '<div class="blockUI blockOverlay" style="z-index:' +
                                  x++ +
                                  ';display:none;border:none;margin:0;padding:0;width:100%;height:100%;top:0;left:0"></div>',
                    )),
                    n.theme && k
                        ? ((U =
                              '<div class="blockUI ' +
                              n.blockMsgClass +
                              ' blockPage ui-dialog ui-widget ui-corner-all" style="z-index:' +
                              (x + 10) +
                              ';display:none;position:fixed">'),
                          n.title &&
                              (U +=
                                  '<div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">' +
                                  (n.title || "&nbsp;") +
                                  "</div>"),
                          (U +=
                              '<div class="ui-widget-content ui-dialog-content"></div>'),
                          (U += "</div>"))
                        : n.theme
                          ? ((U =
                                '<div class="blockUI ' +
                                n.blockMsgClass +
                                ' blockElement ui-dialog ui-widget ui-corner-all" style="z-index:' +
                                (x + 10) +
                                ';display:none;position:absolute">'),
                            n.title &&
                                (U +=
                                    '<div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">' +
                                    (n.title || "&nbsp;") +
                                    "</div>"),
                            (U +=
                                '<div class="ui-widget-content ui-dialog-content"></div>'),
                            (U += "</div>"))
                          : (U = k
                                ? '<div class="blockUI ' +
                                  n.blockMsgClass +
                                  ' blockPage" style="z-index:' +
                                  (x + 10) +
                                  ';display:none;position:fixed"></div>'
                                : '<div class="blockUI ' +
                                  n.blockMsgClass +
                                  ' blockElement" style="z-index:' +
                                  (x + 10) +
                                  ';display:none;position:absolute"></div>'),
                    (w = e(U)),
                    y &&
                        (n.theme
                            ? (w.css(h), w.addClass("ui-widget-content"))
                            : w.css(s)),
                    n.theme || I.css(n.overlayCSS),
                    I.css("position", k ? "fixed" : "absolute"),
                    (r || n.forceIframe) && g.css("opacity", 0);
                const C = [g, I, w];
                const S = e(k ? "body" : t);
                e.each(C, function () {
                    this.appendTo(S);
                }),
                    n.theme &&
                        n.draggable &&
                        e.fn.draggable &&
                        w.draggable({
                            handle: ".ui-dialog-titlebar",
                            cancel: "li",
                        });
                const O =
                    f &&
                    (!e.support.boxModel ||
                        e("object,embed", k ? null : t).length > 0);
                if (u || O) {
                    if (
                        (k &&
                            n.allowBodyStretch &&
                            e.support.boxModel &&
                            e("html,body").css("height", "100%"),
                        (u || !e.support.boxModel) && !k)
                    ) {
                        const E = d(t, "borderTopWidth");
                        const T = d(t, "borderLeftWidth");
                        var M = E ? "(0 - " + E + ")" : 0;
                        var B = T ? "(0 - " + T + ")" : 0;
                    }
                    e.each(C, function (e, t) {
                        const o = t[0].style;
                        if (((o.position = "absolute"), e < 2)) {
                            k
                                ? o.setExpression(
                                      "height",
                                      "Math.max(document.body.scrollHeight, document.body.offsetHeight) - (jQuery.support.boxModel?0:" +
                                          n.quirksmodeOffsetHack +
                                          ') + "px"',
                                  )
                                : o.setExpression(
                                      "height",
                                      'this.parentNode.offsetHeight + "px"',
                                  ),
                                k
                                    ? o.setExpression(
                                          "width",
                                          'jQuery.support.boxModel && document.documentElement.clientWidth || document.body.clientWidth + "px"',
                                      )
                                    : o.setExpression(
                                          "width",
                                          'this.parentNode.offsetWidth + "px"',
                                      ),
                                B && o.setExpression("left", B),
                                M && o.setExpression("top", M);
                        } else if (n.centerY) {
                            k &&
                                o.setExpression(
                                    "top",
                                    '(document.documentElement.clientHeight || document.body.clientHeight) / 2 - (this.offsetHeight / 2) + (blah = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"',
                                ),
                                (o.marginTop = 0);
                        } else if (!n.centerY && k) {
                            const i =
                                n.css && n.css.top
                                    ? parseInt(n.css.top, 10)
                                    : 0;
                            const s =
                                "((document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + " +
                                i +
                                ') + "px"';
                            o.setExpression("top", s);
                        }
                    });
                }
                if (
                    (y &&
                        (n.theme
                            ? w.find(".ui-widget-content").append(y)
                            : w.append(y),
                        (y.jquery || y.nodeType) && e(y).show()),
                    (r || n.forceIframe) && n.showOverlay && g.show(),
                    n.fadeIn)
                ) {
                    const j = n.onBlock ? n.onBlock : c;
                    const H = n.showOverlay && !y ? j : c;
                    const z = y ? j : c;
                    n.showOverlay && I._fadeIn(n.fadeIn, H),
                        y && w._fadeIn(n.fadeIn, z);
                } else {
                    n.showOverlay && I.show(),
                        y && w.show(),
                        n.onBlock && n.onBlock.bind(w)();
                }
                if (
                    (i(1, t, n),
                    k
                        ? ((p = w[0]),
                          (b = e(n.focusableElements, p)),
                          n.focusInput && setTimeout(l, 20))
                        : a(w[0], n.centerX, n.centerY),
                    n.timeout)
                ) {
                    const W = setTimeout(function () {
                        k ? e.unblockUI(n) : e(t).unblock(n);
                    }, n.timeout);
                    e(t).data("blockUI.timeout", W);
                }
            }
        }
        function o(t, o) {
            let s;
            const l = t == window;
            const a = e(t);
            const d = a.data("blockUI.history");
            const c = a.data("blockUI.timeout");
            c && (clearTimeout(c), a.removeData("blockUI.timeout")),
                (o = e.extend({}, e.blockUI.defaults, o || {})),
                i(0, t, o),
                o.onUnblock === null &&
                    ((o.onUnblock = a.data("blockUI.onUnblock")),
                    a.removeData("blockUI.onUnblock"));
            let r;
            (r = l
                ? e("body").children().filter(".blockUI").add("body > .blockUI")
                : a.find(">.blockUI")),
                o.cursorReset &&
                    (r.length > 1 && (r[1].style.cursor = o.cursorReset),
                    r.length > 2 && (r[2].style.cursor = o.cursorReset)),
                l && (p = b = null),
                o.fadeOut
                    ? ((s = r.length),
                      r.stop().fadeOut(o.fadeOut, function () {
                          --s === 0 && n(r, d, o, t);
                      }))
                    : n(r, d, o, t);
        }
        function n(t, o, n, i) {
            const s = e(i);
            if (!s.data("blockUI.isBlocked")) {
                t.each(function () {
                    this.parentNode && this.parentNode.removeChild(this);
                }),
                    o &&
                        o.el &&
                        ((o.el.style.display = o.display),
                        (o.el.style.position = o.position),
                        (o.el.style.cursor = "default"),
                        o.parent && o.parent.appendChild(o.el),
                        s.removeData("blockUI.history")),
                    s.data("blockUI.static") && s.css("position", "static"),
                    typeof n.onUnblock === "function" && n.onUnblock(i, n);
                const l = e(document.body);
                const a = l.width();
                const d = l[0].style.width;
                l.width(a - 1).width(a), (l[0].style.width = d);
            }
        }
        function i(t, o, n) {
            const i = o == window;
            const l = e(o);
            if (
                (t || ((!i || p) && (i || l.data("blockUI.isBlocked")))) &&
                (l.data("blockUI.isBlocked", t),
                i && n.bindEvents && (!t || n.showOverlay))
            ) {
                const a =
                    "mousedown mouseup keydown keypress keyup touchstart touchend touchmove";
                t ? e(document).bind(a, n, s) : e(document).unbind(a, s);
            }
        }
        function s(t) {
            if (
                t.type === "keydown" &&
                t.keyCode &&
                t.keyCode == 9 &&
                p &&
                t.data.constrainTabKey
            ) {
                const o = b;
                const n = !t.shiftKey && t.target === o[o.length - 1];
                const i = t.shiftKey && t.target === o[0];
                if (n || i) {
                    return (
                        setTimeout(function () {
                            l(i);
                        }, 10),
                        !1
                    );
                }
            }
            const s = t.data;
            const a = e(t.target);
            return (
                a.hasClass("blockOverlay") &&
                    s.onOverlayClick &&
                    s.onOverlayClick(t),
                a.parents("div." + s.blockMsgClass).length > 0
                    ? !0
                    : a.parents().children().filter("div.blockUI").length === 0
            );
        }
        function l(e) {
            if (b) {
                const t = b[e === !0 ? b.length - 1 : 0];
                t && t.focus();
            }
        }
        function a(e, t, o) {
            const n = e.parentNode;
            const i = e.style;
            const s =
                (n.offsetWidth - e.offsetWidth) / 2 - d(n, "borderLeftWidth");
            const l =
                (n.offsetHeight - e.offsetHeight) / 2 - d(n, "borderTopWidth");
            t && (i.left = s > 0 ? s + "px" : "0"),
                o && (i.top = l > 0 ? l + "px" : "0");
        }
        function d(t, o) {
            return parseInt(e.css(t, o), 10) || 0;
        }
        e.fn._fadeIn = e.fn.fadeIn;
        var c = e.noop || function () {};
        var r = /MSIE/.test(navigator.userAgent);
        var u =
            /MSIE 6.0/.test(navigator.userAgent) &&
            !/MSIE 8.0/.test(navigator.userAgent);
        var f =
            (document.documentMode || 0,
            e.isFunction(document.createElement("div").style.setExpression));
        (e.blockUI = function (e) {
            t(window, e);
        }),
            (e.unblockUI = function (e) {
                o(window, e);
            }),
            (e.growlUI = function (t, o, n, i) {
                const s = e('<div class="growlUI"></div>');
                t && s.append("<h1>" + t + "</h1>"),
                    o && s.append("<h2>" + o + "</h2>"),
                    void 0 === n && (n = 3e3);
                const l = function (t) {
                    (t = t || {}),
                        e.blockUI({
                            message: s,
                            fadeIn:
                                typeof t.fadeIn !== "undefined"
                                    ? t.fadeIn
                                    : 700,
                            fadeOut:
                                typeof t.fadeOut !== "undefined"
                                    ? t.fadeOut
                                    : 1e3,
                            timeout:
                                typeof t.timeout !== "undefined"
                                    ? t.timeout
                                    : n,
                            centerY: !1,
                            showOverlay: !1,
                            onUnblock: i,
                            css: e.blockUI.defaults.growlCSS,
                        });
                };
                l();
                s.css("opacity");
                s.mouseover(function () {
                    l({ fadeIn: 0, timeout: 3e4 });
                    const t = e(".blockMsg");
                    t.stop(), t.fadeTo(300, 1);
                }).mouseout(function () {
                    e(".blockMsg").fadeOut(1e3);
                });
            }),
            (e.fn.block = function (o) {
                if (this[0] === window) return e.blockUI(o), this;
                const n = e.extend({}, e.blockUI.defaults, o || {});
                return (
                    this.each(function () {
                        const t = e(this);
                        (n.ignoreIfBlocked && t.data("blockUI.isBlocked")) ||
                            t.unblock({ fadeOut: 0 });
                    }),
                    this.each(function () {
                        e.css(this, "position") == "static" &&
                            ((this.style.position = "relative"),
                            e(this).data("blockUI.static", !0)),
                            (this.style.zoom = 1),
                            t(this, o);
                    })
                );
            }),
            (e.fn.unblock = function (t) {
                return this[0] === window
                    ? (e.unblockUI(t), this)
                    : this.each(function () {
                          o(this, t);
                      });
            }),
            (e.blockUI.version = 2.7),
            (e.blockUI.defaults = {
                message: "<h1>Please wait...</h1>",
                title: null,
                draggable: !0,
                theme: !1,
                css: {
                    padding: 0,
                    margin: 0,
                    width: "30%",
                    top: "40%",
                    left: "35%",
                    textAlign: "center",
                    color: "#000",
                    border: "3px solid #aaa",
                    backgroundColor: "#fff",
                    cursor: "wait",
                },
                themedCSS: { width: "30%", top: "40%", left: "35%" },
                overlayCSS: {
                    backgroundColor: "#000",
                    opacity: 0.6,
                    cursor: "wait",
                },
                cursorReset: "default",
                growlCSS: {
                    width: "350px",
                    top: "10px",
                    left: "",
                    right: "10px",
                    border: "none",
                    padding: "5px",
                    opacity: 0.6,
                    cursor: "default",
                    color: "#fff",
                    backgroundColor: "#000",
                    "-webkit-border-radius": "10px",
                    "-moz-border-radius": "10px",
                    "border-radius": "10px",
                },
                iframeSrc: /^https/i.test(window.location.href || "")
                    ? "javascript:false"
                    : "about:blank",
                forceIframe: !1,
                baseZ: 1e3,
                centerX: !0,
                centerY: !0,
                allowBodyStretch: !0,
                bindEvents: !0,
                constrainTabKey: !0,
                fadeIn: 200,
                fadeOut: 400,
                timeout: 0,
                showOverlay: !0,
                focusInput: !0,
                focusableElements: ":input:enabled:visible",
                onBlock: null,
                onUnblock: null,
                onOverlayClick: null,
                quirksmodeOffsetHack: 4,
                blockMsgClass: "blockMsg",
                ignoreIfBlocked: !1,
            });
        var p = null;
        var b = [];
    }
    typeof define === "function" && define.amd && define.amd.jQuery
        ? define(["jquery"], e)
        : e(jQuery);
})();
