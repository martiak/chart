/*
 Highcharts JS v9.1.2 (2021-06-16)

 Data module

 (c) 2012-2021 Torstein Honsi

 License: www.highcharts.com/license
*/
'use strict';
(function(b) {
    "object" === typeof module && module.exports ? (b["default"] = b,
    module.exports = b) : "function" === typeof define && define.amd ? define("highcharts/modules/data", ["highcharts"], function(p) {
        b(p);
        b.Highcharts = p;
        return b
    }) : b("undefined" !== typeof Highcharts ? Highcharts : void 0)
}
)(function(b) {
    function p(b, x, u, p) {
        b.hasOwnProperty(x) || (b[x] = p.apply(null, u))
    }
    b = b ? b._modules : {};
    p(b, "Extensions/Ajax.js", [b["Core/Globals.js"], b["Core/Utilities.js"]], function(b, p) {
        var u = p.merge
          , x = p.objectEach;
        b.ajax = function(b) {
            var c = u(!0, {
                url: !1,
                type: "get",
                dataType: "json",
                success: !1,
                error: !1,
                data: !1,
                headers: {}
            }, b);
            b = {
                json: "application/json",
                xml: "application/xml",
                text: "text/plain",
                octet: "application/octet-stream"
            };
            var r = new XMLHttpRequest;
            if (!c.url)
                return !1;
            r.open(c.type.toUpperCase(), c.url, !0);
            c.headers["Content-Type"] || r.setRequestHeader("Content-Type", b[c.dataType] || b.text);
            x(c.headers, function(b, c) {
                r.setRequestHeader(c, b)
            });
            r.onreadystatechange = function() {
                if (4 === r.readyState) {
                    if (200 === r.status) {
                        var b = r.responseText;
                        if ("json" === c.dataType)
                            try {
                                b = JSON.parse(b)
                            } catch (B) {
                                c.error && c.error(r, B);
                                return
                            }
                        return c.success && c.success(b)
                    }
                    c.error && c.error(r, r.responseText)
                }
            }
            ;
            try {
                c.data = JSON.stringify(c.data)
            } catch (P) {}
            r.send(c.data || !0)
        }
        ;
        b.getJSON = function(p, c) {
            b.ajax({
                url: p,
                success: c,
                dataType: "json",
                headers: {
                    "Content-Type": "text/plain"
                }
            })
        }
        ;
        return {
            ajax: b.ajax,
            getJSON: b.getJSON
        }
    });
    p(b, "Extensions/Data.js", [b["Extensions/Ajax.js"], b["Core/Chart/Chart.js"], b["Core/Globals.js"], b["Core/Series/Point.js"], b["Core/Series/SeriesRegistry.js"], b["Core/Utilities.js"]], function(b, p, u, G, H, c) {
        var r = b.ajax
          , x = u.doc
          , B = H.seriesTypes;
        b = c.addEvent;
        var I = c.defined
          , J = c.extend
          , K = c.fireEvent
          , E = c.isNumber
          , D = c.merge
          , L = c.objectEach
          , M = c.pick
          , N = c.splat;
        c = function() {
            function b(a, d, g) {
                this.options = this.rawColumns = this.firstRowAsNames = this.chartOptions = this.chart = void 0;
                this.dateFormats = {
                    "YYYY/mm/dd": {
                        regex: /^([0-9]{4})[\-\/\.]([0-9]{1,2})[\-\/\.]([0-9]{1,2})$/,
                        parser: function(a) {
                            return a ? Date.UTC(+a[1], a[2] - 1, +a[3]) : NaN
                        }
                    },
                    "dd/mm/YYYY": {
                        regex: /^([0-9]{1,2})[\-\/\.]([0-9]{1,2})[\-\/\.]([0-9]{4})$/,
                        parser: function(a) {
                            return a ? Date.UTC(+a[3], a[2] - 1, +a[1]) : NaN
                        },
                        alternative: "mm/dd/YYYY"
                    },
                    "mm/dd/YYYY": {
                        regex: /^([0-9]{1,2})[\-\/\.]([0-9]{1,2})[\-\/\.]([0-9]{4})$/,
                        parser: function(a) {
                            return a ? Date.UTC(+a[3], a[1] - 1, +a[2]) : NaN
                        }
                    },
                    "dd/mm/YY": {
                        regex: /^([0-9]{1,2})[\-\/\.]([0-9]{1,2})[\-\/\.]([0-9]{2})$/,
                        parser: function(a) {
                            if (!a)
                                return NaN;
                            var d = +a[3];
                            d = d > (new Date).getFullYear() - 2E3 ? d + 1900 : d + 2E3;
                            return Date.UTC(d, a[2] - 1, +a[1])
                        },
                        alternative: "mm/dd/YY"
                    },
                    "mm/dd/YY": {
                        regex: /^([0-9]{1,2})[\-\/\.]([0-9]{1,2})[\-\/\.]([0-9]{2})$/,
                        parser: function(a) {
                            return a ? Date.UTC(+a[3] + 2E3, a[1] - 1, +a[2]) : NaN
                        }
                    }
                };
                this.init(a, d, g)
            }
            b.prototype.init = function(a, d, g) {
                var e = a.decimalPoint;
                d && (this.chartOptions = d);
                g && (this.chart = g);
                "." !== e && "," !== e && (e = void 0);
                this.options = a;
                this.columns = a.columns || this.rowsToColumns(a.rows) || [];
                this.firstRowAsNames = M(a.firstRowAsNames, this.firstRowAsNames, !0);
                this.decimalRegex = e && new RegExp("^(-?[0-9]+)" + e + "([0-9]+)$");
                this.rawColumns = [];
                if (this.columns.length) {
                    this.dataFound();
                    var k = !0
                }
                this.hasURLOption(a) && (clearTimeout(this.liveDataTimeout),
                k = !1);
                k || (k = this.fetchLiveData());
                k || (k = !!this.parseCSV().length);
                k || (k = !!this.parseTable().length);
                k || (k = this.parseGoogleSpreadsheet());
                !k && a.afterComplete && a.afterComplete()
            }
            ;
            b.prototype.hasURLOption = function(a) {
                return !(!a || !(a.rowsURL || a.csvURL || a.columnsURL))
            }
            ;
            b.prototype.getColumnDistribution = function() {
                var a = this.chartOptions
                  , d = this.options
                  , g = []
                  , e = function(a) {
                    return (B[a || "line"].prototype.pointArrayMap || [0]).length
                }
                  , k = a && a.chart && a.chart.type
                  , h = []
                  , b = []
                  , n = 0;
                d = d && d.seriesMapping || a && a.series && a.series.map(function() {
                    return {
                        x: 0
                    }
                }) || [];
                var f;
                (a && a.series || []).forEach(function(a) {
                    h.push(e(a.type || k))
                });
                d.forEach(function(a) {
                    g.push(a.x || 0)
                });
                0 === g.length && g.push(0);
                d.forEach(function(d) {
                    var g = new F
                      , l = h[n] || e(k)
                      , m = (a && a.series || [])[n] || {}
                      , c = B[m.type || k || "line"].prototype.pointArrayMap
                      , z = c || ["y"];
                    (I(d.x) || m.isCartesian || !c) && g.addColumnReader(d.x, "x");
                    L(d, function(a, d) {
                        "x" !== d && g.addColumnReader(a, d)
                    });
                    for (f = 0; f < l; f++)
                        g.hasReader(z[f]) || g.addColumnReader(void 0, z[f]);
                    b.push(g);
                    n++
                });
                d = B[k || "line"].prototype.pointArrayMap;
                "undefined" === typeof d && (d = ["y"]);
                this.valueCount = {
                    global: e(k),
                    xColumns: g,
                    individual: h,
                    seriesBuilders: b,
                    globalPointArrayMap: d
                }
            }
            ;
            b.prototype.dataFound = function() {
                this.options.switchRowsAndColumns && (this.columns = this.rowsToColumns(this.columns));
                this.getColumnDistribution();
                this.parseTypes();
                !1 !== this.parsed() && this.complete()
            }
            ;
            b.prototype.parseCSV = function(a) {
                function d(a, d, g, e) {
                    function b(d) {
                        c = a[d];
                        l = a[d - 1];
                        q = a[d + 1]
                    }
                    function k(a) {
                        v.length < t + 1 && v.push([a]);
                        v[t][v[t].length - 1] !== a && v[t].push(a)
                    }
                    function h() {
                        f > n || n > O ? (++n,
                        m = "") : (!isNaN(parseFloat(m)) && isFinite(m) ? (m = parseFloat(m),
                        k("number")) : isNaN(Date.parse(m)) ? k("string") : (m = m.replace(/\//g, "-"),
                        k("date")),
                        C.length < t + 1 && C.push([]),
                        g || (C[t][d] = m),
                        m = "",
                        ++t,
                        ++n)
                    }
                    var A = 0
                      , c = ""
                      , l = ""
                      , q = ""
                      , m = ""
                      , n = 0
                      , t = 0;
                    if (a.trim().length && "#" !== a.trim()[0]) {
                        for (; A < a.length; A++)
                            if (b(A),
                            '"' === c)
                                for (b(++A); A < a.length && ('"' !== c || '"' === l || '"' === q); ) {
                                    if ('"' !== c || '"' === c && '"' !== l)
                                        m += c;
                                    b(++A)
                                }
                            else
                                e && e[c] ? e[c](c, m) && h() : c === z ? h() : m += c;
                        h()
                    }
                }
                function g(a) {
                    var d = 0
                      , g = 0
                      , e = !1;
                    a.some(function(a, e) {
                        var b = !1
                          , k = "";
                        if (13 < e)
                            return !0;
                        for (var c = 0; c < a.length; c++) {
                            e = a[c];
                            var h = a[c + 1];
                            var f = a[c - 1];
                            if ("#" === e)
                                break;
                            if ('"' === e)
                                if (b) {
                                    if ('"' !== f && '"' !== h) {
                                        for (; " " === h && c < a.length; )
                                            h = a[++c];
                                        "undefined" !== typeof m[h] && m[h]++;
                                        b = !1
                                    }
                                } else
                                    b = !0;
                            else
                                "undefined" !== typeof m[e] ? (k = k.trim(),
                                isNaN(Date.parse(k)) ? !isNaN(k) && isFinite(k) || m[e]++ : m[e]++,
                                k = "") : k += e;
                            "," === e && g++;
                            "." === e && d++
                        }
                    });
                    e = m[";"] > m[","] ? ";" : ",";
                    b.decimalPoint || (b.decimalPoint = d > g ? "." : ",",
                    k.decimalRegex = new RegExp("^(-?[0-9]+)" + b.decimalPoint + "([0-9]+)$"));
                    return e
                }
                function e(a, d) {
                    var e = [], g = 0, c = !1, h = [], m = [], f;
                    if (!d || d > a.length)
                        d = a.length;
                    for (; g < d; g++)
                        if ("undefined" !== typeof a[g] && a[g] && a[g].length) {
                            var l = a[g].trim().replace(/\//g, " ").replace(/\-/g, " ").replace(/\./g, " ").split(" ");
                            e = ["", "", ""];
                            for (f = 0; f < l.length; f++)
                                f < e.length && (l[f] = parseInt(l[f], 10),
                                l[f] && (m[f] = !m[f] || m[f] < l[f] ? l[f] : m[f],
                                "undefined" !== typeof h[f] ? h[f] !== l[f] && (h[f] = !1) : h[f] = l[f],
                                31 < l[f] ? e[f] = 100 > l[f] ? "YY" : "YYYY" : 12 < l[f] && 31 >= l[f] ? (e[f] = "dd",
                                c = !0) : e[f].length || (e[f] = "mm")))
                        }
                    if (c) {
                        for (f = 0; f < h.length; f++)
                            !1 !== h[f] ? 12 < m[f] && "YY" !== e[f] && "YYYY" !== e[f] && (e[f] = "YY") : 12 < m[f] && "mm" === e[f] && (e[f] = "dd");
                        3 === e.length && "dd" === e[1] && "dd" === e[2] && (e[2] = "YY");
                        a = e.join("/");
                        return (b.dateFormats || k.dateFormats)[a] ? a : (K("deduceDateFailed"),
                        "YYYY/mm/dd")
                    }
                    return "YYYY/mm/dd"
                }
                var k = this
                  , b = a || this.options
                  , l = b.csv;
                a = "undefined" !== typeof b.startRow && b.startRow ? b.startRow : 0;
                var c = b.endRow || Number.MAX_VALUE
                  , f = "undefined" !== typeof b.startColumn && b.startColumn ? b.startColumn : 0
                  , O = b.endColumn || Number.MAX_VALUE
                  , q = 0
                  , v = []
                  , m = {
                    ",": 0,
                    ";": 0,
                    "\t": 0
                };
                var C = this.columns = [];
                l && b.beforeParse && (l = b.beforeParse.call(this, l));
                if (l) {
                    l = l.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split(b.lineDelimiter || "\n");
                    if (!a || 0 > a)
                        a = 0;
                    if (!c || c >= l.length)
                        c = l.length - 1;
                    if (b.itemDelimiter)
                        var z = b.itemDelimiter;
                    else
                        z = null,
                        z = g(l);
                    var w = 0;
                    for (q = a; q <= c; q++)
                        "#" === l[q][0] ? w++ : d(l[q], q - a - w);
                    b.columnTypes && 0 !== b.columnTypes.length || !v.length || !v[0].length || "date" !== v[0][1] || b.dateFormat || (b.dateFormat = e(C[0]));
                    this.dataFound()
                }
                return C
            }
            ;
            b.prototype.parseTable = function() {
                var a = this.options
                  , d = a.table
                  , g = this.columns || []
                  , e = a.startRow || 0
                  , b = a.endRow || Number.MAX_VALUE
                  , c = a.startColumn || 0
                  , l = a.endColumn || Number.MAX_VALUE;
                d && ("string" === typeof d && (d = x.getElementById(d)),
                [].forEach.call(d.getElementsByTagName("tr"), function(a, d) {
                    d >= e && d <= b && [].forEach.call(a.children, function(a, b) {
                        var k = g[b - c]
                          , f = 1;
                        if (("TD" === a.tagName || "TH" === a.tagName) && b >= c && b <= l)
                            for (g[b - c] || (g[b - c] = []),
                            g[b - c][d - e] = a.innerHTML; d - e >= f && void 0 === k[d - e - f]; )
                                k[d - e - f] = null,
                                f++
                    })
                }),
                this.dataFound());
                return g
            }
            ;
            b.prototype.fetchLiveData = function() {
                function a(k) {
                    function f(f, h, m) {
                        function n() {
                            c && g.liveDataURL === f && (d.liveDataTimeout = setTimeout(a, l))
                        }
                        if (!f || !/^(http|\/|\.\/|\.\.\/)/.test(f))
                            return f && e.error && e.error("Invalid URL"),
                            !1;
                        k && (clearTimeout(d.liveDataTimeout),
                        g.liveDataURL = f);
                        r({
                            url: f,
                            dataType: m || "json",
                            success: function(a) {
                                g && g.series && h(a);
                                n()
                            },
                            error: function(a, d) {
                                3 > ++b && n();
                                return e.error && e.error(d, a)
                            }
                        });
                        return !0
                    }
                    f(n.csvURL, function(a) {
                        g.update({
                            data: {
                                csv: a
                            }
                        })
                    }, "text") || f(n.rowsURL, function(a) {
                        g.update({
                            data: {
                                rows: a
                            }
                        })
                    }) || f(n.columnsURL, function(a) {
                        g.update({
                            data: {
                                columns: a
                            }
                        })
                    })
                }
                var d = this
                  , g = this.chart
                  , e = this.options
                  , b = 0
                  , c = e.enablePolling
                  , l = 1E3 * (e.dataRefreshRate || 2)
                  , n = D(e);
                if (!this.hasURLOption(e))
                    return !1;
                1E3 > l && (l = 1E3);
                delete e.csvURL;
                delete e.rowsURL;
                delete e.columnsURL;
                a(!0);
                return this.hasURLOption(e)
            }
            ;
            b.prototype.parseGoogleSpreadsheet = function() {
                function a(d) {
                    var b = ["https://spreadsheets.google.com/feeds/cells", e, c, "public/values?alt=json"].join("/");
                    r({
                        url: b,
                        dataType: "json",
                        success: function(e) {
                            d(e);
                            g.enablePolling && setTimeout(function() {
                                a(d)
                            }, 1E3 * (g.dataRefreshRate || 2))
                        },
                        error: function(a, d) {
                            return g.error && g.error(d, a)
                        }
                    })
                }
                var d = this
                  , g = this.options
                  , e = g.googleSpreadsheetKey
                  , b = this.chart
                  , c = g.googleSpreadsheetWorksheet || 1
                  , l = g.startRow || 0
                  , n = g.endRow || Number.MAX_VALUE
                  , f = g.startColumn || 0
                  , p = g.endColumn || Number.MAX_VALUE
                  , q = 1E3 * (g.dataRefreshRate || 2);
                4E3 > q && (q = 4E3);
                e && (delete g.googleSpreadsheetKey,
                a(function(a) {
                    var e = [];
                    a = a.feed.entry;
                    var g = (a || []).length, k = 0, c;
                    if (!a || 0 === a.length)
                        return !1;
                    for (c = 0; c < g; c++) {
                        var h = a[c];
                        k = Math.max(k, h.gs$cell.col)
                    }
                    for (c = 0; c < k; c++)
                        c >= f && c <= p && (e[c - f] = []);
                    for (c = 0; c < g; c++) {
                        h = a[c];
                        k = h.gs$cell.row - 1;
                        var q = h.gs$cell.col - 1;
                        if (q >= f && q <= p && k >= l && k <= n) {
                            var t = h.gs$cell || h.content;
                            h = null;
                            t.numericValue ? h = 0 <= t.$t.indexOf("/") || 0 <= t.$t.indexOf("-") ? t.$t : 0 < t.$t.indexOf("%") ? 100 * parseFloat(t.numericValue) : parseFloat(t.numericValue) : t.$t && t.$t.length && (h = t.$t);
                            e[q - f][k - l] = h
                        }
                    }
                    e.forEach(function(a) {
                        for (c = 0; c < a.length; c++)
                            "undefined" === typeof a[c] && (a[c] = null)
                    });
                    b && b.series ? b.update({
                        data: {
                            columns: e
                        }
                    }) : (d.columns = e,
                    d.dataFound())
                }));
                return !1
            }
            ;
            b.prototype.trim = function(a, d) {
                "string" === typeof a && (a = a.replace(/^\s+|\s+$/g, ""),
                d && /^[0-9\s]+$/.test(a) && (a = a.replace(/\s/g, "")),
                this.decimalRegex && (a = a.replace(this.decimalRegex, "$1.$2")));
                return a
            }
            ;
            b.prototype.parseTypes = function() {
                for (var a = this.columns, d = a.length; d--; )
                    this.parseColumn(a[d], d)
            }
            ;
            b.prototype.parseColumn = function(a, d) {
                var g = this.rawColumns, e = this.columns, b = a.length, c = this.firstRowAsNames, l = -1 !== this.valueCount.xColumns.indexOf(d), n, f = [], p = this.chartOptions, q, r = (this.options.columnTypes || [])[d];
                p = l && (p && p.xAxis && "category" === N(p.xAxis)[0].type || "string" === r);
                for (g[d] || (g[d] = []); b--; ) {
                    var m = f[b] || a[b];
                    var y = this.trim(m);
                    var u = this.trim(m, !0);
                    var w = parseFloat(u);
                    "undefined" === typeof g[d][b] && (g[d][b] = y);
                    p || 0 === b && c ? a[b] = "" + y : +u === w ? (a[b] = w,
                    31536E6 < w && "float" !== r ? a.isDatetime = !0 : a.isNumeric = !0,
                    "undefined" !== typeof a[b + 1] && (q = w > a[b + 1])) : (y && y.length && (n = this.parseDate(m)),
                    l && E(n) && "float" !== r ? (f[b] = m,
                    a[b] = n,
                    a.isDatetime = !0,
                    "undefined" !== typeof a[b + 1] && (m = n > a[b + 1],
                    m !== q && "undefined" !== typeof q && (this.alternativeFormat ? (this.dateFormat = this.alternativeFormat,
                    b = a.length,
                    this.alternativeFormat = this.dateFormats[this.dateFormat].alternative) : a.unsorted = !0),
                    q = m)) : (a[b] = "" === y ? null : y,
                    0 !== b && (a.isDatetime || a.isNumeric) && (a.mixed = !0)))
                }
                l && a.mixed && (e[d] = g[d]);
                if (l && q && this.options.sort)
                    for (d = 0; d < e.length; d++)
                        e[d].reverse(),
                        c && e[d].unshift(e[d].pop())
            }
            ;
            b.prototype.parseDate = function(a) {
                var d = this.options.parseDate, b, e = this.options.dateFormat || this.dateFormat, c;
                if (d)
                    var h = d(a);
                else if ("string" === typeof a) {
                    if (e)
                        (d = this.dateFormats[e]) || (d = this.dateFormats["YYYY/mm/dd"]),
                        (c = a.match(d.regex)) && (h = d.parser(c));
                    else
                        for (b in this.dateFormats)
                            if (d = this.dateFormats[b],
                            c = a.match(d.regex)) {
                                this.dateFormat = b;
                                this.alternativeFormat = d.alternative;
                                h = d.parser(c);
                                break
                            }
                    c || (a.match(/:.+(GMT|UTC|[Z+-])/) && (a = a.replace(/\s*(?:GMT|UTC)?([+-])(\d\d)(\d\d)$/, "$1$2:$3").replace(/(?:\s+|GMT|UTC)([+-])/, "$1").replace(/(\d)\s*(?:GMT|UTC|Z)$/, "$1+00:00")),
                    c = Date.parse(a),
                    "object" === typeof c && null !== c && c.getTime ? h = c.getTime() - 6E4 * c.getTimezoneOffset() : E(c) && (h = c - 6E4 * (new Date(c)).getTimezoneOffset()))
                }
                return h
            }
            ;
            b.prototype.rowsToColumns = function(a) {
                var d, b;
                if (a) {
                    var e = [];
                    var c = a.length;
                    for (d = 0; d < c; d++) {
                        var h = a[d].length;
                        for (b = 0; b < h; b++)
                            e[b] || (e[b] = []),
                            e[b][d] = a[d][b]
                    }
                }
                return e
            }
            ;
            b.prototype.getData = function() {
                if (this.columns)
                    return this.rowsToColumns(this.columns).slice(1)
            }
            ;
            b.prototype.parsed = function() {
                if (this.options.parsed)
                    return this.options.parsed.call(this, this.columns)
            }
            ;
            b.prototype.getFreeIndexes = function(a, d) {
                var b, e = [], c = [];
                for (b = 0; b < a; b += 1)
                    e.push(!0);
                for (a = 0; a < d.length; a += 1) {
                    var h = d[a].getReferencedColumnIndexes();
                    for (b = 0; b < h.length; b += 1)
                        e[h[b]] = !1
                }
                for (b = 0; b < e.length; b += 1)
                    e[b] && c.push(b);
                return c
            }
            ;
            b.prototype.complete = function() {
                var a = this.columns, b, c = this.options, e, k, h = [];
                if (c.complete || c.afterComplete) {
                    if (this.firstRowAsNames)
                        for (e = 0; e < a.length; e++)
                            a[e].name = a[e].shift();
                    var l = [];
                    var n = this.getFreeIndexes(a.length, this.valueCount.seriesBuilders);
                    for (e = 0; e < this.valueCount.seriesBuilders.length; e++) {
                        var f = this.valueCount.seriesBuilders[e];
                        f.populateColumns(n) && h.push(f)
                    }
                    for (; 0 < n.length; ) {
                        f = new F;
                        f.addColumnReader(0, "x");
                        e = n.indexOf(0);
                        -1 !== e && n.splice(e, 1);
                        for (e = 0; e < this.valueCount.global; e++)
                            f.addColumnReader(void 0, this.valueCount.globalPointArrayMap[e]);
                        f.populateColumns(n) && h.push(f)
                    }
                    0 < h.length && 0 < h[0].readers.length && (f = a[h[0].readers[0].columnIndex],
                    "undefined" !== typeof f && (f.isDatetime ? b = "datetime" : f.isNumeric || (b = "category")));
                    if ("category" === b)
                        for (e = 0; e < h.length; e++)
                            for (f = h[e],
                            n = 0; n < f.readers.length; n++)
                                "x" === f.readers[n].configName && (f.readers[n].configName = "name");
                    for (e = 0; e < h.length; e++) {
                        f = h[e];
                        n = [];
                        for (k = 0; k < a[0].length; k++)
                            n[k] = f.read(a, k);
                        l[e] = {
                            data: n
                        };
                        f.name && (l[e].name = f.name);
                        "category" === b && (l[e].turboThreshold = 0)
                    }
                    a = {
                        series: l
                    };
                    b && (a.xAxis = {
                        type: b
                    },
                    "category" === b && (a.xAxis.uniqueNames = !1));
                    c.complete && c.complete(a);
                    c.afterComplete && c.afterComplete(a)
                }
            }
            ;
            b.prototype.update = function(a, b) {
                var d = this.chart;
                a && (a.afterComplete = function(a) {
                    a && (a.xAxis && d.xAxis[0] && a.xAxis.type === d.xAxis[0].options.type && delete a.xAxis,
                    d.update(a, b, !0))
                }
                ,
                D(!0, d.options.data, a),
                this.init(d.options.data))
            }
            ;
            return b
        }();
        u.data = function(b, a, d) {
            return new u.Data(b,a,d)
        }
        ;
        b(p, "init", function(b) {
            var a = this
              , d = b.args[0] || {}
              , c = b.args[1];
            d && d.data && !a.hasDataDef && (a.hasDataDef = !0,
            a.data = new u.Data(J(d.data, {
                afterComplete: function(b) {
                    var e;
                    if (Object.hasOwnProperty.call(d, "series"))
                        if ("object" === typeof d.series)
                            for (e = Math.max(d.series.length, b && b.series ? b.series.length : 0); e--; ) {
                                var g = d.series[e] || {};
                                d.series[e] = D(g, b && b.series ? b.series[e] : {})
                            }
                        else
                            delete d.series;
                    d = D(b, d);
                    a.init(d, c)
                }
            }),d,a),
            b.preventDefault())
        });
        var F = function() {
            function b() {
                this.readers = [];
                this.pointIsArray = !0;
                this.name = void 0
            }
            b.prototype.populateColumns = function(a) {
                var b = !0;
                this.readers.forEach(function(b) {
                    "undefined" === typeof b.columnIndex && (b.columnIndex = a.shift())
                });
                this.readers.forEach(function(a) {
                    "undefined" === typeof a.columnIndex && (b = !1)
                });
                return b
            }
            ;
            b.prototype.read = function(a, b) {
                var d = this.pointIsArray
                  , e = d ? [] : {};
                this.readers.forEach(function(c) {
                    var g = a[c.columnIndex][b];
                    d ? e.push(g) : 0 < c.configName.indexOf(".") ? G.prototype.setNestedProperty(e, g, c.configName) : e[c.configName] = g
                });
                if ("undefined" === typeof this.name && 2 <= this.readers.length) {
                    var c = this.getReferencedColumnIndexes();
                    2 <= c.length && (c.shift(),
                    c.sort(function(a, b) {
                        return a - b
                    }),
                    this.name = a[c.shift()].name)
                }
                return e
            }
            ;
            b.prototype.addColumnReader = function(a, b) {
                this.readers.push({
                    columnIndex: a,
                    configName: b
                });
                "x" !== b && "y" !== b && "undefined" !== typeof b && (this.pointIsArray = !1)
            }
            ;
            b.prototype.getReferencedColumnIndexes = function() {
                var a, b = [];
                for (a = 0; a < this.readers.length; a += 1) {
                    var c = this.readers[a];
                    "undefined" !== typeof c.columnIndex && b.push(c.columnIndex)
                }
                return b
            }
            ;
            b.prototype.hasReader = function(a) {
                var b;
                for (b = 0; b < this.readers.length; b += 1) {
                    var c = this.readers[b];
                    if (c.configName === a)
                        return !0
                }
            }
            ;
            return b
        }();
        u.Data = c;
        return u.Data
    });
    p(b, "masters/modules/data.src.js", [], function() {})
});
//# sourceMappingURL=data.js.map
