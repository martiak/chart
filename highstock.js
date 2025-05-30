/*
 Highstock JS v9.1.2 (2021-06-16)

 (c) 2009-2021 Torstein Honsi

 License: www.highcharts.com/license
*/
'use strict';
(function(V, P) {
    "object" === typeof module && module.exports ? (P["default"] = P,
    module.exports = V.document ? P(V) : P) : "function" === typeof define && define.amd ? define("highcharts/highstock", function() {
        return P(V)
    }) : (V.Highcharts && V.Highcharts.error(16, !0),
    V.Highcharts = P(V))
}
)("undefined" !== typeof window ? window : this, function(V) {
    function P(c, x, E, H) {
        c.hasOwnProperty(x) || (c[x] = H.apply(null, E))
    }
    var c = {};
    P(c, "Core/Globals.js", [], function() {
        var c = "undefined" !== typeof V ? V : "undefined" !== typeof window ? window : {}, x;
        (function(n) {
            n.SVG_NS = "http://www.w3.org/2000/svg";
            n.product = "Highcharts";
            n.version = "9.1.2";
            n.win = c;
            n.doc = n.win.document;
            n.svg = n.doc && n.doc.createElementNS && !!n.doc.createElementNS(n.SVG_NS, "svg").createSVGRect;
            n.userAgent = n.win.navigator && n.win.navigator.userAgent || "";
            n.isChrome = -1 !== n.userAgent.indexOf("Chrome");
            n.isFirefox = -1 !== n.userAgent.indexOf("Firefox");
            n.isMS = /(edge|msie|trident)/i.test(n.userAgent) && !n.win.opera;
            n.isSafari = !n.isChrome && -1 !== n.userAgent.indexOf("Safari");
            n.isTouchDevice = /(Mobile|Android|Windows Phone)/.test(n.userAgent);
            n.isWebKit = -1 !== n.userAgent.indexOf("AppleWebKit");
            n.deg2rad = 2 * Math.PI / 360;
            n.hasBidiBug = n.isFirefox && 4 > parseInt(n.userAgent.split("Firefox/")[1], 10);
            n.hasTouch = !!n.win.TouchEvent;
            n.marginNames = ["plotTop", "marginRight", "marginBottom", "plotLeft"];
            n.noop = function() {}
            ;
            n.supportsPassiveEvents = function() {
                var c = !1;
                if (!n.isMS) {
                    var x = Object.defineProperty({}, "passive", {
                        get: function() {
                            c = !0
                        }
                    });
                    n.win.addEventListener && n.win.removeEventListener && (n.win.addEventListener("testPassive", n.noop, x),
                    n.win.removeEventListener("testPassive", n.noop, x))
                }
                return c
            }();
            n.charts = [];
            n.dateFormats = {};
            n.seriesTypes = {};
            n.symbolSizes = {};
            n.chartCount = 0
        }
        )(x || (x = {}));
        return x
    });
    P(c, "Core/Utilities.js", [c["Core/Globals.js"]], function(n) {
        function c(z, a, f, e) {
            var h = a ? "Highcharts error" : "Highcharts warning";
            32 === z && (z = h + ": Deprecated member");
            var m = d(z)
              , O = m ? h + " #" + z + ": www.highcharts.com/errors/" + z + "/" : z.toString();
            if ("undefined" !== typeof e) {
                var q = "";
                m && (O += "?");
                L(e, function(t, Q) {
                    q += "\n - " + Q + ": " + t;
                    m && (O += encodeURI(Q) + "=" + encodeURI(t))
                });
                O += q
            }
            B(n, "displayError", {
                chart: f,
                code: z,
                message: O,
                params: e
            }, function() {
                if (a)
                    throw Error(O);
                r.console && -1 === c.messages.indexOf(O) && console.warn(O)
            });
            c.messages.push(O)
        }
        function E(a, m) {
            var f = {};
            L(a, function(z, h) {
                if (G(a[h], !0) && !a.nodeType && m[h])
                    z = E(a[h], m[h]),
                    Object.keys(z).length && (f[h] = z);
                else if (G(a[h]) || a[h] !== m[h])
                    f[h] = a[h]
            });
            return f
        }
        function H(a, m) {
            return parseInt(a, m || 10)
        }
        function A(a) {
            return "string" === typeof a
        }
        function F(a) {
            a = Object.prototype.toString.call(a);
            return "[object Array]" === a || "[object Array Iterator]" === a
        }
        function G(a, m) {
            return !!a && "object" === typeof a && (!m || !F(a))
        }
        function J(a) {
            return G(a) && "number" === typeof a.nodeType
        }
        function p(a) {
            var m = a && a.constructor;
            return !(!G(a, !0) || J(a) || !m || !m.name || "Object" === m.name)
        }
        function d(a) {
            return "number" === typeof a && !isNaN(a) && Infinity > a && -Infinity < a
        }
        function l(a) {
            return "undefined" !== typeof a && null !== a
        }
        function b(a, m, f) {
            var z;
            A(m) ? l(f) ? a.setAttribute(m, f) : a && a.getAttribute && ((z = a.getAttribute(m)) || "class" !== m || (z = a.getAttribute(m + "Name"))) : L(m, function(f, m) {
                a.setAttribute(m, f)
            });
            return z
        }
        function g(a, m) {
            var f;
            a || (a = {});
            for (f in m)
                a[f] = m[f];
            return a
        }
        function N() {
            for (var a = arguments, m = a.length, f = 0; f < m; f++) {
                var e = a[f];
                if ("undefined" !== typeof e && null !== e)
                    return e
            }
        }
        function D(a, m) {
            n.isMS && !n.svg && m && "undefined" !== typeof m.opacity && (m.filter = "alpha(opacity=" + 100 * m.opacity + ")");
            g(a.style, m)
        }
        function y(a, m, f, q, h) {
            a = e.createElement(a);
            m && g(a, m);
            h && D(a, {
                padding: "0",
                border: "none",
                margin: "0"
            });
            f && D(a, f);
            q && q.appendChild(a);
            return a
        }
        function v(a, m) {
            return parseFloat(a.toPrecision(m || 14))
        }
        function k(a, m, f) {
            var e = n.getStyle || k;
            if ("width" === m)
                return m = Math.min(a.offsetWidth, a.scrollWidth),
                f = a.getBoundingClientRect && a.getBoundingClientRect().width,
                f < m && f >= m - 1 && (m = Math.floor(f)),
                Math.max(0, m - (e(a, "padding-left", !0) || 0) - (e(a, "padding-right", !0) || 0));
            if ("height" === m)
                return Math.max(0, Math.min(a.offsetHeight, a.scrollHeight) - (e(a, "padding-top", !0) || 0) - (e(a, "padding-bottom", !0) || 0));
            r.getComputedStyle || c(27, !0);
            if (a = r.getComputedStyle(a, void 0)) {
                var h = a.getPropertyValue(m);
                N(f, "opacity" !== m) && (h = H(h))
            }
            return h
        }
        function L(a, m, f) {
            for (var e in a)
                Object.hasOwnProperty.call(a, e) && m.call(f || a[e], a[e], e, a)
        }
        function M(a, m, f) {
            function e(f, t) {
                var Q = a.removeEventListener || n.removeEventListenerPolyfill;
                Q && Q.call(a, f, t, !1)
            }
            function h(f) {
                var t;
                if (a.nodeName) {
                    if (m) {
                        var Q = {};
                        Q[m] = !0
                    } else
                        Q = f;
                    L(Q, function(a, Q) {
                        if (f[Q])
                            for (t = f[Q].length; t--; )
                                e(Q, f[Q][t].fn)
                    })
                }
            }
            var z = "function" === typeof a && a.prototype || a;
            if (Object.hasOwnProperty.call(z, "hcEvents")) {
                var O = z.hcEvents;
                m ? (z = O[m] || [],
                f ? (O[m] = z.filter(function(a) {
                    return f !== a.fn
                }),
                e(m, f)) : (h(O),
                O[m] = [])) : (h(O),
                delete z.hcEvents)
            }
        }
        function B(a, m, f, q) {
            f = f || {};
            if (e.createEvent && (a.dispatchEvent || a.fireEvent && a !== n)) {
                var h = e.createEvent("Events");
                h.initEvent(m, !0, !0);
                f = g(h, f);
                a.dispatchEvent ? a.dispatchEvent(f) : a.fireEvent(m, f)
            } else if (a.hcEvents) {
                f.target || g(f, {
                    preventDefault: function() {
                        f.defaultPrevented = !0
                    },
                    target: a,
                    type: m
                });
                h = [];
                for (var z = a, O = !1; z.hcEvents; )
                    Object.hasOwnProperty.call(z, "hcEvents") && z.hcEvents[m] && (h.length && (O = !0),
                    h.unshift.apply(h, z.hcEvents[m])),
                    z = Object.getPrototypeOf(z);
                O && h.sort(function(a, t) {
                    return a.order - t.order
                });
                h.forEach(function(h) {
                    !1 === h.fn.call(a, f) && f.preventDefault()
                })
            }
            q && !f.defaultPrevented && q.call(a, f)
        }
        var w = n.charts
          , e = n.doc
          , r = n.win;
        "";
        (c || (c = {})).messages = [];
        var a;
        Math.easeInOutSine = function(a) {
            return -.5 * (Math.cos(Math.PI * a) - 1)
        }
        ;
        var q = Array.prototype.find ? function(a, m) {
            return a.find(m)
        }
        : function(a, m) {
            var f, e = a.length;
            for (f = 0; f < e; f++)
                if (m(a[f], f))
                    return a[f]
        }
        ;
        L({
            map: "map",
            each: "forEach",
            grep: "filter",
            reduce: "reduce",
            some: "some"
        }, function(a, m) {
            n[m] = function(f) {
                var e;
                c(32, !1, void 0, (e = {},
                e["Highcharts." + m] = "use Array." + a,
                e));
                return Array.prototype[a].apply(f, [].slice.call(arguments, 1))
            }
        });
        var I, C = function() {
            var a = Math.random().toString(36).substring(2, 9) + "-"
              , m = 0;
            return function() {
                return "highcharts-" + (I ? "" : a) + m++
            }
        }();
        r.jQuery && (r.jQuery.fn.highcharts = function() {
            var a = [].slice.call(arguments);
            if (this[0])
                return a[0] ? (new (n[A(a[0]) ? a.shift() : "Chart"])(this[0],a[0],a[1]),
                this) : w[b(this[0], "data-highcharts-chart")]
        }
        );
        return {
            addEvent: function(a, m, f, e) {
                void 0 === e && (e = {});
                var h = "function" === typeof a && a.prototype || a;
                Object.hasOwnProperty.call(h, "hcEvents") || (h.hcEvents = {});
                h = h.hcEvents;
                n.Point && a instanceof n.Point && a.series && a.series.chart && (a.series.chart.runTrackerClick = !0);
                var q = a.addEventListener || n.addEventListenerPolyfill;
                q && q.call(a, m, f, n.supportsPassiveEvents ? {
                    passive: void 0 === e.passive ? -1 !== m.indexOf("touch") : e.passive,
                    capture: !1
                } : !1);
                h[m] || (h[m] = []);
                h[m].push({
                    fn: f,
                    order: "number" === typeof e.order ? e.order : Infinity
                });
                h[m].sort(function(a, f) {
                    return a.order - f.order
                });
                return function() {
                    M(a, m, f)
                }
            },
            arrayMax: function(a) {
                for (var m = a.length, f = a[0]; m--; )
                    a[m] > f && (f = a[m]);
                return f
            },
            arrayMin: function(a) {
                for (var m = a.length, f = a[0]; m--; )
                    a[m] < f && (f = a[m]);
                return f
            },
            attr: b,
            clamp: function(a, m, f) {
                return a > m ? a < f ? a : f : m
            },
            cleanRecursively: E,
            clearTimeout: function(a) {
                l(a) && clearTimeout(a)
            },
            correctFloat: v,
            createElement: y,
            css: D,
            defined: l,
            destroyObjectProperties: function(a, m) {
                L(a, function(f, e) {
                    f && f !== m && f.destroy && f.destroy();
                    delete a[e]
                })
            },
            discardElement: function(e) {
                a || (a = y("div"));
                e && a.appendChild(e);
                a.innerHTML = ""
            },
            erase: function(a, m) {
                for (var f = a.length; f--; )
                    if (a[f] === m) {
                        a.splice(f, 1);
                        break
                    }
            },
            error: c,
            extend: g,
            extendClass: function(a, m) {
                var f = function() {};
                f.prototype = new a;
                g(f.prototype, m);
                return f
            },
            find: q,
            fireEvent: B,
            getMagnitude: function(a) {
                return Math.pow(10, Math.floor(Math.log(a) / Math.LN10))
            },
            getNestedProperty: function(a, m) {
                for (a = a.split("."); a.length && l(m); ) {
                    var f = a.shift();
                    if ("undefined" === typeof f || "__proto__" === f)
                        return;
                    m = m[f];
                    if (!l(m) || "function" === typeof m || "number" === typeof m.nodeType || m === r)
                        return
                }
                return m
            },
            getStyle: k,
            inArray: function(a, m, f) {
                c(32, !1, void 0, {
                    "Highcharts.inArray": "use Array.indexOf"
                });
                return m.indexOf(a, f)
            },
            isArray: F,
            isClass: p,
            isDOMElement: J,
            isFunction: function(a) {
                return "function" === typeof a
            },
            isNumber: d,
            isObject: G,
            isString: A,
            keys: function(a) {
                c(32, !1, void 0, {
                    "Highcharts.keys": "use Object.keys"
                });
                return Object.keys(a)
            },
            merge: function() {
                var a, m = arguments, f = {}, e = function(a, f) {
                    "object" !== typeof a && (a = {});
                    L(f, function(h, t) {
                        "__proto__" !== t && "constructor" !== t && (!G(h, !0) || p(h) || J(h) ? a[t] = f[t] : a[t] = e(a[t] || {}, h))
                    });
                    return a
                };
                !0 === m[0] && (f = m[1],
                m = Array.prototype.slice.call(m, 2));
                var h = m.length;
                for (a = 0; a < h; a++)
                    f = e(f, m[a]);
                return f
            },
            normalizeTickInterval: function(a, m, f, e, h) {
                var q = a;
                f = N(f, 1);
                var O = a / f;
                m || (m = h ? [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10] : [1, 2, 2.5, 5, 10],
                !1 === e && (1 === f ? m = m.filter(function(a) {
                    return 0 === a % 1
                }) : .1 >= f && (m = [1 / f])));
                for (e = 0; e < m.length && !(q = m[e],
                h && q * f >= a || !h && O <= (m[e] + (m[e + 1] || m[e])) / 2); e++)
                    ;
                return q = v(q * f, -Math.round(Math.log(.001) / Math.LN10))
            },
            objectEach: L,
            offset: function(a) {
                var m = e.documentElement;
                a = a.parentElement || a.parentNode ? a.getBoundingClientRect() : {
                    top: 0,
                    left: 0,
                    width: 0,
                    height: 0
                };
                return {
                    top: a.top + (r.pageYOffset || m.scrollTop) - (m.clientTop || 0),
                    left: a.left + (r.pageXOffset || m.scrollLeft) - (m.clientLeft || 0),
                    width: a.width,
                    height: a.height
                }
            },
            pad: function(a, e, f) {
                return Array((e || 2) + 1 - String(a).replace("-", "").length).join(f || "0") + a
            },
            pick: N,
            pInt: H,
            relativeLength: function(a, e, f) {
                return /%$/.test(a) ? e * parseFloat(a) / 100 + (f || 0) : parseFloat(a)
            },
            removeEvent: M,
            splat: function(a) {
                return F(a) ? a : [a]
            },
            stableSort: function(a, e) {
                var f = a.length, m, h;
                for (h = 0; h < f; h++)
                    a[h].safeI = h;
                a.sort(function(a, f) {
                    m = e(a, f);
                    return 0 === m ? a.safeI - f.safeI : m
                });
                for (h = 0; h < f; h++)
                    delete a[h].safeI
            },
            syncTimeout: function(a, e, f) {
                if (0 < e)
                    return setTimeout(a, e, f);
                a.call(0, f);
                return -1
            },
            timeUnits: {
                millisecond: 1,
                second: 1E3,
                minute: 6E4,
                hour: 36E5,
                day: 864E5,
                week: 6048E5,
                month: 24192E5,
                year: 314496E5
            },
            uniqueKey: C,
            useSerialIds: function(a) {
                return I = N(a, I)
            },
            wrap: function(a, e, f) {
                var m = a[e];
                a[e] = function() {
                    var a = Array.prototype.slice.call(arguments)
                      , e = arguments
                      , O = this;
                    O.proceed = function() {
                        m.apply(O, arguments.length ? arguments : e)
                    }
                    ;
                    a.unshift(m);
                    a = f.apply(this, a);
                    O.proceed = null;
                    return a
                }
            }
        }
    });
    P(c, "Core/Color/Palette.js", [], function() {
        return {
            colors: "#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" "),
            backgroundColor: "#ffffff",
            neutralColor100: "#000000",
            neutralColor80: "#333333",
            neutralColor60: "#666666",
            neutralColor40: "#999999",
            neutralColor20: "#cccccc",
            neutralColor10: "#e6e6e6",
            neutralColor5: "#f2f2f2",
            neutralColor3: "#f7f7f7",
            highlightColor100: "#003399",
            highlightColor80: "#335cad",
            highlightColor60: "#6685c2",
            highlightColor20: "#ccd6eb",
            highlightColor10: "#e6ebf5",
            positiveColor: "#06b535",
            negativeColor: "#f21313"
        }
    });
    P(c, "Core/Chart/ChartDefaults.js", [c["Core/Color/Palette.js"]], function(n) {
        return {
            panning: {
                enabled: !1,
                type: "x"
            },
            styledMode: !1,
            borderRadius: 0,
            colorCount: 10,
            defaultSeriesType: "line",
            ignoreHiddenSeries: !0,
            spacing: [10, 10, 15, 10],
            resetZoomButton: {
                theme: {
                    zIndex: 6
                },
                position: {
                    align: "right",
                    x: -10,
                    y: 10
                }
            },
            zoomBySingleTouch: !1,
            width: null,
            height: null,
            borderColor: n.highlightColor80,
            backgroundColor: n.backgroundColor,
            plotBorderColor: n.neutralColor20
        }
    });
    P(c, "Core/Color/Color.js", [c["Core/Globals.js"], c["Core/Utilities.js"]], function(n, c) {
        var x = c.isNumber
          , H = c.merge
          , A = c.pInt;
        c = function() {
            function c(G) {
                this.parsers = [{
                    regex: /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
                    parse: function(p) {
                        return [A(p[1]), A(p[2]), A(p[3]), parseFloat(p[4], 10)]
                    }
                }, {
                    regex: /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
                    parse: function(p) {
                        return [A(p[1]), A(p[2]), A(p[3]), 1]
                    }
                }];
                this.rgba = [];
                var J = n.Color;
                if (J && J !== c)
                    return new J(G);
                if (!(this instanceof c))
                    return new c(G);
                this.init(G)
            }
            c.parse = function(n) {
                return new c(n)
            }
            ;
            c.prototype.init = function(n) {
                var J, p;
                if ((this.input = n = c.names[n && n.toLowerCase ? n.toLowerCase() : ""] || n) && n.stops)
                    this.stops = n.stops.map(function(b) {
                        return new c(b[1])
                    });
                else {
                    if (n && n.charAt && "#" === n.charAt()) {
                        var d = n.length;
                        n = parseInt(n.substr(1), 16);
                        7 === d ? J = [(n & 16711680) >> 16, (n & 65280) >> 8, n & 255, 1] : 4 === d && (J = [(n & 3840) >> 4 | (n & 3840) >> 8, (n & 240) >> 4 | n & 240, (n & 15) << 4 | n & 15, 1])
                    }
                    if (!J)
                        for (p = this.parsers.length; p-- && !J; ) {
                            var l = this.parsers[p];
                            (d = l.regex.exec(n)) && (J = l.parse(d))
                        }
                }
                this.rgba = J || []
            }
            ;
            c.prototype.get = function(n) {
                var c = this.input
                  , p = this.rgba;
                if ("undefined" !== typeof this.stops) {
                    var d = H(c);
                    d.stops = [].concat(d.stops);
                    this.stops.forEach(function(l, b) {
                        d.stops[b] = [d.stops[b][0], l.get(n)]
                    })
                } else
                    d = p && x(p[0]) ? "rgb" === n || !n && 1 === p[3] ? "rgb(" + p[0] + "," + p[1] + "," + p[2] + ")" : "a" === n ? p[3] : "rgba(" + p.join(",") + ")" : c;
                return d
            }
            ;
            c.prototype.brighten = function(n) {
                var c, p = this.rgba;
                if (this.stops)
                    this.stops.forEach(function(d) {
                        d.brighten(n)
                    });
                else if (x(n) && 0 !== n)
                    for (c = 0; 3 > c; c++)
                        p[c] += A(255 * n),
                        0 > p[c] && (p[c] = 0),
                        255 < p[c] && (p[c] = 255);
                return this
            }
            ;
            c.prototype.setOpacity = function(n) {
                this.rgba[3] = n;
                return this
            }
            ;
            c.prototype.tweenTo = function(n, c) {
                var p = this.rgba
                  , d = n.rgba;
                d.length && p && p.length ? (n = 1 !== d[3] || 1 !== p[3],
                c = (n ? "rgba(" : "rgb(") + Math.round(d[0] + (p[0] - d[0]) * (1 - c)) + "," + Math.round(d[1] + (p[1] - d[1]) * (1 - c)) + "," + Math.round(d[2] + (p[2] - d[2]) * (1 - c)) + (n ? "," + (d[3] + (p[3] - d[3]) * (1 - c)) : "") + ")") : c = n.input || "none";
                return c
            }
            ;
            c.names = {
                white: "#ffffff",
                black: "#000000"
            };
            return c
        }();
        "";
        return c
    });
    P(c, "Core/Time.js", [c["Core/Globals.js"], c["Core/Utilities.js"]], function(n, c) {
        var x = n.win
          , H = c.defined
          , A = c.error
          , F = c.extend
          , G = c.isObject
          , J = c.merge
          , p = c.objectEach
          , d = c.pad
          , l = c.pick
          , b = c.splat
          , g = c.timeUnits
          , N = n.isSafari && Intl && Intl.DateTimeFormat.prototype.formatRange
          , D = n.isSafari && Intl && !Intl.DateTimeFormat.prototype.formatRange;
        c = function() {
            function y(v) {
                this.options = {};
                this.variableTimezone = this.useUTC = !1;
                this.Date = x.Date;
                this.getTimezoneOffset = this.timezoneOffsetFunction();
                this.update(v)
            }
            y.prototype.get = function(v, k) {
                if (this.variableTimezone || this.timezoneOffset) {
                    var b = k.getTime()
                      , g = b - this.getTimezoneOffset(k);
                    k.setTime(g);
                    v = k["getUTC" + v]();
                    k.setTime(b);
                    return v
                }
                return this.useUTC ? k["getUTC" + v]() : k["get" + v]()
            }
            ;
            y.prototype.set = function(v, k, b) {
                if (this.variableTimezone || this.timezoneOffset) {
                    if ("Milliseconds" === v || "Seconds" === v || "Minutes" === v && 0 === this.getTimezoneOffset(k) % 36E5)
                        return k["setUTC" + v](b);
                    var g = this.getTimezoneOffset(k);
                    g = k.getTime() - g;
                    k.setTime(g);
                    k["setUTC" + v](b);
                    v = this.getTimezoneOffset(k);
                    g = k.getTime() + v;
                    return k.setTime(g)
                }
                return this.useUTC || N && "FullYear" === v ? k["setUTC" + v](b) : k["set" + v](b)
            }
            ;
            y.prototype.update = function(b) {
                var k = l(b && b.useUTC, !0);
                this.options = b = J(!0, this.options || {}, b);
                this.Date = b.Date || x.Date || Date;
                this.timezoneOffset = (this.useUTC = k) && b.timezoneOffset;
                this.getTimezoneOffset = this.timezoneOffsetFunction();
                this.variableTimezone = k && !(!b.getTimezoneOffset && !b.timezone)
            }
            ;
            y.prototype.makeTime = function(b, k, g, y, B, w) {
                if (this.useUTC) {
                    var e = this.Date.UTC.apply(0, arguments);
                    var r = this.getTimezoneOffset(e);
                    e += r;
                    var a = this.getTimezoneOffset(e);
                    r !== a ? e += a - r : r - 36E5 !== this.getTimezoneOffset(e - 36E5) || D || (e -= 36E5)
                } else
                    e = (new this.Date(b,k,l(g, 1),l(y, 0),l(B, 0),l(w, 0))).getTime();
                return e
            }
            ;
            y.prototype.timezoneOffsetFunction = function() {
                var b = this
                  , k = this.options
                  , g = k.moment || x.moment;
                if (!this.useUTC)
                    return function(k) {
                        return 6E4 * (new Date(k.toString())).getTimezoneOffset()
                    }
                    ;
                if (k.timezone) {
                    if (g)
                        return function(b) {
                            return 6E4 * -g.tz(b, k.timezone).utcOffset()
                        }
                        ;
                    A(25)
                }
                return this.useUTC && k.getTimezoneOffset ? function(b) {
                    return 6E4 * k.getTimezoneOffset(b.valueOf())
                }
                : function() {
                    return 6E4 * (b.timezoneOffset || 0)
                }
            }
            ;
            y.prototype.dateFormat = function(b, k, g) {
                if (!H(k) || isNaN(k))
                    return n.defaultOptions.lang && n.defaultOptions.lang.invalidDate || "";
                b = l(b, "%Y-%m-%d %H:%M:%S");
                var v = this
                  , B = new this.Date(k)
                  , w = this.get("Hours", B)
                  , e = this.get("Day", B)
                  , r = this.get("Date", B)
                  , a = this.get("Month", B)
                  , q = this.get("FullYear", B)
                  , I = n.defaultOptions.lang
                  , C = I && I.weekdays
                  , z = I && I.shortWeekdays;
                B = F({
                    a: z ? z[e] : C[e].substr(0, 3),
                    A: C[e],
                    d: d(r),
                    e: d(r, 2, " "),
                    w: e,
                    b: I.shortMonths[a],
                    B: I.months[a],
                    m: d(a + 1),
                    o: a + 1,
                    y: q.toString().substr(2, 2),
                    Y: q,
                    H: d(w),
                    k: w,
                    I: d(w % 12 || 12),
                    l: w % 12 || 12,
                    M: d(this.get("Minutes", B)),
                    p: 12 > w ? "AM" : "PM",
                    P: 12 > w ? "am" : "pm",
                    S: d(B.getSeconds()),
                    L: d(Math.floor(k % 1E3), 3)
                }, n.dateFormats);
                p(B, function(a, f) {
                    for (; -1 !== b.indexOf("%" + f); )
                        b = b.replace("%" + f, "function" === typeof a ? a.call(v, k) : a)
                });
                return g ? b.substr(0, 1).toUpperCase() + b.substr(1) : b
            }
            ;
            y.prototype.resolveDTLFormat = function(g) {
                return G(g, !0) ? g : (g = b(g),
                {
                    main: g[0],
                    from: g[1],
                    to: g[2]
                })
            }
            ;
            y.prototype.getTimeTicks = function(b, k, y, d) {
                var v = this, w = [], e = {}, r = new v.Date(k), a = b.unitRange, q = b.count || 1, I;
                d = l(d, 1);
                if (H(k)) {
                    v.set("Milliseconds", r, a >= g.second ? 0 : q * Math.floor(v.get("Milliseconds", r) / q));
                    a >= g.second && v.set("Seconds", r, a >= g.minute ? 0 : q * Math.floor(v.get("Seconds", r) / q));
                    a >= g.minute && v.set("Minutes", r, a >= g.hour ? 0 : q * Math.floor(v.get("Minutes", r) / q));
                    a >= g.hour && v.set("Hours", r, a >= g.day ? 0 : q * Math.floor(v.get("Hours", r) / q));
                    a >= g.day && v.set("Date", r, a >= g.month ? 1 : Math.max(1, q * Math.floor(v.get("Date", r) / q)));
                    if (a >= g.month) {
                        v.set("Month", r, a >= g.year ? 0 : q * Math.floor(v.get("Month", r) / q));
                        var C = v.get("FullYear", r)
                    }
                    a >= g.year && v.set("FullYear", r, C - C % q);
                    a === g.week && (C = v.get("Day", r),
                    v.set("Date", r, v.get("Date", r) - C + d + (C < d ? -7 : 0)));
                    C = v.get("FullYear", r);
                    d = v.get("Month", r);
                    var z = v.get("Date", r)
                      , m = v.get("Hours", r);
                    k = r.getTime();
                    !v.variableTimezone && v.useUTC || !H(y) || (I = y - k > 4 * g.month || v.getTimezoneOffset(k) !== v.getTimezoneOffset(y));
                    k = r.getTime();
                    for (r = 1; k < y; )
                        w.push(k),
                        k = a === g.year ? v.makeTime(C + r * q, 0) : a === g.month ? v.makeTime(C, d + r * q) : !I || a !== g.day && a !== g.week ? I && a === g.hour && 1 < q ? v.makeTime(C, d, z, m + r * q) : k + a * q : v.makeTime(C, d, z + r * q * (a === g.day ? 1 : 7)),
                        r++;
                    w.push(k);
                    a <= g.hour && 1E4 > w.length && w.forEach(function(a) {
                        0 === a % 18E5 && "000000000" === v.dateFormat("%H%M%S%L", a) && (e[a] = "day")
                    })
                }
                w.info = F(b, {
                    higherRanks: e,
                    totalRange: a * q
                });
                return w
            }
            ;
            return y
        }();
        "";
        return c
    });
    P(c, "Core/DefaultOptions.js", [c["Core/Globals.js"], c["Core/Chart/ChartDefaults.js"], c["Core/Color/Color.js"], c["Core/Color/Palette.js"], c["Core/Time.js"], c["Core/Utilities.js"]], function(n, c, E, H, A, F) {
        var x = n.isTouchDevice
          , J = n.svg;
        E = E.parse;
        var p = F.merge;
        "";
        var d = {
            colors: H.colors,
            symbols: ["circle", "diamond", "square", "triangle", "triangle-down"],
            lang: {
                loading: "Loading...",
                months: "January February March April May June July August September October November December".split(" "),
                shortMonths: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
                weekdays: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
                decimalPoint: ".",
                numericSymbols: "kMGTPE".split(""),
                resetZoom: "Reset zoom",
                resetZoomTitle: "Reset zoom level 1:1",
                thousandsSep: " "
            },
            global: {},
            time: {
                Date: void 0,
                getTimezoneOffset: void 0,
                timezone: void 0,
                timezoneOffset: 0,
                useUTC: !0
            },
            chart: c,
            title: {
                text: "Chart title",
                align: "center",
                margin: 15,
                widthAdjust: -44
            },
            subtitle: {
                text: "",
                align: "center",
                widthAdjust: -44
            },
            caption: {
                margin: 15,
                text: "",
                align: "left",
                verticalAlign: "bottom"
            },
            plotOptions: {},
            labels: {
                style: {
                    position: "absolute",
                    color: H.neutralColor80
                }
            },
            legend: {
                enabled: !0,
                align: "center",
                alignColumns: !0,
                className: "highcharts-no-tooltip",
                layout: "horizontal",
                labelFormatter: function() {
                    return this.name
                },
                borderColor: H.neutralColor40,
                borderRadius: 0,
                navigation: {
                    activeColor: H.highlightColor100,
                    inactiveColor: H.neutralColor20
                },
                itemStyle: {
                    color: H.neutralColor80,
                    cursor: "pointer",
                    fontSize: "12px",
                    fontWeight: "bold",
                    textOverflow: "ellipsis"
                },
                itemHoverStyle: {
                    color: H.neutralColor100
                },
                itemHiddenStyle: {
                    color: H.neutralColor20
                },
                shadow: !1,
                itemCheckboxStyle: {
                    position: "absolute",
                    width: "13px",
                    height: "13px"
                },
                squareSymbol: !0,
                symbolPadding: 5,
                verticalAlign: "bottom",
                x: 0,
                y: 0,
                title: {
                    style: {
                        fontWeight: "bold"
                    }
                }
            },
            loading: {
                labelStyle: {
                    fontWeight: "bold",
                    position: "relative",
                    top: "45%"
                },
                style: {
                    position: "absolute",
                    backgroundColor: H.backgroundColor,
                    opacity: .5,
                    textAlign: "center"
                }
            },
            tooltip: {
                enabled: !0,
                animation: J,
                borderRadius: 3,
                dateTimeLabelFormats: {
                    millisecond: "%A, %b %e, %H:%M:%S.%L",
                    second: "%A, %b %e, %H:%M:%S",
                    minute: "%A, %b %e, %H:%M",
                    hour: "%A, %b %e, %H:%M",
                    day: "%A, %b %e, %Y",
                    week: "Week from %A, %b %e, %Y",
                    month: "%B %Y",
                    year: "%Y"
                },
                footerFormat: "",
                padding: 8,
                snap: x ? 25 : 10,
                headerFormat: '<span style="font-size: 10px">{point.key}</span><br/>',
                pointFormat: '<span style="color:{point.color}">\u25cf</span> {series.name}: <b>{point.y}</b><br/>',
                backgroundColor: E(H.neutralColor3).setOpacity(.85).get(),
                borderWidth: 1,
                shadow: !0,
                style: {
                    color: H.neutralColor80,
                    cursor: "default",
                    fontSize: "12px",
                    whiteSpace: "nowrap"
                }
            },
            credits: {
                enabled: !0,
                href: "https://www.highcharts.com?credits",
                position: {
                    align: "right",
                    x: -10,
                    verticalAlign: "bottom",
                    y: -5
                },
                style: {
                    cursor: "pointer",
                    color: H.neutralColor40,
                    fontSize: "9px"
                },
                text: "Highcharts.com"
            }
        };
        d.chart.styledMode = !1;
        "";
        var l = new A(p(d.global, d.time));
        return {
            defaultOptions: d,
            defaultTime: l,
            getOptions: function() {
                return d
            },
            setOptions: function(b) {
                p(!0, d, b);
                if (b.time || b.global)
                    n.time ? n.time.update(p(d.global, d.time, b.global, b.time)) : n.time = l;
                return d
            }
        }
    });
    P(c, "Core/Animation/Fx.js", [c["Core/Color/Color.js"], c["Core/Globals.js"], c["Core/Utilities.js"]], function(n, c, E) {
        var x = n.parse
          , A = c.win
          , F = E.isNumber
          , G = E.objectEach;
        return function() {
            function n(p, d, l) {
                this.pos = NaN;
                this.options = d;
                this.elem = p;
                this.prop = l
            }
            n.prototype.dSetter = function() {
                var p = this.paths
                  , d = p && p[0];
                p = p && p[1];
                var l = this.now || 0
                  , b = [];
                if (1 !== l && d && p)
                    if (d.length === p.length && 1 > l)
                        for (var g = 0; g < p.length; g++) {
                            for (var N = d[g], D = p[g], y = [], v = 0; v < D.length; v++) {
                                var k = N[v]
                                  , L = D[v];
                                F(k) && F(L) && ("A" !== D[0] || 4 !== v && 5 !== v) ? y[v] = k + l * (L - k) : y[v] = L
                            }
                            b.push(y)
                        }
                    else
                        b = p;
                else
                    b = this.toD || [];
                this.elem.attr("d", b, void 0, !0)
            }
            ;
            n.prototype.update = function() {
                var p = this.elem
                  , d = this.prop
                  , l = this.now
                  , b = this.options.step;
                if (this[d + "Setter"])
                    this[d + "Setter"]();
                else
                    p.attr ? p.element && p.attr(d, l, null, !0) : p.style[d] = l + this.unit;
                b && b.call(p, l, this)
            }
            ;
            n.prototype.run = function(p, d, l) {
                var b = this
                  , g = b.options
                  , N = function(g) {
                    return N.stopped ? !1 : b.step(g)
                }
                  , D = A.requestAnimationFrame || function(b) {
                    setTimeout(b, 13)
                }
                  , y = function() {
                    for (var b = 0; b < n.timers.length; b++)
                        n.timers[b]() || n.timers.splice(b--, 1);
                    n.timers.length && D(y)
                };
                p !== d || this.elem["forceAnimate:" + this.prop] ? (this.startTime = +new Date,
                this.start = p,
                this.end = d,
                this.unit = l,
                this.now = this.start,
                this.pos = 0,
                N.elem = this.elem,
                N.prop = this.prop,
                N() && 1 === n.timers.push(N) && D(y)) : (delete g.curAnim[this.prop],
                g.complete && 0 === Object.keys(g.curAnim).length && g.complete.call(this.elem))
            }
            ;
            n.prototype.step = function(p) {
                var d = +new Date
                  , l = this.options
                  , b = this.elem
                  , g = l.complete
                  , N = l.duration
                  , D = l.curAnim;
                if (b.attr && !b.element)
                    p = !1;
                else if (p || d >= N + this.startTime) {
                    this.now = this.end;
                    this.pos = 1;
                    this.update();
                    var y = D[this.prop] = !0;
                    G(D, function(b) {
                        !0 !== b && (y = !1)
                    });
                    y && g && g.call(b);
                    p = !1
                } else
                    this.pos = l.easing((d - this.startTime) / N),
                    this.now = this.start + (this.end - this.start) * this.pos,
                    this.update(),
                    p = !0;
                return p
            }
            ;
            n.prototype.initPath = function(p, d, l) {
                function b(k, b) {
                    for (; k.length < M; ) {
                        var e = k[0]
                          , r = b[M - k.length];
                        r && "M" === e[0] && (k[0] = "C" === r[0] ? ["C", e[1], e[2], e[1], e[2], e[1], e[2]] : ["L", e[1], e[2]]);
                        k.unshift(e);
                        y && (e = k.pop(),
                        k.push(k[k.length - 1], e))
                    }
                }
                function g(k, b) {
                    for (; k.length < M; )
                        if (b = k[Math.floor(k.length / v) - 1].slice(),
                        "C" === b[0] && (b[1] = b[5],
                        b[2] = b[6]),
                        y) {
                            var e = k[Math.floor(k.length / v)].slice();
                            k.splice(k.length / 2, 0, b, e)
                        } else
                            k.push(b)
                }
                var N = p.startX
                  , D = p.endX;
                l = l.slice();
                var y = p.isArea
                  , v = y ? 2 : 1;
                d = d && d.slice();
                if (!d)
                    return [l, l];
                if (N && D && D.length) {
                    for (p = 0; p < N.length; p++)
                        if (N[p] === D[0]) {
                            var k = p;
                            break
                        } else if (N[0] === D[D.length - N.length + p]) {
                            k = p;
                            var L = !0;
                            break
                        } else if (N[N.length - 1] === D[D.length - N.length + p]) {
                            k = N.length - p;
                            break
                        }
                    "undefined" === typeof k && (d = [])
                }
                if (d.length && F(k)) {
                    var M = l.length + k * v;
                    L ? (b(d, l),
                    g(l, d)) : (b(l, d),
                    g(d, l))
                }
                return [d, l]
            }
            ;
            n.prototype.fillSetter = function() {
                n.prototype.strokeSetter.apply(this, arguments)
            }
            ;
            n.prototype.strokeSetter = function() {
                this.elem.attr(this.prop, x(this.start).tweenTo(x(this.end), this.pos), null, !0)
            }
            ;
            n.timers = [];
            return n
        }()
    });
    P(c, "Core/Animation/AnimationUtilities.js", [c["Core/Animation/Fx.js"], c["Core/Utilities.js"]], function(n, c) {
        function x(b) {
            return p(b) ? d({
                duration: 500,
                defer: 0
            }, b) : {
                duration: b ? 500 : 0,
                defer: 0
            }
        }
        function H(b, d) {
            for (var g = n.timers.length; g--; )
                n.timers[g].elem !== b || d && d !== n.timers[g].prop || (n.timers[g].stopped = !0)
        }
        var A = c.defined
          , F = c.getStyle
          , G = c.isArray
          , J = c.isNumber
          , p = c.isObject
          , d = c.merge
          , l = c.objectEach
          , b = c.pick;
        return {
            animate: function(b, N, D) {
                var g, v = "", k, L;
                if (!p(D)) {
                    var M = arguments;
                    D = {
                        duration: M[2],
                        easing: M[3],
                        complete: M[4]
                    }
                }
                J(D.duration) || (D.duration = 400);
                D.easing = "function" === typeof D.easing ? D.easing : Math[D.easing] || Math.easeInOutSine;
                D.curAnim = d(N);
                l(N, function(d, w) {
                    H(b, w);
                    L = new n(b,D,w);
                    k = void 0;
                    "d" === w && G(N.d) ? (L.paths = L.initPath(b, b.pathArray, N.d),
                    L.toD = N.d,
                    g = 0,
                    k = 1) : b.attr ? g = b.attr(w) : (g = parseFloat(F(b, w)) || 0,
                    "opacity" !== w && (v = "px"));
                    k || (k = d);
                    "string" === typeof k && k.match("px") && (k = k.replace(/px/g, ""));
                    L.run(g, k, v)
                })
            },
            animObject: x,
            getDeferredAnimation: function(b, d, l) {
                var g = x(d)
                  , v = 0
                  , k = 0;
                (l ? [l] : b.series).forEach(function(b) {
                    b = x(b.options.animation);
                    v = d && A(d.defer) ? g.defer : Math.max(v, b.duration + b.defer);
                    k = Math.min(g.duration, b.duration)
                });
                b.renderer.forExport && (v = 0);
                return {
                    defer: Math.max(0, v - k),
                    duration: Math.min(v, k)
                }
            },
            setAnimation: function(g, d) {
                d.renderer.globalAnimation = b(g, d.options.chart.animation, !0)
            },
            stop: H
        }
    });
    P(c, "Core/Renderer/HTML/AST.js", [c["Core/Globals.js"], c["Core/Utilities.js"]], function(n, c) {
        var x = n.SVG_NS
          , H = c.attr
          , A = c.createElement
          , F = c.discardElement
          , G = c.error
          , J = c.isString
          , p = c.objectEach
          , d = c.splat;
        try {
            var l = !!(new DOMParser).parseFromString("", "text/html")
        } catch (b) {
            l = !1
        }
        c = function() {
            function b(b) {
                this.nodes = "string" === typeof b ? this.parseMarkup(b) : b
            }
            b.filterUserAttributes = function(g) {
                p(g, function(d, l) {
                    var y = !0;
                    -1 === b.allowedAttributes.indexOf(l) && (y = !1);
                    -1 !== ["background", "dynsrc", "href", "lowsrc", "src"].indexOf(l) && (y = J(d) && b.allowedReferences.some(function(b) {
                        return 0 === d.indexOf(b)
                    }));
                    y || (G("Highcharts warning: Invalid attribute '" + l + "' in config"),
                    delete g[l])
                });
                return g
            }
            ;
            b.setElementHTML = function(g, d) {
                g.innerHTML = "";
                d && (new b(d)).addToDOM(g)
            }
            ;
            b.prototype.addToDOM = function(g) {
                function l(g, y) {
                    var v;
                    d(g).forEach(function(k) {
                        var g = k.tagName
                          , d = k.textContent ? n.doc.createTextNode(k.textContent) : void 0;
                        if (g)
                            if ("#text" === g)
                                var B = d;
                            else if (-1 !== b.allowedTags.indexOf(g)) {
                                g = n.doc.createElementNS("svg" === g ? x : y.namespaceURI || x, g);
                                var w = k.attributes || {};
                                p(k, function(e, r) {
                                    "tagName" !== r && "attributes" !== r && "children" !== r && "textContent" !== r && (w[r] = e)
                                });
                                H(g, b.filterUserAttributes(w));
                                d && g.appendChild(d);
                                l(k.children || [], g);
                                B = g
                            } else
                                G("Highcharts warning: Invalid tagName '" + g + "' in config");
                        B && y.appendChild(B);
                        v = B
                    });
                    return v
                }
                return l(this.nodes, g)
            }
            ;
            b.prototype.parseMarkup = function(b) {
                var g = [];
                if (l)
                    b = (new DOMParser).parseFromString(b, "text/html");
                else {
                    var d = A("div");
                    d.innerHTML = b;
                    b = {
                        body: d
                    }
                }
                var y = function(b, k) {
                    var g = b.nodeName.toLowerCase()
                      , d = {
                        tagName: g
                    };
                    if ("#text" === g) {
                        g = b.textContent || "";
                        if (/^[\s]*$/.test(g))
                            return;
                        d.textContent = g
                    }
                    if (g = b.attributes) {
                        var v = {};
                        [].forEach.call(g, function(e) {
                            v[e.name] = e.value
                        });
                        d.attributes = v
                    }
                    if (b.childNodes.length) {
                        var w = [];
                        [].forEach.call(b.childNodes, function(e) {
                            y(e, w)
                        });
                        w.length && (d.children = w)
                    }
                    k.push(d)
                };
                [].forEach.call(b.body.childNodes, function(b) {
                    return y(b, g)
                });
                d && F(d);
                return g
            }
            ;
            b.allowedTags = "a b br button caption circle clipPath code dd defs div dl dt em feComponentTransfer feFuncA feFuncB feFuncG feFuncR feGaussianBlur feOffset feMerge feMergeNode filter h1 h2 h3 h4 h5 h6 hr i img li linearGradient marker ol p path pattern pre rect small span stop strong style sub sup svg table text thead tbody tspan td th tr u ul #text".split(" ");
            b.allowedAttributes = "aria-controls aria-describedby aria-expanded aria-haspopup aria-hidden aria-label aria-labelledby aria-live aria-pressed aria-readonly aria-roledescription aria-selected class clip-path color colspan cx cy d dx dy disabled fill height href id in markerHeight markerWidth offset opacity orient padding paddingLeft paddingRight patternUnits r refX refY role scope slope src startOffset stdDeviation stroke stroke-linecap stroke-width style tableValues result rowspan summary target tabindex text-align textAnchor textLength type valign width x x1 x2 y y1 y2 zIndex".split(" ");
            b.allowedReferences = "https:// http:// mailto: / ../ ./ #".split(" ");
            return b
        }();
        "";
        return c
    });
    P(c, "Core/FormatUtilities.js", [c["Core/DefaultOptions.js"], c["Core/Utilities.js"]], function(n, c) {
        function x(d, l, b, g) {
            d = +d || 0;
            l = +l;
            var N = H.lang
              , D = (d.toString().split(".")[1] || "").split("e")[0].length
              , y = d.toString().split("e")
              , v = l;
            if (-1 === l)
                l = Math.min(D, 20);
            else if (!G(l))
                l = 2;
            else if (l && y[1] && 0 > y[1]) {
                var k = l + +y[1];
                0 <= k ? (y[0] = (+y[0]).toExponential(k).split("e")[0],
                l = k) : (y[0] = y[0].split(".")[0] || 0,
                d = 20 > l ? (y[0] * Math.pow(10, y[1])).toFixed(l) : 0,
                y[1] = 0)
            }
            k = (Math.abs(y[1] ? y[0] : d) + Math.pow(10, -Math.max(l, D) - 1)).toFixed(l);
            D = String(p(k));
            var L = 3 < D.length ? D.length % 3 : 0;
            b = J(b, N.decimalPoint);
            g = J(g, N.thousandsSep);
            d = (0 > d ? "-" : "") + (L ? D.substr(0, L) + g : "");
            d = 0 > +y[1] && !v ? "0" : d + D.substr(L).replace(/(\d{3})(?=\d)/g, "$1" + g);
            l && (d += b + k.slice(-l));
            y[1] && 0 !== +d && (d += "e" + y[1]);
            return d
        }
        var H = n.defaultOptions
          , A = n.defaultTime
          , F = c.getNestedProperty
          , G = c.isNumber
          , J = c.pick
          , p = c.pInt;
        return {
            dateFormat: function(d, l, b) {
                return A.dateFormat(d, l, b)
            },
            format: function(d, l, b) {
                var g = "{"
                  , p = !1
                  , D = /f$/
                  , y = /\.([0-9])/
                  , v = H.lang
                  , k = b && b.time || A;
                b = b && b.numberFormatter || x;
                for (var L = []; d; ) {
                    var M = d.indexOf(g);
                    if (-1 === M)
                        break;
                    var B = d.slice(0, M);
                    if (p) {
                        B = B.split(":");
                        g = F(B.shift() || "", l);
                        if (B.length && "number" === typeof g)
                            if (B = B.join(":"),
                            D.test(B)) {
                                var w = parseInt((B.match(y) || ["", "-1"])[1], 10);
                                null !== g && (g = b(g, w, v.decimalPoint, -1 < B.indexOf(",") ? v.thousandsSep : ""))
                            } else
                                g = k.dateFormat(B, g);
                        L.push(g)
                    } else
                        L.push(B);
                    d = d.slice(M + 1);
                    g = (p = !p) ? "}" : "{"
                }
                L.push(d);
                return L.join("")
            },
            numberFormat: x
        }
    });
    P(c, "Core/Renderer/SVG/SVGElement.js", [c["Core/Animation/AnimationUtilities.js"], c["Core/Renderer/HTML/AST.js"], c["Core/Color/Color.js"], c["Core/Globals.js"], c["Core/Color/Palette.js"], c["Core/Utilities.js"]], function(n, c, E, H, A, F) {
        var x = n.animate
          , J = n.animObject
          , p = n.stop
          , d = H.deg2rad
          , l = H.doc
          , b = H.noop
          , g = H.svg
          , N = H.SVG_NS
          , D = H.win
          , y = F.addEvent
          , v = F.attr
          , k = F.createElement
          , L = F.css
          , M = F.defined
          , B = F.erase
          , w = F.extend
          , e = F.fireEvent
          , r = F.isArray
          , a = F.isFunction
          , q = F.isNumber
          , I = F.isString
          , C = F.merge
          , z = F.objectEach
          , m = F.pick
          , f = F.pInt
          , K = F.syncTimeout
          , h = F.uniqueKey;
        n = function() {
            function u() {
                this.element = void 0;
                this.onEvents = {};
                this.opacity = 1;
                this.renderer = void 0;
                this.SVG_NS = N;
                this.symbolCustomAttribs = "x y width height r start end innerR anchorX anchorY rounded".split(" ")
            }
            u.prototype._defaultGetter = function(a) {
                a = m(this[a + "Value"], this[a], this.element ? this.element.getAttribute(a) : null, 0);
                /^[\-0-9\.]+$/.test(a) && (a = parseFloat(a));
                return a
            }
            ;
            u.prototype._defaultSetter = function(a, f, t) {
                t.setAttribute(f, a)
            }
            ;
            u.prototype.add = function(a) {
                var f = this.renderer
                  , t = this.element;
                a && (this.parentGroup = a);
                this.parentInverted = a && a.inverted;
                "undefined" !== typeof this.textStr && "text" === this.element.nodeName && f.buildText(this);
                this.added = !0;
                if (!a || a.handleZ || this.zIndex)
                    var Q = this.zIndexSetter();
                Q || (a ? a.element : f.box).appendChild(t);
                if (this.onAdd)
                    this.onAdd();
                return this
            }
            ;
            u.prototype.addClass = function(a, f) {
                var t = f ? "" : this.attr("class") || "";
                a = (a || "").split(/ /g).reduce(function(a, f) {
                    -1 === t.indexOf(f) && a.push(f);
                    return a
                }, t ? [t] : []).join(" ");
                a !== t && this.attr("class", a);
                return this
            }
            ;
            u.prototype.afterSetters = function() {
                this.doTransform && (this.updateTransform(),
                this.doTransform = !1)
            }
            ;
            u.prototype.align = function(a, f, t) {
                var Q = {}, e = this.renderer, h = e.alignedObjects, q, O, u;
                if (a) {
                    if (this.alignOptions = a,
                    this.alignByTranslate = f,
                    !t || I(t))
                        this.alignTo = q = t || "renderer",
                        B(h, this),
                        h.push(this),
                        t = void 0
                } else
                    a = this.alignOptions,
                    f = this.alignByTranslate,
                    q = this.alignTo;
                t = m(t, e[q], "scrollablePlotBox" === q ? e.plotBox : void 0, e);
                q = a.align;
                var r = a.verticalAlign;
                e = (t.x || 0) + (a.x || 0);
                h = (t.y || 0) + (a.y || 0);
                "right" === q ? O = 1 : "center" === q && (O = 2);
                O && (e += (t.width - (a.width || 0)) / O);
                Q[f ? "translateX" : "x"] = Math.round(e);
                "bottom" === r ? u = 1 : "middle" === r && (u = 2);
                u && (h += (t.height - (a.height || 0)) / u);
                Q[f ? "translateY" : "y"] = Math.round(h);
                this[this.placed ? "animate" : "attr"](Q);
                this.placed = !0;
                this.alignAttr = Q;
                return this
            }
            ;
            u.prototype.alignSetter = function(a) {
                var f = {
                    left: "start",
                    center: "middle",
                    right: "end"
                };
                f[a] && (this.alignValue = a,
                this.element.setAttribute("text-anchor", f[a]))
            }
            ;
            u.prototype.animate = function(a, f, t) {
                var Q = this
                  , e = J(m(f, this.renderer.globalAnimation, !0));
                f = e.defer;
                m(l.hidden, l.msHidden, l.webkitHidden, !1) && (e.duration = 0);
                0 !== e.duration ? (t && (e.complete = t),
                K(function() {
                    Q.element && x(Q, a, e)
                }, f)) : (this.attr(a, void 0, t),
                z(a, function(a, f) {
                    e.step && e.step.call(this, a, {
                        prop: f,
                        pos: 1,
                        elem: this
                    })
                }, this));
                return this
            }
            ;
            u.prototype.applyTextOutline = function(a) {
                var f = this.element;
                -1 !== a.indexOf("contrast") && (a = a.replace(/contrast/g, this.renderer.getContrast(f.style.fill)));
                var t = a.split(" ");
                a = t[t.length - 1];
                if ((t = t[0]) && "none" !== t && H.svg) {
                    this.fakeTS = !0;
                    this.ySetter = this.xSetter;
                    t = t.replace(/(^[\d\.]+)(.*?)$/g, function(a, f, t) {
                        return 2 * Number(f) + t
                    });
                    this.removeTextOutline();
                    var Q = l.createElementNS(N, "tspan");
                    v(Q, {
                        "class": "highcharts-text-outline",
                        fill: a,
                        stroke: a,
                        "stroke-width": t,
                        "stroke-linejoin": "round"
                    });
                    [].forEach.call(f.childNodes, function(a) {
                        var f = a.cloneNode(!0);
                        f.removeAttribute && ["fill", "stroke", "stroke-width", "stroke"].forEach(function(a) {
                            return f.removeAttribute(a)
                        });
                        Q.appendChild(f)
                    });
                    var e = l.createElementNS(N, "tspan");
                    e.textContent = "\u200b";
                    ["x", "y"].forEach(function(a) {
                        var t = f.getAttribute(a);
                        t && e.setAttribute(a, t)
                    });
                    Q.appendChild(e);
                    f.insertBefore(Q, f.firstChild)
                }
            }
            ;
            u.prototype.attr = function(a, f, t, Q) {
                var e = this.element, h = this.symbolCustomAttribs, m, q = this, O, u;
                if ("string" === typeof a && "undefined" !== typeof f) {
                    var r = a;
                    a = {};
                    a[r] = f
                }
                "string" === typeof a ? q = (this[a + "Getter"] || this._defaultGetter).call(this, a, e) : (z(a, function(f, t) {
                    O = !1;
                    Q || p(this, t);
                    this.symbolName && -1 !== h.indexOf(t) && (m || (this.symbolAttr(a),
                    m = !0),
                    O = !0);
                    !this.rotation || "x" !== t && "y" !== t || (this.doTransform = !0);
                    O || (u = this[t + "Setter"] || this._defaultSetter,
                    u.call(this, f, t, e),
                    !this.styledMode && this.shadows && /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(t) && this.updateShadows(t, f, u))
                }, this),
                this.afterSetters());
                t && t.call(this);
                return q
            }
            ;
            u.prototype.clip = function(a) {
                return this.attr("clip-path", a ? "url(" + this.renderer.url + "#" + a.id + ")" : "none")
            }
            ;
            u.prototype.crisp = function(a, f) {
                f = f || a.strokeWidth || 0;
                var t = Math.round(f) % 2 / 2;
                a.x = Math.floor(a.x || this.x || 0) + t;
                a.y = Math.floor(a.y || this.y || 0) + t;
                a.width = Math.floor((a.width || this.width || 0) - 2 * t);
                a.height = Math.floor((a.height || this.height || 0) - 2 * t);
                M(a.strokeWidth) && (a.strokeWidth = f);
                return a
            }
            ;
            u.prototype.complexColor = function(a, f, t) {
                var Q = this.renderer, m, q, u, O, b, k, I, g, w, d, K = [], v;
                e(this.renderer, "complexColor", {
                    args: arguments
                }, function() {
                    a.radialGradient ? q = "radialGradient" : a.linearGradient && (q = "linearGradient");
                    if (q) {
                        u = a[q];
                        b = Q.gradients;
                        k = a.stops;
                        w = t.radialReference;
                        r(u) && (a[q] = u = {
                            x1: u[0],
                            y1: u[1],
                            x2: u[2],
                            y2: u[3],
                            gradientUnits: "userSpaceOnUse"
                        });
                        "radialGradient" === q && w && !M(u.gradientUnits) && (O = u,
                        u = C(u, Q.getRadialAttr(w, O), {
                            gradientUnits: "userSpaceOnUse"
                        }));
                        z(u, function(a, f) {
                            "id" !== f && K.push(f, a)
                        });
                        z(k, function(a) {
                            K.push(a)
                        });
                        K = K.join(",");
                        if (b[K])
                            d = b[K].attr("id");
                        else {
                            u.id = d = h();
                            var e = b[K] = Q.createElement(q).attr(u).add(Q.defs);
                            e.radAttr = O;
                            e.stops = [];
                            k.forEach(function(a) {
                                0 === a[1].indexOf("rgba") ? (m = E.parse(a[1]),
                                I = m.get("rgb"),
                                g = m.get("a")) : (I = a[1],
                                g = 1);
                                a = Q.createElement("stop").attr({
                                    offset: a[0],
                                    "stop-color": I,
                                    "stop-opacity": g
                                }).add(e);
                                e.stops.push(a)
                            })
                        }
                        v = "url(" + Q.url + "#" + d + ")";
                        t.setAttribute(f, v);
                        t.gradient = K;
                        a.toString = function() {
                            return v
                        }
                    }
                })
            }
            ;
            u.prototype.css = function(a) {
                var e = this.styles
                  , t = {}
                  , Q = this.element
                  , h = ["textOutline", "textOverflow", "width"]
                  , m = ""
                  , q = !e;
                a && a.color && (a.fill = a.color);
                e && z(a, function(a, f) {
                    e && e[f] !== a && (t[f] = a,
                    q = !0)
                });
                if (q) {
                    e && (a = w(e, t));
                    if (a)
                        if (null === a.width || "auto" === a.width)
                            delete this.textWidth;
                        else if ("text" === Q.nodeName.toLowerCase() && a.width)
                            var u = this.textWidth = f(a.width);
                    this.styles = a;
                    u && !g && this.renderer.forExport && delete a.width;
                    if (Q.namespaceURI === this.SVG_NS) {
                        var r = function(a, f) {
                            return "-" + f.toLowerCase()
                        };
                        z(a, function(a, f) {
                            -1 === h.indexOf(f) && (m += f.replace(/([A-Z])/g, r) + ":" + a + ";")
                        });
                        m && v(Q, "style", m)
                    } else
                        L(Q, a);
                    this.added && ("text" === this.element.nodeName && this.renderer.buildText(this),
                    a && a.textOutline && this.applyTextOutline(a.textOutline))
                }
                return this
            }
            ;
            u.prototype.dashstyleSetter = function(a) {
                var e = this["stroke-width"];
                "inherit" === e && (e = 1);
                if (a = a && a.toLowerCase()) {
                    var t = a.replace("shortdashdotdot", "3,1,1,1,1,1,").replace("shortdashdot", "3,1,1,1").replace("shortdot", "1,1,").replace("shortdash", "3,1,").replace("longdash", "8,3,").replace(/dot/g, "1,3,").replace("dash", "4,3,").replace(/,$/, "").split(",");
                    for (a = t.length; a--; )
                        t[a] = "" + f(t[a]) * m(e, NaN);
                    a = t.join(",").replace(/NaN/g, "none");
                    this.element.setAttribute("stroke-dasharray", a)
                }
            }
            ;
            u.prototype.destroy = function() {
                var a = this
                  , f = a.element || {}
                  , t = a.renderer
                  , e = f.ownerSVGElement
                  , h = t.isSVG && "SPAN" === f.nodeName && a.parentGroup || void 0;
                f.onclick = f.onmouseout = f.onmouseover = f.onmousemove = f.point = null;
                p(a);
                if (a.clipPath && e) {
                    var m = a.clipPath;
                    [].forEach.call(e.querySelectorAll("[clip-path],[CLIP-PATH]"), function(a) {
                        -1 < a.getAttribute("clip-path").indexOf(m.element.id) && a.removeAttribute("clip-path")
                    });
                    a.clipPath = m.destroy()
                }
                if (a.stops) {
                    for (e = 0; e < a.stops.length; e++)
                        a.stops[e].destroy();
                    a.stops.length = 0;
                    a.stops = void 0
                }
                a.safeRemoveChild(f);
                for (t.styledMode || a.destroyShadows(); h && h.div && 0 === h.div.childNodes.length; )
                    f = h.parentGroup,
                    a.safeRemoveChild(h.div),
                    delete h.div,
                    h = f;
                a.alignTo && B(t.alignedObjects, a);
                z(a, function(f, t) {
                    a[t] && a[t].parentGroup === a && a[t].destroy && a[t].destroy();
                    delete a[t]
                })
            }
            ;
            u.prototype.destroyShadows = function() {
                (this.shadows || []).forEach(function(a) {
                    this.safeRemoveChild(a)
                }, this);
                this.shadows = void 0
            }
            ;
            u.prototype.destroyTextPath = function(a, f) {
                var t = a.getElementsByTagName("text")[0];
                if (t) {
                    if (t.removeAttribute("dx"),
                    t.removeAttribute("dy"),
                    f.element.setAttribute("id", ""),
                    this.textPathWrapper && t.getElementsByTagName("textPath").length) {
                        for (a = this.textPathWrapper.element.childNodes; a.length; )
                            t.appendChild(a[0]);
                        t.removeChild(this.textPathWrapper.element)
                    }
                } else if (a.getAttribute("dx") || a.getAttribute("dy"))
                    a.removeAttribute("dx"),
                    a.removeAttribute("dy");
                this.textPathWrapper && (this.textPathWrapper = this.textPathWrapper.destroy())
            }
            ;
            u.prototype.dSetter = function(a, f, t) {
                r(a) && ("string" === typeof a[0] && (a = this.renderer.pathToSegments(a)),
                this.pathArray = a,
                a = a.reduce(function(a, f, t) {
                    return f && f.join ? (t ? a + " " : "") + f.join(" ") : (f || "").toString()
                }, ""));
                /(NaN| {2}|^$)/.test(a) && (a = "M 0 0");
                this[f] !== a && (t.setAttribute(f, a),
                this[f] = a)
            }
            ;
            u.prototype.fadeOut = function(a) {
                var f = this;
                f.animate({
                    opacity: 0
                }, {
                    duration: m(a, 150),
                    complete: function() {
                        f.attr({
                            y: -9999
                        }).hide()
                    }
                })
            }
            ;
            u.prototype.fillSetter = function(a, f, t) {
                "string" === typeof a ? t.setAttribute(f, a) : a && this.complexColor(a, f, t)
            }
            ;
            u.prototype.getBBox = function(f, e) {
                var t = this.renderer
                  , Q = this.element
                  , h = this.styles
                  , q = this.textStr
                  , r = t.cache
                  , b = t.cacheKeys
                  , k = Q.namespaceURI === this.SVG_NS;
                e = m(e, this.rotation, 0);
                var I = t.styledMode ? Q && u.prototype.getStyle.call(Q, "font-size") : h && h.fontSize, z;
                if (M(q)) {
                    var C = q.toString();
                    -1 === C.indexOf("<") && (C = C.replace(/[0-9]/g, "0"));
                    C += ["", e, I, this.textWidth, h && h.textOverflow, h && h.fontWeight].join()
                }
                C && !f && (z = r[C]);
                if (!z) {
                    if (k || t.forExport) {
                        try {
                            var O = this.fakeTS && function(a) {
                                var f = Q.querySelector(".highcharts-text-outline");
                                f && L(f, {
                                    display: a
                                })
                            }
                            ;
                            a(O) && O("none");
                            z = Q.getBBox ? w({}, Q.getBBox()) : {
                                width: Q.offsetWidth,
                                height: Q.offsetHeight
                            };
                            a(O) && O("")
                        } catch (U) {
                            ""
                        }
                        if (!z || 0 > z.width)
                            z = {
                                width: 0,
                                height: 0
                            }
                    } else
                        z = this.htmlGetBBox();
                    t.isSVG && (f = z.width,
                    t = z.height,
                    k && (z.height = t = {
                        "11px,17": 14,
                        "13px,20": 16
                    }[h && h.fontSize + "," + Math.round(t)] || t),
                    e && (h = e * d,
                    z.width = Math.abs(t * Math.sin(h)) + Math.abs(f * Math.cos(h)),
                    z.height = Math.abs(t * Math.cos(h)) + Math.abs(f * Math.sin(h))));
                    if (C && 0 < z.height) {
                        for (; 250 < b.length; )
                            delete r[b.shift()];
                        r[C] || b.push(C);
                        r[C] = z
                    }
                }
                return z
            }
            ;
            u.prototype.getStyle = function(a) {
                return D.getComputedStyle(this.element || this, "").getPropertyValue(a)
            }
            ;
            u.prototype.hasClass = function(a) {
                return -1 !== ("" + this.attr("class")).split(" ").indexOf(a)
            }
            ;
            u.prototype.hide = function(a) {
                a ? this.attr({
                    y: -9999
                }) : this.attr({
                    visibility: "hidden"
                });
                return this
            }
            ;
            u.prototype.htmlGetBBox = function() {
                return {
                    height: 0,
                    width: 0,
                    x: 0,
                    y: 0
                }
            }
            ;
            u.prototype.init = function(a, f) {
                this.element = "span" === f ? k(f) : l.createElementNS(this.SVG_NS, f);
                this.renderer = a;
                e(this, "afterInit")
            }
            ;
            u.prototype.invert = function(a) {
                this.inverted = a;
                this.updateTransform();
                return this
            }
            ;
            u.prototype.on = function(a, f) {
                var t = this.onEvents;
                if (t[a])
                    t[a]();
                t[a] = y(this.element, a, f);
                return this
            }
            ;
            u.prototype.opacitySetter = function(a, f, t) {
                this.opacity = a = Number(Number(a).toFixed(3));
                t.setAttribute(f, a)
            }
            ;
            u.prototype.removeClass = function(a) {
                return this.attr("class", ("" + this.attr("class")).replace(I(a) ? new RegExp("(^| )" + a + "( |$)") : a, " ").replace(/ +/g, " ").trim())
            }
            ;
            u.prototype.removeTextOutline = function() {
                var a = this.element.querySelector("tspan.highcharts-text-outline");
                a && this.safeRemoveChild(a)
            }
            ;
            u.prototype.safeRemoveChild = function(a) {
                var f = a.parentNode;
                f && f.removeChild(a)
            }
            ;
            u.prototype.setRadialReference = function(a) {
                var f = this.element.gradient && this.renderer.gradients[this.element.gradient];
                this.element.radialReference = a;
                f && f.radAttr && f.animate(this.renderer.getRadialAttr(a, f.radAttr));
                return this
            }
            ;
            u.prototype.setTextPath = function(a, f) {
                var t = this.element
                  , e = this.text ? this.text.element : t
                  , m = {
                    textAnchor: "text-anchor"
                }
                  , u = !1
                  , r = this.textPathWrapper
                  , k = !r;
                f = C(!0, {
                    enabled: !0,
                    attributes: {
                        dy: -5,
                        startOffset: "50%",
                        textAnchor: "middle"
                    }
                }, f);
                var I = c.filterUserAttributes(f.attributes);
                if (a && f && f.enabled) {
                    r && null === r.element.parentNode ? (k = !0,
                    r = r.destroy()) : r && this.removeTextOutline.call(r.parentGroup);
                    this.options && this.options.padding && (I.dx = -this.options.padding);
                    r || (this.textPathWrapper = r = this.renderer.createElement("textPath"),
                    u = !0);
                    var g = r.element;
                    (f = a.element.getAttribute("id")) || a.element.setAttribute("id", f = h());
                    if (k)
                        for (e.setAttribute("y", 0),
                        q(I.dx) && e.setAttribute("x", -I.dx),
                        a = [].slice.call(e.childNodes),
                        k = 0; k < a.length; k++) {
                            var w = a[k];
                            w.nodeType !== Node.TEXT_NODE && "tspan" !== w.nodeName || g.appendChild(w)
                        }
                    u && r && r.add({
                        element: e
                    });
                    g.setAttributeNS("http://www.w3.org/1999/xlink", "href", this.renderer.url + "#" + f);
                    M(I.dy) && (g.parentNode.setAttribute("dy", I.dy),
                    delete I.dy);
                    M(I.dx) && (g.parentNode.setAttribute("dx", I.dx),
                    delete I.dx);
                    z(I, function(a, f) {
                        g.setAttribute(m[f] || f, a)
                    });
                    t.removeAttribute("transform");
                    this.removeTextOutline.call(r);
                    this.text && !this.renderer.styledMode && this.attr({
                        fill: "none",
                        "stroke-width": 0
                    });
                    this.applyTextOutline = this.updateTransform = b
                } else
                    r && (delete this.updateTransform,
                    delete this.applyTextOutline,
                    this.destroyTextPath(t, a),
                    this.updateTransform(),
                    this.options && this.options.rotation && this.applyTextOutline(this.options.style.textOutline));
                return this
            }
            ;
            u.prototype.shadow = function(a, f, t) {
                var e = [], h = this.element, m = this.oldShadowOptions, q = {
                    color: A.neutralColor100,
                    offsetX: this.parentInverted ? -1 : 1,
                    offsetY: this.parentInverted ? -1 : 1,
                    opacity: .15,
                    width: 3
                }, u = !1, r;
                !0 === a ? r = q : "object" === typeof a && (r = w(q, a));
                r && (r && m && z(r, function(a, f) {
                    a !== m[f] && (u = !0)
                }),
                u && this.destroyShadows(),
                this.oldShadowOptions = r);
                if (!r)
                    this.destroyShadows();
                else if (!this.shadows) {
                    var b = r.opacity / r.width;
                    var k = this.parentInverted ? "translate(" + r.offsetY + ", " + r.offsetX + ")" : "translate(" + r.offsetX + ", " + r.offsetY + ")";
                    for (q = 1; q <= r.width; q++) {
                        var I = h.cloneNode(!1);
                        var C = 2 * r.width + 1 - 2 * q;
                        v(I, {
                            stroke: a.color || A.neutralColor100,
                            "stroke-opacity": b * q,
                            "stroke-width": C,
                            transform: k,
                            fill: "none"
                        });
                        I.setAttribute("class", (I.getAttribute("class") || "") + " highcharts-shadow");
                        t && (v(I, "height", Math.max(v(I, "height") - C, 0)),
                        I.cutHeight = C);
                        f ? f.element.appendChild(I) : h.parentNode && h.parentNode.insertBefore(I, h);
                        e.push(I)
                    }
                    this.shadows = e
                }
                return this
            }
            ;
            u.prototype.show = function(a) {
                return this.attr({
                    visibility: a ? "inherit" : "visible"
                })
            }
            ;
            u.prototype.strokeSetter = function(a, f, e) {
                this[f] = a;
                this.stroke && this["stroke-width"] ? (u.prototype.fillSetter.call(this, this.stroke, "stroke", e),
                e.setAttribute("stroke-width", this["stroke-width"]),
                this.hasStroke = !0) : "stroke-width" === f && 0 === a && this.hasStroke ? (e.removeAttribute("stroke"),
                this.hasStroke = !1) : this.renderer.styledMode && this["stroke-width"] && (e.setAttribute("stroke-width", this["stroke-width"]),
                this.hasStroke = !0)
            }
            ;
            u.prototype.strokeWidth = function() {
                if (!this.renderer.styledMode)
                    return this["stroke-width"] || 0;
                var a = this.getStyle("stroke-width")
                  , e = 0;
                if (a.indexOf("px") === a.length - 2)
                    e = f(a);
                else if ("" !== a) {
                    var t = l.createElementNS(N, "rect");
                    v(t, {
                        width: a,
                        "stroke-width": 0
                    });
                    this.element.parentNode.appendChild(t);
                    e = t.getBBox().width;
                    t.parentNode.removeChild(t)
                }
                return e
            }
            ;
            u.prototype.symbolAttr = function(a) {
                var f = this;
                "x y r start end width height innerR anchorX anchorY clockwise".split(" ").forEach(function(e) {
                    f[e] = m(a[e], f[e])
                });
                f.attr({
                    d: f.renderer.symbols[f.symbolName](f.x, f.y, f.width, f.height, f)
                })
            }
            ;
            u.prototype.textSetter = function(a) {
                a !== this.textStr && (delete this.textPxLength,
                this.textStr = a,
                this.added && this.renderer.buildText(this))
            }
            ;
            u.prototype.titleSetter = function(a) {
                var f = this.element
                  , e = f.getElementsByTagName("title")[0] || l.createElementNS(this.SVG_NS, "title");
                f.insertBefore ? f.insertBefore(e, f.firstChild) : f.appendChild(e);
                e.textContent = String(m(a, "")).replace(/<[^>]*>/g, "").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
            }
            ;
            u.prototype.toFront = function() {
                var a = this.element;
                a.parentNode.appendChild(a);
                return this
            }
            ;
            u.prototype.translate = function(a, f) {
                return this.attr({
                    translateX: a,
                    translateY: f
                })
            }
            ;
            u.prototype.updateShadows = function(a, f, e) {
                var t = this.shadows;
                if (t)
                    for (var h = t.length; h--; )
                        e.call(t[h], "height" === a ? Math.max(f - (t[h].cutHeight || 0), 0) : "d" === a ? this.d : f, a, t[h])
            }
            ;
            u.prototype.updateTransform = function() {
                var a = this.scaleX
                  , f = this.scaleY
                  , e = this.inverted
                  , h = this.rotation
                  , q = this.matrix
                  , r = this.element
                  , u = this.translateX || 0
                  , b = this.translateY || 0;
                e && (u += this.width,
                b += this.height);
                u = ["translate(" + u + "," + b + ")"];
                M(q) && u.push("matrix(" + q.join(",") + ")");
                e ? u.push("rotate(90) scale(-1,1)") : h && u.push("rotate(" + h + " " + m(this.rotationOriginX, r.getAttribute("x"), 0) + " " + m(this.rotationOriginY, r.getAttribute("y") || 0) + ")");
                (M(a) || M(f)) && u.push("scale(" + m(a, 1) + " " + m(f, 1) + ")");
                u.length && r.setAttribute("transform", u.join(" "))
            }
            ;
            u.prototype.visibilitySetter = function(a, f, e) {
                "inherit" === a ? e.removeAttribute(f) : this[f] !== a && e.setAttribute(f, a);
                this[f] = a
            }
            ;
            u.prototype.xGetter = function(a) {
                "circle" === this.element.nodeName && ("x" === a ? a = "cx" : "y" === a && (a = "cy"));
                return this._defaultGetter(a)
            }
            ;
            u.prototype.zIndexSetter = function(a, e) {
                var t = this.renderer
                  , h = this.parentGroup
                  , m = (h || t).element || t.box
                  , q = this.element;
                t = m === t.box;
                var u = !1;
                var r = this.added;
                var b;
                M(a) ? (q.setAttribute("data-z-index", a),
                a = +a,
                this[e] === a && (r = !1)) : M(this[e]) && q.removeAttribute("data-z-index");
                this[e] = a;
                if (r) {
                    (a = this.zIndex) && h && (h.handleZ = !0);
                    e = m.childNodes;
                    for (b = e.length - 1; 0 <= b && !u; b--) {
                        h = e[b];
                        r = h.getAttribute("data-z-index");
                        var k = !M(r);
                        if (h !== q)
                            if (0 > a && k && !t && !b)
                                m.insertBefore(q, e[b]),
                                u = !0;
                            else if (f(r) <= a || k && (!M(a) || 0 <= a))
                                m.insertBefore(q, e[b + 1] || null),
                                u = !0
                    }
                    u || (m.insertBefore(q, e[t ? 3 : 0] || null),
                    u = !0)
                }
                return u
            }
            ;
            return u
        }();
        n.prototype["stroke-widthSetter"] = n.prototype.strokeSetter;
        n.prototype.yGetter = n.prototype.xGetter;
        n.prototype.matrixSetter = n.prototype.rotationOriginXSetter = n.prototype.rotationOriginYSetter = n.prototype.rotationSetter = n.prototype.scaleXSetter = n.prototype.scaleYSetter = n.prototype.translateXSetter = n.prototype.translateYSetter = n.prototype.verticalAlignSetter = function(a, f) {
            this[f] = a;
            this.doTransform = !0
        }
        ;
        "";
        return n
    });
    P(c, "Core/Renderer/RendererRegistry.js", [c["Core/Globals.js"]], function(c) {
        var n;
        (function(n) {
            var x;
            n.rendererTypes = {};
            n.getRendererType = function(c) {
                void 0 === c && (c = x);
                return n.rendererTypes[c] || n.rendererTypes[x]
            }
            ;
            n.registerRendererType = function(A, F, G) {
                n.rendererTypes[A] = F;
                if (!x || G)
                    x = A,
                    c.Renderer = F
            }
        }
        )(n || (n = {}));
        return n
    });
    P(c, "Core/Renderer/SVG/SVGLabel.js", [c["Core/Renderer/SVG/SVGElement.js"], c["Core/Utilities.js"]], function(n, c) {
        var x = this && this.__extends || function() {
            var d = function(l, b) {
                d = Object.setPrototypeOf || {
                    __proto__: []
                }instanceof Array && function(b, d) {
                    b.__proto__ = d
                }
                || function(b, d) {
                    for (var g in d)
                        d.hasOwnProperty(g) && (b[g] = d[g])
                }
                ;
                return d(l, b)
            };
            return function(l, b) {
                function g() {
                    this.constructor = l
                }
                d(l, b);
                l.prototype = null === b ? Object.create(b) : (g.prototype = b.prototype,
                new g)
            }
        }()
          , H = c.defined
          , A = c.extend
          , F = c.isNumber
          , G = c.merge
          , J = c.pick
          , p = c.removeEvent;
        return function(d) {
            function l(b, g, p, D, y, v, k, L, M, B) {
                var w = d.call(this) || this;
                w.paddingLeftSetter = w.paddingSetter;
                w.paddingRightSetter = w.paddingSetter;
                w.init(b, "g");
                w.textStr = g;
                w.x = p;
                w.y = D;
                w.anchorX = v;
                w.anchorY = k;
                w.baseline = M;
                w.className = B;
                w.addClass("button" === B ? "highcharts-no-tooltip" : "highcharts-label");
                B && w.addClass("highcharts-" + B);
                w.text = b.text("", 0, 0, L).attr({
                    zIndex: 1
                });
                var e;
                "string" === typeof y && ((e = /^url\((.*?)\)$/.test(y)) || w.renderer.symbols[y]) && (w.symbolKey = y);
                w.bBox = l.emptyBBox;
                w.padding = 3;
                w.baselineOffset = 0;
                w.needsBox = b.styledMode || e;
                w.deferredAttr = {};
                w.alignFactor = 0;
                return w
            }
            x(l, d);
            l.prototype.alignSetter = function(b) {
                b = {
                    left: 0,
                    center: .5,
                    right: 1
                }[b];
                b !== this.alignFactor && (this.alignFactor = b,
                this.bBox && F(this.xSetting) && this.attr({
                    x: this.xSetting
                }))
            }
            ;
            l.prototype.anchorXSetter = function(b, g) {
                this.anchorX = b;
                this.boxAttr(g, Math.round(b) - this.getCrispAdjust() - this.xSetting)
            }
            ;
            l.prototype.anchorYSetter = function(b, g) {
                this.anchorY = b;
                this.boxAttr(g, b - this.ySetting)
            }
            ;
            l.prototype.boxAttr = function(b, g) {
                this.box ? this.box.attr(b, g) : this.deferredAttr[b] = g
            }
            ;
            l.prototype.css = function(b) {
                if (b) {
                    var g = {};
                    b = G(b);
                    l.textProps.forEach(function(d) {
                        "undefined" !== typeof b[d] && (g[d] = b[d],
                        delete b[d])
                    });
                    this.text.css(g);
                    var d = "width"in g;
                    "fontSize"in g || "fontWeight"in g ? this.updateTextPadding() : d && this.updateBoxSize()
                }
                return n.prototype.css.call(this, b)
            }
            ;
            l.prototype.destroy = function() {
                p(this.element, "mouseenter");
                p(this.element, "mouseleave");
                this.text && this.text.destroy();
                this.box && (this.box = this.box.destroy());
                n.prototype.destroy.call(this)
            }
            ;
            l.prototype.fillSetter = function(b, g) {
                b && (this.needsBox = !0);
                this.fill = b;
                this.boxAttr(g, b)
            }
            ;
            l.prototype.getBBox = function() {
                this.textStr && 0 === this.bBox.width && 0 === this.bBox.height && this.updateBoxSize();
                var b = this.padding
                  , g = J(this.paddingLeft, b);
                return {
                    width: this.width,
                    height: this.height,
                    x: this.bBox.x - g,
                    y: this.bBox.y - b
                }
            }
            ;
            l.prototype.getCrispAdjust = function() {
                return this.renderer.styledMode && this.box ? this.box.strokeWidth() % 2 / 2 : (this["stroke-width"] ? parseInt(this["stroke-width"], 10) : 0) % 2 / 2
            }
            ;
            l.prototype.heightSetter = function(b) {
                this.heightSetting = b
            }
            ;
            l.prototype.on = function(b, g) {
                var d = this
                  , l = d.text
                  , y = l && "SPAN" === l.element.tagName ? l : void 0;
                if (y) {
                    var v = function(k) {
                        ("mouseenter" === b || "mouseleave" === b) && k.relatedTarget instanceof Element && (d.element.compareDocumentPosition(k.relatedTarget) & Node.DOCUMENT_POSITION_CONTAINED_BY || y.element.compareDocumentPosition(k.relatedTarget) & Node.DOCUMENT_POSITION_CONTAINED_BY) || g.call(d.element, k)
                    };
                    y.on(b, v)
                }
                n.prototype.on.call(d, b, v || g);
                return d
            }
            ;
            l.prototype.onAdd = function() {
                var b = this.textStr;
                this.text.add(this);
                this.attr({
                    text: H(b) ? b : "",
                    x: this.x,
                    y: this.y
                });
                this.box && H(this.anchorX) && this.attr({
                    anchorX: this.anchorX,
                    anchorY: this.anchorY
                })
            }
            ;
            l.prototype.paddingSetter = function(b, g) {
                F(b) ? b !== this[g] && (this[g] = b,
                this.updateTextPadding()) : this[g] = void 0
            }
            ;
            l.prototype.rSetter = function(b, g) {
                this.boxAttr(g, b)
            }
            ;
            l.prototype.shadow = function(b) {
                b && !this.renderer.styledMode && (this.updateBoxSize(),
                this.box && this.box.shadow(b));
                return this
            }
            ;
            l.prototype.strokeSetter = function(b, g) {
                this.stroke = b;
                this.boxAttr(g, b)
            }
            ;
            l.prototype["stroke-widthSetter"] = function(b, g) {
                b && (this.needsBox = !0);
                this["stroke-width"] = b;
                this.boxAttr(g, b)
            }
            ;
            l.prototype["text-alignSetter"] = function(b) {
                this.textAlign = b
            }
            ;
            l.prototype.textSetter = function(b) {
                "undefined" !== typeof b && this.text.attr({
                    text: b
                });
                this.updateTextPadding()
            }
            ;
            l.prototype.updateBoxSize = function() {
                var b = this.text.element.style
                  , g = {}
                  , d = this.padding
                  , p = this.bBox = F(this.widthSetting) && F(this.heightSetting) && !this.textAlign || !H(this.text.textStr) ? l.emptyBBox : this.text.getBBox();
                this.width = this.getPaddedWidth();
                this.height = (this.heightSetting || p.height || 0) + 2 * d;
                b = this.renderer.fontMetrics(b && b.fontSize, this.text);
                this.baselineOffset = d + Math.min((this.text.firstLineMetrics || b).b, p.height || Infinity);
                this.heightSetting && (this.baselineOffset += (this.heightSetting - b.h) / 2);
                this.needsBox && (this.box || (d = this.box = this.symbolKey ? this.renderer.symbol(this.symbolKey) : this.renderer.rect(),
                d.addClass(("button" === this.className ? "" : "highcharts-label-box") + (this.className ? " highcharts-" + this.className + "-box" : "")),
                d.add(this)),
                d = this.getCrispAdjust(),
                g.x = d,
                g.y = (this.baseline ? -this.baselineOffset : 0) + d,
                g.width = Math.round(this.width),
                g.height = Math.round(this.height),
                this.box.attr(A(g, this.deferredAttr)),
                this.deferredAttr = {})
            }
            ;
            l.prototype.updateTextPadding = function() {
                var b = this.text;
                this.updateBoxSize();
                var g = this.baseline ? 0 : this.baselineOffset
                  , d = J(this.paddingLeft, this.padding);
                H(this.widthSetting) && this.bBox && ("center" === this.textAlign || "right" === this.textAlign) && (d += {
                    center: .5,
                    right: 1
                }[this.textAlign] * (this.widthSetting - this.bBox.width));
                if (d !== b.x || g !== b.y)
                    b.attr("x", d),
                    b.hasBoxWidthChanged && (this.bBox = b.getBBox(!0)),
                    "undefined" !== typeof g && b.attr("y", g);
                b.x = d;
                b.y = g
            }
            ;
            l.prototype.widthSetter = function(b) {
                this.widthSetting = F(b) ? b : void 0
            }
            ;
            l.prototype.getPaddedWidth = function() {
                var b = this.padding
                  , d = J(this.paddingLeft, b);
                b = J(this.paddingRight, b);
                return (this.widthSetting || this.bBox.width || 0) + d + b
            }
            ;
            l.prototype.xSetter = function(b) {
                this.x = b;
                this.alignFactor && (b -= this.alignFactor * this.getPaddedWidth(),
                this["forceAnimate:x"] = !0);
                this.xSetting = Math.round(b);
                this.attr("translateX", this.xSetting)
            }
            ;
            l.prototype.ySetter = function(b) {
                this.ySetting = this.y = Math.round(b);
                this.attr("translateY", this.ySetting)
            }
            ;
            l.emptyBBox = {
                width: 0,
                height: 0,
                x: 0,
                y: 0
            };
            l.textProps = "color direction fontFamily fontSize fontStyle fontWeight lineHeight textAlign textDecoration textOutline textOverflow width".split(" ");
            return l
        }(n)
    });
    P(c, "Core/Renderer/SVG/Symbols.js", [c["Core/Utilities.js"]], function(c) {
        function n(c, p, d, l, b) {
            var g = [];
            if (b) {
                var n = b.start || 0
                  , D = G(b.r, d);
                d = G(b.r, l || d);
                var y = (b.end || 0) - .001;
                l = b.innerR;
                var v = G(b.open, .001 > Math.abs((b.end || 0) - n - 2 * Math.PI))
                  , k = Math.cos(n)
                  , L = Math.sin(n)
                  , M = Math.cos(y)
                  , B = Math.sin(y);
                n = G(b.longArc, .001 > y - n - Math.PI ? 0 : 1);
                g.push(["M", c + D * k, p + d * L], ["A", D, d, 0, n, G(b.clockwise, 1), c + D * M, p + d * B]);
                A(l) && g.push(v ? ["M", c + l * M, p + l * B] : ["L", c + l * M, p + l * B], ["A", l, l, 0, n, A(b.clockwise) ? 1 - b.clockwise : 0, c + l * k, p + l * L]);
                v || g.push(["Z"])
            }
            return g
        }
        function E(c, p, d, l, b) {
            return b && b.r ? H(c, p, d, l, b) : [["M", c, p], ["L", c + d, p], ["L", c + d, p + l], ["L", c, p + l], ["Z"]]
        }
        function H(c, p, d, l, b) {
            b = b && b.r || 0;
            return [["M", c + b, p], ["L", c + d - b, p], ["C", c + d, p, c + d, p, c + d, p + b], ["L", c + d, p + l - b], ["C", c + d, p + l, c + d, p + l, c + d - b, p + l], ["L", c + b, p + l], ["C", c, p + l, c, p + l, c, p + l - b], ["L", c, p + b], ["C", c, p, c, p, c + b, p]]
        }
        var A = c.defined
          , F = c.isNumber
          , G = c.pick;
        return {
            arc: n,
            callout: function(c, p, d, l, b) {
                var g = Math.min(b && b.r || 0, d, l)
                  , n = g + 6
                  , D = b && b.anchorX;
                b = b && b.anchorY || 0;
                var y = H(c, p, d, l, {
                    r: g
                });
                if (!F(D))
                    return y;
                c + D >= d ? b > p + n && b < p + l - n ? y.splice(3, 1, ["L", c + d, b - 6], ["L", c + d + 6, b], ["L", c + d, b + 6], ["L", c + d, p + l - g]) : y.splice(3, 1, ["L", c + d, l / 2], ["L", D, b], ["L", c + d, l / 2], ["L", c + d, p + l - g]) : 0 >= c + D ? b > p + n && b < p + l - n ? y.splice(7, 1, ["L", c, b + 6], ["L", c - 6, b], ["L", c, b - 6], ["L", c, p + g]) : y.splice(7, 1, ["L", c, l / 2], ["L", D, b], ["L", c, l / 2], ["L", c, p + g]) : b && b > l && D > c + n && D < c + d - n ? y.splice(5, 1, ["L", D + 6, p + l], ["L", D, p + l + 6], ["L", D - 6, p + l], ["L", c + g, p + l]) : b && 0 > b && D > c + n && D < c + d - n && y.splice(1, 1, ["L", D - 6, p], ["L", D, p - 6], ["L", D + 6, p], ["L", d - g, p]);
                return y
            },
            circle: function(c, p, d, l) {
                return n(c + d / 2, p + l / 2, d / 2, l / 2, {
                    start: .5 * Math.PI,
                    end: 2.5 * Math.PI,
                    open: !1
                })
            },
            diamond: function(c, p, d, l) {
                return [["M", c + d / 2, p], ["L", c + d, p + l / 2], ["L", c + d / 2, p + l], ["L", c, p + l / 2], ["Z"]]
            },
            rect: E,
            roundedRect: H,
            square: E,
            triangle: function(c, p, d, l) {
                return [["M", c + d / 2, p], ["L", c + d, p + l], ["L", c, p + l], ["Z"]]
            },
            "triangle-down": function(c, p, d, l) {
                return [["M", c, p], ["L", c + d, p], ["L", c + d / 2, p + l], ["Z"]]
            }
        }
    });
    P(c, "Core/Renderer/SVG/TextBuilder.js", [c["Core/Renderer/HTML/AST.js"], c["Core/Globals.js"], c["Core/Utilities.js"]], function(c, x, E) {
        var n = x.doc
          , A = x.SVG_NS
          , F = E.attr
          , G = E.isString
          , J = E.objectEach
          , p = E.pick;
        return function() {
            function d(d) {
                var b = d.styles;
                this.renderer = d.renderer;
                this.svgElement = d;
                this.width = d.textWidth;
                this.textLineHeight = b && b.lineHeight;
                this.textOutline = b && b.textOutline;
                this.ellipsis = !(!b || "ellipsis" !== b.textOverflow);
                this.noWrap = !(!b || "nowrap" !== b.whiteSpace);
                this.fontSize = b && b.fontSize
            }
            d.prototype.buildSVG = function() {
                var d = this.svgElement
                  , b = d.element
                  , g = d.renderer
                  , N = p(d.textStr, "").toString()
                  , D = -1 !== N.indexOf("<")
                  , y = b.childNodes
                  , v = y.length;
                g = this.width && !d.added && g.box;
                var k = /<br.*?>/g;
                var L = [N, this.ellipsis, this.noWrap, this.textLineHeight, this.textOutline, this.fontSize, this.width].join();
                if (L !== d.textCache) {
                    d.textCache = L;
                    for (delete d.actualWidth; v--; )
                        b.removeChild(y[v]);
                    D || this.ellipsis || this.width || -1 !== N.indexOf(" ") && (!this.noWrap || k.test(N)) ? "" !== N && (g && g.appendChild(b),
                    N = new c(N),
                    this.modifyTree(N.nodes),
                    N.addToDOM(d.element),
                    this.modifyDOM(),
                    this.ellipsis && -1 !== (b.textContent || "").indexOf("\u2026") && d.attr("title", this.unescapeEntities(d.textStr || "", ["&lt;", "&gt;"])),
                    g && g.removeChild(b)) : b.appendChild(n.createTextNode(this.unescapeEntities(N)));
                    G(this.textOutline) && d.applyTextOutline && d.applyTextOutline(this.textOutline)
                }
            }
            ;
            d.prototype.modifyDOM = function() {
                var d = this
                  , b = this.svgElement
                  , g = F(b.element, "x");
                b.firstLineMetrics = void 0;
                [].forEach.call(b.element.querySelectorAll("tspan.highcharts-br"), function(v, k) {
                    v.nextSibling && v.previousSibling && (0 === k && 1 === v.previousSibling.nodeType && (b.firstLineMetrics = b.renderer.fontMetrics(void 0, v.previousSibling)),
                    F(v, {
                        dy: d.getLineHeight(v.nextSibling),
                        x: g
                    }))
                });
                var c = this.width || 0;
                if (c) {
                    var p = function(v, k) {
                        var y = v.textContent || ""
                          , l = y.replace(/([^\^])-/g, "$1- ").split(" ")
                          , B = !d.noWrap && (1 < l.length || 1 < b.element.childNodes.length)
                          , w = d.getLineHeight(k)
                          , e = 0
                          , r = b.actualWidth;
                        if (d.ellipsis)
                            y && d.truncate(v, y, void 0, 0, Math.max(0, c - parseInt(d.fontSize || 12, 10)), function(a, e) {
                                return a.substring(0, e) + "\u2026"
                            });
                        else if (B) {
                            y = [];
                            for (B = []; k.firstChild && k.firstChild !== v; )
                                B.push(k.firstChild),
                                k.removeChild(k.firstChild);
                            for (; l.length; )
                                l.length && !d.noWrap && 0 < e && (y.push(v.textContent || ""),
                                v.textContent = l.join(" ").replace(/- /g, "-")),
                                d.truncate(v, void 0, l, 0 === e ? r || 0 : 0, c, function(a, e) {
                                    return l.slice(0, e).join(" ").replace(/- /g, "-")
                                }),
                                r = b.actualWidth,
                                e++;
                            B.forEach(function(a) {
                                k.insertBefore(a, v)
                            });
                            y.forEach(function(a) {
                                k.insertBefore(n.createTextNode(a), v);
                                a = n.createElementNS(A, "tspan");
                                a.textContent = "\u200b";
                                F(a, {
                                    dy: w,
                                    x: g
                                });
                                k.insertBefore(a, v)
                            })
                        }
                    }
                      , y = function(d) {
                        [].slice.call(d.childNodes).forEach(function(k) {
                            k.nodeType === Node.TEXT_NODE ? p(k, d) : (-1 !== k.className.baseVal.indexOf("highcharts-br") && (b.actualWidth = 0),
                            y(k))
                        })
                    };
                    y(b.element)
                }
            }
            ;
            d.prototype.getLineHeight = function(d) {
                var b;
                d = d.nodeType === Node.TEXT_NODE ? d.parentElement : d;
                this.renderer.styledMode || (b = d && /(px|em)$/.test(d.style.fontSize) ? d.style.fontSize : this.fontSize || this.renderer.style.fontSize || 12);
                return this.textLineHeight ? parseInt(this.textLineHeight.toString(), 10) : this.renderer.fontMetrics(b, d || this.svgElement.element).h
            }
            ;
            d.prototype.modifyTree = function(d) {
                var b = this
                  , g = function(c, l) {
                    var y = c.tagName
                      , v = b.renderer.styledMode
                      , k = c.attributes || {};
                    if ("b" === y || "strong" === y)
                        v ? k["class"] = "highcharts-strong" : k.style = "font-weight:bold;" + (k.style || "");
                    else if ("i" === y || "em" === y)
                        v ? k["class"] = "highcharts-emphasized" : k.style = "font-style:italic;" + (k.style || "");
                    G(k.style) && (k.style = k.style.replace(/(;| |^)color([ :])/, "$1fill$2"));
                    "br" === y && (k["class"] = "highcharts-br",
                    c.textContent = "\u200b",
                    (l = d[l + 1]) && l.textContent && (l.textContent = l.textContent.replace(/^ +/gm, "")));
                    "#text" !== y && "a" !== y && (c.tagName = "tspan");
                    c.attributes = k;
                    c.children && c.children.filter(function(b) {
                        return "#text" !== b.tagName
                    }).forEach(g)
                };
                for (d.forEach(g); d[0] && "tspan" === d[0].tagName && !d[0].children; )
                    d.splice(0, 1)
            }
            ;
            d.prototype.truncate = function(d, b, g, c, p, y) {
                var v = this.svgElement, k = v.renderer, l = v.rotation, M = [], B = g ? 1 : 0, w = (b || g || "").length, e = w, r, a = function(a, e) {
                    e = e || a;
                    var q = d.parentNode;
                    if (q && "undefined" === typeof M[e])
                        if (q.getSubStringLength)
                            try {
                                M[e] = c + q.getSubStringLength(0, g ? e + 1 : e)
                            } catch (m) {
                                ""
                            }
                        else
                            k.getSpanWidth && (d.textContent = y(b || g, a),
                            M[e] = c + k.getSpanWidth(v, d));
                    return M[e]
                };
                v.rotation = 0;
                var q = a(d.textContent.length);
                if (c + q > p) {
                    for (; B <= w; )
                        e = Math.ceil((B + w) / 2),
                        g && (r = y(g, e)),
                        q = a(e, r && r.length - 1),
                        B === w ? B = w + 1 : q > p ? w = e - 1 : B = e;
                    0 === w ? d.textContent = "" : b && w === b.length - 1 || (d.textContent = r || y(b || g, e))
                }
                g && g.splice(0, e);
                v.actualWidth = q;
                v.rotation = l
            }
            ;
            d.prototype.unescapeEntities = function(d, b) {
                J(this.renderer.escapes, function(g, c) {
                    b && -1 !== b.indexOf(g) || (d = d.toString().replace(new RegExp(g,"g"), c))
                });
                return d
            }
            ;
            return d
        }()
    });
    P(c, "Core/Renderer/SVG/SVGRenderer.js", [c["Core/Renderer/HTML/AST.js"], c["Core/Color/Color.js"], c["Core/Globals.js"], c["Core/Color/Palette.js"], c["Core/Renderer/RendererRegistry.js"], c["Core/Renderer/SVG/SVGElement.js"], c["Core/Renderer/SVG/SVGLabel.js"], c["Core/Renderer/SVG/Symbols.js"], c["Core/Renderer/SVG/TextBuilder.js"], c["Core/Utilities.js"]], function(c, x, E, H, A, F, G, J, p, d) {
        var l = E.charts, b = E.deg2rad, g = E.doc, n = E.isFirefox, D = E.isMS, y = E.isWebKit, v = E.noop, k = E.SVG_NS, L = E.symbolSizes, M = E.win, B = d.addEvent, w = d.attr, e = d.createElement, r = d.css, a = d.defined, q = d.destroyObjectProperties, I = d.extend, C = d.isArray, z = d.isNumber, m = d.isObject, f = d.isString, K = d.merge, h = d.pick, u = d.pInt, O = d.uniqueKey, X;
        E = function() {
            function t(a, f, e, t, h, m, q) {
                this.width = this.url = this.style = this.isSVG = this.imgCount = this.height = this.gradients = this.globalAnimation = this.defs = this.chartIndex = this.cacheKeys = this.cache = this.boxWrapper = this.box = this.alignedObjects = void 0;
                this.init(a, f, e, t, h, m, q)
            }
            t.prototype.init = function(a, f, e, t, h, m, q) {
                var Q = this.createElement("svg").attr({
                    version: "1.1",
                    "class": "highcharts-root"
                })
                  , u = Q.element;
                q || Q.css(this.getStyle(t));
                a.appendChild(u);
                w(a, "dir", "ltr");
                -1 === a.innerHTML.indexOf("xmlns") && w(u, "xmlns", this.SVG_NS);
                this.isSVG = !0;
                this.box = u;
                this.boxWrapper = Q;
                this.alignedObjects = [];
                this.url = this.getReferenceURL();
                this.createElement("desc").add().element.appendChild(g.createTextNode("Created with Highcharts 9.1.2"));
                this.defs = this.createElement("defs").add();
                this.allowHTML = m;
                this.forExport = h;
                this.styledMode = q;
                this.gradients = {};
                this.cache = {};
                this.cacheKeys = [];
                this.imgCount = 0;
                this.setSize(f, e, !1);
                var b;
                n && a.getBoundingClientRect && (f = function() {
                    r(a, {
                        left: 0,
                        top: 0
                    });
                    b = a.getBoundingClientRect();
                    r(a, {
                        left: Math.ceil(b.left) - b.left + "px",
                        top: Math.ceil(b.top) - b.top + "px"
                    })
                }
                ,
                f(),
                this.unSubPixelFix = B(M, "resize", f))
            }
            ;
            t.prototype.definition = function(a) {
                return (new c([a])).addToDOM(this.defs.element)
            }
            ;
            t.prototype.getReferenceURL = function() {
                if ((n || y) && g.getElementsByTagName("base").length) {
                    if (!a(X)) {
                        var f = O();
                        f = (new c([{
                            tagName: "svg",
                            attributes: {
                                width: 8,
                                height: 8
                            },
                            children: [{
                                tagName: "defs",
                                children: [{
                                    tagName: "clipPath",
                                    attributes: {
                                        id: f
                                    },
                                    children: [{
                                        tagName: "rect",
                                        attributes: {
                                            width: 4,
                                            height: 4
                                        }
                                    }]
                                }]
                            }, {
                                tagName: "rect",
                                attributes: {
                                    id: "hitme",
                                    width: 8,
                                    height: 8,
                                    "clip-path": "url(#" + f + ")",
                                    fill: "rgba(0,0,0,0.001)"
                                }
                            }]
                        }])).addToDOM(g.body);
                        r(f, {
                            position: "fixed",
                            top: 0,
                            left: 0,
                            zIndex: 9E5
                        });
                        var e = g.elementFromPoint(6, 6);
                        X = "hitme" === (e && e.id);
                        g.body.removeChild(f)
                    }
                    if (X)
                        return M.location.href.split("#")[0].replace(/<[^>]*>/g, "").replace(/([\('\)])/g, "\\$1").replace(/ /g, "%20")
                }
                return ""
            }
            ;
            t.prototype.getStyle = function(a) {
                return this.style = I({
                    fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',
                    fontSize: "12px"
                }, a)
            }
            ;
            t.prototype.setStyle = function(a) {
                this.boxWrapper.css(this.getStyle(a))
            }
            ;
            t.prototype.isHidden = function() {
                return !this.boxWrapper.getBBox().width
            }
            ;
            t.prototype.destroy = function() {
                var a = this.defs;
                this.box = null;
                this.boxWrapper = this.boxWrapper.destroy();
                q(this.gradients || {});
                this.gradients = null;
                a && (this.defs = a.destroy());
                this.unSubPixelFix && this.unSubPixelFix();
                return this.alignedObjects = null
            }
            ;
            t.prototype.createElement = function(a) {
                var f = new this.Element;
                f.init(this, a);
                return f
            }
            ;
            t.prototype.getRadialAttr = function(a, f) {
                return {
                    cx: a[0] - a[2] / 2 + (f.cx || 0) * a[2],
                    cy: a[1] - a[2] / 2 + (f.cy || 0) * a[2],
                    r: (f.r || 0) * a[2]
                }
            }
            ;
            t.prototype.buildText = function(a) {
                (new p(a)).buildSVG()
            }
            ;
            t.prototype.getContrast = function(a) {
                a = x.parse(a).rgba;
                a[0] *= 1;
                a[1] *= 1.2;
                a[2] *= .5;
                return 459 < a[0] + a[1] + a[2] ? "#000000" : "#FFFFFF"
            }
            ;
            t.prototype.button = function(a, f, e, t, h, m, q, u, r, b) {
                var Q = this.label(a, f, e, r, void 0, void 0, b, void 0, "button")
                  , k = this.styledMode
                  , d = 0
                  , z = h ? K(h) : {};
                a = z && z.style || {};
                z = c.filterUserAttributes(z);
                Q.attr(K({
                    padding: 8,
                    r: 2
                }, z));
                if (!k) {
                    z = K({
                        fill: H.neutralColor3,
                        stroke: H.neutralColor20,
                        "stroke-width": 1,
                        style: {
                            color: H.neutralColor80,
                            cursor: "pointer",
                            fontWeight: "normal"
                        }
                    }, {
                        style: a
                    }, z);
                    var C = z.style;
                    delete z.style;
                    m = K(z, {
                        fill: H.neutralColor10
                    }, c.filterUserAttributes(m || {}));
                    var S = m.style;
                    delete m.style;
                    q = K(z, {
                        fill: H.highlightColor10,
                        style: {
                            color: H.neutralColor100,
                            fontWeight: "bold"
                        }
                    }, c.filterUserAttributes(q || {}));
                    var g = q.style;
                    delete q.style;
                    u = K(z, {
                        style: {
                            color: H.neutralColor20
                        }
                    }, c.filterUserAttributes(u || {}));
                    var w = u.style;
                    delete u.style
                }
                B(Q.element, D ? "mouseover" : "mouseenter", function() {
                    3 !== d && Q.setState(1)
                });
                B(Q.element, D ? "mouseout" : "mouseleave", function() {
                    3 !== d && Q.setState(d)
                });
                Q.setState = function(a) {
                    1 !== a && (Q.state = d = a);
                    Q.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-" + ["normal", "hover", "pressed", "disabled"][a || 0]);
                    k || Q.attr([z, m, q, u][a || 0]).css([C, S, g, w][a || 0])
                }
                ;
                k || Q.attr(z).css(I({
                    cursor: "default"
                }, C));
                return Q.on("touchstart", function(a) {
                    return a.stopPropagation()
                }).on("click", function(a) {
                    3 !== d && t.call(Q, a)
                })
            }
            ;
            t.prototype.crispLine = function(f, e, t) {
                void 0 === t && (t = "round");
                var h = f[0]
                  , m = f[1];
                a(h[1]) && h[1] === m[1] && (h[1] = m[1] = Math[t](h[1]) - e % 2 / 2);
                a(h[2]) && h[2] === m[2] && (h[2] = m[2] = Math[t](h[2]) + e % 2 / 2);
                return f
            }
            ;
            t.prototype.path = function(a) {
                var f = this.styledMode ? {} : {
                    fill: "none"
                };
                C(a) ? f.d = a : m(a) && I(f, a);
                return this.createElement("path").attr(f)
            }
            ;
            t.prototype.circle = function(a, f, e) {
                a = m(a) ? a : "undefined" === typeof a ? {} : {
                    x: a,
                    y: f,
                    r: e
                };
                f = this.createElement("circle");
                f.xSetter = f.ySetter = function(a, f, e) {
                    e.setAttribute("c" + f, a)
                }
                ;
                return f.attr(a)
            }
            ;
            t.prototype.arc = function(a, f, e, t, h, q) {
                m(a) ? (t = a,
                f = t.y,
                e = t.r,
                a = t.x) : t = {
                    innerR: t,
                    start: h,
                    end: q
                };
                a = this.symbol("arc", a, f, e, e, t);
                a.r = e;
                return a
            }
            ;
            t.prototype.rect = function(a, f, e, t, h, q) {
                h = m(a) ? a.r : h;
                var u = this.createElement("rect");
                a = m(a) ? a : "undefined" === typeof a ? {} : {
                    x: a,
                    y: f,
                    width: Math.max(e, 0),
                    height: Math.max(t, 0)
                };
                this.styledMode || ("undefined" !== typeof q && (a["stroke-width"] = q,
                a = u.crisp(a)),
                a.fill = "none");
                h && (a.r = h);
                u.rSetter = function(a, f, e) {
                    u.r = a;
                    w(e, {
                        rx: a,
                        ry: a
                    })
                }
                ;
                u.rGetter = function() {
                    return u.r || 0
                }
                ;
                return u.attr(a)
            }
            ;
            t.prototype.setSize = function(a, f, e) {
                this.width = a;
                this.height = f;
                this.boxWrapper.animate({
                    width: a,
                    height: f
                }, {
                    step: function() {
                        this.attr({
                            viewBox: "0 0 " + this.attr("width") + " " + this.attr("height")
                        })
                    },
                    duration: h(e, !0) ? void 0 : 0
                });
                this.alignElements()
            }
            ;
            t.prototype.g = function(a) {
                var f = this.createElement("g");
                return a ? f.attr({
                    "class": "highcharts-" + a
                }) : f
            }
            ;
            t.prototype.image = function(a, f, e, t, h, m) {
                var q = {
                    preserveAspectRatio: "none"
                }
                  , u = function(a, f) {
                    a.setAttributeNS ? a.setAttributeNS("http://www.w3.org/1999/xlink", "href", f) : a.setAttribute("hc-svg-href", f)
                };
                1 < arguments.length && I(q, {
                    x: f,
                    y: e,
                    width: t,
                    height: h
                });
                var r = this.createElement("image").attr(q);
                q = function(f) {
                    u(r.element, a);
                    m.call(r, f)
                }
                ;
                if (m) {
                    u(r.element, "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==");
                    var Q = new M.Image;
                    B(Q, "load", q);
                    Q.src = a;
                    Q.complete && q({})
                } else
                    u(r.element, a);
                return r
            }
            ;
            t.prototype.symbol = function(f, t, m, q, u, b) {
                var Q = this, k = /^url\((.*?)\)$/, d = k.test(f), z = !d && (this.symbols[f] ? f : "circle"), C = z && this.symbols[z], S;
                if (C) {
                    "number" === typeof t && (S = C.call(this.symbols, Math.round(t || 0), Math.round(m || 0), q || 0, u || 0, b));
                    var w = this.path(S);
                    Q.styledMode || w.attr("fill", "none");
                    I(w, {
                        symbolName: z || void 0,
                        x: t,
                        y: m,
                        width: q,
                        height: u
                    });
                    b && I(w, b)
                } else if (d) {
                    var K = f.match(k)[1];
                    var v = w = this.image(K);
                    v.imgwidth = h(L[K] && L[K].width, b && b.width);
                    v.imgheight = h(L[K] && L[K].height, b && b.height);
                    var y = function(a) {
                        return a.attr({
                            width: a.width,
                            height: a.height
                        })
                    };
                    ["width", "height"].forEach(function(f) {
                        v[f + "Setter"] = function(f, e) {
                            var t = this["img" + e];
                            this[e] = f;
                            a(t) && (b && "within" === b.backgroundSize && this.width && this.height && (t = Math.round(t * Math.min(this.width / this.imgwidth, this.height / this.imgheight))),
                            this.element && this.element.setAttribute(e, t),
                            this.alignByTranslate || (f = ((this[e] || 0) - t) / 2,
                            this.attr("width" === e ? {
                                translateX: f
                            } : {
                                translateY: f
                            })))
                        }
                    });
                    a(t) && v.attr({
                        x: t,
                        y: m
                    });
                    v.isImg = !0;
                    a(v.imgwidth) && a(v.imgheight) ? y(v) : (v.attr({
                        width: 0,
                        height: 0
                    }),
                    e("img", {
                        onload: function() {
                            var a = l[Q.chartIndex];
                            0 === this.width && (r(this, {
                                position: "absolute",
                                top: "-999em"
                            }),
                            g.body.appendChild(this));
                            L[K] = {
                                width: this.width,
                                height: this.height
                            };
                            v.imgwidth = this.width;
                            v.imgheight = this.height;
                            v.element && y(v);
                            this.parentNode && this.parentNode.removeChild(this);
                            Q.imgCount--;
                            if (!Q.imgCount && a && !a.hasLoaded)
                                a.onload()
                        },
                        src: K
                    }),
                    this.imgCount++)
                }
                return w
            }
            ;
            t.prototype.clipRect = function(a, f, e, t) {
                var h = O() + "-"
                  , m = this.createElement("clipPath").attr({
                    id: h
                }).add(this.defs);
                a = this.rect(a, f, e, t, 0).add(m);
                a.id = h;
                a.clipPath = m;
                a.count = 0;
                return a
            }
            ;
            t.prototype.text = function(f, e, t, h) {
                var m = {};
                if (h && (this.allowHTML || !this.forExport))
                    return this.html(f, e, t);
                m.x = Math.round(e || 0);
                t && (m.y = Math.round(t));
                a(f) && (m.text = f);
                f = this.createElement("text").attr(m);
                h || (f.xSetter = function(a, f, e) {
                    for (var t = e.getElementsByTagName("tspan"), h = e.getAttribute(f), m = 0, q; m < t.length; m++)
                        q = t[m],
                        q.getAttribute(f) === h && q.setAttribute(f, a);
                    e.setAttribute(f, a)
                }
                );
                return f
            }
            ;
            t.prototype.fontMetrics = function(a, f) {
                a = !this.styledMode && /px/.test(a) || !M.getComputedStyle ? a || f && f.style && f.style.fontSize || this.style && this.style.fontSize : f && F.prototype.getStyle.call(f, "font-size");
                a = /px/.test(a) ? u(a) : 12;
                f = 24 > a ? a + 3 : Math.round(1.2 * a);
                return {
                    h: f,
                    b: Math.round(.8 * f),
                    f: a
                }
            }
            ;
            t.prototype.rotCorr = function(a, f, e) {
                var t = a;
                f && e && (t = Math.max(t * Math.cos(f * b), 4));
                return {
                    x: -a / 3 * Math.sin(f * b),
                    y: t
                }
            }
            ;
            t.prototype.pathToSegments = function(a) {
                for (var e = [], t = [], h = {
                    A: 8,
                    C: 7,
                    H: 2,
                    L: 3,
                    M: 3,
                    Q: 5,
                    S: 5,
                    T: 3,
                    V: 2
                }, m = 0; m < a.length; m++)
                    f(t[0]) && z(a[m]) && t.length === h[t[0].toUpperCase()] && a.splice(m, 0, t[0].replace("M", "L").replace("m", "l")),
                    "string" === typeof a[m] && (t.length && e.push(t.slice(0)),
                    t.length = 0),
                    t.push(a[m]);
                e.push(t.slice(0));
                return e
            }
            ;
            t.prototype.label = function(a, f, e, t, h, m, q, u, r) {
                return new G(this,a,f,e,t,h,m,q,u,r)
            }
            ;
            t.prototype.alignElements = function() {
                this.alignedObjects.forEach(function(a) {
                    return a.align()
                })
            }
            ;
            return t
        }();
        I(E.prototype, {
            Element: F,
            SVG_NS: k,
            escapes: {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                "'": "&#39;",
                '"': "&quot;"
            },
            symbols: J,
            draw: v
        });
        A.registerRendererType("svg", E, !0);
        "";
        return E
    });
    P(c, "Core/Renderer/HTML/HTMLElement.js", [c["Core/Globals.js"], c["Core/Renderer/SVG/SVGElement.js"], c["Core/Utilities.js"]], function(c, x, E) {
        var n = this && this.__extends || function() {
            var b = function(d, g) {
                b = Object.setPrototypeOf || {
                    __proto__: []
                }instanceof Array && function(b, k) {
                    b.__proto__ = k
                }
                || function(b, k) {
                    for (var d in k)
                        k.hasOwnProperty(d) && (b[d] = k[d])
                }
                ;
                return b(d, g)
            };
            return function(d, g) {
                function v() {
                    this.constructor = d
                }
                b(d, g);
                d.prototype = null === g ? Object.create(g) : (v.prototype = g.prototype,
                new v)
            }
        }()
          , A = c.isFirefox
          , F = c.isMS
          , G = c.isWebKit
          , J = c.win
          , p = E.css
          , d = E.defined
          , l = E.extend
          , b = E.pick
          , g = E.pInt;
        return function(c) {
            function D() {
                return null !== c && c.apply(this, arguments) || this
            }
            n(D, c);
            D.compose = function(b) {
                b = b.prototype;
                var d = D.prototype;
                b.getSpanCorrection = d.getSpanCorrection;
                b.htmlCss = d.htmlCss;
                b.htmlGetBBox = d.htmlGetBBox;
                b.htmlUpdateTransform = d.htmlUpdateTransform;
                b.setSpanRotation = d.setSpanRotation
            }
            ;
            D.prototype.getSpanCorrection = function(b, d, k) {
                this.xCorr = -b * k;
                this.yCorr = -d
            }
            ;
            D.prototype.htmlCss = function(d) {
                var g = "SPAN" === this.element.tagName && d && "width"in d
                  , k = b(g && d.width, void 0);
                if (g) {
                    delete d.width;
                    this.textWidth = k;
                    var c = !0
                }
                d && "ellipsis" === d.textOverflow && (d.whiteSpace = "nowrap",
                d.overflow = "hidden");
                this.styles = l(this.styles, d);
                p(this.element, d);
                c && this.htmlUpdateTransform();
                return this
            }
            ;
            D.prototype.htmlGetBBox = function() {
                var b = this.element;
                return {
                    x: b.offsetLeft,
                    y: b.offsetTop,
                    width: b.offsetWidth,
                    height: b.offsetHeight
                }
            }
            ;
            D.prototype.htmlUpdateTransform = function() {
                if (this.added) {
                    var b = this.renderer
                      , v = this.element
                      , k = this.translateX || 0
                      , c = this.translateY || 0
                      , l = this.x || 0
                      , B = this.y || 0
                      , w = this.textAlign || "left"
                      , e = {
                        left: 0,
                        center: .5,
                        right: 1
                    }[w]
                      , r = this.styles;
                    r = r && r.whiteSpace;
                    p(v, {
                        marginLeft: k,
                        marginTop: c
                    });
                    !b.styledMode && this.shadows && this.shadows.forEach(function(a) {
                        p(a, {
                            marginLeft: k + 1,
                            marginTop: c + 1
                        })
                    });
                    this.inverted && [].forEach.call(v.childNodes, function(a) {
                        b.invertChild(a, v)
                    });
                    if ("SPAN" === v.tagName) {
                        var a = this.rotation
                          , q = this.textWidth && g(this.textWidth)
                          , I = [a, w, v.innerHTML, this.textWidth, this.textAlign].join()
                          , C = void 0;
                        (C = q !== this.oldTextWidth) && !(C = q > this.oldTextWidth) && ((C = this.textPxLength) || (p(v, {
                            width: "",
                            whiteSpace: r || "nowrap"
                        }),
                        C = v.offsetWidth),
                        C = C > q);
                        C && (/[ \-]/.test(v.textContent || v.innerText) || "ellipsis" === v.style.textOverflow) ? (p(v, {
                            width: q + "px",
                            display: "block",
                            whiteSpace: r || "normal"
                        }),
                        this.oldTextWidth = q,
                        this.hasBoxWidthChanged = !0) : this.hasBoxWidthChanged = !1;
                        I !== this.cTT && (C = b.fontMetrics(v.style.fontSize, v).b,
                        !d(a) || a === (this.oldRotation || 0) && w === this.oldAlign || this.setSpanRotation(a, e, C),
                        this.getSpanCorrection(!d(a) && this.textPxLength || v.offsetWidth, C, e, a, w));
                        p(v, {
                            left: l + (this.xCorr || 0) + "px",
                            top: B + (this.yCorr || 0) + "px"
                        });
                        this.cTT = I;
                        this.oldRotation = a;
                        this.oldAlign = w
                    }
                } else
                    this.alignOnAdd = !0
            }
            ;
            D.prototype.setSpanRotation = function(b, d, k) {
                var g = {}
                  , v = F && !/Edge/.test(J.navigator.userAgent) ? "-ms-transform" : G ? "-webkit-transform" : A ? "MozTransform" : J.opera ? "-o-transform" : void 0;
                v && (g[v] = g.transform = "rotate(" + b + "deg)",
                g[v + (A ? "Origin" : "-origin")] = g.transformOrigin = 100 * d + "% " + k + "px",
                p(this.element, g))
            }
            ;
            return D
        }(x)
    });
    P(c, "Core/Renderer/HTML/HTMLRenderer.js", [c["Core/Renderer/HTML/AST.js"], c["Core/Renderer/SVG/SVGElement.js"], c["Core/Renderer/SVG/SVGRenderer.js"], c["Core/Utilities.js"]], function(c, x, E, H) {
        var n = this && this.__extends || function() {
            var d = function(c, b) {
                d = Object.setPrototypeOf || {
                    __proto__: []
                }instanceof Array && function(b, d) {
                    b.__proto__ = d
                }
                || function(b, d) {
                    for (var g in d)
                        d.hasOwnProperty(g) && (b[g] = d[g])
                }
                ;
                return d(c, b)
            };
            return function(c, b) {
                function g() {
                    this.constructor = c
                }
                d(c, b);
                c.prototype = null === b ? Object.create(b) : (g.prototype = b.prototype,
                new g)
            }
        }()
          , F = H.attr
          , G = H.createElement
          , J = H.extend
          , p = H.pick;
        return function(d) {
            function l() {
                return null !== d && d.apply(this, arguments) || this
            }
            n(l, d);
            l.compose = function(b) {
                b.prototype.html = l.prototype.html
            }
            ;
            l.prototype.html = function(b, d, l) {
                var g = this.createElement("span")
                  , y = g.element
                  , v = g.renderer
                  , k = v.isSVG
                  , L = function(b, d) {
                    ["opacity", "visibility"].forEach(function(k) {
                        b[k + "Setter"] = function(e, r, a) {
                            var q = b.div ? b.div.style : d;
                            x.prototype[k + "Setter"].call(this, e, r, a);
                            q && (q[r] = e)
                        }
                    });
                    b.addedSetters = !0
                };
                g.textSetter = function(b) {
                    b !== this.textStr && (delete this.bBox,
                    delete this.oldTextWidth,
                    c.setElementHTML(this.element, p(b, "")),
                    this.textStr = b,
                    g.doTransform = !0)
                }
                ;
                k && L(g, g.element.style);
                g.xSetter = g.ySetter = g.alignSetter = g.rotationSetter = function(b, d) {
                    "align" === d ? g.alignValue = g.textAlign = b : g[d] = b;
                    g.doTransform = !0
                }
                ;
                g.afterSetters = function() {
                    this.doTransform && (this.htmlUpdateTransform(),
                    this.doTransform = !1)
                }
                ;
                g.attr({
                    text: b,
                    x: Math.round(d),
                    y: Math.round(l)
                }).css({
                    position: "absolute"
                });
                v.styledMode || g.css({
                    fontFamily: this.style.fontFamily,
                    fontSize: this.style.fontSize
                });
                y.style.whiteSpace = "nowrap";
                g.css = g.htmlCss;
                k && (g.add = function(b) {
                    var d = v.box.parentNode
                      , k = [];
                    if (this.parentGroup = b) {
                        var e = b.div;
                        if (!e) {
                            for (; b; )
                                k.push(b),
                                b = b.parentGroup;
                            k.reverse().forEach(function(b) {
                                function a(a, e) {
                                    b[e] = a;
                                    "translateX" === e ? C.left = a + "px" : C.top = a + "px";
                                    b.doTransform = !0
                                }
                                var q = F(b.element, "class")
                                  , r = b.styles || {};
                                e = b.div = b.div || G("div", q ? {
                                    className: q
                                } : void 0, {
                                    position: "absolute",
                                    left: (b.translateX || 0) + "px",
                                    top: (b.translateY || 0) + "px",
                                    display: b.display,
                                    opacity: b.opacity,
                                    cursor: r.cursor,
                                    pointerEvents: r.pointerEvents
                                }, e || d);
                                var C = e.style;
                                J(b, {
                                    classSetter: function(a) {
                                        return function(e) {
                                            this.element.setAttribute("class", e);
                                            a.className = e
                                        }
                                    }(e),
                                    on: function() {
                                        k[0].div && g.on.apply({
                                            element: k[0].div,
                                            onEvents: g.onEvents
                                        }, arguments);
                                        return b
                                    },
                                    translateXSetter: a,
                                    translateYSetter: a
                                });
                                b.addedSetters || L(b)
                            })
                        }
                    } else
                        e = d;
                    e.appendChild(y);
                    g.added = !0;
                    g.alignOnAdd && g.htmlUpdateTransform();
                    return g
                }
                );
                return g
            }
            ;
            return l
        }(E)
    });
    P(c, "Core/Foundation.js", [c["Core/Utilities.js"]], function(c) {
        var n = c.addEvent
          , E = c.isFunction
          , H = c.objectEach
          , A = c.removeEvent;
        return {
            registerEventOptions: function(c, x) {
                c.eventOptions = c.eventOptions || {};
                H(x.events, function(J, p) {
                    E(J) && c.eventOptions[p] !== J && (E(c.eventOptions[p]) && A(c, p, c.eventOptions[p]),
                    c.eventOptions[p] = J,
                    n(c, p, J))
                })
            }
        }
    });
    P(c, "Core/Axis/AxisDefaults.js", [c["Core/Color/Palette.js"]], function(c) {
        var n;
        (function(n) {
            n.defaultXAxisOptions = {
                alignTicks: !0,
                allowDecimals: void 0,
                panningEnabled: !0,
                zIndex: 2,
                zoomEnabled: !0,
                dateTimeLabelFormats: {
                    millisecond: {
                        main: "%H:%M:%S.%L",
                        range: !1
                    },
                    second: {
                        main: "%H:%M:%S",
                        range: !1
                    },
                    minute: {
                        main: "%H:%M",
                        range: !1
                    },
                    hour: {
                        main: "%H:%M",
                        range: !1
                    },
                    day: {
                        main: "%e. %b"
                    },
                    week: {
                        main: "%e. %b"
                    },
                    month: {
                        main: "%b '%y"
                    },
                    year: {
                        main: "%Y"
                    }
                },
                endOnTick: !1,
                gridLineDashStyle: "Solid",
                gridZIndex: 1,
                labels: {
                    autoRotation: void 0,
                    autoRotationLimit: 80,
                    distance: void 0,
                    enabled: !0,
                    indentation: 10,
                    overflow: "justify",
                    padding: 5,
                    reserveSpace: void 0,
                    rotation: void 0,
                    staggerLines: 0,
                    step: 0,
                    useHTML: !1,
                    x: 0,
                    zIndex: 7,
                    style: {
                        color: c.neutralColor60,
                        cursor: "default",
                        fontSize: "11px"
                    }
                },
                maxPadding: .01,
                minorGridLineDashStyle: "Solid",
                minorTickLength: 2,
                minorTickPosition: "outside",
                minPadding: .01,
                offset: void 0,
                opposite: !1,
                reversed: void 0,
                reversedStacks: !1,
                showEmpty: !0,
                showFirstLabel: !0,
                showLastLabel: !0,
                startOfWeek: 1,
                startOnTick: !1,
                tickLength: 10,
                tickPixelInterval: 100,
                tickmarkPlacement: "between",
                tickPosition: "outside",
                title: {
                    align: "middle",
                    rotation: 0,
                    useHTML: !1,
                    x: 0,
                    y: 0,
                    style: {
                        color: c.neutralColor60
                    }
                },
                type: "linear",
                uniqueNames: !0,
                visible: !0,
                minorGridLineColor: c.neutralColor5,
                minorGridLineWidth: 1,
                minorTickColor: c.neutralColor40,
                lineColor: c.highlightColor20,
                lineWidth: 1,
                gridLineColor: c.neutralColor10,
                gridLineWidth: void 0,
                tickColor: c.highlightColor20
            };
            n.defaultYAxisOptions = {
                reversedStacks: !0,
                endOnTick: !0,
                maxPadding: .05,
                minPadding: .05,
                tickPixelInterval: 72,
                showLastLabel: !0,
                labels: {
                    x: -8
                },
                startOnTick: !0,
                title: {
                    rotation: 270,
                    text: "Values"
                },
                stackLabels: {
                    animation: {},
                    allowOverlap: !1,
                    enabled: !1,
                    crop: !0,
                    overflow: "justify",
                    formatter: function() {
                        var c = this.axis.chart.numberFormatter;
                        return c(this.total, -1)
                    },
                    style: {
                        color: c.neutralColor100,
                        fontSize: "11px",
                        fontWeight: "bold",
                        textOutline: "1px contrast"
                    }
                },
                gridLineWidth: 1,
                lineWidth: 0
            };
            n.defaultLeftAxisOptions = {
                labels: {
                    x: -15
                },
                title: {
                    rotation: 270
                }
            };
            n.defaultRightAxisOptions = {
                labels: {
                    x: 15
                },
                title: {
                    rotation: 90
                }
            };
            n.defaultBottomAxisOptions = {
                labels: {
                    autoRotation: [-45],
                    x: 0
                },
                margin: 15,
                title: {
                    rotation: 0
                }
            };
            n.defaultTopAxisOptions = {
                labels: {
                    autoRotation: [-45],
                    x: 0
                },
                margin: 15,
                title: {
                    rotation: 0
                }
            }
        }
        )(n || (n = {}));
        return n
    });
    P(c, "Core/Axis/Tick.js", [c["Core/FormatUtilities.js"], c["Core/Globals.js"], c["Core/Utilities.js"]], function(c, x, E) {
        var n = x.deg2rad
          , A = E.clamp
          , F = E.correctFloat
          , G = E.defined
          , J = E.destroyObjectProperties
          , p = E.extend
          , d = E.fireEvent
          , l = E.isNumber
          , b = E.merge
          , g = E.objectEach
          , N = E.pick;
        x = function() {
            function D(b, g, k, c, l) {
                this.isNewLabel = this.isNew = !0;
                this.axis = b;
                this.pos = g;
                this.type = k || "";
                this.parameters = l || {};
                this.tickmarkOffset = this.parameters.tickmarkOffset;
                this.options = this.parameters.options;
                d(this, "init");
                k || c || this.addLabel()
            }
            D.prototype.addLabel = function() {
                var b = this
                  , g = b.axis
                  , k = g.options
                  , n = g.chart
                  , M = g.categories
                  , B = g.logarithmic
                  , w = g.names
                  , e = b.pos
                  , r = N(b.options && b.options.labels, k.labels)
                  , a = g.tickPositions
                  , q = e === a[0]
                  , I = e === a[a.length - 1]
                  , C = (!r.step || 1 === r.step) && 1 === g.tickInterval;
                a = a.info;
                var z = b.label, m;
                M = this.parameters.category || (M ? N(M[e], w[e], e) : e);
                B && l(M) && (M = F(B.lin2log(M)));
                if (g.dateTime && a) {
                    var f = n.time.resolveDTLFormat(k.dateTimeLabelFormats[!k.grid && a.higherRanks[e] || a.unitName]);
                    var K = f.main
                }
                b.isFirst = q;
                b.isLast = I;
                var h = {
                    axis: g,
                    chart: n,
                    dateTimeLabelFormat: K,
                    isFirst: q,
                    isLast: I,
                    pos: e,
                    tick: b,
                    tickPositionInfo: a,
                    value: M
                };
                d(this, "labelFormat", h);
                var u = function(a) {
                    return r.formatter ? r.formatter.call(a, a) : r.format ? (a.text = g.defaultLabelFormatter.call(a),
                    c.format(r.format, a, n)) : g.defaultLabelFormatter.call(a, a)
                };
                k = u.call(h, h);
                var O = f && f.list;
                b.shortenLabel = O ? function() {
                    for (m = 0; m < O.length; m++)
                        if (p(h, {
                            dateTimeLabelFormat: O[m]
                        }),
                        z.attr({
                            text: u.call(h, h)
                        }),
                        z.getBBox().width < g.getSlotWidth(b) - 2 * r.padding)
                            return;
                    z.attr({
                        text: ""
                    })
                }
                : void 0;
                C && g._addedPlotLB && b.moveLabel(k, r);
                G(z) || b.movedLabel ? z && z.textStr !== k && !C && (!z.textWidth || r.style.width || z.styles.width || z.css({
                    width: null
                }),
                z.attr({
                    text: k
                }),
                z.textPxLength = z.getBBox().width) : (b.label = z = b.createLabel({
                    x: 0,
                    y: 0
                }, k, r),
                b.rotation = 0)
            }
            ;
            D.prototype.createLabel = function(d, g, k) {
                var c = this.axis
                  , v = c.chart;
                if (d = G(g) && k.enabled ? v.renderer.text(g, d.x, d.y, k.useHTML).add(c.labelGroup) : null)
                    v.styledMode || d.css(b(k.style)),
                    d.textPxLength = d.getBBox().width;
                return d
            }
            ;
            D.prototype.destroy = function() {
                J(this, this.axis)
            }
            ;
            D.prototype.getPosition = function(b, g, k, c) {
                var v = this.axis
                  , l = v.chart
                  , w = c && l.oldChartHeight || l.chartHeight;
                b = {
                    x: b ? F(v.translate(g + k, null, null, c) + v.transB) : v.left + v.offset + (v.opposite ? (c && l.oldChartWidth || l.chartWidth) - v.right - v.left : 0),
                    y: b ? w - v.bottom + v.offset - (v.opposite ? v.height : 0) : F(w - v.translate(g + k, null, null, c) - v.transB)
                };
                b.y = A(b.y, -1E5, 1E5);
                d(this, "afterGetPosition", {
                    pos: b
                });
                return b
            }
            ;
            D.prototype.getLabelPosition = function(b, g, k, c, l, B, w, e) {
                var r = this.axis
                  , a = r.transA
                  , q = r.isLinked && r.linkedParent ? r.linkedParent.reversed : r.reversed
                  , I = r.staggerLines
                  , C = r.tickRotCorr || {
                    x: 0,
                    y: 0
                }
                  , z = c || r.reserveSpaceDefault ? 0 : -r.labelOffset * ("center" === r.labelAlign ? .5 : 1)
                  , m = {}
                  , f = l.y;
                G(f) || (f = 0 === r.side ? k.rotation ? -8 : -k.getBBox().height : 2 === r.side ? C.y + 8 : Math.cos(k.rotation * n) * (C.y - k.getBBox(!1, 0).height / 2));
                b = b + l.x + z + C.x - (B && c ? B * a * (q ? -1 : 1) : 0);
                g = g + f - (B && !c ? B * a * (q ? 1 : -1) : 0);
                I && (k = w / (e || 1) % I,
                r.opposite && (k = I - k - 1),
                g += r.labelOffset / I * k);
                m.x = b;
                m.y = Math.round(g);
                d(this, "afterGetLabelPosition", {
                    pos: m,
                    tickmarkOffset: B,
                    index: w
                });
                return m
            }
            ;
            D.prototype.getLabelSize = function() {
                return this.label ? this.label.getBBox()[this.axis.horiz ? "height" : "width"] : 0
            }
            ;
            D.prototype.getMarkPath = function(b, d, k, g, c, l) {
                return l.crispLine([["M", b, d], ["L", b + (c ? 0 : -k), d + (c ? k : 0)]], g)
            }
            ;
            D.prototype.handleOverflow = function(b) {
                var d = this.axis
                  , k = d.options.labels
                  , g = b.x
                  , c = d.chart.chartWidth
                  , l = d.chart.spacing
                  , w = N(d.labelLeft, Math.min(d.pos, l[3]));
                l = N(d.labelRight, Math.max(d.isRadial ? 0 : d.pos + d.len, c - l[1]));
                var e = this.label, r = this.rotation, a = {
                    left: 0,
                    center: .5,
                    right: 1
                }[d.labelAlign || e.attr("align")], q = e.getBBox().width, I = d.getSlotWidth(this), C = {}, z = I, m = 1, f;
                if (r || "justify" !== k.overflow)
                    0 > r && g - a * q < w ? f = Math.round(g / Math.cos(r * n) - w) : 0 < r && g + a * q > l && (f = Math.round((c - g) / Math.cos(r * n)));
                else if (c = g + (1 - a) * q,
                g - a * q < w ? z = b.x + z * (1 - a) - w : c > l && (z = l - b.x + z * a,
                m = -1),
                z = Math.min(I, z),
                z < I && "center" === d.labelAlign && (b.x += m * (I - z - a * (I - Math.min(q, z)))),
                q > z || d.autoRotation && (e.styles || {}).width)
                    f = z;
                f && (this.shortenLabel ? this.shortenLabel() : (C.width = Math.floor(f) + "px",
                (k.style || {}).textOverflow || (C.textOverflow = "ellipsis"),
                e.css(C)))
            }
            ;
            D.prototype.moveLabel = function(b, d) {
                var k = this
                  , c = k.label
                  , v = k.axis
                  , l = v.reversed
                  , w = !1;
                c && c.textStr === b ? (k.movedLabel = c,
                w = !0,
                delete k.label) : g(v.ticks, function(e) {
                    w || e.isNew || e === k || !e.label || e.label.textStr !== b || (k.movedLabel = e.label,
                    w = !0,
                    e.labelPos = k.movedLabel.xy,
                    delete e.label)
                });
                if (!w && (k.labelPos || c)) {
                    var e = k.labelPos || c.xy;
                    c = v.horiz ? l ? 0 : v.width + v.left : e.x;
                    v = v.horiz ? e.y : l ? v.width + v.left : 0;
                    k.movedLabel = k.createLabel({
                        x: c,
                        y: v
                    }, b, d);
                    k.movedLabel && k.movedLabel.attr({
                        opacity: 0
                    })
                }
            }
            ;
            D.prototype.render = function(b, g, k) {
                var c = this.axis
                  , v = c.horiz
                  , l = this.pos
                  , w = N(this.tickmarkOffset, c.tickmarkOffset);
                l = this.getPosition(v, l, w, g);
                w = l.x;
                var e = l.y;
                c = v && w === c.pos + c.len || !v && e === c.pos ? -1 : 1;
                v = N(k, this.label && this.label.newOpacity, 1);
                k = N(k, 1);
                this.isActive = !0;
                this.renderGridLine(g, k, c);
                this.renderMark(l, k, c);
                this.renderLabel(l, g, v, b);
                this.isNew = !1;
                d(this, "afterRender")
            }
            ;
            D.prototype.renderGridLine = function(b, d, k) {
                var g = this.axis
                  , c = g.options
                  , v = {}
                  , w = this.pos
                  , e = this.type
                  , r = N(this.tickmarkOffset, g.tickmarkOffset)
                  , a = g.chart.renderer
                  , q = this.gridLine
                  , I = c.gridLineWidth
                  , C = c.gridLineColor
                  , z = c.gridLineDashStyle;
                "minor" === this.type && (I = c.minorGridLineWidth,
                C = c.minorGridLineColor,
                z = c.minorGridLineDashStyle);
                q || (g.chart.styledMode || (v.stroke = C,
                v["stroke-width"] = I || 0,
                v.dashstyle = z),
                e || (v.zIndex = 1),
                b && (d = 0),
                this.gridLine = q = a.path().attr(v).addClass("highcharts-" + (e ? e + "-" : "") + "grid-line").add(g.gridGroup));
                if (q && (k = g.getPlotLinePath({
                    value: w + r,
                    lineWidth: q.strokeWidth() * k,
                    force: "pass",
                    old: b
                })))
                    q[b || this.isNew ? "attr" : "animate"]({
                        d: k,
                        opacity: d
                    })
            }
            ;
            D.prototype.renderMark = function(b, d, g) {
                var k = this.axis
                  , c = k.options
                  , v = k.chart.renderer
                  , w = this.type
                  , e = k.tickSize(w ? w + "Tick" : "tick")
                  , r = b.x;
                b = b.y;
                var a = N(c["minor" !== w ? "tickWidth" : "minorTickWidth"], !w && k.isXAxis ? 1 : 0);
                c = c["minor" !== w ? "tickColor" : "minorTickColor"];
                var q = this.mark
                  , I = !q;
                e && (k.opposite && (e[0] = -e[0]),
                q || (this.mark = q = v.path().addClass("highcharts-" + (w ? w + "-" : "") + "tick").add(k.axisGroup),
                k.chart.styledMode || q.attr({
                    stroke: c,
                    "stroke-width": a
                })),
                q[I ? "attr" : "animate"]({
                    d: this.getMarkPath(r, b, e[0], q.strokeWidth() * g, k.horiz, v),
                    opacity: d
                }))
            }
            ;
            D.prototype.renderLabel = function(b, d, g, c) {
                var k = this.axis
                  , v = k.horiz
                  , w = k.options
                  , e = this.label
                  , r = w.labels
                  , a = r.step;
                k = N(this.tickmarkOffset, k.tickmarkOffset);
                var q = b.x;
                b = b.y;
                var I = !0;
                e && l(q) && (e.xy = b = this.getLabelPosition(q, b, e, v, r, k, c, a),
                this.isFirst && !this.isLast && !w.showFirstLabel || this.isLast && !this.isFirst && !w.showLastLabel ? I = !1 : !v || r.step || r.rotation || d || 0 === g || this.handleOverflow(b),
                a && c % a && (I = !1),
                I && l(b.y) ? (b.opacity = g,
                e[this.isNewLabel ? "attr" : "animate"](b),
                this.isNewLabel = !1) : (e.attr("y", -9999),
                this.isNewLabel = !0))
            }
            ;
            D.prototype.replaceMovedLabel = function() {
                var b = this.label
                  , d = this.axis
                  , g = d.reversed;
                if (b && !this.isNew) {
                    var c = d.horiz ? g ? d.left : d.width + d.left : b.xy.x;
                    g = d.horiz ? b.xy.y : g ? d.width + d.top : d.top;
                    b.animate({
                        x: c,
                        y: g,
                        opacity: 0
                    }, void 0, b.destroy);
                    delete this.label
                }
                d.isDirty = !0;
                this.label = this.movedLabel;
                delete this.movedLabel
            }
            ;
            return D
        }();
        "";
        return x
    });
    P(c, "Core/Axis/Axis.js", [c["Core/Animation/AnimationUtilities.js"], c["Core/Color/Color.js"], c["Core/Color/Palette.js"], c["Core/DefaultOptions.js"], c["Core/Foundation.js"], c["Core/Globals.js"], c["Core/Utilities.js"], c["Core/Axis/AxisDefaults.js"], c["Core/Axis/Tick.js"]], function(c, x, E, H, A, F, G, J, p) {
        var d = c.animObject
          , l = A.registerEventOptions
          , b = F.deg2rad
          , g = H.defaultOptions
          , n = G.arrayMax
          , D = G.arrayMin
          , y = G.clamp
          , v = G.correctFloat
          , k = G.defined
          , L = G.destroyObjectProperties
          , M = G.erase
          , B = G.error
          , w = G.extend
          , e = G.fireEvent
          , r = G.getMagnitude
          , a = G.isArray
          , q = G.isNumber
          , I = G.isString
          , C = G.merge
          , z = G.normalizeTickInterval
          , m = G.objectEach
          , f = G.pick
          , K = G.relativeLength
          , h = G.removeEvent
          , u = G.splat
          , O = G.syncTimeout;
        c = function() {
            function c(a, f) {
                this.zoomEnabled = this.width = this.visible = this.userOptions = this.translationSlope = this.transB = this.transA = this.top = this.ticks = this.tickRotCorr = this.tickPositions = this.tickmarkOffset = this.tickInterval = this.tickAmount = this.side = this.series = this.right = this.positiveValuesOnly = this.pos = this.pointRangePadding = this.pointRange = this.plotLinesAndBandsGroups = this.plotLinesAndBands = this.paddedTicks = this.overlap = this.options = this.offset = this.names = this.minPixelPadding = this.minorTicks = this.minorTickInterval = this.min = this.maxLabelLength = this.max = this.len = this.left = this.labelFormatter = this.labelEdge = this.isLinked = this.height = this.hasVisibleSeries = this.hasNames = this.eventOptions = this.coll = this.closestPointRange = this.chart = this.categories = this.bottom = this.alternateBands = void 0;
                this.init(a, f)
            }
            c.prototype.init = function(a, h) {
                var t = h.isX;
                this.chart = a;
                this.horiz = a.inverted && !this.isZAxis ? !t : t;
                this.isXAxis = t;
                this.coll = this.coll || (t ? "xAxis" : "yAxis");
                e(this, "init", {
                    userOptions: h
                });
                this.opposite = f(h.opposite, this.opposite);
                this.side = f(h.side, this.side, this.horiz ? this.opposite ? 0 : 2 : this.opposite ? 1 : 3);
                this.setOptions(h);
                var b = this.options
                  , m = b.labels
                  , d = b.type;
                this.userOptions = h;
                this.minPixelPadding = 0;
                this.reversed = f(b.reversed, this.reversed);
                this.visible = b.visible;
                this.zoomEnabled = b.zoomEnabled;
                this.hasNames = "category" === d || !0 === b.categories;
                this.categories = b.categories || this.hasNames;
                this.names || (this.names = [],
                this.names.keys = {});
                this.plotLinesAndBandsGroups = {};
                this.positiveValuesOnly = !!this.logarithmic;
                this.isLinked = k(b.linkedTo);
                this.ticks = {};
                this.labelEdge = [];
                this.minorTicks = {};
                this.plotLinesAndBands = [];
                this.alternateBands = {};
                this.len = 0;
                this.minRange = this.userMinRange = b.minRange || b.maxZoom;
                this.range = b.range;
                this.offset = b.offset || 0;
                this.min = this.max = null;
                h = f(b.crosshair, u(a.options.tooltip.crosshairs)[t ? 0 : 1]);
                this.crosshair = !0 === h ? {} : h;
                -1 === a.axes.indexOf(this) && (t ? a.axes.splice(a.xAxis.length, 0, this) : a.axes.push(this),
                a[this.coll].push(this));
                this.series = this.series || [];
                a.inverted && !this.isZAxis && t && "undefined" === typeof this.reversed && (this.reversed = !0);
                this.labelRotation = q(m.rotation) ? m.rotation : void 0;
                l(this, b);
                e(this, "afterInit")
            }
            ;
            c.prototype.setOptions = function(a) {
                this.options = C(J.defaultXAxisOptions, "yAxis" === this.coll && J.defaultYAxisOptions, [J.defaultTopAxisOptions, J.defaultRightAxisOptions, J.defaultBottomAxisOptions, J.defaultLeftAxisOptions][this.side], C(g[this.coll], a));
                e(this, "afterSetOptions", {
                    userOptions: a
                })
            }
            ;
            c.prototype.defaultLabelFormatter = function(a) {
                var f = this.axis;
                a = this.chart.numberFormatter;
                var e = q(this.value) ? this.value : NaN
                  , t = f.chart.time
                  , h = this.dateTimeLabelFormat
                  , b = g.lang
                  , m = b.numericSymbols;
                b = b.numericSymbolMagnitude || 1E3;
                var u = f.logarithmic ? Math.abs(e) : f.tickInterval
                  , d = m && m.length;
                if (f.categories)
                    var r = "" + this.value;
                else if (h)
                    r = t.dateFormat(h, e);
                else if (d && 1E3 <= u)
                    for (; d-- && "undefined" === typeof r; )
                        f = Math.pow(b, d + 1),
                        u >= f && 0 === 10 * e % f && null !== m[d] && 0 !== e && (r = a(e / f, -1) + m[d]);
                "undefined" === typeof r && (r = 1E4 <= Math.abs(e) ? a(e, -1) : a(e, -1, void 0, ""));
                return r
            }
            ;
            c.prototype.getSeriesExtremes = function() {
                var a = this, h = a.chart, b;
                e(this, "getSeriesExtremes", null, function() {
                    a.hasVisibleSeries = !1;
                    a.dataMin = a.dataMax = a.threshold = null;
                    a.softThreshold = !a.isXAxis;
                    a.stacking && a.stacking.buildStacks();
                    a.series.forEach(function(e) {
                        if (e.visible || !h.options.chart.ignoreHiddenSeries) {
                            var t = e.options
                              , m = t.threshold;
                            a.hasVisibleSeries = !0;
                            a.positiveValuesOnly && 0 >= m && (m = null);
                            if (a.isXAxis) {
                                if (t = e.xData,
                                t.length) {
                                    t = a.logarithmic ? t.filter(a.validatePositiveValue) : t;
                                    b = e.getXExtremes(t);
                                    var d = b.min;
                                    var u = b.max;
                                    q(d) || d instanceof Date || (t = t.filter(q),
                                    b = e.getXExtremes(t),
                                    d = b.min,
                                    u = b.max);
                                    t.length && (a.dataMin = Math.min(f(a.dataMin, d), d),
                                    a.dataMax = Math.max(f(a.dataMax, u), u))
                                }
                            } else if (e = e.applyExtremes(),
                            q(e.dataMin) && (d = e.dataMin,
                            a.dataMin = Math.min(f(a.dataMin, d), d)),
                            q(e.dataMax) && (u = e.dataMax,
                            a.dataMax = Math.max(f(a.dataMax, u), u)),
                            k(m) && (a.threshold = m),
                            !t.softThreshold || a.positiveValuesOnly)
                                a.softThreshold = !1
                        }
                    })
                });
                e(this, "afterGetSeriesExtremes")
            }
            ;
            c.prototype.translate = function(a, f, e, h, b, m) {
                var t = this.linkedParent || this
                  , d = h && t.old ? t.old.min : t.min
                  , u = t.minPixelPadding;
                b = (t.isOrdinal || t.brokenAxis && t.brokenAxis.hasBreaks || t.logarithmic && b) && t.lin2val;
                var r = 1
                  , g = 0;
                h = h && t.old ? t.old.transA : t.transA;
                h || (h = t.transA);
                e && (r *= -1,
                g = t.len);
                t.reversed && (r *= -1,
                g -= r * (t.sector || t.len));
                f ? (a = (a * r + g - u) / h + d,
                b && (a = t.lin2val(a))) : (b && (a = t.val2lin(a)),
                a = q(d) ? r * (a - d) * h + g + r * u + (q(m) ? h * m : 0) : void 0);
                return a
            }
            ;
            c.prototype.toPixels = function(a, f) {
                return this.translate(a, !1, !this.horiz, null, !0) + (f ? 0 : this.pos)
            }
            ;
            c.prototype.toValue = function(a, f) {
                return this.translate(a - (f ? 0 : this.pos), !0, !this.horiz, null, !0)
            }
            ;
            c.prototype.getPlotLinePath = function(a) {
                function h(a, f, e) {
                    if ("pass" !== C && a < f || a > e)
                        C ? a = y(a, f, e) : l = !0;
                    return a
                }
                var t = this, b = t.chart, m = t.left, d = t.top, u = a.old, r = a.value, g = a.lineWidth, c = u && b.oldChartHeight || b.chartHeight, k = u && b.oldChartWidth || b.chartWidth, I = t.transB, z = a.translatedValue, C = a.force, w, K, v, O, l;
                a = {
                    value: r,
                    lineWidth: g,
                    old: u,
                    force: C,
                    acrossPanes: a.acrossPanes,
                    translatedValue: z
                };
                e(this, "getPlotLinePath", a, function(a) {
                    z = f(z, t.translate(r, null, null, u));
                    z = y(z, -1E5, 1E5);
                    w = v = Math.round(z + I);
                    K = O = Math.round(c - z - I);
                    q(z) ? t.horiz ? (K = d,
                    O = c - t.bottom,
                    w = v = h(w, m, m + t.width)) : (w = m,
                    v = k - t.right,
                    K = O = h(K, d, d + t.height)) : (l = !0,
                    C = !1);
                    a.path = l && !C ? null : b.renderer.crispLine([["M", w, K], ["L", v, O]], g || 1)
                });
                return a.path
            }
            ;
            c.prototype.getLinearTickPositions = function(a, f, e) {
                var h = v(Math.floor(f / a) * a);
                e = v(Math.ceil(e / a) * a);
                var t = [], b;
                v(h + a) === h && (b = 20);
                if (this.single)
                    return [f];
                for (f = h; f <= e; ) {
                    t.push(f);
                    f = v(f + a, b);
                    if (f === m)
                        break;
                    var m = f
                }
                return t
            }
            ;
            c.prototype.getMinorTickInterval = function() {
                var a = this.options;
                return !0 === a.minorTicks ? f(a.minorTickInterval, "auto") : !1 === a.minorTicks ? null : a.minorTickInterval
            }
            ;
            c.prototype.getMinorTickPositions = function() {
                var a = this.options
                  , f = this.tickPositions
                  , e = this.minorTickInterval
                  , h = this.pointRangePadding || 0
                  , b = this.min - h;
                h = this.max + h;
                var m = h - b
                  , q = [];
                if (m && m / e < this.len / 3) {
                    var d = this.logarithmic;
                    if (d)
                        this.paddedTicks.forEach(function(a, f, h) {
                            f && q.push.apply(q, d.getLogTickPositions(e, h[f - 1], h[f], !0))
                        });
                    else if (this.dateTime && "auto" === this.getMinorTickInterval())
                        q = q.concat(this.getTimeTicks(this.dateTime.normalizeTimeTickInterval(e), b, h, a.startOfWeek));
                    else
                        for (a = b + (f[0] - b) % e; a <= h && a !== q[0]; a += e)
                            q.push(a)
                }
                0 !== q.length && this.trimTicks(q);
                return q
            }
            ;
            c.prototype.adjustForMinRange = function() {
                var a = this.options, e = this.logarithmic, h = this.min, b = this.max, m = 0, q, d, u, r;
                this.isXAxis && "undefined" === typeof this.minRange && !e && (k(a.min) || k(a.max) ? this.minRange = null : (this.series.forEach(function(a) {
                    u = a.xData;
                    r = a.xIncrement ? 1 : u.length - 1;
                    if (1 < u.length)
                        for (q = r; 0 < q; q--)
                            if (d = u[q] - u[q - 1],
                            !m || d < m)
                                m = d
                }),
                this.minRange = Math.min(5 * m, this.dataMax - this.dataMin)));
                if (b - h < this.minRange) {
                    var g = this.dataMax - this.dataMin >= this.minRange;
                    var c = this.minRange;
                    var I = (c - b + h) / 2;
                    I = [h - I, f(a.min, h - I)];
                    g && (I[2] = this.logarithmic ? this.logarithmic.log2lin(this.dataMin) : this.dataMin);
                    h = n(I);
                    b = [h + c, f(a.max, h + c)];
                    g && (b[2] = e ? e.log2lin(this.dataMax) : this.dataMax);
                    b = D(b);
                    b - h < c && (I[0] = b - c,
                    I[1] = f(a.min, b - c),
                    h = n(I))
                }
                this.min = h;
                this.max = b
            }
            ;
            c.prototype.getClosest = function() {
                var a;
                this.categories ? a = 1 : this.series.forEach(function(f) {
                    var e = f.closestPointRange
                      , h = f.visible || !f.chart.options.chart.ignoreHiddenSeries;
                    !f.noSharedTooltip && k(e) && h && (a = k(a) ? Math.min(a, e) : e)
                });
                return a
            }
            ;
            c.prototype.nameToX = function(e) {
                var h = a(this.categories)
                  , b = h ? this.categories : this.names
                  , m = e.options.x;
                e.series.requireSorting = !1;
                k(m) || (m = this.options.uniqueNames ? h ? b.indexOf(e.name) : f(b.keys[e.name], -1) : e.series.autoIncrement());
                if (-1 === m) {
                    if (!h)
                        var t = b.length
                } else
                    t = m;
                "undefined" !== typeof t && (this.names[t] = e.name,
                this.names.keys[e.name] = t);
                return t
            }
            ;
            c.prototype.updateNames = function() {
                var a = this
                  , f = this.names;
                0 < f.length && (Object.keys(f.keys).forEach(function(a) {
                    delete f.keys[a]
                }),
                f.length = 0,
                this.minRange = this.userMinRange,
                (this.series || []).forEach(function(f) {
                    f.xIncrement = null;
                    if (!f.points || f.isDirtyData)
                        a.max = Math.max(a.max, f.xData.length - 1),
                        f.processData(),
                        f.generatePoints();
                    f.data.forEach(function(e, h) {
                        if (e && e.options && "undefined" !== typeof e.name) {
                            var b = a.nameToX(e);
                            "undefined" !== typeof b && b !== e.x && (e.x = b,
                            f.xData[h] = b)
                        }
                    })
                }))
            }
            ;
            c.prototype.setAxisTranslation = function() {
                var a = this
                  , h = a.max - a.min
                  , b = a.linkedParent
                  , m = !!a.categories
                  , q = a.isXAxis
                  , d = a.axisPointRange || 0
                  , u = 0
                  , r = 0
                  , g = a.transA;
                if (q || m || d) {
                    var c = a.getClosest();
                    b ? (u = b.minPointOffset,
                    r = b.pointRangePadding) : a.series.forEach(function(e) {
                        var h = m ? 1 : q ? f(e.options.pointRange, c, 0) : a.axisPointRange || 0
                          , b = e.options.pointPlacement;
                        d = Math.max(d, h);
                        if (!a.single || m)
                            e = e.is("xrange") ? !q : q,
                            u = Math.max(u, e && I(b) ? 0 : h / 2),
                            r = Math.max(r, e && "on" === b ? 0 : h)
                    });
                    b = a.ordinal && a.ordinal.slope && c ? a.ordinal.slope / c : 1;
                    a.minPointOffset = u *= b;
                    a.pointRangePadding = r *= b;
                    a.pointRange = Math.min(d, a.single && m ? 1 : h);
                    q && (a.closestPointRange = c)
                }
                a.translationSlope = a.transA = g = a.staticScale || a.len / (h + r || 1);
                a.transB = a.horiz ? a.left : a.bottom;
                a.minPixelPadding = g * u;
                e(this, "afterSetAxisTranslation")
            }
            ;
            c.prototype.minFromRange = function() {
                return this.max - this.range
            }
            ;
            c.prototype.setTickInterval = function(a) {
                var h = this
                  , b = h.chart
                  , m = h.logarithmic
                  , t = h.options
                  , d = h.isXAxis
                  , u = h.isLinked
                  , g = t.tickPixelInterval
                  , c = h.categories
                  , I = h.softThreshold
                  , C = t.maxPadding
                  , w = t.minPadding
                  , K = t.tickInterval
                  , O = q(h.threshold) ? h.threshold : null;
                h.dateTime || c || u || this.getTickAmount();
                var l = f(h.userMin, t.min);
                var p = f(h.userMax, t.max);
                if (u) {
                    h.linkedParent = b[h.coll][t.linkedTo];
                    var n = h.linkedParent.getExtremes();
                    h.min = f(n.min, n.dataMin);
                    h.max = f(n.max, n.dataMax);
                    t.type !== h.linkedParent.options.type && B(11, 1, b)
                } else {
                    if (I && k(O))
                        if (h.dataMin >= O)
                            n = O,
                            w = 0;
                        else if (h.dataMax <= O) {
                            var y = O;
                            C = 0
                        }
                    h.min = f(l, n, h.dataMin);
                    h.max = f(p, y, h.dataMax)
                }
                m && (h.positiveValuesOnly && !a && 0 >= Math.min(h.min, f(h.dataMin, h.min)) && B(10, 1, b),
                h.min = v(m.log2lin(h.min), 16),
                h.max = v(m.log2lin(h.max), 16));
                h.range && k(h.max) && (h.userMin = h.min = l = Math.max(h.dataMin, h.minFromRange()),
                h.userMax = p = h.max,
                h.range = null);
                e(h, "foundExtremes");
                h.beforePadding && h.beforePadding();
                h.adjustForMinRange();
                !(c || h.axisPointRange || h.stacking && h.stacking.usePercentage || u) && k(h.min) && k(h.max) && (b = h.max - h.min) && (!k(l) && w && (h.min -= b * w),
                !k(p) && C && (h.max += b * C));
                q(h.userMin) || (q(t.softMin) && t.softMin < h.min && (h.min = l = t.softMin),
                q(t.floor) && (h.min = Math.max(h.min, t.floor)));
                q(h.userMax) || (q(t.softMax) && t.softMax > h.max && (h.max = p = t.softMax),
                q(t.ceiling) && (h.max = Math.min(h.max, t.ceiling)));
                I && k(h.dataMin) && (O = O || 0,
                !k(l) && h.min < O && h.dataMin >= O ? h.min = h.options.minRange ? Math.min(O, h.max - h.minRange) : O : !k(p) && h.max > O && h.dataMax <= O && (h.max = h.options.minRange ? Math.max(O, h.min + h.minRange) : O));
                q(h.min) && q(h.max) && !this.chart.polar && h.min > h.max && (k(h.options.min) ? h.max = h.min : k(h.options.max) && (h.min = h.max));
                h.tickInterval = h.min === h.max || "undefined" === typeof h.min || "undefined" === typeof h.max ? 1 : u && h.linkedParent && !K && g === h.linkedParent.options.tickPixelInterval ? K = h.linkedParent.tickInterval : f(K, this.tickAmount ? (h.max - h.min) / Math.max(this.tickAmount - 1, 1) : void 0, c ? 1 : (h.max - h.min) * g / Math.max(h.len, g));
                d && !a && h.series.forEach(function(a) {
                    a.processData(h.min !== (h.old && h.old.min) || h.max !== (h.old && h.old.max))
                });
                h.setAxisTranslation();
                e(this, "initialAxisTranslation");
                h.pointRange && !K && (h.tickInterval = Math.max(h.pointRange, h.tickInterval));
                a = f(t.minTickInterval, h.dateTime && !h.series.some(function(a) {
                    return a.noSharedTooltip
                }) ? h.closestPointRange : 0);
                !K && h.tickInterval < a && (h.tickInterval = a);
                h.dateTime || h.logarithmic || K || (h.tickInterval = z(h.tickInterval, void 0, r(h.tickInterval), f(t.allowDecimals, .5 > h.tickInterval || void 0 !== this.tickAmount), !!this.tickAmount));
                this.tickAmount || (h.tickInterval = h.unsquish());
                this.setTickPositions()
            }
            ;
            c.prototype.setTickPositions = function() {
                var a = this.options
                  , f = a.tickPositions
                  , h = this.getMinorTickInterval()
                  , b = this.hasVerticalPanning()
                  , m = "colorAxis" === this.coll
                  , q = (m || !b) && a.startOnTick;
                b = (m || !b) && a.endOnTick;
                m = a.tickPositioner;
                this.tickmarkOffset = this.categories && "between" === a.tickmarkPlacement && 1 === this.tickInterval ? .5 : 0;
                this.minorTickInterval = "auto" === h && this.tickInterval ? this.tickInterval / 5 : h;
                this.single = this.min === this.max && k(this.min) && !this.tickAmount && (parseInt(this.min, 10) === this.min || !1 !== a.allowDecimals);
                this.tickPositions = h = f && f.slice();
                !h && (this.ordinal && this.ordinal.positions || !((this.max - this.min) / this.tickInterval > Math.max(2 * this.len, 200)) ? h = this.dateTime ? this.getTimeTicks(this.dateTime.normalizeTimeTickInterval(this.tickInterval, a.units), this.min, this.max, a.startOfWeek, this.ordinal && this.ordinal.positions, this.closestPointRange, !0) : this.logarithmic ? this.logarithmic.getLogTickPositions(this.tickInterval, this.min, this.max) : this.getLinearTickPositions(this.tickInterval, this.min, this.max) : (h = [this.min, this.max],
                B(19, !1, this.chart)),
                h.length > this.len && (h = [h[0], h.pop()],
                h[0] === h[1] && (h.length = 1)),
                this.tickPositions = h,
                m && (m = m.apply(this, [this.min, this.max]))) && (this.tickPositions = h = m);
                this.paddedTicks = h.slice(0);
                this.trimTicks(h, q, b);
                this.isLinked || (this.single && 2 > h.length && !this.categories && !this.series.some(function(a) {
                    return a.is("heatmap") && "between" === a.options.pointPlacement
                }) && (this.min -= .5,
                this.max += .5),
                f || m || this.adjustTickAmount());
                e(this, "afterSetTickPositions")
            }
            ;
            c.prototype.trimTicks = function(a, f, h) {
                var b = a[0]
                  , m = a[a.length - 1]
                  , q = !this.isOrdinal && this.minPointOffset || 0;
                e(this, "trimTicks");
                if (!this.isLinked) {
                    if (f && -Infinity !== b)
                        this.min = b;
                    else
                        for (; this.min - q > a[0]; )
                            a.shift();
                    if (h)
                        this.max = m;
                    else
                        for (; this.max + q < a[a.length - 1]; )
                            a.pop();
                    0 === a.length && k(b) && !this.options.tickPositions && a.push((m + b) / 2)
                }
            }
            ;
            c.prototype.alignToOthers = function() {
                var a = {}, f = this.options, h;
                !1 !== this.chart.options.chart.alignTicks && f.alignTicks && !1 !== f.startOnTick && !1 !== f.endOnTick && !this.logarithmic && this.chart[this.coll].forEach(function(f) {
                    var e = f.options;
                    e = [f.horiz ? e.left : e.top, e.width, e.height, e.pane].join();
                    f.series.length && (a[e] ? h = !0 : a[e] = 1)
                });
                return h
            }
            ;
            c.prototype.getTickAmount = function() {
                var a = this.options
                  , f = a.tickPixelInterval
                  , h = a.tickAmount;
                !k(a.tickInterval) && !h && this.len < f && !this.isRadial && !this.logarithmic && a.startOnTick && a.endOnTick && (h = 2);
                !h && this.alignToOthers() && (h = Math.ceil(this.len / f) + 1);
                4 > h && (this.finalTickAmt = h,
                h = 5);
                this.tickAmount = h
            }
            ;
            c.prototype.adjustTickAmount = function() {
                var a = this.options
                  , h = this.tickInterval
                  , e = this.tickPositions
                  , b = this.tickAmount
                  , m = this.finalTickAmt
                  , d = e && e.length
                  , u = f(this.threshold, this.softThreshold ? 0 : null);
                if (this.hasData() && q(this.min) && q(this.max)) {
                    if (d < b) {
                        for (; e.length < b; )
                            e.length % 2 || this.min === u ? e.push(v(e[e.length - 1] + h)) : e.unshift(v(e[0] - h));
                        this.transA *= (d - 1) / (b - 1);
                        this.min = a.startOnTick ? e[0] : Math.min(this.min, e[0]);
                        this.max = a.endOnTick ? e[e.length - 1] : Math.max(this.max, e[e.length - 1])
                    } else
                        d > b && (this.tickInterval *= 2,
                        this.setTickPositions());
                    if (k(m)) {
                        for (h = a = e.length; h--; )
                            (3 === m && 1 === h % 2 || 2 >= m && 0 < h && h < a - 1) && e.splice(h, 1);
                        this.finalTickAmt = void 0
                    }
                }
            }
            ;
            c.prototype.setScale = function() {
                var a = !1
                  , f = !1;
                this.series.forEach(function(h) {
                    a = a || h.isDirtyData || h.isDirty;
                    f = f || h.xAxis && h.xAxis.isDirty || !1
                });
                this.setAxisSize();
                var h = this.len !== (this.old && this.old.len);
                h || a || f || this.isLinked || this.forceRedraw || this.userMin !== (this.old && this.old.userMin) || this.userMax !== (this.old && this.old.userMax) || this.alignToOthers() ? (this.stacking && this.stacking.resetStacks(),
                this.forceRedraw = !1,
                this.getSeriesExtremes(),
                this.setTickInterval(),
                this.isDirty || (this.isDirty = h || this.min !== (this.old && this.old.min) || this.max !== (this.old && this.old.max))) : this.stacking && this.stacking.cleanStacks();
                a && this.panningState && (this.panningState.isDirty = !0);
                e(this, "afterSetScale")
            }
            ;
            c.prototype.setExtremes = function(a, h, b, m, q) {
                var t = this
                  , d = t.chart;
                b = f(b, !0);
                t.series.forEach(function(a) {
                    delete a.kdTree
                });
                q = w(q, {
                    min: a,
                    max: h
                });
                e(t, "setExtremes", q, function() {
                    t.userMin = a;
                    t.userMax = h;
                    t.eventArgs = q;
                    b && d.redraw(m)
                })
            }
            ;
            c.prototype.zoom = function(a, h) {
                var b = this
                  , m = this.dataMin
                  , q = this.dataMax
                  , t = this.options
                  , d = Math.min(m, f(t.min, m))
                  , u = Math.max(q, f(t.max, q));
                a = {
                    newMin: a,
                    newMax: h
                };
                e(this, "zoom", a, function(a) {
                    var f = a.newMin
                      , h = a.newMax;
                    if (f !== b.min || h !== b.max)
                        b.allowZoomOutside || (k(m) && (f < d && (f = d),
                        f > u && (f = u)),
                        k(q) && (h < d && (h = d),
                        h > u && (h = u))),
                        b.displayBtn = "undefined" !== typeof f || "undefined" !== typeof h,
                        b.setExtremes(f, h, !1, void 0, {
                            trigger: "zoom"
                        });
                    a.zoomed = !0
                });
                return a.zoomed
            }
            ;
            c.prototype.setAxisSize = function() {
                var a = this.chart
                  , h = this.options
                  , e = h.offsets || [0, 0, 0, 0]
                  , b = this.horiz
                  , m = this.width = Math.round(K(f(h.width, a.plotWidth - e[3] + e[1]), a.plotWidth))
                  , q = this.height = Math.round(K(f(h.height, a.plotHeight - e[0] + e[2]), a.plotHeight))
                  , d = this.top = Math.round(K(f(h.top, a.plotTop + e[0]), a.plotHeight, a.plotTop));
                h = this.left = Math.round(K(f(h.left, a.plotLeft + e[3]), a.plotWidth, a.plotLeft));
                this.bottom = a.chartHeight - q - d;
                this.right = a.chartWidth - m - h;
                this.len = Math.max(b ? m : q, 0);
                this.pos = b ? h : d
            }
            ;
            c.prototype.getExtremes = function() {
                var a = this.logarithmic;
                return {
                    min: a ? v(a.lin2log(this.min)) : this.min,
                    max: a ? v(a.lin2log(this.max)) : this.max,
                    dataMin: this.dataMin,
                    dataMax: this.dataMax,
                    userMin: this.userMin,
                    userMax: this.userMax
                }
            }
            ;
            c.prototype.getThreshold = function(a) {
                var f = this.logarithmic
                  , h = f ? f.lin2log(this.min) : this.min;
                f = f ? f.lin2log(this.max) : this.max;
                null === a || -Infinity === a ? a = h : Infinity === a ? a = f : h > a ? a = h : f < a && (a = f);
                return this.translate(a, 0, 1, 0, 1)
            }
            ;
            c.prototype.autoLabelAlign = function(a) {
                var h = (f(a, 0) - 90 * this.side + 720) % 360;
                a = {
                    align: "center"
                };
                e(this, "autoLabelAlign", a, function(a) {
                    15 < h && 165 > h ? a.align = "right" : 195 < h && 345 > h && (a.align = "left")
                });
                return a.align
            }
            ;
            c.prototype.tickSize = function(a) {
                var h = this.options
                  , b = f(h["tick" === a ? "tickWidth" : "minorTickWidth"], "tick" === a && this.isXAxis && !this.categories ? 1 : 0)
                  , m = h["tick" === a ? "tickLength" : "minorTickLength"];
                if (b && m) {
                    "inside" === h[a + "Position"] && (m = -m);
                    var q = [m, b]
                }
                a = {
                    tickSize: q
                };
                e(this, "afterTickSize", a);
                return a.tickSize
            }
            ;
            c.prototype.labelMetrics = function() {
                var a = this.tickPositions && this.tickPositions[0] || 0;
                return this.chart.renderer.fontMetrics(this.options.labels.style.fontSize, this.ticks[a] && this.ticks[a].label)
            }
            ;
            c.prototype.unsquish = function() {
                var a = this.options.labels, h = this.horiz, e = this.tickInterval, m = this.len / (((this.categories ? 1 : 0) + this.max - this.min) / e), d = a.rotation, u = this.labelMetrics(), r = Math.max(this.max - this.min, 0), g = function(a) {
                    var f = a / (m || 1);
                    f = 1 < f ? Math.ceil(f) : 1;
                    f * e > r && Infinity !== a && Infinity !== m && r && (f = Math.ceil(r / e));
                    return v(f * e)
                }, c = e, k, I, z = Number.MAX_VALUE;
                if (h) {
                    if (!a.staggerLines && !a.step)
                        if (q(d))
                            var C = [d];
                        else
                            m < a.autoRotationLimit && (C = a.autoRotation);
                    C && C.forEach(function(a) {
                        if (a === d || a && -90 <= a && 90 >= a) {
                            I = g(Math.abs(u.h / Math.sin(b * a)));
                            var f = I + Math.abs(a / 360);
                            f < z && (z = f,
                            k = a,
                            c = I)
                        }
                    })
                } else
                    a.step || (c = g(u.h));
                this.autoRotation = C;
                this.labelRotation = f(k, q(d) ? d : 0);
                return c
            }
            ;
            c.prototype.getSlotWidth = function(a) {
                var f = this.chart
                  , h = this.horiz
                  , e = this.options.labels
                  , b = Math.max(this.tickPositions.length - (this.categories ? 0 : 1), 1)
                  , m = f.margin[3];
                if (a && q(a.slotWidth))
                    return a.slotWidth;
                if (h && 2 > e.step)
                    return e.rotation ? 0 : (this.staggerLines || 1) * this.len / b;
                if (!h) {
                    a = e.style.width;
                    if (void 0 !== a)
                        return parseInt(String(a), 10);
                    if (m)
                        return m - f.spacing[3]
                }
                return .33 * f.chartWidth
            }
            ;
            c.prototype.renderUnsquish = function() {
                var a = this.chart
                  , f = a.renderer
                  , h = this.tickPositions
                  , e = this.ticks
                  , b = this.options.labels
                  , m = b.style
                  , q = this.horiz
                  , d = this.getSlotWidth()
                  , u = Math.max(1, Math.round(d - 2 * b.padding))
                  , r = {}
                  , g = this.labelMetrics()
                  , c = m.textOverflow
                  , k = 0;
                I(b.rotation) || (r.rotation = b.rotation || 0);
                h.forEach(function(a) {
                    a = e[a];
                    a.movedLabel && a.replaceMovedLabel();
                    a && a.label && a.label.textPxLength > k && (k = a.label.textPxLength)
                });
                this.maxLabelLength = k;
                if (this.autoRotation)
                    k > u && k > g.h ? r.rotation = this.labelRotation : this.labelRotation = 0;
                else if (d) {
                    var z = u;
                    if (!c) {
                        var C = "clip";
                        for (u = h.length; !q && u--; ) {
                            var K = h[u];
                            if (K = e[K].label)
                                K.styles && "ellipsis" === K.styles.textOverflow ? K.css({
                                    textOverflow: "clip"
                                }) : K.textPxLength > d && K.css({
                                    width: d + "px"
                                }),
                                K.getBBox().height > this.len / h.length - (g.h - g.f) && (K.specificTextOverflow = "ellipsis")
                        }
                    }
                }
                r.rotation && (z = k > .5 * a.chartHeight ? .33 * a.chartHeight : k,
                c || (C = "ellipsis"));
                if (this.labelAlign = b.align || this.autoLabelAlign(this.labelRotation))
                    r.align = this.labelAlign;
                h.forEach(function(a) {
                    var f = (a = e[a]) && a.label
                      , h = m.width
                      , b = {};
                    f && (f.attr(r),
                    a.shortenLabel ? a.shortenLabel() : z && !h && "nowrap" !== m.whiteSpace && (z < f.textPxLength || "SPAN" === f.element.tagName) ? (b.width = z + "px",
                    c || (b.textOverflow = f.specificTextOverflow || C),
                    f.css(b)) : f.styles && f.styles.width && !b.width && !h && f.css({
                        width: null
                    }),
                    delete f.specificTextOverflow,
                    a.rotation = r.rotation)
                }, this);
                this.tickRotCorr = f.rotCorr(g.b, this.labelRotation || 0, 0 !== this.side)
            }
            ;
            c.prototype.hasData = function() {
                return this.series.some(function(a) {
                    return a.hasData()
                }) || this.options.showEmpty && k(this.min) && k(this.max)
            }
            ;
            c.prototype.addTitle = function(a) {
                var f = this.chart.renderer, h = this.horiz, e = this.opposite, b = this.options.title, m = this.chart.styledMode, q;
                this.axisTitle || ((q = b.textAlign) || (q = (h ? {
                    low: "left",
                    middle: "center",
                    high: "right"
                } : {
                    low: e ? "right" : "left",
                    middle: "center",
                    high: e ? "left" : "right"
                })[b.align]),
                this.axisTitle = f.text(b.text || "", 0, 0, b.useHTML).attr({
                    zIndex: 7,
                    rotation: b.rotation,
                    align: q
                }).addClass("highcharts-axis-title"),
                m || this.axisTitle.css(C(b.style)),
                this.axisTitle.add(this.axisGroup),
                this.axisTitle.isNew = !0);
                m || b.style.width || this.isRadial || this.axisTitle.css({
                    width: this.len + "px"
                });
                this.axisTitle[a ? "show" : "hide"](a)
            }
            ;
            c.prototype.generateTick = function(a) {
                var f = this.ticks;
                f[a] ? f[a].addLabel() : f[a] = new p(this,a)
            }
            ;
            c.prototype.getOffset = function() {
                var a = this
                  , h = this
                  , b = h.chart
                  , q = b.renderer
                  , d = h.options
                  , u = h.tickPositions
                  , r = h.ticks
                  , g = h.horiz
                  , c = h.side
                  , I = b.inverted && !h.isZAxis ? [1, 0, 3, 2][c] : c
                  , z = h.hasData()
                  , C = d.title
                  , K = d.labels
                  , w = b.axisOffset;
                b = b.clipOffset;
                var v = [-1, 1, 1, -1][c], O = d.className, l = h.axisParent, p, n = 0, B = 0, y = 0;
                h.showAxis = p = z || d.showEmpty;
                h.staggerLines = h.horiz && K.staggerLines || void 0;
                if (!h.axisGroup) {
                    var D = function(f, h, e) {
                        return q.g(f).attr({
                            zIndex: e
                        }).addClass("highcharts-" + a.coll.toLowerCase() + h + " " + (a.isRadial ? "highcharts-radial-axis" + h + " " : "") + (O || "")).add(l)
                    };
                    h.gridGroup = D("grid", "-grid", d.gridZIndex);
                    h.axisGroup = D("axis", "", d.zIndex);
                    h.labelGroup = D("axis-labels", "-labels", K.zIndex)
                }
                z || h.isLinked ? (u.forEach(function(a) {
                    h.generateTick(a)
                }),
                h.renderUnsquish(),
                h.reserveSpaceDefault = 0 === c || 2 === c || {
                    1: "left",
                    3: "right"
                }[c] === h.labelAlign,
                f(K.reserveSpace, "center" === h.labelAlign ? !0 : null, h.reserveSpaceDefault) && u.forEach(function(a) {
                    y = Math.max(r[a].getLabelSize(), y)
                }),
                h.staggerLines && (y *= h.staggerLines),
                h.labelOffset = y * (h.opposite ? -1 : 1)) : m(r, function(a, h) {
                    a.destroy();
                    delete r[h]
                });
                if (C && C.text && !1 !== C.enabled && (h.addTitle(p),
                p && !1 !== C.reserveSpace)) {
                    h.titleOffset = n = h.axisTitle.getBBox()[g ? "height" : "width"];
                    var L = C.offset;
                    B = k(L) ? 0 : f(C.margin, g ? 5 : 10)
                }
                h.renderLine();
                h.offset = v * f(d.offset, w[c] ? w[c] + (d.margin || 0) : 0);
                h.tickRotCorr = h.tickRotCorr || {
                    x: 0,
                    y: 0
                };
                C = 0 === c ? -h.labelMetrics().h : 2 === c ? h.tickRotCorr.y : 0;
                z = Math.abs(y) + B;
                y && (z = z - C + v * (g ? f(K.y, h.tickRotCorr.y + 8 * v) : K.x));
                h.axisTitleMargin = f(L, z);
                h.getMaxLabelDimensions && (h.maxLabelDimensions = h.getMaxLabelDimensions(r, u));
                g = this.tickSize("tick");
                w[c] = Math.max(w[c], (h.axisTitleMargin || 0) + n + v * h.offset, z, u && u.length && g ? g[0] + v * h.offset : 0);
                d = d.offset ? 0 : 2 * Math.floor(h.axisLine.strokeWidth() / 2);
                b[I] = Math.max(b[I], d);
                e(this, "afterGetOffset")
            }
            ;
            c.prototype.getLinePath = function(a) {
                var h = this.chart
                  , f = this.opposite
                  , e = this.offset
                  , b = this.horiz
                  , m = this.left + (f ? this.width : 0) + e;
                e = h.chartHeight - this.bottom - (f ? this.height : 0) + e;
                f && (a *= -1);
                return h.renderer.crispLine([["M", b ? this.left : m, b ? e : this.top], ["L", b ? h.chartWidth - this.right : m, b ? e : h.chartHeight - this.bottom]], a)
            }
            ;
            c.prototype.renderLine = function() {
                this.axisLine || (this.axisLine = this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup),
                this.chart.styledMode || this.axisLine.attr({
                    stroke: this.options.lineColor,
                    "stroke-width": this.options.lineWidth,
                    zIndex: 7
                }))
            }
            ;
            c.prototype.getTitlePosition = function() {
                var a = this.horiz
                  , h = this.left
                  , f = this.top
                  , b = this.len
                  , m = this.options.title
                  , q = a ? h : f
                  , d = this.opposite
                  , u = this.offset
                  , r = m.x
                  , c = m.y
                  , g = this.axisTitle
                  , k = this.chart.renderer.fontMetrics(m.style.fontSize, g);
                g = Math.max(g.getBBox(null, 0).height - k.h - 1, 0);
                b = {
                    low: q + (a ? 0 : b),
                    middle: q + b / 2,
                    high: q + (a ? b : 0)
                }[m.align];
                h = (a ? f + this.height : h) + (a ? 1 : -1) * (d ? -1 : 1) * this.axisTitleMargin + [-g, g, k.f, -g][this.side];
                a = {
                    x: a ? b + r : h + (d ? this.width : 0) + u + r,
                    y: a ? h + c - (d ? this.height : 0) + u : b + c
                };
                e(this, "afterGetTitlePosition", {
                    titlePosition: a
                });
                return a
            }
            ;
            c.prototype.renderMinorTick = function(a, h) {
                var f = this.minorTicks;
                f[a] || (f[a] = new p(this,a,"minor"));
                h && f[a].isNew && f[a].render(null, !0);
                f[a].render(null, !1, 1)
            }
            ;
            c.prototype.renderTick = function(a, h, f) {
                var e = this.ticks;
                if (!this.isLinked || a >= this.min && a <= this.max || this.grid && this.grid.isColumn)
                    e[a] || (e[a] = new p(this,a)),
                    f && e[a].isNew && e[a].render(h, !0, -1),
                    e[a].render(h)
            }
            ;
            c.prototype.render = function() {
                var a = this, h = a.chart, f = a.logarithmic, b = a.options, u = a.isLinked, r = a.tickPositions, g = a.axisTitle, c = a.ticks, k = a.minorTicks, I = a.alternateBands, z = b.stackLabels, C = b.alternateGridColor, K = a.tickmarkOffset, w = a.axisLine, v = a.showAxis, l = d(h.renderer.globalAnimation), n, B;
                a.labelEdge.length = 0;
                a.overlap = !1;
                [c, k, I].forEach(function(a) {
                    m(a, function(a) {
                        a.isActive = !1
                    })
                });
                if (a.hasData() || u) {
                    var y = a.chart.hasRendered && a.old && q(a.old.min);
                    a.minorTickInterval && !a.categories && a.getMinorTickPositions().forEach(function(h) {
                        a.renderMinorTick(h, y)
                    });
                    r.length && (r.forEach(function(h, f) {
                        a.renderTick(h, f, y)
                    }),
                    K && (0 === a.min || a.single) && (c[-1] || (c[-1] = new p(a,-1,null,!0)),
                    c[-1].render(-1)));
                    C && r.forEach(function(e, b) {
                        B = "undefined" !== typeof r[b + 1] ? r[b + 1] + K : a.max - K;
                        0 === b % 2 && e < a.max && B <= a.max + (h.polar ? -K : K) && (I[e] || (I[e] = new F.PlotLineOrBand(a)),
                        n = e + K,
                        I[e].options = {
                            from: f ? f.lin2log(n) : n,
                            to: f ? f.lin2log(B) : B,
                            color: C,
                            className: "highcharts-alternate-grid"
                        },
                        I[e].render(),
                        I[e].isActive = !0)
                    });
                    a._addedPlotLB || (a._addedPlotLB = !0,
                    (b.plotLines || []).concat(b.plotBands || []).forEach(function(h) {
                        a.addPlotBandOrLine(h)
                    }))
                }
                [c, k, I].forEach(function(a) {
                    var f = []
                      , e = l.duration;
                    m(a, function(a, h) {
                        a.isActive || (a.render(h, !1, 0),
                        a.isActive = !1,
                        f.push(h))
                    });
                    O(function() {
                        for (var h = f.length; h--; )
                            a[f[h]] && !a[f[h]].isActive && (a[f[h]].destroy(),
                            delete a[f[h]])
                    }, a !== I && h.hasRendered && e ? e : 0)
                });
                w && (w[w.isPlaced ? "animate" : "attr"]({
                    d: this.getLinePath(w.strokeWidth())
                }),
                w.isPlaced = !0,
                w[v ? "show" : "hide"](v));
                g && v && (b = a.getTitlePosition(),
                q(b.y) ? (g[g.isNew ? "attr" : "animate"](b),
                g.isNew = !1) : (g.attr("y", -9999),
                g.isNew = !0));
                z && z.enabled && a.stacking && a.stacking.renderStackTotals();
                a.old = {
                    len: a.len,
                    max: a.max,
                    min: a.min,
                    transA: a.transA,
                    userMax: a.userMax,
                    userMin: a.userMin
                };
                a.isDirty = !1;
                e(this, "afterRender")
            }
            ;
            c.prototype.redraw = function() {
                this.visible && (this.render(),
                this.plotLinesAndBands.forEach(function(a) {
                    a.render()
                }));
                this.series.forEach(function(a) {
                    a.isDirty = !0
                })
            }
            ;
            c.prototype.getKeepProps = function() {
                return this.keepProps || c.keepProps
            }
            ;
            c.prototype.destroy = function(a) {
                var f = this
                  , b = f.plotLinesAndBands
                  , q = this.eventOptions;
                e(this, "destroy", {
                    keepEvents: a
                });
                a || h(f);
                [f.ticks, f.minorTicks, f.alternateBands].forEach(function(a) {
                    L(a)
                });
                if (b)
                    for (a = b.length; a--; )
                        b[a].destroy();
                "axisLine axisTitle axisGroup gridGroup labelGroup cross scrollbar".split(" ").forEach(function(a) {
                    f[a] && (f[a] = f[a].destroy())
                });
                for (var d in f.plotLinesAndBandsGroups)
                    f.plotLinesAndBandsGroups[d] = f.plotLinesAndBandsGroups[d].destroy();
                m(f, function(a, h) {
                    -1 === f.getKeepProps().indexOf(h) && delete f[h]
                });
                this.eventOptions = q
            }
            ;
            c.prototype.drawCrosshair = function(a, h) {
                var b = this.crosshair, m = f(b && b.snap, !0), q = this.chart, d, u = this.cross;
                e(this, "drawCrosshair", {
                    e: a,
                    point: h
                });
                a || (a = this.cross && this.cross.e);
                if (b && !1 !== (k(h) || !m)) {
                    m ? k(h) && (d = f("colorAxis" !== this.coll ? h.crosshairPos : null, this.isXAxis ? h.plotX : this.len - h.plotY)) : d = a && (this.horiz ? a.chartX - this.pos : this.len - a.chartY + this.pos);
                    if (k(d)) {
                        var r = {
                            value: h && (this.isXAxis ? h.x : f(h.stackY, h.y)),
                            translatedValue: d
                        };
                        q.polar && w(r, {
                            isCrosshair: !0,
                            chartX: a && a.chartX,
                            chartY: a && a.chartY,
                            point: h
                        });
                        r = this.getPlotLinePath(r) || null
                    }
                    if (!k(r)) {
                        this.hideCrosshair();
                        return
                    }
                    m = this.categories && !this.isRadial;
                    u || (this.cross = u = q.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-" + (m ? "category " : "thin ") + (b.className || "")).attr({
                        zIndex: f(b.zIndex, 2)
                    }).add(),
                    q.styledMode || (u.attr({
                        stroke: b.color || (m ? x.parse(E.highlightColor20).setOpacity(.25).get() : E.neutralColor20),
                        "stroke-width": f(b.width, 1)
                    }).css({
                        "pointer-events": "none"
                    }),
                    b.dashStyle && u.attr({
                        dashstyle: b.dashStyle
                    })));
                    u.show().attr({
                        d: r
                    });
                    m && !b.width && u.attr({
                        "stroke-width": this.transA
                    });
                    this.cross.e = a
                } else
                    this.hideCrosshair();
                e(this, "afterDrawCrosshair", {
                    e: a,
                    point: h
                })
            }
            ;
            c.prototype.hideCrosshair = function() {
                this.cross && this.cross.hide();
                e(this, "afterHideCrosshair")
            }
            ;
            c.prototype.hasVerticalPanning = function() {
                var a = this.chart.options.chart.panning;
                return !!(a && a.enabled && /y/.test(a.type))
            }
            ;
            c.prototype.validatePositiveValue = function(a) {
                return q(a) && 0 < a
            }
            ;
            c.prototype.update = function(a, h) {
                var e = this.chart;
                a = C(this.userOptions, a);
                this.destroy(!0);
                this.init(e, a);
                e.isDirtyBox = !0;
                f(h, !0) && e.redraw()
            }
            ;
            c.prototype.remove = function(a) {
                for (var h = this.chart, e = this.coll, b = this.series, m = b.length; m--; )
                    b[m] && b[m].remove(!1);
                M(h.axes, this);
                M(h[e], this);
                h[e].forEach(function(a, h) {
                    a.options.index = a.userOptions.index = h
                });
                this.destroy();
                h.isDirtyBox = !0;
                f(a, !0) && h.redraw()
            }
            ;
            c.prototype.setTitle = function(a, h) {
                this.update({
                    title: a
                }, h)
            }
            ;
            c.prototype.setCategories = function(a, h) {
                this.update({
                    categories: a
                }, h)
            }
            ;
            c.defaultOptions = J.defaultXAxisOptions;
            c.keepProps = "extKey hcEvents names series userMax userMin".split(" ");
            return c
        }();
        "";
        return c
    });
    P(c, "Core/Axis/DateTimeAxis.js", [c["Core/Axis/Axis.js"], c["Core/Utilities.js"]], function(c, x) {
        var n = x.addEvent
          , H = x.getMagnitude
          , A = x.normalizeTickInterval
          , F = x.timeUnits
          , G = function() {
            function c(c) {
                this.axis = c
            }
            c.prototype.normalizeTimeTickInterval = function(c, d) {
                var l = d || [["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]], ["second", [1, 2, 5, 10, 15, 30]], ["minute", [1, 2, 5, 10, 15, 30]], ["hour", [1, 2, 3, 4, 6, 8, 12]], ["day", [1, 2]], ["week", [1, 2]], ["month", [1, 2, 3, 4, 6]], ["year", null]];
                d = l[l.length - 1];
                var b = F[d[0]], g = d[1], p;
                for (p = 0; p < l.length && !(d = l[p],
                b = F[d[0]],
                g = d[1],
                l[p + 1] && c <= (b * g[g.length - 1] + F[l[p + 1][0]]) / 2); p++)
                    ;
                b === F.year && c < 5 * b && (g = [1, 2, 5]);
                c = A(c / b, g, "year" === d[0] ? Math.max(H(c / b), 1) : 1);
                return {
                    unitRange: b,
                    count: c,
                    unitName: d[0]
                }
            }
            ;
            return c
        }();
        x = function() {
            function c() {}
            c.compose = function(c) {
                c.keepProps.push("dateTime");
                c.prototype.getTimeTicks = function() {
                    return this.chart.time.getTimeTicks.apply(this.chart.time, arguments)
                }
                ;
                n(c, "init", function(d) {
                    "datetime" !== d.userOptions.type ? this.dateTime = void 0 : this.dateTime || (this.dateTime = new G(this))
                })
            }
            ;
            c.AdditionsClass = G;
            return c
        }();
        x.compose(c);
        return x
    });
    P(c, "Core/Axis/LogarithmicAxis.js", [c["Core/Axis/Axis.js"], c["Core/Utilities.js"]], function(c, x) {
        var n = x.addEvent
          , H = x.getMagnitude
          , A = x.normalizeTickInterval
          , F = x.pick
          , G = function() {
            function c(c) {
                this.axis = c
            }
            c.prototype.getLogTickPositions = function(c, d, l, b) {
                var g = this.axis
                  , n = g.len
                  , p = g.options
                  , y = [];
                b || (this.minorAutoInterval = void 0);
                if (.5 <= c)
                    c = Math.round(c),
                    y = g.getLinearTickPositions(c, d, l);
                else if (.08 <= c) {
                    var v = Math.floor(d), k, L = p = void 0;
                    for (n = .3 < c ? [1, 2, 4] : .15 < c ? [1, 2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9]; v < l + 1 && !L; v++) {
                        var M = n.length;
                        for (k = 0; k < M && !L; k++) {
                            var B = this.log2lin(this.lin2log(v) * n[k]);
                            B > d && (!b || p <= l) && "undefined" !== typeof p && y.push(p);
                            p > l && (L = !0);
                            p = B
                        }
                    }
                } else
                    d = this.lin2log(d),
                    l = this.lin2log(l),
                    c = b ? g.getMinorTickInterval() : p.tickInterval,
                    c = F("auto" === c ? null : c, this.minorAutoInterval, p.tickPixelInterval / (b ? 5 : 1) * (l - d) / ((b ? n / g.tickPositions.length : n) || 1)),
                    c = A(c, void 0, H(c)),
                    y = g.getLinearTickPositions(c, d, l).map(this.log2lin),
                    b || (this.minorAutoInterval = c / 5);
                b || (g.tickInterval = c);
                return y
            }
            ;
            c.prototype.lin2log = function(c) {
                return Math.pow(10, c)
            }
            ;
            c.prototype.log2lin = function(c) {
                return Math.log(c) / Math.LN10
            }
            ;
            return c
        }();
        x = function() {
            function c() {}
            c.compose = function(c) {
                c.keepProps.push("logarithmic");
                n(c, "init", function(d) {
                    var c = this.logarithmic;
                    "logarithmic" !== d.userOptions.type ? this.logarithmic = void 0 : c || (this.logarithmic = new G(this))
                });
                n(c, "afterInit", function() {
                    var d = this.logarithmic;
                    d && (this.lin2val = function(c) {
                        return d.lin2log(c)
                    }
                    ,
                    this.val2lin = function(c) {
                        return d.log2lin(c)
                    }
                    )
                })
            }
            ;
            return c
        }();
        x.compose(c);
        return x
    });
    P(c, "Core/Axis/PlotLineOrBand.js", [c["Core/Axis/Axis.js"], c["Core/Color/Palette.js"], c["Core/Utilities.js"]], function(c, x, E) {
        var n = E.arrayMax
          , A = E.arrayMin
          , F = E.defined
          , G = E.destroyObjectProperties
          , J = E.erase
          , p = E.extend
          , d = E.fireEvent
          , l = E.isNumber
          , b = E.merge
          , g = E.objectEach
          , N = E.pick
          , D = function() {
            function c(b, d) {
                this.axis = b;
                d && (this.options = d,
                this.id = d.id)
            }
            c.prototype.render = function() {
                d(this, "render");
                var c = this
                  , k = c.axis
                  , l = k.horiz
                  , n = k.logarithmic
                  , B = c.options
                  , w = B.label
                  , e = c.label
                  , r = B.to
                  , a = B.from
                  , q = B.value
                  , I = F(a) && F(r)
                  , C = F(q)
                  , z = c.svgElem
                  , m = !z
                  , f = []
                  , K = B.color
                  , h = N(B.zIndex, 0)
                  , u = B.events;
                f = {
                    "class": "highcharts-plot-" + (I ? "band " : "line ") + (B.className || "")
                };
                var O = {}
                  , p = k.chart.renderer
                  , t = I ? "bands" : "lines";
                n && (a = n.log2lin(a),
                r = n.log2lin(r),
                q = n.log2lin(q));
                k.chart.styledMode || (C ? (f.stroke = K || x.neutralColor40,
                f["stroke-width"] = N(B.width, 1),
                B.dashStyle && (f.dashstyle = B.dashStyle)) : I && (f.fill = K || x.highlightColor10,
                B.borderWidth && (f.stroke = B.borderColor,
                f["stroke-width"] = B.borderWidth)));
                O.zIndex = h;
                t += "-" + h;
                (n = k.plotLinesAndBandsGroups[t]) || (k.plotLinesAndBandsGroups[t] = n = p.g("plot-" + t).attr(O).add());
                m && (c.svgElem = z = p.path().attr(f).add(n));
                if (C)
                    f = k.getPlotLinePath({
                        value: q,
                        lineWidth: z.strokeWidth(),
                        acrossPanes: B.acrossPanes
                    });
                else if (I)
                    f = k.getPlotBandPath(a, r, B);
                else
                    return;
                !c.eventsAdded && u && (g(u, function(a, h) {
                    z.on(h, function(a) {
                        u[h].apply(c, [a])
                    })
                }),
                c.eventsAdded = !0);
                (m || !z.d) && f && f.length ? z.attr({
                    d: f
                }) : z && (f ? (z.show(!0),
                z.animate({
                    d: f
                })) : z.d && (z.hide(),
                e && (c.label = e = e.destroy())));
                w && (F(w.text) || F(w.formatter)) && f && f.length && 0 < k.width && 0 < k.height && !f.isFlat ? (w = b({
                    align: l && I && "center",
                    x: l ? !I && 4 : 10,
                    verticalAlign: !l && I && "middle",
                    y: l ? I ? 16 : 10 : I ? 6 : -4,
                    rotation: l && !I && 90
                }, w),
                this.renderLabel(w, f, I, h)) : e && e.hide();
                return c
            }
            ;
            c.prototype.renderLabel = function(b, d, c, g) {
                var k = this.label
                  , w = this.axis.chart.renderer;
                k || (k = {
                    align: b.textAlign || b.align,
                    rotation: b.rotation,
                    "class": "highcharts-plot-" + (c ? "band" : "line") + "-label " + (b.className || "")
                },
                k.zIndex = g,
                g = this.getLabelText(b),
                this.label = k = w.text(g, 0, 0, b.useHTML).attr(k).add(),
                this.axis.chart.styledMode || k.css(b.style));
                w = d.xBounds || [d[0][1], d[1][1], c ? d[2][1] : d[0][1]];
                d = d.yBounds || [d[0][2], d[1][2], c ? d[2][2] : d[0][2]];
                c = A(w);
                g = A(d);
                k.align(b, !1, {
                    x: c,
                    y: g,
                    width: n(w) - c,
                    height: n(d) - g
                });
                k.show(!0)
            }
            ;
            c.prototype.getLabelText = function(b) {
                return F(b.formatter) ? b.formatter.call(this) : b.text
            }
            ;
            c.prototype.destroy = function() {
                J(this.axis.plotLinesAndBands, this);
                delete this.axis;
                G(this)
            }
            ;
            return c
        }();
        p(c.prototype, {
            getPlotBandPath: function(b, d, c) {
                void 0 === c && (c = this.options);
                var g = this.getPlotLinePath({
                    value: d,
                    force: !0,
                    acrossPanes: c.acrossPanes
                });
                c = this.getPlotLinePath({
                    value: b,
                    force: !0,
                    acrossPanes: c.acrossPanes
                });
                var k = []
                  , v = this.horiz
                  , w = 1;
                b = !l(this.min) || !l(this.max) || b < this.min && d < this.min || b > this.max && d > this.max;
                if (c && g) {
                    if (b) {
                        var e = c.toString() === g.toString();
                        w = 0
                    }
                    for (b = 0; b < c.length; b += 2) {
                        d = c[b];
                        var r = c[b + 1]
                          , a = g[b]
                          , q = g[b + 1];
                        "M" !== d[0] && "L" !== d[0] || "M" !== r[0] && "L" !== r[0] || "M" !== a[0] && "L" !== a[0] || "M" !== q[0] && "L" !== q[0] || (v && a[1] === d[1] ? (a[1] += w,
                        q[1] += w) : v || a[2] !== d[2] || (a[2] += w,
                        q[2] += w),
                        k.push(["M", d[1], d[2]], ["L", r[1], r[2]], ["L", q[1], q[2]], ["L", a[1], a[2]], ["Z"]));
                        k.isFlat = e
                    }
                }
                return k
            },
            addPlotBand: function(b) {
                return this.addPlotBandOrLine(b, "plotBands")
            },
            addPlotLine: function(b) {
                return this.addPlotBandOrLine(b, "plotLines")
            },
            addPlotBandOrLine: function(b, d) {
                var c = this
                  , g = new D(this,b)
                  , l = this.userOptions;
                this.visible && (g = g.render());
                if (g) {
                    this._addedPlotLB || (this._addedPlotLB = !0,
                    (l.plotLines || []).concat(l.plotBands || []).forEach(function(b) {
                        c.addPlotBandOrLine(b)
                    }));
                    if (d) {
                        var v = l[d] || [];
                        v.push(b);
                        l[d] = v
                    }
                    this.plotLinesAndBands.push(g)
                }
                return g
            },
            removePlotBandOrLine: function(b) {
                var d = this.plotLinesAndBands
                  , c = this.options
                  , g = this.userOptions;
                if (d) {
                    for (var l = d.length; l--; )
                        d[l].id === b && d[l].destroy();
                    [c.plotLines || [], g.plotLines || [], c.plotBands || [], g.plotBands || []].forEach(function(d) {
                        for (l = d.length; l--; )
                            (d[l] || {}).id === b && J(d, d[l])
                    })
                }
            },
            removePlotBand: function(b) {
                this.removePlotBandOrLine(b)
            },
            removePlotLine: function(b) {
                this.removePlotBandOrLine(b)
            }
        });
        return D
    });
    P(c, "Core/Tooltip.js", [c["Core/FormatUtilities.js"], c["Core/Globals.js"], c["Core/Color/Palette.js"], c["Core/Renderer/RendererRegistry.js"], c["Core/Utilities.js"]], function(c, x, E, H, A) {
        var n = c.format
          , G = x.doc
          , J = A.clamp
          , p = A.css
          , d = A.defined
          , l = A.discardElement
          , b = A.extend
          , g = A.fireEvent
          , N = A.isArray
          , D = A.isNumber
          , y = A.isString
          , v = A.merge
          , k = A.pick
          , L = A.splat
          , M = A.syncTimeout
          , B = A.timeUnits;
        "";
        c = function() {
            function c(e, b) {
                this.container = void 0;
                this.crosshairs = [];
                this.distance = 0;
                this.isHidden = !0;
                this.isSticky = !1;
                this.now = {};
                this.options = {};
                this.outside = !1;
                this.chart = e;
                this.init(e, b)
            }
            c.prototype.applyFilter = function() {
                var e = this.chart;
                e.renderer.definition({
                    tagName: "filter",
                    attributes: {
                        id: "drop-shadow-" + e.index,
                        opacity: .5
                    },
                    children: [{
                        tagName: "feGaussianBlur",
                        attributes: {
                            "in": "SourceAlpha",
                            stdDeviation: 1
                        }
                    }, {
                        tagName: "feOffset",
                        attributes: {
                            dx: 1,
                            dy: 1
                        }
                    }, {
                        tagName: "feComponentTransfer",
                        children: [{
                            tagName: "feFuncA",
                            attributes: {
                                type: "linear",
                                slope: .3
                            }
                        }]
                    }, {
                        tagName: "feMerge",
                        children: [{
                            tagName: "feMergeNode"
                        }, {
                            tagName: "feMergeNode",
                            attributes: {
                                "in": "SourceGraphic"
                            }
                        }]
                    }]
                })
            }
            ;
            c.prototype.bodyFormatter = function(e) {
                return e.map(function(e) {
                    var a = e.series.tooltipOptions;
                    return (a[(e.point.formatPrefix || "point") + "Formatter"] || e.point.tooltipFormatter).call(e.point, a[(e.point.formatPrefix || "point") + "Format"] || "")
                })
            }
            ;
            c.prototype.cleanSplit = function(e) {
                this.chart.series.forEach(function(b) {
                    var a = b && b.tt;
                    a && (!a.isActive || e ? b.tt = a.destroy() : a.isActive = !1)
                })
            }
            ;
            c.prototype.defaultFormatter = function(e) {
                var b = this.points || L(this);
                var a = [e.tooltipFooterHeaderFormatter(b[0])];
                a = a.concat(e.bodyFormatter(b));
                a.push(e.tooltipFooterHeaderFormatter(b[0], !0));
                return a
            }
            ;
            c.prototype.destroy = function() {
                this.label && (this.label = this.label.destroy());
                this.split && this.tt && (this.cleanSplit(this.chart, !0),
                this.tt = this.tt.destroy());
                this.renderer && (this.renderer = this.renderer.destroy(),
                l(this.container));
                A.clearTimeout(this.hideTimer);
                A.clearTimeout(this.tooltipTimeout)
            }
            ;
            c.prototype.getAnchor = function(e, b) {
                var a = this.chart;
                var d = a.pointer;
                var c = a.inverted, g = a.plotTop, r = a.plotLeft, m = 0, f = 0, k, h;
                e = L(e);
                this.followPointer && b ? ("undefined" === typeof b.chartX && (b = d.normalize(b)),
                d = [b.chartX - r, b.chartY - g]) : e[0].tooltipPos ? d = e[0].tooltipPos : (e.forEach(function(e) {
                    k = e.series.yAxis;
                    h = e.series.xAxis;
                    m += e.plotX || 0;
                    f += e.plotLow ? (e.plotLow + (e.plotHigh || 0)) / 2 : e.plotY || 0;
                    h && k && (c ? (m += g + a.plotHeight - h.len - h.pos,
                    f += r + a.plotWidth - k.len - k.pos) : (m += h.pos - r,
                    f += k.pos - g))
                }),
                m /= e.length,
                f /= e.length,
                d = [c ? a.plotWidth - f : m, c ? a.plotHeight - m : f],
                this.shared && 1 < e.length && b && (c ? d[0] = b.chartX - r : d[1] = b.chartY - g));
                return d.map(Math.round)
            }
            ;
            c.prototype.getDateFormat = function(e, b, a, d) {
                var c = this.chart.time
                  , q = c.dateFormat("%m-%d %H:%M:%S.%L", b)
                  , g = {
                    millisecond: 15,
                    second: 12,
                    minute: 9,
                    hour: 6,
                    day: 3
                }
                  , m = "millisecond";
                for (f in B) {
                    if (e === B.week && +c.dateFormat("%w", b) === a && "00:00:00.000" === q.substr(6)) {
                        var f = "week";
                        break
                    }
                    if (B[f] > e) {
                        f = m;
                        break
                    }
                    if (g[f] && q.substr(g[f]) !== "01-01 00:00:00.000".substr(g[f]))
                        break;
                    "week" !== f && (m = f)
                }
                if (f)
                    var r = c.resolveDTLFormat(d[f]).main;
                return r
            }
            ;
            c.prototype.getLabel = function() {
                var e = this, b = this.chart.renderer, a = this.chart.styledMode, c = this.options, g = "tooltip" + (d(c.className) ? " " + c.className : ""), k = c.style && c.style.pointerEvents || (!this.followPointer && c.stickOnContact ? "auto" : "none"), z, m = function() {
                    e.inContact = !0
                }, f = function() {
                    var a = e.chart.hoverSeries;
                    e.inContact = !1;
                    if (a && a.onMouseOut)
                        a.onMouseOut()
                };
                if (!this.label) {
                    if (this.outside) {
                        var K = this.chart.options.chart.style
                          , h = H.getRendererType();
                        this.container = z = x.doc.createElement("div");
                        z.className = "highcharts-tooltip-container";
                        p(z, {
                            position: "absolute",
                            top: "1px",
                            pointerEvents: k,
                            zIndex: Math.max(this.options.style && this.options.style.zIndex || 0, (K && K.zIndex || 0) + 3)
                        });
                        x.doc.body.appendChild(z);
                        this.renderer = b = new h(z,0,0,K,void 0,void 0,b.styledMode)
                    }
                    this.split ? this.label = b.g(g) : (this.label = b.label("", 0, 0, c.shape || "callout", null, null, c.useHTML, null, g).attr({
                        padding: c.padding,
                        r: c.borderRadius
                    }),
                    a || this.label.attr({
                        fill: c.backgroundColor,
                        "stroke-width": c.borderWidth
                    }).css(c.style).css({
                        pointerEvents: k
                    }).shadow(c.shadow));
                    a && c.shadow && (this.applyFilter(),
                    this.label.attr({
                        filter: "url(#drop-shadow-" + this.chart.index + ")"
                    }));
                    if (e.outside && !e.split) {
                        var u = this.label
                          , w = u.xSetter
                          , l = u.ySetter;
                        u.xSetter = function(a) {
                            w.call(u, e.distance);
                            z.style.left = a + "px"
                        }
                        ;
                        u.ySetter = function(a) {
                            l.call(u, e.distance);
                            z.style.top = a + "px"
                        }
                    }
                    this.label.on("mouseenter", m).on("mouseleave", f).attr({
                        zIndex: 8
                    }).add()
                }
                return this.label
            }
            ;
            c.prototype.getPosition = function(e, b, a) {
                var d = this.chart, c = this.distance, g = {}, r = d.inverted && a.h || 0, m, f = this.outside, K = f ? G.documentElement.clientWidth - 2 * c : d.chartWidth, h = f ? Math.max(G.body.scrollHeight, G.documentElement.scrollHeight, G.body.offsetHeight, G.documentElement.offsetHeight, G.documentElement.clientHeight) : d.chartHeight, u = d.pointer.getChartPosition(), w = function(m) {
                    var q = "x" === m;
                    return [m, q ? K : h, q ? e : b].concat(f ? [q ? e * u.scaleX : b * u.scaleY, q ? u.left - c + (a.plotX + d.plotLeft) * u.scaleX : u.top - c + (a.plotY + d.plotTop) * u.scaleY, 0, q ? K : h] : [q ? e : b, q ? a.plotX + d.plotLeft : a.plotY + d.plotTop, q ? d.plotLeft : d.plotTop, q ? d.plotLeft + d.plotWidth : d.plotTop + d.plotHeight])
                }, l = w("y"), t = w("x"), v = !this.followPointer && k(a.ttBelow, !d.inverted === !!a.negative), n = function(a, h, e, b, m, d, q) {
                    var k = f ? "y" === a ? c * u.scaleY : c * u.scaleX : c
                      , I = (e - b) / 2
                      , z = b < m - c
                      , C = m + c + b < h
                      , t = m - k - e + I;
                    m = m + k - I;
                    if (v && C)
                        g[a] = m;
                    else if (!v && z)
                        g[a] = t;
                    else if (z)
                        g[a] = Math.min(q - b, 0 > t - r ? t : t - r);
                    else if (C)
                        g[a] = Math.max(d, m + r + e > h ? m : m + r);
                    else
                        return !1
                }, p = function(a, h, f, e, b) {
                    var m;
                    b < c || b > h - c ? m = !1 : g[a] = b < f / 2 ? 1 : b > h - e / 2 ? h - e - 2 : b - f / 2;
                    return m
                }, B = function(a) {
                    var h = l;
                    l = t;
                    t = h;
                    m = a
                }, S = function() {
                    !1 !== n.apply(0, l) ? !1 !== p.apply(0, t) || m || (B(!0),
                    S()) : m ? g.x = g.y = 0 : (B(!0),
                    S())
                };
                (d.inverted || 1 < this.len) && B();
                S();
                return g
            }
            ;
            c.prototype.getXDateFormat = function(e, b, a) {
                b = b.dateTimeLabelFormats;
                var d = a && a.closestPointRange;
                return (d ? this.getDateFormat(d, e.x, a.options.startOfWeek, b) : b.day) || b.year
            }
            ;
            c.prototype.hide = function(e) {
                var b = this;
                A.clearTimeout(this.hideTimer);
                e = k(e, this.options.hideDelay, 500);
                this.isHidden || (this.hideTimer = M(function() {
                    b.getLabel().fadeOut(e ? void 0 : e);
                    b.isHidden = !0
                }, e))
            }
            ;
            c.prototype.init = function(e, b) {
                this.chart = e;
                this.options = b;
                this.crosshairs = [];
                this.now = {
                    x: 0,
                    y: 0
                };
                this.isHidden = !0;
                this.split = b.split && !e.inverted && !e.polar;
                this.shared = b.shared || this.split;
                this.outside = k(b.outside, !(!e.scrollablePixelsX && !e.scrollablePixelsY))
            }
            ;
            c.prototype.isStickyOnContact = function() {
                return !(this.followPointer || !this.options.stickOnContact || !this.inContact)
            }
            ;
            c.prototype.move = function(e, d, a, c) {
                var q = this
                  , g = q.now
                  , r = !1 !== q.options.animation && !q.isHidden && (1 < Math.abs(e - g.x) || 1 < Math.abs(d - g.y))
                  , m = q.followPointer || 1 < q.len;
                b(g, {
                    x: r ? (2 * g.x + e) / 3 : e,
                    y: r ? (g.y + d) / 2 : d,
                    anchorX: m ? void 0 : r ? (2 * g.anchorX + a) / 3 : a,
                    anchorY: m ? void 0 : r ? (g.anchorY + c) / 2 : c
                });
                q.getLabel().attr(g);
                q.drawTracker();
                r && (A.clearTimeout(this.tooltipTimeout),
                this.tooltipTimeout = setTimeout(function() {
                    q && q.move(e, d, a, c)
                }, 32))
            }
            ;
            c.prototype.refresh = function(e, b) {
                var a = this.chart
                  , d = this.options
                  , c = L(e)
                  , r = c[0]
                  , z = {}
                  , m = []
                  , f = d.formatter || this.defaultFormatter;
                z = this.shared;
                var K = a.styledMode;
                if (d.enabled) {
                    A.clearTimeout(this.hideTimer);
                    this.followPointer = !this.split && r.series.tooltipOptions.followPointer;
                    var h = this.getAnchor(e, b);
                    var u = h[0];
                    var w = h[1];
                    !z || !N(e) && e.series && e.series.noSharedTooltip ? z = r.getLabelConfig() : (a.pointer.applyInactiveState(c),
                    c.forEach(function(a) {
                        a.setState("hover");
                        m.push(a.getLabelConfig())
                    }),
                    z = {
                        x: r.category,
                        y: r.y
                    },
                    z.points = m);
                    this.len = m.length;
                    e = f.call(z, this);
                    f = r.series;
                    this.distance = k(f.tooltipOptions.distance, 16);
                    if (!1 === e)
                        this.hide();
                    else {
                        if (this.split)
                            this.renderSplit(e, c);
                        else if (c = u,
                        z = w,
                        b && a.pointer.isDirectTouch && (c = b.chartX - a.plotLeft,
                        z = b.chartY - a.plotTop),
                        a.polar || !1 === f.options.clip || f.shouldShowTooltip(c, z))
                            b = this.getLabel(),
                            d.style.width && !K || b.css({
                                width: this.chart.spacingBox.width + "px"
                            }),
                            b.attr({
                                text: e && e.join ? e.join("") : e
                            }),
                            b.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-" + k(r.colorIndex, f.colorIndex)),
                            K || b.attr({
                                stroke: d.borderColor || r.color || f.color || E.neutralColor60
                            }),
                            this.updatePosition({
                                plotX: u,
                                plotY: w,
                                negative: r.negative,
                                ttBelow: r.ttBelow,
                                h: h[2] || 0
                            });
                        else {
                            this.hide();
                            return
                        }
                        this.isHidden && this.label && this.label.attr({
                            opacity: 1
                        }).show();
                        this.isHidden = !1
                    }
                    g(this, "refresh")
                }
            }
            ;
            c.prototype.renderSplit = function(e, d) {
                function a(a, h, f, e, b) {
                    void 0 === b && (b = !0);
                    f ? (h = N ? 0 : H,
                    a = J(a - e / 2, D.left, D.right - e - (c.outside ? M : 0))) : (h -= A,
                    a = b ? a - e - p : a + p,
                    a = J(a, b ? a : D.left, D.right));
                    return {
                        x: a,
                        y: h
                    }
                }
                var c = this
                  , g = c.chart
                  , r = c.chart
                  , z = r.chartWidth
                  , m = r.chartHeight
                  , f = r.plotHeight
                  , K = r.plotLeft
                  , h = r.plotTop
                  , u = r.pointer
                  , w = r.scrollablePixelsY;
                w = void 0 === w ? 0 : w;
                var l = r.scrollablePixelsX
                  , t = r.scrollingContainer;
                t = void 0 === t ? {
                    scrollLeft: 0,
                    scrollTop: 0
                } : t;
                var v = t.scrollLeft;
                t = t.scrollTop;
                var n = r.styledMode
                  , p = c.distance
                  , B = c.options
                  , S = c.options.positioner
                  , D = c.outside && "number" !== typeof l ? G.documentElement.getBoundingClientRect() : {
                    left: v,
                    right: v + z,
                    top: t,
                    bottom: t + m
                }
                  , aa = c.getLabel()
                  , L = this.renderer || g.renderer
                  , N = !(!g.xAxis[0] || !g.xAxis[0].opposite);
                g = u.getChartPosition();
                var M = g.left;
                g = g.top;
                var A = h + t
                  , F = 0
                  , H = f - w;
                y(e) && (e = [!1, e]);
                e = e.slice(0, d.length + 1).reduce(function(e, b, m) {
                    if (!1 !== b && "" !== b) {
                        m = d[m - 1] || {
                            isHeader: !0,
                            plotX: d[0].plotX,
                            plotY: f,
                            series: {}
                        };
                        var u = m.isHeader
                          , q = u ? c : m.series;
                        b = b.toString();
                        var g = q.tt
                          , r = m.isHeader;
                        var z = m.series;
                        var I = "highcharts-color-" + k(m.colorIndex, z.colorIndex, "none");
                        g || (g = {
                            padding: B.padding,
                            r: B.borderRadius
                        },
                        n || (g.fill = B.backgroundColor,
                        g["stroke-width"] = B.borderWidth),
                        g = L.label("", 0, 0, B[r ? "headerShape" : "shape"] || "callout", void 0, void 0, B.useHTML).addClass((r ? "highcharts-tooltip-header " : "") + "highcharts-tooltip-box " + I).attr(g).add(aa));
                        g.isActive = !0;
                        g.attr({
                            text: b
                        });
                        n || g.css(B.style).shadow(B.shadow).attr({
                            stroke: B.borderColor || m.color || z.color || E.neutralColor80
                        });
                        q = q.tt = g;
                        r = q.getBBox();
                        b = r.width + q.strokeWidth();
                        u && (F = r.height,
                        H += F,
                        N && (A -= F));
                        z = m.plotX;
                        z = void 0 === z ? 0 : z;
                        I = m.plotY;
                        I = void 0 === I ? 0 : I;
                        g = m.series;
                        if (m.isHeader) {
                            z = K + z;
                            var t = h + f / 2
                        } else {
                            var C = g.xAxis
                              , w = g.yAxis;
                            z = C.pos + J(z, -p, C.len + p);
                            g.shouldShowTooltip(0, w.pos - h + I, {
                                ignoreX: !0
                            }) && (t = w.pos + I)
                        }
                        z = J(z, D.left - p, D.right + p);
                        "number" === typeof t ? (r = r.height + 1,
                        I = S ? S.call(c, b, r, m) : a(z, t, u, b),
                        e.push({
                            align: S ? 0 : void 0,
                            anchorX: z,
                            anchorY: t,
                            boxWidth: b,
                            point: m,
                            rank: k(I.rank, u ? 1 : 0),
                            size: r,
                            target: I.y,
                            tt: q,
                            x: I.x
                        })) : q.isActive = !1
                    }
                    return e
                }, []);
                !S && e.some(function(a) {
                    var h = (c.outside ? M : 0) + a.anchorX;
                    return h < D.left && h + a.boxWidth < D.right ? !0 : h < M - D.left + a.boxWidth && D.right - h > h
                }) && (e = e.map(function(h) {
                    var f = a(h.anchorX, h.anchorY, h.point.isHeader, h.boxWidth, !1);
                    return b(h, {
                        target: f.y,
                        x: f.x
                    })
                }));
                c.cleanSplit();
                x.distribute(e, H);
                var W = M
                  , ba = M;
                e.forEach(function(a) {
                    var h = a.x
                      , f = a.boxWidth;
                    a = a.isHeader;
                    a || (c.outside && M + h < W && (W = M + h),
                    !a && c.outside && W + f > ba && (ba = M + h))
                });
                e.forEach(function(a) {
                    var h = a.x
                      , f = a.anchorX
                      , b = a.pos
                      , e = a.point.isHeader;
                    b = {
                        visibility: "undefined" === typeof b ? "hidden" : "inherit",
                        x: h,
                        y: b + A,
                        anchorX: f,
                        anchorY: a.anchorY
                    };
                    if (c.outside && h < f) {
                        var m = M - W;
                        0 < m && (e || (b.x = h + m,
                        b.anchorX = f + m),
                        e && (b.x = (ba - W) / 2,
                        b.anchorX = f + m))
                    }
                    a.tt.attr(b)
                });
                e = c.container;
                w = c.renderer;
                c.outside && e && w && (r = aa.getBBox(),
                w.setSize(r.width + r.x, r.height + r.y, !1),
                e.style.left = W + "px",
                e.style.top = g + "px")
            }
            ;
            c.prototype.drawTracker = function() {
                if (this.followPointer || !this.options.stickOnContact)
                    this.tracker && this.tracker.destroy();
                else {
                    var b = this.chart
                      , c = this.label
                      , a = this.shared ? b.hoverPoints : b.hoverPoint;
                    if (c && a) {
                        var d = {
                            x: 0,
                            y: 0,
                            width: 0,
                            height: 0
                        };
                        a = this.getAnchor(a);
                        var g = c.getBBox();
                        a[0] += b.plotLeft - c.translateX;
                        a[1] += b.plotTop - c.translateY;
                        d.x = Math.min(0, a[0]);
                        d.y = Math.min(0, a[1]);
                        d.width = 0 > a[0] ? Math.max(Math.abs(a[0]), g.width - a[0]) : Math.max(Math.abs(a[0]), g.width);
                        d.height = 0 > a[1] ? Math.max(Math.abs(a[1]), g.height - Math.abs(a[1])) : Math.max(Math.abs(a[1]), g.height);
                        this.tracker ? this.tracker.attr(d) : (this.tracker = c.renderer.rect(d).addClass("highcharts-tracker").add(c),
                        b.styledMode || this.tracker.attr({
                            fill: "rgba(0,0,0,0)"
                        }))
                    }
                }
            }
            ;
            c.prototype.styledModeFormat = function(b) {
                return b.replace('style="font-size: 10px"', 'class="highcharts-header"').replace(/style="color:{(point|series)\.color}"/g, 'class="highcharts-color-{$1.colorIndex}"')
            }
            ;
            c.prototype.tooltipFooterHeaderFormatter = function(b, c) {
                var a = c ? "footer" : "header"
                  , e = b.series
                  , d = e.tooltipOptions
                  , r = d.xDateFormat
                  , k = e.xAxis
                  , m = k && "datetime" === k.options.type && D(b.key)
                  , f = d[a + "Format"];
                c = {
                    isFooter: c,
                    labelConfig: b
                };
                g(this, "headerFormatter", c, function(a) {
                    m && !r && (r = this.getXDateFormat(b, d, k));
                    m && r && (b.point && b.point.tooltipDateKeys || ["key"]).forEach(function(a) {
                        f = f.replace("{point." + a + "}", "{point." + a + ":" + r + "}")
                    });
                    e.chart.styledMode && (f = this.styledModeFormat(f));
                    a.text = n(f, {
                        point: b,
                        series: e
                    }, this.chart)
                });
                return c.text
            }
            ;
            c.prototype.update = function(b) {
                this.destroy();
                v(!0, this.chart.options.tooltip.userOptions, b);
                this.init(this.chart, v(!0, this.options, b))
            }
            ;
            c.prototype.updatePosition = function(b) {
                var e = this.chart
                  , a = e.pointer
                  , c = this.getLabel()
                  , d = b.plotX + e.plotLeft;
                e = b.plotY + e.plotTop;
                a = a.getChartPosition();
                b = (this.options.positioner || this.getPosition).call(this, c.width, c.height, b);
                if (this.outside) {
                    var g = (this.options.borderWidth || 0) + 2 * this.distance;
                    this.renderer.setSize(c.width + g, c.height + g, !1);
                    if (1 !== a.scaleX || 1 !== a.scaleY)
                        p(this.container, {
                            transform: "scale(" + a.scaleX + ", " + a.scaleY + ")"
                        }),
                        d *= a.scaleX,
                        e *= a.scaleY;
                    d += a.left - b.x;
                    e += a.top - b.y
                }
                this.move(Math.round(b.x), Math.round(b.y || 0), d, e)
            }
            ;
            return c
        }();
        x.Tooltip = c;
        return x.Tooltip
    });
    P(c, "Core/Pointer.js", [c["Core/Color/Color.js"], c["Core/Globals.js"], c["Core/Color/Palette.js"], c["Core/Tooltip.js"], c["Core/Utilities.js"]], function(c, x, E, H, A) {
        var n = c.parse
          , G = x.charts
          , J = x.noop
          , p = A.addEvent
          , d = A.attr
          , l = A.css
          , b = A.defined
          , g = A.extend
          , N = A.find
          , D = A.fireEvent
          , y = A.isNumber
          , v = A.isObject
          , k = A.objectEach
          , L = A.offset
          , M = A.pick
          , B = A.splat;
        c = function() {
            function c(b, c) {
                this.lastValidTouch = {};
                this.pinchDown = [];
                this.runChartClick = !1;
                this.eventsToUnbind = [];
                this.chart = b;
                this.hasDragged = !1;
                this.options = c;
                this.init(b, c)
            }
            c.prototype.applyInactiveState = function(b) {
                var e = [], a;
                (b || []).forEach(function(b) {
                    a = b.series;
                    e.push(a);
                    a.linkedParent && e.push(a.linkedParent);
                    a.linkedSeries && (e = e.concat(a.linkedSeries));
                    a.navigatorSeries && e.push(a.navigatorSeries)
                });
                this.chart.series.forEach(function(a) {
                    -1 === e.indexOf(a) ? a.setState("inactive", !0) : a.options.inactiveOtherPoints && a.setAllPointsToState("inactive")
                })
            }
            ;
            c.prototype.destroy = function() {
                var b = this;
                this.eventsToUnbind.forEach(function(b) {
                    return b()
                });
                this.eventsToUnbind = [];
                x.chartCount || (c.unbindDocumentMouseUp && (c.unbindDocumentMouseUp = c.unbindDocumentMouseUp()),
                c.unbindDocumentTouchEnd && (c.unbindDocumentTouchEnd = c.unbindDocumentTouchEnd()));
                clearInterval(b.tooltipTimeout);
                k(b, function(e, a) {
                    b[a] = void 0
                })
            }
            ;
            c.prototype.drag = function(b) {
                var e = this.chart
                  , a = e.options.chart
                  , c = this.zoomHor
                  , d = this.zoomVert
                  , g = e.plotLeft
                  , k = e.plotTop
                  , m = e.plotWidth
                  , f = e.plotHeight
                  , K = this.mouseDownX || 0
                  , h = this.mouseDownY || 0
                  , u = v(a.panning) ? a.panning && a.panning.enabled : a.panning
                  , l = a.panKey && b[a.panKey + "Key"]
                  , w = b.chartX
                  , t = b.chartY
                  , p = this.selectionMarker;
                if (!p || !p.touch)
                    if (w < g ? w = g : w > g + m && (w = g + m),
                    t < k ? t = k : t > k + f && (t = k + f),
                    this.hasDragged = Math.sqrt(Math.pow(K - w, 2) + Math.pow(h - t, 2)),
                    10 < this.hasDragged) {
                        var B = e.isInsidePlot(K - g, h - k, {
                            visiblePlotOnly: !0
                        });
                        e.hasCartesianSeries && (this.zoomX || this.zoomY) && B && !l && !p && (this.selectionMarker = p = e.renderer.rect(g, k, c ? 1 : m, d ? 1 : f, 0).attr({
                            "class": "highcharts-selection-marker",
                            zIndex: 7
                        }).add(),
                        e.styledMode || p.attr({
                            fill: a.selectionMarkerFill || n(E.highlightColor80).setOpacity(.25).get()
                        }));
                        p && c && (c = w - K,
                        p.attr({
                            width: Math.abs(c),
                            x: (0 < c ? 0 : c) + K
                        }));
                        p && d && (c = t - h,
                        p.attr({
                            height: Math.abs(c),
                            y: (0 < c ? 0 : c) + h
                        }));
                        B && !p && u && e.pan(b, a.panning)
                    }
            }
            ;
            c.prototype.dragStart = function(b) {
                var e = this.chart;
                e.mouseIsDown = b.type;
                e.cancelClick = !1;
                e.mouseDownX = this.mouseDownX = b.chartX;
                e.mouseDownY = this.mouseDownY = b.chartY
            }
            ;
            c.prototype.drop = function(e) {
                var c = this
                  , a = this.chart
                  , d = this.hasPinched;
                if (this.selectionMarker) {
                    var k = {
                        originalEvent: e,
                        xAxis: [],
                        yAxis: []
                    }, C = this.selectionMarker, z = C.attr ? C.attr("x") : C.x, m = C.attr ? C.attr("y") : C.y, f = C.attr ? C.attr("width") : C.width, K = C.attr ? C.attr("height") : C.height, h;
                    if (this.hasDragged || d)
                        a.axes.forEach(function(a) {
                            if (a.zoomEnabled && b(a.min) && (d || c[{
                                xAxis: "zoomX",
                                yAxis: "zoomY"
                            }[a.coll]]) && y(z) && y(m)) {
                                var g = a.horiz
                                  , u = "touchend" === e.type ? a.minPixelPadding : 0
                                  , q = a.toValue((g ? z : m) + u);
                                g = a.toValue((g ? z + f : m + K) - u);
                                k[a.coll].push({
                                    axis: a,
                                    min: Math.min(q, g),
                                    max: Math.max(q, g)
                                });
                                h = !0
                            }
                        }),
                        h && D(a, "selection", k, function(h) {
                            a.zoom(g(h, d ? {
                                animation: !1
                            } : null))
                        });
                    y(a.index) && (this.selectionMarker = this.selectionMarker.destroy());
                    d && this.scaleGroups()
                }
                a && y(a.index) && (l(a.container, {
                    cursor: a._cursor
                }),
                a.cancelClick = 10 < this.hasDragged,
                a.mouseIsDown = this.hasDragged = this.hasPinched = !1,
                this.pinchDown = [])
            }
            ;
            c.prototype.findNearestKDPoint = function(b, c, a) {
                var e = this.chart
                  , d = e.hoverPoint;
                e = e.tooltip;
                if (d && e && e.isStickyOnContact())
                    return d;
                var g;
                b.forEach(function(b) {
                    var e = !(b.noSharedTooltip && c) && 0 > b.options.findNearestPointBy.indexOf("y");
                    b = b.searchPoint(a, e);
                    if ((e = v(b, !0) && b.series) && !(e = !v(g, !0))) {
                        e = g.distX - b.distX;
                        var f = g.dist - b.dist
                          , d = (b.series.group && b.series.group.zIndex) - (g.series.group && g.series.group.zIndex);
                        e = 0 < (0 !== e && c ? e : 0 !== f ? f : 0 !== d ? d : g.series.index > b.series.index ? -1 : 1)
                    }
                    e && (g = b)
                });
                return g
            }
            ;
            c.prototype.getChartCoordinatesFromPoint = function(b, c) {
                var a = b.series
                  , e = a.xAxis;
                a = a.yAxis;
                var d = b.shapeArgs;
                if (e && a) {
                    var g = M(b.clientX, b.plotX)
                      , r = b.plotY || 0;
                    b.isNode && d && y(d.x) && y(d.y) && (g = d.x,
                    r = d.y);
                    return c ? {
                        chartX: a.len + a.pos - r,
                        chartY: e.len + e.pos - g
                    } : {
                        chartX: g + e.pos,
                        chartY: r + a.pos
                    }
                }
                if (d && d.x && d.y)
                    return {
                        chartX: d.x,
                        chartY: d.y
                    }
            }
            ;
            c.prototype.getChartPosition = function() {
                if (this.chartPosition)
                    return this.chartPosition;
                var b = this.chart.container
                  , c = L(b);
                this.chartPosition = {
                    left: c.left,
                    top: c.top,
                    scaleX: 1,
                    scaleY: 1
                };
                var a = b.offsetWidth;
                b = b.offsetHeight;
                2 < a && 2 < b && (this.chartPosition.scaleX = c.width / a,
                this.chartPosition.scaleY = c.height / b);
                return this.chartPosition
            }
            ;
            c.prototype.getCoordinates = function(b) {
                var e = {
                    xAxis: [],
                    yAxis: []
                };
                this.chart.axes.forEach(function(a) {
                    e[a.isXAxis ? "xAxis" : "yAxis"].push({
                        axis: a,
                        value: a.toValue(b[a.horiz ? "chartX" : "chartY"])
                    })
                });
                return e
            }
            ;
            c.prototype.getHoverData = function(b, c, a, d, g, k) {
                var e = [];
                d = !(!d || !b);
                var m = {
                    chartX: k ? k.chartX : void 0,
                    chartY: k ? k.chartY : void 0,
                    shared: g
                };
                D(this, "beforeGetHoverData", m);
                var f = c && !c.stickyTracking ? [c] : a.filter(function(a) {
                    return m.filter ? m.filter(a) : a.visible && !(!g && a.directTouch) && M(a.options.enableMouseTracking, !0) && a.stickyTracking
                });
                var q = d || !k ? b : this.findNearestKDPoint(f, g, k);
                c = q && q.series;
                q && (g && !c.noSharedTooltip ? (f = a.filter(function(a) {
                    return m.filter ? m.filter(a) : a.visible && !(!g && a.directTouch) && M(a.options.enableMouseTracking, !0) && !a.noSharedTooltip
                }),
                f.forEach(function(a) {
                    var h = N(a.points, function(a) {
                        return a.x === q.x && !a.isNull
                    });
                    v(h) && (a.chart.isBoosting && (h = a.getPoint(h)),
                    e.push(h))
                })) : e.push(q));
                m = {
                    hoverPoint: q
                };
                D(this, "afterGetHoverData", m);
                return {
                    hoverPoint: m.hoverPoint,
                    hoverSeries: c,
                    hoverPoints: e
                }
            }
            ;
            c.prototype.getPointFromEvent = function(b) {
                b = b.target;
                for (var e; b && !e; )
                    e = b.point,
                    b = b.parentNode;
                return e
            }
            ;
            c.prototype.onTrackerMouseOut = function(b) {
                b = b.relatedTarget || b.toElement;
                var e = this.chart.hoverSeries;
                this.isDirectTouch = !1;
                if (!(!e || !b || e.stickyTracking || this.inClass(b, "highcharts-tooltip") || this.inClass(b, "highcharts-series-" + e.index) && this.inClass(b, "highcharts-tracker")))
                    e.onMouseOut()
            }
            ;
            c.prototype.inClass = function(b, c) {
                for (var a; b; ) {
                    if (a = d(b, "class")) {
                        if (-1 !== a.indexOf(c))
                            return !0;
                        if (-1 !== a.indexOf("highcharts-container"))
                            return !1
                    }
                    b = b.parentNode
                }
            }
            ;
            c.prototype.init = function(b, c) {
                this.options = c;
                this.chart = b;
                this.runChartClick = !(!c.chart.events || !c.chart.events.click);
                this.pinchDown = [];
                this.lastValidTouch = {};
                H && (b.tooltip = new H(b,c.tooltip),
                this.followTouchMove = M(c.tooltip.followTouchMove, !0));
                this.setDOMEvents()
            }
            ;
            c.prototype.normalize = function(b, c) {
                var a = b.touches
                  , e = a ? a.length ? a.item(0) : M(a.changedTouches, b.changedTouches)[0] : b;
                c || (c = this.getChartPosition());
                a = e.pageX - c.left;
                e = e.pageY - c.top;
                a /= c.scaleX;
                e /= c.scaleY;
                return g(b, {
                    chartX: Math.round(a),
                    chartY: Math.round(e)
                })
            }
            ;
            c.prototype.onContainerClick = function(b) {
                var e = this.chart
                  , a = e.hoverPoint;
                b = this.normalize(b);
                var c = e.plotLeft
                  , d = e.plotTop;
                e.cancelClick || (a && this.inClass(b.target, "highcharts-tracker") ? (D(a.series, "click", g(b, {
                    point: a
                })),
                e.hoverPoint && a.firePointEvent("click", b)) : (g(b, this.getCoordinates(b)),
                e.isInsidePlot(b.chartX - c, b.chartY - d, {
                    visiblePlotOnly: !0
                }) && D(e, "click", b)))
            }
            ;
            c.prototype.onContainerMouseDown = function(b) {
                var e = 1 === ((b.buttons || b.button) & 1);
                b = this.normalize(b);
                if (x.isFirefox && 0 !== b.button)
                    this.onContainerMouseMove(b);
                if ("undefined" === typeof b.button || e)
                    this.zoomOption(b),
                    e && b.preventDefault && b.preventDefault(),
                    this.dragStart(b)
            }
            ;
            c.prototype.onContainerMouseLeave = function(b) {
                var e = G[M(c.hoverChartIndex, -1)]
                  , a = this.chart.tooltip;
                b = this.normalize(b);
                e && (b.relatedTarget || b.toElement) && (e.pointer.reset(),
                e.pointer.chartPosition = void 0);
                a && !a.isHidden && this.reset()
            }
            ;
            c.prototype.onContainerMouseEnter = function(b) {
                delete this.chartPosition
            }
            ;
            c.prototype.onContainerMouseMove = function(b) {
                var e = this.chart;
                b = this.normalize(b);
                this.setHoverChartIndex();
                b.preventDefault || (b.returnValue = !1);
                ("mousedown" === e.mouseIsDown || this.touchSelect(b)) && this.drag(b);
                e.openMenu || !this.inClass(b.target, "highcharts-tracker") && !e.isInsidePlot(b.chartX - e.plotLeft, b.chartY - e.plotTop, {
                    visiblePlotOnly: !0
                }) || (this.inClass(b.target, "highcharts-no-tooltip") ? this.reset(!1, 0) : this.runPointActions(b))
            }
            ;
            c.prototype.onDocumentTouchEnd = function(b) {
                var e = G[M(c.hoverChartIndex, -1)];
                e && e.pointer.drop(b)
            }
            ;
            c.prototype.onContainerTouchMove = function(b) {
                if (this.touchSelect(b))
                    this.onContainerMouseMove(b);
                else
                    this.touch(b)
            }
            ;
            c.prototype.onContainerTouchStart = function(b) {
                if (this.touchSelect(b))
                    this.onContainerMouseDown(b);
                else
                    this.zoomOption(b),
                    this.touch(b, !0)
            }
            ;
            c.prototype.onDocumentMouseMove = function(b) {
                var e = this.chart
                  , a = this.chartPosition;
                b = this.normalize(b, a);
                var c = e.tooltip;
                !a || c && c.isStickyOnContact() || e.isInsidePlot(b.chartX - e.plotLeft, b.chartY - e.plotTop, {
                    visiblePlotOnly: !0
                }) || this.inClass(b.target, "highcharts-tracker") || this.reset()
            }
            ;
            c.prototype.onDocumentMouseUp = function(b) {
                var e = G[M(c.hoverChartIndex, -1)];
                e && e.pointer.drop(b)
            }
            ;
            c.prototype.pinch = function(b) {
                var e = this
                  , a = e.chart
                  , c = e.pinchDown
                  , d = b.touches || []
                  , k = d.length
                  , z = e.lastValidTouch
                  , m = e.hasZoom
                  , f = {}
                  , K = 1 === k && (e.inClass(b.target, "highcharts-tracker") && a.runTrackerClick || e.runChartClick)
                  , h = {}
                  , u = e.selectionMarker;
                1 < k && (e.initiated = !0);
                m && e.initiated && !K && !1 !== b.cancelable && b.preventDefault();
                [].map.call(d, function(a) {
                    return e.normalize(a)
                });
                "touchstart" === b.type ? ([].forEach.call(d, function(a, b) {
                    c[b] = {
                        chartX: a.chartX,
                        chartY: a.chartY
                    }
                }),
                z.x = [c[0].chartX, c[1] && c[1].chartX],
                z.y = [c[0].chartY, c[1] && c[1].chartY],
                a.axes.forEach(function(b) {
                    if (b.zoomEnabled) {
                        var h = a.bounds[b.horiz ? "h" : "v"]
                          , f = b.minPixelPadding
                          , e = b.toPixels(Math.min(M(b.options.min, b.dataMin), b.dataMin))
                          , c = b.toPixels(Math.max(M(b.options.max, b.dataMax), b.dataMax))
                          , d = Math.max(e, c);
                        h.min = Math.min(b.pos, Math.min(e, c) - f);
                        h.max = Math.max(b.pos + b.len, d + f)
                    }
                }),
                e.res = !0) : e.followTouchMove && 1 === k ? this.runPointActions(e.normalize(b)) : c.length && (u || (e.selectionMarker = u = g({
                    destroy: J,
                    touch: !0
                }, a.plotBox)),
                e.pinchTranslate(c, d, f, u, h, z),
                e.hasPinched = m,
                e.scaleGroups(f, h),
                e.res && (e.res = !1,
                this.reset(!1, 0)))
            }
            ;
            c.prototype.pinchTranslate = function(b, c, a, d, g, k) {
                this.zoomHor && this.pinchTranslateDirection(!0, b, c, a, d, g, k);
                this.zoomVert && this.pinchTranslateDirection(!1, b, c, a, d, g, k)
            }
            ;
            c.prototype.pinchTranslateDirection = function(b, c, a, d, g, k, z, m) {
                var f = this.chart
                  , e = b ? "x" : "y"
                  , h = b ? "X" : "Y"
                  , u = "chart" + h
                  , q = b ? "width" : "height"
                  , r = f["plot" + (b ? "Left" : "Top")]
                  , t = f.inverted
                  , I = f.bounds[b ? "h" : "v"]
                  , C = 1 === c.length
                  , w = c[0][u]
                  , l = !C && c[1][u];
                c = function() {
                    "number" === typeof y && 20 < Math.abs(w - l) && (n = m || Math.abs(B - y) / Math.abs(w - l));
                    p = (r - B) / n + w;
                    v = f["plot" + (b ? "Width" : "Height")] / n
                }
                ;
                var v, p, n = m || 1, B = a[0][u], y = !C && a[1][u];
                c();
                a = p;
                if (a < I.min) {
                    a = I.min;
                    var D = !0
                } else
                    a + v > I.max && (a = I.max - v,
                    D = !0);
                D ? (B -= .8 * (B - z[e][0]),
                "number" === typeof y && (y -= .8 * (y - z[e][1])),
                c()) : z[e] = [B, y];
                t || (k[e] = p - r,
                k[q] = v);
                k = t ? 1 / n : n;
                g[q] = v;
                g[e] = a;
                d[t ? b ? "scaleY" : "scaleX" : "scale" + h] = n;
                d["translate" + h] = k * r + (B - k * w)
            }
            ;
            c.prototype.reset = function(b, c) {
                var a = this.chart
                  , e = a.hoverSeries
                  , d = a.hoverPoint
                  , g = a.hoverPoints
                  , k = a.tooltip
                  , m = k && k.shared ? g : d;
                b && m && B(m).forEach(function(a) {
                    a.series.isCartesian && "undefined" === typeof a.plotX && (b = !1)
                });
                if (b)
                    k && m && B(m).length && (k.refresh(m),
                    k.shared && g ? g.forEach(function(a) {
                        a.setState(a.state, !0);
                        a.series.isCartesian && (a.series.xAxis.crosshair && a.series.xAxis.drawCrosshair(null, a),
                        a.series.yAxis.crosshair && a.series.yAxis.drawCrosshair(null, a))
                    }) : d && (d.setState(d.state, !0),
                    a.axes.forEach(function(a) {
                        a.crosshair && d.series[a.coll] === a && a.drawCrosshair(null, d)
                    })));
                else {
                    if (d)
                        d.onMouseOut();
                    g && g.forEach(function(a) {
                        a.setState()
                    });
                    if (e)
                        e.onMouseOut();
                    k && k.hide(c);
                    this.unDocMouseMove && (this.unDocMouseMove = this.unDocMouseMove());
                    a.axes.forEach(function(a) {
                        a.hideCrosshair()
                    });
                    this.hoverX = a.hoverPoints = a.hoverPoint = null
                }
            }
            ;
            c.prototype.runPointActions = function(b, d) {
                var a = this.chart
                  , e = a.tooltip && a.tooltip.options.enabled ? a.tooltip : void 0
                  , g = e ? e.shared : !1
                  , k = d || a.hoverPoint
                  , z = k && k.series || a.hoverSeries;
                d = this.getHoverData(k, z, a.series, (!b || "touchmove" !== b.type) && (!!d || z && z.directTouch && this.isDirectTouch), g, b);
                k = d.hoverPoint;
                z = d.hoverSeries;
                var m = d.hoverPoints;
                d = z && z.tooltipOptions.followPointer && !z.tooltipOptions.split;
                g = g && z && !z.noSharedTooltip;
                if (k && (k !== a.hoverPoint || e && e.isHidden)) {
                    (a.hoverPoints || []).forEach(function(a) {
                        -1 === m.indexOf(a) && a.setState()
                    });
                    if (a.hoverSeries !== z)
                        z.onMouseOver();
                    this.applyInactiveState(m);
                    (m || []).forEach(function(a) {
                        a.setState("hover")
                    });
                    a.hoverPoint && a.hoverPoint.firePointEvent("mouseOut");
                    if (!k.series)
                        return;
                    a.hoverPoints = m;
                    a.hoverPoint = k;
                    k.firePointEvent("mouseOver");
                    e && e.refresh(g ? m : k, b)
                } else
                    d && e && !e.isHidden && (k = e.getAnchor([{}], b),
                    a.isInsidePlot(k[0], k[1], {
                        visiblePlotOnly: !0
                    }) && e.updatePosition({
                        plotX: k[0],
                        plotY: k[1]
                    }));
                this.unDocMouseMove || (this.unDocMouseMove = p(a.container.ownerDocument, "mousemove", function(a) {
                    var b = G[c.hoverChartIndex];
                    if (b)
                        b.pointer.onDocumentMouseMove(a)
                }),
                this.eventsToUnbind.push(this.unDocMouseMove));
                a.axes.forEach(function(f) {
                    var e = M((f.crosshair || {}).snap, !0), h;
                    e && ((h = a.hoverPoint) && h.series[f.coll] === f || (h = N(m, function(a) {
                        return a.series[f.coll] === f
                    })));
                    h || !e ? f.drawCrosshair(b, h) : f.hideCrosshair()
                })
            }
            ;
            c.prototype.scaleGroups = function(b, c) {
                var a = this.chart;
                a.series.forEach(function(e) {
                    var d = b || e.getPlotBox();
                    e.xAxis && e.xAxis.zoomEnabled && e.group && (e.group.attr(d),
                    e.markerGroup && (e.markerGroup.attr(d),
                    e.markerGroup.clip(c ? a.clipRect : null)),
                    e.dataLabelsGroup && e.dataLabelsGroup.attr(d))
                });
                a.clipRect.attr(c || a.clipBox)
            }
            ;
            c.prototype.setDOMEvents = function() {
                var b = this
                  , d = this.chart.container
                  , a = d.ownerDocument;
                d.onmousedown = this.onContainerMouseDown.bind(this);
                d.onmousemove = this.onContainerMouseMove.bind(this);
                d.onclick = this.onContainerClick.bind(this);
                this.eventsToUnbind.push(p(d, "mouseenter", this.onContainerMouseEnter.bind(this)));
                this.eventsToUnbind.push(p(d, "mouseleave", this.onContainerMouseLeave.bind(this)));
                c.unbindDocumentMouseUp || (c.unbindDocumentMouseUp = p(a, "mouseup", this.onDocumentMouseUp.bind(this)));
                for (var g = this.chart.renderTo.parentElement; g && "BODY" !== g.tagName; )
                    this.eventsToUnbind.push(p(g, "scroll", function() {
                        delete b.chartPosition
                    })),
                    g = g.parentElement;
                x.hasTouch && (this.eventsToUnbind.push(p(d, "touchstart", this.onContainerTouchStart.bind(this), {
                    passive: !1
                })),
                this.eventsToUnbind.push(p(d, "touchmove", this.onContainerTouchMove.bind(this), {
                    passive: !1
                })),
                c.unbindDocumentTouchEnd || (c.unbindDocumentTouchEnd = p(a, "touchend", this.onDocumentTouchEnd.bind(this), {
                    passive: !1
                })))
            }
            ;
            c.prototype.setHoverChartIndex = function() {
                var b = this.chart
                  , d = x.charts[M(c.hoverChartIndex, -1)];
                if (d && d !== b)
                    d.pointer.onContainerMouseLeave({
                        relatedTarget: !0
                    });
                d && d.mouseIsDown || (c.hoverChartIndex = b.index)
            }
            ;
            c.prototype.touch = function(b, c) {
                var a = this.chart, e;
                this.setHoverChartIndex();
                if (1 === b.touches.length)
                    if (b = this.normalize(b),
                    (e = a.isInsidePlot(b.chartX - a.plotLeft, b.chartY - a.plotTop, {
                        visiblePlotOnly: !0
                    })) && !a.openMenu) {
                        c && this.runPointActions(b);
                        if ("touchmove" === b.type) {
                            c = this.pinchDown;
                            var d = c[0] ? 4 <= Math.sqrt(Math.pow(c[0].chartX - b.chartX, 2) + Math.pow(c[0].chartY - b.chartY, 2)) : !1
                        }
                        M(d, !0) && this.pinch(b)
                    } else
                        c && this.reset();
                else
                    2 === b.touches.length && this.pinch(b)
            }
            ;
            c.prototype.touchSelect = function(b) {
                return !(!this.chart.options.chart.zoomBySingleTouch || !b.touches || 1 !== b.touches.length)
            }
            ;
            c.prototype.zoomOption = function(b) {
                var e = this.chart
                  , a = e.options.chart;
                e = e.inverted;
                var c = a.zoomType || "";
                /touch/.test(b.type) && (c = M(a.pinchType, c));
                this.zoomX = b = /x/.test(c);
                this.zoomY = a = /y/.test(c);
                this.zoomHor = b && !e || a && e;
                this.zoomVert = a && !e || b && e;
                this.hasZoom = b || a
            }
            ;
            return c
        }();
        "";
        return c
    });
    P(c, "Core/MSPointer.js", [c["Core/Globals.js"], c["Core/Pointer.js"], c["Core/Utilities.js"]], function(c, x, E) {
        function n() {
            var b = [];
            b.item = function(b) {
                return this[b]
            }
            ;
            g(D, function(c) {
                b.push({
                    pageX: c.pageX,
                    pageY: c.pageY,
                    target: c.target
                })
            });
            return b
        }
        function A(b, c, d, g) {
            var k = G[x.hoverChartIndex || NaN];
            "touch" !== b.pointerType && b.pointerType !== b.MSPOINTER_TYPE_TOUCH || !k || (k = k.pointer,
            g(b),
            k[c]({
                type: d,
                target: b.currentTarget,
                preventDefault: p,
                touches: n()
            }))
        }
        var F = this && this.__extends || function() {
            var b = function(c, d) {
                b = Object.setPrototypeOf || {
                    __proto__: []
                }instanceof Array && function(b, c) {
                    b.__proto__ = c
                }
                || function(b, c) {
                    for (var d in c)
                        c.hasOwnProperty(d) && (b[d] = c[d])
                }
                ;
                return b(c, d)
            };
            return function(c, d) {
                function g() {
                    this.constructor = c
                }
                b(c, d);
                c.prototype = null === d ? Object.create(d) : (g.prototype = d.prototype,
                new g)
            }
        }()
          , G = c.charts
          , J = c.doc
          , p = c.noop
          , d = c.win
          , l = E.addEvent
          , b = E.css
          , g = E.objectEach
          , N = E.removeEvent
          , D = {}
          , y = !!d.PointerEvent;
        return function(g) {
            function k() {
                return null !== g && g.apply(this, arguments) || this
            }
            F(k, g);
            k.isRequired = function() {
                return !(c.hasTouch || !d.PointerEvent && !d.MSPointerEvent)
            }
            ;
            k.prototype.batchMSEvents = function(b) {
                b(this.chart.container, y ? "pointerdown" : "MSPointerDown", this.onContainerPointerDown);
                b(this.chart.container, y ? "pointermove" : "MSPointerMove", this.onContainerPointerMove);
                b(J, y ? "pointerup" : "MSPointerUp", this.onDocumentPointerUp)
            }
            ;
            k.prototype.destroy = function() {
                this.batchMSEvents(N);
                g.prototype.destroy.call(this)
            }
            ;
            k.prototype.init = function(c, d) {
                g.prototype.init.call(this, c, d);
                this.hasZoom && b(c.container, {
                    "-ms-touch-action": "none",
                    "touch-action": "none"
                })
            }
            ;
            k.prototype.onContainerPointerDown = function(b) {
                A(b, "onContainerTouchStart", "touchstart", function(b) {
                    D[b.pointerId] = {
                        pageX: b.pageX,
                        pageY: b.pageY,
                        target: b.currentTarget
                    }
                })
            }
            ;
            k.prototype.onContainerPointerMove = function(b) {
                A(b, "onContainerTouchMove", "touchmove", function(b) {
                    D[b.pointerId] = {
                        pageX: b.pageX,
                        pageY: b.pageY
                    };
                    D[b.pointerId].target || (D[b.pointerId].target = b.currentTarget)
                })
            }
            ;
            k.prototype.onDocumentPointerUp = function(b) {
                A(b, "onDocumentTouchEnd", "touchend", function(b) {
                    delete D[b.pointerId]
                })
            }
            ;
            k.prototype.setDOMEvents = function() {
                g.prototype.setDOMEvents.call(this);
                (this.hasZoom || this.followTouchMove) && this.batchMSEvents(l)
            }
            ;
            return k
        }(x)
    });
    P(c, "Core/Series/Point.js", [c["Core/Renderer/HTML/AST.js"], c["Core/Animation/AnimationUtilities.js"], c["Core/FormatUtilities.js"], c["Core/Globals.js"], c["Core/DefaultOptions.js"], c["Core/Utilities.js"]], function(c, x, E, H, A, F) {
        var n = x.animObject
          , J = E.format
          , p = A.defaultOptions
          , d = F.addEvent
          , l = F.defined
          , b = F.erase
          , g = F.extend
          , N = F.fireEvent
          , D = F.getNestedProperty
          , y = F.isArray
          , v = F.isFunction
          , k = F.isNumber
          , L = F.isObject
          , M = F.merge
          , B = F.objectEach
          , w = F.pick
          , e = F.syncTimeout
          , r = F.removeEvent
          , a = F.uniqueKey;
        "";
        x = function() {
            function q() {
                this.colorIndex = this.category = void 0;
                this.formatPrefix = "point";
                this.id = void 0;
                this.isNull = !1;
                this.percentage = this.options = this.name = void 0;
                this.selected = !1;
                this.total = this.series = void 0;
                this.visible = !0;
                this.x = void 0
            }
            q.prototype.animateBeforeDestroy = function() {
                var a = this, b = {
                    x: a.startXPos,
                    opacity: 0
                }, c, e = a.getGraphicalProps();
                e.singular.forEach(function(f) {
                    c = "dataLabel" === f;
                    a[f] = a[f].animate(c ? {
                        x: a[f].startXPos,
                        y: a[f].startYPos,
                        opacity: 0
                    } : b)
                });
                e.plural.forEach(function(b) {
                    a[b].forEach(function(b) {
                        b.element && b.animate(g({
                            x: a.startXPos
                        }, b.startYPos ? {
                            x: b.startXPos,
                            y: b.startYPos
                        } : {}))
                    })
                })
            }
            ;
            q.prototype.applyOptions = function(a, b) {
                var c = this.series
                  , e = c.options.pointValKey || c.pointValKey;
                a = q.prototype.optionsToObject.call(this, a);
                g(this, a);
                this.options = this.options ? g(this.options, a) : a;
                a.group && delete this.group;
                a.dataLabels && delete this.dataLabels;
                e && (this.y = q.prototype.getNestedProperty.call(this, e));
                this.formatPrefix = (this.isNull = w(this.isValid && !this.isValid(), null === this.x || !k(this.y))) ? "null" : "point";
                this.selected && (this.state = "select");
                "name"in this && "undefined" === typeof b && c.xAxis && c.xAxis.hasNames && (this.x = c.xAxis.nameToX(this));
                "undefined" === typeof this.x && c && (this.x = "undefined" === typeof b ? c.autoIncrement(this) : b);
                return this
            }
            ;
            q.prototype.destroy = function() {
                function a() {
                    if (c.graphic || c.dataLabel || c.dataLabels)
                        r(c),
                        c.destroyElements();
                    for (h in c)
                        c[h] = null
                }
                var c = this
                  , d = c.series
                  , m = d.chart;
                d = d.options.dataSorting;
                var f = m.hoverPoints, g = n(c.series.chart.renderer.globalAnimation), h;
                c.legendItem && m.legend.destroyItem(c);
                f && (c.setState(),
                b(f, c),
                f.length || (m.hoverPoints = null));
                if (c === m.hoverPoint)
                    c.onMouseOut();
                d && d.enabled ? (this.animateBeforeDestroy(),
                e(a, g.duration)) : a();
                m.pointCount--
            }
            ;
            q.prototype.destroyElements = function(a) {
                var b = this;
                a = b.getGraphicalProps(a);
                a.singular.forEach(function(a) {
                    b[a] = b[a].destroy()
                });
                a.plural.forEach(function(a) {
                    b[a].forEach(function(a) {
                        a.element && a.destroy()
                    });
                    delete b[a]
                })
            }
            ;
            q.prototype.firePointEvent = function(a, b, c) {
                var e = this
                  , f = this.series.options;
                (f.point.events[a] || e.options && e.options.events && e.options.events[a]) && e.importEvents();
                "click" === a && f.allowPointSelect && (c = function(a) {
                    e.select && e.select(null, a.ctrlKey || a.metaKey || a.shiftKey)
                }
                );
                N(e, a, b, c)
            }
            ;
            q.prototype.getClassName = function() {
                return "highcharts-point" + (this.selected ? " highcharts-point-select" : "") + (this.negative ? " highcharts-negative" : "") + (this.isNull ? " highcharts-null-point" : "") + ("undefined" !== typeof this.colorIndex ? " highcharts-color-" + this.colorIndex : "") + (this.options.className ? " " + this.options.className : "") + (this.zone && this.zone.className ? " " + this.zone.className.replace("highcharts-negative", "") : "")
            }
            ;
            q.prototype.getGraphicalProps = function(a) {
                var b = this, c = [], e, f = {
                    singular: [],
                    plural: []
                };
                a = a || {
                    graphic: 1,
                    dataLabel: 1
                };
                a.graphic && c.push("graphic", "upperGraphic", "shadowGroup");
                a.dataLabel && c.push("dataLabel", "dataLabelUpper", "connector");
                for (e = c.length; e--; ) {
                    var d = c[e];
                    b[d] && f.singular.push(d)
                }
                ["dataLabel", "connector"].forEach(function(h) {
                    var c = h + "s";
                    a[h] && b[c] && f.plural.push(c)
                });
                return f
            }
            ;
            q.prototype.getLabelConfig = function() {
                return {
                    x: this.category,
                    y: this.y,
                    color: this.color,
                    colorIndex: this.colorIndex,
                    key: this.name || this.category,
                    series: this.series,
                    point: this,
                    percentage: this.percentage,
                    total: this.total || this.stackTotal
                }
            }
            ;
            q.prototype.getNestedProperty = function(a) {
                if (a)
                    return 0 === a.indexOf("custom.") ? D(a, this.options) : this[a]
            }
            ;
            q.prototype.getZone = function() {
                var a = this.series
                  , b = a.zones;
                a = a.zoneAxis || "y";
                var c = 0, e;
                for (e = b[c]; this[a] >= e.value; )
                    e = b[++c];
                this.nonZonedColor || (this.nonZonedColor = this.color);
                this.color = e && e.color && !this.options.color ? e.color : this.nonZonedColor;
                return e
            }
            ;
            q.prototype.hasNewShapeType = function() {
                return (this.graphic && (this.graphic.symbolName || this.graphic.element.nodeName)) !== this.shapeType
            }
            ;
            q.prototype.init = function(b, c, e) {
                this.series = b;
                this.applyOptions(c, e);
                this.id = l(this.id) ? this.id : a();
                this.resolveColor();
                b.chart.pointCount++;
                N(this, "afterInit");
                return this
            }
            ;
            q.prototype.optionsToObject = function(a) {
                var b = {}
                  , c = this.series
                  , e = c.options.keys
                  , f = e || c.pointArrayMap || ["y"]
                  , d = f.length
                  , h = 0
                  , g = 0;
                if (k(a) || null === a)
                    b[f[0]] = a;
                else if (y(a))
                    for (!e && a.length > d && (c = typeof a[0],
                    "string" === c ? b.name = a[0] : "number" === c && (b.x = a[0]),
                    h++); g < d; )
                        e && "undefined" === typeof a[h] || (0 < f[g].indexOf(".") ? q.prototype.setNestedProperty(b, a[h], f[g]) : b[f[g]] = a[h]),
                        h++,
                        g++;
                else
                    "object" === typeof a && (b = a,
                    a.dataLabels && (c._hasPointLabels = !0),
                    a.marker && (c._hasPointMarkers = !0));
                return b
            }
            ;
            q.prototype.resolveColor = function() {
                var a = this.series;
                var b = a.chart.options.chart.colorCount;
                var c = a.chart.styledMode;
                delete this.nonZonedColor;
                if (a.options.colorByPoint) {
                    if (!c) {
                        b = a.options.colors || a.chart.options.colors;
                        var e = b[a.colorCounter];
                        b = b.length
                    }
                    c = a.colorCounter;
                    a.colorCounter++;
                    a.colorCounter === b && (a.colorCounter = 0)
                } else
                    c || (e = a.color),
                    c = a.colorIndex;
                this.colorIndex = w(this.options.colorIndex, c);
                this.color = w(this.options.color, e)
            }
            ;
            q.prototype.setNestedProperty = function(a, b, c) {
                c.split(".").reduce(function(a, f, c, h) {
                    a[f] = h.length - 1 === c ? b : L(a[f], !0) ? a[f] : {};
                    return a[f]
                }, a);
                return a
            }
            ;
            q.prototype.tooltipFormatter = function(a) {
                var b = this.series
                  , c = b.tooltipOptions
                  , e = w(c.valueDecimals, "")
                  , f = c.valuePrefix || ""
                  , d = c.valueSuffix || "";
                b.chart.styledMode && (a = b.chart.tooltip.styledModeFormat(a));
                (b.pointArrayMap || ["y"]).forEach(function(b) {
                    b = "{point." + b;
                    if (f || d)
                        a = a.replace(RegExp(b + "}", "g"), f + b + "}" + d);
                    a = a.replace(RegExp(b + "}", "g"), b + ":,." + e + "f}")
                });
                return J(a, {
                    point: this,
                    series: this.series
                }, b.chart)
            }
            ;
            q.prototype.update = function(a, b, c, e) {
                function f() {
                    d.applyOptions(a);
                    var f = m && d.hasDummyGraphic;
                    f = null === d.y ? !f : f;
                    m && f && (d.graphic = m.destroy(),
                    delete d.hasDummyGraphic);
                    L(a, !0) && (m && m.element && a && a.marker && "undefined" !== typeof a.marker.symbol && (d.graphic = m.destroy()),
                    a && a.dataLabels && d.dataLabel && (d.dataLabel = d.dataLabel.destroy()),
                    d.connector && (d.connector = d.connector.destroy()));
                    g = d.index;
                    h.updateParallelArrays(d, g);
                    q.data[g] = L(q.data[g], !0) || L(a, !0) ? d.options : w(a, q.data[g]);
                    h.isDirty = h.isDirtyData = !0;
                    !h.fixedBox && h.hasCartesianSeries && (k.isDirtyBox = !0);
                    "point" === q.legendType && (k.isDirtyLegend = !0);
                    b && k.redraw(c)
                }
                var d = this, h = d.series, m = d.graphic, g, k = h.chart, q = h.options;
                b = w(b, !0);
                !1 === e ? f() : d.firePointEvent("update", {
                    options: a
                }, f)
            }
            ;
            q.prototype.remove = function(a, b) {
                this.series.removePoint(this.series.data.indexOf(this), a, b)
            }
            ;
            q.prototype.select = function(a, b) {
                var c = this
                  , e = c.series
                  , f = e.chart;
                this.selectedStaging = a = w(a, !c.selected);
                c.firePointEvent(a ? "select" : "unselect", {
                    accumulate: b
                }, function() {
                    c.selected = c.options.selected = a;
                    e.options.data[e.data.indexOf(c)] = c.options;
                    c.setState(a && "select");
                    b || f.getSelectedPoints().forEach(function(a) {
                        var b = a.series;
                        a.selected && a !== c && (a.selected = a.options.selected = !1,
                        b.options.data[b.data.indexOf(a)] = a.options,
                        a.setState(f.hoverPoints && b.options.inactiveOtherPoints ? "inactive" : ""),
                        a.firePointEvent("unselect"))
                    })
                });
                delete this.selectedStaging
            }
            ;
            q.prototype.onMouseOver = function(a) {
                var b = this.series.chart
                  , c = b.pointer;
                a = a ? c.normalize(a) : c.getChartCoordinatesFromPoint(this, b.inverted);
                c.runPointActions(a, this)
            }
            ;
            q.prototype.onMouseOut = function() {
                var a = this.series.chart;
                this.firePointEvent("mouseOut");
                this.series.options.inactiveOtherPoints || (a.hoverPoints || []).forEach(function(a) {
                    a.setState()
                });
                a.hoverPoints = a.hoverPoint = null
            }
            ;
            q.prototype.importEvents = function() {
                if (!this.hasImportedEvents) {
                    var a = this
                      , b = M(a.series.options.point, a.options).events;
                    a.events = b;
                    B(b, function(b, c) {
                        v(b) && d(a, c, b)
                    });
                    this.hasImportedEvents = !0
                }
            }
            ;
            q.prototype.setState = function(a, b) {
                var e = this.series, d = this.state, f = e.options.states[a || "normal"] || {}, q = p.plotOptions[e.type].marker && e.options.marker, h = q && !1 === q.enabled, u = q && q.states && q.states[a || "normal"] || {}, r = !1 === u.enabled, l = e.stateMarkerGraphic, t = this.marker || {}, v = e.chart, n = e.halo, C, B = q && e.markerAttribs;
                a = a || "";
                if (!(a === this.state && !b || this.selected && "select" !== a || !1 === f.enabled || a && (r || h && !1 === u.enabled) || a && t.states && t.states[a] && !1 === t.states[a].enabled)) {
                    this.state = a;
                    B && (C = e.markerAttribs(this, a));
                    if (this.graphic && !this.hasDummyGraphic) {
                        d && this.graphic.removeClass("highcharts-point-" + d);
                        a && this.graphic.addClass("highcharts-point-" + a);
                        if (!v.styledMode) {
                            var S = e.pointAttribs(this, a);
                            var I = w(v.options.chart.animation, f.animation);
                            e.options.inactiveOtherPoints && k(S.opacity) && ((this.dataLabels || []).forEach(function(a) {
                                a && a.animate({
                                    opacity: S.opacity
                                }, I)
                            }),
                            this.connector && this.connector.animate({
                                opacity: S.opacity
                            }, I));
                            this.graphic.animate(S, I)
                        }
                        C && this.graphic.animate(C, w(v.options.chart.animation, u.animation, q.animation));
                        l && l.hide()
                    } else {
                        if (a && u) {
                            d = t.symbol || e.symbol;
                            l && l.currentSymbol !== d && (l = l.destroy());
                            if (C)
                                if (l)
                                    l[b ? "animate" : "attr"]({
                                        x: C.x,
                                        y: C.y
                                    });
                                else
                                    d && (e.stateMarkerGraphic = l = v.renderer.symbol(d, C.x, C.y, C.width, C.height).add(e.markerGroup),
                                    l.currentSymbol = d);
                            !v.styledMode && l && l.attr(e.pointAttribs(this, a))
                        }
                        l && (l[a && this.isInside ? "show" : "hide"](),
                        l.element.point = this)
                    }
                    f = f.halo;
                    C = (l = this.graphic || l) && l.visibility || "inherit";
                    f && f.size && l && "hidden" !== C && !this.isCluster ? (n || (e.halo = n = v.renderer.path().add(l.parentGroup)),
                    n.show()[b ? "animate" : "attr"]({
                        d: this.haloPath(f.size)
                    }),
                    n.attr({
                        "class": "highcharts-halo highcharts-color-" + w(this.colorIndex, e.colorIndex) + (this.className ? " " + this.className : ""),
                        visibility: C,
                        zIndex: -1
                    }),
                    n.point = this,
                    v.styledMode || n.attr(g({
                        fill: this.color || e.color,
                        "fill-opacity": f.opacity
                    }, c.filterUserAttributes(f.attributes || {})))) : n && n.point && n.point.haloPath && n.animate({
                        d: n.point.haloPath(0)
                    }, null, n.hide);
                    N(this, "afterSetState", {
                        state: a
                    })
                }
            }
            ;
            q.prototype.haloPath = function(a) {
                return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX) - a, this.plotY - a, 2 * a, 2 * a)
            }
            ;
            return q
        }();
        return H.Point = x
    });
    P(c, "Core/Legend.js", [c["Core/Animation/AnimationUtilities.js"], c["Core/FormatUtilities.js"], c["Core/Globals.js"], c["Core/Series/Point.js"], c["Core/Utilities.js"]], function(c, x, E, H, A) {
        var n = c.animObject
          , G = c.setAnimation
          , J = x.format;
        c = E.isFirefox;
        var p = E.marginNames;
        x = E.win;
        var d = A.addEvent
          , l = A.createElement
          , b = A.css
          , g = A.defined
          , N = A.discardElement
          , D = A.find
          , y = A.fireEvent
          , v = A.isNumber
          , k = A.merge
          , L = A.pick
          , M = A.relativeLength
          , B = A.stableSort
          , w = A.syncTimeout;
        A = A.wrap;
        var e = function() {
            function c(a, b) {
                this.allItems = [];
                this.contentGroup = this.box = void 0;
                this.display = !1;
                this.group = void 0;
                this.offsetWidth = this.maxLegendWidth = this.maxItemWidth = this.legendWidth = this.legendHeight = this.lastLineHeight = this.lastItemY = this.itemY = this.itemX = this.itemMarginTop = this.itemMarginBottom = this.itemHeight = this.initialItemY = 0;
                this.options = {};
                this.padding = 0;
                this.pages = [];
                this.proximate = !1;
                this.scrollGroup = void 0;
                this.widthOption = this.totalItemWidth = this.titleHeight = this.symbolWidth = this.symbolHeight = 0;
                this.chart = a;
                this.init(a, b)
            }
            c.prototype.init = function(a, b) {
                this.chart = a;
                this.setOptions(b);
                b.enabled && (this.render(),
                d(this.chart, "endResize", function() {
                    this.legend.positionCheckboxes()
                }),
                this.proximate ? this.unchartrender = d(this.chart, "render", function() {
                    this.legend.proximatePositions();
                    this.legend.positionItems()
                }) : this.unchartrender && this.unchartrender())
            }
            ;
            c.prototype.setOptions = function(a) {
                var b = L(a.padding, 8);
                this.options = a;
                this.chart.styledMode || (this.itemStyle = a.itemStyle,
                this.itemHiddenStyle = k(this.itemStyle, a.itemHiddenStyle));
                this.itemMarginTop = a.itemMarginTop || 0;
                this.itemMarginBottom = a.itemMarginBottom || 0;
                this.padding = b;
                this.initialItemY = b - 5;
                this.symbolWidth = L(a.symbolWidth, 16);
                this.pages = [];
                this.proximate = "proximate" === a.layout && !this.chart.inverted;
                this.baseline = void 0
            }
            ;
            c.prototype.update = function(a, b) {
                var c = this.chart;
                this.setOptions(k(!0, this.options, a));
                this.destroy();
                c.isDirtyLegend = c.isDirtyBox = !0;
                L(b, !0) && c.redraw();
                y(this, "afterUpdate")
            }
            ;
            c.prototype.colorizeItem = function(a, b) {
                a.legendGroup[b ? "removeClass" : "addClass"]("highcharts-legend-item-hidden");
                if (!this.chart.styledMode) {
                    var c = this.options
                      , e = a.legendItem
                      , d = a.legendLine
                      , m = a.legendSymbol
                      , f = this.itemHiddenStyle.color;
                    c = b ? c.itemStyle.color : f;
                    var g = b ? a.color || f : f
                      , h = a.options && a.options.marker
                      , u = {
                        fill: g
                    };
                    e && e.css({
                        fill: c,
                        color: c
                    });
                    d && d.attr({
                        stroke: g
                    });
                    m && (h && m.isMarker && (u = a.pointAttribs(),
                    b || (u.stroke = u.fill = f)),
                    m.attr(u))
                }
                y(this, "afterColorizeItem", {
                    item: a,
                    visible: b
                })
            }
            ;
            c.prototype.positionItems = function() {
                this.allItems.forEach(this.positionItem, this);
                this.chart.isResizing || this.positionCheckboxes()
            }
            ;
            c.prototype.positionItem = function(a) {
                var b = this
                  , c = this.options
                  , e = c.symbolPadding
                  , d = !c.rtl
                  , m = a._legendItemPos;
                c = m[0];
                m = m[1];
                var f = a.checkbox
                  , k = a.legendGroup;
                k && k.element && (e = {
                    translateX: d ? c : this.legendWidth - c - 2 * e - 4,
                    translateY: m
                },
                d = function() {
                    y(b, "afterPositionItem", {
                        item: a
                    })
                }
                ,
                g(k.translateY) ? k.animate(e, void 0, d) : (k.attr(e),
                d()));
                f && (f.x = c,
                f.y = m)
            }
            ;
            c.prototype.destroyItem = function(a) {
                var b = a.checkbox;
                ["legendItem", "legendLine", "legendSymbol", "legendGroup"].forEach(function(b) {
                    a[b] && (a[b] = a[b].destroy())
                });
                b && N(a.checkbox)
            }
            ;
            c.prototype.destroy = function() {
                function a(a) {
                    this[a] && (this[a] = this[a].destroy())
                }
                this.getAllItems().forEach(function(b) {
                    ["legendItem", "legendGroup"].forEach(a, b)
                });
                "clipRect up down pager nav box title group".split(" ").forEach(a, this);
                this.display = null
            }
            ;
            c.prototype.positionCheckboxes = function() {
                var a = this.group && this.group.alignAttr
                  , c = this.clipHeight || this.legendHeight
                  , e = this.titleHeight;
                if (a) {
                    var d = a.translateY;
                    this.allItems.forEach(function(g) {
                        var m = g.checkbox;
                        if (m) {
                            var f = d + e + m.y + (this.scrollOffset || 0) + 3;
                            b(m, {
                                left: a.translateX + g.checkboxOffset + m.x - 20 + "px",
                                top: f + "px",
                                display: this.proximate || f > d - 6 && f < d + c - 6 ? "" : "none"
                            })
                        }
                    }, this)
                }
            }
            ;
            c.prototype.renderTitle = function() {
                var a = this.options
                  , b = this.padding
                  , c = a.title
                  , e = 0;
                c.text && (this.title || (this.title = this.chart.renderer.label(c.text, b - 3, b - 4, null, null, null, a.useHTML, null, "legend-title").attr({
                    zIndex: 1
                }),
                this.chart.styledMode || this.title.css(c.style),
                this.title.add(this.group)),
                c.width || this.title.css({
                    width: this.maxLegendWidth + "px"
                }),
                a = this.title.getBBox(),
                e = a.height,
                this.offsetWidth = a.width,
                this.contentGroup.attr({
                    translateY: e
                }));
                this.titleHeight = e
            }
            ;
            c.prototype.setText = function(a) {
                var b = this.options;
                a.legendItem.attr({
                    text: b.labelFormat ? J(b.labelFormat, a, this.chart) : b.labelFormatter.call(a)
                })
            }
            ;
            c.prototype.renderItem = function(a) {
                var b = this.chart
                  , c = b.renderer
                  , e = this.options
                  , d = this.symbolWidth
                  , m = e.symbolPadding || 0
                  , f = this.itemStyle
                  , g = this.itemHiddenStyle
                  , h = "horizontal" === e.layout ? L(e.itemDistance, 20) : 0
                  , u = !e.rtl
                  , l = a.legendItem
                  , r = !a.series
                  , t = !r && a.series.drawLegendSymbol ? a.series : a
                  , w = t.options
                  , v = this.createCheckboxForItem && w && w.showCheckbox;
                w = d + m + h + (v ? 20 : 0);
                var n = e.useHTML
                  , p = a.options.className;
                l || (a.legendGroup = c.g("legend-item").addClass("highcharts-" + t.type + "-series highcharts-color-" + a.colorIndex + (p ? " " + p : "") + (r ? " highcharts-series-" + a.index : "")).attr({
                    zIndex: 1
                }).add(this.scrollGroup),
                a.legendItem = l = c.text("", u ? d + m : -m, this.baseline || 0, n),
                b.styledMode || l.css(k(a.visible ? f : g)),
                l.attr({
                    align: u ? "left" : "right",
                    zIndex: 2
                }).add(a.legendGroup),
                this.baseline || (this.fontMetrics = c.fontMetrics(b.styledMode ? 12 : f.fontSize, l),
                this.baseline = this.fontMetrics.f + 3 + this.itemMarginTop,
                l.attr("y", this.baseline),
                this.symbolHeight = e.symbolHeight || this.fontMetrics.f,
                e.squareSymbol && (this.symbolWidth = L(e.symbolWidth, Math.max(this.symbolHeight, 16)),
                w = this.symbolWidth + m + h + (v ? 20 : 0),
                u && l.attr("x", this.symbolWidth + m))),
                t.drawLegendSymbol(this, a),
                this.setItemEvents && this.setItemEvents(a, l, n));
                v && !a.checkbox && this.createCheckboxForItem && this.createCheckboxForItem(a);
                this.colorizeItem(a, a.visible);
                !b.styledMode && f.width || l.css({
                    width: (e.itemWidth || this.widthOption || b.spacingBox.width) - w + "px"
                });
                this.setText(a);
                b = l.getBBox();
                a.itemWidth = a.checkboxOffset = e.itemWidth || a.legendItemWidth || b.width + w;
                this.maxItemWidth = Math.max(this.maxItemWidth, a.itemWidth);
                this.totalItemWidth += a.itemWidth;
                this.itemHeight = a.itemHeight = Math.round(a.legendItemHeight || b.height || this.symbolHeight)
            }
            ;
            c.prototype.layoutItem = function(a) {
                var b = this.options
                  , c = this.padding
                  , e = "horizontal" === b.layout
                  , d = a.itemHeight
                  , m = this.itemMarginBottom
                  , f = this.itemMarginTop
                  , g = e ? L(b.itemDistance, 20) : 0
                  , h = this.maxLegendWidth;
                b = b.alignColumns && this.totalItemWidth > h ? this.maxItemWidth : a.itemWidth;
                e && this.itemX - c + b > h && (this.itemX = c,
                this.lastLineHeight && (this.itemY += f + this.lastLineHeight + m),
                this.lastLineHeight = 0);
                this.lastItemY = f + this.itemY + m;
                this.lastLineHeight = Math.max(d, this.lastLineHeight);
                a._legendItemPos = [this.itemX, this.itemY];
                e ? this.itemX += b : (this.itemY += f + d + m,
                this.lastLineHeight = d);
                this.offsetWidth = this.widthOption || Math.max((e ? this.itemX - c - (a.checkbox ? 0 : g) : b) + c, this.offsetWidth)
            }
            ;
            c.prototype.getAllItems = function() {
                var a = [];
                this.chart.series.forEach(function(b) {
                    var c = b && b.options;
                    b && L(c.showInLegend, g(c.linkedTo) ? !1 : void 0, !0) && (a = a.concat(b.legendItems || ("point" === c.legendType ? b.data : b)))
                });
                y(this, "afterGetAllItems", {
                    allItems: a
                });
                return a
            }
            ;
            c.prototype.getAlignment = function() {
                var a = this.options;
                return this.proximate ? a.align.charAt(0) + "tv" : a.floating ? "" : a.align.charAt(0) + a.verticalAlign.charAt(0) + a.layout.charAt(0)
            }
            ;
            c.prototype.adjustMargins = function(a, b) {
                var c = this.chart
                  , e = this.options
                  , d = this.getAlignment();
                d && [/(lth|ct|rth)/, /(rtv|rm|rbv)/, /(rbh|cb|lbh)/, /(lbv|lm|ltv)/].forEach(function(m, f) {
                    m.test(d) && !g(a[f]) && (c[p[f]] = Math.max(c[p[f]], c.legend[(f + 1) % 2 ? "legendHeight" : "legendWidth"] + [1, -1, -1, 1][f] * e[f % 2 ? "x" : "y"] + L(e.margin, 12) + b[f] + (c.titleOffset[f] || 0)))
                })
            }
            ;
            c.prototype.proximatePositions = function() {
                var a = this.chart
                  , b = []
                  , c = "left" === this.options.align;
                this.allItems.forEach(function(e) {
                    var d;
                    var m = c;
                    if (e.yAxis) {
                        e.xAxis.options.reversed && (m = !m);
                        e.points && (d = D(m ? e.points : e.points.slice(0).reverse(), function(a) {
                            return v(a.plotY)
                        }));
                        m = this.itemMarginTop + e.legendItem.getBBox().height + this.itemMarginBottom;
                        var f = e.yAxis.top - a.plotTop;
                        e.visible ? (d = d ? d.plotY : e.yAxis.height,
                        d += f - .3 * m) : d = f + e.yAxis.height;
                        b.push({
                            target: d,
                            size: m,
                            item: e
                        })
                    }
                }, this);
                E.distribute(b, a.plotHeight);
                b.forEach(function(b) {
                    b.item._legendItemPos[1] = a.plotTop - a.spacing[0] + b.pos
                })
            }
            ;
            c.prototype.render = function() {
                var a = this.chart
                  , b = a.renderer
                  , c = this.group
                  , e = this.box
                  , d = this.options
                  , m = this.padding;
                this.itemX = m;
                this.itemY = this.initialItemY;
                this.lastItemY = this.offsetWidth = 0;
                this.widthOption = M(d.width, a.spacingBox.width - m);
                var f = a.spacingBox.width - 2 * m - d.x;
                -1 < ["rm", "lm"].indexOf(this.getAlignment().substring(0, 2)) && (f /= 2);
                this.maxLegendWidth = this.widthOption || f;
                c || (this.group = c = b.g("legend").addClass(d.className || "").attr({
                    zIndex: 7
                }).add(),
                this.contentGroup = b.g().attr({
                    zIndex: 1
                }).add(c),
                this.scrollGroup = b.g().add(this.contentGroup));
                this.renderTitle();
                var g = this.getAllItems();
                B(g, function(a, b) {
                    return (a.options && a.options.legendIndex || 0) - (b.options && b.options.legendIndex || 0)
                });
                d.reversed && g.reverse();
                this.allItems = g;
                this.display = f = !!g.length;
                this.itemHeight = this.totalItemWidth = this.maxItemWidth = this.lastLineHeight = 0;
                g.forEach(this.renderItem, this);
                g.forEach(this.layoutItem, this);
                g = (this.widthOption || this.offsetWidth) + m;
                var h = this.lastItemY + this.lastLineHeight + this.titleHeight;
                h = this.handleOverflow(h);
                h += m;
                e || (this.box = e = b.rect().addClass("highcharts-legend-box").attr({
                    r: d.borderRadius
                }).add(c),
                e.isNew = !0);
                a.styledMode || e.attr({
                    stroke: d.borderColor,
                    "stroke-width": d.borderWidth || 0,
                    fill: d.backgroundColor || "none"
                }).shadow(d.shadow);
                0 < g && 0 < h && (e[e.isNew ? "attr" : "animate"](e.crisp.call({}, {
                    x: 0,
                    y: 0,
                    width: g,
                    height: h
                }, e.strokeWidth())),
                e.isNew = !1);
                e[f ? "show" : "hide"]();
                a.styledMode && "none" === c.getStyle("display") && (g = h = 0);
                this.legendWidth = g;
                this.legendHeight = h;
                f && this.align();
                this.proximate || this.positionItems();
                y(this, "afterRender")
            }
            ;
            c.prototype.align = function(a) {
                void 0 === a && (a = this.chart.spacingBox);
                var b = this.chart
                  , c = this.options
                  , e = a.y;
                /(lth|ct|rth)/.test(this.getAlignment()) && 0 < b.titleOffset[0] ? e += b.titleOffset[0] : /(lbh|cb|rbh)/.test(this.getAlignment()) && 0 < b.titleOffset[2] && (e -= b.titleOffset[2]);
                e !== a.y && (a = k(a, {
                    y: e
                }));
                this.group.align(k(c, {
                    width: this.legendWidth,
                    height: this.legendHeight,
                    verticalAlign: this.proximate ? "top" : c.verticalAlign
                }), !0, a)
            }
            ;
            c.prototype.handleOverflow = function(a) {
                var b = this
                  , c = this.chart
                  , e = c.renderer
                  , d = this.options
                  , g = d.y
                  , f = this.padding;
                g = c.spacingBox.height + ("top" === d.verticalAlign ? -g : g) - f;
                var k = d.maxHeight, h, u = this.clipRect, l = d.navigation, r = L(l.animation, !0), t = l.arrowSize || 12, w = this.nav, v = this.pages, n, p = this.allItems, S = function(a) {
                    "number" === typeof a ? u.attr({
                        height: a
                    }) : u && (b.clipRect = u.destroy(),
                    b.contentGroup.clip());
                    b.contentGroup.div && (b.contentGroup.div.style.clip = a ? "rect(" + f + "px,9999px," + (f + a) + "px,0)" : "auto")
                }, B = function(a) {
                    b[a] = e.circle(0, 0, 1.3 * t).translate(t / 2, t / 2).add(w);
                    c.styledMode || b[a].attr("fill", "rgba(0,0,0,0.0001)");
                    return b[a]
                };
                "horizontal" !== d.layout || "middle" === d.verticalAlign || d.floating || (g /= 2);
                k && (g = Math.min(g, k));
                v.length = 0;
                a && 0 < g && a > g && !1 !== l.enabled ? (this.clipHeight = h = Math.max(g - 20 - this.titleHeight - f, 0),
                this.currentPage = L(this.currentPage, 1),
                this.fullHeight = a,
                p.forEach(function(a, b) {
                    var c = a._legendItemPos[1]
                      , f = Math.round(a.legendItem.getBBox().height)
                      , e = v.length;
                    if (!e || c - v[e - 1] > h && (n || c) !== v[e - 1])
                        v.push(n || c),
                        e++;
                    a.pageIx = e - 1;
                    n && (p[b - 1].pageIx = e - 1);
                    b === p.length - 1 && c + f - v[e - 1] > h && c !== n && (v.push(c),
                    a.pageIx = e);
                    c !== n && (n = c)
                }),
                u || (u = b.clipRect = e.clipRect(0, f, 9999, 0),
                b.contentGroup.clip(u)),
                S(h),
                w || (this.nav = w = e.g().attr({
                    zIndex: 1
                }).add(this.group),
                this.up = e.symbol("triangle", 0, 0, t, t).add(w),
                B("upTracker").on("click", function() {
                    b.scroll(-1, r)
                }),
                this.pager = e.text("", 15, 10).addClass("highcharts-legend-navigation"),
                c.styledMode || this.pager.css(l.style),
                this.pager.add(w),
                this.down = e.symbol("triangle-down", 0, 0, t, t).add(w),
                B("downTracker").on("click", function() {
                    b.scroll(1, r)
                })),
                b.scroll(0),
                a = g) : w && (S(),
                this.nav = w.destroy(),
                this.scrollGroup.attr({
                    translateY: 1
                }),
                this.clipHeight = 0);
                return a
            }
            ;
            c.prototype.scroll = function(a, b) {
                var c = this
                  , e = this.chart
                  , d = this.pages
                  , g = d.length
                  , f = this.currentPage + a;
                a = this.clipHeight;
                var k = this.options.navigation
                  , h = this.pager
                  , u = this.padding;
                f > g && (f = g);
                0 < f && ("undefined" !== typeof b && G(b, e),
                this.nav.attr({
                    translateX: u,
                    translateY: a + this.padding + 7 + this.titleHeight,
                    visibility: "visible"
                }),
                [this.up, this.upTracker].forEach(function(a) {
                    a.attr({
                        "class": 1 === f ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
                    })
                }),
                h.attr({
                    text: f + "/" + g
                }),
                [this.down, this.downTracker].forEach(function(a) {
                    a.attr({
                        x: 18 + this.pager.getBBox().width,
                        "class": f === g ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
                    })
                }, this),
                e.styledMode || (this.up.attr({
                    fill: 1 === f ? k.inactiveColor : k.activeColor
                }),
                this.upTracker.css({
                    cursor: 1 === f ? "default" : "pointer"
                }),
                this.down.attr({
                    fill: f === g ? k.inactiveColor : k.activeColor
                }),
                this.downTracker.css({
                    cursor: f === g ? "default" : "pointer"
                })),
                this.scrollOffset = -d[f - 1] + this.initialItemY,
                this.scrollGroup.animate({
                    translateY: this.scrollOffset
                }),
                this.currentPage = f,
                this.positionCheckboxes(),
                b = n(L(b, e.renderer.globalAnimation, !0)),
                w(function() {
                    y(c, "afterScroll", {
                        currentPage: f
                    })
                }, b.duration))
            }
            ;
            c.prototype.setItemEvents = function(a, b, c) {
                var e = this
                  , d = e.chart.renderer.boxWrapper
                  , g = a instanceof H
                  , f = "highcharts-legend-" + (g ? "point" : "series") + "-active"
                  , q = e.chart.styledMode;
                (c ? [b, a.legendSymbol] : [a.legendGroup]).forEach(function(c) {
                    if (c)
                        c.on("mouseover", function() {
                            a.visible && e.allItems.forEach(function(b) {
                                a !== b && b.setState("inactive", !g)
                            });
                            a.setState("hover");
                            a.visible && d.addClass(f);
                            q || b.css(e.options.itemHoverStyle)
                        }).on("mouseout", function() {
                            e.chart.styledMode || b.css(k(a.visible ? e.itemStyle : e.itemHiddenStyle));
                            e.allItems.forEach(function(b) {
                                a !== b && b.setState("", !g)
                            });
                            d.removeClass(f);
                            a.setState()
                        }).on("click", function(b) {
                            var c = function() {
                                a.setVisible && a.setVisible();
                                e.allItems.forEach(function(b) {
                                    a !== b && b.setState(a.visible ? "inactive" : "", !g)
                                })
                            };
                            d.removeClass(f);
                            b = {
                                browserEvent: b
                            };
                            a.firePointEvent ? a.firePointEvent("legendItemClick", b, c) : y(a, "legendItemClick", b, c)
                        })
                })
            }
            ;
            c.prototype.createCheckboxForItem = function(a) {
                a.checkbox = l("input", {
                    type: "checkbox",
                    className: "highcharts-legend-checkbox",
                    checked: a.selected,
                    defaultChecked: a.selected
                }, this.options.itemCheckboxStyle, this.chart.container);
                d(a.checkbox, "click", function(b) {
                    y(a.series || a, "checkboxClick", {
                        checked: b.target.checked,
                        item: a
                    }, function() {
                        a.select()
                    })
                })
            }
            ;
            return c
        }();
        (/Trident\/7\.0/.test(x.navigator && x.navigator.userAgent) || c) && A(e.prototype, "positionItem", function(b, a) {
            var c = this
              , e = function() {
                a._legendItemPos && b.call(c, a)
            };
            e();
            c.bubbleLegend || setTimeout(e)
        });
        E.Legend = e;
        return E.Legend
    });
    P(c, "Core/Series/SeriesRegistry.js", [c["Core/Globals.js"], c["Core/DefaultOptions.js"], c["Core/Series/Point.js"], c["Core/Utilities.js"]], function(c, x, E, H) {
        var n = x.defaultOptions, F = H.error, G = H.extendClass, J = H.merge, p;
        (function(d) {
            function l(b, c) {
                var g = n.plotOptions || {}
                  , l = c.defaultOptions;
                c.prototype.pointClass || (c.prototype.pointClass = E);
                c.prototype.type = b;
                l && (g[b] = l);
                d.seriesTypes[b] = c
            }
            d.seriesTypes = c.seriesTypes;
            d.getSeries = function(b, c) {
                void 0 === c && (c = {});
                var g = b.options.chart;
                g = c.type || g.type || g.defaultSeriesType || "";
                var l = d.seriesTypes[g];
                d || F(17, !0, b, {
                    missingModuleFor: g
                });
                g = new l;
                "function" === typeof g.init && g.init(b, c);
                return g
            }
            ;
            d.registerSeriesType = l;
            d.seriesType = function(b, c, p, D, y) {
                var g = n.plotOptions || {};
                c = c || "";
                g[b] = J(g[c], p);
                l(b, G(d.seriesTypes[c] || function() {}
                , D));
                d.seriesTypes[b].prototype.type = b;
                y && (d.seriesTypes[b].prototype.pointClass = G(E, y));
                return d.seriesTypes[b]
            }
        }
        )(p || (p = {}));
        c.seriesType = p.seriesType;
        return p
    });
    P(c, "Core/Chart/Chart.js", [c["Core/Animation/AnimationUtilities.js"], c["Core/Axis/Axis.js"], c["Core/FormatUtilities.js"], c["Core/Foundation.js"], c["Core/Globals.js"], c["Core/Legend.js"], c["Core/MSPointer.js"], c["Core/DefaultOptions.js"], c["Core/Color/Palette.js"], c["Core/Pointer.js"], c["Core/Renderer/RendererRegistry.js"], c["Core/Series/SeriesRegistry.js"], c["Core/Time.js"], c["Core/Utilities.js"], c["Core/Renderer/HTML/AST.js"]], function(c, x, E, H, A, F, G, J, p, d, l, b, g, N, D) {
        var n = c.animate
          , v = c.animObject
          , k = c.setAnimation
          , L = E.numberFormat
          , M = H.registerEventOptions
          , B = A.charts
          , w = A.doc
          , e = A.marginNames
          , r = A.win
          , a = J.defaultOptions
          , q = J.defaultTime
          , I = b.seriesTypes
          , C = N.addEvent
          , z = N.attr
          , m = N.cleanRecursively
          , f = N.createElement
          , K = N.css
          , h = N.defined
          , u = N.discardElement
          , O = N.erase
          , X = N.error
          , t = N.extend
          , Q = N.find
          , R = N.fireEvent
          , Z = N.getStyle
          , ha = N.isArray
          , S = N.isNumber
          , da = N.isObject
          , aa = N.isString
          , Y = N.merge
          , ca = N.objectEach
          , T = N.pick
          , U = N.pInt
          , ea = N.relativeLength
          , fa = N.removeEvent
          , W = N.splat
          , ba = N.syncTimeout
          , P = N.uniqueKey;
        c = function() {
            function b(a, b, c) {
                this.series = this.renderTo = this.renderer = this.pointer = this.pointCount = this.plotWidth = this.plotTop = this.plotLeft = this.plotHeight = this.plotBox = this.options = this.numberFormatter = this.margin = this.legend = this.labelCollectors = this.isResizing = this.index = this.eventOptions = this.container = this.colorCounter = this.clipBox = this.chartWidth = this.chartHeight = this.bounds = this.axisOffset = this.axes = void 0;
                this.sharedClips = {};
                this.yAxis = this.xAxis = this.userOptions = this.titleOffset = this.time = this.symbolCounter = this.spacingBox = this.spacing = void 0;
                this.getArgs(a, b, c)
            }
            b.chart = function(a, c, h) {
                return new b(a,c,h)
            }
            ;
            b.prototype.getArgs = function(a, b, c) {
                aa(a) || a.nodeName ? (this.renderTo = a,
                this.init(b, c)) : this.init(a, b)
            }
            ;
            b.prototype.init = function(b, c) {
                var h = b.plotOptions || {};
                R(this, "init", {
                    args: arguments
                }, function() {
                    var e = Y(a, b)
                      , f = e.chart;
                    ca(e.plotOptions, function(a, b) {
                        da(a) && (a.tooltip = h[b] && Y(h[b].tooltip) || void 0)
                    });
                    e.tooltip.userOptions = b.chart && b.chart.forExport && b.tooltip.userOptions || b.tooltip;
                    this.userOptions = b;
                    this.margin = [];
                    this.spacing = [];
                    this.bounds = {
                        h: {},
                        v: {}
                    };
                    this.labelCollectors = [];
                    this.callback = c;
                    this.isResizing = 0;
                    this.options = e;
                    this.axes = [];
                    this.series = [];
                    this.time = b.time && Object.keys(b.time).length ? new g(b.time) : A.time;
                    this.numberFormatter = f.numberFormatter || L;
                    this.styledMode = f.styledMode;
                    this.hasCartesianSeries = f.showAxes;
                    this.index = B.length;
                    B.push(this);
                    A.chartCount++;
                    M(this, f);
                    this.xAxis = [];
                    this.yAxis = [];
                    this.pointCount = this.colorCounter = this.symbolCounter = 0;
                    R(this, "afterInit");
                    this.firstRender()
                })
            }
            ;
            b.prototype.initSeries = function(a) {
                var b = this.options.chart;
                b = a.type || b.type || b.defaultSeriesType;
                var c = I[b];
                c || X(17, !0, this, {
                    missingModuleFor: b
                });
                b = new c;
                "function" === typeof b.init && b.init(this, a);
                return b
            }
            ;
            b.prototype.setSeriesData = function() {
                this.getSeriesOrderByLinks().forEach(function(a) {
                    a.points || a.data || !a.enabledDataSorting || a.setData(a.options.data, !1)
                })
            }
            ;
            b.prototype.getSeriesOrderByLinks = function() {
                return this.series.concat().sort(function(a, b) {
                    return a.linkedSeries.length || b.linkedSeries.length ? b.linkedSeries.length - a.linkedSeries.length : 0
                })
            }
            ;
            b.prototype.orderSeries = function(a) {
                var b = this.series;
                a = a || 0;
                for (var c = b.length; a < c; ++a)
                    b[a] && (b[a].index = a,
                    b[a].name = b[a].getName())
            }
            ;
            b.prototype.isInsidePlot = function(a, b, c) {
                void 0 === c && (c = {});
                var h = this.inverted
                  , e = this.plotBox
                  , f = this.plotLeft
                  , d = this.plotTop
                  , g = this.scrollablePlotBox
                  , m = 0;
                var u = 0;
                c.visiblePlotOnly && this.scrollingContainer && (u = this.scrollingContainer,
                m = u.scrollLeft,
                u = u.scrollTop);
                var k = c.series;
                e = c.visiblePlotOnly && g || e;
                g = c.inverted ? b : a;
                b = c.inverted ? a : b;
                a = {
                    x: g,
                    y: b,
                    isInsidePlot: !0
                };
                if (!c.ignoreX) {
                    var q = k && (h ? k.yAxis : k.xAxis) || {
                        pos: f,
                        len: Infinity
                    };
                    g = c.paneCoordinates ? q.pos + g : f + g;
                    g >= Math.max(m + f, q.pos) && g <= Math.min(m + f + e.width, q.pos + q.len) || (a.isInsidePlot = !1)
                }
                !c.ignoreY && a.isInsidePlot && (h = k && (h ? k.xAxis : k.yAxis) || {
                    pos: d,
                    len: Infinity
                },
                c = c.paneCoordinates ? h.pos + b : d + b,
                c >= Math.max(u + d, h.pos) && c <= Math.min(u + d + e.height, h.pos + h.len) || (a.isInsidePlot = !1));
                R(this, "afterIsInsidePlot", a);
                return a.isInsidePlot
            }
            ;
            b.prototype.redraw = function(a) {
                R(this, "beforeRedraw");
                var b = this.hasCartesianSeries ? this.axes : this.colorAxis || []
                  , c = this.series
                  , h = this.pointer
                  , e = this.legend
                  , f = this.userOptions.legend
                  , d = this.renderer
                  , g = d.isHidden()
                  , m = []
                  , u = this.isDirtyBox
                  , q = this.isDirtyLegend;
                this.setResponsive && this.setResponsive(!1);
                k(this.hasRendered ? a : !1, this);
                g && this.temporaryDisplay();
                this.layOutTitles();
                for (a = c.length; a--; ) {
                    var l = c[a];
                    if (l.options.stacking || l.options.centerInCategory) {
                        var w = !0;
                        if (l.isDirty) {
                            var r = !0;
                            break
                        }
                    }
                }
                if (r)
                    for (a = c.length; a--; )
                        l = c[a],
                        l.options.stacking && (l.isDirty = !0);
                c.forEach(function(a) {
                    a.isDirty && ("point" === a.options.legendType ? ("function" === typeof a.updateTotals && a.updateTotals(),
                    q = !0) : f && (f.labelFormatter || f.labelFormat) && (q = !0));
                    a.isDirtyData && R(a, "updatedData")
                });
                q && e && e.options.enabled && (e.render(),
                this.isDirtyLegend = !1);
                w && this.getStacks();
                b.forEach(function(a) {
                    a.updateNames();
                    a.setScale()
                });
                this.getMargins();
                b.forEach(function(a) {
                    a.isDirty && (u = !0)
                });
                b.forEach(function(a) {
                    var b = a.min + "," + a.max;
                    a.extKey !== b && (a.extKey = b,
                    m.push(function() {
                        R(a, "afterSetExtremes", t(a.eventArgs, a.getExtremes()));
                        delete a.eventArgs
                    }));
                    (u || w) && a.redraw()
                });
                u && this.drawChartBox();
                R(this, "predraw");
                c.forEach(function(a) {
                    (u || a.isDirty) && a.visible && a.redraw();
                    a.isDirtyData = !1
                });
                h && h.reset(!0);
                d.draw();
                R(this, "redraw");
                R(this, "render");
                g && this.temporaryDisplay(!0);
                m.forEach(function(a) {
                    a.call()
                })
            }
            ;
            b.prototype.get = function(a) {
                function b(b) {
                    return b.id === a || b.options && b.options.id === a
                }
                for (var c = this.series, h = Q(this.axes, b) || Q(this.series, b), e = 0; !h && e < c.length; e++)
                    h = Q(c[e].points || [], b);
                return h
            }
            ;
            b.prototype.getAxes = function() {
                var a = this
                  , b = this.options
                  , c = b.xAxis = W(b.xAxis || {});
                b = b.yAxis = W(b.yAxis || {});
                R(this, "getAxes");
                c.forEach(function(a, b) {
                    a.index = b;
                    a.isX = !0
                });
                b.forEach(function(a, b) {
                    a.index = b
                });
                c.concat(b).forEach(function(b) {
                    new x(a,b)
                });
                R(this, "afterGetAxes")
            }
            ;
            b.prototype.getSelectedPoints = function() {
                var a = [];
                this.series.forEach(function(b) {
                    a = a.concat(b.getPointsCollection().filter(function(a) {
                        return T(a.selectedStaging, a.selected)
                    }))
                });
                return a
            }
            ;
            b.prototype.getSelectedSeries = function() {
                return this.series.filter(function(a) {
                    return a.selected
                })
            }
            ;
            b.prototype.setTitle = function(a, b, c) {
                this.applyDescription("title", a);
                this.applyDescription("subtitle", b);
                this.applyDescription("caption", void 0);
                this.layOutTitles(c)
            }
            ;
            b.prototype.applyDescription = function(a, b) {
                var c = this
                  , h = "title" === a ? {
                    color: p.neutralColor80,
                    fontSize: this.options.isStock ? "16px" : "18px"
                } : {
                    color: p.neutralColor60
                };
                h = this.options[a] = Y(!this.styledMode && {
                    style: h
                }, this.options[a], b);
                var e = this[a];
                e && b && (this[a] = e = e.destroy());
                h && !e && (e = this.renderer.text(h.text, 0, 0, h.useHTML).attr({
                    align: h.align,
                    "class": "highcharts-" + a,
                    zIndex: h.zIndex || 4
                }).add(),
                e.update = function(b) {
                    c[{
                        title: "setTitle",
                        subtitle: "setSubtitle",
                        caption: "setCaption"
                    }[a]](b)
                }
                ,
                this.styledMode || e.css(h.style),
                this[a] = e)
            }
            ;
            b.prototype.layOutTitles = function(a) {
                var b = [0, 0, 0]
                  , c = this.renderer
                  , h = this.spacingBox;
                ["title", "subtitle", "caption"].forEach(function(a) {
                    var e = this[a]
                      , f = this.options[a]
                      , d = f.verticalAlign || "top";
                    a = "title" === a ? "top" === d ? -3 : 0 : "top" === d ? b[0] + 2 : 0;
                    var g;
                    if (e) {
                        this.styledMode || (g = f.style && f.style.fontSize);
                        g = c.fontMetrics(g, e).b;
                        e.css({
                            width: (f.width || h.width + (f.widthAdjust || 0)) + "px"
                        });
                        var m = Math.round(e.getBBox(f.useHTML).height);
                        e.align(t({
                            y: "bottom" === d ? g : a + g,
                            height: m
                        }, f), !1, "spacingBox");
                        f.floating || ("top" === d ? b[0] = Math.ceil(b[0] + m) : "bottom" === d && (b[2] = Math.ceil(b[2] + m)))
                    }
                }, this);
                b[0] && "top" === (this.options.title.verticalAlign || "top") && (b[0] += this.options.title.margin);
                b[2] && "bottom" === this.options.caption.verticalAlign && (b[2] += this.options.caption.margin);
                var e = !this.titleOffset || this.titleOffset.join(",") !== b.join(",");
                this.titleOffset = b;
                R(this, "afterLayOutTitles");
                !this.isDirtyBox && e && (this.isDirtyBox = this.isDirtyLegend = e,
                this.hasRendered && T(a, !0) && this.isDirtyBox && this.redraw())
            }
            ;
            b.prototype.getChartSize = function() {
                var a = this.options.chart
                  , b = a.width;
                a = a.height;
                var c = this.renderTo;
                h(b) || (this.containerWidth = Z(c, "width"));
                h(a) || (this.containerHeight = Z(c, "height"));
                this.chartWidth = Math.max(0, b || this.containerWidth || 600);
                this.chartHeight = Math.max(0, ea(a, this.chartWidth) || (1 < this.containerHeight ? this.containerHeight : 400))
            }
            ;
            b.prototype.temporaryDisplay = function(a) {
                var b = this.renderTo;
                if (a)
                    for (; b && b.style; )
                        b.hcOrigStyle && (K(b, b.hcOrigStyle),
                        delete b.hcOrigStyle),
                        b.hcOrigDetached && (w.body.removeChild(b),
                        b.hcOrigDetached = !1),
                        b = b.parentNode;
                else
                    for (; b && b.style; ) {
                        w.body.contains(b) || b.parentNode || (b.hcOrigDetached = !0,
                        w.body.appendChild(b));
                        if ("none" === Z(b, "display", !1) || b.hcOricDetached)
                            b.hcOrigStyle = {
                                display: b.style.display,
                                height: b.style.height,
                                overflow: b.style.overflow
                            },
                            a = {
                                display: "block",
                                overflow: "hidden"
                            },
                            b !== this.renderTo && (a.height = 0),
                            K(b, a),
                            b.offsetWidth || b.style.setProperty("display", "block", "important");
                        b = b.parentNode;
                        if (b === w.body)
                            break
                    }
            }
            ;
            b.prototype.setClassName = function(a) {
                this.container.className = "highcharts-container " + (a || "")
            }
            ;
            b.prototype.getContainer = function() {
                var a = this.options, b = a.chart, c = P(), h, e = this.renderTo;
                e || (this.renderTo = e = b.renderTo);
                aa(e) && (this.renderTo = e = w.getElementById(e));
                e || X(13, !0, this);
                var d = U(z(e, "data-highcharts-chart"));
                S(d) && B[d] && B[d].hasRendered && B[d].destroy();
                z(e, "data-highcharts-chart", this.index);
                e.innerHTML = "";
                b.skipClone || e.offsetWidth || this.temporaryDisplay();
                this.getChartSize();
                d = this.chartWidth;
                var g = this.chartHeight;
                K(e, {
                    overflow: "hidden"
                });
                this.styledMode || (h = t({
                    position: "relative",
                    overflow: "hidden",
                    width: d + "px",
                    height: g + "px",
                    textAlign: "left",
                    lineHeight: "normal",
                    zIndex: 0,
                    "-webkit-tap-highlight-color": "rgba(0,0,0,0)",
                    userSelect: "none",
                    "touch-action": "manipulation",
                    outline: "none"
                }, b.style || {}));
                this.container = c = f("div", {
                    id: c
                }, h, e);
                this._cursor = c.style.cursor;
                this.renderer = new (l.getRendererType(b.renderer))(c,d,g,void 0,b.forExport,a.exporting && a.exporting.allowHTML,this.styledMode);
                k(void 0, this);
                this.setClassName(b.className);
                if (this.styledMode)
                    for (var m in a.defs)
                        this.renderer.definition(a.defs[m]);
                else
                    this.renderer.setStyle(b.style);
                this.renderer.chartIndex = this.index;
                R(this, "afterGetContainer")
            }
            ;
            b.prototype.getMargins = function(a) {
                var b = this.spacing
                  , c = this.margin
                  , e = this.titleOffset;
                this.resetMargins();
                e[0] && !h(c[0]) && (this.plotTop = Math.max(this.plotTop, e[0] + b[0]));
                e[2] && !h(c[2]) && (this.marginBottom = Math.max(this.marginBottom, e[2] + b[2]));
                this.legend && this.legend.display && this.legend.adjustMargins(c, b);
                R(this, "getMargins");
                a || this.getAxisMargins()
            }
            ;
            b.prototype.getAxisMargins = function() {
                var a = this
                  , b = a.axisOffset = [0, 0, 0, 0]
                  , c = a.colorAxis
                  , f = a.margin
                  , d = function(a) {
                    a.forEach(function(a) {
                        a.visible && a.getOffset()
                    })
                };
                a.hasCartesianSeries ? d(a.axes) : c && c.length && d(c);
                e.forEach(function(c, e) {
                    h(f[e]) || (a[c] += b[e])
                });
                a.setChartSize()
            }
            ;
            b.prototype.reflow = function(a) {
                var b = this
                  , c = b.options.chart
                  , e = b.renderTo
                  , f = h(c.width) && h(c.height)
                  , d = c.width || Z(e, "width");
                c = c.height || Z(e, "height");
                e = a ? a.target : r;
                delete b.pointer.chartPosition;
                if (!f && !b.isPrinting && d && c && (e === r || e === w)) {
                    if (d !== b.containerWidth || c !== b.containerHeight)
                        N.clearTimeout(b.reflowTimeout),
                        b.reflowTimeout = ba(function() {
                            b.container && b.setSize(void 0, void 0, !1)
                        }, a ? 100 : 0);
                    b.containerWidth = d;
                    b.containerHeight = c
                }
            }
            ;
            b.prototype.setReflow = function(a) {
                var b = this;
                !1 === a || this.unbindReflow ? !1 === a && this.unbindReflow && (this.unbindReflow = this.unbindReflow()) : (this.unbindReflow = C(r, "resize", function(a) {
                    b.options && b.reflow(a)
                }),
                C(this, "destroy", this.unbindReflow))
            }
            ;
            b.prototype.setSize = function(a, b, c) {
                var e = this
                  , h = e.renderer;
                e.isResizing += 1;
                k(c, e);
                c = h.globalAnimation;
                e.oldChartHeight = e.chartHeight;
                e.oldChartWidth = e.chartWidth;
                "undefined" !== typeof a && (e.options.chart.width = a);
                "undefined" !== typeof b && (e.options.chart.height = b);
                e.getChartSize();
                e.styledMode || (c ? n : K)(e.container, {
                    width: e.chartWidth + "px",
                    height: e.chartHeight + "px"
                }, c);
                e.setChartSize(!0);
                h.setSize(e.chartWidth, e.chartHeight, c);
                e.axes.forEach(function(a) {
                    a.isDirty = !0;
                    a.setScale()
                });
                e.isDirtyLegend = !0;
                e.isDirtyBox = !0;
                e.layOutTitles();
                e.getMargins();
                e.redraw(c);
                e.oldChartHeight = null;
                R(e, "resize");
                ba(function() {
                    e && R(e, "endResize", null, function() {
                        --e.isResizing
                    })
                }, v(c).duration)
            }
            ;
            b.prototype.setChartSize = function(a) {
                var b = this.inverted, c = this.renderer, e = this.chartWidth, h = this.chartHeight, f = this.options.chart, d = this.spacing, g = this.clipOffset, m, u, k, q;
                this.plotLeft = m = Math.round(this.plotLeft);
                this.plotTop = u = Math.round(this.plotTop);
                this.plotWidth = k = Math.max(0, Math.round(e - m - this.marginRight));
                this.plotHeight = q = Math.max(0, Math.round(h - u - this.marginBottom));
                this.plotSizeX = b ? q : k;
                this.plotSizeY = b ? k : q;
                this.plotBorderWidth = f.plotBorderWidth || 0;
                this.spacingBox = c.spacingBox = {
                    x: d[3],
                    y: d[0],
                    width: e - d[3] - d[1],
                    height: h - d[0] - d[2]
                };
                this.plotBox = c.plotBox = {
                    x: m,
                    y: u,
                    width: k,
                    height: q
                };
                b = 2 * Math.floor(this.plotBorderWidth / 2);
                e = Math.ceil(Math.max(b, g[3]) / 2);
                h = Math.ceil(Math.max(b, g[0]) / 2);
                this.clipBox = {
                    x: e,
                    y: h,
                    width: Math.floor(this.plotSizeX - Math.max(b, g[1]) / 2 - e),
                    height: Math.max(0, Math.floor(this.plotSizeY - Math.max(b, g[2]) / 2 - h))
                };
                a || (this.axes.forEach(function(a) {
                    a.setAxisSize();
                    a.setAxisTranslation()
                }),
                c.alignElements());
                R(this, "afterSetChartSize", {
                    skipAxes: a
                })
            }
            ;
            b.prototype.resetMargins = function() {
                R(this, "resetMargins");
                var a = this
                  , b = a.options.chart;
                ["margin", "spacing"].forEach(function(c) {
                    var e = b[c]
                      , h = da(e) ? e : [e, e, e, e];
                    ["Top", "Right", "Bottom", "Left"].forEach(function(e, f) {
                        a[c][f] = T(b[c + e], h[f])
                    })
                });
                e.forEach(function(b, c) {
                    a[b] = T(a.margin[c], a.spacing[c])
                });
                a.axisOffset = [0, 0, 0, 0];
                a.clipOffset = [0, 0, 0, 0]
            }
            ;
            b.prototype.drawChartBox = function() {
                var a = this.options.chart, b = this.renderer, c = this.chartWidth, e = this.chartHeight, h = this.styledMode, f = this.plotBGImage, d = a.backgroundColor, g = a.plotBackgroundColor, m = a.plotBackgroundImage, u = this.plotLeft, k = this.plotTop, q = this.plotWidth, t = this.plotHeight, l = this.plotBox, w = this.clipRect, r = this.clipBox, v = this.chartBackground, K = this.plotBackground, n = this.plotBorder, p, z = "animate";
                v || (this.chartBackground = v = b.rect().addClass("highcharts-background").add(),
                z = "attr");
                if (h)
                    var S = p = v.strokeWidth();
                else {
                    S = a.borderWidth || 0;
                    p = S + (a.shadow ? 8 : 0);
                    d = {
                        fill: d || "none"
                    };
                    if (S || v["stroke-width"])
                        d.stroke = a.borderColor,
                        d["stroke-width"] = S;
                    v.attr(d).shadow(a.shadow)
                }
                v[z]({
                    x: p / 2,
                    y: p / 2,
                    width: c - p - S % 2,
                    height: e - p - S % 2,
                    r: a.borderRadius
                });
                z = "animate";
                K || (z = "attr",
                this.plotBackground = K = b.rect().addClass("highcharts-plot-background").add());
                K[z](l);
                h || (K.attr({
                    fill: g || "none"
                }).shadow(a.plotShadow),
                m && (f ? (m !== f.attr("href") && f.attr("href", m),
                f.animate(l)) : this.plotBGImage = b.image(m, u, k, q, t).add()));
                w ? w.animate({
                    width: r.width,
                    height: r.height
                }) : this.clipRect = b.clipRect(r);
                z = "animate";
                n || (z = "attr",
                this.plotBorder = n = b.rect().addClass("highcharts-plot-border").attr({
                    zIndex: 1
                }).add());
                h || n.attr({
                    stroke: a.plotBorderColor,
                    "stroke-width": a.plotBorderWidth || 0,
                    fill: "none"
                });
                n[z](n.crisp({
                    x: u,
                    y: k,
                    width: q,
                    height: t
                }, -n.strokeWidth()));
                this.isDirtyBox = !1;
                R(this, "afterDrawChartBox")
            }
            ;
            b.prototype.propFromSeries = function() {
                var a = this, b = a.options.chart, c = a.options.series, e, h, f;
                ["inverted", "angular", "polar"].forEach(function(d) {
                    h = I[b.type || b.defaultSeriesType];
                    f = b[d] || h && h.prototype[d];
                    for (e = c && c.length; !f && e--; )
                        (h = I[c[e].type]) && h.prototype[d] && (f = !0);
                    a[d] = f
                })
            }
            ;
            b.prototype.linkSeries = function() {
                var a = this
                  , b = a.series;
                b.forEach(function(a) {
                    a.linkedSeries.length = 0
                });
                b.forEach(function(b) {
                    var c = b.options.linkedTo;
                    aa(c) && (c = ":previous" === c ? a.series[b.index - 1] : a.get(c)) && c.linkedParent !== b && (c.linkedSeries.push(b),
                    b.linkedParent = c,
                    c.enabledDataSorting && b.setDataSortingOptions(),
                    b.visible = T(b.options.visible, c.options.visible, b.visible))
                });
                R(this, "afterLinkSeries")
            }
            ;
            b.prototype.renderSeries = function() {
                this.series.forEach(function(a) {
                    a.translate();
                    a.render()
                })
            }
            ;
            b.prototype.renderLabels = function() {
                var a = this
                  , b = a.options.labels;
                b.items && b.items.forEach(function(c) {
                    var e = t(b.style, c.style)
                      , h = U(e.left) + a.plotLeft
                      , f = U(e.top) + a.plotTop + 12;
                    delete e.left;
                    delete e.top;
                    a.renderer.text(c.html, h, f).attr({
                        zIndex: 2
                    }).css(e).add()
                })
            }
            ;
            b.prototype.render = function() {
                var a = this.axes
                  , b = this.colorAxis
                  , c = this.renderer
                  , e = this.options
                  , h = function(a) {
                    a.forEach(function(a) {
                        a.visible && a.render()
                    })
                }
                  , f = 0;
                this.setTitle();
                this.legend = new F(this,e.legend);
                this.getStacks && this.getStacks();
                this.getMargins(!0);
                this.setChartSize();
                e = this.plotWidth;
                a.some(function(a) {
                    if (a.horiz && a.visible && a.options.labels.enabled && a.series.length)
                        return f = 21,
                        !0
                });
                var d = this.plotHeight = Math.max(this.plotHeight - f, 0);
                a.forEach(function(a) {
                    a.setScale()
                });
                this.getAxisMargins();
                var g = 1.1 < e / this.plotWidth
                  , m = 1.05 < d / this.plotHeight;
                if (g || m)
                    a.forEach(function(a) {
                        (a.horiz && g || !a.horiz && m) && a.setTickInterval(!0)
                    }),
                    this.getMargins();
                this.drawChartBox();
                this.hasCartesianSeries ? h(a) : b && b.length && h(b);
                this.seriesGroup || (this.seriesGroup = c.g("series-group").attr({
                    zIndex: 3
                }).add());
                this.renderSeries();
                this.renderLabels();
                this.addCredits();
                this.setResponsive && this.setResponsive();
                this.hasRendered = !0
            }
            ;
            b.prototype.addCredits = function(a) {
                var b = this
                  , c = Y(!0, this.options.credits, a);
                c.enabled && !this.credits && (this.credits = this.renderer.text(c.text + (this.mapCredits || ""), 0, 0).addClass("highcharts-credits").on("click", function() {
                    c.href && (r.location.href = c.href)
                }).attr({
                    align: c.position.align,
                    zIndex: 8
                }),
                b.styledMode || this.credits.css(c.style),
                this.credits.add().align(c.position),
                this.credits.update = function(a) {
                    b.credits = b.credits.destroy();
                    b.addCredits(a)
                }
                )
            }
            ;
            b.prototype.destroy = function() {
                var a = this, b = a.axes, c = a.series, e = a.container, h = e && e.parentNode, f;
                R(a, "destroy");
                a.renderer.forExport ? O(B, a) : B[a.index] = void 0;
                A.chartCount--;
                a.renderTo.removeAttribute("data-highcharts-chart");
                fa(a);
                for (f = b.length; f--; )
                    b[f] = b[f].destroy();
                this.scroller && this.scroller.destroy && this.scroller.destroy();
                for (f = c.length; f--; )
                    c[f] = c[f].destroy();
                "title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" ").forEach(function(b) {
                    var c = a[b];
                    c && c.destroy && (a[b] = c.destroy())
                });
                e && (e.innerHTML = "",
                fa(e),
                h && u(e));
                ca(a, function(b, c) {
                    delete a[c]
                })
            }
            ;
            b.prototype.firstRender = function() {
                var a = this
                  , b = a.options;
                if (!a.isReadyToRender || a.isReadyToRender()) {
                    a.getContainer();
                    a.resetMargins();
                    a.setChartSize();
                    a.propFromSeries();
                    a.getAxes();
                    (ha(b.series) ? b.series : []).forEach(function(b) {
                        a.initSeries(b)
                    });
                    a.linkSeries();
                    a.setSeriesData();
                    R(a, "beforeRender");
                    d && (G.isRequired() ? a.pointer = new G(a,b) : a.pointer = new d(a,b));
                    a.render();
                    a.pointer.getChartPosition();
                    if (!a.renderer.imgCount && !a.hasLoaded)
                        a.onload();
                    a.temporaryDisplay(!0)
                }
            }
            ;
            b.prototype.onload = function() {
                this.callbacks.concat([this.callback]).forEach(function(a) {
                    a && "undefined" !== typeof this.index && a.apply(this, [this])
                }, this);
                R(this, "load");
                R(this, "render");
                h(this.index) && this.setReflow(this.options.chart.reflow);
                this.hasLoaded = !0
            }
            ;
            b.prototype.addSeries = function(a, b, c) {
                var e = this, h;
                a && (b = T(b, !0),
                R(e, "addSeries", {
                    options: a
                }, function() {
                    h = e.initSeries(a);
                    e.isDirtyLegend = !0;
                    e.linkSeries();
                    h.enabledDataSorting && h.setData(a.data, !1);
                    R(e, "afterAddSeries", {
                        series: h
                    });
                    b && e.redraw(c)
                }));
                return h
            }
            ;
            b.prototype.addAxis = function(a, b, c, e) {
                return this.createAxis(b ? "xAxis" : "yAxis", {
                    axis: a,
                    redraw: c,
                    animation: e
                })
            }
            ;
            b.prototype.addColorAxis = function(a, b, c) {
                return this.createAxis("colorAxis", {
                    axis: a,
                    redraw: b,
                    animation: c
                })
            }
            ;
            b.prototype.createAxis = function(a, b) {
                var c = "colorAxis" === a
                  , e = b.redraw
                  , h = b.animation;
                a = Y(b.axis, {
                    index: this[a].length,
                    isX: "xAxis" === a
                });
                a = c ? new A.ColorAxis(this,a) : new x(this,a);
                c && (this.isDirtyLegend = !0,
                this.axes.forEach(function(a) {
                    a.series = []
                }),
                this.series.forEach(function(a) {
                    a.bindAxes();
                    a.isDirtyData = !0
                }));
                T(e, !0) && this.redraw(h);
                return a
            }
            ;
            b.prototype.showLoading = function(a) {
                var b = this
                  , c = b.options
                  , e = c.loading
                  , h = function() {
                    d && K(d, {
                        left: b.plotLeft + "px",
                        top: b.plotTop + "px",
                        width: b.plotWidth + "px",
                        height: b.plotHeight + "px"
                    })
                }
                  , d = b.loadingDiv
                  , g = b.loadingSpan;
                d || (b.loadingDiv = d = f("div", {
                    className: "highcharts-loading highcharts-loading-hidden"
                }, null, b.container));
                g || (b.loadingSpan = g = f("span", {
                    className: "highcharts-loading-inner"
                }, null, d),
                C(b, "redraw", h));
                d.className = "highcharts-loading";
                D.setElementHTML(g, T(a, c.lang.loading, ""));
                b.styledMode || (K(d, t(e.style, {
                    zIndex: 10
                })),
                K(g, e.labelStyle),
                b.loadingShown || (K(d, {
                    opacity: 0,
                    display: ""
                }),
                n(d, {
                    opacity: e.style.opacity || .5
                }, {
                    duration: e.showDuration || 0
                })));
                b.loadingShown = !0;
                h()
            }
            ;
            b.prototype.hideLoading = function() {
                var a = this.options
                  , b = this.loadingDiv;
                b && (b.className = "highcharts-loading highcharts-loading-hidden",
                this.styledMode || n(b, {
                    opacity: 0
                }, {
                    duration: a.loading.hideDuration || 100,
                    complete: function() {
                        K(b, {
                            display: "none"
                        })
                    }
                }));
                this.loadingShown = !1
            }
            ;
            b.prototype.update = function(a, b, c, e) {
                var f = this, d = {
                    credits: "addCredits",
                    title: "setTitle",
                    subtitle: "setSubtitle",
                    caption: "setCaption"
                }, u = a.isResponsiveOptions, k = [], t, l;
                R(f, "update", {
                    options: a
                });
                u || f.setResponsive(!1, !0);
                a = m(a, f.options);
                f.userOptions = Y(f.userOptions, a);
                var w = a.chart;
                if (w) {
                    Y(!0, f.options.chart, w);
                    "className"in w && f.setClassName(w.className);
                    "reflow"in w && f.setReflow(w.reflow);
                    if ("inverted"in w || "polar"in w || "type"in w) {
                        f.propFromSeries();
                        var r = !0
                    }
                    "alignTicks"in w && (r = !0);
                    "events"in w && M(this, w);
                    ca(w, function(a, b) {
                        -1 !== f.propsRequireUpdateSeries.indexOf("chart." + b) && (t = !0);
                        -1 !== f.propsRequireDirtyBox.indexOf(b) && (f.isDirtyBox = !0);
                        -1 !== f.propsRequireReflow.indexOf(b) && (u ? f.isDirtyBox = !0 : l = !0)
                    });
                    !f.styledMode && "style"in w && f.renderer.setStyle(w.style)
                }
                !f.styledMode && a.colors && (this.options.colors = a.colors);
                a.time && (this.time === q && (this.time = new g(a.time)),
                Y(!0, f.options.time, a.time));
                ca(a, function(b, c) {
                    if (f[c] && "function" === typeof f[c].update)
                        f[c].update(b, !1);
                    else if ("function" === typeof f[d[c]])
                        f[d[c]](b);
                    else
                        "colors" !== c && -1 === f.collectionsWithUpdate.indexOf(c) && Y(!0, f.options[c], a[c]);
                    "chart" !== c && -1 !== f.propsRequireUpdateSeries.indexOf(c) && (t = !0)
                });
                this.collectionsWithUpdate.forEach(function(b) {
                    if (a[b]) {
                        var e = [];
                        f[b].forEach(function(a, b) {
                            a.options.isInternal || e.push(T(a.options.index, b))
                        });
                        W(a[b]).forEach(function(a, d) {
                            var g = h(a.id), m;
                            g && (m = f.get(a.id));
                            !m && f[b] && (m = f[b][e ? e[d] : d]) && g && h(m.options.id) && (m = void 0);
                            m && m.coll === b && (m.update(a, !1),
                            c && (m.touched = !0));
                            !m && c && f.collectionsWithInit[b] && (f.collectionsWithInit[b][0].apply(f, [a].concat(f.collectionsWithInit[b][1] || []).concat([!1])).touched = !0)
                        });
                        c && f[b].forEach(function(a) {
                            a.touched || a.options.isInternal ? delete a.touched : k.push(a)
                        })
                    }
                });
                k.forEach(function(a) {
                    a.chart && a.remove(!1)
                });
                r && f.axes.forEach(function(a) {
                    a.update({}, !1)
                });
                t && f.getSeriesOrderByLinks().forEach(function(a) {
                    a.chart && a.update({}, !1)
                }, this);
                r = w && w.width;
                w = w && (aa(w.height) ? ea(w.height, r || f.chartWidth) : w.height);
                l || S(r) && r !== f.chartWidth || S(w) && w !== f.chartHeight ? f.setSize(r, w, e) : T(b, !0) && f.redraw(e);
                R(f, "afterUpdate", {
                    options: a,
                    redraw: b,
                    animation: e
                })
            }
            ;
            b.prototype.setSubtitle = function(a, b) {
                this.applyDescription("subtitle", a);
                this.layOutTitles(b)
            }
            ;
            b.prototype.setCaption = function(a, b) {
                this.applyDescription("caption", a);
                this.layOutTitles(b)
            }
            ;
            b.prototype.showResetZoom = function() {
                function b() {
                    c.zoomOut()
                }
                var c = this
                  , e = a.lang
                  , h = c.options.chart.resetZoomButton
                  , f = h.theme
                  , d = f.states
                  , g = "chart" === h.relativeTo || "spacingBox" === h.relativeTo ? null : "scrollablePlotBox";
                R(this, "beforeShowResetZoom", null, function() {
                    c.resetZoomButton = c.renderer.button(e.resetZoom, null, null, b, f, d && d.hover).attr({
                        align: h.position.align,
                        title: e.resetZoomTitle
                    }).addClass("highcharts-reset-zoom").add().align(h.position, !1, g)
                });
                R(this, "afterShowResetZoom")
            }
            ;
            b.prototype.zoomOut = function() {
                R(this, "selection", {
                    resetSelection: !0
                }, this.zoom)
            }
            ;
            b.prototype.zoom = function(a) {
                var b = this, c = b.pointer, e = b.inverted ? c.mouseDownX : c.mouseDownY, f = !1, d;
                !a || a.resetSelection ? (b.axes.forEach(function(a) {
                    d = a.zoom()
                }),
                c.initiated = !1) : a.xAxis.concat(a.yAxis).forEach(function(a) {
                    var g = a.axis
                      , m = b.inverted ? g.left : g.top
                      , u = b.inverted ? m + g.width : m + g.height
                      , k = g.isXAxis
                      , q = !1;
                    if (!k && e >= m && e <= u || k || !h(e))
                        q = !0;
                    c[k ? "zoomX" : "zoomY"] && q && (d = g.zoom(a.min, a.max),
                    g.displayBtn && (f = !0))
                });
                var g = b.resetZoomButton;
                f && !g ? b.showResetZoom() : !f && da(g) && (b.resetZoomButton = g.destroy());
                d && b.redraw(T(b.options.chart.animation, a && a.animation, 100 > b.pointCount))
            }
            ;
            b.prototype.pan = function(a, b) {
                var c = this
                  , e = c.hoverPoints;
                b = "object" === typeof b ? b : {
                    enabled: b,
                    type: "x"
                };
                var h = c.options.chart
                  , f = c.options.mapNavigation && c.options.mapNavigation.enabled;
                h && h.panning && (h.panning = b);
                var d = b.type, g;
                R(this, "pan", {
                    originalEvent: a
                }, function() {
                    e && e.forEach(function(a) {
                        a.setState()
                    });
                    var b = c.xAxis;
                    "xy" === d ? b = b.concat(c.yAxis) : "y" === d && (b = c.yAxis);
                    var h = {};
                    b.forEach(function(b) {
                        if (b.options.panningEnabled && !b.options.isInternal) {
                            var e = b.horiz
                              , m = a[e ? "chartX" : "chartY"];
                            e = e ? "mouseDownX" : "mouseDownY";
                            var u = c[e]
                              , k = b.minPointOffset || 0
                              , q = b.reversed && !c.inverted || !b.reversed && c.inverted ? -1 : 1
                              , t = b.getExtremes()
                              , l = b.toValue(u - m, !0) + k * q
                              , w = b.toValue(u + b.len - m, !0) - (k * q || b.isXAxis && b.pointRangePadding || 0)
                              , r = w < l;
                            q = b.hasVerticalPanning();
                            u = r ? w : l;
                            l = r ? l : w;
                            var v = b.panningState;
                            !q || b.isXAxis || v && !v.isDirty || b.series.forEach(function(a) {
                                var b = a.getProcessedData(!0);
                                b = a.getExtremes(b.yData, !0);
                                v || (v = {
                                    startMin: Number.MAX_VALUE,
                                    startMax: -Number.MAX_VALUE
                                });
                                S(b.dataMin) && S(b.dataMax) && (v.startMin = Math.min(T(a.options.threshold, Infinity), b.dataMin, v.startMin),
                                v.startMax = Math.max(T(a.options.threshold, -Infinity), b.dataMax, v.startMax))
                            });
                            q = Math.min(T(v && v.startMin, t.dataMin), k ? t.min : b.toValue(b.toPixels(t.min) - b.minPixelPadding));
                            w = Math.max(T(v && v.startMax, t.dataMax), k ? t.max : b.toValue(b.toPixels(t.max) + b.minPixelPadding));
                            b.panningState = v;
                            b.isOrdinal || (k = q - u,
                            0 < k && (l += k,
                            u = q),
                            k = l - w,
                            0 < k && (l = w,
                            u -= k),
                            b.series.length && u !== t.min && l !== t.max && u >= q && l <= w && (b.setExtremes(u, l, !1, !1, {
                                trigger: "pan"
                            }),
                            c.resetZoomButton || f || u === q || l === w || !d.match("y") || (c.showResetZoom(),
                            b.displayBtn = !1),
                            g = !0),
                            h[e] = m)
                        }
                    });
                    ca(h, function(a, b) {
                        c[b] = a
                    });
                    g && c.redraw(!1);
                    K(c.container, {
                        cursor: "move"
                    })
                })
            }
            ;
            return b
        }();
        t(c.prototype, {
            callbacks: [],
            collectionsWithInit: {
                xAxis: [c.prototype.addAxis, [!0]],
                yAxis: [c.prototype.addAxis, [!1]],
                series: [c.prototype.addSeries]
            },
            collectionsWithUpdate: ["xAxis", "yAxis", "zAxis", "series"],
            propsRequireDirtyBox: "backgroundColor borderColor borderWidth borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),
            propsRequireReflow: "margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft".split(" "),
            propsRequireUpdateSeries: "chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions time tooltip".split(" ")
        });
        "";
        return c
    });
    P(c, "Mixins/LegendSymbol.js", [c["Core/Globals.js"], c["Core/Utilities.js"]], function(c, x) {
        var n = x.merge
          , H = x.pick;
        return c.LegendSymbolMixin = {
            drawRectangle: function(c, n) {
                var A = c.symbolHeight
                  , x = c.options.squareSymbol;
                n.legendSymbol = this.chart.renderer.rect(x ? (c.symbolWidth - A) / 2 : 0, c.baseline - A + 1, x ? A : c.symbolWidth, A, H(c.options.symbolRadius, A / 2)).addClass("highcharts-point").attr({
                    zIndex: 3
                }).add(n.legendGroup)
            },
            drawLineMarker: function(c) {
                var x = this.options
                  , A = x.marker
                  , J = c.symbolWidth
                  , p = c.symbolHeight
                  , d = p / 2
                  , l = this.chart.renderer
                  , b = this.legendGroup;
                c = c.baseline - Math.round(.3 * c.fontMetrics.b);
                var g = {};
                this.chart.styledMode || (g = {
                    "stroke-width": x.lineWidth || 0
                },
                x.dashStyle && (g.dashstyle = x.dashStyle));
                this.legendLine = l.path([["M", 0, c], ["L", J, c]]).addClass("highcharts-graph").attr(g).add(b);
                A && !1 !== A.enabled && J && (x = Math.min(H(A.radius, d), d),
                0 === this.symbol.indexOf("url") && (A = n(A, {
                    width: p,
                    height: p
                }),
                x = 0),
                this.legendSymbol = A = l.symbol(this.symbol, J / 2 - x, c - x, 2 * x, 2 * x, A).addClass("highcharts-point").add(b),
                A.isMarker = !0)
            }
        }
    });
    P(c, "Core/Series/Series.js", [c["Core/Animation/AnimationUtilities.js"], c["Core/Foundation.js"], c["Core/Globals.js"], c["Mixins/LegendSymbol.js"], c["Core/DefaultOptions.js"], c["Core/Color/Palette.js"], c["Core/Series/Point.js"], c["Core/Series/SeriesRegistry.js"], c["Core/Renderer/SVG/SVGElement.js"], c["Core/Utilities.js"]], function(c, x, E, H, A, F, G, J, p, d) {
        var l = c.animObject
          , b = c.setAnimation
          , g = x.registerEventOptions
          , n = E.hasTouch
          , D = E.svg
          , y = E.win
          , v = A.defaultOptions
          , k = J.seriesTypes
          , L = d.addEvent
          , M = d.arrayMax
          , B = d.arrayMin
          , w = d.clamp
          , e = d.cleanRecursively
          , r = d.correctFloat
          , a = d.defined
          , q = d.erase
          , I = d.error
          , C = d.extend
          , z = d.find
          , m = d.fireEvent
          , f = d.getNestedProperty
          , K = d.isArray
          , h = d.isNumber
          , u = d.isString
          , O = d.merge
          , X = d.objectEach
          , t = d.pick
          , Q = d.removeEvent
          , R = d.splat
          , Z = d.syncTimeout;
        c = function() {
            function c() {
                this.zones = this.yAxis = this.xAxis = this.userOptions = this.tooltipOptions = this.processedYData = this.processedXData = this.points = this.options = this.linkedSeries = this.index = this.eventsToUnbind = this.eventOptions = this.data = this.chart = this._i = void 0
            }
            c.prototype.init = function(a, b) {
                m(this, "init", {
                    options: b
                });
                var c = this
                  , e = a.series;
                this.eventsToUnbind = [];
                c.chart = a;
                c.options = c.setOptions(b);
                b = c.options;
                c.linkedSeries = [];
                c.bindAxes();
                C(c, {
                    name: b.name,
                    state: "",
                    visible: !1 !== b.visible,
                    selected: !0 === b.selected
                });
                g(this, b);
                var h = b.events;
                if (h && h.click || b.point && b.point.events && b.point.events.click || b.allowPointSelect)
                    a.runTrackerClick = !0;
                c.getColor();
                c.getSymbol();
                c.parallelArrays.forEach(function(a) {
                    c[a + "Data"] || (c[a + "Data"] = [])
                });
                c.isCartesian && (a.hasCartesianSeries = !0);
                var f;
                e.length && (f = e[e.length - 1]);
                c._i = t(f && f._i, -1) + 1;
                c.opacity = c.options.opacity;
                a.orderSeries(this.insert(e));
                b.dataSorting && b.dataSorting.enabled ? c.setDataSortingOptions() : c.points || c.data || c.setData(b.data, !1);
                m(this, "afterInit")
            }
            ;
            c.prototype.is = function(a) {
                return k[a] && this instanceof k[a]
            }
            ;
            c.prototype.insert = function(a) {
                var b = this.options.index, c;
                if (h(b)) {
                    for (c = a.length; c--; )
                        if (b >= t(a[c].options.index, a[c]._i)) {
                            a.splice(c + 1, 0, this);
                            break
                        }
                    -1 === c && a.unshift(this);
                    c += 1
                } else
                    a.push(this);
                return t(c, a.length - 1)
            }
            ;
            c.prototype.bindAxes = function() {
                var a = this, b = a.options, c = a.chart, e;
                m(this, "bindAxes", null, function() {
                    (a.axisTypes || []).forEach(function(h) {
                        var f = 0;
                        c[h].forEach(function(c) {
                            e = c.options;
                            if (b[h] === f && !e.isInternal || "undefined" !== typeof b[h] && b[h] === e.id || "undefined" === typeof b[h] && 0 === e.index)
                                a.insert(c.series),
                                a[h] = c,
                                c.isDirty = !0;
                            e.isInternal || f++
                        });
                        a[h] || a.optionalAxis === h || I(18, !0, c)
                    })
                });
                m(this, "afterBindAxes")
            }
            ;
            c.prototype.updateParallelArrays = function(a, b) {
                var c = a.series
                  , e = arguments
                  , f = h(b) ? function(e) {
                    var h = "y" === e && c.toYData ? c.toYData(a) : a[e];
                    c[e + "Data"][b] = h
                }
                : function(a) {
                    Array.prototype[b].apply(c[a + "Data"], Array.prototype.slice.call(e, 2))
                }
                ;
                c.parallelArrays.forEach(f)
            }
            ;
            c.prototype.hasData = function() {
                return this.visible && "undefined" !== typeof this.dataMax && "undefined" !== typeof this.dataMin || this.visible && this.yData && 0 < this.yData.length
            }
            ;
            c.prototype.autoIncrement = function() {
                var a = this.options, b = this.xIncrement, c, e = a.pointIntervalUnit, h = this.chart.time;
                b = t(b, a.pointStart, 0);
                this.pointInterval = c = t(this.pointInterval, a.pointInterval, 1);
                e && (a = new h.Date(b),
                "day" === e ? h.set("Date", a, h.get("Date", a) + c) : "month" === e ? h.set("Month", a, h.get("Month", a) + c) : "year" === e && h.set("FullYear", a, h.get("FullYear", a) + c),
                c = a.getTime() - b);
                this.xIncrement = b + c;
                return b
            }
            ;
            c.prototype.setDataSortingOptions = function() {
                var b = this.options;
                C(this, {
                    requireSorting: !1,
                    sorted: !1,
                    enabledDataSorting: !0,
                    allowDG: !1
                });
                a(b.pointRange) || (b.pointRange = 1)
            }
            ;
            c.prototype.setOptions = function(b) {
                var c = this.chart
                  , e = c.options
                  , h = e.plotOptions
                  , f = c.userOptions || {};
                b = O(b);
                c = c.styledMode;
                var d = {
                    plotOptions: h,
                    userOptions: b
                };
                m(this, "setOptions", d);
                var g = d.plotOptions[this.type]
                  , u = f.plotOptions || {};
                this.userOptions = d.userOptions;
                f = O(g, h.series, f.plotOptions && f.plotOptions[this.type], b);
                this.tooltipOptions = O(v.tooltip, v.plotOptions.series && v.plotOptions.series.tooltip, v.plotOptions[this.type].tooltip, e.tooltip.userOptions, h.series && h.series.tooltip, h[this.type].tooltip, b.tooltip);
                this.stickyTracking = t(b.stickyTracking, u[this.type] && u[this.type].stickyTracking, u.series && u.series.stickyTracking, this.tooltipOptions.shared && !this.noSharedTooltip ? !0 : f.stickyTracking);
                null === g.marker && delete f.marker;
                this.zoneAxis = f.zoneAxis;
                e = this.zones = (f.zones || []).slice();
                !f.negativeColor && !f.negativeFillColor || f.zones || (h = {
                    value: f[this.zoneAxis + "Threshold"] || f.threshold || 0,
                    className: "highcharts-negative"
                },
                c || (h.color = f.negativeColor,
                h.fillColor = f.negativeFillColor),
                e.push(h));
                e.length && a(e[e.length - 1].value) && e.push(c ? {} : {
                    color: this.color,
                    fillColor: this.fillColor
                });
                m(this, "afterSetOptions", {
                    options: f
                });
                return f
            }
            ;
            c.prototype.getName = function() {
                return t(this.options.name, "Series " + (this.index + 1))
            }
            ;
            c.prototype.getCyclic = function(b, c, e) {
                var h = this.chart
                  , f = this.userOptions
                  , d = b + "Index"
                  , g = b + "Counter"
                  , m = e ? e.length : t(h.options.chart[b + "Count"], h[b + "Count"]);
                if (!c) {
                    var u = t(f[d], f["_" + d]);
                    a(u) || (h.series.length || (h[g] = 0),
                    f["_" + d] = u = h[g] % m,
                    h[g] += 1);
                    e && (c = e[u])
                }
                "undefined" !== typeof u && (this[d] = u);
                this[b] = c
            }
            ;
            c.prototype.getColor = function() {
                this.chart.styledMode ? this.getCyclic("color") : this.options.colorByPoint ? this.color = F.neutralColor20 : this.getCyclic("color", this.options.color || v.plotOptions[this.type].color, this.chart.options.colors)
            }
            ;
            c.prototype.getPointsCollection = function() {
                return (this.hasGroupedData ? this.points : this.data) || []
            }
            ;
            c.prototype.getSymbol = function() {
                this.getCyclic("symbol", this.options.marker.symbol, this.chart.options.symbols)
            }
            ;
            c.prototype.findPointIndex = function(a, b) {
                var c = a.id, e = a.x, f = this.points, d, g = this.options.dataSorting;
                if (c)
                    var m = this.chart.get(c);
                else if (this.linkedParent || this.enabledDataSorting) {
                    var u = g && g.matchByName ? "name" : "index";
                    m = z(f, function(b) {
                        return !b.touched && b[u] === a[u]
                    });
                    if (!m)
                        return
                }
                if (m) {
                    var k = m && m.index;
                    "undefined" !== typeof k && (d = !0)
                }
                "undefined" === typeof k && h(e) && (k = this.xData.indexOf(e, b));
                -1 !== k && "undefined" !== typeof k && this.cropped && (k = k >= this.cropStart ? k - this.cropStart : k);
                !d && f[k] && f[k].touched && (k = void 0);
                return k
            }
            ;
            c.prototype.updateData = function(b, c) {
                var e = this.options, f = e.dataSorting, d = this.points, g = [], m, u, k, q = this.requireSorting, t = b.length === d.length, l = !0;
                this.xIncrement = null;
                b.forEach(function(b, c) {
                    var u = a(b) && this.pointClass.prototype.optionsToObject.call({
                        series: this
                    }, b) || {};
                    var l = u.x;
                    if (u.id || h(l)) {
                        if (l = this.findPointIndex(u, k),
                        -1 === l || "undefined" === typeof l ? g.push(b) : d[l] && b !== e.data[l] ? (d[l].update(b, !1, null, !1),
                        d[l].touched = !0,
                        q && (k = l + 1)) : d[l] && (d[l].touched = !0),
                        !t || c !== l || f && f.enabled || this.hasDerivedData)
                            m = !0
                    } else
                        g.push(b)
                }, this);
                if (m)
                    for (b = d.length; b--; )
                        (u = d[b]) && !u.touched && u.remove && u.remove(!1, c);
                else
                    !t || f && f.enabled ? l = !1 : (b.forEach(function(a, b) {
                        a !== d[b].y && d[b].update && d[b].update(a, !1, null, !1)
                    }),
                    g.length = 0);
                d.forEach(function(a) {
                    a && (a.touched = !1)
                });
                if (!l)
                    return !1;
                g.forEach(function(a) {
                    this.addPoint(a, !1, null, null, !1)
                }, this);
                null === this.xIncrement && this.xData && this.xData.length && (this.xIncrement = M(this.xData),
                this.autoIncrement());
                return !0
            }
            ;
            c.prototype.setData = function(a, b, c, e) {
                var f = this, d = f.points, g = d && d.length || 0, m, k = f.options, q = f.chart, l = k.dataSorting, w = null, r = f.xAxis;
                w = k.turboThreshold;
                var v = this.xData, n = this.yData, z = (m = f.pointArrayMap) && m.length, p = k.keys, O = 0, B = 1, y;
                a = a || [];
                m = a.length;
                b = t(b, !0);
                l && l.enabled && (a = this.sortData(a));
                !1 !== e && m && g && !f.cropped && !f.hasGroupedData && f.visible && !f.isSeriesBoosting && (y = this.updateData(a, c));
                if (!y) {
                    f.xIncrement = null;
                    f.colorCounter = 0;
                    this.parallelArrays.forEach(function(a) {
                        f[a + "Data"].length = 0
                    });
                    if (w && m > w)
                        if (w = f.getFirstValidPoint(a),
                        h(w))
                            for (c = 0; c < m; c++)
                                v[c] = this.autoIncrement(),
                                n[c] = a[c];
                        else if (K(w))
                            if (z)
                                for (c = 0; c < m; c++)
                                    e = a[c],
                                    v[c] = e[0],
                                    n[c] = e.slice(1, z + 1);
                            else
                                for (p && (O = p.indexOf("x"),
                                B = p.indexOf("y"),
                                O = 0 <= O ? O : 0,
                                B = 0 <= B ? B : 1),
                                c = 0; c < m; c++)
                                    e = a[c],
                                    v[c] = e[O],
                                    n[c] = e[B];
                        else
                            I(12, !1, q);
                    else
                        for (c = 0; c < m; c++)
                            "undefined" !== typeof a[c] && (e = {
                                series: f
                            },
                            f.pointClass.prototype.applyOptions.apply(e, [a[c]]),
                            f.updateParallelArrays(e, c));
                    n && u(n[0]) && I(14, !0, q);
                    f.data = [];
                    f.options.data = f.userOptions.data = a;
                    for (c = g; c--; )
                        d[c] && d[c].destroy && d[c].destroy();
                    r && (r.minRange = r.userMinRange);
                    f.isDirty = q.isDirtyBox = !0;
                    f.isDirtyData = !!d;
                    c = !1
                }
                "point" === k.legendType && (this.processData(),
                this.generatePoints());
                b && q.redraw(c)
            }
            ;
            c.prototype.sortData = function(b) {
                var c = this
                  , e = c.options.dataSorting.sortKey || "y"
                  , h = function(b, c) {
                    return a(c) && b.pointClass.prototype.optionsToObject.call({
                        series: b
                    }, c) || {}
                };
                b.forEach(function(a, e) {
                    b[e] = h(c, a);
                    b[e].index = e
                }, this);
                b.concat().sort(function(a, b) {
                    a = f(e, a);
                    b = f(e, b);
                    return b < a ? -1 : b > a ? 1 : 0
                }).forEach(function(a, b) {
                    a.x = b
                }, this);
                c.linkedSeries && c.linkedSeries.forEach(function(a) {
                    var c = a.options
                      , e = c.data;
                    c.dataSorting && c.dataSorting.enabled || !e || (e.forEach(function(c, f) {
                        e[f] = h(a, c);
                        b[f] && (e[f].x = b[f].x,
                        e[f].index = f)
                    }),
                    a.setData(e, !1))
                });
                return b
            }
            ;
            c.prototype.getProcessedData = function(a) {
                var b = this.xData
                  , c = this.yData
                  , e = b.length;
                var f = 0;
                var h = this.xAxis
                  , d = this.options;
                var g = d.cropThreshold;
                var m = a || this.getExtremesFromAll || d.getExtremesFromAll
                  , u = this.isCartesian;
                a = h && h.val2lin;
                d = !(!h || !h.logarithmic);
                var k = this.requireSorting;
                if (h) {
                    h = h.getExtremes();
                    var q = h.min;
                    var l = h.max
                }
                if (u && this.sorted && !m && (!g || e > g || this.forceCrop))
                    if (b[e - 1] < q || b[0] > l)
                        b = [],
                        c = [];
                    else if (this.yData && (b[0] < q || b[e - 1] > l)) {
                        f = this.cropData(this.xData, this.yData, q, l);
                        b = f.xData;
                        c = f.yData;
                        f = f.start;
                        var t = !0
                    }
                for (g = b.length || 1; --g; )
                    if (e = d ? a(b[g]) - a(b[g - 1]) : b[g] - b[g - 1],
                    0 < e && ("undefined" === typeof w || e < w))
                        var w = e;
                    else
                        0 > e && k && (I(15, !1, this.chart),
                        k = !1);
                return {
                    xData: b,
                    yData: c,
                    cropped: t,
                    cropStart: f,
                    closestPointRange: w
                }
            }
            ;
            c.prototype.processData = function(a) {
                var b = this.xAxis;
                if (this.isCartesian && !this.isDirty && !b.isDirty && !this.yAxis.isDirty && !a)
                    return !1;
                a = this.getProcessedData();
                this.cropped = a.cropped;
                this.cropStart = a.cropStart;
                this.processedXData = a.xData;
                this.processedYData = a.yData;
                this.closestPointRange = this.basePointRange = a.closestPointRange
            }
            ;
            c.prototype.cropData = function(a, b, c, e, f) {
                var h = a.length, d = 0, g = h, m;
                f = t(f, this.cropShoulder);
                for (m = 0; m < h; m++)
                    if (a[m] >= c) {
                        d = Math.max(0, m - f);
                        break
                    }
                for (c = m; c < h; c++)
                    if (a[c] > e) {
                        g = c + f;
                        break
                    }
                return {
                    xData: a.slice(d, g),
                    yData: b.slice(d, g),
                    start: d,
                    end: g
                }
            }
            ;
            c.prototype.generatePoints = function() {
                var a = this.options, b = a.data, c = this.data, e, f = this.processedXData, h = this.processedYData, d = this.pointClass, g = f.length, u = this.cropStart || 0, k = this.hasGroupedData, q = a.keys, l = [], t;
                a = a.dataGrouping && a.dataGrouping.groupAll ? u : 0;
                c || k || (c = [],
                c.length = b.length,
                c = this.data = c);
                q && k && (this.options.keys = !1);
                for (t = 0; t < g; t++) {
                    var w = u + t;
                    if (k) {
                        var r = (new d).init(this, [f[t]].concat(R(h[t])));
                        r.dataGroup = this.groupMap[a + t];
                        r.dataGroup.options && (r.options = r.dataGroup.options,
                        C(r, r.dataGroup.options),
                        delete r.dataLabels)
                    } else
                        (r = c[w]) || "undefined" === typeof b[w] || (c[w] = r = (new d).init(this, b[w], f[t]));
                    r && (r.index = k ? a + t : w,
                    l[t] = r)
                }
                this.options.keys = q;
                if (c && (g !== (e = c.length) || k))
                    for (t = 0; t < e; t++)
                        t !== u || k || (t += g),
                        c[t] && (c[t].destroyElements(),
                        c[t].plotX = void 0);
                this.data = c;
                this.points = l;
                m(this, "afterGeneratePoints")
            }
            ;
            c.prototype.getXExtremes = function(a) {
                return {
                    min: B(a),
                    max: M(a)
                }
            }
            ;
            c.prototype.getExtremes = function(a, b) {
                var c = this.xAxis
                  , e = this.yAxis
                  , f = this.processedXData || this.xData
                  , d = []
                  , g = 0
                  , u = 0;
                var k = 0;
                var q = this.requireSorting ? this.cropShoulder : 0, t = e ? e.positiveValuesOnly : !1, l;
                a = a || this.stackedYData || this.processedYData || [];
                e = a.length;
                c && (k = c.getExtremes(),
                u = k.min,
                k = k.max);
                for (l = 0; l < e; l++) {
                    var w = f[l];
                    var r = a[l];
                    var v = (h(r) || K(r)) && (r.length || 0 < r || !t);
                    w = b || this.getExtremesFromAll || this.options.getExtremesFromAll || this.cropped || !c || (f[l + q] || w) >= u && (f[l - q] || w) <= k;
                    if (v && w)
                        if (v = r.length)
                            for (; v--; )
                                h(r[v]) && (d[g++] = r[v]);
                        else
                            d[g++] = r
                }
                a = {
                    dataMin: B(d),
                    dataMax: M(d)
                };
                m(this, "afterGetExtremes", {
                    dataExtremes: a
                });
                return a
            }
            ;
            c.prototype.applyExtremes = function() {
                var a = this.getExtremes();
                this.dataMin = a.dataMin;
                this.dataMax = a.dataMax;
                return a
            }
            ;
            c.prototype.getFirstValidPoint = function(a) {
                for (var b = null, c = a.length, e = 0; null === b && e < c; )
                    b = a[e],
                    e++;
                return b
            }
            ;
            c.prototype.translate = function() {
                this.processedXData || this.processData();
                this.generatePoints();
                var b = this.options, c = b.stacking, e = this.xAxis, f = e.categories, d = this.enabledDataSorting, g = this.yAxis, u = this.points, k = u.length, q = !!this.modifyValue, l, v = this.pointPlacementToXValue(), n = !!v, p = b.threshold, z = b.startFromThreshold ? p : 0, O, B = this.zoneAxis || "y", y = Number.MAX_VALUE;
                for (l = 0; l < k; l++) {
                    var C = u[l]
                      , D = C.x
                      , I = C.y
                      , L = C.low
                      , N = c && g.stacking && g.stacking.stacks[(this.negStacks && I < (z ? 0 : p) ? "-" : "") + this.stackKey]
                      , M = void 0
                      , Q = void 0;
                    if (g.positiveValuesOnly && !g.validatePositiveValue(I) || e.positiveValuesOnly && !e.validatePositiveValue(D))
                        C.isNull = !0;
                    C.plotX = O = r(w(e.translate(D, 0, 0, 0, 1, v, "flags" === this.type), -1E5, 1E5));
                    if (c && this.visible && N && N[D]) {
                        var x = this.getStackIndicator(x, D, this.index);
                        C.isNull || (M = N[D],
                        Q = M.points[x.key])
                    }
                    K(Q) && (L = Q[0],
                    I = Q[1],
                    L === z && x.key === N[D].base && (L = t(h(p) && p, g.min)),
                    g.positiveValuesOnly && 0 >= L && (L = null),
                    C.total = C.stackTotal = M.total,
                    C.percentage = M.total && C.y / M.total * 100,
                    C.stackY = I,
                    this.irregularWidths || M.setOffset(this.pointXOffset || 0, this.barW || 0));
                    C.yBottom = a(L) ? w(g.translate(L, 0, 1, 0, 1), -1E5, 1E5) : null;
                    q && (I = this.modifyValue(I, C));
                    C.plotY = void 0;
                    h(I) && (I = g.translate(I, !1, !0, !1, !0),
                    "undefined" !== typeof I && (C.plotY = w(I, -1E5, 1E5)));
                    C.isInside = this.isPointInside(C);
                    C.clientX = n ? r(e.translate(D, 0, 0, 0, 1, v)) : O;
                    C.negative = C[B] < (b[B + "Threshold"] || p || 0);
                    C.category = f && "undefined" !== typeof f[C.x] ? f[C.x] : C.x;
                    if (!C.isNull && !1 !== C.visible) {
                        "undefined" !== typeof A && (y = Math.min(y, Math.abs(O - A)));
                        var A = O
                    }
                    C.zone = this.zones.length && C.getZone();
                    !C.graphic && this.group && d && (C.isNew = !0)
                }
                this.closestPointRangePx = y;
                m(this, "afterTranslate")
            }
            ;
            c.prototype.getValidPoints = function(a, b, c) {
                var e = this.chart;
                return (a || this.points || []).filter(function(a) {
                    return b && !e.isInsidePlot(a.plotX, a.plotY, {
                        inverted: e.inverted
                    }) ? !1 : !1 !== a.visible && (c || !a.isNull)
                })
            }
            ;
            c.prototype.getClipBox = function(a, b) {
                var c = this.options
                  , e = this.chart
                  , f = e.inverted
                  , h = this.xAxis
                  , d = h && this.yAxis
                  , g = e.options.chart.scrollablePlotArea || {};
                a && !1 === c.clip && d ? a = f ? {
                    y: -e.chartWidth + d.len + d.pos,
                    height: e.chartWidth,
                    width: e.chartHeight,
                    x: -e.chartHeight + h.len + h.pos
                } : {
                    y: -d.pos,
                    height: e.chartHeight,
                    width: e.chartWidth,
                    x: -h.pos
                } : (a = this.clipBox || e.clipBox,
                b && (a.width = e.plotSizeX,
                a.x = (e.scrollablePixelsX || 0) * (g.scrollPositionX || 0)));
                return b ? {
                    width: a.width,
                    x: a.x
                } : a
            }
            ;
            c.prototype.getSharedClipKey = function(a) {
                if (this.sharedClipKey)
                    return this.sharedClipKey;
                var b = [a && a.duration, a && a.easing, a && a.defer, this.getClipBox(a).height, this.options.xAxis, this.options.yAxis].join();
                if (!1 !== this.options.clip || a)
                    this.sharedClipKey = b;
                return b
            }
            ;
            c.prototype.setClip = function(a) {
                var b = this.chart
                  , c = this.options
                  , e = b.renderer
                  , f = b.inverted
                  , h = this.clipBox
                  , d = this.getClipBox(a)
                  , g = this.getSharedClipKey(a)
                  , m = b.sharedClips[g]
                  , u = b.sharedClips[g + "m"];
                a && (d.width = 0,
                f && (d.x = b.plotHeight + (!1 !== c.clip ? 0 : b.plotTop)));
                m ? b.hasLoaded || m.attr(d) : (a && (b.sharedClips[g + "m"] = u = e.clipRect(f ? (b.plotSizeX || 0) + 99 : -99, f ? -b.plotLeft : -b.plotTop, 99, f ? b.chartWidth : b.chartHeight)),
                b.sharedClips[g] = m = e.clipRect(d),
                m.count = {
                    length: 0
                });
                a && !m.count[this.index] && (m.count[this.index] = !0,
                m.count.length += 1);
                if (!1 !== c.clip || a)
                    this.group.clip(a || h ? m : b.clipRect),
                    this.markerGroup.clip(u);
                a || (m.count[this.index] && (delete m.count[this.index],
                --m.count.length),
                0 === m.count.length && (h || (b.sharedClips[g] = m.destroy()),
                u && (b.sharedClips[g + "m"] = u.destroy())))
            }
            ;
            c.prototype.animate = function(a) {
                var b = this.chart
                  , c = l(this.options.animation)
                  , e = this.sharedClipKey;
                if (a)
                    this.setClip(c);
                else if (e) {
                    a = b.sharedClips[e];
                    e = b.sharedClips[e + "m"];
                    var f = this.getClipBox(c, !0);
                    a && a.animate(f, c);
                    e && e.animate({
                        width: f.width + 99,
                        x: f.x - (b.inverted ? 0 : 99)
                    }, c)
                }
            }
            ;
            c.prototype.afterAnimate = function() {
                this.setClip();
                m(this, "afterAnimate");
                this.finishedAnimating = !0
            }
            ;
            c.prototype.drawPoints = function() {
                var a = this.points, b = this.chart, c, e, f = this.options.marker, h = this[this.specialGroup] || this.markerGroup, d = this.xAxis, g = t(f.enabled, !d || d.isRadial ? !0 : null, this.closestPointRangePx >= f.enabledThreshold * f.radius);
                if (!1 !== f.enabled || this._hasPointMarkers)
                    for (c = 0; c < a.length; c++) {
                        var m = a[c];
                        var u = (e = m.graphic) ? "animate" : "attr";
                        var k = m.marker || {};
                        var q = !!m.marker;
                        if ((g && "undefined" === typeof k.enabled || k.enabled) && !m.isNull && !1 !== m.visible) {
                            var l = t(k.symbol, this.symbol, "rect");
                            var w = this.markerAttribs(m, m.selected && "select");
                            this.enabledDataSorting && (m.startXPos = d.reversed ? -(w.width || 0) : d.width);
                            var r = !1 !== m.isInside;
                            e ? e[r ? "show" : "hide"](r).animate(w) : r && (0 < (w.width || 0) || m.hasImage) && (m.graphic = e = b.renderer.symbol(l, w.x, w.y, w.width, w.height, q ? k : f).add(h),
                            this.enabledDataSorting && b.hasRendered && (e.attr({
                                x: m.startXPos
                            }),
                            u = "animate"));
                            e && "animate" === u && e[r ? "show" : "hide"](r).animate(w);
                            if (e && !b.styledMode)
                                e[u](this.pointAttribs(m, m.selected && "select"));
                            e && e.addClass(m.getClassName(), !0)
                        } else
                            e && (m.graphic = e.destroy())
                    }
            }
            ;
            c.prototype.markerAttribs = function(a, b) {
                var c = this.options
                  , e = c.marker
                  , f = a.marker || {}
                  , h = f.symbol || e.symbol
                  , d = t(f.radius, e.radius);
                b && (e = e.states[b],
                b = f.states && f.states[b],
                d = t(b && b.radius, e && e.radius, d + (e && e.radiusPlus || 0)));
                a.hasImage = h && 0 === h.indexOf("url");
                a.hasImage && (d = 0);
                a = {
                    x: c.crisp ? Math.floor(a.plotX - d) : a.plotX - d,
                    y: a.plotY - d
                };
                d && (a.width = a.height = 2 * d);
                return a
            }
            ;
            c.prototype.pointAttribs = function(a, b) {
                var c = this.options.marker
                  , e = a && a.options
                  , f = e && e.marker || {}
                  , h = this.color
                  , d = e && e.color
                  , g = a && a.color;
                e = t(f.lineWidth, c.lineWidth);
                var m = a && a.zone && a.zone.color;
                a = 1;
                h = d || m || g || h;
                d = f.fillColor || c.fillColor || h;
                h = f.lineColor || c.lineColor || h;
                b = b || "normal";
                c = c.states[b];
                b = f.states && f.states[b] || {};
                e = t(b.lineWidth, c.lineWidth, e + t(b.lineWidthPlus, c.lineWidthPlus, 0));
                d = b.fillColor || c.fillColor || d;
                h = b.lineColor || c.lineColor || h;
                a = t(b.opacity, c.opacity, a);
                return {
                    stroke: h,
                    "stroke-width": e,
                    fill: d,
                    opacity: a
                }
            }
            ;
            c.prototype.destroy = function(a) {
                var b = this, c = b.chart, e = /AppleWebKit\/533/.test(y.navigator.userAgent), f, h, g = b.data || [], u, k;
                m(b, "destroy");
                this.removeEvents(a);
                (b.axisTypes || []).forEach(function(a) {
                    (k = b[a]) && k.series && (q(k.series, b),
                    k.isDirty = k.forceRedraw = !0)
                });
                b.legendItem && b.chart.legend.destroyItem(b);
                for (h = g.length; h--; )
                    (u = g[h]) && u.destroy && u.destroy();
                b.clips && b.clips.forEach(function(a) {
                    return a.destroy()
                });
                d.clearTimeout(b.animationTimeout);
                X(b, function(a, b) {
                    a instanceof p && !a.survive && (f = e && "group" === b ? "hide" : "destroy",
                    a[f]())
                });
                c.hoverSeries === b && (c.hoverSeries = void 0);
                q(c.series, b);
                c.orderSeries();
                X(b, function(c, e) {
                    a && "hcEvents" === e || delete b[e]
                })
            }
            ;
            c.prototype.applyZones = function() {
                var a = this, b = this.chart, c = b.renderer, e = this.zones, f, h, d = this.clips || [], g, m = this.graph, u = this.area, k = Math.max(b.chartWidth, b.chartHeight), q = this[(this.zoneAxis || "y") + "Axis"], l = b.inverted, r, v, p, n = !1, z, K;
                if (e.length && (m || u) && q && "undefined" !== typeof q.min) {
                    var O = q.reversed;
                    var B = q.horiz;
                    m && !this.showLine && m.hide();
                    u && u.hide();
                    var C = q.getExtremes();
                    e.forEach(function(e, y) {
                        f = O ? B ? b.plotWidth : 0 : B ? 0 : q.toPixels(C.min) || 0;
                        f = w(t(h, f), 0, k);
                        h = w(Math.round(q.toPixels(t(e.value, C.max), !0) || 0), 0, k);
                        n && (f = h = q.toPixels(C.max));
                        r = Math.abs(f - h);
                        v = Math.min(f, h);
                        p = Math.max(f, h);
                        q.isXAxis ? (g = {
                            x: l ? p : v,
                            y: 0,
                            width: r,
                            height: k
                        },
                        B || (g.x = b.plotHeight - g.x)) : (g = {
                            x: 0,
                            y: l ? p : v,
                            width: k,
                            height: r
                        },
                        B && (g.y = b.plotWidth - g.y));
                        l && c.isVML && (g = q.isXAxis ? {
                            x: 0,
                            y: O ? v : p,
                            height: g.width,
                            width: b.chartWidth
                        } : {
                            x: g.y - b.plotLeft - b.spacingBox.x,
                            y: 0,
                            width: g.height,
                            height: b.chartHeight
                        });
                        d[y] ? d[y].animate(g) : d[y] = c.clipRect(g);
                        z = a["zone-area-" + y];
                        K = a["zone-graph-" + y];
                        m && K && K.clip(d[y]);
                        u && z && z.clip(d[y]);
                        n = e.value > C.max;
                        a.resetZones && 0 === h && (h = void 0)
                    });
                    this.clips = d
                } else
                    a.visible && (m && m.show(!0),
                    u && u.show(!0))
            }
            ;
            c.prototype.invertGroups = function(a) {
                function b() {
                    ["group", "markerGroup"].forEach(function(b) {
                        c[b] && (e.renderer.isVML && c[b].attr({
                            width: c.yAxis.len,
                            height: c.xAxis.len
                        }),
                        c[b].width = c.yAxis.len,
                        c[b].height = c.xAxis.len,
                        c[b].invert(c.isRadialSeries ? !1 : a))
                    })
                }
                var c = this
                  , e = c.chart;
                c.xAxis && (c.eventsToUnbind.push(L(e, "resize", b)),
                b(),
                c.invertGroups = b)
            }
            ;
            c.prototype.plotGroup = function(b, c, e, f, h) {
                var d = this[b]
                  , g = !d;
                e = {
                    visibility: e,
                    zIndex: f || .1
                };
                "undefined" === typeof this.opacity || this.chart.styledMode || "inactive" === this.state || (e.opacity = this.opacity);
                g && (this[b] = d = this.chart.renderer.g().add(h));
                d.addClass("highcharts-" + c + " highcharts-series-" + this.index + " highcharts-" + this.type + "-series " + (a(this.colorIndex) ? "highcharts-color-" + this.colorIndex + " " : "") + (this.options.className || "") + (d.hasClass("highcharts-tracker") ? " highcharts-tracker" : ""), !0);
                d.attr(e)[g ? "attr" : "animate"](this.getPlotBox());
                return d
            }
            ;
            c.prototype.getPlotBox = function() {
                var a = this.chart
                  , b = this.xAxis
                  , c = this.yAxis;
                a.inverted && (b = c,
                c = this.xAxis);
                return {
                    translateX: b ? b.left : a.plotLeft,
                    translateY: c ? c.top : a.plotTop,
                    scaleX: 1,
                    scaleY: 1
                }
            }
            ;
            c.prototype.removeEvents = function(a) {
                a || Q(this);
                this.eventsToUnbind.length && (this.eventsToUnbind.forEach(function(a) {
                    a()
                }),
                this.eventsToUnbind.length = 0)
            }
            ;
            c.prototype.render = function() {
                var a = this
                  , b = a.chart
                  , c = a.options
                  , e = l(c.animation)
                  , f = !a.finishedAnimating && b.renderer.isSVG && e.duration
                  , h = a.visible ? "inherit" : "hidden"
                  , d = c.zIndex
                  , g = a.hasRendered
                  , u = b.seriesGroup
                  , k = b.inverted;
                m(this, "render");
                var q = a.plotGroup("group", "series", h, d, u);
                a.markerGroup = a.plotGroup("markerGroup", "markers", h, d, u);
                f && a.animate && a.animate(!0);
                q.inverted = t(a.invertible, a.isCartesian) ? k : !1;
                a.drawGraph && (a.drawGraph(),
                a.applyZones());
                a.visible && a.drawPoints();
                a.drawDataLabels && a.drawDataLabels();
                a.redrawPoints && a.redrawPoints();
                a.drawTracker && !1 !== a.options.enableMouseTracking && a.drawTracker();
                a.invertGroups(k);
                !1 === c.clip || a.sharedClipKey || g || q.clip(b.clipRect);
                f && a.animate && a.animate();
                g || (f && e.defer && (f += e.defer),
                a.animationTimeout = Z(function() {
                    a.afterAnimate()
                }, f || 0));
                a.isDirty = !1;
                a.hasRendered = !0;
                m(a, "afterRender")
            }
            ;
            c.prototype.redraw = function() {
                var a = this.chart
                  , b = this.isDirty || this.isDirtyData
                  , c = this.group
                  , e = this.xAxis
                  , f = this.yAxis;
                c && (a.inverted && c.attr({
                    width: a.plotWidth,
                    height: a.plotHeight
                }),
                c.animate({
                    translateX: t(e && e.left, a.plotLeft),
                    translateY: t(f && f.top, a.plotTop)
                }));
                this.translate();
                this.render();
                b && delete this.kdTree
            }
            ;
            c.prototype.searchPoint = function(a, b) {
                var c = this.xAxis
                  , e = this.yAxis
                  , f = this.chart.inverted;
                return this.searchKDTree({
                    clientX: f ? c.len - a.chartY + c.pos : a.chartX - c.pos,
                    plotY: f ? e.len - a.chartX + e.pos : a.chartY - e.pos
                }, b, a)
            }
            ;
            c.prototype.buildKDTree = function(a) {
                function b(a, e, f) {
                    var h;
                    if (h = a && a.length) {
                        var d = c.kdAxisArray[e % f];
                        a.sort(function(a, b) {
                            return a[d] - b[d]
                        });
                        h = Math.floor(h / 2);
                        return {
                            point: a[h],
                            left: b(a.slice(0, h), e + 1, f),
                            right: b(a.slice(h + 1), e + 1, f)
                        }
                    }
                }
                this.buildingKdTree = !0;
                var c = this
                  , e = -1 < c.options.findNearestPointBy.indexOf("y") ? 2 : 1;
                delete c.kdTree;
                Z(function() {
                    c.kdTree = b(c.getValidPoints(null, !c.directTouch), e, e);
                    c.buildingKdTree = !1
                }, c.options.kdNow || a && "touchstart" === a.type ? 0 : 1)
            }
            ;
            c.prototype.searchKDTree = function(b, c, e) {
                function f(b, c, e, u) {
                    var k = c.point
                      , q = h.kdAxisArray[e % u]
                      , l = k;
                    var t = a(b[d]) && a(k[d]) ? Math.pow(b[d] - k[d], 2) : null;
                    var w = a(b[g]) && a(k[g]) ? Math.pow(b[g] - k[g], 2) : null;
                    w = (t || 0) + (w || 0);
                    k.dist = a(w) ? Math.sqrt(w) : Number.MAX_VALUE;
                    k.distX = a(t) ? Math.sqrt(t) : Number.MAX_VALUE;
                    q = b[q] - k[q];
                    w = 0 > q ? "left" : "right";
                    t = 0 > q ? "right" : "left";
                    c[w] && (w = f(b, c[w], e + 1, u),
                    l = w[m] < l[m] ? w : k);
                    c[t] && Math.sqrt(q * q) < l[m] && (b = f(b, c[t], e + 1, u),
                    l = b[m] < l[m] ? b : l);
                    return l
                }
                var h = this
                  , d = this.kdAxisArray[0]
                  , g = this.kdAxisArray[1]
                  , m = c ? "distX" : "dist";
                c = -1 < h.options.findNearestPointBy.indexOf("y") ? 2 : 1;
                this.kdTree || this.buildingKdTree || this.buildKDTree(e);
                if (this.kdTree)
                    return f(b, this.kdTree, c, c)
            }
            ;
            c.prototype.pointPlacementToXValue = function() {
                var a = this.options
                  , b = a.pointRange
                  , c = this.xAxis;
                a = a.pointPlacement;
                "between" === a && (a = c.reversed ? -.5 : .5);
                return h(a) ? a * (b || c.pointRange) : 0
            }
            ;
            c.prototype.isPointInside = function(a) {
                return "undefined" !== typeof a.plotY && "undefined" !== typeof a.plotX && 0 <= a.plotY && a.plotY <= this.yAxis.len && 0 <= a.plotX && a.plotX <= this.xAxis.len
            }
            ;
            c.prototype.drawTracker = function() {
                var a = this
                  , b = a.options
                  , c = b.trackByArea
                  , e = [].concat(c ? a.areaPath : a.graphPath)
                  , f = a.chart
                  , h = f.pointer
                  , d = f.renderer
                  , g = f.options.tooltip.snap
                  , u = a.tracker
                  , k = function(b) {
                    if (f.hoverSeries !== a)
                        a.onMouseOver()
                }
                  , q = "rgba(192,192,192," + (D ? .0001 : .002) + ")";
                u ? u.attr({
                    d: e
                }) : a.graph && (a.tracker = d.path(e).attr({
                    visibility: a.visible ? "visible" : "hidden",
                    zIndex: 2
                }).addClass(c ? "highcharts-tracker-area" : "highcharts-tracker-line").add(a.group),
                f.styledMode || a.tracker.attr({
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    stroke: q,
                    fill: c ? q : "none",
                    "stroke-width": a.graph.strokeWidth() + (c ? 0 : 2 * g)
                }),
                [a.tracker, a.markerGroup, a.dataLabelsGroup].forEach(function(a) {
                    if (a && (a.addClass("highcharts-tracker").on("mouseover", k).on("mouseout", function(a) {
                        h.onTrackerMouseOut(a)
                    }),
                    b.cursor && !f.styledMode && a.css({
                        cursor: b.cursor
                    }),
                    n))
                        a.on("touchstart", k)
                }));
                m(this, "afterDrawTracker")
            }
            ;
            c.prototype.addPoint = function(a, b, c, e, f) {
                var h = this.options
                  , d = this.data
                  , g = this.chart
                  , u = this.xAxis;
                u = u && u.hasNames && u.names;
                var k = h.data, q = this.xData, l;
                b = t(b, !0);
                var w = {
                    series: this
                };
                this.pointClass.prototype.applyOptions.apply(w, [a]);
                var r = w.x;
                var v = q.length;
                if (this.requireSorting && r < q[v - 1])
                    for (l = !0; v && q[v - 1] > r; )
                        v--;
                this.updateParallelArrays(w, "splice", v, 0, 0);
                this.updateParallelArrays(w, v);
                u && w.name && (u[r] = w.name);
                k.splice(v, 0, a);
                l && (this.data.splice(v, 0, null),
                this.processData());
                "point" === h.legendType && this.generatePoints();
                c && (d[0] && d[0].remove ? d[0].remove(!1) : (d.shift(),
                this.updateParallelArrays(w, "shift"),
                k.shift()));
                !1 !== f && m(this, "addPoint", {
                    point: w
                });
                this.isDirtyData = this.isDirty = !0;
                b && g.redraw(e)
            }
            ;
            c.prototype.removePoint = function(a, c, e) {
                var f = this
                  , h = f.data
                  , d = h[a]
                  , g = f.points
                  , m = f.chart
                  , u = function() {
                    g && g.length === h.length && g.splice(a, 1);
                    h.splice(a, 1);
                    f.options.data.splice(a, 1);
                    f.updateParallelArrays(d || {
                        series: f
                    }, "splice", a, 1);
                    d && d.destroy();
                    f.isDirty = !0;
                    f.isDirtyData = !0;
                    c && m.redraw()
                };
                b(e, m);
                c = t(c, !0);
                d ? d.firePointEvent("remove", null, u) : u()
            }
            ;
            c.prototype.remove = function(a, b, c, e) {
                function f() {
                    h.destroy(e);
                    d.isDirtyLegend = d.isDirtyBox = !0;
                    d.linkSeries();
                    t(a, !0) && d.redraw(b)
                }
                var h = this
                  , d = h.chart;
                !1 !== c ? m(h, "remove", null, f) : f()
            }
            ;
            c.prototype.update = function(a, b) {
                a = e(a, this.userOptions);
                m(this, "update", {
                    options: a
                });
                var c = this, f = c.chart, h = c.userOptions, d = c.initialType || c.type, g = f.options.plotOptions, u = a.type || h.type || f.options.chart.type, q = !(this.hasDerivedData || u && u !== this.type || "undefined" !== typeof a.pointStart || "undefined" !== typeof a.pointInterval || c.hasOptionChanged("dataGrouping") || c.hasOptionChanged("pointStart") || c.hasOptionChanged("pointInterval") || c.hasOptionChanged("pointIntervalUnit") || c.hasOptionChanged("keys")), l = k[d].prototype, w, r = ["eventOptions", "navigatorSeries", "baseSeries"], v = c.finishedAnimating && {
                    animation: !1
                }, p = {};
                u = u || d;
                q && (r.push("data", "isDirtyData", "points", "processedXData", "processedYData", "xIncrement", "cropped", "_hasPointMarkers", "_hasPointLabels", "clips", "nodes", "layout", "mapMap", "mapData", "minY", "maxY", "minX", "maxX"),
                !1 !== a.visible && r.push("area", "graph"),
                c.parallelArrays.forEach(function(a) {
                    r.push(a + "Data")
                }),
                a.data && (a.dataSorting && C(c.options.dataSorting, a.dataSorting),
                this.setData(a.data, !1)));
                a = O(h, v, {
                    index: "undefined" === typeof h.index ? c.index : h.index,
                    pointStart: t(g && g.series && g.series.pointStart, h.pointStart, c.xData[0])
                }, !q && {
                    data: c.options.data
                }, a);
                q && a.data && (a.data = c.options.data);
                r = ["group", "markerGroup", "dataLabelsGroup", "transformGroup"].concat(r);
                r.forEach(function(a) {
                    r[a] = c[a];
                    delete c[a]
                });
                h = !1;
                if (k[u]) {
                    if (h = u !== c.type,
                    c.remove(!1, !1, !1, !0),
                    h)
                        if (Object.setPrototypeOf)
                            Object.setPrototypeOf(c, k[u].prototype);
                        else {
                            g = Object.hasOwnProperty.call(c, "hcEvents") && c.hcEvents;
                            for (w in l)
                                c[w] = void 0;
                            C(c, k[u].prototype);
                            g ? c.hcEvents = g : delete c.hcEvents
                        }
                } else
                    I(17, !0, f, {
                        missingModuleFor: u
                    });
                r.forEach(function(a) {
                    c[a] = r[a]
                });
                c.init(f, a);
                if (q && this.points) {
                    var n = c.options;
                    !1 === n.visible ? (p.graphic = 1,
                    p.dataLabel = 1) : c._hasPointLabels || (a = n.marker,
                    u = n.dataLabels,
                    a && (!1 === a.enabled || "symbol"in a) && (p.graphic = 1),
                    u && !1 === u.enabled && (p.dataLabel = 1));
                    this.points.forEach(function(a) {
                        a && a.series && (a.resolveColor(),
                        Object.keys(p).length && a.destroyElements(p),
                        !1 === n.showInLegend && a.legendItem && f.legend.destroyItem(a))
                    }, this)
                }
                c.initialType = d;
                f.linkSeries();
                h && c.linkedSeries.length && (c.isDirtyData = !0);
                m(this, "afterUpdate");
                t(b, !0) && f.redraw(q ? void 0 : !1)
            }
            ;
            c.prototype.setName = function(a) {
                this.name = this.options.name = this.userOptions.name = a;
                this.chart.isDirtyLegend = !0
            }
            ;
            c.prototype.hasOptionChanged = function(a) {
                var b = this.options[a]
                  , c = this.chart.options.plotOptions
                  , e = this.userOptions[a];
                return e ? b !== e : b !== t(c && c[this.type] && c[this.type][a], c && c.series && c.series[a], b)
            }
            ;
            c.prototype.onMouseOver = function() {
                var a = this.chart
                  , b = a.hoverSeries;
                a.pointer.setHoverChartIndex();
                if (b && b !== this)
                    b.onMouseOut();
                this.options.events.mouseOver && m(this, "mouseOver");
                this.setState("hover");
                a.hoverSeries = this
            }
            ;
            c.prototype.onMouseOut = function() {
                var a = this.options
                  , b = this.chart
                  , c = b.tooltip
                  , e = b.hoverPoint;
                b.hoverSeries = null;
                if (e)
                    e.onMouseOut();
                this && a.events.mouseOut && m(this, "mouseOut");
                !c || this.stickyTracking || c.shared && !this.noSharedTooltip || c.hide();
                b.series.forEach(function(a) {
                    a.setState("", !0)
                })
            }
            ;
            c.prototype.setState = function(a, b) {
                var c = this
                  , e = c.options
                  , f = c.graph
                  , h = e.inactiveOtherPoints
                  , d = e.states
                  , g = e.lineWidth
                  , m = e.opacity
                  , u = t(d[a || "normal"] && d[a || "normal"].animation, c.chart.options.chart.animation);
                e = 0;
                a = a || "";
                if (c.state !== a && ([c.group, c.markerGroup, c.dataLabelsGroup].forEach(function(b) {
                    b && (c.state && b.removeClass("highcharts-series-" + c.state),
                    a && b.addClass("highcharts-series-" + a))
                }),
                c.state = a,
                !c.chart.styledMode)) {
                    if (d[a] && !1 === d[a].enabled)
                        return;
                    a && (g = d[a].lineWidth || g + (d[a].lineWidthPlus || 0),
                    m = t(d[a].opacity, m));
                    if (f && !f.dashstyle)
                        for (d = {
                            "stroke-width": g
                        },
                        f.animate(d, u); c["zone-graph-" + e]; )
                            c["zone-graph-" + e].animate(d, u),
                            e += 1;
                    h || [c.group, c.markerGroup, c.dataLabelsGroup, c.labelBySeries].forEach(function(a) {
                        a && a.animate({
                            opacity: m
                        }, u)
                    })
                }
                b && h && c.points && c.setAllPointsToState(a || void 0)
            }
            ;
            c.prototype.setAllPointsToState = function(a) {
                this.points.forEach(function(b) {
                    b.setState && b.setState(a)
                })
            }
            ;
            c.prototype.setVisible = function(a, b) {
                var c = this
                  , e = c.chart
                  , f = c.legendItem
                  , h = e.options.chart.ignoreHiddenSeries
                  , d = c.visible;
                var g = (c.visible = a = c.options.visible = c.userOptions.visible = "undefined" === typeof a ? !d : a) ? "show" : "hide";
                ["group", "dataLabelsGroup", "markerGroup", "tracker", "tt"].forEach(function(a) {
                    if (c[a])
                        c[a][g]()
                });
                if (e.hoverSeries === c || (e.hoverPoint && e.hoverPoint.series) === c)
                    c.onMouseOut();
                f && e.legend.colorizeItem(c, a);
                c.isDirty = !0;
                c.options.stacking && e.series.forEach(function(a) {
                    a.options.stacking && a.visible && (a.isDirty = !0)
                });
                c.linkedSeries.forEach(function(b) {
                    b.setVisible(a, !1)
                });
                h && (e.isDirtyBox = !0);
                m(c, g);
                !1 !== b && e.redraw()
            }
            ;
            c.prototype.show = function() {
                this.setVisible(!0)
            }
            ;
            c.prototype.hide = function() {
                this.setVisible(!1)
            }
            ;
            c.prototype.select = function(a) {
                this.selected = a = this.options.selected = "undefined" === typeof a ? !this.selected : a;
                this.checkbox && (this.checkbox.checked = a);
                m(this, a ? "select" : "unselect")
            }
            ;
            c.prototype.shouldShowTooltip = function(a, b, c) {
                void 0 === c && (c = {});
                c.series = this;
                c.visiblePlotOnly = !0;
                return this.chart.isInsidePlot(a, b, c)
            }
            ;
            c.defaultOptions = {
                lineWidth: 2,
                allowPointSelect: !1,
                crisp: !0,
                showCheckbox: !1,
                animation: {
                    duration: 1E3
                },
                events: {},
                marker: {
                    enabledThreshold: 2,
                    lineColor: F.backgroundColor,
                    lineWidth: 0,
                    radius: 4,
                    states: {
                        normal: {
                            animation: !0
                        },
                        hover: {
                            animation: {
                                duration: 50
                            },
                            enabled: !0,
                            radiusPlus: 2,
                            lineWidthPlus: 1
                        },
                        select: {
                            fillColor: F.neutralColor20,
                            lineColor: F.neutralColor100,
                            lineWidth: 2
                        }
                    }
                },
                point: {
                    events: {}
                },
                dataLabels: {
                    animation: {},
                    align: "center",
                    defer: !0,
                    formatter: function() {
                        var a = this.series.chart.numberFormatter;
                        return "number" !== typeof this.y ? "" : a(this.y, -1)
                    },
                    padding: 5,
                    style: {
                        fontSize: "11px",
                        fontWeight: "bold",
                        color: "contrast",
                        textOutline: "1px contrast"
                    },
                    verticalAlign: "bottom",
                    x: 0,
                    y: 0
                },
                cropThreshold: 300,
                opacity: 1,
                pointRange: 0,
                softThreshold: !0,
                states: {
                    normal: {
                        animation: !0
                    },
                    hover: {
                        animation: {
                            duration: 50
                        },
                        lineWidthPlus: 1,
                        marker: {},
                        halo: {
                            size: 10,
                            opacity: .25
                        }
                    },
                    select: {
                        animation: {
                            duration: 0
                        }
                    },
                    inactive: {
                        animation: {
                            duration: 50
                        },
                        opacity: .2
                    }
                },
                stickyTracking: !0,
                turboThreshold: 1E3,
                findNearestPointBy: "x"
            };
            return c
        }();
        C(c.prototype, {
            axisTypes: ["xAxis", "yAxis"],
            coll: "series",
            colorCounter: 0,
            cropShoulder: 1,
            directTouch: !1,
            drawLegendSymbol: H.drawLineMarker,
            isCartesian: !0,
            kdAxisArray: ["clientX", "plotY"],
            parallelArrays: ["x", "y"],
            pointClass: G,
            requireSorting: !0,
            sorted: !0
        });
        J.series = c;
        "";
        "";
        return c
    });
    P(c, "Extensions/ScrollablePlotArea.js", [c["Core/Animation/AnimationUtilities.js"], c["Core/Axis/Axis.js"], c["Core/Chart/Chart.js"], c["Core/Series/Series.js"], c["Core/Renderer/RendererRegistry.js"], c["Core/Utilities.js"]], function(c, x, E, H, A, F) {
        var n = c.stop
          , J = F.addEvent
          , p = F.createElement
          , d = F.merge
          , l = F.pick;
        J(E, "afterSetChartSize", function(b) {
            var c = this.options.chart.scrollablePlotArea
              , l = c && c.minWidth;
            c = c && c.minHeight;
            if (!this.renderer.forExport) {
                if (l) {
                    if (this.scrollablePixelsX = l = Math.max(0, l - this.chartWidth)) {
                        this.scrollablePlotBox = this.renderer.scrollablePlotBox = d(this.plotBox);
                        this.plotBox.width = this.plotWidth += l;
                        this.inverted ? this.clipBox.height += l : this.clipBox.width += l;
                        var p = {
                            1: {
                                name: "right",
                                value: l
                            }
                        }
                    }
                } else
                    c && (this.scrollablePixelsY = l = Math.max(0, c - this.chartHeight)) && (this.scrollablePlotBox = this.renderer.scrollablePlotBox = d(this.plotBox),
                    this.plotBox.height = this.plotHeight += l,
                    this.inverted ? this.clipBox.width += l : this.clipBox.height += l,
                    p = {
                        2: {
                            name: "bottom",
                            value: l
                        }
                    });
                p && !b.skipAxes && this.axes.forEach(function(b) {
                    p[b.side] ? b.getPlotLinePath = function() {
                        var c = p[b.side].name
                          , d = this[c];
                        this[c] = d - p[b.side].value;
                        var g = x.prototype.getPlotLinePath.apply(this, arguments);
                        this[c] = d;
                        return g
                    }
                    : (b.setAxisSize(),
                    b.setAxisTranslation())
                })
            }
        });
        J(E, "render", function() {
            this.scrollablePixelsX || this.scrollablePixelsY ? (this.setUpScrolling && this.setUpScrolling(),
            this.applyFixed()) : this.fixedDiv && this.applyFixed()
        });
        E.prototype.setUpScrolling = function() {
            var b = this
              , c = {
                WebkitOverflowScrolling: "touch",
                overflowX: "hidden",
                overflowY: "hidden"
            };
            this.scrollablePixelsX && (c.overflowX = "auto");
            this.scrollablePixelsY && (c.overflowY = "auto");
            this.scrollingParent = p("div", {
                className: "highcharts-scrolling-parent"
            }, {
                position: "relative"
            }, this.renderTo);
            this.scrollingContainer = p("div", {
                className: "highcharts-scrolling"
            }, c, this.scrollingParent);
            J(this.scrollingContainer, "scroll", function() {
                b.pointer && delete b.pointer.chartPosition
            });
            this.innerContainer = p("div", {
                className: "highcharts-inner-container"
            }, null, this.scrollingContainer);
            this.innerContainer.appendChild(this.container);
            this.setUpScrolling = null
        }
        ;
        E.prototype.moveFixedElements = function() {
            var b = this.container, c = this.fixedRenderer, d = ".highcharts-contextbutton .highcharts-credits .highcharts-legend .highcharts-legend-checkbox .highcharts-navigator-series .highcharts-navigator-xaxis .highcharts-navigator-yaxis .highcharts-navigator .highcharts-reset-zoom .highcharts-drillup-button .highcharts-scrollbar .highcharts-subtitle .highcharts-title".split(" "), l;
            this.scrollablePixelsX && !this.inverted ? l = ".highcharts-yaxis" : this.scrollablePixelsX && this.inverted ? l = ".highcharts-xaxis" : this.scrollablePixelsY && !this.inverted ? l = ".highcharts-xaxis" : this.scrollablePixelsY && this.inverted && (l = ".highcharts-yaxis");
            l && d.push(l + ":not(.highcharts-radial-axis)", l + "-labels:not(.highcharts-radial-axis-labels)");
            d.forEach(function(d) {
                [].forEach.call(b.querySelectorAll(d), function(b) {
                    (b.namespaceURI === c.SVG_NS ? c.box : c.box.parentNode).appendChild(b);
                    b.style.pointerEvents = "auto"
                })
            })
        }
        ;
        E.prototype.applyFixed = function() {
            var b = !this.fixedDiv
              , c = this.options.chart
              , d = c.scrollablePlotArea
              , D = A.getRendererType();
            b ? (this.fixedDiv = p("div", {
                className: "highcharts-fixed"
            }, {
                position: "absolute",
                overflow: "hidden",
                pointerEvents: "none",
                zIndex: (c.style && c.style.zIndex || 0) + 2,
                top: 0
            }, null, !0),
            this.scrollingContainer && this.scrollingContainer.parentNode.insertBefore(this.fixedDiv, this.scrollingContainer),
            this.renderTo.style.overflow = "visible",
            this.fixedRenderer = c = new D(this.fixedDiv,this.chartWidth,this.chartHeight,this.options.chart.style),
            this.scrollableMask = c.path().attr({
                fill: this.options.chart.backgroundColor || "#fff",
                "fill-opacity": l(d.opacity, .85),
                zIndex: -1
            }).addClass("highcharts-scrollable-mask").add(),
            J(this, "afterShowResetZoom", this.moveFixedElements),
            J(this, "afterDrilldown", this.moveFixedElements),
            J(this, "afterLayOutTitles", this.moveFixedElements)) : this.fixedRenderer.setSize(this.chartWidth, this.chartHeight);
            if (this.scrollableDirty || b)
                this.scrollableDirty = !1,
                this.moveFixedElements();
            c = this.chartWidth + (this.scrollablePixelsX || 0);
            D = this.chartHeight + (this.scrollablePixelsY || 0);
            n(this.container);
            this.container.style.width = c + "px";
            this.container.style.height = D + "px";
            this.renderer.boxWrapper.attr({
                width: c,
                height: D,
                viewBox: [0, 0, c, D].join(" ")
            });
            this.chartBackground.attr({
                width: c,
                height: D
            });
            this.scrollingContainer.style.height = this.chartHeight + "px";
            b && (d.scrollPositionX && (this.scrollingContainer.scrollLeft = this.scrollablePixelsX * d.scrollPositionX),
            d.scrollPositionY && (this.scrollingContainer.scrollTop = this.scrollablePixelsY * d.scrollPositionY));
            D = this.axisOffset;
            b = this.plotTop - D[0] - 1;
            d = this.plotLeft - D[3] - 1;
            c = this.plotTop + this.plotHeight + D[2] + 1;
            D = this.plotLeft + this.plotWidth + D[1] + 1;
            var y = this.plotLeft + this.plotWidth - (this.scrollablePixelsX || 0)
              , v = this.plotTop + this.plotHeight - (this.scrollablePixelsY || 0);
            b = this.scrollablePixelsX ? [["M", 0, b], ["L", this.plotLeft - 1, b], ["L", this.plotLeft - 1, c], ["L", 0, c], ["Z"], ["M", y, b], ["L", this.chartWidth, b], ["L", this.chartWidth, c], ["L", y, c], ["Z"]] : this.scrollablePixelsY ? [["M", d, 0], ["L", d, this.plotTop - 1], ["L", D, this.plotTop - 1], ["L", D, 0], ["Z"], ["M", d, v], ["L", d, this.chartHeight], ["L", D, this.chartHeight], ["L", D, v], ["Z"]] : [["M", 0, 0]];
            "adjustHeight" !== this.redrawTrigger && this.scrollableMask.attr({
                d: b
            })
        }
        ;
        J(x, "afterInit", function() {
            this.chart.scrollableDirty = !0
        });
        J(H, "show", function() {
            this.chart.scrollableDirty = !0
        });
        ""
    });
    P(c, "Core/Axis/StackingAxis.js", [c["Core/Animation/AnimationUtilities.js"], c["Core/Utilities.js"]], function(c, x) {
        var n = c.getDeferredAnimation
          , H = x.addEvent
          , A = x.destroyObjectProperties
          , F = x.fireEvent
          , G = x.isNumber
          , J = x.objectEach
          , p = function() {
            function c(c) {
                this.oldStacks = {};
                this.stacks = {};
                this.stacksTouched = 0;
                this.axis = c
            }
            c.prototype.buildStacks = function() {
                var c = this.axis, b = c.series, d = c.options.reversedStacks, p = b.length, n;
                if (!c.isXAxis) {
                    this.usePercentage = !1;
                    for (n = p; n--; ) {
                        var y = b[d ? n : p - n - 1];
                        y.setStackedPoints();
                        y.setGroupedPoints()
                    }
                    for (n = 0; n < p; n++)
                        b[n].modifyStacks();
                    F(c, "afterBuildStacks")
                }
            }
            ;
            c.prototype.cleanStacks = function() {
                if (!this.axis.isXAxis) {
                    if (this.oldStacks)
                        var c = this.stacks = this.oldStacks;
                    J(c, function(b) {
                        J(b, function(b) {
                            b.cumulative = b.total
                        })
                    })
                }
            }
            ;
            c.prototype.resetStacks = function() {
                var c = this
                  , b = this.stacks;
                this.axis.isXAxis || J(b, function(b) {
                    J(b, function(d, g) {
                        G(d.touched) && d.touched < c.stacksTouched ? (d.destroy(),
                        delete b[g]) : (d.total = null,
                        d.cumulative = null)
                    })
                })
            }
            ;
            c.prototype.renderStackTotals = function() {
                var c = this.axis
                  , b = c.chart
                  , d = b.renderer
                  , p = this.stacks;
                c = n(b, c.options.stackLabels && c.options.stackLabels.animation || !1);
                var D = this.stackTotalGroup = this.stackTotalGroup || d.g("stack-labels").attr({
                    visibility: "visible",
                    zIndex: 6,
                    opacity: 0
                }).add();
                D.translate(b.plotLeft, b.plotTop);
                J(p, function(b) {
                    J(b, function(b) {
                        b.render(D)
                    })
                });
                D.animate({
                    opacity: 1
                }, c)
            }
            ;
            return c
        }();
        return function() {
            function c() {}
            c.compose = function(d) {
                H(d, "init", c.onInit);
                H(d, "destroy", c.onDestroy)
            }
            ;
            c.onDestroy = function() {
                var c = this.stacking;
                if (c) {
                    var b = c.stacks;
                    J(b, function(c, d) {
                        A(c);
                        b[d] = null
                    });
                    c && c.stackTotalGroup && c.stackTotalGroup.destroy()
                }
            }
            ;
            c.onInit = function() {
                this.stacking || (this.stacking = new p(this))
            }
            ;
            return c
        }()
    });
    P(c, "Extensions/Stacking.js", [c["Core/Axis/Axis.js"], c["Core/Chart/Chart.js"], c["Core/FormatUtilities.js"], c["Core/Globals.js"], c["Core/Series/Series.js"], c["Core/Axis/StackingAxis.js"], c["Core/Utilities.js"]], function(c, x, E, H, A, F, G) {
        var n = E.format
          , p = G.correctFloat
          , d = G.defined
          , l = G.destroyObjectProperties
          , b = G.isArray
          , g = G.isNumber
          , N = G.objectEach
          , D = G.pick
          , y = function() {
            function b(b, c, d, g, l) {
                var e = b.chart.inverted;
                this.axis = b;
                this.isNegative = d;
                this.options = c = c || {};
                this.x = g;
                this.total = null;
                this.points = {};
                this.hasValidPoints = !1;
                this.stack = l;
                this.rightCliff = this.leftCliff = 0;
                this.alignOptions = {
                    align: c.align || (e ? d ? "left" : "right" : "center"),
                    verticalAlign: c.verticalAlign || (e ? "middle" : d ? "bottom" : "top"),
                    y: c.y,
                    x: c.x
                };
                this.textAlign = c.textAlign || (e ? d ? "right" : "left" : "center")
            }
            b.prototype.destroy = function() {
                l(this, this.axis)
            }
            ;
            b.prototype.render = function(b) {
                var c = this.axis.chart
                  , d = this.options
                  , g = d.format;
                g = g ? n(g, this, c) : d.formatter.call(this);
                this.label ? this.label.attr({
                    text: g,
                    visibility: "hidden"
                }) : (this.label = c.renderer.label(g, null, null, d.shape, null, null, d.useHTML, !1, "stack-labels"),
                g = {
                    r: d.borderRadius || 0,
                    text: g,
                    rotation: d.rotation,
                    padding: D(d.padding, 5),
                    visibility: "hidden"
                },
                c.styledMode || (g.fill = d.backgroundColor,
                g.stroke = d.borderColor,
                g["stroke-width"] = d.borderWidth,
                this.label.css(d.style)),
                this.label.attr(g),
                this.label.added || this.label.add(b));
                this.label.labelrank = c.plotSizeY
            }
            ;
            b.prototype.setOffset = function(b, c, l, v, w) {
                var e = this.axis
                  , k = e.chart;
                v = e.translate(e.stacking.usePercentage ? 100 : v ? v : this.total, 0, 0, 0, 1);
                l = e.translate(l ? l : 0);
                l = d(v) && Math.abs(v - l);
                b = D(w, k.xAxis[0].translate(this.x)) + b;
                e = d(v) && this.getStackBox(k, this, b, v, c, l, e);
                c = this.label;
                l = this.isNegative;
                b = "justify" === D(this.options.overflow, "justify");
                var a = this.textAlign;
                c && e && (w = c.getBBox(),
                v = c.padding,
                a = "left" === a ? k.inverted ? -v : v : "right" === a ? w.width : k.inverted && "center" === a ? w.width / 2 : k.inverted ? l ? w.width + v : -v : w.width / 2,
                l = k.inverted ? w.height / 2 : l ? -v : w.height,
                this.alignOptions.x = D(this.options.x, 0),
                this.alignOptions.y = D(this.options.y, 0),
                e.x -= a,
                e.y -= l,
                c.align(this.alignOptions, null, e),
                k.isInsidePlot(c.alignAttr.x + a - this.alignOptions.x, c.alignAttr.y + l - this.alignOptions.y) ? c.show() : (c.alignAttr.y = -9999,
                b = !1),
                b && A.prototype.justifyDataLabel.call(this.axis, c, this.alignOptions, c.alignAttr, w, e),
                c.attr({
                    x: c.alignAttr.x,
                    y: c.alignAttr.y
                }),
                D(!b && this.options.crop, !0) && ((k = g(c.x) && g(c.y) && k.isInsidePlot(c.x - v + c.width, c.y) && k.isInsidePlot(c.x + v, c.y)) || c.hide()))
            }
            ;
            b.prototype.getStackBox = function(b, c, d, g, l, e, r) {
                var a = c.axis.reversed
                  , k = b.inverted
                  , w = r.height + r.pos - (k ? b.plotLeft : b.plotTop);
                c = c.isNegative && !a || !c.isNegative && a;
                return {
                    x: k ? c ? g - r.right : g - e + r.pos - b.plotLeft : d + b.xAxis[0].transB - b.plotLeft,
                    y: k ? r.height - d - l : c ? w - g - e : w - g,
                    width: k ? e : l,
                    height: k ? l : e
                }
            }
            ;
            return b
        }();
        x.prototype.getStacks = function() {
            var b = this
              , c = b.inverted;
            b.yAxis.forEach(function(b) {
                b.stacking && b.stacking.stacks && b.hasVisibleSeries && (b.stacking.oldStacks = b.stacking.stacks)
            });
            b.series.forEach(function(d) {
                var g = d.xAxis && d.xAxis.options || {};
                !d.options.stacking || !0 !== d.visible && !1 !== b.options.chart.ignoreHiddenSeries || (d.stackKey = [d.type, D(d.options.stack, ""), c ? g.top : g.left, c ? g.height : g.width].join())
            })
        }
        ;
        F.compose(c);
        A.prototype.setGroupedPoints = function() {
            var b = this.yAxis.stacking;
            this.options.centerInCategory && (this.is("column") || this.is("columnrange")) && !this.options.stacking && 1 < this.chart.series.length ? A.prototype.setStackedPoints.call(this, "group") : b && N(b.stacks, function(c, d) {
                "group" === d.slice(-5) && (N(c, function(b) {
                    return b.destroy()
                }),
                delete b.stacks[d])
            })
        }
        ;
        A.prototype.setStackedPoints = function(c) {
            var g = c || this.options.stacking;
            if (g && (!0 === this.visible || !1 === this.chart.options.chart.ignoreHiddenSeries)) {
                var l = this.processedXData
                  , v = this.processedYData
                  , n = []
                  , w = v.length
                  , e = this.options
                  , r = e.threshold
                  , a = D(e.startFromThreshold && r, 0);
                e = e.stack;
                c = c ? this.type + "," + g : this.stackKey;
                var q = "-" + c, I = this.negStacks, C = this.yAxis, z = C.stacking.stacks, m = C.stacking.oldStacks, f, K;
                C.stacking.stacksTouched += 1;
                for (K = 0; K < w; K++) {
                    var h = l[K];
                    var u = v[K];
                    var O = this.getStackIndicator(O, h, this.index);
                    var N = O.key;
                    var t = (f = I && u < (a ? 0 : r)) ? q : c;
                    z[t] || (z[t] = {});
                    z[t][h] || (m[t] && m[t][h] ? (z[t][h] = m[t][h],
                    z[t][h].total = null) : z[t][h] = new y(C,C.options.stackLabels,f,h,e));
                    t = z[t][h];
                    null !== u ? (t.points[N] = t.points[this.index] = [D(t.cumulative, a)],
                    d(t.cumulative) || (t.base = N),
                    t.touched = C.stacking.stacksTouched,
                    0 < O.index && !1 === this.singleStacks && (t.points[N][0] = t.points[this.index + "," + h + ",0"][0])) : t.points[N] = t.points[this.index] = null;
                    "percent" === g ? (f = f ? c : q,
                    I && z[f] && z[f][h] ? (f = z[f][h],
                    t.total = f.total = Math.max(f.total, t.total) + Math.abs(u) || 0) : t.total = p(t.total + (Math.abs(u) || 0))) : "group" === g ? (b(u) && (u = u[0]),
                    null !== u && (t.total = (t.total || 0) + 1)) : t.total = p(t.total + (u || 0));
                    t.cumulative = "group" === g ? (t.total || 1) - 1 : D(t.cumulative, a) + (u || 0);
                    null !== u && (t.points[N].push(t.cumulative),
                    n[K] = t.cumulative,
                    t.hasValidPoints = !0)
                }
                "percent" === g && (C.stacking.usePercentage = !0);
                "group" !== g && (this.stackedYData = n);
                C.stacking.oldStacks = {}
            }
        }
        ;
        A.prototype.modifyStacks = function() {
            var b = this, c = b.stackKey, d = b.yAxis.stacking.stacks, g = b.processedXData, l, w = b.options.stacking;
            b[w + "Stacker"] && [c, "-" + c].forEach(function(c) {
                for (var e = g.length, a, k; e--; )
                    if (a = g[e],
                    l = b.getStackIndicator(l, a, b.index, c),
                    k = (a = d[c] && d[c][a]) && a.points[l.key])
                        b[w + "Stacker"](k, a, e)
            })
        }
        ;
        A.prototype.percentStacker = function(b, c, d) {
            c = c.total ? 100 / c.total : 0;
            b[0] = p(b[0] * c);
            b[1] = p(b[1] * c);
            this.stackedYData[d] = b[1]
        }
        ;
        A.prototype.getStackIndicator = function(b, c, g, l) {
            !d(b) || b.x !== c || l && b.key !== l ? b = {
                x: c,
                index: 0,
                key: l
            } : b.index++;
            b.key = [g, c, b.index].join();
            return b
        }
        ;
        H.StackItem = y;
        "";
        return H.StackItem
    });
    P(c, "Series/Line/LineSeries.js", [c["Core/Color/Palette.js"], c["Core/Series/Series.js"], c["Core/Series/SeriesRegistry.js"], c["Core/Utilities.js"]], function(c, x, E, H) {
        var n = this && this.__extends || function() {
            var c = function(p, d) {
                c = Object.setPrototypeOf || {
                    __proto__: []
                }instanceof Array && function(c, b) {
                    c.__proto__ = b
                }
                || function(c, b) {
                    for (var d in b)
                        b.hasOwnProperty(d) && (c[d] = b[d])
                }
                ;
                return c(p, d)
            };
            return function(p, d) {
                function l() {
                    this.constructor = p
                }
                c(p, d);
                p.prototype = null === d ? Object.create(d) : (l.prototype = d.prototype,
                new l)
            }
        }()
          , F = H.defined
          , G = H.merge;
        H = function(A) {
            function p() {
                var c = null !== A && A.apply(this, arguments) || this;
                c.data = void 0;
                c.options = void 0;
                c.points = void 0;
                return c
            }
            n(p, A);
            p.prototype.drawGraph = function() {
                var d = this
                  , l = this.options
                  , b = (this.gappedPath || this.getGraphPath).call(this)
                  , g = this.chart.styledMode
                  , p = [["graph", "highcharts-graph"]];
                g || p[0].push(l.lineColor || this.color || c.neutralColor20, l.dashStyle);
                p = d.getZonesGraphs(p);
                p.forEach(function(c, p) {
                    var v = c[0]
                      , k = d[v]
                      , n = k ? "animate" : "attr";
                    k ? (k.endX = d.preventGraphAnimation ? null : b.xMap,
                    k.animate({
                        d: b
                    })) : b.length && (d[v] = k = d.chart.renderer.path(b).addClass(c[1]).attr({
                        zIndex: 1
                    }).add(d.group));
                    k && !g && (v = {
                        stroke: c[2],
                        "stroke-width": l.lineWidth,
                        fill: d.fillGraph && d.color || "none"
                    },
                    c[3] ? v.dashstyle = c[3] : "square" !== l.linecap && (v["stroke-linecap"] = v["stroke-linejoin"] = "round"),
                    k[n](v).shadow(2 > p && l.shadow));
                    k && (k.startX = b.xMap,
                    k.isArea = b.isArea)
                })
            }
            ;
            p.prototype.getGraphPath = function(c, l, b) {
                var d = this, p = d.options, n = p.step, y, v = [], k = [], L;
                c = c || d.points;
                (y = c.reversed) && c.reverse();
                (n = {
                    right: 1,
                    center: 2
                }[n] || n && 3) && y && (n = 4 - n);
                c = this.getValidPoints(c, !1, !(p.connectNulls && !l && !b));
                c.forEach(function(g, B) {
                    var w = g.plotX
                      , e = g.plotY
                      , r = c[B - 1];
                    (g.leftCliff || r && r.rightCliff) && !b && (L = !0);
                    g.isNull && !F(l) && 0 < B ? L = !p.connectNulls : g.isNull && !l ? L = !0 : (0 === B || L ? B = [["M", g.plotX, g.plotY]] : d.getPointSpline ? B = [d.getPointSpline(c, g, B)] : n ? (B = 1 === n ? [["L", r.plotX, e]] : 2 === n ? [["L", (r.plotX + w) / 2, r.plotY], ["L", (r.plotX + w) / 2, e]] : [["L", w, r.plotY]],
                    B.push(["L", w, e])) : B = [["L", w, e]],
                    k.push(g.x),
                    n && (k.push(g.x),
                    2 === n && k.push(g.x)),
                    v.push.apply(v, B),
                    L = !1)
                });
                v.xMap = k;
                return d.graphPath = v
            }
            ;
            p.prototype.getZonesGraphs = function(c) {
                this.zones.forEach(function(d, b) {
                    b = ["zone-graph-" + b, "highcharts-graph highcharts-zone-graph-" + b + " " + (d.className || "")];
                    this.chart.styledMode || b.push(d.color || this.color, d.dashStyle || this.options.dashStyle);
                    c.push(b)
                }, this);
                return c
            }
            ;
            p.defaultOptions = G(x.defaultOptions, {});
            return p
        }(x);
        E.registerSeriesType("line", H);
        "";
        return H
    });
    P(c, "Series/Area/AreaSeries.js", [c["Core/Color/Color.js"], c["Mixins/LegendSymbol.js"], c["Core/Series/SeriesRegistry.js"], c["Core/Utilities.js"]], function(c, x, E, H) {
        var n = this && this.__extends || function() {
            var c = function(b, d) {
                c = Object.setPrototypeOf || {
                    __proto__: []
                }instanceof Array && function(b, c) {
                    b.__proto__ = c
                }
                || function(b, c) {
                    for (var d in c)
                        c.hasOwnProperty(d) && (b[d] = c[d])
                }
                ;
                return c(b, d)
            };
            return function(b, d) {
                function g() {
                    this.constructor = b
                }
                c(b, d);
                b.prototype = null === d ? Object.create(d) : (g.prototype = d.prototype,
                new g)
            }
        }()
          , F = c.parse
          , G = E.seriesTypes.line;
        c = H.extend;
        var J = H.merge
          , p = H.objectEach
          , d = H.pick;
        H = function(c) {
            function b() {
                var b = null !== c && c.apply(this, arguments) || this;
                b.data = void 0;
                b.options = void 0;
                b.points = void 0;
                return b
            }
            n(b, c);
            b.prototype.drawGraph = function() {
                this.areaPath = [];
                c.prototype.drawGraph.apply(this);
                var b = this
                  , l = this.areaPath
                  , p = this.options
                  , n = [["area", "highcharts-area", this.color, p.fillColor]];
                this.zones.forEach(function(c, d) {
                    n.push(["zone-area-" + d, "highcharts-area highcharts-zone-area-" + d + " " + c.className, c.color || b.color, c.fillColor || p.fillColor])
                });
                n.forEach(function(c) {
                    var g = c[0]
                      , n = b[g]
                      , v = n ? "animate" : "attr"
                      , B = {};
                    n ? (n.endX = b.preventGraphAnimation ? null : l.xMap,
                    n.animate({
                        d: l
                    })) : (B.zIndex = 0,
                    n = b[g] = b.chart.renderer.path(l).addClass(c[1]).add(b.group),
                    n.isArea = !0);
                    b.chart.styledMode || (B.fill = d(c[3], F(c[2]).setOpacity(d(p.fillOpacity, .75)).get()));
                    n[v](B);
                    n.startX = l.xMap;
                    n.shiftUnit = p.step ? 2 : 1
                })
            }
            ;
            b.prototype.getGraphPath = function(b) {
                var c = G.prototype.getGraphPath, g = this.options, l = g.stacking, n = this.yAxis, k, p = [], M = [], B = this.index, w = n.stacking.stacks[this.stackKey], e = g.threshold, r = Math.round(n.getThreshold(g.threshold));
                g = d(g.connectNulls, "percent" === l);
                var a = function(a, c, f) {
                    var d = b[a];
                    a = l && w[d.x].points[B];
                    var h = d[f + "Null"] || 0;
                    f = d[f + "Cliff"] || 0;
                    d = !0;
                    if (f || h) {
                        var g = (h ? a[0] : a[1]) + f;
                        var m = a[0] + f;
                        d = !!h
                    } else
                        !l && b[c] && b[c].isNull && (g = m = e);
                    "undefined" !== typeof g && (M.push({
                        plotX: I,
                        plotY: null === g ? r : n.getThreshold(g),
                        isNull: d,
                        isCliff: !0
                    }),
                    p.push({
                        plotX: I,
                        plotY: null === m ? r : n.getThreshold(m),
                        doCurve: !1
                    }))
                };
                b = b || this.points;
                l && (b = this.getStackPoints(b));
                for (k = 0; k < b.length; k++) {
                    l || (b[k].leftCliff = b[k].rightCliff = b[k].leftNull = b[k].rightNull = void 0);
                    var q = b[k].isNull;
                    var I = d(b[k].rectPlotX, b[k].plotX);
                    var C = l ? d(b[k].yBottom, r) : r;
                    if (!q || g)
                        g || a(k, k - 1, "left"),
                        q && !l && g || (M.push(b[k]),
                        p.push({
                            x: k,
                            plotX: I,
                            plotY: C
                        })),
                        g || a(k, k + 1, "right")
                }
                k = c.call(this, M, !0, !0);
                p.reversed = !0;
                q = c.call(this, p, !0, !0);
                (C = q[0]) && "M" === C[0] && (q[0] = ["L", C[1], C[2]]);
                q = k.concat(q);
                q.length && q.push(["Z"]);
                c = c.call(this, M, !1, g);
                q.xMap = k.xMap;
                this.areaPath = q;
                return c
            }
            ;
            b.prototype.getStackPoints = function(b) {
                var c = this
                  , g = []
                  , l = []
                  , n = this.xAxis
                  , k = this.yAxis
                  , L = k.stacking.stacks[this.stackKey]
                  , M = {}
                  , B = k.series
                  , w = B.length
                  , e = k.options.reversedStacks ? 1 : -1
                  , r = B.indexOf(c);
                b = b || this.points;
                if (this.options.stacking) {
                    for (var a = 0; a < b.length; a++)
                        b[a].leftNull = b[a].rightNull = void 0,
                        M[b[a].x] = b[a];
                    p(L, function(a, b) {
                        null !== a.total && l.push(b)
                    });
                    l.sort(function(a, b) {
                        return a - b
                    });
                    var q = B.map(function(a) {
                        return a.visible
                    });
                    l.forEach(function(a, b) {
                        var p = 0, m, f;
                        if (M[a] && !M[a].isNull)
                            g.push(M[a]),
                            [-1, 1].forEach(function(h) {
                                var d = 1 === h ? "rightNull" : "leftNull"
                                  , g = 0
                                  , k = L[l[b + h]];
                                if (k)
                                    for (var t = r; 0 <= t && t < w; ) {
                                        var p = B[t].index;
                                        m = k.points[p];
                                        m || (p === c.index ? M[a][d] = !0 : q[t] && (f = L[a].points[p]) && (g -= f[1] - f[0]));
                                        t += e
                                    }
                                M[a][1 === h ? "rightCliff" : "leftCliff"] = g
                            });
                        else {
                            for (var v = r; 0 <= v && v < w; ) {
                                if (m = L[a].points[B[v].index]) {
                                    p = m[1];
                                    break
                                }
                                v += e
                            }
                            p = d(p, 0);
                            p = k.translate(p, 0, 1, 0, 1);
                            g.push({
                                isNull: !0,
                                plotX: n.translate(a, 0, 0, 0, 1),
                                x: a,
                                plotY: p,
                                yBottom: p
                            })
                        }
                    })
                }
                return g
            }
            ;
            b.defaultOptions = J(G.defaultOptions, {
                threshold: 0
            });
            return b
        }(G);
        c(H.prototype, {
            singleStacks: !1,
            drawLegendSymbol: x.drawRectangle
        });
        E.registerSeriesType("area", H);
        "";
        return H
    });
    P(c, "Series/Spline/SplineSeries.js", [c["Core/Series/SeriesRegistry.js"], c["Core/Utilities.js"]], function(c, x) {
        var n = this && this.__extends || function() {
            var c = function(n, p) {
                c = Object.setPrototypeOf || {
                    __proto__: []
                }instanceof Array && function(c, l) {
                    c.__proto__ = l
                }
                || function(c, l) {
                    for (var b in l)
                        l.hasOwnProperty(b) && (c[b] = l[b])
                }
                ;
                return c(n, p)
            };
            return function(n, p) {
                function d() {
                    this.constructor = n
                }
                c(n, p);
                n.prototype = null === p ? Object.create(p) : (d.prototype = p.prototype,
                new d)
            }
        }()
          , H = c.seriesTypes.line
          , A = x.merge
          , F = x.pick;
        x = function(c) {
            function x() {
                var p = null !== c && c.apply(this, arguments) || this;
                p.data = void 0;
                p.options = void 0;
                p.points = void 0;
                return p
            }
            n(x, c);
            x.prototype.getPointSpline = function(c, d, l) {
                var b = d.plotX || 0
                  , g = d.plotY || 0
                  , n = c[l - 1];
                l = c[l + 1];
                if (n && !n.isNull && !1 !== n.doCurve && !d.isCliff && l && !l.isNull && !1 !== l.doCurve && !d.isCliff) {
                    c = n.plotY || 0;
                    var p = l.plotX || 0;
                    l = l.plotY || 0;
                    var y = 0;
                    var v = (1.5 * b + (n.plotX || 0)) / 2.5;
                    var k = (1.5 * g + c) / 2.5;
                    p = (1.5 * b + p) / 2.5;
                    var L = (1.5 * g + l) / 2.5;
                    p !== v && (y = (L - k) * (p - b) / (p - v) + g - L);
                    k += y;
                    L += y;
                    k > c && k > g ? (k = Math.max(c, g),
                    L = 2 * g - k) : k < c && k < g && (k = Math.min(c, g),
                    L = 2 * g - k);
                    L > l && L > g ? (L = Math.max(l, g),
                    k = 2 * g - L) : L < l && L < g && (L = Math.min(l, g),
                    k = 2 * g - L);
                    d.rightContX = p;
                    d.rightContY = L
                }
                d = ["C", F(n.rightContX, n.plotX, 0), F(n.rightContY, n.plotY, 0), F(v, b, 0), F(k, g, 0), b, g];
                n.rightContX = n.rightContY = void 0;
                return d
            }
            ;
            x.defaultOptions = A(H.defaultOptions);
            return x
        }(H);
        c.registerSeriesType("spline", x);
        "";
        return x
    });
    P(c, "Series/AreaSpline/AreaSplineSeries.js", [c["Series/Area/AreaSeries.js"], c["Series/Spline/SplineSeries.js"], c["Mixins/LegendSymbol.js"], c["Core/Series/SeriesRegistry.js"], c["Core/Utilities.js"]], function(c, x, E, H, A) {
        var n = this && this.__extends || function() {
            var c = function(d, b) {
                c = Object.setPrototypeOf || {
                    __proto__: []
                }instanceof Array && function(b, c) {
                    b.__proto__ = c
                }
                || function(b, c) {
                    for (var d in c)
                        c.hasOwnProperty(d) && (b[d] = c[d])
                }
                ;
                return c(d, b)
            };
            return function(d, b) {
                function g() {
                    this.constructor = d
                }
                c(d, b);
                d.prototype = null === b ? Object.create(b) : (g.prototype = b.prototype,
                new g)
            }
        }()
          , G = c.prototype
          , J = A.extend
          , p = A.merge;
        A = function(d) {
            function l() {
                var b = null !== d && d.apply(this, arguments) || this;
                b.data = void 0;
                b.points = void 0;
                b.options = void 0;
                return b
            }
            n(l, d);
            l.defaultOptions = p(x.defaultOptions, c.defaultOptions);
            return l
        }(x);
        J(A.prototype, {
            getGraphPath: G.getGraphPath,
            getStackPoints: G.getStackPoints,
            drawGraph: G.drawGraph,
            drawLegendSymbol: E.drawRectangle
        });
        H.registerSeriesType("areaspline", A);
        "";
        return A
    });
    P(c, "Series/Column/ColumnSeries.js", [c["Core/Animation/AnimationUtilities.js"], c["Core/Color/Color.js"], c["Core/Globals.js"], c["Mixins/LegendSymbol.js"], c["Core/Color/Palette.js"], c["Core/Series/Series.js"], c["Core/Series/SeriesRegistry.js"], c["Core/Utilities.js"]], function(c, x, E, H, A, F, G, J) {
        var n = this && this.__extends || function() {
            var b = function(c, a) {
                b = Object.setPrototypeOf || {
                    __proto__: []
                }instanceof Array && function(a, b) {
                    a.__proto__ = b
                }
                || function(a, b) {
                    for (var c in b)
                        b.hasOwnProperty(c) && (a[c] = b[c])
                }
                ;
                return b(c, a)
            };
            return function(c, a) {
                function e() {
                    this.constructor = c
                }
                b(c, a);
                c.prototype = null === a ? Object.create(a) : (e.prototype = a.prototype,
                new e)
            }
        }()
          , d = c.animObject
          , l = x.parse
          , b = E.hasTouch;
        c = E.noop;
        var g = J.clamp
          , N = J.css
          , D = J.defined
          , y = J.extend
          , v = J.fireEvent
          , k = J.isArray
          , L = J.isNumber
          , M = J.merge
          , B = J.pick
          , w = J.objectEach;
        J = function(c) {
            function e() {
                var a = null !== c && c.apply(this, arguments) || this;
                a.borderWidth = void 0;
                a.data = void 0;
                a.group = void 0;
                a.options = void 0;
                a.points = void 0;
                return a
            }
            n(e, c);
            e.prototype.animate = function(a) {
                var b = this
                  , c = this.yAxis
                  , e = b.options
                  , k = this.chart.inverted
                  , m = {}
                  , f = k ? "translateX" : "translateY";
                if (a)
                    m.scaleY = .001,
                    a = g(c.toPixels(e.threshold), c.pos, c.pos + c.len),
                    k ? m.translateX = a - c.len : m.translateY = a,
                    b.clipBox && b.setClip(),
                    b.group.attr(m);
                else {
                    var l = Number(b.group.attr(f));
                    b.group.animate({
                        scaleY: 1
                    }, y(d(b.options.animation), {
                        step: function(a, e) {
                            b.group && (m[f] = l + e.pos * (c.pos - l),
                            b.group.attr(m))
                        }
                    }))
                }
            }
            ;
            e.prototype.init = function(a, b) {
                c.prototype.init.apply(this, arguments);
                var e = this;
                a = e.chart;
                a.hasRendered && a.series.forEach(function(a) {
                    a.type === e.type && (a.isDirty = !0)
                })
            }
            ;
            e.prototype.getColumnMetrics = function() {
                var a = this
                  , b = a.options
                  , c = a.xAxis
                  , e = a.yAxis
                  , d = c.options.reversedStacks;
                d = c.reversed && !d || !c.reversed && d;
                var g, f = {}, k = 0;
                !1 === b.grouping ? k = 1 : a.chart.series.forEach(function(b) {
                    var c = b.yAxis
                      , h = b.options;
                    if (b.type === a.type && (b.visible || !a.chart.options.chart.ignoreHiddenSeries) && e.len === c.len && e.pos === c.pos) {
                        if (h.stacking && "group" !== h.stacking) {
                            g = b.stackKey;
                            "undefined" === typeof f[g] && (f[g] = k++);
                            var d = f[g]
                        } else
                            !1 !== h.grouping && (d = k++);
                        b.columnIndex = d
                    }
                });
                var h = Math.min(Math.abs(c.transA) * (c.ordinal && c.ordinal.slope || b.pointRange || c.closestPointRange || c.tickInterval || 1), c.len)
                  , u = h * b.groupPadding
                  , l = (h - 2 * u) / (k || 1);
                b = Math.min(b.maxPointWidth || c.len, B(b.pointWidth, l * (1 - 2 * b.pointPadding)));
                a.columnMetrics = {
                    width: b,
                    offset: (l - b) / 2 + (u + ((a.columnIndex || 0) + (d ? 1 : 0)) * l - h / 2) * (d ? -1 : 1),
                    paddedWidth: l,
                    columnCount: k
                };
                return a.columnMetrics
            }
            ;
            e.prototype.crispCol = function(a, b, c, e) {
                var d = this.chart
                  , g = this.borderWidth
                  , f = -(g % 2 ? .5 : 0);
                g = g % 2 ? .5 : 1;
                d.inverted && d.renderer.isVML && (g += 1);
                this.options.crisp && (c = Math.round(a + c) + f,
                a = Math.round(a) + f,
                c -= a);
                e = Math.round(b + e) + g;
                f = .5 >= Math.abs(b) && .5 < e;
                b = Math.round(b) + g;
                e -= b;
                f && e && (--b,
                e += 1);
                return {
                    x: a,
                    y: b,
                    width: c,
                    height: e
                }
            }
            ;
            e.prototype.adjustForMissingColumns = function(a, b, c, e) {
                var d = this
                  , g = this.options.stacking;
                if (!c.isNull && 1 < e.columnCount) {
                    var f = 0
                      , l = 0;
                    w(this.yAxis.stacking && this.yAxis.stacking.stacks, function(a) {
                        if ("number" === typeof c.x && (a = a[c.x.toString()])) {
                            var b = a.points[d.index]
                              , e = a.total;
                            g ? (b && (f = l),
                            a.hasValidPoints && l++) : k(b) && (f = b[1],
                            l = e || 0)
                        }
                    });
                    a = (c.plotX || 0) + ((l - 1) * e.paddedWidth + b) / 2 - b - f * e.paddedWidth
                }
                return a
            }
            ;
            e.prototype.translate = function() {
                var a = this
                  , b = a.chart
                  , c = a.options
                  , e = a.dense = 2 > a.closestPointRange * a.xAxis.transA;
                e = a.borderWidth = B(c.borderWidth, e ? 0 : 1);
                var d = a.xAxis
                  , m = a.yAxis
                  , f = c.threshold
                  , k = a.translatedThreshold = m.getThreshold(f)
                  , h = B(c.minPointLength, 5)
                  , u = a.getColumnMetrics()
                  , l = u.width
                  , w = a.barW = Math.max(l, 1 + 2 * e)
                  , t = a.pointXOffset = u.offset
                  , r = a.dataMin
                  , n = a.dataMax;
                b.inverted && (k -= .5);
                c.pointPadding && (w = Math.ceil(w));
                F.prototype.translate.apply(a);
                a.points.forEach(function(e) {
                    var q = B(e.yBottom, k)
                      , p = 999 + Math.abs(q)
                      , v = l
                      , z = e.plotX || 0;
                    p = g(e.plotY, -p, m.len + p);
                    z += t;
                    var K = w
                      , O = Math.min(p, q)
                      , y = Math.max(p, q) - O;
                    if (h && Math.abs(y) < h) {
                        y = h;
                        var C = !m.reversed && !e.negative || m.reversed && e.negative;
                        L(f) && L(n) && e.y === f && n <= f && (m.min || 0) < f && (r !== n || (m.max || 0) <= f) && (C = !C);
                        O = Math.abs(O - k) > h ? q - h : k - (C ? h : 0)
                    }
                    D(e.options.pointWidth) && (v = K = Math.ceil(e.options.pointWidth),
                    z -= Math.round((v - l) / 2));
                    c.centerInCategory && (z = a.adjustForMissingColumns(z, v, e, u));
                    e.barX = z;
                    e.pointWidth = v;
                    e.tooltipPos = b.inverted ? [g(m.len + m.pos - b.plotLeft - p, m.pos - b.plotLeft, m.len + m.pos - b.plotLeft), d.len + d.pos - b.plotTop - z - K / 2, y] : [d.left - b.plotLeft + z + K / 2, g(p + m.pos - b.plotTop, m.pos - b.plotTop, m.len + m.pos - b.plotTop), y];
                    e.shapeType = a.pointClass.prototype.shapeType || "rect";
                    e.shapeArgs = a.crispCol.apply(a, e.isNull ? [z, k, K, 0] : [z, O, K, y])
                })
            }
            ;
            e.prototype.drawGraph = function() {
                this.group[this.dense ? "addClass" : "removeClass"]("highcharts-dense-data")
            }
            ;
            e.prototype.pointAttribs = function(a, b) {
                var c = this.options
                  , e = this.pointAttrToOptions || {};
                var d = e.stroke || "borderColor";
                var g = e["stroke-width"] || "borderWidth"
                  , f = a && a.color || this.color
                  , k = a && a[d] || c[d] || f
                  , h = a && a[g] || c[g] || this[g] || 0;
                e = a && a.options.dashStyle || c.dashStyle;
                var u = B(a && a.opacity, c.opacity, 1);
                if (a && this.zones.length) {
                    var w = a.getZone();
                    f = a.options.color || w && (w.color || a.nonZonedColor) || this.color;
                    w && (k = w.borderColor || k,
                    e = w.dashStyle || e,
                    h = w.borderWidth || h)
                }
                b && a && (a = M(c.states[b], a.options.states && a.options.states[b] || {}),
                b = a.brightness,
                f = a.color || "undefined" !== typeof b && l(f).brighten(a.brightness).get() || f,
                k = a[d] || k,
                h = a[g] || h,
                e = a.dashStyle || e,
                u = B(a.opacity, u));
                d = {
                    fill: f,
                    stroke: k,
                    "stroke-width": h,
                    opacity: u
                };
                e && (d.dashstyle = e);
                return d
            }
            ;
            e.prototype.drawPoints = function() {
                var a = this, b = this.chart, c = a.options, e = b.renderer, d = c.animationLimit || 250, g;
                a.points.forEach(function(f) {
                    var m = f.graphic
                      , h = !!m
                      , u = m && b.pointCount < d ? "animate" : "attr";
                    if (L(f.plotY) && null !== f.y) {
                        g = f.shapeArgs;
                        m && f.hasNewShapeType() && (m = m.destroy());
                        a.enabledDataSorting && (f.startXPos = a.xAxis.reversed ? -(g ? g.width || 0 : 0) : a.xAxis.width);
                        m || (f.graphic = m = e[f.shapeType](g).add(f.group || a.group)) && a.enabledDataSorting && b.hasRendered && b.pointCount < d && (m.attr({
                            x: f.startXPos
                        }),
                        h = !0,
                        u = "animate");
                        if (m && h)
                            m[u](M(g));
                        if (c.borderRadius)
                            m[u]({
                                r: c.borderRadius
                            });
                        b.styledMode || m[u](a.pointAttribs(f, f.selected && "select")).shadow(!1 !== f.allowShadow && c.shadow, null, c.stacking && !c.borderRadius);
                        m && (m.addClass(f.getClassName(), !0),
                        m.attr({
                            visibility: f.visible ? "inherit" : "hidden"
                        }))
                    } else
                        m && (f.graphic = m.destroy())
                })
            }
            ;
            e.prototype.drawTracker = function() {
                var a = this, c = a.chart, e = c.pointer, d = function(a) {
                    var b = e.getPointFromEvent(a);
                    "undefined" !== typeof b && (e.isDirectTouch = !0,
                    b.onMouseOver(a))
                }, g;
                a.points.forEach(function(a) {
                    g = k(a.dataLabels) ? a.dataLabels : a.dataLabel ? [a.dataLabel] : [];
                    a.graphic && (a.graphic.element.point = a);
                    g.forEach(function(b) {
                        b.div ? b.div.point = a : b.element.point = a
                    })
                });
                a._hasTracking || (a.trackerGroups.forEach(function(g) {
                    if (a[g]) {
                        a[g].addClass("highcharts-tracker").on("mouseover", d).on("mouseout", function(a) {
                            e.onTrackerMouseOut(a)
                        });
                        if (b)
                            a[g].on("touchstart", d);
                        !c.styledMode && a.options.cursor && a[g].css(N).css({
                            cursor: a.options.cursor
                        })
                    }
                }),
                a._hasTracking = !0);
                v(this, "afterDrawTracker")
            }
            ;
            e.prototype.remove = function() {
                var a = this
                  , b = a.chart;
                b.hasRendered && b.series.forEach(function(b) {
                    b.type === a.type && (b.isDirty = !0)
                });
                F.prototype.remove.apply(a, arguments)
            }
            ;
            e.defaultOptions = M(F.defaultOptions, {
                borderRadius: 0,
                centerInCategory: !1,
                groupPadding: .2,
                marker: null,
                pointPadding: .1,
                minPointLength: 0,
                cropThreshold: 50,
                pointRange: null,
                states: {
                    hover: {
                        halo: !1,
                        brightness: .1
                    },
                    select: {
                        color: A.neutralColor20,
                        borderColor: A.neutralColor100
                    }
                },
                dataLabels: {
                    align: void 0,
                    verticalAlign: void 0,
                    y: void 0
                },
                startFromThreshold: !0,
                stickyTracking: !1,
                tooltip: {
                    distance: 6
                },
                threshold: 0,
                borderColor: A.backgroundColor
            });
            return e
        }(F);
        y(J.prototype, {
            cropShoulder: 0,
            directTouch: !0,
            drawLegendSymbol: H.drawRectangle,
            getSymbol: c,
            negStacks: !0,
            trackerGroups: ["group", "dataLabelsGroup"]
        });
        G.registerSeriesType("column", J);
        "";
        "";
        return J
    });
    P(c, "Series/Bar/BarSeries.js", [c["Series/Column/ColumnSeries.js"], c["Core/Series/SeriesRegistry.js"], c["Core/Utilities.js"]], function(c, x, E) {
        var n = this && this.__extends || function() {
            var c = function(n, p) {
                c = Object.setPrototypeOf || {
                    __proto__: []
                }instanceof Array && function(c, l) {
                    c.__proto__ = l
                }
                || function(c, l) {
                    for (var b in l)
                        l.hasOwnProperty(b) && (c[b] = l[b])
                }
                ;
                return c(n, p)
            };
            return function(n, p) {
                function d() {
                    this.constructor = n
                }
                c(n, p);
                n.prototype = null === p ? Object.create(p) : (d.prototype = p.prototype,
                new d)
            }
        }()
          , A = E.extend
          , F = E.merge;
        E = function(x) {
            function A() {
                var c = null !== x && x.apply(this, arguments) || this;
                c.data = void 0;
                c.options = void 0;
                c.points = void 0;
                return c
            }
            n(A, x);
            A.defaultOptions = F(c.defaultOptions, {});
            return A
        }(c);
        A(E.prototype, {
            inverted: !0
        });
        x.registerSeriesType("bar", E);
        "";
        return E
    });
    P(c, "Series/Scatter/ScatterSeries.js", [c["Series/Column/ColumnSeries.js"], c["Series/Line/LineSeries.js"], c["Core/Series/SeriesRegistry.js"], c["Core/Utilities.js"]], function(c, x, E, H) {
        var n = this && this.__extends || function() {
            var c = function(d, l) {
                c = Object.setPrototypeOf || {
                    __proto__: []
                }instanceof Array && function(b, c) {
                    b.__proto__ = c
                }
                || function(b, c) {
                    for (var d in c)
                        c.hasOwnProperty(d) && (b[d] = c[d])
                }
                ;
                return c(d, l)
            };
            return function(d, l) {
                function b() {
                    this.constructor = d
                }
                c(d, l);
                d.prototype = null === l ? Object.create(l) : (b.prototype = l.prototype,
                new b)
            }
        }()
          , F = H.addEvent
          , G = H.extend
          , J = H.merge;
        H = function(c) {
            function d() {
                var d = null !== c && c.apply(this, arguments) || this;
                d.data = void 0;
                d.options = void 0;
                d.points = void 0;
                return d
            }
            n(d, c);
            d.prototype.applyJitter = function() {
                var c = this
                  , b = this.options.jitter
                  , d = this.points.length;
                b && this.points.forEach(function(g, l) {
                    ["x", "y"].forEach(function(n, p) {
                        var k = "plot" + n.toUpperCase();
                        if (b[n] && !g.isNull) {
                            var v = c[n + "Axis"];
                            var y = b[n] * v.transA;
                            if (v && !v.isLog) {
                                var B = Math.max(0, g[k] - y);
                                v = Math.min(v.len, g[k] + y);
                                p = 1E4 * Math.sin(l + p * d);
                                g[k] = B + (v - B) * (p - Math.floor(p));
                                "x" === n && (g.clientX = g.plotX)
                            }
                        }
                    })
                })
            }
            ;
            d.prototype.drawGraph = function() {
                this.options.lineWidth ? c.prototype.drawGraph.call(this) : this.graph && (this.graph = this.graph.destroy())
            }
            ;
            d.defaultOptions = J(x.defaultOptions, {
                lineWidth: 0,
                findNearestPointBy: "xy",
                jitter: {
                    x: 0,
                    y: 0
                },
                marker: {
                    enabled: !0
                },
                tooltip: {
                    headerFormat: '<span style="color:{point.color}">\u25cf</span> <span style="font-size: 10px"> {series.name}</span><br/>',
                    pointFormat: "x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>"
                }
            });
            return d
        }(x);
        G(H.prototype, {
            drawTracker: c.prototype.drawTracker,
            sorted: !1,
            requireSorting: !1,
            noSharedTooltip: !0,
            trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
            takeOrdinalPosition: !1
        });
        F(H, "afterTranslate", function() {
            this.applyJitter()
        });
        E.registerSeriesType("scatter", H);
        "";
        return H
    });
    P(c, "Mixins/CenteredSeries.js", [c["Core/Globals.js"], c["Core/Series/Series.js"], c["Core/Utilities.js"]], function(c, x, E) {
        var n = E.isNumber
          , A = E.pick
          , F = E.relativeLength
          , G = c.deg2rad;
        return c.CenteredSeriesMixin = {
            getCenter: function() {
                var c = this.options
                  , n = this.chart
                  , d = 2 * (c.slicedOffset || 0)
                  , l = n.plotWidth - 2 * d
                  , b = n.plotHeight - 2 * d
                  , g = c.center
                  , N = Math.min(l, b)
                  , D = c.size
                  , y = c.innerSize || 0;
                "string" === typeof D && (D = parseFloat(D));
                "string" === typeof y && (y = parseFloat(y));
                c = [A(g[0], "50%"), A(g[1], "50%"), A(D && 0 > D ? void 0 : c.size, "100%"), A(y && 0 > y ? void 0 : c.innerSize || 0, "0%")];
                !n.angular || this instanceof x || (c[3] = 0);
                for (g = 0; 4 > g; ++g)
                    D = c[g],
                    n = 2 > g || 2 === g && /%$/.test(D),
                    c[g] = F(D, [l, b, N, c[2]][g]) + (n ? d : 0);
                c[3] > c[2] && (c[3] = c[2]);
                return c
            },
            getStartAndEndRadians: function(c, p) {
                c = n(c) ? c : 0;
                p = n(p) && p > c && 360 > p - c ? p : c + 360;
                return {
                    start: G * (c + -90),
                    end: G * (p + -90)
                }
            }
        }
    });
    P(c, "Series/Pie/PiePoint.js", [c["Core/Animation/AnimationUtilities.js"], c["Core/Series/Point.js"], c["Core/Utilities.js"]], function(c, x, E) {
        var n = this && this.__extends || function() {
            var c = function(b, d) {
                c = Object.setPrototypeOf || {
                    __proto__: []
                }instanceof Array && function(b, c) {
                    b.__proto__ = c
                }
                || function(b, c) {
                    for (var d in c)
                        c.hasOwnProperty(d) && (b[d] = c[d])
                }
                ;
                return c(b, d)
            };
            return function(b, d) {
                function g() {
                    this.constructor = b
                }
                c(b, d);
                b.prototype = null === d ? Object.create(d) : (g.prototype = d.prototype,
                new g)
            }
        }()
          , A = c.setAnimation
          , F = E.addEvent
          , G = E.defined;
        c = E.extend;
        var J = E.isNumber
          , p = E.pick
          , d = E.relativeLength;
        E = function(c) {
            function b() {
                var b = null !== c && c.apply(this, arguments) || this;
                b.labelDistance = void 0;
                b.options = void 0;
                b.series = void 0;
                return b
            }
            n(b, c);
            b.prototype.getConnectorPath = function() {
                var b = this.labelPosition
                  , c = this.series.options.dataLabels
                  , d = c.connectorShape
                  , l = this.connectorShapes;
                l[d] && (d = l[d]);
                return d.call(this, {
                    x: b.final.x,
                    y: b.final.y,
                    alignment: b.alignment
                }, b.connectorPosition, c)
            }
            ;
            b.prototype.getTranslate = function() {
                return this.sliced ? this.slicedTranslation : {
                    translateX: 0,
                    translateY: 0
                }
            }
            ;
            b.prototype.haloPath = function(b) {
                var c = this.shapeArgs;
                return this.sliced || !this.visible ? [] : this.series.chart.renderer.symbols.arc(c.x, c.y, c.r + b, c.r + b, {
                    innerR: c.r - 1,
                    start: c.start,
                    end: c.end
                })
            }
            ;
            b.prototype.init = function() {
                x.prototype.init.apply(this, arguments);
                var b = this;
                b.name = p(b.name, "Slice");
                var c = function(c) {
                    b.slice("select" === c.type)
                };
                F(b, "select", c);
                F(b, "unselect", c);
                return b
            }
            ;
            b.prototype.isValid = function() {
                return J(this.y) && 0 <= this.y
            }
            ;
            b.prototype.setVisible = function(b, c) {
                var d = this
                  , g = d.series
                  , l = g.chart
                  , k = g.options.ignoreHiddenPoint;
                c = p(c, k);
                b !== d.visible && (d.visible = d.options.visible = b = "undefined" === typeof b ? !d.visible : b,
                g.options.data[g.data.indexOf(d)] = d.options,
                ["graphic", "dataLabel", "connector", "shadowGroup"].forEach(function(c) {
                    if (d[c])
                        d[c][b ? "show" : "hide"](b)
                }),
                d.legendItem && l.legend.colorizeItem(d, b),
                b || "hover" !== d.state || d.setState(""),
                k && (g.isDirty = !0),
                c && l.redraw())
            }
            ;
            b.prototype.slice = function(b, c, d) {
                var g = this.series;
                A(d, g.chart);
                p(c, !0);
                this.sliced = this.options.sliced = G(b) ? b : !this.sliced;
                g.options.data[g.data.indexOf(this)] = this.options;
                this.graphic && this.graphic.animate(this.getTranslate());
                this.shadowGroup && this.shadowGroup.animate(this.getTranslate())
            }
            ;
            return b
        }(x);
        c(E.prototype, {
            connectorShapes: {
                fixedOffset: function(c, b, d) {
                    var g = b.breakAt;
                    b = b.touchingSliceAt;
                    return [["M", c.x, c.y], d.softConnector ? ["C", c.x + ("left" === c.alignment ? -5 : 5), c.y, 2 * g.x - b.x, 2 * g.y - b.y, g.x, g.y] : ["L", g.x, g.y], ["L", b.x, b.y]]
                },
                straight: function(c, b) {
                    b = b.touchingSliceAt;
                    return [["M", c.x, c.y], ["L", b.x, b.y]]
                },
                crookedLine: function(c, b, g) {
                    b = b.touchingSliceAt;
                    var l = this.series
                      , n = l.center[0]
                      , p = l.chart.plotWidth
                      , v = l.chart.plotLeft;
                    l = c.alignment;
                    var k = this.shapeArgs.r;
                    g = d(g.crookDistance, 1);
                    p = "left" === l ? n + k + (p + v - n - k) * (1 - g) : v + (n - k) * g;
                    g = ["L", p, c.y];
                    n = !0;
                    if ("left" === l ? p > c.x || p < b.x : p < c.x || p > b.x)
                        n = !1;
                    c = [["M", c.x, c.y]];
                    n && c.push(g);
                    c.push(["L", b.x, b.y]);
                    return c
                }
            }
        });
        return E
    });
    P(c, "Series/Pie/PieSeries.js", [c["Mixins/CenteredSeries.js"], c["Series/Column/ColumnSeries.js"], c["Core/Globals.js"], c["Mixins/LegendSymbol.js"], c["Core/Color/Palette.js"], c["Series/Pie/PiePoint.js"], c["Core/Series/Series.js"], c["Core/Series/SeriesRegistry.js"], c["Core/Renderer/SVG/Symbols.js"], c["Core/Utilities.js"]], function(c, x, E, H, A, F, G, J, p, d) {
        var l = this && this.__extends || function() {
            var b = function(c, d) {
                b = Object.setPrototypeOf || {
                    __proto__: []
                }instanceof Array && function(b, c) {
                    b.__proto__ = c
                }
                || function(b, c) {
                    for (var e in c)
                        c.hasOwnProperty(e) && (b[e] = c[e])
                }
                ;
                return b(c, d)
            };
            return function(c, d) {
                function g() {
                    this.constructor = c
                }
                b(c, d);
                c.prototype = null === d ? Object.create(d) : (g.prototype = d.prototype,
                new g)
            }
        }()
          , b = c.getStartAndEndRadians;
        E = E.noop;
        var g = d.clamp
          , n = d.extend
          , D = d.fireEvent
          , y = d.merge
          , v = d.pick
          , k = d.relativeLength;
        d = function(c) {
            function d() {
                var b = null !== c && c.apply(this, arguments) || this;
                b.center = void 0;
                b.data = void 0;
                b.maxLabelDistance = void 0;
                b.options = void 0;
                b.points = void 0;
                return b
            }
            l(d, c);
            d.prototype.animate = function(b) {
                var c = this
                  , e = c.points
                  , d = c.startAngleRad;
                b || e.forEach(function(a) {
                    var b = a.graphic
                      , e = a.shapeArgs;
                    b && e && (b.attr({
                        r: v(a.startR, c.center && c.center[3] / 2),
                        start: d,
                        end: d
                    }),
                    b.animate({
                        r: e.r,
                        start: e.start,
                        end: e.end
                    }, c.options.animation))
                })
            }
            ;
            d.prototype.drawEmpty = function() {
                var b = this.startAngleRad
                  , c = this.endAngleRad
                  , e = this.options;
                if (0 === this.total && this.center) {
                    var d = this.center[0];
                    var a = this.center[1];
                    this.graph || (this.graph = this.chart.renderer.arc(d, a, this.center[1] / 2, 0, b, c).addClass("highcharts-empty-series").add(this.group));
                    this.graph.attr({
                        d: p.arc(d, a, this.center[2] / 2, 0, {
                            start: b,
                            end: c,
                            innerR: this.center[3] / 2
                        })
                    });
                    this.chart.styledMode || this.graph.attr({
                        "stroke-width": e.borderWidth,
                        fill: e.fillColor || "none",
                        stroke: e.color || A.neutralColor20
                    })
                } else
                    this.graph && (this.graph = this.graph.destroy())
            }
            ;
            d.prototype.drawPoints = function() {
                var b = this.chart.renderer;
                this.points.forEach(function(c) {
                    c.graphic && c.hasNewShapeType() && (c.graphic = c.graphic.destroy());
                    c.graphic || (c.graphic = b[c.shapeType](c.shapeArgs).add(c.series.group),
                    c.delayedRendering = !0)
                })
            }
            ;
            d.prototype.generatePoints = function() {
                c.prototype.generatePoints.call(this);
                this.updateTotals()
            }
            ;
            d.prototype.getX = function(b, c, e) {
                var d = this.center
                  , a = this.radii ? this.radii[e.index] || 0 : d[2] / 2;
                b = Math.asin(g((b - d[1]) / (a + e.labelDistance), -1, 1));
                return d[0] + (c ? -1 : 1) * Math.cos(b) * (a + e.labelDistance) + (0 < e.labelDistance ? (c ? -1 : 1) * this.options.dataLabels.padding : 0)
            }
            ;
            d.prototype.hasData = function() {
                return !!this.processedXData.length
            }
            ;
            d.prototype.redrawPoints = function() {
                var b = this, c = b.chart, e = c.renderer, d, a, g, k, l = b.options.shadow;
                this.drawEmpty();
                !l || b.shadowGroup || c.styledMode || (b.shadowGroup = e.g("shadow").attr({
                    zIndex: -1
                }).add(b.group));
                b.points.forEach(function(q) {
                    var m = {};
                    a = q.graphic;
                    if (!q.isNull && a) {
                        var f = void 0;
                        k = q.shapeArgs;
                        d = q.getTranslate();
                        c.styledMode || (f = q.shadowGroup,
                        l && !f && (f = q.shadowGroup = e.g("shadow").add(b.shadowGroup)),
                        f && f.attr(d),
                        g = b.pointAttribs(q, q.selected && "select"));
                        q.delayedRendering ? (a.setRadialReference(b.center).attr(k).attr(d),
                        c.styledMode || a.attr(g).attr({
                            "stroke-linejoin": "round"
                        }).shadow(l, f),
                        q.delayedRendering = !1) : (a.setRadialReference(b.center),
                        c.styledMode || y(!0, m, g),
                        y(!0, m, k, d),
                        a.animate(m));
                        a.attr({
                            visibility: q.visible ? "inherit" : "hidden"
                        });
                        a.addClass(q.getClassName(), !0)
                    } else
                        a && (q.graphic = a.destroy())
                })
            }
            ;
            d.prototype.sortByAngle = function(b, c) {
                b.sort(function(b, d) {
                    return "undefined" !== typeof b.angle && (d.angle - b.angle) * c
                })
            }
            ;
            d.prototype.translate = function(c) {
                this.generatePoints();
                var d = 0
                  , e = this.options
                  , g = e.slicedOffset
                  , a = g + (e.borderWidth || 0)
                  , l = b(e.startAngle, e.endAngle)
                  , n = this.startAngleRad = l.start;
                l = (this.endAngleRad = l.end) - n;
                var p = this.points
                  , z = e.dataLabels.distance;
                e = e.ignoreHiddenPoint;
                var m, f = p.length;
                c || (this.center = c = this.getCenter());
                for (m = 0; m < f; m++) {
                    var K = p[m];
                    var h = n + d * l;
                    !K.isValid() || e && !K.visible || (d += K.percentage / 100);
                    var u = n + d * l;
                    var O = {
                        x: c[0],
                        y: c[1],
                        r: c[2] / 2,
                        innerR: c[3] / 2,
                        start: Math.round(1E3 * h) / 1E3,
                        end: Math.round(1E3 * u) / 1E3
                    };
                    K.shapeType = "arc";
                    K.shapeArgs = O;
                    K.labelDistance = v(K.options.dataLabels && K.options.dataLabels.distance, z);
                    K.labelDistance = k(K.labelDistance, O.r);
                    this.maxLabelDistance = Math.max(this.maxLabelDistance || 0, K.labelDistance);
                    u = (u + h) / 2;
                    u > 1.5 * Math.PI ? u -= 2 * Math.PI : u < -Math.PI / 2 && (u += 2 * Math.PI);
                    K.slicedTranslation = {
                        translateX: Math.round(Math.cos(u) * g),
                        translateY: Math.round(Math.sin(u) * g)
                    };
                    O = Math.cos(u) * c[2] / 2;
                    var y = Math.sin(u) * c[2] / 2;
                    K.tooltipPos = [c[0] + .7 * O, c[1] + .7 * y];
                    K.half = u < -Math.PI / 2 || u > Math.PI / 2 ? 1 : 0;
                    K.angle = u;
                    h = Math.min(a, K.labelDistance / 5);
                    K.labelPosition = {
                        natural: {
                            x: c[0] + O + Math.cos(u) * K.labelDistance,
                            y: c[1] + y + Math.sin(u) * K.labelDistance
                        },
                        "final": {},
                        alignment: 0 > K.labelDistance ? "center" : K.half ? "right" : "left",
                        connectorPosition: {
                            breakAt: {
                                x: c[0] + O + Math.cos(u) * h,
                                y: c[1] + y + Math.sin(u) * h
                            },
                            touchingSliceAt: {
                                x: c[0] + O,
                                y: c[1] + y
                            }
                        }
                    }
                }
                D(this, "afterTranslate")
            }
            ;
            d.prototype.updateTotals = function() {
                var b, c = 0, e = this.points, d = e.length, a = this.options.ignoreHiddenPoint;
                for (b = 0; b < d; b++) {
                    var g = e[b];
                    !g.isValid() || a && !g.visible || (c += g.y)
                }
                this.total = c;
                for (b = 0; b < d; b++)
                    g = e[b],
                    g.percentage = 0 < c && (g.visible || !a) ? g.y / c * 100 : 0,
                    g.total = c
            }
            ;
            d.defaultOptions = y(G.defaultOptions, {
                center: [null, null],
                clip: !1,
                colorByPoint: !0,
                dataLabels: {
                    allowOverlap: !0,
                    connectorPadding: 5,
                    connectorShape: "fixedOffset",
                    crookDistance: "70%",
                    distance: 30,
                    enabled: !0,
                    formatter: function() {
                        return this.point.isNull ? void 0 : this.point.name
                    },
                    softConnector: !0,
                    x: 0
                },
                fillColor: void 0,
                ignoreHiddenPoint: !0,
                inactiveOtherPoints: !0,
                legendType: "point",
                marker: null,
                size: null,
                showInLegend: !1,
                slicedOffset: 10,
                stickyTracking: !1,
                tooltip: {
                    followPointer: !0
                },
                borderColor: A.backgroundColor,
                borderWidth: 1,
                lineWidth: void 0,
                states: {
                    hover: {
                        brightness: .1
                    }
                }
            });
            return d
        }(G);
        n(d.prototype, {
            axisTypes: [],
            directTouch: !0,
            drawGraph: void 0,
            drawLegendSymbol: H.drawRectangle,
            drawTracker: x.prototype.drawTracker,
            getCenter: c.getCenter,
            getSymbol: E,
            isCartesian: !1,
            noSharedTooltip: !0,
            pointAttribs: x.prototype.pointAttribs,
            pointClass: F,
            requireSorting: !1,
            searchPoint: E,
            trackerGroups: ["group", "dataLabelsGroup"]
        });
        J.registerSeriesType("pie", d);
        "";
        return d
    });
    P(c, "Core/Series/DataLabels.js", [c["Core/Animation/AnimationUtilities.js"], c["Core/FormatUtilities.js"], c["Core/Globals.js"], c["Core/Color/Palette.js"], c["Core/Series/Series.js"], c["Core/Series/SeriesRegistry.js"], c["Core/Utilities.js"]], function(c, x, E, H, A, F, G) {
        var n = c.getDeferredAnimation
          , p = x.format;
        c = E.noop;
        F = F.seriesTypes;
        var d = G.arrayMax
          , l = G.clamp
          , b = G.defined
          , g = G.extend
          , N = G.fireEvent
          , D = G.isArray
          , y = G.merge
          , v = G.objectEach
          , k = G.pick
          , L = G.relativeLength
          , M = G.splat
          , B = G.stableSort;
        "";
        E.distribute = function(b, c, d) {
            function a(a, b) {
                return a.target - b.target
            }
            var e, g = !0, w = b, n = [];
            var m = 0;
            var f = w.reducedLen || c;
            for (e = b.length; e--; )
                m += b[e].size;
            if (m > f) {
                B(b, function(a, b) {
                    return (b.rank || 0) - (a.rank || 0)
                });
                for (m = e = 0; m <= f; )
                    m += b[e].size,
                    e++;
                n = b.splice(e - 1, b.length)
            }
            B(b, a);
            for (b = b.map(function(a) {
                return {
                    size: a.size,
                    targets: [a.target],
                    align: k(a.align, .5)
                }
            }); g; ) {
                for (e = b.length; e--; )
                    g = b[e],
                    m = (Math.min.apply(0, g.targets) + Math.max.apply(0, g.targets)) / 2,
                    g.pos = l(m - g.size * g.align, 0, c - g.size);
                e = b.length;
                for (g = !1; e--; )
                    0 < e && b[e - 1].pos + b[e - 1].size > b[e].pos && (b[e - 1].size += b[e].size,
                    b[e - 1].targets = b[e - 1].targets.concat(b[e].targets),
                    b[e - 1].align = .5,
                    b[e - 1].pos + b[e - 1].size > c && (b[e - 1].pos = c - b[e - 1].size),
                    b.splice(e, 1),
                    g = !0)
            }
            w.push.apply(w, n);
            e = 0;
            b.some(function(a) {
                var b = 0;
                if (a.targets.some(function() {
                    w[e].pos = a.pos + b;
                    if ("undefined" !== typeof d && Math.abs(w[e].pos - w[e].target) > d)
                        return w.slice(0, e + 1).forEach(function(a) {
                            delete a.pos
                        }),
                        w.reducedLen = (w.reducedLen || c) - .1 * c,
                        w.reducedLen > .1 * c && E.distribute(w, c, d),
                        !0;
                    b += w[e].size;
                    e++
                }))
                    return !0
            });
            B(w, a)
        }
        ;
        A.prototype.drawDataLabels = function() {
            function c(a, b) {
                var c = b.filter;
                return c ? (b = c.operator,
                a = a[c.property],
                c = c.value,
                ">" === b && a > c || "<" === b && a < c || ">=" === b && a >= c || "<=" === b && a <= c || "==" === b && a == c || "===" === b && a === c ? !0 : !1) : !0
            }
            function e(a, b) {
                var c = [], e;
                if (D(a) && !D(b))
                    c = a.map(function(a) {
                        return y(a, b)
                    });
                else if (D(b) && !D(a))
                    c = b.map(function(b) {
                        return y(a, b)
                    });
                else if (D(a) || D(b))
                    for (e = Math.max(a.length, b.length); e--; )
                        c[e] = y(a[e], b[e]);
                else
                    c = y(a, b);
                return c
            }
            var d = this, a = d.chart, g = d.options, l = g.dataLabels, C = d.points, z, m = d.hasRendered || 0, f = l.animation;
            f = l.defer ? n(a, f, d) : {
                defer: 0,
                duration: 0
            };
            var K = a.renderer;
            l = e(e(a.options.plotOptions && a.options.plotOptions.series && a.options.plotOptions.series.dataLabels, a.options.plotOptions && a.options.plotOptions[d.type] && a.options.plotOptions[d.type].dataLabels), l);
            N(this, "drawDataLabels");
            if (D(l) || l.enabled || d._hasPointLabels) {
                var h = d.plotGroup("dataLabelsGroup", "data-labels", m ? "inherit" : "hidden", l.zIndex || 6);
                h.attr({
                    opacity: +m
                });
                !m && (m = d.dataLabelsGroup) && (d.visible && h.show(!0),
                m[g.animation ? "animate" : "attr"]({
                    opacity: 1
                }, f));
                C.forEach(function(f) {
                    z = M(e(l, f.dlOptions || f.options && f.options.dataLabels));
                    z.forEach(function(e, m) {
                        var u = e.enabled && (!f.isNull || f.dataLabelOnNull) && c(f, e)
                          , l = f.dataLabels ? f.dataLabels[m] : f.dataLabel
                          , w = f.connectors ? f.connectors[m] : f.connector
                          , q = k(e.distance, f.labelDistance)
                          , n = !l;
                        if (u) {
                            var r = f.getLabelConfig();
                            var z = k(e[f.formatPrefix + "Format"], e.format);
                            r = b(z) ? p(z, r, a) : (e[f.formatPrefix + "Formatter"] || e.formatter).call(r, e);
                            z = e.style;
                            var O = e.rotation;
                            a.styledMode || (z.color = k(e.color, z.color, d.color, H.neutralColor100),
                            "contrast" === z.color ? (f.contrastColor = K.getContrast(f.color || d.color),
                            z.color = !b(q) && e.inside || 0 > q || g.stacking ? f.contrastColor : H.neutralColor100) : delete f.contrastColor,
                            g.cursor && (z.cursor = g.cursor));
                            var y = {
                                r: e.borderRadius || 0,
                                rotation: O,
                                padding: e.padding,
                                zIndex: 1
                            };
                            a.styledMode || (y.fill = e.backgroundColor,
                            y.stroke = e.borderColor,
                            y["stroke-width"] = e.borderWidth);
                            v(y, function(a, b) {
                                "undefined" === typeof a && delete y[b]
                            })
                        }
                        !l || u && b(r) ? u && b(r) && (l ? y.text = r : (f.dataLabels = f.dataLabels || [],
                        l = f.dataLabels[m] = O ? K.text(r, 0, -9999, e.useHTML).addClass("highcharts-data-label") : K.label(r, 0, -9999, e.shape, null, null, e.useHTML, null, "data-label"),
                        m || (f.dataLabel = l),
                        l.addClass(" highcharts-data-label-color-" + f.colorIndex + " " + (e.className || "") + (e.useHTML ? " highcharts-tracker" : ""))),
                        l.options = e,
                        l.attr(y),
                        a.styledMode || l.css(z).shadow(e.shadow),
                        l.added || l.add(h),
                        e.textPath && !e.useHTML && (l.setTextPath(f.getDataLabelPath && f.getDataLabelPath(l) || f.graphic, e.textPath),
                        f.dataLabelPath && !e.textPath.enabled && (f.dataLabelPath = f.dataLabelPath.destroy())),
                        d.alignDataLabel(f, l, e, null, n)) : (f.dataLabel = f.dataLabel && f.dataLabel.destroy(),
                        f.dataLabels && (1 === f.dataLabels.length ? delete f.dataLabels : delete f.dataLabels[m]),
                        m || delete f.dataLabel,
                        w && (f.connector = f.connector.destroy(),
                        f.connectors && (1 === f.connectors.length ? delete f.connectors : delete f.connectors[m])))
                    })
                })
            }
            N(this, "afterDrawDataLabels")
        }
        ;
        A.prototype.alignDataLabel = function(b, c, d, a, l) {
            var e = this
              , q = this.chart
              , w = this.isCartesian && q.inverted
              , m = this.enabledDataSorting
              , f = k(b.dlBox && b.dlBox.centerX, b.plotX, -9999)
              , n = k(b.plotY, -9999)
              , h = c.getBBox()
              , u = d.rotation
              , p = d.align
              , r = q.isInsidePlot(f, Math.round(n), {
                inverted: w,
                paneCoordinates: !0,
                series: e
            })
              , t = "justify" === k(d.overflow, m ? "none" : "justify")
              , v = this.visible && !1 !== b.visible && (b.series.forceDL || m && !t || r || k(d.inside, !!this.options.stacking) && a && q.isInsidePlot(f, w ? a.x + 1 : a.y + a.height - 1, {
                inverted: w,
                paneCoordinates: !0,
                series: e
            }));
            var y = function(a) {
                m && e.xAxis && !t && e.setDataLabelStartPos(b, c, l, r, a)
            };
            if (v) {
                var B = q.renderer.fontMetrics(q.styledMode ? void 0 : d.style.fontSize, c).b;
                a = g({
                    x: w ? this.yAxis.len - n : f,
                    y: Math.round(w ? this.xAxis.len - f : n),
                    width: 0,
                    height: 0
                }, a);
                g(d, {
                    width: h.width,
                    height: h.height
                });
                u ? (t = !1,
                f = q.renderer.rotCorr(B, u),
                f = {
                    x: a.x + (d.x || 0) + a.width / 2 + f.x,
                    y: a.y + (d.y || 0) + {
                        top: 0,
                        middle: .5,
                        bottom: 1
                    }[d.verticalAlign] * a.height
                },
                y(f),
                c[l ? "attr" : "animate"](f).attr({
                    align: p
                }),
                y = (u + 720) % 360,
                y = 180 < y && 360 > y,
                "left" === p ? f.y -= y ? h.height : 0 : "center" === p ? (f.x -= h.width / 2,
                f.y -= h.height / 2) : "right" === p && (f.x -= h.width,
                f.y -= y ? 0 : h.height),
                c.placed = !0,
                c.alignAttr = f) : (y(a),
                c.align(d, void 0, a),
                f = c.alignAttr);
                t && 0 <= a.height ? this.justifyDataLabel(c, d, f, h, a, l) : k(d.crop, !0) && (v = q.isInsidePlot(f.x, f.y, {
                    paneCoordinates: !0,
                    series: e
                }) && q.isInsidePlot(f.x + h.width, f.y + h.height, {
                    paneCoordinates: !0,
                    series: e
                }));
                if (d.shape && !u)
                    c[l ? "attr" : "animate"]({
                        anchorX: w ? q.plotWidth - b.plotY : b.plotX,
                        anchorY: w ? q.plotHeight - b.plotX : b.plotY
                    })
            }
            l && m && (c.placed = !1);
            v || m && !t || (c.hide(!0),
            c.placed = !1)
        }
        ;
        A.prototype.setDataLabelStartPos = function(b, c, d, a, g) {
            var e = this.chart
              , k = e.inverted
              , l = this.xAxis
              , m = l.reversed
              , f = k ? c.height / 2 : c.width / 2;
            b = (b = b.pointWidth) ? b / 2 : 0;
            l = k ? g.x : m ? -f - b : l.width - f + b;
            g = k ? m ? this.yAxis.height - f + b : -f - b : g.y;
            c.startXPos = l;
            c.startYPos = g;
            a ? "hidden" === c.visibility && (c.show(),
            c.attr({
                opacity: 0
            }).animate({
                opacity: 1
            })) : c.attr({
                opacity: 1
            }).animate({
                opacity: 0
            }, void 0, c.hide);
            e.hasRendered && (d && c.attr({
                x: c.startXPos,
                y: c.startYPos
            }),
            c.placed = !0)
        }
        ;
        A.prototype.justifyDataLabel = function(b, c, d, a, g, k) {
            var e = this.chart
              , l = c.align
              , m = c.verticalAlign
              , f = b.box ? 0 : b.padding || 0
              , q = c.x;
            q = void 0 === q ? 0 : q;
            var h = c.y;
            var u = void 0 === h ? 0 : h;
            h = (d.x || 0) + f;
            if (0 > h) {
                "right" === l && 0 <= q ? (c.align = "left",
                c.inside = !0) : q -= h;
                var n = !0
            }
            h = (d.x || 0) + a.width - f;
            h > e.plotWidth && ("left" === l && 0 >= q ? (c.align = "right",
            c.inside = !0) : q += e.plotWidth - h,
            n = !0);
            h = d.y + f;
            0 > h && ("bottom" === m && 0 <= u ? (c.verticalAlign = "top",
            c.inside = !0) : u -= h,
            n = !0);
            h = (d.y || 0) + a.height - f;
            h > e.plotHeight && ("top" === m && 0 >= u ? (c.verticalAlign = "bottom",
            c.inside = !0) : u += e.plotHeight - h,
            n = !0);
            n && (c.x = q,
            c.y = u,
            b.placed = !k,
            b.align(c, void 0, g));
            return n
        }
        ;
        F.pie && (F.pie.prototype.dataLabelPositioners = {
            radialDistributionY: function(b) {
                return b.top + b.distributeBox.pos
            },
            radialDistributionX: function(b, c, d, a) {
                return b.getX(d < c.top + 2 || d > c.bottom - 2 ? a : d, c.half, c)
            },
            justify: function(b, c, d) {
                return d[0] + (b.half ? -1 : 1) * (c + b.labelDistance)
            },
            alignToPlotEdges: function(b, c, d, a) {
                b = b.getBBox().width;
                return c ? b + a : d - b - a
            },
            alignToConnectors: function(b, c, d, a) {
                var e = 0, g;
                b.forEach(function(a) {
                    g = a.dataLabel.getBBox().width;
                    g > e && (e = g)
                });
                return c ? e + a : d - e - a
            }
        },
        F.pie.prototype.drawDataLabels = function() {
            var c = this, e = c.data, g, a = c.chart, l = c.options.dataLabels || {}, n = l.connectorPadding, p, v = a.plotWidth, m = a.plotHeight, f = a.plotLeft, K = Math.round(a.chartWidth / 3), h, u = c.center, O = u[2] / 2, B = u[1], t, D, x, M, L = [[], []], N, F, G, J, P = [0, 0, 0, 0], T = c.dataLabelPositioners, U;
            c.visible && (l.enabled || c._hasPointLabels) && (e.forEach(function(a) {
                a.dataLabel && a.visible && a.dataLabel.shortened && (a.dataLabel.attr({
                    width: "auto"
                }).css({
                    width: "auto",
                    textOverflow: "clip"
                }),
                a.dataLabel.shortened = !1)
            }),
            A.prototype.drawDataLabels.apply(c),
            e.forEach(function(a) {
                a.dataLabel && (a.visible ? (L[a.half].push(a),
                a.dataLabel._pos = null,
                !b(l.style.width) && !b(a.options.dataLabels && a.options.dataLabels.style && a.options.dataLabels.style.width) && a.dataLabel.getBBox().width > K && (a.dataLabel.css({
                    width: Math.round(.7 * K) + "px"
                }),
                a.dataLabel.shortened = !0)) : (a.dataLabel = a.dataLabel.destroy(),
                a.dataLabels && 1 === a.dataLabels.length && delete a.dataLabels))
            }),
            L.forEach(function(e, d) {
                var h = e.length, q = [], p;
                if (h) {
                    c.sortByAngle(e, d - .5);
                    if (0 < c.maxLabelDistance) {
                        var w = Math.max(0, B - O - c.maxLabelDistance);
                        var r = Math.min(B + O + c.maxLabelDistance, a.plotHeight);
                        e.forEach(function(b) {
                            0 < b.labelDistance && b.dataLabel && (b.top = Math.max(0, B - O - b.labelDistance),
                            b.bottom = Math.min(B + O + b.labelDistance, a.plotHeight),
                            p = b.dataLabel.getBBox().height || 21,
                            b.distributeBox = {
                                target: b.labelPosition.natural.y - b.top + p / 2,
                                size: p,
                                rank: b.y
                            },
                            q.push(b.distributeBox))
                        });
                        w = r + p - w;
                        E.distribute(q, w, w / 5)
                    }
                    for (J = 0; J < h; J++) {
                        g = e[J];
                        x = g.labelPosition;
                        t = g.dataLabel;
                        G = !1 === g.visible ? "hidden" : "inherit";
                        F = w = x.natural.y;
                        q && b(g.distributeBox) && ("undefined" === typeof g.distributeBox.pos ? G = "hidden" : (M = g.distributeBox.size,
                        F = T.radialDistributionY(g)));
                        delete g.positionIndex;
                        if (l.justify)
                            N = T.justify(g, O, u);
                        else
                            switch (l.alignTo) {
                            case "connectors":
                                N = T.alignToConnectors(e, d, v, f);
                                break;
                            case "plotEdges":
                                N = T.alignToPlotEdges(t, d, v, f);
                                break;
                            default:
                                N = T.radialDistributionX(c, g, F, w)
                            }
                        t._attr = {
                            visibility: G,
                            align: x.alignment
                        };
                        U = g.options.dataLabels || {};
                        t._pos = {
                            x: N + k(U.x, l.x) + ({
                                left: n,
                                right: -n
                            }[x.alignment] || 0),
                            y: F + k(U.y, l.y) - 10
                        };
                        x.final.x = N;
                        x.final.y = F;
                        k(l.crop, !0) && (D = t.getBBox().width,
                        w = null,
                        N - D < n && 1 === d ? (w = Math.round(D - N + n),
                        P[3] = Math.max(w, P[3])) : N + D > v - n && 0 === d && (w = Math.round(N + D - v + n),
                        P[1] = Math.max(w, P[1])),
                        0 > F - M / 2 ? P[0] = Math.max(Math.round(-F + M / 2), P[0]) : F + M / 2 > m && (P[2] = Math.max(Math.round(F + M / 2 - m), P[2])),
                        t.sideOverflow = w)
                    }
                }
            }),
            0 === d(P) || this.verifyDataLabelOverflow(P)) && (this.placeDataLabels(),
            this.points.forEach(function(b) {
                U = y(l, b.options.dataLabels);
                if (p = k(U.connectorWidth, 1)) {
                    var e;
                    h = b.connector;
                    if ((t = b.dataLabel) && t._pos && b.visible && 0 < b.labelDistance) {
                        G = t._attr.visibility;
                        if (e = !h)
                            b.connector = h = a.renderer.path().addClass("highcharts-data-label-connector  highcharts-color-" + b.colorIndex + (b.className ? " " + b.className : "")).add(c.dataLabelsGroup),
                            a.styledMode || h.attr({
                                "stroke-width": p,
                                stroke: U.connectorColor || b.color || H.neutralColor60
                            });
                        h[e ? "attr" : "animate"]({
                            d: b.getConnectorPath()
                        });
                        h.attr("visibility", G)
                    } else
                        h && (b.connector = h.destroy())
                }
            }))
        }
        ,
        F.pie.prototype.placeDataLabels = function() {
            this.points.forEach(function(b) {
                var c = b.dataLabel, d;
                c && b.visible && ((d = c._pos) ? (c.sideOverflow && (c._attr.width = Math.max(c.getBBox().width - c.sideOverflow, 0),
                c.css({
                    width: c._attr.width + "px",
                    textOverflow: (this.options.dataLabels.style || {}).textOverflow || "ellipsis"
                }),
                c.shortened = !0),
                c.attr(c._attr),
                c[c.moved ? "animate" : "attr"](d),
                c.moved = !0) : c && c.attr({
                    y: -9999
                }));
                delete b.distributeBox
            }, this)
        }
        ,
        F.pie.prototype.alignDataLabel = c,
        F.pie.prototype.verifyDataLabelOverflow = function(b) {
            var c = this.center
              , d = this.options
              , a = d.center
              , g = d.minSize || 80
              , k = null !== d.size;
            if (!k) {
                if (null !== a[0])
                    var n = Math.max(c[2] - Math.max(b[1], b[3]), g);
                else
                    n = Math.max(c[2] - b[1] - b[3], g),
                    c[0] += (b[3] - b[1]) / 2;
                null !== a[1] ? n = l(n, g, c[2] - Math.max(b[0], b[2])) : (n = l(n, g, c[2] - b[0] - b[2]),
                c[1] += (b[0] - b[2]) / 2);
                n < c[2] ? (c[2] = n,
                c[3] = Math.min(L(d.innerSize || 0, n), n),
                this.translate(c),
                this.drawDataLabels && this.drawDataLabels()) : k = !0
            }
            return k
        }
        );
        F.column && (F.column.prototype.alignDataLabel = function(b, c, d, a, g) {
            var e = this.chart.inverted
              , l = b.series
              , n = b.dlBox || b.shapeArgs
              , m = k(b.below, b.plotY > k(this.translatedThreshold, l.yAxis.len))
              , f = k(d.inside, !!this.options.stacking);
            n && (a = y(n),
            0 > a.y && (a.height += a.y,
            a.y = 0),
            n = a.y + a.height - l.yAxis.len,
            0 < n && n < a.height && (a.height -= n),
            e && (a = {
                x: l.yAxis.len - a.y - a.height,
                y: l.xAxis.len - a.x - a.width,
                width: a.height,
                height: a.width
            }),
            f || (e ? (a.x += m ? 0 : a.width,
            a.width = 0) : (a.y += m ? a.height : 0,
            a.height = 0)));
            d.align = k(d.align, !e || f ? "center" : m ? "right" : "left");
            d.verticalAlign = k(d.verticalAlign, e || f ? "middle" : m ? "top" : "bottom");
            A.prototype.alignDataLabel.call(this, b, c, d, a, g);
            d.inside && b.contrastColor && c.css({
                color: b.contrastColor
            })
        }
        )
    });
    P(c, "Extensions/OverlappingDataLabels.js", [c["Core/Chart/Chart.js"], c["Core/Utilities.js"]], function(c, x) {
        function n(c, l) {
            var b = !1;
            if (c) {
                var d = c.newOpacity;
                c.oldOpacity !== d && (c.alignAttr && c.placed ? (c[d ? "removeClass" : "addClass"]("highcharts-data-label-hidden"),
                b = !0,
                c.alignAttr.opacity = d,
                c[c.isOld ? "animate" : "attr"](c.alignAttr, null, function() {
                    l.styledMode || c.css({
                        pointerEvents: d ? "auto" : "none"
                    })
                }),
                A(l, "afterHideOverlappingLabel")) : c.attr({
                    opacity: d
                }));
                c.isOld = !0
            }
            return b
        }
        var H = x.addEvent
          , A = x.fireEvent
          , F = x.isArray
          , G = x.isNumber
          , J = x.objectEach
          , p = x.pick;
        H(c, "render", function() {
            var c = this
              , l = [];
            (this.labelCollectors || []).forEach(function(b) {
                l = l.concat(b())
            });
            (this.yAxis || []).forEach(function(b) {
                b.stacking && b.options.stackLabels && !b.options.stackLabels.allowOverlap && J(b.stacking.stacks, function(b) {
                    J(b, function(b) {
                        b.label && "hidden" !== b.label.visibility && l.push(b.label)
                    })
                })
            });
            (this.series || []).forEach(function(b) {
                var d = b.options.dataLabels;
                b.visible && (!1 !== d.enabled || b._hasPointLabels) && (d = function(b) {
                    return b.forEach(function(b) {
                        b.visible && (F(b.dataLabels) ? b.dataLabels : b.dataLabel ? [b.dataLabel] : []).forEach(function(d) {
                            var g = d.options;
                            d.labelrank = p(g.labelrank, b.labelrank, b.shapeArgs && b.shapeArgs.height);
                            g.allowOverlap ? (d.oldOpacity = d.opacity,
                            d.newOpacity = 1,
                            n(d, c)) : l.push(d)
                        })
                    })
                }
                ,
                d(b.nodes || []),
                d(b.points))
            });
            this.hideOverlappingLabels(l)
        });
        c.prototype.hideOverlappingLabels = function(c) {
            var d = this, b = c.length, g = d.renderer, p, D, y, v = !1;
            var k = function(b) {
                var c, e = b.box ? 0 : b.padding || 0, d = c = 0, a;
                if (b && (!b.alignAttr || b.placed)) {
                    var k = b.alignAttr || {
                        x: b.attr("x"),
                        y: b.attr("y")
                    };
                    var l = b.parentGroup;
                    b.width || (c = b.getBBox(),
                    b.width = c.width,
                    b.height = c.height,
                    c = g.fontMetrics(null, b.element).h);
                    var n = b.width - 2 * e;
                    (a = {
                        left: "0",
                        center: "0.5",
                        right: "1"
                    }[b.alignValue]) ? d = +a * n : G(b.x) && Math.round(b.x) !== b.translateX && (d = b.x - b.translateX);
                    return {
                        x: k.x + (l.translateX || 0) + e - (d || 0),
                        y: k.y + (l.translateY || 0) + e - c,
                        width: b.width - 2 * e,
                        height: b.height - 2 * e
                    }
                }
            };
            for (D = 0; D < b; D++)
                if (p = c[D])
                    p.oldOpacity = p.opacity,
                    p.newOpacity = 1,
                    p.absoluteBox = k(p);
            c.sort(function(b, c) {
                return (c.labelrank || 0) - (b.labelrank || 0)
            });
            for (D = 0; D < b; D++) {
                var x = (k = c[D]) && k.absoluteBox;
                for (p = D + 1; p < b; ++p) {
                    var M = (y = c[p]) && y.absoluteBox;
                    !x || !M || k === y || 0 === k.newOpacity || 0 === y.newOpacity || M.x >= x.x + x.width || M.x + M.width <= x.x || M.y >= x.y + x.height || M.y + M.height <= x.y || ((k.labelrank < y.labelrank ? k : y).newOpacity = 0)
                }
            }
            c.forEach(function(b) {
                n(b, d) && (v = !0)
            });
            v && A(d, "afterHideAllOverlappingLabels")
        }
    });
    P(c, "Core/Responsive.js", [c["Core/Utilities.js"]], function(c) {
        var n = c.extend
          , E = c.find
          , H = c.isArray
          , A = c.isObject
          , F = c.merge
          , G = c.objectEach
          , J = c.pick
          , p = c.splat
          , d = c.uniqueKey
          , l = function() {
            function b() {}
            b.prototype.currentOptions = function(b) {
                function c(b, g, l, n) {
                    var k;
                    G(b, function(b, e) {
                        if (!n && -1 < d.collectionsWithUpdate.indexOf(e) && g[e])
                            for (b = p(b),
                            l[e] = [],
                            k = 0; k < Math.max(b.length, g[e].length); k++)
                                g[e][k] && (void 0 === b[k] ? l[e][k] = g[e][k] : (l[e][k] = {},
                                c(b[k], g[e][k], l[e][k], n + 1)));
                        else
                            A(b) ? (l[e] = H(b) ? [] : {},
                            c(b, g[e] || {}, l[e], n + 1)) : l[e] = "undefined" === typeof g[e] ? null : g[e]
                    })
                }
                var d = this
                  , g = {};
                c(b, this.options, g, 0);
                return g
            }
            ;
            b.prototype.matchResponsiveRule = function(b, c) {
                var d = b.condition;
                (d.callback || function() {
                    return this.chartWidth <= J(d.maxWidth, Number.MAX_VALUE) && this.chartHeight <= J(d.maxHeight, Number.MAX_VALUE) && this.chartWidth >= J(d.minWidth, 0) && this.chartHeight >= J(d.minHeight, 0)
                }
                ).call(this) && c.push(b._id)
            }
            ;
            b.prototype.setResponsive = function(b, c) {
                var g = this.options.responsive
                  , l = this.currentResponsive
                  , n = [];
                !c && g && g.rules && g.rules.forEach(function(b) {
                    "undefined" === typeof b._id && (b._id = d());
                    this.matchResponsiveRule(b, n)
                }, this);
                c = F.apply(void 0, n.map(function(b) {
                    return E((g || {}).rules || [], function(c) {
                        return c._id === b
                    })
                }).map(function(b) {
                    return b && b.chartOptions
                }));
                c.isResponsiveOptions = !0;
                n = n.toString() || void 0;
                n !== (l && l.ruleIds) && (l && this.update(l.undoOptions, b, !0),
                n ? (l = this.currentOptions(c),
                l.isResponsiveOptions = !0,
                this.currentResponsive = {
                    ruleIds: n,
                    mergedOptions: c,
                    undoOptions: l
                },
                this.update(c, b, !0)) : this.currentResponsive = void 0)
            }
            ;
            return b
        }();
        c = function() {
            function b() {}
            b.compose = function(b) {
                n(b.prototype, l.prototype);
                return b
            }
            ;
            return b
        }();
        "";
        "";
        return c
    });
    P(c, "masters/highcharts.src.js", [c["Core/Globals.js"], c["Core/Utilities.js"], c["Core/DefaultOptions.js"], c["Core/Animation/Fx.js"], c["Core/Animation/AnimationUtilities.js"], c["Core/Renderer/HTML/AST.js"], c["Core/FormatUtilities.js"], c["Core/Renderer/SVG/SVGElement.js"], c["Core/Renderer/SVG/SVGRenderer.js"], c["Core/Renderer/HTML/HTMLElement.js"], c["Core/Renderer/HTML/HTMLRenderer.js"], c["Core/Axis/Axis.js"], c["Core/Axis/PlotLineOrBand.js"], c["Core/Axis/Tick.js"], c["Core/Pointer.js"], c["Core/MSPointer.js"], c["Core/Chart/Chart.js"], c["Core/Series/Series.js"], c["Core/Responsive.js"], c["Core/Color/Color.js"], c["Core/Time.js"]], function(c, x, E, H, A, F, G, J, p, d, l, b, g, N, D, y, v, k, L, M, B) {
        c.animate = A.animate;
        c.animObject = A.animObject;
        c.getDeferredAnimation = A.getDeferredAnimation;
        c.setAnimation = A.setAnimation;
        c.stop = A.stop;
        c.timers = H.timers;
        c.AST = F;
        c.Axis = b;
        c.Chart = v;
        c.chart = v.chart;
        c.Fx = H;
        c.PlotLineOrBand = g;
        c.Pointer = y.isRequired() ? y : D;
        c.Series = k;
        c.SVGElement = J;
        c.SVGRenderer = p;
        c.Tick = N;
        c.Time = B;
        c.Color = M;
        c.color = M.parse;
        l.compose(p);
        d.compose(J);
        c.defaultOptions = E.defaultOptions;
        c.getOptions = E.getOptions;
        c.time = E.defaultTime;
        c.setOptions = E.setOptions;
        c.dateFormat = G.dateFormat;
        c.format = G.format;
        c.numberFormat = G.numberFormat;
        c.addEvent = x.addEvent;
        c.arrayMax = x.arrayMax;
        c.arrayMin = x.arrayMin;
        c.attr = x.attr;
        c.clearTimeout = x.clearTimeout;
        c.correctFloat = x.correctFloat;
        c.createElement = x.createElement;
        c.css = x.css;
        c.defined = x.defined;
        c.destroyObjectProperties = x.destroyObjectProperties;
        c.discardElement = x.discardElement;
        c.erase = x.erase;
        c.error = x.error;
        c.extend = x.extend;
        c.extendClass = x.extendClass;
        c.find = x.find;
        c.fireEvent = x.fireEvent;
        c.getMagnitude = x.getMagnitude;
        c.getStyle = x.getStyle;
        c.inArray = x.inArray;
        c.isArray = x.isArray;
        c.isClass = x.isClass;
        c.isDOMElement = x.isDOMElement;
        c.isFunction = x.isFunction;
        c.isNumber = x.isNumber;
        c.isObject = x.isObject;
        c.isString = x.isString;
        c.keys = x.keys;
        c.merge = x.merge;
        c.normalizeTickInterval = x.normalizeTickInterval;
        c.objectEach = x.objectEach;
        c.offset = x.offset;
        c.pad = x.pad;
        c.pick = x.pick;
        c.pInt = x.pInt;
        c.relativeLength = x.relativeLength;
        c.removeEvent = x.removeEvent;
        c.splat = x.splat;
        c.stableSort = x.stableSort;
        c.syncTimeout = x.syncTimeout;
        c.timeUnits = x.timeUnits;
        c.uniqueKey = x.uniqueKey;
        c.useSerialIds = x.useSerialIds;
        c.wrap = x.wrap;
        L.compose(v);
        return c
    });
    P(c, "Core/Axis/NavigatorAxis.js", [c["Core/Globals.js"], c["Core/Utilities.js"]], function(c, x) {
        var n = c.isTouchDevice
          , H = x.addEvent
          , A = x.correctFloat
          , F = x.defined
          , G = x.isNumber
          , J = x.pick
          , p = function() {
            function c(c) {
                this.axis = c
            }
            c.prototype.destroy = function() {
                this.axis = void 0
            }
            ;
            c.prototype.toFixedRange = function(c, b, d, p) {
                var g = this.axis
                  , l = g.chart;
                l = l && l.fixedRange;
                var n = (g.pointRange || 0) / 2;
                c = J(d, g.translate(c, !0, !g.horiz));
                b = J(p, g.translate(b, !0, !g.horiz));
                g = l && (b - c) / l;
                F(d) || (c = A(c + n));
                F(p) || (b = A(b - n));
                .7 < g && 1.3 > g && (p ? c = b - l : b = c + l);
                G(c) && G(b) || (c = b = void 0);
                return {
                    min: c,
                    max: b
                }
            }
            ;
            return c
        }();
        return function() {
            function c() {}
            c.compose = function(c) {
                c.keepProps.push("navigatorAxis");
                H(c, "init", function() {
                    this.navigatorAxis || (this.navigatorAxis = new p(this))
                });
                H(c, "zoom", function(b) {
                    var c = this.chart.options
                      , d = c.navigator
                      , l = this.navigatorAxis
                      , p = c.chart.pinchType
                      , v = c.rangeSelector;
                    c = c.chart.zoomType;
                    this.isXAxis && (d && d.enabled || v && v.enabled) && ("y" === c ? b.zoomed = !1 : (!n && "xy" === c || n && "xy" === p) && this.options.range && (d = l.previousZoom,
                    F(b.newMin) ? l.previousZoom = [this.min, this.max] : d && (b.newMin = d[0],
                    b.newMax = d[1],
                    l.previousZoom = void 0)));
                    "undefined" !== typeof b.zoomed && b.preventDefault()
                })
            }
            ;
            c.AdditionsClass = p;
            return c
        }()
    });
    P(c, "Core/Axis/ScrollbarAxis.js", [c["Core/Utilities.js"]], function(c) {
        var n = c.addEvent
          , E = c.defined
          , H = c.pick;
        return function() {
            function c() {}
            c.compose = function(c, x) {
                var A = function(c) {
                    var d = H(c.options && c.options.min, c.min)
                      , l = H(c.options && c.options.max, c.max);
                    return {
                        axisMin: d,
                        axisMax: l,
                        scrollMin: E(c.dataMin) ? Math.min(d, c.min, c.dataMin, H(c.threshold, Infinity)) : d,
                        scrollMax: E(c.dataMax) ? Math.max(l, c.max, c.dataMax, H(c.threshold, -Infinity)) : l
                    }
                };
                n(c, "afterInit", function() {
                    var c = this;
                    c.options && c.options.scrollbar && c.options.scrollbar.enabled && (c.options.scrollbar.vertical = !c.horiz,
                    c.options.startOnTick = c.options.endOnTick = !1,
                    c.scrollbar = new x(c.chart.renderer,c.options.scrollbar,c.chart),
                    n(c.scrollbar, "changed", function(d) {
                        var l = A(c)
                          , b = l.axisMax
                          , g = l.scrollMin
                          , n = l.scrollMax - g;
                        E(l.axisMin) && E(b) && (c.horiz && !c.reversed || !c.horiz && c.reversed ? (l = g + n * this.to,
                        g += n * this.from) : (l = g + n * (1 - this.from),
                        g += n * (1 - this.to)),
                        this.shouldUpdateExtremes(d.DOMType) ? c.setExtremes(g, l, !0, "mousemove" !== d.DOMType && "touchmove" !== d.DOMType, d) : this.setRange(this.from, this.to))
                    }))
                });
                n(c, "afterRender", function() {
                    var c = A(this)
                      , d = c.scrollMin
                      , l = c.scrollMax;
                    c = this.scrollbar;
                    var b = this.axisTitleMargin + (this.titleOffset || 0)
                      , g = this.chart.scrollbarsOffsets
                      , n = this.options.margin || 0;
                    c && (this.horiz ? (this.opposite || (g[1] += b),
                    c.position(this.left, this.top + this.height + 2 + g[1] - (this.opposite ? n : 0), this.width, this.height),
                    this.opposite || (g[1] += n),
                    b = 1) : (this.opposite && (g[0] += b),
                    c.position(this.left + this.width + 2 + g[0] - (this.opposite ? 0 : n), this.top, this.width, this.height),
                    this.opposite && (g[0] += n),
                    b = 0),
                    g[b] += c.size + c.options.margin,
                    isNaN(d) || isNaN(l) || !E(this.min) || !E(this.max) || this.min === this.max ? c.setRange(0, 1) : (g = (this.min - d) / (l - d),
                    d = (this.max - d) / (l - d),
                    this.horiz && !this.reversed || !this.horiz && this.reversed ? c.setRange(g, d) : c.setRange(1 - d, 1 - g)))
                });
                n(c, "afterGetOffset", function() {
                    var c = this.horiz ? 2 : 1
                      , d = this.scrollbar;
                    d && (this.chart.scrollbarsOffsets = [0, 0],
                    this.chart.axisOffset[c] += d.size + d.options.margin)
                });
                return c
            }
            ;
            return c
        }()
    });
    P(c, "Core/ScrollbarDefaults.js", [c["Core/Globals.js"], c["Core/Color/Palette.js"]], function(c, x) {
        return {
            height: c.isTouchDevice ? 20 : 14,
            barBorderRadius: 0,
            buttonBorderRadius: 0,
            liveRedraw: void 0,
            margin: 10,
            minWidth: 6,
            step: .2,
            zIndex: 3,
            barBackgroundColor: x.neutralColor20,
            barBorderWidth: 1,
            barBorderColor: x.neutralColor20,
            buttonArrowColor: x.neutralColor80,
            buttonBackgroundColor: x.neutralColor10,
            buttonBorderColor: x.neutralColor20,
            buttonBorderWidth: 1,
            rifleColor: x.neutralColor80,
            trackBackgroundColor: x.neutralColor5,
            trackBorderColor: x.neutralColor5,
            trackBorderWidth: 1
        }
    });
    P(c, "Core/Scrollbar.js", [c["Core/DefaultOptions.js"], c["Core/Globals.js"], c["Core/Axis/ScrollbarAxis.js"], c["Core/ScrollbarDefaults.js"], c["Core/Utilities.js"]], function(c, x, E, H, A) {
        var n = c.defaultOptions
          , G = A.addEvent
          , J = A.correctFloat
          , p = A.defined
          , d = A.destroyObjectProperties
          , l = A.fireEvent
          , b = A.merge
          , g = A.pick
          , N = A.removeEvent;
        c = function() {
            function c(b, c, d) {
                this._events = [];
                this.chart = void 0;
                this.from = this.chartY = this.chartX = 0;
                this.scrollbar = this.renderer = this.options = this.group = void 0;
                this.scrollbarButtons = [];
                this.scrollbarGroup = void 0;
                this.scrollbarLeft = 0;
                this.scrollbarRifles = void 0;
                this.scrollbarStrokeWidth = 1;
                this.to = this.size = this.scrollbarTop = 0;
                this.track = void 0;
                this.trackBorderWidth = 1;
                this.userOptions = void 0;
                this.y = this.x = 0;
                this.init(b, c, d)
            }
            c.compose = function(b) {
                E.compose(b, c)
            }
            ;
            c.swapXY = function(b, c) {
                c && b.forEach(function(b) {
                    for (var c = b.length, d, g = 0; g < c; g += 2)
                        d = b[g + 1],
                        "number" === typeof d && (b[g + 1] = b[g + 2],
                        b[g + 2] = d)
                });
                return b
            }
            ;
            c.prototype.addEvents = function() {
                var b = this.options.inverted ? [1, 0] : [0, 1]
                  , c = this.scrollbarButtons
                  , d = this.scrollbarGroup.element
                  , g = this.track.element
                  , l = this.mouseDownHandler.bind(this)
                  , n = this.mouseMoveHandler.bind(this)
                  , p = this.mouseUpHandler.bind(this);
                b = [[c[b[0]].element, "click", this.buttonToMinClick.bind(this)], [c[b[1]].element, "click", this.buttonToMaxClick.bind(this)], [g, "click", this.trackClick.bind(this)], [d, "mousedown", l], [d.ownerDocument, "mousemove", n], [d.ownerDocument, "mouseup", p]];
                x.hasTouch && b.push([d, "touchstart", l], [d.ownerDocument, "touchmove", n], [d.ownerDocument, "touchend", p]);
                b.forEach(function(b) {
                    G.apply(null, b)
                });
                this._events = b
            }
            ;
            c.prototype.buttonToMaxClick = function(b) {
                var c = (this.to - this.from) * g(this.options.step, .2);
                this.updatePosition(this.from + c, this.to + c);
                l(this, "changed", {
                    from: this.from,
                    to: this.to,
                    trigger: "scrollbar",
                    DOMEvent: b
                })
            }
            ;
            c.prototype.buttonToMinClick = function(b) {
                var c = J(this.to - this.from) * g(this.options.step, .2);
                this.updatePosition(J(this.from - c), J(this.to - c));
                l(this, "changed", {
                    from: this.from,
                    to: this.to,
                    trigger: "scrollbar",
                    DOMEvent: b
                })
            }
            ;
            c.prototype.cursorToScrollbarPosition = function(b) {
                var c = this.options;
                c = c.minWidth > this.calculatedWidth ? c.minWidth : 0;
                return {
                    chartX: (b.chartX - this.x - this.xOffset) / (this.barWidth - c),
                    chartY: (b.chartY - this.y - this.yOffset) / (this.barWidth - c)
                }
            }
            ;
            c.prototype.destroy = function() {
                var b = this
                  , c = b.chart.scroller;
                b.removeEvents();
                ["track", "scrollbarRifles", "scrollbar", "scrollbarGroup", "group"].forEach(function(c) {
                    b[c] && b[c].destroy && (b[c] = b[c].destroy())
                });
                c && b === c.scrollbar && (c.scrollbar = null,
                d(c.scrollbarButtons))
            }
            ;
            c.prototype.drawScrollbarButton = function(b) {
                var d = this.renderer
                  , g = this.scrollbarButtons
                  , l = this.options
                  , n = this.size
                  , p = d.g().add(this.group);
                g.push(p);
                p = d.rect().addClass("highcharts-scrollbar-button").add(p);
                this.chart.styledMode || p.attr({
                    stroke: l.buttonBorderColor,
                    "stroke-width": l.buttonBorderWidth,
                    fill: l.buttonBackgroundColor
                });
                p.attr(p.crisp({
                    x: -.5,
                    y: -.5,
                    width: n + 1,
                    height: n + 1,
                    r: l.buttonBorderRadius
                }, p.strokeWidth()));
                p = d.path(c.swapXY([["M", n / 2 + (b ? -1 : 1), n / 2 - 3], ["L", n / 2 + (b ? -1 : 1), n / 2 + 3], ["L", n / 2 + (b ? 2 : -2), n / 2]], l.vertical)).addClass("highcharts-scrollbar-arrow").add(g[b]);
                this.chart.styledMode || p.attr({
                    fill: l.buttonArrowColor
                })
            }
            ;
            c.prototype.init = function(c, d, k) {
                this.scrollbarButtons = [];
                this.renderer = c;
                this.userOptions = d;
                this.options = b(H, n.scrollbar, d);
                this.chart = k;
                this.size = g(this.options.size, this.options.height);
                d.enabled && (this.render(),
                this.addEvents())
            }
            ;
            c.prototype.mouseDownHandler = function(b) {
                b = this.chart.pointer.normalize(b);
                b = this.cursorToScrollbarPosition(b);
                this.chartX = b.chartX;
                this.chartY = b.chartY;
                this.initPositions = [this.from, this.to];
                this.grabbedCenter = !0
            }
            ;
            c.prototype.mouseMoveHandler = function(b) {
                var c = this.chart.pointer.normalize(b)
                  , d = this.options.vertical ? "chartY" : "chartX"
                  , g = this.initPositions || [];
                !this.grabbedCenter || b.touches && 0 === b.touches[0][d] || (c = this.cursorToScrollbarPosition(c)[d],
                d = this[d],
                d = c - d,
                this.hasDragged = !0,
                this.updatePosition(g[0] + d, g[1] + d),
                this.hasDragged && l(this, "changed", {
                    from: this.from,
                    to: this.to,
                    trigger: "scrollbar",
                    DOMType: b.type,
                    DOMEvent: b
                }))
            }
            ;
            c.prototype.mouseUpHandler = function(b) {
                this.hasDragged && l(this, "changed", {
                    from: this.from,
                    to: this.to,
                    trigger: "scrollbar",
                    DOMType: b.type,
                    DOMEvent: b
                });
                this.grabbedCenter = this.hasDragged = this.chartX = this.chartY = null
            }
            ;
            c.prototype.position = function(b, c, d, g) {
                var k = this.options.vertical
                  , l = this.rendered ? "animate" : "attr"
                  , n = 0;
                this.x = b;
                this.y = c + this.trackBorderWidth;
                this.width = d;
                this.xOffset = this.height = g;
                this.yOffset = n;
                k ? (this.width = this.yOffset = d = n = this.size,
                this.xOffset = c = 0,
                this.barWidth = g - 2 * d,
                this.x = b += this.options.margin) : (this.height = this.xOffset = g = c = this.size,
                this.barWidth = d - 2 * g,
                this.y += this.options.margin);
                this.group[l]({
                    translateX: b,
                    translateY: this.y
                });
                this.track[l]({
                    width: d,
                    height: g
                });
                this.scrollbarButtons[1][l]({
                    translateX: k ? 0 : d - c,
                    translateY: k ? g - n : 0
                })
            }
            ;
            c.prototype.removeEvents = function() {
                this._events.forEach(function(b) {
                    N.apply(null, b)
                });
                this._events.length = 0
            }
            ;
            c.prototype.render = function() {
                var b = this.renderer
                  , d = this.options
                  , g = this.size
                  , l = this.chart.styledMode
                  , n = b.g("scrollbar").attr({
                    zIndex: d.zIndex,
                    translateY: -99999
                }).add();
                this.group = n;
                this.track = b.rect().addClass("highcharts-scrollbar-track").attr({
                    x: 0,
                    r: d.trackBorderRadius || 0,
                    height: g,
                    width: g
                }).add(n);
                l || this.track.attr({
                    fill: d.trackBackgroundColor,
                    stroke: d.trackBorderColor,
                    "stroke-width": d.trackBorderWidth
                });
                this.trackBorderWidth = this.track.strokeWidth();
                this.track.attr({
                    y: -this.trackBorderWidth % 2 / 2
                });
                this.scrollbarGroup = b.g().add(n);
                this.scrollbar = b.rect().addClass("highcharts-scrollbar-thumb").attr({
                    height: g,
                    width: g,
                    r: d.barBorderRadius || 0
                }).add(this.scrollbarGroup);
                this.scrollbarRifles = b.path(c.swapXY([["M", -3, g / 4], ["L", -3, 2 * g / 3], ["M", 0, g / 4], ["L", 0, 2 * g / 3], ["M", 3, g / 4], ["L", 3, 2 * g / 3]], d.vertical)).addClass("highcharts-scrollbar-rifles").add(this.scrollbarGroup);
                l || (this.scrollbar.attr({
                    fill: d.barBackgroundColor,
                    stroke: d.barBorderColor,
                    "stroke-width": d.barBorderWidth
                }),
                this.scrollbarRifles.attr({
                    stroke: d.rifleColor,
                    "stroke-width": 1
                }));
                this.scrollbarStrokeWidth = this.scrollbar.strokeWidth();
                this.scrollbarGroup.translate(-this.scrollbarStrokeWidth % 2 / 2, -this.scrollbarStrokeWidth % 2 / 2);
                this.drawScrollbarButton(0);
                this.drawScrollbarButton(1)
            }
            ;
            c.prototype.setRange = function(b, c) {
                var d = this.options
                  , g = d.vertical
                  , l = d.minWidth
                  , n = this.barWidth
                  , w = !this.rendered || this.hasDragged || this.chart.navigator && this.chart.navigator.hasDragged ? "attr" : "animate";
                if (p(n)) {
                    var e = n * Math.min(c, 1);
                    b = Math.max(b, 0);
                    var r = Math.ceil(n * b);
                    this.calculatedWidth = e = J(e - r);
                    e < l && (r = (n - l + e) * b,
                    e = l);
                    l = Math.floor(r + this.xOffset + this.yOffset);
                    n = e / 2 - .5;
                    this.from = b;
                    this.to = c;
                    g ? (this.scrollbarGroup[w]({
                        translateY: l
                    }),
                    this.scrollbar[w]({
                        height: e
                    }),
                    this.scrollbarRifles[w]({
                        translateY: n
                    }),
                    this.scrollbarTop = l,
                    this.scrollbarLeft = 0) : (this.scrollbarGroup[w]({
                        translateX: l
                    }),
                    this.scrollbar[w]({
                        width: e
                    }),
                    this.scrollbarRifles[w]({
                        translateX: n
                    }),
                    this.scrollbarLeft = l,
                    this.scrollbarTop = 0);
                    12 >= e ? this.scrollbarRifles.hide() : this.scrollbarRifles.show(!0);
                    !1 === d.showFull && (0 >= b && 1 <= c ? this.group.hide() : this.group.show());
                    this.rendered = !0
                }
            }
            ;
            c.prototype.shouldUpdateExtremes = function(b) {
                return g(this.options.liveRedraw, x.svg && !x.isTouchDevice && !this.chart.isBoosting) || "mouseup" === b || "touchend" === b || !p(b)
            }
            ;
            c.prototype.trackClick = function(b) {
                var c = this.chart.pointer.normalize(b)
                  , d = this.to - this.from
                  , g = this.y + this.scrollbarTop
                  , n = this.x + this.scrollbarLeft;
                this.options.vertical && c.chartY > g || !this.options.vertical && c.chartX > n ? this.updatePosition(this.from + d, this.to + d) : this.updatePosition(this.from - d, this.to - d);
                l(this, "changed", {
                    from: this.from,
                    to: this.to,
                    trigger: "scrollbar",
                    DOMEvent: b
                })
            }
            ;
            c.prototype.update = function(c) {
                this.destroy();
                this.init(this.chart.renderer, b(!0, this.options, c), this.chart)
            }
            ;
            c.prototype.updatePosition = function(b, c) {
                1 < c && (b = J(1 - J(c - b)),
                c = 1);
                0 > b && (c = J(c - b),
                b = 0);
                this.from = b;
                this.to = c
            }
            ;
            c.defaultOptions = H;
            return c
        }();
        n.scrollbar = b(!0, c.defaultOptions, n.scrollbar);
        return c
    });
    P(c, "Core/Navigator.js", [c["Core/Axis/Axis.js"], c["Core/Chart/Chart.js"], c["Core/Color/Color.js"], c["Core/Globals.js"], c["Core/Axis/NavigatorAxis.js"], c["Core/DefaultOptions.js"], c["Core/Color/Palette.js"], c["Core/Renderer/RendererRegistry.js"], c["Core/Scrollbar.js"], c["Core/Series/Series.js"], c["Core/Series/SeriesRegistry.js"], c["Core/Utilities.js"]], function(c, x, E, H, A, F, G, J, p, d, l, b) {
        E = E.parse;
        var g = H.hasTouch
          , n = H.isTouchDevice
          , D = F.defaultOptions
          , y = b.addEvent
          , v = b.clamp
          , k = b.correctFloat
          , L = b.defined
          , M = b.destroyObjectProperties
          , B = b.erase
          , w = b.extend
          , e = b.find
          , r = b.isArray
          , a = b.isNumber
          , q = b.merge
          , I = b.pick
          , C = b.removeEvent
          , z = b.splat
          , m = function(b) {
            for (var c = [], e = 1; e < arguments.length; e++)
                c[e - 1] = arguments[e];
            c = [].filter.call(c, a);
            if (c.length)
                return Math[b].apply(0, c)
        };
        F = "undefined" === typeof l.seriesTypes.areaspline ? "line" : "areaspline";
        w(D, {
            navigator: {
                height: 40,
                margin: 25,
                maskInside: !0,
                handles: {
                    width: 7,
                    height: 15,
                    symbols: ["navigator-handle", "navigator-handle"],
                    enabled: !0,
                    lineWidth: 1,
                    backgroundColor: G.neutralColor5,
                    borderColor: G.neutralColor40
                },
                maskFill: E(G.highlightColor60).setOpacity(.3).get(),
                outlineColor: G.neutralColor20,
                outlineWidth: 1,
                series: {
                    type: F,
                    fillOpacity: .05,
                    lineWidth: 1,
                    compare: null,
                    dataGrouping: {
                        approximation: "average",
                        enabled: !0,
                        groupPixelWidth: 2,
                        firstAnchor: "firstPoint",
                        anchor: "middle",
                        lastAnchor: "lastPoint",
                        units: [["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]], ["second", [1, 2, 5, 10, 15, 30]], ["minute", [1, 2, 5, 10, 15, 30]], ["hour", [1, 2, 3, 4, 6, 8, 12]], ["day", [1, 2, 3, 4]], ["week", [1, 2, 3]], ["month", [1, 3, 6]], ["year", null]]
                    },
                    dataLabels: {
                        enabled: !1,
                        zIndex: 2
                    },
                    id: "highcharts-navigator-series",
                    className: "highcharts-navigator-series",
                    lineColor: null,
                    marker: {
                        enabled: !1
                    },
                    threshold: null
                },
                xAxis: {
                    overscroll: 0,
                    className: "highcharts-navigator-xaxis",
                    tickLength: 0,
                    lineWidth: 0,
                    gridLineColor: G.neutralColor10,
                    gridLineWidth: 1,
                    tickPixelInterval: 200,
                    labels: {
                        align: "left",
                        style: {
                            color: G.neutralColor40
                        },
                        x: 3,
                        y: -4
                    },
                    crosshair: !1
                },
                yAxis: {
                    className: "highcharts-navigator-yaxis",
                    gridLineWidth: 0,
                    startOnTick: !1,
                    endOnTick: !1,
                    minPadding: .1,
                    maxPadding: .1,
                    labels: {
                        enabled: !1
                    },
                    crosshair: !1,
                    title: {
                        text: null
                    },
                    tickLength: 0,
                    tickWidth: 0
                }
            }
        });
        J.getRendererType().prototype.symbols["navigator-handle"] = function(a, b, c, e, d) {
            a = (d && d.width || 0) / 2;
            b = Math.round(a / 3) + .5;
            d = d && d.height || 0;
            return [["M", -a - 1, .5], ["L", a, .5], ["L", a, d + .5], ["L", -a - 1, d + .5], ["L", -a - 1, .5], ["M", -b, 4], ["L", -b, d - 3], ["M", b - 1, 4], ["L", b - 1, d - 3]]
        }
        ;
        var f = function() {
            function b(a) {
                this.zoomedMin = this.zoomedMax = this.yAxis = this.xAxis = this.top = this.size = this.shades = this.rendered = this.range = this.outlineHeight = this.outline = this.opposite = this.navigatorSize = this.navigatorSeries = this.navigatorOptions = this.navigatorGroup = this.navigatorEnabled = this.left = this.height = this.handles = this.chart = this.baseSeries = void 0;
                this.init(a)
            }
            b.prototype.drawHandle = function(a, b, c, e) {
                var d = this.navigatorOptions.handles.height;
                this.handles[b][e](c ? {
                    translateX: Math.round(this.left + this.height / 2),
                    translateY: Math.round(this.top + parseInt(a, 10) + .5 - d)
                } : {
                    translateX: Math.round(this.left + parseInt(a, 10)),
                    translateY: Math.round(this.top + this.height / 2 - d / 2 - 1)
                })
            }
            ;
            b.prototype.drawOutline = function(a, b, c, e) {
                var d = this.navigatorOptions.maskInside
                  , f = this.outline.strokeWidth()
                  , h = f / 2
                  , g = f % 2 / 2;
                f = this.outlineHeight;
                var m = this.scrollbarHeight || 0
                  , u = this.size
                  , k = this.left - m
                  , l = this.top;
                c ? (k -= h,
                c = l + b + g,
                b = l + a + g,
                g = [["M", k + f, l - m - g], ["L", k + f, c], ["L", k, c], ["L", k, b], ["L", k + f, b], ["L", k + f, l + u + m]],
                d && g.push(["M", k + f, c - h], ["L", k + f, b + h])) : (a += k + m - g,
                b += k + m - g,
                l += h,
                g = [["M", k, l], ["L", a, l], ["L", a, l + f], ["L", b, l + f], ["L", b, l], ["L", k + u + 2 * m, l]],
                d && g.push(["M", a - h, l], ["L", b + h, l]));
                this.outline[e]({
                    d: g
                })
            }
            ;
            b.prototype.drawMasks = function(a, b, c, e) {
                var d = this.left
                  , f = this.top
                  , h = this.height;
                if (c) {
                    var g = [d, d, d];
                    var m = [f, f + a, f + b];
                    var k = [h, h, h];
                    var u = [a, b - a, this.size - b]
                } else
                    g = [d, d + a, d + b],
                    m = [f, f, f],
                    k = [a, b - a, this.size - b],
                    u = [h, h, h];
                this.shades.forEach(function(a, b) {
                    a[e]({
                        x: g[b],
                        y: m[b],
                        width: k[b],
                        height: u[b]
                    })
                })
            }
            ;
            b.prototype.renderElements = function() {
                var a = this, b = a.navigatorOptions, c = b.maskInside, e = a.chart, d = e.renderer, f, g = {
                    cursor: e.inverted ? "ns-resize" : "ew-resize"
                };
                a.navigatorGroup = f = d.g("navigator").attr({
                    zIndex: 8,
                    visibility: "hidden"
                }).add();
                [!c, c, !c].forEach(function(c, h) {
                    a.shades[h] = d.rect().addClass("highcharts-navigator-mask" + (1 === h ? "-inside" : "-outside")).add(f);
                    e.styledMode || a.shades[h].attr({
                        fill: c ? b.maskFill : "rgba(0,0,0,0)"
                    }).css(1 === h && g)
                });
                a.outline = d.path().addClass("highcharts-navigator-outline").add(f);
                e.styledMode || a.outline.attr({
                    "stroke-width": b.outlineWidth,
                    stroke: b.outlineColor
                });
                b.handles.enabled && [0, 1].forEach(function(c) {
                    b.handles.inverted = e.inverted;
                    a.handles[c] = d.symbol(b.handles.symbols[c], -b.handles.width / 2 - 1, 0, b.handles.width, b.handles.height, b.handles);
                    a.handles[c].attr({
                        zIndex: 7 - c
                    }).addClass("highcharts-navigator-handle highcharts-navigator-handle-" + ["left", "right"][c]).add(f);
                    if (!e.styledMode) {
                        var h = b.handles;
                        a.handles[c].attr({
                            fill: h.backgroundColor,
                            stroke: h.borderColor,
                            "stroke-width": h.lineWidth
                        }).css(g)
                    }
                })
            }
            ;
            b.prototype.update = function(a) {
                (this.series || []).forEach(function(a) {
                    a.baseSeries && delete a.baseSeries.navigatorSeries
                });
                this.destroy();
                q(!0, this.chart.options.navigator, this.options, a);
                this.init(this.chart)
            }
            ;
            b.prototype.render = function(b, c, e, d) {
                var f = this.chart, h = this.scrollbarHeight, g, m = this.xAxis, l = m.pointRange || 0;
                var u = m.navigatorAxis.fake ? f.xAxis[0] : m;
                var n = this.navigatorEnabled, q, p = this.rendered;
                var w = f.inverted;
                var r = f.xAxis[0].minRange
                  , z = f.xAxis[0].options.maxRange;
                if (!this.hasDragged || L(e)) {
                    b = k(b - l / 2);
                    c = k(c + l / 2);
                    if (!a(b) || !a(c))
                        if (p)
                            e = 0,
                            d = I(m.width, u.width);
                        else
                            return;
                    this.left = I(m.left, f.plotLeft + h + (w ? f.plotWidth : 0));
                    this.size = q = g = I(m.len, (w ? f.plotHeight : f.plotWidth) - 2 * h);
                    f = w ? h : g + 2 * h;
                    e = I(e, m.toPixels(b, !0));
                    d = I(d, m.toPixels(c, !0));
                    a(e) && Infinity !== Math.abs(e) || (e = 0,
                    d = f);
                    b = m.toValue(e, !0);
                    c = m.toValue(d, !0);
                    var K = Math.abs(k(c - b));
                    K < r ? this.grabbedLeft ? e = m.toPixels(c - r - l, !0) : this.grabbedRight && (d = m.toPixels(b + r + l, !0)) : L(z) && k(K - l) > z && (this.grabbedLeft ? e = m.toPixels(c - z - l, !0) : this.grabbedRight && (d = m.toPixels(b + z + l, !0)));
                    this.zoomedMax = v(Math.max(e, d), 0, q);
                    this.zoomedMin = v(this.fixedWidth ? this.zoomedMax - this.fixedWidth : Math.min(e, d), 0, q);
                    this.range = this.zoomedMax - this.zoomedMin;
                    q = Math.round(this.zoomedMax);
                    e = Math.round(this.zoomedMin);
                    n && (this.navigatorGroup.attr({
                        visibility: "visible"
                    }),
                    p = p && !this.hasDragged ? "animate" : "attr",
                    this.drawMasks(e, q, w, p),
                    this.drawOutline(e, q, w, p),
                    this.navigatorOptions.handles.enabled && (this.drawHandle(e, 0, w, p),
                    this.drawHandle(q, 1, w, p)));
                    this.scrollbar && (w ? (w = this.top - h,
                    u = this.left - h + (n || !u.opposite ? 0 : (u.titleOffset || 0) + u.axisTitleMargin),
                    h = g + 2 * h) : (w = this.top + (n ? this.height : -h),
                    u = this.left - h),
                    this.scrollbar.position(u, w, f, h),
                    this.scrollbar.setRange(this.zoomedMin / (g || 1), this.zoomedMax / (g || 1)));
                    this.rendered = !0
                }
            }
            ;
            b.prototype.addMouseEvents = function() {
                var a = this, b = a.chart, c = b.container, e = [], d, f;
                a.mouseMoveHandler = d = function(b) {
                    a.onMouseMove(b)
                }
                ;
                a.mouseUpHandler = f = function(b) {
                    a.onMouseUp(b)
                }
                ;
                e = a.getPartsEvents("mousedown");
                e.push(y(b.renderTo, "mousemove", d), y(c.ownerDocument, "mouseup", f));
                g && (e.push(y(b.renderTo, "touchmove", d), y(c.ownerDocument, "touchend", f)),
                e.concat(a.getPartsEvents("touchstart")));
                a.eventsToUnbind = e;
                a.series && a.series[0] && e.push(y(a.series[0].xAxis, "foundExtremes", function() {
                    b.navigator.modifyNavigatorAxisExtremes()
                }))
            }
            ;
            b.prototype.getPartsEvents = function(a) {
                var b = this
                  , c = [];
                ["shades", "handles"].forEach(function(e) {
                    b[e].forEach(function(d, f) {
                        c.push(y(d.element, a, function(a) {
                            b[e + "Mousedown"](a, f)
                        }))
                    })
                });
                return c
            }
            ;
            b.prototype.shadesMousedown = function(a, b) {
                a = this.chart.pointer.normalize(a);
                var c = this.chart
                  , e = this.xAxis
                  , d = this.zoomedMin
                  , f = this.left
                  , h = this.size
                  , g = this.range
                  , m = a.chartX;
                c.inverted && (m = a.chartY,
                f = this.top);
                if (1 === b)
                    this.grabbedCenter = m,
                    this.fixedWidth = g,
                    this.dragOffset = m - d;
                else {
                    a = m - f - g / 2;
                    if (0 === b)
                        a = Math.max(0, a);
                    else if (2 === b && a + g >= h)
                        if (a = h - g,
                        this.reversedExtremes) {
                            a -= g;
                            var k = this.getUnionExtremes().dataMin
                        } else
                            var l = this.getUnionExtremes().dataMax;
                    a !== d && (this.fixedWidth = g,
                    b = e.navigatorAxis.toFixedRange(a, a + g, k, l),
                    L(b.min) && c.xAxis[0].setExtremes(Math.min(b.min, b.max), Math.max(b.min, b.max), !0, null, {
                        trigger: "navigator"
                    }))
                }
            }
            ;
            b.prototype.handlesMousedown = function(a, b) {
                this.chart.pointer.normalize(a);
                a = this.chart;
                var c = a.xAxis[0]
                  , e = this.reversedExtremes;
                0 === b ? (this.grabbedLeft = !0,
                this.otherHandlePos = this.zoomedMax,
                this.fixedExtreme = e ? c.min : c.max) : (this.grabbedRight = !0,
                this.otherHandlePos = this.zoomedMin,
                this.fixedExtreme = e ? c.max : c.min);
                a.fixedRange = null
            }
            ;
            b.prototype.onMouseMove = function(a) {
                var b = this
                  , c = b.chart
                  , e = b.left
                  , d = b.navigatorSize
                  , f = b.range
                  , h = b.dragOffset
                  , g = c.inverted;
                a.touches && 0 === a.touches[0].pageX || (a = c.pointer.normalize(a),
                c = a.chartX,
                g && (e = b.top,
                c = a.chartY),
                b.grabbedLeft ? (b.hasDragged = !0,
                b.render(0, 0, c - e, b.otherHandlePos)) : b.grabbedRight ? (b.hasDragged = !0,
                b.render(0, 0, b.otherHandlePos, c - e)) : b.grabbedCenter && (b.hasDragged = !0,
                c < h ? c = h : c > d + h - f && (c = d + h - f),
                b.render(0, 0, c - h, c - h + f)),
                b.hasDragged && b.scrollbar && I(b.scrollbar.options.liveRedraw, H.svg && !n && !this.chart.isBoosting) && (a.DOMType = a.type,
                setTimeout(function() {
                    b.onMouseUp(a)
                }, 0)))
            }
            ;
            b.prototype.onMouseUp = function(b) {
                var c = this.chart
                  , e = this.xAxis
                  , d = this.scrollbar
                  , f = b.DOMEvent || b
                  , h = c.inverted
                  , g = this.rendered && !this.hasDragged ? "animate" : "attr";
                if (this.hasDragged && (!d || !d.hasDragged) || "scrollbar" === b.trigger) {
                    d = this.getUnionExtremes();
                    if (this.zoomedMin === this.otherHandlePos)
                        var m = this.fixedExtreme;
                    else if (this.zoomedMax === this.otherHandlePos)
                        var k = this.fixedExtreme;
                    this.zoomedMax === this.size && (k = this.reversedExtremes ? d.dataMin : d.dataMax);
                    0 === this.zoomedMin && (m = this.reversedExtremes ? d.dataMax : d.dataMin);
                    e = e.navigatorAxis.toFixedRange(this.zoomedMin, this.zoomedMax, m, k);
                    L(e.min) && c.xAxis[0].setExtremes(Math.min(e.min, e.max), Math.max(e.min, e.max), !0, this.hasDragged ? !1 : null, {
                        trigger: "navigator",
                        triggerOp: "navigator-drag",
                        DOMEvent: f
                    })
                }
                "mousemove" !== b.DOMType && "touchmove" !== b.DOMType && (this.grabbedLeft = this.grabbedRight = this.grabbedCenter = this.fixedWidth = this.fixedExtreme = this.otherHandlePos = this.hasDragged = this.dragOffset = null);
                this.navigatorEnabled && a(this.zoomedMin) && a(this.zoomedMax) && (c = Math.round(this.zoomedMin),
                b = Math.round(this.zoomedMax),
                this.shades && this.drawMasks(c, b, h, g),
                this.outline && this.drawOutline(c, b, h, g),
                this.navigatorOptions.handles.enabled && Object.keys(this.handles).length === this.handles.length && (this.drawHandle(c, 0, h, g),
                this.drawHandle(b, 1, h, g)))
            }
            ;
            b.prototype.removeEvents = function() {
                this.eventsToUnbind && (this.eventsToUnbind.forEach(function(a) {
                    a()
                }),
                this.eventsToUnbind = void 0);
                this.removeBaseSeriesEvents()
            }
            ;
            b.prototype.removeBaseSeriesEvents = function() {
                var a = this.baseSeries || [];
                this.navigatorEnabled && a[0] && (!1 !== this.navigatorOptions.adaptToUpdatedData && a.forEach(function(a) {
                    C(a, "updatedData", this.updatedDataHandler)
                }, this),
                a[0].xAxis && C(a[0].xAxis, "foundExtremes", this.modifyBaseAxisExtremes))
            }
            ;
            b.prototype.init = function(a) {
                var b = a.options
                  , e = b.navigator
                  , d = e.enabled
                  , f = b.scrollbar
                  , h = f.enabled;
                b = d ? e.height : 0;
                var g = h ? f.height : 0;
                this.handles = [];
                this.shades = [];
                this.chart = a;
                this.setBaseSeries();
                this.height = b;
                this.scrollbarHeight = g;
                this.scrollbarEnabled = h;
                this.navigatorEnabled = d;
                this.navigatorOptions = e;
                this.scrollbarOptions = f;
                this.outlineHeight = b + g;
                this.opposite = I(e.opposite, !(d || !a.inverted));
                var k = this;
                d = k.baseSeries;
                f = a.xAxis.length;
                h = a.yAxis.length;
                var l = d && d[0] && d[0].xAxis || a.xAxis[0] || {
                    options: {}
                };
                a.isDirtyBox = !0;
                k.navigatorEnabled ? (k.xAxis = new c(a,q({
                    breaks: l.options.breaks,
                    ordinal: l.options.ordinal
                }, e.xAxis, {
                    id: "navigator-x-axis",
                    yAxis: "navigator-y-axis",
                    isX: !0,
                    type: "datetime",
                    index: f,
                    isInternal: !0,
                    offset: 0,
                    keepOrdinalPadding: !0,
                    startOnTick: !1,
                    endOnTick: !1,
                    minPadding: 0,
                    maxPadding: 0,
                    zoomEnabled: !1
                }, a.inverted ? {
                    offsets: [g, 0, -g, 0],
                    width: b
                } : {
                    offsets: [0, -g, 0, g],
                    height: b
                })),
                k.yAxis = new c(a,q(e.yAxis, {
                    id: "navigator-y-axis",
                    alignTicks: !1,
                    offset: 0,
                    index: h,
                    isInternal: !0,
                    reversed: I(e.yAxis && e.yAxis.reversed, a.yAxis[0] && a.yAxis[0].reversed, !1),
                    zoomEnabled: !1
                }, a.inverted ? {
                    width: b
                } : {
                    height: b
                })),
                d || e.series.data ? k.updateNavigatorSeries(!1) : 0 === a.series.length && (k.unbindRedraw = y(a, "beforeRedraw", function() {
                    0 < a.series.length && !k.series && (k.setBaseSeries(),
                    k.unbindRedraw())
                })),
                k.reversedExtremes = a.inverted && !k.xAxis.reversed || !a.inverted && k.xAxis.reversed,
                k.renderElements(),
                k.addMouseEvents()) : (k.xAxis = {
                    chart: a,
                    navigatorAxis: {
                        fake: !0
                    },
                    translate: function(b, c) {
                        var e = a.xAxis[0]
                          , d = e.getExtremes()
                          , f = e.len - 2 * g
                          , h = m("min", e.options.min, d.dataMin);
                        e = m("max", e.options.max, d.dataMax) - h;
                        return c ? b * e / f + h : f * (b - h) / e
                    },
                    toPixels: function(a) {
                        return this.translate(a)
                    },
                    toValue: function(a) {
                        return this.translate(a, !0)
                    }
                },
                k.xAxis.navigatorAxis.axis = k.xAxis,
                k.xAxis.navigatorAxis.toFixedRange = A.AdditionsClass.prototype.toFixedRange.bind(k.xAxis.navigatorAxis));
                a.options.scrollbar.enabled && (a.scrollbar = k.scrollbar = new p(a.renderer,q(a.options.scrollbar, {
                    margin: k.navigatorEnabled ? 0 : 10,
                    vertical: a.inverted
                }),a),
                y(k.scrollbar, "changed", function(a) {
                    var b = k.size
                      , c = b * this.to;
                    b *= this.from;
                    k.hasDragged = k.scrollbar.hasDragged;
                    k.render(0, 0, b, c);
                    this.shouldUpdateExtremes(a.DOMType) && setTimeout(function() {
                        k.onMouseUp(a)
                    })
                }));
                k.addBaseSeriesEvents();
                k.addChartEvents()
            }
            ;
            b.prototype.getUnionExtremes = function(a) {
                var b = this.chart.xAxis[0], c = this.xAxis, e = c.options, d = b.options, f;
                a && null === b.dataMin || (f = {
                    dataMin: I(e && e.min, m("min", d.min, b.dataMin, c.dataMin, c.min)),
                    dataMax: I(e && e.max, m("max", d.max, b.dataMax, c.dataMax, c.max))
                });
                return f
            }
            ;
            b.prototype.setBaseSeries = function(a, b) {
                var c = this.chart
                  , d = this.baseSeries = [];
                a = a || c.options && c.options.navigator.baseSeries || (c.series.length ? e(c.series, function(a) {
                    return !a.options.isInternal
                }).index : 0);
                (c.series || []).forEach(function(b, c) {
                    b.options.isInternal || !b.options.showInNavigator && (c !== a && b.options.id !== a || !1 === b.options.showInNavigator) || d.push(b)
                });
                this.xAxis && !this.xAxis.navigatorAxis.fake && this.updateNavigatorSeries(!0, b)
            }
            ;
            b.prototype.updateNavigatorSeries = function(a, b) {
                var c = this, e = c.chart, d = c.baseSeries, f, h, g = c.navigatorOptions.series, m, k = {
                    enableMouseTracking: !1,
                    index: null,
                    linkedTo: null,
                    group: "nav",
                    padXAxis: !1,
                    xAxis: "navigator-x-axis",
                    yAxis: "navigator-y-axis",
                    showInLegend: !1,
                    stacking: void 0,
                    isInternal: !0,
                    states: {
                        inactive: {
                            opacity: 1
                        }
                    }
                }, l = c.series = (c.series || []).filter(function(a) {
                    var b = a.baseSeries;
                    return 0 > d.indexOf(b) ? (b && (C(b, "updatedData", c.updatedDataHandler),
                    delete b.navigatorSeries),
                    a.chart && a.destroy(),
                    !1) : !0
                });
                d && d.length && d.forEach(function(a) {
                    var u = a.navigatorSeries
                      , n = w({
                        color: a.color,
                        visible: a.visible
                    }, r(g) ? D.navigator.series : g);
                    u && !1 === c.navigatorOptions.adaptToUpdatedData || (k.name = "Navigator " + d.length,
                    f = a.options || {},
                    m = f.navigatorOptions || {},
                    n.dataLabels = z(n.dataLabels),
                    h = q(f, k, n, m),
                    h.pointRange = I(n.pointRange, m.pointRange, D.plotOptions[h.type || "line"].pointRange),
                    n = m.data || n.data,
                    c.hasNavigatorData = c.hasNavigatorData || !!n,
                    h.data = n || f.data && f.data.slice(0),
                    u && u.options ? u.update(h, b) : (a.navigatorSeries = e.initSeries(h),
                    a.navigatorSeries.baseSeries = a,
                    l.push(a.navigatorSeries)))
                });
                if (g.data && (!d || !d.length) || r(g))
                    c.hasNavigatorData = !1,
                    g = z(g),
                    g.forEach(function(a, b) {
                        k.name = "Navigator " + (l.length + 1);
                        h = q(D.navigator.series, {
                            color: e.series[b] && !e.series[b].options.isInternal && e.series[b].color || e.options.colors[b] || e.options.colors[0]
                        }, k, a);
                        h.data = a.data;
                        h.data && (c.hasNavigatorData = !0,
                        l.push(e.initSeries(h)))
                    });
                a && this.addBaseSeriesEvents()
            }
            ;
            b.prototype.addBaseSeriesEvents = function() {
                var a = this
                  , b = a.baseSeries || [];
                b[0] && b[0].xAxis && b[0].eventsToUnbind.push(y(b[0].xAxis, "foundExtremes", this.modifyBaseAxisExtremes));
                b.forEach(function(b) {
                    b.eventsToUnbind.push(y(b, "show", function() {
                        this.navigatorSeries && this.navigatorSeries.setVisible(!0, !1)
                    }));
                    b.eventsToUnbind.push(y(b, "hide", function() {
                        this.navigatorSeries && this.navigatorSeries.setVisible(!1, !1)
                    }));
                    !1 !== this.navigatorOptions.adaptToUpdatedData && b.xAxis && b.eventsToUnbind.push(y(b, "updatedData", this.updatedDataHandler));
                    b.eventsToUnbind.push(y(b, "remove", function() {
                        this.navigatorSeries && (B(a.series, this.navigatorSeries),
                        L(this.navigatorSeries.options) && this.navigatorSeries.remove(!1),
                        delete this.navigatorSeries)
                    }))
                }, this)
            }
            ;
            b.prototype.getBaseSeriesMin = function(a) {
                return this.baseSeries.reduce(function(a, b) {
                    return Math.min(a, b.xData ? b.xData[0] : a)
                }, a)
            }
            ;
            b.prototype.modifyNavigatorAxisExtremes = function() {
                var a = this.xAxis, b;
                "undefined" !== typeof a.getExtremes && (!(b = this.getUnionExtremes(!0)) || b.dataMin === a.min && b.dataMax === a.max || (a.min = b.dataMin,
                a.max = b.dataMax))
            }
            ;
            b.prototype.modifyBaseAxisExtremes = function() {
                var b = this.chart.navigator
                  , c = this.getExtremes()
                  , e = c.dataMin
                  , d = c.dataMax;
                c = c.max - c.min;
                var f = b.stickToMin
                  , g = b.stickToMax
                  , m = I(this.options.overscroll, 0)
                  , k = b.series && b.series[0]
                  , l = !!this.setExtremes;
                if (!this.eventArgs || "rangeSelectorButton" !== this.eventArgs.trigger) {
                    if (f) {
                        var n = e;
                        var q = n + c
                    }
                    g && (q = d + m,
                    f || (n = Math.max(e, q - c, b.getBaseSeriesMin(k && k.xData ? k.xData[0] : -Number.MAX_VALUE))));
                    l && (f || g) && a(n) && (this.min = this.userMin = n,
                    this.max = this.userMax = q)
                }
                b.stickToMin = b.stickToMax = null
            }
            ;
            b.prototype.updatedDataHandler = function() {
                var a = this.chart.navigator
                  , b = this.navigatorSeries;
                a.stickToMax = a.reversedExtremes ? 0 === Math.round(a.zoomedMin) : Math.round(a.zoomedMax) >= Math.round(a.size);
                a.stickToMin = a.shouldStickToMin(this, a);
                b && !a.hasNavigatorData && (b.options.pointStart = this.xData[0],
                b.setData(this.options.data, !1, null, !1))
            }
            ;
            b.prototype.shouldStickToMin = function(b, c) {
                c = c.getBaseSeriesMin(b.xData[0]);
                var e = b.xAxis;
                b = e.max;
                var d = e.min;
                e = e.options.range;
                var f = !0;
                a(b) && a(d) && (f = e && 0 < b - c ? b - c < e && !this.chart.fixedRange : d <= c);
                return f
            }
            ;
            b.prototype.addChartEvents = function() {
                this.eventsToUnbind || (this.eventsToUnbind = []);
                this.eventsToUnbind.push(y(this.chart, "redraw", function() {
                    var a = this.navigator
                      , b = a && (a.baseSeries && a.baseSeries[0] && a.baseSeries[0].xAxis || this.xAxis[0]);
                    b && a.render(b.min, b.max)
                }), y(this.chart, "getMargins", function() {
                    var a = this.navigator
                      , b = a.opposite ? "plotTop" : "marginBottom";
                    this.inverted && (b = a.opposite ? "marginRight" : "plotLeft");
                    this[b] = (this[b] || 0) + (a.navigatorEnabled || !this.inverted ? a.outlineHeight : 0) + a.navigatorOptions.margin
                }))
            }
            ;
            b.prototype.destroy = function() {
                this.removeEvents();
                this.xAxis && (B(this.chart.xAxis, this.xAxis),
                B(this.chart.axes, this.xAxis));
                this.yAxis && (B(this.chart.yAxis, this.yAxis),
                B(this.chart.axes, this.yAxis));
                (this.series || []).forEach(function(a) {
                    a.destroy && a.destroy()
                });
                "series xAxis yAxis shades outline scrollbarTrack scrollbarRifles scrollbarGroup scrollbar navigatorGroup rendered".split(" ").forEach(function(a) {
                    this[a] && this[a].destroy && this[a].destroy();
                    this[a] = null
                }, this);
                [this.handles].forEach(function(a) {
                    M(a)
                }, this)
            }
            ;
            return b
        }();
        H.Navigator || (H.Navigator = f,
        A.compose(c),
        y(x, "beforeShowResetZoom", function() {
            var a = this.options
              , b = a.navigator
              , c = a.rangeSelector;
            if ((b && b.enabled || c && c.enabled) && (!n && "x" === a.chart.zoomType || n && "x" === a.chart.pinchType))
                return !1
        }),
        y(x, "beforeRender", function() {
            var a = this.options;
            if (a.navigator.enabled || a.scrollbar.enabled)
                this.scroller = this.navigator = new f(this)
        }),
        y(x, "afterSetChartSize", function() {
            var a = this.legend
              , b = this.navigator;
            if (b) {
                var c = a && a.options;
                var e = b.xAxis;
                var d = b.yAxis;
                var f = b.scrollbarHeight;
                this.inverted ? (b.left = b.opposite ? this.chartWidth - f - b.height : this.spacing[3] + f,
                b.top = this.plotTop + f) : (b.left = I(e.left, this.plotLeft + f),
                b.top = b.navigatorOptions.top || this.chartHeight - b.height - f - this.spacing[2] - (this.rangeSelector && this.extraBottomMargin ? this.rangeSelector.getHeight() : 0) - (c && "bottom" === c.verticalAlign && "proximate" !== c.layout && c.enabled && !c.floating ? a.legendHeight + I(c.margin, 10) : 0) - (this.titleOffset ? this.titleOffset[2] : 0));
                e && d && (this.inverted ? e.options.left = d.options.left = b.left : e.options.top = d.options.top = b.top,
                e.setAxisSize(),
                d.setAxisSize())
            }
        }),
        y(x, "update", function(a) {
            var b = a.options.navigator || {}
              , c = a.options.scrollbar || {};
            this.navigator || this.scroller || !b.enabled && !c.enabled || (q(!0, this.options.navigator, b),
            q(!0, this.options.scrollbar, c),
            delete a.options.navigator,
            delete a.options.scrollbar)
        }),
        y(x, "afterUpdate", function(a) {
            this.navigator || this.scroller || !this.options.navigator.enabled && !this.options.scrollbar.enabled || (this.scroller = this.navigator = new f(this),
            I(a.redraw, !0) && this.redraw(a.animation))
        }),
        y(x, "afterAddSeries", function() {
            this.navigator && this.navigator.setBaseSeries(null, !1)
        }),
        y(d, "afterUpdate", function() {
            this.chart.navigator && !this.options.isInternal && this.chart.navigator.setBaseSeries(null, !1)
        }),
        x.prototype.callbacks.push(function(a) {
            var b = a.navigator;
            b && a.xAxis[0] && (a = a.xAxis[0].getExtremes(),
            b.render(a.min, a.max))
        }));
        H.Navigator = f;
        return H.Navigator
    });
    P(c, "Core/Axis/OrdinalAxis.js", [c["Core/Axis/Axis.js"], c["Core/Chart/Chart.js"], c["Core/Globals.js"], c["Core/Series/Series.js"], c["Core/Utilities.js"]], function(c, x, E, H, A) {
        var n = A.addEvent, G = A.correctFloat, J = A.css, p = A.defined, d = A.error, l = A.pick, b = A.timeUnits, g;
        (function(c) {
            var g = function() {
                function b(b) {
                    this.index = {};
                    this.axis = b
                }
                b.prototype.beforeSetTickPositions = function() {
                    var b = this.axis, c = b.ordinal, d = [], g, n = !1, p = b.getExtremes(), e = p.min, r = p.max, a, q = b.isXAxis && !!b.options.breaks;
                    p = b.options.ordinal;
                    var y = Number.MAX_VALUE, C = b.chart.options.chart.ignoreHiddenSeries, z;
                    if (p || q) {
                        b.series.forEach(function(a, b) {
                            g = [];
                            if (!(C && !1 === a.visible || !1 === a.takeOrdinalPosition && !q) && (d = d.concat(a.processedXData),
                            m = d.length,
                            d.sort(function(a, b) {
                                return a - b
                            }),
                            y = Math.min(y, l(a.closestPointRange, y)),
                            m)) {
                                for (b = 0; b < m - 1; )
                                    d[b] !== d[b + 1] && g.push(d[b + 1]),
                                    b++;
                                g[0] !== d[0] && g.unshift(d[0]);
                                d = g
                            }
                            a.isSeriesBoosting && (z = !0)
                        });
                        z && (d.length = 0);
                        var m = d.length;
                        if (2 < m) {
                            var f = d[1] - d[0];
                            for (a = m - 1; a-- && !n; )
                                d[a + 1] - d[a] !== f && (n = !0);
                            !b.options.keepOrdinalPadding && (d[0] - e > f || r - d[d.length - 1] > f) && (n = !0)
                        } else
                            b.options.overscroll && (2 === m ? y = d[1] - d[0] : 1 === m ? (y = b.options.overscroll,
                            d = [d[0], d[0] + y]) : y = c.overscrollPointsRange);
                        n || b.forceOrdinal ? (b.options.overscroll && (c.overscrollPointsRange = y,
                        d = d.concat(c.getOverscrollPositions())),
                        c.positions = d,
                        f = b.ordinal2lin(Math.max(e, d[0]), !0),
                        a = Math.max(b.ordinal2lin(Math.min(r, d[d.length - 1]), !0), 1),
                        c.slope = r = (r - e) / (a - f),
                        c.offset = e - f * r) : (c.overscrollPointsRange = l(b.closestPointRange, c.overscrollPointsRange),
                        c.positions = b.ordinal.slope = c.offset = void 0)
                    }
                    b.isOrdinal = p && n;
                    c.groupIntervalFactor = null
                }
                ;
                b.findIndexOf = function(b, c, d) {
                    for (var g = 0, k = b.length - 1, l; g <= k; ) {
                        l = Math.floor((g + k) / 2);
                        if (b[l] === c)
                            return l;
                        b[l] < c ? g = l + 1 : k = l - 1
                    }
                    return d ? l : -1
                }
                ;
                b.prototype.getExtendedPositions = function() {
                    var b = this, c = b.axis, d = c.constructor.prototype, g = c.chart, l = c.series[0].currentDataGrouping, n = b.index, e = l ? l.count + l.unitName : "raw", p = c.options.overscroll, a = c.getExtremes(), q;
                    n || (n = b.index = {});
                    if (!n[e]) {
                        var y = {
                            series: [],
                            chart: g,
                            forceOrdinal: !1,
                            getExtremes: function() {
                                return {
                                    min: a.dataMin,
                                    max: a.dataMax + p
                                }
                            },
                            getGroupPixelWidth: d.getGroupPixelWidth,
                            getTimeTicks: d.getTimeTicks,
                            options: {
                                ordinal: !0
                            },
                            ordinal: {
                                getGroupIntervalFactor: this.getGroupIntervalFactor
                            },
                            ordinal2lin: d.ordinal2lin,
                            val2lin: d.val2lin
                        };
                        y.ordinal.axis = y;
                        c.series.forEach(function(a) {
                            q = {
                                xAxis: y,
                                xData: a.xData.slice(),
                                chart: g,
                                destroyGroupedData: E.noop,
                                getProcessedData: H.prototype.getProcessedData
                            };
                            q.xData = q.xData.concat(b.getOverscrollPositions());
                            q.options = {
                                dataGrouping: l ? {
                                    enabled: !0,
                                    forced: !0,
                                    approximation: "open",
                                    units: [[l.unitName, [l.count]]]
                                } : {
                                    enabled: !1
                                }
                            };
                            y.series.push(q);
                            a.processData.apply(q);
                            q.closestPointRange !== q.basePointRange && q.currentDataGrouping && (y.forceOrdinal = !0)
                        });
                        c.ordinal.beforeSetTickPositions.apply({
                            axis: y
                        });
                        n[e] = y.ordinal.positions
                    }
                    return n[e]
                }
                ;
                b.prototype.getGroupIntervalFactor = function(b, c, d) {
                    d = d.processedXData;
                    var g = d.length
                      , k = [];
                    var l = this.groupIntervalFactor;
                    if (!l) {
                        for (l = 0; l < g - 1; l++)
                            k[l] = d[l + 1] - d[l];
                        k.sort(function(b, c) {
                            return b - c
                        });
                        k = k[Math.floor(g / 2)];
                        b = Math.max(b, d[0]);
                        c = Math.min(c, d[g - 1]);
                        this.groupIntervalFactor = l = g * k / (c - b)
                    }
                    return l
                }
                ;
                b.prototype.getIndexOfPoint = function(c, d) {
                    var g = this.axis;
                    c = (c - (this.slope ? this.slope * g.transA : 0)) / (g.translationSlope * (this.slope || g.closestPointRange || this.overscrollPointsRange));
                    return b.findIndexOf(d, this.positions ? this.positions[0] : 0) + c
                }
                ;
                b.prototype.getOverscrollPositions = function() {
                    var b = this.axis
                      , c = b.options.overscroll
                      , d = this.overscrollPointsRange
                      , g = []
                      , l = b.dataMax;
                    if (p(d))
                        for (g.push(l); l <= b.dataMax + c; )
                            l += d,
                            g.push(l);
                    return g
                }
                ;
                b.prototype.postProcessTickInterval = function(b) {
                    var c = this.axis
                      , d = this.slope;
                    return d ? c.options.breaks ? c.closestPointRange || b : b / (d / c.closestPointRange) : b
                }
                ;
                return b
            }();
            c.Composition = g;
            c.compose = function(g, l, k) {
                g.keepProps.push("ordinal");
                var v = g.prototype;
                g.prototype.getTimeTicks = function(c, g, l, e, k, a, n) {
                    void 0 === k && (k = []);
                    void 0 === a && (a = 0);
                    var q = 0, w, r, m = {}, f = [], v = -Number.MAX_VALUE, h = this.options.tickPixelInterval, u = this.chart.time, y = [];
                    if (!this.options.ordinal && !this.options.breaks || !k || 3 > k.length || "undefined" === typeof g)
                        return u.getTimeTicks.apply(u, arguments);
                    var B = k.length;
                    for (w = 0; w < B; w++) {
                        var t = w && k[w - 1] > l;
                        k[w] < g && (q = w);
                        if (w === B - 1 || k[w + 1] - k[w] > 5 * a || t) {
                            if (k[w] > v) {
                                for (r = u.getTimeTicks(c, k[q], k[w], e); r.length && r[0] <= v; )
                                    r.shift();
                                r.length && (v = r[r.length - 1]);
                                y.push(f.length);
                                f = f.concat(r)
                            }
                            q = w + 1
                        }
                        if (t)
                            break
                    }
                    if (r) {
                        r = r.info;
                        if (n && r.unitRange <= b.hour) {
                            w = f.length - 1;
                            for (q = 1; q < w; q++)
                                if (u.dateFormat("%d", f[q]) !== u.dateFormat("%d", f[q - 1])) {
                                    m[f[q]] = "day";
                                    var x = !0
                                }
                            x && (m[f[0]] = "day");
                            r.higherRanks = m
                        }
                        r.segmentStarts = y;
                        f.info = r
                    } else
                        d(12, !1, this.chart);
                    if (n && p(h)) {
                        q = r = f.length;
                        x = [];
                        u = void 0;
                        for (y = []; q--; )
                            w = this.translate(f[q]),
                            u && (y[q] = u - w),
                            x[q] = u = w;
                        y.sort();
                        y = y[Math.floor(y.length / 2)];
                        y < .6 * h && (y = null);
                        q = f[r - 1] > l ? r - 1 : r;
                        for (u = void 0; q--; )
                            w = x[q],
                            r = Math.abs(u - w),
                            u && r < .8 * h && (null === y || r < .8 * y) ? (m[f[q]] && !m[f[q + 1]] ? (r = q + 1,
                            u = w) : r = q,
                            f.splice(r, 1)) : u = w
                    }
                    return f
                }
                ;
                v.index2val = function(b) {
                    var c = this.ordinal.positions;
                    if (!c)
                        return b;
                    var d = c.length - 1;
                    if (0 > b)
                        b = c[0];
                    else if (b > d)
                        b = c[d];
                    else {
                        d = Math.floor(b);
                        var e = b - d
                    }
                    return "undefined" !== typeof e && "undefined" !== typeof c[d] ? c[d] + (e ? e * (c[d + 1] - c[d]) : 0) : b
                }
                ;
                v.lin2val = function(b) {
                    var c = this.ordinal
                      , d = c.positions;
                    if (!d)
                        return b;
                    var e = (b - (this.old ? this.old.min : this.min)) * (this.old ? this.old.transA : this.transA);
                    b > this.left && b < this.left + this.len || (c.extendedOrdinalPositions || (c.extendedOrdinalPositions = c.getExtendedPositions()),
                    d = c.extendedOrdinalPositions);
                    if (d && d.length) {
                        b = c.getIndexOfPoint(e, d);
                        c = G(b % 1);
                        if (0 <= b && b < d.length)
                            return d[Math.floor(b)] + c * (d[Math.ceil(b)] - d[Math.floor(b)]);
                        c = d.length;
                        e = d[0];
                        d = d[c - 1];
                        var g = (d - e) / (c - 1);
                        return 0 > b ? e + g * b : d + g * (b - c)
                    }
                    return b
                }
                ;
                v.val2lin = function(b, c) {
                    var d = this.ordinal
                      , e = d.positions;
                    if (e) {
                        var g = e.length, a, k = void 0;
                        for (a = g; a--; )
                            if (e[a] === b) {
                                k = a;
                                break
                            }
                        for (a = g - 1; a--; )
                            if (b > e[a] || 0 === a) {
                                b = (b - e[a]) / (e[a + 1] - e[a]);
                                k = a + b;
                                break
                            }
                        c = c ? k : d.slope * (k || 0) + d.offset
                    } else
                        c = b;
                    return c
                }
                ;
                v.ordinal2lin = v.val2lin;
                n(g, "afterInit", function() {
                    this.ordinal || (this.ordinal = new c.Composition(this))
                });
                n(g, "foundExtremes", function() {
                    this.isXAxis && p(this.options.overscroll) && this.max === this.dataMax && (!this.chart.mouseIsDown || this.isInternal) && (!this.eventArgs || this.eventArgs && "navigator" !== this.eventArgs.trigger) && (this.max += this.options.overscroll,
                    !this.isInternal && p(this.userMin) && (this.min += this.options.overscroll))
                });
                n(g, "afterSetScale", function() {
                    this.horiz && !this.isDirty && (this.isDirty = this.isOrdinal && this.chart.navigator && !this.chart.navigator.adaptToUpdatedData)
                });
                n(g, "initialAxisTranslation", function() {
                    this.ordinal && (this.ordinal.beforeSetTickPositions(),
                    this.tickInterval = this.ordinal.postProcessTickInterval(this.tickInterval))
                });
                n(l, "pan", function(b) {
                    var c = this.xAxis[0]
                      , d = c.options.overscroll
                      , e = b.originalEvent.chartX
                      , g = this.options.chart.panning
                      , a = !1;
                    if (g && "y" !== g.type && c.options.ordinal && c.series.length) {
                        var k = this.mouseDownX
                          , l = c.getExtremes()
                          , n = l.dataMax
                          , p = l.min
                          , m = l.max
                          , f = void 0;
                        f = this.hoverPoints;
                        var v = c.closestPointRange || c.ordinal && c.ordinal.overscrollPointsRange;
                        k = (k - e) / (c.translationSlope * (c.ordinal.slope || v));
                        v = {
                            ordinal: {
                                positions: c.ordinal.getExtendedPositions()
                            }
                        };
                        var h = void 0
                          , u = void 0
                          , y = c.index2val
                          , x = c.val2lin
                          , t = void 0;
                        v.ordinal.positions ? 1 < Math.abs(k) && (f && f.forEach(function(a) {
                            a.setState()
                        }),
                        0 > k ? (u = v,
                        t = c.ordinal.positions ? c : v) : (u = c.ordinal.positions ? c : v,
                        t = v),
                        h = t.ordinal.positions,
                        n > h[h.length - 1] && h.push(n),
                        this.fixedRange = m - p,
                        f = c.navigatorAxis.toFixedRange(null, null, y.apply(u, [x.apply(u, [p, !0]) + k]), y.apply(t, [x.apply(t, [m, !0]) + k])),
                        f.min >= Math.min(l.dataMin, p) && f.max <= Math.max(n, m) + d && c.setExtremes(f.min, f.max, !0, !1, {
                            trigger: "pan"
                        }),
                        this.mouseDownX = e,
                        J(this.container, {
                            cursor: "move"
                        })) : a = !0
                    } else
                        a = !0;
                    a || g && /y/.test(g.type) ? d && (c.max = c.dataMax + d) : b.preventDefault()
                });
                n(k, "updatedData", function() {
                    var b = this.xAxis;
                    b && b.options.ordinal && delete b.ordinal.index
                })
            }
        }
        )(g || (g = {}));
        g.compose(c, x, H);
        return g
    });
    P(c, "Core/Axis/BrokenAxis.js", [c["Core/Axis/Axis.js"], c["Core/Series/Series.js"], c["Extensions/Stacking.js"], c["Core/Utilities.js"]], function(c, x, E, H) {
        var n = H.addEvent, F = H.find, G = H.fireEvent, J = H.isArray, p = H.isNumber, d = H.pick, l;
        (function(b) {
            function g() {
                "undefined" !== typeof this.brokenAxis && this.brokenAxis.setBreaks(this.options.breaks, !1)
            }
            function l() {
                this.brokenAxis && this.brokenAxis.hasBreaks && (this.options.ordinal = !1)
            }
            function A() {
                var b = this.brokenAxis;
                if (b && b.hasBreaks) {
                    for (var c = this.tickPositions, d = this.tickPositions.info, a = [], g = 0; g < c.length; g++)
                        b.isInAnyBreak(c[g]) || a.push(c[g]);
                    this.tickPositions = a;
                    this.tickPositions.info = d
                }
            }
            function y() {
                this.brokenAxis || (this.brokenAxis = new B(this))
            }
            function v() {
                var b = this.options.connectNulls
                  , c = this.points
                  , d = this.xAxis
                  , a = this.yAxis;
                if (this.isDirty)
                    for (var g = c.length; g--; ) {
                        var k = c[g]
                          , l = !(null === k.y && !1 === b) && (d && d.brokenAxis && d.brokenAxis.isInAnyBreak(k.x, !0) || a && a.brokenAxis && a.brokenAxis.isInAnyBreak(k.y, !0));
                        k.visible = l ? !1 : !1 !== k.options.visible
                    }
            }
            function k() {
                this.drawBreaks(this.xAxis, ["x"]);
                this.drawBreaks(this.yAxis, d(this.pointArrayMap, ["y"]))
            }
            function H(b, c) {
                var e = this, a = e.points, g, k, l, n;
                if (b && b.brokenAxis && b.brokenAxis.hasBreaks) {
                    var m = b.brokenAxis;
                    c.forEach(function(c) {
                        g = m && m.breakArray || [];
                        k = b.isXAxis ? b.min : d(e.options.threshold, b.min);
                        a.forEach(function(a) {
                            n = d(a["stack" + c.toUpperCase()], a[c]);
                            g.forEach(function(c) {
                                if (p(k) && p(n)) {
                                    l = !1;
                                    if (k < c.from && n > c.to || k > c.from && n < c.from)
                                        l = "pointBreak";
                                    else if (k < c.from && n > c.from && n < c.to || k > c.from && n > c.to && n < c.from)
                                        l = "pointInBreak";
                                    l && G(b, l, {
                                        point: a,
                                        brk: c
                                    })
                                }
                            })
                        })
                    })
                }
            }
            function M() {
                var b = this.currentDataGrouping
                  , c = b && b.gapSize;
                b = this.points.slice();
                var d = this.yAxis, a = this.options.gapSize, g = b.length - 1, k;
                if (a && 0 < g)
                    for ("value" !== this.options.gapUnit && (a *= this.basePointRange),
                    c && c > a && c >= this.basePointRange && (a = c),
                    k = void 0; g--; )
                        k && !1 !== k.visible || (k = b[g + 1]),
                        c = b[g],
                        !1 !== k.visible && !1 !== c.visible && (k.x - c.x > a && (k = (c.x + k.x) / 2,
                        b.splice(g + 1, 0, {
                            isNull: !0,
                            x: k
                        }),
                        d.stacking && this.options.stacking && (k = d.stacking.stacks[this.stackKey][k] = new E(d,d.options.stackLabels,!1,k,this.stack),
                        k.total = 0)),
                        k = c);
                return this.getGraphPath(b)
            }
            b.compose = function(b, c) {
                if (-1 === b.keepProps.indexOf("brokenAxis")) {
                    b.keepProps.push("brokenAxis");
                    var d = x.prototype;
                    d.drawBreaks = H;
                    d.gappedPath = M;
                    n(b, "init", y);
                    n(b, "afterInit", g);
                    n(b, "afterSetTickPositions", A);
                    n(b, "afterSetOptions", l);
                    n(c, "afterGeneratePoints", v);
                    n(c, "afterRender", k)
                }
                return b
            }
            ;
            var B = function() {
                function b(b) {
                    this.hasBreaks = !1;
                    this.axis = b
                }
                b.isInBreak = function(b, c) {
                    var a = b.repeat || Infinity
                      , d = b.from
                      , e = b.to - b.from;
                    c = c >= d ? (c - d) % a : a - (d - c) % a;
                    return b.inclusive ? c <= e : c < e && 0 !== c
                }
                ;
                b.lin2Val = function(c) {
                    var d = this.brokenAxis;
                    d = d && d.breakArray;
                    if (!d || !p(c))
                        return c;
                    var a;
                    for (a = 0; a < d.length; a++) {
                        var e = d[a];
                        if (e.from >= c)
                            break;
                        else
                            e.to < c ? c += e.len : b.isInBreak(e, c) && (c += e.len)
                    }
                    return c
                }
                ;
                b.val2Lin = function(c) {
                    var d = this.brokenAxis;
                    d = d && d.breakArray;
                    if (!d || !p(c))
                        return c;
                    var a = c, e;
                    for (e = 0; e < d.length; e++) {
                        var g = d[e];
                        if (g.to <= c)
                            a -= g.len;
                        else if (g.from >= c)
                            break;
                        else if (b.isInBreak(g, c)) {
                            a -= c - g.from;
                            break
                        }
                    }
                    return a
                }
                ;
                b.prototype.findBreakAt = function(b, c) {
                    return F(c, function(a) {
                        return a.from < b && b < a.to
                    })
                }
                ;
                b.prototype.isInAnyBreak = function(c, g) {
                    var a = this.axis, e = a.options.breaks || [], k = e.length, l;
                    if (k && p(c)) {
                        for (; k--; )
                            if (b.isInBreak(e[k], c)) {
                                var n = !0;
                                l || (l = d(e[k].showPoints, !a.isXAxis))
                            }
                        var m = n && g ? n && !l : n
                    }
                    return m
                }
                ;
                b.prototype.setBreaks = function(e, g) {
                    var a = this
                      , k = a.axis
                      , l = J(e) && !!e.length;
                    k.isDirty = a.hasBreaks !== l;
                    a.hasBreaks = l;
                    k.options.breaks = k.userOptions.breaks = e;
                    k.forceRedraw = !0;
                    k.series.forEach(function(a) {
                        a.isDirty = !0
                    });
                    l || k.val2lin !== b.val2Lin || (delete k.val2lin,
                    delete k.lin2val);
                    l && (k.userOptions.ordinal = !1,
                    k.lin2val = b.lin2Val,
                    k.val2lin = b.val2Lin,
                    k.setExtremes = function(b, d, e, f, g) {
                        if (a.hasBreaks) {
                            for (var h = this.options.breaks || [], m; m = a.findBreakAt(b, h); )
                                b = m.to;
                            for (; m = a.findBreakAt(d, h); )
                                d = m.from;
                            d < b && (d = b)
                        }
                        c.prototype.setExtremes.call(this, b, d, e, f, g)
                    }
                    ,
                    k.setAxisTranslation = function() {
                        c.prototype.setAxisTranslation.call(this);
                        a.unitLength = void 0;
                        if (a.hasBreaks) {
                            var e = k.options.breaks || [], g = [], m = [], f = d(k.pointRangePadding, 0), l = 0, h, u = k.userMin || k.min, n = k.userMax || k.max, q;
                            e.forEach(function(a) {
                                h = a.repeat || Infinity;
                                p(u) && p(n) && (b.isInBreak(a, u) && (u += a.to % h - u % h),
                                b.isInBreak(a, n) && (n -= n % h - a.from % h))
                            });
                            e.forEach(function(a) {
                                r = a.from;
                                h = a.repeat || Infinity;
                                if (p(u) && p(n)) {
                                    for (; r - h > u; )
                                        r -= h;
                                    for (; r < u; )
                                        r += h;
                                    for (q = r; q < n; q += h)
                                        g.push({
                                            value: q,
                                            move: "in"
                                        }),
                                        g.push({
                                            value: q + a.to - a.from,
                                            move: "out",
                                            size: a.breakSize
                                        })
                                }
                            });
                            g.sort(function(a, b) {
                                return a.value === b.value ? ("in" === a.move ? 0 : 1) - ("in" === b.move ? 0 : 1) : a.value - b.value
                            });
                            var t = 0;
                            var r = u;
                            g.forEach(function(a) {
                                t += "in" === a.move ? 1 : -1;
                                1 === t && "in" === a.move && (r = a.value);
                                0 === t && p(r) && (m.push({
                                    from: r,
                                    to: a.value,
                                    len: a.value - r - (a.size || 0)
                                }),
                                l += a.value - r - (a.size || 0))
                            });
                            a.breakArray = m;
                            p(u) && p(n) && p(k.min) && (a.unitLength = n - u - l + f,
                            G(k, "afterBreaks"),
                            k.staticScale ? k.transA = k.staticScale : a.unitLength && (k.transA *= (n - k.min + f) / a.unitLength),
                            f && (k.minPixelPadding = k.transA * (k.minPointOffset || 0)),
                            k.min = u,
                            k.max = n)
                        }
                    }
                    );
                    d(g, !0) && k.chart.redraw()
                }
                ;
                return b
            }();
            b.Additions = B
        }
        )(l || (l = {}));
        return l
    });
    P(c, "masters/modules/broken-axis.src.js", [c["Core/Globals.js"], c["Core/Axis/BrokenAxis.js"]], function(c, x) {
        x.compose(c.Axis, c.Series)
    });
    P(c, "Extensions/DataGrouping.js", [c["Core/Axis/Axis.js"], c["Core/Axis/DateTimeAxis.js"], c["Core/FormatUtilities.js"], c["Core/Globals.js"], c["Core/Series/Point.js"], c["Core/Series/Series.js"], c["Core/Tooltip.js"], c["Core/DefaultOptions.js"], c["Core/Utilities.js"]], function(c, x, E, H, A, F, G, J, p) {
        var d = E.format
          , l = F.prototype;
        E = p.addEvent;
        var b = p.arrayMax
          , g = p.arrayMin
          , n = p.correctFloat
          , D = p.defined
          , y = p.error
          , v = p.extend
          , k = p.isNumber
          , L = p.merge
          , M = p.pick;
        "";
        var B = H.approximations = {
            sum: function(a) {
                var b = a.length;
                if (!b && a.hasNulls)
                    var c = null;
                else if (b)
                    for (c = 0; b--; )
                        c += a[b];
                return c
            },
            average: function(a) {
                var b = a.length;
                a = B.sum(a);
                k(a) && b && (a = n(a / b));
                return a
            },
            averages: function() {
                var a = [];
                [].forEach.call(arguments, function(b) {
                    a.push(B.average(b))
                });
                return "undefined" === typeof a[0] ? void 0 : a
            },
            open: function(a) {
                return a.length ? a[0] : a.hasNulls ? null : void 0
            },
            high: function(a) {
                return a.length ? b(a) : a.hasNulls ? null : void 0
            },
            low: function(a) {
                return a.length ? g(a) : a.hasNulls ? null : void 0
            },
            close: function(a) {
                return a.length ? a[a.length - 1] : a.hasNulls ? null : void 0
            },
            ohlc: function(a, b, c, d) {
                a = B.open(a);
                b = B.high(b);
                c = B.low(c);
                d = B.close(d);
                if (k(a) || k(b) || k(c) || k(d))
                    return [a, b, c, d]
            },
            range: function(a, b) {
                a = B.low(a);
                b = B.high(b);
                if (k(a) || k(b))
                    return [a, b];
                if (null === a && null === b)
                    return null
            }
        };
        p = function(a, b, c, d) {
            var e = this, f = e.data, g = e.options && e.options.data, m = [], l = [], n = [], p = a.length, q = !!b, r = [], w = e.pointArrayMap, v = w && w.length, z = ["x"].concat(w || ["y"]), y = this.options.dataGrouping && this.options.dataGrouping.groupAll, x = 0, A = 0, C;
            d = "function" === typeof d ? d : B[d] ? B[d] : B[e.getDGApproximation && e.getDGApproximation() || "average"];
            v ? w.forEach(function() {
                r.push([])
            }) : r.push([]);
            var G = v || 1;
            for (C = 0; C <= p && !(a[C] >= c[0]); C++)
                ;
            for (C; C <= p; C++) {
                for (; "undefined" !== typeof c[x + 1] && a[C] >= c[x + 1] || C === p; ) {
                    var F = c[x];
                    e.dataGroupInfo = {
                        start: y ? A : e.cropStart + A,
                        length: r[0].length
                    };
                    var E = d.apply(e, r);
                    e.pointClass && !D(e.dataGroupInfo.options) && (e.dataGroupInfo.options = L(e.pointClass.prototype.optionsToObject.call({
                        series: e
                    }, e.options.data[e.cropStart + A])),
                    z.forEach(function(a) {
                        delete e.dataGroupInfo.options[a]
                    }));
                    "undefined" !== typeof E && (m.push(F),
                    l.push(E),
                    n.push(e.dataGroupInfo));
                    A = C;
                    for (F = 0; F < G; F++)
                        r[F].length = 0,
                        r[F].hasNulls = !1;
                    x += 1;
                    if (C === p)
                        break
                }
                if (C === p)
                    break;
                if (w) {
                    F = e.options.dataGrouping && e.options.dataGrouping.groupAll ? C : e.cropStart + C;
                    E = f && f[F] || e.pointClass.prototype.applyOptions.apply({
                        series: e
                    }, [g[F]]);
                    var H = void 0;
                    for (F = 0; F < v; F++)
                        H = E[w[F]],
                        k(H) ? r[F].push(H) : null === H && (r[F].hasNulls = !0)
                } else
                    F = q ? b[C] : null,
                    k(F) ? r[0].push(F) : null === F && (r[0].hasNulls = !0)
            }
            return {
                groupedXData: m,
                groupedYData: l,
                groupMap: n
            }
        }
        ;
        var w = {
            approximations: B,
            groupData: p
        }
          , e = l.processData
          , r = l.generatePoints
          , a = {
            groupPixelWidth: 2,
            dateTimeLabelFormats: {
                millisecond: ["%A, %b %e, %H:%M:%S.%L", "%A, %b %e, %H:%M:%S.%L", "-%H:%M:%S.%L"],
                second: ["%A, %b %e, %H:%M:%S", "%A, %b %e, %H:%M:%S", "-%H:%M:%S"],
                minute: ["%A, %b %e, %H:%M", "%A, %b %e, %H:%M", "-%H:%M"],
                hour: ["%A, %b %e, %H:%M", "%A, %b %e, %H:%M", "-%H:%M"],
                day: ["%A, %b %e, %Y", "%A, %b %e", "-%A, %b %e, %Y"],
                week: ["Week from %A, %b %e, %Y", "%A, %b %e", "-%A, %b %e, %Y"],
                month: ["%B %Y", "%B", "-%B %Y"],
                year: ["%Y", "%Y", "-%Y"]
            }
        }
          , q = {
            line: {},
            spline: {},
            area: {},
            areaspline: {},
            arearange: {},
            column: {
                groupPixelWidth: 10
            },
            columnrange: {
                groupPixelWidth: 10
            },
            candlestick: {
                groupPixelWidth: 10
            },
            ohlc: {
                groupPixelWidth: 5
            }
        }
          , I = H.defaultDataGroupingUnits = [["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]], ["second", [1, 2, 5, 10, 15, 30]], ["minute", [1, 2, 5, 10, 15, 30]], ["hour", [1, 2, 3, 4, 6, 8, 12]], ["day", [1]], ["week", [1]], ["month", [1, 3, 6]], ["year", null]];
        l.getDGApproximation = function() {
            return this.is("arearange") ? "range" : this.is("ohlc") ? "ohlc" : this.is("column") ? "sum" : "average"
        }
        ;
        l.groupData = p;
        l.processData = function() {
            var a = this.chart, b = this.options.dataGrouping, c = !1 !== this.allowDG && b && M(b.enabled, a.options.isStock), d = this.visible || !a.options.chart.ignoreHiddenSeries, g, h = this.currentDataGrouping, u = !1;
            this.forceCrop = c;
            this.groupPixelWidth = null;
            this.hasProcessed = !0;
            c && !this.requireSorting && (this.requireSorting = u = !0);
            c = !1 === e.apply(this, arguments) || !c;
            u && (this.requireSorting = !1);
            if (!c) {
                this.destroyGroupedData();
                var n = b.groupAll ? this.xData : this.processedXData
                  , p = b.groupAll ? this.yData : this.processedYData;
                c = a.plotSizeX;
                u = this.xAxis;
                var t = u.options.ordinal
                  , q = this.groupPixelWidth = u.getGroupPixelWidth && u.getGroupPixelWidth();
                if (q && n && n.length) {
                    this.isDirty = g = !0;
                    this.points = null;
                    var r = u.getExtremes();
                    var w = r.min;
                    r = r.max;
                    t = t && u.ordinal && u.ordinal.getGroupIntervalFactor(w, r, this) || 1;
                    c = u.getTimeTicks(x.AdditionsClass.prototype.normalizeTimeTickInterval(q * (r - w) / c * t, b.units || I), Math.min(w, n[0]), Math.max(r, n[n.length - 1]), u.options.startOfWeek, n, this.closestPointRange);
                    q = l.groupData.apply(this, [n, p, c, b.approximation]);
                    n = q.groupedXData;
                    p = q.groupedYData;
                    t = 0;
                    b && b.smoothed && n.length && (b.firstAnchor = "firstPoint",
                    b.anchor = "middle",
                    b.lastAnchor = "lastPoint",
                    y(32, !1, a, {
                        "dataGrouping.smoothed": "use dataGrouping.anchor"
                    }));
                    a = n;
                    var v = this.options.dataGrouping;
                    w = this.currentDataGrouping && this.currentDataGrouping.gapSize;
                    if (v && this.xData && w && this.groupMap) {
                        var A = a.length - 1;
                        var B = v.anchor;
                        var F = M(v.firstAnchor, B);
                        v = M(v.lastAnchor, B);
                        if (B && "start" !== B) {
                            var G = w * {
                                middle: .5,
                                end: 1
                            }[B];
                            for (B = a.length - 1; B-- && 0 < B; )
                                a[B] += G
                        }
                        if (F && "start" !== F && this.xData[0] >= a[0]) {
                            B = this.groupMap[0].start;
                            G = this.groupMap[0].length;
                            var E = void 0;
                            k(B) && k(G) && (E = B + (G - 1));
                            a[0] = {
                                middle: a[0] + .5 * w,
                                end: a[0] + w,
                                firstPoint: this.xData[0],
                                lastPoint: E && this.xData[E]
                            }[F]
                        }
                        v && "start" !== v && w && a[A] >= r - w && (r = this.groupMap[this.groupMap.length - 1].start,
                        a[A] = {
                            middle: a[A] + .5 * w,
                            end: a[A] + w,
                            firstPoint: r && this.xData[r],
                            lastPoint: this.xData[this.xData.length - 1]
                        }[v])
                    }
                    for (r = 1; r < c.length; r++)
                        c.info.segmentStarts && -1 !== c.info.segmentStarts.indexOf(r) || (t = Math.max(c[r] - c[r - 1], t));
                    r = c.info;
                    r.gapSize = t;
                    this.closestPointRange = c.info.totalRange;
                    this.groupMap = q.groupMap;
                    if (d) {
                        d = n;
                        if (D(d[0]) && k(u.min) && k(u.dataMin) && d[0] < u.min) {
                            if (!D(u.options.min) && u.min <= u.dataMin || u.min === u.dataMin)
                                u.min = Math.min(d[0], u.min);
                            u.dataMin = Math.min(d[0], u.dataMin)
                        }
                        if (D(d[d.length - 1]) && k(u.max) && k(u.dataMax) && d[d.length - 1] > u.max) {
                            if (!D(u.options.max) && k(u.dataMax) && u.max >= u.dataMax || u.max === u.dataMax)
                                u.max = Math.max(d[d.length - 1], u.max);
                            u.dataMax = Math.max(d[d.length - 1], u.dataMax)
                        }
                    }
                    b.groupAll && (b = this.cropData(n, p, u.min, u.max, 1),
                    n = b.xData,
                    p = b.yData,
                    this.cropStart = b.start);
                    this.processedXData = n;
                    this.processedYData = p
                } else
                    this.groupMap = null;
                this.hasGroupedData = g;
                this.currentDataGrouping = r;
                this.preventGraphAnimation = (h && h.totalRange) !== (r && r.totalRange)
            }
        }
        ;
        l.destroyGroupedData = function() {
            this.groupedData && (this.groupedData.forEach(function(a, b) {
                a && (this.groupedData[b] = a.destroy ? a.destroy() : null)
            }, this),
            this.groupedData.length = 0)
        }
        ;
        l.generatePoints = function() {
            r.apply(this);
            this.destroyGroupedData();
            this.groupedData = this.hasGroupedData ? this.points : null
        }
        ;
        E(A, "update", function() {
            if (this.dataGroup)
                return y(24, !1, this.series.chart),
                !1
        });
        E(G, "headerFormatter", function(b) {
            var c = this.chart
              , e = c.time
              , f = b.labelConfig
              , g = f.series
              , h = g.tooltipOptions
              , l = g.options.dataGrouping
              , n = h.xDateFormat
              , p = g.xAxis
              , t = h[(b.isFooter ? "footer" : "header") + "Format"];
            if (p && "datetime" === p.options.type && l && k(f.key)) {
                var q = g.currentDataGrouping;
                l = l.dateTimeLabelFormats || a.dateTimeLabelFormats;
                if (q)
                    if (h = l[q.unitName],
                    1 === q.count)
                        n = h[0];
                    else {
                        n = h[1];
                        var r = h[2]
                    }
                else
                    !n && l && (n = this.getXDateFormat(f, h, p));
                n = e.dateFormat(n, f.key);
                r && (n += e.dateFormat(r, f.key + q.totalRange - 1));
                g.chart.styledMode && (t = this.styledModeFormat(t));
                b.text = d(t, {
                    point: v(f.point, {
                        key: n
                    }),
                    series: g
                }, c);
                b.preventDefault()
            }
        });
        E(F, "destroy", l.destroyGroupedData);
        E(F, "afterSetOptions", function(b) {
            b = b.options;
            var c = this.type
              , d = this.chart.options.plotOptions
              , e = J.defaultOptions.plotOptions[c].dataGrouping
              , g = this.useCommonDataGrouping && a;
            if (q[c] || g) {
                e || (e = L(a, q[c]));
                var h = this.chart.rangeSelector;
                b.dataGrouping = L(g, e, d.series && d.series.dataGrouping, d[c].dataGrouping, this.userOptions.dataGrouping, !b.isInternal && h && k(h.selected) && h.buttonOptions[h.selected].dataGrouping)
            }
        });
        E(c, "afterSetScale", function() {
            this.series.forEach(function(a) {
                a.hasProcessed = !1
            })
        });
        c.prototype.getGroupPixelWidth = function() {
            var b = this.series, c = b.length, d, e = 0, g = !1, h;
            for (d = c; d--; )
                (h = b[d].options.dataGrouping) && (e = Math.max(e, M(h.groupPixelWidth, a.groupPixelWidth)));
            for (d = c; d--; )
                (h = b[d].options.dataGrouping) && b[d].hasProcessed && (c = (b[d].processedXData || b[d].data).length,
                b[d].groupPixelWidth || c > this.chart.plotSizeX / e || c && h.forced) && (g = !0);
            return g ? e : 0
        }
        ;
        c.prototype.setDataGrouping = function(a, b) {
            var d;
            b = M(b, !0);
            a || (a = {
                forced: !1,
                units: null
            });
            if (this instanceof c)
                for (d = this.series.length; d--; )
                    this.series[d].update({
                        dataGrouping: a
                    }, !1);
            else
                this.chart.options.series.forEach(function(b) {
                    b.dataGrouping = a
                }, !1);
            this.ordinal && (this.ordinal.slope = void 0);
            b && this.chart.redraw()
        }
        ;
        H.dataGrouping = w;
        "";
        return w
    });
    P(c, "Series/OHLC/OHLCPoint.js", [c["Core/Series/SeriesRegistry.js"]], function(c) {
        var n = this && this.__extends || function() {
            var c = function(n, x) {
                c = Object.setPrototypeOf || {
                    __proto__: []
                }instanceof Array && function(c, n) {
                    c.__proto__ = n
                }
                || function(c, n) {
                    for (var x in n)
                        n.hasOwnProperty(x) && (c[x] = n[x])
                }
                ;
                return c(n, x)
            };
            return function(n, x) {
                function A() {
                    this.constructor = n
                }
                c(n, x);
                n.prototype = null === x ? Object.create(x) : (A.prototype = x.prototype,
                new A)
            }
        }();
        return function(c) {
            function x() {
                var n = null !== c && c.apply(this, arguments) || this;
                n.close = void 0;
                n.high = void 0;
                n.low = void 0;
                n.open = void 0;
                n.options = void 0;
                n.plotClose = void 0;
                n.plotOpen = void 0;
                n.series = void 0;
                return n
            }
            n(x, c);
            x.prototype.getClassName = function() {
                return c.prototype.getClassName.call(this) + (this.open < this.close ? " highcharts-point-up" : " highcharts-point-down")
            }
            ;
            x.prototype.resolveUpColor = function() {
                this.open < this.close && !this.options.color && this.series.options.upColor && (this.color = this.series.options.upColor)
            }
            ;
            x.prototype.resolveColor = function() {
                c.prototype.resolveColor.call(this);
                this.resolveUpColor()
            }
            ;
            x.prototype.getZone = function() {
                var n = c.prototype.getZone.call(this);
                this.resolveUpColor();
                return n
            }
            ;
            return x
        }(c.seriesTypes.column.prototype.pointClass)
    });
    P(c, "Series/OHLC/OHLCSeries.js", [c["Series/OHLC/OHLCPoint.js"], c["Core/Series/SeriesRegistry.js"], c["Core/Utilities.js"]], function(c, x, E) {
        var n = this && this.__extends || function() {
            var c = function(n, d) {
                c = Object.setPrototypeOf || {
                    __proto__: []
                }instanceof Array && function(c, b) {
                    c.__proto__ = b
                }
                || function(c, b) {
                    for (var d in b)
                        b.hasOwnProperty(d) && (c[d] = b[d])
                }
                ;
                return c(n, d)
            };
            return function(n, d) {
                function l() {
                    this.constructor = n
                }
                c(n, d);
                n.prototype = null === d ? Object.create(d) : (l.prototype = d.prototype,
                new l)
            }
        }()
          , A = x.seriesTypes.column
          , F = E.extend
          , G = E.merge;
        E = function(c) {
            function p() {
                var d = null !== c && c.apply(this, arguments) || this;
                d.data = void 0;
                d.options = void 0;
                d.points = void 0;
                d.yData = void 0;
                return d
            }
            n(p, c);
            p.prototype.drawPoints = function() {
                var c = this
                  , l = c.chart
                  , b = function(b, c, d) {
                    var g = b[0];
                    b = b[1];
                    "number" === typeof g[2] && (g[2] = Math.max(d + c, g[2]));
                    "number" === typeof b[2] && (b[2] = Math.min(d - c, b[2]))
                };
                c.points.forEach(function(d) {
                    var g = d.graphic
                      , n = !g;
                    if ("undefined" !== typeof d.plotY) {
                        g || (d.graphic = g = l.renderer.path().add(c.group));
                        l.styledMode || g.attr(c.pointAttribs(d, d.selected && "select"));
                        var p = g.strokeWidth();
                        var v = p % 2 / 2;
                        var k = Math.round(d.plotX) - v;
                        var x = Math.round(d.shapeArgs.width / 2);
                        var A = [["M", k, Math.round(d.yBottom)], ["L", k, Math.round(d.plotHigh)]];
                        if (null !== d.open) {
                            var B = Math.round(d.plotOpen) + v;
                            A.push(["M", k, B], ["L", k - x, B]);
                            b(A, p / 2, B)
                        }
                        null !== d.close && (B = Math.round(d.plotClose) + v,
                        A.push(["M", k, B], ["L", k + x, B]),
                        b(A, p / 2, B));
                        g[n ? "attr" : "animate"]({
                            d: A
                        }).addClass(d.getClassName(), !0)
                    }
                })
            }
            ;
            p.prototype.init = function() {
                c.prototype.init.apply(this, arguments);
                this.options.stacking = void 0
            }
            ;
            p.prototype.pointAttribs = function(d, l) {
                l = c.prototype.pointAttribs.call(this, d, l);
                var b = this.options;
                delete l.fill;
                !d.options.color && b.upColor && d.open < d.close && (l.stroke = b.upColor);
                return l
            }
            ;
            p.prototype.toYData = function(c) {
                return [c.open, c.high, c.low, c.close]
            }
            ;
            p.prototype.translate = function() {
                var d = this
                  , l = d.yAxis
                  , b = !!d.modifyValue
                  , g = ["plotOpen", "plotHigh", "plotLow", "plotClose", "yBottom"];
                c.prototype.translate.apply(d);
                d.points.forEach(function(c) {
                    [c.open, c.high, c.low, c.close, c.low].forEach(function(n, p) {
                        null !== n && (b && (n = d.modifyValue(n)),
                        c[g[p]] = l.toPixels(n, !0))
                    });
                    c.tooltipPos[1] = c.plotHigh + l.pos - d.chart.plotTop
                })
            }
            ;
            p.defaultOptions = G(A.defaultOptions, {
                lineWidth: 1,
                tooltip: {
                    pointFormat: '<span style="color:{point.color}">\u25cf</span> <b> {series.name}</b><br/>Open: {point.open}<br/>High: {point.high}<br/>Low: {point.low}<br/>Close: {point.close}<br/>'
                },
                threshold: null,
                states: {
                    hover: {
                        lineWidth: 3
                    }
                },
                stickyTracking: !0
            });
            return p
        }(A);
        F(E.prototype, {
            animate: null,
            directTouch: !1,
            pointArrayMap: ["open", "high", "low", "close"],
            pointAttrToOptions: {
                stroke: "color",
                "stroke-width": "lineWidth"
            },
            pointValKey: "close"
        });
        E.prototype.pointClass = c;
        x.registerSeriesType("ohlc", E);
        "";
        return E
    });
    P(c, "Series/Candlestick/CandlestickSeries.js", [c["Core/DefaultOptions.js"], c["Core/Color/Palette.js"], c["Core/Series/SeriesRegistry.js"], c["Core/Utilities.js"]], function(c, x, E, H) {
        var n = this && this.__extends || function() {
            var c = function(d, b) {
                c = Object.setPrototypeOf || {
                    __proto__: []
                }instanceof Array && function(b, c) {
                    b.__proto__ = c
                }
                || function(b, c) {
                    for (var d in c)
                        c.hasOwnProperty(d) && (b[d] = c[d])
                }
                ;
                return c(d, b)
            };
            return function(d, b) {
                function g() {
                    this.constructor = d
                }
                c(d, b);
                d.prototype = null === b ? Object.create(b) : (g.prototype = b.prototype,
                new g)
            }
        }()
          , F = c.defaultOptions;
        c = E.seriesTypes;
        var G = c.column
          , J = c.ohlc
          , p = H.merge;
        H = function(c) {
            function d() {
                var b = null !== c && c.apply(this, arguments) || this;
                b.data = void 0;
                b.options = void 0;
                b.points = void 0;
                return b
            }
            n(d, c);
            d.prototype.pointAttribs = function(b, c) {
                var d = G.prototype.pointAttribs.call(this, b, c)
                  , g = this.options
                  , l = b.open < b.close
                  , n = g.lineColor || this.color
                  , k = b.color || this.color;
                d["stroke-width"] = g.lineWidth;
                d.fill = b.options.color || (l ? g.upColor || k : k);
                d.stroke = b.options.lineColor || (l ? g.upLineColor || n : n);
                c && (b = g.states[c],
                d.fill = b.color || d.fill,
                d.stroke = b.lineColor || d.stroke,
                d["stroke-width"] = b.lineWidth || d["stroke-width"]);
                return d
            }
            ;
            d.prototype.drawPoints = function() {
                var b = this
                  , c = b.chart
                  , d = b.yAxis.reversed;
                b.points.forEach(function(g) {
                    var l = g.graphic
                      , n = !l;
                    if ("undefined" !== typeof g.plotY) {
                        l || (g.graphic = l = c.renderer.path().add(b.group));
                        b.chart.styledMode || l.attr(b.pointAttribs(g, g.selected && "select")).shadow(b.options.shadow);
                        var k = l.strokeWidth() % 2 / 2;
                        var p = Math.round(g.plotX) - k;
                        var x = g.plotOpen;
                        var B = g.plotClose;
                        var w = Math.min(x, B);
                        x = Math.max(x, B);
                        var e = Math.round(g.shapeArgs.width / 2);
                        B = d ? x !== g.yBottom : Math.round(w) !== Math.round(g.plotHigh);
                        var r = d ? Math.round(w) !== Math.round(g.plotHigh) : x !== g.yBottom;
                        w = Math.round(w) + k;
                        x = Math.round(x) + k;
                        k = [];
                        k.push(["M", p - e, x], ["L", p - e, w], ["L", p + e, w], ["L", p + e, x], ["Z"], ["M", p, w], ["L", p, B ? Math.round(d ? g.yBottom : g.plotHigh) : w], ["M", p, x], ["L", p, r ? Math.round(d ? g.plotHigh : g.yBottom) : x]);
                        l[n ? "attr" : "animate"]({
                            d: k
                        }).addClass(g.getClassName(), !0)
                    }
                })
            }
            ;
            d.defaultOptions = p(J.defaultOptions, F.plotOptions, {
                states: {
                    hover: {
                        lineWidth: 2
                    }
                },
                tooltip: F.plotOptions.ohlc.tooltip,
                threshold: null,
                lineColor: x.neutralColor100,
                lineWidth: 1,
                upColor: x.backgroundColor,
                stickyTracking: !0
            });
            return d
        }(J);
        E.registerSeriesType("candlestick", H);
        "";
        return H
    });
    P(c, "Series/Flags/FlagsPoint.js", [c["Core/Series/SeriesRegistry.js"], c["Core/Utilities.js"]], function(c, x) {
        var n = this && this.__extends || function() {
            var c = function(n, x) {
                c = Object.setPrototypeOf || {
                    __proto__: []
                }instanceof Array && function(c, n) {
                    c.__proto__ = n
                }
                || function(c, n) {
                    for (var d in n)
                        n.hasOwnProperty(d) && (c[d] = n[d])
                }
                ;
                return c(n, x)
            };
            return function(n, x) {
                function A() {
                    this.constructor = n
                }
                c(n, x);
                n.prototype = null === x ? Object.create(x) : (A.prototype = x.prototype,
                new A)
            }
        }()
          , H = x.isNumber;
        return function(c) {
            function x() {
                var n = null !== c && c.apply(this, arguments) || this;
                n.options = void 0;
                n.series = void 0;
                return n
            }
            n(x, c);
            x.prototype.isValid = function() {
                return H(this.y) || "undefined" === typeof this.y
            }
            ;
            x.prototype.hasNewShapeType = function() {
                var c = this.options.shape || this.series.options.shape;
                return this.graphic && c && c !== this.graphic.symbolKey
            }
            ;
            return x
        }(c.seriesTypes.column.prototype.pointClass)
    });
    P(c, "Mixins/OnSeries.js", [c["Series/Column/ColumnSeries.js"], c["Core/Series/Series.js"], c["Core/Utilities.js"]], function(c, x, E) {
        var n = c.prototype
          , A = x.prototype
          , F = E.defined
          , G = E.stableSort;
        return {
            getPlotBox: function() {
                return A.getPlotBox.call(this.options.onSeries && this.chart.get(this.options.onSeries) || this)
            },
            translate: function() {
                n.translate.apply(this);
                var c = this, p = c.options, d = c.chart, l = c.points, b = l.length - 1, g, x = p.onSeries;
                x = x && d.get(x);
                p = p.onKey || "y";
                var A = x && x.options.step, y = x && x.points, v = y && y.length, k = d.inverted, E = c.xAxis, H = c.yAxis, B = 0, w;
                if (x && x.visible && v) {
                    B = (x.pointXOffset || 0) + (x.barW || 0) / 2;
                    d = x.currentDataGrouping;
                    var e = y[v - 1].x + (d ? d.totalRange : 0);
                    G(l, function(a, b) {
                        return a.x - b.x
                    });
                    for (p = "plot" + p[0].toUpperCase() + p.substr(1); v-- && l[b]; ) {
                        var r = y[v];
                        d = l[b];
                        d.y = r.y;
                        if (r.x <= d.x && "undefined" !== typeof r[p]) {
                            if (d.x <= e && (d.plotY = r[p],
                            r.x < d.x && !A && (w = y[v + 1]) && "undefined" !== typeof w[p])) {
                                var a = (d.x - r.x) / (w.x - r.x);
                                d.plotY += a * (w[p] - r[p]);
                                d.y += a * (w.y - r.y)
                            }
                            b--;
                            v++;
                            if (0 > b)
                                break
                        }
                    }
                }
                l.forEach(function(a, b) {
                    a.plotX += B;
                    if ("undefined" === typeof a.plotY || k)
                        0 <= a.plotX && a.plotX <= E.len ? k ? (a.plotY = E.translate(a.x, 0, 1, 0, 1),
                        a.plotX = F(a.y) ? H.translate(a.y, 0, 0, 0, 1) : 0) : a.plotY = (E.opposite ? 0 : c.yAxis.len) + E.offset : a.shapeArgs = {};
                    if ((g = l[b - 1]) && g.plotX === a.plotX) {
                        "undefined" === typeof g.stackIndex && (g.stackIndex = 0);
                        var d = g.stackIndex + 1
                    }
                    a.stackIndex = d
                });
                this.onSeries = x
            }
        }
    });
    P(c, "Series/Flags/FlagsSymbols.js", [c["Core/Renderer/RendererRegistry.js"], c["Core/Renderer/SVG/SVGRenderer.js"]], function(c, x) {
        function n(c) {
            H[c + "pin"] = function(n, x, A, p, d) {
                var l = d && d.anchorX;
                d = d && d.anchorY;
                "circle" === c && p > A && (n -= Math.round((p - A) / 2),
                A = p);
                var b = H[c](n, x, A, p);
                if (l && d) {
                    var g = l;
                    "circle" === c ? g = n + A / 2 : (n = b[0],
                    A = b[1],
                    "M" === n[0] && "L" === A[0] && (g = (n[1] + A[1]) / 2));
                    b.push(["M", g, x > d ? x : x + p], ["L", l, d]);
                    b = b.concat(H.circle(l - 1, d - 1, 2, 2))
                }
                return b
            }
        }
        var H = x.prototype.symbols;
        H.flag = function(c, n, x, E, p) {
            var d = p && p.anchorX || c;
            p = p && p.anchorY || n;
            var l = H.circle(d - 1, p - 1, 2, 2);
            l.push(["M", d, p], ["L", c, n + E], ["L", c, n], ["L", c + x, n], ["L", c + x, n + E], ["L", c, n + E], ["Z"]);
            return l
        }
        ;
        n("circle");
        n("square");
        c = c.getRendererType();
        c !== x && (c.prototype.symbols.circlepin = H.circlepin,
        c.prototype.symbols.flag = H.flag,
        c.prototype.symbols.squarepin = H.squarepin);
        return H
    });
    P(c, "Series/Flags/FlagsSeries.js", [c["Series/Flags/FlagsPoint.js"], c["Core/Globals.js"], c["Mixins/OnSeries.js"], c["Core/Color/Palette.js"], c["Core/Series/SeriesRegistry.js"], c["Core/Renderer/SVG/SVGElement.js"], c["Core/Utilities.js"]], function(c, x, E, H, A, F, G) {
        var n = this && this.__extends || function() {
            var b = function(c, d) {
                b = Object.setPrototypeOf || {
                    __proto__: []
                }instanceof Array && function(b, c) {
                    b.__proto__ = c
                }
                || function(b, c) {
                    for (var d in c)
                        c.hasOwnProperty(d) && (b[d] = c[d])
                }
                ;
                return b(c, d)
            };
            return function(c, d) {
                function g() {
                    this.constructor = c
                }
                b(c, d);
                c.prototype = null === d ? Object.create(d) : (g.prototype = d.prototype,
                new g)
            }
        }()
          , p = x.noop
          , d = A.series
          , l = A.seriesTypes.column
          , b = G.addEvent
          , g = G.defined
          , N = G.extend
          , D = G.merge
          , y = G.objectEach
          , v = G.wrap;
        G = function(c) {
            function k() {
                var b = null !== c && c.apply(this, arguments) || this;
                b.data = void 0;
                b.options = void 0;
                b.points = void 0;
                return b
            }
            n(k, c);
            k.prototype.animate = function(b) {
                b && this.setClip()
            }
            ;
            k.prototype.drawPoints = function() {
                var b = this.points, c = this.chart, d = c.renderer, e = c.inverted, k = this.options, a = k.y, l, n = this.yAxis, p = {}, z = [];
                for (l = b.length; l--; ) {
                    var m = b[l];
                    var f = (e ? m.plotY : m.plotX) > this.xAxis.len;
                    var K = m.plotX;
                    var h = m.stackIndex;
                    var u = m.options.shape || k.shape;
                    var A = m.plotY;
                    "undefined" !== typeof A && (A = m.plotY + a - ("undefined" !== typeof h && h * k.stackDistance));
                    m.anchorX = h ? void 0 : m.plotX;
                    var E = h ? void 0 : m.plotY;
                    var t = "flag" !== u;
                    h = m.graphic;
                    "undefined" !== typeof A && 0 <= K && !f ? (h && m.hasNewShapeType() && (h = h.destroy()),
                    h || (h = m.graphic = d.label("", null, null, u, null, null, k.useHTML).addClass("highcharts-point").add(this.markerGroup),
                    m.graphic.div && (m.graphic.div.point = m),
                    h.isNew = !0),
                    h.attr({
                        align: t ? "center" : "left",
                        width: k.width,
                        height: k.height,
                        "text-align": k.textAlign
                    }),
                    c.styledMode || h.attr(this.pointAttribs(m)).css(D(k.style, m.style)).shadow(k.shadow),
                    0 < K && (K -= h.strokeWidth() % 2),
                    u = {
                        y: A,
                        anchorY: E
                    },
                    k.allowOverlapX && (u.x = K,
                    u.anchorX = m.anchorX),
                    h.attr({
                        text: m.options.title || k.title || "A"
                    })[h.isNew ? "attr" : "animate"](u),
                    k.allowOverlapX || (p[m.plotX] ? p[m.plotX].size = Math.max(p[m.plotX].size, h.width) : p[m.plotX] = {
                        align: t ? .5 : 0,
                        size: h.width,
                        target: K,
                        anchorX: K
                    }),
                    m.tooltipPos = [K, A + n.pos - c.plotTop]) : h && (m.graphic = h.destroy())
                }
                k.allowOverlapX || (y(p, function(a) {
                    a.plotX = a.anchorX;
                    z.push(a)
                }),
                x.distribute(z, e ? n.len : this.xAxis.len, 100),
                b.forEach(function(a) {
                    var b = a.graphic && p[a.plotX];
                    b && (a.graphic[a.graphic.isNew ? "attr" : "animate"]({
                        x: b.pos + b.align * b.size,
                        anchorX: a.anchorX
                    }),
                    g(b.pos) ? a.graphic.isNew = !1 : (a.graphic.attr({
                        x: -9999,
                        anchorX: -9999
                    }),
                    a.graphic.isNew = !0))
                }));
                k.useHTML && v(this.markerGroup, "on", function(a) {
                    return F.prototype.on.apply(a.apply(this, [].slice.call(arguments, 1)), [].slice.call(arguments, 1))
                })
            }
            ;
            k.prototype.drawTracker = function() {
                var d = this.points;
                c.prototype.drawTracker.call(this);
                d.forEach(function(c) {
                    var g = c.graphic;
                    g && (c.unbindMouseOver && c.unbindMouseOver(),
                    c.unbindMouseOver = b(g.element, "mouseover", function() {
                        0 < c.stackIndex && !c.raised && (c._y = g.y,
                        g.attr({
                            y: c._y - 8
                        }),
                        c.raised = !0);
                        d.forEach(function(b) {
                            b !== c && b.raised && b.graphic && (b.graphic.attr({
                                y: b._y
                            }),
                            b.raised = !1)
                        })
                    }))
                })
            }
            ;
            k.prototype.pointAttribs = function(b, c) {
                var d = this.options
                  , e = b && b.color || this.color
                  , g = d.lineColor
                  , a = b && b.lineWidth;
                b = b && b.fillColor || d.fillColor;
                c && (b = d.states[c].fillColor,
                g = d.states[c].lineColor,
                a = d.states[c].lineWidth);
                return {
                    fill: b || e,
                    stroke: g || e,
                    "stroke-width": a || d.lineWidth || 0
                }
            }
            ;
            k.prototype.setClip = function() {
                d.prototype.setClip.apply(this, arguments);
                !1 !== this.options.clip && this.sharedClipKey && this.markerGroup && this.markerGroup.clip(this.chart.sharedClips[this.sharedClipKey])
            }
            ;
            k.defaultOptions = D(l.defaultOptions, {
                pointRange: 0,
                allowOverlapX: !1,
                shape: "flag",
                stackDistance: 12,
                textAlign: "center",
                tooltip: {
                    pointFormat: "{point.text}"
                },
                threshold: null,
                y: -30,
                fillColor: H.backgroundColor,
                lineWidth: 1,
                states: {
                    hover: {
                        lineColor: H.neutralColor100,
                        fillColor: H.highlightColor20
                    }
                },
                style: {
                    fontSize: "11px",
                    fontWeight: "bold"
                }
            });
            return k
        }(l);
        N(G.prototype, {
            allowDG: !1,
            buildKDTree: p,
            forceCrop: !0,
            getPlotBox: E.getPlotBox,
            init: d.prototype.init,
            invertGroups: p,
            invertible: !1,
            noSharedTooltip: !0,
            pointClass: c,
            sorted: !1,
            takeOrdinalPosition: !1,
            trackerGroups: ["markerGroup"],
            translate: E.translate
        });
        A.registerSeriesType("flags", G);
        "";
        "";
        return G
    });
    P(c, "Extensions/RangeSelector.js", [c["Core/Axis/Axis.js"], c["Core/Chart/Chart.js"], c["Core/Globals.js"], c["Core/DefaultOptions.js"], c["Core/Color/Palette.js"], c["Core/Renderer/SVG/SVGElement.js"], c["Core/Utilities.js"]], function(c, x, E, H, A, F, G) {
        function n(a) {
            if (-1 !== a.indexOf("%L"))
                return "text";
            var b = "aAdewbBmoyY".split("").some(function(b) {
                return -1 !== a.indexOf("%" + b)
            })
              , c = "HkIlMS".split("").some(function(b) {
                return -1 !== a.indexOf("%" + b)
            });
            return b && c ? "datetime-local" : b ? "date" : c ? "time" : "text"
        }
        var p = H.defaultOptions
          , d = G.addEvent
          , l = G.createElement
          , b = G.css
          , g = G.defined
          , N = G.destroyObjectProperties
          , D = G.discardElement
          , y = G.extend
          , v = G.find
          , k = G.fireEvent
          , L = G.isNumber
          , M = G.merge
          , B = G.objectEach
          , w = G.pad
          , e = G.pick
          , r = G.pInt
          , a = G.splat;
        y(p, {
            rangeSelector: {
                allButtonsEnabled: !1,
                buttons: void 0,
                buttonSpacing: 5,
                dropdown: "responsive",
                enabled: void 0,
                verticalAlign: "top",
                buttonTheme: {
                    width: 28,
                    height: 18,
                    padding: 2,
                    zIndex: 7
                },
                floating: !1,
                x: 0,
                y: 0,
                height: void 0,
                inputBoxBorderColor: "none",
                inputBoxHeight: 17,
                inputBoxWidth: void 0,
                inputDateFormat: "%b %e, %Y",
                inputDateParser: void 0,
                inputEditDateFormat: "%Y-%m-%d",
                inputEnabled: !0,
                inputPosition: {
                    align: "right",
                    x: 0,
                    y: 0
                },
                inputSpacing: 5,
                selected: void 0,
                buttonPosition: {
                    align: "left",
                    x: 0,
                    y: 0
                },
                inputStyle: {
                    color: A.highlightColor80,
                    cursor: "pointer"
                },
                labelStyle: {
                    color: A.neutralColor60
                }
            }
        });
        y(p.lang, {
            rangeSelectorZoom: "Zoom",
            rangeSelectorFrom: "",
            rangeSelectorTo: "\u2192"
        });
        var q = function() {
            function q(a) {
                this.buttons = void 0;
                this.buttonOptions = q.prototype.defaultButtons;
                this.initialButtonGroupWidth = 0;
                this.options = void 0;
                this.chart = a;
                this.init(a)
            }
            q.prototype.clickButton = function(b, f) {
                var m = this.chart
                  , h = this.buttonOptions[b]
                  , l = m.xAxis[0]
                  , n = m.scroller && m.scroller.getUnionExtremes() || l || {}
                  , p = n.dataMin
                  , q = n.dataMax
                  , r = l && Math.round(Math.min(l.max, e(q, l.max)))
                  , w = h.type;
                n = h._range;
                var v, x = h.dataGrouping;
                if (null !== p && null !== q) {
                    m.fixedRange = n;
                    this.setSelected(b);
                    x && (this.forcedDataGrouping = !0,
                    c.prototype.setDataGrouping.call(l || {
                        chart: this.chart
                    }, x, !1),
                    this.frozenStates = h.preserveDataGrouping);
                    if ("month" === w || "year" === w)
                        if (l) {
                            w = {
                                range: h,
                                max: r,
                                chart: m,
                                dataMin: p,
                                dataMax: q
                            };
                            var z = l.minFromRange.call(w);
                            L(w.newMax) && (r = w.newMax)
                        } else
                            n = h;
                    else if (n)
                        z = Math.max(r - n, p),
                        r = Math.min(z + n, q);
                    else if ("ytd" === w)
                        if (l)
                            "undefined" === typeof q && (p = Number.MAX_VALUE,
                            q = Number.MIN_VALUE,
                            m.series.forEach(function(a) {
                                a = a.xData;
                                p = Math.min(a[0], p);
                                q = Math.max(a[a.length - 1], q)
                            }),
                            f = !1),
                            r = this.getYTDExtremes(q, p, m.time.useUTC),
                            z = v = r.min,
                            r = r.max;
                        else {
                            this.deferredYTDClick = b;
                            return
                        }
                    else
                        "all" === w && l && (m.navigator && m.navigator.baseSeries[0] && (m.navigator.baseSeries[0].xAxis.options.range = void 0),
                        z = p,
                        r = q);
                    g(z) && (z += h._offsetMin);
                    g(r) && (r += h._offsetMax);
                    this.dropdown && (this.dropdown.selectedIndex = b + 1);
                    if (l)
                        l.setExtremes(z, r, e(f, !0), void 0, {
                            trigger: "rangeSelectorButton",
                            rangeSelectorButton: h
                        });
                    else {
                        var y = a(m.options.xAxis)[0];
                        var A = y.range;
                        y.range = n;
                        var B = y.min;
                        y.min = v;
                        d(m, "load", function() {
                            y.range = A;
                            y.min = B
                        })
                    }
                    k(this, "afterBtnClick")
                }
            }
            ;
            q.prototype.setSelected = function(a) {
                this.selected = this.options.selected = a
            }
            ;
            q.prototype.init = function(a) {
                var b = this
                  , c = a.options.rangeSelector
                  , e = c.buttons || b.defaultButtons.slice()
                  , g = c.selected
                  , m = function() {
                    var a = b.minInput
                      , c = b.maxInput;
                    a && a.blur && k(a, "blur");
                    c && c.blur && k(c, "blur")
                };
                b.chart = a;
                b.options = c;
                b.buttons = [];
                b.buttonOptions = e;
                this.eventsToUnbind = [];
                this.eventsToUnbind.push(d(a.container, "mousedown", m));
                this.eventsToUnbind.push(d(a, "resize", m));
                e.forEach(b.computeButtonRange);
                "undefined" !== typeof g && e[g] && this.clickButton(g, !1);
                this.eventsToUnbind.push(d(a, "load", function() {
                    a.xAxis && a.xAxis[0] && d(a.xAxis[0], "setExtremes", function(c) {
                        this.max - this.min !== a.fixedRange && "rangeSelectorButton" !== c.trigger && "updatedData" !== c.trigger && b.forcedDataGrouping && !b.frozenStates && this.setDataGrouping(!1, !1)
                    })
                }))
            }
            ;
            q.prototype.updateButtonStates = function() {
                var a = this
                  , b = this.chart
                  , c = this.dropdown
                  , d = b.xAxis[0]
                  , e = Math.round(d.max - d.min)
                  , g = !d.hasVisibleSeries
                  , k = b.scroller && b.scroller.getUnionExtremes() || d
                  , l = k.dataMin
                  , n = k.dataMax;
                b = a.getYTDExtremes(n, l, b.time.useUTC);
                var p = b.min
                  , q = b.max
                  , r = a.selected
                  , w = L(r)
                  , v = a.options.allButtonsEnabled
                  , x = a.buttons;
                a.buttonOptions.forEach(function(b, f) {
                    var h = b._range
                      , m = b.type
                      , k = b.count || 1
                      , u = x[f]
                      , t = 0
                      , z = b._offsetMax - b._offsetMin;
                    b = f === r;
                    var y = h > n - l
                      , K = h < d.minRange
                      , A = !1
                      , B = !1;
                    h = h === e;
                    ("month" === m || "year" === m) && e + 36E5 >= 864E5 * {
                        month: 28,
                        year: 365
                    }[m] * k - z && e - 36E5 <= 864E5 * {
                        month: 31,
                        year: 366
                    }[m] * k + z ? h = !0 : "ytd" === m ? (h = q - p + z === e,
                    A = !b) : "all" === m && (h = d.max - d.min >= n - l,
                    B = !b && w && h);
                    m = !v && (y || K || B || g);
                    k = b && h || h && !w && !A || b && a.frozenStates;
                    m ? t = 3 : k && (w = !0,
                    t = 2);
                    u.state !== t && (u.setState(t),
                    c && (c.options[f + 1].disabled = m,
                    2 === t && (c.selectedIndex = f + 1)),
                    0 === t && r === f && a.setSelected())
                })
            }
            ;
            q.prototype.computeButtonRange = function(a) {
                var b = a.type
                  , c = a.count || 1
                  , d = {
                    millisecond: 1,
                    second: 1E3,
                    minute: 6E4,
                    hour: 36E5,
                    day: 864E5,
                    week: 6048E5
                };
                if (d[b])
                    a._range = d[b] * c;
                else if ("month" === b || "year" === b)
                    a._range = 864E5 * {
                        month: 30,
                        year: 365
                    }[b] * c;
                a._offsetMin = e(a.offsetMin, 0);
                a._offsetMax = e(a.offsetMax, 0);
                a._range += a._offsetMax - a._offsetMin
            }
            ;
            q.prototype.getInputValue = function(a) {
                a = "min" === a ? this.minInput : this.maxInput;
                var b = this.chart.options.rangeSelector
                  , c = this.chart.time;
                return a ? ("text" === a.type && b.inputDateParser || this.defaultInputDateParser)(a.value, c.useUTC, c) : 0
            }
            ;
            q.prototype.setInputValue = function(a, b) {
                var c = this.options
                  , d = this.chart.time
                  , e = "min" === a ? this.minInput : this.maxInput;
                a = "min" === a ? this.minDateBox : this.maxDateBox;
                if (e) {
                    var f = e.getAttribute("data-hc-time");
                    f = g(f) ? Number(f) : void 0;
                    g(b) && (g(f) && e.setAttribute("data-hc-time-previous", f),
                    e.setAttribute("data-hc-time", b),
                    f = b);
                    e.value = d.dateFormat(this.inputTypeFormats[e.type] || c.inputEditDateFormat, f);
                    a && a.attr({
                        text: d.dateFormat(c.inputDateFormat, f)
                    })
                }
            }
            ;
            q.prototype.setInputExtremes = function(a, b, c) {
                if (a = "min" === a ? this.minInput : this.maxInput) {
                    var d = this.inputTypeFormats[a.type]
                      , e = this.chart.time;
                    d && (b = e.dateFormat(d, b),
                    a.min !== b && (a.min = b),
                    c = e.dateFormat(d, c),
                    a.max !== c && (a.max = c))
                }
            }
            ;
            q.prototype.showInput = function(a) {
                var c = "min" === a ? this.minDateBox : this.maxDateBox;
                if ((a = "min" === a ? this.minInput : this.maxInput) && c && this.inputGroup) {
                    var d = "text" === a.type
                      , e = this.inputGroup
                      , g = e.translateX;
                    e = e.translateY;
                    var k = this.options.inputBoxWidth;
                    b(a, {
                        width: d ? c.width + (k ? -2 : 20) + "px" : "auto",
                        height: d ? c.height - 2 + "px" : "auto",
                        border: "2px solid silver"
                    });
                    d && k ? b(a, {
                        left: g + c.x + "px",
                        top: e + "px"
                    }) : b(a, {
                        left: Math.min(Math.round(c.x + g - (a.offsetWidth - c.width) / 2), this.chart.chartWidth - a.offsetWidth) + "px",
                        top: e - (a.offsetHeight - c.height) / 2 + "px"
                    })
                }
            }
            ;
            q.prototype.hideInput = function(a) {
                (a = "min" === a ? this.minInput : this.maxInput) && b(a, {
                    top: "-9999em",
                    border: 0,
                    width: "1px",
                    height: "1px"
                })
            }
            ;
            q.prototype.defaultInputDateParser = function(a, b, c) {
                var d = a.split("/").join("-").split(" ").join("T");
                -1 === d.indexOf("T") && (d += "T00:00");
                if (b)
                    d += "Z";
                else {
                    var e;
                    if (e = E.isSafari)
                        e = d,
                        e = !(6 < e.length && (e.lastIndexOf("-") === e.length - 6 || e.lastIndexOf("+") === e.length - 6));
                    e && (e = (new Date(d)).getTimezoneOffset() / 60,
                    d += 0 >= e ? "+" + w(-e) + ":00" : "-" + w(e) + ":00")
                }
                d = Date.parse(d);
                L(d) || (a = a.split("-"),
                d = Date.UTC(r(a[0]), r(a[1]) - 1, r(a[2])));
                c && b && L(d) && (d += c.getTimezoneOffset(d));
                return d
            }
            ;
            q.prototype.drawInput = function(a) {
                function c() {
                    var b = k.getInputValue(a)
                      , c = d.xAxis[0]
                      , e = d.scroller && d.scroller.xAxis ? d.scroller.xAxis : c
                      , f = e.dataMin;
                    e = e.dataMax;
                    var g = k.maxInput
                      , h = k.minInput;
                    b !== Number(x.getAttribute("data-hc-time-previous")) && L(b) && (x.setAttribute("data-hc-time-previous", b),
                    w && g && L(f) ? b > Number(g.getAttribute("data-hc-time")) ? b = void 0 : b < f && (b = f) : h && L(e) && (b < Number(h.getAttribute("data-hc-time")) ? b = void 0 : b > e && (b = e)),
                    "undefined" !== typeof b && c.setExtremes(w ? b : c.min, w ? c.max : b, void 0, void 0, {
                        trigger: "rangeSelectorInput"
                    }))
                }
                var d = this.chart
                  , e = this.div
                  , g = this.inputGroup
                  , k = this
                  , m = d.renderer.style || {}
                  , q = d.renderer
                  , r = d.options.rangeSelector
                  , w = "min" === a
                  , v = p.lang[w ? "rangeSelectorFrom" : "rangeSelectorTo"];
                v = q.label(v, 0).addClass("highcharts-range-label").attr({
                    padding: v ? 2 : 0,
                    height: v ? r.inputBoxHeight : 0
                }).add(g);
                q = q.label("", 0).addClass("highcharts-range-input").attr({
                    padding: 2,
                    width: r.inputBoxWidth,
                    height: r.inputBoxHeight,
                    "text-align": "center"
                }).on("click", function() {
                    k.showInput(a);
                    k[a + "Input"].focus()
                });
                d.styledMode || q.attr({
                    stroke: r.inputBoxBorderColor,
                    "stroke-width": 1
                });
                q.add(g);
                var x = l("input", {
                    name: a,
                    className: "highcharts-range-selector"
                }, void 0, e);
                x.setAttribute("type", n(r.inputDateFormat || "%b %e, %Y"));
                d.styledMode || (v.css(M(m, r.labelStyle)),
                q.css(M({
                    color: A.neutralColor80
                }, m, r.inputStyle)),
                b(x, y({
                    position: "absolute",
                    border: 0,
                    boxShadow: "0 0 15px rgba(0,0,0,0.3)",
                    width: "1px",
                    height: "1px",
                    padding: 0,
                    textAlign: "center",
                    fontSize: m.fontSize,
                    fontFamily: m.fontFamily,
                    top: "-9999em"
                }, r.inputStyle)));
                x.onfocus = function() {
                    k.showInput(a)
                }
                ;
                x.onblur = function() {
                    x === E.doc.activeElement && c();
                    k.hideInput(a);
                    k.setInputValue(a);
                    x.blur()
                }
                ;
                var z = !1;
                x.onchange = function() {
                    z || (c(),
                    k.hideInput(a),
                    x.blur())
                }
                ;
                x.onkeypress = function(a) {
                    13 === a.keyCode && c()
                }
                ;
                x.onkeydown = function(a) {
                    z = !0;
                    38 !== a.keyCode && 40 !== a.keyCode || c()
                }
                ;
                x.onkeyup = function() {
                    z = !1
                }
                ;
                return {
                    dateBox: q,
                    input: x,
                    label: v
                }
            }
            ;
            q.prototype.getPosition = function() {
                var a = this.chart
                  , b = a.options.rangeSelector;
                a = "top" === b.verticalAlign ? a.plotTop - a.axisOffset[0] : 0;
                return {
                    buttonTop: a + b.buttonPosition.y,
                    inputTop: a + b.inputPosition.y - 10
                }
            }
            ;
            q.prototype.getYTDExtremes = function(a, b, c) {
                var d = this.chart.time
                  , e = new d.Date(a)
                  , f = d.get("FullYear", e);
                c = c ? d.Date.UTC(f, 0, 1) : +new d.Date(f,0,1);
                b = Math.max(b, c);
                e = e.getTime();
                return {
                    max: Math.min(a || e, e),
                    min: b
                }
            }
            ;
            q.prototype.render = function(a, b) {
                var c = this.chart
                  , d = c.renderer
                  , f = c.container
                  , k = c.options
                  , m = k.rangeSelector
                  , n = e(k.chart.style && k.chart.style.zIndex, 0) + 1;
                k = m.inputEnabled;
                if (!1 !== m.enabled) {
                    this.rendered || (this.group = d.g("range-selector-group").attr({
                        zIndex: 7
                    }).add(),
                    this.div = l("div", void 0, {
                        position: "relative",
                        height: 0,
                        zIndex: n
                    }),
                    this.buttonOptions.length && this.renderButtons(),
                    f.parentNode && f.parentNode.insertBefore(this.div, f),
                    k && (this.inputGroup = d.g("input-group").add(this.group),
                    d = this.drawInput("min"),
                    this.minDateBox = d.dateBox,
                    this.minLabel = d.label,
                    this.minInput = d.input,
                    d = this.drawInput("max"),
                    this.maxDateBox = d.dateBox,
                    this.maxLabel = d.label,
                    this.maxInput = d.input));
                    if (k && (this.setInputValue("min", a),
                    this.setInputValue("max", b),
                    a = c.scroller && c.scroller.getUnionExtremes() || c.xAxis[0] || {},
                    g(a.dataMin) && g(a.dataMax) && (c = c.xAxis[0].minRange || 0,
                    this.setInputExtremes("min", a.dataMin, Math.min(a.dataMax, this.getInputValue("max")) - c),
                    this.setInputExtremes("max", Math.max(a.dataMin, this.getInputValue("min")) + c, a.dataMax)),
                    this.inputGroup)) {
                        var p = 0;
                        [this.minLabel, this.minDateBox, this.maxLabel, this.maxDateBox].forEach(function(a) {
                            if (a) {
                                var b = a.getBBox().width;
                                b && (a.attr({
                                    x: p
                                }),
                                p += b + m.inputSpacing)
                            }
                        })
                    }
                    this.alignElements();
                    this.rendered = !0
                }
            }
            ;
            q.prototype.renderButtons = function() {
                var a = this
                  , b = this.buttons
                  , c = this.options
                  , g = p.lang
                  , n = this.chart.renderer
                  , q = M(c.buttonTheme)
                  , r = q && q.states
                  , t = q.width || 28;
                delete q.width;
                delete q.states;
                this.buttonGroup = n.g("range-selector-buttons").add(this.group);
                var w = this.dropdown = l("select", void 0, {
                    position: "absolute",
                    width: "1px",
                    height: "1px",
                    padding: 0,
                    border: 0,
                    top: "-9999em",
                    cursor: "pointer",
                    opacity: .0001
                }, this.div);
                d(w, "touchstart", function() {
                    w.style.fontSize = "16px"
                });
                [[E.isMS ? "mouseover" : "mouseenter"], [E.isMS ? "mouseout" : "mouseleave"], ["change", "click"]].forEach(function(c) {
                    var e = c[0]
                      , f = c[1];
                    d(w, e, function() {
                        var c = b[a.currentButtonIndex()];
                        c && k(c.element, f || e)
                    })
                });
                this.zoomText = n.label(g && g.rangeSelectorZoom || "", 0).attr({
                    padding: c.buttonTheme.padding,
                    height: c.buttonTheme.height,
                    paddingLeft: 0,
                    paddingRight: 0
                }).add(this.buttonGroup);
                this.chart.styledMode || (this.zoomText.css(c.labelStyle),
                q["stroke-width"] = e(q["stroke-width"], 0));
                l("option", {
                    textContent: this.zoomText.textStr,
                    disabled: !0
                }, void 0, w);
                this.buttonOptions.forEach(function(c, d) {
                    l("option", {
                        textContent: c.title || c.text
                    }, void 0, w);
                    b[d] = n.button(c.text, 0, 0, function(b) {
                        var e = c.events && c.events.click, f;
                        e && (f = e.call(c, b));
                        !1 !== f && a.clickButton(d);
                        a.isActive = !0
                    }, q, r && r.hover, r && r.select, r && r.disabled).attr({
                        "text-align": "center",
                        width: t
                    }).add(a.buttonGroup);
                    c.title && b[d].attr("title", c.title)
                })
            }
            ;
            q.prototype.alignElements = function() {
                var a = this
                  , b = this.buttonGroup
                  , c = this.buttons
                  , d = this.chart
                  , g = this.group
                  , k = this.inputGroup
                  , l = this.options
                  , n = this.zoomText
                  , p = d.options
                  , q = p.exporting && !1 !== p.exporting.enabled && p.navigation && p.navigation.buttonOptions;
                p = l.buttonPosition;
                var r = l.inputPosition
                  , w = l.verticalAlign
                  , v = function(b, c) {
                    return q && a.titleCollision(d) && "top" === w && "right" === c.align && c.y - b.getBBox().height - 12 < (q.y || 0) + (q.height || 0) + d.spacing[0] ? -40 : 0
                }
                  , x = d.plotLeft;
                if (g && p && r) {
                    var z = p.x - d.spacing[3];
                    if (b) {
                        this.positionButtons();
                        if (!this.initialButtonGroupWidth) {
                            var y = 0;
                            n && (y += n.getBBox().width + 5);
                            c.forEach(function(a, b) {
                                y += a.width;
                                b !== c.length - 1 && (y += l.buttonSpacing)
                            });
                            this.initialButtonGroupWidth = y
                        }
                        x -= d.spacing[3];
                        this.updateButtonStates();
                        n = v(b, p);
                        this.alignButtonGroup(n);
                        g.placed = b.placed = d.hasLoaded
                    }
                    b = 0;
                    k && (b = v(k, r),
                    "left" === r.align ? z = x : "right" === r.align && (z = -Math.max(d.axisOffset[1], -b)),
                    k.align({
                        y: r.y,
                        width: k.getBBox().width,
                        align: r.align,
                        x: r.x + z - 2
                    }, !0, d.spacingBox),
                    k.placed = d.hasLoaded);
                    this.handleCollision(b);
                    g.align({
                        verticalAlign: w
                    }, !0, d.spacingBox);
                    k = g.alignAttr.translateY;
                    b = g.getBBox().height + 20;
                    v = 0;
                    "bottom" === w && (v = (v = d.legend && d.legend.options) && "bottom" === v.verticalAlign && v.enabled && !v.floating ? d.legend.legendHeight + e(v.margin, 10) : 0,
                    b = b + v - 20,
                    v = k - b - (l.floating ? 0 : l.y) - (d.titleOffset ? d.titleOffset[2] : 0) - 10);
                    if ("top" === w)
                        l.floating && (v = 0),
                        d.titleOffset && d.titleOffset[0] && (v = d.titleOffset[0]),
                        v += d.margin[0] - d.spacing[0] || 0;
                    else if ("middle" === w)
                        if (r.y === p.y)
                            v = k;
                        else if (r.y || p.y)
                            v = 0 > r.y || 0 > p.y ? v - Math.min(r.y, p.y) : k - b;
                    g.translate(l.x, l.y + Math.floor(v));
                    p = this.minInput;
                    r = this.maxInput;
                    k = this.dropdown;
                    l.inputEnabled && p && r && (p.style.marginTop = g.translateY + "px",
                    r.style.marginTop = g.translateY + "px");
                    k && (k.style.marginTop = g.translateY + "px")
                }
            }
            ;
            q.prototype.alignButtonGroup = function(a, b) {
                var c = this.chart
                  , d = this.buttonGroup
                  , f = this.options.buttonPosition
                  , g = c.plotLeft - c.spacing[3]
                  , k = f.x - c.spacing[3];
                "right" === f.align ? k += a - g : "center" === f.align && (k -= g / 2);
                d && d.align({
                    y: f.y,
                    width: e(b, this.initialButtonGroupWidth),
                    align: f.align,
                    x: k
                }, !0, c.spacingBox)
            }
            ;
            q.prototype.positionButtons = function() {
                var a = this.buttons
                  , b = this.chart
                  , c = this.options
                  , d = this.zoomText
                  , g = b.hasLoaded ? "animate" : "attr"
                  , k = c.buttonPosition
                  , l = b.plotLeft
                  , n = l;
                d && "hidden" !== d.visibility && (d[g]({
                    x: e(l + k.x, l)
                }),
                n += k.x + d.getBBox().width + 5);
                this.buttonOptions.forEach(function(b, d) {
                    if ("hidden" !== a[d].visibility)
                        a[d][g]({
                            x: n
                        }),
                        n += a[d].width + c.buttonSpacing;
                    else
                        a[d][g]({
                            x: l
                        })
                })
            }
            ;
            q.prototype.handleCollision = function(a) {
                var b = this
                  , c = this.chart
                  , d = this.buttonGroup
                  , e = this.inputGroup
                  , g = this.options
                  , k = g.buttonPosition
                  , l = g.dropdown
                  , m = g.inputPosition;
                g = function() {
                    var a = 0;
                    b.buttons.forEach(function(b) {
                        b = b.getBBox();
                        b.width > a && (a = b.width)
                    });
                    return a
                }
                ;
                var n = function(b) {
                    if (e && d) {
                        var c = e.alignAttr.translateX + e.alignOptions.x - a + e.getBBox().x + 2
                          , f = e.alignOptions.width
                          , g = d.alignAttr.translateX + d.getBBox().x;
                        return g + b > c && c + f > g && k.y < m.y + e.getBBox().height
                    }
                    return !1
                }
                  , p = function() {
                    e && d && e.attr({
                        translateX: e.alignAttr.translateX + (c.axisOffset[1] >= -a ? 0 : -a),
                        translateY: e.alignAttr.translateY + d.getBBox().height + 10
                    })
                };
                if (d) {
                    if ("always" === l) {
                        this.collapseButtons(a);
                        n(g()) && p();
                        return
                    }
                    "never" === l && this.expandButtons()
                }
                e && d ? m.align === k.align || n(this.initialButtonGroupWidth + 20) ? "responsive" === l ? (this.collapseButtons(a),
                n(g()) && p()) : p() : "responsive" === l && this.expandButtons() : d && "responsive" === l && (this.initialButtonGroupWidth > c.plotWidth ? this.collapseButtons(a) : this.expandButtons())
            }
            ;
            q.prototype.collapseButtons = function(a) {
                var b = this.buttons
                  , c = this.buttonOptions
                  , d = this.chart
                  , g = this.dropdown
                  , k = this.options
                  , l = this.zoomText
                  , m = d.userOptions.rangeSelector && d.userOptions.rangeSelector.buttonTheme || {}
                  , n = function(a) {
                    return {
                        text: a ? a + " \u25be" : "\u25be",
                        width: "auto",
                        paddingLeft: e(k.buttonTheme.paddingLeft, m.padding, 8),
                        paddingRight: e(k.buttonTheme.paddingRight, m.padding, 8)
                    }
                };
                l && l.hide();
                var p = !1;
                c.forEach(function(a, c) {
                    c = b[c];
                    2 !== c.state ? c.hide() : (c.show(),
                    c.attr(n(a.text)),
                    p = !0)
                });
                p || (g && (g.selectedIndex = 0),
                b[0].show(),
                b[0].attr(n(this.zoomText && this.zoomText.textStr)));
                c = k.buttonPosition.align;
                this.positionButtons();
                "right" !== c && "center" !== c || this.alignButtonGroup(a, b[this.currentButtonIndex()].getBBox().width);
                this.showDropdown()
            }
            ;
            q.prototype.expandButtons = function() {
                var a = this.buttons
                  , b = this.buttonOptions
                  , c = this.options
                  , d = this.zoomText;
                this.hideDropdown();
                d && d.show();
                b.forEach(function(b, d) {
                    d = a[d];
                    d.show();
                    d.attr({
                        text: b.text,
                        width: c.buttonTheme.width || 28,
                        paddingLeft: e(c.buttonTheme.paddingLeft, "unset"),
                        paddingRight: e(c.buttonTheme.paddingRight, "unset")
                    });
                    2 > d.state && d.setState(0)
                });
                this.positionButtons()
            }
            ;
            q.prototype.currentButtonIndex = function() {
                var a = this.dropdown;
                return a && 0 < a.selectedIndex ? a.selectedIndex - 1 : 0
            }
            ;
            q.prototype.showDropdown = function() {
                var a = this.buttonGroup
                  , c = this.buttons
                  , d = this.chart
                  , e = this.dropdown;
                if (a && e) {
                    var g = a.translateX;
                    a = a.translateY;
                    c = c[this.currentButtonIndex()].getBBox();
                    b(e, {
                        left: d.plotLeft + g + "px",
                        top: a + .5 + "px",
                        width: c.width + "px",
                        height: c.height + "px"
                    });
                    this.hasVisibleDropdown = !0
                }
            }
            ;
            q.prototype.hideDropdown = function() {
                var a = this.dropdown;
                a && (b(a, {
                    top: "-9999em",
                    width: "1px",
                    height: "1px"
                }),
                this.hasVisibleDropdown = !1)
            }
            ;
            q.prototype.getHeight = function() {
                var a = this.options
                  , b = this.group
                  , c = a.y
                  , d = a.buttonPosition.y
                  , e = a.inputPosition.y;
                if (a.height)
                    return a.height;
                this.alignElements();
                a = b ? b.getBBox(!0).height + 13 + c : 0;
                b = Math.min(e, d);
                if (0 > e && 0 > d || 0 < e && 0 < d)
                    a += Math.abs(b);
                return a
            }
            ;
            q.prototype.titleCollision = function(a) {
                return !(a.options.title.text || a.options.subtitle.text)
            }
            ;
            q.prototype.update = function(a) {
                var b = this.chart;
                M(!0, b.options.rangeSelector, a);
                this.destroy();
                this.init(b);
                this.render()
            }
            ;
            q.prototype.destroy = function() {
                var a = this
                  , b = a.minInput
                  , c = a.maxInput;
                a.eventsToUnbind && (a.eventsToUnbind.forEach(function(a) {
                    return a()
                }),
                a.eventsToUnbind = void 0);
                N(a.buttons);
                b && (b.onfocus = b.onblur = b.onchange = null);
                c && (c.onfocus = c.onblur = c.onchange = null);
                B(a, function(b, c) {
                    b && "chart" !== c && (b instanceof F ? b.destroy() : b instanceof window.HTMLElement && D(b));
                    b !== q.prototype[c] && (a[c] = null)
                }, this)
            }
            ;
            return q
        }();
        q.prototype.defaultButtons = [{
            type: "month",
            count: 1,
            text: "1m",
            title: "View 1 month"
        }, {
            type: "month",
            count: 3,
            text: "3m",
            title: "View 3 months"
        }, {
            type: "month",
            count: 6,
            text: "6m",
            title: "View 6 months"
        }, {
            type: "ytd",
            text: "YTD",
            title: "View year to date"
        }, {
            type: "year",
            count: 1,
            text: "1y",
            title: "View 1 year"
        }, {
            type: "all",
            text: "All",
            title: "View all"
        }];
        q.prototype.inputTypeFormats = {
            "datetime-local": "%Y-%m-%dT%H:%M:%S",
            date: "%Y-%m-%d",
            time: "%H:%M:%S"
        };
        c.prototype.minFromRange = function() {
            var a = this.range
              , b = a.type
              , c = this.max
              , d = this.chart.time
              , g = function(a, c) {
                var e = "year" === b ? "FullYear" : "Month"
                  , f = new d.Date(a)
                  , g = d.get(e, f);
                d.set(e, f, g + c);
                g === d.get(e, f) && d.set("Date", f, 0);
                return f.getTime() - a
            };
            if (L(a)) {
                var k = c - a;
                var l = a
            } else
                k = c + g(c, -a.count),
                this.chart && (this.chart.fixedRange = c - k);
            var n = e(this.dataMin, Number.MIN_VALUE);
            L(k) || (k = n);
            k <= n && (k = n,
            "undefined" === typeof l && (l = g(k, a.count)),
            this.newMax = Math.min(k + l, this.dataMax));
            L(c) || (k = void 0);
            return k
        }
        ;
        if (!E.RangeSelector) {
            var I = []
              , C = function(a) {
                function b() {
                    e && (c = a.xAxis[0].getExtremes(),
                    g = a.legend,
                    l = e && e.options.verticalAlign,
                    L(c.min) && e.render(c.min, c.max),
                    g.display && "top" === l && l === g.options.verticalAlign && (k = M(a.spacingBox),
                    k.y = "vertical" === g.options.layout ? a.plotTop : k.y + e.getHeight(),
                    g.group.placed = !1,
                    g.align(k)))
                }
                var c, e = a.rangeSelector, g, k, l;
                e && (v(I, function(b) {
                    return b[0] === a
                }) || I.push([a, [d(a.xAxis[0], "afterSetExtremes", function(a) {
                    e && e.render(a.min, a.max)
                }), d(a, "redraw", b)]]),
                b())
            };
            d(x, "afterGetContainer", function() {
                this.options.rangeSelector && this.options.rangeSelector.enabled && (this.rangeSelector = new q(this))
            });
            d(x, "beforeRender", function() {
                var a = this.axes
                  , b = this.rangeSelector;
                b && (L(b.deferredYTDClick) && (b.clickButton(b.deferredYTDClick),
                delete b.deferredYTDClick),
                a.forEach(function(a) {
                    a.updateNames();
                    a.setScale()
                }),
                this.getAxisMargins(),
                b.render(),
                a = b.options.verticalAlign,
                b.options.floating || ("bottom" === a ? this.extraBottomMargin = !0 : "middle" !== a && (this.extraTopMargin = !0)))
            });
            d(x, "update", function(a) {
                var b = a.options.rangeSelector;
                a = this.rangeSelector;
                var c = this.extraBottomMargin
                  , d = this.extraTopMargin;
                b && b.enabled && !g(a) && this.options.rangeSelector && (this.options.rangeSelector.enabled = !0,
                this.rangeSelector = a = new q(this));
                this.extraTopMargin = this.extraBottomMargin = !1;
                a && (C(this),
                b = b && b.verticalAlign || a.options && a.options.verticalAlign,
                a.options.floating || ("bottom" === b ? this.extraBottomMargin = !0 : "middle" !== b && (this.extraTopMargin = !0)),
                this.extraBottomMargin !== c || this.extraTopMargin !== d) && (this.isDirtyBox = !0)
            });
            d(x, "render", function() {
                var a = this.rangeSelector;
                a && !a.options.floating && (a.render(),
                a = a.options.verticalAlign,
                "bottom" === a ? this.extraBottomMargin = !0 : "middle" !== a && (this.extraTopMargin = !0))
            });
            d(x, "getMargins", function() {
                var a = this.rangeSelector;
                a && (a = a.getHeight(),
                this.extraTopMargin && (this.plotTop += a),
                this.extraBottomMargin && (this.marginBottom += a))
            });
            x.prototype.callbacks.push(C);
            d(x, "destroy", function() {
                for (var a = 0; a < I.length; a++) {
                    var b = I[a];
                    if (b[0] === this) {
                        b[1].forEach(function(a) {
                            return a()
                        });
                        I.splice(a, 1);
                        break
                    }
                }
            });
            E.RangeSelector = q
        }
        return q
    });
    P(c, "Core/Chart/StockChart.js", [c["Core/Animation/AnimationUtilities.js"], c["Core/Axis/Axis.js"], c["Core/Chart/Chart.js"], c["Core/FormatUtilities.js"], c["Core/DefaultOptions.js"], c["Core/Color/Palette.js"], c["Core/Series/Point.js"], c["Core/Series/Series.js"], c["Core/Renderer/SVG/SVGRenderer.js"], c["Core/Utilities.js"]], function(c, x, E, H, A, F, G, J, p, d) {
        function l(a, b) {
            return "xAxis" === a ? {
                minPadding: 0,
                maxPadding: 0,
                overscroll: 0,
                ordinal: !0,
                title: {
                    text: null
                },
                labels: {
                    overflow: "justify"
                },
                showLastLabel: !0
            } : "yAxis" === a ? {
                labels: {
                    y: -2
                },
                opposite: z(b.opposite, !0),
                showLastLabel: !(!b.categories && "category" !== b.type),
                title: {
                    text: null
                }
            } : {}
        }
        function b(a, b) {
            if ("xAxis" === a) {
                a = y();
                var c = {
                    type: "datetime",
                    categories: void 0
                };
                z(b.navigator && b.navigator.enabled, a.navigator.enabled, !0) && (c.startOnTick = !1,
                c.endOnTick = !1);
                return c
            }
            return {}
        }
        var g = this && this.__extends || function() {
            var a = function(b, c) {
                a = Object.setPrototypeOf || {
                    __proto__: []
                }instanceof Array && function(a, b) {
                    a.__proto__ = b
                }
                || function(a, b) {
                    for (var c in b)
                        b.hasOwnProperty(c) && (a[c] = b[c])
                }
                ;
                return a(b, c)
            };
            return function(b, c) {
                function d() {
                    this.constructor = b
                }
                a(b, c);
                b.prototype = null === c ? Object.create(c) : (d.prototype = c.prototype,
                new d)
            }
        }()
          , n = c.animObject
          , D = H.format
          , y = A.getOptions
          , v = G.prototype.tooltipFormatter;
        c = J.prototype;
        var k = c.init
          , L = c.processData;
        c = d.addEvent;
        var M = d.arrayMax
          , B = d.arrayMin
          , w = d.clamp
          , e = d.defined
          , r = d.extend
          , a = d.find
          , q = d.isNumber
          , I = d.isString
          , C = d.merge
          , z = d.pick
          , m = d.splat;
        d = function(a) {
            function c() {
                return null !== a && a.apply(this, arguments) || this
            }
            g(c, a);
            c.prototype.init = function(c, d) {
                var e = y()
                  , f = c.xAxis
                  , g = c.yAxis
                  , h = z(c.navigator && c.navigator.enabled, e.navigator.enabled, !0);
                c.xAxis = c.yAxis = void 0;
                h = C({
                    chart: {
                        panning: {
                            enabled: !0,
                            type: "x"
                        },
                        pinchType: "x"
                    },
                    navigator: {
                        enabled: h
                    },
                    scrollbar: {
                        enabled: z(e.scrollbar && e.scrollbar.enabled, !0)
                    },
                    rangeSelector: {
                        enabled: z(e.rangeSelector.enabled, !0)
                    },
                    title: {
                        text: null
                    },
                    tooltip: {
                        split: z(e.tooltip.split, !0),
                        crosshairs: !0
                    },
                    legend: {
                        enabled: !1
                    }
                }, c, {
                    isStock: !0
                });
                c.xAxis = f;
                c.yAxis = g;
                h.xAxis = m(c.xAxis || {}).map(function(a, d) {
                    return C(l("xAxis", a), e.xAxis, e.xAxis && e.xAxis[d], a, b("xAxis", c))
                });
                h.yAxis = m(c.yAxis || {}).map(function(a, b) {
                    return C(l("yAxis", a), e.yAxis, e.yAxis && e.yAxis[b], a)
                });
                a.prototype.init.call(this, h, d)
            }
            ;
            c.prototype.createAxis = function(c, d) {
                d.axis = C(l(c, d.axis), d.axis, b(c, this.userOptions));
                return a.prototype.createAxis.call(this, c, d)
            }
            ;
            return c
        }(E);
        (function(a) {
            a.stockChart = function(b, c, d) {
                return new a(b,c,d)
            }
        }
        )(d || (d = {}));
        c(J, "setOptions", function(a) {
            var b;
            this.chart.options.isStock && (this.is("column") || this.is("columnrange") ? b = {
                borderWidth: 0,
                shadow: !1
            } : this.is("scatter") || this.is("sma") || (b = {
                marker: {
                    enabled: !1,
                    radius: 2
                }
            }),
            b && (a.plotOptions[this.type] = C(a.plotOptions[this.type], b)))
        });
        c(x, "autoLabelAlign", function(a) {
            var b = this.chart
              , c = this.options;
            b = b._labelPanes = b._labelPanes || {};
            var d = this.options.labels;
            this.chart.options.isStock && "yAxis" === this.coll && (c = c.top + "," + c.height,
            !b[c] && d.enabled && (15 === d.x && (d.x = 0),
            "undefined" === typeof d.align && (d.align = "right"),
            b[c] = this,
            a.align = "right",
            a.preventDefault()))
        });
        c(x, "destroy", function() {
            var a = this.chart
              , b = this.options && this.options.top + "," + this.options.height;
            b && a._labelPanes && a._labelPanes[b] === this && delete a._labelPanes[b]
        });
        c(x, "getPlotLinePath", function(b) {
            function c(a) {
                var b = "xAxis" === a ? "yAxis" : "xAxis";
                a = d.options[b];
                return q(a) ? [g[b][a]] : I(a) ? [g.get(a)] : f.map(function(a) {
                    return a[b]
                })
            }
            var d = this, f = this.isLinked && !this.series ? this.linkedParent.series : this.series, g = d.chart, k = g.renderer, l = d.left, m = d.top, n, p, r, v, x = [], y = [], A = b.translatedValue, B = b.value, C = b.force;
            if (g.options.isStock && !1 !== b.acrossPanes && "xAxis" === d.coll || "yAxis" === d.coll) {
                b.preventDefault();
                y = c(d.coll);
                var D = d.isXAxis ? g.yAxis : g.xAxis;
                D.forEach(function(a) {
                    if (e(a.options.id) ? -1 === a.options.id.indexOf("navigator") : 1) {
                        var b = a.isXAxis ? "yAxis" : "xAxis";
                        b = e(a.options[b]) ? g[b][a.options[b]] : g[b][0];
                        d === b && y.push(a)
                    }
                });
                var E = y.length ? [] : [d.isXAxis ? g.yAxis[0] : g.xAxis[0]];
                y.forEach(function(b) {
                    -1 !== E.indexOf(b) || a(E, function(a) {
                        return a.pos === b.pos && a.len === b.len
                    }) || E.push(b)
                });
                var F = z(A, d.translate(B, null, null, b.old));
                q(F) && (d.horiz ? E.forEach(function(a) {
                    var b;
                    p = a.pos;
                    v = p + a.len;
                    n = r = Math.round(F + d.transB);
                    "pass" !== C && (n < l || n > l + d.width) && (C ? n = r = w(n, l, l + d.width) : b = !0);
                    b || x.push(["M", n, p], ["L", r, v])
                }) : E.forEach(function(a) {
                    var b;
                    n = a.pos;
                    r = n + a.len;
                    p = v = Math.round(m + d.height - F);
                    "pass" !== C && (p < m || p > m + d.height) && (C ? p = v = w(p, m, m + d.height) : b = !0);
                    b || x.push(["M", n, p], ["L", r, v])
                }));
                b.path = 0 < x.length ? k.crispPolyLine(x, b.lineWidth || 1) : null
            }
        });
        p.prototype.crispPolyLine = function(a, b) {
            for (var c = 0; c < a.length; c += 2) {
                var d = a[c]
                  , e = a[c + 1];
                d[1] === e[1] && (d[1] = e[1] = Math.round(d[1]) - b % 2 / 2);
                d[2] === e[2] && (d[2] = e[2] = Math.round(d[2]) + b % 2 / 2)
            }
            return a
        }
        ;
        c(x, "afterHideCrosshair", function() {
            this.crossLabel && (this.crossLabel = this.crossLabel.hide())
        });
        c(x, "afterDrawCrosshair", function(a) {
            var b, c;
            if (this.crosshair && this.crosshair.label && this.crosshair.label.enabled && this.cross && q(this.min) && q(this.max)) {
                var d = this.chart
                  , e = this.logarithmic
                  , f = this.crosshair.label
                  , g = this.horiz
                  , k = this.opposite
                  , l = this.left
                  , m = this.top
                  , n = this.crossLabel
                  , p = f.format
                  , v = ""
                  , w = "inside" === this.options.tickPosition
                  , x = !1 !== this.crosshair.snap
                  , y = 0
                  , A = a.e || this.cross && this.cross.e;
                a = a.point;
                var B = this.min
                  , C = this.max;
                e && (B = e.lin2log(B),
                C = e.lin2log(C));
                e = g ? "center" : k ? "right" === this.labelAlign ? "right" : "left" : "left" === this.labelAlign ? "left" : "center";
                n || (n = this.crossLabel = d.renderer.label("", 0, void 0, f.shape || "callout").addClass("highcharts-crosshair-label highcharts-color-" + (a ? a.series.colorIndex : this.series[0] && this.series[0].colorIndex)).attr({
                    align: f.align || e,
                    padding: z(f.padding, 8),
                    r: z(f.borderRadius, 3),
                    zIndex: 2
                }).add(this.labelGroup),
                d.styledMode || n.attr({
                    fill: f.backgroundColor || a && a.series && a.series.color || F.neutralColor60,
                    stroke: f.borderColor || "",
                    "stroke-width": f.borderWidth || 0
                }).css(r({
                    color: F.backgroundColor,
                    fontWeight: "normal",
                    fontSize: "11px",
                    textAlign: "center"
                }, f.style || {})));
                g ? (e = x ? (a.plotX || 0) + l : A.chartX,
                m += k ? 0 : this.height) : (e = k ? this.width + l : 0,
                m = x ? (a.plotY || 0) + m : A.chartY);
                p || f.formatter || (this.dateTime && (v = "%b %d, %Y"),
                p = "{value" + (v ? ":" + v : "") + "}");
                v = x ? this.isXAxis ? a.x : a.y : this.toValue(g ? A.chartX : A.chartY);
                x = a ? a.series.isPointInside(a) : q(v) && v > B && v < C;
                A = "";
                p ? A = D(p, {
                    value: v
                }, d) : f.formatter && q(v) && (A = f.formatter.call(this, v));
                n.attr({
                    text: A,
                    x: e,
                    y: m,
                    visibility: x ? "visible" : "hidden"
                });
                f = n.getBBox();
                if (q(n.y))
                    if (g) {
                        if (w && !k || !w && k)
                            m = n.y - f.height
                    } else
                        m = n.y - f.height / 2;
                g ? (b = l - f.x,
                c = l + this.width - f.x) : (b = "left" === this.labelAlign ? l : 0,
                c = "right" === this.labelAlign ? l + this.width : d.chartWidth);
                n.translateX < b && (y = b - n.translateX);
                n.translateX + f.width >= c && (y = -(n.translateX + f.width - c));
                n.attr({
                    x: e + y,
                    y: m,
                    anchorX: g ? e : this.opposite ? 0 : d.chartWidth,
                    anchorY: g ? this.opposite ? d.chartHeight : 0 : m + f.height / 2
                })
            }
        });
        J.prototype.init = function() {
            k.apply(this, arguments);
            this.initCompare(this.options.compare)
        }
        ;
        J.prototype.setCompare = function(a) {
            this.initCompare(a);
            this.userOptions.compare = a
        }
        ;
        J.prototype.initCompare = function(a) {
            this.modifyValue = "value" === a || "percent" === a ? function(b, c) {
                var d = this.compareValue;
                return "undefined" !== typeof b && "undefined" !== typeof d ? (b = "value" === a ? b - d : b / d * 100 - (100 === this.options.compareBase ? 0 : 100),
                c && (c.change = b),
                b) : 0
            }
            : null;
            this.chart.hasRendered && (this.isDirty = !0)
        }
        ;
        J.prototype.processData = function(a) {
            var b, c = -1, d = !0 === this.options.compareStart ? 0 : 1;
            L.apply(this, arguments);
            if (this.xAxis && this.processedYData) {
                var e = this.processedXData;
                var f = this.processedYData;
                var g = f.length;
                this.pointArrayMap && (c = this.pointArrayMap.indexOf(this.options.pointValKey || this.pointValKey || "y"));
                for (b = 0; b < g - d; b++) {
                    var k = f[b] && -1 < c ? f[b][c] : f[b];
                    if (q(k) && e[b + d] >= this.xAxis.min && 0 !== k) {
                        this.compareValue = k;
                        break
                    }
                }
            }
        }
        ;
        c(J, "afterGetExtremes", function(a) {
            a = a.dataExtremes;
            if (this.modifyValue && a) {
                var b = [this.modifyValue(a.dataMin), this.modifyValue(a.dataMax)];
                a.dataMin = B(b);
                a.dataMax = M(b)
            }
        });
        x.prototype.setCompare = function(a, b) {
            this.isXAxis || (this.series.forEach(function(b) {
                b.setCompare(a)
            }),
            z(b, !0) && this.chart.redraw())
        }
        ;
        G.prototype.tooltipFormatter = function(a) {
            var b = this.series.chart.numberFormatter;
            a = a.replace("{point.change}", (0 < this.change ? "+" : "") + b(this.change, z(this.series.tooltipOptions.changeDecimals, 2)));
            return v.apply(this, [a])
        }
        ;
        c(J, "render", function() {
            var a = this.chart;
            if (!(a.is3d && a.is3d() || a.polar) && this.xAxis && !this.xAxis.isRadial && !1 !== this.options.clip) {
                var b = this.yAxis.len;
                if (this.xAxis.axisLine) {
                    var c = a.plotTop + a.plotHeight - this.yAxis.pos - this.yAxis.len
                      , d = Math.floor(this.xAxis.axisLine.strokeWidth() / 2);
                    0 <= c && (b -= Math.max(d - c, 0))
                }
                if (!a.hasLoaded || !this.clipBox && this.isDirty && !this.isDirtyData)
                    this.clipBox = this.clipBox || C(a.clipBox),
                    this.clipBox.width = this.xAxis.len,
                    this.clipBox.height = b;
                a.hasRendered && (c = n(this.options.animation),
                c = this.getSharedClipKey(c),
                d = a.sharedClips[c]) && (d.animate({
                    width: this.xAxis.len,
                    height: b
                }),
                (a = a.sharedClips[c + "m"]) && a.animate({
                    width: this.xAxis.len
                }))
            }
        });
        c(E, "update", function(a) {
            a = a.options;
            "scrollbar"in a && this.navigator && (C(!0, this.options.scrollbar, a.scrollbar),
            this.navigator.update({}, !1),
            delete a.scrollbar)
        });
        "";
        return d
    });
    P(c, "masters/modules/stock.src.js", [c["Core/Globals.js"], c["Core/Scrollbar.js"], c["Core/Chart/StockChart.js"]], function(c, x, E) {
        c.Scrollbar = x;
        c.StockChart = c.stockChart = E.stockChart;
        x.compose(c.Axis)
    });
    P(c, "masters/highstock.src.js", [c["masters/highcharts.src.js"]], function(c) {
        c.product = "Highstock";
        return c
    });
    c["masters/highstock.src.js"]._modules = c;
    return c["masters/highstock.src.js"]
});
//# sourceMappingURL=highstock.js.map
