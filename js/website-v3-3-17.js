/*!
 * Less - Leaner CSS v2.2.0
 * http://lesscss.org
 *
 * Copyright (c) 2009-2015, Alexis Sellier <self@cloudhead.net>
 * Licensed under the Apache v2 License.
 *
 */

/** * @license Apache v2
 */

! function (a) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = a();
    else if ("function" == typeof define && define.amd) define([], a);
    else {
        var b;
        "undefined" != typeof window ? b = window : "undefined" != typeof global ? b = global : "undefined" != typeof self && (b = self), b.less = a()
    }
}(function () {
    return function a(b, c, d) {
        function e(g, h) {
            if (!c[g]) {
                if (!b[g]) {
                    var i = "function" == typeof require && require;
                    if (!h && i) return i(g, !0);
                    if (f) return f(g, !0);
                    var j = new Error("Cannot find module '" + g + "'");
                    throw j.code = "MODULE_NOT_FOUND", j
                }
                var k = c[g] = {
                    exports: {}
                };
                b[g][0].call(k.exports, function (a) {
                    var c = b[g][1][a];
                    return e(c ? c : a)
                }, k, k.exports, a, b, c, d)
            }
            return c[g].exports
        }
        for (var f = "function" == typeof require && require, g = 0; d.length > g; g++) e(d[g]);
        return e
    }({
        1: [function (a, b) {
            var c = a("./utils").addDataAttr,
                d = a("./browser");
            b.exports = function (a, b) {
                c(b, d.currentScript(a)), void 0 === b.isFileProtocol && (b.isFileProtocol = /^(file|(chrome|safari)(-extension)?|resource|qrc|app):/.test(a.location.protocol)), b.async = b.async || !1, b.fileAsync = b.fileAsync || !1, b.poll = b.poll || (b.isFileProtocol ? 1e3 : 1500), b.env = b.env || ("127.0.0.1" == a.location.hostname || "0.0.0.0" == a.location.hostname || "localhost" == a.location.hostname || a.location.port && a.location.port.length > 0 || b.isFileProtocol ? "development" : "production");
                var e = /!dumpLineNumbers:(comments|mediaquery|all)/.exec(a.location.hash);
                e && (b.dumpLineNumbers = e[1]), void 0 === b.useFileCache && (b.useFileCache = !0), void 0 === b.onReady && (b.onReady = !0)
            }
        }, {
            "./browser": 3,
            "./utils": 9
        }],
        2: [function (a, b) {
            a("promise/polyfill.js");
            var c = window.less || {};
            a("./add-default-options")(window, c);
            var d = b.exports = a("./index")(window, c);
            c.onReady && (/!watch/.test(window.location.hash) && d.watch(), d.pageLoadFinished = d.registerStylesheets().then(function () {
                return d.refresh("development" === d.env)
            }))
        }, {
            "./add-default-options": 1,
            "./index": 7,
            "promise/polyfill.js": void 0
        }],
        3: [function (a, b) {
            var c = a("./utils");
            b.exports = {
                createCSS: function (a, b, d) {
                    var e = d.href || "",
                        f = "less:" + (d.title || c.extractId(e)),
                        g = a.getElementById(f),
                        h = !1,
                        i = a.createElement("style");
                    i.setAttribute("type", "text/css"), d.media && i.setAttribute("media", d.media), i.id = f, i.styleSheet || (i.appendChild(a.createTextNode(b)), h = null !== g && g.childNodes.length > 0 && i.childNodes.length > 0 && g.firstChild.nodeValue === i.firstChild.nodeValue);
                    var j = a.getElementsByTagName("head")[0];
                    if (null === g || h === !1) {
                        var k = d && d.nextSibling || null;
                        k ? k.parentNode.insertBefore(i, k) : j.appendChild(i)
                    }
                    if (g && h === !1 && g.parentNode.removeChild(g), i.styleSheet) try {
                        i.styleSheet.cssText = b
                    } catch (l) {
                        throw new Error("Couldn't reassign styleSheet.cssText.")
                    }
                },
                currentScript: function (a) {
                    var b = a.document;
                    return b.currentScript || function () {
                        var a = b.getElementsByTagName("script");
                        return a[a.length - 1]
                    }()
                }
            }
        }, {
            "./utils": 9
        }],
        4: [function (a, b) {
            b.exports = function (a, b, c) {
                var d = null;
                if ("development" !== b.env) try {
                    d = "undefined" == typeof a.localStorage ? null : a.localStorage
                } catch (e) {}
                return {
                    setCSS: function (a, b, e) {
                        if (d) {
                            c.info("saving " + a + " to cache.");
                            try {
                                d.setItem(a, e), d.setItem(a + ":timestamp", b)
                            } catch (f) {
                                c.error('failed to save "' + a + '" to local storage for caching.')
                            }
                        }
                    },
                    getCSS: function (a, b) {
                        var c = d && d.getItem(a),
                            e = d && d.getItem(a + ":timestamp");
                        return e && b.lastModified && new Date(b.lastModified).valueOf() === new Date(e).valueOf() ? c : void 0
                    }
                }
            }
        }, {}],
        5: [function (a, b) {
            var c = a("./utils"),
                d = a("./browser");
            b.exports = function (a, b, e) {
                function f(b, f) {
                    var g, h, i = "less-error-message:" + c.extractId(f || ""),
                        j = '<li><label>{line}</label><pre class="{class}">{content}</pre></li>',
                        k = a.document.createElement("div"),
                        l = [],
                        m = b.filename || f,
                        n = m.match(/([^\/]+(\?.*)?)$/)[1];
                    k.id = i, k.className = "less-error-message", h = "<h3>" + (b.type || "Syntax") + "Error: " + (b.message || "There is an error in your .less file") + '</h3><p>in <a href="' + m + '">' + n + "</a> ";
                    var o = function (a, b, c) {
                        void 0 !== a.extract[b] && l.push(j.replace(/\{line\}/, (parseInt(a.line, 10) || 0) + (b - 1)).replace(/\{class\}/, c).replace(/\{content\}/, a.extract[b]))
                    };
                    b.extract && (o(b, 0, ""), o(b, 1, "line"), o(b, 2, ""), h += "on line " + b.line + ", column " + (b.column + 1) + ":</p><ul>" + l.join("") + "</ul>"), b.stack && (b.extract || e.logLevel >= 4) && (h += "<br/>Stack Trace</br />" + b.stack.split("\n").slice(1).join("<br/>")), k.innerHTML = h, d.createCSS(a.document, [".less-error-message ul, .less-error-message li {", "list-style-type: none;", "margin-right: 15px;", "padding: 4px 0;", "margin: 0;", "}", ".less-error-message label {", "font-size: 12px;", "margin-right: 15px;", "padding: 4px 0;", "color: #cc7777;", "}", ".less-error-message pre {", "color: #dd6666;", "padding: 4px 0;", "margin: 0;", "display: inline-block;", "}", ".less-error-message pre.line {", "color: #ff0000;", "}", ".less-error-message h3 {", "font-size: 20px;", "font-weight: bold;", "padding: 15px 0 5px 0;", "margin: 0;", "}", ".less-error-message a {", "color: #10a", "}", ".less-error-message .error {", "color: red;", "font-weight: bold;", "padding-bottom: 2px;", "border-bottom: 1px dashed red;", "}"].join("\n"), {
                        title: "error-message"
                    }), k.style.cssText = ["font-family: Arial, sans-serif", "border: 1px solid #e00", "background-color: #eee", "border-radius: 5px", "-webkit-border-radius: 5px", "-moz-border-radius: 5px", "color: #e00", "padding: 15px", "margin-bottom: 15px"].join(";"), "development" === e.env && (g = setInterval(function () {
                        var b = a.document,
                            c = b.body;
                        c && (b.getElementById(i) ? c.replaceChild(k, b.getElementById(i)) : c.insertBefore(k, c.firstChild), clearInterval(g))
                    }, 10))
                }

                function g(a, b) {
                    e.errorReporting && "html" !== e.errorReporting ? "console" === e.errorReporting ? k(a, b) : "function" == typeof e.errorReporting && e.errorReporting("add", a, b) : f(a, b)
                }

                function h(b) {
                    var d = a.document.getElementById("less-error-message:" + c.extractId(b));
                    d && d.parentNode.removeChild(d)
                }

                function i() {}

                function j(a) {
                    e.errorReporting && "html" !== e.errorReporting ? "console" === e.errorReporting ? i(a) : "function" == typeof e.errorReporting && e.errorReporting("remove", a) : h(a)
                }

                function k(a, c) {
                    var d = "{line} {content}",
                        f = a.filename || c,
                        g = [],
                        h = (a.type || "Syntax") + "Error: " + (a.message || "There is an error in your .less file") + " in " + f + " ",
                        i = function (a, b, c) {
                            void 0 !== a.extract[b] && g.push(d.replace(/\{line\}/, (parseInt(a.line, 10) || 0) + (b - 1)).replace(/\{class\}/, c).replace(/\{content\}/, a.extract[b]))
                        };
                    a.extract && (i(a, 0, ""), i(a, 1, "line"), i(a, 2, ""), h += "on line " + a.line + ", column " + (a.column + 1) + ":\n" + g.join("\n")), a.stack && (a.extract || e.logLevel >= 4) && (h += "\nStack Trace\n" + a.stack), b.logger.error(h)
                }
                return {
                    add: g,
                    remove: j
                }
            }
        }, {
            "./browser": 3,
            "./utils": 9
        }],
        6: [function (a, b) {
            b.exports = function (b, c) {
                function d() {
                    if (window.XMLHttpRequest && !("file:" === window.location.protocol && "ActiveXObject" in window)) return new XMLHttpRequest;
                    try {
                        return new ActiveXObject("Microsoft.XMLHTTP")
                    } catch (a) {
                        return c.error("browser doesn't support AJAX."), null
                    }
                }
                var e = a("../less/environment/abstract-file-manager.js"),
                    f = {},
                    g = function () {};
                return g.prototype = new e, g.prototype.alwaysMakePathsAbsolute = function () {
                    return !0
                }, g.prototype.join = function (a, b) {
                    return a ? this.extractUrlParts(b, a).path : b
                }, g.prototype.doXHR = function (a, e, f, g) {
                    function h(b, c, d) {
                        b.status >= 200 && 300 > b.status ? c(b.responseText, b.getResponseHeader("Last-Modified")) : "function" == typeof d && d(b.status, a)
                    }
                    var i = d(),
                        j = b.isFileProtocol ? b.fileAsync : b.async;
                    "function" == typeof i.overrideMimeType && i.overrideMimeType("text/css"), c.debug("XHR: Getting '" + a + "'"), i.open("GET", a, j), i.setRequestHeader("Accept", e || "text/x-less, text/css; q=0.9, */*; q=0.5"), i.send(null), b.isFileProtocol && !b.fileAsync ? 0 === i.status || i.status >= 200 && 300 > i.status ? f(i.responseText) : g(i.status, a) : j ? i.onreadystatechange = function () {
                        4 == i.readyState && h(i, f, g)
                    } : h(i, f, g)
                }, g.prototype.supports = function () {
                    return !0
                }, g.prototype.clearFileCache = function () {
                    f = {}
                }, g.prototype.loadFile = function (a, b, c, d, e) {
                    b && !this.isPathAbsolute(a) && (a = b + a), c = c || {};
                    var g = this.extractUrlParts(a, window.location.href),
                        h = g.url;
                    if (c.useFileCache && f[h]) try {
                        var i = f[h];
                        e(null, {
                            contents: i,
                            filename: h,
                            webInfo: {
                                lastModified: new Date
                            }
                        })
                    } catch (j) {
                        e({
                            filename: h,
                            message: "Error loading file " + h + " error was " + j.message
                        })
                    } else this.doXHR(h, c.mime, function (a, b) {
                        f[h] = a, e(null, {
                            contents: a,
                            filename: h,
                            webInfo: {
                                lastModified: b
                            }
                        })
                    }, function (a, b) {
                        e({
                            type: "File",
                            message: "'" + b + "' wasn't found (" + a + ")",
                            href: h
                        })
                    })
                }, g
            }
        }, {
            "../less/environment/abstract-file-manager.js": 14
        }],
        7: [function (a, b) {
            var c = a("./utils").addDataAttr,
                d = a("./browser");
            b.exports = function (e, f) {
                function g(a) {
                    return f.postProcessor && "function" == typeof f.postProcessor && (a = f.postProcessor.call(a, a) || a), a
                }

                function h(a) {
                    var b = {};
                    for (var c in a) a.hasOwnProperty(c) && (b[c] = a[c]);
                    return b
                }

                function i(a, b) {
                    var c = Array.prototype.slice.call(arguments, 2);
                    return function () {
                        var d = c.concat(Array.prototype.slice.call(arguments, 0));
                        return a.apply(b, d)
                    }
                }

                function j(a) {
                    for (var b, c = n.getElementsByTagName("style"), d = 0; c.length > d; d++)
                        if (b = c[d], b.type.match(u)) {
                            var e = h(f);
                            e.modifyVars = a;
                            var g = b.innerHTML || "";
                            e.filename = n.location.href.replace(/#.*$/, ""), o.render(g, e, i(function (a, b, c) {
                                b ? s.add(b, "inline") : (a.type = "text/css", a.styleSheet ? a.styleSheet.cssText = c.css : a.innerHTML = c.css)
                            }, null, b))
                        }
                }

                function k(a, b, d, e, i) {
                    function j(c) {
                        var f = c.contents,
                            h = c.filename,
                            i = c.webInfo,
                            j = {
                                currentDirectory: r.getPath(h),
                                filename: h,
                                rootFilename: h,
                                relativeUrls: k.relativeUrls
                            };
                        if (j.entryPath = j.currentDirectory, j.rootpath = k.rootpath || j.currentDirectory, i && (i.remaining = e, !k.modifyVars)) {
                            var l = t.getCSS(h, i);
                            if (!d && l) return i.local = !0, void b(null, null, f, a, i, h)
                        }
                        s.remove(h), k.rootFileInfo = j, o.render(f, k, function (c, d) {
                            c ? (c.href = h, b(c)) : (d.css = g(d.css), k.modifyVars || t.setCSS(a.href, i.lastModified, d.css), b(null, d.css, f, a, i, h))
                        })
                    }
                    var k = h(f);
                    c(k, a), k.mime = a.type, i && (k.modifyVars = i), r.loadFile(a.href, null, k, p, function (a, c) {
                        return a ? void b(a) : void j(c)
                    })
                }

                function l(a, b, c) {
                    for (var d = 0; o.sheets.length > d; d++) k(o.sheets[d], a, b, o.sheets.length - (d + 1), c)
                }

                function m() {
                    "development" === o.env && (o.watchTimer = setInterval(function () {
                        o.watchMode && (r.clearFileCache(), l(function (a, b, c, f) {
                            a ? s.add(a, a.href || f.href) : b && d.createCSS(e.document, b, f)
                        }))
                    }, f.poll))
                }
                var n = e.document,
                    o = a("../less")();
                b.exports = o, o.options = f;
                var p = o.environment,
                    q = a("./file-manager")(f, o.logger),
                    r = new q;
                p.addFileManager(r), o.FileManager = q, a("./log-listener")(o, f);
                var s = a("./error-reporting")(e, o, f),
                    t = o.cache = f.cache || a("./cache")(e, f, o.logger);
                f.functions && o.functions.functionRegistry.addMultiple(f.functions);
                var u = /^text\/(x-)?less$/;
                return o.watch = function () {
                    return o.watchMode || (o.env = "development", m()), this.watchMode = !0, !0
                }, o.unwatch = function () {
                    return clearInterval(o.watchTimer), this.watchMode = !1, !1
                }, o.registerStylesheets = function () {
                    return new Promise(function (a) {
                        var b = n.getElementsByTagName("link");
                        o.sheets = [];
                        for (var c = 0; b.length > c; c++)("stylesheet/less" === b[c].rel || b[c].rel.match(/stylesheet/) && b[c].type.match(u)) && o.sheets.push(b[c]);
                        a()
                    })
                }, o.modifyVars = function (a) {
                    return o.refresh(!0, a, !1)
                }, o.refresh = function (a, b, c) {
                    return (a || c) && c !== !1 && r.clearFileCache(), new Promise(function (c, f) {
                        var g, h, i;
                        g = h = new Date, l(function (a, b, j, k, l) {
                            return a ? (s.add(a, a.href || k.href), void f(a)) : (o.logger.info(l.local ? "loading " + k.href + " from cache." : "rendered " + k.href + " successfully."), d.createCSS(e.document, b, k), o.logger.info("css for " + k.href + " generated in " + (new Date - h) + "ms"), 0 === l.remaining && (i = new Date - g, o.logger.info("less has finished. css generated in " + i + "ms"), c({
                                startTime: g,
                                endTime: h,
                                totalMilliseconds: i,
                                sheets: o.sheets.length
                            })), void(h = new Date))
                        }, a, b), j(b)
                    })
                }, o.refreshStyles = j, o
            }
        }, {
            "../less": 29,
            "./browser": 3,
            "./cache": 4,
            "./error-reporting": 5,
            "./file-manager": 6,
            "./log-listener": 8,
            "./utils": 9
        }],
        8: [function (a, b) {
            b.exports = function (a, b) {
                var c = 4,
                    d = 3,
                    e = 2,
                    f = 1;
                b.logLevel = "undefined" != typeof b.logLevel ? b.logLevel : "development" === b.env ? d : f, b.loggers || (b.loggers = [{
                    debug: function (a) {
                        b.logLevel >= c && console.log(a)
                    },
                    info: function (a) {
                        b.logLevel >= d && console.log(a)
                    },
                    warn: function (a) {
                        b.logLevel >= e && console.warn(a)
                    },
                    error: function (a) {
                        b.logLevel >= f && console.error(a)
                    }
                }]);
                for (var g = 0; b.loggers.length > g; g++) a.logger.addListener(b.loggers[g])
            }
        }, {}],
        9: [function (a, b) {
            b.exports = {
                extractId: function (a) {
                    return a.replace(/^[a-z-]+:\/+?[^\/]+/, "").replace(/[\?\&]livereload=\w+/, "").replace(/^\//, "").replace(/\.[a-zA-Z]+$/, "").replace(/[^\.\w-]+/g, "-").replace(/\./g, ":")
                },
                addDataAttr: function (a, b) {
                    for (var c in b.dataset)
                        if (b.dataset.hasOwnProperty(c))
                            if ("env" === c || "dumpLineNumbers" === c || "rootpath" === c || "errorReporting" === c) a[c] = b.dataset[c];
                            else try {
                                a[c] = JSON.parse(b.dataset[c])
                            } catch (d) {}
                }
            }
        }, {}],
        10: [function (a, b) {
            var c = {};
            b.exports = c;
            var d = function (a, b, c) {
                    if (a)
                        for (var d = 0; c.length > d; d++) a.hasOwnProperty(c[d]) && (b[c[d]] = a[c[d]])
                },
                e = ["paths", "relativeUrls", "rootpath", "strictImports", "insecure", "dumpLineNumbers", "compress", "syncImport", "chunkInput", "mime", "useFileCache", "processImports", "reference", "pluginManager"];
            c.Parse = function (a) {
                d(a, this, e), "string" == typeof this.paths && (this.paths = [this.paths])
            };
            var f = ["compress", "ieCompat", "strictMath", "strictUnits", "sourceMap", "importMultiple", "urlArgs", "javascriptEnabled", "pluginManager", "importantScope"];
            c.Eval = function (a, b) {
                d(a, this, f), this.frames = b || [], this.importantScope = this.importantScope || []
            }, c.Eval.prototype.inParenthesis = function () {
                this.parensStack || (this.parensStack = []), this.parensStack.push(!0)
            }, c.Eval.prototype.outOfParenthesis = function () {
                this.parensStack.pop()
            }, c.Eval.prototype.isMathOn = function () {
                return this.strictMath ? this.parensStack && this.parensStack.length : !0
            }, c.Eval.prototype.isPathRelative = function (a) {
                return !/^(?:[a-z-]+:|\/)/i.test(a)
            }, c.Eval.prototype.normalizePath = function (a) {
                var b, c = a.split("/").reverse();
                for (a = []; 0 !== c.length;) switch (b = c.pop()) {
                    case ".":
                        break;
                    case "..":
                        0 === a.length || ".." === a[a.length - 1] ? a.push(b) : a.pop();
                        break;
                    default:
                        a.push(b)
                }
                return a.join("/")
            }
        }, {}],
        11: [function (a, b) {
            b.exports = {
                aliceblue: "#f0f8ff",
                antiquewhite: "#faebd7",
                aqua: "#00ffff",
                aquamarine: "#7fffd4",
                azure: "#f0ffff",
                beige: "#f5f5dc",
                bisque: "#ffe4c4",
                black: "#000000",
                blanchedalmond: "#ffebcd",
                blue: "#0000ff",
                blueviolet: "#8a2be2",
                brown: "#a52a2a",
                burlywood: "#deb887",
                cadetblue: "#5f9ea0",
                chartreuse: "#7fff00",
                chocolate: "#d2691e",
                coral: "#ff7f50",
                cornflowerblue: "#6495ed",
                cornsilk: "#fff8dc",
                crimson: "#dc143c",
                cyan: "#00ffff",
                darkblue: "#00008b",
                darkcyan: "#008b8b",
                darkgoldenrod: "#b8860b",
                darkgray: "#a9a9a9",
                darkgrey: "#a9a9a9",
                darkgreen: "#006400",
                darkkhaki: "#bdb76b",
                darkmagenta: "#8b008b",
                darkolivegreen: "#556b2f",
                darkorange: "#ff8c00",
                darkorchid: "#9932cc",
                darkred: "#8b0000",
                darksalmon: "#e9967a",
                darkseagreen: "#8fbc8f",
                darkslateblue: "#483d8b",
                darkslategray: "#2f4f4f",
                darkslategrey: "#2f4f4f",
                darkturquoise: "#00ced1",
                darkviolet: "#9400d3",
                deeppink: "#ff1493",
                deepskyblue: "#00bfff",
                dimgray: "#696969",
                dimgrey: "#696969",
                dodgerblue: "#1e90ff",
                firebrick: "#b22222",
                floralwhite: "#fffaf0",
                forestgreen: "#228b22",
                fuchsia: "#ff00ff",
                gainsboro: "#dcdcdc",
                ghostwhite: "#f8f8ff",
                gold: "#ffd700",
                goldenrod: "#daa520",
                gray: "#808080",
                grey: "#808080",
                green: "#008000",
                greenyellow: "#adff2f",
                honeydew: "#f0fff0",
                hotpink: "#ff69b4",
                indianred: "#cd5c5c",
                indigo: "#4b0082",
                ivory: "#fffff0",
                khaki: "#f0e68c",
                lavender: "#e6e6fa",
                lavenderblush: "#fff0f5",
                lawngreen: "#7cfc00",
                lemonchiffon: "#fffacd",
                lightblue: "#add8e6",
                lightcoral: "#f08080",
                lightcyan: "#e0ffff",
                lightgoldenrodyellow: "#fafad2",
                lightgray: "#d3d3d3",
                lightgrey: "#d3d3d3",
                lightgreen: "#90ee90",
                lightpink: "#ffb6c1",
                lightsalmon: "#ffa07a",
                lightseagreen: "#20b2aa",
                lightskyblue: "#87cefa",
                lightslategray: "#778899",
                lightslategrey: "#778899",
                lightsteelblue: "#b0c4de",
                lightyellow: "#ffffe0",
                lime: "#00ff00",
                limegreen: "#32cd32",
                linen: "#faf0e6",
                magenta: "#ff00ff",
                maroon: "#800000",
                mediumaquamarine: "#66cdaa",
                mediumblue: "#0000cd",
                mediumorchid: "#ba55d3",
                mediumpurple: "#9370d8",
                mediumseagreen: "#3cb371",
                mediumslateblue: "#7b68ee",
                mediumspringgreen: "#00fa9a",
                mediumturquoise: "#48d1cc",
                mediumvioletred: "#c71585",
                midnightblue: "#191970",
                mintcream: "#f5fffa",
                mistyrose: "#ffe4e1",
                moccasin: "#ffe4b5",
                navajowhite: "#ffdead",
                navy: "#000080",
                oldlace: "#fdf5e6",
                olive: "#808000",
                olivedrab: "#6b8e23",
                orange: "#ffa500",
                orangered: "#ff4500",
                orchid: "#da70d6",
                palegoldenrod: "#eee8aa",
                palegreen: "#98fb98",
                paleturquoise: "#afeeee",
                palevioletred: "#d87093",
                papayawhip: "#ffefd5",
                peachpuff: "#ffdab9",
                peru: "#cd853f",
                pink: "#ffc0cb",
                plum: "#dda0dd",
                powderblue: "#b0e0e6",
                purple: "#800080",
                rebeccapurple: "#663399",
                red: "#ff0000",
                rosybrown: "#bc8f8f",
                royalblue: "#4169e1",
                saddlebrown: "#8b4513",
                salmon: "#fa8072",
                sandybrown: "#f4a460",
                seagreen: "#2e8b57",
                seashell: "#fff5ee",
                sienna: "#a0522d",
                silver: "#c0c0c0",
                skyblue: "#87ceeb",
                slateblue: "#6a5acd",
                slategray: "#708090",
                slategrey: "#708090",
                snow: "#fffafa",
                springgreen: "#00ff7f",
                steelblue: "#4682b4",
                tan: "#d2b48c",
                teal: "#008080",
                thistle: "#d8bfd8",
                tomato: "#ff6347",
                turquoise: "#40e0d0",
                violet: "#ee82ee",
                wheat: "#f5deb3",
                white: "#ffffff",
                whitesmoke: "#f5f5f5",
                yellow: "#ffff00",
                yellowgreen: "#9acd32"
            }
        }, {}],
        12: [function (a, b) {
            b.exports = {
                colors: a("./colors"),
                unitConversions: a("./unit-conversions")
            }
        }, {
            "./colors": 11,
            "./unit-conversions": 13
        }],
        13: [function (a, b) {
            b.exports = {
                length: {
                    m: 1,
                    cm: .01,
                    mm: .001,
                    "in": .0254,
                    px: .0254 / 96,
                    pt: .0254 / 72,
                    pc: .0254 / 72 * 12
                },
                duration: {
                    s: 1,
                    ms: .001
                },
                angle: {
                    rad: 1 / (2 * Math.PI),
                    deg: 1 / 360,
                    grad: .0025,
                    turn: 1
                }
            }
        }, {}],
        14: [function (a, b) {
            var c = function () {};
            c.prototype.getPath = function (a) {
                var b = a.lastIndexOf("?");
                return b > 0 && (a = a.slice(0, b)), b = a.lastIndexOf("/"), 0 > b && (b = a.lastIndexOf("\\")), 0 > b ? "" : a.slice(0, b + 1)
            }, c.prototype.tryAppendLessExtension = function (a) {
                return /(\.[a-z]*$)|([\?;].*)$/.test(a) ? a : a + ".less"
            }, c.prototype.supportsSync = function () {
                return !1
            }, c.prototype.alwaysMakePathsAbsolute = function () {
                return !1
            }, c.prototype.isPathAbsolute = function (a) {
                return /^(?:[a-z-]+:|\/|\\)/i.test(a)
            }, c.prototype.join = function (a, b) {
                return a ? a + b : b
            }, c.prototype.pathDiff = function (a, b) {
                var c, d, e, f, g = this.extractUrlParts(a),
                    h = this.extractUrlParts(b),
                    i = "";
                if (g.hostPart !== h.hostPart) return "";
                for (d = Math.max(h.directories.length, g.directories.length), c = 0; d > c && h.directories[c] === g.directories[c]; c++);
                for (f = h.directories.slice(c), e = g.directories.slice(c), c = 0; f.length - 1 > c; c++) i += "../";
                for (c = 0; e.length - 1 > c; c++) i += e[c] + "/";
                return i
            }, c.prototype.extractUrlParts = function (a, b) {
                var c, d, e = /^((?:[a-z-]+:)?\/+?(?:[^\/\?#]*\/)|([\/\\]))?((?:[^\/\\\?#]*[\/\\])*)([^\/\\\?#]*)([#\?].*)?$/i,
                    f = a.match(e),
                    g = {},
                    h = [];
                if (!f) throw new Error("Could not parse sheet href - '" + a + "'");
                if (b && (!f[1] || f[2])) {
                    if (d = b.match(e), !d) throw new Error("Could not parse page url - '" + b + "'");
                    f[1] = f[1] || d[1] || "", f[2] || (f[3] = d[3] + f[3])
                }
                if (f[3]) {
                    for (h = f[3].replace(/\\/g, "/").split("/"), c = 0; h.length > c; c++) "." === h[c] && (h.splice(c, 1), c -= 1);
                    for (c = 0; h.length > c; c++) ".." === h[c] && c > 0 && (h.splice(c - 1, 2), c -= 2)
                }
                return g.hostPart = f[1], g.directories = h, g.path = (f[1] || "") + h.join("/"), g.fileUrl = g.path + (f[4] || ""), g.url = g.fileUrl + (f[5] || ""), g
            }, b.exports = c
        }, {}],
        15: [function (a, b) {
            var c = a("../logger"),
                d = function (a, b) {
                    this.fileManagers = b || [], a = a || {};
                    for (var c = ["encodeBase64", "mimeLookup", "charsetLookup", "getSourceMapGenerator"], d = [], e = d.concat(c), f = 0; e.length > f; f++) {
                        var g = e[f],
                            h = a[g];
                        h ? this[g] = h.bind(a) : d.length > f && this.warn("missing required function in environment - " + g)
                    }
                };
            d.prototype.getFileManager = function (a, b, d, e, f) {
                a || c.warn("getFileManager called with no filename.. Please report this issue. continuing."), null == b && c.warn("getFileManager called with null directory.. Please report this issue. continuing.");
                var g = this.fileManagers;
                d.pluginManager && (g = [].concat(g).concat(d.pluginManager.getFileManagers()));
                for (var h = g.length - 1; h >= 0; h--) {
                    var i = g[h];
                    if (i[f ? "supportsSync" : "supports"](a, b, d, e)) return i
                }
                return null
            }, d.prototype.addFileManager = function (a) {
                this.fileManagers.push(a)
            }, d.prototype.clearFileManagers = function () {
                this.fileManagers = []
            }, b.exports = d
        }, {
            "../logger": 31
        }],
        16: [function (a) {
            function b(a, b, d) {
                var e, f, g, h, i = b.alpha,
                    j = d.alpha,
                    k = [];
                g = j + i * (1 - j);
                for (var l = 0; 3 > l; l++) e = b.rgb[l] / 255, f = d.rgb[l] / 255, h = a(e, f), g && (h = (j * f + i * (e - j * (e + f - h))) / g), k[l] = 255 * h;
                return new c(k, g)
            }
            var c = a("../tree/color"),
                d = a("./function-registry"),
                e = {
                    multiply: function (a, b) {
                        return a * b
                    },
                    screen: function (a, b) {
                        return a + b - a * b
                    },
                    overlay: function (a, b) {
                        return a *= 2, 1 >= a ? e.multiply(a, b) : e.screen(a - 1, b)
                    },
                    softlight: function (a, b) {
                        var c = 1,
                            d = a;
                        return b > .5 && (d = 1, c = a > .25 ? Math.sqrt(a) : ((16 * a - 12) * a + 4) * a), a - (1 - 2 * b) * d * (c - a)
                    },
                    hardlight: function (a, b) {
                        return e.overlay(b, a)
                    },
                    difference: function (a, b) {
                        return Math.abs(a - b)
                    },
                    exclusion: function (a, b) {
                        return a + b - 2 * a * b
                    },
                    average: function (a, b) {
                        return (a + b) / 2
                    },
                    negation: function (a, b) {
                        return 1 - Math.abs(a + b - 1)
                    }
                };
            for (var f in e) e.hasOwnProperty(f) && (b[f] = b.bind(null, e[f]));
            d.addMultiple(b)
        }, {
            "../tree/color": 47,
            "./function-registry": 21
        }],
        17: [function (a) {
            function b(a) {
                return Math.min(1, Math.max(0, a))
            }

            function c(a) {
                return f.hsla(a.h, a.s, a.l, a.a)
            }

            function d(a) {
                if (a instanceof g) return parseFloat(a.unit.is("%") ? a.value / 100 : a.value);
                if ("number" == typeof a) return a;
                throw {
                    type: "Argument",
                    message: "color functions take numbers as parameters"
                }
            }

            function e(a, b) {
                return a instanceof g && a.unit.is("%") ? parseFloat(a.value * b / 100) : d(a)
            }
            var f, g = a("../tree/dimension"),
                h = a("../tree/color"),
                i = a("../tree/quoted"),
                j = a("../tree/anonymous"),
                k = a("./function-registry");
            f = {
                rgb: function (a, b, c) {
                    return f.rgba(a, b, c, 1)
                },
                rgba: function (a, b, c, f) {
                    var g = [a, b, c].map(function (a) {
                        return e(a, 255)
                    });
                    return f = d(f), new h(g, f)
                },
                hsl: function (a, b, c) {
                    return f.hsla(a, b, c, 1)
                },
                hsla: function (a, c, e, g) {
                    function h(a) {
                        return a = 0 > a ? a + 1 : a > 1 ? a - 1 : a, 1 > 6 * a ? j + (i - j) * a * 6 : 1 > 2 * a ? i : 2 > 3 * a ? j + (i - j) * (2 / 3 - a) * 6 : j
                    }
                    a = d(a) % 360 / 360, c = b(d(c)), e = b(d(e)), g = b(d(g));
                    var i = .5 >= e ? e * (c + 1) : e + c - e * c,
                        j = 2 * e - i;
                    return f.rgba(255 * h(a + 1 / 3), 255 * h(a), 255 * h(a - 1 / 3), g)
                },
                hsv: function (a, b, c) {
                    return f.hsva(a, b, c, 1)
                },
                hsva: function (a, b, c, e) {
                    a = d(a) % 360 / 360 * 360, b = d(b), c = d(c), e = d(e);
                    var g, h;
                    g = Math.floor(a / 60 % 6), h = a / 60 - g;
                    var i = [c, c * (1 - b), c * (1 - h * b), c * (1 - (1 - h) * b)],
                        j = [[0, 3, 1], [2, 0, 1], [1, 0, 3], [1, 2, 0], [3, 1, 0], [0, 1, 2]];
                    return f.rgba(255 * i[j[g][0]], 255 * i[j[g][1]], 255 * i[j[g][2]], e)
                },
                hue: function (a) {
                    return new g(a.toHSL().h)
                },
                saturation: function (a) {
                    return new g(100 * a.toHSL().s, "%")
                },
                lightness: function (a) {
                    return new g(100 * a.toHSL().l, "%")
                },
                hsvhue: function (a) {
                    return new g(a.toHSV().h)
                },
                hsvsaturation: function (a) {
                    return new g(100 * a.toHSV().s, "%")
                },
                hsvvalue: function (a) {
                    return new g(100 * a.toHSV().v, "%")
                },
                red: function (a) {
                    return new g(a.rgb[0])
                },
                green: function (a) {
                    return new g(a.rgb[1])
                },
                blue: function (a) {
                    return new g(a.rgb[2])
                },
                alpha: function (a) {
                    return new g(a.toHSL().a)
                },
                luma: function (a) {
                    return new g(a.luma() * a.alpha * 100, "%")
                },
                luminance: function (a) {
                    var b = .2126 * a.rgb[0] / 255 + .7152 * a.rgb[1] / 255 + .0722 * a.rgb[2] / 255;
                    return new g(b * a.alpha * 100, "%")
                },
                saturate: function (a, d) {
                    if (!a.rgb) return null;
                    var e = a.toHSL();
                    return e.s += d.value / 100, e.s = b(e.s), c(e)
                },
                desaturate: function (a, d) {
                    var e = a.toHSL();
                    return e.s -= d.value / 100, e.s = b(e.s), c(e)
                },
                lighten: function (a, d) {
                    var e = a.toHSL();
                    return e.l += d.value / 100, e.l = b(e.l), c(e)
                },
                darken: function (a, d) {
                    var e = a.toHSL();
                    return e.l -= d.value / 100, e.l = b(e.l), c(e)
                },
                fadein: function (a, d) {
                    var e = a.toHSL();
                    return e.a += d.value / 100, e.a = b(e.a), c(e)
                },
                fadeout: function (a, d) {
                    var e = a.toHSL();
                    return e.a -= d.value / 100, e.a = b(e.a), c(e)
                },
                fade: function (a, d) {
                    var e = a.toHSL();
                    return e.a = d.value / 100, e.a = b(e.a), c(e)
                },
                spin: function (a, b) {
                    var d = a.toHSL(),
                        e = (d.h + b.value) % 360;
                    return d.h = 0 > e ? 360 + e : e, c(d)
                },
                mix: function (a, b, c) {
                    c || (c = new g(50));
                    var d = c.value / 100,
                        e = 2 * d - 1,
                        f = a.toHSL().a - b.toHSL().a,
                        i = ((e * f == -1 ? e : (e + f) / (1 + e * f)) + 1) / 2,
                        j = 1 - i,
                        k = [a.rgb[0] * i + b.rgb[0] * j, a.rgb[1] * i + b.rgb[1] * j, a.rgb[2] * i + b.rgb[2] * j],
                        l = a.alpha * d + b.alpha * (1 - d);
                    return new h(k, l)
                },
                greyscale: function (a) {
                    return f.desaturate(a, new g(100))
                },
                contrast: function (a, b, c, e) {
                    if (!a.rgb) return null;
                    if ("undefined" == typeof c && (c = f.rgba(255, 255, 255, 1)), "undefined" == typeof b && (b = f.rgba(0, 0, 0, 1)), b.luma() > c.luma()) {
                        var g = c;
                        c = b, b = g
                    }
                    return e = "undefined" == typeof e ? .43 : d(e), a.luma() < e ? c : b
                },
                argb: function (a) {
                    return new j(a.toARGB())
                },
                color: function (a) {
                    if (a instanceof i && /^#([a-f0-9]{6}|[a-f0-9]{3})$/i.test(a.value)) return new h(a.value.slice(1));
                    if (a instanceof h || (a = h.fromKeyword(a.value))) return a.keyword = void 0, a;
                    throw {
                        type: "Argument",
                        message: "argument must be a color keyword or 3/6 digit hex e.g. #FFF"
                    }
                },
                tint: function (a, b) {
                    return f.mix(f.rgb(255, 255, 255), a, b)
                },
                shade: function (a, b) {
                    return f.mix(f.rgb(0, 0, 0), a, b)
                }
            }, k.addMultiple(f)
        }, {
            "../tree/anonymous": 43,
            "../tree/color": 47,
            "../tree/dimension": 53,
            "../tree/quoted": 70,
            "./function-registry": 21
        }],
        18: [function (a, b) {
            b.exports = function (b) {
                var c = a("../tree/quoted"),
                    d = a("../tree/url"),
                    e = a("./function-registry"),
                    f = function (a, b) {
                        return new d(b, a.index, a.currentFileInfo).eval(a.context)
                    },
                    g = a("../logger");
                e.add("data-uri", function (a, e) {
                    e || (e = a, a = null);
                    var h = a && a.value,
                        i = e.value,
                        j = e.currentFileInfo.relativeUrls ? e.currentFileInfo.currentDirectory : e.currentFileInfo.entryPath,
                        k = i.indexOf("#"),
                        l = ""; - 1 !== k && (l = i.slice(k), i = i.slice(0, k));
                    var m = b.getFileManager(i, j, this.context, b, !0);
                    if (!m) return f(this, e);
                    var n = !1;
                    if (a) n = /;base64$/.test(h);
                    else {
                        if (h = b.mimeLookup(i), "image/svg+xml" === h) n = !1;
                        else {
                            var o = b.charsetLookup(h);
                            n = ["US-ASCII", "UTF-8"].indexOf(o) < 0
                        }
                        n && (h += ";base64")
                    }
                    var p = m.loadFileSync(i, j, this.context, b);
                    if (!p.contents) return g.warn("Skipped data-uri embedding because file not found"), f(this, e || a);
                    var q = p.contents;
                    if (n && !b.encodeBase64) return f(this, e);
                    q = n ? b.encodeBase64(q) : encodeURIComponent(q);
                    var r = "data:" + h + "," + q + l,
                        s = 32768;
                    return r.length >= s && this.context.ieCompat !== !1 ? (g.warn("Skipped data-uri embedding of " + i + " because its size (" + r.length + " characters) exceeds IE8-safe " + s + " characters!"), f(this, e || a)) : new d(new c('"' + r + '"', r, !1, this.index, this.currentFileInfo), this.index, this.currentFileInfo)
                })
            }
        }, {
            "../logger": 31,
            "../tree/quoted": 70,
            "../tree/url": 77,
            "./function-registry": 21
        }],
        19: [function (a, b) {
            var c = a("../tree/keyword"),
                d = a("./function-registry"),
                e = {
                    eval: function () {
                        var a = this.value_,
                            b = this.error_;
                        if (b) throw b;
                        return null != a ? a ? c.True : c.False : void 0
                    },
                    value: function (a) {
                        this.value_ = a
                    },
                    error: function (a) {
                        this.error_ = a
                    },
                    reset: function () {
                        this.value_ = this.error_ = null
                    }
                };
            d.add("default", e.eval.bind(e)), b.exports = e
        }, {
            "../tree/keyword": 62,
            "./function-registry": 21
        }],
        20: [function (a, b) {
            var c = a("./function-registry"),
                d = function (a, b, d, e) {
                    this.name = a.toLowerCase(), this.func = c.get(this.name), this.index = d, this.context = b, this.currentFileInfo = e
                };
            d.prototype.isValid = function () {
                return Boolean(this.func)
            }, d.prototype.call = function (a) {
                return this.func.apply(this, a)
            }, b.exports = d
        }, {
            "./function-registry": 21
        }],
        21: [function (a, b) {
            b.exports = {
                _data: {},
                add: function (a, b) {
                    this._data.hasOwnProperty(a), this._data[a] = b
                },
                addMultiple: function (a) {
                    Object.keys(a).forEach(function (b) {
                        this.add(b, a[b])
                    }.bind(this))
                },
                get: function (a) {
                    return this._data[a]
                }
            }
        }, {}],
        22: [function (a, b) {
            b.exports = function (b) {
                var c = {
                    functionRegistry: a("./function-registry"),
                    functionCaller: a("./function-caller")
                };
                return a("./default"), a("./color"), a("./color-blending"), a("./data-uri")(b), a("./math"), a("./number"), a("./string"), a("./svg")(b), a("./types"), c
            }
        }, {
            "./color": 17,
            "./color-blending": 16,
            "./data-uri": 18,
            "./default": 19,
            "./function-caller": 20,
            "./function-registry": 21,
            "./math": 23,
            "./number": 24,
            "./string": 25,
            "./svg": 26,
            "./types": 27
        }],
        23: [function (a) {
            function b(a, b, d) {
                if (!(d instanceof c)) throw {
                    type: "Argument",
                    message: "argument must be a number"
                };
                return null == b ? b = d.unit : d = d.unify(), new c(a(parseFloat(d.value)), b)
            }
            var c = a("../tree/dimension"),
                d = a("./function-registry"),
                e = {
                    ceil: null,
                    floor: null,
                    sqrt: null,
                    abs: null,
                    tan: "",
                    sin: "",
                    cos: "",
                    atan: "rad",
                    asin: "rad",
                    acos: "rad"
                };
            for (var f in e) e.hasOwnProperty(f) && (e[f] = b.bind(null, Math[f], e[f]));
            e.round = function (a, c) {
                var d = "undefined" == typeof c ? 0 : c.value;
                return b(function (a) {
                    return a.toFixed(d)
                }, null, a)
            }, d.addMultiple(e)
        }, {
            "../tree/dimension": 53,
            "./function-registry": 21
        }],
        24: [function (a) {
            var b = a("../tree/dimension"),
                c = a("../tree/anonymous"),
                d = a("./function-registry"),
                e = function (a, d) {
                    switch (d = Array.prototype.slice.call(d), d.length) {
                        case 0:
                            throw {
                                type: "Argument", message: "one or more arguments required"
                            }
                    }
                    var e, f, g, h, i, j, k, l, m = [],
                        n = {};
                    for (e = 0; d.length > e; e++)
                        if (g = d[e], g instanceof b)
                            if (h = "" === g.unit.toString() && void 0 !== l ? new b(g.value, l).unify() : g.unify(), j = "" === h.unit.toString() && void 0 !== k ? k : h.unit.toString(), k = "" !== j && void 0 === k || "" !== j && "" === m[0].unify().unit.toString() ? j : k, l = "" !== j && void 0 === l ? g.unit.toString() : l, f = void 0 !== n[""] && "" !== j && j === k ? n[""] : n[j], void 0 !== f) i = "" === m[f].unit.toString() && void 0 !== l ? new b(m[f].value, l).unify() : m[f].unify(), (a && i.value > h.value || !a && h.value > i.value) && (m[f] = g);
                            else {
                                if (void 0 !== k && j !== k) throw {
                                    type: "Argument",
                                    message: "incompatible types"
                                };
                                n[j] = m.length, m.push(g)
                            }
                    else Array.isArray(d[e].value) && Array.prototype.push.apply(d, Array.prototype.slice.call(d[e].value));
                    return 1 == m.length ? m[0] : (d = m.map(function (a) {
                        return a.toCSS(this.context)
                    }).join(this.context.compress ? "," : ", "), new c((a ? "min" : "max") + "(" + d + ")"))
                };
            d.addMultiple({
                min: function () {
                    return e(!0, arguments)
                },
                max: function () {
                    return e(!1, arguments)
                },
                convert: function (a, b) {
                    return a.convertTo(b.value)
                },
                pi: function () {
                    return new b(Math.PI)
                },
                mod: function (a, c) {
                    return new b(a.value % c.value, a.unit)
                },
                pow: function (a, c) {
                    if ("number" == typeof a && "number" == typeof c) a = new b(a), c = new b(c);
                    else if (!(a instanceof b && c instanceof b)) throw {
                        type: "Argument",
                        message: "arguments must be numbers"
                    };
                    return new b(Math.pow(a.value, c.value), a.unit)
                },
                percentage: function (a) {
                    return new b(100 * a.value, "%")
                }
            })
        }, {
            "../tree/anonymous": 43,
            "../tree/dimension": 53,
            "./function-registry": 21
        }],
        25: [function (a) {
            var b = a("../tree/quoted"),
                c = a("../tree/anonymous"),
                d = a("../tree/javascript"),
                e = a("./function-registry");
            e.addMultiple({
                e: function (a) {
                    return new c(a instanceof d ? a.evaluated : a.value)
                },
                escape: function (a) {
                    return new c(encodeURI(a.value).replace(/=/g, "%3D").replace(/:/g, "%3A").replace(/#/g, "%23").replace(/;/g, "%3B").replace(/\(/g, "%28").replace(/\)/g, "%29"))
                },
                replace: function (a, c, d, e) {
                    var f = a.value;
                    return f = f.replace(new RegExp(c.value, e ? e.value : ""), d.value), new b(a.quote || "", f, a.escaped)
                },
                "%": function (a) {
                    for (var c = Array.prototype.slice.call(arguments, 1), d = a.value, e = 0; c.length > e; e++) d = d.replace(/%[sda]/i, function (a) {
                        var b = a.match(/s/i) ? c[e].value : c[e].toCSS();
                        return a.match(/[A-Z]$/) ? encodeURIComponent(b) : b
                    });
                    return d = d.replace(/%%/g, "%"), new b(a.quote || "", d, a.escaped)
                }
            })
        }, {
            "../tree/anonymous": 43,
            "../tree/javascript": 60,
            "../tree/quoted": 70,
            "./function-registry": 21
        }],
        26: [function (a, b) {
            b.exports = function () {
                var b = a("../tree/dimension"),
                    c = a("../tree/color"),
                    d = a("../tree/quoted"),
                    e = a("../tree/url"),
                    f = a("./function-registry");
                f.add("svg-gradient", function (a) {
                    function f() {
                        throw {
                            type: "Argument",
                            message: "svg-gradient expects direction, start_color [start_position], [color position,]..., end_color [end_position]"
                        }
                    }
                    3 > arguments.length && f();
                    var g, h, i, j, k, l, m, n = Array.prototype.slice.call(arguments, 1),
                        o = "linear",
                        p = 'x="0" y="0" width="1" height="1"',
                        q = {
                            compress: !1
                        },
                        r = a.toCSS(q);
                    switch (r) {
                        case "to bottom":
                            g = 'x1="0%" y1="0%" x2="0%" y2="100%"';
                            break;
                        case "to right":
                            g = 'x1="0%" y1="0%" x2="100%" y2="0%"';
                            break;
                        case "to bottom right":
                            g = 'x1="0%" y1="0%" x2="100%" y2="100%"';
                            break;
                        case "to top right":
                            g = 'x1="0%" y1="100%" x2="100%" y2="0%"';
                            break;
                        case "ellipse":
                        case "ellipse at center":
                            o = "radial", g = 'cx="50%" cy="50%" r="75%"', p = 'x="-50" y="-50" width="101" height="101"';
                            break;
                        default:
                            throw {
                                type: "Argument", message: "svg-gradient direction must be 'to bottom', 'to right', 'to bottom right', 'to top right' or 'ellipse at center'"
                            }
                    }
                    for (h = '<?xml version="1.0" ?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="100%" viewBox="0 0 1 1" preserveAspectRatio="none"><' + o + 'Gradient id="gradient" gradientUnits="userSpaceOnUse" ' + g + ">", i = 0; n.length > i; i += 1) n[i].value ? (j = n[i].value[0], k = n[i].value[1]) : (j = n[i], k = void 0), j instanceof c && ((0 === i || i + 1 === n.length) && void 0 === k || k instanceof b) || f(), l = k ? k.toCSS(q) : 0 === i ? "0%" : "100%", m = j.alpha, h += '<stop offset="' + l + '" stop-color="' + j.toRGB() + '"' + (1 > m ? ' stop-opacity="' + m + '"' : "") + "/>";
                    return h += "</" + o + "Gradient><rect " + p + ' fill="url(#gradient)" /></svg>', h = encodeURIComponent(h), h = "data:image/svg+xml," + h, new e(new d("'" + h + "'", h, !1, this.index, this.currentFileInfo), this.index, this.currentFileInfo)
                })
            }
        }, {
            "../tree/color": 47,
            "../tree/dimension": 53,
            "../tree/quoted": 70,
            "../tree/url": 77,
            "./function-registry": 21
        }],
        27: [function (a) {
            var b = a("../tree/keyword"),
                c = a("../tree/dimension"),
                d = a("../tree/color"),
                e = a("../tree/quoted"),
                f = a("../tree/anonymous"),
                g = a("../tree/url"),
                h = a("../tree/operation"),
                i = a("./function-registry"),
                j = function (a, c) {
                    return a instanceof c ? b.True : b.False
                },
                k = function (a, d) {
                    if (void 0 === d) throw {
                        type: "Argument",
                        message: "missing the required second argument to isunit."
                    };
                    if (d = "string" == typeof d.value ? d.value : d, "string" != typeof d) throw {
                        type: "Argument",
                        message: "Second argument to isunit should be a unit or a string."
                    };
                    return a instanceof c && a.unit.is(d) ? b.True : b.False
                };
            i.addMultiple({
                iscolor: function (a) {
                    return j(a, d)
                },
                isnumber: function (a) {
                    return j(a, c)
                },
                isstring: function (a) {
                    return j(a, e)
                },
                iskeyword: function (a) {
                    return j(a, b)
                },
                isurl: function (a) {
                    return j(a, g)
                },
                ispixel: function (a) {
                    return k(a, "px")
                },
                ispercentage: function (a) {
                    return k(a, "%")
                },
                isem: function (a) {
                    return k(a, "em")
                },
                isunit: k,
                unit: function (a, d) {
                    if (!(a instanceof c)) throw {
                        type: "Argument",
                        message: "the first argument to unit must be a number" + (a instanceof h ? ". Have you forgotten parenthesis?" : "")
                    };
                    return d = d ? d instanceof b ? d.value : d.toCSS() : "", new c(a.value, d)
                },
                "get-unit": function (a) {
                    return new f(a.unit)
                },
                extract: function (a, b) {
                    return b = b.value - 1, Array.isArray(a.value) ? a.value[b] : Array(a)[b]
                },
                length: function (a) {
                    var b = Array.isArray(a.value) ? a.value.length : 1;
                    return new c(b)
                }
            })
        }, {
            "../tree/anonymous": 43,
            "../tree/color": 47,
            "../tree/dimension": 53,
            "../tree/keyword": 62,
            "../tree/operation": 68,
            "../tree/quoted": 70,
            "../tree/url": 77,
            "./function-registry": 21
        }],
        28: [function (a, b) {
            var c = a("./contexts"),
                d = a("./parser/parser");
            b.exports = function (a) {
                var b = function (a, b) {
                    this.rootFilename = b.filename, this.paths = a.paths || [], this.contents = {}, this.contentsIgnoredChars = {}, this.mime = a.mime, this.error = null, this.context = a, this.queue = [], this.files = {}
                };
                return b.prototype.push = function (b, e, f, g, h) {
                    var i = this;
                    this.queue.push(b);
                    var j = function (a, c, d) {
                            i.queue.splice(i.queue.indexOf(b), 1);
                            var e = d === i.rootFilename;
                            i.files[d] = c, a && !i.error && (i.error = a), h(a, c, e, d)
                        },
                        k = {
                            relativeUrls: this.context.relativeUrls,
                            entryPath: f.entryPath,
                            rootpath: f.rootpath,
                            rootFilename: f.rootFilename
                        },
                        l = a.getFileManager(b, f.currentDirectory, this.context, a);
                    if (!l) return void j({
                        message: "Could not find a file-manager for " + b
                    });
                    e && (b = l.tryAppendLessExtension(b));
                    var m = function (a) {
                            var b = a.filename,
                                e = a.contents;
                            k.currentDirectory = l.getPath(b), k.relativeUrls && (k.rootpath = l.join(i.context.rootpath || "", l.pathDiff(k.currentDirectory, k.entryPath)), !l.isPathAbsolute(k.rootpath) && l.alwaysMakePathsAbsolute() && (k.rootpath = l.join(k.entryPath, k.rootpath))), k.filename = b;
                            var h = new c.Parse(i.context);
                            h.processImports = !1, i.contents[b] = e, (f.reference || g.reference) && (k.reference = !0), g.inline ? j(null, e, b) : new d(h, i, k).parse(e, function (a, c) {
                                j(a, c, b)
                            })
                        },
                        n = l.loadFile(b, f.currentDirectory, this.context, a, function (a, b) {
                            a ? j(a) : m(b)
                        });
                    n && n.then(m, j)
                }, b
            }
        }, {
            "./contexts": 10,
            "./parser/parser": 36
        }],
        29: [function (a, b) {
            b.exports = function (b, c) {
                var d, e, f, g, h, i = {
                    version: [2, 2, 0],
                    data: a("./data"),
                    tree: a("./tree"),
                    Environment: h = a("./environment/environment"),
                    AbstractFileManager: a("./environment/abstract-file-manager"),
                    environment: b = new h(b, c),
                    visitors: a("./visitors"),
                    Parser: a("./parser/parser"),
                    functions: a("./functions")(b),
                    contexts: a("./contexts"),
                    SourceMapOutput: d = a("./source-map-output")(b),
                    SourceMapBuilder: e = a("./source-map-builder")(d, b),
                    ParseTree: f = a("./parse-tree")(e),
                    ImportManager: g = a("./import-manager")(b),
                    render: a("./render")(b, f, g),
                    parse: a("./parse")(b, f, g),
                    LessError: a("./less-error"),
                    transformTree: a("./transform-tree"),
                    utils: a("./utils"),
                    PluginManager: a("./plugin-manager"),
                    logger: a("./logger")
                };
                return i
            }
        }, {
            "./contexts": 10,
            "./data": 12,
            "./environment/abstract-file-manager": 14,
            "./environment/environment": 15,
            "./functions": 22,
            "./import-manager": 28,
            "./less-error": 30,
            "./logger": 31,
            "./parse": 33,
            "./parse-tree": 32,
            "./parser/parser": 36,
            "./plugin-manager": 37,
            "./render": 38,
            "./source-map-builder": 39,
            "./source-map-output": 40,
            "./transform-tree": 41,
            "./tree": 59,
            "./utils": 80,
            "./visitors": 84
        }],
        30: [function (a, b) {
            var c = a("./utils"),
                d = b.exports = function (a, b, d) {
                    Error.call(this);
                    var e = a.filename || d;
                    if (b && e) {
                        var f = b.contents[e],
                            g = c.getLocation(a.index, f),
                            h = g.line,
                            i = g.column,
                            j = a.call && c.getLocation(a.call, f).line,
                            k = f.split("\n");
                        this.type = a.type || "Syntax", this.filename = e, this.index = a.index, this.line = "number" == typeof h ? h + 1 : null, this.callLine = j + 1, this.callExtract = k[j], this.column = i, this.extract = [k[h - 1], k[h], k[h + 1]]
                    }
                    this.message = a.message, this.stack = a.stack
                };
            if ("undefined" == typeof Object.create) {
                var e = function () {};
                e.prototype = Error.prototype, d.prototype = new e
            } else d.prototype = Object.create(Error.prototype);
            d.prototype.constructor = d
        }, {
            "./utils": 80
        }],
        31: [function (a, b) {
            b.exports = {
                error: function (a) {
                    this._fireEvent("error", a)
                },
                warn: function (a) {
                    this._fireEvent("warn", a)
                },
                info: function (a) {
                    this._fireEvent("info", a)
                },
                debug: function (a) {
                    this._fireEvent("debug", a)
                },
                addListener: function (a) {
                    this._listeners.push(a)
                },
                removeListener: function (a) {
                    for (var b = 0; this._listeners.length > b; b++)
                        if (this._listeners[b] === a) return void this._listeners.splice(b, 1)
                },
                _fireEvent: function (a, b) {
                    for (var c = 0; this._listeners.length > c; c++) {
                        var d = this._listeners[c][a];
                        d && d(b)
                    }
                },
                _listeners: []
            }
        }, {}],
        32: [function (a, b) {
            var c = a("./less-error"),
                d = a("./transform-tree"),
                e = a("./logger");
            b.exports = function (a) {
                var b = function (a, b) {
                    this.root = a, this.imports = b
                };
                return b.prototype.toCSS = function (b) {
                    var f, g, h = {};
                    try {
                        f = d(this.root, b)
                    } catch (i) {
                        throw new c(i, this.imports)
                    }
                    try {
                        var j = Boolean(b.compress);
                        j && e.warn("The compress option has been deprecated. We recommend you use a dedicated css minifier, for instance see less-plugin-clean-css.");
                        var k = {
                            compress: j,
                            dumpLineNumbers: b.dumpLineNumbers,
                            strictUnits: Boolean(b.strictUnits),
                            numPrecision: 8
                        };
                        b.sourceMap ? (g = new a(b.sourceMap), h.css = g.toCSS(f, k, this.imports)) : h.css = f.toCSS(k)
                    } catch (i) {
                        throw new c(i, this.imports)
                    }
                    if (b.pluginManager)
                        for (var l = b.pluginManager.getPostProcessors(), m = 0; l.length > m; m++) h.css = l[m].process(h.css, {
                            sourceMap: g,
                            options: b,
                            imports: this.imports
                        });
                    b.sourceMap && (h.map = g.getExternalSourceMap()), h.imports = [];
                    for (var n in this.imports.files) this.imports.files.hasOwnProperty(n) && n !== this.imports.rootFilename && h.imports.push(n);
                    return h
                }, b
            }
        }, {
            "./less-error": 30,
            "./logger": 31,
            "./transform-tree": 41
        }],
        33: [function (a, b) {
            var c = "undefined" == typeof Promise ? a("promise") : Promise,
                d = a("./contexts"),
                e = a("./parser/parser"),
                f = a("./plugin-manager");
            b.exports = function (a, b, g) {
                var h = function (a, b, i) {
                    if (b = b || {}, "function" == typeof b && (i = b, b = {}), !i) {
                        var j = this;
                        return new c(function (c, d) {
                            h.call(j, a, b, function (a, b) {
                                a ? d(a) : c(b)
                            })
                        })
                    }
                    var k, l, m = new f(this);
                    if (m.addPlugins(b.plugins), b.pluginManager = m, k = new d.Parse(b), b.rootFileInfo) l = b.rootFileInfo;
                    else {
                        var n = b.filename || "input",
                            o = n.replace(/[^\/\\]*$/, "");
                        l = {
                            filename: n,
                            relativeUrls: k.relativeUrls,
                            rootpath: k.rootpath || "",
                            currentDirectory: o,
                            entryPath: o,
                            rootFilename: n
                        }
                    }
                    var p = new g(k, l);
                    new e(k, p, l).parse(a, function (a, c) {
                        return a ? i(a) : void i(null, c, p, b)
                    }, b)
                };
                return h
            }
        }, {
            "./contexts": 10,
            "./parser/parser": 36,
            "./plugin-manager": 37,
            promise: void 0
        }],
        34: [function (a, b) {
            b.exports = function (a, b) {
                function c(b) {
                    var c = h - q;
                    512 > c && !b || !c || (p.push(a.slice(q, h + 1)), q = h + 1)
                }
                var d, e, f, g, h, i, j, k, l, m = a.length,
                    n = 0,
                    o = 0,
                    p = [],
                    q = 0;
                for (h = 0; m > h; h++)
                    if (j = a.charCodeAt(h), !(j >= 97 && 122 >= j || 34 > j)) switch (j) {
                        case 40:
                            o++, e = h;
                            continue;
                        case 41:
                            if (--o < 0) return b("missing opening `(`", h);
                            continue;
                        case 59:
                            o || c();
                            continue;
                        case 123:
                            n++, d = h;
                            continue;
                        case 125:
                            if (--n < 0) return b("missing opening `{`", h);
                            n || o || c();
                            continue;
                        case 92:
                            if (m - 1 > h) {
                                h++;
                                continue
                            }
                            return b("unescaped `\\`", h);
                        case 34:
                        case 39:
                        case 96:
                            for (l = 0, i = h, h += 1; m > h; h++)
                                if (k = a.charCodeAt(h), !(k > 96)) {
                                    if (k == j) {
                                        l = 1;
                                        break
                                    }
                                    if (92 == k) {
                                        if (h == m - 1) return b("unescaped `\\`", h);
                                        h++
                                    }
                                } if (l) continue;
                            return b("unmatched `" + String.fromCharCode(j) + "`", i);
                        case 47:
                            if (o || h == m - 1) continue;
                            if (k = a.charCodeAt(h + 1), 47 == k)
                                for (h += 2; m > h && (k = a.charCodeAt(h), !(13 >= k) || 10 != k && 13 != k); h++);
                            else if (42 == k) {
                                for (f = i = h, h += 2; m - 1 > h && (k = a.charCodeAt(h), 125 == k && (g = h), 42 != k || 47 != a.charCodeAt(h + 1)); h++);
                                if (h == m - 1) return b("missing closing `*/`", i);
                                h++
                            }
                            continue;
                        case 42:
                            if (m - 1 > h && 47 == a.charCodeAt(h + 1)) return b("unmatched `/*`", h);
                            continue
                    }
                return 0 !== n ? f > d && g > f ? b("missing closing `}` or `*/`", d) : b("missing closing `}`", d) : 0 !== o ? b("missing closing `)`", e) : (c(!0), p)
            }
        }, {}],
        35: [function (a, b) {
            var c = a("./chunker");
            b.exports = function () {
                function a() {
                    k.i > i && (h = h.slice(k.i - i), i = k.i)
                }
                var b, d, e, f, g, h, i, j = [],
                    k = {};
                k.save = function () {
                    i = k.i, j.push({
                        current: h,
                        i: k.i,
                        j: d
                    })
                }, k.restore = function (a) {
                    (k.i > e || k.i === e && a && !f) && (e = k.i, f = a);
                    var b = j.pop();
                    h = b.current, i = k.i = b.i, d = b.j
                }, k.forget = function () {
                    j.pop()
                }, k.isWhitespace = function (a) {
                    var c = k.i + (a || 0),
                        d = b.charCodeAt(c);
                    return d === l || d === o || d === m || d === n
                }, k.$ = function (c) {
                    var d, e, f = typeof c;
                    return "string" === f ? b.charAt(k.i) !== c ? null : (t(1), c) : (a(), (d = c.exec(h)) ? (e = d[0].length, t(e), "string" == typeof d ? d : 1 === d.length ? d[0] : d) : null)
                }, k.$re = function (a) {
                    k.i > i && (h = h.slice(k.i - i), i = k.i);
                    var b = a.exec(h);
                    return b ? (t(b[0].length), "string" == typeof b ? b : 1 === b.length ? b[0] : b) : null
                }, k.$char = function (a) {
                    return b.charAt(k.i) !== a ? null : (t(1), a)
                };
                var l = 32,
                    m = 9,
                    n = 10,
                    o = 13,
                    p = 43,
                    q = 44,
                    r = 47,
                    s = 57;
                k.autoCommentAbsorb = !0, k.commentStore = [], k.finished = !1;
                var t = function (a) {
                    for (var c, e, f, j = k.i, p = d, q = k.i - i, s = k.i + h.length - q, u = k.i += a, v = b; s > k.i; k.i++) {
                        if (c = v.charCodeAt(k.i), k.autoCommentAbsorb && c === r) {
                            if (e = v.charAt(k.i + 1), "/" === e) {
                                f = {
                                    index: k.i,
                                    isLineComment: !0
                                };
                                var w = v.indexOf("\n", k.i + 1);
                                0 > w && (w = s), k.i = w, f.text = v.substr(f.i, k.i - f.i), k.commentStore.push(f);
                                continue
                            }
                            if ("*" === e) {
                                var x = v.substr(k.i),
                                    y = x.match(/^\/\*(?:[^*]|\*+[^\/*])*\*+\//);
                                if (y) {
                                    f = {
                                        index: k.i,
                                        text: y[0],
                                        isLineComment: !1
                                    }, k.i += f.text.length - 1, k.commentStore.push(f);
                                    continue
                                }
                            }
                            break
                        }
                        if (c !== l && c !== n && c !== m && c !== o) break
                    }
                    if (h = h.slice(a + k.i - u + q), i = k.i, !h.length) {
                        if (g.length - 1 > d) return h = g[++d], t(0), !0;
                        k.finished = !0
                    }
                    return j !== k.i || p !== d
                };
                return k.peek = function (a) {
                    return "string" == typeof a ? b.charAt(k.i) === a : a.test(h)
                }, k.peekChar = function (a) {
                    return b.charAt(k.i) === a
                }, k.currentChar = function () {
                    return b.charAt(k.i)
                }, k.getInput = function () {
                    return b
                }, k.peekNotNumeric = function () {
                    var a = b.charCodeAt(k.i);
                    return a > s || p > a || a === r || a === q
                }, k.start = function (a, f, j) {
                    b = a, k.i = d = i = e = 0, g = f ? c(a, j) : [a], h = g[0], t(0)
                }, k.end = function () {
                    var a, c = k.i >= b.length;
                    return e > k.i && (a = f, k.i = e), {
                        isFinished: c,
                        furthest: k.i,
                        furthestPossibleErrorMessage: a,
                        furthestReachedEnd: k.i >= b.length - 1,
                        furthestChar: b[k.i]
                    }
                }, k
            }
        }, {
            "./chunker": 34
        }],
        36: [function (a, b) {
            var c = a("../less-error"),
                d = a("../tree"),
                e = a("../visitors"),
                f = a("./parser-input"),
                g = a("../utils"),
                h = function i(a, b, h) {
                    function j(a, b) {
                        var c = "[object Function]" === Object.prototype.toString.call(a) ? a.call(n) : o.$(a);
                        return c ? c : void l(b || ("string" == typeof a ? "expected '" + a + "' got '" + o.currentChar() + "'" : "unexpected token"))
                    }

                    function k(a, b) {
                        return o.$char(a) ? a : void l(b || "expected '" + a + "' got '" + o.currentChar() + "'")
                    }

                    function l(a, d) {
                        throw new c({
                            index: o.i,
                            filename: h.filename,
                            type: d || "Syntax",
                            message: a
                        }, b)
                    }

                    function m(a) {
                        var b = h.filename;
                        return {
                            lineNumber: g.getLocation(a, o.getInput()).line + 1,
                            fileName: b
                        }
                    }
                    var n, o = f();
                    return {
                        parse: function (f, g, j) {
                            var k, l, m, n = null,
                                p = "";
                            l = j && j.globalVars ? i.serializeVars(j.globalVars) + "\n" : "", m = j && j.modifyVars ? "\n" + i.serializeVars(j.modifyVars) : "", (l || j && j.banner) && (p = (j && j.banner ? j.banner : "") + l, b.contentsIgnoredChars[h.filename] = p.length), f = f.replace(/\r\n/g, "\n"), f = p + f.replace(/^\uFEFF/, "") + m, b.contents[h.filename] = f;
                            try {
                                o.start(f, a.chunkInput, function (a, d) {
                                    throw c({
                                        index: d,
                                        type: "Parse",
                                        message: a,
                                        filename: h.filename
                                    }, b)
                                }), k = new d.Ruleset(null, this.parsers.primary()), k.root = !0, k.firstRoot = !0
                            } catch (q) {
                                return g(new c(q, b, h.filename))
                            }
                            var r = o.end();
                            if (!r.isFinished) {
                                var s = r.furthestPossibleErrorMessage;
                                s || (s = "Unrecognised input", "}" === r.furthestChar ? s += ". Possibly missing opening '{'" : ")" === r.furthestChar ? s += ". Possibly missing opening '('" : r.furthestReachedEnd && (s += ". Possibly missing something")), n = new c({
                                    type: "Parse",
                                    message: s,
                                    index: r.furthest,
                                    filename: h.filename
                                }, b)
                            }
                            var t = function (a) {
                                return a = n || a || b.error, a ? (a instanceof c || (a = new c(a, b, h.filename)), g(a)) : g(null, k)
                            };
                            return a.processImports === !1 ? t() : void new e.ImportVisitor(b, t).run(k)
                        },
                        parsers: n = {
                            primary: function () {
                                for (var a, b = this.mixin, c = []; !o.finished;) {
                                    for (;;) {
                                        if (a = this.comment(), !a) break;
                                        c.push(a)
                                    }
                                    if (o.peek("}")) break;
                                    if (a = this.extendRule()) c = c.concat(a);
                                    else if (a = b.definition() || this.rule() || this.ruleset() || b.call() || this.rulesetCall() || this.directive()) c.push(a);
                                    else if (!o.$re(/^[\s\n]+/) && !o.$re(/^;+/)) break
                                }
                                return c
                            },
                            comment: function () {
                                if (o.commentStore.length) {
                                    var a = o.commentStore.shift();
                                    return new d.Comment(a.text, a.isLineComment, a.index, h)
                                }
                            },
                            entities: {
                                quoted: function () {
                                    var a, b = o.i;
                                    return a = o.$re(/^(~)?("((?:[^"\\\r\n]|\\.)*)"|'((?:[^'\\\r\n]|\\.)*)')/), a ? new d.Quoted(a[2], a[3] || a[4], Boolean(a[1]), b, h) : void 0
                                },
                                keyword: function () {
                                    var a = o.$re(/^%|^[_A-Za-z-][_A-Za-z0-9-]*/);
                                    return a ? d.Color.fromKeyword(a) || new d.Keyword(a) : void 0
                                },
                                call: function () {
                                    var a, b, c, e, f = o.i;
                                    if (!o.peek(/^url\(/i)) return o.save(), (a = o.$re(/^([\w-]+|%|progid:[\w\.]+)\(/)) ? (a = a[1], b = a.toLowerCase(), "alpha" === b && (e = n.alpha()) ? e : (c = this.arguments(), o.$char(")") ? (o.forget(), new d.Call(a, c, f, h)) : void o.restore("Could not parse call arguments or missing ')'"))) : void o.forget()
                                },
                                arguments: function () {
                                    for (var a, b = [];;) {
                                        if (a = this.assignment() || n.expression(), !a) break;
                                        if (b.push(a), !o.$char(",")) break
                                    }
                                    return b
                                },
                                literal: function () {
                                    return this.dimension() || this.color() || this.quoted() || this.unicodeDescriptor()
                                },
                                assignment: function () {
                                    var a, b;
                                    return a = o.$re(/^\w+(?=\s?=)/i), a && o.$char("=") ? (b = n.entity(), b ? new d.Assignment(a, b) : void 0) : void 0
                                },
                                url: function () {
                                    var a, b = o.i;
                                    return o.autoCommentAbsorb = !1, "u" === o.currentChar() && o.$re(/^url\(/) ? (a = this.quoted() || this.variable() || o.$re(/^(?:(?:\\[\(\)'"])|[^\(\)'"])+/) || "", o.autoCommentAbsorb = !0, k(")"), new d.URL(null != a.value || a instanceof d.Variable ? a : new d.Anonymous(a), b, h)) : void(o.autoCommentAbsorb = !0)
                                },
                                variable: function () {
                                    var a, b = o.i;
                                    return "@" === o.currentChar() && (a = o.$re(/^@@?[\w-]+/)) ? new d.Variable(a, b, h) : void 0
                                },
                                variableCurly: function () {
                                    var a, b = o.i;
                                    return "@" === o.currentChar() && (a = o.$re(/^@\{([\w-]+)\}/)) ? new d.Variable("@" + a[1], b, h) : void 0
                                },
                                color: function () {
                                    var a;
                                    if ("#" === o.currentChar() && (a = o.$re(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/))) {
                                        var b = a.input.match(/^#([\w]+).*/);
                                        return b = b[1], b.match(/^[A-Fa-f0-9]+$/) || l("Invalid HEX color code"), new d.Color(a[1])
                                    }
                                },
                                dimension: function () {
                                    if (!o.peekNotNumeric()) {
                                        var a = o.$re(/^([+-]?\d*\.?\d+)(%|[a-z]+)?/i);
                                        return a ? new d.Dimension(a[1], a[2]) : void 0
                                    }
                                },
                                unicodeDescriptor: function () {
                                    var a;
                                    return a = o.$re(/^U\+[0-9a-fA-F?]+(\-[0-9a-fA-F?]+)?/), a ? new d.UnicodeDescriptor(a[0]) : void 0
                                },
                                javascript: function () {
                                    var a, b = o.i;
                                    return a = o.$re(/^(~)?`([^`]*)`/), a ? new d.JavaScript(a[2], Boolean(a[1]), b, h) : void 0
                                }
                            },
                            variable: function () {
                                var a;
                                return "@" === o.currentChar() && (a = o.$re(/^(@[\w-]+)\s*:/)) ? a[1] : void 0
                            },
                            rulesetCall: function () {
                                var a;
                                return "@" === o.currentChar() && (a = o.$re(/^(@[\w-]+)\s*\(\s*\)\s*;/)) ? new d.RulesetCall(a[1]) : void 0
                            },
                            extend: function (a) {
                                var b, c, e, f, g, h = o.i;
                                if (o.$re(a ? /^&:extend\(/ : /^:extend\(/)) {
                                    do {
                                        for (e = null, b = null; !(e = o.$re(/^(all)(?=\s*(\)|,))/)) && (c = this.element());) b ? b.push(c) : b = [c];
                                        e = e && e[1], b || l("Missing target selector for :extend()."), g = new d.Extend(new d.Selector(b), e, h), f ? f.push(g) : f = [g]
                                    } while (o.$char(","));
                                    return j(/^\)/), a && j(/^;/), f
                                }
                            },
                            extendRule: function () {
                                return this.extend(!0)
                            },
                            mixin: {
                                call: function () {
                                    var a, b, c, e, f, g, i = o.currentChar(),
                                        j = !1,
                                        l = o.i;
                                    if ("." === i || "#" === i) {
                                        for (o.save();;) {
                                            if (a = o.i, e = o.$re(/^[#.](?:[\w-]|\\(?:[A-Fa-f0-9]{1,6} ?|[^A-Fa-f0-9]))+/), !e) break;
                                            c = new d.Element(f, e, a, h), b ? b.push(c) : b = [c], f = o.$char(">")
                                        }
                                        return b && (o.$char("(") && (g = this.args(!0).args, k(")")), n.important() && (j = !0), n.end()) ? (o.forget(), new d.mixin.Call(b, g, l, h, j)) : void o.restore()
                                    }
                                },
                                args: function (a) {
                                    var b, c, e, f, g, h, i = n.entities,
                                        j = {
                                            args: null,
                                            variadic: !1
                                        },
                                        k = [],
                                        m = [],
                                        p = [];
                                    for (o.save();;) {
                                        if (a) h = n.detachedRuleset() || n.expression();
                                        else {
                                            if (o.commentStore.length = 0, "." === o.currentChar() && o.$re(/^\.{3}/)) {
                                                j.variadic = !0, o.$char(";") && !b && (b = !0), (b ? m : p).push({
                                                    variadic: !0
                                                });
                                                break
                                            }
                                            h = i.variable() || i.literal() || i.keyword()
                                        }
                                        if (!h) break;
                                        f = null, h.throwAwayComments && h.throwAwayComments(), g = h;
                                        var q = null;
                                        if (a ? h.value && 1 == h.value.length && (q = h.value[0]) : q = h, q && q instanceof d.Variable)
                                            if (o.$char(":")) {
                                                if (k.length > 0 && (b && l("Cannot mix ; and , as delimiter types"), c = !0), g = a && n.detachedRuleset() || n.expression(), !g) {
                                                    if (!a) return o.restore(), j.args = [], j;
                                                    l("could not understand value for named argument")
                                                }
                                                f = e = q.name
                                            } else {
                                                if (!a && o.$re(/^\.{3}/)) {
                                                    j.variadic = !0, o.$char(";") && !b && (b = !0), (b ? m : p).push({
                                                        name: h.name,
                                                        variadic: !0
                                                    });
                                                    break
                                                }
                                                a || (e = f = q.name, g = null)
                                            } g && k.push(g), p.push({
                                            name: f,
                                            value: g
                                        }), o.$char(",") || (o.$char(";") || b) && (c && l("Cannot mix ; and , as delimiter types"), b = !0, k.length > 1 && (g = new d.Value(k)), m.push({
                                            name: e,
                                            value: g
                                        }), e = null, k = [], c = !1)
                                    }
                                    return o.forget(), j.args = b ? m : p, j
                                },
                                definition: function () {
                                    var a, b, c, e, f = [],
                                        g = !1;
                                    if (!("." !== o.currentChar() && "#" !== o.currentChar() || o.peek(/^[^{]*\}/)))
                                        if (o.save(), b = o.$re(/^([#.](?:[\w-]|\\(?:[A-Fa-f0-9]{1,6} ?|[^A-Fa-f0-9]))+)\s*\(/)) {
                                            a = b[1];
                                            var h = this.args(!1);
                                            if (f = h.args, g = h.variadic, !o.$char(")")) return void o.restore("Missing closing ')'");
                                            if (o.commentStore.length = 0, o.$re(/^when/) && (e = j(n.conditions, "expected condition")), c = n.block()) return o.forget(), new d.mixin.Definition(a, f, c, e, g);
                                            o.restore()
                                        } else o.forget()
                                }
                            },
                            entity: function () {
                                var a = this.entities;
                                return this.comment() || a.literal() || a.variable() || a.url() || a.call() || a.keyword() || a.javascript()
                            },
                            end: function () {
                                return o.$char(";") || o.peek("}")
                            },
                            alpha: function () {
                                var a;
                                if (o.$re(/^opacity=/i)) return a = o.$re(/^\d+/), a || (a = j(this.entities.variable, "Could not parse alpha")), k(")"), new d.Alpha(a)
                            },
                            element: function () {
                                var a, b, c, e = o.i;
                                return b = this.combinator(), a = o.$re(/^(?:\d+\.\d+|\d+)%/) || o.$re(/^(?:[.#]?|:*)(?:[\w-]|[^\x00-\x9f]|\\(?:[A-Fa-f0-9]{1,6} ?|[^A-Fa-f0-9]))+/) || o.$char("*") || o.$char("&") || this.attribute() || o.$re(/^\([^()@]+\)/) || o.$re(/^[\.#](?=@)/) || this.entities.variableCurly(), a || (o.save(), o.$char("(") ? (c = this.selector()) && o.$char(")") ? (a = new d.Paren(c), o.forget()) : o.restore("Missing closing ')'") : o.forget()), a ? new d.Element(b, a, e, h) : void 0
                            },
                            combinator: function () {
                                var a = o.currentChar();
                                if ("/" === a) {
                                    o.save();
                                    var b = o.$re(/^\/[a-z]+\//i);
                                    if (b) return o.forget(), new d.Combinator(b);
                                    o.restore()
                                }
                                if (">" === a || "+" === a || "~" === a || "|" === a || "^" === a) {
                                    for (o.i++, "^" === a && "^" === o.currentChar() && (a = "^^", o.i++); o.isWhitespace();) o.i++;
                                    return new d.Combinator(a)
                                }
                                return new d.Combinator(o.isWhitespace(-1) ? " " : null)
                            },
                            lessSelector: function () {
                                return this.selector(!0)
                            },
                            selector: function (a) {
                                for (var b, c, e, f, g, i, k, m = o.i;
                                    (a && (c = this.extend()) || a && (i = o.$re(/^when/)) || (f = this.element())) && (i ? k = j(this.conditions, "expected condition") : k ? l("CSS guard can only be used at the end of selector") : c ? g = g ? g.concat(c) : c : (g && l("Extend can only be used at the end of selector"), e = o.currentChar(), b ? b.push(f) : b = [f], f = null), "{" !== e && "}" !== e && ";" !== e && "," !== e && ")" !== e););
                                return b ? new d.Selector(b, g, k, m, h) : void(g && l("Extend must be used to extend a selector, it cannot be used on its own"))
                            },
                            attribute: function () {
                                if (o.$char("[")) {
                                    var a, b, c, e = this.entities;
                                    return (a = e.variableCurly()) || (a = j(/^(?:[_A-Za-z0-9-\*]*\|)?(?:[_A-Za-z0-9-]|\\.)+/)), c = o.$re(/^[|~*$^]?=/), c && (b = e.quoted() || o.$re(/^[0-9]+%/) || o.$re(/^[\w-]+/) || e.variableCurly()), k("]"), new d.Attribute(a, c, b)
                                }
                            },
                            block: function () {
                                var a;
                                return o.$char("{") && (a = this.primary()) && o.$char("}") ? a : void 0
                            },
                            blockRuleset: function () {
                                var a = this.block();
                                return a && (a = new d.Ruleset(null, a)), a
                            },
                            detachedRuleset: function () {
                                var a = this.blockRuleset();
                                return a ? new d.DetachedRuleset(a) : void 0
                            },
                            ruleset: function () {
                                var b, c, e, f;
                                for (o.save(), a.dumpLineNumbers && (f = m(o.i));;) {
                                    if (c = this.lessSelector(), !c) break;
                                    if (b ? b.push(c) : b = [c], o.commentStore.length = 0, c.condition && b.length > 1 && l("Guards are only currently allowed on a single selector."), !o.$char(",")) break;
                                    c.condition && l("Guards are only currently allowed on a single selector."), o.commentStore.length = 0
                                }
                                if (b && (e = this.block())) {
                                    o.forget();
                                    var g = new d.Ruleset(b, e, a.strictImports);
                                    return a.dumpLineNumbers && (g.debugInfo = f), g
                                }
                                o.restore()
                            },
                            rule: function (b) {
                                var c, e, f, g, i, j = o.i,
                                    k = o.currentChar();
                                if ("." !== k && "#" !== k && "&" !== k)
                                    if (o.save(), c = this.variable() || this.ruleProperty()) {
                                        if (i = "string" == typeof c, i && (e = this.detachedRuleset()), o.commentStore.length = 0, !e) {
                                            g = !i && c.pop().value;
                                            var l = !b && (a.compress || i);
                                            if (l && (e = this.value()), !e && (e = this.anonymousValue())) return o.forget(), new d.Rule(c, e, !1, g, j, h);
                                            l || e || (e = this.value()), f = this.important()
                                        }
                                        if (e && this.end()) return o.forget(), new d.Rule(c, e, f, g, j, h);
                                        if (o.restore(), e && !b) return this.rule(!0)
                                    } else o.forget()
                            },
                            anonymousValue: function () {
                                var a = o.$re(/^([^@+\/'"*`(;{}-]*);/);
                                return a ? new d.Anonymous(a[1]) : void 0
                            },
                            "import": function () {
                                var a, b, c = o.i,
                                    e = o.$re(/^@import?\s+/);
                                if (e) {
                                    var f = (e ? this.importOptions() : null) || {};
                                    if (a = this.entities.quoted() || this.entities.url()) return b = this.mediaFeatures(), o.$(";") || (o.i = c, l("missing semi-colon or unrecognised media features on import")), b = b && new d.Value(b), new d.Import(a, b, f, c, h);
                                    o.i = c, l("malformed import statement")
                                }
                            },
                            importOptions: function () {
                                var a, b, c, d = {};
                                if (!o.$char("(")) return null;
                                do
                                    if (a = this.importOption()) {
                                        switch (b = a, c = !0, b) {
                                            case "css":
                                                b = "less", c = !1;
                                                break;
                                            case "once":
                                                b = "multiple", c = !1
                                        }
                                        if (d[b] = c, !o.$char(",")) break
                                    } while (a);
                                return k(")"), d
                            },
                            importOption: function () {
                                var a = o.$re(/^(less|css|multiple|once|inline|reference)/);
                                return a ? a[1] : void 0
                            },
                            mediaFeature: function () {
                                var a, b, c = this.entities,
                                    e = [];
                                o.save();
                                do
                                    if (a = c.keyword() || c.variable()) e.push(a);
                                    else if (o.$char("(")) {
                                    if (b = this.property(), a = this.value(), !o.$char(")")) return o.restore("Missing closing ')'"), null;
                                    if (b && a) e.push(new d.Paren(new d.Rule(b, a, null, null, o.i, h, !0)));
                                    else {
                                        if (!a) return o.restore("badly formed media feature definition"), null;
                                        e.push(new d.Paren(a))
                                    }
                                } while (a);
                                return o.forget(), e.length > 0 ? new d.Expression(e) : void 0
                            },
                            mediaFeatures: function () {
                                var a, b = this.entities,
                                    c = [];
                                do
                                    if (a = this.mediaFeature()) {
                                        if (c.push(a), !o.$char(",")) break
                                    } else if (a = b.variable(), a && (c.push(a), !o.$char(","))) break; while (a);
                                return c.length > 0 ? c : null
                            },
                            media: function () {
                                var b, c, e, f;
                                return a.dumpLineNumbers && (f = m(o.i)), o.$re(/^@media/) && (b = this.mediaFeatures(), c = this.block()) ? (e = new d.Media(c, b, o.i, h), a.dumpLineNumbers && (e.debugInfo = f), e) : void 0
                            },
                            directive: function () {
                                var b, c, e, f, g, i, j, k = o.i,
                                    n = !0;
                                if ("@" === o.currentChar()) {
                                    if (c = this["import"]() || this.media()) return c;
                                    if (o.save(), b = o.$re(/^@[a-z-]+/)) {
                                        switch (f = b, "-" == b.charAt(1) && b.indexOf("-", 2) > 0 && (f = "@" + b.slice(b.indexOf("-", 2) + 1)), f) {
                                            case "@counter-style":
                                                g = !0, n = !0;
                                                break;
                                            case "@charset":
                                                g = !0, n = !1;
                                                break;
                                            case "@namespace":
                                                i = !0, n = !1;
                                                break;
                                            case "@keyframes":
                                                g = !0;
                                                break;
                                            case "@host":
                                            case "@page":
                                            case "@document":
                                            case "@supports":
                                                j = !0
                                        }
                                        return o.commentStore.length = 0, g ? (c = this.entity(), c || l("expected " + b + " identifier")) : i ? (c = this.expression(), c || l("expected " + b + " expression")) : j && (c = (o.$re(/^[^{;]+/) || "").trim(), c && (c = new d.Anonymous(c))), n && (e = this.blockRuleset()), e || !n && c && o.$char(";") ? (o.forget(), new d.Directive(b, c, e, k, h, a.dumpLineNumbers ? m(k) : null)) : void o.restore("directive options not recognised")
                                    }
                                }
                            },
                            value: function () {
                                var a, b = [];
                                do
                                    if (a = this.expression(), a && (b.push(a), !o.$char(","))) break; while (a);
                                return b.length > 0 ? new d.Value(b) : void 0
                            },
                            important: function () {
                                return "!" === o.currentChar() ? o.$re(/^! *important/) : void 0
                            },
                            sub: function () {
                                var a, b;
                                return o.save(), o.$char("(") ? (a = this.addition(), a && o.$char(")") ? (o.forget(), b = new d.Expression([a]), b.parens = !0, b) : void o.restore("Expected ')'")) : void o.restore()
                            },
                            multiplication: function () {
                                var a, b, c, e, f;
                                if (a = this.operand()) {
                                    for (f = o.isWhitespace(-1);;) {
                                        if (o.peek(/^\/[*\/]/)) break;
                                        if (o.save(), c = o.$char("/") || o.$char("*"), !c) {
                                            o.forget();
                                            break
                                        }
                                        if (b = this.operand(), !b) {
                                            o.restore();
                                            break
                                        }
                                        o.forget(), a.parensInOp = !0, b.parensInOp = !0, e = new d.Operation(c, [e || a, b], f), f = o.isWhitespace(-1)
                                    }
                                    return e || a
                                }
                            },
                            addition: function () {
                                var a, b, c, e, f;
                                if (a = this.multiplication()) {
                                    for (f = o.isWhitespace(-1);;) {
                                        if (c = o.$re(/^[-+]\s+/) || !f && (o.$char("+") || o.$char("-")), !c) break;
                                        if (b = this.multiplication(), !b) break;
                                        a.parensInOp = !0, b.parensInOp = !0, e = new d.Operation(c, [e || a, b], f), f = o.isWhitespace(-1)
                                    }
                                    return e || a
                                }
                            },
                            conditions: function () {
                                var a, b, c, e = o.i;
                                if (a = this.condition()) {
                                    for (;;) {
                                        if (!o.peek(/^,\s*(not\s*)?\(/) || !o.$char(",")) break;
                                        if (b = this.condition(), !b) break;
                                        c = new d.Condition("or", c || a, b, e)
                                    }
                                    return c || a
                                }
                            },
                            condition: function () {
                                var a, b, c, e, f = this.entities,
                                    g = o.i,
                                    h = !1;
                                return o.$re(/^not/) && (h = !0), k("("), a = this.addition() || f.keyword() || f.quoted(), a ? (e = o.$re(/^(?:>=|<=|=<|[<=>])/), e ? (b = this.addition() || f.keyword() || f.quoted(), b ? c = new d.Condition(e, a, b, g, h) : l("expected expression")) : c = new d.Condition("=", a, new d.Keyword("true"), g, h), k(")"), o.$re(/^and/) ? new d.Condition("and", c, this.condition()) : c) : void 0
                            },
                            operand: function () {
                                var a, b = this.entities;
                                o.peek(/^-[@\(]/) && (a = o.$char("-"));
                                var c = this.sub() || b.dimension() || b.color() || b.variable() || b.call();
                                return a && (c.parensInOp = !0, c = new d.Negative(c)), c
                            },
                            expression: function () {
                                var a, b, c = [];
                                do a = this.comment(), a ? c.push(a) : (a = this.addition() || this.entity(), a && (c.push(a), o.peek(/^\/[\/*]/) || (b = o.$char("/"), b && c.push(new d.Anonymous(b))))); while (a);
                                return c.length > 0 ? new d.Expression(c) : void 0
                            },
                            property: function () {
                                var a = o.$re(/^(\*?-?[_a-zA-Z0-9-]+)\s*:/);
                                return a ? a[1] : void 0
                            },
                            ruleProperty: function () {
                                function a(a) {
                                    var b = o.i,
                                        c = o.$re(a);
                                    return c ? (f.push(b), e.push(c[1])) : void 0
                                }
                                var b, c, e = [],
                                    f = [];
                                for (o.save(), a(/^(\*?)/);;)
                                    if (!a(/^((?:[\w-]+)|(?:@\{[\w-]+\}))/)) break;
                                if (e.length > 1 && a(/^((?:\+_|\+)?)\s*:/)) {
                                    for (o.forget(), "" === e[0] && (e.shift(), f.shift()), c = 0; e.length > c; c++) b = e[c], e[c] = "@" !== b.charAt(0) ? new d.Keyword(b) : new d.Variable("@" + b.slice(2, -1), f[c], h);
                                    return e
                                }
                                o.restore()
                            }
                        }
                    }
                };
            h.serializeVars = function (a) {
                var b = "";
                for (var c in a)
                    if (Object.hasOwnProperty.call(a, c)) {
                        var d = a[c];
                        b += ("@" === c[0] ? "" : "@") + c + ": " + d + (";" === ("" + d).slice(-1) ? "" : ";")
                    } return b
            }, b.exports = h
        }, {
            "../less-error": 30,
            "../tree": 59,
            "../utils": 80,
            "../visitors": 84,
            "./parser-input": 35
        }],
        37: [function (a, b) {
            var c = function (a) {
                this.less = a, this.visitors = [], this.postProcessors = [], this.installedPlugins = [], this.fileManagers = []
            };
            c.prototype.addPlugins = function (a) {
                if (a)
                    for (var b = 0; a.length > b; b++) this.addPlugin(a[b])
            }, c.prototype.addPlugin = function (a) {
                this.installedPlugins.push(a), a.install(this.less, this)
            }, c.prototype.addVisitor = function (a) {
                this.visitors.push(a)
            }, c.prototype.addPostProcessor = function (a, b) {
                var c;
                for (c = 0; this.postProcessors.length > c && !(this.postProcessors[c].priority >= b); c++);
                this.postProcessors.splice(c, 0, {
                    postProcessor: a,
                    priority: b
                })
            }, c.prototype.addFileManager = function (a) {
                this.fileManagers.push(a)
            }, c.prototype.getPostProcessors = function () {
                for (var a = [], b = 0; this.postProcessors.length > b; b++) a.push(this.postProcessors[b].postProcessor);
                return a
            }, c.prototype.getVisitors = function () {
                return this.visitors
            }, c.prototype.getFileManagers = function () {
                return this.fileManagers
            }, b.exports = c
        }, {}],
        38: [function (a, b) {
            var c = "undefined" == typeof Promise ? a("promise") : Promise;
            b.exports = function (a, b) {
                var d = function (a, e, f) {
                    if ("function" == typeof e && (f = e, e = {}), !f) {
                        var g = this;
                        return new c(function (b, c) {
                            d.call(g, a, e, function (a, d) {
                                a ? c(a) : b(d)
                            })
                        })
                    }
                    this.parse(a, e, function (a, c, d, e) {
                        if (a) return f(a);
                        var g;
                        try {
                            var h = new b(c, d);
                            g = h.toCSS(e)
                        } catch (a) {
                            return f(a)
                        }
                        f(null, g)
                    })
                };
                return d
            }
        }, {
            promise: void 0
        }],
        39: [function (a, b) {
            b.exports = function (a, b) {
                var c = function (a) {
                    this.options = a
                };
                return c.prototype.toCSS = function (b, c, d) {
                    var e = new a({
                            contentsIgnoredCharsMap: d.contentsIgnoredChars,
                            rootNode: b,
                            contentsMap: d.contents,
                            sourceMapFilename: this.options.sourceMapFilename,
                            sourceMapURL: this.options.sourceMapURL,
                            outputFilename: this.options.sourceMapOutputFilename,
                            sourceMapBasepath: this.options.sourceMapBasepath,
                            sourceMapRootpath: this.options.sourceMapRootpath,
                            outputSourceFiles: this.options.outputSourceFiles,
                            sourceMapGenerator: this.options.sourceMapGenerator,
                            sourceMapFileInline: this.options.sourceMapFileInline
                        }),
                        f = e.toCSS(c);
                    return this.sourceMap = e.sourceMap, this.sourceMapURL = e.sourceMapURL, this.options.sourceMapInputFilename && (this.sourceMapInputFilename = e.normalizeFilename(this.options.sourceMapInputFilename)), f + this.getCSSAppendage()
                }, c.prototype.getCSSAppendage = function () {
                    var a = this.sourceMapURL;
                    return this.options.sourceMapFileInline && (a = "data:application/json;base64," + b.encodeBase64(this.sourceMap)), a ? "/*# sourceMappingURL=" + a + " */" : ""
                }, c.prototype.getExternalSourceMap = function () {
                    return this.sourceMap
                }, c.prototype.setExternalSourceMap = function (a) {
                    this.sourceMap = a
                }, c.prototype.isInline = function () {
                    return this.options.sourceMapFileInline
                }, c.prototype.getSourceMapURL = function () {
                    return this.sourceMapURL
                }, c.prototype.getOutputFilename = function () {
                    return this.options.sourceMapOutputFilename
                }, c.prototype.getInputFilename = function () {
                    return this.sourceMapInputFilename
                }, c
            }
        }, {}],
        40: [function (a, b) {
            b.exports = function (a) {
                var b = function (b) {
                    this._css = [], this._rootNode = b.rootNode, this._contentsMap = b.contentsMap, this._contentsIgnoredCharsMap = b.contentsIgnoredCharsMap, b.sourceMapFilename && (this._sourceMapFilename = b.sourceMapFilename.replace(/\\/g, "/")), this._outputFilename = b.outputFilename, this.sourceMapURL = b.sourceMapURL, b.sourceMapBasepath && (this._sourceMapBasepath = b.sourceMapBasepath.replace(/\\/g, "/")), b.sourceMapRootpath ? (this._sourceMapRootpath = b.sourceMapRootpath.replace(/\\/g, "/"), "/" !== this._sourceMapRootpath.charAt(this._sourceMapRootpath.length - 1) && (this._sourceMapRootpath += "/")) : this._sourceMapRootpath = "", this._outputSourceFiles = b.outputSourceFiles, this._sourceMapGeneratorConstructor = a.getSourceMapGenerator(), this._lineNumber = 0, this._column = 0
                };
                return b.prototype.normalizeFilename = function (a) {
                    return a = a.replace(/\\/g, "/"), this._sourceMapBasepath && 0 === a.indexOf(this._sourceMapBasepath) && (a = a.substring(this._sourceMapBasepath.length), ("\\" === a.charAt(0) || "/" === a.charAt(0)) && (a = a.substring(1))), (this._sourceMapRootpath || "") + a
                }, b.prototype.add = function (a, b, c, d) {
                    if (a) {
                        var e, f, g, h, i;
                        if (b) {
                            var j = this._contentsMap[b.filename];
                            this._contentsIgnoredCharsMap[b.filename] && (c -= this._contentsIgnoredCharsMap[b.filename], 0 > c && (c = 0), j = j.slice(this._contentsIgnoredCharsMap[b.filename])), j = j.substring(0, c), f = j.split("\n"), h = f[f.length - 1]
                        }
                        if (e = a.split("\n"), g = e[e.length - 1], b)
                            if (d)
                                for (i = 0; e.length > i; i++) this._sourceMapGenerator.addMapping({
                                    generated: {
                                        line: this._lineNumber + i + 1,
                                        column: 0 === i ? this._column : 0
                                    },
                                    original: {
                                        line: f.length + i,
                                        column: 0 === i ? h.length : 0
                                    },
                                    source: this.normalizeFilename(b.filename)
                                });
                            else this._sourceMapGenerator.addMapping({
                                generated: {
                                    line: this._lineNumber + 1,
                                    column: this._column
                                },
                                original: {
                                    line: f.length,
                                    column: h.length
                                },
                                source: this.normalizeFilename(b.filename)
                            });
                        1 === e.length ? this._column += g.length : (this._lineNumber += e.length - 1, this._column = g.length), this._css.push(a)
                    }
                }, b.prototype.isEmpty = function () {
                    return 0 === this._css.length
                }, b.prototype.toCSS = function (a) {
                    if (this._sourceMapGenerator = new this._sourceMapGeneratorConstructor({
                            file: this._outputFilename,
                            sourceRoot: null
                        }), this._outputSourceFiles)
                        for (var b in this._contentsMap)
                            if (this._contentsMap.hasOwnProperty(b)) {
                                var c = this._contentsMap[b];
                                this._contentsIgnoredCharsMap[b] && (c = c.slice(this._contentsIgnoredCharsMap[b])), this._sourceMapGenerator.setSourceContent(this.normalizeFilename(b), c)
                            } if (this._rootNode.genCSS(a, this), this._css.length > 0) {
                        var d, e = JSON.stringify(this._sourceMapGenerator.toJSON());
                        this.sourceMapURL ? d = this.sourceMapURL : this._sourceMapFilename && (d = this._sourceMapFilename), this.sourceMapURL = d, this.sourceMap = e
                    }
                    return this._css.join("")
                }, b
            }
        }, {}],
        41: [function (a, b) {
            var c = a("./contexts"),
                d = a("./visitors"),
                e = a("./tree");
            b.exports = function (a, b) {
                b = b || {};
                var f, g = b.variables,
                    h = new c.Eval(b);
                "object" != typeof g || Array.isArray(g) || (g = Object.keys(g).map(function (a) {
                    var b = g[a];
                    return b instanceof e.Value || (b instanceof e.Expression || (b = new e.Expression([b])), b = new e.Value([b])), new e.Rule("@" + a, b, !1, null, 0)
                }), h.frames = [new e.Ruleset(null, g)]);
                var i, j = [],
                    k = [new d.JoinSelectorVisitor, new d.ExtendVisitor, new d.ToCSSVisitor({
                        compress: Boolean(b.compress)
                    })];
                if (b.pluginManager) {
                    var l = b.pluginManager.getVisitors();
                    for (i = 0; l.length > i; i++) {
                        var m = l[i];
                        m.isPreEvalVisitor ? j.push(m) : m.isPreVisitor ? k.splice(0, 0, m) : k.push(m)
                    }
                }
                for (i = 0; j.length > i; i++) j[i].run(a);
                for (f = a.eval(h), i = 0; k.length > i; i++) k[i].run(f);
                return f
            }
        }, {
            "./contexts": 10,
            "./tree": 59,
            "./visitors": 84
        }],
        42: [function (a, b) {
            var c = a("./node"),
                d = function (a) {
                    this.value = a
                };
            d.prototype = new c, d.prototype.type = "Alpha", d.prototype.accept = function (a) {
                this.value = a.visit(this.value)
            }, d.prototype.eval = function (a) {
                return this.value.eval ? new d(this.value.eval(a)) : this
            }, d.prototype.genCSS = function (a, b) {
                b.add("alpha(opacity="), this.value.genCSS ? this.value.genCSS(a, b) : b.add(this.value), b.add(")")
            }, b.exports = d
        }, {
            "./node": 67
        }],
        43: [function (a, b) {
            var c = a("./node"),
                d = function (a, b, c, d, e) {
                    this.value = a, this.index = b, this.mapLines = d, this.currentFileInfo = c, this.rulesetLike = "undefined" == typeof e ? !1 : e
                };
            d.prototype = new c, d.prototype.type = "Anonymous", d.prototype.eval = function () {
                return new d(this.value, this.index, this.currentFileInfo, this.mapLines, this.rulesetLike)
            }, d.prototype.compare = function (a) {
                return a.toCSS && this.toCSS() === a.toCSS() ? 0 : void 0
            }, d.prototype.isRulesetLike = function () {
                return this.rulesetLike
            }, d.prototype.genCSS = function (a, b) {
                b.add(this.value, this.currentFileInfo, this.index, this.mapLines)
            }, b.exports = d
        }, {
            "./node": 67
        }],
        44: [function (a, b) {
            var c = a("./node"),
                d = function (a, b) {
                    this.key = a, this.value = b
                };
            d.prototype = new c, d.prototype.type = "Assignment", d.prototype.accept = function (a) {
                this.value = a.visit(this.value)
            }, d.prototype.eval = function (a) {
                return this.value.eval ? new d(this.key, this.value.eval(a)) : this
            }, d.prototype.genCSS = function (a, b) {
                b.add(this.key + "="), this.value.genCSS ? this.value.genCSS(a, b) : b.add(this.value)
            }, b.exports = d
        }, {
            "./node": 67
        }],
        45: [function (a, b) {
            var c = a("./node"),
                d = function (a, b, c) {
                    this.key = a, this.op = b, this.value = c
                };
            d.prototype = new c, d.prototype.type = "Attribute", d.prototype.eval = function (a) {
                return new d(this.key.eval ? this.key.eval(a) : this.key, this.op, this.value && this.value.eval ? this.value.eval(a) : this.value)
            }, d.prototype.genCSS = function (a, b) {
                b.add(this.toCSS(a))
            }, d.prototype.toCSS = function (a) {
                var b = this.key.toCSS ? this.key.toCSS(a) : this.key;
                return this.op && (b += this.op, b += this.value.toCSS ? this.value.toCSS(a) : this.value), "[" + b + "]"
            }, b.exports = d
        }, {
            "./node": 67
        }],
        46: [function (a, b) {
            var c = a("./node"),
                d = a("../functions/function-caller"),
                e = function (a, b, c, d) {
                    this.name = a, this.args = b, this.index = c, this.currentFileInfo = d
                };
            e.prototype = new c, e.prototype.type = "Call", e.prototype.accept = function (a) {
                this.args && (this.args = a.visitArray(this.args))
            }, e.prototype.eval = function (a) {
                var b, c = this.args.map(function (b) {
                        return b.eval(a)
                    }),
                    f = new d(this.name, a, this.index, this.currentFileInfo);
                if (f.isValid()) try {
                    if (b = f.call(c), null != b) return b
                } catch (g) {
                    throw {
                        type: g.type || "Runtime",
                        message: "error evaluating function `" + this.name + "`" + (g.message ? ": " + g.message : ""),
                        index: this.index,
                        filename: this.currentFileInfo.filename
                    }
                }
                return new e(this.name, c, this.index, this.currentFileInfo)
            }, e.prototype.genCSS = function (a, b) {
                b.add(this.name + "(", this.currentFileInfo, this.index);
                for (var c = 0; this.args.length > c; c++) this.args[c].genCSS(a, b), this.args.length > c + 1 && b.add(", ");
                b.add(")")
            }, b.exports = e
        }, {
            "../functions/function-caller": 20,
            "./node": 67
        }],
        47: [function (a, b) {
            function c(a, b) {
                return Math.min(Math.max(a, 0), b)
            }

            function d(a) {
                return "#" + a.map(function (a) {
                    return a = c(Math.round(a), 255), (16 > a ? "0" : "") + a.toString(16)
                }).join("")
            }
            var e = a("./node"),
                f = a("../data/colors"),
                g = function (a, b) {
                    this.rgb = Array.isArray(a) ? a : 6 == a.length ? a.match(/.{2}/g).map(function (a) {
                        return parseInt(a, 16)
                    }) : a.split("").map(function (a) {
                        return parseInt(a + a, 16)
                    }), this.alpha = "number" == typeof b ? b : 1
                };
            g.prototype = new e, g.prototype.type = "Color", g.prototype.luma = function () {
                var a = this.rgb[0] / 255,
                    b = this.rgb[1] / 255,
                    c = this.rgb[2] / 255;
                return a = .03928 >= a ? a / 12.92 : Math.pow((a + .055) / 1.055, 2.4), b = .03928 >= b ? b / 12.92 : Math.pow((b + .055) / 1.055, 2.4), c = .03928 >= c ? c / 12.92 : Math.pow((c + .055) / 1.055, 2.4), .2126 * a + .7152 * b + .0722 * c
            }, g.prototype.genCSS = function (a, b) {
                b.add(this.toCSS(a))
            }, g.prototype.toCSS = function (a, b) {
                var d, e, f = a && a.compress && !b;
                if (this.keyword) return this.keyword;
                if (e = this.fround(a, this.alpha), 1 > e) return "rgba(" + this.rgb.map(function (a) {
                    return c(Math.round(a), 255)
                }).concat(c(e, 1)).join("," + (f ? "" : " ")) + ")";
                if (d = this.toRGB(), f) {
                    var g = d.split("");
                    g[1] === g[2] && g[3] === g[4] && g[5] === g[6] && (d = "#" + g[1] + g[3] + g[5])
                }
                return d
            }, g.prototype.operate = function (a, b, c) {
                for (var d = [], e = this.alpha * (1 - c.alpha) + c.alpha, f = 0; 3 > f; f++) d[f] = this._operate(a, b, this.rgb[f], c.rgb[f]);
                return new g(d, e)
            }, g.prototype.toRGB = function () {
                return d(this.rgb)
            }, g.prototype.toHSL = function () {
                var a, b, c = this.rgb[0] / 255,
                    d = this.rgb[1] / 255,
                    e = this.rgb[2] / 255,
                    f = this.alpha,
                    g = Math.max(c, d, e),
                    h = Math.min(c, d, e),
                    i = (g + h) / 2,
                    j = g - h;
                if (g === h) a = b = 0;
                else {
                    switch (b = i > .5 ? j / (2 - g - h) : j / (g + h), g) {
                        case c:
                            a = (d - e) / j + (e > d ? 6 : 0);
                            break;
                        case d:
                            a = (e - c) / j + 2;
                            break;
                        case e:
                            a = (c - d) / j + 4
                    }
                    a /= 6
                }
                return {
                    h: 360 * a,
                    s: b,
                    l: i,
                    a: f
                }
            }, g.prototype.toHSV = function () {
                var a, b, c = this.rgb[0] / 255,
                    d = this.rgb[1] / 255,
                    e = this.rgb[2] / 255,
                    f = this.alpha,
                    g = Math.max(c, d, e),
                    h = Math.min(c, d, e),
                    i = g,
                    j = g - h;
                if (b = 0 === g ? 0 : j / g, g === h) a = 0;
                else {
                    switch (g) {
                        case c:
                            a = (d - e) / j + (e > d ? 6 : 0);
                            break;
                        case d:
                            a = (e - c) / j + 2;
                            break;
                        case e:
                            a = (c - d) / j + 4
                    }
                    a /= 6
                }
                return {
                    h: 360 * a,
                    s: b,
                    v: i,
                    a: f
                }
            }, g.prototype.toARGB = function () {
                return d([255 * this.alpha].concat(this.rgb))
            }, g.prototype.compare = function (a) {
                return a.rgb && a.rgb[0] === this.rgb[0] && a.rgb[1] === this.rgb[1] && a.rgb[2] === this.rgb[2] && a.alpha === this.alpha ? 0 : void 0
            }, g.fromKeyword = function (a) {
                var b, c = a.toLowerCase();
                return f.hasOwnProperty(c) ? b = new g(f[c].slice(1)) : "transparent" === c && (b = new g([0, 0, 0], 0)), b ? (b.keyword = a, b) : void 0
            }, b.exports = g
        }, {
            "../data/colors": 11,
            "./node": 67
        }],
        48: [function (a, b) {
            var c = a("./node"),
                d = function (a) {
                    " " === a ? (this.value = " ", this.emptyOrWhitespace = !0) : (this.value = a ? a.trim() : "", this.emptyOrWhitespace = "" === this.value)
                };
            d.prototype = new c, d.prototype.type = "Combinator";
            var e = {
                "": !0,
                " ": !0,
                "|": !0
            };
            d.prototype.genCSS = function (a, b) {
                var c = a.compress || e[this.value] ? "" : " ";
                b.add(c + this.value + c)
            }, b.exports = d
        }, {
            "./node": 67
        }],
        49: [function (a, b) {
            var c = a("./node"),
                d = a("./debug-info"),
                e = function (a, b, c, d) {
                    this.value = a, this.isLineComment = b, this.currentFileInfo = d
                };
            e.prototype = new c, e.prototype.type = "Comment", e.prototype.genCSS = function (a, b) {
                this.debugInfo && b.add(d(a, this), this.currentFileInfo, this.index), b.add(this.value)
            }, e.prototype.isSilent = function (a) {
                var b = this.currentFileInfo && this.currentFileInfo.reference && !this.isReferenced,
                    c = a.compress && "!" !== this.value[2];
                return this.isLineComment || b || c
            }, e.prototype.markReferenced = function () {
                this.isReferenced = !0
            }, e.prototype.isRulesetLike = function (a) {
                return Boolean(a)
            }, b.exports = e
        }, {
            "./debug-info": 51,
            "./node": 67
        }],
        50: [function (a, b) {
            var c = a("./node"),
                d = function (a, b, c, d, e) {
                    this.op = a.trim(), this.lvalue = b, this.rvalue = c, this.index = d, this.negate = e
                };
            d.prototype = new c, d.prototype.type = "Condition", d.prototype.accept = function (a) {
                this.lvalue = a.visit(this.lvalue), this.rvalue = a.visit(this.rvalue)
            }, d.prototype.eval = function (a) {
                var b = function (a, b, d) {
                    switch (a) {
                        case "and":
                            return b && d;
                        case "or":
                            return b || d;
                        default:
                            switch (c.compare(b, d)) {
                                case -1:
                                    return "<" === a || "=<" === a || "<=" === a;
                                case 0:
                                    return "=" === a || ">=" === a || "=<" === a || "<=" === a;
                                case 1:
                                    return ">" === a || ">=" === a;
                                default:
                                    return !1
                            }
                    }
                }(this.op, this.lvalue.eval(a), this.rvalue.eval(a));
                return this.negate ? !b : b
            }, b.exports = d
        }, {
            "./node": 67
        }],
        51: [function (a, b) {
            var c = function (a, b, d) {
                var e = "";
                if (a.dumpLineNumbers && !a.compress) switch (a.dumpLineNumbers) {
                    case "comments":
                        e = c.asComment(b);
                        break;
                    case "mediaquery":
                        e = c.asMediaQuery(b);
                        break;
                    case "all":
                        e = c.asComment(b) + (d || "") + c.asMediaQuery(b)
                }
                return e
            };
            c.asComment = function (a) {
                return "/* line " + a.debugInfo.lineNumber + ", " + a.debugInfo.fileName + " */\n"
            }, c.asMediaQuery = function (a) {
                return "@media -sass-debug-info{filename{font-family:" + ("file://" + a.debugInfo.fileName).replace(/([.:\/\\])/g, function (a) {
                    return "\\" == a && (a = "/"), "\\" + a
                }) + "}line{font-family:\\00003" + a.debugInfo.lineNumber + "}}\n"
            }, b.exports = c
        }, {}],
        52: [function (a, b) {
            var c = a("./node"),
                d = a("../contexts"),
                e = function (a, b) {
                    this.ruleset = a, this.frames = b
                };
            e.prototype = new c, e.prototype.type = "DetachedRuleset", e.prototype.evalFirst = !0, e.prototype.accept = function (a) {
                this.ruleset = a.visit(this.ruleset)
            }, e.prototype.eval = function (a) {
                var b = this.frames || a.frames.slice(0);
                return new e(this.ruleset, b)
            }, e.prototype.callEval = function (a) {
                return this.ruleset.eval(this.frames ? new d.Eval(a, this.frames.concat(a.frames)) : a)
            }, b.exports = e
        }, {
            "../contexts": 10,
            "./node": 67
        }],
        53: [function (a, b) {
            var c = a("./node"),
                d = a("../data/unit-conversions"),
                e = a("./unit"),
                f = a("./color"),
                g = function (a, b) {
                    this.value = parseFloat(a), this.unit = b && b instanceof e ? b : new e(b ? [b] : void 0)
                };
            g.prototype = new c, g.prototype.type = "Dimension", g.prototype.accept = function (a) {
                this.unit = a.visit(this.unit)
            }, g.prototype.eval = function () {
                return this
            }, g.prototype.toColor = function () {
                return new f([this.value, this.value, this.value])
            }, g.prototype.genCSS = function (a, b) {
                if (a && a.strictUnits && !this.unit.isSingular()) throw new Error("Multiple units in dimension. Correct the units or use the unit function. Bad unit: " + this.unit.toString());
                var c = this.fround(a, this.value),
                    d = String(c);
                if (0 !== c && 1e-6 > c && c > -1e-6 && (d = c.toFixed(20).replace(/0+$/, "")), a && a.compress) {
                    if (0 === c && this.unit.isLength()) return void b.add(d);
                    c > 0 && 1 > c && (d = d.substr(1))
                }
                b.add(d), this.unit.genCSS(a, b)
            }, g.prototype.operate = function (a, b, c) {
                var d = this._operate(a, b, this.value, c.value),
                    e = this.unit.clone();
                if ("+" === b || "-" === b)
                    if (0 === e.numerator.length && 0 === e.denominator.length) e.numerator = c.unit.numerator.slice(0), e.denominator = c.unit.denominator.slice(0);
                    else if (0 === c.unit.numerator.length && 0 === e.denominator.length);
                else {
                    if (c = c.convertTo(this.unit.usedUnits()), a.strictUnits && c.unit.toString() !== e.toString()) throw new Error("Incompatible units. Change the units or use the unit function. Bad units: '" + e.toString() + "' and '" + c.unit.toString() + "'.");
                    d = this._operate(a, b, this.value, c.value)
                } else "*" === b ? (e.numerator = e.numerator.concat(c.unit.numerator).sort(), e.denominator = e.denominator.concat(c.unit.denominator).sort(), e.cancel()) : "/" === b && (e.numerator = e.numerator.concat(c.unit.denominator).sort(), e.denominator = e.denominator.concat(c.unit.numerator).sort(), e.cancel());
                return new g(d, e)
            }, g.prototype.compare = function (a) {
                var b, d;
                if (!(a instanceof g)) return void 0;
                if (this.unit.isEmpty() || a.unit.isEmpty()) b = this, d = a;
                else if (b = this.unify(), d = a.unify(), 0 !== b.unit.compare(d.unit)) return void 0;
                return c.numericCompare(b.value, d.value)
            }, g.prototype.unify = function () {
                return this.convertTo({
                    length: "px",
                    duration: "s",
                    angle: "rad"
                })
            }, g.prototype.convertTo = function (a) {
                var b, c, e, f, h, i = this.value,
                    j = this.unit.clone(),
                    k = {};
                if ("string" == typeof a) {
                    for (b in d) d[b].hasOwnProperty(a) && (k = {}, k[b] = a);
                    a = k
                }
                h = function (a, b) {
                    return e.hasOwnProperty(a) ? (b ? i /= e[a] / e[f] : i *= e[a] / e[f], f) : a
                };
                for (c in a) a.hasOwnProperty(c) && (f = a[c], e = d[c], j.map(h));
                return j.cancel(), new g(i, j)
            }, b.exports = g
        }, {
            "../data/unit-conversions": 13,
            "./color": 47,
            "./node": 67,
            "./unit": 76
        }],
        54: [function (a, b) {
            var c = a("./node"),
                d = a("./ruleset"),
                e = function (a, b, c, d, e, f) {
                    this.name = a, this.value = b, c && (this.rules = c, this.rules.allowImports = !0), this.index = d, this.currentFileInfo = e, this.debugInfo = f
                };
            e.prototype = new c, e.prototype.type = "Directive", e.prototype.accept = function (a) {
                var b = this.value,
                    c = this.rules;
                c && (this.rules = a.visit(c)), b && (this.value = a.visit(b))
            }, e.prototype.isRulesetLike = function () {
                return this.rules || !this.isCharset()
            }, e.prototype.isCharset = function () {
                return "@charset" === this.name
            }, e.prototype.genCSS = function (a, b) {
                var c = this.value,
                    d = this.rules;
                b.add(this.name, this.currentFileInfo, this.index), c && (b.add(" "), c.genCSS(a, b)), d ? this.outputRuleset(a, b, [d]) : b.add(";")
            }, e.prototype.eval = function (a) {
                var b = this.value,
                    c = this.rules;
                return b && (b = b.eval(a)), c && (c = c.eval(a), c.root = !0), new e(this.name, b, c, this.index, this.currentFileInfo, this.debugInfo)
            }, e.prototype.variable = function (a) {
                return this.rules ? d.prototype.variable.call(this.rules, a) : void 0
            }, e.prototype.find = function () {
                return this.rules ? d.prototype.find.apply(this.rules, arguments) : void 0
            }, e.prototype.rulesets = function () {
                return this.rules ? d.prototype.rulesets.apply(this.rules) : void 0
            }, e.prototype.markReferenced = function () {
                var a, b;
                if (this.isReferenced = !0, this.rules)
                    for (b = this.rules.rules, a = 0; b.length > a; a++) b[a].markReferenced && b[a].markReferenced()
            }, e.prototype.outputRuleset = function (a, b, c) {
                var d, e = c.length;
                if (a.tabLevel = (0 | a.tabLevel) + 1, a.compress) {
                    for (b.add("{"), d = 0; e > d; d++) c[d].genCSS(a, b);
                    return b.add("}"), void a.tabLevel--
                }
                var f = "\n" + Array(a.tabLevel).join("  "),
                    g = f + "  ";
                if (e) {
                    for (b.add(" {" + g), c[0].genCSS(a, b), d = 1; e > d; d++) b.add(g), c[d].genCSS(a, b);
                    b.add(f + "}")
                } else b.add(" {" + f + "}");
                a.tabLevel--
            }, b.exports = e
        }, {
            "./node": 67,
            "./ruleset": 73
        }],
        55: [function (a, b) {
            var c = a("./node"),
                d = a("./paren"),
                e = a("./combinator"),
                f = function (a, b, c, d) {
                    this.combinator = a instanceof e ? a : new e(a), this.value = "string" == typeof b ? b.trim() : b ? b : "", this.index = c, this.currentFileInfo = d
                };
            f.prototype = new c, f.prototype.type = "Element", f.prototype.accept = function (a) {
                var b = this.value;
                this.combinator = a.visit(this.combinator), "object" == typeof b && (this.value = a.visit(b))
            }, f.prototype.eval = function (a) {
                return new f(this.combinator, this.value.eval ? this.value.eval(a) : this.value, this.index, this.currentFileInfo)
            }, f.prototype.genCSS = function (a, b) {
                b.add(this.toCSS(a), this.currentFileInfo, this.index)
            }, f.prototype.toCSS = function (a) {
                a = a || {};
                var b = this.value,
                    c = a.firstSelector;
                return b instanceof d && (a.firstSelector = !0), b = b.toCSS ? b.toCSS(a) : b, a.firstSelector = c, "" === b && "&" === this.combinator.value.charAt(0) ? "" : this.combinator.toCSS(a) + b
            }, b.exports = f
        }, {
            "./combinator": 48,
            "./node": 67,
            "./paren": 69
        }],
        56: [function (a, b) {
            var c = a("./node"),
                d = a("./paren"),
                e = a("./comment"),
                f = function (a) {
                    if (this.value = a, !a) throw new Error("Expression requires a array parameter")
                };
            f.prototype = new c, f.prototype.type = "Expression", f.prototype.accept = function (a) {
                this.value = a.visitArray(this.value)
            }, f.prototype.eval = function (a) {
                var b, c = this.parens && !this.parensInOp,
                    e = !1;
                return c && a.inParenthesis(), this.value.length > 1 ? b = new f(this.value.map(function (b) {
                    return b.eval(a)
                })) : 1 === this.value.length ? (this.value[0].parens && !this.value[0].parensInOp && (e = !0), b = this.value[0].eval(a)) : b = this, c && a.outOfParenthesis(), this.parens && this.parensInOp && !a.isMathOn() && !e && (b = new d(b)), b
            }, f.prototype.genCSS = function (a, b) {
                for (var c = 0; this.value.length > c; c++) this.value[c].genCSS(a, b), this.value.length > c + 1 && b.add(" ")
            }, f.prototype.throwAwayComments = function () {
                this.value = this.value.filter(function (a) {
                    return !(a instanceof e)
                })
            }, b.exports = f
        }, {
            "./comment": 49,
            "./node": 67,
            "./paren": 69
        }],
        57: [function (a, b) {
            var c = a("./node"),
                d = function e(a, b, c) {
                    switch (this.selector = a, this.option = b, this.index = c, this.object_id = e.next_id++, this.parent_ids = [this.object_id], b) {
                        case "all":
                            this.allowBefore = !0, this.allowAfter = !0;
                            break;
                        default:
                            this.allowBefore = !1, this.allowAfter = !1
                    }
                };
            d.next_id = 0, d.prototype = new c, d.prototype.type = "Extend", d.prototype.accept = function (a) {
                this.selector = a.visit(this.selector)
            }, d.prototype.eval = function (a) {
                return new d(this.selector.eval(a), this.option, this.index)
            }, d.prototype.clone = function () {
                return new d(this.selector, this.option, this.index)
            }, d.prototype.findSelfSelectors = function (a) {
                var b, c, d = [];
                for (b = 0; a.length > b; b++) c = a[b].elements, b > 0 && c.length && "" === c[0].combinator.value && (c[0].combinator.value = " "), d = d.concat(a[b].elements);
                this.selfSelectors = [{
                    elements: d
                }]
            }, b.exports = d
        }, {
            "./node": 67
        }],
        58: [function (a, b) {
            var c = a("./node"),
                d = a("./media"),
                e = a("./url"),
                f = a("./quoted"),
                g = a("./ruleset"),
                h = a("./anonymous"),
                i = function (a, b, c, d, e) {
                    if (this.options = c, this.index = d, this.path = a, this.features = b, this.currentFileInfo = e, void 0 !== this.options.less || this.options.inline) this.css = !this.options.less || this.options.inline;
                    else {
                        var f = this.getPath();
                        f && /[#\.\&\?\/]css([\?;].*)?$/.test(f) && (this.css = !0)
                    }
                };
            i.prototype = new c, i.prototype.type = "Import", i.prototype.accept = function (a) {
                this.features && (this.features = a.visit(this.features)), this.path = a.visit(this.path), !this.options.inline && this.root && (this.root = a.visit(this.root))
            }, i.prototype.genCSS = function (a, b) {
                this.css && (b.add("@import ", this.currentFileInfo, this.index), this.path.genCSS(a, b), this.features && (b.add(" "), this.features.genCSS(a, b)), b.add(";"))
            }, i.prototype.getPath = function () {
                return this.path instanceof f ? this.path.value : this.path instanceof e ? this.path.value.value : null
            }, i.prototype.isVariableImport = function () {
                var a = this.path;
                return a instanceof e && (a = a.value), a instanceof f ? a.containsVariables() : !0
            }, i.prototype.evalForImport = function (a) {
                var b = this.path;
                return b instanceof e && (b = b.value), new i(b.eval(a), this.features, this.options, this.index, this.currentFileInfo)
            }, i.prototype.evalPath = function (a) {
                var b = this.path.eval(a),
                    c = this.currentFileInfo && this.currentFileInfo.rootpath;
                if (!(b instanceof e)) {
                    if (c) {
                        var d = b.value;
                        d && a.isPathRelative(d) && (b.value = c + d)
                    }
                    b.value = a.normalizePath(b.value)
                }
                return b
            }, i.prototype.eval = function (a) {
                var b, c = this.features && this.features.eval(a);
                if (this.skip && ("function" == typeof this.skip && (this.skip = this.skip()), this.skip)) return [];
                if (this.options.inline) {
                    var e = new h(this.root, 0, {
                        filename: this.importedFilename
                    }, !0, !0);
                    return this.features ? new d([e], this.features.value) : [e]
                }
                if (this.css) {
                    var f = new i(this.evalPath(a), c, this.options, this.index);
                    if (!f.css && this.error) throw this.error;
                    return f
                }
                return b = new g(null, this.root.rules.slice(0)), b.evalImports(a), this.features ? new d(b.rules, this.features.value) : b.rules
            }, b.exports = i
        }, {
            "./anonymous": 43,
            "./media": 63,
            "./node": 67,
            "./quoted": 70,
            "./ruleset": 73,
            "./url": 77
        }],
        59: [function (a, b) {
            var c = {};
            c.Alpha = a("./alpha"), c.Color = a("./color"), c.Directive = a("./directive"), c.DetachedRuleset = a("./detached-ruleset"), c.Operation = a("./operation"), c.Dimension = a("./dimension"), c.Unit = a("./unit"), c.Keyword = a("./keyword"), c.Variable = a("./variable"), c.Ruleset = a("./ruleset"), c.Element = a("./element"), c.Attribute = a("./attribute"), c.Combinator = a("./combinator"), c.Selector = a("./selector"), c.Quoted = a("./quoted"), c.Expression = a("./expression"), c.Rule = a("./rule"), c.Call = a("./call"), c.URL = a("./url"), c.Import = a("./import"), c.mixin = {
                Call: a("./mixin-call"),
                Definition: a("./mixin-definition")
            }, c.Comment = a("./comment"), c.Anonymous = a("./anonymous"), c.Value = a("./value"), c.JavaScript = a("./javascript"), c.Assignment = a("./assignment"), c.Condition = a("./condition"), c.Paren = a("./paren"), c.Media = a("./media"), c.UnicodeDescriptor = a("./unicode-descriptor"), c.Negative = a("./negative"), c.Extend = a("./extend"), c.RulesetCall = a("./ruleset-call"), b.exports = c
        }, {
            "./alpha": 42,
            "./anonymous": 43,
            "./assignment": 44,
            "./attribute": 45,
            "./call": 46,
            "./color": 47,
            "./combinator": 48,
            "./comment": 49,
            "./condition": 50,
            "./detached-ruleset": 52,
            "./dimension": 53,
            "./directive": 54,
            "./element": 55,
            "./expression": 56,
            "./extend": 57,
            "./import": 58,
            "./javascript": 60,
            "./keyword": 62,
            "./media": 63,
            "./mixin-call": 64,
            "./mixin-definition": 65,
            "./negative": 66,
            "./operation": 68,
            "./paren": 69,
            "./quoted": 70,
            "./rule": 71,
            "./ruleset": 73,
            "./ruleset-call": 72,
            "./selector": 74,
            "./unicode-descriptor": 75,
            "./unit": 76,
            "./url": 77,
            "./value": 78,
            "./variable": 79
        }],
        60: [function (a, b) {
            var c = a("./js-eval-node"),
                d = a("./dimension"),
                e = a("./quoted"),
                f = a("./anonymous"),
                g = function (a, b, c, d) {
                    this.escaped = b, this.expression = a, this.index = c, this.currentFileInfo = d
                };
            g.prototype = new c, g.prototype.type = "JavaScript", g.prototype.eval = function (a) {
                var b = this.evaluateJavaScript(this.expression, a);
                return "number" == typeof b ? new d(b) : "string" == typeof b ? new e('"' + b + '"', b, this.escaped, this.index) : new f(Array.isArray(b) ? b.join(", ") : b)
            }, b.exports = g
        }, {
            "./anonymous": 43,
            "./dimension": 53,
            "./js-eval-node": 61,
            "./quoted": 70
        }],
        61: [function (a, b) {
            var c = a("./node"),
                d = a("./variable"),
                e = function () {};
            e.prototype = new c, e.prototype.evaluateJavaScript = function (a, b) {
                var c, e = this,
                    f = {};
                if (void 0 !== b.javascriptEnabled && !b.javascriptEnabled) throw {
                    message: "You are using JavaScript, which has been disabled.",
                    filename: this.currentFileInfo.filename,
                    index: this.index
                };
                a = a.replace(/@\{([\w-]+)\}/g, function (a, c) {
                    return e.jsify(new d("@" + c, e.index, e.currentFileInfo).eval(b))
                });
                try {
                    a = new Function("return (" + a + ")")
                } catch (g) {
                    throw {
                        message: "JavaScript evaluation error: " + g.message + " from `" + a + "`",
                        filename: this.currentFileInfo.filename,
                        index: this.index
                    }
                }
                var h = b.frames[0].variables();
                for (var i in h) h.hasOwnProperty(i) && (f[i.slice(1)] = {
                    value: h[i].value,
                    toJS: function () {
                        return this.value.eval(b).toCSS()
                    }
                });
                try {
                    c = a.call(f)
                } catch (g) {
                    throw {
                        message: "JavaScript evaluation error: '" + g.name + ": " + g.message.replace(/["]/g, "'") + "'",
                        filename: this.currentFileInfo.filename,
                        index: this.index
                    }
                }
                return c
            }, e.prototype.jsify = function (a) {
                return Array.isArray(a.value) && a.value.length > 1 ? "[" + a.value.map(function (a) {
                    return a.toCSS()
                }).join(", ") + "]" : a.toCSS()
            }, b.exports = e
        }, {
            "./node": 67,
            "./variable": 79
        }],
        62: [function (a, b) {
            var c = a("./node"),
                d = function (a) {
                    this.value = a
                };
            d.prototype = new c, d.prototype.type = "Keyword", d.prototype.genCSS = function (a, b) {
                if ("%" === this.value) throw {
                    type: "Syntax",
                    message: "Invalid % without number"
                };
                b.add(this.value)
            }, d.True = new d("true"), d.False = new d("false"), b.exports = d
        }, {
            "./node": 67
        }],
        63: [function (a, b) {
            var c = a("./ruleset"),
                d = a("./value"),
                e = a("./element"),
                f = a("./selector"),
                g = a("./anonymous"),
                h = a("./expression"),
                i = a("./directive"),
                j = function (a, b, e, f) {
                    this.index = e, this.currentFileInfo = f;
                    var g = this.emptySelectors();
                    this.features = new d(b), this.rules = [new c(g, a)], this.rules[0].allowImports = !0
                };
            j.prototype = new i, j.prototype.type = "Media", j.prototype.isRulesetLike = !0, j.prototype.accept = function (a) {
                this.features && (this.features = a.visit(this.features)), this.rules && (this.rules = a.visitArray(this.rules))
            }, j.prototype.genCSS = function (a, b) {
                b.add("@media ", this.currentFileInfo, this.index), this.features.genCSS(a, b), this.outputRuleset(a, b, this.rules)
            }, j.prototype.eval = function (a) {
                a.mediaBlocks || (a.mediaBlocks = [], a.mediaPath = []);
                var b = new j(null, [], this.index, this.currentFileInfo);
                this.debugInfo && (this.rules[0].debugInfo = this.debugInfo, b.debugInfo = this.debugInfo);
                var c = !1;
                a.strictMath || (c = !0, a.strictMath = !0);
                try {
                    b.features = this.features.eval(a)
                } finally {
                    c && (a.strictMath = !1)
                }
                return a.mediaPath.push(b), a.mediaBlocks.push(b), a.frames.unshift(this.rules[0]), b.rules = [this.rules[0].eval(a)], a.frames.shift(), a.mediaPath.pop(), 0 === a.mediaPath.length ? b.evalTop(a) : b.evalNested(a)
            }, j.prototype.variable = function (a) {
                return c.prototype.variable.call(this.rules[0], a)
            }, j.prototype.find = function () {
                return c.prototype.find.apply(this.rules[0], arguments)
            }, j.prototype.rulesets = function () {
                return c.prototype.rulesets.apply(this.rules[0])
            }, j.prototype.emptySelectors = function () {
                var a = new e("", "&", this.index, this.currentFileInfo),
                    b = [new f([a], null, null, this.index, this.currentFileInfo)];
                return b[0].mediaEmpty = !0, b
            }, j.prototype.markReferenced = function () {
                var a, b = this.rules[0].rules;
                for (this.rules[0].markReferenced(), this.isReferenced = !0, a = 0; b.length > a; a++) b[a].markReferenced && b[a].markReferenced()
            }, j.prototype.evalTop = function (a) {
                var b = this;
                if (a.mediaBlocks.length > 1) {
                    var d = this.emptySelectors();
                    b = new c(d, a.mediaBlocks), b.multiMedia = !0
                }
                return delete a.mediaBlocks, delete a.mediaPath, b
            }, j.prototype.evalNested = function (a) {
                var b, e, f = a.mediaPath.concat([this]);
                for (b = 0; f.length > b; b++) e = f[b].features instanceof d ? f[b].features.value : f[b].features, f[b] = Array.isArray(e) ? e : [e];
                return this.features = new d(this.permute(f).map(function (a) {
                    for (a = a.map(function (a) {
                            return a.toCSS ? a : new g(a)
                        }), b = a.length - 1; b > 0; b--) a.splice(b, 0, new g("and"));
                    return new h(a)
                })), new c([], [])
            }, j.prototype.permute = function (a) {
                if (0 === a.length) return [];
                if (1 === a.length) return a[0];
                for (var b = [], c = this.permute(a.slice(1)), d = 0; c.length > d; d++)
                    for (var e = 0; a[0].length > e; e++) b.push([a[0][e]].concat(c[d]));
                return b
            }, j.prototype.bubbleSelectors = function (a) {
                a && (this.rules = [new c(a.slice(0), [this.rules[0]])])
            }, b.exports = j
        }, {
            "./anonymous": 43,
            "./directive": 54,
            "./element": 55,
            "./expression": 56,
            "./ruleset": 73,
            "./selector": 74,
            "./value": 78
        }],
        64: [function (a, b) {
            var c = a("./node"),
                d = a("./selector"),
                e = a("./mixin-definition"),
                f = a("../functions/default"),
                g = function (a, b, c, e, f) {
                    this.selector = new d(a), this.arguments = b && b.length ? b : null, this.index = c, this.currentFileInfo = e, this.important = f
                };
            g.prototype = new c, g.prototype.type = "MixinCall", g.prototype.accept = function (a) {
                this.selector && (this.selector = a.visit(this.selector)), this.arguments && (this.arguments = a.visitArray(this.arguments))
            }, g.prototype.eval = function (a) {
                function b(b, c) {
                    var d, e;
                    for (k = 0; 2 > k; k++) {
                        for (w[k] = !0, f.value(k), d = 0; c.length > d && w[k]; d++) e = c[d], e.matchCondition && (w[k] = w[k] && e.matchCondition(null, a));
                        b.matchCondition && (w[k] = w[k] && b.matchCondition(h, a))
                    }
                    return w[0] || w[1] ? w[0] != w[1] ? w[1] ? z : A : y : x
                }
                var c, d, g, h, i, j, k, l, m, n, o, p, q, r, s, t = [],
                    u = !1,
                    v = [],
                    w = [],
                    x = -1,
                    y = 0,
                    z = 1,
                    A = 2;
                for (h = this.arguments && this.arguments.map(function (b) {
                        return {
                            name: b.name,
                            value: b.value.eval(a)
                        }
                    }), s = function (b) {
                        return b.matchArgs(null, a)
                    }, i = 0; a.frames.length > i; i++)
                    if ((c = a.frames[i].find(this.selector, null, s)).length > 0) {
                        for (m = !0, j = 0; c.length > j; j++) {
                            for (d = c[j].rule, g = c[j].path, l = !1, k = 0; a.frames.length > k; k++)
                                if (!(d instanceof e) && d === (a.frames[k].originalRuleset || a.frames[k])) {
                                    l = !0;
                                    break
                                } l || d.matchArgs(h, a) && (o = {
                                mixin: d,
                                group: b(d, g)
                            }, o.group !== x && v.push(o), u = !0)
                        }
                        for (f.reset(), q = [0, 0, 0], j = 0; v.length > j; j++) q[v[j].group]++;
                        if (q[y] > 0) p = A;
                        else if (p = z, q[z] + q[A] > 1) throw {
                            type: "Runtime",
                            message: "Ambiguous use of `default()` found when matching for `" + this.format(h) + "`",
                            index: this.index,
                            filename: this.currentFileInfo.filename
                        };
                        for (j = 0; v.length > j; j++)
                            if (o = v[j].group, o === y || o === p) try {
                                d = v[j].mixin, d instanceof e || (r = d.originalRuleset || d, d = new e("", [], d.rules, null, !1), d.originalRuleset = r), Array.prototype.push.apply(t, d.evalCall(a, h, this.important).rules)
                            } catch (B) {
                                throw {
                                    message: B.message,
                                    index: this.index,
                                    filename: this.currentFileInfo.filename,
                                    stack: B.stack
                                }
                            }
                        if (u) {
                            if (!this.currentFileInfo || !this.currentFileInfo.reference)
                                for (i = 0; t.length > i; i++) n = t[i], n.markReferenced && n.markReferenced();
                            return t
                        }
                    } throw m ? {
                    type: "Runtime",
                    message: "No matching definition was found for `" + this.format(h) + "`",
                    index: this.index,
                    filename: this.currentFileInfo.filename
                } : {
                    type: "Name",
                    message: this.selector.toCSS().trim() + " is undefined",
                    index: this.index,
                    filename: this.currentFileInfo.filename
                }
            }, g.prototype.format = function (a) {
                return this.selector.toCSS().trim() + "(" + (a ? a.map(function (a) {
                    var b = "";
                    return a.name && (b += a.name + ":"), b += a.value.toCSS ? a.value.toCSS() : "???"
                }).join(", ") : "") + ")"
            }, b.exports = g
        }, {
            "../functions/default": 19,
            "./mixin-definition": 65,
            "./node": 67,
            "./selector": 74
        }],
        65: [function (a, b) {
            var c = a("./selector"),
                d = a("./element"),
                e = a("./ruleset"),
                f = a("./rule"),
                g = a("./expression"),
                h = a("../contexts"),
                i = function (a, b, e, f, g, h) {
                    this.name = a, this.selectors = [new c([new d(null, a, this.index, this.currentFileInfo)])], this.params = b, this.condition = f, this.variadic = g, this.arity = b.length, this.rules = e, this._lookups = {}, this.required = b.reduce(function (a, b) {
                        return !b.name || b.name && !b.value ? a + 1 : a
                    }, 0), this.frames = h
                };
            i.prototype = new e, i.prototype.type = "MixinDefinition", i.prototype.evalFirst = !0, i.prototype.accept = function (a) {
                this.params && this.params.length && (this.params = a.visitArray(this.params)), this.rules = a.visitArray(this.rules), this.condition && (this.condition = a.visit(this.condition))
            }, i.prototype.evalParams = function (a, b, c, d) {
                var i, j, k, l, m, n, o, p, q = new e(null, null),
                    r = this.params.slice(0),
                    s = 0;
                if (b = new h.Eval(b, [q].concat(b.frames)), c)
                    for (c = c.slice(0), s = c.length, k = 0; s > k; k++)
                        if (j = c[k], n = j && j.name) {
                            for (o = !1, l = 0; r.length > l; l++)
                                if (!d[l] && n === r[l].name) {
                                    d[l] = j.value.eval(a), q.prependRule(new f(n, j.value.eval(a))), o = !0;
                                    break
                                } if (o) {
                                c.splice(k, 1), k--;
                                continue
                            }
                            throw {
                                type: "Runtime",
                                message: "Named argument for " + this.name + " " + c[k].name + " not found"
                            }
                        } for (p = 0, k = 0; r.length > k; k++)
                    if (!d[k]) {
                        if (j = c && c[p], n = r[k].name)
                            if (r[k].variadic) {
                                for (i = [], l = p; s > l; l++) i.push(c[l].value.eval(a));
                                q.prependRule(new f(n, new g(i).eval(a)))
                            } else {
                                if (m = j && j.value) m = m.eval(a);
                                else {
                                    if (!r[k].value) throw {
                                        type: "Runtime",
                                        message: "wrong number of arguments for " + this.name + " (" + s + " for " + this.arity + ")"
                                    };
                                    m = r[k].value.eval(b), q.resetCache()
                                }
                                q.prependRule(new f(n, m)), d[k] = m
                            } if (r[k].variadic && c)
                            for (l = p; s > l; l++) d[l] = c[l].value.eval(a);
                        p++
                    } return q
            }, i.prototype.eval = function (a) {
                return new i(this.name, this.params, this.rules, this.condition, this.variadic, this.frames || a.frames.slice(0))
            }, i.prototype.evalCall = function (a, b, c) {
                var d, i, j = [],
                    k = this.frames ? this.frames.concat(a.frames) : a.frames,
                    l = this.evalParams(a, new h.Eval(a, k), b, j);
                return l.prependRule(new f("@arguments", new g(j).eval(a))), d = this.rules.slice(0), i = new e(null, d), i.originalRuleset = this, i = i.eval(new h.Eval(a, [this, l].concat(k))), c && (i = this.makeImportant.apply(i)), i
            }, i.prototype.matchCondition = function (a, b) {
                return this.condition && !this.condition.eval(new h.Eval(b, [this.evalParams(b, new h.Eval(b, this.frames ? this.frames.concat(b.frames) : b.frames), a, [])].concat(this.frames).concat(b.frames))) ? !1 : !0
            }, i.prototype.matchArgs = function (a, b) {
                var c, d = a && a.length || 0;
                if (this.variadic) {
                    if (this.required - 1 > d) return !1
                } else {
                    if (this.required > d) return !1;
                    if (d > this.params.length) return !1
                }
                c = Math.min(d, this.arity);
                for (var e = 0; c > e; e++)
                    if (!this.params[e].name && !this.params[e].variadic && a[e].value.eval(b).toCSS() != this.params[e].value.eval(b).toCSS()) return !1;
                return !0
            }, b.exports = i
        }, {
            "../contexts": 10,
            "./element": 55,
            "./expression": 56,
            "./rule": 71,
            "./ruleset": 73,
            "./selector": 74
        }],
        66: [function (a, b) {
            var c = a("./node"),
                d = a("./operation"),
                e = a("./dimension"),
                f = function (a) {
                    this.value = a
                };
            f.prototype = new c, f.prototype.type = "Negative", f.prototype.genCSS = function (a, b) {
                b.add("-"), this.value.genCSS(a, b)
            }, f.prototype.eval = function (a) {
                return a.isMathOn() ? new d("*", [new e(-1), this.value]).eval(a) : new f(this.value.eval(a))
            }, b.exports = f
        }, {
            "./dimension": 53,
            "./node": 67,
            "./operation": 68
        }],
        67: [function (a, b) {
            var c = function () {};
            c.prototype.toCSS = function (a) {
                var b = [];
                return this.genCSS(a, {
                    add: function (a) {
                        b.push(a)
                    },
                    isEmpty: function () {
                        return 0 === b.length
                    }
                }), b.join("")
            }, c.prototype.genCSS = function (a, b) {
                b.add(this.value)
            }, c.prototype.accept = function (a) {
                this.value = a.visit(this.value)
            }, c.prototype.eval = function () {
                return this
            }, c.prototype._operate = function (a, b, c, d) {
                switch (b) {
                    case "+":
                        return c + d;
                    case "-":
                        return c - d;
                    case "*":
                        return c * d;
                    case "/":
                        return c / d
                }
            }, c.prototype.fround = function (a, b) {
                var c = a && a.numPrecision;
                return null == c ? b : Number((b + 2e-16).toFixed(c))
            }, c.compare = function (a, b) {
                if (a.compare && "Quoted" !== b.type && "Anonymous" !== b.type) return a.compare(b);
                if (b.compare) return -b.compare(a);
                if (a.type !== b.type) return void 0;
                if (a = a.value, b = b.value, !Array.isArray(a)) return a === b ? 0 : void 0;
                if (a.length !== b.length) return void 0;
                for (var d = 0; a.length > d; d++)
                    if (0 !== c.compare(a[d], b[d])) return void 0;
                return 0
            }, c.numericCompare = function (a, b) {
                return b > a ? -1 : a === b ? 0 : a > b ? 1 : void 0
            }, b.exports = c
        }, {}],
        68: [function (a, b) {
            var c = a("./node"),
                d = a("./color"),
                e = a("./dimension"),
                f = function (a, b, c) {
                    this.op = a.trim(), this.operands = b, this.isSpaced = c
                };
            f.prototype = new c, f.prototype.type = "Operation", f.prototype.accept = function (a) {
                this.operands = a.visit(this.operands)
            }, f.prototype.eval = function (a) {
                var b = this.operands[0].eval(a),
                    c = this.operands[1].eval(a);
                if (a.isMathOn()) {
                    if (b instanceof e && c instanceof d && (b = b.toColor()), c instanceof e && b instanceof d && (c = c.toColor()), !b.operate) throw {
                        type: "Operation",
                        message: "Operation on an invalid type"
                    };
                    return b.operate(a, this.op, c)
                }
                return new f(this.op, [b, c], this.isSpaced)
            }, f.prototype.genCSS = function (a, b) {
                this.operands[0].genCSS(a, b), this.isSpaced && b.add(" "), b.add(this.op), this.isSpaced && b.add(" "), this.operands[1].genCSS(a, b)
            }, b.exports = f
        }, {
            "./color": 47,
            "./dimension": 53,
            "./node": 67
        }],
        69: [function (a, b) {
            var c = a("./node"),
                d = function (a) {
                    this.value = a
                };
            d.prototype = new c, d.prototype.type = "Paren", d.prototype.genCSS = function (a, b) {
                b.add("("), this.value.genCSS(a, b), b.add(")")
            }, d.prototype.eval = function (a) {
                return new d(this.value.eval(a))
            }, b.exports = d
        }, {
            "./node": 67
        }],
        70: [function (a, b) {
            var c = a("./node"),
                d = a("./js-eval-node"),
                e = a("./variable"),
                f = function (a, b, c, d, e) {
                    this.escaped = null == c ? !0 : c, this.value = b || "", this.quote = a.charAt(0), this.index = d, this.currentFileInfo = e
                };
            f.prototype = new d, f.prototype.type = "Quoted", f.prototype.genCSS = function (a, b) {
                this.escaped || b.add(this.quote, this.currentFileInfo, this.index), b.add(this.value), this.escaped || b.add(this.quote)
            }, f.prototype.containsVariables = function () {
                return this.value.match(/(`([^`]+)`)|@\{([\w-]+)\}/)
            }, f.prototype.eval = function (a) {
                function b(a, b, c) {
                    var d = a;
                    do a = d, d = a.replace(b, c); while (a !== d);
                    return d
                }
                var c = this,
                    d = this.value,
                    g = function (b, d) {
                        return String(c.evaluateJavaScript(d, a))
                    },
                    h = function (b, d) {
                        var g = new e("@" + d, c.index, c.currentFileInfo).eval(a, !0);
                        return g instanceof f ? g.value : g.toCSS()
                    };
                return d = b(d, /`([^`]+)`/g, g), d = b(d, /@\{([\w-]+)\}/g, h), new f(this.quote + d + this.quote, d, this.escaped, this.index, this.currentFileInfo)
            }, f.prototype.compare = function (a) {
                return "Quoted" !== a.type || this.escaped || a.escaped ? a.toCSS && this.toCSS() === a.toCSS() ? 0 : void 0 : c.numericCompare(this.value, a.value)
            }, b.exports = f
        }, {
            "./js-eval-node": 61,
            "./node": 67,
            "./variable": 79
        }],
        71: [function (a, b) {
            function c(a, b) {
                var c, d = "",
                    e = b.length,
                    f = {
                        add: function (a) {
                            d += a
                        }
                    };
                for (c = 0; e > c; c++) b[c].eval(a).genCSS(a, f);
                return d
            }
            var d = a("./node"),
                e = a("./value"),
                f = a("./keyword"),
                g = function (a, b, c, f, g, h, i, j) {
                    this.name = a, this.value = b instanceof d ? b : new e([b]), this.important = c ? " " + c.trim() : "", this.merge = f, this.index = g, this.currentFileInfo = h, this.inline = i || !1, this.variable = void 0 !== j ? j : a.charAt && "@" === a.charAt(0)
                };
            g.prototype = new d, g.prototype.type = "Rule", g.prototype.genCSS = function (a, b) {
                b.add(this.name + (a.compress ? ":" : ": "), this.currentFileInfo, this.index);
                try {
                    this.value.genCSS(a, b)
                } catch (c) {
                    throw c.index = this.index, c.filename = this.currentFileInfo.filename, c
                }
                b.add(this.important + (this.inline || a.lastRule && a.compress ? "" : ";"), this.currentFileInfo, this.index)
            }, g.prototype.eval = function (a) {
                var b, d = !1,
                    e = this.name,
                    h = this.variable;
                "string" != typeof e && (e = 1 === e.length && e[0] instanceof f ? e[0].value : c(a, e), h = !1), "font" !== e || a.strictMath || (d = !0, a.strictMath = !0);
                try {
                    if (a.importantScope.push({}), b = this.value.eval(a), !this.variable && "DetachedRuleset" === b.type) throw {
                        message: "Rulesets cannot be evaluated on a property.",
                        index: this.index,
                        filename: this.currentFileInfo.filename
                    };
                    var i = this.important,
                        j = a.importantScope.pop();
                    return !i && j.important && (i = j.important), new g(e, b, i, this.merge, this.index, this.currentFileInfo, this.inline, h)
                } catch (k) {
                    throw "number" != typeof k.index && (k.index = this.index, k.filename = this.currentFileInfo.filename), k
                } finally {
                    d && (a.strictMath = !1)
                }
            }, g.prototype.makeImportant = function () {
                return new g(this.name, this.value, "!important", this.merge, this.index, this.currentFileInfo, this.inline)
            }, b.exports = g
        }, {
            "./keyword": 62,
            "./node": 67,
            "./value": 78
        }],
        72: [function (a, b) {
            var c = a("./node"),
                d = a("./variable"),
                e = function (a) {
                    this.variable = a
                };
            e.prototype = new c, e.prototype.type = "RulesetCall", e.prototype.eval = function (a) {
                var b = new d(this.variable).eval(a);
                return b.callEval(a)
            }, b.exports = e
        }, {
            "./node": 67,
            "./variable": 79
        }],
        73: [function (a, b) {
            var c = a("./node"),
                d = a("./rule"),
                e = a("./selector"),
                f = a("./element"),
                g = a("../contexts"),
                h = a("../functions/default"),
                i = a("./debug-info"),
                j = function (a, b, c) {
                    this.selectors = a, this.rules = b, this._lookups = {}, this.strictImports = c
                };
            j.prototype = new c, j.prototype.type = "Ruleset", j.prototype.isRuleset = !0, j.prototype.isRulesetLike = !0, j.prototype.accept = function (a) {
                this.paths ? a.visitArray(this.paths, !0) : this.selectors && (this.selectors = a.visitArray(this.selectors)), this.rules && this.rules.length && (this.rules = a.visitArray(this.rules))
            }, j.prototype.eval = function (a) {
                var b, c, e, f, g = this.selectors,
                    i = !1;
                if (g && (c = g.length)) {
                    for (b = [], h.error({
                            type: "Syntax",
                            message: "it is currently only allowed in parametric mixin guards,"
                        }), f = 0; c > f; f++) e = g[f].eval(a), b.push(e), e.evaldCondition && (i = !0);
                    h.reset()
                } else i = !0;
                var k, l, m = this.rules ? this.rules.slice(0) : null,
                    n = new j(b, m, this.strictImports);
                n.originalRuleset = this, n.root = this.root, n.firstRoot = this.firstRoot, n.allowImports = this.allowImports, this.debugInfo && (n.debugInfo = this.debugInfo), i || (m.length = 0);
                var o = a.frames;
                o.unshift(n);
                var p = a.selectors;
                p || (a.selectors = p = []), p.unshift(this.selectors), (n.root || n.allowImports || !n.strictImports) && n.evalImports(a);
                var q = n.rules,
                    r = q ? q.length : 0;
                for (f = 0; r > f; f++) q[f].evalFirst && (q[f] = q[f].eval(a));
                var s = a.mediaBlocks && a.mediaBlocks.length || 0;
                for (f = 0; r > f; f++) "MixinCall" === q[f].type ? (m = q[f].eval(a).filter(function (a) {
                    return a instanceof d && a.variable ? !n.variable(a.name) : !0
                }), q.splice.apply(q, [f, 1].concat(m)), r += m.length - 1, f += m.length - 1, n.resetCache()) : "RulesetCall" === q[f].type && (m = q[f].eval(a).rules.filter(function (a) {
                    return a instanceof d && a.variable ? !1 : !0
                }), q.splice.apply(q, [f, 1].concat(m)), r += m.length - 1, f += m.length - 1, n.resetCache());
                for (f = 0; q.length > f; f++) k = q[f], k.evalFirst || (q[f] = k = k.eval ? k.eval(a) : k);
                for (f = 0; q.length > f; f++)
                    if (k = q[f], k instanceof j && k.selectors && 1 === k.selectors.length && k.selectors[0].isJustParentSelector()) {
                        q.splice(f--, 1);
                        for (var t = 0; k.rules.length > t; t++) l = k.rules[t], l instanceof d && l.variable || q.splice(++f, 0, l)
                    } if (o.shift(), p.shift(), a.mediaBlocks)
                    for (f = s; a.mediaBlocks.length > f; f++) a.mediaBlocks[f].bubbleSelectors(b);
                return n
            }, j.prototype.evalImports = function (a) {
                var b, c, d = this.rules;
                if (d)
                    for (b = 0; d.length > b; b++) "Import" === d[b].type && (c = d[b].eval(a), c && c.length ? (d.splice.apply(d, [b, 1].concat(c)), b += c.length - 1) : d.splice(b, 1, c), this.resetCache())
            }, j.prototype.makeImportant = function () {
                return new j(this.selectors, this.rules.map(function (a) {
                    return a.makeImportant ? a.makeImportant() : a
                }), this.strictImports)
            }, j.prototype.matchArgs = function (a) {
                return !a || 0 === a.length
            }, j.prototype.matchCondition = function (a, b) {
                var c = this.selectors[this.selectors.length - 1];
                return c.evaldCondition ? c.condition && !c.condition.eval(new g.Eval(b, b.frames)) ? !1 : !0 : !1
            }, j.prototype.resetCache = function () {
                this._rulesets = null, this._variables = null, this._lookups = {}
            }, j.prototype.variables = function () {
                return this._variables || (this._variables = this.rules ? this.rules.reduce(function (a, b) {
                    if (b instanceof d && b.variable === !0 && (a[b.name] = b), "Import" === b.type && b.root && b.root.variables) {
                        var c = b.root.variables();
                        for (var e in c) c.hasOwnProperty(e) && (a[e] = c[e])
                    }
                    return a
                }, {}) : {}), this._variables
            }, j.prototype.variable = function (a) {
                return this.variables()[a]
            }, j.prototype.rulesets = function () {
                if (!this.rules) return null;
                var a, b, c = [],
                    d = this.rules,
                    e = d.length;
                for (a = 0; e > a; a++) b = d[a], b.isRuleset && c.push(b);
                return c
            }, j.prototype.prependRule = function (a) {
                var b = this.rules;
                b ? b.unshift(a) : this.rules = [a]
            }, j.prototype.find = function (a, b, c) {
                b = b || this;
                var d, f, g = [],
                    h = a.toCSS();
                return h in this._lookups ? this._lookups[h] : (this.rulesets().forEach(function (h) {
                    if (h !== b)
                        for (var i = 0; h.selectors.length > i; i++)
                            if (d = a.match(h.selectors[i])) {
                                if (a.elements.length > d) {
                                    if (!c || c(h)) {
                                        f = h.find(new e(a.elements.slice(d)), b, c);
                                        for (var j = 0; f.length > j; ++j) f[j].path.push(h);
                                        Array.prototype.push.apply(g, f)
                                    }
                                } else g.push({
                                    rule: h,
                                    path: []
                                });
                                break
                            }
                }), this._lookups[h] = g, g)
            }, j.prototype.genCSS = function (a, b) {
                function c(a, b) {
                    return "boolean" == typeof a.isRulesetLike ? a.isRulesetLike : "function" == typeof a.isRulesetLike ? a.isRulesetLike(b) : !1
                }
                var d, e, f, g, h, j, k = [],
                    l = [],
                    m = [];
                a.tabLevel = a.tabLevel || 0, this.root || a.tabLevel++;
                var n, o = a.compress ? "" : Array(a.tabLevel + 1).join("  "),
                    p = a.compress ? "" : Array(a.tabLevel).join("  ");
                for (d = 0; this.rules.length > d; d++) h = this.rules[d], c(h, this.root) ? m.push(h) : h.isCharset && h.isCharset() ? k.push(h) : l.push(h);
                if (l = k.concat(l), !this.root) {
                    g = i(a, this, p), g && (b.add(g), b.add(p));
                    var q, r = this.paths,
                        s = r.length;
                    for (n = a.compress ? "," : ",\n" + p, d = 0; s > d; d++)
                        if (j = r[d], q = j.length)
                            for (d > 0 && b.add(n), a.firstSelector = !0, j[0].genCSS(a, b), a.firstSelector = !1, e = 1; q > e; e++) j[e].genCSS(a, b);
                    b.add((a.compress ? "{" : " {\n") + o)
                }
                for (d = 0; l.length > d; d++) h = l[d], d + 1 !== l.length || this.root && 0 !== m.length && !this.firstRoot || (a.lastRule = !0), h.genCSS ? h.genCSS(a, b) : h.value && b.add(h.value.toString()), a.lastRule ? a.lastRule = !1 : b.add(a.compress ? "" : "\n" + o);
                if (this.root || (b.add(a.compress ? "}" : "\n" + p + "}"), a.tabLevel--), n = (a.compress ? "" : "\n") + (this.root ? o : p), f = m.length)
                    for (l.length && n && b.add(n), m[0].genCSS(a, b), d = 1; f > d; d++) n && b.add(n), m[d].genCSS(a, b);
                b.isEmpty() || a.compress || !this.firstRoot || b.add("\n")
            }, j.prototype.markReferenced = function () {
                if (this.selectors)
                    for (var a = 0; this.selectors.length > a; a++) this.selectors[a].markReferenced()
            }, j.prototype.joinSelectors = function (a, b, c) {
                for (var d = 0; c.length > d; d++) this.joinSelector(a, b, c[d])
            }, j.prototype.joinSelector = function (a, b, c) {
                var d, e, g, h, i, j, k, l, m, n, o, p, q, r, s;
                for (d = 0; c.elements.length > d; d++) j = c.elements[d], "&" === j.value && (h = !0);
                if (h) {
                    for (r = [], i = [[]], d = 0; c.elements.length > d; d++)
                        if (j = c.elements[d], "&" !== j.value) r.push(j);
                        else {
                            for (s = [], r.length > 0 && this.mergeElementsOnToSelectors(r, i), e = 0; i.length > e; e++)
                                if (k = i[e], 0 === b.length) k.length > 0 && (k[0].elements = k[0].elements.slice(0), k[0].elements.push(new f(j.combinator, "", j.index, j.currentFileInfo))), s.push(k);
                                else
                                    for (g = 0; b.length > g; g++) {
                                        if (l = b[g], m = [], n = [], p = !0, k.length > 0 ? (m = k.slice(0), q = m.pop(), o = c.createDerived(q.elements.slice(0)), p = !1) : o = c.createDerived([]), l.length > 1 && (n = n.concat(l.slice(1))), l.length > 0) {
                                            p = !1;
                                            var t = j.combinator,
                                                u = l[0].elements[0];
                                            t.emptyOrWhitespace && !u.combinator.emptyOrWhitespace && (t = u.combinator), o.elements.push(new f(t, u.value, j.index, j.currentFileInfo)), o.elements = o.elements.concat(l[0].elements.slice(1))
                                        }
                                        p || m.push(o), m = m.concat(n), s.push(m)
                                    }
                            i = s, r = []
                        } for (r.length > 0 && this.mergeElementsOnToSelectors(r, i), d = 0; i.length > d; d++) i[d].length > 0 && a.push(i[d])
                } else if (b.length > 0)
                    for (d = 0; b.length > d; d++) a.push(b[d].concat(c));
                else a.push([c])
            }, j.prototype.mergeElementsOnToSelectors = function (a, b) {
                var c, d;
                if (0 === b.length) return void b.push([new e(a)]);
                for (c = 0; b.length > c; c++) d = b[c], d.length > 0 ? d[d.length - 1] = d[d.length - 1].createDerived(d[d.length - 1].elements.concat(a)) : d.push(new e(a))
            }, b.exports = j
        }, {
            "../contexts": 10,
            "../functions/default": 19,
            "./debug-info": 51,
            "./element": 55,
            "./node": 67,
            "./rule": 71,
            "./selector": 74
        }],
        74: [function (a, b) {
            var c = a("./node"),
                d = function (a, b, c, d, e, f) {
                    this.elements = a, this.extendList = b, this.condition = c, this.currentFileInfo = e || {}, this.isReferenced = f, c || (this.evaldCondition = !0)
                };
            d.prototype = new c, d.prototype.type = "Selector", d.prototype.accept = function (a) {
                this.elements && (this.elements = a.visitArray(this.elements)), this.extendList && (this.extendList = a.visitArray(this.extendList)), this.condition && (this.condition = a.visit(this.condition))
            }, d.prototype.createDerived = function (a, b, c) {
                c = null != c ? c : this.evaldCondition;
                var e = new d(a, b || this.extendList, null, this.index, this.currentFileInfo, this.isReferenced);
                return e.evaldCondition = c, e.mediaEmpty = this.mediaEmpty, e
            }, d.prototype.match = function (a) {
                var b, c, d = this.elements,
                    e = d.length;
                if (a.CacheElements(), b = a._elements.length, 0 === b || b > e) return 0;
                for (c = 0; b > c; c++)
                    if (d[c].value !== a._elements[c]) return 0;
                return b
            }, d.prototype.CacheElements = function () {
                if (!this._elements) {
                    var a = this.elements.map(function (a) {
                        return a.combinator.value + (a.value.value || a.value)
                    }).join("").match(/[,&#\*\.\w-]([\w-]|(\\.))*/g);
                    a ? "&" === a[0] && a.shift() : a = [], this._elements = a
                }
            }, d.prototype.isJustParentSelector = function () {
                return !this.mediaEmpty && 1 === this.elements.length && "&" === this.elements[0].value && (" " === this.elements[0].combinator.value || "" === this.elements[0].combinator.value)
            }, d.prototype.eval = function (a) {
                var b = this.condition && this.condition.eval(a),
                    c = this.elements,
                    d = this.extendList;
                return c = c && c.map(function (b) {
                    return b.eval(a)
                }), d = d && d.map(function (b) {
                    return b.eval(a)
                }), this.createDerived(c, d, b)
            }, d.prototype.genCSS = function (a, b) {
                var c, d;
                if (a && a.firstSelector || "" !== this.elements[0].combinator.value || b.add(" ", this.currentFileInfo, this.index), !this._css)
                    for (c = 0; this.elements.length > c; c++) d = this.elements[c], d.genCSS(a, b)
            }, d.prototype.markReferenced = function () {
                this.isReferenced = !0
            }, d.prototype.getIsReferenced = function () {
                return !this.currentFileInfo.reference || this.isReferenced
            }, d.prototype.getIsOutput = function () {
                return this.evaldCondition
            }, b.exports = d
        }, {
            "./node": 67
        }],
        75: [function (a, b) {
            var c = a("./node"),
                d = function (a) {
                    this.value = a
                };
            d.prototype = new c, d.prototype.type = "UnicodeDescriptor", b.exports = d
        }, {
            "./node": 67
        }],
        76: [function (a, b) {
            var c = a("./node"),
                d = a("../data/unit-conversions"),
                e = function (a, b, c) {
                    this.numerator = a ? a.slice(0).sort() : [], this.denominator = b ? b.slice(0).sort() : [], c ? this.backupUnit = c : a && a.length && (this.backupUnit = a[0])
                };
            e.prototype = new c, e.prototype.type = "Unit", e.prototype.clone = function () {
                return new e(this.numerator.slice(0), this.denominator.slice(0), this.backupUnit)
            }, e.prototype.genCSS = function (a, b) {
                var c = a && a.strictUnits;
                1 === this.numerator.length ? b.add(this.numerator[0]) : !c && this.backupUnit && b.add(this.backupUnit)
            }, e.prototype.toString = function () {
                var a, b = this.numerator.join("*");
                for (a = 0; this.denominator.length > a; a++) b += "/" + this.denominator[a];
                return b
            }, e.prototype.compare = function (a) {
                return this.is(a.toString()) ? 0 : void 0
            }, e.prototype.is = function (a) {
                return this.toString().toUpperCase() === a.toUpperCase()
            }, e.prototype.isLength = function () {
                return Boolean(this.toCSS().match(/px|em|%|in|cm|mm|pc|pt|ex/))
            }, e.prototype.isEmpty = function () {
                return 0 === this.numerator.length && 0 === this.denominator.length
            }, e.prototype.isSingular = function () {
                return 1 >= this.numerator.length && 0 === this.denominator.length
            }, e.prototype.map = function (a) {
                var b;
                for (b = 0; this.numerator.length > b; b++) this.numerator[b] = a(this.numerator[b], !1);
                for (b = 0; this.denominator.length > b; b++) this.denominator[b] = a(this.denominator[b], !0)
            }, e.prototype.usedUnits = function () {
                var a, b, c = {};
                b = function (b) {
                    return a.hasOwnProperty(b) && !c[e] && (c[e] = b), b
                };
                for (var e in d) d.hasOwnProperty(e) && (a = d[e], this.map(b));
                return c
            }, e.prototype.cancel = function () {
                var a, b, c = {};
                for (b = 0; this.numerator.length > b; b++) a = this.numerator[b], c[a] = (c[a] || 0) + 1;
                for (b = 0; this.denominator.length > b; b++) a = this.denominator[b], c[a] = (c[a] || 0) - 1;
                this.numerator = [], this.denominator = [];
                for (a in c)
                    if (c.hasOwnProperty(a)) {
                        var d = c[a];
                        if (d > 0)
                            for (b = 0; d > b; b++) this.numerator.push(a);
                        else if (0 > d)
                            for (b = 0; - d > b; b++) this.denominator.push(a)
                    } this.numerator.sort(), this.denominator.sort()
            }, b.exports = e
        }, {
            "../data/unit-conversions": 13,
            "./node": 67
        }],
        77: [function (a, b) {
            var c = a("./node"),
                d = function (a, b, c, d) {
                    this.value = a, this.currentFileInfo = c, this.index = b, this.isEvald = d
                };
            d.prototype = new c, d.prototype.type = "Url", d.prototype.accept = function (a) {
                this.value = a.visit(this.value)
            }, d.prototype.genCSS = function (a, b) {
                b.add("url("), this.value.genCSS(a, b), b.add(")")
            }, d.prototype.eval = function (a) {
                var b, c = this.value.eval(a);
                if (!this.isEvald && (b = this.currentFileInfo && this.currentFileInfo.rootpath, b && "string" == typeof c.value && a.isPathRelative(c.value) && (c.quote || (b = b.replace(/[\(\)'"\s]/g, function (a) {
                        return "\\" + a
                    })), c.value = b + c.value), c.value = a.normalizePath(c.value), a.urlArgs && !c.value.match(/^\s*data:/))) {
                    var e = -1 === c.value.indexOf("?") ? "?" : "&",
                        f = e + a.urlArgs; - 1 !== c.value.indexOf("#") ? c.value = c.value.replace("#", f + "#") : c.value += f
                }
                return new d(c, this.index, this.currentFileInfo, !0)
            }, b.exports = d
        }, {
            "./node": 67
        }],
        78: [function (a, b) {
            var c = a("./node"),
                d = function (a) {
                    if (this.value = a, !a) throw new Error("Value requires an array argument")
                };
            d.prototype = new c, d.prototype.type = "Value", d.prototype.accept = function (a) {
                this.value && (this.value = a.visitArray(this.value))
            }, d.prototype.eval = function (a) {
                return 1 === this.value.length ? this.value[0].eval(a) : new d(this.value.map(function (b) {
                    return b.eval(a)
                }))
            }, d.prototype.genCSS = function (a, b) {
                var c;
                for (c = 0; this.value.length > c; c++) this.value[c].genCSS(a, b), this.value.length > c + 1 && b.add(a && a.compress ? "," : ", ")
            }, b.exports = d
        }, {
            "./node": 67
        }],
        79: [function (a, b) {
            var c = a("./node"),
                d = function (a, b, c) {
                    this.name = a, this.index = b, this.currentFileInfo = c || {}
                };
            d.prototype = new c, d.prototype.type = "Variable", d.prototype.eval = function (a) {
                var b, c = this.name;
                if (0 === c.indexOf("@@") && (c = "@" + new d(c.slice(1), this.index, this.currentFileInfo).eval(a).value), this.evaluating) throw {
                    type: "Name",
                    message: "Recursive variable definition for " + c,
                    filename: this.currentFileInfo.filename,
                    index: this.index
                };
                if (this.evaluating = !0, b = this.find(a.frames, function (b) {
                        var d = b.variable(c);
                        if (d) {
                            if (d.important) {
                                var e = a.importantScope[a.importantScope.length - 1];
                                e.important = d.important
                            }
                            return d.value.eval(a)
                        }
                    })) return this.evaluating = !1, b;
                throw {
                    type: "Name",
                    message: "variable " + c + " is undefined",
                    filename: this.currentFileInfo.filename,
                    index: this.index
                }
            }, d.prototype.find = function (a, b) {
                for (var c, d = 0; a.length > d; d++)
                    if (c = b.call(a, a[d])) return c;
                return null
            }, b.exports = d
        }, {
            "./node": 67
        }],
        80: [function (a, b) {
            b.exports = {
                getLocation: function (a, b) {
                    for (var c = a + 1, d = null, e = -1; --c >= 0 && "\n" !== b.charAt(c);) e++;
                    return "number" == typeof a && (d = (b.slice(0, a).match(/\n/g) || "").length), {
                        line: d,
                        column: e
                    }
                }
            }
        }, {}],
        81: [function (a, b) {
            var c = a("../tree"),
                d = a("./visitor"),
                e = function () {
                    this._visitor = new d(this), this.contexts = [], this.allExtendsStack = [[]]
                };
            e.prototype = {
                run: function (a) {
                    return a = this._visitor.visit(a), a.allExtends = this.allExtendsStack[0], a
                },
                visitRule: function (a, b) {
                    b.visitDeeper = !1
                },
                visitMixinDefinition: function (a, b) {
                    b.visitDeeper = !1
                },
                visitRuleset: function (a) {
                    if (!a.root) {
                        var b, d, e, f, g = [],
                            h = a.rules,
                            i = h ? h.length : 0;
                        for (b = 0; i > b; b++) a.rules[b] instanceof c.Extend && (g.push(h[b]), a.extendOnEveryPath = !0);
                        var j = a.paths;
                        for (b = 0; j.length > b; b++) {
                            var k = j[b],
                                l = k[k.length - 1],
                                m = l.extendList;
                            for (f = m ? m.slice(0).concat(g) : g, f && (f = f.map(function (a) {
                                    return a.clone()
                                })), d = 0; f.length > d; d++) this.foundExtends = !0, e = f[d], e.findSelfSelectors(k), e.ruleset = a, 0 === d && (e.firstExtendOnThisSelectorPath = !0), this.allExtendsStack[this.allExtendsStack.length - 1].push(e)
                        }
                        this.contexts.push(a.selectors)
                    }
                },
                visitRulesetOut: function (a) {
                    a.root || (this.contexts.length = this.contexts.length - 1)
                },
                visitMedia: function (a) {
                    a.allExtends = [], this.allExtendsStack.push(a.allExtends)
                },
                visitMediaOut: function () {
                    this.allExtendsStack.length = this.allExtendsStack.length - 1
                },
                visitDirective: function (a) {
                    a.allExtends = [], this.allExtendsStack.push(a.allExtends)
                },
                visitDirectiveOut: function () {
                    this.allExtendsStack.length = this.allExtendsStack.length - 1
                }
            };
            var f = function () {
                this._visitor = new d(this)
            };
            f.prototype = {
                run: function (a) {
                    var b = new e;
                    return b.run(a), b.foundExtends ? (a.allExtends = a.allExtends.concat(this.doExtendChaining(a.allExtends, a.allExtends)), this.allExtendsStack = [a.allExtends], this._visitor.visit(a)) : a
                },
                doExtendChaining: function (a, b, d) {
                    var e, f, g, h, i, j, k, l, m = [],
                        n = this;
                    for (d = d || 0, e = 0; a.length > e; e++)
                        for (f = 0; b.length > f; f++) j = a[e], k = b[f], j.parent_ids.indexOf(k.object_id) >= 0 || (i = [k.selfSelectors[0]], g = n.findMatch(j, i), g.length && j.selfSelectors.forEach(function (a) {
                            h = n.extendSelector(g, i, a), l = new c.Extend(k.selector, k.option, 0), l.selfSelectors = h, h[h.length - 1].extendList = [l], m.push(l), l.ruleset = k.ruleset, l.parent_ids = l.parent_ids.concat(k.parent_ids, j.parent_ids), k.firstExtendOnThisSelectorPath && (l.firstExtendOnThisSelectorPath = !0, k.ruleset.paths.push(h))
                        }));
                    if (m.length) {
                        if (this.extendChainCount++, d > 100) {
                            var o = "{unable to calculate}",
                                p = "{unable to calculate}";
                            try {
                                o = m[0].selfSelectors[0].toCSS(), p = m[0].selector.toCSS()
                            } catch (q) {}
                            throw {
                                message: "extend circular reference detected. One of the circular extends is currently:" + o + ":extend(" + p + ")"
                            }
                        }
                        return m.concat(n.doExtendChaining(m, b, d + 1))
                    }
                    return m
                },
                visitRule: function (a, b) {
                    b.visitDeeper = !1
                },
                visitMixinDefinition: function (a, b) {
                    b.visitDeeper = !1
                },
                visitSelector: function (a, b) {
                    b.visitDeeper = !1
                },
                visitRuleset: function (a) {
                    if (!a.root) {
                        var b, c, d, e, f = this.allExtendsStack[this.allExtendsStack.length - 1],
                            g = [],
                            h = this;
                        for (d = 0; f.length > d; d++)
                            for (c = 0; a.paths.length > c; c++)
                                if (e = a.paths[c], !a.extendOnEveryPath) {
                                    var i = e[e.length - 1].extendList;
                                    i && i.length || (b = this.findMatch(f[d], e), b.length && f[d].selfSelectors.forEach(function (a) {
                                        g.push(h.extendSelector(b, e, a))
                                    }))
                                } a.paths = a.paths.concat(g)
                    }
                },
                findMatch: function (a, b) {
                    var c, d, e, f, g, h, i, j = this,
                        k = a.selector.elements,
                        l = [],
                        m = [];
                    for (c = 0; b.length > c; c++)
                        for (d = b[c], e = 0; d.elements.length > e; e++)
                            for (f = d.elements[e], (a.allowBefore || 0 === c && 0 === e) && l.push({
                                    pathIndex: c,
                                    index: e,
                                    matched: 0,
                                    initialCombinator: f.combinator
                                }), h = 0; l.length > h; h++) i = l[h], g = f.combinator.value, "" === g && 0 === e && (g = " "), !j.isElementValuesEqual(k[i.matched].value, f.value) || i.matched > 0 && k[i.matched].combinator.value !== g ? i = null : i.matched++, i && (i.finished = i.matched === k.length, i.finished && !a.allowAfter && (d.elements.length > e + 1 || b.length > c + 1) && (i = null)), i ? i.finished && (i.length = k.length, i.endPathIndex = c, i.endPathElementIndex = e + 1, l.length = 0, m.push(i)) : (l.splice(h, 1), h--);
                    return m
                },
                isElementValuesEqual: function (a, b) {
                    if ("string" == typeof a || "string" == typeof b) return a === b;
                    if (a instanceof c.Attribute) return a.op !== b.op || a.key !== b.key ? !1 : a.value && b.value ? (a = a.value.value || a.value, b = b.value.value || b.value, a === b) : a.value || b.value ? !1 : !0;
                    if (a = a.value, b = b.value, a instanceof c.Selector) {
                        if (!(b instanceof c.Selector) || a.elements.length !== b.elements.length) return !1;
                        for (var d = 0; a.elements.length > d; d++) {
                            if (a.elements[d].combinator.value !== b.elements[d].combinator.value && (0 !== d || (a.elements[d].combinator.value || " ") !== (b.elements[d].combinator.value || " "))) return !1;
                            if (!this.isElementValuesEqual(a.elements[d].value, b.elements[d].value)) return !1
                        }
                        return !0
                    }
                    return !1
                },
                extendSelector: function (a, b, d) {
                    var e, f, g, h, i, j = 0,
                        k = 0,
                        l = [];
                    for (e = 0; a.length > e; e++) h = a[e], f = b[h.pathIndex], g = new c.Element(h.initialCombinator, d.elements[0].value, d.elements[0].index, d.elements[0].currentFileInfo), h.pathIndex > j && k > 0 && (l[l.length - 1].elements = l[l.length - 1].elements.concat(b[j].elements.slice(k)), k = 0, j++), i = f.elements.slice(k, h.index).concat([g]).concat(d.elements.slice(1)), j === h.pathIndex && e > 0 ? l[l.length - 1].elements = l[l.length - 1].elements.concat(i) : (l = l.concat(b.slice(j, h.pathIndex)), l.push(new c.Selector(i))), j = h.endPathIndex, k = h.endPathElementIndex, k >= b[j].elements.length && (k = 0, j++);
                    return b.length > j && k > 0 && (l[l.length - 1].elements = l[l.length - 1].elements.concat(b[j].elements.slice(k)), j++), l = l.concat(b.slice(j, b.length))
                },
                visitRulesetOut: function () {},
                visitMedia: function (a) {
                    var b = a.allExtends.concat(this.allExtendsStack[this.allExtendsStack.length - 1]);
                    b = b.concat(this.doExtendChaining(b, a.allExtends)), this.allExtendsStack.push(b)
                },
                visitMediaOut: function () {
                    this.allExtendsStack.length = this.allExtendsStack.length - 1
                },
                visitDirective: function (a) {
                    var b = a.allExtends.concat(this.allExtendsStack[this.allExtendsStack.length - 1]);
                    b = b.concat(this.doExtendChaining(b, a.allExtends)), this.allExtendsStack.push(b)
                },
                visitDirectiveOut: function () {
                    this.allExtendsStack.length = this.allExtendsStack.length - 1
                }
            }, b.exports = f
        }, {
            "../tree": 59,
            "./visitor": 87
        }],
        82: [function (a, b) {
            function c(a) {
                this.imports = [], this.variableImports = [], this._onSequencerEmpty = a, this._currentDepth = 0
            }
            c.prototype.addImport = function (a) {
                var b = this,
                    c = {
                        callback: a,
                        args: null,
                        isReady: !1
                    };
                return this.imports.push(c),
                    function () {
                        c.args = Array.prototype.slice.call(arguments, 0), c.isReady = !0, b.tryRun()
                    }
            }, c.prototype.addVariableImport = function (a) {
                this.variableImports.push(a)
            }, c.prototype.tryRun = function () {
                this._currentDepth++;
                try {
                    for (;;) {
                        for (; this.imports.length > 0;) {
                            var a = this.imports[0];
                            if (!a.isReady) return;
                            this.imports = this.imports.slice(1), a.callback.apply(null, a.args)
                        }
                        if (0 === this.variableImports.length) break;
                        var b = this.variableImports[0];
                        this.variableImports = this.variableImports.slice(1), b()
                    }
                } finally {
                    this._currentDepth--
                }
                0 === this._currentDepth && this._onSequencerEmpty && this._onSequencerEmpty()
            }, b.exports = c
        }, {}],
        83: [function (a, b) {
            var c = a("../contexts"),
                d = a("./visitor"),
                e = a("./import-sequencer"),
                f = function (a, b) {
                    this._visitor = new d(this), this._importer = a, this._finish = b, this.context = new c.Eval, this.importCount = 0, this.onceFileDetectionMap = {}, this.recursionDetector = {}, this._sequencer = new e(this._onSequencerEmpty.bind(this))
                };
            f.prototype = {
                isReplacing: !1,
                run: function (a) {
                    try {
                        this._visitor.visit(a)
                    } catch (b) {
                        this.error = b
                    }
                    this.isFinished = !0, this._sequencer.tryRun()
                },
                _onSequencerEmpty: function () {
                    this.isFinished && this._finish(this.error)
                },
                visitImport: function (a, b) {
                    var d = a.options.inline;
                    if (!a.css || d) {
                        var e = new c.Eval(this.context, this.context.frames.slice(0)),
                            f = e.frames[0];
                        this.importCount++, a.isVariableImport() ? this._sequencer.addVariableImport(this.processImportNode.bind(this, a, e, f)) : this.processImportNode(a, e, f)
                    }
                    b.visitDeeper = !1
                },
                processImportNode: function (a, b, c) {
                    var d, e = a.options.inline;
                    try {
                        d = a.evalForImport(b)
                    } catch (f) {
                        f.filename || (f.index = a.index, f.filename = a.currentFileInfo.filename), a.css = !0, a.error = f
                    }
                    if (!d || d.css && !e) this.importCount--, this.isFinished && this._sequencer.tryRun();
                    else {
                        d.options.multiple && (b.importMultiple = !0);
                        for (var g = void 0 === d.css, h = 0; c.rules.length > h; h++)
                            if (c.rules[h] === a) {
                                c.rules[h] = d;
                                break
                            } var i = this.onImported.bind(this, d, b),
                            j = this._sequencer.addImport(i);
                        this._importer.push(d.getPath(), g, d.currentFileInfo, d.options, j)
                    }
                },
                onImported: function (a, b, c, d, e, f) {
                    c && (c.filename || (c.index = a.index, c.filename = a.currentFileInfo.filename), this.error = c);
                    var g = this,
                        h = a.options.inline,
                        i = e || f in g.recursionDetector;
                    if (b.importMultiple || (a.skip = i ? !0 : function () {
                            return f in g.onceFileDetectionMap ? !0 : (g.onceFileDetectionMap[f] = !0, !1)
                        }), d && (a.root = d, a.importedFilename = f, !h && (b.importMultiple || !i))) {
                        g.recursionDetector[f] = !0;
                        var j = this.context;
                        this.context = b;
                        try {
                            this._visitor.visit(d)
                        } catch (c) {
                            this.error = c
                        }
                        this.context = j
                    }
                    g.importCount--, g.isFinished && g._sequencer.tryRun()
                },
                visitRule: function (a, b) {
                    b.visitDeeper = !1
                },
                visitDirective: function (a) {
                    this.context.frames.unshift(a)
                },
                visitDirectiveOut: function () {
                    this.context.frames.shift()
                },
                visitMixinDefinition: function (a) {
                    this.context.frames.unshift(a)
                },
                visitMixinDefinitionOut: function () {
                    this.context.frames.shift()
                },
                visitRuleset: function (a) {
                    this.context.frames.unshift(a)
                },
                visitRulesetOut: function () {
                    this.context.frames.shift()
                },
                visitMedia: function (a) {
                    this.context.frames.unshift(a.rules[0])
                },
                visitMediaOut: function () {
                    this.context.frames.shift()
                }
            }, b.exports = f
        }, {
            "../contexts": 10,
            "./import-sequencer": 82,
            "./visitor": 87
        }],
        84: [function (a, b) {
            var c = {
                Visitor: a("./visitor"),
                ImportVisitor: a("./import-visitor"),
                ExtendVisitor: a("./extend-visitor"),
                JoinSelectorVisitor: a("./join-selector-visitor"),
                ToCSSVisitor: a("./to-css-visitor")
            };
            b.exports = c
        }, {
            "./extend-visitor": 81,
            "./import-visitor": 83,
            "./join-selector-visitor": 85,
            "./to-css-visitor": 86,
            "./visitor": 87
        }],
        85: [function (a, b) {
            var c = a("./visitor"),
                d = function () {
                    this.contexts = [[]], this._visitor = new c(this)
                };
            d.prototype = {
                run: function (a) {
                    return this._visitor.visit(a)
                },
                visitRule: function (a, b) {
                    b.visitDeeper = !1
                },
                visitMixinDefinition: function (a, b) {
                    b.visitDeeper = !1
                },
                visitRuleset: function (a) {
                    var b, c = this.contexts[this.contexts.length - 1],
                        d = [];
                    this.contexts.push(d), a.root || (b = a.selectors, b && (b = b.filter(function (a) {
                        return a.getIsOutput()
                    }), a.selectors = b.length ? b : b = null, b && a.joinSelectors(d, c, b)), b || (a.rules = null), a.paths = d)
                },
                visitRulesetOut: function () {
                    this.contexts.length = this.contexts.length - 1
                },
                visitMedia: function (a) {
                    var b = this.contexts[this.contexts.length - 1];
                    a.rules[0].root = 0 === b.length || b[0].multiMedia
                }
            }, b.exports = d
        }, {
            "./visitor": 87
        }],
        86: [function (a, b) {
            var c = a("../tree"),
                d = a("./visitor"),
                e = function (a) {
                    this._visitor = new d(this), this._context = a
                };
            e.prototype = {
                isReplacing: !0,
                run: function (a) {
                    return this._visitor.visit(a)
                },
                visitRule: function (a) {
                    return a.variable ? void 0 : a
                },
                visitMixinDefinition: function (a) {
                    a.frames = []
                },
                visitExtend: function () {},
                visitComment: function (a) {
                    return a.isSilent(this._context) ? void 0 : a
                },
                visitMedia: function (a, b) {
                    return a.accept(this._visitor), b.visitDeeper = !1, a.rules.length ? a : void 0
                },
                visitDirective: function (a) {
                    if (!a.currentFileInfo.reference || a.isReferenced) {
                        if ("@charset" === a.name) {
                            if (this.charset) {
                                if (a.debugInfo) {
                                    var b = new c.Comment("/* " + a.toCSS(this._context).replace(/\n/g, "") + " */\n");
                                    return b.debugInfo = a.debugInfo, this._visitor.visit(b)
                                }
                                return
                            }
                            this.charset = !0
                        }
                        return a.rules && a.rules.rules && this._mergeRules(a.rules.rules), a
                    }
                },
                checkPropertiesInRoot: function (a) {
                    for (var b, d = 0; a.length > d; d++)
                        if (b = a[d], b instanceof c.Rule && !b.variable) throw {
                            message: "properties must be inside selector blocks, they cannot be in the root.",
                            index: b.index,
                            filename: b.currentFileInfo ? b.currentFileInfo.filename : null
                        }
                },
                visitRuleset: function (a, b) {
                    var d, e = [];
                    if (a.firstRoot && this.checkPropertiesInRoot(a.rules), a.root) a.accept(this._visitor), b.visitDeeper = !1, (a.firstRoot || a.rules && a.rules.length > 0) && e.splice(0, 0, a);
                    else {
                        a.paths && (a.paths = a.paths.filter(function (a) {
                            var b;
                            for (" " === a[0].elements[0].combinator.value && (a[0].elements[0].combinator = new c.Combinator("")), b = 0; a.length > b; b++)
                                if (a[b].getIsReferenced() && a[b].getIsOutput()) return !0;
                            return !1
                        }));
                        for (var f = a.rules, g = f ? f.length : 0, h = 0; g > h;) d = f[h], d && d.rules ? (e.push(this._visitor.visit(d)), f.splice(h, 1), g--) : h++;
                        g > 0 ? a.accept(this._visitor) : a.rules = null, b.visitDeeper = !1, f = a.rules, f && (this._mergeRules(f), f = a.rules), f && (this._removeDuplicateRules(f), f = a.rules), f && f.length > 0 && a.paths.length > 0 && e.splice(0, 0, a)
                    }
                    return 1 === e.length ? e[0] : e
                },
                _removeDuplicateRules: function (a) {
                    if (a) {
                        var b, d, e, f = {};
                        for (e = a.length - 1; e >= 0; e--)
                            if (d = a[e], d instanceof c.Rule)
                                if (f[d.name]) {
                                    b = f[d.name], b instanceof c.Rule && (b = f[d.name] = [f[d.name].toCSS(this._context)]);
                                    var g = d.toCSS(this._context); - 1 !== b.indexOf(g) ? a.splice(e, 1) : b.push(g)
                                } else f[d.name] = d
                    }
                },
                _mergeRules: function (a) {
                    if (a) {
                        for (var b, d, e, f = {}, g = 0; a.length > g; g++) d = a[g], d instanceof c.Rule && d.merge && (e = [d.name, d.important ? "!" : ""].join(","), f[e] ? a.splice(g--, 1) : f[e] = [], f[e].push(d));
                        Object.keys(f).map(function (a) {
                            function e(a) {
                                return new c.Expression(a.map(function (a) {
                                    return a.value
                                }))
                            }

                            function g(a) {
                                return new c.Value(a.map(function (a) {
                                    return a
                                }))
                            }
                            if (b = f[a], b.length > 1) {
                                d = b[0];
                                var h = [],
                                    i = [];
                                b.map(function (a) {
                                    "+" === a.merge && (i.length > 0 && h.push(e(i)), i = []), i.push(a)
                                }), h.push(e(i)), d.value = g(h)
                            }
                        })
                    }
                }
            }, b.exports = e
        }, {
            "../tree": 59,
            "./visitor": 87
        }],
        87: [function (a, b) {
            function c(a) {
                return a
            }

            function d(a, b) {
                var c, e;
                for (c in a)
                    if (a.hasOwnProperty(c)) switch (e = a[c], typeof e) {
                        case "function":
                            e.prototype && e.prototype.type && (e.prototype.typeIndex = b++);
                            break;
                        case "object":
                            b = d(e, b)
                    }
                return b
            }
            var e = a("../tree"),
                f = {
                    visitDeeper: !0
                },
                g = !1,
                h = function (a) {
                    this._implementation = a, this._visitFnCache = [], g || (d(e, 1), g = !0)
                };
            h.prototype = {
                visit: function (a) {
                    if (!a) return a;
                    var b = a.typeIndex;
                    if (!b) return a;
                    var d, e = this._visitFnCache,
                        g = this._implementation,
                        h = b << 1,
                        i = 1 | h,
                        j = e[h],
                        k = e[i],
                        l = f;
                    if (l.visitDeeper = !0, j || (d = "visit" + a.type, j = g[d] || c, k = g[d + "Out"] || c, e[h] = j, e[i] = k), j !== c) {
                        var m = j.call(g, a, l);
                        g.isReplacing && (a = m)
                    }
                    return l.visitDeeper && a && a.accept && a.accept(this), k != c && k.call(g, a), a
                },
                visitArray: function (a, b) {
                    if (!a) return a;
                    var c, d = a.length;
                    if (b || !this._implementation.isReplacing) {
                        for (c = 0; d > c; c++) this.visit(a[c]);
                        return a
                    }
                    var e = [];
                    for (c = 0; d > c; c++) {
                        var f = this.visit(a[c]);
                        void 0 !== f && (f.splice ? f.length && this.flatten(f, e) : e.push(f))
                    }
                    return e
                },
                flatten: function (a, b) {
                    b || (b = []);
                    var c, d, e, f, g, h;
                    for (d = 0, c = a.length; c > d; d++)
                        if (e = a[d], void 0 !== e)
                            if (e.splice)
                                for (g = 0, f = e.length; f > g; g++) h = e[g], void 0 !== h && (h.splice ? h.length && this.flatten(h, b) : b.push(h));
                            else b.push(e);
                    return b
                }
            }, b.exports = h
        }, {
            "../tree": 59
        }],
        88: [function (a, b) {
            function c() {}
            var d = b.exports = {};
            d.nextTick = function () {
                var a = "undefined" != typeof window && window.setImmediate,
                    b = "undefined" != typeof window && window.MutationObserver,
                    c = "undefined" != typeof window && window.postMessage && window.addEventListener;
                if (a) return function (a) {
                    return window.setImmediate(a)
                };
                var d = [];
                if (b) {
                    var e = document.createElement("div"),
                        f = new MutationObserver(function () {
                            var a = d.slice();
                            d.length = 0, a.forEach(function (a) {
                                a()
                            })
                        });
                    return f.observe(e, {
                            attributes: !0
                        }),
                        function (a) {
                            d.length || e.setAttribute("yes", "no"), d.push(a)
                        }
                }
                return c ? (window.addEventListener("message", function (a) {
                    var b = a.source;
                    if ((b === window || null === b) && "process-tick" === a.data && (a.stopPropagation(), d.length > 0)) {
                        var c = d.shift();
                        c()
                    }
                }, !0), function (a) {
                    d.push(a), window.postMessage("process-tick", "*")
                }) : function (a) {
                    setTimeout(a, 0)
                }
            }(), d.title = "browser", d.browser = !0, d.env = {}, d.argv = [], d.on = c, d.addListener = c, d.once = c, d.off = c, d.removeListener = c, d.removeAllListeners = c, d.emit = c, d.binding = function () {
                throw new Error("process.binding is not supported")
            }, d.cwd = function () {
                return "/"
            }, d.chdir = function () {
                throw new Error("process.chdir is not supported")
            }
        }, {}],
        89: [function (a, b) {
            "use strict";

            function c(a) {
                function b(a) {
                    return null === i ? void k.push(a) : void f(function () {
                        var b = i ? a.onFulfilled : a.onRejected;
                        if (null === b) return void(i ? a.resolve : a.reject)(j);
                        var c;
                        try {
                            c = b(j)
                        } catch (d) {
                            return void a.reject(d)
                        }
                        a.resolve(c)
                    })
                }

                function c(a) {
                    try {
                        if (a === l) throw new TypeError("A promise cannot be resolved with itself.");
                        if (a && ("object" == typeof a || "function" == typeof a)) {
                            var b = a.then;
                            if ("function" == typeof b) return void e(b.bind(a), c, g)
                        }
                        i = !0, j = a, h()
                    } catch (d) {
                        g(d)
                    }
                }

                function g(a) {
                    i = !1, j = a, h()
                }

                function h() {
                    for (var a = 0, c = k.length; c > a; a++) b(k[a]);
                    k = null
                }
                if ("object" != typeof this) throw new TypeError("Promises must be constructed via new");
                if ("function" != typeof a) throw new TypeError("not a function");
                var i = null,
                    j = null,
                    k = [],
                    l = this;
                this.then = function (a, c) {
                    return new l.constructor(function (e, f) {
                        b(new d(a, c, e, f))
                    })
                }, e(a, c, g)
            }

            function d(a, b, c, d) {
                this.onFulfilled = "function" == typeof a ? a : null, this.onRejected = "function" == typeof b ? b : null, this.resolve = c, this.reject = d
            }

            function e(a, b, c) {
                var d = !1;
                try {
                    a(function (a) {
                        d || (d = !0, b(a))
                    }, function (a) {
                        d || (d = !0, c(a))
                    })
                } catch (e) {
                    if (d) return;
                    d = !0, c(e)
                }
            }
            var f = a("asap");
            b.exports = c
        }, {
            asap: 91
        }],
        90: [function (a, b) {
            "use strict";

            function c(a) {
                this.then = function (b) {
                    return "function" != typeof b ? this : new d(function (c, d) {
                        e(function () {
                            try {
                                c(b(a))
                            } catch (e) {
                                d(e)
                            }
                        })
                    })
                }
            }
            var d = a("./core.js"),
                e = a("asap");
            b.exports = d, c.prototype = d.prototype;
            var f = new c(!0),
                g = new c(!1),
                h = new c(null),
                i = new c(void 0),
                j = new c(0),
                k = new c("");
            d.resolve = function (a) {
                if (a instanceof d) return a;
                if (null === a) return h;
                if (void 0 === a) return i;
                if (a === !0) return f;
                if (a === !1) return g;
                if (0 === a) return j;
                if ("" === a) return k;
                if ("object" == typeof a || "function" == typeof a) try {
                    var b = a.then;
                    if ("function" == typeof b) return new d(b.bind(a))
                } catch (e) {
                    return new d(function (a, b) {
                        b(e)
                    })
                }
                return new c(a)
            }, d.all = function (a) {
                var b = Array.prototype.slice.call(a);
                return new d(function (a, c) {
                    function d(f, g) {
                        try {
                            if (g && ("object" == typeof g || "function" == typeof g)) {
                                var h = g.then;
                                if ("function" == typeof h) return void h.call(g, function (a) {
                                    d(f, a)
                                }, c)
                            }
                            b[f] = g, 0 === --e && a(b)
                        } catch (i) {
                            c(i)
                        }
                    }
                    if (0 === b.length) return a([]);
                    for (var e = b.length, f = 0; b.length > f; f++) d(f, b[f])
                })
            }, d.reject = function (a) {
                return new d(function (b, c) {
                    c(a)
                })
            }, d.race = function (a) {
                return new d(function (b, c) {
                    a.forEach(function (a) {
                        d.resolve(a).then(b, c)
                    })
                })
            }, d.prototype["catch"] = function (a) {
                return this.then(null, a)
            }
        }, {
            "./core.js": 89,
            asap: 91
        }],
        91: [function (a, b) {
            (function (a) {
                function c() {
                    for (; e.next;) {
                        e = e.next;
                        var a = e.task;
                        e.task = void 0;
                        var b = e.domain;
                        b && (e.domain = void 0, b.enter());
                        try {
                            a()
                        } catch (d) {
                            if (i) throw b && b.exit(), setTimeout(c, 0), b && b.enter(), d;
                            setTimeout(function () {
                                throw d
                            }, 0)
                        }
                        b && b.exit()
                    }
                    g = !1
                }

                function d(b) {
                    f = f.next = {
                        task: b,
                        domain: i && a.domain,
                        next: null
                    }, g || (g = !0, h())
                }
                var e = {
                        task: void 0,
                        next: null
                    },
                    f = e,
                    g = !1,
                    h = void 0,
                    i = !1;
                if ("undefined" != typeof a && a.nextTick) i = !0, h = function () {
                    a.nextTick(c)
                };
                else if ("function" == typeof setImmediate) h = "undefined" != typeof window ? setImmediate.bind(window, c) : function () {
                    setImmediate(c)
                };
                else if ("undefined" != typeof MessageChannel) {
                    var j = new MessageChannel;
                    j.port1.onmessage = c, h = function () {
                        j.port2.postMessage(0)
                    }
                } else h = function () {
                    setTimeout(c, 0)
                };
                b.exports = d
            }).call(this, a("_process"))
        }, {
            _process: 88
        }],
        92: [function () {
            "function" != typeof Promise.prototype.done && (Promise.prototype.done = function () {
                var a = arguments.length ? this.then.apply(this, arguments) : this;
                a.then(null, function (a) {
                    setTimeout(function () {
                        throw a
                    }, 0)
                })
            })
        }, {}],
        "promise/polyfill.js": [function (a) {
            a("asap");
            "undefined" == typeof Promise && (Promise = a("./lib/core.js"), a("./lib/es6-extensions.js")), a("./polyfill-done.js")
        }, {
            "./lib/core.js": 89,
            "./lib/es6-extensions.js": 90,
            "./polyfill-done.js": 92,
            asap: 91
        }]
    }, {}, [2])(2)
});
(function () {
    var d, f, c, e, a, g = function (h, i) {
            return function () {
                return h.apply(i, arguments)
            }
        },
        b = [].indexOf || function (k) {
            for (var j = 0, h = this.length; j < h; j++) {
                if (j in this && this[j] === k) {
                    return j
                }
            }
            return -1
        };
    f = (function () {
        function h() {}
        h.prototype.extend = function (k, l) {
            var i, j;
            for (i in l) {
                j = l[i];
                if (k[i] == null) {
                    k[i] = j
                }
            }
            return k
        };
        h.prototype.isMobile = function (i) {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(i)
        };
        h.prototype.createEvent = function (m, i, l, k) {
            var j;
            if (i == null) {
                i = false
            }
            if (l == null) {
                l = false
            }
            if (k == null) {
                k = null
            }
            if (document.createEvent != null) {
                j = document.createEvent("CustomEvent");
                j.initCustomEvent(m, i, l, k)
            } else {
                if (document.createEventObject != null) {
                    j = document.createEventObject();
                    j.eventType = m
                } else {
                    j.eventName = m
                }
            }
            return j
        };
        h.prototype.emitEvent = function (j, i) {
            if (j.dispatchEvent != null) {
                return j.dispatchEvent(i)
            } else {
                if (i in (j != null)) {
                    return j[i]()
                } else {
                    if (("on" + i) in (j != null)) {
                        return j["on" + i]()
                    }
                }
            }
        };
        h.prototype.addEvent = function (k, j, i) {
            if (k.addEventListener != null) {
                return k.addEventListener(j, i, false)
            } else {
                if (k.attachEvent != null) {
                    return k.attachEvent("on" + j, i)
                } else {
                    return k[j] = i
                }
            }
        };
        h.prototype.removeEvent = function (k, j, i) {
            if (k.removeEventListener != null) {
                return k.removeEventListener(j, i, false)
            } else {
                if (k.detachEvent != null) {
                    return k.detachEvent("on" + j, i)
                } else {
                    return delete k[j]
                }
            }
        };
        h.prototype.innerHeight = function () {
            if ("innerHeight" in window) {
                return window.innerHeight
            } else {
                return document.documentElement.clientHeight
            }
        };
        return h
    })();
    c = this.WeakMap || this.MozWeakMap || (c = (function () {
        function h() {
            this.keys = [];
            this.values = []
        }
        h.prototype.get = function (n) {
            var m, p, l, k, o;
            o = this.keys;
            for (m = l = 0, k = o.length; l < k; m = ++l) {
                p = o[m];
                if (p === n) {
                    return this.values[m]
                }
            }
        };
        h.prototype.set = function (n, q) {
            var m, p, l, k, o;
            o = this.keys;
            for (m = l = 0, k = o.length; l < k; m = ++l) {
                p = o[m];
                if (p === n) {
                    this.values[m] = q;
                    return
                }
            }
            this.keys.push(n);
            return this.values.push(q)
        };
        return h
    })());
    d = this.MutationObserver || this.WebkitMutationObserver || this.MozMutationObserver || (d = (function () {
        function h() {
            if (typeof console !== "undefined" && console !== null) {
                console.warn("MutationObserver is not supported by your browser.")
            }
            if (typeof console !== "undefined" && console !== null) {
                console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content.")
            }
        }
        h.notSupported = true;
        h.prototype.observe = function () {};
        return h
    })());
    e = this.getComputedStyle || function (h, i) {
        this.getPropertyValue = function (k) {
            var j;
            if (k === "float") {
                k = "styleFloat"
            }
            if (a.test(k)) {
                k.replace(a, function (m, l) {
                    return l.toUpperCase()
                })
            }
            return ((j = h.currentStyle) != null ? j[k] : void 0) || null
        };
        return this
    };
    a = /(\-([a-z]){1})/g;
    this.WOW = (function () {
        h.prototype.defaults = {
            boxClass: "wow",
            animateClass: "animated",
            offset: 0,
            mobile: true,
            live: true,
            callback: null,
            scrollContainer: null
        };

        function h(i) {
            if (i == null) {
                i = {}
            }
            this.scrollCallback = g(this.scrollCallback, this);
            this.scrollHandler = g(this.scrollHandler, this);
            this.resetAnimation = g(this.resetAnimation, this);
            this.start = g(this.start, this);
            this.scrolled = true;
            this.config = this.util().extend(i, this.defaults);
            if (i.scrollContainer != null) {
                this.config.scrollContainer = document.querySelector(i.scrollContainer)
            }
            this.animationNameCache = new c();
            this.wowEvent = this.util().createEvent(this.config.boxClass)
        }
        h.prototype.init = function () {
            var i;
            this.element = window.document.documentElement;
            if ((i = document.readyState) === "interactive" || i === "complete") {
                this.start()
            } else {
                this.util().addEvent(document, "DOMContentLoaded", this.start)
            }
            return this.finished = []
        };
        h.prototype.start = function () {
            var m, k, i, l;
            this.stopped = false;
            this.boxes = (function () {
                var o, n, q, p;
                q = this.element.querySelectorAll("." + this.config.boxClass);
                p = [];
                for (o = 0, n = q.length; o < n; o++) {
                    m = q[o];
                    p.push(m)
                }
                return p
            }).call(this);
            this.all = (function () {
                var o, n, q, p;
                q = this.boxes;
                p = [];
                for (o = 0, n = q.length; o < n; o++) {
                    m = q[o];
                    p.push(m)
                }
                return p
            }).call(this);
            if (this.boxes.length) {
                if (this.disabled()) {
                    this.resetStyle()
                } else {
                    l = this.boxes;
                    for (k = 0, i = l.length; k < i; k++) {
                        m = l[k];
                        this.applyStyle(m, true)
                    }
                }
            }
            if (!this.disabled()) {
                this.util().addEvent(this.config.scrollContainer || window, "scroll", this.scrollHandler);
                this.util().addEvent(window, "resize", this.scrollHandler);
                this.interval = setInterval(this.scrollCallback, 50)
            }
            if (this.config.live) {
                return new d((function (j) {
                    return function (p) {
                        var o, q, s, n, r;
                        r = [];
                        for (o = 0, q = p.length; o < q; o++) {
                            n = p[o];
                            r.push((function () {
                                var t, v, u, w;
                                u = n.addedNodes || [];
                                w = [];
                                for (t = 0, v = u.length; t < v; t++) {
                                    s = u[t];
                                    w.push(this.doSync(s))
                                }
                                return w
                            }).call(j))
                        }
                        return r
                    }
                })(this)).observe(document.body, {
                    childList: true,
                    subtree: true
                })
            }
        };
        h.prototype.stop = function () {
            this.stopped = true;
            this.util().removeEvent(this.config.scrollContainer || window, "scroll", this.scrollHandler);
            this.util().removeEvent(window, "resize", this.scrollHandler);
            if (this.interval != null) {
                return clearInterval(this.interval)
            }
        };
        h.prototype.sync = function (i) {
            if (d.notSupported) {
                return this.doSync(this.element)
            }
        };
        h.prototype.doSync = function (m) {
            var o, k, i, n, l;
            if (m == null) {
                m = this.element
            }
            if (m.nodeType !== 1) {
                return
            }
            m = m.parentNode || m;
            n = m.querySelectorAll("." + this.config.boxClass);
            l = [];
            for (k = 0, i = n.length; k < i; k++) {
                o = n[k];
                if (b.call(this.all, o) < 0) {
                    this.boxes.push(o);
                    this.all.push(o);
                    if (this.stopped || this.disabled()) {
                        this.resetStyle()
                    } else {
                        this.applyStyle(o, true)
                    }
                    l.push(this.scrolled = true)
                } else {
                    l.push(void 0)
                }
            }
            return l
        };
        h.prototype.show = function (i) {
            this.applyStyle(i);
            i.className = i.className + " " + this.config.animateClass;
            if (this.config.callback != null) {
                this.config.callback(i)
            }
            this.util().emitEvent(i, this.wowEvent);
            this.util().addEvent(i, "animationend", this.resetAnimation);
            this.util().addEvent(i, "oanimationend", this.resetAnimation);
            this.util().addEvent(i, "webkitAnimationEnd", this.resetAnimation);
            this.util().addEvent(i, "MSAnimationEnd", this.resetAnimation);
            return i
        };
        h.prototype.applyStyle = function (k, l) {
            var i, m, j;
            m = k.getAttribute("data-wow-duration");
            i = k.getAttribute("data-wow-delay");
            j = k.getAttribute("data-wow-iteration");
            return this.animate((function (n) {
                return function () {
                    return n.customStyle(k, l, m, i, j)
                }
            })(this))
        };
        h.prototype.animate = (function () {
            if ("requestAnimationFrame" in window) {
                return function (i) {
                    return window.requestAnimationFrame(i)
                }
            } else {
                return function (i) {
                    return i()
                }
            }
        })();
        h.prototype.resetStyle = function () {
            var n, k, i, m, l;
            m = this.boxes;
            l = [];
            for (k = 0, i = m.length; k < i; k++) {
                n = m[k];
                l.push(n.style.visibility = "visible")
            }
            return l
        };
        h.prototype.resetAnimation = function (i) {
            var j;
            if (i.type.toLowerCase().indexOf("animationend") >= 0) {
                j = i.target || i.srcElement;
                return j.className = j.className.replace(this.config.animateClass, "").trim()
            }
        };
        h.prototype.customStyle = function (k, l, m, i, j) {
            if (l) {
                this.cacheAnimationName(k)
            }
            k.style.visibility = l ? "hidden" : "visible";
            if (m) {
                this.vendorSet(k.style, {
                    animationDuration: m
                })
            }
            if (i) {
                this.vendorSet(k.style, {
                    animationDelay: i
                })
            }
            if (j) {
                this.vendorSet(k.style, {
                    animationIterationCount: j
                })
            }
            this.vendorSet(k.style, {
                animationName: l ? "none" : this.cachedAnimationName(k)
            });
            return k
        };
        h.prototype.vendors = ["moz", "webkit"];
        h.prototype.vendorSet = function (l, k) {
            var i, j, m, n;
            j = [];
            for (i in k) {
                m = k[i];
                l["" + i] = m;
                j.push((function () {
                    var q, o, r, p;
                    r = this.vendors;
                    p = [];
                    for (q = 0, o = r.length; q < o; q++) {
                        n = r[q];
                        p.push(l["" + n + (i.charAt(0).toUpperCase()) + (i.substr(1))] = m)
                    }
                    return p
                }).call(this))
            }
            return j
        };
        h.prototype.vendorCSS = function (o, p) {
            var l, k, n, i, m, q;
            m = e(o);
            i = m.getPropertyCSSValue(p);
            n = this.vendors;
            for (l = 0, k = n.length; l < k; l++) {
                q = n[l];
                i = i || m.getPropertyCSSValue("-" + q + "-" + p)
            }
            return i
        };
        h.prototype.animationName = function (k) {
            var j, i;
            try {
                j = this.vendorCSS(k, "animation-name").cssText
            } catch (i) {
                j = e(k).getPropertyValue("animation-name")
            }
            if (j === "none") {
                return ""
            } else {
                return j
            }
        };
        h.prototype.cacheAnimationName = function (i) {
            return this.animationNameCache.set(i, this.animationName(i))
        };
        h.prototype.cachedAnimationName = function (i) {
            return this.animationNameCache.get(i)
        };
        h.prototype.scrollHandler = function () {
            return this.scrolled = true
        };
        h.prototype.scrollCallback = function () {
            var i;
            if (this.scrolled) {
                this.scrolled = false;
                this.boxes = (function () {
                    var l, k, n, m;
                    n = this.boxes;
                    m = [];
                    for (l = 0, k = n.length; l < k; l++) {
                        i = n[l];
                        if (!(i)) {
                            continue
                        }
                        if (this.isVisible(i)) {
                            this.show(i);
                            continue
                        }
                        m.push(i)
                    }
                    return m
                }).call(this);
                if (!(this.boxes.length || this.config.live)) {
                    return this.stop()
                }
            }
        };
        h.prototype.offsetTop = function (i) {
            var j;
            while (i.offsetTop === void 0) {
                i = i.parentNode
            }
            j = i.offsetTop;
            while (i = i.offsetParent) {
                j += i.offsetTop
            }
            return j
        };
        h.prototype.isVisible = function (l) {
            var j, n, m, k, i;
            n = l.getAttribute("data-wow-offset") || this.config.offset;
            i = (this.config.scrollContainer && this.config.scrollContainer.scrollTop) || window.pageYOffset;
            k = i + Math.min(this.element.clientHeight, this.util().innerHeight()) - n;
            m = this.offsetTop(l);
            j = m + l.clientHeight;
            return m <= k && j >= i
        };
        h.prototype.util = function () {
            return this._util != null ? this._util : this._util = new f()
        };
        h.prototype.disabled = function () {
            return !this.config.mobile && this.util().isMobile(navigator.userAgent)
        };
        return h
    })()
}).call(this);
/*!
 * parallax.js v1.4.2 (http://pixelcog.github.io/parallax.js/)
 * @copyright 2016 PixelCog, Inc.
 * @license MIT (https://github.com/pixelcog/parallax.js/blob/master/LICENSE)
 */
;
(function (e, d, a, g) {
    (function () {
        var i = 0;
        var j = ["ms", "moz", "webkit", "o"];
        for (var h = 0; h < j.length && !d.requestAnimationFrame; ++h) {
            d.requestAnimationFrame = d[j[h] + "RequestAnimationFrame"];
            d.cancelAnimationFrame = d[j[h] + "CancelAnimationFrame"] || d[j[h] + "CancelRequestAnimationFrame"]
        }
        if (!d.requestAnimationFrame) {
            d.requestAnimationFrame = function (n) {
                var k = new Date().getTime();
                var l = Math.max(0, 16 - (k - i));
                var m = d.setTimeout(function () {
                    n(k + l)
                }, l);
                i = k + l;
                return m
            }
        }
        if (!d.cancelAnimationFrame) {
            d.cancelAnimationFrame = function (k) {
                clearTimeout(k)
            }
        }
    }());

    function f(k, j) {
        var i = this;
        if (typeof j == "object") {
            delete j.refresh;
            delete j.render;
            e.extend(this, j)
        }
        this.$element = e(k);
        if (!this.imageSrc && this.$element.is("img")) {
            this.imageSrc = this.$element.attr("src")
        }
        var h = (this.position + "").toLowerCase().match(/\S+/g) || [];
        if (h.length < 1) {
            h.push("center")
        }
        if (h.length == 1) {
            h.push(h[0])
        }
        if (h[0] == "top" || h[0] == "bottom" || h[1] == "left" || h[1] == "right") {
            h = [h[1], h[0]]
        }
        if (this.positionX != g) {
            h[0] = this.positionX.toLowerCase()
        }
        if (this.positionY != g) {
            h[1] = this.positionY.toLowerCase()
        }
        i.positionX = h[0];
        i.positionY = h[1];
        if (this.positionX != "left" && this.positionX != "right") {
            if (isNaN(parseInt(this.positionX))) {
                this.positionX = "center"
            } else {
                this.positionX = parseInt(this.positionX)
            }
        }
        if (this.positionY != "top" && this.positionY != "bottom") {
            if (isNaN(parseInt(this.positionY))) {
                this.positionY = "center"
            } else {
                this.positionY = parseInt(this.positionY)
            }
        }
        this.position = this.positionX + (isNaN(this.positionX) ? "" : "px") + " " + this.positionY + (isNaN(this.positionY) ? "" : "px");
        if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
            if (this.imageSrc && this.iosFix && !this.$element.is("img")) {
                this.$element.css({
                    backgroundImage: "url(" + this.imageSrc + ")",
                    backgroundSize: "cover",
                    backgroundPosition: this.position,
                    backgroundAttachment: "scroll"
                })
            }
            return this
        }
        if (navigator.userAgent.match(/(Android)/)) {
            if (this.imageSrc && this.androidFix && !this.$element.is("img")) {
                this.$element.css({
                    backgroundImage: "url(" + this.imageSrc + ")",
                    backgroundSize: "cover",
                    backgroundPosition: this.position
                })
            }
            return this
        }
        this.$mirror = e("<div />").prependTo(this.$element);
        var l = this.$element.find(">.parallax-slider");
        var m = false;
        if (l.length == 0) {
            this.$slider = e("<img />").prependTo(this.$mirror)
        } else {
            this.$slider = l.prependTo(this.$mirror);
            m = true
        }
        this.$mirror.addClass("parallax-mirror").css({
            visibility: "hidden",
            zIndex: this.zIndex,
            position: "fixed",
            top: 0,
            left: 0,
            overflow: "hidden"
        });
        this.$slider.addClass("parallax-slider").one("load", function () {
            if (!i.naturalHeight || !i.naturalWidth) {
                i.naturalHeight = this.naturalHeight || this.height || 1;
                i.naturalWidth = this.naturalWidth || this.width || 1
            }
            i.aspectRatio = i.naturalWidth / i.naturalHeight;
            f.isSetup || f.setup();
            f.sliders.push(i);
            f.isFresh = false;
            f.requestRender()
        });
        if (!m) {
            this.$slider[0].src = this.imageSrc
        }
        if (this.naturalHeight && this.naturalWidth || this.$slider[0].complete || l.length > 0) {
            this.$slider.trigger("load")
        }
    }
    e.extend(f.prototype, {
        speed: 0.2,
        bleed: 0,
        zIndex: -100,
        iosFix: true,
        androidFix: true,
        position: "center",
        overScrollFix: false,
        refresh: function () {
            this.boxWidth = this.$element.outerWidth();
            this.boxHeight = this.$element.outerHeight() + this.bleed * 2;
            this.boxOffsetTop = this.$element.offset().top - this.bleed;
            this.boxOffsetLeft = this.$element.offset().left;
            this.boxOffsetBottom = this.boxOffsetTop + this.boxHeight;
            var j = f.winHeight;
            var k = f.docHeight;
            var l = Math.min(this.boxOffsetTop, k - j);
            var n = Math.max(this.boxOffsetTop + this.boxHeight - j, 0);
            var h = this.boxHeight + (l - n) * (1 - this.speed) | 0;
            var i = (this.boxOffsetTop - l) * (1 - this.speed) | 0;
            if (h * this.aspectRatio >= this.boxWidth) {
                this.imageWidth = h * this.aspectRatio | 0;
                this.imageHeight = h;
                this.offsetBaseTop = i;
                var m = this.imageWidth - this.boxWidth;
                if (this.positionX == "left") {
                    this.offsetLeft = 0
                } else {
                    if (this.positionX == "right") {
                        this.offsetLeft = -m
                    } else {
                        if (!isNaN(this.positionX)) {
                            this.offsetLeft = Math.max(this.positionX, -m)
                        } else {
                            this.offsetLeft = -m / 2 | 0
                        }
                    }
                }
            } else {
                this.imageWidth = this.boxWidth;
                this.imageHeight = this.boxWidth / this.aspectRatio | 0;
                this.offsetLeft = 0;
                var m = this.imageHeight - h;
                if (this.positionY == "top") {
                    this.offsetBaseTop = i
                } else {
                    if (this.positionY == "bottom") {
                        this.offsetBaseTop = i - m
                    } else {
                        if (!isNaN(this.positionY)) {
                            this.offsetBaseTop = i + Math.max(this.positionY, -m)
                        } else {
                            this.offsetBaseTop = i - m / 2 | 0
                        }
                    }
                }
            }
        },
        render: function () {
            var j = f.scrollTop;
            var k = f.scrollLeft;
            var h = this.overScrollFix ? f.overScroll : 0;
            var i = j + f.winHeight;
            if (this.boxOffsetBottom > j && this.boxOffsetTop <= i) {
                this.visibility = "visible";
                this.mirrorTop = this.boxOffsetTop - j;
                this.mirrorLeft = this.boxOffsetLeft - k;
                this.offsetTop = this.offsetBaseTop - this.mirrorTop * (1 - this.speed)
            } else {
                this.visibility = "hidden"
            }
            this.$mirror.css({
                transform: "translate3d(0px, " + (this.mirrorTop - h) + "px, 0px)",
                visibility: this.visibility,
                left: this.mirrorLeft,
                height: this.boxHeight,
                width: this.boxWidth
            });
            this.$slider.css({
                transform: "translate3d(0px, 0px, 0px)",
                position: "absolute",
                top: this.offsetTop,
                left: this.offsetLeft,
                height: this.imageHeight,
                width: this.imageWidth,
                maxWidth: "none"
            })
        }
    });
    e.extend(f, {
        scrollTop: 0,
        scrollLeft: 0,
        winHeight: 0,
        winWidth: 0,
        docHeight: 1 << 30,
        docWidth: 1 << 30,
        sliders: [],
        isReady: false,
        isFresh: false,
        isBusy: false,
        setup: function () {
            if (this.isReady) {
                return
            }
            var k = e(a),
                j = e(d);
            var i = function () {
                f.winHeight = j.height();
                f.winWidth = j.width();
                f.docHeight = k.height();
                f.docWidth = k.width()
            };
            var h = function () {
                var l = j.scrollTop();
                var m = f.docHeight - f.winHeight;
                var n = f.docWidth - f.winWidth;
                f.scrollTop = Math.max(0, Math.min(m, l));
                f.scrollLeft = Math.max(0, Math.min(n, j.scrollLeft()));
                f.overScroll = Math.max(l - m, Math.min(l, 0))
            };
            j.on("resize.px.parallax load.px.parallax", function () {
                i();
                f.isFresh = false;
                f.requestRender()
            }).on("scroll.px.parallax load.px.parallax", function () {
                h();
                f.requestRender()
            });
            i();
            h();
            this.isReady = true
        },
        configure: function (h) {
            if (typeof h == "object") {
                delete h.refresh;
                delete h.render;
                e.extend(this.prototype, h)
            }
        },
        refresh: function () {
            e.each(this.sliders, function () {
                this.refresh()
            });
            this.isFresh = true
        },
        render: function () {
            this.isFresh || this.refresh();
            e.each(this.sliders, function () {
                this.render()
            })
        },
        requestRender: function () {
            var h = this;
            if (!this.isBusy) {
                this.isBusy = true;
                d.requestAnimationFrame(function () {
                    h.render();
                    h.isBusy = false
                })
            }
        },
        destroy: function (j) {
            var h, k = e(j).data("px.parallax");
            k.$mirror.remove();
            for (h = 0; h < this.sliders.length; h += 1) {
                if (this.sliders[h] == k) {
                    this.sliders.splice(h, 1)
                }
            }
            e(j).data("px.parallax", false);
            if (this.sliders.length === 0) {
                e(d).off("scroll.px.parallax resize.px.parallax load.px.parallax");
                this.isReady = false;
                f.isSetup = false
            }
        }
    });

    function c(h) {
        return this.each(function () {
            var j = e(this);
            var i = typeof h == "object" && h;
            if (this == d || this == a || j.is("body")) {
                f.configure(i)
            } else {
                if (!j.data("px.parallax")) {
                    i = e.extend({}, j.data(), i);
                    j.data("px.parallax", new f(this, i))
                } else {
                    if (typeof h == "object") {
                        e.extend(j.data("px.parallax"), i)
                    }
                }
            }
            if (typeof h == "string") {
                if (h == "destroy") {
                    f.destroy(this)
                } else {
                    f[h]()
                }
            }
        })
    }
    var b = e.fn.parallax;
    e.fn.parallax = c;
    e.fn.parallax.Constructor = f;
    e.fn.parallax.noConflict = function () {
        e.fn.parallax = b;
        return this
    };
    e(a).on("ready.px.parallax.data-api", function () {
        e('[data-parallax="scroll"]').parallax()
    })
}(jQuery, window, document));
/*! PhotoSwipe - v4.1.1 - 2015-12-24
 * http://photoswipe.com
 * Copyright (c) 2015 Dmitry Semenov; */
(function (a, b) {
    if (typeof define === "function" && define.amd) {
        define(b)
    } else {
        if (typeof exports === "object") {
            module.exports = b()
        } else {
            a.PhotoSwipe = b()
        }
    }
})(this, function () {
    var a = function (a3, bu, cq, bv) {
        var bz = {
            features: null,
            bind: function (cB, cz, cA, cy) {
                var p = (cy ? "remove" : "add") + "EventListener";
                cz = cz.split(" ");
                for (var cx = 0; cx < cz.length; cx++) {
                    if (cz[cx]) {
                        cB[p](cz[cx], cA, false)
                    }
                }
            },
            isArray: function (p) {
                return (p instanceof Array)
            },
            createEl: function (cx, p) {
                var cy = document.createElement(p || "div");
                if (cx) {
                    cy.className = cx
                }
                return cy
            },
            getScrollY: function () {
                var p = window.pageYOffset;
                return p !== undefined ? p : document.documentElement.scrollTop
            },
            unbind: function (cy, p, cx) {
                bz.bind(cy, p, cx, true)
            },
            removeClass: function (cy, cx) {
                var p = new RegExp("(\\s|^)" + cx + "(\\s|$)");
                cy.className = cy.className.replace(p, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, "")
            },
            addClass: function (cx, p) {
                if (!bz.hasClass(cx, p)) {
                    cx.className += (cx.className ? " " : "") + p
                }
            },
            hasClass: function (cx, p) {
                return cx.className && new RegExp("(^|\\s)" + p + "(\\s|$)").test(cx.className)
            },
            getChildByClass: function (cx, p) {
                var cy = cx.firstChild;
                while (cy) {
                    if (bz.hasClass(cy, p)) {
                        return cy
                    }
                    cy = cy.nextSibling
                }
            },
            arraySearch: function (cz, cy, cx) {
                var p = cz.length;
                while (p--) {
                    if (cz[p][cx] === cy) {
                        return p
                    }
                }
                return -1
            },
            extend: function (cy, cx, p) {
                for (var cz in cx) {
                    if (cx.hasOwnProperty(cz)) {
                        if (p && cy.hasOwnProperty(cz)) {
                            continue
                        }
                        cy[cz] = cx[cz]
                    }
                }
            },
            easing: {
                sine: {
                    out: function (p) {
                        return Math.sin(p * (Math.PI / 2))
                    },
                    inOut: function (p) {
                        return -(Math.cos(Math.PI * p) - 1) / 2
                    }
                },
                cubic: {
                    out: function (p) {
                        return --p * p * p + 1
                    }
                }
            },
            detectFeatures: function () {
                if (bz.features) {
                    return bz.features
                }
                var cz = bz.createEl(),
                    cD = cz.style,
                    cG = "",
                    cy = {};
                cy.oldIE = document.all && !document.addEventListener;
                cy.touch = "ontouchstart" in window;
                if (window.requestAnimationFrame) {
                    cy.raf = window.requestAnimationFrame;
                    cy.caf = window.cancelAnimationFrame
                }
                cy.pointerEvent = navigator.pointerEnabled || navigator.msPointerEnabled;
                if (!cy.pointerEvent) {
                    var cx = navigator.userAgent;
                    if (/iP(hone|od)/.test(navigator.platform)) {
                        var cH = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
                        if (cH && cH.length > 0) {
                            cH = parseInt(cH[1], 10);
                            if (cH >= 1 && cH < 8) {
                                cy.isOldIOSPhone = true
                            }
                        }
                    }
                    var cC = cx.match(/Android\s([0-9\.]*)/);
                    var cJ = cC ? cC[1] : 0;
                    cJ = parseFloat(cJ);
                    if (cJ >= 1) {
                        if (cJ < 4.4) {
                            cy.isOldAndroid = true
                        }
                        cy.androidVersion = cJ
                    }
                    cy.isMobileOpera = /opera mini|opera mobi/i.test(cx)
                }
                var cE = ["transform", "perspective", "animationName"],
                    cI = ["", "webkit", "Moz", "ms", "O"],
                    cK, cA;
                for (var cB = 0; cB < 4; cB++) {
                    cG = cI[cB];
                    for (var cF = 0; cF < 3; cF++) {
                        cK = cE[cF];
                        cA = cG + (cG ? cK.charAt(0).toUpperCase() + cK.slice(1) : cK);
                        if (!cy[cK] && cA in cD) {
                            cy[cK] = cA
                        }
                    }
                    if (cG && !cy.raf) {
                        cG = cG.toLowerCase();
                        cy.raf = window[cG + "RequestAnimationFrame"];
                        if (cy.raf) {
                            cy.caf = window[cG + "CancelAnimationFrame"] || window[cG + "CancelRequestAnimationFrame"]
                        }
                    }
                }
                if (!cy.raf) {
                    var p = 0;
                    cy.raf = function (cM) {
                        var cL = new Date().getTime();
                        var cN = Math.max(0, 16 - (cL - p));
                        var cO = window.setTimeout(function () {
                            cM(cL + cN)
                        }, cN);
                        p = cL + cN;
                        return cO
                    };
                    cy.caf = function (cL) {
                        clearTimeout(cL)
                    }
                }
                cy.svg = !!document.createElementNS && !!document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect;
                bz.features = cy;
                return cy
            }
        };
        bz.detectFeatures();
        if (bz.features.oldIE) {
            bz.bind = function (cC, cA, cB, cz) {
                cA = cA.split(" ");
                var p = (cz ? "detach" : "attach") + "Event",
                    cy, cD = function () {
                        cB.handleEvent.call(cB)
                    };
                for (var cx = 0; cx < cA.length; cx++) {
                    cy = cA[cx];
                    if (cy) {
                        if (typeof cB === "object" && cB.handleEvent) {
                            if (!cz) {
                                cB["oldIE" + cy] = cD
                            } else {
                                if (!cB["oldIE" + cy]) {
                                    return false
                                }
                            }
                            cC[p]("on" + cy, cB["oldIE" + cy])
                        } else {
                            cC[p]("on" + cy, cB)
                        }
                    }
                }
            }
        }
        var a4 = this;
        var D = 25,
            K = 3;
        var ac = {
            allowPanToNext: true,
            spacing: 0.12,
            bgOpacity: 1,
            mouseUsed: false,
            loop: true,
            pinchToClose: true,
            closeOnScroll: true,
            closeOnVerticalDrag: true,
            verticalDragRange: 0.75,
            hideAnimationDuration: 333,
            showAnimationDuration: 333,
            showHideOpacity: false,
            focus: true,
            escKey: true,
            arrowKeys: true,
            mainScrollEndFriction: 0.35,
            panEndFriction: 0.35,
            isClickableElement: function (p) {
                return p.tagName === "A"
            },
            getDoubleTapZoom: function (cx, p) {
                if (cx) {
                    return 1
                } else {
                    return p.initialZoomLevel < 0.7 ? 1 : 1.33
                }
            },
            maxSpreadZoom: 1.33,
            modal: true,
            scaleMode: "fit"
        };
        bz.extend(ac, bv);
        var bM = function () {
            return {
                x: 0,
                y: 0
            }
        };
        var G, bT, bF, bH, l, Z, U = bM(),
            cu = bM(),
            al = bM(),
            bG, ba, aI, b3 = {},
            bI, bN, ax, cf, F, a5, bp = 0,
            bV = {},
            bJ = bM(),
            at, q, aW = 0,
            B, bn, J, R, ca, ah, ae = true,
            ci, aR = [],
            a9, aZ, af, aC, bi, b4, bb, T = {},
            h = false,
            aK = function (p, cx) {
                bz.extend(a4, cx.publicMethods);
                aR.push(p)
            },
            bA = function (p) {
                var cx = aS();
                if (p > cx - 1) {
                    return p - cx
                } else {
                    if (p < 0) {
                        return cx + p
                    }
                }
                return p
            },
            ch = {},
            a8 = function (p, cx) {
                if (!ch[p]) {
                    ch[p] = []
                }
                return ch[p].push(cx)
            },
            ao = function (cx) {
                var cz = ch[cx];
                if (cz) {
                    var p = Array.prototype.slice.call(arguments);
                    p.shift();
                    for (var cy = 0; cy < cz.length; cy++) {
                        cz[cy].apply(a4, p)
                    }
                }
            },
            ap = function () {
                return new Date().getTime()
            },
            d = function (p) {
                aE = p;
                a4.bg.style.opacity = p * ac.bgOpacity
            },
            r = function (cz, p, cA, cy, cx) {
                if (!h || (cx && cx !== a4.currItem)) {
                    cy = cy / (cx ? cx.fitRatio : a4.currItem.fitRatio)
                }
                cz[ca] = ax + p + "px, " + cA + "px" + cf + " scale(" + cy + ")"
            },
            ak = function (p) {
                if (bl) {
                    if (p) {
                        if (bI > a4.currItem.fitRatio) {
                            if (!h) {
                                by(a4.currItem, false, true);
                                h = true
                            }
                        } else {
                            if (h) {
                                by(a4.currItem);
                                h = false
                            }
                        }
                    }
                    r(bl, al.x, al.y, bI)
                }
            },
            ct = function (p) {
                if (p.container) {
                    r(p.container.style, p.initialPosition.x, p.initialPosition.y, p.initialZoomLevel, p)
                }
            },
            bS = function (p, cx) {
                cx[ca] = ax + p + "px, 0px" + cf
            },
            ad = function (p, cy) {
                if (!ac.loop && cy) {
                    var cx = bH + (bJ.x * bp - p) / bJ.x,
                        cz = Math.round(p - aH.x);
                    if ((cx < 0 && cz > 0) || (cx >= aS() - 1 && cz < 0)) {
                        p = aH.x + cz * ac.mainScrollEndFriction
                    }
                }
                aH.x = p;
                bS(p, l)
            },
            aN = function (cx, cy) {
                var p = ar[cx] - bV[cx];
                return cu[cx] + U[cx] + p - p * (cy / bN)
            },
            a7 = function (cx, p) {
                cx.x = p.x;
                cx.y = p.y;
                if (p.id) {
                    cx.id = p.id
                }
            },
            E = function (cx) {
                cx.x = Math.round(cx.x);
                cx.y = Math.round(cx.y)
            },
            s = null,
            aD = function () {
                if (s) {
                    bz.unbind(document, "mousemove", aD);
                    bz.addClass(a3, "pswp--has_mouse");
                    ac.mouseUsed = true;
                    ao("mouseUsed")
                }
                s = setTimeout(function () {
                    s = null
                }, 100)
            },
            b1 = function () {
                bz.bind(document, "keydown", a4);
                if (bb.transform) {
                    bz.bind(a4.scrollWrap, "click", a4)
                }
                if (!ac.mouseUsed) {
                    bz.bind(document, "mousemove", aD)
                }
                bz.bind(window, "resize scroll", a4);
                ao("bindEvents")
            },
            aq = function () {
                bz.unbind(window, "resize", a4);
                bz.unbind(window, "scroll", aI.scroll);
                bz.unbind(document, "keydown", a4);
                bz.unbind(document, "mousemove", aD);
                if (bb.transform) {
                    bz.unbind(a4.scrollWrap, "click", a4)
                }
                if (bU) {
                    bz.unbind(window, bG, a4)
                }
                ao("unbindEvents")
            },
            aJ = function (cx, cy) {
                var p = P(a4.currItem, b3, cx);
                if (cy) {
                    cm = p
                }
                return p
            },
            b0 = function (p) {
                if (!p) {
                    p = a4.currItem
                }
                return p.initialZoomLevel
            },
            Q = function (p) {
                if (!p) {
                    p = a4.currItem
                }
                return p.w > 0 ? ac.maxSpreadZoom : 1
            },
            cd = function (cy, cz, p, cx) {
                if (cx === a4.currItem.initialZoomLevel) {
                    p[cy] = a4.currItem.initialPosition[cy];
                    return true
                } else {
                    p[cy] = aN(cy, cx);
                    if (p[cy] > cz.min[cy]) {
                        p[cy] = cz.min[cy];
                        return true
                    } else {
                        if (p[cy] < cz.max[cy]) {
                            p[cy] = cz.max[cy];
                            return true
                        }
                    }
                }
                return false
            },
            C = function () {
                if (ca) {
                    var p = bb.perspective && !ci;
                    ax = "translate" + (p ? "3d(" : "(");
                    cf = bb.perspective ? ", 0px)" : ")";
                    return
                }
                ca = "left";
                bz.addClass(a3, "pswp--ie");
                bS = function (cx, cy) {
                    cy.left = cx + "px"
                };
                ct = function (cB) {
                    var cy = cB.fitRatio > 1 ? 1 : cB.fitRatio,
                        cA = cB.container.style,
                        cx = cy * cB.w,
                        cz = cy * cB.h;
                    cA.width = cx + "px";
                    cA.height = cz + "px";
                    cA.left = cB.initialPosition.x + "px";
                    cA.top = cB.initialPosition.y + "px"
                };
                ak = function () {
                    if (bl) {
                        var cA = bl,
                            cB = a4.currItem,
                            cy = cB.fitRatio > 1 ? 1 : cB.fitRatio,
                            cx = cy * cB.w,
                            cz = cy * cB.h;
                        cA.width = cx + "px";
                        cA.height = cz + "px";
                        cA.left = al.x + "px";
                        cA.top = al.y + "px"
                    }
                }
            },
            S = function (cx) {
                var p = "";
                if (ac.escKey && cx.keyCode === 27) {
                    p = "close"
                } else {
                    if (ac.arrowKeys) {
                        if (cx.keyCode === 37) {
                            p = "prev"
                        } else {
                            if (cx.keyCode === 39) {
                                p = "next"
                            }
                        }
                    }
                }
                if (p) {
                    if (!cx.ctrlKey && !cx.altKey && !cx.shiftKey && !cx.metaKey) {
                        if (cx.preventDefault) {
                            cx.preventDefault()
                        } else {
                            cx.returnValue = false
                        }
                        a4[p]()
                    }
                }
            },
            bg = function (p) {
                if (!p) {
                    return
                }
                if (ai || co || Y || bq) {
                    p.preventDefault();
                    p.stopPropagation()
                }
            },
            aX = function () {
                a4.setScrollOffset(0, bz.getScrollY())
            };
        var aj = {},
            ck = 0,
            bo = function (p) {
                if (aj[p]) {
                    if (aj[p].raf) {
                        aZ(aj[p].raf)
                    }
                    ck--;
                    delete aj[p]
                }
            },
            x = function (p) {
                if (aj[p]) {
                    bo(p)
                }
                if (!aj[p]) {
                    ck++;
                    aj[p] = {}
                }
            },
            a1 = function () {
                for (var p in aj) {
                    if (aj.hasOwnProperty(p)) {
                        bo(p)
                    }
                }
            },
            az = function (p, cE, cA, cD, cx, cz, cy) {
                var cC = ap(),
                    cF;
                x(p);
                var cB = function () {
                    if (aj[p]) {
                        cF = ap() - cC;
                        if (cF >= cD) {
                            bo(p);
                            cz(cA);
                            if (cy) {
                                cy()
                            }
                            return
                        }
                        cz((cA - cE) * cx(cF / cD) + cE);
                        aj[p].raf = a9(cB)
                    }
                };
                cB()
            };
        var cn = {
            shout: ao,
            listen: a8,
            viewportSize: b3,
            options: ac,
            isMainScrollAnimating: function () {
                return Y
            },
            getZoomLevel: function () {
                return bI
            },
            getCurrentIndex: function () {
                return bH
            },
            isDragging: function () {
                return bU
            },
            isZooming: function () {
                return be
            },
            setScrollOffset: function (p, cx) {
                bV.x = p;
                b4 = bV.y = cx;
                ao("updateScrollOffset", bV)
            },
            applyZoomPan: function (cz, cy, p, cx) {
                al.x = cy;
                al.y = p;
                bI = cz;
                ak(cx)
            },
            init: function () {
                if (G || bT) {
                    return
                }
                var cx;
                a4.framework = bz;
                a4.template = a3;
                a4.bg = bz.getChildByClass(a3, "pswp__bg");
                af = a3.className;
                G = true;
                bb = bz.detectFeatures();
                a9 = bb.raf;
                aZ = bb.caf;
                ca = bb.transform;
                bi = bb.oldIE;
                a4.scrollWrap = bz.getChildByClass(a3, "pswp__scroll-wrap");
                a4.container = bz.getChildByClass(a4.scrollWrap, "pswp__container");
                l = a4.container.style;
                a4.itemHolders = at = [{
                    el: a4.container.children[0],
                    wrap: 0,
                    index: -1
                }, {
                    el: a4.container.children[1],
                    wrap: 0,
                    index: -1
                }, {
                    el: a4.container.children[2],
                    wrap: 0,
                    index: -1
                }];
                at[0].el.style.display = at[2].el.style.display = "none";
                C();
                aI = {
                    resize: a4.updateSize,
                    scroll: aX,
                    keydown: S,
                    click: bg
                };
                var cz = bb.isOldIOSPhone || bb.isOldAndroid || bb.isMobileOpera;
                if (!bb.animationName || !bb.transform || cz) {
                    ac.showAnimationDuration = ac.hideAnimationDuration = 0
                }
                for (cx = 0; cx < aR.length; cx++) {
                    a4["init" + aR[cx]]()
                }
                if (bu) {
                    var cy = a4.ui = new bu(a4, bz);
                    cy.init()
                }
                ao("firstUpdate");
                bH = bH || ac.index || 0;
                if (isNaN(bH) || bH < 0 || bH >= aS()) {
                    bH = 0
                }
                a4.currItem = bC(bH);
                if (bb.isOldIOSPhone || bb.isOldAndroid) {
                    ae = false
                }
                a3.setAttribute("aria-hidden", "false");
                if (ac.modal) {
                    if (!ae) {
                        a3.style.position = "absolute";
                        a3.style.top = bz.getScrollY() + "px"
                    } else {
                        a3.style.position = "fixed"
                    }
                }
                if (b4 === undefined) {
                    ao("initialLayout");
                    b4 = aC = bz.getScrollY()
                }
                var p = "pswp--open ";
                if (ac.mainClass) {
                    p += ac.mainClass + " "
                }
                if (ac.showHideOpacity) {
                    p += "pswp--animate_opacity "
                }
                p += ci ? "pswp--touch" : "pswp--notouch";
                p += bb.animationName ? " pswp--css_animation" : "";
                p += bb.svg ? " pswp--svg" : "";
                bz.addClass(a3, p);
                a4.updateSize();
                Z = -1;
                aW = null;
                for (cx = 0; cx < K; cx++) {
                    bS((cx + Z) * bJ.x, at[cx].el.style)
                }
                if (!bi) {
                    bz.bind(a4.scrollWrap, ba, a4)
                }
                a8("initialZoomInEnd", function () {
                    a4.setContent(at[0], bH - 1);
                    a4.setContent(at[2], bH + 1);
                    at[0].el.style.display = at[2].el.style.display = "block";
                    if (ac.focus) {
                        a3.focus()
                    }
                    b1()
                });
                a4.setContent(at[1], bH);
                a4.updateCurrItem();
                ao("afterInit");
                if (!ae) {
                    F = setInterval(function () {
                        if (!ck && !bU && !be && (bI === a4.currItem.initialZoomLevel)) {
                            a4.updateSize()
                        }
                    }, 1000)
                }
                bz.addClass(a3, "pswp--visible")
            },
            close: function () {
                if (!G) {
                    return
                }
                G = false;
                bT = true;
                ao("close");
                aq();
                aL(a4.currItem, null, true, a4.destroy)
            },
            destroy: function () {
                ao("destroy");
                if (b9) {
                    clearTimeout(b9)
                }
                a3.setAttribute("aria-hidden", "true");
                a3.className = af;
                if (F) {
                    clearInterval(F)
                }
                bz.unbind(a4.scrollWrap, ba, a4);
                bz.unbind(window, "scroll", a4);
                cj();
                a1();
                ch = null
            },
            panTo: function (p, cy, cx) {
                if (!cx) {
                    if (p > cm.min.x) {
                        p = cm.min.x
                    } else {
                        if (p < cm.max.x) {
                            p = cm.max.x
                        }
                    }
                    if (cy > cm.min.y) {
                        cy = cm.min.y
                    } else {
                        if (cy < cm.max.y) {
                            cy = cm.max.y
                        }
                    }
                }
                al.x = p;
                al.y = cy;
                ak()
            },
            handleEvent: function (p) {
                p = p || window.event;
                if (aI[p.type]) {
                    aI[p.type](p)
                }
            },
            goTo: function (p) {
                p = bA(p);
                var cx = p - bH;
                aW = cx;
                bH = p;
                a4.currItem = bC(bH);
                bp -= cx;
                ad(bJ.x * bp);
                a1();
                Y = false;
                a4.updateCurrItem()
            },
            next: function () {
                a4.goTo(bH + 1)
            },
            prev: function () {
                a4.goTo(bH - 1)
            },
            updateCurrZoomItem: function (p) {
                if (p) {
                    ao("beforeChange", 0)
                }
                if (at[1].el.children.length) {
                    var cx = at[1].el.children[0];
                    if (bz.hasClass(cx, "pswp__zoom-wrap")) {
                        bl = cx.style
                    } else {
                        bl = null
                    }
                } else {
                    bl = null
                }
                cm = a4.currItem.bounds;
                bN = bI = a4.currItem.initialZoomLevel;
                al.x = cm.center.x;
                al.y = cm.center.y;
                if (p) {
                    ao("afterChange")
                }
            },
            invalidateCurrItems: function () {
                a5 = true;
                for (var p = 0; p < K; p++) {
                    if (at[p].item) {
                        at[p].item.needsUpdate = true
                    }
                }
            },
            updateCurrItem: function (cx) {
                if (aW === 0) {
                    return
                }
                var cA = Math.abs(aW),
                    cz;
                if (cx && cA < 2) {
                    return
                }
                a4.currItem = bC(bH);
                h = false;
                ao("beforeChange", aW);
                if (cA >= K) {
                    Z += aW + (aW > 0 ? -K : K);
                    cA = K
                }
                for (var cy = 0; cy < cA; cy++) {
                    if (aW > 0) {
                        cz = at.shift();
                        at[K - 1] = cz;
                        Z++;
                        bS((Z + 2) * bJ.x, cz.el.style);
                        a4.setContent(cz, bH - cA + cy + 1 + 1)
                    } else {
                        cz = at.pop();
                        at.unshift(cz);
                        Z--;
                        bS(Z * bJ.x, cz.el.style);
                        a4.setContent(cz, bH + cA - cy - 1 - 1)
                    }
                }
                if (bl && Math.abs(aW) === 1) {
                    var p = bC(q);
                    if (p.initialZoomLevel !== bI) {
                        P(p, b3);
                        by(p);
                        ct(p)
                    }
                }
                aW = 0;
                a4.updateCurrZoomItem();
                q = bH;
                ao("afterChange")
            },
            updateSize: function (cB) {
                if (!ae && ac.modal) {
                    var cy = bz.getScrollY();
                    if (b4 !== cy) {
                        a3.style.top = cy + "px";
                        b4 = cy
                    }
                    if (!cB && T.x === window.innerWidth && T.y === window.innerHeight) {
                        return
                    }
                    T.x = window.innerWidth;
                    T.y = window.innerHeight;
                    a3.style.height = T.y + "px"
                }
                b3.x = a4.scrollWrap.clientWidth;
                b3.y = a4.scrollWrap.clientHeight;
                aX();
                bJ.x = b3.x + Math.round(b3.x * ac.spacing);
                bJ.y = b3.y;
                ad(bJ.x * bp);
                ao("beforeResize");
                if (Z !== undefined) {
                    var cx, cA, cz;
                    for (var p = 0; p < K; p++) {
                        cx = at[p];
                        bS((p + Z) * bJ.x, cx.el.style);
                        cz = bH + p - 1;
                        if (ac.loop && aS() > 2) {
                            cz = bA(cz)
                        }
                        cA = bC(cz);
                        if (cA && (a5 || cA.needsUpdate || !cA.bounds)) {
                            a4.cleanSlide(cA);
                            a4.setContent(cx, cz);
                            if (p === 1) {
                                a4.currItem = cA;
                                a4.updateCurrZoomItem(true)
                            }
                            cA.needsUpdate = false
                        } else {
                            if (cx.index === -1 && cz >= 0) {
                                a4.setContent(cx, cz)
                            }
                        }
                        if (cA && cA.container) {
                            P(cA, b3);
                            by(cA);
                            ct(cA)
                        }
                    }
                    a5 = false
                }
                bN = bI = a4.currItem.initialZoomLevel;
                cm = a4.currItem.bounds;
                if (cm) {
                    al.x = cm.center.x;
                    al.y = cm.center.y;
                    ak(true)
                }
                ao("resize")
            },
            zoomTo: function (cE, cB, cy, p, cA) {
                if (cB) {
                    bN = bI;
                    ar.x = Math.abs(cB.x) - al.x;
                    ar.y = Math.abs(cB.y) - al.y;
                    a7(cu, al)
                }
                var cz = aJ(cE, false),
                    cC = {};
                cd("x", cz, cC, cE);
                cd("y", cz, cC, cE);
                var cF = bI;
                var cD = {
                    x: al.x,
                    y: al.y
                };
                E(cC);
                var cx = function (cG) {
                    if (cG === 1) {
                        bI = cE;
                        al.x = cC.x;
                        al.y = cC.y
                    } else {
                        bI = (cE - cF) * cG + cF;
                        al.x = (cC.x - cD.x) * cG + cD.x;
                        al.y = (cC.y - cD.y) * cG + cD.y
                    }
                    if (cA) {
                        cA(cG)
                    }
                    ak(cG === 1)
                };
                if (cy) {
                    az("customZoomTo", 0, 1, cy, p || bz.easing.sine.inOut, cx)
                } else {
                    cx(1)
                }
            }
        };
        var aF = 30,
            W = 10;
        var c, aB, bD = {},
            bW = {},
            m = {},
            bd = {},
            ce = {},
            bc = [],
            cp = {},
            aA, z = [],
            bX = {},
            t, bq, ag, cg = 0,
            j = bM(),
            am = 0,
            bU, bt, co, ai, bO, L, av, be, M, O, cm, aH = bM(),
            bl, Y, ar = bM(),
            i = bM(),
            bj, au, aQ, aE, b, V = function (cx, p) {
                return cx.x === p.x && cx.y === p.y
            },
            bP = function (cx, p) {
                return Math.abs(cx.x - p.x) < D && Math.abs(cx.y - p.y) < D
            },
            aO = function (cx, p) {
                bX.x = Math.abs(cx.x - p.x);
                bX.y = Math.abs(cx.y - p.y);
                return Math.sqrt(bX.x * bX.x + bX.y * bX.y)
            },
            cj = function () {
                if (bO) {
                    aZ(bO);
                    bO = null
                }
            },
            cr = function () {
                if (bU) {
                    bO = a9(cr);
                    b8()
                }
            },
            cw = function () {
                return !(ac.scaleMode === "fit" && bI === a4.currItem.initialZoomLevel)
            },
            a6 = function (cx, p) {
                if (!cx || cx === document) {
                    return false
                }
                if (cx.getAttribute("class") && cx.getAttribute("class").indexOf("pswp__scroll-wrap") > -1) {
                    return false
                }
                if (p(cx)) {
                    return cx
                }
                return a6(cx.parentNode, p)
            },
            e = {},
            bf = function (cx, p) {
                e.prevent = !a6(cx.target, ac.isClickableElement);
                ao("preventDragEvent", cx, p, e);
                return e.prevent
            },
            bQ = function (cy, cx) {
                cx.x = cy.pageX;
                cx.y = cy.pageY;
                cx.id = cy.identifier;
                return cx
            },
            o = function (cy, cx, p) {
                p.x = (cy.x + cx.x) * 0.5;
                p.y = (cy.y + cx.y) * 0.5
            },
            bB = function (cx, p, cz) {
                if (cx - aB > 50) {
                    var cy = z.length > 2 ? z.shift() : {};
                    cy.x = p;
                    cy.y = cz;
                    z.push(cy);
                    aB = cx
                }
            },
            n = function () {
                var p = al.y - a4.currItem.initialPosition.y;
                return 1 - Math.abs(p / (b3.y / 2))
            },
            cc = {},
            cb = {},
            bR = [],
            aw, aV = function (p) {
                while (bR.length > 0) {
                    bR.pop()
                }
                if (!ah) {
                    if (p.type.indexOf("touch") > -1) {
                        if (p.touches && p.touches.length > 0) {
                            bR[0] = bQ(p.touches[0], cc);
                            if (p.touches.length > 1) {
                                bR[1] = bQ(p.touches[1], cb)
                            }
                        }
                    } else {
                        cc.x = p.pageX;
                        cc.y = p.pageY;
                        cc.id = "";
                        bR[0] = cc
                    }
                } else {
                    aw = 0;
                    bc.forEach(function (cx) {
                        if (aw === 0) {
                            bR[0] = cx
                        } else {
                            if (aw === 1) {
                                bR[1] = cx
                            }
                        }
                        aw++
                    })
                }
                return bR
            },
            g = function (cx, cG) {
                var cz, cD = 0,
                    cE = al[cx] + cG[cx],
                    cB, cy = cG[cx] > 0,
                    cF = aH.x + cG.x,
                    cA = aH.x - cp.x,
                    p, cC;
                if (cE > cm.min[cx] || cE < cm.max[cx]) {
                    cz = ac.panEndFriction
                } else {
                    cz = 1
                }
                cE = al[cx] + cG[cx] * cz;
                if (ac.allowPanToNext || bI === a4.currItem.initialZoomLevel) {
                    if (!bl) {
                        cC = cF
                    } else {
                        if (bj === "h" && cx === "x" && !co) {
                            if (cy) {
                                if (cE > cm.min[cx]) {
                                    cz = ac.panEndFriction;
                                    cD = cm.min[cx] - cE;
                                    cB = cm.min[cx] - cu[cx]
                                }
                                if ((cB <= 0 || cA < 0) && aS() > 1) {
                                    cC = cF;
                                    if (cA < 0 && cF > cp.x) {
                                        cC = cp.x
                                    }
                                } else {
                                    if (cm.min.x !== cm.max.x) {
                                        p = cE
                                    }
                                }
                            } else {
                                if (cE < cm.max[cx]) {
                                    cz = ac.panEndFriction;
                                    cD = cE - cm.max[cx];
                                    cB = cu[cx] - cm.max[cx]
                                }
                                if ((cB <= 0 || cA > 0) && aS() > 1) {
                                    cC = cF;
                                    if (cA > 0 && cF < cp.x) {
                                        cC = cp.x
                                    }
                                } else {
                                    if (cm.min.x !== cm.max.x) {
                                        p = cE
                                    }
                                }
                            }
                        }
                    }
                    if (cx === "x") {
                        if (cC !== undefined) {
                            ad(cC, true);
                            if (cC === cp.x) {
                                L = false
                            } else {
                                L = true
                            }
                        }
                        if (cm.min.x !== cm.max.x) {
                            if (p !== undefined) {
                                al.x = p
                            } else {
                                if (!L) {
                                    al.x += cG.x * cz
                                }
                            }
                        }
                        return cC !== undefined
                    }
                }
                if (!Y) {
                    if (!L) {
                        if (bI > a4.currItem.fitRatio) {
                            al[cx] += cG[cx] * cz
                        }
                    }
                }
            },
            bZ = function (cz) {
                if (cz.type === "mousedown" && cz.button > 0) {
                    return
                }
                if (bw) {
                    cz.preventDefault();
                    return
                }
                if (ag && cz.type === "mousedown") {
                    return
                }
                if (bf(cz, true)) {
                    cz.preventDefault()
                }
                ao("pointerDown");
                if (ah) {
                    var cx = bz.arraySearch(bc, cz.pointerId, "id");
                    if (cx < 0) {
                        cx = bc.length
                    }
                    bc[cx] = {
                        x: cz.pageX,
                        y: cz.pageY,
                        id: cz.pointerId
                    }
                }
                var p = aV(cz),
                    cy = p.length;
                av = null;
                a1();
                if (!bU || cy === 1) {
                    bU = au = true;
                    bz.bind(window, bG, a4);
                    t = b = aQ = bq = L = ai = bt = co = false;
                    bj = null;
                    ao("firstTouchStart", p);
                    a7(cu, al);
                    U.x = U.y = 0;
                    a7(bd, p[0]);
                    a7(ce, bd);
                    cp.x = bJ.x * bp;
                    z = [{
                        x: bd.x,
                        y: bd.y
                    }];
                    aB = c = ap();
                    aJ(bI, true);
                    cj();
                    cr()
                }
                if (!be && cy > 1 && !Y && !L) {
                    bN = bI;
                    co = false;
                    be = bt = true;
                    U.y = U.x = 0;
                    a7(cu, al);
                    a7(bD, p[0]);
                    a7(bW, p[1]);
                    o(bD, bW, i);
                    ar.x = Math.abs(i.x) - al.x;
                    ar.y = Math.abs(i.y) - al.y;
                    M = O = aO(bD, bW)
                }
            },
            aM = function (cB) {
                cB.preventDefault();
                if (ah) {
                    var cx = bz.arraySearch(bc, cB.pointerId, "id");
                    if (cx > -1) {
                        var cA = bc[cx];
                        cA.x = cB.pageX;
                        cA.y = cB.pageY
                    }
                }
                if (bU) {
                    var cy = aV(cB);
                    if (!bj && !ai && !be) {
                        if (aH.x !== bJ.x * bp) {
                            bj = "h"
                        } else {
                            var cz = Math.abs(cy[0].x - bd.x) - Math.abs(cy[0].y - bd.y);
                            if (Math.abs(cz) >= W) {
                                bj = cz > 0 ? "h" : "v";
                                av = cy
                            }
                        }
                    } else {
                        av = cy
                    }
                }
            },
            b8 = function () {
                if (!av) {
                    return
                }
                var cE = av.length;
                if (cE === 0) {
                    return
                }
                a7(bD, av[0]);
                m.x = bD.x - bd.x;
                m.y = bD.y - bd.y;
                if (be && cE > 1) {
                    bd.x = bD.x;
                    bd.y = bD.y;
                    if (!m.x && !m.y && V(av[1], bW)) {
                        return
                    }
                    a7(bW, av[1]);
                    if (!co) {
                        co = true;
                        ao("zoomGestureStarted")
                    }
                    var cz = aO(bD, bW);
                    var cB = H(cz);
                    if (cB > a4.currItem.initialZoomLevel + a4.currItem.initialZoomLevel / 15) {
                        b = true
                    }
                    var cD = 1,
                        cF = b0(),
                        cx = Q();
                    if (cB < cF) {
                        if (ac.pinchToClose && !b && bN <= a4.currItem.initialZoomLevel) {
                            var p = cF - cB;
                            var cC = 1 - p / (cF / 1.2);
                            d(cC);
                            ao("onPinchClose", cC);
                            aQ = true
                        } else {
                            cD = (cF - cB) / cF;
                            if (cD > 1) {
                                cD = 1
                            }
                            cB = cF - cD * (cF / 3)
                        }
                    } else {
                        if (cB > cx) {
                            cD = (cB - cx) / (cF * 6);
                            if (cD > 1) {
                                cD = 1
                            }
                            cB = cx + cD * cF
                        }
                    }
                    if (cD < 0) {
                        cD = 0
                    }
                    M = cz;
                    o(bD, bW, j);
                    U.x += j.x - i.x;
                    U.y += j.y - i.y;
                    a7(i, j);
                    al.x = aN("x", cB);
                    al.y = aN("y", cB);
                    t = cB > bI;
                    bI = cB;
                    ak()
                } else {
                    if (!bj) {
                        return
                    }
                    if (au) {
                        au = false;
                        if (Math.abs(m.x) >= W) {
                            m.x -= av[0].x - ce.x
                        }
                        if (Math.abs(m.y) >= W) {
                            m.y -= av[0].y - ce.y
                        }
                    }
                    bd.x = bD.x;
                    bd.y = bD.y;
                    if (m.x === 0 && m.y === 0) {
                        return
                    }
                    if (bj === "v" && ac.closeOnVerticalDrag) {
                        if (!cw()) {
                            U.y += m.y;
                            al.y += m.y;
                            var cA = n();
                            bq = true;
                            ao("onVerticalDrag", cA);
                            d(cA);
                            ak();
                            return
                        }
                    }
                    bB(ap(), bD.x, bD.y);
                    ai = true;
                    cm = a4.currItem.bounds;
                    var cy = g("x", m);
                    if (!cy) {
                        g("y", m);
                        E(al);
                        ak()
                    }
                }
            },
            I = function (cE) {
                if (bb.isOldAndroid) {
                    if (ag && cE.type === "mouseup") {
                        return
                    }
                    if (cE.type.indexOf("touch") > -1) {
                        clearTimeout(ag);
                        ag = setTimeout(function () {
                            ag = 0
                        }, 600)
                    }
                }
                ao("pointerUp");
                if (bf(cE, false)) {
                    cE.preventDefault()
                }
                var cy;
                if (ah) {
                    var cz = bz.arraySearch(bc, cE.pointerId, "id");
                    if (cz > -1) {
                        cy = bc.splice(cz, 1)[0];
                        if (navigator.pointerEnabled) {
                            cy.type = cE.pointerType || "mouse"
                        } else {
                            var cD = {
                                4: "mouse",
                                2: "touch",
                                3: "pen"
                            };
                            cy.type = cD[cE.pointerType];
                            if (!cy.type) {
                                cy.type = cE.pointerType || "mouse"
                            }
                        }
                    }
                }
                var cx = aV(cE),
                    p, cF = cx.length;
                if (cE.type === "mouseup") {
                    cF = 0
                }
                if (cF === 2) {
                    av = null;
                    return true
                }
                if (cF === 1) {
                    a7(ce, cx[0])
                }
                if (cF === 0 && !bj && !Y) {
                    if (!cy) {
                        if (cE.type === "mouseup") {
                            cy = {
                                x: cE.pageX,
                                y: cE.pageY,
                                type: "mouse"
                            }
                        } else {
                            if (cE.changedTouches && cE.changedTouches[0]) {
                                cy = {
                                    x: cE.changedTouches[0].pageX,
                                    y: cE.changedTouches[0].pageY,
                                    type: "touch"
                                }
                            }
                        }
                    }
                    ao("touchRelease", cE, cy)
                }
                var cH = -1;
                if (cF === 0) {
                    bU = false;
                    bz.unbind(window, bG, a4);
                    cj();
                    if (be) {
                        cH = 0
                    } else {
                        if (am !== -1) {
                            cH = ap() - am
                        }
                    }
                }
                am = cF === 1 ? ap() : -1;
                if (cH !== -1 && cH < 150) {
                    p = "zoom"
                } else {
                    p = "swipe"
                }
                if (be && cF < 2) {
                    be = false;
                    if (cF === 1) {
                        p = "zoomPointerUp"
                    }
                    ao("zoomGestureEnded")
                }
                av = null;
                if (!ai && !co && !Y && !bq) {
                    return
                }
                a1();
                if (!aA) {
                    aA = b7()
                }
                aA.calculateSwipeSpeed("x");
                if (bq) {
                    var cA = n();
                    if (cA < ac.verticalDragRange) {
                        a4.close()
                    } else {
                        var cB = al.y,
                            cG = aE;
                        az("verticalDrag", 0, 1, 300, bz.easing.cubic.out, function (cI) {
                            al.y = (a4.currItem.initialPosition.y - cB) * cI + cB;
                            d((1 - cG) * cI + cG);
                            ak()
                        });
                        ao("onVerticalDrag", 1)
                    }
                    return
                }
                if ((L || Y) && cF === 0) {
                    var cC = ab(p, aA);
                    if (cC) {
                        return
                    }
                    p = "zoomPointerUp"
                }
                if (Y) {
                    return
                }
                if (p !== "swipe") {
                    A();
                    return
                }
                if (!L && bI > a4.currItem.fitRatio) {
                    aY(aA)
                }
            },
            b7 = function () {
                var cy, cx;
                var p = {
                    lastFlickOffset: {},
                    lastFlickDist: {},
                    lastFlickSpeed: {},
                    slowDownRatio: {},
                    slowDownRatioReverse: {},
                    speedDecelerationRatio: {},
                    speedDecelerationRatioAbs: {},
                    distanceOffset: {},
                    backAnimDestination: {},
                    backAnimStarted: {},
                    calculateSwipeSpeed: function (cz) {
                        if (z.length > 1) {
                            cy = ap() - aB + 50;
                            cx = z[z.length - 2][cz]
                        } else {
                            cy = ap() - c;
                            cx = ce[cz]
                        }
                        p.lastFlickOffset[cz] = bd[cz] - cx;
                        p.lastFlickDist[cz] = Math.abs(p.lastFlickOffset[cz]);
                        if (p.lastFlickDist[cz] > 20) {
                            p.lastFlickSpeed[cz] = p.lastFlickOffset[cz] / cy
                        } else {
                            p.lastFlickSpeed[cz] = 0
                        }
                        if (Math.abs(p.lastFlickSpeed[cz]) < 0.1) {
                            p.lastFlickSpeed[cz] = 0
                        }
                        p.slowDownRatio[cz] = 0.95;
                        p.slowDownRatioReverse[cz] = 1 - p.slowDownRatio[cz];
                        p.speedDecelerationRatio[cz] = 1
                    },
                    calculateOverBoundsAnimOffset: function (cz, cA) {
                        if (!p.backAnimStarted[cz]) {
                            if (al[cz] > cm.min[cz]) {
                                p.backAnimDestination[cz] = cm.min[cz]
                            } else {
                                if (al[cz] < cm.max[cz]) {
                                    p.backAnimDestination[cz] = cm.max[cz]
                                }
                            }
                            if (p.backAnimDestination[cz] !== undefined) {
                                p.slowDownRatio[cz] = 0.7;
                                p.slowDownRatioReverse[cz] = 1 - p.slowDownRatio[cz];
                                if (p.speedDecelerationRatioAbs[cz] < 0.05) {
                                    p.lastFlickSpeed[cz] = 0;
                                    p.backAnimStarted[cz] = true;
                                    az("bounceZoomPan" + cz, al[cz], p.backAnimDestination[cz], cA || 300, bz.easing.sine.out, function (cB) {
                                        al[cz] = cB;
                                        ak()
                                    })
                                }
                            }
                        }
                    },
                    calculateAnimOffset: function (cz) {
                        if (!p.backAnimStarted[cz]) {
                            p.speedDecelerationRatio[cz] = p.speedDecelerationRatio[cz] * (p.slowDownRatio[cz] + p.slowDownRatioReverse[cz] - p.slowDownRatioReverse[cz] * p.timeDiff / 10);
                            p.speedDecelerationRatioAbs[cz] = Math.abs(p.lastFlickSpeed[cz] * p.speedDecelerationRatio[cz]);
                            p.distanceOffset[cz] = p.lastFlickSpeed[cz] * p.speedDecelerationRatio[cz] * p.timeDiff;
                            al[cz] += p.distanceOffset[cz]
                        }
                    },
                    panAnimLoop: function () {
                        if (aj.zoomPan) {
                            aj.zoomPan.raf = a9(p.panAnimLoop);
                            p.now = ap();
                            p.timeDiff = p.now - p.lastNow;
                            p.lastNow = p.now;
                            p.calculateAnimOffset("x");
                            p.calculateAnimOffset("y");
                            ak();
                            p.calculateOverBoundsAnimOffset("x");
                            p.calculateOverBoundsAnimOffset("y");
                            if (p.speedDecelerationRatioAbs.x < 0.05 && p.speedDecelerationRatioAbs.y < 0.05) {
                                al.x = Math.round(al.x);
                                al.y = Math.round(al.y);
                                ak();
                                bo("zoomPan");
                                return
                            }
                        }
                    }
                };
                return p
            },
            aY = function (p) {
                p.calculateSwipeSpeed("y");
                cm = a4.currItem.bounds;
                p.backAnimDestination = {};
                p.backAnimStarted = {};
                if (Math.abs(p.lastFlickSpeed.x) <= 0.05 && Math.abs(p.lastFlickSpeed.y) <= 0.05) {
                    p.speedDecelerationRatioAbs.x = p.speedDecelerationRatioAbs.y = 0;
                    p.calculateOverBoundsAnimOffset("x");
                    p.calculateOverBoundsAnimOffset("y");
                    return true
                }
                x("zoomPan");
                p.lastNow = ap();
                p.panAnimLoop()
            },
            ab = function (p, cy) {
                var cz;
                if (!Y) {
                    cg = bH
                }
                var cx;
                if (p === "swipe") {
                    var cD = bd.x - ce.x,
                        cC = cy.lastFlickDist.x < 10;
                    if (cD > aF && (cC || cy.lastFlickOffset.x > 20)) {
                        cx = -1
                    } else {
                        if (cD < -aF && (cC || cy.lastFlickOffset.x < -20)) {
                            cx = 1
                        }
                    }
                }
                var cB;
                if (cx) {
                    bH += cx;
                    if (bH < 0) {
                        bH = ac.loop ? aS() - 1 : 0;
                        cB = true
                    } else {
                        if (bH >= aS()) {
                            bH = ac.loop ? 0 : aS() - 1;
                            cB = true
                        }
                    }
                    if (!cB || ac.loop) {
                        aW += cx;
                        bp -= cx;
                        cz = true
                    }
                }
                var cE = bJ.x * bp;
                var cA = Math.abs(cE - aH.x);
                var cF;
                if (!cz && cE > aH.x !== cy.lastFlickSpeed.x > 0) {
                    cF = 333
                } else {
                    cF = Math.abs(cy.lastFlickSpeed.x) > 0 ? cA / Math.abs(cy.lastFlickSpeed.x) : 333;
                    cF = Math.min(cF, 400);
                    cF = Math.max(cF, 250)
                }
                if (cg === bH) {
                    cz = false
                }
                Y = true;
                ao("mainScrollAnimStart");
                az("mainScroll", aH.x, cE, cF, bz.easing.cubic.out, ad, function () {
                    a1();
                    Y = false;
                    cg = -1;
                    if (cz || cg !== bH) {
                        a4.updateCurrItem()
                    }
                    ao("mainScrollAnimComplete")
                });
                if (cz) {
                    a4.updateCurrItem(true)
                }
                return cz
            },
            H = function (p) {
                return 1 / O * p * bN
            },
            A = function () {
                var cy = bI,
                    cB = b0(),
                    p = Q();
                if (bI < cB) {
                    cy = cB
                } else {
                    if (bI > p) {
                        cy = p
                    }
                }
                var cA = 1,
                    cx, cz = aE;
                if (aQ && !t && !b && bI < cB) {
                    a4.close();
                    return true
                }
                if (aQ) {
                    cx = function (cC) {
                        d((cA - cz) * cC + cz)
                    }
                }
                a4.zoomTo(cy, 0, 200, bz.easing.cubic.out, cx);
                return true
            };
        aK("Gestures", {
            publicMethods: {
                initGestures: function () {
                    var p = function (cy, cB, cz, cx, cA) {
                        B = cy + cB;
                        bn = cy + cz;
                        J = cy + cx;
                        if (cA) {
                            R = cy + cA
                        } else {
                            R = ""
                        }
                    };
                    ah = bb.pointerEvent;
                    if (ah && bb.touch) {
                        bb.touch = false
                    }
                    if (ah) {
                        if (navigator.pointerEnabled) {
                            p("pointer", "down", "move", "up", "cancel")
                        } else {
                            p("MSPointer", "Down", "Move", "Up", "Cancel")
                        }
                    } else {
                        if (bb.touch) {
                            p("touch", "start", "move", "end", "cancel");
                            ci = true
                        } else {
                            p("mouse", "down", "move", "up")
                        }
                    }
                    bG = bn + " " + J + " " + R;
                    ba = B;
                    if (ah && !ci) {
                        ci = (navigator.maxTouchPoints > 1) || (navigator.msMaxTouchPoints > 1)
                    }
                    a4.likelyTouchDevice = ci;
                    aI[B] = bZ;
                    aI[bn] = aM;
                    aI[J] = I;
                    if (R) {
                        aI[R] = aI[J]
                    }
                    if (bb.touch) {
                        ba += " mousedown";
                        bG += " mousemove mouseup";
                        aI.mousedown = aI[B];
                        aI.mousemove = aI[bn];
                        aI.mouseup = aI[J]
                    }
                    if (!ci) {
                        ac.allowPanToNext = false
                    }
                }
            }
        });
        var b9, aL = function (cB, cy, cA, cx) {
            if (b9) {
                clearTimeout(b9)
            }
            bw = true;
            bK = true;
            var cz;
            if (cB.initialLayout) {
                cz = cB.initialLayout;
                cB.initialLayout = null
            } else {
                cz = ac.getThumbBoundsFn && ac.getThumbBoundsFn(bH)
            }
            var cD = cA ? ac.hideAnimationDuration : ac.showAnimationDuration;
            var cC = function () {
                bo("initialZoom");
                if (!cA) {
                    d(1);
                    if (cy) {
                        cy.style.display = "block"
                    }
                    bz.addClass(a3, "pswp--animated-in");
                    ao("initialZoom" + (cA ? "OutEnd" : "InEnd"))
                } else {
                    a4.template.removeAttribute("style");
                    a4.bg.removeAttribute("style")
                }
                if (cx) {
                    cx()
                }
                bw = false
            };
            if (!cD || !cz || cz.x === undefined) {
                ao("initialZoom" + (cA ? "Out" : "In"));
                bI = cB.initialZoomLevel;
                a7(al, cB.initialPosition);
                ak();
                a3.style.opacity = cA ? 0 : 1;
                d(1);
                if (cD) {
                    setTimeout(function () {
                        cC()
                    }, cD)
                } else {
                    cC()
                }
                return
            }
            var p = function () {
                var cF = bF,
                    cE = !a4.currItem.src || a4.currItem.loadError || ac.showHideOpacity;
                if (cB.miniImg) {
                    cB.miniImg.style.webkitBackfaceVisibility = "hidden"
                }
                if (!cA) {
                    bI = cz.w / cB.w;
                    al.x = cz.x;
                    al.y = cz.y - aC;
                    a4[cE ? "template" : "bg"].style.opacity = 0.001;
                    ak()
                }
                x("initialZoom");
                if (cA && !cF) {
                    bz.removeClass(a3, "pswp--animated-in")
                }
                if (cE) {
                    if (cA) {
                        bz[(cF ? "remove" : "add") + "Class"](a3, "pswp--animate_opacity")
                    } else {
                        setTimeout(function () {
                            bz.addClass(a3, "pswp--animate_opacity")
                        }, 30)
                    }
                }
                b9 = setTimeout(function () {
                    ao("initialZoom" + (cA ? "Out" : "In"));
                    if (!cA) {
                        bI = cB.initialZoomLevel;
                        a7(al, cB.initialPosition);
                        ak();
                        d(1);
                        if (cE) {
                            a3.style.opacity = 1
                        } else {
                            d(1)
                        }
                        b9 = setTimeout(cC, cD + 20)
                    } else {
                        var cH = cz.w / cB.w,
                            cJ = {
                                x: al.x,
                                y: al.y
                            },
                            cK = bI,
                            cI = aE,
                            cG = function (cL) {
                                if (cL === 1) {
                                    bI = cH;
                                    al.x = cz.x;
                                    al.y = cz.y - b4
                                } else {
                                    bI = (cH - cK) * cL + cK;
                                    al.x = (cz.x - cJ.x) * cL + cJ.x;
                                    al.y = (cz.y - b4 - cJ.y) * cL + cJ.y
                                }
                                ak();
                                if (cE) {
                                    a3.style.opacity = 1 - cL
                                } else {
                                    d(cI - cL * cI)
                                }
                            };
                        if (cF) {
                            az("initialZoom", 0, 1, cD, bz.easing.cubic.out, cG, cC)
                        } else {
                            cG(1);
                            b9 = setTimeout(cC, cD + 20)
                        }
                    }
                }, cA ? 25 : 90)
            };
            p()
        };
        var aU, aT = {},
            w = [],
            bK, bw, b6 = {
                index: 0,
                errorMsg: '<div class="pswp__error-msg"><a href="%url%" target="_blank">The image</a> could not be loaded.</div>',
                forceProgressiveLoading: false,
                preload: [1, 1],
                getNumItemsFn: function () {
                    return aU.length
                }
            };
        var bC, aS, y, bk = function () {
                return {
                    center: {
                        x: 0,
                        y: 0
                    },
                    max: {
                        x: 0,
                        y: 0
                    },
                    min: {
                        x: 0,
                        y: 0
                    }
                }
            },
            a0 = function (cz, p, cy) {
                var cx = cz.bounds;
                cx.center.x = Math.round((aT.x - p) / 2);
                cx.center.y = Math.round((aT.y - cy) / 2) + cz.vGap.top;
                cx.max.x = (p > aT.x) ? Math.round(aT.x - p) : cx.center.x;
                cx.max.y = (cy > aT.y) ? Math.round(aT.y - cy) + cz.vGap.top : cx.center.y;
                cx.min.x = (p > aT.x) ? 0 : cx.center.x;
                cx.min.y = (cy > aT.y) ? cz.vGap.top : cx.center.y
            },
            P = function (cz, p, cC) {
                if (cz.src && !cz.loadError) {
                    var cA = !cC;
                    if (cA) {
                        if (!cz.vGap) {
                            cz.vGap = {
                                top: 0,
                                bottom: 0
                            }
                        }
                        ao("parseVerticalMargin", cz)
                    }
                    aT.x = p.x;
                    aT.y = p.y - cz.vGap.top - cz.vGap.bottom;
                    if (cA) {
                        var cB = aT.x / cz.w;
                        var cy = aT.y / cz.h;
                        cz.fitRatio = cB < cy ? cB : cy;
                        var cx = ac.scaleMode;
                        if (cx === "orig") {
                            cC = 1
                        } else {
                            if (cx === "fit") {
                                cC = cz.fitRatio
                            }
                        }
                        if (cC > 1) {
                            cC = 1
                        }
                        cz.initialZoomLevel = cC;
                        if (!cz.bounds) {
                            cz.bounds = bk()
                        }
                    }
                    if (!cC) {
                        return
                    }
                    a0(cz, cz.w * cC, cz.h * cC);
                    if (cA && cC === cz.initialZoomLevel) {
                        cz.initialPosition = cz.bounds.center
                    }
                    return cz.bounds
                } else {
                    cz.w = cz.h = 0;
                    cz.initialZoomLevel = cz.fitRatio = 1;
                    cz.bounds = bk();
                    cz.initialPosition = cz.bounds.center;
                    return cz.bounds
                }
            },
            bh = function (cy, cA, cx, p, cB, cz) {
                if (cA.loadError) {
                    return
                }
                if (p) {
                    cA.imageAppended = true;
                    by(cA, p, (cA === a4.currItem && h));
                    cx.appendChild(p);
                    if (cz) {
                        setTimeout(function () {
                            if (cA && cA.loaded && cA.placeholder) {
                                cA.placeholder.style.display = "none";
                                cA.placeholder = null
                            }
                        }, 500)
                    }
                }
            },
            aP = function (cx) {
                cx.loading = true;
                cx.loaded = false;
                var p = cx.img = bz.createEl("pswp__img", "img");
                var cy = function () {
                    cx.loading = false;
                    cx.loaded = true;
                    if (cx.loadComplete) {
                        cx.loadComplete(cx)
                    } else {
                        cx.img = null
                    }
                    p.onload = p.onerror = null;
                    p = null
                };
                p.onload = cy;
                p.onerror = function () {
                    cx.loadError = true;
                    cy()
                };
                p.src = cx.src;
                return p
            },
            bs = function (p, cx) {
                if (p.src && p.loadError && p.container) {
                    if (cx) {
                        p.container.innerHTML = ""
                    }
                    p.container.innerHTML = ac.errorMsg.replace("%url%", p.src);
                    return true
                }
            },
            by = function (cA, cx, cz) {
                if (!cA.src) {
                    return
                }
                if (!cx) {
                    cx = cA.container.lastChild
                }
                var p = cz ? cA.w : Math.round(cA.w * cA.fitRatio),
                    cy = cz ? cA.h : Math.round(cA.h * cA.fitRatio);
                if (cA.placeholder && !cA.loaded) {
                    cA.placeholder.style.width = p + "px";
                    cA.placeholder.style.height = cy + "px"
                }
                cx.style.width = p + "px";
                cx.style.height = cy + "px"
            },
            u = function () {
                if (w.length) {
                    var p;
                    for (var cx = 0; cx < w.length; cx++) {
                        p = w[cx];
                        if (p.holder.index === p.index) {
                            bh(p.index, p.item, p.baseDiv, p.img, false, p.clearPlaceholder)
                        }
                    }
                    w = []
                }
            };
        aK("Controller", {
            publicMethods: {
                lazyLoadItem: function (p) {
                    p = bA(p);
                    var cx = bC(p);
                    if (!cx || ((cx.loaded || cx.loading) && !a5)) {
                        return
                    }
                    ao("gettingData", p, cx);
                    if (!cx.src) {
                        return
                    }
                    aP(cx)
                },
                initController: function () {
                    bz.extend(ac, b6, true);
                    a4.items = aU = cq;
                    bC = a4.getItemAt;
                    aS = ac.getNumItemsFn;
                    y = ac.loop;
                    if (aS() < 3) {
                        ac.loop = false
                    }
                    a8("beforeChange", function (cC) {
                        var cB = ac.preload,
                            cy = cC === null ? true : (cC >= 0),
                            cz = Math.min(cB[0], aS()),
                            cA = Math.min(cB[1], aS()),
                            cx;
                        for (cx = 1; cx <= (cy ? cA : cz); cx++) {
                            a4.lazyLoadItem(bH + cx)
                        }
                        for (cx = 1; cx <= (cy ? cz : cA); cx++) {
                            a4.lazyLoadItem(bH - cx)
                        }
                    });
                    a8("initialLayout", function () {
                        a4.currItem.initialLayout = ac.getThumbBoundsFn && ac.getThumbBoundsFn(bH)
                    });
                    a8("mainScrollAnimComplete", u);
                    a8("initialZoomInEnd", u);
                    a8("destroy", function () {
                        var cx;
                        for (var p = 0; p < aU.length; p++) {
                            cx = aU[p];
                            if (cx.container) {
                                cx.container = null
                            }
                            if (cx.placeholder) {
                                cx.placeholder = null
                            }
                            if (cx.img) {
                                cx.img = null
                            }
                            if (cx.preloader) {
                                cx.preloader = null
                            }
                            if (cx.loadError) {
                                cx.loaded = cx.loadError = false
                            }
                        }
                        w = null
                    })
                },
                getItemAt: function (p) {
                    if (p >= 0) {
                        return aU[p] !== undefined ? aU[p] : false
                    }
                    return false
                },
                allowProgressiveImg: function () {
                    return ac.forceProgressiveLoading || !ci || ac.mouseUsed || screen.width > 1200
                },
                setContent: function (cB, cA) {
                    if (ac.loop) {
                        cA = bA(cA)
                    }
                    var cx = a4.getItemAt(cB.index);
                    if (cx) {
                        cx.container = null
                    }
                    var cC = a4.getItemAt(cA),
                        cz;
                    if (!cC) {
                        cB.el.innerHTML = "";
                        return
                    }
                    ao("gettingData", cA, cC);
                    cB.index = cA;
                    cB.item = cC;
                    var cy = cC.container = bz.createEl("pswp__zoom-wrap");
                    if (!cC.src && cC.html) {
                        if (cC.html.tagName) {
                            cy.appendChild(cC.html)
                        } else {
                            cy.innerHTML = cC.html
                        }
                    }
                    bs(cC);
                    P(cC, b3);
                    if (cC.src && !cC.loadError && !cC.loaded) {
                        cC.loadComplete = function (cE) {
                            if (!G) {
                                return
                            }
                            if (cB && cB.index === cA) {
                                if (bs(cE, true)) {
                                    cE.loadComplete = cE.img = null;
                                    P(cE, b3);
                                    ct(cE);
                                    if (cB.index === bH) {
                                        a4.updateCurrZoomItem()
                                    }
                                    return
                                }
                                if (!cE.imageAppended) {
                                    if (bb.transform && (Y || bw)) {
                                        w.push({
                                            item: cE,
                                            baseDiv: cy,
                                            img: cE.img,
                                            index: cA,
                                            holder: cB,
                                            clearPlaceholder: true
                                        })
                                    } else {
                                        bh(cA, cE, cy, cE.img, Y || bw, true)
                                    }
                                } else {
                                    if (!bw && cE.placeholder) {
                                        cE.placeholder.style.display = "none";
                                        cE.placeholder = null
                                    }
                                }
                            }
                            cE.loadComplete = null;
                            cE.img = null;
                            ao("imageLoadComplete", cA, cE)
                        };
                        if (bz.features.transform) {
                            var p = "pswp__img pswp__img--placeholder";
                            p += (cC.msrc ? "" : " pswp__img--placeholder--blank");
                            var cD = bz.createEl(p, cC.msrc ? "img" : "");
                            if (cC.msrc) {
                                cD.src = cC.msrc
                            }
                            by(cC, cD);
                            cy.appendChild(cD);
                            cC.placeholder = cD
                        }
                        if (!cC.loading) {
                            aP(cC)
                        }
                        if (a4.allowProgressiveImg()) {
                            if (!bK && bb.transform) {
                                w.push({
                                    item: cC,
                                    baseDiv: cy,
                                    img: cC.img,
                                    index: cA,
                                    holder: cB
                                })
                            } else {
                                bh(cA, cC, cy, cC.img, true, true)
                            }
                        }
                    } else {
                        if (cC.src && !cC.loadError) {
                            cz = bz.createEl("pswp__img", "img");
                            cz.style.opacity = 1;
                            cz.src = cC.src;
                            by(cC, cz);
                            bh(cA, cC, cy, cz, true)
                        }
                    }
                    if (!bK && cA === bH) {
                        bl = cy.style;
                        aL(cC, (cz || cC.img))
                    } else {
                        ct(cC)
                    }
                    cB.el.innerHTML = "";
                    cB.el.appendChild(cy)
                },
                cleanSlide: function (p) {
                    if (p.img) {
                        p.img.onload = p.img.onerror = null
                    }
                    p.loaded = p.loading = p.img = p.imageAppended = false
                }
            }
        });
        var bx, X = {},
            v = function (cx, cA, p) {
                var cz = document.createEvent("CustomEvent"),
                    cy = {
                        origEvent: cx,
                        target: cx.target,
                        releasePoint: cA,
                        pointerType: p || "touch"
                    };
                cz.initCustomEvent("pswpTap", true, true, cy);
                cx.target.dispatchEvent(cz)
            };
        aK("Tap", {
            publicMethods: {
                initTap: function () {
                    a8("firstTouchStart", a4.onTapStart);
                    a8("touchRelease", a4.onTapRelease);
                    a8("destroy", function () {
                        X = {};
                        bx = null
                    })
                },
                onTapStart: function (p) {
                    if (p.length > 1) {
                        clearTimeout(bx);
                        bx = null
                    }
                },
                onTapRelease: function (cx, cy) {
                    if (!cy) {
                        return
                    }
                    if (!ai && !bt && !ck) {
                        var cz = cy;
                        if (bx) {
                            clearTimeout(bx);
                            bx = null;
                            if (bP(cz, X)) {
                                ao("doubleTap", cz);
                                return
                            }
                        }
                        if (cy.type === "mouse") {
                            v(cx, cy, "mouse");
                            return
                        }
                        var p = cx.target.tagName.toUpperCase();
                        if (p === "BUTTON" || bz.hasClass(cx.target, "pswp__single-tap")) {
                            v(cx, cy);
                            return
                        }
                        a7(X, cz);
                        bx = setTimeout(function () {
                            v(cx, cy);
                            bx = null
                        }, 300)
                    }
                }
            }
        });
        var f;
        aK("DesktopZoom", {
            publicMethods: {
                initDesktopZoom: function () {
                    if (bi) {
                        return
                    }
                    if (ci) {
                        a8("mouseUsed", function () {
                            a4.setupDesktopZoom()
                        })
                    } else {
                        a4.setupDesktopZoom(true)
                    }
                },
                setupDesktopZoom: function (cy) {
                    f = {};
                    var p = "wheel mousewheel DOMMouseScroll";
                    a8("bindEvents", function () {
                        bz.bind(a3, p, a4.handleMouseWheel)
                    });
                    a8("unbindEvents", function () {
                        if (f) {
                            bz.unbind(a3, p, a4.handleMouseWheel)
                        }
                    });
                    a4.mouseZoomedIn = false;
                    var cA, cz = function () {
                            if (a4.mouseZoomedIn) {
                                bz.removeClass(a3, "pswp--zoomed-in");
                                a4.mouseZoomedIn = false
                            }
                            if (bI < 1) {
                                bz.addClass(a3, "pswp--zoom-allowed")
                            } else {
                                bz.removeClass(a3, "pswp--zoom-allowed")
                            }
                            cx()
                        },
                        cx = function () {
                            if (cA) {
                                bz.removeClass(a3, "pswp--dragging");
                                cA = false
                            }
                        };
                    a8("resize", cz);
                    a8("afterChange", cz);
                    a8("pointerDown", function () {
                        if (a4.mouseZoomedIn) {
                            cA = true;
                            bz.addClass(a3, "pswp--dragging")
                        }
                    });
                    a8("pointerUp", cx);
                    if (!cy) {
                        cz()
                    }
                },
                handleMouseWheel: function (p) {
                    if (bI <= a4.currItem.fitRatio) {
                        if (ac.modal) {
                            if (!ac.closeOnScroll || ck || bU) {
                                p.preventDefault()
                            } else {
                                if (ca && Math.abs(p.deltaY) > 2) {
                                    bF = true;
                                    a4.close()
                                }
                            }
                        }
                        return true
                    }
                    p.stopPropagation();
                    f.x = 0;
                    if ("deltaX" in p) {
                        if (p.deltaMode === 1) {
                            f.x = p.deltaX * 18;
                            f.y = p.deltaY * 18
                        } else {
                            f.x = p.deltaX;
                            f.y = p.deltaY
                        }
                    } else {
                        if ("wheelDelta" in p) {
                            if (p.wheelDeltaX) {
                                f.x = -0.16 * p.wheelDeltaX
                            }
                            if (p.wheelDeltaY) {
                                f.y = -0.16 * p.wheelDeltaY
                            } else {
                                f.y = -0.16 * p.wheelDelta
                            }
                        } else {
                            if ("detail" in p) {
                                f.y = p.detail
                            } else {
                                return
                            }
                        }
                    }
                    aJ(bI, true);
                    var cy = al.x - f.x,
                        cx = al.y - f.y;
                    if (ac.modal || (cy <= cm.min.x && cy >= cm.max.x && cx <= cm.min.y && cx >= cm.max.y)) {
                        p.preventDefault()
                    }
                    a4.panTo(cy, cx)
                },
                toggleDesktopZoom: function (cy) {
                    cy = cy || {
                        x: b3.x / 2 + bV.x,
                        y: b3.y / 2 + bV.y
                    };
                    var cx = ac.getDoubleTapZoom(true, a4.currItem);
                    var p = bI === cx;
                    a4.mouseZoomedIn = !p;
                    a4.zoomTo(p ? a4.currItem.initialZoomLevel : cx, cy, 333);
                    bz[(!p ? "add" : "remove") + "Class"](a3, "pswp--zoomed-in")
                }
            }
        });
        var a2 = {
            history: true,
            galleryUID: 1
        };
        var b2, bE, bY, aa, cv, an, br, bL, b5, ay, bm, k, N = function () {
                return bm.hash.substring(1)
            },
            cs = function () {
                if (b2) {
                    clearTimeout(b2)
                }
                if (bY) {
                    clearTimeout(bY)
                }
            },
            cl = function () {
                var cz = N(),
                    cB = {};
                if (cz.length < 5) {
                    return cB
                }
                var cx, cy = cz.split("&");
                for (cx = 0; cx < cy.length; cx++) {
                    if (!cy[cx]) {
                        continue
                    }
                    var cA = cy[cx].split("=");
                    if (cA.length < 2) {
                        continue
                    }
                    cB[cA[0]] = cA[1]
                }
                if (ac.galleryPIDs) {
                    var p = cB.pid;
                    cB.pid = 0;
                    for (cx = 0; cx < aU.length; cx++) {
                        if (aU[cx].pid === p) {
                            cB.pid = cx;
                            break
                        }
                    }
                } else {
                    cB.pid = parseInt(cB.pid, 10) - 1
                }
                if (cB.pid < 0) {
                    cB.pid = 0
                }
                return cB
            },
            aG = function () {
                if (bY) {
                    clearTimeout(bY)
                }
                if (ck || bU) {
                    bY = setTimeout(aG, 500);
                    return
                }
                if (aa) {
                    clearTimeout(bE)
                } else {
                    aa = true
                }
                var p = (bH + 1);
                var cy = bC(bH);
                if (cy.hasOwnProperty("pid")) {
                    p = cy.pid
                }
                var cx = br + "&gid=" + ac.galleryUID + "&pid=" + p;
                if (!bL) {
                    if (bm.hash.indexOf(cx) === -1) {
                        ay = true
                    }
                }
                var cz = bm.href.split("#")[0] + "#" + cx;
                if (k) {
                    if ("#" + cx !== window.location.hash) {
                        history[bL ? "replaceState" : "pushState"]("", document.title, cz)
                    }
                } else {
                    if (bL) {
                        bm.replace(cz)
                    } else {
                        bm.hash = cx
                    }
                }
                bL = true;
                bE = setTimeout(function () {
                    aa = false
                }, 60)
            };
        aK("History", {
            publicMethods: {
                initHistory: function () {
                    bz.extend(ac, a2, true);
                    if (!ac.history) {
                        return
                    }
                    bm = window.location;
                    ay = false;
                    b5 = false;
                    bL = false;
                    br = N();
                    k = ("pushState" in history);
                    if (br.indexOf("gid=") > -1) {
                        br = br.split("&gid=")[0];
                        br = br.split("?gid=")[0]
                    }
                    a8("afterChange", a4.updateURL);
                    a8("unbindEvents", function () {
                        bz.unbind(window, "hashchange", a4.onHashChange)
                    });
                    var p = function () {
                        an = true;
                        if (!b5) {
                            if (ay) {
                                history.back()
                            } else {
                                if (br) {
                                    bm.hash = br
                                } else {
                                    if (k) {
                                        history.pushState("", document.title, bm.pathname + bm.search)
                                    } else {
                                        bm.hash = ""
                                    }
                                }
                            }
                        }
                        cs()
                    };
                    a8("unbindEvents", function () {
                        if (bF) {
                            p()
                        }
                    });
                    a8("destroy", function () {
                        if (!an) {
                            p()
                        }
                    });
                    a8("firstUpdate", function () {
                        bH = cl().pid
                    });
                    var cx = br.indexOf("pid=");
                    if (cx > -1) {
                        br = br.substring(0, cx);
                        if (br.slice(-1) === "&") {
                            br = br.slice(0, -1)
                        }
                    }
                    setTimeout(function () {
                        if (G) {
                            bz.bind(window, "hashchange", a4.onHashChange)
                        }
                    }, 40)
                },
                onHashChange: function () {
                    if (N() === br) {
                        b5 = true;
                        a4.close();
                        return
                    }
                    if (!aa) {
                        cv = true;
                        a4.goTo(cl().pid);
                        cv = false
                    }
                },
                updateURL: function () {
                    cs();
                    if (cv) {
                        return
                    }
                    if (!bL) {
                        aG()
                    } else {
                        b2 = setTimeout(aG, 800)
                    }
                }
            }
        });
        bz.extend(a4, cn)
    };
    return a
});
/*! PhotoSwipe Default UI - 4.1.1 - 2015-12-24
 * http://photoswipe.com
 * Copyright (c) 2015 Dmitry Semenov; */
(function (a, b) {
    if (typeof define === "function" && define.amd) {
        define(b)
    } else {
        if (typeof exports === "object") {
            module.exports = b()
        } else {
            a.PhotoSwipeUI_Default = b()
        }
    }
})(this, function () {
    var a = function (x, P) {
        var B = this;
        var R = false,
            u = true,
            j, b, k, d, D, n, H, U = true,
            I, c, L, o, s, M, S, O, F = {
                barsSize: {
                    top: 44,
                    bottom: "auto"
                },
                closeElClasses: ["item", "caption", "zoom-wrap", "ui", "top-bar"],
                timeToIdle: 4000,
                timeToIdleOutside: 1000,
                loadingIndicatorDelay: 1000,
                addCaptionHTMLFn: function (V, W) {
                    if (!V.title) {
                        W.children[0].innerHTML = "";
                        return false
                    }
                    W.children[0].innerHTML = V.title;
                    return true
                },
                closeEl: true,
                captionEl: true,
                fullscreenEl: true,
                zoomEl: true,
                shareEl: true,
                counterEl: true,
                arrowEl: true,
                preloaderEl: true,
                tapToClose: false,
                tapToToggleControls: true,
                clickToCloseNonZoomable: true,
                shareButtons: [{
                    id: "facebook",
                    label: "Share on Facebook",
                    url: "https://www.facebook.com/sharer/sharer.php?u={{url}}"
                }, {
                    id: "twitter",
                    label: "Tweet",
                    url: "https://twitter.com/intent/tweet?text={{text}}&url={{url}}"
                }, {
                    id: "pinterest",
                    label: "Pin it",
                    url: "http://www.pinterest.com/pin/create/button/?url={{url}}&media={{image_url}}&description={{text}}"
                }, {
                    id: "download",
                    label: "Download image",
                    url: "{{raw_image_url}}",
                    download: true
                }],
                getImageURLForShare: function () {
                    return x.currItem.src || ""
                },
                getPageURLForShare: function () {
                    return window.location.href
                },
                getTextForShare: function () {
                    return x.currItem.title || ""
                },
                indexIndicatorSep: " / ",
                fitControlsWidth: 1200
            },
            g, z;
        var m = function (aa) {
                if (g) {
                    return true
                }
                aa = aa || window.event;
                if (O.timeToIdle && O.mouseUsed && !c) {
                    l()
                }
                var Z = aa.target || aa.srcElement,
                    V, ab = Z.getAttribute("class") || "",
                    X;
                for (var W = 0; W < h.length; W++) {
                    V = h[W];
                    if (V.onTap && ab.indexOf("pswp__" + V.name) > -1) {
                        V.onTap();
                        X = true
                    }
                }
                if (X) {
                    if (aa.stopPropagation) {
                        aa.stopPropagation()
                    }
                    g = true;
                    var Y = P.features.isOldAndroid ? 600 : 30;
                    z = setTimeout(function () {
                        g = false
                    }, Y)
                }
            },
            A = function () {
                return !x.likelyTouchDevice || O.mouseUsed || screen.width > O.fitControlsWidth
            },
            i = function (W, V, X) {
                P[(X ? "add" : "remove") + "Class"](W, "pswp__" + V)
            },
            y = function () {
                var V = (O.getNumItemsFn() === 1);
                if (V !== S) {
                    i(b, "ui--one-slide", V);
                    S = V
                }
            },
            v = function () {
                i(H, "share-modal--hidden", U)
            },
            t = function () {
                U = !U;
                if (!U) {
                    v();
                    setTimeout(function () {
                        if (!U) {
                            P.addClass(H, "pswp__share-modal--fade-in")
                        }
                    }, 30)
                } else {
                    P.removeClass(H, "pswp__share-modal--fade-in");
                    setTimeout(function () {
                        if (U) {
                            v()
                        }
                    }, 300)
                }
                if (!U) {
                    J()
                }
                return false
            },
            p = function (W) {
                W = W || window.event;
                var V = W.target || W.srcElement;
                x.shout("shareLinkClick", W, V);
                if (!V.href) {
                    return false
                }
                if (V.hasAttribute("download")) {
                    return true
                }
                window.open(V.href, "pswp_share", "scrollbars=yes,resizable=yes,toolbar=no,location=yes,width=550,height=420,top=100,left=" + (window.screen ? Math.round(screen.width / 2 - 275) : 100));
                if (!U) {
                    t()
                }
                return false
            },
            J = function () {
                var aa = "",
                    X, Z, ab, W, Y;
                for (var V = 0; V < O.shareButtons.length; V++) {
                    X = O.shareButtons[V];
                    ab = O.getImageURLForShare(X);
                    W = O.getPageURLForShare(X);
                    Y = O.getTextForShare(X);
                    Z = X.url.replace("{{url}}", encodeURIComponent(W)).replace("{{image_url}}", encodeURIComponent(ab)).replace("{{raw_image_url}}", ab).replace("{{text}}", encodeURIComponent(Y));
                    aa += '<a href="' + Z + '" target="_blank" class="pswp__share--' + X.id + '"' + (X.download ? "download" : "") + ">" + X.label + "</a>";
                    if (O.parseShareButtonOut) {
                        aa = O.parseShareButtonOut(X, aa)
                    }
                }
                H.children[0].innerHTML = aa;
                H.children[0].onclick = p
            },
            C = function (W) {
                for (var V = 0; V < O.closeElClasses.length; V++) {
                    if (P.hasClass(W, "pswp__" + O.closeElClasses[V])) {
                        return true
                    }
                }
            },
            K, e, T = 0,
            l = function () {
                clearTimeout(e);
                T = 0;
                if (c) {
                    B.setIdle(false)
                }
            },
            w = function (V) {
                V = V ? V : window.event;
                var W = V.relatedTarget || V.toElement;
                if (!W || W.nodeName === "HTML") {
                    clearTimeout(e);
                    e = setTimeout(function () {
                        B.setIdle(true)
                    }, O.timeToIdleOutside)
                }
            },
            r = function () {
                if (O.fullscreenEl && !P.features.isOldAndroid) {
                    if (!j) {
                        j = B.getFullscreenAPI()
                    }
                    if (j) {
                        P.bind(document, j.eventK, B.updateFullscreen);
                        B.updateFullscreen();
                        P.addClass(x.template, "pswp--supports-fs")
                    } else {
                        P.removeClass(x.template, "pswp--supports-fs")
                    }
                }
            },
            q = function () {
                if (O.preloaderEl) {
                    f(true);
                    L("beforeChange", function () {
                        clearTimeout(M);
                        M = setTimeout(function () {
                            if (x.currItem && x.currItem.loading) {
                                if (!x.allowProgressiveImg() || (x.currItem.img && !x.currItem.img.naturalWidth)) {
                                    f(false)
                                }
                            } else {
                                f(true)
                            }
                        }, O.loadingIndicatorDelay)
                    });
                    L("imageLoadComplete", function (V, W) {
                        if (x.currItem === W) {
                            f(true)
                        }
                    })
                }
            },
            f = function (V) {
                if (s !== V) {
                    i(o, "preloader--active", !V);
                    s = V
                }
            },
            G = function (X) {
                var Y = X.vGap;
                if (A()) {
                    var V = O.barsSize;
                    if (O.captionEl && V.bottom === "auto") {
                        if (!d) {
                            d = P.createEl("pswp__caption pswp__caption--fake");
                            d.appendChild(P.createEl("pswp__caption__center"));
                            b.insertBefore(d, k);
                            P.addClass(b, "pswp__ui--fit")
                        }
                        if (O.addCaptionHTMLFn(X, d, true)) {
                            var W = d.clientHeight;
                            Y.bottom = parseInt(W, 10) || 44
                        } else {
                            Y.bottom = V.top
                        }
                    } else {
                        Y.bottom = V.bottom === "auto" ? 0 : V.bottom
                    }
                    Y.top = V.top
                } else {
                    Y.top = Y.bottom = 0
                }
            },
            E = function () {
                if (O.timeToIdle) {
                    L("mouseUsed", function () {
                        P.bind(document, "mousemove", l);
                        P.bind(document, "mouseout", w);
                        K = setInterval(function () {
                            T++;
                            if (T === 2) {
                                B.setIdle(true)
                            }
                        }, O.timeToIdle / 2)
                    })
                }
            },
            N = function () {
                L("onVerticalDrag", function (W) {
                    if (u && W < 0.95) {
                        B.hideControls()
                    } else {
                        if (!u && W >= 0.95) {
                            B.showControls()
                        }
                    }
                });
                var V;
                L("onPinchClose", function (W) {
                    if (u && W < 0.9) {
                        B.hideControls();
                        V = true
                    } else {
                        if (V && !u && W > 0.9) {
                            B.showControls()
                        }
                    }
                });
                L("zoomGestureEnded", function () {
                    V = false;
                    if (V && !u) {
                        B.showControls()
                    }
                })
            };
        var h = [{
            name: "caption",
            option: "captionEl",
            onInit: function (V) {
                k = V
            }
        }, {
            name: "share-modal",
            option: "shareEl",
            onInit: function (V) {
                H = V
            },
            onTap: function () {
                t()
            }
        }, {
            name: "button--share",
            option: "shareEl",
            onInit: function (V) {
                n = V
            },
            onTap: function () {
                t()
            }
        }, {
            name: "button--zoom",
            option: "zoomEl",
            onTap: x.toggleDesktopZoom
        }, {
            name: "counter",
            option: "counterEl",
            onInit: function (V) {
                D = V
            }
        }, {
            name: "button--close",
            option: "closeEl",
            onTap: x.close
        }, {
            name: "button--arrow--left",
            option: "arrowEl",
            onTap: x.prev
        }, {
            name: "button--arrow--right",
            option: "arrowEl",
            onTap: x.next
        }, {
            name: "button--fs",
            option: "fullscreenEl",
            onTap: function () {
                if (j.isFullscreen()) {
                    j.exit()
                } else {
                    j.enter()
                }
            }
        }, {
            name: "preloader",
            option: "preloaderEl",
            onInit: function (V) {
                o = V
            }
        }];
        var Q = function () {
            var Y, X, W;
            var V = function (ad) {
                if (!ad) {
                    return
                }
                var ab = ad.length;
                for (var ac = 0; ac < ab; ac++) {
                    Y = ad[ac];
                    X = Y.className;
                    for (var aa = 0; aa < h.length; aa++) {
                        W = h[aa];
                        if (X.indexOf("pswp__" + W.name) > -1) {
                            if (O[W.option]) {
                                P.removeClass(Y, "pswp__element--disabled");
                                if (W.onInit) {
                                    W.onInit(Y)
                                }
                            } else {
                                P.addClass(Y, "pswp__element--disabled")
                            }
                        }
                    }
                }
            };
            V(b.children);
            var Z = P.getChildByClass(b, "pswp__top-bar");
            if (Z) {
                V(Z.children)
            }
        };
        B.init = function () {
            P.extend(x.options, F, true);
            O = x.options;
            b = P.getChildByClass(x.scrollWrap, "pswp__ui");
            L = x.listen;
            N();
            L("beforeChange", B.update);
            L("doubleTap", function (V) {
                var W = x.currItem.initialZoomLevel;
                if (x.getZoomLevel() !== W) {
                    x.zoomTo(W, V, 333)
                } else {
                    x.zoomTo(O.getDoubleTapZoom(false, x.currItem), V, 333)
                }
            });
            L("preventDragEvent", function (Y, V, X) {
                var W = Y.target || Y.srcElement;
                if (W && W.getAttribute("class") && Y.type.indexOf("mouse") > -1 && (W.getAttribute("class").indexOf("__caption") > 0 || (/(SMALL|STRONG|EM)/i).test(W.tagName))) {
                    X.prevent = false
                }
            });
            L("bindEvents", function () {
                P.bind(b, "pswpTap click", m);
                P.bind(x.scrollWrap, "pswpTap", B.onGlobalTap);
                if (!x.likelyTouchDevice) {
                    P.bind(x.scrollWrap, "mouseover", B.onMouseOver)
                }
            });
            L("unbindEvents", function () {
                if (!U) {
                    t()
                }
                if (K) {
                    clearInterval(K)
                }
                P.unbind(document, "mouseout", w);
                P.unbind(document, "mousemove", l);
                P.unbind(b, "pswpTap click", m);
                P.unbind(x.scrollWrap, "pswpTap", B.onGlobalTap);
                P.unbind(x.scrollWrap, "mouseover", B.onMouseOver);
                if (j) {
                    P.unbind(document, j.eventK, B.updateFullscreen);
                    if (j.isFullscreen()) {
                        O.hideAnimationDuration = 0;
                        j.exit()
                    }
                    j = null
                }
            });
            L("destroy", function () {
                if (O.captionEl) {
                    if (d) {
                        b.removeChild(d)
                    }
                    P.removeClass(k, "pswp__caption--empty")
                }
                if (H) {
                    H.children[0].onclick = null
                }
                P.removeClass(b, "pswp__ui--over-close");
                P.addClass(b, "pswp__ui--hidden");
                B.setIdle(false)
            });
            if (!O.showAnimationDuration) {
                P.removeClass(b, "pswp__ui--hidden")
            }
            L("initialZoomIn", function () {
                if (O.showAnimationDuration) {
                    P.removeClass(b, "pswp__ui--hidden")
                }
            });
            L("initialZoomOut", function () {
                P.addClass(b, "pswp__ui--hidden")
            });
            L("parseVerticalMargin", G);
            Q();
            if (O.shareEl && n && H) {
                U = true
            }
            y();
            E();
            r();
            q()
        };
        B.setIdle = function (V) {
            c = V;
            i(b, "ui--idle", V)
        };
        B.update = function () {
            if (u && x.currItem) {
                B.updateIndexIndicator();
                if (O.captionEl) {
                    O.addCaptionHTMLFn(x.currItem, k);
                    i(k, "caption--empty", !x.currItem.title)
                }
                R = true
            } else {
                R = false
            }
            if (!U) {
                t()
            }
            y()
        };
        B.updateFullscreen = function (V) {
            if (V) {
                setTimeout(function () {
                    x.setScrollOffset(0, P.getScrollY())
                }, 50)
            }
            P[(j.isFullscreen() ? "add" : "remove") + "Class"](x.template, "pswp--fs")
        };
        B.updateIndexIndicator = function () {
            if (O.counterEl) {
                D.innerHTML = (x.getCurrentIndex() + 1) + O.indexIndicatorSep + O.getNumItemsFn()
            }
        };
        B.onGlobalTap = function (W) {
            W = W || window.event;
            var V = W.target || W.srcElement;
            if (g) {
                return
            }
            if (W.detail && W.detail.pointerType === "mouse") {
                if (C(V)) {
                    x.close();
                    return
                }
                if (P.hasClass(V, "pswp__img")) {
                    if (x.getZoomLevel() === 1 && x.getZoomLevel() <= x.currItem.fitRatio) {
                        if (O.clickToCloseNonZoomable) {
                            x.close()
                        }
                    } else {
                        x.toggleDesktopZoom(W.detail.releasePoint)
                    }
                }
            } else {
                if (O.tapToToggleControls) {
                    if (u) {
                        B.hideControls()
                    } else {
                        B.showControls()
                    }
                }
                if (O.tapToClose && (P.hasClass(V, "pswp__img") || C(V))) {
                    x.close();
                    return
                }
            }
        };
        B.onMouseOver = function (W) {
            W = W || window.event;
            var V = W.target || W.srcElement;
            i(b, "ui--over-close", C(V))
        };
        B.hideControls = function () {
            P.addClass(b, "pswp__ui--hidden");
            u = false
        };
        B.showControls = function () {
            u = true;
            if (!R) {
                B.update()
            }
            P.removeClass(b, "pswp__ui--hidden")
        };
        B.supportsFullscreen = function () {
            var V = document;
            return !!(V.exitFullscreen || V.mozCancelFullScreen || V.webkitExitFullscreen || V.msExitFullscreen)
        };
        B.getFullscreenAPI = function () {
            var X = document.documentElement,
                V, W = "fullscreenchange";
            if (X.requestFullscreen) {
                V = {
                    enterK: "requestFullscreen",
                    exitK: "exitFullscreen",
                    elementK: "fullscreenElement",
                    eventK: W
                }
            } else {
                if (X.mozRequestFullScreen) {
                    V = {
                        enterK: "mozRequestFullScreen",
                        exitK: "mozCancelFullScreen",
                        elementK: "mozFullScreenElement",
                        eventK: "moz" + W
                    }
                } else {
                    if (X.webkitRequestFullscreen) {
                        V = {
                            enterK: "webkitRequestFullscreen",
                            exitK: "webkitExitFullscreen",
                            elementK: "webkitFullscreenElement",
                            eventK: "webkit" + W
                        }
                    } else {
                        if (X.msRequestFullscreen) {
                            V = {
                                enterK: "msRequestFullscreen",
                                exitK: "msExitFullscreen",
                                elementK: "msFullscreenElement",
                                eventK: "MSFullscreenChange"
                            }
                        }
                    }
                }
            }
            if (V) {
                V.enter = function () {
                    I = O.closeOnScroll;
                    O.closeOnScroll = false;
                    if (this.enterK === "webkitRequestFullscreen") {
                        x.template[this.enterK](Element.ALLOW_KEYBOARD_INPUT)
                    } else {
                        return x.template[this.enterK]()
                    }
                };
                V.exit = function () {
                    O.closeOnScroll = I;
                    return document[this.exitK]()
                };
                V.isFullscreen = function () {
                    return document[this.elementK]
                }
            }
            return V
        }
    };
    return a
});
/*!
 * imagesLoaded PACKAGED v4.1.0
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

! function (t, e) {
    "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? module.exports = e() : t.EvEmitter = e()
}(this, function () {
    function t() {}
    var e = t.prototype;
    return e.on = function (t, e) {
        if (t && e) {
            var i = this._events = this._events || {},
                n = i[t] = i[t] || [];
            return -1 == n.indexOf(e) && n.push(e), this
        }
    }, e.once = function (t, e) {
        if (t && e) {
            this.on(t, e);
            var i = this._onceEvents = this._onceEvents || {},
                n = i[t] = i[t] || [];
            return n[e] = !0, this
        }
    }, e.off = function (t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
            var n = i.indexOf(e);
            return -1 != n && i.splice(n, 1), this
        }
    }, e.emitEvent = function (t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
            var n = 0,
                o = i[n];
            e = e || [];
            for (var r = this._onceEvents && this._onceEvents[t]; o;) {
                var s = r && r[o];
                s && (this.off(t, o), delete r[o]), o.apply(this, e), n += s ? 0 : 1, o = i[n]
            }
            return this
        }
    }, t
}),
function (t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["ev-emitter/ev-emitter"], function (i) {
        return e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter")) : t.imagesLoaded = e(t, t.EvEmitter)
}(window, function (t, e) {
    function i(t, e) {
        for (var i in e) t[i] = e[i];
        return t
    }

    function n(t) {
        var e = [];
        if (Array.isArray(t)) e = t;
        else if ("number" == typeof t.length)
            for (var i = 0; i < t.length; i++) e.push(t[i]);
        else e.push(t);
        return e
    }

    function o(t, e, r) {
        return this instanceof o ? ("string" == typeof t && (t = document.querySelectorAll(t)), this.elements = n(t), this.options = i({}, this.options), "function" == typeof e ? r = e : i(this.options, e), r && this.on("always", r), this.getImages(), h && (this.jqDeferred = new h.Deferred), void setTimeout(function () {
            this.check()
        }.bind(this))) : new o(t, e, r)
    }

    function r(t) {
        this.img = t
    }

    function s(t, e) {
        this.url = t, this.element = e, this.img = new Image
    }
    var h = t.jQuery,
        a = t.console;
    o.prototype = Object.create(e.prototype), o.prototype.options = {}, o.prototype.getImages = function () {
        this.images = [], this.elements.forEach(this.addElementImages, this)
    }, o.prototype.addElementImages = function (t) {
        "IMG" == t.nodeName && this.addImage(t), this.options.background === !0 && this.addElementBackgroundImages(t);
        var e = t.nodeType;
        if (e && d[e]) {
            for (var i = t.querySelectorAll("img"), n = 0; n < i.length; n++) {
                var o = i[n];
                this.addImage(o)
            }
            if ("string" == typeof this.options.background) {
                var r = t.querySelectorAll(this.options.background);
                for (n = 0; n < r.length; n++) {
                    var s = r[n];
                    this.addElementBackgroundImages(s)
                }
            }
        }
    };
    var d = {
        1: !0,
        9: !0,
        11: !0
    };
    return o.prototype.addElementBackgroundImages = function (t) {
        var e = getComputedStyle(t);
        if (e)
            for (var i = /url\((['"])?(.*?)\1\)/gi, n = i.exec(e.backgroundImage); null !== n;) {
                var o = n && n[2];
                o && this.addBackground(o, t), n = i.exec(e.backgroundImage)
            }
    }, o.prototype.addImage = function (t) {
        var e = new r(t);
        this.images.push(e)
    }, o.prototype.addBackground = function (t, e) {
        var i = new s(t, e);
        this.images.push(i)
    }, o.prototype.check = function () {
        function t(t, i, n) {
            setTimeout(function () {
                e.progress(t, i, n)
            })
        }
        var e = this;
        return this.progressedCount = 0, this.hasAnyBroken = !1, this.images.length ? void this.images.forEach(function (e) {
            e.once("progress", t), e.check()
        }) : void this.complete()
    }, o.prototype.progress = function (t, e, i) {
        this.progressedCount++, this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded, this.emitEvent("progress", [this, t, e]), this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, t), this.progressedCount == this.images.length && this.complete(), this.options.debug && a && a.log("progress: " + i, t, e)
    }, o.prototype.complete = function () {
        var t = this.hasAnyBroken ? "fail" : "done";
        if (this.isComplete = !0, this.emitEvent(t, [this]), this.emitEvent("always", [this]), this.jqDeferred) {
            var e = this.hasAnyBroken ? "reject" : "resolve";
            this.jqDeferred[e](this)
        }
    }, r.prototype = Object.create(e.prototype), r.prototype.check = function () {
        var t = this.getIsImageComplete();
        return t ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (this.proxyImage = new Image, this.proxyImage.addEventListener("load", this), this.proxyImage.addEventListener("error", this), this.img.addEventListener("load", this), this.img.addEventListener("error", this), void(this.proxyImage.src = this.img.src))
    }, r.prototype.getIsImageComplete = function () {
        return this.img.complete && void 0 !== this.img.naturalWidth
    }, r.prototype.confirm = function (t, e) {
        this.isLoaded = t, this.emitEvent("progress", [this, this.img, e])
    }, r.prototype.handleEvent = function (t) {
        var e = "on" + t.type;
        this[e] && this[e](t)
    }, r.prototype.onload = function () {
        this.confirm(!0, "onload"), this.unbindEvents()
    }, r.prototype.onerror = function () {
        this.confirm(!1, "onerror"), this.unbindEvents()
    }, r.prototype.unbindEvents = function () {
        this.proxyImage.removeEventListener("load", this), this.proxyImage.removeEventListener("error", this), this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
    }, s.prototype = Object.create(r.prototype), s.prototype.check = function () {
        this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.img.src = this.url;
        var t = this.getIsImageComplete();
        t && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), this.unbindEvents())
    }, s.prototype.unbindEvents = function () {
        this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
    }, s.prototype.confirm = function (t, e) {
        this.isLoaded = t, this.emitEvent("progress", [this, this.element, e])
    }, o.makeJQueryPlugin = function (e) {
        e = e || t.jQuery, e && (h = e, h.fn.imagesLoaded = function (t, e) {
            var i = new o(this, t, e);
            return i.jqDeferred.promise(h(this))
        })
    }, o.makeJQueryPlugin(), o
});
(function (t) {
    var G = /^\s+/,
        s = /\s+$/,
        L = 0,
        B = t.round,
        T = t.min,
        v = t.max,
        j = t.random;

    function O(W, Y) {
        W = (W) ? W : "";
        Y = Y || {};
        if (W instanceof O) {
            return W
        }
        if (!(this instanceof O)) {
            return new O(W, Y)
        }
        var X = K(W);
        this._originalInput = W, this._r = X.r, this._g = X.g, this._b = X.b, this._a = X.a, this._roundA = B(100 * this._a) / 100, this._format = Y.format || X.format;
        this._gradientType = Y.gradientType;
        if (this._r < 1) {
            this._r = B(this._r)
        }
        if (this._g < 1) {
            this._g = B(this._g)
        }
        if (this._b < 1) {
            this._b = B(this._b)
        }
        this._ok = X.ok;
        this._tc_id = L++
    }
    O.prototype = {
        isDark: function () {
            return this.getBrightness() < 128
        },
        isLight: function () {
            return !this.isDark()
        },
        isValid: function () {
            return this._ok
        },
        getOriginalInput: function () {
            return this._originalInput
        },
        getFormat: function () {
            return this._format
        },
        getAlpha: function () {
            return this._a
        },
        getBrightness: function () {
            var W = this.toRgb();
            return (W.r * 299 + W.g * 587 + W.b * 114) / 1000
        },
        getLuminance: function () {
            var W = this.toRgb();
            var Y, X, ab, aa, Z, ac;
            Y = W.r / 255;
            X = W.g / 255;
            ab = W.b / 255;
            if (Y <= 0.03928) {
                aa = Y / 12.92
            } else {
                aa = t.pow(((Y + 0.055) / 1.055), 2.4)
            }
            if (X <= 0.03928) {
                Z = X / 12.92
            } else {
                Z = t.pow(((X + 0.055) / 1.055), 2.4)
            }
            if (ab <= 0.03928) {
                ac = ab / 12.92
            } else {
                ac = t.pow(((ab + 0.055) / 1.055), 2.4)
            }
            return (0.2126 * aa) + (0.7152 * Z) + (0.0722 * ac)
        },
        setAlpha: function (W) {
            this._a = m(W);
            this._roundA = B(100 * this._a) / 100;
            return this
        },
        toHsv: function () {
            var W = h(this._r, this._g, this._b);
            return {
                h: W.h * 360,
                s: W.s,
                v: W.v,
                a: this._a
            }
        },
        toHsvString: function () {
            var X = h(this._r, this._g, this._b);
            var Z = B(X.h * 360),
                Y = B(X.s * 100),
                W = B(X.v * 100);
            return (this._a == 1) ? "hsv(" + Z + ", " + Y + "%, " + W + "%)" : "hsva(" + Z + ", " + Y + "%, " + W + "%, " + this._roundA + ")"
        },
        toHsl: function () {
            var W = o(this._r, this._g, this._b);
            return {
                h: W.h * 360,
                s: W.s,
                l: W.l,
                a: this._a
            }
        },
        toHslString: function () {
            var X = o(this._r, this._g, this._b);
            var Z = B(X.h * 360),
                Y = B(X.s * 100),
                W = B(X.l * 100);
            return (this._a == 1) ? "hsl(" + Z + ", " + Y + "%, " + W + "%)" : "hsla(" + Z + ", " + Y + "%, " + W + "%, " + this._roundA + ")"
        },
        toHex: function (W) {
            return J(this._r, this._g, this._b, W)
        },
        toHexString: function (W) {
            return "#" + this.toHex(W)
        },
        toHex8: function (W) {
            return U(this._r, this._g, this._b, this._a, W)
        },
        toHex8String: function (W) {
            return "#" + this.toHex8(W)
        },
        toRgb: function () {
            return {
                r: B(this._r),
                g: B(this._g),
                b: B(this._b),
                a: this._a
            }
        },
        toRgbString: function () {
            return (this._a == 1) ? "rgb(" + B(this._r) + ", " + B(this._g) + ", " + B(this._b) + ")" : "rgba(" + B(this._r) + ", " + B(this._g) + ", " + B(this._b) + ", " + this._roundA + ")"
        },
        toPercentageRgb: function () {
            return {
                r: B(P(this._r, 255) * 100) + "%",
                g: B(P(this._g, 255) * 100) + "%",
                b: B(P(this._b, 255) * 100) + "%",
                a: this._a
            }
        },
        toPercentageRgbString: function () {
            return (this._a == 1) ? "rgb(" + B(P(this._r, 255) * 100) + "%, " + B(P(this._g, 255) * 100) + "%, " + B(P(this._b, 255) * 100) + "%)" : "rgba(" + B(P(this._r, 255) * 100) + "%, " + B(P(this._g, 255) * 100) + "%, " + B(P(this._b, 255) * 100) + "%, " + this._roundA + ")"
        },
        toName: function () {
            if (this._a === 0) {
                return "transparent"
            }
            if (this._a < 1) {
                return false
            }
            return V[J(this._r, this._g, this._b, true)] || false
        },
        toFilter: function (Z) {
            var aa = "#" + k(this._r, this._g, this._b, this._a);
            var X = aa;
            var W = this._gradientType ? "GradientType = 1, " : "";
            if (Z) {
                var Y = O(Z);
                X = "#" + k(Y._r, Y._g, Y._b, Y._a)
            }
            return "progid:DXImageTransform.Microsoft.gradient(" + W + "startColorstr=" + aa + ",endColorstr=" + X + ")"
        },
        toString: function (Z) {
            var W = !!Z;
            Z = Z || this._format;
            var Y = false;
            var X = this._a < 1 && this._a >= 0;
            var aa = !W && X && (Z === "hex" || Z === "hex6" || Z === "hex3" || Z === "hex4" || Z === "hex8" || Z === "name");
            if (aa) {
                if (Z === "name" && this._a === 0) {
                    return this.toName()
                }
                return this.toRgbString()
            }
            if (Z === "rgb") {
                Y = this.toRgbString()
            }
            if (Z === "prgb") {
                Y = this.toPercentageRgbString()
            }
            if (Z === "hex" || Z === "hex6") {
                Y = this.toHexString()
            }
            if (Z === "hex3") {
                Y = this.toHexString(true)
            }
            if (Z === "hex4") {
                Y = this.toHex8String(true)
            }
            if (Z === "hex8") {
                Y = this.toHex8String()
            }
            if (Z === "name") {
                Y = this.toName()
            }
            if (Z === "hsl") {
                Y = this.toHslString()
            }
            if (Z === "hsv") {
                Y = this.toHsvString()
            }
            return Y || this.toHexString()
        },
        clone: function () {
            return O(this.toString())
        },
        _applyModification: function (Y, X) {
            var W = Y.apply(null, [this].concat([].slice.call(X)));
            this._r = W._r;
            this._g = W._g;
            this._b = W._b;
            this.setAlpha(W._a);
            return this
        },
        lighten: function () {
            return this._applyModification(r, arguments)
        },
        brighten: function () {
            return this._applyModification(b, arguments)
        },
        darken: function () {
            return this._applyModification(q, arguments)
        },
        desaturate: function () {
            return this._applyModification(x, arguments)
        },
        saturate: function () {
            return this._applyModification(H, arguments)
        },
        greyscale: function () {
            return this._applyModification(e, arguments)
        },
        spin: function () {
            return this._applyModification(M, arguments)
        },
        _applyCombination: function (X, W) {
            return X.apply(null, [this].concat([].slice.call(W)))
        },
        analogous: function () {
            return this._applyCombination(z, arguments)
        },
        complement: function () {
            return this._applyCombination(E, arguments)
        },
        monochromatic: function () {
            return this._applyCombination(u, arguments)
        },
        splitcomplement: function () {
            return this._applyCombination(C, arguments)
        },
        triad: function () {
            return this._applyCombination(f, arguments)
        },
        tetrad: function () {
            return this._applyCombination(S, arguments)
        }
    };
    O.fromRatio = function (W, Z) {
        if (typeof W == "object") {
            var X = {};
            for (var Y in W) {
                if (W.hasOwnProperty(Y)) {
                    if (Y === "a") {
                        X[Y] = W[Y]
                    } else {
                        X[Y] = p(W[Y])
                    }
                }
            }
            W = X
        }
        return O(W, Z)
    };

    function K(Z) {
        var aa = {
            r: 0,
            g: 0,
            b: 0
        };
        var X = 1;
        var ac = null;
        var Y = null;
        var W = null;
        var ab = false;
        var ad = false;
        if (typeof Z == "string") {
            Z = w(Z)
        }
        if (typeof Z == "object") {
            if (N(Z.r) && N(Z.g) && N(Z.b)) {
                aa = g(Z.r, Z.g, Z.b);
                ab = true;
                ad = String(Z.r).substr(-1) === "%" ? "prgb" : "rgb"
            } else {
                if (N(Z.h) && N(Z.s) && N(Z.v)) {
                    ac = p(Z.s);
                    Y = p(Z.v);
                    aa = I(Z.h, ac, Y);
                    ab = true;
                    ad = "hsv"
                } else {
                    if (N(Z.h) && N(Z.s) && N(Z.l)) {
                        ac = p(Z.s);
                        W = p(Z.l);
                        aa = A(Z.h, ac, W);
                        ab = true;
                        ad = "hsl"
                    }
                }
            }
            if (Z.hasOwnProperty("a")) {
                X = Z.a
            }
        }
        X = m(X);
        return {
            ok: ab,
            format: Z.format || ad,
            r: T(255, v(aa.r, 0)),
            g: T(255, v(aa.g, 0)),
            b: T(255, v(aa.b, 0)),
            a: X
        }
    }

    function g(Y, X, W) {
        return {
            r: P(Y, 255) * 255,
            g: P(X, 255) * 255,
            b: P(W, 255) * 255
        }
    }

    function o(W, aa, ac) {
        W = P(W, 255);
        aa = P(aa, 255);
        ac = P(ac, 255);
        var ad = v(W, aa, ac),
            Y = T(W, aa, ac);
        var Z, ae, X = (ad + Y) / 2;
        if (ad == Y) {
            Z = ae = 0
        } else {
            var ab = ad - Y;
            ae = X > 0.5 ? ab / (2 - ad - Y) : ab / (ad + Y);
            switch (ad) {
                case W:
                    Z = (aa - ac) / ab + (aa < ac ? 6 : 0);
                    break;
                case aa:
                    Z = (ac - W) / ab + 2;
                    break;
                case ac:
                    Z = (W - aa) / ab + 4;
                    break
            }
            Z /= 6
        }
        return {
            h: Z,
            s: ae,
            l: X
        }
    }

    function A(ab, ae, aa) {
        var W, ac, ad;
        ab = P(ab, 360);
        ae = P(ae, 100);
        aa = P(aa, 100);

        function Z(ah, ag, af) {
            if (af < 0) {
                af += 1
            }
            if (af > 1) {
                af -= 1
            }
            if (af < 1 / 6) {
                return ah + (ag - ah) * 6 * af
            }
            if (af < 1 / 2) {
                return ag
            }
            if (af < 2 / 3) {
                return ah + (ag - ah) * (2 / 3 - af) * 6
            }
            return ah
        }
        if (ae === 0) {
            W = ac = ad = aa
        } else {
            var X = aa < 0.5 ? aa * (1 + ae) : aa + ae - aa * ae;
            var Y = 2 * aa - X;
            W = Z(Y, X, ab + 1 / 3);
            ac = Z(Y, X, ab);
            ad = Z(Y, X, ab - 1 / 3)
        }
        return {
            r: W * 255,
            g: ac * 255,
            b: ad * 255
        }
    }

    function h(W, Z, ab) {
        W = P(W, 255);
        Z = P(Z, 255);
        ab = P(ab, 255);
        var ac = v(W, Z, ab),
            X = T(W, Z, ab);
        var Y, ae, ad = ac;
        var aa = ac - X;
        ae = ac === 0 ? 0 : aa / ac;
        if (ac == X) {
            Y = 0
        } else {
            switch (ac) {
                case W:
                    Y = (Z - ab) / aa + (Z < ab ? 6 : 0);
                    break;
                case Z:
                    Y = (ab - W) / aa + 2;
                    break;
                case ab:
                    Y = (W - Z) / aa + 4;
                    break
            }
            Y /= 6
        }
        return {
            h: Y,
            s: ae,
            v: ad
        }
    }

    function I(aa, ah, af) {
        aa = P(aa, 360) * 6;
        ah = P(ah, 100);
        af = P(af, 100);
        var Z = t.floor(aa),
            ac = aa - Z,
            Y = af * (1 - ah),
            X = af * (1 - ac * ah),
            ag = af * (1 - (1 - ac) * ah),
            ae = Z % 6,
            W = [af, X, Y, Y, ag, af][ae],
            ab = [ag, af, af, X, Y, Y][ae],
            ad = [Y, Y, ag, af, af, X][ae];
        return {
            r: W * 255,
            g: ab * 255,
            b: ad * 255
        }
    }

    function J(Z, Y, W, aa) {
        var X = [y(B(Z).toString(16)), y(B(Y).toString(16)), y(B(W).toString(16))];
        if (aa && X[0].charAt(0) == X[0].charAt(1) && X[1].charAt(0) == X[1].charAt(1) && X[2].charAt(0) == X[2].charAt(1)) {
            return X[0].charAt(0) + X[1].charAt(0) + X[2].charAt(0)
        }
        return X.join("")
    }

    function U(ab, aa, W, X, Y) {
        var Z = [y(B(ab).toString(16)), y(B(aa).toString(16)), y(B(W).toString(16)), y(D(X))];
        if (Y && Z[0].charAt(0) == Z[0].charAt(1) && Z[1].charAt(0) == Z[1].charAt(1) && Z[2].charAt(0) == Z[2].charAt(1) && Z[3].charAt(0) == Z[3].charAt(1)) {
            return Z[0].charAt(0) + Z[1].charAt(0) + Z[2].charAt(0) + Z[3].charAt(0)
        }
        return Z.join("")
    }

    function k(aa, Z, W, X) {
        var Y = [y(D(X)), y(B(aa).toString(16)), y(B(Z).toString(16)), y(B(W).toString(16))];
        return Y.join("")
    }
    O.equals = function (X, W) {
        if (!X || !W) {
            return false
        }
        return O(X).toRgbString() == O(W).toRgbString()
    };
    O.random = function () {
        return O.fromRatio({
            r: j(),
            g: j(),
            b: j()
        })
    };

    function x(X, Y) {
        Y = (Y === 0) ? 0 : (Y || 10);
        var W = O(X).toHsl();
        W.s -= Y / 100;
        W.s = a(W.s);
        return O(W)
    }

    function H(X, Y) {
        Y = (Y === 0) ? 0 : (Y || 10);
        var W = O(X).toHsl();
        W.s += Y / 100;
        W.s = a(W.s);
        return O(W)
    }

    function e(W) {
        return O(W).desaturate(100)
    }

    function r(X, Y) {
        Y = (Y === 0) ? 0 : (Y || 10);
        var W = O(X).toHsl();
        W.l += Y / 100;
        W.l = a(W.l);
        return O(W)
    }

    function b(W, Y) {
        Y = (Y === 0) ? 0 : (Y || 10);
        var X = O(W).toRgb();
        X.r = v(0, T(255, X.r - B(255 * -(Y / 100))));
        X.g = v(0, T(255, X.g - B(255 * -(Y / 100))));
        X.b = v(0, T(255, X.b - B(255 * -(Y / 100))));
        return O(X)
    }

    function q(X, Y) {
        Y = (Y === 0) ? 0 : (Y || 10);
        var W = O(X).toHsl();
        W.l -= Y / 100;
        W.l = a(W.l);
        return O(W)
    }

    function M(Y, Z) {
        var X = O(Y).toHsl();
        var W = (X.h + Z) % 360;
        X.h = W < 0 ? 360 + W : W;
        return O(X)
    }

    function E(X) {
        var W = O(X).toHsl();
        W.h = (W.h + 180) % 360;
        return O(W)
    }

    function f(X) {
        var W = O(X).toHsl();
        var Y = W.h;
        return [O(X), O({
            h: (Y + 120) % 360,
            s: W.s,
            l: W.l
        }), O({
            h: (Y + 240) % 360,
            s: W.s,
            l: W.l
        })]
    }

    function S(X) {
        var W = O(X).toHsl();
        var Y = W.h;
        return [O(X), O({
            h: (Y + 90) % 360,
            s: W.s,
            l: W.l
        }), O({
            h: (Y + 180) % 360,
            s: W.s,
            l: W.l
        }), O({
            h: (Y + 270) % 360,
            s: W.s,
            l: W.l
        })]
    }

    function C(X) {
        var W = O(X).toHsl();
        var Y = W.h;
        return [O(X), O({
            h: (Y + 72) % 360,
            s: W.s,
            l: W.l
        }), O({
            h: (Y + 216) % 360,
            s: W.s,
            l: W.l
        })]
    }

    function z(X, aa, ab) {
        aa = aa || 6;
        ab = ab || 30;
        var W = O(X).toHsl();
        var Z = 360 / ab;
        var Y = [O(X)];
        for (W.h = ((W.h - (Z * aa >> 1)) + 720) % 360; --aa;) {
            W.h = (W.h + Z) % 360;
            Y.push(O(W))
        }
        return Y
    }

    function u(Y, ab) {
        ab = ab || 6;
        var aa = O(Y).toHsv();
        var ad = aa.h,
            ac = aa.s,
            X = aa.v;
        var Z = [];
        var W = 1 / ab;
        while (ab--) {
            Z.push(O({
                h: ad,
                s: ac,
                v: X
            }));
            X = (X + W) % 1
        }
        return Z
    }
    O.mix = function (X, W, Z) {
        Z = (Z === 0) ? 0 : (Z || 50);
        var ac = O(X).toRgb();
        var aa = O(W).toRgb();
        var ab = Z / 100;
        var Y = {
            r: ((aa.r - ac.r) * ab) + ac.r,
            g: ((aa.g - ac.g) * ab) + ac.g,
            b: ((aa.b - ac.b) * ab) + ac.b,
            a: ((aa.a - ac.a) * ab) + ac.a
        };
        return O(Y)
    };
    O.readability = function (X, W) {
        var Z = O(X);
        var Y = O(W);
        return (t.max(Z.getLuminance(), Y.getLuminance()) + 0.05) / (t.min(Z.getLuminance(), Y.getLuminance()) + 0.05)
    };
    O.isReadable = function (X, W, ab) {
        var aa = O.readability(X, W);
        var Z, Y;
        Y = false;
        Z = l(ab);
        switch (Z.level + Z.size) {
            case "AAsmall":
            case "AAAlarge":
                Y = aa >= 4.5;
                break;
            case "AAlarge":
                Y = aa >= 3;
                break;
            case "AAAsmall":
                Y = aa >= 7;
                break
        }
        return Y
    };
    O.mostReadable = function (ad, ac, ae) {
        var aa = null;
        var X = 0;
        var Y;
        var Z, W, af;
        ae = ae || {};
        Z = ae.includeFallbackColors;
        W = ae.level;
        af = ae.size;
        for (var ab = 0; ab < ac.length; ab++) {
            Y = O.readability(ad, ac[ab]);
            if (Y > X) {
                X = Y;
                aa = O(ac[ab])
            }
        }
        if (O.isReadable(ad, aa, {
                level: W,
                size: af
            }) || !Z) {
            return aa
        } else {
            ae.includeFallbackColors = false;
            return O.mostReadable(ad, ["#fff", "#000"], ae)
        }
    };
    var Q = O.names = {
        aliceblue: "f0f8ff",
        antiquewhite: "faebd7",
        aqua: "0ff",
        aquamarine: "7fffd4",
        azure: "f0ffff",
        beige: "f5f5dc",
        bisque: "ffe4c4",
        black: "000",
        blanchedalmond: "ffebcd",
        blue: "00f",
        blueviolet: "8a2be2",
        brown: "a52a2a",
        burlywood: "deb887",
        burntsienna: "ea7e5d",
        cadetblue: "5f9ea0",
        chartreuse: "7fff00",
        chocolate: "d2691e",
        coral: "ff7f50",
        cornflowerblue: "6495ed",
        cornsilk: "fff8dc",
        crimson: "dc143c",
        cyan: "0ff",
        darkblue: "00008b",
        darkcyan: "008b8b",
        darkgoldenrod: "b8860b",
        darkgray: "a9a9a9",
        darkgreen: "006400",
        darkgrey: "a9a9a9",
        darkkhaki: "bdb76b",
        darkmagenta: "8b008b",
        darkolivegreen: "556b2f",
        darkorange: "ff8c00",
        darkorchid: "9932cc",
        darkred: "8b0000",
        darksalmon: "e9967a",
        darkseagreen: "8fbc8f",
        darkslateblue: "483d8b",
        darkslategray: "2f4f4f",
        darkslategrey: "2f4f4f",
        darkturquoise: "00ced1",
        darkviolet: "9400d3",
        deeppink: "ff1493",
        deepskyblue: "00bfff",
        dimgray: "696969",
        dimgrey: "696969",
        dodgerblue: "1e90ff",
        firebrick: "b22222",
        floralwhite: "fffaf0",
        forestgreen: "228b22",
        fuchsia: "f0f",
        gainsboro: "dcdcdc",
        ghostwhite: "f8f8ff",
        gold: "ffd700",
        goldenrod: "daa520",
        gray: "808080",
        green: "008000",
        greenyellow: "adff2f",
        grey: "808080",
        honeydew: "f0fff0",
        hotpink: "ff69b4",
        indianred: "cd5c5c",
        indigo: "4b0082",
        ivory: "fffff0",
        khaki: "f0e68c",
        lavender: "e6e6fa",
        lavenderblush: "fff0f5",
        lawngreen: "7cfc00",
        lemonchiffon: "fffacd",
        lightblue: "add8e6",
        lightcoral: "f08080",
        lightcyan: "e0ffff",
        lightgoldenrodyellow: "fafad2",
        lightgray: "d3d3d3",
        lightgreen: "90ee90",
        lightgrey: "d3d3d3",
        lightpink: "ffb6c1",
        lightsalmon: "ffa07a",
        lightseagreen: "20b2aa",
        lightskyblue: "87cefa",
        lightslategray: "789",
        lightslategrey: "789",
        lightsteelblue: "b0c4de",
        lightyellow: "ffffe0",
        lime: "0f0",
        limegreen: "32cd32",
        linen: "faf0e6",
        magenta: "f0f",
        maroon: "800000",
        mediumaquamarine: "66cdaa",
        mediumblue: "0000cd",
        mediumorchid: "ba55d3",
        mediumpurple: "9370db",
        mediumseagreen: "3cb371",
        mediumslateblue: "7b68ee",
        mediumspringgreen: "00fa9a",
        mediumturquoise: "48d1cc",
        mediumvioletred: "c71585",
        midnightblue: "191970",
        mintcream: "f5fffa",
        mistyrose: "ffe4e1",
        moccasin: "ffe4b5",
        navajowhite: "ffdead",
        navy: "000080",
        oldlace: "fdf5e6",
        olive: "808000",
        olivedrab: "6b8e23",
        orange: "ffa500",
        orangered: "ff4500",
        orchid: "da70d6",
        palegoldenrod: "eee8aa",
        palegreen: "98fb98",
        paleturquoise: "afeeee",
        palevioletred: "db7093",
        papayawhip: "ffefd5",
        peachpuff: "ffdab9",
        peru: "cd853f",
        pink: "ffc0cb",
        plum: "dda0dd",
        powderblue: "b0e0e6",
        purple: "800080",
        rebeccapurple: "663399",
        red: "f00",
        rosybrown: "bc8f8f",
        royalblue: "4169e1",
        saddlebrown: "8b4513",
        salmon: "fa8072",
        sandybrown: "f4a460",
        seagreen: "2e8b57",
        seashell: "fff5ee",
        sienna: "a0522d",
        silver: "c0c0c0",
        skyblue: "87ceeb",
        slateblue: "6a5acd",
        slategray: "708090",
        slategrey: "708090",
        snow: "fffafa",
        springgreen: "00ff7f",
        steelblue: "4682b4",
        tan: "d2b48c",
        teal: "008080",
        thistle: "d8bfd8",
        tomato: "ff6347",
        turquoise: "40e0d0",
        violet: "ee82ee",
        wheat: "f5deb3",
        white: "fff",
        whitesmoke: "f5f5f5",
        yellow: "ff0",
        yellowgreen: "9acd32"
    };
    var V = O.hexNames = R(Q);

    function R(Y) {
        var X = {};
        for (var W in Y) {
            if (Y.hasOwnProperty(W)) {
                X[Y[W]] = W
            }
        }
        return X
    }

    function m(W) {
        W = parseFloat(W);
        if (isNaN(W) || W < 0 || W > 1) {
            W = 1
        }
        return W
    }

    function P(Y, W) {
        if (F(Y)) {
            Y = "100%"
        }
        var X = n(Y);
        Y = T(W, v(0, parseFloat(Y)));
        if (X) {
            Y = parseInt(Y * W, 10) / 100
        }
        if ((t.abs(Y - W) < 0.000001)) {
            return 1
        }
        return (Y % W) / parseFloat(W)
    }

    function a(W) {
        return T(1, v(0, W))
    }

    function c(W) {
        return parseInt(W, 16)
    }

    function F(W) {
        return typeof W == "string" && W.indexOf(".") != -1 && parseFloat(W) === 1
    }

    function n(W) {
        return typeof W === "string" && W.indexOf("%") != -1
    }

    function y(W) {
        return W.length == 1 ? "0" + W : "" + W
    }

    function p(W) {
        if (W <= 1) {
            W = (W * 100) + "%"
        }
        return W
    }

    function D(W) {
        return t.round(parseFloat(W) * 255).toString(16)
    }

    function i(W) {
        return (c(W) / 255)
    }
    var d = (function () {
        var aa = "[-\\+]?\\d+%?";
        var Z = "[-\\+]?\\d*\\.\\d+%?";
        var W = "(?:" + Z + ")|(?:" + aa + ")";
        var Y = "[\\s|\\(]+(" + W + ")[,|\\s]+(" + W + ")[,|\\s]+(" + W + ")\\s*\\)?";
        var X = "[\\s|\\(]+(" + W + ")[,|\\s]+(" + W + ")[,|\\s]+(" + W + ")[,|\\s]+(" + W + ")\\s*\\)?";
        return {
            CSS_UNIT: new RegExp(W),
            rgb: new RegExp("rgb" + Y),
            rgba: new RegExp("rgba" + X),
            hsl: new RegExp("hsl" + Y),
            hsla: new RegExp("hsla" + X),
            hsv: new RegExp("hsv" + Y),
            hsva: new RegExp("hsva" + X),
            hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
            hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
            hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
            hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
        }
    })();

    function N(W) {
        return !!d.CSS_UNIT.exec(W)
    }

    function w(X) {
        X = X.replace(G, "").replace(s, "").toLowerCase();
        var W = false;
        if (Q[X]) {
            X = Q[X];
            W = true
        } else {
            if (X == "transparent") {
                return {
                    r: 0,
                    g: 0,
                    b: 0,
                    a: 0,
                    format: "name"
                }
            }
        }
        var Y;
        if ((Y = d.rgb.exec(X))) {
            return {
                r: Y[1],
                g: Y[2],
                b: Y[3]
            }
        }
        if ((Y = d.rgba.exec(X))) {
            return {
                r: Y[1],
                g: Y[2],
                b: Y[3],
                a: Y[4]
            }
        }
        if ((Y = d.hsl.exec(X))) {
            return {
                h: Y[1],
                s: Y[2],
                l: Y[3]
            }
        }
        if ((Y = d.hsla.exec(X))) {
            return {
                h: Y[1],
                s: Y[2],
                l: Y[3],
                a: Y[4]
            }
        }
        if ((Y = d.hsv.exec(X))) {
            return {
                h: Y[1],
                s: Y[2],
                v: Y[3]
            }
        }
        if ((Y = d.hsva.exec(X))) {
            return {
                h: Y[1],
                s: Y[2],
                v: Y[3],
                a: Y[4]
            }
        }
        if ((Y = d.hex8.exec(X))) {
            return {
                r: c(Y[1]),
                g: c(Y[2]),
                b: c(Y[3]),
                a: i(Y[4]),
                format: W ? "name" : "hex8"
            }
        }
        if ((Y = d.hex6.exec(X))) {
            return {
                r: c(Y[1]),
                g: c(Y[2]),
                b: c(Y[3]),
                format: W ? "name" : "hex"
            }
        }
        if ((Y = d.hex4.exec(X))) {
            return {
                r: c(Y[1] + "" + Y[1]),
                g: c(Y[2] + "" + Y[2]),
                b: c(Y[3] + "" + Y[3]),
                a: i(Y[4] + "" + Y[4]),
                format: W ? "name" : "hex8"
            }
        }
        if ((Y = d.hex3.exec(X))) {
            return {
                r: c(Y[1] + "" + Y[1]),
                g: c(Y[2] + "" + Y[2]),
                b: c(Y[3] + "" + Y[3]),
                format: W ? "name" : "hex"
            }
        }
        return false
    }

    function l(X) {
        var Y, W;
        X = X || {
            level: "AA",
            size: "small"
        };
        Y = (X.level || "AA").toUpperCase();
        W = (X.size || "small").toLowerCase();
        if (Y !== "AA" && Y !== "AAA") {
            Y = "AA"
        }
        if (W !== "small" && W !== "large") {
            W = "small"
        }
        return {
            level: Y,
            size: W
        }
    }
    if (typeof module !== "undefined" && module.exports) {
        module.exports = O
    } else {
        if (typeof define === "function" && define.amd) {
            define(function () {
                return O
            })
        } else {
            window.tinycolor = O
        }
    }
})(Math);
(function (k, m) {
    var g = "3.7.3";
    var d = k.html5 || {};
    var h = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i;
    var c = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i;
    var r;
    var i = "_html5shiv";
    var a = 0;
    var o = {};
    var e;
    (function () {
        try {
            var u = m.createElement("a");
            u.innerHTML = "<xyz></xyz>";
            r = ("hidden" in u);
            e = u.childNodes.length == 1 || (function () {
                (m.createElement)("a");
                var w = m.createDocumentFragment();
                return (typeof w.cloneNode == "undefined" || typeof w.createDocumentFragment == "undefined" || typeof w.createElement == "undefined")
            }())
        } catch (v) {
            r = true;
            e = true
        }
    }());

    function f(u, w) {
        var x = u.createElement("p"),
            v = u.getElementsByTagName("head")[0] || u.documentElement;
        x.innerHTML = "x<style>" + w + "</style>";
        return v.insertBefore(x.lastChild, v.firstChild)
    }

    function l() {
        var u = j.elements;
        return typeof u == "string" ? u.split(" ") : u
    }

    function p(u, v) {
        var w = j.elements;
        if (typeof w != "string") {
            w = w.join(" ")
        }
        if (typeof u != "string") {
            u = u.join(" ")
        }
        j.elements = w + " " + u;
        b(v)
    }

    function q(u) {
        var v = o[u[i]];
        if (!v) {
            v = {};
            a++;
            u[i] = a;
            o[a] = v
        }
        return v
    }

    function n(x, u, w) {
        if (!u) {
            u = m
        }
        if (e) {
            return u.createElement(x)
        }
        if (!w) {
            w = q(u)
        }
        var v;
        if (w.cache[x]) {
            v = w.cache[x].cloneNode()
        } else {
            if (c.test(x)) {
                v = (w.cache[x] = w.createElem(x)).cloneNode()
            } else {
                v = w.createElem(x)
            }
        }
        return v.canHaveChildren && !h.test(x) && !v.tagUrn ? w.frag.appendChild(v) : v
    }

    function s(w, y) {
        if (!w) {
            w = m
        }
        if (e) {
            return w.createDocumentFragment()
        }
        y = y || q(w);
        var z = y.frag.cloneNode(),
            x = 0,
            v = l(),
            u = v.length;
        for (; x < u; x++) {
            z.createElement(v[x])
        }
        return z
    }

    function t(u, v) {
        if (!v.cache) {
            v.cache = {};
            v.createElem = u.createElement;
            v.createFrag = u.createDocumentFragment;
            v.frag = v.createFrag()
        }
        u.createElement = function (w) {
            if (!j.shivMethods) {
                return v.createElem(w)
            }
            return n(w, u, v)
        };
        u.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + l().join().replace(/[\w\-:]+/g, function (w) {
            v.createElem(w);
            v.frag.createElement(w);
            return 'c("' + w + '")'
        }) + ");return n}")(j, v.frag)
    }

    function b(u) {
        if (!u) {
            u = m
        }
        var v = q(u);
        if (j.shivCSS && !r && !v.hasCSS) {
            v.hasCSS = !!f(u, "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")
        }
        if (!e) {
            t(u, v)
        }
        return u
    }
    var j = {
        elements: d.elements || "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video",
        version: g,
        shivCSS: (d.shivCSS !== false),
        supportsUnknownElements: e,
        shivMethods: (d.shivMethods !== false),
        type: "default",
        shivDocument: b,
        createElement: n,
        createDocumentFragment: s,
        addElements: p
    };
    k.html5 = j;
    b(m);
    if (typeof module == "object" && module.exports) {
        module.exports = j
    }
}(typeof window !== "undefined" ? window : this, document));
(function (C) {
    C.fn.alphanum = function (P) {
        var O = H(P);
        var Q = this;
        z(Q, D, O);
        return this
    };
    C.fn.alpha = function (Q) {
        var P = H("alpha");
        var O = H(Q, P);
        var R = this;
        z(R, D, O);
        return this
    };
    C.fn.numeric = function (P) {
        var O = j(P);
        var Q = this;
        z(Q, G, O);
        Q.blur(function () {
            v(this, P)
        });
        return this
    };
    var n = {
        allow: "",
        disallow: "",
        allowSpace: true,
        allowNumeric: true,
        allowUpper: true,
        allowLower: true,
        allowCaseless: true,
        allowLatin: true,
        allowOtherCharSets: true,
        forceUpper: false,
        forceLower: false,
        maxLength: NaN
    };
    var A = {
        allowPlus: false,
        allowMinus: true,
        allowThouSep: true,
        allowDecSep: true,
        allowLeadingSpaces: false,
        maxDigits: NaN,
        maxDecimalPlaces: NaN,
        maxPreDecimalPlaces: NaN,
        max: NaN,
        min: NaN
    };
    var N = {
        alpha: {
            allowNumeric: false
        },
        upper: {
            allowNumeric: false,
            allowUpper: true,
            allowLower: false,
            allowCaseless: true
        },
        lower: {
            allowNumeric: false,
            allowUpper: false,
            allowLower: true,
            allowCaseless: true
        }
    };
    var d = {
        integer: {
            allowPlus: false,
            allowMinus: true,
            allowThouSep: false,
            allowDecSep: false
        },
        positiveInteger: {
            allowPlus: false,
            allowMinus: false,
            allowThouSep: false,
            allowDecSep: false
        }
    };
    var a = E() + e();
    var m = ",";
    var x = ".";
    var y = b();
    var w = L();

    function E() {
        var O = "!@#$%^&*()+=[]\\';,/{}|\":<>?~`.-_";
        O += " ";
        return O
    }

    function e() {
        var O = "\xAC\u20AC\xA3\xA6";
        return O
    }

    function z(Q, O, P) {
        Q.each(function () {
            var R = C(this);
            R.bind("keyup change paste", function (T) {
                var S = "";
                if (T.originalEvent && T.originalEvent.clipboardData && T.originalEvent.clipboardData.getData) {
                    S = T.originalEvent.clipboardData.getData("text/plain")
                }
                setTimeout(function () {
                    I(R, O, P, S)
                }, 0)
            });
            R.bind("keypress", function (W) {
                var aa = !W.charCode ? W.which : W.charCode;
                if (F(aa) || W.ctrlKey || W.metaKey) {
                    return
                }
                var Y = String.fromCharCode(aa);
                var X = R.selection();
                var S = X.start;
                var V = X.end;
                var Z = R.val();
                var U = Z.substring(0, S) + Y + Z.substring(V);
                var T = O(U, P);
                if (T != U) {
                    W.preventDefault()
                }
            })
        })
    }

    function v(O, Q) {
        var P = parseFloat(C(O).val());
        var R = C(O);
        if (isNaN(P)) {
            R.val("");
            return
        }
        if (r(Q.min) && P < Q.min) {
            R.val("")
        }
        if (r(Q.max) && P > Q.max) {
            R.val("")
        }
    }

    function r(O) {
        return !isNaN(O)
    }

    function F(O) {
        if (O >= 32) {
            return false
        }
        if (O == 10) {
            return false
        }
        if (O == 13) {
            return false
        }
        return true
    }

    function I(T, O, S, P) {
        var U = T.val();
        if (U == "" && P.length > 0) {
            U = P
        }
        var R = O(U, S);
        if (U == R) {
            return
        }
        var Q = T.alphanum_caret();
        T.val(R);
        if (U.length == (R.length + 1)) {
            T.alphanum_caret(Q - 1)
        } else {
            T.alphanum_caret(Q)
        }
    }

    function H(Q, P) {
        if (typeof P == "undefined") {
            P = n
        }
        var R, O = {};
        if (typeof Q === "string") {
            R = N[Q]
        } else {
            if (typeof Q == "undefined") {
                R = {}
            } else {
                R = Q
            }
        }
        C.extend(O, P, R);
        if (typeof O.blacklist == "undefined") {
            O.blacklistSet = g(O.allow, O.disallow)
        }
        return O
    }

    function j(P) {
        var Q, O = {};
        if (typeof P === "string") {
            Q = d[P]
        } else {
            if (typeof P == "undefined") {
                Q = {}
            } else {
                Q = P
            }
        }
        C.extend(O, A, Q);
        return O
    }

    function t(Q, O, P) {
        if (P.maxLength && Q.length >= P.maxLength) {
            return false
        }
        if (P.allow.indexOf(O) >= 0) {
            return true
        }
        if (P.allowSpace && (O == " ")) {
            return true
        }
        if (P.blacklistSet.contains(O)) {
            return false
        }
        if (!P.allowNumeric && y[O]) {
            return false
        }
        if (!P.allowUpper && f(O)) {
            return false
        }
        if (!P.allowLower && s(O)) {
            return false
        }
        if (!P.allowCaseless && K(O)) {
            return false
        }
        if (!P.allowLatin && w.contains(O)) {
            return false
        }
        if (!P.allowOtherCharSets) {
            if (y[O] || w.contains(O)) {
                return true
            } else {
                return false
            }
        }
        return true
    }

    function k(Q, O, P) {
        if (y[O]) {
            if (l(Q, P)) {
                return false
            }
            if (q(Q, P)) {
                return false
            }
            if (B(Q, P)) {
                return false
            }
            if (p(Q + O, P)) {
                return false
            }
            if (J(Q + O, P)) {
                return false
            }
            return true
        }
        if (P.allowPlus && O == "+" && Q == "") {
            return true
        }
        if (P.allowMinus && O == "-" && Q == "") {
            return true
        }
        if (O == m && P.allowThouSep && i(Q, O)) {
            return true
        }
        if (O == x) {
            if (Q.indexOf(x) >= 0) {
                return false
            }
            if (P.allowDecSep) {
                return true
            }
        }
        return false
    }

    function u(O) {
        O = O + "";
        return O.replace(/[^0-9]/g, "").length
    }

    function l(P, Q) {
        var O = Q.maxDigits;
        if (O == "" || isNaN(O)) {
            return false
        }
        var R = u(P);
        if (R >= O) {
            return true
        }
        return false
    }

    function B(R, T) {
        var S = T.maxDecimalPlaces;
        if (S == "" || isNaN(S)) {
            return false
        }
        var P = R.indexOf(x);
        if (P == -1) {
            return false
        }
        var O = R.substring(P);
        var Q = u(O);
        if (Q >= S) {
            return true
        }
        return false
    }

    function q(R, S) {
        var Q = S.maxPreDecimalPlaces;
        if (Q == "" || isNaN(Q)) {
            return false
        }
        var O = R.indexOf(x);
        if (O >= 0) {
            return false
        }
        var P = u(R);
        if (P >= Q) {
            return true
        }
        return false
    }

    function p(O, P) {
        if (!P.max || P.max < 0) {
            return false
        }
        var Q = parseFloat(O);
        if (Q > P.max) {
            return true
        }
        return false
    }

    function J(O, P) {
        if (!P.min || P.min > 0) {
            return false
        }
        var Q = parseFloat(O);
        if (Q < P.min) {
            return true
        }
        return false
    }

    function D(V, T) {
        if (typeof V != "string") {
            return V
        }
        var Q = V.split("");
        var P = [];
        var R = 0;
        var O;
        for (R = 0; R < Q.length; R++) {
            O = Q[R];
            var U = P.join("");
            if (t(U, O, T)) {
                P.push(O)
            }
        }
        var S = P.join("");
        if (T.forceLower) {
            S = S.toLowerCase()
        } else {
            if (T.forceUpper) {
                S = S.toUpperCase()
            }
        }
        return S
    }

    function G(U, S) {
        if (typeof U != "string") {
            return U
        }
        var Q = U.split("");
        var P = [];
        var R = 0;
        var O;
        for (R = 0; R < Q.length; R++) {
            O = Q[R];
            var T = P.join("");
            if (k(T, O, S)) {
                P.push(O)
            }
        }
        return P.join("")
    }

    function M(S) {
        var R = S.split("");
        var Q = 0;
        var P = [];
        var O;
        for (Q = 0; Q < R.length; Q++) {
            O = R[Q]
        }
    }

    function c(O) {}

    function f(O) {
        var Q = O.toUpperCase();
        var P = O.toLowerCase();
        if ((O == Q) && (Q != P)) {
            return true
        } else {
            return false
        }
    }

    function s(O) {
        var Q = O.toUpperCase();
        var P = O.toLowerCase();
        if ((O == P) && (Q != P)) {
            return true
        } else {
            return false
        }
    }

    function K(O) {
        if (O.toUpperCase() == O.toLowerCase()) {
            return true
        } else {
            return false
        }
    }

    function g(P, S) {
        var Q = new h(a + S);
        var O = new h(P);
        var R = Q.subtract(O);
        return R
    }

    function b() {
        var R = "0123456789".split("");
        var P = {};
        var O = 0;
        var Q;
        for (O = 0; O < R.length; O++) {
            Q = R[O];
            P[Q] = true
        }
        return P
    }

    function L() {
        var O = "abcdefghijklmnopqrstuvwxyz";
        var P = O.toUpperCase();
        var Q = new h(O + P);
        return Q
    }

    function i(R, O) {
        if (R.length == 0) {
            return false
        }
        var T = R.indexOf(x);
        if (T >= 0) {
            return false
        }
        var U = R.indexOf(m);
        if (U < 0) {
            return true
        }
        var Q = R.lastIndexOf(m);
        var P = R.length - Q - 1;
        if (P < 3) {
            return false
        }
        var S = u(R.substring(U));
        if ((S % 3) > 0) {
            return false
        }
        return true
    }

    function h(O) {
        if (typeof O == "string") {
            this.map = o(O)
        } else {
            this.map = {}
        }
    }
    h.prototype.add = function (Q) {
        var P = this.clone();
        for (var O in Q.map) {
            P.map[O] = true
        }
        return P
    };
    h.prototype.subtract = function (Q) {
        var P = this.clone();
        for (var O in Q.map) {
            delete P.map[O]
        }
        return P
    };
    h.prototype.contains = function (O) {
        if (this.map[O]) {
            return true
        } else {
            return false
        }
    };
    h.prototype.clone = function () {
        var P = new h();
        for (var O in this.map) {
            P.map[O] = true
        }
        return P
    };

    function o(P) {
        var R = {};
        var S = P.split("");
        var Q = 0;
        var O;
        for (Q = 0; Q < S.length; Q++) {
            O = S[Q];
            R[O] = true
        }
        return R
    }
    C.fn.alphanum.backdoorAlphaNum = function (Q, P) {
        var O = H(P);
        return D(Q, O)
    };
    C.fn.alphanum.backdoorNumeric = function (Q, P) {
        var O = j(P);
        return G(Q, O)
    };
    C.fn.alphanum.setNumericSeparators = function (O) {
        if (O.thousandsSeparator.length != 1) {
            return
        }
        if (O.decimalSeparator.length != 1) {
            return
        }
        m = O.thousandsSeparator;
        x = O.decimalSeparator
    }
})(jQuery);
(function (c) {
    function b(f, e) {
        if (f.createTextRange) {
            var d = f.createTextRange();
            d.move("character", e);
            d.select()
        } else {
            if (f.selectionStart != null) {
                f.focus();
                f.setSelectionRange(e, e)
            }
        }
    }

    function a(f) {
        if ("selection" in document) {
            var d = f.createTextRange();
            try {
                d.setEndPoint("EndToStart", document.selection.createRange())
            } catch (g) {
                return 0
            }
            return d.text.length
        } else {
            if (f.selectionStart != null) {
                return f.selectionStart
            }
        }
    }
    c.fn.alphanum_caret = function (d, e) {
        if (typeof (d) === "undefined") {
            return a(this.get(0))
        }
        return this.queue(function (g) {
            if (isNaN(d)) {
                var f = c(this).val().indexOf(d);
                if (e === true) {
                    f += d.length
                } else {
                    if (typeof (e) !== "undefined") {
                        f += e
                    }
                }
                b(this, f)
            } else {
                b(this, d)
            }
            g()
        })
    }
}(jQuery));
(function (g) {
    var k = function (a) {
            return a.replace(/([a-z])([a-z]+)/gi, function (m, i, o) {
                return i + o.toLowerCase()
            }).replace(/_/g, "")
        },
        d = function (a) {
            return a.replace(/^([a-z]+)_TO_([a-z]+)/i, function (m, i, o) {
                return o + "_TO_" + i
            })
        },
        b = function (a) {
            return a ? a.ownerDocument.defaultView || a.ownerDocument.parentWindow : window
        },
        f = function (e, o) {
            var m = g.Range.current(e).clone(),
                a = g.Range(e).select(e);
            if (!m.overlaps(a)) {
                return null
            }
            if (m.compare("START_TO_START", a) < 1) {
                startPos = 0;
                m.move("START_TO_START", a)
            } else {
                fromElementToCurrent = a.clone();
                fromElementToCurrent.move("END_TO_START", m);
                startPos = fromElementToCurrent.toString().length
            }
            if (m.compare("END_TO_END", a) >= 0) {
                endPos = a.toString().length
            } else {
                endPos = startPos + m.toString().length
            }
            return {
                start: startPos,
                end: endPos
            }
        },
        l = function (x) {
            var i = b(x);
            if (x.selectionStart !== undefined) {
                if (document.activeElement && document.activeElement != x && x.selectionStart == x.selectionEnd && x.selectionStart == 0) {
                    return {
                        start: x.value.length,
                        end: x.value.length
                    }
                }
                return {
                    start: x.selectionStart,
                    end: x.selectionEnd
                }
            } else {
                if (i.getSelection) {
                    return f(x, i)
                } else {
                    try {
                        if (x.nodeName.toLowerCase() == "input") {
                            var y = b(x).document.selection.createRange(),
                                e = x.createTextRange();
                            e.setEndPoint("EndToStart", y);
                            var w = e.text.length;
                            return {
                                start: w,
                                end: w + y.text.length
                            }
                        } else {
                            var v = f(x, i);
                            if (!v) {
                                return v
                            }
                            var q = g.Range.current().clone(),
                                m = q.clone().collapse().range,
                                r = q.clone().collapse(false).range;
                            m.moveStart("character", -1);
                            r.moveStart("character", -1);
                            if (v.startPos != 0 && m.text == "") {
                                v.startPos += 2
                            }
                            if (v.endPos != 0 && r.text == "") {
                                v.endPos += 2
                            }
                            return v
                        }
                    } catch (p) {
                        return {
                            start: x.value.length,
                            end: x.value.length
                        }
                    }
                }
            }
        },
        c = function (v, x, m) {
            var q = b(v);
            if (v.setSelectionRange) {
                if (m === undefined) {
                    v.focus();
                    v.setSelectionRange(x, x)
                } else {
                    v.select();
                    v.selectionStart = x;
                    v.selectionEnd = m
                }
            } else {
                if (v.createTextRange) {
                    var y = v.createTextRange();
                    y.moveStart("character", x);
                    m = m || x;
                    y.moveEnd("character", m - v.value.length);
                    y.select()
                } else {
                    if (q.getSelection) {
                        var a = q.document,
                            w = q.getSelection(),
                            r = a.createRange(),
                            p = [x, m !== undefined ? m : x];
                        h([v], p);
                        r.setStart(p[0].el, p[0].count);
                        r.setEnd(p[1].el, p[1].count);
                        w.removeAllRanges();
                        w.addRange(r)
                    } else {
                        if (q.document.body.createTextRange) {
                            var r = document.body.createTextRange();
                            r.moveToElementText(v);
                            r.collapse();
                            r.moveStart("character", x);
                            r.moveEnd("character", m !== undefined ? m : x);
                            r.select()
                        }
                    }
                }
            }
        },
        j = function (m, a, o, i) {
            if (typeof o[0] === "number" && o[0] < a) {
                o[0] = {
                    el: i,
                    count: o[0] - m
                }
            }
            if (typeof o[1] === "number" && o[1] <= a) {
                o[1] = {
                    el: i,
                    count: o[1] - m
                }
            }
        },
        h = function (q, m, u) {
            var p, a;
            u = u || 0;
            for (var o = 0; q[o]; o++) {
                p = q[o];
                if (p.nodeType === 3 || p.nodeType === 4) {
                    a = u;
                    u += p.nodeValue.length;
                    j(a, u, m, p)
                } else {
                    if (p.nodeType !== 8) {
                        u = h(p.childNodes, m, u)
                    }
                }
            }
            return u
        };
    jQuery.fn.selection = function (i, a) {
        if (i !== undefined) {
            return this.each(function () {
                c(this, i, a)
            })
        } else {
            return l(this[0])
        }
    };
    g.fn.selection.getCharElement = h
})(jQuery);
/*
 * jQuery BBQ: Back Button & Query Library - v1.2.1 - 2/17/2010
 * http://benalman.com/projects/jquery-bbq-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function ($, p) {
    var i, m = Array.prototype.slice,
        r = decodeURIComponent,
        a = $.param,
        c, l, v, b = $.bbq = $.bbq || {},
        q, u, j, e = $.event.special,
        d = "hashchange",
        A = "querystring",
        D = "fragment",
        y = "elemUrlAttr",
        g = "location",
        k = "href",
        t = "src",
        x = /^.*\?|#.*$/g,
        w = /^.*\#/,
        h, C = {};

    function E(F) {
        return typeof F === "string"
    }

    function B(G) {
        var F = m.call(arguments, 1);
        return function () {
            return G.apply(this, F.concat(m.call(arguments)))
        }
    }

    function n(F) {
        return F.replace(/^[^#]*#?(.*)$/, "$1")
    }

    function o(F) {
        return F.replace(/(?:^[^?#]*\?([^#]*).*$)?.*/, "$1")
    }

    function f(H, M, F, I, G) {
        var O, L, K, N, J;
        if (I !== i) {
            K = F.match(H ? /^([^#]*)\#?(.*)$/ : /^([^#?]*)\??([^#]*)(#?.*)/);
            J = K[3] || "";
            if (G === 2 && E(I)) {
                L = I.replace(H ? w : x, "")
            } else {
                N = l(K[2]);
                I = E(I) ? l[H ? D : A](I) : I;
                L = G === 2 ? I : G === 1 ? $.extend({}, I, N) : $.extend({}, N, I);
                L = a(L);
                if (H) {
                    L = L.replace(h, r)
                }
            }
            O = K[1] + (H ? "#" : L || !K[1] ? "?" : "") + L + J
        } else {
            O = M(F !== i ? F : p[g][k])
        }
        return O
    }
    a[A] = B(f, 0, o);
    a[D] = c = B(f, 1, n);
    c.noEscape = function (G) {
        G = G || "";
        var F = $.map(G.split(""), encodeURIComponent);
        h = new RegExp(F.join("|"), "g")
    };
    c.noEscape(",/");
    $.deparam = l = function (I, F) {
        var H = {},
            G = {
                "true": !0,
                "false": !1,
                "null": null
            };
        $.each(I.replace(/\+/g, " ").split("&"), function (L, Q) {
            var K = Q.split("="),
                P = r(K[0]),
                J, O = H,
                M = 0,
                R = P.split("]["),
                N = R.length - 1;
            if (/\[/.test(R[0]) && /\]$/.test(R[N])) {
                R[N] = R[N].replace(/\]$/, "");
                R = R.shift().split("[").concat(R);
                N = R.length - 1
            } else {
                N = 0
            }
            if (K.length === 2) {
                J = r(K[1]);
                if (F) {
                    J = J && !isNaN(J) ? +J : J === "undefined" ? i : G[J] !== i ? G[J] : J
                }
                if (N) {
                    for (; M <= N; M++) {
                        P = R[M] === "" ? O.length : R[M];
                        O = O[P] = M < N ? O[P] || (R[M + 1] && isNaN(R[M + 1]) ? {} : []) : J
                    }
                } else {
                    if ($.isArray(H[P])) {
                        H[P].push(J)
                    } else {
                        if (H[P] !== i) {
                            H[P] = [H[P], J]
                        } else {
                            H[P] = J
                        }
                    }
                }
            } else {
                if (P) {
                    H[P] = F ? i : ""
                }
            }
        });
        return H
    };

    function z(H, F, G) {
        if (F === i || typeof F === "boolean") {
            G = F;
            F = a[H ? D : A]()
        } else {
            F = E(F) ? F.replace(H ? w : x, "") : F
        }
        return l(F, G)
    }
    l[A] = B(z, 0);
    l[D] = v = B(z, 1);
    $[y] || ($[y] = function (F) {
        return $.extend(C, F)
    })({
        a: k,
        base: k,
        iframe: t,
        img: t,
        input: t,
        form: "action",
        link: k,
        script: t
    });
    j = $[y];

    function s(I, G, H, F) {
        if (!E(H) && typeof H !== "object") {
            F = H;
            H = G;
            G = i
        }
        return this.each(function () {
            var L = $(this),
                J = G || j()[(this.nodeName || "").toLowerCase()] || "",
                K = J && L.attr(J) || "";
            L.attr(J, a[I](K, H, F))
        })
    }
    $.fn[A] = B(s, A);
    $.fn[D] = B(s, D);
    b.pushState = q = function (I, F) {
        if (E(I) && /^#/.test(I) && F === i) {
            F = 2
        }
        var H = I !== i,
            G = c(p[g][k], H ? I : {}, H ? F : 2);
        p[g][k] = G + (/#/.test(G) ? "" : "#")
    };
    b.getState = u = function (F, G) {
        return F === i || typeof F === "boolean" ? v(F) : v(G)[F]
    };
    b.removeState = function (F) {
        var G = {};
        if (F !== i) {
            G = u();
            $.each($.isArray(F) ? F : arguments, function (I, H) {
                delete G[H]
            })
        }
        q(G, 2)
    };
    e[d] = $.extend(e[d], {
        add: function (F) {
            var H;

            function G(J) {
                var I = J[D] = c();
                J.getState = function (K, L) {
                    return K === i || typeof K === "boolean" ? l(I, K) : l(I, L)[K]
                };
                H.apply(this, arguments)
            }
            if ($.isFunction(F)) {
                H = F;
                return G
            } else {
                H = F.handler;
                F.handler = G
            }
        }
    })
})(jQuery, this);
/*
 * jQuery hashchange event - v1.2 - 2/11/2010
 * http://benalman.com/projects/jquery-hashchange-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function ($, i, b) {
    var j, k = $.event.special,
        c = "location",
        d = "hashchange",
        l = "href",
        g = document.documentMode,
        h = document.all && (g === b || g < 8),
        e = "on" + d in i && !h;

    function a(m) {
        m = m || i[c][l];
        return m.replace(/^[^#]*#?(.*)$/, "$1")
    }
    $[d + "Delay"] = 100;
    k[d] = $.extend(k[d], {
        setup: function () {
            if (e) {
                return false
            }
            $(j.start)
        },
        teardown: function () {
            if (e) {
                return false
            }
            $(j.stop)
        }
    });
    j = (function () {
        var m = {},
            r, n, o, q;

        function p() {
            o = q = function (s) {
                return s
            };
            if (h) {
                n = $('<iframe src="javascript:0"/>').hide().insertAfter("body")[0].contentWindow;
                q = function () {
                    return a(n.document[c][l])
                };
                o = function (u, s) {
                    if (u !== s) {
                        var t = n.document;
                        t.open().close();
                        t[c].hash = "#" + u
                    }
                };
                o(a())
            }
        }
        m.start = function () {
            if (r) {
                return
            }
            var t = a();
            o || p();
            (function s() {
                var v = a(),
                    u = q(t);
                if (v !== t) {
                    o(t = v, u);
                    $(i).trigger(d)
                } else {
                    if (u !== t) {
                        i[c][l] = i[c][l].replace(/#.*/, "") + "#" + u
                    }
                }
                r = setTimeout(s, $[d + "Delay"])
            })()
        };
        m.stop = function () {
            if (!n) {
                r && clearTimeout(r);
                r = 0
            }
        };
        return m
    })()
})(jQuery, this);
(function (a) {
    a.fn.getHiddenDimensions = function (e) {
        var d = this,
            f = {
                position: "absolute",
                visibility: "hidden",
                display: "block"
            },
            g = {
                width: 0,
                height: 0,
                innerWidth: 0,
                innerHeight: 0,
                outerWidth: 0,
                outerHeight: 0
            },
            c = d.parents().andSelf().not(":visible").not("a"),
            e = (e == null) ? false : e;
        var b = [];
        c.each(function () {
            var h = {};
            for (var i in f) {
                h[i] = this.style[i];
                this.style[i] = f[i]
            }
            b.push(h)
        });
        g.width = d.width();
        g.outerWidth = d.outerWidth(e);
        g.innerWidth = d.innerWidth();
        g.height = d.height();
        g.innerHeight = d.innerHeight();
        g.outerHeight = d.outerHeight(e);
        c.each(function (k) {
            var h = b[k];
            for (var j in f) {
                this.style[j] = h[j]
            }
        });
        return g
    }
}(jQuery));
(function (a, c, b) {
    if (typeof define === "function" && define.amd) {
        define(["jquery"], a)
    } else {
        if (typeof exports === "object") {
            module.exports = a(require("jquery"))
        } else {
            a(c || b)
        }
    }
}(function (d) {
    var f = function (k, h, j) {
        var m = {
            invalid: [],
            getCaret: function () {
                try {
                    var p, s = 0,
                        o = k.get(0),
                        n = document.selection,
                        r = o.selectionStart;
                    if (n && navigator.appVersion.indexOf("MSIE 10") === -1) {
                        p = n.createRange();
                        p.moveStart("character", -m.val().length);
                        s = p.text.length
                    } else {
                        if (r || r === "0") {
                            s = r
                        }
                    }
                    return s
                } catch (q) {}
            },
            setCaret: function (q) {
                try {
                    if (k.is(":focus")) {
                        var n, o = k.get(0);
                        if (o.setSelectionRange) {
                            o.setSelectionRange(q, q)
                        } else {
                            n = o.createTextRange();
                            n.collapse(true);
                            n.moveEnd("character", q);
                            n.moveStart("character", q);
                            n.select()
                        }
                    }
                } catch (p) {}
            },
            events: function () {
                k.on("keydown.mask", function (n) {
                    k.data("mask-keycode", n.keyCode || n.which);
                    k.data("mask-previus-value", k.val());
                    k.data("mask-previus-caret-pos", m.getCaret());
                    m.maskDigitPosMapOld = m.maskDigitPosMap
                }).on(d.jMaskGlobals.useInput ? "input.mask" : "keyup.mask", m.behaviour).on("paste.mask drop.mask", function () {
                    setTimeout(function () {
                        k.keydown().keyup()
                    }, 100)
                }).on("change.mask", function () {
                    k.data("changed", true)
                }).on("blur.mask", function () {
                    if (i !== m.val() && !k.data("changed")) {
                        k.trigger("change")
                    }
                    k.data("changed", false)
                }).on("blur.mask", function () {
                    i = m.val()
                }).on("focus.mask", function (n) {
                    if (j.selectOnFocus === true) {
                        d(n.target).select()
                    }
                }).on("focusout.mask", function () {
                    if (j.clearIfNotMatch && !g.test(m.val())) {
                        m.val("")
                    }
                })
            },
            getRegexMask: function () {
                var p = [],
                    v, u, o, n, t, s;
                for (var q = 0; q < h.length; q++) {
                    v = l.translation[h.charAt(q)];
                    if (v) {
                        u = v.pattern.toString().replace(/.{1}$|^.{1}/g, "");
                        o = v.optional;
                        n = v.recursive;
                        if (n) {
                            p.push(h.charAt(q));
                            t = {
                                digit: h.charAt(q),
                                pattern: u
                            }
                        } else {
                            p.push(!o && !n ? u : (u + "?"))
                        }
                    } else {
                        p.push(h.charAt(q).replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"))
                    }
                }
                s = p.join("");
                if (t) {
                    s = s.replace(new RegExp("(" + t.digit + "(.*" + t.digit + ")?)"), "($1)?").replace(new RegExp(t.digit, "g"), t.pattern)
                }
                return new RegExp(s)
            },
            destroyEvents: function () {
                k.off(["input", "keydown", "keyup", "paste", "drop", "blur", "focusout", ""].join(".mask "))
            },
            val: function (n) {
                var o = k.is("input"),
                    q = o ? "val" : "text",
                    p;
                if (arguments.length > 0) {
                    if (k[q]() !== n) {
                        k[q](n)
                    }
                    p = k
                } else {
                    p = k[q]()
                }
                return p
            },
            calculateCaretPosition: function () {
                var x = k.data("mask-previus-value") || "",
                    p = m.getMasked(),
                    v = m.getCaret();
                if (x !== p) {
                    var q = k.data("mask-previus-caret-pos") || 0,
                        y = p.length,
                        u = x.length,
                        t = 0,
                        o = 0,
                        n = 0,
                        w = 0,
                        s = 0;
                    for (s = v; s < y; s++) {
                        if (!m.maskDigitPosMap[s]) {
                            break
                        }
                        o++
                    }
                    for (s = v - 1; s >= 0; s--) {
                        if (!m.maskDigitPosMap[s]) {
                            break
                        }
                        t++
                    }
                    for (s = v - 1; s >= 0; s--) {
                        if (m.maskDigitPosMap[s]) {
                            n++
                        }
                    }
                    for (s = q - 1; s >= 0; s--) {
                        if (m.maskDigitPosMapOld[s]) {
                            w++
                        }
                    }
                    if (v > u) {
                        v = y * 10
                    } else {
                        if (q >= v && q !== u) {
                            if (!m.maskDigitPosMapOld[v]) {
                                var r = v;
                                v -= w - n;
                                v -= t;
                                if (m.maskDigitPosMap[v]) {
                                    v = r
                                }
                            }
                        } else {
                            if (v > q) {
                                v += n - w;
                                v += o
                            }
                        }
                    }
                }
                return v
            },
            behaviour: function (q) {
                q = q || window.event;
                m.invalid = [];
                var p = k.data("mask-keycode");
                if (d.inArray(p, l.byPassKeys) === -1) {
                    var o = m.getMasked(),
                        n = m.getCaret();
                    setTimeout(function () {
                        m.setCaret(m.calculateCaretPosition())
                    }, d.jMaskGlobals.keyStrokeCompensation);
                    m.val(o);
                    m.setCaret(n);
                    return m.callbacks(q)
                }
            },
            getMasked: function (E, I) {
                var G = [],
                    z = I === undefined ? m.val() : I + "",
                    A = 0,
                    p = h.length,
                    u = 0,
                    x = z.length,
                    q = 1,
                    C = "push",
                    D = -1,
                    w = 0,
                    r = [],
                    n, H;
                if (j.reverse) {
                    C = "unshift";
                    q = -1;
                    n = 0;
                    A = p - 1;
                    u = x - 1;
                    H = function () {
                        return A > -1 && u > -1
                    }
                } else {
                    n = p - 1;
                    H = function () {
                        return A < p && u < x
                    }
                }
                var o;
                while (H()) {
                    var t = h.charAt(A),
                        B = z.charAt(u),
                        s = l.translation[t];
                    if (s) {
                        if (B.match(s.pattern)) {
                            G[C](B);
                            if (s.recursive) {
                                if (D === -1) {
                                    D = A
                                } else {
                                    if (A === n && A !== D) {
                                        A = D - q
                                    }
                                }
                                if (n === D) {
                                    A -= q
                                }
                            }
                            A += q
                        } else {
                            if (B === o) {
                                w--;
                                o = undefined
                            } else {
                                if (s.optional) {
                                    A += q;
                                    u -= q
                                } else {
                                    if (s.fallback) {
                                        G[C](s.fallback);
                                        A += q;
                                        u -= q
                                    } else {
                                        m.invalid.push({
                                            p: u,
                                            v: B,
                                            e: s.pattern
                                        })
                                    }
                                }
                            }
                        }
                        u += q
                    } else {
                        if (!E) {
                            G[C](t)
                        }
                        if (B === t) {
                            r.push(u);
                            u += q
                        } else {
                            o = t;
                            r.push(u + w);
                            w++
                        }
                        A += q
                    }
                }
                var y = h.charAt(n);
                if (p === x + 1 && !l.translation[y]) {
                    G.push(y)
                }
                var F = G.join("");
                m.mapMaskdigitPositions(F, r, x);
                return F
            },
            mapMaskdigitPositions: function (n, p, q) {
                var r = j.reverse ? n.length - q : 0;
                m.maskDigitPosMap = {};
                for (var o = 0; o < p.length; o++) {
                    m.maskDigitPosMap[p[o] + r] = 1
                }
            },
            callbacks: function (o) {
                var q = m.val(),
                    p = q !== i,
                    n = [q, o, k, j],
                    r = function (t, u, s) {
                        if (typeof j[t] === "function" && u) {
                            j[t].apply(this, s)
                        }
                    };
                r("onChange", p === true, n);
                r("onKeyPress", p === true, n);
                r("onComplete", q.length === h.length, n);
                r("onInvalid", m.invalid.length > 0, [q, o, k, m.invalid, j])
            }
        };
        k = d(k);
        var l = this,
            i = m.val(),
            g;
        h = typeof h === "function" ? h(m.val(), undefined, k, j) : h;
        l.mask = h;
        l.options = j;
        l.remove = function () {
            var n = m.getCaret();
            if (l.options.placeholder) {
                k.removeAttr("placeholder")
            }
            if (k.data("mask-maxlength")) {
                k.removeAttr("maxlength")
            }
            m.destroyEvents();
            m.val(l.getCleanVal());
            m.setCaret(n);
            return k
        };
        l.getCleanVal = function () {
            return m.getMasked(true)
        };
        l.getMaskedVal = function (n) {
            return m.getMasked(false, n)
        };
        l.init = function (p) {
            p = p || false;
            j = j || {};
            l.clearIfNotMatch = d.jMaskGlobals.clearIfNotMatch;
            l.byPassKeys = d.jMaskGlobals.byPassKeys;
            l.translation = d.extend({}, d.jMaskGlobals.translation, j.translation);
            l = d.extend(true, {}, l, j);
            g = m.getRegexMask();
            if (p) {
                m.events();
                m.val(m.getMasked())
            } else {
                if (j.placeholder) {
                    k.attr("placeholder", j.placeholder)
                }
                if (k.data("mask")) {
                    k.attr("autocomplete", "off")
                }
                for (var o = 0, n = true; o < h.length; o++) {
                    var r = l.translation[h.charAt(o)];
                    if (r && r.recursive) {
                        n = false;
                        break
                    }
                }
                if (n) {
                    k.attr("maxlength", h.length).data("mask-maxlength", true)
                }
                m.destroyEvents();
                m.events();
                var q = m.getCaret();
                m.val(m.getMasked());
                m.setCaret(q)
            }
        };
        l.init(!k.is("input"))
    };
    d.maskWatchers = {};
    var e = function () {
            var h = d(this),
                i = {},
                j = "data-mask-",
                g = h.attr("data-mask");
            if (h.attr(j + "reverse")) {
                i.reverse = true
            }
            if (h.attr(j + "clearifnotmatch")) {
                i.clearIfNotMatch = true
            }
            if (h.attr(j + "selectonfocus") === "true") {
                i.selectOnFocus = true
            }
            if (a(h, g, i)) {
                return h.data("mask", new f(this, g, i))
            }
        },
        a = function (k, g, h) {
            h = h || {};
            var l = d(k).data("mask"),
                m = JSON.stringify,
                i = d(k).val() || d(k).text();
            try {
                if (typeof g === "function") {
                    g = g(i)
                }
                return typeof l !== "object" || m(l.options) !== m(h) || l.mask !== g
            } catch (j) {}
        },
        c = function (g) {
            var i = document.createElement("div"),
                h;
            g = "on" + g;
            h = (g in i);
            if (!h) {
                i.setAttribute(g, "return;");
                h = typeof i[g] === "function"
            }
            i = null;
            return h
        };
    d.fn.mask = function (h, l) {
        l = l || {};
        var g = this.selector,
            m = d.jMaskGlobals,
            j = m.watchInterval,
            k = l.watchInputs || m.watchInputs,
            i = function () {
                if (a(this, h, l)) {
                    return d(this).data("mask", new f(this, h, l))
                }
            };
        d(this).each(i);
        if (g && g !== "" && k) {
            clearInterval(d.maskWatchers[g]);
            d.maskWatchers[g] = setInterval(function () {
                d(document).find(g).each(i)
            }, j)
        }
        return this
    };
    d.fn.masked = function (g) {
        return this.data("mask").getMaskedVal(g)
    };
    d.fn.unmask = function () {
        clearInterval(d.maskWatchers[this.selector]);
        delete d.maskWatchers[this.selector];
        return this.each(function () {
            var g = d(this).data("mask");
            if (g) {
                g.remove().removeData("mask")
            }
        })
    };
    d.fn.cleanVal = function () {
        return this.data("mask").getCleanVal()
    };
    d.applyDataMask = function (g) {
        g = g || d.jMaskGlobals.maskElements;
        var h = (g instanceof d) ? g : d(g);
        h.filter(d.jMaskGlobals.dataMaskAttr).each(e)
    };
    var b = {
        maskElements: "input,td,span,div",
        dataMaskAttr: "*[data-mask]",
        dataMask: true,
        watchInterval: 300,
        watchInputs: true,
        keyStrokeCompensation: 10,
        useInput: !/Chrome\/[2-4][0-9]|SamsungBrowser/.test(window.navigator.userAgent) && c("input"),
        watchDataMask: false,
        byPassKeys: [9, 16, 17, 18, 36, 37, 38, 39, 40, 91],
        translation: {
            "0": {
                pattern: /\d/
            },
            "9": {
                pattern: /\d/,
                optional: true
            },
            "#": {
                pattern: /\d/,
                recursive: true
            },
            A: {
                pattern: /[a-zA-Z0-9]/
            },
            S: {
                pattern: /[a-zA-Z]/
            }
        }
    };
    d.jMaskGlobals = d.jMaskGlobals || {};
    b = d.jMaskGlobals = d.extend(true, {}, b, d.jMaskGlobals);
    if (b.dataMask) {
        d.applyDataMask()
    }
    setInterval(function () {
        if (d.jMaskGlobals.watchDataMask) {
            d.applyDataMask()
        }
    }, b.watchInterval)
}, window.jQuery, window.Zepto));
(function (b, a) {
    typeof exports === "object" && typeof module !== "undefined" ? module.exports = a() : typeof define === "function" && define.amd ? define(a) : b.moment = a()
}(this, function () {
    var bH;

    function bt() {
        return bH.apply(null, arguments)
    }

    function aw(el) {
        bH = el
    }

    function J(el) {
        return Object.prototype.toString.call(el) === "[object Array]"
    }

    function dM(el) {
        return el instanceof Date || Object.prototype.toString.call(el) === "[object Date]"
    }

    function a3(el, eo) {
        var en = [],
            em;
        for (em = 0; em < el.length; ++em) {
            en.push(eo(el[em], em))
        }
        return en
    }

    function cN(em, el) {
        return Object.prototype.hasOwnProperty.call(em, el)
    }

    function ef(em, el) {
        for (var en in el) {
            if (cN(el, en)) {
                em[en] = el[en]
            }
        }
        if (cN(el, "toString")) {
            em.toString = el.toString
        }
        if (cN(el, "valueOf")) {
            em.valueOf = el.valueOf
        }
        return em
    }

    function dC(en, eo, el, em) {
        return Q(en, eo, el, em, true).utc()
    }

    function bX() {
        return {
            empty: false,
            unusedTokens: [],
            unusedInput: [],
            overflow: -2,
            charsLeftOver: 0,
            nullInput: false,
            invalidMonth: null,
            invalidFormat: false,
            userInvalidated: false,
            iso: false
        }
    }

    function aQ(el) {
        if (el._pf == null) {
            el._pf = bX()
        }
        return el._pf
    }

    function ag(el) {
        if (el._isValid == null) {
            var em = aQ(el);
            el._isValid = !isNaN(el._d.getTime()) && em.overflow < 0 && !em.empty && !em.invalidMonth && !em.invalidWeekday && !em.nullInput && !em.invalidFormat && !em.userInvalidated;
            if (el._strict) {
                el._isValid = el._isValid && em.charsLeftOver === 0 && em.unusedTokens.length === 0 && em.bigHour === undefined
            }
        }
        return el._isValid
    }

    function cc(em) {
        var el = dC(NaN);
        if (em != null) {
            ef(aQ(el), em)
        } else {
            aQ(el).userInvalidated = true
        }
        return el
    }

    function y(el) {
        return el === void 0
    }
    var cm = bt.momentProperties = [];

    function o(ep, eo) {
        var el, en, em;
        if (!y(eo._isAMomentObject)) {
            ep._isAMomentObject = eo._isAMomentObject
        }
        if (!y(eo._i)) {
            ep._i = eo._i
        }
        if (!y(eo._f)) {
            ep._f = eo._f
        }
        if (!y(eo._l)) {
            ep._l = eo._l
        }
        if (!y(eo._strict)) {
            ep._strict = eo._strict
        }
        if (!y(eo._tzm)) {
            ep._tzm = eo._tzm
        }
        if (!y(eo._isUTC)) {
            ep._isUTC = eo._isUTC
        }
        if (!y(eo._offset)) {
            ep._offset = eo._offset
        }
        if (!y(eo._pf)) {
            ep._pf = aQ(eo)
        }
        if (!y(eo._locale)) {
            ep._locale = eo._locale
        }
        if (cm.length > 0) {
            for (el in cm) {
                en = cm[el];
                em = eo[en];
                if (!y(em)) {
                    ep[en] = em
                }
            }
        }
        return ep
    }
    var cI = false;

    function dJ(el) {
        o(this, el);
        this._d = new Date(el._d != null ? el._d.getTime() : NaN);
        if (cI === false) {
            cI = true;
            bt.updateOffset(this);
            cI = false
        }
    }

    function bI(el) {
        return el instanceof dJ || (el != null && el._isAMomentObject != null)
    }

    function cK(el) {
        if (el < 0) {
            return Math.ceil(el)
        } else {
            return Math.floor(el)
        }
    }

    function ck(el) {
        var en = +el,
            em = 0;
        if (en !== 0 && isFinite(en)) {
            em = cK(en)
        }
        return em
    }

    function by(eq, ep, em) {
        var el = Math.min(eq.length, ep.length),
            en = Math.abs(eq.length - ep.length),
            er = 0,
            eo;
        for (eo = 0; eo < el; eo++) {
            if ((em && eq[eo] !== ep[eo]) || (!em && ck(eq[eo]) !== ck(ep[eo]))) {
                er++
            }
        }
        return er + en
    }

    function b7() {}
    var bd = {};
    var cs;

    function cP(el) {
        return el ? el.toLowerCase().replace("_", "-") : el
    }

    function cr(eq) {
        var eo = 0,
            em, ep, el, en;
        while (eo < eq.length) {
            en = cP(eq[eo]).split("-");
            em = en.length;
            ep = cP(eq[eo + 1]);
            ep = ep ? ep.split("-") : null;
            while (em > 0) {
                el = ak(en.slice(0, em).join("-"));
                if (el) {
                    return el
                }
                if (ep && ep.length >= em && by(en, ep, true) >= em - 1) {
                    break
                }
                em--
            }
            eo++
        }
        return null
    }

    function ak(el) {
        var en = null;
        if (!bd[el] && (typeof module !== "undefined") && module && module.exports) {
            try {
                en = cs._abbr;
                require("./locale/" + el);
                ce(en)
            } catch (em) {}
        }
        return bd[el]
    }

    function ce(em, el) {
        var en;
        if (em) {
            if (y(el)) {
                en = q(em)
            } else {
                en = b6(em, el)
            }
            if (en) {
                cs = en
            }
        }
        return cs._abbr
    }

    function b6(em, el) {
        if (el !== null) {
            el.abbr = em;
            bd[em] = bd[em] || new b7();
            bd[em].set(el);
            ce(em);
            return bd[em]
        } else {
            delete bd[em];
            return null
        }
    }

    function q(em) {
        var el;
        if (em && em._locale && em._locale._abbr) {
            em = em._locale._abbr
        }
        if (!em) {
            return cs
        }
        if (!J(em)) {
            el = ak(em);
            if (el) {
                return el
            }
            em = [em]
        }
        return cr(em)
    }
    var ch = {};

    function bL(en, el) {
        var em = en.toLowerCase();
        ch[em] = ch[em + "s"] = ch[el] = en
    }

    function cj(el) {
        return typeof el === "string" ? ch[el] || ch[el.toLowerCase()] : undefined
    }

    function c8(en) {
        var em = {},
            el, eo;
        for (eo in en) {
            if (cN(en, eo)) {
                el = cj(eo);
                if (el) {
                    em[el] = en[eo]
                }
            }
        }
        return em
    }

    function aJ(el) {
        return el instanceof Function || Object.prototype.toString.call(el) === "[object Function]"
    }

    function du(el, em) {
        return function (en) {
            if (en != null) {
                dN(this, el, en);
                bt.updateOffset(this, em);
                return this
            } else {
                return d2(this, el)
            }
        }
    }

    function d2(em, el) {
        return em.isValid() ? em._d["get" + (em._isUTC ? "UTC" : "") + el]() : NaN
    }

    function dN(em, el, en) {
        if (em.isValid()) {
            em._d["set" + (em._isUTC ? "UTC" : "") + el](en)
        }
    }

    function dS(el, en) {
        var em;
        if (typeof el === "object") {
            for (em in el) {
                this.set(em, el[em])
            }
        } else {
            el = cj(el);
            if (aJ(this[el])) {
                return this[el](en)
            }
        }
        return this
    }

    function bU(eq, ep, em) {
        var eo = "" + Math.abs(eq),
            en = ep - eo.length,
            el = eq >= 0;
        return (el ? (em ? "+" : "") : "-") + Math.pow(10, Math.max(0, en)).toString().substr(1) + eo
    }
    var br = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;
    var bq = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;
    var bp = {};
    var aO = {};

    function b2(em, en, el, ep) {
        var eo = ep;
        if (typeof ep === "string") {
            eo = function () {
                return this[ep]()
            }
        }
        if (em) {
            aO[em] = eo
        }
        if (en) {
            aO[en[0]] = function () {
                return bU(eo.apply(this, arguments), en[1], en[2])
            }
        }
        if (el) {
            aO[el] = function () {
                return this.localeData().ordinal(eo.apply(this, arguments), em)
            }
        }
    }

    function ah(el) {
        if (el.match(/\[[\s\S]/)) {
            return el.replace(/^\[|\]$/g, "")
        }
        return el.replace(/\\/g, "")
    }

    function bc(en) {
        var eo = en.match(br),
            el, em;
        for (el = 0, em = eo.length; el < em; el++) {
            if (aO[eo[el]]) {
                eo[el] = aO[eo[el]]
            } else {
                eo[el] = ah(eo[el])
            }
        }
        return function (eq) {
            var ep = "";
            for (el = 0; el < em; el++) {
                ep += eo[el] instanceof Function ? eo[el].call(eq, en) : eo[el]
            }
            return ep
        }
    }

    function T(el, em) {
        if (!el.isValid()) {
            return el.localeData().invalidDate()
        }
        em = bh(em, el.localeData());
        bp[em] = bp[em] || bc(em);
        return bp[em](el)
    }

    function bh(eo, el) {
        var em = 5;

        function en(ep) {
            return el.longDateFormat(ep) || ep
        }
        bq.lastIndex = 0;
        while (em >= 0 && bq.test(eo)) {
            eo = eo.replace(bq, en);
            bq.lastIndex = 0;
            em -= 1
        }
        return eo
    }
    var ar = /\d/;
    var aq = /\d\d/;
    var ap = /\d{3}/;
    var ao = /\d{4}/;
    var an = /[+-]?\d{6}/;
    var af = /\d\d?/;
    var bR = /\d\d\d\d?/;
    var dw = /\d\d\d\d\d\d?/;
    var ae = /\d{1,3}/;
    var ad = /\d{1,4}/;
    var ac = /[+-]?\d{1,6}/;
    var p = /\d+/;
    var v = /[+-]?\d+/;
    var bj = /Z|[+-]\d\d:?\d\d/gi;
    var b9 = /Z|[+-]\d\d(?::?\d\d)?/gi;
    var eb = /[+-]?\d+(\.\d{1,3})?/;
    var aL = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i;
    var aF = {};

    function aS(el, em, en) {
        aF[el] = aJ(em) ? em : function (ep, eo) {
            return (ep && en) ? en : em
        }
    }

    function bg(em, el) {
        if (!cN(aF, em)) {
            return new RegExp(cL(em))
        }
        return aF[em](el._strict, el._locale)
    }

    function cL(el) {
        return bM(el.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (em, eq, ep, eo, en) {
            return eq || ep || eo || en
        }))
    }

    function bM(el) {
        return el.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
    }
    var h = {};

    function bu(em, eo) {
        var el, en = eo;
        if (typeof em === "string") {
            em = [em]
        }
        if (typeof eo === "number") {
            en = function (ep, eq) {
                eq[eo] = ck(ep)
            }
        }
        for (el = 0; el < em.length; el++) {
            h[em[el]] = en
        }
    }

    function M(el, em) {
        bu(el, function (en, eq, eo, ep) {
            eo._w = eo._w || {};
            em(en, eo._w, eo, ep)
        })
    }

    function s(en, el, em) {
        if (el != null && cN(h, en)) {
            h[en](el, em._a, em, en)
        }
    }
    var ec = 0;
    var j = 1;
    var dL = 2;
    var dZ = 3;
    var c6 = 4;
    var W = 5;
    var bk = 6;
    var bN = 7;
    var i = 8;

    function bi(el, em) {
        return new Date(Date.UTC(el, em + 1, 0)).getUTCDate()
    }
    b2("M", ["MM", 2], "Mo", function () {
        return this.month() + 1
    });
    b2("MMM", 0, 0, function (el) {
        return this.localeData().monthsShort(this, el)
    });
    b2("MMMM", 0, 0, function (el) {
        return this.localeData().months(this, el)
    });
    bL("month", "M");
    aS("M", af);
    aS("MM", af, aq);
    aS("MMM", function (em, el) {
        return el.monthsShortRegex(em)
    });
    aS("MMMM", function (em, el) {
        return el.monthsRegex(em)
    });
    bu(["M", "MM"], function (el, em) {
        em[j] = ck(el) - 1
    });
    bu(["MMM", "MMMM"], function (el, ep, em, en) {
        var eo = em._locale.monthsParse(el, en, em._strict);
        if (eo != null) {
            ep[j] = eo
        } else {
            aQ(em).invalidMonth = el
        }
    });
    var bB = /D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/;
    var F = "January_February_March_April_May_June_July_August_September_October_November_December".split("_");

    function aD(el, em) {
        return J(this._months) ? this._months[el.month()] : this._months[bB.test(em) ? "format" : "standalone"][el.month()]
    }
    var dk = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_");

    function aP(el, em) {
        return J(this._monthsShort) ? this._monthsShort[el.month()] : this._monthsShort[bB.test(em) ? "format" : "standalone"][el.month()]
    }

    function cE(em, eq, el) {
        var en, ep, eo;
        if (!this._monthsParse) {
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = []
        }
        for (en = 0; en < 12; en++) {
            ep = dC([2000, en]);
            if (el && !this._longMonthsParse[en]) {
                this._longMonthsParse[en] = new RegExp("^" + this.months(ep, "").replace(".", "") + "$", "i");
                this._shortMonthsParse[en] = new RegExp("^" + this.monthsShort(ep, "").replace(".", "") + "$", "i")
            }
            if (!el && !this._monthsParse[en]) {
                eo = "^" + this.months(ep, "") + "|^" + this.monthsShort(ep, "");
                this._monthsParse[en] = new RegExp(eo.replace(".", ""), "i")
            }
            if (el && eq === "MMMM" && this._longMonthsParse[en].test(em)) {
                return en
            } else {
                if (el && eq === "MMM" && this._shortMonthsParse[en].test(em)) {
                    return en
                } else {
                    if (!el && this._monthsParse[en].test(em)) {
                        return en
                    }
                }
            }
        }
    }

    function az(el, em) {
        var en;
        if (!el.isValid()) {
            return el
        }
        if (typeof em === "string") {
            em = el.localeData().monthsParse(em);
            if (typeof em !== "number") {
                return el
            }
        }
        en = Math.min(el.date(), bi(el.year(), em));
        el._d["set" + (el._isUTC ? "UTC" : "") + "Month"](em, en);
        return el
    }

    function dY(el) {
        if (el != null) {
            az(this, el);
            bt.updateOffset(this, true);
            return this
        } else {
            return d2(this, "Month")
        }
    }

    function bn() {
        return bi(this.year(), this.month())
    }
    var cJ = aL;

    function cM(el) {
        if (this._monthsParseExact) {
            if (!cN(this, "_monthsRegex")) {
                cO.call(this)
            }
            if (el) {
                return this._monthsShortStrictRegex
            } else {
                return this._monthsShortRegex
            }
        } else {
            return this._monthsShortStrictRegex && el ? this._monthsShortStrictRegex : this._monthsShortRegex
        }
    }
    var dP = aL;

    function ct(el) {
        if (this._monthsParseExact) {
            if (!cN(this, "_monthsRegex")) {
                cO.call(this)
            }
            if (el) {
                return this._monthsStrictRegex
            } else {
                return this._monthsRegex
            }
        } else {
            return this._monthsStrictRegex && el ? this._monthsStrictRegex : this._monthsRegex
        }
    }

    function cO() {
        function eq(es, er) {
            return er.length - es.length
        }
        var ep = [],
            el = [],
            eo = [],
            em, en;
        for (em = 0; em < 12; em++) {
            en = dC([2000, em]);
            ep.push(this.monthsShort(en, ""));
            el.push(this.months(en, ""));
            eo.push(this.months(en, ""));
            eo.push(this.monthsShort(en, ""))
        }
        ep.sort(eq);
        el.sort(eq);
        eo.sort(eq);
        for (em = 0; em < 12; em++) {
            ep[em] = bM(ep[em]);
            el[em] = bM(el[em]);
            eo[em] = bM(eo[em])
        }
        this._monthsRegex = new RegExp("^(" + eo.join("|") + ")", "i");
        this._monthsShortRegex = this._monthsRegex;
        this._monthsStrictRegex = new RegExp("^(" + el.join("|") + ")$", "i");
        this._monthsShortStrictRegex = new RegExp("^(" + ep.join("|") + ")$", "i")
    }

    function ci(el) {
        var en;
        var em = el._a;
        if (em && aQ(el).overflow === -2) {
            en = em[j] < 0 || em[j] > 11 ? j : em[dL] < 1 || em[dL] > bi(em[ec], em[j]) ? dL : em[dZ] < 0 || em[dZ] > 24 || (em[dZ] === 24 && (em[c6] !== 0 || em[W] !== 0 || em[bk] !== 0)) ? dZ : em[c6] < 0 || em[c6] > 59 ? c6 : em[W] < 0 || em[W] > 59 ? W : em[bk] < 0 || em[bk] > 999 ? bk : -1;
            if (aQ(el)._overflowDayOfYear && (en < ec || en > dL)) {
                en = dL
            }
            if (aQ(el)._overflowWeeks && en === -1) {
                en = bN
            }
            if (aQ(el)._overflowWeekday && en === -1) {
                en = i
            }
            aQ(el).overflow = en
        }
        return el
    }

    function cF(el) {
        if (bt.suppressDeprecationWarnings === false && (typeof console !== "undefined") && console.warn) {
            console.warn("Deprecation warning: " + el)
        }
    }

    function dz(em, el) {
        var en = true;
        return ef(function () {
            if (en) {
                cF(em + "\nArguments: " + Array.prototype.slice.call(arguments).join(", ") + "\n" + (new Error()).stack);
                en = false
            }
            return el.apply(this, arguments)
        }, el)
    }
    var O = {};

    function ea(el, em) {
        if (!O[el]) {
            cF(em);
            O[el] = true
        }
    }
    bt.suppressDeprecationWarnings = false;
    var k = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/;
    var ax = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/;
    var ca = /Z|[+-]\d\d(?::?\d\d)?/;
    var cl = [["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/], ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/], ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/], ["GGGG-[W]WW", /\d{4}-W\d\d/, false], ["YYYY-DDD", /\d{4}-\d{3}/], ["YYYY-MM", /\d{4}-\d\d/, false], ["YYYYYYMMDD", /[+-]\d{10}/], ["YYYYMMDD", /\d{8}/], ["GGGG[W]WWE", /\d{4}W\d{3}/], ["GGGG[W]WW", /\d{4}W\d{2}/, false], ["YYYYDDD", /\d{7}/]];
    var bW = [["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/], ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/], ["HH:mm:ss", /\d\d:\d\d:\d\d/], ["HH:mm", /\d\d:\d\d/], ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/], ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/], ["HHmmss", /\d\d\d\d\d\d/], ["HHmm", /\d\d\d\d/], ["HH", /\d\d/]];
    var bv = /^\/?Date\((\-?\d+)/i;

    function w(em) {
        var eq, eo, es = em._i,
            er = k.exec(es) || ax.exec(es),
            et, el, ep, en;
        if (er) {
            aQ(em).iso = true;
            for (eq = 0, eo = cl.length; eq < eo; eq++) {
                if (cl[eq][1].exec(er[1])) {
                    el = cl[eq][0];
                    et = cl[eq][2] !== false;
                    break
                }
            }
            if (el == null) {
                em._isValid = false;
                return
            }
            if (er[3]) {
                for (eq = 0, eo = bW.length; eq < eo; eq++) {
                    if (bW[eq][1].exec(er[3])) {
                        ep = (er[2] || " ") + bW[eq][0];
                        break
                    }
                }
                if (ep == null) {
                    em._isValid = false;
                    return
                }
            }
            if (!et && ep != null) {
                em._isValid = false;
                return
            }
            if (er[4]) {
                if (ca.exec(er[4])) {
                    en = "Z"
                } else {
                    em._isValid = false;
                    return
                }
            }
            em._f = el + (ep || "") + (en || "");
            bw(em)
        } else {
            em._isValid = false
        }
    }

    function aR(em) {
        var el = bv.exec(em._i);
        if (el !== null) {
            em._d = new Date(+el[1]);
            return
        }
        w(em);
        if (em._isValid === false) {
            delete em._isValid;
            bt.createFromInputFallback(em)
        }
    }
    bt.createFromInputFallback = dz("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.", function (el) {
        el._d = new Date(el._i + (el._useUTC ? " UTC" : ""))
    });

    function dr(es, el, eq, ep, er, eo, en) {
        var em = new Date(es, el, eq, ep, er, eo, en);
        if (es < 100 && es >= 0 && isFinite(em.getFullYear())) {
            em.setFullYear(es)
        }
        return em
    }

    function cT(em) {
        var el = new Date(Date.UTC.apply(null, arguments));
        if (em < 100 && em >= 0 && isFinite(el.getUTCFullYear())) {
            el.setUTCFullYear(em)
        }
        return el
    }
    b2("Y", 0, 0, function () {
        var el = this.year();
        return el <= 9999 ? "" + el : "+" + el
    });
    b2(0, ["YY", 2], 0, function () {
        return this.year() % 100
    });
    b2(0, ["YYYY", 4], 0, "year");
    b2(0, ["YYYYY", 5], 0, "year");
    b2(0, ["YYYYYY", 6, true], 0, "year");
    bL("year", "y");
    aS("Y", v);
    aS("YY", af, aq);
    aS("YYYY", ad, ao);
    aS("YYYYY", ac, an);
    aS("YYYYYY", ac, an);
    bu(["YYYYY", "YYYYYY"], ec);
    bu("YYYY", function (el, em) {
        em[ec] = el.length === 2 ? bt.parseTwoDigitYear(el) : ck(el)
    });
    bu("YY", function (el, em) {
        em[ec] = bt.parseTwoDigitYear(el)
    });
    bu("Y", function (el, em) {
        em[ec] = parseInt(el, 10)
    });

    function c4(el) {
        return dj(el) ? 366 : 365
    }

    function dj(el) {
        return (el % 4 === 0 && el % 100 !== 0) || el % 400 === 0
    }
    bt.parseTwoDigitYear = function (el) {
        return ck(el) + (ck(el) > 68 ? 1900 : 2000)
    };
    var cb = du("FullYear", false);

    function cn() {
        return dj(this.year())
    }

    function aX(em, ep, eo) {
        var el = 7 + ep - eo,
            en = (7 + cT(em, 0, el).getUTCDay() - ep) % 7;
        return -en + el - 1
    }

    function bf(eo, em, en, eu, es) {
        var et = (7 + en - eu) % 7,
            el = aX(eo, eu, es),
            eq = 1 + 7 * (em - 1) + et + el,
            er, ep;
        if (eq <= 0) {
            er = eo - 1;
            ep = c4(er) + eq
        } else {
            if (eq > c4(eo)) {
                er = eo + 1;
                ep = eq - c4(eo)
            } else {
                er = eo;
                ep = eq
            }
        }
        return {
            year: er,
            dayOfYear: ep
        }
    }

    function dK(ep, er, eq) {
        var en = aX(ep.year(), er, eq),
            eo = Math.floor((ep.dayOfYear() - en - 1) / 7) + 1,
            el, em;
        if (eo < 1) {
            em = ep.year() - 1;
            el = eo + x(em, er, eq)
        } else {
            if (eo > x(ep.year(), er, eq)) {
                el = eo - x(ep.year(), er, eq);
                em = ep.year() + 1
            } else {
                em = ep.year();
                el = eo
            }
        }
        return {
            week: el,
            year: em
        }
    }

    function x(em, ep, en) {
        var el = aX(em, ep, en),
            eo = aX(em + 1, ep, en);
        return (c4(em) - el + eo) / 7
    }

    function ds(em, el, en) {
        if (em != null) {
            return em
        }
        if (el != null) {
            return el
        }
        return en
    }

    function aE(em) {
        var el = new Date(bt.now());
        if (em._useUTC) {
            return [el.getUTCFullYear(), el.getUTCMonth(), el.getUTCDate()]
        }
        return [el.getFullYear(), el.getMonth(), el.getDate()]
    }

    function f(ep) {
        var eq, eo, en = [],
            em, el;
        if (ep._d) {
            return
        }
        em = aE(ep);
        if (ep._w && ep._a[dL] == null && ep._a[j] == null) {
            cw(ep)
        }
        if (ep._dayOfYear) {
            el = ds(ep._a[ec], em[ec]);
            if (ep._dayOfYear > c4(el)) {
                aQ(ep)._overflowDayOfYear = true
            }
            eo = cT(el, 0, ep._dayOfYear);
            ep._a[j] = eo.getUTCMonth();
            ep._a[dL] = eo.getUTCDate()
        }
        for (eq = 0; eq < 3 && ep._a[eq] == null; ++eq) {
            ep._a[eq] = en[eq] = em[eq]
        }
        for (; eq < 7; eq++) {
            ep._a[eq] = en[eq] = (ep._a[eq] == null) ? (eq === 2 ? 1 : 0) : ep._a[eq]
        }
        if (ep._a[dZ] === 24 && ep._a[c6] === 0 && ep._a[W] === 0 && ep._a[bk] === 0) {
            ep._nextDay = true;
            ep._a[dZ] = 0
        }
        ep._d = (ep._useUTC ? cT : dr).apply(null, en);
        if (ep._tzm != null) {
            ep._d.setUTCMinutes(ep._d.getUTCMinutes() - ep._tzm)
        }
        if (ep._nextDay) {
            ep._a[dZ] = 24
        }
    }

    function cw(en) {
        var eq, el, em, eo, et, er, es, ep;
        eq = en._w;
        if (eq.GG != null || eq.W != null || eq.E != null) {
            et = 1;
            er = 4;
            el = ds(eq.GG, en._a[ec], dK(dp(), 1, 4).year);
            em = ds(eq.W, 1);
            eo = ds(eq.E, 1);
            if (eo < 1 || eo > 7) {
                ep = true
            }
        } else {
            et = en._locale._week.dow;
            er = en._locale._week.doy;
            el = ds(eq.gg, en._a[ec], dK(dp(), et, er).year);
            em = ds(eq.w, 1);
            if (eq.d != null) {
                eo = eq.d;
                if (eo < 0 || eo > 6) {
                    ep = true
                }
            } else {
                if (eq.e != null) {
                    eo = eq.e + et;
                    if (eq.e < 0 || eq.e > 6) {
                        ep = true
                    }
                } else {
                    eo = et
                }
            }
        }
        if (em < 1 || em > x(el, et, er)) {
            aQ(en)._overflowWeeks = true
        } else {
            if (ep != null) {
                aQ(en)._overflowWeekday = true
            } else {
                es = bf(el, em, eo, et, er);
                en._a[ec] = es.year;
                en._dayOfYear = es.dayOfYear
            }
        }
    }
    bt.ISO_8601 = function () {};

    function bw(en) {
        if (en._f === bt.ISO_8601) {
            w(en);
            return
        }
        en._a = [];
        aQ(en).empty = true;
        var eq = "" + en._i,
            ep, em, et, eo, es, el = eq.length,
            er = 0;
        et = bh(en._f, en._locale).match(br) || [];
        for (ep = 0; ep < et.length; ep++) {
            eo = et[ep];
            em = (eq.match(bg(eo, en)) || [])[0];
            if (em) {
                es = eq.substr(0, eq.indexOf(em));
                if (es.length > 0) {
                    aQ(en).unusedInput.push(es)
                }
                eq = eq.slice(eq.indexOf(em) + em.length);
                er += em.length
            }
            if (aO[eo]) {
                if (em) {
                    aQ(en).empty = false
                } else {
                    aQ(en).unusedTokens.push(eo)
                }
                s(eo, em, en)
            } else {
                if (en._strict && !em) {
                    aQ(en).unusedTokens.push(eo)
                }
            }
        }
        aQ(en).charsLeftOver = el - er;
        if (eq.length > 0) {
            aQ(en).unusedInput.push(eq)
        }
        if (aQ(en).bigHour === true && en._a[dZ] <= 12 && en._a[dZ] > 0) {
            aQ(en).bigHour = undefined
        }
        en._a[dZ] = dA(en._locale, en._a[dZ], en._meridiem);
        f(en);
        ci(en)
    }

    function dA(el, en, eo) {
        var em;
        if (eo == null) {
            return en
        }
        if (el.meridiemHour != null) {
            return el.meridiemHour(en, eo)
        } else {
            if (el.isPM != null) {
                em = el.isPM(eo);
                if (em && en < 12) {
                    en += 12
                }
                if (!em && en === 12) {
                    en = 0
                }
                return en
            } else {
                return en
            }
        }
    }

    function c2(el) {
        var ep, en, eo, em, eq;
        if (el._f.length === 0) {
            aQ(el).invalidFormat = true;
            el._d = new Date(NaN);
            return
        }
        for (em = 0; em < el._f.length; em++) {
            eq = 0;
            ep = o({}, el);
            if (el._useUTC != null) {
                ep._useUTC = el._useUTC
            }
            ep._f = el._f[em];
            bw(ep);
            if (!ag(ep)) {
                continue
            }
            eq += aQ(ep).charsLeftOver;
            eq += aQ(ep).unusedTokens.length * 10;
            aQ(ep).score = eq;
            if (eo == null || eq < eo) {
                eo = eq;
                en = ep
            }
        }
        ef(el, en || ep)
    }

    function aG(el) {
        if (el._d) {
            return
        }
        var em = c8(el._i);
        el._a = a3([em.year, em.month, em.day || em.date, em.hour, em.minute, em.second, em.millisecond], function (en) {
            return en && parseInt(en, 10)
        });
        f(el)
    }

    function aa(el) {
        var em = new dJ(ci(a7(el)));
        if (em._nextDay) {
            em.add(1, "d");
            em._nextDay = undefined
        }
        return em
    }

    function a7(em) {
        var el = em._i,
            en = em._f;
        em._locale = em._locale || q(em._l);
        if (el === null || (en === undefined && el === "")) {
            return cc({
                nullInput: true
            })
        }
        if (typeof el === "string") {
            em._i = el = em._locale.preparse(el)
        }
        if (bI(el)) {
            return new dJ(ci(el))
        } else {
            if (J(en)) {
                c2(em)
            } else {
                if (en) {
                    bw(em)
                } else {
                    if (dM(el)) {
                        em._d = el
                    } else {
                        b0(em)
                    }
                }
            }
        }
        if (!ag(em)) {
            em._d = null
        }
        return em
    }

    function b0(em) {
        var el = em._i;
        if (el === undefined) {
            em._d = new Date(bt.now())
        } else {
            if (dM(el)) {
                em._d = new Date(+el)
            } else {
                if (typeof el === "string") {
                    aR(em)
                } else {
                    if (J(el)) {
                        em._a = a3(el.slice(0), function (en) {
                            return parseInt(en, 10)
                        });
                        f(em)
                    } else {
                        if (typeof (el) === "object") {
                            aG(em)
                        } else {
                            if (typeof (el) === "number") {
                                em._d = new Date(el)
                            } else {
                                bt.createFromInputFallback(em)
                            }
                        }
                    }
                }
            }
        }
    }

    function Q(eo, ep, el, en, em) {
        var eq = {};
        if (typeof (el) === "boolean") {
            en = el;
            el = undefined
        }
        eq._isAMomentObject = true;
        eq._useUTC = eq._isUTC = em;
        eq._l = el;
        eq._i = eo;
        eq._f = ep;
        eq._strict = en;
        return aa(eq)
    }

    function dp(en, eo, el, em) {
        return Q(en, eo, el, em, false)
    }
    var cf = dz("moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548", function () {
        var el = dp.apply(null, arguments);
        if (this.isValid() && el.isValid()) {
            return el < this ? this : el
        } else {
            return cc()
        }
    });
    var dG = dz("moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548", function () {
        var el = dp.apply(null, arguments);
        if (this.isValid() && el.isValid()) {
            return el > this ? this : el
        } else {
            return cc()
        }
    });

    function eg(en, eo) {
        var em, el;
        if (eo.length === 1 && J(eo[0])) {
            eo = eo[0]
        }
        if (!eo.length) {
            return dp()
        }
        em = eo[0];
        for (el = 1; el < eo.length; ++el) {
            if (!eo[el].isValid() || eo[el][en](em)) {
                em = eo[el]
            }
        }
        return em
    }

    function n() {
        var el = [].slice.call(arguments, 0);
        return eg("isBefore", el)
    }

    function a1() {
        var el = [].slice.call(arguments, 0);
        return eg("isAfter", el)
    }
    var b3 = function () {
        return Date.now ? Date.now() : +(new Date())
    };

    function db(eq) {
        var es = c8(eq),
            er = es.year || 0,
            em = es.quarter || 0,
            en = es.month || 0,
            el = es.week || 0,
            ev = es.day || 0,
            et = es.hour || 0,
            ep = es.minute || 0,
            eu = es.second || 0,
            eo = es.millisecond || 0;
        this._milliseconds = +eo + eu * 1000 + ep * 60000 + et * 3600000;
        this._days = +ev + el * 7;
        this._months = +en + em * 3 + er * 12;
        this._data = {};
        this._locale = q();
        this._bubble()
    }

    function S(el) {
        return el instanceof db
    }

    function ba(el, em) {
        b2(el, 0, 0, function () {
            var eo = this.utcOffset();
            var en = "+";
            if (eo < 0) {
                eo = -eo;
                en = "-"
            }
            return en + bU(~~(eo / 60), 2) + em + bU(~~(eo) % 60, 2)
        })
    }
    ba("Z", ":");
    ba("ZZ", "");
    aS("Z", b9);
    aS("ZZ", b9);
    bu(["Z", "ZZ"], function (el, en, em) {
        em._useUTC = true;
        em._tzm = m(b9, el)
    });
    var dV = /([\+\-]|\d\d)/gi;

    function m(eq, em) {
        var eo = ((em || "").match(eq) || []);
        var el = eo[eo.length - 1] || [];
        var ep = (el + "").match(dV) || ["-", 0, 0];
        var en = +(ep[1] * 60) + ck(ep[2]);
        return ep[0] === "+" ? en : -en
    }

    function al(el, em) {
        var en, eo;
        if (em._isUTC) {
            en = em.clone();
            eo = (bI(el) || dM(el) ? +el : +dp(el)) - (+en);
            en._d.setTime(+en._d + eo);
            bt.updateOffset(en, false);
            return en
        } else {
            return dp(el).local()
        }
    }

    function au(el) {
        return -Math.round(el._d.getTimezoneOffset() / 15) * 15
    }
    bt.updateOffset = function () {};

    function cV(el, eo) {
        var en = this._offset || 0,
            em;
        if (!this.isValid()) {
            return el != null ? this : NaN
        }
        if (el != null) {
            if (typeof el === "string") {
                el = m(b9, el)
            } else {
                if (Math.abs(el) < 16) {
                    el = el * 60
                }
            }
            if (!this._isUTC && eo) {
                em = au(this)
            }
            this._offset = el;
            this._isUTC = true;
            if (em != null) {
                this.add(em, "m")
            }
            if (en !== el) {
                if (!eo || this._changeInProgress) {
                    b(this, dy(el - en, "m"), 1, false)
                } else {
                    if (!this._changeInProgress) {
                        this._changeInProgress = true;
                        bt.updateOffset(this, true);
                        this._changeInProgress = null
                    }
                }
            }
            return this
        } else {
            return this._isUTC ? en : au(this)
        }
    }

    function cQ(el, em) {
        if (el != null) {
            if (typeof el !== "string") {
                el = -el
            }
            this.utcOffset(el, em);
            return this
        } else {
            return -this.utcOffset()
        }
    }

    function aC(el) {
        return this.utcOffset(0, el)
    }

    function cS(el) {
        if (this._isUTC) {
            this.utcOffset(0, el);
            this._isUTC = false;
            if (el) {
                this.subtract(au(this), "m")
            }
        }
        return this
    }

    function bF() {
        if (this._tzm) {
            this.utcOffset(this._tzm)
        } else {
            if (typeof this._i === "string") {
                this.utcOffset(m(bj, this._i))
            }
        }
        return this
    }

    function aj(el) {
        if (!this.isValid()) {
            return false
        }
        el = el ? dp(el).utcOffset() : 0;
        return (this.utcOffset() - el) % 60 === 0
    }

    function at() {
        return (this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset())
    }

    function d() {
        if (!y(this._isDSTShifted)) {
            return this._isDSTShifted
        }
        var em = {};
        o(em, this);
        em = a7(em);
        if (em._a) {
            var el = em._isUTC ? dC(em._a) : dp(em._a);
            this._isDSTShifted = this.isValid() && by(em._a, el.toArray()) > 0
        } else {
            this._isDSTShifted = false
        }
        return this._isDSTShifted
    }

    function cW() {
        return this.isValid() ? !this._isUTC : false
    }

    function bs() {
        return this.isValid() ? this._isUTC : false
    }

    function c1() {
        return this.isValid() ? this._isUTC && this._offset === 0 : false
    }
    var N = /^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?\d*)?$/;
    var b1 = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/;

    function dy(en, eq) {
        var er = en,
            ep = null,
            em, eo, el;
        if (S(en)) {
            er = {
                ms: en._milliseconds,
                d: en._days,
                M: en._months
            }
        } else {
            if (typeof en === "number") {
                er = {};
                if (eq) {
                    er[eq] = en
                } else {
                    er.milliseconds = en
                }
            } else {
                if (!!(ep = N.exec(en))) {
                    em = (ep[1] === "-") ? -1 : 1;
                    er = {
                        y: 0,
                        d: ck(ep[dL]) * em,
                        h: ck(ep[dZ]) * em,
                        m: ck(ep[c6]) * em,
                        s: ck(ep[W]) * em,
                        ms: ck(ep[bk]) * em
                    }
                } else {
                    if (!!(ep = b1.exec(en))) {
                        em = (ep[1] === "-") ? -1 : 1;
                        er = {
                            y: ee(ep[2], em),
                            M: ee(ep[3], em),
                            d: ee(ep[4], em),
                            h: ee(ep[5], em),
                            m: ee(ep[6], em),
                            s: ee(ep[7], em),
                            w: ee(ep[8], em)
                        }
                    } else {
                        if (er == null) {
                            er = {}
                        } else {
                            if (typeof er === "object" && ("from" in er || "to" in er)) {
                                el = bo(dp(er.from), dp(er.to));
                                er = {};
                                er.ms = el.milliseconds;
                                er.M = el.months
                            }
                        }
                    }
                }
            }
        }
        eo = new db(er);
        if (S(en) && cN(en, "_locale")) {
            eo._locale = en._locale
        }
        return eo
    }
    dy.fn = db.prototype;

    function ee(en, el) {
        var em = en && parseFloat(en.replace(",", "."));
        return (isNaN(em) ? 0 : em) * el
    }

    function cZ(en, el) {
        var em = {
            milliseconds: 0,
            months: 0
        };
        em.months = el.month() - en.month() + (el.year() - en.year()) * 12;
        if (en.clone().add(em.months, "M").isAfter(el)) {
            --em.months
        }
        em.milliseconds = +el - +(en.clone().add(em.months, "M"));
        return em
    }

    function bo(en, el) {
        var em;
        if (!(en.isValid() && el.isValid())) {
            return {
                milliseconds: 0,
                months: 0
            }
        }
        el = al(el, en);
        if (en.isBefore(el)) {
            em = cZ(en, el)
        } else {
            em = cZ(el, en);
            em.milliseconds = -em.milliseconds;
            em.months = -em.months
        }
        return em
    }

    function aH(em, el) {
        return function (eq, ep) {
            var eo, en;
            if (ep !== null && !isNaN(+ep)) {
                ea(el, "moment()." + el + "(period, number) is deprecated. Please use moment()." + el + "(number, period).");
                en = eq;
                eq = ep;
                ep = en
            }
            eq = typeof eq === "string" ? +eq : eq;
            eo = dy(eq, ep);
            b(this, eo, em);
            return this
        }
    }

    function b(en, eq, ep, eo) {
        var em = eq._milliseconds,
            er = eq._days,
            el = eq._months;
        if (!en.isValid()) {
            return
        }
        eo = eo == null ? true : eo;
        if (em) {
            en._d.setTime(+en._d + em * ep)
        }
        if (er) {
            dN(en, "Date", d2(en, "Date") + er * ep)
        }
        if (el) {
            az(en, d2(en, "Month") + el * ep)
        }
        if (eo) {
            bt.updateOffset(en, er || el)
        }
    }
    var bO = aH(1, "add");
    var aB = aH(-1, "subtract");

    function bK(er, el) {
        var eo = er || dp(),
            en = al(eo, this).startOf("day"),
            eq = this.diff(en, "days", true),
            ep = eq < -6 ? "sameElse" : eq < -1 ? "lastWeek" : eq < 0 ? "lastDay" : eq < 1 ? "sameDay" : eq < 2 ? "nextDay" : eq < 7 ? "nextWeek" : "sameElse";
        var em = el && (aJ(el[ep]) ? el[ep]() : el[ep]);
        return this.format(em || this.localeData().calendar(ep, this, dp(eo)))
    }

    function cR() {
        return new dJ(this)
    }

    function b8(em, el) {
        var en = bI(em) ? em : dp(em);
        if (!(this.isValid() && en.isValid())) {
            return false
        }
        el = cj(!y(el) ? el : "millisecond");
        if (el === "millisecond") {
            return +this > +en
        } else {
            return +en < +this.clone().startOf(el)
        }
    }

    function d8(em, el) {
        var en = bI(em) ? em : dp(em);
        if (!(this.isValid() && en.isValid())) {
            return false
        }
        el = cj(!y(el) ? el : "millisecond");
        if (el === "millisecond") {
            return +this < +en
        } else {
            return +this.clone().endOf(el) < +en
        }
    }

    function dI(en, em, el) {
        return this.isAfter(en, el) && this.isBefore(em, el)
    }

    function cd(em, el) {
        var eo = bI(em) ? em : dp(em),
            en;
        if (!(this.isValid() && eo.isValid())) {
            return false
        }
        el = cj(el || "millisecond");
        if (el === "millisecond") {
            return +this === +eo
        } else {
            en = +eo;
            return +(this.clone().startOf(el)) <= en && en <= +(this.clone().endOf(el))
        }
    }

    function d1(em, el) {
        return this.isSame(em, el) || this.isAfter(em, el)
    }

    function d6(em, el) {
        return this.isSame(em, el) || this.isBefore(em, el)
    }

    function B(eo, en, el) {
        var eq, ep, er, em;
        if (!this.isValid()) {
            return NaN
        }
        eq = al(eo, this);
        if (!eq.isValid()) {
            return NaN
        }
        ep = (eq.utcOffset() - this.utcOffset()) * 60000;
        en = cj(en);
        if (en === "year" || en === "month" || en === "quarter") {
            em = dE(this, eq);
            if (en === "quarter") {
                em = em / 3
            } else {
                if (en === "year") {
                    em = em / 12
                }
            }
        } else {
            er = this - eq;
            em = en === "second" ? er / 1000 : en === "minute" ? er / 60000 : en === "hour" ? er / 3600000 : en === "day" ? (er - ep) / 86400000 : en === "week" ? (er - ep) / 604800000 : er
        }
        return el ? em : cK(em)
    }

    function dE(em, el) {
        var eq = ((el.year() - em.year()) * 12) + (el.month() - em.month()),
            en = em.clone().add(eq, "months"),
            eo, ep;
        if (el - en < 0) {
            eo = em.clone().add(eq - 1, "months");
            ep = (el - en) / (en - eo)
        } else {
            eo = em.clone().add(eq + 1, "months");
            ep = (el - en) / (eo - en)
        }
        return -(eq + ep)
    }
    bt.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";

    function dl() {
        return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
    }

    function b4() {
        var el = this.clone().utc();
        if (0 < el.year() && el.year() <= 9999) {
            if (aJ(Date.prototype.toISOString)) {
                return this.toDate().toISOString()
            } else {
                return T(el, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]")
            }
        } else {
            return T(el, "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")
        }
    }

    function cA(em) {
        var el = T(this, em || bt.defaultFormat);
        return this.localeData().postformat(el)
    }

    function dd(em, el) {
        if (this.isValid() && ((bI(em) && em.isValid()) || dp(em).isValid())) {
            return dy({
                to: this,
                from: em
            }).locale(this.locale()).humanize(!el)
        } else {
            return this.localeData().invalidDate()
        }
    }

    function c9(el) {
        return this.from(dp(), el)
    }

    function V(em, el) {
        if (this.isValid() && ((bI(em) && em.isValid()) || dp(em).isValid())) {
            return dy({
                from: this,
                to: em
            }).locale(this.locale()).humanize(!el)
        } else {
            return this.localeData().invalidDate()
        }
    }

    function av(el) {
        return this.to(dp(), el)
    }

    function ej(em) {
        var el;
        if (em === undefined) {
            return this._locale._abbr
        } else {
            el = q(em);
            if (el != null) {
                this._locale = el
            }
            return this
        }
    }
    var u = dz("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function (el) {
        if (el === undefined) {
            return this.localeData()
        } else {
            return this.locale(el)
        }
    });

    function de() {
        return this._locale
    }

    function bE(el) {
        el = cj(el);
        switch (el) {
            case "year":
                this.month(0);
            case "quarter":
            case "month":
                this.date(1);
            case "week":
            case "isoWeek":
            case "day":
                this.hours(0);
            case "hour":
                this.minutes(0);
            case "minute":
                this.seconds(0);
            case "second":
                this.milliseconds(0)
        }
        if (el === "week") {
            this.weekday(0)
        }
        if (el === "isoWeek") {
            this.isoWeekday(1)
        }
        if (el === "quarter") {
            this.month(Math.floor(this.month() / 3) * 3)
        }
        return this
    }

    function dO(el) {
        el = cj(el);
        if (el === undefined || el === "millisecond") {
            return this
        }
        return this.startOf(el).add(1, (el === "isoWeek" ? "week" : el)).subtract(1, "ms")
    }

    function X() {
        return +this._d - ((this._offset || 0) * 60000)
    }

    function be() {
        return Math.floor(+this / 1000)
    }

    function cv() {
        return this._offset ? new Date(+this) : this._d
    }

    function c7() {
        var el = this;
        return [el.year(), el.month(), el.date(), el.hour(), el.minute(), el.second(), el.millisecond()]
    }

    function df() {
        var el = this;
        return {
            years: el.year(),
            months: el.month(),
            date: el.date(),
            hours: el.hours(),
            minutes: el.minutes(),
            seconds: el.seconds(),
            milliseconds: el.milliseconds()
        }
    }

    function cB() {
        return this.isValid() ? this.toISOString() : "null"
    }

    function dQ() {
        return ag(this)
    }

    function c3() {
        return ef({}, aQ(this))
    }

    function b5() {
        return aQ(this).overflow
    }

    function d9() {
        return {
            input: this._i,
            format: this._f,
            locale: this._locale,
            isUTC: this._isUTC,
            strict: this._strict
        }
    }
    b2(0, ["gg", 2], 0, function () {
        return this.weekYear() % 100
    });
    b2(0, ["GG", 2], 0, function () {
        return this.isoWeekYear() % 100
    });

    function L(em, el) {
        b2(0, [em, em.length], 0, el)
    }
    L("gggg", "weekYear");
    L("ggggg", "weekYear");
    L("GGGG", "isoWeekYear");
    L("GGGGG", "isoWeekYear");
    bL("weekYear", "gg");
    bL("isoWeekYear", "GG");
    aS("G", v);
    aS("g", v);
    aS("GG", af, aq);
    aS("gg", af, aq);
    aS("GGGG", ad, ao);
    aS("gggg", ad, ao);
    aS("GGGGG", ac, an);
    aS("ggggg", ac, an);
    M(["gggg", "ggggg", "GGGG", "GGGGG"], function (el, eo, em, en) {
        eo[en.substr(0, 2)] = ck(el)
    });
    M(["gg", "GG"], function (el, eo, em, en) {
        eo[en] = bt.parseTwoDigitYear(el)
    });

    function a5(el) {
        return bY.call(this, el, this.week(), this.weekday(), this.localeData()._week.dow, this.localeData()._week.doy)
    }

    function di(el) {
        return bY.call(this, el, this.isoWeek(), this.isoWeekday(), 1, 4)
    }

    function cD() {
        return x(this.year(), 1, 4)
    }

    function z() {
        var el = this.localeData()._week;
        return x(this.year(), el.dow, el.doy)
    }

    function bY(el, em, eo, eq, ep) {
        var en;
        if (el == null) {
            return dK(this, eq, ep).year
        } else {
            en = x(el, eq, ep);
            if (em > en) {
                em = en
            }
            return aK.call(this, el, em, eo, eq, ep)
        }
    }

    function aK(en, em, ep, er, eq) {
        var eo = bf(en, em, ep, er, eq),
            el = cT(eo.year, 0, eo.dayOfYear);
        this.year(el.getUTCFullYear());
        this.month(el.getUTCMonth());
        this.date(el.getUTCDate());
        return this
    }
    b2("Q", 0, "Qo", "quarter");
    bL("quarter", "Q");
    aS("Q", ar);
    bu("Q", function (el, em) {
        em[j] = (ck(el) - 1) * 3
    });

    function bz(el) {
        return el == null ? Math.ceil((this.month() + 1) / 3) : this.month((el - 1) * 3 + this.month() % 3)
    }
    b2("w", ["ww", 2], "wo", "week");
    b2("W", ["WW", 2], "Wo", "isoWeek");
    bL("week", "w");
    bL("isoWeek", "W");
    aS("w", af);
    aS("ww", af, aq);
    aS("W", af);
    aS("WW", af, aq);
    M(["w", "ww", "W", "WW"], function (el, eo, em, en) {
        eo[en.substr(0, 1)] = ck(el)
    });

    function a4(el) {
        return dK(el, this._week.dow, this._week.doy).week
    }
    var bA = {
        dow: 0,
        doy: 6
    };

    function U() {
        return this._week.dow
    }

    function cC() {
        return this._week.doy
    }

    function A(el) {
        var em = this.localeData().week(this);
        return el == null ? em : this.add((el - em) * 7, "d")
    }

    function t(el) {
        var em = dK(this, 1, 4).week;
        return el == null ? em : this.add((el - em) * 7, "d")
    }
    b2("D", ["DD", 2], "Do", "date");
    bL("date", "D");
    aS("D", af);
    aS("DD", af, aq);
    aS("Do", function (em, el) {
        return em ? el._ordinalParse : el._ordinalParseLenient
    });
    bu(["D", "DD"], dL);
    bu("Do", function (el, em) {
        em[dL] = ck(el.match(af)[0], 10)
    });
    var bT = du("Date", true);
    b2("d", 0, "do", "day");
    b2("dd", 0, 0, function (el) {
        return this.localeData().weekdaysMin(this, el)
    });
    b2("ddd", 0, 0, function (el) {
        return this.localeData().weekdaysShort(this, el)
    });
    b2("dddd", 0, 0, function (el) {
        return this.localeData().weekdays(this, el)
    });
    b2("e", 0, 0, "weekday");
    b2("E", 0, 0, "isoWeekday");
    bL("day", "d");
    bL("weekday", "e");
    bL("isoWeekday", "E");
    aS("d", af);
    aS("e", af);
    aS("E", af);
    aS("dd", aL);
    aS("ddd", aL);
    aS("dddd", aL);
    M(["dd", "ddd", "dddd"], function (el, eo, em, en) {
        var ep = em._locale.weekdaysParse(el, en, em._strict);
        if (ep != null) {
            eo.d = ep
        } else {
            aQ(em).invalidWeekday = el
        }
    });
    M(["d", "e", "E"], function (el, eo, em, en) {
        eo[en] = ck(el)
    });

    function aW(em, el) {
        if (typeof em !== "string") {
            return em
        }
        if (!isNaN(em)) {
            return parseInt(em, 10)
        }
        em = el.weekdaysParse(em);
        if (typeof em === "number") {
            return em
        }
        return null
    }
    var H = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_");

    function ai(el, em) {
        return J(this._weekdays) ? this._weekdays[el.day()] : this._weekdays[this._weekdays.isFormat.test(em) ? "format" : "standalone"][el.day()]
    }
    var l = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_");

    function E(el) {
        return this._weekdaysShort[el.day()]
    }
    var a8 = "Su_Mo_Tu_We_Th_Fr_Sa".split("_");

    function dW(el) {
        return this._weekdaysMin[el.day()]
    }

    function bm(ep, eq, el) {
        var em, eo, en;
        if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._minWeekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._fullWeekdaysParse = []
        }
        for (em = 0; em < 7; em++) {
            eo = dp([2000, 1]).day(em);
            if (el && !this._fullWeekdaysParse[em]) {
                this._fullWeekdaysParse[em] = new RegExp("^" + this.weekdays(eo, "").replace(".", ".?") + "$", "i");
                this._shortWeekdaysParse[em] = new RegExp("^" + this.weekdaysShort(eo, "").replace(".", ".?") + "$", "i");
                this._minWeekdaysParse[em] = new RegExp("^" + this.weekdaysMin(eo, "").replace(".", ".?") + "$", "i")
            }
            if (!this._weekdaysParse[em]) {
                en = "^" + this.weekdays(eo, "") + "|^" + this.weekdaysShort(eo, "") + "|^" + this.weekdaysMin(eo, "");
                this._weekdaysParse[em] = new RegExp(en.replace(".", ""), "i")
            }
            if (el && eq === "dddd" && this._fullWeekdaysParse[em].test(ep)) {
                return em
            } else {
                if (el && eq === "ddd" && this._shortWeekdaysParse[em].test(ep)) {
                    return em
                } else {
                    if (el && eq === "dd" && this._minWeekdaysParse[em].test(ep)) {
                        return em
                    } else {
                        if (!el && this._weekdaysParse[em].test(ep)) {
                            return em
                        }
                    }
                }
            }
        }
    }

    function dD(em) {
        if (!this.isValid()) {
            return em != null ? this : NaN
        }
        var el = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
        if (em != null) {
            em = aW(em, this.localeData());
            return this.add(em - el, "d")
        } else {
            return el
        }
    }

    function R(el) {
        if (!this.isValid()) {
            return el != null ? this : NaN
        }
        var em = (this.day() + 7 - this.localeData()._week.dow) % 7;
        return el == null ? em : this.add(el - em, "d")
    }

    function bZ(el) {
        if (!this.isValid()) {
            return el != null ? this : NaN
        }
        return el == null ? this.day() || 7 : this.day(this.day() % 7 ? el : el - 7)
    }
    b2("DDD", ["DDDD", 3], "DDDo", "dayOfYear");
    bL("dayOfYear", "DDD");
    aS("DDD", ae);
    aS("DDDD", ap);
    bu(["DDD", "DDDD"], function (el, en, em) {
        em._dayOfYear = ck(el)
    });

    function aU(el) {
        var em = Math.round((this.clone().startOf("day") - this.clone().startOf("year")) / 86400000) + 1;
        return el == null ? em : this.add((el - em), "d")
    }

    function cY() {
        return this.hours() % 12 || 12
    }
    b2("H", ["HH", 2], 0, "hour");
    b2("h", ["hh", 2], 0, cY);
    b2("hmm", 0, 0, function () {
        return "" + cY.apply(this) + bU(this.minutes(), 2)
    });
    b2("hmmss", 0, 0, function () {
        return "" + cY.apply(this) + bU(this.minutes(), 2) + bU(this.seconds(), 2)
    });
    b2("Hmm", 0, 0, function () {
        return "" + this.hours() + bU(this.minutes(), 2)
    });
    b2("Hmmss", 0, 0, function () {
        return "" + this.hours() + bU(this.minutes(), 2) + bU(this.seconds(), 2)
    });

    function dF(el, em) {
        b2(el, 0, 0, function () {
            return this.localeData().meridiem(this.hours(), this.minutes(), em)
        })
    }
    dF("a", true);
    dF("A", false);
    bL("hour", "h");

    function G(em, el) {
        return el._meridiemParse
    }
    aS("a", G);
    aS("A", G);
    aS("H", af);
    aS("h", af);
    aS("HH", af, aq);
    aS("hh", af, aq);
    aS("hmm", bR);
    aS("hmmss", dw);
    aS("Hmm", bR);
    aS("Hmmss", dw);
    bu(["H", "HH"], dZ);
    bu(["a", "A"], function (el, en, em) {
        em._isPm = em._locale.isPM(el);
        em._meridiem = el
    });
    bu(["h", "hh"], function (el, en, em) {
        en[dZ] = ck(el);
        aQ(em).bigHour = true
    });
    bu("hmm", function (el, eo, em) {
        var en = el.length - 2;
        eo[dZ] = ck(el.substr(0, en));
        eo[c6] = ck(el.substr(en));
        aQ(em).bigHour = true
    });
    bu("hmmss", function (el, ep, em) {
        var eo = el.length - 4;
        var en = el.length - 2;
        ep[dZ] = ck(el.substr(0, eo));
        ep[c6] = ck(el.substr(eo, 2));
        ep[W] = ck(el.substr(en));
        aQ(em).bigHour = true
    });
    bu("Hmm", function (el, eo, em) {
        var en = el.length - 2;
        eo[dZ] = ck(el.substr(0, en));
        eo[c6] = ck(el.substr(en))
    });
    bu("Hmmss", function (el, ep, em) {
        var eo = el.length - 4;
        var en = el.length - 2;
        ep[dZ] = ck(el.substr(0, eo));
        ep[c6] = ck(el.substr(eo, 2));
        ep[W] = ck(el.substr(en))
    });

    function bJ(el) {
        return ((el + "").toLowerCase().charAt(0) === "p")
    }
    var bC = /[ap]\.?m?\.?/i;

    function ay(el, em, en) {
        if (el > 11) {
            return en ? "pm" : "PM"
        } else {
            return en ? "am" : "AM"
        }
    }
    var bV = du("Hours", true);
    b2("m", ["mm", 2], 0, "minute");
    bL("minute", "m");
    aS("m", af);
    aS("mm", af, aq);
    bu(["m", "mm"], c6);
    var d7 = du("Minutes", false);
    b2("s", ["ss", 2], 0, "second");
    bL("second", "s");
    aS("s", af);
    aS("ss", af, aq);
    bu(["s", "ss"], W);
    var bb = du("Seconds", false);
    b2("S", 0, 0, function () {
        return ~~(this.millisecond() / 100)
    });
    b2(0, ["SS", 2], 0, function () {
        return ~~(this.millisecond() / 10)
    });
    b2(0, ["SSS", 3], 0, "millisecond");
    b2(0, ["SSSS", 4], 0, function () {
        return this.millisecond() * 10
    });
    b2(0, ["SSSSS", 5], 0, function () {
        return this.millisecond() * 100
    });
    b2(0, ["SSSSSS", 6], 0, function () {
        return this.millisecond() * 1000
    });
    b2(0, ["SSSSSSS", 7], 0, function () {
        return this.millisecond() * 10000
    });
    b2(0, ["SSSSSSSS", 8], 0, function () {
        return this.millisecond() * 100000
    });
    b2(0, ["SSSSSSSSS", 9], 0, function () {
        return this.millisecond() * 1000000
    });
    bL("millisecond", "ms");
    aS("S", ae, ar);
    aS("SS", ae, aq);
    aS("SSS", ae, ap);
    var aZ;
    for (aZ = "SSSS"; aZ.length <= 9; aZ += "S") {
        aS(aZ, p)
    }

    function cy(el, em) {
        em[bk] = ck(("0." + el) * 1000)
    }
    for (aZ = "S"; aZ.length <= 9; aZ += "S") {
        bu(aZ, cy)
    }
    var bx = du("Milliseconds", false);
    b2("z", 0, 0, "zoneAbbr");
    b2("zz", 0, 0, "zoneName");

    function d3() {
        return this._isUTC ? "UTC" : ""
    }

    function dB() {
        return this._isUTC ? "Coordinated Universal Time" : ""
    }
    var cH = dJ.prototype;
    cH.add = bO;
    cH.calendar = bK;
    cH.clone = cR;
    cH.diff = B;
    cH.endOf = dO;
    cH.format = cA;
    cH.from = dd;
    cH.fromNow = c9;
    cH.to = V;
    cH.toNow = av;
    cH.get = dS;
    cH.invalidAt = b5;
    cH.isAfter = b8;
    cH.isBefore = d8;
    cH.isBetween = dI;
    cH.isSame = cd;
    cH.isSameOrAfter = d1;
    cH.isSameOrBefore = d6;
    cH.isValid = dQ;
    cH.lang = u;
    cH.locale = ej;
    cH.localeData = de;
    cH.max = dG;
    cH.min = cf;
    cH.parsingFlags = c3;
    cH.set = dS;
    cH.startOf = bE;
    cH.subtract = aB;
    cH.toArray = c7;
    cH.toObject = df;
    cH.toDate = cv;
    cH.toISOString = b4;
    cH.toJSON = cB;
    cH.toString = dl;
    cH.unix = be;
    cH.valueOf = X;
    cH.creationData = d9;
    cH.year = cb;
    cH.isLeapYear = cn;
    cH.weekYear = a5;
    cH.isoWeekYear = di;
    cH.quarter = cH.quarters = bz;
    cH.month = dY;
    cH.daysInMonth = bn;
    cH.week = cH.weeks = A;
    cH.isoWeek = cH.isoWeeks = t;
    cH.weeksInYear = z;
    cH.isoWeeksInYear = cD;
    cH.date = bT;
    cH.day = cH.days = dD;
    cH.weekday = R;
    cH.isoWeekday = bZ;
    cH.dayOfYear = aU;
    cH.hour = cH.hours = bV;
    cH.minute = cH.minutes = d7;
    cH.second = cH.seconds = bb;
    cH.millisecond = cH.milliseconds = bx;
    cH.utcOffset = cV;
    cH.utc = aC;
    cH.local = cS;
    cH.parseZone = bF;
    cH.hasAlignedHourOffset = aj;
    cH.isDST = at;
    cH.isDSTShifted = d;
    cH.isLocal = cW;
    cH.isUtcOffset = bs;
    cH.isUtc = c1;
    cH.isUTC = c1;
    cH.zoneAbbr = d3;
    cH.zoneName = dB;
    cH.dates = dz("dates accessor is deprecated. Use date instead.", bT);
    cH.months = dz("months accessor is deprecated. Use month instead", dY);
    cH.years = dz("years accessor is deprecated. Use year instead", cb);
    cH.zone = dz("moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779", cQ);
    var a = cH;

    function P(el) {
        return dp(el * 1000)
    }

    function cp() {
        return dp.apply(null, arguments).parseZone()
    }
    var bQ = {
        sameDay: "[Today at] LT",
        nextDay: "[Tomorrow at] LT",
        nextWeek: "dddd [at] LT",
        lastDay: "[Yesterday at] LT",
        lastWeek: "[Last] dddd [at] LT",
        sameElse: "L"
    };

    function K(en, eo, em) {
        var el = this._calendar[en];
        return aJ(el) ? el.call(eo, em) : el
    }
    var dg = {
        LTS: "h:mm:ss A",
        LT: "h:mm A",
        L: "MM/DD/YYYY",
        LL: "MMMM D, YYYY",
        LLL: "MMMM D, YYYY h:mm A",
        LLLL: "dddd, MMMM D, YYYY h:mm A"
    };

    function cg(el) {
        var em = this._longDateFormat[el],
            en = this._longDateFormat[el.toUpperCase()];
        if (em || !en) {
            return em
        }
        this._longDateFormat[el] = en.replace(/MMMM|MM|DD|dddd/g, function (eo) {
            return eo.slice(1)
        });
        return this._longDateFormat[el]
    }
    var ab = "Invalid date";

    function dH() {
        return this._invalidDate
    }
    var bD = "%d";
    var a9 = /\d{1,2}/;

    function dU(el) {
        return this._ordinal.replace("%d", el)
    }

    function cX(el) {
        return el
    }
    var dT = {
        future: "in %s",
        past: "%s ago",
        s: "a few seconds",
        m: "a minute",
        mm: "%d minutes",
        h: "an hour",
        hh: "%d hours",
        d: "a day",
        dd: "%d days",
        M: "a month",
        MM: "%d months",
        y: "a year",
        yy: "%d years"
    };

    function bS(eo, en, em, ep) {
        var el = this._relativeTime[em];
        return (aJ(el)) ? el(eo, en, em, ep) : el.replace(/%d/i, eo)
    }

    function dh(en, el) {
        var em = this._relativeTime[en > 0 ? "future" : "past"];
        return aJ(em) ? em(el) : em.replace(/%s/i, el)
    }

    function da(el) {
        var en, em;
        for (em in el) {
            en = el[em];
            if (aJ(en)) {
                this[em] = en
            } else {
                this["_" + em] = en
            }
        }
        this._ordinalParseLenient = new RegExp(this._ordinalParse.source + "|" + (/\d{1,2}/).source)
    }
    var cz = b7.prototype;
    cz._calendar = bQ;
    cz.calendar = K;
    cz._longDateFormat = dg;
    cz.longDateFormat = cg;
    cz._invalidDate = ab;
    cz.invalidDate = dH;
    cz._ordinal = bD;
    cz.ordinal = dU;
    cz._ordinalParse = a9;
    cz.preparse = cX;
    cz.postformat = cX;
    cz._relativeTime = dT;
    cz.relativeTime = bS;
    cz.pastFuture = dh;
    cz.set = da;
    cz.months = aD;
    cz._months = F;
    cz.monthsShort = aP;
    cz._monthsShort = dk;
    cz.monthsParse = cE;
    cz._monthsRegex = dP;
    cz.monthsRegex = ct;
    cz._monthsShortRegex = cJ;
    cz.monthsShortRegex = cM;
    cz.week = a4;
    cz._week = bA;
    cz.firstDayOfYear = cC;
    cz.firstDayOfWeek = U;
    cz.weekdays = ai;
    cz._weekdays = H;
    cz.weekdaysMin = dW;
    cz._weekdaysMin = a8;
    cz.weekdaysShort = E;
    cz._weekdaysShort = l;
    cz.weekdaysParse = bm;
    cz.isPM = bJ;
    cz._meridiemParse = bC;
    cz.meridiem = ay;

    function aN(ep, em, eo, eq) {
        var el = q();
        var en = dC().set(eq, em);
        return el[eo](en, ep)
    }

    function dx(eq, em, ep, eo, er) {
        if (typeof eq === "number") {
            em = eq;
            eq = undefined
        }
        eq = eq || "";
        if (em != null) {
            return aN(eq, em, ep, er)
        }
        var en;
        var el = [];
        for (en = 0; en < eo; en++) {
            el[en] = aN(eq, en, ep, er)
        }
        return el
    }

    function ek(em, el) {
        return dx(em, el, "months", 12, "month")
    }

    function bP(em, el) {
        return dx(em, el, "monthsShort", 12, "month")
    }

    function aI(em, el) {
        return dx(em, el, "weekdays", 7, "day")
    }

    function ed(em, el) {
        return dx(em, el, "weekdaysShort", 7, "day")
    }

    function D(em, el) {
        return dx(em, el, "weekdaysMin", 7, "day")
    }
    ce("en", {
        ordinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal: function (en) {
            var el = en % 10,
                em = (ck(en % 100 / 10) === 1) ? "th" : (el === 1) ? "st" : (el === 2) ? "nd" : (el === 3) ? "rd" : "th";
            return en + em
        }
    });
    bt.lang = dz("moment.lang is deprecated. Use moment.locale instead.", ce);
    bt.langData = dz("moment.langData is deprecated. Use moment.localeData instead.", q);
    var dR = Math.abs;

    function Y() {
        var el = this._data;
        this._milliseconds = dR(this._milliseconds);
        this._days = dR(this._days);
        this._months = dR(this._months);
        el.milliseconds = dR(el.milliseconds);
        el.seconds = dR(el.seconds);
        el.minutes = dR(el.minutes);
        el.hours = dR(el.hours);
        el.months = dR(el.months);
        el.years = dR(el.years);
        return this
    }

    function a2(ep, em, en, eo) {
        var el = dy(em, en);
        ep._milliseconds += eo * el._milliseconds;
        ep._days += eo * el._days;
        ep._months += eo * el._months;
        return ep._bubble()
    }

    function a6(el, em) {
        return a2(this, el, em, 1)
    }

    function c0(el, em) {
        return a2(this, el, em, -1)
    }

    function dX(el) {
        if (el < 0) {
            return Math.floor(el)
        } else {
            return Math.ceil(el)
        }
    }

    function co() {
        var en = this._milliseconds;
        var et = this._days;
        var el = this._months;
        var ep = this._data;
        var es, eo, er, eq, em;
        if (!((en >= 0 && et >= 0 && el >= 0) || (en <= 0 && et <= 0 && el <= 0))) {
            en += dX(eh(el) + et) * 86400000;
            et = 0;
            el = 0
        }
        ep.milliseconds = en % 1000;
        es = cK(en / 1000);
        ep.seconds = es % 60;
        eo = cK(es / 60);
        ep.minutes = eo % 60;
        er = cK(eo / 60);
        ep.hours = er % 24;
        et += cK(er / 24);
        em = cK(g(et));
        el += em;
        et -= dX(eh(em));
        eq = cK(el / 12);
        el %= 12;
        ep.days = et;
        ep.months = el;
        ep.years = eq;
        return this
    }

    function g(el) {
        return el * 4800 / 146097
    }

    function eh(el) {
        return el * 146097 / 4800
    }

    function d0(em) {
        var eo;
        var el;
        var en = this._milliseconds;
        em = cj(em);
        if (em === "month" || em === "year") {
            eo = this._days + en / 86400000;
            el = this._months + g(eo);
            return em === "month" ? el : el / 12
        } else {
            eo = this._days + Math.round(eh(this._months));
            switch (em) {
                case "week":
                    return eo / 7 + en / 604800000;
                case "day":
                    return eo + en / 86400000;
                case "hour":
                    return eo * 24 + en / 3600000;
                case "minute":
                    return eo * 1440 + en / 60000;
                case "second":
                    return eo * 86400 + en / 1000;
                case "millisecond":
                    return Math.floor(eo * 86400000) + en;
                default:
                    throw new Error("Unknown unit " + em)
            }
        }
    }

    function cq() {
        return (this._milliseconds + this._days * 86400000 + (this._months % 12) * 2592000000 + ck(this._months / 12) * 31536000000)
    }

    function dq(el) {
        return function () {
            return this.as(el)
        }
    }
    var ei = dq("ms");
    var C = dq("s");
    var cU = dq("m");
    var r = dq("h");
    var dt = dq("d");
    var dc = dq("w");
    var dn = dq("M");
    var aY = dq("y");

    function a0(el) {
        el = cj(el);
        return this[el + "s"]()
    }

    function bG(el) {
        return function () {
            return this._data[el]
        }
    }
    var e = bG("milliseconds");
    var aV = bG("seconds");
    var am = bG("minutes");
    var I = bG("hours");
    var aT = bG("days");
    var d5 = bG("months");
    var bl = bG("years");

    function dv() {
        return cK(this.days() / 7)
    }
    var cu = Math.round;
    var c5 = {
        s: 45,
        m: 45,
        h: 22,
        d: 26,
        M: 11
    };

    function Z(em, eo, en, ep, el) {
        return el.relativeTime(eo || 1, !!en, em, ep)
    }

    function cG(ep, em, et) {
        var en = dy(ep).abs();
        var eu = cu(en.as("s"));
        var eo = cu(en.as("m"));
        var es = cu(en.as("h"));
        var ev = cu(en.as("d"));
        var el = cu(en.as("M"));
        var eq = cu(en.as("y"));
        var er = eu < c5.s && ["s", eu] || eo <= 1 && ["m"] || eo < c5.m && ["mm", eo] || es <= 1 && ["h"] || es < c5.h && ["hh", es] || ev <= 1 && ["d"] || ev < c5.d && ["dd", ev] || el <= 1 && ["M"] || el < c5.M && ["MM", el] || eq <= 1 && ["y"] || ["yy", eq];
        er[2] = em;
        er[3] = +ep > 0;
        er[4] = et;
        return Z.apply(null, er)
    }

    function aM(el, em) {
        if (c5[el] === undefined) {
            return false
        }
        if (em === undefined) {
            return c5[el]
        }
        c5[el] = em;
        return true
    }

    function c(en) {
        var el = this.localeData();
        var em = cG(this, !en, el);
        if (en) {
            em = el.pastFuture(+this, em)
        }
        return el.postformat(em)
    }
    var aA = Math.abs;

    function d4() {
        var ev = aA(this._milliseconds) / 1000;
        var ew = aA(this._days);
        var en = aA(this._months);
        var ep, eu, er;
        ep = cK(ev / 60);
        eu = cK(ep / 60);
        ev %= 60;
        ep %= 60;
        er = cK(en / 12);
        en %= 12;
        var em = er;
        var es = en;
        var el = ew;
        var eq = eu;
        var eo = ep;
        var ex = ev;
        var et = this.asSeconds();
        if (!et) {
            return "P0D"
        }
        return (et < 0 ? "-" : "") + "P" + (em ? em + "Y" : "") + (es ? es + "M" : "") + (el ? el + "D" : "") + ((eq || eo || ex) ? "T" : "") + (eq ? eq + "H" : "") + (eo ? eo + "M" : "") + (ex ? ex + "S" : "")
    }
    var dm = db.prototype;
    dm.abs = Y;
    dm.add = a6;
    dm.subtract = c0;
    dm.as = d0;
    dm.asMilliseconds = ei;
    dm.asSeconds = C;
    dm.asMinutes = cU;
    dm.asHours = r;
    dm.asDays = dt;
    dm.asWeeks = dc;
    dm.asMonths = dn;
    dm.asYears = aY;
    dm.valueOf = cq;
    dm._bubble = co;
    dm.get = a0;
    dm.milliseconds = e;
    dm.seconds = aV;
    dm.minutes = am;
    dm.hours = I;
    dm.days = aT;
    dm.weeks = dv;
    dm.months = d5;
    dm.years = bl;
    dm.humanize = c;
    dm.toISOString = d4;
    dm.toString = d4;
    dm.toJSON = d4;
    dm.locale = ej;
    dm.localeData = de;
    dm.toIsoString = dz("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", d4);
    dm.lang = u;
    b2("X", 0, 0, "unix");
    b2("x", 0, 0, "valueOf");
    aS("x", v);
    aS("X", eb);
    bu("X", function (el, en, em) {
        em._d = new Date(parseFloat(el, 10) * 1000)
    });
    bu("x", function (el, en, em) {
        em._d = new Date(ck(el))
    });
    bt.version = "2.11.2";
    aw(dp);
    bt.fn = a;
    bt.min = n;
    bt.max = a1;
    bt.now = b3;
    bt.utc = dC;
    bt.unix = P;
    bt.months = ek;
    bt.isDate = dM;
    bt.locale = ce;
    bt.invalid = cc;
    bt.duration = dy;
    bt.isMoment = bI;
    bt.weekdays = aI;
    bt.parseZone = cp;
    bt.localeData = q;
    bt.isDuration = S;
    bt.monthsShort = bP;
    bt.weekdaysMin = D;
    bt.defineLocale = b6;
    bt.weekdaysShort = ed;
    bt.normalizeUnits = cj;
    bt.relativeTimeThreshold = aM;
    bt.prototype = a;
    var cx = bt;
    return cx
}));
(function (a, b) {
    if (typeof define === "function" && define.amd) {
        define(["moment"], b)
    } else {
        if (typeof module === "object" && module.exports) {
            module.exports = b(require("moment"))
        } else {
            b(a.moment)
        }
    }
}(this, function (E) {
    if (E.tz !== undefined) {
        e("Moment Timezone " + E.tz.version + " was already loaded " + (E.tz.dataVersion ? "with data from " : "without any data") + E.tz.dataVersion);
        return E
    }
    var q = "0.5.0",
        j = {},
        z = {},
        K = {},
        B = {},
        A, t = E.version.split("."),
        l = +t[0],
        c = +t[1];
    if (l < 2 || (l === 2 && c < 6)) {
        e("Moment Timezone requires Moment.js >= 2.6.0. You are using Moment.js " + E.version + ". See momentjs.com")
    }

    function b(O) {
        if (O > 96) {
            return O - 87
        } else {
            if (O > 64) {
                return O - 29
            }
        }
        return O - 48
    }

    function w(U) {
        var S = 0,
            Q = U.split("."),
            V = Q[0],
            P = Q[1] || "",
            W = 1,
            T, R = 0,
            O = 1;
        if (U.charCodeAt(0) === 45) {
            S = 1;
            O = -1
        }
        for (S; S < V.length; S++) {
            T = b(V.charCodeAt(S));
            R = 60 * R + T
        }
        for (S = 0; S < P.length; S++) {
            W = W / 60;
            T = b(P.charCodeAt(S));
            R += T * W
        }
        return R * O
    }

    function o(P) {
        for (var O = 0; O < P.length; O++) {
            P[O] = w(P[O])
        }
    }

    function m(Q, P) {
        for (var O = 0; O < P; O++) {
            Q[O] = Math.round((Q[O - 1] || 0) + (Q[O] * 60000))
        }
        Q[P - 1] = Infinity
    }

    function D(Q, R) {
        var O = [],
            P;
        for (P = 0; P < R.length; P++) {
            O[P] = Q[R[P]]
        }
        return O
    }

    function x(O) {
        var Q = O.split("|"),
            P = Q[2].split(" "),
            S = Q[3].split(""),
            R = Q[4].split(" ");
        o(P);
        o(S);
        o(R);
        m(R, S.length);
        return {
            name: Q[0],
            abbrs: D(Q[1].split(" "), S),
            offsets: D(P, S),
            untils: R,
            population: Q[5] | 0
        }
    }

    function d(O) {
        if (O) {
            this._set(x(O))
        }
    }
    d.prototype = {
        _set: function (O) {
            this.name = O.name;
            this.abbrs = O.abbrs;
            this.untils = O.untils;
            this.offsets = O.offsets;
            this.population = O.population
        },
        _index: function (P) {
            var Q = +P,
                R = this.untils,
                O;
            for (O = 0; O < R.length; O++) {
                if (Q < R[O]) {
                    return O
                }
            }
        },
        parse: function (V) {
            var U = +V,
                P = this.offsets,
                O = this.untils,
                W = O.length - 1,
                R, T, Q, S;
            for (S = 0; S < W; S++) {
                R = P[S];
                T = P[S + 1];
                Q = P[S ? S - 1 : S];
                if (R < T && I.moveAmbiguousForward) {
                    R = T
                } else {
                    if (R > Q && I.moveInvalidForward) {
                        R = Q
                    }
                }
                if (U < O[S] - (R * 60000)) {
                    return P[S]
                }
            }
            return P[W]
        },
        abbr: function (O) {
            return this.abbrs[this._index(O)]
        },
        offset: function (O) {
            return this.offsets[this._index(O)]
        }
    };

    function f(O) {
        var Q = O.toTimeString();
        var P = Q.match(/\(.+\)/);
        if (P && P[0]) {
            P = P[0].match(/[A-Z]/g).join("")
        } else {
            P = Q.match(/[A-Z]{3,5}/g)[0]
        }
        if (P === "GMT") {
            P = undefined
        }
        this.at = +O;
        this.abbr = P;
        this.offset = O.getTimezoneOffset()
    }

    function i(O) {
        this.zone = O;
        this.offsetScore = 0;
        this.abbrScore = 0
    }
    i.prototype.scoreOffsetAt = function (O) {
        this.offsetScore += Math.abs(this.zone.offset(O.at) - O.offset);
        if (this.zone.abbr(O.at).match(/[A-Z]/g).join("") !== O.abbr) {
            this.abbrScore++
        }
    };

    function k(O, Q) {
        var P, R;
        while ((R = ((Q.at - O.at) / 120000 | 0) * 60000)) {
            P = new f(new Date(O.at + R));
            if (P.offset === O.offset) {
                O = P
            } else {
                Q = P
            }
        }
        return O
    }

    function n() {
        var O = new Date().getFullYear() - 2,
            S = new f(new Date(O, 0, 1)),
            R = [S],
            T, Q, P;
        for (P = 1; P < 48; P++) {
            Q = new f(new Date(O, P, 1));
            if (Q.offset !== S.offset) {
                T = k(S, Q);
                R.push(T);
                R.push(new f(new Date(T.at + 60000)))
            }
            S = Q
        }
        for (P = 0; P < 4; P++) {
            R.push(new f(new Date(O + P, 0, 1)));
            R.push(new f(new Date(O + P, 6, 1)))
        }
        return R
    }

    function v(P, O) {
        if (P.offsetScore !== O.offsetScore) {
            return P.offsetScore - O.offsetScore
        }
        if (P.abbrScore !== O.abbrScore) {
            return P.abbrScore - O.abbrScore
        }
        return O.zone.population - P.zone.population
    }

    function F(O, Q) {
        var P, R;
        o(Q);
        for (P = 0; P < Q.length; P++) {
            R = Q[P];
            B[R] = B[R] || {};
            B[R][O] = true
        }
    }

    function N(U) {
        var O = U.length,
            T = {},
            Q = [],
            R, P, S;
        for (R = 0; R < O; R++) {
            S = B[U[R].offset] || {};
            for (P in S) {
                if (S.hasOwnProperty(P)) {
                    T[P] = true
                }
            }
        }
        for (R in T) {
            if (T.hasOwnProperty(R)) {
                Q.push(K[R])
            }
        }
        return Q
    }

    function M() {
        var T = n(),
            P = T.length,
            U = N(T),
            O = [],
            R, S, Q;
        for (S = 0; S < U.length; S++) {
            R = new i(C(U[S]), P);
            for (Q = 0; Q < P; Q++) {
                R.scoreOffsetAt(T[Q])
            }
            O.push(R)
        }
        O.sort(v);
        return O.length > 0 ? O[0].zone.name : undefined
    }

    function r(O) {
        if (!A || O) {
            A = M()
        }
        return A
    }

    function H(O) {
        return (O || "").toLowerCase().replace(/\//g, "_")
    }

    function y(O) {
        var R, P, Q, S;
        if (typeof O === "string") {
            O = [O]
        }
        for (R = 0; R < O.length; R++) {
            Q = O[R].split("|");
            P = Q[0];
            S = H(P);
            j[S] = O[R];
            K[S] = P;
            if (Q[5]) {
                F(S, Q[2].split(" "))
            }
        }
    }

    function C(Q, P) {
        Q = H(Q);
        var O = j[Q];
        var R;
        if (O instanceof d) {
            return O
        }
        if (typeof O === "string") {
            O = new d(O);
            j[Q] = O;
            return O
        }
        if (z[Q] && P !== C && (R = C(z[Q], C))) {
            O = j[Q] = new d();
            O._set(R);
            O.name = K[Q];
            return O
        }
        return null
    }

    function G() {
        var P, O = [];
        for (P in K) {
            if (K.hasOwnProperty(P) && (j[P] || j[z[P]]) && K[P]) {
                O.push(K[P])
            }
        }
        return O.sort()
    }

    function s(O) {
        var Q, P, S, R;
        if (typeof O === "string") {
            O = [O]
        }
        for (Q = 0; Q < O.length; Q++) {
            P = O[Q].split("|");
            S = H(P[0]);
            R = H(P[1]);
            K[S] = P[0];
            z[R] = S;
            K[R] = P[1]
        }
    }

    function h(O) {
        y(O.zones);
        s(O.links);
        I.dataVersion = O.version
    }

    function L(O) {
        if (!L.didShowError) {
            L.didShowError = true;
            e("moment.tz.zoneExists('" + O + "') has been deprecated in favor of !moment.tz.zone('" + O + "')")
        }
        return !!C(O)
    }

    function p(O) {
        return !!(O._a && (O._tzm === undefined))
    }

    function e(O) {
        if (typeof console !== "undefined" && typeof console.error === "function") {
            console.error(O)
        }
    }

    function I(P) {
        var S = Array.prototype.slice.call(arguments, 0, -1),
            R = arguments[arguments.length - 1],
            O = C(R),
            Q = E.utc.apply(null, S);
        if (O && !E.isMoment(P) && p(Q)) {
            Q.add(O.parse(Q), "minutes")
        }
        Q.tz(R);
        return Q
    }
    I.version = q;
    I.dataVersion = "";
    I._zones = j;
    I._links = z;
    I._names = K;
    I.add = y;
    I.link = s;
    I.load = h;
    I.zone = C;
    I.zoneExists = L;
    I.guess = r;
    I.names = G;
    I.Zone = d;
    I.unpack = x;
    I.unpackBase60 = w;
    I.needsOffset = p;
    I.moveInvalidForward = true;
    I.moveAmbiguousForward = false;
    var u = E.fn;
    E.tz = I;
    E.defaultZone = null;
    E.updateOffset = function (P, Q) {
        var O = E.defaultZone,
            R;
        if (P._z === undefined) {
            if (O && p(P) && !P._isUTC) {
                P._d = E.utc(P._a)._d;
                P.utc().add(O.parse(P), "minutes")
            }
            P._z = O
        }
        if (P._z) {
            R = P._z.offset(P);
            if (Math.abs(R) < 16) {
                R = R / 60
            }
            if (P.utcOffset !== undefined) {
                P.utcOffset(-R, Q)
            } else {
                P.zone(R, Q)
            }
        }
    };
    u.tz = function (O) {
        if (O) {
            this._z = C(O);
            if (this._z) {
                E.updateOffset(this)
            } else {
                e("Moment Timezone has no data for " + O + ". See http://momentjs.com/timezone/docs/#/data-loading/.")
            }
            return this
        }
        if (this._z) {
            return this._z.name
        }
    };

    function J(O) {
        return function () {
            if (this._z) {
                return this._z.abbr(this)
            }
            return O.call(this)
        }
    }

    function a(O) {
        return function () {
            this._z = null;
            return O.apply(this, arguments)
        }
    }
    u.zoneName = J(u.zoneName);
    u.zoneAbbr = J(u.zoneAbbr);
    u.utc = a(u.utc);
    E.tz.setDefault = function (O) {
        if (l < 2 || (l === 2 && c < 9)) {
            e("Moment Timezone setDefault() requires Moment.js >= 2.9.0. You are using Moment.js " + E.version + ".")
        }
        E.defaultZone = O ? C(O) : null;
        return E
    };
    var g = E.momentProperties;
    if (Object.prototype.toString.call(g) === "[object Array]") {
        g.push("_z");
        g.push("_a")
    } else {
        if (g) {
            g._z = null
        }
    }
    h({
        version: "2015g",
        zones: ["Africa/Abidjan|GMT|0|0||48e5", "Africa/Khartoum|EAT|-30|0||51e5", "Africa/Algiers|CET|-10|0||26e5", "Africa/Lagos|WAT|-10|0||17e6", "Africa/Maputo|CAT|-20|0||26e5", "Africa/Cairo|EET EEST|-20 -30|010101010|1Cby0 Fb0 c10 8n0 8Nd0 gL0 e10 mn0|15e6", "Africa/Casablanca|WET WEST|0 -10|01010101010101010101010101010101010101010|1Cco0 Db0 1zd0 Lz0 1Nf0 wM0 co0 go0 1o00 s00 dA0 vc0 11A0 A00 e00 y00 11A0 uM0 e00 Dc0 11A0 s00 e00 IM0 WM0 mo0 gM0 LA0 WM0 jA0 e00 Rc0 11A0 e00 e00 U00 11A0 8o0 e00 11A0|32e5", "Europe/Paris|CET CEST|-10 -20|01010101010101010101010|1BWp0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|11e6", "Africa/Johannesburg|SAST|-20|0||84e5", "Africa/Tripoli|EET CET CEST|-20 -10 -20|0120|1IlA0 TA0 1o00|11e5", "Africa/Windhoek|WAST WAT|-20 -10|01010101010101010101010|1C1c0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 11B0|32e4", "America/Adak|HST HDT|a0 90|01010101010101010101010|1BR00 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|326", "America/Anchorage|AKST AKDT|90 80|01010101010101010101010|1BQX0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|30e4", "America/Santo_Domingo|AST|40|0||29e5", "America/Araguaina|BRT BRST|30 20|010|1IdD0 Lz0|14e4", "America/Argentina/Buenos_Aires|ART|30|0|", "America/Asuncion|PYST PYT|30 40|01010101010101010101010|1C430 1a10 1fz0 1a10 1fz0 1cN0 17b0 1ip0 17b0 1ip0 17b0 1ip0 19X0 1fB0 19X0 1fB0 19X0 1ip0 17b0 1ip0 17b0 1ip0|28e5", "America/Panama|EST|50|0||15e5", "America/Bahia|BRT BRST|30 20|010|1FJf0 Rb0|27e5", "America/Bahia_Banderas|MST CDT CST|70 50 60|01212121212121212121212|1C1l0 1nW0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0|84e3", "America/Fortaleza|BRT|30|0||34e5", "America/Managua|CST|60|0||22e5", "America/Manaus|AMT|40|0||19e5", "America/Bogota|COT|50|0||90e5", "America/Denver|MST MDT|70 60|01010101010101010101010|1BQV0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|26e5", "America/Campo_Grande|AMST AMT|30 40|01010101010101010101010|1BIr0 1zd0 On0 1zd0 Rb0 1zd0 Lz0 1C10 Lz0 1C10 On0 1zd0 On0 1zd0 On0 1zd0 On0 1C10 Lz0 1C10 Lz0 1C10|77e4", "America/Cancun|CST CDT EST|60 50 50|010101010102|1C1k0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 Dd0|63e4", "America/Caracas|VET|4u|0||29e5", "America/Cayenne|GFT|30|0||58e3", "America/Cayman|EST EDT|50 40|01010101010|1Qtj0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|58e3", "America/Chicago|CST CDT|60 50|01010101010101010101010|1BQU0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|92e5", "America/Chihuahua|MST MDT|70 60|01010101010101010101010|1C1l0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0|81e4", "America/Phoenix|MST|70|0||42e5", "America/Los_Angeles|PST PDT|80 70|01010101010101010101010|1BQW0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|15e6", "America/New_York|EST EDT|50 40|01010101010101010101010|1BQT0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|21e6", "America/Rio_Branco|AMT ACT|40 50|01|1KLE0|31e4", "America/Fort_Nelson|PST PDT MST|80 70 70|010101010102|1BQW0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0|39e2", "America/Halifax|AST ADT|40 30|01010101010101010101010|1BQS0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|39e4", "America/Godthab|WGT WGST|30 20|01010101010101010101010|1BWp0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|17e3", "America/Goose_Bay|AST ADT|40 30|01010101010101010101010|1BQQ1 1zb0 Op0 1zcX Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|76e2", "America/Grand_Turk|EST EDT AST|50 40 40|0101010101012|1BQT0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|37e2", "America/Guayaquil|ECT|50|0||27e5", "America/Guyana|GYT|40|0||80e4", "America/Havana|CST CDT|50 40|01010101010101010101010|1BQR0 1wo0 U00 1zc0 U00 1qM0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0|21e5", "America/La_Paz|BOT|40|0||19e5", "America/Lima|PET|50|0||11e6", "America/Mexico_City|CST CDT|60 50|01010101010101010101010|1C1k0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0|20e6", "America/Metlakatla|PST|80|0||14e2", "America/Miquelon|PMST PMDT|30 20|01010101010101010101010|1BQR0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|61e2", "America/Montevideo|UYST UYT|20 30|010101010101|1BQQ0 1ld0 14n0 1ld0 14n0 1o10 11z0 1o10 11z0 1o10 11z0|17e5", "America/Noronha|FNT|20|0||30e2", "America/North_Dakota/Beulah|MST MDT CST CDT|70 60 60 50|01232323232323232323232|1BQV0 1zb0 Oo0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0", "America/Paramaribo|SRT|30|0||24e4", "America/Port-au-Prince|EST EDT|50 40|0101010101010101010|1GI70 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|23e5", "America/Santa_Isabel|PST PDT|80 70|01010101010101010101010|1C1m0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0|23e3", "America/Santiago|CLST CLT CLT|30 40 30|010101010102|1C1f0 1fB0 1nX0 G10 1EL0 Op0 1zb0 Rd0 1wn0 Rd0 1wn0|62e5", "America/Sao_Paulo|BRST BRT|20 30|01010101010101010101010|1BIq0 1zd0 On0 1zd0 Rb0 1zd0 Lz0 1C10 Lz0 1C10 On0 1zd0 On0 1zd0 On0 1zd0 On0 1C10 Lz0 1C10 Lz0 1C10|20e6", "America/Scoresbysund|EGT EGST|10 0|01010101010101010101010|1BWp0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|452", "America/St_Johns|NST NDT|3u 2u|01010101010101010101010|1BQPv 1zb0 Op0 1zcX Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|11e4", "Antarctica/Casey|CAST AWST|-b0 -80|0101|1BN30 40P0 KL0|10", "Antarctica/Davis|DAVT DAVT|-50 -70|0101|1BPw0 3Wn0 KN0|70", "Antarctica/DumontDUrville|DDUT|-a0|0||80", "Antarctica/Macquarie|AEDT MIST|-b0 -b0|01|1C140|1", "Antarctica/Mawson|MAWT|-50|0||60", "Pacific/Auckland|NZDT NZST|-d0 -c0|01010101010101010101010|1C120 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00|14e5", "Antarctica/Rothera|ROTT|30|0||130", "Antarctica/Syowa|SYOT|-30|0||20", "Antarctica/Troll|UTC CEST|0 -20|01010101010101010101010|1BWp0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|40", "Antarctica/Vostok|VOST|-60|0||25", "Asia/Baghdad|AST|-30|0||66e5", "Asia/Almaty|ALMT|-60|0||15e5", "Asia/Amman|EET EEST|-20 -30|010101010101010101010|1BVy0 1qM0 11A0 1o00 11A0 4bX0 Dd0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0|25e5", "Asia/Anadyr|ANAT ANAST ANAT|-c0 -c0 -b0|0120|1BWe0 1qN0 WM0|13e3", "Asia/Aqtobe|AQTT|-50|0||27e4", "Asia/Ashgabat|TMT|-50|0||41e4", "Asia/Baku|AZT AZST|-40 -50|01010101010101010101010|1BWo0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|27e5", "Asia/Bangkok|ICT|-70|0||15e6", "Asia/Beirut|EET EEST|-20 -30|01010101010101010101010|1BWm0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0|22e5", "Asia/Bishkek|KGT|-60|0||87e4", "Asia/Brunei|BNT|-80|0||42e4", "Asia/Kolkata|IST|-5u|0||15e6", "Asia/Chita|YAKT YAKST YAKT IRKT|-90 -a0 -a0 -80|01023|1BWh0 1qM0 WM0 8Hz0|33e4", "Asia/Choibalsan|CHOT CHOST|-80 -90|0101010101010|1O8G0 1cJ0 1cP0 1cJ0 1cP0 1fx0 1cP0 1cJ0 1cP0 1cJ0 1cP0 1cJ0|38e3", "Asia/Shanghai|CST|-80|0||23e6", "Asia/Dhaka|BDT|-60|0||16e6", "Asia/Damascus|EET EEST|-20 -30|01010101010101010101010|1C0m0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0|26e5", "Asia/Dili|TLT|-90|0||19e4", "Asia/Dubai|GST|-40|0||39e5", "Asia/Dushanbe|TJT|-50|0||76e4", "Asia/Gaza|EET EEST|-20 -30|01010101010101010101010|1BVW1 SKX 1xd1 MKX 1AN0 1a00 1fA0 1cL0 1cN0 1nX0 1210 1nz0 1210 1nz0 14N0 1nz0 1210 1nz0 1210 1nz0 1210 1nz0|18e5", "Asia/Hebron|EET EEST|-20 -30|0101010101010101010101010|1BVy0 Tb0 1xd1 MKX bB0 cn0 1cN0 1a00 1fA0 1cL0 1cN0 1nX0 1210 1nz0 1210 1nz0 14N0 1nz0 1210 1nz0 1210 1nz0 1210 1nz0|25e4", "Asia/Hong_Kong|HKT|-80|0||73e5", "Asia/Hovd|HOVT HOVST|-70 -80|0101010101010|1O8H0 1cJ0 1cP0 1cJ0 1cP0 1fx0 1cP0 1cJ0 1cP0 1cJ0 1cP0 1cJ0|81e3", "Asia/Irkutsk|IRKT IRKST IRKT|-80 -90 -90|01020|1BWi0 1qM0 WM0 8Hz0|60e4", "Europe/Istanbul|EET EEST|-20 -30|01010101010101010101010|1BWp0 1qM0 Xc0 1qo0 WM0 1qM0 11A0 1o00 1200 1nA0 11A0 1tA0 U00 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|13e6", "Asia/Jakarta|WIB|-70|0||31e6", "Asia/Jayapura|WIT|-90|0||26e4", "Asia/Jerusalem|IST IDT|-20 -30|01010101010101010101010|1BVA0 17X0 1kp0 1dz0 1c10 1aL0 1eN0 1oL0 10N0 1oL0 10N0 1oL0 10N0 1rz0 W10 1rz0 W10 1rz0 10N0 1oL0 10N0 1oL0|81e4", "Asia/Kabul|AFT|-4u|0||46e5", "Asia/Kamchatka|PETT PETST PETT|-c0 -c0 -b0|0120|1BWe0 1qN0 WM0|18e4", "Asia/Karachi|PKT|-50|0||24e6", "Asia/Urumqi|XJT|-60|0||32e5", "Asia/Kathmandu|NPT|-5J|0||12e5", "Asia/Khandyga|VLAT VLAST VLAT YAKT YAKT|-a0 -b0 -b0 -a0 -90|010234|1BWg0 1qM0 WM0 17V0 7zD0|66e2", "Asia/Krasnoyarsk|KRAT KRAST KRAT|-70 -80 -80|01020|1BWj0 1qM0 WM0 8Hz0|10e5", "Asia/Kuala_Lumpur|MYT|-80|0||71e5", "Asia/Magadan|MAGT MAGST MAGT MAGT|-b0 -c0 -c0 -a0|01023|1BWf0 1qM0 WM0 8Hz0|95e3", "Asia/Makassar|WITA|-80|0||15e5", "Asia/Manila|PHT|-80|0||24e6", "Europe/Athens|EET EEST|-20 -30|01010101010101010101010|1BWp0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|35e5", "Asia/Novokuznetsk|KRAT NOVST NOVT NOVT|-70 -70 -60 -70|01230|1BWj0 1qN0 WM0 8Hz0|55e4", "Asia/Novosibirsk|NOVT NOVST NOVT|-60 -70 -70|01020|1BWk0 1qM0 WM0 8Hz0|15e5", "Asia/Omsk|OMST OMSST OMST|-60 -70 -70|01020|1BWk0 1qM0 WM0 8Hz0|12e5", "Asia/Oral|ORAT|-50|0||27e4", "Asia/Pyongyang|KST KST|-90 -8u|01|1P4D0|29e5", "Asia/Qyzylorda|QYZT|-60|0||73e4", "Asia/Rangoon|MMT|-6u|0||48e5", "Asia/Sakhalin|SAKT SAKST SAKT|-a0 -b0 -b0|01020|1BWg0 1qM0 WM0 8Hz0|58e4", "Asia/Tashkent|UZT|-50|0||23e5", "Asia/Seoul|KST|-90|0||23e6", "Asia/Singapore|SGT|-80|0||56e5", "Asia/Srednekolymsk|MAGT MAGST MAGT SRET|-b0 -c0 -c0 -b0|01023|1BWf0 1qM0 WM0 8Hz0|35e2", "Asia/Tbilisi|GET|-40|0||11e5", "Asia/Tehran|IRST IRDT|-3u -4u|01010101010101010101010|1BTUu 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0|14e6", "Asia/Thimphu|BTT|-60|0||79e3", "Asia/Tokyo|JST|-90|0||38e6", "Asia/Ulaanbaatar|ULAT ULAST|-80 -90|0101010101010|1O8G0 1cJ0 1cP0 1cJ0 1cP0 1fx0 1cP0 1cJ0 1cP0 1cJ0 1cP0 1cJ0|12e5", "Asia/Ust-Nera|MAGT MAGST MAGT VLAT VLAT|-b0 -c0 -c0 -b0 -a0|010234|1BWf0 1qM0 WM0 17V0 7zD0|65e2", "Asia/Vladivostok|VLAT VLAST VLAT|-a0 -b0 -b0|01020|1BWg0 1qM0 WM0 8Hz0|60e4", "Asia/Yakutsk|YAKT YAKST YAKT|-90 -a0 -a0|01020|1BWh0 1qM0 WM0 8Hz0|28e4", "Asia/Yekaterinburg|YEKT YEKST YEKT|-50 -60 -60|01020|1BWl0 1qM0 WM0 8Hz0|14e5", "Asia/Yerevan|AMT AMST|-40 -50|01010|1BWm0 1qM0 WM0 1qM0|13e5", "Atlantic/Azores|AZOT AZOST|10 0|01010101010101010101010|1BWp0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|25e4", "Europe/Lisbon|WET WEST|0 -10|01010101010101010101010|1BWp0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|27e5", "Atlantic/Cape_Verde|CVT|10|0||50e4", "Atlantic/South_Georgia|GST|20|0||30", "Atlantic/Stanley|FKST FKT|30 40|010|1C6R0 U10|21e2", "Australia/Sydney|AEDT AEST|-b0 -a0|01010101010101010101010|1C140 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0|40e5", "Australia/Adelaide|ACDT ACST|-au -9u|01010101010101010101010|1C14u 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0|11e5", "Australia/Brisbane|AEST|-a0|0||20e5", "Australia/Darwin|ACST|-9u|0||12e4", "Australia/Eucla|ACWST|-8J|0||368", "Australia/Lord_Howe|LHDT LHST|-b0 -au|01010101010101010101010|1C130 1cMu 1cLu 1cMu 1cLu 1fAu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1fAu 1cLu 1cMu 1cLu 1cMu|347", "Australia/Perth|AWST|-80|0||18e5", "Pacific/Easter|EASST EAST EAST|50 60 50|010101010102|1C1f0 1fB0 1nX0 G10 1EL0 Op0 1zb0 Rd0 1wn0 Rd0 1wn0|30e2", "Europe/Dublin|GMT IST|0 -10|01010101010101010101010|1BWp0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|12e5", "Etc/GMT+1|GMT+1|10|0|", "Etc/GMT+10|GMT+10|a0|0|", "Etc/GMT+11|GMT+11|b0|0|", "Etc/GMT+12|GMT+12|c0|0|", "Etc/GMT+2|GMT+2|20|0|", "Etc/GMT+3|GMT+3|30|0|", "Etc/GMT+4|GMT+4|40|0|", "Etc/GMT+5|GMT+5|50|0|", "Etc/GMT+6|GMT+6|60|0|", "Etc/GMT+7|GMT+7|70|0|", "Etc/GMT+8|GMT+8|80|0|", "Etc/GMT+9|GMT+9|90|0|", "Etc/GMT-1|GMT-1|-10|0|", "Etc/GMT-10|GMT-10|-a0|0|", "Etc/GMT-11|GMT-11|-b0|0|", "Etc/GMT-12|GMT-12|-c0|0|", "Etc/GMT-13|GMT-13|-d0|0|", "Etc/GMT-14|GMT-14|-e0|0|", "Etc/GMT-2|GMT-2|-20|0|", "Etc/GMT-3|GMT-3|-30|0|", "Etc/GMT-4|GMT-4|-40|0|", "Etc/GMT-5|GMT-5|-50|0|", "Etc/GMT-6|GMT-6|-60|0|", "Etc/GMT-7|GMT-7|-70|0|", "Etc/GMT-8|GMT-8|-80|0|", "Etc/GMT-9|GMT-9|-90|0|", "Etc/UCT|UCT|0|0|", "Etc/UTC|UTC|0|0|", "Europe/London|GMT BST|0 -10|01010101010101010101010|1BWp0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|10e6", "Europe/Chisinau|EET EEST|-20 -30|01010101010101010101010|1BWo0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|67e4", "Europe/Kaliningrad|EET EEST FET|-20 -30 -30|01020|1BWo0 1qM0 WM0 8Hz0|44e4", "Europe/Minsk|EET EEST FET MSK|-20 -30 -30 -30|01023|1BWo0 1qM0 WM0 8Hy0|19e5", "Europe/Moscow|MSK MSD MSK|-30 -40 -40|01020|1BWn0 1qM0 WM0 8Hz0|16e6", "Europe/Samara|SAMT SAMST SAMT|-40 -40 -30|0120|1BWm0 1qN0 WM0|12e5", "Europe/Simferopol|EET EEST MSK MSK|-20 -30 -40 -30|01010101023|1BWp0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11z0 1nW0|33e4", "Pacific/Honolulu|HST|a0|0||37e4", "Indian/Chagos|IOT|-60|0||30e2", "Indian/Christmas|CXT|-70|0||21e2", "Indian/Cocos|CCT|-6u|0||596", "Indian/Kerguelen|TFT|-50|0||130", "Indian/Mahe|SCT|-40|0||79e3", "Indian/Maldives|MVT|-50|0||35e4", "Indian/Mauritius|MUT|-40|0||15e4", "Indian/Reunion|RET|-40|0||84e4", "Pacific/Majuro|MHT|-c0|0||28e3", "MET|MET MEST|-10 -20|01010101010101010101010|1BWp0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00", "Pacific/Chatham|CHADT CHAST|-dJ -cJ|01010101010101010101010|1C120 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00|600", "Pacific/Apia|SST SDT WSDT WSST|b0 a0 -e0 -d0|01012323232323232323232|1Dbn0 1ff0 1a00 CI0 AQ0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00|37e3", "Pacific/Bougainville|PGT BST|-a0 -b0|01|1NwE0|18e4", "Pacific/Chuuk|CHUT|-a0|0||49e3", "Pacific/Efate|VUT|-b0|0||66e3", "Pacific/Enderbury|PHOT|-d0|0||1", "Pacific/Fakaofo|TKT TKT|b0 -d0|01|1Gfn0|483", "Pacific/Fiji|FJST FJT|-d0 -c0|01010101010101010101010|1BWe0 1o00 Rc0 1wo0 Ao0 1Nc0 Ao0 1Q00 xz0 1SN0 uM0 1SM0 uM0 1VA0 s00 1VA0 uM0 1SM0 uM0 1SM0 uM0 1SM0|88e4", "Pacific/Funafuti|TVT|-c0|0||45e2", "Pacific/Galapagos|GALT|60|0||25e3", "Pacific/Gambier|GAMT|90|0||125", "Pacific/Guadalcanal|SBT|-b0|0||11e4", "Pacific/Guam|ChST|-a0|0||17e4", "Pacific/Kiritimati|LINT|-e0|0||51e2", "Pacific/Kosrae|KOST|-b0|0||66e2", "Pacific/Marquesas|MART|9u|0||86e2", "Pacific/Pago_Pago|SST|b0|0||37e2", "Pacific/Nauru|NRT|-c0|0||10e3", "Pacific/Niue|NUT|b0|0||12e2", "Pacific/Norfolk|NFT NFT|-bu -b0|01|1PoCu|25e4", "Pacific/Noumea|NCT|-b0|0||98e3", "Pacific/Palau|PWT|-90|0||21e3", "Pacific/Pohnpei|PONT|-b0|0||34e3", "Pacific/Port_Moresby|PGT|-a0|0||25e4", "Pacific/Rarotonga|CKT|a0|0||13e3", "Pacific/Tahiti|TAHT|a0|0||18e4", "Pacific/Tarawa|GILT|-c0|0||29e3", "Pacific/Tongatapu|TOT|-d0|0||75e3", "Pacific/Wake|WAKT|-c0|0||16e3", "Pacific/Wallis|WFT|-c0|0||94"],
        links: ["Africa/Abidjan|Africa/Accra", "Africa/Abidjan|Africa/Bamako", "Africa/Abidjan|Africa/Banjul", "Africa/Abidjan|Africa/Bissau", "Africa/Abidjan|Africa/Conakry", "Africa/Abidjan|Africa/Dakar", "Africa/Abidjan|Africa/Freetown", "Africa/Abidjan|Africa/Lome", "Africa/Abidjan|Africa/Monrovia", "Africa/Abidjan|Africa/Nouakchott", "Africa/Abidjan|Africa/Ouagadougou", "Africa/Abidjan|Africa/Sao_Tome", "Africa/Abidjan|Africa/Timbuktu", "Africa/Abidjan|America/Danmarkshavn", "Africa/Abidjan|Atlantic/Reykjavik", "Africa/Abidjan|Atlantic/St_Helena", "Africa/Abidjan|Etc/GMT", "Africa/Abidjan|Etc/GMT+0", "Africa/Abidjan|Etc/GMT-0", "Africa/Abidjan|Etc/GMT0", "Africa/Abidjan|Etc/Greenwich", "Africa/Abidjan|GMT", "Africa/Abidjan|GMT+0", "Africa/Abidjan|GMT-0", "Africa/Abidjan|GMT0", "Africa/Abidjan|Greenwich", "Africa/Abidjan|Iceland", "Africa/Algiers|Africa/Tunis", "Africa/Cairo|Egypt", "Africa/Casablanca|Africa/El_Aaiun", "Africa/Johannesburg|Africa/Maseru", "Africa/Johannesburg|Africa/Mbabane", "Africa/Khartoum|Africa/Addis_Ababa", "Africa/Khartoum|Africa/Asmara", "Africa/Khartoum|Africa/Asmera", "Africa/Khartoum|Africa/Dar_es_Salaam", "Africa/Khartoum|Africa/Djibouti", "Africa/Khartoum|Africa/Juba", "Africa/Khartoum|Africa/Kampala", "Africa/Khartoum|Africa/Mogadishu", "Africa/Khartoum|Africa/Nairobi", "Africa/Khartoum|Indian/Antananarivo", "Africa/Khartoum|Indian/Comoro", "Africa/Khartoum|Indian/Mayotte", "Africa/Lagos|Africa/Bangui", "Africa/Lagos|Africa/Brazzaville", "Africa/Lagos|Africa/Douala", "Africa/Lagos|Africa/Kinshasa", "Africa/Lagos|Africa/Libreville", "Africa/Lagos|Africa/Luanda", "Africa/Lagos|Africa/Malabo", "Africa/Lagos|Africa/Ndjamena", "Africa/Lagos|Africa/Niamey", "Africa/Lagos|Africa/Porto-Novo", "Africa/Maputo|Africa/Blantyre", "Africa/Maputo|Africa/Bujumbura", "Africa/Maputo|Africa/Gaborone", "Africa/Maputo|Africa/Harare", "Africa/Maputo|Africa/Kigali", "Africa/Maputo|Africa/Lubumbashi", "Africa/Maputo|Africa/Lusaka", "Africa/Tripoli|Libya", "America/Adak|America/Atka", "America/Adak|US/Aleutian", "America/Anchorage|America/Juneau", "America/Anchorage|America/Nome", "America/Anchorage|America/Sitka", "America/Anchorage|America/Yakutat", "America/Anchorage|US/Alaska", "America/Argentina/Buenos_Aires|America/Argentina/Catamarca", "America/Argentina/Buenos_Aires|America/Argentina/ComodRivadavia", "America/Argentina/Buenos_Aires|America/Argentina/Cordoba", "America/Argentina/Buenos_Aires|America/Argentina/Jujuy", "America/Argentina/Buenos_Aires|America/Argentina/La_Rioja", "America/Argentina/Buenos_Aires|America/Argentina/Mendoza", "America/Argentina/Buenos_Aires|America/Argentina/Rio_Gallegos", "America/Argentina/Buenos_Aires|America/Argentina/Salta", "America/Argentina/Buenos_Aires|America/Argentina/San_Juan", "America/Argentina/Buenos_Aires|America/Argentina/San_Luis", "America/Argentina/Buenos_Aires|America/Argentina/Tucuman", "America/Argentina/Buenos_Aires|America/Argentina/Ushuaia", "America/Argentina/Buenos_Aires|America/Buenos_Aires", "America/Argentina/Buenos_Aires|America/Catamarca", "America/Argentina/Buenos_Aires|America/Cordoba", "America/Argentina/Buenos_Aires|America/Jujuy", "America/Argentina/Buenos_Aires|America/Mendoza", "America/Argentina/Buenos_Aires|America/Rosario", "America/Campo_Grande|America/Cuiaba", "America/Chicago|America/Indiana/Knox", "America/Chicago|America/Indiana/Tell_City", "America/Chicago|America/Knox_IN", "America/Chicago|America/Matamoros", "America/Chicago|America/Menominee", "America/Chicago|America/North_Dakota/Center", "America/Chicago|America/North_Dakota/New_Salem", "America/Chicago|America/Rainy_River", "America/Chicago|America/Rankin_Inlet", "America/Chicago|America/Resolute", "America/Chicago|America/Winnipeg", "America/Chicago|CST6CDT", "America/Chicago|Canada/Central", "America/Chicago|US/Central", "America/Chicago|US/Indiana-Starke", "America/Chihuahua|America/Mazatlan", "America/Chihuahua|Mexico/BajaSur", "America/Denver|America/Boise", "America/Denver|America/Cambridge_Bay", "America/Denver|America/Edmonton", "America/Denver|America/Inuvik", "America/Denver|America/Ojinaga", "America/Denver|America/Shiprock", "America/Denver|America/Yellowknife", "America/Denver|Canada/Mountain", "America/Denver|MST7MDT", "America/Denver|Navajo", "America/Denver|US/Mountain", "America/Fortaleza|America/Belem", "America/Fortaleza|America/Maceio", "America/Fortaleza|America/Recife", "America/Fortaleza|America/Santarem", "America/Halifax|America/Glace_Bay", "America/Halifax|America/Moncton", "America/Halifax|America/Thule", "America/Halifax|Atlantic/Bermuda", "America/Halifax|Canada/Atlantic", "America/Havana|Cuba", "America/Los_Angeles|America/Dawson", "America/Los_Angeles|America/Ensenada", "America/Los_Angeles|America/Tijuana", "America/Los_Angeles|America/Vancouver", "America/Los_Angeles|America/Whitehorse", "America/Los_Angeles|Canada/Pacific", "America/Los_Angeles|Canada/Yukon", "America/Los_Angeles|Mexico/BajaNorte", "America/Los_Angeles|PST8PDT", "America/Los_Angeles|US/Pacific", "America/Los_Angeles|US/Pacific-New", "America/Managua|America/Belize", "America/Managua|America/Costa_Rica", "America/Managua|America/El_Salvador", "America/Managua|America/Guatemala", "America/Managua|America/Regina", "America/Managua|America/Swift_Current", "America/Managua|America/Tegucigalpa", "America/Managua|Canada/East-Saskatchewan", "America/Managua|Canada/Saskatchewan", "America/Manaus|America/Boa_Vista", "America/Manaus|America/Porto_Velho", "America/Manaus|Brazil/West", "America/Metlakatla|Pacific/Pitcairn", "America/Mexico_City|America/Merida", "America/Mexico_City|America/Monterrey", "America/Mexico_City|Mexico/General", "America/New_York|America/Detroit", "America/New_York|America/Fort_Wayne", "America/New_York|America/Indiana/Indianapolis", "America/New_York|America/Indiana/Marengo", "America/New_York|America/Indiana/Petersburg", "America/New_York|America/Indiana/Vevay", "America/New_York|America/Indiana/Vincennes", "America/New_York|America/Indiana/Winamac", "America/New_York|America/Indianapolis", "America/New_York|America/Iqaluit", "America/New_York|America/Kentucky/Louisville", "America/New_York|America/Kentucky/Monticello", "America/New_York|America/Louisville", "America/New_York|America/Montreal", "America/New_York|America/Nassau", "America/New_York|America/Nipigon", "America/New_York|America/Pangnirtung", "America/New_York|America/Thunder_Bay", "America/New_York|America/Toronto", "America/New_York|Canada/Eastern", "America/New_York|EST5EDT", "America/New_York|US/East-Indiana", "America/New_York|US/Eastern", "America/New_York|US/Michigan", "America/Noronha|Brazil/DeNoronha", "America/Panama|America/Atikokan", "America/Panama|America/Coral_Harbour", "America/Panama|America/Jamaica", "America/Panama|EST", "America/Panama|Jamaica", "America/Phoenix|America/Creston", "America/Phoenix|America/Dawson_Creek", "America/Phoenix|America/Hermosillo", "America/Phoenix|MST", "America/Phoenix|US/Arizona", "America/Rio_Branco|America/Eirunepe", "America/Rio_Branco|America/Porto_Acre", "America/Rio_Branco|Brazil/Acre", "America/Santiago|Antarctica/Palmer", "America/Santiago|Chile/Continental", "America/Santo_Domingo|America/Anguilla", "America/Santo_Domingo|America/Antigua", "America/Santo_Domingo|America/Aruba", "America/Santo_Domingo|America/Barbados", "America/Santo_Domingo|America/Blanc-Sablon", "America/Santo_Domingo|America/Curacao", "America/Santo_Domingo|America/Dominica", "America/Santo_Domingo|America/Grenada", "America/Santo_Domingo|America/Guadeloupe", "America/Santo_Domingo|America/Kralendijk", "America/Santo_Domingo|America/Lower_Princes", "America/Santo_Domingo|America/Marigot", "America/Santo_Domingo|America/Martinique", "America/Santo_Domingo|America/Montserrat", "America/Santo_Domingo|America/Port_of_Spain", "America/Santo_Domingo|America/Puerto_Rico", "America/Santo_Domingo|America/St_Barthelemy", "America/Santo_Domingo|America/St_Kitts", "America/Santo_Domingo|America/St_Lucia", "America/Santo_Domingo|America/St_Thomas", "America/Santo_Domingo|America/St_Vincent", "America/Santo_Domingo|America/Tortola", "America/Santo_Domingo|America/Virgin", "America/Sao_Paulo|Brazil/East", "America/St_Johns|Canada/Newfoundland", "Asia/Aqtobe|Asia/Aqtau", "Asia/Ashgabat|Asia/Ashkhabad", "Asia/Baghdad|Asia/Aden", "Asia/Baghdad|Asia/Bahrain", "Asia/Baghdad|Asia/Kuwait", "Asia/Baghdad|Asia/Qatar", "Asia/Baghdad|Asia/Riyadh", "Asia/Bangkok|Asia/Ho_Chi_Minh", "Asia/Bangkok|Asia/Phnom_Penh", "Asia/Bangkok|Asia/Saigon", "Asia/Bangkok|Asia/Vientiane", "Asia/Dhaka|Asia/Dacca", "Asia/Dubai|Asia/Muscat", "Asia/Hong_Kong|Hongkong", "Asia/Jakarta|Asia/Pontianak", "Asia/Jerusalem|Asia/Tel_Aviv", "Asia/Jerusalem|Israel", "Asia/Kathmandu|Asia/Katmandu", "Asia/Kolkata|Asia/Calcutta", "Asia/Kolkata|Asia/Colombo", "Asia/Kuala_Lumpur|Asia/Kuching", "Asia/Makassar|Asia/Ujung_Pandang", "Asia/Seoul|ROK", "Asia/Shanghai|Asia/Chongqing", "Asia/Shanghai|Asia/Chungking", "Asia/Shanghai|Asia/Harbin", "Asia/Shanghai|Asia/Macao", "Asia/Shanghai|Asia/Macau", "Asia/Shanghai|Asia/Taipei", "Asia/Shanghai|PRC", "Asia/Shanghai|ROC", "Asia/Singapore|Singapore", "Asia/Tashkent|Asia/Samarkand", "Asia/Tehran|Iran", "Asia/Thimphu|Asia/Thimbu", "Asia/Tokyo|Japan", "Asia/Ulaanbaatar|Asia/Ulan_Bator", "Asia/Urumqi|Asia/Kashgar", "Australia/Adelaide|Australia/Broken_Hill", "Australia/Adelaide|Australia/South", "Australia/Adelaide|Australia/Yancowinna", "Australia/Brisbane|Australia/Lindeman", "Australia/Brisbane|Australia/Queensland", "Australia/Darwin|Australia/North", "Australia/Lord_Howe|Australia/LHI", "Australia/Perth|Australia/West", "Australia/Sydney|Australia/ACT", "Australia/Sydney|Australia/Canberra", "Australia/Sydney|Australia/Currie", "Australia/Sydney|Australia/Hobart", "Australia/Sydney|Australia/Melbourne", "Australia/Sydney|Australia/NSW", "Australia/Sydney|Australia/Tasmania", "Australia/Sydney|Australia/Victoria", "Etc/UCT|UCT", "Etc/UTC|Etc/Universal", "Etc/UTC|Etc/Zulu", "Etc/UTC|UTC", "Etc/UTC|Universal", "Etc/UTC|Zulu", "Europe/Athens|Asia/Nicosia", "Europe/Athens|EET", "Europe/Athens|Europe/Bucharest", "Europe/Athens|Europe/Helsinki", "Europe/Athens|Europe/Kiev", "Europe/Athens|Europe/Mariehamn", "Europe/Athens|Europe/Nicosia", "Europe/Athens|Europe/Riga", "Europe/Athens|Europe/Sofia", "Europe/Athens|Europe/Tallinn", "Europe/Athens|Europe/Uzhgorod", "Europe/Athens|Europe/Vilnius", "Europe/Athens|Europe/Zaporozhye", "Europe/Chisinau|Europe/Tiraspol", "Europe/Dublin|Eire", "Europe/Istanbul|Asia/Istanbul", "Europe/Istanbul|Turkey", "Europe/Lisbon|Atlantic/Canary", "Europe/Lisbon|Atlantic/Faeroe", "Europe/Lisbon|Atlantic/Faroe", "Europe/Lisbon|Atlantic/Madeira", "Europe/Lisbon|Portugal", "Europe/Lisbon|WET", "Europe/London|Europe/Belfast", "Europe/London|Europe/Guernsey", "Europe/London|Europe/Isle_of_Man", "Europe/London|Europe/Jersey", "Europe/London|GB", "Europe/London|GB-Eire", "Europe/Moscow|Europe/Volgograd", "Europe/Moscow|W-SU", "Europe/Paris|Africa/Ceuta", "Europe/Paris|Arctic/Longyearbyen", "Europe/Paris|Atlantic/Jan_Mayen", "Europe/Paris|CET", "Europe/Paris|Europe/Amsterdam", "Europe/Paris|Europe/Andorra", "Europe/Paris|Europe/Belgrade", "Europe/Paris|Europe/Berlin", "Europe/Paris|Europe/Bratislava", "Europe/Paris|Europe/Brussels", "Europe/Paris|Europe/Budapest", "Europe/Paris|Europe/Busingen", "Europe/Paris|Europe/Copenhagen", "Europe/Paris|Europe/Gibraltar", "Europe/Paris|Europe/Ljubljana", "Europe/Paris|Europe/Luxembourg", "Europe/Paris|Europe/Madrid", "Europe/Paris|Europe/Malta", "Europe/Paris|Europe/Monaco", "Europe/Paris|Europe/Oslo", "Europe/Paris|Europe/Podgorica", "Europe/Paris|Europe/Prague", "Europe/Paris|Europe/Rome", "Europe/Paris|Europe/San_Marino", "Europe/Paris|Europe/Sarajevo", "Europe/Paris|Europe/Skopje", "Europe/Paris|Europe/Stockholm", "Europe/Paris|Europe/Tirane", "Europe/Paris|Europe/Vaduz", "Europe/Paris|Europe/Vatican", "Europe/Paris|Europe/Vienna", "Europe/Paris|Europe/Warsaw", "Europe/Paris|Europe/Zagreb", "Europe/Paris|Europe/Zurich", "Europe/Paris|Poland", "Pacific/Auckland|Antarctica/McMurdo", "Pacific/Auckland|Antarctica/South_Pole", "Pacific/Auckland|NZ", "Pacific/Chatham|NZ-CHAT", "Pacific/Chuuk|Pacific/Truk", "Pacific/Chuuk|Pacific/Yap", "Pacific/Easter|Chile/EasterIsland", "Pacific/Guam|Pacific/Saipan", "Pacific/Honolulu|HST", "Pacific/Honolulu|Pacific/Johnston", "Pacific/Honolulu|US/Hawaii", "Pacific/Majuro|Kwajalein", "Pacific/Majuro|Pacific/Kwajalein", "Pacific/Pago_Pago|Pacific/Midway", "Pacific/Pago_Pago|Pacific/Samoa", "Pacific/Pago_Pago|US/Samoa", "Pacific/Pohnpei|Pacific/Ponape"]
    });
    return E
}));
/**
 * Swiper 6.5.9
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * https://swiperjs.com
 *
 * Copyright 2014-2021 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: April 30, 2021
 */

! function (e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).Swiper = t()
}(this, (function () {
    "use strict";

    function e(e, t) {
        for (var a = 0; a < t.length; a++) {
            var i = t[a];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
        }
    }

    function t() {
        return (t = Object.assign || function (e) {
            for (var t = 1; t < arguments.length; t++) {
                var a = arguments[t];
                for (var i in a) Object.prototype.hasOwnProperty.call(a, i) && (e[i] = a[i])
            }
            return e
        }).apply(this, arguments)
    }

    function a(e) {
        return null !== e && "object" == typeof e && "constructor" in e && e.constructor === Object
    }

    function i(e, t) {
        void 0 === e && (e = {}), void 0 === t && (t = {}), Object.keys(t).forEach((function (s) {
            void 0 === e[s] ? e[s] = t[s] : a(t[s]) && a(e[s]) && Object.keys(t[s]).length > 0 && i(e[s], t[s])
        }))
    }
    var s = {
        body: {},
        addEventListener: function () {},
        removeEventListener: function () {},
        activeElement: {
            blur: function () {},
            nodeName: ""
        },
        querySelector: function () {
            return null
        },
        querySelectorAll: function () {
            return []
        },
        getElementById: function () {
            return null
        },
        createEvent: function () {
            return {
                initEvent: function () {}
            }
        },
        createElement: function () {
            return {
                children: [],
                childNodes: [],
                style: {},
                setAttribute: function () {},
                getElementsByTagName: function () {
                    return []
                }
            }
        },
        createElementNS: function () {
            return {}
        },
        importNode: function () {
            return null
        },
        location: {
            hash: "",
            host: "",
            hostname: "",
            href: "",
            origin: "",
            pathname: "",
            protocol: "",
            search: ""
        }
    };

    function r() {
        var e = "undefined" != typeof document ? document : {};
        return i(e, s), e
    }
    var n = {
        document: s,
        navigator: {
            userAgent: ""
        },
        location: {
            hash: "",
            host: "",
            hostname: "",
            href: "",
            origin: "",
            pathname: "",
            protocol: "",
            search: ""
        },
        history: {
            replaceState: function () {},
            pushState: function () {},
            go: function () {},
            back: function () {}
        },
        CustomEvent: function () {
            return this
        },
        addEventListener: function () {},
        removeEventListener: function () {},
        getComputedStyle: function () {
            return {
                getPropertyValue: function () {
                    return ""
                }
            }
        },
        Image: function () {},
        Date: function () {},
        screen: {},
        setTimeout: function () {},
        clearTimeout: function () {},
        matchMedia: function () {
            return {}
        },
        requestAnimationFrame: function (e) {
            return "undefined" == typeof setTimeout ? (e(), null) : setTimeout(e, 0)
        },
        cancelAnimationFrame: function (e) {
            "undefined" != typeof setTimeout && clearTimeout(e)
        }
    };

    function o() {
        var e = "undefined" != typeof window ? window : {};
        return i(e, n), e
    }

    function l(e) {
        return (l = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
            return e.__proto__ || Object.getPrototypeOf(e)
        })(e)
    }

    function d(e, t) {
        return (d = Object.setPrototypeOf || function (e, t) {
            return e.__proto__ = t, e
        })(e, t)
    }

    function p() {
        if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" == typeof Proxy) return !0;
        try {
            return Date.prototype.toString.call(Reflect.construct(Date, [], (function () {}))), !0
        } catch (e) {
            return !1
        }
    }

    function c(e, t, a) {
        return (c = p() ? Reflect.construct : function (e, t, a) {
            var i = [null];
            i.push.apply(i, t);
            var s = new(Function.bind.apply(e, i));
            return a && d(s, a.prototype), s
        }).apply(null, arguments)
    }

    function u(e) {
        var t = "function" == typeof Map ? new Map : void 0;
        return (u = function (e) {
            if (null === e || (a = e, -1 === Function.toString.call(a).indexOf("[native code]"))) return e;
            var a;
            if ("function" != typeof e) throw new TypeError("Super expression must either be null or a function");
            if (void 0 !== t) {
                if (t.has(e)) return t.get(e);
                t.set(e, i)
            }

            function i() {
                return c(e, arguments, l(this).constructor)
            }
            return i.prototype = Object.create(e.prototype, {
                constructor: {
                    value: i,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), d(i, e)
        })(e)
    }
    var h = function (e) {
        var t, a;

        function i(t) {
            var a, i, s;
            return a = e.call.apply(e, [this].concat(t)) || this, i = function (e) {
                if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return e
            }(a), s = i.__proto__, Object.defineProperty(i, "__proto__", {
                get: function () {
                    return s
                },
                set: function (e) {
                    s.__proto__ = e
                }
            }), a
        }
        return a = e, (t = i).prototype = Object.create(a.prototype), t.prototype.constructor = t, t.__proto__ = a, i
    }(u(Array));

    function v(e) {
        void 0 === e && (e = []);
        var t = [];
        return e.forEach((function (e) {
            Array.isArray(e) ? t.push.apply(t, v(e)) : t.push(e)
        })), t
    }

    function f(e, t) {
        return Array.prototype.filter.call(e, t)
    }

    function m(e, t) {
        var a = o(),
            i = r(),
            s = [];
        if (!t && e instanceof h) return e;
        if (!e) return new h(s);
        if ("string" == typeof e) {
            var n = e.trim();
            if (n.indexOf("<") >= 0 && n.indexOf(">") >= 0) {
                var l = "div";
                0 === n.indexOf("<li") && (l = "ul"), 0 === n.indexOf("<tr") && (l = "tbody"), 0 !== n.indexOf("<td") && 0 !== n.indexOf("<th") || (l = "tr"), 0 === n.indexOf("<tbody") && (l = "table"), 0 === n.indexOf("<option") && (l = "select");
                var d = i.createElement(l);
                d.innerHTML = n;
                for (var p = 0; p < d.childNodes.length; p += 1) s.push(d.childNodes[p])
            } else s = function (e, t) {
                if ("string" != typeof e) return [e];
                for (var a = [], i = t.querySelectorAll(e), s = 0; s < i.length; s += 1) a.push(i[s]);
                return a
            }(e.trim(), t || i)
        } else if (e.nodeType || e === a || e === i) s.push(e);
        else if (Array.isArray(e)) {
            if (e instanceof h) return e;
            s = e
        }
        return new h(function (e) {
            for (var t = [], a = 0; a < e.length; a += 1) - 1 === t.indexOf(e[a]) && t.push(e[a]);
            return t
        }(s))
    }
    m.fn = h.prototype;
    var g, b, w, y = {
        addClass: function () {
            for (var e = arguments.length, t = new Array(e), a = 0; a < e; a++) t[a] = arguments[a];
            var i = v(t.map((function (e) {
                return e.split(" ")
            })));
            return this.forEach((function (e) {
                var t;
                (t = e.classList).add.apply(t, i)
            })), this
        },
        removeClass: function () {
            for (var e = arguments.length, t = new Array(e), a = 0; a < e; a++) t[a] = arguments[a];
            var i = v(t.map((function (e) {
                return e.split(" ")
            })));
            return this.forEach((function (e) {
                var t;
                (t = e.classList).remove.apply(t, i)
            })), this
        },
        hasClass: function () {
            for (var e = arguments.length, t = new Array(e), a = 0; a < e; a++) t[a] = arguments[a];
            var i = v(t.map((function (e) {
                return e.split(" ")
            })));
            return f(this, (function (e) {
                return i.filter((function (t) {
                    return e.classList.contains(t)
                })).length > 0
            })).length > 0
        },
        toggleClass: function () {
            for (var e = arguments.length, t = new Array(e), a = 0; a < e; a++) t[a] = arguments[a];
            var i = v(t.map((function (e) {
                return e.split(" ")
            })));
            this.forEach((function (e) {
                i.forEach((function (t) {
                    e.classList.toggle(t)
                }))
            }))
        },
        attr: function (e, t) {
            if (1 === arguments.length && "string" == typeof e) return this[0] ? this[0].getAttribute(e) : void 0;
            for (var a = 0; a < this.length; a += 1)
                if (2 === arguments.length) this[a].setAttribute(e, t);
                else
                    for (var i in e) this[a][i] = e[i], this[a].setAttribute(i, e[i]);
            return this
        },
        removeAttr: function (e) {
            for (var t = 0; t < this.length; t += 1) this[t].removeAttribute(e);
            return this
        },
        transform: function (e) {
            for (var t = 0; t < this.length; t += 1) this[t].style.transform = e;
            return this
        },
        transition: function (e) {
            for (var t = 0; t < this.length; t += 1) this[t].style.transitionDuration = "string" != typeof e ? e + "ms" : e;
            return this
        },
        on: function () {
            for (var e = arguments.length, t = new Array(e), a = 0; a < e; a++) t[a] = arguments[a];
            var i = t[0],
                s = t[1],
                r = t[2],
                n = t[3];

            function o(e) {
                var t = e.target;
                if (t) {
                    var a = e.target.dom7EventData || [];
                    if (a.indexOf(e) < 0 && a.unshift(e), m(t).is(s)) r.apply(t, a);
                    else
                        for (var i = m(t).parents(), n = 0; n < i.length; n += 1) m(i[n]).is(s) && r.apply(i[n], a)
                }
            }

            function l(e) {
                var t = e && e.target && e.target.dom7EventData || [];
                t.indexOf(e) < 0 && t.unshift(e), r.apply(this, t)
            }
            "function" == typeof t[1] && (i = t[0], r = t[1], n = t[2], s = void 0), n || (n = !1);
            for (var d, p = i.split(" "), c = 0; c < this.length; c += 1) {
                var u = this[c];
                if (s)
                    for (d = 0; d < p.length; d += 1) {
                        var h = p[d];
                        u.dom7LiveListeners || (u.dom7LiveListeners = {}), u.dom7LiveListeners[h] || (u.dom7LiveListeners[h] = []), u.dom7LiveListeners[h].push({
                            listener: r,
                            proxyListener: o
                        }), u.addEventListener(h, o, n)
                    } else
                        for (d = 0; d < p.length; d += 1) {
                            var v = p[d];
                            u.dom7Listeners || (u.dom7Listeners = {}), u.dom7Listeners[v] || (u.dom7Listeners[v] = []), u.dom7Listeners[v].push({
                                listener: r,
                                proxyListener: l
                            }), u.addEventListener(v, l, n)
                        }
            }
            return this
        },
        off: function () {
            for (var e = arguments.length, t = new Array(e), a = 0; a < e; a++) t[a] = arguments[a];
            var i = t[0],
                s = t[1],
                r = t[2],
                n = t[3];
            "function" == typeof t[1] && (i = t[0], r = t[1], n = t[2], s = void 0), n || (n = !1);
            for (var o = i.split(" "), l = 0; l < o.length; l += 1)
                for (var d = o[l], p = 0; p < this.length; p += 1) {
                    var c = this[p],
                        u = void 0;
                    if (!s && c.dom7Listeners ? u = c.dom7Listeners[d] : s && c.dom7LiveListeners && (u = c.dom7LiveListeners[d]), u && u.length)
                        for (var h = u.length - 1; h >= 0; h -= 1) {
                            var v = u[h];
                            r && v.listener === r || r && v.listener && v.listener.dom7proxy && v.listener.dom7proxy === r ? (c.removeEventListener(d, v.proxyListener, n), u.splice(h, 1)) : r || (c.removeEventListener(d, v.proxyListener, n), u.splice(h, 1))
                        }
                }
            return this
        },
        trigger: function () {
            for (var e = o(), t = arguments.length, a = new Array(t), i = 0; i < t; i++) a[i] = arguments[i];
            for (var s = a[0].split(" "), r = a[1], n = 0; n < s.length; n += 1)
                for (var l = s[n], d = 0; d < this.length; d += 1) {
                    var p = this[d];
                    if (e.CustomEvent) {
                        var c = new e.CustomEvent(l, {
                            detail: r,
                            bubbles: !0,
                            cancelable: !0
                        });
                        p.dom7EventData = a.filter((function (e, t) {
                            return t > 0
                        })), p.dispatchEvent(c), p.dom7EventData = [], delete p.dom7EventData
                    }
                }
            return this
        },
        transitionEnd: function (e) {
            var t = this;
            return e && t.on("transitionend", (function a(i) {
                i.target === this && (e.call(this, i), t.off("transitionend", a))
            })), this
        },
        outerWidth: function (e) {
            if (this.length > 0) {
                if (e) {
                    var t = this.styles();
                    return this[0].offsetWidth + parseFloat(t.getPropertyValue("margin-right")) + parseFloat(t.getPropertyValue("margin-left"))
                }
                return this[0].offsetWidth
            }
            return null
        },
        outerHeight: function (e) {
            if (this.length > 0) {
                if (e) {
                    var t = this.styles();
                    return this[0].offsetHeight + parseFloat(t.getPropertyValue("margin-top")) + parseFloat(t.getPropertyValue("margin-bottom"))
                }
                return this[0].offsetHeight
            }
            return null
        },
        styles: function () {
            var e = o();
            return this[0] ? e.getComputedStyle(this[0], null) : {}
        },
        offset: function () {
            if (this.length > 0) {
                var e = o(),
                    t = r(),
                    a = this[0],
                    i = a.getBoundingClientRect(),
                    s = t.body,
                    n = a.clientTop || s.clientTop || 0,
                    l = a.clientLeft || s.clientLeft || 0,
                    d = a === e ? e.scrollY : a.scrollTop,
                    p = a === e ? e.scrollX : a.scrollLeft;
                return {
                    top: i.top + d - n,
                    left: i.left + p - l
                }
            }
            return null
        },
        css: function (e, t) {
            var a, i = o();
            if (1 === arguments.length) {
                if ("string" != typeof e) {
                    for (a = 0; a < this.length; a += 1)
                        for (var s in e) this[a].style[s] = e[s];
                    return this
                }
                if (this[0]) return i.getComputedStyle(this[0], null).getPropertyValue(e)
            }
            if (2 === arguments.length && "string" == typeof e) {
                for (a = 0; a < this.length; a += 1) this[a].style[e] = t;
                return this
            }
            return this
        },
        each: function (e) {
            return e ? (this.forEach((function (t, a) {
                e.apply(t, [t, a])
            })), this) : this
        },
        html: function (e) {
            if (void 0 === e) return this[0] ? this[0].innerHTML : null;
            for (var t = 0; t < this.length; t += 1) this[t].innerHTML = e;
            return this
        },
        text: function (e) {
            if (void 0 === e) return this[0] ? this[0].textContent.trim() : null;
            for (var t = 0; t < this.length; t += 1) this[t].textContent = e;
            return this
        },
        is: function (e) {
            var t, a, i = o(),
                s = r(),
                n = this[0];
            if (!n || void 0 === e) return !1;
            if ("string" == typeof e) {
                if (n.matches) return n.matches(e);
                if (n.webkitMatchesSelector) return n.webkitMatchesSelector(e);
                if (n.msMatchesSelector) return n.msMatchesSelector(e);
                for (t = m(e), a = 0; a < t.length; a += 1)
                    if (t[a] === n) return !0;
                return !1
            }
            if (e === s) return n === s;
            if (e === i) return n === i;
            if (e.nodeType || e instanceof h) {
                for (t = e.nodeType ? [e] : e, a = 0; a < t.length; a += 1)
                    if (t[a] === n) return !0;
                return !1
            }
            return !1
        },
        index: function () {
            var e, t = this[0];
            if (t) {
                for (e = 0; null !== (t = t.previousSibling);) 1 === t.nodeType && (e += 1);
                return e
            }
        },
        eq: function (e) {
            if (void 0 === e) return this;
            var t = this.length;
            if (e > t - 1) return m([]);
            if (e < 0) {
                var a = t + e;
                return m(a < 0 ? [] : [this[a]])
            }
            return m([this[e]])
        },
        append: function () {
            for (var e, t = r(), a = 0; a < arguments.length; a += 1) {
                e = a < 0 || arguments.length <= a ? void 0 : arguments[a];
                for (var i = 0; i < this.length; i += 1)
                    if ("string" == typeof e) {
                        var s = t.createElement("div");
                        for (s.innerHTML = e; s.firstChild;) this[i].appendChild(s.firstChild)
                    } else if (e instanceof h)
                    for (var n = 0; n < e.length; n += 1) this[i].appendChild(e[n]);
                else this[i].appendChild(e)
            }
            return this
        },
        prepend: function (e) {
            var t, a, i = r();
            for (t = 0; t < this.length; t += 1)
                if ("string" == typeof e) {
                    var s = i.createElement("div");
                    for (s.innerHTML = e, a = s.childNodes.length - 1; a >= 0; a -= 1) this[t].insertBefore(s.childNodes[a], this[t].childNodes[0])
                } else if (e instanceof h)
                for (a = 0; a < e.length; a += 1) this[t].insertBefore(e[a], this[t].childNodes[0]);
            else this[t].insertBefore(e, this[t].childNodes[0]);
            return this
        },
        next: function (e) {
            return this.length > 0 ? e ? this[0].nextElementSibling && m(this[0].nextElementSibling).is(e) ? m([this[0].nextElementSibling]) : m([]) : this[0].nextElementSibling ? m([this[0].nextElementSibling]) : m([]) : m([])
        },
        nextAll: function (e) {
            var t = [],
                a = this[0];
            if (!a) return m([]);
            for (; a.nextElementSibling;) {
                var i = a.nextElementSibling;
                e ? m(i).is(e) && t.push(i) : t.push(i), a = i
            }
            return m(t)
        },
        prev: function (e) {
            if (this.length > 0) {
                var t = this[0];
                return e ? t.previousElementSibling && m(t.previousElementSibling).is(e) ? m([t.previousElementSibling]) : m([]) : t.previousElementSibling ? m([t.previousElementSibling]) : m([])
            }
            return m([])
        },
        prevAll: function (e) {
            var t = [],
                a = this[0];
            if (!a) return m([]);
            for (; a.previousElementSibling;) {
                var i = a.previousElementSibling;
                e ? m(i).is(e) && t.push(i) : t.push(i), a = i
            }
            return m(t)
        },
        parent: function (e) {
            for (var t = [], a = 0; a < this.length; a += 1) null !== this[a].parentNode && (e ? m(this[a].parentNode).is(e) && t.push(this[a].parentNode) : t.push(this[a].parentNode));
            return m(t)
        },
        parents: function (e) {
            for (var t = [], a = 0; a < this.length; a += 1)
                for (var i = this[a].parentNode; i;) e ? m(i).is(e) && t.push(i) : t.push(i), i = i.parentNode;
            return m(t)
        },
        closest: function (e) {
            var t = this;
            return void 0 === e ? m([]) : (t.is(e) || (t = t.parents(e).eq(0)), t)
        },
        find: function (e) {
            for (var t = [], a = 0; a < this.length; a += 1) {
                try {
                    var i = this[a].querySelectorAll(e)
                } catch (t) {
                    console.log(e)
                }
                for (var s = 0; s < i.length; s += 1) t.push(i[s])
            }
            return m(t)
        },
        children: function (e) {
            for (var t = [], a = 0; a < this.length; a += 1)
                for (var i = this[a].children, s = 0; s < i.length; s += 1) e && !m(i[s]).is(e) || t.push(i[s]);
            return m(t)
        },
        filter: function (e) {
            return m(f(this, e))
        },
        remove: function () {
            for (var e = 0; e < this.length; e += 1) this[e].parentNode && this[e].parentNode.removeChild(this[e]);
            return this
        }
    };

    function E(e, t) {
        return void 0 === t && (t = 0), setTimeout(e, t)
    }

    function x() {
        return Date.now()
    }

    function T(e, t) {
        void 0 === t && (t = "x");
        var a, i, s, r = o(),
            n = function (e) {
                var t, a = o();
                return a.getComputedStyle && (t = a.getComputedStyle(e, null)), !t && e.currentStyle && (t = e.currentStyle), t || (t = e.style), t
            }(e);
        return r.WebKitCSSMatrix ? ((i = n.transform || n.webkitTransform).split(",").length > 6 && (i = i.split(", ").map((function (e) {
            return e.replace(",", ".")
        })).join(", ")), s = new r.WebKitCSSMatrix("none" === i ? "" : i)) : a = (s = n.MozTransform || n.OTransform || n.MsTransform || n.msTransform || n.transform || n.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,")).toString().split(","), "x" === t && (i = r.WebKitCSSMatrix ? s.m41 : 16 === a.length ? parseFloat(a[12]) : parseFloat(a[4])), "y" === t && (i = r.WebKitCSSMatrix ? s.m42 : 16 === a.length ? parseFloat(a[13]) : parseFloat(a[5])), i || 0
    }

    function S(e) {
        return "object" == typeof e && null !== e && e.constructor && "Object" === Object.prototype.toString.call(e).slice(8, -1)
    }

    function C() {
        for (var e = Object(arguments.length <= 0 ? void 0 : arguments[0]), t = ["__proto__", "constructor", "prototype"], a = 1; a < arguments.length; a += 1) {
            var i = a < 0 || arguments.length <= a ? void 0 : arguments[a];
            if (null != i)
                for (var s = Object.keys(Object(i)).filter((function (e) {
                        return t.indexOf(e) < 0
                    })), r = 0, n = s.length; r < n; r += 1) {
                    var o = s[r],
                        l = Object.getOwnPropertyDescriptor(i, o);
                    void 0 !== l && l.enumerable && (S(e[o]) && S(i[o]) ? i[o].__swiper__ ? e[o] = i[o] : C(e[o], i[o]) : !S(e[o]) && S(i[o]) ? (e[o] = {}, i[o].__swiper__ ? e[o] = i[o] : C(e[o], i[o])) : e[o] = i[o])
                }
        }
        return e
    }

    function M(e, t) {
        Object.keys(t).forEach((function (a) {
            S(t[a]) && Object.keys(t[a]).forEach((function (i) {
                "function" == typeof t[a][i] && (t[a][i] = t[a][i].bind(e))
            })), e[a] = t[a]
        }))
    }

    function z(e) {
        return void 0 === e && (e = ""), "." + e.trim().replace(/([\.:\/])/g, "\\$1").replace(/ /g, ".")
    }

    function P() {
        return g || (g = function () {
            var e = o(),
                t = r();
            return {
                touch: !!("ontouchstart" in e || e.DocumentTouch && t instanceof e.DocumentTouch),
                pointerEvents: !!e.PointerEvent && "maxTouchPoints" in e.navigator && e.navigator.maxTouchPoints >= 0,
                observer: "MutationObserver" in e || "WebkitMutationObserver" in e,
                passiveListener: function () {
                    var t = !1;
                    try {
                        var a = Object.defineProperty({}, "passive", {
                            get: function () {
                                t = !0
                            }
                        });
                        e.addEventListener("testPassiveListener", null, a)
                    } catch (e) {}
                    return t
                }(),
                gestures: "ongesturestart" in e
            }
        }()), g
    }

    function k(e) {
        return void 0 === e && (e = {}), b || (b = function (e) {
            var t = (void 0 === e ? {} : e).userAgent,
                a = P(),
                i = o(),
                s = i.navigator.platform,
                r = t || i.navigator.userAgent,
                n = {
                    ios: !1,
                    android: !1
                },
                l = i.screen.width,
                d = i.screen.height,
                p = r.match(/(Android);?[\s\/]+([\d.]+)?/),
                c = r.match(/(iPad).*OS\s([\d_]+)/),
                u = r.match(/(iPod)(.*OS\s([\d_]+))?/),
                h = !c && r.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
                v = "Win32" === s,
                f = "MacIntel" === s;
            return !c && f && a.touch && ["1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810"].indexOf(l + "x" + d) >= 0 && ((c = r.match(/(Version)\/([\d.]+)/)) || (c = [0, 1, "13_0_0"]), f = !1), p && !v && (n.os = "android", n.android = !0), (c || h || u) && (n.os = "ios", n.ios = !0), n
        }(e)), b
    }

    function L() {
        return w || (w = function () {
            var e, t = o();
            return {
                isEdge: !!t.navigator.userAgent.match(/Edge/g),
                isSafari: (e = t.navigator.userAgent.toLowerCase(), e.indexOf("safari") >= 0 && e.indexOf("chrome") < 0 && e.indexOf("android") < 0),
                isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(t.navigator.userAgent)
            }
        }()), w
    }
    Object.keys(y).forEach((function (e) {
        Object.defineProperty(m.fn, e, {
            value: y[e],
            writable: !0
        })
    }));
    var $ = {
            name: "resize",
            create: function () {
                var e = this;
                C(e, {
                    resize: {
                        observer: null,
                        createObserver: function () {
                            e && !e.destroyed && e.initialized && (e.resize.observer = new ResizeObserver((function (t) {
                                var a = e.width,
                                    i = e.height,
                                    s = a,
                                    r = i;
                                t.forEach((function (t) {
                                    var a = t.contentBoxSize,
                                        i = t.contentRect,
                                        n = t.target;
                                    n && n !== e.el || (s = i ? i.width : (a[0] || a).inlineSize, r = i ? i.height : (a[0] || a).blockSize)
                                })), s === a && r === i || e.resize.resizeHandler()
                            })), e.resize.observer.observe(e.el))
                        },
                        removeObserver: function () {
                            e.resize.observer && e.resize.observer.unobserve && e.el && (e.resize.observer.unobserve(e.el), e.resize.observer = null)
                        },
                        resizeHandler: function () {
                            e && !e.destroyed && e.initialized && (e.emit("beforeResize"), e.emit("resize"))
                        },
                        orientationChangeHandler: function () {
                            e && !e.destroyed && e.initialized && e.emit("orientationchange")
                        }
                    }
                })
            },
            on: {
                init: function (e) {
                    var t = o();
                    e.params.resizeObserver && void 0 !== o().ResizeObserver ? e.resize.createObserver() : (t.addEventListener("resize", e.resize.resizeHandler), t.addEventListener("orientationchange", e.resize.orientationChangeHandler))
                },
                destroy: function (e) {
                    var t = o();
                    e.resize.removeObserver(), t.removeEventListener("resize", e.resize.resizeHandler), t.removeEventListener("orientationchange", e.resize.orientationChangeHandler)
                }
            }
        },
        I = {
            attach: function (e, t) {
                void 0 === t && (t = {});
                var a = o(),
                    i = this,
                    s = new(a.MutationObserver || a.WebkitMutationObserver)((function (e) {
                        if (1 !== e.length) {
                            var t = function () {
                                i.emit("observerUpdate", e[0])
                            };
                            a.requestAnimationFrame ? a.requestAnimationFrame(t) : a.setTimeout(t, 0)
                        } else i.emit("observerUpdate", e[0])
                    }));
                s.observe(e, {
                    attributes: void 0 === t.attributes || t.attributes,
                    childList: void 0 === t.childList || t.childList,
                    characterData: void 0 === t.characterData || t.characterData
                }), i.observer.observers.push(s)
            },
            init: function () {
                var e = this;
                if (e.support.observer && e.params.observer) {
                    if (e.params.observeParents)
                        for (var t = e.$el.parents(), a = 0; a < t.length; a += 1) e.observer.attach(t[a]);
                    e.observer.attach(e.$el[0], {
                        childList: e.params.observeSlideChildren
                    }), e.observer.attach(e.$wrapperEl[0], {
                        attributes: !1
                    })
                }
            },
            destroy: function () {
                this.observer.observers.forEach((function (e) {
                    e.disconnect()
                })), this.observer.observers = []
            }
        },
        O = {
            name: "observer",
            params: {
                observer: !1,
                observeParents: !1,
                observeSlideChildren: !1
            },
            create: function () {
                M(this, {
                    observer: t({}, I, {
                        observers: []
                    })
                })
            },
            on: {
                init: function (e) {
                    e.observer.init()
                },
                destroy: function (e) {
                    e.observer.destroy()
                }
            }
        };

    function A(e) {
        var t = this,
            a = r(),
            i = o(),
            s = t.touchEventsData,
            n = t.params,
            l = t.touches;
        if (!t.animating || !n.preventInteractionOnTransition) {
            var d = e;
            d.originalEvent && (d = d.originalEvent);
            var p = m(d.target);
            if ("wrapper" !== n.touchEventsTarget || p.closest(t.wrapperEl).length)
                if (s.isTouchEvent = "touchstart" === d.type, s.isTouchEvent || !("which" in d) || 3 !== d.which)
                    if (!(!s.isTouchEvent && "button" in d && d.button > 0))
                        if (!s.isTouched || !s.isMoved)
                            if (!!n.noSwipingClass && "" !== n.noSwipingClass && d.target && d.target.shadowRoot && e.path && e.path[0] && (p = m(e.path[0])), n.noSwiping && p.closest(n.noSwipingSelector ? n.noSwipingSelector : "." + n.noSwipingClass)[0]) t.allowClick = !0;
                            else if (!n.swipeHandler || p.closest(n.swipeHandler)[0]) {
                l.currentX = "touchstart" === d.type ? d.targetTouches[0].pageX : d.pageX, l.currentY = "touchstart" === d.type ? d.targetTouches[0].pageY : d.pageY;
                var c = l.currentX,
                    u = l.currentY,
                    h = n.edgeSwipeDetection || n.iOSEdgeSwipeDetection,
                    v = n.edgeSwipeThreshold || n.iOSEdgeSwipeThreshold;
                if (h && (c <= v || c >= i.innerWidth - v)) {
                    if ("prevent" !== h) return;
                    e.preventDefault()
                }
                if (C(s, {
                        isTouched: !0,
                        isMoved: !1,
                        allowTouchCallbacks: !0,
                        isScrolling: void 0,
                        startMoving: void 0
                    }), l.startX = c, l.startY = u, s.touchStartTime = x(), t.allowClick = !0, t.updateSize(), t.swipeDirection = void 0, n.threshold > 0 && (s.allowThresholdMove = !1), "touchstart" !== d.type) {
                    var f = !0;
                    p.is(s.formElements) && (f = !1), a.activeElement && m(a.activeElement).is(s.formElements) && a.activeElement !== p[0] && a.activeElement.blur();
                    var g = f && t.allowTouchMove && n.touchStartPreventDefault;
                    !n.touchStartForcePreventDefault && !g || p[0].isContentEditable || d.preventDefault()
                }
                t.emit("touchStart", d)
            }
        }
    }

    function D(e) {
        var t = r(),
            a = this,
            i = a.touchEventsData,
            s = a.params,
            n = a.touches,
            o = a.rtlTranslate,
            l = e;
        if (l.originalEvent && (l = l.originalEvent), i.isTouched) {
            if (!i.isTouchEvent || "touchmove" === l.type) {
                var d = "touchmove" === l.type && l.targetTouches && (l.targetTouches[0] || l.changedTouches[0]),
                    p = "touchmove" === l.type ? d.pageX : l.pageX,
                    c = "touchmove" === l.type ? d.pageY : l.pageY;
                if (l.preventedByNestedSwiper) return n.startX = p, void(n.startY = c);
                if (!a.allowTouchMove) return a.allowClick = !1, void(i.isTouched && (C(n, {
                    startX: p,
                    startY: c,
                    currentX: p,
                    currentY: c
                }), i.touchStartTime = x()));
                if (i.isTouchEvent && s.touchReleaseOnEdges && !s.loop)
                    if (a.isVertical()) {
                        if (c < n.startY && a.translate <= a.maxTranslate() || c > n.startY && a.translate >= a.minTranslate()) return i.isTouched = !1, void(i.isMoved = !1)
                    } else if (p < n.startX && a.translate <= a.maxTranslate() || p > n.startX && a.translate >= a.minTranslate()) return;
                if (i.isTouchEvent && t.activeElement && l.target === t.activeElement && m(l.target).is(i.formElements)) return i.isMoved = !0, void(a.allowClick = !1);
                if (i.allowTouchCallbacks && a.emit("touchMove", l), !(l.targetTouches && l.targetTouches.length > 1)) {
                    n.currentX = p, n.currentY = c;
                    var u = n.currentX - n.startX,
                        h = n.currentY - n.startY;
                    if (!(a.params.threshold && Math.sqrt(Math.pow(u, 2) + Math.pow(h, 2)) < a.params.threshold)) {
                        var v;
                        if (void 0 === i.isScrolling) a.isHorizontal() && n.currentY === n.startY || a.isVertical() && n.currentX === n.startX ? i.isScrolling = !1 : u * u + h * h >= 25 && (v = 180 * Math.atan2(Math.abs(h), Math.abs(u)) / Math.PI, i.isScrolling = a.isHorizontal() ? v > s.touchAngle : 90 - v > s.touchAngle);
                        if (i.isScrolling && a.emit("touchMoveOpposite", l), void 0 === i.startMoving && (n.currentX === n.startX && n.currentY === n.startY || (i.startMoving = !0)), i.isScrolling) i.isTouched = !1;
                        else if (i.startMoving) {
                            a.allowClick = !1, !s.cssMode && l.cancelable && l.preventDefault(), s.touchMoveStopPropagation && !s.nested && l.stopPropagation(), i.isMoved || (s.loop && a.loopFix(), i.startTranslate = a.getTranslate(), a.setTransition(0), a.animating && a.$wrapperEl.trigger("webkitTransitionEnd transitionend"), i.allowMomentumBounce = !1, !s.grabCursor || !0 !== a.allowSlideNext && !0 !== a.allowSlidePrev || a.setGrabCursor(!0), a.emit("sliderFirstMove", l)), a.emit("sliderMove", l), i.isMoved = !0;
                            var f = a.isHorizontal() ? u : h;
                            n.diff = f, f *= s.touchRatio, o && (f = -f), a.swipeDirection = f > 0 ? "prev" : "next", i.currentTranslate = f + i.startTranslate;
                            var g = !0,
                                b = s.resistanceRatio;
                            if (s.touchReleaseOnEdges && (b = 0), f > 0 && i.currentTranslate > a.minTranslate() ? (g = !1, s.resistance && (i.currentTranslate = a.minTranslate() - 1 + Math.pow(-a.minTranslate() + i.startTranslate + f, b))) : f < 0 && i.currentTranslate < a.maxTranslate() && (g = !1, s.resistance && (i.currentTranslate = a.maxTranslate() + 1 - Math.pow(a.maxTranslate() - i.startTranslate - f, b))), g && (l.preventedByNestedSwiper = !0), !a.allowSlideNext && "next" === a.swipeDirection && i.currentTranslate < i.startTranslate && (i.currentTranslate = i.startTranslate), !a.allowSlidePrev && "prev" === a.swipeDirection && i.currentTranslate > i.startTranslate && (i.currentTranslate = i.startTranslate), a.allowSlidePrev || a.allowSlideNext || (i.currentTranslate = i.startTranslate), s.threshold > 0) {
                                if (!(Math.abs(f) > s.threshold || i.allowThresholdMove)) return void(i.currentTranslate = i.startTranslate);
                                if (!i.allowThresholdMove) return i.allowThresholdMove = !0, n.startX = n.currentX, n.startY = n.currentY, i.currentTranslate = i.startTranslate, void(n.diff = a.isHorizontal() ? n.currentX - n.startX : n.currentY - n.startY)
                            }
                            s.followFinger && !s.cssMode && ((s.freeMode || s.watchSlidesProgress || s.watchSlidesVisibility) && (a.updateActiveIndex(), a.updateSlidesClasses()), s.freeMode && (0 === i.velocities.length && i.velocities.push({
                                position: n[a.isHorizontal() ? "startX" : "startY"],
                                time: i.touchStartTime
                            }), i.velocities.push({
                                position: n[a.isHorizontal() ? "currentX" : "currentY"],
                                time: x()
                            })), a.updateProgress(i.currentTranslate), a.setTranslate(i.currentTranslate))
                        }
                    }
                }
            }
        } else i.startMoving && i.isScrolling && a.emit("touchMoveOpposite", l)
    }

    function N(e) {
        var t = this,
            a = t.touchEventsData,
            i = t.params,
            s = t.touches,
            r = t.rtlTranslate,
            n = t.$wrapperEl,
            o = t.slidesGrid,
            l = t.snapGrid,
            d = e;
        if (d.originalEvent && (d = d.originalEvent), a.allowTouchCallbacks && t.emit("touchEnd", d), a.allowTouchCallbacks = !1, !a.isTouched) return a.isMoved && i.grabCursor && t.setGrabCursor(!1), a.isMoved = !1, void(a.startMoving = !1);
        i.grabCursor && a.isMoved && a.isTouched && (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) && t.setGrabCursor(!1);
        var p, c = x(),
            u = c - a.touchStartTime;
        if (t.allowClick && (t.updateClickedSlide(d), t.emit("tap click", d), u < 300 && c - a.lastClickTime < 300 && t.emit("doubleTap doubleClick", d)), a.lastClickTime = x(), E((function () {
                t.destroyed || (t.allowClick = !0)
            })), !a.isTouched || !a.isMoved || !t.swipeDirection || 0 === s.diff || a.currentTranslate === a.startTranslate) return a.isTouched = !1, a.isMoved = !1, void(a.startMoving = !1);
        if (a.isTouched = !1, a.isMoved = !1, a.startMoving = !1, p = i.followFinger ? r ? t.translate : -t.translate : -a.currentTranslate, !i.cssMode)
            if (i.freeMode) {
                if (p < -t.minTranslate()) return void t.slideTo(t.activeIndex);
                if (p > -t.maxTranslate()) return void(t.slides.length < l.length ? t.slideTo(l.length - 1) : t.slideTo(t.slides.length - 1));
                if (i.freeModeMomentum) {
                    if (a.velocities.length > 1) {
                        var h = a.velocities.pop(),
                            v = a.velocities.pop(),
                            f = h.position - v.position,
                            m = h.time - v.time;
                        t.velocity = f / m, t.velocity /= 2, Math.abs(t.velocity) < i.freeModeMinimumVelocity && (t.velocity = 0), (m > 150 || x() - h.time > 300) && (t.velocity = 0)
                    } else t.velocity = 0;
                    t.velocity *= i.freeModeMomentumVelocityRatio, a.velocities.length = 0;
                    var g = 1e3 * i.freeModeMomentumRatio,
                        b = t.velocity * g,
                        w = t.translate + b;
                    r && (w = -w);
                    var y, T, S = !1,
                        C = 20 * Math.abs(t.velocity) * i.freeModeMomentumBounceRatio;
                    if (w < t.maxTranslate()) i.freeModeMomentumBounce ? (w + t.maxTranslate() < -C && (w = t.maxTranslate() - C), y = t.maxTranslate(), S = !0, a.allowMomentumBounce = !0) : w = t.maxTranslate(), i.loop && i.centeredSlides && (T = !0);
                    else if (w > t.minTranslate()) i.freeModeMomentumBounce ? (w - t.minTranslate() > C && (w = t.minTranslate() + C), y = t.minTranslate(), S = !0, a.allowMomentumBounce = !0) : w = t.minTranslate(), i.loop && i.centeredSlides && (T = !0);
                    else if (i.freeModeSticky) {
                        for (var M, z = 0; z < l.length; z += 1)
                            if (l[z] > -w) {
                                M = z;
                                break
                            } w = -(w = Math.abs(l[M] - w) < Math.abs(l[M - 1] - w) || "next" === t.swipeDirection ? l[M] : l[M - 1])
                    }
                    if (T && t.once("transitionEnd", (function () {
                            t.loopFix()
                        })), 0 !== t.velocity) {
                        if (g = r ? Math.abs((-w - t.translate) / t.velocity) : Math.abs((w - t.translate) / t.velocity), i.freeModeSticky) {
                            var P = Math.abs((r ? -w : w) - t.translate),
                                k = t.slidesSizesGrid[t.activeIndex];
                            g = P < k ? i.speed : P < 2 * k ? 1.5 * i.speed : 2.5 * i.speed
                        }
                    } else if (i.freeModeSticky) return void t.slideToClosest();
                    i.freeModeMomentumBounce && S ? (t.updateProgress(y), t.setTransition(g), t.setTranslate(w), t.transitionStart(!0, t.swipeDirection), t.animating = !0, n.transitionEnd((function () {
                        t && !t.destroyed && a.allowMomentumBounce && (t.emit("momentumBounce"), t.setTransition(i.speed), setTimeout((function () {
                            t.setTranslate(y), n.transitionEnd((function () {
                                t && !t.destroyed && t.transitionEnd()
                            }))
                        }), 0))
                    }))) : t.velocity ? (t.updateProgress(w), t.setTransition(g), t.setTranslate(w), t.transitionStart(!0, t.swipeDirection), t.animating || (t.animating = !0, n.transitionEnd((function () {
                        t && !t.destroyed && t.transitionEnd()
                    })))) : (t.emit("_freeModeNoMomentumRelease"), t.updateProgress(w)), t.updateActiveIndex(), t.updateSlidesClasses()
                } else {
                    if (i.freeModeSticky) return void t.slideToClosest();
                    i.freeMode && t.emit("_freeModeNoMomentumRelease")
                }(!i.freeModeMomentum || u >= i.longSwipesMs) && (t.updateProgress(), t.updateActiveIndex(), t.updateSlidesClasses())
            } else {
                for (var L = 0, $ = t.slidesSizesGrid[0], I = 0; I < o.length; I += I < i.slidesPerGroupSkip ? 1 : i.slidesPerGroup) {
                    var O = I < i.slidesPerGroupSkip - 1 ? 1 : i.slidesPerGroup;
                    void 0 !== o[I + O] ? p >= o[I] && p < o[I + O] && (L = I, $ = o[I + O] - o[I]) : p >= o[I] && (L = I, $ = o[o.length - 1] - o[o.length - 2])
                }
                var A = (p - o[L]) / $,
                    D = L < i.slidesPerGroupSkip - 1 ? 1 : i.slidesPerGroup;
                if (u > i.longSwipesMs) {
                    if (!i.longSwipes) return void t.slideTo(t.activeIndex);
                    "next" === t.swipeDirection && (A >= i.longSwipesRatio ? t.slideTo(L + D) : t.slideTo(L)), "prev" === t.swipeDirection && (A > 1 - i.longSwipesRatio ? t.slideTo(L + D) : t.slideTo(L))
                } else {
                    if (!i.shortSwipes) return void t.slideTo(t.activeIndex);
                    t.navigation && (d.target === t.navigation.nextEl || d.target === t.navigation.prevEl) ? d.target === t.navigation.nextEl ? t.slideTo(L + D) : t.slideTo(L) : ("next" === t.swipeDirection && t.slideTo(L + D), "prev" === t.swipeDirection && t.slideTo(L))
                }
            }
    }

    function G() {
        var e = this,
            t = e.params,
            a = e.el;
        if (!a || 0 !== a.offsetWidth) {
            t.breakpoints && e.setBreakpoint();
            var i = e.allowSlideNext,
                s = e.allowSlidePrev,
                r = e.snapGrid;
            e.allowSlideNext = !0, e.allowSlidePrev = !0, e.updateSize(), e.updateSlides(), e.updateSlidesClasses(), ("auto" === t.slidesPerView || t.slidesPerView > 1) && e.isEnd && !e.isBeginning && !e.params.centeredSlides ? e.slideTo(e.slides.length - 1, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0), e.autoplay && e.autoplay.running && e.autoplay.paused && e.autoplay.run(), e.allowSlidePrev = s, e.allowSlideNext = i, e.params.watchOverflow && r !== e.snapGrid && e.checkOverflow()
        }
    }

    function B(e) {
        var t = this;
        t.allowClick || (t.params.preventClicks && e.preventDefault(), t.params.preventClicksPropagation && t.animating && (e.stopPropagation(), e.stopImmediatePropagation()))
    }

    function H() {
        var e = this,
            t = e.wrapperEl,
            a = e.rtlTranslate;
        e.previousTranslate = e.translate, e.isHorizontal() ? e.translate = a ? t.scrollWidth - t.offsetWidth - t.scrollLeft : -t.scrollLeft : e.translate = -t.scrollTop, -0 === e.translate && (e.translate = 0), e.updateActiveIndex(), e.updateSlidesClasses();
        var i = e.maxTranslate() - e.minTranslate();
        (0 === i ? 0 : (e.translate - e.minTranslate()) / i) !== e.progress && e.updateProgress(a ? -e.translate : e.translate), e.emit("setTranslate", e.translate, !1)
    }
    var X = !1;

    function Y() {}
    var R = {
            init: !0,
            direction: "horizontal",
            touchEventsTarget: "container",
            initialSlide: 0,
            speed: 300,
            cssMode: !1,
            updateOnWindowResize: !0,
            resizeObserver: !1,
            nested: !1,
            width: null,
            height: null,
            preventInteractionOnTransition: !1,
            userAgent: null,
            url: null,
            edgeSwipeDetection: !1,
            edgeSwipeThreshold: 20,
            freeMode: !1,
            freeModeMomentum: !0,
            freeModeMomentumRatio: 1,
            freeModeMomentumBounce: !0,
            freeModeMomentumBounceRatio: 1,
            freeModeMomentumVelocityRatio: 1,
            freeModeSticky: !1,
            freeModeMinimumVelocity: .02,
            autoHeight: !1,
            setWrapperSize: !1,
            virtualTranslate: !1,
            effect: "slide",
            breakpoints: void 0,
            breakpointsBase: "window",
            spaceBetween: 0,
            slidesPerView: 1,
            slidesPerColumn: 1,
            slidesPerColumnFill: "column",
            slidesPerGroup: 1,
            slidesPerGroupSkip: 0,
            centeredSlides: !1,
            centeredSlidesBounds: !1,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
            normalizeSlideIndex: !0,
            centerInsufficientSlides: !1,
            watchOverflow: !1,
            roundLengths: !1,
            touchRatio: 1,
            touchAngle: 45,
            simulateTouch: !0,
            shortSwipes: !0,
            longSwipes: !0,
            longSwipesRatio: .5,
            longSwipesMs: 300,
            followFinger: !0,
            allowTouchMove: !0,
            threshold: 0,
            touchMoveStopPropagation: !1,
            touchStartPreventDefault: !0,
            touchStartForcePreventDefault: !1,
            touchReleaseOnEdges: !1,
            uniqueNavElements: !0,
            resistance: !0,
            resistanceRatio: .85,
            watchSlidesProgress: !1,
            watchSlidesVisibility: !1,
            grabCursor: !1,
            preventClicks: !0,
            preventClicksPropagation: !0,
            slideToClickedSlide: !1,
            preloadImages: !0,
            updateOnImagesReady: !0,
            loop: !1,
            loopAdditionalSlides: 0,
            loopedSlides: null,
            loopFillGroupWithBlank: !1,
            loopPreventsSlide: !0,
            allowSlidePrev: !0,
            allowSlideNext: !0,
            swipeHandler: null,
            noSwiping: !0,
            noSwipingClass: "swiper-no-swiping",
            noSwipingSelector: null,
            passiveListeners: !0,
            containerModifierClass: "swiper-container-",
            slideClass: "swiper-slide",
            slideBlankClass: "swiper-slide-invisible-blank",
            slideActiveClass: "swiper-slide-active",
            slideDuplicateActiveClass: "swiper-slide-duplicate-active",
            slideVisibleClass: "swiper-slide-visible",
            slideDuplicateClass: "swiper-slide-duplicate",
            slideNextClass: "swiper-slide-next",
            slideDuplicateNextClass: "swiper-slide-duplicate-next",
            slidePrevClass: "swiper-slide-prev",
            slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
            wrapperClass: "swiper-wrapper",
            runCallbacksOnInit: !0,
            _emitClasses: !1
        },
        V = {
            modular: {
                useParams: function (e) {
                    var t = this;
                    t.modules && Object.keys(t.modules).forEach((function (a) {
                        var i = t.modules[a];
                        i.params && C(e, i.params)
                    }))
                },
                useModules: function (e) {
                    void 0 === e && (e = {});
                    var t = this;
                    t.modules && Object.keys(t.modules).forEach((function (a) {
                        var i = t.modules[a],
                            s = e[a] || {};
                        i.on && t.on && Object.keys(i.on).forEach((function (e) {
                            t.on(e, i.on[e])
                        })), i.create && i.create.bind(t)(s)
                    }))
                }
            },
            eventsEmitter: {
                on: function (e, t, a) {
                    var i = this;
                    if ("function" != typeof t) return i;
                    var s = a ? "unshift" : "push";
                    return e.split(" ").forEach((function (e) {
                        i.eventsListeners[e] || (i.eventsListeners[e] = []), i.eventsListeners[e][s](t)
                    })), i
                },
                once: function (e, t, a) {
                    var i = this;
                    if ("function" != typeof t) return i;

                    function s() {
                        i.off(e, s), s.__emitterProxy && delete s.__emitterProxy;
                        for (var a = arguments.length, r = new Array(a), n = 0; n < a; n++) r[n] = arguments[n];
                        t.apply(i, r)
                    }
                    return s.__emitterProxy = t, i.on(e, s, a)
                },
                onAny: function (e, t) {
                    var a = this;
                    if ("function" != typeof e) return a;
                    var i = t ? "unshift" : "push";
                    return a.eventsAnyListeners.indexOf(e) < 0 && a.eventsAnyListeners[i](e), a
                },
                offAny: function (e) {
                    var t = this;
                    if (!t.eventsAnyListeners) return t;
                    var a = t.eventsAnyListeners.indexOf(e);
                    return a >= 0 && t.eventsAnyListeners.splice(a, 1), t
                },
                off: function (e, t) {
                    var a = this;
                    return a.eventsListeners ? (e.split(" ").forEach((function (e) {
                        void 0 === t ? a.eventsListeners[e] = [] : a.eventsListeners[e] && a.eventsListeners[e].forEach((function (i, s) {
                            (i === t || i.__emitterProxy && i.__emitterProxy === t) && a.eventsListeners[e].splice(s, 1)
                        }))
                    })), a) : a
                },
                emit: function () {
                    var e, t, a, i = this;
                    if (!i.eventsListeners) return i;
                    for (var s = arguments.length, r = new Array(s), n = 0; n < s; n++) r[n] = arguments[n];
                    "string" == typeof r[0] || Array.isArray(r[0]) ? (e = r[0], t = r.slice(1, r.length), a = i) : (e = r[0].events, t = r[0].data, a = r[0].context || i), t.unshift(a);
                    var o = Array.isArray(e) ? e : e.split(" ");
                    return o.forEach((function (e) {
                        i.eventsAnyListeners && i.eventsAnyListeners.length && i.eventsAnyListeners.forEach((function (i) {
                            i.apply(a, [e].concat(t))
                        })), i.eventsListeners && i.eventsListeners[e] && i.eventsListeners[e].forEach((function (e) {
                            e.apply(a, t)
                        }))
                    })), i
                }
            },
            update: {
                updateSize: function () {
                    var e, t, a = this,
                        i = a.$el;
                    e = void 0 !== a.params.width && null !== a.params.width ? a.params.width : i[0].clientWidth, t = void 0 !== a.params.height && null !== a.params.height ? a.params.height : i[0].clientHeight, 0 === e && a.isHorizontal() || 0 === t && a.isVertical() || (e = e - parseInt(i.css("padding-left") || 0, 10) - parseInt(i.css("padding-right") || 0, 10), t = t - parseInt(i.css("padding-top") || 0, 10) - parseInt(i.css("padding-bottom") || 0, 10), Number.isNaN(e) && (e = 0), Number.isNaN(t) && (t = 0), C(a, {
                        width: e,
                        height: t,
                        size: a.isHorizontal() ? e : t
                    }))
                },
                updateSlides: function () {
                    var e = this,
                        t = function (t) {
                            return e.isHorizontal() ? t : {
                                width: "height",
                                "margin-top": "margin-left",
                                "margin-bottom ": "margin-right",
                                "margin-left": "margin-top",
                                "margin-right": "margin-bottom",
                                "padding-left": "padding-top",
                                "padding-right": "padding-bottom",
                                marginRight: "marginBottom"
                            } [t]
                        },
                        a = function (e, a) {
                            return parseFloat(e.getPropertyValue(t(a)) || 0)
                        },
                        i = e.params,
                        s = e.$wrapperEl,
                        r = e.size,
                        n = e.rtlTranslate,
                        o = e.wrongRTL,
                        l = e.virtual && i.virtual.enabled,
                        d = l ? e.virtual.slides.length : e.slides.length,
                        p = s.children("." + e.params.slideClass),
                        c = l ? e.virtual.slides.length : p.length,
                        u = [],
                        h = [],
                        v = [],
                        f = i.slidesOffsetBefore;
                    "function" == typeof f && (f = i.slidesOffsetBefore.call(e));
                    var m = i.slidesOffsetAfter;
                    "function" == typeof m && (m = i.slidesOffsetAfter.call(e));
                    var g = e.snapGrid.length,
                        b = e.slidesGrid.length,
                        w = i.spaceBetween,
                        y = -f,
                        E = 0,
                        x = 0;
                    if (void 0 !== r) {
                        var T, S;
                        "string" == typeof w && w.indexOf("%") >= 0 && (w = parseFloat(w.replace("%", "")) / 100 * r), e.virtualSize = -w, n ? p.css({
                            marginLeft: "",
                            marginTop: ""
                        }) : p.css({
                            marginRight: "",
                            marginBottom: ""
                        }), i.slidesPerColumn > 1 && (T = Math.floor(c / i.slidesPerColumn) === c / e.params.slidesPerColumn ? c : Math.ceil(c / i.slidesPerColumn) * i.slidesPerColumn, "auto" !== i.slidesPerView && "row" === i.slidesPerColumnFill && (T = Math.max(T, i.slidesPerView * i.slidesPerColumn)));
                        for (var M, z, P, k = i.slidesPerColumn, L = T / k, $ = Math.floor(c / i.slidesPerColumn), I = 0; I < c; I += 1) {
                            S = 0;
                            var O = p.eq(I);
                            if (i.slidesPerColumn > 1) {
                                var A = void 0,
                                    D = void 0,
                                    N = void 0;
                                if ("row" === i.slidesPerColumnFill && i.slidesPerGroup > 1) {
                                    var G = Math.floor(I / (i.slidesPerGroup * i.slidesPerColumn)),
                                        B = I - i.slidesPerColumn * i.slidesPerGroup * G,
                                        H = 0 === G ? i.slidesPerGroup : Math.min(Math.ceil((c - G * k * i.slidesPerGroup) / k), i.slidesPerGroup);
                                    A = (D = B - (N = Math.floor(B / H)) * H + G * i.slidesPerGroup) + N * T / k, O.css({
                                        "-webkit-box-ordinal-group": A,
                                        "-moz-box-ordinal-group": A,
                                        "-ms-flex-order": A,
                                        "-webkit-order": A,
                                        order: A
                                    })
                                } else "column" === i.slidesPerColumnFill ? (N = I - (D = Math.floor(I / k)) * k, (D > $ || D === $ && N === k - 1) && (N += 1) >= k && (N = 0, D += 1)) : D = I - (N = Math.floor(I / L)) * L;
                                O.css(t("margin-top"), 0 !== N && i.spaceBetween && i.spaceBetween + "px")
                            }
                            if ("none" !== O.css("display")) {
                                if ("auto" === i.slidesPerView) {
                                    var X = getComputedStyle(O[0]),
                                        Y = O[0].style.transform,
                                        R = O[0].style.webkitTransform;
                                    if (Y && (O[0].style.transform = "none"), R && (O[0].style.webkitTransform = "none"), i.roundLengths) S = e.isHorizontal() ? O.outerWidth(!0) : O.outerHeight(!0);
                                    else {
                                        var V = a(X, "width"),
                                            W = a(X, "padding-left"),
                                            F = a(X, "padding-right"),
                                            _ = a(X, "margin-left"),
                                            q = a(X, "margin-right"),
                                            j = X.getPropertyValue("box-sizing");
                                        if (j && "border-box" === j) S = V + _ + q;
                                        else {
                                            var U = O[0],
                                                K = U.clientWidth;
                                            S = V + W + F + _ + q + (U.offsetWidth - K)
                                        }
                                    }
                                    Y && (O[0].style.transform = Y), R && (O[0].style.webkitTransform = R), i.roundLengths && (S = Math.floor(S))
                                } else S = (r - (i.slidesPerView - 1) * w) / i.slidesPerView, i.roundLengths && (S = Math.floor(S)), p[I] && (p[I].style[t("width")] = S + "px");
                                p[I] && (p[I].swiperSlideSize = S), v.push(S), i.centeredSlides ? (y = y + S / 2 + E / 2 + w, 0 === E && 0 !== I && (y = y - r / 2 - w), 0 === I && (y = y - r / 2 - w), Math.abs(y) < .001 && (y = 0), i.roundLengths && (y = Math.floor(y)), x % i.slidesPerGroup == 0 && u.push(y), h.push(y)) : (i.roundLengths && (y = Math.floor(y)), (x - Math.min(e.params.slidesPerGroupSkip, x)) % e.params.slidesPerGroup == 0 && u.push(y), h.push(y), y = y + S + w), e.virtualSize += S + w, E = S, x += 1
                            }
                        }
                        if (e.virtualSize = Math.max(e.virtualSize, r) + m, n && o && ("slide" === i.effect || "coverflow" === i.effect) && s.css({
                                width: e.virtualSize + i.spaceBetween + "px"
                            }), i.setWrapperSize) s.css(((z = {})[t("width")] = e.virtualSize + i.spaceBetween + "px", z));
                        if (i.slidesPerColumn > 1)
                            if (e.virtualSize = (S + i.spaceBetween) * T, e.virtualSize = Math.ceil(e.virtualSize / i.slidesPerColumn) - i.spaceBetween, s.css(((P = {})[t("width")] = e.virtualSize + i.spaceBetween + "px", P)), i.centeredSlides) {
                                M = [];
                                for (var Z = 0; Z < u.length; Z += 1) {
                                    var J = u[Z];
                                    i.roundLengths && (J = Math.floor(J)), u[Z] < e.virtualSize + u[0] && M.push(J)
                                }
                                u = M
                            } if (!i.centeredSlides) {
                            M = [];
                            for (var Q = 0; Q < u.length; Q += 1) {
                                var ee = u[Q];
                                i.roundLengths && (ee = Math.floor(ee)), u[Q] <= e.virtualSize - r && M.push(ee)
                            }
                            u = M, Math.floor(e.virtualSize - r) - Math.floor(u[u.length - 1]) > 1 && u.push(e.virtualSize - r)
                        }
                        if (0 === u.length && (u = [0]), 0 !== i.spaceBetween) {
                            var te, ae = e.isHorizontal() && n ? "marginLeft" : t("marginRight");
                            p.filter((function (e, t) {
                                return !i.cssMode || t !== p.length - 1
                            })).css(((te = {})[ae] = w + "px", te))
                        }
                        if (i.centeredSlides && i.centeredSlidesBounds) {
                            var ie = 0;
                            v.forEach((function (e) {
                                ie += e + (i.spaceBetween ? i.spaceBetween : 0)
                            }));
                            var se = (ie -= i.spaceBetween) - r;
                            u = u.map((function (e) {
                                return e < 0 ? -f : e > se ? se + m : e
                            }))
                        }
                        if (i.centerInsufficientSlides) {
                            var re = 0;
                            if (v.forEach((function (e) {
                                    re += e + (i.spaceBetween ? i.spaceBetween : 0)
                                })), (re -= i.spaceBetween) < r) {
                                var ne = (r - re) / 2;
                                u.forEach((function (e, t) {
                                    u[t] = e - ne
                                })), h.forEach((function (e, t) {
                                    h[t] = e + ne
                                }))
                            }
                        }
                        C(e, {
                            slides: p,
                            snapGrid: u,
                            slidesGrid: h,
                            slidesSizesGrid: v
                        }), c !== d && e.emit("slidesLengthChange"), u.length !== g && (e.params.watchOverflow && e.checkOverflow(), e.emit("snapGridLengthChange")), h.length !== b && e.emit("slidesGridLengthChange"), (i.watchSlidesProgress || i.watchSlidesVisibility) && e.updateSlidesOffset()
                    }
                },
                updateAutoHeight: function (e) {
                    var t, a = this,
                        i = [],
                        s = 0;
                    if ("number" == typeof e ? a.setTransition(e) : !0 === e && a.setTransition(a.params.speed), "auto" !== a.params.slidesPerView && a.params.slidesPerView > 1)
                        if (a.params.centeredSlides) a.visibleSlides.each((function (e) {
                            i.push(e)
                        }));
                        else
                            for (t = 0; t < Math.ceil(a.params.slidesPerView); t += 1) {
                                var r = a.activeIndex + t;
                                if (r > a.slides.length) break;
                                i.push(a.slides.eq(r)[0])
                            } else i.push(a.slides.eq(a.activeIndex)[0]);
                    for (t = 0; t < i.length; t += 1)
                        if (void 0 !== i[t]) {
                            var n = i[t].offsetHeight;
                            s = n > s ? n : s
                        } s && a.$wrapperEl.css("height", s + "px")
                },
                updateSlidesOffset: function () {
                    for (var e = this.slides, t = 0; t < e.length; t += 1) e[t].swiperSlideOffset = this.isHorizontal() ? e[t].offsetLeft : e[t].offsetTop
                },
                updateSlidesProgress: function (e) {
                    void 0 === e && (e = this && this.translate || 0);
                    var t = this,
                        a = t.params,
                        i = t.slides,
                        s = t.rtlTranslate;
                    if (0 !== i.length) {
                        void 0 === i[0].swiperSlideOffset && t.updateSlidesOffset();
                        var r = -e;
                        s && (r = e), i.removeClass(a.slideVisibleClass), t.visibleSlidesIndexes = [], t.visibleSlides = [];
                        for (var n = 0; n < i.length; n += 1) {
                            var o = i[n],
                                l = (r + (a.centeredSlides ? t.minTranslate() : 0) - o.swiperSlideOffset) / (o.swiperSlideSize + a.spaceBetween);
                            if (a.watchSlidesVisibility || a.centeredSlides && a.autoHeight) {
                                var d = -(r - o.swiperSlideOffset),
                                    p = d + t.slidesSizesGrid[n];
                                (d >= 0 && d < t.size - 1 || p > 1 && p <= t.size || d <= 0 && p >= t.size) && (t.visibleSlides.push(o), t.visibleSlidesIndexes.push(n), i.eq(n).addClass(a.slideVisibleClass))
                            }
                            o.progress = s ? -l : l
                        }
                        t.visibleSlides = m(t.visibleSlides)
                    }
                },
                updateProgress: function (e) {
                    var t = this;
                    if (void 0 === e) {
                        var a = t.rtlTranslate ? -1 : 1;
                        e = t && t.translate && t.translate * a || 0
                    }
                    var i = t.params,
                        s = t.maxTranslate() - t.minTranslate(),
                        r = t.progress,
                        n = t.isBeginning,
                        o = t.isEnd,
                        l = n,
                        d = o;
                    0 === s ? (r = 0, n = !0, o = !0) : (n = (r = (e - t.minTranslate()) / s) <= 0, o = r >= 1), C(t, {
                        progress: r,
                        isBeginning: n,
                        isEnd: o
                    }), (i.watchSlidesProgress || i.watchSlidesVisibility || i.centeredSlides && i.autoHeight) && t.updateSlidesProgress(e), n && !l && t.emit("reachBeginning toEdge"), o && !d && t.emit("reachEnd toEdge"), (l && !n || d && !o) && t.emit("fromEdge"), t.emit("progress", r)
                },
                updateSlidesClasses: function () {
                    var e, t = this,
                        a = t.slides,
                        i = t.params,
                        s = t.$wrapperEl,
                        r = t.activeIndex,
                        n = t.realIndex,
                        o = t.virtual && i.virtual.enabled;
                    a.removeClass(i.slideActiveClass + " " + i.slideNextClass + " " + i.slidePrevClass + " " + i.slideDuplicateActiveClass + " " + i.slideDuplicateNextClass + " " + i.slideDuplicatePrevClass), (e = o ? t.$wrapperEl.find("." + i.slideClass + '[data-swiper-slide-index="' + r + '"]') : a.eq(r)).addClass(i.slideActiveClass), i.loop && (e.hasClass(i.slideDuplicateClass) ? s.children("." + i.slideClass + ":not(." + i.slideDuplicateClass + ')[data-swiper-slide-index="' + n + '"]').addClass(i.slideDuplicateActiveClass) : s.children("." + i.slideClass + "." + i.slideDuplicateClass + '[data-swiper-slide-index="' + n + '"]').addClass(i.slideDuplicateActiveClass));
                    var l = e.nextAll("." + i.slideClass).eq(0).addClass(i.slideNextClass);
                    i.loop && 0 === l.length && (l = a.eq(0)).addClass(i.slideNextClass);
                    var d = e.prevAll("." + i.slideClass).eq(0).addClass(i.slidePrevClass);
                    i.loop && 0 === d.length && (d = a.eq(-1)).addClass(i.slidePrevClass), i.loop && (l.hasClass(i.slideDuplicateClass) ? s.children("." + i.slideClass + ":not(." + i.slideDuplicateClass + ')[data-swiper-slide-index="' + l.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicateNextClass) : s.children("." + i.slideClass + "." + i.slideDuplicateClass + '[data-swiper-slide-index="' + l.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicateNextClass), d.hasClass(i.slideDuplicateClass) ? s.children("." + i.slideClass + ":not(." + i.slideDuplicateClass + ')[data-swiper-slide-index="' + d.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicatePrevClass) : s.children("." + i.slideClass + "." + i.slideDuplicateClass + '[data-swiper-slide-index="' + d.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicatePrevClass)), t.emitSlidesClasses()
                },
                updateActiveIndex: function (e) {
                    var t, a = this,
                        i = a.rtlTranslate ? a.translate : -a.translate,
                        s = a.slidesGrid,
                        r = a.snapGrid,
                        n = a.params,
                        o = a.activeIndex,
                        l = a.realIndex,
                        d = a.snapIndex,
                        p = e;
                    if (void 0 === p) {
                        for (var c = 0; c < s.length; c += 1) void 0 !== s[c + 1] ? i >= s[c] && i < s[c + 1] - (s[c + 1] - s[c]) / 2 ? p = c : i >= s[c] && i < s[c + 1] && (p = c + 1) : i >= s[c] && (p = c);
                        n.normalizeSlideIndex && (p < 0 || void 0 === p) && (p = 0)
                    }
                    if (r.indexOf(i) >= 0) t = r.indexOf(i);
                    else {
                        var u = Math.min(n.slidesPerGroupSkip, p);
                        t = u + Math.floor((p - u) / n.slidesPerGroup)
                    }
                    if (t >= r.length && (t = r.length - 1), p !== o) {
                        var h = parseInt(a.slides.eq(p).attr("data-swiper-slide-index") || p, 10);
                        C(a, {
                            snapIndex: t,
                            realIndex: h,
                            previousIndex: o,
                            activeIndex: p
                        }), a.emit("activeIndexChange"), a.emit("snapIndexChange"), l !== h && a.emit("realIndexChange"), (a.initialized || a.params.runCallbacksOnInit) && a.emit("slideChange")
                    } else t !== d && (a.snapIndex = t, a.emit("snapIndexChange"))
                },
                updateClickedSlide: function (e) {
                    var t, a = this,
                        i = a.params,
                        s = m(e.target).closest("." + i.slideClass)[0],
                        r = !1;
                    if (s)
                        for (var n = 0; n < a.slides.length; n += 1)
                            if (a.slides[n] === s) {
                                r = !0, t = n;
                                break
                            } if (!s || !r) return a.clickedSlide = void 0, void(a.clickedIndex = void 0);
                    a.clickedSlide = s, a.virtual && a.params.virtual.enabled ? a.clickedIndex = parseInt(m(s).attr("data-swiper-slide-index"), 10) : a.clickedIndex = t, i.slideToClickedSlide && void 0 !== a.clickedIndex && a.clickedIndex !== a.activeIndex && a.slideToClickedSlide()
                }
            },
            translate: {
                getTranslate: function (e) {
                    void 0 === e && (e = this.isHorizontal() ? "x" : "y");
                    var t = this,
                        a = t.params,
                        i = t.rtlTranslate,
                        s = t.translate,
                        r = t.$wrapperEl;
                    if (a.virtualTranslate) return i ? -s : s;
                    if (a.cssMode) return s;
                    var n = T(r[0], e);
                    return i && (n = -n), n || 0
                },
                setTranslate: function (e, t) {
                    var a = this,
                        i = a.rtlTranslate,
                        s = a.params,
                        r = a.$wrapperEl,
                        n = a.wrapperEl,
                        o = a.progress,
                        l = 0,
                        d = 0;
                    a.isHorizontal() ? l = i ? -e : e : d = e, s.roundLengths && (l = Math.floor(l), d = Math.floor(d)), s.cssMode ? n[a.isHorizontal() ? "scrollLeft" : "scrollTop"] = a.isHorizontal() ? -l : -d : s.virtualTranslate || r.transform("translate3d(" + l + "px, " + d + "px, 0px)"), a.previousTranslate = a.translate, a.translate = a.isHorizontal() ? l : d;
                    var p = a.maxTranslate() - a.minTranslate();
                    (0 === p ? 0 : (e - a.minTranslate()) / p) !== o && a.updateProgress(e), a.emit("setTranslate", a.translate, t)
                },
                minTranslate: function () {
                    return -this.snapGrid[0]
                },
                maxTranslate: function () {
                    return -this.snapGrid[this.snapGrid.length - 1]
                },
                translateTo: function (e, t, a, i, s) {
                    void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === a && (a = !0), void 0 === i && (i = !0);
                    var r = this,
                        n = r.params,
                        o = r.wrapperEl;
                    if (r.animating && n.preventInteractionOnTransition) return !1;
                    var l, d = r.minTranslate(),
                        p = r.maxTranslate();
                    if (l = i && e > d ? d : i && e < p ? p : e, r.updateProgress(l), n.cssMode) {
                        var c, u = r.isHorizontal();
                        if (0 === t) o[u ? "scrollLeft" : "scrollTop"] = -l;
                        else if (o.scrollTo) o.scrollTo(((c = {})[u ? "left" : "top"] = -l, c.behavior = "smooth", c));
                        else o[u ? "scrollLeft" : "scrollTop"] = -l;
                        return !0
                    }
                    return 0 === t ? (r.setTransition(0), r.setTranslate(l), a && (r.emit("beforeTransitionStart", t, s), r.emit("transitionEnd"))) : (r.setTransition(t), r.setTranslate(l), a && (r.emit("beforeTransitionStart", t, s), r.emit("transitionStart")), r.animating || (r.animating = !0, r.onTranslateToWrapperTransitionEnd || (r.onTranslateToWrapperTransitionEnd = function (e) {
                        r && !r.destroyed && e.target === this && (r.$wrapperEl[0].removeEventListener("transitionend", r.onTranslateToWrapperTransitionEnd), r.$wrapperEl[0].removeEventListener("webkitTransitionEnd", r.onTranslateToWrapperTransitionEnd), r.onTranslateToWrapperTransitionEnd = null, delete r.onTranslateToWrapperTransitionEnd, a && r.emit("transitionEnd"))
                    }), r.$wrapperEl[0].addEventListener("transitionend", r.onTranslateToWrapperTransitionEnd), r.$wrapperEl[0].addEventListener("webkitTransitionEnd", r.onTranslateToWrapperTransitionEnd))), !0
                }
            },
            transition: {
                setTransition: function (e, t) {
                    var a = this;
                    a.params.cssMode || a.$wrapperEl.transition(e), a.emit("setTransition", e, t)
                },
                transitionStart: function (e, t) {
                    void 0 === e && (e = !0);
                    var a = this,
                        i = a.activeIndex,
                        s = a.params,
                        r = a.previousIndex;
                    if (!s.cssMode) {
                        s.autoHeight && a.updateAutoHeight();
                        var n = t;
                        if (n || (n = i > r ? "next" : i < r ? "prev" : "reset"), a.emit("transitionStart"), e && i !== r) {
                            if ("reset" === n) return void a.emit("slideResetTransitionStart");
                            a.emit("slideChangeTransitionStart"), "next" === n ? a.emit("slideNextTransitionStart") : a.emit("slidePrevTransitionStart")
                        }
                    }
                },
                transitionEnd: function (e, t) {
                    void 0 === e && (e = !0);
                    var a = this,
                        i = a.activeIndex,
                        s = a.previousIndex,
                        r = a.params;
                    if (a.animating = !1, !r.cssMode) {
                        a.setTransition(0);
                        var n = t;
                        if (n || (n = i > s ? "next" : i < s ? "prev" : "reset"), a.emit("transitionEnd"), e && i !== s) {
                            if ("reset" === n) return void a.emit("slideResetTransitionEnd");
                            a.emit("slideChangeTransitionEnd"), "next" === n ? a.emit("slideNextTransitionEnd") : a.emit("slidePrevTransitionEnd")
                        }
                    }
                }
            },
            slide: {
                slideTo: function (e, t, a, i) {
                    if (void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === a && (a = !0), "number" != typeof e && "string" != typeof e) throw new Error("The 'index' argument cannot have type other than 'number' or 'string'. [" + typeof e + "] given.");
                    if ("string" == typeof e) {
                        var s = parseInt(e, 10);
                        if (!isFinite(s)) throw new Error("The passed-in 'index' (string) couldn't be converted to 'number'. [" + e + "] given.");
                        e = s
                    }
                    var r = this,
                        n = e;
                    n < 0 && (n = 0);
                    var o = r.params,
                        l = r.snapGrid,
                        d = r.slidesGrid,
                        p = r.previousIndex,
                        c = r.activeIndex,
                        u = r.rtlTranslate,
                        h = r.wrapperEl;
                    if (r.animating && o.preventInteractionOnTransition) return !1;
                    var v = Math.min(r.params.slidesPerGroupSkip, n),
                        f = v + Math.floor((n - v) / r.params.slidesPerGroup);
                    f >= l.length && (f = l.length - 1), (c || o.initialSlide || 0) === (p || 0) && a && r.emit("beforeSlideChangeStart");
                    var m, g = -l[f];
                    if (r.updateProgress(g), o.normalizeSlideIndex)
                        for (var b = 0; b < d.length; b += 1) {
                            var w = -Math.floor(100 * g),
                                y = Math.floor(100 * d[b]),
                                E = Math.floor(100 * d[b + 1]);
                            void 0 !== d[b + 1] ? w >= y && w < E - (E - y) / 2 ? n = b : w >= y && w < E && (n = b + 1) : w >= y && (n = b)
                        }
                    if (r.initialized && n !== c) {
                        if (!r.allowSlideNext && g < r.translate && g < r.minTranslate()) return !1;
                        if (!r.allowSlidePrev && g > r.translate && g > r.maxTranslate() && (c || 0) !== n) return !1
                    }
                    if (m = n > c ? "next" : n < c ? "prev" : "reset", u && -g === r.translate || !u && g === r.translate) return r.updateActiveIndex(n), o.autoHeight && r.updateAutoHeight(), r.updateSlidesClasses(), "slide" !== o.effect && r.setTranslate(g), "reset" !== m && (r.transitionStart(a, m), r.transitionEnd(a, m)), !1;
                    if (o.cssMode) {
                        var x, T = r.isHorizontal(),
                            S = -g;
                        if (u && (S = h.scrollWidth - h.offsetWidth - S), 0 === t) h[T ? "scrollLeft" : "scrollTop"] = S;
                        else if (h.scrollTo) h.scrollTo(((x = {})[T ? "left" : "top"] = S, x.behavior = "smooth", x));
                        else h[T ? "scrollLeft" : "scrollTop"] = S;
                        return !0
                    }
                    return 0 === t ? (r.setTransition(0), r.setTranslate(g), r.updateActiveIndex(n), r.updateSlidesClasses(), r.emit("beforeTransitionStart", t, i), r.transitionStart(a, m), r.transitionEnd(a, m)) : (r.setTransition(t), r.setTranslate(g), r.updateActiveIndex(n), r.updateSlidesClasses(), r.emit("beforeTransitionStart", t, i), r.transitionStart(a, m), r.animating || (r.animating = !0, r.onSlideToWrapperTransitionEnd || (r.onSlideToWrapperTransitionEnd = function (e) {
                        r && !r.destroyed && e.target === this && (r.$wrapperEl[0].removeEventListener("transitionend", r.onSlideToWrapperTransitionEnd), r.$wrapperEl[0].removeEventListener("webkitTransitionEnd", r.onSlideToWrapperTransitionEnd), r.onSlideToWrapperTransitionEnd = null, delete r.onSlideToWrapperTransitionEnd, r.transitionEnd(a, m))
                    }), r.$wrapperEl[0].addEventListener("transitionend", r.onSlideToWrapperTransitionEnd), r.$wrapperEl[0].addEventListener("webkitTransitionEnd", r.onSlideToWrapperTransitionEnd))), !0
                },
                slideToLoop: function (e, t, a, i) {
                    void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === a && (a = !0);
                    var s = this,
                        r = e;
                    return s.params.loop && (r += s.loopedSlides), s.slideTo(r, t, a, i)
                },
                slideNext: function (e, t, a) {
                    void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
                    var i = this,
                        s = i.params,
                        r = i.animating,
                        n = i.activeIndex < s.slidesPerGroupSkip ? 1 : s.slidesPerGroup;
                    if (s.loop) {
                        if (r && s.loopPreventsSlide) return !1;
                        i.loopFix(), i._clientLeft = i.$wrapperEl[0].clientLeft
                    }
                    return i.slideTo(i.activeIndex + n, e, t, a)
                },
                slidePrev: function (e, t, a) {
                    void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
                    var i = this,
                        s = i.params,
                        r = i.animating,
                        n = i.snapGrid,
                        o = i.slidesGrid,
                        l = i.rtlTranslate;
                    if (s.loop) {
                        if (r && s.loopPreventsSlide) return !1;
                        i.loopFix(), i._clientLeft = i.$wrapperEl[0].clientLeft
                    }

                    function d(e) {
                        return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e)
                    }
                    var p = d(l ? i.translate : -i.translate),
                        c = n.map((function (e) {
                            return d(e)
                        }));
                    n[c.indexOf(p)];
                    var u, h = n[c.indexOf(p) - 1];
                    return void 0 === h && s.cssMode && n.forEach((function (e) {
                        !h && p >= e && (h = e)
                    })), void 0 !== h && (u = o.indexOf(h)) < 0 && (u = i.activeIndex - 1), i.slideTo(u, e, t, a)
                },
                slideReset: function (e, t, a) {
                    return void 0 === e && (e = this.params.speed), void 0 === t && (t = !0), this.slideTo(this.activeIndex, e, t, a)
                },
                slideToClosest: function (e, t, a, i) {
                    void 0 === e && (e = this.params.speed), void 0 === t && (t = !0), void 0 === i && (i = .5);
                    var s = this,
                        r = s.activeIndex,
                        n = Math.min(s.params.slidesPerGroupSkip, r),
                        o = n + Math.floor((r - n) / s.params.slidesPerGroup),
                        l = s.rtlTranslate ? s.translate : -s.translate;
                    if (l >= s.snapGrid[o]) {
                        var d = s.snapGrid[o];
                        l - d > (s.snapGrid[o + 1] - d) * i && (r += s.params.slidesPerGroup)
                    } else {
                        var p = s.snapGrid[o - 1];
                        l - p <= (s.snapGrid[o] - p) * i && (r -= s.params.slidesPerGroup)
                    }
                    return r = Math.max(r, 0), r = Math.min(r, s.slidesGrid.length - 1), s.slideTo(r, e, t, a)
                },
                slideToClickedSlide: function () {
                    var e, t = this,
                        a = t.params,
                        i = t.$wrapperEl,
                        s = "auto" === a.slidesPerView ? t.slidesPerViewDynamic() : a.slidesPerView,
                        r = t.clickedIndex;
                    if (a.loop) {
                        if (t.animating) return;
                        e = parseInt(m(t.clickedSlide).attr("data-swiper-slide-index"), 10), a.centeredSlides ? r < t.loopedSlides - s / 2 || r > t.slides.length - t.loopedSlides + s / 2 ? (t.loopFix(), r = i.children("." + a.slideClass + '[data-swiper-slide-index="' + e + '"]:not(.' + a.slideDuplicateClass + ")").eq(0).index(), E((function () {
                            t.slideTo(r)
                        }))) : t.slideTo(r) : r > t.slides.length - s ? (t.loopFix(), r = i.children("." + a.slideClass + '[data-swiper-slide-index="' + e + '"]:not(.' + a.slideDuplicateClass + ")").eq(0).index(), E((function () {
                            t.slideTo(r)
                        }))) : t.slideTo(r)
                    } else t.slideTo(r)
                }
            },
            loop: {
                loopCreate: function () {
                    var e = this,
                        t = r(),
                        a = e.params,
                        i = e.$wrapperEl;
                    i.children("." + a.slideClass + "." + a.slideDuplicateClass).remove();
                    var s = i.children("." + a.slideClass);
                    if (a.loopFillGroupWithBlank) {
                        var n = a.slidesPerGroup - s.length % a.slidesPerGroup;
                        if (n !== a.slidesPerGroup) {
                            for (var o = 0; o < n; o += 1) {
                                var l = m(t.createElement("div")).addClass(a.slideClass + " " + a.slideBlankClass);
                                i.append(l)
                            }
                            s = i.children("." + a.slideClass)
                        }
                    }
                    "auto" !== a.slidesPerView || a.loopedSlides || (a.loopedSlides = s.length), e.loopedSlides = Math.ceil(parseFloat(a.loopedSlides || a.slidesPerView, 10)), e.loopedSlides += a.loopAdditionalSlides, e.loopedSlides > s.length && (e.loopedSlides = s.length);
                    var d = [],
                        p = [];
                    s.each((function (t, a) {
                        var i = m(t);
                        a < e.loopedSlides && p.push(t), a < s.length && a >= s.length - e.loopedSlides && d.push(t), i.attr("data-swiper-slide-index", a)
                    }));
                    for (var c = 0; c < p.length; c += 1) i.append(m(p[c].cloneNode(!0)).addClass(a.slideDuplicateClass));
                    for (var u = d.length - 1; u >= 0; u -= 1) i.prepend(m(d[u].cloneNode(!0)).addClass(a.slideDuplicateClass))
                },
                loopFix: function () {
                    var e = this;
                    e.emit("beforeLoopFix");
                    var t, a = e.activeIndex,
                        i = e.slides,
                        s = e.loopedSlides,
                        r = e.allowSlidePrev,
                        n = e.allowSlideNext,
                        o = e.snapGrid,
                        l = e.rtlTranslate;
                    e.allowSlidePrev = !0, e.allowSlideNext = !0;
                    var d = -o[a] - e.getTranslate();
                    if (a < s) t = i.length - 3 * s + a, t += s, e.slideTo(t, 0, !1, !0) && 0 !== d && e.setTranslate((l ? -e.translate : e.translate) - d);
                    else if (a >= i.length - s) {
                        t = -i.length + a + s, t += s, e.slideTo(t, 0, !1, !0) && 0 !== d && e.setTranslate((l ? -e.translate : e.translate) - d)
                    }
                    e.allowSlidePrev = r, e.allowSlideNext = n, e.emit("loopFix")
                },
                loopDestroy: function () {
                    var e = this,
                        t = e.$wrapperEl,
                        a = e.params,
                        i = e.slides;
                    t.children("." + a.slideClass + "." + a.slideDuplicateClass + ",." + a.slideClass + "." + a.slideBlankClass).remove(), i.removeAttr("data-swiper-slide-index")
                }
            },
            grabCursor: {
                setGrabCursor: function (e) {
                    var t = this;
                    if (!(t.support.touch || !t.params.simulateTouch || t.params.watchOverflow && t.isLocked || t.params.cssMode)) {
                        var a = t.el;
                        a.style.cursor = "move", a.style.cursor = e ? "-webkit-grabbing" : "-webkit-grab", a.style.cursor = e ? "-moz-grabbin" : "-moz-grab", a.style.cursor = e ? "grabbing" : "grab"
                    }
                },
                unsetGrabCursor: function () {
                    var e = this;
                    e.support.touch || e.params.watchOverflow && e.isLocked || e.params.cssMode || (e.el.style.cursor = "")
                }
            },
            manipulation: {
                appendSlide: function (e) {
                    var t = this,
                        a = t.$wrapperEl,
                        i = t.params;
                    if (i.loop && t.loopDestroy(), "object" == typeof e && "length" in e)
                        for (var s = 0; s < e.length; s += 1) e[s] && a.append(e[s]);
                    else a.append(e);
                    i.loop && t.loopCreate(), i.observer && t.support.observer || t.update()
                },
                prependSlide: function (e) {
                    var t = this,
                        a = t.params,
                        i = t.$wrapperEl,
                        s = t.activeIndex;
                    a.loop && t.loopDestroy();
                    var r = s + 1;
                    if ("object" == typeof e && "length" in e) {
                        for (var n = 0; n < e.length; n += 1) e[n] && i.prepend(e[n]);
                        r = s + e.length
                    } else i.prepend(e);
                    a.loop && t.loopCreate(), a.observer && t.support.observer || t.update(), t.slideTo(r, 0, !1)
                },
                addSlide: function (e, t) {
                    var a = this,
                        i = a.$wrapperEl,
                        s = a.params,
                        r = a.activeIndex;
                    s.loop && (r -= a.loopedSlides, a.loopDestroy(), a.slides = i.children("." + s.slideClass));
                    var n = a.slides.length;
                    if (e <= 0) a.prependSlide(t);
                    else if (e >= n) a.appendSlide(t);
                    else {
                        for (var o = r > e ? r + 1 : r, l = [], d = n - 1; d >= e; d -= 1) {
                            var p = a.slides.eq(d);
                            p.remove(), l.unshift(p)
                        }
                        if ("object" == typeof t && "length" in t) {
                            for (var c = 0; c < t.length; c += 1) t[c] && i.append(t[c]);
                            o = r > e ? r + t.length : r
                        } else i.append(t);
                        for (var u = 0; u < l.length; u += 1) i.append(l[u]);
                        s.loop && a.loopCreate(), s.observer && a.support.observer || a.update(), s.loop ? a.slideTo(o + a.loopedSlides, 0, !1) : a.slideTo(o, 0, !1)
                    }
                },
                removeSlide: function (e) {
                    var t = this,
                        a = t.params,
                        i = t.$wrapperEl,
                        s = t.activeIndex;
                    a.loop && (s -= t.loopedSlides, t.loopDestroy(), t.slides = i.children("." + a.slideClass));
                    var r, n = s;
                    if ("object" == typeof e && "length" in e) {
                        for (var o = 0; o < e.length; o += 1) r = e[o], t.slides[r] && t.slides.eq(r).remove(), r < n && (n -= 1);
                        n = Math.max(n, 0)
                    } else r = e, t.slides[r] && t.slides.eq(r).remove(), r < n && (n -= 1), n = Math.max(n, 0);
                    a.loop && t.loopCreate(), a.observer && t.support.observer || t.update(), a.loop ? t.slideTo(n + t.loopedSlides, 0, !1) : t.slideTo(n, 0, !1)
                },
                removeAllSlides: function () {
                    for (var e = [], t = 0; t < this.slides.length; t += 1) e.push(t);
                    this.removeSlide(e)
                }
            },
            events: {
                attachEvents: function () {
                    var e = this,
                        t = r(),
                        a = e.params,
                        i = e.touchEvents,
                        s = e.el,
                        n = e.wrapperEl,
                        o = e.device,
                        l = e.support;
                    e.onTouchStart = A.bind(e), e.onTouchMove = D.bind(e), e.onTouchEnd = N.bind(e), a.cssMode && (e.onScroll = H.bind(e)), e.onClick = B.bind(e);
                    var d = !!a.nested;
                    if (!l.touch && l.pointerEvents) s.addEventListener(i.start, e.onTouchStart, !1), t.addEventListener(i.move, e.onTouchMove, d), t.addEventListener(i.end, e.onTouchEnd, !1);
                    else {
                        if (l.touch) {
                            var p = !("touchstart" !== i.start || !l.passiveListener || !a.passiveListeners) && {
                                passive: !0,
                                capture: !1
                            };
                            s.addEventListener(i.start, e.onTouchStart, p), s.addEventListener(i.move, e.onTouchMove, l.passiveListener ? {
                                passive: !1,
                                capture: d
                            } : d), s.addEventListener(i.end, e.onTouchEnd, p), i.cancel && s.addEventListener(i.cancel, e.onTouchEnd, p), X || (t.addEventListener("touchstart", Y), X = !0)
                        }(a.simulateTouch && !o.ios && !o.android || a.simulateTouch && !l.touch && o.ios) && (s.addEventListener("mousedown", e.onTouchStart, !1), t.addEventListener("mousemove", e.onTouchMove, d), t.addEventListener("mouseup", e.onTouchEnd, !1))
                    }(a.preventClicks || a.preventClicksPropagation) && s.addEventListener("click", e.onClick, !0), a.cssMode && n.addEventListener("scroll", e.onScroll), a.updateOnWindowResize ? e.on(o.ios || o.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", G, !0) : e.on("observerUpdate", G, !0)
                },
                detachEvents: function () {
                    var e = this,
                        t = r(),
                        a = e.params,
                        i = e.touchEvents,
                        s = e.el,
                        n = e.wrapperEl,
                        o = e.device,
                        l = e.support,
                        d = !!a.nested;
                    if (!l.touch && l.pointerEvents) s.removeEventListener(i.start, e.onTouchStart, !1), t.removeEventListener(i.move, e.onTouchMove, d), t.removeEventListener(i.end, e.onTouchEnd, !1);
                    else {
                        if (l.touch) {
                            var p = !("onTouchStart" !== i.start || !l.passiveListener || !a.passiveListeners) && {
                                passive: !0,
                                capture: !1
                            };
                            s.removeEventListener(i.start, e.onTouchStart, p), s.removeEventListener(i.move, e.onTouchMove, d), s.removeEventListener(i.end, e.onTouchEnd, p), i.cancel && s.removeEventListener(i.cancel, e.onTouchEnd, p)
                        }(a.simulateTouch && !o.ios && !o.android || a.simulateTouch && !l.touch && o.ios) && (s.removeEventListener("mousedown", e.onTouchStart, !1), t.removeEventListener("mousemove", e.onTouchMove, d), t.removeEventListener("mouseup", e.onTouchEnd, !1))
                    }(a.preventClicks || a.preventClicksPropagation) && s.removeEventListener("click", e.onClick, !0), a.cssMode && n.removeEventListener("scroll", e.onScroll), e.off(o.ios || o.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", G)
                }
            },
            breakpoints: {
                setBreakpoint: function () {
                    var e = this,
                        t = e.activeIndex,
                        a = e.initialized,
                        i = e.loopedSlides,
                        s = void 0 === i ? 0 : i,
                        r = e.params,
                        n = e.$el,
                        o = r.breakpoints;
                    if (o && (!o || 0 !== Object.keys(o).length)) {
                        var l = e.getBreakpoint(o, e.params.breakpointsBase, e.el);
                        if (l && e.currentBreakpoint !== l) {
                            var d = l in o ? o[l] : void 0;
                            d && ["slidesPerView", "spaceBetween", "slidesPerGroup", "slidesPerGroupSkip", "slidesPerColumn"].forEach((function (e) {
                                var t = d[e];
                                void 0 !== t && (d[e] = "slidesPerView" !== e || "AUTO" !== t && "auto" !== t ? "slidesPerView" === e ? parseFloat(t) : parseInt(t, 10) : "auto")
                            }));
                            var p = d || e.originalParams,
                                c = r.slidesPerColumn > 1,
                                u = p.slidesPerColumn > 1;
                            c && !u ? (n.removeClass(r.containerModifierClass + "multirow " + r.containerModifierClass + "multirow-column"), e.emitContainerClasses()) : !c && u && (n.addClass(r.containerModifierClass + "multirow"), "column" === p.slidesPerColumnFill && n.addClass(r.containerModifierClass + "multirow-column"), e.emitContainerClasses());
                            var h = p.direction && p.direction !== r.direction,
                                v = r.loop && (p.slidesPerView !== r.slidesPerView || h);
                            h && a && e.changeDirection(), C(e.params, p), C(e, {
                                allowTouchMove: e.params.allowTouchMove,
                                allowSlideNext: e.params.allowSlideNext,
                                allowSlidePrev: e.params.allowSlidePrev
                            }), e.currentBreakpoint = l, e.emit("_beforeBreakpoint", p), v && a && (e.loopDestroy(), e.loopCreate(), e.updateSlides(), e.slideTo(t - s + e.loopedSlides, 0, !1)), e.emit("breakpoint", p)
                        }
                    }
                },
                getBreakpoint: function (e, t, a) {
                    if (void 0 === t && (t = "window"), e && ("container" !== t || a)) {
                        var i = !1,
                            s = o(),
                            r = "window" === t ? s.innerWidth : a.clientWidth,
                            n = "window" === t ? s.innerHeight : a.clientHeight,
                            l = Object.keys(e).map((function (e) {
                                if ("string" == typeof e && 0 === e.indexOf("@")) {
                                    var t = parseFloat(e.substr(1));
                                    return {
                                        value: n * t,
                                        point: e
                                    }
                                }
                                return {
                                    value: e,
                                    point: e
                                }
                            }));
                        l.sort((function (e, t) {
                            return parseInt(e.value, 10) - parseInt(t.value, 10)
                        }));
                        for (var d = 0; d < l.length; d += 1) {
                            var p = l[d],
                                c = p.point;
                            p.value <= r && (i = c)
                        }
                        return i || "max"
                    }
                }
            },
            checkOverflow: {
                checkOverflow: function () {
                    var e = this,
                        t = e.params,
                        a = e.isLocked,
                        i = e.slides.length > 0 && t.slidesOffsetBefore + t.spaceBetween * (e.slides.length - 1) + e.slides[0].offsetWidth * e.slides.length;
                    t.slidesOffsetBefore && t.slidesOffsetAfter && i ? e.isLocked = i <= e.size : e.isLocked = 1 === e.snapGrid.length, e.allowSlideNext = !e.isLocked, e.allowSlidePrev = !e.isLocked, a !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock"), a && a !== e.isLocked && (e.isEnd = !1, e.navigation && e.navigation.update())
                }
            },
            classes: {
                addClasses: function () {
                    var e, t, a, i = this,
                        s = i.classNames,
                        r = i.params,
                        n = i.rtl,
                        o = i.$el,
                        l = i.device,
                        d = i.support,
                        p = (e = ["initialized", r.direction, {
                            "pointer-events": d.pointerEvents && !d.touch
                        }, {
                            "free-mode": r.freeMode
                        }, {
                            autoheight: r.autoHeight
                        }, {
                            rtl: n
                        }, {
                            multirow: r.slidesPerColumn > 1
                        }, {
                            "multirow-column": r.slidesPerColumn > 1 && "column" === r.slidesPerColumnFill
                        }, {
                            android: l.android
                        }, {
                            ios: l.ios
                        }, {
                            "css-mode": r.cssMode
                        }], t = r.containerModifierClass, a = [], e.forEach((function (e) {
                            "object" == typeof e ? Object.keys(e).forEach((function (i) {
                                e[i] && a.push(t + i)
                            })) : "string" == typeof e && a.push(t + e)
                        })), a);
                    s.push.apply(s, p), o.addClass([].concat(s).join(" ")), i.emitContainerClasses()
                },
                removeClasses: function () {
                    var e = this,
                        t = e.$el,
                        a = e.classNames;
                    t.removeClass(a.join(" ")), e.emitContainerClasses()
                }
            },
            images: {
                loadImage: function (e, t, a, i, s, r) {
                    var n, l = o();

                    function d() {
                        r && r()
                    }
                    m(e).parent("picture")[0] || e.complete && s ? d() : t ? ((n = new l.Image).onload = d, n.onerror = d, i && (n.sizes = i), a && (n.srcset = a), t && (n.src = t)) : d()
                },
                preloadImages: function () {
                    var e = this;

                    function t() {
                        null != e && e && !e.destroyed && (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1), e.imagesLoaded === e.imagesToLoad.length && (e.params.updateOnImagesReady && e.update(), e.emit("imagesReady")))
                    }
                    e.imagesToLoad = e.$el.find("img");
                    for (var a = 0; a < e.imagesToLoad.length; a += 1) {
                        var i = e.imagesToLoad[a];
                        e.loadImage(i, i.currentSrc || i.getAttribute("src"), i.srcset || i.getAttribute("srcset"), i.sizes || i.getAttribute("sizes"), !0, t)
                    }
                }
            }
        },
        W = {},
        F = function () {
            function t() {
                for (var e, a, i = arguments.length, s = new Array(i), r = 0; r < i; r++) s[r] = arguments[r];
                if (1 === s.length && s[0].constructor && "Object" === Object.prototype.toString.call(s[0]).slice(8, -1) ? a = s[0] : (e = s[0], a = s[1]), a || (a = {}), a = C({}, a), e && !a.el && (a.el = e), a.el && m(a.el).length > 1) {
                    var n = [];
                    return m(a.el).each((function (e) {
                        var i = C({}, a, {
                            el: e
                        });
                        n.push(new t(i))
                    })), n
                }
                var o = this;
                o.__swiper__ = !0, o.support = P(), o.device = k({
                    userAgent: a.userAgent
                }), o.browser = L(), o.eventsListeners = {}, o.eventsAnyListeners = [], void 0 === o.modules && (o.modules = {}), Object.keys(o.modules).forEach((function (e) {
                    var t = o.modules[e];
                    if (t.params) {
                        var i = Object.keys(t.params)[0],
                            s = t.params[i];
                        if ("object" != typeof s || null === s) return;
                        if (!(i in a) || !("enabled" in s)) return;
                        !0 === a[i] && (a[i] = {
                            enabled: !0
                        }), "object" != typeof a[i] || "enabled" in a[i] || (a[i].enabled = !0), a[i] || (a[i] = {
                            enabled: !1
                        })
                    }
                }));
                var l, d, p = C({}, R);
                return o.useParams(p), o.params = C({}, p, W, a), o.originalParams = C({}, o.params), o.passedParams = C({}, a), o.params && o.params.on && Object.keys(o.params.on).forEach((function (e) {
                    o.on(e, o.params.on[e])
                })), o.params && o.params.onAny && o.onAny(o.params.onAny), o.$ = m, C(o, {
                    el: e,
                    classNames: [],
                    slides: m(),
                    slidesGrid: [],
                    snapGrid: [],
                    slidesSizesGrid: [],
                    isHorizontal: function () {
                        return "horizontal" === o.params.direction
                    },
                    isVertical: function () {
                        return "vertical" === o.params.direction
                    },
                    activeIndex: 0,
                    realIndex: 0,
                    isBeginning: !0,
                    isEnd: !1,
                    translate: 0,
                    previousTranslate: 0,
                    progress: 0,
                    velocity: 0,
                    animating: !1,
                    allowSlideNext: o.params.allowSlideNext,
                    allowSlidePrev: o.params.allowSlidePrev,
                    touchEvents: (l = ["touchstart", "touchmove", "touchend", "touchcancel"], d = ["mousedown", "mousemove", "mouseup"], o.support.pointerEvents && (d = ["pointerdown", "pointermove", "pointerup"]), o.touchEventsTouch = {
                        start: l[0],
                        move: l[1],
                        end: l[2],
                        cancel: l[3]
                    }, o.touchEventsDesktop = {
                        start: d[0],
                        move: d[1],
                        end: d[2]
                    }, o.support.touch || !o.params.simulateTouch ? o.touchEventsTouch : o.touchEventsDesktop),
                    touchEventsData: {
                        isTouched: void 0,
                        isMoved: void 0,
                        allowTouchCallbacks: void 0,
                        touchStartTime: void 0,
                        isScrolling: void 0,
                        currentTranslate: void 0,
                        startTranslate: void 0,
                        allowThresholdMove: void 0,
                        formElements: "input, select, option, textarea, button, video, label",
                        lastClickTime: x(),
                        clickTimeout: void 0,
                        velocities: [],
                        allowMomentumBounce: void 0,
                        isTouchEvent: void 0,
                        startMoving: void 0
                    },
                    allowClick: !0,
                    allowTouchMove: o.params.allowTouchMove,
                    touches: {
                        startX: 0,
                        startY: 0,
                        currentX: 0,
                        currentY: 0,
                        diff: 0
                    },
                    imagesToLoad: [],
                    imagesLoaded: 0
                }), o.useModules(), o.emit("_swiper"), o.params.init && o.init(), o
            }
            var a, i, s, r = t.prototype;
            return r.setProgress = function (e, t) {
                var a = this;
                e = Math.min(Math.max(e, 0), 1);
                var i = a.minTranslate(),
                    s = (a.maxTranslate() - i) * e + i;
                a.translateTo(s, void 0 === t ? 0 : t), a.updateActiveIndex(), a.updateSlidesClasses()
            }, r.emitContainerClasses = function () {
                var e = this;
                if (e.params._emitClasses && e.el) {
                    var t = e.el.className.split(" ").filter((function (t) {
                        return 0 === t.indexOf("swiper-container") || 0 === t.indexOf(e.params.containerModifierClass)
                    }));
                    e.emit("_containerClasses", t.join(" "))
                }
            }, r.getSlideClasses = function (e) {
                var t = this;
                return e.className.split(" ").filter((function (e) {
                    return 0 === e.indexOf("swiper-slide") || 0 === e.indexOf(t.params.slideClass)
                })).join(" ")
            }, r.emitSlidesClasses = function () {
                var e = this;
                if (e.params._emitClasses && e.el) {
                    var t = [];
                    e.slides.each((function (a) {
                        var i = e.getSlideClasses(a);
                        t.push({
                            slideEl: a,
                            classNames: i
                        }), e.emit("_slideClass", a, i)
                    })), e.emit("_slideClasses", t)
                }
            }, r.slidesPerViewDynamic = function () {
                var e = this,
                    t = e.params,
                    a = e.slides,
                    i = e.slidesGrid,
                    s = e.size,
                    r = e.activeIndex,
                    n = 1;
                if (t.centeredSlides) {
                    for (var o, l = a[r].swiperSlideSize, d = r + 1; d < a.length; d += 1) a[d] && !o && (n += 1, (l += a[d].swiperSlideSize) > s && (o = !0));
                    for (var p = r - 1; p >= 0; p -= 1) a[p] && !o && (n += 1, (l += a[p].swiperSlideSize) > s && (o = !0))
                } else
                    for (var c = r + 1; c < a.length; c += 1) i[c] - i[r] < s && (n += 1);
                return n
            }, r.update = function () {
                var e = this;
                if (e && !e.destroyed) {
                    var t = e.snapGrid,
                        a = e.params;
                    a.breakpoints && e.setBreakpoint(), e.updateSize(), e.updateSlides(), e.updateProgress(), e.updateSlidesClasses(), e.params.freeMode ? (i(), e.params.autoHeight && e.updateAutoHeight()) : (("auto" === e.params.slidesPerView || e.params.slidesPerView > 1) && e.isEnd && !e.params.centeredSlides ? e.slideTo(e.slides.length - 1, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0)) || i(), a.watchOverflow && t !== e.snapGrid && e.checkOverflow(), e.emit("update")
                }

                function i() {
                    var t = e.rtlTranslate ? -1 * e.translate : e.translate,
                        a = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
                    e.setTranslate(a), e.updateActiveIndex(), e.updateSlidesClasses()
                }
            }, r.changeDirection = function (e, t) {
                void 0 === t && (t = !0);
                var a = this,
                    i = a.params.direction;
                return e || (e = "horizontal" === i ? "vertical" : "horizontal"), e === i || "horizontal" !== e && "vertical" !== e || (a.$el.removeClass("" + a.params.containerModifierClass + i).addClass("" + a.params.containerModifierClass + e), a.emitContainerClasses(), a.params.direction = e, a.slides.each((function (t) {
                    "vertical" === e ? t.style.width = "" : t.style.height = ""
                })), a.emit("changeDirection"), t && a.update()), a
            }, r.mount = function (e) {
                var t = this;
                if (t.mounted) return !0;
                var a, i = m(e || t.params.el);
                return !!(e = i[0]) && (e.swiper = t, e && e.shadowRoot && e.shadowRoot.querySelector ? (a = m(e.shadowRoot.querySelector("." + t.params.wrapperClass))).children = function (e) {
                    return i.children(e)
                } : a = i.children("." + t.params.wrapperClass), C(t, {
                    $el: i,
                    el: e,
                    $wrapperEl: a,
                    wrapperEl: a[0],
                    mounted: !0,
                    rtl: "rtl" === e.dir.toLowerCase() || "rtl" === i.css("direction"),
                    rtlTranslate: "horizontal" === t.params.direction && ("rtl" === e.dir.toLowerCase() || "rtl" === i.css("direction")),
                    wrongRTL: "-webkit-box" === a.css("display")
                }), !0)
            }, r.init = function (e) {
                var t = this;
                return t.initialized || !1 === t.mount(e) || (t.emit("beforeInit"), t.params.breakpoints && t.setBreakpoint(), t.addClasses(), t.params.loop && t.loopCreate(), t.updateSize(), t.updateSlides(), t.params.watchOverflow && t.checkOverflow(), t.params.grabCursor && t.setGrabCursor(), t.params.preloadImages && t.preloadImages(), t.params.loop ? t.slideTo(t.params.initialSlide + t.loopedSlides, 0, t.params.runCallbacksOnInit) : t.slideTo(t.params.initialSlide, 0, t.params.runCallbacksOnInit), t.attachEvents(), t.initialized = !0, t.emit("init"), t.emit("afterInit")), t
            }, r.destroy = function (e, t) {
                void 0 === e && (e = !0), void 0 === t && (t = !0);
                var a, i = this,
                    s = i.params,
                    r = i.$el,
                    n = i.$wrapperEl,
                    o = i.slides;
                return void 0 === i.params || i.destroyed || (i.emit("beforeDestroy"), i.initialized = !1, i.detachEvents(), s.loop && i.loopDestroy(), t && (i.removeClasses(), r.removeAttr("style"), n.removeAttr("style"), o && o.length && o.removeClass([s.slideVisibleClass, s.slideActiveClass, s.slideNextClass, s.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-slide-index")), i.emit("destroy"), Object.keys(i.eventsListeners).forEach((function (e) {
                    i.off(e)
                })), !1 !== e && (i.$el[0].swiper = null, a = i, Object.keys(a).forEach((function (e) {
                    try {
                        a[e] = null
                    } catch (e) {}
                    try {
                        delete a[e]
                    } catch (e) {}
                }))), i.destroyed = !0), null
            }, t.extendDefaults = function (e) {
                C(W, e)
            }, t.installModule = function (e) {
                t.prototype.modules || (t.prototype.modules = {});
                var a = e.name || Object.keys(t.prototype.modules).length + "_" + x();
                t.prototype.modules[a] = e
            }, t.use = function (e) {
                return Array.isArray(e) ? (e.forEach((function (e) {
                    return t.installModule(e)
                })), t) : (t.installModule(e), t)
            }, a = t, s = [{
                key: "extendedDefaults",
                get: function () {
                    return W
                }
            }, {
                key: "defaults",
                get: function () {
                    return R
                }
            }], (i = null) && e(a.prototype, i), s && e(a, s), t
        }();
    Object.keys(V).forEach((function (e) {
        Object.keys(V[e]).forEach((function (t) {
            F.prototype[t] = V[e][t]
        }))
    })), F.use([$, O]);
    var _ = {
            update: function (e) {
                var t = this,
                    a = t.params,
                    i = a.slidesPerView,
                    s = a.slidesPerGroup,
                    r = a.centeredSlides,
                    n = t.params.virtual,
                    o = n.addSlidesBefore,
                    l = n.addSlidesAfter,
                    d = t.virtual,
                    p = d.from,
                    c = d.to,
                    u = d.slides,
                    h = d.slidesGrid,
                    v = d.renderSlide,
                    f = d.offset;
                t.updateActiveIndex();
                var m, g, b, w = t.activeIndex || 0;
                m = t.rtlTranslate ? "right" : t.isHorizontal() ? "left" : "top", r ? (g = Math.floor(i / 2) + s + l, b = Math.floor(i / 2) + s + o) : (g = i + (s - 1) + l, b = s + o);
                var y = Math.max((w || 0) - b, 0),
                    E = Math.min((w || 0) + g, u.length - 1),
                    x = (t.slidesGrid[y] || 0) - (t.slidesGrid[0] || 0);

                function T() {
                    t.updateSlides(), t.updateProgress(), t.updateSlidesClasses(), t.lazy && t.params.lazy.enabled && t.lazy.load()
                }
                if (C(t.virtual, {
                        from: y,
                        to: E,
                        offset: x,
                        slidesGrid: t.slidesGrid
                    }), p === y && c === E && !e) return t.slidesGrid !== h && x !== f && t.slides.css(m, x + "px"), void t.updateProgress();
                if (t.params.virtual.renderExternal) return t.params.virtual.renderExternal.call(t, {
                    offset: x,
                    from: y,
                    to: E,
                    slides: function () {
                        for (var e = [], t = y; t <= E; t += 1) e.push(u[t]);
                        return e
                    }()
                }), void(t.params.virtual.renderExternalUpdate && T());
                var S = [],
                    M = [];
                if (e) t.$wrapperEl.find("." + t.params.slideClass).remove();
                else
                    for (var z = p; z <= c; z += 1)(z < y || z > E) && t.$wrapperEl.find("." + t.params.slideClass + '[data-swiper-slide-index="' + z + '"]').remove();
                for (var P = 0; P < u.length; P += 1) P >= y && P <= E && (void 0 === c || e ? M.push(P) : (P > c && M.push(P), P < p && S.push(P)));
                M.forEach((function (e) {
                    t.$wrapperEl.append(v(u[e], e))
                })), S.sort((function (e, t) {
                    return t - e
                })).forEach((function (e) {
                    t.$wrapperEl.prepend(v(u[e], e))
                })), t.$wrapperEl.children(".swiper-slide").css(m, x + "px"), T()
            },
            renderSlide: function (e, t) {
                var a = this,
                    i = a.params.virtual;
                if (i.cache && a.virtual.cache[t]) return a.virtual.cache[t];
                var s = i.renderSlide ? m(i.renderSlide.call(a, e, t)) : m('<div class="' + a.params.slideClass + '" data-swiper-slide-index="' + t + '">' + e + "</div>");
                return s.attr("data-swiper-slide-index") || s.attr("data-swiper-slide-index", t), i.cache && (a.virtual.cache[t] = s), s
            },
            appendSlide: function (e) {
                var t = this;
                if ("object" == typeof e && "length" in e)
                    for (var a = 0; a < e.length; a += 1) e[a] && t.virtual.slides.push(e[a]);
                else t.virtual.slides.push(e);
                t.virtual.update(!0)
            },
            prependSlide: function (e) {
                var t = this,
                    a = t.activeIndex,
                    i = a + 1,
                    s = 1;
                if (Array.isArray(e)) {
                    for (var r = 0; r < e.length; r += 1) e[r] && t.virtual.slides.unshift(e[r]);
                    i = a + e.length, s = e.length
                } else t.virtual.slides.unshift(e);
                if (t.params.virtual.cache) {
                    var n = t.virtual.cache,
                        o = {};
                    Object.keys(n).forEach((function (e) {
                        var t = n[e],
                            a = t.attr("data-swiper-slide-index");
                        a && t.attr("data-swiper-slide-index", parseInt(a, 10) + 1), o[parseInt(e, 10) + s] = t
                    })), t.virtual.cache = o
                }
                t.virtual.update(!0), t.slideTo(i, 0)
            },
            removeSlide: function (e) {
                var t = this;
                if (null != e) {
                    var a = t.activeIndex;
                    if (Array.isArray(e))
                        for (var i = e.length - 1; i >= 0; i -= 1) t.virtual.slides.splice(e[i], 1), t.params.virtual.cache && delete t.virtual.cache[e[i]], e[i] < a && (a -= 1), a = Math.max(a, 0);
                    else t.virtual.slides.splice(e, 1), t.params.virtual.cache && delete t.virtual.cache[e], e < a && (a -= 1), a = Math.max(a, 0);
                    t.virtual.update(!0), t.slideTo(a, 0)
                }
            },
            removeAllSlides: function () {
                var e = this;
                e.virtual.slides = [], e.params.virtual.cache && (e.virtual.cache = {}), e.virtual.update(!0), e.slideTo(0, 0)
            }
        },
        q = {
            name: "virtual",
            params: {
                virtual: {
                    enabled: !1,
                    slides: [],
                    cache: !0,
                    renderSlide: null,
                    renderExternal: null,
                    renderExternalUpdate: !0,
                    addSlidesBefore: 0,
                    addSlidesAfter: 0
                }
            },
            create: function () {
                M(this, {
                    virtual: t({}, _, {
                        slides: this.params.virtual.slides,
                        cache: {}
                    })
                })
            },
            on: {
                beforeInit: function (e) {
                    if (e.params.virtual.enabled) {
                        e.classNames.push(e.params.containerModifierClass + "virtual");
                        var t = {
                            watchSlidesProgress: !0
                        };
                        C(e.params, t), C(e.originalParams, t), e.params.initialSlide || e.virtual.update()
                    }
                },
                setTranslate: function (e) {
                    e.params.virtual.enabled && e.virtual.update()
                }
            }
        },
        j = {
            handle: function (e) {
                var t = this,
                    a = o(),
                    i = r(),
                    s = t.rtlTranslate,
                    n = e;
                n.originalEvent && (n = n.originalEvent);
                var l = n.keyCode || n.charCode,
                    d = t.params.keyboard.pageUpDown,
                    p = d && 33 === l,
                    c = d && 34 === l,
                    u = 37 === l,
                    h = 39 === l,
                    v = 38 === l,
                    f = 40 === l;
                if (!t.allowSlideNext && (t.isHorizontal() && h || t.isVertical() && f || c)) return !1;
                if (!t.allowSlidePrev && (t.isHorizontal() && u || t.isVertical() && v || p)) return !1;
                if (!(n.shiftKey || n.altKey || n.ctrlKey || n.metaKey || i.activeElement && i.activeElement.nodeName && ("input" === i.activeElement.nodeName.toLowerCase() || "textarea" === i.activeElement.nodeName.toLowerCase()))) {
                    if (t.params.keyboard.onlyInViewport && (p || c || u || h || v || f)) {
                        var m = !1;
                        if (t.$el.parents("." + t.params.slideClass).length > 0 && 0 === t.$el.parents("." + t.params.slideActiveClass).length) return;
                        var g = t.$el,
                            b = g[0].clientWidth,
                            w = g[0].clientHeight,
                            y = a.innerWidth,
                            E = a.innerHeight,
                            x = t.$el.offset();
                        s && (x.left -= t.$el[0].scrollLeft);
                        for (var T = [[x.left, x.top], [x.left + b, x.top], [x.left, x.top + w], [x.left + b, x.top + w]], S = 0; S < T.length; S += 1) {
                            var C = T[S];
                            if (C[0] >= 0 && C[0] <= y && C[1] >= 0 && C[1] <= E) {
                                if (0 === C[0] && 0 === C[1]) continue;
                                m = !0
                            }
                        }
                        if (!m) return
                    }
                    t.isHorizontal() ? ((p || c || u || h) && (n.preventDefault ? n.preventDefault() : n.returnValue = !1), ((c || h) && !s || (p || u) && s) && t.slideNext(), ((p || u) && !s || (c || h) && s) && t.slidePrev()) : ((p || c || v || f) && (n.preventDefault ? n.preventDefault() : n.returnValue = !1), (c || f) && t.slideNext(), (p || v) && t.slidePrev()), t.emit("keyPress", l)
                }
            },
            enable: function () {
                var e = this,
                    t = r();
                e.keyboard.enabled || (m(t).on("keydown", e.keyboard.handle), e.keyboard.enabled = !0)
            },
            disable: function () {
                var e = this,
                    t = r();
                e.keyboard.enabled && (m(t).off("keydown", e.keyboard.handle), e.keyboard.enabled = !1)
            }
        },
        U = {
            name: "keyboard",
            params: {
                keyboard: {
                    enabled: !1,
                    onlyInViewport: !0,
                    pageUpDown: !0
                }
            },
            create: function () {
                M(this, {
                    keyboard: t({
                        enabled: !1
                    }, j)
                })
            },
            on: {
                init: function (e) {
                    e.params.keyboard.enabled && e.keyboard.enable()
                },
                destroy: function (e) {
                    e.keyboard.enabled && e.keyboard.disable()
                }
            }
        };
    var K = {
            lastScrollTime: x(),
            lastEventBeforeSnap: void 0,
            recentWheelEvents: [],
            event: function () {
                return o().navigator.userAgent.indexOf("firefox") > -1 ? "DOMMouseScroll" : function () {
                    var e = r(),
                        t = "onwheel",
                        a = t in e;
                    if (!a) {
                        var i = e.createElement("div");
                        i.setAttribute(t, "return;"), a = "function" == typeof i.onwheel
                    }
                    return !a && e.implementation && e.implementation.hasFeature && !0 !== e.implementation.hasFeature("", "") && (a = e.implementation.hasFeature("Events.wheel", "3.0")), a
                }() ? "wheel" : "mousewheel"
            },
            normalize: function (e) {
                var t = 0,
                    a = 0,
                    i = 0,
                    s = 0;
                return "detail" in e && (a = e.detail), "wheelDelta" in e && (a = -e.wheelDelta / 120), "wheelDeltaY" in e && (a = -e.wheelDeltaY / 120), "wheelDeltaX" in e && (t = -e.wheelDeltaX / 120), "axis" in e && e.axis === e.HORIZONTAL_AXIS && (t = a, a = 0), i = 10 * t, s = 10 * a, "deltaY" in e && (s = e.deltaY), "deltaX" in e && (i = e.deltaX), e.shiftKey && !i && (i = s, s = 0), (i || s) && e.deltaMode && (1 === e.deltaMode ? (i *= 40, s *= 40) : (i *= 800, s *= 800)), i && !t && (t = i < 1 ? -1 : 1), s && !a && (a = s < 1 ? -1 : 1), {
                    spinX: t,
                    spinY: a,
                    pixelX: i,
                    pixelY: s
                }
            },
            handleMouseEnter: function () {
                this.mouseEntered = !0
            },
            handleMouseLeave: function () {
                this.mouseEntered = !1
            },
            handle: function (e) {
                var t = e,
                    a = this,
                    i = a.params.mousewheel;
                a.params.cssMode && t.preventDefault();
                var s = a.$el;
                if ("container" !== a.params.mousewheel.eventsTarget && (s = m(a.params.mousewheel.eventsTarget)), !a.mouseEntered && !s[0].contains(t.target) && !i.releaseOnEdges) return !0;
                t.originalEvent && (t = t.originalEvent);
                var r = 0,
                    n = a.rtlTranslate ? -1 : 1,
                    o = K.normalize(t);
                if (i.forceToAxis)
                    if (a.isHorizontal()) {
                        if (!(Math.abs(o.pixelX) > Math.abs(o.pixelY))) return !0;
                        r = -o.pixelX * n
                    } else {
                        if (!(Math.abs(o.pixelY) > Math.abs(o.pixelX))) return !0;
                        r = -o.pixelY
                    }
                else r = Math.abs(o.pixelX) > Math.abs(o.pixelY) ? -o.pixelX * n : -o.pixelY;
                if (0 === r) return !0;
                i.invert && (r = -r);
                var l = a.getTranslate() + r * i.sensitivity;
                if (l >= a.minTranslate() && (l = a.minTranslate()), l <= a.maxTranslate() && (l = a.maxTranslate()), (!!a.params.loop || !(l === a.minTranslate() || l === a.maxTranslate())) && a.params.nested && t.stopPropagation(), a.params.freeMode) {
                    var d = {
                            time: x(),
                            delta: Math.abs(r),
                            direction: Math.sign(r)
                        },
                        p = a.mousewheel.lastEventBeforeSnap,
                        c = p && d.time < p.time + 500 && d.delta <= p.delta && d.direction === p.direction;
                    if (!c) {
                        a.mousewheel.lastEventBeforeSnap = void 0, a.params.loop && a.loopFix();
                        var u = a.getTranslate() + r * i.sensitivity,
                            h = a.isBeginning,
                            v = a.isEnd;
                        if (u >= a.minTranslate() && (u = a.minTranslate()), u <= a.maxTranslate() && (u = a.maxTranslate()), a.setTransition(0), a.setTranslate(u), a.updateProgress(), a.updateActiveIndex(), a.updateSlidesClasses(), (!h && a.isBeginning || !v && a.isEnd) && a.updateSlidesClasses(), a.params.freeModeSticky) {
                            clearTimeout(a.mousewheel.timeout), a.mousewheel.timeout = void 0;
                            var f = a.mousewheel.recentWheelEvents;
                            f.length >= 15 && f.shift();
                            var g = f.length ? f[f.length - 1] : void 0,
                                b = f[0];
                            if (f.push(d), g && (d.delta > g.delta || d.direction !== g.direction)) f.splice(0);
                            else if (f.length >= 15 && d.time - b.time < 500 && b.delta - d.delta >= 1 && d.delta <= 6) {
                                var w = r > 0 ? .8 : .2;
                                a.mousewheel.lastEventBeforeSnap = d, f.splice(0), a.mousewheel.timeout = E((function () {
                                    a.slideToClosest(a.params.speed, !0, void 0, w)
                                }), 0)
                            }
                            a.mousewheel.timeout || (a.mousewheel.timeout = E((function () {
                                a.mousewheel.lastEventBeforeSnap = d, f.splice(0), a.slideToClosest(a.params.speed, !0, void 0, .5)
                            }), 500))
                        }
                        if (c || a.emit("scroll", t), a.params.autoplay && a.params.autoplayDisableOnInteraction && a.autoplay.stop(), u === a.minTranslate() || u === a.maxTranslate()) return !0
                    }
                } else {
                    var y = {
                            time: x(),
                            delta: Math.abs(r),
                            direction: Math.sign(r),
                            raw: e
                        },
                        T = a.mousewheel.recentWheelEvents;
                    T.length >= 2 && T.shift();
                    var S = T.length ? T[T.length - 1] : void 0;
                    if (T.push(y), S ? (y.direction !== S.direction || y.delta > S.delta || y.time > S.time + 150) && a.mousewheel.animateSlider(y) : a.mousewheel.animateSlider(y), a.mousewheel.releaseScroll(y)) return !0
                }
                return t.preventDefault ? t.preventDefault() : t.returnValue = !1, !1
            },
            animateSlider: function (e) {
                var t = this,
                    a = o();
                return !(this.params.mousewheel.thresholdDelta && e.delta < this.params.mousewheel.thresholdDelta) && (!(this.params.mousewheel.thresholdTime && x() - t.mousewheel.lastScrollTime < this.params.mousewheel.thresholdTime) && (e.delta >= 6 && x() - t.mousewheel.lastScrollTime < 60 || (e.direction < 0 ? t.isEnd && !t.params.loop || t.animating || (t.slideNext(), t.emit("scroll", e.raw)) : t.isBeginning && !t.params.loop || t.animating || (t.slidePrev(), t.emit("scroll", e.raw)), t.mousewheel.lastScrollTime = (new a.Date).getTime(), !1)))
            },
            releaseScroll: function (e) {
                var t = this,
                    a = t.params.mousewheel;
                if (e.direction < 0) {
                    if (t.isEnd && !t.params.loop && a.releaseOnEdges) return !0
                } else if (t.isBeginning && !t.params.loop && a.releaseOnEdges) return !0;
                return !1
            },
            enable: function () {
                var e = this,
                    t = K.event();
                if (e.params.cssMode) return e.wrapperEl.removeEventListener(t, e.mousewheel.handle), !0;
                if (!t) return !1;
                if (e.mousewheel.enabled) return !1;
                var a = e.$el;
                return "container" !== e.params.mousewheel.eventsTarget && (a = m(e.params.mousewheel.eventsTarget)), a.on("mouseenter", e.mousewheel.handleMouseEnter), a.on("mouseleave", e.mousewheel.handleMouseLeave), a.on(t, e.mousewheel.handle), e.mousewheel.enabled = !0, !0
            },
            disable: function () {
                var e = this,
                    t = K.event();
                if (e.params.cssMode) return e.wrapperEl.addEventListener(t, e.mousewheel.handle), !0;
                if (!t) return !1;
                if (!e.mousewheel.enabled) return !1;
                var a = e.$el;
                return "container" !== e.params.mousewheel.eventsTarget && (a = m(e.params.mousewheel.eventsTarget)), a.off(t, e.mousewheel.handle), e.mousewheel.enabled = !1, !0
            }
        },
        Z = {
            toggleEl: function (e, t) {
                e[t ? "addClass" : "removeClass"](this.params.navigation.disabledClass), e[0] && "BUTTON" === e[0].tagName && (e[0].disabled = t)
            },
            update: function () {
                var e = this,
                    t = e.params.navigation,
                    a = e.navigation.toggleEl;
                if (!e.params.loop) {
                    var i = e.navigation,
                        s = i.$nextEl,
                        r = i.$prevEl;
                    r && r.length > 0 && (e.isBeginning ? a(r, !0) : a(r, !1), r[e.params.watchOverflow && e.isLocked ? "addClass" : "removeClass"](t.lockClass)), s && s.length > 0 && (e.isEnd ? a(s, !0) : a(s, !1), s[e.params.watchOverflow && e.isLocked ? "addClass" : "removeClass"](t.lockClass))
                }
            },
            onPrevClick: function (e) {
                var t = this;
                e.preventDefault(), t.isBeginning && !t.params.loop || t.slidePrev()
            },
            onNextClick: function (e) {
                var t = this;
                e.preventDefault(), t.isEnd && !t.params.loop || t.slideNext()
            },
            init: function () {
                var e, t, a = this,
                    i = a.params.navigation;
                (i.nextEl || i.prevEl) && (i.nextEl && (e = m(i.nextEl), a.params.uniqueNavElements && "string" == typeof i.nextEl && e.length > 1 && 1 === a.$el.find(i.nextEl).length && (e = a.$el.find(i.nextEl))), i.prevEl && (t = m(i.prevEl), a.params.uniqueNavElements && "string" == typeof i.prevEl && t.length > 1 && 1 === a.$el.find(i.prevEl).length && (t = a.$el.find(i.prevEl))), e && e.length > 0 && e.on("click", a.navigation.onNextClick), t && t.length > 0 && t.on("click", a.navigation.onPrevClick), C(a.navigation, {
                    $nextEl: e,
                    nextEl: e && e[0],
                    $prevEl: t,
                    prevEl: t && t[0]
                }))
            },
            destroy: function () {
                var e = this,
                    t = e.navigation,
                    a = t.$nextEl,
                    i = t.$prevEl;
                a && a.length && (a.off("click", e.navigation.onNextClick), a.removeClass(e.params.navigation.disabledClass)), i && i.length && (i.off("click", e.navigation.onPrevClick), i.removeClass(e.params.navigation.disabledClass))
            }
        },
        J = {
            update: function () {
                var e = this,
                    t = e.rtl,
                    a = e.params.pagination;
                if (a.el && e.pagination.el && e.pagination.$el && 0 !== e.pagination.$el.length) {
                    var i, s = e.virtual && e.params.virtual.enabled ? e.virtual.slides.length : e.slides.length,
                        r = e.pagination.$el,
                        n = e.params.loop ? Math.ceil((s - 2 * e.loopedSlides) / e.params.slidesPerGroup) : e.snapGrid.length;
                    if (e.params.loop ? ((i = Math.ceil((e.activeIndex - e.loopedSlides) / e.params.slidesPerGroup)) > s - 1 - 2 * e.loopedSlides && (i -= s - 2 * e.loopedSlides), i > n - 1 && (i -= n), i < 0 && "bullets" !== e.params.paginationType && (i = n + i)) : i = void 0 !== e.snapIndex ? e.snapIndex : e.activeIndex || 0, "bullets" === a.type && e.pagination.bullets && e.pagination.bullets.length > 0) {
                        var o, l, d, p = e.pagination.bullets;
                        if (a.dynamicBullets && (e.pagination.bulletSize = p.eq(0)[e.isHorizontal() ? "outerWidth" : "outerHeight"](!0), r.css(e.isHorizontal() ? "width" : "height", e.pagination.bulletSize * (a.dynamicMainBullets + 4) + "px"), a.dynamicMainBullets > 1 && void 0 !== e.previousIndex && (e.pagination.dynamicBulletIndex += i - e.previousIndex, e.pagination.dynamicBulletIndex > a.dynamicMainBullets - 1 ? e.pagination.dynamicBulletIndex = a.dynamicMainBullets - 1 : e.pagination.dynamicBulletIndex < 0 && (e.pagination.dynamicBulletIndex = 0)), o = i - e.pagination.dynamicBulletIndex, d = ((l = o + (Math.min(p.length, a.dynamicMainBullets) - 1)) + o) / 2), p.removeClass(a.bulletActiveClass + " " + a.bulletActiveClass + "-next " + a.bulletActiveClass + "-next-next " + a.bulletActiveClass + "-prev " + a.bulletActiveClass + "-prev-prev " + a.bulletActiveClass + "-main"), r.length > 1) p.each((function (e) {
                            var t = m(e),
                                s = t.index();
                            s === i && t.addClass(a.bulletActiveClass), a.dynamicBullets && (s >= o && s <= l && t.addClass(a.bulletActiveClass + "-main"), s === o && t.prev().addClass(a.bulletActiveClass + "-prev").prev().addClass(a.bulletActiveClass + "-prev-prev"), s === l && t.next().addClass(a.bulletActiveClass + "-next").next().addClass(a.bulletActiveClass + "-next-next"))
                        }));
                        else {
                            var c = p.eq(i),
                                u = c.index();
                            if (c.addClass(a.bulletActiveClass), a.dynamicBullets) {
                                for (var h = p.eq(o), v = p.eq(l), f = o; f <= l; f += 1) p.eq(f).addClass(a.bulletActiveClass + "-main");
                                if (e.params.loop)
                                    if (u >= p.length - a.dynamicMainBullets) {
                                        for (var g = a.dynamicMainBullets; g >= 0; g -= 1) p.eq(p.length - g).addClass(a.bulletActiveClass + "-main");
                                        p.eq(p.length - a.dynamicMainBullets - 1).addClass(a.bulletActiveClass + "-prev")
                                    } else h.prev().addClass(a.bulletActiveClass + "-prev").prev().addClass(a.bulletActiveClass + "-prev-prev"), v.next().addClass(a.bulletActiveClass + "-next").next().addClass(a.bulletActiveClass + "-next-next");
                                else h.prev().addClass(a.bulletActiveClass + "-prev").prev().addClass(a.bulletActiveClass + "-prev-prev"), v.next().addClass(a.bulletActiveClass + "-next").next().addClass(a.bulletActiveClass + "-next-next")
                            }
                        }
                        if (a.dynamicBullets) {
                            var b = Math.min(p.length, a.dynamicMainBullets + 4),
                                w = (e.pagination.bulletSize * b - e.pagination.bulletSize) / 2 - d * e.pagination.bulletSize,
                                y = t ? "right" : "left";
                            p.css(e.isHorizontal() ? y : "top", w + "px")
                        }
                    }
                    if ("fraction" === a.type && (r.find(z(a.currentClass)).text(a.formatFractionCurrent(i + 1)), r.find(z(a.totalClass)).text(a.formatFractionTotal(n))), "progressbar" === a.type) {
                        var E;
                        E = a.progressbarOpposite ? e.isHorizontal() ? "vertical" : "horizontal" : e.isHorizontal() ? "horizontal" : "vertical";
                        var x = (i + 1) / n,
                            T = 1,
                            S = 1;
                        "horizontal" === E ? T = x : S = x, r.find(z(a.progressbarFillClass)).transform("translate3d(0,0,0) scaleX(" + T + ") scaleY(" + S + ")").transition(e.params.speed)
                    }
                    "custom" === a.type && a.renderCustom ? (r.html(a.renderCustom(e, i + 1, n)), e.emit("paginationRender", r[0])) : e.emit("paginationUpdate", r[0]), r[e.params.watchOverflow && e.isLocked ? "addClass" : "removeClass"](a.lockClass)
                }
            },
            render: function () {
                var e = this,
                    t = e.params.pagination;
                if (t.el && e.pagination.el && e.pagination.$el && 0 !== e.pagination.$el.length) {
                    var a = e.virtual && e.params.virtual.enabled ? e.virtual.slides.length : e.slides.length,
                        i = e.pagination.$el,
                        s = "";
                    if ("bullets" === t.type) {
                        var r = e.params.loop ? Math.ceil((a - 2 * e.loopedSlides) / e.params.slidesPerGroup) : e.snapGrid.length;
                        e.params.freeMode && !e.params.loop && r > a && (r = a);
                        for (var n = 0; n < r; n += 1) t.renderBullet ? s += t.renderBullet.call(e, n, t.bulletClass) : s += "<" + t.bulletElement + ' class="' + t.bulletClass + '"></' + t.bulletElement + ">";
                        i.html(s), e.pagination.bullets = i.find(z(t.bulletClass))
                    }
                    "fraction" === t.type && (s = t.renderFraction ? t.renderFraction.call(e, t.currentClass, t.totalClass) : '<span class="' + t.currentClass + '"></span> / <span class="' + t.totalClass + '"></span>', i.html(s)), "progressbar" === t.type && (s = t.renderProgressbar ? t.renderProgressbar.call(e, t.progressbarFillClass) : '<span class="' + t.progressbarFillClass + '"></span>', i.html(s)), "custom" !== t.type && e.emit("paginationRender", e.pagination.$el[0])
                }
            },
            init: function () {
                var e = this,
                    t = e.params.pagination;
                if (t.el) {
                    var a = m(t.el);
                    0 !== a.length && (e.params.uniqueNavElements && "string" == typeof t.el && a.length > 1 && (a = e.$el.find(t.el)), "bullets" === t.type && t.clickable && a.addClass(t.clickableClass), a.addClass(t.modifierClass + t.type), "bullets" === t.type && t.dynamicBullets && (a.addClass("" + t.modifierClass + t.type + "-dynamic"), e.pagination.dynamicBulletIndex = 0, t.dynamicMainBullets < 1 && (t.dynamicMainBullets = 1)), "progressbar" === t.type && t.progressbarOpposite && a.addClass(t.progressbarOppositeClass), t.clickable && a.on("click", z(t.bulletClass), (function (t) {
                        t.preventDefault();
                        var a = m(this).index() * e.params.slidesPerGroup;
                        e.params.loop && (a += e.loopedSlides), e.slideTo(a)
                    })), C(e.pagination, {
                        $el: a,
                        el: a[0]
                    }))
                }
            },
            destroy: function () {
                var e = this,
                    t = e.params.pagination;
                if (t.el && e.pagination.el && e.pagination.$el && 0 !== e.pagination.$el.length) {
                    var a = e.pagination.$el;
                    a.removeClass(t.hiddenClass), a.removeClass(t.modifierClass + t.type), e.pagination.bullets && e.pagination.bullets.removeClass(t.bulletActiveClass), t.clickable && a.off("click", z(t.bulletClass))
                }
            }
        },
        Q = {
            setTranslate: function () {
                var e = this;
                if (e.params.scrollbar.el && e.scrollbar.el) {
                    var t = e.scrollbar,
                        a = e.rtlTranslate,
                        i = e.progress,
                        s = t.dragSize,
                        r = t.trackSize,
                        n = t.$dragEl,
                        o = t.$el,
                        l = e.params.scrollbar,
                        d = s,
                        p = (r - s) * i;
                    a ? (p = -p) > 0 ? (d = s - p, p = 0) : -p + s > r && (d = r + p) : p < 0 ? (d = s + p, p = 0) : p + s > r && (d = r - p), e.isHorizontal() ? (n.transform("translate3d(" + p + "px, 0, 0)"), n[0].style.width = d + "px") : (n.transform("translate3d(0px, " + p + "px, 0)"), n[0].style.height = d + "px"), l.hide && (clearTimeout(e.scrollbar.timeout), o[0].style.opacity = 1, e.scrollbar.timeout = setTimeout((function () {
                        o[0].style.opacity = 0, o.transition(400)
                    }), 1e3))
                }
            },
            setTransition: function (e) {
                var t = this;
                t.params.scrollbar.el && t.scrollbar.el && t.scrollbar.$dragEl.transition(e)
            },
            updateSize: function () {
                var e = this;
                if (e.params.scrollbar.el && e.scrollbar.el) {
                    var t = e.scrollbar,
                        a = t.$dragEl,
                        i = t.$el;
                    a[0].style.width = "", a[0].style.height = "";
                    var s, r = e.isHorizontal() ? i[0].offsetWidth : i[0].offsetHeight,
                        n = e.size / e.virtualSize,
                        o = n * (r / e.size);
                    s = "auto" === e.params.scrollbar.dragSize ? r * n : parseInt(e.params.scrollbar.dragSize, 10), e.isHorizontal() ? a[0].style.width = s + "px" : a[0].style.height = s + "px", i[0].style.display = n >= 1 ? "none" : "", e.params.scrollbar.hide && (i[0].style.opacity = 0), C(t, {
                        trackSize: r,
                        divider: n,
                        moveDivider: o,
                        dragSize: s
                    }), t.$el[e.params.watchOverflow && e.isLocked ? "addClass" : "removeClass"](e.params.scrollbar.lockClass)
                }
            },
            getPointerPosition: function (e) {
                return this.isHorizontal() ? "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].clientX : e.clientX : "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].clientY : e.clientY
            },
            setDragPosition: function (e) {
                var t, a = this,
                    i = a.scrollbar,
                    s = a.rtlTranslate,
                    r = i.$el,
                    n = i.dragSize,
                    o = i.trackSize,
                    l = i.dragStartPos;
                t = (i.getPointerPosition(e) - r.offset()[a.isHorizontal() ? "left" : "top"] - (null !== l ? l : n / 2)) / (o - n), t = Math.max(Math.min(t, 1), 0), s && (t = 1 - t);
                var d = a.minTranslate() + (a.maxTranslate() - a.minTranslate()) * t;
                a.updateProgress(d), a.setTranslate(d), a.updateActiveIndex(), a.updateSlidesClasses()
            },
            onDragStart: function (e) {
                var t = this,
                    a = t.params.scrollbar,
                    i = t.scrollbar,
                    s = t.$wrapperEl,
                    r = i.$el,
                    n = i.$dragEl;
                t.scrollbar.isTouched = !0, t.scrollbar.dragStartPos = e.target === n[0] || e.target === n ? i.getPointerPosition(e) - e.target.getBoundingClientRect()[t.isHorizontal() ? "left" : "top"] : null, e.preventDefault(), e.stopPropagation(), s.transition(100), n.transition(100), i.setDragPosition(e), clearTimeout(t.scrollbar.dragTimeout), r.transition(0), a.hide && r.css("opacity", 1), t.params.cssMode && t.$wrapperEl.css("scroll-snap-type", "none"), t.emit("scrollbarDragStart", e)
            },
            onDragMove: function (e) {
                var t = this,
                    a = t.scrollbar,
                    i = t.$wrapperEl,
                    s = a.$el,
                    r = a.$dragEl;
                t.scrollbar.isTouched && (e.preventDefault ? e.preventDefault() : e.returnValue = !1, a.setDragPosition(e), i.transition(0), s.transition(0), r.transition(0), t.emit("scrollbarDragMove", e))
            },
            onDragEnd: function (e) {
                var t = this,
                    a = t.params.scrollbar,
                    i = t.scrollbar,
                    s = t.$wrapperEl,
                    r = i.$el;
                t.scrollbar.isTouched && (t.scrollbar.isTouched = !1, t.params.cssMode && (t.$wrapperEl.css("scroll-snap-type", ""), s.transition("")), a.hide && (clearTimeout(t.scrollbar.dragTimeout), t.scrollbar.dragTimeout = E((function () {
                    r.css("opacity", 0), r.transition(400)
                }), 1e3)), t.emit("scrollbarDragEnd", e), a.snapOnRelease && t.slideToClosest())
            },
            enableDraggable: function () {
                var e = this;
                if (e.params.scrollbar.el) {
                    var t = r(),
                        a = e.scrollbar,
                        i = e.touchEventsTouch,
                        s = e.touchEventsDesktop,
                        n = e.params,
                        o = e.support,
                        l = a.$el[0],
                        d = !(!o.passiveListener || !n.passiveListeners) && {
                            passive: !1,
                            capture: !1
                        },
                        p = !(!o.passiveListener || !n.passiveListeners) && {
                            passive: !0,
                            capture: !1
                        };
                    l && (o.touch ? (l.addEventListener(i.start, e.scrollbar.onDragStart, d), l.addEventListener(i.move, e.scrollbar.onDragMove, d), l.addEventListener(i.end, e.scrollbar.onDragEnd, p)) : (l.addEventListener(s.start, e.scrollbar.onDragStart, d), t.addEventListener(s.move, e.scrollbar.onDragMove, d), t.addEventListener(s.end, e.scrollbar.onDragEnd, p)))
                }
            },
            disableDraggable: function () {
                var e = this;
                if (e.params.scrollbar.el) {
                    var t = r(),
                        a = e.scrollbar,
                        i = e.touchEventsTouch,
                        s = e.touchEventsDesktop,
                        n = e.params,
                        o = e.support,
                        l = a.$el[0],
                        d = !(!o.passiveListener || !n.passiveListeners) && {
                            passive: !1,
                            capture: !1
                        },
                        p = !(!o.passiveListener || !n.passiveListeners) && {
                            passive: !0,
                            capture: !1
                        };
                    l && (o.touch ? (l.removeEventListener(i.start, e.scrollbar.onDragStart, d), l.removeEventListener(i.move, e.scrollbar.onDragMove, d), l.removeEventListener(i.end, e.scrollbar.onDragEnd, p)) : (l.removeEventListener(s.start, e.scrollbar.onDragStart, d), t.removeEventListener(s.move, e.scrollbar.onDragMove, d), t.removeEventListener(s.end, e.scrollbar.onDragEnd, p)))
                }
            },
            init: function () {
                var e = this;
                if (e.params.scrollbar.el) {
                    var t = e.scrollbar,
                        a = e.$el,
                        i = e.params.scrollbar,
                        s = m(i.el);
                    e.params.uniqueNavElements && "string" == typeof i.el && s.length > 1 && 1 === a.find(i.el).length && (s = a.find(i.el));
                    var r = s.find("." + e.params.scrollbar.dragClass);
                    0 === r.length && (r = m('<div class="' + e.params.scrollbar.dragClass + '"></div>'), s.append(r)), C(t, {
                        $el: s,
                        el: s[0],
                        $dragEl: r,
                        dragEl: r[0]
                    }), i.draggable && t.enableDraggable()
                }
            },
            destroy: function () {
                this.scrollbar.disableDraggable()
            }
        },
        ee = {
            setTransform: function (e, t) {
                var a = this.rtl,
                    i = m(e),
                    s = a ? -1 : 1,
                    r = i.attr("data-swiper-parallax") || "0",
                    n = i.attr("data-swiper-parallax-x"),
                    o = i.attr("data-swiper-parallax-y"),
                    l = i.attr("data-swiper-parallax-scale"),
                    d = i.attr("data-swiper-parallax-opacity");
                if (n || o ? (n = n || "0", o = o || "0") : this.isHorizontal() ? (n = r, o = "0") : (o = r, n = "0"), n = n.indexOf("%") >= 0 ? parseInt(n, 10) * t * s + "%" : n * t * s + "px", o = o.indexOf("%") >= 0 ? parseInt(o, 10) * t + "%" : o * t + "px", null != d) {
                    var p = d - (d - 1) * (1 - Math.abs(t));
                    i[0].style.opacity = p
                }
                if (null == l) i.transform("translate3d(" + n + ", " + o + ", 0px)");
                else {
                    var c = l - (l - 1) * (1 - Math.abs(t));
                    i.transform("translate3d(" + n + ", " + o + ", 0px) scale(" + c + ")")
                }
            },
            setTranslate: function () {
                var e = this,
                    t = e.$el,
                    a = e.slides,
                    i = e.progress,
                    s = e.snapGrid;
                t.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each((function (t) {
                    e.parallax.setTransform(t, i)
                })), a.each((function (t, a) {
                    var r = t.progress;
                    e.params.slidesPerGroup > 1 && "auto" !== e.params.slidesPerView && (r += Math.ceil(a / 2) - i * (s.length - 1)), r = Math.min(Math.max(r, -1), 1), m(t).find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each((function (t) {
                        e.parallax.setTransform(t, r)
                    }))
                }))
            },
            setTransition: function (e) {
                void 0 === e && (e = this.params.speed);
                this.$el.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each((function (t) {
                    var a = m(t),
                        i = parseInt(a.attr("data-swiper-parallax-duration"), 10) || e;
                    0 === e && (i = 0), a.transition(i)
                }))
            }
        },
        te = {
            getDistanceBetweenTouches: function (e) {
                if (e.targetTouches.length < 2) return 1;
                var t = e.targetTouches[0].pageX,
                    a = e.targetTouches[0].pageY,
                    i = e.targetTouches[1].pageX,
                    s = e.targetTouches[1].pageY;
                return Math.sqrt(Math.pow(i - t, 2) + Math.pow(s - a, 2))
            },
            onGestureStart: function (e) {
                var t = this,
                    a = t.support,
                    i = t.params.zoom,
                    s = t.zoom,
                    r = s.gesture;
                if (s.fakeGestureTouched = !1, s.fakeGestureMoved = !1, !a.gestures) {
                    if ("touchstart" !== e.type || "touchstart" === e.type && e.targetTouches.length < 2) return;
                    s.fakeGestureTouched = !0, r.scaleStart = te.getDistanceBetweenTouches(e)
                }
                r.$slideEl && r.$slideEl.length || (r.$slideEl = m(e.target).closest("." + t.params.slideClass), 0 === r.$slideEl.length && (r.$slideEl = t.slides.eq(t.activeIndex)), r.$imageEl = r.$slideEl.find("img, svg, canvas, picture, .swiper-zoom-target"), r.$imageWrapEl = r.$imageEl.parent("." + i.containerClass), r.maxRatio = r.$imageWrapEl.attr("data-swiper-zoom") || i.maxRatio, 0 !== r.$imageWrapEl.length) ? (r.$imageEl && r.$imageEl.transition(0), t.zoom.isScaling = !0) : r.$imageEl = void 0
            },
            onGestureChange: function (e) {
                var t = this,
                    a = t.support,
                    i = t.params.zoom,
                    s = t.zoom,
                    r = s.gesture;
                if (!a.gestures) {
                    if ("touchmove" !== e.type || "touchmove" === e.type && e.targetTouches.length < 2) return;
                    s.fakeGestureMoved = !0, r.scaleMove = te.getDistanceBetweenTouches(e)
                }
                r.$imageEl && 0 !== r.$imageEl.length ? (a.gestures ? s.scale = e.scale * s.currentScale : s.scale = r.scaleMove / r.scaleStart * s.currentScale, s.scale > r.maxRatio && (s.scale = r.maxRatio - 1 + Math.pow(s.scale - r.maxRatio + 1, .5)), s.scale < i.minRatio && (s.scale = i.minRatio + 1 - Math.pow(i.minRatio - s.scale + 1, .5)), r.$imageEl.transform("translate3d(0,0,0) scale(" + s.scale + ")")) : "gesturechange" === e.type && s.onGestureStart(e)
            },
            onGestureEnd: function (e) {
                var t = this,
                    a = t.device,
                    i = t.support,
                    s = t.params.zoom,
                    r = t.zoom,
                    n = r.gesture;
                if (!i.gestures) {
                    if (!r.fakeGestureTouched || !r.fakeGestureMoved) return;
                    if ("touchend" !== e.type || "touchend" === e.type && e.changedTouches.length < 2 && !a.android) return;
                    r.fakeGestureTouched = !1, r.fakeGestureMoved = !1
                }
                n.$imageEl && 0 !== n.$imageEl.length && (r.scale = Math.max(Math.min(r.scale, n.maxRatio), s.minRatio), n.$imageEl.transition(t.params.speed).transform("translate3d(0,0,0) scale(" + r.scale + ")"), r.currentScale = r.scale, r.isScaling = !1, 1 === r.scale && (n.$slideEl = void 0))
            },
            onTouchStart: function (e) {
                var t = this.device,
                    a = this.zoom,
                    i = a.gesture,
                    s = a.image;
                i.$imageEl && 0 !== i.$imageEl.length && (s.isTouched || (t.android && e.cancelable && e.preventDefault(), s.isTouched = !0, s.touchesStart.x = "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX, s.touchesStart.y = "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY))
            },
            onTouchMove: function (e) {
                var t = this,
                    a = t.zoom,
                    i = a.gesture,
                    s = a.image,
                    r = a.velocity;
                if (i.$imageEl && 0 !== i.$imageEl.length && (t.allowClick = !1, s.isTouched && i.$slideEl)) {
                    s.isMoved || (s.width = i.$imageEl[0].offsetWidth, s.height = i.$imageEl[0].offsetHeight, s.startX = T(i.$imageWrapEl[0], "x") || 0, s.startY = T(i.$imageWrapEl[0], "y") || 0, i.slideWidth = i.$slideEl[0].offsetWidth, i.slideHeight = i.$slideEl[0].offsetHeight, i.$imageWrapEl.transition(0), t.rtl && (s.startX = -s.startX, s.startY = -s.startY));
                    var n = s.width * a.scale,
                        o = s.height * a.scale;
                    if (!(n < i.slideWidth && o < i.slideHeight)) {
                        if (s.minX = Math.min(i.slideWidth / 2 - n / 2, 0), s.maxX = -s.minX, s.minY = Math.min(i.slideHeight / 2 - o / 2, 0), s.maxY = -s.minY, s.touchesCurrent.x = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, s.touchesCurrent.y = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, !s.isMoved && !a.isScaling) {
                            if (t.isHorizontal() && (Math.floor(s.minX) === Math.floor(s.startX) && s.touchesCurrent.x < s.touchesStart.x || Math.floor(s.maxX) === Math.floor(s.startX) && s.touchesCurrent.x > s.touchesStart.x)) return void(s.isTouched = !1);
                            if (!t.isHorizontal() && (Math.floor(s.minY) === Math.floor(s.startY) && s.touchesCurrent.y < s.touchesStart.y || Math.floor(s.maxY) === Math.floor(s.startY) && s.touchesCurrent.y > s.touchesStart.y)) return void(s.isTouched = !1)
                        }
                        e.cancelable && e.preventDefault(), e.stopPropagation(), s.isMoved = !0, s.currentX = s.touchesCurrent.x - s.touchesStart.x + s.startX, s.currentY = s.touchesCurrent.y - s.touchesStart.y + s.startY, s.currentX < s.minX && (s.currentX = s.minX + 1 - Math.pow(s.minX - s.currentX + 1, .8)), s.currentX > s.maxX && (s.currentX = s.maxX - 1 + Math.pow(s.currentX - s.maxX + 1, .8)), s.currentY < s.minY && (s.currentY = s.minY + 1 - Math.pow(s.minY - s.currentY + 1, .8)), s.currentY > s.maxY && (s.currentY = s.maxY - 1 + Math.pow(s.currentY - s.maxY + 1, .8)), r.prevPositionX || (r.prevPositionX = s.touchesCurrent.x), r.prevPositionY || (r.prevPositionY = s.touchesCurrent.y), r.prevTime || (r.prevTime = Date.now()), r.x = (s.touchesCurrent.x - r.prevPositionX) / (Date.now() - r.prevTime) / 2, r.y = (s.touchesCurrent.y - r.prevPositionY) / (Date.now() - r.prevTime) / 2, Math.abs(s.touchesCurrent.x - r.prevPositionX) < 2 && (r.x = 0), Math.abs(s.touchesCurrent.y - r.prevPositionY) < 2 && (r.y = 0), r.prevPositionX = s.touchesCurrent.x, r.prevPositionY = s.touchesCurrent.y, r.prevTime = Date.now(), i.$imageWrapEl.transform("translate3d(" + s.currentX + "px, " + s.currentY + "px,0)")
                    }
                }
            },
            onTouchEnd: function () {
                var e = this.zoom,
                    t = e.gesture,
                    a = e.image,
                    i = e.velocity;
                if (t.$imageEl && 0 !== t.$imageEl.length) {
                    if (!a.isTouched || !a.isMoved) return a.isTouched = !1, void(a.isMoved = !1);
                    a.isTouched = !1, a.isMoved = !1;
                    var s = 300,
                        r = 300,
                        n = i.x * s,
                        o = a.currentX + n,
                        l = i.y * r,
                        d = a.currentY + l;
                    0 !== i.x && (s = Math.abs((o - a.currentX) / i.x)), 0 !== i.y && (r = Math.abs((d - a.currentY) / i.y));
                    var p = Math.max(s, r);
                    a.currentX = o, a.currentY = d;
                    var c = a.width * e.scale,
                        u = a.height * e.scale;
                    a.minX = Math.min(t.slideWidth / 2 - c / 2, 0), a.maxX = -a.minX, a.minY = Math.min(t.slideHeight / 2 - u / 2, 0), a.maxY = -a.minY, a.currentX = Math.max(Math.min(a.currentX, a.maxX), a.minX), a.currentY = Math.max(Math.min(a.currentY, a.maxY), a.minY), t.$imageWrapEl.transition(p).transform("translate3d(" + a.currentX + "px, " + a.currentY + "px,0)")
                }
            },
            onTransitionEnd: function () {
                var e = this,
                    t = e.zoom,
                    a = t.gesture;
                a.$slideEl && e.previousIndex !== e.activeIndex && (a.$imageEl && a.$imageEl.transform("translate3d(0,0,0) scale(1)"), a.$imageWrapEl && a.$imageWrapEl.transform("translate3d(0,0,0)"), t.scale = 1, t.currentScale = 1, a.$slideEl = void 0, a.$imageEl = void 0, a.$imageWrapEl = void 0)
            },
            toggle: function (e) {
                var t = this.zoom;
                t.scale && 1 !== t.scale ? t.out() : t.in(e)
            },
            in: function (e) {
                var t, a, i, s, r, n, l, d, p, c, u, h, v, f, m, g, b = this,
                    w = o(),
                    y = b.zoom,
                    E = b.params.zoom,
                    x = y.gesture,
                    T = y.image;
                (x.$slideEl || (b.params.virtual && b.params.virtual.enabled && b.virtual ? x.$slideEl = b.$wrapperEl.children("." + b.params.slideActiveClass) : x.$slideEl = b.slides.eq(b.activeIndex), x.$imageEl = x.$slideEl.find("img, svg, canvas, picture, .swiper-zoom-target"), x.$imageWrapEl = x.$imageEl.parent("." + E.containerClass)), x.$imageEl && 0 !== x.$imageEl.length) && (x.$slideEl.addClass("" + E.zoomedSlideClass), void 0 === T.touchesStart.x && e ? (t = "touchend" === e.type ? e.changedTouches[0].pageX : e.pageX, a = "touchend" === e.type ? e.changedTouches[0].pageY : e.pageY) : (t = T.touchesStart.x, a = T.touchesStart.y), y.scale = x.$imageWrapEl.attr("data-swiper-zoom") || E.maxRatio, y.currentScale = x.$imageWrapEl.attr("data-swiper-zoom") || E.maxRatio, e ? (m = x.$slideEl[0].offsetWidth, g = x.$slideEl[0].offsetHeight, i = x.$slideEl.offset().left + w.scrollX + m / 2 - t, s = x.$slideEl.offset().top + w.scrollY + g / 2 - a, l = x.$imageEl[0].offsetWidth, d = x.$imageEl[0].offsetHeight, p = l * y.scale, c = d * y.scale, v = -(u = Math.min(m / 2 - p / 2, 0)), f = -(h = Math.min(g / 2 - c / 2, 0)), (r = i * y.scale) < u && (r = u), r > v && (r = v), (n = s * y.scale) < h && (n = h), n > f && (n = f)) : (r = 0, n = 0), x.$imageWrapEl.transition(300).transform("translate3d(" + r + "px, " + n + "px,0)"), x.$imageEl.transition(300).transform("translate3d(0,0,0) scale(" + y.scale + ")"))
            },
            out: function () {
                var e = this,
                    t = e.zoom,
                    a = e.params.zoom,
                    i = t.gesture;
                i.$slideEl || (e.params.virtual && e.params.virtual.enabled && e.virtual ? i.$slideEl = e.$wrapperEl.children("." + e.params.slideActiveClass) : i.$slideEl = e.slides.eq(e.activeIndex), i.$imageEl = i.$slideEl.find("img, svg, canvas, picture, .swiper-zoom-target"), i.$imageWrapEl = i.$imageEl.parent("." + a.containerClass)), i.$imageEl && 0 !== i.$imageEl.length && (t.scale = 1, t.currentScale = 1, i.$imageWrapEl.transition(300).transform("translate3d(0,0,0)"), i.$imageEl.transition(300).transform("translate3d(0,0,0) scale(1)"), i.$slideEl.removeClass("" + a.zoomedSlideClass), i.$slideEl = void 0)
            },
            toggleGestures: function (e) {
                var t = this,
                    a = t.zoom,
                    i = a.slideSelector,
                    s = a.passiveListener;
                t.$wrapperEl[e]("gesturestart", i, a.onGestureStart, s), t.$wrapperEl[e]("gesturechange", i, a.onGestureChange, s), t.$wrapperEl[e]("gestureend", i, a.onGestureEnd, s)
            },
            enableGestures: function () {
                this.zoom.gesturesEnabled || (this.zoom.gesturesEnabled = !0, this.zoom.toggleGestures("on"))
            },
            disableGestures: function () {
                this.zoom.gesturesEnabled && (this.zoom.gesturesEnabled = !1, this.zoom.toggleGestures("off"))
            },
            enable: function () {
                var e = this,
                    t = e.support,
                    a = e.zoom;
                if (!a.enabled) {
                    a.enabled = !0;
                    var i = !("touchstart" !== e.touchEvents.start || !t.passiveListener || !e.params.passiveListeners) && {
                            passive: !0,
                            capture: !1
                        },
                        s = !t.passiveListener || {
                            passive: !1,
                            capture: !0
                        },
                        r = "." + e.params.slideClass;
                    e.zoom.passiveListener = i, e.zoom.slideSelector = r, t.gestures ? (e.$wrapperEl.on(e.touchEvents.start, e.zoom.enableGestures, i), e.$wrapperEl.on(e.touchEvents.end, e.zoom.disableGestures, i)) : "touchstart" === e.touchEvents.start && (e.$wrapperEl.on(e.touchEvents.start, r, a.onGestureStart, i), e.$wrapperEl.on(e.touchEvents.move, r, a.onGestureChange, s), e.$wrapperEl.on(e.touchEvents.end, r, a.onGestureEnd, i), e.touchEvents.cancel && e.$wrapperEl.on(e.touchEvents.cancel, r, a.onGestureEnd, i)), e.$wrapperEl.on(e.touchEvents.move, "." + e.params.zoom.containerClass, a.onTouchMove, s)
                }
            },
            disable: function () {
                var e = this,
                    t = e.zoom;
                if (t.enabled) {
                    var a = e.support;
                    e.zoom.enabled = !1;
                    var i = !("touchstart" !== e.touchEvents.start || !a.passiveListener || !e.params.passiveListeners) && {
                            passive: !0,
                            capture: !1
                        },
                        s = !a.passiveListener || {
                            passive: !1,
                            capture: !0
                        },
                        r = "." + e.params.slideClass;
                    a.gestures ? (e.$wrapperEl.off(e.touchEvents.start, e.zoom.enableGestures, i), e.$wrapperEl.off(e.touchEvents.end, e.zoom.disableGestures, i)) : "touchstart" === e.touchEvents.start && (e.$wrapperEl.off(e.touchEvents.start, r, t.onGestureStart, i), e.$wrapperEl.off(e.touchEvents.move, r, t.onGestureChange, s), e.$wrapperEl.off(e.touchEvents.end, r, t.onGestureEnd, i), e.touchEvents.cancel && e.$wrapperEl.off(e.touchEvents.cancel, r, t.onGestureEnd, i)), e.$wrapperEl.off(e.touchEvents.move, "." + e.params.zoom.containerClass, t.onTouchMove, s)
                }
            }
        },
        ae = {
            loadInSlide: function (e, t) {
                void 0 === t && (t = !0);
                var a = this,
                    i = a.params.lazy;
                if (void 0 !== e && 0 !== a.slides.length) {
                    var s = a.virtual && a.params.virtual.enabled ? a.$wrapperEl.children("." + a.params.slideClass + '[data-swiper-slide-index="' + e + '"]') : a.slides.eq(e),
                        r = s.find("." + i.elementClass + ":not(." + i.loadedClass + "):not(." + i.loadingClass + ")");
                    !s.hasClass(i.elementClass) || s.hasClass(i.loadedClass) || s.hasClass(i.loadingClass) || r.push(s[0]), 0 !== r.length && r.each((function (e) {
                        var r = m(e);
                        r.addClass(i.loadingClass);
                        var n = r.attr("data-background"),
                            o = r.attr("data-src"),
                            l = r.attr("data-srcset"),
                            d = r.attr("data-sizes"),
                            p = r.parent("picture");
                        a.loadImage(r[0], o || n, l, d, !1, (function () {
                            if (null != a && a && (!a || a.params) && !a.destroyed) {
                                if (n ? (r.css("background-image", 'url("' + n + '")'), r.removeAttr("data-background")) : (l && (r.attr("srcset", l), r.removeAttr("data-srcset")), d && (r.attr("sizes", d), r.removeAttr("data-sizes")), p.length && p.children("source").each((function (e) {
                                        var t = m(e);
                                        t.attr("data-srcset") && (t.attr("srcset", t.attr("data-srcset")), t.removeAttr("data-srcset"))
                                    })), o && (r.attr("src", o), r.removeAttr("data-src"))), r.addClass(i.loadedClass).removeClass(i.loadingClass), s.find("." + i.preloaderClass).remove(), a.params.loop && t) {
                                    var e = s.attr("data-swiper-slide-index");
                                    if (s.hasClass(a.params.slideDuplicateClass)) {
                                        var c = a.$wrapperEl.children('[data-swiper-slide-index="' + e + '"]:not(.' + a.params.slideDuplicateClass + ")");
                                        a.lazy.loadInSlide(c.index(), !1)
                                    } else {
                                        var u = a.$wrapperEl.children("." + a.params.slideDuplicateClass + '[data-swiper-slide-index="' + e + '"]');
                                        a.lazy.loadInSlide(u.index(), !1)
                                    }
                                }
                                a.emit("lazyImageReady", s[0], r[0]), a.params.autoHeight && a.updateAutoHeight()
                            }
                        })), a.emit("lazyImageLoad", s[0], r[0])
                    }))
                }
            },
            load: function () {
                var e = this,
                    t = e.$wrapperEl,
                    a = e.params,
                    i = e.slides,
                    s = e.activeIndex,
                    r = e.virtual && a.virtual.enabled,
                    n = a.lazy,
                    o = a.slidesPerView;

                function l(e) {
                    if (r) {
                        if (t.children("." + a.slideClass + '[data-swiper-slide-index="' + e + '"]').length) return !0
                    } else if (i[e]) return !0;
                    return !1
                }

                function d(e) {
                    return r ? m(e).attr("data-swiper-slide-index") : m(e).index()
                }
                if ("auto" === o && (o = 0), e.lazy.initialImageLoaded || (e.lazy.initialImageLoaded = !0), e.params.watchSlidesVisibility) t.children("." + a.slideVisibleClass).each((function (t) {
                    var a = r ? m(t).attr("data-swiper-slide-index") : m(t).index();
                    e.lazy.loadInSlide(a)
                }));
                else if (o > 1)
                    for (var p = s; p < s + o; p += 1) l(p) && e.lazy.loadInSlide(p);
                else e.lazy.loadInSlide(s);
                if (n.loadPrevNext)
                    if (o > 1 || n.loadPrevNextAmount && n.loadPrevNextAmount > 1) {
                        for (var c = n.loadPrevNextAmount, u = o, h = Math.min(s + u + Math.max(c, u), i.length), v = Math.max(s - Math.max(u, c), 0), f = s + o; f < h; f += 1) l(f) && e.lazy.loadInSlide(f);
                        for (var g = v; g < s; g += 1) l(g) && e.lazy.loadInSlide(g)
                    } else {
                        var b = t.children("." + a.slideNextClass);
                        b.length > 0 && e.lazy.loadInSlide(d(b));
                        var w = t.children("." + a.slidePrevClass);
                        w.length > 0 && e.lazy.loadInSlide(d(w))
                    }
            },
            checkInViewOnLoad: function () {
                var e = o(),
                    t = this;
                if (t && !t.destroyed) {
                    var a = t.params.lazy.scrollingElement ? m(t.params.lazy.scrollingElement) : m(e),
                        i = a[0] === e,
                        s = i ? e.innerWidth : a[0].offsetWidth,
                        r = i ? e.innerHeight : a[0].offsetHeight,
                        n = t.$el.offset(),
                        l = !1;
                    t.rtlTranslate && (n.left -= t.$el[0].scrollLeft);
                    for (var d = [[n.left, n.top], [n.left + t.width, n.top], [n.left, n.top + t.height], [n.left + t.width, n.top + t.height]], p = 0; p < d.length; p += 1) {
                        var c = d[p];
                        if (c[0] >= 0 && c[0] <= s && c[1] >= 0 && c[1] <= r) {
                            if (0 === c[0] && 0 === c[1]) continue;
                            l = !0
                        }
                    }
                    l ? (t.lazy.load(), a.off("scroll", t.lazy.checkInViewOnLoad)) : t.lazy.scrollHandlerAttached || (t.lazy.scrollHandlerAttached = !0, a.on("scroll", t.lazy.checkInViewOnLoad))
                }
            }
        },
        ie = {
            LinearSpline: function (e, t) {
                var a, i, s, r, n, o = function (e, t) {
                    for (i = -1, a = e.length; a - i > 1;) e[s = a + i >> 1] <= t ? i = s : a = s;
                    return a
                };
                return this.x = e, this.y = t, this.lastIndex = e.length - 1, this.interpolate = function (e) {
                    return e ? (n = o(this.x, e), r = n - 1, (e - this.x[r]) * (this.y[n] - this.y[r]) / (this.x[n] - this.x[r]) + this.y[r]) : 0
                }, this
            },
            getInterpolateFunction: function (e) {
                var t = this;
                t.controller.spline || (t.controller.spline = t.params.loop ? new ie.LinearSpline(t.slidesGrid, e.slidesGrid) : new ie.LinearSpline(t.snapGrid, e.snapGrid))
            },
            setTranslate: function (e, t) {
                var a, i, s = this,
                    r = s.controller.control,
                    n = s.constructor;

                function o(e) {
                    var t = s.rtlTranslate ? -s.translate : s.translate;
                    "slide" === s.params.controller.by && (s.controller.getInterpolateFunction(e), i = -s.controller.spline.interpolate(-t)), i && "container" !== s.params.controller.by || (a = (e.maxTranslate() - e.minTranslate()) / (s.maxTranslate() - s.minTranslate()), i = (t - s.minTranslate()) * a + e.minTranslate()), s.params.controller.inverse && (i = e.maxTranslate() - i), e.updateProgress(i), e.setTranslate(i, s), e.updateActiveIndex(), e.updateSlidesClasses()
                }
                if (Array.isArray(r))
                    for (var l = 0; l < r.length; l += 1) r[l] !== t && r[l] instanceof n && o(r[l]);
                else r instanceof n && t !== r && o(r)
            },
            setTransition: function (e, t) {
                var a, i = this,
                    s = i.constructor,
                    r = i.controller.control;

                function n(t) {
                    t.setTransition(e, i), 0 !== e && (t.transitionStart(), t.params.autoHeight && E((function () {
                        t.updateAutoHeight()
                    })), t.$wrapperEl.transitionEnd((function () {
                        r && (t.params.loop && "slide" === i.params.controller.by && t.loopFix(), t.transitionEnd())
                    })))
                }
                if (Array.isArray(r))
                    for (a = 0; a < r.length; a += 1) r[a] !== t && r[a] instanceof s && n(r[a]);
                else r instanceof s && t !== r && n(r)
            }
        },
        se = {
            getRandomNumber: function (e) {
                void 0 === e && (e = 16);
                return "x".repeat(e).replace(/x/g, (function () {
                    return Math.round(16 * Math.random()).toString(16)
                }))
            },
            makeElFocusable: function (e) {
                return e.attr("tabIndex", "0"), e
            },
            makeElNotFocusable: function (e) {
                return e.attr("tabIndex", "-1"), e
            },
            addElRole: function (e, t) {
                return e.attr("role", t), e
            },
            addElRoleDescription: function (e, t) {
                return e.attr("aria-roledescription", t), e
            },
            addElControls: function (e, t) {
                return e.attr("aria-controls", t), e
            },
            addElLabel: function (e, t) {
                return e.attr("aria-label", t), e
            },
            addElId: function (e, t) {
                return e.attr("id", t), e
            },
            addElLive: function (e, t) {
                return e.attr("aria-live", t), e
            },
            disableEl: function (e) {
                return e.attr("aria-disabled", !0), e
            },
            enableEl: function (e) {
                return e.attr("aria-disabled", !1), e
            },
            onEnterOrSpaceKey: function (e) {
                if (13 === e.keyCode || 32 === e.keyCode) {
                    var t = this,
                        a = t.params.a11y,
                        i = m(e.target);
                    t.navigation && t.navigation.$nextEl && i.is(t.navigation.$nextEl) && (t.isEnd && !t.params.loop || t.slideNext(), t.isEnd ? t.a11y.notify(a.lastSlideMessage) : t.a11y.notify(a.nextSlideMessage)), t.navigation && t.navigation.$prevEl && i.is(t.navigation.$prevEl) && (t.isBeginning && !t.params.loop || t.slidePrev(), t.isBeginning ? t.a11y.notify(a.firstSlideMessage) : t.a11y.notify(a.prevSlideMessage)), t.pagination && i.is(z(t.params.pagination.bulletClass)) && i[0].click()
                }
            },
            notify: function (e) {
                var t = this.a11y.liveRegion;
                0 !== t.length && (t.html(""), t.html(e))
            },
            updateNavigation: function () {
                var e = this;
                if (!e.params.loop && e.navigation) {
                    var t = e.navigation,
                        a = t.$nextEl,
                        i = t.$prevEl;
                    i && i.length > 0 && (e.isBeginning ? (e.a11y.disableEl(i), e.a11y.makeElNotFocusable(i)) : (e.a11y.enableEl(i), e.a11y.makeElFocusable(i))), a && a.length > 0 && (e.isEnd ? (e.a11y.disableEl(a), e.a11y.makeElNotFocusable(a)) : (e.a11y.enableEl(a), e.a11y.makeElFocusable(a)))
                }
            },
            updatePagination: function () {
                var e = this,
                    t = e.params.a11y;
                e.pagination && e.params.pagination.clickable && e.pagination.bullets && e.pagination.bullets.length && e.pagination.bullets.each((function (a) {
                    var i = m(a);
                    e.a11y.makeElFocusable(i), e.params.pagination.renderBullet || (e.a11y.addElRole(i, "button"), e.a11y.addElLabel(i, t.paginationBulletMessage.replace(/\{\{index\}\}/, i.index() + 1)))
                }))
            },
            init: function () {
                var e = this,
                    t = e.params.a11y;
                e.$el.append(e.a11y.liveRegion);
                var a = e.$el;
                t.containerRoleDescriptionMessage && e.a11y.addElRoleDescription(a, t.containerRoleDescriptionMessage), t.containerMessage && e.a11y.addElLabel(a, t.containerMessage);
                var i, s, r = e.$wrapperEl,
                    n = r.attr("id") || "swiper-wrapper-" + e.a11y.getRandomNumber(16),
                    o = e.params.autoplay && e.params.autoplay.enabled ? "off" : "polite";
                e.a11y.addElId(r, n), e.a11y.addElLive(r, o), t.itemRoleDescriptionMessage && e.a11y.addElRoleDescription(m(e.slides), t.itemRoleDescriptionMessage), e.a11y.addElRole(m(e.slides), t.slideRole), e.slides.each((function (a) {
                    var i = m(a),
                        s = t.slideLabelMessage.replace(/\{\{index\}\}/, i.index() + 1).replace(/\{\{slidesLength\}\}/, e.slides.length);
                    e.a11y.addElLabel(i, s)
                })), e.navigation && e.navigation.$nextEl && (i = e.navigation.$nextEl), e.navigation && e.navigation.$prevEl && (s = e.navigation.$prevEl), i && i.length && (e.a11y.makeElFocusable(i), "BUTTON" !== i[0].tagName && (e.a11y.addElRole(i, "button"), i.on("keydown", e.a11y.onEnterOrSpaceKey)), e.a11y.addElLabel(i, t.nextSlideMessage), e.a11y.addElControls(i, n)), s && s.length && (e.a11y.makeElFocusable(s), "BUTTON" !== s[0].tagName && (e.a11y.addElRole(s, "button"), s.on("keydown", e.a11y.onEnterOrSpaceKey)), e.a11y.addElLabel(s, t.prevSlideMessage), e.a11y.addElControls(s, n)), e.pagination && e.params.pagination.clickable && e.pagination.bullets && e.pagination.bullets.length && e.pagination.$el.on("keydown", z(e.params.pagination.bulletClass), e.a11y.onEnterOrSpaceKey)
            },
            destroy: function () {
                var e, t, a = this;
                a.a11y.liveRegion && a.a11y.liveRegion.length > 0 && a.a11y.liveRegion.remove(), a.navigation && a.navigation.$nextEl && (e = a.navigation.$nextEl), a.navigation && a.navigation.$prevEl && (t = a.navigation.$prevEl), e && e.off("keydown", a.a11y.onEnterOrSpaceKey), t && t.off("keydown", a.a11y.onEnterOrSpaceKey), a.pagination && a.params.pagination.clickable && a.pagination.bullets && a.pagination.bullets.length && a.pagination.$el.off("keydown", z(a.params.pagination.bulletClass), a.a11y.onEnterOrSpaceKey)
            }
        },
        re = {
            init: function () {
                var e = this,
                    t = o();
                if (e.params.history) {
                    if (!t.history || !t.history.pushState) return e.params.history.enabled = !1, void(e.params.hashNavigation.enabled = !0);
                    var a = e.history;
                    a.initialized = !0, a.paths = re.getPathValues(e.params.url), (a.paths.key || a.paths.value) && (a.scrollToSlide(0, a.paths.value, e.params.runCallbacksOnInit), e.params.history.replaceState || t.addEventListener("popstate", e.history.setHistoryPopState))
                }
            },
            destroy: function () {
                var e = o();
                this.params.history.replaceState || e.removeEventListener("popstate", this.history.setHistoryPopState)
            },
            setHistoryPopState: function () {
                var e = this;
                e.history.paths = re.getPathValues(e.params.url), e.history.scrollToSlide(e.params.speed, e.history.paths.value, !1)
            },
            getPathValues: function (e) {
                var t = o(),
                    a = (e ? new URL(e) : t.location).pathname.slice(1).split("/").filter((function (e) {
                        return "" !== e
                    })),
                    i = a.length;
                return {
                    key: a[i - 2],
                    value: a[i - 1]
                }
            },
            setHistory: function (e, t) {
                var a = this,
                    i = o();
                if (a.history.initialized && a.params.history.enabled) {
                    var s;
                    s = a.params.url ? new URL(a.params.url) : i.location;
                    var r = a.slides.eq(t),
                        n = re.slugify(r.attr("data-history"));
                    if (a.params.history.root.length > 0) {
                        var l = a.params.history.root;
                        "/" === l[l.length - 1] && (l = l.slice(0, l.length - 1)), n = l + "/" + e + "/" + n
                    } else s.pathname.includes(e) || (n = e + "/" + n);
                    var d = i.history.state;
                    d && d.value === n || (a.params.history.replaceState ? i.history.replaceState({
                        value: n
                    }, null, n) : i.history.pushState({
                        value: n
                    }, null, n))
                }
            },
            slugify: function (e) {
                return e.toString().replace(/\s+/g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-").replace(/^-+/, "").replace(/-+$/, "")
            },
            scrollToSlide: function (e, t, a) {
                var i = this;
                if (t)
                    for (var s = 0, r = i.slides.length; s < r; s += 1) {
                        var n = i.slides.eq(s);
                        if (re.slugify(n.attr("data-history")) === t && !n.hasClass(i.params.slideDuplicateClass)) {
                            var o = n.index();
                            i.slideTo(o, e, a)
                        }
                    } else i.slideTo(0, e, a)
            }
        },
        ne = {
            onHashCange: function () {
                var e = this,
                    t = r();
                e.emit("hashChange");
                var a = t.location.hash.replace("#", "");
                if (a !== e.slides.eq(e.activeIndex).attr("data-hash")) {
                    var i = e.$wrapperEl.children("." + e.params.slideClass + '[data-hash="' + a + '"]').index();
                    if (void 0 === i) return;
                    e.slideTo(i)
                }
            },
            setHash: function () {
                var e = this,
                    t = o(),
                    a = r();
                if (e.hashNavigation.initialized && e.params.hashNavigation.enabled)
                    if (e.params.hashNavigation.replaceState && t.history && t.history.replaceState) t.history.replaceState(null, null, "#" + e.slides.eq(e.activeIndex).attr("data-hash") || ""), e.emit("hashSet");
                    else {
                        var i = e.slides.eq(e.activeIndex),
                            s = i.attr("data-hash") || i.attr("data-history");
                        a.location.hash = s || "", e.emit("hashSet")
                    }
            },
            init: function () {
                var e = this,
                    t = r(),
                    a = o();
                if (!(!e.params.hashNavigation.enabled || e.params.history && e.params.history.enabled)) {
                    e.hashNavigation.initialized = !0;
                    var i = t.location.hash.replace("#", "");
                    if (i)
                        for (var s = 0, n = e.slides.length; s < n; s += 1) {
                            var l = e.slides.eq(s);
                            if ((l.attr("data-hash") || l.attr("data-history")) === i && !l.hasClass(e.params.slideDuplicateClass)) {
                                var d = l.index();
                                e.slideTo(d, 0, e.params.runCallbacksOnInit, !0)
                            }
                        }
                    e.params.hashNavigation.watchState && m(a).on("hashchange", e.hashNavigation.onHashCange)
                }
            },
            destroy: function () {
                var e = o();
                this.params.hashNavigation.watchState && m(e).off("hashchange", this.hashNavigation.onHashCange)
            }
        },
        oe = {
            run: function () {
                var e = this,
                    t = e.slides.eq(e.activeIndex),
                    a = e.params.autoplay.delay;
                t.attr("data-swiper-autoplay") && (a = t.attr("data-swiper-autoplay") || e.params.autoplay.delay), clearTimeout(e.autoplay.timeout), e.autoplay.timeout = E((function () {
                    var t;
                    e.params.autoplay.reverseDirection ? e.params.loop ? (e.loopFix(), t = e.slidePrev(e.params.speed, !0, !0), e.emit("autoplay")) : e.isBeginning ? e.params.autoplay.stopOnLastSlide ? e.autoplay.stop() : (t = e.slideTo(e.slides.length - 1, e.params.speed, !0, !0), e.emit("autoplay")) : (t = e.slidePrev(e.params.speed, !0, !0), e.emit("autoplay")) : e.params.loop ? (e.loopFix(), t = e.slideNext(e.params.speed, !0, !0), e.emit("autoplay")) : e.isEnd ? e.params.autoplay.stopOnLastSlide ? e.autoplay.stop() : (t = e.slideTo(0, e.params.speed, !0, !0), e.emit("autoplay")) : (t = e.slideNext(e.params.speed, !0, !0), e.emit("autoplay")), (e.params.cssMode && e.autoplay.running || !1 === t) && e.autoplay.run()
                }), a)
            },
            start: function () {
                var e = this;
                return void 0 === e.autoplay.timeout && (!e.autoplay.running && (e.autoplay.running = !0, e.emit("autoplayStart"), e.autoplay.run(), !0))
            },
            stop: function () {
                var e = this;
                return !!e.autoplay.running && (void 0 !== e.autoplay.timeout && (e.autoplay.timeout && (clearTimeout(e.autoplay.timeout), e.autoplay.timeout = void 0), e.autoplay.running = !1, e.emit("autoplayStop"), !0))
            },
            pause: function (e) {
                var t = this;
                t.autoplay.running && (t.autoplay.paused || (t.autoplay.timeout && clearTimeout(t.autoplay.timeout), t.autoplay.paused = !0, 0 !== e && t.params.autoplay.waitForTransition ? (t.$wrapperEl[0].addEventListener("transitionend", t.autoplay.onTransitionEnd), t.$wrapperEl[0].addEventListener("webkitTransitionEnd", t.autoplay.onTransitionEnd)) : (t.autoplay.paused = !1, t.autoplay.run())))
            },
            onVisibilityChange: function () {
                var e = this,
                    t = r();
                "hidden" === t.visibilityState && e.autoplay.running && e.autoplay.pause(), "visible" === t.visibilityState && e.autoplay.paused && (e.autoplay.run(), e.autoplay.paused = !1)
            },
            onTransitionEnd: function (e) {
                var t = this;
                t && !t.destroyed && t.$wrapperEl && e.target === t.$wrapperEl[0] && (t.$wrapperEl[0].removeEventListener("transitionend", t.autoplay.onTransitionEnd), t.$wrapperEl[0].removeEventListener("webkitTransitionEnd", t.autoplay.onTransitionEnd), t.autoplay.paused = !1, t.autoplay.running ? t.autoplay.run() : t.autoplay.stop())
            }
        },
        le = {
            setTranslate: function () {
                for (var e = this, t = e.slides, a = 0; a < t.length; a += 1) {
                    var i = e.slides.eq(a),
                        s = -i[0].swiperSlideOffset;
                    e.params.virtualTranslate || (s -= e.translate);
                    var r = 0;
                    e.isHorizontal() || (r = s, s = 0);
                    var n = e.params.fadeEffect.crossFade ? Math.max(1 - Math.abs(i[0].progress), 0) : 1 + Math.min(Math.max(i[0].progress, -1), 0);
                    i.css({
                        opacity: n
                    }).transform("translate3d(" + s + "px, " + r + "px, 0px)")
                }
            },
            setTransition: function (e) {
                var t = this,
                    a = t.slides,
                    i = t.$wrapperEl;
                if (a.transition(e), t.params.virtualTranslate && 0 !== e) {
                    var s = !1;
                    a.transitionEnd((function () {
                        if (!s && t && !t.destroyed) {
                            s = !0, t.animating = !1;
                            for (var e = ["webkitTransitionEnd", "transitionend"], a = 0; a < e.length; a += 1) i.trigger(e[a])
                        }
                    }))
                }
            }
        },
        de = {
            setTranslate: function () {
                var e, t = this,
                    a = t.$el,
                    i = t.$wrapperEl,
                    s = t.slides,
                    r = t.width,
                    n = t.height,
                    o = t.rtlTranslate,
                    l = t.size,
                    d = t.browser,
                    p = t.params.cubeEffect,
                    c = t.isHorizontal(),
                    u = t.virtual && t.params.virtual.enabled,
                    h = 0;
                p.shadow && (c ? (0 === (e = i.find(".swiper-cube-shadow")).length && (e = m('<div class="swiper-cube-shadow"></div>'), i.append(e)), e.css({
                    height: r + "px"
                })) : 0 === (e = a.find(".swiper-cube-shadow")).length && (e = m('<div class="swiper-cube-shadow"></div>'), a.append(e)));
                for (var v = 0; v < s.length; v += 1) {
                    var f = s.eq(v),
                        g = v;
                    u && (g = parseInt(f.attr("data-swiper-slide-index"), 10));
                    var b = 90 * g,
                        w = Math.floor(b / 360);
                    o && (b = -b, w = Math.floor(-b / 360));
                    var y = Math.max(Math.min(f[0].progress, 1), -1),
                        E = 0,
                        x = 0,
                        T = 0;
                    g % 4 == 0 ? (E = 4 * -w * l, T = 0) : (g - 1) % 4 == 0 ? (E = 0, T = 4 * -w * l) : (g - 2) % 4 == 0 ? (E = l + 4 * w * l, T = l) : (g - 3) % 4 == 0 && (E = -l, T = 3 * l + 4 * l * w), o && (E = -E), c || (x = E, E = 0);
                    var S = "rotateX(" + (c ? 0 : -b) + "deg) rotateY(" + (c ? b : 0) + "deg) translate3d(" + E + "px, " + x + "px, " + T + "px)";
                    if (y <= 1 && y > -1 && (h = 90 * g + 90 * y, o && (h = 90 * -g - 90 * y)), f.transform(S), p.slideShadows) {
                        var C = c ? f.find(".swiper-slide-shadow-left") : f.find(".swiper-slide-shadow-top"),
                            M = c ? f.find(".swiper-slide-shadow-right") : f.find(".swiper-slide-shadow-bottom");
                        0 === C.length && (C = m('<div class="swiper-slide-shadow-' + (c ? "left" : "top") + '"></div>'), f.append(C)), 0 === M.length && (M = m('<div class="swiper-slide-shadow-' + (c ? "right" : "bottom") + '"></div>'), f.append(M)), C.length && (C[0].style.opacity = Math.max(-y, 0)), M.length && (M[0].style.opacity = Math.max(y, 0))
                    }
                }
                if (i.css({
                        "-webkit-transform-origin": "50% 50% -" + l / 2 + "px",
                        "-moz-transform-origin": "50% 50% -" + l / 2 + "px",
                        "-ms-transform-origin": "50% 50% -" + l / 2 + "px",
                        "transform-origin": "50% 50% -" + l / 2 + "px"
                    }), p.shadow)
                    if (c) e.transform("translate3d(0px, " + (r / 2 + p.shadowOffset) + "px, " + -r / 2 + "px) rotateX(90deg) rotateZ(0deg) scale(" + p.shadowScale + ")");
                    else {
                        var z = Math.abs(h) - 90 * Math.floor(Math.abs(h) / 90),
                            P = 1.5 - (Math.sin(2 * z * Math.PI / 360) / 2 + Math.cos(2 * z * Math.PI / 360) / 2),
                            k = p.shadowScale,
                            L = p.shadowScale / P,
                            $ = p.shadowOffset;
                        e.transform("scale3d(" + k + ", 1, " + L + ") translate3d(0px, " + (n / 2 + $) + "px, " + -n / 2 / L + "px) rotateX(-90deg)")
                    } var I = d.isSafari || d.isWebView ? -l / 2 : 0;
                i.transform("translate3d(0px,0," + I + "px) rotateX(" + (t.isHorizontal() ? 0 : h) + "deg) rotateY(" + (t.isHorizontal() ? -h : 0) + "deg)")
            },
            setTransition: function (e) {
                var t = this,
                    a = t.$el;
                t.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), t.params.cubeEffect.shadow && !t.isHorizontal() && a.find(".swiper-cube-shadow").transition(e)
            }
        },
        pe = {
            setTranslate: function () {
                for (var e = this, t = e.slides, a = e.rtlTranslate, i = 0; i < t.length; i += 1) {
                    var s = t.eq(i),
                        r = s[0].progress;
                    e.params.flipEffect.limitRotation && (r = Math.max(Math.min(s[0].progress, 1), -1));
                    var n = -180 * r,
                        o = 0,
                        l = -s[0].swiperSlideOffset,
                        d = 0;
                    if (e.isHorizontal() ? a && (n = -n) : (d = l, l = 0, o = -n, n = 0), s[0].style.zIndex = -Math.abs(Math.round(r)) + t.length, e.params.flipEffect.slideShadows) {
                        var p = e.isHorizontal() ? s.find(".swiper-slide-shadow-left") : s.find(".swiper-slide-shadow-top"),
                            c = e.isHorizontal() ? s.find(".swiper-slide-shadow-right") : s.find(".swiper-slide-shadow-bottom");
                        0 === p.length && (p = m('<div class="swiper-slide-shadow-' + (e.isHorizontal() ? "left" : "top") + '"></div>'), s.append(p)), 0 === c.length && (c = m('<div class="swiper-slide-shadow-' + (e.isHorizontal() ? "right" : "bottom") + '"></div>'), s.append(c)), p.length && (p[0].style.opacity = Math.max(-r, 0)), c.length && (c[0].style.opacity = Math.max(r, 0))
                    }
                    s.transform("translate3d(" + l + "px, " + d + "px, 0px) rotateX(" + o + "deg) rotateY(" + n + "deg)")
                }
            },
            setTransition: function (e) {
                var t = this,
                    a = t.slides,
                    i = t.activeIndex,
                    s = t.$wrapperEl;
                if (a.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), t.params.virtualTranslate && 0 !== e) {
                    var r = !1;
                    a.eq(i).transitionEnd((function () {
                        if (!r && t && !t.destroyed) {
                            r = !0, t.animating = !1;
                            for (var e = ["webkitTransitionEnd", "transitionend"], a = 0; a < e.length; a += 1) s.trigger(e[a])
                        }
                    }))
                }
            }
        },
        ce = {
            setTranslate: function () {
                for (var e = this, t = e.width, a = e.height, i = e.slides, s = e.slidesSizesGrid, r = e.params.coverflowEffect, n = e.isHorizontal(), o = e.translate, l = n ? t / 2 - o : a / 2 - o, d = n ? r.rotate : -r.rotate, p = r.depth, c = 0, u = i.length; c < u; c += 1) {
                    var h = i.eq(c),
                        v = s[c],
                        f = (l - h[0].swiperSlideOffset - v / 2) / v * r.modifier,
                        g = n ? d * f : 0,
                        b = n ? 0 : d * f,
                        w = -p * Math.abs(f),
                        y = r.stretch;
                    "string" == typeof y && -1 !== y.indexOf("%") && (y = parseFloat(r.stretch) / 100 * v);
                    var E = n ? 0 : y * f,
                        x = n ? y * f : 0,
                        T = 1 - (1 - r.scale) * Math.abs(f);
                    Math.abs(x) < .001 && (x = 0), Math.abs(E) < .001 && (E = 0), Math.abs(w) < .001 && (w = 0), Math.abs(g) < .001 && (g = 0), Math.abs(b) < .001 && (b = 0), Math.abs(T) < .001 && (T = 0);
                    var S = "translate3d(" + x + "px," + E + "px," + w + "px)  rotateX(" + b + "deg) rotateY(" + g + "deg) scale(" + T + ")";
                    if (h.transform(S), h[0].style.zIndex = 1 - Math.abs(Math.round(f)), r.slideShadows) {
                        var C = n ? h.find(".swiper-slide-shadow-left") : h.find(".swiper-slide-shadow-top"),
                            M = n ? h.find(".swiper-slide-shadow-right") : h.find(".swiper-slide-shadow-bottom");
                        0 === C.length && (C = m('<div class="swiper-slide-shadow-' + (n ? "left" : "top") + '"></div>'), h.append(C)), 0 === M.length && (M = m('<div class="swiper-slide-shadow-' + (n ? "right" : "bottom") + '"></div>'), h.append(M)), C.length && (C[0].style.opacity = f > 0 ? f : 0), M.length && (M[0].style.opacity = -f > 0 ? -f : 0)
                    }
                }
            },
            setTransition: function (e) {
                this.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e)
            }
        },
        ue = {
            init: function () {
                var e = this,
                    t = e.params.thumbs;
                if (e.thumbs.initialized) return !1;
                e.thumbs.initialized = !0;
                var a = e.constructor;
                return t.swiper instanceof a ? (e.thumbs.swiper = t.swiper, C(e.thumbs.swiper.originalParams, {
                    watchSlidesProgress: !0,
                    slideToClickedSlide: !1
                }), C(e.thumbs.swiper.params, {
                    watchSlidesProgress: !0,
                    slideToClickedSlide: !1
                })) : S(t.swiper) && (e.thumbs.swiper = new a(C({}, t.swiper, {
                    watchSlidesVisibility: !0,
                    watchSlidesProgress: !0,
                    slideToClickedSlide: !1
                })), e.thumbs.swiperCreated = !0), e.thumbs.swiper.$el.addClass(e.params.thumbs.thumbsContainerClass), e.thumbs.swiper.on("tap", e.thumbs.onThumbClick), !0
            },
            onThumbClick: function () {
                var e = this,
                    t = e.thumbs.swiper;
                if (t) {
                    var a = t.clickedIndex,
                        i = t.clickedSlide;
                    if (!(i && m(i).hasClass(e.params.thumbs.slideThumbActiveClass) || null == a)) {
                        var s;
                        if (s = t.params.loop ? parseInt(m(t.clickedSlide).attr("data-swiper-slide-index"), 10) : a, e.params.loop) {
                            var r = e.activeIndex;
                            e.slides.eq(r).hasClass(e.params.slideDuplicateClass) && (e.loopFix(), e._clientLeft = e.$wrapperEl[0].clientLeft, r = e.activeIndex);
                            var n = e.slides.eq(r).prevAll('[data-swiper-slide-index="' + s + '"]').eq(0).index(),
                                o = e.slides.eq(r).nextAll('[data-swiper-slide-index="' + s + '"]').eq(0).index();
                            s = void 0 === n ? o : void 0 === o ? n : o - r < r - n ? o : n
                        }
                        e.slideTo(s)
                    }
                }
            },
            update: function (e) {
                var t = this,
                    a = t.thumbs.swiper;
                if (a) {
                    var i = "auto" === a.params.slidesPerView ? a.slidesPerViewDynamic() : a.params.slidesPerView,
                        s = t.params.thumbs.autoScrollOffset,
                        r = s && !a.params.loop;
                    if (t.realIndex !== a.realIndex || r) {
                        var n, o, l = a.activeIndex;
                        if (a.params.loop) {
                            a.slides.eq(l).hasClass(a.params.slideDuplicateClass) && (a.loopFix(), a._clientLeft = a.$wrapperEl[0].clientLeft, l = a.activeIndex);
                            var d = a.slides.eq(l).prevAll('[data-swiper-slide-index="' + t.realIndex + '"]').eq(0).index(),
                                p = a.slides.eq(l).nextAll('[data-swiper-slide-index="' + t.realIndex + '"]').eq(0).index();
                            n = void 0 === d ? p : void 0 === p ? d : p - l == l - d ? l : p - l < l - d ? p : d, o = t.activeIndex > t.previousIndex ? "next" : "prev"
                        } else o = (n = t.realIndex) > t.previousIndex ? "next" : "prev";
                        r && (n += "next" === o ? s : -1 * s), a.visibleSlidesIndexes && a.visibleSlidesIndexes.indexOf(n) < 0 && (a.params.centeredSlides ? n = n > l ? n - Math.floor(i / 2) + 1 : n + Math.floor(i / 2) - 1 : n > l && (n = n - i + 1), a.slideTo(n, e ? 0 : void 0))
                    }
                    var c = 1,
                        u = t.params.thumbs.slideThumbActiveClass;
                    if (t.params.slidesPerView > 1 && !t.params.centeredSlides && (c = t.params.slidesPerView), t.params.thumbs.multipleActiveThumbs || (c = 1), c = Math.floor(c), a.slides.removeClass(u), a.params.loop || a.params.virtual && a.params.virtual.enabled)
                        for (var h = 0; h < c; h += 1) a.$wrapperEl.children('[data-swiper-slide-index="' + (t.realIndex + h) + '"]').addClass(u);
                    else
                        for (var v = 0; v < c; v += 1) a.slides.eq(t.realIndex + v).addClass(u)
                }
            }
        },
        he = [q, U, {
            name: "mousewheel",
            params: {
                mousewheel: {
                    enabled: !1,
                    releaseOnEdges: !1,
                    invert: !1,
                    forceToAxis: !1,
                    sensitivity: 1,
                    eventsTarget: "container",
                    thresholdDelta: null,
                    thresholdTime: null
                }
            },
            create: function () {
                M(this, {
                    mousewheel: {
                        enabled: !1,
                        lastScrollTime: x(),
                        lastEventBeforeSnap: void 0,
                        recentWheelEvents: [],
                        enable: K.enable,
                        disable: K.disable,
                        handle: K.handle,
                        handleMouseEnter: K.handleMouseEnter,
                        handleMouseLeave: K.handleMouseLeave,
                        animateSlider: K.animateSlider,
                        releaseScroll: K.releaseScroll
                    }
                })
            },
            on: {
                init: function (e) {
                    !e.params.mousewheel.enabled && e.params.cssMode && e.mousewheel.disable(), e.params.mousewheel.enabled && e.mousewheel.enable()
                },
                destroy: function (e) {
                    e.params.cssMode && e.mousewheel.enable(), e.mousewheel.enabled && e.mousewheel.disable()
                }
            }
        }, {
            name: "navigation",
            params: {
                navigation: {
                    nextEl: null,
                    prevEl: null,
                    hideOnClick: !1,
                    disabledClass: "swiper-button-disabled",
                    hiddenClass: "swiper-button-hidden",
                    lockClass: "swiper-button-lock"
                }
            },
            create: function () {
                M(this, {
                    navigation: t({}, Z)
                })
            },
            on: {
                init: function (e) {
                    e.navigation.init(), e.navigation.update()
                },
                toEdge: function (e) {
                    e.navigation.update()
                },
                fromEdge: function (e) {
                    e.navigation.update()
                },
                destroy: function (e) {
                    e.navigation.destroy()
                },
                click: function (e, t) {
                    var a = e.navigation,
                        i = a.$nextEl,
                        s = a.$prevEl,
                        r = t.target;
                    if (e.params.navigation.hideOnClick && !m(r).is(s) && !m(r).is(i)) {
                        if (e.pagination && e.params.pagination && e.params.pagination.clickable && (e.pagination.el === r || e.pagination.el.contains(r))) return;
                        var n;
                        i ? n = i.hasClass(e.params.navigation.hiddenClass) : s && (n = s.hasClass(e.params.navigation.hiddenClass)), !0 === n ? e.emit("navigationShow") : e.emit("navigationHide"), i && i.toggleClass(e.params.navigation.hiddenClass), s && s.toggleClass(e.params.navigation.hiddenClass)
                    }
                }
            }
        }, {
            name: "pagination",
            params: {
                pagination: {
                    el: null,
                    bulletElement: "span",
                    clickable: !1,
                    hideOnClick: !1,
                    renderBullet: null,
                    renderProgressbar: null,
                    renderFraction: null,
                    renderCustom: null,
                    progressbarOpposite: !1,
                    type: "bullets",
                    dynamicBullets: !1,
                    dynamicMainBullets: 1,
                    formatFractionCurrent: function (e) {
                        return e
                    },
                    formatFractionTotal: function (e) {
                        return e
                    },
                    bulletClass: "swiper-pagination-bullet",
                    bulletActiveClass: "swiper-pagination-bullet-active",
                    modifierClass: "swiper-pagination-",
                    currentClass: "swiper-pagination-current",
                    totalClass: "swiper-pagination-total",
                    hiddenClass: "swiper-pagination-hidden",
                    progressbarFillClass: "swiper-pagination-progressbar-fill",
                    progressbarOppositeClass: "swiper-pagination-progressbar-opposite",
                    clickableClass: "swiper-pagination-clickable",
                    lockClass: "swiper-pagination-lock"
                }
            },
            create: function () {
                M(this, {
                    pagination: t({
                        dynamicBulletIndex: 0
                    }, J)
                })
            },
            on: {
                init: function (e) {
                    e.pagination.init(), e.pagination.render(), e.pagination.update()
                },
                activeIndexChange: function (e) {
                    (e.params.loop || void 0 === e.snapIndex) && e.pagination.update()
                },
                snapIndexChange: function (e) {
                    e.params.loop || e.pagination.update()
                },
                slidesLengthChange: function (e) {
                    e.params.loop && (e.pagination.render(), e.pagination.update())
                },
                snapGridLengthChange: function (e) {
                    e.params.loop || (e.pagination.render(), e.pagination.update())
                },
                destroy: function (e) {
                    e.pagination.destroy()
                },
                click: function (e, t) {
                    var a = t.target;
                    if (e.params.pagination.el && e.params.pagination.hideOnClick && e.pagination.$el.length > 0 && !m(a).hasClass(e.params.pagination.bulletClass)) {
                        if (e.navigation && (e.navigation.nextEl && a === e.navigation.nextEl || e.navigation.prevEl && a === e.navigation.prevEl)) return;
                        !0 === e.pagination.$el.hasClass(e.params.pagination.hiddenClass) ? e.emit("paginationShow") : e.emit("paginationHide"), e.pagination.$el.toggleClass(e.params.pagination.hiddenClass)
                    }
                }
            }
        }, {
            name: "scrollbar",
            params: {
                scrollbar: {
                    el: null,
                    dragSize: "auto",
                    hide: !1,
                    draggable: !1,
                    snapOnRelease: !0,
                    lockClass: "swiper-scrollbar-lock",
                    dragClass: "swiper-scrollbar-drag"
                }
            },
            create: function () {
                M(this, {
                    scrollbar: t({
                        isTouched: !1,
                        timeout: null,
                        dragTimeout: null
                    }, Q)
                })
            },
            on: {
                init: function (e) {
                    e.scrollbar.init(), e.scrollbar.updateSize(), e.scrollbar.setTranslate()
                },
                update: function (e) {
                    e.scrollbar.updateSize()
                },
                resize: function (e) {
                    e.scrollbar.updateSize()
                },
                observerUpdate: function (e) {
                    e.scrollbar.updateSize()
                },
                setTranslate: function (e) {
                    e.scrollbar.setTranslate()
                },
                setTransition: function (e, t) {
                    e.scrollbar.setTransition(t)
                },
                destroy: function (e) {
                    e.scrollbar.destroy()
                }
            }
        }, {
            name: "parallax",
            params: {
                parallax: {
                    enabled: !1
                }
            },
            create: function () {
                M(this, {
                    parallax: t({}, ee)
                })
            },
            on: {
                beforeInit: function (e) {
                    e.params.parallax.enabled && (e.params.watchSlidesProgress = !0, e.originalParams.watchSlidesProgress = !0)
                },
                init: function (e) {
                    e.params.parallax.enabled && e.parallax.setTranslate()
                },
                setTranslate: function (e) {
                    e.params.parallax.enabled && e.parallax.setTranslate()
                },
                setTransition: function (e, t) {
                    e.params.parallax.enabled && e.parallax.setTransition(t)
                }
            }
        }, {
            name: "zoom",
            params: {
                zoom: {
                    enabled: !1,
                    maxRatio: 3,
                    minRatio: 1,
                    toggle: !0,
                    containerClass: "swiper-zoom-container",
                    zoomedSlideClass: "swiper-slide-zoomed"
                }
            },
            create: function () {
                var e = this;
                M(e, {
                    zoom: t({
                        enabled: !1,
                        scale: 1,
                        currentScale: 1,
                        isScaling: !1,
                        gesture: {
                            $slideEl: void 0,
                            slideWidth: void 0,
                            slideHeight: void 0,
                            $imageEl: void 0,
                            $imageWrapEl: void 0,
                            maxRatio: 3
                        },
                        image: {
                            isTouched: void 0,
                            isMoved: void 0,
                            currentX: void 0,
                            currentY: void 0,
                            minX: void 0,
                            minY: void 0,
                            maxX: void 0,
                            maxY: void 0,
                            width: void 0,
                            height: void 0,
                            startX: void 0,
                            startY: void 0,
                            touchesStart: {},
                            touchesCurrent: {}
                        },
                        velocity: {
                            x: void 0,
                            y: void 0,
                            prevPositionX: void 0,
                            prevPositionY: void 0,
                            prevTime: void 0
                        }
                    }, te)
                });
                var a = 1;
                Object.defineProperty(e.zoom, "scale", {
                    get: function () {
                        return a
                    },
                    set: function (t) {
                        if (a !== t) {
                            var i = e.zoom.gesture.$imageEl ? e.zoom.gesture.$imageEl[0] : void 0,
                                s = e.zoom.gesture.$slideEl ? e.zoom.gesture.$slideEl[0] : void 0;
                            e.emit("zoomChange", t, i, s)
                        }
                        a = t
                    }
                })
            },
            on: {
                init: function (e) {
                    e.params.zoom.enabled && e.zoom.enable()
                },
                destroy: function (e) {
                    e.zoom.disable()
                },
                touchStart: function (e, t) {
                    e.zoom.enabled && e.zoom.onTouchStart(t)
                },
                touchEnd: function (e, t) {
                    e.zoom.enabled && e.zoom.onTouchEnd(t)
                },
                doubleTap: function (e, t) {
                    !e.animating && e.params.zoom.enabled && e.zoom.enabled && e.params.zoom.toggle && e.zoom.toggle(t)
                },
                transitionEnd: function (e) {
                    e.zoom.enabled && e.params.zoom.enabled && e.zoom.onTransitionEnd()
                },
                slideChange: function (e) {
                    e.zoom.enabled && e.params.zoom.enabled && e.params.cssMode && e.zoom.onTransitionEnd()
                }
            }
        }, {
            name: "lazy",
            params: {
                lazy: {
                    checkInView: !1,
                    enabled: !1,
                    loadPrevNext: !1,
                    loadPrevNextAmount: 1,
                    loadOnTransitionStart: !1,
                    scrollingElement: "",
                    elementClass: "swiper-lazy",
                    loadingClass: "swiper-lazy-loading",
                    loadedClass: "swiper-lazy-loaded",
                    preloaderClass: "swiper-lazy-preloader"
                }
            },
            create: function () {
                M(this, {
                    lazy: t({
                        initialImageLoaded: !1
                    }, ae)
                })
            },
            on: {
                beforeInit: function (e) {
                    e.params.lazy.enabled && e.params.preloadImages && (e.params.preloadImages = !1)
                },
                init: function (e) {
                    e.params.lazy.enabled && !e.params.loop && 0 === e.params.initialSlide && (e.params.lazy.checkInView ? e.lazy.checkInViewOnLoad() : e.lazy.load())
                },
                scroll: function (e) {
                    e.params.freeMode && !e.params.freeModeSticky && e.lazy.load()
                },
                "scrollbarDragMove resize _freeModeNoMomentumRelease": function (e) {
                    e.params.lazy.enabled && e.lazy.load()
                },
                transitionStart: function (e) {
                    e.params.lazy.enabled && (e.params.lazy.loadOnTransitionStart || !e.params.lazy.loadOnTransitionStart && !e.lazy.initialImageLoaded) && e.lazy.load()
                },
                transitionEnd: function (e) {
                    e.params.lazy.enabled && !e.params.lazy.loadOnTransitionStart && e.lazy.load()
                },
                slideChange: function (e) {
                    e.params.lazy.enabled && e.params.cssMode && e.lazy.load()
                }
            }
        }, {
            name: "controller",
            params: {
                controller: {
                    control: void 0,
                    inverse: !1,
                    by: "slide"
                }
            },
            create: function () {
                M(this, {
                    controller: t({
                        control: this.params.controller.control
                    }, ie)
                })
            },
            on: {
                update: function (e) {
                    e.controller.control && e.controller.spline && (e.controller.spline = void 0, delete e.controller.spline)
                },
                resize: function (e) {
                    e.controller.control && e.controller.spline && (e.controller.spline = void 0, delete e.controller.spline)
                },
                observerUpdate: function (e) {
                    e.controller.control && e.controller.spline && (e.controller.spline = void 0, delete e.controller.spline)
                },
                setTranslate: function (e, t, a) {
                    e.controller.control && e.controller.setTranslate(t, a)
                },
                setTransition: function (e, t, a) {
                    e.controller.control && e.controller.setTransition(t, a)
                }
            }
        }, {
            name: "a11y",
            params: {
                a11y: {
                    enabled: !0,
                    notificationClass: "swiper-notification",
                    prevSlideMessage: "Previous slide",
                    nextSlideMessage: "Next slide",
                    firstSlideMessage: "This is the first slide",
                    lastSlideMessage: "This is the last slide",
                    paginationBulletMessage: "Go to slide {{index}}",
                    slideLabelMessage: "{{index}} / {{slidesLength}}",
                    containerMessage: null,
                    containerRoleDescriptionMessage: null,
                    itemRoleDescriptionMessage: null,
                    slideRole: "group"
                }
            },
            create: function () {
                M(this, {
                    a11y: t({}, se, {
                        liveRegion: m('<span class="' + this.params.a11y.notificationClass + '" aria-live="assertive" aria-atomic="true"></span>')
                    })
                })
            },
            on: {
                afterInit: function (e) {
                    e.params.a11y.enabled && (e.a11y.init(), e.a11y.updateNavigation())
                },
                toEdge: function (e) {
                    e.params.a11y.enabled && e.a11y.updateNavigation()
                },
                fromEdge: function (e) {
                    e.params.a11y.enabled && e.a11y.updateNavigation()
                },
                paginationUpdate: function (e) {
                    e.params.a11y.enabled && e.a11y.updatePagination()
                },
                destroy: function (e) {
                    e.params.a11y.enabled && e.a11y.destroy()
                }
            }
        }, {
            name: "history",
            params: {
                history: {
                    enabled: !1,
                    root: "",
                    replaceState: !1,
                    key: "slides"
                }
            },
            create: function () {
                M(this, {
                    history: t({}, re)
                })
            },
            on: {
                init: function (e) {
                    e.params.history.enabled && e.history.init()
                },
                destroy: function (e) {
                    e.params.history.enabled && e.history.destroy()
                },
                "transitionEnd _freeModeNoMomentumRelease": function (e) {
                    e.history.initialized && e.history.setHistory(e.params.history.key, e.activeIndex)
                },
                slideChange: function (e) {
                    e.history.initialized && e.params.cssMode && e.history.setHistory(e.params.history.key, e.activeIndex)
                }
            }
        }, {
            name: "hash-navigation",
            params: {
                hashNavigation: {
                    enabled: !1,
                    replaceState: !1,
                    watchState: !1
                }
            },
            create: function () {
                M(this, {
                    hashNavigation: t({
                        initialized: !1
                    }, ne)
                })
            },
            on: {
                init: function (e) {
                    e.params.hashNavigation.enabled && e.hashNavigation.init()
                },
                destroy: function (e) {
                    e.params.hashNavigation.enabled && e.hashNavigation.destroy()
                },
                "transitionEnd _freeModeNoMomentumRelease": function (e) {
                    e.hashNavigation.initialized && e.hashNavigation.setHash()
                },
                slideChange: function (e) {
                    e.hashNavigation.initialized && e.params.cssMode && e.hashNavigation.setHash()
                }
            }
        }, {
            name: "autoplay",
            params: {
                autoplay: {
                    enabled: !1,
                    delay: 3e3,
                    waitForTransition: !0,
                    disableOnInteraction: !0,
                    stopOnLastSlide: !1,
                    reverseDirection: !1
                }
            },
            create: function () {
                M(this, {
                    autoplay: t({}, oe, {
                        running: !1,
                        paused: !1
                    })
                })
            },
            on: {
                init: function (e) {
                    e.params.autoplay.enabled && (e.autoplay.start(), r().addEventListener("visibilitychange", e.autoplay.onVisibilityChange))
                },
                beforeTransitionStart: function (e, t, a) {
                    e.autoplay.running && (a || !e.params.autoplay.disableOnInteraction ? e.autoplay.pause(t) : e.autoplay.stop())
                },
                sliderFirstMove: function (e) {
                    e.autoplay.running && (e.params.autoplay.disableOnInteraction ? e.autoplay.stop() : e.autoplay.pause())
                },
                touchEnd: function (e) {
                    e.params.cssMode && e.autoplay.paused && !e.params.autoplay.disableOnInteraction && e.autoplay.run()
                },
                destroy: function (e) {
                    e.autoplay.running && e.autoplay.stop(), r().removeEventListener("visibilitychange", e.autoplay.onVisibilityChange)
                }
            }
        }, {
            name: "effect-fade",
            params: {
                fadeEffect: {
                    crossFade: !1
                }
            },
            create: function () {
                M(this, {
                    fadeEffect: t({}, le)
                })
            },
            on: {
                beforeInit: function (e) {
                    if ("fade" === e.params.effect) {
                        e.classNames.push(e.params.containerModifierClass + "fade");
                        var t = {
                            slidesPerView: 1,
                            slidesPerColumn: 1,
                            slidesPerGroup: 1,
                            watchSlidesProgress: !0,
                            spaceBetween: 0,
                            virtualTranslate: !0
                        };
                        C(e.params, t), C(e.originalParams, t)
                    }
                },
                setTranslate: function (e) {
                    "fade" === e.params.effect && e.fadeEffect.setTranslate()
                },
                setTransition: function (e, t) {
                    "fade" === e.params.effect && e.fadeEffect.setTransition(t)
                }
            }
        }, {
            name: "effect-cube",
            params: {
                cubeEffect: {
                    slideShadows: !0,
                    shadow: !0,
                    shadowOffset: 20,
                    shadowScale: .94
                }
            },
            create: function () {
                M(this, {
                    cubeEffect: t({}, de)
                })
            },
            on: {
                beforeInit: function (e) {
                    if ("cube" === e.params.effect) {
                        e.classNames.push(e.params.containerModifierClass + "cube"), e.classNames.push(e.params.containerModifierClass + "3d");
                        var t = {
                            slidesPerView: 1,
                            slidesPerColumn: 1,
                            slidesPerGroup: 1,
                            watchSlidesProgress: !0,
                            resistanceRatio: 0,
                            spaceBetween: 0,
                            centeredSlides: !1,
                            virtualTranslate: !0
                        };
                        C(e.params, t), C(e.originalParams, t)
                    }
                },
                setTranslate: function (e) {
                    "cube" === e.params.effect && e.cubeEffect.setTranslate()
                },
                setTransition: function (e, t) {
                    "cube" === e.params.effect && e.cubeEffect.setTransition(t)
                }
            }
        }, {
            name: "effect-flip",
            params: {
                flipEffect: {
                    slideShadows: !0,
                    limitRotation: !0
                }
            },
            create: function () {
                M(this, {
                    flipEffect: t({}, pe)
                })
            },
            on: {
                beforeInit: function (e) {
                    if ("flip" === e.params.effect) {
                        e.classNames.push(e.params.containerModifierClass + "flip"), e.classNames.push(e.params.containerModifierClass + "3d");
                        var t = {
                            slidesPerView: 1,
                            slidesPerColumn: 1,
                            slidesPerGroup: 1,
                            watchSlidesProgress: !0,
                            spaceBetween: 0,
                            virtualTranslate: !0
                        };
                        C(e.params, t), C(e.originalParams, t)
                    }
                },
                setTranslate: function (e) {
                    "flip" === e.params.effect && e.flipEffect.setTranslate()
                },
                setTransition: function (e, t) {
                    "flip" === e.params.effect && e.flipEffect.setTransition(t)
                }
            }
        }, {
            name: "effect-coverflow",
            params: {
                coverflowEffect: {
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    scale: 1,
                    modifier: 1,
                    slideShadows: !0
                }
            },
            create: function () {
                M(this, {
                    coverflowEffect: t({}, ce)
                })
            },
            on: {
                beforeInit: function (e) {
                    "coverflow" === e.params.effect && (e.classNames.push(e.params.containerModifierClass + "coverflow"), e.classNames.push(e.params.containerModifierClass + "3d"), e.params.watchSlidesProgress = !0, e.originalParams.watchSlidesProgress = !0)
                },
                setTranslate: function (e) {
                    "coverflow" === e.params.effect && e.coverflowEffect.setTranslate()
                },
                setTransition: function (e, t) {
                    "coverflow" === e.params.effect && e.coverflowEffect.setTransition(t)
                }
            }
        }, {
            name: "thumbs",
            params: {
                thumbs: {
                    swiper: null,
                    multipleActiveThumbs: !0,
                    autoScrollOffset: 0,
                    slideThumbActiveClass: "swiper-slide-thumb-active",
                    thumbsContainerClass: "swiper-container-thumbs"
                }
            },
            create: function () {
                M(this, {
                    thumbs: t({
                        swiper: null,
                        initialized: !1
                    }, ue)
                })
            },
            on: {
                beforeInit: function (e) {
                    var t = e.params.thumbs;
                    t && t.swiper && (e.thumbs.init(), e.thumbs.update(!0))
                },
                slideChange: function (e) {
                    e.thumbs.swiper && e.thumbs.update()
                },
                update: function (e) {
                    e.thumbs.swiper && e.thumbs.update()
                },
                resize: function (e) {
                    e.thumbs.swiper && e.thumbs.update()
                },
                observerUpdate: function (e) {
                    e.thumbs.swiper && e.thumbs.update()
                },
                setTransition: function (e, t) {
                    var a = e.thumbs.swiper;
                    a && a.setTransition(t)
                },
                beforeDestroy: function (e) {
                    var t = e.thumbs.swiper;
                    t && e.thumbs.swiperCreated && t && t.destroy()
                }
            }
        }];
    return F.use(he), F
}));
//# sourceMappingURL=swiper-bundle.min.js.map
(function (a) {
    a(function () {
        a.ajaxSetup({
            type: "POST",
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true
        });
        var j = (window.name === "sp-editor-frame") ? true : false;
        var k = (window.name === "preview-frame") ? true : false;
        var l = false;
        var e = 0;
        a("body").addClass("sp-" + window.page_type);
        a(window).on("resize", h);

        function h() {
            if (a(window).width() > 0) {
                if (a(window).width() <= 700 || a(window).height() <= 420) {
                    a("body").addClass("sp-view-mobile").removeClass("sp-view-desktop sp-view-tablet")
                } else {
                    if (a(window).width() <= 1024) {
                        a("body").addClass("sp-view-tablet").removeClass("sp-view-desktop sp-view-mobile")
                    } else {
                        a("body").addClass("sp-view-desktop").removeClass("sp-view-tablet sp-view-mobile")
                    }
                }
                if (!a("body.sp-view-desktop").length && a("#sp-header-wrapper").length) {
                    a("#sp-logo").unwrap();
                    a("#sp-header").css("width", "")
                } else {
                    if (a("body").hasClass("sp-view-desktop") && a("#sp-wrapper").css("justify-content") == "flex-end" && a("#sp-header").hasClass("sticky") && !a("#sp-header-wrapper").length && l) {
                        a("#sp-header").width(a("#sp-header").width());
                        a("#sp-header").wrapInner('<div id="sp-header-wrapper"></div>')
                    }
                }
                if (a("#sp-logo").outerWidth() > a(window).width() && !a("body").hasClass("sp-view-desktop")) {
                    if (!a("#sp-logo img").length) {
                        a().spString.fitText(a("#sp-logo"), {
                            fitTo: a(window),
                            maxSize: 200,
                            pad: 20
                        })
                    }
                } else {
                    if (a("body").hasClass("sp-view-desktop")) {
                        a("#sp-logo").css("font-size", "")
                    }
                }
                a(".sp-heading-block").each(function () {
                    var m = a(this);
                    if (a().spString.textWidth(m) > a(window).width() && !a("body").hasClass("sp-view-desktop")) {
                        a().spString.fitText(m.find("h1,h2,h3,h4"), {
                            fitTo: a(window),
                            maxSize: 200,
                            pad: 40
                        })
                    } else {
                        if (!a("body").hasClass("sp-view-mobile")) {
                            if (typeof m.find("span").attr("data-size") !== "undefined") {
                                m.find("h1,h2,h3,h4").css("font-size", m.find("span").data("size"))
                            } else {
                                m.find("h1,h2,h3,h4").css("font-size", "")
                            }
                        }
                    }
                });
                a('.sp-section-background[data-type="video"] video').each(function () {
                    var p = a(this);
                    var o = p.width() / p.height();
                    var m = p.parent().height() * o;
                    var n = p.parent().width() / o;
                    if (p.parent().width() > m) {
                        p.css({
                            width: "100%",
                            height: "auto"
                        })
                    } else {
                        if (p.parent().height() > n) {
                            p.css({
                                width: "auto",
                                height: "100%"
                            })
                        }
                    }
                })
            }
        }
        h();
        if (a(window).width() == 0) {
            var d = setInterval(function () {
                if (a(window).width() > 0) {
                    h();
                    clearInterval(d)
                }
            }, 100)
        }
        a('.sp-section-background[data-type="video"] video').on("loadeddata", function () {
            h()
        });
        var c = (j || k) ? "draft" : "published";
        window.theme_config;
        a.post(render_url + "/controllers/theme", "action=getConfig&theme_id=" + tid + "&page_id=" + pid + "&config_type=" + c, function (m) {
            window.theme_config = m;
            a("[style*='@color'], [data-style*='@color']").each(function () {
                var n = (typeof a(this).attr("data-style") !== "undefined" && a(this).data("style").indexOf(";") !== -1) ? a(this).data("style") : a(this).attr("style");
                n = n.replace(/(@color[0-9]{1})(\.[0-9]{1,2})?/g, function (p, o) {
                    var r = parseInt(o.replace(/^\D+/g, "")) - 1;
                    var q = m.colors[r];
                    if (p !== o) {
                        var s = "." + p.split(".")[1];
                        q = tinycolor(q).setAlpha(s).toRgbString()
                    }
                    return q
                });
                if (a(this).css("background-attachment") == "scroll") {
                    if (n.indexOf("attachment:fixed") !== -1) {
                        n = n.split("attachment:fixed").join("attachment:scroll")
                    }
                }
                a(this).attr("style", n);
                if (typeof a(this).attr("data-style") !== "undefined" && a(this).data("style").indexOf(";") !== -1) {
                    a(this).removeAttr("data-style")
                }
                if (a(this).hasClass("parallax") && !navigator.userAgent.match(/(iPod|iPhone|iPad)/) && !navigator.userAgent.match(/(Android)/)) {
                    a(this).css("background-image", "")
                }
            });
            if (m.header.hasOwnProperty("sticky") && m.header.sticky == true) {
                a("#sp-header").addClass("sticky")
            }
            document.body.dispatchEvent(new Event("themeConfigLoaded"))
        });
        if (!j) {
            custom_fonts = custom_fonts.replace(/\|+$/, "");
            var f = custom_fonts.split("|");
            WebFontConfig = {
                google: {
                    families: f
                },
                timeout: 2000,
                active: function () {
                    l = true;
                    a("body").trigger("fontsLoaded")
                }
            };
            (function () {
                var m = document.createElement("script");
                m.src = ("https:" == document.location.protocol ? "https" : "http") + "://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js";
                m.type = "text/javascript";
                m.async = "true";
                var n = document.getElementsByTagName("script")[0];
                n.parentNode.insertBefore(m, n)
            })()
        }
        a("body").on("fontsLoaded", function () {
            if (a("#sp-wrapper").css("justify-content") == "flex-end") {
                if (a("#sp-header").hasClass("sticky") && !a("#sp-header-wrapper").length) {
                    a("#sp-header").width(a("#sp-header").width());
                    a("#sp-header").wrapInner('<div id="sp-header-wrapper"></div>')
                }
                a("#sp-footer").css("width", "calc(100% - " + Math.ceil(a("#sp-header").outerWidth()) + "px)")
            }
            if (a("#sp-header").length) {
                e = a("#sp-header").offset().top + a("#sp-header").outerHeight()
            }
        });
        a("body").on("styleRefreshed", function () {
            if (a("#sp-wrapper").css("justify-content") == "flex-end") {
                a("#sp-footer").css("width", "calc(100% - " + Math.ceil(a("#sp-header").outerWidth()) + "px)")
            } else {
                a("#sp-footer").css("width", "");
                if (a("#sp-header-wrapper").length) {
                    a("#sp-header-wrapper").replaceWith(a("#sp-header-wrapper").contents());
                    a("#sp-header").css("width", "")
                }
            }
        });
        if (a(".addthis_toolbox").length) {
            addthis.init()
        }
        var b = new WOW({
            boxClass: "sp-animate",
            live: true
        });
        b.init();
        if (a("#sp-header").length && !j) {
            var i = a(window);
            var g = a("#sp-header");
            e = (e == 0) ? g.offset().top + g.outerHeight() : e;
            i.scroll(function () {
                if (g.hasClass("sticky") && a("#sp-nav-links li").length) {
                    if (e < i.scrollTop()) {
                        if (!g.hasClass("fixed")) {
                            g.addClass("fixed");
                            if (typeof a("#sp-content").find(".sp-section").first().attr("header") == "undefined") {
                                a("#sp-content").css("margin-top", e)
                            }
                            var m = tinycolor(a("#sp-header").css("background-color"));
                            if (m.getAlpha() == 0) {
                                setTimeout(function () {
                                    var n = tinycolor(a("#sp-nav-links > ul > li > a").css("color"));
                                    if (n.isLight()) {
                                        a("#sp-header").css("background-color", "#000")
                                    } else {
                                        a("#sp-header").css("background-color", "#FFF")
                                    }
                                }, 100)
                            }
                            a(".sp-section").trigger("resize")
                        }
                    } else {
                        if (g.hasClass("fixed")) {
                            g.removeClass("fixed");
                            a("#sp-header").css("background-color", "");
                            a("#sp-content").css("margin-top", "");
                            a(".sp-section").trigger("resize")
                        }
                    }
                }
            })
        }
        if (window.name === "sp-preview-frame") {
            a("body").attr("data-location", window.location.href).attr("data-id", pid).attr("data-type", ptype)
        }
        a("body").on("refreshNav", function () {
            var m = "action=refreshNav&website_id=" + wid;
            a.post(render_url + "/controllers/website", m, function (n) {
                a("#sp-nav-button").remove();
                a("#sp-nav").replaceWith(n);
                a(".sp-section").trigger("resize")
            })
        });
        a(".sp-video-block .video-thumb").on("click", function () {
            var n = a(this).parent();
            var m = (n.find("iframe").attr("src").indexOf("?") != -1) ? "&autoplay=1" : "?autoplay=1";
            n.find("iframe")[0].src += m;
            a(this).hide()
        });
        a(".sp-archive-item").on("click", function (m) {
            if (a(this).hasClass("closed")) {
                a(this).removeClass("closed");
                a(this).find("i").first().removeClass("fa-angle-right").addClass("fa-angle-down")
            } else {
                a(this).addClass("closed");
                a(this).find("i").first().removeClass("fa-angle-down").addClass("fa-angle-right")
            }
            m.stopImmediatePropagation()
        });
        a(".sp-archive-item").first().click();
        a(".sp-add-comment-button").on("click", function (m) {
            m.preventDefault();
            a(this).closest(".button-holder").hide().after(a("#sp-reply-holder"));
            a("#sp-reply-holder").slideDown()
        });
        a(".sp-comment-reply-button a").on("click", function (m) {
            m.preventDefault();
            a(".sp-add-comment-button").show();
            a(this).closest(".sp-comment-wrapper").after(a("#sp-reply-holder"));
            a("#sp-reply-holder .sp-form").show();
            a("#sp-reply-holder textarea").val("");
            a("#sp-reply-holder .sp-notify").remove();
            a("#sp-reply-holder").slideDown();
            a("#sp-reply-holder .sp-form input[name=parent_id]").val(a(this).closest(".sp-comment").data("comment_id"))
        });
        a(".sp-blog_post_comments-block #sp-reply-holder .sp-button").on("click", function (p) {
            p.preventDefault();
            var n = a(this);
            n.addClass("disabled");
            var m = a(".sp-blog_post_comments-block .sp-form").spForm("validate");
            if (Array.isArray(m)) {
                var o = "&action=addComment&in=" + encodeURIComponent(JSON.stringify(m));
                a.post(render_url + "/controllers/forms", o, function (q) {
                    n.removeClass("disabled");
                    if (q == "success") {
                        a(".sp-blog_post_comments-block #sp-reply-holder").prepend('<div class="sp-notify">Your comment has been submitted.</div>');
                        a(".sp-blog_post_comments-block .sp-form").hide()
                    } else {
                        a(".sp-blog_post_comments-block #sp-reply-holder").prepend('<div class="sp-notify">' + q + "</div>")
                    }
                })
            } else {
                n.removeClass("disabled")
            }
        });
        a(".sp-form").spForm()
    })
})(jQuery);
(function (a) {
    a(function () {
        a('#sp-nav-links > ul > li[data-type="folder"] > a').on("click", function (g) {
            g.preventDefault()
        });
        var f = a('<div class="sp-mobile-nav-wrapper"></div>');
        a("body").prepend(f);
        var b = a('<div class="sp-nav-close-button"></div>');
        f.prepend(b);
        var c = a('<div class="sp-mobile-nav"></div>');
        f.append(c);
        var d = c.clone(true);
        f.append(d);
        d.addClass("sub");
        var e = a("#sp-nav-links > ul").clone(false, false);
        e.find(".fa-angle-down").removeClass("fa-angle-down").addClass("fa-angle-right");
        c.append(e);
        e.find("i").css({
            position: "absolute",
            top: "20px",
            right: "20px",
            "font-size": "1em"
        });
        e.find("li ul").each(function () {
            var g = a(this).closest("li");
            g.on("click", function (i) {
                i.preventDefault();
                var j = g.find("ul").clone();
                d.empty();
                d.append(j);
                if (g.data("type") !== "folder") {
                    j.prepend(g.clone(false));
                    j.find("li").first().find("i").remove()
                }
                var h = a('<li><a href="#">Back<i class="fa fa-angle-left" style="position: absolute; top: 20px; left: 20px;"></i></a></li>');
                h.find("a").attr("style", "color:rgba(255,255,255,.3) !important;");
                j.prepend(h);
                h.on("click", function (k) {
                    k.preventDefault();
                    d.removeClass("slide");
                    c.removeClass("slide")
                });
                c.addClass("slide");
                d.addClass("slide")
            });
            a(this).find("li a").on("click", function (h) {
                h.stopPropagation()
            })
        });
        a("#sp-nav-button").on("click", function () {
            f.addClass("open");
            a("html, body").css("overflow-y", "hidden")
        });
        b.on("click", function () {
            f.removeClass("open");
            a("html, body").css("overflow-y", "auto")
        })
    })
})(jQuery);
(function (a) {
    a.fn.spString = function (c, b) {};
    a.fn.spString.fitText = function (h, n) {
        var f = {
            fitTo: h.parent(),
            maxSize: 20,
            minSize: 10,
            pad: 50
        };
        n = (typeof n !== "undefined") ? a.extend({}, f, n) : n = a.extend({}, f);
        var b = a("<div></div>");
        b.css({
            width: h.parent().outerWidth(),
            position: "absolute",
            left: 0,
            "background-color": "#CC0000"
        });
        a("body").append(b);
        var d = h.clone();
        b.append(d);
        d.css({
            display: "inline-block",
            width: "",
            position: "relative"
        });
        var l = n.fitTo;
        var j = n.maxSize;
        var c = n.minSize;
        var k = j - c;
        var e = n.pad;
        if (h.text() !== "" && !a("body").find("dup-text").length) {
            var m = parseInt(d.css("font-size"));
            if (d.width() < l.width() - e) {
                for (var g = 0; g <= k; g++) {
                    if (d.width() < l.width() - e) {
                        m = parseInt(d.css("font-size"));
                        d.css("font-size", m + 1)
                    } else {
                        g = k
                    }
                }
            } else {
                if (d.width() > l.width() - e) {
                    for (var g = 0; g <= k; g++) {
                        if (d.width() > l.width() - e) {
                            m = parseInt(d.css("font-size"));
                            d.css("font-size", m - 1)
                        } else {
                            g = k
                        }
                    }
                }
            }
            m = m > j ? j : m;
            m = m < c ? c : m;
            h.css("font-size", m)
        }
        b.remove()
    };
    a.fn.spString.textWidth = function (d) {
        var e = a("<div></div>");
        e.css({
            width: d.parent().outerWidth(),
            position: "absolute",
            left: 0,
            "background-color": "#CC0000"
        });
        a("body").append(e);
        var c = d.clone();
        e.append(c);
        c.css({
            display: "inline-block",
            width: "",
            position: "relative"
        });
        var b = c.width();
        e.remove();
        return b
    }
})(jQuery);
(function (a) {
    a(function () {
        a(".sp-section").spSection()
    });
    a.fn.spSection = function () {
        var b = (window.name === "sp-editor-frame") ? true : false;
        if (!a("#sp-wrapper > .sp-resizer").length) {
            a("#sp-wrapper").spResize();
            a("#sp-wrapper").on("resize", function () {
                if (a(".parallax-slider").length) {
                    a(window).trigger("resize.px.parallax")
                }
                a('.sp-section-background[data-type="video"] iframe').each(function () {
                    var e = a(this);
                    var c = e.parent().width();
                    var d = e.parent().height();
                    e.height(d);
                    e.width((16 * d) / 9);
                    if (e.width() < c) {
                        e.width(c);
                        e.height((9 * c) / 16)
                    }
                })
            })
        }
        this.each(function () {
            var i = a(this);
            var e;
            if (!b && !i.find(".sp-grid").not(":empty").length) {
                i.addClass("empty")
            }

            function g() {
                if (i.find(".sp-section-pagination").length) {
                    i.find(".sp-section-pagination").remove()
                }
                if (i.find(".sp-section-arrow").length) {
                    i.find(".sp-section-arrow").remove()
                }
                if (i.find(".sp-section-labels").length) {
                    i.find(".sp-section-labels").remove()
                }
                if (i.find(".sp-section-slide").length > 1) {
                    var k = a('<div class="sp-section-pagination"></div>');
                    i.append(k);
                    i.find(".sp-section-slide").each(function () {
                        var o = a('<div class="sp-pagination-button sp-border-match-text"></div>');
                        o.data("slide", a(this));
                        k.append(o);
                        o.on("click", function () {
                            a(this).data("slide").addClass("goto");
                            i.trigger("changeSlide");
                            clearInterval(e)
                        })
                    });
                    k.find(".sp-pagination-button").first().addClass("current");
                    var n = a('<div class="sp-section-labels"></div>');
                    i.find(".sp-section-slide").first().before(n);
                    i.find(".sp-section-slide").each(function () {
                        var o = a('<div class="sp-section-label sp-border-match-text">' + a(this).data("label") + "</div>");
                        o.data("slide", a(this));
                        n.append(o);
                        o.on("click", function () {
                            a(this).data("slide").addClass("goto");
                            i.trigger("changeSlide");
                            clearInterval(e)
                        })
                    });
                    n.find(".sp-section-label").first().addClass("current");
                    var l = a('<div class="sp-section-arrow next sp-border-match-text"></div>');
                    var m = a('<div class="sp-section-arrow prev sp-border-match-text"></div>');
                    i.append(l).append(m);
                    l.on("click", function () {
                        var o = i.find(".sp-section-slide.current");
                        if (o.next(".sp-section-slide").length) {
                            o.next(".sp-section-slide").addClass("goto")
                        } else {
                            i.find(".sp-section-slide").first().addClass("goto")
                        }
                        i.trigger("changeSlide");
                        clearInterval(e)
                    });
                    m.on("click", function () {
                        var o = i.find(".sp-section-slide.current");
                        if (o.prev(".sp-section-slide").length) {
                            o.prev(".sp-section-slide").addClass("goto")
                        } else {
                            i.find(".sp-section-slide").first().addClass("goto")
                        }
                        i.trigger("changeSlide");
                        clearInterval(e)
                    })
                }
                i.find(".sp-section-slide").first().addClass("current");
                if (!b && i.find(".sp-section-slide").length > 1) {
                    if (typeof i.attr("data-autoplay") !== "undefined" || typeof i.data("autoplay") !== "undefined") {
                        e = setInterval(function () {
                            var o = i.find(".sp-section-slide.current");
                            if (o.next(".sp-section-slide").length) {
                                o.next(".sp-section-slide").addClass("goto")
                            } else {
                                i.find(".sp-section-slide").first().addClass("goto")
                            }
                            i.trigger("changeSlide")
                        }, parseInt(i.data("autoplay")) * 1000)
                    }
                }
            }
            g();
            i.on("changeSlide", function () {
                var n = i.find(".sp-section-slide.current");
                var k = i.find(".sp-section-slide.goto");
                n.removeClass("current");
                k.removeClass("goto").addClass("current");
                i.find(".sp-section-slide").first().css("margin-left", 0 - (i.outerWidth(true) * i.find(".sp-section-slide").index(k)));
                var m = k.data("bg");
                if (m) {
                    m.css("left", 0)
                }
                var l = 0;
                m.prevAll(".sp-section-background").each(function () {
                    l--;
                    a(this).css("left", (100 * l) + "%")
                });
                l = 0;
                m.nextAll(".sp-section-background").each(function () {
                    l++;
                    a(this).css("left", (100 * l) + "%")
                });
                i.find(".sp-pagination-button, .sp-section-label").removeClass("current");
                i.find(".sp-pagination-button:eq(" + i.find(".sp-section-slide").index(k) + ")").addClass("current");
                i.find(".sp-section-label:eq(" + i.find(".sp-section-slide").index(k) + ")").addClass("current")
            });
            i.spResize();
            i.on("resize", function () {
                if (i.find(".sp-section-slide").length > 1) {
                    i.find(".sp-section-slide").first().css("margin-left", 0 - (i.outerWidth(true) * i.find(".sp-section-slide.current")))
                }
                if (i.index() == 0 && i.parent().attr("id") == "sp-content" && typeof i.attr("data-header") !== "undefined") {
                    j()
                }
                f();
                if (a(".parallax-slider").length) {
                    a(window).trigger("resize.px.parallax")
                }
            });
            i.trigger("resize");
            var d = a('<div class="sp-section-backgrounds"></div>');
            i.prepend(d);

            function h(v) {
                if (typeof v.data("bg") == "undefined") {
                    if (typeof v.attr("data-background") !== "undefined") {
                        var n = JSON.parse(decodeURIComponent(v.data("background")));
                        var o = "";
                        var q = (n.attachment === "parallax") ? true : false;
                        var u = (q) ? "fixed" : n.attachment;
                        if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
                            u = "scroll"
                        }
                        o += (q) ? " parallax" : "";
                        var m = "";
                        if (typeof v.attr("data-tint") !== "undefined") {
                            m = "color: " + v.data("tint") + ";"
                        }
                        var k = "background: URL(" + n.src + ") " + n.position + " " + n.repeat + ";background-size:" + n.size + ";background-attachment:" + u + ";" + m;
                        var t = a('<div class="sp-section-background' + o + '" data-type="image" data-style="' + k + '" style="' + k + '"></div>');
                        d.append(t);
                        if (q) {
                            var s = t.css("background-image");
                            s = s.replace('url("', "").replace('")', "").replace("url(", "").replace(")", "");
                            if (!navigator.userAgent.match(/(iPod|iPhone|iPad)/) && !navigator.userAgent.match(/(Android)/)) {
                                t.css("background-image", "")
                            }
                            t.parallax({
                                imageSrc: s,
                                overScrollFix: true,
                                iosFix: true,
                                zIndex: 0
                            })
                        }
                    } else {
                        if (typeof v.attr("data-background-color") !== "undefined") {
                            var k = "background-color:" + v.attr("data-background-color") + ";";
                            var t = a('<div class="sp-section-background" data-type="color" data-style="' + k + '" style="' + k + '"></div>');
                            d.append(t)
                        } else {
                            if (typeof v.attr("data-background-gradient") !== "undefined") {
                                var k = "background-image:" + v.attr("data-background-gradient") + ";";
                                var t = a('<div class="sp-section-background" data-type="gradient" data-style="' + k + '" style="' + k + '"></div>');
                                d.append(t)
                            } else {
                                if (typeof v.attr("data-background-video") !== "undefined") {
                                    var l = JSON.parse(decodeURIComponent(v.data("background-video")));
                                    var m = "";
                                    if (typeof v.attr("data-tint") !== "undefined") {
                                        m = "color: " + v.data("tint") + ";"
                                    }
                                    k = m;
                                    var p = '<div class="sp-section-background" data-type="video" data-video-source="' + l.source + '" data-video-id="' + l.id + '" data-style="' + k + '" style="' + k + '">';
                                    switch (l.source) {
                                        case "vimeo":
                                            p += '<iframe src=" https://player.vimeo.com/video/' + l.id + '?background=1&loop=1" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen=""></iframe>';
                                            break;
                                        case "youtube":
                                            p += '<iframe src="https://www.youtube.com/embed/' + l.id + "?playlist=" + l.id + '&autoplay=1&loop=1&mute=1&cc_load_policy=0&controls=0&disablekb=0&iv_load_policy=3&playsinline=1&rel=0&showinfo=0&modestbranding=3" frameborder="0" allowfullscreen></iframe>';
                                            break;
                                        case "file":
                                            p += '<video playsinline="" autoplay="" muted="" loop=""><source src="' + l.id + '" type="video/mp4"></video>';
                                            break
                                    }
                                    p += "</div>";
                                    var t = a(p);
                                    if (typeof l.image !== "undefined") {
                                        t.css("background-image", "URL(" + l.image + ")").addClass("mobile-image")
                                    }
                                    d.append(t)
                                } else {
                                    var t = a('<div class="sp-section-background"></div>');
                                    d.append(t)
                                }
                            }
                        }
                    }
                    var r = t.index();
                    t.css("left", (r * 100) + "%");
                    v.data("bg", t);
                    t.on("addParallax", function () {
                        var w = t.css("background-image");
                        w = w.replace('url("', "").replace('")', "").replace("url(", "").replace(")", "");
                        if (!navigator.userAgent.match(/(iPod|iPhone|iPad)/) && !navigator.userAgent.match(/(Android)/)) {
                            t.css("background-image", "")
                        }
                        t.parallax({
                            imageSrc: w,
                            overScrollFix: true,
                            iosFix: true,
                            zIndex: 0
                        })
                    });
                    t.on("removeParallax", function () {
                        var w = t.find(".parallax-slider").attr("src");
                        t.css("background-image", 'url("' + w + '")');
                        t.parallax("destroy")
                    })
                } else {}
            }
            i.find(".sp-section-slide").each(function (k) {
                h(a(this))
            });
            i.on("refresh", function () {
                g();
                i.find(".sp-section-slide").each(function (k) {
                    h(a(this))
                });
                j()
            });
            j();
            setTimeout(j, 3000);
            a("body").on("fontsLoaded", j);

            function f() {
                i.find(".sp-section-slide").each(function () {
                    var l = a(this);
                    if ((a(window).width() < 700 || a(window).height() < 420) && !a("body").hasClass("saving")) {
                        if (typeof l.attr("data-layout") === "undefined" || l.data("layout") !== "mobile") {
                            l.data("layout", "mobile");
                            l.attr("data-layout", "mobile");
                            if (l.find(".sp-row").length) {
                                var k;
                                if (typeof l.attr("data-order") !== "undefined" || typeof l.data("order") !== "undefined") {
                                    k = l.data("order").split(",");
                                    l.find(".sp-block").each(function () {
                                        var u = a(this);
                                        var v = String(u.data("id"));
                                        if (k.indexOf(v) == -1) {
                                            var s = false;
                                            if (u.prev(".sp-block").length) {
                                                var t = String(u.prev(".sp-block").data("id"));
                                                if (k.indexOf(t) !== -1) {
                                                    s = true;
                                                    k.splice(k.indexOf(t), 0, v)
                                                }
                                            } else {
                                                if (u.next(".sp-block").length) {
                                                    var r = String(u.next(".sp-block").data("id"));
                                                    if (k.indexOf(r) !== -1) {
                                                        s = true;
                                                        k.splice(k.indexOf(r) + 1, 0, v)
                                                    }
                                                }
                                            }
                                            if (!s) {
                                                k.push(v)
                                            }
                                            l.data("order", k.join(","));
                                            l.attr("data-order", k.join(","))
                                        }
                                    })
                                } else {
                                    k = new Array();
                                    l.find(".sp-grid").children().each(function () {
                                        var r = a(this);
                                        if (r.hasClass("sp-row")) {
                                            r.children(".sp-col").each(function () {
                                                c(a(this), k)
                                            })
                                        } else {
                                            if (r.hasClass("sp-block")) {
                                                k.push(r.data("id"))
                                            }
                                        }
                                    })
                                }
                                var p = a('<div class="sp-col sp-mobile-col"></div>');
                                l.find(".sp-grid").prepend(p);
                                for (var n = 0; n < k.length; n++) {
                                    var q = l.find(".sp-block[data-id='" + k[n] + "']");
                                    if (q.length) {
                                        var o = a('<div class="sp-block-placeholder"></div>');
                                        q.data("placeholder", o);
                                        o.insertAfter(q);
                                        var m = q[0];
                                        p.append(q);
                                        a(m).trigger("mobileMove")
                                    }
                                }
                            }
                            l.find(".sp-grid").trigger("resized")
                        }
                    } else {
                        if (typeof l.attr("data-layout") !== "undefined" && l.data("layout") === "mobile") {
                            l.data("layout", "desktop");
                            l.attr("data-layout", "desktop");
                            l.find(".sp-mobile-col").find(".sp-block").each(function () {
                                var r = a(this);
                                if (!!r.data("placeholder")) {
                                    r.data("placeholder").replaceWith(r);
                                    r.trigger("mobileMove")
                                }
                            });
                            l.find(".sp-mobile-col").remove();
                            l.find(".sp-grid").trigger("resized")
                        }
                    }
                })
            }
            a("body").on("mobileOff", f);
            a("body").on("mobileOn", f);

            function c(l, k) {
                if (!l.find(".sp-row").length) {
                    l.find(".sp-block").each(function () {
                        k.push(a(this).data("id"))
                    })
                } else {
                    l.children().each(function () {
                        var m = a(this);
                        if (m.hasClass("sp-row")) {
                            m.children(".sp-col").each(function () {
                                c(a(this), k)
                            })
                        } else {
                            if (m.hasClass("sp-block")) {
                                k.push(m.data("id"))
                            }
                        }
                    })
                }
            }

            function j() {
                if (i.index() == 0 && i.parent().attr("id") == "sp-content" && typeof i.attr("data-header") !== "undefined" && !a("#sp-header").hasClass("fixed") && a("#sp-wrapper").css("justify-content") !== "flex-end") {
                    a("#sp-header").css("position", "absolute");
                    i.addClass("include-menu");
                    if (typeof i.attr("data-padding") == "undefined") {
                        i.data("padding", i.css("padding-top")).attr("data-padding", i.css("padding-top"));
                        i.data("header", true).attr("data-header", true)
                    }
                    var k = parseInt(i.data("padding")) + a("#sp-header").outerHeight();
                    if (i.css("padding-top") == "0px" || parseInt(i.css("padding-top")) !== k) {
                        i.css({
                            "padding-top": k
                        })
                    }
                    if (tinycolor(a("#sp-logo").css("background-color")).getAlpha() == 0) {
                        a("#sp-logo").css("color", i.css("color"))
                    }
                    if (tinycolor(a("#sp-nav").css("background-color")).getAlpha() == 0) {
                        a("#sp-nav-links > ul > li > a").css("color", i.css("color"))
                    }
                    if (tinycolor(a("#sp-bar").css("background-color")).getAlpha() == 0) {
                        a("#sp-bar").attr("style", "color:" + i.css("color") + " !important;")
                    }
                    a("#sp-nav-button").css("color", i.css("color"))
                } else {
                    if (i.index() == 0 && i.parent().attr("id") == "sp-content" && typeof i.attr("data-header") !== "undefined" && a("#sp-header").hasClass("fixed")) {
                        i.css("padding-top", "");
                        a("#sp-logo").css("color", "");
                        a("#sp-bar").css("color", "");
                        a("#sp-nav-links > ul > li > a").css("color", "");
                        a("#sp-nav-button").css("color", "")
                    } else {
                        if (i.index() == 0 && i.parent().attr("id") == "sp-content") {
                            a("#sp-header").css("position", "");
                            a("#sp-logo").css("color", "");
                            a("#sp-bar").css("color", "");
                            a("#sp-nav-links > ul > li > a").css("color", "");
                            a("#sp-nav-button").css("color", "")
                        } else {
                            i.removeAttr("data-padding").removeData("padding");
                            i.css({
                                "padding-top": ""
                            });
                            i.removeAttr("data-header").removeData("header")
                        }
                    }
                }
            }
        })
    }
})(jQuery);
(function (a) {
    a(function () {
        a(".sp-slideshow").spSlideshow()
    });
    a.fn.spSlideshow = function () {
        this.each(function () {
            var k = a(this);
            var h = k.find("ul").first();
            var f = k.find("ul").eq(1);
            var i = h.find("li").length;
            var j;
            k.find("ul li:first-child").addClass("current");
            var e = a('<div class="sp-slideshow-overlay"><div class="sp-slideshow-details"><div class="sp-slideshow-title"></div><div class="sp-slideshow-caption"></div></div><div class="sp-slideshow-button playpause"></div><div class="sp-slideshow-button prev"></div><div class="sp-slideshow-button next"></div></div>');
            k.append(e);
            k.find(".sp-slideshow-button.next").on("click", function () {
                if (k.attr("data-playing") === "true") {
                    g()
                }
                d()
            });
            k.find(".sp-slideshow-button.prev").on("click", function () {
                if (k.attr("data-playing") === "true") {
                    g()
                }
                c()
            });
            k.find(".sp-slideshow-button.playpause").on("click", function () {
                g()
            });
            f.find("li").on("click", function () {
                if (!a(this).hasClass("current")) {
                    if (k.attr("data-playing") === "true") {
                        g()
                    }
                    b(a(this).index())
                }
            });

            function d() {
                if (h.find(".current").index() < i - 1) {
                    b(h.find(".current").index() + 1)
                } else {
                    b(0)
                }
            }

            function c() {
                if (h.find(".current").index() > 0) {
                    b(h.find(".current").index() - 1)
                } else {
                    b(i - 1)
                }
            }

            function g() {
                if (k.attr("data-playing") === "false") {
                    k.data("playing", true);
                    k.attr("data-playing", true);
                    j = setInterval(function () {
                        d()
                    }, 5000)
                } else {
                    k.data("playing", false);
                    k.attr("data-playing", false);
                    clearInterval(j)
                }
            }
            if (!!k.attr("data-playing")) {
                g()
            }
            k.on("playPause", g);

            function b(q) {
                if (!h.find(".last").length) {
                    h.find("li.last").removeClass("last");
                    var n = h.find("li").eq(q);
                    var p = h.find("li.current");
                    p.addClass("last").removeClass("current");
                    n.addClass("current");
                    if (k.find("ul").length > 1) {
                        f.find("li.current").removeClass("current");
                        f.find("li").eq(q).addClass("current");
                        var o = f.find("li").first().width() * f.find("li.current").index();
                        var m = (f.width() / 2) - (f.find("li").first().width() / 2);
                        var r = o + m;
                        var l = f.find("li").first().width() * f.find("li").length;
                        if (r + 41 < f.find("li").first().width() * f.find("li").length && 0 - o + m < 0) {
                            f.find("li").first().css("margin-left", 0 - o + m)
                        } else {
                            if (0 - o + m < 0) {
                                f.find("li").first().css("margin-left", 0 - (l - f.width()))
                            } else {
                                f.find("li").first().css("margin-left", 0)
                            }
                        }
                    }
                    p.one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", function () {
                        if (!!n.attr("data-title")) {
                            k.find(".sp-slideshow-title").html(n.data("title"))
                        } else {
                            k.find(".sp-slideshow-title").html("")
                        }
                        if (!!n.attr("data-caption")) {
                            k.find(".sp-slideshow-caption").html(n.data("caption"))
                        } else {
                            k.find(".sp-slideshow-caption").html("")
                        }
                        if (p.hasClass("last")) {
                            p.removeClass("last")
                        }
                    })
                }
            }
        })
    }
})(jQuery);
(function (a) {
    a(function () {
        a(".sp-cascade").spCascade()
    });
    a.fn.spCascade = function () {
        this.each(function () {
            var b = a(this);
            b.append('<div class="sp-cascade-col open"></div><div class="sp-cascade-col"></div><div class="sp-cascade-col"></div>');
            b.find("img").each(function () {
                var c = a(this).parent();
                b.find(".open").append(c);
                if (b.find(".open").next().hasClass("sp-cascade-col")) {
                    b.find(".open").removeClass("open").next().addClass("open")
                } else {
                    b.find(".open").removeClass("open");
                    b.find(".sp-cascade-col").first().addClass("open")
                }
            });
            a(window).on("load", function () {
                var e = b.find(".sp-cascade-col").first();
                var c = b.find(".sp-cascade-col").last();
                b.find(".sp-cascade-col").each(function () {
                    if (a(this).height() > e.height()) {
                        e = a(this)
                    }
                    if (a(this).height() < c.height()) {
                        c = a(this)
                    }
                });
                if (e !== c) {
                    var d = e.find(".sp-cascade-item").last();
                    a(e.find(".sp-cascade-item").get().reverse()).each(function () {
                        if (a(this).height() > d.height()) {
                            d = a(this)
                        }
                    });
                    c.append(d)
                }
            });
            b.find(".sp-cascade-item[data-url]").each(function () {
                var c = a(this);
                if (typeof b.attr("data-zoom") == "undefined") {
                    if (!!c.attr("data-target")) {
                        c.find("img").wrap('<a href="' + c.data("url") + '" target="' + c.data("target") + '"></a>')
                    } else {
                        c.find("img").wrap('<a href="' + c.data("url") + '"></a>')
                    }
                }
            });
            if (!!b.attr("data-zoom")) {
                b.spZoom()
            }
        })
    }
})(jQuery);
(function (a) {
    a(function () {
        a(".sp-image-grid").spImageGrid()
    });
    a.fn.spImageGrid = function () {
        this.each(function () {
            var b = a(this);
            b.find(".sp-image-grid-item[data-url]").each(function () {
                var c = a(this);
                if (typeof b.attr("data-zoom") == "undefined") {
                    if (!!c.attr("data-target")) {
                        c.find("img").wrap('<a href="' + c.data("url") + '" target="' + c.data("target") + '"></a>')
                    } else {
                        c.find("img").wrap('<a href="' + c.data("url") + '"></a>')
                    }
                }
            });
            if (!!b.attr("data-zoom")) {
                b.spZoom({
                    slide: ".sp-image-grid-item"
                })
            }
        })
    }
})(jQuery);
(function (a) {
    a(function () {
        a(".sp-resize").spResize()
    });
    a.fn.spResize = function () {
        this.each(function () {
            var d = a('<div class="sp-resizer"><iframe></iframe><iframe></iframe></div>');
            var c = a(this);
            c.append(d);
            var b;
            d.find("iframe").each(function () {
                a(this.contentWindow.window).on("resize", function () {
                    clearTimeout(b);
                    b = setTimeout(function () {
                        c[0].dispatchEvent(new CustomEvent("resize"))
                    }, 500)
                })
            })
        })
    }
})(jQuery);

function initMaps() {
    if (window.name !== "sp-editor-frame") {
        $(".sp-map-block .map-holder").each(function () {
            var d = $(this);
            var f = d.data("latlng").split(",");
            var h = parseFloat(f[0]);
            var c = parseFloat(f[1]);
            var e = parseInt(d.data("zoom"));
            var g = 591657550.5 / Math.pow(2, e + 2);
            var a = btoa([h, c]);
            var b = "https://www.google.com/maps/embed?key=AIzaSyAuFa4OnSTt1A3v21hI5eiHtpox3AyQtHI&pb=!1m7!1m2!1m1!1d" + g + "!3m3!1m2!1s0!2z" + a;
            d.append('<iframe src="' + b + '" frameborder="0"></iframe>')
        })
    }
};
(function (a) {
    a.fn.spZoom = function (b) {
        var c = {
            slide: "img"
        };
        if (typeof b !== "undefined") {
            c = a.extend({}, c, b)
        } else {
            c = a.extend({}, c)
        }
        this.each(function () {
            var e = a(this);
            if (!a(".pswp").length) {
                a('<div class="pswp" tabindex="-1" role="dialog" aria-hidden="true"><div class="pswp__bg"></div><div class="pswp__scroll-wrap"><div class="pswp__container"><div class="pswp__item"></div><div class="pswp__item"></div><div class="pswp__item"></div></div><div class="pswp__ui pswp__ui--hidden"><div class="pswp__top-bar"><div class="pswp__counter"></div><button class="pswp__button pswp__button--close" title="Close (Esc)"></button> <button class="pswp__button pswp__button--share" title="Share"></button> <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button> <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button><div class="pswp__preloader"><div class="pswp__preloader__icn"><div class="pswp__preloader__cut"><div class="pswp__preloader__donut"></div></div></div></div></div><div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap"><div class="pswp__share-tooltip"></div></div><button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button> <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button><div class="pswp__caption"><div class="pswp__caption__center"></div></div></div></div></div>').appendTo("body")
            }
            var d = new Array();
            e.find(c.slide).each(function () {
                var g = a(this);
                var m = (c.slide == "img") ? g.attr("src") : g.css("background-image").split('url("').join("").split('")').join("");
                if (m.indexOf("/assets/images/tmp") == -1 && m.indexOf("/assets/theme/") == -1) {
                    var l = m.match(/(\d+)[*×x](\d+)(?=[^\/]*$)/)[0].split("x");
                    var f = parseInt(l[0]);
                    var j = parseInt(l[1]);
                    if (f >= j) {
                        if (f > 2500) {
                            j = (j * 2500) / f;
                            f = 2500
                        }
                    } else {
                        if (j > 2500) {
                            f = (f * 2500) / j;
                            j = 2500
                        }
                    }
                    var i = m.split("_");
                    i = i[i.length - 1].split(".")[0];
                    m = m.split("_" + i + ".").join("_2500.");
                    var k = {
                        src: m,
                        w: f,
                        h: j
                    };
                    d.push(k);
                    g.data("index", d.length - 1);
                    g.addClass("zoom-in");
                    g.css("cursor", "zoom-in")
                }
            });
            e.find(c.slide).on("click", function () {
                var f = a(this).data("index");
                if (a(this).hasClass("zoom-in")) {
                    var g = new PhotoSwipe(a(".pswp")[0], PhotoSwipeUI_Default, d, {
                        bgOpacity: 0.8,
                        shareEl: false,
                        fullscreenEl: false,
                        index: f
                    });
                    g.init()
                }
            })
        })
    }
})(jQuery);
(function (b) {
    var a = {
        init: function (c) {
            return this.each(function () {
                var d = b(this);
                b(".warning").remove();
                var e = "&action=getToken";
                b.post(render_url + "/controllers/forms", e, function (f) {
                    d.append('<input type="hidden" name="ts" value="' + f.ts + '" />');
                    d.append('<input type="hidden" name="tk" value="' + f.tk + '" />');
                    d.append('<input type="hidden" name="tp" value="" />')
                });
                d.find('.sp-fieldset[data-type="website"] input').alphanum({
                    allow: "#-./:&?=%()_+!*', "
                });
                d.find('.sp-fieldset[data-type="email"] input').alphanum({
                    allow: "-./:&?=%()_+!*', @"
                });
                d.find('.sp-fieldset[data-type="number"] input').numeric({
                    allow: ".,-"
                });
                d.find('.sp-fieldset[data-type="phone"] input').mask("(000) 000-0000", {
                    placeholder: "(___) ___-____"
                });
                if (d.closest(".sp-form-block").length) {
                    d.find(".sp-button").on("click", function (i) {
                        i.preventDefault();
                        var h = b(this);
                        var g = d.parent();
                        h.addClass("disabled");
                        var k = (g.find(".sp-fieldset[data-type=email].from").length && g.find(".sp-fieldset[data-type=email].from input").val() !== "") ? g.find(".sp-fieldset[data-type=email].from input").val() : "noreply@snappages.com";
                        var f = d.spForm("validate");
                        if (Array.isArray(f)) {
                            var j = "&action=email&to=" + g.data("email") + "&subject=" + g.data("subject") + "&from=" + encodeURIComponent(k) + "&in=" + encodeURIComponent(JSON.stringify(f));
                            b.post(render_url + "/controllers/forms", j, function (l) {
                                h.removeClass("disabled");
                                if (l == "success") {
                                    d.parent().prepend('<div class="sp-notify">' + g.data("sent") + "</div>");
                                    d.hide();
                                    b("html, body").animate({
                                        scrollTop: d.parent().find(".sp-notify").offset().top - 10
                                    }, 300)
                                } else {
                                    b(".sp-blog_post_comments-block #sp-reply-holder").prepend('<div class="sp-notify">' + l + "</div>")
                                }
                            })
                        } else {
                            h.removeClass("disabled")
                        }
                    })
                }
            })
        },
        validate: function () {
            var e = b(this);
            var c = new Array();
            c.push({
                label: "Source URL",
                value: window.location.href
            });
            e.find(".sp-field-col").removeClass("error");
            e.parent().find(".sp-notify").remove();
            e.find(".sp-fieldset").each(function () {
                var h = b(this);
                var g = h.hasClass("required");
                switch (h.data("type")) {
                    case "custom":
                    case "name":
                    case "text-input":
                    case "number-input":
                    case "email":
                    case "website":
                    case "address":
                    case "textarea":
                    case "phone":
                    case "select":
                        h.find(".sp-field-col").each(function () {
                            c.push({
                                label: b(this).find("label").text(),
                                value: b(this).find("input, textarea, select").val()
                            });
                            if (g && b(this).find("input, textarea, select").val() == "") {
                                if (h.data("type") == "address" && b(this).find("input")[0] !== h.find("input:eq(1)")[0]) {
                                    b(this).addClass("error")
                                } else {
                                    if (h.data("type") !== "address") {
                                        b(this).addClass("error")
                                    }
                                }
                            }
                        });
                        break;
                    case "checkbox":
                    case "radio":
                        var f = new Array();
                        h.find("input:checked").each(function () {
                            f.push(b(this).val())
                        });
                        f = f.join(", ");
                        c.push({
                            label: h.find("label").first().text(),
                            value: f
                        });
                        if (g && f == "") {
                            h.find(".sp-field-col").addClass("error")
                        }
                        break
                }
            });
            e.find("input[type=hidden]").each(function () {
                c.push({
                    label: b(this).attr("name"),
                    value: b(this).val()
                })
            });
            if (e.find(".error").length) {
                var d = "Please fill out all required fields.";
                e.parent().prepend('<div class="sp-notify error">' + d + "<div>");
                b("html, body").animate({
                    scrollTop: e.parent().find(".sp-notify").offset().top - 10
                }, 300);
                return d
            } else {
                return c
            }
        }
    };
    b.fn.spForm = function (c) {
        if (a[c]) {
            return a[c].apply(this, Array.prototype.slice.call(arguments, 1))
        } else {
            if (typeof c === "object" || !c) {
                return a.init.apply(this, arguments)
            } else {
                b.error("Method " + c + " does not exist on spForm")
            }
        }
    }
})(jQuery);
(function (a) {
    a(function () {
        a(".sp-search-holder").spSearch()
    });
    a.fn.spSearch = function () {
        var b;
        this.each(function () {
            $this = a(this);
            $this.find("input").keypress(function (g) {
                b = a(this).closest(".sp-search-holder");
                if (g.which == 13) {
                    c = new URL(window.location.href);
                    var d;
                    if (c.origin.indexOf("://sap-") !== -1) {
                        if (!!b.attr("data-target") && b.data("target") == "media") {
                            d = "/media/search?q=" + a(this).val()
                        } else {
                            d = "/blog/search/" + a(this).val()
                        }
                        var f = {
                            handler: "internalBrowser showTabBar",
                            url: c.origin + d,
                            showBrowserControls: false
                        };
                        d = "subsplash://sap/" + btoa(JSON.stringify(f)).replace(/\+/g, "-").replace(/\//g, "_")
                    } else {
                        if (!!b.attr("data-target") && b.data("target") == "media") {
                            d = "/media/search?q=" + a(this).val()
                        } else {
                            d = "/blog/search/" + a(this).val()
                        }
                    }
                    window.location = d
                }
            });
            if ($this.find(".sp-tag-select").length) {
                var c = window.location.href;
                if (c.indexOf("/topic") !== -1) {
                    $this.find(".sp-tag-select").val("/media/topic")
                }
                if (c.indexOf("/speaker") !== -1) {
                    $this.find(".sp-tag-select").val("/media/speaker")
                }
                if (c.indexOf("/scripture") !== -1) {
                    $this.find(".sp-tag-select").val("/media/scripture")
                }
                $this.find(".sp-tag-select").on("change", function () {
                    window.location = a(this).val()
                })
            }
        })
    }
})(jQuery);
(function (a) {
    a(function () {
        a(".sp-donate-holder").spDonate()
    });
    a.fn.spDonate = function () {
        this.each(function () {
            var e = a(this);
            var f = a.deparam.querystring();
            if (typeof f.type !== "undefined") {
                e.find("select").val(f.type)
            }
            if (typeof f.amount !== "undefined") {
                e.find(".sp-donate-amount").val(f.amount)
            }
            if (typeof f.memo !== "undefined") {
                e.find(".sp-donate-memo").val(f.memo)
            }
            e.find(".sp-donate-amount").on("blur", function () {
                if (a(this).val() !== "") {
                    var h = parseFloat(a(this).val()).toFixed(2);
                    a(this).val(h);
                    var i = /^(\$)?([1-9]{1}[0-9]{0,2})(\,\d{3})*(\.\d{2})?$|^(\$)?([1-9]{1}[0-9]{0,2})(\d{3})*(\.\d{2})?$|^(0)?(\.\d{2})?$|^(\$0)?(\.\d{2})?$|^(\$\.)(\d{2})?$/g;
                    if (!i.test(a(this).val())) {
                        a(this).closest(".sp-field-col").addClass("error")
                    } else {
                        if (parseFloat(a(this).val()) >= 5) {
                            a(this).closest(".sp-field-col").removeClass("error")
                        } else {
                            a(this).closest(".sp-field-col").addClass("error")
                        }
                    }
                } else {
                    a(this).closest(".sp-field-col").addClass("error")
                }
            });
            var b = e.find(".bt-form")[0];
            var d = e.find(".bt-submit-button")[0];
            var c = "action=getToken&website_id=" + wid;
            a.post(render_url + "/controllers/donate", c, function (h) {
                braintree.client.create({
                    authorization: h
                }, function (j, i) {
                    if (j) {
                        console.error(j);
                        return
                    }
                    braintree.hostedFields.create({
                        client: i,
                        styles: {
                            input: {
                                "font-size": "14px",
                                color: "#000"
                            },
                            "input.invalid": {
                                color: "#FF7272"
                            },
                            "input.valid": {
                                color: "#9BD24C"
                            }
                        },
                        fields: {
                            number: {
                                selector: "#card-number",
                                placeholder: "4111 1111 1111 1111"
                            },
                            cvv: {
                                selector: "#cvv",
                                placeholder: "123"
                            },
                            expirationDate: {
                                selector: "#expiration-date",
                                placeholder: "10 / 2019"
                            },
                            postalCode: {
                                selector: "#postal-code",
                                placeholder: "90210"
                            }
                        }
                    }, function (l, k) {
                        if (l) {
                            console.error(l);
                            g(l.code);
                            return
                        }
                        k.on("focus", function (m) {
                            a(m.fields[m.emittedBy].container).removeClass("braintree-hosted-fields-invalid")
                        });
                        k.on("blur", function (m) {
                            if (!m.fields[m.emittedBy].isValid) {
                                a(m.fields[m.emittedBy].container).addClass("braintree-hosted-fields-invalid").removeClass("braintree-hosted-fields-valid")
                            } else {
                                a(m.fields[m.emittedBy].container).removeClass("braintree-hosted-fields-invalid").addClass("braintree-hosted-fields-valid")
                            }
                        });
                        k.on("cardTypeChange", function (m) {
                            if (m.cards.length === 1) {
                                a("#card-number").attr("data-type", m.cards[0].type);
                                if (m.cards[0].code.size === 4) {
                                    k.setPlaceholder("cvv", "1234")
                                } else {
                                    k.setPlaceholder("cvv", "123")
                                }
                            } else {
                                a("#card-number").removeAttr("data-type");
                                k.setPlaceholder("cvv", "123")
                            }
                        });
                        d.removeAttribute("disabled");
                        b.addEventListener("submit", function (n) {
                            n.preventDefault();
                            var m = /^(\$)?([1-9]{1}[0-9]{0,2})(\,\d{3})*(\.\d{2})?$|^(\$)?([1-9]{1}[0-9]{0,2})(\d{3})*(\.\d{2})?$|^(0)?(\.\d{2})?$|^(\$0)?(\.\d{2})?$|^(\$\.)(\d{2})?$/g;
                            if (!m.test(e.find(".sp-donate-amount").val())) {
                                e.find(".sp-donate-amount").closest(".sp-field-col").addClass("error");
                                g("You must enter a valid amount.")
                            } else {
                                if (parseFloat(e.find(".sp-donate-amount").val()) >= 5) {
                                    e.find(".sp-form").spForm("validate")
                                } else {
                                    e.find(".sp-donate-amount").closest(".sp-field-col").addClass("error");
                                    g("The minimum amount allowed is $5.")
                                }
                            }
                            if (!e.find(".error").length) {
                                e.find(".sp-button").addClass("disabled");
                                k.tokenize(function (w, y) {
                                    if (w) {
                                        var q = "";
                                        switch (w.code) {
                                            case "HOSTED_FIELDS_FIELDS_EMPTY":
                                                q = "All fields are empty! Please fill out the form.";
                                                break;
                                            case "HOSTED_FIELDS_FIELDS_INVALID":
                                                q = "Some fields are invalid.";
                                                break;
                                            case "HOSTED_FIELDS_FAILED_TOKENIZATION":
                                                q = "Authorization failed. Is the card valid?";
                                                break;
                                            case "HOSTED_FIELDS_TOKENIZATION_NETWORK_ERROR":
                                                q = "Network error occurred when authorizing.";
                                                break;
                                            default:
                                                q = "An error occurred."
                                        }
                                        g(q);
                                        var o = k.getState();
                                        for (var A in o.fields) {
                                            if (!o.fields[A].isValid || o.fields[A].isEmpty) {
                                                a(o.fields[A].container).addClass("braintree-hosted-fields-invalid").removeClass("braintree-hosted-fields-valid")
                                            }
                                        }
                                        e.find(".sp-button").removeClass("disabled");
                                        return
                                    }
                                    var u = e.find(".sp-donate-amount").val().split(",").join("");
                                    var x = e.find(".sp-donate-memo").val();
                                    var t = e.find('.sp-fieldset[data-type="name"] input').first().val();
                                    var z = e.find('.sp-fieldset[data-type="name"] input').last().val();
                                    var v = e.find('.sp-fieldset[data-type="email"] input').val();
                                    var p = e.find("select").val();
                                    if (p.indexOf("recurring") !== -1) {
                                        var s = p.split("-");
                                        p = s[0] + "&plan=donation-" + s[1]
                                    }
                                    var r = "action=" + p + "&website_id=" + wid + "&nonce=" + y.nonce + "&amount=" + u + "&first=" + t + "&last=" + z + "&email=" + v + "&memo=" + x;
                                    a.post(render_url + "/controllers/donate", r, function (B) {
                                        if (B == "success") {
                                            e.prepend('<div class="sp-notify">Thank you for your donation! We will email you a receipt shortly.</div>');
                                            e.find(".sp-form, .sp-fieldset, .button-holder").hide();
                                            a("html, body").animate({
                                                scrollTop: e.find(".sp-notify").offset().top - 10
                                            }, 300)
                                        } else {
                                            g(B);
                                            e.find(".sp-button").removeClass("disabled")
                                        }
                                    })
                                })
                            }
                        }, false)
                    })
                })
            });

            function g(h) {
                e.prepend('<div class="sp-notify error">' + h + "<div>");
                a("html, body").animate({
                    scrollTop: e.find(".sp-notify").offset().top - 10
                }, 300)
            }
        })
    }
})(jQuery);
(function (a) {
    a(function () {
        a(".sp-inview").spInView()
    });
    a.fn.spInView = function (b) {
        this.each(function () {
            var d = a(this);
            var c = {
                percent: 60,
                once: true,
                "class": "sp-inview"
            };
            b = (typeof b !== "undefined") ? a.extend({}, c, b) : b = a.extend({}, c);
            a(window).on("resize scroll", e);
            e();

            function e() {
                var k = Math.ceil(d.outerHeight() * (b.percent / 100));
                var i = d.offset().top + k;
                var g = i + d.outerHeight() - k;
                var f = a(window).scrollTop();
                var h = f + a(window).height();
                var j = g > f && i < h;
                if (j) {
                    if (!d.hasClass(b["class"])) {
                        d.trigger("inView");
                        d.addClass(b["class"])
                    }
                } else {
                    if (d.hasClass(b["class"]) && b.once !== true) {
                        d.trigger("outView");
                        d.removeClass(b["class"])
                    }
                }
            }
        })
    }
})(jQuery);
(function (a) {
    a(function () {
        a(".sp-subsplash_promo-block").spAppPromo()
    });
    a.fn.spAppPromo = function () {
        this.each(function () {
            var b = a(this);
            var c = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
            if (c) {
                b.find("#sp-app-download-button").attr("href", b.find('.sp-app-store-icon[data-slug="itunes"]').attr("href"))
            }
            var d = navigator.userAgent.match(/Windows Phone/i) || navigator.userAgent.match(/WPDesktop/i);
            if (d) {
                b.find("#sp-app-download-button").attr("href", b.find('.sp-app-store-icon[data-slug="windows"]').attr("href"))
            }
            b.spInView({
                once: false
            });
            b.find("#sp-app-download-button").on("click", function (g) {
                if (c || d) {} else {
                    g.preventDefault();
                    var f = a('<div id="sp-app-download-holder"><span class="h3"><h3>Download it on...</h3></span></div>');
                    b.find(".sp-app-store-icon").each(function () {
                        var e = a(this);
                        var h = a('<div class="app-store-button"><span class="text-reset"><a class="sp-button" href="' + e.attr("href") + '" target="_blank" data-padding="15" style="padding:15px;">' + e.data("title") + "</a></span></div>");
                        h.find("a").prepend(e.find("svg").clone());
                        f.append(h)
                    });
                    b.find(".sp-subsplash-holder div").first().contents().fadeOut(function () {
                        b.find(".sp-subsplash-holder div").first().empty().append(f);
                        f.fadeTo(1)
                    })
                }
            })
        })
    }
})(jQuery);
(function (a) {
    a(function () {
        a(".sp-media_list-block").spMediaList()
    });
    a.fn.spMediaList = function () {
        var b;
        this.each(function () {
            $this = a(this);
            $this.find("#view-more-button").on("click", function () {
                var d = a(this);
                b = d.closest(".sp-block").find(".sp-media-library");
                d.addClass("busy");
                b.data("page", b.data("page") + 1);
                var e = (!!b.attr("data-filter")) ? b.attr("data-filter") : "library";
                var f = (!!b.attr("data-value")) ? b.attr("data-value") : "default";
                a.post(render_url + "/controllers/subsplash", "action=getMediaItems&website_id=" + wid + "&type=" + e + "&value=" + f + "&page=" + (b.data("page") + 1) + "&limit=" + b.data("limit"), function (g) {
                    if (g.count > 0) {
                        c(g)
                    }
                })
            })
        });

        function c(d) {
            var f = d.total;
            var e = d._embedded["media-items"];
            a.each(e, function (n, j) {
                var l = new Date(j.date);
                l = l.toLocaleString("default", {
                    month: "short"
                }) + " " + l.getDate() + ", " + l.getFullYear();
                var m = "";
                var s = "";
                var r = "";
                if (typeof j._embedded.images !== "undefined") {
                    var p = j._embedded.images;
                    for (var n = 0; n < p.length; n++) {
                        var o = p[n];
                        if (o.type == "wide") {
                            m = o._links.related.href;
                            s = o.average_color_hex;
                            r = o.vibrant_color_hex
                        }
                    }
                }
                var k = new Array();
                k.push(l);
                if (j.subtitle) {
                    k.push(j.speaker)
                }
                if (j.additional_label) {
                    k.push(j.additional_label)
                }
                var h = k.join(' &nbsp;<span style="font-size:.8em;">&bullet;</span>&nbsp; ');
                var q = a('<a href="/media/' + j.short_code + "/" + j.slug + '">');
                var t = a('<div class="sp-media-list-item"></div>');
                var g = a('<div class="sp-media-thumb" style="color:' + r + ";background-color:" + s + ";background-image:url(" + m + ');"><div class="sp-media-play-overlay"></div></div>');
                var h = a('<div class="sp-media-details"><div class="sp-media-title">' + j.title + '</div><div class="sp-media-subtitle">' + h + "</div></div>");
                q.append(t);
                t.append(g);
                t.append(h);
                q.insertAfter(b.find("a").last());
                if (b.find(".sp-media-list-item").length >= f) {
                    b.closest(".sp-block").find("#view-more-button").hide()
                } else {
                    b.closest(".sp-block").find("#view-more-button").removeClass("busy")
                }
            })
        }
    }
})(jQuery);
(function (a) {
    a(function () {
        a(".sp-media_library-block").spMediaLibrary()
    });
    a.fn.spMediaLibrary = function () {
        var b;
        this.each(function () {
            $this = a(this);
            $this.find(".sp-block-content").attr("data-layout", $this.find(".sp-media-library").data("layout"));
            if ($this.find(".sp-media-library").data("layout") && $this.find(".sp-media-library").data("layout") == "slider") {
                $this.find(".sp-block-content").addClass("swiper-container").css("overflow", "visible");
                $this.find(".sp-media-library").addClass("swiper-wrapper");
                $this.find(".sp-media-item").addClass("swiper-slide");
                $this.find(".sp-block-content").append(a('<div class="swiper-button-prev"></div><div class="swiper-button-next"></div>'));
                $this.find("#view-more-button").parent().insertAfter($this.find(".sp-media-item").last()).addClass("swiper-slide").css("text-align", "left");
                $this.find("#view-more-button").css({
                    width: "auto",
                    "margin-top": "0"
                });
                var d = new Swiper($this.find(".sp-block-content")[0], {
                    freeMode: true,
                    freeModeMomentumRatio: 0.5,
                    freeModeMomentumVelocityRatio: 1,
                    navigation: {
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev"
                    },
                    breakpoints: {
                        100: {
                            slidesPerView: 2.2,
                            slidesPerGroup: 2.2,
                            spaceBetween: 8
                        },
                        640: {
                            slidesPerView: 4,
                            slidesPerGroup: 4,
                            spaceBetween: 12
                        }
                    }
                })
            }
            $this.find("#view-more-button").on("click", function () {
                var e = a(this);
                b = e.closest(".sp-block").find(".sp-media-library");
                e.addClass("busy");
                b.data("page", b.data("page") + 1);
                var f = (!!b.attr("data-source") && b.attr("data-source") == "library") ? "media-series" : "media-item";
                var i = (!!b.attr("data-filter")) ? b.attr("data-filter") : "library";
                i = (!!b.attr("data-source") && b.attr("data-source") == "series") ? "media_series" : i;
                var h = (!!b.attr("data-value")) ? b.attr("data-value") : "default";
                var g = "";
                if (b.attr("data-source") == "library") {
                    g = "action=getMediaSeries&website_id=" + wid + "&page=" + b.data("page") + "&limit=" + b.data("limit")
                } else {
                    if (b.attr("data-source") == "list") {
                        g = "action=getListMedia&website_id=" + wid + "&id=" + h + "&page=" + b.data("page") + "&limit=" + b.data("limit")
                    } else {
                        g = "action=getMediaItems&website_id=" + wid + "&method=" + i + "&value=" + h + "&page=" + b.data("page") + "&limit=" + b.data("limit")
                    }
                }
                a.post(render_url + "/controllers/subsplash", g, function (j) {
                    if (j.count > 0) {
                        c(j, b.attr("data-source"))
                    }
                })
            })
        });

        function c(f, e) {
            var g = f.total;
            var d = (e == "library") ? f._embedded["media-series"] : f._embedded["media-items"];
            switch (e) {
                case "library":
                    d = f._embedded["media-series"];
                    break;
                case "list":
                    d = f._embedded["list-rows"];
                    break;
                default:
                    d = f._embedded["media-items"];
                    break
            }
            a.each(d, function (q, x) {
                var r = (e == "library") ? "media-series" : "media-item";
                if (e == "list") {
                    r = x.type;
                    r = r.split("live-").join("");
                    x = x._embedded[r]
                }
                var m = "";
                if (typeof x.date !== "undefined") {
                    m = new Date(x.date);
                    m = m.toLocaleString("default", {
                        month: "short"
                    }) + " " + m.getDate() + ", " + m.getFullYear()
                }
                var n = "";
                var w = "";
                var v = "";
                if (typeof x._embedded.images !== "undefined") {
                    var s = x._embedded.images;
                    for (var q = 0; q < s.length; q++) {
                        var p = s[q];
                        var l = ($this.find(".sp-media-library").data("layout") == "list") ? "square" : "wide";
                        if (p.type == l) {
                            n = p._links.related.href;
                            w = p.average_color_hex;
                            v = p.vibrant_color_hex
                        }
                    }
                }
                x.subtitle = (!!x.subtitle) ? x.subtitle : "";
                var t = (r == "media-series") ? "/media/series/" + x.short_code + "/" + x.slug : "/media/" + x.short_code + "/" + x.slug;
                if (window.location.href.indexOf("://sap-") !== -1) {
                    t = window.location.href + t;
                    var o = {
                        handler: "internalBrowser showTabBar",
                        url: t,
                        showBrowserControls: false
                    };
                    t = "subsplash://sap/" + btoa(JSON.stringify(o)).split("+/").join("-_")
                }
                var u = a('<a class="sp-media-item" href="' + t + '">');
                var j = a('<div class="sp-media-thumb" style="color:' + v + ";background-color:" + w + ";background-image:url(" + n + ');"></div>');
                var h = a('<div class="sp-media-title">' + x.title + '</div><div class="sp-media-subtitle">' + x.subtitle + "</div>");
                u.append(j);
                u.append(h);
                if (r == "media-item") {
                    j.append('<div class="sp-media-play-overlay"></div>');
                    var k = new Array();
                    k.push(m);
                    if (x.speaker) {
                        k.push(x.speaker)
                    }
                    if (x.additional_label) {
                        k.push(x.additional_label)
                    }
                    u.find(".sp-media-subtitle").html(k.join(' &nbsp;<span style="font-size:.8em;">&bullet;</span>&nbsp; '))
                }
                u.insertAfter(b.find("a").last());
                if (b.find(".sp-media-item").length >= g || $this.find(".sp-media-library").data("pagination") == "false" || $this.find(".sp-media-library").data("pagination") == "index") {
                    b.closest(".sp-block").find("#view-more-button").hide()
                } else {
                    b.closest(".sp-block").find("#view-more-button").removeClass("busy")
                }
                if ($this.find(".sp-media-library").data("layout") && $this.find(".sp-media-library").data("layout") == "slider") {
                    u.addClass("swiper-slide");
                    b.closest(".sp-block").find(".swiper-container")[0].swiper.update();
                    b.closest("#view-more-button").parent().insertAfter(b.closest(".sp-block").find(".sp-media-item").last())
                }
            })
        }
    }
})(jQuery);
(function (a) {
    a(function () {
        var c = (window.name === "sp-editor-frame") ? true : false;
        var d = (window.name === "sp-preview-frame") ? true : false;
        var b = 0;
        a.post(render_url + "/controllers/website", "action=getAnnouncement&website_id=" + wid, function (m) {
            if (m !== "none" && !c && !d) {
                if (document.cookie.indexOf("sp_announcement_" + m.id) == -1) {
                    a("#sp-wrapper").prepend('<div id="sp-announcement-banner" style="background-color:' + m.color + ';"><div class="sp-announcement-content">' + m.content + "</div></div>");
                    if (m.dismiss == true) {
                        a("#sp-announcement-banner").append('<div class="sp-announcement-close"><i class="fa fa-times"></i></div>')
                    }
                    a("#sp-announcement-banner i.fa").on("click", function () {
                        document.cookie = "sp_announcement_" + m.id + "=hide";
                        a("#sp-announcement-banner").slideUp("fast")
                    });
                    if (m.content.indexOf("live|") !== -1) {
                        b = m.content.split("|")[1];
                        var e = (m.content.split("|")[2] == "default") ? "/media/live" : m.content.split("|")[2];
                        if (window.location.href.indexOf("://sap-") !== -1 && e.charAt(0) == "/") {
                            e = window.location.href + e;
                            var k = {
                                handler: "internalBrowser showTabBar",
                                url: e,
                                showBrowserControls: false
                            };
                            e = "subsplash://sap/" + btoa(JSON.stringify(k)).split("+/").join("-_")
                        }
                        var p = (m.content.split("|")[2] == "default") ? '<a href="' + e + '" style="font-weight:400;">watch now</a>' : '<a href="' + e + '" target="_blank" style="font-weight:400;">watch now</a>';
                        a(".sp-announcement-content").html('<span style="color:red;">&#9679;</span>&nbsp; Live broadcast starts in ');
                        var i = a('<span class="sp-announcement-countdown"></span>').appendTo(a(".sp-announcement-content")),
                            n = moment(b).unix(),
                            g = moment().unix(),
                            r = n - g,
                            j = moment.duration(r * 1000, "milliseconds"),
                            h = 1000;
                        if (r > 0) {
                            var f = a('<span class="days" ></span>').appendTo(i),
                                s = a('<span class="hours" ></span>').appendTo(i),
                                o = a('<span class="minutes" ></span>').appendTo(i),
                                l = a('<span class="seconds" ></span>').appendTo(i);
                            var q = setInterval(function () {
                                j = moment.duration(j.asMilliseconds() - h, "milliseconds");
                                var w = moment.duration(j).days(),
                                    v = moment.duration(j).hours(),
                                    t = moment.duration(j).minutes(),
                                    u = moment.duration(j).seconds();
                                if (u < 0) {
                                    clearTimeout(q);
                                    a(".sp-announcement-content").html('<span style="color:red;">&#9679;</span>&nbsp; Live broadcasting - ' + p)
                                } else {
                                    w = a.trim(w).length === 1 ? "0" + w : w;
                                    v = a.trim(v).length === 1 ? "0" + v : v;
                                    t = a.trim(t).length === 1 ? "0" + t : t;
                                    u = a.trim(u).length === 1 ? "0" + u : u;
                                    if (w !== "00") {
                                        f.text(w + ":")
                                    } else {
                                        f.text("")
                                    }
                                    if (v !== "00") {
                                        s.text(v + ":")
                                    } else {
                                        s.text("")
                                    }
                                    if (t !== "00") {
                                        o.text(t + ":")
                                    } else {
                                        o.text("")
                                    }
                                    l.html(u + " - " + p)
                                }
                            }, h)
                        } else {
                            a(".sp-announcement-content").html('<span style="color:red;">&#9679;</span>&nbsp; Live broadcasting - ' + p)
                        }
                    }
                    setTimeout(function () {
                        a("#sp-announcement-banner").css("display", "flex")
                    }, 1000)
                }
            }
        })
    })
})(jQuery);
(function (a) {
    a(function () {
        var b = (window.name === "sp-editor-frame") ? true : false;
        document.addEventListener("blockAdded", function () {
            setTimeout(function () {
                c()
            }, 200)
        });

        function c() {
            a(".sp-image-block:not(.init)").each(function () {
                var h = a(this);
                var g = h.find(".sp-image-holder");
                if (h.find(".sp-resizer")) {
                    h.find(".sp-resizer").remove()
                }
                g.spResize();
                g.on("resize", function () {
                    d();
                    f()
                });
                h.on("mobileMove", function () {
                    h.find(".sp-resizer").remove();
                    g.spResize()
                });

                function f() {
                    if (g.css("background-image").indexOf("/assets/images/tmp") == -1 && g.css("background-image").indexOf("/assets/theme/") == -1 && g.css("background-image").indexOf(".svg") == -1 && g.css("background-image").indexOf("data:") == -1) {
                        var i = (window.devicePixelRatio > 1) ? g.getHiddenDimensions().width * 1.4 : g.getHiddenDimensions().width;
                        var m = g.css("background-image");
                        var l = /\/([0-9].*)_(.*)(?=\x)/g.exec(g.data("source"))[1];
                        var j = parseInt(m.match(/(?!.*_)(.*)(?=\.)/g)[0]);
                        var k = j;
                        if (j < i && j !== 2500) {
                            k = (i > 1000) ? 2500 : 1000
                        }
                        if (k > j && j <= l) {
                            g.css("background-image", m.split("_" + j + ".").join("_" + k + "."))
                        }
                    }
                }
                h.on("textChange moved", d);
                h[0].addEventListener("textChange", d);

                function d() {
                    a().spString.fitText(h.find(".sp-image-title"), {
                        fitTo: h.find(".sp-image-holder"),
                        maxSize: h.find(".sp-image-holder").getHiddenDimensions().outerWidth / 10
                    });
                    a().spString.fitText(h.find(".sp-image-caption"), {
                        fitTo: h.find(".sp-image-holder")
                    })
                }
                if (h.find("img").length) {
                    var e = h.find("img")[0];
                    if (e.complete) {
                        setTimeout(function () {
                            d();
                            f()
                        }, 1000)
                    } else {
                        e.onload = function () {
                            d();
                            f()
                        }
                    }
                }
                h.addClass("init")
            })
        }
        c();
        if (a('.sp-image-holder[data-zoom="true"]').length) {
            a('.sp-image-holder[data-zoom="true"]').spZoom()
        }
    })
})(jQuery);
var wid = 34425,
            pid = 501751,
            ptype = 'basic',
            tid = 43583,
            custom_fonts = "Berkshire Swash:regular|Bitter:regular,italic,700|Open Sans:300,300italic,regular,italic,600,600italic,700,700italic,800,800italic";