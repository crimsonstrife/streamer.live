const mr = Object.defineProperty;
const ur = (e, t) => {
    for (const i in t) mr(e, i, { get: t[i], enumerable: !0 });
};
const la = {};
ur(la, {
    FileOrigin: () => Ct,
    FileStatus: () => Et,
    OptionTypes: () => Ui,
    Status: () => ll,
    create: () => gt,
    destroy: () => ft,
    find: () => Hi,
    getOptions: () => ji,
    parse: () => Wi,
    registerPlugin: () => ve,
    setOptions: () => Ft,
    supported: () => Gi,
});
const gr = (e) => e instanceof HTMLElement;
const fr = (e, t = [], i = []) => {
    const a = { ...e };
    const n = [];
    const l = [];
    const o = () => ({ ...a });
    const r = () => {
        const g = [...n];
        return (n.length = 0), g;
    };
    const s = () => {
        const g = [...l];
        (l.length = 0),
            g.forEach(({ type: f, data: h }) => {
                p(f, h);
            });
    };
    const p = (g, f, h) => {
        if (h && !document.hidden) {
            l.push({ type: g, data: f });
            return;
        }
        u[g] && u[g](f), n.push({ type: g, data: f });
    };
    const c = (g, ...f) => (m[g] ? m[g](...f) : null);
    const d = {
        getState: o,
        processActionQueue: r,
        processDispatchQueue: s,
        dispatch: p,
        query: c,
    };
    let m = {};
    t.forEach((g) => {
        m = { ...g(a), ...m };
    });
    let u = {};
    return (
        i.forEach((g) => {
            u = { ...g(p, c, a), ...u };
        }),
        d
    );
};
const hr = (e, t, i) => {
    if (typeof i === "function") {
        e[t] = i;
        return;
    }
    Object.defineProperty(e, t, { ...i });
};
const te = (e, t) => {
    for (const i in e) e.hasOwnProperty(i) && t(i, e[i]);
};
const We = (e) => {
    const t = {};
    return (
        te(e, (i) => {
            hr(t, i, e[i]);
        }),
        t
    );
};
const se = (e, t, i = null) => {
    if (i === null) return e.getAttribute(t) || e.hasAttribute(t);
    e.setAttribute(t, i);
};
const br = "http://www.w3.org/2000/svg";
const Er = ["svg", "path"];
const za = (e) => Er.includes(e);
const li = (e, t, i = {}) => {
    typeof t === "object" && ((i = t), (t = null));
    const a = za(e)
        ? document.createElementNS(br, e)
        : document.createElement(e);
    return (
        t && (za(e) ? se(a, "class", t) : (a.className = t)),
        te(i, (n, l) => {
            se(a, n, l);
        }),
        a
    );
};
const Tr = (e) => (t, i) => {
    typeof i < "u" && e.children[i]
        ? e.insertBefore(t, e.children[i])
        : e.appendChild(t);
};
const Ir = (e, t) => (i, a) => (
    typeof a < "u" ? t.splice(a, 0, i) : t.push(i), i
);
const vr = (e, t) => (i) => (
    t.splice(t.indexOf(i), 1),
    i.element.parentNode && e.removeChild(i.element),
    i
);
const xr = typeof window < "u" && typeof window.document < "u";
const En = () => xr;
const yr = En() ? li("svg") : {};
const Rr =
    "children" in yr ? (e) => e.children.length : (e) => e.childNodes.length;
const Tn = (e, t, i, a) => {
    const n = i[0] || e.left;
    const l = i[1] || e.top;
    const o = n + e.width;
    const r = l + e.height * (a[1] || 1);
    const s = {
        element: { ...e },
        inner: { left: e.left, top: e.top, right: e.right, bottom: e.bottom },
        outer: { left: n, top: l, right: o, bottom: r },
    };
    return (
        t
            .filter((p) => !p.isRectIgnored())
            .map((p) => p.rect)
            .forEach((p) => {
                Oa(s.inner, { ...p.inner }), Oa(s.outer, { ...p.outer });
            }),
        Fa(s.inner),
        (s.outer.bottom += s.element.marginBottom),
        (s.outer.right += s.element.marginRight),
        Fa(s.outer),
        s
    );
};
var Oa = (e, t) => {
    (t.top += e.top),
        (t.right += e.left),
        (t.bottom += e.top),
        (t.left += e.left),
        t.bottom > e.bottom && (e.bottom = t.bottom),
        t.right > e.right && (e.right = t.right);
};
var Fa = (e) => {
    (e.width = e.right - e.left), (e.height = e.bottom - e.top);
};
const $e = (e) => typeof e === "number";
const Sr = (e, t, i, a = 0.001) => Math.abs(e - t) < a && Math.abs(i) < a;
const _r = ({ stiffness: e = 0.5, damping: t = 0.75, mass: i = 10 } = {}) => {
    let a = null;
    let n = null;
    let l = 0;
    let o = !1;
    const p = We({
        interpolate: (c, d) => {
            if (o) return;
            if (!($e(a) && $e(n))) {
                (o = !0), (l = 0);
                return;
            }
            const m = -(n - a) * e;
            (l += m / i),
                (n += l),
                (l *= t),
                Sr(n, a, l) || d
                    ? ((n = a),
                      (l = 0),
                      (o = !0),
                      p.onupdate(n),
                      p.oncomplete(n))
                    : p.onupdate(n);
        },
        target: {
            set: (c) => {
                if (
                    ($e(c) && !$e(n) && (n = c),
                    a === null && ((a = c), (n = c)),
                    (a = c),
                    n === a || typeof a > "u")
                ) {
                    (o = !0), (l = 0), p.onupdate(n), p.oncomplete(n);
                    return;
                }
                o = !1;
            },
            get: () => a,
        },
        resting: { get: () => o },
        onupdate: (c) => {},
        oncomplete: (c) => {},
    });
    return p;
};
const wr = (e) => (e < 0.5 ? 2 * e * e : -1 + (4 - 2 * e) * e);
const Lr = ({ duration: e = 500, easing: t = wr, delay: i = 0 } = {}) => {
    let a = null;
    let n;
    let l;
    let o = !0;
    let r = !1;
    let s = null;
    const c = We({
        interpolate: (d, m) => {
            o ||
                s === null ||
                (a === null && (a = d),
                !(d - a < i) &&
                    ((n = d - a - i),
                    n >= e || m
                        ? ((n = 1),
                          (l = r ? 0 : 1),
                          c.onupdate(l * s),
                          c.oncomplete(l * s),
                          (o = !0))
                        : ((l = n / e),
                          c.onupdate((n >= 0 ? t(r ? 1 - l : l) : 0) * s))));
        },
        target: {
            get: () => (r ? 0 : s),
            set: (d) => {
                if (s === null) {
                    (s = d), c.onupdate(d), c.oncomplete(d);
                    return;
                }
                d < s ? ((s = 1), (r = !0)) : ((r = !1), (s = d)),
                    (o = !1),
                    (a = null);
            },
        },
        resting: { get: () => o },
        onupdate: (d) => {},
        oncomplete: (d) => {},
    });
    return c;
};
const Da = { spring: _r, tween: Lr };
const Mr = (e, t, i) => {
    const a = e[t] && typeof e[t][i] === "object" ? e[t][i] : e[t] || e;
    const n = typeof a === "string" ? a : a.type;
    const l = typeof a === "object" ? { ...a } : {};
    return Da[n] ? Da[n](l) : null;
};
const Yi = (e, t, i, a = !1) => {
    (t = Array.isArray(t) ? t : [t]),
        t.forEach((n) => {
            e.forEach((l) => {
                let o = l;
                let r = () => i[l];
                let s = (p) => (i[l] = p);
                typeof l === "object" &&
                    ((o = l.key), (r = l.getter || r), (s = l.setter || s)),
                    !(n[o] && !a) && (n[o] = { get: r, set: s });
            });
        });
};
const Ar = ({
    mixinConfig: e,
    viewProps: t,
    viewInternalAPI: i,
    viewExternalAPI: a,
}) => {
    const n = { ...t };
    const l = [];
    return (
        te(e, (o, r) => {
            const s = Mr(r);
            if (!s) return;
            (s.onupdate = (c) => {
                t[o] = c;
            }),
                (s.target = n[o]),
                Yi(
                    [
                        {
                            key: o,
                            setter: (c) => {
                                s.target !== c && (s.target = c);
                            },
                            getter: () => t[o],
                        },
                    ],
                    [i, a],
                    t,
                    !0,
                ),
                l.push(s);
        }),
        {
            write: (o) => {
                const r = document.hidden;
                let s = !0;
                return (
                    l.forEach((p) => {
                        p.resting || (s = !1), p.interpolate(o, r);
                    }),
                    s
                );
            },
            destroy: () => {},
        }
    );
};
const Pr = (e) => (t, i) => {
    e.addEventListener(t, i);
};
const zr = (e) => (t, i) => {
    e.removeEventListener(t, i);
};
const Or = ({
    mixinConfig: e,
    viewProps: t,
    viewInternalAPI: i,
    viewExternalAPI: a,
    viewState: n,
    view: l,
}) => {
    const o = [];
    const r = Pr(l.element);
    const s = zr(l.element);
    return (
        (a.on = (p, c) => {
            o.push({ type: p, fn: c }), r(p, c);
        }),
        (a.off = (p, c) => {
            o.splice(
                o.findIndex((d) => d.type === p && d.fn === c),
                1,
            ),
                s(p, c);
        }),
        {
            write: () => !0,
            destroy: () => {
                o.forEach((p) => {
                    s(p.type, p.fn);
                });
            },
        }
    );
};
const Fr = ({ mixinConfig: e, viewProps: t, viewExternalAPI: i }) => {
    Yi(e, i, t);
};
const ue = (e) => e != null;
const Dr = {
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
const Cr = ({
    mixinConfig: e,
    viewProps: t,
    viewInternalAPI: i,
    viewExternalAPI: a,
    view: n,
}) => {
    const l = { ...t };
    const o = {};
    Yi(e, [i, a], t);
    const r = () => [t.translateX || 0, t.translateY || 0];
    const s = () => [t.scaleX || 0, t.scaleY || 0];
    const p = () => (n.rect ? Tn(n.rect, n.childViews, r(), s()) : null);
    return (
        (i.rect = { get: p }),
        (a.rect = { get: p }),
        e.forEach((c) => {
            t[c] = typeof l[c] > "u" ? Dr[c] : l[c];
        }),
        {
            write: () => {
                if (Br(o, t)) {
                    return Nr(n.element, t), Object.assign(o, { ...t }), !0;
                }
            },
            destroy: () => {},
        }
    );
};
var Br = (e, t) => {
    if (Object.keys(e).length !== Object.keys(t).length) return !0;
    for (const i in t) if (t[i] !== e[i]) return !0;
    return !1;
};
var Nr = (
    e,
    {
        opacity: t,
        perspective: i,
        translateX: a,
        translateY: n,
        scaleX: l,
        scaleY: o,
        rotateX: r,
        rotateY: s,
        rotateZ: p,
        originX: c,
        originY: d,
        width: m,
        height: u,
    },
) => {
    let g = "";
    let f = "";
    (ue(c) || ue(d)) && (f += `transform-origin: ${c || 0}px ${d || 0}px;`),
        ue(i) && (g += `perspective(${i}px) `),
        (ue(a) || ue(n)) && (g += `translate3d(${a || 0}px, ${n || 0}px, 0) `),
        (ue(l) || ue(o)) &&
            (g += `scale3d(${ue(l) ? l : 1}, ${ue(o) ? o : 1}, 1) `),
        ue(p) && (g += `rotateZ(${p}rad) `),
        ue(r) && (g += `rotateX(${r}rad) `),
        ue(s) && (g += `rotateY(${s}rad) `),
        g.length && (f += `transform:${g};`),
        ue(t) &&
            ((f += `opacity:${t};`),
            t === 0 && (f += "visibility:hidden;"),
            t < 1 && (f += "pointer-events:none;")),
        ue(u) && (f += `height:${u}px;`),
        ue(m) && (f += `width:${m}px;`);
    const h = e.elementCurrentStyle || "";
    (f.length !== h.length || f !== h) &&
        ((e.style.cssText = f), (e.elementCurrentStyle = f));
};
const kr = { styles: Cr, listeners: Or, animations: Ar, apis: Fr };
const Ca = (e = {}, t = {}, i = {}) => (
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
const ne =
    ({
        tag: e = "div",
        name: t = null,
        attributes: i = {},
        read: a = () => {},
        write: n = () => {},
        create: l = () => {},
        destroy: o = () => {},
        filterFrameActionsForChild: r = (u, g) => g,
        didCreateView: s = () => {},
        didWriteView: p = () => {},
        ignoreRect: c = !1,
        ignoreRectUpdate: d = !1,
        mixins: m = [],
    } = {}) =>
    (u, g = {}) => {
        const f = li(e, `filepond--${t}`, i);
        const h = window.getComputedStyle(f, null);
        const I = Ca();
        let b = null;
        let T = !1;
        const v = [];
        const y = [];
        const E = {};
        const _ = {};
        const x = [n];
        const R = [a];
        const z = [o];
        const P = () => f;
        const A = () => v.concat();
        const B = () => E;
        const w = (k) => (H, Y) => H(k, Y);
        const O = () => b || ((b = Tn(I, v, [0, 0], [1, 1])), b);
        const S = () => h;
        const L = () => {
            (b = null),
                v.forEach((Y) => Y._read()),
                !(d && I.width && I.height) && Ca(I, f, h);
            const H = { root: K, props: g, rect: I };
            R.forEach((Y) => Y(H));
        };
        const D = (k, H, Y) => {
            let oe = H.length === 0;
            return (
                x.forEach((ee) => {
                    ee({
                        props: g,
                        root: K,
                        actions: H,
                        timestamp: k,
                        shouldOptimize: Y,
                    }) === !1 && (oe = !1);
                }),
                y.forEach((ee) => {
                    ee.write(k) === !1 && (oe = !1);
                }),
                v
                    .filter((ee) => !!ee.element.parentNode)
                    .forEach((ee) => {
                        ee._write(k, r(ee, H), Y) || (oe = !1);
                    }),
                v.forEach((ee, dt) => {
                    ee.element.parentNode ||
                        (K.appendChild(ee.element, dt),
                        ee._read(),
                        ee._write(k, r(ee, H), Y),
                        (oe = !1));
                }),
                (T = oe),
                p({ props: g, root: K, actions: H, timestamp: k }),
                oe
            );
        };
        const F = () => {
            y.forEach((k) => k.destroy()),
                z.forEach((k) => {
                    k({ root: K, props: g });
                }),
                v.forEach((k) => k._destroy());
        };
        const G = {
            element: { get: P },
            style: { get: S },
            childViews: { get: A },
        };
        const C = {
            ...G,
            rect: { get: O },
            ref: { get: B },
            is: (k) => t === k,
            appendChild: Tr(f),
            createChildView: w(u),
            linkView: (k) => (v.push(k), k),
            unlinkView: (k) => {
                v.splice(v.indexOf(k), 1);
            },
            appendChildView: Ir(f, v),
            removeChildView: vr(f, v),
            registerWriter: (k) => x.push(k),
            registerReader: (k) => R.push(k),
            registerDestroyer: (k) => z.push(k),
            invalidateLayout: () => (f.layoutCalculated = !1),
            dispatch: u.dispatch,
            query: u.query,
        };
        const q = {
            element: { get: P },
            childViews: { get: A },
            rect: { get: O },
            resting: { get: () => T },
            isRectIgnored: () => c,
            _read: L,
            _write: D,
            _destroy: F,
        };
        const X = { ...G, rect: { get: () => I } };
        Object.keys(m)
            .sort((k, H) => (k === "styles" ? 1 : H === "styles" ? -1 : 0))
            .forEach((k) => {
                const H = kr[k]({
                    mixinConfig: m[k],
                    viewProps: g,
                    viewState: _,
                    viewInternalAPI: C,
                    viewExternalAPI: q,
                    view: We(X),
                });
                H && y.push(H);
            });
        const K = We(C);
        l({ root: K, props: g });
        const pe = Rr(f);
        return (
            v.forEach((k, H) => {
                K.appendChild(k.element, pe + H);
            }),
            s(K),
            We(q)
        );
    };
const Vr = (e, t, i = 60) => {
    const a = "__framePainter";
    if (window[a]) {
        window[a].readers.push(e), window[a].writers.push(t);
        return;
    }
    window[a] = { readers: [e], writers: [t] };
    const n = window[a];
    const l = 1e3 / i;
    let o = null;
    let r = null;
    let s = null;
    let p = null;
    const c = () => {
        document.hidden
            ? ((s = () => window.setTimeout(() => d(performance.now()), l)),
              (p = () => window.clearTimeout(r)))
            : ((s = () => window.requestAnimationFrame(d)),
              (p = () => window.cancelAnimationFrame(r)));
    };
    document.addEventListener("visibilitychange", () => {
        p && p(), c(), d(performance.now());
    });
    const d = (m) => {
        (r = s(d)), o || (o = m);
        const u = m - o;
        u <= l ||
            ((o = m - (u % l)),
            n.readers.forEach((g) => g()),
            n.writers.forEach((g) => g(m)));
    };
    return (
        c(),
        d(performance.now()),
        {
            pause: () => {
                p(r);
            },
        }
    );
};
const fe =
    (e, t) =>
    ({
        root: i,
        props: a,
        actions: n = [],
        timestamp: l,
        shouldOptimize: o,
    }) => {
        n
            .filter((r) => e[r.type])
            .forEach((r) =>
                e[r.type]({
                    root: i,
                    props: a,
                    action: r.data,
                    timestamp: l,
                    shouldOptimize: o,
                }),
            ),
            t &&
                t({
                    root: i,
                    props: a,
                    actions: n,
                    timestamp: l,
                    shouldOptimize: o,
                });
    };
const Ba = (e, t) => t.parentNode.insertBefore(e, t);
const Na = (e, t) => t.parentNode.insertBefore(e, t.nextSibling);
const ci = (e) => Array.isArray(e);
const ke = (e) => e == null;
const Gr = (e) => e.trim();
const di = (e) => "" + e;
const Ur = (e, t = ",") =>
    ke(e)
        ? []
        : ci(e)
          ? e
          : di(e)
                .split(t)
                .map(Gr)
                .filter((i) => i.length);
const In = (e) => typeof e === "boolean";
const vn = (e) => (In(e) ? e : e === "true");
const ge = (e) => typeof e === "string";
const xn = (e) => ($e(e) ? e : ge(e) ? di(e).replace(/[a-z]+/gi, "") : 0);
const ni = (e) => parseInt(xn(e), 10);
const ka = (e) => parseFloat(xn(e));
const bt = (e) => $e(e) && isFinite(e) && Math.floor(e) === e;
const Va = (e, t = 1e3) => {
    if (bt(e)) return e;
    let i = di(e).trim();
    return /MB$/i.test(i)
        ? ((i = i.replace(/MB$i/, "").trim()), ni(i) * t * t)
        : /KB/i.test(i)
          ? ((i = i.replace(/KB$i/, "").trim()), ni(i) * t)
          : ni(i);
};
const Xe = (e) => typeof e === "function";
const Wr = (e) => {
    let t = self;
    const i = e.split(".");
    let a = null;
    for (; (a = i.shift()); ) if (((t = t[a]), !t)) return null;
    return t;
};
const Ga = {
    process: "POST",
    patch: "PATCH",
    revert: "DELETE",
    fetch: "GET",
    restore: "GET",
    load: "GET",
};
const Hr = (e) => {
    const t = {};
    return (
        (t.url = ge(e) ? e : e.url || ""),
        (t.timeout = e.timeout ? parseInt(e.timeout, 10) : 0),
        (t.headers = e.headers ? e.headers : {}),
        te(Ga, (i) => {
            t[i] = jr(i, e[i], Ga[i], t.timeout, t.headers);
        }),
        (t.process = e.process || ge(e) || e.url ? t.process : null),
        (t.remove = e.remove || null),
        delete t.headers,
        t
    );
};
var jr = (e, t, i, a, n) => {
    if (t === null) return null;
    if (typeof t === "function") return t;
    const l = {
        url: i === "GET" || i === "PATCH" ? `?${e}=` : "",
        method: i,
        headers: n,
        withCredentials: !1,
        timeout: a,
        onload: null,
        ondata: null,
        onerror: null,
    };
    if (ge(t)) return (l.url = t), l;
    if ((Object.assign(l, t), ge(l.headers))) {
        const o = l.headers.split(/:(.+)/);
        l.headers = { header: o[0], value: o[1] };
    }
    return (l.withCredentials = vn(l.withCredentials)), l;
};
const Yr = (e) => Hr(e);
const qr = (e) => e === null;
const ce = (e) => typeof e === "object" && e !== null;
const $r = (e) =>
    ce(e) &&
    ge(e.url) &&
    ce(e.process) &&
    ce(e.revert) &&
    ce(e.restore) &&
    ce(e.fetch);
const Oi = (e) =>
    ci(e)
        ? "array"
        : qr(e)
          ? "null"
          : bt(e)
            ? "int"
            : /^[0-9]+ ?(?:GB|MB|KB)$/gi.test(e)
              ? "bytes"
              : $r(e)
                ? "api"
                : typeof e;
const Xr = (e) =>
    e
        .replace(/{\s*'/g, '{"')
        .replace(/'\s*}/g, '"}')
        .replace(/'\s*:/g, '":')
        .replace(/:\s*'/g, ':"')
        .replace(/,\s*'/g, ',"')
        .replace(/'\s*,/g, '",');
const Kr = {
    array: Ur,
    boolean: vn,
    int: (e) => (Oi(e) === "bytes" ? Va(e) : ni(e)),
    number: ka,
    float: ka,
    bytes: Va,
    string: (e) => (Xe(e) ? e : di(e)),
    function: (e) => Wr(e),
    serverapi: Yr,
    object: (e) => {
        try {
            return JSON.parse(Xr(e));
        } catch {
            return null;
        }
    },
};
const Qr = (e, t) => Kr[t](e);
const yn = (e, t, i) => {
    if (e === t) return e;
    let a = Oi(e);
    if (a !== i) {
        const n = Qr(e, i);
        if (((a = Oi(n)), n === null)) {
            throw `Trying to assign value with incorrect type to "${option}", allowed type: "${i}"`;
        }
        e = n;
    }
    return e;
};
const Zr = (e, t) => {
    let i = e;
    return {
        enumerable: !0,
        get: () => i,
        set: (a) => {
            i = yn(a, e, t);
        },
    };
};
const Jr = (e) => {
    const t = {};
    return (
        te(e, (i) => {
            const a = e[i];
            t[i] = Zr(a[0], a[1]);
        }),
        We(t)
    );
};
const es = (e) => ({
    items: [],
    listUpdateTimeout: null,
    itemUpdateTimeout: null,
    processingQueue: [],
    options: Jr(e),
});
const pi = (e, t = "-") =>
    e
        .split(/(?=[A-Z])/)
        .map((i) => i.toLowerCase())
        .join(t);
const ts = (e, t) => {
    const i = {};
    return (
        te(t, (a) => {
            i[a] = {
                get: () => e.getState().options[a],
                set: (n) => {
                    e.dispatch(`SET_${pi(a, "_").toUpperCase()}`, { value: n });
                },
            };
        }),
        i
    );
};
const is = (e) => (t, i, a) => {
    const n = {};
    return (
        te(e, (l) => {
            const o = pi(l, "_").toUpperCase();
            n[`SET_${o}`] = (r) => {
                try {
                    a.options[l] = r.value;
                } catch {}
                t(`DID_SET_${o}`, { value: a.options[l] });
            };
        }),
        n
    );
};
const as = (e) => (t) => {
    const i = {};
    return (
        te(e, (a) => {
            i[`GET_${pi(a, "_").toUpperCase()}`] = (n) => t.options[a];
        }),
        i
    );
};
const Re = { API: 1, DROP: 2, BROWSE: 3, PASTE: 4, NONE: 5 };
const qi = () => Math.random().toString(36).substring(2, 11);
const $i = (e, t) => e.splice(t, 1);
const ns = (e, t) => {
    t ? e() : document.hidden ? Promise.resolve(1).then(e) : setTimeout(e, 0);
};
const mi = () => {
    const e = [];
    const t = (a, n) => {
        $i(
            e,
            e.findIndex((l) => l.event === a && (l.cb === n || !n)),
        );
    };
    const i = (a, n, l) => {
        e.filter((o) => o.event === a)
            .map((o) => o.cb)
            .forEach((o) => ns(() => o(...n), l));
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
                cb: (...l) => {
                    t(a, n), n(...l);
                },
            });
        },
        off: t,
    };
};
const Rn = (e, t, i) => {
    Object.getOwnPropertyNames(e)
        .filter((a) => !i.includes(a))
        .forEach((a) =>
            Object.defineProperty(t, a, Object.getOwnPropertyDescriptor(e, a)),
        );
};
const ls = [
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
const he = (e) => {
    const t = {};
    return Rn(e, t, ls), t;
};
const os = (e) => {
    e.forEach((t, i) => {
        t.released && $i(e, i);
    });
};
const U = {
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
const re = { INPUT: 1, LIMBO: 2, LOCAL: 3 };
const Sn = (e) => /[^0-9]+/.exec(e);
const _n = () => Sn((1.1).toLocaleString())[0];
const rs = () => {
    const e = _n();
    const t = (1e3).toLocaleString();
    return t !== "1000" ? Sn(t)[0] : e === "." ? "," : ".";
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
const Xi = [];
const Ae = (e, t, i) =>
    new Promise((a, n) => {
        const l = Xi.filter((r) => r.key === e).map((r) => r.cb);
        if (l.length === 0) {
            a(t);
            return;
        }
        const o = l.shift();
        l.reduce((r, s) => r.then((p) => s(p, i)), o(t, i))
            .then((r) => a(r))
            .catch((r) => n(r));
    });
const tt = (e, t, i) => Xi.filter((a) => a.key === e).map((a) => a.cb(t, i));
const ss = (e, t) => Xi.push({ key: e, cb: t });
const cs = (e) => Object.assign(pt, e);
const oi = () => ({ ...pt });
const ds = (e) => {
    te(e, (t, i) => {
        pt[t] && (pt[t][0] = yn(i, pt[t][0], pt[t][1]));
    });
};
var pt = {
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
    labelDecimalSeparator: [_n(), M.STRING],
    labelThousandsSeparator: [rs(), M.STRING],
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
const Ke = (e, t) =>
    ke(t)
        ? e[0] || null
        : bt(t)
          ? e[t] || null
          : (typeof t === "object" && (t = t.id),
            e.find((i) => i.id === t) || null);
const wn = (e) => {
    if (ke(e)) return e;
    if (/:/.test(e)) {
        const t = e.split(":");
        return t[1] / t[0];
    }
    return parseFloat(e);
};
const Pe = (e) => e.filter((t) => !t.archived);
const Ln = { EMPTY: 0, IDLE: 1, ERROR: 2, BUSY: 3, READY: 4 };
let Zt = null;
const ps = () => {
    if (Zt === null) {
        try {
            const e = new DataTransfer();
            e.items.add(new File(["hello world"], "This_Works.txt"));
            const t = document.createElement("input");
            t.setAttribute("type", "file"),
                (t.files = e.files),
                (Zt = t.files.length === 1);
        } catch {
            Zt = !1;
        }
    }
    return Zt;
};
const ms = [U.LOAD_ERROR, U.PROCESSING_ERROR, U.PROCESSING_REVERT_ERROR];
const us = [U.LOADING, U.PROCESSING, U.PROCESSING_QUEUED, U.INIT];
const gs = [U.PROCESSING_COMPLETE];
const fs = (e) => ms.includes(e.status);
const hs = (e) => us.includes(e.status);
const bs = (e) => gs.includes(e.status);
const Ua = (e) =>
    ce(e.options.server) &&
    (ce(e.options.server.process) || Xe(e.options.server.process));
const Es = (e) => ({
    GET_STATUS: () => {
        const t = Pe(e.items);
        const { EMPTY: i, ERROR: a, BUSY: n, IDLE: l, READY: o } = Ln;
        return t.length === 0
            ? i
            : t.some(fs)
              ? a
              : t.some(hs)
                ? n
                : t.some(bs)
                  ? o
                  : l;
    },
    GET_ITEM: (t) => Ke(e.items, t),
    GET_ACTIVE_ITEM: (t) => Ke(Pe(e.items), t),
    GET_ACTIVE_ITEMS: () => Pe(e.items),
    GET_ITEMS: () => e.items,
    GET_ITEM_NAME: (t) => {
        const i = Ke(e.items, t);
        return i ? i.filename : null;
    },
    GET_ITEM_SIZE: (t) => {
        const i = Ke(e.items, t);
        return i ? i.fileSize : null;
    },
    GET_STYLES: () =>
        Object.keys(e.options)
            .filter((t) => /^style/.test(t))
            .map((t) => ({ name: t, value: e.options[t] })),
    GET_PANEL_ASPECT_RATIO: () =>
        /circle/.test(e.options.stylePanelLayout)
            ? 1
            : wn(e.options.stylePanelAspectRatio),
    GET_ITEM_PANEL_ASPECT_RATIO: () => e.options.styleItemPanelAspectRatio,
    GET_ITEMS_BY_STATUS: (t) => Pe(e.items).filter((i) => i.status === t),
    GET_TOTAL_ITEMS: () => Pe(e.items).length,
    SHOULD_UPDATE_FILE_INPUT: () => e.options.storeAsFile && ps() && !Ua(e),
    IS_ASYNC: () => Ua(e),
    GET_FILE_SIZE_LABELS: (t) => ({
        labelBytes: t("GET_LABEL_FILE_SIZE_BYTES") || void 0,
        labelKilobytes: t("GET_LABEL_FILE_SIZE_KILOBYTES") || void 0,
        labelMegabytes: t("GET_LABEL_FILE_SIZE_MEGABYTES") || void 0,
        labelGigabytes: t("GET_LABEL_FILE_SIZE_GIGABYTES") || void 0,
    }),
});
const Ts = (e) => {
    const t = Pe(e.items).length;
    if (!e.options.allowMultiple) return t === 0;
    const i = e.options.maxFiles;
    return i === null || t < i;
};
const Mn = (e, t, i) => Math.max(Math.min(i, e), t);
const Is = (e, t, i) => e.splice(t, 0, i);
const vs = (e, t, i) =>
    ke(t)
        ? null
        : typeof i > "u"
          ? (e.push(t), t)
          : ((i = Mn(i, 0, e.length)), Is(e, i, t), t);
const Fi = (e) =>
    /^\s*data:([a-z]+\/[a-z0-9-+.]+(;[a-z-]+=[a-z0-9-]+)?)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s]*)\s*$/i.test(
        e,
    );
const Dt = (e) => `${e}`.split("/").pop().split("?").shift();
const ui = (e) => e.split(".").pop();
const xs = (e) => {
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
const At = (e, t = "") => (t + e).slice(-t.length);
const An = (e = new Date()) =>
    `${e.getFullYear()}-${At(e.getMonth() + 1, "00")}-${At(e.getDate(), "00")}_${At(e.getHours(), "00")}-${At(e.getMinutes(), "00")}-${At(e.getSeconds(), "00")}`;
const ht = (e, t, i = null, a = null) => {
    const n =
        typeof i === "string"
            ? e.slice(0, e.size, i)
            : e.slice(0, e.size, e.type);
    return (
        (n.lastModifiedDate = new Date()),
        e._relativePath && (n._relativePath = e._relativePath),
        ge(t) || (t = An()),
        t && a === null && ui(t)
            ? (n.name = t)
            : ((a = a || xs(n.type)), (n.name = t + (a ? "." + a : ""))),
        n
    );
};
const ys = () =>
    (window.BlobBuilder =
        window.BlobBuilder ||
        window.WebKitBlobBuilder ||
        window.MozBlobBuilder ||
        window.MSBlobBuilder);
const Pn = (e, t) => {
    const i = ys();
    if (i) {
        const a = new i();
        return a.append(e), a.getBlob(t);
    }
    return new Blob([e], { type: t });
};
const Rs = (e, t) => {
    const i = new ArrayBuffer(e.length);
    const a = new Uint8Array(i);
    for (let n = 0; n < e.length; n++) a[n] = e.charCodeAt(n);
    return Pn(i, t);
};
const zn = (e) => (/^data:(.+);/.exec(e) || [])[1] || null;
const Ss = (e) => e.split(",")[1].replace(/\s/g, "");
const _s = (e) => atob(Ss(e));
const ws = (e) => {
    const t = zn(e);
    const i = _s(e);
    return Rs(i, t);
};
const Ls = (e, t, i) => ht(ws(e), t, null, i);
const Ms = (e) => {
    if (!/^content-disposition:/i.test(e)) return null;
    const t = e
        .split(/filename=|filename\*=.+''/)
        .splice(1)
        .map((i) => i.trim().replace(/^["']|[;"']{0,2}$/g, ""))
        .filter((i) => i.length);
    return t.length ? decodeURI(t[t.length - 1]) : null;
};
const As = (e) => {
    if (/content-length:/i.test(e)) {
        const t = e.match(/[0-9]+/)[0];
        return t ? parseInt(t, 10) : null;
    }
    return null;
};
const Ps = (e) =>
    (/x-content-transfer-id:/i.test(e) && (e.split(":")[1] || "").trim()) ||
    null;
const Ki = (e) => {
    const t = { source: null, name: null, size: null };
    const i = e.split(`
`);
    for (const a of i) {
        const n = Ms(a);
        if (n) {
            t.name = n;
            continue;
        }
        const l = As(a);
        if (l) {
            t.size = l;
            continue;
        }
        const o = Ps(a);
        if (o) {
            t.source = o;
            continue;
        }
    }
    return t;
};
const zs = (e) => {
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
        const r = t.source;
        o.fire("init", r),
            r instanceof File
                ? o.fire("load", r)
                : r instanceof Blob
                  ? o.fire("load", ht(r, r.name))
                  : Fi(r)
                    ? o.fire("load", Ls(r))
                    : l(r);
    };
    const l = (r) => {
        if (!e) {
            o.fire("error", {
                type: "error",
                body: "Can't load URL",
                code: 400,
            });
            return;
        }
        (t.timestamp = Date.now()),
            (t.request = e(
                r,
                (s) => {
                    (t.duration = Date.now() - t.timestamp),
                        (t.complete = !0),
                        s instanceof Blob && (s = ht(s, s.name || Dt(r))),
                        o.fire(
                            "load",
                            s instanceof Blob ? s : s ? s.body : null,
                        );
                },
                (s) => {
                    o.fire(
                        "error",
                        typeof s === "string"
                            ? { type: "error", code: 0, body: s }
                            : s,
                    );
                },
                (s, p, c) => {
                    if (
                        (c && (t.size = c),
                        (t.duration = Date.now() - t.timestamp),
                        !s)
                    ) {
                        t.progress = null;
                        return;
                    }
                    (t.progress = p / c), o.fire("progress", t.progress);
                },
                () => {
                    o.fire("abort");
                },
                (s) => {
                    const p = Ki(typeof s === "string" ? s : s.headers);
                    o.fire("meta", {
                        size: t.size || p.size,
                        filename: p.name,
                        source: p.source,
                    });
                },
            ));
    };
    const o = {
        ...mi(),
        setSource: (r) => (t.source = r),
        getProgress: i,
        abort: a,
        load: n,
    };
    return o;
};
const Wa = (e) => /GET|HEAD/.test(e);
const Qe = (e, t, i) => {
    const a = {
        onheaders: () => {},
        onprogress: () => {},
        onload: () => {},
        ontimeout: () => {},
        onerror: () => {},
        onabort: () => {},
        abort: () => {
            (n = !0), o.abort();
        },
    };
    let n = !1;
    let l = !1;
    (i = { method: "POST", headers: {}, withCredentials: !1, ...i }),
        (t = encodeURI(t)),
        Wa(i.method) &&
            e &&
            (t = `${t}${encodeURIComponent(typeof e === "string" ? e : JSON.stringify(e))}`);
    const o = new XMLHttpRequest();
    const r = Wa(i.method) ? o : o.upload;
    return (
        (r.onprogress = (s) => {
            n || a.onprogress(s.lengthComputable, s.loaded, s.total);
        }),
        (o.onreadystatechange = () => {
            o.readyState < 2 ||
                (o.readyState === 4 && o.status === 0) ||
                l ||
                ((l = !0), a.onheaders(o));
        }),
        (o.onload = () => {
            o.status >= 200 && o.status < 300 ? a.onload(o) : a.onerror(o);
        }),
        (o.onerror = () => a.onerror(o)),
        (o.onabort = () => {
            (n = !0), a.onabort();
        }),
        (o.ontimeout = () => a.ontimeout(o)),
        o.open(i.method, t, !0),
        bt(i.timeout) && (o.timeout = i.timeout),
        Object.keys(i.headers).forEach((s) => {
            const p = unescape(encodeURIComponent(i.headers[s]));
            o.setRequestHeader(s, p);
        }),
        i.responseType && (o.responseType = i.responseType),
        i.withCredentials && (o.withCredentials = !0),
        o.send(e),
        a
    );
};
const ie = (e, t, i, a) => ({ type: e, code: t, body: i, headers: a });
const Ze = (e) => (t) => {
    e(ie("error", 0, "Timeout", t.getAllResponseHeaders()));
};
const Ha = (e) => /\?/.test(e);
const Ot = (...e) => {
    let t = "";
    return (
        e.forEach((i) => {
            t += Ha(t) && Ha(i) ? i.replace(/\?/, "&") : i;
        }),
        t
    );
};
const wi = (e = "", t) => {
    if (typeof t === "function") return t;
    if (!t || !ge(t.url)) return null;
    const i = t.onload || ((n) => n);
    const a = t.onerror || ((n) => null);
    return (n, l, o, r, s, p) => {
        const c = Qe(n, Ot(e, t.url), { ...t, responseType: "blob" });
        return (
            (c.onload = (d) => {
                const m = d.getAllResponseHeaders();
                const u = Ki(m).name || Dt(n);
                l(
                    ie(
                        "load",
                        d.status,
                        t.method === "HEAD" ? null : ht(i(d.response), u),
                        m,
                    ),
                );
            }),
            (c.onerror = (d) => {
                o(
                    ie(
                        "error",
                        d.status,
                        a(d.response) || d.statusText,
                        d.getAllResponseHeaders(),
                    ),
                );
            }),
            (c.onheaders = (d) => {
                p(ie("headers", d.status, null, d.getAllResponseHeaders()));
            }),
            (c.ontimeout = Ze(o)),
            (c.onprogress = r),
            (c.onabort = s),
            c
        );
    };
};
const xe = { QUEUED: 0, COMPLETE: 1, PROCESSING: 2, ERROR: 3, WAITING: 4 };
const Os = (e, t, i, a, n, l, o, r, s, p, c) => {
    const d = [];
    const {
        chunkTransferId: m,
        chunkServer: u,
        chunkSize: g,
        chunkRetryDelays: f,
    } = c;
    const h = { serverId: m, aborted: !1 };
    const I = t.ondata || ((w) => w);
    const b =
        t.onload ||
        ((w, O) =>
            O === "HEAD" ? w.getResponseHeader("Upload-Offset") : w.response);
    const T = t.onerror || ((w) => null);
    const v = (w) => {
        const O = new FormData();
        ce(n) && O.append(i, JSON.stringify(n));
        const S =
            typeof t.headers === "function"
                ? t.headers(a, n)
                : { ...t.headers, "Upload-Length": a.size };
        const L = { ...t, headers: S };
        const D = Qe(I(O), Ot(e, t.url), L);
        (D.onload = (F) => w(b(F, L.method))),
            (D.onerror = (F) =>
                o(
                    ie(
                        "error",
                        F.status,
                        T(F.response) || F.statusText,
                        F.getAllResponseHeaders(),
                    ),
                )),
            (D.ontimeout = Ze(o));
    };
    const y = (w) => {
        const O = Ot(e, u.url, h.serverId);
        const L = {
            headers:
                typeof t.headers === "function"
                    ? t.headers(h.serverId)
                    : { ...t.headers },
            method: "HEAD",
        };
        const D = Qe(null, O, L);
        (D.onload = (F) => w(b(F, L.method))),
            (D.onerror = (F) =>
                o(
                    ie(
                        "error",
                        F.status,
                        T(F.response) || F.statusText,
                        F.getAllResponseHeaders(),
                    ),
                )),
            (D.ontimeout = Ze(o));
    };
    const E = Math.floor(a.size / g);
    for (let w = 0; w <= E; w++) {
        const O = w * g;
        const S = a.slice(O, O + g, "application/offset+octet-stream");
        d[w] = {
            index: w,
            size: S.size,
            offset: O,
            data: S,
            file: a,
            progress: 0,
            retries: [...f],
            status: xe.QUEUED,
            error: null,
            request: null,
            timeout: null,
        };
    }
    const _ = () => l(h.serverId);
    const x = (w) => w.status === xe.QUEUED || w.status === xe.ERROR;
    const R = (w) => {
        if (h.aborted) return;
        if (((w = w || d.find(x)), !w)) {
            d.every((C) => C.status === xe.COMPLETE) && _();
            return;
        }
        (w.status = xe.PROCESSING), (w.progress = null);
        const O = u.ondata || ((C) => C);
        const S = u.onerror || ((C) => null);
        const L = u.onload || (() => {});
        const D = Ot(e, u.url, h.serverId);
        const F =
            typeof u.headers === "function"
                ? u.headers(w)
                : {
                      ...u.headers,
                      "Content-Type": "application/offset+octet-stream",
                      "Upload-Offset": w.offset,
                      "Upload-Length": a.size,
                      "Upload-Name": a.name,
                  };
        const G = (w.request = Qe(O(w.data), D, { ...u, headers: F }));
        (G.onload = (C) => {
            L(C, w.index, d.length),
                (w.status = xe.COMPLETE),
                (w.request = null),
                A();
        }),
            (G.onprogress = (C, q, X) => {
                (w.progress = C ? q : null), P();
            }),
            (G.onerror = (C) => {
                (w.status = xe.ERROR),
                    (w.request = null),
                    (w.error = S(C.response) || C.statusText),
                    z(w) ||
                        o(
                            ie(
                                "error",
                                C.status,
                                S(C.response) || C.statusText,
                                C.getAllResponseHeaders(),
                            ),
                        );
            }),
            (G.ontimeout = (C) => {
                (w.status = xe.ERROR), (w.request = null), z(w) || Ze(o)(C);
            }),
            (G.onabort = () => {
                (w.status = xe.QUEUED), (w.request = null), s();
            });
    };
    const z = (w) =>
        w.retries.length === 0
            ? !1
            : ((w.status = xe.WAITING),
              clearTimeout(w.timeout),
              (w.timeout = setTimeout(() => {
                  R(w);
              }, w.retries.shift())),
              !0);
    const P = () => {
        const w = d.reduce(
            (S, L) =>
                S === null || L.progress === null ? null : S + L.progress,
            0,
        );
        if (w === null) return r(!1, 0, 0);
        const O = d.reduce((S, L) => S + L.size, 0);
        r(!0, w, O);
    };
    const A = () => {
        d.filter((O) => O.status === xe.PROCESSING).length >= 1 || R();
    };
    const B = () => {
        d.forEach((w) => {
            clearTimeout(w.timeout), w.request && w.request.abort();
        });
    };
    return (
        h.serverId
            ? y((w) => {
                  h.aborted ||
                      (d
                          .filter((O) => O.offset < w)
                          .forEach((O) => {
                              (O.status = xe.COMPLETE), (O.progress = O.size);
                          }),
                      A());
              })
            : v((w) => {
                  h.aborted || (p(w), (h.serverId = w), A());
              }),
        {
            abort: () => {
                (h.aborted = !0), B();
            },
        }
    );
};
const Fs = (e, t, i, a) => (n, l, o, r, s, p, c) => {
    if (!n) return;
    const d = a.chunkUploads;
    const m = d && n.size > a.chunkSize;
    const u = d && (m || a.chunkForce);
    if (n instanceof Blob && u) return Os(e, t, i, n, l, o, r, s, p, c, a);
    const g = t.ondata || ((y) => y);
    const f = t.onload || ((y) => y);
    const h = t.onerror || ((y) => null);
    const I =
        typeof t.headers === "function"
            ? t.headers(n, l) || {}
            : { ...t.headers };
    const b = { ...t, headers: I };
    const T = new FormData();
    ce(l) && T.append(i, JSON.stringify(l)),
        (n instanceof Blob ? [{ name: null, file: n }] : n).forEach((y) => {
            T.append(
                i,
                y.file,
                y.name === null ? y.file.name : `${y.name}${y.file.name}`,
            );
        });
    const v = Qe(g(T), Ot(e, t.url), b);
    return (
        (v.onload = (y) => {
            o(ie("load", y.status, f(y.response), y.getAllResponseHeaders()));
        }),
        (v.onerror = (y) => {
            r(
                ie(
                    "error",
                    y.status,
                    h(y.response) || y.statusText,
                    y.getAllResponseHeaders(),
                ),
            );
        }),
        (v.ontimeout = Ze(r)),
        (v.onprogress = s),
        (v.onabort = p),
        v
    );
};
const Ds = (e = "", t, i, a) =>
    typeof t === "function"
        ? (...n) => t(i, ...n, a)
        : !t || !ge(t.url)
          ? null
          : Fs(e, t, i, a);
const Pt = (e = "", t) => {
    if (typeof t === "function") return t;
    if (!t || !ge(t.url)) return (n, l) => l();
    const i = t.onload || ((n) => n);
    const a = t.onerror || ((n) => null);
    return (n, l, o) => {
        const r = Qe(n, e + t.url, t);
        return (
            (r.onload = (s) => {
                l(
                    ie(
                        "load",
                        s.status,
                        i(s.response),
                        s.getAllResponseHeaders(),
                    ),
                );
            }),
            (r.onerror = (s) => {
                o(
                    ie(
                        "error",
                        s.status,
                        a(s.response) || s.statusText,
                        s.getAllResponseHeaders(),
                    ),
                );
            }),
            (r.ontimeout = Ze(o)),
            r
        );
    };
};
const On = (e = 0, t = 1) => e + Math.random() * (t - e);
const Cs = (e, t = 1e3, i = 0, a = 25, n = 250) => {
    let l = null;
    const o = Date.now();
    const r = () => {
        const s = Date.now() - o;
        let p = On(a, n);
        s + p > t && (p = s + p - t);
        const c = s / t;
        if (c >= 1 || document.hidden) {
            e(1);
            return;
        }
        e(c), (l = setTimeout(r, p));
    };
    return (
        t > 0 && r(),
        {
            clear: () => {
                clearTimeout(l);
            },
        }
    );
};
const Bs = (e, t) => {
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
        const m = () => {
            i.duration === 0 ||
                i.progress === null ||
                p.fire("progress", p.getProgress());
        };
        const u = () => {
            (i.complete = !0), p.fire("load-perceived", i.response.body);
        };
        p.fire("start"),
            (i.timestamp = Date.now()),
            (i.perceivedPerformanceUpdater = Cs(
                (g) => {
                    (i.perceivedProgress = g),
                        (i.perceivedDuration = Date.now() - i.timestamp),
                        m(),
                        i.response &&
                            i.perceivedProgress === 1 &&
                            !i.complete &&
                            u();
                },
                a ? On(750, 1500) : 0,
            )),
            (i.request = e(
                c,
                d,
                (g) => {
                    (i.response = ce(g)
                        ? g
                        : {
                              type: "load",
                              code: 200,
                              body: `${g}`,
                              headers: {},
                          }),
                        (i.duration = Date.now() - i.timestamp),
                        (i.progress = 1),
                        p.fire("load", i.response.body),
                        (!a || (a && i.perceivedProgress === 1)) && u();
                },
                (g) => {
                    i.perceivedPerformanceUpdater.clear(),
                        p.fire(
                            "error",
                            ce(g)
                                ? g
                                : { type: "error", code: 0, body: `${g}` },
                        );
                },
                (g, f, h) => {
                    (i.duration = Date.now() - i.timestamp),
                        (i.progress = g ? f / h : null),
                        m();
                },
                () => {
                    i.perceivedPerformanceUpdater.clear(),
                        p.fire("abort", i.response ? i.response.body : null);
                },
                (g) => {
                    p.fire("transfer", g);
                },
            ));
    };
    const l = () => {
        i.request &&
            (i.perceivedPerformanceUpdater.clear(),
            i.request.abort && i.request.abort(),
            (i.complete = !0));
    };
    const o = () => {
        l(),
            (i.complete = !1),
            (i.perceivedProgress = 0),
            (i.progress = 0),
            (i.timestamp = null),
            (i.perceivedDuration = 0),
            (i.duration = 0),
            (i.request = null),
            (i.response = null);
    };
    const r = a
        ? () => (i.progress ? Math.min(i.progress, i.perceivedProgress) : null)
        : () => i.progress || null;
    const s = a
        ? () => Math.min(i.duration, i.perceivedDuration)
        : () => i.duration;
    const p = {
        ...mi(),
        process: n,
        abort: l,
        getProgress: r,
        getDuration: s,
        reset: o,
    };
    return p;
};
const Fn = (e) => e.substring(0, e.lastIndexOf(".")) || e;
const Ns = (e) => {
    const t = [e.name, e.size, e.type];
    return (
        e instanceof Blob || Fi(e)
            ? (t[0] = e.name || An())
            : Fi(e)
              ? ((t[1] = e.length), (t[2] = zn(e)))
              : ge(e) &&
                ((t[0] = Dt(e)),
                (t[1] = 0),
                (t[2] = "application/octet-stream")),
        { name: t[0], size: t[1], type: t[2] }
    );
};
const Je = (e) => !!(e instanceof File || (e instanceof Blob && e.name));
const Dn = (e) => {
    if (!ce(e)) return e;
    const t = ci(e) ? [] : {};
    for (const i in e) {
        if (!e.hasOwnProperty(i)) continue;
        const a = e[i];
        t[i] = a && ce(a) ? Dn(a) : a;
    }
    return t;
};
const ks = (e = null, t = null, i = null) => {
    const a = qi();
    const n = {
        archived: !1,
        frozen: !1,
        released: !1,
        source: null,
        file: i,
        serverFileReference: t,
        transferId: null,
        processingAborted: !1,
        status: t ? U.PROCESSING_COMPLETE : U.INIT,
        activeLoader: null,
        activeProcessor: null,
    };
    let l = null;
    const o = {};
    const r = (x) => (n.status = x);
    const s = (x, ...R) => {
        n.released || n.frozen || E.fire(x, ...R);
    };
    const p = () => ui(n.file.name);
    const c = () => n.file.type;
    const d = () => n.file.size;
    const m = () => n.file;
    const u = (x, R, z) => {
        if (((n.source = x), E.fireSync("init"), n.file)) {
            E.fireSync("load-skip");
            return;
        }
        (n.file = Ns(x)),
            R.on("init", () => {
                s("load-init");
            }),
            R.on("meta", (P) => {
                (n.file.size = P.size),
                    (n.file.filename = P.filename),
                    P.source &&
                        ((e = re.LIMBO),
                        (n.serverFileReference = P.source),
                        (n.status = U.PROCESSING_COMPLETE)),
                    s("load-meta");
            }),
            R.on("progress", (P) => {
                r(U.LOADING), s("load-progress", P);
            }),
            R.on("error", (P) => {
                r(U.LOAD_ERROR), s("load-request-error", P);
            }),
            R.on("abort", () => {
                r(U.INIT), s("load-abort");
            }),
            R.on("load", (P) => {
                n.activeLoader = null;
                const A = (w) => {
                    (n.file = Je(w) ? w : n.file),
                        e === re.LIMBO && n.serverFileReference
                            ? r(U.PROCESSING_COMPLETE)
                            : r(U.IDLE),
                        s("load");
                };
                const B = (w) => {
                    (n.file = P),
                        s("load-meta"),
                        r(U.LOAD_ERROR),
                        s("load-file-error", w);
                };
                if (n.serverFileReference) {
                    A(P);
                    return;
                }
                z(P, A, B);
            }),
            R.setSource(x),
            (n.activeLoader = R),
            R.load();
    };
    const g = () => {
        n.activeLoader && n.activeLoader.load();
    };
    const f = () => {
        if (n.activeLoader) {
            n.activeLoader.abort();
            return;
        }
        r(U.INIT), s("load-abort");
    };
    const h = (x, R) => {
        if (n.processingAborted) {
            n.processingAborted = !1;
            return;
        }
        if ((r(U.PROCESSING), (l = null), !(n.file instanceof Blob))) {
            E.on("load", () => {
                h(x, R);
            });
            return;
        }
        x.on("load", (A) => {
            (n.transferId = null), (n.serverFileReference = A);
        }),
            x.on("transfer", (A) => {
                n.transferId = A;
            }),
            x.on("load-perceived", (A) => {
                (n.activeProcessor = null),
                    (n.transferId = null),
                    (n.serverFileReference = A),
                    r(U.PROCESSING_COMPLETE),
                    s("process-complete", A);
            }),
            x.on("start", () => {
                s("process-start");
            }),
            x.on("error", (A) => {
                (n.activeProcessor = null),
                    r(U.PROCESSING_ERROR),
                    s("process-error", A);
            }),
            x.on("abort", (A) => {
                (n.activeProcessor = null),
                    (n.serverFileReference = A),
                    r(U.IDLE),
                    s("process-abort"),
                    l && l();
            }),
            x.on("progress", (A) => {
                s("process-progress", A);
            });
        const z = (A) => {
            n.archived || x.process(A, { ...o });
        };
        const P = console.error;
        R(n.file, z, P), (n.activeProcessor = x);
    };
    const I = () => {
        (n.processingAborted = !1), r(U.PROCESSING_QUEUED);
    };
    const b = () =>
        new Promise((x) => {
            if (!n.activeProcessor) {
                (n.processingAborted = !0), r(U.IDLE), s("process-abort"), x();
                return;
            }
            (l = () => {
                x();
            }),
                n.activeProcessor.abort();
        });
    const T = (x, R) =>
        new Promise((z, P) => {
            const A =
                n.serverFileReference !== null
                    ? n.serverFileReference
                    : n.transferId;
            if (A === null) {
                z();
                return;
            }
            x(
                A,
                () => {
                    (n.serverFileReference = null), (n.transferId = null), z();
                },
                (B) => {
                    if (!R) {
                        z();
                        return;
                    }
                    r(U.PROCESSING_REVERT_ERROR),
                        s("process-revert-error"),
                        P(B);
                },
            ),
                r(U.IDLE),
                s("process-revert");
        });
    const v = (x, R, z) => {
        const P = x.split(".");
        const A = P[0];
        const B = P.pop();
        let w = o;
        P.forEach((O) => (w = w[O])),
            JSON.stringify(w[B]) !== JSON.stringify(R) &&
                ((w[B] = R),
                s("metadata-update", { key: A, value: o[A], silent: z }));
    };
    const E = {
        id: { get: () => a },
        origin: { get: () => e, set: (x) => (e = x) },
        serverId: { get: () => n.serverFileReference },
        transferId: { get: () => n.transferId },
        status: { get: () => n.status },
        filename: { get: () => n.file.name },
        filenameWithoutExtension: { get: () => Fn(n.file.name) },
        fileExtension: { get: p },
        fileType: { get: c },
        fileSize: { get: d },
        file: { get: m },
        relativePath: { get: () => n.file._relativePath },
        source: { get: () => n.source },
        getMetadata: (x) => Dn(x ? o[x] : o),
        setMetadata: (x, R, z) => {
            if (ce(x)) {
                const P = x;
                return (
                    Object.keys(P).forEach((A) => {
                        v(A, P[A], R);
                    }),
                    x
                );
            }
            return v(x, R, z), R;
        },
        extend: (x, R) => (_[x] = R),
        abortLoad: f,
        retryLoad: g,
        requestProcessing: I,
        abortProcessing: b,
        load: u,
        process: h,
        revert: T,
        ...mi(),
        freeze: () => (n.frozen = !0),
        release: () => (n.released = !0),
        released: { get: () => n.released },
        archive: () => (n.archived = !0),
        archived: { get: () => n.archived },
        setFile: (x) => (n.file = x),
    };
    const _ = We(E);
    return _;
};
const Vs = (e, t) => (ke(t) ? 0 : ge(t) ? e.findIndex((i) => i.id === t) : -1);
const ja = (e, t) => {
    const i = Vs(e, t);
    if (!(i < 0)) return e[i] || null;
};
const Ya = (e, t, i, a, n, l) => {
    const o = Qe(null, e, { method: "GET", responseType: "blob" });
    return (
        (o.onload = (r) => {
            const s = r.getAllResponseHeaders();
            const p = Ki(s).name || Dt(e);
            t(ie("load", r.status, ht(r.response, p), s));
        }),
        (o.onerror = (r) => {
            i(ie("error", r.status, r.statusText, r.getAllResponseHeaders()));
        }),
        (o.onheaders = (r) => {
            l(ie("headers", r.status, null, r.getAllResponseHeaders()));
        }),
        (o.ontimeout = Ze(i)),
        (o.onprogress = a),
        (o.onabort = n),
        o
    );
};
const qa = (e) => (
    e.indexOf("//") === 0 && (e = location.protocol + e),
    e
        .toLowerCase()
        .replace("blob:", "")
        .replace(/([a-z])?:\/\//, "$1")
        .split("/")[0]
);
const Gs = (e) =>
    (e.indexOf(":") > -1 || e.indexOf("//") > -1) &&
    qa(location.href) !== qa(e);
const Jt =
    (e) =>
    (...t) =>
        Xe(e) ? e(...t) : e;
const Us = (e) => !Je(e.file);
const Li = (e, t) => {
    clearTimeout(t.listUpdateTimeout),
        (t.listUpdateTimeout = setTimeout(() => {
            e("DID_UPDATE_ITEMS", { items: Pe(t.items) });
        }, 0));
};
const $a = (e, ...t) =>
    new Promise((i) => {
        if (!e) return i(!0);
        const a = e(...t);
        if (a == null) return i(!0);
        if (typeof a === "boolean") return i(a);
        typeof a.then === "function" && a.then(i);
    });
const Mi = (e, t) => {
    e.items.sort((i, a) => t(he(i), he(a)));
};
const ye =
    (e, t) =>
    ({ query: i, success: a = () => {}, failure: n = () => {}, ...l } = {}) => {
        const o = Ke(e.items, i);
        if (!o) {
            n({ error: ie("error", 0, "Item not found"), file: null });
            return;
        }
        t(o, a, n, l || {});
    };
const Ws = (e, t, i) => ({
    ABORT_ALL: () => {
        Pe(i.items).forEach((a) => {
            a.freeze(), a.abortLoad(), a.abortProcessing();
        });
    },
    DID_SET_FILES: ({ value: a = [] }) => {
        const n = a.map((o) => ({
            source: o.source ? o.source : o,
            options: o.options,
        }));
        let l = Pe(i.items);
        l.forEach((o) => {
            n.find((r) => r.source === o.source || r.source === o.file) ||
                e("REMOVE_ITEM", { query: o, remove: !1 });
        }),
            (l = Pe(i.items)),
            n.forEach((o, r) => {
                l.find((s) => s.source === o.source || s.file === o.source) ||
                    e("ADD_ITEM", {
                        ...o,
                        interactionMethod: Re.NONE,
                        index: r,
                    });
            });
    },
    DID_UPDATE_ITEM_METADATA: ({ id: a, action: n, change: l }) => {
        l.silent ||
            (clearTimeout(i.itemUpdateTimeout),
            (i.itemUpdateTimeout = setTimeout(() => {
                const o = ja(i.items, a);
                if (!t("IS_ASYNC")) {
                    Ae("SHOULD_PREPARE_OUTPUT", !1, {
                        item: o,
                        query: t,
                        action: n,
                        change: l,
                    }).then((c) => {
                        const d = t("GET_BEFORE_PREPARE_FILE");
                        d && (c = d(o, c)),
                            c &&
                                e(
                                    "REQUEST_PREPARE_OUTPUT",
                                    {
                                        query: a,
                                        item: o,
                                        success: (m) => {
                                            e("DID_PREPARE_OUTPUT", {
                                                id: a,
                                                file: m,
                                            });
                                        },
                                    },
                                    !0,
                                );
                    });
                    return;
                }
                o.origin === re.LOCAL &&
                    e("DID_LOAD_ITEM", {
                        id: o.id,
                        error: null,
                        serverFileReference: o.source,
                    });
                const r = () => {
                    setTimeout(() => {
                        e("REQUEST_ITEM_PROCESSING", { query: a });
                    }, 32);
                };
                const s = (c) => {
                    o.revert(
                        Pt(i.options.server.url, i.options.server.revert),
                        t("GET_FORCE_REVERT"),
                    )
                        .then(c ? r : () => {})
                        .catch(() => {});
                };
                const p = (c) => {
                    o.abortProcessing().then(c ? r : () => {});
                };
                if (o.status === U.PROCESSING_COMPLETE) {
                    return s(i.options.instantUpload);
                }
                if (o.status === U.PROCESSING) {
                    return p(i.options.instantUpload);
                }
                i.options.instantUpload && r();
            }, 0)));
    },
    MOVE_ITEM: ({ query: a, index: n }) => {
        const l = Ke(i.items, a);
        if (!l) return;
        const o = i.items.indexOf(l);
        (n = Mn(n, 0, i.items.length - 1)),
            o !== n && i.items.splice(n, 0, i.items.splice(o, 1)[0]);
    },
    SORT: ({ compare: a }) => {
        Mi(i, a), e("DID_SORT_ITEMS", { items: t("GET_ACTIVE_ITEMS") });
    },
    ADD_ITEMS: ({
        items: a,
        index: n,
        interactionMethod: l,
        success: o = () => {},
        failure: r = () => {},
    }) => {
        let s = n;
        if (n === -1 || typeof n > "u") {
            const u = t("GET_ITEM_INSERT_LOCATION");
            const g = t("GET_TOTAL_ITEMS");
            s = u === "before" ? 0 : g;
        }
        const p = t("GET_IGNORED_FILES");
        const c = (u) => (Je(u) ? !p.includes(u.name.toLowerCase()) : !ke(u));
        const m = a.filter(c).map(
            (u) =>
                new Promise((g, f) => {
                    e("ADD_ITEM", {
                        interactionMethod: l,
                        source: u.source || u,
                        success: g,
                        failure: f,
                        index: s++,
                        options: u.options || {},
                    });
                }),
        );
        Promise.all(m).then(o).catch(r);
    },
    ADD_ITEM: ({
        source: a,
        index: n = -1,
        interactionMethod: l,
        success: o = () => {},
        failure: r = () => {},
        options: s = {},
    }) => {
        if (ke(a)) {
            r({ error: ie("error", 0, "No source"), file: null });
            return;
        }
        if (Je(a) && i.options.ignoredFiles.includes(a.name.toLowerCase())) {
            return;
        }
        if (!Ts(i)) {
            if (
                i.options.allowMultiple ||
                (!i.options.allowMultiple && !i.options.allowReplace)
            ) {
                const b = ie("warning", 0, "Max files");
                e("DID_THROW_MAX_FILES", { source: a, error: b }),
                    r({ error: b, file: null });
                return;
            }
            const I = Pe(i.items)[0];
            if (
                I.status === U.PROCESSING_COMPLETE ||
                I.status === U.PROCESSING_REVERT_ERROR
            ) {
                const b = t("GET_FORCE_REVERT");
                if (
                    (I.revert(
                        Pt(i.options.server.url, i.options.server.revert),
                        b,
                    )
                        .then(() => {
                            b &&
                                e("ADD_ITEM", {
                                    source: a,
                                    index: n,
                                    interactionMethod: l,
                                    success: o,
                                    failure: r,
                                    options: s,
                                });
                        })
                        .catch(() => {}),
                    b)
                ) {
                    return;
                }
            }
            e("REMOVE_ITEM", { query: I.id });
        }
        const p =
            s.type === "local"
                ? re.LOCAL
                : s.type === "limbo"
                  ? re.LIMBO
                  : re.INPUT;
        const c = ks(p, p === re.INPUT ? null : a, s.file);
        Object.keys(s.metadata || {}).forEach((I) => {
            c.setMetadata(I, s.metadata[I]);
        }),
            tt("DID_CREATE_ITEM", c, { query: t, dispatch: e });
        const d = t("GET_ITEM_INSERT_LOCATION");
        i.options.itemInsertLocationFreedom ||
            (n = d === "before" ? -1 : i.items.length),
            vs(i.items, c, n),
            Xe(d) && a && Mi(i, d);
        const m = c.id;
        c.on("init", () => {
            e("DID_INIT_ITEM", { id: m });
        }),
            c.on("load-init", () => {
                e("DID_START_ITEM_LOAD", { id: m });
            }),
            c.on("load-meta", () => {
                e("DID_UPDATE_ITEM_META", { id: m });
            }),
            c.on("load-progress", (I) => {
                e("DID_UPDATE_ITEM_LOAD_PROGRESS", { id: m, progress: I });
            }),
            c.on("load-request-error", (I) => {
                const b = Jt(i.options.labelFileLoadError)(I);
                if (I.code >= 400 && I.code < 500) {
                    e("DID_THROW_ITEM_INVALID", {
                        id: m,
                        error: I,
                        status: { main: b, sub: `${I.code} (${I.body})` },
                    }),
                        r({ error: I, file: he(c) });
                    return;
                }
                e("DID_THROW_ITEM_LOAD_ERROR", {
                    id: m,
                    error: I,
                    status: { main: b, sub: i.options.labelTapToRetry },
                });
            }),
            c.on("load-file-error", (I) => {
                e("DID_THROW_ITEM_INVALID", {
                    id: m,
                    error: I.status,
                    status: I.status,
                }),
                    r({ error: I.status, file: he(c) });
            }),
            c.on("load-abort", () => {
                e("REMOVE_ITEM", { query: m });
            }),
            c.on("load-skip", () => {
                c.on("metadata-update", (I) => {
                    Je(c.file) &&
                        e("DID_UPDATE_ITEM_METADATA", { id: m, change: I });
                }),
                    e("COMPLETE_LOAD_ITEM", {
                        query: m,
                        item: c,
                        data: { source: a, success: o },
                    });
            }),
            c.on("load", () => {
                const I = (b) => {
                    if (!b) {
                        e("REMOVE_ITEM", { query: m });
                        return;
                    }
                    c.on("metadata-update", (T) => {
                        e("DID_UPDATE_ITEM_METADATA", { id: m, change: T });
                    }),
                        Ae("SHOULD_PREPARE_OUTPUT", !1, {
                            item: c,
                            query: t,
                        }).then((T) => {
                            const v = t("GET_BEFORE_PREPARE_FILE");
                            v && (T = v(c, T));
                            const y = () => {
                                e("COMPLETE_LOAD_ITEM", {
                                    query: m,
                                    item: c,
                                    data: { source: a, success: o },
                                }),
                                    Li(e, i);
                            };
                            if (T) {
                                e(
                                    "REQUEST_PREPARE_OUTPUT",
                                    {
                                        query: m,
                                        item: c,
                                        success: (E) => {
                                            e("DID_PREPARE_OUTPUT", {
                                                id: m,
                                                file: E,
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
                Ae("DID_LOAD_ITEM", c, { query: t, dispatch: e })
                    .then(() => {
                        $a(t("GET_BEFORE_ADD_FILE"), he(c)).then(I);
                    })
                    .catch((b) => {
                        if (!b || !b.error || !b.status) return I(!1);
                        e("DID_THROW_ITEM_INVALID", {
                            id: m,
                            error: b.error,
                            status: b.status,
                        });
                    });
            }),
            c.on("process-start", () => {
                e("DID_START_ITEM_PROCESSING", { id: m });
            }),
            c.on("process-progress", (I) => {
                e("DID_UPDATE_ITEM_PROCESS_PROGRESS", { id: m, progress: I });
            }),
            c.on("process-error", (I) => {
                e("DID_THROW_ITEM_PROCESSING_ERROR", {
                    id: m,
                    error: I,
                    status: {
                        main: Jt(i.options.labelFileProcessingError)(I),
                        sub: i.options.labelTapToRetry,
                    },
                });
            }),
            c.on("process-revert-error", (I) => {
                e("DID_THROW_ITEM_PROCESSING_REVERT_ERROR", {
                    id: m,
                    error: I,
                    status: {
                        main: Jt(i.options.labelFileProcessingRevertError)(I),
                        sub: i.options.labelTapToRetry,
                    },
                });
            }),
            c.on("process-complete", (I) => {
                e("DID_COMPLETE_ITEM_PROCESSING", {
                    id: m,
                    error: null,
                    serverFileReference: I,
                }),
                    e("DID_DEFINE_VALUE", { id: m, value: I });
            }),
            c.on("process-abort", () => {
                e("DID_ABORT_ITEM_PROCESSING", { id: m });
            }),
            c.on("process-revert", () => {
                e("DID_REVERT_ITEM_PROCESSING", { id: m }),
                    e("DID_DEFINE_VALUE", { id: m, value: null });
            }),
            e("DID_ADD_ITEM", { id: m, index: n, interactionMethod: l }),
            Li(e, i);
        const {
            url: u,
            load: g,
            restore: f,
            fetch: h,
        } = i.options.server || {};
        c.load(
            a,
            zs(
                p === re.INPUT
                    ? ge(a) && Gs(a) && h
                        ? wi(u, h)
                        : Ya
                    : p === re.LIMBO
                      ? wi(u, f)
                      : wi(u, g),
            ),
            (I, b, T) => {
                Ae("LOAD_FILE", I, { query: t }).then(b).catch(T);
            },
        );
    },
    REQUEST_PREPARE_OUTPUT: ({
        item: a,
        success: n,
        failure: l = () => {},
    }) => {
        const o = { error: ie("error", 0, "Item not found"), file: null };
        if (a.archived) return l(o);
        Ae("PREPARE_OUTPUT", a.file, { query: t, item: a }).then((r) => {
            Ae("COMPLETE_PREPARE_OUTPUT", r, { query: t, item: a }).then(
                (s) => {
                    if (a.archived) return l(o);
                    n(s);
                },
            );
        });
    },
    COMPLETE_LOAD_ITEM: ({ item: a, data: n }) => {
        const { success: l, source: o } = n;
        const r = t("GET_ITEM_INSERT_LOCATION");
        if (
            (Xe(r) && o && Mi(i, r),
            e("DID_LOAD_ITEM", {
                id: a.id,
                error: null,
                serverFileReference: a.origin === re.INPUT ? null : o,
            }),
            l(he(a)),
            a.origin === re.LOCAL)
        ) {
            e("DID_LOAD_LOCAL_ITEM", { id: a.id });
            return;
        }
        if (a.origin === re.LIMBO) {
            e("DID_COMPLETE_ITEM_PROCESSING", {
                id: a.id,
                error: null,
                serverFileReference: o,
            }),
                e("DID_DEFINE_VALUE", { id: a.id, value: a.serverId || o });
            return;
        }
        t("IS_ASYNC") &&
            i.options.instantUpload &&
            e("REQUEST_ITEM_PROCESSING", { query: a.id });
    },
    RETRY_ITEM_LOAD: ye(i, (a) => {
        a.retryLoad();
    }),
    REQUEST_ITEM_PREPARE: ye(i, (a, n, l) => {
        e(
            "REQUEST_PREPARE_OUTPUT",
            {
                query: a.id,
                item: a,
                success: (o) => {
                    e("DID_PREPARE_OUTPUT", { id: a.id, file: o }),
                        n({ file: a, output: o });
                },
                failure: l,
            },
            !0,
        );
    }),
    REQUEST_ITEM_PROCESSING: ye(i, (a, n, l) => {
        if (!(a.status === U.IDLE || a.status === U.PROCESSING_ERROR)) {
            const r = () =>
                e("REQUEST_ITEM_PROCESSING", {
                    query: a,
                    success: n,
                    failure: l,
                });
            const s = () => (document.hidden ? r() : setTimeout(r, 32));
            a.status === U.PROCESSING_COMPLETE ||
            a.status === U.PROCESSING_REVERT_ERROR
                ? a
                      .revert(
                          Pt(i.options.server.url, i.options.server.revert),
                          t("GET_FORCE_REVERT"),
                      )
                      .then(s)
                      .catch(() => {})
                : a.status === U.PROCESSING && a.abortProcessing().then(s);
            return;
        }
        a.status !== U.PROCESSING_QUEUED &&
            (a.requestProcessing(),
            e("DID_REQUEST_ITEM_PROCESSING", { id: a.id }),
            e("PROCESS_ITEM", { query: a, success: n, failure: l }, !0));
    }),
    PROCESS_ITEM: ye(i, (a, n, l) => {
        const o = t("GET_MAX_PARALLEL_UPLOADS");
        if (t("GET_ITEMS_BY_STATUS", U.PROCESSING).length === o) {
            i.processingQueue.push({ id: a.id, success: n, failure: l });
            return;
        }
        if (a.status === U.PROCESSING) return;
        const s = () => {
            const c = i.processingQueue.shift();
            if (!c) return;
            const { id: d, success: m, failure: u } = c;
            const g = Ke(i.items, d);
            if (!g || g.archived) {
                s();
                return;
            }
            e("PROCESS_ITEM", { query: d, success: m, failure: u }, !0);
        };
        a.onOnce("process-complete", () => {
            n(he(a)), s();
            const c = i.options.server;
            if (
                i.options.instantUpload &&
                a.origin === re.LOCAL &&
                Xe(c.remove)
            ) {
                const u = () => {};
                (a.origin = re.LIMBO), i.options.server.remove(a.source, u, u);
            }
            t("GET_ITEMS_BY_STATUS", U.PROCESSING_COMPLETE).length ===
                i.items.length && e("DID_COMPLETE_ITEM_PROCESSING_ALL");
        }),
            a.onOnce("process-error", (c) => {
                l({ error: c, file: he(a) }), s();
            });
        const p = i.options;
        a.process(
            Bs(
                Ds(p.server.url, p.server.process, p.name, {
                    chunkTransferId: a.transferId,
                    chunkServer: p.server.patch,
                    chunkUploads: p.chunkUploads,
                    chunkForce: p.chunkForce,
                    chunkSize: p.chunkSize,
                    chunkRetryDelays: p.chunkRetryDelays,
                }),
                {
                    allowMinimumUploadDuration: t(
                        "GET_ALLOW_MINIMUM_UPLOAD_DURATION",
                    ),
                },
            ),
            (c, d, m) => {
                Ae("PREPARE_OUTPUT", c, { query: t, item: a })
                    .then((u) => {
                        e("DID_PREPARE_OUTPUT", { id: a.id, file: u }), d(u);
                    })
                    .catch(m);
            },
        );
    }),
    RETRY_ITEM_PROCESSING: ye(i, (a) => {
        e("REQUEST_ITEM_PROCESSING", { query: a });
    }),
    REQUEST_REMOVE_ITEM: ye(i, (a) => {
        $a(t("GET_BEFORE_REMOVE_FILE"), he(a)).then((n) => {
            n && e("REMOVE_ITEM", { query: a });
        });
    }),
    RELEASE_ITEM: ye(i, (a) => {
        a.release();
    }),
    REMOVE_ITEM: ye(i, (a, n, l, o) => {
        const r = () => {
            const p = a.id;
            ja(i.items, p).archive(),
                e("DID_REMOVE_ITEM", { error: null, id: p, item: a }),
                Li(e, i),
                n(he(a));
        };
        const s = i.options.server;
        a.origin === re.LOCAL && s && Xe(s.remove) && o.remove !== !1
            ? (e("DID_START_ITEM_REMOVE", { id: a.id }),
              s.remove(
                  a.source,
                  () => r(),
                  (p) => {
                      e("DID_THROW_ITEM_REMOVE_ERROR", {
                          id: a.id,
                          error: ie("error", 0, p, null),
                          status: {
                              main: Jt(i.options.labelFileRemoveError)(p),
                              sub: i.options.labelTapToRetry,
                          },
                      });
                  },
              ))
            : (((o.revert && a.origin !== re.LOCAL && a.serverId !== null) ||
                  (i.options.chunkUploads &&
                      a.file.size > i.options.chunkSize) ||
                  (i.options.chunkUploads && i.options.chunkForce)) &&
                  a.revert(
                      Pt(i.options.server.url, i.options.server.revert),
                      t("GET_FORCE_REVERT"),
                  ),
              r());
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
        const n = (r) => {
            r && e("REVERT_ITEM_PROCESSING", { query: a });
        };
        const l = t("GET_BEFORE_REMOVE_FILE");
        if (!l) return n(!0);
        const o = l(he(a));
        if (o == null) return n(!0);
        if (typeof o === "boolean") return n(o);
        typeof o.then === "function" && o.then(n);
    }),
    REVERT_ITEM_PROCESSING: ye(i, (a) => {
        a.revert(
            Pt(i.options.server.url, i.options.server.revert),
            t("GET_FORCE_REVERT"),
        )
            .then(() => {
                (i.options.instantUpload || Us(a)) &&
                    e("REMOVE_ITEM", { query: a.id });
            })
            .catch(() => {});
    }),
    SET_OPTIONS: ({ options: a }) => {
        const n = Object.keys(a);
        const l = Hs.filter((r) => n.includes(r));
        [...l, ...Object.keys(a).filter((r) => !l.includes(r))].forEach((r) => {
            e(`SET_${pi(r, "_").toUpperCase()}`, { value: a[r] });
        });
    },
});
var Hs = ["server"];
const Qi = (e) => e;
const Ve = (e) => document.createElement(e);
const ae = (e, t) => {
    let i = e.childNodes[0];
    i
        ? t !== i.nodeValue && (i.nodeValue = t)
        : ((i = document.createTextNode(t)), e.appendChild(i));
};
const Xa = (e, t, i, a) => {
    const n = (((a % 360) - 90) * Math.PI) / 180;
    return { x: e + i * Math.cos(n), y: t + i * Math.sin(n) };
};
const js = (e, t, i, a, n, l) => {
    const o = Xa(e, t, i, n);
    const r = Xa(e, t, i, a);
    return ["M", o.x, o.y, "A", i, i, 0, l, 0, r.x, r.y].join(" ");
};
const Ys = (e, t, i, a, n) => {
    let l = 1;
    return (
        n > a && n - a <= 0.5 && (l = 0),
        a > n && a - n >= 0.5 && (l = 0),
        js(e, t, i, Math.min(0.9999, a) * 360, Math.min(0.9999, n) * 360, l)
    );
};
const qs = ({ root: e, props: t }) => {
    (t.spin = !1), (t.progress = 0), (t.opacity = 0);
    const i = li("svg");
    (e.ref.path = li("path", { "stroke-width": 2, "stroke-linecap": "round" })),
        i.appendChild(e.ref.path),
        (e.ref.svg = i),
        e.appendChild(i);
};
const $s = ({ root: e, props: t }) => {
    if (t.opacity === 0) return;
    t.align && (e.element.dataset.align = t.align);
    const i = parseInt(se(e.ref.path, "stroke-width"), 10);
    const a = e.rect.element.width * 0.5;
    let n = 0;
    let l = 0;
    t.spin ? ((n = 0), (l = 0.5)) : ((n = 0), (l = t.progress));
    const o = Ys(a, a, a - i, n, l);
    se(e.ref.path, "d", o),
        se(e.ref.path, "stroke-opacity", t.spin || t.progress > 0 ? 1 : 0);
};
const Ka = ne({
    tag: "div",
    name: "progress-indicator",
    ignoreRectUpdate: !0,
    ignoreRect: !0,
    create: qs,
    write: $s,
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
const Xs = ({ root: e, props: t }) => {
    (e.element.innerHTML = (t.icon || "") + `<span>${t.label}</span>`),
        (t.isDisabled = !1);
};
const Ks = ({ root: e, props: t }) => {
    const { isDisabled: i } = t;
    const a = e.query("GET_DISABLED") || t.opacity === 0;
    a && !i
        ? ((t.isDisabled = !0), se(e.element, "disabled", "disabled"))
        : !a &&
          i &&
          ((t.isDisabled = !1), e.element.removeAttribute("disabled"));
};
const Cn = ne({
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
    create: Xs,
    write: Ks,
});
const Bn = (e, t = ".", i = 1e3, a = {}) => {
    const {
        labelBytes: n = "bytes",
        labelKilobytes: l = "KB",
        labelMegabytes: o = "MB",
        labelGigabytes: r = "GB",
    } = a;
    e = Math.round(Math.abs(e));
    const s = i;
    const p = i * i;
    const c = i * i * i;
    return e < s
        ? `${e} ${n}`
        : e < p
          ? `${Math.floor(e / s)} ${l}`
          : e < c
            ? `${Qa(e / p, 1, t)} ${o}`
            : `${Qa(e / c, 2, t)} ${r}`;
};
var Qa = (e, t, i) =>
    e
        .toFixed(t)
        .split(".")
        .filter((a) => a !== "0")
        .join(i);
const Qs = ({ root: e, props: t }) => {
    const i = Ve("span");
    (i.className = "filepond--file-info-main"),
        se(i, "aria-hidden", "true"),
        e.appendChild(i),
        (e.ref.fileName = i);
    const a = Ve("span");
    (a.className = "filepond--file-info-sub"),
        e.appendChild(a),
        (e.ref.fileSize = a),
        ae(a, e.query("GET_LABEL_FILE_WAITING_FOR_SIZE")),
        ae(i, Qi(e.query("GET_ITEM_NAME", t.id)));
};
const Di = ({ root: e, props: t }) => {
    ae(
        e.ref.fileSize,
        Bn(
            e.query("GET_ITEM_SIZE", t.id),
            ".",
            e.query("GET_FILE_SIZE_BASE"),
            e.query("GET_FILE_SIZE_LABELS", e.query),
        ),
    ),
        ae(e.ref.fileName, Qi(e.query("GET_ITEM_NAME", t.id)));
};
const Za = ({ root: e, props: t }) => {
    if (bt(e.query("GET_ITEM_SIZE", t.id))) {
        Di({ root: e, props: t });
        return;
    }
    ae(e.ref.fileSize, e.query("GET_LABEL_FILE_SIZE_NOT_AVAILABLE"));
};
const Zs = ne({
    name: "file-info",
    ignoreRect: !0,
    ignoreRectUpdate: !0,
    write: fe({
        DID_LOAD_ITEM: Di,
        DID_UPDATE_ITEM_META: Di,
        DID_THROW_ITEM_LOAD_ERROR: Za,
        DID_THROW_ITEM_INVALID: Za,
    }),
    didCreateView: (e) => {
        tt("CREATE_VIEW", { ...e, view: e });
    },
    create: Qs,
    mixins: {
        styles: ["translateX", "translateY"],
        animations: { translateX: "spring", translateY: "spring" },
    },
});
const Nn = (e) => Math.round(e * 100);
const Js = ({ root: e }) => {
    const t = Ve("span");
    (t.className = "filepond--file-status-main"),
        e.appendChild(t),
        (e.ref.main = t);
    const i = Ve("span");
    (i.className = "filepond--file-status-sub"),
        e.appendChild(i),
        (e.ref.sub = i),
        kn({ root: e, action: { progress: null } });
};
var kn = ({ root: e, action: t }) => {
    const i =
        t.progress === null
            ? e.query("GET_LABEL_FILE_LOADING")
            : `${e.query("GET_LABEL_FILE_LOADING")} ${Nn(t.progress)}%`;
    ae(e.ref.main, i), ae(e.ref.sub, e.query("GET_LABEL_TAP_TO_CANCEL"));
};
const ec = ({ root: e, action: t }) => {
    const i =
        t.progress === null
            ? e.query("GET_LABEL_FILE_PROCESSING")
            : `${e.query("GET_LABEL_FILE_PROCESSING")} ${Nn(t.progress)}%`;
    ae(e.ref.main, i), ae(e.ref.sub, e.query("GET_LABEL_TAP_TO_CANCEL"));
};
const tc = ({ root: e }) => {
    ae(e.ref.main, e.query("GET_LABEL_FILE_PROCESSING")),
        ae(e.ref.sub, e.query("GET_LABEL_TAP_TO_CANCEL"));
};
const ic = ({ root: e }) => {
    ae(e.ref.main, e.query("GET_LABEL_FILE_PROCESSING_ABORTED")),
        ae(e.ref.sub, e.query("GET_LABEL_TAP_TO_RETRY"));
};
const ac = ({ root: e }) => {
    ae(e.ref.main, e.query("GET_LABEL_FILE_PROCESSING_COMPLETE")),
        ae(e.ref.sub, e.query("GET_LABEL_TAP_TO_UNDO"));
};
const Ja = ({ root: e }) => {
    ae(e.ref.main, ""), ae(e.ref.sub, "");
};
const zt = ({ root: e, action: t }) => {
    ae(e.ref.main, t.status.main), ae(e.ref.sub, t.status.sub);
};
const nc = ne({
    name: "file-status",
    ignoreRect: !0,
    ignoreRectUpdate: !0,
    write: fe({
        DID_LOAD_ITEM: Ja,
        DID_REVERT_ITEM_PROCESSING: Ja,
        DID_REQUEST_ITEM_PROCESSING: tc,
        DID_ABORT_ITEM_PROCESSING: ic,
        DID_COMPLETE_ITEM_PROCESSING: ac,
        DID_UPDATE_ITEM_PROCESS_PROGRESS: ec,
        DID_UPDATE_ITEM_LOAD_PROGRESS: kn,
        DID_THROW_ITEM_LOAD_ERROR: zt,
        DID_THROW_ITEM_INVALID: zt,
        DID_THROW_ITEM_PROCESSING_ERROR: zt,
        DID_THROW_ITEM_PROCESSING_REVERT_ERROR: zt,
        DID_THROW_ITEM_REMOVE_ERROR: zt,
    }),
    didCreateView: (e) => {
        tt("CREATE_VIEW", { ...e, view: e });
    },
    create: Js,
    mixins: {
        styles: ["translateX", "translateY", "opacity"],
        animations: {
            opacity: { type: "tween", duration: 250 },
            translateX: "spring",
            translateY: "spring",
        },
    },
});
const Ci = {
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
const Bi = [];
te(Ci, (e) => {
    Bi.push(e);
});
const Ie = (e) => {
    if (Ni(e) === "right") return 0;
    const t = e.ref.buttonRemoveItem.rect.element;
    return t.hidden ? null : t.width + t.left;
};
const lc = (e) => e.ref.buttonAbortItemLoad.rect.element.width;
const ei = (e) => Math.floor(e.ref.buttonRemoveItem.rect.element.height / 4);
const oc = (e) => Math.floor(e.ref.buttonRemoveItem.rect.element.left / 2);
const rc = (e) => e.query("GET_STYLE_LOAD_INDICATOR_POSITION");
const sc = (e) => e.query("GET_STYLE_PROGRESS_INDICATOR_POSITION");
var Ni = (e) => e.query("GET_STYLE_BUTTON_REMOVE_ITEM_POSITION");
const cc = {
    buttonAbortItemLoad: { opacity: 0 },
    buttonRetryItemLoad: { opacity: 0 },
    buttonRemoveItem: { opacity: 0 },
    buttonProcessItem: { opacity: 0 },
    buttonAbortItemProcessing: { opacity: 0 },
    buttonRetryItemProcessing: { opacity: 0 },
    buttonRevertItemProcessing: { opacity: 0 },
    loadProgressIndicator: { opacity: 0, align: rc },
    processProgressIndicator: { opacity: 0, align: sc },
    processingCompleteIndicator: { opacity: 0, scaleX: 0.75, scaleY: 0.75 },
    info: { translateX: 0, translateY: 0, opacity: 0 },
    status: { translateX: 0, translateY: 0, opacity: 0 },
};
const en = {
    buttonRemoveItem: { opacity: 1 },
    buttonProcessItem: { opacity: 1 },
    info: { translateX: Ie },
    status: { translateX: Ie },
};
const Ai = {
    buttonAbortItemProcessing: { opacity: 1 },
    processProgressIndicator: { opacity: 1 },
    status: { opacity: 1 },
};
const mt = {
    DID_THROW_ITEM_INVALID: {
        buttonRemoveItem: { opacity: 1 },
        info: { translateX: Ie },
        status: { translateX: Ie, opacity: 1 },
    },
    DID_START_ITEM_LOAD: {
        buttonAbortItemLoad: { opacity: 1 },
        loadProgressIndicator: { opacity: 1 },
        status: { opacity: 1 },
    },
    DID_THROW_ITEM_LOAD_ERROR: {
        buttonRetryItemLoad: { opacity: 1 },
        buttonRemoveItem: { opacity: 1 },
        info: { translateX: Ie },
        status: { opacity: 1 },
    },
    DID_START_ITEM_REMOVE: {
        processProgressIndicator: { opacity: 1, align: Ni },
        info: { translateX: Ie },
        status: { opacity: 0 },
    },
    DID_THROW_ITEM_REMOVE_ERROR: {
        processProgressIndicator: { opacity: 0, align: Ni },
        buttonRemoveItem: { opacity: 1 },
        info: { translateX: Ie },
        status: { opacity: 1, translateX: Ie },
    },
    DID_LOAD_ITEM: en,
    DID_LOAD_LOCAL_ITEM: {
        buttonRemoveItem: { opacity: 1 },
        info: { translateX: Ie },
        status: { translateX: Ie },
    },
    DID_START_ITEM_PROCESSING: Ai,
    DID_REQUEST_ITEM_PROCESSING: Ai,
    DID_UPDATE_ITEM_PROCESS_PROGRESS: Ai,
    DID_COMPLETE_ITEM_PROCESSING: {
        buttonRevertItemProcessing: { opacity: 1 },
        info: { opacity: 1 },
        status: { opacity: 1 },
    },
    DID_THROW_ITEM_PROCESSING_ERROR: {
        buttonRemoveItem: { opacity: 1 },
        buttonRetryItemProcessing: { opacity: 1 },
        status: { opacity: 1 },
        info: { translateX: Ie },
    },
    DID_THROW_ITEM_PROCESSING_REVERT_ERROR: {
        buttonRevertItemProcessing: { opacity: 1 },
        status: { opacity: 1 },
        info: { opacity: 1 },
    },
    DID_ABORT_ITEM_PROCESSING: {
        buttonRemoveItem: { opacity: 1 },
        buttonProcessItem: { opacity: 1 },
        info: { translateX: Ie },
        status: { opacity: 1 },
    },
    DID_REVERT_ITEM_PROCESSING: en,
};
const dc = ne({
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
const pc = ({ root: e, props: t }) => {
    const i = Object.keys(Ci).reduce((g, f) => ((g[f] = { ...Ci[f] }), g), {});
    const { id: a } = t;
    const n = e.query("GET_ALLOW_REVERT");
    const l = e.query("GET_ALLOW_REMOVE");
    const o = e.query("GET_ALLOW_PROCESS");
    const r = e.query("GET_INSTANT_UPLOAD");
    const s = e.query("IS_ASYNC");
    const p = e.query("GET_STYLE_BUTTON_REMOVE_ITEM_ALIGN");
    let c;
    s
        ? o && !n
            ? (c = (g) => !/RevertItemProcessing/.test(g))
            : !o && n
              ? (c = (g) =>
                    !/ProcessItem|RetryItemProcessing|AbortItemProcessing/.test(
                        g,
                    ))
              : !o && !n && (c = (g) => !/Process/.test(g))
        : (c = (g) => !/Process/.test(g));
    const d = c ? Bi.filter(c) : Bi.concat();
    if (
        (r &&
            n &&
            ((i.RevertItemProcessing.label = "GET_LABEL_BUTTON_REMOVE_ITEM"),
            (i.RevertItemProcessing.icon = "GET_ICON_REMOVE")),
        s && !n)
    ) {
        const g = mt.DID_COMPLETE_ITEM_PROCESSING;
        (g.info.translateX = oc),
            (g.info.translateY = ei),
            (g.status.translateY = ei),
            (g.processingCompleteIndicator = {
                opacity: 1,
                scaleX: 1,
                scaleY: 1,
            });
    }
    if (
        (s &&
            !o &&
            ([
                "DID_START_ITEM_PROCESSING",
                "DID_REQUEST_ITEM_PROCESSING",
                "DID_UPDATE_ITEM_PROCESS_PROGRESS",
                "DID_THROW_ITEM_PROCESSING_ERROR",
            ].forEach((g) => {
                mt[g].status.translateY = ei;
            }),
            (mt.DID_THROW_ITEM_PROCESSING_ERROR.status.translateX = lc)),
        p && n)
    ) {
        i.RevertItemProcessing.align = "BUTTON_REMOVE_ITEM_POSITION";
        const g = mt.DID_COMPLETE_ITEM_PROCESSING;
        (g.info.translateX = Ie),
            (g.status.translateY = ei),
            (g.processingCompleteIndicator = {
                opacity: 1,
                scaleX: 1,
                scaleY: 1,
            });
    }
    l || (i.RemoveItem.disabled = !0),
        te(i, (g, f) => {
            const h = e.createChildView(Cn, {
                label: e.query(f.label),
                icon: e.query(f.icon),
                opacity: 0,
            });
            d.includes(g) && e.appendChildView(h),
                f.disabled &&
                    (h.element.setAttribute("disabled", "disabled"),
                    h.element.setAttribute("hidden", "hidden")),
                (h.element.dataset.align = e.query(`GET_STYLE_${f.align}`)),
                h.element.classList.add(f.className),
                h.on("click", (I) => {
                    I.stopPropagation(),
                        !f.disabled && e.dispatch(f.action, { query: a });
                }),
                (e.ref[`button${g}`] = h);
        }),
        (e.ref.processingCompleteIndicator = e.appendChildView(
            e.createChildView(dc),
        )),
        (e.ref.processingCompleteIndicator.element.dataset.align = e.query(
            "GET_STYLE_BUTTON_PROCESS_ITEM_POSITION",
        )),
        (e.ref.info = e.appendChildView(e.createChildView(Zs, { id: a }))),
        (e.ref.status = e.appendChildView(e.createChildView(nc, { id: a })));
    const m = e.appendChildView(
        e.createChildView(Ka, {
            opacity: 0,
            align: e.query("GET_STYLE_LOAD_INDICATOR_POSITION"),
        }),
    );
    m.element.classList.add("filepond--load-indicator"),
        (e.ref.loadProgressIndicator = m);
    const u = e.appendChildView(
        e.createChildView(Ka, {
            opacity: 0,
            align: e.query("GET_STYLE_PROGRESS_INDICATOR_POSITION"),
        }),
    );
    u.element.classList.add("filepond--process-indicator"),
        (e.ref.processProgressIndicator = u),
        (e.ref.activeStyles = []);
};
const mc = ({ root: e, actions: t, props: i }) => {
    uc({ root: e, actions: t, props: i });
    const a = t
        .concat()
        .filter((n) => /^DID_/.test(n.type))
        .reverse()
        .find((n) => mt[n.type]);
    if (a) {
        e.ref.activeStyles = [];
        const n = mt[a.type];
        te(cc, (l, o) => {
            const r = e.ref[l];
            te(o, (s, p) => {
                const c = n[l] && typeof n[l][s] < "u" ? n[l][s] : p;
                e.ref.activeStyles.push({ control: r, key: s, value: c });
            });
        });
    }
    e.ref.activeStyles.forEach(({ control: n, key: l, value: o }) => {
        n[l] = typeof o === "function" ? o(e) : o;
    });
};
var uc = fe({
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
const gc = ne({
    create: pc,
    write: mc,
    didCreateView: (e) => {
        tt("CREATE_VIEW", { ...e, view: e });
    },
    name: "file",
});
const fc = ({ root: e, props: t }) => {
    (e.ref.fileName = Ve("legend")),
        e.appendChild(e.ref.fileName),
        (e.ref.file = e.appendChildView(e.createChildView(gc, { id: t.id }))),
        (e.ref.data = !1);
};
const hc = ({ root: e, props: t }) => {
    ae(e.ref.fileName, Qi(e.query("GET_ITEM_NAME", t.id)));
};
const bc = ne({
    create: fc,
    ignoreRect: !0,
    write: fe({ DID_LOAD_ITEM: hc }),
    didCreateView: (e) => {
        tt("CREATE_VIEW", { ...e, view: e });
    },
    tag: "fieldset",
    name: "file-wrapper",
});
const tn = { type: "spring", damping: 0.6, mass: 7 };
const Ec = ({ root: e, props: t }) => {
    [
        { name: "top" },
        {
            name: "center",
            props: { translateY: null, scaleY: null },
            mixins: {
                animations: { scaleY: tn },
                styles: ["translateY", "scaleY"],
            },
        },
        {
            name: "bottom",
            props: { translateY: null },
            mixins: { animations: { translateY: tn }, styles: ["translateY"] },
        },
    ].forEach((i) => {
        Tc(e, i, t.name);
    }),
        e.element.classList.add(`filepond--${t.name}`),
        (e.ref.scalable = null);
};
var Tc = (e, t, i) => {
    const a = ne({
        name: `panel-${t.name} filepond--${i}`,
        mixins: t.mixins,
        ignoreRectUpdate: !0,
    });
    const n = e.createChildView(a, t.props);
    e.ref[t.name] = e.appendChildView(n);
};
const Ic = ({ root: e, props: t }) => {
    if (
        ((e.ref.scalable === null || t.scalable !== e.ref.scalable) &&
            ((e.ref.scalable = In(t.scalable) ? t.scalable : !0),
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
const Vn = ne({
    name: "panel",
    read: ({ root: e, props: t }) =>
        (t.heightCurrent = e.ref.bottom.translateY),
    write: Ic,
    create: Ec,
    ignoreRect: !0,
    mixins: { apis: ["height", "heightCurrent", "scalable"] },
});
const vc = (e) => {
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
const an = { type: "spring", stiffness: 0.75, damping: 0.45, mass: 10 };
const nn = "spring";
const ln = {
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
const xc = ({ root: e, props: t }) => {
    if (
        ((e.ref.handleClick = (a) =>
            e.dispatch("DID_ACTIVATE_ITEM", { id: t.id })),
        (e.element.id = `filepond--item-${t.id}`),
        e.element.addEventListener("click", e.ref.handleClick),
        (e.ref.container = e.appendChildView(
            e.createChildView(bc, { id: t.id }),
        )),
        (e.ref.panel = e.appendChildView(
            e.createChildView(Vn, { name: "item-panel" }),
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
        const l = { x: a.pageX, y: a.pageY };
        (t.dragOrigin = { x: e.translateX, y: e.translateY }),
            (t.dragCenter = { x: a.offsetX, y: a.offsetY });
        const o = vc(e.query("GET_ACTIVE_ITEMS"));
        e.dispatch("DID_GRAB_ITEM", { id: t.id, dragState: o });
        const r = (d) => {
            if (!d.isPrimary) return;
            d.stopPropagation(),
                d.preventDefault(),
                (t.dragOffset = { x: d.pageX - l.x, y: d.pageY - l.y }),
                t.dragOffset.x * t.dragOffset.x +
                    t.dragOffset.y * t.dragOffset.y >
                    16 &&
                    !n &&
                    ((n = !0),
                    e.element.removeEventListener("click", e.ref.handleClick)),
                e.dispatch("DID_DRAG_ITEM", { id: t.id, dragState: o });
        };
        const s = (d) => {
            d.isPrimary &&
                ((t.dragOffset = { x: d.pageX - l.x, y: d.pageY - l.y }), c());
        };
        const p = () => {
            c();
        };
        const c = () => {
            document.removeEventListener("pointercancel", p),
                document.removeEventListener("pointermove", r),
                document.removeEventListener("pointerup", s),
                e.dispatch("DID_DROP_ITEM", { id: t.id, dragState: o }),
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
        document.addEventListener("pointercancel", p),
            document.addEventListener("pointermove", r),
            document.addEventListener("pointerup", s);
    };
    e.element.addEventListener("pointerdown", i);
};
const yc = fe({
    DID_UPDATE_PANEL_HEIGHT: ({ root: e, action: t }) => {
        e.height = t.height;
    },
});
const Rc = fe(
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
            .filter((o) => /^DID_/.test(o.type))
            .reverse()
            .find((o) => ln[o.type]);
        n &&
            n.type !== i.currentState &&
            ((i.currentState = n.type),
            (e.element.dataset.filepondItemState = ln[i.currentState] || ""));
        const l =
            e.query("GET_ITEM_PANEL_ASPECT_RATIO") ||
            e.query("GET_PANEL_ASPECT_RATIO");
        l
            ? a || (e.height = e.rect.element.width * l)
            : (yc({ root: e, actions: t, props: i }),
              !e.height &&
                  e.ref.container.rect.element.height > 0 &&
                  (e.height = e.ref.container.rect.element.height)),
            a && (e.ref.panel.height = null),
            (e.ref.panel.height = e.height);
    },
);
const Sc = ne({
    create: xc,
    write: Rc,
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
            scaleX: nn,
            scaleY: nn,
            translateX: an,
            translateY: an,
            opacity: { type: "tween", duration: 150 },
        },
    },
});
const Zi = (e, t) => Math.max(1, Math.floor((e + 1) / t));
const Ji = (e, t, i) => {
    if (!i) return;
    const a = e.rect.element.width;
    const n = t.length;
    let l = null;
    if (n === 0 || i.top < t[0].rect.element.top) return -1;
    const r = t[0].rect.element;
    const s = r.marginLeft + r.marginRight;
    const p = r.width + s;
    const c = Zi(a, p);
    if (c === 1) {
        for (let u = 0; u < n; u++) {
            const g = t[u];
            const f = g.rect.outer.top + g.rect.element.height * 0.5;
            if (i.top < f) return u;
        }
        return n;
    }
    const d = r.marginTop + r.marginBottom;
    const m = r.height + d;
    for (let u = 0; u < n; u++) {
        const g = u % c;
        const f = Math.floor(u / c);
        const h = g * p;
        const I = f * m;
        const b = I - r.marginTop;
        const T = h + p;
        const v = I + m + r.marginBottom;
        if (i.top < v && i.top > b) {
            if (i.left < T) return u;
            u !== n - 1 ? (l = u) : (l = null);
        }
    }
    return l !== null ? l : n;
};
const ti = {
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
const _c = ({ root: e }) => {
    se(e.element, "role", "list"), (e.ref.lastItemSpanwDate = Date.now());
};
const wc = ({ root: e, action: t }) => {
    const { id: i, index: a, interactionMethod: n } = t;
    e.ref.addIndex = a;
    const l = Date.now();
    let o = l;
    let r = 1;
    if (n !== Re.NONE) {
        r = 0;
        const s = e.query("GET_ITEM_INSERT_INTERVAL");
        const p = l - e.ref.lastItemSpanwDate;
        o = p < s ? l + (s - p) : l;
    }
    (e.ref.lastItemSpanwDate = o),
        e.appendChildView(
            e.createChildView(Sc, {
                spawnDate: o,
                id: i,
                opacity: r,
                interactionMethod: n,
            }),
            a,
        );
};
const on = (e, t, i, a = 0, n = 1) => {
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
              (e.opacity === 0 && Lc(e, t, i, a, n),
              (e.scaleX = 1),
              (e.scaleY = 1),
              (e.opacity = 1)));
};
var Lc = (e, t, i, a, n) => {
    e.interactionMethod === Re.NONE
        ? ((e.translateX = null),
          (e.translateX = t),
          (e.translateY = null),
          (e.translateY = i))
        : e.interactionMethod === Re.DROP
          ? ((e.translateX = null),
            (e.translateX = t - a * 20),
            (e.translateY = null),
            (e.translateY = i - n * 10),
            (e.scaleX = 0.8),
            (e.scaleY = 0.8))
          : e.interactionMethod === Re.BROWSE
            ? ((e.translateY = null), (e.translateY = i - 30))
            : e.interactionMethod === Re.API &&
              ((e.translateX = null),
              (e.translateX = t - 30),
              (e.translateY = null));
};
const Mc = ({ root: e, action: t }) => {
    const { id: i } = t;
    const a = e.childViews.find((n) => n.id === i);
    a &&
        ((a.scaleX = 0.9),
        (a.scaleY = 0.9),
        (a.opacity = 0),
        (a.markedForRemoval = !0));
};
const Pi = (e) =>
    e.rect.element.height +
    e.rect.element.marginBottom * 0.5 +
    e.rect.element.marginTop * 0.5;
const Ac = (e) =>
    e.rect.element.width +
    e.rect.element.marginLeft * 0.5 +
    e.rect.element.marginRight * 0.5;
const Pc = ({ root: e, action: t }) => {
    const { id: i, dragState: a } = t;
    const n = e.query("GET_ITEM", { id: i });
    const l = e.childViews.find((h) => h.id === i);
    const o = e.childViews.length;
    const r = a.getItemIndex(n);
    if (!l) return;
    const s = {
        x: l.dragOrigin.x + l.dragOffset.x + l.dragCenter.x,
        y: l.dragOrigin.y + l.dragOffset.y + l.dragCenter.y,
    };
    const p = Pi(l);
    const c = Ac(l);
    let d = Math.floor(e.rect.outer.width / c);
    d > o && (d = o);
    const m = Math.floor(o / d + 1);
    (ti.setHeight = p * m), (ti.setWidth = c * d);
    const u = {
        y: Math.floor(s.y / p),
        x: Math.floor(s.x / c),
        getGridIndex: function () {
            return s.y > ti.getHeight || s.y < 0 || s.x > ti.getWidth || s.x < 0
                ? r
                : this.y * d + this.x;
        },
        getColIndex: function () {
            const I = e.query("GET_ACTIVE_ITEMS");
            const b = e.childViews.filter((P) => P.rect.element.height);
            const T = I.map((P) => b.find((A) => A.id === P.id));
            const v = T.findIndex((P) => P === l);
            const y = Pi(l);
            const E = T.length;
            let _ = E;
            let x = 0;
            let R = 0;
            let z = 0;
            for (let P = 0; P < E; P++) {
                if (((x = Pi(T[P])), (z = R), (R = z + x), s.y < R)) {
                    if (v > P) {
                        if (s.y < z + y) {
                            _ = P;
                            break;
                        }
                        continue;
                    }
                    _ = P;
                    break;
                }
            }
            return _;
        },
    };
    const g = d > 1 ? u.getGridIndex() : u.getColIndex();
    e.dispatch("MOVE_ITEM", { query: l, index: g });
    const f = a.getIndex();
    if (f === void 0 || f !== g) {
        if ((a.setIndex(g), f === void 0)) return;
        e.dispatch("DID_REORDER_ITEMS", {
            items: e.query("GET_ACTIVE_ITEMS"),
            origin: r,
            target: g,
        });
    }
};
const zc = fe({ DID_ADD_ITEM: wc, DID_REMOVE_ITEM: Mc, DID_DRAG_ITEM: Pc });
const Oc = ({ root: e, props: t, actions: i, shouldOptimize: a }) => {
    zc({ root: e, props: t, actions: i });
    const { dragCoordinates: n } = t;
    const l = e.rect.element.width;
    const o = e.childViews.filter((T) => T.rect.element.height);
    const r = e
        .query("GET_ACTIVE_ITEMS")
        .map((T) => o.find((v) => v.id === T.id))
        .filter((T) => T);
    const s = n ? Ji(e, r, n) : null;
    const p = e.ref.addIndex || null;
    e.ref.addIndex = null;
    let c = 0;
    let d = 0;
    let m = 0;
    if (r.length === 0) return;
    const u = r[0].rect.element;
    const g = u.marginTop + u.marginBottom;
    const f = u.marginLeft + u.marginRight;
    const h = u.width + f;
    const I = u.height + g;
    const b = Zi(l, h);
    if (b === 1) {
        let T = 0;
        let v = 0;
        r.forEach((y, E) => {
            if (s) {
                const R = E - s;
                R === -2
                    ? (v = -g * 0.25)
                    : R === -1
                      ? (v = -g * 0.75)
                      : R === 0
                        ? (v = g * 0.75)
                        : R === 1
                          ? (v = g * 0.25)
                          : (v = 0);
            }
            a && ((y.translateX = null), (y.translateY = null)),
                y.markedForRemoval || on(y, 0, T + v);
            const x =
                (y.rect.element.height + g) *
                (y.markedForRemoval ? y.opacity : 1);
            T += x;
        });
    } else {
        let T = 0;
        let v = 0;
        r.forEach((y, E) => {
            E === s && (c = 1),
                E === p && (m += 1),
                y.markedForRemoval && y.opacity < 0.5 && (d -= 1);
            const _ = E + m + c + d;
            const x = _ % b;
            const R = Math.floor(_ / b);
            const z = x * h;
            const P = R * I;
            const A = Math.sign(z - T);
            const B = Math.sign(P - v);
            (T = z),
                (v = P),
                !y.markedForRemoval &&
                    (a && ((y.translateX = null), (y.translateY = null)),
                    on(y, z, P, A, B));
        });
    }
};
const Fc = (e, t) =>
    t.filter((i) => (i.data && i.data.id ? e.id === i.data.id : !0));
const Dc = ne({
    create: _c,
    write: Oc,
    tag: "ul",
    name: "list",
    didWriteView: ({ root: e }) => {
        e.childViews
            .filter((t) => t.markedForRemoval && t.opacity === 0 && t.resting)
            .forEach((t) => {
                t._destroy(), e.removeChildView(t);
            });
    },
    filterFrameActionsForChild: Fc,
    mixins: { apis: ["dragCoordinates"] },
});
const Cc = ({ root: e, props: t }) => {
    (e.ref.list = e.appendChildView(e.createChildView(Dc))),
        (t.dragCoordinates = null),
        (t.overflowing = !1);
};
const Bc = ({ root: e, props: t, action: i }) => {
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
const Nc = ({ props: e }) => {
    e.dragCoordinates = null;
};
const kc = fe({ DID_DRAG: Bc, DID_END_DRAG: Nc });
const Vc = ({ root: e, props: t, actions: i }) => {
    if (
        (kc({ root: e, props: t, actions: i }),
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
const Gc = ne({
    create: Cc,
    write: Vc,
    name: "list-scroller",
    mixins: {
        apis: ["overflow", "dragCoordinates"],
        styles: ["height", "translateY"],
        animations: { translateY: "spring" },
    },
});
const ze = (e, t, i, a = "") => {
    i ? se(e, t, a) : e.removeAttribute(t);
};
const Uc = (e) => {
    if (!(!e || e.value === "")) {
        try {
            e.value = "";
        } catch {}
        if (e.value) {
            const t = Ve("form");
            const i = e.parentNode;
            const a = e.nextSibling;
            t.appendChild(e),
                t.reset(),
                a ? i.insertBefore(e, a) : i.appendChild(e);
        }
    }
};
const Wc = ({ root: e, props: t }) => {
    (e.element.id = `filepond--browser-${t.id}`),
        se(e.element, "name", e.query("GET_NAME")),
        se(e.element, "aria-controls", `filepond--assistant-${t.id}`),
        se(e.element, "aria-labelledby", `filepond--drop-label-${t.id}`),
        Gn({ root: e, action: { value: e.query("GET_ACCEPTED_FILE_TYPES") } }),
        Un({ root: e, action: { value: e.query("GET_ALLOW_MULTIPLE") } }),
        Wn({
            root: e,
            action: { value: e.query("GET_ALLOW_DIRECTORIES_ONLY") },
        }),
        ki({ root: e }),
        Hn({ root: e, action: { value: e.query("GET_REQUIRED") } }),
        jn({ root: e, action: { value: e.query("GET_CAPTURE_METHOD") } }),
        (e.ref.handleChange = (i) => {
            if (!e.element.value) return;
            const a = Array.from(e.element.files).map(
                (n) => ((n._relativePath = n.webkitRelativePath), n),
            );
            setTimeout(() => {
                t.onload(a), Uc(e.element);
            }, 250);
        }),
        e.element.addEventListener("change", e.ref.handleChange);
};
var Gn = ({ root: e, action: t }) => {
    e.query("GET_ALLOW_SYNC_ACCEPT_ATTRIBUTE") &&
        ze(e.element, "accept", !!t.value, t.value ? t.value.join(",") : "");
};
var Un = ({ root: e, action: t }) => {
    ze(e.element, "multiple", t.value);
};
var Wn = ({ root: e, action: t }) => {
    ze(e.element, "webkitdirectory", t.value);
};
var ki = ({ root: e }) => {
    const t = e.query("GET_DISABLED");
    const i = e.query("GET_ALLOW_BROWSE");
    const a = t || !i;
    ze(e.element, "disabled", a);
};
var Hn = ({ root: e, action: t }) => {
    t.value
        ? e.query("GET_TOTAL_ITEMS") === 0 && ze(e.element, "required", !0)
        : ze(e.element, "required", !1);
};
var jn = ({ root: e, action: t }) => {
    ze(e.element, "capture", !!t.value, t.value === !0 ? "" : t.value);
};
const rn = ({ root: e }) => {
    const { element: t } = e;
    if (e.query("GET_TOTAL_ITEMS") > 0) {
        ze(t, "required", !1), ze(t, "name", !1);
        const i = e.query("GET_ACTIVE_ITEMS");
        let a = !1;
        for (let n = 0; n < i.length; n++) {
            i[n].status === U.LOAD_ERROR && (a = !0);
        }
        e.element.setCustomValidity(
            a ? e.query("GET_LABEL_INVALID_FIELD") : "",
        );
    } else {
        ze(t, "name", !0, e.query("GET_NAME")),
            e.query("GET_CHECK_VALIDITY") && t.setCustomValidity(""),
            e.query("GET_REQUIRED") && ze(t, "required", !0);
    }
};
const Hc = ({ root: e }) => {
    e.query("GET_CHECK_VALIDITY") &&
        e.element.setCustomValidity(e.query("GET_LABEL_INVALID_FIELD"));
};
const jc = ne({
    tag: "input",
    name: "browser",
    ignoreRect: !0,
    ignoreRectUpdate: !0,
    attributes: { type: "file" },
    create: Wc,
    destroy: ({ root: e }) => {
        e.element.removeEventListener("change", e.ref.handleChange);
    },
    write: fe({
        DID_LOAD_ITEM: rn,
        DID_REMOVE_ITEM: rn,
        DID_THROW_ITEM_INVALID: Hc,
        DID_SET_DISABLED: ki,
        DID_SET_ALLOW_BROWSE: ki,
        DID_SET_ALLOW_DIRECTORIES_ONLY: Wn,
        DID_SET_ALLOW_MULTIPLE: Un,
        DID_SET_ACCEPTED_FILE_TYPES: Gn,
        DID_SET_CAPTURE_METHOD: jn,
        DID_SET_REQUIRED: Hn,
    }),
});
const sn = { ENTER: 13, SPACE: 32 };
const Yc = ({ root: e, props: t }) => {
    const i = Ve("label");
    se(i, "for", `filepond--browser-${t.id}`),
        se(i, "id", `filepond--drop-label-${t.id}`),
        (e.ref.handleKeyDown = (a) => {
            (a.keyCode === sn.ENTER || a.keyCode === sn.SPACE) &&
                (a.preventDefault(), e.ref.label.click());
        }),
        (e.ref.handleClick = (a) => {
            a.target === i || i.contains(a.target) || e.ref.label.click();
        }),
        i.addEventListener("keydown", e.ref.handleKeyDown),
        e.element.addEventListener("click", e.ref.handleClick),
        Yn(i, t.caption),
        e.appendChild(i),
        (e.ref.label = i);
};
var Yn = (e, t) => {
    e.innerHTML = t;
    const i = e.querySelector(".filepond--label-action");
    return i && se(i, "tabindex", "0"), t;
};
const qc = ne({
    name: "drop-label",
    ignoreRect: !0,
    create: Yc,
    destroy: ({ root: e }) => {
        e.ref.label.addEventListener("keydown", e.ref.handleKeyDown),
            e.element.removeEventListener("click", e.ref.handleClick);
    },
    write: fe({
        DID_SET_LABEL_IDLE: ({ root: e, action: t }) => {
            Yn(e.ref.label, t.value);
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
const $c = ne({
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
const Xc = ({ root: e }) => {
    const t = e.rect.element.width * 0.5;
    const i = e.rect.element.height * 0.5;
    e.ref.blob = e.appendChildView(
        e.createChildView($c, {
            opacity: 0,
            scaleX: 2.5,
            scaleY: 2.5,
            translateX: t,
            translateY: i,
        }),
    );
};
const Kc = ({ root: e, action: t }) => {
    if (!e.ref.blob) {
        Xc({ root: e });
        return;
    }
    (e.ref.blob.translateX = t.position.scopeLeft),
        (e.ref.blob.translateY = t.position.scopeTop),
        (e.ref.blob.scaleX = 1),
        (e.ref.blob.scaleY = 1),
        (e.ref.blob.opacity = 1);
};
const Qc = ({ root: e }) => {
    e.ref.blob && (e.ref.blob.opacity = 0);
};
const Zc = ({ root: e }) => {
    e.ref.blob &&
        ((e.ref.blob.scaleX = 2.5),
        (e.ref.blob.scaleY = 2.5),
        (e.ref.blob.opacity = 0));
};
const Jc = ({ root: e, props: t, actions: i }) => {
    ed({ root: e, props: t, actions: i });
    const { blob: a } = e.ref;
    i.length === 0 &&
        a &&
        a.opacity === 0 &&
        (e.removeChildView(a), (e.ref.blob = null));
};
var ed = fe({ DID_DRAG: Kc, DID_DROP: Zc, DID_END_DRAG: Qc });
const td = ne({
    ignoreRect: !0,
    ignoreRectUpdate: !0,
    name: "drip",
    write: Jc,
});
const qn = (e, t) => {
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
const id = ({ root: e }) => {
    e.ref.fields = {};
    const t = document.createElement("legend");
    (t.textContent = "Files"), e.element.appendChild(t);
};
const gi = (e, t) => e.ref.fields[t];
const ea = (e) => {
    e.query("GET_ACTIVE_ITEMS").forEach((t) => {
        e.ref.fields[t.id] && e.element.appendChild(e.ref.fields[t.id]);
    });
};
const cn = ({ root: e }) => ea(e);
const ad = ({ root: e, action: t }) => {
    const n =
        !(e.query("GET_ITEM", t.id).origin === re.LOCAL) &&
        e.query("SHOULD_UPDATE_FILE_INPUT");
    const l = Ve("input");
    (l.type = n ? "file" : "hidden"),
        (l.name = e.query("GET_NAME")),
        (e.ref.fields[t.id] = l),
        ea(e);
};
const nd = ({ root: e, action: t }) => {
    const i = gi(e, t.id);
    if (
        !i ||
        (t.serverFileReference !== null && (i.value = t.serverFileReference),
        !e.query("SHOULD_UPDATE_FILE_INPUT"))
    ) {
        return;
    }
    const a = e.query("GET_ITEM", t.id);
    qn(i, [a.file]);
};
const ld = ({ root: e, action: t }) => {
    e.query("SHOULD_UPDATE_FILE_INPUT") &&
        setTimeout(() => {
            const i = gi(e, t.id);
            i && qn(i, [t.file]);
        }, 0);
};
const od = ({ root: e }) => {
    e.element.disabled = e.query("GET_DISABLED");
};
const rd = ({ root: e, action: t }) => {
    const i = gi(e, t.id);
    i &&
        (i.parentNode && i.parentNode.removeChild(i),
        delete e.ref.fields[t.id]);
};
const sd = ({ root: e, action: t }) => {
    const i = gi(e, t.id);
    i &&
        (t.value === null
            ? i.removeAttribute("value")
            : i.type != "file" && (i.value = t.value),
        ea(e));
};
const cd = fe({
    DID_SET_DISABLED: od,
    DID_ADD_ITEM: ad,
    DID_LOAD_ITEM: nd,
    DID_REMOVE_ITEM: rd,
    DID_DEFINE_VALUE: sd,
    DID_PREPARE_OUTPUT: ld,
    DID_REORDER_ITEMS: cn,
    DID_SORT_ITEMS: cn,
});
const dd = ne({
    tag: "fieldset",
    name: "data",
    create: id,
    write: cd,
    ignoreRect: !0,
});
const pd = (e) => ("getRootNode" in e ? e.getRootNode() : document);
const md = ["jpg", "jpeg", "png", "gif", "bmp", "webp", "svg", "tiff"];
const ud = ["css", "csv", "html", "txt"];
const gd = { zip: "zip|compressed", epub: "application/epub+zip" };
const $n = (e = "") => (
    (e = e.toLowerCase()),
    md.includes(e)
        ? "image/" + (e === "jpg" ? "jpeg" : e === "svg" ? "svg+xml" : e)
        : ud.includes(e)
          ? "text/" + e
          : gd[e] || ""
);
const ta = (e) =>
    new Promise((t, i) => {
        const a = xd(e);
        if (a.length && !fd(e)) return t(a);
        hd(e).then(t);
    });
var fd = (e) => (e.files ? e.files.length > 0 : !1);
var hd = (e) =>
    new Promise((t, i) => {
        const a = (e.items ? Array.from(e.items) : [])
            .filter((n) => bd(n))
            .map((n) => Ed(n));
        if (!a.length) {
            t(e.files ? Array.from(e.files) : []);
            return;
        }
        Promise.all(a)
            .then((n) => {
                const l = [];
                n.forEach((o) => {
                    l.push.apply(l, o);
                }),
                    t(
                        l
                            .filter((o) => o)
                            .map(
                                (o) => (
                                    o._relativePath ||
                                        (o._relativePath =
                                            o.webkitRelativePath),
                                    o
                                ),
                            ),
                    );
            })
            .catch(console.error);
    });
var bd = (e) => {
    if (Xn(e)) {
        const t = ia(e);
        if (t) return t.isFile || t.isDirectory;
    }
    return e.kind === "file";
};
var Ed = (e) =>
    new Promise((t, i) => {
        if (vd(e)) {
            Td(ia(e)).then(t).catch(i);
            return;
        }
        t([e.getAsFile()]);
    });
var Td = (e) =>
    new Promise((t, i) => {
        const a = [];
        let n = 0;
        let l = 0;
        const o = () => {
            l === 0 && n === 0 && t(a);
        };
        const r = (s) => {
            n++;
            const p = s.createReader();
            const c = () => {
                p.readEntries((d) => {
                    if (d.length === 0) {
                        n--, o();
                        return;
                    }
                    d.forEach((m) => {
                        m.isDirectory
                            ? r(m)
                            : (l++,
                              m.file((u) => {
                                  const g = Id(u);
                                  m.fullPath && (g._relativePath = m.fullPath),
                                      a.push(g),
                                      l--,
                                      o();
                              }));
                    }),
                        c();
                }, i);
            };
            c();
        };
        r(e);
    });
var Id = (e) => {
    if (e.type.length) return e;
    const t = e.lastModifiedDate;
    const i = e.name;
    const a = $n(ui(e.name));
    return (
        a.length &&
            ((e = e.slice(0, e.size, a)),
            (e.name = i),
            (e.lastModifiedDate = t)),
        e
    );
};
var vd = (e) => Xn(e) && (ia(e) || {}).isDirectory;
var Xn = (e) => "webkitGetAsEntry" in e;
var ia = (e) => e.webkitGetAsEntry();
var xd = (e) => {
    let t = [];
    try {
        if (((t = Rd(e)), t.length)) return t;
        t = yd(e);
    } catch {}
    return t;
};
var yd = (e) => {
    const t = e.getData("url");
    return typeof t === "string" && t.length ? [t] : [];
};
var Rd = (e) => {
    const t = e.getData("text/html");
    if (typeof t === "string" && t.length) {
        const i = t.match(/src\s*=\s*"(.+?)"/);
        if (i) return [i[1]];
    }
    return [];
};
const ri = [];
const et = (e) => ({
    pageLeft: e.pageX,
    pageTop: e.pageY,
    scopeLeft: e.offsetX || e.layerX,
    scopeTop: e.offsetY || e.layerY,
});
const Sd = (e, t, i) => {
    const a = _d(t);
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
var _d = (e) => {
    const t = ri.find((a) => a.element === e);
    if (t) return t;
    const i = wd(e);
    return ri.push(i), i;
};
var wd = (e) => {
    const t = [];
    const i = { dragenter: Md, dragover: Ad, dragleave: zd, drop: Pd };
    const a = {};
    te(i, (l, o) => {
        (a[l] = o(e, t)), e.addEventListener(l, a[l], !1);
    });
    const n = {
        element: e,
        addListener: (l) => (
            t.push(l),
            () => {
                t.splice(t.indexOf(l), 1),
                    t.length === 0 &&
                        (ri.splice(ri.indexOf(n), 1),
                        te(i, (o) => {
                            e.removeEventListener(o, a[o], !1);
                        }));
            }
        ),
    };
    return n;
};
const Ld = (e, t) => (
    "elementFromPoint" in e || (e = document), e.elementFromPoint(t.x, t.y)
);
const aa = (e, t) => {
    const i = pd(t);
    const a = Ld(i, {
        x: e.pageX - window.pageXOffset,
        y: e.pageY - window.pageYOffset,
    });
    return a === t || t.contains(a);
};
let Kn = null;
const ii = (e, t) => {
    try {
        e.dropEffect = t;
    } catch {}
};
var Md = (e, t) => (i) => {
    i.preventDefault(),
        (Kn = i.target),
        t.forEach((a) => {
            const { element: n, onenter: l } = a;
            aa(i, n) && ((a.state = "enter"), l(et(i)));
        });
};
var Ad = (e, t) => (i) => {
    i.preventDefault();
    const a = i.dataTransfer;
    ta(a).then((n) => {
        let l = !1;
        t.some((o) => {
            const {
                filterElement: r,
                element: s,
                onenter: p,
                onexit: c,
                ondrag: d,
                allowdrop: m,
            } = o;
            ii(a, "copy");
            const u = m(n);
            if (!u) {
                ii(a, "none");
                return;
            }
            if (aa(i, s)) {
                if (((l = !0), o.state === null)) {
                    (o.state = "enter"), p(et(i));
                    return;
                }
                if (((o.state = "over"), r && !u)) {
                    ii(a, "none");
                    return;
                }
                d(et(i));
            } else {
                r && !l && ii(a, "none"),
                    o.state && ((o.state = null), c(et(i)));
            }
        });
    });
};
var Pd = (e, t) => (i) => {
    i.preventDefault();
    const a = i.dataTransfer;
    ta(a).then((n) => {
        t.forEach((l) => {
            const {
                filterElement: o,
                element: r,
                ondrop: s,
                onexit: p,
                allowdrop: c,
            } = l;
            if (((l.state = null), !(o && !aa(i, r)))) {
                if (!c(n)) return p(et(i));
                s(et(i), n);
            }
        });
    });
};
var zd = (e, t) => (i) => {
    Kn === i.target &&
        t.forEach((a) => {
            const { onexit: n } = a;
            (a.state = null), n(et(i));
        });
};
const Od = (e, t, i) => {
    e.classList.add("filepond--hopper");
    const {
        catchesDropsOnPage: a,
        requiresDropOnElement: n,
        filterItems: l = (c) => c,
    } = i;
    const o = Sd(e, a ? document.documentElement : e, n);
    let r = "";
    let s = "";
    (o.allowdrop = (c) => t(l(c))),
        (o.ondrop = (c, d) => {
            const m = l(d);
            if (!t(m)) {
                p.ondragend(c);
                return;
            }
            (s = "drag-drop"), p.onload(m, c);
        }),
        (o.ondrag = (c) => {
            p.ondrag(c);
        }),
        (o.onenter = (c) => {
            (s = "drag-over"), p.ondragstart(c);
        }),
        (o.onexit = (c) => {
            (s = "drag-exit"), p.ondragend(c);
        });
    const p = {
        updateHopperState: () => {
            r !== s && ((e.dataset.hopperState = s), (r = s));
        },
        onload: () => {},
        ondragstart: () => {},
        ondrag: () => {},
        ondragend: () => {},
        destroy: () => {
            o.destroy();
        },
    };
    return p;
};
let Vi = !1;
const ut = [];
const Qn = (e) => {
    const t = document.activeElement;
    if (
        t &&
        (/textarea|input/i.test(t.nodeName) ||
            t.getAttribute("contenteditable") === "true" ||
            t.getAttribute("contenteditable") === "")
    ) {
        let a = !1;
        let n = t;
        for (; n !== document.body; ) {
            if (n.classList.contains("filepond--root")) {
                a = !0;
                break;
            }
            n = n.parentNode;
        }
        if (!a) return;
    }
    ta(e.clipboardData).then((a) => {
        a.length && ut.forEach((n) => n(a));
    });
};
const Fd = (e) => {
    ut.includes(e) ||
        (ut.push(e),
        !Vi && ((Vi = !0), document.addEventListener("paste", Qn)));
};
const Dd = (e) => {
    $i(ut, ut.indexOf(e)),
        ut.length === 0 &&
            (document.removeEventListener("paste", Qn), (Vi = !1));
};
const Cd = () => {
    const e = (i) => {
        t.onload(i);
    };
    const t = {
        destroy: () => {
            Dd(e);
        },
        onload: () => {},
    };
    return Fd(e), t;
};
const Bd = ({ root: e, props: t }) => {
    (e.element.id = `filepond--assistant-${t.id}`),
        se(e.element, "role", "alert"),
        se(e.element, "aria-live", "polite"),
        se(e.element, "aria-relevant", "additions");
};
let dn = null;
let pn = null;
const zi = [];
const fi = (e, t) => {
    e.element.textContent = t;
};
const Nd = (e) => {
    e.element.textContent = "";
};
const Zn = (e, t, i) => {
    const a = e.query("GET_TOTAL_ITEMS");
    fi(
        e,
        `${i} ${t}, ${a} ${a === 1 ? e.query("GET_LABEL_FILE_COUNT_SINGULAR") : e.query("GET_LABEL_FILE_COUNT_PLURAL")}`,
    ),
        clearTimeout(pn),
        (pn = setTimeout(() => {
            Nd(e);
        }, 1500));
};
const Jn = (e) => e.element.parentNode.contains(document.activeElement);
const kd = ({ root: e, action: t }) => {
    if (!Jn(e)) return;
    e.element.textContent = "";
    const i = e.query("GET_ITEM", t.id);
    zi.push(i.filename),
        clearTimeout(dn),
        (dn = setTimeout(() => {
            Zn(e, zi.join(", "), e.query("GET_LABEL_FILE_ADDED")),
                (zi.length = 0);
        }, 750));
};
const Vd = ({ root: e, action: t }) => {
    if (!Jn(e)) return;
    const i = t.item;
    Zn(e, i.filename, e.query("GET_LABEL_FILE_REMOVED"));
};
const Gd = ({ root: e, action: t }) => {
    const a = e.query("GET_ITEM", t.id).filename;
    const n = e.query("GET_LABEL_FILE_PROCESSING_COMPLETE");
    fi(e, `${a} ${n}`);
};
const mn = ({ root: e, action: t }) => {
    const a = e.query("GET_ITEM", t.id).filename;
    const n = e.query("GET_LABEL_FILE_PROCESSING_ABORTED");
    fi(e, `${a} ${n}`);
};
const ai = ({ root: e, action: t }) => {
    const a = e.query("GET_ITEM", t.id).filename;
    fi(e, `${t.status.main} ${a} ${t.status.sub}`);
};
const Ud = ne({
    create: Bd,
    ignoreRect: !0,
    ignoreRectUpdate: !0,
    write: fe({
        DID_LOAD_ITEM: kd,
        DID_REMOVE_ITEM: Vd,
        DID_COMPLETE_ITEM_PROCESSING: Gd,
        DID_ABORT_ITEM_PROCESSING: mn,
        DID_REVERT_ITEM_PROCESSING: mn,
        DID_THROW_ITEM_REMOVE_ERROR: ai,
        DID_THROW_ITEM_LOAD_ERROR: ai,
        DID_THROW_ITEM_INVALID: ai,
        DID_THROW_ITEM_PROCESSING_ERROR: ai,
    }),
    tag: "span",
    name: "assistant",
});
const el = (e, t = "-") =>
    e.replace(new RegExp(`${t}.`, "g"), (i) => i.charAt(1).toUpperCase());
const tl = (e, t = 16, i = !0) => {
    let a = Date.now();
    let n = null;
    return (...l) => {
        clearTimeout(n);
        const o = Date.now() - a;
        const r = () => {
            (a = Date.now()), e(...l);
        };
        o < t ? i || (n = setTimeout(r, t - o)) : r();
    };
};
const Wd = 1e6;
const si = (e) => e.preventDefault();
const Hd = ({ root: e, props: t }) => {
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
            e.createChildView(qc, {
                ...t,
                translateY: null,
                caption: e.query("GET_LABEL_IDLE"),
            }),
        )),
        (e.ref.list = e.appendChildView(
            e.createChildView(Gc, { translateY: null }),
        )),
        (e.ref.panel = e.appendChildView(
            e.createChildView(Vn, { name: "panel-root" }),
        )),
        (e.ref.assistant = e.appendChildView(e.createChildView(Ud, { ...t }))),
        (e.ref.data = e.appendChildView(e.createChildView(dd, { ...t }))),
        (e.ref.measure = Ve("div")),
        (e.ref.measure.style.height = "100%"),
        e.element.appendChild(e.ref.measure),
        (e.ref.bounds = null),
        e
            .query("GET_STYLES")
            .filter((s) => !ke(s.value))
            .map(({ name: s, value: p }) => {
                e.element.dataset[s] = p;
            }),
        (e.ref.widthPrevious = null),
        (e.ref.widthUpdated = tl(() => {
            (e.ref.updateHistory = []), e.dispatch("DID_RESIZE_ROOT");
        }, 250)),
        (e.ref.previousAspectRatio = null),
        (e.ref.updateHistory = []);
    const n = window.matchMedia("(pointer: fine) and (hover: hover)").matches;
    const l = "PointerEvent" in window;
    e.query("GET_ALLOW_REORDER") &&
        l &&
        !n &&
        (e.element.addEventListener("touchmove", si, { passive: !1 }),
        e.element.addEventListener("gesturestart", si));
    const o = e.query("GET_CREDITS");
    if (o.length === 2) {
        const s = document.createElement("a");
        (s.className = "filepond--credits"),
            (s.href = o[0]),
            (s.tabIndex = -1),
            (s.target = "_blank"),
            (s.rel = "noopener noreferrer nofollow"),
            (s.textContent = o[1]),
            e.element.appendChild(s),
            (e.ref.credits = s);
    }
};
const jd = ({ root: e, props: t, actions: i }) => {
    if (
        (Kd({ root: e, props: t, actions: i }),
        i
            .filter((E) => /^DID_SET_STYLE_/.test(E.type))
            .filter((E) => !ke(E.data.value))
            .map(({ type: E, data: _ }) => {
                const x = el(E.substring(8).toLowerCase(), "_");
                (e.element.dataset[x] = _.value), e.invalidateLayout();
            }),
        e.rect.element.hidden)
    ) {
        return;
    }
    e.rect.element.width !== e.ref.widthPrevious &&
        ((e.ref.widthPrevious = e.rect.element.width), e.ref.widthUpdated());
    let a = e.ref.bounds;
    a ||
        ((a = e.ref.bounds = $d(e)),
        e.element.removeChild(e.ref.measure),
        (e.ref.measure = null));
    const { hopper: n, label: l, list: o, panel: r } = e.ref;
    n && n.updateHopperState();
    const s = e.query("GET_PANEL_ASPECT_RATIO");
    const p = e.query("GET_ALLOW_MULTIPLE");
    const c = e.query("GET_TOTAL_ITEMS");
    const d = p ? e.query("GET_MAX_FILES") || Wd : 1;
    const m = c === d;
    const u = i.find((E) => E.type === "DID_ADD_ITEM");
    if (m && u) {
        const E = u.data.interactionMethod;
        (l.opacity = 0),
            p
                ? (l.translateY = -40)
                : E === Re.API
                  ? (l.translateX = 40)
                  : E === Re.BROWSE
                    ? (l.translateY = 40)
                    : (l.translateY = 30);
    } else m || ((l.opacity = 1), (l.translateX = 0), (l.translateY = 0));
    const g = Yd(e);
    const f = qd(e);
    const h = l.rect.element.height;
    const I = !p || m ? 0 : h;
    const b = m ? o.rect.element.marginTop : 0;
    const T = c === 0 ? 0 : o.rect.element.marginBottom;
    const v = I + b + f.visual + T;
    const y = I + b + f.bounds + T;
    if (
        ((o.translateY = Math.max(0, I - o.rect.element.marginTop) - g.top), s)
    ) {
        const E = e.rect.element.width;
        const _ = E * s;
        s !== e.ref.previousAspectRatio &&
            ((e.ref.previousAspectRatio = s), (e.ref.updateHistory = []));
        const x = e.ref.updateHistory;
        x.push(E);
        const R = 2;
        if (x.length > R * 2) {
            const P = x.length;
            const A = P - 10;
            let B = 0;
            for (let w = P; w >= A; w--) {
                if ((x[w] === x[w - 2] && B++, B >= R)) return;
            }
        }
        (r.scalable = !1), (r.height = _);
        const z = _ - I - (T - g.bottom) - (m ? b : 0);
        f.visual > z ? (o.overflow = z) : (o.overflow = null), (e.height = _);
    } else if (a.fixedHeight) {
        r.scalable = !1;
        const E = a.fixedHeight - I - (T - g.bottom) - (m ? b : 0);
        f.visual > E ? (o.overflow = E) : (o.overflow = null);
    } else if (a.cappedHeight) {
        const E = v >= a.cappedHeight;
        const _ = Math.min(a.cappedHeight, v);
        (r.scalable = !0), (r.height = E ? _ : _ - g.top - g.bottom);
        const x = _ - I - (T - g.bottom) - (m ? b : 0);
        v > a.cappedHeight && f.visual > x
            ? (o.overflow = x)
            : (o.overflow = null),
            (e.height = Math.min(a.cappedHeight, y - g.top - g.bottom));
    } else {
        const E = c > 0 ? g.top + g.bottom : 0;
        (r.scalable = !0),
            (r.height = Math.max(h, v - E)),
            (e.height = Math.max(h, y - E));
    }
    e.ref.credits &&
        r.heightCurrent &&
        (e.ref.credits.style.transform = `translateY(${r.heightCurrent}px)`);
};
var Yd = (e) => {
    const t = e.ref.list.childViews[0].childViews[0];
    return t
        ? { top: t.rect.element.marginTop, bottom: t.rect.element.marginBottom }
        : { top: 0, bottom: 0 };
};
var qd = (e) => {
    let t = 0;
    let i = 0;
    const a = e.ref.list;
    const n = a.childViews[0];
    const l = n.childViews.filter((b) => b.rect.element.height);
    const o = e
        .query("GET_ACTIVE_ITEMS")
        .map((b) => l.find((T) => T.id === b.id))
        .filter((b) => b);
    if (o.length === 0) return { visual: t, bounds: i };
    const r = n.rect.element.width;
    const s = Ji(n, o, a.dragCoordinates);
    const p = o[0].rect.element;
    const c = p.marginTop + p.marginBottom;
    const d = p.marginLeft + p.marginRight;
    const m = p.width + d;
    const u = p.height + c;
    const g = typeof s < "u" && s >= 0 ? 1 : 0;
    const f = o.find((b) => b.markedForRemoval && b.opacity < 0.45) ? -1 : 0;
    const h = o.length + g + f;
    const I = Zi(r, m);
    return (
        I === 1
            ? o.forEach((b) => {
                  const T = b.rect.element.height + c;
                  (i += T), (t += T * b.opacity);
              })
            : ((i = Math.ceil(h / I) * u), (t = i)),
        { visual: t, bounds: i }
    );
};
var $d = (e) => {
    const t = e.ref.measureHeight || null;
    return {
        cappedHeight: parseInt(e.style.maxHeight, 10) || null,
        fixedHeight: t === 0 ? null : t,
    };
};
const na = (e, t) => {
    const i = e.query("GET_ALLOW_REPLACE");
    const a = e.query("GET_ALLOW_MULTIPLE");
    const n = e.query("GET_TOTAL_ITEMS");
    let l = e.query("GET_MAX_FILES");
    const o = t.length;
    return !a && o > 1
        ? (e.dispatch("DID_THROW_MAX_FILES", {
              source: t,
              error: ie("warning", 0, "Max files"),
          }),
          !0)
        : ((l = a ? l : 1),
          !a && i
              ? !1
              : bt(l) && n + o > l
                ? (e.dispatch("DID_THROW_MAX_FILES", {
                      source: t,
                      error: ie("warning", 0, "Max files"),
                  }),
                  !0)
                : !1);
};
const Xd = (e, t, i) => {
    const a = e.childViews[0];
    return Ji(a, t, {
        left: i.scopeLeft - a.rect.element.left,
        top:
            i.scopeTop -
            (e.rect.outer.top +
                e.rect.element.marginTop +
                e.rect.element.scrollTop),
    });
};
const un = (e) => {
    const t = e.query("GET_ALLOW_DROP");
    const i = e.query("GET_DISABLED");
    const a = t && !i;
    if (a && !e.ref.hopper) {
        const n = Od(
            e.element,
            (l) => {
                const o = e.query("GET_BEFORE_DROP_FILE") || (() => !0);
                return e.query("GET_DROP_VALIDATION")
                    ? l.every(
                          (s) =>
                              tt("ALLOW_HOPPER_ITEM", s, {
                                  query: e.query,
                              }).every((p) => p === !0) && o(s),
                      )
                    : !0;
            },
            {
                filterItems: (l) => {
                    const o = e.query("GET_IGNORED_FILES");
                    return l.filter((r) =>
                        Je(r) ? !o.includes(r.name.toLowerCase()) : !0,
                    );
                },
                catchesDropsOnPage: e.query("GET_DROP_ON_PAGE"),
                requiresDropOnElement: e.query("GET_DROP_ON_ELEMENT"),
            },
        );
        (n.onload = (l, o) => {
            const s = e.ref.list.childViews[0].childViews.filter(
                (c) => c.rect.element.height,
            );
            const p = e
                .query("GET_ACTIVE_ITEMS")
                .map((c) => s.find((d) => d.id === c.id))
                .filter((c) => c);
            Ae("ADD_ITEMS", l, { dispatch: e.dispatch }).then((c) => {
                if (na(e, c)) return !1;
                e.dispatch("ADD_ITEMS", {
                    items: c,
                    index: Xd(e.ref.list, p, o),
                    interactionMethod: Re.DROP,
                });
            }),
                e.dispatch("DID_DROP", { position: o }),
                e.dispatch("DID_END_DRAG", { position: o });
        }),
            (n.ondragstart = (l) => {
                e.dispatch("DID_START_DRAG", { position: l });
            }),
            (n.ondrag = tl((l) => {
                e.dispatch("DID_DRAG", { position: l });
            })),
            (n.ondragend = (l) => {
                e.dispatch("DID_END_DRAG", { position: l });
            }),
            (e.ref.hopper = n),
            (e.ref.drip = e.appendChildView(e.createChildView(td)));
    } else {
        !a &&
            e.ref.hopper &&
            (e.ref.hopper.destroy(),
            (e.ref.hopper = null),
            e.removeChildView(e.ref.drip));
    }
};
const gn = (e, t) => {
    const i = e.query("GET_ALLOW_BROWSE");
    const a = e.query("GET_DISABLED");
    const n = i && !a;
    n && !e.ref.browser
        ? (e.ref.browser = e.appendChildView(
              e.createChildView(jc, {
                  ...t,
                  onload: (l) => {
                      Ae("ADD_ITEMS", l, { dispatch: e.dispatch }).then((o) => {
                          if (na(e, o)) return !1;
                          e.dispatch("ADD_ITEMS", {
                              items: o,
                              index: -1,
                              interactionMethod: Re.BROWSE,
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
const fn = (e) => {
    const t = e.query("GET_ALLOW_PASTE");
    const i = e.query("GET_DISABLED");
    const a = t && !i;
    a && !e.ref.paster
        ? ((e.ref.paster = Cd()),
          (e.ref.paster.onload = (n) => {
              Ae("ADD_ITEMS", n, { dispatch: e.dispatch }).then((l) => {
                  if (na(e, l)) return !1;
                  e.dispatch("ADD_ITEMS", {
                      items: l,
                      index: -1,
                      interactionMethod: Re.PASTE,
                  });
              });
          }))
        : !a && e.ref.paster && (e.ref.paster.destroy(), (e.ref.paster = null));
};
var Kd = fe({
    DID_SET_ALLOW_BROWSE: ({ root: e, props: t }) => {
        gn(e, t);
    },
    DID_SET_ALLOW_DROP: ({ root: e }) => {
        un(e);
    },
    DID_SET_ALLOW_PASTE: ({ root: e }) => {
        fn(e);
    },
    DID_SET_DISABLED: ({ root: e, props: t }) => {
        un(e),
            fn(e),
            gn(e, t),
            e.query("GET_DISABLED")
                ? (e.element.dataset.disabled = "disabled")
                : e.element.removeAttribute("data-disabled");
    },
});
const Qd = ne({
    name: "root",
    read: ({ root: e }) => {
        e.ref.measure && (e.ref.measureHeight = e.ref.measure.offsetHeight);
    },
    create: Hd,
    write: jd,
    destroy: ({ root: e }) => {
        e.ref.paster && e.ref.paster.destroy(),
            e.ref.hopper && e.ref.hopper.destroy(),
            e.element.removeEventListener("touchmove", si),
            e.element.removeEventListener("gesturestart", si);
    },
    mixins: { styles: ["height"] },
});
const Zd = (e = {}) => {
    let t = null;
    const i = oi();
    const a = fr(es(i), [Es, as(i)], [Ws, is(i)]);
    a.dispatch("SET_OPTIONS", { options: e });
    const n = () => {
        document.hidden || a.dispatch("KICK");
    };
    document.addEventListener("visibilitychange", n);
    let l = null;
    let o = !1;
    let r = !1;
    let s = null;
    let p = null;
    const c = () => {
        o || (o = !0),
            clearTimeout(l),
            (l = setTimeout(() => {
                (o = !1),
                    (s = null),
                    (p = null),
                    r && ((r = !1), a.dispatch("DID_STOP_RESIZE"));
            }, 500));
    };
    window.addEventListener("resize", c);
    const d = Qd(a, { id: qi() });
    let m = !1;
    let u = !1;
    const g = {
        _read: () => {
            o &&
                ((p = window.innerWidth),
                s || (s = p),
                !r && p !== s && (a.dispatch("DID_START_RESIZE"), (r = !0))),
                u && m && (m = d.element.offsetParent === null),
                !m && (d._read(), (u = d.rect.element.hidden));
        },
        _write: (S) => {
            const L = a
                .processActionQueue()
                .filter((D) => !/^SET_/.test(D.type));
            (m && !L.length) ||
                (b(L),
                (m = d._write(S, L, r)),
                os(a.query("GET_ITEMS")),
                m && a.processDispatchQueue());
        },
    };
    const f = (S) => (L) => {
        const D = { type: S };
        if (!L) return D;
        if (
            (L.hasOwnProperty("error") &&
                (D.error = L.error ? { ...L.error } : null),
            L.status && (D.status = { ...L.status }),
            L.file && (D.output = L.file),
            L.source)
        ) {
            D.file = L.source;
        } else if (L.item || L.id) {
            const F = L.item ? L.item : a.query("GET_ITEM", L.id);
            D.file = F ? he(F) : null;
        }
        return (
            L.items && (D.items = L.items.map(he)),
            /progress/.test(S) && (D.progress = L.progress),
            L.hasOwnProperty("origin") &&
                L.hasOwnProperty("target") &&
                ((D.origin = L.origin), (D.target = L.target)),
            D
        );
    };
    const h = {
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
    const I = (S) => {
        const L = { pond: O, ...S };
        delete L.type,
            d.element.dispatchEvent(
                new CustomEvent(`FilePond:${S.type}`, {
                    detail: L,
                    bubbles: !0,
                    cancelable: !0,
                    composed: !0,
                }),
            );
        const D = [];
        S.hasOwnProperty("error") && D.push(S.error),
            S.hasOwnProperty("file") && D.push(S.file);
        const F = ["type", "error", "file"];
        Object.keys(S)
            .filter((C) => !F.includes(C))
            .forEach((C) => D.push(S[C])),
            O.fire(S.type, ...D);
        const G = a.query(`GET_ON${S.type.toUpperCase()}`);
        G && G(...D);
    };
    const b = (S) => {
        S.length &&
            S.filter((L) => h[L.type]).forEach((L) => {
                const D = h[L.type];
                (Array.isArray(D) ? D : [D]).forEach((F) => {
                    L.type === "DID_INIT_ITEM"
                        ? I(F(L.data))
                        : setTimeout(() => {
                              I(F(L.data));
                          }, 0);
                });
            });
    };
    const T = (S) => a.dispatch("SET_OPTIONS", { options: S });
    const v = (S) => a.query("GET_ACTIVE_ITEM", S);
    const y = (S) =>
        new Promise((L, D) => {
            a.dispatch("REQUEST_ITEM_PREPARE", {
                query: S,
                success: (F) => {
                    L(F);
                },
                failure: (F) => {
                    D(F);
                },
            });
        });
    const E = (S, L = {}) =>
        new Promise((D, F) => {
            R([{ source: S, options: L }], { index: L.index })
                .then((G) => D(G && G[0]))
                .catch(F);
        });
    const _ = (S) => S.file && S.id;
    const x = (S, L) => (
        typeof S === "object" && !_(S) && !L && ((L = S), (S = void 0)),
        a.dispatch("REMOVE_ITEM", { ...L, query: S }),
        a.query("GET_ACTIVE_ITEM", S) === null
    );
    const R = (...S) =>
        new Promise((L, D) => {
            const F = [];
            const G = {};
            if (ci(S[0])) F.push.apply(F, S[0]), Object.assign(G, S[1] || {});
            else {
                const C = S[S.length - 1];
                typeof C === "object" &&
                    !(C instanceof Blob) &&
                    Object.assign(G, S.pop()),
                    F.push(...S);
            }
            a.dispatch("ADD_ITEMS", {
                items: F,
                index: G.index,
                interactionMethod: Re.API,
                success: L,
                failure: D,
            });
        });
    const z = () => a.query("GET_ACTIVE_ITEMS");
    const P = (S) =>
        new Promise((L, D) => {
            a.dispatch("REQUEST_ITEM_PROCESSING", {
                query: S,
                success: (F) => {
                    L(F);
                },
                failure: (F) => {
                    D(F);
                },
            });
        });
    const A = (...S) => {
        const L = Array.isArray(S[0]) ? S[0] : S;
        const D = L.length ? L : z();
        return Promise.all(D.map(y));
    };
    const B = (...S) => {
        const L = Array.isArray(S[0]) ? S[0] : S;
        if (!L.length) {
            const D = z().filter(
                (F) =>
                    !(F.status === U.IDLE && F.origin === re.LOCAL) &&
                    F.status !== U.PROCESSING &&
                    F.status !== U.PROCESSING_COMPLETE &&
                    F.status !== U.PROCESSING_REVERT_ERROR,
            );
            return Promise.all(D.map(P));
        }
        return Promise.all(L.map(P));
    };
    const w = (...S) => {
        const L = Array.isArray(S[0]) ? S[0] : S;
        let D;
        typeof L[L.length - 1] === "object"
            ? (D = L.pop())
            : Array.isArray(S[0]) && (D = S[1]);
        const F = z();
        return L.length
            ? L.map((C) => ($e(C) ? (F[C] ? F[C].id : null) : C))
                  .filter((C) => C)
                  .map((C) => x(C, D))
            : Promise.all(F.map((C) => x(C, D)));
    };
    const O = {
        ...mi(),
        ...g,
        ...ts(a, i),
        setOptions: T,
        addFile: E,
        addFiles: R,
        getFile: v,
        processFile: P,
        prepareFile: y,
        removeFile: x,
        moveFile: (S, L) => a.dispatch("MOVE_ITEM", { query: S, index: L }),
        getFiles: z,
        processFiles: B,
        removeFiles: w,
        prepareFiles: A,
        sort: (S) => a.dispatch("SORT", { compare: S }),
        browse: () => {
            const S = d.element.querySelector("input[type=file]");
            S && S.click();
        },
        destroy: () => {
            O.fire("destroy", d.element),
                a.dispatch("ABORT_ALL"),
                d._destroy(),
                window.removeEventListener("resize", c),
                document.removeEventListener("visibilitychange", n),
                a.dispatch("DID_DESTROY");
        },
        insertBefore: (S) => Ba(d.element, S),
        insertAfter: (S) => Na(d.element, S),
        appendTo: (S) => S.appendChild(d.element),
        replaceElement: (S) => {
            Ba(d.element, S), S.parentNode.removeChild(S), (t = S);
        },
        restoreElement: () => {
            t &&
                (Na(t, d.element),
                d.element.parentNode.removeChild(d.element),
                (t = null));
        },
        isAttachedTo: (S) => d.element === S || t === S,
        element: { get: () => d.element },
        status: { get: () => a.query("GET_STATUS") },
    };
    return a.dispatch("DID_INIT"), We(O);
};
const il = (e = {}) => {
    const t = {};
    return (
        te(oi(), (a, n) => {
            t[a] = n[0];
        }),
        Zd({ ...t, ...e })
    );
};
const Jd = (e) => e.charAt(0).toLowerCase() + e.slice(1);
const ep = (e) => el(e.replace(/^data-/, ""));
const al = (e, t) => {
    te(t, (i, a) => {
        te(e, (n, l) => {
            const o = new RegExp(i);
            if (!o.test(n) || (delete e[n], a === !1)) return;
            if (ge(a)) {
                e[a] = l;
                return;
            }
            const s = a.group;
            ce(a) && !e[s] && (e[s] = {}), (e[s][Jd(n.replace(o, ""))] = l);
        }),
            a.mapping && al(e[a.group], a.mapping);
    });
};
const tp = (e, t = {}) => {
    const i = [];
    te(e.attributes, (n) => {
        i.push(e.attributes[n]);
    });
    const a = i
        .filter((n) => n.name)
        .reduce((n, l) => {
            const o = se(e, l.name);
            return (n[ep(l.name)] = o === l.name ? !0 : o), n;
        }, {});
    return al(a, t), a;
};
const ip = (e, t = {}) => {
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
    tt("SET_ATTRIBUTE_TO_OPTION_MAP", i);
    const a = { ...t };
    const n = tp(
        e.nodeName === "FIELDSET" ? e.querySelector("input[type=file]") : e,
        i,
    );
    Object.keys(n).forEach((o) => {
        ce(n[o])
            ? (ce(a[o]) || (a[o] = {}), Object.assign(a[o], n[o]))
            : (a[o] = n[o]);
    }),
        (a.files = (t.files || []).concat(
            Array.from(e.querySelectorAll("input:not([type=file])")).map(
                (o) => ({ source: o.value, options: { type: o.dataset.type } }),
            ),
        ));
    const l = il(a);
    return (
        e.files &&
            Array.from(e.files).forEach((o) => {
                l.addFile(o);
            }),
        l.replaceElement(e),
        l
    );
};
const ap = (...e) => (gr(e[0]) ? ip(...e) : il(...e));
const np = ["fire", "_read", "_write"];
const hn = (e) => {
    const t = {};
    return Rn(e, t, np), t;
};
const lp = (e, t) => e.replace(/(?:{([a-zA-Z]+)})/g, (i, a) => t[a]);
const op = (e) => {
    const t = new Blob(["(", e.toString(), ")()"], {
        type: "application/javascript",
    });
    const i = URL.createObjectURL(t);
    const a = new Worker(i);
    return {
        transfer: (n, l) => {},
        post: (n, l, o) => {
            const r = qi();
            (a.onmessage = (s) => {
                s.data.id === r && l(s.data.message);
            }),
                a.postMessage({ id: r, message: n }, o);
        },
        terminate: () => {
            a.terminate(), URL.revokeObjectURL(i);
        },
    };
};
const rp = (e) =>
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
const nl = (e, t) => {
    const i = e.slice(0, e.size, e.type);
    return (i.lastModifiedDate = e.lastModifiedDate), (i.name = t), i;
};
const sp = (e) => nl(e, e.name);
const bn = [];
const cp = (e) => {
    if (bn.includes(e)) return;
    bn.push(e);
    const t = e({
        addFilter: ss,
        utils: {
            Type: M,
            forin: te,
            isString: ge,
            isFile: Je,
            toNaturalFileSize: Bn,
            replaceInString: lp,
            getExtensionFromFilename: ui,
            getFilenameWithoutExtension: Fn,
            guesstimateMimeType: $n,
            getFileFromBlob: ht,
            getFilenameFromURL: Dt,
            createRoute: fe,
            createWorker: op,
            createView: ne,
            createItemAPI: he,
            loadImage: rp,
            copyFile: sp,
            renameFile: nl,
            createBlob: Pn,
            applyFilterChain: Ae,
            text: ae,
            getNumericAspectRatioFromString: wn,
        },
        views: { fileActionButton: Cn },
    });
    cs(t.options);
};
const dp = () =>
    Object.prototype.toString.call(window.operamini) === "[object OperaMini]";
const pp = () => "Promise" in window;
const mp = () => "slice" in Blob.prototype;
const up = () => "URL" in window && "createObjectURL" in window.URL;
const gp = () => "visibilityState" in document;
const fp = () => "performance" in window;
const hp = () => "supports" in (window.CSS || {});
const bp = () => /MSIE|Trident/.test(window.navigator.userAgent);
var Gi = (() => {
    const e =
        En() && !dp() && gp() && pp() && mp() && up() && fp() && (hp() || bp());
    return () => e;
})();
const Ue = { apps: [] };
const Ep = "filepond";
const it = () => {};
var ll = {};
var Et = {};
var Ct = {};
var Ui = {};
var gt = it;
var ft = it;
var Wi = it;
var Hi = it;
var ve = it;
var ji = it;
var Ft = it;
if (Gi()) {
    Vr(
        () => {
            Ue.apps.forEach((i) => i._read());
        },
        (i) => {
            Ue.apps.forEach((a) => a._write(i));
        },
    );
    const e = () => {
        document.dispatchEvent(
            new CustomEvent("FilePond:loaded", {
                detail: {
                    supported: Gi,
                    create: gt,
                    destroy: ft,
                    parse: Wi,
                    find: Hi,
                    registerPlugin: ve,
                    setOptions: Ft,
                },
            }),
        ),
            document.removeEventListener("DOMContentLoaded", e);
    };
    document.readyState !== "loading"
        ? setTimeout(() => e(), 0)
        : document.addEventListener("DOMContentLoaded", e);
    const t = () =>
        te(oi(), (i, a) => {
            Ui[i] = a[1];
        });
    (ll = { ...Ln }),
        (Ct = { ...re }),
        (Et = { ...U }),
        (Ui = {}),
        t(),
        (gt = (...i) => {
            const a = ap(...i);
            return a.on("destroy", ft), Ue.apps.push(a), hn(a);
        }),
        (ft = (i) => {
            const a = Ue.apps.findIndex((n) => n.isAttachedTo(i));
            return a >= 0 ? (Ue.apps.splice(a, 1)[0].restoreElement(), !0) : !1;
        }),
        (Wi = (i) =>
            Array.from(i.querySelectorAll(`.${Ep}`))
                .filter((l) => !Ue.apps.find((o) => o.isAttachedTo(l)))
                .map((l) => gt(l))),
        (Hi = (i) => {
            const a = Ue.apps.find((n) => n.isAttachedTo(i));
            return a ? hn(a) : null;
        }),
        (ve = (...i) => {
            i.forEach(cp), t();
        }),
        (ji = () => {
            const i = {};
            return (
                te(oi(), (a, n) => {
                    i[a] = n[0];
                }),
                i
            );
        }),
        (Ft = (i) => (
            ce(i) &&
                (Ue.apps.forEach((a) => {
                    a.setOptions(i);
                }),
                ds(i)),
            ji()
        ));
}
function ol(e, t) {
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
function xl(e) {
    for (let t = 1; t < arguments.length; t++) {
        var i = arguments[t] != null ? arguments[t] : {};
        t % 2
            ? ol(Object(i), !0).forEach(function (a) {
                  xp(e, a, i[a]);
              })
            : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(i))
              : ol(Object(i)).forEach(function (a) {
                    Object.defineProperty(
                        e,
                        a,
                        Object.getOwnPropertyDescriptor(i, a),
                    );
                });
    }
    return e;
}
function Tp(e, t) {
    if (typeof e !== "object" || !e) return e;
    const i = e[Symbol.toPrimitive];
    if (i !== void 0) {
        const a = i.call(e, t || "default");
        if (typeof a !== "object") return a;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (t === "string" ? String : Number)(e);
}
function yl(e) {
    const t = Tp(e, "string");
    return typeof t === "symbol" ? t : t + "";
}
function sa(e) {
    "@babel/helpers - typeof";
    return (
        (sa =
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
        sa(e)
    );
}
function Ip(e, t) {
    if (!(e instanceof t)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function rl(e, t) {
    for (let i = 0; i < t.length; i++) {
        const a = t[i];
        (a.enumerable = a.enumerable || !1),
            (a.configurable = !0),
            "value" in a && (a.writable = !0),
            Object.defineProperty(e, yl(a.key), a);
    }
}
function vp(e, t, i) {
    return (
        t && rl(e.prototype, t),
        i && rl(e, i),
        Object.defineProperty(e, "prototype", { writable: !1 }),
        e
    );
}
function xp(e, t, i) {
    return (
        (t = yl(t)),
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
function Rl(e) {
    return yp(e) || Rp(e) || Sp(e) || _p();
}
function yp(e) {
    if (Array.isArray(e)) return ca(e);
}
function Rp(e) {
    if (
        (typeof Symbol < "u" && e[Symbol.iterator] != null) ||
        e["@@iterator"] != null
    ) {
        return Array.from(e);
    }
}
function Sp(e, t) {
    if (e) {
        if (typeof e === "string") return ca(e, t);
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
            return ca(e, t);
        }
    }
}
function ca(e, t) {
    (t == null || t > e.length) && (t = e.length);
    for (var i = 0, a = new Array(t); i < t; i++) a[i] = e[i];
    return a;
}
function _p() {
    throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
const Ti = typeof window < "u" && typeof window.document < "u";
const De = Ti ? window : {};
const Ea =
    Ti && De.document.documentElement
        ? "ontouchstart" in De.document.documentElement
        : !1;
const Ta = Ti ? "PointerEvent" in De : !1;
const Z = "cropper";
const Ia = "all";
const Sl = "crop";
const _l = "move";
const wl = "zoom";
const at = "e";
const nt = "w";
const Tt = "s";
const He = "n";
const Bt = "ne";
const Nt = "nw";
const kt = "se";
const Vt = "sw";
const da = "".concat(Z, "-crop");
const sl = "".concat(Z, "-disabled");
const Ee = "".concat(Z, "-hidden");
const cl = "".concat(Z, "-hide");
const wp = "".concat(Z, "-invisible");
const Ei = "".concat(Z, "-modal");
const pa = "".concat(Z, "-move");
const Ut = "".concat(Z, "Action");
const hi = "".concat(Z, "Preview");
const va = "crop";
const Ll = "move";
const Ml = "none";
const ma = "crop";
const ua = "cropend";
const ga = "cropmove";
const fa = "cropstart";
const dl = "dblclick";
const Lp = Ea ? "touchstart" : "mousedown";
const Mp = Ea ? "touchmove" : "mousemove";
const Ap = Ea ? "touchend touchcancel" : "mouseup";
const pl = Ta ? "pointerdown" : Lp;
const ml = Ta ? "pointermove" : Mp;
const ul = Ta ? "pointerup pointercancel" : Ap;
const gl = "ready";
const fl = "resize";
const hl = "wheel";
const ha = "zoom";
const bl = "image/jpeg";
const Pp = /^e|w|s|n|se|sw|ne|nw|all|crop|move|zoom$/;
const zp = /^data:/;
const Op = /^data:image\/jpeg;base64,/;
const Fp = /^img|canvas$/i;
const Al = 200;
const Pl = 100;
const El = {
    viewMode: 0,
    dragMode: va,
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
    minContainerWidth: Al,
    minContainerHeight: Pl,
    ready: null,
    cropstart: null,
    cropmove: null,
    cropend: null,
    crop: null,
    zoom: null,
};
const Dp =
    '<div class="cropper-container" touch-action="none"><div class="cropper-wrap-box"><div class="cropper-canvas"></div></div><div class="cropper-drag-box"></div><div class="cropper-crop-box"><span class="cropper-view-box"></span><span class="cropper-dashed dashed-h"></span><span class="cropper-dashed dashed-v"></span><span class="cropper-center"></span><span class="cropper-face"></span><span class="cropper-line line-e" data-cropper-action="e"></span><span class="cropper-line line-n" data-cropper-action="n"></span><span class="cropper-line line-w" data-cropper-action="w"></span><span class="cropper-line line-s" data-cropper-action="s"></span><span class="cropper-point point-e" data-cropper-action="e"></span><span class="cropper-point point-n" data-cropper-action="n"></span><span class="cropper-point point-w" data-cropper-action="w"></span><span class="cropper-point point-s" data-cropper-action="s"></span><span class="cropper-point point-ne" data-cropper-action="ne"></span><span class="cropper-point point-nw" data-cropper-action="nw"></span><span class="cropper-point point-sw" data-cropper-action="sw"></span><span class="cropper-point point-se" data-cropper-action="se"></span></div></div>';
const Cp = Number.isNaN || De.isNaN;
function j(e) {
    return typeof e === "number" && !Cp(e);
}
const Tl = function (t) {
    return t > 0 && t < 1 / 0;
};
function oa(e) {
    return typeof e > "u";
}
function lt(e) {
    return sa(e) === "object" && e !== null;
}
const Bp = Object.prototype.hasOwnProperty;
function It(e) {
    if (!lt(e)) return !1;
    try {
        const t = e.constructor;
        const i = t.prototype;
        return t && i && Bp.call(i, "isPrototypeOf");
    } catch {
        return !1;
    }
}
function be(e) {
    return typeof e === "function";
}
const Np = Array.prototype.slice;
function zl(e) {
    return Array.from ? Array.from(e) : Np.call(e);
}
function le(e, t) {
    return (
        e &&
            be(t) &&
            (Array.isArray(e) || j(e.length)
                ? zl(e).forEach(function (i, a) {
                      t.call(e, i, a, e);
                  })
                : lt(e) &&
                  Object.keys(e).forEach(function (i) {
                      t.call(e, e[i], i, e);
                  })),
        e
    );
}
const J =
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
            lt(t) &&
                a.length > 0 &&
                a.forEach(function (l) {
                    lt(l) &&
                        Object.keys(l).forEach(function (o) {
                            t[o] = l[o];
                        });
                }),
            t
        );
    };
const kp = /\.\d*(?:0|9){12}\d*$/;
function xt(e) {
    const t =
        arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1e11;
    return kp.test(e) ? Math.round(e * t) / t : e;
}
const Vp = /^width|height|left|top|marginLeft|marginTop$/;
function je(e, t) {
    const i = e.style;
    le(t, function (a, n) {
        Vp.test(n) && j(a) && (a = "".concat(a, "px")), (i[n] = a);
    });
}
function Gp(e, t) {
    return e.classList ? e.classList.contains(t) : e.className.indexOf(t) > -1;
}
function de(e, t) {
    if (t) {
        if (j(e.length)) {
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
function Fe(e, t) {
    if (t) {
        if (j(e.length)) {
            le(e, function (i) {
                Fe(i, t);
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
function vt(e, t, i) {
    if (t) {
        if (j(e.length)) {
            le(e, function (a) {
                vt(a, t, i);
            });
            return;
        }
        i ? de(e, t) : Fe(e, t);
    }
}
const Up = /([a-z\d])([A-Z])/g;
function xa(e) {
    return e.replace(Up, "$1-$2").toLowerCase();
}
function ba(e, t) {
    return lt(e[t])
        ? e[t]
        : e.dataset
          ? e.dataset[t]
          : e.getAttribute("data-".concat(xa(t)));
}
function Wt(e, t, i) {
    lt(i)
        ? (e[t] = i)
        : e.dataset
          ? (e.dataset[t] = i)
          : e.setAttribute("data-".concat(xa(t)), i);
}
function Wp(e, t) {
    if (lt(e[t])) {
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
    } else e.removeAttribute("data-".concat(xa(t)));
}
const Ol = /\s\s*/;
const Fl = (function () {
    let e = !1;
    if (Ti) {
        let t = !1;
        const i = function () {};
        const a = Object.defineProperty({}, "once", {
            get: function () {
                return (e = !0), t;
            },
            set: function (l) {
                t = l;
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
        .split(Ol)
        .forEach(function (l) {
            if (!Fl) {
                const o = e.listeners;
                o &&
                    o[l] &&
                    o[l][i] &&
                    ((n = o[l][i]),
                    delete o[l][i],
                    Object.keys(o[l]).length === 0 && delete o[l],
                    Object.keys(o).length === 0 && delete e.listeners);
            }
            e.removeEventListener(l, n, a);
        });
}
function Se(e, t, i) {
    const a =
        arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    let n = i;
    t.trim()
        .split(Ol)
        .forEach(function (l) {
            if (a.once && !Fl) {
                const o = e.listeners;
                const r = o === void 0 ? {} : o;
                (n = function () {
                    delete r[l][i], e.removeEventListener(l, n, a);
                    for (
                        var p = arguments.length, c = new Array(p), d = 0;
                        d < p;
                        d++
                    ) {
                        c[d] = arguments[d];
                    }
                    i.apply(e, c);
                }),
                    r[l] || (r[l] = {}),
                    r[l][i] && e.removeEventListener(l, r[l][i], a),
                    (r[l][i] = n),
                    (e.listeners = r);
            }
            e.addEventListener(l, n, a);
        });
}
function yt(e, t, i) {
    let a;
    return (
        be(Event) && be(CustomEvent)
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
function Dl(e) {
    const t = e.getBoundingClientRect();
    return {
        left:
            t.left + (window.pageXOffset - document.documentElement.clientLeft),
        top: t.top + (window.pageYOffset - document.documentElement.clientTop),
    };
}
const ra = De.location;
const Hp = /^(\w+:)\/\/([^:/?#]*):?(\d*)/i;
function Il(e) {
    const t = e.match(Hp);
    return (
        t !== null &&
        (t[1] !== ra.protocol || t[2] !== ra.hostname || t[3] !== ra.port)
    );
}
function vl(e) {
    const t = "timestamp=".concat(new Date().getTime());
    return e + (e.indexOf("?") === -1 ? "?" : "&") + t;
}
function Gt(e) {
    const t = e.rotate;
    const i = e.scaleX;
    const a = e.scaleY;
    const n = e.translateX;
    const l = e.translateY;
    const o = [];
    j(n) && n !== 0 && o.push("translateX(".concat(n, "px)")),
        j(l) && l !== 0 && o.push("translateY(".concat(l, "px)")),
        j(t) && t !== 0 && o.push("rotate(".concat(t, "deg)")),
        j(i) && i !== 1 && o.push("scaleX(".concat(i, ")")),
        j(a) && a !== 1 && o.push("scaleY(".concat(a, ")"));
    const r = o.length ? o.join(" ") : "none";
    return { WebkitTransform: r, msTransform: r, transform: r };
}
function jp(e) {
    const t = xl({}, e);
    let i = 0;
    return (
        le(e, function (a, n) {
            delete t[n],
                le(t, function (l) {
                    const o = Math.abs(a.startX - l.startX);
                    const r = Math.abs(a.startY - l.startY);
                    const s = Math.abs(a.endX - l.endX);
                    const p = Math.abs(a.endY - l.endY);
                    const c = Math.sqrt(o * o + r * r);
                    const d = Math.sqrt(s * s + p * p);
                    const m = (d - c) / c;
                    Math.abs(m) > Math.abs(i) && (i = m);
                });
        }),
        i
    );
}
function bi(e, t) {
    const i = e.pageX;
    const a = e.pageY;
    const n = { endX: i, endY: a };
    return t ? n : xl({ startX: i, startY: a }, n);
}
function Yp(e) {
    let t = 0;
    let i = 0;
    let a = 0;
    return (
        le(e, function (n) {
            const l = n.startX;
            const o = n.startY;
            (t += l), (i += o), (a += 1);
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
    const l = Tl(a);
    const o = Tl(i);
    if (l && o) {
        const r = i * t;
        (n === "contain" && r > a) || (n === "cover" && r < a)
            ? (i = a / t)
            : (a = i * t);
    } else l ? (i = a / t) : o && (a = i * t);
    return { width: a, height: i };
}
function qp(e) {
    const t = e.width;
    const i = e.height;
    let a = e.degree;
    if (((a = Math.abs(a) % 180), a === 90)) return { width: i, height: t };
    const n = ((a % 90) * Math.PI) / 180;
    const l = Math.sin(n);
    const o = Math.cos(n);
    const r = t * o + i * l;
    const s = t * l + i * o;
    return a > 90 ? { width: s, height: r } : { width: r, height: s };
}
function $p(e, t, i, a) {
    const n = t.aspectRatio;
    const l = t.naturalWidth;
    const o = t.naturalHeight;
    const r = t.rotate;
    const s = r === void 0 ? 0 : r;
    const p = t.scaleX;
    const c = p === void 0 ? 1 : p;
    const d = t.scaleY;
    const m = d === void 0 ? 1 : d;
    const u = i.aspectRatio;
    const g = i.naturalWidth;
    const f = i.naturalHeight;
    const h = a.fillColor;
    const I = h === void 0 ? "transparent" : h;
    const b = a.imageSmoothingEnabled;
    const T = b === void 0 ? !0 : b;
    const v = a.imageSmoothingQuality;
    const y = v === void 0 ? "low" : v;
    const E = a.maxWidth;
    const _ = E === void 0 ? 1 / 0 : E;
    const x = a.maxHeight;
    const R = x === void 0 ? 1 / 0 : x;
    const z = a.minWidth;
    const P = z === void 0 ? 0 : z;
    const A = a.minHeight;
    const B = A === void 0 ? 0 : A;
    const w = document.createElement("canvas");
    const O = w.getContext("2d");
    const S = Ye({ aspectRatio: u, width: _, height: R });
    const L = Ye({ aspectRatio: u, width: P, height: B }, "cover");
    const D = Math.min(S.width, Math.max(L.width, g));
    const F = Math.min(S.height, Math.max(L.height, f));
    const G = Ye({ aspectRatio: n, width: _, height: R });
    const C = Ye({ aspectRatio: n, width: P, height: B }, "cover");
    const q = Math.min(G.width, Math.max(C.width, l));
    const X = Math.min(G.height, Math.max(C.height, o));
    const K = [-q / 2, -X / 2, q, X];
    return (
        (w.width = xt(D)),
        (w.height = xt(F)),
        (O.fillStyle = I),
        O.fillRect(0, 0, D, F),
        O.save(),
        O.translate(D / 2, F / 2),
        O.rotate((s * Math.PI) / 180),
        O.scale(c, m),
        (O.imageSmoothingEnabled = T),
        (O.imageSmoothingQuality = y),
        O.drawImage.apply(
            O,
            [e].concat(
                Rl(
                    K.map(function (pe) {
                        return Math.floor(xt(pe));
                    }),
                ),
            ),
        ),
        O.restore(),
        w
    );
}
const Cl = String.fromCharCode;
function Xp(e, t, i) {
    let a = "";
    i += t;
    for (let n = t; n < i; n += 1) a += Cl(e.getUint8(n));
    return a;
}
const Kp = /^data:.*,/;
function Qp(e) {
    const t = e.replace(Kp, "");
    const i = atob(t);
    const a = new ArrayBuffer(i.length);
    const n = new Uint8Array(a);
    return (
        le(n, function (l, o) {
            n[o] = i.charCodeAt(o);
        }),
        a
    );
}
function Zp(e, t) {
    for (var i = [], a = 8192, n = new Uint8Array(e); n.length > 0; ) {
        i.push(Cl.apply(null, zl(n.subarray(0, a)))), (n = n.subarray(a));
    }
    return "data:".concat(t, ";base64,").concat(btoa(i.join("")));
}
function Jp(e) {
    const t = new DataView(e);
    let i;
    try {
        let a, n, l;
        if (t.getUint8(0) === 255 && t.getUint8(1) === 216) {
            for (let o = t.byteLength, r = 2; r + 1 < o; ) {
                if (t.getUint8(r) === 255 && t.getUint8(r + 1) === 225) {
                    n = r;
                    break;
                }
                r += 1;
            }
        }
        if (n) {
            const s = n + 4;
            const p = n + 10;
            if (Xp(t, s, 4) === "Exif") {
                const c = t.getUint16(p);
                if (
                    ((a = c === 18761),
                    (a || c === 19789) && t.getUint16(p + 2, a) === 42)
                ) {
                    const d = t.getUint32(p + 4, a);
                    d >= 8 && (l = p + d);
                }
            }
        }
        if (l) {
            const m = t.getUint16(l, a);
            let u;
            let g;
            for (g = 0; g < m; g += 1) {
                if (((u = l + g * 12 + 2), t.getUint16(u, a) === 274)) {
                    (u += 8), (i = t.getUint16(u, a)), t.setUint16(u, 1, a);
                    break;
                }
            }
        }
    } catch {
        i = 1;
    }
    return i;
}
function em(e) {
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
const tm = {
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
        const l = Number(i.minContainerWidth);
        const o = Number(i.minContainerHeight);
        de(n, Ee), Fe(t, Ee);
        const r = {
            width: Math.max(a.offsetWidth, l >= 0 ? l : Al),
            height: Math.max(a.offsetHeight, o >= 0 ? o : Pl),
        };
        (this.containerData = r),
            je(n, { width: r.width, height: r.height }),
            de(t, Ee),
            Fe(n, Ee);
    },
    initCanvas: function () {
        const t = this.containerData;
        const i = this.imageData;
        const a = this.options.viewMode;
        const n = Math.abs(i.rotate) % 180 === 90;
        const l = n ? i.naturalHeight : i.naturalWidth;
        const o = n ? i.naturalWidth : i.naturalHeight;
        const r = l / o;
        let s = t.width;
        let p = t.height;
        t.height * r > t.width
            ? a === 3
                ? (s = t.height * r)
                : (p = t.width / r)
            : a === 3
              ? (p = t.width / r)
              : (s = t.height * r);
        const c = {
            aspectRatio: r,
            naturalWidth: l,
            naturalHeight: o,
            width: s,
            height: p,
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
            (this.initialCanvasData = J({}, c));
    },
    limitCanvas: function (t, i) {
        const a = this.options;
        const n = this.containerData;
        const l = this.canvasData;
        const o = this.cropBoxData;
        const r = a.viewMode;
        const s = l.aspectRatio;
        const p = this.cropped && o;
        if (t) {
            let c = Number(a.minCanvasWidth) || 0;
            let d = Number(a.minCanvasHeight) || 0;
            r > 1
                ? ((c = Math.max(c, n.width)),
                  (d = Math.max(d, n.height)),
                  r === 3 && (d * s > c ? (c = d * s) : (d = c / s)))
                : r > 0 &&
                  (c
                      ? (c = Math.max(c, p ? o.width : 0))
                      : d
                        ? (d = Math.max(d, p ? o.height : 0))
                        : p &&
                          ((c = o.width),
                          (d = o.height),
                          d * s > c ? (c = d * s) : (d = c / s)));
            const m = Ye({ aspectRatio: s, width: c, height: d });
            (c = m.width),
                (d = m.height),
                (l.minWidth = c),
                (l.minHeight = d),
                (l.maxWidth = 1 / 0),
                (l.maxHeight = 1 / 0);
        }
        if (i) {
            if (r > (p ? 0 : 1)) {
                const u = n.width - l.width;
                const g = n.height - l.height;
                (l.minLeft = Math.min(0, u)),
                    (l.minTop = Math.min(0, g)),
                    (l.maxLeft = Math.max(0, u)),
                    (l.maxTop = Math.max(0, g)),
                    p &&
                        this.limited &&
                        ((l.minLeft = Math.min(
                            o.left,
                            o.left + (o.width - l.width),
                        )),
                        (l.minTop = Math.min(
                            o.top,
                            o.top + (o.height - l.height),
                        )),
                        (l.maxLeft = o.left),
                        (l.maxTop = o.top),
                        r === 2 &&
                            (l.width >= n.width &&
                                ((l.minLeft = Math.min(0, u)),
                                (l.maxLeft = Math.max(0, u))),
                            l.height >= n.height &&
                                ((l.minTop = Math.min(0, g)),
                                (l.maxTop = Math.max(0, g)))));
            } else {
                (l.minLeft = -l.width),
                    (l.minTop = -l.height),
                    (l.maxLeft = n.width),
                    (l.maxTop = n.height);
            }
        }
    },
    renderCanvas: function (t, i) {
        const a = this.canvasData;
        const n = this.imageData;
        if (i) {
            const l = qp({
                width: n.naturalWidth * Math.abs(n.scaleX || 1),
                height: n.naturalHeight * Math.abs(n.scaleY || 1),
                degree: n.rotate || 0,
            });
            const o = l.width;
            const r = l.height;
            const s = a.width * (o / a.naturalWidth);
            const p = a.height * (r / a.naturalHeight);
            (a.left -= (s - a.width) / 2),
                (a.top -= (p - a.height) / 2),
                (a.width = s),
                (a.height = p),
                (a.aspectRatio = o / r),
                (a.naturalWidth = o),
                (a.naturalHeight = r),
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
            je(
                this.canvas,
                J(
                    { width: a.width, height: a.height },
                    Gt({ translateX: a.left, translateY: a.top }),
                ),
            ),
            this.renderImage(t),
            this.cropped && this.limited && this.limitCropBox(!0, !0);
    },
    renderImage: function (t) {
        const i = this.canvasData;
        const a = this.imageData;
        const n = a.naturalWidth * (i.width / i.naturalWidth);
        const l = a.naturalHeight * (i.height / i.naturalHeight);
        J(a, {
            width: n,
            height: l,
            left: (i.width - n) / 2,
            top: (i.height - l) / 2,
        }),
            je(
                this.image,
                J(
                    { width: a.width, height: a.height },
                    Gt(J({ translateX: a.left, translateY: a.top }, a)),
                ),
            ),
            t && this.output();
    },
    initCropBox: function () {
        const t = this.options;
        const i = this.canvasData;
        const a = t.aspectRatio || t.initialAspectRatio;
        const n = Number(t.autoCropArea) || 0.8;
        const l = { width: i.width, height: i.height };
        a &&
            (i.height * a > i.width
                ? (l.height = l.width / a)
                : (l.width = l.height * a)),
            (this.cropBoxData = l),
            this.limitCropBox(!0, !0),
            (l.width = Math.min(Math.max(l.width, l.minWidth), l.maxWidth)),
            (l.height = Math.min(Math.max(l.height, l.minHeight), l.maxHeight)),
            (l.width = Math.max(l.minWidth, l.width * n)),
            (l.height = Math.max(l.minHeight, l.height * n)),
            (l.left = i.left + (i.width - l.width) / 2),
            (l.top = i.top + (i.height - l.height) / 2),
            (l.oldLeft = l.left),
            (l.oldTop = l.top),
            (this.initialCropBoxData = J({}, l));
    },
    limitCropBox: function (t, i) {
        const a = this.options;
        const n = this.containerData;
        const l = this.canvasData;
        const o = this.cropBoxData;
        const r = this.limited;
        const s = a.aspectRatio;
        if (t) {
            let p = Number(a.minCropBoxWidth) || 0;
            let c = Number(a.minCropBoxHeight) || 0;
            let d = r
                ? Math.min(n.width, l.width, l.width + l.left, n.width - l.left)
                : n.width;
            let m = r
                ? Math.min(
                      n.height,
                      l.height,
                      l.height + l.top,
                      n.height - l.top,
                  )
                : n.height;
            (p = Math.min(p, n.width)),
                (c = Math.min(c, n.height)),
                s &&
                    (p && c
                        ? c * s > p
                            ? (c = p / s)
                            : (p = c * s)
                        : p
                          ? (c = p / s)
                          : c && (p = c * s),
                    m * s > d ? (m = d / s) : (d = m * s)),
                (o.minWidth = Math.min(p, d)),
                (o.minHeight = Math.min(c, m)),
                (o.maxWidth = d),
                (o.maxHeight = m);
        }
        i &&
            (r
                ? ((o.minLeft = Math.max(0, l.left)),
                  (o.minTop = Math.max(0, l.top)),
                  (o.maxLeft = Math.min(n.width, l.left + l.width) - o.width),
                  (o.maxTop = Math.min(n.height, l.top + l.height) - o.height))
                : ((o.minLeft = 0),
                  (o.minTop = 0),
                  (o.maxLeft = n.width - o.width),
                  (o.maxTop = n.height - o.height)));
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
                Wt(
                    this.face,
                    Ut,
                    a.width >= i.width && a.height >= i.height ? _l : Ia,
                ),
            je(
                this.cropBox,
                J(
                    { width: a.width, height: a.height },
                    Gt({ translateX: a.left, translateY: a.top }),
                ),
            ),
            this.cropped && this.limited && this.limitCanvas(!0, !0),
            this.disabled || this.output();
    },
    output: function () {
        this.preview(), yt(this.element, ma, this.getData());
    },
};
const im = {
    initPreview: function () {
        const t = this.element;
        const i = this.crossOrigin;
        const a = this.options.preview;
        const n = i ? this.crossOriginUrl : this.url;
        const l = t.alt || "The image to preview";
        const o = document.createElement("img");
        if (
            (i && (o.crossOrigin = i),
            (o.src = n),
            (o.alt = l),
            this.viewBox.appendChild(o),
            (this.viewBoxImage = o),
            !!a)
        ) {
            let r = a;
            typeof a === "string"
                ? (r = t.ownerDocument.querySelectorAll(a))
                : a.querySelector && (r = [a]),
                (this.previews = r),
                le(r, function (s) {
                    const p = document.createElement("img");
                    Wt(s, hi, {
                        width: s.offsetWidth,
                        height: s.offsetHeight,
                        html: s.innerHTML,
                    }),
                        i && (p.crossOrigin = i),
                        (p.src = n),
                        (p.alt = l),
                        (p.style.cssText =
                            'display:block;width:100%;height:auto;min-width:0!important;min-height:0!important;max-width:none!important;max-height:none!important;image-orientation:0deg!important;"'),
                        (s.innerHTML = ""),
                        s.appendChild(p);
                });
        }
    },
    resetPreview: function () {
        le(this.previews, function (t) {
            const i = ba(t, hi);
            je(t, { width: i.width, height: i.height }),
                (t.innerHTML = i.html),
                Wp(t, hi);
        });
    },
    preview: function () {
        const t = this.imageData;
        const i = this.canvasData;
        const a = this.cropBoxData;
        const n = a.width;
        const l = a.height;
        const o = t.width;
        const r = t.height;
        const s = a.left - i.left - t.left;
        const p = a.top - i.top - t.top;
        !this.cropped ||
            this.disabled ||
            (je(
                this.viewBoxImage,
                J(
                    { width: o, height: r },
                    Gt(J({ translateX: -s, translateY: -p }, t)),
                ),
            ),
            le(this.previews, function (c) {
                const d = ba(c, hi);
                const m = d.width;
                const u = d.height;
                let g = m;
                let f = u;
                let h = 1;
                n && ((h = m / n), (f = l * h)),
                    l && f > u && ((h = u / l), (g = n * h), (f = u)),
                    je(c, { width: g, height: f }),
                    je(
                        c.getElementsByTagName("img")[0],
                        J(
                            { width: o * h, height: r * h },
                            Gt(
                                J(
                                    { translateX: -s * h, translateY: -p * h },
                                    t,
                                ),
                            ),
                        ),
                    );
            }));
    },
};
const am = {
    bind: function () {
        const t = this.element;
        const i = this.options;
        const a = this.cropper;
        be(i.cropstart) && Se(t, fa, i.cropstart),
            be(i.cropmove) && Se(t, ga, i.cropmove),
            be(i.cropend) && Se(t, ua, i.cropend),
            be(i.crop) && Se(t, ma, i.crop),
            be(i.zoom) && Se(t, ha, i.zoom),
            Se(a, pl, (this.onCropStart = this.cropStart.bind(this))),
            i.zoomable &&
                i.zoomOnWheel &&
                Se(a, hl, (this.onWheel = this.wheel.bind(this)), {
                    passive: !1,
                    capture: !0,
                }),
            i.toggleDragModeOnDblclick &&
                Se(a, dl, (this.onDblclick = this.dblclick.bind(this))),
            Se(
                t.ownerDocument,
                ml,
                (this.onCropMove = this.cropMove.bind(this)),
            ),
            Se(t.ownerDocument, ul, (this.onCropEnd = this.cropEnd.bind(this))),
            i.responsive &&
                Se(window, fl, (this.onResize = this.resize.bind(this)));
    },
    unbind: function () {
        const t = this.element;
        const i = this.options;
        const a = this.cropper;
        be(i.cropstart) && Oe(t, fa, i.cropstart),
            be(i.cropmove) && Oe(t, ga, i.cropmove),
            be(i.cropend) && Oe(t, ua, i.cropend),
            be(i.crop) && Oe(t, ma, i.crop),
            be(i.zoom) && Oe(t, ha, i.zoom),
            Oe(a, pl, this.onCropStart),
            i.zoomable &&
                i.zoomOnWheel &&
                Oe(a, hl, this.onWheel, { passive: !1, capture: !0 }),
            i.toggleDragModeOnDblclick && Oe(a, dl, this.onDblclick),
            Oe(t.ownerDocument, ml, this.onCropMove),
            Oe(t.ownerDocument, ul, this.onCropEnd),
            i.responsive && Oe(window, fl, this.onResize);
    },
};
const nm = {
    resize: function () {
        if (!this.disabled) {
            const t = this.options;
            const i = this.container;
            const a = this.containerData;
            const n = i.offsetWidth / a.width;
            const l = i.offsetHeight / a.height;
            const o = Math.abs(n - 1) > Math.abs(l - 1) ? n : l;
            if (o !== 1) {
                let r, s;
                t.restore &&
                    ((r = this.getCanvasData()), (s = this.getCropBoxData())),
                    this.render(),
                    t.restore &&
                        (this.setCanvasData(
                            le(r, function (p, c) {
                                r[c] = p * o;
                            }),
                        ),
                        this.setCropBoxData(
                            le(s, function (p, c) {
                                s[c] = p * o;
                            }),
                        ));
            }
        }
    },
    dblclick: function () {
        this.disabled ||
            this.options.dragMode === Ml ||
            this.setDragMode(Gp(this.dragBox, da) ? Ll : va);
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
                    ((j(i) && i !== 1) || (j(a) && a !== 0) || t.ctrlKey))
            )
        ) {
            const n = this.options;
            const l = this.pointers;
            let o;
            t.changedTouches
                ? le(t.changedTouches, function (r) {
                      l[r.identifier] = bi(r);
                  })
                : (l[t.pointerId || 0] = bi(t)),
                Object.keys(l).length > 1 && n.zoomable && n.zoomOnTouch
                    ? (o = wl)
                    : (o = ba(t.target, Ut)),
                Pp.test(o) &&
                    yt(this.element, fa, { originalEvent: t, action: o }) !==
                        !1 &&
                    (t.preventDefault(),
                    (this.action = o),
                    (this.cropping = !1),
                    o === Sl && ((this.cropping = !0), de(this.dragBox, Ei)));
        }
    },
    cropMove: function (t) {
        const i = this.action;
        if (!(this.disabled || !i)) {
            const a = this.pointers;
            t.preventDefault(),
                yt(this.element, ga, { originalEvent: t, action: i }) !== !1 &&
                    (t.changedTouches
                        ? le(t.changedTouches, function (n) {
                              J(a[n.identifier] || {}, bi(n, !0));
                          })
                        : J(a[t.pointerId || 0] || {}, bi(t, !0)),
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
                        vt(
                            this.dragBox,
                            Ei,
                            this.cropped && this.options.modal,
                        )),
                    yt(this.element, ua, { originalEvent: t, action: i }));
        }
    },
};
const lm = {
    change: function (t) {
        const i = this.options;
        const a = this.canvasData;
        const n = this.containerData;
        const l = this.cropBoxData;
        const o = this.pointers;
        let r = this.action;
        let s = i.aspectRatio;
        let p = l.left;
        let c = l.top;
        let d = l.width;
        let m = l.height;
        const u = p + d;
        const g = c + m;
        let f = 0;
        let h = 0;
        let I = n.width;
        let b = n.height;
        let T = !0;
        let v;
        !s && t.shiftKey && (s = d && m ? d / m : 1),
            this.limited &&
                ((f = l.minLeft),
                (h = l.minTop),
                (I = f + Math.min(n.width, a.width, a.left + a.width)),
                (b = h + Math.min(n.height, a.height, a.top + a.height)));
        const y = o[Object.keys(o)[0]];
        const E = { x: y.endX - y.startX, y: y.endY - y.startY };
        const _ = function (R) {
            switch (R) {
                case at:
                    u + E.x > I && (E.x = I - u);
                    break;
                case nt:
                    p + E.x < f && (E.x = f - p);
                    break;
                case He:
                    c + E.y < h && (E.y = h - c);
                    break;
                case Tt:
                    g + E.y > b && (E.y = b - g);
                    break;
            }
        };
        switch (r) {
            case Ia:
                (p += E.x), (c += E.y);
                break;
            case at:
                if (E.x >= 0 && (u >= I || (s && (c <= h || g >= b)))) {
                    T = !1;
                    break;
                }
                _(at),
                    (d += E.x),
                    d < 0 && ((r = nt), (d = -d), (p -= d)),
                    s && ((m = d / s), (c += (l.height - m) / 2));
                break;
            case He:
                if (E.y <= 0 && (c <= h || (s && (p <= f || u >= I)))) {
                    T = !1;
                    break;
                }
                _(He),
                    (m -= E.y),
                    (c += E.y),
                    m < 0 && ((r = Tt), (m = -m), (c -= m)),
                    s && ((d = m * s), (p += (l.width - d) / 2));
                break;
            case nt:
                if (E.x <= 0 && (p <= f || (s && (c <= h || g >= b)))) {
                    T = !1;
                    break;
                }
                _(nt),
                    (d -= E.x),
                    (p += E.x),
                    d < 0 && ((r = at), (d = -d), (p -= d)),
                    s && ((m = d / s), (c += (l.height - m) / 2));
                break;
            case Tt:
                if (E.y >= 0 && (g >= b || (s && (p <= f || u >= I)))) {
                    T = !1;
                    break;
                }
                _(Tt),
                    (m += E.y),
                    m < 0 && ((r = He), (m = -m), (c -= m)),
                    s && ((d = m * s), (p += (l.width - d) / 2));
                break;
            case Bt:
                if (s) {
                    if (E.y <= 0 && (c <= h || u >= I)) {
                        T = !1;
                        break;
                    }
                    _(He), (m -= E.y), (c += E.y), (d = m * s);
                } else {
                    _(He),
                        _(at),
                        E.x >= 0
                            ? u < I
                                ? (d += E.x)
                                : E.y <= 0 && c <= h && (T = !1)
                            : (d += E.x),
                        E.y <= 0
                            ? c > h && ((m -= E.y), (c += E.y))
                            : ((m -= E.y), (c += E.y));
                }
                d < 0 && m < 0
                    ? ((r = Vt), (m = -m), (d = -d), (c -= m), (p -= d))
                    : d < 0
                      ? ((r = Nt), (d = -d), (p -= d))
                      : m < 0 && ((r = kt), (m = -m), (c -= m));
                break;
            case Nt:
                if (s) {
                    if (E.y <= 0 && (c <= h || p <= f)) {
                        T = !1;
                        break;
                    }
                    _(He),
                        (m -= E.y),
                        (c += E.y),
                        (d = m * s),
                        (p += l.width - d);
                } else {
                    _(He),
                        _(nt),
                        E.x <= 0
                            ? p > f
                                ? ((d -= E.x), (p += E.x))
                                : E.y <= 0 && c <= h && (T = !1)
                            : ((d -= E.x), (p += E.x)),
                        E.y <= 0
                            ? c > h && ((m -= E.y), (c += E.y))
                            : ((m -= E.y), (c += E.y));
                }
                d < 0 && m < 0
                    ? ((r = kt), (m = -m), (d = -d), (c -= m), (p -= d))
                    : d < 0
                      ? ((r = Bt), (d = -d), (p -= d))
                      : m < 0 && ((r = Vt), (m = -m), (c -= m));
                break;
            case Vt:
                if (s) {
                    if (E.x <= 0 && (p <= f || g >= b)) {
                        T = !1;
                        break;
                    }
                    _(nt), (d -= E.x), (p += E.x), (m = d / s);
                } else {
                    _(Tt),
                        _(nt),
                        E.x <= 0
                            ? p > f
                                ? ((d -= E.x), (p += E.x))
                                : E.y >= 0 && g >= b && (T = !1)
                            : ((d -= E.x), (p += E.x)),
                        E.y >= 0 ? g < b && (m += E.y) : (m += E.y);
                }
                d < 0 && m < 0
                    ? ((r = Bt), (m = -m), (d = -d), (c -= m), (p -= d))
                    : d < 0
                      ? ((r = kt), (d = -d), (p -= d))
                      : m < 0 && ((r = Nt), (m = -m), (c -= m));
                break;
            case kt:
                if (s) {
                    if (E.x >= 0 && (u >= I || g >= b)) {
                        T = !1;
                        break;
                    }
                    _(at), (d += E.x), (m = d / s);
                } else {
                    _(Tt),
                        _(at),
                        E.x >= 0
                            ? u < I
                                ? (d += E.x)
                                : E.y >= 0 && g >= b && (T = !1)
                            : (d += E.x),
                        E.y >= 0 ? g < b && (m += E.y) : (m += E.y);
                }
                d < 0 && m < 0
                    ? ((r = Nt), (m = -m), (d = -d), (c -= m), (p -= d))
                    : d < 0
                      ? ((r = Vt), (d = -d), (p -= d))
                      : m < 0 && ((r = Bt), (m = -m), (c -= m));
                break;
            case _l:
                this.move(E.x, E.y), (T = !1);
                break;
            case wl:
                this.zoom(jp(o), t), (T = !1);
                break;
            case Sl:
                if (!E.x || !E.y) {
                    T = !1;
                    break;
                }
                (v = Dl(this.cropper)),
                    (p = y.startX - v.left),
                    (c = y.startY - v.top),
                    (d = l.minWidth),
                    (m = l.minHeight),
                    E.x > 0
                        ? (r = E.y > 0 ? kt : Bt)
                        : E.x < 0 && ((p -= d), (r = E.y > 0 ? Vt : Nt)),
                    E.y < 0 && (c -= m),
                    this.cropped ||
                        (Fe(this.cropBox, Ee),
                        (this.cropped = !0),
                        this.limited && this.limitCropBox(!0, !0));
                break;
        }
        T &&
            ((l.width = d),
            (l.height = m),
            (l.left = p),
            (l.top = c),
            (this.action = r),
            this.renderCropBox()),
            le(o, function (x) {
                (x.startX = x.endX), (x.startY = x.endY);
            });
    },
};
const om = {
    crop: function () {
        return (
            this.ready &&
                !this.cropped &&
                !this.disabled &&
                ((this.cropped = !0),
                this.limitCropBox(!0, !0),
                this.options.modal && de(this.dragBox, Ei),
                Fe(this.cropBox, Ee),
                this.setCropBoxData(this.initialCropBoxData)),
            this
        );
    },
    reset: function () {
        return (
            this.ready &&
                !this.disabled &&
                ((this.imageData = J({}, this.initialImageData)),
                (this.canvasData = J({}, this.initialCanvasData)),
                (this.cropBoxData = J({}, this.initialCropBoxData)),
                this.renderCanvas(),
                this.cropped && this.renderCropBox()),
            this
        );
    },
    clear: function () {
        return (
            this.cropped &&
                !this.disabled &&
                (J(this.cropBoxData, { left: 0, top: 0, width: 0, height: 0 }),
                (this.cropped = !1),
                this.renderCropBox(),
                this.limitCanvas(!0, !0),
                this.renderCanvas(),
                Fe(this.dragBox, Ei),
                de(this.cropBox, Ee)),
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
                ((this.disabled = !1), Fe(this.cropper, sl)),
            this
        );
    },
    disable: function () {
        return (
            this.ready &&
                !this.disabled &&
                ((this.disabled = !0), de(this.cropper, sl)),
            this
        );
    },
    destroy: function () {
        const t = this.element;
        return t[Z]
            ? ((t[Z] = void 0),
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
        const l = a.top;
        return this.moveTo(
            oa(t) ? t : n + Number(t),
            oa(i) ? i : l + Number(i),
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
                (j(t) && ((a.left = t), (n = !0)),
                j(i) && ((a.top = i), (n = !0)),
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
        const l = this.canvasData;
        const o = l.width;
        const r = l.height;
        const s = l.naturalWidth;
        const p = l.naturalHeight;
        if (
            ((t = Number(t)),
            t >= 0 && this.ready && !this.disabled && n.zoomable)
        ) {
            const c = s * t;
            const d = p * t;
            if (
                yt(this.element, ha, {
                    ratio: t,
                    oldRatio: o / s,
                    originalEvent: a,
                }) === !1
            ) {
                return this;
            }
            if (a) {
                const m = this.pointers;
                const u = Dl(this.cropper);
                const g =
                    m && Object.keys(m).length
                        ? Yp(m)
                        : { pageX: a.pageX, pageY: a.pageY };
                (l.left -= (c - o) * ((g.pageX - u.left - l.left) / o)),
                    (l.top -= (d - r) * ((g.pageY - u.top - l.top) / r));
            } else {
                It(i) && j(i.x) && j(i.y)
                    ? ((l.left -= (c - o) * ((i.x - l.left) / o)),
                      (l.top -= (d - r) * ((i.y - l.top) / r)))
                    : ((l.left -= (c - o) / 2), (l.top -= (d - r) / 2));
            }
            (l.width = c), (l.height = d), this.renderCanvas(!0);
        }
        return this;
    },
    rotate: function (t) {
        return this.rotateTo((this.imageData.rotate || 0) + Number(t));
    },
    rotateTo: function (t) {
        return (
            (t = Number(t)),
            j(t) &&
                this.ready &&
                !this.disabled &&
                this.options.rotatable &&
                ((this.imageData.rotate = t % 360), this.renderCanvas(!0, !0)),
            this
        );
    },
    scaleX: function (t) {
        const i = this.imageData.scaleY;
        return this.scale(t, j(i) ? i : 1);
    },
    scaleY: function (t) {
        const i = this.imageData.scaleX;
        return this.scale(j(i) ? i : 1, t);
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
                (j(t) && ((a.scaleX = t), (n = !0)),
                j(i) && ((a.scaleY = i), (n = !0)),
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
        const l = this.cropBoxData;
        let o;
        if (this.ready && this.cropped) {
            o = {
                x: l.left - n.left,
                y: l.top - n.top,
                width: l.width,
                height: l.height,
            };
            const r = a.width / a.naturalWidth;
            if (
                (le(o, function (c, d) {
                    o[d] = c / r;
                }),
                t)
            ) {
                const s = Math.round(o.y + o.height);
                const p = Math.round(o.x + o.width);
                (o.x = Math.round(o.x)),
                    (o.y = Math.round(o.y)),
                    (o.width = p - o.x),
                    (o.height = s - o.y);
            }
        } else o = { x: 0, y: 0, width: 0, height: 0 };
        return (
            i.rotatable && (o.rotate = a.rotate || 0),
            i.scalable &&
                ((o.scaleX = a.scaleX || 1), (o.scaleY = a.scaleY || 1)),
            o
        );
    },
    setData: function (t) {
        const i = this.options;
        const a = this.imageData;
        const n = this.canvasData;
        const l = {};
        if (this.ready && !this.disabled && It(t)) {
            let o = !1;
            i.rotatable &&
                j(t.rotate) &&
                t.rotate !== a.rotate &&
                ((a.rotate = t.rotate), (o = !0)),
                i.scalable &&
                    (j(t.scaleX) &&
                        t.scaleX !== a.scaleX &&
                        ((a.scaleX = t.scaleX), (o = !0)),
                    j(t.scaleY) &&
                        t.scaleY !== a.scaleY &&
                        ((a.scaleY = t.scaleY), (o = !0))),
                o && this.renderCanvas(!0, !0);
            const r = a.width / a.naturalWidth;
            j(t.x) && (l.left = t.x * r + n.left),
                j(t.y) && (l.top = t.y * r + n.top),
                j(t.width) && (l.width = t.width * r),
                j(t.height) && (l.height = t.height * r),
                this.setCropBoxData(l);
        }
        return this;
    },
    getContainerData: function () {
        return this.ready ? J({}, this.containerData) : {};
    },
    getImageData: function () {
        return this.sized ? J({}, this.imageData) : {};
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
                It(t) &&
                (j(t.left) && (i.left = t.left),
                j(t.top) && (i.top = t.top),
                j(t.width)
                    ? ((i.width = t.width), (i.height = t.width / a))
                    : j(t.height) &&
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
        let l;
        return (
            this.ready &&
                this.cropped &&
                !this.disabled &&
                It(t) &&
                (j(t.left) && (i.left = t.left),
                j(t.top) && (i.top = t.top),
                j(t.width) &&
                    t.width !== i.width &&
                    ((n = !0), (i.width = t.width)),
                j(t.height) &&
                    t.height !== i.height &&
                    ((l = !0), (i.height = t.height)),
                a &&
                    (n
                        ? (i.height = i.width / a)
                        : l && (i.width = i.height * a)),
                this.renderCropBox()),
            this
        );
    },
    getCroppedCanvas: function () {
        const t =
            arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        if (!this.ready || !window.HTMLCanvasElement) return null;
        const i = this.canvasData;
        const a = $p(this.image, this.imageData, i, t);
        if (!this.cropped) return a;
        const n = this.getData(t.rounded);
        let l = n.x;
        let o = n.y;
        let r = n.width;
        let s = n.height;
        const p = a.width / Math.floor(i.naturalWidth);
        p !== 1 && ((l *= p), (o *= p), (r *= p), (s *= p));
        const c = r / s;
        const d = Ye({
            aspectRatio: c,
            width: t.maxWidth || 1 / 0,
            height: t.maxHeight || 1 / 0,
        });
        const m = Ye(
            {
                aspectRatio: c,
                width: t.minWidth || 0,
                height: t.minHeight || 0,
            },
            "cover",
        );
        const u = Ye({
            aspectRatio: c,
            width: t.width || (p !== 1 ? a.width : r),
            height: t.height || (p !== 1 ? a.height : s),
        });
        let g = u.width;
        let f = u.height;
        (g = Math.min(d.width, Math.max(m.width, g))),
            (f = Math.min(d.height, Math.max(m.height, f)));
        const h = document.createElement("canvas");
        const I = h.getContext("2d");
        (h.width = xt(g)),
            (h.height = xt(f)),
            (I.fillStyle = t.fillColor || "transparent"),
            I.fillRect(0, 0, g, f);
        const b = t.imageSmoothingEnabled;
        const T = b === void 0 ? !0 : b;
        const v = t.imageSmoothingQuality;
        (I.imageSmoothingEnabled = T), v && (I.imageSmoothingQuality = v);
        const y = a.width;
        const E = a.height;
        let _ = l;
        let x = o;
        let R;
        let z;
        let P;
        let A;
        let B;
        let w;
        _ <= -r || _ > y
            ? ((_ = 0), (R = 0), (P = 0), (B = 0))
            : _ <= 0
              ? ((P = -_), (_ = 0), (R = Math.min(y, r + _)), (B = R))
              : _ <= y && ((P = 0), (R = Math.min(r, y - _)), (B = R)),
            R <= 0 || x <= -s || x > E
                ? ((x = 0), (z = 0), (A = 0), (w = 0))
                : x <= 0
                  ? ((A = -x), (x = 0), (z = Math.min(E, s + x)), (w = z))
                  : x <= E && ((A = 0), (z = Math.min(s, E - x)), (w = z));
        const O = [_, x, R, z];
        if (B > 0 && w > 0) {
            const S = g / r;
            O.push(P * S, A * S, B * S, w * S);
        }
        return (
            I.drawImage.apply(
                I,
                [a].concat(
                    Rl(
                        O.map(function (L) {
                            return Math.floor(xt(L));
                        }),
                    ),
                ),
            ),
            h
        );
    },
    setAspectRatio: function (t) {
        const i = this.options;
        return (
            !this.disabled &&
                !oa(t) &&
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
            const l = t === va;
            const o = i.movable && t === Ll;
            (t = l || o ? t : Ml),
                (i.dragMode = t),
                Wt(a, Ut, t),
                vt(a, da, l),
                vt(a, pa, o),
                i.cropBoxMovable || (Wt(n, Ut, t), vt(n, da, l), vt(n, pa, o));
        }
        return this;
    },
};
const rm = De.Cropper;
const ya = (function () {
    function e(t) {
        const i =
            arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        if ((Ip(this, e), !t || !Fp.test(t.tagName))) {
            throw new Error(
                "The first argument is required and must be an <img> or <canvas> element.",
            );
        }
        (this.element = t),
            (this.options = J({}, El, It(i) && i)),
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
    return vp(
        e,
        [
            {
                key: "init",
                value: function () {
                    const i = this.element;
                    const a = i.tagName.toLowerCase();
                    let n;
                    if (!i[Z]) {
                        if (((i[Z] = this), a === "img")) {
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
                        const l = this.options;
                        if (
                            (!l.rotatable &&
                                !l.scalable &&
                                (l.checkOrientation = !1),
                            !l.checkOrientation || !window.ArrayBuffer)
                        ) {
                            this.clone();
                            return;
                        }
                        if (zp.test(i)) {
                            Op.test(i) ? this.read(Qp(i)) : this.clone();
                            return;
                        }
                        const o = new XMLHttpRequest();
                        const r = this.clone.bind(this);
                        (this.reloading = !0),
                            (this.xhr = o),
                            (o.onabort = r),
                            (o.onerror = r),
                            (o.ontimeout = r),
                            (o.onprogress = function () {
                                o.getResponseHeader("content-type") !== bl &&
                                    o.abort();
                            }),
                            (o.onload = function () {
                                a.read(o.response);
                            }),
                            (o.onloadend = function () {
                                (a.reloading = !1), (a.xhr = null);
                            }),
                            l.checkCrossOrigin &&
                                Il(i) &&
                                n.crossOrigin &&
                                (i = vl(i)),
                            o.open("GET", i, !0),
                            (o.responseType = "arraybuffer"),
                            (o.withCredentials =
                                n.crossOrigin === "use-credentials"),
                            o.send();
                    }
                },
            },
            {
                key: "read",
                value: function (i) {
                    const a = this.options;
                    const n = this.imageData;
                    const l = Jp(i);
                    let o = 0;
                    let r = 1;
                    let s = 1;
                    if (l > 1) {
                        this.url = Zp(i, bl);
                        const p = em(l);
                        (o = p.rotate), (r = p.scaleX), (s = p.scaleY);
                    }
                    a.rotatable && (n.rotate = o),
                        a.scalable && ((n.scaleX = r), (n.scaleY = s)),
                        this.clone();
                },
            },
            {
                key: "clone",
                value: function () {
                    const i = this.element;
                    const a = this.url;
                    let n = i.crossOrigin;
                    let l = a;
                    this.options.checkCrossOrigin &&
                        Il(a) &&
                        (n || (n = "anonymous"), (l = vl(a))),
                        (this.crossOrigin = n),
                        (this.crossOriginUrl = l);
                    const o = document.createElement("img");
                    n && (o.crossOrigin = n),
                        (o.src = l || a),
                        (o.alt = i.alt || "The image to crop"),
                        (this.image = o),
                        (o.onload = this.start.bind(this)),
                        (o.onerror = this.stop.bind(this)),
                        de(o, cl),
                        i.parentNode.insertBefore(o, i.nextSibling);
                },
            },
            {
                key: "start",
                value: function () {
                    const i = this;
                    const a = this.image;
                    (a.onload = null), (a.onerror = null), (this.sizing = !0);
                    const n =
                        De.navigator &&
                        /(?:iPad|iPhone|iPod).*?AppleWebKit/i.test(
                            De.navigator.userAgent,
                        );
                    const l = function (p, c) {
                        J(i.imageData, {
                            naturalWidth: p,
                            naturalHeight: c,
                            aspectRatio: p / c,
                        }),
                            (i.initialImageData = J({}, i.imageData)),
                            (i.sizing = !1),
                            (i.sized = !0),
                            i.build();
                    };
                    if (a.naturalWidth && !n) {
                        l(a.naturalWidth, a.naturalHeight);
                        return;
                    }
                    const o = document.createElement("img");
                    const r = document.body || document.documentElement;
                    (this.sizingImage = o),
                        (o.onload = function () {
                            l(o.width, o.height), n || r.removeChild(o);
                        }),
                        (o.src = a.src),
                        n ||
                            ((o.style.cssText =
                                "left:0;max-height:none!important;max-width:none!important;min-height:0!important;min-width:0!important;opacity:0;position:absolute;top:0;z-index:-1;"),
                            r.appendChild(o));
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
                        const l = i.parentNode;
                        const o = document.createElement("div");
                        o.innerHTML = Dp;
                        const r = o.querySelector(".".concat(Z, "-container"));
                        const s = r.querySelector(".".concat(Z, "-canvas"));
                        const p = r.querySelector(".".concat(Z, "-drag-box"));
                        const c = r.querySelector(".".concat(Z, "-crop-box"));
                        const d = c.querySelector(".".concat(Z, "-face"));
                        (this.container = l),
                            (this.cropper = r),
                            (this.canvas = s),
                            (this.dragBox = p),
                            (this.cropBox = c),
                            (this.viewBox = r.querySelector(
                                ".".concat(Z, "-view-box"),
                            )),
                            (this.face = d),
                            s.appendChild(n),
                            de(i, Ee),
                            l.insertBefore(r, i.nextSibling),
                            Fe(n, cl),
                            this.initPreview(),
                            this.bind(),
                            (a.initialAspectRatio =
                                Math.max(0, a.initialAspectRatio) || NaN),
                            (a.aspectRatio = Math.max(0, a.aspectRatio) || NaN),
                            (a.viewMode =
                                Math.max(
                                    0,
                                    Math.min(3, Math.round(a.viewMode)),
                                ) || 0),
                            de(c, Ee),
                            a.guides ||
                                de(
                                    c.getElementsByClassName(
                                        "".concat(Z, "-dashed"),
                                    ),
                                    Ee,
                                ),
                            a.center ||
                                de(
                                    c.getElementsByClassName(
                                        "".concat(Z, "-center"),
                                    ),
                                    Ee,
                                ),
                            a.background && de(r, "".concat(Z, "-bg")),
                            a.highlight || de(d, wp),
                            a.cropBoxMovable && (de(d, pa), Wt(d, Ut, Ia)),
                            a.cropBoxResizable ||
                                (de(
                                    c.getElementsByClassName(
                                        "".concat(Z, "-line"),
                                    ),
                                    Ee,
                                ),
                                de(
                                    c.getElementsByClassName(
                                        "".concat(Z, "-point"),
                                    ),
                                    Ee,
                                )),
                            this.render(),
                            (this.ready = !0),
                            this.setDragMode(a.dragMode),
                            a.autoCrop && this.crop(),
                            this.setData(a.data),
                            be(a.ready) && Se(i, gl, a.ready, { once: !0 }),
                            yt(i, gl);
                    }
                },
            },
            {
                key: "unbuild",
                value: function () {
                    if (this.ready) {
                        (this.ready = !1), this.unbind(), this.resetPreview();
                        const i = this.cropper.parentNode;
                        i && i.removeChild(this.cropper), Fe(this.element, Ee);
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
                    return (window.Cropper = rm), e;
                },
            },
            {
                key: "setDefaults",
                value: function (i) {
                    J(El, It(i) && i);
                },
            },
        ],
    );
})();
J(ya.prototype, tm, im, am, nm, lm, om);
const Bl = {
    "application/prs.cww": ["cww"],
    "application/prs.xsf+xml": ["xsf"],
    "application/vnd.1000minds.decision-model+xml": ["1km"],
    "application/vnd.3gpp.pic-bw-large": ["plb"],
    "application/vnd.3gpp.pic-bw-small": ["psb"],
    "application/vnd.3gpp.pic-bw-var": ["pvb"],
    "application/vnd.3gpp2.tcap": ["tcap"],
    "application/vnd.3m.post-it-notes": ["pwn"],
    "application/vnd.accpac.simply.aso": ["aso"],
    "application/vnd.accpac.simply.imp": ["imp"],
    "application/vnd.acucobol": ["acu"],
    "application/vnd.acucorp": ["atc", "acutc"],
    "application/vnd.adobe.air-application-installer-package+zip": ["air"],
    "application/vnd.adobe.formscentral.fcdt": ["fcdt"],
    "application/vnd.adobe.fxp": ["fxp", "fxpl"],
    "application/vnd.adobe.xdp+xml": ["xdp"],
    "application/vnd.adobe.xfdf": ["*xfdf"],
    "application/vnd.age": ["age"],
    "application/vnd.ahead.space": ["ahead"],
    "application/vnd.airzip.filesecure.azf": ["azf"],
    "application/vnd.airzip.filesecure.azs": ["azs"],
    "application/vnd.amazon.ebook": ["azw"],
    "application/vnd.americandynamics.acc": ["acc"],
    "application/vnd.amiga.ami": ["ami"],
    "application/vnd.android.package-archive": ["apk"],
    "application/vnd.anser-web-certificate-issue-initiation": ["cii"],
    "application/vnd.anser-web-funds-transfer-initiation": ["fti"],
    "application/vnd.antix.game-component": ["atx"],
    "application/vnd.apple.installer+xml": ["mpkg"],
    "application/vnd.apple.keynote": ["key"],
    "application/vnd.apple.mpegurl": ["m3u8"],
    "application/vnd.apple.numbers": ["numbers"],
    "application/vnd.apple.pages": ["pages"],
    "application/vnd.apple.pkpass": ["pkpass"],
    "application/vnd.aristanetworks.swi": ["swi"],
    "application/vnd.astraea-software.iota": ["iota"],
    "application/vnd.audiograph": ["aep"],
    "application/vnd.autodesk.fbx": ["fbx"],
    "application/vnd.balsamiq.bmml+xml": ["bmml"],
    "application/vnd.blueice.multipass": ["mpm"],
    "application/vnd.bmi": ["bmi"],
    "application/vnd.businessobjects": ["rep"],
    "application/vnd.chemdraw+xml": ["cdxml"],
    "application/vnd.chipnuts.karaoke-mmd": ["mmd"],
    "application/vnd.cinderella": ["cdy"],
    "application/vnd.citationstyles.style+xml": ["csl"],
    "application/vnd.claymore": ["cla"],
    "application/vnd.cloanto.rp9": ["rp9"],
    "application/vnd.clonk.c4group": ["c4g", "c4d", "c4f", "c4p", "c4u"],
    "application/vnd.cluetrust.cartomobile-config": ["c11amc"],
    "application/vnd.cluetrust.cartomobile-config-pkg": ["c11amz"],
    "application/vnd.commonspace": ["csp"],
    "application/vnd.contact.cmsg": ["cdbcmsg"],
    "application/vnd.cosmocaller": ["cmc"],
    "application/vnd.crick.clicker": ["clkx"],
    "application/vnd.crick.clicker.keyboard": ["clkk"],
    "application/vnd.crick.clicker.palette": ["clkp"],
    "application/vnd.crick.clicker.template": ["clkt"],
    "application/vnd.crick.clicker.wordbank": ["clkw"],
    "application/vnd.criticaltools.wbs+xml": ["wbs"],
    "application/vnd.ctc-posml": ["pml"],
    "application/vnd.cups-ppd": ["ppd"],
    "application/vnd.curl.car": ["car"],
    "application/vnd.curl.pcurl": ["pcurl"],
    "application/vnd.dart": ["dart"],
    "application/vnd.data-vision.rdz": ["rdz"],
    "application/vnd.dbf": ["dbf"],
    "application/vnd.dcmp+xml": ["dcmp"],
    "application/vnd.dece.data": ["uvf", "uvvf", "uvd", "uvvd"],
    "application/vnd.dece.ttml+xml": ["uvt", "uvvt"],
    "application/vnd.dece.unspecified": ["uvx", "uvvx"],
    "application/vnd.dece.zip": ["uvz", "uvvz"],
    "application/vnd.denovo.fcselayout-link": ["fe_launch"],
    "application/vnd.dna": ["dna"],
    "application/vnd.dolby.mlp": ["mlp"],
    "application/vnd.dpgraph": ["dpg"],
    "application/vnd.dreamfactory": ["dfac"],
    "application/vnd.ds-keypoint": ["kpxx"],
    "application/vnd.dvb.ait": ["ait"],
    "application/vnd.dvb.service": ["svc"],
    "application/vnd.dynageo": ["geo"],
    "application/vnd.ecowin.chart": ["mag"],
    "application/vnd.enliven": ["nml"],
    "application/vnd.epson.esf": ["esf"],
    "application/vnd.epson.msf": ["msf"],
    "application/vnd.epson.quickanime": ["qam"],
    "application/vnd.epson.salt": ["slt"],
    "application/vnd.epson.ssf": ["ssf"],
    "application/vnd.eszigno3+xml": ["es3", "et3"],
    "application/vnd.ezpix-album": ["ez2"],
    "application/vnd.ezpix-package": ["ez3"],
    "application/vnd.fdf": ["*fdf"],
    "application/vnd.fdsn.mseed": ["mseed"],
    "application/vnd.fdsn.seed": ["seed", "dataless"],
    "application/vnd.flographit": ["gph"],
    "application/vnd.fluxtime.clip": ["ftc"],
    "application/vnd.framemaker": ["fm", "frame", "maker", "book"],
    "application/vnd.frogans.fnc": ["fnc"],
    "application/vnd.frogans.ltf": ["ltf"],
    "application/vnd.fsc.weblaunch": ["fsc"],
    "application/vnd.fujitsu.oasys": ["oas"],
    "application/vnd.fujitsu.oasys2": ["oa2"],
    "application/vnd.fujitsu.oasys3": ["oa3"],
    "application/vnd.fujitsu.oasysgp": ["fg5"],
    "application/vnd.fujitsu.oasysprs": ["bh2"],
    "application/vnd.fujixerox.ddd": ["ddd"],
    "application/vnd.fujixerox.docuworks": ["xdw"],
    "application/vnd.fujixerox.docuworks.binder": ["xbd"],
    "application/vnd.fuzzysheet": ["fzs"],
    "application/vnd.genomatix.tuxedo": ["txd"],
    "application/vnd.geogebra.file": ["ggb"],
    "application/vnd.geogebra.slides": ["ggs"],
    "application/vnd.geogebra.tool": ["ggt"],
    "application/vnd.geometry-explorer": ["gex", "gre"],
    "application/vnd.geonext": ["gxt"],
    "application/vnd.geoplan": ["g2w"],
    "application/vnd.geospace": ["g3w"],
    "application/vnd.gmx": ["gmx"],
    "application/vnd.google-apps.document": ["gdoc"],
    "application/vnd.google-apps.drawing": ["gdraw"],
    "application/vnd.google-apps.form": ["gform"],
    "application/vnd.google-apps.jam": ["gjam"],
    "application/vnd.google-apps.map": ["gmap"],
    "application/vnd.google-apps.presentation": ["gslides"],
    "application/vnd.google-apps.script": ["gscript"],
    "application/vnd.google-apps.site": ["gsite"],
    "application/vnd.google-apps.spreadsheet": ["gsheet"],
    "application/vnd.google-earth.kml+xml": ["kml"],
    "application/vnd.google-earth.kmz": ["kmz"],
    "application/vnd.gov.sk.xmldatacontainer+xml": ["xdcf"],
    "application/vnd.grafeq": ["gqf", "gqs"],
    "application/vnd.groove-account": ["gac"],
    "application/vnd.groove-help": ["ghf"],
    "application/vnd.groove-identity-message": ["gim"],
    "application/vnd.groove-injector": ["grv"],
    "application/vnd.groove-tool-message": ["gtm"],
    "application/vnd.groove-tool-template": ["tpl"],
    "application/vnd.groove-vcard": ["vcg"],
    "application/vnd.hal+xml": ["hal"],
    "application/vnd.handheld-entertainment+xml": ["zmm"],
    "application/vnd.hbci": ["hbci"],
    "application/vnd.hhe.lesson-player": ["les"],
    "application/vnd.hp-hpgl": ["hpgl"],
    "application/vnd.hp-hpid": ["hpid"],
    "application/vnd.hp-hps": ["hps"],
    "application/vnd.hp-jlyt": ["jlt"],
    "application/vnd.hp-pcl": ["pcl"],
    "application/vnd.hp-pclxl": ["pclxl"],
    "application/vnd.hydrostatix.sof-data": ["sfd-hdstx"],
    "application/vnd.ibm.minipay": ["mpy"],
    "application/vnd.ibm.modcap": ["afp", "listafp", "list3820"],
    "application/vnd.ibm.rights-management": ["irm"],
    "application/vnd.ibm.secure-container": ["sc"],
    "application/vnd.iccprofile": ["icc", "icm"],
    "application/vnd.igloader": ["igl"],
    "application/vnd.immervision-ivp": ["ivp"],
    "application/vnd.immervision-ivu": ["ivu"],
    "application/vnd.insors.igm": ["igm"],
    "application/vnd.intercon.formnet": ["xpw", "xpx"],
    "application/vnd.intergeo": ["i2g"],
    "application/vnd.intu.qbo": ["qbo"],
    "application/vnd.intu.qfx": ["qfx"],
    "application/vnd.ipunplugged.rcprofile": ["rcprofile"],
    "application/vnd.irepository.package+xml": ["irp"],
    "application/vnd.is-xpr": ["xpr"],
    "application/vnd.isac.fcs": ["fcs"],
    "application/vnd.jam": ["jam"],
    "application/vnd.jcp.javame.midlet-rms": ["rms"],
    "application/vnd.jisp": ["jisp"],
    "application/vnd.joost.joda-archive": ["joda"],
    "application/vnd.kahootz": ["ktz", "ktr"],
    "application/vnd.kde.karbon": ["karbon"],
    "application/vnd.kde.kchart": ["chrt"],
    "application/vnd.kde.kformula": ["kfo"],
    "application/vnd.kde.kivio": ["flw"],
    "application/vnd.kde.kontour": ["kon"],
    "application/vnd.kde.kpresenter": ["kpr", "kpt"],
    "application/vnd.kde.kspread": ["ksp"],
    "application/vnd.kde.kword": ["kwd", "kwt"],
    "application/vnd.kenameaapp": ["htke"],
    "application/vnd.kidspiration": ["kia"],
    "application/vnd.kinar": ["kne", "knp"],
    "application/vnd.koan": ["skp", "skd", "skt", "skm"],
    "application/vnd.kodak-descriptor": ["sse"],
    "application/vnd.las.las+xml": ["lasxml"],
    "application/vnd.llamagraphics.life-balance.desktop": ["lbd"],
    "application/vnd.llamagraphics.life-balance.exchange+xml": ["lbe"],
    "application/vnd.lotus-1-2-3": ["123"],
    "application/vnd.lotus-approach": ["apr"],
    "application/vnd.lotus-freelance": ["pre"],
    "application/vnd.lotus-notes": ["nsf"],
    "application/vnd.lotus-organizer": ["org"],
    "application/vnd.lotus-screencam": ["scm"],
    "application/vnd.lotus-wordpro": ["lwp"],
    "application/vnd.macports.portpkg": ["portpkg"],
    "application/vnd.mapbox-vector-tile": ["mvt"],
    "application/vnd.mcd": ["mcd"],
    "application/vnd.medcalcdata": ["mc1"],
    "application/vnd.mediastation.cdkey": ["cdkey"],
    "application/vnd.mfer": ["mwf"],
    "application/vnd.mfmp": ["mfm"],
    "application/vnd.micrografx.flo": ["flo"],
    "application/vnd.micrografx.igx": ["igx"],
    "application/vnd.mif": ["mif"],
    "application/vnd.mobius.daf": ["daf"],
    "application/vnd.mobius.dis": ["dis"],
    "application/vnd.mobius.mbk": ["mbk"],
    "application/vnd.mobius.mqy": ["mqy"],
    "application/vnd.mobius.msl": ["msl"],
    "application/vnd.mobius.plc": ["plc"],
    "application/vnd.mobius.txf": ["txf"],
    "application/vnd.mophun.application": ["mpn"],
    "application/vnd.mophun.certificate": ["mpc"],
    "application/vnd.mozilla.xul+xml": ["xul"],
    "application/vnd.ms-artgalry": ["cil"],
    "application/vnd.ms-cab-compressed": ["cab"],
    "application/vnd.ms-excel": ["xls", "xlm", "xla", "xlc", "xlt", "xlw"],
    "application/vnd.ms-excel.addin.macroenabled.12": ["xlam"],
    "application/vnd.ms-excel.sheet.binary.macroenabled.12": ["xlsb"],
    "application/vnd.ms-excel.sheet.macroenabled.12": ["xlsm"],
    "application/vnd.ms-excel.template.macroenabled.12": ["xltm"],
    "application/vnd.ms-fontobject": ["eot"],
    "application/vnd.ms-htmlhelp": ["chm"],
    "application/vnd.ms-ims": ["ims"],
    "application/vnd.ms-lrm": ["lrm"],
    "application/vnd.ms-officetheme": ["thmx"],
    "application/vnd.ms-outlook": ["msg"],
    "application/vnd.ms-pki.seccat": ["cat"],
    "application/vnd.ms-pki.stl": ["*stl"],
    "application/vnd.ms-powerpoint": ["ppt", "pps", "pot"],
    "application/vnd.ms-powerpoint.addin.macroenabled.12": ["ppam"],
    "application/vnd.ms-powerpoint.presentation.macroenabled.12": ["pptm"],
    "application/vnd.ms-powerpoint.slide.macroenabled.12": ["sldm"],
    "application/vnd.ms-powerpoint.slideshow.macroenabled.12": ["ppsm"],
    "application/vnd.ms-powerpoint.template.macroenabled.12": ["potm"],
    "application/vnd.ms-project": ["*mpp", "mpt"],
    "application/vnd.ms-visio.viewer": ["vdx"],
    "application/vnd.ms-word.document.macroenabled.12": ["docm"],
    "application/vnd.ms-word.template.macroenabled.12": ["dotm"],
    "application/vnd.ms-works": ["wps", "wks", "wcm", "wdb"],
    "application/vnd.ms-wpl": ["wpl"],
    "application/vnd.ms-xpsdocument": ["xps"],
    "application/vnd.mseq": ["mseq"],
    "application/vnd.musician": ["mus"],
    "application/vnd.muvee.style": ["msty"],
    "application/vnd.mynfc": ["taglet"],
    "application/vnd.nato.bindingdataobject+xml": ["bdo"],
    "application/vnd.neurolanguage.nlu": ["nlu"],
    "application/vnd.nitf": ["ntf", "nitf"],
    "application/vnd.noblenet-directory": ["nnd"],
    "application/vnd.noblenet-sealer": ["nns"],
    "application/vnd.noblenet-web": ["nnw"],
    "application/vnd.nokia.n-gage.ac+xml": ["*ac"],
    "application/vnd.nokia.n-gage.data": ["ngdat"],
    "application/vnd.nokia.n-gage.symbian.install": ["n-gage"],
    "application/vnd.nokia.radio-preset": ["rpst"],
    "application/vnd.nokia.radio-presets": ["rpss"],
    "application/vnd.novadigm.edm": ["edm"],
    "application/vnd.novadigm.edx": ["edx"],
    "application/vnd.novadigm.ext": ["ext"],
    "application/vnd.oasis.opendocument.chart": ["odc"],
    "application/vnd.oasis.opendocument.chart-template": ["otc"],
    "application/vnd.oasis.opendocument.database": ["odb"],
    "application/vnd.oasis.opendocument.formula": ["odf"],
    "application/vnd.oasis.opendocument.formula-template": ["odft"],
    "application/vnd.oasis.opendocument.graphics": ["odg"],
    "application/vnd.oasis.opendocument.graphics-template": ["otg"],
    "application/vnd.oasis.opendocument.image": ["odi"],
    "application/vnd.oasis.opendocument.image-template": ["oti"],
    "application/vnd.oasis.opendocument.presentation": ["odp"],
    "application/vnd.oasis.opendocument.presentation-template": ["otp"],
    "application/vnd.oasis.opendocument.spreadsheet": ["ods"],
    "application/vnd.oasis.opendocument.spreadsheet-template": ["ots"],
    "application/vnd.oasis.opendocument.text": ["odt"],
    "application/vnd.oasis.opendocument.text-master": ["odm"],
    "application/vnd.oasis.opendocument.text-template": ["ott"],
    "application/vnd.oasis.opendocument.text-web": ["oth"],
    "application/vnd.olpc-sugar": ["xo"],
    "application/vnd.oma.dd2+xml": ["dd2"],
    "application/vnd.openblox.game+xml": ["obgx"],
    "application/vnd.openofficeorg.extension": ["oxt"],
    "application/vnd.openstreetmap.data+xml": ["osm"],
    "application/vnd.openxmlformats-officedocument.presentationml.presentation":
        ["pptx"],
    "application/vnd.openxmlformats-officedocument.presentationml.slide": [
        "sldx",
    ],
    "application/vnd.openxmlformats-officedocument.presentationml.slideshow": [
        "ppsx",
    ],
    "application/vnd.openxmlformats-officedocument.presentationml.template": [
        "potx",
    ],
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        "xlsx",
    ],
    "application/vnd.openxmlformats-officedocument.spreadsheetml.template": [
        "xltx",
    ],
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
        "docx",
    ],
    "application/vnd.openxmlformats-officedocument.wordprocessingml.template": [
        "dotx",
    ],
    "application/vnd.osgeo.mapguide.package": ["mgp"],
    "application/vnd.osgi.dp": ["dp"],
    "application/vnd.osgi.subsystem": ["esa"],
    "application/vnd.palm": ["pdb", "pqa", "oprc"],
    "application/vnd.pawaafile": ["paw"],
    "application/vnd.pg.format": ["str"],
    "application/vnd.pg.osasli": ["ei6"],
    "application/vnd.picsel": ["efif"],
    "application/vnd.pmi.widget": ["wg"],
    "application/vnd.pocketlearn": ["plf"],
    "application/vnd.powerbuilder6": ["pbd"],
    "application/vnd.previewsystems.box": ["box"],
    "application/vnd.procrate.brushset": ["brushset"],
    "application/vnd.procreate.brush": ["brush"],
    "application/vnd.procreate.dream": ["drm"],
    "application/vnd.proteus.magazine": ["mgz"],
    "application/vnd.publishare-delta-tree": ["qps"],
    "application/vnd.pvi.ptid1": ["ptid"],
    "application/vnd.pwg-xhtml-print+xml": ["xhtm"],
    "application/vnd.quark.quarkxpress": [
        "qxd",
        "qxt",
        "qwd",
        "qwt",
        "qxl",
        "qxb",
    ],
    "application/vnd.rar": ["rar"],
    "application/vnd.realvnc.bed": ["bed"],
    "application/vnd.recordare.musicxml": ["mxl"],
    "application/vnd.recordare.musicxml+xml": ["musicxml"],
    "application/vnd.rig.cryptonote": ["cryptonote"],
    "application/vnd.rim.cod": ["cod"],
    "application/vnd.rn-realmedia": ["rm"],
    "application/vnd.rn-realmedia-vbr": ["rmvb"],
    "application/vnd.route66.link66+xml": ["link66"],
    "application/vnd.sailingtracker.track": ["st"],
    "application/vnd.seemail": ["see"],
    "application/vnd.sema": ["sema"],
    "application/vnd.semd": ["semd"],
    "application/vnd.semf": ["semf"],
    "application/vnd.shana.informed.formdata": ["ifm"],
    "application/vnd.shana.informed.formtemplate": ["itp"],
    "application/vnd.shana.informed.interchange": ["iif"],
    "application/vnd.shana.informed.package": ["ipk"],
    "application/vnd.simtech-mindmapper": ["twd", "twds"],
    "application/vnd.smaf": ["mmf"],
    "application/vnd.smart.teacher": ["teacher"],
    "application/vnd.software602.filler.form+xml": ["fo"],
    "application/vnd.solent.sdkm+xml": ["sdkm", "sdkd"],
    "application/vnd.spotfire.dxp": ["dxp"],
    "application/vnd.spotfire.sfs": ["sfs"],
    "application/vnd.stardivision.calc": ["sdc"],
    "application/vnd.stardivision.draw": ["sda"],
    "application/vnd.stardivision.impress": ["sdd"],
    "application/vnd.stardivision.math": ["smf"],
    "application/vnd.stardivision.writer": ["sdw", "vor"],
    "application/vnd.stardivision.writer-global": ["sgl"],
    "application/vnd.stepmania.package": ["smzip"],
    "application/vnd.stepmania.stepchart": ["sm"],
    "application/vnd.sun.wadl+xml": ["wadl"],
    "application/vnd.sun.xml.calc": ["sxc"],
    "application/vnd.sun.xml.calc.template": ["stc"],
    "application/vnd.sun.xml.draw": ["sxd"],
    "application/vnd.sun.xml.draw.template": ["std"],
    "application/vnd.sun.xml.impress": ["sxi"],
    "application/vnd.sun.xml.impress.template": ["sti"],
    "application/vnd.sun.xml.math": ["sxm"],
    "application/vnd.sun.xml.writer": ["sxw"],
    "application/vnd.sun.xml.writer.global": ["sxg"],
    "application/vnd.sun.xml.writer.template": ["stw"],
    "application/vnd.sus-calendar": ["sus", "susp"],
    "application/vnd.svd": ["svd"],
    "application/vnd.symbian.install": ["sis", "sisx"],
    "application/vnd.syncml+xml": ["xsm"],
    "application/vnd.syncml.dm+wbxml": ["bdm"],
    "application/vnd.syncml.dm+xml": ["xdm"],
    "application/vnd.syncml.dmddf+xml": ["ddf"],
    "application/vnd.tao.intent-module-archive": ["tao"],
    "application/vnd.tcpdump.pcap": ["pcap", "cap", "dmp"],
    "application/vnd.tmobile-livetv": ["tmo"],
    "application/vnd.trid.tpt": ["tpt"],
    "application/vnd.triscape.mxs": ["mxs"],
    "application/vnd.trueapp": ["tra"],
    "application/vnd.ufdl": ["ufd", "ufdl"],
    "application/vnd.uiq.theme": ["utz"],
    "application/vnd.umajin": ["umj"],
    "application/vnd.unity": ["unityweb"],
    "application/vnd.uoml+xml": ["uoml", "uo"],
    "application/vnd.vcx": ["vcx"],
    "application/vnd.visio": ["vsd", "vst", "vss", "vsw", "vsdx", "vtx"],
    "application/vnd.visionary": ["vis"],
    "application/vnd.vsf": ["vsf"],
    "application/vnd.wap.wbxml": ["wbxml"],
    "application/vnd.wap.wmlc": ["wmlc"],
    "application/vnd.wap.wmlscriptc": ["wmlsc"],
    "application/vnd.webturbo": ["wtb"],
    "application/vnd.wolfram.player": ["nbp"],
    "application/vnd.wordperfect": ["wpd"],
    "application/vnd.wqd": ["wqd"],
    "application/vnd.wt.stf": ["stf"],
    "application/vnd.xara": ["xar"],
    "application/vnd.xfdl": ["xfdl"],
    "application/vnd.yamaha.hv-dic": ["hvd"],
    "application/vnd.yamaha.hv-script": ["hvs"],
    "application/vnd.yamaha.hv-voice": ["hvp"],
    "application/vnd.yamaha.openscoreformat": ["osf"],
    "application/vnd.yamaha.openscoreformat.osfpvg+xml": ["osfpvg"],
    "application/vnd.yamaha.smaf-audio": ["saf"],
    "application/vnd.yamaha.smaf-phrase": ["spf"],
    "application/vnd.yellowriver-custom-menu": ["cmp"],
    "application/vnd.zul": ["zir", "zirz"],
    "application/vnd.zzazz.deck+xml": ["zaz"],
    "application/x-7z-compressed": ["7z"],
    "application/x-abiword": ["abw"],
    "application/x-ace-compressed": ["ace"],
    "application/x-apple-diskimage": ["*dmg"],
    "application/x-arj": ["arj"],
    "application/x-authorware-bin": ["aab", "x32", "u32", "vox"],
    "application/x-authorware-map": ["aam"],
    "application/x-authorware-seg": ["aas"],
    "application/x-bcpio": ["bcpio"],
    "application/x-bdoc": ["*bdoc"],
    "application/x-bittorrent": ["torrent"],
    "application/x-blender": ["blend"],
    "application/x-blorb": ["blb", "blorb"],
    "application/x-bzip": ["bz"],
    "application/x-bzip2": ["bz2", "boz"],
    "application/x-cbr": ["cbr", "cba", "cbt", "cbz", "cb7"],
    "application/x-cdlink": ["vcd"],
    "application/x-cfs-compressed": ["cfs"],
    "application/x-chat": ["chat"],
    "application/x-chess-pgn": ["pgn"],
    "application/x-chrome-extension": ["crx"],
    "application/x-cocoa": ["cco"],
    "application/x-compressed": ["*rar"],
    "application/x-conference": ["nsc"],
    "application/x-cpio": ["cpio"],
    "application/x-csh": ["csh"],
    "application/x-debian-package": ["*deb", "udeb"],
    "application/x-dgc-compressed": ["dgc"],
    "application/x-director": [
        "dir",
        "dcr",
        "dxr",
        "cst",
        "cct",
        "cxt",
        "w3d",
        "fgd",
        "swa",
    ],
    "application/x-doom": ["wad"],
    "application/x-dtbncx+xml": ["ncx"],
    "application/x-dtbook+xml": ["dtb"],
    "application/x-dtbresource+xml": ["res"],
    "application/x-dvi": ["dvi"],
    "application/x-envoy": ["evy"],
    "application/x-eva": ["eva"],
    "application/x-font-bdf": ["bdf"],
    "application/x-font-ghostscript": ["gsf"],
    "application/x-font-linux-psf": ["psf"],
    "application/x-font-pcf": ["pcf"],
    "application/x-font-snf": ["snf"],
    "application/x-font-type1": ["pfa", "pfb", "pfm", "afm"],
    "application/x-freearc": ["arc"],
    "application/x-futuresplash": ["spl"],
    "application/x-gca-compressed": ["gca"],
    "application/x-glulx": ["ulx"],
    "application/x-gnumeric": ["gnumeric"],
    "application/x-gramps-xml": ["gramps"],
    "application/x-gtar": ["gtar"],
    "application/x-hdf": ["hdf"],
    "application/x-httpd-php": ["php"],
    "application/x-install-instructions": ["install"],
    "application/x-ipynb+json": ["ipynb"],
    "application/x-iso9660-image": ["*iso"],
    "application/x-iwork-keynote-sffkey": ["*key"],
    "application/x-iwork-numbers-sffnumbers": ["*numbers"],
    "application/x-iwork-pages-sffpages": ["*pages"],
    "application/x-java-archive-diff": ["jardiff"],
    "application/x-java-jnlp-file": ["jnlp"],
    "application/x-keepass2": ["kdbx"],
    "application/x-latex": ["latex"],
    "application/x-lua-bytecode": ["luac"],
    "application/x-lzh-compressed": ["lzh", "lha"],
    "application/x-makeself": ["run"],
    "application/x-mie": ["mie"],
    "application/x-mobipocket-ebook": ["*prc", "mobi"],
    "application/x-ms-application": ["application"],
    "application/x-ms-shortcut": ["lnk"],
    "application/x-ms-wmd": ["wmd"],
    "application/x-ms-wmz": ["wmz"],
    "application/x-ms-xbap": ["xbap"],
    "application/x-msaccess": ["mdb"],
    "application/x-msbinder": ["obd"],
    "application/x-mscardfile": ["crd"],
    "application/x-msclip": ["clp"],
    "application/x-msdos-program": ["*exe"],
    "application/x-msdownload": ["*exe", "*dll", "com", "bat", "*msi"],
    "application/x-msmediaview": ["mvb", "m13", "m14"],
    "application/x-msmetafile": ["*wmf", "*wmz", "*emf", "emz"],
    "application/x-msmoney": ["mny"],
    "application/x-mspublisher": ["pub"],
    "application/x-msschedule": ["scd"],
    "application/x-msterminal": ["trm"],
    "application/x-mswrite": ["wri"],
    "application/x-netcdf": ["nc", "cdf"],
    "application/x-ns-proxy-autoconfig": ["pac"],
    "application/x-nzb": ["nzb"],
    "application/x-perl": ["pl", "pm"],
    "application/x-pilot": ["*prc", "*pdb"],
    "application/x-pkcs12": ["p12", "pfx"],
    "application/x-pkcs7-certificates": ["p7b", "spc"],
    "application/x-pkcs7-certreqresp": ["p7r"],
    "application/x-rar-compressed": ["*rar"],
    "application/x-redhat-package-manager": ["rpm"],
    "application/x-research-info-systems": ["ris"],
    "application/x-sea": ["sea"],
    "application/x-sh": ["sh"],
    "application/x-shar": ["shar"],
    "application/x-shockwave-flash": ["swf"],
    "application/x-silverlight-app": ["xap"],
    "application/x-sql": ["*sql"],
    "application/x-stuffit": ["sit"],
    "application/x-stuffitx": ["sitx"],
    "application/x-subrip": ["srt"],
    "application/x-sv4cpio": ["sv4cpio"],
    "application/x-sv4crc": ["sv4crc"],
    "application/x-t3vm-image": ["t3"],
    "application/x-tads": ["gam"],
    "application/x-tar": ["tar"],
    "application/x-tcl": ["tcl", "tk"],
    "application/x-tex": ["tex"],
    "application/x-tex-tfm": ["tfm"],
    "application/x-texinfo": ["texinfo", "texi"],
    "application/x-tgif": ["*obj"],
    "application/x-ustar": ["ustar"],
    "application/x-virtualbox-hdd": ["hdd"],
    "application/x-virtualbox-ova": ["ova"],
    "application/x-virtualbox-ovf": ["ovf"],
    "application/x-virtualbox-vbox": ["vbox"],
    "application/x-virtualbox-vbox-extpack": ["vbox-extpack"],
    "application/x-virtualbox-vdi": ["vdi"],
    "application/x-virtualbox-vhd": ["vhd"],
    "application/x-virtualbox-vmdk": ["vmdk"],
    "application/x-wais-source": ["src"],
    "application/x-web-app-manifest+json": ["webapp"],
    "application/x-x509-ca-cert": ["der", "crt", "pem"],
    "application/x-xfig": ["fig"],
    "application/x-xliff+xml": ["*xlf"],
    "application/x-xpinstall": ["xpi"],
    "application/x-xz": ["xz"],
    "application/x-zip-compressed": ["*zip"],
    "application/x-zmachine": ["z1", "z2", "z3", "z4", "z5", "z6", "z7", "z8"],
    "audio/vnd.dece.audio": ["uva", "uvva"],
    "audio/vnd.digital-winds": ["eol"],
    "audio/vnd.dra": ["dra"],
    "audio/vnd.dts": ["dts"],
    "audio/vnd.dts.hd": ["dtshd"],
    "audio/vnd.lucent.voice": ["lvp"],
    "audio/vnd.ms-playready.media.pya": ["pya"],
    "audio/vnd.nuera.ecelp4800": ["ecelp4800"],
    "audio/vnd.nuera.ecelp7470": ["ecelp7470"],
    "audio/vnd.nuera.ecelp9600": ["ecelp9600"],
    "audio/vnd.rip": ["rip"],
    "audio/x-aac": ["*aac"],
    "audio/x-aiff": ["aif", "aiff", "aifc"],
    "audio/x-caf": ["caf"],
    "audio/x-flac": ["flac"],
    "audio/x-m4a": ["*m4a"],
    "audio/x-matroska": ["mka"],
    "audio/x-mpegurl": ["m3u"],
    "audio/x-ms-wax": ["wax"],
    "audio/x-ms-wma": ["wma"],
    "audio/x-pn-realaudio": ["ram", "ra"],
    "audio/x-pn-realaudio-plugin": ["rmp"],
    "audio/x-realaudio": ["*ra"],
    "audio/x-wav": ["*wav"],
    "chemical/x-cdx": ["cdx"],
    "chemical/x-cif": ["cif"],
    "chemical/x-cmdf": ["cmdf"],
    "chemical/x-cml": ["cml"],
    "chemical/x-csml": ["csml"],
    "chemical/x-xyz": ["xyz"],
    "image/prs.btif": ["btif", "btf"],
    "image/prs.pti": ["pti"],
    "image/vnd.adobe.photoshop": ["psd"],
    "image/vnd.airzip.accelerator.azv": ["azv"],
    "image/vnd.dece.graphic": ["uvi", "uvvi", "uvg", "uvvg"],
    "image/vnd.djvu": ["djvu", "djv"],
    "image/vnd.dvb.subtitle": ["*sub"],
    "image/vnd.dwg": ["dwg"],
    "image/vnd.dxf": ["dxf"],
    "image/vnd.fastbidsheet": ["fbs"],
    "image/vnd.fpx": ["fpx"],
    "image/vnd.fst": ["fst"],
    "image/vnd.fujixerox.edmics-mmr": ["mmr"],
    "image/vnd.fujixerox.edmics-rlc": ["rlc"],
    "image/vnd.microsoft.icon": ["ico"],
    "image/vnd.ms-dds": ["dds"],
    "image/vnd.ms-modi": ["mdi"],
    "image/vnd.ms-photo": ["wdp"],
    "image/vnd.net-fpx": ["npx"],
    "image/vnd.pco.b16": ["b16"],
    "image/vnd.tencent.tap": ["tap"],
    "image/vnd.valve.source.texture": ["vtf"],
    "image/vnd.wap.wbmp": ["wbmp"],
    "image/vnd.xiff": ["xif"],
    "image/vnd.zbrush.pcx": ["pcx"],
    "image/x-3ds": ["3ds"],
    "image/x-adobe-dng": ["dng"],
    "image/x-cmu-raster": ["ras"],
    "image/x-cmx": ["cmx"],
    "image/x-freehand": ["fh", "fhc", "fh4", "fh5", "fh7"],
    "image/x-icon": ["*ico"],
    "image/x-jng": ["jng"],
    "image/x-mrsid-image": ["sid"],
    "image/x-ms-bmp": ["*bmp"],
    "image/x-pcx": ["*pcx"],
    "image/x-pict": ["pic", "pct"],
    "image/x-portable-anymap": ["pnm"],
    "image/x-portable-bitmap": ["pbm"],
    "image/x-portable-graymap": ["pgm"],
    "image/x-portable-pixmap": ["ppm"],
    "image/x-rgb": ["rgb"],
    "image/x-tga": ["tga"],
    "image/x-xbitmap": ["xbm"],
    "image/x-xpixmap": ["xpm"],
    "image/x-xwindowdump": ["xwd"],
    "message/vnd.wfa.wsc": ["wsc"],
    "model/vnd.bary": ["bary"],
    "model/vnd.cld": ["cld"],
    "model/vnd.collada+xml": ["dae"],
    "model/vnd.dwf": ["dwf"],
    "model/vnd.gdl": ["gdl"],
    "model/vnd.gtw": ["gtw"],
    "model/vnd.mts": ["*mts"],
    "model/vnd.opengex": ["ogex"],
    "model/vnd.parasolid.transmit.binary": ["x_b"],
    "model/vnd.parasolid.transmit.text": ["x_t"],
    "model/vnd.pytha.pyox": ["pyo", "pyox"],
    "model/vnd.sap.vds": ["vds"],
    "model/vnd.usda": ["usda"],
    "model/vnd.usdz+zip": ["usdz"],
    "model/vnd.valve.source.compiled-map": ["bsp"],
    "model/vnd.vtu": ["vtu"],
    "text/prs.lines.tag": ["dsc"],
    "text/vnd.curl": ["curl"],
    "text/vnd.curl.dcurl": ["dcurl"],
    "text/vnd.curl.mcurl": ["mcurl"],
    "text/vnd.curl.scurl": ["scurl"],
    "text/vnd.dvb.subtitle": ["sub"],
    "text/vnd.familysearch.gedcom": ["ged"],
    "text/vnd.fly": ["fly"],
    "text/vnd.fmi.flexstor": ["flx"],
    "text/vnd.graphviz": ["gv"],
    "text/vnd.in3d.3dml": ["3dml"],
    "text/vnd.in3d.spot": ["spot"],
    "text/vnd.sun.j2me.app-descriptor": ["jad"],
    "text/vnd.wap.wml": ["wml"],
    "text/vnd.wap.wmlscript": ["wmls"],
    "text/x-asm": ["s", "asm"],
    "text/x-c": ["c", "cc", "cxx", "cpp", "h", "hh", "dic"],
    "text/x-component": ["htc"],
    "text/x-fortran": ["f", "for", "f77", "f90"],
    "text/x-handlebars-template": ["hbs"],
    "text/x-java-source": ["java"],
    "text/x-lua": ["lua"],
    "text/x-markdown": ["mkd"],
    "text/x-nfo": ["nfo"],
    "text/x-opml": ["opml"],
    "text/x-org": ["*org"],
    "text/x-pascal": ["p", "pas"],
    "text/x-processing": ["pde"],
    "text/x-sass": ["sass"],
    "text/x-scss": ["scss"],
    "text/x-setext": ["etx"],
    "text/x-sfv": ["sfv"],
    "text/x-suse-ymp": ["ymp"],
    "text/x-uuencode": ["uu"],
    "text/x-vcalendar": ["vcs"],
    "text/x-vcard": ["vcf"],
    "video/vnd.dece.hd": ["uvh", "uvvh"],
    "video/vnd.dece.mobile": ["uvm", "uvvm"],
    "video/vnd.dece.pd": ["uvp", "uvvp"],
    "video/vnd.dece.sd": ["uvs", "uvvs"],
    "video/vnd.dece.video": ["uvv", "uvvv"],
    "video/vnd.dvb.file": ["dvb"],
    "video/vnd.fvt": ["fvt"],
    "video/vnd.mpegurl": ["mxu", "m4u"],
    "video/vnd.ms-playready.media.pyv": ["pyv"],
    "video/vnd.uvvu.mp4": ["uvu", "uvvu"],
    "video/vnd.vivo": ["viv"],
    "video/x-f4v": ["f4v"],
    "video/x-fli": ["fli"],
    "video/x-flv": ["flv"],
    "video/x-m4v": ["m4v"],
    "video/x-matroska": ["mkv", "mk3d", "mks"],
    "video/x-mng": ["mng"],
    "video/x-ms-asf": ["asf", "asx"],
    "video/x-ms-vob": ["vob"],
    "video/x-ms-wm": ["wm"],
    "video/x-ms-wmv": ["wmv"],
    "video/x-ms-wmx": ["wmx"],
    "video/x-ms-wvx": ["wvx"],
    "video/x-msvideo": ["avi"],
    "video/x-sgi-movie": ["movie"],
    "video/x-smv": ["smv"],
    "x-conference/x-cooltalk": ["ice"],
};
Object.freeze(Bl);
const Nl = Bl;
const kl = {
    "application/andrew-inset": ["ez"],
    "application/appinstaller": ["appinstaller"],
    "application/applixware": ["aw"],
    "application/appx": ["appx"],
    "application/appxbundle": ["appxbundle"],
    "application/atom+xml": ["atom"],
    "application/atomcat+xml": ["atomcat"],
    "application/atomdeleted+xml": ["atomdeleted"],
    "application/atomsvc+xml": ["atomsvc"],
    "application/atsc-dwd+xml": ["dwd"],
    "application/atsc-held+xml": ["held"],
    "application/atsc-rsat+xml": ["rsat"],
    "application/automationml-aml+xml": ["aml"],
    "application/automationml-amlx+zip": ["amlx"],
    "application/bdoc": ["bdoc"],
    "application/calendar+xml": ["xcs"],
    "application/ccxml+xml": ["ccxml"],
    "application/cdfx+xml": ["cdfx"],
    "application/cdmi-capability": ["cdmia"],
    "application/cdmi-container": ["cdmic"],
    "application/cdmi-domain": ["cdmid"],
    "application/cdmi-object": ["cdmio"],
    "application/cdmi-queue": ["cdmiq"],
    "application/cpl+xml": ["cpl"],
    "application/cu-seeme": ["cu"],
    "application/cwl": ["cwl"],
    "application/dash+xml": ["mpd"],
    "application/dash-patch+xml": ["mpp"],
    "application/davmount+xml": ["davmount"],
    "application/dicom": ["dcm"],
    "application/docbook+xml": ["dbk"],
    "application/dssc+der": ["dssc"],
    "application/dssc+xml": ["xdssc"],
    "application/ecmascript": ["ecma"],
    "application/emma+xml": ["emma"],
    "application/emotionml+xml": ["emotionml"],
    "application/epub+zip": ["epub"],
    "application/exi": ["exi"],
    "application/express": ["exp"],
    "application/fdf": ["fdf"],
    "application/fdt+xml": ["fdt"],
    "application/font-tdpfr": ["pfr"],
    "application/geo+json": ["geojson"],
    "application/gml+xml": ["gml"],
    "application/gpx+xml": ["gpx"],
    "application/gxf": ["gxf"],
    "application/gzip": ["gz"],
    "application/hjson": ["hjson"],
    "application/hyperstudio": ["stk"],
    "application/inkml+xml": ["ink", "inkml"],
    "application/ipfix": ["ipfix"],
    "application/its+xml": ["its"],
    "application/java-archive": ["jar", "war", "ear"],
    "application/java-serialized-object": ["ser"],
    "application/java-vm": ["class"],
    "application/javascript": ["*js"],
    "application/json": ["json", "map"],
    "application/json5": ["json5"],
    "application/jsonml+json": ["jsonml"],
    "application/ld+json": ["jsonld"],
    "application/lgr+xml": ["lgr"],
    "application/lost+xml": ["lostxml"],
    "application/mac-binhex40": ["hqx"],
    "application/mac-compactpro": ["cpt"],
    "application/mads+xml": ["mads"],
    "application/manifest+json": ["webmanifest"],
    "application/marc": ["mrc"],
    "application/marcxml+xml": ["mrcx"],
    "application/mathematica": ["ma", "nb", "mb"],
    "application/mathml+xml": ["mathml"],
    "application/mbox": ["mbox"],
    "application/media-policy-dataset+xml": ["mpf"],
    "application/mediaservercontrol+xml": ["mscml"],
    "application/metalink+xml": ["metalink"],
    "application/metalink4+xml": ["meta4"],
    "application/mets+xml": ["mets"],
    "application/mmt-aei+xml": ["maei"],
    "application/mmt-usd+xml": ["musd"],
    "application/mods+xml": ["mods"],
    "application/mp21": ["m21", "mp21"],
    "application/mp4": ["*mp4", "*mpg4", "mp4s", "m4p"],
    "application/msix": ["msix"],
    "application/msixbundle": ["msixbundle"],
    "application/msword": ["doc", "dot"],
    "application/mxf": ["mxf"],
    "application/n-quads": ["nq"],
    "application/n-triples": ["nt"],
    "application/node": ["cjs"],
    "application/octet-stream": [
        "bin",
        "dms",
        "lrf",
        "mar",
        "so",
        "dist",
        "distz",
        "pkg",
        "bpk",
        "dump",
        "elc",
        "deploy",
        "exe",
        "dll",
        "deb",
        "dmg",
        "iso",
        "img",
        "msi",
        "msp",
        "msm",
        "buffer",
    ],
    "application/oda": ["oda"],
    "application/oebps-package+xml": ["opf"],
    "application/ogg": ["ogx"],
    "application/omdoc+xml": ["omdoc"],
    "application/onenote": [
        "onetoc",
        "onetoc2",
        "onetmp",
        "onepkg",
        "one",
        "onea",
    ],
    "application/oxps": ["oxps"],
    "application/p2p-overlay+xml": ["relo"],
    "application/patch-ops-error+xml": ["xer"],
    "application/pdf": ["pdf"],
    "application/pgp-encrypted": ["pgp"],
    "application/pgp-keys": ["asc"],
    "application/pgp-signature": ["sig", "*asc"],
    "application/pics-rules": ["prf"],
    "application/pkcs10": ["p10"],
    "application/pkcs7-mime": ["p7m", "p7c"],
    "application/pkcs7-signature": ["p7s"],
    "application/pkcs8": ["p8"],
    "application/pkix-attr-cert": ["ac"],
    "application/pkix-cert": ["cer"],
    "application/pkix-crl": ["crl"],
    "application/pkix-pkipath": ["pkipath"],
    "application/pkixcmp": ["pki"],
    "application/pls+xml": ["pls"],
    "application/postscript": ["ai", "eps", "ps"],
    "application/provenance+xml": ["provx"],
    "application/pskc+xml": ["pskcxml"],
    "application/raml+yaml": ["raml"],
    "application/rdf+xml": ["rdf", "owl"],
    "application/reginfo+xml": ["rif"],
    "application/relax-ng-compact-syntax": ["rnc"],
    "application/resource-lists+xml": ["rl"],
    "application/resource-lists-diff+xml": ["rld"],
    "application/rls-services+xml": ["rs"],
    "application/route-apd+xml": ["rapd"],
    "application/route-s-tsid+xml": ["sls"],
    "application/route-usd+xml": ["rusd"],
    "application/rpki-ghostbusters": ["gbr"],
    "application/rpki-manifest": ["mft"],
    "application/rpki-roa": ["roa"],
    "application/rsd+xml": ["rsd"],
    "application/rss+xml": ["rss"],
    "application/rtf": ["rtf"],
    "application/sbml+xml": ["sbml"],
    "application/scvp-cv-request": ["scq"],
    "application/scvp-cv-response": ["scs"],
    "application/scvp-vp-request": ["spq"],
    "application/scvp-vp-response": ["spp"],
    "application/sdp": ["sdp"],
    "application/senml+xml": ["senmlx"],
    "application/sensml+xml": ["sensmlx"],
    "application/set-payment-initiation": ["setpay"],
    "application/set-registration-initiation": ["setreg"],
    "application/shf+xml": ["shf"],
    "application/sieve": ["siv", "sieve"],
    "application/smil+xml": ["smi", "smil"],
    "application/sparql-query": ["rq"],
    "application/sparql-results+xml": ["srx"],
    "application/sql": ["sql"],
    "application/srgs": ["gram"],
    "application/srgs+xml": ["grxml"],
    "application/sru+xml": ["sru"],
    "application/ssdl+xml": ["ssdl"],
    "application/ssml+xml": ["ssml"],
    "application/swid+xml": ["swidtag"],
    "application/tei+xml": ["tei", "teicorpus"],
    "application/thraud+xml": ["tfi"],
    "application/timestamped-data": ["tsd"],
    "application/toml": ["toml"],
    "application/trig": ["trig"],
    "application/ttml+xml": ["ttml"],
    "application/ubjson": ["ubj"],
    "application/urc-ressheet+xml": ["rsheet"],
    "application/urc-targetdesc+xml": ["td"],
    "application/voicexml+xml": ["vxml"],
    "application/wasm": ["wasm"],
    "application/watcherinfo+xml": ["wif"],
    "application/widget": ["wgt"],
    "application/winhlp": ["hlp"],
    "application/wsdl+xml": ["wsdl"],
    "application/wspolicy+xml": ["wspolicy"],
    "application/xaml+xml": ["xaml"],
    "application/xcap-att+xml": ["xav"],
    "application/xcap-caps+xml": ["xca"],
    "application/xcap-diff+xml": ["xdf"],
    "application/xcap-el+xml": ["xel"],
    "application/xcap-ns+xml": ["xns"],
    "application/xenc+xml": ["xenc"],
    "application/xfdf": ["xfdf"],
    "application/xhtml+xml": ["xhtml", "xht"],
    "application/xliff+xml": ["xlf"],
    "application/xml": ["xml", "xsl", "xsd", "rng"],
    "application/xml-dtd": ["dtd"],
    "application/xop+xml": ["xop"],
    "application/xproc+xml": ["xpl"],
    "application/xslt+xml": ["*xsl", "xslt"],
    "application/xspf+xml": ["xspf"],
    "application/xv+xml": ["mxml", "xhvml", "xvml", "xvm"],
    "application/yang": ["yang"],
    "application/yin+xml": ["yin"],
    "application/zip": ["zip"],
    "application/zip+dotlottie": ["lottie"],
    "audio/3gpp": ["*3gpp"],
    "audio/aac": ["adts", "aac"],
    "audio/adpcm": ["adp"],
    "audio/amr": ["amr"],
    "audio/basic": ["au", "snd"],
    "audio/midi": ["mid", "midi", "kar", "rmi"],
    "audio/mobile-xmf": ["mxmf"],
    "audio/mp3": ["*mp3"],
    "audio/mp4": ["m4a", "mp4a", "m4b"],
    "audio/mpeg": ["mpga", "mp2", "mp2a", "mp3", "m2a", "m3a"],
    "audio/ogg": ["oga", "ogg", "spx", "opus"],
    "audio/s3m": ["s3m"],
    "audio/silk": ["sil"],
    "audio/wav": ["wav"],
    "audio/wave": ["*wav"],
    "audio/webm": ["weba"],
    "audio/xm": ["xm"],
    "font/collection": ["ttc"],
    "font/otf": ["otf"],
    "font/ttf": ["ttf"],
    "font/woff": ["woff"],
    "font/woff2": ["woff2"],
    "image/aces": ["exr"],
    "image/apng": ["apng"],
    "image/avci": ["avci"],
    "image/avcs": ["avcs"],
    "image/avif": ["avif"],
    "image/bmp": ["bmp", "dib"],
    "image/cgm": ["cgm"],
    "image/dicom-rle": ["drle"],
    "image/dpx": ["dpx"],
    "image/emf": ["emf"],
    "image/fits": ["fits"],
    "image/g3fax": ["g3"],
    "image/gif": ["gif"],
    "image/heic": ["heic"],
    "image/heic-sequence": ["heics"],
    "image/heif": ["heif"],
    "image/heif-sequence": ["heifs"],
    "image/hej2k": ["hej2"],
    "image/ief": ["ief"],
    "image/jaii": ["jaii"],
    "image/jais": ["jais"],
    "image/jls": ["jls"],
    "image/jp2": ["jp2", "jpg2"],
    "image/jpeg": ["jpg", "jpeg", "jpe"],
    "image/jph": ["jph"],
    "image/jphc": ["jhc"],
    "image/jpm": ["jpm", "jpgm"],
    "image/jpx": ["jpx", "jpf"],
    "image/jxl": ["jxl"],
    "image/jxr": ["jxr"],
    "image/jxra": ["jxra"],
    "image/jxrs": ["jxrs"],
    "image/jxs": ["jxs"],
    "image/jxsc": ["jxsc"],
    "image/jxsi": ["jxsi"],
    "image/jxss": ["jxss"],
    "image/ktx": ["ktx"],
    "image/ktx2": ["ktx2"],
    "image/pjpeg": ["jfif"],
    "image/png": ["png"],
    "image/sgi": ["sgi"],
    "image/svg+xml": ["svg", "svgz"],
    "image/t38": ["t38"],
    "image/tiff": ["tif", "tiff"],
    "image/tiff-fx": ["tfx"],
    "image/webp": ["webp"],
    "image/wmf": ["wmf"],
    "message/disposition-notification": ["disposition-notification"],
    "message/global": ["u8msg"],
    "message/global-delivery-status": ["u8dsn"],
    "message/global-disposition-notification": ["u8mdn"],
    "message/global-headers": ["u8hdr"],
    "message/rfc822": ["eml", "mime", "mht", "mhtml"],
    "model/3mf": ["3mf"],
    "model/gltf+json": ["gltf"],
    "model/gltf-binary": ["glb"],
    "model/iges": ["igs", "iges"],
    "model/jt": ["jt"],
    "model/mesh": ["msh", "mesh", "silo"],
    "model/mtl": ["mtl"],
    "model/obj": ["obj"],
    "model/prc": ["prc"],
    "model/step": ["step", "stp", "stpnc", "p21", "210"],
    "model/step+xml": ["stpx"],
    "model/step+zip": ["stpz"],
    "model/step-xml+zip": ["stpxz"],
    "model/stl": ["stl"],
    "model/u3d": ["u3d"],
    "model/vrml": ["wrl", "vrml"],
    "model/x3d+binary": ["*x3db", "x3dbz"],
    "model/x3d+fastinfoset": ["x3db"],
    "model/x3d+vrml": ["*x3dv", "x3dvz"],
    "model/x3d+xml": ["x3d", "x3dz"],
    "model/x3d-vrml": ["x3dv"],
    "text/cache-manifest": ["appcache", "manifest"],
    "text/calendar": ["ics", "ifb"],
    "text/coffeescript": ["coffee", "litcoffee"],
    "text/css": ["css"],
    "text/csv": ["csv"],
    "text/html": ["html", "htm", "shtml"],
    "text/jade": ["jade"],
    "text/javascript": ["js", "mjs"],
    "text/jsx": ["jsx"],
    "text/less": ["less"],
    "text/markdown": ["md", "markdown"],
    "text/mathml": ["mml"],
    "text/mdx": ["mdx"],
    "text/n3": ["n3"],
    "text/plain": ["txt", "text", "conf", "def", "list", "log", "in", "ini"],
    "text/richtext": ["rtx"],
    "text/rtf": ["*rtf"],
    "text/sgml": ["sgml", "sgm"],
    "text/shex": ["shex"],
    "text/slim": ["slim", "slm"],
    "text/spdx": ["spdx"],
    "text/stylus": ["stylus", "styl"],
    "text/tab-separated-values": ["tsv"],
    "text/troff": ["t", "tr", "roff", "man", "me", "ms"],
    "text/turtle": ["ttl"],
    "text/uri-list": ["uri", "uris", "urls"],
    "text/vcard": ["vcard"],
    "text/vtt": ["vtt"],
    "text/wgsl": ["wgsl"],
    "text/xml": ["*xml"],
    "text/yaml": ["yaml", "yml"],
    "video/3gpp": ["3gp", "3gpp"],
    "video/3gpp2": ["3g2"],
    "video/h261": ["h261"],
    "video/h263": ["h263"],
    "video/h264": ["h264"],
    "video/iso.segment": ["m4s"],
    "video/jpeg": ["jpgv"],
    "video/jpm": ["*jpm", "*jpgm"],
    "video/mj2": ["mj2", "mjp2"],
    "video/mp2t": ["ts", "m2t", "m2ts", "mts"],
    "video/mp4": ["mp4", "mp4v", "mpg4"],
    "video/mpeg": ["mpeg", "mpg", "mpe", "m1v", "m2v"],
    "video/ogg": ["ogv"],
    "video/quicktime": ["qt", "mov"],
    "video/webm": ["webm"],
};
Object.freeze(kl);
const Vl = kl;
const _e = function (e, t, i, a) {
    if (i === "a" && !a) {
        throw new TypeError("Private accessor was defined without a getter");
    }
    if (typeof t === "function" ? e !== t || !a : !t.has(e)) {
        throw new TypeError(
            "Cannot read private member from an object whose class did not declare it",
        );
    }
    return i === "m" ? a : i === "a" ? a.call(e) : a ? a.value : t.get(e);
};
let Rt;
let Ht;
let ot;
const Ra = class {
    constructor(...t) {
        Rt.set(this, new Map()),
            Ht.set(this, new Map()),
            ot.set(this, new Map());
        for (const i of t) this.define(i);
    }

    define(t, i = !1) {
        for (let [a, n] of Object.entries(t)) {
            (a = a.toLowerCase()),
                (n = n.map((r) => r.toLowerCase())),
                _e(this, ot, "f").has(a) || _e(this, ot, "f").set(a, new Set());
            const l = _e(this, ot, "f").get(a);
            let o = !0;
            for (let r of n) {
                const s = r.startsWith("*");
                if (
                    ((r = s ? r.slice(1) : r),
                    l?.add(r),
                    o && _e(this, Ht, "f").set(a, r),
                    (o = !1),
                    s)
                ) {
                    continue;
                }
                const p = _e(this, Rt, "f").get(r);
                if (p && p != a && !i) {
                    throw new Error(
                        `"${a} -> ${r}" conflicts with "${p} -> ${r}". Pass \`force=true\` to override this definition.`,
                    );
                }
                _e(this, Rt, "f").set(r, a);
            }
        }
        return this;
    }

    getType(t) {
        if (typeof t !== "string") return null;
        const i = t.replace(/^.*[/\\]/s, "").toLowerCase();
        const a = i.replace(/^.*\./s, "").toLowerCase();
        const n = i.length < t.length;
        return !(a.length < i.length - 1) && n
            ? null
            : (_e(this, Rt, "f").get(a) ?? null);
    }

    getExtension(t) {
        return typeof t !== "string"
            ? null
            : ((t = t?.split?.(";")[0]),
              (t && _e(this, Ht, "f").get(t.trim().toLowerCase())) ?? null);
    }

    getAllExtensions(t) {
        return typeof t !== "string"
            ? null
            : (_e(this, ot, "f").get(t.toLowerCase()) ?? null);
    }

    _freeze() {
        (this.define = () => {
            throw new Error(
                "define() not allowed for built-in Mime objects. See https://github.com/broofa/mime/blob/main/README.md#custom-mime-instances",
            );
        }),
            Object.freeze(this);
        for (const t of _e(this, ot, "f").values()) Object.freeze(t);
        return this;
    }

    _getTestState() {
        return { types: _e(this, Rt, "f"), extensions: _e(this, Ht, "f") };
    }
};
(Rt = new WeakMap()), (Ht = new WeakMap()), (ot = new WeakMap());
const Sa = Ra;
const Gl = new Sa(Vl, Nl)._freeze();
const Ul = ({ addFilter: e, utils: t }) => {
    const { Type: i, replaceInString: a, toNaturalFileSize: n } = t;
    return (
        e("ALLOW_HOPPER_ITEM", (l, { query: o }) => {
            if (!o("GET_ALLOW_FILE_SIZE_VALIDATION")) return !0;
            const r = o("GET_MAX_FILE_SIZE");
            if (r !== null && l.size > r) return !1;
            const s = o("GET_MIN_FILE_SIZE");
            return !(s !== null && l.size < s);
        }),
        e(
            "LOAD_FILE",
            (l, { query: o }) =>
                new Promise((r, s) => {
                    if (!o("GET_ALLOW_FILE_SIZE_VALIDATION")) return r(l);
                    const p = o("GET_FILE_VALIDATE_SIZE_FILTER");
                    if (p && !p(l)) return r(l);
                    const c = o("GET_MAX_FILE_SIZE");
                    if (c !== null && l.size > c) {
                        s({
                            status: {
                                main: o("GET_LABEL_MAX_FILE_SIZE_EXCEEDED"),
                                sub: a(o("GET_LABEL_MAX_FILE_SIZE"), {
                                    filesize: n(
                                        c,
                                        ".",
                                        o("GET_FILE_SIZE_BASE"),
                                        o("GET_FILE_SIZE_LABELS", o),
                                    ),
                                }),
                            },
                        });
                        return;
                    }
                    const d = o("GET_MIN_FILE_SIZE");
                    if (d !== null && l.size < d) {
                        s({
                            status: {
                                main: o("GET_LABEL_MIN_FILE_SIZE_EXCEEDED"),
                                sub: a(o("GET_LABEL_MIN_FILE_SIZE"), {
                                    filesize: n(
                                        d,
                                        ".",
                                        o("GET_FILE_SIZE_BASE"),
                                        o("GET_FILE_SIZE_LABELS", o),
                                    ),
                                }),
                            },
                        });
                        return;
                    }
                    const m = o("GET_MAX_TOTAL_FILE_SIZE");
                    if (
                        m !== null &&
                        o("GET_ACTIVE_ITEMS").reduce(
                            (g, f) => g + f.fileSize,
                            0,
                        ) > m
                    ) {
                        s({
                            status: {
                                main: o(
                                    "GET_LABEL_MAX_TOTAL_FILE_SIZE_EXCEEDED",
                                ),
                                sub: a(o("GET_LABEL_MAX_TOTAL_FILE_SIZE"), {
                                    filesize: n(
                                        m,
                                        ".",
                                        o("GET_FILE_SIZE_BASE"),
                                        o("GET_FILE_SIZE_LABELS", o),
                                    ),
                                }),
                            },
                        });
                        return;
                    }
                    r(l);
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
const sm = typeof window < "u" && typeof window.document < "u";
sm &&
    document.dispatchEvent(
        new CustomEvent("FilePond:pluginloaded", { detail: Ul }),
    );
const Wl = Ul;
const Hl = ({ addFilter: e, utils: t }) => {
    const {
        Type: i,
        isString: a,
        replaceInString: n,
        guesstimateMimeType: l,
        getExtensionFromFilename: o,
        getFilenameFromURL: r,
    } = t;
    const s = (u, g) => {
        const f = (/^[^/]+/.exec(u) || []).pop();
        const h = g.slice(0, -2);
        return f === h;
    };
    const p = (u, g) => u.some((f) => (/\*$/.test(f) ? s(g, f) : f === g));
    const c = (u) => {
        let g = "";
        if (a(u)) {
            const f = r(u);
            const h = o(f);
            h && (g = l(h));
        } else g = u.type;
        return g;
    };
    const d = (u, g, f) => {
        if (g.length === 0) return !0;
        const h = c(u);
        return f
            ? new Promise((I, b) => {
                  f(u, h)
                      .then((T) => {
                          p(g, T) ? I() : b();
                      })
                      .catch(b);
              })
            : p(g, h);
    };
    const m = (u) => (g) => (u[g] === null ? !1 : u[g] || g);
    return (
        e("SET_ATTRIBUTE_TO_OPTION_MAP", (u) =>
            Object.assign(u, { accept: "acceptedFileTypes" }),
        ),
        e("ALLOW_HOPPER_ITEM", (u, { query: g }) =>
            g("GET_ALLOW_FILE_TYPE_VALIDATION")
                ? d(u, g("GET_ACCEPTED_FILE_TYPES"))
                : !0,
        ),
        e(
            "LOAD_FILE",
            (u, { query: g }) =>
                new Promise((f, h) => {
                    if (!g("GET_ALLOW_FILE_TYPE_VALIDATION")) {
                        f(u);
                        return;
                    }
                    const I = g("GET_ACCEPTED_FILE_TYPES");
                    const b = g("GET_FILE_VALIDATE_TYPE_DETECT_TYPE");
                    const T = d(u, I, b);
                    const v = () => {
                        const y = I.map(
                            m(
                                g(
                                    "GET_FILE_VALIDATE_TYPE_LABEL_EXPECTED_TYPES_MAP",
                                ),
                            ),
                        ).filter((_) => _ !== !1);
                        const E = y.filter((_, x) => y.indexOf(_) === x);
                        h({
                            status: {
                                main: g("GET_LABEL_FILE_TYPE_NOT_ALLOWED"),
                                sub: n(
                                    g(
                                        "GET_FILE_VALIDATE_TYPE_LABEL_EXPECTED_TYPES",
                                    ),
                                    {
                                        allTypes: E.join(", "),
                                        allButLastType: E.slice(0, -1).join(
                                            ", ",
                                        ),
                                        lastType: E[E.length - 1],
                                    },
                                ),
                            },
                        });
                    };
                    if (typeof T === "boolean") return T ? f(u) : v();
                    T.then(() => {
                        f(u);
                    }).catch(v);
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
const cm = typeof window < "u" && typeof window.document < "u";
cm &&
    document.dispatchEvent(
        new CustomEvent("FilePond:pluginloaded", { detail: Hl }),
    );
const jl = Hl;
const Yl = (e) => /^image/.test(e.type);
const ql = ({ addFilter: e, utils: t }) => {
    const { Type: i, isFile: a, getNumericAspectRatioFromString: n } = t;
    const l = (p, c) => !(!Yl(p.file) || !c("GET_ALLOW_IMAGE_CROP"));
    const o = (p) => typeof p === "object";
    const r = (p) => typeof p === "number";
    const s = (p, c) =>
        p.setMetadata("crop", Object.assign({}, p.getMetadata("crop"), c));
    return (
        e("DID_CREATE_ITEM", (p, { query: c }) => {
            p.extend("setImageCrop", (d) => {
                if (!(!l(p, c) || !o(center))) {
                    return p.setMetadata("crop", d), d;
                }
            }),
                p.extend("setImageCropCenter", (d) => {
                    if (!(!l(p, c) || !o(d))) return s(p, { center: d });
                }),
                p.extend("setImageCropZoom", (d) => {
                    if (!(!l(p, c) || !r(d))) {
                        return s(p, { zoom: Math.max(1, d) });
                    }
                }),
                p.extend("setImageCropRotation", (d) => {
                    if (!(!l(p, c) || !r(d))) return s(p, { rotation: d });
                }),
                p.extend("setImageCropFlip", (d) => {
                    if (!(!l(p, c) || !o(d))) return s(p, { flip: d });
                }),
                p.extend("setImageCropAspectRatio", (d) => {
                    if (!l(p, c) || typeof d > "u") return;
                    const m = p.getMetadata("crop");
                    const u = n(d);
                    const g = {
                        center: { x: 0.5, y: 0.5 },
                        flip: m
                            ? Object.assign({}, m.flip)
                            : { horizontal: !1, vertical: !1 },
                        rotation: 0,
                        zoom: 1,
                        aspectRatio: u,
                    };
                    return p.setMetadata("crop", g), g;
                });
        }),
        e(
            "DID_LOAD_ITEM",
            (p, { query: c }) =>
                new Promise((d, m) => {
                    const u = p.file;
                    if (
                        !a(u) ||
                        !Yl(u) ||
                        !c("GET_ALLOW_IMAGE_CROP") ||
                        p.getMetadata("crop")
                    ) {
                        return d(p);
                    }
                    const f = c("GET_IMAGE_CROP_ASPECT_RATIO");
                    p.setMetadata("crop", {
                        center: { x: 0.5, y: 0.5 },
                        flip: { horizontal: !1, vertical: !1 },
                        rotation: 0,
                        zoom: 1,
                        aspectRatio: f ? n(f) : null,
                    }),
                        d(p);
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
const dm = typeof window < "u" && typeof window.document < "u";
dm &&
    document.dispatchEvent(
        new CustomEvent("FilePond:pluginloaded", { detail: ql }),
    );
const $l = ql;
const _a = (e) => /^image/.test(e.type);
const Xl = (e) => {
    const { addFilter: t, utils: i, views: a } = e;
    const { Type: n, createRoute: l, createItemAPI: o = (c) => c } = i;
    const { fileActionButton: r } = a;
    t(
        "SHOULD_REMOVE_ON_REVERT",
        (c, { item: d, query: m }) =>
            new Promise((u) => {
                const { file: g } = d;
                const f =
                    m("GET_ALLOW_IMAGE_EDIT") &&
                    m("GET_IMAGE_EDIT_ALLOW_EDIT") &&
                    _a(g);
                u(!f);
            }),
    ),
        t(
            "DID_LOAD_ITEM",
            (c, { query: d, dispatch: m }) =>
                new Promise((u, g) => {
                    if (c.origin > 1) {
                        u(c);
                        return;
                    }
                    const { file: f } = c;
                    if (
                        !d("GET_ALLOW_IMAGE_EDIT") ||
                        !d("GET_IMAGE_EDIT_INSTANT_EDIT")
                    ) {
                        u(c);
                        return;
                    }
                    if (!_a(f)) {
                        u(c);
                        return;
                    }
                    const h = (b, T, v) => (y) => {
                        s.shift(), y ? T(b) : v(b), m("KICK"), I();
                    };
                    const I = () => {
                        if (!s.length) return;
                        const { item: b, resolve: T, reject: v } = s[0];
                        m("EDIT_ITEM", {
                            id: b.id,
                            handleEditorResponse: h(b, T, v),
                        });
                    };
                    p({ item: c, resolve: u, reject: g }),
                        s.length === 1 && I();
                }),
        ),
        t("DID_CREATE_ITEM", (c, { query: d, dispatch: m }) => {
            c.extend("edit", () => {
                m("EDIT_ITEM", { id: c.id });
            });
        });
    const s = [];
    const p = (c) => (s.push(c), c);
    return (
        t("CREATE_VIEW", (c) => {
            const { is: d, view: m, query: u } = c;
            if (!u("GET_ALLOW_IMAGE_EDIT")) return;
            const g = u("GET_ALLOW_IMAGE_PREVIEW");
            if (!((d("file-info") && !g) || (d("file") && g))) return;
            const h = u("GET_IMAGE_EDIT_EDITOR");
            if (!h) return;
            h.filepondCallbackBridge ||
                ((h.outputData = !0),
                (h.outputFile = !1),
                (h.filepondCallbackBridge = {
                    onconfirm: h.onconfirm || (() => {}),
                    oncancel: h.oncancel || (() => {}),
                }));
            const I = ({ root: v, props: y, action: E }) => {
                const { id: _ } = y;
                const { handleEditorResponse: x } = E;
                (h.cropAspectRatio =
                    v.query("GET_IMAGE_CROP_ASPECT_RATIO") ||
                    h.cropAspectRatio),
                    (h.outputCanvasBackgroundColor =
                        v.query(
                            "GET_IMAGE_TRANSFORM_CANVAS_BACKGROUND_COLOR",
                        ) || h.outputCanvasBackgroundColor);
                const R = v.query("GET_ITEM", _);
                if (!R) return;
                const z = R.file;
                const P = R.getMetadata("crop");
                const A = {
                    center: { x: 0.5, y: 0.5 },
                    flip: { horizontal: !1, vertical: !1 },
                    zoom: 1,
                    rotation: 0,
                    aspectRatio: null,
                };
                const B = R.getMetadata("resize");
                const w = R.getMetadata("filter") || null;
                const O = R.getMetadata("filters") || null;
                const S = R.getMetadata("colors") || null;
                const L = R.getMetadata("markup") || null;
                const D = {
                    crop: P || A,
                    size: B
                        ? {
                              upscale: B.upscale,
                              mode: B.mode,
                              width: B.size.width,
                              height: B.size.height,
                          }
                        : null,
                    filter: O
                        ? O.id || O.matrix
                        : v.query("GET_ALLOW_IMAGE_FILTER") &&
                            v.query("GET_IMAGE_FILTER_COLOR_MATRIX") &&
                            !S
                          ? w
                          : null,
                    color: S,
                    markup: L,
                };
                (h.onconfirm = ({ data: F }) => {
                    const {
                        crop: G,
                        size: C,
                        filter: q,
                        color: X,
                        colorMatrix: K,
                        markup: pe,
                    } = F;
                    const k = {};
                    if ((G && (k.crop = G), C)) {
                        const H = (R.getMetadata("resize") || {}).size;
                        const Y = { width: C.width, height: C.height };
                        !(Y.width && Y.height) &&
                            H &&
                            ((Y.width = H.width), (Y.height = H.height)),
                            (Y.width || Y.height) &&
                                (k.resize = {
                                    upscale: C.upscale,
                                    mode: C.mode,
                                    size: Y,
                                });
                    }
                    pe && (k.markup = pe),
                        (k.colors = X),
                        (k.filters = q),
                        (k.filter = K),
                        R.setMetadata(k),
                        h.filepondCallbackBridge.onconfirm(F, o(R)),
                        x &&
                            (h.onclose = () => {
                                x(!0), (h.onclose = null);
                            });
                }),
                    (h.oncancel = () => {
                        h.filepondCallbackBridge.oncancel(o(R)),
                            x &&
                                (h.onclose = () => {
                                    x(!1), (h.onclose = null);
                                });
                    }),
                    h.open(z, D);
            };
            const b = ({ root: v, props: y }) => {
                if (!u("GET_IMAGE_EDIT_ALLOW_EDIT")) return;
                const { id: E } = y;
                const _ = u("GET_ITEM", E);
                if (!_) return;
                const x = _.file;
                if (_a(x)) {
                    if (
                        ((v.ref.handleEdit = (R) => {
                            R.stopPropagation(),
                                v.dispatch("EDIT_ITEM", { id: E });
                        }),
                        g)
                    ) {
                        const R = m.createChildView(r, {
                            label: "edit",
                            icon: u("GET_IMAGE_EDIT_ICON_EDIT"),
                            opacity: 0,
                        });
                        R.element.classList.add("filepond--action-edit-item"),
                            (R.element.dataset.align = u(
                                "GET_STYLE_IMAGE_EDIT_BUTTON_EDIT_ITEM_POSITION",
                            )),
                            R.on("click", v.ref.handleEdit),
                            (v.ref.buttonEditItem = m.appendChildView(R));
                    } else {
                        const R = m.element.querySelector(
                            ".filepond--file-info-main",
                        );
                        const z = document.createElement("button");
                        (z.className = "filepond--action-edit-item-alt"),
                            (z.innerHTML =
                                u("GET_IMAGE_EDIT_ICON_EDIT") +
                                "<span>edit</span>"),
                            z.addEventListener("click", v.ref.handleEdit),
                            R.appendChild(z),
                            (v.ref.editButton = z);
                    }
                }
            };
            m.registerDestroyer(({ root: v }) => {
                v.ref.buttonEditItem &&
                    v.ref.buttonEditItem.off("click", v.ref.handleEdit),
                    v.ref.editButton &&
                        v.ref.editButton.removeEventListener(
                            "click",
                            v.ref.handleEdit,
                        );
            });
            const T = { EDIT_ITEM: I, DID_LOAD_ITEM: b };
            if (g) {
                const v = ({ root: y }) => {
                    y.ref.buttonEditItem && (y.ref.buttonEditItem.opacity = 1);
                };
                T.DID_IMAGE_PREVIEW_SHOW = v;
            }
            m.registerWriter(l(T));
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
const pm = typeof window < "u" && typeof window.document < "u";
pm &&
    document.dispatchEvent(
        new CustomEvent("FilePond:pluginloaded", { detail: Xl }),
    );
const Kl = Xl;
const mm = (e) => /^image\/jpeg/.test(e.type);
const rt = {
    JPEG: 65496,
    APP1: 65505,
    EXIF: 1165519206,
    TIFF: 18761,
    Orientation: 274,
    Unknown: 65280,
};
const st = (e, t, i = !1) => e.getUint16(t, i);
const Ql = (e, t, i = !1) => e.getUint32(t, i);
const um = (e) =>
    new Promise((t, i) => {
        const a = new FileReader();
        (a.onload = function (n) {
            const l = new DataView(n.target.result);
            if (st(l, 0) !== rt.JPEG) {
                t(-1);
                return;
            }
            const o = l.byteLength;
            let r = 2;
            for (; r < o; ) {
                const s = st(l, r);
                if (((r += 2), s === rt.APP1)) {
                    if (Ql(l, (r += 2)) !== rt.EXIF) break;
                    const p = st(l, (r += 6)) === rt.TIFF;
                    r += Ql(l, r + 4, p);
                    const c = st(l, r, p);
                    r += 2;
                    for (let d = 0; d < c; d++) {
                        if (st(l, r + d * 12, p) === rt.Orientation) {
                            t(st(l, r + d * 12 + 8, p));
                            return;
                        }
                    }
                } else {
                    if ((s & rt.Unknown) !== rt.Unknown) break;
                    r += st(l, r);
                }
            }
            t(-1);
        }),
            a.readAsArrayBuffer(e.slice(0, 64 * 1024));
    });
const gm = typeof window < "u" && typeof window.document < "u";
const fm = () => gm;
const hm =
    "data:image/jpg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/4QA6RXhpZgAATU0AKgAAAAgAAwESAAMAAAABAAYAAAEoAAMAAAABAAIAAAITAAMAAAABAAEAAAAAAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////wAALCAABAAIBASIA/8QAJgABAAAAAAAAAAAAAAAAAAAAAxABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQAAPwBH/9k=";
let Zl;
const Ii = fm() ? new Image() : {};
Ii.onload = () => (Zl = Ii.naturalWidth > Ii.naturalHeight);
Ii.src = hm;
const bm = () => Zl;
const Jl = ({ addFilter: e, utils: t }) => {
    const { Type: i, isFile: a } = t;
    return (
        e(
            "DID_LOAD_ITEM",
            (n, { query: l }) =>
                new Promise((o, r) => {
                    const s = n.file;
                    if (
                        !a(s) ||
                        !mm(s) ||
                        !l("GET_ALLOW_IMAGE_EXIF_ORIENTATION") ||
                        !bm()
                    ) {
                        return o(n);
                    }
                    um(s).then((p) => {
                        n.setMetadata("exif", { orientation: p }), o(n);
                    });
                }),
        ),
        { options: { allowImageExifOrientation: [!0, i.BOOLEAN] } }
    );
};
const Em = typeof window < "u" && typeof window.document < "u";
Em &&
    document.dispatchEvent(
        new CustomEvent("FilePond:pluginloaded", { detail: Jl }),
    );
const eo = Jl;
const Tm = (e) => /^image/.test(e.type);
const to = (e, t) => Yt(e.x * t, e.y * t);
const io = (e, t) => Yt(e.x + t.x, e.y + t.y);
const Im = (e) => {
    const t = Math.sqrt(e.x * e.x + e.y * e.y);
    return t === 0 ? { x: 0, y: 0 } : Yt(e.x / t, e.y / t);
};
const vi = (e, t, i) => {
    const a = Math.cos(t);
    const n = Math.sin(t);
    const l = Yt(e.x - i.x, e.y - i.y);
    return Yt(i.x + a * l.x - n * l.y, i.y + n * l.x + a * l.y);
};
var Yt = (e = 0, t = 0) => ({ x: e, y: t });
const Te = (e, t, i = 1, a) => {
    if (typeof e === "string") return parseFloat(e) * i;
    if (typeof e === "number") {
        return e * (a ? t[a] : Math.min(t.width, t.height));
    }
};
const vm = (e, t, i) => {
    const a = e.borderStyle || e.lineStyle || "solid";
    const n = e.backgroundColor || e.fontColor || "transparent";
    const l = e.borderColor || e.lineColor || "transparent";
    const o = Te(e.borderWidth || e.lineWidth, t, i);
    const r = e.lineCap || "round";
    const s = e.lineJoin || "round";
    const p = typeof a === "string" ? "" : a.map((d) => Te(d, t, i)).join(",");
    const c = e.opacity || 1;
    return {
        "stroke-linecap": r,
        "stroke-linejoin": s,
        "stroke-width": o || 0,
        "stroke-dasharray": p,
        stroke: l,
        fill: n,
        opacity: c,
    };
};
const we = (e) => e != null;
const xm = (e, t, i = 1) => {
    let a = Te(e.x, t, i, "width") || Te(e.left, t, i, "width");
    let n = Te(e.y, t, i, "height") || Te(e.top, t, i, "height");
    let l = Te(e.width, t, i, "width");
    let o = Te(e.height, t, i, "height");
    const r = Te(e.right, t, i, "width");
    const s = Te(e.bottom, t, i, "height");
    return (
        we(n) || (we(o) && we(s) ? (n = t.height - o - s) : (n = s)),
        we(a) || (we(l) && we(r) ? (a = t.width - l - r) : (a = r)),
        we(l) || (we(a) && we(r) ? (l = t.width - a - r) : (l = 0)),
        we(o) || (we(n) && we(s) ? (o = t.height - n - s) : (o = 0)),
        { x: a || 0, y: n || 0, width: l || 0, height: o || 0 }
    );
};
const ym = (e) =>
    e.map((t, i) => `${i === 0 ? "M" : "L"} ${t.x} ${t.y}`).join(" ");
const Be = (e, t) => Object.keys(t).forEach((i) => e.setAttribute(i, t[i]));
const Rm = "http://www.w3.org/2000/svg";
const St = (e, t) => {
    const i = document.createElementNS(Rm, e);
    return t && Be(i, t), i;
};
const Sm = (e) => Be(e, { ...e.rect, ...e.styles });
const _m = (e) => {
    const t = e.rect.x + e.rect.width * 0.5;
    const i = e.rect.y + e.rect.height * 0.5;
    const a = e.rect.width * 0.5;
    const n = e.rect.height * 0.5;
    return Be(e, { cx: t, cy: i, rx: a, ry: n, ...e.styles });
};
const wm = { contain: "xMidYMid meet", cover: "xMidYMid slice" };
const Lm = (e, t) => {
    Be(e, { ...e.rect, ...e.styles, preserveAspectRatio: wm[t.fit] || "none" });
};
const Mm = { left: "start", center: "middle", right: "end" };
const Am = (e, t, i, a) => {
    const n = Te(t.fontSize, i, a);
    const l = t.fontFamily || "sans-serif";
    const o = t.fontWeight || "normal";
    const r = Mm[t.textAlign] || "start";
    Be(e, {
        ...e.rect,
        ...e.styles,
        "stroke-width": 0,
        "font-weight": o,
        "font-size": n,
        "font-family": l,
        "text-anchor": r,
    }),
        e.text !== t.text &&
            ((e.text = t.text), (e.textContent = t.text.length ? t.text : " "));
};
const Pm = (e, t, i, a) => {
    Be(e, { ...e.rect, ...e.styles, fill: "none" });
    const n = e.childNodes[0];
    const l = e.childNodes[1];
    const o = e.childNodes[2];
    const r = e.rect;
    const s = { x: e.rect.x + e.rect.width, y: e.rect.y + e.rect.height };
    if ((Be(n, { x1: r.x, y1: r.y, x2: s.x, y2: s.y }), !t.lineDecoration)) {
        return;
    }
    (l.style.display = "none"), (o.style.display = "none");
    const p = Im({ x: s.x - r.x, y: s.y - r.y });
    const c = Te(0.05, i, a);
    if (t.lineDecoration.indexOf("arrow-begin") !== -1) {
        const d = to(p, c);
        const m = io(r, d);
        const u = vi(r, 2, m);
        const g = vi(r, -2, m);
        Be(l, {
            style: "display:block;",
            d: `M${u.x},${u.y} L${r.x},${r.y} L${g.x},${g.y}`,
        });
    }
    if (t.lineDecoration.indexOf("arrow-end") !== -1) {
        const d = to(p, -c);
        const m = io(s, d);
        const u = vi(s, 2, m);
        const g = vi(s, -2, m);
        Be(o, {
            style: "display:block;",
            d: `M${u.x},${u.y} L${s.x},${s.y} L${g.x},${g.y}`,
        });
    }
};
const zm = (e, t, i, a) => {
    Be(e, {
        ...e.styles,
        fill: "none",
        d: ym(
            t.points.map((n) => ({
                x: Te(n.x, i, a, "width"),
                y: Te(n.y, i, a, "height"),
            })),
        ),
    });
};
const xi = (e) => (t) => St(e, { id: t.id });
const Om = (e) => {
    const t = St("image", {
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
const Fm = (e) => {
    const t = St("g", {
        id: e.id,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
    });
    const i = St("line");
    t.appendChild(i);
    const a = St("path");
    t.appendChild(a);
    const n = St("path");
    return t.appendChild(n), t;
};
const Dm = {
    image: Om,
    rect: xi("rect"),
    ellipse: xi("ellipse"),
    text: xi("text"),
    path: xi("path"),
    line: Fm,
};
const Cm = { rect: Sm, ellipse: _m, image: Lm, text: Am, path: zm, line: Pm };
const Bm = (e, t) => Dm[e](t);
const Nm = (e, t, i, a, n) => {
    t !== "path" && (e.rect = xm(i, a, n)),
        (e.styles = vm(i, a, n)),
        Cm[t](e, i, a, n);
};
const km = ["x", "y", "left", "top", "right", "bottom", "width", "height"];
const Vm = (e) =>
    typeof e === "string" && /%/.test(e) ? parseFloat(e) / 100 : e;
const Gm = (e) => {
    const [t, i] = e;
    const a = i.points ? {} : km.reduce((n, l) => ((n[l] = Vm(i[l])), n), {});
    return [t, { zIndex: 0, ...i, ...a }];
};
const Um = (e, t) =>
    e[1].zIndex > t[1].zIndex ? 1 : e[1].zIndex < t[1].zIndex ? -1 : 0;
const Wm = (e) =>
    e.utils.createView({
        name: "image-preview-markup",
        tag: "svg",
        ignoreRect: !0,
        mixins: {
            apis: ["width", "height", "crop", "markup", "resize", "dirty"],
        },
        write: ({ root: t, props: i }) => {
            if (!i.dirty) return;
            const { crop: a, resize: n, markup: l } = i;
            const o = i.width;
            const r = i.height;
            let s = a.width;
            let p = a.height;
            if (n) {
                const { size: u } = n;
                let g = u && u.width;
                let f = u && u.height;
                const h = n.mode;
                const I = n.upscale;
                g && !f && (f = g), f && !g && (g = f);
                const b = s < g && p < f;
                if (!b || (b && I)) {
                    const T = g / s;
                    const v = f / p;
                    if (h === "force") (s = g), (p = f);
                    else {
                        let y;
                        h === "cover"
                            ? (y = Math.max(T, v))
                            : h === "contain" && (y = Math.min(T, v)),
                            (s = s * y),
                            (p = p * y);
                    }
                }
            }
            const c = { width: o, height: r };
            t.element.setAttribute("width", c.width),
                t.element.setAttribute("height", c.height);
            const d = Math.min(o / s, r / p);
            t.element.innerHTML = "";
            const m = t.query("GET_IMAGE_PREVIEW_MARKUP_FILTER");
            l.filter(m)
                .map(Gm)
                .sort(Um)
                .forEach((u) => {
                    const [g, f] = u;
                    const h = Bm(g, f);
                    Nm(h, g, f, c, d), t.element.appendChild(h);
                });
        },
    });
const jt = (e, t) => ({ x: e, y: t });
const Hm = (e, t) => e.x * t.x + e.y * t.y;
const ao = (e, t) => jt(e.x - t.x, e.y - t.y);
const jm = (e, t) => Hm(ao(e, t), ao(e, t));
const no = (e, t) => Math.sqrt(jm(e, t));
const lo = (e, t) => {
    const i = e;
    const a = 1.5707963267948966;
    const n = t;
    const l = 1.5707963267948966 - t;
    const o = Math.sin(a);
    const r = Math.sin(n);
    const s = Math.sin(l);
    const p = Math.cos(l);
    const c = i / o;
    const d = c * r;
    const m = c * s;
    return jt(p * d, p * m);
};
const Ym = (e, t) => {
    const i = e.width;
    const a = e.height;
    const n = lo(i, t);
    const l = lo(a, t);
    const o = jt(e.x + Math.abs(n.x), e.y - Math.abs(n.y));
    const r = jt(e.x + e.width + Math.abs(l.y), e.y + Math.abs(l.x));
    const s = jt(e.x - Math.abs(l.y), e.y + e.height - Math.abs(l.x));
    return { width: no(o, r), height: no(o, s) };
};
const qm = (e, t, i = 1) => {
    const a = e.height / e.width;
    const n = 1;
    const l = t;
    let o = 1;
    let r = a;
    r > l && ((r = l), (o = r / a));
    const s = Math.max(n / o, l / r);
    const p = e.width / (i * s * o);
    const c = p * t;
    return { width: p, height: c };
};
const ro = (e, t, i, a) => {
    const n = a.x > 0.5 ? 1 - a.x : a.x;
    const l = a.y > 0.5 ? 1 - a.y : a.y;
    const o = n * 2 * e.width;
    const r = l * 2 * e.height;
    const s = Ym(t, i);
    return Math.max(s.width / o, s.height / r);
};
const so = (e, t) => {
    let i = e.width;
    let a = i * t;
    a > e.height && ((a = e.height), (i = a / t));
    const n = (e.width - i) * 0.5;
    const l = (e.height - a) * 0.5;
    return { x: n, y: l, width: i, height: a };
};
const $m = (e, t = {}) => {
    let { zoom: i, rotation: a, center: n, aspectRatio: l } = t;
    l || (l = e.height / e.width);
    const o = qm(e, l, i);
    const r = { x: o.width * 0.5, y: o.height * 0.5 };
    const s = { x: 0, y: 0, width: o.width, height: o.height, center: r };
    const p = typeof t.scaleToFit > "u" || t.scaleToFit;
    const c = ro(e, so(s, l), a, p ? n : { x: 0.5, y: 0.5 });
    const d = i * c;
    return {
        widthFloat: o.width / d,
        heightFloat: o.height / d,
        width: Math.round(o.width / d),
        height: Math.round(o.height / d),
    };
};
const Ce = { type: "spring", stiffness: 0.5, damping: 0.45, mass: 10 };
const Xm = (e) =>
    e.utils.createView({
        name: "image-bitmap",
        ignoreRect: !0,
        mixins: { styles: ["scaleX", "scaleY"] },
        create: ({ root: t, props: i }) => {
            t.appendChild(i.image);
        },
    });
const Km = (e) =>
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
                originX: Ce,
                originY: Ce,
                scaleX: Ce,
                scaleY: Ce,
                translateX: Ce,
                translateY: Ce,
                rotateZ: Ce,
            },
        },
        create: ({ root: t, props: i }) => {
            (i.width = i.image.width),
                (i.height = i.image.height),
                (t.ref.bitmap = t.appendChildView(
                    t.createChildView(Xm(e), { image: i.image }),
                ));
        },
        write: ({ root: t, props: i }) => {
            const { flip: a } = i.crop;
            const { bitmap: n } = t.ref;
            (n.scaleX = a.horizontal ? -1 : 1),
                (n.scaleY = a.vertical ? -1 : 1);
        },
    });
const Qm = (e) =>
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
                t.createChildView(Km(e), Object.assign({}, i)),
            )),
                (t.ref.createMarkup = () => {
                    t.ref.markup ||
                        (t.ref.markup = t.appendChildView(
                            t.createChildView(Wm(e), Object.assign({}, i)),
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
                markup: l,
                resize: o,
                dirty: r,
                width: s,
                height: p,
            } = i;
            t.ref.image.crop = n;
            const c = {
                x: 0,
                y: 0,
                width: s,
                height: p,
                center: { x: s * 0.5, y: p * 0.5 },
            };
            const d = { width: t.ref.image.width, height: t.ref.image.height };
            const m = { x: n.center.x * d.width, y: n.center.y * d.height };
            const u = {
                x: c.center.x - d.width * n.center.x,
                y: c.center.y - d.height * n.center.y,
            };
            const g = Math.PI * 2 + (n.rotation % (Math.PI * 2));
            const f = n.aspectRatio || d.height / d.width;
            const h = typeof n.scaleToFit > "u" || n.scaleToFit;
            const I = ro(d, so(c, f), g, h ? n.center : { x: 0.5, y: 0.5 });
            const b = n.zoom * I;
            l && l.length
                ? (t.ref.createMarkup(),
                  (t.ref.markup.width = s),
                  (t.ref.markup.height = p),
                  (t.ref.markup.resize = o),
                  (t.ref.markup.dirty = r),
                  (t.ref.markup.markup = l),
                  (t.ref.markup.crop = $m(d, n)))
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
            (T.originX = m.x),
                (T.originY = m.y),
                (T.translateX = u.x),
                (T.translateY = u.y),
                (T.rotateZ = g),
                (T.scaleX = b),
                (T.scaleY = b);
        },
    });
const Zm = (e) =>
    e.utils.createView({
        name: "image-preview",
        tag: "div",
        ignoreRect: !0,
        mixins: {
            apis: ["image", "crop", "markup", "resize", "dirty", "background"],
            styles: ["translateY", "scaleX", "scaleY", "opacity"],
            animations: {
                scaleX: Ce,
                scaleY: Ce,
                translateY: Ce,
                opacity: { type: "tween", duration: 400 },
            },
        },
        create: ({ root: t, props: i }) => {
            t.ref.clip = t.appendChildView(
                t.createChildView(Qm(e), {
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
            const { image: l, crop: o, markup: r, resize: s, dirty: p } = i;
            if (
                ((n.crop = o),
                (n.markup = r),
                (n.resize = s),
                (n.dirty = p),
                (n.opacity = a ? 0 : 1),
                a || t.rect.element.hidden)
            ) {
                return;
            }
            const c = l.height / l.width;
            let d = o.aspectRatio || c;
            const m = t.rect.inner.width;
            const u = t.rect.inner.height;
            let g = t.query("GET_IMAGE_PREVIEW_HEIGHT");
            const f = t.query("GET_IMAGE_PREVIEW_MIN_HEIGHT");
            const h = t.query("GET_IMAGE_PREVIEW_MAX_HEIGHT");
            const I = t.query("GET_PANEL_ASPECT_RATIO");
            const b = t.query("GET_ALLOW_MULTIPLE");
            I && !b && ((g = m * I), (d = I));
            let T = g !== null ? g : Math.max(f, Math.min(m * d, h));
            let v = T / d;
            v > m && ((v = m), (T = v * d)),
                T > u && ((T = u), (v = u / d)),
                (n.width = v),
                (n.height = T);
        },
    });
const Jm = `<svg width="500" height="200" viewBox="0 0 500 200" preserveAspectRatio="none">
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
let oo = 0;
const eu = (e) =>
    e.utils.createView({
        name: "image-preview-overlay",
        tag: "div",
        ignoreRect: !0,
        create: ({ root: t, props: i }) => {
            let a = Jm;
            if (document.querySelector("base")) {
                const n = new URL(
                    window.location.href.replace(window.location.hash, ""),
                ).href;
                a = a.replace(/url\(\#/g, "url(" + n + "#");
            }
            oo++,
                t.element.classList.add(
                    `filepond--image-preview-overlay-${i.status}`,
                ),
                (t.element.innerHTML = a.replace(/__UID__/g, oo));
        },
        mixins: {
            styles: ["opacity"],
            animations: { opacity: { type: "spring", mass: 25 } },
        },
    });
const tu = function () {
    self.onmessage = (e) => {
        createImageBitmap(e.data.message.file).then((t) => {
            self.postMessage({ id: e.data.id, message: t }, [t]);
        });
    };
};
const iu = function () {
    self.onmessage = (e) => {
        const t = e.data.message.imageData;
        const i = e.data.message.colorMatrix;
        const a = t.data;
        const n = a.length;
        const l = i[0];
        const o = i[1];
        const r = i[2];
        const s = i[3];
        const p = i[4];
        const c = i[5];
        const d = i[6];
        const m = i[7];
        const u = i[8];
        const g = i[9];
        const f = i[10];
        const h = i[11];
        const I = i[12];
        const b = i[13];
        const T = i[14];
        const v = i[15];
        const y = i[16];
        const E = i[17];
        const _ = i[18];
        const x = i[19];
        let R = 0;
        let z = 0;
        let P = 0;
        let A = 0;
        let B = 0;
        for (; R < n; R += 4) {
            (z = a[R] / 255),
                (P = a[R + 1] / 255),
                (A = a[R + 2] / 255),
                (B = a[R + 3] / 255),
                (a[R] = Math.max(
                    0,
                    Math.min((z * l + P * o + A * r + B * s + p) * 255, 255),
                )),
                (a[R + 1] = Math.max(
                    0,
                    Math.min((z * c + P * d + A * m + B * u + g) * 255, 255),
                )),
                (a[R + 2] = Math.max(
                    0,
                    Math.min((z * f + P * h + A * I + B * b + T) * 255, 255),
                )),
                (a[R + 3] = Math.max(
                    0,
                    Math.min((z * v + P * y + A * E + B * _ + x) * 255, 255),
                ));
        }
        self.postMessage({ id: e.data.id, message: t }, [t.data.buffer]);
    };
};
const au = (e, t) => {
    let i = new Image();
    (i.onload = () => {
        const a = i.naturalWidth;
        const n = i.naturalHeight;
        (i = null), t(a, n);
    }),
        (i.src = e);
};
const nu = {
    1: () => [1, 0, 0, 1, 0, 0],
    2: (e) => [-1, 0, 0, 1, e, 0],
    3: (e, t) => [-1, 0, 0, -1, e, t],
    4: (e, t) => [1, 0, 0, -1, 0, t],
    5: () => [0, 1, 1, 0, 0, 0],
    6: (e, t) => [0, 1, -1, 0, t, 0],
    7: (e, t) => [0, -1, -1, 0, t, e],
    8: (e) => [0, -1, 1, 0, 0, e],
};
const lu = (e, t, i, a) => {
    a !== -1 && e.transform.apply(e, nu[a](t, i));
};
const ou = (e, t, i, a) => {
    (t = Math.round(t)), (i = Math.round(i));
    const n = document.createElement("canvas");
    (n.width = t), (n.height = i);
    const l = n.getContext("2d");
    return (
        a >= 5 && a <= 8 && ([t, i] = [i, t]),
        lu(l, t, i, a),
        l.drawImage(e, 0, 0, t, i),
        n
    );
};
const co = (e) => /^image/.test(e.type) && !/svg/.test(e.type);
const ru = 10;
const su = 10;
const cu = (e) => {
    const t = Math.min(ru / e.width, su / e.height);
    const i = document.createElement("canvas");
    const a = i.getContext("2d");
    const n = (i.width = Math.ceil(e.width * t));
    const l = (i.height = Math.ceil(e.height * t));
    a.drawImage(e, 0, 0, n, l);
    let o = null;
    try {
        o = a.getImageData(0, 0, n, l).data;
    } catch {
        return null;
    }
    const r = o.length;
    let s = 0;
    let p = 0;
    let c = 0;
    let d = 0;
    for (; d < r; d += 4) {
        (s += o[d] * o[d]),
            (p += o[d + 1] * o[d + 1]),
            (c += o[d + 2] * o[d + 2]);
    }
    return (s = wa(s, r)), (p = wa(p, r)), (c = wa(c, r)), { r: s, g: p, b: c };
};
var wa = (e, t) => Math.floor(Math.sqrt(e / (t / 4)));
const du = (e, t) => (
    (t = t || document.createElement("canvas")),
    (t.width = e.width),
    (t.height = e.height),
    t.getContext("2d").drawImage(e, 0, 0),
    t
);
const pu = (e) => {
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
const mu = (e) =>
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
const uu = (e) => {
    const t = eu(e);
    const i = Zm(e);
    const { createWorker: a } = e.utils;
    const n = (b, T, v) =>
        new Promise((y) => {
            b.ref.imageData ||
                (b.ref.imageData = v
                    .getContext("2d")
                    .getImageData(0, 0, v.width, v.height));
            const E = pu(b.ref.imageData);
            if (!T || T.length !== 20) {
                return v.getContext("2d").putImageData(E, 0, 0), y();
            }
            const _ = a(iu);
            _.post(
                { imageData: E, colorMatrix: T },
                (x) => {
                    v.getContext("2d").putImageData(x, 0, 0),
                        _.terminate(),
                        y();
                },
                [E.data.buffer],
            );
        });
    const l = (b, T) => {
        b.removeChildView(T),
            (T.image.width = 1),
            (T.image.height = 1),
            T._destroy();
    };
    const o = ({ root: b }) => {
        const T = b.ref.images.shift();
        return (
            (T.opacity = 0), (T.translateY = -15), b.ref.imageViewBin.push(T), T
        );
    };
    const r = ({ root: b, props: T, image: v }) => {
        const y = T.id;
        const E = b.query("GET_ITEM", { id: y });
        if (!E) return;
        const _ = E.getMetadata("crop") || {
            center: { x: 0.5, y: 0.5 },
            flip: { horizontal: !1, vertical: !1 },
            zoom: 1,
            rotation: 0,
            aspectRatio: null,
        };
        const x = b.query("GET_IMAGE_TRANSFORM_CANVAS_BACKGROUND_COLOR");
        let R;
        let z;
        let P = !1;
        b.query("GET_IMAGE_PREVIEW_MARKUP_SHOW") &&
            ((R = E.getMetadata("markup") || []),
            (z = E.getMetadata("resize")),
            (P = !0));
        const A = b.appendChildView(
            b.createChildView(i, {
                id: y,
                image: v,
                crop: _,
                resize: z,
                markup: R,
                dirty: P,
                background: x,
                opacity: 0,
                scaleX: 1.15,
                scaleY: 1.15,
                translateY: 15,
            }),
            b.childViews.length,
        );
        b.ref.images.push(A),
            (A.opacity = 1),
            (A.scaleX = 1),
            (A.scaleY = 1),
            (A.translateY = 0),
            setTimeout(() => {
                b.dispatch("DID_IMAGE_PREVIEW_SHOW", { id: y });
            }, 250);
    };
    const s = ({ root: b, props: T }) => {
        const v = b.query("GET_ITEM", { id: T.id });
        if (!v) return;
        const y = b.ref.images[b.ref.images.length - 1];
        (y.crop = v.getMetadata("crop")),
            (y.background = b.query(
                "GET_IMAGE_TRANSFORM_CANVAS_BACKGROUND_COLOR",
            )),
            b.query("GET_IMAGE_PREVIEW_MARKUP_SHOW") &&
                ((y.dirty = !0),
                (y.resize = v.getMetadata("resize")),
                (y.markup = v.getMetadata("markup")));
    };
    const p = ({ root: b, props: T, action: v }) => {
        if (
            !/crop|filter|markup|resize/.test(v.change.key) ||
            !b.ref.images.length
        ) {
            return;
        }
        const y = b.query("GET_ITEM", { id: T.id });
        if (y) {
            if (/filter/.test(v.change.key)) {
                const E = b.ref.images[b.ref.images.length - 1];
                n(b, v.change.value, E.image);
                return;
            }
            if (/crop|markup|resize/.test(v.change.key)) {
                const E = y.getMetadata("crop");
                const _ = b.ref.images[b.ref.images.length - 1];
                if (
                    E &&
                    E.aspectRatio &&
                    _.crop &&
                    _.crop.aspectRatio &&
                    Math.abs(E.aspectRatio - _.crop.aspectRatio) > 1e-5
                ) {
                    const x = o({ root: b });
                    r({ root: b, props: T, image: du(x.image) });
                } else s({ root: b, props: T });
            }
        }
    };
    const c = (b) => {
        const v = window.navigator.userAgent.match(/Firefox\/([0-9]+)\./);
        const y = v ? parseInt(v[1]) : null;
        return y !== null && y <= 58
            ? !1
            : "createImageBitmap" in window && co(b);
    };
    const d = ({ root: b, props: T }) => {
        const { id: v } = T;
        const y = b.query("GET_ITEM", v);
        if (!y) return;
        const E = URL.createObjectURL(y.file);
        au(E, (_, x) => {
            b.dispatch("DID_IMAGE_PREVIEW_CALCULATE_SIZE", {
                id: v,
                width: _,
                height: x,
            });
        });
    };
    const m = ({ root: b, props: T }) => {
        const { id: v } = T;
        const y = b.query("GET_ITEM", v);
        if (!y) return;
        const E = URL.createObjectURL(y.file);
        const _ = () => {
            mu(E).then(x);
        };
        const x = (R) => {
            URL.revokeObjectURL(E);
            const P = (y.getMetadata("exif") || {}).orientation || -1;
            let { width: A, height: B } = R;
            if (!A || !B) return;
            P >= 5 && P <= 8 && ([A, B] = [B, A]);
            const w = Math.max(1, window.devicePixelRatio * 0.75);
            const S = b.query("GET_IMAGE_PREVIEW_ZOOM_FACTOR") * w;
            const L = B / A;
            const D = b.rect.element.width;
            const F = b.rect.element.height;
            let G = D;
            let C = G * L;
            L > 1
                ? ((G = Math.min(A, D * S)), (C = G * L))
                : ((C = Math.min(B, F * S)), (G = C / L));
            const q = ou(R, G, C, P);
            const X = () => {
                const pe = b.query(
                    "GET_IMAGE_PREVIEW_CALCULATE_AVERAGE_IMAGE_COLOR",
                )
                    ? cu(data)
                    : null;
                y.setMetadata("color", pe, !0),
                    "close" in R && R.close(),
                    (b.ref.overlayShadow.opacity = 1),
                    r({ root: b, props: T, image: q });
            };
            const K = y.getMetadata("filter");
            K ? n(b, K, q).then(X) : X();
        };
        if (c(y.file)) {
            const R = a(tu);
            R.post({ file: y.file }, (z) => {
                if ((R.terminate(), !z)) {
                    _();
                    return;
                }
                x(z);
            });
        } else _();
    };
    const u = ({ root: b }) => {
        const T = b.ref.images[b.ref.images.length - 1];
        (T.translateY = 0), (T.scaleX = 1), (T.scaleY = 1), (T.opacity = 1);
    };
    const g = ({ root: b }) => {
        (b.ref.overlayShadow.opacity = 1),
            (b.ref.overlayError.opacity = 0),
            (b.ref.overlaySuccess.opacity = 0);
    };
    const f = ({ root: b }) => {
        (b.ref.overlayShadow.opacity = 0.25), (b.ref.overlayError.opacity = 1);
    };
    const h = ({ root: b }) => {
        (b.ref.overlayShadow.opacity = 0.25),
            (b.ref.overlaySuccess.opacity = 1);
    };
    const I = ({ root: b }) => {
        (b.ref.images = []),
            (b.ref.imageData = null),
            (b.ref.imageViewBin = []),
            (b.ref.overlayShadow = b.appendChildView(
                b.createChildView(t, { opacity: 0, status: "idle" }),
            )),
            (b.ref.overlaySuccess = b.appendChildView(
                b.createChildView(t, { opacity: 0, status: "success" }),
            )),
            (b.ref.overlayError = b.appendChildView(
                b.createChildView(t, { opacity: 0, status: "failure" }),
            ));
    };
    return e.utils.createView({
        name: "image-preview-wrapper",
        create: I,
        styles: ["height"],
        apis: ["height"],
        destroy: ({ root: b }) => {
            b.ref.images.forEach((T) => {
                (T.image.width = 1), (T.image.height = 1);
            });
        },
        didWriteView: ({ root: b }) => {
            b.ref.images.forEach((T) => {
                T.dirty = !1;
            });
        },
        write: e.utils.createRoute(
            {
                DID_IMAGE_PREVIEW_DRAW: u,
                DID_IMAGE_PREVIEW_CONTAINER_CREATE: d,
                DID_FINISH_CALCULATE_PREVIEWSIZE: m,
                DID_UPDATE_ITEM_METADATA: p,
                DID_THROW_ITEM_LOAD_ERROR: f,
                DID_THROW_ITEM_PROCESSING_ERROR: f,
                DID_THROW_ITEM_INVALID: f,
                DID_COMPLETE_ITEM_PROCESSING: h,
                DID_START_ITEM_PROCESSING: g,
                DID_REVERT_ITEM_PROCESSING: g,
            },
            ({ root: b }) => {
                const T = b.ref.imageViewBin.filter((v) => v.opacity === 0);
                (b.ref.imageViewBin = b.ref.imageViewBin.filter(
                    (v) => v.opacity > 0,
                )),
                    T.forEach((v) => l(b, v)),
                    (T.length = 0);
            },
        ),
    });
};
const po = (e) => {
    const { addFilter: t, utils: i } = e;
    const { Type: a, createRoute: n, isFile: l } = i;
    const o = uu(e);
    return (
        t("CREATE_VIEW", (r) => {
            const { is: s, view: p, query: c } = r;
            if (!s("file") || !c("GET_ALLOW_IMAGE_PREVIEW")) return;
            const d = ({ root: h, props: I }) => {
                const { id: b } = I;
                const T = c("GET_ITEM", b);
                if (!T || !l(T.file) || T.archived) return;
                const v = T.file;
                if (!Tm(v) || !c("GET_IMAGE_PREVIEW_FILTER_ITEM")(T)) return;
                const y = "createImageBitmap" in (window || {});
                const E = c("GET_IMAGE_PREVIEW_MAX_FILE_SIZE");
                if (!y && E && v.size > E) return;
                h.ref.imagePreview = p.appendChildView(
                    p.createChildView(o, { id: b }),
                );
                const _ = h.query("GET_IMAGE_PREVIEW_HEIGHT");
                _ &&
                    h.dispatch("DID_UPDATE_PANEL_HEIGHT", {
                        id: T.id,
                        height: _,
                    });
                const x =
                    !y &&
                    v.size >
                        c("GET_IMAGE_PREVIEW_MAX_INSTANT_PREVIEW_FILE_SIZE");
                h.dispatch("DID_IMAGE_PREVIEW_CONTAINER_CREATE", { id: b }, x);
            };
            const m = (h, I) => {
                if (!h.ref.imagePreview) return;
                const { id: b } = I;
                const T = h.query("GET_ITEM", { id: b });
                if (!T) return;
                const v = h.query("GET_PANEL_ASPECT_RATIO");
                const y = h.query("GET_ITEM_PANEL_ASPECT_RATIO");
                const E = h.query("GET_IMAGE_PREVIEW_HEIGHT");
                if (v || y || E) return;
                let { imageWidth: _, imageHeight: x } = h.ref;
                if (!_ || !x) return;
                const R = h.query("GET_IMAGE_PREVIEW_MIN_HEIGHT");
                const z = h.query("GET_IMAGE_PREVIEW_MAX_HEIGHT");
                const A = (T.getMetadata("exif") || {}).orientation || -1;
                if (
                    (A >= 5 && A <= 8 && ([_, x] = [x, _]),
                    !co(T.file) || h.query("GET_IMAGE_PREVIEW_UPSCALE"))
                ) {
                    const D = 2048 / _;
                    (_ *= D), (x *= D);
                }
                const B = x / _;
                const w = (T.getMetadata("crop") || {}).aspectRatio || B;
                const O = Math.max(R, Math.min(x, z));
                const S = h.rect.element.width;
                const L = Math.min(S * w, O);
                h.dispatch("DID_UPDATE_PANEL_HEIGHT", { id: T.id, height: L });
            };
            const u = ({ root: h }) => {
                h.ref.shouldRescale = !0;
            };
            const g = ({ root: h, action: I }) => {
                I.change.key === "crop" && (h.ref.shouldRescale = !0);
            };
            const f = ({ root: h, action: I }) => {
                (h.ref.imageWidth = I.width),
                    (h.ref.imageHeight = I.height),
                    (h.ref.shouldRescale = !0),
                    (h.ref.shouldDrawPreview = !0),
                    h.dispatch("KICK");
            };
            p.registerWriter(
                n(
                    {
                        DID_RESIZE_ROOT: u,
                        DID_STOP_RESIZE: u,
                        DID_LOAD_ITEM: d,
                        DID_IMAGE_PREVIEW_CALCULATE_SIZE: f,
                        DID_UPDATE_ITEM_METADATA: g,
                    },
                    ({ root: h, props: I }) => {
                        h.ref.imagePreview &&
                            (h.rect.element.hidden ||
                                (h.ref.shouldRescale &&
                                    (m(h, I), (h.ref.shouldRescale = !1)),
                                h.ref.shouldDrawPreview &&
                                    (requestAnimationFrame(() => {
                                        requestAnimationFrame(() => {
                                            h.dispatch(
                                                "DID_FINISH_CALCULATE_PREVIEWSIZE",
                                                { id: I.id },
                                            );
                                        });
                                    }),
                                    (h.ref.shouldDrawPreview = !1))));
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
const gu = typeof window < "u" && typeof window.document < "u";
gu &&
    document.dispatchEvent(
        new CustomEvent("FilePond:pluginloaded", { detail: po }),
    );
const mo = po;
const fu = (e) => /^image/.test(e.type);
const hu = (e, t) => {
    let i = new Image();
    (i.onload = () => {
        const a = i.naturalWidth;
        const n = i.naturalHeight;
        (i = null), t({ width: a, height: n });
    }),
        (i.onerror = () => t(null)),
        (i.src = e);
};
const uo = ({ addFilter: e, utils: t }) => {
    const { Type: i } = t;
    return (
        e(
            "DID_LOAD_ITEM",
            (a, { query: n }) =>
                new Promise((l, o) => {
                    const r = a.file;
                    if (!fu(r) || !n("GET_ALLOW_IMAGE_RESIZE")) return l(a);
                    const s = n("GET_IMAGE_RESIZE_MODE");
                    const p = n("GET_IMAGE_RESIZE_TARGET_WIDTH");
                    const c = n("GET_IMAGE_RESIZE_TARGET_HEIGHT");
                    const d = n("GET_IMAGE_RESIZE_UPSCALE");
                    if (p === null && c === null) return l(a);
                    const m = p === null ? c : p;
                    const u = c === null ? m : c;
                    const g = URL.createObjectURL(r);
                    hu(g, (f) => {
                        if ((URL.revokeObjectURL(g), !f)) return l(a);
                        let { width: h, height: I } = f;
                        const b =
                            (a.getMetadata("exif") || {}).orientation || -1;
                        if (
                            (b >= 5 && b <= 8 && ([h, I] = [I, h]),
                            h === m && I === u)
                        ) {
                            return l(a);
                        }
                        if (!d) {
                            if (s === "cover") {
                                if (h <= m || I <= u) return l(a);
                            } else if (h <= m && I <= m) return l(a);
                        }
                        a.setMetadata("resize", {
                            mode: s,
                            upscale: d,
                            size: { width: m, height: u },
                        }),
                            l(a);
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
const bu = typeof window < "u" && typeof window.document < "u";
bu &&
    document.dispatchEvent(
        new CustomEvent("FilePond:pluginloaded", { detail: uo }),
    );
const go = uo;
const Eu = (e) => /^image/.test(e.type);
const Tu = (e) => e.substr(0, e.lastIndexOf(".")) || e;
const Iu = { jpeg: "jpg", "svg+xml": "svg" };
const vu = (e, t) => {
    const i = Tu(e);
    const a = t.split("/")[1];
    const n = Iu[a] || a;
    return `${i}.${n}`;
};
const xu = (e) => (/jpeg|png|svg\+xml/.test(e) ? e : "image/jpeg");
const yu = (e) => /^image/.test(e.type);
const Ru = {
    1: () => [1, 0, 0, 1, 0, 0],
    2: (e) => [-1, 0, 0, 1, e, 0],
    3: (e, t) => [-1, 0, 0, -1, e, t],
    4: (e, t) => [1, 0, 0, -1, 0, t],
    5: () => [0, 1, 1, 0, 0, 0],
    6: (e, t) => [0, 1, -1, 0, t, 0],
    7: (e, t) => [0, -1, -1, 0, t, e],
    8: (e) => [0, -1, 1, 0, 0, e],
};
const Su = (e, t, i) => (i === -1 && (i = 1), Ru[i](e, t));
const qt = (e, t) => ({ x: e, y: t });
const _u = (e, t) => e.x * t.x + e.y * t.y;
const fo = (e, t) => qt(e.x - t.x, e.y - t.y);
const wu = (e, t) => _u(fo(e, t), fo(e, t));
const ho = (e, t) => Math.sqrt(wu(e, t));
const bo = (e, t) => {
    const i = e;
    const a = 1.5707963267948966;
    const n = t;
    const l = 1.5707963267948966 - t;
    const o = Math.sin(a);
    const r = Math.sin(n);
    const s = Math.sin(l);
    const p = Math.cos(l);
    const c = i / o;
    const d = c * r;
    const m = c * s;
    return qt(p * d, p * m);
};
const Lu = (e, t) => {
    const i = e.width;
    const a = e.height;
    const n = bo(i, t);
    const l = bo(a, t);
    const o = qt(e.x + Math.abs(n.x), e.y - Math.abs(n.y));
    const r = qt(e.x + e.width + Math.abs(l.y), e.y + Math.abs(l.x));
    const s = qt(e.x - Math.abs(l.y), e.y + e.height - Math.abs(l.x));
    return { width: ho(o, r), height: ho(o, s) };
};
const Io = (e, t, i = 0, a = { x: 0.5, y: 0.5 }) => {
    const n = a.x > 0.5 ? 1 - a.x : a.x;
    const l = a.y > 0.5 ? 1 - a.y : a.y;
    const o = n * 2 * e.width;
    const r = l * 2 * e.height;
    const s = Lu(t, i);
    return Math.max(s.width / o, s.height / r);
};
const vo = (e, t) => {
    let i = e.width;
    let a = i * t;
    a > e.height && ((a = e.height), (i = a / t));
    const n = (e.width - i) * 0.5;
    const l = (e.height - a) * 0.5;
    return { x: n, y: l, width: i, height: a };
};
const Eo = (e, t, i = 1) => {
    const a = e.height / e.width;
    const n = 1;
    const l = t;
    let o = 1;
    let r = a;
    r > l && ((r = l), (o = r / a));
    const s = Math.max(n / o, l / r);
    const p = e.width / (i * s * o);
    const c = p * t;
    return { width: p, height: c };
};
const xo = (e) => {
    (e.width = 1), (e.height = 1), e.getContext("2d").clearRect(0, 0, 1, 1);
};
const To = (e) => e && (e.horizontal || e.vertical);
const Mu = (e, t, i) => {
    if (t <= 1 && !To(i)) {
        return (e.width = e.naturalWidth), (e.height = e.naturalHeight), e;
    }
    const a = document.createElement("canvas");
    const n = e.naturalWidth;
    const l = e.naturalHeight;
    const o = t >= 5 && t <= 8;
    o ? ((a.width = l), (a.height = n)) : ((a.width = n), (a.height = l));
    const r = a.getContext("2d");
    if ((t && r.transform.apply(r, Su(n, l, t)), To(i))) {
        const s = [1, 0, 0, 1, 0, 0];
        ((!o && i.horizontal) || o & i.vertical) && ((s[0] = -1), (s[4] = n)),
            ((!o && i.vertical) || (o && i.horizontal)) &&
                ((s[3] = -1), (s[5] = l)),
            r.transform(...s);
    }
    return r.drawImage(e, 0, 0, n, l), a;
};
const Au = (e, t, i = {}, a = {}) => {
    const { canvasMemoryLimit: n, background: l = null } = a;
    const o = i.zoom || 1;
    const r = Mu(e, t, i.flip);
    const s = { width: r.width, height: r.height };
    const p = i.aspectRatio || s.height / s.width;
    let c = Eo(s, p, o);
    if (n) {
        const T = c.width * c.height;
        if (T > n) {
            const v = Math.sqrt(n) / Math.sqrt(T);
            (s.width = Math.floor(s.width * v)),
                (s.height = Math.floor(s.height * v)),
                (c = Eo(s, p, o));
        }
    }
    const d = document.createElement("canvas");
    const m = { x: c.width * 0.5, y: c.height * 0.5 };
    const u = { x: 0, y: 0, width: c.width, height: c.height, center: m };
    const g = typeof i.scaleToFit > "u" || i.scaleToFit;
    const f =
        o * Io(s, vo(u, p), i.rotation, g ? i.center : { x: 0.5, y: 0.5 });
    (d.width = Math.round(c.width / f)),
        (d.height = Math.round(c.height / f)),
        (m.x /= f),
        (m.y /= f);
    const h = {
        x: m.x - s.width * (i.center ? i.center.x : 0.5),
        y: m.y - s.height * (i.center ? i.center.y : 0.5),
    };
    const I = d.getContext("2d");
    l && ((I.fillStyle = l), I.fillRect(0, 0, d.width, d.height)),
        I.translate(m.x, m.y),
        I.rotate(i.rotation || 0),
        I.drawImage(r, h.x - m.x, h.y - m.y, s.width, s.height);
    const b = I.getImageData(0, 0, d.width, d.height);
    return xo(d), b;
};
const Pu = typeof window < "u" && typeof window.document < "u";
Pu &&
    (HTMLCanvasElement.prototype.toBlob ||
        Object.defineProperty(HTMLCanvasElement.prototype, "toBlob", {
            value: function (e, t, i) {
                const a = this.toDataURL(t, i).split(",")[1];
                setTimeout(function () {
                    for (
                        var n = atob(a),
                            l = n.length,
                            o = new Uint8Array(l),
                            r = 0;
                        r < l;
                        r++
                    ) {
                        o[r] = n.charCodeAt(r);
                    }
                    e(new Blob([o], { type: t || "image/png" }));
                });
            },
        }));
const zu = (e, t, i = null) =>
    new Promise((a) => {
        const n = i ? i(e) : e;
        Promise.resolve(n).then((l) => {
            l.toBlob(a, t.type, t.quality);
        });
    });
const Ri = (e, t) => $t(e.x * t, e.y * t);
const Si = (e, t) => $t(e.x + t.x, e.y + t.y);
const yo = (e) => {
    const t = Math.sqrt(e.x * e.x + e.y * e.y);
    return t === 0 ? { x: 0, y: 0 } : $t(e.x / t, e.y / t);
};
const qe = (e, t, i) => {
    const a = Math.cos(t);
    const n = Math.sin(t);
    const l = $t(e.x - i.x, e.y - i.y);
    return $t(i.x + a * l.x - n * l.y, i.y + n * l.x + a * l.y);
};
var $t = (e = 0, t = 0) => ({ x: e, y: t });
const me = (e, t, i = 1, a) => {
    if (typeof e === "string") return parseFloat(e) * i;
    if (typeof e === "number") {
        return e * (a ? t[a] : Math.min(t.width, t.height));
    }
};
const ct = (e, t, i) => {
    const a = e.borderStyle || e.lineStyle || "solid";
    const n = e.backgroundColor || e.fontColor || "transparent";
    const l = e.borderColor || e.lineColor || "transparent";
    const o = me(e.borderWidth || e.lineWidth, t, i);
    const r = e.lineCap || "round";
    const s = e.lineJoin || "round";
    const p = typeof a === "string" ? "" : a.map((d) => me(d, t, i)).join(",");
    const c = e.opacity || 1;
    return {
        "stroke-linecap": r,
        "stroke-linejoin": s,
        "stroke-width": o || 0,
        "stroke-dasharray": p,
        stroke: l,
        fill: n,
        opacity: c,
    };
};
const Le = (e) => e != null;
const wt = (e, t, i = 1) => {
    let a = me(e.x, t, i, "width") || me(e.left, t, i, "width");
    let n = me(e.y, t, i, "height") || me(e.top, t, i, "height");
    let l = me(e.width, t, i, "width");
    let o = me(e.height, t, i, "height");
    const r = me(e.right, t, i, "width");
    const s = me(e.bottom, t, i, "height");
    return (
        Le(n) || (Le(o) && Le(s) ? (n = t.height - o - s) : (n = s)),
        Le(a) || (Le(l) && Le(r) ? (a = t.width - l - r) : (a = r)),
        Le(l) || (Le(a) && Le(r) ? (l = t.width - a - r) : (l = 0)),
        Le(o) || (Le(n) && Le(s) ? (o = t.height - n - s) : (o = 0)),
        { x: a || 0, y: n || 0, width: l || 0, height: o || 0 }
    );
};
const Ou = (e) =>
    e.map((t, i) => `${i === 0 ? "M" : "L"} ${t.x} ${t.y}`).join(" ");
const Ne = (e, t) => Object.keys(t).forEach((i) => e.setAttribute(i, t[i]));
const Fu = "http://www.w3.org/2000/svg";
const _t = (e, t) => {
    const i = document.createElementNS(Fu, e);
    return t && Ne(i, t), i;
};
const Du = (e) => Ne(e, { ...e.rect, ...e.styles });
const Cu = (e) => {
    const t = e.rect.x + e.rect.width * 0.5;
    const i = e.rect.y + e.rect.height * 0.5;
    const a = e.rect.width * 0.5;
    const n = e.rect.height * 0.5;
    return Ne(e, { cx: t, cy: i, rx: a, ry: n, ...e.styles });
};
const Bu = { contain: "xMidYMid meet", cover: "xMidYMid slice" };
const Nu = (e, t) => {
    Ne(e, { ...e.rect, ...e.styles, preserveAspectRatio: Bu[t.fit] || "none" });
};
const ku = { left: "start", center: "middle", right: "end" };
const Vu = (e, t, i, a) => {
    const n = me(t.fontSize, i, a);
    const l = t.fontFamily || "sans-serif";
    const o = t.fontWeight || "normal";
    const r = ku[t.textAlign] || "start";
    Ne(e, {
        ...e.rect,
        ...e.styles,
        "stroke-width": 0,
        "font-weight": o,
        "font-size": n,
        "font-family": l,
        "text-anchor": r,
    }),
        e.text !== t.text &&
            ((e.text = t.text), (e.textContent = t.text.length ? t.text : " "));
};
const Gu = (e, t, i, a) => {
    Ne(e, { ...e.rect, ...e.styles, fill: "none" });
    const n = e.childNodes[0];
    const l = e.childNodes[1];
    const o = e.childNodes[2];
    const r = e.rect;
    const s = { x: e.rect.x + e.rect.width, y: e.rect.y + e.rect.height };
    if ((Ne(n, { x1: r.x, y1: r.y, x2: s.x, y2: s.y }), !t.lineDecoration)) {
        return;
    }
    (l.style.display = "none"), (o.style.display = "none");
    const p = yo({ x: s.x - r.x, y: s.y - r.y });
    const c = me(0.05, i, a);
    if (t.lineDecoration.indexOf("arrow-begin") !== -1) {
        const d = Ri(p, c);
        const m = Si(r, d);
        const u = qe(r, 2, m);
        const g = qe(r, -2, m);
        Ne(l, {
            style: "display:block;",
            d: `M${u.x},${u.y} L${r.x},${r.y} L${g.x},${g.y}`,
        });
    }
    if (t.lineDecoration.indexOf("arrow-end") !== -1) {
        const d = Ri(p, -c);
        const m = Si(s, d);
        const u = qe(s, 2, m);
        const g = qe(s, -2, m);
        Ne(o, {
            style: "display:block;",
            d: `M${u.x},${u.y} L${s.x},${s.y} L${g.x},${g.y}`,
        });
    }
};
const Uu = (e, t, i, a) => {
    Ne(e, {
        ...e.styles,
        fill: "none",
        d: Ou(
            t.points.map((n) => ({
                x: me(n.x, i, a, "width"),
                y: me(n.y, i, a, "height"),
            })),
        ),
    });
};
const yi = (e) => (t) => _t(e, { id: t.id });
const Wu = (e) => {
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
const Hu = (e) => {
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
const ju = {
    image: Wu,
    rect: yi("rect"),
    ellipse: yi("ellipse"),
    text: yi("text"),
    path: yi("path"),
    line: Hu,
};
const Yu = { rect: Du, ellipse: Cu, image: Nu, text: Vu, path: Uu, line: Gu };
const qu = (e, t) => ju[e](t);
const $u = (e, t, i, a, n) => {
    t !== "path" && (e.rect = wt(i, a, n)),
        (e.styles = ct(i, a, n)),
        Yu[t](e, i, a, n);
};
const Ro = (e, t) =>
    e[1].zIndex > t[1].zIndex ? 1 : e[1].zIndex < t[1].zIndex ? -1 : 0;
const Xu = (e, t = {}, i, a) =>
    new Promise((n) => {
        const { background: l = null } = a;
        const o = new FileReader();
        (o.onloadend = () => {
            const r = o.result;
            const s = document.createElement("div");
            (s.style.cssText =
                "position:absolute;pointer-events:none;width:0;height:0;visibility:hidden;"),
                (s.innerHTML = r);
            const p = s.querySelector("svg");
            document.body.appendChild(s);
            const c = p.getBBox();
            s.parentNode.removeChild(s);
            const d = s.querySelector("title");
            const m = p.getAttribute("viewBox") || "";
            const u = p.getAttribute("width") || "";
            const g = p.getAttribute("height") || "";
            const f = parseFloat(u) || null;
            const h = parseFloat(g) || null;
            const I = (u.match(/[a-z]+/) || [])[0] || "";
            const b = (g.match(/[a-z]+/) || [])[0] || "";
            const T = m.split(" ").map(parseFloat);
            const v = T.length
                ? { x: T[0], y: T[1], width: T[2], height: T[3] }
                : c;
            const y = f ?? v.width;
            const E = h ?? v.height;
            (p.style.overflow = "visible"),
                p.setAttribute("width", y),
                p.setAttribute("height", E);
            let _ = "";
            if (i && i.length) {
                const K = { width: y, height: E };
                (_ = i.sort(Ro).reduce((pe, k) => {
                    const H = qu(k[0], k[1]);
                    return (
                        $u(H, k[0], k[1], K),
                        H.removeAttribute("id"),
                        H.getAttribute("opacity") === 1 &&
                            H.removeAttribute("opacity"),
                        pe +
                            `
` +
                            H.outerHTML +
                            `
`
                    );
                }, "")),
                    (_ = `

<g>${_.replace(/&nbsp;/g, " ")}</g>

`);
            }
            const x = t.aspectRatio || E / y;
            const R = y;
            const z = R * x;
            const P = typeof t.scaleToFit > "u" || t.scaleToFit;
            const A = t.center ? t.center.x : 0.5;
            const B = t.center ? t.center.y : 0.5;
            const w = Io(
                { width: y, height: E },
                vo({ width: R, height: z }, x),
                t.rotation,
                P ? { x: A, y: B } : { x: 0.5, y: 0.5 },
            );
            const O = t.zoom * w;
            const S = t.rotation * (180 / Math.PI);
            const L = { x: R * 0.5, y: z * 0.5 };
            const D = { x: L.x - y * A, y: L.y - E * B };
            const F = [
                `rotate(${S} ${L.x} ${L.y})`,
                `translate(${L.x} ${L.y})`,
                `scale(${O})`,
                `translate(${-L.x} ${-L.y})`,
                `translate(${D.x} ${D.y})`,
            ];
            const G = t.flip && t.flip.horizontal;
            const C = t.flip && t.flip.vertical;
            const q = [
                `scale(${G ? -1 : 1} ${C ? -1 : 1})`,
                `translate(${G ? -y : 0} ${C ? -E : 0})`,
            ];
            const X = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${R}${I}" height="${z}${b}" 
viewBox="0 0 ${R} ${z}" ${l ? 'style="background:' + l + '" ' : ""}
preserveAspectRatio="xMinYMin"
xmlns:xlink="http://www.w3.org/1999/xlink"
xmlns="http://www.w3.org/2000/svg">
<!-- Generated by PQINA - https://pqina.nl/ -->
<title>${d ? d.textContent : ""}</title>
<g transform="${F.join(" ")}">
<g transform="${q.join(" ")}">
${p.outerHTML}${_}
</g>
</g>
</svg>`;
            n(X);
        }),
            o.readAsText(e);
    });
const Ku = (e) => {
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
const Qu = () => {
    const e = { resize: c, filter: p };
    const t = (d, m) => (
        d.forEach((u) => {
            m = e[u.type](m, u.data);
        }),
        m
    );
    const i = (d, m) => {
        let u = d.transforms;
        let g = null;
        if (
            (u.forEach((f) => {
                f.type === "filter" && (g = f);
            }),
            g)
        ) {
            let f = null;
            u.forEach((h) => {
                h.type === "resize" && (f = h);
            }),
                f &&
                    ((f.data.matrix = g.data),
                    (u = u.filter((h) => h.type !== "filter")));
        }
        m(t(u, d.imageData));
    };
    self.onmessage = (d) => {
        i(d.data.message, (m) => {
            self.postMessage({ id: d.data.id, message: m }, [m.data.buffer]);
        });
    };
    const a = 1;
    const n = 1;
    const l = 1;
    function o(d, m, u) {
        const g = m[d] / 255;
        const f = m[d + 1] / 255;
        const h = m[d + 2] / 255;
        const I = m[d + 3] / 255;
        const b = g * u[0] + f * u[1] + h * u[2] + I * u[3] + u[4];
        const T = g * u[5] + f * u[6] + h * u[7] + I * u[8] + u[9];
        const v = g * u[10] + f * u[11] + h * u[12] + I * u[13] + u[14];
        const y = g * u[15] + f * u[16] + h * u[17] + I * u[18] + u[19];
        const E = Math.max(0, b * y) + a * (1 - y);
        const _ = Math.max(0, T * y) + n * (1 - y);
        const x = Math.max(0, v * y) + l * (1 - y);
        (m[d] = Math.max(0, Math.min(1, E)) * 255),
            (m[d + 1] = Math.max(0, Math.min(1, _)) * 255),
            (m[d + 2] = Math.max(0, Math.min(1, x)) * 255);
    }
    const r = self.JSON.stringify([
        1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0,
    ]);
    function s(d) {
        return self.JSON.stringify(d || []) === r;
    }
    function p(d, m) {
        if (!m || s(m)) return d;
        const u = d.data;
        const g = u.length;
        const f = m[0];
        const h = m[1];
        const I = m[2];
        const b = m[3];
        const T = m[4];
        const v = m[5];
        const y = m[6];
        const E = m[7];
        const _ = m[8];
        const x = m[9];
        const R = m[10];
        const z = m[11];
        const P = m[12];
        const A = m[13];
        const B = m[14];
        const w = m[15];
        const O = m[16];
        const S = m[17];
        const L = m[18];
        const D = m[19];
        let F = 0;
        let G = 0;
        let C = 0;
        let q = 0;
        let X = 0;
        let K = 0;
        let pe = 0;
        let k = 0;
        let H = 0;
        let Y = 0;
        let oe = 0;
        let ee = 0;
        for (; F < g; F += 4) {
            (G = u[F] / 255),
                (C = u[F + 1] / 255),
                (q = u[F + 2] / 255),
                (X = u[F + 3] / 255),
                (K = G * f + C * h + q * I + X * b + T),
                (pe = G * v + C * y + q * E + X * _ + x),
                (k = G * R + C * z + q * P + X * A + B),
                (H = G * w + C * O + q * S + X * L + D),
                (Y = Math.max(0, K * H) + a * (1 - H)),
                (oe = Math.max(0, pe * H) + n * (1 - H)),
                (ee = Math.max(0, k * H) + l * (1 - H)),
                (u[F] = Math.max(0, Math.min(1, Y)) * 255),
                (u[F + 1] = Math.max(0, Math.min(1, oe)) * 255),
                (u[F + 2] = Math.max(0, Math.min(1, ee)) * 255);
        }
        return d;
    }
    function c(d, m) {
        let {
            mode: u = "contain",
            upscale: g = !1,
            width: f,
            height: h,
            matrix: I,
        } = m;
        if (((I = !I || s(I) ? null : I), !f && !h)) return p(d, I);
        if ((f === null ? (f = h) : h === null && (h = f), u !== "force")) {
            const A = f / d.width;
            const B = h / d.height;
            let w = 1;
            if (
                (u === "cover"
                    ? (w = Math.max(A, B))
                    : u === "contain" && (w = Math.min(A, B)),
                w > 1 && g === !1)
            ) {
                return p(d, I);
            }
            (f = d.width * w), (h = d.height * w);
        }
        const b = d.width;
        const T = d.height;
        const v = Math.round(f);
        const y = Math.round(h);
        const E = d.data;
        const _ = new Uint8ClampedArray(v * y * 4);
        const x = b / v;
        const R = T / y;
        const z = Math.ceil(x * 0.5);
        const P = Math.ceil(R * 0.5);
        for (let A = 0; A < y; A++) {
            for (let B = 0; B < v; B++) {
                const w = (B + A * v) * 4;
                let O = 0;
                let S = 0;
                let L = 0;
                let D = 0;
                let F = 0;
                let G = 0;
                let C = 0;
                const q = (A + 0.5) * R;
                for (let X = Math.floor(A * R); X < (A + 1) * R; X++) {
                    const K = Math.abs(q - (X + 0.5)) / P;
                    const pe = (B + 0.5) * x;
                    const k = K * K;
                    for (let H = Math.floor(B * x); H < (B + 1) * x; H++) {
                        let Y = Math.abs(pe - (H + 0.5)) / z;
                        const oe = Math.sqrt(k + Y * Y);
                        if (
                            oe >= -1 &&
                            oe <= 1 &&
                            ((O = 2 * oe * oe * oe - 3 * oe * oe + 1), O > 0)
                        ) {
                            Y = 4 * (H + X * b);
                            const ee = E[Y + 3];
                            (C += O * ee),
                                (L += O),
                                ee < 255 && (O = (O * ee) / 250),
                                (D += O * E[Y]),
                                (F += O * E[Y + 1]),
                                (G += O * E[Y + 2]),
                                (S += O);
                        }
                    }
                }
                (_[w] = D / S),
                    (_[w + 1] = F / S),
                    (_[w + 2] = G / S),
                    (_[w + 3] = C / L),
                    I && o(w, _, I);
            }
        }
        return { data: _, width: v, height: y };
    }
};
const Zu = (e, t) => {
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
const Ju = (e) => {
    const t = new DataView(e);
    if (t.getUint16(0) !== 65496) return null;
    let i = 2;
    let a;
    let n;
    let l = !1;
    for (
        ;
        i < t.byteLength &&
        ((a = t.getUint16(i, !1)),
        (n = t.getUint16(i + 2, !1) + 2),
        !(
            !((a >= 65504 && a <= 65519) || a === 65534) ||
            (l || (l = Zu(t, i, n)), i + n > t.byteLength)
        ));

    ) {
        i += n;
    }
    return e.slice(0, i);
};
const eg = (e) =>
    new Promise((t) => {
        const i = new FileReader();
        (i.onload = () => t(Ju(i.result) || null)),
            i.readAsArrayBuffer(e.slice(0, 256 * 1024));
    });
const tg = () =>
    (window.BlobBuilder =
        window.BlobBuilder ||
        window.WebKitBlobBuilder ||
        window.MozBlobBuilder ||
        window.MSBlobBuilder);
const ig = (e, t) => {
    const i = tg();
    if (i) {
        const a = new i();
        return a.append(e), a.getBlob(t);
    }
    return new Blob([e], { type: t });
};
const ag = () => Math.random().toString(36).substr(2, 9);
const ng = (e) => {
    const t = new Blob(["(", e.toString(), ")()"], {
        type: "application/javascript",
    });
    const i = URL.createObjectURL(t);
    const a = new Worker(i);
    const n = [];
    return {
        transfer: () => {},
        post: (l, o, r) => {
            const s = ag();
            (n[s] = o),
                (a.onmessage = (p) => {
                    const c = n[p.data.id];
                    c && (c(p.data.message), delete n[p.data.id]);
                }),
                a.postMessage({ id: s, message: l }, r);
        },
        terminate: () => {
            a.terminate(), URL.revokeObjectURL(i);
        },
    };
};
const lg = (e) =>
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
const og = (e) =>
    e.reduce(
        (t, i) => t.then((a) => i().then(Array.prototype.concat.bind(a))),
        Promise.resolve([]),
    );
const rg = (e, t) =>
    new Promise((i) => {
        const a = { width: e.width, height: e.height };
        const n = e.getContext("2d");
        const l = t.sort(Ro).map(
            (o) => () =>
                new Promise((r) => {
                    gg[o[0]](n, a, o[1], r) && r();
                }),
        );
        og(l).then(() => i(e));
    });
const Lt = (e, t) => {
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
const Mt = (e) => {
    e.fill(), e.stroke(), (e.globalAlpha = 1);
};
const sg = (e, t, i) => {
    const a = wt(i, t);
    const n = ct(i, t);
    return Lt(e, n), e.rect(a.x, a.y, a.width, a.height), Mt(e, n), !0;
};
const cg = (e, t, i) => {
    const a = wt(i, t);
    const n = ct(i, t);
    Lt(e, n);
    const l = a.x;
    const o = a.y;
    const r = a.width;
    const s = a.height;
    const p = 0.5522848;
    const c = (r / 2) * p;
    const d = (s / 2) * p;
    const m = l + r;
    const u = o + s;
    const g = l + r / 2;
    const f = o + s / 2;
    return (
        e.moveTo(l, f),
        e.bezierCurveTo(l, f - d, g - c, o, g, o),
        e.bezierCurveTo(g + c, o, m, f - d, m, f),
        e.bezierCurveTo(m, f + d, g + c, u, g, u),
        e.bezierCurveTo(g - c, u, l, f + d, l, f),
        Mt(e, n),
        !0
    );
};
const dg = (e, t, i, a) => {
    const n = wt(i, t);
    const l = ct(i, t);
    Lt(e, l);
    const o = new Image();
    new URL(i.src, window.location.href).origin !== window.location.origin &&
        (o.crossOrigin = ""),
        (o.onload = () => {
            if (i.fit === "cover") {
                const s = n.width / n.height;
                const p = s > 1 ? o.width : o.height * s;
                const c = s > 1 ? o.width / s : o.height;
                const d = o.width * 0.5 - p * 0.5;
                const m = o.height * 0.5 - c * 0.5;
                e.drawImage(o, d, m, p, c, n.x, n.y, n.width, n.height);
            } else if (i.fit === "contain") {
                const s = Math.min(n.width / o.width, n.height / o.height);
                const p = s * o.width;
                const c = s * o.height;
                const d = n.x + n.width * 0.5 - p * 0.5;
                const m = n.y + n.height * 0.5 - c * 0.5;
                e.drawImage(o, 0, 0, o.width, o.height, d, m, p, c);
            } else {
                e.drawImage(
                    o,
                    0,
                    0,
                    o.width,
                    o.height,
                    n.x,
                    n.y,
                    n.width,
                    n.height,
                );
            }
            Mt(e, l), a();
        }),
        (o.src = i.src);
};
const pg = (e, t, i) => {
    const a = wt(i, t);
    const n = ct(i, t);
    Lt(e, n);
    const l = me(i.fontSize, t);
    const o = i.fontFamily || "sans-serif";
    const r = i.fontWeight || "normal";
    const s = i.textAlign || "left";
    return (
        (e.font = `${r} ${l}px ${o}`),
        (e.textAlign = s),
        e.fillText(i.text, a.x, a.y),
        Mt(e, n),
        !0
    );
};
const mg = (e, t, i) => {
    const a = ct(i, t);
    Lt(e, a), e.beginPath();
    const n = i.points.map((o) => ({
        x: me(o.x, t, 1, "width"),
        y: me(o.y, t, 1, "height"),
    }));
    e.moveTo(n[0].x, n[0].y);
    const l = n.length;
    for (let o = 1; o < l; o++) e.lineTo(n[o].x, n[o].y);
    return Mt(e, a), !0;
};
const ug = (e, t, i) => {
    const a = wt(i, t);
    const n = ct(i, t);
    Lt(e, n), e.beginPath();
    const l = { x: a.x, y: a.y };
    const o = { x: a.x + a.width, y: a.y + a.height };
    e.moveTo(l.x, l.y), e.lineTo(o.x, o.y);
    const r = yo({ x: o.x - l.x, y: o.y - l.y });
    const s = 0.04 * Math.min(t.width, t.height);
    if (i.lineDecoration.indexOf("arrow-begin") !== -1) {
        const p = Ri(r, s);
        const c = Si(l, p);
        const d = qe(l, 2, c);
        const m = qe(l, -2, c);
        e.moveTo(d.x, d.y), e.lineTo(l.x, l.y), e.lineTo(m.x, m.y);
    }
    if (i.lineDecoration.indexOf("arrow-end") !== -1) {
        const p = Ri(r, -s);
        const c = Si(o, p);
        const d = qe(o, 2, c);
        const m = qe(o, -2, c);
        e.moveTo(d.x, d.y), e.lineTo(o.x, o.y), e.lineTo(m.x, m.y);
    }
    return Mt(e, n), !0;
};
var gg = { rect: sg, ellipse: cg, image: dg, text: pg, line: ug, path: mg };
const fg = (e) => {
    const t = document.createElement("canvas");
    return (
        (t.width = e.width),
        (t.height = e.height),
        t.getContext("2d").putImageData(e, 0, 0),
        t
    );
};
const hg = (e, t, i = {}) =>
    new Promise((a, n) => {
        if (!e || !yu(e)) return n({ status: "not an image file", file: e });
        const {
            stripImageHead: l,
            beforeCreateBlob: o,
            afterCreateBlob: r,
            canvasMemoryLimit: s,
        } = i;
        const { crop: p, size: c, filter: d, markup: m, output: u } = t;
        const g =
            t.image && t.image.orientation
                ? Math.max(1, Math.min(8, t.image.orientation))
                : null;
        const f = u && u.quality;
        const h = f === null ? null : f / 100;
        const I = (u && u.type) || null;
        const b = (u && u.background) || null;
        const T = [];
        c &&
            (typeof c.width === "number" || typeof c.height === "number") &&
            T.push({ type: "resize", data: c }),
            d && d.length === 20 && T.push({ type: "filter", data: d });
        const v = (_) => {
            const x = r ? r(_) : _;
            Promise.resolve(x).then(a);
        };
        const y = (_, x) => {
            const R = fg(_);
            const z = m.length ? rg(R, m) : R;
            Promise.resolve(z).then((P) => {
                zu(P, x, o)
                    .then((A) => {
                        if ((xo(P), l)) return v(A);
                        eg(e).then((B) => {
                            B !== null &&
                                (A = new Blob([B, A.slice(20)], {
                                    type: A.type,
                                })),
                                v(A);
                        });
                    })
                    .catch(n);
            });
        };
        if (/svg/.test(e.type) && I === null) {
            return Xu(e, p, m, { background: b }).then((_) => {
                a(ig(_, "image/svg+xml"));
            });
        }
        const E = URL.createObjectURL(e);
        lg(E)
            .then((_) => {
                URL.revokeObjectURL(E);
                const x = Au(_, g, p, { canvasMemoryLimit: s, background: b });
                const R = { quality: h, type: I || e.type };
                if (!T.length) return y(x, R);
                const z = ng(Qu);
                z.post(
                    { transforms: T, imageData: x },
                    (P) => {
                        y(Ku(P), R), z.terminate();
                    },
                    [x.data.buffer],
                );
            })
            .catch(n);
    });
const bg = ["x", "y", "left", "top", "right", "bottom", "width", "height"];
const Eg = (e) =>
    typeof e === "string" && /%/.test(e) ? parseFloat(e) / 100 : e;
const Tg = (e) => {
    const [t, i] = e;
    const a = i.points ? {} : bg.reduce((n, l) => ((n[l] = Eg(i[l])), n), {});
    return [t, { zIndex: 0, ...i, ...a }];
};
const Ig = (e) =>
    new Promise((t, i) => {
        const a = new Image();
        a.src = URL.createObjectURL(e);
        const n = () => {
            const o = a.naturalWidth;
            const r = a.naturalHeight;
            o &&
                r &&
                (URL.revokeObjectURL(a.src),
                clearInterval(l),
                t({ width: o, height: r }));
        };
        a.onerror = (o) => {
            URL.revokeObjectURL(a.src), clearInterval(l), i(o);
        };
        const l = setInterval(n, 1);
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
                    const l = atob(n);
                    let o = l.length;
                    const r = new Uint8Array(o);
                    for (; o--; ) r[o] = l.charCodeAt(o);
                    e(new Blob([r], { type: t || "image/png" }));
                });
            },
        }));
const La = typeof window < "u" && typeof window.document < "u";
const vg =
    La && /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
const So = ({ addFilter: e, utils: t }) => {
    const { Type: i, forin: a, getFileFromBlob: n, isFile: l } = t;
    const o = ["crop", "resize", "filter", "markup", "output"];
    const r = (c) => (d, m, u) => d(m, c ? c(u) : u);
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
            new Promise((m) => {
                m(!d("IS_ASYNC"));
            }),
    );
    const p = (c, d, m) =>
        new Promise((u) => {
            if (
                !c("GET_ALLOW_IMAGE_TRANSFORM") ||
                m.archived ||
                !l(d) ||
                !Eu(d)
            ) {
                return u(!1);
            }
            Ig(d)
                .then(() => {
                    const g = c("GET_IMAGE_TRANSFORM_IMAGE_FILTER");
                    if (g) {
                        const f = g(d);
                        if (f == null) return handleRevert(!0);
                        if (typeof f === "boolean") return u(f);
                        if (typeof f.then === "function") return f.then(u);
                    }
                    u(!0);
                })
                .catch((g) => {
                    u(!1);
                });
        });
    return (
        e("DID_CREATE_ITEM", (c, { query: d, dispatch: m }) => {
            d("GET_ALLOW_IMAGE_TRANSFORM") &&
                c.extend(
                    "requestPrepare",
                    () =>
                        new Promise((u, g) => {
                            m(
                                "REQUEST_PREPARE_OUTPUT",
                                {
                                    query: c.id,
                                    item: c,
                                    success: u,
                                    failure: g,
                                },
                                !0,
                            );
                        }),
                );
        }),
        e(
            "PREPARE_OUTPUT",
            (c, { query: d, item: m }) =>
                new Promise((u) => {
                    p(d, c, m).then((g) => {
                        if (!g) return u(c);
                        const f = [];
                        d("GET_IMAGE_TRANSFORM_VARIANTS_INCLUDE_ORIGINAL") &&
                            f.push(
                                () =>
                                    new Promise((x) => {
                                        x({
                                            name: d(
                                                "GET_IMAGE_TRANSFORM_VARIANTS_ORIGINAL_NAME",
                                            ),
                                            file: c,
                                        });
                                    }),
                            ),
                            d("GET_IMAGE_TRANSFORM_VARIANTS_INCLUDE_DEFAULT") &&
                                f.push(
                                    (x, R, z) =>
                                        new Promise((P) => {
                                            x(R, z).then((A) =>
                                                P({
                                                    name: d(
                                                        "GET_IMAGE_TRANSFORM_VARIANTS_DEFAULT_NAME",
                                                    ),
                                                    file: A,
                                                }),
                                            );
                                        }),
                                );
                        const h = d("GET_IMAGE_TRANSFORM_VARIANTS") || {};
                        a(h, (x, R) => {
                            const z = r(R);
                            f.push(
                                (P, A, B) =>
                                    new Promise((w) => {
                                        z(P, A, B).then((O) =>
                                            w({ name: x, file: O }),
                                        );
                                    }),
                            );
                        });
                        const I = d("GET_IMAGE_TRANSFORM_OUTPUT_QUALITY");
                        const b = d("GET_IMAGE_TRANSFORM_OUTPUT_QUALITY_MODE");
                        const T = I === null ? null : I / 100;
                        const v = d("GET_IMAGE_TRANSFORM_OUTPUT_MIME_TYPE");
                        const y =
                            d("GET_IMAGE_TRANSFORM_CLIENT_TRANSFORMS") || o;
                        m.setMetadata(
                            "output",
                            { type: v, quality: T, client: y },
                            !0,
                        );
                        const E = (x, R) =>
                            new Promise((z, P) => {
                                const A = { ...R };
                                Object.keys(A)
                                    .filter((C) => C !== "exif")
                                    .forEach((C) => {
                                        y.indexOf(C) === -1 && delete A[C];
                                    });
                                const {
                                    resize: B,
                                    exif: w,
                                    output: O,
                                    crop: S,
                                    filter: L,
                                    markup: D,
                                } = A;
                                const F = {
                                    image: {
                                        orientation: w ? w.orientation : null,
                                    },
                                    output:
                                        O &&
                                        (O.type ||
                                            typeof O.quality === "number" ||
                                            O.background)
                                            ? {
                                                  type: O.type,
                                                  quality:
                                                      typeof O.quality ===
                                                      "number"
                                                          ? O.quality * 100
                                                          : null,
                                                  background:
                                                      O.background ||
                                                      d(
                                                          "GET_IMAGE_TRANSFORM_CANVAS_BACKGROUND_COLOR",
                                                      ) ||
                                                      null,
                                              }
                                            : void 0,
                                    size:
                                        B && (B.size.width || B.size.height)
                                            ? {
                                                  mode: B.mode,
                                                  upscale: B.upscale,
                                                  ...B.size,
                                              }
                                            : void 0,
                                    crop: S && !s(S) ? { ...S } : void 0,
                                    markup: D && D.length ? D.map(Tg) : [],
                                    filter: L,
                                };
                                if (F.output) {
                                    const C = O.type ? O.type !== x.type : !1;
                                    const q = /\/jpe?g$/.test(x.type);
                                    const X =
                                        O.quality !== null
                                            ? q && b === "always"
                                            : !1;
                                    if (
                                        !(
                                            F.size ||
                                            F.crop ||
                                            F.filter ||
                                            C ||
                                            X
                                        )
                                    ) {
                                        return z(x);
                                    }
                                }
                                const G = {
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
                                hg(x, F, G)
                                    .then((C) => {
                                        const q = n(C, vu(x.name, xu(C.type)));
                                        z(q);
                                    })
                                    .catch(P);
                            });
                        const _ = f.map((x) => x(E, c, m.getMetadata()));
                        Promise.all(_).then((x) => {
                            u(
                                x.length === 1 && x[0].name === null
                                    ? x[0].file
                                    : x,
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
                    La && vg ? 4096 * 4096 : null,
                    i.INT,
                ],
                imageTransformCanvasBackgroundColor: [null, i.STRING],
            },
        }
    );
};
La &&
    document.dispatchEvent(
        new CustomEvent("FilePond:pluginloaded", { detail: So }),
    );
const _o = So;
const Ma = (e) => /^video/.test(e.type);
const Xt = (e) => /^audio/.test(e.type);
const Aa = class {
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
const xg = (e) =>
    e.utils.createView({
        name: "media-preview",
        tag: "div",
        ignoreRect: !0,
        create: ({ root: t, props: i }) => {
            const { id: a } = i;
            const n = t.query("GET_ITEM", { id: i.id });
            const l = Xt(n.file) ? "audio" : "video";
            if (
                ((t.ref.media = document.createElement(l)),
                t.ref.media.setAttribute("controls", !0),
                t.element.appendChild(t.ref.media),
                Xt(n.file))
            ) {
                const o = document.createDocumentFragment();
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
                    o.appendChild(t.ref.audio.container),
                    t.element.appendChild(o);
            }
        },
        write: e.utils.createRoute({
            DID_MEDIA_PREVIEW_LOAD: ({ root: t, props: i }) => {
                const { id: a } = i;
                const n = t.query("GET_ITEM", { id: i.id });
                if (!n) return;
                const l = window.URL || window.webkitURL;
                const o = new Blob([n.file], { type: n.file.type });
                (t.ref.media.type = n.file.type),
                    (t.ref.media.src =
                        (n.file.mock && n.file.url) || l.createObjectURL(o)),
                    Xt(n.file) && new Aa(t.ref.media, t.ref.audio),
                    t.ref.media.addEventListener(
                        "loadeddata",
                        () => {
                            let r = 75;
                            if (Ma(n.file)) {
                                const s = t.ref.media.offsetWidth;
                                const p = t.ref.media.videoWidth / s;
                                r = t.ref.media.videoHeight / p;
                            }
                            t.dispatch("DID_UPDATE_PANEL_HEIGHT", {
                                id: i.id,
                                height: r,
                            });
                        },
                        !1,
                    );
            },
        }),
    });
const yg = (e) => {
    const t = ({ root: a, props: n }) => {
        const { id: l } = n;
        a.query("GET_ITEM", l) &&
            a.dispatch("DID_MEDIA_PREVIEW_LOAD", { id: l });
    };
    const i = ({ root: a, props: n }) => {
        const l = xg(e);
        a.ref.media = a.appendChildView(a.createChildView(l, { id: n.id }));
    };
    return e.utils.createView({
        name: "media-preview-wrapper",
        create: i,
        write: e.utils.createRoute({ DID_MEDIA_PREVIEW_CONTAINER_CREATE: t }),
    });
};
const Pa = (e) => {
    const { addFilter: t, utils: i } = e;
    const { Type: a, createRoute: n } = i;
    const l = yg(e);
    return (
        t("CREATE_VIEW", (o) => {
            const { is: r, view: s, query: p } = o;
            if (!r("file")) return;
            const c = ({ root: d, props: m }) => {
                const { id: u } = m;
                const g = p("GET_ITEM", u);
                const f = p("GET_ALLOW_VIDEO_PREVIEW");
                const h = p("GET_ALLOW_AUDIO_PREVIEW");
                !g ||
                    g.archived ||
                    ((!Ma(g.file) || !f) && (!Xt(g.file) || !h)) ||
                    ((d.ref.mediaPreview = s.appendChildView(
                        s.createChildView(l, { id: u }),
                    )),
                    d.dispatch("DID_MEDIA_PREVIEW_CONTAINER_CREATE", {
                        id: u,
                    }));
            };
            s.registerWriter(
                n({ DID_LOAD_ITEM: c }, ({ root: d, props: m }) => {
                    const { id: u } = m;
                    const g = p("GET_ITEM", u);
                    const f = d.query("GET_ALLOW_VIDEO_PREVIEW");
                    const h = d.query("GET_ALLOW_AUDIO_PREVIEW");
                    !g ||
                        ((!Ma(g.file) || !f) && (!Xt(g.file) || !h)) ||
                        d.rect.element.hidden;
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
const Rg = typeof window < "u" && typeof window.document < "u";
Rg &&
    document.dispatchEvent(
        new CustomEvent("FilePond:pluginloaded", { detail: Pa }),
    );
const wo = {
    labelIdle:
        '\u134B\u12ED\u120E\u127D \u1235\u1260\u12CD \u12A5\u12DA\u1205 \u130B\u122D \u12ED\u120D\u1240\u1241\u1275 \u12C8\u12ED\u121D \u134B\u12ED\u1209\u1295 <span class="filepond--label-action"> \u12ED\u121D\u1228\u1321 </span>',
    labelInvalidField:
        "\u1218\u1235\u12A9 \u120D\u12AD \u12EB\u120D\u1206\u1291 \u134B\u12ED\u120E\u127D\u1295 \u12ED\u12DF\u120D",
    labelFileWaitingForSize:
        "\u12E8\u134B\u12ED\u1209\u1295 \u1218\u1320\u1295 \u1260\u1218\u1320\u1263\u1260\u1245 \u120B\u12ED",
    labelFileSizeNotAvailable:
        "\u12E8\u134B\u12ED\u1209\u1295 \u1218\u1320\u1295 \u120A\u1308\u129D \u12A0\u120D\u127B\u1208\u121D",
    labelFileLoading: "\u1260\u121B\u1295\u1260\u1265 \u120B\u12ED",
    labelFileLoadError:
        "\u1260\u121B\u1295\u1260\u1265 \u120B\u12ED \u127D\u130D\u122D \u1270\u1348\u1325\u122F\u120D",
    labelFileProcessing:
        "\u134B\u12ED\u1209\u1295 \u1260\u1218\u132B\u1295 \u120B\u12ED",
    labelFileProcessingComplete:
        "\u134B\u12ED\u1209\u1295 \u1218\u132B\u1295 \u1270\u1320\u1293\u1245\u124B\u120D",
    labelFileProcessingAborted:
        "\u134B\u12ED\u1209\u1295 \u1218\u132B\u1295 \u1270\u124B\u122D\u1327\u120D",
    labelFileProcessingError:
        "\u134B\u12ED\u1209\u1295 \u1260\u1218\u132B\u1295 \u120B\u12ED \u127D\u130D\u122D \u1270\u1348\u1325\u122F\u120D",
    labelFileProcessingRevertError:
        "\u1348\u12ED\u1209\u1295 \u1260\u1218\u1240\u120D\u1260\u1235 \u120B\u12ED \u127D\u130D\u122D \u1270\u1348\u1325\u122F\u120D",
    labelFileRemoveError:
        "\u1260\u121B\u1325\u134B\u1275 \u120B\u12ED \u127D\u130D\u122D \u1270\u1348\u1325\u122F\u120D",
    labelTapToCancel:
        "\u1208\u121B\u124B\u1228\u1325 \u1290\u12AB \u12EB\u12F5\u122D\u1309",
    labelTapToRetry:
        "\u12F0\u130D\u121E \u1208\u1218\u121E\u12A8\u122D \u1290\u12AB \u12EB\u12F5\u122D\u1309",
    labelTapToUndo:
        "\u12C8\u12F0\u1290\u1260\u1228\u1260\u1275 \u1208\u1218\u1218\u1208\u1235 \u1290\u12AB \u12EB\u12F5\u122D\u1309",
    labelButtonRemoveItem: "\u120B\u1325\u134B",
    labelButtonAbortItemLoad: "\u120B\u124B\u122D\u1325",
    labelButtonRetryItemLoad: "\u12F0\u130D\u121C \u120D\u121E\u12AD\u122D",
    labelButtonAbortItemProcessing: "\u12ED\u1245\u122D",
    labelButtonUndoItemProcessing:
        "\u12C8\u12F0\u1290\u1260\u1228\u1260\u1275 \u120D\u1218\u120D\u1235",
    labelButtonRetryItemProcessing:
        "\u12F0\u130D\u121C \u120D\u121E\u12AD\u122D",
    labelButtonProcessItem: "\u120D\u132B\u1295",
    labelMaxFileSizeExceeded: "\u134B\u12ED\u1209 \u1270\u120D\u124B\u120D",
    labelMaxFileSize:
        "\u12E8\u134B\u12ED\u120D \u1218\u1320\u1295 \u12A8 {filesize} \u1218\u1265\u1208\u1325 \u12A0\u12ED\u1348\u1240\u12F5\u121D",
    labelMaxTotalFileSizeExceeded:
        "\u12E8\u121A\u1348\u1240\u12F0\u12CD\u1295 \u1320\u1245\u120B\u120B \u12E8\u134B\u12ED\u120D \u1218\u1320\u1295 \u12A0\u120D\u1348\u12CB\u120D",
    labelMaxTotalFileSize:
        "\u1320\u1245\u120B\u120B \u12E8\u134B\u12ED\u120D \u1218\u1320\u1295 \u12A8 {filesize} \u1218\u1265\u1208\u1325 \u12A0\u12ED\u1348\u1240\u12F5\u121D",
    labelFileTypeNotAllowed:
        "\u12E8\u1270\u1233\u1233\u1270 \u12E8\u134B\u12ED\u120D \u12A0\u12ED\u1290\u1275 \u1290\u12CD",
    fileValidateTypeLabelExpectedTypes:
        "\u12E8\u134B\u12ED\u120D \u12A0\u12ED\u1290\u1271 \u1218\u1206\u1295 \u12E8\u121A\u1308\u1263\u12CD {allButLastType} \u12A5\u1293 {lastType} \u1290\u12CD",
    imageValidateSizeLabelFormatError:
        "\u12E8\u121D\u1235\u120D \u12A0\u12ED\u1290\u1271 \u1208\u1218\u132B\u1295 \u12A0\u12ED\u1206\u1295\u121D",
    imageValidateSizeLabelImageSizeTooSmall:
        "\u121D\u1235\u1209 \u1260\u1323\u121D \u12A0\u1295\u1237\u120D",
    imageValidateSizeLabelImageSizeTooBig:
        "\u121D\u1235\u1209 \u1260\u1323\u121D \u1270\u120D\u124B\u120D",
    imageValidateSizeLabelExpectedMinSize:
        "\u12DD\u1245\u1270\u129B\u12CD \u12E8\u121D\u1235\u120D \u120D\u12AC\u1275 {minWidth} \xD7 {minHeight} \u1290\u12CD",
    imageValidateSizeLabelExpectedMaxSize:
        "\u12A8\u134D\u1270\u129B\u12CD \u12E8\u121D\u1235\u120D \u120D\u12AC\u1275 {maxWidth} \xD7 {maxHeight} \u1290\u12CD",
    imageValidateSizeLabelImageResolutionTooLow:
        "\u12E8\u121D\u1235\u1209 \u1325\u122B\u1275 \u1260\u1323\u121D \u12DD\u1245\u1270\u129B \u1290\u12CD",
    imageValidateSizeLabelImageResolutionTooHigh:
        "\u12E8\u121D\u1235\u1209 \u1325\u122B\u1275 \u1260\u1323\u121D \u12A8\u134D\u1270\u129B \u1290\u12CD",
    imageValidateSizeLabelExpectedMinResolution:
        "\u12DD\u1245\u1270\u129B\u12CD \u12E8\u121D\u1235\u120D \u1325\u122B\u1275 {minResolution} \u1290\u12CD",
    imageValidateSizeLabelExpectedMaxResolution:
        "\u12A8\u134D\u1270\u129B\u12CD \u12E8\u121D\u1235\u120D \u1325\u122B\u1275 {maxResolution} \u1290\u12CD",
};
const Lo = {
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
const Mo = {
    labelIdle:
        'Fayl\u0131n\u0131z\u0131 S\xFCr\xFC\u015Fd\xFCr\xFCn & Burax\u0131n ya da <span class="filepond--label-action"> Se\xE7in </span>',
    labelInvalidField: "Sah\u0259d\u0259 etibars\u0131z fayllar var",
    labelFileWaitingForSize: "\xD6l\xE7\xFC hesablan\u0131r",
    labelFileSizeNotAvailable: "\xD6l\xE7\xFC m\xF6vcud deyil",
    labelFileLoading: "Y\xFCkl\u0259nir",
    labelFileLoadError:
        "Y\xFCkl\u0259m\u0259 \u0259snas\u0131nda x\u0259ta ba\u015F verdi",
    labelFileProcessing: "Y\xFCkl\u0259nir",
    labelFileProcessingComplete: "Y\xFCkl\u0259m\u0259 tamamland\u0131",
    labelFileProcessingAborted: "Y\xFCkl\u0259m\u0259 l\u0259\u011Fv edildi",
    labelFileProcessingError:
        "Y\xFCk\u0259y\u0259rk\u0259n x\u0259ta ba\u015F verdi",
    labelFileProcessingRevertError:
        "Geri \xE7\u0259k\u0259rk\u0259n x\u0259ta ba\u015F verdi",
    labelFileRemoveError: "\xC7\u0131xarark\u0259n x\u0259ta ba\u015F verdi",
    labelTapToCancel: "\u0130mtina etm\u0259k \xFC\xE7\xFCn klikl\u0259yin",
    labelTapToRetry: "T\u0259krar yoxlamaq \xFC\xE7\xFCn klikl\u0259yin",
    labelTapToUndo: "Geri almaq \xFC\xE7\xFCn klikl\u0259yin",
    labelButtonRemoveItem: "\xC7\u0131xar",
    labelButtonAbortItemLoad: "\u0130mtina Et",
    labelButtonRetryItemLoad: "T\u0259krar yoxla",
    labelButtonAbortItemProcessing: "\u0130mtina et",
    labelButtonUndoItemProcessing: "Geri Al",
    labelButtonRetryItemProcessing: "T\u0259krar yoxla",
    labelButtonProcessItem: "Y\xFCkl\u0259",
    labelMaxFileSizeExceeded: "Fayl \xE7ox b\xF6y\xFCkd\xFCr",
    labelMaxFileSize: "\u018Fn b\xF6y\xFCk fayl \xF6l\xE7\xFCs\xFC: {filesize}",
    labelMaxTotalFileSizeExceeded: "Maksimum \xF6l\xE7\xFC ke\xE7ildi",
    labelMaxTotalFileSize: "Maksimum fayl \xF6l\xE7\xFCs\xFC :{filesize}",
    labelFileTypeNotAllowed: "Etibars\u0131z fayl tipi",
    fileValidateTypeLabelExpectedTypes:
        "Bu {allButLastType} ya da bu fayl olmas\u0131 laz\u0131md\u0131r: {lastType}",
    imageValidateSizeLabelFormatError:
        "\u015E\u0259kil tipi d\u0259st\u0259kl\u0259nmir",
    imageValidateSizeLabelImageSizeTooSmall: "\u015E\u0259kil \xE7ox ki\xE7ik",
    imageValidateSizeLabelImageSizeTooBig: "\u015E\u0259kil \xE7ox b\xF6y\xFCk",
    imageValidateSizeLabelExpectedMinSize:
        "Minimum \xF6l\xE7\xFC {minWidth} \xD7 {minHeight}",
    imageValidateSizeLabelExpectedMaxSize:
        "Maksimum \xF6l\xE7\xFC {maxWidth} \xD7 {maxHeight}",
    imageValidateSizeLabelImageResolutionTooLow:
        "G\xF6r\xFCnt\xFC imkan\u0131 \xE7ox a\u015Fa\u011F\u0131",
    imageValidateSizeLabelImageResolutionTooHigh:
        "G\xF6r\xFCnt\xFC imkan\u0131 \xE7ox y\xFCks\u0259k",
    imageValidateSizeLabelExpectedMinResolution:
        "Minimum g\xF6r\xFCnt\xFC imkan\u0131 {minResolution}",
    imageValidateSizeLabelExpectedMaxResolution:
        "Maximum g\xF6r\xFCnt\xFC imkan\u0131 {maxResolution}",
};
const Ao = {
    labelIdle:
        'Arrossega i deixa anar els teus fitxers o <span class="filepond--label-action"> Navega </span>',
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
const Po = {
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
const zo = {
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
const Oo = {
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
const Fo = {
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
const Do = {
    labelIdle:
        '\u03A3\u03CD\u03C1\u03B5\u03C4\u03B5 \u03C4\u03B1 \u03B1\u03C1\u03C7\u03B5\u03AF\u03B1 \u03C3\u03B1\u03C2 \u03C3\u03C4\u03BF \u03C0\u03BB\u03B1\u03AF\u03C3\u03B9\u03BF \u03AE <span class="filepond--label-action"> \u0395\u03C0\u03B9\u03BB\u03AD\u03BE\u03C4\u03B5 </span>',
    labelInvalidField:
        "\u03A4\u03BF \u03C0\u03B5\u03B4\u03AF\u03BF \u03C0\u03B5\u03C1\u03B9\u03AD\u03C7\u03B5\u03B9 \u03BC\u03B7 \u03AD\u03B3\u03BA\u03C5\u03C1\u03B1 \u03B1\u03C1\u03C7\u03B5\u03AF\u03B1",
    labelFileWaitingForSize:
        "\u03A3\u03B5 \u03B1\u03BD\u03B1\u03BC\u03BF\u03BD\u03AE \u03B3\u03B9\u03B1 \u03C4\u03BF \u03BC\u03AD\u03B3\u03B5\u03B8\u03BF\u03C2",
    labelFileSizeNotAvailable:
        "\u039C\u03AD\u03B3\u03B5\u03B8\u03BF\u03C2 \u03BC\u03B7 \u03B4\u03B9\u03B1\u03B8\u03AD\u03C3\u03B9\u03BC\u03BF",
    labelFileLoading:
        "\u03A6\u03CC\u03C1\u03C4\u03C9\u03C3\u03B7 \u03C3\u03B5 \u03B5\u03BE\u03AD\u03BB\u03B9\u03BE\u03B7",
    labelFileLoadError:
        "\u03A3\u03C6\u03AC\u03BB\u03BC\u03B1 \u03BA\u03B1\u03C4\u03AC \u03C4\u03B7 \u03C6\u03CC\u03C1\u03C4\u03C9\u03C3\u03B7",
    labelFileProcessing:
        "\u0395\u03C0\u03B5\u03BE\u03B5\u03C1\u03B3\u03B1\u03C3\u03AF\u03B1",
    labelFileProcessingComplete:
        "\u0397 \u03B5\u03C0\u03B5\u03BE\u03B5\u03C1\u03B3\u03B1\u03C3\u03AF\u03B1 \u03BF\u03BB\u03BF\u03BA\u03BB\u03B7\u03C1\u03CE\u03B8\u03B7\u03BA\u03B5",
    labelFileProcessingAborted:
        "\u0397 \u03B5\u03C0\u03B5\u03BE\u03B5\u03C1\u03B3\u03B1\u03C3\u03AF\u03B1 \u03B1\u03BA\u03C5\u03C1\u03CE\u03B8\u03B7\u03BA\u03B5",
    labelFileProcessingError:
        "\u03A3\u03C6\u03AC\u03BB\u03BC\u03B1 \u03BA\u03B1\u03C4\u03AC \u03C4\u03B7\u03BD \u03B5\u03C0\u03B5\u03BE\u03B5\u03C1\u03B3\u03B1\u03C3\u03AF\u03B1",
    labelFileProcessingRevertError:
        "\u03A3\u03C6\u03AC\u03BB\u03BC\u03B1 \u03BA\u03B1\u03C4\u03AC \u03C4\u03B7\u03BD \u03B5\u03C0\u03B1\u03BD\u03B1\u03C6\u03BF\u03C1\u03AC",
    labelFileRemoveError:
        "\u03A3\u03C6\u03AC\u03BB\u03BC\u03B1 \u03BA\u03B1\u03C4\u03AC \u03C4\u03B7\u03BD \u03B4\u03B9\u03B1\u03B3\u03C1\u03B1\u03C6\u03AE",
    labelTapToCancel:
        "\u03C0\u03B1\u03C4\u03AE\u03C3\u03C4\u03B5 \u03B3\u03B9\u03B1 \u03B1\u03BA\u03CD\u03C1\u03C9\u03C3\u03B7",
    labelTapToRetry:
        "\u03C0\u03B1\u03C4\u03AE\u03C3\u03C4\u03B5 \u03B3\u03B9\u03B1 \u03B5\u03C0\u03B1\u03BD\u03AC\u03BB\u03B7\u03C8\u03B7",
    labelTapToUndo:
        "\u03C0\u03B1\u03C4\u03AE\u03C3\u03C4\u03B5 \u03B3\u03B9\u03B1 \u03B1\u03BD\u03B1\u03AF\u03C1\u03B5\u03C3\u03B7",
    labelButtonRemoveItem: "\u0391\u03C6\u03B1\u03AF\u03C1\u03B5\u03C3\u03B7",
    labelButtonAbortItemLoad: "\u0391\u03BA\u03CD\u03C1\u03C9\u03C3\u03B7",
    labelButtonRetryItemLoad:
        "\u0395\u03C0\u03B1\u03BD\u03AC\u03BB\u03B7\u03C8\u03B7",
    labelButtonAbortItemProcessing:
        "\u0391\u03BA\u03CD\u03C1\u03C9\u03C3\u03B7",
    labelButtonUndoItemProcessing:
        "\u0391\u03BD\u03B1\u03AF\u03C1\u03B5\u03C3\u03B7",
    labelButtonRetryItemProcessing:
        "\u0395\u03C0\u03B1\u03BD\u03AC\u03BB\u03B7\u03C8\u03B7",
    labelButtonProcessItem:
        "\u039C\u03B5\u03C4\u03B1\u03C6\u03CC\u03C1\u03C4\u03C9\u03C3\u03B7",
    labelMaxFileSizeExceeded:
        "\u03A4\u03BF \u03B1\u03C1\u03C7\u03B5\u03AF\u03BF \u03B5\u03AF\u03BD\u03B1\u03B9 \u03C0\u03BF\u03BB\u03CD \u03BC\u03B5\u03B3\u03AC\u03BB\u03BF",
    labelMaxFileSize:
        "\u03A4\u03BF \u03BC\u03AD\u03B3\u03B9\u03C3\u03C4\u03BF \u03BC\u03AD\u03B3\u03B5\u03B8\u03BF\u03C2 \u03B1\u03C1\u03C7\u03B5\u03AF\u03BF\u03C5 \u03B5\u03AF\u03BD\u03B1\u03B9 {filesize}",
    labelMaxTotalFileSizeExceeded:
        "\u03A5\u03C0\u03AD\u03C1\u03B2\u03B1\u03C3\u03B7 \u03C4\u03BF\u03C5 \u03BC\u03AD\u03B3\u03B9\u03C3\u03C4\u03BF\u03C5 \u03C3\u03C5\u03BD\u03BF\u03BB\u03B9\u03BA\u03BF\u03CD \u03BC\u03B5\u03B3\u03AD\u03B8\u03BF\u03C5\u03C2",
    labelMaxTotalFileSize:
        "\u03A4\u03BF \u03BC\u03AD\u03B3\u03B9\u03C3\u03C4\u03BF \u03C3\u03C5\u03BD\u03BF\u03BB\u03B9\u03BA\u03CC \u03BC\u03AD\u03B3\u03B5\u03B8\u03BF\u03C2 \u03B1\u03C1\u03C7\u03B5\u03AF\u03C9\u03BD \u03B5\u03AF\u03BD\u03B1\u03B9 {filesize}",
    labelFileTypeNotAllowed:
        "\u039C\u03B7 \u03AD\u03B3\u03BA\u03C5\u03C1\u03BF\u03C2 \u03C4\u03CD\u03C0\u03BF\u03C2 \u03B1\u03C1\u03C7\u03B5\u03AF\u03BF\u03C5",
    fileValidateTypeLabelExpectedTypes:
        "\u03A4\u03B1 \u03B1\u03C0\u03BF\u03B4\u03B5\u03BA\u03C4\u03AC \u03B1\u03C1\u03C7\u03B5\u03AF\u03B1 \u03B5\u03AF\u03BD\u03B1\u03B9 {allButLastType} \u03AE {lastType}",
    imageValidateSizeLabelFormatError:
        "\u039F \u03C4\u03CD\u03C0\u03BF\u03C2 \u03C4\u03B7\u03C2 \u03B5\u03B9\u03BA\u03CC\u03BD\u03B1\u03C2 \u03B4\u03B5\u03BD \u03C5\u03C0\u03BF\u03C3\u03C4\u03B7\u03C1\u03AF\u03B6\u03B5\u03C4\u03B1\u03B9",
    imageValidateSizeLabelImageSizeTooSmall:
        "\u0397 \u03B5\u03B9\u03BA\u03CC\u03BD\u03B1 \u03B5\u03AF\u03BD\u03B1\u03B9 \u03C0\u03BF\u03BB\u03CD \u03BC\u03B9\u03BA\u03C1\u03AE",
    imageValidateSizeLabelImageSizeTooBig:
        "\u0397 \u03B5\u03B9\u03BA\u03CC\u03BD\u03B1 \u03B5\u03AF\u03BD\u03B1\u03B9 \u03C0\u03BF\u03BB\u03CD \u03BC\u03B5\u03B3\u03AC\u03BB\u03B7",
    imageValidateSizeLabelExpectedMinSize:
        "\u03A4\u03BF \u03B5\u03BB\u03AC\u03C7\u03B9\u03C3\u03C4\u03BF \u03B1\u03C0\u03BF\u03B4\u03B5\u03BA\u03C4\u03CC \u03BC\u03AD\u03B3\u03B5\u03B8\u03BF\u03C2 \u03B5\u03AF\u03BD\u03B1\u03B9 {minWidth} \xD7 {minHeight}",
    imageValidateSizeLabelExpectedMaxSize:
        "\u03A4\u03BF \u03BC\u03AD\u03B3\u03B9\u03C3\u03C4\u03BF \u03B1\u03C0\u03BF\u03B4\u03B5\u03BA\u03C4\u03CC \u03BC\u03AD\u03B3\u03B5\u03B8\u03BF\u03C2 \u03B5\u03AF\u03BD\u03B1\u03B9 {maxWidth} \xD7 {maxHeight}",
    imageValidateSizeLabelImageResolutionTooLow:
        "\u0397 \u03B1\u03BD\u03AC\u03BB\u03C5\u03C3\u03B7 \u03C4\u03B7\u03C2 \u03B5\u03B9\u03BA\u03CC\u03BD\u03B1\u03C2 \u03B5\u03AF\u03BD\u03B1\u03B9 \u03C0\u03BF\u03BB\u03CD \u03C7\u03B1\u03BC\u03B7\u03BB\u03AE",
    imageValidateSizeLabelImageResolutionTooHigh:
        "\u0397 \u03B1\u03BD\u03AC\u03BB\u03C5\u03C3\u03B7 \u03C4\u03B7\u03C2 \u03B5\u03B9\u03BA\u03CC\u03BD\u03B1\u03C2 \u03B5\u03AF\u03BD\u03B1\u03B9 \u03C0\u03BF\u03BB\u03CD \u03C5\u03C8\u03B7\u03BB\u03AE",
    imageValidateSizeLabelExpectedMinResolution:
        "\u0397 \u03B5\u03BB\u03AC\u03C7\u03B9\u03C3\u03C4\u03B7 \u03B1\u03C0\u03BF\u03B4\u03B5\u03BA\u03C4\u03AE \u03B1\u03BD\u03AC\u03BB\u03C5\u03C3\u03B7 \u03B5\u03AF\u03BD\u03B1\u03B9 {minResolution}",
    imageValidateSizeLabelExpectedMaxResolution:
        "\u0397 \u03BC\u03AD\u03B3\u03B9\u03C3\u03C4\u03B7 \u03B1\u03C0\u03BF\u03B4\u03B5\u03BA\u03C4\u03AE \u03B1\u03BD\u03AC\u03BB\u03C5\u03C3\u03B7 \u03B5\u03AF\u03BD\u03B1\u03B9 {maxResolution}",
};
const Co = {
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
const Bo = {
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
const No = {
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
const ko = {
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
const Vo = {
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
const Go = {
    labelIdle:
        '\u05D2\u05E8\u05D5\u05E8 \u05D5\u05E9\u05D7\u05E8\u05E8 \u05D0\u05EA \u05D4\u05E7\u05D1\u05E6\u05D9\u05DD \u05DB\u05D0\u05DF \u05D0\u05D5 <span class="filepond--label-action"> \u05DC\u05D7\u05E5 \u05DB\u05D0\u05DF \u05DC\u05D1\u05D7\u05D9\u05E8\u05D4 </span>',
    labelInvalidField:
        "\u05E7\u05D5\u05D1\u05E5 \u05DC\u05D0 \u05D7\u05D5\u05E7\u05D9",
    labelFileWaitingForSize:
        "\u05DE\u05D7\u05E9\u05D1 \u05D0\u05EA \u05D2\u05D5\u05D3\u05DC \u05D4\u05E7\u05D1\u05E6\u05D9\u05DD",
    labelFileSizeNotAvailable:
        "\u05DC\u05D0 \u05E0\u05D9\u05EA\u05DF \u05DC\u05E7\u05D1\u05D5\u05E2 \u05D0\u05EA \u05D2\u05D5\u05D3\u05DC \u05D4\u05E7\u05D1\u05E6\u05D9\u05DD",
    labelFileLoading: "\u05D8\u05D5\u05E2\u05DF...",
    labelFileLoadError:
        "\u05E9\u05D2\u05D9\u05D0\u05D4 \u05D0\u05E8\u05E2\u05D4 \u05D1\u05E2\u05EA \u05D8\u05E2\u05D9\u05E0\u05EA \u05D4\u05E7\u05D1\u05E6\u05D9\u05DD",
    labelFileProcessing:
        "\u05DE\u05E2\u05DC\u05D4 \u05D0\u05EA \u05D4\u05E7\u05D1\u05E6\u05D9\u05DD",
    labelFileProcessingComplete:
        "\u05D4\u05E2\u05DC\u05D0\u05EA \u05D4\u05E7\u05D1\u05E6\u05D9\u05DD \u05D4\u05E1\u05EA\u05D9\u05D9\u05DE\u05D4",
    labelFileProcessingAborted:
        "\u05D4\u05E2\u05DC\u05D0\u05EA \u05D4\u05E7\u05D1\u05E6\u05D9\u05DD \u05D1\u05D5\u05D8\u05DC\u05D4",
    labelFileProcessingError:
        "\u05E9\u05D2\u05D9\u05D0\u05D4 \u05D0\u05E8\u05E2\u05D4 \u05D1\u05E2\u05EA \u05D4\u05E2\u05DC\u05D0\u05EA \u05D4\u05E7\u05D1\u05E6\u05D9\u05DD",
    labelFileProcessingRevertError:
        "\u05E9\u05D2\u05D9\u05D0\u05D4 \u05D0\u05E8\u05E2\u05D4 \u05D1\u05E2\u05EA \u05E9\u05D7\u05D6\u05D5\u05E8 \u05D4\u05E7\u05D1\u05E6\u05D9\u05DD",
    labelFileRemoveError:
        "\u05E9\u05D2\u05D9\u05D0\u05D4 \u05D0\u05E8\u05E2\u05D4 \u05D1\u05E2\u05EA \u05D4\u05E1\u05E8\u05EA \u05D4\u05E7\u05D5\u05D1\u05E5",
    labelTapToCancel:
        "\u05D4\u05E7\u05DC\u05E7 \u05DC\u05D1\u05D9\u05D8\u05D5\u05DC",
    labelTapToRetry:
        "\u05D4\u05E7\u05DC\u05E7 \u05DC\u05E0\u05E1\u05D5\u05EA \u05E9\u05E0\u05D9\u05EA",
    labelTapToUndo: "\u05D4\u05E7\u05DC\u05E7 \u05DC\u05E9\u05D7\u05D6\u05E8",
    labelButtonRemoveItem: "\u05D4\u05E1\u05E8",
    labelButtonAbortItemLoad: "\u05D1\u05D8\u05DC",
    labelButtonRetryItemLoad: "\u05D8\u05E2\u05DF \u05E9\u05E0\u05D9\u05EA",
    labelButtonAbortItemProcessing: "\u05D1\u05D8\u05DC",
    labelButtonUndoItemProcessing: "\u05E9\u05D7\u05D6\u05E8",
    labelButtonRetryItemProcessing:
        "\u05E0\u05E1\u05D4 \u05E9\u05E0\u05D9\u05EA",
    labelButtonProcessItem: "\u05D4\u05E2\u05DC\u05D4 \u05E7\u05D5\u05D1\u05E5",
    labelMaxFileSizeExceeded:
        "\u05D4\u05E7\u05D5\u05D1\u05E5 \u05D2\u05D3\u05D5\u05DC \u05DE\u05D3\u05D9",
    labelMaxFileSize:
        "\u05D2\u05D5\u05D3\u05DC \u05D4\u05DE\u05D9\u05E8\u05D1\u05D9 \u05D4\u05DE\u05D5\u05EA\u05E8 \u05D4\u05D5\u05D0: {filesize}",
    labelMaxTotalFileSizeExceeded:
        "\u05D2\u05D5\u05D3\u05DC \u05D4\u05E7\u05D1\u05E6\u05D9\u05DD \u05D7\u05D5\u05E8\u05D2 \u05DE\u05D4\u05DB\u05DE\u05D5\u05EA \u05D4\u05DE\u05D5\u05EA\u05E8\u05EA",
    labelMaxTotalFileSize:
        "\u05D4\u05D2\u05D5\u05D3\u05DC \u05D4\u05DE\u05D9\u05E8\u05D1\u05D9 \u05E9\u05DC \u05E1\u05DA \u05D4\u05E7\u05D1\u05E6\u05D9\u05DD: {filesize}",
    labelFileTypeNotAllowed:
        "\u05E7\u05D5\u05D1\u05E5 \u05DE\u05E1\u05D5\u05D2 \u05D6\u05D4 \u05D0\u05D9\u05E0\u05D5 \u05DE\u05D5\u05EA\u05E8",
    fileValidateTypeLabelExpectedTypes:
        "\u05D4\u05E7\u05D1\u05E6\u05D9\u05DD \u05D4\u05DE\u05D5\u05EA\u05E8\u05D9\u05DD \u05D4\u05DD {allButLastType} \u05D0\u05D5 {lastType}",
    imageValidateSizeLabelFormatError:
        "\u05EA\u05DE\u05D5\u05E0\u05D4 \u05D1\u05E4\u05D5\u05E8\u05DE\u05D8 \u05D6\u05D4 \u05D0\u05D9\u05E0\u05D4 \u05E0\u05EA\u05DE\u05DB\u05EA",
    imageValidateSizeLabelImageSizeTooSmall:
        "\u05EA\u05DE\u05D5\u05E0\u05D4 \u05D6\u05D5 \u05E7\u05D8\u05E0\u05D4 \u05DE\u05D3\u05D9",
    imageValidateSizeLabelImageSizeTooBig:
        "\u05EA\u05DE\u05D5\u05E0\u05D4 \u05D6\u05D5 \u05D2\u05D3\u05D5\u05DC\u05D4 \u05DE\u05D3\u05D9",
    imageValidateSizeLabelExpectedMinSize:
        "\u05D4\u05D2\u05D5\u05D3\u05DC \u05E6\u05E8\u05D9\u05DA \u05DC\u05D4\u05D9\u05D5\u05EA \u05DC\u05E4\u05D7\u05D5\u05EA: {minWidth} \xD7 {minHeight}",
    imageValidateSizeLabelExpectedMaxSize:
        "\u05D4\u05D2\u05D5\u05D3\u05DC \u05D4\u05DE\u05E8\u05D1\u05D9 \u05D4\u05DE\u05D5\u05EA\u05E8: {maxWidth} \xD7 {maxHeight}",
    imageValidateSizeLabelImageResolutionTooLow:
        "\u05D4\u05E8\u05D6\u05D5\u05DC\u05D5\u05E6\u05D9\u05D4 \u05E9\u05DC \u05EA\u05DE\u05D5\u05E0\u05D4 \u05D6\u05D5 \u05E0\u05DE\u05D5\u05DB\u05D4 \u05DE\u05D3\u05D9",
    imageValidateSizeLabelImageResolutionTooHigh:
        "\u05D4\u05E8\u05D6\u05D5\u05DC\u05D5\u05E6\u05D9\u05D4 \u05E9\u05DC \u05EA\u05DE\u05D5\u05E0\u05D4 \u05D6\u05D5 \u05D2\u05D1\u05D5\u05D4\u05D4 \u05DE\u05D3\u05D9",
    imageValidateSizeLabelExpectedMinResolution:
        "\u05D4\u05E8\u05D6\u05D5\u05DC\u05D5\u05E6\u05D9\u05D4 \u05E6\u05E8\u05D9\u05DB\u05D4 \u05DC\u05D4\u05D9\u05D5\u05EA \u05DC\u05E4\u05D7\u05D5\u05EA: {minResolution}",
    imageValidateSizeLabelExpectedMaxResolution:
        "\u05D4\u05E8\u05D6\u05D5\u05DC\u05D5\u05E6\u05D9\u05D4 \u05D4\u05DE\u05D9\u05E8\u05D1\u05D9\u05EA \u05D4\u05DE\u05D5\u05EA\u05E8\u05EA \u05D4\u05D9\u05D0: {maxResolution}",
};
const Uo = {
    labelIdle:
        'Ovdje "ispusti" datoteku ili <span class="filepond--label-action"> Pretra\u017Ei </span>',
    labelInvalidField: "Polje sadr\u017Ei neispravne datoteke",
    labelFileWaitingForSize: "\u010Cekanje na veli\u010Dinu datoteke",
    labelFileSizeNotAvailable: "Veli\u010Dina datoteke nije dostupna",
    labelFileLoading: "U\u010Ditavanje",
    labelFileLoadError: "Gre\u0161ka tijekom u\u010Ditavanja",
    labelFileProcessing: "Prijenos",
    labelFileProcessingComplete: "Prijenos zavr\u0161en",
    labelFileProcessingAborted: "Prijenos otkazan",
    labelFileProcessingError: "Gre\u0161ka tijekom prijenosa",
    labelFileProcessingRevertError: "Gre\u0161ka tijekom vra\u0107anja",
    labelFileRemoveError: "Gre\u0161ka tijekom uklananja datoteke",
    labelTapToCancel: "Dodirni za prekid",
    labelTapToRetry: "Dodirni za ponovno",
    labelTapToUndo: "Dodirni za vra\u0107anje",
    labelButtonRemoveItem: "Ukloni",
    labelButtonAbortItemLoad: "Odbaci",
    labelButtonRetryItemLoad: "Ponovi",
    labelButtonAbortItemProcessing: "Prekini",
    labelButtonUndoItemProcessing: "Vrati",
    labelButtonRetryItemProcessing: "Ponovi",
    labelButtonProcessItem: "Prijenos",
    labelMaxFileSizeExceeded: "Datoteka je prevelika",
    labelMaxFileSize: "Maksimalna veli\u010Dina datoteke je {filesize}",
    labelMaxTotalFileSizeExceeded:
        "Maksimalna ukupna veli\u010Dina datoteke prekora\u010Dena",
    labelMaxTotalFileSize:
        "Maksimalna ukupna veli\u010Dina datoteke je {filesize}",
    labelFileTypeNotAllowed: "Tip datoteke nije podr\u017Ean",
    fileValidateTypeLabelExpectedTypes:
        "O\u010Dekivan {allButLastType} ili {lastType}",
    imageValidateSizeLabelFormatError: "Tip slike nije podr\u017Ean",
    imageValidateSizeLabelImageSizeTooSmall: "Slika je premala",
    imageValidateSizeLabelImageSizeTooBig: "Slika je prevelika",
    imageValidateSizeLabelExpectedMinSize:
        "Minimalna veli\u010Dina je {minWidth} \xD7 {minHeight}",
    imageValidateSizeLabelExpectedMaxSize:
        "Maksimalna veli\u010Dina je {maxWidth} \xD7 {maxHeight}",
    imageValidateSizeLabelImageResolutionTooLow: "Rezolucija je preniska",
    imageValidateSizeLabelImageResolutionTooHigh: "Rezolucija je previsoka",
    imageValidateSizeLabelExpectedMinResolution:
        "Minimalna rezolucija je {minResolution}",
    imageValidateSizeLabelExpectedMaxResolution:
        "Maksimalna rezolucija je {maxResolution}",
};
const Wo = {
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
const Ho = {
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
const jo = {
    labelIdle:
        'Trascina e rilascia i tuoi file oppure <span class="filepond--label-action"> Sfoglia <span>',
    labelInvalidField: "Il campo contiene dei file non validi",
    labelFileWaitingForSize: "In attesa della dimensione",
    labelFileSizeNotAvailable: "Dimensione non disponibile",
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
    labelButtonAbortItemProcessing: "Cancella",
    labelButtonUndoItemProcessing: "Indietro",
    labelButtonRetryItemProcessing: "Ritenta",
    labelButtonProcessItem: "Carica",
    labelMaxFileSizeExceeded: "La dimensione del file \xE8 eccessiva",
    labelMaxFileSize: "La dimensione massima del file \xE8 {filesize}",
    labelMaxTotalFileSizeExceeded: "Dimensione totale massima superata",
    labelMaxTotalFileSize:
        "La dimensione massima totale dei file \xE8 {filesize}",
    labelFileTypeNotAllowed: "File non supportato",
    fileValidateTypeLabelExpectedTypes: "Aspetta {allButLastType} o {lastType}",
    imageValidateSizeLabelFormatError: "Tipo di immagine non supportata",
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
const Yo = {
    labelIdle:
        '\u30D5\u30A1\u30A4\u30EB\u3092\u30C9\u30E9\u30C3\u30B0&\u30C9\u30ED\u30C3\u30D7\u53C8\u306F<span class="filepond--label-action">\u30D5\u30A1\u30A4\u30EB\u9078\u629E</span>',
    labelInvalidField:
        "\u30A2\u30C3\u30D7\u30ED\u30FC\u30C9\u3067\u304D\u306A\u3044\u30D5\u30A1\u30A4\u30EB\u304C\u542B\u307E\u308C\u3066\u3044\u307E\u3059",
    labelFileWaitingForSize:
        "\u30D5\u30A1\u30A4\u30EB\u30B5\u30A4\u30BA\u3092\u5F85\u3063\u3066\u3044\u307E\u3059",
    labelFileSizeNotAvailable:
        "\u30D5\u30A1\u30A4\u30EB\u30B5\u30A4\u30BA\u304C\u307F\u3064\u304B\u308A\u307E\u305B\u3093",
    labelFileLoading: "\u8AAD\u8FBC\u4E2D...",
    labelFileLoadError:
        "\u8AAD\u8FBC\u4E2D\u306B\u30A8\u30E9\u30FC\u304C\u767A\u751F",
    labelFileProcessing: "\u8AAD\u8FBC\u4E2D...",
    labelFileProcessingComplete:
        "\u30A2\u30C3\u30D7\u30ED\u30FC\u30C9\u5B8C\u4E86",
    labelFileProcessingAborted:
        "\u30A2\u30C3\u30D7\u30ED\u30FC\u30C9\u304C\u30AD\u30E3\u30F3\u30BB\u30EB\u3055\u308C\u307E\u3057\u305F",
    labelFileProcessingError:
        "\u30A2\u30C3\u30D7\u30ED\u30FC\u30C9\u4E2D\u306B\u30A8\u30E9\u30FC\u304C\u767A\u751F",
    labelFileProcessingRevertError:
        "\u30ED\u30FC\u30EB\u30D0\u30C3\u30AF\u4E2D\u306B\u30A8\u30E9\u30FC\u304C\u767A\u751F",
    labelFileRemoveError:
        "\u524A\u9664\u4E2D\u306B\u30A8\u30E9\u30FC\u304C\u767A\u751F",
    labelTapToCancel:
        "\u30AF\u30EA\u30C3\u30AF\u3057\u3066\u30AD\u30E3\u30F3\u30BB\u30EB",
    labelTapToRetry:
        "\u30AF\u30EA\u30C3\u30AF\u3057\u3066\u3082\u3046\u4E00\u5EA6\u304A\u8A66\u3057\u4E0B\u3055\u3044",
    labelTapToUndo:
        "\u5143\u306B\u623B\u3059\u306B\u306F\u30BF\u30C3\u30D7\u3057\u307E\u3059",
    labelButtonRemoveItem: "\u524A\u9664",
    labelButtonAbortItemLoad: "\u4E2D\u65AD",
    labelButtonRetryItemLoad: "\u3082\u3046\u4E00\u5EA6\u5B9F\u884C",
    labelButtonAbortItemProcessing: "\u30AD\u30E3\u30F3\u30BB\u30EB",
    labelButtonUndoItemProcessing: "\u5143\u306B\u623B\u3059",
    labelButtonRetryItemProcessing: "\u3082\u3046\u4E00\u5EA6\u5B9F\u884C",
    labelButtonProcessItem: "\u30A2\u30C3\u30D7\u30ED\u30FC\u30C9",
    labelMaxFileSizeExceeded:
        "\u30D5\u30A1\u30A4\u30EB\u30B5\u30A4\u30BA\u304C\u5927\u304D\u3059\u304E\u307E\u3059",
    labelMaxFileSize:
        "\u6700\u5927\u30D5\u30A1\u30A4\u30EB\u30B5\u30A4\u30BA\u306F {filesize} \u3067\u3059",
    labelMaxTotalFileSizeExceeded:
        "\u6700\u5927\u5408\u8A08\u30B5\u30A4\u30BA\u3092\u8D85\u3048\u307E\u3057\u305F",
    labelMaxTotalFileSize:
        "\u6700\u5927\u5408\u8A08\u30D5\u30A1\u30A4\u30EB\u30B5\u30A4\u30BA\u306F {filesize} \u3067\u3059",
    labelFileTypeNotAllowed:
        "\u7121\u52B9\u306A\u30D5\u30A1\u30A4\u30EB\u3067\u3059",
    fileValidateTypeLabelExpectedTypes:
        "\u30B5\u30DD\u30FC\u30C8\u3057\u3066\u3044\u308B\u30D5\u30A1\u30A4\u30EB\u306F {allButLastType} \u53C8\u306F {lastType} \u3067\u3059",
    imageValidateSizeLabelFormatError:
        "\u30B5\u30DD\u30FC\u30C8\u3057\u3066\u3044\u306A\u3044\u753B\u50CF\u3067\u3059",
    imageValidateSizeLabelImageSizeTooSmall:
        "\u753B\u50CF\u304C\u5C0F\u3055\u3059\u304E\u307E\u3059",
    imageValidateSizeLabelImageSizeTooBig:
        "\u753B\u50CF\u304C\u5927\u304D\u3059\u304E\u307E\u3059",
    imageValidateSizeLabelExpectedMinSize:
        "\u753B\u50CF\u306E\u6700\u5C0F\u30B5\u30A4\u30BA\u306F{minWidth}\xD7{minHeight}\u3067\u3059",
    imageValidateSizeLabelExpectedMaxSize:
        "\u753B\u50CF\u306E\u6700\u5927\u30B5\u30A4\u30BA\u306F{maxWidth} \xD7 {maxHeight}\u3067\u3059",
    imageValidateSizeLabelImageResolutionTooLow:
        "\u753B\u50CF\u306E\u89E3\u50CF\u5EA6\u304C\u4F4E\u3059\u304E\u307E\u3059",
    imageValidateSizeLabelImageResolutionTooHigh:
        "\u753B\u50CF\u306E\u89E3\u50CF\u5EA6\u304C\u9AD8\u3059\u304E\u307E\u3059",
    imageValidateSizeLabelExpectedMinResolution:
        "\u753B\u50CF\u306E\u6700\u5C0F\u89E3\u50CF\u5EA6\u306F{minResolution}\u3067\u3059",
    imageValidateSizeLabelExpectedMaxResolution:
        "\u753B\u50CF\u306E\u6700\u5927\u89E3\u50CF\u5EA6\u306F{maxResolution}\u3067\u3059",
};
const qo = {
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
const $o = {
    labelIdle:
        '\uD30C\uC77C\uC744 \uB4DC\uB798\uADF8 \uD558\uAC70\uB098 <span class="filepond--label-action"> \uCC3E\uC544\uBCF4\uAE30 </span>',
    labelInvalidField:
        "\uD544\uB4DC\uC5D0 \uC720\uD6A8\uD558\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uC788\uC2B5\uB2C8\uB2E4.",
    labelFileWaitingForSize: "\uC6A9\uB7C9 \uD655\uC778\uC911",
    labelFileSizeNotAvailable:
        "\uC0AC\uC6A9\uD560 \uC218 \uC5C6\uB294 \uC6A9\uB7C9",
    labelFileLoading: "\uBD88\uB7EC\uC624\uB294 \uC911",
    labelFileLoadError: "\uD30C\uC77C \uBD88\uB7EC\uC624\uAE30 \uC2E4\uD328",
    labelFileProcessing: "\uC5C5\uB85C\uB4DC \uC911",
    labelFileProcessingComplete: "\uC5C5\uB85C\uB4DC \uC131\uACF5",
    labelFileProcessingAborted: "\uC5C5\uB85C\uB4DC \uCDE8\uC18C\uB428",
    labelFileProcessingError: "\uD30C\uC77C \uC5C5\uB85C\uB4DC \uC2E4\uD328",
    labelFileProcessingRevertError: "\uB418\uB3CC\uB9AC\uAE30 \uC2E4\uD328",
    labelFileRemoveError: "\uC81C\uAC70 \uC2E4\uD328",
    labelTapToCancel: "\uD0ED\uD558\uC5EC \uCDE8\uC18C",
    labelTapToRetry: "\uD0ED\uD558\uC5EC \uC7AC\uC2DC\uC791",
    labelTapToUndo: "\uD0ED\uD558\uC5EC \uC2E4\uD589 \uCDE8\uC18C",
    labelButtonRemoveItem: "\uC81C\uAC70",
    labelButtonAbortItemLoad: "\uC911\uB2E8",
    labelButtonRetryItemLoad: "\uC7AC\uC2DC\uC791",
    labelButtonAbortItemProcessing: "\uCDE8\uC18C",
    labelButtonUndoItemProcessing: "\uC2E4\uD589 \uCDE8\uC18C",
    labelButtonRetryItemProcessing: "\uC7AC\uC2DC\uC791",
    labelButtonProcessItem: "\uC5C5\uB85C\uB4DC",
    labelMaxFileSizeExceeded:
        "\uD30C\uC77C\uC774 \uB108\uBB34 \uD07D\uB2C8\uB2E4.",
    labelMaxFileSize:
        "\uCD5C\uB300 \uD30C\uC77C \uC6A9\uB7C9\uC740 {filesize} \uC785\uB2C8\uB2E4.",
    labelMaxTotalFileSizeExceeded:
        "\uCD5C\uB300 \uC804\uCCB4 \uD30C\uC77C \uC6A9\uB7C9 \uCD08\uACFC\uD558\uC600\uC2B5\uB2C8\uB2E4.",
    labelMaxTotalFileSize:
        "\uCD5C\uB300 \uC804\uCCB4 \uD30C\uC77C \uC6A9\uB7C9\uC740 {filesize} \uC785\uB2C8\uB2E4.",
    labelFileTypeNotAllowed:
        "\uC798\uBABB\uB41C \uD615\uC2DD\uC758 \uD30C\uC77C",
    fileValidateTypeLabelExpectedTypes:
        "{allButLastType} \uB610\uB294 {lastType}",
    imageValidateSizeLabelFormatError:
        "\uC9C0\uC6D0\uB418\uC9C0 \uC54A\uB294 \uC774\uBBF8\uC9C0 \uC720\uD615",
    imageValidateSizeLabelImageSizeTooSmall:
        "\uC774\uBBF8\uC9C0\uAC00 \uB108\uBB34 \uC791\uC2B5\uB2C8\uB2E4.",
    imageValidateSizeLabelImageSizeTooBig:
        "\uC774\uBBF8\uC9C0\uAC00 \uB108\uBB34 \uD07D\uB2C8\uB2E4.",
    imageValidateSizeLabelExpectedMinSize:
        "\uC774\uBBF8\uC9C0 \uCD5C\uC18C \uD06C\uAE30\uB294 {minWidth} \xD7 {minHeight} \uC785\uB2C8\uB2E4",
    imageValidateSizeLabelExpectedMaxSize:
        "\uC774\uBBF8\uC9C0 \uCD5C\uB300 \uD06C\uAE30\uB294 {maxWidth} \xD7 {maxHeight} \uC785\uB2C8\uB2E4",
    imageValidateSizeLabelImageResolutionTooLow:
        "\uD574\uC0C1\uB3C4\uAC00 \uB108\uBB34 \uB0AE\uC2B5\uB2C8\uB2E4.",
    imageValidateSizeLabelImageResolutionTooHigh:
        "\uD574\uC0C1\uB3C4\uAC00 \uB108\uBB34 \uB192\uC2B5\uB2C8\uB2E4.",
    imageValidateSizeLabelExpectedMinResolution:
        "\uCD5C\uC18C \uD574\uC0C1\uB3C4\uB294 {minResolution} \uC785\uB2C8\uB2E4.",
    imageValidateSizeLabelExpectedMaxResolution:
        "\uCD5C\uB300 \uD574\uC0C1\uB3C4\uB294 {maxResolution} \uC785\uB2C8\uB2E4.",
};
const Xo = {
    labelIdle:
        '\u012Ed\u0117kite failus \u010Dia arba <span class="filepond--label-action"> Ie\u0161kokite </span>',
    labelInvalidField: "Laukelis talpina netinkamus failus",
    labelFileWaitingForSize: "Laukiama dyd\u017Eio",
    labelFileSizeNotAvailable: "Dydis ne\u017Einomas",
    labelFileLoading: "Kraunama",
    labelFileLoadError: "Klaida \u012Fkeliant",
    labelFileProcessing: "\u012Ekeliama",
    labelFileProcessingComplete: "\u012Ek\u0117limas s\u0117kmingas",
    labelFileProcessingAborted: "\u012Ek\u0117limas at\u0161auktas",
    labelFileProcessingError: "\u012Ekeliant \u012Fvyko klaida",
    labelFileProcessingRevertError: "At\u0161aukiant \u012Fvyko klaida",
    labelFileRemoveError: "I\u0161trinant \u012Fvyko klaida",
    labelTapToCancel: "Palieskite nor\u0117dami at\u0161aukti",
    labelTapToRetry: "Palieskite nor\u0117dami pakartoti",
    labelTapToUndo: "Palieskite nor\u0117dami at\u0161aukti",
    labelButtonRemoveItem: "I\u0161trinti",
    labelButtonAbortItemLoad: "Sustabdyti",
    labelButtonRetryItemLoad: "Pakartoti",
    labelButtonAbortItemProcessing: "At\u0161aukti",
    labelButtonUndoItemProcessing: "At\u0161aukti",
    labelButtonRetryItemProcessing: "Pakartoti",
    labelButtonProcessItem: "\u012Ekelti",
    labelMaxFileSizeExceeded: "Failas per didelis",
    labelMaxFileSize: "Maksimalus failo dydis yra {filesize}",
    labelMaxTotalFileSizeExceeded:
        "Vir\u0161ijote maksimal\u0173 leistin\u0105 dyd\u012F",
    labelMaxTotalFileSize: "Maksimalus leistinas dydis yra {filesize}",
    labelFileTypeNotAllowed: "Netinkamas failas",
    fileValidateTypeLabelExpectedTypes:
        "Tikisi {allButLastType} arba {lastType}",
    imageValidateSizeLabelFormatError: "Nuotraukos formatas nepalaikomas",
    imageValidateSizeLabelImageSizeTooSmall: "Nuotrauka per ma\u017Ea",
    imageValidateSizeLabelImageSizeTooBig: "Nuotrauka per didel\u0117",
    imageValidateSizeLabelExpectedMinSize:
        "Minimalus dydis yra {minWidth} \xD7 {minHeight}",
    imageValidateSizeLabelExpectedMaxSize:
        "Maksimalus dydis yra {maxWidth} \xD7 {maxHeight}",
    imageValidateSizeLabelImageResolutionTooLow: "Rezoliucija per ma\u017Ea",
    imageValidateSizeLabelImageResolutionTooHigh: "Rezoliucija per didel\u0117",
    imageValidateSizeLabelExpectedMinResolution:
        "Minimali rezoliucija yra {minResolution}",
    imageValidateSizeLabelExpectedMaxResolution:
        "Maksimali rezoliucija yra {maxResolution}",
};
const Ko = {
    labelIdle:
        'Ievelciet savus failus vai <span class="filepond--label-action"> p\u0101rl\u016Bkojiet \u0161eit </span>',
    labelInvalidField: "Lauks satur neder\u012Bgus failus",
    labelFileWaitingForSize: "Gaid\u0101m faila izm\u0113ru",
    labelFileSizeNotAvailable: "Izm\u0113rs nav pieejams",
    labelFileLoading: "Notiek iel\u0101de",
    labelFileLoadError: "Notika k\u013C\u016Bda iel\u0101des laik\u0101",
    labelFileProcessing: "Notiek aug\u0161upiel\u0101de",
    labelFileProcessingComplete: "Aug\u0161upiel\u0101de pabeigta",
    labelFileProcessingAborted: "Aug\u0161upiel\u0101de atcelta",
    labelFileProcessingError:
        "Notika k\u013C\u016Bda aug\u0161upiel\u0101des laik\u0101",
    labelFileProcessingRevertError:
        "Notika k\u013C\u016Bda atgrie\u0161anas laik\u0101",
    labelFileRemoveError:
        "Notika k\u013C\u016Bda dz\u0113\u0161anas laik\u0101",
    labelTapToCancel: "pieskarieties, lai atceltu",
    labelTapToRetry: "pieskarieties, lai m\u0113\u0123in\u0101tu v\u0113lreiz",
    labelTapToUndo: "pieskarieties, lai atsauktu",
    labelButtonRemoveItem: "Dz\u0113st",
    labelButtonAbortItemLoad: "P\u0101rtraukt",
    labelButtonRetryItemLoad: "M\u0113\u0123in\u0101t v\u0113lreiz",
    labelButtonAbortItemProcessing: "P\u0101rtraucam",
    labelButtonUndoItemProcessing: "Atsaucam",
    labelButtonRetryItemProcessing: "M\u0113\u0123in\u0101m v\u0113lreiz",
    labelButtonProcessItem: "Aug\u0161upiel\u0101d\u0113t",
    labelMaxFileSizeExceeded: "Fails ir p\u0101r\u0101k liels",
    labelMaxFileSize: "Maksim\u0101lais faila izm\u0113rs ir {filesize}",
    labelMaxTotalFileSizeExceeded:
        "P\u0101rsniegts maksim\u0101lais kop\u0113jais failu izm\u0113rs",
    labelMaxTotalFileSize:
        "Maksim\u0101lais kop\u0113jais failu izm\u0113rs ir {filesize}",
    labelFileTypeNotAllowed: "Neder\u012Bgs faila tips",
    fileValidateTypeLabelExpectedTypes:
        "Sagaid\u0101m {allButLastType} vai {lastType}",
    imageValidateSizeLabelFormatError: "Neatbilsto\u0161s att\u0113la tips",
    imageValidateSizeLabelImageSizeTooSmall:
        "Att\u0113ls ir p\u0101r\u0101k mazs",
    imageValidateSizeLabelImageSizeTooBig:
        "Att\u0113ls ir p\u0101r\u0101k liels",
    imageValidateSizeLabelExpectedMinSize:
        "Minim\u0101lais izm\u0113rs ir {minWidth} \xD7 {minHeight}",
    imageValidateSizeLabelExpectedMaxSize:
        "Maksim\u0101lais izm\u0113rs ir {maxWidth} \xD7 {maxHeight}",
    imageValidateSizeLabelImageResolutionTooLow:
        "Iz\u0161\u0137irtsp\u0113ja ir p\u0101r\u0101k zema",
    imageValidateSizeLabelImageResolutionTooHigh:
        "Iz\u0161\u0137irtsp\u0113ja ir p\u0101r\u0101k augsta",
    imageValidateSizeLabelExpectedMinResolution:
        "Minim\u0101l\u0101 iz\u0161\u0137irtsp\u0113ja ir {minResolution}",
    imageValidateSizeLabelExpectedMaxResolution:
        "Maksim\u0101l\u0101 iz\u0161\u0137irtsp\u0113ja ir {maxResolution}",
};
const Qo = {
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
const Zo = {
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
const Jo = {
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
const er = {
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
const tr = {
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
const ir = {
    labelIdle:
        'Natiahn\xFA\u0165 s\xFAbor (drag&drop) alebo <span class="filepond--label-action"> Vyh\u013Eada\u0165 </span>',
    labelInvalidField: "Pole obsahuje chybn\xE9 s\xFAbory",
    labelFileWaitingForSize: "Zis\u0165uje sa ve\u013Ekos\u0165",
    labelFileSizeNotAvailable: "Nezn\xE1ma ve\u013Ekos\u0165",
    labelFileLoading: "Pren\xE1\u0161a sa",
    labelFileLoadError: "Chyba pri prenose",
    labelFileProcessing: "Prebieha upload",
    labelFileProcessingComplete: "Upload dokon\u010Den\xFD",
    labelFileProcessingAborted: "Upload stornovan\xFD",
    labelFileProcessingError: "Chyba pri uploade",
    labelFileProcessingRevertError: "Chyba pri obnove",
    labelFileRemoveError: "Chyba pri odstr\xE1nen\xED",
    labelTapToCancel: "Kliknite pre storno",
    labelTapToRetry: "Kliknite pre opakovanie",
    labelTapToUndo: "Kliknite pre vr\xE1tenie",
    labelButtonRemoveItem: "Odstr\xE1ni\u0165",
    labelButtonAbortItemLoad: "Storno",
    labelButtonRetryItemLoad: "Opakova\u0165",
    labelButtonAbortItemProcessing: "Sp\xE4\u0165",
    labelButtonUndoItemProcessing: "Vr\xE1ti\u0165",
    labelButtonRetryItemProcessing: "Opakova\u0165",
    labelButtonProcessItem: "Upload",
    labelMaxFileSizeExceeded: "S\xFAbor je pr\xEDli\u0161 ve\u013Ek\xFD",
    labelMaxFileSize:
        "Najv\xE4\u010D\u0161ia ve\u013Ekos\u0165 s\xFAboru je {filesize}",
    labelMaxTotalFileSizeExceeded:
        "Prekro\u010Den\xE1 maxim\xE1lna celkov\xE1 ve\u013Ekos\u0165 s\xFAboru",
    labelMaxTotalFileSize:
        "Maxim\xE1lna celkov\xE1 ve\u013Ekos\u0165 s\xFAboru je {filesize}",
    labelFileTypeNotAllowed: "S\xFAbor je nespr\xE1vneho typu",
    fileValidateTypeLabelExpectedTypes:
        "O\u010Dak\xE1va sa {allButLastType} alebo {lastType}",
    imageValidateSizeLabelFormatError:
        "Obr\xE1zok tohto typu nie je podporovan\xFD",
    imageValidateSizeLabelImageSizeTooSmall:
        "Obr\xE1zok je pr\xEDli\u0161 mal\xFD",
    imageValidateSizeLabelImageSizeTooBig:
        "Obr\xE1zok je pr\xEDli\u0161 ve\u013Ek\xFD",
    imageValidateSizeLabelExpectedMinSize:
        "Minim\xE1lny rozmer je {minWidth} \xD7 {minHeight}",
    imageValidateSizeLabelExpectedMaxSize:
        "Maxim\xE1lny rozmer je {maxWidth} \xD7 {maxHeight}",
    imageValidateSizeLabelImageResolutionTooLow:
        "Rozl\xED\u0161enie je pr\xEDli\u0161 mal\xE9",
    imageValidateSizeLabelImageResolutionTooHigh:
        "Rozli\u0161enie je pr\xEDli\u0161 ve\u013Ek\xE9",
    imageValidateSizeLabelExpectedMinResolution:
        "Minim\xE1lne rozl\xED\u0161enie je {minResolution}",
    imageValidateSizeLabelExpectedMaxResolution:
        "Maxim\xE1lne rozl\xED\u0161enie je {maxResolution}",
};
const ar = {
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
const nr = {
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
const lr = {
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
const or = {
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
const rr = {
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
const sr = {
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
ve(Wl);
ve(jl);
ve($l);
ve(Kl);
ve(eo);
ve(mo);
ve(go);
ve(_o);
ve(Pa);
window.FilePond = la;
function Sg({
    acceptedFileTypes: e,
    imageEditorEmptyFillColor: t,
    imageEditorMode: i,
    imageEditorViewportHeight: a,
    imageEditorViewportWidth: n,
    deleteUploadedFileUsing: l,
    isDeletable: o,
    isDisabled: r,
    getUploadedFilesUsing: s,
    imageCropAspectRatio: p,
    imagePreviewHeight: c,
    imageResizeMode: d,
    imageResizeTargetHeight: m,
    imageResizeTargetWidth: u,
    imageResizeUpscale: g,
    isAvatar: f,
    hasImageEditor: h,
    hasCircleCropper: I,
    canEditSvgs: b,
    isSvgEditingConfirmed: T,
    confirmSvgEditingMessage: v,
    disabledSvgEditingMessage: y,
    isDownloadable: E,
    isMultiple: _,
    isOpenable: x,
    isPasteable: R,
    isPreviewable: z,
    isReorderable: P,
    itemPanelAspectRatio: A,
    loadingIndicatorPosition: B,
    locale: w,
    maxFiles: O,
    maxSize: S,
    minSize: L,
    maxParallelUploads: D,
    mimeTypeMap: F,
    panelAspectRatio: G,
    panelLayout: C,
    placeholder: q,
    removeUploadedFileButtonPosition: X,
    removeUploadedFileUsing: K,
    reorderUploadedFilesUsing: pe,
    shouldAppendFiles: k,
    shouldOrientImageFromExif: H,
    shouldTransformImage: Y,
    state: oe,
    uploadButtonPosition: ee,
    uploadingMessage: dt,
    uploadProgressIndicatorPosition: dr,
    uploadUsing: pr,
}) {
    return {
        fileKeyIndex: {},
        pond: null,
        shouldUpdateState: !0,
        state: oe,
        lastState: null,
        error: null,
        uploadedFileIndex: {},
        isEditorOpen: !1,
        editingFile: {},
        currentRatio: "",
        editor: {},
        init: async function () {
            Ft(cr[w] ?? cr.en),
                (this.pond = gt(this.$refs.input, {
                    acceptedFileTypes: e,
                    allowImageExifOrientation: H,
                    allowPaste: R,
                    allowRemove: o,
                    allowReorder: P,
                    allowImagePreview: z,
                    allowVideoPreview: z,
                    allowAudioPreview: z,
                    allowImageTransform: Y,
                    credits: !1,
                    files: await this.getFiles(),
                    imageCropAspectRatio: p,
                    imagePreviewHeight: c,
                    imageResizeTargetHeight: m,
                    imageResizeTargetWidth: u,
                    imageResizeMode: d,
                    imageResizeUpscale: g,
                    imageTransformOutputStripImageHead: !1,
                    itemInsertLocation: k ? "after" : "before",
                    ...(q && { labelIdle: q }),
                    maxFiles: O,
                    maxFileSize: S,
                    minFileSize: L,
                    ...(D && { maxParallelUploads: D }),
                    styleButtonProcessItemPosition: ee,
                    styleButtonRemoveItemPosition: X,
                    styleItemPanelAspectRatio: A,
                    styleLoadIndicatorPosition: B,
                    stylePanelAspectRatio: G,
                    stylePanelLayout: C,
                    styleProgressIndicatorPosition: dr,
                    server: {
                        load: async (N, W) => {
                            const Q = await (
                                await fetch(N, { cache: "no-store" })
                            ).blob();
                            W(Q);
                        },
                        process: (N, W, $, Q, Ge, Me) => {
                            this.shouldUpdateState = !1;
                            const Kt = (
                                "10000000-1000-4000-8000" + -1e11
                            ).replace(/[018]/g, (Qt) =>
                                (
                                    Qt ^
                                    (crypto.getRandomValues(
                                        new Uint8Array(1),
                                    )[0] &
                                        (15 >> (Qt / 4)))
                                ).toString(16),
                            );
                            pr(
                                Kt,
                                W,
                                (Qt) => {
                                    (this.shouldUpdateState = !0), Q(Qt);
                                },
                                Ge,
                                Me,
                            );
                        },
                        remove: async (N, W) => {
                            const $ = this.uploadedFileIndex[N] ?? null;
                            $ && (await l($), W());
                        },
                        revert: async (N, W) => {
                            await K(N), W();
                        },
                    },
                    allowImageEdit: h,
                    imageEditEditor: {
                        open: (N) => this.loadEditor(N),
                        onconfirm: () => {},
                        oncancel: () => this.closeEditor(),
                        onclose: () => this.closeEditor(),
                    },
                    fileValidateTypeDetectType: (N, W) =>
                        new Promise(($, Q) => {
                            const Ge = N.name.split(".").pop().toLowerCase();
                            const Me = F[Ge] || W || Gl.getType(Ge);
                            Me ? $(Me) : Q();
                        }),
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
                    const W = N.map(($) =>
                        $.source instanceof File
                            ? $.serverId
                            : (this.uploadedFileIndex[$.source] ?? null),
                    ).filter(($) => $);
                    await pe(k ? W : W.reverse());
                }),
                this.pond.on("initfile", async (N) => {
                    E && (f || this.insertDownloadLink(N));
                }),
                this.pond.on("initfile", async (N) => {
                    x && (f || this.insertOpenLink(N));
                }),
                this.pond.on("addfilestart", async (N) => {
                    N.status === Et.PROCESSING_QUEUED &&
                        this.dispatchFormEvent("form-processing-started", {
                            message: dt,
                        });
                });
            const V = async () => {
                this.pond
                    .getFiles()
                    .filter(
                        (N) =>
                            N.status === Et.PROCESSING ||
                            N.status === Et.PROCESSING_QUEUED,
                    ).length ||
                    this.dispatchFormEvent("form-processing-finished");
            };
            this.pond.on("processfile", V),
                this.pond.on("processfileabort", V),
                this.pond.on("processfilerevert", V),
                C === "compact circle" &&
                    (this.pond.on("error", (N) => {
                        this.error = `${N.main}: ${N.sub}`.replace(
                            "Expects  or",
                            "Expects",
                        );
                    }),
                    this.pond.on("removefile", () => (this.error = null)));
        },
        destroy: function () {
            this.destroyEditor(), ft(this.$refs.input), (this.pond = null);
        },
        dispatchFormEvent: function (V, N = {}) {
            this.$el.closest("form")?.dispatchEvent(
                new CustomEvent(V, {
                    composed: !0,
                    cancelable: !0,
                    detail: N,
                }),
            );
        },
        getUploadedFiles: async function () {
            const V = await s();
            (this.fileKeyIndex = V ?? {}),
                (this.uploadedFileIndex = Object.entries(this.fileKeyIndex)
                    .filter(([N, W]) => W?.url)
                    .reduce((N, [W, $]) => ((N[$.url] = W), N), {}));
        },
        getFiles: async function () {
            await this.getUploadedFiles();
            const V = [];
            for (const N of Object.values(this.fileKeyIndex)) {
                N &&
                    V.push({
                        source: N.url,
                        options: {
                            type: "local",
                            ...(!N.type ||
                            (z &&
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
            return k ? V : V.reverse();
        },
        insertDownloadLink: function (V) {
            if (V.origin !== Ct.LOCAL) return;
            const N = this.getDownloadLink(V);
            N &&
                document
                    .getElementById(`filepond--item-${V.id}`)
                    .querySelector(".filepond--file-info-main")
                    .prepend(N);
        },
        insertOpenLink: function (V) {
            if (V.origin !== Ct.LOCAL) return;
            const N = this.getOpenLink(V);
            N &&
                document
                    .getElementById(`filepond--item-${V.id}`)
                    .querySelector(".filepond--file-info-main")
                    .prepend(N);
        },
        getDownloadLink: function (V) {
            const N = V.source;
            if (!N) return;
            const W = document.createElement("a");
            return (
                (W.className = "filepond--download-icon"),
                (W.href = N),
                (W.download = V.file.name),
                W
            );
        },
        getOpenLink: function (V) {
            const N = V.source;
            if (!N) return;
            const W = document.createElement("a");
            return (
                (W.className = "filepond--open-icon"),
                (W.href = N),
                (W.target = "_blank"),
                W
            );
        },
        initEditor: function () {
            r ||
                (h &&
                    (this.editor = new ya(this.$refs.editor, {
                        aspectRatio: n / a,
                        autoCropArea: 1,
                        center: !0,
                        crop: (V) => {
                            (this.$refs.xPositionInput.value = Math.round(
                                V.detail.x,
                            )),
                                (this.$refs.yPositionInput.value = Math.round(
                                    V.detail.y,
                                )),
                                (this.$refs.heightInput.value = Math.round(
                                    V.detail.height,
                                )),
                                (this.$refs.widthInput.value = Math.round(
                                    V.detail.width,
                                )),
                                (this.$refs.rotationInput.value =
                                    V.detail.rotate);
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
        fixImageDimensions: function (V, N) {
            if (V.type !== "image/svg+xml") return N(V);
            const W = new FileReader();
            (W.onload = ($) => {
                const Q = new DOMParser()
                    .parseFromString($.target.result, "image/svg+xml")
                    ?.querySelector("svg");
                if (!Q) return N(V);
                const Ge = ["viewBox", "ViewBox", "viewbox"].find((Kt) =>
                    Q.hasAttribute(Kt),
                );
                if (!Ge) return N(V);
                const Me = Q.getAttribute(Ge).split(" ");
                return !Me || Me.length !== 4
                    ? N(V)
                    : (Q.setAttribute("width", parseFloat(Me[2]) + "pt"),
                      Q.setAttribute("height", parseFloat(Me[3]) + "pt"),
                      N(
                          new File(
                              [
                                  new Blob(
                                      [
                                          new XMLSerializer().serializeToString(
                                              Q,
                                          ),
                                      ],
                                      { type: "image/svg+xml" },
                                  ),
                              ],
                              V.name,
                              { type: "image/svg+xml", _relativePath: "" },
                          ),
                      ));
            }),
                W.readAsText(V);
        },
        loadEditor: function (V) {
            if (r || !h || !V) return;
            const N = V.type === "image/svg+xml";
            if (!b && N) {
                alert(y);
                return;
            }
            (T && N && !confirm(v)) ||
                this.fixImageDimensions(V, (W) => {
                    (this.editingFile = W), this.initEditor();
                    const $ = new FileReader();
                    ($.onload = (Q) => {
                        (this.isEditorOpen = !0),
                            setTimeout(
                                () => this.editor.replace(Q.target.result),
                                200,
                            );
                    }),
                        $.readAsDataURL(V);
                });
        },
        getRoundedCanvas: function (V) {
            const N = V.width;
            const W = V.height;
            const $ = document.createElement("canvas");
            ($.width = N), ($.height = W);
            const Q = $.getContext("2d");
            return (
                (Q.imageSmoothingEnabled = !0),
                Q.drawImage(V, 0, 0, N, W),
                (Q.globalCompositeOperation = "destination-in"),
                Q.beginPath(),
                Q.ellipse(N / 2, W / 2, N / 2, W / 2, 0, 0, 2 * Math.PI),
                Q.fill(),
                $
            );
        },
        saveEditor: function () {
            if (r || !h) return;
            let V = this.editor.getCroppedCanvas({
                fillColor: t ?? "transparent",
                height: m,
                imageSmoothingEnabled: !0,
                imageSmoothingQuality: "high",
                width: u,
            });
            I && (V = this.getRoundedCanvas(V)),
                V.toBlob(
                    (N) => {
                        _ &&
                            this.pond.removeFile(
                                this.pond
                                    .getFiles()
                                    .find(
                                        (W) =>
                                            W.filename ===
                                            this.editingFile.name,
                                    )?.id,
                                { revert: !0 },
                            ),
                            this.$nextTick(() => {
                                this.shouldUpdateState = !1;
                                let W = this.editingFile.name.slice(
                                    0,
                                    this.editingFile.name.lastIndexOf("."),
                                );
                                let $ = this.editingFile.name.split(".").pop();
                                $ === "svg" && ($ = "png");
                                const Q = /-v(\d+)/;
                                Q.test(W)
                                    ? (W = W.replace(
                                          Q,
                                          (Ge, Me) => `-v${Number(Me) + 1}`,
                                      ))
                                    : (W += "-v1"),
                                    this.pond
                                        .addFile(
                                            new File([N], `${W}.${$}`, {
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
var cr = {
    am: wo,
    ar: Lo,
    az: Mo,
    ca: Ao,
    ckb: Po,
    cs: zo,
    da: Oo,
    de: Fo,
    el: Do,
    en: Co,
    es: Bo,
    fa: No,
    fi: ko,
    fr: Vo,
    he: Go,
    hr: Uo,
    hu: Wo,
    id: Ho,
    it: jo,
    ja: Yo,
    km: qo,
    ko: $o,
    lt: Xo,
    lv: Ko,
    nl: Qo,
    no: Zo,
    pl: Jo,
    pt_BR: _i,
    pt_PT: _i,
    ro: er,
    ru: tr,
    sk: ir,
    sv: ar,
    tr: nr,
    uk: lr,
    vi: or,
    zh_CN: rr,
    zh_TW: sr,
};
export { Sg as default };
/*! Bundled license information:

filepond/dist/filepond.esm.js:
  (*!
   * FilePond 4.32.8
   * Licensed under MIT, https://opensource.org/licenses/MIT/
   * Please visit https://pqina.nl/filepond/ for details.
   *)

cropperjs/dist/cropper.esm.js:
  (*!
   * Cropper.js v1.6.2
   * https://fengyuanchen.github.io/cropperjs
   *
   * Copyright 2015-present Chen Fengyuan
   * Released under the MIT license
   *
   * Date: 2024-04-21T07:43:05.335Z
   *)

filepond-plugin-file-validate-size/dist/filepond-plugin-file-validate-size.esm.js:
  (*!
   * FilePondPluginFileValidateSize 2.2.8
   * Licensed under MIT, https://opensource.org/licenses/MIT/
   * Please visit https://pqina.nl/filepond/ for details.
   *)

filepond-plugin-file-validate-type/dist/filepond-plugin-file-validate-type.esm.js:
  (*!
   * FilePondPluginFileValidateType 1.2.9
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
   * FilePondPluginImagePreview 4.6.12
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
   * FilePondPluginImageTransform 3.8.7
   * Licensed under MIT, https://opensource.org/licenses/MIT/
   * Please visit https://pqina.nl/filepond/ for details.
   *)

filepond-plugin-media-preview/dist/filepond-plugin-media-preview.esm.js:
  (*!
   * FilePondPluginMediaPreview 1.0.11
   * Licensed under MIT, https://opensource.org/licenses/MIT/
   * Please visit undefined for details.
   *)
*/
