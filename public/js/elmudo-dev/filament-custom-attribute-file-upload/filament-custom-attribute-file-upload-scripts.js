const Yl = Object.defineProperty;
const ql = (e, t) => {
    for (const i in t) Yl(e, i, { get: t[i], enumerable: !0 });
};
const ea = {};
ql(ea, {
    FileOrigin: () => Pt,
    FileStatus: () => ke,
    OptionTypes: () => Ni,
    Status: () => Zn,
    create: () => ut,
    destroy: () => ht,
    find: () => Vi,
    getOptions: () => Gi,
    parse: () => Bi,
    registerPlugin: () => fe,
    setOptions: () => xt,
    supported: () => zi,
});
const $l = (e) => e instanceof HTMLElement;
const jl = (e, t = [], i = []) => {
    const a = { ...e };
    const n = [];
    const r = [];
    const l = () => ({ ...a });
    const o = () => {
        const p = [...n];
        return (n.length = 0), p;
    };
    const s = () => {
        const p = [...r];
        (r.length = 0),
            p.forEach(({ type: f, data: g }) => {
                u(f, g);
            });
    };
    const u = (p, f, g) => {
        if (g && !document.hidden) {
            r.push({ type: p, data: f });
            return;
        }
        m[p] && m[p](f), n.push({ type: p, data: f });
    };
    const c = (p, ...f) => (h[p] ? h[p](...f) : null);
    const d = {
        getState: l,
        processActionQueue: o,
        processDispatchQueue: s,
        dispatch: u,
        query: c,
    };
    let h = {};
    t.forEach((p) => {
        h = { ...p(a), ...h };
    });
    let m = {};
    return (
        i.forEach((p) => {
            m = { ...p(u, c, a), ...m };
        }),
        d
    );
};
const Xl = (e, t, i) => {
    if (typeof i === "function") {
        e[t] = i;
        return;
    }
    Object.defineProperty(e, t, { ...i });
};
const te = (e, t) => {
    for (const i in e) e.hasOwnProperty(i) && t(i, e[i]);
};
const Ue = (e) => {
    const t = {};
    return (
        te(e, (i) => {
            Xl(t, i, e[i]);
        }),
        t
    );
};
const ne = (e, t, i = null) => {
    if (i === null) return e.getAttribute(t) || e.hasAttribute(t);
    e.setAttribute(t, i);
};
const Ql = "http://www.w3.org/2000/svg";
const Kl = ["svg", "path"];
const wa = (e) => Kl.includes(e);
const ei = (e, t, i = {}) => {
    typeof t === "object" && ((i = t), (t = null));
    const a = wa(e)
        ? document.createElementNS(Ql, e)
        : document.createElement(e);
    return (
        t && (wa(e) ? ne(a, "class", t) : (a.className = t)),
        te(i, (n, r) => {
            ne(a, n, r);
        }),
        a
    );
};
const Zl = (e) => (t, i) => {
    typeof i < "u" && e.children[i]
        ? e.insertBefore(t, e.children[i])
        : e.appendChild(t);
};
const Jl = (e, t) => (i, a) => (
    typeof a < "u" ? t.splice(a, 0, i) : t.push(i), i
);
const eo = (e, t) => (i) => (
    t.splice(t.indexOf(i), 1),
    i.element.parentNode && e.removeChild(i.element),
    i
);
const to = typeof window < "u" && typeof window.document < "u";
const un = () => to;
const io = un() ? ei("svg") : {};
const ao =
    "children" in io ? (e) => e.children.length : (e) => e.childNodes.length;
const hn = (e, t, i, a) => {
    const n = i[0] || e.left;
    const r = i[1] || e.top;
    const l = n + e.width;
    const o = r + e.height * (a[1] || 1);
    const s = {
        element: { ...e },
        inner: { left: e.left, top: e.top, right: e.right, bottom: e.bottom },
        outer: { left: n, top: r, right: l, bottom: o },
    };
    return (
        t
            .filter((u) => !u.isRectIgnored())
            .map((u) => u.rect)
            .forEach((u) => {
                va(s.inner, { ...u.inner }), va(s.outer, { ...u.outer });
            }),
        Aa(s.inner),
        (s.outer.bottom += s.element.marginBottom),
        (s.outer.right += s.element.marginRight),
        Aa(s.outer),
        s
    );
};
var va = (e, t) => {
    (t.top += e.top),
        (t.right += e.left),
        (t.bottom += e.top),
        (t.left += e.left),
        t.bottom > e.bottom && (e.bottom = t.bottom),
        t.right > e.right && (e.right = t.right);
};
var Aa = (e) => {
    (e.width = e.right - e.left), (e.height = e.bottom - e.top);
};
const $e = (e) => typeof e === "number";
const no = (e, t, i, a = 0.001) => Math.abs(e - t) < a && Math.abs(i) < a;
const ro = ({ stiffness: e = 0.5, damping: t = 0.75, mass: i = 10 } = {}) => {
    let a = null;
    let n = null;
    let r = 0;
    let l = !1;
    const u = Ue({
        interpolate: (c, d) => {
            if (l) return;
            if (!($e(a) && $e(n))) {
                (l = !0), (r = 0);
                return;
            }
            const h = -(n - a) * e;
            (r += h / i),
                (n += r),
                (r *= t),
                no(n, a, r) || d
                    ? ((n = a),
                      (r = 0),
                      (l = !0),
                      u.onupdate(n),
                      u.oncomplete(n))
                    : u.onupdate(n);
        },
        target: {
            set: (c) => {
                if (
                    ($e(c) && !$e(n) && (n = c),
                    a === null && ((a = c), (n = c)),
                    (a = c),
                    n === a || typeof a > "u")
                ) {
                    (l = !0), (r = 0), u.onupdate(n), u.oncomplete(n);
                    return;
                }
                l = !1;
            },
            get: () => a,
        },
        resting: { get: () => l },
        onupdate: (c) => {},
        oncomplete: (c) => {},
    });
    return u;
};
const lo = (e) => (e < 0.5 ? 2 * e * e : -1 + (4 - 2 * e) * e);
const oo = ({ duration: e = 500, easing: t = lo, delay: i = 0 } = {}) => {
    let a = null;
    let n;
    let r;
    let l = !0;
    let o = !1;
    let s = null;
    const c = Ue({
        interpolate: (d, h) => {
            l ||
                s === null ||
                (a === null && (a = d),
                !(d - a < i) &&
                    ((n = d - a - i),
                    n >= e || h
                        ? ((n = 1),
                          (r = o ? 0 : 1),
                          c.onupdate(r * s),
                          c.oncomplete(r * s),
                          (l = !0))
                        : ((r = n / e),
                          c.onupdate((n >= 0 ? t(o ? 1 - r : r) : 0) * s))));
        },
        target: {
            get: () => (o ? 0 : s),
            set: (d) => {
                if (s === null) {
                    (s = d), c.onupdate(d), c.oncomplete(d);
                    return;
                }
                d < s ? ((s = 1), (o = !0)) : ((o = !1), (s = d)),
                    (l = !1),
                    (a = null);
            },
        },
        resting: { get: () => l },
        onupdate: (d) => {},
        oncomplete: (d) => {},
    });
    return c;
};
const La = { spring: ro, tween: oo };
const so = (e, t, i) => {
    const a = e[t] && typeof e[t][i] === "object" ? e[t][i] : e[t] || e;
    const n = typeof a === "string" ? a : a.type;
    const r = typeof a === "object" ? { ...a } : {};
    return La[n] ? La[n](r) : null;
};
const Ui = (e, t, i, a = !1) => {
    (t = Array.isArray(t) ? t : [t]),
        t.forEach((n) => {
            e.forEach((r) => {
                let l = r;
                let o = () => i[r];
                let s = (u) => (i[r] = u);
                typeof r === "object" &&
                    ((l = r.key), (o = r.getter || o), (s = r.setter || s)),
                    !(n[l] && !a) && (n[l] = { get: o, set: s });
            });
        });
};
const co = ({
    mixinConfig: e,
    viewProps: t,
    viewInternalAPI: i,
    viewExternalAPI: a,
}) => {
    const n = { ...t };
    const r = [];
    return (
        te(e, (l, o) => {
            const s = so(o);
            if (!s) return;
            (s.onupdate = (c) => {
                t[l] = c;
            }),
                (s.target = n[l]),
                Ui(
                    [
                        {
                            key: l,
                            setter: (c) => {
                                s.target !== c && (s.target = c);
                            },
                            getter: () => t[l],
                        },
                    ],
                    [i, a],
                    t,
                    !0,
                ),
                r.push(s);
        }),
        {
            write: (l) => {
                const o = document.hidden;
                let s = !0;
                return (
                    r.forEach((u) => {
                        u.resting || (s = !1), u.interpolate(l, o);
                    }),
                    s
                );
            },
            destroy: () => {},
        }
    );
};
const uo = (e) => (t, i) => {
    e.addEventListener(t, i);
};
const ho = (e) => (t, i) => {
    e.removeEventListener(t, i);
};
const mo = ({
    mixinConfig: e,
    viewProps: t,
    viewInternalAPI: i,
    viewExternalAPI: a,
    viewState: n,
    view: r,
}) => {
    const l = [];
    const o = uo(r.element);
    const s = ho(r.element);
    return (
        (a.on = (u, c) => {
            l.push({ type: u, fn: c }), o(u, c);
        }),
        (a.off = (u, c) => {
            l.splice(
                l.findIndex((d) => d.type === u && d.fn === c),
                1,
            ),
                s(u, c);
        }),
        {
            write: () => !0,
            destroy: () => {
                l.forEach((u) => {
                    s(u.type, u.fn);
                });
            },
        }
    );
};
const po = ({ mixinConfig: e, viewProps: t, viewExternalAPI: i }) => {
    Ui(e, i, t);
};
const me = (e) => e != null;
const fo = {
    opacity: 1,
    scaleX: 1,
    scaleY: 1,
    translateX: 0,
    translateY: 0,
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    originX: 0,
    originY: 0,
};
const go = ({
    mixinConfig: e,
    viewProps: t,
    viewInternalAPI: i,
    viewExternalAPI: a,
    view: n,
}) => {
    const r = { ...t };
    const l = {};
    Ui(e, [i, a], t);
    const o = () => [t.translateX || 0, t.translateY || 0];
    const s = () => [t.scaleX || 0, t.scaleY || 0];
    const u = () => (n.rect ? hn(n.rect, n.childViews, o(), s()) : null);
    return (
        (i.rect = { get: u }),
        (a.rect = { get: u }),
        e.forEach((c) => {
            t[c] = typeof r[c] > "u" ? fo[c] : r[c];
        }),
        {
            write: () => {
                if (Eo(l, t)) {
                    return To(n.element, t), Object.assign(l, { ...t }), !0;
                }
            },
            destroy: () => {},
        }
    );
};
var Eo = (e, t) => {
    if (Object.keys(e).length !== Object.keys(t).length) return !0;
    for (const i in t) if (t[i] !== e[i]) return !0;
    return !1;
};
var To = (
    e,
    {
        opacity: t,
        perspective: i,
        translateX: a,
        translateY: n,
        scaleX: r,
        scaleY: l,
        rotateX: o,
        rotateY: s,
        rotateZ: u,
        originX: c,
        originY: d,
        width: h,
        height: m,
    },
) => {
    let p = "";
    let f = "";
    (me(c) || me(d)) && (f += `transform-origin: ${c || 0}px ${d || 0}px;`),
        me(i) && (p += `perspective(${i}px) `),
        (me(a) || me(n)) && (p += `translate3d(${a || 0}px, ${n || 0}px, 0) `),
        (me(r) || me(l)) &&
            (p += `scale3d(${me(r) ? r : 1}, ${me(l) ? l : 1}, 1) `),
        me(u) && (p += `rotateZ(${u}rad) `),
        me(o) && (p += `rotateX(${o}rad) `),
        me(s) && (p += `rotateY(${s}rad) `),
        p.length && (f += `transform:${p};`),
        me(t) &&
            ((f += `opacity:${t};`),
            t === 0 && (f += "visibility:hidden;"),
            t < 1 && (f += "pointer-events:none;")),
        me(m) && (f += `height:${m}px;`),
        me(h) && (f += `width:${h}px;`);
    const g = e.elementCurrentStyle || "";
    (f.length !== g.length || f !== g) &&
        ((e.style.cssText = f), (e.elementCurrentStyle = f));
};
const bo = { styles: go, listeners: mo, animations: co, apis: po };
const Ma = (e = {}, t = {}, i = {}) => (
    t.layoutCalculated ||
        ((e.paddingTop = parseInt(i.paddingTop, 10) || 0),
        (e.marginTop = parseInt(i.marginTop, 10) || 0),
        (e.marginRight = parseInt(i.marginRight, 10) || 0),
        (e.marginBottom = parseInt(i.marginBottom, 10) || 0),
        (e.marginLeft = parseInt(i.marginLeft, 10) || 0),
        (t.layoutCalculated = !0)),
    (e.left = t.offsetLeft || 0),
    (e.top = t.offsetTop || 0),
    (e.width = t.offsetWidth || 0),
    (e.height = t.offsetHeight || 0),
    (e.right = e.left + e.width),
    (e.bottom = e.top + e.height),
    (e.scrollTop = t.scrollTop),
    (e.hidden = t.offsetParent === null),
    e
);
const re =
    ({
        tag: e = "div",
        name: t = null,
        attributes: i = {},
        read: a = () => {},
        write: n = () => {},
        create: r = () => {},
        destroy: l = () => {},
        filterFrameActionsForChild: o = (m, p) => p,
        didCreateView: s = () => {},
        didWriteView: u = () => {},
        ignoreRect: c = !1,
        ignoreRectUpdate: d = !1,
        mixins: h = [],
    } = {}) =>
    (m, p = {}) => {
        const f = ei(e, `filepond--${t}`, i);
        const g = window.getComputedStyle(f, null);
        const I = Ma();
        let E = null;
        let T = !1;
        const _ = [];
        const y = [];
        const b = {};
        const A = {};
        const R = [n];
        const S = [a];
        const P = [l];
        const O = () => f;
        const x = () => _.concat();
        const z = () => b;
        const v = (U) => (W, q) => W(U, q);
        const F = () => E || ((E = hn(I, _, [0, 0], [1, 1])), E);
        const w = () => g;
        const L = () => {
            (E = null),
                _.forEach((q) => q._read()),
                !(d && I.width && I.height) && Ma(I, f, g);
            const W = { root: X, props: p, rect: I };
            S.forEach((q) => q(W));
        };
        const C = (U, W, q) => {
            let oe = W.length === 0;
            return (
                R.forEach((J) => {
                    J({
                        props: p,
                        root: X,
                        actions: W,
                        timestamp: U,
                        shouldOptimize: q,
                    }) === !1 && (oe = !1);
                }),
                y.forEach((J) => {
                    J.write(U) === !1 && (oe = !1);
                }),
                _.filter((J) => !!J.element.parentNode).forEach((J) => {
                    J._write(U, o(J, W), q) || (oe = !1);
                }),
                _.forEach((J, G) => {
                    J.element.parentNode ||
                        (X.appendChild(J.element, G),
                        J._read(),
                        J._write(U, o(J, W), q),
                        (oe = !1));
                }),
                (T = oe),
                u({ props: p, root: X, actions: W, timestamp: U }),
                oe
            );
        };
        const D = () => {
            y.forEach((U) => U.destroy()),
                P.forEach((U) => {
                    U({ root: X, props: p });
                }),
                _.forEach((U) => U._destroy());
        };
        const V = {
            element: { get: O },
            style: { get: w },
            childViews: { get: x },
        };
        const B = {
            ...V,
            rect: { get: F },
            ref: { get: z },
            is: (U) => t === U,
            appendChild: Zl(f),
            createChildView: v(m),
            linkView: (U) => (_.push(U), U),
            unlinkView: (U) => {
                _.splice(_.indexOf(U), 1);
            },
            appendChildView: Jl(f, _),
            removeChildView: eo(f, _),
            registerWriter: (U) => R.push(U),
            registerReader: (U) => S.push(U),
            registerDestroyer: (U) => P.push(U),
            invalidateLayout: () => (f.layoutCalculated = !1),
            dispatch: m.dispatch,
            query: m.query,
        };
        const j = {
            element: { get: O },
            childViews: { get: x },
            rect: { get: F },
            resting: { get: () => T },
            isRectIgnored: () => c,
            _read: L,
            _write: C,
            _destroy: D,
        };
        const $ = { ...V, rect: { get: () => I } };
        Object.keys(h)
            .sort((U, W) => (U === "styles" ? 1 : W === "styles" ? -1 : 0))
            .forEach((U) => {
                const W = bo[U]({
                    mixinConfig: h[U],
                    viewProps: p,
                    viewState: A,
                    viewInternalAPI: B,
                    viewExternalAPI: j,
                    view: Ue($),
                });
                W && y.push(W);
            });
        const X = Ue(B);
        r({ root: X, props: p });
        const ue = ao(f);
        return (
            _.forEach((U, W) => {
                X.appendChild(U.element, ue + W);
            }),
            s(X),
            Ue(j)
        );
    };
const Io = (e, t, i = 60) => {
    const a = "__framePainter";
    if (window[a]) {
        window[a].readers.push(e), window[a].writers.push(t);
        return;
    }
    window[a] = { readers: [e], writers: [t] };
    const n = window[a];
    const r = 1e3 / i;
    let l = null;
    let o = null;
    let s = null;
    let u = null;
    const c = () => {
        document.hidden
            ? ((s = () => window.setTimeout(() => d(performance.now()), r)),
              (u = () => window.clearTimeout(o)))
            : ((s = () => window.requestAnimationFrame(d)),
              (u = () => window.cancelAnimationFrame(o)));
    };
    document.addEventListener("visibilitychange", () => {
        u && u(), c(), d(performance.now());
    });
    const d = (h) => {
        (o = s(d)), l || (l = h);
        const m = h - l;
        m <= r ||
            ((l = h - (m % r)),
            n.readers.forEach((p) => p()),
            n.writers.forEach((p) => p(h)));
    };
    return (
        c(),
        d(performance.now()),
        {
            pause: () => {
                u(o);
            },
        }
    );
};
const ge =
    (e, t) =>
    ({
        root: i,
        props: a,
        actions: n = [],
        timestamp: r,
        shouldOptimize: l,
    }) => {
        n
            .filter((o) => e[o.type])
            .forEach((o) =>
                e[o.type]({
                    root: i,
                    props: a,
                    action: o.data,
                    timestamp: r,
                    shouldOptimize: l,
                }),
            ),
            t &&
                t({
                    root: i,
                    props: a,
                    actions: n,
                    timestamp: r,
                    shouldOptimize: l,
                });
    };
const xa = (e, t) => t.parentNode.insertBefore(e, t);
const Oa = (e, t) => t.parentNode.insertBefore(e, t.nextSibling);
const ni = (e) => Array.isArray(e);
const Ne = (e) => e == null;
const _o = (e) => e.trim();
const ri = (e) => "" + e;
const Ro = (e, t = ",") =>
    Ne(e)
        ? []
        : ni(e)
          ? e
          : ri(e)
                .split(t)
                .map(_o)
                .filter((i) => i.length);
const mn = (e) => typeof e === "boolean";
const pn = (e) => (mn(e) ? e : e === "true");
const pe = (e) => typeof e === "string";
const fn = (e) => ($e(e) ? e : pe(e) ? ri(e).replace(/[a-z]+/gi, "") : 0);
const Jt = (e) => parseInt(fn(e), 10);
const Pa = (e) => parseFloat(fn(e));
const pt = (e) => $e(e) && isFinite(e) && Math.floor(e) === e;
const Da = (e, t = 1e3) => {
    if (pt(e)) return e;
    let i = ri(e).trim();
    return /MB$/i.test(i)
        ? ((i = i.replace(/MB$i/, "").trim()), Jt(i) * t * t)
        : /KB/i.test(i)
          ? ((i = i.replace(/KB$i/, "").trim()), Jt(i) * t)
          : Jt(i);
};
const je = (e) => typeof e === "function";
const yo = (e) => {
    let t = self;
    const i = e.split(".");
    let a = null;
    for (; (a = i.shift()); ) if (((t = t[a]), !t)) return null;
    return t;
};
const Fa = {
    process: "POST",
    patch: "PATCH",
    revert: "DELETE",
    fetch: "GET",
    restore: "GET",
    load: "GET",
};
const So = (e) => {
    const t = {};
    return (
        (t.url = pe(e) ? e : e.url || ""),
        (t.timeout = e.timeout ? parseInt(e.timeout, 10) : 0),
        (t.headers = e.headers ? e.headers : {}),
        te(Fa, (i) => {
            t[i] = wo(i, e[i], Fa[i], t.timeout, t.headers);
        }),
        (t.process = e.process || pe(e) || e.url ? t.process : null),
        (t.remove = e.remove || null),
        delete t.headers,
        t
    );
};
var wo = (e, t, i, a, n) => {
    if (t === null) return null;
    if (typeof t === "function") return t;
    const r = {
        url: i === "GET" || i === "PATCH" ? `?${e}=` : "",
        method: i,
        headers: n,
        withCredentials: !1,
        timeout: a,
        onload: null,
        ondata: null,
        onerror: null,
    };
    if (pe(t)) return (r.url = t), r;
    if ((Object.assign(r, t), pe(r.headers))) {
        const l = r.headers.split(/:(.+)/);
        r.headers = { header: l[0], value: l[1] };
    }
    return (r.withCredentials = pn(r.withCredentials)), r;
};
const vo = (e) => So(e);
const Ao = (e) => e === null;
const ce = (e) => typeof e === "object" && e !== null;
const Lo = (e) =>
    ce(e) &&
    pe(e.url) &&
    ce(e.process) &&
    ce(e.revert) &&
    ce(e.restore) &&
    ce(e.fetch);
const Li = (e) =>
    ni(e)
        ? "array"
        : Ao(e)
          ? "null"
          : pt(e)
            ? "int"
            : /^[0-9]+ ?(?:GB|MB|KB)$/gi.test(e)
              ? "bytes"
              : Lo(e)
                ? "api"
                : typeof e;
const Mo = (e) =>
    e
        .replace(/{\s*'/g, '{"')
        .replace(/'\s*}/g, '"}')
        .replace(/'\s*:/g, '":')
        .replace(/:\s*'/g, ':"')
        .replace(/,\s*'/g, ',"')
        .replace(/'\s*,/g, '",');
const xo = {
    array: Ro,
    boolean: pn,
    int: (e) => (Li(e) === "bytes" ? Da(e) : Jt(e)),
    number: Pa,
    float: Pa,
    bytes: Da,
    string: (e) => (je(e) ? e : ri(e)),
    function: (e) => yo(e),
    serverapi: vo,
    object: (e) => {
        try {
            return JSON.parse(Mo(e));
        } catch {
            return null;
        }
    },
};
const Oo = (e, t) => xo[t](e);
const gn = (e, t, i) => {
    if (e === t) return e;
    let a = Li(e);
    if (a !== i) {
        const n = Oo(e, i);
        if (((a = Li(n)), n === null)) {
            throw `Trying to assign value with incorrect type to "${option}", allowed type: "${i}"`;
        }
        e = n;
    }
    return e;
};
const Po = (e, t) => {
    let i = e;
    return {
        enumerable: !0,
        get: () => i,
        set: (a) => {
            i = gn(a, e, t);
        },
    };
};
const Do = (e) => {
    const t = {};
    return (
        te(e, (i) => {
            const a = e[i];
            t[i] = Po(a[0], a[1]);
        }),
        Ue(t)
    );
};
const Fo = (e) => ({
    items: [],
    listUpdateTimeout: null,
    itemUpdateTimeout: null,
    processingQueue: [],
    options: Do(e),
});
const li = (e, t = "-") =>
    e
        .split(/(?=[A-Z])/)
        .map((i) => i.toLowerCase())
        .join(t);
const Co = (e, t) => {
    const i = {};
    return (
        te(t, (a) => {
            i[a] = {
                get: () => e.getState().options[a],
                set: (n) => {
                    e.dispatch(`SET_${li(a, "_").toUpperCase()}`, { value: n });
                },
            };
        }),
        i
    );
};
const zo = (e) => (t, i, a) => {
    const n = {};
    return (
        te(e, (r) => {
            const l = li(r, "_").toUpperCase();
            n[`SET_${l}`] = (o) => {
                try {
                    a.options[r] = o.value;
                } catch {}
                t(`DID_SET_${l}`, { value: a.options[r] });
            };
        }),
        n
    );
};
const No = (e) => (t) => {
    const i = {};
    return (
        te(e, (a) => {
            i[`GET_${li(a, "_").toUpperCase()}`] = (n) => t.options[a];
        }),
        i
    );
};
const Se = { API: 1, DROP: 2, BROWSE: 3, PASTE: 4, NONE: 5 };
const ki = () => Math.random().toString(36).substring(2, 11);
const Hi = (e, t) => e.splice(t, 1);
const Bo = (e, t) => {
    t ? e() : document.hidden ? Promise.resolve(1).then(e) : setTimeout(e, 0);
};
const oi = () => {
    const e = [];
    const t = (a, n) => {
        Hi(
            e,
            e.findIndex((r) => r.event === a && (r.cb === n || !n)),
        );
    };
    const i = (a, n, r) => {
        e.filter((l) => l.event === a)
            .map((l) => l.cb)
            .forEach((l) => Bo(() => l(...n), r));
    };
    return {
        fireSync: (a, ...n) => {
            i(a, n, !0);
        },
        fire: (a, ...n) => {
            i(a, n, !1);
        },
        on: (a, n) => {
            e.push({ event: a, cb: n });
        },
        onOnce: (a, n) => {
            e.push({
                event: a,
                cb: (...r) => {
                    t(a, n), n(...r);
                },
            });
        },
        off: t,
    };
};
const En = (e, t, i) => {
    Object.getOwnPropertyNames(e)
        .filter((a) => !i.includes(a))
        .forEach((a) =>
            Object.defineProperty(t, a, Object.getOwnPropertyDescriptor(e, a)),
        );
};
const Vo = [
    "fire",
    "process",
    "revert",
    "load",
    "on",
    "off",
    "onOnce",
    "retryLoad",
    "extend",
    "archive",
    "archived",
    "release",
    "released",
    "requestProcessing",
    "freeze",
];
const Ee = (e) => {
    const t = {};
    return En(e, t, Vo), t;
};
const Go = (e) => {
    e.forEach((t, i) => {
        t.released && Hi(e, i);
    });
};
const k = {
    INIT: 1,
    IDLE: 2,
    PROCESSING_QUEUED: 9,
    PROCESSING: 3,
    PROCESSING_COMPLETE: 5,
    PROCESSING_ERROR: 6,
    PROCESSING_REVERT_ERROR: 10,
    LOADING: 7,
    LOAD_ERROR: 8,
};
const se = { INPUT: 1, LIMBO: 2, LOCAL: 3 };
const Tn = (e) => /[^0-9]+/.exec(e);
const bn = () => Tn((1.1).toLocaleString())[0];
const Uo = () => {
    const e = bn();
    const t = (1e3).toLocaleString();
    return t !== "1000" ? Tn(t)[0] : e === "." ? "," : ".";
};
const M = {
    BOOLEAN: "boolean",
    INT: "int",
    NUMBER: "number",
    STRING: "string",
    ARRAY: "array",
    OBJECT: "object",
    FUNCTION: "function",
    ACTION: "action",
    SERVER_API: "serverapi",
    REGEX: "regex",
};
const Wi = [];
const Le = (e, t, i) =>
    new Promise((a, n) => {
        const r = Wi.filter((o) => o.key === e).map((o) => o.cb);
        if (r.length === 0) {
            a(t);
            return;
        }
        const l = r.shift();
        r.reduce((o, s) => o.then((u) => s(u, i)), l(t, i))
            .then((o) => a(o))
            .catch((o) => n(o));
    });
const et = (e, t, i) => Wi.filter((a) => a.key === e).map((a) => a.cb(t, i));
const ko = (e, t) => Wi.push({ key: e, cb: t });
const Ho = (e) => Object.assign(st, e);
const ti = () => ({ ...st });
const Wo = (e) => {
    te(e, (t, i) => {
        st[t] && (st[t][0] = gn(i, st[t][0], st[t][1]));
    });
};
var st = {
    id: [null, M.STRING],
    name: ["filepond", M.STRING],
    disabled: [!1, M.BOOLEAN],
    className: [null, M.STRING],
    required: [!1, M.BOOLEAN],
    captureMethod: [null, M.STRING],
    allowSyncAcceptAttribute: [!0, M.BOOLEAN],
    allowDrop: [!0, M.BOOLEAN],
    allowBrowse: [!0, M.BOOLEAN],
    allowPaste: [!0, M.BOOLEAN],
    allowMultiple: [!1, M.BOOLEAN],
    allowReplace: [!0, M.BOOLEAN],
    allowRevert: [!0, M.BOOLEAN],
    allowRemove: [!0, M.BOOLEAN],
    allowProcess: [!0, M.BOOLEAN],
    allowReorder: [!1, M.BOOLEAN],
    allowDirectoriesOnly: [!1, M.BOOLEAN],
    storeAsFile: [!1, M.BOOLEAN],
    forceRevert: [!1, M.BOOLEAN],
    maxFiles: [null, M.INT],
    checkValidity: [!1, M.BOOLEAN],
    itemInsertLocationFreedom: [!0, M.BOOLEAN],
    itemInsertLocation: ["before", M.STRING],
    itemInsertInterval: [75, M.INT],
    dropOnPage: [!1, M.BOOLEAN],
    dropOnElement: [!0, M.BOOLEAN],
    dropValidation: [!1, M.BOOLEAN],
    ignoredFiles: [[".ds_store", "thumbs.db", "desktop.ini"], M.ARRAY],
    instantUpload: [!0, M.BOOLEAN],
    maxParallelUploads: [2, M.INT],
    allowMinimumUploadDuration: [!0, M.BOOLEAN],
    chunkUploads: [!1, M.BOOLEAN],
    chunkForce: [!1, M.BOOLEAN],
    chunkSize: [5e6, M.INT],
    chunkRetryDelays: [[500, 1e3, 3e3], M.ARRAY],
    server: [null, M.SERVER_API],
    fileSizeBase: [1e3, M.INT],
    labelFileSizeBytes: ["bytes", M.STRING],
    labelFileSizeKilobytes: ["KB", M.STRING],
    labelFileSizeMegabytes: ["MB", M.STRING],
    labelFileSizeGigabytes: ["GB", M.STRING],
    labelDecimalSeparator: [bn(), M.STRING],
    labelThousandsSeparator: [Uo(), M.STRING],
    labelIdle: [
        'Drag & Drop your files or <span class="filepond--label-action">Browse</span>',
        M.STRING,
    ],
    labelInvalidField: ["Field contains invalid files", M.STRING],
    labelFileWaitingForSize: ["Waiting for size", M.STRING],
    labelFileSizeNotAvailable: ["Size not available", M.STRING],
    labelFileCountSingular: ["file in list", M.STRING],
    labelFileCountPlural: ["files in list", M.STRING],
    labelFileLoading: ["Loading", M.STRING],
    labelFileAdded: ["Added", M.STRING],
    labelFileLoadError: ["Error during load", M.STRING],
    labelFileRemoved: ["Removed", M.STRING],
    labelFileRemoveError: ["Error during remove", M.STRING],
    labelFileProcessing: ["Uploading", M.STRING],
    labelFileProcessingComplete: ["Upload complete", M.STRING],
    labelFileProcessingAborted: ["Upload cancelled", M.STRING],
    labelFileProcessingError: ["Error during upload", M.STRING],
    labelFileProcessingRevertError: ["Error during revert", M.STRING],
    labelTapToCancel: ["tap to cancel", M.STRING],
    labelTapToRetry: ["tap to retry", M.STRING],
    labelTapToUndo: ["tap to undo", M.STRING],
    labelButtonRemoveItem: ["Remove", M.STRING],
    labelButtonAbortItemLoad: ["Abort", M.STRING],
    labelButtonRetryItemLoad: ["Retry", M.STRING],
    labelButtonAbortItemProcessing: ["Cancel", M.STRING],
    labelButtonUndoItemProcessing: ["Undo", M.STRING],
    labelButtonRetryItemProcessing: ["Retry", M.STRING],
    labelButtonProcessItem: ["Upload", M.STRING],
    iconRemove: [
        '<svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg"><path d="M11.586 13l-2.293 2.293a1 1 0 0 0 1.414 1.414L13 14.414l2.293 2.293a1 1 0 0 0 1.414-1.414L14.414 13l2.293-2.293a1 1 0 0 0-1.414-1.414L13 11.586l-2.293-2.293a1 1 0 0 0-1.414 1.414L11.586 13z" fill="currentColor" fill-rule="nonzero"/></svg>',
        M.STRING,
    ],
    iconProcess: [
        '<svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg"><path d="M14 10.414v3.585a1 1 0 0 1-2 0v-3.585l-1.293 1.293a1 1 0 0 1-1.414-1.415l3-3a1 1 0 0 1 1.414 0l3 3a1 1 0 0 1-1.414 1.415L14 10.414zM9 18a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2H9z" fill="currentColor" fill-rule="evenodd"/></svg>',
        M.STRING,
    ],
    iconRetry: [
        '<svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg"><path d="M10.81 9.185l-.038.02A4.997 4.997 0 0 0 8 13.683a5 5 0 0 0 5 5 5 5 0 0 0 5-5 1 1 0 0 1 2 0A7 7 0 1 1 9.722 7.496l-.842-.21a.999.999 0 1 1 .484-1.94l3.23.806c.535.133.86.675.73 1.21l-.804 3.233a.997.997 0 0 1-1.21.73.997.997 0 0 1-.73-1.21l.23-.928v-.002z" fill="currentColor" fill-rule="nonzero"/></svg>',
        M.STRING,
    ],
    iconUndo: [
        '<svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg"><path d="M9.185 10.81l.02-.038A4.997 4.997 0 0 1 13.683 8a5 5 0 0 1 5 5 5 5 0 0 1-5 5 1 1 0 0 0 0 2A7 7 0 1 0 7.496 9.722l-.21-.842a.999.999 0 1 0-1.94.484l.806 3.23c.133.535.675.86 1.21.73l3.233-.803a.997.997 0 0 0 .73-1.21.997.997 0 0 0-1.21-.73l-.928.23-.002-.001z" fill="currentColor" fill-rule="nonzero"/></svg>',
        M.STRING,
    ],
    iconDone: [
        '<svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg"><path d="M18.293 9.293a1 1 0 0 1 1.414 1.414l-7.002 7a1 1 0 0 1-1.414 0l-3.998-4a1 1 0 1 1 1.414-1.414L12 15.586l6.294-6.293z" fill="currentColor" fill-rule="nonzero"/></svg>',
        M.STRING,
    ],
    oninit: [null, M.FUNCTION],
    onwarning: [null, M.FUNCTION],
    onerror: [null, M.FUNCTION],
    onactivatefile: [null, M.FUNCTION],
    oninitfile: [null, M.FUNCTION],
    onaddfilestart: [null, M.FUNCTION],
    onaddfileprogress: [null, M.FUNCTION],
    onaddfile: [null, M.FUNCTION],
    onprocessfilestart: [null, M.FUNCTION],
    onprocessfileprogress: [null, M.FUNCTION],
    onprocessfileabort: [null, M.FUNCTION],
    onprocessfilerevert: [null, M.FUNCTION],
    onprocessfile: [null, M.FUNCTION],
    onprocessfiles: [null, M.FUNCTION],
    onremovefile: [null, M.FUNCTION],
    onpreparefile: [null, M.FUNCTION],
    onupdatefiles: [null, M.FUNCTION],
    onreorderfiles: [null, M.FUNCTION],
    beforeDropFile: [null, M.FUNCTION],
    beforeAddFile: [null, M.FUNCTION],
    beforeRemoveFile: [null, M.FUNCTION],
    beforePrepareFile: [null, M.FUNCTION],
    stylePanelLayout: [null, M.STRING],
    stylePanelAspectRatio: [null, M.STRING],
    styleItemPanelAspectRatio: [null, M.STRING],
    styleButtonRemoveItemPosition: ["left", M.STRING],
    styleButtonProcessItemPosition: ["right", M.STRING],
    styleLoadIndicatorPosition: ["right", M.STRING],
    styleProgressIndicatorPosition: ["right", M.STRING],
    styleButtonRemoveItemAlign: [!1, M.BOOLEAN],
    files: [[], M.ARRAY],
    credits: [["https://pqina.nl/", "Powered by PQINA"], M.ARRAY],
};
const Xe = (e, t) =>
    Ne(t)
        ? e[0] || null
        : pt(t)
          ? e[t] || null
          : (typeof t === "object" && (t = t.id),
            e.find((i) => i.id === t) || null);
const In = (e) => {
    if (Ne(e)) return e;
    if (/:/.test(e)) {
        const t = e.split(":");
        return t[1] / t[0];
    }
    return parseFloat(e);
};
const Me = (e) => e.filter((t) => !t.archived);
const _n = { EMPTY: 0, IDLE: 1, ERROR: 2, BUSY: 3, READY: 4 };
let $t = null;
const Yo = () => {
    if ($t === null) {
        try {
            const e = new DataTransfer();
            e.items.add(new File(["hello world"], "This_Works.txt"));
            const t = document.createElement("input");
            t.setAttribute("type", "file"),
                (t.files = e.files),
                ($t = t.files.length === 1);
        } catch {
            $t = !1;
        }
    }
    return $t;
};
const qo = [k.LOAD_ERROR, k.PROCESSING_ERROR, k.PROCESSING_REVERT_ERROR];
const $o = [k.LOADING, k.PROCESSING, k.PROCESSING_QUEUED, k.INIT];
const jo = [k.PROCESSING_COMPLETE];
const Xo = (e) => qo.includes(e.status);
const Qo = (e) => $o.includes(e.status);
const Ko = (e) => jo.includes(e.status);
const Ca = (e) =>
    ce(e.options.server) &&
    (ce(e.options.server.process) || je(e.options.server.process));
const Zo = (e) => ({
    GET_STATUS: () => {
        const t = Me(e.items);
        const { EMPTY: i, ERROR: a, BUSY: n, IDLE: r, READY: l } = _n;
        return t.length === 0
            ? i
            : t.some(Xo)
              ? a
              : t.some(Qo)
                ? n
                : t.some(Ko)
                  ? l
                  : r;
    },
    GET_ITEM: (t) => Xe(e.items, t),
    GET_ACTIVE_ITEM: (t) => Xe(Me(e.items), t),
    GET_ACTIVE_ITEMS: () => Me(e.items),
    GET_ITEMS: () => e.items,
    GET_ITEM_NAME: (t) => {
        const i = Xe(e.items, t);
        return i ? i.filename : null;
    },
    GET_ITEM_SIZE: (t) => {
        const i = Xe(e.items, t);
        return i ? i.fileSize : null;
    },
    GET_STYLES: () =>
        Object.keys(e.options)
            .filter((t) => /^style/.test(t))
            .map((t) => ({ name: t, value: e.options[t] })),
    GET_PANEL_ASPECT_RATIO: () =>
        /circle/.test(e.options.stylePanelLayout)
            ? 1
            : In(e.options.stylePanelAspectRatio),
    GET_ITEM_PANEL_ASPECT_RATIO: () => e.options.styleItemPanelAspectRatio,
    GET_ITEMS_BY_STATUS: (t) => Me(e.items).filter((i) => i.status === t),
    GET_TOTAL_ITEMS: () => Me(e.items).length,
    SHOULD_UPDATE_FILE_INPUT: () => e.options.storeAsFile && Yo() && !Ca(e),
    IS_ASYNC: () => Ca(e),
    GET_FILE_SIZE_LABELS: (t) => ({
        labelBytes: t("GET_LABEL_FILE_SIZE_BYTES") || void 0,
        labelKilobytes: t("GET_LABEL_FILE_SIZE_KILOBYTES") || void 0,
        labelMegabytes: t("GET_LABEL_FILE_SIZE_MEGABYTES") || void 0,
        labelGigabytes: t("GET_LABEL_FILE_SIZE_GIGABYTES") || void 0,
    }),
});
const Jo = (e) => {
    const t = Me(e.items).length;
    if (!e.options.allowMultiple) return t === 0;
    const i = e.options.maxFiles;
    return i === null || t < i;
};
const Rn = (e, t, i) => Math.max(Math.min(i, e), t);
const es = (e, t, i) => e.splice(t, 0, i);
const ts = (e, t, i) =>
    Ne(t)
        ? null
        : typeof i > "u"
          ? (e.push(t), t)
          : ((i = Rn(i, 0, e.length)), es(e, i, t), t);
const Mi = (e) =>
    /^\s*data:([a-z]+\/[a-z0-9-+.]+(;[a-z-]+=[a-z0-9-]+)?)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s]*)\s*$/i.test(
        e,
    );
const Ot = (e) => `${e}`.split("/").pop().split("?").shift();
const si = (e) => e.split(".").pop();
const is = (e) => {
    if (typeof e !== "string") return "";
    const t = e.split("/").pop();
    return /svg/.test(t)
        ? "svg"
        : /zip|compressed/.test(t)
          ? "zip"
          : /plain/.test(t)
            ? "txt"
            : /msword/.test(t)
              ? "doc"
              : /[a-z]+/.test(t)
                ? t === "jpeg"
                    ? "jpg"
                    : t
                : "";
};
const vt = (e, t = "") => (t + e).slice(-t.length);
const yn = (e = new Date()) =>
    `${e.getFullYear()}-${vt(e.getMonth() + 1, "00")}-${vt(e.getDate(), "00")}_${vt(e.getHours(), "00")}-${vt(e.getMinutes(), "00")}-${vt(e.getSeconds(), "00")}`;
const mt = (e, t, i = null, a = null) => {
    const n =
        typeof i === "string"
            ? e.slice(0, e.size, i)
            : e.slice(0, e.size, e.type);
    return (
        (n.lastModifiedDate = new Date()),
        e._relativePath && (n._relativePath = e._relativePath),
        pe(t) || (t = yn()),
        t && a === null && si(t)
            ? (n.name = t)
            : ((a = a || is(n.type)), (n.name = t + (a ? "." + a : ""))),
        n
    );
};
const as = () =>
    (window.BlobBuilder =
        window.BlobBuilder ||
        window.WebKitBlobBuilder ||
        window.MozBlobBuilder ||
        window.MSBlobBuilder);
const Sn = (e, t) => {
    const i = as();
    if (i) {
        const a = new i();
        return a.append(e), a.getBlob(t);
    }
    return new Blob([e], { type: t });
};
const ns = (e, t) => {
    const i = new ArrayBuffer(e.length);
    const a = new Uint8Array(i);
    for (let n = 0; n < e.length; n++) a[n] = e.charCodeAt(n);
    return Sn(i, t);
};
const wn = (e) => (/^data:(.+);/.exec(e) || [])[1] || null;
const rs = (e) => e.split(",")[1].replace(/\s/g, "");
const ls = (e) => atob(rs(e));
const os = (e) => {
    const t = wn(e);
    const i = ls(e);
    return ns(i, t);
};
const ss = (e, t, i) => mt(os(e), t, null, i);
const cs = (e) => {
    if (!/^content-disposition:/i.test(e)) return null;
    const t = e
        .split(/filename=|filename\*=.+''/)
        .splice(1)
        .map((i) => i.trim().replace(/^["']|[;"']{0,2}$/g, ""))
        .filter((i) => i.length);
    return t.length ? decodeURI(t[t.length - 1]) : null;
};
const ds = (e) => {
    if (/content-length:/i.test(e)) {
        const t = e.match(/[0-9]+/)[0];
        return t ? parseInt(t, 10) : null;
    }
    return null;
};
const us = (e) =>
    (/x-content-transfer-id:/i.test(e) && (e.split(":")[1] || "").trim()) ||
    null;
const Yi = (e) => {
    const t = { source: null, name: null, size: null };
    const i = e.split(`
`);
    for (const a of i) {
        const n = cs(a);
        if (n) {
            t.name = n;
            continue;
        }
        const r = ds(a);
        if (r) {
            t.size = r;
            continue;
        }
        const l = us(a);
        if (l) {
            t.source = l;
            continue;
        }
    }
    return t;
};
const hs = (e) => {
    const t = {
        source: null,
        complete: !1,
        progress: 0,
        size: null,
        timestamp: null,
        duration: 0,
        request: null,
    };
    const i = () => t.progress;
    const a = () => {
        t.request && t.request.abort && t.request.abort();
    };
    const n = () => {
        const o = t.source;
        l.fire("init", o),
            o instanceof File
                ? l.fire("load", o)
                : o instanceof Blob
                  ? l.fire("load", mt(o, o.name))
                  : Mi(o)
                    ? l.fire("load", ss(o))
                    : r(o);
    };
    const r = (o) => {
        if (!e) {
            l.fire("error", {
                type: "error",
                body: "Can't load URL",
                code: 400,
            });
            return;
        }
        (t.timestamp = Date.now()),
            (t.request = e(
                o,
                (s) => {
                    (t.duration = Date.now() - t.timestamp),
                        (t.complete = !0),
                        s instanceof Blob && (s = mt(s, s.name || Ot(o))),
                        l.fire(
                            "load",
                            s instanceof Blob ? s : s ? s.body : null,
                        );
                },
                (s) => {
                    l.fire(
                        "error",
                        typeof s === "string"
                            ? { type: "error", code: 0, body: s }
                            : s,
                    );
                },
                (s, u, c) => {
                    if (
                        (c && (t.size = c),
                        (t.duration = Date.now() - t.timestamp),
                        !s)
                    ) {
                        t.progress = null;
                        return;
                    }
                    (t.progress = u / c), l.fire("progress", t.progress);
                },
                () => {
                    l.fire("abort");
                },
                (s) => {
                    const u = Yi(typeof s === "string" ? s : s.headers);
                    l.fire("meta", {
                        size: t.size || u.size,
                        filename: u.name,
                        source: u.source,
                    });
                },
            ));
    };
    const l = {
        ...oi(),
        setSource: (o) => (t.source = o),
        getProgress: i,
        abort: a,
        load: n,
    };
    return l;
};
const za = (e) => /GET|HEAD/.test(e);
const Qe = (e, t, i) => {
    const a = {
        onheaders: () => {},
        onprogress: () => {},
        onload: () => {},
        ontimeout: () => {},
        onerror: () => {},
        onabort: () => {},
        abort: () => {
            (n = !0), l.abort();
        },
    };
    let n = !1;
    let r = !1;
    (i = { method: "POST", headers: {}, withCredentials: !1, ...i }),
        (t = encodeURI(t)),
        za(i.method) &&
            e &&
            (t = `${t}${encodeURIComponent(typeof e === "string" ? e : JSON.stringify(e))}`);
    const l = new XMLHttpRequest();
    const o = za(i.method) ? l : l.upload;
    return (
        (o.onprogress = (s) => {
            n || a.onprogress(s.lengthComputable, s.loaded, s.total);
        }),
        (l.onreadystatechange = () => {
            l.readyState < 2 ||
                (l.readyState === 4 && l.status === 0) ||
                r ||
                ((r = !0), a.onheaders(l));
        }),
        (l.onload = () => {
            l.status >= 200 && l.status < 300 ? a.onload(l) : a.onerror(l);
        }),
        (l.onerror = () => a.onerror(l)),
        (l.onabort = () => {
            (n = !0), a.onabort();
        }),
        (l.ontimeout = () => a.ontimeout(l)),
        l.open(i.method, t, !0),
        pt(i.timeout) && (l.timeout = i.timeout),
        Object.keys(i.headers).forEach((s) => {
            const u = unescape(encodeURIComponent(i.headers[s]));
            l.setRequestHeader(s, u);
        }),
        i.responseType && (l.responseType = i.responseType),
        i.withCredentials && (l.withCredentials = !0),
        l.send(e),
        a
    );
};
const ie = (e, t, i, a) => ({ type: e, code: t, body: i, headers: a });
const Ke = (e) => (t) => {
    e(ie("error", 0, "Timeout", t.getAllResponseHeaders()));
};
const Na = (e) => /\?/.test(e);
const Mt = (...e) => {
    let t = "";
    return (
        e.forEach((i) => {
            t += Na(t) && Na(i) ? i.replace(/\?/, "&") : i;
        }),
        t
    );
};
const Ri = (e = "", t) => {
    if (typeof t === "function") return t;
    if (!t || !pe(t.url)) return null;
    const i = t.onload || ((n) => n);
    const a = t.onerror || ((n) => null);
    return (n, r, l, o, s, u) => {
        const c = Qe(n, Mt(e, t.url), { ...t, responseType: "blob" });
        return (
            (c.onload = (d) => {
                const h = d.getAllResponseHeaders();
                const m = Yi(h).name || Ot(n);
                r(
                    ie(
                        "load",
                        d.status,
                        t.method === "HEAD" ? null : mt(i(d.response), m),
                        h,
                    ),
                );
            }),
            (c.onerror = (d) => {
                l(
                    ie(
                        "error",
                        d.status,
                        a(d.response) || d.statusText,
                        d.getAllResponseHeaders(),
                    ),
                );
            }),
            (c.onheaders = (d) => {
                u(ie("headers", d.status, null, d.getAllResponseHeaders()));
            }),
            (c.ontimeout = Ke(l)),
            (c.onprogress = o),
            (c.onabort = s),
            c
        );
    };
};
const Re = { QUEUED: 0, COMPLETE: 1, PROCESSING: 2, ERROR: 3, WAITING: 4 };
const ms = (e, t, i, a, n, r, l, o, s, u, c) => {
    const d = [];
    const {
        chunkTransferId: h,
        chunkServer: m,
        chunkSize: p,
        chunkRetryDelays: f,
    } = c;
    const g = { serverId: h, aborted: !1 };
    const I = t.ondata || ((v) => v);
    const E =
        t.onload ||
        ((v, F) =>
            F === "HEAD" ? v.getResponseHeader("Upload-Offset") : v.response);
    const T = t.onerror || ((v) => null);
    const _ = (v) => {
        const F = new FormData();
        ce(n) && F.append(i, JSON.stringify(n));
        const w =
            typeof t.headers === "function"
                ? t.headers(a, n)
                : { ...t.headers, "Upload-Length": a.size };
        const L = { ...t, headers: w };
        const C = Qe(I(F), Mt(e, t.url), L);
        (C.onload = (D) => v(E(D, L.method))),
            (C.onerror = (D) =>
                l(
                    ie(
                        "error",
                        D.status,
                        T(D.response) || D.statusText,
                        D.getAllResponseHeaders(),
                    ),
                )),
            (C.ontimeout = Ke(l));
    };
    const y = (v) => {
        const F = Mt(e, m.url, g.serverId);
        const L = {
            headers:
                typeof t.headers === "function"
                    ? t.headers(g.serverId)
                    : { ...t.headers },
            method: "HEAD",
        };
        const C = Qe(null, F, L);
        (C.onload = (D) => v(E(D, L.method))),
            (C.onerror = (D) =>
                l(
                    ie(
                        "error",
                        D.status,
                        T(D.response) || D.statusText,
                        D.getAllResponseHeaders(),
                    ),
                )),
            (C.ontimeout = Ke(l));
    };
    const b = Math.floor(a.size / p);
    for (let v = 0; v <= b; v++) {
        const F = v * p;
        const w = a.slice(F, F + p, "application/offset+octet-stream");
        d[v] = {
            index: v,
            size: w.size,
            offset: F,
            data: w,
            file: a,
            progress: 0,
            retries: [...f],
            status: Re.QUEUED,
            error: null,
            request: null,
            timeout: null,
        };
    }
    const A = () => r(g.serverId);
    const R = (v) => v.status === Re.QUEUED || v.status === Re.ERROR;
    const S = (v) => {
        if (g.aborted) return;
        if (((v = v || d.find(R)), !v)) {
            d.every((V) => V.status === Re.COMPLETE) && A();
            return;
        }
        (v.status = Re.PROCESSING), (v.progress = null);
        const F = m.ondata || ((V) => V);
        const w = m.onerror || ((V) => null);
        const L = Mt(e, m.url, g.serverId);
        const C =
            typeof m.headers === "function"
                ? m.headers(v)
                : {
                      ...m.headers,
                      "Content-Type": "application/offset+octet-stream",
                      "Upload-Offset": v.offset,
                      "Upload-Length": a.size,
                      "Upload-Name": a.name,
                  };
        const D = (v.request = Qe(F(v.data), L, { ...m, headers: C }));
        (D.onload = () => {
            (v.status = Re.COMPLETE), (v.request = null), x();
        }),
            (D.onprogress = (V, B, j) => {
                (v.progress = V ? B : null), O();
            }),
            (D.onerror = (V) => {
                (v.status = Re.ERROR),
                    (v.request = null),
                    (v.error = w(V.response) || V.statusText),
                    P(v) ||
                        l(
                            ie(
                                "error",
                                V.status,
                                w(V.response) || V.statusText,
                                V.getAllResponseHeaders(),
                            ),
                        );
            }),
            (D.ontimeout = (V) => {
                (v.status = Re.ERROR), (v.request = null), P(v) || Ke(l)(V);
            }),
            (D.onabort = () => {
                (v.status = Re.QUEUED), (v.request = null), s();
            });
    };
    const P = (v) =>
        v.retries.length === 0
            ? !1
            : ((v.status = Re.WAITING),
              clearTimeout(v.timeout),
              (v.timeout = setTimeout(() => {
                  S(v);
              }, v.retries.shift())),
              !0);
    const O = () => {
        const v = d.reduce(
            (w, L) =>
                w === null || L.progress === null ? null : w + L.progress,
            0,
        );
        if (v === null) return o(!1, 0, 0);
        const F = d.reduce((w, L) => w + L.size, 0);
        o(!0, v, F);
    };
    const x = () => {
        d.filter((F) => F.status === Re.PROCESSING).length >= 1 || S();
    };
    const z = () => {
        d.forEach((v) => {
            clearTimeout(v.timeout), v.request && v.request.abort();
        });
    };
    return (
        g.serverId
            ? y((v) => {
                  g.aborted ||
                      (d
                          .filter((F) => F.offset < v)
                          .forEach((F) => {
                              (F.status = Re.COMPLETE), (F.progress = F.size);
                          }),
                      x());
              })
            : _((v) => {
                  g.aborted || (u(v), (g.serverId = v), x());
              }),
        {
            abort: () => {
                (g.aborted = !0), z();
            },
        }
    );
};
const ps = (e, t, i, a) => (n, r, l, o, s, u, c) => {
    if (!n) return;
    const d = a.chunkUploads;
    const h = d && n.size > a.chunkSize;
    const m = d && (h || a.chunkForce);
    if (n instanceof Blob && m) return ms(e, t, i, n, r, l, o, s, u, c, a);
    const p = t.ondata || ((y) => y);
    const f = t.onload || ((y) => y);
    const g = t.onerror || ((y) => null);
    const I =
        typeof t.headers === "function"
            ? t.headers(n, r) || {}
            : { ...t.headers };
    const E = { ...t, headers: I };
    const T = new FormData();
    ce(r) && T.append(i, JSON.stringify(r)),
        (n instanceof Blob ? [{ name: null, file: n }] : n).forEach((y) => {
            T.append(
                i,
                y.file,
                y.name === null ? y.file.name : `${y.name}${y.file.name}`,
            );
        });
    const _ = Qe(p(T), Mt(e, t.url), E);
    return (
        (_.onload = (y) => {
            l(ie("load", y.status, f(y.response), y.getAllResponseHeaders()));
        }),
        (_.onerror = (y) => {
            o(
                ie(
                    "error",
                    y.status,
                    g(y.response) || y.statusText,
                    y.getAllResponseHeaders(),
                ),
            );
        }),
        (_.ontimeout = Ke(o)),
        (_.onprogress = s),
        (_.onabort = u),
        _
    );
};
const fs = (e = "", t, i, a) =>
    typeof t === "function"
        ? (...n) => t(i, ...n, a)
        : !t || !pe(t.url)
          ? null
          : ps(e, t, i, a);
const At = (e = "", t) => {
    if (typeof t === "function") return t;
    if (!t || !pe(t.url)) return (n, r) => r();
    const i = t.onload || ((n) => n);
    const a = t.onerror || ((n) => null);
    return (n, r, l) => {
        const o = Qe(n, e + t.url, t);
        return (
            (o.onload = (s) => {
                r(
                    ie(
                        "load",
                        s.status,
                        i(s.response),
                        s.getAllResponseHeaders(),
                    ),
                );
            }),
            (o.onerror = (s) => {
                l(
                    ie(
                        "error",
                        s.status,
                        a(s.response) || s.statusText,
                        s.getAllResponseHeaders(),
                    ),
                );
            }),
            (o.ontimeout = Ke(l)),
            o
        );
    };
};
const vn = (e = 0, t = 1) => e + Math.random() * (t - e);
const gs = (e, t = 1e3, i = 0, a = 25, n = 250) => {
    let r = null;
    const l = Date.now();
    const o = () => {
        const s = Date.now() - l;
        let u = vn(a, n);
        s + u > t && (u = s + u - t);
        const c = s / t;
        if (c >= 1 || document.hidden) {
            e(1);
            return;
        }
        e(c), (r = setTimeout(o, u));
    };
    return (
        t > 0 && o(),
        {
            clear: () => {
                clearTimeout(r);
            },
        }
    );
};
const Es = (e, t) => {
    const i = {
        complete: !1,
        perceivedProgress: 0,
        perceivedPerformanceUpdater: null,
        progress: null,
        timestamp: null,
        perceivedDuration: 0,
        duration: 0,
        request: null,
        response: null,
    };
    const { allowMinimumUploadDuration: a } = t;
    const n = (c, d) => {
        const h = () => {
            i.duration === 0 ||
                i.progress === null ||
                u.fire("progress", u.getProgress());
        };
        const m = () => {
            (i.complete = !0), u.fire("load-perceived", i.response.body);
        };
        u.fire("start"),
            (i.timestamp = Date.now()),
            (i.perceivedPerformanceUpdater = gs(
                (p) => {
                    (i.perceivedProgress = p),
                        (i.perceivedDuration = Date.now() - i.timestamp),
                        h(),
                        i.response &&
                            i.perceivedProgress === 1 &&
                            !i.complete &&
                            m();
                },
                a ? vn(750, 1500) : 0,
            )),
            (i.request = e(
                c,
                d,
                (p) => {
                    (i.response = ce(p)
                        ? p
                        : {
                              type: "load",
                              code: 200,
                              body: `${p}`,
                              headers: {},
                          }),
                        (i.duration = Date.now() - i.timestamp),
                        (i.progress = 1),
                        u.fire("load", i.response.body),
                        (!a || (a && i.perceivedProgress === 1)) && m();
                },
                (p) => {
                    i.perceivedPerformanceUpdater.clear(),
                        u.fire(
                            "error",
                            ce(p)
                                ? p
                                : { type: "error", code: 0, body: `${p}` },
                        );
                },
                (p, f, g) => {
                    (i.duration = Date.now() - i.timestamp),
                        (i.progress = p ? f / g : null),
                        h();
                },
                () => {
                    i.perceivedPerformanceUpdater.clear(),
                        u.fire("abort", i.response ? i.response.body : null);
                },
                (p) => {
                    u.fire("transfer", p);
                },
            ));
    };
    const r = () => {
        i.request &&
            (i.perceivedPerformanceUpdater.clear(),
            i.request.abort && i.request.abort(),
            (i.complete = !0));
    };
    const l = () => {
        r(),
            (i.complete = !1),
            (i.perceivedProgress = 0),
            (i.progress = 0),
            (i.timestamp = null),
            (i.perceivedDuration = 0),
            (i.duration = 0),
            (i.request = null),
            (i.response = null);
    };
    const o = a
        ? () => (i.progress ? Math.min(i.progress, i.perceivedProgress) : null)
        : () => i.progress || null;
    const s = a
        ? () => Math.min(i.duration, i.perceivedDuration)
        : () => i.duration;
    const u = {
        ...oi(),
        process: n,
        abort: r,
        getProgress: o,
        getDuration: s,
        reset: l,
    };
    return u;
};
const An = (e) => e.substring(0, e.lastIndexOf(".")) || e;
const Ts = (e) => {
    const t = [e.name, e.size, e.type];
    return (
        e instanceof Blob || Mi(e)
            ? (t[0] = e.name || yn())
            : Mi(e)
              ? ((t[1] = e.length), (t[2] = wn(e)))
              : pe(e) &&
                ((t[0] = Ot(e)),
                (t[1] = 0),
                (t[2] = "application/octet-stream")),
        { name: t[0], size: t[1], type: t[2] }
    );
};
const Ze = (e) => !!(e instanceof File || (e instanceof Blob && e.name));
const Ln = (e) => {
    if (!ce(e)) return e;
    const t = ni(e) ? [] : {};
    for (const i in e) {
        if (!e.hasOwnProperty(i)) continue;
        const a = e[i];
        t[i] = a && ce(a) ? Ln(a) : a;
    }
    return t;
};
const bs = (e = null, t = null, i = null) => {
    const a = ki();
    const n = {
        archived: !1,
        frozen: !1,
        released: !1,
        source: null,
        file: i,
        serverFileReference: t,
        transferId: null,
        processingAborted: !1,
        status: t ? k.PROCESSING_COMPLETE : k.INIT,
        activeLoader: null,
        activeProcessor: null,
    };
    let r = null;
    const l = {};
    const o = (R) => (n.status = R);
    const s = (R, ...S) => {
        n.released || n.frozen || b.fire(R, ...S);
    };
    const u = () => si(n.file.name);
    const c = () => n.file.type;
    const d = () => n.file.size;
    const h = () => n.file;
    const m = (R, S, P) => {
        if (((n.source = R), b.fireSync("init"), n.file)) {
            b.fireSync("load-skip");
            return;
        }
        (n.file = Ts(R)),
            S.on("init", () => {
                s("load-init");
            }),
            S.on("meta", (O) => {
                (n.file.size = O.size),
                    (n.file.filename = O.filename),
                    O.source &&
                        ((e = se.LIMBO),
                        (n.serverFileReference = O.source),
                        (n.status = k.PROCESSING_COMPLETE)),
                    s("load-meta");
            }),
            S.on("progress", (O) => {
                o(k.LOADING), s("load-progress", O);
            }),
            S.on("error", (O) => {
                o(k.LOAD_ERROR), s("load-request-error", O);
            }),
            S.on("abort", () => {
                o(k.INIT), s("load-abort");
            }),
            S.on("load", (O) => {
                n.activeLoader = null;
                const x = (v) => {
                    (n.file = Ze(v) ? v : n.file),
                        e === se.LIMBO && n.serverFileReference
                            ? o(k.PROCESSING_COMPLETE)
                            : o(k.IDLE),
                        s("load");
                };
                const z = (v) => {
                    (n.file = O),
                        s("load-meta"),
                        o(k.LOAD_ERROR),
                        s("load-file-error", v);
                };
                if (n.serverFileReference) {
                    x(O);
                    return;
                }
                P(O, x, z);
            }),
            S.setSource(R),
            (n.activeLoader = S),
            S.load();
    };
    const p = () => {
        n.activeLoader && n.activeLoader.load();
    };
    const f = () => {
        if (n.activeLoader) {
            n.activeLoader.abort();
            return;
        }
        o(k.INIT), s("load-abort");
    };
    const g = (R, S) => {
        if (n.processingAborted) {
            n.processingAborted = !1;
            return;
        }
        if ((o(k.PROCESSING), (r = null), !(n.file instanceof Blob))) {
            b.on("load", () => {
                g(R, S);
            });
            return;
        }
        R.on("load", (x) => {
            (n.transferId = null), (n.serverFileReference = x);
        }),
            R.on("transfer", (x) => {
                n.transferId = x;
            }),
            R.on("load-perceived", (x) => {
                (n.activeProcessor = null),
                    (n.transferId = null),
                    (n.serverFileReference = x),
                    o(k.PROCESSING_COMPLETE),
                    s("process-complete", x);
            }),
            R.on("start", () => {
                s("process-start");
            }),
            R.on("error", (x) => {
                (n.activeProcessor = null),
                    o(k.PROCESSING_ERROR),
                    s("process-error", x);
            }),
            R.on("abort", (x) => {
                (n.activeProcessor = null),
                    (n.serverFileReference = x),
                    o(k.IDLE),
                    s("process-abort"),
                    r && r();
            }),
            R.on("progress", (x) => {
                s("process-progress", x);
            });
        const P = (x) => {
            n.archived || R.process(x, { ...l });
        };
        const O = console.error;
        S(n.file, P, O), (n.activeProcessor = R);
    };
    const I = () => {
        (n.processingAborted = !1), o(k.PROCESSING_QUEUED);
    };
    const E = () =>
        new Promise((R) => {
            if (!n.activeProcessor) {
                (n.processingAborted = !0), o(k.IDLE), s("process-abort"), R();
                return;
            }
            (r = () => {
                R();
            }),
                n.activeProcessor.abort();
        });
    const T = (R, S) =>
        new Promise((P, O) => {
            const x =
                n.serverFileReference !== null
                    ? n.serverFileReference
                    : n.transferId;
            if (x === null) {
                P();
                return;
            }
            R(
                x,
                () => {
                    (n.serverFileReference = null), (n.transferId = null), P();
                },
                (z) => {
                    if (!S) {
                        P();
                        return;
                    }
                    o(k.PROCESSING_REVERT_ERROR),
                        s("process-revert-error"),
                        O(z);
                },
            ),
                o(k.IDLE),
                s("process-revert");
        });
    const _ = (R, S, P) => {
        const O = R.split(".");
        const x = O[0];
        const z = O.pop();
        let v = l;
        O.forEach((F) => (v = v[F])),
            JSON.stringify(v[z]) !== JSON.stringify(S) &&
                ((v[z] = S),
                s("metadata-update", { key: x, value: l[x], silent: P }));
    };
    const b = {
        id: { get: () => a },
        origin: { get: () => e, set: (R) => (e = R) },
        serverId: { get: () => n.serverFileReference },
        transferId: { get: () => n.transferId },
        status: { get: () => n.status },
        filename: { get: () => n.file.name },
        filenameWithoutExtension: { get: () => An(n.file.name) },
        fileExtension: { get: u },
        fileType: { get: c },
        fileSize: { get: d },
        file: { get: h },
        relativePath: { get: () => n.file._relativePath },
        source: { get: () => n.source },
        getMetadata: (R) => Ln(R ? l[R] : l),
        setMetadata: (R, S, P) => {
            if (ce(R)) {
                const O = R;
                return (
                    Object.keys(O).forEach((x) => {
                        _(x, O[x], S);
                    }),
                    R
                );
            }
            return _(R, S, P), S;
        },
        extend: (R, S) => (A[R] = S),
        abortLoad: f,
        retryLoad: p,
        requestProcessing: I,
        abortProcessing: E,
        load: m,
        process: g,
        revert: T,
        ...oi(),
        freeze: () => (n.frozen = !0),
        release: () => (n.released = !0),
        released: { get: () => n.released },
        archive: () => (n.archived = !0),
        archived: { get: () => n.archived },
        setFile: (R) => (n.file = R),
    };
    const A = Ue(b);
    return A;
};
const Is = (e, t) => (Ne(t) ? 0 : pe(t) ? e.findIndex((i) => i.id === t) : -1);
const Ba = (e, t) => {
    const i = Is(e, t);
    if (!(i < 0)) return e[i] || null;
};
const Va = (e, t, i, a, n, r) => {
    const l = Qe(null, e, { method: "GET", responseType: "blob" });
    return (
        (l.onload = (o) => {
            const s = o.getAllResponseHeaders();
            const u = Yi(s).name || Ot(e);
            t(ie("load", o.status, mt(o.response, u), s));
        }),
        (l.onerror = (o) => {
            i(ie("error", o.status, o.statusText, o.getAllResponseHeaders()));
        }),
        (l.onheaders = (o) => {
            r(ie("headers", o.status, null, o.getAllResponseHeaders()));
        }),
        (l.ontimeout = Ke(i)),
        (l.onprogress = a),
        (l.onabort = n),
        l
    );
};
const Ga = (e) => (
    e.indexOf("//") === 0 && (e = location.protocol + e),
    e
        .toLowerCase()
        .replace("blob:", "")
        .replace(/([a-z])?:\/\//, "$1")
        .split("/")[0]
);
const _s = (e) =>
    (e.indexOf(":") > -1 || e.indexOf("//") > -1) &&
    Ga(location.href) !== Ga(e);
const jt =
    (e) =>
    (...t) =>
        je(e) ? e(...t) : e;
const Rs = (e) => !Ze(e.file);
const yi = (e, t) => {
    clearTimeout(t.listUpdateTimeout),
        (t.listUpdateTimeout = setTimeout(() => {
            e("DID_UPDATE_ITEMS", { items: Me(t.items) });
        }, 0));
};
const Ua = (e, ...t) =>
    new Promise((i) => {
        if (!e) return i(!0);
        const a = e(...t);
        if (a == null) return i(!0);
        if (typeof a === "boolean") return i(a);
        typeof a.then === "function" && a.then(i);
    });
const Si = (e, t) => {
    e.items.sort((i, a) => t(Ee(i), Ee(a)));
};
const ye =
    (e, t) =>
    ({ query: i, success: a = () => {}, failure: n = () => {}, ...r } = {}) => {
        const l = Xe(e.items, i);
        if (!l) {
            n({ error: ie("error", 0, "Item not found"), file: null });
            return;
        }
        t(l, a, n, r || {});
    };
const ys = (e, t, i) => ({
    ABORT_ALL: () => {
        Me(i.items).forEach((a) => {
            a.freeze(), a.abortLoad(), a.abortProcessing();
        });
    },
    DID_SET_FILES: ({ value: a = [] }) => {
        const n = a.map((l) => ({
            source: l.source ? l.source : l,
            options: l.options,
        }));
        let r = Me(i.items);
        r.forEach((l) => {
            n.find((o) => o.source === l.source || o.source === l.file) ||
                e("REMOVE_ITEM", { query: l, remove: !1 });
        }),
            (r = Me(i.items)),
            n.forEach((l, o) => {
                r.find((s) => s.source === l.source || s.file === l.source) ||
                    e("ADD_ITEM", {
                        ...l,
                        interactionMethod: Se.NONE,
                        index: o,
                    });
            });
    },
    DID_UPDATE_ITEM_METADATA: ({ id: a, action: n, change: r }) => {
        r.silent ||
            (clearTimeout(i.itemUpdateTimeout),
            (i.itemUpdateTimeout = setTimeout(() => {
                const l = Ba(i.items, a);
                if (!t("IS_ASYNC")) {
                    Le("SHOULD_PREPARE_OUTPUT", !1, {
                        item: l,
                        query: t,
                        action: n,
                        change: r,
                    }).then((c) => {
                        const d = t("GET_BEFORE_PREPARE_FILE");
                        d && (c = d(l, c)),
                            c &&
                                e(
                                    "REQUEST_PREPARE_OUTPUT",
                                    {
                                        query: a,
                                        item: l,
                                        success: (h) => {
                                            e("DID_PREPARE_OUTPUT", {
                                                id: a,
                                                file: h,
                                            });
                                        },
                                    },
                                    !0,
                                );
                    });
                    return;
                }
                l.origin === se.LOCAL &&
                    e("DID_LOAD_ITEM", {
                        id: l.id,
                        error: null,
                        serverFileReference: l.source,
                    });
                const o = () => {
                    setTimeout(() => {
                        e("REQUEST_ITEM_PROCESSING", { query: a });
                    }, 32);
                };
                const s = (c) => {
                    l.revert(
                        At(i.options.server.url, i.options.server.revert),
                        t("GET_FORCE_REVERT"),
                    )
                        .then(c ? o : () => {})
                        .catch(() => {});
                };
                const u = (c) => {
                    l.abortProcessing().then(c ? o : () => {});
                };
                if (l.status === k.PROCESSING_COMPLETE) {
                    return s(i.options.instantUpload);
                }
                if (l.status === k.PROCESSING) {
                    return u(i.options.instantUpload);
                }
                i.options.instantUpload && o();
            }, 0)));
    },
    MOVE_ITEM: ({ query: a, index: n }) => {
        const r = Xe(i.items, a);
        if (!r) return;
        const l = i.items.indexOf(r);
        (n = Rn(n, 0, i.items.length - 1)),
            l !== n && i.items.splice(n, 0, i.items.splice(l, 1)[0]);
    },
    SORT: ({ compare: a }) => {
        Si(i, a), e("DID_SORT_ITEMS", { items: t("GET_ACTIVE_ITEMS") });
    },
    ADD_ITEMS: ({
        items: a,
        index: n,
        interactionMethod: r,
        success: l = () => {},
        failure: o = () => {},
    }) => {
        let s = n;
        if (n === -1 || typeof n > "u") {
            const m = t("GET_ITEM_INSERT_LOCATION");
            const p = t("GET_TOTAL_ITEMS");
            s = m === "before" ? 0 : p;
        }
        const u = t("GET_IGNORED_FILES");
        const c = (m) => (Ze(m) ? !u.includes(m.name.toLowerCase()) : !Ne(m));
        const h = a.filter(c).map(
            (m) =>
                new Promise((p, f) => {
                    e("ADD_ITEM", {
                        interactionMethod: r,
                        source: m.source || m,
                        success: p,
                        failure: f,
                        index: s++,
                        options: m.options || {},
                    });
                }),
        );
        Promise.all(h).then(l).catch(o);
    },
    ADD_ITEM: ({
        source: a,
        index: n = -1,
        interactionMethod: r,
        success: l = () => {},
        failure: o = () => {},
        options: s = {},
    }) => {
        if (Ne(a)) {
            o({ error: ie("error", 0, "No source"), file: null });
            return;
        }
        if (Ze(a) && i.options.ignoredFiles.includes(a.name.toLowerCase())) {
            return;
        }
        if (!Jo(i)) {
            if (
                i.options.allowMultiple ||
                (!i.options.allowMultiple && !i.options.allowReplace)
            ) {
                const E = ie("warning", 0, "Max files");
                e("DID_THROW_MAX_FILES", { source: a, error: E }),
                    o({ error: E, file: null });
                return;
            }
            const I = Me(i.items)[0];
            if (
                I.status === k.PROCESSING_COMPLETE ||
                I.status === k.PROCESSING_REVERT_ERROR
            ) {
                const E = t("GET_FORCE_REVERT");
                if (
                    (I.revert(
                        At(i.options.server.url, i.options.server.revert),
                        E,
                    )
                        .then(() => {
                            E &&
                                e("ADD_ITEM", {
                                    source: a,
                                    index: n,
                                    interactionMethod: r,
                                    success: l,
                                    failure: o,
                                    options: s,
                                });
                        })
                        .catch(() => {}),
                    E)
                ) {
                    return;
                }
            }
            e("REMOVE_ITEM", { query: I.id });
        }
        const u =
            s.type === "local"
                ? se.LOCAL
                : s.type === "limbo"
                  ? se.LIMBO
                  : se.INPUT;
        const c = bs(u, u === se.INPUT ? null : a, s.file);
        Object.keys(s.metadata || {}).forEach((I) => {
            c.setMetadata(I, s.metadata[I]);
        }),
            et("DID_CREATE_ITEM", c, { query: t, dispatch: e });
        const d = t("GET_ITEM_INSERT_LOCATION");
        i.options.itemInsertLocationFreedom ||
            (n = d === "before" ? -1 : i.items.length),
            ts(i.items, c, n),
            je(d) && a && Si(i, d);
        const h = c.id;
        c.on("init", () => {
            e("DID_INIT_ITEM", { id: h });
        }),
            c.on("load-init", () => {
                e("DID_START_ITEM_LOAD", { id: h });
            }),
            c.on("load-meta", () => {
                e("DID_UPDATE_ITEM_META", { id: h });
            }),
            c.on("load-progress", (I) => {
                e("DID_UPDATE_ITEM_LOAD_PROGRESS", { id: h, progress: I });
            }),
            c.on("load-request-error", (I) => {
                const E = jt(i.options.labelFileLoadError)(I);
                if (I.code >= 400 && I.code < 500) {
                    e("DID_THROW_ITEM_INVALID", {
                        id: h,
                        error: I,
                        status: { main: E, sub: `${I.code} (${I.body})` },
                    }),
                        o({ error: I, file: Ee(c) });
                    return;
                }
                e("DID_THROW_ITEM_LOAD_ERROR", {
                    id: h,
                    error: I,
                    status: { main: E, sub: i.options.labelTapToRetry },
                });
            }),
            c.on("load-file-error", (I) => {
                e("DID_THROW_ITEM_INVALID", {
                    id: h,
                    error: I.status,
                    status: I.status,
                }),
                    o({ error: I.status, file: Ee(c) });
            }),
            c.on("load-abort", () => {
                e("REMOVE_ITEM", { query: h });
            }),
            c.on("load-skip", () => {
                c.on("metadata-update", (I) => {
                    Ze(c.file) &&
                        e("DID_UPDATE_ITEM_METADATA", { id: h, change: I });
                }),
                    e("COMPLETE_LOAD_ITEM", {
                        query: h,
                        item: c,
                        data: { source: a, success: l },
                    });
            }),
            c.on("load", () => {
                const I = (E) => {
                    if (!E) {
                        e("REMOVE_ITEM", { query: h });
                        return;
                    }
                    c.on("metadata-update", (T) => {
                        e("DID_UPDATE_ITEM_METADATA", { id: h, change: T });
                    }),
                        Le("SHOULD_PREPARE_OUTPUT", !1, {
                            item: c,
                            query: t,
                        }).then((T) => {
                            const _ = t("GET_BEFORE_PREPARE_FILE");
                            _ && (T = _(c, T));
                            const y = () => {
                                e("COMPLETE_LOAD_ITEM", {
                                    query: h,
                                    item: c,
                                    data: { source: a, success: l },
                                }),
                                    yi(e, i);
                            };
                            if (T) {
                                e(
                                    "REQUEST_PREPARE_OUTPUT",
                                    {
                                        query: h,
                                        item: c,
                                        success: (b) => {
                                            e("DID_PREPARE_OUTPUT", {
                                                id: h,
                                                file: b,
                                            }),
                                                y();
                                        },
                                    },
                                    !0,
                                );
                                return;
                            }
                            y();
                        });
                };
                Le("DID_LOAD_ITEM", c, { query: t, dispatch: e })
                    .then(() => {
                        Ua(t("GET_BEFORE_ADD_FILE"), Ee(c)).then(I);
                    })
                    .catch((E) => {
                        if (!E || !E.error || !E.status) return I(!1);
                        e("DID_THROW_ITEM_INVALID", {
                            id: h,
                            error: E.error,
                            status: E.status,
                        });
                    });
            }),
            c.on("process-start", () => {
                e("DID_START_ITEM_PROCESSING", { id: h });
            }),
            c.on("process-progress", (I) => {
                e("DID_UPDATE_ITEM_PROCESS_PROGRESS", { id: h, progress: I });
            }),
            c.on("process-error", (I) => {
                e("DID_THROW_ITEM_PROCESSING_ERROR", {
                    id: h,
                    error: I,
                    status: {
                        main: jt(i.options.labelFileProcessingError)(I),
                        sub: i.options.labelTapToRetry,
                    },
                });
            }),
            c.on("process-revert-error", (I) => {
                e("DID_THROW_ITEM_PROCESSING_REVERT_ERROR", {
                    id: h,
                    error: I,
                    status: {
                        main: jt(i.options.labelFileProcessingRevertError)(I),
                        sub: i.options.labelTapToRetry,
                    },
                });
            }),
            c.on("process-complete", (I) => {
                e("DID_COMPLETE_ITEM_PROCESSING", {
                    id: h,
                    error: null,
                    serverFileReference: I,
                }),
                    e("DID_DEFINE_VALUE", { id: h, value: I });
            }),
            c.on("process-abort", () => {
                e("DID_ABORT_ITEM_PROCESSING", { id: h });
            }),
            c.on("process-revert", () => {
                e("DID_REVERT_ITEM_PROCESSING", { id: h }),
                    e("DID_DEFINE_VALUE", { id: h, value: null });
            }),
            e("DID_ADD_ITEM", { id: h, index: n, interactionMethod: r }),
            yi(e, i);
        const {
            url: m,
            load: p,
            restore: f,
            fetch: g,
        } = i.options.server || {};
        c.load(
            a,
            hs(
                u === se.INPUT
                    ? pe(a) && _s(a) && g
                        ? Ri(m, g)
                        : Va
                    : u === se.LIMBO
                      ? Ri(m, f)
                      : Ri(m, p),
            ),
            (I, E, T) => {
                Le("LOAD_FILE", I, { query: t }).then(E).catch(T);
            },
        );
    },
    REQUEST_PREPARE_OUTPUT: ({
        item: a,
        success: n,
        failure: r = () => {},
    }) => {
        const l = { error: ie("error", 0, "Item not found"), file: null };
        if (a.archived) return r(l);
        Le("PREPARE_OUTPUT", a.file, { query: t, item: a }).then((o) => {
            Le("COMPLETE_PREPARE_OUTPUT", o, { query: t, item: a }).then(
                (s) => {
                    if (a.archived) return r(l);
                    n(s);
                },
            );
        });
    },
    COMPLETE_LOAD_ITEM: ({ item: a, data: n }) => {
        const { success: r, source: l } = n;
        const o = t("GET_ITEM_INSERT_LOCATION");
        if (
            (je(o) && l && Si(i, o),
            e("DID_LOAD_ITEM", {
                id: a.id,
                error: null,
                serverFileReference: a.origin === se.INPUT ? null : l,
            }),
            r(Ee(a)),
            a.origin === se.LOCAL)
        ) {
            e("DID_LOAD_LOCAL_ITEM", { id: a.id });
            return;
        }
        if (a.origin === se.LIMBO) {
            e("DID_COMPLETE_ITEM_PROCESSING", {
                id: a.id,
                error: null,
                serverFileReference: l,
            }),
                e("DID_DEFINE_VALUE", { id: a.id, value: a.serverId || l });
            return;
        }
        t("IS_ASYNC") &&
            i.options.instantUpload &&
            e("REQUEST_ITEM_PROCESSING", { query: a.id });
    },
    RETRY_ITEM_LOAD: ye(i, (a) => {
        a.retryLoad();
    }),
    REQUEST_ITEM_PREPARE: ye(i, (a, n, r) => {
        e(
            "REQUEST_PREPARE_OUTPUT",
            {
                query: a.id,
                item: a,
                success: (l) => {
                    e("DID_PREPARE_OUTPUT", { id: a.id, file: l }),
                        n({ file: a, output: l });
                },
                failure: r,
            },
            !0,
        );
    }),
    REQUEST_ITEM_PROCESSING: ye(i, (a, n, r) => {
        if (!(a.status === k.IDLE || a.status === k.PROCESSING_ERROR)) {
            const o = () =>
                e("REQUEST_ITEM_PROCESSING", {
                    query: a,
                    success: n,
                    failure: r,
                });
            const s = () => (document.hidden ? o() : setTimeout(o, 32));
            a.status === k.PROCESSING_COMPLETE ||
            a.status === k.PROCESSING_REVERT_ERROR
                ? a
                      .revert(
                          At(i.options.server.url, i.options.server.revert),
                          t("GET_FORCE_REVERT"),
                      )
                      .then(s)
                      .catch(() => {})
                : a.status === k.PROCESSING && a.abortProcessing().then(s);
            return;
        }
        a.status !== k.PROCESSING_QUEUED &&
            (a.requestProcessing(),
            e("DID_REQUEST_ITEM_PROCESSING", { id: a.id }),
            e("PROCESS_ITEM", { query: a, success: n, failure: r }, !0));
    }),
    PROCESS_ITEM: ye(i, (a, n, r) => {
        const l = t("GET_MAX_PARALLEL_UPLOADS");
        if (t("GET_ITEMS_BY_STATUS", k.PROCESSING).length === l) {
            i.processingQueue.push({ id: a.id, success: n, failure: r });
            return;
        }
        if (a.status === k.PROCESSING) return;
        const s = () => {
            const c = i.processingQueue.shift();
            if (!c) return;
            const { id: d, success: h, failure: m } = c;
            const p = Xe(i.items, d);
            if (!p || p.archived) {
                s();
                return;
            }
            e("PROCESS_ITEM", { query: d, success: h, failure: m }, !0);
        };
        a.onOnce("process-complete", () => {
            n(Ee(a)), s();
            const c = i.options.server;
            if (
                i.options.instantUpload &&
                a.origin === se.LOCAL &&
                je(c.remove)
            ) {
                const m = () => {};
                (a.origin = se.LIMBO), i.options.server.remove(a.source, m, m);
            }
            t("GET_ITEMS_BY_STATUS", k.PROCESSING_COMPLETE).length ===
                i.items.length && e("DID_COMPLETE_ITEM_PROCESSING_ALL");
        }),
            a.onOnce("process-error", (c) => {
                r({ error: c, file: Ee(a) }), s();
            });
        const u = i.options;
        a.process(
            Es(
                fs(u.server.url, u.server.process, u.name, {
                    chunkTransferId: a.transferId,
                    chunkServer: u.server.patch,
                    chunkUploads: u.chunkUploads,
                    chunkForce: u.chunkForce,
                    chunkSize: u.chunkSize,
                    chunkRetryDelays: u.chunkRetryDelays,
                }),
                {
                    allowMinimumUploadDuration: t(
                        "GET_ALLOW_MINIMUM_UPLOAD_DURATION",
                    ),
                },
            ),
            (c, d, h) => {
                Le("PREPARE_OUTPUT", c, { query: t, item: a })
                    .then((m) => {
                        e("DID_PREPARE_OUTPUT", { id: a.id, file: m }), d(m);
                    })
                    .catch(h);
            },
        );
    }),
    RETRY_ITEM_PROCESSING: ye(i, (a) => {
        e("REQUEST_ITEM_PROCESSING", { query: a });
    }),
    REQUEST_REMOVE_ITEM: ye(i, (a) => {
        Ua(t("GET_BEFORE_REMOVE_FILE"), Ee(a)).then((n) => {
            n && e("REMOVE_ITEM", { query: a });
        });
    }),
    RELEASE_ITEM: ye(i, (a) => {
        a.release();
    }),
    REMOVE_ITEM: ye(i, (a, n, r, l) => {
        const o = () => {
            const u = a.id;
            Ba(i.items, u).archive(),
                e("DID_REMOVE_ITEM", { error: null, id: u, item: a }),
                yi(e, i),
                n(Ee(a));
        };
        const s = i.options.server;
        a.origin === se.LOCAL && s && je(s.remove) && l.remove !== !1
            ? (e("DID_START_ITEM_REMOVE", { id: a.id }),
              s.remove(
                  a.source,
                  () => o(),
                  (u) => {
                      e("DID_THROW_ITEM_REMOVE_ERROR", {
                          id: a.id,
                          error: ie("error", 0, u, null),
                          status: {
                              main: jt(i.options.labelFileRemoveError)(u),
                              sub: i.options.labelTapToRetry,
                          },
                      });
                  },
              ))
            : (((l.revert && a.origin !== se.LOCAL && a.serverId !== null) ||
                  (i.options.chunkUploads &&
                      a.file.size > i.options.chunkSize) ||
                  (i.options.chunkUploads && i.options.chunkForce)) &&
                  a.revert(
                      At(i.options.server.url, i.options.server.revert),
                      t("GET_FORCE_REVERT"),
                  ),
              o());
    }),
    ABORT_ITEM_LOAD: ye(i, (a) => {
        a.abortLoad();
    }),
    ABORT_ITEM_PROCESSING: ye(i, (a) => {
        if (a.serverId) {
            e("REVERT_ITEM_PROCESSING", { id: a.id });
            return;
        }
        a.abortProcessing().then(() => {
            i.options.instantUpload && e("REMOVE_ITEM", { query: a.id });
        });
    }),
    REQUEST_REVERT_ITEM_PROCESSING: ye(i, (a) => {
        if (!i.options.instantUpload) {
            e("REVERT_ITEM_PROCESSING", { query: a });
            return;
        }
        const n = (o) => {
            o && e("REVERT_ITEM_PROCESSING", { query: a });
        };
        const r = t("GET_BEFORE_REMOVE_FILE");
        if (!r) return n(!0);
        const l = r(Ee(a));
        if (l == null) return n(!0);
        if (typeof l === "boolean") return n(l);
        typeof l.then === "function" && l.then(n);
    }),
    REVERT_ITEM_PROCESSING: ye(i, (a) => {
        a.revert(
            At(i.options.server.url, i.options.server.revert),
            t("GET_FORCE_REVERT"),
        )
            .then(() => {
                (i.options.instantUpload || Rs(a)) &&
                    e("REMOVE_ITEM", { query: a.id });
            })
            .catch(() => {});
    }),
    SET_OPTIONS: ({ options: a }) => {
        const n = Object.keys(a);
        const r = Ss.filter((o) => n.includes(o));
        [...r, ...Object.keys(a).filter((o) => !r.includes(o))].forEach((o) => {
            e(`SET_${li(o, "_").toUpperCase()}`, { value: a[o] });
        });
    },
});
var Ss = ["server"];
const qi = (e) => e;
const Be = (e) => document.createElement(e);
const ae = (e, t) => {
    let i = e.childNodes[0];
    i
        ? t !== i.nodeValue && (i.nodeValue = t)
        : ((i = document.createTextNode(t)), e.appendChild(i));
};
const ka = (e, t, i, a) => {
    const n = (((a % 360) - 90) * Math.PI) / 180;
    return { x: e + i * Math.cos(n), y: t + i * Math.sin(n) };
};
const ws = (e, t, i, a, n, r) => {
    const l = ka(e, t, i, n);
    const o = ka(e, t, i, a);
    return ["M", l.x, l.y, "A", i, i, 0, r, 0, o.x, o.y].join(" ");
};
const vs = (e, t, i, a, n) => {
    let r = 1;
    return (
        n > a && n - a <= 0.5 && (r = 0),
        a > n && a - n >= 0.5 && (r = 0),
        ws(e, t, i, Math.min(0.9999, a) * 360, Math.min(0.9999, n) * 360, r)
    );
};
const As = ({ root: e, props: t }) => {
    (t.spin = !1), (t.progress = 0), (t.opacity = 0);
    const i = ei("svg");
    (e.ref.path = ei("path", { "stroke-width": 2, "stroke-linecap": "round" })),
        i.appendChild(e.ref.path),
        (e.ref.svg = i),
        e.appendChild(i);
};
const Ls = ({ root: e, props: t }) => {
    if (t.opacity === 0) return;
    t.align && (e.element.dataset.align = t.align);
    const i = parseInt(ne(e.ref.path, "stroke-width"), 10);
    const a = e.rect.element.width * 0.5;
    let n = 0;
    let r = 0;
    t.spin ? ((n = 0), (r = 0.5)) : ((n = 0), (r = t.progress));
    const l = vs(a, a, a - i, n, r);
    ne(e.ref.path, "d", l),
        ne(e.ref.path, "stroke-opacity", t.spin || t.progress > 0 ? 1 : 0);
};
const Ha = re({
    tag: "div",
    name: "progress-indicator",
    ignoreRectUpdate: !0,
    ignoreRect: !0,
    create: As,
    write: Ls,
    mixins: {
        apis: ["progress", "spin", "align"],
        styles: ["opacity"],
        animations: {
            opacity: { type: "tween", duration: 500 },
            progress: {
                type: "spring",
                stiffness: 0.95,
                damping: 0.65,
                mass: 10,
            },
        },
    },
});
const Ms = ({ root: e, props: t }) => {
    (e.element.innerHTML = (t.icon || "") + `<span>${t.label}</span>`),
        (t.isDisabled = !1);
};
const xs = ({ root: e, props: t }) => {
    const { isDisabled: i } = t;
    const a = e.query("GET_DISABLED") || t.opacity === 0;
    a && !i
        ? ((t.isDisabled = !0), ne(e.element, "disabled", "disabled"))
        : !a &&
          i &&
          ((t.isDisabled = !1), e.element.removeAttribute("disabled"));
};
const Mn = re({
    tag: "button",
    attributes: { type: "button" },
    ignoreRect: !0,
    ignoreRectUpdate: !0,
    name: "file-action-button",
    mixins: {
        apis: ["label"],
        styles: ["translateX", "translateY", "scaleX", "scaleY", "opacity"],
        animations: {
            scaleX: "spring",
            scaleY: "spring",
            translateX: "spring",
            translateY: "spring",
            opacity: { type: "tween", duration: 250 },
        },
        listeners: !0,
    },
    create: Ms,
    write: xs,
});
const xn = (e, t = ".", i = 1e3, a = {}) => {
    const {
        labelBytes: n = "bytes",
        labelKilobytes: r = "KB",
        labelMegabytes: l = "MB",
        labelGigabytes: o = "GB",
    } = a;
    e = Math.round(Math.abs(e));
    const s = i;
    const u = i * i;
    const c = i * i * i;
    return e < s
        ? `${e} ${n}`
        : e < u
          ? `${Math.floor(e / s)} ${r}`
          : e < c
            ? `${Wa(e / u, 1, t)} ${l}`
            : `${Wa(e / c, 2, t)} ${o}`;
};
var Wa = (e, t, i) =>
    e
        .toFixed(t)
        .split(".")
        .filter((a) => a !== "0")
        .join(i);
const Os = ({ root: e, props: t }) => {
    const i = Be("span");
    (i.className = "filepond--file-info-main"),
        ne(i, "aria-hidden", "true"),
        e.appendChild(i),
        (e.ref.fileName = i);
    const a = Be("span");
    (a.className = "filepond--file-info-sub"),
        e.appendChild(a),
        (e.ref.fileSize = a),
        ae(a, e.query("GET_LABEL_FILE_WAITING_FOR_SIZE")),
        ae(i, qi(e.query("GET_ITEM_NAME", t.id)));
};
const xi = ({ root: e, props: t }) => {
    ae(
        e.ref.fileSize,
        xn(
            e.query("GET_ITEM_SIZE", t.id),
            ".",
            e.query("GET_FILE_SIZE_BASE"),
            e.query("GET_FILE_SIZE_LABELS", e.query),
        ),
    ),
        ae(e.ref.fileName, qi(e.query("GET_ITEM_NAME", t.id)));
};
const Ya = ({ root: e, props: t }) => {
    if (pt(e.query("GET_ITEM_SIZE", t.id))) {
        xi({ root: e, props: t });
        return;
    }
    ae(e.ref.fileSize, e.query("GET_LABEL_FILE_SIZE_NOT_AVAILABLE"));
};
const Ps = re({
    name: "file-info",
    ignoreRect: !0,
    ignoreRectUpdate: !0,
    write: ge({
        DID_LOAD_ITEM: xi,
        DID_UPDATE_ITEM_META: xi,
        DID_THROW_ITEM_LOAD_ERROR: Ya,
        DID_THROW_ITEM_INVALID: Ya,
    }),
    didCreateView: (e) => {
        et("CREATE_VIEW", { ...e, view: e });
    },
    create: Os,
    mixins: {
        styles: ["translateX", "translateY"],
        animations: { translateX: "spring", translateY: "spring" },
    },
});
const On = (e) => Math.round(e * 100);
const Ds = ({ root: e }) => {
    const t = Be("span");
    (t.className = "filepond--file-status-main"),
        e.appendChild(t),
        (e.ref.main = t);
    const i = Be("span");
    (i.className = "filepond--file-status-sub"),
        e.appendChild(i),
        (e.ref.sub = i),
        Pn({ root: e, action: { progress: null } });
};
var Pn = ({ root: e, action: t }) => {
    const i =
        t.progress === null
            ? e.query("GET_LABEL_FILE_LOADING")
            : `${e.query("GET_LABEL_FILE_LOADING")} ${On(t.progress)}%`;
    ae(e.ref.main, i), ae(e.ref.sub, e.query("GET_LABEL_TAP_TO_CANCEL"));
};
const Fs = ({ root: e, action: t }) => {
    const i =
        t.progress === null
            ? e.query("GET_LABEL_FILE_PROCESSING")
            : `${e.query("GET_LABEL_FILE_PROCESSING")} ${On(t.progress)}%`;
    ae(e.ref.main, i), ae(e.ref.sub, e.query("GET_LABEL_TAP_TO_CANCEL"));
};
const Cs = ({ root: e }) => {
    ae(e.ref.main, e.query("GET_LABEL_FILE_PROCESSING")),
        ae(e.ref.sub, e.query("GET_LABEL_TAP_TO_CANCEL"));
};
const zs = ({ root: e }) => {
    ae(e.ref.main, e.query("GET_LABEL_FILE_PROCESSING_ABORTED")),
        ae(e.ref.sub, e.query("GET_LABEL_TAP_TO_RETRY"));
};
const Ns = ({ root: e }) => {
    ae(e.ref.main, e.query("GET_LABEL_FILE_PROCESSING_COMPLETE")),
        ae(e.ref.sub, e.query("GET_LABEL_TAP_TO_UNDO"));
};
const qa = ({ root: e }) => {
    ae(e.ref.main, ""), ae(e.ref.sub, "");
};
const Lt = ({ root: e, action: t }) => {
    ae(e.ref.main, t.status.main), ae(e.ref.sub, t.status.sub);
};
const Bs = re({
    name: "file-status",
    ignoreRect: !0,
    ignoreRectUpdate: !0,
    write: ge({
        DID_LOAD_ITEM: qa,
        DID_REVERT_ITEM_PROCESSING: qa,
        DID_REQUEST_ITEM_PROCESSING: Cs,
        DID_ABORT_ITEM_PROCESSING: zs,
        DID_COMPLETE_ITEM_PROCESSING: Ns,
        DID_UPDATE_ITEM_PROCESS_PROGRESS: Fs,
        DID_UPDATE_ITEM_LOAD_PROGRESS: Pn,
        DID_THROW_ITEM_LOAD_ERROR: Lt,
        DID_THROW_ITEM_INVALID: Lt,
        DID_THROW_ITEM_PROCESSING_ERROR: Lt,
        DID_THROW_ITEM_PROCESSING_REVERT_ERROR: Lt,
        DID_THROW_ITEM_REMOVE_ERROR: Lt,
    }),
    didCreateView: (e) => {
        et("CREATE_VIEW", { ...e, view: e });
    },
    create: Ds,
    mixins: {
        styles: ["translateX", "translateY", "opacity"],
        animations: {
            opacity: { type: "tween", duration: 250 },
            translateX: "spring",
            translateY: "spring",
        },
    },
});
const Oi = {
    AbortItemLoad: {
        label: "GET_LABEL_BUTTON_ABORT_ITEM_LOAD",
        action: "ABORT_ITEM_LOAD",
        className: "filepond--action-abort-item-load",
        align: "LOAD_INDICATOR_POSITION",
    },
    RetryItemLoad: {
        label: "GET_LABEL_BUTTON_RETRY_ITEM_LOAD",
        action: "RETRY_ITEM_LOAD",
        icon: "GET_ICON_RETRY",
        className: "filepond--action-retry-item-load",
        align: "BUTTON_PROCESS_ITEM_POSITION",
    },
    RemoveItem: {
        label: "GET_LABEL_BUTTON_REMOVE_ITEM",
        action: "REQUEST_REMOVE_ITEM",
        icon: "GET_ICON_REMOVE",
        className: "filepond--action-remove-item",
        align: "BUTTON_REMOVE_ITEM_POSITION",
    },
    ProcessItem: {
        label: "GET_LABEL_BUTTON_PROCESS_ITEM",
        action: "REQUEST_ITEM_PROCESSING",
        icon: "GET_ICON_PROCESS",
        className: "filepond--action-process-item",
        align: "BUTTON_PROCESS_ITEM_POSITION",
    },
    AbortItemProcessing: {
        label: "GET_LABEL_BUTTON_ABORT_ITEM_PROCESSING",
        action: "ABORT_ITEM_PROCESSING",
        className: "filepond--action-abort-item-processing",
        align: "BUTTON_PROCESS_ITEM_POSITION",
    },
    RetryItemProcessing: {
        label: "GET_LABEL_BUTTON_RETRY_ITEM_PROCESSING",
        action: "RETRY_ITEM_PROCESSING",
        icon: "GET_ICON_RETRY",
        className: "filepond--action-retry-item-processing",
        align: "BUTTON_PROCESS_ITEM_POSITION",
    },
    RevertItemProcessing: {
        label: "GET_LABEL_BUTTON_UNDO_ITEM_PROCESSING",
        action: "REQUEST_REVERT_ITEM_PROCESSING",
        icon: "GET_ICON_UNDO",
        className: "filepond--action-revert-item-processing",
        align: "BUTTON_PROCESS_ITEM_POSITION",
    },
};
const Pi = [];
te(Oi, (e) => {
    Pi.push(e);
});
const _e = (e) => {
    if (Di(e) === "right") return 0;
    const t = e.ref.buttonRemoveItem.rect.element;
    return t.hidden ? null : t.width + t.left;
};
const Vs = (e) => e.ref.buttonAbortItemLoad.rect.element.width;
const Xt = (e) => Math.floor(e.ref.buttonRemoveItem.rect.element.height / 4);
const Gs = (e) => Math.floor(e.ref.buttonRemoveItem.rect.element.left / 2);
const Us = (e) => e.query("GET_STYLE_LOAD_INDICATOR_POSITION");
const ks = (e) => e.query("GET_STYLE_PROGRESS_INDICATOR_POSITION");
var Di = (e) => e.query("GET_STYLE_BUTTON_REMOVE_ITEM_POSITION");
const Hs = {
    buttonAbortItemLoad: { opacity: 0 },
    buttonRetryItemLoad: { opacity: 0 },
    buttonRemoveItem: { opacity: 0 },
    buttonProcessItem: { opacity: 0 },
    buttonAbortItemProcessing: { opacity: 0 },
    buttonRetryItemProcessing: { opacity: 0 },
    buttonRevertItemProcessing: { opacity: 0 },
    loadProgressIndicator: { opacity: 0, align: Us },
    processProgressIndicator: { opacity: 0, align: ks },
    processingCompleteIndicator: { opacity: 0, scaleX: 0.75, scaleY: 0.75 },
    info: { translateX: 0, translateY: 0, opacity: 0 },
    status: { translateX: 0, translateY: 0, opacity: 0 },
};
const $a = {
    buttonRemoveItem: { opacity: 1 },
    buttonProcessItem: { opacity: 1 },
    info: { translateX: _e },
    status: { translateX: _e },
};
const wi = {
    buttonAbortItemProcessing: { opacity: 1 },
    processProgressIndicator: { opacity: 1 },
    status: { opacity: 1 },
};
const ct = {
    DID_THROW_ITEM_INVALID: {
        buttonRemoveItem: { opacity: 1 },
        info: { translateX: _e },
        status: { translateX: _e, opacity: 1 },
    },
    DID_START_ITEM_LOAD: {
        buttonAbortItemLoad: { opacity: 1 },
        loadProgressIndicator: { opacity: 1 },
        status: { opacity: 1 },
    },
    DID_THROW_ITEM_LOAD_ERROR: {
        buttonRetryItemLoad: { opacity: 1 },
        buttonRemoveItem: { opacity: 1 },
        info: { translateX: _e },
        status: { opacity: 1 },
    },
    DID_START_ITEM_REMOVE: {
        processProgressIndicator: { opacity: 1, align: Di },
        info: { translateX: _e },
        status: { opacity: 0 },
    },
    DID_THROW_ITEM_REMOVE_ERROR: {
        processProgressIndicator: { opacity: 0, align: Di },
        buttonRemoveItem: { opacity: 1 },
        info: { translateX: _e },
        status: { opacity: 1, translateX: _e },
    },
    DID_LOAD_ITEM: $a,
    DID_LOAD_LOCAL_ITEM: {
        buttonRemoveItem: { opacity: 1 },
        info: { translateX: _e },
        status: { translateX: _e },
    },
    DID_START_ITEM_PROCESSING: wi,
    DID_REQUEST_ITEM_PROCESSING: wi,
    DID_UPDATE_ITEM_PROCESS_PROGRESS: wi,
    DID_COMPLETE_ITEM_PROCESSING: {
        buttonRevertItemProcessing: { opacity: 1 },
        info: { opacity: 1 },
        status: { opacity: 1 },
    },
    DID_THROW_ITEM_PROCESSING_ERROR: {
        buttonRemoveItem: { opacity: 1 },
        buttonRetryItemProcessing: { opacity: 1 },
        status: { opacity: 1 },
        info: { translateX: _e },
    },
    DID_THROW_ITEM_PROCESSING_REVERT_ERROR: {
        buttonRevertItemProcessing: { opacity: 1 },
        status: { opacity: 1 },
        info: { opacity: 1 },
    },
    DID_ABORT_ITEM_PROCESSING: {
        buttonRemoveItem: { opacity: 1 },
        buttonProcessItem: { opacity: 1 },
        info: { translateX: _e },
        status: { opacity: 1 },
    },
    DID_REVERT_ITEM_PROCESSING: $a,
};
const Ws = re({
    create: ({ root: e }) => {
        e.element.innerHTML = e.query("GET_ICON_DONE");
    },
    name: "processing-complete-indicator",
    ignoreRect: !0,
    mixins: {
        styles: ["scaleX", "scaleY", "opacity"],
        animations: {
            scaleX: "spring",
            scaleY: "spring",
            opacity: { type: "tween", duration: 250 },
        },
    },
});
const Ys = ({ root: e, props: t }) => {
    const i = Object.keys(Oi).reduce((p, f) => ((p[f] = { ...Oi[f] }), p), {});
    const { id: a } = t;
    const n = e.query("GET_ALLOW_REVERT");
    const r = e.query("GET_ALLOW_REMOVE");
    const l = e.query("GET_ALLOW_PROCESS");
    const o = e.query("GET_INSTANT_UPLOAD");
    const s = e.query("IS_ASYNC");
    const u = e.query("GET_STYLE_BUTTON_REMOVE_ITEM_ALIGN");
    let c;
    s
        ? l && !n
            ? (c = (p) => !/RevertItemProcessing/.test(p))
            : !l && n
              ? (c = (p) =>
                    !/ProcessItem|RetryItemProcessing|AbortItemProcessing/.test(
                        p,
                    ))
              : !l && !n && (c = (p) => !/Process/.test(p))
        : (c = (p) => !/Process/.test(p));
    const d = c ? Pi.filter(c) : Pi.concat();
    if (
        (o &&
            n &&
            ((i.RevertItemProcessing.label = "GET_LABEL_BUTTON_REMOVE_ITEM"),
            (i.RevertItemProcessing.icon = "GET_ICON_REMOVE")),
        s && !n)
    ) {
        const p = ct.DID_COMPLETE_ITEM_PROCESSING;
        (p.info.translateX = Gs),
            (p.info.translateY = Xt),
            (p.status.translateY = Xt),
            (p.processingCompleteIndicator = {
                opacity: 1,
                scaleX: 1,
                scaleY: 1,
            });
    }
    if (
        (s &&
            !l &&
            ([
                "DID_START_ITEM_PROCESSING",
                "DID_REQUEST_ITEM_PROCESSING",
                "DID_UPDATE_ITEM_PROCESS_PROGRESS",
                "DID_THROW_ITEM_PROCESSING_ERROR",
            ].forEach((p) => {
                ct[p].status.translateY = Xt;
            }),
            (ct.DID_THROW_ITEM_PROCESSING_ERROR.status.translateX = Vs)),
        u && n)
    ) {
        i.RevertItemProcessing.align = "BUTTON_REMOVE_ITEM_POSITION";
        const p = ct.DID_COMPLETE_ITEM_PROCESSING;
        (p.info.translateX = _e),
            (p.status.translateY = Xt),
            (p.processingCompleteIndicator = {
                opacity: 1,
                scaleX: 1,
                scaleY: 1,
            });
    }
    r || (i.RemoveItem.disabled = !0),
        te(i, (p, f) => {
            const g = e.createChildView(Mn, {
                label: e.query(f.label),
                icon: e.query(f.icon),
                opacity: 0,
            });
            d.includes(p) && e.appendChildView(g),
                f.disabled &&
                    (g.element.setAttribute("disabled", "disabled"),
                    g.element.setAttribute("hidden", "hidden")),
                (g.element.dataset.align = e.query(`GET_STYLE_${f.align}`)),
                g.element.classList.add(f.className),
                g.on("click", (I) => {
                    I.stopPropagation(),
                        !f.disabled && e.dispatch(f.action, { query: a });
                }),
                (e.ref[`button${p}`] = g);
        }),
        (e.ref.processingCompleteIndicator = e.appendChildView(
            e.createChildView(Ws),
        )),
        (e.ref.processingCompleteIndicator.element.dataset.align = e.query(
            "GET_STYLE_BUTTON_PROCESS_ITEM_POSITION",
        )),
        (e.ref.info = e.appendChildView(e.createChildView(Ps, { id: a }))),
        (e.ref.status = e.appendChildView(e.createChildView(Bs, { id: a })));
    const h = e.appendChildView(
        e.createChildView(Ha, {
            opacity: 0,
            align: e.query("GET_STYLE_LOAD_INDICATOR_POSITION"),
        }),
    );
    h.element.classList.add("filepond--load-indicator"),
        (e.ref.loadProgressIndicator = h);
    const m = e.appendChildView(
        e.createChildView(Ha, {
            opacity: 0,
            align: e.query("GET_STYLE_PROGRESS_INDICATOR_POSITION"),
        }),
    );
    m.element.classList.add("filepond--process-indicator"),
        (e.ref.processProgressIndicator = m),
        (e.ref.activeStyles = []);
};
const qs = ({ root: e, actions: t, props: i }) => {
    $s({ root: e, actions: t, props: i });
    const a = t
        .concat()
        .filter((n) => /^DID_/.test(n.type))
        .reverse()
        .find((n) => ct[n.type]);
    if (a) {
        e.ref.activeStyles = [];
        const n = ct[a.type];
        te(Hs, (r, l) => {
            const o = e.ref[r];
            te(l, (s, u) => {
                const c = n[r] && typeof n[r][s] < "u" ? n[r][s] : u;
                e.ref.activeStyles.push({ control: o, key: s, value: c });
            });
        });
    }
    e.ref.activeStyles.forEach(({ control: n, key: r, value: l }) => {
        n[r] = typeof l === "function" ? l(e) : l;
    });
};
var $s = ge({
    DID_SET_LABEL_BUTTON_ABORT_ITEM_PROCESSING: ({ root: e, action: t }) => {
        e.ref.buttonAbortItemProcessing.label = t.value;
    },
    DID_SET_LABEL_BUTTON_ABORT_ITEM_LOAD: ({ root: e, action: t }) => {
        e.ref.buttonAbortItemLoad.label = t.value;
    },
    DID_SET_LABEL_BUTTON_ABORT_ITEM_REMOVAL: ({ root: e, action: t }) => {
        e.ref.buttonAbortItemRemoval.label = t.value;
    },
    DID_REQUEST_ITEM_PROCESSING: ({ root: e }) => {
        (e.ref.processProgressIndicator.spin = !0),
            (e.ref.processProgressIndicator.progress = 0);
    },
    DID_START_ITEM_LOAD: ({ root: e }) => {
        (e.ref.loadProgressIndicator.spin = !0),
            (e.ref.loadProgressIndicator.progress = 0);
    },
    DID_START_ITEM_REMOVE: ({ root: e }) => {
        (e.ref.processProgressIndicator.spin = !0),
            (e.ref.processProgressIndicator.progress = 0);
    },
    DID_UPDATE_ITEM_LOAD_PROGRESS: ({ root: e, action: t }) => {
        (e.ref.loadProgressIndicator.spin = !1),
            (e.ref.loadProgressIndicator.progress = t.progress);
    },
    DID_UPDATE_ITEM_PROCESS_PROGRESS: ({ root: e, action: t }) => {
        (e.ref.processProgressIndicator.spin = !1),
            (e.ref.processProgressIndicator.progress = t.progress);
    },
});
const js = re({
    create: Ys,
    write: qs,
    didCreateView: (e) => {
        et("CREATE_VIEW", { ...e, view: e });
    },
    name: "file",
});
const Xs = ({ root: e, props: t }) => {
    (e.ref.fileName = Be("legend")),
        e.appendChild(e.ref.fileName),
        (e.ref.file = e.appendChildView(e.createChildView(js, { id: t.id }))),
        (e.ref.data = !1);
};
const Qs = ({ root: e, props: t }) => {
    ae(e.ref.fileName, qi(e.query("GET_ITEM_NAME", t.id)));
};
const Ks = re({
    create: Xs,
    ignoreRect: !0,
    write: ge({ DID_LOAD_ITEM: Qs }),
    didCreateView: (e) => {
        et("CREATE_VIEW", { ...e, view: e });
    },
    tag: "fieldset",
    name: "file-wrapper",
});
const ja = { type: "spring", damping: 0.6, mass: 7 };
const Zs = ({ root: e, props: t }) => {
    [
        { name: "top" },
        {
            name: "center",
            props: { translateY: null, scaleY: null },
            mixins: {
                animations: { scaleY: ja },
                styles: ["translateY", "scaleY"],
            },
        },
        {
            name: "bottom",
            props: { translateY: null },
            mixins: { animations: { translateY: ja }, styles: ["translateY"] },
        },
    ].forEach((i) => {
        Js(e, i, t.name);
    }),
        e.element.classList.add(`filepond--${t.name}`),
        (e.ref.scalable = null);
};
var Js = (e, t, i) => {
    const a = re({
        name: `panel-${t.name} filepond--${i}`,
        mixins: t.mixins,
        ignoreRectUpdate: !0,
    });
    const n = e.createChildView(a, t.props);
    e.ref[t.name] = e.appendChildView(n);
};
const ec = ({ root: e, props: t }) => {
    if (
        ((e.ref.scalable === null || t.scalable !== e.ref.scalable) &&
            ((e.ref.scalable = mn(t.scalable) ? t.scalable : !0),
            (e.element.dataset.scalable = e.ref.scalable)),
        !t.height)
    ) {
        return;
    }
    const i = e.ref.top.rect.element;
    const a = e.ref.bottom.rect.element;
    const n = Math.max(i.height + a.height, t.height);
    (e.ref.center.translateY = i.height),
        (e.ref.center.scaleY = (n - i.height - a.height) / 100),
        (e.ref.bottom.translateY = n - a.height);
};
const Dn = re({
    name: "panel",
    read: ({ root: e, props: t }) =>
        (t.heightCurrent = e.ref.bottom.translateY),
    write: ec,
    create: Zs,
    ignoreRect: !0,
    mixins: { apis: ["height", "heightCurrent", "scalable"] },
});
const tc = (e) => {
    const t = e.map((a) => a.id);
    let i;
    return {
        setIndex: (a) => {
            i = a;
        },
        getIndex: () => i,
        getItemIndex: (a) => t.indexOf(a.id),
    };
};
const Xa = { type: "spring", stiffness: 0.75, damping: 0.45, mass: 10 };
const Qa = "spring";
const Ka = {
    DID_START_ITEM_LOAD: "busy",
    DID_UPDATE_ITEM_LOAD_PROGRESS: "loading",
    DID_THROW_ITEM_INVALID: "load-invalid",
    DID_THROW_ITEM_LOAD_ERROR: "load-error",
    DID_LOAD_ITEM: "idle",
    DID_THROW_ITEM_REMOVE_ERROR: "remove-error",
    DID_START_ITEM_REMOVE: "busy",
    DID_START_ITEM_PROCESSING: "busy processing",
    DID_REQUEST_ITEM_PROCESSING: "busy processing",
    DID_UPDATE_ITEM_PROCESS_PROGRESS: "processing",
    DID_COMPLETE_ITEM_PROCESSING: "processing-complete",
    DID_THROW_ITEM_PROCESSING_ERROR: "processing-error",
    DID_THROW_ITEM_PROCESSING_REVERT_ERROR: "processing-revert-error",
    DID_ABORT_ITEM_PROCESSING: "cancelled",
    DID_REVERT_ITEM_PROCESSING: "idle",
};
const ic = ({ root: e, props: t }) => {
    if (
        ((e.ref.handleClick = (a) =>
            e.dispatch("DID_ACTIVATE_ITEM", { id: t.id })),
        (e.element.id = `filepond--item-${t.id}`),
        e.element.addEventListener("click", e.ref.handleClick),
        (e.ref.container = e.appendChildView(
            e.createChildView(Ks, { id: t.id }),
        )),
        (e.ref.panel = e.appendChildView(
            e.createChildView(Dn, { name: "item-panel" }),
        )),
        (e.ref.panel.height = null),
        (t.markedForRemoval = !1),
        !e.query("GET_ALLOW_REORDER"))
    ) {
        return;
    }
    e.element.dataset.dragState = "idle";
    const i = (a) => {
        if (!a.isPrimary) return;
        let n = !1;
        const r = { x: a.pageX, y: a.pageY };
        (t.dragOrigin = { x: e.translateX, y: e.translateY }),
            (t.dragCenter = { x: a.offsetX, y: a.offsetY });
        const l = tc(e.query("GET_ACTIVE_ITEMS"));
        e.dispatch("DID_GRAB_ITEM", { id: t.id, dragState: l });
        const o = (d) => {
            if (!d.isPrimary) return;
            d.stopPropagation(),
                d.preventDefault(),
                (t.dragOffset = { x: d.pageX - r.x, y: d.pageY - r.y }),
                t.dragOffset.x * t.dragOffset.x +
                    t.dragOffset.y * t.dragOffset.y >
                    16 &&
                    !n &&
                    ((n = !0),
                    e.element.removeEventListener("click", e.ref.handleClick)),
                e.dispatch("DID_DRAG_ITEM", { id: t.id, dragState: l });
        };
        const s = (d) => {
            d.isPrimary &&
                ((t.dragOffset = { x: d.pageX - r.x, y: d.pageY - r.y }), c());
        };
        const u = () => {
            c();
        };
        const c = () => {
            document.removeEventListener("pointercancel", u),
                document.removeEventListener("pointermove", o),
                document.removeEventListener("pointerup", s),
                e.dispatch("DID_DROP_ITEM", { id: t.id, dragState: l }),
                n &&
                    setTimeout(
                        () =>
                            e.element.addEventListener(
                                "click",
                                e.ref.handleClick,
                            ),
                        0,
                    );
        };
        document.addEventListener("pointercancel", u),
            document.addEventListener("pointermove", o),
            document.addEventListener("pointerup", s);
    };
    e.element.addEventListener("pointerdown", i);
};
const ac = ge({
    DID_UPDATE_PANEL_HEIGHT: ({ root: e, action: t }) => {
        e.height = t.height;
    },
});
const nc = ge(
    {
        DID_GRAB_ITEM: ({ root: e, props: t }) => {
            t.dragOrigin = { x: e.translateX, y: e.translateY };
        },
        DID_DRAG_ITEM: ({ root: e }) => {
            e.element.dataset.dragState = "drag";
        },
        DID_DROP_ITEM: ({ root: e, props: t }) => {
            (t.dragOffset = null),
                (t.dragOrigin = null),
                (e.element.dataset.dragState = "drop");
        },
    },
    ({ root: e, actions: t, props: i, shouldOptimize: a }) => {
        e.element.dataset.dragState === "drop" &&
            e.scaleX <= 1 &&
            (e.element.dataset.dragState = "idle");
        const n = t
            .concat()
            .filter((l) => /^DID_/.test(l.type))
            .reverse()
            .find((l) => Ka[l.type]);
        n &&
            n.type !== i.currentState &&
            ((i.currentState = n.type),
            (e.element.dataset.filepondItemState = Ka[i.currentState] || ""));
        const r =
            e.query("GET_ITEM_PANEL_ASPECT_RATIO") ||
            e.query("GET_PANEL_ASPECT_RATIO");
        r
            ? a || (e.height = e.rect.element.width * r)
            : (ac({ root: e, actions: t, props: i }),
              !e.height &&
                  e.ref.container.rect.element.height > 0 &&
                  (e.height = e.ref.container.rect.element.height)),
            a && (e.ref.panel.height = null),
            (e.ref.panel.height = e.height);
    },
);
const rc = re({
    create: ic,
    write: nc,
    destroy: ({ root: e, props: t }) => {
        e.element.removeEventListener("click", e.ref.handleClick),
            e.dispatch("RELEASE_ITEM", { query: t.id });
    },
    tag: "li",
    name: "item",
    mixins: {
        apis: [
            "id",
            "interactionMethod",
            "markedForRemoval",
            "spawnDate",
            "dragCenter",
            "dragOrigin",
            "dragOffset",
        ],
        styles: [
            "translateX",
            "translateY",
            "scaleX",
            "scaleY",
            "opacity",
            "height",
        ],
        animations: {
            scaleX: Qa,
            scaleY: Qa,
            translateX: Xa,
            translateY: Xa,
            opacity: { type: "tween", duration: 150 },
        },
    },
});
const $i = (e, t) => Math.max(1, Math.floor((e + 1) / t));
const ji = (e, t, i) => {
    if (!i) return;
    const a = e.rect.element.width;
    const n = t.length;
    let r = null;
    if (n === 0 || i.top < t[0].rect.element.top) return -1;
    const o = t[0].rect.element;
    const s = o.marginLeft + o.marginRight;
    const u = o.width + s;
    const c = $i(a, u);
    if (c === 1) {
        for (let m = 0; m < n; m++) {
            const p = t[m];
            const f = p.rect.outer.top + p.rect.element.height * 0.5;
            if (i.top < f) return m;
        }
        return n;
    }
    const d = o.marginTop + o.marginBottom;
    const h = o.height + d;
    for (let m = 0; m < n; m++) {
        const p = m % c;
        const f = Math.floor(m / c);
        const g = p * u;
        const I = f * h;
        const E = I - o.marginTop;
        const T = g + u;
        const _ = I + h + o.marginBottom;
        if (i.top < _ && i.top > E) {
            if (i.left < T) return m;
            m !== n - 1 ? (r = m) : (r = null);
        }
    }
    return r !== null ? r : n;
};
const Qt = {
    height: 0,
    width: 0,
    get getHeight() {
        return this.height;
    },
    set setHeight(e) {
        (this.height === 0 || e === 0) && (this.height = e);
    },
    get getWidth() {
        return this.width;
    },
    set setWidth(e) {
        (this.width === 0 || e === 0) && (this.width = e);
    },
    setDimensions: function (e, t) {
        (this.height === 0 || e === 0) && (this.height = e),
            (this.width === 0 || t === 0) && (this.width = t);
    },
};
const lc = ({ root: e }) => {
    ne(e.element, "role", "list"), (e.ref.lastItemSpanwDate = Date.now());
};
const oc = ({ root: e, action: t }) => {
    const { id: i, index: a, interactionMethod: n } = t;
    e.ref.addIndex = a;
    const r = Date.now();
    let l = r;
    let o = 1;
    if (n !== Se.NONE) {
        o = 0;
        const s = e.query("GET_ITEM_INSERT_INTERVAL");
        const u = r - e.ref.lastItemSpanwDate;
        l = u < s ? r + (s - u) : r;
    }
    (e.ref.lastItemSpanwDate = l),
        e.appendChildView(
            e.createChildView(rc, {
                spawnDate: l,
                id: i,
                opacity: o,
                interactionMethod: n,
            }),
            a,
        );
};
const Za = (e, t, i, a = 0, n = 1) => {
    e.dragOffset
        ? ((e.translateX = null),
          (e.translateY = null),
          (e.translateX = e.dragOrigin.x + e.dragOffset.x),
          (e.translateY = e.dragOrigin.y + e.dragOffset.y),
          (e.scaleX = 1.025),
          (e.scaleY = 1.025))
        : ((e.translateX = t),
          (e.translateY = i),
          Date.now() > e.spawnDate &&
              (e.opacity === 0 && sc(e, t, i, a, n),
              (e.scaleX = 1),
              (e.scaleY = 1),
              (e.opacity = 1)));
};
var sc = (e, t, i, a, n) => {
    e.interactionMethod === Se.NONE
        ? ((e.translateX = null),
          (e.translateX = t),
          (e.translateY = null),
          (e.translateY = i))
        : e.interactionMethod === Se.DROP
          ? ((e.translateX = null),
            (e.translateX = t - a * 20),
            (e.translateY = null),
            (e.translateY = i - n * 10),
            (e.scaleX = 0.8),
            (e.scaleY = 0.8))
          : e.interactionMethod === Se.BROWSE
            ? ((e.translateY = null), (e.translateY = i - 30))
            : e.interactionMethod === Se.API &&
              ((e.translateX = null),
              (e.translateX = t - 30),
              (e.translateY = null));
};
const cc = ({ root: e, action: t }) => {
    const { id: i } = t;
    const a = e.childViews.find((n) => n.id === i);
    a &&
        ((a.scaleX = 0.9),
        (a.scaleY = 0.9),
        (a.opacity = 0),
        (a.markedForRemoval = !0));
};
const vi = (e) =>
    e.rect.element.height +
    e.rect.element.marginBottom * 0.5 +
    e.rect.element.marginTop * 0.5;
const dc = (e) =>
    e.rect.element.width +
    e.rect.element.marginLeft * 0.5 +
    e.rect.element.marginRight * 0.5;
const uc = ({ root: e, action: t }) => {
    const { id: i, dragState: a } = t;
    const n = e.query("GET_ITEM", { id: i });
    const r = e.childViews.find((g) => g.id === i);
    const l = e.childViews.length;
    const o = a.getItemIndex(n);
    if (!r) return;
    const s = {
        x: r.dragOrigin.x + r.dragOffset.x + r.dragCenter.x,
        y: r.dragOrigin.y + r.dragOffset.y + r.dragCenter.y,
    };
    const u = vi(r);
    const c = dc(r);
    let d = Math.floor(e.rect.outer.width / c);
    d > l && (d = l);
    const h = Math.floor(l / d + 1);
    (Qt.setHeight = u * h), (Qt.setWidth = c * d);
    const m = {
        y: Math.floor(s.y / u),
        x: Math.floor(s.x / c),
        getGridIndex: function () {
            return s.y > Qt.getHeight || s.y < 0 || s.x > Qt.getWidth || s.x < 0
                ? o
                : this.y * d + this.x;
        },
        getColIndex: function () {
            const I = e.query("GET_ACTIVE_ITEMS");
            const E = e.childViews.filter((O) => O.rect.element.height);
            const T = I.map((O) => E.find((x) => x.id === O.id));
            const _ = T.findIndex((O) => O === r);
            const y = vi(r);
            const b = T.length;
            let A = b;
            let R = 0;
            let S = 0;
            let P = 0;
            for (let O = 0; O < b; O++) {
                if (((R = vi(T[O])), (P = S), (S = P + R), s.y < S)) {
                    if (_ > O) {
                        if (s.y < P + y) {
                            A = O;
                            break;
                        }
                        continue;
                    }
                    A = O;
                    break;
                }
            }
            return A;
        },
    };
    const p = d > 1 ? m.getGridIndex() : m.getColIndex();
    e.dispatch("MOVE_ITEM", { query: r, index: p });
    const f = a.getIndex();
    if (f === void 0 || f !== p) {
        if ((a.setIndex(p), f === void 0)) return;
        e.dispatch("DID_REORDER_ITEMS", {
            items: e.query("GET_ACTIVE_ITEMS"),
            origin: o,
            target: p,
        });
    }
};
const hc = ge({ DID_ADD_ITEM: oc, DID_REMOVE_ITEM: cc, DID_DRAG_ITEM: uc });
const mc = ({ root: e, props: t, actions: i, shouldOptimize: a }) => {
    hc({ root: e, props: t, actions: i });
    const { dragCoordinates: n } = t;
    const r = e.rect.element.width;
    const l = e.childViews.filter((T) => T.rect.element.height);
    const o = e
        .query("GET_ACTIVE_ITEMS")
        .map((T) => l.find((_) => _.id === T.id))
        .filter((T) => T);
    const s = n ? ji(e, o, n) : null;
    const u = e.ref.addIndex || null;
    e.ref.addIndex = null;
    let c = 0;
    let d = 0;
    let h = 0;
    if (o.length === 0) return;
    const m = o[0].rect.element;
    const p = m.marginTop + m.marginBottom;
    const f = m.marginLeft + m.marginRight;
    const g = m.width + f;
    const I = m.height + p;
    const E = $i(r, g);
    if (E === 1) {
        let T = 0;
        let _ = 0;
        o.forEach((y, b) => {
            if (s) {
                const S = b - s;
                S === -2
                    ? (_ = -p * 0.25)
                    : S === -1
                      ? (_ = -p * 0.75)
                      : S === 0
                        ? (_ = p * 0.75)
                        : S === 1
                          ? (_ = p * 0.25)
                          : (_ = 0);
            }
            a && ((y.translateX = null), (y.translateY = null)),
                y.markedForRemoval || Za(y, 0, T + _);
            const R =
                (y.rect.element.height + p) *
                (y.markedForRemoval ? y.opacity : 1);
            T += R;
        });
    } else {
        let T = 0;
        let _ = 0;
        o.forEach((y, b) => {
            b === s && (c = 1),
                b === u && (h += 1),
                y.markedForRemoval && y.opacity < 0.5 && (d -= 1);
            const A = b + h + c + d;
            const R = A % E;
            const S = Math.floor(A / E);
            const P = R * g;
            const O = S * I;
            const x = Math.sign(P - T);
            const z = Math.sign(O - _);
            (T = P),
                (_ = O),
                !y.markedForRemoval &&
                    (a && ((y.translateX = null), (y.translateY = null)),
                    Za(y, P, O, x, z));
        });
    }
};
const pc = (e, t) =>
    t.filter((i) => (i.data && i.data.id ? e.id === i.data.id : !0));
const fc = re({
    create: lc,
    write: mc,
    tag: "ul",
    name: "list",
    didWriteView: ({ root: e }) => {
        e.childViews
            .filter((t) => t.markedForRemoval && t.opacity === 0 && t.resting)
            .forEach((t) => {
                t._destroy(), e.removeChildView(t);
            });
    },
    filterFrameActionsForChild: pc,
    mixins: { apis: ["dragCoordinates"] },
});
const gc = ({ root: e, props: t }) => {
    (e.ref.list = e.appendChildView(e.createChildView(fc))),
        (t.dragCoordinates = null),
        (t.overflowing = !1);
};
const Ec = ({ root: e, props: t, action: i }) => {
    e.query("GET_ITEM_INSERT_LOCATION_FREEDOM") &&
        (t.dragCoordinates = {
            left: i.position.scopeLeft - e.ref.list.rect.element.left,
            top:
                i.position.scopeTop -
                (e.rect.outer.top +
                    e.rect.element.marginTop +
                    e.rect.element.scrollTop),
        });
};
const Tc = ({ props: e }) => {
    e.dragCoordinates = null;
};
const bc = ge({ DID_DRAG: Ec, DID_END_DRAG: Tc });
const Ic = ({ root: e, props: t, actions: i }) => {
    if (
        (bc({ root: e, props: t, actions: i }),
        (e.ref.list.dragCoordinates = t.dragCoordinates),
        t.overflowing &&
            !t.overflow &&
            ((t.overflowing = !1),
            (e.element.dataset.state = ""),
            (e.height = null)),
        t.overflow)
    ) {
        const a = Math.round(t.overflow);
        a !== e.height &&
            ((t.overflowing = !0),
            (e.element.dataset.state = "overflow"),
            (e.height = a));
    }
};
const _c = re({
    create: gc,
    write: Ic,
    name: "list-scroller",
    mixins: {
        apis: ["overflow", "dragCoordinates"],
        styles: ["height", "translateY"],
        animations: { translateY: "spring" },
    },
});
const xe = (e, t, i, a = "") => {
    i ? ne(e, t, a) : e.removeAttribute(t);
};
const Rc = (e) => {
    if (!(!e || e.value === "")) {
        try {
            e.value = "";
        } catch {}
        if (e.value) {
            const t = Be("form");
            const i = e.parentNode;
            const a = e.nextSibling;
            t.appendChild(e),
                t.reset(),
                a ? i.insertBefore(e, a) : i.appendChild(e);
        }
    }
};
const yc = ({ root: e, props: t }) => {
    (e.element.id = `filepond--browser-${t.id}`),
        ne(e.element, "name", e.query("GET_NAME")),
        ne(e.element, "aria-controls", `filepond--assistant-${t.id}`),
        ne(e.element, "aria-labelledby", `filepond--drop-label-${t.id}`),
        Fn({ root: e, action: { value: e.query("GET_ACCEPTED_FILE_TYPES") } }),
        Cn({ root: e, action: { value: e.query("GET_ALLOW_MULTIPLE") } }),
        zn({
            root: e,
            action: { value: e.query("GET_ALLOW_DIRECTORIES_ONLY") },
        }),
        Fi({ root: e }),
        Nn({ root: e, action: { value: e.query("GET_REQUIRED") } }),
        Bn({ root: e, action: { value: e.query("GET_CAPTURE_METHOD") } }),
        (e.ref.handleChange = (i) => {
            if (!e.element.value) return;
            const a = Array.from(e.element.files).map(
                (n) => ((n._relativePath = n.webkitRelativePath), n),
            );
            setTimeout(() => {
                t.onload(a), Rc(e.element);
            }, 250);
        }),
        e.element.addEventListener("change", e.ref.handleChange);
};
var Fn = ({ root: e, action: t }) => {
    e.query("GET_ALLOW_SYNC_ACCEPT_ATTRIBUTE") &&
        xe(e.element, "accept", !!t.value, t.value ? t.value.join(",") : "");
};
var Cn = ({ root: e, action: t }) => {
    xe(e.element, "multiple", t.value);
};
var zn = ({ root: e, action: t }) => {
    xe(e.element, "webkitdirectory", t.value);
};
var Fi = ({ root: e }) => {
    const t = e.query("GET_DISABLED");
    const i = e.query("GET_ALLOW_BROWSE");
    const a = t || !i;
    xe(e.element, "disabled", a);
};
var Nn = ({ root: e, action: t }) => {
    t.value
        ? e.query("GET_TOTAL_ITEMS") === 0 && xe(e.element, "required", !0)
        : xe(e.element, "required", !1);
};
var Bn = ({ root: e, action: t }) => {
    xe(e.element, "capture", !!t.value, t.value === !0 ? "" : t.value);
};
const Ja = ({ root: e }) => {
    const { element: t } = e;
    e.query("GET_TOTAL_ITEMS") > 0
        ? (xe(t, "required", !1), xe(t, "name", !1))
        : (xe(t, "name", !0, e.query("GET_NAME")),
          e.query("GET_CHECK_VALIDITY") && t.setCustomValidity(""),
          e.query("GET_REQUIRED") && xe(t, "required", !0));
};
const Sc = ({ root: e }) => {
    e.query("GET_CHECK_VALIDITY") &&
        e.element.setCustomValidity(e.query("GET_LABEL_INVALID_FIELD"));
};
const wc = re({
    tag: "input",
    name: "browser",
    ignoreRect: !0,
    ignoreRectUpdate: !0,
    attributes: { type: "file" },
    create: yc,
    destroy: ({ root: e }) => {
        e.element.removeEventListener("change", e.ref.handleChange);
    },
    write: ge({
        DID_LOAD_ITEM: Ja,
        DID_REMOVE_ITEM: Ja,
        DID_THROW_ITEM_INVALID: Sc,
        DID_SET_DISABLED: Fi,
        DID_SET_ALLOW_BROWSE: Fi,
        DID_SET_ALLOW_DIRECTORIES_ONLY: zn,
        DID_SET_ALLOW_MULTIPLE: Cn,
        DID_SET_ACCEPTED_FILE_TYPES: Fn,
        DID_SET_CAPTURE_METHOD: Bn,
        DID_SET_REQUIRED: Nn,
    }),
});
const en = { ENTER: 13, SPACE: 32 };
const vc = ({ root: e, props: t }) => {
    const i = Be("label");
    ne(i, "for", `filepond--browser-${t.id}`),
        ne(i, "id", `filepond--drop-label-${t.id}`),
        ne(i, "aria-hidden", "true"),
        (e.ref.handleKeyDown = (a) => {
            (a.keyCode === en.ENTER || a.keyCode === en.SPACE) &&
                (a.preventDefault(), e.ref.label.click());
        }),
        (e.ref.handleClick = (a) => {
            a.target === i || i.contains(a.target) || e.ref.label.click();
        }),
        i.addEventListener("keydown", e.ref.handleKeyDown),
        e.element.addEventListener("click", e.ref.handleClick),
        Vn(i, t.caption),
        e.appendChild(i),
        (e.ref.label = i);
};
var Vn = (e, t) => {
    e.innerHTML = t;
    const i = e.querySelector(".filepond--label-action");
    return i && ne(i, "tabindex", "0"), t;
};
const Ac = re({
    name: "drop-label",
    ignoreRect: !0,
    create: vc,
    destroy: ({ root: e }) => {
        e.ref.label.addEventListener("keydown", e.ref.handleKeyDown),
            e.element.removeEventListener("click", e.ref.handleClick);
    },
    write: ge({
        DID_SET_LABEL_IDLE: ({ root: e, action: t }) => {
            Vn(e.ref.label, t.value);
        },
    }),
    mixins: {
        styles: ["opacity", "translateX", "translateY"],
        animations: {
            opacity: { type: "tween", duration: 150 },
            translateX: "spring",
            translateY: "spring",
        },
    },
});
const Lc = re({
    name: "drip-blob",
    ignoreRect: !0,
    mixins: {
        styles: ["translateX", "translateY", "scaleX", "scaleY", "opacity"],
        animations: {
            scaleX: "spring",
            scaleY: "spring",
            translateX: "spring",
            translateY: "spring",
            opacity: { type: "tween", duration: 250 },
        },
    },
});
const Mc = ({ root: e }) => {
    const t = e.rect.element.width * 0.5;
    const i = e.rect.element.height * 0.5;
    e.ref.blob = e.appendChildView(
        e.createChildView(Lc, {
            opacity: 0,
            scaleX: 2.5,
            scaleY: 2.5,
            translateX: t,
            translateY: i,
        }),
    );
};
const xc = ({ root: e, action: t }) => {
    if (!e.ref.blob) {
        Mc({ root: e });
        return;
    }
    (e.ref.blob.translateX = t.position.scopeLeft),
        (e.ref.blob.translateY = t.position.scopeTop),
        (e.ref.blob.scaleX = 1),
        (e.ref.blob.scaleY = 1),
        (e.ref.blob.opacity = 1);
};
const Oc = ({ root: e }) => {
    e.ref.blob && (e.ref.blob.opacity = 0);
};
const Pc = ({ root: e }) => {
    e.ref.blob &&
        ((e.ref.blob.scaleX = 2.5),
        (e.ref.blob.scaleY = 2.5),
        (e.ref.blob.opacity = 0));
};
const Dc = ({ root: e, props: t, actions: i }) => {
    Fc({ root: e, props: t, actions: i });
    const { blob: a } = e.ref;
    i.length === 0 &&
        a &&
        a.opacity === 0 &&
        (e.removeChildView(a), (e.ref.blob = null));
};
var Fc = ge({ DID_DRAG: xc, DID_DROP: Pc, DID_END_DRAG: Oc });
const Cc = re({
    ignoreRect: !0,
    ignoreRectUpdate: !0,
    name: "drip",
    write: Dc,
});
const Gn = (e, t) => {
    try {
        const i = new DataTransfer();
        t.forEach((a) => {
            a instanceof File
                ? i.items.add(a)
                : i.items.add(new File([a], a.name, { type: a.type }));
        }),
            (e.files = i.files);
    } catch {
        return !1;
    }
    return !0;
};
const zc = ({ root: e }) => (e.ref.fields = {});
const ci = (e, t) => e.ref.fields[t];
const Xi = (e) => {
    e.query("GET_ACTIVE_ITEMS").forEach((t) => {
        e.ref.fields[t.id] && e.element.appendChild(e.ref.fields[t.id]);
    });
};
const tn = ({ root: e }) => Xi(e);
const Nc = ({ root: e, action: t }) => {
    const n =
        !(e.query("GET_ITEM", t.id).origin === se.LOCAL) &&
        e.query("SHOULD_UPDATE_FILE_INPUT");
    const r = Be("input");
    (r.type = n ? "file" : "hidden"),
        (r.name = e.query("GET_NAME")),
        (r.disabled = e.query("GET_DISABLED")),
        (e.ref.fields[t.id] = r),
        Xi(e);
};
const Bc = ({ root: e, action: t }) => {
    const i = ci(e, t.id);
    if (
        !i ||
        (t.serverFileReference !== null && (i.value = t.serverFileReference),
        !e.query("SHOULD_UPDATE_FILE_INPUT"))
    ) {
        return;
    }
    const a = e.query("GET_ITEM", t.id);
    Gn(i, [a.file]);
};
const Vc = ({ root: e, action: t }) => {
    e.query("SHOULD_UPDATE_FILE_INPUT") &&
        setTimeout(() => {
            const i = ci(e, t.id);
            i && Gn(i, [t.file]);
        }, 0);
};
const Gc = ({ root: e }) => {
    e.element.disabled = e.query("GET_DISABLED");
};
const Uc = ({ root: e, action: t }) => {
    const i = ci(e, t.id);
    i &&
        (i.parentNode && i.parentNode.removeChild(i),
        delete e.ref.fields[t.id]);
};
const kc = ({ root: e, action: t }) => {
    const i = ci(e, t.id);
    i &&
        (t.value === null
            ? i.removeAttribute("value")
            : i.type != "file" && (i.value = t.value),
        Xi(e));
};
const Hc = ge({
    DID_SET_DISABLED: Gc,
    DID_ADD_ITEM: Nc,
    DID_LOAD_ITEM: Bc,
    DID_REMOVE_ITEM: Uc,
    DID_DEFINE_VALUE: kc,
    DID_PREPARE_OUTPUT: Vc,
    DID_REORDER_ITEMS: tn,
    DID_SORT_ITEMS: tn,
});
const Wc = re({
    tag: "fieldset",
    name: "data",
    create: zc,
    write: Hc,
    ignoreRect: !0,
});
const Yc = (e) => ("getRootNode" in e ? e.getRootNode() : document);
const qc = ["jpg", "jpeg", "png", "gif", "bmp", "webp", "svg", "tiff"];
const $c = ["css", "csv", "html", "txt"];
const jc = { zip: "zip|compressed", epub: "application/epub+zip" };
const Un = (e = "") => (
    (e = e.toLowerCase()),
    qc.includes(e)
        ? "image/" + (e === "jpg" ? "jpeg" : e === "svg" ? "svg+xml" : e)
        : $c.includes(e)
          ? "text/" + e
          : jc[e] || ""
);
const Qi = (e) =>
    new Promise((t, i) => {
        const a = id(e);
        if (a.length && !Xc(e)) return t(a);
        Qc(e).then(t);
    });
var Xc = (e) => (e.files ? e.files.length > 0 : !1);
var Qc = (e) =>
    new Promise((t, i) => {
        const a = (e.items ? Array.from(e.items) : [])
            .filter((n) => Kc(n))
            .map((n) => Zc(n));
        if (!a.length) {
            t(e.files ? Array.from(e.files) : []);
            return;
        }
        Promise.all(a)
            .then((n) => {
                const r = [];
                n.forEach((l) => {
                    r.push.apply(r, l);
                }),
                    t(
                        r
                            .filter((l) => l)
                            .map(
                                (l) => (
                                    l._relativePath ||
                                        (l._relativePath =
                                            l.webkitRelativePath),
                                    l
                                ),
                            ),
                    );
            })
            .catch(console.error);
    });
var Kc = (e) => {
    if (kn(e)) {
        const t = Ki(e);
        if (t) return t.isFile || t.isDirectory;
    }
    return e.kind === "file";
};
var Zc = (e) =>
    new Promise((t, i) => {
        if (td(e)) {
            Jc(Ki(e)).then(t).catch(i);
            return;
        }
        t([e.getAsFile()]);
    });
var Jc = (e) =>
    new Promise((t, i) => {
        const a = [];
        let n = 0;
        let r = 0;
        const l = () => {
            r === 0 && n === 0 && t(a);
        };
        const o = (s) => {
            n++;
            const u = s.createReader();
            const c = () => {
                u.readEntries((d) => {
                    if (d.length === 0) {
                        n--, l();
                        return;
                    }
                    d.forEach((h) => {
                        h.isDirectory
                            ? o(h)
                            : (r++,
                              h.file((m) => {
                                  const p = ed(m);
                                  h.fullPath && (p._relativePath = h.fullPath),
                                      a.push(p),
                                      r--,
                                      l();
                              }));
                    }),
                        c();
                }, i);
            };
            c();
        };
        o(e);
    });
var ed = (e) => {
    if (e.type.length) return e;
    const t = e.lastModifiedDate;
    const i = e.name;
    const a = Un(si(e.name));
    return (
        a.length &&
            ((e = e.slice(0, e.size, a)),
            (e.name = i),
            (e.lastModifiedDate = t)),
        e
    );
};
var td = (e) => kn(e) && (Ki(e) || {}).isDirectory;
var kn = (e) => "webkitGetAsEntry" in e;
var Ki = (e) => e.webkitGetAsEntry();
var id = (e) => {
    let t = [];
    try {
        if (((t = nd(e)), t.length)) return t;
        t = ad(e);
    } catch {}
    return t;
};
var ad = (e) => {
    const t = e.getData("url");
    return typeof t === "string" && t.length ? [t] : [];
};
var nd = (e) => {
    const t = e.getData("text/html");
    if (typeof t === "string" && t.length) {
        const i = t.match(/src\s*=\s*"(.+?)"/);
        if (i) return [i[1]];
    }
    return [];
};
const ii = [];
const Je = (e) => ({
    pageLeft: e.pageX,
    pageTop: e.pageY,
    scopeLeft: e.offsetX || e.layerX,
    scopeTop: e.offsetY || e.layerY,
});
const rd = (e, t, i) => {
    const a = ld(t);
    const n = {
        element: e,
        filterElement: i,
        state: null,
        ondrop: () => {},
        onenter: () => {},
        ondrag: () => {},
        onexit: () => {},
        onload: () => {},
        allowdrop: () => {},
    };
    return (n.destroy = a.addListener(n)), n;
};
var ld = (e) => {
    const t = ii.find((a) => a.element === e);
    if (t) return t;
    const i = od(e);
    return ii.push(i), i;
};
var od = (e) => {
    const t = [];
    const i = { dragenter: cd, dragover: dd, dragleave: hd, drop: ud };
    const a = {};
    te(i, (r, l) => {
        (a[r] = l(e, t)), e.addEventListener(r, a[r], !1);
    });
    const n = {
        element: e,
        addListener: (r) => (
            t.push(r),
            () => {
                t.splice(t.indexOf(r), 1),
                    t.length === 0 &&
                        (ii.splice(ii.indexOf(n), 1),
                        te(i, (l) => {
                            e.removeEventListener(l, a[l], !1);
                        }));
            }
        ),
    };
    return n;
};
const sd = (e, t) => (
    "elementFromPoint" in e || (e = document), e.elementFromPoint(t.x, t.y)
);
const Zi = (e, t) => {
    const i = Yc(t);
    const a = sd(i, {
        x: e.pageX - window.pageXOffset,
        y: e.pageY - window.pageYOffset,
    });
    return a === t || t.contains(a);
};
let Hn = null;
const Kt = (e, t) => {
    try {
        e.dropEffect = t;
    } catch {}
};
var cd = (e, t) => (i) => {
    i.preventDefault(),
        (Hn = i.target),
        t.forEach((a) => {
            const { element: n, onenter: r } = a;
            Zi(i, n) && ((a.state = "enter"), r(Je(i)));
        });
};
var dd = (e, t) => (i) => {
    i.preventDefault();
    const a = i.dataTransfer;
    Qi(a).then((n) => {
        let r = !1;
        t.some((l) => {
            const {
                filterElement: o,
                element: s,
                onenter: u,
                onexit: c,
                ondrag: d,
                allowdrop: h,
            } = l;
            Kt(a, "copy");
            const m = h(n);
            if (!m) {
                Kt(a, "none");
                return;
            }
            if (Zi(i, s)) {
                if (((r = !0), l.state === null)) {
                    (l.state = "enter"), u(Je(i));
                    return;
                }
                if (((l.state = "over"), o && !m)) {
                    Kt(a, "none");
                    return;
                }
                d(Je(i));
            } else {
                o && !r && Kt(a, "none"),
                    l.state && ((l.state = null), c(Je(i)));
            }
        });
    });
};
var ud = (e, t) => (i) => {
    i.preventDefault();
    const a = i.dataTransfer;
    Qi(a).then((n) => {
        t.forEach((r) => {
            const {
                filterElement: l,
                element: o,
                ondrop: s,
                onexit: u,
                allowdrop: c,
            } = r;
            if (((r.state = null), !(l && !Zi(i, o)))) {
                if (!c(n)) return u(Je(i));
                s(Je(i), n);
            }
        });
    });
};
var hd = (e, t) => (i) => {
    Hn === i.target &&
        t.forEach((a) => {
            const { onexit: n } = a;
            (a.state = null), n(Je(i));
        });
};
const md = (e, t, i) => {
    e.classList.add("filepond--hopper");
    const {
        catchesDropsOnPage: a,
        requiresDropOnElement: n,
        filterItems: r = (c) => c,
    } = i;
    const l = rd(e, a ? document.documentElement : e, n);
    let o = "";
    let s = "";
    (l.allowdrop = (c) => t(r(c))),
        (l.ondrop = (c, d) => {
            const h = r(d);
            if (!t(h)) {
                u.ondragend(c);
                return;
            }
            (s = "drag-drop"), u.onload(h, c);
        }),
        (l.ondrag = (c) => {
            u.ondrag(c);
        }),
        (l.onenter = (c) => {
            (s = "drag-over"), u.ondragstart(c);
        }),
        (l.onexit = (c) => {
            (s = "drag-exit"), u.ondragend(c);
        });
    const u = {
        updateHopperState: () => {
            o !== s && ((e.dataset.hopperState = s), (o = s));
        },
        onload: () => {},
        ondragstart: () => {},
        ondrag: () => {},
        ondragend: () => {},
        destroy: () => {
            l.destroy();
        },
    };
    return u;
};
let Ci = !1;
const dt = [];
const Wn = (e) => {
    const t = document.activeElement;
    if (t && /textarea|input/i.test(t.nodeName)) {
        let i = !1;
        let a = t;
        for (; a !== document.body; ) {
            if (a.classList.contains("filepond--root")) {
                i = !0;
                break;
            }
            a = a.parentNode;
        }
        if (!i) return;
    }
    Qi(e.clipboardData).then((i) => {
        i.length && dt.forEach((a) => a(i));
    });
};
const pd = (e) => {
    dt.includes(e) ||
        (dt.push(e),
        !Ci && ((Ci = !0), document.addEventListener("paste", Wn)));
};
const fd = (e) => {
    Hi(dt, dt.indexOf(e)),
        dt.length === 0 &&
            (document.removeEventListener("paste", Wn), (Ci = !1));
};
const gd = () => {
    const e = (i) => {
        t.onload(i);
    };
    const t = {
        destroy: () => {
            fd(e);
        },
        onload: () => {},
    };
    return pd(e), t;
};
const Ed = ({ root: e, props: t }) => {
    (e.element.id = `filepond--assistant-${t.id}`),
        ne(e.element, "role", "status"),
        ne(e.element, "aria-live", "polite"),
        ne(e.element, "aria-relevant", "additions");
};
let an = null;
let nn = null;
const Ai = [];
const di = (e, t) => {
    e.element.textContent = t;
};
const Td = (e) => {
    e.element.textContent = "";
};
const Yn = (e, t, i) => {
    const a = e.query("GET_TOTAL_ITEMS");
    di(
        e,
        `${i} ${t}, ${a} ${a === 1 ? e.query("GET_LABEL_FILE_COUNT_SINGULAR") : e.query("GET_LABEL_FILE_COUNT_PLURAL")}`,
    ),
        clearTimeout(nn),
        (nn = setTimeout(() => {
            Td(e);
        }, 1500));
};
const qn = (e) => e.element.parentNode.contains(document.activeElement);
const bd = ({ root: e, action: t }) => {
    if (!qn(e)) return;
    e.element.textContent = "";
    const i = e.query("GET_ITEM", t.id);
    Ai.push(i.filename),
        clearTimeout(an),
        (an = setTimeout(() => {
            Yn(e, Ai.join(", "), e.query("GET_LABEL_FILE_ADDED")),
                (Ai.length = 0);
        }, 750));
};
const Id = ({ root: e, action: t }) => {
    if (!qn(e)) return;
    const i = t.item;
    Yn(e, i.filename, e.query("GET_LABEL_FILE_REMOVED"));
};
const _d = ({ root: e, action: t }) => {
    const a = e.query("GET_ITEM", t.id).filename;
    const n = e.query("GET_LABEL_FILE_PROCESSING_COMPLETE");
    di(e, `${a} ${n}`);
};
const rn = ({ root: e, action: t }) => {
    const a = e.query("GET_ITEM", t.id).filename;
    const n = e.query("GET_LABEL_FILE_PROCESSING_ABORTED");
    di(e, `${a} ${n}`);
};
const Zt = ({ root: e, action: t }) => {
    const a = e.query("GET_ITEM", t.id).filename;
    di(e, `${t.status.main} ${a} ${t.status.sub}`);
};
const Rd = re({
    create: Ed,
    ignoreRect: !0,
    ignoreRectUpdate: !0,
    write: ge({
        DID_LOAD_ITEM: bd,
        DID_REMOVE_ITEM: Id,
        DID_COMPLETE_ITEM_PROCESSING: _d,
        DID_ABORT_ITEM_PROCESSING: rn,
        DID_REVERT_ITEM_PROCESSING: rn,
        DID_THROW_ITEM_REMOVE_ERROR: Zt,
        DID_THROW_ITEM_LOAD_ERROR: Zt,
        DID_THROW_ITEM_INVALID: Zt,
        DID_THROW_ITEM_PROCESSING_ERROR: Zt,
    }),
    tag: "span",
    name: "assistant",
});
const $n = (e, t = "-") =>
    e.replace(new RegExp(`${t}.`, "g"), (i) => i.charAt(1).toUpperCase());
const jn = (e, t = 16, i = !0) => {
    let a = Date.now();
    let n = null;
    return (...r) => {
        clearTimeout(n);
        const l = Date.now() - a;
        const o = () => {
            (a = Date.now()), e(...r);
        };
        l < t ? i || (n = setTimeout(o, t - l)) : o();
    };
};
const yd = 1e6;
const ai = (e) => e.preventDefault();
const Sd = ({ root: e, props: t }) => {
    const i = e.query("GET_ID");
    i && (e.element.id = i);
    const a = e.query("GET_CLASS_NAME");
    a &&
        a
            .split(" ")
            .filter((s) => s.length)
            .forEach((s) => {
                e.element.classList.add(s);
            }),
        (e.ref.label = e.appendChildView(
            e.createChildView(Ac, {
                ...t,
                translateY: null,
                caption: e.query("GET_LABEL_IDLE"),
            }),
        )),
        (e.ref.list = e.appendChildView(
            e.createChildView(_c, { translateY: null }),
        )),
        (e.ref.panel = e.appendChildView(
            e.createChildView(Dn, { name: "panel-root" }),
        )),
        (e.ref.assistant = e.appendChildView(e.createChildView(Rd, { ...t }))),
        (e.ref.data = e.appendChildView(e.createChildView(Wc, { ...t }))),
        (e.ref.measure = Be("div")),
        (e.ref.measure.style.height = "100%"),
        e.element.appendChild(e.ref.measure),
        (e.ref.bounds = null),
        e
            .query("GET_STYLES")
            .filter((s) => !Ne(s.value))
            .map(({ name: s, value: u }) => {
                e.element.dataset[s] = u;
            }),
        (e.ref.widthPrevious = null),
        (e.ref.widthUpdated = jn(() => {
            (e.ref.updateHistory = []), e.dispatch("DID_RESIZE_ROOT");
        }, 250)),
        (e.ref.previousAspectRatio = null),
        (e.ref.updateHistory = []);
    const n = window.matchMedia("(pointer: fine) and (hover: hover)").matches;
    const r = "PointerEvent" in window;
    e.query("GET_ALLOW_REORDER") &&
        r &&
        !n &&
        (e.element.addEventListener("touchmove", ai, { passive: !1 }),
        e.element.addEventListener("gesturestart", ai));
    const l = e.query("GET_CREDITS");
    if (l.length === 2) {
        const s = document.createElement("a");
        (s.className = "filepond--credits"),
            s.setAttribute("aria-hidden", "true"),
            (s.href = l[0]),
            (s.tabindex = -1),
            (s.target = "_blank"),
            (s.rel = "noopener noreferrer"),
            (s.textContent = l[1]),
            e.element.appendChild(s),
            (e.ref.credits = s);
    }
};
const wd = ({ root: e, props: t, actions: i }) => {
    if (
        (xd({ root: e, props: t, actions: i }),
        i
            .filter((b) => /^DID_SET_STYLE_/.test(b.type))
            .filter((b) => !Ne(b.data.value))
            .map(({ type: b, data: A }) => {
                const R = $n(b.substring(8).toLowerCase(), "_");
                (e.element.dataset[R] = A.value), e.invalidateLayout();
            }),
        e.rect.element.hidden)
    ) {
        return;
    }
    e.rect.element.width !== e.ref.widthPrevious &&
        ((e.ref.widthPrevious = e.rect.element.width), e.ref.widthUpdated());
    let a = e.ref.bounds;
    a ||
        ((a = e.ref.bounds = Ld(e)),
        e.element.removeChild(e.ref.measure),
        (e.ref.measure = null));
    const { hopper: n, label: r, list: l, panel: o } = e.ref;
    n && n.updateHopperState();
    const s = e.query("GET_PANEL_ASPECT_RATIO");
    const u = e.query("GET_ALLOW_MULTIPLE");
    const c = e.query("GET_TOTAL_ITEMS");
    const d = u ? e.query("GET_MAX_FILES") || yd : 1;
    const h = c === d;
    const m = i.find((b) => b.type === "DID_ADD_ITEM");
    if (h && m) {
        const b = m.data.interactionMethod;
        (r.opacity = 0),
            u
                ? (r.translateY = -40)
                : b === Se.API
                  ? (r.translateX = 40)
                  : b === Se.BROWSE
                    ? (r.translateY = 40)
                    : (r.translateY = 30);
    } else h || ((r.opacity = 1), (r.translateX = 0), (r.translateY = 0));
    const p = vd(e);
    const f = Ad(e);
    const g = r.rect.element.height;
    const I = !u || h ? 0 : g;
    const E = h ? l.rect.element.marginTop : 0;
    const T = c === 0 ? 0 : l.rect.element.marginBottom;
    const _ = I + E + f.visual + T;
    const y = I + E + f.bounds + T;
    if (
        ((l.translateY = Math.max(0, I - l.rect.element.marginTop) - p.top), s)
    ) {
        const b = e.rect.element.width;
        const A = b * s;
        s !== e.ref.previousAspectRatio &&
            ((e.ref.previousAspectRatio = s), (e.ref.updateHistory = []));
        const R = e.ref.updateHistory;
        R.push(b);
        const S = 2;
        if (R.length > S * 2) {
            const O = R.length;
            const x = O - 10;
            let z = 0;
            for (let v = O; v >= x; v--) {
                if ((R[v] === R[v - 2] && z++, z >= S)) return;
            }
        }
        (o.scalable = !1), (o.height = A);
        const P = A - I - (T - p.bottom) - (h ? E : 0);
        f.visual > P ? (l.overflow = P) : (l.overflow = null), (e.height = A);
    } else if (a.fixedHeight) {
        o.scalable = !1;
        const b = a.fixedHeight - I - (T - p.bottom) - (h ? E : 0);
        f.visual > b ? (l.overflow = b) : (l.overflow = null);
    } else if (a.cappedHeight) {
        const b = _ >= a.cappedHeight;
        const A = Math.min(a.cappedHeight, _);
        (o.scalable = !0), (o.height = b ? A : A - p.top - p.bottom);
        const R = A - I - (T - p.bottom) - (h ? E : 0);
        _ > a.cappedHeight && f.visual > R
            ? (l.overflow = R)
            : (l.overflow = null),
            (e.height = Math.min(a.cappedHeight, y - p.top - p.bottom));
    } else {
        const b = c > 0 ? p.top + p.bottom : 0;
        (o.scalable = !0),
            (o.height = Math.max(g, _ - b)),
            (e.height = Math.max(g, y - b));
    }
    e.ref.credits &&
        o.heightCurrent &&
        (e.ref.credits.style.transform = `translateY(${o.heightCurrent}px)`);
};
var vd = (e) => {
    const t = e.ref.list.childViews[0].childViews[0];
    return t
        ? { top: t.rect.element.marginTop, bottom: t.rect.element.marginBottom }
        : { top: 0, bottom: 0 };
};
var Ad = (e) => {
    let t = 0;
    let i = 0;
    const a = e.ref.list;
    const n = a.childViews[0];
    const r = n.childViews.filter((E) => E.rect.element.height);
    const l = e
        .query("GET_ACTIVE_ITEMS")
        .map((E) => r.find((T) => T.id === E.id))
        .filter((E) => E);
    if (l.length === 0) return { visual: t, bounds: i };
    const o = n.rect.element.width;
    const s = ji(n, l, a.dragCoordinates);
    const u = l[0].rect.element;
    const c = u.marginTop + u.marginBottom;
    const d = u.marginLeft + u.marginRight;
    const h = u.width + d;
    const m = u.height + c;
    const p = typeof s < "u" && s >= 0 ? 1 : 0;
    const f = l.find((E) => E.markedForRemoval && E.opacity < 0.45) ? -1 : 0;
    const g = l.length + p + f;
    const I = $i(o, h);
    return (
        I === 1
            ? l.forEach((E) => {
                  const T = E.rect.element.height + c;
                  (i += T), (t += T * E.opacity);
              })
            : ((i = Math.ceil(g / I) * m), (t = i)),
        { visual: t, bounds: i }
    );
};
var Ld = (e) => {
    const t = e.ref.measureHeight || null;
    return {
        cappedHeight: parseInt(e.style.maxHeight, 10) || null,
        fixedHeight: t === 0 ? null : t,
    };
};
const Ji = (e, t) => {
    const i = e.query("GET_ALLOW_REPLACE");
    const a = e.query("GET_ALLOW_MULTIPLE");
    const n = e.query("GET_TOTAL_ITEMS");
    let r = e.query("GET_MAX_FILES");
    const l = t.length;
    return !a && l > 1
        ? (e.dispatch("DID_THROW_MAX_FILES", {
              source: t,
              error: ie("warning", 0, "Max files"),
          }),
          !0)
        : ((r = a ? r : 1),
          !a && i
              ? !1
              : pt(r) && n + l > r
                ? (e.dispatch("DID_THROW_MAX_FILES", {
                      source: t,
                      error: ie("warning", 0, "Max files"),
                  }),
                  !0)
                : !1);
};
const Md = (e, t, i) => {
    const a = e.childViews[0];
    return ji(a, t, {
        left: i.scopeLeft - a.rect.element.left,
        top:
            i.scopeTop -
            (e.rect.outer.top +
                e.rect.element.marginTop +
                e.rect.element.scrollTop),
    });
};
const ln = (e) => {
    const t = e.query("GET_ALLOW_DROP");
    const i = e.query("GET_DISABLED");
    const a = t && !i;
    if (a && !e.ref.hopper) {
        const n = md(
            e.element,
            (r) => {
                const l = e.query("GET_BEFORE_DROP_FILE") || (() => !0);
                return e.query("GET_DROP_VALIDATION")
                    ? r.every(
                          (s) =>
                              et("ALLOW_HOPPER_ITEM", s, {
                                  query: e.query,
                              }).every((u) => u === !0) && l(s),
                      )
                    : !0;
            },
            {
                filterItems: (r) => {
                    const l = e.query("GET_IGNORED_FILES");
                    return r.filter((o) =>
                        Ze(o) ? !l.includes(o.name.toLowerCase()) : !0,
                    );
                },
                catchesDropsOnPage: e.query("GET_DROP_ON_PAGE"),
                requiresDropOnElement: e.query("GET_DROP_ON_ELEMENT"),
            },
        );
        (n.onload = (r, l) => {
            const s = e.ref.list.childViews[0].childViews.filter(
                (c) => c.rect.element.height,
            );
            const u = e
                .query("GET_ACTIVE_ITEMS")
                .map((c) => s.find((d) => d.id === c.id))
                .filter((c) => c);
            Le("ADD_ITEMS", r, { dispatch: e.dispatch }).then((c) => {
                if (Ji(e, c)) return !1;
                e.dispatch("ADD_ITEMS", {
                    items: c,
                    index: Md(e.ref.list, u, l),
                    interactionMethod: Se.DROP,
                });
            }),
                e.dispatch("DID_DROP", { position: l }),
                e.dispatch("DID_END_DRAG", { position: l });
        }),
            (n.ondragstart = (r) => {
                e.dispatch("DID_START_DRAG", { position: r });
            }),
            (n.ondrag = jn((r) => {
                e.dispatch("DID_DRAG", { position: r });
            })),
            (n.ondragend = (r) => {
                e.dispatch("DID_END_DRAG", { position: r });
            }),
            (e.ref.hopper = n),
            (e.ref.drip = e.appendChildView(e.createChildView(Cc)));
    } else {
        !a &&
            e.ref.hopper &&
            (e.ref.hopper.destroy(),
            (e.ref.hopper = null),
            e.removeChildView(e.ref.drip));
    }
};
const on = (e, t) => {
    const i = e.query("GET_ALLOW_BROWSE");
    const a = e.query("GET_DISABLED");
    const n = i && !a;
    n && !e.ref.browser
        ? (e.ref.browser = e.appendChildView(
              e.createChildView(wc, {
                  ...t,
                  onload: (r) => {
                      Le("ADD_ITEMS", r, { dispatch: e.dispatch }).then((l) => {
                          if (Ji(e, l)) return !1;
                          e.dispatch("ADD_ITEMS", {
                              items: l,
                              index: -1,
                              interactionMethod: Se.BROWSE,
                          });
                      });
                  },
              }),
              0,
          ))
        : !n &&
          e.ref.browser &&
          (e.removeChildView(e.ref.browser), (e.ref.browser = null));
};
const sn = (e) => {
    const t = e.query("GET_ALLOW_PASTE");
    const i = e.query("GET_DISABLED");
    const a = t && !i;
    a && !e.ref.paster
        ? ((e.ref.paster = gd()),
          (e.ref.paster.onload = (n) => {
              Le("ADD_ITEMS", n, { dispatch: e.dispatch }).then((r) => {
                  if (Ji(e, r)) return !1;
                  e.dispatch("ADD_ITEMS", {
                      items: r,
                      index: -1,
                      interactionMethod: Se.PASTE,
                  });
              });
          }))
        : !a && e.ref.paster && (e.ref.paster.destroy(), (e.ref.paster = null));
};
var xd = ge({
    DID_SET_ALLOW_BROWSE: ({ root: e, props: t }) => {
        on(e, t);
    },
    DID_SET_ALLOW_DROP: ({ root: e }) => {
        ln(e);
    },
    DID_SET_ALLOW_PASTE: ({ root: e }) => {
        sn(e);
    },
    DID_SET_DISABLED: ({ root: e, props: t }) => {
        ln(e),
            sn(e),
            on(e, t),
            e.query("GET_DISABLED")
                ? (e.element.dataset.disabled = "disabled")
                : e.element.removeAttribute("data-disabled");
    },
});
const Od = re({
    name: "root",
    read: ({ root: e }) => {
        e.ref.measure && (e.ref.measureHeight = e.ref.measure.offsetHeight);
    },
    create: Sd,
    write: wd,
    destroy: ({ root: e }) => {
        e.ref.paster && e.ref.paster.destroy(),
            e.ref.hopper && e.ref.hopper.destroy(),
            e.element.removeEventListener("touchmove", ai),
            e.element.removeEventListener("gesturestart", ai);
    },
    mixins: { styles: ["height"] },
});
const Pd = (e = {}) => {
    let t = null;
    const i = ti();
    const a = jl(Fo(i), [Zo, No(i)], [ys, zo(i)]);
    a.dispatch("SET_OPTIONS", { options: e });
    const n = () => {
        document.hidden || a.dispatch("KICK");
    };
    document.addEventListener("visibilitychange", n);
    let r = null;
    let l = !1;
    let o = !1;
    let s = null;
    let u = null;
    const c = () => {
        l || (l = !0),
            clearTimeout(r),
            (r = setTimeout(() => {
                (l = !1),
                    (s = null),
                    (u = null),
                    o && ((o = !1), a.dispatch("DID_STOP_RESIZE"));
            }, 500));
    };
    window.addEventListener("resize", c);
    const d = Od(a, { id: ki() });
    let h = !1;
    let m = !1;
    const p = {
        _read: () => {
            l &&
                ((u = window.innerWidth),
                s || (s = u),
                !o && u !== s && (a.dispatch("DID_START_RESIZE"), (o = !0))),
                m && h && (h = d.element.offsetParent === null),
                !h && (d._read(), (m = d.rect.element.hidden));
        },
        _write: (w) => {
            const L = a
                .processActionQueue()
                .filter((C) => !/^SET_/.test(C.type));
            (h && !L.length) ||
                (E(L),
                (h = d._write(w, L, o)),
                Go(a.query("GET_ITEMS")),
                h && a.processDispatchQueue());
        },
    };
    const f = (w) => (L) => {
        const C = { type: w };
        if (!L) return C;
        if (
            (L.hasOwnProperty("error") &&
                (C.error = L.error ? { ...L.error } : null),
            L.status && (C.status = { ...L.status }),
            L.file && (C.output = L.file),
            L.source)
        ) {
            C.file = L.source;
        } else if (L.item || L.id) {
            const D = L.item ? L.item : a.query("GET_ITEM", L.id);
            C.file = D ? Ee(D) : null;
        }
        return (
            L.items && (C.items = L.items.map(Ee)),
            /progress/.test(w) && (C.progress = L.progress),
            L.hasOwnProperty("origin") &&
                L.hasOwnProperty("target") &&
                ((C.origin = L.origin), (C.target = L.target)),
            C
        );
    };
    const g = {
        DID_DESTROY: f("destroy"),
        DID_INIT: f("init"),
        DID_THROW_MAX_FILES: f("warning"),
        DID_INIT_ITEM: f("initfile"),
        DID_START_ITEM_LOAD: f("addfilestart"),
        DID_UPDATE_ITEM_LOAD_PROGRESS: f("addfileprogress"),
        DID_LOAD_ITEM: f("addfile"),
        DID_THROW_ITEM_INVALID: [f("error"), f("addfile")],
        DID_THROW_ITEM_LOAD_ERROR: [f("error"), f("addfile")],
        DID_THROW_ITEM_REMOVE_ERROR: [f("error"), f("removefile")],
        DID_PREPARE_OUTPUT: f("preparefile"),
        DID_START_ITEM_PROCESSING: f("processfilestart"),
        DID_UPDATE_ITEM_PROCESS_PROGRESS: f("processfileprogress"),
        DID_ABORT_ITEM_PROCESSING: f("processfileabort"),
        DID_COMPLETE_ITEM_PROCESSING: f("processfile"),
        DID_COMPLETE_ITEM_PROCESSING_ALL: f("processfiles"),
        DID_REVERT_ITEM_PROCESSING: f("processfilerevert"),
        DID_THROW_ITEM_PROCESSING_ERROR: [f("error"), f("processfile")],
        DID_REMOVE_ITEM: f("removefile"),
        DID_UPDATE_ITEMS: f("updatefiles"),
        DID_ACTIVATE_ITEM: f("activatefile"),
        DID_REORDER_ITEMS: f("reorderfiles"),
    };
    const I = (w) => {
        const L = { pond: F, ...w };
        delete L.type,
            d.element.dispatchEvent(
                new CustomEvent(`FilePond:${w.type}`, {
                    detail: L,
                    bubbles: !0,
                    cancelable: !0,
                    composed: !0,
                }),
            );
        const C = [];
        w.hasOwnProperty("error") && C.push(w.error),
            w.hasOwnProperty("file") && C.push(w.file);
        const D = ["type", "error", "file"];
        Object.keys(w)
            .filter((B) => !D.includes(B))
            .forEach((B) => C.push(w[B])),
            F.fire(w.type, ...C);
        const V = a.query(`GET_ON${w.type.toUpperCase()}`);
        V && V(...C);
    };
    const E = (w) => {
        w.length &&
            w
                .filter((L) => g[L.type])
                .forEach((L) => {
                    const C = g[L.type];
                    (Array.isArray(C) ? C : [C]).forEach((D) => {
                        L.type === "DID_INIT_ITEM"
                            ? I(D(L.data))
                            : setTimeout(() => {
                                  I(D(L.data));
                              }, 0);
                    });
                });
    };
    const T = (w) => a.dispatch("SET_OPTIONS", { options: w });
    const _ = (w) => a.query("GET_ACTIVE_ITEM", w);
    const y = (w) =>
        new Promise((L, C) => {
            a.dispatch("REQUEST_ITEM_PREPARE", {
                query: w,
                success: (D) => {
                    L(D);
                },
                failure: (D) => {
                    C(D);
                },
            });
        });
    const b = (w, L = {}) =>
        new Promise((C, D) => {
            S([{ source: w, options: L }], { index: L.index })
                .then((V) => C(V && V[0]))
                .catch(D);
        });
    const A = (w) => w.file && w.id;
    const R = (w, L) => (
        typeof w === "object" && !A(w) && !L && ((L = w), (w = void 0)),
        a.dispatch("REMOVE_ITEM", { ...L, query: w }),
        a.query("GET_ACTIVE_ITEM", w) === null
    );
    const S = (...w) =>
        new Promise((L, C) => {
            const D = [];
            const V = {};
            if (ni(w[0])) D.push.apply(D, w[0]), Object.assign(V, w[1] || {});
            else {
                const B = w[w.length - 1];
                typeof B === "object" &&
                    !(B instanceof Blob) &&
                    Object.assign(V, w.pop()),
                    D.push(...w);
            }
            a.dispatch("ADD_ITEMS", {
                items: D,
                index: V.index,
                interactionMethod: Se.API,
                success: L,
                failure: C,
            });
        });
    const P = () => a.query("GET_ACTIVE_ITEMS");
    const O = (w) =>
        new Promise((L, C) => {
            a.dispatch("REQUEST_ITEM_PROCESSING", {
                query: w,
                success: (D) => {
                    L(D);
                },
                failure: (D) => {
                    C(D);
                },
            });
        });
    const x = (...w) => {
        const L = Array.isArray(w[0]) ? w[0] : w;
        const C = L.length ? L : P();
        return Promise.all(C.map(y));
    };
    const z = (...w) => {
        const L = Array.isArray(w[0]) ? w[0] : w;
        if (!L.length) {
            const C = P().filter(
                (D) =>
                    !(D.status === k.IDLE && D.origin === se.LOCAL) &&
                    D.status !== k.PROCESSING &&
                    D.status !== k.PROCESSING_COMPLETE &&
                    D.status !== k.PROCESSING_REVERT_ERROR,
            );
            return Promise.all(C.map(O));
        }
        return Promise.all(L.map(O));
    };
    const v = (...w) => {
        const L = Array.isArray(w[0]) ? w[0] : w;
        let C;
        typeof L[L.length - 1] === "object"
            ? (C = L.pop())
            : Array.isArray(w[0]) && (C = w[1]);
        const D = P();
        return L.length
            ? L.map((B) => ($e(B) ? (D[B] ? D[B].id : null) : B))
                  .filter((B) => B)
                  .map((B) => R(B, C))
            : Promise.all(D.map((B) => R(B, C)));
    };
    const F = {
        ...oi(),
        ...p,
        ...Co(a, i),
        setOptions: T,
        addFile: b,
        addFiles: S,
        getFile: _,
        processFile: O,
        prepareFile: y,
        removeFile: R,
        moveFile: (w, L) => a.dispatch("MOVE_ITEM", { query: w, index: L }),
        getFiles: P,
        processFiles: z,
        removeFiles: v,
        prepareFiles: x,
        sort: (w) => a.dispatch("SORT", { compare: w }),
        browse: () => {
            const w = d.element.querySelector("input[type=file]");
            w && w.click();
        },
        destroy: () => {
            F.fire("destroy", d.element),
                a.dispatch("ABORT_ALL"),
                d._destroy(),
                window.removeEventListener("resize", c),
                document.removeEventListener("visibilitychange", n),
                a.dispatch("DID_DESTROY");
        },
        insertBefore: (w) => xa(d.element, w),
        insertAfter: (w) => Oa(d.element, w),
        appendTo: (w) => w.appendChild(d.element),
        replaceElement: (w) => {
            xa(d.element, w), w.parentNode.removeChild(w), (t = w);
        },
        restoreElement: () => {
            t &&
                (Oa(t, d.element),
                d.element.parentNode.removeChild(d.element),
                (t = null));
        },
        isAttachedTo: (w) => d.element === w || t === w,
        element: { get: () => d.element },
        status: { get: () => a.query("GET_STATUS") },
    };
    return a.dispatch("DID_INIT"), Ue(F);
};
const Xn = (e = {}) => {
    const t = {};
    return (
        te(ti(), (a, n) => {
            t[a] = n[0];
        }),
        Pd({ ...t, ...e })
    );
};
const Dd = (e) => e.charAt(0).toLowerCase() + e.slice(1);
const Fd = (e) => $n(e.replace(/^data-/, ""));
const Qn = (e, t) => {
    te(t, (i, a) => {
        te(e, (n, r) => {
            const l = new RegExp(i);
            if (!l.test(n) || (delete e[n], a === !1)) return;
            if (pe(a)) {
                e[a] = r;
                return;
            }
            const s = a.group;
            ce(a) && !e[s] && (e[s] = {}), (e[s][Dd(n.replace(l, ""))] = r);
        }),
            a.mapping && Qn(e[a.group], a.mapping);
    });
};
const Cd = (e, t = {}) => {
    const i = [];
    te(e.attributes, (n) => {
        i.push(e.attributes[n]);
    });
    const a = i
        .filter((n) => n.name)
        .reduce((n, r) => {
            const l = ne(e, r.name);
            return (n[Fd(r.name)] = l === r.name ? !0 : l), n;
        }, {});
    return Qn(a, t), a;
};
const zd = (e, t = {}) => {
    const i = {
        "^class$": "className",
        "^multiple$": "allowMultiple",
        "^capture$": "captureMethod",
        "^webkitdirectory$": "allowDirectoriesOnly",
        "^server": {
            group: "server",
            mapping: {
                "^process": { group: "process" },
                "^revert": { group: "revert" },
                "^fetch": { group: "fetch" },
                "^restore": { group: "restore" },
                "^load": { group: "load" },
            },
        },
        "^type$": !1,
        "^files$": !1,
    };
    et("SET_ATTRIBUTE_TO_OPTION_MAP", i);
    const a = { ...t };
    const n = Cd(
        e.nodeName === "FIELDSET" ? e.querySelector("input[type=file]") : e,
        i,
    );
    Object.keys(n).forEach((l) => {
        ce(n[l])
            ? (ce(a[l]) || (a[l] = {}), Object.assign(a[l], n[l]))
            : (a[l] = n[l]);
    }),
        (a.files = (t.files || []).concat(
            Array.from(e.querySelectorAll("input:not([type=file])")).map(
                (l) => ({ source: l.value, options: { type: l.dataset.type } }),
            ),
        ));
    const r = Xn(a);
    return (
        e.files &&
            Array.from(e.files).forEach((l) => {
                r.addFile(l);
            }),
        r.replaceElement(e),
        r
    );
};
const Nd = (...e) => ($l(e[0]) ? zd(...e) : Xn(...e));
const Bd = ["fire", "_read", "_write"];
const cn = (e) => {
    const t = {};
    return En(e, t, Bd), t;
};
const Vd = (e, t) => e.replace(/(?:{([a-zA-Z]+)})/g, (i, a) => t[a]);
const Gd = (e) => {
    const t = new Blob(["(", e.toString(), ")()"], {
        type: "application/javascript",
    });
    const i = URL.createObjectURL(t);
    const a = new Worker(i);
    return {
        transfer: (n, r) => {},
        post: (n, r, l) => {
            const o = ki();
            (a.onmessage = (s) => {
                s.data.id === o && r(s.data.message);
            }),
                a.postMessage({ id: o, message: n }, l);
        },
        terminate: () => {
            a.terminate(), URL.revokeObjectURL(i);
        },
    };
};
const Ud = (e) =>
    new Promise((t, i) => {
        const a = new Image();
        (a.onload = () => {
            t(a);
        }),
            (a.onerror = (n) => {
                i(n);
            }),
            (a.src = e);
    });
const Kn = (e, t) => {
    const i = e.slice(0, e.size, e.type);
    return (i.lastModifiedDate = e.lastModifiedDate), (i.name = t), i;
};
const kd = (e) => Kn(e, e.name);
const dn = [];
const Hd = (e) => {
    if (dn.includes(e)) return;
    dn.push(e);
    const t = e({
        addFilter: ko,
        utils: {
            Type: M,
            forin: te,
            isString: pe,
            isFile: Ze,
            toNaturalFileSize: xn,
            replaceInString: Vd,
            getExtensionFromFilename: si,
            getFilenameWithoutExtension: An,
            guesstimateMimeType: Un,
            getFileFromBlob: mt,
            getFilenameFromURL: Ot,
            createRoute: ge,
            createWorker: Gd,
            createView: re,
            createItemAPI: Ee,
            loadImage: Ud,
            copyFile: kd,
            renameFile: Kn,
            createBlob: Sn,
            applyFilterChain: Le,
            text: ae,
            getNumericAspectRatioFromString: In,
        },
        views: { fileActionButton: Mn },
    });
    Ho(t.options);
};
const Wd = () =>
    Object.prototype.toString.call(window.operamini) === "[object OperaMini]";
const Yd = () => "Promise" in window;
const qd = () => "slice" in Blob.prototype;
const $d = () => "URL" in window && "createObjectURL" in window.URL;
const jd = () => "visibilityState" in document;
const Xd = () => "performance" in window;
const Qd = () => "supports" in (window.CSS || {});
const Kd = () => /MSIE|Trident/.test(window.navigator.userAgent);
var zi = (() => {
    const e =
        un() && !Wd() && jd() && Yd() && qd() && $d() && Xd() && (Qd() || Kd());
    return () => e;
})();
const Ge = { apps: [] };
const Zd = "filepond";
const tt = () => {};
var Zn = {};
var ke = {};
var Pt = {};
var Ni = {};
var ut = tt;
var ht = tt;
var Bi = tt;
var Vi = tt;
var fe = tt;
var Gi = tt;
var xt = tt;
if (zi()) {
    Io(
        () => {
            Ge.apps.forEach((i) => i._read());
        },
        (i) => {
            Ge.apps.forEach((a) => a._write(i));
        },
    );
    const e = () => {
        document.dispatchEvent(
            new CustomEvent("FilePond:loaded", {
                detail: {
                    supported: zi,
                    create: ut,
                    destroy: ht,
                    parse: Bi,
                    find: Vi,
                    registerPlugin: fe,
                    setOptions: xt,
                },
            }),
        ),
            document.removeEventListener("DOMContentLoaded", e);
    };
    document.readyState !== "loading"
        ? setTimeout(() => e(), 0)
        : document.addEventListener("DOMContentLoaded", e);
    const t = () =>
        te(ti(), (i, a) => {
            Ni[i] = a[1];
        });
    (Zn = { ..._n }),
        (Pt = { ...se }),
        (ke = { ...k }),
        (Ni = {}),
        t(),
        (ut = (...i) => {
            const a = Nd(...i);
            return a.on("destroy", ht), Ge.apps.push(a), cn(a);
        }),
        (ht = (i) => {
            const a = Ge.apps.findIndex((n) => n.isAttachedTo(i));
            return a >= 0 ? (Ge.apps.splice(a, 1)[0].restoreElement(), !0) : !1;
        }),
        (Bi = (i) =>
            Array.from(i.querySelectorAll(`.${Zd}`))
                .filter((r) => !Ge.apps.find((l) => l.isAttachedTo(r)))
                .map((r) => ut(r))),
        (Vi = (i) => {
            const a = Ge.apps.find((n) => n.isAttachedTo(i));
            return a ? cn(a) : null;
        }),
        (fe = (...i) => {
            i.forEach(Hd), t();
        }),
        (Gi = () => {
            const i = {};
            return (
                te(ti(), (a, n) => {
                    i[a] = n[0];
                }),
                i
            );
        }),
        (xt = (i) => (
            ce(i) &&
                (Ge.apps.forEach((a) => {
                    a.setOptions(i);
                }),
                Wo(i)),
            Gi()
        ));
}
function Jn(e, t) {
    const i = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        let a = Object.getOwnPropertySymbols(e);
        t &&
            (a = a.filter(function (n) {
                return Object.getOwnPropertyDescriptor(e, n).enumerable;
            })),
            i.push.apply(i, a);
    }
    return i;
}
function fr(e) {
    for (let t = 1; t < arguments.length; t++) {
        var i = arguments[t] != null ? arguments[t] : {};
        t % 2
            ? Jn(Object(i), !0).forEach(function (a) {
                  tu(e, a, i[a]);
              })
            : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(i))
              : Jn(Object(i)).forEach(function (a) {
                    Object.defineProperty(
                        e,
                        a,
                        Object.getOwnPropertyDescriptor(i, a),
                    );
                });
    }
    return e;
}
function aa(e) {
    "@babel/helpers - typeof";
    return (
        (aa =
            typeof Symbol === "function" && typeof Symbol.iterator === "symbol"
                ? function (t) {
                      return typeof t;
                  }
                : function (t) {
                      return t &&
                          typeof Symbol === "function" &&
                          t.constructor === Symbol &&
                          t !== Symbol.prototype
                          ? "symbol"
                          : typeof t;
                  }),
        aa(e)
    );
}
function Jd(e, t) {
    if (!(e instanceof t)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function er(e, t) {
    for (let i = 0; i < t.length; i++) {
        const a = t[i];
        (a.enumerable = a.enumerable || !1),
            (a.configurable = !0),
            "value" in a && (a.writable = !0),
            Object.defineProperty(e, a.key, a);
    }
}
function eu(e, t, i) {
    return (
        t && er(e.prototype, t),
        i && er(e, i),
        Object.defineProperty(e, "prototype", { writable: !1 }),
        e
    );
}
function tu(e, t, i) {
    return (
        t in e
            ? Object.defineProperty(e, t, {
                  value: i,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
              })
            : (e[t] = i),
        e
    );
}
function gr(e) {
    return iu(e) || au(e) || nu(e) || ru();
}
function iu(e) {
    if (Array.isArray(e)) return na(e);
}
function au(e) {
    if (
        (typeof Symbol < "u" && e[Symbol.iterator] != null) ||
        e["@@iterator"] != null
    ) {
        return Array.from(e);
    }
}
function nu(e, t) {
    if (e) {
        if (typeof e === "string") return na(e, t);
        let i = Object.prototype.toString.call(e).slice(8, -1);
        if (
            (i === "Object" && e.constructor && (i = e.constructor.name),
            i === "Map" || i === "Set")
        ) {
            return Array.from(e);
        }
        if (
            i === "Arguments" ||
            /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)
        ) {
            return na(e, t);
        }
    }
}
function na(e, t) {
    (t == null || t > e.length) && (t = e.length);
    for (var i = 0, a = new Array(t); i < t; i++) a[i] = e[i];
    return a;
}
function ru() {
    throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
const pi = typeof window < "u" && typeof window.document < "u";
const De = pi ? window : {};
const ma =
    pi && De.document.documentElement
        ? "ontouchstart" in De.document.documentElement
        : !1;
const pa = pi ? "PointerEvent" in De : !1;
const K = "cropper";
const fa = "all";
const Er = "crop";
const Tr = "move";
const br = "zoom";
const it = "e";
const at = "w";
const ft = "s";
const He = "n";
const Dt = "ne";
const Ft = "nw";
const Ct = "se";
const zt = "sw";
const ra = "".concat(K, "-crop");
const tr = "".concat(K, "-disabled");
const be = "".concat(K, "-hidden");
const ir = "".concat(K, "-hide");
const lu = "".concat(K, "-invisible");
const mi = "".concat(K, "-modal");
const la = "".concat(K, "-move");
const Bt = "".concat(K, "Action");
const ui = "".concat(K, "Preview");
const ga = "crop";
const Ir = "move";
const _r = "none";
const oa = "crop";
const sa = "cropend";
const ca = "cropmove";
const da = "cropstart";
const ar = "dblclick";
const ou = ma ? "touchstart" : "mousedown";
const su = ma ? "touchmove" : "mousemove";
const cu = ma ? "touchend touchcancel" : "mouseup";
const nr = pa ? "pointerdown" : ou;
const rr = pa ? "pointermove" : su;
const lr = pa ? "pointerup pointercancel" : cu;
const or = "ready";
const sr = "resize";
const cr = "wheel";
const ua = "zoom";
const dr = "image/jpeg";
const du = /^e|w|s|n|se|sw|ne|nw|all|crop|move|zoom$/;
const uu = /^data:/;
const hu = /^data:image\/jpeg;base64,/;
const mu = /^img|canvas$/i;
const Rr = 200;
const yr = 100;
const ur = {
    viewMode: 0,
    dragMode: ga,
    initialAspectRatio: NaN,
    aspectRatio: NaN,
    data: null,
    preview: "",
    responsive: !0,
    restore: !0,
    checkCrossOrigin: !0,
    checkOrientation: !0,
    modal: !0,
    guides: !0,
    center: !0,
    highlight: !0,
    background: !0,
    autoCrop: !0,
    autoCropArea: 0.8,
    movable: !0,
    rotatable: !0,
    scalable: !0,
    zoomable: !0,
    zoomOnTouch: !0,
    zoomOnWheel: !0,
    wheelZoomRatio: 0.1,
    cropBoxMovable: !0,
    cropBoxResizable: !0,
    toggleDragModeOnDblclick: !0,
    minCanvasWidth: 0,
    minCanvasHeight: 0,
    minCropBoxWidth: 0,
    minCropBoxHeight: 0,
    minContainerWidth: Rr,
    minContainerHeight: yr,
    ready: null,
    cropstart: null,
    cropmove: null,
    cropend: null,
    crop: null,
    zoom: null,
};
const pu =
    '<div class="cropper-container" touch-action="none"><div class="cropper-wrap-box"><div class="cropper-canvas"></div></div><div class="cropper-drag-box"></div><div class="cropper-crop-box"><span class="cropper-view-box"></span><span class="cropper-dashed dashed-h"></span><span class="cropper-dashed dashed-v"></span><span class="cropper-center"></span><span class="cropper-face"></span><span class="cropper-line line-e" data-cropper-action="e"></span><span class="cropper-line line-n" data-cropper-action="n"></span><span class="cropper-line line-w" data-cropper-action="w"></span><span class="cropper-line line-s" data-cropper-action="s"></span><span class="cropper-point point-e" data-cropper-action="e"></span><span class="cropper-point point-n" data-cropper-action="n"></span><span class="cropper-point point-w" data-cropper-action="w"></span><span class="cropper-point point-s" data-cropper-action="s"></span><span class="cropper-point point-ne" data-cropper-action="ne"></span><span class="cropper-point point-nw" data-cropper-action="nw"></span><span class="cropper-point point-sw" data-cropper-action="sw"></span><span class="cropper-point point-se" data-cropper-action="se"></span></div></div>';
const fu = Number.isNaN || De.isNaN;
function Y(e) {
    return typeof e === "number" && !fu(e);
}
const hr = function (t) {
    return t > 0 && t < 1 / 0;
};
function ta(e) {
    return typeof e > "u";
}
function nt(e) {
    return aa(e) === "object" && e !== null;
}
const gu = Object.prototype.hasOwnProperty;
function gt(e) {
    if (!nt(e)) return !1;
    try {
        const t = e.constructor;
        const i = t.prototype;
        return t && i && gu.call(i, "isPrototypeOf");
    } catch {
        return !1;
    }
}
function Te(e) {
    return typeof e === "function";
}
const Eu = Array.prototype.slice;
function Sr(e) {
    return Array.from ? Array.from(e) : Eu.call(e);
}
function le(e, t) {
    return (
        e &&
            Te(t) &&
            (Array.isArray(e) || Y(e.length)
                ? Sr(e).forEach(function (i, a) {
                      t.call(e, i, a, e);
                  })
                : nt(e) &&
                  Object.keys(e).forEach(function (i) {
                      t.call(e, e[i], i, e);
                  })),
        e
    );
}
const Z =
    Object.assign ||
    function (t) {
        for (
            var i = arguments.length, a = new Array(i > 1 ? i - 1 : 0), n = 1;
            n < i;
            n++
        ) {
            a[n - 1] = arguments[n];
        }
        return (
            nt(t) &&
                a.length > 0 &&
                a.forEach(function (r) {
                    nt(r) &&
                        Object.keys(r).forEach(function (l) {
                            t[l] = r[l];
                        });
                }),
            t
        );
    };
const Tu = /\.\d*(?:0|9){12}\d*$/;
function Tt(e) {
    const t =
        arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1e11;
    return Tu.test(e) ? Math.round(e * t) / t : e;
}
const bu = /^width|height|left|top|marginLeft|marginTop$/;
function We(e, t) {
    const i = e.style;
    le(t, function (a, n) {
        bu.test(n) && Y(a) && (a = "".concat(a, "px")), (i[n] = a);
    });
}
function Iu(e, t) {
    return e.classList ? e.classList.contains(t) : e.className.indexOf(t) > -1;
}
function de(e, t) {
    if (t) {
        if (Y(e.length)) {
            le(e, function (a) {
                de(a, t);
            });
            return;
        }
        if (e.classList) {
            e.classList.add(t);
            return;
        }
        const i = e.className.trim();
        i
            ? i.indexOf(t) < 0 && (e.className = "".concat(i, " ").concat(t))
            : (e.className = t);
    }
}
function Pe(e, t) {
    if (t) {
        if (Y(e.length)) {
            le(e, function (i) {
                Pe(i, t);
            });
            return;
        }
        if (e.classList) {
            e.classList.remove(t);
            return;
        }
        e.className.indexOf(t) >= 0 &&
            (e.className = e.className.replace(t, ""));
    }
}
function Et(e, t, i) {
    if (t) {
        if (Y(e.length)) {
            le(e, function (a) {
                Et(a, t, i);
            });
            return;
        }
        i ? de(e, t) : Pe(e, t);
    }
}
const _u = /([a-z\d])([A-Z])/g;
function Ea(e) {
    return e.replace(_u, "$1-$2").toLowerCase();
}
function ha(e, t) {
    return nt(e[t])
        ? e[t]
        : e.dataset
          ? e.dataset[t]
          : e.getAttribute("data-".concat(Ea(t)));
}
function Vt(e, t, i) {
    nt(i)
        ? (e[t] = i)
        : e.dataset
          ? (e.dataset[t] = i)
          : e.setAttribute("data-".concat(Ea(t)), i);
}
function Ru(e, t) {
    if (nt(e[t])) {
        try {
            delete e[t];
        } catch {
            e[t] = void 0;
        }
    } else if (e.dataset) {
        try {
            delete e.dataset[t];
        } catch {
            e.dataset[t] = void 0;
        }
    } else e.removeAttribute("data-".concat(Ea(t)));
}
const wr = /\s\s*/;
const vr = (function () {
    let e = !1;
    if (pi) {
        let t = !1;
        const i = function () {};
        const a = Object.defineProperty({}, "once", {
            get: function () {
                return (e = !0), t;
            },
            set: function (r) {
                t = r;
            },
        });
        De.addEventListener("test", i, a), De.removeEventListener("test", i, a);
    }
    return e;
})();
function Oe(e, t, i) {
    const a =
        arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    let n = i;
    t.trim()
        .split(wr)
        .forEach(function (r) {
            if (!vr) {
                const l = e.listeners;
                l &&
                    l[r] &&
                    l[r][i] &&
                    ((n = l[r][i]),
                    delete l[r][i],
                    Object.keys(l[r]).length === 0 && delete l[r],
                    Object.keys(l).length === 0 && delete e.listeners);
            }
            e.removeEventListener(r, n, a);
        });
}
function we(e, t, i) {
    const a =
        arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    let n = i;
    t.trim()
        .split(wr)
        .forEach(function (r) {
            if (a.once && !vr) {
                const l = e.listeners;
                const o = l === void 0 ? {} : l;
                (n = function () {
                    delete o[r][i], e.removeEventListener(r, n, a);
                    for (
                        var u = arguments.length, c = new Array(u), d = 0;
                        d < u;
                        d++
                    ) {
                        c[d] = arguments[d];
                    }
                    i.apply(e, c);
                }),
                    o[r] || (o[r] = {}),
                    o[r][i] && e.removeEventListener(r, o[r][i], a),
                    (o[r][i] = n),
                    (e.listeners = o);
            }
            e.addEventListener(r, n, a);
        });
}
function bt(e, t, i) {
    let a;
    return (
        Te(Event) && Te(CustomEvent)
            ? (a = new CustomEvent(t, {
                  detail: i,
                  bubbles: !0,
                  cancelable: !0,
              }))
            : ((a = document.createEvent("CustomEvent")),
              a.initCustomEvent(t, !0, !0, i)),
        e.dispatchEvent(a)
    );
}
function Ar(e) {
    const t = e.getBoundingClientRect();
    return {
        left:
            t.left + (window.pageXOffset - document.documentElement.clientLeft),
        top: t.top + (window.pageYOffset - document.documentElement.clientTop),
    };
}
const ia = De.location;
const yu = /^(\w+:)\/\/([^:/?#]*):?(\d*)/i;
function mr(e) {
    const t = e.match(yu);
    return (
        t !== null &&
        (t[1] !== ia.protocol || t[2] !== ia.hostname || t[3] !== ia.port)
    );
}
function pr(e) {
    const t = "timestamp=".concat(new Date().getTime());
    return e + (e.indexOf("?") === -1 ? "?" : "&") + t;
}
function Nt(e) {
    const t = e.rotate;
    const i = e.scaleX;
    const a = e.scaleY;
    const n = e.translateX;
    const r = e.translateY;
    const l = [];
    Y(n) && n !== 0 && l.push("translateX(".concat(n, "px)")),
        Y(r) && r !== 0 && l.push("translateY(".concat(r, "px)")),
        Y(t) && t !== 0 && l.push("rotate(".concat(t, "deg)")),
        Y(i) && i !== 1 && l.push("scaleX(".concat(i, ")")),
        Y(a) && a !== 1 && l.push("scaleY(".concat(a, ")"));
    const o = l.length ? l.join(" ") : "none";
    return { WebkitTransform: o, msTransform: o, transform: o };
}
function Su(e) {
    const t = fr({}, e);
    let i = 0;
    return (
        le(e, function (a, n) {
            delete t[n],
                le(t, function (r) {
                    const l = Math.abs(a.startX - r.startX);
                    const o = Math.abs(a.startY - r.startY);
                    const s = Math.abs(a.endX - r.endX);
                    const u = Math.abs(a.endY - r.endY);
                    const c = Math.sqrt(l * l + o * o);
                    const d = Math.sqrt(s * s + u * u);
                    const h = (d - c) / c;
                    Math.abs(h) > Math.abs(i) && (i = h);
                });
        }),
        i
    );
}
function hi(e, t) {
    const i = e.pageX;
    const a = e.pageY;
    const n = { endX: i, endY: a };
    return t ? n : fr({ startX: i, startY: a }, n);
}
function wu(e) {
    let t = 0;
    let i = 0;
    let a = 0;
    return (
        le(e, function (n) {
            const r = n.startX;
            const l = n.startY;
            (t += r), (i += l), (a += 1);
        }),
        (t /= a),
        (i /= a),
        { pageX: t, pageY: i }
    );
}
function Ye(e) {
    const t = e.aspectRatio;
    let i = e.height;
    let a = e.width;
    const n =
        arguments.length > 1 && arguments[1] !== void 0
            ? arguments[1]
            : "contain";
    const r = hr(a);
    const l = hr(i);
    if (r && l) {
        const o = i * t;
        (n === "contain" && o > a) || (n === "cover" && o < a)
            ? (i = a / t)
            : (a = i * t);
    } else r ? (i = a / t) : l && (a = i * t);
    return { width: a, height: i };
}
function vu(e) {
    const t = e.width;
    const i = e.height;
    let a = e.degree;
    if (((a = Math.abs(a) % 180), a === 90)) return { width: i, height: t };
    const n = ((a % 90) * Math.PI) / 180;
    const r = Math.sin(n);
    const l = Math.cos(n);
    const o = t * l + i * r;
    const s = t * r + i * l;
    return a > 90 ? { width: s, height: o } : { width: o, height: s };
}
function Au(e, t, i, a) {
    const n = t.aspectRatio;
    const r = t.naturalWidth;
    const l = t.naturalHeight;
    const o = t.rotate;
    const s = o === void 0 ? 0 : o;
    const u = t.scaleX;
    const c = u === void 0 ? 1 : u;
    const d = t.scaleY;
    const h = d === void 0 ? 1 : d;
    const m = i.aspectRatio;
    const p = i.naturalWidth;
    const f = i.naturalHeight;
    const g = a.fillColor;
    const I = g === void 0 ? "transparent" : g;
    const E = a.imageSmoothingEnabled;
    const T = E === void 0 ? !0 : E;
    const _ = a.imageSmoothingQuality;
    const y = _ === void 0 ? "low" : _;
    const b = a.maxWidth;
    const A = b === void 0 ? 1 / 0 : b;
    const R = a.maxHeight;
    const S = R === void 0 ? 1 / 0 : R;
    const P = a.minWidth;
    const O = P === void 0 ? 0 : P;
    const x = a.minHeight;
    const z = x === void 0 ? 0 : x;
    const v = document.createElement("canvas");
    const F = v.getContext("2d");
    const w = Ye({ aspectRatio: m, width: A, height: S });
    const L = Ye({ aspectRatio: m, width: O, height: z }, "cover");
    const C = Math.min(w.width, Math.max(L.width, p));
    const D = Math.min(w.height, Math.max(L.height, f));
    const V = Ye({ aspectRatio: n, width: A, height: S });
    const B = Ye({ aspectRatio: n, width: O, height: z }, "cover");
    const j = Math.min(V.width, Math.max(B.width, r));
    const $ = Math.min(V.height, Math.max(B.height, l));
    const X = [-j / 2, -$ / 2, j, $];
    return (
        (v.width = Tt(C)),
        (v.height = Tt(D)),
        (F.fillStyle = I),
        F.fillRect(0, 0, C, D),
        F.save(),
        F.translate(C / 2, D / 2),
        F.rotate((s * Math.PI) / 180),
        F.scale(c, h),
        (F.imageSmoothingEnabled = T),
        (F.imageSmoothingQuality = y),
        F.drawImage.apply(
            F,
            [e].concat(
                gr(
                    X.map(function (ue) {
                        return Math.floor(Tt(ue));
                    }),
                ),
            ),
        ),
        F.restore(),
        v
    );
}
const Lr = String.fromCharCode;
function Lu(e, t, i) {
    let a = "";
    i += t;
    for (let n = t; n < i; n += 1) a += Lr(e.getUint8(n));
    return a;
}
const Mu = /^data:.*,/;
function xu(e) {
    const t = e.replace(Mu, "");
    const i = atob(t);
    const a = new ArrayBuffer(i.length);
    const n = new Uint8Array(a);
    return (
        le(n, function (r, l) {
            n[l] = i.charCodeAt(l);
        }),
        a
    );
}
function Ou(e, t) {
    for (var i = [], a = 8192, n = new Uint8Array(e); n.length > 0; ) {
        i.push(Lr.apply(null, Sr(n.subarray(0, a)))), (n = n.subarray(a));
    }
    return "data:".concat(t, ";base64,").concat(btoa(i.join("")));
}
function Pu(e) {
    const t = new DataView(e);
    let i;
    try {
        let a, n, r;
        if (t.getUint8(0) === 255 && t.getUint8(1) === 216) {
            for (let l = t.byteLength, o = 2; o + 1 < l; ) {
                if (t.getUint8(o) === 255 && t.getUint8(o + 1) === 225) {
                    n = o;
                    break;
                }
                o += 1;
            }
        }
        if (n) {
            const s = n + 4;
            const u = n + 10;
            if (Lu(t, s, 4) === "Exif") {
                const c = t.getUint16(u);
                if (
                    ((a = c === 18761),
                    (a || c === 19789) && t.getUint16(u + 2, a) === 42)
                ) {
                    const d = t.getUint32(u + 4, a);
                    d >= 8 && (r = u + d);
                }
            }
        }
        if (r) {
            const h = t.getUint16(r, a);
            let m;
            let p;
            for (p = 0; p < h; p += 1) {
                if (((m = r + p * 12 + 2), t.getUint16(m, a) === 274)) {
                    (m += 8), (i = t.getUint16(m, a)), t.setUint16(m, 1, a);
                    break;
                }
            }
        }
    } catch {
        i = 1;
    }
    return i;
}
function Du(e) {
    let t = 0;
    let i = 1;
    let a = 1;
    switch (e) {
        case 2:
            i = -1;
            break;
        case 3:
            t = -180;
            break;
        case 4:
            a = -1;
            break;
        case 5:
            (t = 90), (a = -1);
            break;
        case 6:
            t = 90;
            break;
        case 7:
            (t = 90), (i = -1);
            break;
        case 8:
            t = -90;
            break;
    }
    return { rotate: t, scaleX: i, scaleY: a };
}
const Fu = {
    render: function () {
        this.initContainer(),
            this.initCanvas(),
            this.initCropBox(),
            this.renderCanvas(),
            this.cropped && this.renderCropBox();
    },
    initContainer: function () {
        const t = this.element;
        const i = this.options;
        const a = this.container;
        const n = this.cropper;
        const r = Number(i.minContainerWidth);
        const l = Number(i.minContainerHeight);
        de(n, be), Pe(t, be);
        const o = {
            width: Math.max(a.offsetWidth, r >= 0 ? r : Rr),
            height: Math.max(a.offsetHeight, l >= 0 ? l : yr),
        };
        (this.containerData = o),
            We(n, { width: o.width, height: o.height }),
            de(t, be),
            Pe(n, be);
    },
    initCanvas: function () {
        const t = this.containerData;
        const i = this.imageData;
        const a = this.options.viewMode;
        const n = Math.abs(i.rotate) % 180 === 90;
        const r = n ? i.naturalHeight : i.naturalWidth;
        const l = n ? i.naturalWidth : i.naturalHeight;
        const o = r / l;
        let s = t.width;
        let u = t.height;
        t.height * o > t.width
            ? a === 3
                ? (s = t.height * o)
                : (u = t.width / o)
            : a === 3
              ? (u = t.width / o)
              : (s = t.height * o);
        const c = {
            aspectRatio: o,
            naturalWidth: r,
            naturalHeight: l,
            width: s,
            height: u,
        };
        (this.canvasData = c),
            (this.limited = a === 1 || a === 2),
            this.limitCanvas(!0, !0),
            (c.width = Math.min(Math.max(c.width, c.minWidth), c.maxWidth)),
            (c.height = Math.min(Math.max(c.height, c.minHeight), c.maxHeight)),
            (c.left = (t.width - c.width) / 2),
            (c.top = (t.height - c.height) / 2),
            (c.oldLeft = c.left),
            (c.oldTop = c.top),
            (this.initialCanvasData = Z({}, c));
    },
    limitCanvas: function (t, i) {
        const a = this.options;
        const n = this.containerData;
        const r = this.canvasData;
        const l = this.cropBoxData;
        const o = a.viewMode;
        const s = r.aspectRatio;
        const u = this.cropped && l;
        if (t) {
            let c = Number(a.minCanvasWidth) || 0;
            let d = Number(a.minCanvasHeight) || 0;
            o > 1
                ? ((c = Math.max(c, n.width)),
                  (d = Math.max(d, n.height)),
                  o === 3 && (d * s > c ? (c = d * s) : (d = c / s)))
                : o > 0 &&
                  (c
                      ? (c = Math.max(c, u ? l.width : 0))
                      : d
                        ? (d = Math.max(d, u ? l.height : 0))
                        : u &&
                          ((c = l.width),
                          (d = l.height),
                          d * s > c ? (c = d * s) : (d = c / s)));
            const h = Ye({ aspectRatio: s, width: c, height: d });
            (c = h.width),
                (d = h.height),
                (r.minWidth = c),
                (r.minHeight = d),
                (r.maxWidth = 1 / 0),
                (r.maxHeight = 1 / 0);
        }
        if (i) {
            if (o > (u ? 0 : 1)) {
                const m = n.width - r.width;
                const p = n.height - r.height;
                (r.minLeft = Math.min(0, m)),
                    (r.minTop = Math.min(0, p)),
                    (r.maxLeft = Math.max(0, m)),
                    (r.maxTop = Math.max(0, p)),
                    u &&
                        this.limited &&
                        ((r.minLeft = Math.min(
                            l.left,
                            l.left + (l.width - r.width),
                        )),
                        (r.minTop = Math.min(
                            l.top,
                            l.top + (l.height - r.height),
                        )),
                        (r.maxLeft = l.left),
                        (r.maxTop = l.top),
                        o === 2 &&
                            (r.width >= n.width &&
                                ((r.minLeft = Math.min(0, m)),
                                (r.maxLeft = Math.max(0, m))),
                            r.height >= n.height &&
                                ((r.minTop = Math.min(0, p)),
                                (r.maxTop = Math.max(0, p)))));
            } else {
                (r.minLeft = -r.width),
                    (r.minTop = -r.height),
                    (r.maxLeft = n.width),
                    (r.maxTop = n.height);
            }
        }
    },
    renderCanvas: function (t, i) {
        const a = this.canvasData;
        const n = this.imageData;
        if (i) {
            const r = vu({
                width: n.naturalWidth * Math.abs(n.scaleX || 1),
                height: n.naturalHeight * Math.abs(n.scaleY || 1),
                degree: n.rotate || 0,
            });
            const l = r.width;
            const o = r.height;
            const s = a.width * (l / a.naturalWidth);
            const u = a.height * (o / a.naturalHeight);
            (a.left -= (s - a.width) / 2),
                (a.top -= (u - a.height) / 2),
                (a.width = s),
                (a.height = u),
                (a.aspectRatio = l / o),
                (a.naturalWidth = l),
                (a.naturalHeight = o),
                this.limitCanvas(!0, !1);
        }
        (a.width > a.maxWidth || a.width < a.minWidth) && (a.left = a.oldLeft),
            (a.height > a.maxHeight || a.height < a.minHeight) &&
                (a.top = a.oldTop),
            (a.width = Math.min(Math.max(a.width, a.minWidth), a.maxWidth)),
            (a.height = Math.min(Math.max(a.height, a.minHeight), a.maxHeight)),
            this.limitCanvas(!1, !0),
            (a.left = Math.min(Math.max(a.left, a.minLeft), a.maxLeft)),
            (a.top = Math.min(Math.max(a.top, a.minTop), a.maxTop)),
            (a.oldLeft = a.left),
            (a.oldTop = a.top),
            We(
                this.canvas,
                Z(
                    { width: a.width, height: a.height },
                    Nt({ translateX: a.left, translateY: a.top }),
                ),
            ),
            this.renderImage(t),
            this.cropped && this.limited && this.limitCropBox(!0, !0);
    },
    renderImage: function (t) {
        const i = this.canvasData;
        const a = this.imageData;
        const n = a.naturalWidth * (i.width / i.naturalWidth);
        const r = a.naturalHeight * (i.height / i.naturalHeight);
        Z(a, {
            width: n,
            height: r,
            left: (i.width - n) / 2,
            top: (i.height - r) / 2,
        }),
            We(
                this.image,
                Z(
                    { width: a.width, height: a.height },
                    Nt(Z({ translateX: a.left, translateY: a.top }, a)),
                ),
            ),
            t && this.output();
    },
    initCropBox: function () {
        const t = this.options;
        const i = this.canvasData;
        const a = t.aspectRatio || t.initialAspectRatio;
        const n = Number(t.autoCropArea) || 0.8;
        const r = { width: i.width, height: i.height };
        a &&
            (i.height * a > i.width
                ? (r.height = r.width / a)
                : (r.width = r.height * a)),
            (this.cropBoxData = r),
            this.limitCropBox(!0, !0),
            (r.width = Math.min(Math.max(r.width, r.minWidth), r.maxWidth)),
            (r.height = Math.min(Math.max(r.height, r.minHeight), r.maxHeight)),
            (r.width = Math.max(r.minWidth, r.width * n)),
            (r.height = Math.max(r.minHeight, r.height * n)),
            (r.left = i.left + (i.width - r.width) / 2),
            (r.top = i.top + (i.height - r.height) / 2),
            (r.oldLeft = r.left),
            (r.oldTop = r.top),
            (this.initialCropBoxData = Z({}, r));
    },
    limitCropBox: function (t, i) {
        const a = this.options;
        const n = this.containerData;
        const r = this.canvasData;
        const l = this.cropBoxData;
        const o = this.limited;
        const s = a.aspectRatio;
        if (t) {
            let u = Number(a.minCropBoxWidth) || 0;
            let c = Number(a.minCropBoxHeight) || 0;
            let d = o
                ? Math.min(n.width, r.width, r.width + r.left, n.width - r.left)
                : n.width;
            let h = o
                ? Math.min(
                      n.height,
                      r.height,
                      r.height + r.top,
                      n.height - r.top,
                  )
                : n.height;
            (u = Math.min(u, n.width)),
                (c = Math.min(c, n.height)),
                s &&
                    (u && c
                        ? c * s > u
                            ? (c = u / s)
                            : (u = c * s)
                        : u
                          ? (c = u / s)
                          : c && (u = c * s),
                    h * s > d ? (h = d / s) : (d = h * s)),
                (l.minWidth = Math.min(u, d)),
                (l.minHeight = Math.min(c, h)),
                (l.maxWidth = d),
                (l.maxHeight = h);
        }
        i &&
            (o
                ? ((l.minLeft = Math.max(0, r.left)),
                  (l.minTop = Math.max(0, r.top)),
                  (l.maxLeft = Math.min(n.width, r.left + r.width) - l.width),
                  (l.maxTop = Math.min(n.height, r.top + r.height) - l.height))
                : ((l.minLeft = 0),
                  (l.minTop = 0),
                  (l.maxLeft = n.width - l.width),
                  (l.maxTop = n.height - l.height)));
    },
    renderCropBox: function () {
        const t = this.options;
        const i = this.containerData;
        const a = this.cropBoxData;
        (a.width > a.maxWidth || a.width < a.minWidth) && (a.left = a.oldLeft),
            (a.height > a.maxHeight || a.height < a.minHeight) &&
                (a.top = a.oldTop),
            (a.width = Math.min(Math.max(a.width, a.minWidth), a.maxWidth)),
            (a.height = Math.min(Math.max(a.height, a.minHeight), a.maxHeight)),
            this.limitCropBox(!1, !0),
            (a.left = Math.min(Math.max(a.left, a.minLeft), a.maxLeft)),
            (a.top = Math.min(Math.max(a.top, a.minTop), a.maxTop)),
            (a.oldLeft = a.left),
            (a.oldTop = a.top),
            t.movable &&
                t.cropBoxMovable &&
                Vt(
                    this.face,
                    Bt,
                    a.width >= i.width && a.height >= i.height ? Tr : fa,
                ),
            We(
                this.cropBox,
                Z(
                    { width: a.width, height: a.height },
                    Nt({ translateX: a.left, translateY: a.top }),
                ),
            ),
            this.cropped && this.limited && this.limitCanvas(!0, !0),
            this.disabled || this.output();
    },
    output: function () {
        this.preview(), bt(this.element, oa, this.getData());
    },
};
const Cu = {
    initPreview: function () {
        const t = this.element;
        const i = this.crossOrigin;
        const a = this.options.preview;
        const n = i ? this.crossOriginUrl : this.url;
        const r = t.alt || "The image to preview";
        const l = document.createElement("img");
        if (
            (i && (l.crossOrigin = i),
            (l.src = n),
            (l.alt = r),
            this.viewBox.appendChild(l),
            (this.viewBoxImage = l),
            !!a)
        ) {
            let o = a;
            typeof a === "string"
                ? (o = t.ownerDocument.querySelectorAll(a))
                : a.querySelector && (o = [a]),
                (this.previews = o),
                le(o, function (s) {
                    const u = document.createElement("img");
                    Vt(s, ui, {
                        width: s.offsetWidth,
                        height: s.offsetHeight,
                        html: s.innerHTML,
                    }),
                        i && (u.crossOrigin = i),
                        (u.src = n),
                        (u.alt = r),
                        (u.style.cssText =
                            'display:block;width:100%;height:auto;min-width:0!important;min-height:0!important;max-width:none!important;max-height:none!important;image-orientation:0deg!important;"'),
                        (s.innerHTML = ""),
                        s.appendChild(u);
                });
        }
    },
    resetPreview: function () {
        le(this.previews, function (t) {
            const i = ha(t, ui);
            We(t, { width: i.width, height: i.height }),
                (t.innerHTML = i.html),
                Ru(t, ui);
        });
    },
    preview: function () {
        const t = this.imageData;
        const i = this.canvasData;
        const a = this.cropBoxData;
        const n = a.width;
        const r = a.height;
        const l = t.width;
        const o = t.height;
        const s = a.left - i.left - t.left;
        const u = a.top - i.top - t.top;
        !this.cropped ||
            this.disabled ||
            (We(
                this.viewBoxImage,
                Z(
                    { width: l, height: o },
                    Nt(Z({ translateX: -s, translateY: -u }, t)),
                ),
            ),
            le(this.previews, function (c) {
                const d = ha(c, ui);
                const h = d.width;
                const m = d.height;
                let p = h;
                let f = m;
                let g = 1;
                n && ((g = h / n), (f = r * g)),
                    r && f > m && ((g = m / r), (p = n * g), (f = m)),
                    We(c, { width: p, height: f }),
                    We(
                        c.getElementsByTagName("img")[0],
                        Z(
                            { width: l * g, height: o * g },
                            Nt(
                                Z(
                                    { translateX: -s * g, translateY: -u * g },
                                    t,
                                ),
                            ),
                        ),
                    );
            }));
    },
};
const zu = {
    bind: function () {
        const t = this.element;
        const i = this.options;
        const a = this.cropper;
        Te(i.cropstart) && we(t, da, i.cropstart),
            Te(i.cropmove) && we(t, ca, i.cropmove),
            Te(i.cropend) && we(t, sa, i.cropend),
            Te(i.crop) && we(t, oa, i.crop),
            Te(i.zoom) && we(t, ua, i.zoom),
            we(a, nr, (this.onCropStart = this.cropStart.bind(this))),
            i.zoomable &&
                i.zoomOnWheel &&
                we(a, cr, (this.onWheel = this.wheel.bind(this)), {
                    passive: !1,
                    capture: !0,
                }),
            i.toggleDragModeOnDblclick &&
                we(a, ar, (this.onDblclick = this.dblclick.bind(this))),
            we(
                t.ownerDocument,
                rr,
                (this.onCropMove = this.cropMove.bind(this)),
            ),
            we(t.ownerDocument, lr, (this.onCropEnd = this.cropEnd.bind(this))),
            i.responsive &&
                we(window, sr, (this.onResize = this.resize.bind(this)));
    },
    unbind: function () {
        const t = this.element;
        const i = this.options;
        const a = this.cropper;
        Te(i.cropstart) && Oe(t, da, i.cropstart),
            Te(i.cropmove) && Oe(t, ca, i.cropmove),
            Te(i.cropend) && Oe(t, sa, i.cropend),
            Te(i.crop) && Oe(t, oa, i.crop),
            Te(i.zoom) && Oe(t, ua, i.zoom),
            Oe(a, nr, this.onCropStart),
            i.zoomable &&
                i.zoomOnWheel &&
                Oe(a, cr, this.onWheel, { passive: !1, capture: !0 }),
            i.toggleDragModeOnDblclick && Oe(a, ar, this.onDblclick),
            Oe(t.ownerDocument, rr, this.onCropMove),
            Oe(t.ownerDocument, lr, this.onCropEnd),
            i.responsive && Oe(window, sr, this.onResize);
    },
};
const Nu = {
    resize: function () {
        if (!this.disabled) {
            const t = this.options;
            const i = this.container;
            const a = this.containerData;
            const n = i.offsetWidth / a.width;
            const r = i.offsetHeight / a.height;
            const l = Math.abs(n - 1) > Math.abs(r - 1) ? n : r;
            if (l !== 1) {
                let o, s;
                t.restore &&
                    ((o = this.getCanvasData()), (s = this.getCropBoxData())),
                    this.render(),
                    t.restore &&
                        (this.setCanvasData(
                            le(o, function (u, c) {
                                o[c] = u * l;
                            }),
                        ),
                        this.setCropBoxData(
                            le(s, function (u, c) {
                                s[c] = u * l;
                            }),
                        ));
            }
        }
    },
    dblclick: function () {
        this.disabled ||
            this.options.dragMode === _r ||
            this.setDragMode(Iu(this.dragBox, ra) ? Ir : ga);
    },
    wheel: function (t) {
        const i = this;
        const a = Number(this.options.wheelZoomRatio) || 0.1;
        let n = 1;
        this.disabled ||
            (t.preventDefault(),
            !this.wheeling &&
                ((this.wheeling = !0),
                setTimeout(function () {
                    i.wheeling = !1;
                }, 50),
                t.deltaY
                    ? (n = t.deltaY > 0 ? 1 : -1)
                    : t.wheelDelta
                      ? (n = -t.wheelDelta / 120)
                      : t.detail && (n = t.detail > 0 ? 1 : -1),
                this.zoom(-n * a, t)));
    },
    cropStart: function (t) {
        const i = t.buttons;
        const a = t.button;
        if (
            !(
                this.disabled ||
                ((t.type === "mousedown" ||
                    (t.type === "pointerdown" && t.pointerType === "mouse")) &&
                    ((Y(i) && i !== 1) || (Y(a) && a !== 0) || t.ctrlKey))
            )
        ) {
            const n = this.options;
            const r = this.pointers;
            let l;
            t.changedTouches
                ? le(t.changedTouches, function (o) {
                      r[o.identifier] = hi(o);
                  })
                : (r[t.pointerId || 0] = hi(t)),
                Object.keys(r).length > 1 && n.zoomable && n.zoomOnTouch
                    ? (l = br)
                    : (l = ha(t.target, Bt)),
                du.test(l) &&
                    bt(this.element, da, { originalEvent: t, action: l }) !==
                        !1 &&
                    (t.preventDefault(),
                    (this.action = l),
                    (this.cropping = !1),
                    l === Er && ((this.cropping = !0), de(this.dragBox, mi)));
        }
    },
    cropMove: function (t) {
        const i = this.action;
        if (!(this.disabled || !i)) {
            const a = this.pointers;
            t.preventDefault(),
                bt(this.element, ca, { originalEvent: t, action: i }) !== !1 &&
                    (t.changedTouches
                        ? le(t.changedTouches, function (n) {
                              Z(a[n.identifier] || {}, hi(n, !0));
                          })
                        : Z(a[t.pointerId || 0] || {}, hi(t, !0)),
                    this.change(t));
        }
    },
    cropEnd: function (t) {
        if (!this.disabled) {
            const i = this.action;
            const a = this.pointers;
            t.changedTouches
                ? le(t.changedTouches, function (n) {
                      delete a[n.identifier];
                  })
                : delete a[t.pointerId || 0],
                i &&
                    (t.preventDefault(),
                    Object.keys(a).length || (this.action = ""),
                    this.cropping &&
                        ((this.cropping = !1),
                        Et(
                            this.dragBox,
                            mi,
                            this.cropped && this.options.modal,
                        )),
                    bt(this.element, sa, { originalEvent: t, action: i }));
        }
    },
};
const Bu = {
    change: function (t) {
        const i = this.options;
        const a = this.canvasData;
        const n = this.containerData;
        const r = this.cropBoxData;
        const l = this.pointers;
        let o = this.action;
        let s = i.aspectRatio;
        let u = r.left;
        let c = r.top;
        let d = r.width;
        let h = r.height;
        const m = u + d;
        const p = c + h;
        let f = 0;
        let g = 0;
        let I = n.width;
        let E = n.height;
        let T = !0;
        let _;
        !s && t.shiftKey && (s = d && h ? d / h : 1),
            this.limited &&
                ((f = r.minLeft),
                (g = r.minTop),
                (I = f + Math.min(n.width, a.width, a.left + a.width)),
                (E = g + Math.min(n.height, a.height, a.top + a.height)));
        const y = l[Object.keys(l)[0]];
        const b = { x: y.endX - y.startX, y: y.endY - y.startY };
        const A = function (S) {
            switch (S) {
                case it:
                    m + b.x > I && (b.x = I - m);
                    break;
                case at:
                    u + b.x < f && (b.x = f - u);
                    break;
                case He:
                    c + b.y < g && (b.y = g - c);
                    break;
                case ft:
                    p + b.y > E && (b.y = E - p);
                    break;
            }
        };
        switch (o) {
            case fa:
                (u += b.x), (c += b.y);
                break;
            case it:
                if (b.x >= 0 && (m >= I || (s && (c <= g || p >= E)))) {
                    T = !1;
                    break;
                }
                A(it),
                    (d += b.x),
                    d < 0 && ((o = at), (d = -d), (u -= d)),
                    s && ((h = d / s), (c += (r.height - h) / 2));
                break;
            case He:
                if (b.y <= 0 && (c <= g || (s && (u <= f || m >= I)))) {
                    T = !1;
                    break;
                }
                A(He),
                    (h -= b.y),
                    (c += b.y),
                    h < 0 && ((o = ft), (h = -h), (c -= h)),
                    s && ((d = h * s), (u += (r.width - d) / 2));
                break;
            case at:
                if (b.x <= 0 && (u <= f || (s && (c <= g || p >= E)))) {
                    T = !1;
                    break;
                }
                A(at),
                    (d -= b.x),
                    (u += b.x),
                    d < 0 && ((o = it), (d = -d), (u -= d)),
                    s && ((h = d / s), (c += (r.height - h) / 2));
                break;
            case ft:
                if (b.y >= 0 && (p >= E || (s && (u <= f || m >= I)))) {
                    T = !1;
                    break;
                }
                A(ft),
                    (h += b.y),
                    h < 0 && ((o = He), (h = -h), (c -= h)),
                    s && ((d = h * s), (u += (r.width - d) / 2));
                break;
            case Dt:
                if (s) {
                    if (b.y <= 0 && (c <= g || m >= I)) {
                        T = !1;
                        break;
                    }
                    A(He), (h -= b.y), (c += b.y), (d = h * s);
                } else {
                    A(He),
                        A(it),
                        b.x >= 0
                            ? m < I
                                ? (d += b.x)
                                : b.y <= 0 && c <= g && (T = !1)
                            : (d += b.x),
                        b.y <= 0
                            ? c > g && ((h -= b.y), (c += b.y))
                            : ((h -= b.y), (c += b.y));
                }
                d < 0 && h < 0
                    ? ((o = zt), (h = -h), (d = -d), (c -= h), (u -= d))
                    : d < 0
                      ? ((o = Ft), (d = -d), (u -= d))
                      : h < 0 && ((o = Ct), (h = -h), (c -= h));
                break;
            case Ft:
                if (s) {
                    if (b.y <= 0 && (c <= g || u <= f)) {
                        T = !1;
                        break;
                    }
                    A(He),
                        (h -= b.y),
                        (c += b.y),
                        (d = h * s),
                        (u += r.width - d);
                } else {
                    A(He),
                        A(at),
                        b.x <= 0
                            ? u > f
                                ? ((d -= b.x), (u += b.x))
                                : b.y <= 0 && c <= g && (T = !1)
                            : ((d -= b.x), (u += b.x)),
                        b.y <= 0
                            ? c > g && ((h -= b.y), (c += b.y))
                            : ((h -= b.y), (c += b.y));
                }
                d < 0 && h < 0
                    ? ((o = Ct), (h = -h), (d = -d), (c -= h), (u -= d))
                    : d < 0
                      ? ((o = Dt), (d = -d), (u -= d))
                      : h < 0 && ((o = zt), (h = -h), (c -= h));
                break;
            case zt:
                if (s) {
                    if (b.x <= 0 && (u <= f || p >= E)) {
                        T = !1;
                        break;
                    }
                    A(at), (d -= b.x), (u += b.x), (h = d / s);
                } else {
                    A(ft),
                        A(at),
                        b.x <= 0
                            ? u > f
                                ? ((d -= b.x), (u += b.x))
                                : b.y >= 0 && p >= E && (T = !1)
                            : ((d -= b.x), (u += b.x)),
                        b.y >= 0 ? p < E && (h += b.y) : (h += b.y);
                }
                d < 0 && h < 0
                    ? ((o = Dt), (h = -h), (d = -d), (c -= h), (u -= d))
                    : d < 0
                      ? ((o = Ct), (d = -d), (u -= d))
                      : h < 0 && ((o = Ft), (h = -h), (c -= h));
                break;
            case Ct:
                if (s) {
                    if (b.x >= 0 && (m >= I || p >= E)) {
                        T = !1;
                        break;
                    }
                    A(it), (d += b.x), (h = d / s);
                } else {
                    A(ft),
                        A(it),
                        b.x >= 0
                            ? m < I
                                ? (d += b.x)
                                : b.y >= 0 && p >= E && (T = !1)
                            : (d += b.x),
                        b.y >= 0 ? p < E && (h += b.y) : (h += b.y);
                }
                d < 0 && h < 0
                    ? ((o = Ft), (h = -h), (d = -d), (c -= h), (u -= d))
                    : d < 0
                      ? ((o = zt), (d = -d), (u -= d))
                      : h < 0 && ((o = Dt), (h = -h), (c -= h));
                break;
            case Tr:
                this.move(b.x, b.y), (T = !1);
                break;
            case br:
                this.zoom(Su(l), t), (T = !1);
                break;
            case Er:
                if (!b.x || !b.y) {
                    T = !1;
                    break;
                }
                (_ = Ar(this.cropper)),
                    (u = y.startX - _.left),
                    (c = y.startY - _.top),
                    (d = r.minWidth),
                    (h = r.minHeight),
                    b.x > 0
                        ? (o = b.y > 0 ? Ct : Dt)
                        : b.x < 0 && ((u -= d), (o = b.y > 0 ? zt : Ft)),
                    b.y < 0 && (c -= h),
                    this.cropped ||
                        (Pe(this.cropBox, be),
                        (this.cropped = !0),
                        this.limited && this.limitCropBox(!0, !0));
                break;
        }
        T &&
            ((r.width = d),
            (r.height = h),
            (r.left = u),
            (r.top = c),
            (this.action = o),
            this.renderCropBox()),
            le(l, function (R) {
                (R.startX = R.endX), (R.startY = R.endY);
            });
    },
};
const Vu = {
    crop: function () {
        return (
            this.ready &&
                !this.cropped &&
                !this.disabled &&
                ((this.cropped = !0),
                this.limitCropBox(!0, !0),
                this.options.modal && de(this.dragBox, mi),
                Pe(this.cropBox, be),
                this.setCropBoxData(this.initialCropBoxData)),
            this
        );
    },
    reset: function () {
        return (
            this.ready &&
                !this.disabled &&
                ((this.imageData = Z({}, this.initialImageData)),
                (this.canvasData = Z({}, this.initialCanvasData)),
                (this.cropBoxData = Z({}, this.initialCropBoxData)),
                this.renderCanvas(),
                this.cropped && this.renderCropBox()),
            this
        );
    },
    clear: function () {
        return (
            this.cropped &&
                !this.disabled &&
                (Z(this.cropBoxData, { left: 0, top: 0, width: 0, height: 0 }),
                (this.cropped = !1),
                this.renderCropBox(),
                this.limitCanvas(!0, !0),
                this.renderCanvas(),
                Pe(this.dragBox, mi),
                de(this.cropBox, be)),
            this
        );
    },
    replace: function (t) {
        const i =
            arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
        return (
            !this.disabled &&
                t &&
                (this.isImg && (this.element.src = t),
                i
                    ? ((this.url = t),
                      (this.image.src = t),
                      this.ready &&
                          ((this.viewBoxImage.src = t),
                          le(this.previews, function (a) {
                              a.getElementsByTagName("img")[0].src = t;
                          })))
                    : (this.isImg && (this.replaced = !0),
                      (this.options.data = null),
                      this.uncreate(),
                      this.load(t))),
            this
        );
    },
    enable: function () {
        return (
            this.ready &&
                this.disabled &&
                ((this.disabled = !1), Pe(this.cropper, tr)),
            this
        );
    },
    disable: function () {
        return (
            this.ready &&
                !this.disabled &&
                ((this.disabled = !0), de(this.cropper, tr)),
            this
        );
    },
    destroy: function () {
        const t = this.element;
        return t[K]
            ? ((t[K] = void 0),
              this.isImg && this.replaced && (t.src = this.originalUrl),
              this.uncreate(),
              this)
            : this;
    },
    move: function (t) {
        const i =
            arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : t;
        const a = this.canvasData;
        const n = a.left;
        const r = a.top;
        return this.moveTo(
            ta(t) ? t : n + Number(t),
            ta(i) ? i : r + Number(i),
        );
    },
    moveTo: function (t) {
        let i =
            arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : t;
        const a = this.canvasData;
        let n = !1;
        return (
            (t = Number(t)),
            (i = Number(i)),
            this.ready &&
                !this.disabled &&
                this.options.movable &&
                (Y(t) && ((a.left = t), (n = !0)),
                Y(i) && ((a.top = i), (n = !0)),
                n && this.renderCanvas(!0)),
            this
        );
    },
    zoom: function (t, i) {
        const a = this.canvasData;
        return (
            (t = Number(t)),
            t < 0 ? (t = 1 / (1 - t)) : (t = 1 + t),
            this.zoomTo((a.width * t) / a.naturalWidth, null, i)
        );
    },
    zoomTo: function (t, i, a) {
        const n = this.options;
        const r = this.canvasData;
        const l = r.width;
        const o = r.height;
        const s = r.naturalWidth;
        const u = r.naturalHeight;
        if (
            ((t = Number(t)),
            t >= 0 && this.ready && !this.disabled && n.zoomable)
        ) {
            const c = s * t;
            const d = u * t;
            if (
                bt(this.element, ua, {
                    ratio: t,
                    oldRatio: l / s,
                    originalEvent: a,
                }) === !1
            ) {
                return this;
            }
            if (a) {
                const h = this.pointers;
                const m = Ar(this.cropper);
                const p =
                    h && Object.keys(h).length
                        ? wu(h)
                        : { pageX: a.pageX, pageY: a.pageY };
                (r.left -= (c - l) * ((p.pageX - m.left - r.left) / l)),
                    (r.top -= (d - o) * ((p.pageY - m.top - r.top) / o));
            } else {
                gt(i) && Y(i.x) && Y(i.y)
                    ? ((r.left -= (c - l) * ((i.x - r.left) / l)),
                      (r.top -= (d - o) * ((i.y - r.top) / o)))
                    : ((r.left -= (c - l) / 2), (r.top -= (d - o) / 2));
            }
            (r.width = c), (r.height = d), this.renderCanvas(!0);
        }
        return this;
    },
    rotate: function (t) {
        return this.rotateTo((this.imageData.rotate || 0) + Number(t));
    },
    rotateTo: function (t) {
        return (
            (t = Number(t)),
            Y(t) &&
                this.ready &&
                !this.disabled &&
                this.options.rotatable &&
                ((this.imageData.rotate = t % 360), this.renderCanvas(!0, !0)),
            this
        );
    },
    scaleX: function (t) {
        const i = this.imageData.scaleY;
        return this.scale(t, Y(i) ? i : 1);
    },
    scaleY: function (t) {
        const i = this.imageData.scaleX;
        return this.scale(Y(i) ? i : 1, t);
    },
    scale: function (t) {
        let i =
            arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : t;
        const a = this.imageData;
        let n = !1;
        return (
            (t = Number(t)),
            (i = Number(i)),
            this.ready &&
                !this.disabled &&
                this.options.scalable &&
                (Y(t) && ((a.scaleX = t), (n = !0)),
                Y(i) && ((a.scaleY = i), (n = !0)),
                n && this.renderCanvas(!0, !0)),
            this
        );
    },
    getData: function () {
        const t =
            arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1;
        const i = this.options;
        const a = this.imageData;
        const n = this.canvasData;
        const r = this.cropBoxData;
        let l;
        if (this.ready && this.cropped) {
            l = {
                x: r.left - n.left,
                y: r.top - n.top,
                width: r.width,
                height: r.height,
            };
            const o = a.width / a.naturalWidth;
            if (
                (le(l, function (c, d) {
                    l[d] = c / o;
                }),
                t)
            ) {
                const s = Math.round(l.y + l.height);
                const u = Math.round(l.x + l.width);
                (l.x = Math.round(l.x)),
                    (l.y = Math.round(l.y)),
                    (l.width = u - l.x),
                    (l.height = s - l.y);
            }
        } else l = { x: 0, y: 0, width: 0, height: 0 };
        return (
            i.rotatable && (l.rotate = a.rotate || 0),
            i.scalable &&
                ((l.scaleX = a.scaleX || 1), (l.scaleY = a.scaleY || 1)),
            l
        );
    },
    setData: function (t) {
        const i = this.options;
        const a = this.imageData;
        const n = this.canvasData;
        const r = {};
        if (this.ready && !this.disabled && gt(t)) {
            let l = !1;
            i.rotatable &&
                Y(t.rotate) &&
                t.rotate !== a.rotate &&
                ((a.rotate = t.rotate), (l = !0)),
                i.scalable &&
                    (Y(t.scaleX) &&
                        t.scaleX !== a.scaleX &&
                        ((a.scaleX = t.scaleX), (l = !0)),
                    Y(t.scaleY) &&
                        t.scaleY !== a.scaleY &&
                        ((a.scaleY = t.scaleY), (l = !0))),
                l && this.renderCanvas(!0, !0);
            const o = a.width / a.naturalWidth;
            Y(t.x) && (r.left = t.x * o + n.left),
                Y(t.y) && (r.top = t.y * o + n.top),
                Y(t.width) && (r.width = t.width * o),
                Y(t.height) && (r.height = t.height * o),
                this.setCropBoxData(r);
        }
        return this;
    },
    getContainerData: function () {
        return this.ready ? Z({}, this.containerData) : {};
    },
    getImageData: function () {
        return this.sized ? Z({}, this.imageData) : {};
    },
    getCanvasData: function () {
        const t = this.canvasData;
        const i = {};
        return (
            this.ready &&
                le(
                    [
                        "left",
                        "top",
                        "width",
                        "height",
                        "naturalWidth",
                        "naturalHeight",
                    ],
                    function (a) {
                        i[a] = t[a];
                    },
                ),
            i
        );
    },
    setCanvasData: function (t) {
        const i = this.canvasData;
        const a = i.aspectRatio;
        return (
            this.ready &&
                !this.disabled &&
                gt(t) &&
                (Y(t.left) && (i.left = t.left),
                Y(t.top) && (i.top = t.top),
                Y(t.width)
                    ? ((i.width = t.width), (i.height = t.width / a))
                    : Y(t.height) &&
                      ((i.height = t.height), (i.width = t.height * a)),
                this.renderCanvas(!0)),
            this
        );
    },
    getCropBoxData: function () {
        const t = this.cropBoxData;
        let i;
        return (
            this.ready &&
                this.cropped &&
                (i = {
                    left: t.left,
                    top: t.top,
                    width: t.width,
                    height: t.height,
                }),
            i || {}
        );
    },
    setCropBoxData: function (t) {
        const i = this.cropBoxData;
        const a = this.options.aspectRatio;
        let n;
        let r;
        return (
            this.ready &&
                this.cropped &&
                !this.disabled &&
                gt(t) &&
                (Y(t.left) && (i.left = t.left),
                Y(t.top) && (i.top = t.top),
                Y(t.width) &&
                    t.width !== i.width &&
                    ((n = !0), (i.width = t.width)),
                Y(t.height) &&
                    t.height !== i.height &&
                    ((r = !0), (i.height = t.height)),
                a &&
                    (n
                        ? (i.height = i.width / a)
                        : r && (i.width = i.height * a)),
                this.renderCropBox()),
            this
        );
    },
    getCroppedCanvas: function () {
        const t =
            arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        if (!this.ready || !window.HTMLCanvasElement) return null;
        const i = this.canvasData;
        const a = Au(this.image, this.imageData, i, t);
        if (!this.cropped) return a;
        const n = this.getData();
        let r = n.x;
        let l = n.y;
        let o = n.width;
        let s = n.height;
        const u = a.width / Math.floor(i.naturalWidth);
        u !== 1 && ((r *= u), (l *= u), (o *= u), (s *= u));
        const c = o / s;
        const d = Ye({
            aspectRatio: c,
            width: t.maxWidth || 1 / 0,
            height: t.maxHeight || 1 / 0,
        });
        const h = Ye(
            {
                aspectRatio: c,
                width: t.minWidth || 0,
                height: t.minHeight || 0,
            },
            "cover",
        );
        const m = Ye({
            aspectRatio: c,
            width: t.width || (u !== 1 ? a.width : o),
            height: t.height || (u !== 1 ? a.height : s),
        });
        let p = m.width;
        let f = m.height;
        (p = Math.min(d.width, Math.max(h.width, p))),
            (f = Math.min(d.height, Math.max(h.height, f)));
        const g = document.createElement("canvas");
        const I = g.getContext("2d");
        (g.width = Tt(p)),
            (g.height = Tt(f)),
            (I.fillStyle = t.fillColor || "transparent"),
            I.fillRect(0, 0, p, f);
        const E = t.imageSmoothingEnabled;
        const T = E === void 0 ? !0 : E;
        const _ = t.imageSmoothingQuality;
        (I.imageSmoothingEnabled = T), _ && (I.imageSmoothingQuality = _);
        const y = a.width;
        const b = a.height;
        let A = r;
        let R = l;
        let S;
        let P;
        let O;
        let x;
        let z;
        let v;
        A <= -o || A > y
            ? ((A = 0), (S = 0), (O = 0), (z = 0))
            : A <= 0
              ? ((O = -A), (A = 0), (S = Math.min(y, o + A)), (z = S))
              : A <= y && ((O = 0), (S = Math.min(o, y - A)), (z = S)),
            S <= 0 || R <= -s || R > b
                ? ((R = 0), (P = 0), (x = 0), (v = 0))
                : R <= 0
                  ? ((x = -R), (R = 0), (P = Math.min(b, s + R)), (v = P))
                  : R <= b && ((x = 0), (P = Math.min(s, b - R)), (v = P));
        const F = [A, R, S, P];
        if (z > 0 && v > 0) {
            const w = p / o;
            F.push(O * w, x * w, z * w, v * w);
        }
        return (
            I.drawImage.apply(
                I,
                [a].concat(
                    gr(
                        F.map(function (L) {
                            return Math.floor(Tt(L));
                        }),
                    ),
                ),
            ),
            g
        );
    },
    setAspectRatio: function (t) {
        const i = this.options;
        return (
            !this.disabled &&
                !ta(t) &&
                ((i.aspectRatio = Math.max(0, t) || NaN),
                this.ready &&
                    (this.initCropBox(), this.cropped && this.renderCropBox())),
            this
        );
    },
    setDragMode: function (t) {
        const i = this.options;
        const a = this.dragBox;
        const n = this.face;
        if (this.ready && !this.disabled) {
            const r = t === ga;
            const l = i.movable && t === Ir;
            (t = r || l ? t : _r),
                (i.dragMode = t),
                Vt(a, Bt, t),
                Et(a, ra, r),
                Et(a, la, l),
                i.cropBoxMovable || (Vt(n, Bt, t), Et(n, ra, r), Et(n, la, l));
        }
        return this;
    },
};
const Gu = De.Cropper;
const Ta = (function () {
    function e(t) {
        const i =
            arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        if ((Jd(this, e), !t || !mu.test(t.tagName))) {
            throw new Error(
                "The first argument is required and must be an <img> or <canvas> element.",
            );
        }
        (this.element = t),
            (this.options = Z({}, ur, gt(i) && i)),
            (this.cropped = !1),
            (this.disabled = !1),
            (this.pointers = {}),
            (this.ready = !1),
            (this.reloading = !1),
            (this.replaced = !1),
            (this.sized = !1),
            (this.sizing = !1),
            this.init();
    }
    return (
        eu(
            e,
            [
                {
                    key: "init",
                    value: function () {
                        const i = this.element;
                        const a = i.tagName.toLowerCase();
                        let n;
                        if (!i[K]) {
                            if (((i[K] = this), a === "img")) {
                                if (
                                    ((this.isImg = !0),
                                    (n = i.getAttribute("src") || ""),
                                    (this.originalUrl = n),
                                    !n)
                                ) {
                                    return;
                                }
                                n = i.src;
                            } else {
                                a === "canvas" &&
                                    window.HTMLCanvasElement &&
                                    (n = i.toDataURL());
                            }
                            this.load(n);
                        }
                    },
                },
                {
                    key: "load",
                    value: function (i) {
                        const a = this;
                        if (i) {
                            (this.url = i), (this.imageData = {});
                            const n = this.element;
                            const r = this.options;
                            if (
                                (!r.rotatable &&
                                    !r.scalable &&
                                    (r.checkOrientation = !1),
                                !r.checkOrientation || !window.ArrayBuffer)
                            ) {
                                this.clone();
                                return;
                            }
                            if (uu.test(i)) {
                                hu.test(i) ? this.read(xu(i)) : this.clone();
                                return;
                            }
                            const l = new XMLHttpRequest();
                            const o = this.clone.bind(this);
                            (this.reloading = !0),
                                (this.xhr = l),
                                (l.onabort = o),
                                (l.onerror = o),
                                (l.ontimeout = o),
                                (l.onprogress = function () {
                                    l.getResponseHeader("content-type") !==
                                        dr && l.abort();
                                }),
                                (l.onload = function () {
                                    a.read(l.response);
                                }),
                                (l.onloadend = function () {
                                    (a.reloading = !1), (a.xhr = null);
                                }),
                                r.checkCrossOrigin &&
                                    mr(i) &&
                                    n.crossOrigin &&
                                    (i = pr(i)),
                                l.open("GET", i, !0),
                                (l.responseType = "arraybuffer"),
                                (l.withCredentials =
                                    n.crossOrigin === "use-credentials"),
                                l.send();
                        }
                    },
                },
                {
                    key: "read",
                    value: function (i) {
                        const a = this.options;
                        const n = this.imageData;
                        const r = Pu(i);
                        let l = 0;
                        let o = 1;
                        let s = 1;
                        if (r > 1) {
                            this.url = Ou(i, dr);
                            const u = Du(r);
                            (l = u.rotate), (o = u.scaleX), (s = u.scaleY);
                        }
                        a.rotatable && (n.rotate = l),
                            a.scalable && ((n.scaleX = o), (n.scaleY = s)),
                            this.clone();
                    },
                },
                {
                    key: "clone",
                    value: function () {
                        const i = this.element;
                        const a = this.url;
                        let n = i.crossOrigin;
                        let r = a;
                        this.options.checkCrossOrigin &&
                            mr(a) &&
                            (n || (n = "anonymous"), (r = pr(a))),
                            (this.crossOrigin = n),
                            (this.crossOriginUrl = r);
                        const l = document.createElement("img");
                        n && (l.crossOrigin = n),
                            (l.src = r || a),
                            (l.alt = i.alt || "The image to crop"),
                            (this.image = l),
                            (l.onload = this.start.bind(this)),
                            (l.onerror = this.stop.bind(this)),
                            de(l, ir),
                            i.parentNode.insertBefore(l, i.nextSibling);
                    },
                },
                {
                    key: "start",
                    value: function () {
                        const i = this;
                        const a = this.image;
                        (a.onload = null),
                            (a.onerror = null),
                            (this.sizing = !0);
                        const n =
                            De.navigator &&
                            /(?:iPad|iPhone|iPod).*?AppleWebKit/i.test(
                                De.navigator.userAgent,
                            );
                        const r = function (u, c) {
                            Z(i.imageData, {
                                naturalWidth: u,
                                naturalHeight: c,
                                aspectRatio: u / c,
                            }),
                                (i.initialImageData = Z({}, i.imageData)),
                                (i.sizing = !1),
                                (i.sized = !0),
                                i.build();
                        };
                        if (a.naturalWidth && !n) {
                            r(a.naturalWidth, a.naturalHeight);
                            return;
                        }
                        const l = document.createElement("img");
                        const o = document.body || document.documentElement;
                        (this.sizingImage = l),
                            (l.onload = function () {
                                r(l.width, l.height), n || o.removeChild(l);
                            }),
                            (l.src = a.src),
                            n ||
                                ((l.style.cssText =
                                    "left:0;max-height:none!important;max-width:none!important;min-height:0!important;min-width:0!important;opacity:0;position:absolute;top:0;z-index:-1;"),
                                o.appendChild(l));
                    },
                },
                {
                    key: "stop",
                    value: function () {
                        const i = this.image;
                        (i.onload = null),
                            (i.onerror = null),
                            i.parentNode.removeChild(i),
                            (this.image = null);
                    },
                },
                {
                    key: "build",
                    value: function () {
                        if (!(!this.sized || this.ready)) {
                            const i = this.element;
                            const a = this.options;
                            const n = this.image;
                            const r = i.parentNode;
                            const l = document.createElement("div");
                            l.innerHTML = pu;
                            const o = l.querySelector(
                                ".".concat(K, "-container"),
                            );
                            const s = o.querySelector(".".concat(K, "-canvas"));
                            const u = o.querySelector(
                                ".".concat(K, "-drag-box"),
                            );
                            const c = o.querySelector(
                                ".".concat(K, "-crop-box"),
                            );
                            const d = c.querySelector(".".concat(K, "-face"));
                            (this.container = r),
                                (this.cropper = o),
                                (this.canvas = s),
                                (this.dragBox = u),
                                (this.cropBox = c),
                                (this.viewBox = o.querySelector(
                                    ".".concat(K, "-view-box"),
                                )),
                                (this.face = d),
                                s.appendChild(n),
                                de(i, be),
                                r.insertBefore(o, i.nextSibling),
                                Pe(n, ir),
                                this.initPreview(),
                                this.bind(),
                                (a.initialAspectRatio =
                                    Math.max(0, a.initialAspectRatio) || NaN),
                                (a.aspectRatio =
                                    Math.max(0, a.aspectRatio) || NaN),
                                (a.viewMode =
                                    Math.max(
                                        0,
                                        Math.min(3, Math.round(a.viewMode)),
                                    ) || 0),
                                de(c, be),
                                a.guides ||
                                    de(
                                        c.getElementsByClassName(
                                            "".concat(K, "-dashed"),
                                        ),
                                        be,
                                    ),
                                a.center ||
                                    de(
                                        c.getElementsByClassName(
                                            "".concat(K, "-center"),
                                        ),
                                        be,
                                    ),
                                a.background && de(o, "".concat(K, "-bg")),
                                a.highlight || de(d, lu),
                                a.cropBoxMovable && (de(d, la), Vt(d, Bt, fa)),
                                a.cropBoxResizable ||
                                    (de(
                                        c.getElementsByClassName(
                                            "".concat(K, "-line"),
                                        ),
                                        be,
                                    ),
                                    de(
                                        c.getElementsByClassName(
                                            "".concat(K, "-point"),
                                        ),
                                        be,
                                    )),
                                this.render(),
                                (this.ready = !0),
                                this.setDragMode(a.dragMode),
                                a.autoCrop && this.crop(),
                                this.setData(a.data),
                                Te(a.ready) && we(i, or, a.ready, { once: !0 }),
                                bt(i, or);
                        }
                    },
                },
                {
                    key: "unbuild",
                    value: function () {
                        if (this.ready) {
                            (this.ready = !1),
                                this.unbind(),
                                this.resetPreview();
                            const i = this.cropper.parentNode;
                            i && i.removeChild(this.cropper),
                                Pe(this.element, be);
                        }
                    },
                },
                {
                    key: "uncreate",
                    value: function () {
                        this.ready
                            ? (this.unbuild(),
                              (this.ready = !1),
                              (this.cropped = !1))
                            : this.sizing
                              ? ((this.sizingImage.onload = null),
                                (this.sizing = !1),
                                (this.sized = !1))
                              : this.reloading
                                ? ((this.xhr.onabort = null), this.xhr.abort())
                                : this.image && this.stop();
                    },
                },
            ],
            [
                {
                    key: "noConflict",
                    value: function () {
                        return (window.Cropper = Gu), e;
                    },
                },
                {
                    key: "setDefaults",
                    value: function (i) {
                        Z(ur, gt(i) && i);
                    },
                },
            ],
        ),
        e
    );
})();
Z(Ta.prototype, Fu, Cu, zu, Nu, Bu, Vu);
const Mr = ({ addFilter: e, utils: t }) => {
    const { Type: i, replaceInString: a, toNaturalFileSize: n } = t;
    return (
        e("ALLOW_HOPPER_ITEM", (r, { query: l }) => {
            if (!l("GET_ALLOW_FILE_SIZE_VALIDATION")) return !0;
            const o = l("GET_MAX_FILE_SIZE");
            if (o !== null && r.size >= o) return !1;
            const s = l("GET_MIN_FILE_SIZE");
            return !(s !== null && r.size <= s);
        }),
        e(
            "LOAD_FILE",
            (r, { query: l }) =>
                new Promise((o, s) => {
                    if (!l("GET_ALLOW_FILE_SIZE_VALIDATION")) return o(r);
                    const u = l("GET_FILE_VALIDATE_SIZE_FILTER");
                    if (u && !u(r)) return o(r);
                    const c = l("GET_MAX_FILE_SIZE");
                    if (c !== null && r.size >= c) {
                        s({
                            status: {
                                main: l("GET_LABEL_MAX_FILE_SIZE_EXCEEDED"),
                                sub: a(l("GET_LABEL_MAX_FILE_SIZE"), {
                                    filesize: n(
                                        c,
                                        ".",
                                        l("GET_FILE_SIZE_BASE"),
                                    ),
                                }),
                            },
                        });
                        return;
                    }
                    const d = l("GET_MIN_FILE_SIZE");
                    if (d !== null && r.size <= d) {
                        s({
                            status: {
                                main: l("GET_LABEL_MIN_FILE_SIZE_EXCEEDED"),
                                sub: a(l("GET_LABEL_MIN_FILE_SIZE"), {
                                    filesize: n(
                                        d,
                                        ".",
                                        l("GET_FILE_SIZE_BASE"),
                                    ),
                                }),
                            },
                        });
                        return;
                    }
                    const h = l("GET_MAX_TOTAL_FILE_SIZE");
                    if (
                        h !== null &&
                        l("GET_ACTIVE_ITEMS").reduce(
                            (p, f) => p + f.fileSize,
                            0,
                        ) > h
                    ) {
                        s({
                            status: {
                                main: l(
                                    "GET_LABEL_MAX_TOTAL_FILE_SIZE_EXCEEDED",
                                ),
                                sub: a(l("GET_LABEL_MAX_TOTAL_FILE_SIZE"), {
                                    filesize: n(h),
                                }),
                            },
                        });
                        return;
                    }
                    o(r);
                }),
        ),
        {
            options: {
                allowFileSizeValidation: [!0, i.BOOLEAN],
                maxFileSize: [null, i.INT],
                minFileSize: [null, i.INT],
                maxTotalFileSize: [null, i.INT],
                fileValidateSizeFilter: [null, i.FUNCTION],
                labelMinFileSizeExceeded: ["File is too small", i.STRING],
                labelMinFileSize: ["Minimum file size is {filesize}", i.STRING],
                labelMaxFileSizeExceeded: ["File is too large", i.STRING],
                labelMaxFileSize: ["Maximum file size is {filesize}", i.STRING],
                labelMaxTotalFileSizeExceeded: [
                    "Maximum total size exceeded",
                    i.STRING,
                ],
                labelMaxTotalFileSize: [
                    "Maximum total file size is {filesize}",
                    i.STRING,
                ],
            },
        }
    );
};
const Uu = typeof window < "u" && typeof window.document < "u";
Uu &&
    document.dispatchEvent(
        new CustomEvent("FilePond:pluginloaded", { detail: Mr }),
    );
const xr = Mr;
const Or = ({ addFilter: e, utils: t }) => {
    const {
        Type: i,
        isString: a,
        replaceInString: n,
        guesstimateMimeType: r,
        getExtensionFromFilename: l,
        getFilenameFromURL: o,
    } = t;
    const s = (m, p) => {
        const f = (/^[^/]+/.exec(m) || []).pop();
        const g = p.slice(0, -2);
        return f === g;
    };
    const u = (m, p) => m.some((f) => (/\*$/.test(f) ? s(p, f) : f === p));
    const c = (m) => {
        let p = "";
        if (a(m)) {
            const f = o(m);
            const g = l(f);
            g && (p = r(g));
        } else p = m.type;
        return p;
    };
    const d = (m, p, f) => {
        if (p.length === 0) return !0;
        const g = c(m);
        return f
            ? new Promise((I, E) => {
                  f(m, g)
                      .then((T) => {
                          u(p, T) ? I() : E();
                      })
                      .catch(E);
              })
            : u(p, g);
    };
    const h = (m) => (p) => (m[p] === null ? !1 : m[p] || p);
    return (
        e("SET_ATTRIBUTE_TO_OPTION_MAP", (m) =>
            Object.assign(m, { accept: "acceptedFileTypes" }),
        ),
        e("ALLOW_HOPPER_ITEM", (m, { query: p }) =>
            p("GET_ALLOW_FILE_TYPE_VALIDATION")
                ? d(m, p("GET_ACCEPTED_FILE_TYPES"))
                : !0,
        ),
        e(
            "LOAD_FILE",
            (m, { query: p }) =>
                new Promise((f, g) => {
                    if (!p("GET_ALLOW_FILE_TYPE_VALIDATION")) {
                        f(m);
                        return;
                    }
                    const I = p("GET_ACCEPTED_FILE_TYPES");
                    const E = p("GET_FILE_VALIDATE_TYPE_DETECT_TYPE");
                    const T = d(m, I, E);
                    const _ = () => {
                        const y = I.map(
                            h(
                                p(
                                    "GET_FILE_VALIDATE_TYPE_LABEL_EXPECTED_TYPES_MAP",
                                ),
                            ),
                        ).filter((b) => b !== !1);
                        g({
                            status: {
                                main: p("GET_LABEL_FILE_TYPE_NOT_ALLOWED"),
                                sub: n(
                                    p(
                                        "GET_FILE_VALIDATE_TYPE_LABEL_EXPECTED_TYPES",
                                    ),
                                    {
                                        allTypes: y.join(", "),
                                        allButLastType: y
                                            .slice(0, -1)
                                            .join(", "),
                                        lastType: y[y.length - 1],
                                    },
                                ),
                            },
                        });
                    };
                    if (typeof T === "boolean") return T ? f(m) : _();
                    T.then(() => {
                        f(m);
                    }).catch(_);
                }),
        ),
        {
            options: {
                allowFileTypeValidation: [!0, i.BOOLEAN],
                acceptedFileTypes: [[], i.ARRAY],
                labelFileTypeNotAllowed: ["File is of invalid type", i.STRING],
                fileValidateTypeLabelExpectedTypes: [
                    "Expects {allButLastType} or {lastType}",
                    i.STRING,
                ],
                fileValidateTypeLabelExpectedTypesMap: [{}, i.OBJECT],
                fileValidateTypeDetectType: [null, i.FUNCTION],
            },
        }
    );
};
const ku = typeof window < "u" && typeof window.document < "u";
ku &&
    document.dispatchEvent(
        new CustomEvent("FilePond:pluginloaded", { detail: Or }),
    );
const Pr = Or;
const Dr = (e) => /^image/.test(e.type);
const Fr = ({ addFilter: e, utils: t }) => {
    const { Type: i, isFile: a, getNumericAspectRatioFromString: n } = t;
    const r = (u, c) => !(!Dr(u.file) || !c("GET_ALLOW_IMAGE_CROP"));
    const l = (u) => typeof u === "object";
    const o = (u) => typeof u === "number";
    const s = (u, c) =>
        u.setMetadata("crop", Object.assign({}, u.getMetadata("crop"), c));
    return (
        e("DID_CREATE_ITEM", (u, { query: c }) => {
            u.extend("setImageCrop", (d) => {
                if (!(!r(u, c) || !l(center))) {
                    return u.setMetadata("crop", d), d;
                }
            }),
                u.extend("setImageCropCenter", (d) => {
                    if (!(!r(u, c) || !l(d))) return s(u, { center: d });
                }),
                u.extend("setImageCropZoom", (d) => {
                    if (!(!r(u, c) || !o(d))) {
                        return s(u, { zoom: Math.max(1, d) });
                    }
                }),
                u.extend("setImageCropRotation", (d) => {
                    if (!(!r(u, c) || !o(d))) return s(u, { rotation: d });
                }),
                u.extend("setImageCropFlip", (d) => {
                    if (!(!r(u, c) || !l(d))) return s(u, { flip: d });
                }),
                u.extend("setImageCropAspectRatio", (d) => {
                    if (!r(u, c) || typeof d > "u") return;
                    const h = u.getMetadata("crop");
                    const m = n(d);
                    const p = {
                        center: { x: 0.5, y: 0.5 },
                        flip: h
                            ? Object.assign({}, h.flip)
                            : { horizontal: !1, vertical: !1 },
                        rotation: 0,
                        zoom: 1,
                        aspectRatio: m,
                    };
                    return u.setMetadata("crop", p), p;
                });
        }),
        e(
            "DID_LOAD_ITEM",
            (u, { query: c }) =>
                new Promise((d, h) => {
                    const m = u.file;
                    if (
                        !a(m) ||
                        !Dr(m) ||
                        !c("GET_ALLOW_IMAGE_CROP") ||
                        u.getMetadata("crop")
                    ) {
                        return d(u);
                    }
                    const f = c("GET_IMAGE_CROP_ASPECT_RATIO");
                    u.setMetadata("crop", {
                        center: { x: 0.5, y: 0.5 },
                        flip: { horizontal: !1, vertical: !1 },
                        rotation: 0,
                        zoom: 1,
                        aspectRatio: f ? n(f) : null,
                    }),
                        d(u);
                }),
        ),
        {
            options: {
                allowImageCrop: [!0, i.BOOLEAN],
                imageCropAspectRatio: [null, i.STRING],
            },
        }
    );
};
const Hu = typeof window < "u" && typeof window.document < "u";
Hu &&
    document.dispatchEvent(
        new CustomEvent("FilePond:pluginloaded", { detail: Fr }),
    );
const Cr = Fr;
const ba = (e) => /^image/.test(e.type);
const zr = (e) => {
    const { addFilter: t, utils: i, views: a } = e;
    const { Type: n, createRoute: r, createItemAPI: l = (c) => c } = i;
    const { fileActionButton: o } = a;
    t(
        "SHOULD_REMOVE_ON_REVERT",
        (c, { item: d, query: h }) =>
            new Promise((m) => {
                const { file: p } = d;
                const f =
                    h("GET_ALLOW_IMAGE_EDIT") &&
                    h("GET_IMAGE_EDIT_ALLOW_EDIT") &&
                    ba(p);
                m(!f);
            }),
    ),
        t(
            "DID_LOAD_ITEM",
            (c, { query: d, dispatch: h }) =>
                new Promise((m, p) => {
                    if (c.origin > 1) {
                        m(c);
                        return;
                    }
                    const { file: f } = c;
                    if (
                        !d("GET_ALLOW_IMAGE_EDIT") ||
                        !d("GET_IMAGE_EDIT_INSTANT_EDIT")
                    ) {
                        m(c);
                        return;
                    }
                    if (!ba(f)) {
                        m(c);
                        return;
                    }
                    const g = (E, T, _) => (y) => {
                        s.shift(), y ? T(E) : _(E), h("KICK"), I();
                    };
                    const I = () => {
                        if (!s.length) return;
                        const { item: E, resolve: T, reject: _ } = s[0];
                        h("EDIT_ITEM", {
                            id: E.id,
                            handleEditorResponse: g(E, T, _),
                        });
                    };
                    u({ item: c, resolve: m, reject: p }),
                        s.length === 1 && I();
                }),
        ),
        t("DID_CREATE_ITEM", (c, { query: d, dispatch: h }) => {
            c.extend("edit", () => {
                h("EDIT_ITEM", { id: c.id });
            });
        });
    const s = [];
    const u = (c) => (s.push(c), c);
    return (
        t("CREATE_VIEW", (c) => {
            const { is: d, view: h, query: m } = c;
            if (!m("GET_ALLOW_IMAGE_EDIT")) return;
            const p = m("GET_ALLOW_IMAGE_PREVIEW");
            if (!((d("file-info") && !p) || (d("file") && p))) return;
            const g = m("GET_IMAGE_EDIT_EDITOR");
            if (!g) return;
            g.filepondCallbackBridge ||
                ((g.outputData = !0),
                (g.outputFile = !1),
                (g.filepondCallbackBridge = {
                    onconfirm: g.onconfirm || (() => {}),
                    oncancel: g.oncancel || (() => {}),
                }));
            const I = ({ root: _, props: y, action: b }) => {
                const { id: A } = y;
                const { handleEditorResponse: R } = b;
                (g.cropAspectRatio =
                    _.query("GET_IMAGE_CROP_ASPECT_RATIO") ||
                    g.cropAspectRatio),
                    (g.outputCanvasBackgroundColor =
                        _.query(
                            "GET_IMAGE_TRANSFORM_CANVAS_BACKGROUND_COLOR",
                        ) || g.outputCanvasBackgroundColor);
                const S = _.query("GET_ITEM", A);
                if (!S) return;
                const P = S.file;
                const O = S.getMetadata("crop");
                const x = {
                    center: { x: 0.5, y: 0.5 },
                    flip: { horizontal: !1, vertical: !1 },
                    zoom: 1,
                    rotation: 0,
                    aspectRatio: null,
                };
                const z = S.getMetadata("resize");
                const v = S.getMetadata("filter") || null;
                const F = S.getMetadata("filters") || null;
                const w = S.getMetadata("colors") || null;
                const L = S.getMetadata("markup") || null;
                const C = {
                    crop: O || x,
                    size: z
                        ? {
                              upscale: z.upscale,
                              mode: z.mode,
                              width: z.size.width,
                              height: z.size.height,
                          }
                        : null,
                    filter: F
                        ? F.id || F.matrix
                        : _.query("GET_ALLOW_IMAGE_FILTER") &&
                            _.query("GET_IMAGE_FILTER_COLOR_MATRIX") &&
                            !w
                          ? v
                          : null,
                    color: w,
                    markup: L,
                };
                (g.onconfirm = ({ data: D }) => {
                    const {
                        crop: V,
                        size: B,
                        filter: j,
                        color: $,
                        colorMatrix: X,
                        markup: ue,
                    } = D;
                    const U = {};
                    if ((V && (U.crop = V), B)) {
                        const W = (S.getMetadata("resize") || {}).size;
                        const q = { width: B.width, height: B.height };
                        !(q.width && q.height) &&
                            W &&
                            ((q.width = W.width), (q.height = W.height)),
                            (q.width || q.height) &&
                                (U.resize = {
                                    upscale: B.upscale,
                                    mode: B.mode,
                                    size: q,
                                });
                    }
                    ue && (U.markup = ue),
                        (U.colors = $),
                        (U.filters = j),
                        (U.filter = X),
                        S.setMetadata(U),
                        g.filepondCallbackBridge.onconfirm(D, l(S)),
                        R &&
                            (g.onclose = () => {
                                R(!0), (g.onclose = null);
                            });
                }),
                    (g.oncancel = () => {
                        g.filepondCallbackBridge.oncancel(l(S)),
                            R &&
                                (g.onclose = () => {
                                    R(!1), (g.onclose = null);
                                });
                    }),
                    g.open(P, C);
            };
            const E = ({ root: _, props: y }) => {
                if (!m("GET_IMAGE_EDIT_ALLOW_EDIT")) return;
                const { id: b } = y;
                const A = m("GET_ITEM", b);
                if (!A) return;
                const R = A.file;
                if (ba(R)) {
                    if (
                        ((_.ref.handleEdit = (S) => {
                            S.stopPropagation(),
                                _.dispatch("EDIT_ITEM", { id: b });
                        }),
                        p)
                    ) {
                        const S = h.createChildView(o, {
                            label: "edit",
                            icon: m("GET_IMAGE_EDIT_ICON_EDIT"),
                            opacity: 0,
                        });
                        S.element.classList.add("filepond--action-edit-item"),
                            (S.element.dataset.align = m(
                                "GET_STYLE_IMAGE_EDIT_BUTTON_EDIT_ITEM_POSITION",
                            )),
                            S.on("click", _.ref.handleEdit),
                            (_.ref.buttonEditItem = h.appendChildView(S));
                    } else {
                        const S = h.element.querySelector(
                            ".filepond--file-info-main",
                        );
                        const P = document.createElement("button");
                        (P.className = "filepond--action-edit-item-alt"),
                            (P.innerHTML =
                                m("GET_IMAGE_EDIT_ICON_EDIT") +
                                "<span>edit</span>"),
                            P.addEventListener("click", _.ref.handleEdit),
                            S.appendChild(P),
                            (_.ref.editButton = P);
                    }
                }
            };
            h.registerDestroyer(({ root: _ }) => {
                _.ref.buttonEditItem &&
                    _.ref.buttonEditItem.off("click", _.ref.handleEdit),
                    _.ref.editButton &&
                        _.ref.editButton.removeEventListener(
                            "click",
                            _.ref.handleEdit,
                        );
            });
            const T = { EDIT_ITEM: I, DID_LOAD_ITEM: E };
            if (p) {
                const _ = ({ root: y }) => {
                    y.ref.buttonEditItem && (y.ref.buttonEditItem.opacity = 1);
                };
                T.DID_IMAGE_PREVIEW_SHOW = _;
            }
            h.registerWriter(r(T));
        }),
        {
            options: {
                allowImageEdit: [!0, n.BOOLEAN],
                styleImageEditButtonEditItemPosition: [
                    "bottom center",
                    n.STRING,
                ],
                imageEditInstantEdit: [!1, n.BOOLEAN],
                imageEditAllowEdit: [!0, n.BOOLEAN],
                imageEditIconEdit: [
                    '<svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M8.5 17h1.586l7-7L15.5 8.414l-7 7V17zm-1.707-2.707l8-8a1 1 0 0 1 1.414 0l3 3a1 1 0 0 1 0 1.414l-8 8A1 1 0 0 1 10.5 19h-3a1 1 0 0 1-1-1v-3a1 1 0 0 1 .293-.707z" fill="currentColor" fill-rule="nonzero"/></svg>',
                    n.STRING,
                ],
                imageEditEditor: [null, n.OBJECT],
            },
        }
    );
};
const Wu = typeof window < "u" && typeof window.document < "u";
Wu &&
    document.dispatchEvent(
        new CustomEvent("FilePond:pluginloaded", { detail: zr }),
    );
const Nr = zr;
const Yu = (e) => /^image\/jpeg/.test(e.type);
const rt = {
    JPEG: 65496,
    APP1: 65505,
    EXIF: 1165519206,
    TIFF: 18761,
    Orientation: 274,
    Unknown: 65280,
};
const lt = (e, t, i = !1) => e.getUint16(t, i);
const Br = (e, t, i = !1) => e.getUint32(t, i);
const qu = (e) =>
    new Promise((t, i) => {
        const a = new FileReader();
        (a.onload = function (n) {
            const r = new DataView(n.target.result);
            if (lt(r, 0) !== rt.JPEG) {
                t(-1);
                return;
            }
            const l = r.byteLength;
            let o = 2;
            for (; o < l; ) {
                const s = lt(r, o);
                if (((o += 2), s === rt.APP1)) {
                    if (Br(r, (o += 2)) !== rt.EXIF) break;
                    const u = lt(r, (o += 6)) === rt.TIFF;
                    o += Br(r, o + 4, u);
                    const c = lt(r, o, u);
                    o += 2;
                    for (let d = 0; d < c; d++) {
                        if (lt(r, o + d * 12, u) === rt.Orientation) {
                            t(lt(r, o + d * 12 + 8, u));
                            return;
                        }
                    }
                } else {
                    if ((s & rt.Unknown) !== rt.Unknown) break;
                    o += lt(r, o);
                }
            }
            t(-1);
        }),
            a.readAsArrayBuffer(e.slice(0, 64 * 1024));
    });
const $u = typeof window < "u" && typeof window.document < "u";
const ju = () => $u;
const Xu =
    "data:image/jpg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/4QA6RXhpZgAATU0AKgAAAAgAAwESAAMAAAABAAYAAAEoAAMAAAABAAIAAAITAAMAAAABAAEAAAAAAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////wAALCAABAAIBASIA/8QAJgABAAAAAAAAAAAAAAAAAAAAAxABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQAAPwBH/9k=";
let Vr;
const fi = ju() ? new Image() : {};
fi.onload = () => (Vr = fi.naturalWidth > fi.naturalHeight);
fi.src = Xu;
const Qu = () => Vr;
const Gr = ({ addFilter: e, utils: t }) => {
    const { Type: i, isFile: a } = t;
    return (
        e(
            "DID_LOAD_ITEM",
            (n, { query: r }) =>
                new Promise((l, o) => {
                    const s = n.file;
                    if (
                        !a(s) ||
                        !Yu(s) ||
                        !r("GET_ALLOW_IMAGE_EXIF_ORIENTATION") ||
                        !Qu()
                    ) {
                        return l(n);
                    }
                    qu(s).then((u) => {
                        n.setMetadata("exif", { orientation: u }), l(n);
                    });
                }),
        ),
        { options: { allowImageExifOrientation: [!0, i.BOOLEAN] } }
    );
};
const Ku = typeof window < "u" && typeof window.document < "u";
Ku &&
    document.dispatchEvent(
        new CustomEvent("FilePond:pluginloaded", { detail: Gr }),
    );
const Ur = Gr;
const Zu = (e) => /^image/.test(e.type);
const kr = (e, t) => Ut(e.x * t, e.y * t);
const Hr = (e, t) => Ut(e.x + t.x, e.y + t.y);
const Ju = (e) => {
    const t = Math.sqrt(e.x * e.x + e.y * e.y);
    return t === 0 ? { x: 0, y: 0 } : Ut(e.x / t, e.y / t);
};
const gi = (e, t, i) => {
    const a = Math.cos(t);
    const n = Math.sin(t);
    const r = Ut(e.x - i.x, e.y - i.y);
    return Ut(i.x + a * r.x - n * r.y, i.y + n * r.x + a * r.y);
};
var Ut = (e = 0, t = 0) => ({ x: e, y: t });
const Ie = (e, t, i = 1, a) => {
    if (typeof e === "string") return parseFloat(e) * i;
    if (typeof e === "number") {
        return e * (a ? t[a] : Math.min(t.width, t.height));
    }
};
const eh = (e, t, i) => {
    const a = e.borderStyle || e.lineStyle || "solid";
    const n = e.backgroundColor || e.fontColor || "transparent";
    const r = e.borderColor || e.lineColor || "transparent";
    const l = Ie(e.borderWidth || e.lineWidth, t, i);
    const o = e.lineCap || "round";
    const s = e.lineJoin || "round";
    const u = typeof a === "string" ? "" : a.map((d) => Ie(d, t, i)).join(",");
    const c = e.opacity || 1;
    return {
        "stroke-linecap": o,
        "stroke-linejoin": s,
        "stroke-width": l || 0,
        "stroke-dasharray": u,
        stroke: r,
        fill: n,
        opacity: c,
    };
};
const ve = (e) => e != null;
const th = (e, t, i = 1) => {
    let a = Ie(e.x, t, i, "width") || Ie(e.left, t, i, "width");
    let n = Ie(e.y, t, i, "height") || Ie(e.top, t, i, "height");
    let r = Ie(e.width, t, i, "width");
    let l = Ie(e.height, t, i, "height");
    const o = Ie(e.right, t, i, "width");
    const s = Ie(e.bottom, t, i, "height");
    return (
        ve(n) || (ve(l) && ve(s) ? (n = t.height - l - s) : (n = s)),
        ve(a) || (ve(r) && ve(o) ? (a = t.width - r - o) : (a = o)),
        ve(r) || (ve(a) && ve(o) ? (r = t.width - a - o) : (r = 0)),
        ve(l) || (ve(n) && ve(s) ? (l = t.height - n - s) : (l = 0)),
        { x: a || 0, y: n || 0, width: r || 0, height: l || 0 }
    );
};
const ih = (e) =>
    e.map((t, i) => `${i === 0 ? "M" : "L"} ${t.x} ${t.y}`).join(" ");
const Ce = (e, t) => Object.keys(t).forEach((i) => e.setAttribute(i, t[i]));
const ah = "http://www.w3.org/2000/svg";
const It = (e, t) => {
    const i = document.createElementNS(ah, e);
    return t && Ce(i, t), i;
};
const nh = (e) => Ce(e, { ...e.rect, ...e.styles });
const rh = (e) => {
    const t = e.rect.x + e.rect.width * 0.5;
    const i = e.rect.y + e.rect.height * 0.5;
    const a = e.rect.width * 0.5;
    const n = e.rect.height * 0.5;
    return Ce(e, { cx: t, cy: i, rx: a, ry: n, ...e.styles });
};
const lh = { contain: "xMidYMid meet", cover: "xMidYMid slice" };
const oh = (e, t) => {
    Ce(e, { ...e.rect, ...e.styles, preserveAspectRatio: lh[t.fit] || "none" });
};
const sh = { left: "start", center: "middle", right: "end" };
const ch = (e, t, i, a) => {
    const n = Ie(t.fontSize, i, a);
    const r = t.fontFamily || "sans-serif";
    const l = t.fontWeight || "normal";
    const o = sh[t.textAlign] || "start";
    Ce(e, {
        ...e.rect,
        ...e.styles,
        "stroke-width": 0,
        "font-weight": l,
        "font-size": n,
        "font-family": r,
        "text-anchor": o,
    }),
        e.text !== t.text &&
            ((e.text = t.text), (e.textContent = t.text.length ? t.text : " "));
};
const dh = (e, t, i, a) => {
    Ce(e, { ...e.rect, ...e.styles, fill: "none" });
    const n = e.childNodes[0];
    const r = e.childNodes[1];
    const l = e.childNodes[2];
    const o = e.rect;
    const s = { x: e.rect.x + e.rect.width, y: e.rect.y + e.rect.height };
    if ((Ce(n, { x1: o.x, y1: o.y, x2: s.x, y2: s.y }), !t.lineDecoration)) {
        return;
    }
    (r.style.display = "none"), (l.style.display = "none");
    const u = Ju({ x: s.x - o.x, y: s.y - o.y });
    const c = Ie(0.05, i, a);
    if (t.lineDecoration.indexOf("arrow-begin") !== -1) {
        const d = kr(u, c);
        const h = Hr(o, d);
        const m = gi(o, 2, h);
        const p = gi(o, -2, h);
        Ce(r, {
            style: "display:block;",
            d: `M${m.x},${m.y} L${o.x},${o.y} L${p.x},${p.y}`,
        });
    }
    if (t.lineDecoration.indexOf("arrow-end") !== -1) {
        const d = kr(u, -c);
        const h = Hr(s, d);
        const m = gi(s, 2, h);
        const p = gi(s, -2, h);
        Ce(l, {
            style: "display:block;",
            d: `M${m.x},${m.y} L${s.x},${s.y} L${p.x},${p.y}`,
        });
    }
};
const uh = (e, t, i, a) => {
    Ce(e, {
        ...e.styles,
        fill: "none",
        d: ih(
            t.points.map((n) => ({
                x: Ie(n.x, i, a, "width"),
                y: Ie(n.y, i, a, "height"),
            })),
        ),
    });
};
const Ei = (e) => (t) => It(e, { id: t.id });
const hh = (e) => {
    const t = It("image", {
        id: e.id,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        opacity: "0",
    });
    return (
        (t.onload = () => {
            t.setAttribute("opacity", e.opacity || 1);
        }),
        t.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", e.src),
        t
    );
};
const mh = (e) => {
    const t = It("g", {
        id: e.id,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
    });
    const i = It("line");
    t.appendChild(i);
    const a = It("path");
    t.appendChild(a);
    const n = It("path");
    return t.appendChild(n), t;
};
const ph = {
    image: hh,
    rect: Ei("rect"),
    ellipse: Ei("ellipse"),
    text: Ei("text"),
    path: Ei("path"),
    line: mh,
};
const fh = { rect: nh, ellipse: rh, image: oh, text: ch, path: uh, line: dh };
const gh = (e, t) => ph[e](t);
const Eh = (e, t, i, a, n) => {
    t !== "path" && (e.rect = th(i, a, n)),
        (e.styles = eh(i, a, n)),
        fh[t](e, i, a, n);
};
const Th = ["x", "y", "left", "top", "right", "bottom", "width", "height"];
const bh = (e) =>
    typeof e === "string" && /%/.test(e) ? parseFloat(e) / 100 : e;
const Ih = (e) => {
    const [t, i] = e;
    const a = i.points ? {} : Th.reduce((n, r) => ((n[r] = bh(i[r])), n), {});
    return [t, { zIndex: 0, ...i, ...a }];
};
const _h = (e, t) =>
    e[1].zIndex > t[1].zIndex ? 1 : e[1].zIndex < t[1].zIndex ? -1 : 0;
const Rh = (e) =>
    e.utils.createView({
        name: "image-preview-markup",
        tag: "svg",
        ignoreRect: !0,
        mixins: {
            apis: ["width", "height", "crop", "markup", "resize", "dirty"],
        },
        write: ({ root: t, props: i }) => {
            if (!i.dirty) return;
            const { crop: a, resize: n, markup: r } = i;
            const l = i.width;
            const o = i.height;
            let s = a.width;
            let u = a.height;
            if (n) {
                const { size: m } = n;
                let p = m && m.width;
                let f = m && m.height;
                const g = n.mode;
                const I = n.upscale;
                p && !f && (f = p), f && !p && (p = f);
                const E = s < p && u < f;
                if (!E || (E && I)) {
                    const T = p / s;
                    const _ = f / u;
                    if (g === "force") (s = p), (u = f);
                    else {
                        let y;
                        g === "cover"
                            ? (y = Math.max(T, _))
                            : g === "contain" && (y = Math.min(T, _)),
                            (s = s * y),
                            (u = u * y);
                    }
                }
            }
            const c = { width: l, height: o };
            t.element.setAttribute("width", c.width),
                t.element.setAttribute("height", c.height);
            const d = Math.min(l / s, o / u);
            t.element.innerHTML = "";
            const h = t.query("GET_IMAGE_PREVIEW_MARKUP_FILTER");
            r.filter(h)
                .map(Ih)
                .sort(_h)
                .forEach((m) => {
                    const [p, f] = m;
                    const g = gh(p, f);
                    Eh(g, p, f, c, d), t.element.appendChild(g);
                });
        },
    });
const Gt = (e, t) => ({ x: e, y: t });
const yh = (e, t) => e.x * t.x + e.y * t.y;
const Wr = (e, t) => Gt(e.x - t.x, e.y - t.y);
const Sh = (e, t) => yh(Wr(e, t), Wr(e, t));
const Yr = (e, t) => Math.sqrt(Sh(e, t));
const qr = (e, t) => {
    const i = e;
    const a = 1.5707963267948966;
    const n = t;
    const r = 1.5707963267948966 - t;
    const l = Math.sin(a);
    const o = Math.sin(n);
    const s = Math.sin(r);
    const u = Math.cos(r);
    const c = i / l;
    const d = c * o;
    const h = c * s;
    return Gt(u * d, u * h);
};
const wh = (e, t) => {
    const i = e.width;
    const a = e.height;
    const n = qr(i, t);
    const r = qr(a, t);
    const l = Gt(e.x + Math.abs(n.x), e.y - Math.abs(n.y));
    const o = Gt(e.x + e.width + Math.abs(r.y), e.y + Math.abs(r.x));
    const s = Gt(e.x - Math.abs(r.y), e.y + e.height - Math.abs(r.x));
    return { width: Yr(l, o), height: Yr(l, s) };
};
const vh = (e, t, i = 1) => {
    const a = e.height / e.width;
    const n = 1;
    const r = t;
    let l = 1;
    let o = a;
    o > r && ((o = r), (l = o / a));
    const s = Math.max(n / l, r / o);
    const u = e.width / (i * s * l);
    const c = u * t;
    return { width: u, height: c };
};
const jr = (e, t, i, a) => {
    const n = a.x > 0.5 ? 1 - a.x : a.x;
    const r = a.y > 0.5 ? 1 - a.y : a.y;
    const l = n * 2 * e.width;
    const o = r * 2 * e.height;
    const s = wh(t, i);
    return Math.max(s.width / l, s.height / o);
};
const Xr = (e, t) => {
    let i = e.width;
    let a = i * t;
    a > e.height && ((a = e.height), (i = a / t));
    const n = (e.width - i) * 0.5;
    const r = (e.height - a) * 0.5;
    return { x: n, y: r, width: i, height: a };
};
const Ah = (e, t = {}) => {
    let { zoom: i, rotation: a, center: n, aspectRatio: r } = t;
    r || (r = e.height / e.width);
    const l = vh(e, r, i);
    const o = { x: l.width * 0.5, y: l.height * 0.5 };
    const s = { x: 0, y: 0, width: l.width, height: l.height, center: o };
    const u = typeof t.scaleToFit > "u" || t.scaleToFit;
    const c = jr(e, Xr(s, r), a, u ? n : { x: 0.5, y: 0.5 });
    const d = i * c;
    return {
        widthFloat: l.width / d,
        heightFloat: l.height / d,
        width: Math.round(l.width / d),
        height: Math.round(l.height / d),
    };
};
const Fe = { type: "spring", stiffness: 0.5, damping: 0.45, mass: 10 };
const Lh = (e) =>
    e.utils.createView({
        name: "image-bitmap",
        ignoreRect: !0,
        mixins: { styles: ["scaleX", "scaleY"] },
        create: ({ root: t, props: i }) => {
            t.appendChild(i.image);
        },
    });
const Mh = (e) =>
    e.utils.createView({
        name: "image-canvas-wrapper",
        tag: "div",
        ignoreRect: !0,
        mixins: {
            apis: ["crop", "width", "height"],
            styles: [
                "originX",
                "originY",
                "translateX",
                "translateY",
                "scaleX",
                "scaleY",
                "rotateZ",
            ],
            animations: {
                originX: Fe,
                originY: Fe,
                scaleX: Fe,
                scaleY: Fe,
                translateX: Fe,
                translateY: Fe,
                rotateZ: Fe,
            },
        },
        create: ({ root: t, props: i }) => {
            (i.width = i.image.width),
                (i.height = i.image.height),
                (t.ref.bitmap = t.appendChildView(
                    t.createChildView(Lh(e), { image: i.image }),
                ));
        },
        write: ({ root: t, props: i }) => {
            const { flip: a } = i.crop;
            const { bitmap: n } = t.ref;
            (n.scaleX = a.horizontal ? -1 : 1),
                (n.scaleY = a.vertical ? -1 : 1);
        },
    });
const xh = (e) =>
    e.utils.createView({
        name: "image-clip",
        tag: "div",
        ignoreRect: !0,
        mixins: {
            apis: [
                "crop",
                "markup",
                "resize",
                "width",
                "height",
                "dirty",
                "background",
            ],
            styles: ["width", "height", "opacity"],
            animations: { opacity: { type: "tween", duration: 250 } },
        },
        didWriteView: function ({ root: t, props: i }) {
            i.background && (t.element.style.backgroundColor = i.background);
        },
        create: ({ root: t, props: i }) => {
            (t.ref.image = t.appendChildView(
                t.createChildView(Mh(e), Object.assign({}, i)),
            )),
                (t.ref.createMarkup = () => {
                    t.ref.markup ||
                        (t.ref.markup = t.appendChildView(
                            t.createChildView(Rh(e), Object.assign({}, i)),
                        ));
                }),
                (t.ref.destroyMarkup = () => {
                    t.ref.markup &&
                        (t.removeChildView(t.ref.markup),
                        (t.ref.markup = null));
                });
            const a = t.query("GET_IMAGE_PREVIEW_TRANSPARENCY_INDICATOR");
            a !== null &&
                (a === "grid"
                    ? (t.element.dataset.transparencyIndicator = a)
                    : (t.element.dataset.transparencyIndicator = "color"));
        },
        write: ({ root: t, props: i, shouldOptimize: a }) => {
            const {
                crop: n,
                markup: r,
                resize: l,
                dirty: o,
                width: s,
                height: u,
            } = i;
            t.ref.image.crop = n;
            const c = {
                x: 0,
                y: 0,
                width: s,
                height: u,
                center: { x: s * 0.5, y: u * 0.5 },
            };
            const d = { width: t.ref.image.width, height: t.ref.image.height };
            const h = { x: n.center.x * d.width, y: n.center.y * d.height };
            const m = {
                x: c.center.x - d.width * n.center.x,
                y: c.center.y - d.height * n.center.y,
            };
            const p = Math.PI * 2 + (n.rotation % (Math.PI * 2));
            const f = n.aspectRatio || d.height / d.width;
            const g = typeof n.scaleToFit > "u" || n.scaleToFit;
            const I = jr(d, Xr(c, f), p, g ? n.center : { x: 0.5, y: 0.5 });
            const E = n.zoom * I;
            r && r.length
                ? (t.ref.createMarkup(),
                  (t.ref.markup.width = s),
                  (t.ref.markup.height = u),
                  (t.ref.markup.resize = l),
                  (t.ref.markup.dirty = o),
                  (t.ref.markup.markup = r),
                  (t.ref.markup.crop = Ah(d, n)))
                : t.ref.markup && t.ref.destroyMarkup();
            const T = t.ref.image;
            if (a) {
                (T.originX = null),
                    (T.originY = null),
                    (T.translateX = null),
                    (T.translateY = null),
                    (T.rotateZ = null),
                    (T.scaleX = null),
                    (T.scaleY = null);
                return;
            }
            (T.originX = h.x),
                (T.originY = h.y),
                (T.translateX = m.x),
                (T.translateY = m.y),
                (T.rotateZ = p),
                (T.scaleX = E),
                (T.scaleY = E);
        },
    });
const Oh = (e) =>
    e.utils.createView({
        name: "image-preview",
        tag: "div",
        ignoreRect: !0,
        mixins: {
            apis: ["image", "crop", "markup", "resize", "dirty", "background"],
            styles: ["translateY", "scaleX", "scaleY", "opacity"],
            animations: {
                scaleX: Fe,
                scaleY: Fe,
                translateY: Fe,
                opacity: { type: "tween", duration: 400 },
            },
        },
        create: ({ root: t, props: i }) => {
            t.ref.clip = t.appendChildView(
                t.createChildView(xh(e), {
                    id: i.id,
                    image: i.image,
                    crop: i.crop,
                    markup: i.markup,
                    resize: i.resize,
                    dirty: i.dirty,
                    background: i.background,
                }),
            );
        },
        write: ({ root: t, props: i, shouldOptimize: a }) => {
            const { clip: n } = t.ref;
            const { image: r, crop: l, markup: o, resize: s, dirty: u } = i;
            if (
                ((n.crop = l),
                (n.markup = o),
                (n.resize = s),
                (n.dirty = u),
                (n.opacity = a ? 0 : 1),
                a || t.rect.element.hidden)
            ) {
                return;
            }
            const c = r.height / r.width;
            let d = l.aspectRatio || c;
            const h = t.rect.inner.width;
            const m = t.rect.inner.height;
            let p = t.query("GET_IMAGE_PREVIEW_HEIGHT");
            const f = t.query("GET_IMAGE_PREVIEW_MIN_HEIGHT");
            const g = t.query("GET_IMAGE_PREVIEW_MAX_HEIGHT");
            const I = t.query("GET_PANEL_ASPECT_RATIO");
            const E = t.query("GET_ALLOW_MULTIPLE");
            I && !E && ((p = h * I), (d = I));
            let T = p !== null ? p : Math.max(f, Math.min(h * d, g));
            let _ = T / d;
            _ > h && ((_ = h), (T = _ * d)),
                T > m && ((T = m), (_ = m / d)),
                (n.width = _),
                (n.height = T);
        },
    });
let Ia = `<svg width="500" height="200" viewBox="0 0 500 200" preserveAspectRatio="none">
    <defs>
        <radialGradient id="gradient-__UID__" cx=".5" cy="1.25" r="1.15">
            <stop offset='50%' stop-color='#000000'/>
            <stop offset='56%' stop-color='#0a0a0a'/>
            <stop offset='63%' stop-color='#262626'/>
            <stop offset='69%' stop-color='#4f4f4f'/>
            <stop offset='75%' stop-color='#808080'/>
            <stop offset='81%' stop-color='#b1b1b1'/>
            <stop offset='88%' stop-color='#dadada'/>
            <stop offset='94%' stop-color='#f6f6f6'/>
            <stop offset='100%' stop-color='#ffffff'/>
        </radialGradient>
        <mask id="mask-__UID__">
            <rect x="0" y="0" width="500" height="200" fill="url(#gradient-__UID__)"></rect>
        </mask>
    </defs>
    <rect x="0" width="500" height="200" fill="currentColor" mask="url(#mask-__UID__)"></rect>
</svg>`;
let $r = 0;
const Ph = (e) =>
    e.utils.createView({
        name: "image-preview-overlay",
        tag: "div",
        ignoreRect: !0,
        create: ({ root: t, props: i }) => {
            if (document.querySelector("base")) {
                const a = window.location.href.replace(
                    window.location.hash,
                    "",
                );
                Ia = Ia.replace(/url\(\#/g, "url(" + a + "#");
            }
            $r++,
                t.element.classList.add(
                    `filepond--image-preview-overlay-${i.status}`,
                ),
                (t.element.innerHTML = Ia.replace(/__UID__/g, $r));
        },
        mixins: {
            styles: ["opacity"],
            animations: { opacity: { type: "spring", mass: 25 } },
        },
    });
const Dh = function () {
    self.onmessage = (e) => {
        createImageBitmap(e.data.message.file).then((t) => {
            self.postMessage({ id: e.data.id, message: t }, [t]);
        });
    };
};
const Fh = function () {
    self.onmessage = (e) => {
        const t = e.data.message.imageData;
        const i = e.data.message.colorMatrix;
        const a = t.data;
        const n = a.length;
        const r = i[0];
        const l = i[1];
        const o = i[2];
        const s = i[3];
        const u = i[4];
        const c = i[5];
        const d = i[6];
        const h = i[7];
        const m = i[8];
        const p = i[9];
        const f = i[10];
        const g = i[11];
        const I = i[12];
        const E = i[13];
        const T = i[14];
        const _ = i[15];
        const y = i[16];
        const b = i[17];
        const A = i[18];
        const R = i[19];
        let S = 0;
        let P = 0;
        let O = 0;
        let x = 0;
        let z = 0;
        for (; S < n; S += 4) {
            (P = a[S] / 255),
                (O = a[S + 1] / 255),
                (x = a[S + 2] / 255),
                (z = a[S + 3] / 255),
                (a[S] = Math.max(
                    0,
                    Math.min((P * r + O * l + x * o + z * s + u) * 255, 255),
                )),
                (a[S + 1] = Math.max(
                    0,
                    Math.min((P * c + O * d + x * h + z * m + p) * 255, 255),
                )),
                (a[S + 2] = Math.max(
                    0,
                    Math.min((P * f + O * g + x * I + z * E + T) * 255, 255),
                )),
                (a[S + 3] = Math.max(
                    0,
                    Math.min((P * _ + O * y + x * b + z * A + R) * 255, 255),
                ));
        }
        self.postMessage({ id: e.data.id, message: t }, [t.data.buffer]);
    };
};
const Ch = (e, t) => {
    let i = new Image();
    (i.onload = () => {
        const a = i.naturalWidth;
        const n = i.naturalHeight;
        (i = null), t(a, n);
    }),
        (i.src = e);
};
const zh = {
    1: () => [1, 0, 0, 1, 0, 0],
    2: (e) => [-1, 0, 0, 1, e, 0],
    3: (e, t) => [-1, 0, 0, -1, e, t],
    4: (e, t) => [1, 0, 0, -1, 0, t],
    5: () => [0, 1, 1, 0, 0, 0],
    6: (e, t) => [0, 1, -1, 0, t, 0],
    7: (e, t) => [0, -1, -1, 0, t, e],
    8: (e) => [0, -1, 1, 0, 0, e],
};
const Nh = (e, t, i, a) => {
    a !== -1 && e.transform.apply(e, zh[a](t, i));
};
const Bh = (e, t, i, a) => {
    (t = Math.round(t)), (i = Math.round(i));
    const n = document.createElement("canvas");
    (n.width = t), (n.height = i);
    const r = n.getContext("2d");
    return (
        a >= 5 && a <= 8 && ([t, i] = [i, t]),
        Nh(r, t, i, a),
        r.drawImage(e, 0, 0, t, i),
        n
    );
};
const Qr = (e) => /^image/.test(e.type) && !/svg/.test(e.type);
const Vh = 10;
const Gh = 10;
const Uh = (e) => {
    const t = Math.min(Vh / e.width, Gh / e.height);
    const i = document.createElement("canvas");
    const a = i.getContext("2d");
    const n = (i.width = Math.ceil(e.width * t));
    const r = (i.height = Math.ceil(e.height * t));
    a.drawImage(e, 0, 0, n, r);
    let l = null;
    try {
        l = a.getImageData(0, 0, n, r).data;
    } catch {
        return null;
    }
    const o = l.length;
    let s = 0;
    let u = 0;
    let c = 0;
    let d = 0;
    for (; d < o; d += 4) {
        (s += l[d] * l[d]),
            (u += l[d + 1] * l[d + 1]),
            (c += l[d + 2] * l[d + 2]);
    }
    return (s = _a(s, o)), (u = _a(u, o)), (c = _a(c, o)), { r: s, g: u, b: c };
};
var _a = (e, t) => Math.floor(Math.sqrt(e / (t / 4)));
const kh = (e, t) => (
    (t = t || document.createElement("canvas")),
    (t.width = e.width),
    (t.height = e.height),
    t.getContext("2d").drawImage(e, 0, 0),
    t
);
const Hh = (e) => {
    let t;
    try {
        t = new ImageData(e.width, e.height);
    } catch {
        t = document
            .createElement("canvas")
            .getContext("2d")
            .createImageData(e.width, e.height);
    }
    return t.data.set(new Uint8ClampedArray(e.data)), t;
};
const Wh = (e) =>
    new Promise((t, i) => {
        const a = new Image();
        (a.crossOrigin = "Anonymous"),
            (a.onload = () => {
                t(a);
            }),
            (a.onerror = (n) => {
                i(n);
            }),
            (a.src = e);
    });
const Yh = (e) => {
    const t = Ph(e);
    const i = Oh(e);
    const { createWorker: a } = e.utils;
    const n = (E, T, _) =>
        new Promise((y) => {
            E.ref.imageData ||
                (E.ref.imageData = _.getContext("2d").getImageData(
                    0,
                    0,
                    _.width,
                    _.height,
                ));
            const b = Hh(E.ref.imageData);
            if (!T || T.length !== 20) {
                return _.getContext("2d").putImageData(b, 0, 0), y();
            }
            const A = a(Fh);
            A.post(
                { imageData: b, colorMatrix: T },
                (R) => {
                    _.getContext("2d").putImageData(R, 0, 0),
                        A.terminate(),
                        y();
                },
                [b.data.buffer],
            );
        });
    const r = (E, T) => {
        E.removeChildView(T),
            (T.image.width = 1),
            (T.image.height = 1),
            T._destroy();
    };
    const l = ({ root: E }) => {
        const T = E.ref.images.shift();
        return (
            (T.opacity = 0), (T.translateY = -15), E.ref.imageViewBin.push(T), T
        );
    };
    const o = ({ root: E, props: T, image: _ }) => {
        const y = T.id;
        const b = E.query("GET_ITEM", { id: y });
        if (!b) return;
        const A = b.getMetadata("crop") || {
            center: { x: 0.5, y: 0.5 },
            flip: { horizontal: !1, vertical: !1 },
            zoom: 1,
            rotation: 0,
            aspectRatio: null,
        };
        const R = E.query("GET_IMAGE_TRANSFORM_CANVAS_BACKGROUND_COLOR");
        let S;
        let P;
        let O = !1;
        E.query("GET_IMAGE_PREVIEW_MARKUP_SHOW") &&
            ((S = b.getMetadata("markup") || []),
            (P = b.getMetadata("resize")),
            (O = !0));
        const x = E.appendChildView(
            E.createChildView(i, {
                id: y,
                image: _,
                crop: A,
                resize: P,
                markup: S,
                dirty: O,
                background: R,
                opacity: 0,
                scaleX: 1.15,
                scaleY: 1.15,
                translateY: 15,
            }),
            E.childViews.length,
        );
        E.ref.images.push(x),
            (x.opacity = 1),
            (x.scaleX = 1),
            (x.scaleY = 1),
            (x.translateY = 0),
            setTimeout(() => {
                E.dispatch("DID_IMAGE_PREVIEW_SHOW", { id: y });
            }, 250);
    };
    const s = ({ root: E, props: T }) => {
        const _ = E.query("GET_ITEM", { id: T.id });
        if (!_) return;
        const y = E.ref.images[E.ref.images.length - 1];
        (y.crop = _.getMetadata("crop")),
            (y.background = E.query(
                "GET_IMAGE_TRANSFORM_CANVAS_BACKGROUND_COLOR",
            )),
            E.query("GET_IMAGE_PREVIEW_MARKUP_SHOW") &&
                ((y.dirty = !0),
                (y.resize = _.getMetadata("resize")),
                (y.markup = _.getMetadata("markup")));
    };
    const u = ({ root: E, props: T, action: _ }) => {
        if (
            !/crop|filter|markup|resize/.test(_.change.key) ||
            !E.ref.images.length
        ) {
            return;
        }
        const y = E.query("GET_ITEM", { id: T.id });
        if (y) {
            if (/filter/.test(_.change.key)) {
                const b = E.ref.images[E.ref.images.length - 1];
                n(E, _.change.value, b.image);
                return;
            }
            if (/crop|markup|resize/.test(_.change.key)) {
                const b = y.getMetadata("crop");
                const A = E.ref.images[E.ref.images.length - 1];
                if (Math.abs(b.aspectRatio - A.crop.aspectRatio) > 1e-5) {
                    const R = l({ root: E });
                    o({ root: E, props: T, image: kh(R.image) });
                } else s({ root: E, props: T });
            }
        }
    };
    const c = (E) => {
        const _ = window.navigator.userAgent.match(/Firefox\/([0-9]+)\./);
        return (_ ? parseInt(_[1]) : null) <= 58
            ? !1
            : "createImageBitmap" in window && Qr(E);
    };
    const d = ({ root: E, props: T }) => {
        const { id: _ } = T;
        const y = E.query("GET_ITEM", _);
        if (!y) return;
        const b = URL.createObjectURL(y.file);
        Ch(b, (A, R) => {
            E.dispatch("DID_IMAGE_PREVIEW_CALCULATE_SIZE", {
                id: _,
                width: A,
                height: R,
            });
        });
    };
    const h = ({ root: E, props: T }) => {
        const { id: _ } = T;
        const y = E.query("GET_ITEM", _);
        if (!y) return;
        const b = URL.createObjectURL(y.file);
        const A = () => {
            Wh(b).then(R);
        };
        const R = (S) => {
            URL.revokeObjectURL(b);
            const O = (y.getMetadata("exif") || {}).orientation || -1;
            let { width: x, height: z } = S;
            if (!x || !z) return;
            O >= 5 && O <= 8 && ([x, z] = [z, x]);
            const v = Math.max(1, window.devicePixelRatio * 0.75);
            const w = E.query("GET_IMAGE_PREVIEW_ZOOM_FACTOR") * v;
            const L = z / x;
            const C = E.rect.element.width;
            const D = E.rect.element.height;
            let V = C;
            let B = V * L;
            L > 1
                ? ((V = Math.min(x, C * w)), (B = V * L))
                : ((B = Math.min(z, D * w)), (V = B / L));
            const j = Bh(S, V, B, O);
            const $ = () => {
                const ue = E.query(
                    "GET_IMAGE_PREVIEW_CALCULATE_AVERAGE_IMAGE_COLOR",
                )
                    ? Uh(data)
                    : null;
                y.setMetadata("color", ue, !0),
                    "close" in S && S.close(),
                    (E.ref.overlayShadow.opacity = 1),
                    o({ root: E, props: T, image: j });
            };
            const X = y.getMetadata("filter");
            X ? n(E, X, j).then($) : $();
        };
        if (c(y.file)) {
            const S = a(Dh);
            S.post({ file: y.file }, (P) => {
                if ((S.terminate(), !P)) {
                    A();
                    return;
                }
                R(P);
            });
        } else A();
    };
    const m = ({ root: E }) => {
        const T = E.ref.images[E.ref.images.length - 1];
        (T.translateY = 0), (T.scaleX = 1), (T.scaleY = 1), (T.opacity = 1);
    };
    const p = ({ root: E }) => {
        (E.ref.overlayShadow.opacity = 1),
            (E.ref.overlayError.opacity = 0),
            (E.ref.overlaySuccess.opacity = 0);
    };
    const f = ({ root: E }) => {
        (E.ref.overlayShadow.opacity = 0.25), (E.ref.overlayError.opacity = 1);
    };
    const g = ({ root: E }) => {
        (E.ref.overlayShadow.opacity = 0.25),
            (E.ref.overlaySuccess.opacity = 1);
    };
    const I = ({ root: E }) => {
        (E.ref.images = []),
            (E.ref.imageData = null),
            (E.ref.imageViewBin = []),
            (E.ref.overlayShadow = E.appendChildView(
                E.createChildView(t, { opacity: 0, status: "idle" }),
            )),
            (E.ref.overlaySuccess = E.appendChildView(
                E.createChildView(t, { opacity: 0, status: "success" }),
            )),
            (E.ref.overlayError = E.appendChildView(
                E.createChildView(t, { opacity: 0, status: "failure" }),
            ));
    };
    return e.utils.createView({
        name: "image-preview-wrapper",
        create: I,
        styles: ["height"],
        apis: ["height"],
        destroy: ({ root: E }) => {
            E.ref.images.forEach((T) => {
                (T.image.width = 1), (T.image.height = 1);
            });
        },
        didWriteView: ({ root: E }) => {
            E.ref.images.forEach((T) => {
                T.dirty = !1;
            });
        },
        write: e.utils.createRoute(
            {
                DID_IMAGE_PREVIEW_DRAW: m,
                DID_IMAGE_PREVIEW_CONTAINER_CREATE: d,
                DID_FINISH_CALCULATE_PREVIEWSIZE: h,
                DID_UPDATE_ITEM_METADATA: u,
                DID_THROW_ITEM_LOAD_ERROR: f,
                DID_THROW_ITEM_PROCESSING_ERROR: f,
                DID_THROW_ITEM_INVALID: f,
                DID_COMPLETE_ITEM_PROCESSING: g,
                DID_START_ITEM_PROCESSING: p,
                DID_REVERT_ITEM_PROCESSING: p,
            },
            ({ root: E }) => {
                const T = E.ref.imageViewBin.filter((_) => _.opacity === 0);
                (E.ref.imageViewBin = E.ref.imageViewBin.filter(
                    (_) => _.opacity > 0,
                )),
                    T.forEach((_) => r(E, _)),
                    (T.length = 0);
            },
        ),
    });
};
const Kr = (e) => {
    const { addFilter: t, utils: i } = e;
    const { Type: a, createRoute: n, isFile: r } = i;
    const l = Yh(e);
    return (
        t("CREATE_VIEW", (o) => {
            const { is: s, view: u, query: c } = o;
            if (!s("file") || !c("GET_ALLOW_IMAGE_PREVIEW")) return;
            const d = ({ root: g, props: I }) => {
                const { id: E } = I;
                const T = c("GET_ITEM", E);
                if (!T || !r(T.file) || T.archived) return;
                const _ = T.file;
                if (!Zu(_) || !c("GET_IMAGE_PREVIEW_FILTER_ITEM")(T)) return;
                const y = "createImageBitmap" in (window || {});
                const b = c("GET_IMAGE_PREVIEW_MAX_FILE_SIZE");
                if (!y && b && _.size > b) return;
                g.ref.imagePreview = u.appendChildView(
                    u.createChildView(l, { id: E }),
                );
                const A = g.query("GET_IMAGE_PREVIEW_HEIGHT");
                A &&
                    g.dispatch("DID_UPDATE_PANEL_HEIGHT", {
                        id: T.id,
                        height: A,
                    });
                const R =
                    !y &&
                    _.size >
                        c("GET_IMAGE_PREVIEW_MAX_INSTANT_PREVIEW_FILE_SIZE");
                g.dispatch("DID_IMAGE_PREVIEW_CONTAINER_CREATE", { id: E }, R);
            };
            const h = (g, I) => {
                if (!g.ref.imagePreview) return;
                const { id: E } = I;
                const T = g.query("GET_ITEM", { id: E });
                if (!T) return;
                const _ = g.query("GET_PANEL_ASPECT_RATIO");
                const y = g.query("GET_ITEM_PANEL_ASPECT_RATIO");
                const b = g.query("GET_IMAGE_PREVIEW_HEIGHT");
                if (_ || y || b) return;
                let { imageWidth: A, imageHeight: R } = g.ref;
                if (!A || !R) return;
                const S = g.query("GET_IMAGE_PREVIEW_MIN_HEIGHT");
                const P = g.query("GET_IMAGE_PREVIEW_MAX_HEIGHT");
                const x = (T.getMetadata("exif") || {}).orientation || -1;
                if (
                    (x >= 5 && x <= 8 && ([A, R] = [R, A]),
                    !Qr(T.file) || g.query("GET_IMAGE_PREVIEW_UPSCALE"))
                ) {
                    const C = 2048 / A;
                    (A *= C), (R *= C);
                }
                const z = R / A;
                const v = (T.getMetadata("crop") || {}).aspectRatio || z;
                const F = Math.max(S, Math.min(R, P));
                const w = g.rect.element.width;
                const L = Math.min(w * v, F);
                g.dispatch("DID_UPDATE_PANEL_HEIGHT", { id: T.id, height: L });
            };
            const m = ({ root: g }) => {
                g.ref.shouldRescale = !0;
            };
            const p = ({ root: g, action: I }) => {
                I.change.key === "crop" && (g.ref.shouldRescale = !0);
            };
            const f = ({ root: g, action: I }) => {
                (g.ref.imageWidth = I.width),
                    (g.ref.imageHeight = I.height),
                    (g.ref.shouldRescale = !0),
                    (g.ref.shouldDrawPreview = !0),
                    g.dispatch("KICK");
            };
            u.registerWriter(
                n(
                    {
                        DID_RESIZE_ROOT: m,
                        DID_STOP_RESIZE: m,
                        DID_LOAD_ITEM: d,
                        DID_IMAGE_PREVIEW_CALCULATE_SIZE: f,
                        DID_UPDATE_ITEM_METADATA: p,
                    },
                    ({ root: g, props: I }) => {
                        g.ref.imagePreview &&
                            (g.rect.element.hidden ||
                                (g.ref.shouldRescale &&
                                    (h(g, I), (g.ref.shouldRescale = !1)),
                                g.ref.shouldDrawPreview &&
                                    (requestAnimationFrame(() => {
                                        g.dispatch(
                                            "DID_FINISH_CALCULATE_PREVIEWSIZE",
                                            { id: I.id },
                                        );
                                    }),
                                    (g.ref.shouldDrawPreview = !1))));
                    },
                ),
            );
        }),
        {
            options: {
                allowImagePreview: [!0, a.BOOLEAN],
                imagePreviewFilterItem: [() => !0, a.FUNCTION],
                imagePreviewHeight: [null, a.INT],
                imagePreviewMinHeight: [44, a.INT],
                imagePreviewMaxHeight: [256, a.INT],
                imagePreviewMaxFileSize: [null, a.INT],
                imagePreviewZoomFactor: [2, a.INT],
                imagePreviewUpscale: [!1, a.BOOLEAN],
                imagePreviewMaxInstantPreviewFileSize: [1e6, a.INT],
                imagePreviewTransparencyIndicator: [null, a.STRING],
                imagePreviewCalculateAverageImageColor: [!1, a.BOOLEAN],
                imagePreviewMarkupShow: [!0, a.BOOLEAN],
                imagePreviewMarkupFilter: [() => !0, a.FUNCTION],
            },
        }
    );
};
const qh = typeof window < "u" && typeof window.document < "u";
qh &&
    document.dispatchEvent(
        new CustomEvent("FilePond:pluginloaded", { detail: Kr }),
    );
const Zr = Kr;
const $h = (e) => /^image/.test(e.type);
const jh = (e, t) => {
    let i = new Image();
    (i.onload = () => {
        const a = i.naturalWidth;
        const n = i.naturalHeight;
        (i = null), t({ width: a, height: n });
    }),
        (i.onerror = () => t(null)),
        (i.src = e);
};
const Jr = ({ addFilter: e, utils: t }) => {
    const { Type: i } = t;
    return (
        e(
            "DID_LOAD_ITEM",
            (a, { query: n }) =>
                new Promise((r, l) => {
                    const o = a.file;
                    if (!$h(o) || !n("GET_ALLOW_IMAGE_RESIZE")) return r(a);
                    const s = n("GET_IMAGE_RESIZE_MODE");
                    const u = n("GET_IMAGE_RESIZE_TARGET_WIDTH");
                    const c = n("GET_IMAGE_RESIZE_TARGET_HEIGHT");
                    const d = n("GET_IMAGE_RESIZE_UPSCALE");
                    if (u === null && c === null) return r(a);
                    const h = u === null ? c : u;
                    const m = c === null ? h : c;
                    const p = URL.createObjectURL(o);
                    jh(p, (f) => {
                        if ((URL.revokeObjectURL(p), !f)) return r(a);
                        let { width: g, height: I } = f;
                        const E =
                            (a.getMetadata("exif") || {}).orientation || -1;
                        if (
                            (E >= 5 && E <= 8 && ([g, I] = [I, g]),
                            g === h && I === m)
                        ) {
                            return r(a);
                        }
                        if (!d) {
                            if (s === "cover") {
                                if (g <= h || I <= m) return r(a);
                            } else if (g <= h && I <= h) return r(a);
                        }
                        a.setMetadata("resize", {
                            mode: s,
                            upscale: d,
                            size: { width: h, height: m },
                        }),
                            r(a);
                    });
                }),
        ),
        {
            options: {
                allowImageResize: [!0, i.BOOLEAN],
                imageResizeMode: ["cover", i.STRING],
                imageResizeUpscale: [!0, i.BOOLEAN],
                imageResizeTargetWidth: [null, i.INT],
                imageResizeTargetHeight: [null, i.INT],
            },
        }
    );
};
const Xh = typeof window < "u" && typeof window.document < "u";
Xh &&
    document.dispatchEvent(
        new CustomEvent("FilePond:pluginloaded", { detail: Jr }),
    );
const el = Jr;
const Qh = (e) => /^image/.test(e.type);
const Kh = (e) => e.substr(0, e.lastIndexOf(".")) || e;
const Zh = { jpeg: "jpg", "svg+xml": "svg" };
const Jh = (e, t) => {
    const i = Kh(e);
    const a = t.split("/")[1];
    const n = Zh[a] || a;
    return `${i}.${n}`;
};
const em = (e) => (/jpeg|png|svg\+xml/.test(e) ? e : "image/jpeg");
const tm = (e) => /^image/.test(e.type);
const im = {
    1: () => [1, 0, 0, 1, 0, 0],
    2: (e) => [-1, 0, 0, 1, e, 0],
    3: (e, t) => [-1, 0, 0, -1, e, t],
    4: (e, t) => [1, 0, 0, -1, 0, t],
    5: () => [0, 1, 1, 0, 0, 0],
    6: (e, t) => [0, 1, -1, 0, t, 0],
    7: (e, t) => [0, -1, -1, 0, t, e],
    8: (e) => [0, -1, 1, 0, 0, e],
};
const am = (e, t, i) => (i === -1 && (i = 1), im[i](e, t));
const kt = (e, t) => ({ x: e, y: t });
const nm = (e, t) => e.x * t.x + e.y * t.y;
const tl = (e, t) => kt(e.x - t.x, e.y - t.y);
const rm = (e, t) => nm(tl(e, t), tl(e, t));
const il = (e, t) => Math.sqrt(rm(e, t));
const al = (e, t) => {
    const i = e;
    const a = 1.5707963267948966;
    const n = t;
    const r = 1.5707963267948966 - t;
    const l = Math.sin(a);
    const o = Math.sin(n);
    const s = Math.sin(r);
    const u = Math.cos(r);
    const c = i / l;
    const d = c * o;
    const h = c * s;
    return kt(u * d, u * h);
};
const lm = (e, t) => {
    const i = e.width;
    const a = e.height;
    const n = al(i, t);
    const r = al(a, t);
    const l = kt(e.x + Math.abs(n.x), e.y - Math.abs(n.y));
    const o = kt(e.x + e.width + Math.abs(r.y), e.y + Math.abs(r.x));
    const s = kt(e.x - Math.abs(r.y), e.y + e.height - Math.abs(r.x));
    return { width: il(l, o), height: il(l, s) };
};
const ll = (e, t, i = 0, a = { x: 0.5, y: 0.5 }) => {
    const n = a.x > 0.5 ? 1 - a.x : a.x;
    const r = a.y > 0.5 ? 1 - a.y : a.y;
    const l = n * 2 * e.width;
    const o = r * 2 * e.height;
    const s = lm(t, i);
    return Math.max(s.width / l, s.height / o);
};
const ol = (e, t) => {
    let i = e.width;
    let a = i * t;
    a > e.height && ((a = e.height), (i = a / t));
    const n = (e.width - i) * 0.5;
    const r = (e.height - a) * 0.5;
    return { x: n, y: r, width: i, height: a };
};
const nl = (e, t, i = 1) => {
    const a = e.height / e.width;
    const n = 1;
    const r = t;
    let l = 1;
    let o = a;
    o > r && ((o = r), (l = o / a));
    const s = Math.max(n / l, r / o);
    const u = e.width / (i * s * l);
    const c = u * t;
    return { width: u, height: c };
};
const sl = (e) => {
    (e.width = 1), (e.height = 1), e.getContext("2d").clearRect(0, 0, 1, 1);
};
const rl = (e) => e && (e.horizontal || e.vertical);
const om = (e, t, i) => {
    if (t <= 1 && !rl(i)) {
        return (e.width = e.naturalWidth), (e.height = e.naturalHeight), e;
    }
    const a = document.createElement("canvas");
    const n = e.naturalWidth;
    const r = e.naturalHeight;
    const l = t >= 5 && t <= 8;
    l ? ((a.width = r), (a.height = n)) : ((a.width = n), (a.height = r));
    const o = a.getContext("2d");
    if ((t && o.transform.apply(o, am(n, r, t)), rl(i))) {
        const s = [1, 0, 0, 1, 0, 0];
        ((!l && i.horizontal) || l & i.vertical) && ((s[0] = -1), (s[4] = n)),
            ((!l && i.vertical) || (l && i.horizontal)) &&
                ((s[3] = -1), (s[5] = r)),
            o.transform(...s);
    }
    return o.drawImage(e, 0, 0, n, r), a;
};
const sm = (e, t, i = {}, a = {}) => {
    const { canvasMemoryLimit: n, background: r = null } = a;
    const l = i.zoom || 1;
    const o = om(e, t, i.flip);
    const s = { width: o.width, height: o.height };
    const u = i.aspectRatio || s.height / s.width;
    let c = nl(s, u, l);
    if (n) {
        const T = c.width * c.height;
        if (T > n) {
            const _ = Math.sqrt(n) / Math.sqrt(T);
            (s.width = Math.floor(s.width * _)),
                (s.height = Math.floor(s.height * _)),
                (c = nl(s, u, l));
        }
    }
    const d = document.createElement("canvas");
    const h = { x: c.width * 0.5, y: c.height * 0.5 };
    const m = { x: 0, y: 0, width: c.width, height: c.height, center: h };
    const p = typeof i.scaleToFit > "u" || i.scaleToFit;
    const f =
        l * ll(s, ol(m, u), i.rotation, p ? i.center : { x: 0.5, y: 0.5 });
    (d.width = Math.round(c.width / f)),
        (d.height = Math.round(c.height / f)),
        (h.x /= f),
        (h.y /= f);
    const g = {
        x: h.x - s.width * (i.center ? i.center.x : 0.5),
        y: h.y - s.height * (i.center ? i.center.y : 0.5),
    };
    const I = d.getContext("2d");
    r && ((I.fillStyle = r), I.fillRect(0, 0, d.width, d.height)),
        I.translate(h.x, h.y),
        I.rotate(i.rotation || 0),
        I.drawImage(o, g.x - h.x, g.y - h.y, s.width, s.height);
    const E = I.getImageData(0, 0, d.width, d.height);
    return sl(d), E;
};
const cm = typeof window < "u" && typeof window.document < "u";
cm &&
    (HTMLCanvasElement.prototype.toBlob ||
        Object.defineProperty(HTMLCanvasElement.prototype, "toBlob", {
            value: function (e, t, i) {
                const a = this.toDataURL(t, i).split(",")[1];
                setTimeout(function () {
                    for (
                        var n = atob(a),
                            r = n.length,
                            l = new Uint8Array(r),
                            o = 0;
                        o < r;
                        o++
                    ) {
                        l[o] = n.charCodeAt(o);
                    }
                    e(new Blob([l], { type: t || "image/png" }));
                });
            },
        }));
const dm = (e, t, i = null) =>
    new Promise((a) => {
        const n = i ? i(e) : e;
        Promise.resolve(n).then((r) => {
            r.toBlob(a, t.type, t.quality);
        });
    });
const bi = (e, t) => Ht(e.x * t, e.y * t);
const Ii = (e, t) => Ht(e.x + t.x, e.y + t.y);
const cl = (e) => {
    const t = Math.sqrt(e.x * e.x + e.y * e.y);
    return t === 0 ? { x: 0, y: 0 } : Ht(e.x / t, e.y / t);
};
const qe = (e, t, i) => {
    const a = Math.cos(t);
    const n = Math.sin(t);
    const r = Ht(e.x - i.x, e.y - i.y);
    return Ht(i.x + a * r.x - n * r.y, i.y + n * r.x + a * r.y);
};
var Ht = (e = 0, t = 0) => ({ x: e, y: t });
const he = (e, t, i = 1, a) => {
    if (typeof e === "string") return parseFloat(e) * i;
    if (typeof e === "number") {
        return e * (a ? t[a] : Math.min(t.width, t.height));
    }
};
const ot = (e, t, i) => {
    const a = e.borderStyle || e.lineStyle || "solid";
    const n = e.backgroundColor || e.fontColor || "transparent";
    const r = e.borderColor || e.lineColor || "transparent";
    const l = he(e.borderWidth || e.lineWidth, t, i);
    const o = e.lineCap || "round";
    const s = e.lineJoin || "round";
    const u = typeof a === "string" ? "" : a.map((d) => he(d, t, i)).join(",");
    const c = e.opacity || 1;
    return {
        "stroke-linecap": o,
        "stroke-linejoin": s,
        "stroke-width": l || 0,
        "stroke-dasharray": u,
        stroke: r,
        fill: n,
        opacity: c,
    };
};
const Ae = (e) => e != null;
const Rt = (e, t, i = 1) => {
    let a = he(e.x, t, i, "width") || he(e.left, t, i, "width");
    let n = he(e.y, t, i, "height") || he(e.top, t, i, "height");
    let r = he(e.width, t, i, "width");
    let l = he(e.height, t, i, "height");
    const o = he(e.right, t, i, "width");
    const s = he(e.bottom, t, i, "height");
    return (
        Ae(n) || (Ae(l) && Ae(s) ? (n = t.height - l - s) : (n = s)),
        Ae(a) || (Ae(r) && Ae(o) ? (a = t.width - r - o) : (a = o)),
        Ae(r) || (Ae(a) && Ae(o) ? (r = t.width - a - o) : (r = 0)),
        Ae(l) || (Ae(n) && Ae(s) ? (l = t.height - n - s) : (l = 0)),
        { x: a || 0, y: n || 0, width: r || 0, height: l || 0 }
    );
};
const um = (e) =>
    e.map((t, i) => `${i === 0 ? "M" : "L"} ${t.x} ${t.y}`).join(" ");
const ze = (e, t) => Object.keys(t).forEach((i) => e.setAttribute(i, t[i]));
const hm = "http://www.w3.org/2000/svg";
const _t = (e, t) => {
    const i = document.createElementNS(hm, e);
    return t && ze(i, t), i;
};
const mm = (e) => ze(e, { ...e.rect, ...e.styles });
const pm = (e) => {
    const t = e.rect.x + e.rect.width * 0.5;
    const i = e.rect.y + e.rect.height * 0.5;
    const a = e.rect.width * 0.5;
    const n = e.rect.height * 0.5;
    return ze(e, { cx: t, cy: i, rx: a, ry: n, ...e.styles });
};
const fm = { contain: "xMidYMid meet", cover: "xMidYMid slice" };
const gm = (e, t) => {
    ze(e, { ...e.rect, ...e.styles, preserveAspectRatio: fm[t.fit] || "none" });
};
const Em = { left: "start", center: "middle", right: "end" };
const Tm = (e, t, i, a) => {
    const n = he(t.fontSize, i, a);
    const r = t.fontFamily || "sans-serif";
    const l = t.fontWeight || "normal";
    const o = Em[t.textAlign] || "start";
    ze(e, {
        ...e.rect,
        ...e.styles,
        "stroke-width": 0,
        "font-weight": l,
        "font-size": n,
        "font-family": r,
        "text-anchor": o,
    }),
        e.text !== t.text &&
            ((e.text = t.text), (e.textContent = t.text.length ? t.text : " "));
};
const bm = (e, t, i, a) => {
    ze(e, { ...e.rect, ...e.styles, fill: "none" });
    const n = e.childNodes[0];
    const r = e.childNodes[1];
    const l = e.childNodes[2];
    const o = e.rect;
    const s = { x: e.rect.x + e.rect.width, y: e.rect.y + e.rect.height };
    if ((ze(n, { x1: o.x, y1: o.y, x2: s.x, y2: s.y }), !t.lineDecoration)) {
        return;
    }
    (r.style.display = "none"), (l.style.display = "none");
    const u = cl({ x: s.x - o.x, y: s.y - o.y });
    const c = he(0.05, i, a);
    if (t.lineDecoration.indexOf("arrow-begin") !== -1) {
        const d = bi(u, c);
        const h = Ii(o, d);
        const m = qe(o, 2, h);
        const p = qe(o, -2, h);
        ze(r, {
            style: "display:block;",
            d: `M${m.x},${m.y} L${o.x},${o.y} L${p.x},${p.y}`,
        });
    }
    if (t.lineDecoration.indexOf("arrow-end") !== -1) {
        const d = bi(u, -c);
        const h = Ii(s, d);
        const m = qe(s, 2, h);
        const p = qe(s, -2, h);
        ze(l, {
            style: "display:block;",
            d: `M${m.x},${m.y} L${s.x},${s.y} L${p.x},${p.y}`,
        });
    }
};
const Im = (e, t, i, a) => {
    ze(e, {
        ...e.styles,
        fill: "none",
        d: um(
            t.points.map((n) => ({
                x: he(n.x, i, a, "width"),
                y: he(n.y, i, a, "height"),
            })),
        ),
    });
};
const Ti = (e) => (t) => _t(e, { id: t.id });
const _m = (e) => {
    const t = _t("image", {
        id: e.id,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        opacity: "0",
    });
    return (
        (t.onload = () => {
            t.setAttribute("opacity", e.opacity || 1);
        }),
        t.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", e.src),
        t
    );
};
const Rm = (e) => {
    const t = _t("g", {
        id: e.id,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
    });
    const i = _t("line");
    t.appendChild(i);
    const a = _t("path");
    t.appendChild(a);
    const n = _t("path");
    return t.appendChild(n), t;
};
const ym = {
    image: _m,
    rect: Ti("rect"),
    ellipse: Ti("ellipse"),
    text: Ti("text"),
    path: Ti("path"),
    line: Rm,
};
const Sm = { rect: mm, ellipse: pm, image: gm, text: Tm, path: Im, line: bm };
const wm = (e, t) => ym[e](t);
const vm = (e, t, i, a, n) => {
    t !== "path" && (e.rect = Rt(i, a, n)),
        (e.styles = ot(i, a, n)),
        Sm[t](e, i, a, n);
};
const dl = (e, t) =>
    e[1].zIndex > t[1].zIndex ? 1 : e[1].zIndex < t[1].zIndex ? -1 : 0;
const Am = (e, t = {}, i, a) =>
    new Promise((n) => {
        const { background: r = null } = a;
        const l = new FileReader();
        (l.onloadend = () => {
            const o = l.result;
            const s = document.createElement("div");
            (s.style.cssText =
                "position:absolute;pointer-events:none;width:0;height:0;visibility:hidden;"),
                (s.innerHTML = o);
            const u = s.querySelector("svg");
            document.body.appendChild(s);
            const c = u.getBBox();
            s.parentNode.removeChild(s);
            const d = s.querySelector("title");
            const h = u.getAttribute("viewBox") || "";
            const m = u.getAttribute("width") || "";
            const p = u.getAttribute("height") || "";
            const f = parseFloat(m) || null;
            const g = parseFloat(p) || null;
            const I = (m.match(/[a-z]+/) || [])[0] || "";
            const E = (p.match(/[a-z]+/) || [])[0] || "";
            const T = h.split(" ").map(parseFloat);
            const _ = T.length
                ? { x: T[0], y: T[1], width: T[2], height: T[3] }
                : c;
            const y = f ?? _.width;
            const b = g ?? _.height;
            (u.style.overflow = "visible"),
                u.setAttribute("width", y),
                u.setAttribute("height", b);
            let A = "";
            if (i && i.length) {
                const X = { width: y, height: b };
                (A = i.sort(dl).reduce((ue, U) => {
                    const W = wm(U[0], U[1]);
                    return (
                        vm(W, U[0], U[1], X),
                        W.removeAttribute("id"),
                        W.getAttribute("opacity") === 1 &&
                            W.removeAttribute("opacity"),
                        ue +
                            `
` +
                            W.outerHTML +
                            `
`
                    );
                }, "")),
                    (A = `

<g>${A.replace(/&nbsp;/g, " ")}</g>

`);
            }
            const R = t.aspectRatio || b / y;
            const S = y;
            const P = S * R;
            const O = typeof t.scaleToFit > "u" || t.scaleToFit;
            const x = t.center ? t.center.x : 0.5;
            const z = t.center ? t.center.y : 0.5;
            const v = ll(
                { width: y, height: b },
                ol({ width: S, height: P }, R),
                t.rotation,
                O ? { x, y: z } : { x: 0.5, y: 0.5 },
            );
            const F = t.zoom * v;
            const w = t.rotation * (180 / Math.PI);
            const L = { x: S * 0.5, y: P * 0.5 };
            const C = { x: L.x - y * x, y: L.y - b * z };
            const D = [
                `rotate(${w} ${L.x} ${L.y})`,
                `translate(${L.x} ${L.y})`,
                `scale(${F})`,
                `translate(${-L.x} ${-L.y})`,
                `translate(${C.x} ${C.y})`,
            ];
            const V = t.flip && t.flip.horizontal;
            const B = t.flip && t.flip.vertical;
            const j = [
                `scale(${V ? -1 : 1} ${B ? -1 : 1})`,
                `translate(${V ? -y : 0} ${B ? -b : 0})`,
            ];
            const $ = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${S}${I}" height="${P}${E}" 
viewBox="0 0 ${S} ${P}" ${r ? 'style="background:' + r + '" ' : ""}
preserveAspectRatio="xMinYMin"
xmlns:xlink="http://www.w3.org/1999/xlink"
xmlns="http://www.w3.org/2000/svg">
<!-- Generated by PQINA - https://pqina.nl/ -->
<title>${d ? d.textContent : ""}</title>
<g transform="${D.join(" ")}">
<g transform="${j.join(" ")}">
${u.outerHTML}${A}
</g>
</g>
</svg>`;
            n($);
        }),
            l.readAsText(e);
    });
const Lm = (e) => {
    let t;
    try {
        t = new ImageData(e.width, e.height);
    } catch {
        t = document
            .createElement("canvas")
            .getContext("2d")
            .createImageData(e.width, e.height);
    }
    return t.data.set(e.data), t;
};
const Mm = () => {
    const e = { resize: c, filter: u };
    const t = (d, h) => (
        d.forEach((m) => {
            h = e[m.type](h, m.data);
        }),
        h
    );
    const i = (d, h) => {
        let m = d.transforms;
        let p = null;
        if (
            (m.forEach((f) => {
                f.type === "filter" && (p = f);
            }),
            p)
        ) {
            let f = null;
            m.forEach((g) => {
                g.type === "resize" && (f = g);
            }),
                f &&
                    ((f.data.matrix = p.data),
                    (m = m.filter((g) => g.type !== "filter")));
        }
        h(t(m, d.imageData));
    };
    self.onmessage = (d) => {
        i(d.data.message, (h) => {
            self.postMessage({ id: d.data.id, message: h }, [h.data.buffer]);
        });
    };
    const a = 1;
    const n = 1;
    const r = 1;
    function l(d, h, m) {
        const p = h[d] / 255;
        const f = h[d + 1] / 255;
        const g = h[d + 2] / 255;
        const I = h[d + 3] / 255;
        const E = p * m[0] + f * m[1] + g * m[2] + I * m[3] + m[4];
        const T = p * m[5] + f * m[6] + g * m[7] + I * m[8] + m[9];
        const _ = p * m[10] + f * m[11] + g * m[12] + I * m[13] + m[14];
        const y = p * m[15] + f * m[16] + g * m[17] + I * m[18] + m[19];
        const b = Math.max(0, E * y) + a * (1 - y);
        const A = Math.max(0, T * y) + n * (1 - y);
        const R = Math.max(0, _ * y) + r * (1 - y);
        (h[d] = Math.max(0, Math.min(1, b)) * 255),
            (h[d + 1] = Math.max(0, Math.min(1, A)) * 255),
            (h[d + 2] = Math.max(0, Math.min(1, R)) * 255);
    }
    const o = self.JSON.stringify([
        1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0,
    ]);
    function s(d) {
        return self.JSON.stringify(d || []) === o;
    }
    function u(d, h) {
        if (!h || s(h)) return d;
        const m = d.data;
        const p = m.length;
        const f = h[0];
        const g = h[1];
        const I = h[2];
        const E = h[3];
        const T = h[4];
        const _ = h[5];
        const y = h[6];
        const b = h[7];
        const A = h[8];
        const R = h[9];
        const S = h[10];
        const P = h[11];
        const O = h[12];
        const x = h[13];
        const z = h[14];
        const v = h[15];
        const F = h[16];
        const w = h[17];
        const L = h[18];
        const C = h[19];
        let D = 0;
        let V = 0;
        let B = 0;
        let j = 0;
        let $ = 0;
        let X = 0;
        let ue = 0;
        let U = 0;
        let W = 0;
        let q = 0;
        let oe = 0;
        let J = 0;
        for (; D < p; D += 4) {
            (V = m[D] / 255),
                (B = m[D + 1] / 255),
                (j = m[D + 2] / 255),
                ($ = m[D + 3] / 255),
                (X = V * f + B * g + j * I + $ * E + T),
                (ue = V * _ + B * y + j * b + $ * A + R),
                (U = V * S + B * P + j * O + $ * x + z),
                (W = V * v + B * F + j * w + $ * L + C),
                (q = Math.max(0, X * W) + a * (1 - W)),
                (oe = Math.max(0, ue * W) + n * (1 - W)),
                (J = Math.max(0, U * W) + r * (1 - W)),
                (m[D] = Math.max(0, Math.min(1, q)) * 255),
                (m[D + 1] = Math.max(0, Math.min(1, oe)) * 255),
                (m[D + 2] = Math.max(0, Math.min(1, J)) * 255);
        }
        return d;
    }
    function c(d, h) {
        let {
            mode: m = "contain",
            upscale: p = !1,
            width: f,
            height: g,
            matrix: I,
        } = h;
        if (((I = !I || s(I) ? null : I), !f && !g)) return u(d, I);
        if ((f === null ? (f = g) : g === null && (g = f), m !== "force")) {
            const x = f / d.width;
            const z = g / d.height;
            let v = 1;
            if (
                (m === "cover"
                    ? (v = Math.max(x, z))
                    : m === "contain" && (v = Math.min(x, z)),
                v > 1 && p === !1)
            ) {
                return u(d, I);
            }
            (f = d.width * v), (g = d.height * v);
        }
        const E = d.width;
        const T = d.height;
        const _ = Math.round(f);
        const y = Math.round(g);
        const b = d.data;
        const A = new Uint8ClampedArray(_ * y * 4);
        const R = E / _;
        const S = T / y;
        const P = Math.ceil(R * 0.5);
        const O = Math.ceil(S * 0.5);
        for (let x = 0; x < y; x++) {
            for (let z = 0; z < _; z++) {
                const v = (z + x * _) * 4;
                let F = 0;
                let w = 0;
                let L = 0;
                let C = 0;
                let D = 0;
                let V = 0;
                let B = 0;
                const j = (x + 0.5) * S;
                for (let $ = Math.floor(x * S); $ < (x + 1) * S; $++) {
                    const X = Math.abs(j - ($ + 0.5)) / O;
                    const ue = (z + 0.5) * R;
                    const U = X * X;
                    for (let W = Math.floor(z * R); W < (z + 1) * R; W++) {
                        let q = Math.abs(ue - (W + 0.5)) / P;
                        const oe = Math.sqrt(U + q * q);
                        if (
                            oe >= -1 &&
                            oe <= 1 &&
                            ((F = 2 * oe * oe * oe - 3 * oe * oe + 1), F > 0)
                        ) {
                            q = 4 * (W + $ * E);
                            const J = b[q + 3];
                            (B += F * J),
                                (L += F),
                                J < 255 && (F = (F * J) / 250),
                                (C += F * b[q]),
                                (D += F * b[q + 1]),
                                (V += F * b[q + 2]),
                                (w += F);
                        }
                    }
                }
                (A[v] = C / w),
                    (A[v + 1] = D / w),
                    (A[v + 2] = V / w),
                    (A[v + 3] = B / L),
                    I && l(v, A, I);
            }
        }
        return { data: A, width: _, height: y };
    }
};
const xm = (e, t) => {
    if (e.getUint32(t + 4, !1) !== 1165519206) return;
    t += 4;
    const i = e.getUint16((t += 6), !1) === 18761;
    t += e.getUint32(t + 4, i);
    const a = e.getUint16(t, i);
    t += 2;
    for (let n = 0; n < a; n++) {
        if (e.getUint16(t + n * 12, i) === 274) {
            return e.setUint16(t + n * 12 + 8, 1, i), !0;
        }
    }
    return !1;
};
const Om = (e) => {
    const t = new DataView(e);
    if (t.getUint16(0) !== 65496) return null;
    let i = 2;
    let a;
    let n;
    let r = !1;
    for (
        ;
        i < t.byteLength &&
        ((a = t.getUint16(i, !1)),
        (n = t.getUint16(i + 2, !1) + 2),
        !(
            !((a >= 65504 && a <= 65519) || a === 65534) ||
            (r || (r = xm(t, i, n)), i + n > t.byteLength)
        ));

    ) {
        i += n;
    }
    return e.slice(0, i);
};
const Pm = (e) =>
    new Promise((t) => {
        const i = new FileReader();
        (i.onload = () => t(Om(i.result) || null)),
            i.readAsArrayBuffer(e.slice(0, 256 * 1024));
    });
const Dm = () =>
    (window.BlobBuilder =
        window.BlobBuilder ||
        window.WebKitBlobBuilder ||
        window.MozBlobBuilder ||
        window.MSBlobBuilder);
const Fm = (e, t) => {
    const i = Dm();
    if (i) {
        const a = new i();
        return a.append(e), a.getBlob(t);
    }
    return new Blob([e], { type: t });
};
const Cm = () => Math.random().toString(36).substr(2, 9);
const zm = (e) => {
    const t = new Blob(["(", e.toString(), ")()"], {
        type: "application/javascript",
    });
    const i = URL.createObjectURL(t);
    const a = new Worker(i);
    const n = [];
    return {
        transfer: () => {},
        post: (r, l, o) => {
            const s = Cm();
            (n[s] = l),
                (a.onmessage = (u) => {
                    const c = n[u.data.id];
                    c && (c(u.data.message), delete n[u.data.id]);
                }),
                a.postMessage({ id: s, message: r }, o);
        },
        terminate: () => {
            a.terminate(), URL.revokeObjectURL(i);
        },
    };
};
const Nm = (e) =>
    new Promise((t, i) => {
        const a = new Image();
        (a.onload = () => {
            t(a);
        }),
            (a.onerror = (n) => {
                i(n);
            }),
            (a.src = e);
    });
const Bm = (e) =>
    e.reduce(
        (t, i) => t.then((a) => i().then(Array.prototype.concat.bind(a))),
        Promise.resolve([]),
    );
const Vm = (e, t) =>
    new Promise((i) => {
        const a = { width: e.width, height: e.height };
        const n = e.getContext("2d");
        const r = t.sort(dl).map(
            (l) => () =>
                new Promise((o) => {
                    qm[l[0]](n, a, l[1], o) && o();
                }),
        );
        Bm(r).then(() => i(e));
    });
const yt = (e, t) => {
    e.beginPath(),
        (e.lineCap = t["stroke-linecap"]),
        (e.lineJoin = t["stroke-linejoin"]),
        (e.lineWidth = t["stroke-width"]),
        t["stroke-dasharray"].length &&
            e.setLineDash(t["stroke-dasharray"].split(",")),
        (e.fillStyle = t.fill),
        (e.strokeStyle = t.stroke),
        (e.globalAlpha = t.opacity || 1);
};
const St = (e) => {
    e.fill(), e.stroke(), (e.globalAlpha = 1);
};
const Gm = (e, t, i) => {
    const a = Rt(i, t);
    const n = ot(i, t);
    return yt(e, n), e.rect(a.x, a.y, a.width, a.height), St(e, n), !0;
};
const Um = (e, t, i) => {
    const a = Rt(i, t);
    const n = ot(i, t);
    yt(e, n);
    const r = a.x;
    const l = a.y;
    const o = a.width;
    const s = a.height;
    const u = 0.5522848;
    const c = (o / 2) * u;
    const d = (s / 2) * u;
    const h = r + o;
    const m = l + s;
    const p = r + o / 2;
    const f = l + s / 2;
    return (
        e.moveTo(r, f),
        e.bezierCurveTo(r, f - d, p - c, l, p, l),
        e.bezierCurveTo(p + c, l, h, f - d, h, f),
        e.bezierCurveTo(h, f + d, p + c, m, p, m),
        e.bezierCurveTo(p - c, m, r, f + d, r, f),
        St(e, n),
        !0
    );
};
const km = (e, t, i, a) => {
    const n = Rt(i, t);
    const r = ot(i, t);
    yt(e, r);
    const l = new Image();
    new URL(i.src, window.location.href).origin !== window.location.origin &&
        (l.crossOrigin = ""),
        (l.onload = () => {
            if (i.fit === "cover") {
                const s = n.width / n.height;
                const u = s > 1 ? l.width : l.height * s;
                const c = s > 1 ? l.width / s : l.height;
                const d = l.width * 0.5 - u * 0.5;
                const h = l.height * 0.5 - c * 0.5;
                e.drawImage(l, d, h, u, c, n.x, n.y, n.width, n.height);
            } else if (i.fit === "contain") {
                const s = Math.min(n.width / l.width, n.height / l.height);
                const u = s * l.width;
                const c = s * l.height;
                const d = n.x + n.width * 0.5 - u * 0.5;
                const h = n.y + n.height * 0.5 - c * 0.5;
                e.drawImage(l, 0, 0, l.width, l.height, d, h, u, c);
            } else {
                e.drawImage(
                    l,
                    0,
                    0,
                    l.width,
                    l.height,
                    n.x,
                    n.y,
                    n.width,
                    n.height,
                );
            }
            St(e, r), a();
        }),
        (l.src = i.src);
};
const Hm = (e, t, i) => {
    const a = Rt(i, t);
    const n = ot(i, t);
    yt(e, n);
    const r = he(i.fontSize, t);
    const l = i.fontFamily || "sans-serif";
    const o = i.fontWeight || "normal";
    const s = i.textAlign || "left";
    return (
        (e.font = `${o} ${r}px ${l}`),
        (e.textAlign = s),
        e.fillText(i.text, a.x, a.y),
        St(e, n),
        !0
    );
};
const Wm = (e, t, i) => {
    const a = ot(i, t);
    yt(e, a), e.beginPath();
    const n = i.points.map((l) => ({
        x: he(l.x, t, 1, "width"),
        y: he(l.y, t, 1, "height"),
    }));
    e.moveTo(n[0].x, n[0].y);
    const r = n.length;
    for (let l = 1; l < r; l++) e.lineTo(n[l].x, n[l].y);
    return St(e, a), !0;
};
const Ym = (e, t, i) => {
    const a = Rt(i, t);
    const n = ot(i, t);
    yt(e, n), e.beginPath();
    const r = { x: a.x, y: a.y };
    const l = { x: a.x + a.width, y: a.y + a.height };
    e.moveTo(r.x, r.y), e.lineTo(l.x, l.y);
    const o = cl({ x: l.x - r.x, y: l.y - r.y });
    const s = 0.04 * Math.min(t.width, t.height);
    if (i.lineDecoration.indexOf("arrow-begin") !== -1) {
        const u = bi(o, s);
        const c = Ii(r, u);
        const d = qe(r, 2, c);
        const h = qe(r, -2, c);
        e.moveTo(d.x, d.y), e.lineTo(r.x, r.y), e.lineTo(h.x, h.y);
    }
    if (i.lineDecoration.indexOf("arrow-end") !== -1) {
        const u = bi(o, -s);
        const c = Ii(l, u);
        const d = qe(l, 2, c);
        const h = qe(l, -2, c);
        e.moveTo(d.x, d.y), e.lineTo(l.x, l.y), e.lineTo(h.x, h.y);
    }
    return St(e, n), !0;
};
var qm = { rect: Gm, ellipse: Um, image: km, text: Hm, line: Ym, path: Wm };
const $m = (e) => {
    const t = document.createElement("canvas");
    return (
        (t.width = e.width),
        (t.height = e.height),
        t.getContext("2d").putImageData(e, 0, 0),
        t
    );
};
const jm = (e, t, i = {}) =>
    new Promise((a, n) => {
        if (!e || !tm(e)) return n({ status: "not an image file", file: e });
        const {
            stripImageHead: r,
            beforeCreateBlob: l,
            afterCreateBlob: o,
            canvasMemoryLimit: s,
        } = i;
        const { crop: u, size: c, filter: d, markup: h, output: m } = t;
        const p =
            t.image && t.image.orientation
                ? Math.max(1, Math.min(8, t.image.orientation))
                : null;
        const f = m && m.quality;
        const g = f === null ? null : f / 100;
        const I = (m && m.type) || null;
        const E = (m && m.background) || null;
        const T = [];
        c &&
            (typeof c.width === "number" || typeof c.height === "number") &&
            T.push({ type: "resize", data: c }),
            d && d.length === 20 && T.push({ type: "filter", data: d });
        const _ = (A) => {
            const R = o ? o(A) : A;
            Promise.resolve(R).then(a);
        };
        const y = (A, R) => {
            const S = $m(A);
            const P = h.length ? Vm(S, h) : S;
            Promise.resolve(P).then((O) => {
                dm(O, R, l)
                    .then((x) => {
                        if ((sl(O), r)) return _(x);
                        Pm(e).then((z) => {
                            z !== null &&
                                (x = new Blob([z, x.slice(20)], {
                                    type: x.type,
                                })),
                                _(x);
                        });
                    })
                    .catch(n);
            });
        };
        if (/svg/.test(e.type) && I === null) {
            return Am(e, u, h, { background: E }).then((A) => {
                a(Fm(A, "image/svg+xml"));
            });
        }
        const b = URL.createObjectURL(e);
        Nm(b)
            .then((A) => {
                URL.revokeObjectURL(b);
                const R = sm(A, p, u, { canvasMemoryLimit: s, background: E });
                const S = { quality: g, type: I || e.type };
                if (!T.length) return y(R, S);
                const P = zm(Mm);
                P.post(
                    { transforms: T, imageData: R },
                    (O) => {
                        y(Lm(O), S), P.terminate();
                    },
                    [R.data.buffer],
                );
            })
            .catch(n);
    });
const Xm = ["x", "y", "left", "top", "right", "bottom", "width", "height"];
const Qm = (e) =>
    typeof e === "string" && /%/.test(e) ? parseFloat(e) / 100 : e;
const Km = (e) => {
    const [t, i] = e;
    const a = i.points ? {} : Xm.reduce((n, r) => ((n[r] = Qm(i[r])), n), {});
    return [t, { zIndex: 0, ...i, ...a }];
};
const Zm = (e) =>
    new Promise((t, i) => {
        const a = new Image();
        a.src = URL.createObjectURL(e);
        const n = () => {
            const l = a.naturalWidth;
            const o = a.naturalHeight;
            l &&
                o &&
                (URL.revokeObjectURL(a.src),
                clearInterval(r),
                t({ width: l, height: o }));
        };
        a.onerror = (l) => {
            URL.revokeObjectURL(a.src), clearInterval(r), i(l);
        };
        const r = setInterval(n, 1);
        n();
    });
typeof window < "u" &&
    typeof window.document < "u" &&
    (HTMLCanvasElement.prototype.toBlob ||
        Object.defineProperty(HTMLCanvasElement.prototype, "toBlob", {
            value: function (e, t, i) {
                const a = this;
                setTimeout(() => {
                    const n = a.toDataURL(t, i).split(",")[1];
                    const r = atob(n);
                    let l = r.length;
                    const o = new Uint8Array(l);
                    for (; l--; ) o[l] = r.charCodeAt(l);
                    e(new Blob([o], { type: t || "image/png" }));
                });
            },
        }));
const Ra = typeof window < "u" && typeof window.document < "u";
const Jm =
    Ra && /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
const ul = ({ addFilter: e, utils: t }) => {
    const { Type: i, forin: a, getFileFromBlob: n, isFile: r } = t;
    const l = ["crop", "resize", "filter", "markup", "output"];
    const o = (c) => (d, h, m) => d(h, c ? c(m) : m);
    const s = (c) =>
        c.aspectRatio === null &&
        c.rotation === 0 &&
        c.zoom === 1 &&
        c.center &&
        c.center.x === 0.5 &&
        c.center.y === 0.5 &&
        c.flip &&
        c.flip.horizontal === !1 &&
        c.flip.vertical === !1;
    e(
        "SHOULD_PREPARE_OUTPUT",
        (c, { query: d }) =>
            new Promise((h) => {
                h(!d("IS_ASYNC"));
            }),
    );
    const u = (c, d, h) =>
        new Promise((m) => {
            if (
                !c("GET_ALLOW_IMAGE_TRANSFORM") ||
                h.archived ||
                !r(d) ||
                !Qh(d)
            ) {
                return m(!1);
            }
            Zm(d)
                .then(() => {
                    const p = c("GET_IMAGE_TRANSFORM_IMAGE_FILTER");
                    if (p) {
                        const f = p(d);
                        if (f == null) return handleRevert(!0);
                        if (typeof f === "boolean") return m(f);
                        if (typeof f.then === "function") return f.then(m);
                    }
                    m(!0);
                })
                .catch((p) => {
                    m(!1);
                });
        });
    return (
        e("DID_CREATE_ITEM", (c, { query: d, dispatch: h }) => {
            d("GET_ALLOW_IMAGE_TRANSFORM") &&
                c.extend(
                    "requestPrepare",
                    () =>
                        new Promise((m, p) => {
                            h(
                                "REQUEST_PREPARE_OUTPUT",
                                {
                                    query: c.id,
                                    item: c,
                                    success: m,
                                    failure: p,
                                },
                                !0,
                            );
                        }),
                );
        }),
        e(
            "PREPARE_OUTPUT",
            (c, { query: d, item: h }) =>
                new Promise((m) => {
                    u(d, c, h).then((p) => {
                        if (!p) return m(c);
                        const f = [];
                        d("GET_IMAGE_TRANSFORM_VARIANTS_INCLUDE_ORIGINAL") &&
                            f.push(
                                () =>
                                    new Promise((R) => {
                                        R({
                                            name: d(
                                                "GET_IMAGE_TRANSFORM_VARIANTS_ORIGINAL_NAME",
                                            ),
                                            file: c,
                                        });
                                    }),
                            ),
                            d("GET_IMAGE_TRANSFORM_VARIANTS_INCLUDE_DEFAULT") &&
                                f.push(
                                    (R, S, P) =>
                                        new Promise((O) => {
                                            R(S, P).then((x) =>
                                                O({
                                                    name: d(
                                                        "GET_IMAGE_TRANSFORM_VARIANTS_DEFAULT_NAME",
                                                    ),
                                                    file: x,
                                                }),
                                            );
                                        }),
                                );
                        const g = d("GET_IMAGE_TRANSFORM_VARIANTS") || {};
                        a(g, (R, S) => {
                            const P = o(S);
                            f.push(
                                (O, x, z) =>
                                    new Promise((v) => {
                                        P(O, x, z).then((F) =>
                                            v({ name: R, file: F }),
                                        );
                                    }),
                            );
                        });
                        const I = d("GET_IMAGE_TRANSFORM_OUTPUT_QUALITY");
                        const E = d("GET_IMAGE_TRANSFORM_OUTPUT_QUALITY_MODE");
                        const T = I === null ? null : I / 100;
                        const _ = d("GET_IMAGE_TRANSFORM_OUTPUT_MIME_TYPE");
                        const y =
                            d("GET_IMAGE_TRANSFORM_CLIENT_TRANSFORMS") || l;
                        h.setMetadata(
                            "output",
                            { type: _, quality: T, client: y },
                            !0,
                        );
                        const b = (R, S) =>
                            new Promise((P, O) => {
                                const x = { ...S };
                                Object.keys(x)
                                    .filter((B) => B !== "exif")
                                    .forEach((B) => {
                                        y.indexOf(B) === -1 && delete x[B];
                                    });
                                const {
                                    resize: z,
                                    exif: v,
                                    output: F,
                                    crop: w,
                                    filter: L,
                                    markup: C,
                                } = x;
                                const D = {
                                    image: {
                                        orientation: v ? v.orientation : null,
                                    },
                                    output:
                                        F &&
                                        (F.type ||
                                            typeof F.quality === "number" ||
                                            F.background)
                                            ? {
                                                  type: F.type,
                                                  quality:
                                                      typeof F.quality ===
                                                      "number"
                                                          ? F.quality * 100
                                                          : null,
                                                  background:
                                                      F.background ||
                                                      d(
                                                          "GET_IMAGE_TRANSFORM_CANVAS_BACKGROUND_COLOR",
                                                      ) ||
                                                      null,
                                              }
                                            : void 0,
                                    size:
                                        z && (z.size.width || z.size.height)
                                            ? {
                                                  mode: z.mode,
                                                  upscale: z.upscale,
                                                  ...z.size,
                                              }
                                            : void 0,
                                    crop: w && !s(w) ? { ...w } : void 0,
                                    markup: C && C.length ? C.map(Km) : [],
                                    filter: L,
                                };
                                if (D.output) {
                                    const B = F.type ? F.type !== R.type : !1;
                                    const j = /\/jpe?g$/.test(R.type);
                                    const $ =
                                        F.quality !== null
                                            ? j && E === "always"
                                            : !1;
                                    if (
                                        !(
                                            D.size ||
                                            D.crop ||
                                            D.filter ||
                                            B ||
                                            $
                                        )
                                    ) {
                                        return P(R);
                                    }
                                }
                                const V = {
                                    beforeCreateBlob: d(
                                        "GET_IMAGE_TRANSFORM_BEFORE_CREATE_BLOB",
                                    ),
                                    afterCreateBlob: d(
                                        "GET_IMAGE_TRANSFORM_AFTER_CREATE_BLOB",
                                    ),
                                    canvasMemoryLimit: d(
                                        "GET_IMAGE_TRANSFORM_CANVAS_MEMORY_LIMIT",
                                    ),
                                    stripImageHead: d(
                                        "GET_IMAGE_TRANSFORM_OUTPUT_STRIP_IMAGE_HEAD",
                                    ),
                                };
                                jm(R, D, V)
                                    .then((B) => {
                                        const j = n(B, Jh(R.name, em(B.type)));
                                        P(j);
                                    })
                                    .catch(O);
                            });
                        const A = f.map((R) => R(b, c, h.getMetadata()));
                        Promise.all(A).then((R) => {
                            m(
                                R.length === 1 && R[0].name === null
                                    ? R[0].file
                                    : R,
                            );
                        });
                    });
                }),
        ),
        {
            options: {
                allowImageTransform: [!0, i.BOOLEAN],
                imageTransformImageFilter: [null, i.FUNCTION],
                imageTransformOutputMimeType: [null, i.STRING],
                imageTransformOutputQuality: [null, i.INT],
                imageTransformOutputStripImageHead: [!0, i.BOOLEAN],
                imageTransformClientTransforms: [null, i.ARRAY],
                imageTransformOutputQualityMode: ["always", i.STRING],
                imageTransformVariants: [null, i.OBJECT],
                imageTransformVariantsIncludeDefault: [!0, i.BOOLEAN],
                imageTransformVariantsDefaultName: [null, i.STRING],
                imageTransformVariantsIncludeOriginal: [!1, i.BOOLEAN],
                imageTransformVariantsOriginalName: ["original_", i.STRING],
                imageTransformBeforeCreateBlob: [null, i.FUNCTION],
                imageTransformAfterCreateBlob: [null, i.FUNCTION],
                imageTransformCanvasMemoryLimit: [
                    Ra && Jm ? 4096 * 4096 : null,
                    i.INT,
                ],
                imageTransformCanvasBackgroundColor: [null, i.STRING],
            },
        }
    );
};
Ra &&
    document.dispatchEvent(
        new CustomEvent("FilePond:pluginloaded", { detail: ul }),
    );
const hl = ul;
const ya = (e) => /^video/.test(e.type);
const Wt = (e) => /^audio/.test(e.type);
const Sa = class {
    constructor(t, i) {
        (this.mediaEl = t),
            (this.audioElems = i),
            (this.onplayhead = !1),
            (this.duration = 0),
            (this.timelineWidth =
                this.audioElems.timeline.offsetWidth -
                this.audioElems.playhead.offsetWidth),
            (this.moveplayheadFn = this.moveplayhead.bind(this)),
            this.registerListeners();
    }

    registerListeners() {
        this.mediaEl.addEventListener(
            "timeupdate",
            this.timeUpdate.bind(this),
            !1,
        ),
            this.mediaEl.addEventListener(
                "canplaythrough",
                () => (this.duration = this.mediaEl.duration),
                !1,
            ),
            this.audioElems.timeline.addEventListener(
                "click",
                this.timelineClicked.bind(this),
                !1,
            ),
            this.audioElems.button.addEventListener(
                "click",
                this.play.bind(this),
            ),
            this.audioElems.playhead.addEventListener(
                "mousedown",
                this.mouseDown.bind(this),
                !1,
            ),
            window.addEventListener("mouseup", this.mouseUp.bind(this), !1);
    }

    play() {
        this.mediaEl.paused ? this.mediaEl.play() : this.mediaEl.pause(),
            this.audioElems.button.classList.toggle("play"),
            this.audioElems.button.classList.toggle("pause");
    }

    timeUpdate() {
        const t = (this.mediaEl.currentTime / this.duration) * 100;
        (this.audioElems.playhead.style.marginLeft = t + "%"),
            this.mediaEl.currentTime === this.duration &&
                (this.audioElems.button.classList.toggle("play"),
                this.audioElems.button.classList.toggle("pause"));
    }

    moveplayhead(t) {
        const i = t.clientX - this.getPosition(this.audioElems.timeline);
        i >= 0 &&
            i <= this.timelineWidth &&
            (this.audioElems.playhead.style.marginLeft = i + "px"),
            i < 0 && (this.audioElems.playhead.style.marginLeft = "0px"),
            i > this.timelineWidth &&
                (this.audioElems.playhead.style.marginLeft =
                    this.timelineWidth - 4 + "px");
    }

    timelineClicked(t) {
        this.moveplayhead(t),
            (this.mediaEl.currentTime = this.duration * this.clickPercent(t));
    }

    mouseDown() {
        (this.onplayhead = !0),
            window.addEventListener("mousemove", this.moveplayheadFn, !0),
            this.mediaEl.removeEventListener(
                "timeupdate",
                this.timeUpdate.bind(this),
                !1,
            );
    }

    mouseUp(t) {
        window.removeEventListener("mousemove", this.moveplayheadFn, !0),
            this.onplayhead == !0 &&
                (this.moveplayhead(t),
                (this.mediaEl.currentTime =
                    this.duration * this.clickPercent(t)),
                this.mediaEl.addEventListener(
                    "timeupdate",
                    this.timeUpdate.bind(this),
                    !1,
                )),
            (this.onplayhead = !1);
    }

    clickPercent(t) {
        return (
            (t.clientX - this.getPosition(this.audioElems.timeline)) /
            this.timelineWidth
        );
    }

    getPosition(t) {
        return t.getBoundingClientRect().left;
    }
};
const ep = (e) =>
    e.utils.createView({
        name: "media-preview",
        tag: "div",
        ignoreRect: !0,
        create: ({ root: t, props: i }) => {
            const { id: a } = i;
            const n = t.query("GET_ITEM", { id: i.id });
            const r = Wt(n.file) ? "audio" : "video";
            if (
                ((t.ref.media = document.createElement(r)),
                t.ref.media.setAttribute("controls", !0),
                t.element.appendChild(t.ref.media),
                Wt(n.file))
            ) {
                const l = document.createDocumentFragment();
                (t.ref.audio = []),
                    (t.ref.audio.container = document.createElement("div")),
                    (t.ref.audio.button = document.createElement("span")),
                    (t.ref.audio.timeline = document.createElement("div")),
                    (t.ref.audio.playhead = document.createElement("div")),
                    (t.ref.audio.container.className = "audioplayer"),
                    (t.ref.audio.button.className = "playpausebtn play"),
                    (t.ref.audio.timeline.className = "timeline"),
                    (t.ref.audio.playhead.className = "playhead"),
                    t.ref.audio.timeline.appendChild(t.ref.audio.playhead),
                    t.ref.audio.container.appendChild(t.ref.audio.button),
                    t.ref.audio.container.appendChild(t.ref.audio.timeline),
                    l.appendChild(t.ref.audio.container),
                    t.element.appendChild(l);
            }
        },
        write: e.utils.createRoute({
            DID_MEDIA_PREVIEW_LOAD: ({ root: t, props: i }) => {
                const { id: a } = i;
                const n = t.query("GET_ITEM", { id: i.id });
                if (!n) return;
                const r = window.URL || window.webkitURL;
                const l = new Blob([n.file], { type: n.file.type });
                (t.ref.media.type = n.file.type),
                    (t.ref.media.src =
                        (n.file.mock && n.file.url) || r.createObjectURL(l)),
                    Wt(n.file) && new Sa(t.ref.media, t.ref.audio),
                    t.ref.media.addEventListener(
                        "loadeddata",
                        () => {
                            let o = 75;
                            if (ya(n.file)) {
                                const s = t.ref.media.offsetWidth;
                                const u = t.ref.media.videoWidth / s;
                                o = t.ref.media.videoHeight / u;
                            }
                            t.dispatch("DID_UPDATE_PANEL_HEIGHT", {
                                id: i.id,
                                height: o,
                            });
                        },
                        !1,
                    );
            },
        }),
    });
const tp = (e) => {
    const t = ({ root: a, props: n }) => {
        const { id: r } = n;
        a.query("GET_ITEM", r) &&
            a.dispatch("DID_MEDIA_PREVIEW_LOAD", { id: r });
    };
    const i = ({ root: a, props: n }) => {
        const r = ep(e);
        a.ref.media = a.appendChildView(a.createChildView(r, { id: n.id }));
    };
    return e.utils.createView({
        name: "media-preview-wrapper",
        create: i,
        write: e.utils.createRoute({ DID_MEDIA_PREVIEW_CONTAINER_CREATE: t }),
    });
};
const ml = (e) => {
    const { addFilter: t, utils: i } = e;
    const { Type: a, createRoute: n } = i;
    const r = tp(e);
    return (
        t("CREATE_VIEW", (l) => {
            const { is: o, view: s, query: u } = l;
            if (!o("file")) return;
            const c = ({ root: d, props: h }) => {
                const { id: m } = h;
                const p = u("GET_ITEM", m);
                !p ||
                    p.archived ||
                    (!ya(p.file) && !Wt(p.file)) ||
                    ((d.ref.mediaPreview = s.appendChildView(
                        s.createChildView(r, { id: m }),
                    )),
                    d.dispatch("DID_MEDIA_PREVIEW_CONTAINER_CREATE", {
                        id: m,
                    }));
            };
            s.registerWriter(
                n({ DID_LOAD_ITEM: c }, ({ root: d, props: h }) => {
                    const { id: m } = h;
                    const p = u("GET_ITEM", m);
                    !p || (!ya(p.file) && !Wt(p.file)) || d.rect.element.hidden;
                }),
            );
        }),
        {
            options: {
                allowVideoPreview: [!0, a.BOOLEAN],
                allowAudioPreview: [!0, a.BOOLEAN],
            },
        }
    );
};
const ip = typeof window < "u" && typeof window.document < "u";
ip &&
    document.dispatchEvent(
        new CustomEvent("FilePond:pluginloaded", { detail: ml }),
    );
const pl = ml;
function fl({ addFilter: e, utils: t }) {
    const { Type: i, createRoute: a, createView: n } = t;
    return (
        e("CREATE_VIEW", function (r) {
            const { is: l, view: o, query: s } = r;
            if (!s("GET_ADD_IMAGE_CAPTION") || !l("file")) return;
            function u({ root: c, props: { id: d } }) {
                const h = s("GET_ITEM", d);
                if (!h || h.archived) return;
                const m = h.getMetadata("caption");
                const p = h.getMetadata("uuid");
                const f = h.status === ke.LOAD_ERROR;
                (c.ref.imagePreview = o.appendChildView(
                    o.createChildView(n(ap(m, f, p)), { id: d }),
                )),
                    o.element
                        .querySelectorAll("button")
                        .forEach((g) => g.setAttribute("tabindex", -1));
            }
            o.registerWriter(a({ DID_INIT_ITEM: u }));
        }),
        {
            options: {
                addImageCaption: [!0, i.BOOLEAN],
                imageCaptionPlaceholder: [null, i.STRING],
                imageCaptionMaxLength: [null, i.INT],
            },
        }
    );
}
function ap(e, t, i, a) {
    return {
        name: "image-caption-input",
        tag: "input",
        ignoreRect: !0,
        create: function ({ root: r }) {
            const l = r.query("GET_IMAGE_CAPTION_PLACEHOLDER");
            l && r.element.setAttribute("placeholder", l);
            const o = r.query("GET_IMAGE_CAPTION_MAX_LENGTH");
            o && r.element.setAttribute("maxlength", o),
                r.element.setAttribute("autocomplete", "off"),
                t && r.element.classList.add("image-caption-input-invalid"),
                r.element.addEventListener("keydown", function (s) {
                    s.key === "Enter" && s.preventDefault();
                }),
                i &&
                    r.element.setAttribute(
                        "wire:model.defer",
                        `data.captions.${i}.caption`,
                    ),
                i || r.element.setAttribute("disabled", "disabled"),
                e && (r.element.value = e);
        },
    };
}
const gl = ({ addFilter: e, utils: t }) => {
    const { Type: i } = t;
    return (
        e("SET_ATTRIBUTE_TO_OPTION_MAP", (a) =>
            Object.assign(a, {
                "^fileMetadata": { group: "fileMetadataObject" },
            }),
        ),
        e(
            "DID_LOAD_ITEM",
            (a, { query: n }) =>
                new Promise((r) => {
                    if (!n("GET_ALLOW_FILE_METADATA")) return r(a);
                    const l = n("GET_FILE_METADATA_OBJECT");
                    typeof l === "object" &&
                        l !== null &&
                        Object.keys(l).forEach((o) => {
                            a.setMetadata(o, l[o], !0);
                        }),
                        r(a);
                }),
        ),
        {
            options: {
                allowFileMetadata: [!0, i.BOOLEAN],
                fileMetadataObject: [null, i.OBJECT],
            },
        }
    );
};
const np = typeof window < "u" && typeof window.document < "u";
np &&
    document.dispatchEvent(
        new CustomEvent("FilePond:pluginloaded", { detail: gl }),
    );
const El = gl;
const Tl = {
    labelIdle:
        '\u0627\u0633\u062D\u0628 \u0648 \u0627\u062F\u0631\u062C \u0645\u0644\u0641\u0627\u062A\u0643 \u0623\u0648 <span class="filepond--label-action"> \u062A\u0635\u0641\u062D </span>',
    labelInvalidField:
        "\u0627\u0644\u062D\u0642\u0644 \u064A\u062D\u062A\u0648\u064A \u0639\u0644\u0649 \u0645\u0644\u0641\u0627\u062A \u063A\u064A\u0631 \u0635\u0627\u0644\u062D\u0629",
    labelFileWaitingForSize:
        "\u0628\u0627\u0646\u062A\u0638\u0627\u0631 \u0627\u0644\u062D\u062C\u0645",
    labelFileSizeNotAvailable:
        "\u0627\u0644\u062D\u062C\u0645 \u063A\u064A\u0631 \u0645\u062A\u0627\u062D",
    labelFileLoading: "\u0628\u0627\u0644\u0625\u0646\u062A\u0638\u0627\u0631",
    labelFileLoadError:
        "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u062A\u062D\u0645\u064A\u0644",
    labelFileProcessing: "\u064A\u062A\u0645 \u0627\u0644\u0631\u0641\u0639",
    labelFileProcessingComplete: "\u062A\u0645 \u0627\u0644\u0631\u0641\u0639",
    labelFileProcessingAborted:
        "\u062A\u0645 \u0625\u0644\u063A\u0627\u0621 \u0627\u0644\u0631\u0641\u0639",
    labelFileProcessingError:
        "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u0631\u0641\u0639",
    labelFileProcessingRevertError:
        "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u062A\u0631\u0627\u062C\u0639",
    labelFileRemoveError:
        "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u062D\u0630\u0641",
    labelTapToCancel:
        "\u0627\u0646\u0642\u0631 \u0644\u0644\u0625\u0644\u063A\u0627\u0621",
    labelTapToRetry:
        "\u0627\u0646\u0642\u0631 \u0644\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629",
    labelTapToUndo:
        "\u0627\u0646\u0642\u0631 \u0644\u0644\u062A\u0631\u0627\u062C\u0639",
    labelButtonRemoveItem: "\u0645\u0633\u062D",
    labelButtonAbortItemLoad: "\u0625\u0644\u063A\u0627\u0621",
    labelButtonRetryItemLoad: "\u0625\u0639\u0627\u062F\u0629",
    labelButtonAbortItemProcessing: "\u0625\u0644\u063A\u0627\u0621",
    labelButtonUndoItemProcessing: "\u062A\u0631\u0627\u062C\u0639",
    labelButtonRetryItemProcessing: "\u0625\u0639\u0627\u062F\u0629",
    labelButtonProcessItem: "\u0631\u0641\u0639",
    labelMaxFileSizeExceeded:
        "\u0627\u0644\u0645\u0644\u0641 \u0643\u0628\u064A\u0631 \u062C\u062F\u0627",
    labelMaxFileSize:
        "\u062D\u062C\u0645 \u0627\u0644\u0645\u0644\u0641 \u0627\u0644\u0623\u0642\u0635\u0649: {filesize}",
    labelMaxTotalFileSizeExceeded:
        "\u062A\u0645 \u062A\u062C\u0627\u0648\u0632 \u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649 \u0644\u0644\u062D\u062C\u0645 \u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A",
    labelMaxTotalFileSize:
        "\u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649 \u0644\u062D\u062C\u0645 \u0627\u0644\u0645\u0644\u0641: {filesize}",
    labelFileTypeNotAllowed:
        "\u0645\u0644\u0641 \u0645\u0646 \u0646\u0648\u0639 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D",
    fileValidateTypeLabelExpectedTypes:
        "\u062A\u062A\u0648\u0642\u0639 {allButLastType} \u0645\u0646 {lastType}",
    imageValidateSizeLabelFormatError:
        "\u0646\u0648\u0639 \u0627\u0644\u0635\u0648\u0631\u0629 \u063A\u064A\u0631 \u0645\u062F\u0639\u0648\u0645",
    imageValidateSizeLabelImageSizeTooSmall:
        "\u0627\u0644\u0635\u0648\u0631\u0629 \u0635\u063A\u064A\u0631 \u062C\u062F\u0627",
    imageValidateSizeLabelImageSizeTooBig:
        "\u0627\u0644\u0635\u0648\u0631\u0629 \u0643\u0628\u064A\u0631\u0629 \u062C\u062F\u0627",
    imageValidateSizeLabelExpectedMinSize:
        "\u0627\u0644\u062D\u062F \u0627\u0644\u0623\u062F\u0646\u0649 \u0644\u0644\u0623\u0628\u0639\u0627\u062F \u0647\u0648: {minWidth} \xD7 {minHeight}",
    imageValidateSizeLabelExpectedMaxSize:
        "\u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649 \u0644\u0644\u0623\u0628\u0639\u0627\u062F \u0647\u0648: {maxWidth} \xD7 {maxHeight}",
    imageValidateSizeLabelImageResolutionTooLow:
        "\u0627\u0644\u062F\u0642\u0629 \u0636\u0639\u064A\u0641\u0629 \u062C\u062F\u0627",
    imageValidateSizeLabelImageResolutionTooHigh:
        "\u0627\u0644\u062F\u0642\u0629 \u0645\u0631\u062A\u0641\u0639\u0629 \u062C\u062F\u0627",
    imageValidateSizeLabelExpectedMinResolution:
        "\u0623\u0642\u0644 \u062F\u0642\u0629: {minResolution}",
    imageValidateSizeLabelExpectedMaxResolution:
        "\u0623\u0642\u0635\u0649 \u062F\u0642\u0629: {maxResolution}",
};
const bl = {
    labelIdle:
        'Arrossega i deixa els teus fitxers o <span class="filepond--label-action"> Navega </span>',
    labelInvalidField: "El camp cont\xE9 fitxers inv\xE0lids",
    labelFileWaitingForSize: "Esperant mida",
    labelFileSizeNotAvailable: "Mida no disponible",
    labelFileLoading: "Carregant",
    labelFileLoadError: "Error durant la c\xE0rrega",
    labelFileProcessing: "Pujant",
    labelFileProcessingComplete: "Pujada completada",
    labelFileProcessingAborted: "Pujada cancel\xB7lada",
    labelFileProcessingError: "Error durant la pujada",
    labelFileProcessingRevertError: "Error durant la reversi\xF3",
    labelFileRemoveError: "Error durant l'eliminaci\xF3",
    labelTapToCancel: "toca per cancel\xB7lar",
    labelTapToRetry: "toca per reintentar",
    labelTapToUndo: "toca per desfer",
    labelButtonRemoveItem: "Eliminar",
    labelButtonAbortItemLoad: "Cancel\xB7lar",
    labelButtonRetryItemLoad: "Reintentar",
    labelButtonAbortItemProcessing: "Cancel\xB7lar",
    labelButtonUndoItemProcessing: "Desfer",
    labelButtonRetryItemProcessing: "Reintentar",
    labelButtonProcessItem: "Pujar",
    labelMaxFileSizeExceeded: "El fitxer \xE9s massa gran",
    labelMaxFileSize: "La mida m\xE0xima del fitxer \xE9s {filesize}",
    labelMaxTotalFileSizeExceeded: "Mida m\xE0xima total excedida",
    labelMaxTotalFileSize:
        "La mida m\xE0xima total del fitxer \xE9s {filesize}",
    labelFileTypeNotAllowed: "Fitxer de tipus inv\xE0lid",
    fileValidateTypeLabelExpectedTypes: "Espera {allButLastType} o {lastType}",
    imageValidateSizeLabelFormatError: "Tipus d'imatge no suportada",
    imageValidateSizeLabelImageSizeTooSmall: "La imatge \xE9s massa petita",
    imageValidateSizeLabelImageSizeTooBig: "La imatge \xE9s massa gran",
    imageValidateSizeLabelExpectedMinSize:
        "La mida m\xEDnima \xE9s {minWidth} x {minHeight}",
    imageValidateSizeLabelExpectedMaxSize:
        "La mida m\xE0xima \xE9s {maxWidth} x {maxHeight}",
    imageValidateSizeLabelImageResolutionTooLow:
        "La resoluci\xF3 \xE9s massa baixa",
    imageValidateSizeLabelImageResolutionTooHigh:
        "La resoluci\xF3 \xE9s massa alta",
    imageValidateSizeLabelExpectedMinResolution:
        "La resoluci\xF3 m\xEDnima \xE9s {minResolution}",
    imageValidateSizeLabelExpectedMaxResolution:
        "La resoluci\xF3 m\xE0xima \xE9s {maxResolution}",
};
const Il = {
    labelIdle:
        '\u067E\u06D5\u0695\u06AF\u06D5\u06A9\u0627\u0646 \u0641\u0695\u06CE \u0628\u062F\u06D5 \u0626\u06CE\u0631\u06D5 \u0628\u06C6 \u0628\u0627\u0631\u06A9\u0631\u062F\u0646 \u06CC\u0627\u0646 <span class="filepond--label-action"> \u0647\u06D5\u06B5\u0628\u0698\u06CE\u0631\u06D5 </span>',
    labelInvalidField:
        "\u067E\u06D5\u0695\u06AF\u06D5\u06CC \u0646\u0627\u062F\u0631\u0648\u0633\u062A\u06CC \u062A\u06CE\u062F\u0627\u06CC\u06D5",
    labelFileWaitingForSize:
        "\u0686\u0627\u0648\u06D5\u0695\u0648\u0627\u0646\u06CC\u06CC \u0642\u06D5\u0628\u0627\u0631\u06D5",
    labelFileSizeNotAvailable:
        "\u0642\u06D5\u0628\u0627\u0631\u06D5 \u0628\u06D5\u0631\u062F\u06D5\u0633\u062A \u0646\u06CC\u06D5",
    labelFileLoading: "\u0628\u0627\u0631\u06A9\u0631\u062F\u0646",
    labelFileLoadError:
        "\u0647\u06D5\u06B5\u06D5 \u0644\u06D5\u0645\u0627\u0648\u06D5\u06CC \u0628\u0627\u0631\u06A9\u0631\u062F\u0646",
    labelFileProcessing: "\u0628\u0627\u0631\u06A9\u0631\u062F\u0646",
    labelFileProcessingComplete:
        "\u0628\u0627\u0631\u06A9\u0631\u062F\u0646 \u062A\u06D5\u0648\u0627\u0648 \u0628\u0648\u0648",
    labelFileProcessingAborted:
        "\u0628\u0627\u0631\u06A9\u0631\u062F\u0646 \u0647\u06D5\u06B5\u0648\u06D5\u0634\u0627\u06CC\u06D5\u0648\u06D5",
    labelFileProcessingError:
        "\u0647\u06D5\u06B5\u06D5 \u0644\u06D5\u06A9\u0627\u062A\u06CC \u0628\u0627\u0631\u06A9\u0631\u062F\u0646\u062F\u0627",
    labelFileProcessingRevertError:
        "\u0647\u06D5\u06B5\u06D5 \u0644\u06D5 \u06A9\u0627\u062A\u06CC \u06AF\u06D5\u0695\u0627\u0646\u06D5\u0648\u06D5",
    labelFileRemoveError:
        "\u0647\u06D5\u06B5\u06D5 \u0644\u06D5 \u06A9\u0627\u062A\u06CC \u0633\u0695\u06CC\u0646\u06D5\u0648\u06D5",
    labelTapToCancel:
        "\u0628\u06C6 \u0647\u06D5\u06B5\u0648\u06D5\u0634\u0627\u0646\u062F\u0646\u06D5\u0648\u06D5 Tab \u062F\u0627\u0628\u06AF\u0631\u06D5",
    labelTapToRetry:
        "tap \u062F\u0627\u0628\u06AF\u0631\u06D5 \u0628\u06C6 \u062F\u0648\u0648\u0628\u0627\u0631\u06D5\u06A9\u0631\u062F\u0646\u06D5\u0648\u06D5",
    labelTapToUndo:
        "tap \u062F\u0627\u0628\u06AF\u0631\u06D5 \u0628\u06C6 \u06AF\u06D5\u0695\u0627\u0646\u062F\u0646\u06D5\u0648\u06D5",
    labelButtonRemoveItem: "\u0633\u0695\u06CC\u0646\u06D5\u0648\u06D5",
    labelButtonAbortItemLoad:
        "\u0647\u06D5\u06B5\u0648\u06D5\u0634\u0627\u0646\u062F\u0646\u06D5\u0648\u06D5",
    labelButtonRetryItemLoad:
        "\u0647\u06D5\u0648\u06B5\u062F\u0627\u0646\u06D5\u0648\u06D5",
    labelButtonAbortItemProcessing:
        "\u067E\u06D5\u0634\u06CC\u0645\u0627\u0646\u0628\u0648\u0648\u0646\u06D5\u0648\u06D5",
    labelButtonUndoItemProcessing:
        "\u06AF\u06D5\u0695\u0627\u0646\u062F\u0646\u06D5\u0648\u06D5",
    labelButtonRetryItemProcessing:
        "\u0647\u06D5\u0648\u06B5\u062F\u0627\u0646\u06D5\u0648\u06D5",
    labelButtonProcessItem: "\u0628\u0627\u0631\u06A9\u0631\u062F\u0646",
    labelMaxFileSizeExceeded:
        "\u067E\u06D5\u0695\u06AF\u06D5 \u0632\u06C6\u0631 \u06AF\u06D5\u0648\u0631\u06D5\u06CC\u06D5",
    labelMaxFileSize:
        "\u0632\u06C6\u0631\u062A\u0631\u06CC\u0646 \u0642\u06D5\u0628\u0627\u0631\u06D5 {filesize}",
    labelMaxTotalFileSizeExceeded:
        "\u0632\u06C6\u0631\u062A\u0631\u06CC\u0646 \u0642\u06D5\u0628\u0627\u0631\u06D5\u06CC \u06A9\u06C6\u06CC \u06AF\u0634\u062A\u06CC \u062A\u06CE\u067E\u06D5\u0695\u06CE\u0646\u062F\u0631\u0627",
    labelMaxTotalFileSize:
        "\u0632\u06C6\u0631\u062A\u0631\u06CC\u0646 \u0642\u06D5\u0628\u0627\u0631\u06D5\u06CC \u06A9\u06C6\u06CC \u067E\u06D5\u0695\u06AF\u06D5 {filesize}",
    labelFileTypeNotAllowed:
        "\u062C\u06C6\u0631\u06CC \u067E\u06D5\u0695\u06AF\u06D5\u06A9\u06D5 \u0646\u0627\u062F\u0631\u0648\u0633\u062A\u06D5",
    fileValidateTypeLabelExpectedTypes:
        "\u062C\u06AF\u06D5 \u0644\u06D5 {allButLastType} \u06CC\u0627\u0646 {lastType}",
    imageValidateSizeLabelFormatError:
        "\u062C\u06C6\u0631\u06CC \u0648\u06CE\u0646\u06D5 \u067E\u0627\u06B5\u067E\u0634\u062A\u06CC\u06CC \u0646\u06D5\u06A9\u0631\u0627\u0648\u06D5",
    imageValidateSizeLabelImageSizeTooSmall:
        "\u0648\u06CE\u0646\u06D5\u06A9\u06D5 \u0632\u06C6\u0631 \u0628\u0686\u0648\u0648\u06A9\u06D5",
    imageValidateSizeLabelImageSizeTooBig:
        "\u0648\u06CE\u0646\u06D5\u06A9\u06D5 \u0632\u06C6\u0631 \u06AF\u06D5\u0648\u0631\u06D5\u06CC\u06D5",
    imageValidateSizeLabelExpectedMinSize:
        "\u06A9\u06D5\u0645\u062A\u0631\u06CC\u0646 \u0642\u06D5\u0628\u0627\u0631\u06D5 {minWidth} \xD7 {minHeight}",
    imageValidateSizeLabelExpectedMaxSize:
        "\u0632\u06C6\u0631\u062A\u0631\u06CC\u0646 \u0642\u06D5\u0628\u0627\u0631\u06D5 {maxWidth} \xD7 {maxHeight}",
    imageValidateSizeLabelImageResolutionTooLow:
        "\u0648\u0631\u062F\u0628\u06CC\u0646\u06CC\u06CC\u06D5\u06A9\u06D5\u06CC \u0632\u06C6\u0631 \u06A9\u06D5\u0645\u06D5",
    imageValidateSizeLabelImageResolutionTooHigh:
        "\u0648\u0631\u062F\u0628\u06CC\u0646\u06CC\u06CC\u06D5\u06A9\u06D5\u06CC \u0632\u06C6\u0631 \u0628\u06D5\u0631\u0632\u06D5",
    imageValidateSizeLabelExpectedMinResolution:
        "\u06A9\u06D5\u0645\u062A\u0631\u06CC\u0646 \u0648\u0631\u062F\u0628\u06CC\u0646\u06CC\u06CC {minResolution}",
    imageValidateSizeLabelExpectedMaxResolution:
        "\u0632\u06C6\u0631\u062A\u0631\u06CC\u0646 \u0648\u0631\u062F\u0628\u06CC\u0646\u06CC {maxResolution}",
};
const _l = {
    labelIdle:
        'P\u0159et\xE1hn\u011Bte soubor sem (drag&drop) nebo <span class="filepond--label-action"> Vyhledat </span>',
    labelInvalidField: "Pole obsahuje chybn\xE9 soubory",
    labelFileWaitingForSize: "Zji\u0161\u0165uje se velikost",
    labelFileSizeNotAvailable: "Velikost nen\xED zn\xE1m\xE1",
    labelFileLoading: "P\u0159en\xE1\u0161\xED se",
    labelFileLoadError: "Chyba p\u0159i p\u0159enosu",
    labelFileProcessing: "Prob\xEDh\xE1 upload",
    labelFileProcessingComplete: "Upload dokon\u010Den",
    labelFileProcessingAborted: "Upload stornov\xE1n",
    labelFileProcessingError: "Chyba p\u0159i uploadu",
    labelFileProcessingRevertError: "Chyba p\u0159i obnov\u011B",
    labelFileRemoveError: "Chyba p\u0159i odstran\u011Bn\xED",
    labelTapToCancel: "klepn\u011Bte pro storno",
    labelTapToRetry: "klepn\u011Bte pro opakov\xE1n\xED",
    labelTapToUndo: "klepn\u011Bte pro vr\xE1cen\xED",
    labelButtonRemoveItem: "Odstranit",
    labelButtonAbortItemLoad: "Storno",
    labelButtonRetryItemLoad: "Opakovat",
    labelButtonAbortItemProcessing: "Zp\u011Bt",
    labelButtonUndoItemProcessing: "Vr\xE1tit",
    labelButtonRetryItemProcessing: "Opakovat",
    labelButtonProcessItem: "Upload",
    labelMaxFileSizeExceeded: "Soubor je p\u0159\xEDli\u0161 velk\xFD",
    labelMaxFileSize: "Nejv\u011Bt\u0161\xED velikost souboru je {filesize}",
    labelMaxTotalFileSizeExceeded:
        "P\u0159ekro\u010Dena maxim\xE1ln\xED celkov\xE1 velikost souboru",
    labelMaxTotalFileSize:
        "Maxim\xE1ln\xED celkov\xE1 velikost souboru je {filesize}",
    labelFileTypeNotAllowed: "Soubor je nespr\xE1vn\xE9ho typu",
    fileValidateTypeLabelExpectedTypes:
        "O\u010Dek\xE1v\xE1 se {allButLastType} nebo {lastType}",
    imageValidateSizeLabelFormatError:
        "Obr\xE1zek tohoto typu nen\xED podporov\xE1n",
    imageValidateSizeLabelImageSizeTooSmall:
        "Obr\xE1zek je p\u0159\xEDli\u0161 mal\xFD",
    imageValidateSizeLabelImageSizeTooBig:
        "Obr\xE1zek je p\u0159\xEDli\u0161 velk\xFD",
    imageValidateSizeLabelExpectedMinSize:
        "Minim\xE1ln\xED rozm\u011Br je {minWidth} \xD7 {minHeight}",
    imageValidateSizeLabelExpectedMaxSize:
        "Maxim\xE1ln\xED rozm\u011Br je {maxWidth} \xD7 {maxHeight}",
    imageValidateSizeLabelImageResolutionTooLow:
        "Rozli\u0161en\xED je p\u0159\xEDli\u0161 mal\xE9",
    imageValidateSizeLabelImageResolutionTooHigh:
        "Rozli\u0161en\xED je p\u0159\xEDli\u0161 velk\xE9",
    imageValidateSizeLabelExpectedMinResolution:
        "Minim\xE1ln\xED rozli\u0161en\xED je {minResolution}",
    imageValidateSizeLabelExpectedMaxResolution:
        "Maxim\xE1ln\xED rozli\u0161en\xED je {maxResolution}",
};
const Rl = {
    labelIdle:
        'Tr\xE6k & slip filer eller <span class = "filepond - label-action"> Gennemse </span>',
    labelInvalidField: "Felt indeholder ugyldige filer",
    labelFileWaitingForSize: "Venter p\xE5 st\xF8rrelse",
    labelFileSizeNotAvailable: "St\xF8rrelse ikke tilg\xE6ngelig",
    labelFileLoading: "Loader",
    labelFileLoadError: "Load fejlede",
    labelFileProcessing: "Uploader",
    labelFileProcessingComplete: "Upload f\xE6rdig",
    labelFileProcessingAborted: "Upload annulleret",
    labelFileProcessingError: "Upload fejlede",
    labelFileProcessingRevertError: "Fortryd fejlede",
    labelFileRemoveError: "Fjern fejlede",
    labelTapToCancel: "tryk for at annullere",
    labelTapToRetry: "tryk for at pr\xF8ve igen",
    labelTapToUndo: "tryk for at fortryde",
    labelButtonRemoveItem: "Fjern",
    labelButtonAbortItemLoad: "Annuller",
    labelButtonRetryItemLoad: "Fors\xF8g igen",
    labelButtonAbortItemProcessing: "Annuller",
    labelButtonUndoItemProcessing: "Fortryd",
    labelButtonRetryItemProcessing: "Pr\xF8v igen",
    labelButtonProcessItem: "Upload",
    labelMaxFileSizeExceeded: "Filen er for stor",
    labelMaxFileSize: "Maksimal filst\xF8rrelse er {filesize}",
    labelMaxTotalFileSizeExceeded: "Maksimal totalst\xF8rrelse overskredet",
    labelMaxTotalFileSize: "Maksimal total filst\xF8rrelse er {filesize}",
    labelFileTypeNotAllowed: "Ugyldig filtype",
    fileValidateTypeLabelExpectedTypes:
        "Forventer {allButLastType} eller {lastType}",
    imageValidateSizeLabelFormatError: "Ugyldigt format",
    imageValidateSizeLabelImageSizeTooSmall: "Billedet er for lille",
    imageValidateSizeLabelImageSizeTooBig: "Billedet er for stort",
    imageValidateSizeLabelExpectedMinSize:
        "Minimum st\xF8rrelse er {minBredde} \xD7 {minH\xF8jde}",
    imageValidateSizeLabelExpectedMaxSize:
        "Maksimal st\xF8rrelse er {maxWidth} \xD7 {maxHeight}",
    imageValidateSizeLabelImageResolutionTooLow: "For lav opl\xF8sning",
    imageValidateSizeLabelImageResolutionTooHigh: "For h\xF8j opl\xF8sning",
    imageValidateSizeLabelExpectedMinResolution:
        "Minimum opl\xF8sning er {minResolution}",
    imageValidateSizeLabelExpectedMaxResolution:
        "Maksimal opl\xF8sning er {maxResolution}",
};
const yl = {
    labelIdle:
        'Dateien ablegen oder <span class="filepond--label-action"> ausw\xE4hlen </span>',
    labelInvalidField: "Feld beinhaltet ung\xFCltige Dateien",
    labelFileWaitingForSize: "Dateigr\xF6\xDFe berechnen",
    labelFileSizeNotAvailable: "Dateigr\xF6\xDFe nicht verf\xFCgbar",
    labelFileLoading: "Laden",
    labelFileLoadError: "Fehler beim Laden",
    labelFileProcessing: "Upload l\xE4uft",
    labelFileProcessingComplete: "Upload abgeschlossen",
    labelFileProcessingAborted: "Upload abgebrochen",
    labelFileProcessingError: "Fehler beim Upload",
    labelFileProcessingRevertError: "Fehler beim Wiederherstellen",
    labelFileRemoveError: "Fehler beim L\xF6schen",
    labelTapToCancel: "abbrechen",
    labelTapToRetry: "erneut versuchen",
    labelTapToUndo: "r\xFCckg\xE4ngig",
    labelButtonRemoveItem: "Entfernen",
    labelButtonAbortItemLoad: "Verwerfen",
    labelButtonRetryItemLoad: "Erneut versuchen",
    labelButtonAbortItemProcessing: "Abbrechen",
    labelButtonUndoItemProcessing: "R\xFCckg\xE4ngig",
    labelButtonRetryItemProcessing: "Erneut versuchen",
    labelButtonProcessItem: "Upload",
    labelMaxFileSizeExceeded: "Datei ist zu gro\xDF",
    labelMaxFileSize: "Maximale Dateigr\xF6\xDFe: {filesize}",
    labelMaxTotalFileSizeExceeded:
        "Maximale gesamte Dateigr\xF6\xDFe \xFCberschritten",
    labelMaxTotalFileSize: "Maximale gesamte Dateigr\xF6\xDFe: {filesize}",
    labelFileTypeNotAllowed: "Dateityp ung\xFCltig",
    fileValidateTypeLabelExpectedTypes:
        "Erwartet {allButLastType} oder {lastType}",
    imageValidateSizeLabelFormatError: "Bildtyp nicht unterst\xFCtzt",
    imageValidateSizeLabelImageSizeTooSmall: "Bild ist zu klein",
    imageValidateSizeLabelImageSizeTooBig: "Bild ist zu gro\xDF",
    imageValidateSizeLabelExpectedMinSize:
        "Mindestgr\xF6\xDFe: {minWidth} \xD7 {minHeight}",
    imageValidateSizeLabelExpectedMaxSize:
        "Maximale Gr\xF6\xDFe: {maxWidth} \xD7 {maxHeight}",
    imageValidateSizeLabelImageResolutionTooLow: "Aufl\xF6sung ist zu niedrig",
    imageValidateSizeLabelImageResolutionTooHigh: "Aufl\xF6sung ist zu hoch",
    imageValidateSizeLabelExpectedMinResolution:
        "Mindestaufl\xF6sung: {minResolution}",
    imageValidateSizeLabelExpectedMaxResolution:
        "Maximale Aufl\xF6sung: {maxResolution}",
};
const Sl = {
    labelIdle:
        'Drag & Drop your files or <span class="filepond--label-action"> Browse </span>',
    labelInvalidField: "Field contains invalid files",
    labelFileWaitingForSize: "Waiting for size",
    labelFileSizeNotAvailable: "Size not available",
    labelFileLoading: "Loading",
    labelFileLoadError: "Error during load",
    labelFileProcessing: "Uploading",
    labelFileProcessingComplete: "Upload complete",
    labelFileProcessingAborted: "Upload cancelled",
    labelFileProcessingError: "Error during upload",
    labelFileProcessingRevertError: "Error during revert",
    labelFileRemoveError: "Error during remove",
    labelTapToCancel: "tap to cancel",
    labelTapToRetry: "tap to retry",
    labelTapToUndo: "tap to undo",
    labelButtonRemoveItem: "Remove",
    labelButtonAbortItemLoad: "Abort",
    labelButtonRetryItemLoad: "Retry",
    labelButtonAbortItemProcessing: "Cancel",
    labelButtonUndoItemProcessing: "Undo",
    labelButtonRetryItemProcessing: "Retry",
    labelButtonProcessItem: "Upload",
    labelMaxFileSizeExceeded: "File is too large",
    labelMaxFileSize: "Maximum file size is {filesize}",
    labelMaxTotalFileSizeExceeded: "Maximum total size exceeded",
    labelMaxTotalFileSize: "Maximum total file size is {filesize}",
    labelFileTypeNotAllowed: "File of invalid type",
    fileValidateTypeLabelExpectedTypes:
        "Expects {allButLastType} or {lastType}",
    imageValidateSizeLabelFormatError: "Image type not supported",
    imageValidateSizeLabelImageSizeTooSmall: "Image is too small",
    imageValidateSizeLabelImageSizeTooBig: "Image is too big",
    imageValidateSizeLabelExpectedMinSize:
        "Minimum size is {minWidth} \xD7 {minHeight}",
    imageValidateSizeLabelExpectedMaxSize:
        "Maximum size is {maxWidth} \xD7 {maxHeight}",
    imageValidateSizeLabelImageResolutionTooLow: "Resolution is too low",
    imageValidateSizeLabelImageResolutionTooHigh: "Resolution is too high",
    imageValidateSizeLabelExpectedMinResolution:
        "Minimum resolution is {minResolution}",
    imageValidateSizeLabelExpectedMaxResolution:
        "Maximum resolution is {maxResolution}",
};
const wl = {
    labelIdle:
        'Arrastra y suelta tus archivos o <span class = "filepond--label-action"> Examina <span>',
    labelInvalidField: "El campo contiene archivos inv\xE1lidos",
    labelFileWaitingForSize: "Esperando tama\xF1o",
    labelFileSizeNotAvailable: "Tama\xF1o no disponible",
    labelFileLoading: "Cargando",
    labelFileLoadError: "Error durante la carga",
    labelFileProcessing: "Subiendo",
    labelFileProcessingComplete: "Subida completa",
    labelFileProcessingAborted: "Subida cancelada",
    labelFileProcessingError: "Error durante la subida",
    labelFileProcessingRevertError: "Error durante la reversi\xF3n",
    labelFileRemoveError: "Error durante la eliminaci\xF3n",
    labelTapToCancel: "toca para cancelar",
    labelTapToRetry: "tocar para reintentar",
    labelTapToUndo: "tocar para deshacer",
    labelButtonRemoveItem: "Eliminar",
    labelButtonAbortItemLoad: "Cancelar",
    labelButtonRetryItemLoad: "Reintentar",
    labelButtonAbortItemProcessing: "Cancelar",
    labelButtonUndoItemProcessing: "Deshacer",
    labelButtonRetryItemProcessing: "Reintentar",
    labelButtonProcessItem: "Subir",
    labelMaxFileSizeExceeded: "El archivo es demasiado grande",
    labelMaxFileSize: "El tama\xF1o m\xE1ximo del archivo es {filesize}",
    labelMaxTotalFileSizeExceeded: "Tama\xF1o total m\xE1ximo excedido",
    labelMaxTotalFileSize:
        "El tama\xF1o total m\xE1ximo del archivo es {filesize}",
    labelFileTypeNotAllowed: "Archivo de tipo inv\xE1lido",
    fileValidateTypeLabelExpectedTypes: "Espera {allButLastType} o {lastType}",
    imageValidateSizeLabelFormatError: "Tipo de imagen no soportada",
    imageValidateSizeLabelImageSizeTooSmall:
        "La imagen es demasiado peque\xF1a",
    imageValidateSizeLabelImageSizeTooBig: "La imagen es demasiado grande",
    imageValidateSizeLabelExpectedMinSize:
        "El tama\xF1o m\xEDnimo es {minWidth} x {minHeight}",
    imageValidateSizeLabelExpectedMaxSize:
        "El tama\xF1o m\xE1ximo es {maxWidth} x {maxHeight}",
    imageValidateSizeLabelImageResolutionTooLow:
        "La resoluci\xF3n es demasiado baja",
    imageValidateSizeLabelImageResolutionTooHigh:
        "La resoluci\xF3n es demasiado alta",
    imageValidateSizeLabelExpectedMinResolution:
        "La resoluci\xF3n m\xEDnima es {minResolution}",
    imageValidateSizeLabelExpectedMaxResolution:
        "La resoluci\xF3n m\xE1xima es {maxResolution}",
};
const vl = {
    labelIdle:
        '\u0641\u0627\u06CC\u0644 \u0631\u0627 \u0627\u06CC\u0646\u062C\u0627 \u0628\u06A9\u0634\u06CC\u062F \u0648 \u0631\u0647\u0627 \u06A9\u0646\u06CC\u062F\u060C \u06CC\u0627 <span class="filepond--label-action"> \u062C\u0633\u062A\u062C\u0648 \u06A9\u0646\u06CC\u062F </span>',
    labelInvalidField:
        "\u0641\u06CC\u0644\u062F \u062F\u0627\u0631\u0627\u06CC \u0641\u0627\u06CC\u0644 \u0647\u0627\u06CC \u0646\u0627\u0645\u0639\u062A\u0628\u0631 \u0627\u0633\u062A",
    labelFileWaitingForSize: "Waiting for size",
    labelFileSizeNotAvailable:
        "\u062D\u062C\u0645 \u0641\u0627\u06CC\u0644 \u0645\u062C\u0627\u0632 \u0646\u06CC\u0633\u062A",
    labelFileLoading:
        "\u062F\u0631\u062D\u0627\u0644 \u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC",
    labelFileLoadError:
        "\u062E\u0637\u0627 \u062F\u0631 \u0632\u0645\u0627\u0646 \u0627\u062C\u0631\u0627",
    labelFileProcessing:
        "\u062F\u0631\u062D\u0627\u0644 \u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC",
    labelFileProcessingComplete:
        "\u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC \u06A9\u0627\u0645\u0644 \u0634\u062F",
    labelFileProcessingAborted:
        "\u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC \u0644\u063A\u0648 \u0634\u062F",
    labelFileProcessingError:
        "\u062E\u0637\u0627 \u062F\u0631 \u0632\u0645\u0627\u0646 \u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC",
    labelFileProcessingRevertError:
        "\u062E\u0637\u0627 \u062F\u0631 \u0632\u0645\u0627\u0646 \u062D\u0630\u0641",
    labelFileRemoveError:
        "\u062E\u0637\u0627 \u062F\u0631 \u0632\u0645\u0627\u0646 \u062D\u0630\u0641",
    labelTapToCancel:
        "\u0628\u0631\u0627\u06CC \u0644\u063A\u0648 \u0636\u0631\u0628\u0647 \u0628\u0632\u0646\u06CC\u062F",
    labelTapToRetry:
        "\u0628\u0631\u0627\u06CC \u062A\u06A9\u0631\u0627\u0631 \u06A9\u0644\u06CC\u06A9 \u06A9\u0646\u06CC\u062F",
    labelTapToUndo:
        "\u0628\u0631\u0627\u06CC \u0628\u0631\u06AF\u0634\u062A \u06A9\u0644\u06CC\u06A9 \u06A9\u0646\u06CC\u062F",
    labelButtonRemoveItem: "\u062D\u0630\u0641",
    labelButtonAbortItemLoad: "\u0644\u063A\u0648",
    labelButtonRetryItemLoad: "\u062A\u06A9\u0631\u0627\u0631",
    labelButtonAbortItemProcessing: "\u0644\u063A\u0648",
    labelButtonUndoItemProcessing: "\u0628\u0631\u06AF\u0634\u062A",
    labelButtonRetryItemProcessing: "\u062A\u06A9\u0631\u0627\u0631",
    labelButtonProcessItem: "\u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC",
    labelMaxFileSizeExceeded:
        "\u0641\u0627\u06CC\u0644 \u0628\u0633\u06CC\u0627\u0631 \u062D\u062C\u06CC\u0645 \u0627\u0633\u062A",
    labelMaxFileSize:
        "\u062D\u062F\u0627\u06A9\u062B\u0631 \u0645\u062C\u0627\u0632 \u0641\u0627\u06CC\u0644 {filesize} \u0627\u0633\u062A",
    labelMaxTotalFileSizeExceeded:
        "\u0627\u0632 \u062D\u062F\u0627\u06A9\u062B\u0631 \u062D\u062C\u0645 \u0641\u0627\u06CC\u0644 \u0628\u06CC\u0634\u062A\u0631 \u0634\u062F",
    labelMaxTotalFileSize:
        "\u062D\u062F\u0627\u06A9\u062B\u0631 \u062D\u062C\u0645 \u0641\u0627\u06CC\u0644 {filesize} \u0627\u0633\u062A",
    labelFileTypeNotAllowed:
        "\u0646\u0648\u0639 \u0641\u0627\u06CC\u0644 \u0646\u0627\u0645\u0639\u062A\u0628\u0631 \u0627\u0633\u062A",
    fileValidateTypeLabelExpectedTypes:
        "\u062F\u0631 \u0627\u0646\u062A\u0638\u0627\u0631 {allButLastType} \u06CC\u0627 {lastType}",
    imageValidateSizeLabelFormatError:
        "\u0641\u0631\u0645\u062A \u062A\u0635\u0648\u06CC\u0631 \u067E\u0634\u062A\u06CC\u0628\u0627\u0646\u06CC \u0646\u0645\u06CC \u0634\u0648\u062F",
    imageValidateSizeLabelImageSizeTooSmall:
        "\u062A\u0635\u0648\u06CC\u0631 \u0628\u0633\u06CC\u0627\u0631 \u06A9\u0648\u0686\u06A9 \u0627\u0633\u062A",
    imageValidateSizeLabelImageSizeTooBig:
        "\u062A\u0635\u0648\u06CC\u0631 \u0628\u0633\u06CC\u0627\u0631 \u0628\u0632\u0631\u06AF \u0627\u0633\u062A",
    imageValidateSizeLabelExpectedMinSize:
        "\u062D\u062F\u0627\u0642\u0644 \u0627\u0646\u062F\u0627\u0632\u0647 {minWidth} \xD7 {minHeight} \u0627\u0633\u062A",
    imageValidateSizeLabelExpectedMaxSize:
        "\u062D\u062F\u0627\u06A9\u062B\u0631 \u0627\u0646\u062F\u0627\u0632\u0647 {maxWidth} \xD7 {maxHeight} \u0627\u0633\u062A",
    imageValidateSizeLabelImageResolutionTooLow:
        "\u0648\u0636\u0648\u062D \u062A\u0635\u0648\u06CC\u0631 \u0628\u0633\u06CC\u0627\u0631 \u06A9\u0645 \u0627\u0633\u062A",
    imageValidateSizeLabelImageResolutionTooHigh:
        "\u0648\u0636\u0648\u0639 \u062A\u0635\u0648\u06CC\u0631 \u0628\u0633\u06CC\u0627\u0631 \u0632\u06CC\u0627\u062F \u0627\u0633\u062A",
    imageValidateSizeLabelExpectedMinResolution:
        "\u062D\u062F\u0627\u0642\u0644 \u0648\u0636\u0648\u062D \u062A\u0635\u0648\u06CC\u0631 {minResolution} \u0627\u0633\u062A",
    imageValidateSizeLabelExpectedMaxResolution:
        "\u062D\u062F\u0627\u06A9\u062B\u0631 \u0648\u0636\u0648\u062D \u062A\u0635\u0648\u06CC\u0631 {maxResolution} \u0627\u0633\u062A",
};
const Al = {
    labelIdle:
        'Ved\xE4 ja pudota tiedostoja tai <span class="filepond--label-action"> Selaa </span>',
    labelInvalidField: "Kent\xE4ss\xE4 on virheellisi\xE4 tiedostoja",
    labelFileWaitingForSize: "Odotetaan kokoa",
    labelFileSizeNotAvailable: "Kokoa ei saatavilla",
    labelFileLoading: "Ladataan",
    labelFileLoadError: "Virhe latauksessa",
    labelFileProcessing: "L\xE4hetet\xE4\xE4n",
    labelFileProcessingComplete: "L\xE4hetys valmis",
    labelFileProcessingAborted: "L\xE4hetys peruttu",
    labelFileProcessingError: "Virhe l\xE4hetyksess\xE4",
    labelFileProcessingRevertError: "Virhe palautuksessa",
    labelFileRemoveError: "Virhe poistamisessa",
    labelTapToCancel: "peruuta napauttamalla",
    labelTapToRetry: "yrit\xE4 uudelleen napauttamalla",
    labelTapToUndo: "kumoa napauttamalla",
    labelButtonRemoveItem: "Poista",
    labelButtonAbortItemLoad: "Keskeyt\xE4",
    labelButtonRetryItemLoad: "Yrit\xE4 uudelleen",
    labelButtonAbortItemProcessing: "Peruuta",
    labelButtonUndoItemProcessing: "Kumoa",
    labelButtonRetryItemProcessing: "Yrit\xE4 uudelleen",
    labelButtonProcessItem: "L\xE4het\xE4",
    labelMaxFileSizeExceeded: "Tiedoston koko on liian suuri",
    labelMaxFileSize: "Tiedoston maksimikoko on {filesize}",
    labelMaxTotalFileSizeExceeded:
        "Tiedostojen yhdistetty maksimikoko ylitetty",
    labelMaxTotalFileSize: "Tiedostojen yhdistetty maksimikoko on {filesize}",
    labelFileTypeNotAllowed: "Tiedostotyyppi\xE4 ei sallita",
    fileValidateTypeLabelExpectedTypes:
        "Sallitaan {allButLastType} tai {lastType}",
    imageValidateSizeLabelFormatError: "Kuvatyyppi\xE4 ei tueta",
    imageValidateSizeLabelImageSizeTooSmall: "Kuva on liian pieni",
    imageValidateSizeLabelImageSizeTooBig: "Kuva on liian suuri",
    imageValidateSizeLabelExpectedMinSize:
        "Minimikoko on {minWidth} \xD7 {minHeight}",
    imageValidateSizeLabelExpectedMaxSize:
        "Maksimikoko on {maxWidth} \xD7 {maxHeight}",
    imageValidateSizeLabelImageResolutionTooLow: "Resoluutio on liian pieni",
    imageValidateSizeLabelImageResolutionTooHigh: "Resoluutio on liian suuri",
    imageValidateSizeLabelExpectedMinResolution:
        "Minimiresoluutio on {minResolution}",
    imageValidateSizeLabelExpectedMaxResolution:
        "Maksimiresoluutio on {maxResolution}",
};
const Ll = {
    labelIdle:
        'Faites glisser vos fichiers ou <span class = "filepond--label-action"> Parcourir </span>',
    labelInvalidField: "Le champ contient des fichiers invalides",
    labelFileWaitingForSize: "En attente de taille",
    labelFileSizeNotAvailable: "Taille non disponible",
    labelFileLoading: "Chargement",
    labelFileLoadError: "Erreur durant le chargement",
    labelFileProcessing: "Traitement",
    labelFileProcessingComplete: "Traitement effectu\xE9",
    labelFileProcessingAborted: "Traitement interrompu",
    labelFileProcessingError: "Erreur durant le traitement",
    labelFileProcessingRevertError: "Erreur durant la restauration",
    labelFileRemoveError: "Erreur durant la suppression",
    labelTapToCancel: "appuyer pour annuler",
    labelTapToRetry: "appuyer pour r\xE9essayer",
    labelTapToUndo: "appuyer pour revenir en arri\xE8re",
    labelButtonRemoveItem: "Retirer",
    labelButtonAbortItemLoad: "Annuler",
    labelButtonRetryItemLoad: "Recommencer",
    labelButtonAbortItemProcessing: "Annuler",
    labelButtonUndoItemProcessing: "Revenir en arri\xE8re",
    labelButtonRetryItemProcessing: "Recommencer",
    labelButtonProcessItem: "Transf\xE9rer",
    labelMaxFileSizeExceeded: "Le fichier est trop volumineux",
    labelMaxFileSize: "La taille maximale de fichier est {filesize}",
    labelMaxTotalFileSizeExceeded: "Taille totale maximale d\xE9pass\xE9e",
    labelMaxTotalFileSize:
        "La taille totale maximale des fichiers est {filesize}",
    labelFileTypeNotAllowed: "Fichier non valide",
    fileValidateTypeLabelExpectedTypes:
        "Attendu {allButLastType} ou {lastType}",
    imageValidateSizeLabelFormatError: "Type d'image non pris en charge",
    imageValidateSizeLabelImageSizeTooSmall: "L'image est trop petite",
    imageValidateSizeLabelImageSizeTooBig: "L'image est trop grande",
    imageValidateSizeLabelExpectedMinSize:
        "La taille minimale est {minWidth} \xD7 {minHeight}",
    imageValidateSizeLabelExpectedMaxSize:
        "La taille maximale est {maxWidth} \xD7 {maxHeight}",
    imageValidateSizeLabelImageResolutionTooLow:
        "La r\xE9solution est trop faible",
    imageValidateSizeLabelImageResolutionTooHigh:
        "La r\xE9solution est trop \xE9lev\xE9e",
    imageValidateSizeLabelExpectedMinResolution:
        "La r\xE9solution minimale est {minResolution}",
    imageValidateSizeLabelExpectedMaxResolution:
        "La r\xE9solution maximale est {maxResolution}",
};
const Ml = {
    labelIdle:
        'Mozgasd ide a f\xE1jlt a felt\xF6lt\xE9shez, vagy <span class="filepond--label-action"> tall\xF3z\xE1s </span>',
    labelInvalidField: "A mez\u0151 \xE9rv\xE9nytelen f\xE1jlokat tartalmaz",
    labelFileWaitingForSize: "F\xE1ljm\xE9ret kisz\xE1mol\xE1sa",
    labelFileSizeNotAvailable: "A f\xE1jlm\xE9ret nem el\xE9rhet\u0151",
    labelFileLoading: "T\xF6lt\xE9s",
    labelFileLoadError: "Hiba a bet\xF6lt\xE9s sor\xE1n",
    labelFileProcessing: "Felt\xF6lt\xE9s",
    labelFileProcessingComplete: "Sikeres felt\xF6lt\xE9s",
    labelFileProcessingAborted: "A felt\xF6lt\xE9s megszak\xEDtva",
    labelFileProcessingError: "Hiba t\xF6rt\xE9nt a felt\xF6lt\xE9s sor\xE1n",
    labelFileProcessingRevertError: "Hiba a vissza\xE1ll\xEDt\xE1s sor\xE1n",
    labelFileRemoveError: "Hiba t\xF6rt\xE9nt az elt\xE1vol\xEDt\xE1s sor\xE1n",
    labelTapToCancel: "koppints a t\xF6rl\xE9shez",
    labelTapToRetry: "koppints az \xFAjrakezd\xE9shez",
    labelTapToUndo: "koppints a visszavon\xE1shoz",
    labelButtonRemoveItem: "Elt\xE1vol\xEDt\xE1s",
    labelButtonAbortItemLoad: "Megszak\xEDt\xE1s",
    labelButtonRetryItemLoad: "\xDAjrapr\xF3b\xE1lkoz\xE1s",
    labelButtonAbortItemProcessing: "Megszak\xEDt\xE1s",
    labelButtonUndoItemProcessing: "Visszavon\xE1s",
    labelButtonRetryItemProcessing: "\xDAjrapr\xF3b\xE1lkoz\xE1s",
    labelButtonProcessItem: "Felt\xF6lt\xE9s",
    labelMaxFileSizeExceeded:
        "A f\xE1jl t\xFAll\xE9pte a maxim\xE1lis m\xE9retet",
    labelMaxFileSize: "Maxim\xE1lis f\xE1jlm\xE9ret: {filesize}",
    labelMaxTotalFileSizeExceeded:
        "T\xFAll\xE9pte a maxim\xE1lis teljes m\xE9retet",
    labelMaxTotalFileSize: "A maxim\xE1is teljes f\xE1jlm\xE9ret: {filesize}",
    labelFileTypeNotAllowed: "\xC9rv\xE9nytelen t\xEDpus\xFA f\xE1jl",
    fileValidateTypeLabelExpectedTypes:
        "Enged\xE9lyezett t\xEDpusok {allButLastType} vagy {lastType}",
    imageValidateSizeLabelFormatError: "A k\xE9pt\xEDpus nem t\xE1mogatott",
    imageValidateSizeLabelImageSizeTooSmall: "A k\xE9p t\xFAl kicsi",
    imageValidateSizeLabelImageSizeTooBig: "A k\xE9p t\xFAl nagy",
    imageValidateSizeLabelExpectedMinSize:
        "Minimum m\xE9ret: {minWidth} \xD7 {minHeight}",
    imageValidateSizeLabelExpectedMaxSize:
        "Maximum m\xE9ret: {maxWidth} \xD7 {maxHeight}",
    imageValidateSizeLabelImageResolutionTooLow:
        "A felbont\xE1s t\xFAl alacsony",
    imageValidateSizeLabelImageResolutionTooHigh: "A felbont\xE1s t\xFAl magas",
    imageValidateSizeLabelExpectedMinResolution:
        "Minim\xE1is felbont\xE1s: {minResolution}",
    imageValidateSizeLabelExpectedMaxResolution:
        "Maxim\xE1lis felbont\xE1s: {maxResolution}",
};
const xl = {
    labelIdle:
        'Seret & Jatuhkan berkas Anda atau <span class="filepond--label-action">Jelajahi</span>',
    labelInvalidField: "Isian berisi berkas yang tidak valid",
    labelFileWaitingForSize: "Menunggu ukuran berkas",
    labelFileSizeNotAvailable: "Ukuran berkas tidak tersedia",
    labelFileLoading: "Memuat",
    labelFileLoadError: "Kesalahan saat memuat",
    labelFileProcessing: "Mengunggah",
    labelFileProcessingComplete: "Pengunggahan selesai",
    labelFileProcessingAborted: "Pengunggahan dibatalkan",
    labelFileProcessingError: "Kesalahan saat pengunggahan",
    labelFileProcessingRevertError: "Kesalahan saat pemulihan",
    labelFileRemoveError: "Kesalahan saat penghapusan",
    labelTapToCancel: "ketuk untuk membatalkan",
    labelTapToRetry: "ketuk untuk mencoba lagi",
    labelTapToUndo: "ketuk untuk mengurungkan",
    labelButtonRemoveItem: "Hapus",
    labelButtonAbortItemLoad: "Batalkan",
    labelButtonRetryItemLoad: "Coba Kembali",
    labelButtonAbortItemProcessing: "Batalkan",
    labelButtonUndoItemProcessing: "Urungkan",
    labelButtonRetryItemProcessing: "Coba Kembali",
    labelButtonProcessItem: "Unggah",
    labelMaxFileSizeExceeded: "Berkas terlalu besar",
    labelMaxFileSize: "Ukuran berkas maksimum adalah {filesize}",
    labelMaxTotalFileSizeExceeded: "Jumlah berkas maksimum terlampaui",
    labelMaxTotalFileSize: "Jumlah berkas maksimum adalah {filesize}",
    labelFileTypeNotAllowed: "Jenis berkas tidak valid",
    fileValidateTypeLabelExpectedTypes:
        "Mengharapkan {allButLastType} atau {lastType}",
    imageValidateSizeLabelFormatError: "Jenis citra tidak didukung",
    imageValidateSizeLabelImageSizeTooSmall: "Citra terlalu kecil",
    imageValidateSizeLabelImageSizeTooBig: "Citra terlalu besar",
    imageValidateSizeLabelExpectedMinSize:
        "Ukuran minimum adalah {minWidth} \xD7 {minHeight}",
    imageValidateSizeLabelExpectedMaxSize:
        "Ukuran maksimum adalah {minWidth} \xD7 {minHeight}",
    imageValidateSizeLabelImageResolutionTooLow: "Resolusi terlalu rendah",
    imageValidateSizeLabelImageResolutionTooHigh: "Resolusi terlalu tinggi",
    imageValidateSizeLabelExpectedMinResolution:
        "Resolusi minimum adalah {minResolution}",
    imageValidateSizeLabelExpectedMaxResolution:
        "Resolusi maksimum adalah {maxResolution}",
};
const Ol = {
    labelIdle:
        'Trascina e rilascia i tuoi file oppure <span class = "filepond--label-action"> Carica <span>',
    labelInvalidField: "Il campo contiene dei file non validi",
    labelFileWaitingForSize: "Aspettando le dimensioni",
    labelFileSizeNotAvailable: "Dimensioni non disponibili",
    labelFileLoading: "Caricamento",
    labelFileLoadError: "Errore durante il caricamento",
    labelFileProcessing: "Caricamento",
    labelFileProcessingComplete: "Caricamento completato",
    labelFileProcessingAborted: "Caricamento cancellato",
    labelFileProcessingError: "Errore durante il caricamento",
    labelFileProcessingRevertError: "Errore durante il ripristino",
    labelFileRemoveError: "Errore durante l'eliminazione",
    labelTapToCancel: "tocca per cancellare",
    labelTapToRetry: "tocca per riprovare",
    labelTapToUndo: "tocca per ripristinare",
    labelButtonRemoveItem: "Elimina",
    labelButtonAbortItemLoad: "Cancella",
    labelButtonRetryItemLoad: "Ritenta",
    labelButtonAbortItemProcessing: "Camcella",
    labelButtonUndoItemProcessing: "Indietro",
    labelButtonRetryItemProcessing: "Ritenta",
    labelButtonProcessItem: "Carica",
    labelMaxFileSizeExceeded: "Il peso del file \xE8 eccessivo",
    labelMaxFileSize: "Il peso massimo del file \xE8 {filesize}",
    labelMaxTotalFileSizeExceeded: "Dimensione totale massima superata",
    labelMaxTotalFileSize:
        "La dimensione massima totale del file \xE8 {filesize}",
    labelFileTypeNotAllowed: "File non supportato",
    fileValidateTypeLabelExpectedTypes: "Aspetta {allButLastType} o {lastType}",
    imageValidateSizeLabelFormatError: "Tipo di immagine non compatibile",
    imageValidateSizeLabelImageSizeTooSmall: "L'immagine \xE8 troppo piccola",
    imageValidateSizeLabelImageSizeTooBig: "L'immagine \xE8 troppo grande",
    imageValidateSizeLabelExpectedMinSize:
        "La dimensione minima \xE8 {minWidth} \xD7 {minHeight}",
    imageValidateSizeLabelExpectedMaxSize:
        "La dimensione massima \xE8 {maxWidth} \xD7 {maxHeight}",
    imageValidateSizeLabelImageResolutionTooLow:
        "La risoluzione \xE8 troppo bassa",
    imageValidateSizeLabelImageResolutionTooHigh:
        "La risoluzione \xE8 troppo alta",
    imageValidateSizeLabelExpectedMinResolution:
        "La risoluzione minima \xE8 {minResolution}",
    imageValidateSizeLabelExpectedMaxResolution:
        "La risoluzione massima \xE8 {maxResolution}",
};
const Pl = {
    labelIdle:
        '\u1791\u17B6\u1789&\u178A\u17B6\u1780\u17CB\u17A0\u17D2\u179C\u17B6\u179B\u17CB\u17AF\u1780\u179F\u17B6\u179A\u179A\u1794\u179F\u17CB\u17A2\u17D2\u1793\u1780 \u17AC <span class="filepond--label-action"> \u179F\u17D2\u179C\u17C2\u1784\u179A\u1780 </span>',
    labelInvalidField:
        "\u1785\u1793\u17D2\u179B\u17C4\u17C7\u1798\u17B6\u1793\u17AF\u1780\u179F\u17B6\u179A\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C",
    labelFileWaitingForSize:
        "\u1780\u17C6\u1796\u17BB\u1784\u179A\u1784\u17CB\u1785\u17B6\u17C6\u1791\u17C6\u17A0\u17C6",
    labelFileSizeNotAvailable:
        "\u1791\u17C6\u17A0\u17C6\u1798\u17B7\u1793\u17A2\u17B6\u1785\u1794\u17D2\u179A\u17BE\u1794\u17B6\u1793",
    labelFileLoading:
        "\u1780\u17C6\u1796\u17BB\u1784\u178A\u17C6\u178E\u17BE\u179A\u1780\u17B6\u179A",
    labelFileLoadError:
        "\u1798\u17B6\u1793\u1794\u1789\u17D2\u17A0\u17B6\u1780\u17C6\u17A1\u17BB\u1784\u1796\u17C1\u179B\u178A\u17C6\u178E\u17BE\u179A\u1780\u17B6\u179A",
    labelFileProcessing:
        "\u1780\u17C6\u1796\u17BB\u1784\u1795\u17D2\u1791\u17BB\u1780\u17A1\u17BE\u1784",
    labelFileProcessingComplete:
        "\u1780\u17B6\u179A\u1795\u17D2\u1791\u17BB\u1780\u17A1\u17BE\u1784\u1796\u17C1\u1789\u179B\u17C1\u1789",
    labelFileProcessingAborted:
        "\u1780\u17B6\u179A\u1794\u1784\u17D2\u17A0\u17C4\u17C7\u178F\u17D2\u179A\u17BC\u179C\u1794\u17B6\u1793\u1794\u17C4\u17C7\u1794\u1784\u17CB",
    labelFileProcessingError:
        "\u1798\u17B6\u1793\u1794\u1789\u17D2\u17A0\u17B6\u1780\u17C6\u17A1\u17BB\u1784\u1796\u17C1\u179B\u1780\u17C6\u1796\u17BB\u1784\u1795\u17D2\u1791\u17BB\u1780\u17A1\u17BE\u1784",
    labelFileProcessingRevertError:
        "\u1798\u17B6\u1793\u1794\u1789\u17D2\u17A0\u17B6\u1780\u17C6\u17A1\u17BB\u1784\u1796\u17C1\u179B\u178F\u17D2\u179A\u17A1\u1794\u17CB",
    labelFileRemoveError:
        "\u1798\u17B6\u1793\u1794\u1789\u17D2\u17A0\u17B6\u1780\u17C6\u17A1\u17BB\u1784\u1796\u17C1\u179B\u178A\u1780\u1785\u17C1\u1789",
    labelTapToCancel:
        "\u1785\u17BB\u1785\u178A\u17BE\u1798\u17D2\u1794\u17B8\u1794\u17C4\u17C7\u1794\u1784\u17CB",
    labelTapToRetry:
        "\u1785\u17BB\u1785\u178A\u17BE\u1798\u17D2\u1794\u17B8\u1796\u17D2\u1799\u17B6\u1799\u17B6\u1798\u1798\u17D2\u178F\u1784\u1791\u17C0\u178F",
    labelTapToUndo:
        "\u1785\u17BB\u1785\u178A\u17BE\u1798\u17D2\u1794\u17B8\u1798\u17B7\u1793\u1792\u17D2\u179C\u17BE\u179C\u17B7\u1789",
    labelButtonRemoveItem: "\u1799\u1780\u1785\u17C1\u1789",
    labelButtonAbortItemLoad: "\u1794\u17C4\u17C7\u1794\u1784\u17CB",
    labelButtonRetryItemLoad:
        "\u1796\u17D2\u1799\u17B6\u1799\u17B6\u1798\u1798\u17D2\u178F\u1784\u1791\u17C0\u178F",
    labelButtonAbortItemProcessing: "\u1794\u17C4\u17C7\u1794\u1784\u17CB",
    labelButtonUndoItemProcessing:
        "\u1798\u17B7\u1793\u1792\u17D2\u179C\u17BE\u179C\u17B7\u1789",
    labelButtonRetryItemProcessing:
        "\u1796\u17D2\u1799\u17B6\u1799\u17B6\u1798\u1798\u17D2\u178F\u1784\u1791\u17C0\u178F",
    labelButtonProcessItem: "\u1795\u17D2\u1791\u17BB\u1780\u17A1\u17BE\u1784",
    labelMaxFileSizeExceeded:
        "\u17AF\u1780\u179F\u17B6\u179A\u1792\u17C6\u1796\u17C1\u1780",
    labelMaxFileSize:
        "\u1791\u17C6\u17A0\u17C6\u17AF\u1780\u179F\u17B6\u179A\u17A2\u178F\u17B7\u1794\u179A\u1798\u17B6\u1782\u17BA {filesize}",
    labelMaxTotalFileSizeExceeded:
        "\u179B\u17BE\u179F\u1791\u17C6\u17A0\u17C6\u179F\u179A\u17BB\u1794\u17A2\u178F\u17B7\u1794\u179A\u1798\u17B6",
    labelMaxTotalFileSize:
        "\u1791\u17C6\u17A0\u17C6\u17AF\u1780\u179F\u17B6\u179A\u179F\u179A\u17BB\u1794\u17A2\u178F\u17B7\u1794\u179A\u1798\u17B6\u1782\u17BA {filesize}",
    labelFileTypeNotAllowed:
        "\u1794\u17D2\u179A\u1797\u17C1\u1791\u17AF\u1780\u179F\u17B6\u179A\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C",
    fileValidateTypeLabelExpectedTypes:
        "\u179A\u17C6\u1796\u17B9\u1784\u1790\u17B6 {allButLastType} \u17AC {lastType}",
    imageValidateSizeLabelFormatError:
        "\u1794\u17D2\u179A\u1797\u17C1\u1791\u179A\u17BC\u1794\u1797\u17B6\u1796\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C",
    imageValidateSizeLabelImageSizeTooSmall:
        "\u179A\u17BC\u1794\u1797\u17B6\u1796\u178F\u17BC\u1785\u1796\u17C1\u1780",
    imageValidateSizeLabelImageSizeTooBig:
        "\u179A\u17BC\u1794\u1797\u17B6\u1796\u1792\u17C6\u1796\u17C1\u1780",
    imageValidateSizeLabelExpectedMinSize:
        "\u1791\u17C6\u17A0\u17C6\u17A2\u1794\u17D2\u1794\u1794\u179A\u1798\u17B6\u1782\u17BA {minWidth} \xD7 {minHeight}",
    imageValidateSizeLabelExpectedMaxSize:
        "\u1791\u17C6\u17A0\u17C6\u17A2\u178F\u17B7\u1794\u179A\u1798\u17B6\u1782\u17BA {maxWidth} \xD7 {maxHeight}",
    imageValidateSizeLabelImageResolutionTooLow:
        "\u1782\u17BB\u178E\u1797\u17B6\u1796\u1794\u1784\u17D2\u17A0\u17B6\u1789\u1791\u17B6\u1794\u1796\u17C1\u1780",
    imageValidateSizeLabelImageResolutionTooHigh:
        "\u1782\u17BB\u178E\u1797\u17B6\u1796\u1794\u1784\u17D2\u17A0\u17B6\u1789\u1781\u17D2\u1796\u179F\u17CB\u1796\u17C1\u1780",
    imageValidateSizeLabelExpectedMinResolution:
        "\u1782\u17BB\u178E\u1797\u17B6\u1796\u1794\u1784\u17D2\u17A0\u17B6\u1789\u17A2\u1794\u17D2\u1794\u1794\u179A\u1798\u17B6\u1782\u17BA {minResolution}",
    imageValidateSizeLabelExpectedMaxResolution:
        "\u1782\u17BB\u178E\u1797\u17B6\u1796\u1794\u1784\u17D2\u17A0\u17B6\u1789\u17A2\u178F\u17B7\u1794\u179A\u1798\u17B6\u1782\u17BA {maxResolution}",
};
const Dl = {
    labelIdle:
        'Drag & Drop je bestanden of <span class="filepond--label-action"> Bladeren </span>',
    labelInvalidField: "Veld bevat ongeldige bestanden",
    labelFileWaitingForSize: "Wachten op grootte",
    labelFileSizeNotAvailable: "Grootte niet beschikbaar",
    labelFileLoading: "Laden",
    labelFileLoadError: "Fout tijdens laden",
    labelFileProcessing: "Uploaden",
    labelFileProcessingComplete: "Upload afgerond",
    labelFileProcessingAborted: "Upload geannuleerd",
    labelFileProcessingError: "Fout tijdens upload",
    labelFileProcessingRevertError: "Fout bij herstellen",
    labelFileRemoveError: "Fout bij verwijderen",
    labelTapToCancel: "tik om te annuleren",
    labelTapToRetry: "tik om opnieuw te proberen",
    labelTapToUndo: "tik om ongedaan te maken",
    labelButtonRemoveItem: "Verwijderen",
    labelButtonAbortItemLoad: "Afbreken",
    labelButtonRetryItemLoad: "Opnieuw proberen",
    labelButtonAbortItemProcessing: "Annuleren",
    labelButtonUndoItemProcessing: "Ongedaan maken",
    labelButtonRetryItemProcessing: "Opnieuw proberen",
    labelButtonProcessItem: "Upload",
    labelMaxFileSizeExceeded: "Bestand is te groot",
    labelMaxFileSize: "Maximale bestandsgrootte is {filesize}",
    labelMaxTotalFileSizeExceeded: "Maximale totale grootte overschreden",
    labelMaxTotalFileSize: "Maximale totale bestandsgrootte is {filesize}",
    labelFileTypeNotAllowed: "Ongeldig bestandstype",
    fileValidateTypeLabelExpectedTypes:
        "Verwacht {allButLastType} of {lastType}",
    imageValidateSizeLabelFormatError: "Afbeeldingstype niet ondersteund",
    imageValidateSizeLabelImageSizeTooSmall: "Afbeelding is te klein",
    imageValidateSizeLabelImageSizeTooBig: "Afbeelding is te groot",
    imageValidateSizeLabelExpectedMinSize:
        "Minimale afmeting is {minWidth} \xD7 {minHeight}",
    imageValidateSizeLabelExpectedMaxSize:
        "Maximale afmeting is {maxWidth} \xD7 {maxHeight}",
    imageValidateSizeLabelImageResolutionTooLow: "Resolutie is te laag",
    imageValidateSizeLabelImageResolutionTooHigh: "Resolution is too high",
    imageValidateSizeLabelExpectedMinResolution:
        "Minimale resolutie is {minResolution}",
    imageValidateSizeLabelExpectedMaxResolution:
        "Maximale resolutie is {maxResolution}",
};
const Fl = {
    labelIdle:
        'Dra og slipp filene dine, eller <span class="filepond--label-action"> Bla gjennom... </span>',
    labelInvalidField: "Feltet inneholder ugyldige filer",
    labelFileWaitingForSize: "Venter p\xE5 st\xF8rrelse",
    labelFileSizeNotAvailable: "St\xF8rrelse ikke tilgjengelig",
    labelFileLoading: "Laster",
    labelFileLoadError: "Feil under lasting",
    labelFileProcessing: "Laster opp",
    labelFileProcessingComplete: "Opplasting ferdig",
    labelFileProcessingAborted: "Opplasting avbrutt",
    labelFileProcessingError: "Feil under opplasting",
    labelFileProcessingRevertError: "Feil under reversering",
    labelFileRemoveError: "Feil under flytting",
    labelTapToCancel: "klikk for \xE5 avbryte",
    labelTapToRetry: "klikk for \xE5 pr\xF8ve p\xE5 nytt",
    labelTapToUndo: "klikk for \xE5 angre",
    labelButtonRemoveItem: "Fjern",
    labelButtonAbortItemLoad: "Avbryt",
    labelButtonRetryItemLoad: "Pr\xF8v p\xE5 nytt",
    labelButtonAbortItemProcessing: "Avbryt",
    labelButtonUndoItemProcessing: "Angre",
    labelButtonRetryItemProcessing: "Pr\xF8v p\xE5 nytt",
    labelButtonProcessItem: "Last opp",
    labelMaxFileSizeExceeded: "Filen er for stor",
    labelMaxFileSize: "Maksimal filst\xF8rrelse er {filesize}",
    labelMaxTotalFileSizeExceeded: "Maksimal total st\xF8rrelse oversteget",
    labelMaxTotalFileSize: "Maksimal total st\xF8rrelse er {filesize}",
    labelFileTypeNotAllowed: "Ugyldig filtype",
    fileValidateTypeLabelExpectedTypes:
        "Forventer {allButLastType} eller {lastType}",
    imageValidateSizeLabelFormatError: "Bildeformat ikke st\xF8ttet",
    imageValidateSizeLabelImageSizeTooSmall: "Bildet er for lite",
    imageValidateSizeLabelImageSizeTooBig: "Bildet er for stort",
    imageValidateSizeLabelExpectedMinSize:
        "Minimumsst\xF8rrelse er {minWidth} \xD7 {minHeight}",
    imageValidateSizeLabelExpectedMaxSize:
        "Maksimumsst\xF8rrelse er {maxWidth} \xD7 {maxHeight}",
    imageValidateSizeLabelImageResolutionTooLow: "Oppl\xF8sningen er for lav",
    imageValidateSizeLabelImageResolutionTooHigh:
        "Oppl\xF8sningen er for h\xF8y",
    imageValidateSizeLabelExpectedMinResolution:
        "Minimum oppl\xF8sning er {minResolution}",
    imageValidateSizeLabelExpectedMaxResolution:
        "Maksimal oppl\xF8sning er {maxResolution}",
};
const Cl = {
    labelIdle:
        'Przeci\u0105gnij i upu\u015B\u0107 lub <span class="filepond--label-action">wybierz</span> pliki',
    labelInvalidField: "Nieprawid\u0142owe pliki",
    labelFileWaitingForSize: "Pobieranie rozmiaru",
    labelFileSizeNotAvailable: "Nieznany rozmiar",
    labelFileLoading: "Wczytywanie",
    labelFileLoadError: "B\u0142\u0105d wczytywania",
    labelFileProcessing: "Przesy\u0142anie",
    labelFileProcessingComplete: "Przes\u0142ano",
    labelFileProcessingAborted: "Przerwano",
    labelFileProcessingError: "Przesy\u0142anie nie powiod\u0142o si\u0119",
    labelFileProcessingRevertError: "Co\u015B posz\u0142o nie tak",
    labelFileRemoveError: "Nieudane usuni\u0119cie",
    labelTapToCancel: "Anuluj",
    labelTapToRetry: "Pon\xF3w",
    labelTapToUndo: "Cofnij",
    labelButtonRemoveItem: "Usu\u0144",
    labelButtonAbortItemLoad: "Przerwij",
    labelButtonRetryItemLoad: "Pon\xF3w",
    labelButtonAbortItemProcessing: "Anuluj",
    labelButtonUndoItemProcessing: "Cofnij",
    labelButtonRetryItemProcessing: "Pon\xF3w",
    labelButtonProcessItem: "Prze\u015Blij",
    labelMaxFileSizeExceeded: "Plik jest zbyt du\u017Cy",
    labelMaxFileSize: "Dopuszczalna wielko\u015B\u0107 pliku to {filesize}",
    labelMaxTotalFileSizeExceeded:
        "Przekroczono \u0142\u0105czny rozmiar plik\xF3w",
    labelMaxTotalFileSize:
        "\u0141\u0105czny rozmiar plik\xF3w nie mo\u017Ce przekroczy\u0107 {filesize}",
    labelFileTypeNotAllowed: "Niedozwolony rodzaj pliku",
    fileValidateTypeLabelExpectedTypes:
        "Oczekiwano {allButLastType} lub {lastType}",
    imageValidateSizeLabelFormatError: "Nieobs\u0142ugiwany format obrazu",
    imageValidateSizeLabelImageSizeTooSmall: "Obraz jest zbyt ma\u0142y",
    imageValidateSizeLabelImageSizeTooBig: "Obraz jest zbyt du\u017Cy",
    imageValidateSizeLabelExpectedMinSize:
        "Minimalne wymiary obrazu to {minWidth}\xD7{minHeight}",
    imageValidateSizeLabelExpectedMaxSize:
        "Maksymalna wymiary obrazu to {maxWidth}\xD7{maxHeight}",
    imageValidateSizeLabelImageResolutionTooLow:
        "Rozdzielczo\u015B\u0107 jest zbyt niska",
    imageValidateSizeLabelImageResolutionTooHigh:
        "Rozdzielczo\u015B\u0107 jest zbyt wysoka",
    imageValidateSizeLabelExpectedMinResolution:
        "Minimalna rozdzielczo\u015B\u0107 to {minResolution}",
    imageValidateSizeLabelExpectedMaxResolution:
        "Maksymalna rozdzielczo\u015B\u0107 to {maxResolution}",
};
const _i = {
    labelIdle:
        'Arraste e solte os arquivos ou <span class="filepond--label-action"> Clique aqui </span>',
    labelInvalidField: "Arquivos inv\xE1lidos",
    labelFileWaitingForSize: "Calculando o tamanho do arquivo",
    labelFileSizeNotAvailable: "Tamanho do arquivo indispon\xEDvel",
    labelFileLoading: "Carregando",
    labelFileLoadError: "Erro durante o carregamento",
    labelFileProcessing: "Enviando",
    labelFileProcessingComplete: "Envio finalizado",
    labelFileProcessingAborted: "Envio cancelado",
    labelFileProcessingError: "Erro durante o envio",
    labelFileProcessingRevertError: "Erro ao reverter o envio",
    labelFileRemoveError: "Erro ao remover o arquivo",
    labelTapToCancel: "clique para cancelar",
    labelTapToRetry: "clique para reenviar",
    labelTapToUndo: "clique para desfazer",
    labelButtonRemoveItem: "Remover",
    labelButtonAbortItemLoad: "Abortar",
    labelButtonRetryItemLoad: "Reenviar",
    labelButtonAbortItemProcessing: "Cancelar",
    labelButtonUndoItemProcessing: "Desfazer",
    labelButtonRetryItemProcessing: "Reenviar",
    labelButtonProcessItem: "Enviar",
    labelMaxFileSizeExceeded: "Arquivo \xE9 muito grande",
    labelMaxFileSize: "O tamanho m\xE1ximo permitido: {filesize}",
    labelMaxTotalFileSizeExceeded: "Tamanho total dos arquivos excedido",
    labelMaxTotalFileSize: "Tamanho total permitido: {filesize}",
    labelFileTypeNotAllowed: "Tipo de arquivo inv\xE1lido",
    fileValidateTypeLabelExpectedTypes:
        "Tipos de arquivo suportados s\xE3o {allButLastType} ou {lastType}",
    imageValidateSizeLabelFormatError: "Tipo de imagem inv\xE1lida",
    imageValidateSizeLabelImageSizeTooSmall: "Imagem muito pequena",
    imageValidateSizeLabelImageSizeTooBig: "Imagem muito grande",
    imageValidateSizeLabelExpectedMinSize:
        "Tamanho m\xEDnimo permitida: {minWidth} \xD7 {minHeight}",
    imageValidateSizeLabelExpectedMaxSize:
        "Tamanho m\xE1ximo permitido: {maxWidth} \xD7 {maxHeight}",
    imageValidateSizeLabelImageResolutionTooLow: "Resolu\xE7\xE3o muito baixa",
    imageValidateSizeLabelImageResolutionTooHigh: "Resolu\xE7\xE3o muito alta",
    imageValidateSizeLabelExpectedMinResolution:
        "Resolu\xE7\xE3o m\xEDnima permitida: {minResolution}",
    imageValidateSizeLabelExpectedMaxResolution:
        "Resolu\xE7\xE3o m\xE1xima permitida: {maxResolution}",
};
const zl = {
    labelIdle:
        'Trage \u0219i plaseaz\u0103 fi\u0219iere sau <span class="filepond--label-action"> Caut\u0103-le </span>',
    labelInvalidField:
        "C\xE2mpul con\u021Bine fi\u0219iere care nu sunt valide",
    labelFileWaitingForSize: "\xCEn a\u0219teptarea dimensiunii",
    labelFileSizeNotAvailable: "Dimensiunea nu este diponibil\u0103",
    labelFileLoading: "Se \xEEncarc\u0103",
    labelFileLoadError: "Eroare la \xEEnc\u0103rcare",
    labelFileProcessing: "Se \xEEncarc\u0103",
    labelFileProcessingComplete: "\xCEnc\u0103rcare finalizat\u0103",
    labelFileProcessingAborted: "\xCEnc\u0103rcare anulat\u0103",
    labelFileProcessingError: "Eroare la \xEEnc\u0103rcare",
    labelFileProcessingRevertError: "Eroare la anulare",
    labelFileRemoveError: "Eroare la \u015Ftergere",
    labelTapToCancel: "apas\u0103 pentru a anula",
    labelTapToRetry: "apas\u0103 pentru a re\xEEncerca",
    labelTapToUndo: "apas\u0103 pentru a anula",
    labelButtonRemoveItem: "\u015Eterge",
    labelButtonAbortItemLoad: "Anuleaz\u0103",
    labelButtonRetryItemLoad: "Re\xEEncearc\u0103",
    labelButtonAbortItemProcessing: "Anuleaz\u0103",
    labelButtonUndoItemProcessing: "Anuleaz\u0103",
    labelButtonRetryItemProcessing: "Re\xEEncearc\u0103",
    labelButtonProcessItem: "\xCEncarc\u0103",
    labelMaxFileSizeExceeded: "Fi\u0219ierul este prea mare",
    labelMaxFileSize:
        "Dimensiunea maxim\u0103 a unui fi\u0219ier este de {filesize}",
    labelMaxTotalFileSizeExceeded:
        "Dimensiunea total\u0103 maxim\u0103 a fost dep\u0103\u0219it\u0103",
    labelMaxTotalFileSize:
        "Dimensiunea total\u0103 maxim\u0103 a fi\u0219ierelor este de {filesize}",
    labelFileTypeNotAllowed: "Tipul fi\u0219ierului nu este valid",
    fileValidateTypeLabelExpectedTypes:
        "Se a\u0219teapt\u0103 {allButLastType} sau {lastType}",
    imageValidateSizeLabelFormatError: "Formatul imaginii nu este acceptat",
    imageValidateSizeLabelImageSizeTooSmall: "Imaginea este prea mic\u0103",
    imageValidateSizeLabelImageSizeTooBig: "Imaginea este prea mare",
    imageValidateSizeLabelExpectedMinSize:
        "M\u0103rimea minim\u0103 este de {maxWidth} x {maxHeight}",
    imageValidateSizeLabelExpectedMaxSize:
        "M\u0103rimea maxim\u0103 este de {maxWidth} x {maxHeight}",
    imageValidateSizeLabelImageResolutionTooLow:
        "Rezolu\u021Bia este prea mic\u0103",
    imageValidateSizeLabelImageResolutionTooHigh:
        "Rezolu\u021Bia este prea mare",
    imageValidateSizeLabelExpectedMinResolution:
        "Rezolu\u021Bia minim\u0103 este de {minResolution}",
    imageValidateSizeLabelExpectedMaxResolution:
        "Rezolu\u021Bia maxim\u0103 este de {maxResolution}",
};
const Nl = {
    labelIdle:
        '\u041F\u0435\u0440\u0435\u0442\u0430\u0449\u0438\u0442\u0435 \u0444\u0430\u0439\u043B\u044B \u0438\u043B\u0438 <span class="filepond--label-action"> \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 </span>',
    labelInvalidField:
        "\u041F\u043E\u043B\u0435 \u0441\u043E\u0434\u0435\u0440\u0436\u0438\u0442 \u043D\u0435\u0434\u043E\u043F\u0443\u0441\u0442\u0438\u043C\u044B\u0435 \u0444\u0430\u0439\u043B\u044B",
    labelFileWaitingForSize:
        "\u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u0440\u0430\u0437\u043C\u0435\u0440",
    labelFileSizeNotAvailable:
        "\u0420\u0430\u0437\u043C\u0435\u0440 \u043D\u0435 \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0435\u0442\u0441\u044F",
    labelFileLoading: "\u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435",
    labelFileLoadError:
        "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043E\u0436\u0438\u0434\u0430\u043D\u0438\u0438",
    labelFileProcessing: "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430",
    labelFileProcessingComplete:
        "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u0430",
    labelFileProcessingAborted:
        "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u043E\u0442\u043C\u0435\u043D\u0435\u043D\u0430",
    labelFileProcessingError:
        "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0435",
    labelFileProcessingRevertError:
        "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0432\u043E\u0437\u0432\u0440\u0430\u0442\u0435",
    labelFileRemoveError:
        "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0443\u0434\u0430\u043B\u0435\u043D\u0438\u0438",
    labelTapToCancel:
        "\u043D\u0430\u0436\u043C\u0438\u0442\u0435 \u0434\u043B\u044F \u043E\u0442\u043C\u0435\u043D\u044B",
    labelTapToRetry:
        "\u043D\u0430\u0436\u043C\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u043F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u044C \u043F\u043E\u043F\u044B\u0442\u043A\u0443",
    labelTapToUndo:
        "\u043D\u0430\u0436\u043C\u0438\u0442\u0435 \u0434\u043B\u044F \u043E\u0442\u043C\u0435\u043D\u044B \u043F\u043E\u0441\u043B\u0435\u0434\u043D\u0435\u0433\u043E \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F",
    labelButtonRemoveItem: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C",
    labelButtonAbortItemLoad:
        "\u041F\u0440\u0435\u043A\u0440\u0430\u0449\u0435\u043D\u043E",
    labelButtonRetryItemLoad:
        "\u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u0435 \u043F\u043E\u043F\u044B\u0442\u043A\u0443",
    labelButtonAbortItemProcessing: "\u041E\u0442\u043C\u0435\u043D\u0430",
    labelButtonUndoItemProcessing:
        "\u041E\u0442\u043C\u0435\u043D\u0430 \u043F\u043E\u0441\u043B\u0435\u0434\u043D\u0435\u0433\u043E \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F",
    labelButtonRetryItemProcessing:
        "\u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u0435 \u043F\u043E\u043F\u044B\u0442\u043A\u0443",
    labelButtonProcessItem: "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430",
    labelMaxFileSizeExceeded:
        "\u0424\u0430\u0439\u043B \u0441\u043B\u0438\u0448\u043A\u043E\u043C \u0431\u043E\u043B\u044C\u0448\u043E\u0439",
    labelMaxFileSize:
        "\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u044B\u0439 \u0440\u0430\u0437\u043C\u0435\u0440 \u0444\u0430\u0439\u043B\u0430: {filesize}",
    labelMaxTotalFileSizeExceeded:
        "\u041F\u0440\u0435\u0432\u044B\u0448\u0435\u043D \u043C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u044B\u0439 \u0440\u0430\u0437\u043C\u0435\u0440",
    labelMaxTotalFileSize:
        "\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u044B\u0439 \u0440\u0430\u0437\u043C\u0435\u0440 \u0444\u0430\u0439\u043B\u0430: {filesize}",
    labelFileTypeNotAllowed:
        "\u0424\u0430\u0439\u043B \u043D\u0435\u0432\u0435\u0440\u043D\u043E\u0433\u043E \u0442\u0438\u043F\u0430",
    fileValidateTypeLabelExpectedTypes:
        "\u041E\u0436\u0438\u0434\u0430\u0435\u0442\u0441\u044F {allButLastType} \u0438\u043B\u0438 {lastType}",
    imageValidateSizeLabelFormatError:
        "\u0422\u0438\u043F \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F \u043D\u0435 \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0435\u0442\u0441\u044F",
    imageValidateSizeLabelImageSizeTooSmall:
        "\u0418\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u0441\u043B\u0438\u0448\u043A\u043E\u043C \u043C\u0430\u043B\u0435\u043D\u044C\u043A\u043E\u0435",
    imageValidateSizeLabelImageSizeTooBig:
        "\u0418\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u0441\u043B\u0438\u0448\u043A\u043E\u043C \u0431\u043E\u043B\u044C\u0448\u043E\u0435",
    imageValidateSizeLabelExpectedMinSize:
        "\u041C\u0438\u043D\u0438\u043C\u0430\u043B\u044C\u043D\u044B\u0439 \u0440\u0430\u0437\u043C\u0435\u0440: {minWidth} \xD7 {minHeight}",
    imageValidateSizeLabelExpectedMaxSize:
        "\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u044B\u0439 \u0440\u0430\u0437\u043C\u0435\u0440: {maxWidth} \xD7 {maxHeight}",
    imageValidateSizeLabelImageResolutionTooLow:
        "\u0420\u0430\u0437\u0440\u0435\u0448\u0435\u043D\u0438\u0435 \u0441\u043B\u0438\u0448\u043A\u043E\u043C \u043D\u0438\u0437\u043A\u043E\u0435",
    imageValidateSizeLabelImageResolutionTooHigh:
        "\u0420\u0430\u0437\u0440\u0435\u0448\u0435\u043D\u0438\u0435 \u0441\u043B\u0438\u0448\u043A\u043E\u043C \u0432\u044B\u0441\u043E\u043A\u043E\u0435",
    imageValidateSizeLabelExpectedMinResolution:
        "\u041C\u0438\u043D\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0435 \u0440\u0430\u0437\u0440\u0435\u0448\u0435\u043D\u0438\u0435: {minResolution}",
    imageValidateSizeLabelExpectedMaxResolution:
        "\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0435 \u0440\u0430\u0437\u0440\u0435\u0448\u0435\u043D\u0438\u0435: {maxResolution}",
};
const Bl = {
    labelIdle:
        'Drag och sl\xE4pp dina filer eller <span class="filepond--label-action"> Bl\xE4ddra </span>',
    labelInvalidField: "F\xE4ltet inneh\xE5ller felaktiga filer",
    labelFileWaitingForSize: "V\xE4ntar p\xE5 storlek",
    labelFileSizeNotAvailable: "Storleken finns inte tillg\xE4nglig",
    labelFileLoading: "Laddar",
    labelFileLoadError: "Fel under laddning",
    labelFileProcessing: "Laddar upp",
    labelFileProcessingComplete: "Uppladdning klar",
    labelFileProcessingAborted: "Uppladdning avbruten",
    labelFileProcessingError: "Fel under uppladdning",
    labelFileProcessingRevertError: "Fel under \xE5terst\xE4llning",
    labelFileRemoveError: "Fel under borttagning",
    labelTapToCancel: "tryck f\xF6r att avbryta",
    labelTapToRetry: "tryck f\xF6r att f\xF6rs\xF6ka igen",
    labelTapToUndo: "tryck f\xF6r att \xE5ngra",
    labelButtonRemoveItem: "Tabort",
    labelButtonAbortItemLoad: "Avbryt",
    labelButtonRetryItemLoad: "F\xF6rs\xF6k igen",
    labelButtonAbortItemProcessing: "Avbryt",
    labelButtonUndoItemProcessing: "\xC5ngra",
    labelButtonRetryItemProcessing: "F\xF6rs\xF6k igen",
    labelButtonProcessItem: "Ladda upp",
    labelMaxFileSizeExceeded: "Filen \xE4r f\xF6r stor",
    labelMaxFileSize: "St\xF6rsta till\xE5tna filstorlek \xE4r {filesize}",
    labelMaxTotalFileSizeExceeded: "Maximal uppladdningsstorlek uppn\xE5d",
    labelMaxTotalFileSize: "Maximal uppladdningsstorlek \xE4r {filesize}",
    labelFileTypeNotAllowed: "Felaktig filtyp",
    fileValidateTypeLabelExpectedTypes:
        "Godk\xE4nda filtyper {allButLastType} eller {lastType}",
    imageValidateSizeLabelFormatError: "Bildtypen saknar st\xF6d",
    imageValidateSizeLabelImageSizeTooSmall: "Bilden \xE4r f\xF6r liten",
    imageValidateSizeLabelImageSizeTooBig: "Bilden \xE4r f\xF6r stor",
    imageValidateSizeLabelExpectedMinSize:
        "Minimal storlek \xE4r {minWidth} \xD7 {minHeight}",
    imageValidateSizeLabelExpectedMaxSize:
        "Maximal storlek \xE4r {maxWidth} \xD7 {maxHeight}",
    imageValidateSizeLabelImageResolutionTooLow:
        "Uppl\xF6sningen \xE4r f\xF6r l\xE5g",
    imageValidateSizeLabelImageResolutionTooHigh:
        "Uppl\xF6sningen \xE4r f\xF6r h\xF6g",
    imageValidateSizeLabelExpectedMinResolution:
        "Minsta till\xE5tna uppl\xF6sning \xE4r {minResolution}",
    imageValidateSizeLabelExpectedMaxResolution:
        "H\xF6gsta till\xE5tna uppl\xF6sning \xE4r {maxResolution}",
};
const Vl = {
    labelIdle:
        'Dosyan\u0131z\u0131 S\xFCr\xFCkleyin & B\u0131rak\u0131n ya da <span class="filepond--label-action"> Se\xE7in </span>',
    labelInvalidField: "Alan ge\xE7ersiz dosyalar i\xE7eriyor",
    labelFileWaitingForSize: "Boyut hesaplan\u0131yor",
    labelFileSizeNotAvailable: "Boyut mevcut de\u011Fil",
    labelFileLoading: "Y\xFCkleniyor",
    labelFileLoadError: "Y\xFCkleme s\u0131ras\u0131nda hata olu\u015Ftu",
    labelFileProcessing: "Y\xFCkleniyor",
    labelFileProcessingComplete: "Y\xFCkleme tamamland\u0131",
    labelFileProcessingAborted: "Y\xFCkleme iptal edildi",
    labelFileProcessingError: "Y\xFCklerken hata olu\u015Ftu",
    labelFileProcessingRevertError: "Geri \xE7ekerken hata olu\u015Ftu",
    labelFileRemoveError: "Kald\u0131r\u0131rken hata olu\u015Ftu",
    labelTapToCancel: "\u0130ptal etmek i\xE7in t\u0131klay\u0131n",
    labelTapToRetry: "Tekrar denemek i\xE7in t\u0131klay\u0131n",
    labelTapToUndo: "Geri almak i\xE7in t\u0131klay\u0131n",
    labelButtonRemoveItem: "Kald\u0131r",
    labelButtonAbortItemLoad: "\u0130ptal Et",
    labelButtonRetryItemLoad: "Tekrar dene",
    labelButtonAbortItemProcessing: "\u0130ptal et",
    labelButtonUndoItemProcessing: "Geri Al",
    labelButtonRetryItemProcessing: "Tekrar dene",
    labelButtonProcessItem: "Y\xFCkle",
    labelMaxFileSizeExceeded: "Dosya \xE7ok b\xFCy\xFCk",
    labelMaxFileSize: "En fazla dosya boyutu: {filesize}",
    labelMaxTotalFileSizeExceeded: "Maximum boyut a\u015F\u0131ld\u0131",
    labelMaxTotalFileSize: "Maximum dosya boyutu :{filesize}",
    labelFileTypeNotAllowed: "Ge\xE7ersiz dosya tipi",
    fileValidateTypeLabelExpectedTypes:
        "\u015Eu {allButLastType} ya da \u015Fu dosya olmas\u0131 gerekir: {lastType}",
    imageValidateSizeLabelFormatError: "Resim tipi desteklenmiyor",
    imageValidateSizeLabelImageSizeTooSmall: "Resim \xE7ok k\xFC\xE7\xFCk",
    imageValidateSizeLabelImageSizeTooBig: "Resim \xE7ok b\xFCy\xFCk",
    imageValidateSizeLabelExpectedMinSize:
        "Minimum boyut {minWidth} \xD7 {minHeight}",
    imageValidateSizeLabelExpectedMaxSize:
        "Maximum boyut {maxWidth} \xD7 {maxHeight}",
    imageValidateSizeLabelImageResolutionTooLow:
        "\xC7\xF6z\xFCn\xFCrl\xFCk \xE7ok d\xFC\u015F\xFCk",
    imageValidateSizeLabelImageResolutionTooHigh:
        "\xC7\xF6z\xFCn\xFCrl\xFCk \xE7ok y\xFCksek",
    imageValidateSizeLabelExpectedMinResolution:
        "Minimum \xE7\xF6z\xFCn\xFCrl\xFCk {minResolution}",
    imageValidateSizeLabelExpectedMaxResolution:
        "Maximum \xE7\xF6z\xFCn\xFCrl\xFCk {maxResolution}",
};
const Gl = {
    labelIdle:
        '\u041F\u0435\u0440\u0435\u0442\u044F\u0433\u043D\u0456\u0442\u044C \u0444\u0430\u0439\u043B\u0438 \u0430\u0431\u043E <span class="filepond--label-action"> \u0432\u0438\u0431\u0435\u0440\u0456\u0442\u044C </span>',
    labelInvalidField:
        "\u041F\u043E\u043B\u0435 \u043C\u0456\u0441\u0442\u0438\u0442\u044C \u043D\u0435\u0434\u043E\u043F\u0443\u0441\u0442\u0438\u043C\u0456 \u0444\u0430\u0439\u043B\u0438",
    labelFileWaitingForSize:
        "\u0412\u043A\u0430\u0436\u0456\u0442\u044C \u0440\u043E\u0437\u043C\u0456\u0440",
    labelFileSizeNotAvailable:
        "\u0420\u043E\u0437\u043C\u0456\u0440 \u043D\u0435 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u0438\u0439",
    labelFileLoading:
        "\u041E\u0447\u0456\u043A\u0443\u0432\u0430\u043D\u043D\u044F",
    labelFileLoadError:
        "\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u043F\u0440\u0438 \u043E\u0447\u0456\u043A\u0443\u0432\u0430\u043D\u043D\u0456",
    labelFileProcessing:
        "\u0417\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F",
    labelFileProcessingComplete:
        "\u0417\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u043E",
    labelFileProcessingAborted:
        "\u0417\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F \u0441\u043A\u0430\u0441\u043E\u0432\u0430\u043D\u043E",
    labelFileProcessingError:
        "\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u043F\u0440\u0438 \u0437\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u0456",
    labelFileProcessingRevertError:
        "\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u043F\u0440\u0438 \u0432\u0456\u0434\u043D\u043E\u0432\u043B\u0435\u043D\u043D\u0456",
    labelFileRemoveError:
        "\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u043F\u0440\u0438 \u0432\u0438\u0434\u0430\u043B\u0435\u043D\u043D\u0456",
    labelTapToCancel: "\u0412\u0456\u0434\u043C\u0456\u043D\u0438\u0442\u0438",
    labelTapToRetry:
        "\u041D\u0430\u0442\u0438\u0441\u043D\u0456\u0442\u044C, \u0449\u043E\u0431 \u043F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u0438 \u0441\u043F\u0440\u043E\u0431\u0443",
    labelTapToUndo:
        "\u041D\u0430\u0442\u0438\u0441\u043D\u0456\u0442\u044C, \u0449\u043E\u0431 \u0432\u0456\u0434\u043C\u0456\u043D\u0438\u0442\u0438 \u043E\u0441\u0442\u0430\u043D\u043D\u044E \u0434\u0456\u044E",
    labelButtonRemoveItem: "\u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438",
    labelButtonAbortItemLoad:
        "\u0412\u0456\u0434\u043C\u0456\u043D\u0438\u0442\u0438",
    labelButtonRetryItemLoad:
        "\u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u0438 \u0441\u043F\u0440\u043E\u0431\u0443",
    labelButtonAbortItemProcessing:
        "\u0412\u0456\u0434\u043C\u0456\u043D\u0438\u0442\u0438",
    labelButtonUndoItemProcessing:
        "\u0412\u0456\u0434\u043C\u0456\u043D\u0438\u0442\u0438 \u043E\u0441\u0442\u0430\u043D\u043D\u044E \u0434\u0456\u044E",
    labelButtonRetryItemProcessing:
        "\u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u0438 \u0441\u043F\u0440\u043E\u0431\u0443",
    labelButtonProcessItem:
        "\u0417\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F",
    labelMaxFileSizeExceeded:
        "\u0424\u0430\u0439\u043B \u0437\u0430\u043D\u0430\u0434\u0442\u043E \u0432\u0435\u043B\u0438\u043A\u0438\u0439",
    labelMaxFileSize:
        "\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u0438\u0439 \u0440\u043E\u0437\u043C\u0456\u0440 \u0444\u0430\u0439\u043B\u0443: {filesize}",
    labelMaxTotalFileSizeExceeded:
        "\u041F\u0435\u0440\u0435\u0432\u0438\u0449\u0435\u043D\u043E \u043C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u0438\u0439 \u0437\u0430\u0433\u0430\u043B\u044C\u043D\u0438\u0439 \u0440\u043E\u0437\u043C\u0456\u0440",
    labelMaxTotalFileSize:
        "\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u0438\u0439 \u0437\u0430\u0433\u0430\u043B\u044C\u043D\u0438\u0439 \u0440\u043E\u0437\u043C\u0456\u0440: {filesize}",
    labelFileTypeNotAllowed:
        "\u0424\u043E\u0440\u043C\u0430\u0442 \u0444\u0430\u0439\u043B\u0443 \u043D\u0435 \u043F\u0456\u0434\u0442\u0440\u0438\u043C\u0443\u0454\u0442\u044C\u0441\u044F",
    fileValidateTypeLabelExpectedTypes:
        "\u041E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F {allButLastType} \u0430\u0431\u043E {lastType}",
    imageValidateSizeLabelFormatError:
        "\u0424\u043E\u0440\u043C\u0430\u0442 \u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u043D\u044F \u043D\u0435 \u043F\u0456\u0434\u0442\u0440\u0438\u043C\u0443\u0454\u0442\u044C\u0441\u044F",
    imageValidateSizeLabelImageSizeTooSmall:
        "\u0417\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u043D\u044F \u0437\u0430\u043D\u0430\u0434\u0442\u043E \u043C\u0430\u043B\u0435\u043D\u044C\u043A\u0435",
    imageValidateSizeLabelImageSizeTooBig:
        "\u0417\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u043D\u044F \u0437\u0430\u043D\u0430\u0434\u0442\u043E \u0432\u0435\u043B\u0438\u043A\u0435",
    imageValidateSizeLabelExpectedMinSize:
        "\u041C\u0456\u043D\u0456\u043C\u0430\u043B\u044C\u043D\u0438\u0439 \u0440\u043E\u0437\u043C\u0456\u0440: {minWidth} \xD7 {minHeight}",
    imageValidateSizeLabelExpectedMaxSize:
        "\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u0438\u0439 \u0440\u043E\u0437\u043C\u0456\u0440: {maxWidth} \xD7 {maxHeight}",
    imageValidateSizeLabelImageResolutionTooLow:
        "\u0420\u043E\u0437\u043C\u0456\u0440\u0438 \u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u043D\u044F \u0437\u0430\u043D\u0430\u0434\u0442\u043E \u043C\u0430\u043B\u0435\u043D\u044C\u043A\u0456",
    imageValidateSizeLabelImageResolutionTooHigh:
        "\u0420\u043E\u0437\u043C\u0456\u0440\u0438 \u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u043D\u044F \u0437\u0430\u043D\u0430\u0434\u0442\u043E \u0432\u0435\u043B\u0438\u043A\u0456",
    imageValidateSizeLabelExpectedMinResolution:
        "\u041C\u0456\u043D\u0456\u043C\u0430\u043B\u044C\u043D\u0456 \u0440\u043E\u0437\u043C\u0456\u0440\u0438: {minResolution}",
    imageValidateSizeLabelExpectedMaxResolution:
        "\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u0456 \u0440\u043E\u0437\u043C\u0456\u0440\u0438: {maxResolution}",
};
const Ul = {
    labelIdle:
        'K\xE9o th\u1EA3 t\u1EC7p c\u1EE7a b\u1EA1n ho\u1EB7c <span class="filepond--label-action"> T\xECm ki\u1EBFm </span>',
    labelInvalidField:
        "Tr\u01B0\u1EDDng ch\u1EE9a c\xE1c t\u1EC7p kh\xF4ng h\u1EE3p l\u1EC7",
    labelFileWaitingForSize: "\u0110ang ch\u1EDD k\xEDch th\u01B0\u1EDBc",
    labelFileSizeNotAvailable:
        "K\xEDch th\u01B0\u1EDBc kh\xF4ng c\xF3 s\u1EB5n",
    labelFileLoading: "\u0110ang t\u1EA3i",
    labelFileLoadError: "L\u1ED7i khi t\u1EA3i",
    labelFileProcessing: "\u0110ang t\u1EA3i l\xEAn",
    labelFileProcessingComplete: "T\u1EA3i l\xEAn th\xE0nh c\xF4ng",
    labelFileProcessingAborted: "\u0110\xE3 hu\u1EF7 t\u1EA3i l\xEAn",
    labelFileProcessingError: "L\u1ED7i khi t\u1EA3i l\xEAn",
    labelFileProcessingRevertError: "L\u1ED7i khi ho\xE0n nguy\xEAn",
    labelFileRemoveError: "L\u1ED7i khi x\xF3a",
    labelTapToCancel: "nh\u1EA5n \u0111\u1EC3 h\u1EE7y",
    labelTapToRetry: "nh\u1EA5n \u0111\u1EC3 th\u1EED l\u1EA1i",
    labelTapToUndo: "nh\u1EA5n \u0111\u1EC3 ho\xE0n t\xE1c",
    labelButtonRemoveItem: "Xo\xE1",
    labelButtonAbortItemLoad: "Hu\u1EF7 b\u1ECF",
    labelButtonRetryItemLoad: "Th\u1EED l\u1EA1i",
    labelButtonAbortItemProcessing: "H\u1EE7y b\u1ECF",
    labelButtonUndoItemProcessing: "Ho\xE0n t\xE1c",
    labelButtonRetryItemProcessing: "Th\u1EED l\u1EA1i",
    labelButtonProcessItem: "T\u1EA3i l\xEAn",
    labelMaxFileSizeExceeded: "T\u1EADp tin qu\xE1 l\u1EDBn",
    labelMaxFileSize:
        "K\xEDch th\u01B0\u1EDBc t\u1EC7p t\u1ED1i \u0111a l\xE0 {filesize}",
    labelMaxTotalFileSizeExceeded:
        "\u0110\xE3 v\u01B0\u1EE3t qu\xE1 t\u1ED5ng k\xEDch th\u01B0\u1EDBc t\u1ED1i \u0111a",
    labelMaxTotalFileSize:
        "T\u1ED5ng k\xEDch th\u01B0\u1EDBc t\u1EC7p t\u1ED1i \u0111a l\xE0 {filesize}",
    labelFileTypeNotAllowed:
        "T\u1EC7p thu\u1ED9c lo\u1EA1i kh\xF4ng h\u1EE3p l\u1EC7",
    fileValidateTypeLabelExpectedTypes:
        "Ki\u1EC3u t\u1EC7p h\u1EE3p l\u1EC7 l\xE0 {allButLastType} ho\u1EB7c {lastType}",
    imageValidateSizeLabelFormatError:
        "Lo\u1EA1i h\xECnh \u1EA3nh kh\xF4ng \u0111\u01B0\u1EE3c h\u1ED7 tr\u1EE3",
    imageValidateSizeLabelImageSizeTooSmall: "H\xECnh \u1EA3nh qu\xE1 nh\u1ECF",
    imageValidateSizeLabelImageSizeTooBig: "H\xECnh \u1EA3nh qu\xE1 l\u1EDBn",
    imageValidateSizeLabelExpectedMinSize:
        "K\xEDch th\u01B0\u1EDBc t\u1ED1i thi\u1EC3u l\xE0 {minWidth} \xD7 {minHeight}",
    imageValidateSizeLabelExpectedMaxSize:
        "K\xEDch th\u01B0\u1EDBc t\u1ED1i \u0111a l\xE0 {maxWidth} \xD7 {maxHeight}",
    imageValidateSizeLabelImageResolutionTooLow:
        "\u0110\u1ED9 ph\xE2n gi\u1EA3i qu\xE1 th\u1EA5p",
    imageValidateSizeLabelImageResolutionTooHigh:
        "\u0110\u1ED9 ph\xE2n gi\u1EA3i qu\xE1 cao",
    imageValidateSizeLabelExpectedMinResolution:
        "\u0110\u1ED9 ph\xE2n gi\u1EA3i t\u1ED1i thi\u1EC3u l\xE0 {minResolution}",
    imageValidateSizeLabelExpectedMaxResolution:
        "\u0110\u1ED9 ph\xE2n gi\u1EA3i t\u1ED1i \u0111a l\xE0 {maxResolution}",
};
const kl = {
    labelIdle:
        '\u62D6\u653E\u6587\u4EF6\uFF0C\u6216\u8005 <span class="filepond--label-action"> \u6D4F\u89C8 </span>',
    labelInvalidField: "\u5B57\u6BB5\u5305\u542B\u65E0\u6548\u6587\u4EF6",
    labelFileWaitingForSize: "\u8BA1\u7B97\u6587\u4EF6\u5927\u5C0F",
    labelFileSizeNotAvailable: "\u6587\u4EF6\u5927\u5C0F\u4E0D\u53EF\u7528",
    labelFileLoading: "\u52A0\u8F7D",
    labelFileLoadError: "\u52A0\u8F7D\u9519\u8BEF",
    labelFileProcessing: "\u4E0A\u4F20",
    labelFileProcessingComplete: "\u5DF2\u4E0A\u4F20",
    labelFileProcessingAborted: "\u4E0A\u4F20\u5DF2\u53D6\u6D88",
    labelFileProcessingError: "\u4E0A\u4F20\u51FA\u9519",
    labelFileProcessingRevertError: "\u8FD8\u539F\u51FA\u9519",
    labelFileRemoveError: "\u5220\u9664\u51FA\u9519",
    labelTapToCancel: "\u70B9\u51FB\u53D6\u6D88",
    labelTapToRetry: "\u70B9\u51FB\u91CD\u8BD5",
    labelTapToUndo: "\u70B9\u51FB\u64A4\u6D88",
    labelButtonRemoveItem: "\u5220\u9664",
    labelButtonAbortItemLoad: "\u4E2D\u6B62",
    labelButtonRetryItemLoad: "\u91CD\u8BD5",
    labelButtonAbortItemProcessing: "\u53D6\u6D88",
    labelButtonUndoItemProcessing: "\u64A4\u6D88",
    labelButtonRetryItemProcessing: "\u91CD\u8BD5",
    labelButtonProcessItem: "\u4E0A\u4F20",
    labelMaxFileSizeExceeded: "\u6587\u4EF6\u592A\u5927",
    labelMaxFileSize: "\u6700\u5927\u503C: {filesize}",
    labelMaxTotalFileSizeExceeded:
        "\u8D85\u8FC7\u6700\u5927\u6587\u4EF6\u5927\u5C0F",
    labelMaxTotalFileSize:
        "\u6700\u5927\u6587\u4EF6\u5927\u5C0F\uFF1A{filesize}",
    labelFileTypeNotAllowed: "\u6587\u4EF6\u7C7B\u578B\u65E0\u6548",
    fileValidateTypeLabelExpectedTypes:
        "\u5E94\u4E3A {allButLastType} \u6216 {lastType}",
    imageValidateSizeLabelFormatError:
        "\u4E0D\u652F\u6301\u56FE\u50CF\u7C7B\u578B",
    imageValidateSizeLabelImageSizeTooSmall: "\u56FE\u50CF\u592A\u5C0F",
    imageValidateSizeLabelImageSizeTooBig: "\u56FE\u50CF\u592A\u5927",
    imageValidateSizeLabelExpectedMinSize:
        "\u6700\u5C0F\u503C: {minWidth} \xD7 {minHeight}",
    imageValidateSizeLabelExpectedMaxSize:
        "\u6700\u5927\u503C: {maxWidth} \xD7 {maxHeight}",
    imageValidateSizeLabelImageResolutionTooLow:
        "\u5206\u8FA8\u7387\u592A\u4F4E",
    imageValidateSizeLabelImageResolutionTooHigh:
        "\u5206\u8FA8\u7387\u592A\u9AD8",
    imageValidateSizeLabelExpectedMinResolution:
        "\u6700\u5C0F\u5206\u8FA8\u7387\uFF1A{minResolution}",
    imageValidateSizeLabelExpectedMaxResolution:
        "\u6700\u5927\u5206\u8FA8\u7387\uFF1A{maxResolution}",
};
const Hl = {
    labelIdle:
        '\u62D6\u653E\u6A94\u6848\uFF0C\u6216\u8005 <span class="filepond--label-action"> \u700F\u89BD </span>',
    labelInvalidField: "\u4E0D\u652F\u63F4\u6B64\u6A94\u6848",
    labelFileWaitingForSize: "\u6B63\u5728\u8A08\u7B97\u6A94\u6848\u5927\u5C0F",
    labelFileSizeNotAvailable: "\u6A94\u6848\u5927\u5C0F\u4E0D\u7B26",
    labelFileLoading: "\u8B80\u53D6\u4E2D",
    labelFileLoadError: "\u8B80\u53D6\u932F\u8AA4",
    labelFileProcessing: "\u4E0A\u50B3",
    labelFileProcessingComplete: "\u5DF2\u4E0A\u50B3",
    labelFileProcessingAborted: "\u4E0A\u50B3\u5DF2\u53D6\u6D88",
    labelFileProcessingError: "\u4E0A\u50B3\u767C\u751F\u932F\u8AA4",
    labelFileProcessingRevertError: "\u9084\u539F\u932F\u8AA4",
    labelFileRemoveError: "\u522A\u9664\u932F\u8AA4",
    labelTapToCancel: "\u9EDE\u64CA\u53D6\u6D88",
    labelTapToRetry: "\u9EDE\u64CA\u91CD\u8A66",
    labelTapToUndo: "\u9EDE\u64CA\u9084\u539F",
    labelButtonRemoveItem: "\u522A\u9664",
    labelButtonAbortItemLoad: "\u505C\u6B62",
    labelButtonRetryItemLoad: "\u91CD\u8A66",
    labelButtonAbortItemProcessing: "\u53D6\u6D88",
    labelButtonUndoItemProcessing: "\u53D6\u6D88",
    labelButtonRetryItemProcessing: "\u91CD\u8A66",
    labelButtonProcessItem: "\u4E0A\u50B3",
    labelMaxFileSizeExceeded: "\u6A94\u6848\u904E\u5927",
    labelMaxFileSize: "\u6700\u5927\u503C\uFF1A{filesize}",
    labelMaxTotalFileSizeExceeded:
        "\u8D85\u904E\u6700\u5927\u53EF\u4E0A\u50B3\u5927\u5C0F",
    labelMaxTotalFileSize:
        "\u6700\u5927\u53EF\u4E0A\u50B3\u5927\u5C0F\uFF1A{filesize}",
    labelFileTypeNotAllowed: "\u4E0D\u652F\u63F4\u6B64\u985E\u578B\u6A94\u6848",
    fileValidateTypeLabelExpectedTypes:
        "\u61C9\u70BA {allButLastType} \u6216 {lastType}",
    imageValidateSizeLabelFormatError:
        "\u4E0D\u652F\u6301\u6B64\u985E\u5716\u7247\u985E\u578B",
    imageValidateSizeLabelImageSizeTooSmall: "\u5716\u7247\u904E\u5C0F",
    imageValidateSizeLabelImageSizeTooBig: "\u5716\u7247\u904E\u5927",
    imageValidateSizeLabelExpectedMinSize:
        "\u6700\u5C0F\u5C3A\u5BF8\uFF1A{minWidth} \xD7 {minHeight}",
    imageValidateSizeLabelExpectedMaxSize:
        "\u6700\u5927\u5C3A\u5BF8\uFF1A{maxWidth} \xD7 {maxHeight}",
    imageValidateSizeLabelImageResolutionTooLow:
        "\u89E3\u6790\u5EA6\u904E\u4F4E",
    imageValidateSizeLabelImageResolutionTooHigh:
        "\u89E3\u6790\u5EA6\u904E\u9AD8",
    imageValidateSizeLabelExpectedMinResolution:
        "\u6700\u4F4E\u89E3\u6790\u5EA6\uFF1A{minResolution}",
    imageValidateSizeLabelExpectedMaxResolution:
        "\u6700\u9AD8\u89E3\u6790\u5EA6\uFF1A{maxResolution}",
};
fe(xr);
fe(Pr);
fe(Cr);
fe(Nr);
fe(Ur);
fe(Zr);
fe(el);
fe(hl);
fe(pl);
fe(fl);
fe(El);
window.FilePond = ea;
function rp({
    acceptedFileTypes: e,
    imageEditorEmptyFillColor: t,
    imageEditorMode: i,
    imageEditorViewportHeight: a,
    imageEditorViewportWidth: n,
    deleteUploadedFileUsing: r,
    isDeletable: l,
    isDisabled: o,
    getUploadedFilesUsing: s,
    imageCropAspectRatio: u,
    imagePreviewHeight: c,
    imageResizeMode: d,
    imageResizeTargetHeight: h,
    imageResizeTargetWidth: m,
    imageResizeUpscale: p,
    isAvatar: f,
    hasImageEditor: g,
    hasCircleCropper: I,
    canEditSvgs: E,
    isSvgEditingConfirmed: T,
    confirmSvgEditingMessage: _,
    disabledSvgEditingMessage: y,
    isDownloadable: b,
    isMultiple: A,
    isOpenable: R,
    isPreviewable: S,
    isReorderable: P,
    itemPanelAspectRatio: O,
    loadingIndicatorPosition: x,
    locale: z,
    maxFiles: v,
    maxSize: F,
    minSize: w,
    panelAspectRatio: L,
    panelLayout: C,
    placeholder: D,
    removeUploadedFileButtonPosition: V,
    removeUploadedFileUsing: B,
    reorderUploadedFilesUsing: j,
    shouldAppendFiles: $,
    shouldOrientImageFromExif: X,
    shouldTransformImage: ue,
    state: U,
    uploadButtonPosition: W,
    uploadingMessage: q,
    uploadProgressIndicatorPosition: oe,
    uploadUsing: J,
}) {
    return {
        fileKeyIndex: {},
        pond: null,
        shouldUpdateState: !0,
        state: U,
        lastState: null,
        uploadedFileIndex: {},
        isEditorOpen: !1,
        editingFile: {},
        currentRatio: "",
        editor: {},
        init: async function () {
            xt(Wl[z] ?? Wl.en),
                (this.pond = ut(this.$refs.input, {
                    imageCaptionPlaceholder: "Description...",
                    imageCaptionMaxLength: 255,
                    fileMetadataObject: {
                        title: "Un t\xEDtulo personalizado",
                        description: "Esta es una descripci\xF3n personalizada",
                    },
                    acceptedFileTypes: e,
                    allowImageExifOrientation: X,
                    allowPaste: !1,
                    allowRemove: l,
                    allowReorder: P,
                    allowImagePreview: S,
                    allowVideoPreview: S,
                    allowAudioPreview: S,
                    allowImageTransform: ue,
                    credits: !1,
                    files: await this.getFiles(),
                    imageCropAspectRatio: u,
                    imagePreviewHeight: c,
                    imageResizeTargetHeight: h,
                    imageResizeTargetWidth: m,
                    imageResizeMode: d,
                    imageResizeUpscale: p,
                    itemInsertLocation: $ ? "after" : "before",
                    ...(D && { labelIdle: D }),
                    maxFiles: v,
                    maxFileSize: F,
                    minFileSize: w,
                    styleButtonProcessItemPosition: W,
                    styleButtonRemoveItemPosition: V,
                    styleItemPanelAspectRatio: O,
                    styleLoadIndicatorPosition: x,
                    stylePanelAspectRatio: L,
                    stylePanelLayout: C,
                    styleProgressIndicatorPosition: oe,
                    server: {
                        load: async (N, H) => {
                            const ee = await (
                                await fetch(N, { cache: "no-store" })
                            ).blob();
                            H(ee);
                        },
                        process: (N, H, Q, ee, wt, Ve) => {
                            this.shouldUpdateState = !1;
                            const Yt = (
                                "10000000-1000-4000-8000" + -1e11
                            ).replace(/[018]/g, (qt) =>
                                (
                                    qt ^
                                    (crypto.getRandomValues(
                                        new Uint8Array(1),
                                    )[0] &
                                        (15 >> (qt / 4)))
                                ).toString(16),
                            );
                            J(
                                Yt,
                                H,
                                (qt) => {
                                    (this.shouldUpdateState = !0), ee(qt);
                                },
                                wt,
                                Ve,
                            );
                        },
                        remove: async (N, H) => {
                            const Q = this.uploadedFileIndex[N] ?? null;
                            Q && (await r(Q), H());
                        },
                        revert: async (N, H) => {
                            await B(N), H();
                        },
                    },
                    allowImageEdit: g,
                    imageEditEditor: {
                        open: (N) => this.loadEditor(N),
                        onconfirm: () => {},
                        oncancel: () => this.closeEditor(),
                        onclose: () => this.closeEditor(),
                    },
                })),
                this.$watch("state", async () => {
                    if (
                        this.pond &&
                        this.shouldUpdateState &&
                        this.state !== void 0
                    ) {
                        if (
                            this.state !== null &&
                            Object.values(this.state).filter((N) =>
                                N.startsWith("livewire-file:"),
                            ).length
                        ) {
                            this.lastState = null;
                            return;
                        }
                        JSON.stringify(this.state) !== this.lastState &&
                            ((this.lastState = JSON.stringify(this.state)),
                            (this.pond.files = await this.getFiles()));
                    }
                }),
                this.pond.on("reorderfiles", async (N) => {
                    const H = N.map((Q) =>
                        Q.source instanceof File
                            ? Q.serverId
                            : (this.uploadedFileIndex[Q.source] ?? null),
                    ).filter((Q) => Q);
                    await j($ ? H : H.reverse());
                }),
                this.pond.on("initfile", async (N) => {
                    b && (f || this.insertDownloadLink(N));
                }),
                this.pond.on("initfile", async (N) => {
                    R && (f || this.insertOpenLink(N));
                }),
                this.pond.on("addfilestart", async (N) => {
                    N.status === ke.PROCESSING_QUEUED &&
                        this.dispatchFormEvent("form-processing-started", {
                            message: q,
                        });
                });
            const G = async () => {
                this.pond
                    .getFiles()
                    .filter(
                        (N) =>
                            N.status === ke.PROCESSING ||
                            N.status === ke.PROCESSING_QUEUED,
                    ).length ||
                    this.dispatchFormEvent("form-processing-finished");
            };
            this.pond.on("processfile", G),
                this.pond.on("processfileabort", G),
                this.pond.on("processfilerevert", G);
        },
        destroy: function () {
            this.destroyEditor(), ht(this.$refs.input), (this.pond = null);
        },
        dispatchFormEvent: function (G, N = {}) {
            this.$el.closest("form")?.dispatchEvent(
                new CustomEvent(G, {
                    composed: !0,
                    cancelable: !0,
                    detail: N,
                }),
            );
        },
        getUploadedFiles: async function () {
            const G = await s();
            (this.fileKeyIndex = G ?? {}),
                (this.uploadedFileIndex = Object.entries(this.fileKeyIndex)
                    .filter(([N, H]) => H?.url)
                    .reduce((N, [H, Q]) => ((N[Q.url] = H), N), {}));
        },
        getFiles: async function () {
            await this.getUploadedFiles();
            const G = [];
            for (const N of Object.values(this.fileKeyIndex)) {
                N &&
                    G.push({
                        source: N.url,
                        options: {
                            type: "local",
                            metadata: { caption: N.name, uuid: N.uuid },
                            ...(!N.type ||
                            (S &&
                                (/^audio/.test(N.type) ||
                                    /^image/.test(N.type) ||
                                    /^video/.test(N.type)))
                                ? {}
                                : {
                                      file: {
                                          name: N.name,
                                          size: N.size,
                                          type: N.type,
                                      },
                                  }),
                        },
                    });
            }
            return $ ? G : G.reverse();
        },
        insertDownloadLink: function (G) {
            if (G.origin !== Pt.LOCAL) return;
            const N = this.getDownloadLink(G);
            N &&
                document
                    .getElementById(`filepond--item-${G.id}`)
                    .querySelector(".filepond--file-info-main")
                    .prepend(N);
        },
        insertOpenLink: function (G) {
            if (G.origin !== Pt.LOCAL) return;
            const N = this.getOpenLink(G);
            N &&
                document
                    .getElementById(`filepond--item-${G.id}`)
                    .querySelector(".filepond--file-info-main")
                    .prepend(N);
        },
        getDownloadLink: function (G) {
            const N = G.source;
            if (!N) return;
            const H = document.createElement("a");
            return (
                (H.className = "filepond--download-icon"),
                (H.href = N),
                (H.download = G.file.name),
                H
            );
        },
        getOpenLink: function (G) {
            const N = G.source;
            if (!N) return;
            const H = document.createElement("a");
            return (
                (H.className = "filepond--open-icon"),
                (H.href = N),
                (H.target = "_blank"),
                H
            );
        },
        initEditor: function () {
            o ||
                (g &&
                    (this.editor = new Ta(this.$refs.editor, {
                        aspectRatio: n / a,
                        autoCropArea: 1,
                        center: !0,
                        crop: (G) => {
                            (this.$refs.xPositionInput.value = Math.round(
                                G.detail.x,
                            )),
                                (this.$refs.yPositionInput.value = Math.round(
                                    G.detail.y,
                                )),
                                (this.$refs.heightInput.value = Math.round(
                                    G.detail.height,
                                )),
                                (this.$refs.widthInput.value = Math.round(
                                    G.detail.width,
                                )),
                                (this.$refs.rotationInput.value =
                                    G.detail.rotate);
                        },
                        cropBoxResizable: !0,
                        guides: !0,
                        highlight: !0,
                        responsive: !0,
                        toggleDragModeOnDblclick: !0,
                        viewMode: i,
                        wheelZoomRatio: 0.02,
                    })));
        },
        closeEditor: function () {
            (this.editingFile = {}),
                (this.isEditorOpen = !1),
                this.destroyEditor();
        },
        fixImageDimensions: function (G, N) {
            if (G.type !== "image/svg+xml") return N(G);
            const H = new FileReader();
            (H.onload = (Q) => {
                const ee = new DOMParser()
                    .parseFromString(Q.target.result, "image/svg+xml")
                    ?.querySelector("svg");
                if (!ee) return N(G);
                const wt = ["viewBox", "ViewBox", "viewbox"].find((Yt) =>
                    ee.hasAttribute(Yt),
                );
                if (!wt) return N(G);
                const Ve = ee.getAttribute(wt).split(" ");
                return !Ve || Ve.length !== 4
                    ? N(G)
                    : (ee.setAttribute("width", parseFloat(Ve[2]) + "pt"),
                      ee.setAttribute("height", parseFloat(Ve[3]) + "pt"),
                      N(
                          new File(
                              [
                                  new Blob(
                                      [
                                          new XMLSerializer().serializeToString(
                                              ee,
                                          ),
                                      ],
                                      { type: "image/svg+xml" },
                                  ),
                              ],
                              G.name,
                              { type: "image/svg+xml", _relativePath: "" },
                          ),
                      ));
            }),
                H.readAsText(G);
        },
        loadEditor: function (G) {
            if (o || !g || !G) return;
            const N = G.type === "image/svg+xml";
            if (!E && N) {
                alert(y);
                return;
            }
            (T && N && !confirm(_)) ||
                this.fixImageDimensions(G, (H) => {
                    (this.editingFile = H), this.initEditor();
                    const Q = new FileReader();
                    (Q.onload = (ee) => {
                        (this.isEditorOpen = !0),
                            setTimeout(
                                () => this.editor.replace(ee.target.result),
                                200,
                            );
                    }),
                        Q.readAsDataURL(G);
                });
        },
        getRoundedCanvas: function (G) {
            const N = G.width;
            const H = G.height;
            const Q = document.createElement("canvas");
            (Q.width = N), (Q.height = H);
            const ee = Q.getContext("2d");
            return (
                (ee.imageSmoothingEnabled = !0),
                ee.drawImage(G, 0, 0, N, H),
                (ee.globalCompositeOperation = "destination-in"),
                ee.beginPath(),
                ee.ellipse(N / 2, H / 2, N / 2, H / 2, 0, 0, 2 * Math.PI),
                ee.fill(),
                Q
            );
        },
        saveEditor: function () {
            if (o || !g) return;
            let G = this.editor.getCroppedCanvas({
                fillColor: t ?? "transparent",
                height: h,
                imageSmoothingEnabled: !0,
                imageSmoothingQuality: "high",
                width: m,
            });
            I && (G = this.getRoundedCanvas(G)),
                G.toBlob(
                    (N) => {
                        A &&
                            this.pond.removeFile(
                                this.pond
                                    .getFiles()
                                    .find(
                                        (H) =>
                                            H.filename ===
                                            this.editingFile.name,
                                    )?.id,
                                { revert: !0 },
                            ),
                            this.$nextTick(() => {
                                this.shouldUpdateState = !1;
                                let H = this.editingFile.name.slice(
                                    0,
                                    this.editingFile.name.lastIndexOf("."),
                                );
                                let Q = this.editingFile.name.split(".").pop();
                                Q === "svg" && (Q = "png");
                                const ee = /-v(\d+)/;
                                ee.test(H)
                                    ? (H = H.replace(
                                          ee,
                                          (wt, Ve) => `-v${Number(Ve) + 1}`,
                                      ))
                                    : (H += "-v1"),
                                    this.pond
                                        .addFile(
                                            new File([N], `${H}.${Q}`, {
                                                type:
                                                    this.editingFile.type ===
                                                        "image/svg+xml" || I
                                                        ? "image/png"
                                                        : this.editingFile.type,
                                                lastModified:
                                                    new Date().getTime(),
                                            }),
                                        )
                                        .then(() => {
                                            this.closeEditor();
                                        })
                                        .catch(() => {
                                            this.closeEditor();
                                        });
                            });
                    },
                    I ? "image/png" : this.editingFile.type,
                );
        },
        destroyEditor: function () {
            this.editor &&
                typeof this.editor.destroy === "function" &&
                this.editor.destroy(),
                (this.editor = null);
        },
    };
}
var Wl = {
    ar: Tl,
    ca: bl,
    ckb: Il,
    cs: _l,
    da: Rl,
    de: yl,
    en: Sl,
    es: wl,
    fa: vl,
    fi: Al,
    fr: Ll,
    hu: Ml,
    id: xl,
    it: Ol,
    km: Pl,
    nl: Dl,
    no: Fl,
    pl: Cl,
    pt_BR: _i,
    pt_PT: _i,
    ro: zl,
    ru: Nl,
    sv: Bl,
    tr: Vl,
    uk: Gl,
    vi: Ul,
    zh_CN: kl,
    zh_TW: Hl,
};
export { rp as default };
/*! Bundled license information:

filepond/dist/filepond.esm.js:
  (*!
   * FilePond 4.31.1
   * Licensed under MIT, https://opensource.org/licenses/MIT/
   * Please visit https://pqina.nl/filepond/ for details.
   *)

cropperjs/dist/cropper.esm.js:
  (*!
   * Cropper.js v1.5.13
   * https://fengyuanchen.github.io/cropperjs
   *
   * Copyright 2015-present Chen Fengyuan
   * Released under the MIT license
   *
   * Date: 2022-11-20T05:30:46.114Z
   *)

filepond-plugin-file-validate-size/dist/filepond-plugin-file-validate-size.esm.js:
  (*!
   * FilePondPluginFileValidateSize 2.2.4
   * Licensed under MIT, https://opensource.org/licenses/MIT/
   * Please visit https://pqina.nl/filepond/ for details.
   *)

filepond-plugin-file-validate-type/dist/filepond-plugin-file-validate-type.esm.js:
  (*!
   * FilePondPluginFileValidateType 1.2.6
   * Licensed under MIT, https://opensource.org/licenses/MIT/
   * Please visit https://pqina.nl/filepond/ for details.
   *)

filepond-plugin-image-crop/dist/filepond-plugin-image-crop.esm.js:
  (*!
   * FilePondPluginImageCrop 2.0.6
   * Licensed under MIT, https://opensource.org/licenses/MIT/
   * Please visit https://pqina.nl/filepond/ for details.
   *)

filepond-plugin-image-edit/dist/filepond-plugin-image-edit.esm.js:
  (*!
   * FilePondPluginImageEdit 1.6.3
   * Licensed under MIT, https://opensource.org/licenses/MIT/
   * Please visit https://pqina.nl/filepond/ for details.
   *)

filepond-plugin-image-exif-orientation/dist/filepond-plugin-image-exif-orientation.esm.js:
  (*!
   * FilePondPluginImageExifOrientation 1.0.11
   * Licensed under MIT, https://opensource.org/licenses/MIT/
   * Please visit https://pqina.nl/filepond/ for details.
   *)

filepond-plugin-image-preview/dist/filepond-plugin-image-preview.esm.js:
  (*!
   * FilePondPluginImagePreview 4.6.7
   * Licensed under MIT, https://opensource.org/licenses/MIT/
   * Please visit https://pqina.nl/filepond/ for details.
   *)

filepond-plugin-image-resize/dist/filepond-plugin-image-resize.esm.js:
  (*!
   * FilePondPluginImageResize 2.0.10
   * Licensed under MIT, https://opensource.org/licenses/MIT/
   * Please visit https://pqina.nl/filepond/ for details.
   *)

filepond-plugin-image-transform/dist/filepond-plugin-image-transform.esm.js:
  (*!
   * FilePondPluginImageTransform 3.8.6
   * Licensed under MIT, https://opensource.org/licenses/MIT/
   * Please visit https://pqina.nl/filepond/ for details.
   *)

filepond-plugin-media-preview/dist/filepond-plugin-media-preview.esm.js:
  (*!
   * FilePondPluginMediaPreview 1.0.9
   * Licensed under MIT, https://opensource.org/licenses/MIT/
   * Please visit undefined for details.
   *)

filepond-plugin-file-metadata/dist/filepond-plugin-file-metadata.esm.js:
  (*!
   * FilePondPluginFileMetadata 1.0.8
   * Licensed under MIT, https://opensource.org/licenses/MIT/
   * Please visit https://pqina.nl/filepond/ for details.
   *)
*/
