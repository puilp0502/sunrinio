var App = {
        init: function () {
            Helpers.init(), $(".template-customers-login")[0] ? AccountLogin.init() : $(".template-customers-account")[0] ? CustomerAccount.init() : $(".template-product")[0] && Product.init()
        }
    },
    Helpers = {
        init: function () {
            Helpers.forms(), Helpers.images(), Helpers.actions(), Helpers.popovers(), Helpers.popups()
        },
        popups: function () {
            $(document).on("click", "[data-popup]", function (t) {
                function e() {
                    n.css("display", ""), i.remove(), o.parent().off("click.popup")
                }
                t.preventDefault(), t.stopPropagation();
                var o = $(this),
                    n = $(o.attr("data-popup")).css("display", "block"),
                    i = $('<div class="popup-screen"></div>').appendTo(o.parent());
                o.parent().one("click.popup", "[data-popup-text]", function (t) {
                    o.find(".popup-link-text").text(this.getAttribute("data-popup-text")), $(this.getAttribute("data-popup-btn")).html("Buy " + this.getAttribute("data-popup-price")).attr("data-product-id", this.getAttribute("data-popup-product-id")), e()
                }), i.one("click.popup", e)
            })
        },
        popovers: function () {
            $('[data-toggle="popover"]').popover()
        },
        forms: function () {
            $("input.error, textarea.error").focus(function () {
                $(this).removeClass("error")
            })
        },
        images: function () {
            $(".article img").load(function () {
                var t = $(this).attr("src").replace(/_grande\.|_large\.|_medium\.|_small\./, "."),
                    e = $(this).width();
                $(this).attr("src", t).attr("width", e).removeAttr("height")
            })
        },
        actions: function () {
            $(document).on("click", '[data-action="buy"]', function (t) {
                t.preventDefault(), window.location.href = "/cart/" + t.target.getAttribute("data-product-id") + ":1"
            })
        }
    },
    CustomerAccount = {
        RESET_PASS_TEMPLATE: '<div class="hidden-off-screen"><iframe id="my_reset_frame" name="my_reset_frame" src=""></iframe><form accept-charset="UTF-8" target="my_reset_frame" action="/account/recover" method="post"><input name="form_type" type="hidden" value="recover_customer_password"><input name="utf8" type="hidden" value="✓"><input id="customer_email" type="email" name="email"></form></div>',
        RESET_PASS_SUCCESS_TEMPLATE: '<p class="pull-right muted">An email has been sent.</p>',
        init: function () {
            CustomerAccount.addListeners()
        },
        addListeners: function () {
            $(document).on("click", '[data-action="reset-password"]', function (t) {
                var e = $(t.target),
                    o = $(CustomerAccount.RESET_PASS_TEMPLATE),
                    n = $(CustomerAccount.RESET_PASS_SUCCESS_TEMPLATE),
                    i = e.attr("data-action-value");
                o.find("#customer_email").val(i), o.appendTo(document.body), n.insertAfter(t.target), $(t.target).remove(), o.find("form").submit()
            })
        }
    },
    AccountLogin = {
        init: function () {
            AccountLogin.checkForFormErrors(), AccountLogin.addListeners()
        },
        checkForFormErrors: function () {
            $(".form-recover-password .alert")[0] && AccountLogin.showRecoverMode()
        },
        addListeners: function () {
            $(".js-forgotPassword").on("click", function (t) {
                t.preventDefault(), AccountLogin.showRecoverMode()
            })
        },
        showRecoverMode: function () {
            $(".form-wrapper").addClass("is-inRecoveryMode")
        }
    },
    Product = {
        init: function () {
            Product.addListeners()
        },
        addListeners: function () {
            $(document).on("shown.bs.collapse", function (t) {
                var e = t.target;
                $(window).on("keyup.bsthemes.collapse", function (t) {
                    27 === t.which && ($(window).off("keyup.bsthemes.collapse"), $(e).collapse("hide"))
                })
            }), $(document).on("click", '[data-action="toggle-preview-size"]', function (t) {
                if (!$(this).hasClass("btn-active")) {
                    var e = this.getAttribute("data-action-value");
                    "phone" === e ? (Product.setActiveIconButton(".js-phoneBtn"), Product.setIframeSize("iframe-phone")) : "desktop" === e && (Product.setActiveIconButton(".js-desktopBtn"), Product.setIframeSize(""))
                }
            }), $(document).on("click", '[data-action="navigate-to-docs"]', function (t) {
                t.preventDefault();
                var e = this.getAttribute("data-action-value");
                Product.showDocsInIframe(e)
            }), $(document).on("click", "[data-style]", function (t) {
                t.preventDefault();
                var e = this.getAttribute("data-product"),
                    o = this.getAttribute("data-style");
                $(".js-iframe")[0].src = "https://bootstrap-themes.github.io/" + e + "/" + o, $(".js-styleDropdown").html(this.innerText)
            })
        },
        setActiveIconButton: function (t) {
            $(".btn-icon.btn-active").removeClass("btn-active"), $(t).addClass("btn-active")
        },
        setIframeSize: function (t) {
            $(".iframe-preview")[0].className = "iframe-preview js-iframe " + t
        },
        showDocsInIframe: function (t) {
            $(".iframe-preview").attr("src", t)
        }
    };
$(function (t) {
    App.init()
});