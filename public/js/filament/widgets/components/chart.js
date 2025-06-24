function Ft() {}
const Io = (function () {
    let i = 0;
    return function () {
        return i++;
    };
})();
function P(i) {
    return i === null || typeof i > "u";
}
function B(i) {
    if (Array.isArray && Array.isArray(i)) return !0;
    const t = Object.prototype.toString.call(i);
    return t.slice(0, 7) === "[object" && t.slice(-6) === "Array]";
}
function F(i) {
    return (
        i !== null && Object.prototype.toString.call(i) === "[object Object]"
    );
}
const q = (i) => (typeof i === "number" || i instanceof Number) && isFinite(+i);
function ft(i, t) {
    return q(i) ? i : t;
}
function E(i, t) {
    return typeof i > "u" ? t : i;
}
const Co = (i, t) =>
    typeof i === "string" && i.endsWith("%") ? parseFloat(i) / 100 : i / t;
const Tn = (i, t) =>
    typeof i === "string" && i.endsWith("%") ? (parseFloat(i) / 100) * t : +i;
function $(i, t, e) {
    if (i && typeof i.call === "function") return i.apply(e, t);
}
function V(i, t, e, s) {
    let n, r, o;
    if (B(i)) {
        if (((r = i.length), s)) {
            for (n = r - 1; n >= 0; n--) t.call(e, i[n], n);
        } else for (n = 0; n < r; n++) t.call(e, i[n], n);
    } else if (F(i)) {
        for (o = Object.keys(i), r = o.length, n = 0; n < r; n++) {
            t.call(e, i[o[n]], o[n]);
        }
    }
}
function xi(i, t) {
    let e, s, n, r;
    if (!i || !t || i.length !== t.length) return !1;
    for (e = 0, s = i.length; e < s; ++e) {
        if (
            ((n = i[e]),
            (r = t[e]),
            n.datasetIndex !== r.datasetIndex || n.index !== r.index)
        ) {
            return !1;
        }
    }
    return !0;
}
function Ss(i) {
    if (B(i)) return i.map(Ss);
    if (F(i)) {
        const t = Object.create(null);
        const e = Object.keys(i);
        const s = e.length;
        let n = 0;
        for (; n < s; ++n) t[e[n]] = Ss(i[e[n]]);
        return t;
    }
    return i;
}
function Fo(i) {
    return ["__proto__", "prototype", "constructor"].indexOf(i) === -1;
}
function Cc(i, t, e, s) {
    if (!Fo(i)) return;
    const n = t[i];
    const r = e[i];
    F(n) && F(r) ? Ce(n, r, s) : (t[i] = Ss(r));
}
function Ce(i, t, e) {
    const s = B(t) ? t : [t];
    const n = s.length;
    if (!F(i)) return i;
    e = e || {};
    const r = e.merger || Cc;
    for (let o = 0; o < n; ++o) {
        if (((t = s[o]), !F(t))) continue;
        const a = Object.keys(t);
        for (let l = 0, c = a.length; l < c; ++l) r(a[l], i, t, e);
    }
    return i;
}
function Le(i, t) {
    return Ce(i, t, { merger: Fc });
}
function Fc(i, t, e) {
    if (!Fo(i)) return;
    const s = t[i];
    const n = e[i];
    F(s) && F(n)
        ? Le(s, n)
        : Object.prototype.hasOwnProperty.call(t, i) || (t[i] = Ss(n));
}
const po = { "": (i) => i, x: (i) => i.x, y: (i) => i.y };
function Vt(i, t) {
    return (po[t] || (po[t] = Ac(t)))(i);
}
function Ac(i) {
    const t = Lc(i);
    return (e) => {
        for (const s of t) {
            if (s === "") break;
            e = e && e[s];
        }
        return e;
    };
}
function Lc(i) {
    const t = i.split(".");
    const e = [];
    let s = "";
    for (const n of t) {
        (s += n),
            s.endsWith("\\")
                ? (s = s.slice(0, -1) + ".")
                : (e.push(s), (s = ""));
    }
    return e;
}
function vs(i) {
    return i.charAt(0).toUpperCase() + i.slice(1);
}
const dt = (i) => typeof i < "u";
const zt = (i) => typeof i === "function";
const vn = (i, t) => {
    if (i.size !== t.size) return !1;
    for (const e of i) if (!t.has(e)) return !1;
    return !0;
};
function Ao(i) {
    return (
        i.type === "mouseup" || i.type === "click" || i.type === "contextmenu"
    );
}
const j = Math.PI;
const H = 2 * j;
const Pc = H + j;
const ks = Number.POSITIVE_INFINITY;
const Nc = j / 180;
const U = j / 2;
const gi = j / 4;
const yo = (j * 2) / 3;
const mt = Math.log10;
const Mt = Math.sign;
function On(i) {
    const t = Math.round(i);
    i = Pe(i, t, i / 1e3) ? t : i;
    const e = Math.pow(10, Math.floor(mt(i)));
    const s = i / e;
    return (s <= 1 ? 1 : s <= 2 ? 2 : s <= 5 ? 5 : 10) * e;
}
function Lo(i) {
    const t = [];
    const e = Math.sqrt(i);
    let s;
    for (s = 1; s < e; s++) i % s === 0 && (t.push(s), t.push(i / s));
    return e === (e | 0) && t.push(e), t.sort((n, r) => n - r).pop(), t;
}
function ge(i) {
    return !isNaN(parseFloat(i)) && isFinite(i);
}
function Pe(i, t, e) {
    return Math.abs(i - t) < e;
}
function Po(i, t) {
    const e = Math.round(i);
    return e - t <= i && e + t >= i;
}
function Dn(i, t, e) {
    let s, n, r;
    for (s = 0, n = i.length; s < n; s++) {
        (r = i[s][e]),
            isNaN(r) ||
                ((t.min = Math.min(t.min, r)), (t.max = Math.max(t.max, r)));
    }
}
function _t(i) {
    return i * (j / 180);
}
function Os(i) {
    return i * (180 / j);
}
function En(i) {
    if (!q(i)) return;
    let t = 1;
    let e = 0;
    for (; Math.round(i * t) / t !== i; ) (t *= 10), e++;
    return e;
}
function In(i, t) {
    const e = t.x - i.x;
    const s = t.y - i.y;
    const n = Math.sqrt(e * e + s * s);
    let r = Math.atan2(s, e);
    return r < -0.5 * j && (r += H), { angle: r, distance: n };
}
function Ms(i, t) {
    return Math.sqrt(Math.pow(t.x - i.x, 2) + Math.pow(t.y - i.y, 2));
}
function Rc(i, t) {
    return ((i - t + Pc) % H) - j;
}
function ct(i) {
    return ((i % H) + H) % H;
}
function Ne(i, t, e, s) {
    const n = ct(i);
    const r = ct(t);
    const o = ct(e);
    const a = ct(r - n);
    const l = ct(o - n);
    const c = ct(n - r);
    const h = ct(n - o);
    return n === r || n === o || (s && r === o) || (a > l && c < h);
}
function tt(i, t, e) {
    return Math.max(t, Math.min(e, i));
}
function No(i) {
    return tt(i, -32768, 32767);
}
function At(i, t, e, s = 1e-6) {
    return i >= Math.min(t, e) - s && i <= Math.max(t, e) + s;
}
function Ds(i, t, e) {
    e = e || ((o) => i[o] < t);
    let s = i.length - 1;
    let n = 0;
    let r;
    for (; s - n > 1; ) (r = (n + s) >> 1), e(r) ? (n = r) : (s = r);
    return { lo: n, hi: s };
}
const Ct = (i, t, e, s) =>
    Ds(i, e, s ? (n) => i[n][t] <= e : (n) => i[n][t] < e);
const Ro = (i, t, e) => Ds(i, e, (s) => i[s][t] >= e);
function Wo(i, t, e) {
    let s = 0;
    let n = i.length;
    for (; s < n && i[s] < t; ) s++;
    for (; n > s && i[n - 1] > e; ) n--;
    return s > 0 || n < i.length ? i.slice(s, n) : i;
}
const zo = ["push", "pop", "shift", "splice", "unshift"];
function Vo(i, t) {
    if (i._chartjs) {
        i._chartjs.listeners.push(t);
        return;
    }
    Object.defineProperty(i, "_chartjs", {
        configurable: !0,
        enumerable: !1,
        value: { listeners: [t] },
    }),
        zo.forEach((e) => {
            const s = "_onData" + vs(e);
            const n = i[e];
            Object.defineProperty(i, e, {
                configurable: !0,
                enumerable: !1,
                value(...r) {
                    const o = n.apply(this, r);
                    return (
                        i._chartjs.listeners.forEach((a) => {
                            typeof a[s] === "function" && a[s](...r);
                        }),
                        o
                    );
                },
            });
        });
}
function Cn(i, t) {
    const e = i._chartjs;
    if (!e) return;
    const s = e.listeners;
    const n = s.indexOf(t);
    n !== -1 && s.splice(n, 1),
        !(s.length > 0) &&
            (zo.forEach((r) => {
                delete i[r];
            }),
            delete i._chartjs);
}
function Fn(i) {
    const t = new Set();
    let e;
    let s;
    for (e = 0, s = i.length; e < s; ++e) t.add(i[e]);
    return t.size === s ? i : Array.from(t);
}
const An = (function () {
    return typeof window > "u"
        ? function (i) {
              return i();
          }
        : window.requestAnimationFrame;
})();
function Ln(i, t, e) {
    const s = e || ((o) => Array.prototype.slice.call(o));
    let n = !1;
    let r = [];
    return function (...o) {
        (r = s(o)),
            n ||
                ((n = !0),
                An.call(window, () => {
                    (n = !1), i.apply(t, r);
                }));
    };
}
function Ho(i, t) {
    let e;
    return function (...s) {
        return (
            t ? (clearTimeout(e), (e = setTimeout(i, t, s))) : i.apply(this, s),
            t
        );
    };
}
const Es = (i) => (i === "start" ? "left" : i === "end" ? "right" : "center");
const nt = (i, t, e) => (i === "start" ? t : i === "end" ? e : (t + e) / 2);
const Bo = (i, t, e, s) =>
    i === (s ? "left" : "right") ? e : i === "center" ? (t + e) / 2 : t;
function Pn(i, t, e) {
    const s = t.length;
    let n = 0;
    let r = s;
    if (i._sorted) {
        const { iScale: o, _parsed: a } = i;
        const l = o.axis;
        const {
            min: c,
            max: h,
            minDefined: u,
            maxDefined: d,
        } = o.getUserBounds();
        u &&
            (n = tt(
                Math.min(
                    Ct(a, o.axis, c).lo,
                    e ? s : Ct(t, l, o.getPixelForValue(c)).lo,
                ),
                0,
                s - 1,
            )),
            d
                ? (r =
                      tt(
                          Math.max(
                              Ct(a, o.axis, h, !0).hi + 1,
                              e
                                  ? 0
                                  : Ct(t, l, o.getPixelForValue(h), !0).hi + 1,
                          ),
                          n,
                          s,
                      ) - n)
                : (r = s - n);
    }
    return { start: n, count: r };
}
function Nn(i) {
    const { xScale: t, yScale: e, _scaleRanges: s } = i;
    const n = { xmin: t.min, xmax: t.max, ymin: e.min, ymax: e.max };
    if (!s) return (i._scaleRanges = n), !0;
    const r =
        s.xmin !== t.min ||
        s.xmax !== t.max ||
        s.ymin !== e.min ||
        s.ymax !== e.max;
    return Object.assign(s, n), r;
}
const ys = (i) => i === 0 || i === 1;
const bo = (i, t, e) =>
    -(Math.pow(2, 10 * (i -= 1)) * Math.sin(((i - t) * H) / e));
const xo = (i, t, e) => Math.pow(2, -10 * i) * Math.sin(((i - t) * H) / e) + 1;
var Ie = {
    linear: (i) => i,
    easeInQuad: (i) => i * i,
    easeOutQuad: (i) => -i * (i - 2),
    easeInOutQuad: (i) =>
        (i /= 0.5) < 1 ? 0.5 * i * i : -0.5 * (--i * (i - 2) - 1),
    easeInCubic: (i) => i * i * i,
    easeOutCubic: (i) => (i -= 1) * i * i + 1,
    easeInOutCubic: (i) =>
        (i /= 0.5) < 1 ? 0.5 * i * i * i : 0.5 * ((i -= 2) * i * i + 2),
    easeInQuart: (i) => i * i * i * i,
    easeOutQuart: (i) => -((i -= 1) * i * i * i - 1),
    easeInOutQuart: (i) =>
        (i /= 0.5) < 1
            ? 0.5 * i * i * i * i
            : -0.5 * ((i -= 2) * i * i * i - 2),
    easeInQuint: (i) => i * i * i * i * i,
    easeOutQuint: (i) => (i -= 1) * i * i * i * i + 1,
    easeInOutQuint: (i) =>
        (i /= 0.5) < 1
            ? 0.5 * i * i * i * i * i
            : 0.5 * ((i -= 2) * i * i * i * i + 2),
    easeInSine: (i) => -Math.cos(i * U) + 1,
    easeOutSine: (i) => Math.sin(i * U),
    easeInOutSine: (i) => -0.5 * (Math.cos(j * i) - 1),
    easeInExpo: (i) => (i === 0 ? 0 : Math.pow(2, 10 * (i - 1))),
    easeOutExpo: (i) => (i === 1 ? 1 : -Math.pow(2, -10 * i) + 1),
    easeInOutExpo: (i) =>
        ys(i)
            ? i
            : i < 0.5
              ? 0.5 * Math.pow(2, 10 * (i * 2 - 1))
              : 0.5 * (-Math.pow(2, -10 * (i * 2 - 1)) + 2),
    easeInCirc: (i) => (i >= 1 ? i : -(Math.sqrt(1 - i * i) - 1)),
    easeOutCirc: (i) => Math.sqrt(1 - (i -= 1) * i),
    easeInOutCirc: (i) =>
        (i /= 0.5) < 1
            ? -0.5 * (Math.sqrt(1 - i * i) - 1)
            : 0.5 * (Math.sqrt(1 - (i -= 2) * i) + 1),
    easeInElastic: (i) => (ys(i) ? i : bo(i, 0.075, 0.3)),
    easeOutElastic: (i) => (ys(i) ? i : xo(i, 0.075, 0.3)),
    easeInOutElastic(i) {
        return ys(i)
            ? i
            : i < 0.5
              ? 0.5 * bo(i * 2, 0.1125, 0.45)
              : 0.5 + 0.5 * xo(i * 2 - 1, 0.1125, 0.45);
    },
    easeInBack(i) {
        return i * i * ((1.70158 + 1) * i - 1.70158);
    },
    easeOutBack(i) {
        return (i -= 1) * i * ((1.70158 + 1) * i + 1.70158) + 1;
    },
    easeInOutBack(i) {
        let t = 1.70158;
        return (i /= 0.5) < 1
            ? 0.5 * (i * i * (((t *= 1.525) + 1) * i - t))
            : 0.5 * ((i -= 2) * i * (((t *= 1.525) + 1) * i + t) + 2);
    },
    easeInBounce: (i) => 1 - Ie.easeOutBounce(1 - i),
    easeOutBounce(i) {
        return i < 1 / 2.75
            ? 7.5625 * i * i
            : i < 2 / 2.75
              ? 7.5625 * (i -= 1.5 / 2.75) * i + 0.75
              : i < 2.5 / 2.75
                ? 7.5625 * (i -= 2.25 / 2.75) * i + 0.9375
                : 7.5625 * (i -= 2.625 / 2.75) * i + 0.984375;
    },
    easeInOutBounce: (i) =>
        i < 0.5
            ? Ie.easeInBounce(i * 2) * 0.5
            : Ie.easeOutBounce(i * 2 - 1) * 0.5 + 0.5,
};
function _i(i) {
    return (i + 0.5) | 0;
}
const Gt = (i, t, e) => Math.max(Math.min(i, e), t);
function pi(i) {
    return Gt(_i(i * 2.55), 0, 255);
}
function Xt(i) {
    return Gt(_i(i * 255), 0, 255);
}
function Wt(i) {
    return Gt(_i(i / 2.55) / 100, 0, 1);
}
function _o(i) {
    return Gt(_i(i * 100), 0, 100);
}
const xt = {
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    A: 10,
    B: 11,
    C: 12,
    D: 13,
    E: 14,
    F: 15,
    a: 10,
    b: 11,
    c: 12,
    d: 13,
    e: 14,
    f: 15,
};
const Sn = [..."0123456789ABCDEF"];
const Wc = (i) => Sn[i & 15];
const zc = (i) => Sn[(i & 240) >> 4] + Sn[i & 15];
const bs = (i) => (i & 240) >> 4 === (i & 15);
const Vc = (i) => bs(i.r) && bs(i.g) && bs(i.b) && bs(i.a);
function Hc(i) {
    const t = i.length;
    let e;
    return (
        i[0] === "#" &&
            (t === 4 || t === 5
                ? (e = {
                      r: 255 & (xt[i[1]] * 17),
                      g: 255 & (xt[i[2]] * 17),
                      b: 255 & (xt[i[3]] * 17),
                      a: t === 5 ? xt[i[4]] * 17 : 255,
                  })
                : (t === 7 || t === 9) &&
                  (e = {
                      r: (xt[i[1]] << 4) | xt[i[2]],
                      g: (xt[i[3]] << 4) | xt[i[4]],
                      b: (xt[i[5]] << 4) | xt[i[6]],
                      a: t === 9 ? (xt[i[7]] << 4) | xt[i[8]] : 255,
                  })),
        e
    );
}
const Bc = (i, t) => (i < 255 ? t(i) : "");
function $c(i) {
    const t = Vc(i) ? Wc : zc;
    return i ? "#" + t(i.r) + t(i.g) + t(i.b) + Bc(i.a, t) : void 0;
}
const jc =
    /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
function $o(i, t, e) {
    const s = t * Math.min(e, 1 - e);
    const n = (r, o = (r + i / 30) % 12) =>
        e - s * Math.max(Math.min(o - 3, 9 - o, 1), -1);
    return [n(0), n(8), n(4)];
}
function Uc(i, t, e) {
    const s = (n, r = (n + i / 60) % 6) =>
        e - e * t * Math.max(Math.min(r, 4 - r, 1), 0);
    return [s(5), s(3), s(1)];
}
function Yc(i, t, e) {
    const s = $o(i, 1, 0.5);
    let n;
    for (
        t + e > 1 && ((n = 1 / (t + e)), (t *= n), (e *= n)), n = 0;
        n < 3;
        n++
    ) {
        (s[n] *= 1 - t - e), (s[n] += t);
    }
    return s;
}
function Zc(i, t, e, s, n) {
    return i === n
        ? (t - e) / s + (t < e ? 6 : 0)
        : t === n
          ? (e - i) / s + 2
          : (i - t) / s + 4;
}
function Rn(i) {
    const e = i.r / 255;
    const s = i.g / 255;
    const n = i.b / 255;
    const r = Math.max(e, s, n);
    const o = Math.min(e, s, n);
    const a = (r + o) / 2;
    let l;
    let c;
    let h;
    return (
        r !== o &&
            ((h = r - o),
            (c = a > 0.5 ? h / (2 - r - o) : h / (r + o)),
            (l = Zc(e, s, n, h, r)),
            (l = l * 60 + 0.5)),
        [l | 0, c || 0, a]
    );
}
function Wn(i, t, e, s) {
    return (Array.isArray(t) ? i(t[0], t[1], t[2]) : i(t, e, s)).map(Xt);
}
function zn(i, t, e) {
    return Wn($o, i, t, e);
}
function qc(i, t, e) {
    return Wn(Yc, i, t, e);
}
function Gc(i, t, e) {
    return Wn(Uc, i, t, e);
}
function jo(i) {
    return ((i % 360) + 360) % 360;
}
function Xc(i) {
    const t = jc.exec(i);
    let e = 255;
    let s;
    if (!t) return;
    t[5] !== s && (e = t[6] ? pi(+t[5]) : Xt(+t[5]));
    const n = jo(+t[2]);
    const r = +t[3] / 100;
    const o = +t[4] / 100;
    return (
        t[1] === "hwb"
            ? (s = qc(n, r, o))
            : t[1] === "hsv"
              ? (s = Gc(n, r, o))
              : (s = zn(n, r, o)),
        { r: s[0], g: s[1], b: s[2], a: e }
    );
}
function Kc(i, t) {
    let e = Rn(i);
    (e[0] = jo(e[0] + t)),
        (e = zn(e)),
        (i.r = e[0]),
        (i.g = e[1]),
        (i.b = e[2]);
}
function Jc(i) {
    if (!i) return;
    const t = Rn(i);
    const e = t[0];
    const s = _o(t[1]);
    const n = _o(t[2]);
    return i.a < 255
        ? `hsla(${e}, ${s}%, ${n}%, ${Wt(i.a)})`
        : `hsl(${e}, ${s}%, ${n}%)`;
}
const wo = {
    x: "dark",
    Z: "light",
    Y: "re",
    X: "blu",
    W: "gr",
    V: "medium",
    U: "slate",
    A: "ee",
    T: "ol",
    S: "or",
    B: "ra",
    C: "lateg",
    D: "ights",
    R: "in",
    Q: "turquois",
    E: "hi",
    P: "ro",
    O: "al",
    N: "le",
    M: "de",
    L: "yello",
    F: "en",
    K: "ch",
    G: "arks",
    H: "ea",
    I: "ightg",
    J: "wh",
};
const So = {
    OiceXe: "f0f8ff",
    antiquewEte: "faebd7",
    aqua: "ffff",
    aquamarRe: "7fffd4",
    azuY: "f0ffff",
    beige: "f5f5dc",
    bisque: "ffe4c4",
    black: "0",
    blanKedOmond: "ffebcd",
    Xe: "ff",
    XeviTet: "8a2be2",
    bPwn: "a52a2a",
    burlywood: "deb887",
    caMtXe: "5f9ea0",
    KartYuse: "7fff00",
    KocTate: "d2691e",
    cSO: "ff7f50",
    cSnflowerXe: "6495ed",
    cSnsilk: "fff8dc",
    crimson: "dc143c",
    cyan: "ffff",
    xXe: "8b",
    xcyan: "8b8b",
    xgTMnPd: "b8860b",
    xWay: "a9a9a9",
    xgYF: "6400",
    xgYy: "a9a9a9",
    xkhaki: "bdb76b",
    xmagFta: "8b008b",
    xTivegYF: "556b2f",
    xSange: "ff8c00",
    xScEd: "9932cc",
    xYd: "8b0000",
    xsOmon: "e9967a",
    xsHgYF: "8fbc8f",
    xUXe: "483d8b",
    xUWay: "2f4f4f",
    xUgYy: "2f4f4f",
    xQe: "ced1",
    xviTet: "9400d3",
    dAppRk: "ff1493",
    dApskyXe: "bfff",
    dimWay: "696969",
    dimgYy: "696969",
    dodgerXe: "1e90ff",
    fiYbrick: "b22222",
    flSOwEte: "fffaf0",
    foYstWAn: "228b22",
    fuKsia: "ff00ff",
    gaRsbSo: "dcdcdc",
    ghostwEte: "f8f8ff",
    gTd: "ffd700",
    gTMnPd: "daa520",
    Way: "808080",
    gYF: "8000",
    gYFLw: "adff2f",
    gYy: "808080",
    honeyMw: "f0fff0",
    hotpRk: "ff69b4",
    RdianYd: "cd5c5c",
    Rdigo: "4b0082",
    ivSy: "fffff0",
    khaki: "f0e68c",
    lavFMr: "e6e6fa",
    lavFMrXsh: "fff0f5",
    lawngYF: "7cfc00",
    NmoncEffon: "fffacd",
    ZXe: "add8e6",
    ZcSO: "f08080",
    Zcyan: "e0ffff",
    ZgTMnPdLw: "fafad2",
    ZWay: "d3d3d3",
    ZgYF: "90ee90",
    ZgYy: "d3d3d3",
    ZpRk: "ffb6c1",
    ZsOmon: "ffa07a",
    ZsHgYF: "20b2aa",
    ZskyXe: "87cefa",
    ZUWay: "778899",
    ZUgYy: "778899",
    ZstAlXe: "b0c4de",
    ZLw: "ffffe0",
    lime: "ff00",
    limegYF: "32cd32",
    lRF: "faf0e6",
    magFta: "ff00ff",
    maPon: "800000",
    VaquamarRe: "66cdaa",
    VXe: "cd",
    VScEd: "ba55d3",
    VpurpN: "9370db",
    VsHgYF: "3cb371",
    VUXe: "7b68ee",
    VsprRggYF: "fa9a",
    VQe: "48d1cc",
    VviTetYd: "c71585",
    midnightXe: "191970",
    mRtcYam: "f5fffa",
    mistyPse: "ffe4e1",
    moccasR: "ffe4b5",
    navajowEte: "ffdead",
    navy: "80",
    Tdlace: "fdf5e6",
    Tive: "808000",
    TivedBb: "6b8e23",
    Sange: "ffa500",
    SangeYd: "ff4500",
    ScEd: "da70d6",
    pOegTMnPd: "eee8aa",
    pOegYF: "98fb98",
    pOeQe: "afeeee",
    pOeviTetYd: "db7093",
    papayawEp: "ffefd5",
    pHKpuff: "ffdab9",
    peru: "cd853f",
    pRk: "ffc0cb",
    plum: "dda0dd",
    powMrXe: "b0e0e6",
    purpN: "800080",
    YbeccapurpN: "663399",
    Yd: "ff0000",
    Psybrown: "bc8f8f",
    PyOXe: "4169e1",
    saddNbPwn: "8b4513",
    sOmon: "fa8072",
    sandybPwn: "f4a460",
    sHgYF: "2e8b57",
    sHshell: "fff5ee",
    siFna: "a0522d",
    silver: "c0c0c0",
    skyXe: "87ceeb",
    UXe: "6a5acd",
    UWay: "708090",
    UgYy: "708090",
    snow: "fffafa",
    sprRggYF: "ff7f",
    stAlXe: "4682b4",
    tan: "d2b48c",
    teO: "8080",
    tEstN: "d8bfd8",
    tomato: "ff6347",
    Qe: "40e0d0",
    viTet: "ee82ee",
    JHt: "f5deb3",
    wEte: "ffffff",
    wEtesmoke: "f5f5f5",
    Lw: "ffff00",
    LwgYF: "9acd32",
};
function Qc() {
    const i = {};
    const t = Object.keys(So);
    const e = Object.keys(wo);
    let s;
    let n;
    let r;
    let o;
    let a;
    for (s = 0; s < t.length; s++) {
        for (o = a = t[s], n = 0; n < e.length; n++) {
            (r = e[n]), (a = a.replace(r, wo[r]));
        }
        (r = parseInt(So[o], 16)),
            (i[a] = [(r >> 16) & 255, (r >> 8) & 255, r & 255]);
    }
    return i;
}
let xs;
function th(i) {
    xs || ((xs = Qc()), (xs.transparent = [0, 0, 0, 0]));
    const t = xs[i.toLowerCase()];
    return t && { r: t[0], g: t[1], b: t[2], a: t.length === 4 ? t[3] : 255 };
}
const eh =
    /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
function ih(i) {
    const t = eh.exec(i);
    let e = 255;
    let s;
    let n;
    let r;
    if (t) {
        if (t[7] !== s) {
            const o = +t[7];
            e = t[8] ? pi(o) : Gt(o * 255, 0, 255);
        }
        return (
            (s = +t[1]),
            (n = +t[3]),
            (r = +t[5]),
            (s = 255 & (t[2] ? pi(s) : Gt(s, 0, 255))),
            (n = 255 & (t[4] ? pi(n) : Gt(n, 0, 255))),
            (r = 255 & (t[6] ? pi(r) : Gt(r, 0, 255))),
            { r: s, g: n, b: r, a: e }
        );
    }
}
function sh(i) {
    return (
        i &&
        (i.a < 255
            ? `rgba(${i.r}, ${i.g}, ${i.b}, ${Wt(i.a)})`
            : `rgb(${i.r}, ${i.g}, ${i.b})`)
    );
}
const bn = (i) =>
    i <= 0.0031308 ? i * 12.92 : Math.pow(i, 1 / 2.4) * 1.055 - 0.055;
const Ee = (i) =>
    i <= 0.04045 ? i / 12.92 : Math.pow((i + 0.055) / 1.055, 2.4);
function nh(i, t, e) {
    const s = Ee(Wt(i.r));
    const n = Ee(Wt(i.g));
    const r = Ee(Wt(i.b));
    return {
        r: Xt(bn(s + e * (Ee(Wt(t.r)) - s))),
        g: Xt(bn(n + e * (Ee(Wt(t.g)) - n))),
        b: Xt(bn(r + e * (Ee(Wt(t.b)) - r))),
        a: i.a + e * (t.a - i.a),
    };
}
function _s(i, t, e) {
    if (i) {
        let s = Rn(i);
        (s[t] = Math.max(0, Math.min(s[t] + s[t] * e, t === 0 ? 360 : 1))),
            (s = zn(s)),
            (i.r = s[0]),
            (i.g = s[1]),
            (i.b = s[2]);
    }
}
function Uo(i, t) {
    return i && Object.assign(t || {}, i);
}
function ko(i) {
    let t = { r: 0, g: 0, b: 0, a: 255 };
    return (
        Array.isArray(i)
            ? i.length >= 3 &&
              ((t = { r: i[0], g: i[1], b: i[2], a: 255 }),
              i.length > 3 && (t.a = Xt(i[3])))
            : ((t = Uo(i, { r: 0, g: 0, b: 0, a: 1 })), (t.a = Xt(t.a))),
        t
    );
}
function rh(i) {
    return i.charAt(0) === "r" ? ih(i) : Xc(i);
}
const kn = class i {
    constructor(t) {
        if (t instanceof i) return t;
        const e = typeof t;
        let s;
        e === "object"
            ? (s = ko(t))
            : e === "string" && (s = Hc(t) || th(t) || rh(t)),
            (this._rgb = s),
            (this._valid = !!s);
    }

    get valid() {
        return this._valid;
    }

    get rgb() {
        const t = Uo(this._rgb);
        return t && (t.a = Wt(t.a)), t;
    }

    set rgb(t) {
        this._rgb = ko(t);
    }

    rgbString() {
        return this._valid ? sh(this._rgb) : void 0;
    }

    hexString() {
        return this._valid ? $c(this._rgb) : void 0;
    }

    hslString() {
        return this._valid ? Jc(this._rgb) : void 0;
    }

    mix(t, e) {
        if (t) {
            const s = this.rgb;
            const n = t.rgb;
            let r;
            const o = e === r ? 0.5 : e;
            const a = 2 * o - 1;
            const l = s.a - n.a;
            const c = ((a * l === -1 ? a : (a + l) / (1 + a * l)) + 1) / 2;
            (r = 1 - c),
                (s.r = 255 & (c * s.r + r * n.r + 0.5)),
                (s.g = 255 & (c * s.g + r * n.g + 0.5)),
                (s.b = 255 & (c * s.b + r * n.b + 0.5)),
                (s.a = o * s.a + (1 - o) * n.a),
                (this.rgb = s);
        }
        return this;
    }

    interpolate(t, e) {
        return t && (this._rgb = nh(this._rgb, t._rgb, e)), this;
    }

    clone() {
        return new i(this.rgb);
    }

    alpha(t) {
        return (this._rgb.a = Xt(t)), this;
    }

    clearer(t) {
        const e = this._rgb;
        return (e.a *= 1 - t), this;
    }

    greyscale() {
        const t = this._rgb;
        const e = _i(t.r * 0.3 + t.g * 0.59 + t.b * 0.11);
        return (t.r = t.g = t.b = e), this;
    }

    opaquer(t) {
        const e = this._rgb;
        return (e.a *= 1 + t), this;
    }

    negate() {
        const t = this._rgb;
        return (t.r = 255 - t.r), (t.g = 255 - t.g), (t.b = 255 - t.b), this;
    }

    lighten(t) {
        return _s(this._rgb, 2, t), this;
    }

    darken(t) {
        return _s(this._rgb, 2, -t), this;
    }

    saturate(t) {
        return _s(this._rgb, 1, t), this;
    }

    desaturate(t) {
        return _s(this._rgb, 1, -t), this;
    }

    rotate(t) {
        return Kc(this._rgb, t), this;
    }
};
function Yo(i) {
    return new kn(i);
}
function Zo(i) {
    if (i && typeof i === "object") {
        const t = i.toString();
        return (
            t === "[object CanvasPattern]" || t === "[object CanvasGradient]"
        );
    }
    return !1;
}
function Vn(i) {
    return Zo(i) ? i : Yo(i);
}
function xn(i) {
    return Zo(i) ? i : Yo(i).saturate(0.5).darken(0.1).hexString();
}
const Kt = Object.create(null);
const Is = Object.create(null);
function yi(i, t) {
    if (!t) return i;
    const e = t.split(".");
    for (let s = 0, n = e.length; s < n; ++s) {
        const r = e[s];
        i = i[r] || (i[r] = Object.create(null));
    }
    return i;
}
function _n(i, t, e) {
    return typeof t === "string" ? Ce(yi(i, t), e) : Ce(yi(i, ""), t);
}
const Mn = class {
    constructor(t) {
        (this.animation = void 0),
            (this.backgroundColor = "rgba(0,0,0,0.1)"),
            (this.borderColor = "rgba(0,0,0,0.1)"),
            (this.color = "#666"),
            (this.datasets = {}),
            (this.devicePixelRatio = (e) =>
                e.chart.platform.getDevicePixelRatio()),
            (this.elements = {}),
            (this.events = [
                "mousemove",
                "mouseout",
                "click",
                "touchstart",
                "touchmove",
            ]),
            (this.font = {
                family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                size: 12,
                style: "normal",
                lineHeight: 1.2,
                weight: null,
            }),
            (this.hover = {}),
            (this.hoverBackgroundColor = (e, s) => xn(s.backgroundColor)),
            (this.hoverBorderColor = (e, s) => xn(s.borderColor)),
            (this.hoverColor = (e, s) => xn(s.color)),
            (this.indexAxis = "x"),
            (this.interaction = {
                mode: "nearest",
                intersect: !0,
                includeInvisible: !1,
            }),
            (this.maintainAspectRatio = !0),
            (this.onHover = null),
            (this.onClick = null),
            (this.parsing = !0),
            (this.plugins = {}),
            (this.responsive = !0),
            (this.scale = void 0),
            (this.scales = {}),
            (this.showLine = !0),
            (this.drawActiveElementsOnTop = !0),
            this.describe(t);
    }

    set(t, e) {
        return _n(this, t, e);
    }

    get(t) {
        return yi(this, t);
    }

    describe(t, e) {
        return _n(Is, t, e);
    }

    override(t, e) {
        return _n(Kt, t, e);
    }

    route(t, e, s, n) {
        const r = yi(this, t);
        const o = yi(this, s);
        const a = "_" + e;
        Object.defineProperties(r, {
            [a]: { value: r[e], writable: !0 },
            [e]: {
                enumerable: !0,
                get() {
                    const l = this[a];
                    const c = o[n];
                    return F(l) ? Object.assign({}, c, l) : E(l, c);
                },
                set(l) {
                    this[a] = l;
                },
            },
        });
    }
};
const A = new Mn({
    _scriptable: (i) => !i.startsWith("on"),
    _indexable: (i) => i !== "events",
    hover: { _fallback: "interaction" },
    interaction: { _scriptable: !1, _indexable: !1 },
});
function oh(i) {
    return !i || P(i.size) || P(i.family)
        ? null
        : (i.style ? i.style + " " : "") +
              (i.weight ? i.weight + " " : "") +
              i.size +
              "px " +
              i.family;
}
function bi(i, t, e, s, n) {
    let r = t[n];
    return (
        r || ((r = t[n] = i.measureText(n).width), e.push(n)),
        r > s && (s = r),
        s
    );
}
function qo(i, t, e, s) {
    s = s || {};
    let n = (s.data = s.data || {});
    let r = (s.garbageCollect = s.garbageCollect || []);
    s.font !== t &&
        ((n = s.data = {}), (r = s.garbageCollect = []), (s.font = t)),
        i.save(),
        (i.font = t);
    let o = 0;
    const a = e.length;
    let l;
    let c;
    let h;
    let u;
    let d;
    for (l = 0; l < a; l++) {
        if (((u = e[l]), u != null && B(u) !== !0)) o = bi(i, n, r, o, u);
        else if (B(u)) {
            for (c = 0, h = u.length; c < h; c++) {
                (d = u[c]), d != null && !B(d) && (o = bi(i, n, r, o, d));
            }
        }
    }
    i.restore();
    const f = r.length / 2;
    if (f > e.length) {
        for (l = 0; l < f; l++) delete n[r[l]];
        r.splice(0, f);
    }
    return o;
}
function Jt(i, t, e) {
    const s = i.currentDevicePixelRatio;
    const n = e !== 0 ? Math.max(e / 2, 0.5) : 0;
    return Math.round((t - n) * s) / s + n;
}
function Hn(i, t) {
    (t = t || i.getContext("2d")),
        t.save(),
        t.resetTransform(),
        t.clearRect(0, 0, i.width, i.height),
        t.restore();
}
function Cs(i, t, e, s) {
    Bn(i, t, e, s, null);
}
function Bn(i, t, e, s, n) {
    let r;
    let o;
    let a;
    let l;
    let c;
    let h;
    const u = t.pointStyle;
    const d = t.rotation;
    const f = t.radius;
    let m = (d || 0) * Nc;
    if (
        u &&
        typeof u === "object" &&
        ((r = u.toString()),
        r === "[object HTMLImageElement]" || r === "[object HTMLCanvasElement]")
    ) {
        i.save(),
            i.translate(e, s),
            i.rotate(m),
            i.drawImage(u, -u.width / 2, -u.height / 2, u.width, u.height),
            i.restore();
        return;
    }
    if (!(isNaN(f) || f <= 0)) {
        switch ((i.beginPath(), u)) {
            default:
                n ? i.ellipse(e, s, n / 2, f, 0, 0, H) : i.arc(e, s, f, 0, H),
                    i.closePath();
                break;
            case "triangle":
                i.moveTo(e + Math.sin(m) * f, s - Math.cos(m) * f),
                    (m += yo),
                    i.lineTo(e + Math.sin(m) * f, s - Math.cos(m) * f),
                    (m += yo),
                    i.lineTo(e + Math.sin(m) * f, s - Math.cos(m) * f),
                    i.closePath();
                break;
            case "rectRounded":
                (c = f * 0.516),
                    (l = f - c),
                    (o = Math.cos(m + gi) * l),
                    (a = Math.sin(m + gi) * l),
                    i.arc(e - o, s - a, c, m - j, m - U),
                    i.arc(e + a, s - o, c, m - U, m),
                    i.arc(e + o, s + a, c, m, m + U),
                    i.arc(e - a, s + o, c, m + U, m + j),
                    i.closePath();
                break;
            case "rect":
                if (!d) {
                    (l = Math.SQRT1_2 * f),
                        (h = n ? n / 2 : l),
                        i.rect(e - h, s - l, 2 * h, 2 * l);
                    break;
                }
                m += gi;
            case "rectRot":
                (o = Math.cos(m) * f),
                    (a = Math.sin(m) * f),
                    i.moveTo(e - o, s - a),
                    i.lineTo(e + a, s - o),
                    i.lineTo(e + o, s + a),
                    i.lineTo(e - a, s + o),
                    i.closePath();
                break;
            case "crossRot":
                m += gi;
            case "cross":
                (o = Math.cos(m) * f),
                    (a = Math.sin(m) * f),
                    i.moveTo(e - o, s - a),
                    i.lineTo(e + o, s + a),
                    i.moveTo(e + a, s - o),
                    i.lineTo(e - a, s + o);
                break;
            case "star":
                (o = Math.cos(m) * f),
                    (a = Math.sin(m) * f),
                    i.moveTo(e - o, s - a),
                    i.lineTo(e + o, s + a),
                    i.moveTo(e + a, s - o),
                    i.lineTo(e - a, s + o),
                    (m += gi),
                    (o = Math.cos(m) * f),
                    (a = Math.sin(m) * f),
                    i.moveTo(e - o, s - a),
                    i.lineTo(e + o, s + a),
                    i.moveTo(e + a, s - o),
                    i.lineTo(e - a, s + o);
                break;
            case "line":
                (o = n ? n / 2 : Math.cos(m) * f),
                    (a = Math.sin(m) * f),
                    i.moveTo(e - o, s - a),
                    i.lineTo(e + o, s + a);
                break;
            case "dash":
                i.moveTo(e, s),
                    i.lineTo(e + Math.cos(m) * f, s + Math.sin(m) * f);
                break;
        }
        i.fill(), t.borderWidth > 0 && i.stroke();
    }
}
function Fe(i, t, e) {
    return (
        (e = e || 0.5),
        !t ||
            (i &&
                i.x > t.left - e &&
                i.x < t.right + e &&
                i.y > t.top - e &&
                i.y < t.bottom + e)
    );
}
function wi(i, t) {
    i.save(),
        i.beginPath(),
        i.rect(t.left, t.top, t.right - t.left, t.bottom - t.top),
        i.clip();
}
function Si(i) {
    i.restore();
}
function Go(i, t, e, s, n) {
    if (!t) return i.lineTo(e.x, e.y);
    if (n === "middle") {
        const r = (t.x + e.x) / 2;
        i.lineTo(r, t.y), i.lineTo(r, e.y);
    } else (n === "after") != !!s ? i.lineTo(t.x, e.y) : i.lineTo(e.x, t.y);
    i.lineTo(e.x, e.y);
}
function Xo(i, t, e, s) {
    if (!t) return i.lineTo(e.x, e.y);
    i.bezierCurveTo(
        s ? t.cp1x : t.cp2x,
        s ? t.cp1y : t.cp2y,
        s ? e.cp2x : e.cp1x,
        s ? e.cp2y : e.cp1y,
        e.x,
        e.y,
    );
}
function Qt(i, t, e, s, n, r = {}) {
    const o = B(t) ? t : [t];
    const a = r.strokeWidth > 0 && r.strokeColor !== "";
    let l;
    let c;
    for (i.save(), i.font = n.string, ah(i, r), l = 0; l < o.length; ++l) {
        (c = o[l]),
            a &&
                (r.strokeColor && (i.strokeStyle = r.strokeColor),
                P(r.strokeWidth) || (i.lineWidth = r.strokeWidth),
                i.strokeText(c, e, s, r.maxWidth)),
            i.fillText(c, e, s, r.maxWidth),
            lh(i, e, s, c, r),
            (s += n.lineHeight);
    }
    i.restore();
}
function ah(i, t) {
    t.translation && i.translate(t.translation[0], t.translation[1]),
        P(t.rotation) || i.rotate(t.rotation),
        t.color && (i.fillStyle = t.color),
        t.textAlign && (i.textAlign = t.textAlign),
        t.textBaseline && (i.textBaseline = t.textBaseline);
}
function lh(i, t, e, s, n) {
    if (n.strikethrough || n.underline) {
        const r = i.measureText(s);
        const o = t - r.actualBoundingBoxLeft;
        const a = t + r.actualBoundingBoxRight;
        const l = e - r.actualBoundingBoxAscent;
        const c = e + r.actualBoundingBoxDescent;
        const h = n.strikethrough ? (l + c) / 2 : c;
        (i.strokeStyle = i.fillStyle),
            i.beginPath(),
            (i.lineWidth = n.decorationWidth || 2),
            i.moveTo(o, h),
            i.lineTo(a, h),
            i.stroke();
    }
}
function Re(i, t) {
    const { x: e, y: s, w: n, h: r, radius: o } = t;
    i.arc(e + o.topLeft, s + o.topLeft, o.topLeft, -U, j, !0),
        i.lineTo(e, s + r - o.bottomLeft),
        i.arc(e + o.bottomLeft, s + r - o.bottomLeft, o.bottomLeft, j, U, !0),
        i.lineTo(e + n - o.bottomRight, s + r),
        i.arc(
            e + n - o.bottomRight,
            s + r - o.bottomRight,
            o.bottomRight,
            U,
            0,
            !0,
        ),
        i.lineTo(e + n, s + o.topRight),
        i.arc(e + n - o.topRight, s + o.topRight, o.topRight, 0, -U, !0),
        i.lineTo(e + o.topLeft, s);
}
const ch = new RegExp(/^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/);
const hh = new RegExp(
    /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/,
);
function uh(i, t) {
    const e = ("" + i).match(ch);
    if (!e || e[1] === "normal") return t * 1.2;
    switch (((i = +e[2]), e[3])) {
        case "px":
            return i;
        case "%":
            i /= 100;
            break;
    }
    return t * i;
}
const dh = (i) => +i || 0;
function Fs(i, t) {
    const e = {};
    const s = F(t);
    const n = s ? Object.keys(t) : t;
    const r = F(i) ? (s ? (o) => E(i[o], i[t[o]]) : (o) => i[o]) : () => i;
    for (const o of n) e[o] = dh(r(o));
    return e;
}
function $n(i) {
    return Fs(i, { top: "y", right: "x", bottom: "y", left: "x" });
}
function te(i) {
    return Fs(i, ["topLeft", "topRight", "bottomLeft", "bottomRight"]);
}
function rt(i) {
    const t = $n(i);
    return (t.width = t.left + t.right), (t.height = t.top + t.bottom), t;
}
function Q(i, t) {
    (i = i || {}), (t = t || A.font);
    let e = E(i.size, t.size);
    typeof e === "string" && (e = parseInt(e, 10));
    let s = E(i.style, t.style);
    s &&
        !("" + s).match(hh) &&
        (console.warn('Invalid font style specified: "' + s + '"'), (s = ""));
    const n = {
        family: E(i.family, t.family),
        lineHeight: uh(E(i.lineHeight, t.lineHeight), e),
        size: e,
        style: s,
        weight: E(i.weight, t.weight),
        string: "",
    };
    return (n.string = oh(n)), n;
}
function We(i, t, e, s) {
    let n = !0;
    let r;
    let o;
    let a;
    for (r = 0, o = i.length; r < o; ++r) {
        if (
            ((a = i[r]),
            a !== void 0 &&
                (t !== void 0 &&
                    typeof a === "function" &&
                    ((a = a(t)), (n = !1)),
                e !== void 0 && B(a) && ((a = a[e % a.length]), (n = !1)),
                a !== void 0))
        ) {
            return s && !n && (s.cacheable = !1), a;
        }
    }
}
function Ko(i, t, e) {
    const { min: s, max: n } = i;
    const r = Tn(t, (n - s) / 2);
    const o = (a, l) => (e && a === 0 ? 0 : a + l);
    return { min: o(s, -Math.abs(r)), max: o(n, r) };
}
function Ht(i, t) {
    return Object.assign(Object.create(i), t);
}
function As(i, t = [""], e = i, s, n = () => i[0]) {
    dt(s) || (s = ta("_fallback", i));
    const r = {
        [Symbol.toStringTag]: "Object",
        _cacheable: !0,
        _scopes: i,
        _rootScopes: e,
        _fallback: s,
        _getTarget: n,
        override: (o) => As([o, ...i], t, e, s),
    };
    return new Proxy(r, {
        deleteProperty(o, a) {
            return delete o[a], delete o._keys, delete i[0][a], !0;
        },
        get(o, a) {
            return Jo(o, a, () => _h(a, t, i, o));
        },
        getOwnPropertyDescriptor(o, a) {
            return Reflect.getOwnPropertyDescriptor(o._scopes[0], a);
        },
        getPrototypeOf() {
            return Reflect.getPrototypeOf(i[0]);
        },
        has(o, a) {
            return To(o).includes(a);
        },
        ownKeys(o) {
            return To(o);
        },
        set(o, a, l) {
            const c = o._storage || (o._storage = n());
            return (o[a] = c[a] = l), delete o._keys, !0;
        },
    });
}
function me(i, t, e, s) {
    const n = {
        _cacheable: !1,
        _proxy: i,
        _context: t,
        _subProxy: e,
        _stack: new Set(),
        _descriptors: jn(i, s),
        setContext: (r) => me(i, r, e, s),
        override: (r) => me(i.override(r), t, e, s),
    };
    return new Proxy(n, {
        deleteProperty(r, o) {
            return delete r[o], delete i[o], !0;
        },
        get(r, o, a) {
            return Jo(r, o, () => mh(r, o, a));
        },
        getOwnPropertyDescriptor(r, o) {
            return r._descriptors.allKeys
                ? Reflect.has(i, o)
                    ? { enumerable: !0, configurable: !0 }
                    : void 0
                : Reflect.getOwnPropertyDescriptor(i, o);
        },
        getPrototypeOf() {
            return Reflect.getPrototypeOf(i);
        },
        has(r, o) {
            return Reflect.has(i, o);
        },
        ownKeys() {
            return Reflect.ownKeys(i);
        },
        set(r, o, a) {
            return (i[o] = a), delete r[o], !0;
        },
    });
}
function jn(i, t = { scriptable: !0, indexable: !0 }) {
    const {
        _scriptable: e = t.scriptable,
        _indexable: s = t.indexable,
        _allKeys: n = t.allKeys,
    } = i;
    return {
        allKeys: n,
        scriptable: e,
        indexable: s,
        isScriptable: zt(e) ? e : () => e,
        isIndexable: zt(s) ? s : () => s,
    };
}
const fh = (i, t) => (i ? i + vs(t) : t);
const Un = (i, t) =>
    F(t) &&
    i !== "adapters" &&
    (Object.getPrototypeOf(t) === null || t.constructor === Object);
function Jo(i, t, e) {
    if (Object.prototype.hasOwnProperty.call(i, t)) return i[t];
    const s = e();
    return (i[t] = s), s;
}
function mh(i, t, e) {
    const { _proxy: s, _context: n, _subProxy: r, _descriptors: o } = i;
    let a = s[t];
    return (
        zt(a) && o.isScriptable(t) && (a = gh(t, a, i, e)),
        B(a) && a.length && (a = ph(t, a, i, o.isIndexable)),
        Un(t, a) && (a = me(a, n, r && r[t], o)),
        a
    );
}
function gh(i, t, e, s) {
    const { _proxy: n, _context: r, _subProxy: o, _stack: a } = e;
    if (a.has(i)) {
        throw new Error(
            "Recursion detected: " + Array.from(a).join("->") + "->" + i,
        );
    }
    return (
        a.add(i),
        (t = t(r, o || s)),
        a.delete(i),
        Un(i, t) && (t = Yn(n._scopes, n, i, t)),
        t
    );
}
function ph(i, t, e, s) {
    const { _proxy: n, _context: r, _subProxy: o, _descriptors: a } = e;
    if (dt(r.index) && s(i)) t = t[r.index % t.length];
    else if (F(t[0])) {
        const l = t;
        const c = n._scopes.filter((h) => h !== l);
        t = [];
        for (const h of l) {
            const u = Yn(c, n, i, h);
            t.push(me(u, r, o && o[i], a));
        }
    }
    return t;
}
function Qo(i, t, e) {
    return zt(i) ? i(t, e) : i;
}
const yh = (i, t) => (i === !0 ? t : typeof i === "string" ? Vt(t, i) : void 0);
function bh(i, t, e, s, n) {
    for (const r of t) {
        const o = yh(e, r);
        if (o) {
            i.add(o);
            const a = Qo(o._fallback, e, n);
            if (dt(a) && a !== e && a !== s) return a;
        } else if (o === !1 && dt(s) && e !== s) return null;
    }
    return !1;
}
function Yn(i, t, e, s) {
    const n = t._rootScopes;
    const r = Qo(t._fallback, e, s);
    const o = [...i, ...n];
    const a = new Set();
    a.add(s);
    let l = Mo(a, o, e, r || e, s);
    return l === null ||
        (dt(r) && r !== e && ((l = Mo(a, o, r, l, s)), l === null))
        ? !1
        : As(Array.from(a), [""], n, r, () => xh(t, e, s));
}
function Mo(i, t, e, s, n) {
    for (; e; ) e = bh(i, t, e, s, n);
    return e;
}
function xh(i, t, e) {
    const s = i._getTarget();
    t in s || (s[t] = {});
    const n = s[t];
    return B(n) && F(e) ? e : n;
}
function _h(i, t, e, s) {
    let n;
    for (const r of t) {
        if (((n = ta(fh(r, i), e)), dt(n))) {
            return Un(i, n) ? Yn(e, s, i, n) : n;
        }
    }
}
function ta(i, t) {
    for (const e of t) {
        if (!e) continue;
        const s = e[i];
        if (dt(s)) return s;
    }
}
function To(i) {
    let t = i._keys;
    return t || (t = i._keys = wh(i._scopes)), t;
}
function wh(i) {
    const t = new Set();
    for (const e of i) {
        for (const s of Object.keys(e).filter((n) => !n.startsWith("_"))) {
            t.add(s);
        }
    }
    return Array.from(t);
}
function Zn(i, t, e, s) {
    const { iScale: n } = i;
    const { key: r = "r" } = this._parsing;
    const o = new Array(s);
    let a;
    let l;
    let c;
    let h;
    for (a = 0, l = s; a < l; ++a) {
        (c = a + e), (h = t[c]), (o[a] = { r: n.parse(Vt(h, r), c) });
    }
    return o;
}
const Sh = Number.EPSILON || 1e-14;
const Ae = (i, t) => t < i.length && !i[t].skip && i[t];
const ea = (i) => (i === "x" ? "y" : "x");
function kh(i, t, e, s) {
    const n = i.skip ? t : i;
    const r = t;
    const o = e.skip ? t : e;
    const a = Ms(r, n);
    const l = Ms(o, r);
    let c = a / (a + l);
    let h = l / (a + l);
    (c = isNaN(c) ? 0 : c), (h = isNaN(h) ? 0 : h);
    const u = s * c;
    const d = s * h;
    return {
        previous: { x: r.x - u * (o.x - n.x), y: r.y - u * (o.y - n.y) },
        next: { x: r.x + d * (o.x - n.x), y: r.y + d * (o.y - n.y) },
    };
}
function Mh(i, t, e) {
    const s = i.length;
    let n;
    let r;
    let o;
    let a;
    let l;
    let c = Ae(i, 0);
    for (let h = 0; h < s - 1; ++h) {
        if (((l = c), (c = Ae(i, h + 1)), !(!l || !c))) {
            if (Pe(t[h], 0, Sh)) {
                e[h] = e[h + 1] = 0;
                continue;
            }
            (n = e[h] / t[h]),
                (r = e[h + 1] / t[h]),
                (a = Math.pow(n, 2) + Math.pow(r, 2)),
                !(a <= 9) &&
                    ((o = 3 / Math.sqrt(a)),
                    (e[h] = n * o * t[h]),
                    (e[h + 1] = r * o * t[h]));
        }
    }
}
function Th(i, t, e = "x") {
    const s = ea(e);
    const n = i.length;
    let r;
    let o;
    let a;
    let l = Ae(i, 0);
    for (let c = 0; c < n; ++c) {
        if (((o = a), (a = l), (l = Ae(i, c + 1)), !a)) continue;
        const h = a[e];
        const u = a[s];
        o &&
            ((r = (h - o[e]) / 3),
            (a[`cp1${e}`] = h - r),
            (a[`cp1${s}`] = u - r * t[c])),
            l &&
                ((r = (l[e] - h) / 3),
                (a[`cp2${e}`] = h + r),
                (a[`cp2${s}`] = u + r * t[c]));
    }
}
function vh(i, t = "x") {
    const e = ea(t);
    const s = i.length;
    const n = Array(s).fill(0);
    const r = Array(s);
    let o;
    let a;
    let l;
    let c = Ae(i, 0);
    for (o = 0; o < s; ++o) {
        if (((a = l), (l = c), (c = Ae(i, o + 1)), !!l)) {
            if (c) {
                const h = c[t] - l[t];
                n[o] = h !== 0 ? (c[e] - l[e]) / h : 0;
            }
            r[o] = a
                ? c
                    ? Mt(n[o - 1]) !== Mt(n[o])
                        ? 0
                        : (n[o - 1] + n[o]) / 2
                    : n[o - 1]
                : n[o];
        }
    }
    Mh(i, n, r), Th(i, r, t);
}
function ws(i, t, e) {
    return Math.max(Math.min(i, e), t);
}
function Oh(i, t) {
    let e;
    let s;
    let n;
    let r;
    let o;
    let a = Fe(i[0], t);
    for (e = 0, s = i.length; e < s; ++e) {
        (o = r),
            (r = a),
            (a = e < s - 1 && Fe(i[e + 1], t)),
            r &&
                ((n = i[e]),
                o &&
                    ((n.cp1x = ws(n.cp1x, t.left, t.right)),
                    (n.cp1y = ws(n.cp1y, t.top, t.bottom))),
                a &&
                    ((n.cp2x = ws(n.cp2x, t.left, t.right)),
                    (n.cp2y = ws(n.cp2y, t.top, t.bottom))));
    }
}
function ia(i, t, e, s, n) {
    let r, o, a, l;
    if (
        (t.spanGaps && (i = i.filter((c) => !c.skip)),
        t.cubicInterpolationMode === "monotone")
    ) {
        vh(i, n);
    } else {
        let c = s ? i[i.length - 1] : i[0];
        for (r = 0, o = i.length; r < o; ++r) {
            (a = i[r]),
                (l = kh(
                    c,
                    a,
                    i[Math.min(r + 1, o - (s ? 0 : 1)) % o],
                    t.tension,
                )),
                (a.cp1x = l.previous.x),
                (a.cp1y = l.previous.y),
                (a.cp2x = l.next.x),
                (a.cp2y = l.next.y),
                (c = a);
        }
    }
    t.capBezierPoints && Oh(i, e);
}
function qn() {
    return typeof window < "u" && typeof document < "u";
}
function Ls(i) {
    let t = i.parentNode;
    return t && t.toString() === "[object ShadowRoot]" && (t = t.host), t;
}
function Ts(i, t, e) {
    let s;
    return (
        typeof i === "string"
            ? ((s = parseInt(i, 10)),
              i.indexOf("%") !== -1 && (s = (s / 100) * t.parentNode[e]))
            : (s = i),
        s
    );
}
const Ps = (i) => window.getComputedStyle(i, null);
function Dh(i, t) {
    return Ps(i).getPropertyValue(t);
}
const Eh = ["top", "right", "bottom", "left"];
function fe(i, t, e) {
    const s = {};
    e = e ? "-" + e : "";
    for (let n = 0; n < 4; n++) {
        const r = Eh[n];
        s[r] = parseFloat(i[t + "-" + r + e]) || 0;
    }
    return (s.width = s.left + s.right), (s.height = s.top + s.bottom), s;
}
const Ih = (i, t, e) => (i > 0 || t > 0) && (!e || !e.shadowRoot);
function Ch(i, t) {
    const e = i.touches;
    const s = e && e.length ? e[0] : i;
    const { offsetX: n, offsetY: r } = s;
    let o = !1;
    let a;
    let l;
    if (Ih(n, r, i.target)) (a = n), (l = r);
    else {
        const c = t.getBoundingClientRect();
        (a = s.clientX - c.left), (l = s.clientY - c.top), (o = !0);
    }
    return { x: a, y: l, box: o };
}
function ee(i, t) {
    if ("native" in i) return i;
    const { canvas: e, currentDevicePixelRatio: s } = t;
    const n = Ps(e);
    const r = n.boxSizing === "border-box";
    const o = fe(n, "padding");
    const a = fe(n, "border", "width");
    const { x: l, y: c, box: h } = Ch(i, e);
    const u = o.left + (h && a.left);
    const d = o.top + (h && a.top);
    let { width: f, height: m } = t;
    return (
        r && ((f -= o.width + a.width), (m -= o.height + a.height)),
        {
            x: Math.round((((l - u) / f) * e.width) / s),
            y: Math.round((((c - d) / m) * e.height) / s),
        }
    );
}
function Fh(i, t, e) {
    let s, n;
    if (t === void 0 || e === void 0) {
        const r = Ls(i);
        if (!r) (t = i.clientWidth), (e = i.clientHeight);
        else {
            const o = r.getBoundingClientRect();
            const a = Ps(r);
            const l = fe(a, "border", "width");
            const c = fe(a, "padding");
            (t = o.width - c.width - l.width),
                (e = o.height - c.height - l.height),
                (s = Ts(a.maxWidth, r, "clientWidth")),
                (n = Ts(a.maxHeight, r, "clientHeight"));
        }
    }
    return { width: t, height: e, maxWidth: s || ks, maxHeight: n || ks };
}
const wn = (i) => Math.round(i * 10) / 10;
function sa(i, t, e, s) {
    const n = Ps(i);
    const r = fe(n, "margin");
    const o = Ts(n.maxWidth, i, "clientWidth") || ks;
    const a = Ts(n.maxHeight, i, "clientHeight") || ks;
    const l = Fh(i, t, e);
    let { width: c, height: h } = l;
    if (n.boxSizing === "content-box") {
        const u = fe(n, "border", "width");
        const d = fe(n, "padding");
        (c -= d.width + u.width), (h -= d.height + u.height);
    }
    return (
        (c = Math.max(0, c - r.width)),
        (h = Math.max(0, s ? Math.floor(c / s) : h - r.height)),
        (c = wn(Math.min(c, o, l.maxWidth))),
        (h = wn(Math.min(h, a, l.maxHeight))),
        c && !h && (h = wn(c / 2)),
        { width: c, height: h }
    );
}
function Gn(i, t, e) {
    const s = t || 1;
    const n = Math.floor(i.height * s);
    const r = Math.floor(i.width * s);
    (i.height = n / s), (i.width = r / s);
    const o = i.canvas;
    return (
        o.style &&
            (e || (!o.style.height && !o.style.width)) &&
            ((o.style.height = `${i.height}px`),
            (o.style.width = `${i.width}px`)),
        i.currentDevicePixelRatio !== s || o.height !== n || o.width !== r
            ? ((i.currentDevicePixelRatio = s),
              (o.height = n),
              (o.width = r),
              i.ctx.setTransform(s, 0, 0, s, 0, 0),
              !0)
            : !1
    );
}
const na = (function () {
    let i = !1;
    try {
        const t = {
            get passive() {
                return (i = !0), !1;
            },
        };
        window.addEventListener("test", null, t),
            window.removeEventListener("test", null, t);
    } catch {}
    return i;
})();
function Xn(i, t) {
    const e = Dh(i, t);
    const s = e && e.match(/^(\d+)(\.\d+)?px$/);
    return s ? +s[1] : void 0;
}
function qt(i, t, e, s) {
    return { x: i.x + e * (t.x - i.x), y: i.y + e * (t.y - i.y) };
}
function ra(i, t, e, s) {
    return {
        x: i.x + e * (t.x - i.x),
        y:
            s === "middle"
                ? e < 0.5
                    ? i.y
                    : t.y
                : s === "after"
                  ? e < 1
                      ? i.y
                      : t.y
                  : e > 0
                    ? t.y
                    : i.y,
    };
}
function oa(i, t, e, s) {
    const n = { x: i.cp2x, y: i.cp2y };
    const r = { x: t.cp1x, y: t.cp1y };
    const o = qt(i, n, e);
    const a = qt(n, r, e);
    const l = qt(r, t, e);
    const c = qt(o, a, e);
    const h = qt(a, l, e);
    return qt(c, h, e);
}
const vo = new Map();
function Ah(i, t) {
    t = t || {};
    const e = i + JSON.stringify(t);
    let s = vo.get(e);
    return s || ((s = new Intl.NumberFormat(i, t)), vo.set(e, s)), s;
}
function ze(i, t, e) {
    return Ah(t, e).format(i);
}
const Lh = function (i, t) {
    return {
        x(e) {
            return i + i + t - e;
        },
        setWidth(e) {
            t = e;
        },
        textAlign(e) {
            return e === "center" ? e : e === "right" ? "left" : "right";
        },
        xPlus(e, s) {
            return e - s;
        },
        leftForLtr(e, s) {
            return e - s;
        },
    };
};
const Ph = function () {
    return {
        x(i) {
            return i;
        },
        setWidth(i) {},
        textAlign(i) {
            return i;
        },
        xPlus(i, t) {
            return i + t;
        },
        leftForLtr(i, t) {
            return i;
        },
    };
};
function pe(i, t, e) {
    return i ? Lh(t, e) : Ph();
}
function Kn(i, t) {
    let e, s;
    (t === "ltr" || t === "rtl") &&
        ((e = i.canvas.style),
        (s = [
            e.getPropertyValue("direction"),
            e.getPropertyPriority("direction"),
        ]),
        e.setProperty("direction", t, "important"),
        (i.prevTextDirection = s));
}
function Jn(i, t) {
    t !== void 0 &&
        (delete i.prevTextDirection,
        i.canvas.style.setProperty("direction", t[0], t[1]));
}
function aa(i) {
    return i === "angle"
        ? { between: Ne, compare: Rc, normalize: ct }
        : { between: At, compare: (t, e) => t - e, normalize: (t) => t };
}
function Oo({ start: i, end: t, count: e, loop: s, style: n }) {
    return {
        start: i % e,
        end: t % e,
        loop: s && (t - i + 1) % e === 0,
        style: n,
    };
}
function Nh(i, t, e) {
    const { property: s, start: n, end: r } = e;
    const { between: o, normalize: a } = aa(s);
    const l = t.length;
    let { start: c, end: h, loop: u } = i;
    let d;
    let f;
    if (u) {
        for (
            c += l, h += l, d = 0, f = l;
            d < f && o(a(t[c % l][s]), n, r);
            ++d
        ) {
            c--, h--;
        }
        (c %= l), (h %= l);
    }
    return h < c && (h += l), { start: c, end: h, loop: u, style: i.style };
}
function Qn(i, t, e) {
    if (!e) return [i];
    const { property: s, start: n, end: r } = e;
    const o = t.length;
    const { compare: a, between: l, normalize: c } = aa(s);
    const { start: h, end: u, loop: d, style: f } = Nh(i, t, e);
    const m = [];
    let g = !1;
    let p = null;
    let y;
    let b;
    let _;
    const w = () => l(n, _, y) && a(n, _) !== 0;
    const x = () => a(r, y) === 0 || l(r, _, y);
    const S = () => g || w();
    const k = () => !g || x();
    for (let v = h, T = h; v <= u; ++v) {
        (b = t[v % o]),
            !b.skip &&
                ((y = c(b[s])),
                y !== _ &&
                    ((g = l(y, n, r)),
                    p === null && S() && (p = a(y, n) === 0 ? v : T),
                    p !== null &&
                        k() &&
                        (m.push(
                            Oo({
                                start: p,
                                end: v,
                                loop: d,
                                count: o,
                                style: f,
                            }),
                        ),
                        (p = null)),
                    (T = v),
                    (_ = y)));
    }
    return (
        p !== null &&
            m.push(Oo({ start: p, end: u, loop: d, count: o, style: f })),
        m
    );
}
function tr(i, t) {
    const e = [];
    const s = i.segments;
    for (let n = 0; n < s.length; n++) {
        const r = Qn(s[n], i.points, t);
        r.length && e.push(...r);
    }
    return e;
}
function Rh(i, t, e, s) {
    let n = 0;
    let r = t - 1;
    if (e && !s) for (; n < t && !i[n].skip; ) n++;
    for (; n < t && i[n].skip; ) n++;
    for (n %= t, e && (r += n); r > n && i[r % t].skip; ) r--;
    return (r %= t), { start: n, end: r };
}
function Wh(i, t, e, s) {
    const n = i.length;
    const r = [];
    let o = t;
    let a = i[t];
    let l;
    for (l = t + 1; l <= e; ++l) {
        const c = i[l % n];
        c.skip || c.stop
            ? a.skip ||
              ((s = !1),
              r.push({ start: t % n, end: (l - 1) % n, loop: s }),
              (t = o = c.stop ? l : null))
            : ((o = l), a.skip && (t = l)),
            (a = c);
    }
    return o !== null && r.push({ start: t % n, end: o % n, loop: s }), r;
}
function la(i, t) {
    const e = i.points;
    const s = i.options.spanGaps;
    const n = e.length;
    if (!n) return [];
    const r = !!i._loop;
    const { start: o, end: a } = Rh(e, n, r, s);
    if (s === !0) return Do(i, [{ start: o, end: a, loop: r }], e, t);
    const l = a < o ? a + n : a;
    const c = !!i._fullLoop && o === 0 && a === n - 1;
    return Do(i, Wh(e, o, l, c), e, t);
}
function Do(i, t, e, s) {
    return !s || !s.setContext || !e ? t : zh(i, t, e, s);
}
function zh(i, t, e, s) {
    const n = i._chart.getContext();
    const r = Eo(i.options);
    const {
        _datasetIndex: o,
        options: { spanGaps: a },
    } = i;
    const l = e.length;
    const c = [];
    let h = r;
    let u = t[0].start;
    let d = u;
    function f(m, g, p, y) {
        const b = a ? -1 : 1;
        if (m !== g) {
            for (m += l; e[m % l].skip; ) m -= b;
            for (; e[g % l].skip; ) g += b;
            m % l !== g % l &&
                (c.push({ start: m % l, end: g % l, loop: p, style: y }),
                (h = y),
                (u = g % l));
        }
    }
    for (const m of t) {
        u = a ? u : m.start;
        let g = e[u % l];
        let p;
        for (d = u + 1; d <= m.end; d++) {
            const y = e[d % l];
            (p = Eo(
                s.setContext(
                    Ht(n, {
                        type: "segment",
                        p0: g,
                        p1: y,
                        p0DataIndex: (d - 1) % l,
                        p1DataIndex: d % l,
                        datasetIndex: o,
                    }),
                ),
            )),
                Vh(p, h) && f(u, d - 1, m.loop, h),
                (g = y),
                (h = p);
        }
        u < d - 1 && f(u, d - 1, m.loop, h);
    }
    return c;
}
function Eo(i) {
    return {
        backgroundColor: i.backgroundColor,
        borderCapStyle: i.borderCapStyle,
        borderDash: i.borderDash,
        borderDashOffset: i.borderDashOffset,
        borderJoinStyle: i.borderJoinStyle,
        borderWidth: i.borderWidth,
        borderColor: i.borderColor,
    };
}
function Vh(i, t) {
    return t && JSON.stringify(i) !== JSON.stringify(t);
}
const hr = class {
    constructor() {
        (this._request = null),
            (this._charts = new Map()),
            (this._running = !1),
            (this._lastDate = void 0);
    }

    _notify(t, e, s, n) {
        const r = e.listeners[n];
        const o = e.duration;
        r.forEach((a) =>
            a({
                chart: t,
                initial: e.initial,
                numSteps: o,
                currentStep: Math.min(s - e.start, o),
            }),
        );
    }

    _refresh() {
        this._request ||
            ((this._running = !0),
            (this._request = An.call(window, () => {
                this._update(),
                    (this._request = null),
                    this._running && this._refresh();
            })));
    }

    _update(t = Date.now()) {
        let e = 0;
        this._charts.forEach((s, n) => {
            if (!s.running || !s.items.length) return;
            const r = s.items;
            let o = r.length - 1;
            let a = !1;
            let l;
            for (; o >= 0; --o) {
                (l = r[o]),
                    l._active
                        ? (l._total > s.duration && (s.duration = l._total),
                          l.tick(t),
                          (a = !0))
                        : ((r[o] = r[r.length - 1]), r.pop());
            }
            a && (n.draw(), this._notify(n, s, t, "progress")),
                r.length ||
                    ((s.running = !1),
                    this._notify(n, s, t, "complete"),
                    (s.initial = !1)),
                (e += r.length);
        }),
            (this._lastDate = t),
            e === 0 && (this._running = !1);
    }

    _getAnims(t) {
        const e = this._charts;
        let s = e.get(t);
        return (
            s ||
                ((s = {
                    running: !1,
                    initial: !0,
                    items: [],
                    listeners: { complete: [], progress: [] },
                }),
                e.set(t, s)),
            s
        );
    }

    listen(t, e, s) {
        this._getAnims(t).listeners[e].push(s);
    }

    add(t, e) {
        !e || !e.length || this._getAnims(t).items.push(...e);
    }

    has(t) {
        return this._getAnims(t).items.length > 0;
    }

    start(t) {
        const e = this._charts.get(t);
        e &&
            ((e.running = !0),
            (e.start = Date.now()),
            (e.duration = e.items.reduce(
                (s, n) => Math.max(s, n._duration),
                0,
            )),
            this._refresh());
    }

    running(t) {
        if (!this._running) return !1;
        const e = this._charts.get(t);
        return !(!e || !e.running || !e.items.length);
    }

    stop(t) {
        const e = this._charts.get(t);
        if (!e || !e.items.length) return;
        const s = e.items;
        let n = s.length - 1;
        for (; n >= 0; --n) s[n].cancel();
        (e.items = []), this._notify(t, e, Date.now(), "complete");
    }

    remove(t) {
        return this._charts.delete(t);
    }
};
const Bt = new hr();
const ca = "transparent";
const Hh = {
    boolean(i, t, e) {
        return e > 0.5 ? t : i;
    },
    color(i, t, e) {
        const s = Vn(i || ca);
        const n = s.valid && Vn(t || ca);
        return n && n.valid ? n.mix(s, e).hexString() : t;
    },
    number(i, t, e) {
        return i + (t - i) * e;
    },
};
const ur = class {
    constructor(t, e, s, n) {
        const r = e[s];
        n = We([t.to, n, r, t.from]);
        const o = We([t.from, r, n]);
        (this._active = !0),
            (this._fn = t.fn || Hh[t.type || typeof o]),
            (this._easing = Ie[t.easing] || Ie.linear),
            (this._start = Math.floor(Date.now() + (t.delay || 0))),
            (this._duration = this._total = Math.floor(t.duration)),
            (this._loop = !!t.loop),
            (this._target = e),
            (this._prop = s),
            (this._from = o),
            (this._to = n),
            (this._promises = void 0);
    }

    active() {
        return this._active;
    }

    update(t, e, s) {
        if (this._active) {
            this._notify(!1);
            const n = this._target[this._prop];
            const r = s - this._start;
            const o = this._duration - r;
            (this._start = s),
                (this._duration = Math.floor(Math.max(o, t.duration))),
                (this._total += r),
                (this._loop = !!t.loop),
                (this._to = We([t.to, e, n, t.from])),
                (this._from = We([t.from, n, e]));
        }
    }

    cancel() {
        this._active &&
            (this.tick(Date.now()), (this._active = !1), this._notify(!1));
    }

    tick(t) {
        const e = t - this._start;
        const s = this._duration;
        const n = this._prop;
        const r = this._from;
        const o = this._loop;
        const a = this._to;
        let l;
        if (((this._active = r !== a && (o || e < s)), !this._active)) {
            (this._target[n] = a), this._notify(!0);
            return;
        }
        if (e < 0) {
            this._target[n] = r;
            return;
        }
        (l = (e / s) % 2),
            (l = o && l > 1 ? 2 - l : l),
            (l = this._easing(Math.min(1, Math.max(0, l)))),
            (this._target[n] = this._fn(r, a, l));
    }

    wait() {
        const t = this._promises || (this._promises = []);
        return new Promise((e, s) => {
            t.push({ res: e, rej: s });
        });
    }

    _notify(t) {
        const e = t ? "res" : "rej";
        const s = this._promises || [];
        for (let n = 0; n < s.length; n++) s[n][e]();
    }
};
const Bh = ["x", "y", "borderWidth", "radius", "tension"];
const $h = ["color", "borderColor", "backgroundColor"];
A.set("animation", {
    delay: void 0,
    duration: 1e3,
    easing: "easeOutQuart",
    fn: void 0,
    from: void 0,
    loop: void 0,
    to: void 0,
    type: void 0,
});
const jh = Object.keys(A.animation);
A.describe("animation", {
    _fallback: !1,
    _indexable: !1,
    _scriptable: (i) => i !== "onProgress" && i !== "onComplete" && i !== "fn",
});
A.set("animations", {
    colors: { type: "color", properties: $h },
    numbers: { type: "number", properties: Bh },
});
A.describe("animations", { _fallback: "animation" });
A.set("transitions", {
    active: { animation: { duration: 400 } },
    resize: { animation: { duration: 0 } },
    show: {
        animations: {
            colors: { from: "transparent" },
            visible: { type: "boolean", duration: 0 },
        },
    },
    hide: {
        animations: {
            colors: { to: "transparent" },
            visible: { type: "boolean", easing: "linear", fn: (i) => i | 0 },
        },
    },
});
const $s = class {
    constructor(t, e) {
        (this._chart = t), (this._properties = new Map()), this.configure(e);
    }

    configure(t) {
        if (!F(t)) return;
        const e = this._properties;
        Object.getOwnPropertyNames(t).forEach((s) => {
            const n = t[s];
            if (!F(n)) return;
            const r = {};
            for (const o of jh) r[o] = n[o];
            ((B(n.properties) && n.properties) || [s]).forEach((o) => {
                (o === s || !e.has(o)) && e.set(o, r);
            });
        });
    }

    _animateOptions(t, e) {
        const s = e.options;
        const n = Yh(t, s);
        if (!n) return [];
        const r = this._createAnimations(n, s);
        return (
            s.$shared &&
                Uh(t.options.$animations, s).then(
                    () => {
                        t.options = s;
                    },
                    () => {},
                ),
            r
        );
    }

    _createAnimations(t, e) {
        const s = this._properties;
        const n = [];
        const r = t.$animations || (t.$animations = {});
        const o = Object.keys(e);
        const a = Date.now();
        let l;
        for (l = o.length - 1; l >= 0; --l) {
            const c = o[l];
            if (c.charAt(0) === "$") continue;
            if (c === "options") {
                n.push(...this._animateOptions(t, e));
                continue;
            }
            const h = e[c];
            let u = r[c];
            const d = s.get(c);
            if (u) {
                if (d && u.active()) {
                    u.update(d, h, a);
                    continue;
                } else u.cancel();
            }
            if (!d || !d.duration) {
                t[c] = h;
                continue;
            }
            (r[c] = u = new ur(d, t, c, h)), n.push(u);
        }
        return n;
    }

    update(t, e) {
        if (this._properties.size === 0) {
            Object.assign(t, e);
            return;
        }
        const s = this._createAnimations(t, e);
        if (s.length) return Bt.add(this._chart, s), !0;
    }
};
function Uh(i, t) {
    const e = [];
    const s = Object.keys(t);
    for (let n = 0; n < s.length; n++) {
        const r = i[s[n]];
        r && r.active() && e.push(r.wait());
    }
    return Promise.all(e);
}
function Yh(i, t) {
    if (!t) return;
    let e = i.options;
    if (!e) {
        i.options = t;
        return;
    }
    return (
        e.$shared &&
            (i.options = e =
                Object.assign({}, e, { $shared: !1, $animations: {} })),
        e
    );
}
function ha(i, t) {
    const e = (i && i.options) || {};
    const s = e.reverse;
    const n = e.min === void 0 ? t : 0;
    const r = e.max === void 0 ? t : 0;
    return { start: s ? r : n, end: s ? n : r };
}
function Zh(i, t, e) {
    if (e === !1) return !1;
    const s = ha(i, e);
    const n = ha(t, e);
    return { top: n.end, right: s.end, bottom: n.start, left: s.start };
}
function qh(i) {
    let t, e, s, n;
    return (
        F(i)
            ? ((t = i.top), (e = i.right), (s = i.bottom), (n = i.left))
            : (t = e = s = n = i),
        { top: t, right: e, bottom: s, left: n, disabled: i === !1 }
    );
}
function tl(i, t) {
    const e = [];
    const s = i._getSortedDatasetMetas(t);
    let n;
    let r;
    for (n = 0, r = s.length; n < r; ++n) e.push(s[n].index);
    return e;
}
function ua(i, t, e, s = {}) {
    const n = i.keys;
    const r = s.mode === "single";
    let o;
    let a;
    let l;
    let c;
    if (t !== null) {
        for (o = 0, a = n.length; o < a; ++o) {
            if (((l = +n[o]), l === e)) {
                if (s.all) continue;
                break;
            }
            (c = i.values[l]),
                q(c) && (r || t === 0 || Mt(t) === Mt(c)) && (t += c);
        }
        return t;
    }
}
function Gh(i) {
    const t = Object.keys(i);
    const e = new Array(t.length);
    let s;
    let n;
    let r;
    for (s = 0, n = t.length; s < n; ++s) {
        (r = t[s]), (e[s] = { x: r, y: i[r] });
    }
    return e;
}
function da(i, t) {
    const e = i && i.options.stacked;
    return e || (e === void 0 && t.stack !== void 0);
}
function Xh(i, t, e) {
    return `${i.id}.${t.id}.${e.stack || e.type}`;
}
function Kh(i) {
    const { min: t, max: e, minDefined: s, maxDefined: n } = i.getUserBounds();
    return {
        min: s ? t : Number.NEGATIVE_INFINITY,
        max: n ? e : Number.POSITIVE_INFINITY,
    };
}
function Jh(i, t, e) {
    const s = i[t] || (i[t] = {});
    return s[e] || (s[e] = {});
}
function fa(i, t, e, s) {
    for (const n of t.getMatchingVisibleMetas(s).reverse()) {
        const r = i[n.index];
        if ((e && r > 0) || (!e && r < 0)) return n.index;
    }
    return null;
}
function ma(i, t) {
    const { chart: e, _cachedMeta: s } = i;
    const n = e._stacks || (e._stacks = {});
    const { iScale: r, vScale: o, index: a } = s;
    const l = r.axis;
    const c = o.axis;
    const h = Xh(r, o, s);
    const u = t.length;
    let d;
    for (let f = 0; f < u; ++f) {
        const m = t[f];
        const { [l]: g, [c]: p } = m;
        const y = m._stacks || (m._stacks = {});
        (d = y[c] = Jh(n, h, g)),
            (d[a] = p),
            (d._top = fa(d, o, !0, s.type)),
            (d._bottom = fa(d, o, !1, s.type));
    }
}
function er(i, t) {
    const e = i.scales;
    return Object.keys(e)
        .filter((s) => e[s].axis === t)
        .shift();
}
function Qh(i, t) {
    return Ht(i, {
        active: !1,
        dataset: void 0,
        datasetIndex: t,
        index: t,
        mode: "default",
        type: "dataset",
    });
}
function tu(i, t, e) {
    return Ht(i, {
        active: !1,
        dataIndex: t,
        parsed: void 0,
        raw: void 0,
        element: e,
        index: t,
        mode: "default",
        type: "data",
    });
}
function ki(i, t) {
    const e = i.controller.index;
    const s = i.vScale && i.vScale.axis;
    if (s) {
        t = t || i._parsed;
        for (const n of t) {
            const r = n._stacks;
            if (!r || r[s] === void 0 || r[s][e] === void 0) return;
            delete r[s][e];
        }
    }
}
const ir = (i) => i === "reset" || i === "none";
const ga = (i, t) => (t ? i : Object.assign({}, i));
const eu = (i, t, e) =>
    i && !t.hidden && t._stacked && { keys: tl(e, !0), values: null };
const gt = class {
    constructor(t, e) {
        (this.chart = t),
            (this._ctx = t.ctx),
            (this.index = e),
            (this._cachedDataOpts = {}),
            (this._cachedMeta = this.getMeta()),
            (this._type = this._cachedMeta.type),
            (this.options = void 0),
            (this._parsing = !1),
            (this._data = void 0),
            (this._objectData = void 0),
            (this._sharedOptions = void 0),
            (this._drawStart = void 0),
            (this._drawCount = void 0),
            (this.enableOptionSharing = !1),
            (this.supportsDecimation = !1),
            (this.$context = void 0),
            (this._syncList = []),
            this.initialize();
    }

    initialize() {
        const t = this._cachedMeta;
        this.configure(),
            this.linkScales(),
            (t._stacked = da(t.vScale, t)),
            this.addElements();
    }

    updateIndex(t) {
        this.index !== t && ki(this._cachedMeta), (this.index = t);
    }

    linkScales() {
        const t = this.chart;
        const e = this._cachedMeta;
        const s = this.getDataset();
        const n = (u, d, f, m) => (u === "x" ? d : u === "r" ? m : f);
        const r = (e.xAxisID = E(s.xAxisID, er(t, "x")));
        const o = (e.yAxisID = E(s.yAxisID, er(t, "y")));
        const a = (e.rAxisID = E(s.rAxisID, er(t, "r")));
        const l = e.indexAxis;
        const c = (e.iAxisID = n(l, r, o, a));
        const h = (e.vAxisID = n(l, o, r, a));
        (e.xScale = this.getScaleForId(r)),
            (e.yScale = this.getScaleForId(o)),
            (e.rScale = this.getScaleForId(a)),
            (e.iScale = this.getScaleForId(c)),
            (e.vScale = this.getScaleForId(h));
    }

    getDataset() {
        return this.chart.data.datasets[this.index];
    }

    getMeta() {
        return this.chart.getDatasetMeta(this.index);
    }

    getScaleForId(t) {
        return this.chart.scales[t];
    }

    _getOtherScale(t) {
        const e = this._cachedMeta;
        return t === e.iScale ? e.vScale : e.iScale;
    }

    reset() {
        this._update("reset");
    }

    _destroy() {
        const t = this._cachedMeta;
        this._data && Cn(this._data, this), t._stacked && ki(t);
    }

    _dataCheck() {
        const t = this.getDataset();
        const e = t.data || (t.data = []);
        const s = this._data;
        if (F(e)) this._data = Gh(e);
        else if (s !== e) {
            if (s) {
                Cn(s, this);
                const n = this._cachedMeta;
                ki(n), (n._parsed = []);
            }
            e && Object.isExtensible(e) && Vo(e, this),
                (this._syncList = []),
                (this._data = e);
        }
    }

    addElements() {
        const t = this._cachedMeta;
        this._dataCheck(),
            this.datasetElementType &&
                (t.dataset = new this.datasetElementType());
    }

    buildOrUpdateElements(t) {
        const e = this._cachedMeta;
        const s = this.getDataset();
        let n = !1;
        this._dataCheck();
        const r = e._stacked;
        (e._stacked = da(e.vScale, e)),
            e.stack !== s.stack && ((n = !0), ki(e), (e.stack = s.stack)),
            this._resyncElements(t),
            (n || r !== e._stacked) && ma(this, e._parsed);
    }

    configure() {
        const t = this.chart.config;
        const e = t.datasetScopeKeys(this._type);
        const s = t.getOptionScopes(this.getDataset(), e, !0);
        (this.options = t.createResolver(s, this.getContext())),
            (this._parsing = this.options.parsing),
            (this._cachedDataOpts = {});
    }

    parse(t, e) {
        const { _cachedMeta: s, _data: n } = this;
        const { iScale: r, _stacked: o } = s;
        const a = r.axis;
        let l = t === 0 && e === n.length ? !0 : s._sorted;
        let c = t > 0 && s._parsed[t - 1];
        let h;
        let u;
        let d;
        if (this._parsing === !1) (s._parsed = n), (s._sorted = !0), (d = n);
        else {
            B(n[t])
                ? (d = this.parseArrayData(s, n, t, e))
                : F(n[t])
                  ? (d = this.parseObjectData(s, n, t, e))
                  : (d = this.parsePrimitiveData(s, n, t, e));
            const f = () => u[a] === null || (c && u[a] < c[a]);
            for (h = 0; h < e; ++h) {
                (s._parsed[h + t] = u = d[h]), l && (f() && (l = !1), (c = u));
            }
            s._sorted = l;
        }
        o && ma(this, d);
    }

    parsePrimitiveData(t, e, s, n) {
        const { iScale: r, vScale: o } = t;
        const a = r.axis;
        const l = o.axis;
        const c = r.getLabels();
        const h = r === o;
        const u = new Array(n);
        let d;
        let f;
        let m;
        for (d = 0, f = n; d < f; ++d) {
            (m = d + s),
                (u[d] = { [a]: h || r.parse(c[m], m), [l]: o.parse(e[m], m) });
        }
        return u;
    }

    parseArrayData(t, e, s, n) {
        const { xScale: r, yScale: o } = t;
        const a = new Array(n);
        let l;
        let c;
        let h;
        let u;
        for (l = 0, c = n; l < c; ++l) {
            (h = l + s),
                (u = e[h]),
                (a[l] = { x: r.parse(u[0], h), y: o.parse(u[1], h) });
        }
        return a;
    }

    parseObjectData(t, e, s, n) {
        const { xScale: r, yScale: o } = t;
        const { xAxisKey: a = "x", yAxisKey: l = "y" } = this._parsing;
        const c = new Array(n);
        let h;
        let u;
        let d;
        let f;
        for (h = 0, u = n; h < u; ++h) {
            (d = h + s),
                (f = e[d]),
                (c[h] = { x: r.parse(Vt(f, a), d), y: o.parse(Vt(f, l), d) });
        }
        return c;
    }

    getParsed(t) {
        return this._cachedMeta._parsed[t];
    }

    getDataElement(t) {
        return this._cachedMeta.data[t];
    }

    applyStack(t, e, s) {
        const n = this.chart;
        const r = this._cachedMeta;
        const o = e[t.axis];
        const a = { keys: tl(n, !0), values: e._stacks[t.axis] };
        return ua(a, o, r.index, { mode: s });
    }

    updateRangeFromParsed(t, e, s, n) {
        const r = s[e.axis];
        let o = r === null ? NaN : r;
        const a = n && s._stacks[e.axis];
        n && a && ((n.values = a), (o = ua(n, r, this._cachedMeta.index))),
            (t.min = Math.min(t.min, o)),
            (t.max = Math.max(t.max, o));
    }

    getMinMax(t, e) {
        const s = this._cachedMeta;
        const n = s._parsed;
        const r = s._sorted && t === s.iScale;
        const o = n.length;
        const a = this._getOtherScale(t);
        const l = eu(e, s, this.chart);
        const c = {
            min: Number.POSITIVE_INFINITY,
            max: Number.NEGATIVE_INFINITY,
        };
        const { min: h, max: u } = Kh(a);
        let d;
        let f;
        function m() {
            f = n[d];
            const g = f[a.axis];
            return !q(f[t.axis]) || h > g || u < g;
        }
        for (
            d = 0;
            d < o && !(!m() && (this.updateRangeFromParsed(c, t, f, l), r));
            ++d
        );
        if (r) {
            for (d = o - 1; d >= 0; --d) {
                if (!m()) {
                    this.updateRangeFromParsed(c, t, f, l);
                    break;
                }
            }
        }
        return c;
    }

    getAllParsedValues(t) {
        const e = this._cachedMeta._parsed;
        const s = [];
        let n;
        let r;
        let o;
        for (n = 0, r = e.length; n < r; ++n) {
            (o = e[n][t.axis]), q(o) && s.push(o);
        }
        return s;
    }

    getMaxOverflow() {
        return !1;
    }

    getLabelAndValue(t) {
        const e = this._cachedMeta;
        const s = e.iScale;
        const n = e.vScale;
        const r = this.getParsed(t);
        return {
            label: s ? "" + s.getLabelForValue(r[s.axis]) : "",
            value: n ? "" + n.getLabelForValue(r[n.axis]) : "",
        };
    }

    _update(t) {
        const e = this._cachedMeta;
        this.update(t || "default"),
            (e._clip = qh(
                E(
                    this.options.clip,
                    Zh(e.xScale, e.yScale, this.getMaxOverflow()),
                ),
            ));
    }

    update(t) {}
    draw() {
        const t = this._ctx;
        const e = this.chart;
        const s = this._cachedMeta;
        const n = s.data || [];
        const r = e.chartArea;
        const o = [];
        const a = this._drawStart || 0;
        const l = this._drawCount || n.length - a;
        const c = this.options.drawActiveElementsOnTop;
        let h;
        for (s.dataset && s.dataset.draw(t, r, a, l), h = a; h < a + l; ++h) {
            const u = n[h];
            u.hidden || (u.active && c ? o.push(u) : u.draw(t, r));
        }
        for (h = 0; h < o.length; ++h) o[h].draw(t, r);
    }

    getStyle(t, e) {
        const s = e ? "active" : "default";
        return t === void 0 && this._cachedMeta.dataset
            ? this.resolveDatasetElementOptions(s)
            : this.resolveDataElementOptions(t || 0, s);
    }

    getContext(t, e, s) {
        const n = this.getDataset();
        let r;
        if (t >= 0 && t < this._cachedMeta.data.length) {
            const o = this._cachedMeta.data[t];
            (r = o.$context || (o.$context = tu(this.getContext(), t, o))),
                (r.parsed = this.getParsed(t)),
                (r.raw = n.data[t]),
                (r.index = r.dataIndex = t);
        } else {
            (r =
                this.$context ||
                (this.$context = Qh(this.chart.getContext(), this.index))),
                (r.dataset = n),
                (r.index = r.datasetIndex = this.index);
        }
        return (r.active = !!e), (r.mode = s), r;
    }

    resolveDatasetElementOptions(t) {
        return this._resolveElementOptions(this.datasetElementType.id, t);
    }

    resolveDataElementOptions(t, e) {
        return this._resolveElementOptions(this.dataElementType.id, e, t);
    }

    _resolveElementOptions(t, e = "default", s) {
        const n = e === "active";
        const r = this._cachedDataOpts;
        const o = t + "-" + e;
        const a = r[o];
        const l = this.enableOptionSharing && dt(s);
        if (a) return ga(a, l);
        const c = this.chart.config;
        const h = c.datasetElementScopeKeys(this._type, t);
        const u = n ? [`${t}Hover`, "hover", t, ""] : [t, ""];
        const d = c.getOptionScopes(this.getDataset(), h);
        const f = Object.keys(A.elements[t]);
        const m = () => this.getContext(s, n);
        const g = c.resolveNamedOptions(d, f, m, u);
        return (
            g.$shared && ((g.$shared = l), (r[o] = Object.freeze(ga(g, l)))), g
        );
    }

    _resolveAnimations(t, e, s) {
        const n = this.chart;
        const r = this._cachedDataOpts;
        const o = `animation-${e}`;
        const a = r[o];
        if (a) return a;
        let l;
        if (n.options.animation !== !1) {
            const h = this.chart.config;
            const u = h.datasetAnimationScopeKeys(this._type, e);
            const d = h.getOptionScopes(this.getDataset(), u);
            l = h.createResolver(d, this.getContext(t, s, e));
        }
        const c = new $s(n, l && l.animations);
        return l && l._cacheable && (r[o] = Object.freeze(c)), c;
    }

    getSharedOptions(t) {
        if (t.$shared) {
            return (
                this._sharedOptions ||
                (this._sharedOptions = Object.assign({}, t))
            );
        }
    }

    includeOptions(t, e) {
        return !e || ir(t) || this.chart._animationsDisabled;
    }

    _getSharedOptions(t, e) {
        const s = this.resolveDataElementOptions(t, e);
        const n = this._sharedOptions;
        const r = this.getSharedOptions(s);
        const o = this.includeOptions(e, r) || r !== n;
        return (
            this.updateSharedOptions(r, e, s),
            { sharedOptions: r, includeOptions: o }
        );
    }

    updateElement(t, e, s, n) {
        ir(n)
            ? Object.assign(t, s)
            : this._resolveAnimations(e, n).update(t, s);
    }

    updateSharedOptions(t, e, s) {
        t && !ir(e) && this._resolveAnimations(void 0, e).update(t, s);
    }

    _setStyle(t, e, s, n) {
        t.active = n;
        const r = this.getStyle(e, n);
        this._resolveAnimations(e, s, n).update(t, {
            options: (!n && this.getSharedOptions(r)) || r,
        });
    }

    removeHoverStyle(t, e, s) {
        this._setStyle(t, s, "active", !1);
    }

    setHoverStyle(t, e, s) {
        this._setStyle(t, s, "active", !0);
    }

    _removeDatasetHoverStyle() {
        const t = this._cachedMeta.dataset;
        t && this._setStyle(t, void 0, "active", !1);
    }

    _setDatasetHoverStyle() {
        const t = this._cachedMeta.dataset;
        t && this._setStyle(t, void 0, "active", !0);
    }

    _resyncElements(t) {
        const e = this._data;
        const s = this._cachedMeta.data;
        for (const [a, l, c] of this._syncList) this[a](l, c);
        this._syncList = [];
        const n = s.length;
        const r = e.length;
        const o = Math.min(r, n);
        o && this.parse(0, o),
            r > n
                ? this._insertElements(n, r - n, t)
                : r < n && this._removeElements(r, n - r);
    }

    _insertElements(t, e, s = !0) {
        const n = this._cachedMeta;
        const r = n.data;
        const o = t + e;
        let a;
        const l = (c) => {
            for (c.length += e, a = c.length - 1; a >= o; a--) c[a] = c[a - e];
        };
        for (l(r), a = t; a < o; ++a) r[a] = new this.dataElementType();
        this._parsing && l(n._parsed),
            this.parse(t, e),
            s && this.updateElements(r, t, e, "reset");
    }

    updateElements(t, e, s, n) {}
    _removeElements(t, e) {
        const s = this._cachedMeta;
        if (this._parsing) {
            const n = s._parsed.splice(t, e);
            s._stacked && ki(s, n);
        }
        s.data.splice(t, e);
    }

    _sync(t) {
        if (this._parsing) this._syncList.push(t);
        else {
            const [e, s, n] = t;
            this[e](s, n);
        }
        this.chart._dataChanges.push([this.index, ...t]);
    }

    _onDataPush() {
        const t = arguments.length;
        this._sync(["_insertElements", this.getDataset().data.length - t, t]);
    }

    _onDataPop() {
        this._sync(["_removeElements", this._cachedMeta.data.length - 1, 1]);
    }

    _onDataShift() {
        this._sync(["_removeElements", 0, 1]);
    }

    _onDataSplice(t, e) {
        e && this._sync(["_removeElements", t, e]);
        const s = arguments.length - 2;
        s && this._sync(["_insertElements", t, s]);
    }

    _onDataUnshift() {
        this._sync(["_insertElements", 0, arguments.length]);
    }
};
gt.defaults = {};
gt.prototype.datasetElementType = null;
gt.prototype.dataElementType = null;
function iu(i, t) {
    if (!i._cache.$bar) {
        const e = i.getMatchingVisibleMetas(t);
        let s = [];
        for (let n = 0, r = e.length; n < r; n++) {
            s = s.concat(e[n].controller.getAllParsedValues(i));
        }
        i._cache.$bar = Fn(s.sort((n, r) => n - r));
    }
    return i._cache.$bar;
}
function su(i) {
    const t = i.iScale;
    const e = iu(t, i.type);
    let s = t._length;
    let n;
    let r;
    let o;
    let a;
    const l = () => {
        o === 32767 ||
            o === -32768 ||
            (dt(a) && (s = Math.min(s, Math.abs(o - a) || s)), (a = o));
    };
    for (n = 0, r = e.length; n < r; ++n) (o = t.getPixelForValue(e[n])), l();
    for (a = void 0, n = 0, r = t.ticks.length; n < r; ++n) {
        (o = t.getPixelForTick(n)), l();
    }
    return s;
}
function nu(i, t, e, s) {
    const n = e.barThickness;
    let r;
    let o;
    return (
        P(n)
            ? ((r = t.min * e.categoryPercentage), (o = e.barPercentage))
            : ((r = n * s), (o = 1)),
        { chunk: r / s, ratio: o, start: t.pixels[i] - r / 2 }
    );
}
function ru(i, t, e, s) {
    const n = t.pixels;
    const r = n[i];
    let o = i > 0 ? n[i - 1] : null;
    let a = i < n.length - 1 ? n[i + 1] : null;
    const l = e.categoryPercentage;
    o === null && (o = r - (a === null ? t.end - t.start : a - r)),
        a === null && (a = r + r - o);
    const c = r - ((r - Math.min(o, a)) / 2) * l;
    return {
        chunk: ((Math.abs(a - o) / 2) * l) / s,
        ratio: e.barPercentage,
        start: c,
    };
}
function ou(i, t, e, s) {
    const n = e.parse(i[0], s);
    const r = e.parse(i[1], s);
    const o = Math.min(n, r);
    const a = Math.max(n, r);
    let l = o;
    let c = a;
    Math.abs(o) > Math.abs(a) && ((l = a), (c = o)),
        (t[e.axis] = c),
        (t._custom = {
            barStart: l,
            barEnd: c,
            start: n,
            end: r,
            min: o,
            max: a,
        });
}
function el(i, t, e, s) {
    return B(i) ? ou(i, t, e, s) : (t[e.axis] = e.parse(i, s)), t;
}
function pa(i, t, e, s) {
    const n = i.iScale;
    const r = i.vScale;
    const o = n.getLabels();
    const a = n === r;
    const l = [];
    let c;
    let h;
    let u;
    let d;
    for (c = e, h = e + s; c < h; ++c) {
        (d = t[c]),
            (u = {}),
            (u[n.axis] = a || n.parse(o[c], c)),
            l.push(el(d, u, r, c));
    }
    return l;
}
function sr(i) {
    return i && i.barStart !== void 0 && i.barEnd !== void 0;
}
function au(i, t, e) {
    return i !== 0
        ? Mt(i)
        : (t.isHorizontal() ? 1 : -1) * (t.min >= e ? 1 : -1);
}
function lu(i) {
    let t, e, s, n, r;
    return (
        i.horizontal
            ? ((t = i.base > i.x), (e = "left"), (s = "right"))
            : ((t = i.base < i.y), (e = "bottom"), (s = "top")),
        t ? ((n = "end"), (r = "start")) : ((n = "start"), (r = "end")),
        { start: e, end: s, reverse: t, top: n, bottom: r }
    );
}
function cu(i, t, e, s) {
    let n = t.borderSkipped;
    const r = {};
    if (!n) {
        i.borderSkipped = r;
        return;
    }
    if (n === !0) {
        i.borderSkipped = { top: !0, right: !0, bottom: !0, left: !0 };
        return;
    }
    const { start: o, end: a, reverse: l, top: c, bottom: h } = lu(i);
    n === "middle" &&
        e &&
        ((i.enableBorderRadius = !0),
        (e._top || 0) === s
            ? (n = c)
            : (e._bottom || 0) === s
              ? (n = h)
              : ((r[ya(h, o, a, l)] = !0), (n = c))),
        (r[ya(n, o, a, l)] = !0),
        (i.borderSkipped = r);
}
function ya(i, t, e, s) {
    return s ? ((i = hu(i, t, e)), (i = ba(i, e, t))) : (i = ba(i, t, e)), i;
}
function hu(i, t, e) {
    return i === t ? e : i === e ? t : i;
}
function ba(i, t, e) {
    return i === "start" ? t : i === "end" ? e : i;
}
function uu(i, { inflateAmount: t }, e) {
    i.inflateAmount = t === "auto" ? (e === 1 ? 0.33 : 0) : t;
}
const Be = class extends gt {
    parsePrimitiveData(t, e, s, n) {
        return pa(t, e, s, n);
    }

    parseArrayData(t, e, s, n) {
        return pa(t, e, s, n);
    }

    parseObjectData(t, e, s, n) {
        const { iScale: r, vScale: o } = t;
        const { xAxisKey: a = "x", yAxisKey: l = "y" } = this._parsing;
        const c = r.axis === "x" ? a : l;
        const h = o.axis === "x" ? a : l;
        const u = [];
        let d;
        let f;
        let m;
        let g;
        for (d = s, f = s + n; d < f; ++d) {
            (g = e[d]),
                (m = {}),
                (m[r.axis] = r.parse(Vt(g, c), d)),
                u.push(el(Vt(g, h), m, o, d));
        }
        return u;
    }

    updateRangeFromParsed(t, e, s, n) {
        super.updateRangeFromParsed(t, e, s, n);
        const r = s._custom;
        r &&
            e === this._cachedMeta.vScale &&
            ((t.min = Math.min(t.min, r.min)),
            (t.max = Math.max(t.max, r.max)));
    }

    getMaxOverflow() {
        return 0;
    }

    getLabelAndValue(t) {
        const e = this._cachedMeta;
        const { iScale: s, vScale: n } = e;
        const r = this.getParsed(t);
        const o = r._custom;
        const a = sr(o)
            ? "[" + o.start + ", " + o.end + "]"
            : "" + n.getLabelForValue(r[n.axis]);
        return { label: "" + s.getLabelForValue(r[s.axis]), value: a };
    }

    initialize() {
        (this.enableOptionSharing = !0), super.initialize();
        const t = this._cachedMeta;
        t.stack = this.getDataset().stack;
    }

    update(t) {
        const e = this._cachedMeta;
        this.updateElements(e.data, 0, e.data.length, t);
    }

    updateElements(t, e, s, n) {
        const r = n === "reset";
        const {
            index: o,
            _cachedMeta: { vScale: a },
        } = this;
        const l = a.getBasePixel();
        const c = a.isHorizontal();
        const h = this._getRuler();
        const { sharedOptions: u, includeOptions: d } = this._getSharedOptions(
            e,
            n,
        );
        for (let f = e; f < e + s; f++) {
            const m = this.getParsed(f);
            const g =
                r || P(m[a.axis])
                    ? { base: l, head: l }
                    : this._calculateBarValuePixels(f);
            const p = this._calculateBarIndexPixels(f, h);
            const y = (m._stacks || {})[a.axis];
            const b = {
                horizontal: c,
                base: g.base,
                enableBorderRadius:
                    !y || sr(m._custom) || o === y._top || o === y._bottom,
                x: c ? g.head : p.center,
                y: c ? p.center : g.head,
                height: c ? p.size : Math.abs(g.size),
                width: c ? Math.abs(g.size) : p.size,
            };
            d &&
                (b.options =
                    u ||
                    this.resolveDataElementOptions(
                        f,
                        t[f].active ? "active" : n,
                    ));
            const _ = b.options || t[f].options;
            cu(b, _, y, o),
                uu(b, _, h.ratio),
                this.updateElement(t[f], f, b, n);
        }
    }

    _getStacks(t, e) {
        const { iScale: s } = this._cachedMeta;
        const n = s
            .getMatchingVisibleMetas(this._type)
            .filter((l) => l.controller.options.grouped);
        const r = s.options.stacked;
        const o = [];
        const a = (l) => {
            const c = l.controller.getParsed(e);
            const h = c && c[l.vScale.axis];
            if (P(h) || isNaN(h)) return !0;
        };
        for (const l of n) {
            if (
                !(e !== void 0 && a(l)) &&
                ((r === !1 ||
                    o.indexOf(l.stack) === -1 ||
                    (r === void 0 && l.stack === void 0)) &&
                    o.push(l.stack),
                l.index === t)
            ) {
                break;
            }
        }
        return o.length || o.push(void 0), o;
    }

    _getStackCount(t) {
        return this._getStacks(void 0, t).length;
    }

    _getStackIndex(t, e, s) {
        const n = this._getStacks(t, s);
        const r = e !== void 0 ? n.indexOf(e) : -1;
        return r === -1 ? n.length - 1 : r;
    }

    _getRuler() {
        const t = this.options;
        const e = this._cachedMeta;
        const s = e.iScale;
        const n = [];
        let r;
        let o;
        for (r = 0, o = e.data.length; r < o; ++r) {
            n.push(s.getPixelForValue(this.getParsed(r)[s.axis], r));
        }
        const a = t.barThickness;
        return {
            min: a || su(e),
            pixels: n,
            start: s._startPixel,
            end: s._endPixel,
            stackCount: this._getStackCount(),
            scale: s,
            grouped: t.grouped,
            ratio: a ? 1 : t.categoryPercentage * t.barPercentage,
        };
    }

    _calculateBarValuePixels(t) {
        const {
            _cachedMeta: { vScale: e, _stacked: s },
            options: { base: n, minBarLength: r },
        } = this;
        const o = n || 0;
        const a = this.getParsed(t);
        const l = a._custom;
        const c = sr(l);
        let h = a[e.axis];
        let u = 0;
        let d = s ? this.applyStack(e, a, s) : h;
        let f;
        let m;
        d !== h && ((u = d - h), (d = h)),
            c &&
                ((h = l.barStart),
                (d = l.barEnd - l.barStart),
                h !== 0 && Mt(h) !== Mt(l.barEnd) && (u = 0),
                (u += h));
        const g = !P(n) && !c ? n : u;
        let p = e.getPixelForValue(g);
        if (
            (this.chart.getDataVisibility(t)
                ? (f = e.getPixelForValue(u + d))
                : (f = p),
            (m = f - p),
            Math.abs(m) < r)
        ) {
            (m = au(m, e, o) * r), h === o && (p -= m / 2);
            const y = e.getPixelForDecimal(0);
            const b = e.getPixelForDecimal(1);
            const _ = Math.min(y, b);
            const w = Math.max(y, b);
            (p = Math.max(Math.min(p, w), _)), (f = p + m);
        }
        if (p === e.getPixelForValue(o)) {
            const y = (Mt(m) * e.getLineWidthForValue(o)) / 2;
            (p += y), (m -= y);
        }
        return { size: m, base: p, head: f, center: f + m / 2 };
    }

    _calculateBarIndexPixels(t, e) {
        const s = e.scale;
        const n = this.options;
        const r = n.skipNull;
        const o = E(n.maxBarThickness, 1 / 0);
        let a;
        let l;
        if (e.grouped) {
            const c = r ? this._getStackCount(t) : e.stackCount;
            const h =
                n.barThickness === "flex" ? ru(t, e, n, c) : nu(t, e, n, c);
            const u = this._getStackIndex(
                this.index,
                this._cachedMeta.stack,
                r ? t : void 0,
            );
            (a = h.start + h.chunk * u + h.chunk / 2),
                (l = Math.min(o, h.chunk * h.ratio));
        } else {
            (a = s.getPixelForValue(this.getParsed(t)[s.axis], t)),
                (l = Math.min(o, e.min * e.ratio));
        }
        return { base: a - l / 2, head: a + l / 2, center: a, size: l };
    }

    draw() {
        const t = this._cachedMeta;
        const e = t.vScale;
        const s = t.data;
        const n = s.length;
        let r = 0;
        for (; r < n; ++r) {
            this.getParsed(r)[e.axis] !== null && s[r].draw(this._ctx);
        }
    }
};
Be.id = "bar";
Be.defaults = {
    datasetElementType: !1,
    dataElementType: "bar",
    categoryPercentage: 0.8,
    barPercentage: 0.9,
    grouped: !0,
    animations: {
        numbers: {
            type: "number",
            properties: ["x", "y", "base", "width", "height"],
        },
    },
};
Be.overrides = {
    scales: {
        _index_: { type: "category", offset: !0, grid: { offset: !0 } },
        _value_: { type: "linear", beginAtZero: !0 },
    },
};
const $e = class extends gt {
    initialize() {
        (this.enableOptionSharing = !0), super.initialize();
    }

    parsePrimitiveData(t, e, s, n) {
        const r = super.parsePrimitiveData(t, e, s, n);
        for (let o = 0; o < r.length; o++) {
            r[o]._custom = this.resolveDataElementOptions(o + s).radius;
        }
        return r;
    }

    parseArrayData(t, e, s, n) {
        const r = super.parseArrayData(t, e, s, n);
        for (let o = 0; o < r.length; o++) {
            const a = e[s + o];
            r[o]._custom = E(
                a[2],
                this.resolveDataElementOptions(o + s).radius,
            );
        }
        return r;
    }

    parseObjectData(t, e, s, n) {
        const r = super.parseObjectData(t, e, s, n);
        for (let o = 0; o < r.length; o++) {
            const a = e[s + o];
            r[o]._custom = E(
                a && a.r && +a.r,
                this.resolveDataElementOptions(o + s).radius,
            );
        }
        return r;
    }

    getMaxOverflow() {
        const t = this._cachedMeta.data;
        let e = 0;
        for (let s = t.length - 1; s >= 0; --s) {
            e = Math.max(e, t[s].size(this.resolveDataElementOptions(s)) / 2);
        }
        return e > 0 && e;
    }

    getLabelAndValue(t) {
        const e = this._cachedMeta;
        const { xScale: s, yScale: n } = e;
        const r = this.getParsed(t);
        const o = s.getLabelForValue(r.x);
        const a = n.getLabelForValue(r.y);
        const l = r._custom;
        return {
            label: e.label,
            value: "(" + o + ", " + a + (l ? ", " + l : "") + ")",
        };
    }

    update(t) {
        const e = this._cachedMeta.data;
        this.updateElements(e, 0, e.length, t);
    }

    updateElements(t, e, s, n) {
        const r = n === "reset";
        const { iScale: o, vScale: a } = this._cachedMeta;
        const { sharedOptions: l, includeOptions: c } = this._getSharedOptions(
            e,
            n,
        );
        const h = o.axis;
        const u = a.axis;
        for (let d = e; d < e + s; d++) {
            const f = t[d];
            const m = !r && this.getParsed(d);
            const g = {};
            const p = (g[h] = r
                ? o.getPixelForDecimal(0.5)
                : o.getPixelForValue(m[h]));
            const y = (g[u] = r ? a.getBasePixel() : a.getPixelForValue(m[u]));
            (g.skip = isNaN(p) || isNaN(y)),
                c &&
                    ((g.options =
                        l ||
                        this.resolveDataElementOptions(
                            d,
                            f.active ? "active" : n,
                        )),
                    r && (g.options.radius = 0)),
                this.updateElement(f, d, g, n);
        }
    }

    resolveDataElementOptions(t, e) {
        const s = this.getParsed(t);
        let n = super.resolveDataElementOptions(t, e);
        n.$shared && (n = Object.assign({}, n, { $shared: !1 }));
        const r = n.radius;
        return (
            e !== "active" && (n.radius = 0),
            (n.radius += E(s && s._custom, r)),
            n
        );
    }
};
$e.id = "bubble";
$e.defaults = {
    datasetElementType: !1,
    dataElementType: "point",
    animations: {
        numbers: {
            type: "number",
            properties: ["x", "y", "borderWidth", "radius"],
        },
    },
};
$e.overrides = {
    scales: { x: { type: "linear" }, y: { type: "linear" } },
    plugins: {
        tooltip: {
            callbacks: {
                title() {
                    return "";
                },
            },
        },
    },
};
function du(i, t, e) {
    let s = 1;
    let n = 1;
    let r = 0;
    let o = 0;
    if (t < H) {
        const a = i;
        const l = a + t;
        const c = Math.cos(a);
        const h = Math.sin(a);
        const u = Math.cos(l);
        const d = Math.sin(l);
        const f = (_, w, x) =>
            Ne(_, a, l, !0) ? 1 : Math.max(w, w * e, x, x * e);
        const m = (_, w, x) =>
            Ne(_, a, l, !0) ? -1 : Math.min(w, w * e, x, x * e);
        const g = f(0, c, u);
        const p = f(U, h, d);
        const y = m(j, c, u);
        const b = m(j + U, h, d);
        (s = (g - y) / 2),
            (n = (p - b) / 2),
            (r = -(g + y) / 2),
            (o = -(p + b) / 2);
    }
    return { ratioX: s, ratioY: n, offsetX: r, offsetY: o };
}
const ne = class extends gt {
    constructor(t, e) {
        super(t, e),
            (this.enableOptionSharing = !0),
            (this.innerRadius = void 0),
            (this.outerRadius = void 0),
            (this.offsetX = void 0),
            (this.offsetY = void 0);
    }

    linkScales() {}
    parse(t, e) {
        const s = this.getDataset().data;
        const n = this._cachedMeta;
        if (this._parsing === !1) n._parsed = s;
        else {
            let r = (l) => +s[l];
            if (F(s[t])) {
                const { key: l = "value" } = this._parsing;
                r = (c) => +Vt(s[c], l);
            }
            let o, a;
            for (o = t, a = t + e; o < a; ++o) n._parsed[o] = r(o);
        }
    }

    _getRotation() {
        return _t(this.options.rotation - 90);
    }

    _getCircumference() {
        return _t(this.options.circumference);
    }

    _getRotationExtents() {
        let t = H;
        let e = -H;
        for (let s = 0; s < this.chart.data.datasets.length; ++s) {
            if (this.chart.isDatasetVisible(s)) {
                const n = this.chart.getDatasetMeta(s).controller;
                const r = n._getRotation();
                const o = n._getCircumference();
                (t = Math.min(t, r)), (e = Math.max(e, r + o));
            }
        }
        return { rotation: t, circumference: e - t };
    }

    update(t) {
        const e = this.chart;
        const { chartArea: s } = e;
        const n = this._cachedMeta;
        const r = n.data;
        const o =
            this.getMaxBorderWidth() +
            this.getMaxOffset(r) +
            this.options.spacing;
        const a = Math.max((Math.min(s.width, s.height) - o) / 2, 0);
        const l = Math.min(Co(this.options.cutout, a), 1);
        const c = this._getRingWeight(this.index);
        const { circumference: h, rotation: u } = this._getRotationExtents();
        const { ratioX: d, ratioY: f, offsetX: m, offsetY: g } = du(u, h, l);
        const p = (s.width - o) / d;
        const y = (s.height - o) / f;
        const b = Math.max(Math.min(p, y) / 2, 0);
        const _ = Tn(this.options.radius, b);
        const w = Math.max(_ * l, 0);
        const x = (_ - w) / this._getVisibleDatasetWeightTotal();
        (this.offsetX = m * _),
            (this.offsetY = g * _),
            (n.total = this.calculateTotal()),
            (this.outerRadius = _ - x * this._getRingWeightOffset(this.index)),
            (this.innerRadius = Math.max(this.outerRadius - x * c, 0)),
            this.updateElements(r, 0, r.length, t);
    }

    _circumference(t, e) {
        const s = this.options;
        const n = this._cachedMeta;
        const r = this._getCircumference();
        return (e && s.animation.animateRotate) ||
            !this.chart.getDataVisibility(t) ||
            n._parsed[t] === null ||
            n.data[t].hidden
            ? 0
            : this.calculateCircumference((n._parsed[t] * r) / H);
    }

    updateElements(t, e, s, n) {
        const r = n === "reset";
        const o = this.chart;
        const a = o.chartArea;
        const c = o.options.animation;
        const h = (a.left + a.right) / 2;
        const u = (a.top + a.bottom) / 2;
        const d = r && c.animateScale;
        const f = d ? 0 : this.innerRadius;
        const m = d ? 0 : this.outerRadius;
        const { sharedOptions: g, includeOptions: p } = this._getSharedOptions(
            e,
            n,
        );
        let y = this._getRotation();
        let b;
        for (b = 0; b < e; ++b) y += this._circumference(b, r);
        for (b = e; b < e + s; ++b) {
            const _ = this._circumference(b, r);
            const w = t[b];
            const x = {
                x: h + this.offsetX,
                y: u + this.offsetY,
                startAngle: y,
                endAngle: y + _,
                circumference: _,
                outerRadius: m,
                innerRadius: f,
            };
            p &&
                (x.options =
                    g ||
                    this.resolveDataElementOptions(b, w.active ? "active" : n)),
                (y += _),
                this.updateElement(w, b, x, n);
        }
    }

    calculateTotal() {
        const t = this._cachedMeta;
        const e = t.data;
        let s = 0;
        let n;
        for (n = 0; n < e.length; n++) {
            const r = t._parsed[n];
            r !== null &&
                !isNaN(r) &&
                this.chart.getDataVisibility(n) &&
                !e[n].hidden &&
                (s += Math.abs(r));
        }
        return s;
    }

    calculateCircumference(t) {
        const e = this._cachedMeta.total;
        return e > 0 && !isNaN(t) ? H * (Math.abs(t) / e) : 0;
    }

    getLabelAndValue(t) {
        const e = this._cachedMeta;
        const s = this.chart;
        const n = s.data.labels || [];
        const r = ze(e._parsed[t], s.options.locale);
        return { label: n[t] || "", value: r };
    }

    getMaxBorderWidth(t) {
        let e = 0;
        const s = this.chart;
        let n;
        let r;
        let o;
        let a;
        let l;
        if (!t) {
            for (n = 0, r = s.data.datasets.length; n < r; ++n) {
                if (s.isDatasetVisible(n)) {
                    (o = s.getDatasetMeta(n)), (t = o.data), (a = o.controller);
                    break;
                }
            }
        }
        if (!t) return 0;
        for (n = 0, r = t.length; n < r; ++n) {
            (l = a.resolveDataElementOptions(n)),
                l.borderAlign !== "inner" &&
                    (e = Math.max(
                        e,
                        l.borderWidth || 0,
                        l.hoverBorderWidth || 0,
                    ));
        }
        return e;
    }

    getMaxOffset(t) {
        let e = 0;
        for (let s = 0, n = t.length; s < n; ++s) {
            const r = this.resolveDataElementOptions(s);
            e = Math.max(e, r.offset || 0, r.hoverOffset || 0);
        }
        return e;
    }

    _getRingWeightOffset(t) {
        let e = 0;
        for (let s = 0; s < t; ++s) {
            this.chart.isDatasetVisible(s) && (e += this._getRingWeight(s));
        }
        return e;
    }

    _getRingWeight(t) {
        return Math.max(E(this.chart.data.datasets[t].weight, 1), 0);
    }

    _getVisibleDatasetWeightTotal() {
        return this._getRingWeightOffset(this.chart.data.datasets.length) || 1;
    }
};
ne.id = "doughnut";
ne.defaults = {
    datasetElementType: !1,
    dataElementType: "arc",
    animation: { animateRotate: !0, animateScale: !1 },
    animations: {
        numbers: {
            type: "number",
            properties: [
                "circumference",
                "endAngle",
                "innerRadius",
                "outerRadius",
                "startAngle",
                "x",
                "y",
                "offset",
                "borderWidth",
                "spacing",
            ],
        },
    },
    cutout: "50%",
    rotation: 0,
    circumference: 360,
    radius: "100%",
    spacing: 0,
    indexAxis: "r",
};
ne.descriptors = {
    _scriptable: (i) => i !== "spacing",
    _indexable: (i) => i !== "spacing",
};
ne.overrides = {
    aspectRatio: 1,
    plugins: {
        legend: {
            labels: {
                generateLabels(i) {
                    const t = i.data;
                    if (t.labels.length && t.datasets.length) {
                        const {
                            labels: { pointStyle: e },
                        } = i.legend.options;
                        return t.labels.map((s, n) => {
                            const o = i
                                .getDatasetMeta(0)
                                .controller.getStyle(n);
                            return {
                                text: s,
                                fillStyle: o.backgroundColor,
                                strokeStyle: o.borderColor,
                                lineWidth: o.borderWidth,
                                pointStyle: e,
                                hidden: !i.getDataVisibility(n),
                                index: n,
                            };
                        });
                    }
                    return [];
                },
            },
            onClick(i, t, e) {
                e.chart.toggleDataVisibility(t.index), e.chart.update();
            },
        },
        tooltip: {
            callbacks: {
                title() {
                    return "";
                },
                label(i) {
                    let t = i.label;
                    const e = ": " + i.formattedValue;
                    return B(t) ? ((t = t.slice()), (t[0] += e)) : (t += e), t;
                },
            },
        },
    },
};
const je = class extends gt {
    initialize() {
        (this.enableOptionSharing = !0),
            (this.supportsDecimation = !0),
            super.initialize();
    }

    update(t) {
        const e = this._cachedMeta;
        const { dataset: s, data: n = [], _dataset: r } = e;
        const o = this.chart._animationsDisabled;
        let { start: a, count: l } = Pn(e, n, o);
        (this._drawStart = a),
            (this._drawCount = l),
            Nn(e) && ((a = 0), (l = n.length)),
            (s._chart = this.chart),
            (s._datasetIndex = this.index),
            (s._decimated = !!r._decimated),
            (s.points = n);
        const c = this.resolveDatasetElementOptions(t);
        this.options.showLine || (c.borderWidth = 0),
            (c.segment = this.options.segment),
            this.updateElement(s, void 0, { animated: !o, options: c }, t),
            this.updateElements(n, a, l, t);
    }

    updateElements(t, e, s, n) {
        const r = n === "reset";
        const {
            iScale: o,
            vScale: a,
            _stacked: l,
            _dataset: c,
        } = this._cachedMeta;
        const { sharedOptions: h, includeOptions: u } = this._getSharedOptions(
            e,
            n,
        );
        const d = o.axis;
        const f = a.axis;
        const { spanGaps: m, segment: g } = this.options;
        const p = ge(m) ? m : Number.POSITIVE_INFINITY;
        const y = this.chart._animationsDisabled || r || n === "none";
        let b = e > 0 && this.getParsed(e - 1);
        for (let _ = e; _ < e + s; ++_) {
            const w = t[_];
            const x = this.getParsed(_);
            const S = y ? w : {};
            const k = P(x[f]);
            const v = (S[d] = o.getPixelForValue(x[d], _));
            const T = (S[f] =
                r || k
                    ? a.getBasePixel()
                    : a.getPixelForValue(
                          l ? this.applyStack(a, x, l) : x[f],
                          _,
                      ));
            (S.skip = isNaN(v) || isNaN(T) || k),
                (S.stop = _ > 0 && Math.abs(x[d] - b[d]) > p),
                g && ((S.parsed = x), (S.raw = c.data[_])),
                u &&
                    (S.options =
                        h ||
                        this.resolveDataElementOptions(
                            _,
                            w.active ? "active" : n,
                        )),
                y || this.updateElement(w, _, S, n),
                (b = x);
        }
    }

    getMaxOverflow() {
        const t = this._cachedMeta;
        const e = t.dataset;
        const s = (e.options && e.options.borderWidth) || 0;
        const n = t.data || [];
        if (!n.length) return s;
        const r = n[0].size(this.resolveDataElementOptions(0));
        const o = n[n.length - 1].size(
            this.resolveDataElementOptions(n.length - 1),
        );
        return Math.max(s, r, o) / 2;
    }

    draw() {
        const t = this._cachedMeta;
        t.dataset.updateControlPoints(this.chart.chartArea, t.iScale.axis),
            super.draw();
    }
};
je.id = "line";
je.defaults = {
    datasetElementType: "line",
    dataElementType: "point",
    showLine: !0,
    spanGaps: !1,
};
je.overrides = {
    scales: { _index_: { type: "category" }, _value_: { type: "linear" } },
};
const Ue = class extends gt {
    constructor(t, e) {
        super(t, e), (this.innerRadius = void 0), (this.outerRadius = void 0);
    }

    getLabelAndValue(t) {
        const e = this._cachedMeta;
        const s = this.chart;
        const n = s.data.labels || [];
        const r = ze(e._parsed[t].r, s.options.locale);
        return { label: n[t] || "", value: r };
    }

    parseObjectData(t, e, s, n) {
        return Zn.bind(this)(t, e, s, n);
    }

    update(t) {
        const e = this._cachedMeta.data;
        this._updateRadius(), this.updateElements(e, 0, e.length, t);
    }

    getMinMax() {
        const t = this._cachedMeta;
        const e = {
            min: Number.POSITIVE_INFINITY,
            max: Number.NEGATIVE_INFINITY,
        };
        return (
            t.data.forEach((s, n) => {
                const r = this.getParsed(n).r;
                !isNaN(r) &&
                    this.chart.getDataVisibility(n) &&
                    (r < e.min && (e.min = r), r > e.max && (e.max = r));
            }),
            e
        );
    }

    _updateRadius() {
        const t = this.chart;
        const e = t.chartArea;
        const s = t.options;
        const n = Math.min(e.right - e.left, e.bottom - e.top);
        const r = Math.max(n / 2, 0);
        const o = Math.max(
            s.cutoutPercentage ? (r / 100) * s.cutoutPercentage : 1,
            0,
        );
        const a = (r - o) / t.getVisibleDatasetCount();
        (this.outerRadius = r - a * this.index),
            (this.innerRadius = this.outerRadius - a);
    }

    updateElements(t, e, s, n) {
        const r = n === "reset";
        const o = this.chart;
        const l = o.options.animation;
        const c = this._cachedMeta.rScale;
        const h = c.xCenter;
        const u = c.yCenter;
        const d = c.getIndexAngle(0) - 0.5 * j;
        let f = d;
        let m;
        const g = 360 / this.countVisibleElements();
        for (m = 0; m < e; ++m) f += this._computeAngle(m, n, g);
        for (m = e; m < e + s; m++) {
            const p = t[m];
            let y = f;
            let b = f + this._computeAngle(m, n, g);
            let _ = o.getDataVisibility(m)
                ? c.getDistanceFromCenterForValue(this.getParsed(m).r)
                : 0;
            (f = b),
                r &&
                    (l.animateScale && (_ = 0), l.animateRotate && (y = b = d));
            const w = {
                x: h,
                y: u,
                innerRadius: 0,
                outerRadius: _,
                startAngle: y,
                endAngle: b,
                options: this.resolveDataElementOptions(
                    m,
                    p.active ? "active" : n,
                ),
            };
            this.updateElement(p, m, w, n);
        }
    }

    countVisibleElements() {
        const t = this._cachedMeta;
        let e = 0;
        return (
            t.data.forEach((s, n) => {
                !isNaN(this.getParsed(n).r) &&
                    this.chart.getDataVisibility(n) &&
                    e++;
            }),
            e
        );
    }

    _computeAngle(t, e, s) {
        return this.chart.getDataVisibility(t)
            ? _t(this.resolveDataElementOptions(t, e).angle || s)
            : 0;
    }
};
Ue.id = "polarArea";
Ue.defaults = {
    dataElementType: "arc",
    animation: { animateRotate: !0, animateScale: !0 },
    animations: {
        numbers: {
            type: "number",
            properties: [
                "x",
                "y",
                "startAngle",
                "endAngle",
                "innerRadius",
                "outerRadius",
            ],
        },
    },
    indexAxis: "r",
    startAngle: 0,
};
Ue.overrides = {
    aspectRatio: 1,
    plugins: {
        legend: {
            labels: {
                generateLabels(i) {
                    const t = i.data;
                    if (t.labels.length && t.datasets.length) {
                        const {
                            labels: { pointStyle: e },
                        } = i.legend.options;
                        return t.labels.map((s, n) => {
                            const o = i
                                .getDatasetMeta(0)
                                .controller.getStyle(n);
                            return {
                                text: s,
                                fillStyle: o.backgroundColor,
                                strokeStyle: o.borderColor,
                                lineWidth: o.borderWidth,
                                pointStyle: e,
                                hidden: !i.getDataVisibility(n),
                                index: n,
                            };
                        });
                    }
                    return [];
                },
            },
            onClick(i, t, e) {
                e.chart.toggleDataVisibility(t.index), e.chart.update();
            },
        },
        tooltip: {
            callbacks: {
                title() {
                    return "";
                },
                label(i) {
                    return (
                        i.chart.data.labels[i.dataIndex] +
                        ": " +
                        i.formattedValue
                    );
                },
            },
        },
    },
    scales: {
        r: {
            type: "radialLinear",
            angleLines: { display: !1 },
            beginAtZero: !0,
            grid: { circular: !0 },
            pointLabels: { display: !1 },
            startAngle: 0,
        },
    },
};
const Ii = class extends ne {};
Ii.id = "pie";
Ii.defaults = { cutout: 0, rotation: 0, circumference: 360, radius: "100%" };
const Ye = class extends gt {
    getLabelAndValue(t) {
        const e = this._cachedMeta.vScale;
        const s = this.getParsed(t);
        return {
            label: e.getLabels()[t],
            value: "" + e.getLabelForValue(s[e.axis]),
        };
    }

    parseObjectData(t, e, s, n) {
        return Zn.bind(this)(t, e, s, n);
    }

    update(t) {
        const e = this._cachedMeta;
        const s = e.dataset;
        const n = e.data || [];
        const r = e.iScale.getLabels();
        if (((s.points = n), t !== "resize")) {
            const o = this.resolveDatasetElementOptions(t);
            this.options.showLine || (o.borderWidth = 0);
            const a = {
                _loop: !0,
                _fullLoop: r.length === n.length,
                options: o,
            };
            this.updateElement(s, void 0, a, t);
        }
        this.updateElements(n, 0, n.length, t);
    }

    updateElements(t, e, s, n) {
        const r = this._cachedMeta.rScale;
        const o = n === "reset";
        for (let a = e; a < e + s; a++) {
            const l = t[a];
            const c = this.resolveDataElementOptions(
                a,
                l.active ? "active" : n,
            );
            const h = r.getPointPositionForValue(a, this.getParsed(a).r);
            const u = o ? r.xCenter : h.x;
            const d = o ? r.yCenter : h.y;
            const f = {
                x: u,
                y: d,
                angle: h.angle,
                skip: isNaN(u) || isNaN(d),
                options: c,
            };
            this.updateElement(l, a, f, n);
        }
    }
};
Ye.id = "radar";
Ye.defaults = {
    datasetElementType: "line",
    dataElementType: "point",
    indexAxis: "r",
    showLine: !0,
    elements: { line: { fill: "start" } },
};
Ye.overrides = { aspectRatio: 1, scales: { r: { type: "radialLinear" } } };
const pt = class {
    constructor() {
        (this.x = void 0),
            (this.y = void 0),
            (this.active = !1),
            (this.options = void 0),
            (this.$animations = void 0);
    }

    tooltipPosition(t) {
        const { x: e, y: s } = this.getProps(["x", "y"], t);
        return { x: e, y: s };
    }

    hasValue() {
        return ge(this.x) && ge(this.y);
    }

    getProps(t, e) {
        const s = this.$animations;
        if (!e || !s) return this;
        const n = {};
        return (
            t.forEach((r) => {
                n[r] = s[r] && s[r].active() ? s[r]._to : this[r];
            }),
            n
        );
    }
};
pt.defaults = {};
pt.defaultRoutes = void 0;
var il = {
    values(i) {
        return B(i) ? i : "" + i;
    },
    numeric(i, t, e) {
        if (i === 0) return "0";
        const s = this.chart.options.locale;
        let n;
        let r = i;
        if (e.length > 1) {
            const c = Math.max(
                Math.abs(e[0].value),
                Math.abs(e[e.length - 1].value),
            );
            (c < 1e-4 || c > 1e15) && (n = "scientific"), (r = fu(i, e));
        }
        const o = mt(Math.abs(r));
        const a = Math.max(Math.min(-1 * Math.floor(o), 20), 0);
        const l = {
            notation: n,
            minimumFractionDigits: a,
            maximumFractionDigits: a,
        };
        return Object.assign(l, this.options.ticks.format), ze(i, s, l);
    },
    logarithmic(i, t, e) {
        if (i === 0) return "0";
        const s = i / Math.pow(10, Math.floor(mt(i)));
        return s === 1 || s === 2 || s === 5
            ? il.numeric.call(this, i, t, e)
            : "";
    },
};
function fu(i, t) {
    let e = t.length > 3 ? t[2].value - t[1].value : t[1].value - t[0].value;
    return (
        Math.abs(e) >= 1 && i !== Math.floor(i) && (e = i - Math.floor(i)), e
    );
}
const Gs = { formatters: il };
A.set("scale", {
    display: !0,
    offset: !1,
    reverse: !1,
    beginAtZero: !1,
    bounds: "ticks",
    grace: 0,
    grid: {
        display: !0,
        lineWidth: 1,
        drawBorder: !0,
        drawOnChartArea: !0,
        drawTicks: !0,
        tickLength: 8,
        tickWidth: (i, t) => t.lineWidth,
        tickColor: (i, t) => t.color,
        offset: !1,
        borderDash: [],
        borderDashOffset: 0,
        borderWidth: 1,
    },
    title: { display: !1, text: "", padding: { top: 4, bottom: 4 } },
    ticks: {
        minRotation: 0,
        maxRotation: 50,
        mirror: !1,
        textStrokeWidth: 0,
        textStrokeColor: "",
        padding: 3,
        display: !0,
        autoSkip: !0,
        autoSkipPadding: 3,
        labelOffset: 0,
        callback: Gs.formatters.values,
        minor: {},
        major: {},
        align: "center",
        crossAlign: "near",
        showLabelBackdrop: !1,
        backdropColor: "rgba(255, 255, 255, 0.75)",
        backdropPadding: 2,
    },
});
A.route("scale.ticks", "color", "", "color");
A.route("scale.grid", "color", "", "borderColor");
A.route("scale.grid", "borderColor", "", "borderColor");
A.route("scale.title", "color", "", "color");
A.describe("scale", {
    _fallback: !1,
    _scriptable: (i) =>
        !i.startsWith("before") &&
        !i.startsWith("after") &&
        i !== "callback" &&
        i !== "parser",
    _indexable: (i) => i !== "borderDash" && i !== "tickBorderDash",
});
A.describe("scales", { _fallback: "scale" });
A.describe("scale.ticks", {
    _scriptable: (i) => i !== "backdropPadding" && i !== "callback",
    _indexable: (i) => i !== "backdropPadding",
});
function mu(i, t) {
    const e = i.options.ticks;
    const s = e.maxTicksLimit || gu(i);
    const n = e.major.enabled ? yu(t) : [];
    const r = n.length;
    const o = n[0];
    const a = n[r - 1];
    const l = [];
    if (r > s) return bu(t, l, n, r / s), l;
    const c = pu(n, t, s);
    if (r > 0) {
        let h;
        let u;
        const d = r > 1 ? Math.round((a - o) / (r - 1)) : null;
        for (Ns(t, l, c, P(d) ? 0 : o - d, o), h = 0, u = r - 1; h < u; h++) {
            Ns(t, l, c, n[h], n[h + 1]);
        }
        return Ns(t, l, c, a, P(d) ? t.length : a + d), l;
    }
    return Ns(t, l, c), l;
}
function gu(i) {
    const t = i.options.offset;
    const e = i._tickSize();
    const s = i._length / e + (t ? 0 : 1);
    const n = i._maxLength / e;
    return Math.floor(Math.min(s, n));
}
function pu(i, t, e) {
    const s = xu(i);
    const n = t.length / e;
    if (!s) return Math.max(n, 1);
    const r = Lo(s);
    for (let o = 0, a = r.length - 1; o < a; o++) {
        const l = r[o];
        if (l > n) return l;
    }
    return Math.max(n, 1);
}
function yu(i) {
    const t = [];
    let e;
    let s;
    for (e = 0, s = i.length; e < s; e++) i[e].major && t.push(e);
    return t;
}
function bu(i, t, e, s) {
    let n = 0;
    let r = e[0];
    let o;
    for (s = Math.ceil(s), o = 0; o < i.length; o++) {
        o === r && (t.push(i[o]), n++, (r = e[n * s]));
    }
}
function Ns(i, t, e, s, n) {
    const r = E(s, 0);
    const o = Math.min(E(n, i.length), i.length);
    let a = 0;
    let l;
    let c;
    let h;
    for (
        e = Math.ceil(e),
            n && ((l = n - s), (e = l / Math.floor(l / e))),
            h = r;
        h < 0;

    ) {
        a++, (h = Math.round(r + a * e));
    }
    for (c = Math.max(r, 0); c < o; c++) {
        c === h && (t.push(i[c]), a++, (h = Math.round(r + a * e)));
    }
}
function xu(i) {
    const t = i.length;
    let e;
    let s;
    if (t < 2) return !1;
    for (s = i[0], e = 1; e < t; ++e) if (i[e] - i[e - 1] !== s) return !1;
    return s;
}
const _u = (i) => (i === "left" ? "right" : i === "right" ? "left" : i);
const xa = (i, t, e) => (t === "top" || t === "left" ? i[t] + e : i[t] - e);
function _a(i, t) {
    const e = [];
    const s = i.length / t;
    const n = i.length;
    let r = 0;
    for (; r < n; r += s) e.push(i[Math.floor(r)]);
    return e;
}
function wu(i, t, e) {
    const s = i.ticks.length;
    const n = Math.min(t, s - 1);
    const r = i._startPixel;
    const o = i._endPixel;
    const a = 1e-6;
    let l = i.getPixelForTick(n);
    let c;
    if (
        !(
            e &&
            (s === 1
                ? (c = Math.max(l - r, o - l))
                : t === 0
                  ? (c = (i.getPixelForTick(1) - l) / 2)
                  : (c = (l - i.getPixelForTick(n - 1)) / 2),
            (l += n < t ? c : -c),
            l < r - a || l > o + a)
        )
    ) {
        return l;
    }
}
function Su(i, t) {
    V(i, (e) => {
        const s = e.gc;
        const n = s.length / 2;
        let r;
        if (n > t) {
            for (r = 0; r < n; ++r) delete e.data[s[r]];
            s.splice(0, n);
        }
    });
}
function Mi(i) {
    return i.drawTicks ? i.tickLength : 0;
}
function wa(i, t) {
    if (!i.display) return 0;
    const e = Q(i.font, t);
    const s = rt(i.padding);
    return (B(i.text) ? i.text.length : 1) * e.lineHeight + s.height;
}
function ku(i, t) {
    return Ht(i, { scale: t, type: "scale" });
}
function Mu(i, t, e) {
    return Ht(i, { tick: e, index: t, type: "tick" });
}
function Tu(i, t, e) {
    let s = Es(i);
    return ((e && t !== "right") || (!e && t === "right")) && (s = _u(s)), s;
}
function vu(i, t, e, s) {
    const { top: n, left: r, bottom: o, right: a, chart: l } = i;
    const { chartArea: c, scales: h } = l;
    let u = 0;
    let d;
    let f;
    let m;
    const g = o - n;
    const p = a - r;
    if (i.isHorizontal()) {
        if (((f = nt(s, r, a)), F(e))) {
            const y = Object.keys(e)[0];
            const b = e[y];
            m = h[y].getPixelForValue(b) + g - t;
        } else {
            e === "center"
                ? (m = (c.bottom + c.top) / 2 + g - t)
                : (m = xa(i, e, t));
        }
        d = a - r;
    } else {
        if (F(e)) {
            const y = Object.keys(e)[0];
            const b = e[y];
            f = h[y].getPixelForValue(b) - p + t;
        } else {
            e === "center"
                ? (f = (c.left + c.right) / 2 - p + t)
                : (f = xa(i, e, t));
        }
        (m = nt(s, o, n)), (u = e === "left" ? -U : U);
    }
    return { titleX: f, titleY: m, maxWidth: d, rotation: u };
}
const be = class i extends pt {
    constructor(t) {
        super(),
            (this.id = t.id),
            (this.type = t.type),
            (this.options = void 0),
            (this.ctx = t.ctx),
            (this.chart = t.chart),
            (this.top = void 0),
            (this.bottom = void 0),
            (this.left = void 0),
            (this.right = void 0),
            (this.width = void 0),
            (this.height = void 0),
            (this._margins = { left: 0, right: 0, top: 0, bottom: 0 }),
            (this.maxWidth = void 0),
            (this.maxHeight = void 0),
            (this.paddingTop = void 0),
            (this.paddingBottom = void 0),
            (this.paddingLeft = void 0),
            (this.paddingRight = void 0),
            (this.axis = void 0),
            (this.labelRotation = void 0),
            (this.min = void 0),
            (this.max = void 0),
            (this._range = void 0),
            (this.ticks = []),
            (this._gridLineItems = null),
            (this._labelItems = null),
            (this._labelSizes = null),
            (this._length = 0),
            (this._maxLength = 0),
            (this._longestTextCache = {}),
            (this._startPixel = void 0),
            (this._endPixel = void 0),
            (this._reversePixels = !1),
            (this._userMax = void 0),
            (this._userMin = void 0),
            (this._suggestedMax = void 0),
            (this._suggestedMin = void 0),
            (this._ticksLength = 0),
            (this._borderValue = 0),
            (this._cache = {}),
            (this._dataLimitsCached = !1),
            (this.$context = void 0);
    }

    init(t) {
        (this.options = t.setContext(this.getContext())),
            (this.axis = t.axis),
            (this._userMin = this.parse(t.min)),
            (this._userMax = this.parse(t.max)),
            (this._suggestedMin = this.parse(t.suggestedMin)),
            (this._suggestedMax = this.parse(t.suggestedMax));
    }

    parse(t, e) {
        return t;
    }

    getUserBounds() {
        let {
            _userMin: t,
            _userMax: e,
            _suggestedMin: s,
            _suggestedMax: n,
        } = this;
        return (
            (t = ft(t, Number.POSITIVE_INFINITY)),
            (e = ft(e, Number.NEGATIVE_INFINITY)),
            (s = ft(s, Number.POSITIVE_INFINITY)),
            (n = ft(n, Number.NEGATIVE_INFINITY)),
            { min: ft(t, s), max: ft(e, n), minDefined: q(t), maxDefined: q(e) }
        );
    }

    getMinMax(t) {
        let {
            min: e,
            max: s,
            minDefined: n,
            maxDefined: r,
        } = this.getUserBounds();
        let o;
        if (n && r) return { min: e, max: s };
        const a = this.getMatchingVisibleMetas();
        for (let l = 0, c = a.length; l < c; ++l) {
            (o = a[l].controller.getMinMax(this, t)),
                n || (e = Math.min(e, o.min)),
                r || (s = Math.max(s, o.max));
        }
        return (
            (e = r && e > s ? s : e),
            (s = n && e > s ? e : s),
            { min: ft(e, ft(s, e)), max: ft(s, ft(e, s)) }
        );
    }

    getPadding() {
        return {
            left: this.paddingLeft || 0,
            top: this.paddingTop || 0,
            right: this.paddingRight || 0,
            bottom: this.paddingBottom || 0,
        };
    }

    getTicks() {
        return this.ticks;
    }

    getLabels() {
        const t = this.chart.data;
        return (
            this.options.labels ||
            (this.isHorizontal() ? t.xLabels : t.yLabels) ||
            t.labels ||
            []
        );
    }

    beforeLayout() {
        (this._cache = {}), (this._dataLimitsCached = !1);
    }

    beforeUpdate() {
        $(this.options.beforeUpdate, [this]);
    }

    update(t, e, s) {
        const { beginAtZero: n, grace: r, ticks: o } = this.options;
        const a = o.sampleSize;
        this.beforeUpdate(),
            (this.maxWidth = t),
            (this.maxHeight = e),
            (this._margins = s =
                Object.assign({ left: 0, right: 0, top: 0, bottom: 0 }, s)),
            (this.ticks = null),
            (this._labelSizes = null),
            (this._gridLineItems = null),
            (this._labelItems = null),
            this.beforeSetDimensions(),
            this.setDimensions(),
            this.afterSetDimensions(),
            (this._maxLength = this.isHorizontal()
                ? this.width + s.left + s.right
                : this.height + s.top + s.bottom),
            this._dataLimitsCached ||
                (this.beforeDataLimits(),
                this.determineDataLimits(),
                this.afterDataLimits(),
                (this._range = Ko(this, r, n)),
                (this._dataLimitsCached = !0)),
            this.beforeBuildTicks(),
            (this.ticks = this.buildTicks() || []),
            this.afterBuildTicks();
        const l = a < this.ticks.length;
        this._convertTicksToLabels(l ? _a(this.ticks, a) : this.ticks),
            this.configure(),
            this.beforeCalculateLabelRotation(),
            this.calculateLabelRotation(),
            this.afterCalculateLabelRotation(),
            o.display &&
                (o.autoSkip || o.source === "auto") &&
                ((this.ticks = mu(this, this.ticks)),
                (this._labelSizes = null),
                this.afterAutoSkip()),
            l && this._convertTicksToLabels(this.ticks),
            this.beforeFit(),
            this.fit(),
            this.afterFit(),
            this.afterUpdate();
    }

    configure() {
        let t = this.options.reverse;
        let e;
        let s;
        this.isHorizontal()
            ? ((e = this.left), (s = this.right))
            : ((e = this.top), (s = this.bottom), (t = !t)),
            (this._startPixel = e),
            (this._endPixel = s),
            (this._reversePixels = t),
            (this._length = s - e),
            (this._alignToPixels = this.options.alignToPixels);
    }

    afterUpdate() {
        $(this.options.afterUpdate, [this]);
    }

    beforeSetDimensions() {
        $(this.options.beforeSetDimensions, [this]);
    }

    setDimensions() {
        this.isHorizontal()
            ? ((this.width = this.maxWidth),
              (this.left = 0),
              (this.right = this.width))
            : ((this.height = this.maxHeight),
              (this.top = 0),
              (this.bottom = this.height)),
            (this.paddingLeft = 0),
            (this.paddingTop = 0),
            (this.paddingRight = 0),
            (this.paddingBottom = 0);
    }

    afterSetDimensions() {
        $(this.options.afterSetDimensions, [this]);
    }

    _callHooks(t) {
        this.chart.notifyPlugins(t, this.getContext()),
            $(this.options[t], [this]);
    }

    beforeDataLimits() {
        this._callHooks("beforeDataLimits");
    }

    determineDataLimits() {}
    afterDataLimits() {
        this._callHooks("afterDataLimits");
    }

    beforeBuildTicks() {
        this._callHooks("beforeBuildTicks");
    }

    buildTicks() {
        return [];
    }

    afterBuildTicks() {
        this._callHooks("afterBuildTicks");
    }

    beforeTickToLabelConversion() {
        $(this.options.beforeTickToLabelConversion, [this]);
    }

    generateTickLabels(t) {
        const e = this.options.ticks;
        let s;
        let n;
        let r;
        for (s = 0, n = t.length; s < n; s++) {
            (r = t[s]), (r.label = $(e.callback, [r.value, s, t], this));
        }
    }

    afterTickToLabelConversion() {
        $(this.options.afterTickToLabelConversion, [this]);
    }

    beforeCalculateLabelRotation() {
        $(this.options.beforeCalculateLabelRotation, [this]);
    }

    calculateLabelRotation() {
        const t = this.options;
        const e = t.ticks;
        const s = this.ticks.length;
        const n = e.minRotation || 0;
        const r = e.maxRotation;
        let o = n;
        let a;
        let l;
        let c;
        if (
            !this._isVisible() ||
            !e.display ||
            n >= r ||
            s <= 1 ||
            !this.isHorizontal()
        ) {
            this.labelRotation = n;
            return;
        }
        const h = this._getLabelSizes();
        const u = h.widest.width;
        const d = h.highest.height;
        const f = tt(this.chart.width - u, 0, this.maxWidth);
        (a = t.offset ? this.maxWidth / s : f / (s - 1)),
            u + 6 > a &&
                ((a = f / (s - (t.offset ? 0.5 : 1))),
                (l =
                    this.maxHeight -
                    Mi(t.grid) -
                    e.padding -
                    wa(t.title, this.chart.options.font)),
                (c = Math.sqrt(u * u + d * d)),
                (o = Os(
                    Math.min(
                        Math.asin(tt((h.highest.height + 6) / a, -1, 1)),
                        Math.asin(tt(l / c, -1, 1)) -
                            Math.asin(tt(d / c, -1, 1)),
                    ),
                )),
                (o = Math.max(n, Math.min(r, o)))),
            (this.labelRotation = o);
    }

    afterCalculateLabelRotation() {
        $(this.options.afterCalculateLabelRotation, [this]);
    }

    afterAutoSkip() {}
    beforeFit() {
        $(this.options.beforeFit, [this]);
    }

    fit() {
        const t = { width: 0, height: 0 };
        const {
            chart: e,
            options: { ticks: s, title: n, grid: r },
        } = this;
        const o = this._isVisible();
        const a = this.isHorizontal();
        if (o) {
            const l = wa(n, e.options.font);
            if (
                (a
                    ? ((t.width = this.maxWidth), (t.height = Mi(r) + l))
                    : ((t.height = this.maxHeight), (t.width = Mi(r) + l)),
                s.display && this.ticks.length)
            ) {
                const {
                    first: c,
                    last: h,
                    widest: u,
                    highest: d,
                } = this._getLabelSizes();
                const f = s.padding * 2;
                const m = _t(this.labelRotation);
                const g = Math.cos(m);
                const p = Math.sin(m);
                if (a) {
                    const y = s.mirror ? 0 : p * u.width + g * d.height;
                    t.height = Math.min(this.maxHeight, t.height + y + f);
                } else {
                    const y = s.mirror ? 0 : g * u.width + p * d.height;
                    t.width = Math.min(this.maxWidth, t.width + y + f);
                }
                this._calculatePadding(c, h, p, g);
            }
        }
        this._handleMargins(),
            a
                ? ((this.width = this._length =
                      e.width - this._margins.left - this._margins.right),
                  (this.height = t.height))
                : ((this.width = t.width),
                  (this.height = this._length =
                      e.height - this._margins.top - this._margins.bottom));
    }

    _calculatePadding(t, e, s, n) {
        const {
            ticks: { align: r, padding: o },
            position: a,
        } = this.options;
        const l = this.labelRotation !== 0;
        const c = a !== "top" && this.axis === "x";
        if (this.isHorizontal()) {
            const h = this.getPixelForTick(0) - this.left;
            const u = this.right - this.getPixelForTick(this.ticks.length - 1);
            let d = 0;
            let f = 0;
            l
                ? c
                    ? ((d = n * t.width), (f = s * e.height))
                    : ((d = s * t.height), (f = n * e.width))
                : r === "start"
                  ? (f = e.width)
                  : r === "end"
                    ? (d = t.width)
                    : r !== "inner" && ((d = t.width / 2), (f = e.width / 2)),
                (this.paddingLeft = Math.max(
                    ((d - h + o) * this.width) / (this.width - h),
                    0,
                )),
                (this.paddingRight = Math.max(
                    ((f - u + o) * this.width) / (this.width - u),
                    0,
                ));
        } else {
            let h = e.height / 2;
            let u = t.height / 2;
            r === "start"
                ? ((h = 0), (u = t.height))
                : r === "end" && ((h = e.height), (u = 0)),
                (this.paddingTop = h + o),
                (this.paddingBottom = u + o);
        }
    }

    _handleMargins() {
        this._margins &&
            ((this._margins.left = Math.max(
                this.paddingLeft,
                this._margins.left,
            )),
            (this._margins.top = Math.max(this.paddingTop, this._margins.top)),
            (this._margins.right = Math.max(
                this.paddingRight,
                this._margins.right,
            )),
            (this._margins.bottom = Math.max(
                this.paddingBottom,
                this._margins.bottom,
            )));
    }

    afterFit() {
        $(this.options.afterFit, [this]);
    }

    isHorizontal() {
        const { axis: t, position: e } = this.options;
        return e === "top" || e === "bottom" || t === "x";
    }

    isFullSize() {
        return this.options.fullSize;
    }

    _convertTicksToLabels(t) {
        this.beforeTickToLabelConversion(), this.generateTickLabels(t);
        let e, s;
        for (e = 0, s = t.length; e < s; e++) {
            P(t[e].label) && (t.splice(e, 1), s--, e--);
        }
        this.afterTickToLabelConversion();
    }

    _getLabelSizes() {
        let t = this._labelSizes;
        if (!t) {
            const e = this.options.ticks.sampleSize;
            let s = this.ticks;
            e < s.length && (s = _a(s, e)),
                (this._labelSizes = t = this._computeLabelSizes(s, s.length));
        }
        return t;
    }

    _computeLabelSizes(t, e) {
        const { ctx: s, _longestTextCache: n } = this;
        const r = [];
        const o = [];
        let a = 0;
        let l = 0;
        let c;
        let h;
        let u;
        let d;
        let f;
        let m;
        let g;
        let p;
        let y;
        let b;
        let _;
        for (c = 0; c < e; ++c) {
            if (
                ((d = t[c].label),
                (f = this._resolveTickFontOptions(c)),
                (s.font = m = f.string),
                (g = n[m] = n[m] || { data: {}, gc: [] }),
                (p = f.lineHeight),
                (y = b = 0),
                !P(d) && !B(d))
            ) {
                (y = bi(s, g.data, g.gc, y, d)), (b = p);
            } else if (B(d)) {
                for (h = 0, u = d.length; h < u; ++h) {
                    (_ = d[h]),
                        !P(_) &&
                            !B(_) &&
                            ((y = bi(s, g.data, g.gc, y, _)), (b += p));
                }
            }
            r.push(y), o.push(b), (a = Math.max(y, a)), (l = Math.max(b, l));
        }
        Su(n, e);
        const w = r.indexOf(a);
        const x = o.indexOf(l);
        const S = (k) => ({ width: r[k] || 0, height: o[k] || 0 });
        return {
            first: S(0),
            last: S(e - 1),
            widest: S(w),
            highest: S(x),
            widths: r,
            heights: o,
        };
    }

    getLabelForValue(t) {
        return t;
    }

    getPixelForValue(t, e) {
        return NaN;
    }

    getValueForPixel(t) {}
    getPixelForTick(t) {
        const e = this.ticks;
        return t < 0 || t > e.length - 1
            ? null
            : this.getPixelForValue(e[t].value);
    }

    getPixelForDecimal(t) {
        this._reversePixels && (t = 1 - t);
        const e = this._startPixel + t * this._length;
        return No(this._alignToPixels ? Jt(this.chart, e, 0) : e);
    }

    getDecimalForPixel(t) {
        const e = (t - this._startPixel) / this._length;
        return this._reversePixels ? 1 - e : e;
    }

    getBasePixel() {
        return this.getPixelForValue(this.getBaseValue());
    }

    getBaseValue() {
        const { min: t, max: e } = this;
        return t < 0 && e < 0 ? e : t > 0 && e > 0 ? t : 0;
    }

    getContext(t) {
        const e = this.ticks || [];
        if (t >= 0 && t < e.length) {
            const s = e[t];
            return s.$context || (s.$context = Mu(this.getContext(), t, s));
        }
        return (
            this.$context || (this.$context = ku(this.chart.getContext(), this))
        );
    }

    _tickSize() {
        const t = this.options.ticks;
        const e = _t(this.labelRotation);
        const s = Math.abs(Math.cos(e));
        const n = Math.abs(Math.sin(e));
        const r = this._getLabelSizes();
        const o = t.autoSkipPadding || 0;
        const a = r ? r.widest.width + o : 0;
        const l = r ? r.highest.height + o : 0;
        return this.isHorizontal()
            ? l * s > a * n
                ? a / s
                : l / n
            : l * n < a * s
              ? l / s
              : a / n;
    }

    _isVisible() {
        const t = this.options.display;
        return t !== "auto" ? !!t : this.getMatchingVisibleMetas().length > 0;
    }

    _computeGridLineItems(t) {
        const e = this.axis;
        const s = this.chart;
        const n = this.options;
        const { grid: r, position: o } = n;
        const a = r.offset;
        const l = this.isHorizontal();
        const h = this.ticks.length + (a ? 1 : 0);
        const u = Mi(r);
        const d = [];
        const f = r.setContext(this.getContext());
        const m = f.drawBorder ? f.borderWidth : 0;
        const g = m / 2;
        const p = function (D) {
            return Jt(s, D, m);
        };
        let y;
        let b;
        let _;
        let w;
        let x;
        let S;
        let k;
        let v;
        let T;
        let C;
        let N;
        let L;
        if (o === "top") {
            (y = p(this.bottom)),
                (S = this.bottom - u),
                (v = y - g),
                (C = p(t.top) + g),
                (L = t.bottom);
        } else if (o === "bottom") {
            (y = p(this.top)),
                (C = t.top),
                (L = p(t.bottom) - g),
                (S = y + g),
                (v = this.top + u);
        } else if (o === "left") {
            (y = p(this.right)),
                (x = this.right - u),
                (k = y - g),
                (T = p(t.left) + g),
                (N = t.right);
        } else if (o === "right") {
            (y = p(this.left)),
                (T = t.left),
                (N = p(t.right) - g),
                (x = y + g),
                (k = this.left + u);
        } else if (e === "x") {
            if (o === "center") y = p((t.top + t.bottom) / 2 + 0.5);
            else if (F(o)) {
                const D = Object.keys(o)[0];
                const J = o[D];
                y = p(this.chart.scales[D].getPixelForValue(J));
            }
            (C = t.top), (L = t.bottom), (S = y + g), (v = S + u);
        } else if (e === "y") {
            if (o === "center") y = p((t.left + t.right) / 2);
            else if (F(o)) {
                const D = Object.keys(o)[0];
                const J = o[D];
                y = p(this.chart.scales[D].getPixelForValue(J));
            }
            (x = y - g), (k = x - u), (T = t.left), (N = t.right);
        }
        const K = E(n.ticks.maxTicksLimit, h);
        const lt = Math.max(1, Math.ceil(h / K));
        for (b = 0; b < h; b += lt) {
            const D = r.setContext(this.getContext(b));
            const J = D.lineWidth;
            const X = D.color;
            const de = D.borderDash || [];
            const mn = D.borderDashOffset;
            const Oe = D.tickWidth;
            const ps = D.tickColor;
            const De = D.tickBorderDash || [];
            const mi = D.tickBorderDashOffset;
            (_ = wu(this, b, a)),
                _ !== void 0 &&
                    ((w = Jt(s, _, J)),
                    l ? (x = k = T = N = w) : (S = v = C = L = w),
                    d.push({
                        tx1: x,
                        ty1: S,
                        tx2: k,
                        ty2: v,
                        x1: T,
                        y1: C,
                        x2: N,
                        y2: L,
                        width: J,
                        color: X,
                        borderDash: de,
                        borderDashOffset: mn,
                        tickWidth: Oe,
                        tickColor: ps,
                        tickBorderDash: De,
                        tickBorderDashOffset: mi,
                    }));
        }
        return (this._ticksLength = h), (this._borderValue = y), d;
    }

    _computeLabelItems(t) {
        const e = this.axis;
        const s = this.options;
        const { position: n, ticks: r } = s;
        const o = this.isHorizontal();
        const a = this.ticks;
        const { align: l, crossAlign: c, padding: h, mirror: u } = r;
        const d = Mi(s.grid);
        const f = d + h;
        const m = u ? -h : f;
        const g = -_t(this.labelRotation);
        const p = [];
        let y;
        let b;
        let _;
        let w;
        let x;
        let S;
        let k;
        let v;
        let T;
        let C;
        let N;
        let L;
        let K = "middle";
        if (n === "top") {
            (S = this.bottom - m), (k = this._getXAxisLabelAlignment());
        } else if (n === "bottom") {
            (S = this.top + m), (k = this._getXAxisLabelAlignment());
        } else if (n === "left") {
            const D = this._getYAxisLabelAlignment(d);
            (k = D.textAlign), (x = D.x);
        } else if (n === "right") {
            const D = this._getYAxisLabelAlignment(d);
            (k = D.textAlign), (x = D.x);
        } else if (e === "x") {
            if (n === "center") S = (t.top + t.bottom) / 2 + f;
            else if (F(n)) {
                const D = Object.keys(n)[0];
                const J = n[D];
                S = this.chart.scales[D].getPixelForValue(J) + f;
            }
            k = this._getXAxisLabelAlignment();
        } else if (e === "y") {
            if (n === "center") x = (t.left + t.right) / 2 - f;
            else if (F(n)) {
                const D = Object.keys(n)[0];
                const J = n[D];
                x = this.chart.scales[D].getPixelForValue(J);
            }
            k = this._getYAxisLabelAlignment(d).textAlign;
        }
        e === "y" &&
            (l === "start" ? (K = "top") : l === "end" && (K = "bottom"));
        const lt = this._getLabelSizes();
        for (y = 0, b = a.length; y < b; ++y) {
            (_ = a[y]), (w = _.label);
            const D = r.setContext(this.getContext(y));
            (v = this.getPixelForTick(y) + r.labelOffset),
                (T = this._resolveTickFontOptions(y)),
                (C = T.lineHeight),
                (N = B(w) ? w.length : 1);
            const J = N / 2;
            const X = D.color;
            const de = D.textStrokeColor;
            const mn = D.textStrokeWidth;
            let Oe = k;
            o
                ? ((x = v),
                  k === "inner" &&
                      (y === b - 1
                          ? (Oe = this.options.reverse ? "left" : "right")
                          : y === 0
                            ? (Oe = this.options.reverse ? "right" : "left")
                            : (Oe = "center")),
                  n === "top"
                      ? c === "near" || g !== 0
                          ? (L = -N * C + C / 2)
                          : c === "center"
                            ? (L = -lt.highest.height / 2 - J * C + C)
                            : (L = -lt.highest.height + C / 2)
                      : c === "near" || g !== 0
                        ? (L = C / 2)
                        : c === "center"
                          ? (L = lt.highest.height / 2 - J * C)
                          : (L = lt.highest.height - N * C),
                  u && (L *= -1))
                : ((S = v), (L = ((1 - N) * C) / 2));
            let ps;
            if (D.showLabelBackdrop) {
                const De = rt(D.backdropPadding);
                const mi = lt.heights[y];
                const gn = lt.widths[y];
                let pn = S + L - De.top;
                let yn = x - De.left;
                switch (K) {
                    case "middle":
                        pn -= mi / 2;
                        break;
                    case "bottom":
                        pn -= mi;
                        break;
                }
                switch (k) {
                    case "center":
                        yn -= gn / 2;
                        break;
                    case "right":
                        yn -= gn;
                        break;
                }
                ps = {
                    left: yn,
                    top: pn,
                    width: gn + De.width,
                    height: mi + De.height,
                    color: D.backdropColor,
                };
            }
            p.push({
                rotation: g,
                label: w,
                font: T,
                color: X,
                strokeColor: de,
                strokeWidth: mn,
                textOffset: L,
                textAlign: Oe,
                textBaseline: K,
                translation: [x, S],
                backdrop: ps,
            });
        }
        return p;
    }

    _getXAxisLabelAlignment() {
        const { position: t, ticks: e } = this.options;
        if (-_t(this.labelRotation)) return t === "top" ? "left" : "right";
        let n = "center";
        return (
            e.align === "start"
                ? (n = "left")
                : e.align === "end"
                  ? (n = "right")
                  : e.align === "inner" && (n = "inner"),
            n
        );
    }

    _getYAxisLabelAlignment(t) {
        const {
            position: e,
            ticks: { crossAlign: s, mirror: n, padding: r },
        } = this.options;
        const o = this._getLabelSizes();
        const a = t + r;
        const l = o.widest.width;
        let c;
        let h;
        return (
            e === "left"
                ? n
                    ? ((h = this.right + r),
                      s === "near"
                          ? (c = "left")
                          : s === "center"
                            ? ((c = "center"), (h += l / 2))
                            : ((c = "right"), (h += l)))
                    : ((h = this.right - a),
                      s === "near"
                          ? (c = "right")
                          : s === "center"
                            ? ((c = "center"), (h -= l / 2))
                            : ((c = "left"), (h = this.left)))
                : e === "right"
                  ? n
                      ? ((h = this.left + r),
                        s === "near"
                            ? (c = "right")
                            : s === "center"
                              ? ((c = "center"), (h -= l / 2))
                              : ((c = "left"), (h -= l)))
                      : ((h = this.left + a),
                        s === "near"
                            ? (c = "left")
                            : s === "center"
                              ? ((c = "center"), (h += l / 2))
                              : ((c = "right"), (h = this.right)))
                  : (c = "right"),
            { textAlign: c, x: h }
        );
    }

    _computeLabelArea() {
        if (this.options.ticks.mirror) return;
        const t = this.chart;
        const e = this.options.position;
        if (e === "left" || e === "right") {
            return {
                top: 0,
                left: this.left,
                bottom: t.height,
                right: this.right,
            };
        }
        if (e === "top" || e === "bottom") {
            return {
                top: this.top,
                left: 0,
                bottom: this.bottom,
                right: t.width,
            };
        }
    }

    drawBackground() {
        const {
            ctx: t,
            options: { backgroundColor: e },
            left: s,
            top: n,
            width: r,
            height: o,
        } = this;
        e && (t.save(), (t.fillStyle = e), t.fillRect(s, n, r, o), t.restore());
    }

    getLineWidthForValue(t) {
        const e = this.options.grid;
        if (!this._isVisible() || !e.display) return 0;
        const n = this.ticks.findIndex((r) => r.value === t);
        return n >= 0 ? e.setContext(this.getContext(n)).lineWidth : 0;
    }

    drawGrid(t) {
        const e = this.options.grid;
        const s = this.ctx;
        const n =
            this._gridLineItems ||
            (this._gridLineItems = this._computeGridLineItems(t));
        let r;
        let o;
        const a = (l, c, h) => {
            !h.width ||
                !h.color ||
                (s.save(),
                (s.lineWidth = h.width),
                (s.strokeStyle = h.color),
                s.setLineDash(h.borderDash || []),
                (s.lineDashOffset = h.borderDashOffset),
                s.beginPath(),
                s.moveTo(l.x, l.y),
                s.lineTo(c.x, c.y),
                s.stroke(),
                s.restore());
        };
        if (e.display) {
            for (r = 0, o = n.length; r < o; ++r) {
                const l = n[r];
                e.drawOnChartArea &&
                    a({ x: l.x1, y: l.y1 }, { x: l.x2, y: l.y2 }, l),
                    e.drawTicks &&
                        a(
                            { x: l.tx1, y: l.ty1 },
                            { x: l.tx2, y: l.ty2 },
                            {
                                color: l.tickColor,
                                width: l.tickWidth,
                                borderDash: l.tickBorderDash,
                                borderDashOffset: l.tickBorderDashOffset,
                            },
                        );
            }
        }
    }

    drawBorder() {
        const {
            chart: t,
            ctx: e,
            options: { grid: s },
        } = this;
        const n = s.setContext(this.getContext());
        const r = s.drawBorder ? n.borderWidth : 0;
        if (!r) return;
        const o = s.setContext(this.getContext(0)).lineWidth;
        const a = this._borderValue;
        let l;
        let c;
        let h;
        let u;
        this.isHorizontal()
            ? ((l = Jt(t, this.left, r) - r / 2),
              (c = Jt(t, this.right, o) + o / 2),
              (h = u = a))
            : ((h = Jt(t, this.top, r) - r / 2),
              (u = Jt(t, this.bottom, o) + o / 2),
              (l = c = a)),
            e.save(),
            (e.lineWidth = n.borderWidth),
            (e.strokeStyle = n.borderColor),
            e.beginPath(),
            e.moveTo(l, h),
            e.lineTo(c, u),
            e.stroke(),
            e.restore();
    }

    drawLabels(t) {
        if (!this.options.ticks.display) return;
        const s = this.ctx;
        const n = this._computeLabelArea();
        n && wi(s, n);
        const r =
            this._labelItems || (this._labelItems = this._computeLabelItems(t));
        let o;
        let a;
        for (o = 0, a = r.length; o < a; ++o) {
            const l = r[o];
            const c = l.font;
            const h = l.label;
            l.backdrop &&
                ((s.fillStyle = l.backdrop.color),
                s.fillRect(
                    l.backdrop.left,
                    l.backdrop.top,
                    l.backdrop.width,
                    l.backdrop.height,
                ));
            const u = l.textOffset;
            Qt(s, h, 0, u, c, l);
        }
        n && Si(s);
    }

    drawTitle() {
        const {
            ctx: t,
            options: { position: e, title: s, reverse: n },
        } = this;
        if (!s.display) return;
        const r = Q(s.font);
        const o = rt(s.padding);
        const a = s.align;
        let l = r.lineHeight / 2;
        e === "bottom" || e === "center" || F(e)
            ? ((l += o.bottom),
              B(s.text) && (l += r.lineHeight * (s.text.length - 1)))
            : (l += o.top);
        const {
            titleX: c,
            titleY: h,
            maxWidth: u,
            rotation: d,
        } = vu(this, l, e, a);
        Qt(t, s.text, 0, 0, r, {
            color: s.color,
            maxWidth: u,
            rotation: d,
            textAlign: Tu(a, e, n),
            textBaseline: "middle",
            translation: [c, h],
        });
    }

    draw(t) {
        this._isVisible() &&
            (this.drawBackground(),
            this.drawGrid(t),
            this.drawBorder(),
            this.drawTitle(),
            this.drawLabels(t));
    }

    _layers() {
        const t = this.options;
        const e = (t.ticks && t.ticks.z) || 0;
        const s = E(t.grid && t.grid.z, -1);
        return !this._isVisible() || this.draw !== i.prototype.draw
            ? [
                  {
                      z: e,
                      draw: (n) => {
                          this.draw(n);
                      },
                  },
              ]
            : [
                  {
                      z: s,
                      draw: (n) => {
                          this.drawBackground(),
                              this.drawGrid(n),
                              this.drawTitle();
                      },
                  },
                  {
                      z: s + 1,
                      draw: () => {
                          this.drawBorder();
                      },
                  },
                  {
                      z: e,
                      draw: (n) => {
                          this.drawLabels(n);
                      },
                  },
              ];
    }

    getMatchingVisibleMetas(t) {
        const e = this.chart.getSortedVisibleDatasetMetas();
        const s = this.axis + "AxisID";
        const n = [];
        let r;
        let o;
        for (r = 0, o = e.length; r < o; ++r) {
            const a = e[r];
            a[s] === this.id && (!t || a.type === t) && n.push(a);
        }
        return n;
    }

    _resolveTickFontOptions(t) {
        const e = this.options.ticks.setContext(this.getContext(t));
        return Q(e.font);
    }

    _maxDigits() {
        const t = this._resolveTickFontOptions(0).lineHeight;
        return (this.isHorizontal() ? this.width : this.height) / t;
    }
};
const He = class {
    constructor(t, e, s) {
        (this.type = t),
            (this.scope = e),
            (this.override = s),
            (this.items = Object.create(null));
    }

    isForType(t) {
        return Object.prototype.isPrototypeOf.call(
            this.type.prototype,
            t.prototype,
        );
    }

    register(t) {
        const e = Object.getPrototypeOf(t);
        let s;
        Eu(e) && (s = this.register(e));
        const n = this.items;
        const r = t.id;
        const o = this.scope + "." + r;
        if (!r) throw new Error("class does not have id: " + t);
        return (
            r in n ||
                ((n[r] = t),
                Ou(t, o, s),
                this.override && A.override(t.id, t.overrides)),
            o
        );
    }

    get(t) {
        return this.items[t];
    }

    unregister(t) {
        const e = this.items;
        const s = t.id;
        const n = this.scope;
        s in e && delete e[s],
            n && s in A[n] && (delete A[n][s], this.override && delete Kt[s]);
    }
};
function Ou(i, t, e) {
    const s = Ce(Object.create(null), [
        e ? A.get(e) : {},
        A.get(t),
        i.defaults,
    ]);
    A.set(t, s),
        i.defaultRoutes && Du(t, i.defaultRoutes),
        i.descriptors && A.describe(t, i.descriptors);
}
function Du(i, t) {
    Object.keys(t).forEach((e) => {
        const s = e.split(".");
        const n = s.pop();
        const r = [i].concat(s).join(".");
        const o = t[e].split(".");
        const a = o.pop();
        const l = o.join(".");
        A.route(r, n, l, a);
    });
}
function Eu(i) {
    return "id" in i && "defaults" in i;
}
const dr = class {
    constructor() {
        (this.controllers = new He(gt, "datasets", !0)),
            (this.elements = new He(pt, "elements")),
            (this.plugins = new He(Object, "plugins")),
            (this.scales = new He(be, "scales")),
            (this._typedRegistries = [
                this.controllers,
                this.scales,
                this.elements,
            ]);
    }

    add(...t) {
        this._each("register", t);
    }

    remove(...t) {
        this._each("unregister", t);
    }

    addControllers(...t) {
        this._each("register", t, this.controllers);
    }

    addElements(...t) {
        this._each("register", t, this.elements);
    }

    addPlugins(...t) {
        this._each("register", t, this.plugins);
    }

    addScales(...t) {
        this._each("register", t, this.scales);
    }

    getController(t) {
        return this._get(t, this.controllers, "controller");
    }

    getElement(t) {
        return this._get(t, this.elements, "element");
    }

    getPlugin(t) {
        return this._get(t, this.plugins, "plugin");
    }

    getScale(t) {
        return this._get(t, this.scales, "scale");
    }

    removeControllers(...t) {
        this._each("unregister", t, this.controllers);
    }

    removeElements(...t) {
        this._each("unregister", t, this.elements);
    }

    removePlugins(...t) {
        this._each("unregister", t, this.plugins);
    }

    removeScales(...t) {
        this._each("unregister", t, this.scales);
    }

    _each(t, e, s) {
        [...e].forEach((n) => {
            const r = s || this._getRegistryForType(n);
            s || r.isForType(n) || (r === this.plugins && n.id)
                ? this._exec(t, r, n)
                : V(n, (o) => {
                      const a = s || this._getRegistryForType(o);
                      this._exec(t, a, o);
                  });
        });
    }

    _exec(t, e, s) {
        const n = vs(t);
        $(s["before" + n], [], s), e[t](s), $(s["after" + n], [], s);
    }

    _getRegistryForType(t) {
        for (let e = 0; e < this._typedRegistries.length; e++) {
            const s = this._typedRegistries[e];
            if (s.isForType(t)) return s;
        }
        return this.plugins;
    }

    _get(t, e, s) {
        const n = e.get(t);
        if (n === void 0) {
            throw new Error('"' + t + '" is not a registered ' + s + ".");
        }
        return n;
    }
};
const Pt = new dr();
const Ze = class extends gt {
    update(t) {
        const e = this._cachedMeta;
        const { data: s = [] } = e;
        const n = this.chart._animationsDisabled;
        let { start: r, count: o } = Pn(e, s, n);
        if (
            ((this._drawStart = r),
            (this._drawCount = o),
            Nn(e) && ((r = 0), (o = s.length)),
            this.options.showLine)
        ) {
            const { dataset: a, _dataset: l } = e;
            (a._chart = this.chart),
                (a._datasetIndex = this.index),
                (a._decimated = !!l._decimated),
                (a.points = s);
            const c = this.resolveDatasetElementOptions(t);
            (c.segment = this.options.segment),
                this.updateElement(a, void 0, { animated: !n, options: c }, t);
        }
        this.updateElements(s, r, o, t);
    }

    addElements() {
        const { showLine: t } = this.options;
        !this.datasetElementType &&
            t &&
            (this.datasetElementType = Pt.getElement("line")),
            super.addElements();
    }

    updateElements(t, e, s, n) {
        const r = n === "reset";
        const {
            iScale: o,
            vScale: a,
            _stacked: l,
            _dataset: c,
        } = this._cachedMeta;
        const h = this.resolveDataElementOptions(e, n);
        const u = this.getSharedOptions(h);
        const d = this.includeOptions(n, u);
        const f = o.axis;
        const m = a.axis;
        const { spanGaps: g, segment: p } = this.options;
        const y = ge(g) ? g : Number.POSITIVE_INFINITY;
        const b = this.chart._animationsDisabled || r || n === "none";
        let _ = e > 0 && this.getParsed(e - 1);
        for (let w = e; w < e + s; ++w) {
            const x = t[w];
            const S = this.getParsed(w);
            const k = b ? x : {};
            const v = P(S[m]);
            const T = (k[f] = o.getPixelForValue(S[f], w));
            const C = (k[m] =
                r || v
                    ? a.getBasePixel()
                    : a.getPixelForValue(
                          l ? this.applyStack(a, S, l) : S[m],
                          w,
                      ));
            (k.skip = isNaN(T) || isNaN(C) || v),
                (k.stop = w > 0 && Math.abs(S[f] - _[f]) > y),
                p && ((k.parsed = S), (k.raw = c.data[w])),
                d &&
                    (k.options =
                        u ||
                        this.resolveDataElementOptions(
                            w,
                            x.active ? "active" : n,
                        )),
                b || this.updateElement(x, w, k, n),
                (_ = S);
        }
        this.updateSharedOptions(u, n, h);
    }

    getMaxOverflow() {
        const t = this._cachedMeta;
        const e = t.data || [];
        if (!this.options.showLine) {
            let a = 0;
            for (let l = e.length - 1; l >= 0; --l) {
                a = Math.max(
                    a,
                    e[l].size(this.resolveDataElementOptions(l)) / 2,
                );
            }
            return a > 0 && a;
        }
        const s = t.dataset;
        const n = (s.options && s.options.borderWidth) || 0;
        if (!e.length) return n;
        const r = e[0].size(this.resolveDataElementOptions(0));
        const o = e[e.length - 1].size(
            this.resolveDataElementOptions(e.length - 1),
        );
        return Math.max(n, r, o) / 2;
    }
};
Ze.id = "scatter";
Ze.defaults = {
    datasetElementType: !1,
    dataElementType: "point",
    showLine: !1,
    fill: !1,
};
Ze.overrides = {
    interaction: { mode: "point" },
    plugins: {
        tooltip: {
            callbacks: {
                title() {
                    return "";
                },
                label(i) {
                    return "(" + i.label + ", " + i.formattedValue + ")";
                },
            },
        },
    },
    scales: { x: { type: "linear" }, y: { type: "linear" } },
};
const Iu = Object.freeze({
    __proto__: null,
    BarController: Be,
    BubbleController: $e,
    DoughnutController: ne,
    LineController: je,
    PolarAreaController: Ue,
    PieController: Ii,
    RadarController: Ye,
    ScatterController: Ze,
});
function ye() {
    throw new Error(
        "This method is not implemented: Check that a complete date adapter is provided.",
    );
}
const Ci = class {
    constructor(t) {
        this.options = t || {};
    }

    init(t) {}
    formats() {
        return ye();
    }

    parse(t, e) {
        return ye();
    }

    format(t, e) {
        return ye();
    }

    add(t, e, s) {
        return ye();
    }

    diff(t, e, s) {
        return ye();
    }

    startOf(t, e, s) {
        return ye();
    }

    endOf(t, e) {
        return ye();
    }
};
Ci.override = function (i) {
    Object.assign(Ci.prototype, i);
};
const kr = { _date: Ci };
function Cu(i, t, e, s) {
    const { controller: n, data: r, _sorted: o } = i;
    const a = n._cachedMeta.iScale;
    if (a && t === a.axis && t !== "r" && o && r.length) {
        const l = a._reversePixels ? Ro : Ct;
        if (s) {
            if (n._sharedOptions) {
                const c = r[0];
                const h = typeof c.getRange === "function" && c.getRange(t);
                if (h) {
                    const u = l(r, t, e - h);
                    const d = l(r, t, e + h);
                    return { lo: u.lo, hi: d.hi };
                }
            }
        } else return l(r, t, e);
    }
    return { lo: 0, hi: r.length - 1 };
}
function Wi(i, t, e, s, n) {
    const r = i.getSortedVisibleDatasetMetas();
    const o = e[t];
    for (let a = 0, l = r.length; a < l; ++a) {
        const { index: c, data: h } = r[a];
        const { lo: u, hi: d } = Cu(r[a], t, o, n);
        for (let f = u; f <= d; ++f) {
            const m = h[f];
            m.skip || s(m, c, f);
        }
    }
}
function Fu(i) {
    const t = i.indexOf("x") !== -1;
    const e = i.indexOf("y") !== -1;
    return function (s, n) {
        const r = t ? Math.abs(s.x - n.x) : 0;
        const o = e ? Math.abs(s.y - n.y) : 0;
        return Math.sqrt(Math.pow(r, 2) + Math.pow(o, 2));
    };
}
function nr(i, t, e, s, n) {
    const r = [];
    return (
        (!n && !i.isPointInArea(t)) ||
            Wi(
                i,
                e,
                t,
                function (a, l, c) {
                    (!n && !Fe(a, i.chartArea, 0)) ||
                        (a.inRange(t.x, t.y, s) &&
                            r.push({ element: a, datasetIndex: l, index: c }));
                },
                !0,
            ),
        r
    );
}
function Au(i, t, e, s) {
    const n = [];
    function r(o, a, l) {
        const { startAngle: c, endAngle: h } = o.getProps(
            ["startAngle", "endAngle"],
            s,
        );
        const { angle: u } = In(o, { x: t.x, y: t.y });
        Ne(u, c, h) && n.push({ element: o, datasetIndex: a, index: l });
    }
    return Wi(i, e, t, r), n;
}
function Lu(i, t, e, s, n, r) {
    let o = [];
    const a = Fu(e);
    let l = Number.POSITIVE_INFINITY;
    function c(h, u, d) {
        const f = h.inRange(t.x, t.y, n);
        if (s && !f) return;
        const m = h.getCenterPoint(n);
        if (!(!!r || i.isPointInArea(m)) && !f) return;
        const p = a(t, m);
        p < l
            ? ((o = [{ element: h, datasetIndex: u, index: d }]), (l = p))
            : p === l && o.push({ element: h, datasetIndex: u, index: d });
    }
    return Wi(i, e, t, c), o;
}
function rr(i, t, e, s, n, r) {
    return !r && !i.isPointInArea(t)
        ? []
        : e === "r" && !s
          ? Au(i, t, e, n)
          : Lu(i, t, e, s, n, r);
}
function Sa(i, t, e, s, n) {
    const r = [];
    const o = e === "x" ? "inXRange" : "inYRange";
    let a = !1;
    return (
        Wi(i, e, t, (l, c, h) => {
            l[o](t[e], n) &&
                (r.push({ element: l, datasetIndex: c, index: h }),
                (a = a || l.inRange(t.x, t.y, n)));
        }),
        s && !a ? [] : r
    );
}
const Pu = {
    evaluateInteractionItems: Wi,
    modes: {
        index(i, t, e, s) {
            const n = ee(t, i);
            const r = e.axis || "x";
            const o = e.includeInvisible || !1;
            const a = e.intersect ? nr(i, n, r, s, o) : rr(i, n, r, !1, s, o);
            const l = [];
            return a.length
                ? (i.getSortedVisibleDatasetMetas().forEach((c) => {
                      const h = a[0].index;
                      const u = c.data[h];
                      u &&
                          !u.skip &&
                          l.push({
                              element: u,
                              datasetIndex: c.index,
                              index: h,
                          });
                  }),
                  l)
                : [];
        },
        dataset(i, t, e, s) {
            const n = ee(t, i);
            const r = e.axis || "xy";
            const o = e.includeInvisible || !1;
            let a = e.intersect ? nr(i, n, r, s, o) : rr(i, n, r, !1, s, o);
            if (a.length > 0) {
                const l = a[0].datasetIndex;
                const c = i.getDatasetMeta(l).data;
                a = [];
                for (let h = 0; h < c.length; ++h) {
                    a.push({ element: c[h], datasetIndex: l, index: h });
                }
            }
            return a;
        },
        point(i, t, e, s) {
            const n = ee(t, i);
            const r = e.axis || "xy";
            const o = e.includeInvisible || !1;
            return nr(i, n, r, s, o);
        },
        nearest(i, t, e, s) {
            const n = ee(t, i);
            const r = e.axis || "xy";
            const o = e.includeInvisible || !1;
            return rr(i, n, r, e.intersect, s, o);
        },
        x(i, t, e, s) {
            const n = ee(t, i);
            return Sa(i, n, "x", e.intersect, s);
        },
        y(i, t, e, s) {
            const n = ee(t, i);
            return Sa(i, n, "y", e.intersect, s);
        },
    },
};
const sl = ["left", "top", "right", "bottom"];
function Ti(i, t) {
    return i.filter((e) => e.pos === t);
}
function ka(i, t) {
    return i.filter((e) => sl.indexOf(e.pos) === -1 && e.box.axis === t);
}
function vi(i, t) {
    return i.sort((e, s) => {
        const n = t ? s : e;
        const r = t ? e : s;
        return n.weight === r.weight ? n.index - r.index : n.weight - r.weight;
    });
}
function Nu(i) {
    const t = [];
    let e;
    let s;
    let n;
    let r;
    let o;
    let a;
    for (e = 0, s = (i || []).length; e < s; ++e) {
        (n = i[e]),
            ({
                position: r,
                options: { stack: o, stackWeight: a = 1 },
            } = n),
            t.push({
                index: e,
                box: n,
                pos: r,
                horizontal: n.isHorizontal(),
                weight: n.weight,
                stack: o && r + o,
                stackWeight: a,
            });
    }
    return t;
}
function Ru(i) {
    const t = {};
    for (const e of i) {
        const { stack: s, pos: n, stackWeight: r } = e;
        if (!s || !sl.includes(n)) continue;
        const o = t[s] || (t[s] = { count: 0, placed: 0, weight: 0, size: 0 });
        o.count++, (o.weight += r);
    }
    return t;
}
function Wu(i, t) {
    const e = Ru(i);
    const { vBoxMaxWidth: s, hBoxMaxHeight: n } = t;
    let r;
    let o;
    let a;
    for (r = 0, o = i.length; r < o; ++r) {
        a = i[r];
        const { fullSize: l } = a.box;
        const c = e[a.stack];
        const h = c && a.stackWeight / c.weight;
        a.horizontal
            ? ((a.width = h ? h * s : l && t.availableWidth), (a.height = n))
            : ((a.width = s), (a.height = h ? h * n : l && t.availableHeight));
    }
    return e;
}
function zu(i) {
    const t = Nu(i);
    const e = vi(
        t.filter((c) => c.box.fullSize),
        !0,
    );
    const s = vi(Ti(t, "left"), !0);
    const n = vi(Ti(t, "right"));
    const r = vi(Ti(t, "top"), !0);
    const o = vi(Ti(t, "bottom"));
    const a = ka(t, "x");
    const l = ka(t, "y");
    return {
        fullSize: e,
        leftAndTop: s.concat(r),
        rightAndBottom: n.concat(l).concat(o).concat(a),
        chartArea: Ti(t, "chartArea"),
        vertical: s.concat(n).concat(l),
        horizontal: r.concat(o).concat(a),
    };
}
function Ma(i, t, e, s) {
    return Math.max(i[e], t[e]) + Math.max(i[s], t[s]);
}
function nl(i, t) {
    (i.top = Math.max(i.top, t.top)),
        (i.left = Math.max(i.left, t.left)),
        (i.bottom = Math.max(i.bottom, t.bottom)),
        (i.right = Math.max(i.right, t.right));
}
function Vu(i, t, e, s) {
    const { pos: n, box: r } = e;
    const o = i.maxPadding;
    if (!F(n)) {
        e.size && (i[n] -= e.size);
        const u = s[e.stack] || { size: 0, count: 1 };
        (u.size = Math.max(u.size, e.horizontal ? r.height : r.width)),
            (e.size = u.size / u.count),
            (i[n] += e.size);
    }
    r.getPadding && nl(o, r.getPadding());
    const a = Math.max(0, t.outerWidth - Ma(o, i, "left", "right"));
    const l = Math.max(0, t.outerHeight - Ma(o, i, "top", "bottom"));
    const c = a !== i.w;
    const h = l !== i.h;
    return (
        (i.w = a),
        (i.h = l),
        e.horizontal ? { same: c, other: h } : { same: h, other: c }
    );
}
function Hu(i) {
    const t = i.maxPadding;
    function e(s) {
        const n = Math.max(t[s] - i[s], 0);
        return (i[s] += n), n;
    }
    (i.y += e("top")), (i.x += e("left")), e("right"), e("bottom");
}
function Bu(i, t) {
    const e = t.maxPadding;
    function s(n) {
        const r = { left: 0, top: 0, right: 0, bottom: 0 };
        return (
            n.forEach((o) => {
                r[o] = Math.max(t[o], e[o]);
            }),
            r
        );
    }
    return s(i ? ["left", "right"] : ["top", "bottom"]);
}
function Di(i, t, e, s) {
    const n = [];
    let r;
    let o;
    let a;
    let l;
    let c;
    let h;
    for (r = 0, o = i.length, c = 0; r < o; ++r) {
        (a = i[r]),
            (l = a.box),
            l.update(a.width || t.w, a.height || t.h, Bu(a.horizontal, t));
        const { same: u, other: d } = Vu(t, e, a, s);
        (c |= u && n.length), (h = h || d), l.fullSize || n.push(a);
    }
    return (c && Di(n, t, e, s)) || h;
}
function Rs(i, t, e, s, n) {
    (i.top = e),
        (i.left = t),
        (i.right = t + s),
        (i.bottom = e + n),
        (i.width = s),
        (i.height = n);
}
function Ta(i, t, e, s) {
    const n = e.padding;
    let { x: r, y: o } = t;
    for (const a of i) {
        const l = a.box;
        const c = s[a.stack] || { count: 1, placed: 0, weight: 1 };
        const h = a.stackWeight / c.weight || 1;
        if (a.horizontal) {
            const u = t.w * h;
            const d = c.size || l.height;
            dt(c.start) && (o = c.start),
                l.fullSize
                    ? Rs(l, n.left, o, e.outerWidth - n.right - n.left, d)
                    : Rs(l, t.left + c.placed, o, u, d),
                (c.start = o),
                (c.placed += u),
                (o = l.bottom);
        } else {
            const u = t.h * h;
            const d = c.size || l.width;
            dt(c.start) && (r = c.start),
                l.fullSize
                    ? Rs(l, r, n.top, d, e.outerHeight - n.bottom - n.top)
                    : Rs(l, r, t.top + c.placed, d, u),
                (c.start = r),
                (c.placed += u),
                (r = l.right);
        }
    }
    (t.x = r), (t.y = o);
}
A.set("layout", {
    autoPadding: !0,
    padding: { top: 0, right: 0, bottom: 0, left: 0 },
});
const ot = {
    addBox(i, t) {
        i.boxes || (i.boxes = []),
            (t.fullSize = t.fullSize || !1),
            (t.position = t.position || "top"),
            (t.weight = t.weight || 0),
            (t._layers =
                t._layers ||
                function () {
                    return [
                        {
                            z: 0,
                            draw(e) {
                                t.draw(e);
                            },
                        },
                    ];
                }),
            i.boxes.push(t);
    },
    removeBox(i, t) {
        const e = i.boxes ? i.boxes.indexOf(t) : -1;
        e !== -1 && i.boxes.splice(e, 1);
    },
    configure(i, t, e) {
        (t.fullSize = e.fullSize),
            (t.position = e.position),
            (t.weight = e.weight);
    },
    update(i, t, e, s) {
        if (!i) return;
        const n = rt(i.options.layout.padding);
        const r = Math.max(t - n.width, 0);
        const o = Math.max(e - n.height, 0);
        const a = zu(i.boxes);
        const l = a.vertical;
        const c = a.horizontal;
        V(i.boxes, (g) => {
            typeof g.beforeLayout === "function" && g.beforeLayout();
        });
        const h =
            l.reduce(
                (g, p) =>
                    p.box.options && p.box.options.display === !1 ? g : g + 1,
                0,
            ) || 1;
        const u = Object.freeze({
            outerWidth: t,
            outerHeight: e,
            padding: n,
            availableWidth: r,
            availableHeight: o,
            vBoxMaxWidth: r / 2 / h,
            hBoxMaxHeight: o / 2,
        });
        const d = Object.assign({}, n);
        nl(d, rt(s));
        const f = Object.assign(
            { maxPadding: d, w: r, h: o, x: n.left, y: n.top },
            n,
        );
        const m = Wu(l.concat(c), u);
        Di(a.fullSize, f, u, m),
            Di(l, f, u, m),
            Di(c, f, u, m) && Di(l, f, u, m),
            Hu(f),
            Ta(a.leftAndTop, f, u, m),
            (f.x += f.w),
            (f.y += f.h),
            Ta(a.rightAndBottom, f, u, m),
            (i.chartArea = {
                left: f.left,
                top: f.top,
                right: f.left + f.w,
                bottom: f.top + f.h,
                height: f.h,
                width: f.w,
            }),
            V(a.chartArea, (g) => {
                const p = g.box;
                Object.assign(p, i.chartArea),
                    p.update(f.w, f.h, {
                        left: 0,
                        top: 0,
                        right: 0,
                        bottom: 0,
                    });
            });
    },
};
const js = class {
    acquireContext(t, e) {}
    releaseContext(t) {
        return !1;
    }

    addEventListener(t, e, s) {}
    removeEventListener(t, e, s) {}
    getDevicePixelRatio() {
        return 1;
    }

    getMaximumSize(t, e, s, n) {
        return (
            (e = Math.max(0, e || t.width)),
            (s = s || t.height),
            { width: e, height: Math.max(0, n ? Math.floor(e / n) : s) }
        );
    }

    isAttached(t) {
        return !0;
    }

    updateConfig(t) {}
};
const fr = class extends js {
    acquireContext(t) {
        return (t && t.getContext && t.getContext("2d")) || null;
    }

    updateConfig(t) {
        t.options.animation = !1;
    }
};
const Bs = "$chartjs";
const $u = {
    touchstart: "mousedown",
    touchmove: "mousemove",
    touchend: "mouseup",
    pointerenter: "mouseenter",
    pointerdown: "mousedown",
    pointermove: "mousemove",
    pointerup: "mouseup",
    pointerleave: "mouseout",
    pointerout: "mouseout",
};
const va = (i) => i === null || i === "";
function ju(i, t) {
    const e = i.style;
    const s = i.getAttribute("height");
    const n = i.getAttribute("width");
    if (
        ((i[Bs] = {
            initial: {
                height: s,
                width: n,
                style: { display: e.display, height: e.height, width: e.width },
            },
        }),
        (e.display = e.display || "block"),
        (e.boxSizing = e.boxSizing || "border-box"),
        va(n))
    ) {
        const r = Xn(i, "width");
        r !== void 0 && (i.width = r);
    }
    if (va(s)) {
        if (i.style.height === "") i.height = i.width / (t || 2);
        else {
            const r = Xn(i, "height");
            r !== void 0 && (i.height = r);
        }
    }
    return i;
}
const rl = na ? { passive: !0 } : !1;
function Uu(i, t, e) {
    i.addEventListener(t, e, rl);
}
function Yu(i, t, e) {
    i.canvas.removeEventListener(t, e, rl);
}
function Zu(i, t) {
    const e = $u[i.type] || i.type;
    const { x: s, y: n } = ee(i, t);
    return {
        type: e,
        chart: t,
        native: i,
        x: s !== void 0 ? s : null,
        y: n !== void 0 ? n : null,
    };
}
function Us(i, t) {
    for (const e of i) if (e === t || e.contains(t)) return !0;
}
function qu(i, t, e) {
    const s = i.canvas;
    const n = new MutationObserver((r) => {
        let o = !1;
        for (const a of r) {
            (o = o || Us(a.addedNodes, s)), (o = o && !Us(a.removedNodes, s));
        }
        o && e();
    });
    return n.observe(document, { childList: !0, subtree: !0 }), n;
}
function Gu(i, t, e) {
    const s = i.canvas;
    const n = new MutationObserver((r) => {
        let o = !1;
        for (const a of r) {
            (o = o || Us(a.removedNodes, s)), (o = o && !Us(a.addedNodes, s));
        }
        o && e();
    });
    return n.observe(document, { childList: !0, subtree: !0 }), n;
}
const Fi = new Map();
let Oa = 0;
function ol() {
    const i = window.devicePixelRatio;
    i !== Oa &&
        ((Oa = i),
        Fi.forEach((t, e) => {
            e.currentDevicePixelRatio !== i && t();
        }));
}
function Xu(i, t) {
    Fi.size || window.addEventListener("resize", ol), Fi.set(i, t);
}
function Ku(i) {
    Fi.delete(i), Fi.size || window.removeEventListener("resize", ol);
}
function Ju(i, t, e) {
    const s = i.canvas;
    const n = s && Ls(s);
    if (!n) return;
    const r = Ln((a, l) => {
        const c = n.clientWidth;
        e(a, l), c < n.clientWidth && e();
    }, window);
    const o = new ResizeObserver((a) => {
        const l = a[0];
        const c = l.contentRect.width;
        const h = l.contentRect.height;
        (c === 0 && h === 0) || r(c, h);
    });
    return o.observe(n), Xu(i, r), o;
}
function or(i, t, e) {
    e && e.disconnect(), t === "resize" && Ku(i);
}
function Qu(i, t, e) {
    const s = i.canvas;
    const n = Ln(
        (r) => {
            i.ctx !== null && e(Zu(r, i));
        },
        i,
        (r) => {
            const o = r[0];
            return [o, o.offsetX, o.offsetY];
        },
    );
    return Uu(s, t, n), n;
}
const mr = class extends js {
    acquireContext(t, e) {
        const s = t && t.getContext && t.getContext("2d");
        return s && s.canvas === t ? (ju(t, e), s) : null;
    }

    releaseContext(t) {
        const e = t.canvas;
        if (!e[Bs]) return !1;
        const s = e[Bs].initial;
        ["height", "width"].forEach((r) => {
            const o = s[r];
            P(o) ? e.removeAttribute(r) : e.setAttribute(r, o);
        });
        const n = s.style || {};
        return (
            Object.keys(n).forEach((r) => {
                e.style[r] = n[r];
            }),
            (e.width = e.width),
            delete e[Bs],
            !0
        );
    }

    addEventListener(t, e, s) {
        this.removeEventListener(t, e);
        const n = t.$proxies || (t.$proxies = {});
        const o = { attach: qu, detach: Gu, resize: Ju }[e] || Qu;
        n[e] = o(t, e, s);
    }

    removeEventListener(t, e) {
        const s = t.$proxies || (t.$proxies = {});
        const n = s[e];
        if (!n) return;
        (({ attach: or, detach: or, resize: or })[e] || Yu)(t, e, n),
            (s[e] = void 0);
    }

    getDevicePixelRatio() {
        return window.devicePixelRatio;
    }

    getMaximumSize(t, e, s, n) {
        return sa(t, e, s, n);
    }

    isAttached(t) {
        const e = Ls(t);
        return !!(e && e.isConnected);
    }
};
function td(i) {
    return !qn() ||
        (typeof OffscreenCanvas < "u" && i instanceof OffscreenCanvas)
        ? fr
        : mr;
}
const gr = class {
    constructor() {
        this._init = [];
    }

    notify(t, e, s, n) {
        e === "beforeInit" &&
            ((this._init = this._createDescriptors(t, !0)),
            this._notify(this._init, t, "install"));
        const r = n ? this._descriptors(t).filter(n) : this._descriptors(t);
        const o = this._notify(r, t, e, s);
        return (
            e === "afterDestroy" &&
                (this._notify(r, t, "stop"),
                this._notify(this._init, t, "uninstall")),
            o
        );
    }

    _notify(t, e, s, n) {
        n = n || {};
        for (const r of t) {
            const o = r.plugin;
            const a = o[s];
            const l = [e, n, r.options];
            if ($(a, l, o) === !1 && n.cancelable) return !1;
        }
        return !0;
    }

    invalidate() {
        P(this._cache) ||
            ((this._oldCache = this._cache), (this._cache = void 0));
    }

    _descriptors(t) {
        if (this._cache) return this._cache;
        const e = (this._cache = this._createDescriptors(t));
        return this._notifyStateChanges(t), e;
    }

    _createDescriptors(t, e) {
        const s = t && t.config;
        const n = E(s.options && s.options.plugins, {});
        const r = ed(s);
        return n === !1 && !e ? [] : sd(t, r, n, e);
    }

    _notifyStateChanges(t) {
        const e = this._oldCache || [];
        const s = this._cache;
        const n = (r, o) =>
            r.filter((a) => !o.some((l) => a.plugin.id === l.plugin.id));
        this._notify(n(e, s), t, "stop"), this._notify(n(s, e), t, "start");
    }
};
function ed(i) {
    const t = {};
    const e = [];
    const s = Object.keys(Pt.plugins.items);
    for (let r = 0; r < s.length; r++) e.push(Pt.getPlugin(s[r]));
    const n = i.plugins || [];
    for (let r = 0; r < n.length; r++) {
        const o = n[r];
        e.indexOf(o) === -1 && (e.push(o), (t[o.id] = !0));
    }
    return { plugins: e, localIds: t };
}
function id(i, t) {
    return !t && i === !1 ? null : i === !0 ? {} : i;
}
function sd(i, { plugins: t, localIds: e }, s, n) {
    const r = [];
    const o = i.getContext();
    for (const a of t) {
        const l = a.id;
        const c = id(s[l], n);
        c !== null &&
            r.push({
                plugin: a,
                options: nd(i.config, { plugin: a, local: e[l] }, c, o),
            });
    }
    return r;
}
function nd(i, { plugin: t, local: e }, s, n) {
    const r = i.pluginScopeKeys(t);
    const o = i.getOptionScopes(s, r);
    return (
        e && t.defaults && o.push(t.defaults),
        i.createResolver(o, n, [""], {
            scriptable: !1,
            indexable: !1,
            allKeys: !0,
        })
    );
}
function pr(i, t) {
    const e = A.datasets[i] || {};
    return (
        ((t.datasets || {})[i] || {}).indexAxis ||
        t.indexAxis ||
        e.indexAxis ||
        "x"
    );
}
function rd(i, t) {
    let e = i;
    return (
        i === "_index_"
            ? (e = t)
            : i === "_value_" && (e = t === "x" ? "y" : "x"),
        e
    );
}
function od(i, t) {
    return i === t ? "_index_" : "_value_";
}
function ad(i) {
    if (i === "top" || i === "bottom") return "x";
    if (i === "left" || i === "right") return "y";
}
function yr(i, t) {
    return i === "x" || i === "y"
        ? i
        : t.axis || ad(t.position) || i.charAt(0).toLowerCase();
}
function ld(i, t) {
    const e = Kt[i.type] || { scales: {} };
    const s = t.scales || {};
    const n = pr(i.type, t);
    const r = Object.create(null);
    const o = Object.create(null);
    return (
        Object.keys(s).forEach((a) => {
            const l = s[a];
            if (!F(l)) {
                return console.error(
                    `Invalid scale configuration for scale: ${a}`,
                );
            }
            if (l._proxy) {
                return console.warn(
                    `Ignoring resolver passed as options for scale: ${a}`,
                );
            }
            const c = yr(a, l);
            const h = od(c, n);
            const u = e.scales || {};
            (r[c] = r[c] || a),
                (o[a] = Le(Object.create(null), [{ axis: c }, l, u[c], u[h]]));
        }),
        i.data.datasets.forEach((a) => {
            const l = a.type || i.type;
            const c = a.indexAxis || pr(l, t);
            const u = (Kt[l] || {}).scales || {};
            Object.keys(u).forEach((d) => {
                const f = rd(d, c);
                const m = a[f + "AxisID"] || r[f] || f;
                (o[m] = o[m] || Object.create(null)),
                    Le(o[m], [{ axis: f }, s[m], u[d]]);
            });
        }),
        Object.keys(o).forEach((a) => {
            const l = o[a];
            Le(l, [A.scales[l.type], A.scale]);
        }),
        o
    );
}
function al(i) {
    const t = i.options || (i.options = {});
    (t.plugins = E(t.plugins, {})), (t.scales = ld(i, t));
}
function ll(i) {
    return (
        (i = i || {}),
        (i.datasets = i.datasets || []),
        (i.labels = i.labels || []),
        i
    );
}
function cd(i) {
    return (i = i || {}), (i.data = ll(i.data)), al(i), i;
}
const Da = new Map();
const cl = new Set();
function Ws(i, t) {
    let e = Da.get(i);
    return e || ((e = t()), Da.set(i, e), cl.add(e)), e;
}
const Oi = (i, t, e) => {
    const s = Vt(t, e);
    s !== void 0 && i.add(s);
};
const br = class {
    constructor(t) {
        (this._config = cd(t)),
            (this._scopeCache = new Map()),
            (this._resolverCache = new Map());
    }

    get platform() {
        return this._config.platform;
    }

    get type() {
        return this._config.type;
    }

    set type(t) {
        this._config.type = t;
    }

    get data() {
        return this._config.data;
    }

    set data(t) {
        this._config.data = ll(t);
    }

    get options() {
        return this._config.options;
    }

    set options(t) {
        this._config.options = t;
    }

    get plugins() {
        return this._config.plugins;
    }

    update() {
        const t = this._config;
        this.clearCache(), al(t);
    }

    clearCache() {
        this._scopeCache.clear(), this._resolverCache.clear();
    }

    datasetScopeKeys(t) {
        return Ws(t, () => [[`datasets.${t}`, ""]]);
    }

    datasetAnimationScopeKeys(t, e) {
        return Ws(`${t}.transition.${e}`, () => [
            [`datasets.${t}.transitions.${e}`, `transitions.${e}`],
            [`datasets.${t}`, ""],
        ]);
    }

    datasetElementScopeKeys(t, e) {
        return Ws(`${t}-${e}`, () => [
            [
                `datasets.${t}.elements.${e}`,
                `datasets.${t}`,
                `elements.${e}`,
                "",
            ],
        ]);
    }

    pluginScopeKeys(t) {
        const e = t.id;
        const s = this.type;
        return Ws(`${s}-plugin-${e}`, () => [
            [`plugins.${e}`, ...(t.additionalOptionScopes || [])],
        ]);
    }

    _cachedScopes(t, e) {
        const s = this._scopeCache;
        let n = s.get(t);
        return (!n || e) && ((n = new Map()), s.set(t, n)), n;
    }

    getOptionScopes(t, e, s) {
        const { options: n, type: r } = this;
        const o = this._cachedScopes(t, s);
        const a = o.get(e);
        if (a) return a;
        const l = new Set();
        e.forEach((h) => {
            t && (l.add(t), h.forEach((u) => Oi(l, t, u))),
                h.forEach((u) => Oi(l, n, u)),
                h.forEach((u) => Oi(l, Kt[r] || {}, u)),
                h.forEach((u) => Oi(l, A, u)),
                h.forEach((u) => Oi(l, Is, u));
        });
        const c = Array.from(l);
        return (
            c.length === 0 && c.push(Object.create(null)),
            cl.has(e) && o.set(e, c),
            c
        );
    }

    chartOptionScopes() {
        const { options: t, type: e } = this;
        return [t, Kt[e] || {}, A.datasets[e] || {}, { type: e }, A, Is];
    }

    resolveNamedOptions(t, e, s, n = [""]) {
        const r = { $shared: !0 };
        const { resolver: o, subPrefixes: a } = Ea(this._resolverCache, t, n);
        let l = o;
        if (ud(o, e)) {
            (r.$shared = !1), (s = zt(s) ? s() : s);
            const c = this.createResolver(t, s, a);
            l = me(o, s, c);
        }
        for (const c of e) r[c] = l[c];
        return r;
    }

    createResolver(t, e, s = [""], n) {
        const { resolver: r } = Ea(this._resolverCache, t, s);
        return F(e) ? me(r, e, void 0, n) : r;
    }
};
function Ea(i, t, e) {
    let s = i.get(t);
    s || ((s = new Map()), i.set(t, s));
    const n = e.join();
    let r = s.get(n);
    return (
        r ||
            ((r = {
                resolver: As(t, e),
                subPrefixes: e.filter(
                    (a) => !a.toLowerCase().includes("hover"),
                ),
            }),
            s.set(n, r)),
        r
    );
}
const hd = (i) =>
    F(i) && Object.getOwnPropertyNames(i).reduce((t, e) => t || zt(i[e]), !1);
function ud(i, t) {
    const { isScriptable: e, isIndexable: s } = jn(i);
    for (const n of t) {
        const r = e(n);
        const o = s(n);
        const a = (o || r) && i[n];
        if ((r && (zt(a) || hd(a))) || (o && B(a))) return !0;
    }
    return !1;
}
const dd = "3.9.1";
const fd = ["top", "bottom", "left", "right", "chartArea"];
function Ia(i, t) {
    return i === "top" || i === "bottom" || (fd.indexOf(i) === -1 && t === "x");
}
function Ca(i, t) {
    return function (e, s) {
        return e[i] === s[i] ? e[t] - s[t] : e[i] - s[i];
    };
}
function Fa(i) {
    const t = i.chart;
    const e = t.options.animation;
    t.notifyPlugins("afterRender"), $(e && e.onComplete, [i], t);
}
function md(i) {
    const t = i.chart;
    const e = t.options.animation;
    $(e && e.onProgress, [i], t);
}
function hl(i) {
    return (
        qn() && typeof i === "string"
            ? (i = document.getElementById(i))
            : i && i.length && (i = i[0]),
        i && i.canvas && (i = i.canvas),
        i
    );
}
const Ys = {};
const ul = (i) => {
    const t = hl(i);
    return Object.values(Ys)
        .filter((e) => e.canvas === t)
        .pop();
};
function gd(i, t, e) {
    const s = Object.keys(i);
    for (const n of s) {
        const r = +n;
        if (r >= t) {
            const o = i[n];
            delete i[n], (e > 0 || r > t) && (i[r + e] = o);
        }
    }
}
function pd(i, t, e, s) {
    return !e || i.type === "mouseout" ? null : s ? t : i;
}
const xe = class {
    constructor(t, e) {
        const s = (this.config = new br(e));
        const n = hl(t);
        const r = ul(n);
        if (r) {
            throw new Error(
                "Canvas is already in use. Chart with ID '" +
                    r.id +
                    "' must be destroyed before the canvas with ID '" +
                    r.canvas.id +
                    "' can be reused.",
            );
        }
        const o = s.createResolver(s.chartOptionScopes(), this.getContext());
        (this.platform = new (s.platform || td(n))()),
            this.platform.updateConfig(s);
        const a = this.platform.acquireContext(n, o.aspectRatio);
        const l = a && a.canvas;
        const c = l && l.height;
        const h = l && l.width;
        if (
            ((this.id = Io()),
            (this.ctx = a),
            (this.canvas = l),
            (this.width = h),
            (this.height = c),
            (this._options = o),
            (this._aspectRatio = this.aspectRatio),
            (this._layers = []),
            (this._metasets = []),
            (this._stacks = void 0),
            (this.boxes = []),
            (this.currentDevicePixelRatio = void 0),
            (this.chartArea = void 0),
            (this._active = []),
            (this._lastEvent = void 0),
            (this._listeners = {}),
            (this._responsiveListeners = void 0),
            (this._sortedMetasets = []),
            (this.scales = {}),
            (this._plugins = new gr()),
            (this.$proxies = {}),
            (this._hiddenIndices = {}),
            (this.attached = !1),
            (this._animationsDisabled = void 0),
            (this.$context = void 0),
            (this._doResize = Ho((u) => this.update(u), o.resizeDelay || 0)),
            (this._dataChanges = []),
            (Ys[this.id] = this),
            !a || !l)
        ) {
            console.error(
                "Failed to create chart: can't acquire context from the given item",
            );
            return;
        }
        Bt.listen(this, "complete", Fa),
            Bt.listen(this, "progress", md),
            this._initialize(),
            this.attached && this.update();
    }

    get aspectRatio() {
        const {
            options: { aspectRatio: t, maintainAspectRatio: e },
            width: s,
            height: n,
            _aspectRatio: r,
        } = this;
        return P(t) ? (e && r ? r : n ? s / n : null) : t;
    }

    get data() {
        return this.config.data;
    }

    set data(t) {
        this.config.data = t;
    }

    get options() {
        return this._options;
    }

    set options(t) {
        this.config.options = t;
    }

    _initialize() {
        return (
            this.notifyPlugins("beforeInit"),
            this.options.responsive
                ? this.resize()
                : Gn(this, this.options.devicePixelRatio),
            this.bindEvents(),
            this.notifyPlugins("afterInit"),
            this
        );
    }

    clear() {
        return Hn(this.canvas, this.ctx), this;
    }

    stop() {
        return Bt.stop(this), this;
    }

    resize(t, e) {
        Bt.running(this)
            ? (this._resizeBeforeDraw = { width: t, height: e })
            : this._resize(t, e);
    }

    _resize(t, e) {
        const s = this.options;
        const n = this.canvas;
        const r = s.maintainAspectRatio && this.aspectRatio;
        const o = this.platform.getMaximumSize(n, t, e, r);
        const a = s.devicePixelRatio || this.platform.getDevicePixelRatio();
        const l = this.width ? "resize" : "attach";
        (this.width = o.width),
            (this.height = o.height),
            (this._aspectRatio = this.aspectRatio),
            Gn(this, a, !0) &&
                (this.notifyPlugins("resize", { size: o }),
                $(s.onResize, [this, o], this),
                this.attached && this._doResize(l) && this.render());
    }

    ensureScalesHaveIDs() {
        const e = this.options.scales || {};
        V(e, (s, n) => {
            s.id = n;
        });
    }

    buildOrUpdateScales() {
        const t = this.options;
        const e = t.scales;
        const s = this.scales;
        const n = Object.keys(s).reduce((o, a) => ((o[a] = !1), o), {});
        let r = [];
        e &&
            (r = r.concat(
                Object.keys(e).map((o) => {
                    const a = e[o];
                    const l = yr(o, a);
                    const c = l === "r";
                    const h = l === "x";
                    return {
                        options: a,
                        dposition: c ? "chartArea" : h ? "bottom" : "left",
                        dtype: c ? "radialLinear" : h ? "category" : "linear",
                    };
                }),
            )),
            V(r, (o) => {
                const a = o.options;
                const l = a.id;
                const c = yr(l, a);
                const h = E(a.type, o.dtype);
                (a.position === void 0 ||
                    Ia(a.position, c) !== Ia(o.dposition)) &&
                    (a.position = o.dposition),
                    (n[l] = !0);
                let u = null;
                if (l in s && s[l].type === h) u = s[l];
                else {
                    const d = Pt.getScale(h);
                    (u = new d({ id: l, type: h, ctx: this.ctx, chart: this })),
                        (s[u.id] = u);
                }
                u.init(a, t);
            }),
            V(n, (o, a) => {
                o || delete s[a];
            }),
            V(s, (o) => {
                ot.configure(this, o, o.options), ot.addBox(this, o);
            });
    }

    _updateMetasets() {
        const t = this._metasets;
        const e = this.data.datasets.length;
        const s = t.length;
        if ((t.sort((n, r) => n.index - r.index), s > e)) {
            for (let n = e; n < s; ++n) this._destroyDatasetMeta(n);
            t.splice(e, s - e);
        }
        this._sortedMetasets = t.slice(0).sort(Ca("order", "index"));
    }

    _removeUnreferencedMetasets() {
        const {
            _metasets: t,
            data: { datasets: e },
        } = this;
        t.length > e.length && delete this._stacks,
            t.forEach((s, n) => {
                e.filter((r) => r === s._dataset).length === 0 &&
                    this._destroyDatasetMeta(n);
            });
    }

    buildOrUpdateControllers() {
        const t = [];
        const e = this.data.datasets;
        let s;
        let n;
        for (
            this._removeUnreferencedMetasets(), s = 0, n = e.length;
            s < n;
            s++
        ) {
            const r = e[s];
            let o = this.getDatasetMeta(s);
            const a = r.type || this.config.type;
            if (
                (o.type &&
                    o.type !== a &&
                    (this._destroyDatasetMeta(s), (o = this.getDatasetMeta(s))),
                (o.type = a),
                (o.indexAxis = r.indexAxis || pr(a, this.options)),
                (o.order = r.order || 0),
                (o.index = s),
                (o.label = "" + r.label),
                (o.visible = this.isDatasetVisible(s)),
                o.controller)
            ) {
                o.controller.updateIndex(s), o.controller.linkScales();
            } else {
                const l = Pt.getController(a);
                const { datasetElementType: c, dataElementType: h } =
                    A.datasets[a];
                Object.assign(l.prototype, {
                    dataElementType: Pt.getElement(h),
                    datasetElementType: c && Pt.getElement(c),
                }),
                    (o.controller = new l(this, s)),
                    t.push(o.controller);
            }
        }
        return this._updateMetasets(), t;
    }

    _resetElements() {
        V(
            this.data.datasets,
            (t, e) => {
                this.getDatasetMeta(e).controller.reset();
            },
            this,
        );
    }

    reset() {
        this._resetElements(), this.notifyPlugins("reset");
    }

    update(t) {
        const e = this.config;
        e.update();
        const s = (this._options = e.createResolver(
            e.chartOptionScopes(),
            this.getContext(),
        ));
        const n = (this._animationsDisabled = !s.animation);
        if (
            (this._updateScales(),
            this._checkEventBindings(),
            this._updateHiddenIndices(),
            this._plugins.invalidate(),
            this.notifyPlugins("beforeUpdate", { mode: t, cancelable: !0 }) ===
                !1)
        ) {
            return;
        }
        const r = this.buildOrUpdateControllers();
        this.notifyPlugins("beforeElementsUpdate");
        let o = 0;
        for (let c = 0, h = this.data.datasets.length; c < h; c++) {
            const { controller: u } = this.getDatasetMeta(c);
            const d = !n && r.indexOf(u) === -1;
            u.buildOrUpdateElements(d), (o = Math.max(+u.getMaxOverflow(), o));
        }
        (o = this._minPadding = s.layout.autoPadding ? o : 0),
            this._updateLayout(o),
            n ||
                V(r, (c) => {
                    c.reset();
                }),
            this._updateDatasets(t),
            this.notifyPlugins("afterUpdate", { mode: t }),
            this._layers.sort(Ca("z", "_idx"));
        const { _active: a, _lastEvent: l } = this;
        l
            ? this._eventHandler(l, !0)
            : a.length && this._updateHoverStyles(a, a, !0),
            this.render();
    }

    _updateScales() {
        V(this.scales, (t) => {
            ot.removeBox(this, t);
        }),
            this.ensureScalesHaveIDs(),
            this.buildOrUpdateScales();
    }

    _checkEventBindings() {
        const t = this.options;
        const e = new Set(Object.keys(this._listeners));
        const s = new Set(t.events);
        (!vn(e, s) || !!this._responsiveListeners !== t.responsive) &&
            (this.unbindEvents(), this.bindEvents());
    }

    _updateHiddenIndices() {
        const { _hiddenIndices: t } = this;
        const e = this._getUniformDataChanges() || [];
        for (const { method: s, start: n, count: r } of e) {
            const o = s === "_removeElements" ? -r : r;
            gd(t, n, o);
        }
    }

    _getUniformDataChanges() {
        const t = this._dataChanges;
        if (!t || !t.length) return;
        this._dataChanges = [];
        const e = this.data.datasets.length;
        const s = (r) =>
            new Set(
                t
                    .filter((o) => o[0] === r)
                    .map((o, a) => a + "," + o.splice(1).join(",")),
            );
        const n = s(0);
        for (let r = 1; r < e; r++) if (!vn(n, s(r))) return;
        return Array.from(n)
            .map((r) => r.split(","))
            .map((r) => ({ method: r[1], start: +r[2], count: +r[3] }));
    }

    _updateLayout(t) {
        if (this.notifyPlugins("beforeLayout", { cancelable: !0 }) === !1) {
            return;
        }
        ot.update(this, this.width, this.height, t);
        const e = this.chartArea;
        const s = e.width <= 0 || e.height <= 0;
        (this._layers = []),
            V(
                this.boxes,
                (n) => {
                    (s && n.position === "chartArea") ||
                        (n.configure && n.configure(),
                        this._layers.push(...n._layers()));
                },
                this,
            ),
            this._layers.forEach((n, r) => {
                n._idx = r;
            }),
            this.notifyPlugins("afterLayout");
    }

    _updateDatasets(t) {
        if (
            this.notifyPlugins("beforeDatasetsUpdate", {
                mode: t,
                cancelable: !0,
            }) !== !1
        ) {
            for (let e = 0, s = this.data.datasets.length; e < s; ++e) {
                this.getDatasetMeta(e).controller.configure();
            }
            for (let e = 0, s = this.data.datasets.length; e < s; ++e) {
                this._updateDataset(e, zt(t) ? t({ datasetIndex: e }) : t);
            }
            this.notifyPlugins("afterDatasetsUpdate", { mode: t });
        }
    }

    _updateDataset(t, e) {
        const s = this.getDatasetMeta(t);
        const n = { meta: s, index: t, mode: e, cancelable: !0 };
        this.notifyPlugins("beforeDatasetUpdate", n) !== !1 &&
            (s.controller._update(e),
            (n.cancelable = !1),
            this.notifyPlugins("afterDatasetUpdate", n));
    }

    render() {
        this.notifyPlugins("beforeRender", { cancelable: !0 }) !== !1 &&
            (Bt.has(this)
                ? this.attached && !Bt.running(this) && Bt.start(this)
                : (this.draw(), Fa({ chart: this })));
    }

    draw() {
        let t;
        if (this._resizeBeforeDraw) {
            const { width: s, height: n } = this._resizeBeforeDraw;
            this._resize(s, n), (this._resizeBeforeDraw = null);
        }
        if (
            (this.clear(),
            this.width <= 0 ||
                this.height <= 0 ||
                this.notifyPlugins("beforeDraw", { cancelable: !0 }) === !1)
        ) {
            return;
        }
        const e = this._layers;
        for (t = 0; t < e.length && e[t].z <= 0; ++t) e[t].draw(this.chartArea);
        for (this._drawDatasets(); t < e.length; ++t) e[t].draw(this.chartArea);
        this.notifyPlugins("afterDraw");
    }

    _getSortedDatasetMetas(t) {
        const e = this._sortedMetasets;
        const s = [];
        let n;
        let r;
        for (n = 0, r = e.length; n < r; ++n) {
            const o = e[n];
            (!t || o.visible) && s.push(o);
        }
        return s;
    }

    getSortedVisibleDatasetMetas() {
        return this._getSortedDatasetMetas(!0);
    }

    _drawDatasets() {
        if (
            this.notifyPlugins("beforeDatasetsDraw", { cancelable: !0 }) === !1
        ) {
            return;
        }
        const t = this.getSortedVisibleDatasetMetas();
        for (let e = t.length - 1; e >= 0; --e) this._drawDataset(t[e]);
        this.notifyPlugins("afterDatasetsDraw");
    }

    _drawDataset(t) {
        const e = this.ctx;
        const s = t._clip;
        const n = !s.disabled;
        const r = this.chartArea;
        const o = { meta: t, index: t.index, cancelable: !0 };
        this.notifyPlugins("beforeDatasetDraw", o) !== !1 &&
            (n &&
                wi(e, {
                    left: s.left === !1 ? 0 : r.left - s.left,
                    right: s.right === !1 ? this.width : r.right + s.right,
                    top: s.top === !1 ? 0 : r.top - s.top,
                    bottom: s.bottom === !1 ? this.height : r.bottom + s.bottom,
                }),
            t.controller.draw(),
            n && Si(e),
            (o.cancelable = !1),
            this.notifyPlugins("afterDatasetDraw", o));
    }

    isPointInArea(t) {
        return Fe(t, this.chartArea, this._minPadding);
    }

    getElementsAtEventForMode(t, e, s, n) {
        const r = Pu.modes[e];
        return typeof r === "function" ? r(this, t, s, n) : [];
    }

    getDatasetMeta(t) {
        const e = this.data.datasets[t];
        const s = this._metasets;
        let n = s.filter((r) => r && r._dataset === e).pop();
        return (
            n ||
                ((n = {
                    type: null,
                    data: [],
                    dataset: null,
                    controller: null,
                    hidden: null,
                    xAxisID: null,
                    yAxisID: null,
                    order: (e && e.order) || 0,
                    index: t,
                    _dataset: e,
                    _parsed: [],
                    _sorted: !1,
                }),
                s.push(n)),
            n
        );
    }

    getContext() {
        return (
            this.$context ||
            (this.$context = Ht(null, { chart: this, type: "chart" }))
        );
    }

    getVisibleDatasetCount() {
        return this.getSortedVisibleDatasetMetas().length;
    }

    isDatasetVisible(t) {
        const e = this.data.datasets[t];
        if (!e) return !1;
        const s = this.getDatasetMeta(t);
        return typeof s.hidden === "boolean" ? !s.hidden : !e.hidden;
    }

    setDatasetVisibility(t, e) {
        const s = this.getDatasetMeta(t);
        s.hidden = !e;
    }

    toggleDataVisibility(t) {
        this._hiddenIndices[t] = !this._hiddenIndices[t];
    }

    getDataVisibility(t) {
        return !this._hiddenIndices[t];
    }

    _updateVisibility(t, e, s) {
        const n = s ? "show" : "hide";
        const r = this.getDatasetMeta(t);
        const o = r.controller._resolveAnimations(void 0, n);
        dt(e)
            ? ((r.data[e].hidden = !s), this.update())
            : (this.setDatasetVisibility(t, s),
              o.update(r, { visible: s }),
              this.update((a) => (a.datasetIndex === t ? n : void 0)));
    }

    hide(t, e) {
        this._updateVisibility(t, e, !1);
    }

    show(t, e) {
        this._updateVisibility(t, e, !0);
    }

    _destroyDatasetMeta(t) {
        const e = this._metasets[t];
        e && e.controller && e.controller._destroy(), delete this._metasets[t];
    }

    _stop() {
        let t, e;
        for (
            this.stop(), Bt.remove(this), t = 0, e = this.data.datasets.length;
            t < e;
            ++t
        ) {
            this._destroyDatasetMeta(t);
        }
    }

    destroy() {
        this.notifyPlugins("beforeDestroy");
        const { canvas: t, ctx: e } = this;
        this._stop(),
            this.config.clearCache(),
            t &&
                (this.unbindEvents(),
                Hn(t, e),
                this.platform.releaseContext(e),
                (this.canvas = null),
                (this.ctx = null)),
            this.notifyPlugins("destroy"),
            delete Ys[this.id],
            this.notifyPlugins("afterDestroy");
    }

    toBase64Image(...t) {
        return this.canvas.toDataURL(...t);
    }

    bindEvents() {
        this.bindUserEvents(),
            this.options.responsive
                ? this.bindResponsiveEvents()
                : (this.attached = !0);
    }

    bindUserEvents() {
        const t = this._listeners;
        const e = this.platform;
        const s = (r, o) => {
            e.addEventListener(this, r, o), (t[r] = o);
        };
        const n = (r, o, a) => {
            (r.offsetX = o), (r.offsetY = a), this._eventHandler(r);
        };
        V(this.options.events, (r) => s(r, n));
    }

    bindResponsiveEvents() {
        this._responsiveListeners || (this._responsiveListeners = {});
        const t = this._responsiveListeners;
        const e = this.platform;
        const s = (l, c) => {
            e.addEventListener(this, l, c), (t[l] = c);
        };
        const n = (l, c) => {
            t[l] && (e.removeEventListener(this, l, c), delete t[l]);
        };
        const r = (l, c) => {
            this.canvas && this.resize(l, c);
        };
        let o;
        const a = () => {
            n("attach", a),
                (this.attached = !0),
                this.resize(),
                s("resize", r),
                s("detach", o);
        };
        (o = () => {
            (this.attached = !1),
                n("resize", r),
                this._stop(),
                this._resize(0, 0),
                s("attach", a);
        }),
            e.isAttached(this.canvas) ? a() : o();
    }

    unbindEvents() {
        V(this._listeners, (t, e) => {
            this.platform.removeEventListener(this, e, t);
        }),
            (this._listeners = {}),
            V(this._responsiveListeners, (t, e) => {
                this.platform.removeEventListener(this, e, t);
            }),
            (this._responsiveListeners = void 0);
    }

    updateHoverStyle(t, e, s) {
        const n = s ? "set" : "remove";
        let r;
        let o;
        let a;
        let l;
        for (
            e === "dataset" &&
                ((r = this.getDatasetMeta(t[0].datasetIndex)),
                r.controller["_" + n + "DatasetHoverStyle"]()),
                a = 0,
                l = t.length;
            a < l;
            ++a
        ) {
            o = t[a];
            const c = o && this.getDatasetMeta(o.datasetIndex).controller;
            c && c[n + "HoverStyle"](o.element, o.datasetIndex, o.index);
        }
    }

    getActiveElements() {
        return this._active || [];
    }

    setActiveElements(t) {
        const e = this._active || [];
        const s = t.map(({ datasetIndex: r, index: o }) => {
            const a = this.getDatasetMeta(r);
            if (!a) throw new Error("No dataset found at index " + r);
            return { datasetIndex: r, element: a.data[o], index: o };
        });
        !xi(s, e) &&
            ((this._active = s),
            (this._lastEvent = null),
            this._updateHoverStyles(s, e));
    }

    notifyPlugins(t, e, s) {
        return this._plugins.notify(this, t, e, s);
    }

    _updateHoverStyles(t, e, s) {
        const n = this.options.hover;
        const r = (l, c) =>
            l.filter(
                (h) =>
                    !c.some(
                        (u) =>
                            h.datasetIndex === u.datasetIndex &&
                            h.index === u.index,
                    ),
            );
        const o = r(e, t);
        const a = s ? t : r(t, e);
        o.length && this.updateHoverStyle(o, n.mode, !1),
            a.length && n.mode && this.updateHoverStyle(a, n.mode, !0);
    }

    _eventHandler(t, e) {
        const s = {
            event: t,
            replay: e,
            cancelable: !0,
            inChartArea: this.isPointInArea(t),
        };
        const n = (o) =>
            (o.options.events || this.options.events).includes(t.native.type);
        if (this.notifyPlugins("beforeEvent", s, n) === !1) return;
        const r = this._handleEvent(t, e, s.inChartArea);
        return (
            (s.cancelable = !1),
            this.notifyPlugins("afterEvent", s, n),
            (r || s.changed) && this.render(),
            this
        );
    }

    _handleEvent(t, e, s) {
        const { _active: n = [], options: r } = this;
        const o = e;
        const a = this._getActiveElements(t, n, s, o);
        const l = Ao(t);
        const c = pd(t, this._lastEvent, s, l);
        s &&
            ((this._lastEvent = null),
            $(r.onHover, [t, a, this], this),
            l && $(r.onClick, [t, a, this], this));
        const h = !xi(a, n);
        return (
            (h || e) && ((this._active = a), this._updateHoverStyles(a, n, e)),
            (this._lastEvent = c),
            h
        );
    }

    _getActiveElements(t, e, s, n) {
        if (t.type === "mouseout") return [];
        if (!s) return e;
        const r = this.options.hover;
        return this.getElementsAtEventForMode(t, r.mode, r, n);
    }
};
const Aa = () => V(xe.instances, (i) => i._plugins.invalidate());
const ie = !0;
Object.defineProperties(xe, {
    defaults: { enumerable: ie, value: A },
    instances: { enumerable: ie, value: Ys },
    overrides: { enumerable: ie, value: Kt },
    registry: { enumerable: ie, value: Pt },
    version: { enumerable: ie, value: dd },
    getChart: { enumerable: ie, value: ul },
    register: {
        enumerable: ie,
        value: (...i) => {
            Pt.add(...i), Aa();
        },
    },
    unregister: {
        enumerable: ie,
        value: (...i) => {
            Pt.remove(...i), Aa();
        },
    },
});
function dl(i, t, e) {
    const {
        startAngle: s,
        pixelMargin: n,
        x: r,
        y: o,
        outerRadius: a,
        innerRadius: l,
    } = t;
    let c = n / a;
    i.beginPath(),
        i.arc(r, o, a, s - c, e + c),
        l > n
            ? ((c = n / l), i.arc(r, o, l, e + c, s - c, !0))
            : i.arc(r, o, n, e + U, s - U),
        i.closePath(),
        i.clip();
}
function yd(i) {
    return Fs(i, ["outerStart", "outerEnd", "innerStart", "innerEnd"]);
}
function bd(i, t, e, s) {
    const n = yd(i.options.borderRadius);
    const r = (e - t) / 2;
    const o = Math.min(r, (s * t) / 2);
    const a = (l) => {
        const c = ((e - Math.min(r, l)) * s) / 2;
        return tt(l, 0, Math.min(r, c));
    };
    return {
        outerStart: a(n.outerStart),
        outerEnd: a(n.outerEnd),
        innerStart: tt(n.innerStart, 0, o),
        innerEnd: tt(n.innerEnd, 0, o),
    };
}
function Ve(i, t, e, s) {
    return { x: e + i * Math.cos(t), y: s + i * Math.sin(t) };
}
function xr(i, t, e, s, n, r) {
    const { x: o, y: a, startAngle: l, pixelMargin: c, innerRadius: h } = t;
    const u = Math.max(t.outerRadius + s + e - c, 0);
    const d = h > 0 ? h + s + e + c : 0;
    let f = 0;
    const m = n - l;
    if (s) {
        const D = h > 0 ? h - s : 0;
        const J = u > 0 ? u - s : 0;
        const X = (D + J) / 2;
        const de = X !== 0 ? (m * X) / (X + s) : m;
        f = (m - de) / 2;
    }
    const g = Math.max(0.001, m * u - e / j) / u;
    const p = (m - g) / 2;
    const y = l + p + f;
    const b = n - p - f;
    const {
        outerStart: _,
        outerEnd: w,
        innerStart: x,
        innerEnd: S,
    } = bd(t, d, u, b - y);
    const k = u - _;
    const v = u - w;
    const T = y + _ / k;
    const C = b - w / v;
    const N = d + x;
    const L = d + S;
    const K = y + x / N;
    const lt = b - S / L;
    if ((i.beginPath(), r)) {
        if ((i.arc(o, a, u, T, C), w > 0)) {
            const X = Ve(v, C, o, a);
            i.arc(X.x, X.y, w, C, b + U);
        }
        const D = Ve(L, b, o, a);
        if ((i.lineTo(D.x, D.y), S > 0)) {
            const X = Ve(L, lt, o, a);
            i.arc(X.x, X.y, S, b + U, lt + Math.PI);
        }
        if ((i.arc(o, a, d, b - S / d, y + x / d, !0), x > 0)) {
            const X = Ve(N, K, o, a);
            i.arc(X.x, X.y, x, K + Math.PI, y - U);
        }
        const J = Ve(k, y, o, a);
        if ((i.lineTo(J.x, J.y), _ > 0)) {
            const X = Ve(k, T, o, a);
            i.arc(X.x, X.y, _, y - U, T);
        }
    } else {
        i.moveTo(o, a);
        const D = Math.cos(T) * u + o;
        const J = Math.sin(T) * u + a;
        i.lineTo(D, J);
        const X = Math.cos(C) * u + o;
        const de = Math.sin(C) * u + a;
        i.lineTo(X, de);
    }
    i.closePath();
}
function xd(i, t, e, s, n) {
    const { fullCircles: r, startAngle: o, circumference: a } = t;
    let l = t.endAngle;
    if (r) {
        xr(i, t, e, s, o + H, n);
        for (let c = 0; c < r; ++c) i.fill();
        isNaN(a) || ((l = o + (a % H)), a % H === 0 && (l += H));
    }
    return xr(i, t, e, s, l, n), i.fill(), l;
}
function _d(i, t, e) {
    const { x: s, y: n, startAngle: r, pixelMargin: o, fullCircles: a } = t;
    const l = Math.max(t.outerRadius - o, 0);
    const c = t.innerRadius + o;
    let h;
    for (
        e && dl(i, t, r + H),
            i.beginPath(),
            i.arc(s, n, c, r + H, r, !0),
            h = 0;
        h < a;
        ++h
    ) {
        i.stroke();
    }
    for (i.beginPath(), i.arc(s, n, l, r, r + H), h = 0; h < a; ++h) i.stroke();
}
function wd(i, t, e, s, n, r) {
    const { options: o } = t;
    const { borderWidth: a, borderJoinStyle: l } = o;
    const c = o.borderAlign === "inner";
    a &&
        (c
            ? ((i.lineWidth = a * 2), (i.lineJoin = l || "round"))
            : ((i.lineWidth = a), (i.lineJoin = l || "bevel")),
        t.fullCircles && _d(i, t, c),
        c && dl(i, t, n),
        xr(i, t, e, s, n, r),
        i.stroke());
}
const qe = class extends pt {
    constructor(t) {
        super(),
            (this.options = void 0),
            (this.circumference = void 0),
            (this.startAngle = void 0),
            (this.endAngle = void 0),
            (this.innerRadius = void 0),
            (this.outerRadius = void 0),
            (this.pixelMargin = 0),
            (this.fullCircles = 0),
            t && Object.assign(this, t);
    }

    inRange(t, e, s) {
        const n = this.getProps(["x", "y"], s);
        const { angle: r, distance: o } = In(n, { x: t, y: e });
        const {
            startAngle: a,
            endAngle: l,
            innerRadius: c,
            outerRadius: h,
            circumference: u,
        } = this.getProps(
            [
                "startAngle",
                "endAngle",
                "innerRadius",
                "outerRadius",
                "circumference",
            ],
            s,
        );
        const d = this.options.spacing / 2;
        const m = E(u, l - a) >= H || Ne(r, a, l);
        const g = At(o, c + d, h + d);
        return m && g;
    }

    getCenterPoint(t) {
        const {
            x: e,
            y: s,
            startAngle: n,
            endAngle: r,
            innerRadius: o,
            outerRadius: a,
        } = this.getProps(
            [
                "x",
                "y",
                "startAngle",
                "endAngle",
                "innerRadius",
                "outerRadius",
                "circumference",
            ],
            t,
        );
        const { offset: l, spacing: c } = this.options;
        const h = (n + r) / 2;
        const u = (o + a + c + l) / 2;
        return { x: e + Math.cos(h) * u, y: s + Math.sin(h) * u };
    }

    tooltipPosition(t) {
        return this.getCenterPoint(t);
    }

    draw(t) {
        const { options: e, circumference: s } = this;
        const n = (e.offset || 0) / 2;
        const r = (e.spacing || 0) / 2;
        const o = e.circular;
        if (
            ((this.pixelMargin = e.borderAlign === "inner" ? 0.33 : 0),
            (this.fullCircles = s > H ? Math.floor(s / H) : 0),
            s === 0 || this.innerRadius < 0 || this.outerRadius < 0)
        ) {
            return;
        }
        t.save();
        let a = 0;
        if (n) {
            a = n / 2;
            const c = (this.startAngle + this.endAngle) / 2;
            t.translate(Math.cos(c) * a, Math.sin(c) * a),
                this.circumference >= j && (a = n);
        }
        (t.fillStyle = e.backgroundColor), (t.strokeStyle = e.borderColor);
        const l = xd(t, this, a, r, o);
        wd(t, this, a, r, l, o), t.restore();
    }
};
qe.id = "arc";
qe.defaults = {
    borderAlign: "center",
    borderColor: "#fff",
    borderJoinStyle: void 0,
    borderRadius: 0,
    borderWidth: 2,
    offset: 0,
    spacing: 0,
    angle: void 0,
    circular: !0,
};
qe.defaultRoutes = { backgroundColor: "backgroundColor" };
function fl(i, t, e = t) {
    (i.lineCap = E(e.borderCapStyle, t.borderCapStyle)),
        i.setLineDash(E(e.borderDash, t.borderDash)),
        (i.lineDashOffset = E(e.borderDashOffset, t.borderDashOffset)),
        (i.lineJoin = E(e.borderJoinStyle, t.borderJoinStyle)),
        (i.lineWidth = E(e.borderWidth, t.borderWidth)),
        (i.strokeStyle = E(e.borderColor, t.borderColor));
}
function Sd(i, t, e) {
    i.lineTo(e.x, e.y);
}
function kd(i) {
    return i.stepped
        ? Go
        : i.tension || i.cubicInterpolationMode === "monotone"
          ? Xo
          : Sd;
}
function ml(i, t, e = {}) {
    const s = i.length;
    const { start: n = 0, end: r = s - 1 } = e;
    const { start: o, end: a } = t;
    const l = Math.max(n, o);
    const c = Math.min(r, a);
    const h = (n < o && r < o) || (n > a && r > a);
    return {
        count: s,
        start: l,
        loop: t.loop,
        ilen: c < l && !h ? s + c - l : c - l,
    };
}
function Md(i, t, e, s) {
    const { points: n, options: r } = t;
    const { count: o, start: a, loop: l, ilen: c } = ml(n, e, s);
    const h = kd(r);
    let { move: u = !0, reverse: d } = s || {};
    let f;
    let m;
    let g;
    for (f = 0; f <= c; ++f) {
        (m = n[(a + (d ? c - f : f)) % o]),
            !m.skip &&
                (u ? (i.moveTo(m.x, m.y), (u = !1)) : h(i, g, m, d, r.stepped),
                (g = m));
    }
    return l && ((m = n[(a + (d ? c : 0)) % o]), h(i, g, m, d, r.stepped)), !!l;
}
function Td(i, t, e, s) {
    const n = t.points;
    const { count: r, start: o, ilen: a } = ml(n, e, s);
    const { move: l = !0, reverse: c } = s || {};
    let h = 0;
    let u = 0;
    let d;
    let f;
    let m;
    let g;
    let p;
    let y;
    const b = (w) => (o + (c ? a - w : w)) % r;
    const _ = () => {
        g !== p && (i.lineTo(h, p), i.lineTo(h, g), i.lineTo(h, y));
    };
    for (l && ((f = n[b(0)]), i.moveTo(f.x, f.y)), d = 0; d <= a; ++d) {
        if (((f = n[b(d)]), f.skip)) continue;
        const w = f.x;
        const x = f.y;
        const S = w | 0;
        S === m
            ? (x < g ? (g = x) : x > p && (p = x), (h = (u * h + w) / ++u))
            : (_(), i.lineTo(w, x), (m = S), (u = 0), (g = p = x)),
            (y = x);
    }
    _();
}
function _r(i) {
    const t = i.options;
    const e = t.borderDash && t.borderDash.length;
    return !i._decimated &&
        !i._loop &&
        !t.tension &&
        t.cubicInterpolationMode !== "monotone" &&
        !t.stepped &&
        !e
        ? Td
        : Md;
}
function vd(i) {
    return i.stepped
        ? ra
        : i.tension || i.cubicInterpolationMode === "monotone"
          ? oa
          : qt;
}
function Od(i, t, e, s) {
    let n = t._path;
    n || ((n = t._path = new Path2D()), t.path(n, e, s) && n.closePath()),
        fl(i, t.options),
        i.stroke(n);
}
function Dd(i, t, e, s) {
    const { segments: n, options: r } = t;
    const o = _r(t);
    for (const a of n) {
        fl(i, r, a.style),
            i.beginPath(),
            o(i, t, a, { start: e, end: e + s - 1 }) && i.closePath(),
            i.stroke();
    }
}
const Ed = typeof Path2D === "function";
function Id(i, t, e, s) {
    Ed && !t.options.segment ? Od(i, t, e, s) : Dd(i, t, e, s);
}
const Nt = class extends pt {
    constructor(t) {
        super(),
            (this.animated = !0),
            (this.options = void 0),
            (this._chart = void 0),
            (this._loop = void 0),
            (this._fullLoop = void 0),
            (this._path = void 0),
            (this._points = void 0),
            (this._segments = void 0),
            (this._decimated = !1),
            (this._pointsUpdated = !1),
            (this._datasetIndex = void 0),
            t && Object.assign(this, t);
    }

    updateControlPoints(t, e) {
        const s = this.options;
        if (
            (s.tension || s.cubicInterpolationMode === "monotone") &&
            !s.stepped &&
            !this._pointsUpdated
        ) {
            const n = s.spanGaps ? this._loop : this._fullLoop;
            ia(this._points, s, t, n, e), (this._pointsUpdated = !0);
        }
    }

    set points(t) {
        (this._points = t),
            delete this._segments,
            delete this._path,
            (this._pointsUpdated = !1);
    }

    get points() {
        return this._points;
    }

    get segments() {
        return (
            this._segments || (this._segments = la(this, this.options.segment))
        );
    }

    first() {
        const t = this.segments;
        const e = this.points;
        return t.length && e[t[0].start];
    }

    last() {
        const t = this.segments;
        const e = this.points;
        const s = t.length;
        return s && e[t[s - 1].end];
    }

    interpolate(t, e) {
        const s = this.options;
        const n = t[e];
        const r = this.points;
        const o = tr(this, { property: e, start: n, end: n });
        if (!o.length) return;
        const a = [];
        const l = vd(s);
        let c;
        let h;
        for (c = 0, h = o.length; c < h; ++c) {
            const { start: u, end: d } = o[c];
            const f = r[u];
            const m = r[d];
            if (f === m) {
                a.push(f);
                continue;
            }
            const g = Math.abs((n - f[e]) / (m[e] - f[e]));
            const p = l(f, m, g, s.stepped);
            (p[e] = t[e]), a.push(p);
        }
        return a.length === 1 ? a[0] : a;
    }

    pathSegment(t, e, s) {
        return _r(this)(t, this, e, s);
    }

    path(t, e, s) {
        const n = this.segments;
        const r = _r(this);
        let o = this._loop;
        (e = e || 0), (s = s || this.points.length - e);
        for (const a of n) o &= r(t, this, a, { start: e, end: e + s - 1 });
        return !!o;
    }

    draw(t, e, s, n) {
        const r = this.options || {};
        (this.points || []).length &&
            r.borderWidth &&
            (t.save(), Id(t, this, s, n), t.restore()),
            this.animated &&
                ((this._pointsUpdated = !1), (this._path = void 0));
    }
};
Nt.id = "line";
Nt.defaults = {
    borderCapStyle: "butt",
    borderDash: [],
    borderDashOffset: 0,
    borderJoinStyle: "miter",
    borderWidth: 3,
    capBezierPoints: !0,
    cubicInterpolationMode: "default",
    fill: !1,
    spanGaps: !1,
    stepped: !1,
    tension: 0,
};
Nt.defaultRoutes = {
    backgroundColor: "backgroundColor",
    borderColor: "borderColor",
};
Nt.descriptors = {
    _scriptable: !0,
    _indexable: (i) => i !== "borderDash" && i !== "fill",
};
function La(i, t, e, s) {
    const n = i.options;
    const { [e]: r } = i.getProps([e], s);
    return Math.abs(t - r) < n.radius + n.hitRadius;
}
const Ge = class extends pt {
    constructor(t) {
        super(),
            (this.options = void 0),
            (this.parsed = void 0),
            (this.skip = void 0),
            (this.stop = void 0),
            t && Object.assign(this, t);
    }

    inRange(t, e, s) {
        const n = this.options;
        const { x: r, y: o } = this.getProps(["x", "y"], s);
        return (
            Math.pow(t - r, 2) + Math.pow(e - o, 2) <
            Math.pow(n.hitRadius + n.radius, 2)
        );
    }

    inXRange(t, e) {
        return La(this, t, "x", e);
    }

    inYRange(t, e) {
        return La(this, t, "y", e);
    }

    getCenterPoint(t) {
        const { x: e, y: s } = this.getProps(["x", "y"], t);
        return { x: e, y: s };
    }

    size(t) {
        t = t || this.options || {};
        let e = t.radius || 0;
        e = Math.max(e, (e && t.hoverRadius) || 0);
        const s = (e && t.borderWidth) || 0;
        return (e + s) * 2;
    }

    draw(t, e) {
        const s = this.options;
        this.skip ||
            s.radius < 0.1 ||
            !Fe(this, e, this.size(s) / 2) ||
            ((t.strokeStyle = s.borderColor),
            (t.lineWidth = s.borderWidth),
            (t.fillStyle = s.backgroundColor),
            Cs(t, s, this.x, this.y));
    }

    getRange() {
        const t = this.options || {};
        return t.radius + t.hitRadius;
    }
};
Ge.id = "point";
Ge.defaults = {
    borderWidth: 1,
    hitRadius: 1,
    hoverBorderWidth: 1,
    hoverRadius: 4,
    pointStyle: "circle",
    radius: 3,
    rotation: 0,
};
Ge.defaultRoutes = {
    backgroundColor: "backgroundColor",
    borderColor: "borderColor",
};
function gl(i, t) {
    const {
        x: e,
        y: s,
        base: n,
        width: r,
        height: o,
    } = i.getProps(["x", "y", "base", "width", "height"], t);
    let a;
    let l;
    let c;
    let h;
    let u;
    return (
        i.horizontal
            ? ((u = o / 2),
              (a = Math.min(e, n)),
              (l = Math.max(e, n)),
              (c = s - u),
              (h = s + u))
            : ((u = r / 2),
              (a = e - u),
              (l = e + u),
              (c = Math.min(s, n)),
              (h = Math.max(s, n))),
        { left: a, top: c, right: l, bottom: h }
    );
}
function se(i, t, e, s) {
    return i ? 0 : tt(t, e, s);
}
function Cd(i, t, e) {
    const s = i.options.borderWidth;
    const n = i.borderSkipped;
    const r = $n(s);
    return {
        t: se(n.top, r.top, 0, e),
        r: se(n.right, r.right, 0, t),
        b: se(n.bottom, r.bottom, 0, e),
        l: se(n.left, r.left, 0, t),
    };
}
function Fd(i, t, e) {
    const { enableBorderRadius: s } = i.getProps(["enableBorderRadius"]);
    const n = i.options.borderRadius;
    const r = te(n);
    const o = Math.min(t, e);
    const a = i.borderSkipped;
    const l = s || F(n);
    return {
        topLeft: se(!l || a.top || a.left, r.topLeft, 0, o),
        topRight: se(!l || a.top || a.right, r.topRight, 0, o),
        bottomLeft: se(!l || a.bottom || a.left, r.bottomLeft, 0, o),
        bottomRight: se(!l || a.bottom || a.right, r.bottomRight, 0, o),
    };
}
function Ad(i) {
    const t = gl(i);
    const e = t.right - t.left;
    const s = t.bottom - t.top;
    const n = Cd(i, e / 2, s / 2);
    const r = Fd(i, e / 2, s / 2);
    return {
        outer: { x: t.left, y: t.top, w: e, h: s, radius: r },
        inner: {
            x: t.left + n.l,
            y: t.top + n.t,
            w: e - n.l - n.r,
            h: s - n.t - n.b,
            radius: {
                topLeft: Math.max(0, r.topLeft - Math.max(n.t, n.l)),
                topRight: Math.max(0, r.topRight - Math.max(n.t, n.r)),
                bottomLeft: Math.max(0, r.bottomLeft - Math.max(n.b, n.l)),
                bottomRight: Math.max(0, r.bottomRight - Math.max(n.b, n.r)),
            },
        },
    };
}
function ar(i, t, e, s) {
    const n = t === null;
    const r = e === null;
    const a = i && !(n && r) && gl(i, s);
    return a && (n || At(t, a.left, a.right)) && (r || At(e, a.top, a.bottom));
}
function Ld(i) {
    return i.topLeft || i.topRight || i.bottomLeft || i.bottomRight;
}
function Pd(i, t) {
    i.rect(t.x, t.y, t.w, t.h);
}
function lr(i, t, e = {}) {
    const s = i.x !== e.x ? -t : 0;
    const n = i.y !== e.y ? -t : 0;
    const r = (i.x + i.w !== e.x + e.w ? t : 0) - s;
    const o = (i.y + i.h !== e.y + e.h ? t : 0) - n;
    return { x: i.x + s, y: i.y + n, w: i.w + r, h: i.h + o, radius: i.radius };
}
const Xe = class extends pt {
    constructor(t) {
        super(),
            (this.options = void 0),
            (this.horizontal = void 0),
            (this.base = void 0),
            (this.width = void 0),
            (this.height = void 0),
            (this.inflateAmount = void 0),
            t && Object.assign(this, t);
    }

    draw(t) {
        const {
            inflateAmount: e,
            options: { borderColor: s, backgroundColor: n },
        } = this;
        const { inner: r, outer: o } = Ad(this);
        const a = Ld(o.radius) ? Re : Pd;
        t.save(),
            (o.w !== r.w || o.h !== r.h) &&
                (t.beginPath(),
                a(t, lr(o, e, r)),
                t.clip(),
                a(t, lr(r, -e, o)),
                (t.fillStyle = s),
                t.fill("evenodd")),
            t.beginPath(),
            a(t, lr(r, e)),
            (t.fillStyle = n),
            t.fill(),
            t.restore();
    }

    inRange(t, e, s) {
        return ar(this, t, e, s);
    }

    inXRange(t, e) {
        return ar(this, t, null, e);
    }

    inYRange(t, e) {
        return ar(this, null, t, e);
    }

    getCenterPoint(t) {
        const {
            x: e,
            y: s,
            base: n,
            horizontal: r,
        } = this.getProps(["x", "y", "base", "horizontal"], t);
        return { x: r ? (e + n) / 2 : e, y: r ? s : (s + n) / 2 };
    }

    getRange(t) {
        return t === "x" ? this.width / 2 : this.height / 2;
    }
};
Xe.id = "bar";
Xe.defaults = {
    borderSkipped: "start",
    borderWidth: 0,
    borderRadius: 0,
    inflateAmount: "auto",
    pointStyle: void 0,
};
Xe.defaultRoutes = {
    backgroundColor: "backgroundColor",
    borderColor: "borderColor",
};
const Nd = Object.freeze({
    __proto__: null,
    ArcElement: qe,
    LineElement: Nt,
    PointElement: Ge,
    BarElement: Xe,
});
function Rd(i, t, e, s, n) {
    const r = n.samples || s;
    if (r >= e) return i.slice(t, t + e);
    const o = [];
    const a = (e - 2) / (r - 2);
    let l = 0;
    const c = t + e - 1;
    let h = t;
    let u;
    let d;
    let f;
    let m;
    let g;
    for (o[l++] = i[h], u = 0; u < r - 2; u++) {
        let p = 0;
        let y = 0;
        let b;
        const _ = Math.floor((u + 1) * a) + 1 + t;
        const w = Math.min(Math.floor((u + 2) * a) + 1, e) + t;
        const x = w - _;
        for (b = _; b < w; b++) (p += i[b].x), (y += i[b].y);
        (p /= x), (y /= x);
        const S = Math.floor(u * a) + 1 + t;
        const k = Math.min(Math.floor((u + 1) * a) + 1, e) + t;
        const { x: v, y: T } = i[h];
        for (f = m = -1, b = S; b < k; b++) {
            (m =
                0.5 *
                Math.abs((v - p) * (i[b].y - T) - (v - i[b].x) * (y - T))),
                m > f && ((f = m), (d = i[b]), (g = b));
        }
        (o[l++] = d), (h = g);
    }
    return (o[l++] = i[c]), o;
}
function Wd(i, t, e, s) {
    let n = 0;
    let r = 0;
    let o;
    let a;
    let l;
    let c;
    let h;
    let u;
    let d;
    let f;
    let m;
    let g;
    const p = [];
    const y = t + e - 1;
    const b = i[t].x;
    const w = i[y].x - b;
    for (o = t; o < t + e; ++o) {
        (a = i[o]), (l = ((a.x - b) / w) * s), (c = a.y);
        const x = l | 0;
        if (x === h) {
            c < m ? ((m = c), (u = o)) : c > g && ((g = c), (d = o)),
                (n = (r * n + a.x) / ++r);
        } else {
            const S = o - 1;
            if (!P(u) && !P(d)) {
                const k = Math.min(u, d);
                const v = Math.max(u, d);
                k !== f && k !== S && p.push({ ...i[k], x: n }),
                    v !== f && v !== S && p.push({ ...i[v], x: n });
            }
            o > 0 && S !== f && p.push(i[S]),
                p.push(a),
                (h = x),
                (r = 0),
                (m = g = c),
                (u = d = f = o);
        }
    }
    return p;
}
function pl(i) {
    if (i._decimated) {
        const t = i._data;
        delete i._decimated,
            delete i._data,
            Object.defineProperty(i, "data", { value: t });
    }
}
function Pa(i) {
    i.data.datasets.forEach((t) => {
        pl(t);
    });
}
function zd(i, t) {
    const e = t.length;
    let s = 0;
    let n;
    const { iScale: r } = i;
    const { min: o, max: a, minDefined: l, maxDefined: c } = r.getUserBounds();
    return (
        l && (s = tt(Ct(t, r.axis, o).lo, 0, e - 1)),
        c ? (n = tt(Ct(t, r.axis, a).hi + 1, s, e) - s) : (n = e - s),
        { start: s, count: n }
    );
}
const Vd = {
    id: "decimation",
    defaults: { algorithm: "min-max", enabled: !1 },
    beforeElementsUpdate: (i, t, e) => {
        if (!e.enabled) {
            Pa(i);
            return;
        }
        const s = i.width;
        i.data.datasets.forEach((n, r) => {
            const { _data: o, indexAxis: a } = n;
            const l = i.getDatasetMeta(r);
            const c = o || n.data;
            if (
                We([a, i.options.indexAxis]) === "y" ||
                !l.controller.supportsDecimation
            ) {
                return;
            }
            const h = i.scales[l.xAxisID];
            if (
                (h.type !== "linear" && h.type !== "time") ||
                i.options.parsing
            ) {
                return;
            }
            const { start: u, count: d } = zd(l, c);
            const f = e.threshold || 4 * s;
            if (d <= f) {
                pl(n);
                return;
            }
            P(o) &&
                ((n._data = c),
                delete n.data,
                Object.defineProperty(n, "data", {
                    configurable: !0,
                    enumerable: !0,
                    get: function () {
                        return this._decimated;
                    },
                    set: function (g) {
                        this._data = g;
                    },
                }));
            let m;
            switch (e.algorithm) {
                case "lttb":
                    m = Rd(c, u, d, s, e);
                    break;
                case "min-max":
                    m = Wd(c, u, d, s);
                    break;
                default:
                    throw new Error(
                        `Unsupported decimation algorithm '${e.algorithm}'`,
                    );
            }
            n._decimated = m;
        });
    },
    destroy(i) {
        Pa(i);
    },
};
function Hd(i, t, e) {
    const s = i.segments;
    const n = i.points;
    const r = t.points;
    const o = [];
    for (const a of s) {
        let { start: l, end: c } = a;
        c = Mr(l, c, n);
        const h = wr(e, n[l], n[c], a.loop);
        if (!t.segments) {
            o.push({ source: a, target: h, start: n[l], end: n[c] });
            continue;
        }
        const u = tr(t, h);
        for (const d of u) {
            const f = wr(e, r[d.start], r[d.end], d.loop);
            const m = Qn(a, n, f);
            for (const g of m) {
                o.push({
                    source: g,
                    target: d,
                    start: { [e]: Na(h, f, "start", Math.max) },
                    end: { [e]: Na(h, f, "end", Math.min) },
                });
            }
        }
    }
    return o;
}
function wr(i, t, e, s) {
    if (s) return;
    let n = t[i];
    let r = e[i];
    return (
        i === "angle" && ((n = ct(n)), (r = ct(r))),
        { property: i, start: n, end: r }
    );
}
function Bd(i, t) {
    const { x: e = null, y: s = null } = i || {};
    const n = t.points;
    const r = [];
    return (
        t.segments.forEach(({ start: o, end: a }) => {
            a = Mr(o, a, n);
            const l = n[o];
            const c = n[a];
            s !== null
                ? (r.push({ x: l.x, y: s }), r.push({ x: c.x, y: s }))
                : e !== null &&
                  (r.push({ x: e, y: l.y }), r.push({ x: e, y: c.y }));
        }),
        r
    );
}
function Mr(i, t, e) {
    for (; t > i; t--) {
        const s = e[t];
        if (!isNaN(s.x) && !isNaN(s.y)) break;
    }
    return t;
}
function Na(i, t, e, s) {
    return i && t ? s(i[e], t[e]) : i ? i[e] : t ? t[e] : 0;
}
function yl(i, t) {
    let e = [];
    let s = !1;
    return (
        B(i) ? ((s = !0), (e = i)) : (e = Bd(i, t)),
        e.length
            ? new Nt({
                  points: e,
                  options: { tension: 0 },
                  _loop: s,
                  _fullLoop: s,
              })
            : null
    );
}
function Ra(i) {
    return i && i.fill !== !1;
}
function $d(i, t, e) {
    let n = i[t].fill;
    const r = [t];
    let o;
    if (!e) return n;
    for (; n !== !1 && r.indexOf(n) === -1; ) {
        if (!q(n)) return n;
        if (((o = i[n]), !o)) return !1;
        if (o.visible) return n;
        r.push(n), (n = o.fill);
    }
    return !1;
}
function jd(i, t, e) {
    const s = qd(i);
    if (F(s)) return isNaN(s.value) ? !1 : s;
    const n = parseFloat(s);
    return q(n) && Math.floor(n) === n
        ? Ud(s[0], t, n, e)
        : ["origin", "start", "end", "stack", "shape"].indexOf(s) >= 0 && s;
}
function Ud(i, t, e, s) {
    return (
        (i === "-" || i === "+") && (e = t + e),
        e === t || e < 0 || e >= s ? !1 : e
    );
}
function Yd(i, t) {
    let e = null;
    return (
        i === "start"
            ? (e = t.bottom)
            : i === "end"
              ? (e = t.top)
              : F(i)
                ? (e = t.getPixelForValue(i.value))
                : t.getBasePixel && (e = t.getBasePixel()),
        e
    );
}
function Zd(i, t, e) {
    let s;
    return (
        i === "start"
            ? (s = e)
            : i === "end"
              ? (s = t.options.reverse ? t.min : t.max)
              : F(i)
                ? (s = i.value)
                : (s = t.getBaseValue()),
        s
    );
}
function qd(i) {
    const t = i.options;
    const e = t.fill;
    let s = E(e && e.target, e);
    return (
        s === void 0 && (s = !!t.backgroundColor),
        s === !1 || s === null ? !1 : s === !0 ? "origin" : s
    );
}
function Gd(i) {
    const { scale: t, index: e, line: s } = i;
    const n = [];
    const r = s.segments;
    const o = s.points;
    const a = Xd(t, e);
    a.push(yl({ x: null, y: t.bottom }, s));
    for (let l = 0; l < r.length; l++) {
        const c = r[l];
        for (let h = c.start; h <= c.end; h++) Kd(n, o[h], a);
    }
    return new Nt({ points: n, options: {} });
}
function Xd(i, t) {
    const e = [];
    const s = i.getMatchingVisibleMetas("line");
    for (let n = 0; n < s.length; n++) {
        const r = s[n];
        if (r.index === t) break;
        r.hidden || e.unshift(r.dataset);
    }
    return e;
}
function Kd(i, t, e) {
    const s = [];
    for (let n = 0; n < e.length; n++) {
        const r = e[n];
        const { first: o, last: a, point: l } = Jd(r, t, "x");
        if (!(!l || (o && a))) {
            if (o) s.unshift(l);
            else if ((i.push(l), !a)) break;
        }
    }
    i.push(...s);
}
function Jd(i, t, e) {
    const s = i.interpolate(t, e);
    if (!s) return {};
    const n = s[e];
    const r = i.segments;
    const o = i.points;
    let a = !1;
    let l = !1;
    for (let c = 0; c < r.length; c++) {
        const h = r[c];
        const u = o[h.start][e];
        const d = o[h.end][e];
        if (At(n, u, d)) {
            (a = n === u), (l = n === d);
            break;
        }
    }
    return { first: a, last: l, point: s };
}
const Zs = class {
    constructor(t) {
        (this.x = t.x), (this.y = t.y), (this.radius = t.radius);
    }

    pathSegment(t, e, s) {
        const { x: n, y: r, radius: o } = this;
        return (
            (e = e || { start: 0, end: H }),
            t.arc(n, r, o, e.end, e.start, !0),
            !s.bounds
        );
    }

    interpolate(t) {
        const { x: e, y: s, radius: n } = this;
        const r = t.angle;
        return { x: e + Math.cos(r) * n, y: s + Math.sin(r) * n, angle: r };
    }
};
function Qd(i) {
    const { chart: t, fill: e, line: s } = i;
    if (q(e)) return tf(t, e);
    if (e === "stack") return Gd(i);
    if (e === "shape") return !0;
    const n = ef(i);
    return n instanceof Zs ? n : yl(n, s);
}
function tf(i, t) {
    const e = i.getDatasetMeta(t);
    return e && i.isDatasetVisible(t) ? e.dataset : null;
}
function ef(i) {
    return (i.scale || {}).getPointPositionForValue ? nf(i) : sf(i);
}
function sf(i) {
    const { scale: t = {}, fill: e } = i;
    const s = Yd(e, t);
    if (q(s)) {
        const n = t.isHorizontal();
        return { x: n ? s : null, y: n ? null : s };
    }
    return null;
}
function nf(i) {
    const { scale: t, fill: e } = i;
    const s = t.options;
    const n = t.getLabels().length;
    const r = s.reverse ? t.max : t.min;
    const o = Zd(e, t, r);
    const a = [];
    if (s.grid.circular) {
        const l = t.getPointPositionForValue(0, r);
        return new Zs({
            x: l.x,
            y: l.y,
            radius: t.getDistanceFromCenterForValue(o),
        });
    }
    for (let l = 0; l < n; ++l) a.push(t.getPointPositionForValue(l, o));
    return a;
}
function cr(i, t, e) {
    const s = Qd(t);
    const { line: n, scale: r, axis: o } = t;
    const a = n.options;
    const l = a.fill;
    const c = a.backgroundColor;
    const { above: h = c, below: u = c } = l || {};
    s &&
        n.points.length &&
        (wi(i, e),
        rf(i, {
            line: n,
            target: s,
            above: h,
            below: u,
            area: e,
            scale: r,
            axis: o,
        }),
        Si(i));
}
function rf(i, t) {
    const { line: e, target: s, above: n, below: r, area: o, scale: a } = t;
    const l = e._loop ? "angle" : t.axis;
    i.save(),
        l === "x" &&
            r !== n &&
            (Wa(i, s, o.top),
            za(i, { line: e, target: s, color: n, scale: a, property: l }),
            i.restore(),
            i.save(),
            Wa(i, s, o.bottom)),
        za(i, { line: e, target: s, color: r, scale: a, property: l }),
        i.restore();
}
function Wa(i, t, e) {
    const { segments: s, points: n } = t;
    let r = !0;
    let o = !1;
    i.beginPath();
    for (const a of s) {
        const { start: l, end: c } = a;
        const h = n[l];
        const u = n[Mr(l, c, n)];
        r
            ? (i.moveTo(h.x, h.y), (r = !1))
            : (i.lineTo(h.x, e), i.lineTo(h.x, h.y)),
            (o = !!t.pathSegment(i, a, { move: o })),
            o ? i.closePath() : i.lineTo(u.x, e);
    }
    i.lineTo(t.first().x, e), i.closePath(), i.clip();
}
function za(i, t) {
    const { line: e, target: s, property: n, color: r, scale: o } = t;
    const a = Hd(e, s, n);
    for (const { source: l, target: c, start: h, end: u } of a) {
        const { style: { backgroundColor: d = r } = {} } = l;
        const f = s !== !0;
        i.save(), (i.fillStyle = d), of(i, o, f && wr(n, h, u)), i.beginPath();
        const m = !!e.pathSegment(i, l);
        let g;
        if (f) {
            m ? i.closePath() : Va(i, s, u, n);
            const p = !!s.pathSegment(i, c, { move: m, reverse: !0 });
            (g = m && p), g || Va(i, s, h, n);
        }
        i.closePath(), i.fill(g ? "evenodd" : "nonzero"), i.restore();
    }
}
function of(i, t, e) {
    const { top: s, bottom: n } = t.chart.chartArea;
    const { property: r, start: o, end: a } = e || {};
    r === "x" && (i.beginPath(), i.rect(o, s, a - o, n - s), i.clip());
}
function Va(i, t, e, s) {
    const n = t.interpolate(e, s);
    n && i.lineTo(n.x, n.y);
}
const af = {
    id: "filler",
    afterDatasetsUpdate(i, t, e) {
        const s = (i.data.datasets || []).length;
        const n = [];
        let r;
        let o;
        let a;
        let l;
        for (o = 0; o < s; ++o) {
            (r = i.getDatasetMeta(o)),
                (a = r.dataset),
                (l = null),
                a &&
                    a.options &&
                    a instanceof Nt &&
                    (l = {
                        visible: i.isDatasetVisible(o),
                        index: o,
                        fill: jd(a, o, s),
                        chart: i,
                        axis: r.controller.options.indexAxis,
                        scale: r.vScale,
                        line: a,
                    }),
                (r.$filler = l),
                n.push(l);
        }
        for (o = 0; o < s; ++o) {
            (l = n[o]),
                !(!l || l.fill === !1) && (l.fill = $d(n, o, e.propagate));
        }
    },
    beforeDraw(i, t, e) {
        const s = e.drawTime === "beforeDraw";
        const n = i.getSortedVisibleDatasetMetas();
        const r = i.chartArea;
        for (let o = n.length - 1; o >= 0; --o) {
            const a = n[o].$filler;
            a &&
                (a.line.updateControlPoints(r, a.axis),
                s && a.fill && cr(i.ctx, a, r));
        }
    },
    beforeDatasetsDraw(i, t, e) {
        if (e.drawTime !== "beforeDatasetsDraw") return;
        const s = i.getSortedVisibleDatasetMetas();
        for (let n = s.length - 1; n >= 0; --n) {
            const r = s[n].$filler;
            Ra(r) && cr(i.ctx, r, i.chartArea);
        }
    },
    beforeDatasetDraw(i, t, e) {
        const s = t.meta.$filler;
        !Ra(s) ||
            e.drawTime !== "beforeDatasetDraw" ||
            cr(i.ctx, s, i.chartArea);
    },
    defaults: { propagate: !0, drawTime: "beforeDatasetDraw" },
};
const Ha = (i, t) => {
    let { boxHeight: e = t, boxWidth: s = t } = i;
    return (
        i.usePointStyle &&
            ((e = Math.min(e, t)), (s = i.pointStyleWidth || Math.min(s, t))),
        { boxWidth: s, boxHeight: e, itemHeight: Math.max(t, e) }
    );
};
const lf = (i, t) =>
    i !== null &&
    t !== null &&
    i.datasetIndex === t.datasetIndex &&
    i.index === t.index;
const qs = class extends pt {
    constructor(t) {
        super(),
            (this._added = !1),
            (this.legendHitBoxes = []),
            (this._hoveredItem = null),
            (this.doughnutMode = !1),
            (this.chart = t.chart),
            (this.options = t.options),
            (this.ctx = t.ctx),
            (this.legendItems = void 0),
            (this.columnSizes = void 0),
            (this.lineWidths = void 0),
            (this.maxHeight = void 0),
            (this.maxWidth = void 0),
            (this.top = void 0),
            (this.bottom = void 0),
            (this.left = void 0),
            (this.right = void 0),
            (this.height = void 0),
            (this.width = void 0),
            (this._margins = void 0),
            (this.position = void 0),
            (this.weight = void 0),
            (this.fullSize = void 0);
    }

    update(t, e, s) {
        (this.maxWidth = t),
            (this.maxHeight = e),
            (this._margins = s),
            this.setDimensions(),
            this.buildLabels(),
            this.fit();
    }

    setDimensions() {
        this.isHorizontal()
            ? ((this.width = this.maxWidth),
              (this.left = this._margins.left),
              (this.right = this.width))
            : ((this.height = this.maxHeight),
              (this.top = this._margins.top),
              (this.bottom = this.height));
    }

    buildLabels() {
        const t = this.options.labels || {};
        let e = $(t.generateLabels, [this.chart], this) || [];
        t.filter && (e = e.filter((s) => t.filter(s, this.chart.data))),
            t.sort && (e = e.sort((s, n) => t.sort(s, n, this.chart.data))),
            this.options.reverse && e.reverse(),
            (this.legendItems = e);
    }

    fit() {
        const { options: t, ctx: e } = this;
        if (!t.display) {
            this.width = this.height = 0;
            return;
        }
        const s = t.labels;
        const n = Q(s.font);
        const r = n.size;
        const o = this._computeTitleHeight();
        const { boxWidth: a, itemHeight: l } = Ha(s, r);
        let c;
        let h;
        (e.font = n.string),
            this.isHorizontal()
                ? ((c = this.maxWidth), (h = this._fitRows(o, r, a, l) + 10))
                : ((h = this.maxHeight), (c = this._fitCols(o, r, a, l) + 10)),
            (this.width = Math.min(c, t.maxWidth || this.maxWidth)),
            (this.height = Math.min(h, t.maxHeight || this.maxHeight));
    }

    _fitRows(t, e, s, n) {
        const {
            ctx: r,
            maxWidth: o,
            options: {
                labels: { padding: a },
            },
        } = this;
        const l = (this.legendHitBoxes = []);
        const c = (this.lineWidths = [0]);
        const h = n + a;
        let u = t;
        (r.textAlign = "left"), (r.textBaseline = "middle");
        let d = -1;
        let f = -h;
        return (
            this.legendItems.forEach((m, g) => {
                const p = s + e / 2 + r.measureText(m.text).width;
                (g === 0 || c[c.length - 1] + p + 2 * a > o) &&
                    ((u += h),
                    (c[c.length - (g > 0 ? 0 : 1)] = 0),
                    (f += h),
                    d++),
                    (l[g] = { left: 0, top: f, row: d, width: p, height: n }),
                    (c[c.length - 1] += p + a);
            }),
            u
        );
    }

    _fitCols(t, e, s, n) {
        const {
            ctx: r,
            maxHeight: o,
            options: {
                labels: { padding: a },
            },
        } = this;
        const l = (this.legendHitBoxes = []);
        const c = (this.columnSizes = []);
        const h = o - t;
        let u = a;
        let d = 0;
        let f = 0;
        let m = 0;
        let g = 0;
        return (
            this.legendItems.forEach((p, y) => {
                const b = s + e / 2 + r.measureText(p.text).width;
                y > 0 &&
                    f + n + 2 * a > h &&
                    ((u += d + a),
                    c.push({ width: d, height: f }),
                    (m += d + a),
                    g++,
                    (d = f = 0)),
                    (l[y] = { left: m, top: f, col: g, width: b, height: n }),
                    (d = Math.max(d, b)),
                    (f += n + a);
            }),
            (u += d),
            c.push({ width: d, height: f }),
            u
        );
    }

    adjustHitBoxes() {
        if (!this.options.display) return;
        const t = this._computeTitleHeight();
        const {
            legendHitBoxes: e,
            options: {
                align: s,
                labels: { padding: n },
                rtl: r,
            },
        } = this;
        const o = pe(r, this.left, this.width);
        if (this.isHorizontal()) {
            let a = 0;
            let l = nt(s, this.left + n, this.right - this.lineWidths[a]);
            for (const c of e) {
                a !== c.row &&
                    ((a = c.row),
                    (l = nt(
                        s,
                        this.left + n,
                        this.right - this.lineWidths[a],
                    ))),
                    (c.top += this.top + t + n),
                    (c.left = o.leftForLtr(o.x(l), c.width)),
                    (l += c.width + n);
            }
        } else {
            let a = 0;
            let l = nt(
                s,
                this.top + t + n,
                this.bottom - this.columnSizes[a].height,
            );
            for (const c of e) {
                c.col !== a &&
                    ((a = c.col),
                    (l = nt(
                        s,
                        this.top + t + n,
                        this.bottom - this.columnSizes[a].height,
                    ))),
                    (c.top = l),
                    (c.left += this.left + n),
                    (c.left = o.leftForLtr(o.x(c.left), c.width)),
                    (l += c.height + n);
            }
        }
    }

    isHorizontal() {
        return (
            this.options.position === "top" ||
            this.options.position === "bottom"
        );
    }

    draw() {
        if (this.options.display) {
            const t = this.ctx;
            wi(t, this), this._draw(), Si(t);
        }
    }

    _draw() {
        const { options: t, columnSizes: e, lineWidths: s, ctx: n } = this;
        const { align: r, labels: o } = t;
        const a = A.color;
        const l = pe(t.rtl, this.left, this.width);
        const c = Q(o.font);
        const { color: h, padding: u } = o;
        const d = c.size;
        const f = d / 2;
        let m;
        this.drawTitle(),
            (n.textAlign = l.textAlign("left")),
            (n.textBaseline = "middle"),
            (n.lineWidth = 0.5),
            (n.font = c.string);
        const { boxWidth: g, boxHeight: p, itemHeight: y } = Ha(o, d);
        const b = function (k, v, T) {
            if (isNaN(g) || g <= 0 || isNaN(p) || p < 0) return;
            n.save();
            const C = E(T.lineWidth, 1);
            if (
                ((n.fillStyle = E(T.fillStyle, a)),
                (n.lineCap = E(T.lineCap, "butt")),
                (n.lineDashOffset = E(T.lineDashOffset, 0)),
                (n.lineJoin = E(T.lineJoin, "miter")),
                (n.lineWidth = C),
                (n.strokeStyle = E(T.strokeStyle, a)),
                n.setLineDash(E(T.lineDash, [])),
                o.usePointStyle)
            ) {
                const N = {
                    radius: (p * Math.SQRT2) / 2,
                    pointStyle: T.pointStyle,
                    rotation: T.rotation,
                    borderWidth: C,
                };
                const L = l.xPlus(k, g / 2);
                const K = v + f;
                Bn(n, N, L, K, o.pointStyleWidth && g);
            } else {
                const N = v + Math.max((d - p) / 2, 0);
                const L = l.leftForLtr(k, g);
                const K = te(T.borderRadius);
                n.beginPath(),
                    Object.values(K).some((lt) => lt !== 0)
                        ? Re(n, { x: L, y: N, w: g, h: p, radius: K })
                        : n.rect(L, N, g, p),
                    n.fill(),
                    C !== 0 && n.stroke();
            }
            n.restore();
        };
        const _ = function (k, v, T) {
            Qt(n, T.text, k, v + y / 2, c, {
                strikethrough: T.hidden,
                textAlign: l.textAlign(T.textAlign),
            });
        };
        const w = this.isHorizontal();
        const x = this._computeTitleHeight();
        w
            ? (m = {
                  x: nt(r, this.left + u, this.right - s[0]),
                  y: this.top + u + x,
                  line: 0,
              })
            : (m = {
                  x: this.left + u,
                  y: nt(r, this.top + x + u, this.bottom - e[0].height),
                  line: 0,
              }),
            Kn(this.ctx, t.textDirection);
        const S = y + u;
        this.legendItems.forEach((k, v) => {
            (n.strokeStyle = k.fontColor || h),
                (n.fillStyle = k.fontColor || h);
            const T = n.measureText(k.text).width;
            const C = l.textAlign(k.textAlign || (k.textAlign = o.textAlign));
            const N = g + f + T;
            let L = m.x;
            let K = m.y;
            l.setWidth(this.width),
                w
                    ? v > 0 &&
                      L + N + u > this.right &&
                      ((K = m.y += S),
                      m.line++,
                      (L = m.x = nt(r, this.left + u, this.right - s[m.line])))
                    : v > 0 &&
                      K + S > this.bottom &&
                      ((L = m.x = L + e[m.line].width + u),
                      m.line++,
                      (K = m.y =
                          nt(
                              r,
                              this.top + x + u,
                              this.bottom - e[m.line].height,
                          )));
            const lt = l.x(L);
            b(lt, K, k),
                (L = Bo(C, L + g + f, w ? L + N : this.right, t.rtl)),
                _(l.x(L), K, k),
                w ? (m.x += N + u) : (m.y += S);
        }),
            Jn(this.ctx, t.textDirection);
    }

    drawTitle() {
        const t = this.options;
        const e = t.title;
        const s = Q(e.font);
        const n = rt(e.padding);
        if (!e.display) return;
        const r = pe(t.rtl, this.left, this.width);
        const o = this.ctx;
        const a = e.position;
        const l = s.size / 2;
        const c = n.top + l;
        let h;
        let u = this.left;
        let d = this.width;
        if (this.isHorizontal()) {
            (d = Math.max(...this.lineWidths)),
                (h = this.top + c),
                (u = nt(t.align, u, this.right - d));
        } else {
            const m = this.columnSizes.reduce(
                (g, p) => Math.max(g, p.height),
                0,
            );
            h =
                c +
                nt(
                    t.align,
                    this.top,
                    this.bottom -
                        m -
                        t.labels.padding -
                        this._computeTitleHeight(),
                );
        }
        const f = nt(a, u, u + d);
        (o.textAlign = r.textAlign(Es(a))),
            (o.textBaseline = "middle"),
            (o.strokeStyle = e.color),
            (o.fillStyle = e.color),
            (o.font = s.string),
            Qt(o, e.text, f, h, s);
    }

    _computeTitleHeight() {
        const t = this.options.title;
        const e = Q(t.font);
        const s = rt(t.padding);
        return t.display ? e.lineHeight + s.height : 0;
    }

    _getLegendItemAt(t, e) {
        let s, n, r;
        if (At(t, this.left, this.right) && At(e, this.top, this.bottom)) {
            for (r = this.legendHitBoxes, s = 0; s < r.length; ++s) {
                if (
                    ((n = r[s]),
                    At(t, n.left, n.left + n.width) &&
                        At(e, n.top, n.top + n.height))
                ) {
                    return this.legendItems[s];
                }
            }
        }
        return null;
    }

    handleEvent(t) {
        const e = this.options;
        if (!cf(t.type, e)) return;
        const s = this._getLegendItemAt(t.x, t.y);
        if (t.type === "mousemove" || t.type === "mouseout") {
            const n = this._hoveredItem;
            const r = lf(n, s);
            n && !r && $(e.onLeave, [t, n, this], this),
                (this._hoveredItem = s),
                s && !r && $(e.onHover, [t, s, this], this);
        } else s && $(e.onClick, [t, s, this], this);
    }
};
function cf(i, t) {
    return !!(
        ((i === "mousemove" || i === "mouseout") && (t.onHover || t.onLeave)) ||
        (t.onClick && (i === "click" || i === "mouseup"))
    );
}
const hf = {
    id: "legend",
    _element: qs,
    start(i, t, e) {
        const s = (i.legend = new qs({ ctx: i.ctx, options: e, chart: i }));
        ot.configure(i, s, e), ot.addBox(i, s);
    },
    stop(i) {
        ot.removeBox(i, i.legend), delete i.legend;
    },
    beforeUpdate(i, t, e) {
        const s = i.legend;
        ot.configure(i, s, e), (s.options = e);
    },
    afterUpdate(i) {
        const t = i.legend;
        t.buildLabels(), t.adjustHitBoxes();
    },
    afterEvent(i, t) {
        t.replay || i.legend.handleEvent(t.event);
    },
    defaults: {
        display: !0,
        position: "top",
        align: "center",
        fullSize: !0,
        reverse: !1,
        weight: 1e3,
        onClick(i, t, e) {
            const s = t.datasetIndex;
            const n = e.chart;
            n.isDatasetVisible(s)
                ? (n.hide(s), (t.hidden = !0))
                : (n.show(s), (t.hidden = !1));
        },
        onHover: null,
        onLeave: null,
        labels: {
            color: (i) => i.chart.options.color,
            boxWidth: 40,
            padding: 10,
            generateLabels(i) {
                const t = i.data.datasets;
                const {
                    labels: {
                        usePointStyle: e,
                        pointStyle: s,
                        textAlign: n,
                        color: r,
                    },
                } = i.legend.options;
                return i._getSortedDatasetMetas().map((o) => {
                    const a = o.controller.getStyle(e ? 0 : void 0);
                    const l = rt(a.borderWidth);
                    return {
                        text: t[o.index].label,
                        fillStyle: a.backgroundColor,
                        fontColor: r,
                        hidden: !o.visible,
                        lineCap: a.borderCapStyle,
                        lineDash: a.borderDash,
                        lineDashOffset: a.borderDashOffset,
                        lineJoin: a.borderJoinStyle,
                        lineWidth: (l.width + l.height) / 4,
                        strokeStyle: a.borderColor,
                        pointStyle: s || a.pointStyle,
                        rotation: a.rotation,
                        textAlign: n || a.textAlign,
                        borderRadius: 0,
                        datasetIndex: o.index,
                    };
                }, this);
            },
        },
        title: {
            color: (i) => i.chart.options.color,
            display: !1,
            position: "center",
            text: "",
        },
    },
    descriptors: {
        _scriptable: (i) => !i.startsWith("on"),
        labels: {
            _scriptable: (i) =>
                !["generateLabels", "filter", "sort"].includes(i),
        },
    },
};
const Ai = class extends pt {
    constructor(t) {
        super(),
            (this.chart = t.chart),
            (this.options = t.options),
            (this.ctx = t.ctx),
            (this._padding = void 0),
            (this.top = void 0),
            (this.bottom = void 0),
            (this.left = void 0),
            (this.right = void 0),
            (this.width = void 0),
            (this.height = void 0),
            (this.position = void 0),
            (this.weight = void 0),
            (this.fullSize = void 0);
    }

    update(t, e) {
        const s = this.options;
        if (((this.left = 0), (this.top = 0), !s.display)) {
            this.width = this.height = this.right = this.bottom = 0;
            return;
        }
        (this.width = this.right = t), (this.height = this.bottom = e);
        const n = B(s.text) ? s.text.length : 1;
        this._padding = rt(s.padding);
        const r = n * Q(s.font).lineHeight + this._padding.height;
        this.isHorizontal() ? (this.height = r) : (this.width = r);
    }

    isHorizontal() {
        const t = this.options.position;
        return t === "top" || t === "bottom";
    }

    _drawArgs(t) {
        const { top: e, left: s, bottom: n, right: r, options: o } = this;
        const a = o.align;
        let l = 0;
        let c;
        let h;
        let u;
        return (
            this.isHorizontal()
                ? ((h = nt(a, s, r)), (u = e + t), (c = r - s))
                : (o.position === "left"
                      ? ((h = s + t), (u = nt(a, n, e)), (l = j * -0.5))
                      : ((h = r - t), (u = nt(a, e, n)), (l = j * 0.5)),
                  (c = n - e)),
            { titleX: h, titleY: u, maxWidth: c, rotation: l }
        );
    }

    draw() {
        const t = this.ctx;
        const e = this.options;
        if (!e.display) return;
        const s = Q(e.font);
        const r = s.lineHeight / 2 + this._padding.top;
        const {
            titleX: o,
            titleY: a,
            maxWidth: l,
            rotation: c,
        } = this._drawArgs(r);
        Qt(t, e.text, 0, 0, s, {
            color: e.color,
            maxWidth: l,
            rotation: c,
            textAlign: Es(e.align),
            textBaseline: "middle",
            translation: [o, a],
        });
    }
};
function uf(i, t) {
    const e = new Ai({ ctx: i.ctx, options: t, chart: i });
    ot.configure(i, e, t), ot.addBox(i, e), (i.titleBlock = e);
}
const df = {
    id: "title",
    _element: Ai,
    start(i, t, e) {
        uf(i, e);
    },
    stop(i) {
        const t = i.titleBlock;
        ot.removeBox(i, t), delete i.titleBlock;
    },
    beforeUpdate(i, t, e) {
        const s = i.titleBlock;
        ot.configure(i, s, e), (s.options = e);
    },
    defaults: {
        align: "center",
        display: !1,
        font: { weight: "bold" },
        fullSize: !0,
        padding: 10,
        position: "top",
        text: "",
        weight: 2e3,
    },
    defaultRoutes: { color: "color" },
    descriptors: { _scriptable: !0, _indexable: !1 },
};
const zs = new WeakMap();
const ff = {
    id: "subtitle",
    start(i, t, e) {
        const s = new Ai({ ctx: i.ctx, options: e, chart: i });
        ot.configure(i, s, e), ot.addBox(i, s), zs.set(i, s);
    },
    stop(i) {
        ot.removeBox(i, zs.get(i)), zs.delete(i);
    },
    beforeUpdate(i, t, e) {
        const s = zs.get(i);
        ot.configure(i, s, e), (s.options = e);
    },
    defaults: {
        align: "center",
        display: !1,
        font: { weight: "normal" },
        fullSize: !0,
        padding: 0,
        position: "top",
        text: "",
        weight: 1500,
    },
    defaultRoutes: { color: "color" },
    descriptors: { _scriptable: !0, _indexable: !1 },
};
const Ei = {
    average(i) {
        if (!i.length) return !1;
        let t;
        let e;
        let s = 0;
        let n = 0;
        let r = 0;
        for (t = 0, e = i.length; t < e; ++t) {
            const o = i[t].element;
            if (o && o.hasValue()) {
                const a = o.tooltipPosition();
                (s += a.x), (n += a.y), ++r;
            }
        }
        return { x: s / r, y: n / r };
    },
    nearest(i, t) {
        if (!i.length) return !1;
        let e = t.x;
        let s = t.y;
        let n = Number.POSITIVE_INFINITY;
        let r;
        let o;
        let a;
        for (r = 0, o = i.length; r < o; ++r) {
            const l = i[r].element;
            if (l && l.hasValue()) {
                const c = l.getCenterPoint();
                const h = Ms(t, c);
                h < n && ((n = h), (a = l));
            }
        }
        if (a) {
            const l = a.tooltipPosition();
            (e = l.x), (s = l.y);
        }
        return { x: e, y: s };
    },
};
function Lt(i, t) {
    return t && (B(t) ? Array.prototype.push.apply(i, t) : i.push(t)), i;
}
function $t(i) {
    return (typeof i === "string" || i instanceof String) &&
        i.indexOf(`
`) > -1
        ? i.split(`
`)
        : i;
}
function mf(i, t) {
    const { element: e, datasetIndex: s, index: n } = t;
    const r = i.getDatasetMeta(s).controller;
    const { label: o, value: a } = r.getLabelAndValue(n);
    return {
        chart: i,
        label: o,
        parsed: r.getParsed(n),
        raw: i.data.datasets[s].data[n],
        formattedValue: a,
        dataset: r.getDataset(),
        dataIndex: n,
        datasetIndex: s,
        element: e,
    };
}
function Ba(i, t) {
    const e = i.chart.ctx;
    const { body: s, footer: n, title: r } = i;
    const { boxWidth: o, boxHeight: a } = t;
    const l = Q(t.bodyFont);
    const c = Q(t.titleFont);
    const h = Q(t.footerFont);
    const u = r.length;
    const d = n.length;
    const f = s.length;
    const m = rt(t.padding);
    let g = m.height;
    let p = 0;
    let y = s.reduce(
        (w, x) => w + x.before.length + x.lines.length + x.after.length,
        0,
    );
    if (
        ((y += i.beforeBody.length + i.afterBody.length),
        u &&
            (g +=
                u * c.lineHeight +
                (u - 1) * t.titleSpacing +
                t.titleMarginBottom),
        y)
    ) {
        const w = t.displayColors ? Math.max(a, l.lineHeight) : l.lineHeight;
        g += f * w + (y - f) * l.lineHeight + (y - 1) * t.bodySpacing;
    }
    d &&
        (g += t.footerMarginTop + d * h.lineHeight + (d - 1) * t.footerSpacing);
    let b = 0;
    const _ = function (w) {
        p = Math.max(p, e.measureText(w).width + b);
    };
    return (
        e.save(),
        (e.font = c.string),
        V(i.title, _),
        (e.font = l.string),
        V(i.beforeBody.concat(i.afterBody), _),
        (b = t.displayColors ? o + 2 + t.boxPadding : 0),
        V(s, (w) => {
            V(w.before, _), V(w.lines, _), V(w.after, _);
        }),
        (b = 0),
        (e.font = h.string),
        V(i.footer, _),
        e.restore(),
        (p += m.width),
        { width: p, height: g }
    );
}
function gf(i, t) {
    const { y: e, height: s } = t;
    return e < s / 2 ? "top" : e > i.height - s / 2 ? "bottom" : "center";
}
function pf(i, t, e, s) {
    const { x: n, width: r } = s;
    const o = e.caretSize + e.caretPadding;
    if (
        (i === "left" && n + r + o > t.width) ||
        (i === "right" && n - r - o < 0)
    ) {
        return !0;
    }
}
function yf(i, t, e, s) {
    const { x: n, width: r } = e;
    const {
        width: o,
        chartArea: { left: a, right: l },
    } = i;
    let c = "center";
    return (
        s === "center"
            ? (c = n <= (a + l) / 2 ? "left" : "right")
            : n <= r / 2
              ? (c = "left")
              : n >= o - r / 2 && (c = "right"),
        pf(c, i, t, e) && (c = "center"),
        c
    );
}
function $a(i, t, e) {
    const s = e.yAlign || t.yAlign || gf(i, e);
    return { xAlign: e.xAlign || t.xAlign || yf(i, t, e, s), yAlign: s };
}
function bf(i, t) {
    let { x: e, width: s } = i;
    return t === "right" ? (e -= s) : t === "center" && (e -= s / 2), e;
}
function xf(i, t, e) {
    let { y: s, height: n } = i;
    return (
        t === "top" ? (s += e) : t === "bottom" ? (s -= n + e) : (s -= n / 2), s
    );
}
function ja(i, t, e, s) {
    const { caretSize: n, caretPadding: r, cornerRadius: o } = i;
    const { xAlign: a, yAlign: l } = e;
    const c = n + r;
    const { topLeft: h, topRight: u, bottomLeft: d, bottomRight: f } = te(o);
    let m = bf(t, a);
    const g = xf(t, l, c);
    return (
        l === "center"
            ? a === "left"
                ? (m += c)
                : a === "right" && (m -= c)
            : a === "left"
              ? (m -= Math.max(h, d) + n)
              : a === "right" && (m += Math.max(u, f) + n),
        { x: tt(m, 0, s.width - t.width), y: tt(g, 0, s.height - t.height) }
    );
}
function Vs(i, t, e) {
    const s = rt(e.padding);
    return t === "center"
        ? i.x + i.width / 2
        : t === "right"
          ? i.x + i.width - s.right
          : i.x + s.left;
}
function Ua(i) {
    return Lt([], $t(i));
}
function _f(i, t, e) {
    return Ht(i, { tooltip: t, tooltipItems: e, type: "tooltip" });
}
function Ya(i, t) {
    const e =
        t && t.dataset && t.dataset.tooltip && t.dataset.tooltip.callbacks;
    return e ? i.override(e) : i;
}
const Li = class extends pt {
    constructor(t) {
        super(),
            (this.opacity = 0),
            (this._active = []),
            (this._eventPosition = void 0),
            (this._size = void 0),
            (this._cachedAnimations = void 0),
            (this._tooltipItems = []),
            (this.$animations = void 0),
            (this.$context = void 0),
            (this.chart = t.chart || t._chart),
            (this._chart = this.chart),
            (this.options = t.options),
            (this.dataPoints = void 0),
            (this.title = void 0),
            (this.beforeBody = void 0),
            (this.body = void 0),
            (this.afterBody = void 0),
            (this.footer = void 0),
            (this.xAlign = void 0),
            (this.yAlign = void 0),
            (this.x = void 0),
            (this.y = void 0),
            (this.height = void 0),
            (this.width = void 0),
            (this.caretX = void 0),
            (this.caretY = void 0),
            (this.labelColors = void 0),
            (this.labelPointStyles = void 0),
            (this.labelTextColors = void 0);
    }

    initialize(t) {
        (this.options = t),
            (this._cachedAnimations = void 0),
            (this.$context = void 0);
    }

    _resolveAnimations() {
        const t = this._cachedAnimations;
        if (t) return t;
        const e = this.chart;
        const s = this.options.setContext(this.getContext());
        const n = s.enabled && e.options.animation && s.animations;
        const r = new $s(this.chart, n);
        return n._cacheable && (this._cachedAnimations = Object.freeze(r)), r;
    }

    getContext() {
        return (
            this.$context ||
            (this.$context = _f(
                this.chart.getContext(),
                this,
                this._tooltipItems,
            ))
        );
    }

    getTitle(t, e) {
        const { callbacks: s } = e;
        const n = s.beforeTitle.apply(this, [t]);
        const r = s.title.apply(this, [t]);
        const o = s.afterTitle.apply(this, [t]);
        let a = [];
        return (a = Lt(a, $t(n))), (a = Lt(a, $t(r))), (a = Lt(a, $t(o))), a;
    }

    getBeforeBody(t, e) {
        return Ua(e.callbacks.beforeBody.apply(this, [t]));
    }

    getBody(t, e) {
        const { callbacks: s } = e;
        const n = [];
        return (
            V(t, (r) => {
                const o = { before: [], lines: [], after: [] };
                const a = Ya(s, r);
                Lt(o.before, $t(a.beforeLabel.call(this, r))),
                    Lt(o.lines, a.label.call(this, r)),
                    Lt(o.after, $t(a.afterLabel.call(this, r))),
                    n.push(o);
            }),
            n
        );
    }

    getAfterBody(t, e) {
        return Ua(e.callbacks.afterBody.apply(this, [t]));
    }

    getFooter(t, e) {
        const { callbacks: s } = e;
        const n = s.beforeFooter.apply(this, [t]);
        const r = s.footer.apply(this, [t]);
        const o = s.afterFooter.apply(this, [t]);
        let a = [];
        return (a = Lt(a, $t(n))), (a = Lt(a, $t(r))), (a = Lt(a, $t(o))), a;
    }

    _createItems(t) {
        const e = this._active;
        const s = this.chart.data;
        const n = [];
        const r = [];
        const o = [];
        let a = [];
        let l;
        let c;
        for (l = 0, c = e.length; l < c; ++l) a.push(mf(this.chart, e[l]));
        return (
            t.filter && (a = a.filter((h, u, d) => t.filter(h, u, d, s))),
            t.itemSort && (a = a.sort((h, u) => t.itemSort(h, u, s))),
            V(a, (h) => {
                const u = Ya(t.callbacks, h);
                n.push(u.labelColor.call(this, h)),
                    r.push(u.labelPointStyle.call(this, h)),
                    o.push(u.labelTextColor.call(this, h));
            }),
            (this.labelColors = n),
            (this.labelPointStyles = r),
            (this.labelTextColors = o),
            (this.dataPoints = a),
            a
        );
    }

    update(t, e) {
        const s = this.options.setContext(this.getContext());
        const n = this._active;
        let r;
        let o = [];
        if (!n.length) this.opacity !== 0 && (r = { opacity: 0 });
        else {
            const a = Ei[s.position].call(this, n, this._eventPosition);
            (o = this._createItems(s)),
                (this.title = this.getTitle(o, s)),
                (this.beforeBody = this.getBeforeBody(o, s)),
                (this.body = this.getBody(o, s)),
                (this.afterBody = this.getAfterBody(o, s)),
                (this.footer = this.getFooter(o, s));
            const l = (this._size = Ba(this, s));
            const c = Object.assign({}, a, l);
            const h = $a(this.chart, s, c);
            const u = ja(s, c, h, this.chart);
            (this.xAlign = h.xAlign),
                (this.yAlign = h.yAlign),
                (r = {
                    opacity: 1,
                    x: u.x,
                    y: u.y,
                    width: l.width,
                    height: l.height,
                    caretX: a.x,
                    caretY: a.y,
                });
        }
        (this._tooltipItems = o),
            (this.$context = void 0),
            r && this._resolveAnimations().update(this, r),
            t &&
                s.external &&
                s.external.call(this, {
                    chart: this.chart,
                    tooltip: this,
                    replay: e,
                });
    }

    drawCaret(t, e, s, n) {
        const r = this.getCaretPosition(t, s, n);
        e.lineTo(r.x1, r.y1), e.lineTo(r.x2, r.y2), e.lineTo(r.x3, r.y3);
    }

    getCaretPosition(t, e, s) {
        const { xAlign: n, yAlign: r } = this;
        const { caretSize: o, cornerRadius: a } = s;
        const {
            topLeft: l,
            topRight: c,
            bottomLeft: h,
            bottomRight: u,
        } = te(a);
        const { x: d, y: f } = t;
        const { width: m, height: g } = e;
        let p;
        let y;
        let b;
        let _;
        let w;
        let x;
        return (
            r === "center"
                ? ((w = f + g / 2),
                  n === "left"
                      ? ((p = d), (y = p - o), (_ = w + o), (x = w - o))
                      : ((p = d + m), (y = p + o), (_ = w - o), (x = w + o)),
                  (b = p))
                : (n === "left"
                      ? (y = d + Math.max(l, h) + o)
                      : n === "right"
                        ? (y = d + m - Math.max(c, u) - o)
                        : (y = this.caretX),
                  r === "top"
                      ? ((_ = f), (w = _ - o), (p = y - o), (b = y + o))
                      : ((_ = f + g), (w = _ + o), (p = y + o), (b = y - o)),
                  (x = _)),
            { x1: p, x2: y, x3: b, y1: _, y2: w, y3: x }
        );
    }

    drawTitle(t, e, s) {
        const n = this.title;
        const r = n.length;
        let o;
        let a;
        let l;
        if (r) {
            const c = pe(s.rtl, this.x, this.width);
            for (
                t.x = Vs(this, s.titleAlign, s),
                    e.textAlign = c.textAlign(s.titleAlign),
                    e.textBaseline = "middle",
                    o = Q(s.titleFont),
                    a = s.titleSpacing,
                    e.fillStyle = s.titleColor,
                    e.font = o.string,
                    l = 0;
                l < r;
                ++l
            ) {
                e.fillText(n[l], c.x(t.x), t.y + o.lineHeight / 2),
                    (t.y += o.lineHeight + a),
                    l + 1 === r && (t.y += s.titleMarginBottom - a);
            }
        }
    }

    _drawColorBox(t, e, s, n, r) {
        const o = this.labelColors[s];
        const a = this.labelPointStyles[s];
        const { boxHeight: l, boxWidth: c, boxPadding: h } = r;
        const u = Q(r.bodyFont);
        const d = Vs(this, "left", r);
        const f = n.x(d);
        const m = l < u.lineHeight ? (u.lineHeight - l) / 2 : 0;
        const g = e.y + m;
        if (r.usePointStyle) {
            const p = {
                radius: Math.min(c, l) / 2,
                pointStyle: a.pointStyle,
                rotation: a.rotation,
                borderWidth: 1,
            };
            const y = n.leftForLtr(f, c) + c / 2;
            const b = g + l / 2;
            (t.strokeStyle = r.multiKeyBackground),
                (t.fillStyle = r.multiKeyBackground),
                Cs(t, p, y, b),
                (t.strokeStyle = o.borderColor),
                (t.fillStyle = o.backgroundColor),
                Cs(t, p, y, b);
        } else {
            (t.lineWidth = F(o.borderWidth)
                ? Math.max(...Object.values(o.borderWidth))
                : o.borderWidth || 1),
                (t.strokeStyle = o.borderColor),
                t.setLineDash(o.borderDash || []),
                (t.lineDashOffset = o.borderDashOffset || 0);
            const p = n.leftForLtr(f, c - h);
            const y = n.leftForLtr(n.xPlus(f, 1), c - h - 2);
            const b = te(o.borderRadius);
            Object.values(b).some((_) => _ !== 0)
                ? (t.beginPath(),
                  (t.fillStyle = r.multiKeyBackground),
                  Re(t, { x: p, y: g, w: c, h: l, radius: b }),
                  t.fill(),
                  t.stroke(),
                  (t.fillStyle = o.backgroundColor),
                  t.beginPath(),
                  Re(t, { x: y, y: g + 1, w: c - 2, h: l - 2, radius: b }),
                  t.fill())
                : ((t.fillStyle = r.multiKeyBackground),
                  t.fillRect(p, g, c, l),
                  t.strokeRect(p, g, c, l),
                  (t.fillStyle = o.backgroundColor),
                  t.fillRect(y, g + 1, c - 2, l - 2));
        }
        t.fillStyle = this.labelTextColors[s];
    }

    drawBody(t, e, s) {
        const { body: n } = this;
        const {
            bodySpacing: r,
            bodyAlign: o,
            displayColors: a,
            boxHeight: l,
            boxWidth: c,
            boxPadding: h,
        } = s;
        const u = Q(s.bodyFont);
        let d = u.lineHeight;
        let f = 0;
        const m = pe(s.rtl, this.x, this.width);
        const g = function (v) {
            e.fillText(v, m.x(t.x + f), t.y + d / 2), (t.y += d + r);
        };
        const p = m.textAlign(o);
        let y;
        let b;
        let _;
        let w;
        let x;
        let S;
        let k;
        for (
            e.textAlign = o,
                e.textBaseline = "middle",
                e.font = u.string,
                t.x = Vs(this, p, s),
                e.fillStyle = s.bodyColor,
                V(this.beforeBody, g),
                f =
                    a && p !== "right"
                        ? o === "center"
                            ? c / 2 + h
                            : c + 2 + h
                        : 0,
                w = 0,
                S = n.length;
            w < S;
            ++w
        ) {
            for (
                y = n[w],
                    b = this.labelTextColors[w],
                    e.fillStyle = b,
                    V(y.before, g),
                    _ = y.lines,
                    a &&
                        _.length &&
                        (this._drawColorBox(e, t, w, m, s),
                        (d = Math.max(u.lineHeight, l))),
                    x = 0,
                    k = _.length;
                x < k;
                ++x
            ) {
                g(_[x]), (d = u.lineHeight);
            }
            V(y.after, g);
        }
        (f = 0), (d = u.lineHeight), V(this.afterBody, g), (t.y -= r);
    }

    drawFooter(t, e, s) {
        const n = this.footer;
        const r = n.length;
        let o;
        let a;
        if (r) {
            const l = pe(s.rtl, this.x, this.width);
            for (
                t.x = Vs(this, s.footerAlign, s),
                    t.y += s.footerMarginTop,
                    e.textAlign = l.textAlign(s.footerAlign),
                    e.textBaseline = "middle",
                    o = Q(s.footerFont),
                    e.fillStyle = s.footerColor,
                    e.font = o.string,
                    a = 0;
                a < r;
                ++a
            ) {
                e.fillText(n[a], l.x(t.x), t.y + o.lineHeight / 2),
                    (t.y += o.lineHeight + s.footerSpacing);
            }
        }
    }

    drawBackground(t, e, s, n) {
        const { xAlign: r, yAlign: o } = this;
        const { x: a, y: l } = t;
        const { width: c, height: h } = s;
        const {
            topLeft: u,
            topRight: d,
            bottomLeft: f,
            bottomRight: m,
        } = te(n.cornerRadius);
        (e.fillStyle = n.backgroundColor),
            (e.strokeStyle = n.borderColor),
            (e.lineWidth = n.borderWidth),
            e.beginPath(),
            e.moveTo(a + u, l),
            o === "top" && this.drawCaret(t, e, s, n),
            e.lineTo(a + c - d, l),
            e.quadraticCurveTo(a + c, l, a + c, l + d),
            o === "center" && r === "right" && this.drawCaret(t, e, s, n),
            e.lineTo(a + c, l + h - m),
            e.quadraticCurveTo(a + c, l + h, a + c - m, l + h),
            o === "bottom" && this.drawCaret(t, e, s, n),
            e.lineTo(a + f, l + h),
            e.quadraticCurveTo(a, l + h, a, l + h - f),
            o === "center" && r === "left" && this.drawCaret(t, e, s, n),
            e.lineTo(a, l + u),
            e.quadraticCurveTo(a, l, a + u, l),
            e.closePath(),
            e.fill(),
            n.borderWidth > 0 && e.stroke();
    }

    _updateAnimationTarget(t) {
        const e = this.chart;
        const s = this.$animations;
        const n = s && s.x;
        const r = s && s.y;
        if (n || r) {
            const o = Ei[t.position].call(
                this,
                this._active,
                this._eventPosition,
            );
            if (!o) return;
            const a = (this._size = Ba(this, t));
            const l = Object.assign({}, o, this._size);
            const c = $a(e, t, l);
            const h = ja(t, l, c, e);
            (n._to !== h.x || r._to !== h.y) &&
                ((this.xAlign = c.xAlign),
                (this.yAlign = c.yAlign),
                (this.width = a.width),
                (this.height = a.height),
                (this.caretX = o.x),
                (this.caretY = o.y),
                this._resolveAnimations().update(this, h));
        }
    }

    _willRender() {
        return !!this.opacity;
    }

    draw(t) {
        const e = this.options.setContext(this.getContext());
        let s = this.opacity;
        if (!s) return;
        this._updateAnimationTarget(e);
        const n = { width: this.width, height: this.height };
        const r = { x: this.x, y: this.y };
        s = Math.abs(s) < 0.001 ? 0 : s;
        const o = rt(e.padding);
        const a =
            this.title.length ||
            this.beforeBody.length ||
            this.body.length ||
            this.afterBody.length ||
            this.footer.length;
        e.enabled &&
            a &&
            (t.save(),
            (t.globalAlpha = s),
            this.drawBackground(r, t, n, e),
            Kn(t, e.textDirection),
            (r.y += o.top),
            this.drawTitle(r, t, e),
            this.drawBody(r, t, e),
            this.drawFooter(r, t, e),
            Jn(t, e.textDirection),
            t.restore());
    }

    getActiveElements() {
        return this._active || [];
    }

    setActiveElements(t, e) {
        const s = this._active;
        const n = t.map(({ datasetIndex: a, index: l }) => {
            const c = this.chart.getDatasetMeta(a);
            if (!c) throw new Error("Cannot find a dataset at index " + a);
            return { datasetIndex: a, element: c.data[l], index: l };
        });
        const r = !xi(s, n);
        const o = this._positionChanged(n, e);
        (r || o) &&
            ((this._active = n),
            (this._eventPosition = e),
            (this._ignoreReplayEvents = !0),
            this.update(!0));
    }

    handleEvent(t, e, s = !0) {
        if (e && this._ignoreReplayEvents) return !1;
        this._ignoreReplayEvents = !1;
        const n = this.options;
        const r = this._active || [];
        const o = this._getActiveElements(t, r, e, s);
        const a = this._positionChanged(o, t);
        const l = e || !xi(o, r) || a;
        return (
            l &&
                ((this._active = o),
                (n.enabled || n.external) &&
                    ((this._eventPosition = { x: t.x, y: t.y }),
                    this.update(!0, e))),
            l
        );
    }

    _getActiveElements(t, e, s, n) {
        const r = this.options;
        if (t.type === "mouseout") return [];
        if (!n) return e;
        const o = this.chart.getElementsAtEventForMode(t, r.mode, r, s);
        return r.reverse && o.reverse(), o;
    }

    _positionChanged(t, e) {
        const { caretX: s, caretY: n, options: r } = this;
        const o = Ei[r.position].call(this, t, e);
        return o !== !1 && (s !== o.x || n !== o.y);
    }
};
Li.positioners = Ei;
const wf = {
    id: "tooltip",
    _element: Li,
    positioners: Ei,
    afterInit(i, t, e) {
        e && (i.tooltip = new Li({ chart: i, options: e }));
    },
    beforeUpdate(i, t, e) {
        i.tooltip && i.tooltip.initialize(e);
    },
    reset(i, t, e) {
        i.tooltip && i.tooltip.initialize(e);
    },
    afterDraw(i) {
        const t = i.tooltip;
        if (t && t._willRender()) {
            const e = { tooltip: t };
            if (i.notifyPlugins("beforeTooltipDraw", e) === !1) return;
            t.draw(i.ctx), i.notifyPlugins("afterTooltipDraw", e);
        }
    },
    afterEvent(i, t) {
        if (i.tooltip) {
            const e = t.replay;
            i.tooltip.handleEvent(t.event, e, t.inChartArea) &&
                (t.changed = !0);
        }
    },
    defaults: {
        enabled: !0,
        external: null,
        position: "average",
        backgroundColor: "rgba(0,0,0,0.8)",
        titleColor: "#fff",
        titleFont: { weight: "bold" },
        titleSpacing: 2,
        titleMarginBottom: 6,
        titleAlign: "left",
        bodyColor: "#fff",
        bodySpacing: 2,
        bodyFont: {},
        bodyAlign: "left",
        footerColor: "#fff",
        footerSpacing: 2,
        footerMarginTop: 6,
        footerFont: { weight: "bold" },
        footerAlign: "left",
        padding: 6,
        caretPadding: 2,
        caretSize: 5,
        cornerRadius: 6,
        boxHeight: (i, t) => t.bodyFont.size,
        boxWidth: (i, t) => t.bodyFont.size,
        multiKeyBackground: "#fff",
        displayColors: !0,
        boxPadding: 0,
        borderColor: "rgba(0,0,0,0)",
        borderWidth: 0,
        animation: { duration: 400, easing: "easeOutQuart" },
        animations: {
            numbers: {
                type: "number",
                properties: ["x", "y", "width", "height", "caretX", "caretY"],
            },
            opacity: { easing: "linear", duration: 200 },
        },
        callbacks: {
            beforeTitle: Ft,
            title(i) {
                if (i.length > 0) {
                    const t = i[0];
                    const e = t.chart.data.labels;
                    const s = e ? e.length : 0;
                    if (
                        this &&
                        this.options &&
                        this.options.mode === "dataset"
                    ) {
                        return t.dataset.label || "";
                    }
                    if (t.label) return t.label;
                    if (s > 0 && t.dataIndex < s) return e[t.dataIndex];
                }
                return "";
            },
            afterTitle: Ft,
            beforeBody: Ft,
            beforeLabel: Ft,
            label(i) {
                if (this && this.options && this.options.mode === "dataset") {
                    return (
                        i.label + ": " + i.formattedValue || i.formattedValue
                    );
                }
                let t = i.dataset.label || "";
                t && (t += ": ");
                const e = i.formattedValue;
                return P(e) || (t += e), t;
            },
            labelColor(i) {
                const e = i.chart
                    .getDatasetMeta(i.datasetIndex)
                    .controller.getStyle(i.dataIndex);
                return {
                    borderColor: e.borderColor,
                    backgroundColor: e.backgroundColor,
                    borderWidth: e.borderWidth,
                    borderDash: e.borderDash,
                    borderDashOffset: e.borderDashOffset,
                    borderRadius: 0,
                };
            },
            labelTextColor() {
                return this.options.bodyColor;
            },
            labelPointStyle(i) {
                const e = i.chart
                    .getDatasetMeta(i.datasetIndex)
                    .controller.getStyle(i.dataIndex);
                return { pointStyle: e.pointStyle, rotation: e.rotation };
            },
            afterLabel: Ft,
            afterBody: Ft,
            beforeFooter: Ft,
            footer: Ft,
            afterFooter: Ft,
        },
    },
    defaultRoutes: { bodyFont: "font", footerFont: "font", titleFont: "font" },
    descriptors: {
        _scriptable: (i) =>
            i !== "filter" && i !== "itemSort" && i !== "external",
        _indexable: !1,
        callbacks: { _scriptable: !1, _indexable: !1 },
        animation: { _fallback: !1 },
        animations: { _fallback: "animation" },
    },
    additionalOptionScopes: ["interaction"],
};
const Sf = Object.freeze({
    __proto__: null,
    Decimation: Vd,
    Filler: af,
    Legend: hf,
    SubTitle: ff,
    Title: df,
    Tooltip: wf,
});
const kf = (i, t, e, s) => (
    typeof t === "string"
        ? ((e = i.push(t) - 1), s.unshift({ index: e, label: t }))
        : isNaN(t) && (e = null),
    e
);
function Mf(i, t, e, s) {
    const n = i.indexOf(t);
    if (n === -1) return kf(i, t, e, s);
    const r = i.lastIndexOf(t);
    return n !== r ? e : n;
}
const Tf = (i, t) => (i === null ? null : tt(Math.round(i), 0, t));
const Ke = class extends be {
    constructor(t) {
        super(t),
            (this._startValue = void 0),
            (this._valueRange = 0),
            (this._addedLabels = []);
    }

    init(t) {
        const e = this._addedLabels;
        if (e.length) {
            const s = this.getLabels();
            for (const { index: n, label: r } of e) {
                s[n] === r && s.splice(n, 1);
            }
            this._addedLabels = [];
        }
        super.init(t);
    }

    parse(t, e) {
        if (P(t)) return null;
        const s = this.getLabels();
        return (
            (e =
                isFinite(e) && s[e] === t
                    ? e
                    : Mf(s, t, E(e, t), this._addedLabels)),
            Tf(e, s.length - 1)
        );
    }

    determineDataLimits() {
        const { minDefined: t, maxDefined: e } = this.getUserBounds();
        let { min: s, max: n } = this.getMinMax(!0);
        this.options.bounds === "ticks" &&
            (t || (s = 0), e || (n = this.getLabels().length - 1)),
            (this.min = s),
            (this.max = n);
    }

    buildTicks() {
        const t = this.min;
        const e = this.max;
        const s = this.options.offset;
        const n = [];
        let r = this.getLabels();
        (r = t === 0 && e === r.length - 1 ? r : r.slice(t, e + 1)),
            (this._valueRange = Math.max(r.length - (s ? 0 : 1), 1)),
            (this._startValue = this.min - (s ? 0.5 : 0));
        for (let o = t; o <= e; o++) n.push({ value: o });
        return n;
    }

    getLabelForValue(t) {
        const e = this.getLabels();
        return t >= 0 && t < e.length ? e[t] : t;
    }

    configure() {
        super.configure(),
            this.isHorizontal() || (this._reversePixels = !this._reversePixels);
    }

    getPixelForValue(t) {
        return (
            typeof t !== "number" && (t = this.parse(t)),
            t === null
                ? NaN
                : this.getPixelForDecimal(
                      (t - this._startValue) / this._valueRange,
                  )
        );
    }

    getPixelForTick(t) {
        const e = this.ticks;
        return t < 0 || t > e.length - 1
            ? null
            : this.getPixelForValue(e[t].value);
    }

    getValueForPixel(t) {
        return Math.round(
            this._startValue + this.getDecimalForPixel(t) * this._valueRange,
        );
    }

    getBasePixel() {
        return this.bottom;
    }
};
Ke.id = "category";
Ke.defaults = { ticks: { callback: Ke.prototype.getLabelForValue } };
function vf(i, t) {
    const e = [];
    const {
        bounds: n,
        step: r,
        min: o,
        max: a,
        precision: l,
        count: c,
        maxTicks: h,
        maxDigits: u,
        includeBounds: d,
    } = i;
    const f = r || 1;
    const m = h - 1;
    const { min: g, max: p } = t;
    const y = !P(o);
    const b = !P(a);
    const _ = !P(c);
    const w = (p - g) / (u + 1);
    let x = On((p - g) / m / f) * f;
    let S;
    let k;
    let v;
    let T;
    if (x < 1e-14 && !y && !b) return [{ value: g }, { value: p }];
    (T = Math.ceil(p / x) - Math.floor(g / x)),
        T > m && (x = On((T * x) / m / f) * f),
        P(l) || ((S = Math.pow(10, l)), (x = Math.ceil(x * S) / S)),
        n === "ticks"
            ? ((k = Math.floor(g / x) * x), (v = Math.ceil(p / x) * x))
            : ((k = g), (v = p)),
        y && b && r && Po((a - o) / r, x / 1e3)
            ? ((T = Math.round(Math.min((a - o) / x, h))),
              (x = (a - o) / T),
              (k = o),
              (v = a))
            : _
              ? ((k = y ? o : k),
                (v = b ? a : v),
                (T = c - 1),
                (x = (v - k) / T))
              : ((T = (v - k) / x),
                Pe(T, Math.round(T), x / 1e3)
                    ? (T = Math.round(T))
                    : (T = Math.ceil(T)));
    const C = Math.max(En(x), En(k));
    (S = Math.pow(10, P(l) ? C : l)),
        (k = Math.round(k * S) / S),
        (v = Math.round(v * S) / S);
    let N = 0;
    for (
        y &&
        (d && k !== o
            ? (e.push({ value: o }),
              k < o && N++,
              Pe(Math.round((k + N * x) * S) / S, o, Za(o, w, i)) && N++)
            : k < o && N++);
        N < T;
        ++N
    ) {
        e.push({ value: Math.round((k + N * x) * S) / S });
    }
    return (
        b && d && v !== a
            ? e.length && Pe(e[e.length - 1].value, a, Za(a, w, i))
                ? (e[e.length - 1].value = a)
                : e.push({ value: a })
            : (!b || v === a) && e.push({ value: v }),
        e
    );
}
function Za(i, t, { horizontal: e, minRotation: s }) {
    const n = _t(s);
    const r = (e ? Math.sin(n) : Math.cos(n)) || 0.001;
    const o = 0.75 * t * ("" + i).length;
    return Math.min(t / r, o);
}
const Je = class extends be {
    constructor(t) {
        super(t),
            (this.start = void 0),
            (this.end = void 0),
            (this._startValue = void 0),
            (this._endValue = void 0),
            (this._valueRange = 0);
    }

    parse(t, e) {
        return P(t) ||
            ((typeof t === "number" || t instanceof Number) && !isFinite(+t))
            ? null
            : +t;
    }

    handleTickRangeOptions() {
        const { beginAtZero: t } = this.options;
        const { minDefined: e, maxDefined: s } = this.getUserBounds();
        let { min: n, max: r } = this;
        const o = (l) => (n = e ? n : l);
        const a = (l) => (r = s ? r : l);
        if (t) {
            const l = Mt(n);
            const c = Mt(r);
            l < 0 && c < 0 ? a(0) : l > 0 && c > 0 && o(0);
        }
        if (n === r) {
            let l = 1;
            (r >= Number.MAX_SAFE_INTEGER || n <= Number.MIN_SAFE_INTEGER) &&
                (l = Math.abs(r * 0.05)),
                a(r + l),
                t || o(n - l);
        }
        (this.min = n), (this.max = r);
    }

    getTickLimit() {
        const t = this.options.ticks;
        let { maxTicksLimit: e, stepSize: s } = t;
        let n;
        return (
            s
                ? ((n = Math.ceil(this.max / s) - Math.floor(this.min / s) + 1),
                  n > 1e3 &&
                      (console.warn(
                          `scales.${this.id}.ticks.stepSize: ${s} would result generating up to ${n} ticks. Limiting to 1000.`,
                      ),
                      (n = 1e3)))
                : ((n = this.computeTickLimit()), (e = e || 11)),
            e && (n = Math.min(e, n)),
            n
        );
    }

    computeTickLimit() {
        return Number.POSITIVE_INFINITY;
    }

    buildTicks() {
        const t = this.options;
        const e = t.ticks;
        let s = this.getTickLimit();
        s = Math.max(2, s);
        const n = {
            maxTicks: s,
            bounds: t.bounds,
            min: t.min,
            max: t.max,
            precision: e.precision,
            step: e.stepSize,
            count: e.count,
            maxDigits: this._maxDigits(),
            horizontal: this.isHorizontal(),
            minRotation: e.minRotation || 0,
            includeBounds: e.includeBounds !== !1,
        };
        const r = this._range || this;
        const o = vf(n, r);
        return (
            t.bounds === "ticks" && Dn(o, this, "value"),
            t.reverse
                ? (o.reverse(), (this.start = this.max), (this.end = this.min))
                : ((this.start = this.min), (this.end = this.max)),
            o
        );
    }

    configure() {
        const t = this.ticks;
        let e = this.min;
        let s = this.max;
        if ((super.configure(), this.options.offset && t.length)) {
            const n = (s - e) / Math.max(t.length - 1, 1) / 2;
            (e -= n), (s += n);
        }
        (this._startValue = e),
            (this._endValue = s),
            (this._valueRange = s - e);
    }

    getLabelForValue(t) {
        return ze(t, this.chart.options.locale, this.options.ticks.format);
    }
};
const Pi = class extends Je {
    determineDataLimits() {
        const { min: t, max: e } = this.getMinMax(!0);
        (this.min = q(t) ? t : 0),
            (this.max = q(e) ? e : 1),
            this.handleTickRangeOptions();
    }

    computeTickLimit() {
        const t = this.isHorizontal();
        const e = t ? this.width : this.height;
        const s = _t(this.options.ticks.minRotation);
        const n = (t ? Math.sin(s) : Math.cos(s)) || 0.001;
        const r = this._resolveTickFontOptions(0);
        return Math.ceil(e / Math.min(40, r.lineHeight / n));
    }

    getPixelForValue(t) {
        return t === null
            ? NaN
            : this.getPixelForDecimal(
                  (t - this._startValue) / this._valueRange,
              );
    }

    getValueForPixel(t) {
        return this._startValue + this.getDecimalForPixel(t) * this._valueRange;
    }
};
Pi.id = "linear";
Pi.defaults = { ticks: { callback: Gs.formatters.numeric } };
function qa(i) {
    return i / Math.pow(10, Math.floor(mt(i))) === 1;
}
function Of(i, t) {
    const e = Math.floor(mt(t.max));
    const s = Math.ceil(t.max / Math.pow(10, e));
    const n = [];
    let r = ft(i.min, Math.pow(10, Math.floor(mt(t.min))));
    let o = Math.floor(mt(r));
    let a = Math.floor(r / Math.pow(10, o));
    let l = o < 0 ? Math.pow(10, Math.abs(o)) : 1;
    do {
        n.push({ value: r, major: qa(r) }),
            ++a,
            a === 10 && ((a = 1), ++o, (l = o >= 0 ? 1 : l)),
            (r = Math.round(a * Math.pow(10, o) * l) / l);
    } while (o < e || (o === e && a < s));
    const c = ft(i.max, r);
    return n.push({ value: c, major: qa(r) }), n;
}
const Ni = class extends be {
    constructor(t) {
        super(t),
            (this.start = void 0),
            (this.end = void 0),
            (this._startValue = void 0),
            (this._valueRange = 0);
    }

    parse(t, e) {
        const s = Je.prototype.parse.apply(this, [t, e]);
        if (s === 0) {
            this._zero = !0;
            return;
        }
        return q(s) && s > 0 ? s : null;
    }

    determineDataLimits() {
        const { min: t, max: e } = this.getMinMax(!0);
        (this.min = q(t) ? Math.max(0, t) : null),
            (this.max = q(e) ? Math.max(0, e) : null),
            this.options.beginAtZero && (this._zero = !0),
            this.handleTickRangeOptions();
    }

    handleTickRangeOptions() {
        const { minDefined: t, maxDefined: e } = this.getUserBounds();
        let s = this.min;
        let n = this.max;
        const r = (l) => (s = t ? s : l);
        const o = (l) => (n = e ? n : l);
        const a = (l, c) => Math.pow(10, Math.floor(mt(l)) + c);
        s === n && (s <= 0 ? (r(1), o(10)) : (r(a(s, -1)), o(a(n, 1)))),
            s <= 0 && r(a(n, -1)),
            n <= 0 && o(a(s, 1)),
            this._zero &&
                this.min !== this._suggestedMin &&
                s === a(this.min, 0) &&
                r(a(s, -1)),
            (this.min = s),
            (this.max = n);
    }

    buildTicks() {
        const t = this.options;
        const e = { min: this._userMin, max: this._userMax };
        const s = Of(e, this);
        return (
            t.bounds === "ticks" && Dn(s, this, "value"),
            t.reverse
                ? (s.reverse(), (this.start = this.max), (this.end = this.min))
                : ((this.start = this.min), (this.end = this.max)),
            s
        );
    }

    getLabelForValue(t) {
        return t === void 0
            ? "0"
            : ze(t, this.chart.options.locale, this.options.ticks.format);
    }

    configure() {
        const t = this.min;
        super.configure(),
            (this._startValue = mt(t)),
            (this._valueRange = mt(this.max) - mt(t));
    }

    getPixelForValue(t) {
        return (
            (t === void 0 || t === 0) && (t = this.min),
            t === null || isNaN(t)
                ? NaN
                : this.getPixelForDecimal(
                      t === this.min
                          ? 0
                          : (mt(t) - this._startValue) / this._valueRange,
                  )
        );
    }

    getValueForPixel(t) {
        const e = this.getDecimalForPixel(t);
        return Math.pow(10, this._startValue + e * this._valueRange);
    }
};
Ni.id = "logarithmic";
Ni.defaults = {
    ticks: { callback: Gs.formatters.logarithmic, major: { enabled: !0 } },
};
function Sr(i) {
    const t = i.ticks;
    if (t.display && i.display) {
        const e = rt(t.backdropPadding);
        return E(t.font && t.font.size, A.font.size) + e.height;
    }
    return 0;
}
function Df(i, t, e) {
    return (
        (e = B(e) ? e : [e]),
        { w: qo(i, t.string, e), h: e.length * t.lineHeight }
    );
}
function Ga(i, t, e, s, n) {
    return i === s || i === n
        ? { start: t - e / 2, end: t + e / 2 }
        : i < s || i > n
          ? { start: t - e, end: t }
          : { start: t, end: t + e };
}
function Ef(i) {
    const t = {
        l: i.left + i._padding.left,
        r: i.right - i._padding.right,
        t: i.top + i._padding.top,
        b: i.bottom - i._padding.bottom,
    };
    const e = Object.assign({}, t);
    const s = [];
    const n = [];
    const r = i._pointLabels.length;
    const o = i.options.pointLabels;
    const a = o.centerPointLabels ? j / r : 0;
    for (let l = 0; l < r; l++) {
        const c = o.setContext(i.getPointLabelContext(l));
        n[l] = c.padding;
        const h = i.getPointPosition(l, i.drawingArea + n[l], a);
        const u = Q(c.font);
        const d = Df(i.ctx, u, i._pointLabels[l]);
        s[l] = d;
        const f = ct(i.getIndexAngle(l) + a);
        const m = Math.round(Os(f));
        const g = Ga(m, h.x, d.w, 0, 180);
        const p = Ga(m, h.y, d.h, 90, 270);
        If(e, t, f, g, p);
    }
    i.setCenterPoint(t.l - e.l, e.r - t.r, t.t - e.t, e.b - t.b),
        (i._pointLabelItems = Cf(i, s, n));
}
function If(i, t, e, s, n) {
    const r = Math.abs(Math.sin(e));
    const o = Math.abs(Math.cos(e));
    let a = 0;
    let l = 0;
    s.start < t.l
        ? ((a = (t.l - s.start) / r), (i.l = Math.min(i.l, t.l - a)))
        : s.end > t.r &&
          ((a = (s.end - t.r) / r), (i.r = Math.max(i.r, t.r + a))),
        n.start < t.t
            ? ((l = (t.t - n.start) / o), (i.t = Math.min(i.t, t.t - l)))
            : n.end > t.b &&
              ((l = (n.end - t.b) / o), (i.b = Math.max(i.b, t.b + l)));
}
function Cf(i, t, e) {
    const s = [];
    const n = i._pointLabels.length;
    const r = i.options;
    const o = Sr(r) / 2;
    const a = i.drawingArea;
    const l = r.pointLabels.centerPointLabels ? j / n : 0;
    for (let c = 0; c < n; c++) {
        const h = i.getPointPosition(c, a + o + e[c], l);
        const u = Math.round(Os(ct(h.angle + U)));
        const d = t[c];
        const f = Lf(h.y, d.h, u);
        const m = Ff(u);
        const g = Af(h.x, d.w, m);
        s.push({
            x: h.x,
            y: f,
            textAlign: m,
            left: g,
            top: f,
            right: g + d.w,
            bottom: f + d.h,
        });
    }
    return s;
}
function Ff(i) {
    return i === 0 || i === 180 ? "center" : i < 180 ? "left" : "right";
}
function Af(i, t, e) {
    return e === "right" ? (i -= t) : e === "center" && (i -= t / 2), i;
}
function Lf(i, t, e) {
    return (
        e === 90 || e === 270 ? (i -= t / 2) : (e > 270 || e < 90) && (i -= t),
        i
    );
}
function Pf(i, t) {
    const {
        ctx: e,
        options: { pointLabels: s },
    } = i;
    for (let n = t - 1; n >= 0; n--) {
        const r = s.setContext(i.getPointLabelContext(n));
        const o = Q(r.font);
        const {
            x: a,
            y: l,
            textAlign: c,
            left: h,
            top: u,
            right: d,
            bottom: f,
        } = i._pointLabelItems[n];
        const { backdropColor: m } = r;
        if (!P(m)) {
            const g = te(r.borderRadius);
            const p = rt(r.backdropPadding);
            e.fillStyle = m;
            const y = h - p.left;
            const b = u - p.top;
            const _ = d - h + p.width;
            const w = f - u + p.height;
            Object.values(g).some((x) => x !== 0)
                ? (e.beginPath(),
                  Re(e, { x: y, y: b, w: _, h: w, radius: g }),
                  e.fill())
                : e.fillRect(y, b, _, w);
        }
        Qt(e, i._pointLabels[n], a, l + o.lineHeight / 2, o, {
            color: r.color,
            textAlign: c,
            textBaseline: "middle",
        });
    }
}
function bl(i, t, e, s) {
    const { ctx: n } = i;
    if (e) n.arc(i.xCenter, i.yCenter, t, 0, H);
    else {
        let r = i.getPointPosition(0, t);
        n.moveTo(r.x, r.y);
        for (let o = 1; o < s; o++) {
            (r = i.getPointPosition(o, t)), n.lineTo(r.x, r.y);
        }
    }
}
function Nf(i, t, e, s) {
    const n = i.ctx;
    const r = t.circular;
    const { color: o, lineWidth: a } = t;
    (!r && !s) ||
        !o ||
        !a ||
        e < 0 ||
        (n.save(),
        (n.strokeStyle = o),
        (n.lineWidth = a),
        n.setLineDash(t.borderDash),
        (n.lineDashOffset = t.borderDashOffset),
        n.beginPath(),
        bl(i, e, r, s),
        n.closePath(),
        n.stroke(),
        n.restore());
}
function Rf(i, t, e) {
    return Ht(i, { label: e, index: t, type: "pointLabel" });
}
const _e = class extends Je {
    constructor(t) {
        super(t),
            (this.xCenter = void 0),
            (this.yCenter = void 0),
            (this.drawingArea = void 0),
            (this._pointLabels = []),
            (this._pointLabelItems = []);
    }

    setDimensions() {
        const t = (this._padding = rt(Sr(this.options) / 2));
        const e = (this.width = this.maxWidth - t.width);
        const s = (this.height = this.maxHeight - t.height);
        (this.xCenter = Math.floor(this.left + e / 2 + t.left)),
            (this.yCenter = Math.floor(this.top + s / 2 + t.top)),
            (this.drawingArea = Math.floor(Math.min(e, s) / 2));
    }

    determineDataLimits() {
        const { min: t, max: e } = this.getMinMax(!1);
        (this.min = q(t) && !isNaN(t) ? t : 0),
            (this.max = q(e) && !isNaN(e) ? e : 0),
            this.handleTickRangeOptions();
    }

    computeTickLimit() {
        return Math.ceil(this.drawingArea / Sr(this.options));
    }

    generateTickLabels(t) {
        Je.prototype.generateTickLabels.call(this, t),
            (this._pointLabels = this.getLabels()
                .map((e, s) => {
                    const n = $(
                        this.options.pointLabels.callback,
                        [e, s],
                        this,
                    );
                    return n || n === 0 ? n : "";
                })
                .filter((e, s) => this.chart.getDataVisibility(s)));
    }

    fit() {
        const t = this.options;
        t.display && t.pointLabels.display
            ? Ef(this)
            : this.setCenterPoint(0, 0, 0, 0);
    }

    setCenterPoint(t, e, s, n) {
        (this.xCenter += Math.floor((t - e) / 2)),
            (this.yCenter += Math.floor((s - n) / 2)),
            (this.drawingArea -= Math.min(
                this.drawingArea / 2,
                Math.max(t, e, s, n),
            ));
    }

    getIndexAngle(t) {
        const e = H / (this._pointLabels.length || 1);
        const s = this.options.startAngle || 0;
        return ct(t * e + _t(s));
    }

    getDistanceFromCenterForValue(t) {
        if (P(t)) return NaN;
        const e = this.drawingArea / (this.max - this.min);
        return this.options.reverse ? (this.max - t) * e : (t - this.min) * e;
    }

    getValueForDistanceFromCenter(t) {
        if (P(t)) return NaN;
        const e = t / (this.drawingArea / (this.max - this.min));
        return this.options.reverse ? this.max - e : this.min + e;
    }

    getPointLabelContext(t) {
        const e = this._pointLabels || [];
        if (t >= 0 && t < e.length) {
            const s = e[t];
            return Rf(this.getContext(), t, s);
        }
    }

    getPointPosition(t, e, s = 0) {
        const n = this.getIndexAngle(t) - U + s;
        return {
            x: Math.cos(n) * e + this.xCenter,
            y: Math.sin(n) * e + this.yCenter,
            angle: n,
        };
    }

    getPointPositionForValue(t, e) {
        return this.getPointPosition(t, this.getDistanceFromCenterForValue(e));
    }

    getBasePosition(t) {
        return this.getPointPositionForValue(t || 0, this.getBaseValue());
    }

    getPointLabelPosition(t) {
        const {
            left: e,
            top: s,
            right: n,
            bottom: r,
        } = this._pointLabelItems[t];
        return { left: e, top: s, right: n, bottom: r };
    }

    drawBackground() {
        const {
            backgroundColor: t,
            grid: { circular: e },
        } = this.options;
        if (t) {
            const s = this.ctx;
            s.save(),
                s.beginPath(),
                bl(
                    this,
                    this.getDistanceFromCenterForValue(this._endValue),
                    e,
                    this._pointLabels.length,
                ),
                s.closePath(),
                (s.fillStyle = t),
                s.fill(),
                s.restore();
        }
    }

    drawGrid() {
        const t = this.ctx;
        const e = this.options;
        const { angleLines: s, grid: n } = e;
        const r = this._pointLabels.length;
        let o;
        let a;
        let l;
        if (
            (e.pointLabels.display && Pf(this, r),
            n.display &&
                this.ticks.forEach((c, h) => {
                    if (h !== 0) {
                        a = this.getDistanceFromCenterForValue(c.value);
                        const u = n.setContext(this.getContext(h - 1));
                        Nf(this, u, a, r);
                    }
                }),
            s.display)
        ) {
            for (t.save(), o = r - 1; o >= 0; o--) {
                const c = s.setContext(this.getPointLabelContext(o));
                const { color: h, lineWidth: u } = c;
                !u ||
                    !h ||
                    ((t.lineWidth = u),
                    (t.strokeStyle = h),
                    t.setLineDash(c.borderDash),
                    (t.lineDashOffset = c.borderDashOffset),
                    (a = this.getDistanceFromCenterForValue(
                        e.ticks.reverse ? this.min : this.max,
                    )),
                    (l = this.getPointPosition(o, a)),
                    t.beginPath(),
                    t.moveTo(this.xCenter, this.yCenter),
                    t.lineTo(l.x, l.y),
                    t.stroke());
            }
            t.restore();
        }
    }

    drawBorder() {}
    drawLabels() {
        const t = this.ctx;
        const e = this.options;
        const s = e.ticks;
        if (!s.display) return;
        const n = this.getIndexAngle(0);
        let r;
        let o;
        t.save(),
            t.translate(this.xCenter, this.yCenter),
            t.rotate(n),
            (t.textAlign = "center"),
            (t.textBaseline = "middle"),
            this.ticks.forEach((a, l) => {
                if (l === 0 && !e.reverse) return;
                const c = s.setContext(this.getContext(l));
                const h = Q(c.font);
                if (
                    ((r = this.getDistanceFromCenterForValue(
                        this.ticks[l].value,
                    )),
                    c.showLabelBackdrop)
                ) {
                    (t.font = h.string),
                        (o = t.measureText(a.label).width),
                        (t.fillStyle = c.backdropColor);
                    const u = rt(c.backdropPadding);
                    t.fillRect(
                        -o / 2 - u.left,
                        -r - h.size / 2 - u.top,
                        o + u.width,
                        h.size + u.height,
                    );
                }
                Qt(t, a.label, 0, -r, h, { color: c.color });
            }),
            t.restore();
    }

    drawTitle() {}
};
_e.id = "radialLinear";
_e.defaults = {
    display: !0,
    animate: !0,
    position: "chartArea",
    angleLines: {
        display: !0,
        lineWidth: 1,
        borderDash: [],
        borderDashOffset: 0,
    },
    grid: { circular: !1 },
    startAngle: 0,
    ticks: { showLabelBackdrop: !0, callback: Gs.formatters.numeric },
    pointLabels: {
        backdropColor: void 0,
        backdropPadding: 2,
        display: !0,
        font: { size: 10 },
        callback(i) {
            return i;
        },
        padding: 5,
        centerPointLabels: !1,
    },
};
_e.defaultRoutes = {
    "angleLines.color": "borderColor",
    "pointLabels.color": "color",
    "ticks.color": "color",
};
_e.descriptors = { angleLines: { _fallback: "grid" } };
const Xs = {
    millisecond: { common: !0, size: 1, steps: 1e3 },
    second: { common: !0, size: 1e3, steps: 60 },
    minute: { common: !0, size: 6e4, steps: 60 },
    hour: { common: !0, size: 36e5, steps: 24 },
    day: { common: !0, size: 864e5, steps: 30 },
    week: { common: !1, size: 6048e5, steps: 4 },
    month: { common: !0, size: 2628e6, steps: 12 },
    quarter: { common: !1, size: 7884e6, steps: 4 },
    year: { common: !0, size: 3154e7 },
};
const ht = Object.keys(Xs);
function Wf(i, t) {
    return i - t;
}
function Xa(i, t) {
    if (P(t)) return null;
    const e = i._adapter;
    const { parser: s, round: n, isoWeekday: r } = i._parseOpts;
    let o = t;
    return (
        typeof s === "function" && (o = s(o)),
        q(o) || (o = typeof s === "string" ? e.parse(o, s) : e.parse(o)),
        o === null
            ? null
            : (n &&
                  (o =
                      n === "week" && (ge(r) || r === !0)
                          ? e.startOf(o, "isoWeek", r)
                          : e.startOf(o, n)),
              +o)
    );
}
function Ka(i, t, e, s) {
    const n = ht.length;
    for (let r = ht.indexOf(i); r < n - 1; ++r) {
        const o = Xs[ht[r]];
        const a = o.steps ? o.steps : Number.MAX_SAFE_INTEGER;
        if (o.common && Math.ceil((e - t) / (a * o.size)) <= s) return ht[r];
    }
    return ht[n - 1];
}
function zf(i, t, e, s, n) {
    for (let r = ht.length - 1; r >= ht.indexOf(e); r--) {
        const o = ht[r];
        if (Xs[o].common && i._adapter.diff(n, s, o) >= t - 1) return o;
    }
    return ht[e ? ht.indexOf(e) : 0];
}
function Vf(i) {
    for (let t = ht.indexOf(i) + 1, e = ht.length; t < e; ++t) {
        if (Xs[ht[t]].common) return ht[t];
    }
}
function Ja(i, t, e) {
    if (!e) i[t] = !0;
    else if (e.length) {
        const { lo: s, hi: n } = Ds(e, t);
        const r = e[s] >= t ? e[s] : e[n];
        i[r] = !0;
    }
}
function Hf(i, t, e, s) {
    const n = i._adapter;
    const r = +n.startOf(t[0].value, s);
    const o = t[t.length - 1].value;
    let a;
    let l;
    for (a = r; a <= o; a = +n.add(a, 1, s)) {
        (l = e[a]), l >= 0 && (t[l].major = !0);
    }
    return t;
}
function Qa(i, t, e) {
    const s = [];
    const n = {};
    const r = t.length;
    let o;
    let a;
    for (o = 0; o < r; ++o) {
        (a = t[o]), (n[a] = o), s.push({ value: a, major: !1 });
    }
    return r === 0 || !e ? s : Hf(i, s, n, e);
}
const we = class extends be {
    constructor(t) {
        super(t),
            (this._cache = { data: [], labels: [], all: [] }),
            (this._unit = "day"),
            (this._majorUnit = void 0),
            (this._offsets = {}),
            (this._normalized = !1),
            (this._parseOpts = void 0);
    }

    init(t, e) {
        const s = t.time || (t.time = {});
        const n = (this._adapter = new kr._date(t.adapters.date));
        n.init(e),
            Le(s.displayFormats, n.formats()),
            (this._parseOpts = {
                parser: s.parser,
                round: s.round,
                isoWeekday: s.isoWeekday,
            }),
            super.init(t),
            (this._normalized = e.normalized);
    }

    parse(t, e) {
        return t === void 0 ? null : Xa(this, t);
    }

    beforeLayout() {
        super.beforeLayout(), (this._cache = { data: [], labels: [], all: [] });
    }

    determineDataLimits() {
        const t = this.options;
        const e = this._adapter;
        const s = t.time.unit || "day";
        let {
            min: n,
            max: r,
            minDefined: o,
            maxDefined: a,
        } = this.getUserBounds();
        function l(c) {
            !o && !isNaN(c.min) && (n = Math.min(n, c.min)),
                !a && !isNaN(c.max) && (r = Math.max(r, c.max));
        }
        (!o || !a) &&
            (l(this._getLabelBounds()),
            (t.bounds !== "ticks" || t.ticks.source !== "labels") &&
                l(this.getMinMax(!1))),
            (n = q(n) && !isNaN(n) ? n : +e.startOf(Date.now(), s)),
            (r = q(r) && !isNaN(r) ? r : +e.endOf(Date.now(), s) + 1),
            (this.min = Math.min(n, r - 1)),
            (this.max = Math.max(n + 1, r));
    }

    _getLabelBounds() {
        const t = this.getLabelTimestamps();
        let e = Number.POSITIVE_INFINITY;
        let s = Number.NEGATIVE_INFINITY;
        return (
            t.length && ((e = t[0]), (s = t[t.length - 1])), { min: e, max: s }
        );
    }

    buildTicks() {
        const t = this.options;
        const e = t.time;
        const s = t.ticks;
        const n =
            s.source === "labels"
                ? this.getLabelTimestamps()
                : this._generate();
        t.bounds === "ticks" &&
            n.length &&
            ((this.min = this._userMin || n[0]),
            (this.max = this._userMax || n[n.length - 1]));
        const r = this.min;
        const o = this.max;
        const a = Wo(n, r, o);
        return (
            (this._unit =
                e.unit ||
                (s.autoSkip
                    ? Ka(
                          e.minUnit,
                          this.min,
                          this.max,
                          this._getLabelCapacity(r),
                      )
                    : zf(this, a.length, e.minUnit, this.min, this.max))),
            (this._majorUnit =
                !s.major.enabled || this._unit === "year"
                    ? void 0
                    : Vf(this._unit)),
            this.initOffsets(n),
            t.reverse && a.reverse(),
            Qa(this, a, this._majorUnit)
        );
    }

    afterAutoSkip() {
        this.options.offsetAfterAutoskip &&
            this.initOffsets(this.ticks.map((t) => +t.value));
    }

    initOffsets(t) {
        let e = 0;
        let s = 0;
        let n;
        let r;
        this.options.offset &&
            t.length &&
            ((n = this.getDecimalForValue(t[0])),
            t.length === 1
                ? (e = 1 - n)
                : (e = (this.getDecimalForValue(t[1]) - n) / 2),
            (r = this.getDecimalForValue(t[t.length - 1])),
            t.length === 1
                ? (s = r)
                : (s = (r - this.getDecimalForValue(t[t.length - 2])) / 2));
        const o = t.length < 3 ? 0.5 : 0.25;
        (e = tt(e, 0, o)),
            (s = tt(s, 0, o)),
            (this._offsets = { start: e, end: s, factor: 1 / (e + 1 + s) });
    }

    _generate() {
        const t = this._adapter;
        const e = this.min;
        const s = this.max;
        const n = this.options;
        const r = n.time;
        const o = r.unit || Ka(r.minUnit, e, s, this._getLabelCapacity(e));
        const a = E(r.stepSize, 1);
        const l = o === "week" ? r.isoWeekday : !1;
        const c = ge(l) || l === !0;
        const h = {};
        let u = e;
        let d;
        let f;
        if (
            (c && (u = +t.startOf(u, "isoWeek", l)),
            (u = +t.startOf(u, c ? "day" : o)),
            t.diff(s, e, o) > 1e5 * a)
        ) {
            throw new Error(
                e +
                    " and " +
                    s +
                    " are too far apart with stepSize of " +
                    a +
                    " " +
                    o,
            );
        }
        const m = n.ticks.source === "data" && this.getDataTimestamps();
        for (d = u, f = 0; d < s; d = +t.add(d, a, o), f++) Ja(h, d, m);
        return (
            (d === s || n.bounds === "ticks" || f === 1) && Ja(h, d, m),
            Object.keys(h)
                .sort((g, p) => g - p)
                .map((g) => +g)
        );
    }

    getLabelForValue(t) {
        const e = this._adapter;
        const s = this.options.time;
        return s.tooltipFormat
            ? e.format(t, s.tooltipFormat)
            : e.format(t, s.displayFormats.datetime);
    }

    _tickFormatFunction(t, e, s, n) {
        const r = this.options;
        const o = r.time.displayFormats;
        const a = this._unit;
        const l = this._majorUnit;
        const c = a && o[a];
        const h = l && o[l];
        const u = s[e];
        const d = l && h && u && u.major;
        const f = this._adapter.format(t, n || (d ? h : c));
        const m = r.ticks.callback;
        return m ? $(m, [f, e, s], this) : f;
    }

    generateTickLabels(t) {
        let e, s, n;
        for (e = 0, s = t.length; e < s; ++e) {
            (n = t[e]), (n.label = this._tickFormatFunction(n.value, e, t));
        }
    }

    getDecimalForValue(t) {
        return t === null ? NaN : (t - this.min) / (this.max - this.min);
    }

    getPixelForValue(t) {
        const e = this._offsets;
        const s = this.getDecimalForValue(t);
        return this.getPixelForDecimal((e.start + s) * e.factor);
    }

    getValueForPixel(t) {
        const e = this._offsets;
        const s = this.getDecimalForPixel(t) / e.factor - e.end;
        return this.min + s * (this.max - this.min);
    }

    _getLabelSize(t) {
        const e = this.options.ticks;
        const s = this.ctx.measureText(t).width;
        const n = _t(this.isHorizontal() ? e.maxRotation : e.minRotation);
        const r = Math.cos(n);
        const o = Math.sin(n);
        const a = this._resolveTickFontOptions(0).size;
        return { w: s * r + a * o, h: s * o + a * r };
    }

    _getLabelCapacity(t) {
        const e = this.options.time;
        const s = e.displayFormats;
        const n = s[e.unit] || s.millisecond;
        const r = this._tickFormatFunction(
            t,
            0,
            Qa(this, [t], this._majorUnit),
            n,
        );
        const o = this._getLabelSize(r);
        const a =
            Math.floor(
                this.isHorizontal() ? this.width / o.w : this.height / o.h,
            ) - 1;
        return a > 0 ? a : 1;
    }

    getDataTimestamps() {
        let t = this._cache.data || [];
        let e;
        let s;
        if (t.length) return t;
        const n = this.getMatchingVisibleMetas();
        if (this._normalized && n.length) {
            return (this._cache.data =
                n[0].controller.getAllParsedValues(this));
        }
        for (e = 0, s = n.length; e < s; ++e) {
            t = t.concat(n[e].controller.getAllParsedValues(this));
        }
        return (this._cache.data = this.normalize(t));
    }

    getLabelTimestamps() {
        const t = this._cache.labels || [];
        let e;
        let s;
        if (t.length) return t;
        const n = this.getLabels();
        for (e = 0, s = n.length; e < s; ++e) t.push(Xa(this, n[e]));
        return (this._cache.labels = this._normalized ? t : this.normalize(t));
    }

    normalize(t) {
        return Fn(t.sort(Wf));
    }
};
we.id = "time";
we.defaults = {
    bounds: "data",
    adapters: {},
    time: {
        parser: !1,
        unit: !1,
        round: !1,
        isoWeekday: !1,
        minUnit: "millisecond",
        displayFormats: {},
    },
    ticks: { source: "auto", major: { enabled: !1 } },
};
function Hs(i, t, e) {
    let s = 0;
    let n = i.length - 1;
    let r;
    let o;
    let a;
    let l;
    e
        ? (t >= i[s].pos &&
              t <= i[n].pos &&
              ({ lo: s, hi: n } = Ct(i, "pos", t)),
          ({ pos: r, time: a } = i[s]),
          ({ pos: o, time: l } = i[n]))
        : (t >= i[s].time &&
              t <= i[n].time &&
              ({ lo: s, hi: n } = Ct(i, "time", t)),
          ({ time: r, pos: a } = i[s]),
          ({ time: o, pos: l } = i[n]));
    const c = o - r;
    return c ? a + ((l - a) * (t - r)) / c : a;
}
const Ri = class extends we {
    constructor(t) {
        super(t),
            (this._table = []),
            (this._minPos = void 0),
            (this._tableRange = void 0);
    }

    initOffsets() {
        const t = this._getTimestampsForTable();
        const e = (this._table = this.buildLookupTable(t));
        (this._minPos = Hs(e, this.min)),
            (this._tableRange = Hs(e, this.max) - this._minPos),
            super.initOffsets(t);
    }

    buildLookupTable(t) {
        const { min: e, max: s } = this;
        const n = [];
        const r = [];
        let o;
        let a;
        let l;
        let c;
        let h;
        for (o = 0, a = t.length; o < a; ++o) {
            (c = t[o]), c >= e && c <= s && n.push(c);
        }
        if (n.length < 2) {
            return [
                { time: e, pos: 0 },
                { time: s, pos: 1 },
            ];
        }
        for (o = 0, a = n.length; o < a; ++o) {
            (h = n[o + 1]),
                (l = n[o - 1]),
                (c = n[o]),
                Math.round((h + l) / 2) !== c &&
                    r.push({ time: c, pos: o / (a - 1) });
        }
        return r;
    }

    _getTimestampsForTable() {
        let t = this._cache.all || [];
        if (t.length) return t;
        const e = this.getDataTimestamps();
        const s = this.getLabelTimestamps();
        return (
            e.length && s.length
                ? (t = this.normalize(e.concat(s)))
                : (t = e.length ? e : s),
            (t = this._cache.all = t),
            t
        );
    }

    getDecimalForValue(t) {
        return (Hs(this._table, t) - this._minPos) / this._tableRange;
    }

    getValueForPixel(t) {
        const e = this._offsets;
        const s = this.getDecimalForPixel(t) / e.factor - e.end;
        return Hs(this._table, s * this._tableRange + this._minPos, !0);
    }
};
Ri.id = "timeseries";
Ri.defaults = we.defaults;
const Bf = Object.freeze({
    __proto__: null,
    CategoryScale: Ke,
    LinearScale: Pi,
    LogarithmicScale: Ni,
    RadialLinearScale: _e,
    TimeScale: we,
    TimeSeriesScale: Ri,
});
const xl = [Iu, Nd, Sf, Bf];
xe.register(...xl);
const Rt = xe;
const jt = class extends Error {};
const Ks = class extends jt {
    constructor(t) {
        super(`Invalid DateTime: ${t.toMessage()}`);
    }
};
const Js = class extends jt {
    constructor(t) {
        super(`Invalid Interval: ${t.toMessage()}`);
    }
};
const Qs = class extends jt {
    constructor(t) {
        super(`Invalid Duration: ${t.toMessage()}`);
    }
};
const Tt = class extends jt {};
const Qe = class extends jt {
    constructor(t) {
        super(`Invalid unit ${t}`);
    }
};
const G = class extends jt {};
const vt = class extends jt {
    constructor() {
        super("Zone is an abstract class");
    }
};
const M = "numeric";
const Ot = "short";
const yt = "long";
const re = { year: M, month: M, day: M };
const zi = { year: M, month: Ot, day: M };
const Tr = { year: M, month: Ot, day: M, weekday: Ot };
const Vi = { year: M, month: yt, day: M };
const Hi = { year: M, month: yt, day: M, weekday: yt };
const Bi = { hour: M, minute: M };
const $i = { hour: M, minute: M, second: M };
const ji = { hour: M, minute: M, second: M, timeZoneName: Ot };
const Ui = { hour: M, minute: M, second: M, timeZoneName: yt };
const Yi = { hour: M, minute: M, hourCycle: "h23" };
const Zi = { hour: M, minute: M, second: M, hourCycle: "h23" };
const qi = {
    hour: M,
    minute: M,
    second: M,
    hourCycle: "h23",
    timeZoneName: Ot,
};
const Gi = {
    hour: M,
    minute: M,
    second: M,
    hourCycle: "h23",
    timeZoneName: yt,
};
const Xi = { year: M, month: M, day: M, hour: M, minute: M };
const Ki = { year: M, month: M, day: M, hour: M, minute: M, second: M };
const Ji = { year: M, month: Ot, day: M, hour: M, minute: M };
const Qi = { year: M, month: Ot, day: M, hour: M, minute: M, second: M };
const vr = { year: M, month: Ot, day: M, weekday: Ot, hour: M, minute: M };
const ts = { year: M, month: yt, day: M, hour: M, minute: M, timeZoneName: Ot };
const es = {
    year: M,
    month: yt,
    day: M,
    hour: M,
    minute: M,
    second: M,
    timeZoneName: Ot,
};
const is = {
    year: M,
    month: yt,
    day: M,
    weekday: yt,
    hour: M,
    minute: M,
    timeZoneName: yt,
};
const ss = {
    year: M,
    month: yt,
    day: M,
    weekday: yt,
    hour: M,
    minute: M,
    second: M,
    timeZoneName: yt,
};
const ut = class {
    get type() {
        throw new vt();
    }

    get name() {
        throw new vt();
    }

    get ianaName() {
        return this.name;
    }

    get isUniversal() {
        throw new vt();
    }

    offsetName(t, e) {
        throw new vt();
    }

    formatOffset(t, e) {
        throw new vt();
    }

    offset(t) {
        throw new vt();
    }

    equals(t) {
        throw new vt();
    }

    get isValid() {
        throw new vt();
    }
};
let Or = null;
const oe = class i extends ut {
    static get instance() {
        return Or === null && (Or = new i()), Or;
    }

    get type() {
        return "system";
    }

    get name() {
        return new Intl.DateTimeFormat().resolvedOptions().timeZone;
    }

    get isUniversal() {
        return !1;
    }

    offsetName(t, { format: e, locale: s }) {
        return en(t, e, s);
    }

    formatOffset(t, e) {
        return ae(this.offset(t), e);
    }

    offset(t) {
        return -new Date(t).getTimezoneOffset();
    }

    equals(t) {
        return t.type === "system";
    }

    get isValid() {
        return !0;
    }
};
const Er = new Map();
function $f(i) {
    let t = Er.get(i);
    return (
        t === void 0 &&
            ((t = new Intl.DateTimeFormat("en-US", {
                hour12: !1,
                timeZone: i,
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                era: "short",
            })),
            Er.set(i, t)),
        t
    );
}
const jf = { year: 0, month: 1, day: 2, era: 3, hour: 4, minute: 5, second: 6 };
function Uf(i, t) {
    const e = i.format(t).replace(/\u200E/g, "");
    const s = /(\d+)\/(\d+)\/(\d+) (AD|BC),? (\d+):(\d+):(\d+)/.exec(e);
    const [, n, r, o, a, l, c, h] = s;
    return [o, n, r, a, l, c, h];
}
function Yf(i, t) {
    const e = i.formatToParts(t);
    const s = [];
    for (let n = 0; n < e.length; n++) {
        const { type: r, value: o } = e[n];
        const a = jf[r];
        r === "era" ? (s[a] = o) : O(a) || (s[a] = parseInt(o, 10));
    }
    return s;
}
const Dr = new Map();
const at = class i extends ut {
    static create(t) {
        let e = Dr.get(t);
        return e === void 0 && Dr.set(t, (e = new i(t))), e;
    }

    static resetCache() {
        Dr.clear(), Er.clear();
    }

    static isValidSpecifier(t) {
        return this.isValidZone(t);
    }

    static isValidZone(t) {
        if (!t) return !1;
        try {
            return (
                new Intl.DateTimeFormat("en-US", { timeZone: t }).format(), !0
            );
        } catch {
            return !1;
        }
    }

    constructor(t) {
        super(), (this.zoneName = t), (this.valid = i.isValidZone(t));
    }

    get type() {
        return "iana";
    }

    get name() {
        return this.zoneName;
    }

    get isUniversal() {
        return !1;
    }

    offsetName(t, { format: e, locale: s }) {
        return en(t, e, s, this.name);
    }

    formatOffset(t, e) {
        return ae(this.offset(t), e);
    }

    offset(t) {
        if (!this.valid) return NaN;
        const e = new Date(t);
        if (isNaN(e)) return NaN;
        const s = $f(this.name);
        let [n, r, o, a, l, c, h] = s.formatToParts ? Yf(s, e) : Uf(s, e);
        a === "BC" && (n = -Math.abs(n) + 1);
        const d = ti({
            year: n,
            month: r,
            day: o,
            hour: l === 24 ? 0 : l,
            minute: c,
            second: h,
            millisecond: 0,
        });
        let f = +e;
        const m = f % 1e3;
        return (f -= m >= 0 ? m : 1e3 + m), (d - f) / (60 * 1e3);
    }

    equals(t) {
        return t.type === "iana" && t.name === this.name;
    }

    get isValid() {
        return this.valid;
    }
};
const _l = {};
function Zf(i, t = {}) {
    const e = JSON.stringify([i, t]);
    let s = _l[e];
    return s || ((s = new Intl.ListFormat(i, t)), (_l[e] = s)), s;
}
const Ir = new Map();
function Cr(i, t = {}) {
    const e = JSON.stringify([i, t]);
    let s = Ir.get(e);
    return (
        s === void 0 && ((s = new Intl.DateTimeFormat(i, t)), Ir.set(e, s)), s
    );
}
const Fr = new Map();
function qf(i, t = {}) {
    const e = JSON.stringify([i, t]);
    let s = Fr.get(e);
    return s === void 0 && ((s = new Intl.NumberFormat(i, t)), Fr.set(e, s)), s;
}
const Ar = new Map();
function Gf(i, t = {}) {
    const { base: e, ...s } = t;
    const n = JSON.stringify([i, s]);
    let r = Ar.get(n);
    return (
        r === void 0 && ((r = new Intl.RelativeTimeFormat(i, t)), Ar.set(n, r)),
        r
    );
}
let ns = null;
function Xf() {
    return (
        ns || ((ns = new Intl.DateTimeFormat().resolvedOptions().locale), ns)
    );
}
const Lr = new Map();
function wl(i) {
    let t = Lr.get(i);
    return (
        t === void 0 &&
            ((t = new Intl.DateTimeFormat(i).resolvedOptions()), Lr.set(i, t)),
        t
    );
}
const Pr = new Map();
function Kf(i) {
    let t = Pr.get(i);
    if (!t) {
        const e = new Intl.Locale(i);
        (t = "getWeekInfo" in e ? e.getWeekInfo() : e.weekInfo),
            "minimalDays" in t || (t = { ...Sl, ...t }),
            Pr.set(i, t);
    }
    return t;
}
function Jf(i) {
    const t = i.indexOf("-x-");
    t !== -1 && (i = i.substring(0, t));
    const e = i.indexOf("-u-");
    if (e === -1) return [i];
    {
        let s, n;
        try {
            (s = Cr(i).resolvedOptions()), (n = i);
        } catch {
            const l = i.substring(0, e);
            (s = Cr(l).resolvedOptions()), (n = l);
        }
        const { numberingSystem: r, calendar: o } = s;
        return [n, r, o];
    }
}
function Qf(i, t, e) {
    return (
        (e || t) &&
            (i.includes("-u-") || (i += "-u"),
            e && (i += `-ca-${e}`),
            t && (i += `-nu-${t}`)),
        i
    );
}
function tm(i) {
    const t = [];
    for (let e = 1; e <= 12; e++) {
        const s = I.utc(2009, e, 1);
        t.push(i(s));
    }
    return t;
}
function em(i) {
    const t = [];
    for (let e = 1; e <= 7; e++) {
        const s = I.utc(2016, 11, 13 + e);
        t.push(i(s));
    }
    return t;
}
function sn(i, t, e, s) {
    const n = i.listingMode();
    return n === "error" ? null : n === "en" ? e(t) : s(t);
}
function im(i) {
    return i.numberingSystem && i.numberingSystem !== "latn"
        ? !1
        : i.numberingSystem === "latn" ||
              !i.locale ||
              i.locale.startsWith("en") ||
              wl(i.locale).numberingSystem === "latn";
}
const Nr = class {
    constructor(t, e, s) {
        (this.padTo = s.padTo || 0), (this.floor = s.floor || !1);
        const { padTo: n, floor: r, ...o } = s;
        if (!e || Object.keys(o).length > 0) {
            const a = { useGrouping: !1, ...s };
            s.padTo > 0 && (a.minimumIntegerDigits = s.padTo),
                (this.inf = qf(t, a));
        }
    }

    format(t) {
        if (this.inf) {
            const e = this.floor ? Math.floor(t) : t;
            return this.inf.format(e);
        } else {
            const e = this.floor ? Math.floor(t) : ei(t, 3);
            return Y(e, this.padTo);
        }
    }
};
const Rr = class {
    constructor(t, e, s) {
        (this.opts = s), (this.originalZone = void 0);
        let n;
        if (this.opts.timeZone) this.dt = t;
        else if (t.zone.type === "fixed") {
            const o = -1 * (t.offset / 60);
            const a = o >= 0 ? `Etc/GMT+${o}` : `Etc/GMT${o}`;
            t.offset !== 0 && at.create(a).valid
                ? ((n = a), (this.dt = t))
                : ((n = "UTC"),
                  (this.dt =
                      t.offset === 0
                          ? t
                          : t.setZone("UTC").plus({ minutes: t.offset })),
                  (this.originalZone = t.zone));
        } else {
            t.zone.type === "system"
                ? (this.dt = t)
                : t.zone.type === "iana"
                  ? ((this.dt = t), (n = t.zone.name))
                  : ((n = "UTC"),
                    (this.dt = t.setZone("UTC").plus({ minutes: t.offset })),
                    (this.originalZone = t.zone));
        }
        const r = { ...this.opts };
        (r.timeZone = r.timeZone || n), (this.dtf = Cr(e, r));
    }

    format() {
        return this.originalZone
            ? this.formatToParts()
                  .map(({ value: t }) => t)
                  .join("")
            : this.dtf.format(this.dt.toJSDate());
    }

    formatToParts() {
        const t = this.dtf.formatToParts(this.dt.toJSDate());
        return this.originalZone
            ? t.map((e) => {
                  if (e.type === "timeZoneName") {
                      const s = this.originalZone.offsetName(this.dt.ts, {
                          locale: this.dt.locale,
                          format: this.opts.timeZoneName,
                      });
                      return { ...e, value: s };
                  } else return e;
              })
            : t;
    }

    resolvedOptions() {
        return this.dtf.resolvedOptions();
    }
};
const Wr = class {
    constructor(t, e, s) {
        (this.opts = { style: "long", ...s }),
            !e && nn() && (this.rtf = Gf(t, s));
    }

    format(t, e) {
        return this.rtf
            ? this.rtf.format(t, e)
            : kl(e, t, this.opts.numeric, this.opts.style !== "long");
    }

    formatToParts(t, e) {
        return this.rtf ? this.rtf.formatToParts(t, e) : [];
    }
};
var Sl = { firstDay: 1, minimalDays: 4, weekend: [6, 7] };
const W = class i {
    static fromOpts(t) {
        return i.create(
            t.locale,
            t.numberingSystem,
            t.outputCalendar,
            t.weekSettings,
            t.defaultToEN,
        );
    }

    static create(t, e, s, n, r = !1) {
        const o = t || R.defaultLocale;
        const a = o || (r ? "en-US" : Xf());
        const l = e || R.defaultNumberingSystem;
        const c = s || R.defaultOutputCalendar;
        const h = rs(n) || R.defaultWeekSettings;
        return new i(a, l, c, h, o);
    }

    static resetCache() {
        (ns = null), Ir.clear(), Fr.clear(), Ar.clear(), Lr.clear(), Pr.clear();
    }

    static fromObject({
        locale: t,
        numberingSystem: e,
        outputCalendar: s,
        weekSettings: n,
    } = {}) {
        return i.create(t, e, s, n);
    }

    constructor(t, e, s, n, r) {
        const [o, a, l] = Jf(t);
        (this.locale = o),
            (this.numberingSystem = e || a || null),
            (this.outputCalendar = s || l || null),
            (this.weekSettings = n),
            (this.intl = Qf(
                this.locale,
                this.numberingSystem,
                this.outputCalendar,
            )),
            (this.weekdaysCache = { format: {}, standalone: {} }),
            (this.monthsCache = { format: {}, standalone: {} }),
            (this.meridiemCache = null),
            (this.eraCache = {}),
            (this.specifiedLocale = r),
            (this.fastNumbersCached = null);
    }

    get fastNumbers() {
        return (
            this.fastNumbersCached == null &&
                (this.fastNumbersCached = im(this)),
            this.fastNumbersCached
        );
    }

    listingMode() {
        const t = this.isEnglish();
        const e =
            (this.numberingSystem === null ||
                this.numberingSystem === "latn") &&
            (this.outputCalendar === null || this.outputCalendar === "gregory");
        return t && e ? "en" : "intl";
    }

    clone(t) {
        return !t || Object.getOwnPropertyNames(t).length === 0
            ? this
            : i.create(
                  t.locale || this.specifiedLocale,
                  t.numberingSystem || this.numberingSystem,
                  t.outputCalendar || this.outputCalendar,
                  rs(t.weekSettings) || this.weekSettings,
                  t.defaultToEN || !1,
              );
    }

    redefaultToEN(t = {}) {
        return this.clone({ ...t, defaultToEN: !0 });
    }

    redefaultToSystem(t = {}) {
        return this.clone({ ...t, defaultToEN: !1 });
    }

    months(t, e = !1) {
        return sn(this, t, zr, () => {
            const s = e ? { month: t, day: "numeric" } : { month: t };
            const n = e ? "format" : "standalone";
            return (
                this.monthsCache[n][t] ||
                    (this.monthsCache[n][t] = tm((r) =>
                        this.extract(r, s, "month"),
                    )),
                this.monthsCache[n][t]
            );
        });
    }

    weekdays(t, e = !1) {
        return sn(this, t, Vr, () => {
            const s = e
                ? { weekday: t, year: "numeric", month: "long", day: "numeric" }
                : { weekday: t };
            const n = e ? "format" : "standalone";
            return (
                this.weekdaysCache[n][t] ||
                    (this.weekdaysCache[n][t] = em((r) =>
                        this.extract(r, s, "weekday"),
                    )),
                this.weekdaysCache[n][t]
            );
        });
    }

    meridiems() {
        return sn(
            this,
            void 0,
            () => Hr,
            () => {
                if (!this.meridiemCache) {
                    const t = { hour: "numeric", hourCycle: "h12" };
                    this.meridiemCache = [
                        I.utc(2016, 11, 13, 9),
                        I.utc(2016, 11, 13, 19),
                    ].map((e) => this.extract(e, t, "dayperiod"));
                }
                return this.meridiemCache;
            },
        );
    }

    eras(t) {
        return sn(this, t, Br, () => {
            const e = { era: t };
            return (
                this.eraCache[t] ||
                    (this.eraCache[t] = [
                        I.utc(-40, 1, 1),
                        I.utc(2017, 1, 1),
                    ].map((s) => this.extract(s, e, "era"))),
                this.eraCache[t]
            );
        });
    }

    extract(t, e, s) {
        const n = this.dtFormatter(t, e);
        const r = n.formatToParts();
        const o = r.find((a) => a.type.toLowerCase() === s);
        return o ? o.value : null;
    }

    numberFormatter(t = {}) {
        return new Nr(this.intl, t.forceSimple || this.fastNumbers, t);
    }

    dtFormatter(t, e = {}) {
        return new Rr(t, this.intl, e);
    }

    relFormatter(t = {}) {
        return new Wr(this.intl, this.isEnglish(), t);
    }

    listFormatter(t = {}) {
        return Zf(this.intl, t);
    }

    isEnglish() {
        return (
            this.locale === "en" ||
            this.locale.toLowerCase() === "en-us" ||
            wl(this.intl).locale.startsWith("en-us")
        );
    }

    getWeekSettings() {
        return this.weekSettings
            ? this.weekSettings
            : rn()
              ? Kf(this.locale)
              : Sl;
    }

    getStartOfWeek() {
        return this.getWeekSettings().firstDay;
    }

    getMinDaysInFirstWeek() {
        return this.getWeekSettings().minimalDays;
    }

    getWeekendDays() {
        return this.getWeekSettings().weekend;
    }

    equals(t) {
        return (
            this.locale === t.locale &&
            this.numberingSystem === t.numberingSystem &&
            this.outputCalendar === t.outputCalendar
        );
    }

    toString() {
        return `Locale(${this.locale}, ${this.numberingSystem}, ${this.outputCalendar})`;
    }
};
let jr = null;
const et = class i extends ut {
    static get utcInstance() {
        return jr === null && (jr = new i(0)), jr;
    }

    static instance(t) {
        return t === 0 ? i.utcInstance : new i(t);
    }

    static parseSpecifier(t) {
        if (t) {
            const e = t.match(/^utc(?:([+-]\d{1,2})(?::(\d{2}))?)?$/i);
            if (e) return new i(Se(e[1], e[2]));
        }
        return null;
    }

    constructor(t) {
        super(), (this.fixed = t);
    }

    get type() {
        return "fixed";
    }

    get name() {
        return this.fixed === 0 ? "UTC" : `UTC${ae(this.fixed, "narrow")}`;
    }

    get ianaName() {
        return this.fixed === 0
            ? "Etc/UTC"
            : `Etc/GMT${ae(-this.fixed, "narrow")}`;
    }

    offsetName() {
        return this.name;
    }

    formatOffset(t, e) {
        return ae(this.fixed, e);
    }

    get isUniversal() {
        return !0;
    }

    offset() {
        return this.fixed;
    }

    equals(t) {
        return t.type === "fixed" && t.fixed === this.fixed;
    }

    get isValid() {
        return !0;
    }
};
const ii = class extends ut {
    constructor(t) {
        super(), (this.zoneName = t);
    }

    get type() {
        return "invalid";
    }

    get name() {
        return this.zoneName;
    }

    get isUniversal() {
        return !1;
    }

    offsetName() {
        return null;
    }

    formatOffset() {
        return "";
    }

    offset() {
        return NaN;
    }

    equals() {
        return !1;
    }

    get isValid() {
        return !1;
    }
};
function Dt(i, t) {
    let e;
    if (O(i) || i === null) return t;
    if (i instanceof ut) return i;
    if (Ml(i)) {
        const s = i.toLowerCase();
        return s === "default"
            ? t
            : s === "local" || s === "system"
              ? oe.instance
              : s === "utc" || s === "gmt"
                ? et.utcInstance
                : et.parseSpecifier(s) || at.create(i);
    } else {
        return Et(i)
            ? et.instance(i)
            : typeof i === "object" &&
                "offset" in i &&
                typeof i.offset === "function"
              ? i
              : new ii(i);
    }
}
const Yr = {
    arab: "[\u0660-\u0669]",
    arabext: "[\u06F0-\u06F9]",
    bali: "[\u1B50-\u1B59]",
    beng: "[\u09E6-\u09EF]",
    deva: "[\u0966-\u096F]",
    fullwide: "[\uFF10-\uFF19]",
    gujr: "[\u0AE6-\u0AEF]",
    hanidec:
        "[\u3007|\u4E00|\u4E8C|\u4E09|\u56DB|\u4E94|\u516D|\u4E03|\u516B|\u4E5D]",
    khmr: "[\u17E0-\u17E9]",
    knda: "[\u0CE6-\u0CEF]",
    laoo: "[\u0ED0-\u0ED9]",
    limb: "[\u1946-\u194F]",
    mlym: "[\u0D66-\u0D6F]",
    mong: "[\u1810-\u1819]",
    mymr: "[\u1040-\u1049]",
    orya: "[\u0B66-\u0B6F]",
    tamldec: "[\u0BE6-\u0BEF]",
    telu: "[\u0C66-\u0C6F]",
    thai: "[\u0E50-\u0E59]",
    tibt: "[\u0F20-\u0F29]",
    latn: "\\d",
};
const Tl = {
    arab: [1632, 1641],
    arabext: [1776, 1785],
    bali: [6992, 7001],
    beng: [2534, 2543],
    deva: [2406, 2415],
    fullwide: [65296, 65303],
    gujr: [2790, 2799],
    khmr: [6112, 6121],
    knda: [3302, 3311],
    laoo: [3792, 3801],
    limb: [6470, 6479],
    mlym: [3430, 3439],
    mong: [6160, 6169],
    mymr: [4160, 4169],
    orya: [2918, 2927],
    tamldec: [3046, 3055],
    telu: [3174, 3183],
    thai: [3664, 3673],
    tibt: [3872, 3881],
};
const sm = Yr.hanidec.replace(/[\[|\]]/g, "").split("");
function vl(i) {
    let t = parseInt(i, 10);
    if (isNaN(t)) {
        t = "";
        for (let e = 0; e < i.length; e++) {
            const s = i.charCodeAt(e);
            if (i[e].search(Yr.hanidec) !== -1) t += sm.indexOf(i[e]);
            else {
                for (const n in Tl) {
                    const [r, o] = Tl[n];
                    s >= r && s <= o && (t += s - r);
                }
            }
        }
        return parseInt(t, 10);
    } else return t;
}
const Ur = new Map();
function Ol() {
    Ur.clear();
}
function wt({ numberingSystem: i }, t = "") {
    const e = i || "latn";
    let s = Ur.get(e);
    s === void 0 && ((s = new Map()), Ur.set(e, s));
    let n = s.get(t);
    return n === void 0 && ((n = new RegExp(`${Yr[e]}${t}`)), s.set(t, n)), n;
}
let Dl = () => Date.now();
let El = "system";
let Il = null;
let Cl = null;
let Fl = null;
let Al = 60;
let Ll;
let Pl = null;
var R = class {
    static get now() {
        return Dl;
    }

    static set now(t) {
        Dl = t;
    }

    static set defaultZone(t) {
        El = t;
    }

    static get defaultZone() {
        return Dt(El, oe.instance);
    }

    static get defaultLocale() {
        return Il;
    }

    static set defaultLocale(t) {
        Il = t;
    }

    static get defaultNumberingSystem() {
        return Cl;
    }

    static set defaultNumberingSystem(t) {
        Cl = t;
    }

    static get defaultOutputCalendar() {
        return Fl;
    }

    static set defaultOutputCalendar(t) {
        Fl = t;
    }

    static get defaultWeekSettings() {
        return Pl;
    }

    static set defaultWeekSettings(t) {
        Pl = rs(t);
    }

    static get twoDigitCutoffYear() {
        return Al;
    }

    static set twoDigitCutoffYear(t) {
        Al = t % 100;
    }

    static get throwOnInvalid() {
        return Ll;
    }

    static set throwOnInvalid(t) {
        Ll = t;
    }

    static resetCaches() {
        W.resetCache(), at.resetCache(), I.resetCache(), Ol();
    }
};
const it = class {
    constructor(t, e) {
        (this.reason = t), (this.explanation = e);
    }

    toMessage() {
        return this.explanation
            ? `${this.reason}: ${this.explanation}`
            : this.reason;
    }
};
const Nl = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
const Rl = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];
function St(i, t) {
    return new it(
        "unit out of range",
        `you specified ${t} (of type ${typeof t}) as a ${i}, which is invalid`,
    );
}
function on(i, t, e) {
    const s = new Date(Date.UTC(i, t - 1, e));
    i < 100 && i >= 0 && s.setUTCFullYear(s.getUTCFullYear() - 1900);
    const n = s.getUTCDay();
    return n === 0 ? 7 : n;
}
function Wl(i, t, e) {
    return e + (Me(i) ? Rl : Nl)[t - 1];
}
function zl(i, t) {
    const e = Me(i) ? Rl : Nl;
    const s = e.findIndex((r) => r < t);
    const n = t - e[s];
    return { month: s + 1, day: n };
}
function an(i, t) {
    return ((i - t + 7) % 7) + 1;
}
function os(i, t = 4, e = 1) {
    const { year: s, month: n, day: r } = i;
    const o = Wl(s, n, r);
    const a = an(on(s, n, r), e);
    let l = Math.floor((o - a + 14 - t) / 7);
    let c;
    return (
        l < 1
            ? ((c = s - 1), (l = ke(c, t, e)))
            : l > ke(s, t, e)
              ? ((c = s + 1), (l = 1))
              : (c = s),
        { weekYear: c, weekNumber: l, weekday: a, ...ls(i) }
    );
}
function Zr(i, t = 4, e = 1) {
    const { weekYear: s, weekNumber: n, weekday: r } = i;
    const o = an(on(s, 1, t), e);
    const a = le(s);
    let l = n * 7 + r - o - 7 + t;
    let c;
    l < 1
        ? ((c = s - 1), (l += le(c)))
        : l > a
          ? ((c = s + 1), (l -= le(s)))
          : (c = s);
    const { month: h, day: u } = zl(c, l);
    return { year: c, month: h, day: u, ...ls(i) };
}
function ln(i) {
    const { year: t, month: e, day: s } = i;
    const n = Wl(t, e, s);
    return { year: t, ordinal: n, ...ls(i) };
}
function qr(i) {
    const { year: t, ordinal: e } = i;
    const { month: s, day: n } = zl(t, e);
    return { year: t, month: s, day: n, ...ls(i) };
}
function Gr(i, t) {
    if (!O(i.localWeekday) || !O(i.localWeekNumber) || !O(i.localWeekYear)) {
        if (!O(i.weekday) || !O(i.weekNumber) || !O(i.weekYear)) {
            throw new Tt(
                "Cannot mix locale-based week fields with ISO-based week fields",
            );
        }
        return (
            O(i.localWeekday) || (i.weekday = i.localWeekday),
            O(i.localWeekNumber) || (i.weekNumber = i.localWeekNumber),
            O(i.localWeekYear) || (i.weekYear = i.localWeekYear),
            delete i.localWeekday,
            delete i.localWeekNumber,
            delete i.localWeekYear,
            {
                minDaysInFirstWeek: t.getMinDaysInFirstWeek(),
                startOfWeek: t.getStartOfWeek(),
            }
        );
    } else return { minDaysInFirstWeek: 4, startOfWeek: 1 };
}
function Vl(i, t = 4, e = 1) {
    const s = as(i.weekYear);
    const n = bt(i.weekNumber, 1, ke(i.weekYear, t, e));
    const r = bt(i.weekday, 1, 7);
    return s
        ? n
            ? r
                ? !1
                : St("weekday", i.weekday)
            : St("week", i.weekNumber)
        : St("weekYear", i.weekYear);
}
function Hl(i) {
    const t = as(i.year);
    const e = bt(i.ordinal, 1, le(i.year));
    return t ? (e ? !1 : St("ordinal", i.ordinal)) : St("year", i.year);
}
function Xr(i) {
    const t = as(i.year);
    const e = bt(i.month, 1, 12);
    const s = bt(i.day, 1, si(i.year, i.month));
    return t
        ? e
            ? s
                ? !1
                : St("day", i.day)
            : St("month", i.month)
        : St("year", i.year);
}
function Kr(i) {
    const { hour: t, minute: e, second: s, millisecond: n } = i;
    const r = bt(t, 0, 23) || (t === 24 && e === 0 && s === 0 && n === 0);
    const o = bt(e, 0, 59);
    const a = bt(s, 0, 59);
    const l = bt(n, 0, 999);
    return r
        ? o
            ? a
                ? l
                    ? !1
                    : St("millisecond", n)
                : St("second", s)
            : St("minute", e)
        : St("hour", t);
}
function O(i) {
    return typeof i > "u";
}
function Et(i) {
    return typeof i === "number";
}
function as(i) {
    return typeof i === "number" && i % 1 === 0;
}
function Ml(i) {
    return typeof i === "string";
}
function $l(i) {
    return Object.prototype.toString.call(i) === "[object Date]";
}
function nn() {
    try {
        return typeof Intl < "u" && !!Intl.RelativeTimeFormat;
    } catch {
        return !1;
    }
}
function rn() {
    try {
        return (
            typeof Intl < "u" &&
            !!Intl.Locale &&
            ("weekInfo" in Intl.Locale.prototype ||
                "getWeekInfo" in Intl.Locale.prototype)
        );
    } catch {
        return !1;
    }
}
function jl(i) {
    return Array.isArray(i) ? i : [i];
}
function Jr(i, t, e) {
    if (i.length !== 0) {
        return i.reduce((s, n) => {
            const r = [t(n), n];
            return s && e(s[0], r[0]) === s[0] ? s : r;
        }, null)[1];
    }
}
function Ul(i, t) {
    return t.reduce((e, s) => ((e[s] = i[s]), e), {});
}
function ce(i, t) {
    return Object.prototype.hasOwnProperty.call(i, t);
}
function rs(i) {
    if (i == null) return null;
    if (typeof i !== "object") throw new G("Week settings must be an object");
    if (
        !bt(i.firstDay, 1, 7) ||
        !bt(i.minimalDays, 1, 7) ||
        !Array.isArray(i.weekend) ||
        i.weekend.some((t) => !bt(t, 1, 7))
    ) {
        throw new G("Invalid week settings");
    }
    return {
        firstDay: i.firstDay,
        minimalDays: i.minimalDays,
        weekend: Array.from(i.weekend),
    };
}
function bt(i, t, e) {
    return as(i) && i >= t && i <= e;
}
function nm(i, t) {
    return i - t * Math.floor(i / t);
}
function Y(i, t = 2) {
    const e = i < 0;
    let s;
    return (
        e
            ? (s = "-" + ("" + -i).padStart(t, "0"))
            : (s = ("" + i).padStart(t, "0")),
        s
    );
}
function Ut(i) {
    if (!(O(i) || i === null || i === "")) return parseInt(i, 10);
}
function he(i) {
    if (!(O(i) || i === null || i === "")) return parseFloat(i);
}
function cs(i) {
    if (!(O(i) || i === null || i === "")) {
        const t = parseFloat("0." + i) * 1e3;
        return Math.floor(t);
    }
}
function ei(i, t, e = !1) {
    const s = 10 ** t;
    return (e ? Math.trunc : Math.round)(i * s) / s;
}
function Me(i) {
    return i % 4 === 0 && (i % 100 !== 0 || i % 400 === 0);
}
function le(i) {
    return Me(i) ? 366 : 365;
}
function si(i, t) {
    const e = nm(t - 1, 12) + 1;
    const s = i + (t - e) / 12;
    return e === 2
        ? Me(s)
            ? 29
            : 28
        : [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][e - 1];
}
function ti(i) {
    let t = Date.UTC(
        i.year,
        i.month - 1,
        i.day,
        i.hour,
        i.minute,
        i.second,
        i.millisecond,
    );
    return (
        i.year < 100 &&
            i.year >= 0 &&
            ((t = new Date(t)), t.setUTCFullYear(i.year, i.month - 1, i.day)),
        +t
    );
}
function Bl(i, t, e) {
    return -an(on(i, 1, t), e) + t - 1;
}
function ke(i, t = 4, e = 1) {
    const s = Bl(i, t, e);
    const n = Bl(i + 1, t, e);
    return (le(i) - s + n) / 7;
}
function hs(i) {
    return i > 99 ? i : i > R.twoDigitCutoffYear ? 1900 + i : 2e3 + i;
}
function en(i, t, e, s = null) {
    const n = new Date(i);
    const r = {
        hourCycle: "h23",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    };
    s && (r.timeZone = s);
    const o = { timeZoneName: t, ...r };
    const a = new Intl.DateTimeFormat(e, o)
        .formatToParts(n)
        .find((l) => l.type.toLowerCase() === "timezonename");
    return a ? a.value : null;
}
function Se(i, t) {
    let e = parseInt(i, 10);
    Number.isNaN(e) && (e = 0);
    const s = parseInt(t, 10) || 0;
    const n = e < 0 || Object.is(e, -0) ? -s : s;
    return e * 60 + n;
}
function Qr(i) {
    const t = Number(i);
    if (typeof i === "boolean" || i === "" || Number.isNaN(t)) {
        throw new G(`Invalid unit value ${i}`);
    }
    return t;
}
function ni(i, t) {
    const e = {};
    for (const s in i) {
        if (ce(i, s)) {
            const n = i[s];
            if (n == null) continue;
            e[t(s)] = Qr(n);
        }
    }
    return e;
}
function ae(i, t) {
    const e = Math.trunc(Math.abs(i / 60));
    const s = Math.trunc(Math.abs(i % 60));
    const n = i >= 0 ? "+" : "-";
    switch (t) {
        case "short":
            return `${n}${Y(e, 2)}:${Y(s, 2)}`;
        case "narrow":
            return `${n}${e}${s > 0 ? `:${s}` : ""}`;
        case "techie":
            return `${n}${Y(e, 2)}${Y(s, 2)}`;
        default:
            throw new RangeError(
                `Value format ${t} is out of range for property format`,
            );
    }
}
function ls(i) {
    return Ul(i, ["hour", "minute", "second", "millisecond"]);
}
const rm = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
const to = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];
const om = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
function zr(i) {
    switch (i) {
        case "narrow":
            return [...om];
        case "short":
            return [...to];
        case "long":
            return [...rm];
        case "numeric":
            return [
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                "10",
                "11",
                "12",
            ];
        case "2-digit":
            return [
                "01",
                "02",
                "03",
                "04",
                "05",
                "06",
                "07",
                "08",
                "09",
                "10",
                "11",
                "12",
            ];
        default:
            return null;
    }
}
const eo = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
];
const io = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const am = ["M", "T", "W", "T", "F", "S", "S"];
function Vr(i) {
    switch (i) {
        case "narrow":
            return [...am];
        case "short":
            return [...io];
        case "long":
            return [...eo];
        case "numeric":
            return ["1", "2", "3", "4", "5", "6", "7"];
        default:
            return null;
    }
}
var Hr = ["AM", "PM"];
const lm = ["Before Christ", "Anno Domini"];
const cm = ["BC", "AD"];
const hm = ["B", "A"];
function Br(i) {
    switch (i) {
        case "narrow":
            return [...hm];
        case "short":
            return [...cm];
        case "long":
            return [...lm];
        default:
            return null;
    }
}
function Yl(i) {
    return Hr[i.hour < 12 ? 0 : 1];
}
function Zl(i, t) {
    return Vr(t)[i.weekday - 1];
}
function ql(i, t) {
    return zr(t)[i.month - 1];
}
function Gl(i, t) {
    return Br(t)[i.year < 0 ? 0 : 1];
}
function kl(i, t, e = "always", s = !1) {
    const n = {
        years: ["year", "yr."],
        quarters: ["quarter", "qtr."],
        months: ["month", "mo."],
        weeks: ["week", "wk."],
        days: ["day", "day", "days"],
        hours: ["hour", "hr."],
        minutes: ["minute", "min."],
        seconds: ["second", "sec."],
    };
    const r = ["hours", "minutes", "seconds"].indexOf(i) === -1;
    if (e === "auto" && r) {
        const u = i === "days";
        switch (t) {
            case 1:
                return u ? "tomorrow" : `next ${n[i][0]}`;
            case -1:
                return u ? "yesterday" : `last ${n[i][0]}`;
            case 0:
                return u ? "today" : `this ${n[i][0]}`;
            default:
        }
    }
    const o = Object.is(t, -0) || t < 0;
    const a = Math.abs(t);
    const l = a === 1;
    const c = n[i];
    const h = s ? (l ? c[1] : c[2] || c[1]) : l ? n[i][0] : i;
    return o ? `${a} ${h} ago` : `in ${a} ${h}`;
}
function Xl(i, t) {
    let e = "";
    for (const s of i) s.literal ? (e += s.val) : (e += t(s.val));
    return e;
}
const um = {
    D: re,
    DD: zi,
    DDD: Vi,
    DDDD: Hi,
    t: Bi,
    tt: $i,
    ttt: ji,
    tttt: Ui,
    T: Yi,
    TT: Zi,
    TTT: qi,
    TTTT: Gi,
    f: Xi,
    ff: Ji,
    fff: ts,
    ffff: is,
    F: Ki,
    FF: Qi,
    FFF: es,
    FFFF: ss,
};
const st = class i {
    static create(t, e = {}) {
        return new i(t, e);
    }

    static parseFormat(t) {
        let e = null;
        let s = "";
        let n = !1;
        const r = [];
        for (let o = 0; o < t.length; o++) {
            const a = t.charAt(o);
            a === "'"
                ? (s.length > 0 &&
                      r.push({ literal: n || /^\s+$/.test(s), val: s }),
                  (e = null),
                  (s = ""),
                  (n = !n))
                : n || a === e
                  ? (s += a)
                  : (s.length > 0 &&
                        r.push({ literal: /^\s+$/.test(s), val: s }),
                    (s = a),
                    (e = a));
        }
        return (
            s.length > 0 && r.push({ literal: n || /^\s+$/.test(s), val: s }), r
        );
    }

    static macroTokenToFormatOpts(t) {
        return um[t];
    }

    constructor(t, e) {
        (this.opts = e), (this.loc = t), (this.systemLoc = null);
    }

    formatWithSystemDefault(t, e) {
        return (
            this.systemLoc === null &&
                (this.systemLoc = this.loc.redefaultToSystem()),
            this.systemLoc.dtFormatter(t, { ...this.opts, ...e }).format()
        );
    }

    dtFormatter(t, e = {}) {
        return this.loc.dtFormatter(t, { ...this.opts, ...e });
    }

    formatDateTime(t, e) {
        return this.dtFormatter(t, e).format();
    }

    formatDateTimeParts(t, e) {
        return this.dtFormatter(t, e).formatToParts();
    }

    formatInterval(t, e) {
        return this.dtFormatter(t.start, e).dtf.formatRange(
            t.start.toJSDate(),
            t.end.toJSDate(),
        );
    }

    resolvedOptions(t, e) {
        return this.dtFormatter(t, e).resolvedOptions();
    }

    num(t, e = 0) {
        if (this.opts.forceSimple) return Y(t, e);
        const s = { ...this.opts };
        return e > 0 && (s.padTo = e), this.loc.numberFormatter(s).format(t);
    }

    formatDateTimeFromString(t, e) {
        const s = this.loc.listingMode() === "en";
        const n =
            this.loc.outputCalendar && this.loc.outputCalendar !== "gregory";
        const r = (f, m) => this.loc.extract(t, f, m);
        const o = (f) =>
            t.isOffsetFixed && t.offset === 0 && f.allowZ
                ? "Z"
                : t.isValid
                  ? t.zone.formatOffset(t.ts, f.format)
                  : "";
        const a = () =>
            s ? Yl(t) : r({ hour: "numeric", hourCycle: "h12" }, "dayperiod");
        const l = (f, m) =>
            s
                ? ql(t, f)
                : r(m ? { month: f } : { month: f, day: "numeric" }, "month");
        const c = (f, m) =>
            s
                ? Zl(t, f)
                : r(
                      m
                          ? { weekday: f }
                          : { weekday: f, month: "long", day: "numeric" },
                      "weekday",
                  );
        const h = (f) => {
            const m = i.macroTokenToFormatOpts(f);
            return m ? this.formatWithSystemDefault(t, m) : f;
        };
        const u = (f) => (s ? Gl(t, f) : r({ era: f }, "era"));
        const d = (f) => {
            switch (f) {
                case "S":
                    return this.num(t.millisecond);
                case "u":
                case "SSS":
                    return this.num(t.millisecond, 3);
                case "s":
                    return this.num(t.second);
                case "ss":
                    return this.num(t.second, 2);
                case "uu":
                    return this.num(Math.floor(t.millisecond / 10), 2);
                case "uuu":
                    return this.num(Math.floor(t.millisecond / 100));
                case "m":
                    return this.num(t.minute);
                case "mm":
                    return this.num(t.minute, 2);
                case "h":
                    return this.num(t.hour % 12 === 0 ? 12 : t.hour % 12);
                case "hh":
                    return this.num(t.hour % 12 === 0 ? 12 : t.hour % 12, 2);
                case "H":
                    return this.num(t.hour);
                case "HH":
                    return this.num(t.hour, 2);
                case "Z":
                    return o({ format: "narrow", allowZ: this.opts.allowZ });
                case "ZZ":
                    return o({ format: "short", allowZ: this.opts.allowZ });
                case "ZZZ":
                    return o({ format: "techie", allowZ: this.opts.allowZ });
                case "ZZZZ":
                    return t.zone.offsetName(t.ts, {
                        format: "short",
                        locale: this.loc.locale,
                    });
                case "ZZZZZ":
                    return t.zone.offsetName(t.ts, {
                        format: "long",
                        locale: this.loc.locale,
                    });
                case "z":
                    return t.zoneName;
                case "a":
                    return a();
                case "d":
                    return n ? r({ day: "numeric" }, "day") : this.num(t.day);
                case "dd":
                    return n
                        ? r({ day: "2-digit" }, "day")
                        : this.num(t.day, 2);
                case "c":
                    return this.num(t.weekday);
                case "ccc":
                    return c("short", !0);
                case "cccc":
                    return c("long", !0);
                case "ccccc":
                    return c("narrow", !0);
                case "E":
                    return this.num(t.weekday);
                case "EEE":
                    return c("short", !1);
                case "EEEE":
                    return c("long", !1);
                case "EEEEE":
                    return c("narrow", !1);
                case "L":
                    return n
                        ? r({ month: "numeric", day: "numeric" }, "month")
                        : this.num(t.month);
                case "LL":
                    return n
                        ? r({ month: "2-digit", day: "numeric" }, "month")
                        : this.num(t.month, 2);
                case "LLL":
                    return l("short", !0);
                case "LLLL":
                    return l("long", !0);
                case "LLLLL":
                    return l("narrow", !0);
                case "M":
                    return n
                        ? r({ month: "numeric" }, "month")
                        : this.num(t.month);
                case "MM":
                    return n
                        ? r({ month: "2-digit" }, "month")
                        : this.num(t.month, 2);
                case "MMM":
                    return l("short", !1);
                case "MMMM":
                    return l("long", !1);
                case "MMMMM":
                    return l("narrow", !1);
                case "y":
                    return n
                        ? r({ year: "numeric" }, "year")
                        : this.num(t.year);
                case "yy":
                    return n
                        ? r({ year: "2-digit" }, "year")
                        : this.num(t.year.toString().slice(-2), 2);
                case "yyyy":
                    return n
                        ? r({ year: "numeric" }, "year")
                        : this.num(t.year, 4);
                case "yyyyyy":
                    return n
                        ? r({ year: "numeric" }, "year")
                        : this.num(t.year, 6);
                case "G":
                    return u("short");
                case "GG":
                    return u("long");
                case "GGGGG":
                    return u("narrow");
                case "kk":
                    return this.num(t.weekYear.toString().slice(-2), 2);
                case "kkkk":
                    return this.num(t.weekYear, 4);
                case "W":
                    return this.num(t.weekNumber);
                case "WW":
                    return this.num(t.weekNumber, 2);
                case "n":
                    return this.num(t.localWeekNumber);
                case "nn":
                    return this.num(t.localWeekNumber, 2);
                case "ii":
                    return this.num(t.localWeekYear.toString().slice(-2), 2);
                case "iiii":
                    return this.num(t.localWeekYear, 4);
                case "o":
                    return this.num(t.ordinal);
                case "ooo":
                    return this.num(t.ordinal, 3);
                case "q":
                    return this.num(t.quarter);
                case "qq":
                    return this.num(t.quarter, 2);
                case "X":
                    return this.num(Math.floor(t.ts / 1e3));
                case "x":
                    return this.num(t.ts);
                default:
                    return h(f);
            }
        };
        return Xl(i.parseFormat(e), d);
    }

    formatDurationFromString(t, e) {
        const s = (l) => {
            switch (l[0]) {
                case "S":
                    return "millisecond";
                case "s":
                    return "second";
                case "m":
                    return "minute";
                case "h":
                    return "hour";
                case "d":
                    return "day";
                case "w":
                    return "week";
                case "M":
                    return "month";
                case "y":
                    return "year";
                default:
                    return null;
            }
        };
        const n = (l) => (c) => {
            const h = s(c);
            return h ? this.num(l.get(h), c.length) : c;
        };
        const r = i.parseFormat(e);
        const o = r.reduce(
            (l, { literal: c, val: h }) => (c ? l : l.concat(h)),
            [],
        );
        const a = t.shiftTo(...o.map(s).filter((l) => l));
        return Xl(r, n(a));
    }
};
const Jl =
    /[A-Za-z_+-]{1,256}(?::?\/[A-Za-z0-9_+-]{1,256}(?:\/[A-Za-z0-9_+-]{1,256})?)?/;
function oi(...i) {
    const t = i.reduce((e, s) => e + s.source, "");
    return RegExp(`^${t}$`);
}
function ai(...i) {
    return (t) =>
        i
            .reduce(
                ([e, s, n], r) => {
                    const [o, a, l] = r(t, n);
                    return [{ ...e, ...o }, a || s, l];
                },
                [{}, null, 1],
            )
            .slice(0, 2);
}
function li(i, ...t) {
    if (i == null) return [null, null];
    for (const [e, s] of t) {
        const n = e.exec(i);
        if (n) return s(n);
    }
    return [null, null];
}
function Ql(...i) {
    return (t, e) => {
        const s = {};
        let n;
        for (n = 0; n < i.length; n++) s[i[n]] = Ut(t[e + n]);
        return [s, null, e + n];
    };
}
const tc = /(?:(Z)|([+-]\d\d)(?::?(\d\d))?)/;
const dm = `(?:${tc.source}?(?:\\[(${Jl.source})\\])?)?`;
const so = /(\d\d)(?::?(\d\d)(?::?(\d\d)(?:[.,](\d{1,30}))?)?)?/;
const ec = RegExp(`${so.source}${dm}`);
const no = RegExp(`(?:T${ec.source})?`);
const fm = /([+-]\d{6}|\d{4})(?:-?(\d\d)(?:-?(\d\d))?)?/;
const mm = /(\d{4})-?W(\d\d)(?:-?(\d))?/;
const gm = /(\d{4})-?(\d{3})/;
const pm = Ql("weekYear", "weekNumber", "weekDay");
const ym = Ql("year", "ordinal");
const bm = /(\d{4})-(\d\d)-(\d\d)/;
const ic = RegExp(`${so.source} ?(?:${tc.source}|(${Jl.source}))?`);
const xm = RegExp(`(?: ${ic.source})?`);
function ri(i, t, e) {
    const s = i[t];
    return O(s) ? e : Ut(s);
}
function _m(i, t) {
    return [
        { year: ri(i, t), month: ri(i, t + 1, 1), day: ri(i, t + 2, 1) },
        null,
        t + 3,
    ];
}
function ci(i, t) {
    return [
        {
            hours: ri(i, t, 0),
            minutes: ri(i, t + 1, 0),
            seconds: ri(i, t + 2, 0),
            milliseconds: cs(i[t + 3]),
        },
        null,
        t + 4,
    ];
}
function us(i, t) {
    const e = !i[t] && !i[t + 1];
    const s = Se(i[t + 1], i[t + 2]);
    const n = e ? null : et.instance(s);
    return [{}, n, t + 3];
}
function ds(i, t) {
    const e = i[t] ? at.create(i[t]) : null;
    return [{}, e, t + 1];
}
const wm = RegExp(`^T?${so.source}$`);
const Sm =
    /^-?P(?:(?:(-?\d{1,20}(?:\.\d{1,20})?)Y)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20}(?:\.\d{1,20})?)W)?(?:(-?\d{1,20}(?:\.\d{1,20})?)D)?(?:T(?:(-?\d{1,20}(?:\.\d{1,20})?)H)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20})(?:[.,](-?\d{1,20}))?S)?)?)$/;
function km(i) {
    const [t, e, s, n, r, o, a, l, c] = i;
    const h = t[0] === "-";
    const u = l && l[0] === "-";
    const d = (f, m = !1) => (f !== void 0 && (m || (f && h)) ? -f : f);
    return [
        {
            years: d(he(e)),
            months: d(he(s)),
            weeks: d(he(n)),
            days: d(he(r)),
            hours: d(he(o)),
            minutes: d(he(a)),
            seconds: d(he(l), l === "-0"),
            milliseconds: d(cs(c), u),
        },
    ];
}
const Mm = {
    GMT: 0,
    EDT: -4 * 60,
    EST: -5 * 60,
    CDT: -5 * 60,
    CST: -6 * 60,
    MDT: -6 * 60,
    MST: -7 * 60,
    PDT: -7 * 60,
    PST: -8 * 60,
};
function ro(i, t, e, s, n, r, o) {
    const a = {
        year: t.length === 2 ? hs(Ut(t)) : Ut(t),
        month: to.indexOf(e) + 1,
        day: Ut(s),
        hour: Ut(n),
        minute: Ut(r),
    };
    return (
        o && (a.second = Ut(o)),
        i && (a.weekday = i.length > 3 ? eo.indexOf(i) + 1 : io.indexOf(i) + 1),
        a
    );
}
const Tm =
    /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|(?:([+-]\d\d)(\d\d)))$/;
function vm(i) {
    const [, t, e, s, n, r, o, a, l, c, h, u] = i;
    const d = ro(t, n, s, e, r, o, a);
    let f;
    return l ? (f = Mm[l]) : c ? (f = 0) : (f = Se(h, u)), [d, new et(f)];
}
function Om(i) {
    return i
        .replace(/\([^()]*\)|[\n\t]/g, " ")
        .replace(/(\s\s+)/g, " ")
        .trim();
}
const Dm =
    /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d\d) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d\d):(\d\d):(\d\d) GMT$/;
const Em =
    /^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (\d\d)-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d\d) (\d\d):(\d\d):(\d\d) GMT$/;
const Im =
    /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( \d|\d\d) (\d\d):(\d\d):(\d\d) (\d{4})$/;
function Kl(i) {
    const [, t, e, s, n, r, o, a] = i;
    return [ro(t, n, s, e, r, o, a), et.utcInstance];
}
function Cm(i) {
    const [, t, e, s, n, r, o, a] = i;
    return [ro(t, a, e, s, n, r, o), et.utcInstance];
}
const Fm = oi(fm, no);
const Am = oi(mm, no);
const Lm = oi(gm, no);
const Pm = oi(ec);
const sc = ai(_m, ci, us, ds);
const Nm = ai(pm, ci, us, ds);
const Rm = ai(ym, ci, us, ds);
const Wm = ai(ci, us, ds);
function nc(i) {
    return li(i, [Fm, sc], [Am, Nm], [Lm, Rm], [Pm, Wm]);
}
function rc(i) {
    return li(Om(i), [Tm, vm]);
}
function oc(i) {
    return li(i, [Dm, Kl], [Em, Kl], [Im, Cm]);
}
function ac(i) {
    return li(i, [Sm, km]);
}
const zm = ai(ci);
function lc(i) {
    return li(i, [wm, zm]);
}
const Vm = oi(bm, xm);
const Hm = oi(ic);
const Bm = ai(ci, us, ds);
function cc(i) {
    return li(i, [Vm, sc], [Hm, Bm]);
}
const hc = "Invalid Duration";
const dc = {
    weeks: {
        days: 7,
        hours: 7 * 24,
        minutes: 7 * 24 * 60,
        seconds: 7 * 24 * 60 * 60,
        milliseconds: 7 * 24 * 60 * 60 * 1e3,
    },
    days: {
        hours: 24,
        minutes: 24 * 60,
        seconds: 24 * 60 * 60,
        milliseconds: 24 * 60 * 60 * 1e3,
    },
    hours: { minutes: 60, seconds: 60 * 60, milliseconds: 60 * 60 * 1e3 },
    minutes: { seconds: 60, milliseconds: 60 * 1e3 },
    seconds: { milliseconds: 1e3 },
};
const $m = {
    years: {
        quarters: 4,
        months: 12,
        weeks: 52,
        days: 365,
        hours: 365 * 24,
        minutes: 365 * 24 * 60,
        seconds: 365 * 24 * 60 * 60,
        milliseconds: 365 * 24 * 60 * 60 * 1e3,
    },
    quarters: {
        months: 3,
        weeks: 13,
        days: 91,
        hours: 91 * 24,
        minutes: 91 * 24 * 60,
        seconds: 91 * 24 * 60 * 60,
        milliseconds: 91 * 24 * 60 * 60 * 1e3,
    },
    months: {
        weeks: 4,
        days: 30,
        hours: 30 * 24,
        minutes: 30 * 24 * 60,
        seconds: 30 * 24 * 60 * 60,
        milliseconds: 30 * 24 * 60 * 60 * 1e3,
    },
    ...dc,
};
const kt = 146097 / 400;
const hi = 146097 / 4800;
const jm = {
    years: {
        quarters: 4,
        months: 12,
        weeks: kt / 7,
        days: kt,
        hours: kt * 24,
        minutes: kt * 24 * 60,
        seconds: kt * 24 * 60 * 60,
        milliseconds: kt * 24 * 60 * 60 * 1e3,
    },
    quarters: {
        months: 3,
        weeks: kt / 28,
        days: kt / 4,
        hours: (kt * 24) / 4,
        minutes: (kt * 24 * 60) / 4,
        seconds: (kt * 24 * 60 * 60) / 4,
        milliseconds: (kt * 24 * 60 * 60 * 1e3) / 4,
    },
    months: {
        weeks: hi / 7,
        days: hi,
        hours: hi * 24,
        minutes: hi * 24 * 60,
        seconds: hi * 24 * 60 * 60,
        milliseconds: hi * 24 * 60 * 60 * 1e3,
    },
    ...dc,
};
const Te = [
    "years",
    "quarters",
    "months",
    "weeks",
    "days",
    "hours",
    "minutes",
    "seconds",
    "milliseconds",
];
const Um = Te.slice(0).reverse();
function ue(i, t, e = !1) {
    const s = {
        values: e ? t.values : { ...i.values, ...(t.values || {}) },
        loc: i.loc.clone(t.loc),
        conversionAccuracy: t.conversionAccuracy || i.conversionAccuracy,
        matrix: t.matrix || i.matrix,
    };
    return new Z(s);
}
function fc(i, t) {
    let e = t.milliseconds ?? 0;
    for (const s of Um.slice(1)) t[s] && (e += t[s] * i[s].milliseconds);
    return e;
}
function uc(i, t) {
    const e = fc(i, t) < 0 ? -1 : 1;
    Te.reduceRight((s, n) => {
        if (O(t[n])) return s;
        if (s) {
            const r = t[s] * e;
            const o = i[n][s];
            const a = Math.floor(r / o);
            (t[n] += a * e), (t[s] -= a * o * e);
        }
        return n;
    }, null),
        Te.reduce((s, n) => {
            if (O(t[n])) return s;
            if (s) {
                const r = t[s] % 1;
                (t[s] -= r), (t[n] += r * i[s][n]);
            }
            return n;
        }, null);
}
function Ym(i) {
    const t = {};
    for (const [e, s] of Object.entries(i)) s !== 0 && (t[e] = s);
    return t;
}
var Z = class i {
    constructor(t) {
        const e = t.conversionAccuracy === "longterm" || !1;
        let s = e ? jm : $m;
        t.matrix && (s = t.matrix),
            (this.values = t.values),
            (this.loc = t.loc || W.create()),
            (this.conversionAccuracy = e ? "longterm" : "casual"),
            (this.invalid = t.invalid || null),
            (this.matrix = s),
            (this.isLuxonDuration = !0);
    }

    static fromMillis(t, e) {
        return i.fromObject({ milliseconds: t }, e);
    }

    static fromObject(t, e = {}) {
        if (t == null || typeof t !== "object") {
            throw new G(
                `Duration.fromObject: argument expected to be an object, got ${t === null ? "null" : typeof t}`,
            );
        }
        return new i({
            values: ni(t, i.normalizeUnit),
            loc: W.fromObject(e),
            conversionAccuracy: e.conversionAccuracy,
            matrix: e.matrix,
        });
    }

    static fromDurationLike(t) {
        if (Et(t)) return i.fromMillis(t);
        if (i.isDuration(t)) return t;
        if (typeof t === "object") return i.fromObject(t);
        throw new G(`Unknown duration argument ${t} of type ${typeof t}`);
    }

    static fromISO(t, e) {
        const [s] = ac(t);
        return s
            ? i.fromObject(s, e)
            : i.invalid(
                  "unparsable",
                  `the input "${t}" can't be parsed as ISO 8601`,
              );
    }

    static fromISOTime(t, e) {
        const [s] = lc(t);
        return s
            ? i.fromObject(s, e)
            : i.invalid(
                  "unparsable",
                  `the input "${t}" can't be parsed as ISO 8601`,
              );
    }

    static invalid(t, e = null) {
        if (!t) throw new G("need to specify a reason the Duration is invalid");
        const s = t instanceof it ? t : new it(t, e);
        if (R.throwOnInvalid) throw new Qs(s);
        return new i({ invalid: s });
    }

    static normalizeUnit(t) {
        const e = {
            year: "years",
            years: "years",
            quarter: "quarters",
            quarters: "quarters",
            month: "months",
            months: "months",
            week: "weeks",
            weeks: "weeks",
            day: "days",
            days: "days",
            hour: "hours",
            hours: "hours",
            minute: "minutes",
            minutes: "minutes",
            second: "seconds",
            seconds: "seconds",
            millisecond: "milliseconds",
            milliseconds: "milliseconds",
        }[t && t.toLowerCase()];
        if (!e) throw new Qe(t);
        return e;
    }

    static isDuration(t) {
        return (t && t.isLuxonDuration) || !1;
    }

    get locale() {
        return this.isValid ? this.loc.locale : null;
    }

    get numberingSystem() {
        return this.isValid ? this.loc.numberingSystem : null;
    }

    toFormat(t, e = {}) {
        const s = { ...e, floor: e.round !== !1 && e.floor !== !1 };
        return this.isValid
            ? st.create(this.loc, s).formatDurationFromString(this, t)
            : hc;
    }

    toHuman(t = {}) {
        if (!this.isValid) return hc;
        const e = Te.map((s) => {
            const n = this.values[s];
            return O(n)
                ? null
                : this.loc
                      .numberFormatter({
                          style: "unit",
                          unitDisplay: "long",
                          ...t,
                          unit: s.slice(0, -1),
                      })
                      .format(n);
        }).filter((s) => s);
        return this.loc
            .listFormatter({
                type: "conjunction",
                style: t.listStyle || "narrow",
                ...t,
            })
            .format(e);
    }

    toObject() {
        return this.isValid ? { ...this.values } : {};
    }

    toISO() {
        if (!this.isValid) return null;
        let t = "P";
        return (
            this.years !== 0 && (t += this.years + "Y"),
            (this.months !== 0 || this.quarters !== 0) &&
                (t += this.months + this.quarters * 3 + "M"),
            this.weeks !== 0 && (t += this.weeks + "W"),
            this.days !== 0 && (t += this.days + "D"),
            (this.hours !== 0 ||
                this.minutes !== 0 ||
                this.seconds !== 0 ||
                this.milliseconds !== 0) &&
                (t += "T"),
            this.hours !== 0 && (t += this.hours + "H"),
            this.minutes !== 0 && (t += this.minutes + "M"),
            (this.seconds !== 0 || this.milliseconds !== 0) &&
                (t += ei(this.seconds + this.milliseconds / 1e3, 3) + "S"),
            t === "P" && (t += "T0S"),
            t
        );
    }

    toISOTime(t = {}) {
        if (!this.isValid) return null;
        const e = this.toMillis();
        return e < 0 || e >= 864e5
            ? null
            : ((t = {
                  suppressMilliseconds: !1,
                  suppressSeconds: !1,
                  includePrefix: !1,
                  format: "extended",
                  ...t,
                  includeOffset: !1,
              }),
              I.fromMillis(e, { zone: "UTC" }).toISOTime(t));
    }

    toJSON() {
        return this.toISO();
    }

    toString() {
        return this.toISO();
    }

    [Symbol.for("nodejs.util.inspect.custom")]() {
        return this.isValid
            ? `Duration { values: ${JSON.stringify(this.values)} }`
            : `Duration { Invalid, reason: ${this.invalidReason} }`;
    }

    toMillis() {
        return this.isValid ? fc(this.matrix, this.values) : NaN;
    }

    valueOf() {
        return this.toMillis();
    }

    plus(t) {
        if (!this.isValid) return this;
        const e = i.fromDurationLike(t);
        const s = {};
        for (const n of Te) {
            (ce(e.values, n) || ce(this.values, n)) &&
                (s[n] = e.get(n) + this.get(n));
        }
        return ue(this, { values: s }, !0);
    }

    minus(t) {
        if (!this.isValid) return this;
        const e = i.fromDurationLike(t);
        return this.plus(e.negate());
    }

    mapUnits(t) {
        if (!this.isValid) return this;
        const e = {};
        for (const s of Object.keys(this.values)) {
            e[s] = Qr(t(this.values[s], s));
        }
        return ue(this, { values: e }, !0);
    }

    get(t) {
        return this[i.normalizeUnit(t)];
    }

    set(t) {
        if (!this.isValid) return this;
        const e = { ...this.values, ...ni(t, i.normalizeUnit) };
        return ue(this, { values: e });
    }

    reconfigure({
        locale: t,
        numberingSystem: e,
        conversionAccuracy: s,
        matrix: n,
    } = {}) {
        const o = {
            loc: this.loc.clone({ locale: t, numberingSystem: e }),
            matrix: n,
            conversionAccuracy: s,
        };
        return ue(this, o);
    }

    as(t) {
        return this.isValid ? this.shiftTo(t).get(t) : NaN;
    }

    normalize() {
        if (!this.isValid) return this;
        const t = this.toObject();
        return uc(this.matrix, t), ue(this, { values: t }, !0);
    }

    rescale() {
        if (!this.isValid) return this;
        const t = Ym(this.normalize().shiftToAll().toObject());
        return ue(this, { values: t }, !0);
    }

    shiftTo(...t) {
        if (!this.isValid) return this;
        if (t.length === 0) return this;
        t = t.map((o) => i.normalizeUnit(o));
        const e = {};
        const s = {};
        const n = this.toObject();
        let r;
        for (const o of Te) {
            if (t.indexOf(o) >= 0) {
                r = o;
                let a = 0;
                for (const c in s) (a += this.matrix[c][o] * s[c]), (s[c] = 0);
                Et(n[o]) && (a += n[o]);
                const l = Math.trunc(a);
                (e[o] = l), (s[o] = (a * 1e3 - l * 1e3) / 1e3);
            } else Et(n[o]) && (s[o] = n[o]);
        }
        for (const o in s) {
            s[o] !== 0 && (e[r] += o === r ? s[o] : s[o] / this.matrix[r][o]);
        }
        return uc(this.matrix, e), ue(this, { values: e }, !0);
    }

    shiftToAll() {
        return this.isValid
            ? this.shiftTo(
                  "years",
                  "months",
                  "weeks",
                  "days",
                  "hours",
                  "minutes",
                  "seconds",
                  "milliseconds",
              )
            : this;
    }

    negate() {
        if (!this.isValid) return this;
        const t = {};
        for (const e of Object.keys(this.values)) {
            t[e] = this.values[e] === 0 ? 0 : -this.values[e];
        }
        return ue(this, { values: t }, !0);
    }

    get years() {
        return this.isValid ? this.values.years || 0 : NaN;
    }

    get quarters() {
        return this.isValid ? this.values.quarters || 0 : NaN;
    }

    get months() {
        return this.isValid ? this.values.months || 0 : NaN;
    }

    get weeks() {
        return this.isValid ? this.values.weeks || 0 : NaN;
    }

    get days() {
        return this.isValid ? this.values.days || 0 : NaN;
    }

    get hours() {
        return this.isValid ? this.values.hours || 0 : NaN;
    }

    get minutes() {
        return this.isValid ? this.values.minutes || 0 : NaN;
    }

    get seconds() {
        return this.isValid ? this.values.seconds || 0 : NaN;
    }

    get milliseconds() {
        return this.isValid ? this.values.milliseconds || 0 : NaN;
    }

    get isValid() {
        return this.invalid === null;
    }

    get invalidReason() {
        return this.invalid ? this.invalid.reason : null;
    }

    get invalidExplanation() {
        return this.invalid ? this.invalid.explanation : null;
    }

    equals(t) {
        if (!this.isValid || !t.isValid || !this.loc.equals(t.loc)) return !1;
        function e(s, n) {
            return s === void 0 || s === 0 ? n === void 0 || n === 0 : s === n;
        }
        for (const s of Te) if (!e(this.values[s], t.values[s])) return !1;
        return !0;
    }
};
const ui = "Invalid Interval";
function Zm(i, t) {
    return !i || !i.isValid
        ? Yt.invalid("missing or invalid start")
        : !t || !t.isValid
          ? Yt.invalid("missing or invalid end")
          : t < i
            ? Yt.invalid(
                  "end before start",
                  `The end of an interval must be after its start, but you had start=${i.toISO()} and end=${t.toISO()}`,
              )
            : null;
}
var Yt = class i {
    constructor(t) {
        (this.s = t.start),
            (this.e = t.end),
            (this.invalid = t.invalid || null),
            (this.isLuxonInterval = !0);
    }

    static invalid(t, e = null) {
        if (!t) throw new G("need to specify a reason the Interval is invalid");
        const s = t instanceof it ? t : new it(t, e);
        if (R.throwOnInvalid) throw new Js(s);
        return new i({ invalid: s });
    }

    static fromDateTimes(t, e) {
        const s = di(t);
        const n = di(e);
        const r = Zm(s, n);
        return r ?? new i({ start: s, end: n });
    }

    static after(t, e) {
        const s = Z.fromDurationLike(e);
        const n = di(t);
        return i.fromDateTimes(n, n.plus(s));
    }

    static before(t, e) {
        const s = Z.fromDurationLike(e);
        const n = di(t);
        return i.fromDateTimes(n.minus(s), n);
    }

    static fromISO(t, e) {
        const [s, n] = (t || "").split("/", 2);
        if (s && n) {
            let r, o;
            try {
                (r = I.fromISO(s, e)), (o = r.isValid);
            } catch {
                o = !1;
            }
            let a, l;
            try {
                (a = I.fromISO(n, e)), (l = a.isValid);
            } catch {
                l = !1;
            }
            if (o && l) return i.fromDateTimes(r, a);
            if (o) {
                const c = Z.fromISO(n, e);
                if (c.isValid) return i.after(r, c);
            } else if (l) {
                const c = Z.fromISO(s, e);
                if (c.isValid) return i.before(a, c);
            }
        }
        return i.invalid(
            "unparsable",
            `the input "${t}" can't be parsed as ISO 8601`,
        );
    }

    static isInterval(t) {
        return (t && t.isLuxonInterval) || !1;
    }

    get start() {
        return this.isValid ? this.s : null;
    }

    get end() {
        return this.isValid ? this.e : null;
    }

    get lastDateTime() {
        return this.isValid && this.e ? this.e.minus(1) : null;
    }

    get isValid() {
        return this.invalidReason === null;
    }

    get invalidReason() {
        return this.invalid ? this.invalid.reason : null;
    }

    get invalidExplanation() {
        return this.invalid ? this.invalid.explanation : null;
    }

    length(t = "milliseconds") {
        return this.isValid ? this.toDuration(t).get(t) : NaN;
    }

    count(t = "milliseconds", e) {
        if (!this.isValid) return NaN;
        const s = this.start.startOf(t, e);
        let n;
        return (
            e?.useLocaleWeeks
                ? (n = this.end.reconfigure({ locale: s.locale }))
                : (n = this.end),
            (n = n.startOf(t, e)),
            Math.floor(n.diff(s, t).get(t)) +
                (n.valueOf() !== this.end.valueOf())
        );
    }

    hasSame(t) {
        return this.isValid
            ? this.isEmpty() || this.e.minus(1).hasSame(this.s, t)
            : !1;
    }

    isEmpty() {
        return this.s.valueOf() === this.e.valueOf();
    }

    isAfter(t) {
        return this.isValid ? this.s > t : !1;
    }

    isBefore(t) {
        return this.isValid ? this.e <= t : !1;
    }

    contains(t) {
        return this.isValid ? this.s <= t && this.e > t : !1;
    }

    set({ start: t, end: e } = {}) {
        return this.isValid ? i.fromDateTimes(t || this.s, e || this.e) : this;
    }

    splitAt(...t) {
        if (!this.isValid) return [];
        const e = t
            .map(di)
            .filter((o) => this.contains(o))
            .sort((o, a) => o.toMillis() - a.toMillis());
        const s = [];
        let { s: n } = this;
        let r = 0;
        for (; n < this.e; ) {
            const o = e[r] || this.e;
            const a = +o > +this.e ? this.e : o;
            s.push(i.fromDateTimes(n, a)), (n = a), (r += 1);
        }
        return s;
    }

    splitBy(t) {
        const e = Z.fromDurationLike(t);
        if (!this.isValid || !e.isValid || e.as("milliseconds") === 0) {
            return [];
        }
        let { s } = this;
        let n = 1;
        let r;
        const o = [];
        for (; s < this.e; ) {
            const a = this.start.plus(e.mapUnits((l) => l * n));
            (r = +a > +this.e ? this.e : a),
                o.push(i.fromDateTimes(s, r)),
                (s = r),
                (n += 1);
        }
        return o;
    }

    divideEqually(t) {
        return this.isValid ? this.splitBy(this.length() / t).slice(0, t) : [];
    }

    overlaps(t) {
        return this.e > t.s && this.s < t.e;
    }

    abutsStart(t) {
        return this.isValid ? +this.e == +t.s : !1;
    }

    abutsEnd(t) {
        return this.isValid ? +t.e == +this.s : !1;
    }

    engulfs(t) {
        return this.isValid ? this.s <= t.s && this.e >= t.e : !1;
    }

    equals(t) {
        return !this.isValid || !t.isValid
            ? !1
            : this.s.equals(t.s) && this.e.equals(t.e);
    }

    intersection(t) {
        if (!this.isValid) return this;
        const e = this.s > t.s ? this.s : t.s;
        const s = this.e < t.e ? this.e : t.e;
        return e >= s ? null : i.fromDateTimes(e, s);
    }

    union(t) {
        if (!this.isValid) return this;
        const e = this.s < t.s ? this.s : t.s;
        const s = this.e > t.e ? this.e : t.e;
        return i.fromDateTimes(e, s);
    }

    static merge(t) {
        const [e, s] = t
            .sort((n, r) => n.s - r.s)
            .reduce(
                ([n, r], o) =>
                    r
                        ? r.overlaps(o) || r.abutsStart(o)
                            ? [n, r.union(o)]
                            : [n.concat([r]), o]
                        : [n, o],
                [[], null],
            );
        return s && e.push(s), e;
    }

    static xor(t) {
        let e = null;
        let s = 0;
        const n = [];
        const r = t.map((l) => [
            { time: l.s, type: "s" },
            { time: l.e, type: "e" },
        ]);
        const o = Array.prototype.concat(...r);
        const a = o.sort((l, c) => l.time - c.time);
        for (const l of a) {
            (s += l.type === "s" ? 1 : -1),
                s === 1
                    ? (e = l.time)
                    : (e && +e != +l.time && n.push(i.fromDateTimes(e, l.time)),
                      (e = null));
        }
        return i.merge(n);
    }

    difference(...t) {
        return i
            .xor([this].concat(t))
            .map((e) => this.intersection(e))
            .filter((e) => e && !e.isEmpty());
    }

    toString() {
        return this.isValid
            ? `[${this.s.toISO()} \u2013 ${this.e.toISO()})`
            : ui;
    }

    [Symbol.for("nodejs.util.inspect.custom")]() {
        return this.isValid
            ? `Interval { start: ${this.s.toISO()}, end: ${this.e.toISO()} }`
            : `Interval { Invalid, reason: ${this.invalidReason} }`;
    }

    toLocaleString(t = re, e = {}) {
        return this.isValid
            ? st.create(this.s.loc.clone(e), t).formatInterval(this)
            : ui;
    }

    toISO(t) {
        return this.isValid ? `${this.s.toISO(t)}/${this.e.toISO(t)}` : ui;
    }

    toISODate() {
        return this.isValid
            ? `${this.s.toISODate()}/${this.e.toISODate()}`
            : ui;
    }

    toISOTime(t) {
        return this.isValid
            ? `${this.s.toISOTime(t)}/${this.e.toISOTime(t)}`
            : ui;
    }

    toFormat(t, { separator: e = " \u2013 " } = {}) {
        return this.isValid
            ? `${this.s.toFormat(t)}${e}${this.e.toFormat(t)}`
            : ui;
    }

    toDuration(t, e) {
        return this.isValid
            ? this.e.diff(this.s, t, e)
            : Z.invalid(this.invalidReason);
    }

    mapEndpoints(t) {
        return i.fromDateTimes(t(this.s), t(this.e));
    }
};
const Zt = class {
    static hasDST(t = R.defaultZone) {
        const e = I.now().setZone(t).set({ month: 12 });
        return !t.isUniversal && e.offset !== e.set({ month: 6 }).offset;
    }

    static isValidIANAZone(t) {
        return at.isValidZone(t);
    }

    static normalizeZone(t) {
        return Dt(t, R.defaultZone);
    }

    static getStartOfWeek({ locale: t = null, locObj: e = null } = {}) {
        return (e || W.create(t)).getStartOfWeek();
    }

    static getMinimumDaysInFirstWeek({
        locale: t = null,
        locObj: e = null,
    } = {}) {
        return (e || W.create(t)).getMinDaysInFirstWeek();
    }

    static getWeekendWeekdays({ locale: t = null, locObj: e = null } = {}) {
        return (e || W.create(t)).getWeekendDays().slice();
    }

    static months(
        t = "long",
        {
            locale: e = null,
            numberingSystem: s = null,
            locObj: n = null,
            outputCalendar: r = "gregory",
        } = {},
    ) {
        return (n || W.create(e, s, r)).months(t);
    }

    static monthsFormat(
        t = "long",
        {
            locale: e = null,
            numberingSystem: s = null,
            locObj: n = null,
            outputCalendar: r = "gregory",
        } = {},
    ) {
        return (n || W.create(e, s, r)).months(t, !0);
    }

    static weekdays(
        t = "long",
        { locale: e = null, numberingSystem: s = null, locObj: n = null } = {},
    ) {
        return (n || W.create(e, s, null)).weekdays(t);
    }

    static weekdaysFormat(
        t = "long",
        { locale: e = null, numberingSystem: s = null, locObj: n = null } = {},
    ) {
        return (n || W.create(e, s, null)).weekdays(t, !0);
    }

    static meridiems({ locale: t = null } = {}) {
        return W.create(t).meridiems();
    }

    static eras(t = "short", { locale: e = null } = {}) {
        return W.create(e, null, "gregory").eras(t);
    }

    static features() {
        return { relative: nn(), localeWeek: rn() };
    }
};
function mc(i, t) {
    const e = (n) => n.toUTC(0, { keepLocalTime: !0 }).startOf("day").valueOf();
    const s = e(t) - e(i);
    return Math.floor(Z.fromMillis(s).as("days"));
}
function qm(i, t, e) {
    const s = [
        ["years", (l, c) => c.year - l.year],
        ["quarters", (l, c) => c.quarter - l.quarter + (c.year - l.year) * 4],
        ["months", (l, c) => c.month - l.month + (c.year - l.year) * 12],
        [
            "weeks",
            (l, c) => {
                const h = mc(l, c);
                return (h - (h % 7)) / 7;
            },
        ],
        ["days", mc],
    ];
    const n = {};
    const r = i;
    let o;
    let a;
    for (const [l, c] of s) {
        e.indexOf(l) >= 0 &&
            ((o = l),
            (n[l] = c(i, t)),
            (a = r.plus(n)),
            a > t
                ? (n[l]--,
                  (i = r.plus(n)),
                  i > t && ((a = i), n[l]--, (i = r.plus(n))))
                : (i = a));
    }
    return [i, n, a, o];
}
function gc(i, t, e, s) {
    let [n, r, o, a] = qm(i, t, e);
    const l = t - n;
    const c = e.filter(
        (u) => ["hours", "minutes", "seconds", "milliseconds"].indexOf(u) >= 0,
    );
    c.length === 0 &&
        (o < t && (o = n.plus({ [a]: 1 })),
        o !== n && (r[a] = (r[a] || 0) + l / (o - n)));
    const h = Z.fromObject(r, s);
    return c.length > 0
        ? Z.fromMillis(l, s)
              .shiftTo(...c)
              .plus(h)
        : h;
}
const Gm = "missing Intl.DateTimeFormat.formatToParts support";
function z(i, t = (e) => e) {
    return { regex: i, deser: ([e]) => t(vl(e)) };
}
const Xm = "\xA0";
const bc = `[ ${Xm}]`;
const xc = new RegExp(bc, "g");
function Km(i) {
    return i.replace(/\./g, "\\.?").replace(xc, bc);
}
function pc(i) {
    return i.replace(/\./g, "").replace(xc, " ").toLowerCase();
}
function It(i, t) {
    return i === null
        ? null
        : {
              regex: RegExp(i.map(Km).join("|")),
              deser: ([e]) => i.findIndex((s) => pc(e) === pc(s)) + t,
          };
}
function yc(i, t) {
    return { regex: i, deser: ([, e, s]) => Se(e, s), groups: t };
}
function cn(i) {
    return { regex: i, deser: ([t]) => t };
}
function Jm(i) {
    return i.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
}
function Qm(i, t) {
    const e = wt(t);
    const s = wt(t, "{2}");
    const n = wt(t, "{3}");
    const r = wt(t, "{4}");
    const o = wt(t, "{6}");
    const a = wt(t, "{1,2}");
    const l = wt(t, "{1,3}");
    const c = wt(t, "{1,6}");
    const h = wt(t, "{1,9}");
    const u = wt(t, "{2,4}");
    const d = wt(t, "{4,6}");
    const f = (p) => ({
        regex: RegExp(Jm(p.val)),
        deser: ([y]) => y,
        literal: !0,
    });
    const g = ((p) => {
        if (i.literal) return f(p);
        switch (p.val) {
            case "G":
                return It(t.eras("short"), 0);
            case "GG":
                return It(t.eras("long"), 0);
            case "y":
                return z(c);
            case "yy":
                return z(u, hs);
            case "yyyy":
                return z(r);
            case "yyyyy":
                return z(d);
            case "yyyyyy":
                return z(o);
            case "M":
                return z(a);
            case "MM":
                return z(s);
            case "MMM":
                return It(t.months("short", !0), 1);
            case "MMMM":
                return It(t.months("long", !0), 1);
            case "L":
                return z(a);
            case "LL":
                return z(s);
            case "LLL":
                return It(t.months("short", !1), 1);
            case "LLLL":
                return It(t.months("long", !1), 1);
            case "d":
                return z(a);
            case "dd":
                return z(s);
            case "o":
                return z(l);
            case "ooo":
                return z(n);
            case "HH":
                return z(s);
            case "H":
                return z(a);
            case "hh":
                return z(s);
            case "h":
                return z(a);
            case "mm":
                return z(s);
            case "m":
                return z(a);
            case "q":
                return z(a);
            case "qq":
                return z(s);
            case "s":
                return z(a);
            case "ss":
                return z(s);
            case "S":
                return z(l);
            case "SSS":
                return z(n);
            case "u":
                return cn(h);
            case "uu":
                return cn(a);
            case "uuu":
                return z(e);
            case "a":
                return It(t.meridiems(), 0);
            case "kkkk":
                return z(r);
            case "kk":
                return z(u, hs);
            case "W":
                return z(a);
            case "WW":
                return z(s);
            case "E":
            case "c":
                return z(e);
            case "EEE":
                return It(t.weekdays("short", !1), 1);
            case "EEEE":
                return It(t.weekdays("long", !1), 1);
            case "ccc":
                return It(t.weekdays("short", !0), 1);
            case "cccc":
                return It(t.weekdays("long", !0), 1);
            case "Z":
            case "ZZ":
                return yc(
                    new RegExp(`([+-]${a.source})(?::(${s.source}))?`),
                    2,
                );
            case "ZZZ":
                return yc(new RegExp(`([+-]${a.source})(${s.source})?`), 2);
            case "z":
                return cn(/[a-z_+-/]{1,256}?/i);
            case " ":
                return cn(/[^\S\n\r]/);
            default:
                return f(p);
        }
    })(i) || { invalidReason: Gm };
    return (g.token = i), g;
}
const tg = {
    year: { "2-digit": "yy", numeric: "yyyyy" },
    month: { numeric: "M", "2-digit": "MM", short: "MMM", long: "MMMM" },
    day: { numeric: "d", "2-digit": "dd" },
    weekday: { short: "EEE", long: "EEEE" },
    dayperiod: "a",
    dayPeriod: "a",
    hour12: { numeric: "h", "2-digit": "hh" },
    hour24: { numeric: "H", "2-digit": "HH" },
    minute: { numeric: "m", "2-digit": "mm" },
    second: { numeric: "s", "2-digit": "ss" },
    timeZoneName: { long: "ZZZZZ", short: "ZZZ" },
};
function eg(i, t, e) {
    const { type: s, value: n } = i;
    if (s === "literal") {
        const l = /^\s+$/.test(n);
        return { literal: !l, val: l ? " " : n };
    }
    const r = t[s];
    let o = s;
    s === "hour" &&
        (t.hour12 != null
            ? (o = t.hour12 ? "hour12" : "hour24")
            : t.hourCycle != null
              ? t.hourCycle === "h11" || t.hourCycle === "h12"
                  ? (o = "hour12")
                  : (o = "hour24")
              : (o = e.hour12 ? "hour12" : "hour24"));
    let a = tg[o];
    if ((typeof a === "object" && (a = a[r]), a)) {
        return { literal: !1, val: a };
    }
}
function ig(i) {
    return [
        `^${i.map((e) => e.regex).reduce((e, s) => `${e}(${s.source})`, "")}$`,
        i,
    ];
}
function sg(i, t, e) {
    const s = i.match(t);
    if (s) {
        const n = {};
        let r = 1;
        for (const o in e) {
            if (ce(e, o)) {
                const a = e[o];
                const l = a.groups ? a.groups + 1 : 1;
                !a.literal &&
                    a.token &&
                    (n[a.token.val[0]] = a.deser(s.slice(r, r + l))),
                    (r += l);
            }
        }
        return [s, n];
    } else return [s, {}];
}
function ng(i) {
    const t = (r) => {
        switch (r) {
            case "S":
                return "millisecond";
            case "s":
                return "second";
            case "m":
                return "minute";
            case "h":
            case "H":
                return "hour";
            case "d":
                return "day";
            case "o":
                return "ordinal";
            case "L":
            case "M":
                return "month";
            case "y":
                return "year";
            case "E":
            case "c":
                return "weekday";
            case "W":
                return "weekNumber";
            case "k":
                return "weekYear";
            case "q":
                return "quarter";
            default:
                return null;
        }
    };
    let e = null;
    let s;
    return (
        O(i.z) || (e = at.create(i.z)),
        O(i.Z) || (e || (e = new et(i.Z)), (s = i.Z)),
        O(i.q) || (i.M = (i.q - 1) * 3 + 1),
        O(i.h) ||
            (i.h < 12 && i.a === 1
                ? (i.h += 12)
                : i.h === 12 && i.a === 0 && (i.h = 0)),
        i.G === 0 && i.y && (i.y = -i.y),
        O(i.u) || (i.S = cs(i.u)),
        [
            Object.keys(i).reduce((r, o) => {
                const a = t(o);
                return a && (r[a] = i[o]), r;
            }, {}),
            e,
            s,
        ]
    );
}
let oo = null;
function rg() {
    return oo || (oo = I.fromMillis(1555555555555)), oo;
}
function og(i, t) {
    if (i.literal) return i;
    const e = st.macroTokenToFormatOpts(i.val);
    const s = co(e, t);
    return s == null || s.includes(void 0) ? i : s;
}
function ao(i, t) {
    return Array.prototype.concat(...i.map((e) => og(e, t)));
}
const fs = class {
    constructor(t, e) {
        if (
            ((this.locale = t),
            (this.format = e),
            (this.tokens = ao(st.parseFormat(e), t)),
            (this.units = this.tokens.map((s) => Qm(s, t))),
            (this.disqualifyingUnit = this.units.find((s) => s.invalidReason)),
            !this.disqualifyingUnit)
        ) {
            const [s, n] = ig(this.units);
            (this.regex = RegExp(s, "i")), (this.handlers = n);
        }
    }

    explainFromTokens(t) {
        if (this.isValid) {
            const [e, s] = sg(t, this.regex, this.handlers);
            const [n, r, o] = s ? ng(s) : [null, null, void 0];
            if (ce(s, "a") && ce(s, "H")) {
                throw new Tt(
                    "Can't include meridiem when specifying 24-hour format",
                );
            }
            return {
                input: t,
                tokens: this.tokens,
                regex: this.regex,
                rawMatches: e,
                matches: s,
                result: n,
                zone: r,
                specificOffset: o,
            };
        } else {
            return {
                input: t,
                tokens: this.tokens,
                invalidReason: this.invalidReason,
            };
        }
    }

    get isValid() {
        return !this.disqualifyingUnit;
    }

    get invalidReason() {
        return this.disqualifyingUnit
            ? this.disqualifyingUnit.invalidReason
            : null;
    }
};
function lo(i, t, e) {
    return new fs(i, e).explainFromTokens(t);
}
function _c(i, t, e) {
    const {
        result: s,
        zone: n,
        specificOffset: r,
        invalidReason: o,
    } = lo(i, t, e);
    return [s, n, r, o];
}
function co(i, t) {
    if (!i) return null;
    const s = st.create(t, i).dtFormatter(rg());
    const n = s.formatToParts();
    const r = s.resolvedOptions();
    return n.map((o) => eg(o, i, r));
}
const ho = "Invalid DateTime";
const wc = 864e13;
function ms(i) {
    return new it("unsupported zone", `the zone "${i.name}" is not supported`);
}
function uo(i) {
    return i.weekData === null && (i.weekData = os(i.c)), i.weekData;
}
function fo(i) {
    return (
        i.localWeekData === null &&
            (i.localWeekData = os(
                i.c,
                i.loc.getMinDaysInFirstWeek(),
                i.loc.getStartOfWeek(),
            )),
        i.localWeekData
    );
}
function ve(i, t) {
    const e = {
        ts: i.ts,
        zone: i.zone,
        c: i.c,
        o: i.o,
        loc: i.loc,
        invalid: i.invalid,
    };
    return new I({ ...e, ...t, old: e });
}
function Dc(i, t, e) {
    let s = i - t * 60 * 1e3;
    const n = e.offset(s);
    if (t === n) return [s, t];
    s -= (n - t) * 60 * 1e3;
    const r = e.offset(s);
    return n === r ? [s, n] : [i - Math.min(n, r) * 60 * 1e3, Math.max(n, r)];
}
function hn(i, t) {
    i += t * 60 * 1e3;
    const e = new Date(i);
    return {
        year: e.getUTCFullYear(),
        month: e.getUTCMonth() + 1,
        day: e.getUTCDate(),
        hour: e.getUTCHours(),
        minute: e.getUTCMinutes(),
        second: e.getUTCSeconds(),
        millisecond: e.getUTCMilliseconds(),
    };
}
function dn(i, t, e) {
    return Dc(ti(i), t, e);
}
function Sc(i, t) {
    const e = i.o;
    const s = i.c.year + Math.trunc(t.years);
    const n = i.c.month + Math.trunc(t.months) + Math.trunc(t.quarters) * 3;
    const r = {
        ...i.c,
        year: s,
        month: n,
        day:
            Math.min(i.c.day, si(s, n)) +
            Math.trunc(t.days) +
            Math.trunc(t.weeks) * 7,
    };
    const o = Z.fromObject({
        years: t.years - Math.trunc(t.years),
        quarters: t.quarters - Math.trunc(t.quarters),
        months: t.months - Math.trunc(t.months),
        weeks: t.weeks - Math.trunc(t.weeks),
        days: t.days - Math.trunc(t.days),
        hours: t.hours,
        minutes: t.minutes,
        seconds: t.seconds,
        milliseconds: t.milliseconds,
    }).as("milliseconds");
    const a = ti(r);
    let [l, c] = Dc(a, e, i.zone);
    return o !== 0 && ((l += o), (c = i.zone.offset(l))), { ts: l, o: c };
}
function fi(i, t, e, s, n, r) {
    const { setZone: o, zone: a } = e;
    if ((i && Object.keys(i).length !== 0) || t) {
        const l = t || a;
        const c = I.fromObject(i, { ...e, zone: l, specificOffset: r });
        return o ? c : c.setZone(a);
    } else {
        return I.invalid(
            new it("unparsable", `the input "${n}" can't be parsed as ${s}`),
        );
    }
}
function un(i, t, e = !0) {
    return i.isValid
        ? st
              .create(W.create("en-US"), { allowZ: e, forceSimple: !0 })
              .formatDateTimeFromString(i, t)
        : null;
}
function mo(i, t) {
    const e = i.c.year > 9999 || i.c.year < 0;
    let s = "";
    return (
        e && i.c.year >= 0 && (s += "+"),
        (s += Y(i.c.year, e ? 6 : 4)),
        t
            ? ((s += "-"), (s += Y(i.c.month)), (s += "-"), (s += Y(i.c.day)))
            : ((s += Y(i.c.month)), (s += Y(i.c.day))),
        s
    );
}
function kc(i, t, e, s, n, r) {
    let o = Y(i.c.hour);
    return (
        t
            ? ((o += ":"),
              (o += Y(i.c.minute)),
              (i.c.millisecond !== 0 || i.c.second !== 0 || !e) && (o += ":"))
            : (o += Y(i.c.minute)),
        (i.c.millisecond !== 0 || i.c.second !== 0 || !e) &&
            ((o += Y(i.c.second)),
            (i.c.millisecond !== 0 || !s) &&
                ((o += "."), (o += Y(i.c.millisecond, 3)))),
        n &&
            (i.isOffsetFixed && i.offset === 0 && !r
                ? (o += "Z")
                : i.o < 0
                  ? ((o += "-"),
                    (o += Y(Math.trunc(-i.o / 60))),
                    (o += ":"),
                    (o += Y(Math.trunc(-i.o % 60))))
                  : ((o += "+"),
                    (o += Y(Math.trunc(i.o / 60))),
                    (o += ":"),
                    (o += Y(Math.trunc(i.o % 60))))),
        r && (o += "[" + i.zone.ianaName + "]"),
        o
    );
}
const Ec = { month: 1, day: 1, hour: 0, minute: 0, second: 0, millisecond: 0 };
const ag = {
    weekNumber: 1,
    weekday: 1,
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
};
const lg = { ordinal: 1, hour: 0, minute: 0, second: 0, millisecond: 0 };
const Ic = ["year", "month", "day", "hour", "minute", "second", "millisecond"];
const cg = [
    "weekYear",
    "weekNumber",
    "weekday",
    "hour",
    "minute",
    "second",
    "millisecond",
];
const hg = ["year", "ordinal", "hour", "minute", "second", "millisecond"];
function ug(i) {
    const t = {
        year: "year",
        years: "year",
        month: "month",
        months: "month",
        day: "day",
        days: "day",
        hour: "hour",
        hours: "hour",
        minute: "minute",
        minutes: "minute",
        quarter: "quarter",
        quarters: "quarter",
        second: "second",
        seconds: "second",
        millisecond: "millisecond",
        milliseconds: "millisecond",
        weekday: "weekday",
        weekdays: "weekday",
        weeknumber: "weekNumber",
        weeksnumber: "weekNumber",
        weeknumbers: "weekNumber",
        weekyear: "weekYear",
        weekyears: "weekYear",
        ordinal: "ordinal",
    }[i.toLowerCase()];
    if (!t) throw new Qe(i);
    return t;
}
function Mc(i) {
    switch (i.toLowerCase()) {
        case "localweekday":
        case "localweekdays":
            return "localWeekday";
        case "localweeknumber":
        case "localweeknumbers":
            return "localWeekNumber";
        case "localweekyear":
        case "localweekyears":
            return "localWeekYear";
        default:
            return ug(i);
    }
}
function dg(i) {
    if ((gs === void 0 && (gs = R.now()), i.type !== "iana")) {
        return i.offset(gs);
    }
    const t = i.name;
    let e = go.get(t);
    return e === void 0 && ((e = i.offset(gs)), go.set(t, e)), e;
}
function Tc(i, t) {
    const e = Dt(t.zone, R.defaultZone);
    if (!e.isValid) return I.invalid(ms(e));
    const s = W.fromObject(t);
    let n;
    let r;
    if (O(i.year)) n = R.now();
    else {
        for (const l of Ic) O(i[l]) && (i[l] = Ec[l]);
        const o = Xr(i) || Kr(i);
        if (o) return I.invalid(o);
        const a = dg(e);
        [n, r] = dn(i, a, e);
    }
    return new I({ ts: n, zone: e, loc: s, o: r });
}
function vc(i, t, e) {
    const s = O(e.round) ? !0 : e.round;
    const n = (o, a) => (
        (o = ei(o, s || e.calendary ? 0 : 2, !0)),
        t.loc.clone(e).relFormatter(e).format(o, a)
    );
    const r = (o) =>
        e.calendary
            ? t.hasSame(i, o)
                ? 0
                : t.startOf(o).diff(i.startOf(o), o).get(o)
            : t.diff(i, o).get(o);
    if (e.unit) return n(r(e.unit), e.unit);
    for (const o of e.units) {
        const a = r(o);
        if (Math.abs(a) >= 1) return n(a, o);
    }
    return n(i > t ? -0 : 0, e.units[e.units.length - 1]);
}
function Oc(i) {
    let t = {};
    let e;
    return (
        i.length > 0 && typeof i[i.length - 1] === "object"
            ? ((t = i[i.length - 1]),
              (e = Array.from(i).slice(0, i.length - 1)))
            : (e = Array.from(i)),
        [t, e]
    );
}
let gs;
var go = new Map();
var I = class i {
    constructor(t) {
        const e = t.zone || R.defaultZone;
        let s =
            t.invalid ||
            (Number.isNaN(t.ts) ? new it("invalid input") : null) ||
            (e.isValid ? null : ms(e));
        this.ts = O(t.ts) ? R.now() : t.ts;
        let n = null;
        let r = null;
        if (!s) {
            if (t.old && t.old.ts === this.ts && t.old.zone.equals(e)) {
                [n, r] = [t.old.c, t.old.o];
            } else {
                const a = Et(t.o) && !t.old ? t.o : e.offset(this.ts);
                (n = hn(this.ts, a)),
                    (s = Number.isNaN(n.year) ? new it("invalid input") : null),
                    (n = s ? null : n),
                    (r = s ? null : a);
            }
        }
        (this._zone = e),
            (this.loc = t.loc || W.create()),
            (this.invalid = s),
            (this.weekData = null),
            (this.localWeekData = null),
            (this.c = n),
            (this.o = r),
            (this.isLuxonDateTime = !0);
    }

    static now() {
        return new i({});
    }

    static local() {
        const [t, e] = Oc(arguments);
        const [s, n, r, o, a, l, c] = e;
        return Tc(
            {
                year: s,
                month: n,
                day: r,
                hour: o,
                minute: a,
                second: l,
                millisecond: c,
            },
            t,
        );
    }

    static utc() {
        const [t, e] = Oc(arguments);
        const [s, n, r, o, a, l, c] = e;
        return (
            (t.zone = et.utcInstance),
            Tc(
                {
                    year: s,
                    month: n,
                    day: r,
                    hour: o,
                    minute: a,
                    second: l,
                    millisecond: c,
                },
                t,
            )
        );
    }

    static fromJSDate(t, e = {}) {
        const s = $l(t) ? t.valueOf() : NaN;
        if (Number.isNaN(s)) return i.invalid("invalid input");
        const n = Dt(e.zone, R.defaultZone);
        return n.isValid
            ? new i({ ts: s, zone: n, loc: W.fromObject(e) })
            : i.invalid(ms(n));
    }

    static fromMillis(t, e = {}) {
        if (Et(t)) {
            return t < -wc || t > wc
                ? i.invalid("Timestamp out of range")
                : new i({
                      ts: t,
                      zone: Dt(e.zone, R.defaultZone),
                      loc: W.fromObject(e),
                  });
        }
        throw new G(
            `fromMillis requires a numerical input, but received a ${typeof t} with value ${t}`,
        );
    }

    static fromSeconds(t, e = {}) {
        if (Et(t)) {
            return new i({
                ts: t * 1e3,
                zone: Dt(e.zone, R.defaultZone),
                loc: W.fromObject(e),
            });
        }
        throw new G("fromSeconds requires a numerical input");
    }

    static fromObject(t, e = {}) {
        t = t || {};
        const s = Dt(e.zone, R.defaultZone);
        if (!s.isValid) return i.invalid(ms(s));
        const n = W.fromObject(e);
        const r = ni(t, Mc);
        const { minDaysInFirstWeek: o, startOfWeek: a } = Gr(r, n);
        const l = R.now();
        const c = O(e.specificOffset) ? s.offset(l) : e.specificOffset;
        const h = !O(r.ordinal);
        const u = !O(r.year);
        const d = !O(r.month) || !O(r.day);
        const f = u || d;
        const m = r.weekYear || r.weekNumber;
        if ((f || h) && m) {
            throw new Tt(
                "Can't mix weekYear/weekNumber units with year/month/day or ordinals",
            );
        }
        if (d && h) throw new Tt("Can't mix ordinal dates with month/day");
        const g = m || (r.weekday && !f);
        let p;
        let y;
        let b = hn(l, c);
        g
            ? ((p = cg), (y = ag), (b = os(b, o, a)))
            : h
              ? ((p = hg), (y = lg), (b = ln(b)))
              : ((p = Ic), (y = Ec));
        let _ = !1;
        for (const C of p) {
            const N = r[C];
            O(N) ? (_ ? (r[C] = y[C]) : (r[C] = b[C])) : (_ = !0);
        }
        const w = g ? Vl(r, o, a) : h ? Hl(r) : Xr(r);
        const x = w || Kr(r);
        if (x) return i.invalid(x);
        const S = g ? Zr(r, o, a) : h ? qr(r) : r;
        const [k, v] = dn(S, c, s);
        const T = new i({ ts: k, zone: s, o: v, loc: n });
        return r.weekday && f && t.weekday !== T.weekday
            ? i.invalid(
                  "mismatched weekday",
                  `you can't specify both a weekday of ${r.weekday} and a date of ${T.toISO()}`,
              )
            : T.isValid
              ? T
              : i.invalid(T.invalid);
    }

    static fromISO(t, e = {}) {
        const [s, n] = nc(t);
        return fi(s, n, e, "ISO 8601", t);
    }

    static fromRFC2822(t, e = {}) {
        const [s, n] = rc(t);
        return fi(s, n, e, "RFC 2822", t);
    }

    static fromHTTP(t, e = {}) {
        const [s, n] = oc(t);
        return fi(s, n, e, "HTTP", e);
    }

    static fromFormat(t, e, s = {}) {
        if (O(t) || O(e)) {
            throw new G("fromFormat requires an input string and a format");
        }
        const { locale: n = null, numberingSystem: r = null } = s;
        const o = W.fromOpts({
            locale: n,
            numberingSystem: r,
            defaultToEN: !0,
        });
        const [a, l, c, h] = _c(o, t, e);
        return h ? i.invalid(h) : fi(a, l, s, `format ${e}`, t, c);
    }

    static fromString(t, e, s = {}) {
        return i.fromFormat(t, e, s);
    }

    static fromSQL(t, e = {}) {
        const [s, n] = cc(t);
        return fi(s, n, e, "SQL", t);
    }

    static invalid(t, e = null) {
        if (!t) throw new G("need to specify a reason the DateTime is invalid");
        const s = t instanceof it ? t : new it(t, e);
        if (R.throwOnInvalid) throw new Ks(s);
        return new i({ invalid: s });
    }

    static isDateTime(t) {
        return (t && t.isLuxonDateTime) || !1;
    }

    static parseFormatForOpts(t, e = {}) {
        const s = co(t, W.fromObject(e));
        return s ? s.map((n) => (n ? n.val : null)).join("") : null;
    }

    static expandFormat(t, e = {}) {
        return ao(st.parseFormat(t), W.fromObject(e))
            .map((n) => n.val)
            .join("");
    }

    static resetCache() {
        (gs = void 0), go.clear();
    }

    get(t) {
        return this[t];
    }

    get isValid() {
        return this.invalid === null;
    }

    get invalidReason() {
        return this.invalid ? this.invalid.reason : null;
    }

    get invalidExplanation() {
        return this.invalid ? this.invalid.explanation : null;
    }

    get locale() {
        return this.isValid ? this.loc.locale : null;
    }

    get numberingSystem() {
        return this.isValid ? this.loc.numberingSystem : null;
    }

    get outputCalendar() {
        return this.isValid ? this.loc.outputCalendar : null;
    }

    get zone() {
        return this._zone;
    }

    get zoneName() {
        return this.isValid ? this.zone.name : null;
    }

    get year() {
        return this.isValid ? this.c.year : NaN;
    }

    get quarter() {
        return this.isValid ? Math.ceil(this.c.month / 3) : NaN;
    }

    get month() {
        return this.isValid ? this.c.month : NaN;
    }

    get day() {
        return this.isValid ? this.c.day : NaN;
    }

    get hour() {
        return this.isValid ? this.c.hour : NaN;
    }

    get minute() {
        return this.isValid ? this.c.minute : NaN;
    }

    get second() {
        return this.isValid ? this.c.second : NaN;
    }

    get millisecond() {
        return this.isValid ? this.c.millisecond : NaN;
    }

    get weekYear() {
        return this.isValid ? uo(this).weekYear : NaN;
    }

    get weekNumber() {
        return this.isValid ? uo(this).weekNumber : NaN;
    }

    get weekday() {
        return this.isValid ? uo(this).weekday : NaN;
    }

    get isWeekend() {
        return this.isValid && this.loc.getWeekendDays().includes(this.weekday);
    }

    get localWeekday() {
        return this.isValid ? fo(this).weekday : NaN;
    }

    get localWeekNumber() {
        return this.isValid ? fo(this).weekNumber : NaN;
    }

    get localWeekYear() {
        return this.isValid ? fo(this).weekYear : NaN;
    }

    get ordinal() {
        return this.isValid ? ln(this.c).ordinal : NaN;
    }

    get monthShort() {
        return this.isValid
            ? Zt.months("short", { locObj: this.loc })[this.month - 1]
            : null;
    }

    get monthLong() {
        return this.isValid
            ? Zt.months("long", { locObj: this.loc })[this.month - 1]
            : null;
    }

    get weekdayShort() {
        return this.isValid
            ? Zt.weekdays("short", { locObj: this.loc })[this.weekday - 1]
            : null;
    }

    get weekdayLong() {
        return this.isValid
            ? Zt.weekdays("long", { locObj: this.loc })[this.weekday - 1]
            : null;
    }

    get offset() {
        return this.isValid ? +this.o : NaN;
    }

    get offsetNameShort() {
        return this.isValid
            ? this.zone.offsetName(this.ts, {
                  format: "short",
                  locale: this.locale,
              })
            : null;
    }

    get offsetNameLong() {
        return this.isValid
            ? this.zone.offsetName(this.ts, {
                  format: "long",
                  locale: this.locale,
              })
            : null;
    }

    get isOffsetFixed() {
        return this.isValid ? this.zone.isUniversal : null;
    }

    get isInDST() {
        return this.isOffsetFixed
            ? !1
            : this.offset > this.set({ month: 1, day: 1 }).offset ||
                  this.offset > this.set({ month: 5 }).offset;
    }

    getPossibleOffsets() {
        if (!this.isValid || this.isOffsetFixed) return [this];
        const t = 864e5;
        const e = 6e4;
        const s = ti(this.c);
        const n = this.zone.offset(s - t);
        const r = this.zone.offset(s + t);
        const o = this.zone.offset(s - n * e);
        const a = this.zone.offset(s - r * e);
        if (o === a) return [this];
        const l = s - o * e;
        const c = s - a * e;
        const h = hn(l, o);
        const u = hn(c, a);
        return h.hour === u.hour &&
            h.minute === u.minute &&
            h.second === u.second &&
            h.millisecond === u.millisecond
            ? [ve(this, { ts: l }), ve(this, { ts: c })]
            : [this];
    }

    get isInLeapYear() {
        return Me(this.year);
    }

    get daysInMonth() {
        return si(this.year, this.month);
    }

    get daysInYear() {
        return this.isValid ? le(this.year) : NaN;
    }

    get weeksInWeekYear() {
        return this.isValid ? ke(this.weekYear) : NaN;
    }

    get weeksInLocalWeekYear() {
        return this.isValid
            ? ke(
                  this.localWeekYear,
                  this.loc.getMinDaysInFirstWeek(),
                  this.loc.getStartOfWeek(),
              )
            : NaN;
    }

    resolvedLocaleOptions(t = {}) {
        const {
            locale: e,
            numberingSystem: s,
            calendar: n,
        } = st.create(this.loc.clone(t), t).resolvedOptions(this);
        return { locale: e, numberingSystem: s, outputCalendar: n };
    }

    toUTC(t = 0, e = {}) {
        return this.setZone(et.instance(t), e);
    }

    toLocal() {
        return this.setZone(R.defaultZone);
    }

    setZone(t, { keepLocalTime: e = !1, keepCalendarTime: s = !1 } = {}) {
        if (((t = Dt(t, R.defaultZone)), t.equals(this.zone))) return this;
        if (t.isValid) {
            let n = this.ts;
            if (e || s) {
                const r = t.offset(this.ts);
                const o = this.toObject();
                [n] = dn(o, r, t);
            }
            return ve(this, { ts: n, zone: t });
        } else return i.invalid(ms(t));
    }

    reconfigure({ locale: t, numberingSystem: e, outputCalendar: s } = {}) {
        const n = this.loc.clone({
            locale: t,
            numberingSystem: e,
            outputCalendar: s,
        });
        return ve(this, { loc: n });
    }

    setLocale(t) {
        return this.reconfigure({ locale: t });
    }

    set(t) {
        if (!this.isValid) return this;
        const e = ni(t, Mc);
        const { minDaysInFirstWeek: s, startOfWeek: n } = Gr(e, this.loc);
        const r = !O(e.weekYear) || !O(e.weekNumber) || !O(e.weekday);
        const o = !O(e.ordinal);
        const a = !O(e.year);
        const l = !O(e.month) || !O(e.day);
        const c = a || l;
        const h = e.weekYear || e.weekNumber;
        if ((c || o) && h) {
            throw new Tt(
                "Can't mix weekYear/weekNumber units with year/month/day or ordinals",
            );
        }
        if (l && o) throw new Tt("Can't mix ordinal dates with month/day");
        let u;
        r
            ? (u = Zr({ ...os(this.c, s, n), ...e }, s, n))
            : O(e.ordinal)
              ? ((u = { ...this.toObject(), ...e }),
                O(e.day) && (u.day = Math.min(si(u.year, u.month), u.day)))
              : (u = qr({ ...ln(this.c), ...e }));
        const [d, f] = dn(u, this.o, this.zone);
        return ve(this, { ts: d, o: f });
    }

    plus(t) {
        if (!this.isValid) return this;
        const e = Z.fromDurationLike(t);
        return ve(this, Sc(this, e));
    }

    minus(t) {
        if (!this.isValid) return this;
        const e = Z.fromDurationLike(t).negate();
        return ve(this, Sc(this, e));
    }

    startOf(t, { useLocaleWeeks: e = !1 } = {}) {
        if (!this.isValid) return this;
        const s = {};
        const n = Z.normalizeUnit(t);
        switch (n) {
            case "years":
                s.month = 1;
            case "quarters":
            case "months":
                s.day = 1;
            case "weeks":
            case "days":
                s.hour = 0;
            case "hours":
                s.minute = 0;
            case "minutes":
                s.second = 0;
            case "seconds":
                s.millisecond = 0;
                break;
            case "milliseconds":
                break;
        }
        if (n === "weeks") {
            if (e) {
                const r = this.loc.getStartOfWeek();
                const { weekday: o } = this;
                o < r && (s.weekNumber = this.weekNumber - 1), (s.weekday = r);
            } else s.weekday = 1;
        }
        if (n === "quarters") {
            const r = Math.ceil(this.month / 3);
            s.month = (r - 1) * 3 + 1;
        }
        return this.set(s);
    }

    endOf(t, e) {
        return this.isValid
            ? this.plus({ [t]: 1 })
                  .startOf(t, e)
                  .minus(1)
            : this;
    }

    toFormat(t, e = {}) {
        return this.isValid
            ? st
                  .create(this.loc.redefaultToEN(e))
                  .formatDateTimeFromString(this, t)
            : ho;
    }

    toLocaleString(t = re, e = {}) {
        return this.isValid
            ? st.create(this.loc.clone(e), t).formatDateTime(this)
            : ho;
    }

    toLocaleParts(t = {}) {
        return this.isValid
            ? st.create(this.loc.clone(t), t).formatDateTimeParts(this)
            : [];
    }

    toISO({
        format: t = "extended",
        suppressSeconds: e = !1,
        suppressMilliseconds: s = !1,
        includeOffset: n = !0,
        extendedZone: r = !1,
    } = {}) {
        if (!this.isValid) return null;
        const o = t === "extended";
        let a = mo(this, o);
        return (a += "T"), (a += kc(this, o, e, s, n, r)), a;
    }

    toISODate({ format: t = "extended" } = {}) {
        return this.isValid ? mo(this, t === "extended") : null;
    }

    toISOWeekDate() {
        return un(this, "kkkk-'W'WW-c");
    }

    toISOTime({
        suppressMilliseconds: t = !1,
        suppressSeconds: e = !1,
        includeOffset: s = !0,
        includePrefix: n = !1,
        extendedZone: r = !1,
        format: o = "extended",
    } = {}) {
        return this.isValid
            ? (n ? "T" : "") + kc(this, o === "extended", e, t, s, r)
            : null;
    }

    toRFC2822() {
        return un(this, "EEE, dd LLL yyyy HH:mm:ss ZZZ", !1);
    }

    toHTTP() {
        return un(this.toUTC(), "EEE, dd LLL yyyy HH:mm:ss 'GMT'");
    }

    toSQLDate() {
        return this.isValid ? mo(this, !0) : null;
    }

    toSQLTime({
        includeOffset: t = !0,
        includeZone: e = !1,
        includeOffsetSpace: s = !0,
    } = {}) {
        let n = "HH:mm:ss.SSS";
        return (
            (e || t) && (s && (n += " "), e ? (n += "z") : t && (n += "ZZ")),
            un(this, n, !0)
        );
    }

    toSQL(t = {}) {
        return this.isValid ? `${this.toSQLDate()} ${this.toSQLTime(t)}` : null;
    }

    toString() {
        return this.isValid ? this.toISO() : ho;
    }

    [Symbol.for("nodejs.util.inspect.custom")]() {
        return this.isValid
            ? `DateTime { ts: ${this.toISO()}, zone: ${this.zone.name}, locale: ${this.locale} }`
            : `DateTime { Invalid, reason: ${this.invalidReason} }`;
    }

    valueOf() {
        return this.toMillis();
    }

    toMillis() {
        return this.isValid ? this.ts : NaN;
    }

    toSeconds() {
        return this.isValid ? this.ts / 1e3 : NaN;
    }

    toUnixInteger() {
        return this.isValid ? Math.floor(this.ts / 1e3) : NaN;
    }

    toJSON() {
        return this.toISO();
    }

    toBSON() {
        return this.toJSDate();
    }

    toObject(t = {}) {
        if (!this.isValid) return {};
        const e = { ...this.c };
        return (
            t.includeConfig &&
                ((e.outputCalendar = this.outputCalendar),
                (e.numberingSystem = this.loc.numberingSystem),
                (e.locale = this.loc.locale)),
            e
        );
    }

    toJSDate() {
        return new Date(this.isValid ? this.ts : NaN);
    }

    diff(t, e = "milliseconds", s = {}) {
        if (!this.isValid || !t.isValid) {
            return Z.invalid("created by diffing an invalid DateTime");
        }
        const n = {
            locale: this.locale,
            numberingSystem: this.numberingSystem,
            ...s,
        };
        const r = jl(e).map(Z.normalizeUnit);
        const o = t.valueOf() > this.valueOf();
        const a = o ? this : t;
        const l = o ? t : this;
        const c = gc(a, l, r, n);
        return o ? c.negate() : c;
    }

    diffNow(t = "milliseconds", e = {}) {
        return this.diff(i.now(), t, e);
    }

    until(t) {
        return this.isValid ? Yt.fromDateTimes(this, t) : this;
    }

    hasSame(t, e, s) {
        if (!this.isValid) return !1;
        const n = t.valueOf();
        const r = this.setZone(t.zone, { keepLocalTime: !0 });
        return r.startOf(e, s) <= n && n <= r.endOf(e, s);
    }

    equals(t) {
        return (
            this.isValid &&
            t.isValid &&
            this.valueOf() === t.valueOf() &&
            this.zone.equals(t.zone) &&
            this.loc.equals(t.loc)
        );
    }

    toRelative(t = {}) {
        if (!this.isValid) return null;
        const e = t.base || i.fromObject({}, { zone: this.zone });
        const s = t.padding ? (this < e ? -t.padding : t.padding) : 0;
        let n = ["years", "months", "days", "hours", "minutes", "seconds"];
        let r = t.unit;
        return (
            Array.isArray(t.unit) && ((n = t.unit), (r = void 0)),
            vc(e, this.plus(s), { ...t, numeric: "always", units: n, unit: r })
        );
    }

    toRelativeCalendar(t = {}) {
        return this.isValid
            ? vc(t.base || i.fromObject({}, { zone: this.zone }), this, {
                  ...t,
                  numeric: "auto",
                  units: ["years", "months", "days"],
                  calendary: !0,
              })
            : null;
    }

    static min(...t) {
        if (!t.every(i.isDateTime)) {
            throw new G("min requires all arguments be DateTimes");
        }
        return Jr(t, (e) => e.valueOf(), Math.min);
    }

    static max(...t) {
        if (!t.every(i.isDateTime)) {
            throw new G("max requires all arguments be DateTimes");
        }
        return Jr(t, (e) => e.valueOf(), Math.max);
    }

    static fromFormatExplain(t, e, s = {}) {
        const { locale: n = null, numberingSystem: r = null } = s;
        const o = W.fromOpts({
            locale: n,
            numberingSystem: r,
            defaultToEN: !0,
        });
        return lo(o, t, e);
    }

    static fromStringExplain(t, e, s = {}) {
        return i.fromFormatExplain(t, e, s);
    }

    static buildFormatParser(t, e = {}) {
        const { locale: s = null, numberingSystem: n = null } = e;
        const r = W.fromOpts({
            locale: s,
            numberingSystem: n,
            defaultToEN: !0,
        });
        return new fs(r, t);
    }

    static fromFormatParser(t, e, s = {}) {
        if (O(t) || O(e)) {
            throw new G(
                "fromFormatParser requires an input string and a format parser",
            );
        }
        const { locale: n = null, numberingSystem: r = null } = s;
        const o = W.fromOpts({
            locale: n,
            numberingSystem: r,
            defaultToEN: !0,
        });
        if (!o.equals(e.locale)) {
            throw new G(
                `fromFormatParser called with a locale of ${o}, but the format parser was created for ${e.locale}`,
            );
        }
        const {
            result: a,
            zone: l,
            specificOffset: c,
            invalidReason: h,
        } = e.explainFromTokens(t);
        return h ? i.invalid(h) : fi(a, l, s, `format ${e.format}`, t, c);
    }

    static get DATE_SHORT() {
        return re;
    }

    static get DATE_MED() {
        return zi;
    }

    static get DATE_MED_WITH_WEEKDAY() {
        return Tr;
    }

    static get DATE_FULL() {
        return Vi;
    }

    static get DATE_HUGE() {
        return Hi;
    }

    static get TIME_SIMPLE() {
        return Bi;
    }

    static get TIME_WITH_SECONDS() {
        return $i;
    }

    static get TIME_WITH_SHORT_OFFSET() {
        return ji;
    }

    static get TIME_WITH_LONG_OFFSET() {
        return Ui;
    }

    static get TIME_24_SIMPLE() {
        return Yi;
    }

    static get TIME_24_WITH_SECONDS() {
        return Zi;
    }

    static get TIME_24_WITH_SHORT_OFFSET() {
        return qi;
    }

    static get TIME_24_WITH_LONG_OFFSET() {
        return Gi;
    }

    static get DATETIME_SHORT() {
        return Xi;
    }

    static get DATETIME_SHORT_WITH_SECONDS() {
        return Ki;
    }

    static get DATETIME_MED() {
        return Ji;
    }

    static get DATETIME_MED_WITH_SECONDS() {
        return Qi;
    }

    static get DATETIME_MED_WITH_WEEKDAY() {
        return vr;
    }

    static get DATETIME_FULL() {
        return ts;
    }

    static get DATETIME_FULL_WITH_SECONDS() {
        return es;
    }

    static get DATETIME_HUGE() {
        return is;
    }

    static get DATETIME_HUGE_WITH_SECONDS() {
        return ss;
    }
};
function di(i) {
    if (I.isDateTime(i)) return i;
    if (i && i.valueOf && Et(i.valueOf())) return I.fromJSDate(i);
    if (i && typeof i === "object") return I.fromObject(i);
    throw new G(`Unknown datetime argument: ${i}, of type ${typeof i}`);
}
const fg = {
    datetime: I.DATETIME_MED_WITH_SECONDS,
    millisecond: "h:mm:ss.SSS a",
    second: I.TIME_WITH_SECONDS,
    minute: I.TIME_SIMPLE,
    hour: { hour: "numeric" },
    day: { day: "numeric", month: "short" },
    week: "DD",
    month: { month: "short", year: "numeric" },
    quarter: "'Q'q - yyyy",
    year: { year: "numeric" },
};
kr._date.override({
    _id: "luxon",
    _create: function (i) {
        return I.fromMillis(i, this.options);
    },
    init(i) {
        this.options.locale || (this.options.locale = i.locale);
    },
    formats: function () {
        return fg;
    },
    parse: function (i, t) {
        const e = this.options;
        const s = typeof i;
        return i === null || s === "undefined"
            ? null
            : (s === "number"
                  ? (i = this._create(i))
                  : s === "string"
                    ? typeof t === "string"
                        ? (i = I.fromFormat(i, t, e))
                        : (i = I.fromISO(i, e))
                    : i instanceof Date
                      ? (i = I.fromJSDate(i, e))
                      : s === "object" &&
                        !(i instanceof I) &&
                        (i = I.fromObject(i, e)),
              i.isValid ? i.valueOf() : null);
    },
    format: function (i, t) {
        const e = this._create(i);
        return typeof t === "string" ? e.toFormat(t) : e.toLocaleString(t);
    },
    add: function (i, t, e) {
        const s = {};
        return (s[e] = t), this._create(i).plus(s).valueOf();
    },
    diff: function (i, t, e) {
        return this._create(i).diff(this._create(t)).as(e).valueOf();
    },
    startOf: function (i, t, e) {
        if (t === "isoWeek") {
            e = Math.trunc(Math.min(Math.max(0, e), 6));
            const s = this._create(i);
            return s
                .minus({ days: (s.weekday - e + 7) % 7 })
                .startOf("day")
                .valueOf();
        }
        return t ? this._create(i).startOf(t).valueOf() : i;
    },
    endOf: function (i, t) {
        return this._create(i).endOf(t).valueOf();
    },
});
function fn({ cachedData: i, options: t, type: e }) {
    return {
        init: function () {
            this.initChart(),
                this.$wire.$on("updateChartData", ({ data: s }) => {
                    (fn = this.getChart()), (fn.data = s), fn.update("resize");
                }),
                Alpine.effect(() => {
                    Alpine.store("theme"),
                        this.$nextTick(() => {
                            this.getChart() &&
                                (this.getChart().destroy(), this.initChart());
                        });
                }),
                window
                    .matchMedia("(prefers-color-scheme: dark)")
                    .addEventListener("change", () => {
                        Alpine.store("theme") === "system" &&
                            this.$nextTick(() => {
                                this.getChart().destroy(), this.initChart();
                            });
                    });
        },
        initChart: function (s = null) {
            let o, a, l, c, h, u, d, f, m;
            if (
                !this.$refs.canvas ||
                !this.$refs.backgroundColorElement ||
                !this.$refs.borderColorElement ||
                !this.$refs.textColorElement ||
                !this.$refs.gridColorElement
            ) {
                return;
            }
            (Rt.defaults.animation.duration = 0),
                (Rt.defaults.backgroundColor = getComputedStyle(
                    this.$refs.backgroundColorElement,
                ).color);
            const n = getComputedStyle(this.$refs.borderColorElement).color;
            (Rt.defaults.borderColor = n),
                (Rt.defaults.color = getComputedStyle(
                    this.$refs.textColorElement,
                ).color),
                (Rt.defaults.font.family = getComputedStyle(
                    this.$el,
                ).fontFamily),
                (Rt.defaults.plugins.legend.labels.boxWidth = 12),
                (Rt.defaults.plugins.legend.position = "bottom");
            const r = getComputedStyle(this.$refs.gridColorElement).color;
            return (
                t ?? (t = {}),
                t.borderWidth ?? (t.borderWidth = 2),
                t.pointBackgroundColor ?? (t.pointBackgroundColor = n),
                t.pointHitRadius ?? (t.pointHitRadius = 4),
                t.pointRadius ?? (t.pointRadius = 2),
                t.scales ?? (t.scales = {}),
                (o = t.scales).x ?? (o.x = {}),
                (a = t.scales.x).grid ?? (a.grid = {}),
                (l = t.scales.x.grid).color ?? (l.color = r),
                (c = t.scales.x.grid).display ?? (c.display = !1),
                (h = t.scales.x.grid).drawBorder ?? (h.drawBorder = !1),
                (u = t.scales).y ?? (u.y = {}),
                (d = t.scales.y).grid ?? (d.grid = {}),
                (f = t.scales.y.grid).color ?? (f.color = r),
                (m = t.scales.y.grid).drawBorder ?? (m.drawBorder = !1),
                new Rt(this.$refs.canvas, {
                    type: e,
                    data: s ?? i,
                    options: t,
                    plugins: window.filamentChartJsPlugins ?? [],
                })
            );
        },
        getChart: function () {
            return this.$refs.canvas ? Rt.getChart(this.$refs.canvas) : null;
        },
    };
}
export { fn as default };
/*! Bundled license information:

chart.js/dist/chunks/helpers.segment.mjs:
chart.js/dist/chart.mjs:
  (*!
   * Chart.js v3.9.1
   * https://www.chartjs.org
   * (c) 2022 Chart.js Contributors
   * Released under the MIT License
   *)

chart.js/dist/chunks/helpers.segment.mjs:
  (*!
   * @kurkle/color v0.2.1
   * https://github.com/kurkle/color#readme
   * (c) 2022 Jukka Kurkela
   * Released under the MIT License
   *)

chartjs-adapter-luxon/dist/chartjs-adapter-luxon.esm.js:
  (*!
   * chartjs-adapter-luxon v1.3.1
   * https://www.chartjs.org
   * (c) 2023 chartjs-adapter-luxon Contributors
   * Released under the MIT license
   *)
*/
