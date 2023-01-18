"use strict";
var t$ = Object.defineProperty,
  n$ = (re, Tt, sn) =>
    Tt in re
      ? t$(re, Tt, {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: sn,
        })
      : (re[Tt] = sn),
  I = (re, Tt, sn) => (n$(re, "symbol" != typeof Tt ? Tt + "" : Tt, sn), sn);
(self.webpackChunkcardano_mc_anim =
  self.webpackChunkcardano_mc_anim || []).push([
  [179],
  {
    766: () => {
      function re(t) {
        return "function" == typeof t;
      }
      function Tt(t) {
        const n = t((i) => {
          Error.call(i), (i.stack = new Error().stack);
        });
        return (
          (n.prototype = Object.create(Error.prototype)),
          (n.prototype.constructor = n),
          n
        );
      }
      const sn = Tt(
        (t) =>
          function (n) {
            t(this),
              (this.message = n
                ? `${n.length} errors occurred during unsubscription:\n${n
                    .map((i, s) => `${s + 1}) ${i.toString()}`)
                    .join("\n  ")}`
                : ""),
              (this.name = "UnsubscriptionError"),
              (this.errors = n);
          }
      );
      function Li(t, e) {
        if (t) {
          const n = t.indexOf(e);
          0 <= n && t.splice(n, 1);
        }
      }
      class Vt {
        constructor(e) {
          (this.initialTeardown = e),
            (this.closed = !1),
            (this._parentage = null),
            (this._finalizers = null);
        }
        unsubscribe() {
          let e;
          if (!this.closed) {
            this.closed = !0;
            const { _parentage: n } = this;
            if (n)
              if (((this._parentage = null), Array.isArray(n)))
                for (const r of n) r.remove(this);
              else n.remove(this);
            const { initialTeardown: i } = this;
            if (re(i))
              try {
                i();
              } catch (r) {
                e = r instanceof sn ? r.errors : [r];
              }
            const { _finalizers: s } = this;
            if (s) {
              this._finalizers = null;
              for (const r of s)
                try {
                  lh(r);
                } catch (o) {
                  (e = e ?? []),
                    o instanceof sn ? (e = [...e, ...o.errors]) : e.push(o);
                }
            }
            if (e) throw new sn(e);
          }
        }
        add(e) {
          var n;
          if (e && e !== this)
            if (this.closed) lh(e);
            else {
              if (e instanceof Vt) {
                if (e.closed || e._hasParent(this)) return;
                e._addParent(this);
              }
              (this._finalizers =
                null !== (n = this._finalizers) && void 0 !== n ? n : []).push(
                e
              );
            }
        }
        _hasParent(e) {
          const { _parentage: n } = this;
          return n === e || (Array.isArray(n) && n.includes(e));
        }
        _addParent(e) {
          const { _parentage: n } = this;
          this._parentage = Array.isArray(n) ? (n.push(e), n) : n ? [n, e] : e;
        }
        _removeParent(e) {
          const { _parentage: n } = this;
          n === e ? (this._parentage = null) : Array.isArray(n) && Li(n, e);
        }
        remove(e) {
          const { _finalizers: n } = this;
          n && Li(n, e), e instanceof Vt && e._removeParent(this);
        }
      }
      Vt.EMPTY = (() => {
        const t = new Vt();
        return (t.closed = !0), t;
      })();
      const oh = Vt.EMPTY;
      function ah(t) {
        return (
          t instanceof Vt ||
          (t && "closed" in t && re(t.remove) && re(t.add) && re(t.unsubscribe))
        );
      }
      function lh(t) {
        re(t) ? t() : t.unsubscribe();
      }
      const oi = {
          onUnhandledError: null,
          onStoppedNotification: null,
          Promise: void 0,
          useDeprecatedSynchronousErrorHandling: !1,
          useDeprecatedNextContext: !1,
        },
        yo = {
          setTimeout(t, e, ...n) {
            const { delegate: i } = yo;
            return i?.setTimeout
              ? i.setTimeout(t, e, ...n)
              : setTimeout(t, e, ...n);
          },
          clearTimeout(t) {
            const { delegate: e } = yo;
            return (e?.clearTimeout || clearTimeout)(t);
          },
          delegate: void 0,
        };
      function ch(t) {
        yo.setTimeout(() => {
          const { onUnhandledError: e } = oi;
          if (!e) throw t;
          e(t);
        });
      }
      function uh() {}
      const bw = $l("C", void 0, void 0);
      function $l(t, e, n) {
        return { kind: t, value: e, error: n };
      }
      let ai = null;
      function _o(t) {
        if (oi.useDeprecatedSynchronousErrorHandling) {
          const e = !ai;
          if ((e && (ai = { errorThrown: !1, error: null }), t(), e)) {
            const { errorThrown: n, error: i } = ai;
            if (((ai = null), n)) throw i;
          }
        } else t();
      }
      class zl extends Vt {
        constructor(e) {
          super(),
            (this.isStopped = !1),
            e
              ? ((this.destination = e), ah(e) && e.add(this))
              : (this.destination = Mw);
        }
        static create(e, n, i) {
          return new $s(e, n, i);
        }
        next(e) {
          this.isStopped
            ? Wl(
                (function Dw(t) {
                  return $l("N", t, void 0);
                })(e),
                this
              )
            : this._next(e);
        }
        error(e) {
          this.isStopped
            ? Wl(
                (function vw(t) {
                  return $l("E", void 0, t);
                })(e),
                this
              )
            : ((this.isStopped = !0), this._error(e));
        }
        complete() {
          this.isStopped
            ? Wl(bw, this)
            : ((this.isStopped = !0), this._complete());
        }
        unsubscribe() {
          this.closed ||
            ((this.isStopped = !0),
            super.unsubscribe(),
            (this.destination = null));
        }
        _next(e) {
          this.destination.next(e);
        }
        _error(e) {
          try {
            this.destination.error(e);
          } finally {
            this.unsubscribe();
          }
        }
        _complete() {
          try {
            this.destination.complete();
          } finally {
            this.unsubscribe();
          }
        }
      }
      const Cw = Function.prototype.bind;
      function Ul(t, e) {
        return Cw.call(t, e);
      }
      class xw {
        constructor(e) {
          this.partialObserver = e;
        }
        next(e) {
          const { partialObserver: n } = this;
          if (n.next)
            try {
              n.next(e);
            } catch (i) {
              bo(i);
            }
        }
        error(e) {
          const { partialObserver: n } = this;
          if (n.error)
            try {
              n.error(e);
            } catch (i) {
              bo(i);
            }
          else bo(e);
        }
        complete() {
          const { partialObserver: e } = this;
          if (e.complete)
            try {
              e.complete();
            } catch (n) {
              bo(n);
            }
        }
      }
      class $s extends zl {
        constructor(e, n, i) {
          let s;
          if ((super(), re(e) || !e))
            s = {
              next: e ?? void 0,
              error: n ?? void 0,
              complete: i ?? void 0,
            };
          else {
            let r;
            this && oi.useDeprecatedNextContext
              ? ((r = Object.create(e)),
                (r.unsubscribe = () => this.unsubscribe()),
                (s = {
                  next: e.next && Ul(e.next, r),
                  error: e.error && Ul(e.error, r),
                  complete: e.complete && Ul(e.complete, r),
                }))
              : (s = e);
          }
          this.destination = new xw(s);
        }
      }
      function bo(t) {
        oi.useDeprecatedSynchronousErrorHandling
          ? (function ww(t) {
              oi.useDeprecatedSynchronousErrorHandling &&
                ai &&
                ((ai.errorThrown = !0), (ai.error = t));
            })(t)
          : ch(t);
      }
      function Wl(t, e) {
        const { onStoppedNotification: n } = oi;
        n && yo.setTimeout(() => n(t, e));
      }
      const Mw = {
          closed: !0,
          next: uh,
          error: function Ew(t) {
            throw t;
          },
          complete: uh,
        },
        Gl =
          ("function" == typeof Symbol && Symbol.observable) || "@@observable";
      function dh(t) {
        return t;
      }
      let We = (() => {
        class t {
          constructor(n) {
            n && (this._subscribe = n);
          }
          lift(n) {
            const i = new t();
            return (i.source = this), (i.operator = n), i;
          }
          subscribe(n, i, s) {
            const r = (function Iw(t) {
              return (
                (t && t instanceof zl) ||
                ((function Sw(t) {
                  return t && re(t.next) && re(t.error) && re(t.complete);
                })(t) &&
                  ah(t))
              );
            })(n)
              ? n
              : new $s(n, i, s);
            return (
              _o(() => {
                const { operator: o, source: a } = this;
                r.add(
                  o
                    ? o.call(r, a)
                    : a
                    ? this._subscribe(r)
                    : this._trySubscribe(r)
                );
              }),
              r
            );
          }
          _trySubscribe(n) {
            try {
              return this._subscribe(n);
            } catch (i) {
              n.error(i);
            }
          }
          forEach(n, i) {
            return new (i = hh(i))((s, r) => {
              const o = new $s({
                next: (a) => {
                  try {
                    n(a);
                  } catch (l) {
                    r(l), o.unsubscribe();
                  }
                },
                error: r,
                complete: s,
              });
              this.subscribe(o);
            });
          }
          _subscribe(n) {
            var i;
            return null === (i = this.source) || void 0 === i
              ? void 0
              : i.subscribe(n);
          }
          [Gl]() {
            return this;
          }
          pipe(...n) {
            return (function fh(t) {
              return 0 === t.length
                ? dh
                : 1 === t.length
                ? t[0]
                : function (n) {
                    return t.reduce((i, s) => s(i), n);
                  };
            })(n)(this);
          }
          toPromise(n) {
            return new (n = hh(n))((i, s) => {
              let r;
              this.subscribe(
                (o) => (r = o),
                (o) => s(o),
                () => i(r)
              );
            });
          }
        }
        return (t.create = (e) => new t(e)), t;
      })();
      function hh(t) {
        var e;
        return null !== (e = t ?? oi.Promise) && void 0 !== e ? e : Promise;
      }
      const Tw = Tt(
        (t) =>
          function () {
            t(this),
              (this.name = "ObjectUnsubscribedError"),
              (this.message = "object unsubscribed");
          }
      );
      let vo = (() => {
        class t extends We {
          constructor() {
            super(),
              (this.closed = !1),
              (this.currentObservers = null),
              (this.observers = []),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null);
          }
          lift(n) {
            const i = new ph(this, this);
            return (i.operator = n), i;
          }
          _throwIfClosed() {
            if (this.closed) throw new Tw();
          }
          next(n) {
            _o(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.currentObservers ||
                  (this.currentObservers = Array.from(this.observers));
                for (const i of this.currentObservers) i.next(n);
              }
            });
          }
          error(n) {
            _o(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                (this.hasError = this.isStopped = !0), (this.thrownError = n);
                const { observers: i } = this;
                for (; i.length; ) i.shift().error(n);
              }
            });
          }
          complete() {
            _o(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.isStopped = !0;
                const { observers: n } = this;
                for (; n.length; ) n.shift().complete();
              }
            });
          }
          unsubscribe() {
            (this.isStopped = this.closed = !0),
              (this.observers = this.currentObservers = null);
          }
          get observed() {
            var n;
            return (
              (null === (n = this.observers) || void 0 === n
                ? void 0
                : n.length) > 0
            );
          }
          _trySubscribe(n) {
            return this._throwIfClosed(), super._trySubscribe(n);
          }
          _subscribe(n) {
            return (
              this._throwIfClosed(),
              this._checkFinalizedStatuses(n),
              this._innerSubscribe(n)
            );
          }
          _innerSubscribe(n) {
            const { hasError: i, isStopped: s, observers: r } = this;
            return i || s
              ? oh
              : ((this.currentObservers = null),
                r.push(n),
                new Vt(() => {
                  (this.currentObservers = null), Li(r, n);
                }));
          }
          _checkFinalizedStatuses(n) {
            const { hasError: i, thrownError: s, isStopped: r } = this;
            i ? n.error(s) : r && n.complete();
          }
          asObservable() {
            const n = new We();
            return (n.source = this), n;
          }
        }
        return (t.create = (e, n) => new ph(e, n)), t;
      })();
      class ph extends vo {
        constructor(e, n) {
          super(), (this.destination = e), (this.source = n);
        }
        next(e) {
          var n, i;
          null ===
            (i =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.next) ||
            void 0 === i ||
            i.call(n, e);
        }
        error(e) {
          var n, i;
          null ===
            (i =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.error) ||
            void 0 === i ||
            i.call(n, e);
        }
        complete() {
          var e, n;
          null ===
            (n =
              null === (e = this.destination) || void 0 === e
                ? void 0
                : e.complete) ||
            void 0 === n ||
            n.call(e);
        }
        _subscribe(e) {
          var n, i;
          return null !==
            (i =
              null === (n = this.source) || void 0 === n
                ? void 0
                : n.subscribe(e)) && void 0 !== i
            ? i
            : oh;
        }
      }
      function Bi(t) {
        return (e) => {
          if (
            (function Aw(t) {
              return re(t?.lift);
            })(e)
          )
            return e.lift(function (n) {
              try {
                return t(n, this);
              } catch (i) {
                this.error(i);
              }
            });
          throw new TypeError("Unable to lift unknown Observable type");
        };
      }
      function zs(t, e, n, i, s) {
        return new Pw(t, e, n, i, s);
      }
      class Pw extends zl {
        constructor(e, n, i, s, r, o) {
          super(e),
            (this.onFinalize = r),
            (this.shouldUnsubscribe = o),
            (this._next = n
              ? function (a) {
                  try {
                    n(a);
                  } catch (l) {
                    e.error(l);
                  }
                }
              : super._next),
            (this._error = s
              ? function (a) {
                  try {
                    s(a);
                  } catch (l) {
                    e.error(l);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._error),
            (this._complete = i
              ? function () {
                  try {
                    i();
                  } catch (a) {
                    e.error(a);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._complete);
        }
        unsubscribe() {
          var e;
          if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
            const { closed: n } = this;
            super.unsubscribe(),
              !n &&
                (null === (e = this.onFinalize) ||
                  void 0 === e ||
                  e.call(this));
          }
        }
      }
      function ji(t, e) {
        return Bi((n, i) => {
          let s = 0;
          n.subscribe(
            zs(i, (r) => {
              i.next(t.call(e, r, s++));
            })
          );
        });
      }
      function li(t) {
        return this instanceof li ? ((this.v = t), this) : new li(t);
      }
      function Nw(t, e, n) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var s,
          i = n.apply(t, e || []),
          r = [];
        return (
          (s = {}),
          o("next"),
          o("throw"),
          o("return"),
          (s[Symbol.asyncIterator] = function () {
            return this;
          }),
          s
        );
        function o(f) {
          i[f] &&
            (s[f] = function (h) {
              return new Promise(function (p, g) {
                r.push([f, h, p, g]) > 1 || a(f, h);
              });
            });
        }
        function a(f, h) {
          try {
            !(function l(f) {
              f.value instanceof li
                ? Promise.resolve(f.value.v).then(c, u)
                : d(r[0][2], f);
            })(i[f](h));
          } catch (p) {
            d(r[0][3], p);
          }
        }
        function c(f) {
          a("next", f);
        }
        function u(f) {
          a("throw", f);
        }
        function d(f, h) {
          f(h), r.shift(), r.length && a(r[0][0], r[0][1]);
        }
      }
      function Fw(t) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var n,
          e = t[Symbol.asyncIterator];
        return e
          ? e.call(t)
          : ((t = (function yh(t) {
              var e = "function" == typeof Symbol && Symbol.iterator,
                n = e && t[e],
                i = 0;
              if (n) return n.call(t);
              if (t && "number" == typeof t.length)
                return {
                  next: function () {
                    return (
                      t && i >= t.length && (t = void 0),
                      { value: t && t[i++], done: !t }
                    );
                  },
                };
              throw new TypeError(
                e
                  ? "Object is not iterable."
                  : "Symbol.iterator is not defined."
              );
            })(t)),
            (n = {}),
            i("next"),
            i("throw"),
            i("return"),
            (n[Symbol.asyncIterator] = function () {
              return this;
            }),
            n);
        function i(r) {
          n[r] =
            t[r] &&
            function (o) {
              return new Promise(function (a, l) {
                !(function s(r, o, a, l) {
                  Promise.resolve(l).then(function (c) {
                    r({ value: c, done: a });
                  }, o);
                })(a, l, (o = t[r](o)).done, o.value);
              });
            };
        }
      }
      const _h = (t) =>
        t && "number" == typeof t.length && "function" != typeof t;
      function bh(t) {
        return re(t?.then);
      }
      function vh(t) {
        return re(t[Gl]);
      }
      function Dh(t) {
        return Symbol.asyncIterator && re(t?.[Symbol.asyncIterator]);
      }
      function wh(t) {
        return new TypeError(
          `You provided ${
            null !== t && "object" == typeof t ? "an invalid object" : `'${t}'`
          } where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`
        );
      }
      const Ch = (function Lw() {
        return "function" == typeof Symbol && Symbol.iterator
          ? Symbol.iterator
          : "@@iterator";
      })();
      function xh(t) {
        return re(t?.[Ch]);
      }
      function Eh(t) {
        return Nw(this, arguments, function* () {
          const n = t.getReader();
          try {
            for (;;) {
              const { value: i, done: s } = yield li(n.read());
              if (s) return yield li(void 0);
              yield yield li(i);
            }
          } finally {
            n.releaseLock();
          }
        });
      }
      function Mh(t) {
        return re(t?.getReader);
      }
      function ci(t) {
        if (t instanceof We) return t;
        if (null != t) {
          if (vh(t))
            return (function Bw(t) {
              return new We((e) => {
                const n = t[Gl]();
                if (re(n.subscribe)) return n.subscribe(e);
                throw new TypeError(
                  "Provided object does not correctly implement Symbol.observable"
                );
              });
            })(t);
          if (_h(t))
            return (function jw(t) {
              return new We((e) => {
                for (let n = 0; n < t.length && !e.closed; n++) e.next(t[n]);
                e.complete();
              });
            })(t);
          if (bh(t))
            return (function Vw(t) {
              return new We((e) => {
                t.then(
                  (n) => {
                    e.closed || (e.next(n), e.complete());
                  },
                  (n) => e.error(n)
                ).then(null, ch);
              });
            })(t);
          if (Dh(t)) return Sh(t);
          if (xh(t))
            return (function Hw(t) {
              return new We((e) => {
                for (const n of t) if ((e.next(n), e.closed)) return;
                e.complete();
              });
            })(t);
          if (Mh(t))
            return (function $w(t) {
              return Sh(Eh(t));
            })(t);
        }
        throw wh(t);
      }
      function Sh(t) {
        return new We((e) => {
          (function zw(t, e) {
            var n, i, s, r;
            return (function Ow(t, e, n, i) {
              return new (n || (n = Promise))(function (r, o) {
                function a(u) {
                  try {
                    c(i.next(u));
                  } catch (d) {
                    o(d);
                  }
                }
                function l(u) {
                  try {
                    c(i.throw(u));
                  } catch (d) {
                    o(d);
                  }
                }
                function c(u) {
                  u.done
                    ? r(u.value)
                    : (function s(r) {
                        return r instanceof n
                          ? r
                          : new n(function (o) {
                              o(r);
                            });
                      })(u.value).then(a, l);
                }
                c((i = i.apply(t, e || [])).next());
              });
            })(this, void 0, void 0, function* () {
              try {
                for (n = Fw(t); !(i = yield n.next()).done; )
                  if ((e.next(i.value), e.closed)) return;
              } catch (o) {
                s = { error: o };
              } finally {
                try {
                  i && !i.done && (r = n.return) && (yield r.call(n));
                } finally {
                  if (s) throw s.error;
                }
              }
              e.complete();
            });
          })(t, e).catch((n) => e.error(n));
        });
      }
      function Vn(t, e, n, i = 0, s = !1) {
        const r = e.schedule(function () {
          n(), s ? t.add(this.schedule(null, i)) : this.unsubscribe();
        }, i);
        if ((t.add(r), !s)) return r;
      }
      function Do(t, e, n = 1 / 0) {
        return re(e)
          ? Do((i, s) => ji((r, o) => e(i, r, s, o))(ci(t(i, s))), n)
          : ("number" == typeof e && (n = e),
            Bi((i, s) =>
              (function Uw(t, e, n, i, s, r, o, a) {
                const l = [];
                let c = 0,
                  u = 0,
                  d = !1;
                const f = () => {
                    d && !l.length && !c && e.complete();
                  },
                  h = (g) => (c < i ? p(g) : l.push(g)),
                  p = (g) => {
                    r && e.next(g), c++;
                    let m = !1;
                    ci(n(g, u++)).subscribe(
                      zs(
                        e,
                        (y) => {
                          s?.(y), r ? h(y) : e.next(y);
                        },
                        () => {
                          m = !0;
                        },
                        void 0,
                        () => {
                          if (m)
                            try {
                              for (c--; l.length && c < i; ) {
                                const y = l.shift();
                                o ? Vn(e, o, () => p(y)) : p(y);
                              }
                              f();
                            } catch (y) {
                              e.error(y);
                            }
                        }
                      )
                    );
                  };
                return (
                  t.subscribe(
                    zs(e, h, () => {
                      (d = !0), f();
                    })
                  ),
                  () => {
                    a?.();
                  }
                );
              })(i, s, t, n)
            ));
      }
      const Ih = new We((t) => t.complete());
      function Th(t) {
        return t && re(t.schedule);
      }
      function Yl(t) {
        return t[t.length - 1];
      }
      function Ah(t) {
        return Th(Yl(t)) ? t.pop() : void 0;
      }
      function Ph(t, e = 0) {
        return Bi((n, i) => {
          n.subscribe(
            zs(
              i,
              (s) => Vn(i, t, () => i.next(s), e),
              () => Vn(i, t, () => i.complete(), e),
              (s) => Vn(i, t, () => i.error(s), e)
            )
          );
        });
      }
      function Oh(t, e = 0) {
        return Bi((n, i) => {
          i.add(t.schedule(() => n.subscribe(i), e));
        });
      }
      function kh(t, e) {
        if (!t) throw new Error("Iterable cannot be null");
        return new We((n) => {
          Vn(n, e, () => {
            const i = t[Symbol.asyncIterator]();
            Vn(
              n,
              e,
              () => {
                i.next().then((s) => {
                  s.done ? n.complete() : n.next(s.value);
                });
              },
              0,
              !0
            );
          });
        });
      }
      function Nh(t, e) {
        return e
          ? (function Jw(t, e) {
              if (null != t) {
                if (vh(t))
                  return (function Yw(t, e) {
                    return ci(t).pipe(Oh(e), Ph(e));
                  })(t, e);
                if (_h(t))
                  return (function Xw(t, e) {
                    return new We((n) => {
                      let i = 0;
                      return e.schedule(function () {
                        i === t.length
                          ? n.complete()
                          : (n.next(t[i++]), n.closed || this.schedule());
                      });
                    });
                  })(t, e);
                if (bh(t))
                  return (function Kw(t, e) {
                    return ci(t).pipe(Oh(e), Ph(e));
                  })(t, e);
                if (Dh(t)) return kh(t, e);
                if (xh(t))
                  return (function Zw(t, e) {
                    return new We((n) => {
                      let i;
                      return (
                        Vn(n, e, () => {
                          (i = t[Ch]()),
                            Vn(
                              n,
                              e,
                              () => {
                                let s, r;
                                try {
                                  ({ value: s, done: r } = i.next());
                                } catch (o) {
                                  return void n.error(o);
                                }
                                r ? n.complete() : n.next(s);
                              },
                              0,
                              !0
                            );
                        }),
                        () => re(i?.return) && i.return()
                      );
                    });
                  })(t, e);
                if (Mh(t))
                  return (function Qw(t, e) {
                    return kh(Eh(t), e);
                  })(t, e);
              }
              throw wh(t);
            })(t, e)
          : ci(t);
      }
      function Kl(t, e, ...n) {
        if (!0 === e) return void t();
        if (!1 === e) return;
        const i = new $s({
          next: () => {
            i.unsubscribe(), t();
          },
        });
        return e(...n).subscribe(i);
      }
      function ce(t) {
        for (let e in t) if (t[e] === ce) return e;
        throw Error("Could not find renamed property on target object.");
      }
      function ue(t) {
        if ("string" == typeof t) return t;
        if (Array.isArray(t)) return "[" + t.map(ue).join(", ") + "]";
        if (null == t) return "" + t;
        if (t.overriddenName) return `${t.overriddenName}`;
        if (t.name) return `${t.name}`;
        const e = t.toString();
        if (null == e) return "" + e;
        const n = e.indexOf("\n");
        return -1 === n ? e : e.substring(0, n);
      }
      function Zl(t, e) {
        return null == t || "" === t
          ? null === e
            ? ""
            : e
          : null == e || "" === e
          ? t
          : t + " " + e;
      }
      const nC = ce({ __forward_ref__: ce });
      function Ql(t) {
        return (
          (t.__forward_ref__ = Ql),
          (t.toString = function () {
            return ue(this());
          }),
          t
        );
      }
      function k(t) {
        return (function Jl(t) {
          return (
            "function" == typeof t &&
            t.hasOwnProperty(nC) &&
            t.__forward_ref__ === Ql
          );
        })(t)
          ? t()
          : t;
      }
      class P extends Error {
        constructor(e, n) {
          super(
            (function wo(t, e) {
              return `NG0${Math.abs(t)}${e ? ": " + e.trim() : ""}`;
            })(e, n)
          ),
            (this.code = e);
        }
      }
      function R(t) {
        return "string" == typeof t ? t : null == t ? "" : String(t);
      }
      function Co(t, e) {
        throw new P(-201, !1);
      }
      function _t(t, e) {
        null == t &&
          (function ie(t, e, n, i) {
            throw new Error(
              `ASSERTION ERROR: ${t}` +
                (null == i ? "" : ` [Expected=> ${n} ${i} ${e} <=Actual]`)
            );
          })(e, t, null, "!=");
      }
      function J(t) {
        return {
          token: t.token,
          providedIn: t.providedIn || null,
          factory: t.factory,
          value: void 0,
        };
      }
      function _n(t) {
        return { providers: t.providers || [], imports: t.imports || [] };
      }
      function xo(t) {
        return Fh(t, Eo) || Fh(t, Lh);
      }
      function Fh(t, e) {
        return t.hasOwnProperty(e) ? t[e] : null;
      }
      function Rh(t) {
        return t && (t.hasOwnProperty(ec) || t.hasOwnProperty(uC))
          ? t[ec]
          : null;
      }
      const Eo = ce({ ɵprov: ce }),
        ec = ce({ ɵinj: ce }),
        Lh = ce({ ngInjectableDef: ce }),
        uC = ce({ ngInjectorDef: ce });
      var N = (() => (
        ((N = N || {})[(N.Default = 0)] = "Default"),
        (N[(N.Host = 1)] = "Host"),
        (N[(N.Self = 2)] = "Self"),
        (N[(N.SkipSelf = 4)] = "SkipSelf"),
        (N[(N.Optional = 8)] = "Optional"),
        N
      ))();
      let tc;
      function At(t) {
        const e = tc;
        return (tc = t), e;
      }
      function Bh(t, e, n) {
        const i = xo(t);
        return i && "root" == i.providedIn
          ? void 0 === i.value
            ? (i.value = i.factory())
            : i.value
          : n & N.Optional
          ? null
          : void 0 !== e
          ? e
          : void Co(ue(t));
      }
      function Hn(t) {
        return { toString: t }.toString();
      }
      var Ht = (() => (
          ((Ht = Ht || {})[(Ht.OnPush = 0)] = "OnPush"),
          (Ht[(Ht.Default = 1)] = "Default"),
          Ht
        ))(),
        rn = (() => {
          return (
            ((t = rn || (rn = {}))[(t.Emulated = 0)] = "Emulated"),
            (t[(t.None = 2)] = "None"),
            (t[(t.ShadowDom = 3)] = "ShadowDom"),
            rn
          );
          var t;
        })();
      const de = (() =>
          (typeof globalThis < "u" && globalThis) ||
          (typeof global < "u" && global) ||
          (typeof window < "u" && window) ||
          (typeof self < "u" &&
            typeof WorkerGlobalScope < "u" &&
            self instanceof WorkerGlobalScope &&
            self))(),
        Vi = {},
        ne = [],
        Mo = ce({ ɵcmp: ce }),
        nc = ce({ ɵdir: ce }),
        ic = ce({ ɵpipe: ce }),
        jh = ce({ ɵmod: ce }),
        bn = ce({ ɵfac: ce }),
        Us = ce({ __NG_ELEMENT_ID__: ce });
      let fC = 0;
      function ui(t) {
        return Hn(() => {
          const n = !0 === t.standalone,
            i = {},
            s = {
              type: t.type,
              providersResolver: null,
              decls: t.decls,
              vars: t.vars,
              factory: null,
              template: t.template || null,
              consts: t.consts || null,
              ngContentSelectors: t.ngContentSelectors,
              hostBindings: t.hostBindings || null,
              hostVars: t.hostVars || 0,
              hostAttrs: t.hostAttrs || null,
              contentQueries: t.contentQueries || null,
              declaredInputs: i,
              inputs: null,
              outputs: null,
              exportAs: t.exportAs || null,
              onPush: t.changeDetection === Ht.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              standalone: n,
              dependencies: (n && t.dependencies) || null,
              getStandaloneInjector: null,
              selectors: t.selectors || ne,
              viewQuery: t.viewQuery || null,
              features: t.features || null,
              data: t.data || {},
              encapsulation: t.encapsulation || rn.Emulated,
              id: "c" + fC++,
              styles: t.styles || ne,
              _: null,
              setInput: null,
              schemas: t.schemas || null,
              tView: null,
            },
            r = t.dependencies,
            o = t.features;
          return (
            (s.inputs = $h(t.inputs, i)),
            (s.outputs = $h(t.outputs)),
            o && o.forEach((a) => a(s)),
            (s.directiveDefs = r
              ? () => ("function" == typeof r ? r() : r).map(Vh).filter(Hh)
              : null),
            (s.pipeDefs = r
              ? () => ("function" == typeof r ? r() : r).map(it).filter(Hh)
              : null),
            s
          );
        });
      }
      function Vh(t) {
        return oe(t) || nt(t);
      }
      function Hh(t) {
        return null !== t;
      }
      function $n(t) {
        return Hn(() => ({
          type: t.type,
          bootstrap: t.bootstrap || ne,
          declarations: t.declarations || ne,
          imports: t.imports || ne,
          exports: t.exports || ne,
          transitiveCompileScopes: null,
          schemas: t.schemas || null,
          id: t.id || null,
        }));
      }
      function $h(t, e) {
        if (null == t) return Vi;
        const n = {};
        for (const i in t)
          if (t.hasOwnProperty(i)) {
            let s = t[i],
              r = s;
            Array.isArray(s) && ((r = s[1]), (s = s[0])),
              (n[s] = i),
              e && (e[s] = r);
          }
        return n;
      }
      function oe(t) {
        return t[Mo] || null;
      }
      function nt(t) {
        return t[nc] || null;
      }
      function it(t) {
        return t[ic] || null;
      }
      const $ = 11;
      function ft(t) {
        return Array.isArray(t) && "object" == typeof t[1];
      }
      function zt(t) {
        return Array.isArray(t) && !0 === t[1];
      }
      function oc(t) {
        return 0 != (8 & t.flags);
      }
      function Ut(t) {
        return null !== t.template;
      }
      function _C(t) {
        return 0 != (256 & t[2]);
      }
      function gi(t, e) {
        return t.hasOwnProperty(bn) ? t[bn] : null;
      }
      class DC {
        constructor(e, n, i) {
          (this.previousValue = e),
            (this.currentValue = n),
            (this.firstChange = i);
        }
        isFirstChange() {
          return this.firstChange;
        }
      }
      function Wh(t) {
        return t.type.prototype.ngOnChanges && (t.setInput = CC), wC;
      }
      function wC() {
        const t = qh(this),
          e = t?.current;
        if (e) {
          const n = t.previous;
          if (n === Vi) t.previous = e;
          else for (let i in e) n[i] = e[i];
          (t.current = null), this.ngOnChanges(e);
        }
      }
      function CC(t, e, n, i) {
        const s =
            qh(t) ||
            (function xC(t, e) {
              return (t[Gh] = e);
            })(t, { previous: Vi, current: null }),
          r = s.current || (s.current = {}),
          o = s.previous,
          a = this.declaredInputs[n],
          l = o[a];
        (r[a] = new DC(l && l.currentValue, e, o === Vi)), (t[i] = e);
      }
      const Gh = "__ngSimpleChanges__";
      function qh(t) {
        return t[Gh] || null;
      }
      function Pe(t) {
        for (; Array.isArray(t); ) t = t[0];
        return t;
      }
      function ko(t, e) {
        return Pe(e[t]);
      }
      function Dt(t, e) {
        return Pe(e[t.index]);
      }
      function wt(t, e) {
        const n = e[t];
        return ft(n) ? n : n[0];
      }
      function No(t) {
        return 64 == (64 & t[2]);
      }
      function zn(t, e) {
        return null == e ? null : t[e];
      }
      function Yh(t) {
        t[18] = 0;
      }
      function fc(t, e) {
        t[5] += e;
        let n = t,
          i = t[3];
        for (
          ;
          null !== i && ((1 === e && 1 === n[5]) || (-1 === e && 0 === n[5]));

        )
          (i[5] += e), (n = i), (i = i[3]);
      }
      const F = { lFrame: sp(null), bindingsEnabled: !0 };
      function Xh() {
        return F.bindingsEnabled;
      }
      function w() {
        return F.lFrame.lView;
      }
      function X() {
        return F.lFrame.tView;
      }
      function Re() {
        let t = Zh();
        for (; null !== t && 64 === t.type; ) t = t.parent;
        return t;
      }
      function Zh() {
        return F.lFrame.currentTNode;
      }
      function on(t, e) {
        const n = F.lFrame;
        (n.currentTNode = t), (n.isParent = e);
      }
      function hc() {
        return F.lFrame.isParent;
      }
      function HC(t, e) {
        const n = F.lFrame;
        (n.bindingIndex = n.bindingRootIndex = t), gc(e);
      }
      function gc(t) {
        F.lFrame.currentDirectiveIndex = t;
      }
      function yc(t) {
        F.lFrame.currentQueryIndex = t;
      }
      function zC(t) {
        const e = t[1];
        return 2 === e.type ? e.declTNode : 1 === e.type ? t[6] : null;
      }
      function np(t, e, n) {
        if (n & N.SkipSelf) {
          let s = e,
            r = t;
          for (
            ;
            !((s = s.parent),
            null !== s ||
              n & N.Host ||
              ((s = zC(r)), null === s || ((r = r[15]), 10 & s.type)));

          );
          if (null === s) return !1;
          (e = s), (t = r);
        }
        const i = (F.lFrame = ip());
        return (i.currentTNode = e), (i.lView = t), !0;
      }
      function _c(t) {
        const e = ip(),
          n = t[1];
        (F.lFrame = e),
          (e.currentTNode = n.firstChild),
          (e.lView = t),
          (e.tView = n),
          (e.contextLView = t),
          (e.bindingIndex = n.bindingStartIndex),
          (e.inI18n = !1);
      }
      function ip() {
        const t = F.lFrame,
          e = null === t ? null : t.child;
        return null === e ? sp(t) : e;
      }
      function sp(t) {
        const e = {
          currentTNode: null,
          isParent: !0,
          lView: null,
          tView: null,
          selectedIndex: -1,
          contextLView: null,
          elementDepthCount: 0,
          currentNamespace: null,
          currentDirectiveIndex: -1,
          bindingRootIndex: -1,
          bindingIndex: -1,
          currentQueryIndex: 0,
          parent: t,
          child: null,
          inI18n: !1,
        };
        return null !== t && (t.child = e), e;
      }
      function rp() {
        const t = F.lFrame;
        return (
          (F.lFrame = t.parent), (t.currentTNode = null), (t.lView = null), t
        );
      }
      const op = rp;
      function bc() {
        const t = rp();
        (t.isParent = !0),
          (t.tView = null),
          (t.selectedIndex = -1),
          (t.contextLView = null),
          (t.elementDepthCount = 0),
          (t.currentDirectiveIndex = -1),
          (t.currentNamespace = null),
          (t.bindingRootIndex = -1),
          (t.bindingIndex = -1),
          (t.currentQueryIndex = 0);
      }
      function rt() {
        return F.lFrame.selectedIndex;
      }
      function Un(t) {
        F.lFrame.selectedIndex = t;
      }
      function Fo(t, e) {
        for (let n = e.directiveStart, i = e.directiveEnd; n < i; n++) {
          const r = t.data[n].type.prototype,
            {
              ngAfterContentInit: o,
              ngAfterContentChecked: a,
              ngAfterViewInit: l,
              ngAfterViewChecked: c,
              ngOnDestroy: u,
            } = r;
          o && (t.contentHooks || (t.contentHooks = [])).push(-n, o),
            a &&
              ((t.contentHooks || (t.contentHooks = [])).push(n, a),
              (t.contentCheckHooks || (t.contentCheckHooks = [])).push(n, a)),
            l && (t.viewHooks || (t.viewHooks = [])).push(-n, l),
            c &&
              ((t.viewHooks || (t.viewHooks = [])).push(n, c),
              (t.viewCheckHooks || (t.viewCheckHooks = [])).push(n, c)),
            null != u && (t.destroyHooks || (t.destroyHooks = [])).push(n, u);
        }
      }
      function Ro(t, e, n) {
        ap(t, e, 3, n);
      }
      function Lo(t, e, n, i) {
        (3 & t[2]) === n && ap(t, e, n, i);
      }
      function vc(t, e) {
        let n = t[2];
        (3 & n) === e && ((n &= 2047), (n += 1), (t[2] = n));
      }
      function ap(t, e, n, i) {
        const r = i ?? -1,
          o = e.length - 1;
        let a = 0;
        for (let l = void 0 !== i ? 65535 & t[18] : 0; l < o; l++)
          if ("number" == typeof e[l + 1]) {
            if (((a = e[l]), null != i && a >= i)) break;
          } else
            e[l] < 0 && (t[18] += 65536),
              (a < r || -1 == r) &&
                (QC(t, n, e, l), (t[18] = (4294901760 & t[18]) + l + 2)),
              l++;
      }
      function QC(t, e, n, i) {
        const s = n[i] < 0,
          r = n[i + 1],
          a = t[s ? -n[i] : n[i]];
        if (s) {
          if (t[2] >> 11 < t[18] >> 16 && (3 & t[2]) === e) {
            t[2] += 2048;
            try {
              r.call(a);
            } finally {
            }
          }
        } else
          try {
            r.call(a);
          } finally {
          }
      }
      class Zs {
        constructor(e, n, i) {
          (this.factory = e),
            (this.resolving = !1),
            (this.canSeeViewProviders = n),
            (this.injectImpl = i);
        }
      }
      function Bo(t, e, n) {
        let i = 0;
        for (; i < n.length; ) {
          const s = n[i];
          if ("number" == typeof s) {
            if (0 !== s) break;
            i++;
            const r = n[i++],
              o = n[i++],
              a = n[i++];
            t.setAttribute(e, o, a, r);
          } else {
            const r = s,
              o = n[++i];
            cp(r) ? t.setProperty(e, r, o) : t.setAttribute(e, r, o), i++;
          }
        }
        return i;
      }
      function lp(t) {
        return 3 === t || 4 === t || 6 === t;
      }
      function cp(t) {
        return 64 === t.charCodeAt(0);
      }
      function jo(t, e) {
        if (null !== e && 0 !== e.length)
          if (null === t || 0 === t.length) t = e.slice();
          else {
            let n = -1;
            for (let i = 0; i < e.length; i++) {
              const s = e[i];
              "number" == typeof s
                ? (n = s)
                : 0 === n ||
                  up(t, n, s, null, -1 === n || 2 === n ? e[++i] : null);
            }
          }
        return t;
      }
      function up(t, e, n, i, s) {
        let r = 0,
          o = t.length;
        if (-1 === e) o = -1;
        else
          for (; r < t.length; ) {
            const a = t[r++];
            if ("number" == typeof a) {
              if (a === e) {
                o = -1;
                break;
              }
              if (a > e) {
                o = r - 1;
                break;
              }
            }
          }
        for (; r < t.length; ) {
          const a = t[r];
          if ("number" == typeof a) break;
          if (a === n) {
            if (null === i) return void (null !== s && (t[r + 1] = s));
            if (i === t[r + 1]) return void (t[r + 2] = s);
          }
          r++, null !== i && r++, null !== s && r++;
        }
        -1 !== o && (t.splice(o, 0, e), (r = o + 1)),
          t.splice(r++, 0, n),
          null !== i && t.splice(r++, 0, i),
          null !== s && t.splice(r++, 0, s);
      }
      function Gi(t) {
        return 32767 & t;
      }
      function qi(t, e) {
        let n = (function ix(t) {
            return t >> 16;
          })(t),
          i = e;
        for (; n > 0; ) (i = i[15]), n--;
        return i;
      }
      let wc = !0;
      function Vo(t) {
        const e = wc;
        return (wc = t), e;
      }
      let sx = 0;
      const an = {};
      function Js(t, e) {
        const n = xc(t, e);
        if (-1 !== n) return n;
        const i = e[1];
        i.firstCreatePass &&
          ((t.injectorIndex = e.length),
          Cc(i.data, t),
          Cc(e, null),
          Cc(i.blueprint, null));
        const s = Ho(t, e),
          r = t.injectorIndex;
        if (
          (function dp(t) {
            return -1 !== t;
          })(s)
        ) {
          const o = Gi(s),
            a = qi(s, e),
            l = a[1].data;
          for (let c = 0; c < 8; c++) e[r + c] = a[o + c] | l[o + c];
        }
        return (e[r + 8] = s), r;
      }
      function Cc(t, e) {
        t.push(0, 0, 0, 0, 0, 0, 0, 0, e);
      }
      function xc(t, e) {
        return -1 === t.injectorIndex ||
          (t.parent && t.parent.injectorIndex === t.injectorIndex) ||
          null === e[t.injectorIndex + 8]
          ? -1
          : t.injectorIndex;
      }
      function Ho(t, e) {
        if (t.parent && -1 !== t.parent.injectorIndex)
          return t.parent.injectorIndex;
        let n = 0,
          i = null,
          s = e;
        for (; null !== s; ) {
          if (((i = vp(s)), null === i)) return -1;
          if ((n++, (s = s[15]), -1 !== i.injectorIndex))
            return i.injectorIndex | (n << 16);
        }
        return -1;
      }
      function $o(t, e, n) {
        !(function rx(t, e, n) {
          let i;
          "string" == typeof n
            ? (i = n.charCodeAt(0) || 0)
            : n.hasOwnProperty(Us) && (i = n[Us]),
            null == i && (i = n[Us] = sx++);
          const s = 255 & i;
          e.data[t + (s >> 5)] |= 1 << s;
        })(t, e, n);
      }
      function pp(t, e, n) {
        if (n & N.Optional || void 0 !== t) return t;
        Co();
      }
      function gp(t, e, n, i) {
        if (
          (n & N.Optional && void 0 === i && (i = null),
          0 == (n & (N.Self | N.Host)))
        ) {
          const s = t[9],
            r = At(void 0);
          try {
            return s ? s.get(e, i, n & N.Optional) : Bh(e, i, n & N.Optional);
          } finally {
            At(r);
          }
        }
        return pp(i, 0, n);
      }
      function mp(t, e, n, i = N.Default, s) {
        if (null !== t) {
          if (1024 & e[2]) {
            const o = (function dx(t, e, n, i, s) {
              let r = t,
                o = e;
              for (
                ;
                null !== r && null !== o && 1024 & o[2] && !(256 & o[2]);

              ) {
                const a = yp(r, o, n, i | N.Self, an);
                if (a !== an) return a;
                let l = r.parent;
                if (!l) {
                  const c = o[21];
                  if (c) {
                    const u = c.get(n, an, i);
                    if (u !== an) return u;
                  }
                  (l = vp(o)), (o = o[15]);
                }
                r = l;
              }
              return s;
            })(t, e, n, i, an);
            if (o !== an) return o;
          }
          const r = yp(t, e, n, i, an);
          if (r !== an) return r;
        }
        return gp(e, n, i, s);
      }
      function yp(t, e, n, i, s) {
        const r = (function lx(t) {
          if ("string" == typeof t) return t.charCodeAt(0) || 0;
          const e = t.hasOwnProperty(Us) ? t[Us] : void 0;
          return "number" == typeof e ? (e >= 0 ? 255 & e : cx) : e;
        })(n);
        if ("function" == typeof r) {
          if (!np(e, t, i)) return i & N.Host ? pp(s, 0, i) : gp(e, n, i, s);
          try {
            const o = r(i);
            if (null != o || i & N.Optional) return o;
            Co();
          } finally {
            op();
          }
        } else if ("number" == typeof r) {
          let o = null,
            a = xc(t, e),
            l = -1,
            c = i & N.Host ? e[16][6] : null;
          for (
            (-1 === a || i & N.SkipSelf) &&
            ((l = -1 === a ? Ho(t, e) : e[a + 8]),
            -1 !== l && bp(i, !1)
              ? ((o = e[1]), (a = Gi(l)), (e = qi(l, e)))
              : (a = -1));
            -1 !== a;

          ) {
            const u = e[1];
            if (_p(r, a, u.data)) {
              const d = ax(a, e, n, o, i, c);
              if (d !== an) return d;
            }
            (l = e[a + 8]),
              -1 !== l && bp(i, e[1].data[a + 8] === c) && _p(r, a, e)
                ? ((o = u), (a = Gi(l)), (e = qi(l, e)))
                : (a = -1);
          }
        }
        return s;
      }
      function ax(t, e, n, i, s, r) {
        const o = e[1],
          a = o.data[t + 8],
          u = (function zo(t, e, n, i, s) {
            const r = t.providerIndexes,
              o = e.data,
              a = 1048575 & r,
              l = t.directiveStart,
              u = r >> 20,
              f = s ? a + u : t.directiveEnd;
            for (let h = i ? a : a + u; h < f; h++) {
              const p = o[h];
              if ((h < l && n === p) || (h >= l && p.type === n)) return h;
            }
            if (s) {
              const h = o[l];
              if (h && Ut(h) && h.type === n) return l;
            }
            return null;
          })(
            a,
            o,
            n,
            null == i
              ? (function Ao(t) {
                  return 2 == (2 & t.flags);
                })(a) && wc
              : i != o && 0 != (3 & a.type),
            s & N.Host && r === a
          );
        return null !== u ? er(e, o, u, a) : an;
      }
      function er(t, e, n, i) {
        let s = t[n];
        const r = e.data;
        if (
          (function JC(t) {
            return t instanceof Zs;
          })(s)
        ) {
          const o = s;
          o.resolving &&
            (function iC(t, e) {
              const n = e ? `. Dependency path: ${e.join(" > ")} > ${t}` : "";
              throw new P(
                -200,
                `Circular dependency in DI detected for ${t}${n}`
              );
            })(
              (function te(t) {
                return "function" == typeof t
                  ? t.name || t.toString()
                  : "object" == typeof t &&
                    null != t &&
                    "function" == typeof t.type
                  ? t.type.name || t.type.toString()
                  : R(t);
              })(r[n])
            );
          const a = Vo(o.canSeeViewProviders);
          o.resolving = !0;
          const l = o.injectImpl ? At(o.injectImpl) : null;
          np(t, i, N.Default);
          try {
            (s = t[n] = o.factory(void 0, r, t, i)),
              e.firstCreatePass &&
                n >= i.directiveStart &&
                (function ZC(t, e, n) {
                  const {
                    ngOnChanges: i,
                    ngOnInit: s,
                    ngDoCheck: r,
                  } = e.type.prototype;
                  if (i) {
                    const o = Wh(e);
                    (n.preOrderHooks || (n.preOrderHooks = [])).push(t, o),
                      (
                        n.preOrderCheckHooks || (n.preOrderCheckHooks = [])
                      ).push(t, o);
                  }
                  s &&
                    (n.preOrderHooks || (n.preOrderHooks = [])).push(0 - t, s),
                    r &&
                      ((n.preOrderHooks || (n.preOrderHooks = [])).push(t, r),
                      (
                        n.preOrderCheckHooks || (n.preOrderCheckHooks = [])
                      ).push(t, r));
                })(n, r[n], e);
          } finally {
            null !== l && At(l), Vo(a), (o.resolving = !1), op();
          }
        }
        return s;
      }
      function _p(t, e, n) {
        return !!(n[e + (t >> 5)] & (1 << t));
      }
      function bp(t, e) {
        return !(t & N.Self || (t & N.Host && e));
      }
      class Yi {
        constructor(e, n) {
          (this._tNode = e), (this._lView = n);
        }
        get(e, n, i) {
          return mp(this._tNode, this._lView, e, i, n);
        }
      }
      function cx() {
        return new Yi(Re(), w());
      }
      function vp(t) {
        const e = t[1],
          n = e.type;
        return 2 === n ? e.declTNode : 1 === n ? t[6] : null;
      }
      class G {
        constructor(e, n) {
          (this._desc = e),
            (this.ngMetadataName = "InjectionToken"),
            (this.ɵprov = void 0),
            "number" == typeof n
              ? (this.__NG_ELEMENT_ID__ = n)
              : void 0 !== n &&
                (this.ɵprov = J({
                  token: this,
                  providedIn: n.providedIn || "root",
                  factory: n.factory,
                }));
        }
        get multi() {
          return this;
        }
        toString() {
          return `InjectionToken ${this._desc}`;
        }
      }
      function wn(t, e) {
        t.forEach((n) => (Array.isArray(n) ? wn(n, e) : e(n)));
      }
      function Uo(t, e) {
        return e >= t.length - 1 ? t.pop() : t.splice(e, 1)[0];
      }
      function xt(t, e, n) {
        let i = Ji(t, e);
        return (
          i >= 0
            ? (t[1 | i] = n)
            : ((i = ~i),
              (function gx(t, e, n, i) {
                let s = t.length;
                if (s == e) t.push(n, i);
                else if (1 === s) t.push(i, t[0]), (t[0] = n);
                else {
                  for (s--, t.push(t[s - 1], t[s]); s > e; )
                    (t[s] = t[s - 2]), s--;
                  (t[e] = n), (t[e + 1] = i);
                }
              })(t, i, e, n)),
          i
        );
      }
      function Tc(t, e) {
        const n = Ji(t, e);
        if (n >= 0) return t[1 | n];
      }
      function Ji(t, e) {
        return (function Ep(t, e, n) {
          let i = 0,
            s = t.length >> n;
          for (; s !== i; ) {
            const r = i + ((s - i) >> 1),
              o = t[r << n];
            if (e === o) return r << n;
            o > e ? (s = r) : (i = r + 1);
          }
          return ~(s << n);
        })(t, e, 1);
      }
      const sr = {},
        Go = "ngTempTokenPath",
        Cx = /\n/gm,
        Mp = "__source";
      let rr;
      function es(t) {
        const e = rr;
        return (rr = t), e;
      }
      function Ex(t, e = N.Default) {
        if (void 0 === rr) throw new P(-203, !1);
        return null === rr
          ? Bh(t, void 0, e)
          : rr.get(t, e & N.Optional ? null : void 0, e);
      }
      function z(t, e = N.Default) {
        return (
          (function dC() {
            return tc;
          })() || Ex
        )(k(t), e);
      }
      function Oc(t) {
        const e = [];
        for (let n = 0; n < t.length; n++) {
          const i = k(t[n]);
          if (Array.isArray(i)) {
            if (0 === i.length) throw new P(900, !1);
            let s,
              r = N.Default;
            for (let o = 0; o < i.length; o++) {
              const a = i[o],
                l = Sx(a);
              "number" == typeof l
                ? -1 === l
                  ? (s = a.token)
                  : (r |= l)
                : (s = a);
            }
            e.push(z(s, r));
          } else e.push(z(i));
        }
        return e;
      }
      function Sx(t) {
        return t.__NG_DI_FLAG__;
      }
      var ht = (() => (
        ((ht = ht || {})[(ht.Important = 1)] = "Important"),
        (ht[(ht.DashCase = 2)] = "DashCase"),
        ht
      ))();
      const Lc = new Map();
      let Wx = 0;
      const jc = "__ngContext__";
      function Ye(t, e) {
        ft(e)
          ? ((t[jc] = e[20]),
            (function qx(t) {
              Lc.set(t[20], t);
            })(e))
          : (t[jc] = e);
      }
      function Hc(t, e) {
        return undefined(t, e);
      }
      function ur(t) {
        const e = t[3];
        return zt(e) ? e[3] : e;
      }
      function $c(t) {
        return qp(t[13]);
      }
      function zc(t) {
        return qp(t[4]);
      }
      function qp(t) {
        for (; null !== t && !zt(t); ) t = t[4];
        return t;
      }
      function ns(t, e, n, i, s) {
        if (null != i) {
          let r,
            o = !1;
          zt(i) ? (r = i) : ft(i) && ((o = !0), (i = i[0]));
          const a = Pe(i);
          0 === t && null !== n
            ? null == s
              ? Jp(e, n, a)
              : mi(e, n, a, s || null, !0)
            : 1 === t && null !== n
            ? mi(e, n, a, s || null, !0)
            : 2 === t
            ? (function Xc(t, e, n) {
                const i = (function Zo(t, e) {
                  return t.parentNode(e);
                })(t, e);
                i &&
                  (function gE(t, e, n, i) {
                    t.removeChild(e, n, i);
                  })(t, i, e, n);
              })(e, a, o)
            : 3 === t && e.destroyNode(a),
            null != r &&
              (function _E(t, e, n, i, s) {
                const r = n[7];
                r !== Pe(n) && ns(e, t, i, r, s);
                for (let a = 10; a < n.length; a++) {
                  const l = n[a];
                  dr(l[1], l, t, e, i, r);
                }
              })(e, t, r, n, s);
        }
      }
      function Wc(t, e, n) {
        return t.createElement(e, n);
      }
      function Kp(t, e) {
        const n = t[9],
          i = n.indexOf(e),
          s = e[3];
        512 & e[2] && ((e[2] &= -513), fc(s, -1)), n.splice(i, 1);
      }
      function qc(t, e) {
        if (!(128 & e[2])) {
          (e[2] &= -65),
            (e[2] |= 128),
            (function pE(t, e) {
              let n;
              if (null != t && null != (n = t.destroyHooks))
                for (let i = 0; i < n.length; i += 2) {
                  const s = e[n[i]];
                  if (!(s instanceof Zs)) {
                    const r = n[i + 1];
                    if (Array.isArray(r))
                      for (let o = 0; o < r.length; o += 2) {
                        const a = s[r[o]],
                          l = r[o + 1];
                        try {
                          l.call(a);
                        } finally {
                        }
                      }
                    else
                      try {
                        r.call(s);
                      } finally {
                      }
                  }
                }
            })(t, e),
            (function hE(t, e) {
              const n = t.cleanup,
                i = e[7];
              let s = -1;
              if (null !== n)
                for (let r = 0; r < n.length - 1; r += 2)
                  if ("string" == typeof n[r]) {
                    const o = n[r + 1],
                      a = "function" == typeof o ? o(e) : Pe(e[o]),
                      l = i[(s = n[r + 2])],
                      c = n[r + 3];
                    "boolean" == typeof c
                      ? a.removeEventListener(n[r], l, c)
                      : c >= 0
                      ? i[(s = c)]()
                      : i[(s = -c)].unsubscribe(),
                      (r += 2);
                  } else {
                    const o = i[(s = n[r + 1])];
                    n[r].call(o);
                  }
              if (null !== i) {
                for (let r = s + 1; r < i.length; r++) (0, i[r])();
                e[7] = null;
              }
            })(t, e),
            1 === e[1].type && e[$].destroy();
          const n = e[17];
          if (null !== n && zt(e[3])) {
            n !== e[3] && Kp(n, e);
            const i = e[19];
            null !== i && i.detachView(t);
          }
          !(function Yx(t) {
            Lc.delete(t[20]);
          })(e);
        }
      }
      function Zp(t, e, n) {
        return (function Qp(t, e, n) {
          let i = e;
          for (; null !== i && 40 & i.type; ) i = (e = i).parent;
          if (null === i) return n[0];
          if (2 & i.flags) {
            const s = t.data[i.directiveStart].encapsulation;
            if (s === rn.None || s === rn.Emulated) return null;
          }
          return Dt(i, n);
        })(t, e.parent, n);
      }
      function mi(t, e, n, i, s) {
        t.insertBefore(e, n, i, s);
      }
      function Jp(t, e, n) {
        t.appendChild(e, n);
      }
      function eg(t, e, n, i, s) {
        null !== i ? mi(t, e, n, i, s) : Jp(t, e, n);
      }
      let eu,
        ig = function ng(t, e, n) {
          return 40 & t.type ? Dt(t, n) : null;
        };
      function Qo(t, e, n, i) {
        const s = Zp(t, i, e),
          r = e[$],
          a = (function tg(t, e, n) {
            return ig(t, e, n);
          })(i.parent || e[6], i, e);
        if (null != s)
          if (Array.isArray(n))
            for (let l = 0; l < n.length; l++) eg(r, s, n[l], a, !1);
          else eg(r, s, n, a, !1);
      }
      function rg(t, e) {
        return null !== e ? t[16][6].projection[e.projection] : null;
      }
      function Zc(t, e, n, i, s, r, o) {
        for (; null != n; ) {
          const a = i[n.index],
            l = n.type;
          if (
            (o && 0 === e && (a && Ye(Pe(a), i), (n.flags |= 4)),
            64 != (64 & n.flags))
          )
            if (8 & l) Zc(t, e, n.child, i, s, r, !1), ns(e, t, s, a, r);
            else if (32 & l) {
              const c = Hc(n, i);
              let u;
              for (; (u = c()); ) ns(e, t, s, u, r);
              ns(e, t, s, a, r);
            } else 16 & l ? og(t, e, i, n, s, r) : ns(e, t, s, a, r);
          n = o ? n.projectionNext : n.next;
        }
      }
      function dr(t, e, n, i, s, r) {
        Zc(n, i, t.firstChild, e, s, r, !1);
      }
      function og(t, e, n, i, s, r) {
        const o = n[16],
          l = o[6].projection[i.projection];
        if (Array.isArray(l))
          for (let c = 0; c < l.length; c++) ns(e, t, s, l[c], r);
        else Zc(t, e, l, o[3], s, r, !0);
      }
      function ag(t, e, n) {
        t.setAttribute(e, "style", n);
      }
      function Qc(t, e, n) {
        "" === n
          ? t.removeAttribute(e, "class")
          : t.setAttribute(e, "class", n);
      }
      const Dg = new G("ENVIRONMENT_INITIALIZER"),
        wg = new G("INJECTOR", -1),
        Cg = new G("INJECTOR_DEF_TYPES");
      class xg {
        get(e, n = sr) {
          if (n === sr) {
            const i = new Error(`NullInjectorError: No provider for ${ue(e)}!`);
            throw ((i.name = "NullInjectorError"), i);
          }
          return n;
        }
      }
      function qE(...t) {
        return { ɵproviders: Eg(0, t) };
      }
      function Eg(t, ...e) {
        const n = [],
          i = new Set();
        let s;
        return (
          wn(e, (r) => {
            const o = r;
            ou(o, n, [], i) && (s || (s = []), s.push(o));
          }),
          void 0 !== s && Mg(s, n),
          n
        );
      }
      function Mg(t, e) {
        for (let n = 0; n < t.length; n++) {
          const { providers: s } = t[n];
          wn(s, (r) => {
            e.push(r);
          });
        }
      }
      function ou(t, e, n, i) {
        if (!(t = k(t))) return !1;
        let s = null,
          r = Rh(t);
        const o = !r && oe(t);
        if (r || o) {
          if (o && !o.standalone) return !1;
          s = t;
        } else {
          const l = t.ngModule;
          if (((r = Rh(l)), !r)) return !1;
          s = l;
        }
        const a = i.has(s);
        if (o) {
          if (a) return !1;
          if ((i.add(s), o.dependencies)) {
            const l =
              "function" == typeof o.dependencies
                ? o.dependencies()
                : o.dependencies;
            for (const c of l) ou(c, e, n, i);
          }
        } else {
          if (!r) return !1;
          {
            if (null != r.imports && !a) {
              let c;
              i.add(s);
              try {
                wn(r.imports, (u) => {
                  ou(u, e, n, i) && (c || (c = []), c.push(u));
                });
              } finally {
              }
              void 0 !== c && Mg(c, e);
            }
            if (!a) {
              const c = gi(s) || (() => new s());
              e.push(
                { provide: s, useFactory: c, deps: ne },
                { provide: Cg, useValue: s, multi: !0 },
                { provide: Dg, useValue: () => z(s), multi: !0 }
              );
            }
            const l = r.providers;
            null == l ||
              a ||
              wn(l, (u) => {
                e.push(u);
              });
          }
        }
        return s !== t && void 0 !== t.providers;
      }
      const YE = ce({ provide: String, useValue: ce });
      function au(t) {
        return null !== t && "object" == typeof t && YE in t;
      }
      function _i(t) {
        return "function" == typeof t;
      }
      const lu = new G("Set Injector scope."),
        ia = {},
        XE = {};
      let cu;
      function sa() {
        return void 0 === cu && (cu = new xg()), cu;
      }
      class is {}
      class Tg extends is {
        constructor(e, n, i, s) {
          super(),
            (this.parent = n),
            (this.source = i),
            (this.scopes = s),
            (this.records = new Map()),
            (this._ngOnDestroyHooks = new Set()),
            (this._onDestroyHooks = []),
            (this._destroyed = !1),
            du(e, (o) => this.processProvider(o)),
            this.records.set(wg, ss(void 0, this)),
            s.has("environment") && this.records.set(is, ss(void 0, this));
          const r = this.records.get(lu);
          null != r && "string" == typeof r.value && this.scopes.add(r.value),
            (this.injectorDefTypes = new Set(this.get(Cg.multi, ne, N.Self)));
        }
        get destroyed() {
          return this._destroyed;
        }
        destroy() {
          this.assertNotDestroyed(), (this._destroyed = !0);
          try {
            for (const e of this._ngOnDestroyHooks) e.ngOnDestroy();
            for (const e of this._onDestroyHooks) e();
          } finally {
            this.records.clear(),
              this._ngOnDestroyHooks.clear(),
              this.injectorDefTypes.clear(),
              (this._onDestroyHooks.length = 0);
          }
        }
        onDestroy(e) {
          this._onDestroyHooks.push(e);
        }
        runInContext(e) {
          this.assertNotDestroyed();
          const n = es(this),
            i = At(void 0);
          try {
            return e();
          } finally {
            es(n), At(i);
          }
        }
        get(e, n = sr, i = N.Default) {
          this.assertNotDestroyed();
          const s = es(this),
            r = At(void 0);
          try {
            if (!(i & N.SkipSelf)) {
              let a = this.records.get(e);
              if (void 0 === a) {
                const l =
                  (function tM(t) {
                    return (
                      "function" == typeof t ||
                      ("object" == typeof t && t instanceof G)
                    );
                  })(e) && xo(e);
                (a = l && this.injectableDefInScope(l) ? ss(uu(e), ia) : null),
                  this.records.set(e, a);
              }
              if (null != a) return this.hydrate(e, a);
            }
            return (i & N.Self ? sa() : this.parent).get(
              e,
              (n = i & N.Optional && n === sr ? null : n)
            );
          } catch (o) {
            if ("NullInjectorError" === o.name) {
              if (((o[Go] = o[Go] || []).unshift(ue(e)), s)) throw o;
              return (function Ix(t, e, n, i) {
                const s = t[Go];
                throw (
                  (e[Mp] && s.unshift(e[Mp]),
                  (t.message = (function Tx(t, e, n, i = null) {
                    t =
                      t && "\n" === t.charAt(0) && "\u0275" == t.charAt(1)
                        ? t.slice(2)
                        : t;
                    let s = ue(e);
                    if (Array.isArray(e)) s = e.map(ue).join(" -> ");
                    else if ("object" == typeof e) {
                      let r = [];
                      for (let o in e)
                        if (e.hasOwnProperty(o)) {
                          let a = e[o];
                          r.push(
                            o +
                              ":" +
                              ("string" == typeof a ? JSON.stringify(a) : ue(a))
                          );
                        }
                      s = `{${r.join(", ")}}`;
                    }
                    return `${n}${i ? "(" + i + ")" : ""}[${s}]: ${t.replace(
                      Cx,
                      "\n  "
                    )}`;
                  })("\n" + t.message, s, n, i)),
                  (t.ngTokenPath = s),
                  (t[Go] = null),
                  t)
                );
              })(o, e, "R3InjectorError", this.source);
            }
            throw o;
          } finally {
            At(r), es(s);
          }
        }
        resolveInjectorInitializers() {
          const e = es(this),
            n = At(void 0);
          try {
            const i = this.get(Dg.multi, ne, N.Self);
            for (const s of i) s();
          } finally {
            es(e), At(n);
          }
        }
        toString() {
          const e = [],
            n = this.records;
          for (const i of n.keys()) e.push(ue(i));
          return `R3Injector[${e.join(", ")}]`;
        }
        assertNotDestroyed() {
          if (this._destroyed) throw new P(205, !1);
        }
        processProvider(e) {
          let n = _i((e = k(e))) ? e : k(e && e.provide);
          const i = (function QE(t) {
            return au(t)
              ? ss(void 0, t.useValue)
              : ss(
                  (function Ag(t, e, n) {
                    let i;
                    if (_i(t)) {
                      const s = k(t);
                      return gi(s) || uu(s);
                    }
                    if (au(t)) i = () => k(t.useValue);
                    else if (
                      (function Ig(t) {
                        return !(!t || !t.useFactory);
                      })(t)
                    )
                      i = () => t.useFactory(...Oc(t.deps || []));
                    else if (
                      (function Sg(t) {
                        return !(!t || !t.useExisting);
                      })(t)
                    )
                      i = () => z(k(t.useExisting));
                    else {
                      const s = k(t && (t.useClass || t.provide));
                      if (
                        !(function JE(t) {
                          return !!t.deps;
                        })(t)
                      )
                        return gi(s) || uu(s);
                      i = () => new s(...Oc(t.deps));
                    }
                    return i;
                  })(t),
                  ia
                );
          })(e);
          if (_i(e) || !0 !== e.multi) this.records.get(n);
          else {
            let s = this.records.get(n);
            s ||
              ((s = ss(void 0, ia, !0)),
              (s.factory = () => Oc(s.multi)),
              this.records.set(n, s)),
              (n = e),
              s.multi.push(e);
          }
          this.records.set(n, i);
        }
        hydrate(e, n) {
          return (
            n.value === ia && ((n.value = XE), (n.value = n.factory())),
            "object" == typeof n.value &&
              n.value &&
              (function eM(t) {
                return (
                  null !== t &&
                  "object" == typeof t &&
                  "function" == typeof t.ngOnDestroy
                );
              })(n.value) &&
              this._ngOnDestroyHooks.add(n.value),
            n.value
          );
        }
        injectableDefInScope(e) {
          if (!e.providedIn) return !1;
          const n = k(e.providedIn);
          return "string" == typeof n
            ? "any" === n || this.scopes.has(n)
            : this.injectorDefTypes.has(n);
        }
      }
      function uu(t) {
        const e = xo(t),
          n = null !== e ? e.factory : gi(t);
        if (null !== n) return n;
        if (t instanceof G) throw new P(204, !1);
        if (t instanceof Function)
          return (function ZE(t) {
            const e = t.length;
            if (e > 0)
              throw (
                ((function ir(t, e) {
                  const n = [];
                  for (let i = 0; i < t; i++) n.push(e);
                  return n;
                })(e, "?"),
                new P(204, !1))
              );
            const n = (function lC(t) {
              const e = t && (t[Eo] || t[Lh]);
              if (e) {
                const n = (function cC(t) {
                  if (t.hasOwnProperty("name")) return t.name;
                  const e = ("" + t).match(/^function\s*([^\s(]+)/);
                  return null === e ? "" : e[1];
                })(t);
                return (
                  console.warn(
                    `DEPRECATED: DI is instantiating a token "${n}" that inherits its @Injectable decorator but does not provide one itself.\nThis will become an error in a future version of Angular. Please add @Injectable() to the "${n}" class.`
                  ),
                  e
                );
              }
              return null;
            })(t);
            return null !== n ? () => n.factory(t) : () => new t();
          })(t);
        throw new P(204, !1);
      }
      function ss(t, e, n = !1) {
        return { factory: t, value: e, multi: n ? [] : void 0 };
      }
      function nM(t) {
        return !!t.ɵproviders;
      }
      function du(t, e) {
        for (const n of t)
          Array.isArray(n) ? du(n, e) : nM(n) ? du(n.ɵproviders, e) : e(n);
      }
      class Pg {}
      class rM {
        resolveComponentFactory(e) {
          throw (function sM(t) {
            const e = Error(
              `No component factory found for ${ue(
                t
              )}. Did you add it to @NgModule.entryComponents?`
            );
            return (e.ngComponent = t), e;
          })(e);
        }
      }
      let ra = (() => {
        class t {}
        return (t.NULL = new rM()), t;
      })();
      function oM() {
        return rs(Re(), w());
      }
      function rs(t, e) {
        return new os(Dt(t, e));
      }
      let os = (() => {
        class t {
          constructor(n) {
            this.nativeElement = n;
          }
        }
        return (t.__NG_ELEMENT_ID__ = oM), t;
      })();
      class kg {}
      let cM = (() => {
        class t {}
        return (
          (t.ɵprov = J({ token: t, providedIn: "root", factory: () => null })),
          t
        );
      })();
      class fu {
        constructor(e) {
          (this.full = e),
            (this.major = e.split(".")[0]),
            (this.minor = e.split(".")[1]),
            (this.patch = e.split(".").slice(2).join("."));
        }
      }
      const uM = new fu("14.2.12"),
        hu = {};
      function gu(t) {
        return t.ngOriginalError;
      }
      class as {
        constructor() {
          this._console = console;
        }
        handleError(e) {
          const n = this._findOriginalError(e);
          this._console.error("ERROR", e),
            n && this._console.error("ORIGINAL ERROR", n);
        }
        _findOriginalError(e) {
          let n = e && gu(e);
          for (; n && gu(n); ) n = gu(n);
          return n || null;
        }
      }
      function Rg(t, e, n) {
        let i = t.length;
        for (;;) {
          const s = t.indexOf(e, n);
          if (-1 === s) return s;
          if (0 === s || t.charCodeAt(s - 1) <= 32) {
            const r = e.length;
            if (s + r === i || t.charCodeAt(s + r) <= 32) return s;
          }
          n = s + 1;
        }
      }
      const Lg = "ng-template";
      function DM(t, e, n) {
        let i = 0;
        for (; i < t.length; ) {
          let s = t[i++];
          if (n && "class" === s) {
            if (((s = t[i]), -1 !== Rg(s.toLowerCase(), e, 0))) return !0;
          } else if (1 === s) {
            for (; i < t.length && "string" == typeof (s = t[i++]); )
              if (s.toLowerCase() === e) return !0;
            return !1;
          }
        }
        return !1;
      }
      function Bg(t) {
        return 4 === t.type && t.value !== Lg;
      }
      function wM(t, e, n) {
        return e === (4 !== t.type || n ? t.value : Lg);
      }
      function CM(t, e, n) {
        let i = 4;
        const s = t.attrs || [],
          r = (function MM(t) {
            for (let e = 0; e < t.length; e++) if (lp(t[e])) return e;
            return t.length;
          })(s);
        let o = !1;
        for (let a = 0; a < e.length; a++) {
          const l = e[a];
          if ("number" != typeof l) {
            if (!o)
              if (4 & i) {
                if (
                  ((i = 2 | (1 & i)),
                  ("" !== l && !wM(t, l, n)) || ("" === l && 1 === e.length))
                ) {
                  if (Wt(i)) return !1;
                  o = !0;
                }
              } else {
                const c = 8 & i ? l : e[++a];
                if (8 & i && null !== t.attrs) {
                  if (!DM(t.attrs, c, n)) {
                    if (Wt(i)) return !1;
                    o = !0;
                  }
                  continue;
                }
                const d = xM(8 & i ? "class" : l, s, Bg(t), n);
                if (-1 === d) {
                  if (Wt(i)) return !1;
                  o = !0;
                  continue;
                }
                if ("" !== c) {
                  let f;
                  f = d > r ? "" : s[d + 1].toLowerCase();
                  const h = 8 & i ? f : null;
                  if ((h && -1 !== Rg(h, c, 0)) || (2 & i && c !== f)) {
                    if (Wt(i)) return !1;
                    o = !0;
                  }
                }
              }
          } else {
            if (!o && !Wt(i) && !Wt(l)) return !1;
            if (o && Wt(l)) continue;
            (o = !1), (i = l | (1 & i));
          }
        }
        return Wt(i) || o;
      }
      function Wt(t) {
        return 0 == (1 & t);
      }
      function xM(t, e, n, i) {
        if (null === e) return -1;
        let s = 0;
        if (i || !n) {
          let r = !1;
          for (; s < e.length; ) {
            const o = e[s];
            if (o === t) return s;
            if (3 === o || 6 === o) r = !0;
            else {
              if (1 === o || 2 === o) {
                let a = e[++s];
                for (; "string" == typeof a; ) a = e[++s];
                continue;
              }
              if (4 === o) break;
              if (0 === o) {
                s += 4;
                continue;
              }
            }
            s += r ? 1 : 2;
          }
          return -1;
        }
        return (function SM(t, e) {
          let n = t.indexOf(4);
          if (n > -1)
            for (n++; n < t.length; ) {
              const i = t[n];
              if ("number" == typeof i) return -1;
              if (i === e) return n;
              n++;
            }
          return -1;
        })(e, t);
      }
      function jg(t, e, n = !1) {
        for (let i = 0; i < e.length; i++) if (CM(t, e[i], n)) return !0;
        return !1;
      }
      function Vg(t, e) {
        return t ? ":not(" + e.trim() + ")" : e;
      }
      function TM(t) {
        let e = t[0],
          n = 1,
          i = 2,
          s = "",
          r = !1;
        for (; n < t.length; ) {
          let o = t[n];
          if ("string" == typeof o)
            if (2 & i) {
              const a = t[++n];
              s += "[" + o + (a.length > 0 ? '="' + a + '"' : "") + "]";
            } else 8 & i ? (s += "." + o) : 4 & i && (s += " " + o);
          else
            "" !== s && !Wt(o) && ((e += Vg(r, s)), (s = "")),
              (i = o),
              (r = r || !Wt(i));
          n++;
        }
        return "" !== s && (e += Vg(r, s)), e;
      }
      const L = {};
      function ze(t) {
        Hg(X(), w(), rt() + t, !1);
      }
      function Hg(t, e, n, i) {
        if (!i)
          if (3 == (3 & e[2])) {
            const r = t.preOrderCheckHooks;
            null !== r && Ro(e, r, n);
          } else {
            const r = t.preOrderHooks;
            null !== r && Lo(e, r, 0, n);
          }
        Un(n);
      }
      function Wg(t, e = null, n = null, i) {
        const s = Gg(t, e, n, i);
        return s.resolveInjectorInitializers(), s;
      }
      function Gg(t, e = null, n = null, i, s = new Set()) {
        const r = [n || ne, qE(t)];
        return (
          (i = i || ("object" == typeof t ? void 0 : ue(t))),
          new Tg(r, e || sa(), i || null, s)
        );
      }
      let qn = (() => {
        class t {
          static create(n, i) {
            if (Array.isArray(n)) return Wg({ name: "" }, i, n, "");
            {
              const s = n.name ?? "";
              return Wg({ name: s }, n.parent, n.providers, s);
            }
          }
        }
        return (
          (t.THROW_IF_NOT_FOUND = sr),
          (t.NULL = new xg()),
          (t.ɵprov = J({ token: t, providedIn: "any", factory: () => z(wg) })),
          (t.__NG_ELEMENT_ID__ = -1),
          t
        );
      })();
      function U(t, e = N.Default) {
        const n = w();
        return null === n ? z(t, e) : mp(Re(), n, k(t), e);
      }
      function aa(t, e) {
        return (t << 17) | (e << 2);
      }
      function Gt(t) {
        return (t >> 17) & 32767;
      }
      function vu(t) {
        return 2 | t;
      }
      function En(t) {
        return (131068 & t) >> 2;
      }
      function Du(t, e) {
        return (-131069 & t) | (e << 2);
      }
      function wu(t) {
        return 1 | t;
      }
      function cm(t, e) {
        const n = t.contentQueries;
        if (null !== n)
          for (let i = 0; i < n.length; i += 2) {
            const s = n[i],
              r = n[i + 1];
            if (-1 !== r) {
              const o = t.data[r];
              yc(s), o.contentQueries(2, e[r], r);
            }
          }
      }
      function ua(t, e, n, i, s, r, o, a, l, c, u) {
        const d = e.blueprint.slice();
        return (
          (d[0] = s),
          (d[2] = 76 | i),
          (null !== u || (t && 1024 & t[2])) && (d[2] |= 1024),
          Yh(d),
          (d[3] = d[15] = t),
          (d[8] = n),
          (d[10] = o || (t && t[10])),
          (d[$] = a || (t && t[$])),
          (d[12] = l || (t && t[12]) || null),
          (d[9] = c || (t && t[9]) || null),
          (d[6] = r),
          (d[20] = (function Gx() {
            return Wx++;
          })()),
          (d[21] = u),
          (d[16] = 2 == e.type ? t[16] : d),
          d
        );
      }
      function us(t, e, n, i, s) {
        let r = t.data[e];
        if (null === r)
          (r = (function Au(t, e, n, i, s) {
            const r = Zh(),
              o = hc(),
              l = (t.data[e] = (function fS(t, e, n, i, s, r) {
                return {
                  type: n,
                  index: i,
                  insertBeforeIndex: null,
                  injectorIndex: e ? e.injectorIndex : -1,
                  directiveStart: -1,
                  directiveEnd: -1,
                  directiveStylingLast: -1,
                  propertyBindings: null,
                  flags: 0,
                  providerIndexes: 0,
                  value: s,
                  attrs: r,
                  mergedAttrs: null,
                  localNames: null,
                  initialInputs: void 0,
                  inputs: null,
                  outputs: null,
                  tViews: null,
                  next: null,
                  projectionNext: null,
                  child: null,
                  parent: e,
                  projection: null,
                  styles: null,
                  stylesWithoutHost: null,
                  residualStyles: void 0,
                  classes: null,
                  classesWithoutHost: null,
                  residualClasses: void 0,
                  classBindings: 0,
                  styleBindings: 0,
                };
              })(0, o ? r : r && r.parent, n, e, i, s));
            return (
              null === t.firstChild && (t.firstChild = l),
              null !== r &&
                (o
                  ? null == r.child && null !== l.parent && (r.child = l)
                  : null === r.next && (r.next = l)),
              l
            );
          })(t, e, n, i, s)),
            (function VC() {
              return F.lFrame.inI18n;
            })() && (r.flags |= 64);
        else if (64 & r.type) {
          (r.type = n), (r.value = i), (r.attrs = s);
          const o = (function Xs() {
            const t = F.lFrame,
              e = t.currentTNode;
            return t.isParent ? e : e.parent;
          })();
          r.injectorIndex = null === o ? -1 : o.injectorIndex;
        }
        return on(r, !0), r;
      }
      function ds(t, e, n, i) {
        if (0 === n) return -1;
        const s = e.length;
        for (let r = 0; r < n; r++)
          e.push(i), t.blueprint.push(i), t.data.push(null);
        return s;
      }
      function Pu(t, e, n) {
        _c(e);
        try {
          const i = t.viewQuery;
          null !== i && ju(1, i, n);
          const s = t.template;
          null !== s && um(t, e, s, 1, n),
            t.firstCreatePass && (t.firstCreatePass = !1),
            t.staticContentQueries && cm(t, e),
            t.staticViewQueries && ju(2, t.viewQuery, n);
          const r = t.components;
          null !== r &&
            (function cS(t, e) {
              for (let n = 0; n < e.length; n++) IS(t, e[n]);
            })(e, r);
        } catch (i) {
          throw (
            (t.firstCreatePass &&
              ((t.incompleteFirstPass = !0), (t.firstCreatePass = !1)),
            i)
          );
        } finally {
          (e[2] &= -5), bc();
        }
      }
      function da(t, e, n, i) {
        const s = e[2];
        if (128 != (128 & s)) {
          _c(e);
          try {
            Yh(e),
              (function Jh(t) {
                return (F.lFrame.bindingIndex = t);
              })(t.bindingStartIndex),
              null !== n && um(t, e, n, 2, i);
            const o = 3 == (3 & s);
            if (o) {
              const c = t.preOrderCheckHooks;
              null !== c && Ro(e, c, null);
            } else {
              const c = t.preOrderHooks;
              null !== c && Lo(e, c, 0, null), vc(e, 0);
            }
            if (
              ((function MS(t) {
                for (let e = $c(t); null !== e; e = zc(e)) {
                  if (!e[2]) continue;
                  const n = e[9];
                  for (let i = 0; i < n.length; i++) {
                    const s = n[i],
                      r = s[3];
                    0 == (512 & s[2]) && fc(r, 1), (s[2] |= 512);
                  }
                }
              })(e),
              (function ES(t) {
                for (let e = $c(t); null !== e; e = zc(e))
                  for (let n = 10; n < e.length; n++) {
                    const i = e[n],
                      s = i[1];
                    No(i) && da(s, i, s.template, i[8]);
                  }
              })(e),
              null !== t.contentQueries && cm(t, e),
              o)
            ) {
              const c = t.contentCheckHooks;
              null !== c && Ro(e, c);
            } else {
              const c = t.contentHooks;
              null !== c && Lo(e, c, 1), vc(e, 1);
            }
            !(function aS(t, e) {
              const n = t.hostBindingOpCodes;
              if (null !== n)
                try {
                  for (let i = 0; i < n.length; i++) {
                    const s = n[i];
                    if (s < 0) Un(~s);
                    else {
                      const r = s,
                        o = n[++i],
                        a = n[++i];
                      HC(o, r), a(2, e[r]);
                    }
                  }
                } finally {
                  Un(-1);
                }
            })(t, e);
            const a = t.components;
            null !== a &&
              (function lS(t, e) {
                for (let n = 0; n < e.length; n++) SS(t, e[n]);
              })(e, a);
            const l = t.viewQuery;
            if ((null !== l && ju(2, l, i), o)) {
              const c = t.viewCheckHooks;
              null !== c && Ro(e, c);
            } else {
              const c = t.viewHooks;
              null !== c && Lo(e, c, 2), vc(e, 2);
            }
            !0 === t.firstUpdatePass && (t.firstUpdatePass = !1),
              (e[2] &= -41),
              512 & e[2] && ((e[2] &= -513), fc(e[3], -1));
          } finally {
            bc();
          }
        }
      }
      function um(t, e, n, i, s) {
        const r = rt(),
          o = 2 & i;
        try {
          Un(-1), o && e.length > 22 && Hg(t, e, 22, !1), n(i, s);
        } finally {
          Un(r);
        }
      }
      function fm(t) {
        const e = t.tView;
        return null === e || e.incompleteFirstPass
          ? (t.tView = Nu(
              1,
              null,
              t.template,
              t.decls,
              t.vars,
              t.directiveDefs,
              t.pipeDefs,
              t.viewQuery,
              t.schemas,
              t.consts
            ))
          : e;
      }
      function Nu(t, e, n, i, s, r, o, a, l, c) {
        const u = 22 + i,
          d = u + s,
          f = (function uS(t, e) {
            const n = [];
            for (let i = 0; i < e; i++) n.push(i < t ? null : L);
            return n;
          })(u, d),
          h = "function" == typeof c ? c() : c;
        return (f[1] = {
          type: t,
          blueprint: f,
          template: n,
          queries: null,
          viewQuery: a,
          declTNode: e,
          data: f.slice().fill(null, u),
          bindingStartIndex: u,
          expandoStartIndex: d,
          hostBindingOpCodes: null,
          firstCreatePass: !0,
          firstUpdatePass: !0,
          staticViewQueries: !1,
          staticContentQueries: !1,
          preOrderHooks: null,
          preOrderCheckHooks: null,
          contentHooks: null,
          contentCheckHooks: null,
          viewHooks: null,
          viewCheckHooks: null,
          destroyHooks: null,
          cleanup: null,
          contentQueries: null,
          components: null,
          directiveRegistry: "function" == typeof r ? r() : r,
          pipeRegistry: "function" == typeof o ? o() : o,
          firstChild: null,
          schemas: l,
          consts: h,
          incompleteFirstPass: !1,
        });
      }
      function pm(t, e, n) {
        for (let i in t)
          if (t.hasOwnProperty(i)) {
            const s = t[i];
            (n = null === n ? {} : n).hasOwnProperty(i)
              ? n[i].push(e, s)
              : (n[i] = [e, s]);
          }
        return n;
      }
      function gm(t, e) {
        const i = e.directiveEnd,
          s = t.data,
          r = e.attrs,
          o = [];
        let a = null,
          l = null;
        for (let c = e.directiveStart; c < i; c++) {
          const u = s[c],
            d = u.inputs,
            f = null === r || Bg(e) ? null : xS(d, r);
          o.push(f), (a = pm(d, c, a)), (l = pm(u.outputs, c, l));
        }
        null !== a &&
          (a.hasOwnProperty("class") && (e.flags |= 16),
          a.hasOwnProperty("style") && (e.flags |= 32)),
          (e.initialInputs = o),
          (e.inputs = a),
          (e.outputs = l);
      }
      function ym(t, e, n, i, s, r) {
        const o = r.hostBindings;
        if (o) {
          let a = t.hostBindingOpCodes;
          null === a && (a = t.hostBindingOpCodes = []);
          const l = ~e.index;
          (function mS(t) {
            let e = t.length;
            for (; e > 0; ) {
              const n = t[--e];
              if ("number" == typeof n && n < 0) return n;
            }
            return 0;
          })(a) != l && a.push(l),
            a.push(i, s, o);
        }
      }
      function _m(t, e) {
        null !== t.hostBindings && t.hostBindings(1, e);
      }
      function bm(t, e) {
        (e.flags |= 2), (t.components || (t.components = [])).push(e.index);
      }
      function DS(t, e, n) {
        if (n) {
          if (e.exportAs)
            for (let i = 0; i < e.exportAs.length; i++) n[e.exportAs[i]] = t;
          Ut(e) && (n[""] = t);
        }
      }
      function vm(t, e, n) {
        (t.flags |= 1),
          (t.directiveStart = e),
          (t.directiveEnd = e + n),
          (t.providerIndexes = e);
      }
      function Dm(t, e, n, i, s) {
        t.data[i] = s;
        const r = s.factory || (s.factory = gi(s.type)),
          o = new Zs(r, Ut(s), U);
        (t.blueprint[i] = o),
          (n[i] = o),
          ym(t, e, 0, i, ds(t, n, s.hostVars, L), s);
      }
      function wS(t, e, n) {
        const i = Dt(e, t),
          s = fm(n),
          r = t[10],
          o = fa(
            t,
            ua(
              t,
              s,
              null,
              n.onPush ? 32 : 16,
              i,
              e,
              r,
              r.createRenderer(i, n),
              null,
              null,
              null
            )
          );
        t[e.index] = o;
      }
      function CS(t, e, n, i, s, r) {
        const o = r[e];
        if (null !== o) {
          const a = i.setInput;
          for (let l = 0; l < o.length; ) {
            const c = o[l++],
              u = o[l++],
              d = o[l++];
            null !== a ? i.setInput(n, d, c, u) : (n[u] = d);
          }
        }
      }
      function xS(t, e) {
        let n = null,
          i = 0;
        for (; i < e.length; ) {
          const s = e[i];
          if (0 !== s)
            if (5 !== s) {
              if ("number" == typeof s) break;
              t.hasOwnProperty(s) &&
                (null === n && (n = []), n.push(s, t[s], e[i + 1])),
                (i += 2);
            } else i += 2;
          else i += 4;
        }
        return n;
      }
      function SS(t, e) {
        const n = wt(e, t);
        if (No(n)) {
          const i = n[1];
          48 & n[2] ? da(i, n, i.template, n[8]) : n[5] > 0 && Lu(n);
        }
      }
      function Lu(t) {
        for (let i = $c(t); null !== i; i = zc(i))
          for (let s = 10; s < i.length; s++) {
            const r = i[s];
            if (No(r))
              if (512 & r[2]) {
                const o = r[1];
                da(o, r, o.template, r[8]);
              } else r[5] > 0 && Lu(r);
          }
        const n = t[1].components;
        if (null !== n)
          for (let i = 0; i < n.length; i++) {
            const s = wt(n[i], t);
            No(s) && s[5] > 0 && Lu(s);
          }
      }
      function IS(t, e) {
        const n = wt(e, t),
          i = n[1];
        (function TS(t, e) {
          for (let n = e.length; n < t.blueprint.length; n++)
            e.push(t.blueprint[n]);
        })(i, n),
          Pu(i, n, n[8]);
      }
      function fa(t, e) {
        return t[13] ? (t[14][4] = e) : (t[13] = e), (t[14] = e), e;
      }
      function ha(t, e, n, i = !0) {
        const s = e[10];
        s.begin && s.begin();
        try {
          da(t, e, t.template, n);
        } catch (o) {
          throw (
            (i &&
              (function Mm(t, e) {
                const n = t[9],
                  i = n ? n.get(as, null) : null;
                i && i.handleError(e);
              })(e, o),
            o)
          );
        } finally {
          s.end && s.end();
        }
      }
      function ju(t, e, n) {
        yc(0), e(t, n);
      }
      function Vu(t, e, n, i, s) {
        for (let r = 0; r < n.length; ) {
          const o = n[r++],
            a = n[r++],
            l = e[o],
            c = t.data[o];
          null !== c.setInput ? c.setInput(l, s, i, a) : (l[a] = s);
        }
      }
      function pa(t, e, n) {
        let i = n ? t.styles : null,
          s = n ? t.classes : null,
          r = 0;
        if (null !== e)
          for (let o = 0; o < e.length; o++) {
            const a = e[o];
            "number" == typeof a
              ? (r = a)
              : 1 == r
              ? (s = Zl(s, a))
              : 2 == r && (i = Zl(i, a + ": " + e[++o] + ";"));
          }
        n ? (t.styles = i) : (t.stylesWithoutHost = i),
          n ? (t.classes = s) : (t.classesWithoutHost = s);
      }
      function ga(t, e, n, i, s = !1) {
        for (; null !== n; ) {
          const r = e[n.index];
          if ((null !== r && i.push(Pe(r)), zt(r)))
            for (let a = 10; a < r.length; a++) {
              const l = r[a],
                c = l[1].firstChild;
              null !== c && ga(l[1], l, c, i);
            }
          const o = n.type;
          if (8 & o) ga(t, e, n.child, i);
          else if (32 & o) {
            const a = Hc(n, e);
            let l;
            for (; (l = a()); ) i.push(l);
          } else if (16 & o) {
            const a = rg(e, n);
            if (Array.isArray(a)) i.push(...a);
            else {
              const l = ur(e[16]);
              ga(l[1], l, a, i, !0);
            }
          }
          n = s ? n.projectionNext : n.next;
        }
        return i;
      }
      class AS extends class gr {
        constructor(e, n) {
          (this._lView = e),
            (this._cdRefInjectingView = n),
            (this._appRef = null),
            (this._attachedToViewContainer = !1);
        }
        get rootNodes() {
          const e = this._lView,
            n = e[1];
          return ga(n, e, n.firstChild, []);
        }
        get context() {
          return this._lView[8];
        }
        set context(e) {
          this._lView[8] = e;
        }
        get destroyed() {
          return 128 == (128 & this._lView[2]);
        }
        destroy() {
          if (this._appRef) this._appRef.detachView(this);
          else if (this._attachedToViewContainer) {
            const e = this._lView[3];
            if (zt(e)) {
              const n = e[8],
                i = n ? n.indexOf(this) : -1;
              i > -1 &&
                ((function Gc(t, e) {
                  if (t.length <= 10) return;
                  const n = 10 + e,
                    i = t[n];
                  if (i) {
                    const s = i[17];
                    null !== s && s !== t && Kp(s, i),
                      e > 0 && (t[n - 1][4] = i[4]);
                    const r = Uo(t, 10 + e);
                    !(function aE(t, e) {
                      dr(t, e, e[$], 2, null, null),
                        (e[0] = null),
                        (e[6] = null);
                    })(i[1], i);
                    const o = r[19];
                    null !== o && o.detachView(r[1]),
                      (i[3] = null),
                      (i[4] = null),
                      (i[2] &= -65);
                  }
                  return i;
                })(e, i),
                Uo(n, i));
            }
            this._attachedToViewContainer = !1;
          }
          !(function Xp(t, e) {
            if (!(128 & e[2])) {
              const n = e[$];
              n.destroyNode && dr(t, e, n, 3, null, null),
                (function uE(t) {
                  let e = t[13];
                  if (!e) return qc(t[1], t);
                  for (; e; ) {
                    let n = null;
                    if (ft(e)) n = e[13];
                    else {
                      const i = e[10];
                      i && (n = i);
                    }
                    if (!n) {
                      for (; e && !e[4] && e !== t; )
                        ft(e) && qc(e[1], e), (e = e[3]);
                      null === e && (e = t),
                        ft(e) && qc(e[1], e),
                        (n = e && e[4]);
                    }
                    e = n;
                  }
                })(e);
            }
          })(this._lView[1], this._lView);
        }
        onDestroy(e) {
          !(function hm(t, e, n, i) {
            const s = (function Cm(t) {
              return t[7] || (t[7] = []);
            })(e);
            null === n
              ? s.push(i)
              : (s.push(n),
                t.firstCreatePass &&
                  (function xm(t) {
                    return t.cleanup || (t.cleanup = []);
                  })(t).push(i, s.length - 1));
          })(this._lView[1], this._lView, null, e);
        }
        markForCheck() {
          !(function Bu(t) {
            for (; t; ) {
              t[2] |= 32;
              const e = ur(t);
              if (_C(t) && !e) return t;
              t = e;
            }
            return null;
          })(this._cdRefInjectingView || this._lView);
        }
        detach() {
          this._lView[2] &= -65;
        }
        reattach() {
          this._lView[2] |= 64;
        }
        detectChanges() {
          ha(this._lView[1], this._lView, this.context);
        }
        checkNoChanges() {}
        attachToViewContainerRef() {
          if (this._appRef) throw new P(902, !1);
          this._attachedToViewContainer = !0;
        }
        detachFromAppRef() {
          (this._appRef = null),
            (function cE(t, e) {
              dr(t, e, e[$], 2, null, null);
            })(this._lView[1], this._lView);
        }
        attachToAppRef(e) {
          if (this._attachedToViewContainer) throw new P(902, !1);
          this._appRef = e;
        }
      } {
        constructor(e) {
          super(e), (this._view = e);
        }
        detectChanges() {
          const e = this._view;
          ha(e[1], e, e[8], !1);
        }
        checkNoChanges() {}
        get context() {
          return null;
        }
      }
      class Hu extends ra {
        constructor(e) {
          super(), (this.ngModule = e);
        }
        resolveComponentFactory(e) {
          const n = oe(e);
          return new mr(n, this.ngModule);
        }
      }
      function Sm(t) {
        const e = [];
        for (let n in t)
          t.hasOwnProperty(n) && e.push({ propName: t[n], templateName: n });
        return e;
      }
      class OS {
        constructor(e, n) {
          (this.injector = e), (this.parentInjector = n);
        }
        get(e, n, i) {
          const s = this.injector.get(e, hu, i);
          return s !== hu || n === hu ? s : this.parentInjector.get(e, n, i);
        }
      }
      class mr extends Pg {
        constructor(e, n) {
          super(),
            (this.componentDef = e),
            (this.ngModule = n),
            (this.componentType = e.type),
            (this.selector = (function AM(t) {
              return t.map(TM).join(",");
            })(e.selectors)),
            (this.ngContentSelectors = e.ngContentSelectors
              ? e.ngContentSelectors
              : []),
            (this.isBoundToModule = !!n);
        }
        get inputs() {
          return Sm(this.componentDef.inputs);
        }
        get outputs() {
          return Sm(this.componentDef.outputs);
        }
        create(e, n, i, s) {
          let r = (s = s || this.ngModule) instanceof is ? s : s?.injector;
          r &&
            null !== this.componentDef.getStandaloneInjector &&
            (r = this.componentDef.getStandaloneInjector(r) || r);
          const o = r ? new OS(e, r) : e,
            a = o.get(kg, null);
          if (null === a) throw new P(407, !1);
          const l = o.get(cM, null),
            c = a.createRenderer(null, this.componentDef),
            u = this.componentDef.selectors[0][0] || "div",
            d = i
              ? (function dS(t, e, n) {
                  return t.selectRootElement(e, n === rn.ShadowDom);
                })(c, i, this.componentDef.encapsulation)
              : Wc(
                  c,
                  u,
                  (function PS(t) {
                    const e = t.toLowerCase();
                    return "svg" === e ? "svg" : "math" === e ? "math" : null;
                  })(u)
                ),
            f = this.componentDef.onPush ? 288 : 272,
            h = Nu(0, null, null, 1, 0, null, null, null, null, null),
            p = ua(null, h, null, f, null, null, a, c, l, o, null);
          let g, m;
          _c(p);
          try {
            const y = (function FS(t, e, n, i, s, r) {
              const o = n[1];
              n[22] = t;
              const l = us(o, 22, 2, "#host", null),
                c = (l.mergedAttrs = e.hostAttrs);
              null !== c &&
                (pa(l, c, !0),
                null !== t &&
                  (Bo(s, t, c),
                  null !== l.classes && Qc(s, t, l.classes),
                  null !== l.styles && ag(s, t, l.styles)));
              const u = i.createRenderer(t, e),
                d = ua(
                  n,
                  fm(e),
                  null,
                  e.onPush ? 32 : 16,
                  n[22],
                  l,
                  i,
                  u,
                  r || null,
                  null,
                  null
                );
              return (
                o.firstCreatePass &&
                  ($o(Js(l, n), o, e.type), bm(o, l), vm(l, n.length, 1)),
                fa(n, d),
                (n[22] = d)
              );
            })(d, this.componentDef, p, a, c);
            if (d)
              if (i) Bo(c, d, ["ng-version", uM.full]);
              else {
                const { attrs: b, classes: _ } = (function PM(t) {
                  const e = [],
                    n = [];
                  let i = 1,
                    s = 2;
                  for (; i < t.length; ) {
                    let r = t[i];
                    if ("string" == typeof r)
                      2 === s
                        ? "" !== r && e.push(r, t[++i])
                        : 8 === s && n.push(r);
                    else {
                      if (!Wt(s)) break;
                      s = r;
                    }
                    i++;
                  }
                  return { attrs: e, classes: n };
                })(this.componentDef.selectors[0]);
                b && Bo(c, d, b), _ && _.length > 0 && Qc(c, d, _.join(" "));
              }
            if (
              ((m = (function dc(t, e) {
                return t.data[e];
              })(h, 22)),
              void 0 !== n)
            ) {
              const b = (m.projection = []);
              for (let _ = 0; _ < this.ngContentSelectors.length; _++) {
                const v = n[_];
                b.push(null != v ? Array.from(v) : null);
              }
            }
            (g = (function RS(t, e, n, i) {
              const s = n[1],
                r = (function gS(t, e, n) {
                  const i = Re();
                  t.firstCreatePass &&
                    (n.providersResolver && n.providersResolver(n),
                    Dm(t, i, e, ds(t, e, 1, null), n),
                    gm(t, i));
                  const s = er(e, t, i.directiveStart, i);
                  Ye(s, e);
                  const r = Dt(i, e);
                  return r && Ye(r, e), s;
                })(s, n, e);
              if (((t[8] = n[8] = r), null !== i)) for (const a of i) a(r, e);
              if (e.contentQueries) {
                const a = Re();
                e.contentQueries(1, r, a.directiveStart);
              }
              const o = Re();
              return (
                !s.firstCreatePass ||
                  (null === e.hostBindings && null === e.hostAttrs) ||
                  (Un(o.index),
                  ym(n[1], o, 0, o.directiveStart, o.directiveEnd, e),
                  _m(e, r)),
                r
              );
            })(y, this.componentDef, p, [LS])),
              Pu(h, p, null);
          } finally {
            bc();
          }
          return new NS(this.componentType, g, rs(m, p), p, m);
        }
      }
      class NS extends class iM {} {
        constructor(e, n, i, s, r) {
          super(),
            (this.location = i),
            (this._rootLView = s),
            (this._tNode = r),
            (this.instance = n),
            (this.hostView = this.changeDetectorRef = new AS(s)),
            (this.componentType = e);
        }
        setInput(e, n) {
          const i = this._tNode.inputs;
          let s;
          if (null !== i && (s = i[e])) {
            const r = this._rootLView;
            Vu(r[1], r, s, e, n),
              (function mm(t, e) {
                const n = wt(e, t);
                16 & n[2] || (n[2] |= 32);
              })(r, this._tNode.index);
          }
        }
        get injector() {
          return new Yi(this._tNode, this._rootLView);
        }
        destroy() {
          this.hostView.destroy();
        }
        onDestroy(e) {
          this.hostView.onDestroy(e);
        }
      }
      function LS() {
        const t = Re();
        Fo(w()[1], t);
      }
      function Ke(t, e, n) {
        return !Object.is(t[e], n) && ((t[e] = n), !0);
      }
      function hs(t, e, n, i) {
        return Ke(
          t,
          (function Wi() {
            return F.lFrame.bindingIndex++;
          })(),
          n
        )
          ? e + R(n) + i
          : L;
      }
      function Uu(t, e, n, i, s) {
        const o = s ? "class" : "style";
        Vu(t, n, e.inputs[o], o, i);
      }
      function Z(t, e, n, i) {
        const s = w(),
          r = X(),
          o = 22 + t,
          a = s[$],
          l = (s[o] = Wc(
            a,
            e,
            (function XC() {
              return F.lFrame.currentNamespace;
            })()
          )),
          c = r.firstCreatePass
            ? (function JS(t, e, n, i, s, r, o) {
                const a = e.consts,
                  c = us(e, t, 2, s, zn(a, r));
                return (
                  (function Fu(t, e, n, i) {
                    let s = !1;
                    if (Xh()) {
                      const r = (function bS(t, e, n) {
                          const i = t.directiveRegistry;
                          let s = null;
                          if (i)
                            for (let r = 0; r < i.length; r++) {
                              const o = i[r];
                              jg(n, o.selectors, !1) &&
                                (s || (s = []),
                                $o(Js(n, e), t, o.type),
                                Ut(o) ? (bm(t, n), s.unshift(o)) : s.push(o));
                            }
                          return s;
                        })(t, e, n),
                        o = null === i ? null : { "": -1 };
                      if (null !== r) {
                        (s = !0), vm(n, t.data.length, r.length);
                        for (let u = 0; u < r.length; u++) {
                          const d = r[u];
                          d.providersResolver && d.providersResolver(d);
                        }
                        let a = !1,
                          l = !1,
                          c = ds(t, e, r.length, null);
                        for (let u = 0; u < r.length; u++) {
                          const d = r[u];
                          (n.mergedAttrs = jo(n.mergedAttrs, d.hostAttrs)),
                            Dm(t, n, e, c, d),
                            DS(c, d, o),
                            null !== d.contentQueries && (n.flags |= 8),
                            (null !== d.hostBindings ||
                              null !== d.hostAttrs ||
                              0 !== d.hostVars) &&
                              (n.flags |= 128);
                          const f = d.type.prototype;
                          !a &&
                            (f.ngOnChanges || f.ngOnInit || f.ngDoCheck) &&
                            ((t.preOrderHooks || (t.preOrderHooks = [])).push(
                              n.index
                            ),
                            (a = !0)),
                            !l &&
                              (f.ngOnChanges || f.ngDoCheck) &&
                              ((
                                t.preOrderCheckHooks ||
                                (t.preOrderCheckHooks = [])
                              ).push(n.index),
                              (l = !0)),
                            c++;
                        }
                        gm(t, n);
                      }
                      o &&
                        (function vS(t, e, n) {
                          if (e) {
                            const i = (t.localNames = []);
                            for (let s = 0; s < e.length; s += 2) {
                              const r = n[e[s + 1]];
                              if (null == r) throw new P(-301, !1);
                              i.push(e[s], r);
                            }
                          }
                        })(n, i, o);
                    }
                    return (n.mergedAttrs = jo(n.mergedAttrs, n.attrs)), s;
                  })(e, n, c, zn(a, o)),
                  null !== c.attrs && pa(c, c.attrs, !1),
                  null !== c.mergedAttrs && pa(c, c.mergedAttrs, !0),
                  null !== e.queries && e.queries.elementStart(e, c),
                  c
                );
              })(o, r, s, 0, e, n, i)
            : r.data[o];
        on(c, !0);
        const u = c.mergedAttrs;
        null !== u && Bo(a, l, u);
        const d = c.classes;
        null !== d && Qc(a, l, d);
        const f = c.styles;
        return (
          null !== f && ag(a, l, f),
          64 != (64 & c.flags) && Qo(r, s, l, c),
          0 ===
            (function OC() {
              return F.lFrame.elementDepthCount;
            })() && Ye(l, s),
          (function kC() {
            F.lFrame.elementDepthCount++;
          })(),
          (function Po(t) {
            return 1 == (1 & t.flags);
          })(c) &&
            ((function Ou(t, e, n) {
              !Xh() ||
                ((function yS(t, e, n, i) {
                  const s = n.directiveStart,
                    r = n.directiveEnd;
                  t.firstCreatePass || Js(n, e), Ye(i, e);
                  const o = n.initialInputs;
                  for (let a = s; a < r; a++) {
                    const l = t.data[a],
                      c = Ut(l);
                    c && wS(e, n, l);
                    const u = er(e, t, a, n);
                    Ye(u, e),
                      null !== o && CS(0, a - s, u, l, 0, o),
                      c && (wt(n.index, e)[8] = u);
                  }
                })(t, e, n, Dt(n, e)),
                128 == (128 & n.flags) &&
                  (function _S(t, e, n) {
                    const i = n.directiveStart,
                      s = n.directiveEnd,
                      r = n.index,
                      o = (function $C() {
                        return F.lFrame.currentDirectiveIndex;
                      })();
                    try {
                      Un(r);
                      for (let a = i; a < s; a++) {
                        const l = t.data[a],
                          c = e[a];
                        gc(a),
                          (null !== l.hostBindings ||
                            0 !== l.hostVars ||
                            null !== l.hostAttrs) &&
                            _m(l, c);
                      }
                    } finally {
                      Un(-1), gc(o);
                    }
                  })(t, e, n));
            })(r, s, c),
            (function dm(t, e, n) {
              if (oc(e)) {
                const s = e.directiveEnd;
                for (let r = e.directiveStart; r < s; r++) {
                  const o = t.data[r];
                  o.contentQueries && o.contentQueries(1, n[r], r);
                }
              }
            })(r, c, s)),
          null !== i &&
            (function ku(t, e, n = Dt) {
              const i = e.localNames;
              if (null !== i) {
                let s = e.index + 1;
                for (let r = 0; r < i.length; r += 2) {
                  const o = i[r + 1],
                    a = -1 === o ? n(e, t) : t[o];
                  t[s++] = a;
                }
              }
            })(s, c),
          Z
        );
      }
      function se() {
        let t = Re();
        hc()
          ? (function pc() {
              F.lFrame.isParent = !1;
            })()
          : ((t = t.parent), on(t, !1));
        const e = t;
        !(function NC() {
          F.lFrame.elementDepthCount--;
        })();
        const n = X();
        return (
          n.firstCreatePass && (Fo(n, t), oc(t) && n.queries.elementEnd(t)),
          null != e.classesWithoutHost &&
            (function tx(t) {
              return 0 != (16 & t.flags);
            })(e) &&
            Uu(n, e, w(), e.classesWithoutHost, !0),
          null != e.stylesWithoutHost &&
            (function nx(t) {
              return 0 != (32 & t.flags);
            })(e) &&
            Uu(n, e, w(), e.stylesWithoutHost, !1),
          se
        );
      }
      function Mt(t, e, n, i) {
        return Z(t, e, n, i), se(), Mt;
      }
      function qu(t) {
        return !!t && "function" == typeof t.then;
      }
      const nI = function $m(t) {
        return !!t && "function" == typeof t.subscribe;
      };
      function iy(t, e, n, i, s) {
        const r = t[n + 1],
          o = null === e;
        let a = i ? Gt(r) : En(r),
          l = !1;
        for (; 0 !== a && (!1 === l || o); ) {
          const u = t[a + 1];
          uI(t[a], e) && ((l = !0), (t[a + 1] = i ? wu(u) : vu(u))),
            (a = i ? Gt(u) : En(u));
        }
        l && (t[n + 1] = i ? vu(r) : wu(r));
      }
      function uI(t, e) {
        return (
          null === t ||
          null == e ||
          (Array.isArray(t) ? t[1] : t) === e ||
          (!(!Array.isArray(t) || "string" != typeof e) && Ji(t, e) >= 0)
        );
      }
      function Di(t, e, n) {
        return (
          (function qt(t, e, n, i) {
            const s = w(),
              r = X(),
              o = (function Dn(t) {
                const e = F.lFrame,
                  n = e.bindingIndex;
                return (e.bindingIndex = e.bindingIndex + t), n;
              })(2);
            r.firstUpdatePass &&
              (function fy(t, e, n, i) {
                const s = t.data;
                if (null === s[n + 1]) {
                  const r = s[rt()],
                    o = (function dy(t, e) {
                      return e >= t.expandoStartIndex;
                    })(t, n);
                  (function my(t, e) {
                    return 0 != (t.flags & (e ? 16 : 32));
                  })(r, i) &&
                    null === e &&
                    !o &&
                    (e = !1),
                    (e = (function bI(t, e, n, i) {
                      const s = (function mc(t) {
                        const e = F.lFrame.currentDirectiveIndex;
                        return -1 === e ? null : t[e];
                      })(t);
                      let r = i ? e.residualClasses : e.residualStyles;
                      if (null === s)
                        0 === (i ? e.classBindings : e.styleBindings) &&
                          ((n = br((n = Ku(null, t, e, n, i)), e.attrs, i)),
                          (r = null));
                      else {
                        const o = e.directiveStylingLast;
                        if (-1 === o || t[o] !== s)
                          if (((n = Ku(s, t, e, n, i)), null === r)) {
                            let l = (function vI(t, e, n) {
                              const i = n ? e.classBindings : e.styleBindings;
                              if (0 !== En(i)) return t[Gt(i)];
                            })(t, e, i);
                            void 0 !== l &&
                              Array.isArray(l) &&
                              ((l = Ku(null, t, e, l[1], i)),
                              (l = br(l, e.attrs, i)),
                              (function DI(t, e, n, i) {
                                t[Gt(n ? e.classBindings : e.styleBindings)] =
                                  i;
                              })(t, e, i, l));
                          } else
                            r = (function wI(t, e, n) {
                              let i;
                              const s = e.directiveEnd;
                              for (
                                let r = 1 + e.directiveStylingLast;
                                r < s;
                                r++
                              )
                                i = br(i, t[r].hostAttrs, n);
                              return br(i, e.attrs, n);
                            })(t, e, i);
                      }
                      return (
                        void 0 !== r &&
                          (i
                            ? (e.residualClasses = r)
                            : (e.residualStyles = r)),
                        n
                      );
                    })(s, r, e, i)),
                    (function lI(t, e, n, i, s, r) {
                      let o = r ? e.classBindings : e.styleBindings,
                        a = Gt(o),
                        l = En(o);
                      t[i] = n;
                      let u,
                        c = !1;
                      if (Array.isArray(n)) {
                        const d = n;
                        (u = d[1]), (null === u || Ji(d, u) > 0) && (c = !0);
                      } else u = n;
                      if (s)
                        if (0 !== l) {
                          const f = Gt(t[a + 1]);
                          (t[i + 1] = aa(f, a)),
                            0 !== f && (t[f + 1] = Du(t[f + 1], i)),
                            (t[a + 1] = (function ZM(t, e) {
                              return (131071 & t) | (e << 17);
                            })(t[a + 1], i));
                        } else
                          (t[i + 1] = aa(a, 0)),
                            0 !== a && (t[a + 1] = Du(t[a + 1], i)),
                            (a = i);
                      else
                        (t[i + 1] = aa(l, 0)),
                          0 === a ? (a = i) : (t[l + 1] = Du(t[l + 1], i)),
                          (l = i);
                      c && (t[i + 1] = vu(t[i + 1])),
                        iy(t, u, i, !0),
                        iy(t, u, i, !1),
                        (function cI(t, e, n, i, s) {
                          const r = s ? t.residualClasses : t.residualStyles;
                          null != r &&
                            "string" == typeof e &&
                            Ji(r, e) >= 0 &&
                            (n[i + 1] = wu(n[i + 1]));
                        })(e, u, t, i, r),
                        (o = aa(a, l)),
                        r ? (e.classBindings = o) : (e.styleBindings = o);
                    })(s, r, e, n, o, i);
                }
              })(r, t, o, i),
              e !== L &&
                Ke(s, o, e) &&
                (function py(t, e, n, i, s, r, o, a) {
                  if (!(3 & e.type)) return;
                  const l = t.data,
                    c = l[a + 1];
                  _a(
                    (function tm(t) {
                      return 1 == (1 & t);
                    })(c)
                      ? gy(l, e, n, s, En(c), o)
                      : void 0
                  ) ||
                    (_a(r) ||
                      ((function em(t) {
                        return 2 == (2 & t);
                      })(c) &&
                        (r = gy(l, null, n, s, a, o))),
                    (function bE(t, e, n, i, s) {
                      if (e) s ? t.addClass(n, i) : t.removeClass(n, i);
                      else {
                        let r = -1 === i.indexOf("-") ? void 0 : ht.DashCase;
                        null == s
                          ? t.removeStyle(n, i, r)
                          : ("string" == typeof s &&
                              s.endsWith("!important") &&
                              ((s = s.slice(0, -10)), (r |= ht.Important)),
                            t.setStyle(n, i, s, r));
                      }
                    })(i, o, ko(rt(), n), s, r));
                })(
                  r,
                  r.data[rt()],
                  s,
                  s[$],
                  t,
                  (s[o + 1] = (function EI(t, e) {
                    return (
                      null == t ||
                        ("string" == typeof e
                          ? (t += e)
                          : "object" == typeof t &&
                            (t = ue(
                              (function Gn(t) {
                                return t instanceof
                                  class fg {
                                    constructor(e) {
                                      this.changingThisBreaksApplicationSecurity =
                                        e;
                                    }
                                    toString() {
                                      return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see https://g.co/ng/security#xss)`;
                                    }
                                  }
                                  ? t.changingThisBreaksApplicationSecurity
                                  : t;
                              })(t)
                            ))),
                      t
                    );
                  })(e, n)),
                  i,
                  o
                );
          })(t, e, n, !1),
          Di
        );
      }
      function Ku(t, e, n, i, s) {
        let r = null;
        const o = n.directiveEnd;
        let a = n.directiveStylingLast;
        for (
          -1 === a ? (a = n.directiveStart) : a++;
          a < o && ((r = e[a]), (i = br(i, r.hostAttrs, s)), r !== t);

        )
          a++;
        return null !== t && (n.directiveStylingLast = a), i;
      }
      function br(t, e, n) {
        const i = n ? 1 : 2;
        let s = -1;
        if (null !== e)
          for (let r = 0; r < e.length; r++) {
            const o = e[r];
            "number" == typeof o
              ? (s = o)
              : s === i &&
                (Array.isArray(t) || (t = void 0 === t ? [] : ["", t]),
                xt(t, o, !!n || e[++r]));
          }
        return void 0 === t ? null : t;
      }
      function gy(t, e, n, i, s, r) {
        const o = null === e;
        let a;
        for (; s > 0; ) {
          const l = t[s],
            c = Array.isArray(l),
            u = c ? l[1] : l,
            d = null === u;
          let f = n[s + 1];
          f === L && (f = d ? ne : void 0);
          let h = d ? Tc(f, i) : u === i ? f : void 0;
          if ((c && !_a(h) && (h = Tc(l, i)), _a(h) && ((a = h), o))) return a;
          const p = t[s + 1];
          s = o ? Gt(p) : En(p);
        }
        if (null !== e) {
          let l = r ? e.residualClasses : e.residualStyles;
          null != l && (a = Tc(l, i));
        }
        return a;
      }
      function _a(t) {
        return void 0 !== t;
      }
      function Ce(t, e = "") {
        const n = w(),
          i = X(),
          s = t + 22,
          r = i.firstCreatePass ? us(i, s, 1, e, null) : i.data[s],
          o = (n[s] = (function Uc(t, e) {
            return t.createText(e);
          })(n[$], e));
        Qo(i, n, o, r), on(r, !1);
      }
      function Ft(t) {
        return ba("", t, ""), Ft;
      }
      function ba(t, e, n) {
        const i = w(),
          s = hs(i, t, e, n);
        return (
          s !== L &&
            (function Mn(t, e, n) {
              const i = ko(e, t);
              !(function Yp(t, e, n) {
                t.setValue(e, n);
              })(t[$], i, n);
            })(i, rt(), s),
          ba
        );
      }
      const Cs = "en-US";
      let By = Cs;
      class xs {}
      class u_ extends xs {
        constructor(e, n) {
          super(),
            (this._parent = n),
            (this._bootstrapComponents = []),
            (this.destroyCbs = []),
            (this.componentFactoryResolver = new Hu(this));
          const i = (function bt(t, e) {
            const n = t[jh] || null;
            if (!n && !0 === e)
              throw new Error(
                `Type ${ue(t)} does not have '\u0275mod' property.`
              );
            return n;
          })(e);
          (this._bootstrapComponents = (function xn(t) {
            return t instanceof Function ? t() : t;
          })(i.bootstrap)),
            (this._r3Injector = Gg(
              e,
              n,
              [
                { provide: xs, useValue: this },
                { provide: ra, useValue: this.componentFactoryResolver },
              ],
              ue(e),
              new Set(["environment"])
            )),
            this._r3Injector.resolveInjectorInitializers(),
            (this.instance = this._r3Injector.get(e));
        }
        get injector() {
          return this._r3Injector;
        }
        destroy() {
          const e = this._r3Injector;
          !e.destroyed && e.destroy(),
            this.destroyCbs.forEach((n) => n()),
            (this.destroyCbs = null);
        }
        onDestroy(e) {
          this.destroyCbs.push(e);
        }
      }
      class nd extends class WT {} {
        constructor(e) {
          super(), (this.moduleType = e);
        }
        create(e) {
          return new u_(this.moduleType, e);
        }
      }
      function sd(t) {
        return (e) => {
          setTimeout(t, void 0, e);
        };
      }
      const Sn = class D1 extends vo {
        constructor(e = !1) {
          super(), (this.__isAsync = e);
        }
        emit(e) {
          super.next(e);
        }
        subscribe(e, n, i) {
          let s = e,
            r = n || (() => null),
            o = i;
          if (e && "object" == typeof e) {
            const l = e;
            (s = l.next?.bind(l)),
              (r = l.error?.bind(l)),
              (o = l.complete?.bind(l));
          }
          this.__isAsync && ((r = sd(r)), s && (s = sd(s)), o && (o = sd(o)));
          const a = super.subscribe({ next: s, error: r, complete: o });
          return e instanceof Vt && e.add(a), a;
        }
      };
      function Ma(...t) {}
      const K_ = new G("Application Initializer");
      let Sa = (() => {
        class t {
          constructor(n) {
            (this.appInits = n),
              (this.resolve = Ma),
              (this.reject = Ma),
              (this.initialized = !1),
              (this.done = !1),
              (this.donePromise = new Promise((i, s) => {
                (this.resolve = i), (this.reject = s);
              }));
          }
          runInitializers() {
            if (this.initialized) return;
            const n = [],
              i = () => {
                (this.done = !0), this.resolve();
              };
            if (this.appInits)
              for (let s = 0; s < this.appInits.length; s++) {
                const r = this.appInits[s]();
                if (qu(r)) n.push(r);
                else if (nI(r)) {
                  const o = new Promise((a, l) => {
                    r.subscribe({ complete: a, error: l });
                  });
                  n.push(o);
                }
              }
            Promise.all(n)
              .then(() => {
                i();
              })
              .catch((s) => {
                this.reject(s);
              }),
              0 === n.length && i(),
              (this.initialized = !0);
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(z(K_, 8));
          }),
          (t.ɵprov = J({ token: t, factory: t.ɵfac, providedIn: "root" })),
          t
        );
      })();
      const Ir = new G("AppId", {
        providedIn: "root",
        factory: function X_() {
          return `${md()}${md()}${md()}`;
        },
      });
      function md() {
        return String.fromCharCode(97 + Math.floor(25 * Math.random()));
      }
      const Z_ = new G("Platform Initializer"),
        yd = new G("Platform ID", {
          providedIn: "platform",
          factory: () => "unknown",
        }),
        oA = new G("appBootstrapListener"),
        Tn = new G("LocaleId", {
          providedIn: "root",
          factory: () =>
            (function Mx(t, e = N.Default) {
              return (
                "number" != typeof e &&
                  (e =
                    0 |
                    (e.optional && 8) |
                    (e.host && 1) |
                    (e.self && 2) |
                    (e.skipSelf && 4)),
                z(t, e)
              );
            })(Tn, N.Optional | N.SkipSelf) ||
            (function aA() {
              return (typeof $localize < "u" && $localize.locale) || Cs;
            })(),
        }),
        fA = (() => Promise.resolve(0))();
      function _d(t) {
        typeof Zone > "u"
          ? fA.then(() => {
              t && t.apply(null, null);
            })
          : Zone.current.scheduleMicroTask("scheduleMicrotask", t);
      }
      class Xe {
        constructor({
          enableLongStackTrace: e = !1,
          shouldCoalesceEventChangeDetection: n = !1,
          shouldCoalesceRunChangeDetection: i = !1,
        }) {
          if (
            ((this.hasPendingMacrotasks = !1),
            (this.hasPendingMicrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new Sn(!1)),
            (this.onMicrotaskEmpty = new Sn(!1)),
            (this.onStable = new Sn(!1)),
            (this.onError = new Sn(!1)),
            typeof Zone > "u")
          )
            throw new P(908, !1);
          Zone.assertZonePatched();
          const s = this;
          if (
            ((s._nesting = 0),
            (s._outer = s._inner = Zone.current),
            Zone.AsyncStackTaggingZoneSpec)
          ) {
            const r = Zone.AsyncStackTaggingZoneSpec;
            s._inner = s._inner.fork(new r("Angular"));
          }
          Zone.TaskTrackingZoneSpec &&
            (s._inner = s._inner.fork(new Zone.TaskTrackingZoneSpec())),
            e &&
              Zone.longStackTraceZoneSpec &&
              (s._inner = s._inner.fork(Zone.longStackTraceZoneSpec)),
            (s.shouldCoalesceEventChangeDetection = !i && n),
            (s.shouldCoalesceRunChangeDetection = i),
            (s.lastRequestAnimationFrameId = -1),
            (s.nativeRequestAnimationFrame = (function hA() {
              let t = de.requestAnimationFrame,
                e = de.cancelAnimationFrame;
              if (typeof Zone < "u" && t && e) {
                const n = t[Zone.__symbol__("OriginalDelegate")];
                n && (t = n);
                const i = e[Zone.__symbol__("OriginalDelegate")];
                i && (e = i);
              }
              return {
                nativeRequestAnimationFrame: t,
                nativeCancelAnimationFrame: e,
              };
            })().nativeRequestAnimationFrame),
            (function mA(t) {
              const e = () => {
                !(function gA(t) {
                  t.isCheckStableRunning ||
                    -1 !== t.lastRequestAnimationFrameId ||
                    ((t.lastRequestAnimationFrameId =
                      t.nativeRequestAnimationFrame.call(de, () => {
                        t.fakeTopEventTask ||
                          (t.fakeTopEventTask = Zone.root.scheduleEventTask(
                            "fakeTopEventTask",
                            () => {
                              (t.lastRequestAnimationFrameId = -1),
                                vd(t),
                                (t.isCheckStableRunning = !0),
                                bd(t),
                                (t.isCheckStableRunning = !1);
                            },
                            void 0,
                            () => {},
                            () => {}
                          )),
                          t.fakeTopEventTask.invoke();
                      })),
                    vd(t));
                })(t);
              };
              t._inner = t._inner.fork({
                name: "angular",
                properties: { isAngularZone: !0 },
                onInvokeTask: (n, i, s, r, o, a) => {
                  try {
                    return eb(t), n.invokeTask(s, r, o, a);
                  } finally {
                    ((t.shouldCoalesceEventChangeDetection &&
                      "eventTask" === r.type) ||
                      t.shouldCoalesceRunChangeDetection) &&
                      e(),
                      tb(t);
                  }
                },
                onInvoke: (n, i, s, r, o, a, l) => {
                  try {
                    return eb(t), n.invoke(s, r, o, a, l);
                  } finally {
                    t.shouldCoalesceRunChangeDetection && e(), tb(t);
                  }
                },
                onHasTask: (n, i, s, r) => {
                  n.hasTask(s, r),
                    i === s &&
                      ("microTask" == r.change
                        ? ((t._hasPendingMicrotasks = r.microTask),
                          vd(t),
                          bd(t))
                        : "macroTask" == r.change &&
                          (t.hasPendingMacrotasks = r.macroTask));
                },
                onHandleError: (n, i, s, r) => (
                  n.handleError(s, r),
                  t.runOutsideAngular(() => t.onError.emit(r)),
                  !1
                ),
              });
            })(s);
        }
        static isInAngularZone() {
          return typeof Zone < "u" && !0 === Zone.current.get("isAngularZone");
        }
        static assertInAngularZone() {
          if (!Xe.isInAngularZone()) throw new P(909, !1);
        }
        static assertNotInAngularZone() {
          if (Xe.isInAngularZone()) throw new P(909, !1);
        }
        run(e, n, i) {
          return this._inner.run(e, n, i);
        }
        runTask(e, n, i, s) {
          const r = this._inner,
            o = r.scheduleEventTask("NgZoneEvent: " + s, e, pA, Ma, Ma);
          try {
            return r.runTask(o, n, i);
          } finally {
            r.cancelTask(o);
          }
        }
        runGuarded(e, n, i) {
          return this._inner.runGuarded(e, n, i);
        }
        runOutsideAngular(e) {
          return this._outer.run(e);
        }
      }
      const pA = {};
      function bd(t) {
        if (0 == t._nesting && !t.hasPendingMicrotasks && !t.isStable)
          try {
            t._nesting++, t.onMicrotaskEmpty.emit(null);
          } finally {
            if ((t._nesting--, !t.hasPendingMicrotasks))
              try {
                t.runOutsideAngular(() => t.onStable.emit(null));
              } finally {
                t.isStable = !0;
              }
          }
      }
      function vd(t) {
        t.hasPendingMicrotasks = !!(
          t._hasPendingMicrotasks ||
          ((t.shouldCoalesceEventChangeDetection ||
            t.shouldCoalesceRunChangeDetection) &&
            -1 !== t.lastRequestAnimationFrameId)
        );
      }
      function eb(t) {
        t._nesting++,
          t.isStable && ((t.isStable = !1), t.onUnstable.emit(null));
      }
      function tb(t) {
        t._nesting--, bd(t);
      }
      class yA {
        constructor() {
          (this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new Sn()),
            (this.onMicrotaskEmpty = new Sn()),
            (this.onStable = new Sn()),
            (this.onError = new Sn());
        }
        run(e, n, i) {
          return e.apply(n, i);
        }
        runGuarded(e, n, i) {
          return e.apply(n, i);
        }
        runOutsideAngular(e) {
          return e();
        }
        runTask(e, n, i, s) {
          return e.apply(n, i);
        }
      }
      const nb = new G(""),
        Ia = new G("");
      let Cd,
        Dd = (() => {
          class t {
            constructor(n, i, s) {
              (this._ngZone = n),
                (this.registry = i),
                (this._pendingCount = 0),
                (this._isZoneStable = !0),
                (this._didWork = !1),
                (this._callbacks = []),
                (this.taskTrackingZone = null),
                Cd ||
                  ((function _A(t) {
                    Cd = t;
                  })(s),
                  s.addToWindow(i)),
                this._watchAngularEvents(),
                n.run(() => {
                  this.taskTrackingZone =
                    typeof Zone > "u"
                      ? null
                      : Zone.current.get("TaskTrackingZone");
                });
            }
            _watchAngularEvents() {
              this._ngZone.onUnstable.subscribe({
                next: () => {
                  (this._didWork = !0), (this._isZoneStable = !1);
                },
              }),
                this._ngZone.runOutsideAngular(() => {
                  this._ngZone.onStable.subscribe({
                    next: () => {
                      Xe.assertNotInAngularZone(),
                        _d(() => {
                          (this._isZoneStable = !0),
                            this._runCallbacksIfReady();
                        });
                    },
                  });
                });
            }
            increasePendingRequestCount() {
              return (
                (this._pendingCount += 1),
                (this._didWork = !0),
                this._pendingCount
              );
            }
            decreasePendingRequestCount() {
              if (((this._pendingCount -= 1), this._pendingCount < 0))
                throw new Error("pending async requests below zero");
              return this._runCallbacksIfReady(), this._pendingCount;
            }
            isStable() {
              return (
                this._isZoneStable &&
                0 === this._pendingCount &&
                !this._ngZone.hasPendingMacrotasks
              );
            }
            _runCallbacksIfReady() {
              if (this.isStable())
                _d(() => {
                  for (; 0 !== this._callbacks.length; ) {
                    let n = this._callbacks.pop();
                    clearTimeout(n.timeoutId), n.doneCb(this._didWork);
                  }
                  this._didWork = !1;
                });
              else {
                let n = this.getPendingTasks();
                (this._callbacks = this._callbacks.filter(
                  (i) =>
                    !i.updateCb ||
                    !i.updateCb(n) ||
                    (clearTimeout(i.timeoutId), !1)
                )),
                  (this._didWork = !0);
              }
            }
            getPendingTasks() {
              return this.taskTrackingZone
                ? this.taskTrackingZone.macroTasks.map((n) => ({
                    source: n.source,
                    creationLocation: n.creationLocation,
                    data: n.data,
                  }))
                : [];
            }
            addCallback(n, i, s) {
              let r = -1;
              i &&
                i > 0 &&
                (r = setTimeout(() => {
                  (this._callbacks = this._callbacks.filter(
                    (o) => o.timeoutId !== r
                  )),
                    n(this._didWork, this.getPendingTasks());
                }, i)),
                this._callbacks.push({ doneCb: n, timeoutId: r, updateCb: s });
            }
            whenStable(n, i, s) {
              if (s && !this.taskTrackingZone)
                throw new Error(
                  'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?'
                );
              this.addCallback(n, i, s), this._runCallbacksIfReady();
            }
            getPendingRequestCount() {
              return this._pendingCount;
            }
            registerApplication(n) {
              this.registry.registerApplication(n, this);
            }
            unregisterApplication(n) {
              this.registry.unregisterApplication(n);
            }
            findProviders(n, i, s) {
              return [];
            }
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)(z(Xe), z(wd), z(Ia));
            }),
            (t.ɵprov = J({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        wd = (() => {
          class t {
            constructor() {
              this._applications = new Map();
            }
            registerApplication(n, i) {
              this._applications.set(n, i);
            }
            unregisterApplication(n) {
              this._applications.delete(n);
            }
            unregisterAllApplications() {
              this._applications.clear();
            }
            getTestability(n) {
              return this._applications.get(n) || null;
            }
            getAllTestabilities() {
              return Array.from(this._applications.values());
            }
            getAllRootElements() {
              return Array.from(this._applications.keys());
            }
            findTestabilityInTree(n, i = !0) {
              return Cd?.findTestabilityInTree(this, n, i) ?? null;
            }
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)();
            }),
            (t.ɵprov = J({
              token: t,
              factory: t.ɵfac,
              providedIn: "platform",
            })),
            t
          );
        })(),
        Xn = null;
      const ib = new G("AllowMultipleToken"),
        xd = new G("PlatformDestroyListeners");
      function rb(t, e, n = []) {
        const i = `Platform: ${e}`,
          s = new G(i);
        return (r = []) => {
          let o = Ed();
          if (!o || o.injector.get(ib, !1)) {
            const a = [...n, ...r, { provide: s, useValue: !0 }];
            t
              ? t(a)
              : (function DA(t) {
                  if (Xn && !Xn.get(ib, !1)) throw new P(400, !1);
                  Xn = t;
                  const e = t.get(ab);
                  (function sb(t) {
                    const e = t.get(Z_, null);
                    e && e.forEach((n) => n());
                  })(t);
                })(
                  (function ob(t = [], e) {
                    return qn.create({
                      name: e,
                      providers: [
                        { provide: lu, useValue: "platform" },
                        { provide: xd, useValue: new Set([() => (Xn = null)]) },
                        ...t,
                      ],
                    });
                  })(a, i)
                );
          }
          return (function CA(t) {
            const e = Ed();
            if (!e) throw new P(401, !1);
            return e;
          })();
        };
      }
      function Ed() {
        return Xn?.get(ab) ?? null;
      }
      let ab = (() => {
        class t {
          constructor(n) {
            (this._injector = n),
              (this._modules = []),
              (this._destroyListeners = []),
              (this._destroyed = !1);
          }
          bootstrapModuleFactory(n, i) {
            const s = (function cb(t, e) {
                let n;
                return (
                  (n =
                    "noop" === t
                      ? new yA()
                      : ("zone.js" === t ? void 0 : t) || new Xe(e)),
                  n
                );
              })(
                i?.ngZone,
                (function lb(t) {
                  return {
                    enableLongStackTrace: !1,
                    shouldCoalesceEventChangeDetection:
                      !(!t || !t.ngZoneEventCoalescing) || !1,
                    shouldCoalesceRunChangeDetection:
                      !(!t || !t.ngZoneRunCoalescing) || !1,
                  };
                })(i)
              ),
              r = [{ provide: Xe, useValue: s }];
            return s.run(() => {
              const o = qn.create({
                  providers: r,
                  parent: this.injector,
                  name: n.moduleType.name,
                }),
                a = n.create(o),
                l = a.injector.get(as, null);
              if (!l) throw new P(402, !1);
              return (
                s.runOutsideAngular(() => {
                  const c = s.onError.subscribe({
                    next: (u) => {
                      l.handleError(u);
                    },
                  });
                  a.onDestroy(() => {
                    Ta(this._modules, a), c.unsubscribe();
                  });
                }),
                (function ub(t, e, n) {
                  try {
                    const i = n();
                    return qu(i)
                      ? i.catch((s) => {
                          throw (
                            (e.runOutsideAngular(() => t.handleError(s)), s)
                          );
                        })
                      : i;
                  } catch (i) {
                    throw (e.runOutsideAngular(() => t.handleError(i)), i);
                  }
                })(l, s, () => {
                  const c = a.injector.get(Sa);
                  return (
                    c.runInitializers(),
                    c.donePromise.then(
                      () => (
                        (function jy(t) {
                          _t(t, "Expected localeId to be defined"),
                            "string" == typeof t &&
                              (By = t.toLowerCase().replace(/_/g, "-"));
                        })(a.injector.get(Tn, Cs) || Cs),
                        this._moduleDoBootstrap(a),
                        a
                      )
                    )
                  );
                })
              );
            });
          }
          bootstrapModule(n, i = []) {
            const s = db({}, i);
            return (function bA(t, e, n) {
              const i = new nd(n);
              return Promise.resolve(i);
            })(0, 0, n).then((r) => this.bootstrapModuleFactory(r, s));
          }
          _moduleDoBootstrap(n) {
            const i = n.injector.get(Md);
            if (n._bootstrapComponents.length > 0)
              n._bootstrapComponents.forEach((s) => i.bootstrap(s));
            else {
              if (!n.instance.ngDoBootstrap) throw new P(403, !1);
              n.instance.ngDoBootstrap(i);
            }
            this._modules.push(n);
          }
          onDestroy(n) {
            this._destroyListeners.push(n);
          }
          get injector() {
            return this._injector;
          }
          destroy() {
            if (this._destroyed) throw new P(404, !1);
            this._modules.slice().forEach((i) => i.destroy()),
              this._destroyListeners.forEach((i) => i());
            const n = this._injector.get(xd, null);
            n && (n.forEach((i) => i()), n.clear()), (this._destroyed = !0);
          }
          get destroyed() {
            return this._destroyed;
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(z(qn));
          }),
          (t.ɵprov = J({ token: t, factory: t.ɵfac, providedIn: "platform" })),
          t
        );
      })();
      function db(t, e) {
        return Array.isArray(e) ? e.reduce(db, t) : { ...t, ...e };
      }
      let Md = (() => {
        class t {
          constructor(n, i, s) {
            (this._zone = n),
              (this._injector = i),
              (this._exceptionHandler = s),
              (this._bootstrapListeners = []),
              (this._views = []),
              (this._runningTick = !1),
              (this._stable = !0),
              (this._destroyed = !1),
              (this._destroyListeners = []),
              (this.componentTypes = []),
              (this.components = []),
              (this._onMicrotaskEmptySubscription =
                this._zone.onMicrotaskEmpty.subscribe({
                  next: () => {
                    this._zone.run(() => {
                      this.tick();
                    });
                  },
                }));
            const r = new We((a) => {
                (this._stable =
                  this._zone.isStable &&
                  !this._zone.hasPendingMacrotasks &&
                  !this._zone.hasPendingMicrotasks),
                  this._zone.runOutsideAngular(() => {
                    a.next(this._stable), a.complete();
                  });
              }),
              o = new We((a) => {
                let l;
                this._zone.runOutsideAngular(() => {
                  l = this._zone.onStable.subscribe(() => {
                    Xe.assertNotInAngularZone(),
                      _d(() => {
                        !this._stable &&
                          !this._zone.hasPendingMacrotasks &&
                          !this._zone.hasPendingMicrotasks &&
                          ((this._stable = !0), a.next(!0));
                      });
                  });
                });
                const c = this._zone.onUnstable.subscribe(() => {
                  Xe.assertInAngularZone(),
                    this._stable &&
                      ((this._stable = !1),
                      this._zone.runOutsideAngular(() => {
                        a.next(!1);
                      }));
                });
                return () => {
                  l.unsubscribe(), c.unsubscribe();
                };
              });
            this.isStable = (function eC(...t) {
              const e = Ah(t),
                n = (function qw(t, e) {
                  return "number" == typeof Yl(t) ? t.pop() : e;
                })(t, 1 / 0),
                i = t;
              return i.length
                ? 1 === i.length
                  ? ci(i[0])
                  : (function Ww(t = 1 / 0) {
                      return Do(dh, t);
                    })(n)(Nh(i, e))
                : Ih;
            })(
              r,
              o.pipe(
                (function tC(t = {}) {
                  const {
                    connector: e = () => new vo(),
                    resetOnError: n = !0,
                    resetOnComplete: i = !0,
                    resetOnRefCountZero: s = !0,
                  } = t;
                  return (r) => {
                    let o,
                      a,
                      l,
                      c = 0,
                      u = !1,
                      d = !1;
                    const f = () => {
                        a?.unsubscribe(), (a = void 0);
                      },
                      h = () => {
                        f(), (o = l = void 0), (u = d = !1);
                      },
                      p = () => {
                        const g = o;
                        h(), g?.unsubscribe();
                      };
                    return Bi((g, m) => {
                      c++, !d && !u && f();
                      const y = (l = l ?? e());
                      m.add(() => {
                        c--, 0 === c && !d && !u && (a = Kl(p, s));
                      }),
                        y.subscribe(m),
                        !o &&
                          c > 0 &&
                          ((o = new $s({
                            next: (b) => y.next(b),
                            error: (b) => {
                              (d = !0), f(), (a = Kl(h, n, b)), y.error(b);
                            },
                            complete: () => {
                              (u = !0), f(), (a = Kl(h, i)), y.complete();
                            },
                          })),
                          ci(g).subscribe(o));
                    })(r);
                  };
                })()
              )
            );
          }
          get destroyed() {
            return this._destroyed;
          }
          get injector() {
            return this._injector;
          }
          bootstrap(n, i) {
            const s = n instanceof Pg;
            if (!this._injector.get(Sa).done)
              throw (
                (!s &&
                  (function Ws(t) {
                    const e = oe(t) || nt(t) || it(t);
                    return null !== e && e.standalone;
                  })(n),
                new P(405, false))
              );
            let o;
            (o = s ? n : this._injector.get(ra).resolveComponentFactory(n)),
              this.componentTypes.push(o.componentType);
            const a = (function vA(t) {
                return t.isBoundToModule;
              })(o)
                ? void 0
                : this._injector.get(xs),
              c = o.create(qn.NULL, [], i || o.selector, a),
              u = c.location.nativeElement,
              d = c.injector.get(nb, null);
            return (
              d?.registerApplication(u),
              c.onDestroy(() => {
                this.detachView(c.hostView),
                  Ta(this.components, c),
                  d?.unregisterApplication(u);
              }),
              this._loadComponent(c),
              c
            );
          }
          tick() {
            if (this._runningTick) throw new P(101, !1);
            try {
              this._runningTick = !0;
              for (let n of this._views) n.detectChanges();
            } catch (n) {
              this._zone.runOutsideAngular(() =>
                this._exceptionHandler.handleError(n)
              );
            } finally {
              this._runningTick = !1;
            }
          }
          attachView(n) {
            const i = n;
            this._views.push(i), i.attachToAppRef(this);
          }
          detachView(n) {
            const i = n;
            Ta(this._views, i), i.detachFromAppRef();
          }
          _loadComponent(n) {
            this.attachView(n.hostView),
              this.tick(),
              this.components.push(n),
              this._injector
                .get(oA, [])
                .concat(this._bootstrapListeners)
                .forEach((s) => s(n));
          }
          ngOnDestroy() {
            if (!this._destroyed)
              try {
                this._destroyListeners.forEach((n) => n()),
                  this._views.slice().forEach((n) => n.destroy()),
                  this._onMicrotaskEmptySubscription.unsubscribe();
              } finally {
                (this._destroyed = !0),
                  (this._views = []),
                  (this._bootstrapListeners = []),
                  (this._destroyListeners = []);
              }
          }
          onDestroy(n) {
            return (
              this._destroyListeners.push(n),
              () => Ta(this._destroyListeners, n)
            );
          }
          destroy() {
            if (this._destroyed) throw new P(406, !1);
            const n = this._injector;
            n.destroy && !n.destroyed && n.destroy();
          }
          get viewCount() {
            return this._views.length;
          }
          warnIfDestroyed() {}
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(z(Xe), z(is), z(as));
          }),
          (t.ɵprov = J({ token: t, factory: t.ɵfac, providedIn: "root" })),
          t
        );
      })();
      function Ta(t, e) {
        const n = t.indexOf(e);
        n > -1 && t.splice(n, 1);
      }
      let hb = !0;
      const HA = rb(null, "core", []);
      let $A = (() => {
          class t {
            constructor(n) {}
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)(z(Md));
            }),
            (t.ɵmod = $n({ type: t })),
            (t.ɵinj = _n({})),
            t
          );
        })(),
        ka = null;
      function Ar() {
        return ka;
      }
      const hn = new G("DocumentToken");
      function kb(t, e) {
        e = encodeURIComponent(e);
        for (const n of t.split(";")) {
          const i = n.indexOf("="),
            [s, r] = -1 == i ? [n, ""] : [n.slice(0, i), n.slice(i + 1)];
          if (s.trim() === e) return decodeURIComponent(r);
        }
        return null;
      }
      let cO = (() => {
        class t {}
        return (
          (t.ɵfac = function (n) {
            return new (n || t)();
          }),
          (t.ɵmod = $n({ type: t })),
          (t.ɵinj = _n({})),
          t
        );
      })();
      class $b {}
      class Gd extends class PO extends class WA {} {
        constructor() {
          super(...arguments), (this.supportsDOMEvents = !0);
        }
      } {
        static makeCurrent() {
          !(function UA(t) {
            ka || (ka = t);
          })(new Gd());
        }
        onAndCancel(e, n, i) {
          return (
            e.addEventListener(n, i, !1),
            () => {
              e.removeEventListener(n, i, !1);
            }
          );
        }
        dispatchEvent(e, n) {
          e.dispatchEvent(n);
        }
        remove(e) {
          e.parentNode && e.parentNode.removeChild(e);
        }
        createElement(e, n) {
          return (n = n || this.getDefaultDocument()).createElement(e);
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument("fakeTitle");
        }
        getDefaultDocument() {
          return document;
        }
        isElementNode(e) {
          return e.nodeType === Node.ELEMENT_NODE;
        }
        isShadowRoot(e) {
          return e instanceof DocumentFragment;
        }
        getGlobalEventTarget(e, n) {
          return "window" === n
            ? window
            : "document" === n
            ? e
            : "body" === n
            ? e.body
            : null;
        }
        getBaseHref(e) {
          const n = (function OO() {
            return (
              (Nr = Nr || document.querySelector("base")),
              Nr ? Nr.getAttribute("href") : null
            );
          })();
          return null == n
            ? null
            : (function kO(t) {
                (Ua = Ua || document.createElement("a")),
                  Ua.setAttribute("href", t);
                const e = Ua.pathname;
                return "/" === e.charAt(0) ? e : `/${e}`;
              })(n);
        }
        resetBaseElement() {
          Nr = null;
        }
        getUserAgent() {
          return window.navigator.userAgent;
        }
        getCookie(e) {
          return kb(document.cookie, e);
        }
      }
      let Ua,
        Nr = null;
      const Gb = new G("TRANSITION_ID"),
        FO = [
          {
            provide: K_,
            useFactory: function NO(t, e, n) {
              return () => {
                n.get(Sa).donePromise.then(() => {
                  const i = Ar(),
                    s = e.querySelectorAll(`style[ng-transition="${t}"]`);
                  for (let r = 0; r < s.length; r++) i.remove(s[r]);
                });
              };
            },
            deps: [Gb, hn, qn],
            multi: !0,
          },
        ];
      let LO = (() => {
        class t {
          build() {
            return new XMLHttpRequest();
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)();
          }),
          (t.ɵprov = J({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const Wa = new G("EventManagerPlugins");
      let Ga = (() => {
        class t {
          constructor(n, i) {
            (this._zone = i),
              (this._eventNameToPlugin = new Map()),
              n.forEach((s) => (s.manager = this)),
              (this._plugins = n.slice().reverse());
          }
          addEventListener(n, i, s) {
            return this._findPluginFor(i).addEventListener(n, i, s);
          }
          addGlobalEventListener(n, i, s) {
            return this._findPluginFor(i).addGlobalEventListener(n, i, s);
          }
          getZone() {
            return this._zone;
          }
          _findPluginFor(n) {
            const i = this._eventNameToPlugin.get(n);
            if (i) return i;
            const s = this._plugins;
            for (let r = 0; r < s.length; r++) {
              const o = s[r];
              if (o.supports(n)) return this._eventNameToPlugin.set(n, o), o;
            }
            throw new Error(`No event manager plugin found for event ${n}`);
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(z(Wa), z(Xe));
          }),
          (t.ɵprov = J({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      class qb {
        constructor(e) {
          this._doc = e;
        }
        addGlobalEventListener(e, n, i) {
          const s = Ar().getGlobalEventTarget(this._doc, e);
          if (!s)
            throw new Error(`Unsupported event target ${s} for event ${n}`);
          return this.addEventListener(s, n, i);
        }
      }
      let Yb = (() => {
          class t {
            constructor() {
              this._stylesSet = new Set();
            }
            addStyles(n) {
              const i = new Set();
              n.forEach((s) => {
                this._stylesSet.has(s) || (this._stylesSet.add(s), i.add(s));
              }),
                this.onStylesAdded(i);
            }
            onStylesAdded(n) {}
            getAllStyles() {
              return Array.from(this._stylesSet);
            }
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)();
            }),
            (t.ɵprov = J({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        Fr = (() => {
          class t extends Yb {
            constructor(n) {
              super(),
                (this._doc = n),
                (this._hostNodes = new Map()),
                this._hostNodes.set(n.head, []);
            }
            _addStylesToHost(n, i, s) {
              n.forEach((r) => {
                const o = this._doc.createElement("style");
                (o.textContent = r), s.push(i.appendChild(o));
              });
            }
            addHost(n) {
              const i = [];
              this._addStylesToHost(this._stylesSet, n, i),
                this._hostNodes.set(n, i);
            }
            removeHost(n) {
              const i = this._hostNodes.get(n);
              i && i.forEach(Kb), this._hostNodes.delete(n);
            }
            onStylesAdded(n) {
              this._hostNodes.forEach((i, s) => {
                this._addStylesToHost(n, s, i);
              });
            }
            ngOnDestroy() {
              this._hostNodes.forEach((n) => n.forEach(Kb));
            }
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)(z(hn));
            }),
            (t.ɵprov = J({ token: t, factory: t.ɵfac })),
            t
          );
        })();
      function Kb(t) {
        Ar().remove(t);
      }
      const qd = {
          svg: "http://www.w3.org/2000/svg",
          xhtml: "http://www.w3.org/1999/xhtml",
          xlink: "http://www.w3.org/1999/xlink",
          xml: "http://www.w3.org/XML/1998/namespace",
          xmlns: "http://www.w3.org/2000/xmlns/",
          math: "http://www.w3.org/1998/MathML/",
        },
        Yd = /%COMP%/g;
      function qa(t, e, n) {
        for (let i = 0; i < e.length; i++) {
          let s = e[i];
          Array.isArray(s) ? qa(t, s, n) : ((s = s.replace(Yd, t)), n.push(s));
        }
        return n;
      }
      function Qb(t) {
        return (e) => {
          if ("__ngUnwrap__" === e) return t;
          !1 === t(e) && (e.preventDefault(), (e.returnValue = !1));
        };
      }
      let Kd = (() => {
        class t {
          constructor(n, i, s) {
            (this.eventManager = n),
              (this.sharedStylesHost = i),
              (this.appId = s),
              (this.rendererByCompId = new Map()),
              (this.defaultRenderer = new Xd(n));
          }
          createRenderer(n, i) {
            if (!n || !i) return this.defaultRenderer;
            switch (i.encapsulation) {
              case rn.Emulated: {
                let s = this.rendererByCompId.get(i.id);
                return (
                  s ||
                    ((s = new zO(
                      this.eventManager,
                      this.sharedStylesHost,
                      i,
                      this.appId
                    )),
                    this.rendererByCompId.set(i.id, s)),
                  s.applyToHost(n),
                  s
                );
              }
              case 1:
              case rn.ShadowDom:
                return new UO(this.eventManager, this.sharedStylesHost, n, i);
              default:
                if (!this.rendererByCompId.has(i.id)) {
                  const s = qa(i.id, i.styles, []);
                  this.sharedStylesHost.addStyles(s),
                    this.rendererByCompId.set(i.id, this.defaultRenderer);
                }
                return this.defaultRenderer;
            }
          }
          begin() {}
          end() {}
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(z(Ga), z(Fr), z(Ir));
          }),
          (t.ɵprov = J({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      class Xd {
        constructor(e) {
          (this.eventManager = e),
            (this.data = Object.create(null)),
            (this.destroyNode = null);
        }
        destroy() {}
        createElement(e, n) {
          return n
            ? document.createElementNS(qd[n] || n, e)
            : document.createElement(e);
        }
        createComment(e) {
          return document.createComment(e);
        }
        createText(e) {
          return document.createTextNode(e);
        }
        appendChild(e, n) {
          (ev(e) ? e.content : e).appendChild(n);
        }
        insertBefore(e, n, i) {
          e && (ev(e) ? e.content : e).insertBefore(n, i);
        }
        removeChild(e, n) {
          e && e.removeChild(n);
        }
        selectRootElement(e, n) {
          let i = "string" == typeof e ? document.querySelector(e) : e;
          if (!i)
            throw new Error(`The selector "${e}" did not match any elements`);
          return n || (i.textContent = ""), i;
        }
        parentNode(e) {
          return e.parentNode;
        }
        nextSibling(e) {
          return e.nextSibling;
        }
        setAttribute(e, n, i, s) {
          if (s) {
            n = s + ":" + n;
            const r = qd[s];
            r ? e.setAttributeNS(r, n, i) : e.setAttribute(n, i);
          } else e.setAttribute(n, i);
        }
        removeAttribute(e, n, i) {
          if (i) {
            const s = qd[i];
            s ? e.removeAttributeNS(s, n) : e.removeAttribute(`${i}:${n}`);
          } else e.removeAttribute(n);
        }
        addClass(e, n) {
          e.classList.add(n);
        }
        removeClass(e, n) {
          e.classList.remove(n);
        }
        setStyle(e, n, i, s) {
          s & (ht.DashCase | ht.Important)
            ? e.style.setProperty(n, i, s & ht.Important ? "important" : "")
            : (e.style[n] = i);
        }
        removeStyle(e, n, i) {
          i & ht.DashCase ? e.style.removeProperty(n) : (e.style[n] = "");
        }
        setProperty(e, n, i) {
          e[n] = i;
        }
        setValue(e, n) {
          e.nodeValue = n;
        }
        listen(e, n, i) {
          return "string" == typeof e
            ? this.eventManager.addGlobalEventListener(e, n, Qb(i))
            : this.eventManager.addEventListener(e, n, Qb(i));
        }
      }
      function ev(t) {
        return "TEMPLATE" === t.tagName && void 0 !== t.content;
      }
      class zO extends Xd {
        constructor(e, n, i, s) {
          super(e), (this.component = i);
          const r = qa(s + "-" + i.id, i.styles, []);
          n.addStyles(r),
            (this.contentAttr = (function VO(t) {
              return "_ngcontent-%COMP%".replace(Yd, t);
            })(s + "-" + i.id)),
            (this.hostAttr = (function HO(t) {
              return "_nghost-%COMP%".replace(Yd, t);
            })(s + "-" + i.id));
        }
        applyToHost(e) {
          super.setAttribute(e, this.hostAttr, "");
        }
        createElement(e, n) {
          const i = super.createElement(e, n);
          return super.setAttribute(i, this.contentAttr, ""), i;
        }
      }
      class UO extends Xd {
        constructor(e, n, i, s) {
          super(e),
            (this.sharedStylesHost = n),
            (this.hostEl = i),
            (this.shadowRoot = i.attachShadow({ mode: "open" })),
            this.sharedStylesHost.addHost(this.shadowRoot);
          const r = qa(s.id, s.styles, []);
          for (let o = 0; o < r.length; o++) {
            const a = document.createElement("style");
            (a.textContent = r[o]), this.shadowRoot.appendChild(a);
          }
        }
        nodeOrShadowRoot(e) {
          return e === this.hostEl ? this.shadowRoot : e;
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot);
        }
        appendChild(e, n) {
          return super.appendChild(this.nodeOrShadowRoot(e), n);
        }
        insertBefore(e, n, i) {
          return super.insertBefore(this.nodeOrShadowRoot(e), n, i);
        }
        removeChild(e, n) {
          return super.removeChild(this.nodeOrShadowRoot(e), n);
        }
        parentNode(e) {
          return this.nodeOrShadowRoot(
            super.parentNode(this.nodeOrShadowRoot(e))
          );
        }
      }
      let WO = (() => {
        class t extends qb {
          constructor(n) {
            super(n);
          }
          supports(n) {
            return !0;
          }
          addEventListener(n, i, s) {
            return (
              n.addEventListener(i, s, !1),
              () => this.removeEventListener(n, i, s)
            );
          }
          removeEventListener(n, i, s) {
            return n.removeEventListener(i, s);
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(z(hn));
          }),
          (t.ɵprov = J({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const tv = ["alt", "control", "meta", "shift"],
        GO = {
          "\b": "Backspace",
          "\t": "Tab",
          "\x7f": "Delete",
          "\x1b": "Escape",
          Del: "Delete",
          Esc: "Escape",
          Left: "ArrowLeft",
          Right: "ArrowRight",
          Up: "ArrowUp",
          Down: "ArrowDown",
          Menu: "ContextMenu",
          Scroll: "ScrollLock",
          Win: "OS",
        },
        qO = {
          alt: (t) => t.altKey,
          control: (t) => t.ctrlKey,
          meta: (t) => t.metaKey,
          shift: (t) => t.shiftKey,
        };
      let YO = (() => {
        class t extends qb {
          constructor(n) {
            super(n);
          }
          supports(n) {
            return null != t.parseEventName(n);
          }
          addEventListener(n, i, s) {
            const r = t.parseEventName(i),
              o = t.eventCallback(r.fullKey, s, this.manager.getZone());
            return this.manager
              .getZone()
              .runOutsideAngular(() => Ar().onAndCancel(n, r.domEventName, o));
          }
          static parseEventName(n) {
            const i = n.toLowerCase().split("."),
              s = i.shift();
            if (0 === i.length || ("keydown" !== s && "keyup" !== s))
              return null;
            const r = t._normalizeKey(i.pop());
            let o = "",
              a = i.indexOf("code");
            if (
              (a > -1 && (i.splice(a, 1), (o = "code.")),
              tv.forEach((c) => {
                const u = i.indexOf(c);
                u > -1 && (i.splice(u, 1), (o += c + "."));
              }),
              (o += r),
              0 != i.length || 0 === r.length)
            )
              return null;
            const l = {};
            return (l.domEventName = s), (l.fullKey = o), l;
          }
          static matchEventFullKeyCode(n, i) {
            let s = GO[n.key] || n.key,
              r = "";
            return (
              i.indexOf("code.") > -1 && ((s = n.code), (r = "code.")),
              !(null == s || !s) &&
                ((s = s.toLowerCase()),
                " " === s ? (s = "space") : "." === s && (s = "dot"),
                tv.forEach((o) => {
                  o !== s && (0, qO[o])(n) && (r += o + ".");
                }),
                (r += s),
                r === i)
            );
          }
          static eventCallback(n, i, s) {
            return (r) => {
              t.matchEventFullKeyCode(r, n) && s.runGuarded(() => i(r));
            };
          }
          static _normalizeKey(n) {
            return "esc" === n ? "escape" : n;
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(z(hn));
          }),
          (t.ɵprov = J({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const iv = [
          { provide: yd, useValue: "browser" },
          {
            provide: Z_,
            useValue: function KO() {
              Gd.makeCurrent();
            },
            multi: !0,
          },
          {
            provide: hn,
            useFactory: function ZO() {
              return (
                (function CE(t) {
                  eu = t;
                })(document),
                document
              );
            },
            deps: [],
          },
        ],
        QO = rb(HA, "browser", iv),
        sv = new G(""),
        rv = [
          {
            provide: Ia,
            useClass: class RO {
              addToWindow(e) {
                (de.getAngularTestability = (i, s = !0) => {
                  const r = e.findTestabilityInTree(i, s);
                  if (null == r)
                    throw new Error("Could not find testability for element.");
                  return r;
                }),
                  (de.getAllAngularTestabilities = () =>
                    e.getAllTestabilities()),
                  (de.getAllAngularRootElements = () => e.getAllRootElements()),
                  de.frameworkStabilizers || (de.frameworkStabilizers = []),
                  de.frameworkStabilizers.push((i) => {
                    const s = de.getAllAngularTestabilities();
                    let r = s.length,
                      o = !1;
                    const a = function (l) {
                      (o = o || l), r--, 0 == r && i(o);
                    };
                    s.forEach(function (l) {
                      l.whenStable(a);
                    });
                  });
              }
              findTestabilityInTree(e, n, i) {
                return null == n
                  ? null
                  : e.getTestability(n) ??
                      (i
                        ? Ar().isShadowRoot(n)
                          ? this.findTestabilityInTree(e, n.host, !0)
                          : this.findTestabilityInTree(e, n.parentElement, !0)
                        : null);
              }
            },
            deps: [],
          },
          { provide: nb, useClass: Dd, deps: [Xe, wd, Ia] },
          { provide: Dd, useClass: Dd, deps: [Xe, wd, Ia] },
        ],
        ov = [
          { provide: lu, useValue: "root" },
          {
            provide: as,
            useFactory: function XO() {
              return new as();
            },
            deps: [],
          },
          { provide: Wa, useClass: WO, multi: !0, deps: [hn, Xe, yd] },
          { provide: Wa, useClass: YO, multi: !0, deps: [hn] },
          { provide: Kd, useClass: Kd, deps: [Ga, Fr, Ir] },
          { provide: kg, useExisting: Kd },
          { provide: Yb, useExisting: Fr },
          { provide: Fr, useClass: Fr, deps: [hn] },
          { provide: Ga, useClass: Ga, deps: [Wa, Xe] },
          { provide: $b, useClass: LO, deps: [] },
          [],
        ];
      let JO = (() => {
        class t {
          constructor(n) {}
          static withServerTransition(n) {
            return {
              ngModule: t,
              providers: [
                { provide: Ir, useValue: n.appId },
                { provide: Gb, useExisting: Ir },
                FO,
              ],
            };
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(z(sv, 12));
          }),
          (t.ɵmod = $n({ type: t })),
          (t.ɵinj = _n({ providers: [...ov, ...rv], imports: [cO, $A] })),
          t
        );
      })();
      typeof window < "u" && window;
      class ck extends Vt {
        constructor(e, n) {
          super();
        }
        schedule(e, n = 0) {
          return this;
        }
      }
      const Ya = {
          setInterval(t, e, ...n) {
            const { delegate: i } = Ya;
            return i?.setInterval
              ? i.setInterval(t, e, ...n)
              : setInterval(t, e, ...n);
          },
          clearInterval(t) {
            const { delegate: e } = Ya;
            return (e?.clearInterval || clearInterval)(t);
          },
          delegate: void 0,
        },
        cv = { now: () => (cv.delegate || Date).now(), delegate: void 0 };
      class Rr {
        constructor(e, n = Rr.now) {
          (this.schedulerActionCtor = e), (this.now = n);
        }
        schedule(e, n = 0, i) {
          return new this.schedulerActionCtor(this, e).schedule(i, n);
        }
      }
      Rr.now = cv.now;
      const uv = new (class dk extends Rr {
          constructor(e, n = Rr.now) {
            super(e, n), (this.actions = []), (this._active = !1);
          }
          flush(e) {
            const { actions: n } = this;
            if (this._active) return void n.push(e);
            let i;
            this._active = !0;
            do {
              if ((i = e.execute(e.state, e.delay))) break;
            } while ((e = n.shift()));
            if (((this._active = !1), i)) {
              for (; (e = n.shift()); ) e.unsubscribe();
              throw i;
            }
          }
        })(
          class uk extends ck {
            constructor(e, n) {
              super(e, n),
                (this.scheduler = e),
                (this.work = n),
                (this.pending = !1);
            }
            schedule(e, n = 0) {
              var i;
              if (this.closed) return this;
              this.state = e;
              const s = this.id,
                r = this.scheduler;
              return (
                null != s && (this.id = this.recycleAsyncId(r, s, n)),
                (this.pending = !0),
                (this.delay = n),
                (this.id =
                  null !== (i = this.id) && void 0 !== i
                    ? i
                    : this.requestAsyncId(r, this.id, n)),
                this
              );
            }
            requestAsyncId(e, n, i = 0) {
              return Ya.setInterval(e.flush.bind(e, this), i);
            }
            recycleAsyncId(e, n, i = 0) {
              if (null != i && this.delay === i && !1 === this.pending)
                return n;
              null != n && Ya.clearInterval(n);
            }
            execute(e, n) {
              if (this.closed) return new Error("executing a cancelled action");
              this.pending = !1;
              const i = this._execute(e, n);
              if (i) return i;
              !1 === this.pending &&
                null != this.id &&
                (this.id = this.recycleAsyncId(this.scheduler, this.id, null));
            }
            _execute(e, n) {
              let s,
                i = !1;
              try {
                this.work(e);
              } catch (r) {
                (i = !0),
                  (s = r || new Error("Scheduled action threw falsy error"));
              }
              if (i) return this.unsubscribe(), s;
            }
            unsubscribe() {
              if (!this.closed) {
                const { id: e, scheduler: n } = this,
                  { actions: i } = n;
                (this.work = this.state = this.scheduler = null),
                  (this.pending = !1),
                  Li(i, this),
                  null != e && (this.id = this.recycleAsyncId(n, e, null)),
                  (this.delay = null),
                  super.unsubscribe();
              }
            }
          }
        ),
        fk = uv;
      class dv {}
      class fv {}
      class On {
        constructor(e) {
          (this.normalizedNames = new Map()),
            (this.lazyUpdate = null),
            e
              ? (this.lazyInit =
                  "string" == typeof e
                    ? () => {
                        (this.headers = new Map()),
                          e.split("\n").forEach((n) => {
                            const i = n.indexOf(":");
                            if (i > 0) {
                              const s = n.slice(0, i),
                                r = s.toLowerCase(),
                                o = n.slice(i + 1).trim();
                              this.maybeSetNormalizedName(s, r),
                                this.headers.has(r)
                                  ? this.headers.get(r).push(o)
                                  : this.headers.set(r, [o]);
                            }
                          });
                      }
                    : () => {
                        (this.headers = new Map()),
                          Object.keys(e).forEach((n) => {
                            let i = e[n];
                            const s = n.toLowerCase();
                            "string" == typeof i && (i = [i]),
                              i.length > 0 &&
                                (this.headers.set(s, i),
                                this.maybeSetNormalizedName(n, s));
                          });
                      })
              : (this.headers = new Map());
        }
        has(e) {
          return this.init(), this.headers.has(e.toLowerCase());
        }
        get(e) {
          this.init();
          const n = this.headers.get(e.toLowerCase());
          return n && n.length > 0 ? n[0] : null;
        }
        keys() {
          return this.init(), Array.from(this.normalizedNames.values());
        }
        getAll(e) {
          return this.init(), this.headers.get(e.toLowerCase()) || null;
        }
        append(e, n) {
          return this.clone({ name: e, value: n, op: "a" });
        }
        set(e, n) {
          return this.clone({ name: e, value: n, op: "s" });
        }
        delete(e, n) {
          return this.clone({ name: e, value: n, op: "d" });
        }
        maybeSetNormalizedName(e, n) {
          this.normalizedNames.has(n) || this.normalizedNames.set(n, e);
        }
        init() {
          this.lazyInit &&
            (this.lazyInit instanceof On
              ? this.copyFrom(this.lazyInit)
              : this.lazyInit(),
            (this.lazyInit = null),
            this.lazyUpdate &&
              (this.lazyUpdate.forEach((e) => this.applyUpdate(e)),
              (this.lazyUpdate = null)));
        }
        copyFrom(e) {
          e.init(),
            Array.from(e.headers.keys()).forEach((n) => {
              this.headers.set(n, e.headers.get(n)),
                this.normalizedNames.set(n, e.normalizedNames.get(n));
            });
        }
        clone(e) {
          const n = new On();
          return (
            (n.lazyInit =
              this.lazyInit && this.lazyInit instanceof On
                ? this.lazyInit
                : this),
            (n.lazyUpdate = (this.lazyUpdate || []).concat([e])),
            n
          );
        }
        applyUpdate(e) {
          const n = e.name.toLowerCase();
          switch (e.op) {
            case "a":
            case "s":
              let i = e.value;
              if (("string" == typeof i && (i = [i]), 0 === i.length)) return;
              this.maybeSetNormalizedName(e.name, n);
              const s = ("a" === e.op ? this.headers.get(n) : void 0) || [];
              s.push(...i), this.headers.set(n, s);
              break;
            case "d":
              const r = e.value;
              if (r) {
                let o = this.headers.get(n);
                if (!o) return;
                (o = o.filter((a) => -1 === r.indexOf(a))),
                  0 === o.length
                    ? (this.headers.delete(n), this.normalizedNames.delete(n))
                    : this.headers.set(n, o);
              } else this.headers.delete(n), this.normalizedNames.delete(n);
          }
        }
        forEach(e) {
          this.init(),
            Array.from(this.normalizedNames.keys()).forEach((n) =>
              e(this.normalizedNames.get(n), this.headers.get(n))
            );
        }
      }
      class bk {
        encodeKey(e) {
          return hv(e);
        }
        encodeValue(e) {
          return hv(e);
        }
        decodeKey(e) {
          return decodeURIComponent(e);
        }
        decodeValue(e) {
          return decodeURIComponent(e);
        }
      }
      const Dk = /%(\d[a-f0-9])/gi,
        wk = {
          40: "@",
          "3A": ":",
          24: "$",
          "2C": ",",
          "3B": ";",
          "3D": "=",
          "3F": "?",
          "2F": "/",
        };
      function hv(t) {
        return encodeURIComponent(t).replace(Dk, (e, n) => wk[n] ?? e);
      }
      function Ka(t) {
        return `${t}`;
      }
      class Qn {
        constructor(e = {}) {
          if (
            ((this.updates = null),
            (this.cloneFrom = null),
            (this.encoder = e.encoder || new bk()),
            e.fromString)
          ) {
            if (e.fromObject)
              throw new Error("Cannot specify both fromString and fromObject.");
            this.map = (function vk(t, e) {
              const n = new Map();
              return (
                t.length > 0 &&
                  t
                    .replace(/^\?/, "")
                    .split("&")
                    .forEach((s) => {
                      const r = s.indexOf("="),
                        [o, a] =
                          -1 == r
                            ? [e.decodeKey(s), ""]
                            : [
                                e.decodeKey(s.slice(0, r)),
                                e.decodeValue(s.slice(r + 1)),
                              ],
                        l = n.get(o) || [];
                      l.push(a), n.set(o, l);
                    }),
                n
              );
            })(e.fromString, this.encoder);
          } else
            e.fromObject
              ? ((this.map = new Map()),
                Object.keys(e.fromObject).forEach((n) => {
                  const i = e.fromObject[n],
                    s = Array.isArray(i) ? i.map(Ka) : [Ka(i)];
                  this.map.set(n, s);
                }))
              : (this.map = null);
        }
        has(e) {
          return this.init(), this.map.has(e);
        }
        get(e) {
          this.init();
          const n = this.map.get(e);
          return n ? n[0] : null;
        }
        getAll(e) {
          return this.init(), this.map.get(e) || null;
        }
        keys() {
          return this.init(), Array.from(this.map.keys());
        }
        append(e, n) {
          return this.clone({ param: e, value: n, op: "a" });
        }
        appendAll(e) {
          const n = [];
          return (
            Object.keys(e).forEach((i) => {
              const s = e[i];
              Array.isArray(s)
                ? s.forEach((r) => {
                    n.push({ param: i, value: r, op: "a" });
                  })
                : n.push({ param: i, value: s, op: "a" });
            }),
            this.clone(n)
          );
        }
        set(e, n) {
          return this.clone({ param: e, value: n, op: "s" });
        }
        delete(e, n) {
          return this.clone({ param: e, value: n, op: "d" });
        }
        toString() {
          return (
            this.init(),
            this.keys()
              .map((e) => {
                const n = this.encoder.encodeKey(e);
                return this.map
                  .get(e)
                  .map((i) => n + "=" + this.encoder.encodeValue(i))
                  .join("&");
              })
              .filter((e) => "" !== e)
              .join("&")
          );
        }
        clone(e) {
          const n = new Qn({ encoder: this.encoder });
          return (
            (n.cloneFrom = this.cloneFrom || this),
            (n.updates = (this.updates || []).concat(e)),
            n
          );
        }
        init() {
          null === this.map && (this.map = new Map()),
            null !== this.cloneFrom &&
              (this.cloneFrom.init(),
              this.cloneFrom
                .keys()
                .forEach((e) => this.map.set(e, this.cloneFrom.map.get(e))),
              this.updates.forEach((e) => {
                switch (e.op) {
                  case "a":
                  case "s":
                    const n =
                      ("a" === e.op ? this.map.get(e.param) : void 0) || [];
                    n.push(Ka(e.value)), this.map.set(e.param, n);
                    break;
                  case "d":
                    if (void 0 === e.value) {
                      this.map.delete(e.param);
                      break;
                    }
                    {
                      let i = this.map.get(e.param) || [];
                      const s = i.indexOf(Ka(e.value));
                      -1 !== s && i.splice(s, 1),
                        i.length > 0
                          ? this.map.set(e.param, i)
                          : this.map.delete(e.param);
                    }
                }
              }),
              (this.cloneFrom = this.updates = null));
        }
      }
      class Ck {
        constructor() {
          this.map = new Map();
        }
        set(e, n) {
          return this.map.set(e, n), this;
        }
        get(e) {
          return (
            this.map.has(e) || this.map.set(e, e.defaultValue()),
            this.map.get(e)
          );
        }
        delete(e) {
          return this.map.delete(e), this;
        }
        has(e) {
          return this.map.has(e);
        }
        keys() {
          return this.map.keys();
        }
      }
      function pv(t) {
        return typeof ArrayBuffer < "u" && t instanceof ArrayBuffer;
      }
      function gv(t) {
        return typeof Blob < "u" && t instanceof Blob;
      }
      function mv(t) {
        return typeof FormData < "u" && t instanceof FormData;
      }
      class Lr {
        constructor(e, n, i, s) {
          let r;
          if (
            ((this.url = n),
            (this.body = null),
            (this.reportProgress = !1),
            (this.withCredentials = !1),
            (this.responseType = "json"),
            (this.method = e.toUpperCase()),
            (function xk(t) {
              switch (t) {
                case "DELETE":
                case "GET":
                case "HEAD":
                case "OPTIONS":
                case "JSONP":
                  return !1;
                default:
                  return !0;
              }
            })(this.method) || s
              ? ((this.body = void 0 !== i ? i : null), (r = s))
              : (r = i),
            r &&
              ((this.reportProgress = !!r.reportProgress),
              (this.withCredentials = !!r.withCredentials),
              r.responseType && (this.responseType = r.responseType),
              r.headers && (this.headers = r.headers),
              r.context && (this.context = r.context),
              r.params && (this.params = r.params)),
            this.headers || (this.headers = new On()),
            this.context || (this.context = new Ck()),
            this.params)
          ) {
            const o = this.params.toString();
            if (0 === o.length) this.urlWithParams = n;
            else {
              const a = n.indexOf("?");
              this.urlWithParams =
                n + (-1 === a ? "?" : a < n.length - 1 ? "&" : "") + o;
            }
          } else (this.params = new Qn()), (this.urlWithParams = n);
        }
        serializeBody() {
          return null === this.body
            ? null
            : pv(this.body) ||
              gv(this.body) ||
              mv(this.body) ||
              (function Ek(t) {
                return (
                  typeof URLSearchParams < "u" && t instanceof URLSearchParams
                );
              })(this.body) ||
              "string" == typeof this.body
            ? this.body
            : this.body instanceof Qn
            ? this.body.toString()
            : "object" == typeof this.body ||
              "boolean" == typeof this.body ||
              Array.isArray(this.body)
            ? JSON.stringify(this.body)
            : this.body.toString();
        }
        detectContentTypeHeader() {
          return null === this.body || mv(this.body)
            ? null
            : gv(this.body)
            ? this.body.type || null
            : pv(this.body)
            ? null
            : "string" == typeof this.body
            ? "text/plain"
            : this.body instanceof Qn
            ? "application/x-www-form-urlencoded;charset=UTF-8"
            : "object" == typeof this.body ||
              "number" == typeof this.body ||
              "boolean" == typeof this.body
            ? "application/json"
            : null;
        }
        clone(e = {}) {
          const n = e.method || this.method,
            i = e.url || this.url,
            s = e.responseType || this.responseType,
            r = void 0 !== e.body ? e.body : this.body,
            o =
              void 0 !== e.withCredentials
                ? e.withCredentials
                : this.withCredentials,
            a =
              void 0 !== e.reportProgress
                ? e.reportProgress
                : this.reportProgress;
          let l = e.headers || this.headers,
            c = e.params || this.params;
          const u = e.context ?? this.context;
          return (
            void 0 !== e.setHeaders &&
              (l = Object.keys(e.setHeaders).reduce(
                (d, f) => d.set(f, e.setHeaders[f]),
                l
              )),
            e.setParams &&
              (c = Object.keys(e.setParams).reduce(
                (d, f) => d.set(f, e.setParams[f]),
                c
              )),
            new Lr(n, i, r, {
              params: c,
              headers: l,
              context: u,
              reportProgress: a,
              responseType: s,
              withCredentials: o,
            })
          );
        }
      }
      var Fe = (() => (
        ((Fe = Fe || {})[(Fe.Sent = 0)] = "Sent"),
        (Fe[(Fe.UploadProgress = 1)] = "UploadProgress"),
        (Fe[(Fe.ResponseHeader = 2)] = "ResponseHeader"),
        (Fe[(Fe.DownloadProgress = 3)] = "DownloadProgress"),
        (Fe[(Fe.Response = 4)] = "Response"),
        (Fe[(Fe.User = 5)] = "User"),
        Fe
      ))();
      class Jd {
        constructor(e, n = 200, i = "OK") {
          (this.headers = e.headers || new On()),
            (this.status = void 0 !== e.status ? e.status : n),
            (this.statusText = e.statusText || i),
            (this.url = e.url || null),
            (this.ok = this.status >= 200 && this.status < 300);
        }
      }
      class ef extends Jd {
        constructor(e = {}) {
          super(e), (this.type = Fe.ResponseHeader);
        }
        clone(e = {}) {
          return new ef({
            headers: e.headers || this.headers,
            status: void 0 !== e.status ? e.status : this.status,
            statusText: e.statusText || this.statusText,
            url: e.url || this.url || void 0,
          });
        }
      }
      class Xa extends Jd {
        constructor(e = {}) {
          super(e),
            (this.type = Fe.Response),
            (this.body = void 0 !== e.body ? e.body : null);
        }
        clone(e = {}) {
          return new Xa({
            body: void 0 !== e.body ? e.body : this.body,
            headers: e.headers || this.headers,
            status: void 0 !== e.status ? e.status : this.status,
            statusText: e.statusText || this.statusText,
            url: e.url || this.url || void 0,
          });
        }
      }
      class yv extends Jd {
        constructor(e) {
          super(e, 0, "Unknown Error"),
            (this.name = "HttpErrorResponse"),
            (this.ok = !1),
            (this.message =
              this.status >= 200 && this.status < 300
                ? `Http failure during parsing for ${e.url || "(unknown url)"}`
                : `Http failure response for ${e.url || "(unknown url)"}: ${
                    e.status
                  } ${e.statusText}`),
            (this.error = e.error || null);
        }
      }
      function tf(t, e) {
        return {
          body: e,
          headers: t.headers,
          context: t.context,
          observe: t.observe,
          params: t.params,
          reportProgress: t.reportProgress,
          responseType: t.responseType,
          withCredentials: t.withCredentials,
        };
      }
      let _v = (() => {
        class t {
          constructor(n) {
            this.handler = n;
          }
          request(n, i, s = {}) {
            let r;
            if (n instanceof Lr) r = n;
            else {
              let l, c;
              (l = s.headers instanceof On ? s.headers : new On(s.headers)),
                s.params &&
                  (c =
                    s.params instanceof Qn
                      ? s.params
                      : new Qn({ fromObject: s.params })),
                (r = new Lr(n, i, void 0 !== s.body ? s.body : null, {
                  headers: l,
                  context: s.context,
                  params: c,
                  reportProgress: s.reportProgress,
                  responseType: s.responseType || "json",
                  withCredentials: s.withCredentials,
                }));
            }
            const o = (function mk(...t) {
              return Nh(t, Ah(t));
            })(r).pipe(
              (function yk(t, e) {
                return re(e) ? Do(t, e, 1) : Do(t, 1);
              })((l) => this.handler.handle(l))
            );
            if (n instanceof Lr || "events" === s.observe) return o;
            const a = o.pipe(
              (function _k(t, e) {
                return Bi((n, i) => {
                  let s = 0;
                  n.subscribe(zs(i, (r) => t.call(e, r, s++) && i.next(r)));
                });
              })((l) => l instanceof Xa)
            );
            switch (s.observe || "body") {
              case "body":
                switch (r.responseType) {
                  case "arraybuffer":
                    return a.pipe(
                      ji((l) => {
                        if (null !== l.body && !(l.body instanceof ArrayBuffer))
                          throw new Error("Response is not an ArrayBuffer.");
                        return l.body;
                      })
                    );
                  case "blob":
                    return a.pipe(
                      ji((l) => {
                        if (null !== l.body && !(l.body instanceof Blob))
                          throw new Error("Response is not a Blob.");
                        return l.body;
                      })
                    );
                  case "text":
                    return a.pipe(
                      ji((l) => {
                        if (null !== l.body && "string" != typeof l.body)
                          throw new Error("Response is not a string.");
                        return l.body;
                      })
                    );
                  default:
                    return a.pipe(ji((l) => l.body));
                }
              case "response":
                return a;
              default:
                throw new Error(
                  `Unreachable: unhandled observe type ${s.observe}}`
                );
            }
          }
          delete(n, i = {}) {
            return this.request("DELETE", n, i);
          }
          get(n, i = {}) {
            return this.request("GET", n, i);
          }
          head(n, i = {}) {
            return this.request("HEAD", n, i);
          }
          jsonp(n, i) {
            return this.request("JSONP", n, {
              params: new Qn().append(i, "JSONP_CALLBACK"),
              observe: "body",
              responseType: "json",
            });
          }
          options(n, i = {}) {
            return this.request("OPTIONS", n, i);
          }
          patch(n, i, s = {}) {
            return this.request("PATCH", n, tf(s, i));
          }
          post(n, i, s = {}) {
            return this.request("POST", n, tf(s, i));
          }
          put(n, i, s = {}) {
            return this.request("PUT", n, tf(s, i));
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(z(dv));
          }),
          (t.ɵprov = J({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      class bv {
        constructor(e, n) {
          (this.next = e), (this.interceptor = n);
        }
        handle(e) {
          return this.interceptor.intercept(e, this.next);
        }
      }
      const vv = new G("HTTP_INTERCEPTORS");
      let Mk = (() => {
        class t {
          intercept(n, i) {
            return i.handle(n);
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)();
          }),
          (t.ɵprov = J({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const Sk = /^\)\]\}',?\n/;
      let Dv = (() => {
        class t {
          constructor(n) {
            this.xhrFactory = n;
          }
          handle(n) {
            if ("JSONP" === n.method)
              throw new Error(
                "Attempted to construct Jsonp request without HttpClientJsonpModule installed."
              );
            return new We((i) => {
              const s = this.xhrFactory.build();
              if (
                (s.open(n.method, n.urlWithParams),
                n.withCredentials && (s.withCredentials = !0),
                n.headers.forEach((h, p) => s.setRequestHeader(h, p.join(","))),
                n.headers.has("Accept") ||
                  s.setRequestHeader(
                    "Accept",
                    "application/json, text/plain, */*"
                  ),
                !n.headers.has("Content-Type"))
              ) {
                const h = n.detectContentTypeHeader();
                null !== h && s.setRequestHeader("Content-Type", h);
              }
              if (n.responseType) {
                const h = n.responseType.toLowerCase();
                s.responseType = "json" !== h ? h : "text";
              }
              const r = n.serializeBody();
              let o = null;
              const a = () => {
                  if (null !== o) return o;
                  const h = s.statusText || "OK",
                    p = new On(s.getAllResponseHeaders()),
                    g =
                      (function Ik(t) {
                        return "responseURL" in t && t.responseURL
                          ? t.responseURL
                          : /^X-Request-URL:/m.test(t.getAllResponseHeaders())
                          ? t.getResponseHeader("X-Request-URL")
                          : null;
                      })(s) || n.url;
                  return (
                    (o = new ef({
                      headers: p,
                      status: s.status,
                      statusText: h,
                      url: g,
                    })),
                    o
                  );
                },
                l = () => {
                  let { headers: h, status: p, statusText: g, url: m } = a(),
                    y = null;
                  204 !== p &&
                    (y = typeof s.response > "u" ? s.responseText : s.response),
                    0 === p && (p = y ? 200 : 0);
                  let b = p >= 200 && p < 300;
                  if ("json" === n.responseType && "string" == typeof y) {
                    const _ = y;
                    y = y.replace(Sk, "");
                    try {
                      y = "" !== y ? JSON.parse(y) : null;
                    } catch (v) {
                      (y = _), b && ((b = !1), (y = { error: v, text: y }));
                    }
                  }
                  b
                    ? (i.next(
                        new Xa({
                          body: y,
                          headers: h,
                          status: p,
                          statusText: g,
                          url: m || void 0,
                        })
                      ),
                      i.complete())
                    : i.error(
                        new yv({
                          error: y,
                          headers: h,
                          status: p,
                          statusText: g,
                          url: m || void 0,
                        })
                      );
                },
                c = (h) => {
                  const { url: p } = a(),
                    g = new yv({
                      error: h,
                      status: s.status || 0,
                      statusText: s.statusText || "Unknown Error",
                      url: p || void 0,
                    });
                  i.error(g);
                };
              let u = !1;
              const d = (h) => {
                  u || (i.next(a()), (u = !0));
                  let p = { type: Fe.DownloadProgress, loaded: h.loaded };
                  h.lengthComputable && (p.total = h.total),
                    "text" === n.responseType &&
                      !!s.responseText &&
                      (p.partialText = s.responseText),
                    i.next(p);
                },
                f = (h) => {
                  let p = { type: Fe.UploadProgress, loaded: h.loaded };
                  h.lengthComputable && (p.total = h.total), i.next(p);
                };
              return (
                s.addEventListener("load", l),
                s.addEventListener("error", c),
                s.addEventListener("timeout", c),
                s.addEventListener("abort", c),
                n.reportProgress &&
                  (s.addEventListener("progress", d),
                  null !== r &&
                    s.upload &&
                    s.upload.addEventListener("progress", f)),
                s.send(r),
                i.next({ type: Fe.Sent }),
                () => {
                  s.removeEventListener("error", c),
                    s.removeEventListener("abort", c),
                    s.removeEventListener("load", l),
                    s.removeEventListener("timeout", c),
                    n.reportProgress &&
                      (s.removeEventListener("progress", d),
                      null !== r &&
                        s.upload &&
                        s.upload.removeEventListener("progress", f)),
                    s.readyState !== s.DONE && s.abort();
                }
              );
            });
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(z($b));
          }),
          (t.ɵprov = J({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const nf = new G("XSRF_COOKIE_NAME"),
        sf = new G("XSRF_HEADER_NAME");
      class wv {}
      let Tk = (() => {
          class t {
            constructor(n, i, s) {
              (this.doc = n),
                (this.platform = i),
                (this.cookieName = s),
                (this.lastCookieString = ""),
                (this.lastToken = null),
                (this.parseCount = 0);
            }
            getToken() {
              if ("server" === this.platform) return null;
              const n = this.doc.cookie || "";
              return (
                n !== this.lastCookieString &&
                  (this.parseCount++,
                  (this.lastToken = kb(n, this.cookieName)),
                  (this.lastCookieString = n)),
                this.lastToken
              );
            }
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)(z(hn), z(yd), z(nf));
            }),
            (t.ɵprov = J({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        rf = (() => {
          class t {
            constructor(n, i) {
              (this.tokenService = n), (this.headerName = i);
            }
            intercept(n, i) {
              const s = n.url.toLowerCase();
              if (
                "GET" === n.method ||
                "HEAD" === n.method ||
                s.startsWith("http://") ||
                s.startsWith("https://")
              )
                return i.handle(n);
              const r = this.tokenService.getToken();
              return (
                null !== r &&
                  !n.headers.has(this.headerName) &&
                  (n = n.clone({ headers: n.headers.set(this.headerName, r) })),
                i.handle(n)
              );
            }
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)(z(wv), z(sf));
            }),
            (t.ɵprov = J({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        Ak = (() => {
          class t {
            constructor(n, i) {
              (this.backend = n), (this.injector = i), (this.chain = null);
            }
            handle(n) {
              if (null === this.chain) {
                const i = this.injector.get(vv, []);
                this.chain = i.reduceRight(
                  (s, r) => new bv(s, r),
                  this.backend
                );
              }
              return this.chain.handle(n);
            }
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)(z(fv), z(qn));
            }),
            (t.ɵprov = J({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        Pk = (() => {
          class t {
            static disable() {
              return {
                ngModule: t,
                providers: [{ provide: rf, useClass: Mk }],
              };
            }
            static withOptions(n = {}) {
              return {
                ngModule: t,
                providers: [
                  n.cookieName ? { provide: nf, useValue: n.cookieName } : [],
                  n.headerName ? { provide: sf, useValue: n.headerName } : [],
                ],
              };
            }
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)();
            }),
            (t.ɵmod = $n({ type: t })),
            (t.ɵinj = _n({
              providers: [
                rf,
                { provide: vv, useExisting: rf, multi: !0 },
                { provide: wv, useClass: Tk },
                { provide: nf, useValue: "XSRF-TOKEN" },
                { provide: sf, useValue: "X-XSRF-TOKEN" },
              ],
            })),
            t
          );
        })(),
        Ok = (() => {
          class t {}
          return (
            (t.ɵfac = function (n) {
              return new (n || t)();
            }),
            (t.ɵmod = $n({ type: t })),
            (t.ɵinj = _n({
              providers: [
                _v,
                { provide: dv, useClass: Ak },
                Dv,
                { provide: fv, useExisting: Dv },
              ],
              imports: [
                Pk.withOptions({
                  cookieName: "XSRF-TOKEN",
                  headerName: "X-XSRF-TOKEN",
                }),
              ],
            })),
            t
          );
        })(),
        of = (() => {
          class t {
            constructor(n) {
              (this.http = n),
                (this.index = 0),
                (this.chartDataArr = []),
                (this.chartDataSubject = new vo());
            }
            getData() {
              return this.http
                .get("./assets/data/json/cmcdata.json")
                .pipe(
                  ji(
                    (n) => (
                      (this.data = n.map((i) => ({
                        date: new Date(i.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        }),
                        open: i.open,
                        high: i.high,
                        low: i.low,
                        close: i.close,
                        volume: i.volume,
                        marketcap: parseFloat(
                          i.marketcap.replace(/,/g, "").replace("$", "")
                        ),
                        epoch: i.epoch,
                      }))),
                      this.data[this.index]
                    )
                  )
                );
            }
            next() {
              this.index++, this.index >= this.data.length && (this.index = 0);
            }
            onPushElement(n) {
              this.chartDataArr.push(n);
            }
            updateChart(n) {
              this.chartDataArr.push(n),
                this.chartDataSubject.next(this.chartDataArr);
            }
            getChartData() {
              return this.chartDataSubject.asObservable();
            }
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)(z(_v));
            }),
            (t.ɵprov = J({ token: t, factory: t.ɵfac, providedIn: "root" })),
            t
          );
        })(),
        kk = (() => {
          class t {
            constructor(n) {
              (this.dataService = n),
                (this.isPlaying = !1),
                (this.speed = 50),
                (this.indexSpeed = 1),
                (this.data = [
                  {
                    close: "$0.00000",
                    date: "Sep 24, 2017",
                    epoch: 0,
                    high: "$0.00000",
                    marketcap: 0,
                    open: "$0.00000",
                    volume: "$0.00000",
                  },
                ]);
            }
            ngOnInit() {
              (this.subscription = this.dataService.getData().subscribe((n) => {
                (this.firstData = n[0]), (this.data = n);
              })),
                this.start();
            }
            start() {
              this.isPlaying = !0;
              const n = (function gk(t = 0, e = uv) {
                return (
                  t < 0 && (t = 0),
                  (function pk(t = 0, e, n = fk) {
                    let i = -1;
                    return (
                      null != e && (Th(e) ? (n = e) : (i = e)),
                      new We((s) => {
                        let r = (function hk(t) {
                          return t instanceof Date && !isNaN(t);
                        })(t)
                          ? +t - n.now()
                          : t;
                        r < 0 && (r = 0);
                        let o = 0;
                        return n.schedule(function () {
                          s.closed ||
                            (s.next(o++),
                            0 <= i ? this.schedule(void 0, i) : s.complete());
                        }, r);
                      })
                    );
                  })(t, t, e)
                );
              })(this.speed);
              this.subscription = n.subscribe((i) => {
                this.dataService.next(),
                  (this.data = this.dataService.data[this.dataService.index]),
                  this.dataService.updateChart(this.data);
              });
            }
            stop() {
              (this.isPlaying = !1),
                this.subscription.unsubscribe(),
                (this.data = this.firstData),
                (this.dataService.index = 0);
            }
            setSpeed(n) {
              (this.speed = n), this.isPlaying && (this.stop(), this.start());
            }
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)(U(of));
            }),
            (t.ɵcmp = ui({
              type: t,
              selectors: [["app-header"]],
              decls: 18,
              vars: 5,
              consts: [
                [1, "container"],
                [1, "table"],
                [1, "date"],
                [1, "network-age"],
                [1, "price"],
                [1, "market-cap"],
                [1, "epoch"],
                [1, "index"],
                [1, "close"],
                [1, "marketcap"],
              ],
              template: function (n, i) {
                1 & n &&
                  (Z(0, "div", 0)(1, "table", 1)(2, "td", 2),
                  Ce(3),
                  se(),
                  Z(4, "td", 3),
                  Ce(5, "Network Age"),
                  se(),
                  Z(6, "td", 4),
                  Ce(7, "Price"),
                  se(),
                  Z(8, "td", 5),
                  Ce(9, "Market Cap"),
                  se(),
                  Z(10, "td", 6),
                  Ce(11),
                  se(),
                  Z(12, "td", 7),
                  Ce(13),
                  se(),
                  Z(14, "td", 8),
                  Ce(15),
                  se(),
                  Z(16, "td", 9),
                  Ce(17),
                  se()()()),
                  2 & n &&
                    (ze(3),
                    Ft(i.data.date),
                    ze(8),
                    Ft("Epoch " + i.data.epoch),
                    ze(2),
                    Ft(i.dataService.index + " days"),
                    ze(2),
                    Ft(i.data.close),
                    ze(2),
                    ba(
                      " $",
                      i.data.marketcap >= 1e9
                        ? (i.data.marketcap / 1e9).toFixed(2) + "B"
                        : (i.data.marketcap / 1e6).toFixed(2) + "M",
                      " "
                    ));
              },
              styles: [
                ".container[_ngcontent-%COMP%]{background-color:#111;color:#ccc;display:flex;flex-direction:column;align-items:stretch;height:100%;width:100%}.table[_ngcontent-%COMP%]{border-collapse:collapse;display:grid;grid-template-columns:repeat(4,1fr);grid-template-rows:repeat(2,1fr)}.header-row[_ngcontent-%COMP%]{grid-row:1}.data-row[_ngcontent-%COMP%]{grid-row:2}.header-row[_ngcontent-%COMP%], .data-row[_ngcontent-%COMP%], .date[_ngcontent-%COMP%], .network-age[_ngcontent-%COMP%], .price[_ngcontent-%COMP%], .market-cap[_ngcontent-%COMP%]{width:100%}td[_ngcontent-%COMP%], th[_ngcontent-%COMP%]{text-align:left;padding:8px}th[_ngcontent-%COMP%]{background-color:#ddd}.date[_ngcontent-%COMP%]{grid-column:1/2;grid-row:1/2}.network-age[_ngcontent-%COMP%]{grid-column:2/3;grid-row:1/2}.price[_ngcontent-%COMP%]{grid-column:3/4;grid-row:1/2}.market-cap[_ngcontent-%COMP%]{grid-column:4/5;grid-row:1/2}.epoch[_ngcontent-%COMP%]{grid-column:1/2;grid-row:2/3}.index[_ngcontent-%COMP%]{grid-column:2/3;grid-row:2/3}.close[_ngcontent-%COMP%]{grid-column:3/4;grid-row:2/3}.marketcap[_ngcontent-%COMP%]{grid-column:4/5;grid-row:2/3}.network-age[_ngcontent-%COMP%], .price[_ngcontent-%COMP%], .market-cap[_ngcontent-%COMP%]{display:flex;align-items:flex-end;font-size:18px}.marketcap[_ngcontent-%COMP%], .close[_ngcontent-%COMP%], .index[_ngcontent-%COMP%]{font-size:24px;font-weight:700}.epoch[_ngcontent-%COMP%], .date[_ngcontent-%COMP%]{display:flex;align-items:center;font-weight:600;margin-left:8px;font-size:18px}",
              ],
            })),
            t
          );
        })();
      function Ss(t) {
        return (t + 0.5) | 0;
      }
      const kn = (t, e, n) => Math.max(Math.min(t, n), e);
      function Br(t) {
        return kn(Ss(2.55 * t), 0, 255);
      }
      function Jn(t) {
        return kn(Ss(255 * t), 0, 255);
      }
      function Nn(t) {
        return kn(Ss(t / 2.55) / 100, 0, 1);
      }
      function Cv(t) {
        return kn(Ss(100 * t), 0, 100);
      }
      const Bt = {
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
        },
        af = [..."0123456789ABCDEF"],
        Nk = (t) => af[15 & t],
        Fk = (t) => af[(240 & t) >> 4] + af[15 & t],
        Za = (t) => (240 & t) >> 4 == (15 & t);
      const Vk =
        /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
      function xv(t, e, n) {
        const i = e * Math.min(n, 1 - n),
          s = (r, o = (r + t / 30) % 12) =>
            n - i * Math.max(Math.min(o - 3, 9 - o, 1), -1);
        return [s(0), s(8), s(4)];
      }
      function Hk(t, e, n) {
        const i = (s, r = (s + t / 60) % 6) =>
          n - n * e * Math.max(Math.min(r, 4 - r, 1), 0);
        return [i(5), i(3), i(1)];
      }
      function $k(t, e, n) {
        const i = xv(t, 1, 0.5);
        let s;
        for (
          e + n > 1 && ((s = 1 / (e + n)), (e *= s), (n *= s)), s = 0;
          s < 3;
          s++
        )
          (i[s] *= 1 - e - n), (i[s] += e);
        return i;
      }
      function lf(t) {
        const n = t.r / 255,
          i = t.g / 255,
          s = t.b / 255,
          r = Math.max(n, i, s),
          o = Math.min(n, i, s),
          a = (r + o) / 2;
        let l, c, u;
        return (
          r !== o &&
            ((u = r - o),
            (c = a > 0.5 ? u / (2 - r - o) : u / (r + o)),
            (l = (function zk(t, e, n, i, s) {
              return t === s
                ? (e - n) / i + (e < n ? 6 : 0)
                : e === s
                ? (n - t) / i + 2
                : (t - e) / i + 4;
            })(n, i, s, u, r)),
            (l = 60 * l + 0.5)),
          [0 | l, c || 0, a]
        );
      }
      function cf(t, e, n, i) {
        return (Array.isArray(e) ? t(e[0], e[1], e[2]) : t(e, n, i)).map(Jn);
      }
      function uf(t, e, n) {
        return cf(xv, t, e, n);
      }
      function Ev(t) {
        return ((t % 360) + 360) % 360;
      }
      const Mv = {
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
        },
        Sv = {
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
      let Qa;
      const Zk =
          /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/,
        df = (t) =>
          t <= 0.0031308 ? 12.92 * t : 1.055 * Math.pow(t, 1 / 2.4) - 0.055,
        Is = (t) =>
          t <= 0.04045 ? t / 12.92 : Math.pow((t + 0.055) / 1.055, 2.4);
      function Ja(t, e, n) {
        if (t) {
          let i = lf(t);
          (i[e] = Math.max(0, Math.min(i[e] + i[e] * n, 0 === e ? 360 : 1))),
            (i = uf(i)),
            (t.r = i[0]),
            (t.g = i[1]),
            (t.b = i[2]);
        }
      }
      function Iv(t, e) {
        return t && Object.assign(e || {}, t);
      }
      function Tv(t) {
        var e = { r: 0, g: 0, b: 0, a: 255 };
        return (
          Array.isArray(t)
            ? t.length >= 3 &&
              ((e = { r: t[0], g: t[1], b: t[2], a: 255 }),
              t.length > 3 && (e.a = Jn(t[3])))
            : ((e = Iv(t, { r: 0, g: 0, b: 0, a: 1 })).a = Jn(e.a)),
          e
        );
      }
      function tN(t) {
        return "r" === t.charAt(0)
          ? (function Qk(t) {
              const e = Zk.exec(t);
              let i,
                s,
                r,
                n = 255;
              if (e) {
                if (e[7] !== i) {
                  const o = +e[7];
                  n = e[8] ? Br(o) : kn(255 * o, 0, 255);
                }
                return (
                  (i = +e[1]),
                  (s = +e[3]),
                  (r = +e[5]),
                  (i = 255 & (e[2] ? Br(i) : kn(i, 0, 255))),
                  (s = 255 & (e[4] ? Br(s) : kn(s, 0, 255))),
                  (r = 255 & (e[6] ? Br(r) : kn(r, 0, 255))),
                  { r: i, g: s, b: r, a: n }
                );
              }
            })(t)
          : (function Gk(t) {
              const e = Vk.exec(t);
              let i,
                n = 255;
              if (!e) return;
              e[5] !== i && (n = e[6] ? Br(+e[5]) : Jn(+e[5]));
              const s = Ev(+e[2]),
                r = +e[3] / 100,
                o = +e[4] / 100;
              return (
                (i =
                  "hwb" === e[1]
                    ? (function Uk(t, e, n) {
                        return cf($k, t, e, n);
                      })(s, r, o)
                    : "hsv" === e[1]
                    ? (function Wk(t, e, n) {
                        return cf(Hk, t, e, n);
                      })(s, r, o)
                    : uf(s, r, o)),
                { r: i[0], g: i[1], b: i[2], a: n }
              );
            })(t);
      }
      class Ts {
        constructor(e) {
          if (e instanceof Ts) return e;
          const n = typeof e;
          let i;
          "object" === n
            ? (i = Tv(e))
            : "string" === n &&
              (i =
                (function Lk(t) {
                  var n,
                    e = t.length;
                  return (
                    "#" === t[0] &&
                      (4 === e || 5 === e
                        ? (n = {
                            r: 255 & (17 * Bt[t[1]]),
                            g: 255 & (17 * Bt[t[2]]),
                            b: 255 & (17 * Bt[t[3]]),
                            a: 5 === e ? 17 * Bt[t[4]] : 255,
                          })
                        : (7 === e || 9 === e) &&
                          (n = {
                            r: (Bt[t[1]] << 4) | Bt[t[2]],
                            g: (Bt[t[3]] << 4) | Bt[t[4]],
                            b: (Bt[t[5]] << 4) | Bt[t[6]],
                            a: 9 === e ? (Bt[t[7]] << 4) | Bt[t[8]] : 255,
                          })),
                    n
                  );
                })(e) ||
                (function Xk(t) {
                  Qa ||
                    ((Qa = (function Kk() {
                      const t = {},
                        e = Object.keys(Sv),
                        n = Object.keys(Mv);
                      let i, s, r, o, a;
                      for (i = 0; i < e.length; i++) {
                        for (o = a = e[i], s = 0; s < n.length; s++)
                          (r = n[s]), (a = a.replace(r, Mv[r]));
                        (r = parseInt(Sv[o], 16)),
                          (t[a] = [(r >> 16) & 255, (r >> 8) & 255, 255 & r]);
                      }
                      return t;
                    })()),
                    (Qa.transparent = [0, 0, 0, 0]));
                  const e = Qa[t.toLowerCase()];
                  return (
                    e && {
                      r: e[0],
                      g: e[1],
                      b: e[2],
                      a: 4 === e.length ? e[3] : 255,
                    }
                  );
                })(e) ||
                tN(e)),
            (this._rgb = i),
            (this._valid = !!i);
        }
        get valid() {
          return this._valid;
        }
        get rgb() {
          var e = Iv(this._rgb);
          return e && (e.a = Nn(e.a)), e;
        }
        set rgb(e) {
          this._rgb = Tv(e);
        }
        rgbString() {
          return this._valid
            ? (function Jk(t) {
                return (
                  t &&
                  (t.a < 255
                    ? `rgba(${t.r}, ${t.g}, ${t.b}, ${Nn(t.a)})`
                    : `rgb(${t.r}, ${t.g}, ${t.b})`)
                );
              })(this._rgb)
            : void 0;
        }
        hexString() {
          return this._valid
            ? (function jk(t) {
                var e = ((t) => Za(t.r) && Za(t.g) && Za(t.b) && Za(t.a))(t)
                  ? Nk
                  : Fk;
                return t
                  ? "#" +
                      e(t.r) +
                      e(t.g) +
                      e(t.b) +
                      ((t, e) => (t < 255 ? e(t) : ""))(t.a, e)
                  : void 0;
              })(this._rgb)
            : void 0;
        }
        hslString() {
          return this._valid
            ? (function Yk(t) {
                if (!t) return;
                const e = lf(t),
                  n = e[0],
                  i = Cv(e[1]),
                  s = Cv(e[2]);
                return t.a < 255
                  ? `hsla(${n}, ${i}%, ${s}%, ${Nn(t.a)})`
                  : `hsl(${n}, ${i}%, ${s}%)`;
              })(this._rgb)
            : void 0;
        }
        mix(e, n) {
          if (e) {
            const i = this.rgb,
              s = e.rgb;
            let r;
            const o = n === r ? 0.5 : n,
              a = 2 * o - 1,
              l = i.a - s.a,
              c = ((a * l == -1 ? a : (a + l) / (1 + a * l)) + 1) / 2;
            (r = 1 - c),
              (i.r = 255 & (c * i.r + r * s.r + 0.5)),
              (i.g = 255 & (c * i.g + r * s.g + 0.5)),
              (i.b = 255 & (c * i.b + r * s.b + 0.5)),
              (i.a = o * i.a + (1 - o) * s.a),
              (this.rgb = i);
          }
          return this;
        }
        interpolate(e, n) {
          return (
            e &&
              (this._rgb = (function eN(t, e, n) {
                const i = Is(Nn(t.r)),
                  s = Is(Nn(t.g)),
                  r = Is(Nn(t.b));
                return {
                  r: Jn(df(i + n * (Is(Nn(e.r)) - i))),
                  g: Jn(df(s + n * (Is(Nn(e.g)) - s))),
                  b: Jn(df(r + n * (Is(Nn(e.b)) - r))),
                  a: t.a + n * (e.a - t.a),
                };
              })(this._rgb, e._rgb, n)),
            this
          );
        }
        clone() {
          return new Ts(this.rgb);
        }
        alpha(e) {
          return (this._rgb.a = Jn(e)), this;
        }
        clearer(e) {
          return (this._rgb.a *= 1 - e), this;
        }
        greyscale() {
          const e = this._rgb,
            n = Ss(0.3 * e.r + 0.59 * e.g + 0.11 * e.b);
          return (e.r = e.g = e.b = n), this;
        }
        opaquer(e) {
          return (this._rgb.a *= 1 + e), this;
        }
        negate() {
          const e = this._rgb;
          return (e.r = 255 - e.r), (e.g = 255 - e.g), (e.b = 255 - e.b), this;
        }
        lighten(e) {
          return Ja(this._rgb, 2, e), this;
        }
        darken(e) {
          return Ja(this._rgb, 2, -e), this;
        }
        saturate(e) {
          return Ja(this._rgb, 1, e), this;
        }
        desaturate(e) {
          return Ja(this._rgb, 1, -e), this;
        }
        rotate(e) {
          return (
            (function qk(t, e) {
              var n = lf(t);
              (n[0] = Ev(n[0] + e)),
                (n = uf(n)),
                (t.r = n[0]),
                (t.g = n[1]),
                (t.b = n[2]);
            })(this._rgb, e),
            this
          );
        }
      }
      function Fn() {}
      const nN = (() => {
        let t = 0;
        return () => t++;
      })();
      function Q(t) {
        return null === t || typeof t > "u";
      }
      function ge(t) {
        if (Array.isArray && Array.isArray(t)) return !0;
        const e = Object.prototype.toString.call(t);
        return "[object" === e.slice(0, 7) && "Array]" === e.slice(-6);
      }
      function Y(t) {
        return (
          null !== t && "[object Object]" === Object.prototype.toString.call(t)
        );
      }
      function Ee(t) {
        return ("number" == typeof t || t instanceof Number) && isFinite(+t);
      }
      function St(t, e) {
        return Ee(t) ? t : e;
      }
      function H(t, e) {
        return typeof t > "u" ? e : t;
      }
      const Av = (t, e) =>
        "string" == typeof t && t.endsWith("%")
          ? (parseFloat(t) / 100) * e
          : +t;
      function pe(t, e, n) {
        if (t && "function" == typeof t.call) return t.apply(n, e);
      }
      function ae(t, e, n, i) {
        let s, r, o;
        if (ge(t))
          if (((r = t.length), i))
            for (s = r - 1; s >= 0; s--) e.call(n, t[s], s);
          else for (s = 0; s < r; s++) e.call(n, t[s], s);
        else if (Y(t))
          for (o = Object.keys(t), r = o.length, s = 0; s < r; s++)
            e.call(n, t[o[s]], o[s]);
      }
      function el(t, e) {
        let n, i, s, r;
        if (!t || !e || t.length !== e.length) return !1;
        for (n = 0, i = t.length; n < i; ++n)
          if (
            ((s = t[n]),
            (r = e[n]),
            s.datasetIndex !== r.datasetIndex || s.index !== r.index)
          )
            return !1;
        return !0;
      }
      function tl(t) {
        if (ge(t)) return t.map(tl);
        if (Y(t)) {
          const e = Object.create(null),
            n = Object.keys(t),
            i = n.length;
          let s = 0;
          for (; s < i; ++s) e[n[s]] = tl(t[n[s]]);
          return e;
        }
        return t;
      }
      function Pv(t) {
        return -1 === ["__proto__", "prototype", "constructor"].indexOf(t);
      }
      function sN(t, e, n, i) {
        if (!Pv(t)) return;
        const s = e[t],
          r = n[t];
        Y(s) && Y(r) ? jr(s, r, i) : (e[t] = tl(r));
      }
      function jr(t, e, n) {
        const i = ge(e) ? e : [e],
          s = i.length;
        if (!Y(t)) return t;
        const r = (n = n || {}).merger || sN;
        let o;
        for (let a = 0; a < s; ++a) {
          if (((o = i[a]), !Y(o))) continue;
          const l = Object.keys(o);
          for (let c = 0, u = l.length; c < u; ++c) r(l[c], t, o, n);
        }
        return t;
      }
      function Vr(t, e) {
        return jr(t, e, { merger: rN });
      }
      function rN(t, e, n) {
        if (!Pv(t)) return;
        const i = e[t],
          s = n[t];
        Y(i) && Y(s)
          ? Vr(i, s)
          : Object.prototype.hasOwnProperty.call(e, t) || (e[t] = tl(s));
      }
      const Ov = { "": (t) => t, x: (t) => t.x, y: (t) => t.y };
      function ei(t, e) {
        return (
          Ov[e] ||
          (Ov[e] = (function aN(t) {
            const e = (function oN(t) {
              const e = t.split("."),
                n = [];
              let i = "";
              for (const s of e)
                (i += s),
                  i.endsWith("\\")
                    ? (i = i.slice(0, -1) + ".")
                    : (n.push(i), (i = ""));
              return n;
            })(t);
            return (n) => {
              for (const i of e) {
                if ("" === i) break;
                n = n && n[i];
              }
              return n;
            };
          })(e))
        )(t);
      }
      function ff(t) {
        return t.charAt(0).toUpperCase() + t.slice(1);
      }
      const jt = (t) => typeof t < "u",
        ti = (t) => "function" == typeof t,
        kv = (t, e) => {
          if (t.size !== e.size) return !1;
          for (const n of t) if (!e.has(n)) return !1;
          return !0;
        },
        be = Math.PI,
        me = 2 * be,
        cN = me + be,
        nl = Number.POSITIVE_INFINITY,
        uN = be / 180,
        Me = be / 2,
        xi = be / 4,
        Nv = (2 * be) / 3,
        ni = Math.log10,
        pn = Math.sign;
      function Hr(t, e, n) {
        return Math.abs(t - e) < n;
      }
      function Fv(t) {
        const e = Math.round(t);
        t = Hr(t, e, t / 1e3) ? e : t;
        const n = Math.pow(10, Math.floor(ni(t))),
          i = t / n;
        return (i <= 1 ? 1 : i <= 2 ? 2 : i <= 5 ? 5 : 10) * n;
      }
      function As(t) {
        return !isNaN(parseFloat(t)) && isFinite(t);
      }
      function Rv(t, e, n) {
        let i, s, r;
        for (i = 0, s = t.length; i < s; i++)
          (r = t[i][n]),
            isNaN(r) ||
              ((e.min = Math.min(e.min, r)), (e.max = Math.max(e.max, r)));
      }
      function Qt(t) {
        return t * (be / 180);
      }
      function hf(t) {
        return t * (180 / be);
      }
      function Lv(t) {
        if (!Ee(t)) return;
        let e = 1,
          n = 0;
        for (; Math.round(t * e) / e !== t; ) (e *= 10), n++;
        return n;
      }
      function Bv(t, e) {
        const n = e.x - t.x,
          i = e.y - t.y,
          s = Math.sqrt(n * n + i * i);
        let r = Math.atan2(i, n);
        return r < -0.5 * be && (r += me), { angle: r, distance: s };
      }
      function pf(t, e) {
        return Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2));
      }
      function hN(t, e) {
        return ((t - e + cN) % me) - be;
      }
      function It(t) {
        return ((t % me) + me) % me;
      }
      function $r(t, e, n, i) {
        const s = It(t),
          r = It(e),
          o = It(n),
          a = It(r - s),
          l = It(o - s),
          c = It(s - r),
          u = It(s - o);
        return s === r || s === o || (i && r === o) || (a > l && c < u);
      }
      function $e(t, e, n) {
        return Math.max(e, Math.min(n, t));
      }
      function Rn(t, e, n, i = 1e-6) {
        return t >= Math.min(e, n) - i && t <= Math.max(e, n) + i;
      }
      function gf(t, e, n) {
        n = n || ((o) => t[o] < e);
        let r,
          i = t.length - 1,
          s = 0;
        for (; i - s > 1; ) (r = (s + i) >> 1), n(r) ? (s = r) : (i = r);
        return { lo: s, hi: i };
      }
      const Ln = (t, e, n, i) =>
          gf(
            t,
            n,
            i
              ? (s) => {
                  const r = t[s][e];
                  return r < n || (r === n && t[s + 1][e] === n);
                }
              : (s) => t[s][e] < n
          ),
        gN = (t, e, n) => gf(t, n, (i) => t[i][e] >= n),
        jv = ["push", "pop", "shift", "splice", "unshift"];
      function Vv(t, e) {
        const n = t._chartjs;
        if (!n) return;
        const i = n.listeners,
          s = i.indexOf(e);
        -1 !== s && i.splice(s, 1),
          !(i.length > 0) &&
            (jv.forEach((r) => {
              delete t[r];
            }),
            delete t._chartjs);
      }
      function Hv(t) {
        const e = new Set();
        let n, i;
        for (n = 0, i = t.length; n < i; ++n) e.add(t[n]);
        return e.size === i ? t : Array.from(e);
      }
      const $v =
        typeof window > "u"
          ? function (t) {
              return t();
            }
          : window.requestAnimationFrame;
      function zv(t, e) {
        let n = [],
          i = !1;
        return function (...s) {
          (n = s),
            i ||
              ((i = !0),
              $v.call(window, () => {
                (i = !1), t.apply(e, n);
              }));
        };
      }
      const mf = (t) =>
          "start" === t ? "left" : "end" === t ? "right" : "center",
        Qe = (t, e, n) => ("start" === t ? e : "end" === t ? n : (e + n) / 2);
      function Uv(t, e, n) {
        const i = e.length;
        let s = 0,
          r = i;
        if (t._sorted) {
          const { iScale: o, _parsed: a } = t,
            l = o.axis,
            {
              min: c,
              max: u,
              minDefined: d,
              maxDefined: f,
            } = o.getUserBounds();
          d &&
            (s = $e(
              Math.min(
                Ln(a, o.axis, c).lo,
                n ? i : Ln(e, l, o.getPixelForValue(c)).lo
              ),
              0,
              i - 1
            )),
            (r = f
              ? $e(
                  Math.max(
                    Ln(a, o.axis, u, !0).hi + 1,
                    n ? 0 : Ln(e, l, o.getPixelForValue(u), !0).hi + 1
                  ),
                  s,
                  i
                ) - s
              : i - s);
        }
        return { start: s, count: r };
      }
      function Wv(t) {
        const { xScale: e, yScale: n, _scaleRanges: i } = t,
          s = { xmin: e.min, xmax: e.max, ymin: n.min, ymax: n.max };
        if (!i) return (t._scaleRanges = s), !0;
        const r =
          i.xmin !== e.min ||
          i.xmax !== e.max ||
          i.ymin !== n.min ||
          i.ymax !== n.max;
        return Object.assign(i, s), r;
      }
      const il = (t) => 0 === t || 1 === t,
        Gv = (t, e, n) =>
          -Math.pow(2, 10 * (t -= 1)) * Math.sin(((t - e) * me) / n),
        qv = (t, e, n) =>
          Math.pow(2, -10 * t) * Math.sin(((t - e) * me) / n) + 1,
        zr = {
          linear: (t) => t,
          easeInQuad: (t) => t * t,
          easeOutQuad: (t) => -t * (t - 2),
          easeInOutQuad: (t) =>
            (t /= 0.5) < 1 ? 0.5 * t * t : -0.5 * (--t * (t - 2) - 1),
          easeInCubic: (t) => t * t * t,
          easeOutCubic: (t) => (t -= 1) * t * t + 1,
          easeInOutCubic: (t) =>
            (t /= 0.5) < 1 ? 0.5 * t * t * t : 0.5 * ((t -= 2) * t * t + 2),
          easeInQuart: (t) => t * t * t * t,
          easeOutQuart: (t) => -((t -= 1) * t * t * t - 1),
          easeInOutQuart: (t) =>
            (t /= 0.5) < 1
              ? 0.5 * t * t * t * t
              : -0.5 * ((t -= 2) * t * t * t - 2),
          easeInQuint: (t) => t * t * t * t * t,
          easeOutQuint: (t) => (t -= 1) * t * t * t * t + 1,
          easeInOutQuint: (t) =>
            (t /= 0.5) < 1
              ? 0.5 * t * t * t * t * t
              : 0.5 * ((t -= 2) * t * t * t * t + 2),
          easeInSine: (t) => 1 - Math.cos(t * Me),
          easeOutSine: (t) => Math.sin(t * Me),
          easeInOutSine: (t) => -0.5 * (Math.cos(be * t) - 1),
          easeInExpo: (t) => (0 === t ? 0 : Math.pow(2, 10 * (t - 1))),
          easeOutExpo: (t) => (1 === t ? 1 : 1 - Math.pow(2, -10 * t)),
          easeInOutExpo: (t) =>
            il(t)
              ? t
              : t < 0.5
              ? 0.5 * Math.pow(2, 10 * (2 * t - 1))
              : 0.5 * (2 - Math.pow(2, -10 * (2 * t - 1))),
          easeInCirc: (t) => (t >= 1 ? t : -(Math.sqrt(1 - t * t) - 1)),
          easeOutCirc: (t) => Math.sqrt(1 - (t -= 1) * t),
          easeInOutCirc: (t) =>
            (t /= 0.5) < 1
              ? -0.5 * (Math.sqrt(1 - t * t) - 1)
              : 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1),
          easeInElastic: (t) => (il(t) ? t : Gv(t, 0.075, 0.3)),
          easeOutElastic: (t) => (il(t) ? t : qv(t, 0.075, 0.3)),
          easeInOutElastic: (t) =>
            il(t)
              ? t
              : t < 0.5
              ? 0.5 * Gv(2 * t, 0.1125, 0.45)
              : 0.5 + 0.5 * qv(2 * t - 1, 0.1125, 0.45),
          easeInBack: (t) => t * t * (2.70158 * t - 1.70158),
          easeOutBack: (t) => (t -= 1) * t * (2.70158 * t + 1.70158) + 1,
          easeInOutBack(t) {
            let e = 1.70158;
            return (t /= 0.5) < 1
              ? t * t * ((1 + (e *= 1.525)) * t - e) * 0.5
              : 0.5 * ((t -= 2) * t * ((1 + (e *= 1.525)) * t + e) + 2);
          },
          easeInBounce: (t) => 1 - zr.easeOutBounce(1 - t),
          easeOutBounce: (t) =>
            t < 1 / 2.75
              ? 7.5625 * t * t
              : t < 2 / 2.75
              ? 7.5625 * (t -= 1.5 / 2.75) * t + 0.75
              : t < 2.5 / 2.75
              ? 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375
              : 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375,
          easeInOutBounce: (t) =>
            t < 0.5
              ? 0.5 * zr.easeInBounce(2 * t)
              : 0.5 * zr.easeOutBounce(2 * t - 1) + 0.5,
        };
      function Yv(t) {
        if (t && "object" == typeof t) {
          const e = t.toString();
          return (
            "[object CanvasPattern]" === e || "[object CanvasGradient]" === e
          );
        }
        return !1;
      }
      function Kv(t) {
        return Yv(t) ? t : new Ts(t);
      }
      function yf(t) {
        return Yv(t) ? t : new Ts(t).saturate(0.5).darken(0.1).hexString();
      }
      const vN = ["x", "y", "borderWidth", "radius", "tension"],
        DN = ["color", "borderColor", "backgroundColor"],
        Xv = new Map();
      function Ur(t, e, n) {
        return (function xN(t, e) {
          e = e || {};
          const n = t + JSON.stringify(e);
          let i = Xv.get(n);
          return i || ((i = new Intl.NumberFormat(t, e)), Xv.set(n, i)), i;
        })(e, n).format(t);
      }
      const Zv = {
        values: (t) => (ge(t) ? t : "" + t),
        numeric(t, e, n) {
          if (0 === t) return "0";
          const i = this.chart.options.locale;
          let s,
            r = t;
          if (n.length > 1) {
            const c = Math.max(
              Math.abs(n[0].value),
              Math.abs(n[n.length - 1].value)
            );
            (c < 1e-4 || c > 1e15) && (s = "scientific"),
              (r = (function EN(t, e) {
                let n =
                  e.length > 3
                    ? e[2].value - e[1].value
                    : e[1].value - e[0].value;
                return (
                  Math.abs(n) >= 1 &&
                    t !== Math.floor(t) &&
                    (n = t - Math.floor(t)),
                  n
                );
              })(t, n));
          }
          const o = ni(Math.abs(r)),
            a = Math.max(Math.min(-1 * Math.floor(o), 20), 0),
            l = {
              notation: s,
              minimumFractionDigits: a,
              maximumFractionDigits: a,
            };
          return Object.assign(l, this.options.ticks.format), Ur(t, i, l);
        },
        logarithmic(t, e, n) {
          if (0 === t) return "0";
          const i = n[e].significand || t / Math.pow(10, Math.floor(ni(t)));
          return [1, 2, 3, 5, 10, 15].includes(i) || e > 0.8 * n.length
            ? Zv.numeric.call(this, t, e, n)
            : "";
        },
      };
      var sl = { formatters: Zv };
      const Ei = Object.create(null),
        _f = Object.create(null);
      function Wr(t, e) {
        if (!e) return t;
        const n = e.split(".");
        for (let i = 0, s = n.length; i < s; ++i) {
          const r = n[i];
          t = t[r] || (t[r] = Object.create(null));
        }
        return t;
      }
      function bf(t, e, n) {
        return "string" == typeof e ? jr(Wr(t, e), n) : jr(Wr(t, ""), e);
      }
      class SN {
        constructor(e, n) {
          (this.animation = void 0),
            (this.backgroundColor = "rgba(0,0,0,0.1)"),
            (this.borderColor = "rgba(0,0,0,0.1)"),
            (this.color = "#666"),
            (this.datasets = {}),
            (this.devicePixelRatio = (i) =>
              i.chart.platform.getDevicePixelRatio()),
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
            (this.hoverBackgroundColor = (i, s) => yf(s.backgroundColor)),
            (this.hoverBorderColor = (i, s) => yf(s.borderColor)),
            (this.hoverColor = (i, s) => yf(s.color)),
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
            this.describe(e),
            this.apply(n);
        }
        set(e, n) {
          return bf(this, e, n);
        }
        get(e) {
          return Wr(this, e);
        }
        describe(e, n) {
          return bf(_f, e, n);
        }
        override(e, n) {
          return bf(Ei, e, n);
        }
        route(e, n, i, s) {
          const r = Wr(this, e),
            o = Wr(this, i),
            a = "_" + n;
          Object.defineProperties(r, {
            [a]: { value: r[n], writable: !0 },
            [n]: {
              enumerable: !0,
              get() {
                const l = this[a],
                  c = o[s];
                return Y(l) ? Object.assign({}, c, l) : H(l, c);
              },
              set(l) {
                this[a] = l;
              },
            },
          });
        }
        apply(e) {
          e.forEach((n) => n(this));
        }
      }
      var Se = new SN(
        {
          _scriptable: (t) => !t.startsWith("on"),
          _indexable: (t) => "events" !== t,
          hover: { _fallback: "interaction" },
          interaction: { _scriptable: !1, _indexable: !1 },
        },
        [
          function wN(t) {
            t.set("animation", {
              delay: void 0,
              duration: 1e3,
              easing: "easeOutQuart",
              fn: void 0,
              from: void 0,
              loop: void 0,
              to: void 0,
              type: void 0,
            }),
              t.describe("animation", {
                _fallback: !1,
                _indexable: !1,
                _scriptable: (e) =>
                  "onProgress" !== e && "onComplete" !== e && "fn" !== e,
              }),
              t.set("animations", {
                colors: { type: "color", properties: DN },
                numbers: { type: "number", properties: vN },
              }),
              t.describe("animations", { _fallback: "animation" }),
              t.set("transitions", {
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
                    visible: {
                      type: "boolean",
                      easing: "linear",
                      fn: (e) => 0 | e,
                    },
                  },
                },
              });
          },
          function CN(t) {
            t.set("layout", {
              autoPadding: !0,
              padding: { top: 0, right: 0, bottom: 0, left: 0 },
            });
          },
          function MN(t) {
            t.set("scale", {
              display: !0,
              offset: !1,
              reverse: !1,
              beginAtZero: !1,
              bounds: "ticks",
              grace: 0,
              grid: {
                display: !0,
                lineWidth: 1,
                drawOnChartArea: !0,
                drawTicks: !0,
                tickLength: 8,
                tickWidth: (e, n) => n.lineWidth,
                tickColor: (e, n) => n.color,
                offset: !1,
              },
              border: { display: !0, dash: [], dashOffset: 0, width: 1 },
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
                callback: sl.formatters.values,
                minor: {},
                major: {},
                align: "center",
                crossAlign: "near",
                showLabelBackdrop: !1,
                backdropColor: "rgba(255, 255, 255, 0.75)",
                backdropPadding: 2,
              },
            }),
              t.route("scale.ticks", "color", "", "color"),
              t.route("scale.grid", "color", "", "borderColor"),
              t.route("scale.border", "color", "", "borderColor"),
              t.route("scale.title", "color", "", "color"),
              t.describe("scale", {
                _fallback: !1,
                _scriptable: (e) =>
                  !e.startsWith("before") &&
                  !e.startsWith("after") &&
                  "callback" !== e &&
                  "parser" !== e,
                _indexable: (e) =>
                  "borderDash" !== e && "tickBorderDash" !== e && "dash" !== e,
              }),
              t.describe("scales", { _fallback: "scale" }),
              t.describe("scale.ticks", {
                _scriptable: (e) => "backdropPadding" !== e && "callback" !== e,
                _indexable: (e) => "backdropPadding" !== e,
              });
          },
        ]
      );
      function rl(t, e, n, i, s) {
        let r = e[s];
        return (
          r || ((r = e[s] = t.measureText(s).width), n.push(s)),
          r > i && (i = r),
          i
        );
      }
      function TN(t, e, n, i) {
        let s = ((i = i || {}).data = i.data || {}),
          r = (i.garbageCollect = i.garbageCollect || []);
        i.font !== e &&
          ((s = i.data = {}), (r = i.garbageCollect = []), (i.font = e)),
          t.save(),
          (t.font = e);
        let o = 0;
        const a = n.length;
        let l, c, u, d, f;
        for (l = 0; l < a; l++)
          if (((d = n[l]), null != d && !0 !== ge(d))) o = rl(t, s, r, o, d);
          else if (ge(d))
            for (c = 0, u = d.length; c < u; c++)
              (f = d[c]), null != f && !ge(f) && (o = rl(t, s, r, o, f));
        t.restore();
        const h = r.length / 2;
        if (h > n.length) {
          for (l = 0; l < h; l++) delete s[r[l]];
          r.splice(0, h);
        }
        return o;
      }
      function Mi(t, e, n) {
        const i = t.currentDevicePixelRatio,
          s = 0 !== n ? Math.max(n / 2, 0.5) : 0;
        return Math.round((e - s) * i) / i + s;
      }
      function Qv(t, e) {
        (e = e || t.getContext("2d")).save(),
          e.resetTransform(),
          e.clearRect(0, 0, t.width, t.height),
          e.restore();
      }
      function vf(t, e, n, i) {
        Jv(t, e, n, i, null);
      }
      function Jv(t, e, n, i, s) {
        let r, o, a, l, c, u, d, f;
        const h = e.pointStyle,
          p = e.rotation,
          g = e.radius;
        let m = (p || 0) * uN;
        if (
          h &&
          "object" == typeof h &&
          ((r = h.toString()),
          "[object HTMLImageElement]" === r ||
            "[object HTMLCanvasElement]" === r)
        )
          return (
            t.save(),
            t.translate(n, i),
            t.rotate(m),
            t.drawImage(h, -h.width / 2, -h.height / 2, h.width, h.height),
            void t.restore()
          );
        if (!(isNaN(g) || g <= 0)) {
          switch ((t.beginPath(), h)) {
            default:
              s ? t.ellipse(n, i, s / 2, g, 0, 0, me) : t.arc(n, i, g, 0, me),
                t.closePath();
              break;
            case "triangle":
              (u = s ? s / 2 : g),
                t.moveTo(n + Math.sin(m) * u, i - Math.cos(m) * g),
                (m += Nv),
                t.lineTo(n + Math.sin(m) * u, i - Math.cos(m) * g),
                (m += Nv),
                t.lineTo(n + Math.sin(m) * u, i - Math.cos(m) * g),
                t.closePath();
              break;
            case "rectRounded":
              (c = 0.516 * g),
                (l = g - c),
                (o = Math.cos(m + xi) * l),
                (d = Math.cos(m + xi) * (s ? s / 2 - c : l)),
                (a = Math.sin(m + xi) * l),
                (f = Math.sin(m + xi) * (s ? s / 2 - c : l)),
                t.arc(n - d, i - a, c, m - be, m - Me),
                t.arc(n + f, i - o, c, m - Me, m),
                t.arc(n + d, i + a, c, m, m + Me),
                t.arc(n - f, i + o, c, m + Me, m + be),
                t.closePath();
              break;
            case "rect":
              if (!p) {
                (l = Math.SQRT1_2 * g),
                  (u = s ? s / 2 : l),
                  t.rect(n - u, i - l, 2 * u, 2 * l);
                break;
              }
              m += xi;
            case "rectRot":
              (d = Math.cos(m) * (s ? s / 2 : g)),
                (o = Math.cos(m) * g),
                (a = Math.sin(m) * g),
                (f = Math.sin(m) * (s ? s / 2 : g)),
                t.moveTo(n - d, i - a),
                t.lineTo(n + f, i - o),
                t.lineTo(n + d, i + a),
                t.lineTo(n - f, i + o),
                t.closePath();
              break;
            case "crossRot":
              m += xi;
            case "cross":
              (d = Math.cos(m) * (s ? s / 2 : g)),
                (o = Math.cos(m) * g),
                (a = Math.sin(m) * g),
                (f = Math.sin(m) * (s ? s / 2 : g)),
                t.moveTo(n - d, i - a),
                t.lineTo(n + d, i + a),
                t.moveTo(n + f, i - o),
                t.lineTo(n - f, i + o);
              break;
            case "star":
              (d = Math.cos(m) * (s ? s / 2 : g)),
                (o = Math.cos(m) * g),
                (a = Math.sin(m) * g),
                (f = Math.sin(m) * (s ? s / 2 : g)),
                t.moveTo(n - d, i - a),
                t.lineTo(n + d, i + a),
                t.moveTo(n + f, i - o),
                t.lineTo(n - f, i + o),
                (m += xi),
                (d = Math.cos(m) * (s ? s / 2 : g)),
                (o = Math.cos(m) * g),
                (a = Math.sin(m) * g),
                (f = Math.sin(m) * (s ? s / 2 : g)),
                t.moveTo(n - d, i - a),
                t.lineTo(n + d, i + a),
                t.moveTo(n + f, i - o),
                t.lineTo(n - f, i + o);
              break;
            case "line":
              (o = s ? s / 2 : Math.cos(m) * g),
                (a = Math.sin(m) * g),
                t.moveTo(n - o, i - a),
                t.lineTo(n + o, i + a);
              break;
            case "dash":
              t.moveTo(n, i),
                t.lineTo(
                  n + Math.cos(m) * (s ? s / 2 : g),
                  i + Math.sin(m) * g
                );
              break;
            case !1:
              t.closePath();
          }
          t.fill(), e.borderWidth > 0 && t.stroke();
        }
      }
      function Gr(t, e, n) {
        return (
          (n = n || 0.5),
          !e ||
            (t &&
              t.x > e.left - n &&
              t.x < e.right + n &&
              t.y > e.top - n &&
              t.y < e.bottom + n)
        );
      }
      function ol(t, e) {
        t.save(),
          t.beginPath(),
          t.rect(e.left, e.top, e.right - e.left, e.bottom - e.top),
          t.clip();
      }
      function al(t) {
        t.restore();
      }
      function AN(t, e, n, i, s) {
        if (!e) return t.lineTo(n.x, n.y);
        if ("middle" === s) {
          const r = (e.x + n.x) / 2;
          t.lineTo(r, e.y), t.lineTo(r, n.y);
        } else ("after" === s) != !!i ? t.lineTo(e.x, n.y) : t.lineTo(n.x, e.y);
        t.lineTo(n.x, n.y);
      }
      function PN(t, e, n, i) {
        if (!e) return t.lineTo(n.x, n.y);
        t.bezierCurveTo(
          i ? e.cp1x : e.cp2x,
          i ? e.cp1y : e.cp2y,
          i ? n.cp2x : n.cp1x,
          i ? n.cp2y : n.cp1y,
          n.x,
          n.y
        );
      }
      function Si(t, e, n, i, s, r = {}) {
        const o = ge(e) ? e : [e],
          a = r.strokeWidth > 0 && "" !== r.strokeColor;
        let l, c;
        for (
          t.save(),
            t.font = s.string,
            (function ON(t, e) {
              e.translation && t.translate(e.translation[0], e.translation[1]),
                Q(e.rotation) || t.rotate(e.rotation),
                e.color && (t.fillStyle = e.color),
                e.textAlign && (t.textAlign = e.textAlign),
                e.textBaseline && (t.textBaseline = e.textBaseline);
            })(t, r),
            l = 0;
          l < o.length;
          ++l
        )
          (c = o[l]),
            r.backdrop && NN(t, r.backdrop),
            a &&
              (r.strokeColor && (t.strokeStyle = r.strokeColor),
              Q(r.strokeWidth) || (t.lineWidth = r.strokeWidth),
              t.strokeText(c, n, i, r.maxWidth)),
            t.fillText(c, n, i, r.maxWidth),
            kN(t, n, i, c, r),
            (i += s.lineHeight);
        t.restore();
      }
      function kN(t, e, n, i, s) {
        if (s.strikethrough || s.underline) {
          const r = t.measureText(i),
            o = e - r.actualBoundingBoxLeft,
            a = e + r.actualBoundingBoxRight,
            l = n - r.actualBoundingBoxAscent,
            c = n + r.actualBoundingBoxDescent,
            u = s.strikethrough ? (l + c) / 2 : c;
          (t.strokeStyle = t.fillStyle),
            t.beginPath(),
            (t.lineWidth = s.decorationWidth || 2),
            t.moveTo(o, u),
            t.lineTo(a, u),
            t.stroke();
        }
      }
      function NN(t, e) {
        const n = t.fillStyle;
        (t.fillStyle = e.color),
          t.fillRect(e.left, e.top, e.width, e.height),
          (t.fillStyle = n);
      }
      function qr(t, e) {
        const { x: n, y: i, w: s, h: r, radius: o } = e;
        t.arc(n + o.topLeft, i + o.topLeft, o.topLeft, -Me, be, !0),
          t.lineTo(n, i + r - o.bottomLeft),
          t.arc(
            n + o.bottomLeft,
            i + r - o.bottomLeft,
            o.bottomLeft,
            be,
            Me,
            !0
          ),
          t.lineTo(n + s - o.bottomRight, i + r),
          t.arc(
            n + s - o.bottomRight,
            i + r - o.bottomRight,
            o.bottomRight,
            Me,
            0,
            !0
          ),
          t.lineTo(n + s, i + o.topRight),
          t.arc(n + s - o.topRight, i + o.topRight, o.topRight, 0, -Me, !0),
          t.lineTo(n + o.topLeft, i);
      }
      const FN = /^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/,
        RN =
          /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;
      function LN(t, e) {
        const n = ("" + t).match(FN);
        if (!n || "normal" === n[1]) return 1.2 * e;
        switch (((t = +n[2]), n[3])) {
          case "px":
            return t;
          case "%":
            t /= 100;
        }
        return e * t;
      }
      const BN = (t) => +t || 0;
      function Df(t, e) {
        const n = {},
          i = Y(e),
          s = i ? Object.keys(e) : e,
          r = Y(t) ? (i ? (o) => H(t[o], t[e[o]]) : (o) => t[o]) : () => t;
        for (const o of s) n[o] = BN(r(o));
        return n;
      }
      function e0(t) {
        return Df(t, { top: "y", right: "x", bottom: "y", left: "x" });
      }
      function Ii(t) {
        return Df(t, ["topLeft", "topRight", "bottomLeft", "bottomRight"]);
      }
      function Je(t) {
        const e = e0(t);
        return (e.width = e.left + e.right), (e.height = e.top + e.bottom), e;
      }
      function Ve(t, e) {
        let n = H((t = t || {}).size, (e = e || Se.font).size);
        "string" == typeof n && (n = parseInt(n, 10));
        let i = H(t.style, e.style);
        i &&
          !("" + i).match(RN) &&
          (console.warn('Invalid font style specified: "' + i + '"'),
          (i = void 0));
        const s = {
          family: H(t.family, e.family),
          lineHeight: LN(H(t.lineHeight, e.lineHeight), n),
          size: n,
          style: i,
          weight: H(t.weight, e.weight),
          string: "",
        };
        return (
          (s.string = (function IN(t) {
            return !t || Q(t.size) || Q(t.family)
              ? null
              : (t.style ? t.style + " " : "") +
                  (t.weight ? t.weight + " " : "") +
                  t.size +
                  "px " +
                  t.family;
          })(s)),
          s
        );
      }
      function Yr(t, e, n, i) {
        let r,
          o,
          a,
          s = !0;
        for (r = 0, o = t.length; r < o; ++r)
          if (
            ((a = t[r]),
            void 0 !== a &&
              (void 0 !== e && "function" == typeof a && ((a = a(e)), (s = !1)),
              void 0 !== n && ge(a) && ((a = a[n % a.length]), (s = !1)),
              void 0 !== a))
          )
            return i && !s && (i.cacheable = !1), a;
      }
      function ii(t, e) {
        return Object.assign(Object.create(t), e);
      }
      function wf(t, e = [""], n = t, i, s = () => t[0]) {
        jt(i) || (i = o0("_fallback", t));
        const r = {
          [Symbol.toStringTag]: "Object",
          _cacheable: !0,
          _scopes: t,
          _rootScopes: n,
          _fallback: i,
          _getTarget: s,
          override: (o) => wf([o, ...t], e, n, i),
        };
        return new Proxy(r, {
          deleteProperty: (o, a) => (
            delete o[a], delete o._keys, delete t[0][a], !0
          ),
          get: (o, a) =>
            n0(o, a, () =>
              (function qN(t, e, n, i) {
                let s;
                for (const r of e)
                  if (((s = o0(VN(r, t), n)), jt(s)))
                    return Cf(t, s) ? xf(n, i, t, s) : s;
              })(a, e, t, o)
            ),
          getOwnPropertyDescriptor: (o, a) =>
            Reflect.getOwnPropertyDescriptor(o._scopes[0], a),
          getPrototypeOf: () => Reflect.getPrototypeOf(t[0]),
          has: (o, a) => a0(o).includes(a),
          ownKeys: (o) => a0(o),
          set(o, a, l) {
            const c = o._storage || (o._storage = s());
            return (o[a] = c[a] = l), delete o._keys, !0;
          },
        });
      }
      function Ps(t, e, n, i) {
        const s = {
          _cacheable: !1,
          _proxy: t,
          _context: e,
          _subProxy: n,
          _stack: new Set(),
          _descriptors: t0(t, i),
          setContext: (r) => Ps(t, r, n, i),
          override: (r) => Ps(t.override(r), e, n, i),
        };
        return new Proxy(s, {
          deleteProperty: (r, o) => (delete r[o], delete t[o], !0),
          get: (r, o, a) =>
            n0(r, o, () =>
              (function HN(t, e, n) {
                const {
                  _proxy: i,
                  _context: s,
                  _subProxy: r,
                  _descriptors: o,
                } = t;
                let a = i[e];
                return (
                  ti(a) &&
                    o.isScriptable(e) &&
                    (a = (function $N(t, e, n, i) {
                      const {
                        _proxy: s,
                        _context: r,
                        _subProxy: o,
                        _stack: a,
                      } = n;
                      if (a.has(t))
                        throw new Error(
                          "Recursion detected: " +
                            Array.from(a).join("->") +
                            "->" +
                            t
                        );
                      return (
                        a.add(t),
                        (e = e(r, o || i)),
                        a.delete(t),
                        Cf(t, e) && (e = xf(s._scopes, s, t, e)),
                        e
                      );
                    })(e, a, t, n)),
                  ge(a) &&
                    a.length &&
                    (a = (function zN(t, e, n, i) {
                      const {
                        _proxy: s,
                        _context: r,
                        _subProxy: o,
                        _descriptors: a,
                      } = n;
                      if (jt(r.index) && i(t)) e = e[r.index % e.length];
                      else if (Y(e[0])) {
                        const l = e,
                          c = s._scopes.filter((u) => u !== l);
                        e = [];
                        for (const u of l) {
                          const d = xf(c, s, t, u);
                          e.push(Ps(d, r, o && o[t], a));
                        }
                      }
                      return e;
                    })(e, a, t, o.isIndexable)),
                  Cf(e, a) && (a = Ps(a, s, r && r[e], o)),
                  a
                );
              })(r, o, a)
            ),
          getOwnPropertyDescriptor: (r, o) =>
            r._descriptors.allKeys
              ? Reflect.has(t, o)
                ? { enumerable: !0, configurable: !0 }
                : void 0
              : Reflect.getOwnPropertyDescriptor(t, o),
          getPrototypeOf: () => Reflect.getPrototypeOf(t),
          has: (r, o) => Reflect.has(t, o),
          ownKeys: () => Reflect.ownKeys(t),
          set: (r, o, a) => ((t[o] = a), delete r[o], !0),
        });
      }
      function t0(t, e = { scriptable: !0, indexable: !0 }) {
        const {
          _scriptable: n = e.scriptable,
          _indexable: i = e.indexable,
          _allKeys: s = e.allKeys,
        } = t;
        return {
          allKeys: s,
          scriptable: n,
          indexable: i,
          isScriptable: ti(n) ? n : () => n,
          isIndexable: ti(i) ? i : () => i,
        };
      }
      const VN = (t, e) => (t ? t + ff(e) : e),
        Cf = (t, e) =>
          Y(e) &&
          "adapters" !== t &&
          (null === Object.getPrototypeOf(e) || e.constructor === Object);
      function n0(t, e, n) {
        if (Object.prototype.hasOwnProperty.call(t, e)) return t[e];
        const i = n();
        return (t[e] = i), i;
      }
      function s0(t, e, n) {
        return ti(t) ? t(e, n) : t;
      }
      const UN = (t, e) =>
        !0 === t ? e : "string" == typeof t ? ei(e, t) : void 0;
      function WN(t, e, n, i, s) {
        for (const r of e) {
          const o = UN(n, r);
          if (o) {
            t.add(o);
            const a = s0(o._fallback, n, s);
            if (jt(a) && a !== n && a !== i) return a;
          } else if (!1 === o && jt(i) && n !== i) return null;
        }
        return !1;
      }
      function xf(t, e, n, i) {
        const s = e._rootScopes,
          r = s0(e._fallback, n, i),
          o = [...t, ...s],
          a = new Set();
        a.add(i);
        let l = r0(a, o, n, r || n, i);
        return (
          !(
            null === l ||
            (jt(r) && r !== n && ((l = r0(a, o, r, l, i)), null === l))
          ) &&
          wf(Array.from(a), [""], s, r, () =>
            (function GN(t, e, n) {
              const i = t._getTarget();
              e in i || (i[e] = {});
              const s = i[e];
              return ge(s) && Y(n) ? n : s || {};
            })(e, n, i)
          )
        );
      }
      function r0(t, e, n, i, s) {
        for (; n; ) n = WN(t, e, n, i, s);
        return n;
      }
      function o0(t, e) {
        for (const n of e) {
          if (!n) continue;
          const i = n[t];
          if (jt(i)) return i;
        }
      }
      function a0(t) {
        let e = t._keys;
        return (
          e ||
            (e = t._keys =
              (function YN(t) {
                const e = new Set();
                for (const n of t)
                  for (const i of Object.keys(n).filter(
                    (s) => !s.startsWith("_")
                  ))
                    e.add(i);
                return Array.from(e);
              })(t._scopes)),
          e
        );
      }
      function l0(t, e, n, i) {
        const { iScale: s } = t,
          { key: r = "r" } = this._parsing,
          o = new Array(i);
        let a, l, c, u;
        for (a = 0, l = i; a < l; ++a)
          (c = a + n), (u = e[c]), (o[a] = { r: s.parse(ei(u, r), c) });
        return o;
      }
      const KN = Number.EPSILON || 1e-14,
        Os = (t, e) => e < t.length && !t[e].skip && t[e],
        c0 = (t) => ("x" === t ? "y" : "x");
      function XN(t, e, n, i) {
        const s = t.skip ? e : t,
          r = e,
          o = n.skip ? e : n,
          a = pf(r, s),
          l = pf(o, r);
        let c = a / (a + l),
          u = l / (a + l);
        (c = isNaN(c) ? 0 : c), (u = isNaN(u) ? 0 : u);
        const d = i * c,
          f = i * u;
        return {
          previous: { x: r.x - d * (o.x - s.x), y: r.y - d * (o.y - s.y) },
          next: { x: r.x + f * (o.x - s.x), y: r.y + f * (o.y - s.y) },
        };
      }
      function ll(t, e, n) {
        return Math.max(Math.min(t, n), e);
      }
      function tF(t, e, n, i, s) {
        let r, o, a, l;
        if (
          (e.spanGaps && (t = t.filter((c) => !c.skip)),
          "monotone" === e.cubicInterpolationMode)
        )
          !(function JN(t, e = "x") {
            const n = c0(e),
              i = t.length,
              s = Array(i).fill(0),
              r = Array(i);
            let o,
              a,
              l,
              c = Os(t, 0);
            for (o = 0; o < i; ++o)
              if (((a = l), (l = c), (c = Os(t, o + 1)), l)) {
                if (c) {
                  const u = c[e] - l[e];
                  s[o] = 0 !== u ? (c[n] - l[n]) / u : 0;
                }
                r[o] = a
                  ? c
                    ? pn(s[o - 1]) !== pn(s[o])
                      ? 0
                      : (s[o - 1] + s[o]) / 2
                    : s[o - 1]
                  : s[o];
              }
            (function ZN(t, e, n) {
              const i = t.length;
              let s,
                r,
                o,
                a,
                l,
                c = Os(t, 0);
              for (let u = 0; u < i - 1; ++u)
                if (((l = c), (c = Os(t, u + 1)), l && c)) {
                  if (Hr(e[u], 0, KN)) {
                    n[u] = n[u + 1] = 0;
                    continue;
                  }
                  (s = n[u] / e[u]),
                    (r = n[u + 1] / e[u]),
                    (a = Math.pow(s, 2) + Math.pow(r, 2)),
                    !(a <= 9) &&
                      ((o = 3 / Math.sqrt(a)),
                      (n[u] = s * o * e[u]),
                      (n[u + 1] = r * o * e[u]));
                }
            })(t, s, r),
              (function QN(t, e, n = "x") {
                const i = c0(n),
                  s = t.length;
                let r,
                  o,
                  a,
                  l = Os(t, 0);
                for (let c = 0; c < s; ++c) {
                  if (((o = a), (a = l), (l = Os(t, c + 1)), !a)) continue;
                  const u = a[n],
                    d = a[i];
                  o &&
                    ((r = (u - o[n]) / 3),
                    (a[`cp1${n}`] = u - r),
                    (a[`cp1${i}`] = d - r * e[c])),
                    l &&
                      ((r = (l[n] - u) / 3),
                      (a[`cp2${n}`] = u + r),
                      (a[`cp2${i}`] = d + r * e[c]));
                }
              })(t, r, e);
          })(t, s);
        else {
          let c = i ? t[t.length - 1] : t[0];
          for (r = 0, o = t.length; r < o; ++r)
            (a = t[r]),
              (l = XN(
                c,
                a,
                t[Math.min(r + 1, o - (i ? 0 : 1)) % o],
                e.tension
              )),
              (a.cp1x = l.previous.x),
              (a.cp1y = l.previous.y),
              (a.cp2x = l.next.x),
              (a.cp2y = l.next.y),
              (c = a);
        }
        e.capBezierPoints &&
          (function eF(t, e) {
            let n,
              i,
              s,
              r,
              o,
              a = Gr(t[0], e);
            for (n = 0, i = t.length; n < i; ++n)
              (o = r),
                (r = a),
                (a = n < i - 1 && Gr(t[n + 1], e)),
                r &&
                  ((s = t[n]),
                  o &&
                    ((s.cp1x = ll(s.cp1x, e.left, e.right)),
                    (s.cp1y = ll(s.cp1y, e.top, e.bottom))),
                  a &&
                    ((s.cp2x = ll(s.cp2x, e.left, e.right)),
                    (s.cp2y = ll(s.cp2y, e.top, e.bottom))));
          })(t, n);
      }
      function u0() {
        return typeof window < "u" && typeof document < "u";
      }
      function Ef(t) {
        let e = t.parentNode;
        return e && "[object ShadowRoot]" === e.toString() && (e = e.host), e;
      }
      function cl(t, e, n) {
        let i;
        return (
          "string" == typeof t
            ? ((i = parseInt(t, 10)),
              -1 !== t.indexOf("%") && (i = (i / 100) * e.parentNode[n]))
            : (i = t),
          i
        );
      }
      const ul = (t) => t.ownerDocument.defaultView.getComputedStyle(t, null),
        iF = ["top", "right", "bottom", "left"];
      function Ti(t, e, n) {
        const i = {};
        n = n ? "-" + n : "";
        for (let s = 0; s < 4; s++) {
          const r = iF[s];
          i[r] = parseFloat(t[e + "-" + r + n]) || 0;
        }
        return (i.width = i.left + i.right), (i.height = i.top + i.bottom), i;
      }
      function Ai(t, e) {
        if ("native" in t) return t;
        const { canvas: n, currentDevicePixelRatio: i } = e,
          s = ul(n),
          r = "border-box" === s.boxSizing,
          o = Ti(s, "padding"),
          a = Ti(s, "border", "width"),
          {
            x: l,
            y: c,
            box: u,
          } = (function rF(t, e) {
            const n = t.touches,
              i = n && n.length ? n[0] : t,
              { offsetX: s, offsetY: r } = i;
            let a,
              l,
              o = !1;
            if (
              ((t, e, n) => (t > 0 || e > 0) && (!n || !n.shadowRoot))(
                s,
                r,
                t.target
              )
            )
              (a = s), (l = r);
            else {
              const c = e.getBoundingClientRect();
              (a = i.clientX - c.left), (l = i.clientY - c.top), (o = !0);
            }
            return { x: a, y: l, box: o };
          })(t, n),
          d = o.left + (u && a.left),
          f = o.top + (u && a.top);
        let { width: h, height: p } = e;
        return (
          r && ((h -= o.width + a.width), (p -= o.height + a.height)),
          {
            x: Math.round((((l - d) / h) * n.width) / i),
            y: Math.round((((c - f) / p) * n.height) / i),
          }
        );
      }
      const dl = (t) => Math.round(10 * t) / 10;
      function d0(t, e, n) {
        const i = e || 1,
          s = Math.floor(t.height * i),
          r = Math.floor(t.width * i);
        (t.height = Math.floor(t.height)), (t.width = Math.floor(t.width));
        const o = t.canvas;
        return (
          o.style &&
            (n || (!o.style.height && !o.style.width)) &&
            ((o.style.height = `${t.height}px`),
            (o.style.width = `${t.width}px`)),
          (t.currentDevicePixelRatio !== i ||
            o.height !== s ||
            o.width !== r) &&
            ((t.currentDevicePixelRatio = i),
            (o.height = s),
            (o.width = r),
            t.ctx.setTransform(i, 0, 0, i, 0, 0),
            !0)
        );
      }
      const lF = (function () {
        let t = !1;
        try {
          const e = {
            get passive() {
              return (t = !0), !1;
            },
          };
          window.addEventListener("test", null, e),
            window.removeEventListener("test", null, e);
        } catch {}
        return t;
      })();
      function f0(t, e) {
        const n = (function nF(t, e) {
            return ul(t).getPropertyValue(e);
          })(t, e),
          i = n && n.match(/^(\d+)(\.\d+)?px$/);
        return i ? +i[1] : void 0;
      }
      function Pi(t, e, n, i) {
        return { x: t.x + n * (e.x - t.x), y: t.y + n * (e.y - t.y) };
      }
      function cF(t, e, n, i) {
        return {
          x: t.x + n * (e.x - t.x),
          y:
            "middle" === i
              ? n < 0.5
                ? t.y
                : e.y
              : "after" === i
              ? n < 1
                ? t.y
                : e.y
              : n > 0
              ? e.y
              : t.y,
        };
      }
      function uF(t, e, n, i) {
        const s = { x: t.cp2x, y: t.cp2y },
          r = { x: e.cp1x, y: e.cp1y },
          o = Pi(t, s, n),
          a = Pi(s, r, n),
          l = Pi(r, e, n),
          c = Pi(o, a, n),
          u = Pi(a, l, n);
        return Pi(c, u, n);
      }
      function ks(t, e, n) {
        return t
          ? (function (t, e) {
              return {
                x: (n) => t + t + e - n,
                setWidth(n) {
                  e = n;
                },
                textAlign: (n) =>
                  "center" === n ? n : "right" === n ? "left" : "right",
                xPlus: (n, i) => n - i,
                leftForLtr: (n, i) => n - i,
              };
            })(e, n)
          : {
              x: (t) => t,
              setWidth(t) {},
              textAlign: (t) => t,
              xPlus: (t, e) => t + e,
              leftForLtr: (t, e) => t,
            };
      }
      function h0(t, e) {
        let n, i;
        ("ltr" === e || "rtl" === e) &&
          ((n = t.canvas.style),
          (i = [
            n.getPropertyValue("direction"),
            n.getPropertyPriority("direction"),
          ]),
          n.setProperty("direction", e, "important"),
          (t.prevTextDirection = i));
      }
      function p0(t, e) {
        void 0 !== e &&
          (delete t.prevTextDirection,
          t.canvas.style.setProperty("direction", e[0], e[1]));
      }
      function g0(t) {
        return "angle" === t
          ? { between: $r, compare: hN, normalize: It }
          : { between: Rn, compare: (e, n) => e - n, normalize: (e) => e };
      }
      function m0({ start: t, end: e, count: n, loop: i, style: s }) {
        return {
          start: t % n,
          end: e % n,
          loop: i && (e - t + 1) % n == 0,
          style: s,
        };
      }
      function y0(t, e, n) {
        if (!n) return [t];
        const { property: i, start: s, end: r } = n,
          o = e.length,
          { compare: a, between: l, normalize: c } = g0(i),
          {
            start: u,
            end: d,
            loop: f,
            style: h,
          } = (function hF(t, e, n) {
            const { property: i, start: s, end: r } = n,
              { between: o, normalize: a } = g0(i),
              l = e.length;
            let f,
              h,
              { start: c, end: u, loop: d } = t;
            if (d) {
              for (
                c += l, u += l, f = 0, h = l;
                f < h && o(a(e[c % l][i]), s, r);
                ++f
              )
                c--, u--;
              (c %= l), (u %= l);
            }
            return (
              u < c && (u += l), { start: c, end: u, loop: d, style: t.style }
            );
          })(t, e, n),
          p = [];
        let y,
          b,
          _,
          g = !1,
          m = null;
        for (let M = u, T = u; M <= d; ++M)
          (b = e[M % o]),
            !b.skip &&
              ((y = c(b[i])),
              y !== _ &&
                ((g = l(y, s, r)),
                null === m &&
                  (g || (l(s, _, y) && 0 !== a(s, _))) &&
                  (m = 0 === a(y, s) ? M : T),
                null !== m &&
                  (!g || 0 === a(r, y) || l(r, _, y)) &&
                  (p.push(
                    m0({ start: m, end: M, loop: f, count: o, style: h })
                  ),
                  (m = null)),
                (T = M),
                (_ = y)));
        return (
          null !== m &&
            p.push(m0({ start: m, end: d, loop: f, count: o, style: h })),
          p
        );
      }
      function _0(t, e) {
        const n = [],
          i = t.segments;
        for (let s = 0; s < i.length; s++) {
          const r = y0(i[s], t.points, e);
          r.length && n.push(...r);
        }
        return n;
      }
      function v0(t) {
        return {
          backgroundColor: t.backgroundColor,
          borderCapStyle: t.borderCapStyle,
          borderDash: t.borderDash,
          borderDashOffset: t.borderDashOffset,
          borderJoinStyle: t.borderJoinStyle,
          borderWidth: t.borderWidth,
          borderColor: t.borderColor,
        };
      }
      function _F(t, e) {
        return e && JSON.stringify(t) !== JSON.stringify(e);
      }
      class bF {
        constructor() {
          (this._request = null),
            (this._charts = new Map()),
            (this._running = !1),
            (this._lastDate = void 0);
        }
        _notify(e, n, i, s) {
          const o = n.duration;
          n.listeners[s].forEach((a) =>
            a({
              chart: e,
              initial: n.initial,
              numSteps: o,
              currentStep: Math.min(i - n.start, o),
            })
          );
        }
        _refresh() {
          this._request ||
            ((this._running = !0),
            (this._request = $v.call(window, () => {
              this._update(),
                (this._request = null),
                this._running && this._refresh();
            })));
        }
        _update(e = Date.now()) {
          let n = 0;
          this._charts.forEach((i, s) => {
            if (!i.running || !i.items.length) return;
            const r = i.items;
            let l,
              o = r.length - 1,
              a = !1;
            for (; o >= 0; --o)
              (l = r[o]),
                l._active
                  ? (l._total > i.duration && (i.duration = l._total),
                    l.tick(e),
                    (a = !0))
                  : ((r[o] = r[r.length - 1]), r.pop());
            a && (s.draw(), this._notify(s, i, e, "progress")),
              r.length ||
                ((i.running = !1),
                this._notify(s, i, e, "complete"),
                (i.initial = !1)),
              (n += r.length);
          }),
            (this._lastDate = e),
            0 === n && (this._running = !1);
        }
        _getAnims(e) {
          const n = this._charts;
          let i = n.get(e);
          return (
            i ||
              ((i = {
                running: !1,
                initial: !0,
                items: [],
                listeners: { complete: [], progress: [] },
              }),
              n.set(e, i)),
            i
          );
        }
        listen(e, n, i) {
          this._getAnims(e).listeners[n].push(i);
        }
        add(e, n) {
          !n || !n.length || this._getAnims(e).items.push(...n);
        }
        has(e) {
          return this._getAnims(e).items.length > 0;
        }
        start(e) {
          const n = this._charts.get(e);
          !n ||
            ((n.running = !0),
            (n.start = Date.now()),
            (n.duration = n.items.reduce(
              (i, s) => Math.max(i, s._duration),
              0
            )),
            this._refresh());
        }
        running(e) {
          if (!this._running) return !1;
          const n = this._charts.get(e);
          return !(!n || !n.running || !n.items.length);
        }
        stop(e) {
          const n = this._charts.get(e);
          if (!n || !n.items.length) return;
          const i = n.items;
          let s = i.length - 1;
          for (; s >= 0; --s) i[s].cancel();
          (n.items = []), this._notify(e, n, Date.now(), "complete");
        }
        remove(e) {
          return this._charts.delete(e);
        }
      }
      var Bn = new bF();
      const D0 = "transparent",
        vF = {
          boolean: (t, e, n) => (n > 0.5 ? e : t),
          color(t, e, n) {
            const i = Kv(t || D0),
              s = i.valid && Kv(e || D0);
            return s && s.valid ? s.mix(i, n).hexString() : e;
          },
          number: (t, e, n) => t + (e - t) * n,
        };
      class DF {
        constructor(e, n, i, s) {
          const r = n[i];
          s = Yr([e.to, s, r, e.from]);
          const o = Yr([e.from, r, s]);
          (this._active = !0),
            (this._fn = e.fn || vF[e.type || typeof o]),
            (this._easing = zr[e.easing] || zr.linear),
            (this._start = Math.floor(Date.now() + (e.delay || 0))),
            (this._duration = this._total = Math.floor(e.duration)),
            (this._loop = !!e.loop),
            (this._target = n),
            (this._prop = i),
            (this._from = o),
            (this._to = s),
            (this._promises = void 0);
        }
        active() {
          return this._active;
        }
        update(e, n, i) {
          if (this._active) {
            this._notify(!1);
            const s = this._target[this._prop],
              r = i - this._start,
              o = this._duration - r;
            (this._start = i),
              (this._duration = Math.floor(Math.max(o, e.duration))),
              (this._total += r),
              (this._loop = !!e.loop),
              (this._to = Yr([e.to, n, s, e.from])),
              (this._from = Yr([e.from, s, n]));
          }
        }
        cancel() {
          this._active &&
            (this.tick(Date.now()), (this._active = !1), this._notify(!1));
        }
        tick(e) {
          const n = e - this._start,
            i = this._duration,
            s = this._prop,
            r = this._from,
            o = this._loop,
            a = this._to;
          let l;
          if (((this._active = r !== a && (o || n < i)), !this._active))
            return (this._target[s] = a), void this._notify(!0);
          n < 0
            ? (this._target[s] = r)
            : ((l = (n / i) % 2),
              (l = o && l > 1 ? 2 - l : l),
              (l = this._easing(Math.min(1, Math.max(0, l)))),
              (this._target[s] = this._fn(r, a, l)));
        }
        wait() {
          const e = this._promises || (this._promises = []);
          return new Promise((n, i) => {
            e.push({ res: n, rej: i });
          });
        }
        _notify(e) {
          const n = e ? "res" : "rej",
            i = this._promises || [];
          for (let s = 0; s < i.length; s++) i[s][n]();
        }
      }
      class w0 {
        constructor(e, n) {
          (this._chart = e), (this._properties = new Map()), this.configure(n);
        }
        configure(e) {
          if (!Y(e)) return;
          const n = Object.keys(Se.animation),
            i = this._properties;
          Object.getOwnPropertyNames(e).forEach((s) => {
            const r = e[s];
            if (!Y(r)) return;
            const o = {};
            for (const a of n) o[a] = r[a];
            ((ge(r.properties) && r.properties) || [s]).forEach((a) => {
              (a === s || !i.has(a)) && i.set(a, o);
            });
          });
        }
        _animateOptions(e, n) {
          const i = n.options,
            s = (function CF(t, e) {
              if (!e) return;
              let n = t.options;
              if (n)
                return (
                  n.$shared &&
                    (t.options = n =
                      Object.assign({}, n, { $shared: !1, $animations: {} })),
                  n
                );
              t.options = e;
            })(e, i);
          if (!s) return [];
          const r = this._createAnimations(s, i);
          return (
            i.$shared &&
              (function wF(t, e) {
                const n = [],
                  i = Object.keys(e);
                for (let s = 0; s < i.length; s++) {
                  const r = t[i[s]];
                  r && r.active() && n.push(r.wait());
                }
                return Promise.all(n);
              })(e.options.$animations, i).then(
                () => {
                  e.options = i;
                },
                () => {}
              ),
            r
          );
        }
        _createAnimations(e, n) {
          const i = this._properties,
            s = [],
            r = e.$animations || (e.$animations = {}),
            o = Object.keys(n),
            a = Date.now();
          let l;
          for (l = o.length - 1; l >= 0; --l) {
            const c = o[l];
            if ("$" === c.charAt(0)) continue;
            if ("options" === c) {
              s.push(...this._animateOptions(e, n));
              continue;
            }
            const u = n[c];
            let d = r[c];
            const f = i.get(c);
            if (d) {
              if (f && d.active()) {
                d.update(f, u, a);
                continue;
              }
              d.cancel();
            }
            f && f.duration
              ? ((r[c] = d = new DF(f, e, c, u)), s.push(d))
              : (e[c] = u);
          }
          return s;
        }
        update(e, n) {
          if (0 === this._properties.size) return void Object.assign(e, n);
          const i = this._createAnimations(e, n);
          return i.length ? (Bn.add(this._chart, i), !0) : void 0;
        }
      }
      function C0(t, e) {
        const n = (t && t.options) || {},
          i = n.reverse,
          s = void 0 === n.min ? e : 0,
          r = void 0 === n.max ? e : 0;
        return { start: i ? r : s, end: i ? s : r };
      }
      function x0(t, e) {
        const n = [],
          i = t._getSortedDatasetMetas(e);
        let s, r;
        for (s = 0, r = i.length; s < r; ++s) n.push(i[s].index);
        return n;
      }
      function E0(t, e, n, i = {}) {
        const s = t.keys,
          r = "single" === i.mode;
        let o, a, l, c;
        if (null !== e) {
          for (o = 0, a = s.length; o < a; ++o) {
            if (((l = +s[o]), l === n)) {
              if (i.all) continue;
              break;
            }
            (c = t.values[l]),
              Ee(c) && (r || 0 === e || pn(e) === pn(c)) && (e += c);
          }
          return e;
        }
      }
      function M0(t, e) {
        const n = t && t.options.stacked;
        return n || (void 0 === n && void 0 !== e.stack);
      }
      function TF(t, e, n) {
        const i = t[e] || (t[e] = {});
        return i[n] || (i[n] = {});
      }
      function S0(t, e, n, i) {
        for (const s of e.getMatchingVisibleMetas(i).reverse()) {
          const r = t[s.index];
          if ((n && r > 0) || (!n && r < 0)) return s.index;
        }
        return null;
      }
      function I0(t, e) {
        const { chart: n, _cachedMeta: i } = t,
          s = n._stacks || (n._stacks = {}),
          { iScale: r, vScale: o, index: a } = i,
          l = r.axis,
          c = o.axis,
          u = (function SF(t, e, n) {
            return `${t.id}.${e.id}.${n.stack || n.type}`;
          })(r, o, i),
          d = e.length;
        let f;
        for (let h = 0; h < d; ++h) {
          const p = e[h],
            { [l]: g, [c]: m } = p;
          (f = (p._stacks || (p._stacks = {}))[c] = TF(s, u, g)),
            (f[a] = m),
            (f._top = S0(f, o, !0, i.type)),
            (f._bottom = S0(f, o, !1, i.type)),
            ((f._visualValues || (f._visualValues = {}))[a] = m);
        }
      }
      function Mf(t, e) {
        const n = t.scales;
        return Object.keys(n)
          .filter((i) => n[i].axis === e)
          .shift();
      }
      function Kr(t, e) {
        const n = t.controller.index,
          i = t.vScale && t.vScale.axis;
        if (i) {
          e = e || t._parsed;
          for (const s of e) {
            const r = s._stacks;
            if (!r || void 0 === r[i] || void 0 === r[i][n]) return;
            delete r[i][n],
              void 0 !== r[i]._visualValues &&
                void 0 !== r[i]._visualValues[n] &&
                delete r[i]._visualValues[n];
          }
        }
      }
      const Sf = (t) => "reset" === t || "none" === t,
        T0 = (t, e) => (e ? t : Object.assign({}, t));
      class Jt {
        constructor(e, n) {
          (this.chart = e),
            (this._ctx = e.ctx),
            (this.index = n),
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
            (this.datasetElementType = new.target.datasetElementType),
            (this.dataElementType = new.target.dataElementType),
            this.initialize();
        }
        initialize() {
          const e = this._cachedMeta;
          this.configure(),
            this.linkScales(),
            (e._stacked = M0(e.vScale, e)),
            this.addElements(),
            this.options.fill &&
              !this.chart.isPluginEnabled("filler") &&
              console.warn(
                "Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options"
              );
        }
        updateIndex(e) {
          this.index !== e && Kr(this._cachedMeta), (this.index = e);
        }
        linkScales() {
          const e = this.chart,
            n = this._cachedMeta,
            i = this.getDataset(),
            s = (d, f, h, p) => ("x" === d ? f : "r" === d ? p : h),
            r = (n.xAxisID = H(i.xAxisID, Mf(e, "x"))),
            o = (n.yAxisID = H(i.yAxisID, Mf(e, "y"))),
            a = (n.rAxisID = H(i.rAxisID, Mf(e, "r"))),
            l = n.indexAxis,
            c = (n.iAxisID = s(l, r, o, a)),
            u = (n.vAxisID = s(l, o, r, a));
          (n.xScale = this.getScaleForId(r)),
            (n.yScale = this.getScaleForId(o)),
            (n.rScale = this.getScaleForId(a)),
            (n.iScale = this.getScaleForId(c)),
            (n.vScale = this.getScaleForId(u));
        }
        getDataset() {
          return this.chart.data.datasets[this.index];
        }
        getMeta() {
          return this.chart.getDatasetMeta(this.index);
        }
        getScaleForId(e) {
          return this.chart.scales[e];
        }
        _getOtherScale(e) {
          const n = this._cachedMeta;
          return e === n.iScale ? n.vScale : n.iScale;
        }
        reset() {
          this._update("reset");
        }
        _destroy() {
          const e = this._cachedMeta;
          this._data && Vv(this._data, this), e._stacked && Kr(e);
        }
        _dataCheck() {
          const e = this.getDataset(),
            n = e.data || (e.data = []),
            i = this._data;
          if (Y(n))
            this._data = (function MF(t) {
              const e = Object.keys(t),
                n = new Array(e.length);
              let i, s, r;
              for (i = 0, s = e.length; i < s; ++i)
                (r = e[i]), (n[i] = { x: r, y: t[r] });
              return n;
            })(n);
          else if (i !== n) {
            if (i) {
              Vv(i, this);
              const s = this._cachedMeta;
              Kr(s), (s._parsed = []);
            }
            n &&
              Object.isExtensible(n) &&
              (function yN(t, e) {
                t._chartjs
                  ? t._chartjs.listeners.push(e)
                  : (Object.defineProperty(t, "_chartjs", {
                      configurable: !0,
                      enumerable: !1,
                      value: { listeners: [e] },
                    }),
                    jv.forEach((n) => {
                      const i = "_onData" + ff(n),
                        s = t[n];
                      Object.defineProperty(t, n, {
                        configurable: !0,
                        enumerable: !1,
                        value(...r) {
                          const o = s.apply(this, r);
                          return (
                            t._chartjs.listeners.forEach((a) => {
                              "function" == typeof a[i] && a[i](...r);
                            }),
                            o
                          );
                        },
                      });
                    }));
              })(n, this),
              (this._syncList = []),
              (this._data = n);
          }
        }
        addElements() {
          const e = this._cachedMeta;
          this._dataCheck(),
            this.datasetElementType &&
              (e.dataset = new this.datasetElementType());
        }
        buildOrUpdateElements(e) {
          const n = this._cachedMeta,
            i = this.getDataset();
          let s = !1;
          this._dataCheck();
          const r = n._stacked;
          (n._stacked = M0(n.vScale, n)),
            n.stack !== i.stack && ((s = !0), Kr(n), (n.stack = i.stack)),
            this._resyncElements(e),
            (s || r !== n._stacked) && I0(this, n._parsed);
        }
        configure() {
          const e = this.chart.config,
            n = e.datasetScopeKeys(this._type),
            i = e.getOptionScopes(this.getDataset(), n, !0);
          (this.options = e.createResolver(i, this.getContext())),
            (this._parsing = this.options.parsing),
            (this._cachedDataOpts = {});
        }
        parse(e, n) {
          const { _cachedMeta: i, _data: s } = this,
            { iScale: r, _stacked: o } = i,
            a = r.axis;
          let u,
            d,
            f,
            l = (0 === e && n === s.length) || i._sorted,
            c = e > 0 && i._parsed[e - 1];
          if (!1 === this._parsing) (i._parsed = s), (i._sorted = !0), (f = s);
          else {
            f = ge(s[e])
              ? this.parseArrayData(i, s, e, n)
              : Y(s[e])
              ? this.parseObjectData(i, s, e, n)
              : this.parsePrimitiveData(i, s, e, n);
            const h = () => null === d[a] || (c && d[a] < c[a]);
            for (u = 0; u < n; ++u)
              (i._parsed[u + e] = d = f[u]), l && (h() && (l = !1), (c = d));
            i._sorted = l;
          }
          o && I0(this, f);
        }
        parsePrimitiveData(e, n, i, s) {
          const { iScale: r, vScale: o } = e,
            a = r.axis,
            l = o.axis,
            c = r.getLabels(),
            u = r === o,
            d = new Array(s);
          let f, h, p;
          for (f = 0, h = s; f < h; ++f)
            (p = f + i),
              (d[f] = { [a]: u || r.parse(c[p], p), [l]: o.parse(n[p], p) });
          return d;
        }
        parseArrayData(e, n, i, s) {
          const { xScale: r, yScale: o } = e,
            a = new Array(s);
          let l, c, u, d;
          for (l = 0, c = s; l < c; ++l)
            (u = l + i),
              (d = n[u]),
              (a[l] = { x: r.parse(d[0], u), y: o.parse(d[1], u) });
          return a;
        }
        parseObjectData(e, n, i, s) {
          const { xScale: r, yScale: o } = e,
            { xAxisKey: a = "x", yAxisKey: l = "y" } = this._parsing,
            c = new Array(s);
          let u, d, f, h;
          for (u = 0, d = s; u < d; ++u)
            (f = u + i),
              (h = n[f]),
              (c[u] = { x: r.parse(ei(h, a), f), y: o.parse(ei(h, l), f) });
          return c;
        }
        getParsed(e) {
          return this._cachedMeta._parsed[e];
        }
        getDataElement(e) {
          return this._cachedMeta.data[e];
        }
        applyStack(e, n, i) {
          const r = this._cachedMeta,
            o = n[e.axis];
          return E0(
            {
              keys: x0(this.chart, !0),
              values: n._stacks[e.axis]._visualValues,
            },
            o,
            r.index,
            { mode: i }
          );
        }
        updateRangeFromParsed(e, n, i, s) {
          const r = i[n.axis];
          let o = null === r ? NaN : r;
          const a = s && i._stacks[n.axis];
          s && a && ((s.values = a), (o = E0(s, r, this._cachedMeta.index))),
            (e.min = Math.min(e.min, o)),
            (e.max = Math.max(e.max, o));
        }
        getMinMax(e, n) {
          const i = this._cachedMeta,
            s = i._parsed,
            r = i._sorted && e === i.iScale,
            o = s.length,
            a = this._getOtherScale(e),
            l = ((t, e, n) =>
              t &&
              !e.hidden &&
              e._stacked && { keys: x0(this.chart, !0), values: null })(n, i),
            c = {
              min: Number.POSITIVE_INFINITY,
              max: Number.NEGATIVE_INFINITY,
            },
            { min: u, max: d } = (function IF(t) {
              const {
                min: e,
                max: n,
                minDefined: i,
                maxDefined: s,
              } = t.getUserBounds();
              return {
                min: i ? e : Number.NEGATIVE_INFINITY,
                max: s ? n : Number.POSITIVE_INFINITY,
              };
            })(a);
          let f, h;
          function p() {
            h = s[f];
            const g = h[a.axis];
            return !Ee(h[e.axis]) || u > g || d < g;
          }
          for (
            f = 0;
            f < o && (p() || (this.updateRangeFromParsed(c, e, h, l), !r));
            ++f
          );
          if (r)
            for (f = o - 1; f >= 0; --f)
              if (!p()) {
                this.updateRangeFromParsed(c, e, h, l);
                break;
              }
          return c;
        }
        getAllParsedValues(e) {
          const n = this._cachedMeta._parsed,
            i = [];
          let s, r, o;
          for (s = 0, r = n.length; s < r; ++s)
            (o = n[s][e.axis]), Ee(o) && i.push(o);
          return i;
        }
        getMaxOverflow() {
          return !1;
        }
        getLabelAndValue(e) {
          const n = this._cachedMeta,
            i = n.iScale,
            s = n.vScale,
            r = this.getParsed(e);
          return {
            label: i ? "" + i.getLabelForValue(r[i.axis]) : "",
            value: s ? "" + s.getLabelForValue(r[s.axis]) : "",
          };
        }
        _update(e) {
          const n = this._cachedMeta;
          this.update(e || "default"),
            (n._clip = (function EF(t) {
              let e, n, i, s;
              return (
                Y(t)
                  ? ((e = t.top), (n = t.right), (i = t.bottom), (s = t.left))
                  : (e = n = i = s = t),
                { top: e, right: n, bottom: i, left: s, disabled: !1 === t }
              );
            })(
              H(
                this.options.clip,
                (function xF(t, e, n) {
                  if (!1 === n) return !1;
                  const i = C0(t, n),
                    s = C0(e, n);
                  return {
                    top: s.end,
                    right: i.end,
                    bottom: s.start,
                    left: i.start,
                  };
                })(n.xScale, n.yScale, this.getMaxOverflow())
              )
            ));
        }
        update(e) {}
        draw() {
          const e = this._ctx,
            i = this._cachedMeta,
            s = i.data || [],
            r = this.chart.chartArea,
            o = [],
            a = this._drawStart || 0,
            l = this._drawCount || s.length - a,
            c = this.options.drawActiveElementsOnTop;
          let u;
          for (i.dataset && i.dataset.draw(e, r, a, l), u = a; u < a + l; ++u) {
            const d = s[u];
            d.hidden || (d.active && c ? o.push(d) : d.draw(e, r));
          }
          for (u = 0; u < o.length; ++u) o[u].draw(e, r);
        }
        getStyle(e, n) {
          const i = n ? "active" : "default";
          return void 0 === e && this._cachedMeta.dataset
            ? this.resolveDatasetElementOptions(i)
            : this.resolveDataElementOptions(e || 0, i);
        }
        getContext(e, n, i) {
          const s = this.getDataset();
          let r;
          if (e >= 0 && e < this._cachedMeta.data.length) {
            const o = this._cachedMeta.data[e];
            (r =
              o.$context ||
              (o.$context = (function PF(t, e, n) {
                return ii(t, {
                  active: !1,
                  dataIndex: e,
                  parsed: void 0,
                  raw: void 0,
                  element: n,
                  index: e,
                  mode: "default",
                  type: "data",
                });
              })(this.getContext(), e, o))),
              (r.parsed = this.getParsed(e)),
              (r.raw = s.data[e]),
              (r.index = r.dataIndex = e);
          } else
            (r =
              this.$context ||
              (this.$context = (function AF(t, e) {
                return ii(t, {
                  active: !1,
                  dataset: void 0,
                  datasetIndex: e,
                  index: e,
                  mode: "default",
                  type: "dataset",
                });
              })(this.chart.getContext(), this.index))),
              (r.dataset = s),
              (r.index = r.datasetIndex = this.index);
          return (r.active = !!n), (r.mode = i), r;
        }
        resolveDatasetElementOptions(e) {
          return this._resolveElementOptions(this.datasetElementType.id, e);
        }
        resolveDataElementOptions(e, n) {
          return this._resolveElementOptions(this.dataElementType.id, n, e);
        }
        _resolveElementOptions(e, n = "default", i) {
          const s = "active" === n,
            r = this._cachedDataOpts,
            o = e + "-" + n,
            a = r[o],
            l = this.enableOptionSharing && jt(i);
          if (a) return T0(a, l);
          const c = this.chart.config,
            u = c.datasetElementScopeKeys(this._type, e),
            d = s ? [`${e}Hover`, "hover", e, ""] : [e, ""],
            f = c.getOptionScopes(this.getDataset(), u),
            h = Object.keys(Se.elements[e]),
            g = c.resolveNamedOptions(f, h, () => this.getContext(i, s, n), d);
          return (
            g.$shared && ((g.$shared = l), (r[o] = Object.freeze(T0(g, l)))), g
          );
        }
        _resolveAnimations(e, n, i) {
          const s = this.chart,
            r = this._cachedDataOpts,
            o = `animation-${n}`,
            a = r[o];
          if (a) return a;
          let l;
          if (!1 !== s.options.animation) {
            const u = this.chart.config,
              d = u.datasetAnimationScopeKeys(this._type, n),
              f = u.getOptionScopes(this.getDataset(), d);
            l = u.createResolver(f, this.getContext(e, i, n));
          }
          const c = new w0(s, l && l.animations);
          return l && l._cacheable && (r[o] = Object.freeze(c)), c;
        }
        getSharedOptions(e) {
          if (e.$shared)
            return (
              this._sharedOptions ||
              (this._sharedOptions = Object.assign({}, e))
            );
        }
        includeOptions(e, n) {
          return !n || Sf(e) || this.chart._animationsDisabled;
        }
        _getSharedOptions(e, n) {
          const i = this.resolveDataElementOptions(e, n),
            s = this._sharedOptions,
            r = this.getSharedOptions(i),
            o = this.includeOptions(n, r) || r !== s;
          return (
            this.updateSharedOptions(r, n, i),
            { sharedOptions: r, includeOptions: o }
          );
        }
        updateElement(e, n, i, s) {
          Sf(s)
            ? Object.assign(e, i)
            : this._resolveAnimations(n, s).update(e, i);
        }
        updateSharedOptions(e, n, i) {
          e && !Sf(n) && this._resolveAnimations(void 0, n).update(e, i);
        }
        _setStyle(e, n, i, s) {
          e.active = s;
          const r = this.getStyle(n, s);
          this._resolveAnimations(n, i, s).update(e, {
            options: (!s && this.getSharedOptions(r)) || r,
          });
        }
        removeHoverStyle(e, n, i) {
          this._setStyle(e, i, "active", !1);
        }
        setHoverStyle(e, n, i) {
          this._setStyle(e, i, "active", !0);
        }
        _removeDatasetHoverStyle() {
          const e = this._cachedMeta.dataset;
          e && this._setStyle(e, void 0, "active", !1);
        }
        _setDatasetHoverStyle() {
          const e = this._cachedMeta.dataset;
          e && this._setStyle(e, void 0, "active", !0);
        }
        _resyncElements(e) {
          const n = this._data,
            i = this._cachedMeta.data;
          for (const [a, l, c] of this._syncList) this[a](l, c);
          this._syncList = [];
          const s = i.length,
            r = n.length,
            o = Math.min(r, s);
          o && this.parse(0, o),
            r > s
              ? this._insertElements(s, r - s, e)
              : r < s && this._removeElements(r, s - r);
        }
        _insertElements(e, n, i = !0) {
          const s = this._cachedMeta,
            r = s.data,
            o = e + n;
          let a;
          const l = (c) => {
            for (c.length += n, a = c.length - 1; a >= o; a--) c[a] = c[a - n];
          };
          for (l(r), a = e; a < o; ++a) r[a] = new this.dataElementType();
          this._parsing && l(s._parsed),
            this.parse(e, n),
            i && this.updateElements(r, e, n, "reset");
        }
        updateElements(e, n, i, s) {}
        _removeElements(e, n) {
          const i = this._cachedMeta;
          if (this._parsing) {
            const s = i._parsed.splice(e, n);
            i._stacked && Kr(i, s);
          }
          i.data.splice(e, n);
        }
        _sync(e) {
          if (this._parsing) this._syncList.push(e);
          else {
            const [n, i, s] = e;
            this[n](i, s);
          }
          this.chart._dataChanges.push([this.index, ...e]);
        }
        _onDataPush() {
          const e = arguments.length;
          this._sync(["_insertElements", this.getDataset().data.length - e, e]);
        }
        _onDataPop() {
          this._sync(["_removeElements", this._cachedMeta.data.length - 1, 1]);
        }
        _onDataShift() {
          this._sync(["_removeElements", 0, 1]);
        }
        _onDataSplice(e, n) {
          n && this._sync(["_removeElements", e, n]);
          const i = arguments.length - 2;
          i && this._sync(["_insertElements", e, i]);
        }
        _onDataUnshift() {
          this._sync(["_insertElements", 0, arguments.length]);
        }
      }
      function NF(t) {
        const e = t.iScale,
          n = (function kF(t, e) {
            if (!t._cache.$bar) {
              const n = t.getMatchingVisibleMetas(e);
              let i = [];
              for (let s = 0, r = n.length; s < r; s++)
                i = i.concat(n[s].controller.getAllParsedValues(t));
              t._cache.$bar = Hv(i.sort((s, r) => s - r));
            }
            return t._cache.$bar;
          })(e, t.type);
        let s,
          r,
          o,
          a,
          i = e._length;
        const l = () => {
          32767 === o ||
            -32768 === o ||
            (jt(a) && (i = Math.min(i, Math.abs(o - a) || i)), (a = o));
        };
        for (s = 0, r = n.length; s < r; ++s)
          (o = e.getPixelForValue(n[s])), l();
        for (a = void 0, s = 0, r = e.ticks.length; s < r; ++s)
          (o = e.getPixelForTick(s)), l();
        return i;
      }
      function A0(t, e, n, i) {
        return (
          ge(t)
            ? (function LF(t, e, n, i) {
                const s = n.parse(t[0], i),
                  r = n.parse(t[1], i),
                  o = Math.min(s, r),
                  a = Math.max(s, r);
                let l = o,
                  c = a;
                Math.abs(o) > Math.abs(a) && ((l = a), (c = o)),
                  (e[n.axis] = c),
                  (e._custom = {
                    barStart: l,
                    barEnd: c,
                    start: s,
                    end: r,
                    min: o,
                    max: a,
                  });
              })(t, e, n, i)
            : (e[n.axis] = n.parse(t, i)),
          e
        );
      }
      function P0(t, e, n, i) {
        const s = t.iScale,
          r = t.vScale,
          o = s.getLabels(),
          a = s === r,
          l = [];
        let c, u, d, f;
        for (c = n, u = n + i; c < u; ++c)
          (f = e[c]),
            (d = {}),
            (d[s.axis] = a || s.parse(o[c], c)),
            l.push(A0(f, d, r, c));
        return l;
      }
      function If(t) {
        return t && void 0 !== t.barStart && void 0 !== t.barEnd;
      }
      function VF(t, e, n, i) {
        let s = e.borderSkipped;
        const r = {};
        if (!s) return void (t.borderSkipped = r);
        if (!0 === s)
          return void (t.borderSkipped = {
            top: !0,
            right: !0,
            bottom: !0,
            left: !0,
          });
        const {
          start: o,
          end: a,
          reverse: l,
          top: c,
          bottom: u,
        } = (function jF(t) {
          let e, n, i, s, r;
          return (
            t.horizontal
              ? ((e = t.base > t.x), (n = "left"), (i = "right"))
              : ((e = t.base < t.y), (n = "bottom"), (i = "top")),
            e ? ((s = "end"), (r = "start")) : ((s = "start"), (r = "end")),
            { start: n, end: i, reverse: e, top: s, bottom: r }
          );
        })(t);
        "middle" === s &&
          n &&
          ((t.enableBorderRadius = !0),
          (n._top || 0) === i
            ? (s = c)
            : (n._bottom || 0) === i
            ? (s = u)
            : ((r[O0(u, o, a, l)] = !0), (s = c))),
          (r[O0(s, o, a, l)] = !0),
          (t.borderSkipped = r);
      }
      function O0(t, e, n, i) {
        return (
          i
            ? ((t = (function HF(t, e, n) {
                return t === e ? n : t === n ? e : t;
              })(t, e, n)),
              (t = k0(t, n, e)))
            : (t = k0(t, e, n)),
          t
        );
      }
      function k0(t, e, n) {
        return "start" === t ? e : "end" === t ? n : t;
      }
      function $F(t, { inflateAmount: e }, n) {
        t.inflateAmount = "auto" === e ? (1 === n ? 0.33 : 0) : e;
      }
      I(Jt, "defaults", {}),
        I(Jt, "datasetElementType", null),
        I(Jt, "dataElementType", null);
      class fl extends Jt {
        parsePrimitiveData(e, n, i, s) {
          return P0(e, n, i, s);
        }
        parseArrayData(e, n, i, s) {
          return P0(e, n, i, s);
        }
        parseObjectData(e, n, i, s) {
          const { iScale: r, vScale: o } = e,
            { xAxisKey: a = "x", yAxisKey: l = "y" } = this._parsing,
            c = "x" === r.axis ? a : l,
            u = "x" === o.axis ? a : l,
            d = [];
          let f, h, p, g;
          for (f = i, h = i + s; f < h; ++f)
            (g = n[f]),
              (p = {}),
              (p[r.axis] = r.parse(ei(g, c), f)),
              d.push(A0(ei(g, u), p, o, f));
          return d;
        }
        updateRangeFromParsed(e, n, i, s) {
          super.updateRangeFromParsed(e, n, i, s);
          const r = i._custom;
          r &&
            n === this._cachedMeta.vScale &&
            ((e.min = Math.min(e.min, r.min)),
            (e.max = Math.max(e.max, r.max)));
        }
        getMaxOverflow() {
          return 0;
        }
        getLabelAndValue(e) {
          const n = this._cachedMeta,
            { iScale: i, vScale: s } = n,
            r = this.getParsed(e),
            o = r._custom,
            a = If(o)
              ? "[" + o.start + ", " + o.end + "]"
              : "" + s.getLabelForValue(r[s.axis]);
          return { label: "" + i.getLabelForValue(r[i.axis]), value: a };
        }
        initialize() {
          (this.enableOptionSharing = !0),
            super.initialize(),
            (this._cachedMeta.stack = this.getDataset().stack);
        }
        update(e) {
          const n = this._cachedMeta;
          this.updateElements(n.data, 0, n.data.length, e);
        }
        updateElements(e, n, i, s) {
          const r = "reset" === s,
            {
              index: o,
              _cachedMeta: { vScale: a },
            } = this,
            l = a.getBasePixel(),
            c = a.isHorizontal(),
            u = this._getRuler(),
            { sharedOptions: d, includeOptions: f } = this._getSharedOptions(
              n,
              s
            );
          for (let h = n; h < n + i; h++) {
            const p = this.getParsed(h),
              g =
                r || Q(p[a.axis])
                  ? { base: l, head: l }
                  : this._calculateBarValuePixels(h),
              m = this._calculateBarIndexPixels(h, u),
              y = (p._stacks || {})[a.axis],
              b = {
                horizontal: c,
                base: g.base,
                enableBorderRadius:
                  !y || If(p._custom) || o === y._top || o === y._bottom,
                x: c ? g.head : m.center,
                y: c ? m.center : g.head,
                height: c ? m.size : Math.abs(g.size),
                width: c ? Math.abs(g.size) : m.size,
              };
            f &&
              (b.options =
                d ||
                this.resolveDataElementOptions(h, e[h].active ? "active" : s));
            const _ = b.options || e[h].options;
            VF(b, _, y, o),
              $F(b, _, u.ratio),
              this.updateElement(e[h], h, b, s);
          }
        }
        _getStacks(e, n) {
          const { iScale: i } = this._cachedMeta,
            s = i
              .getMatchingVisibleMetas(this._type)
              .filter((l) => l.controller.options.grouped),
            r = i.options.stacked,
            o = [],
            a = (l) => {
              const c = l.controller.getParsed(n),
                u = c && c[l.vScale.axis];
              if (Q(u) || isNaN(u)) return !0;
            };
          for (const l of s)
            if (
              (void 0 === n || !a(l)) &&
              ((!1 === r ||
                -1 === o.indexOf(l.stack) ||
                (void 0 === r && void 0 === l.stack)) &&
                o.push(l.stack),
              l.index === e)
            )
              break;
          return o.length || o.push(void 0), o;
        }
        _getStackCount(e) {
          return this._getStacks(void 0, e).length;
        }
        _getStackIndex(e, n, i) {
          const s = this._getStacks(e, i),
            r = void 0 !== n ? s.indexOf(n) : -1;
          return -1 === r ? s.length - 1 : r;
        }
        _getRuler() {
          const e = this.options,
            n = this._cachedMeta,
            i = n.iScale,
            s = [];
          let r, o;
          for (r = 0, o = n.data.length; r < o; ++r)
            s.push(i.getPixelForValue(this.getParsed(r)[i.axis], r));
          const a = e.barThickness;
          return {
            min: a || NF(n),
            pixels: s,
            start: i._startPixel,
            end: i._endPixel,
            stackCount: this._getStackCount(),
            scale: i,
            grouped: e.grouped,
            ratio: a ? 1 : e.categoryPercentage * e.barPercentage,
          };
        }
        _calculateBarValuePixels(e) {
          const {
              _cachedMeta: { vScale: n, _stacked: i, index: s },
              options: { base: r, minBarLength: o },
            } = this,
            a = r || 0,
            l = this.getParsed(e),
            c = l._custom,
            u = If(c);
          let p,
            g,
            d = l[n.axis],
            f = 0,
            h = i ? this.applyStack(n, l, i) : d;
          h !== d && ((f = h - d), (h = d)),
            u &&
              ((d = c.barStart),
              (h = c.barEnd - c.barStart),
              0 !== d && pn(d) !== pn(c.barEnd) && (f = 0),
              (f += d));
          const m = Q(r) || u ? f : r;
          let y = n.getPixelForValue(m);
          if (
            ((p = this.chart.getDataVisibility(e)
              ? n.getPixelForValue(f + h)
              : y),
            (g = p - y),
            Math.abs(g) < o)
          ) {
            (g =
              (function BF(t, e, n) {
                return 0 !== t
                  ? pn(t)
                  : (e.isHorizontal() ? 1 : -1) * (e.min >= n ? 1 : -1);
              })(g, n, a) * o),
              d === a && (y -= g / 2);
            const b = n.getPixelForDecimal(0),
              _ = n.getPixelForDecimal(1),
              v = Math.min(b, _),
              D = Math.max(b, _);
            (y = Math.max(Math.min(y, D), v)),
              (p = y + g),
              i &&
                !u &&
                (l._stacks[n.axis]._visualValues[s] =
                  n.getValueForPixel(p) - n.getValueForPixel(y));
          }
          if (y === n.getPixelForValue(a)) {
            const b = (pn(g) * n.getLineWidthForValue(a)) / 2;
            (y += b), (g -= b);
          }
          return { size: g, base: y, head: p, center: p + g / 2 };
        }
        _calculateBarIndexPixels(e, n) {
          const i = n.scale,
            s = this.options,
            r = s.skipNull,
            o = H(s.maxBarThickness, 1 / 0);
          let a, l;
          if (n.grouped) {
            const c = r ? this._getStackCount(e) : n.stackCount,
              u =
                "flex" === s.barThickness
                  ? (function RF(t, e, n, i) {
                      const s = e.pixels,
                        r = s[t];
                      let o = t > 0 ? s[t - 1] : null,
                        a = t < s.length - 1 ? s[t + 1] : null;
                      const l = n.categoryPercentage;
                      null === o &&
                        (o = r - (null === a ? e.end - e.start : a - r)),
                        null === a && (a = r + r - o);
                      const c = r - ((r - Math.min(o, a)) / 2) * l;
                      return {
                        chunk: ((Math.abs(a - o) / 2) * l) / i,
                        ratio: n.barPercentage,
                        start: c,
                      };
                    })(e, n, s, c)
                  : (function FF(t, e, n, i) {
                      const s = n.barThickness;
                      let r, o;
                      return (
                        Q(s)
                          ? ((r = e.min * n.categoryPercentage),
                            (o = n.barPercentage))
                          : ((r = s * i), (o = 1)),
                        { chunk: r / i, ratio: o, start: e.pixels[t] - r / 2 }
                      );
                    })(e, n, s, c),
              d = this._getStackIndex(
                this.index,
                this._cachedMeta.stack,
                r ? e : void 0
              );
            (a = u.start + u.chunk * d + u.chunk / 2),
              (l = Math.min(o, u.chunk * u.ratio));
          } else
            (a = i.getPixelForValue(this.getParsed(e)[i.axis], e)),
              (l = Math.min(o, n.min * n.ratio));
          return { base: a - l / 2, head: a + l / 2, center: a, size: l };
        }
        draw() {
          const e = this._cachedMeta,
            n = e.vScale,
            i = e.data,
            s = i.length;
          let r = 0;
          for (; r < s; ++r)
            null !== this.getParsed(r)[n.axis] && i[r].draw(this._ctx);
        }
      }
      I(fl, "id", "bar"),
        I(fl, "defaults", {
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
        }),
        I(fl, "overrides", {
          scales: {
            _index_: { type: "category", offset: !0, grid: { offset: !0 } },
            _value_: { type: "linear", beginAtZero: !0 },
          },
        });
      class hl extends Jt {
        initialize() {
          (this.enableOptionSharing = !0), super.initialize();
        }
        parsePrimitiveData(e, n, i, s) {
          const r = super.parsePrimitiveData(e, n, i, s);
          for (let o = 0; o < r.length; o++)
            r[o]._custom = this.resolveDataElementOptions(o + i).radius;
          return r;
        }
        parseArrayData(e, n, i, s) {
          const r = super.parseArrayData(e, n, i, s);
          for (let o = 0; o < r.length; o++)
            r[o]._custom = H(
              n[i + o][2],
              this.resolveDataElementOptions(o + i).radius
            );
          return r;
        }
        parseObjectData(e, n, i, s) {
          const r = super.parseObjectData(e, n, i, s);
          for (let o = 0; o < r.length; o++) {
            const a = n[i + o];
            r[o]._custom = H(
              a && a.r && +a.r,
              this.resolveDataElementOptions(o + i).radius
            );
          }
          return r;
        }
        getMaxOverflow() {
          const e = this._cachedMeta.data;
          let n = 0;
          for (let i = e.length - 1; i >= 0; --i)
            n = Math.max(n, e[i].size(this.resolveDataElementOptions(i)) / 2);
          return n > 0 && n;
        }
        getLabelAndValue(e) {
          const n = this._cachedMeta,
            i = this.chart.data.labels || [],
            { xScale: s, yScale: r } = n,
            o = this.getParsed(e),
            a = s.getLabelForValue(o.x),
            l = r.getLabelForValue(o.y),
            c = o._custom;
          return {
            label: i[e] || "",
            value: "(" + a + ", " + l + (c ? ", " + c : "") + ")",
          };
        }
        update(e) {
          const n = this._cachedMeta.data;
          this.updateElements(n, 0, n.length, e);
        }
        updateElements(e, n, i, s) {
          const r = "reset" === s,
            { iScale: o, vScale: a } = this._cachedMeta,
            { sharedOptions: l, includeOptions: c } = this._getSharedOptions(
              n,
              s
            ),
            u = o.axis,
            d = a.axis;
          for (let f = n; f < n + i; f++) {
            const h = e[f],
              p = !r && this.getParsed(f),
              g = {},
              m = (g[u] = r
                ? o.getPixelForDecimal(0.5)
                : o.getPixelForValue(p[u])),
              y = (g[d] = r ? a.getBasePixel() : a.getPixelForValue(p[d]));
            (g.skip = isNaN(m) || isNaN(y)),
              c &&
                ((g.options =
                  l ||
                  this.resolveDataElementOptions(f, h.active ? "active" : s)),
                r && (g.options.radius = 0)),
              this.updateElement(h, f, g, s);
          }
        }
        resolveDataElementOptions(e, n) {
          const i = this.getParsed(e);
          let s = super.resolveDataElementOptions(e, n);
          s.$shared && (s = Object.assign({}, s, { $shared: !1 }));
          const r = s.radius;
          return (
            "active" !== n && (s.radius = 0),
            (s.radius += H(i && i._custom, r)),
            s
          );
        }
      }
      I(hl, "id", "bubble"),
        I(hl, "defaults", {
          datasetElementType: !1,
          dataElementType: "point",
          animations: {
            numbers: {
              type: "number",
              properties: ["x", "y", "borderWidth", "radius"],
            },
          },
        }),
        I(hl, "overrides", {
          scales: { x: { type: "linear" }, y: { type: "linear" } },
        });
      class Oi extends Jt {
        constructor(e, n) {
          super(e, n),
            (this.enableOptionSharing = !0),
            (this.innerRadius = void 0),
            (this.outerRadius = void 0),
            (this.offsetX = void 0),
            (this.offsetY = void 0);
        }
        linkScales() {}
        parse(e, n) {
          const i = this.getDataset().data,
            s = this._cachedMeta;
          if (!1 === this._parsing) s._parsed = i;
          else {
            let o,
              a,
              r = (l) => +i[l];
            if (Y(i[e])) {
              const { key: l = "value" } = this._parsing;
              r = (c) => +ei(i[c], l);
            }
            for (o = e, a = e + n; o < a; ++o) s._parsed[o] = r(o);
          }
        }
        _getRotation() {
          return Qt(this.options.rotation - 90);
        }
        _getCircumference() {
          return Qt(this.options.circumference);
        }
        _getRotationExtents() {
          let e = me,
            n = -me;
          for (let i = 0; i < this.chart.data.datasets.length; ++i)
            if (
              this.chart.isDatasetVisible(i) &&
              this.chart.getDatasetMeta(i).type === this._type
            ) {
              const s = this.chart.getDatasetMeta(i).controller,
                r = s._getRotation(),
                o = s._getCircumference();
              (e = Math.min(e, r)), (n = Math.max(n, r + o));
            }
          return { rotation: e, circumference: n - e };
        }
        update(e) {
          const n = this.chart,
            { chartArea: i } = n,
            s = this._cachedMeta,
            r = s.data,
            o =
              this.getMaxBorderWidth() +
              this.getMaxOffset(r) +
              this.options.spacing,
            a = Math.max((Math.min(i.width, i.height) - o) / 2, 0),
            l = Math.min(
              ((t, e) =>
                "string" == typeof t && t.endsWith("%")
                  ? parseFloat(t) / 100
                  : +t / e)(this.options.cutout, a),
              1
            ),
            c = this._getRingWeight(this.index),
            { circumference: u, rotation: d } = this._getRotationExtents(),
            {
              ratioX: f,
              ratioY: h,
              offsetX: p,
              offsetY: g,
            } = (function zF(t, e, n) {
              let i = 1,
                s = 1,
                r = 0,
                o = 0;
              if (e < me) {
                const a = t,
                  l = a + e,
                  c = Math.cos(a),
                  u = Math.sin(a),
                  d = Math.cos(l),
                  f = Math.sin(l),
                  h = (_, v, D) =>
                    $r(_, a, l, !0) ? 1 : Math.max(v, v * n, D, D * n),
                  p = (_, v, D) =>
                    $r(_, a, l, !0) ? -1 : Math.min(v, v * n, D, D * n),
                  g = h(0, c, d),
                  m = h(Me, u, f),
                  y = p(be, c, d),
                  b = p(be + Me, u, f);
                (i = (g - y) / 2),
                  (s = (m - b) / 2),
                  (r = -(g + y) / 2),
                  (o = -(m + b) / 2);
              }
              return { ratioX: i, ratioY: s, offsetX: r, offsetY: o };
            })(d, u, l),
            b = Math.max(
              Math.min((i.width - o) / f, (i.height - o) / h) / 2,
              0
            ),
            _ = Av(this.options.radius, b),
            D = (_ - Math.max(_ * l, 0)) / this._getVisibleDatasetWeightTotal();
          (this.offsetX = p * _),
            (this.offsetY = g * _),
            (s.total = this.calculateTotal()),
            (this.outerRadius = _ - D * this._getRingWeightOffset(this.index)),
            (this.innerRadius = Math.max(this.outerRadius - D * c, 0)),
            this.updateElements(r, 0, r.length, e);
        }
        _circumference(e, n) {
          const i = this.options,
            s = this._cachedMeta,
            r = this._getCircumference();
          return (n && i.animation.animateRotate) ||
            !this.chart.getDataVisibility(e) ||
            null === s._parsed[e] ||
            s.data[e].hidden
            ? 0
            : this.calculateCircumference((s._parsed[e] * r) / me);
        }
        updateElements(e, n, i, s) {
          const r = "reset" === s,
            o = this.chart,
            a = o.chartArea,
            u = (a.left + a.right) / 2,
            d = (a.top + a.bottom) / 2,
            f = r && o.options.animation.animateScale,
            h = f ? 0 : this.innerRadius,
            p = f ? 0 : this.outerRadius,
            { sharedOptions: g, includeOptions: m } = this._getSharedOptions(
              n,
              s
            );
          let b,
            y = this._getRotation();
          for (b = 0; b < n; ++b) y += this._circumference(b, r);
          for (b = n; b < n + i; ++b) {
            const _ = this._circumference(b, r),
              v = e[b],
              D = {
                x: u + this.offsetX,
                y: d + this.offsetY,
                startAngle: y,
                endAngle: y + _,
                circumference: _,
                outerRadius: p,
                innerRadius: h,
              };
            m &&
              (D.options =
                g ||
                this.resolveDataElementOptions(b, v.active ? "active" : s)),
              (y += _),
              this.updateElement(v, b, D, s);
          }
        }
        calculateTotal() {
          const e = this._cachedMeta,
            n = e.data;
          let s,
            i = 0;
          for (s = 0; s < n.length; s++) {
            const r = e._parsed[s];
            null !== r &&
              !isNaN(r) &&
              this.chart.getDataVisibility(s) &&
              !n[s].hidden &&
              (i += Math.abs(r));
          }
          return i;
        }
        calculateCircumference(e) {
          const n = this._cachedMeta.total;
          return n > 0 && !isNaN(e) ? me * (Math.abs(e) / n) : 0;
        }
        getLabelAndValue(e) {
          const i = this.chart,
            s = i.data.labels || [],
            r = Ur(this._cachedMeta._parsed[e], i.options.locale);
          return { label: s[e] || "", value: r };
        }
        getMaxBorderWidth(e) {
          let n = 0;
          const i = this.chart;
          let s, r, o, a, l;
          if (!e)
            for (s = 0, r = i.data.datasets.length; s < r; ++s)
              if (i.isDatasetVisible(s)) {
                (o = i.getDatasetMeta(s)), (e = o.data), (a = o.controller);
                break;
              }
          if (!e) return 0;
          for (s = 0, r = e.length; s < r; ++s)
            (l = a.resolveDataElementOptions(s)),
              "inner" !== l.borderAlign &&
                (n = Math.max(n, l.borderWidth || 0, l.hoverBorderWidth || 0));
          return n;
        }
        getMaxOffset(e) {
          let n = 0;
          for (let i = 0, s = e.length; i < s; ++i) {
            const r = this.resolveDataElementOptions(i);
            n = Math.max(n, r.offset || 0, r.hoverOffset || 0);
          }
          return n;
        }
        _getRingWeightOffset(e) {
          let n = 0;
          for (let i = 0; i < e; ++i)
            this.chart.isDatasetVisible(i) && (n += this._getRingWeight(i));
          return n;
        }
        _getRingWeight(e) {
          return Math.max(H(this.chart.data.datasets[e].weight, 1), 0);
        }
        _getVisibleDatasetWeightTotal() {
          return (
            this._getRingWeightOffset(this.chart.data.datasets.length) || 1
          );
        }
      }
      I(Oi, "id", "doughnut"),
        I(Oi, "defaults", {
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
        }),
        I(Oi, "descriptors", {
          _scriptable: (e) => "spacing" !== e,
          _indexable: (e) => "spacing" !== e,
        }),
        I(Oi, "overrides", {
          aspectRatio: 1,
          plugins: {
            legend: {
              labels: {
                generateLabels(e) {
                  const n = e.data;
                  if (n.labels.length && n.datasets.length) {
                    const {
                      labels: { pointStyle: i, color: s },
                    } = e.legend.options;
                    return n.labels.map((r, o) => {
                      const l = e.getDatasetMeta(0).controller.getStyle(o);
                      return {
                        text: r,
                        fillStyle: l.backgroundColor,
                        strokeStyle: l.borderColor,
                        fontColor: s,
                        lineWidth: l.borderWidth,
                        pointStyle: i,
                        hidden: !e.getDataVisibility(o),
                        index: o,
                      };
                    });
                  }
                  return [];
                },
              },
              onClick(e, n, i) {
                i.chart.toggleDataVisibility(n.index), i.chart.update();
              },
            },
          },
        });
      class pl extends Jt {
        initialize() {
          (this.enableOptionSharing = !0),
            (this.supportsDecimation = !0),
            super.initialize();
        }
        update(e) {
          const n = this._cachedMeta,
            { dataset: i, data: s = [], _dataset: r } = n,
            o = this.chart._animationsDisabled;
          let { start: a, count: l } = Uv(n, s, o);
          (this._drawStart = a),
            (this._drawCount = l),
            Wv(n) && ((a = 0), (l = s.length)),
            (i._chart = this.chart),
            (i._datasetIndex = this.index),
            (i._decimated = !!r._decimated),
            (i.points = s);
          const c = this.resolveDatasetElementOptions(e);
          this.options.showLine || (c.borderWidth = 0),
            (c.segment = this.options.segment),
            this.updateElement(i, void 0, { animated: !o, options: c }, e),
            this.updateElements(s, a, l, e);
        }
        updateElements(e, n, i, s) {
          const r = "reset" === s,
            {
              iScale: o,
              vScale: a,
              _stacked: l,
              _dataset: c,
            } = this._cachedMeta,
            { sharedOptions: u, includeOptions: d } = this._getSharedOptions(
              n,
              s
            ),
            f = o.axis,
            h = a.axis,
            { spanGaps: p, segment: g } = this.options,
            m = As(p) ? p : Number.POSITIVE_INFINITY,
            y = this.chart._animationsDisabled || r || "none" === s,
            b = n + i,
            _ = e.length;
          let v = n > 0 && this.getParsed(n - 1);
          for (let D = 0; D < _; ++D) {
            const C = e[D],
              x = y ? C : {};
            if (D < n || D >= b) {
              x.skip = !0;
              continue;
            }
            const M = this.getParsed(D),
              T = Q(M[h]),
              B = (x[f] = o.getPixelForValue(M[f], D)),
              j = (x[h] =
                r || T
                  ? a.getBasePixel()
                  : a.getPixelForValue(l ? this.applyStack(a, M, l) : M[h], D));
            (x.skip = isNaN(B) || isNaN(j) || T),
              (x.stop = D > 0 && Math.abs(M[f] - v[f]) > m),
              g && ((x.parsed = M), (x.raw = c.data[D])),
              d &&
                (x.options =
                  u ||
                  this.resolveDataElementOptions(D, C.active ? "active" : s)),
              y || this.updateElement(C, D, x, s),
              (v = M);
          }
        }
        getMaxOverflow() {
          const e = this._cachedMeta,
            n = e.dataset,
            i = (n.options && n.options.borderWidth) || 0,
            s = e.data || [];
          if (!s.length) return i;
          const r = s[0].size(this.resolveDataElementOptions(0)),
            o = s[s.length - 1].size(
              this.resolveDataElementOptions(s.length - 1)
            );
          return Math.max(i, r, o) / 2;
        }
        draw() {
          const e = this._cachedMeta;
          e.dataset.updateControlPoints(this.chart.chartArea, e.iScale.axis),
            super.draw();
        }
      }
      I(pl, "id", "line"),
        I(pl, "defaults", {
          datasetElementType: "line",
          dataElementType: "point",
          showLine: !0,
          spanGaps: !1,
        }),
        I(pl, "overrides", {
          scales: {
            _index_: { type: "category" },
            _value_: { type: "linear" },
          },
        });
      class Xr extends Jt {
        constructor(e, n) {
          super(e, n), (this.innerRadius = void 0), (this.outerRadius = void 0);
        }
        getLabelAndValue(e) {
          const i = this.chart,
            s = i.data.labels || [],
            r = Ur(this._cachedMeta._parsed[e].r, i.options.locale);
          return { label: s[e] || "", value: r };
        }
        parseObjectData(e, n, i, s) {
          return l0.bind(this)(e, n, i, s);
        }
        update(e) {
          const n = this._cachedMeta.data;
          this._updateRadius(), this.updateElements(n, 0, n.length, e);
        }
        getMinMax() {
          const n = {
            min: Number.POSITIVE_INFINITY,
            max: Number.NEGATIVE_INFINITY,
          };
          return (
            this._cachedMeta.data.forEach((i, s) => {
              const r = this.getParsed(s).r;
              !isNaN(r) &&
                this.chart.getDataVisibility(s) &&
                (r < n.min && (n.min = r), r > n.max && (n.max = r));
            }),
            n
          );
        }
        _updateRadius() {
          const e = this.chart,
            n = e.chartArea,
            i = e.options,
            s = Math.min(n.right - n.left, n.bottom - n.top),
            r = Math.max(s / 2, 0),
            a =
              (r -
                Math.max(
                  i.cutoutPercentage ? (r / 100) * i.cutoutPercentage : 1,
                  0
                )) /
              e.getVisibleDatasetCount();
          (this.outerRadius = r - a * this.index),
            (this.innerRadius = this.outerRadius - a);
        }
        updateElements(e, n, i, s) {
          const r = "reset" === s,
            o = this.chart,
            l = o.options.animation,
            c = this._cachedMeta.rScale,
            u = c.xCenter,
            d = c.yCenter,
            f = c.getIndexAngle(0) - 0.5 * be;
          let p,
            h = f;
          const g = 360 / this.countVisibleElements();
          for (p = 0; p < n; ++p) h += this._computeAngle(p, s, g);
          for (p = n; p < n + i; p++) {
            const m = e[p];
            let y = h,
              b = h + this._computeAngle(p, s, g),
              _ = o.getDataVisibility(p)
                ? c.getDistanceFromCenterForValue(this.getParsed(p).r)
                : 0;
            (h = b),
              r && (l.animateScale && (_ = 0), l.animateRotate && (y = b = f));
            const v = {
              x: u,
              y: d,
              innerRadius: 0,
              outerRadius: _,
              startAngle: y,
              endAngle: b,
              options: this.resolveDataElementOptions(
                p,
                m.active ? "active" : s
              ),
            };
            this.updateElement(m, p, v, s);
          }
        }
        countVisibleElements() {
          let n = 0;
          return (
            this._cachedMeta.data.forEach((i, s) => {
              !isNaN(this.getParsed(s).r) &&
                this.chart.getDataVisibility(s) &&
                n++;
            }),
            n
          );
        }
        _computeAngle(e, n, i) {
          return this.chart.getDataVisibility(e)
            ? Qt(this.resolveDataElementOptions(e, n).angle || i)
            : 0;
        }
      }
      I(Xr, "id", "polarArea"),
        I(Xr, "defaults", {
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
        }),
        I(Xr, "overrides", {
          aspectRatio: 1,
          plugins: {
            legend: {
              labels: {
                generateLabels(e) {
                  const n = e.data;
                  if (n.labels.length && n.datasets.length) {
                    const {
                      labels: { pointStyle: i, color: s },
                    } = e.legend.options;
                    return n.labels.map((r, o) => {
                      const l = e.getDatasetMeta(0).controller.getStyle(o);
                      return {
                        text: r,
                        fillStyle: l.backgroundColor,
                        strokeStyle: l.borderColor,
                        fontColor: s,
                        lineWidth: l.borderWidth,
                        pointStyle: i,
                        hidden: !e.getDataVisibility(o),
                        index: o,
                      };
                    });
                  }
                  return [];
                },
              },
              onClick(e, n, i) {
                i.chart.toggleDataVisibility(n.index), i.chart.update();
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
        });
      class Tf extends Oi {}
      I(Tf, "id", "pie"),
        I(Tf, "defaults", {
          cutout: 0,
          rotation: 0,
          circumference: 360,
          radius: "100%",
        });
      class gl extends Jt {
        getLabelAndValue(e) {
          const n = this._cachedMeta.vScale,
            i = this.getParsed(e);
          return {
            label: n.getLabels()[e],
            value: "" + n.getLabelForValue(i[n.axis]),
          };
        }
        parseObjectData(e, n, i, s) {
          return l0.bind(this)(e, n, i, s);
        }
        update(e) {
          const n = this._cachedMeta,
            i = n.dataset,
            s = n.data || [],
            r = n.iScale.getLabels();
          if (((i.points = s), "resize" !== e)) {
            const o = this.resolveDatasetElementOptions(e);
            this.options.showLine || (o.borderWidth = 0),
              this.updateElement(
                i,
                void 0,
                { _loop: !0, _fullLoop: r.length === s.length, options: o },
                e
              );
          }
          this.updateElements(s, 0, s.length, e);
        }
        updateElements(e, n, i, s) {
          const r = this._cachedMeta.rScale,
            o = "reset" === s;
          for (let a = n; a < n + i; a++) {
            const l = e[a],
              c = this.resolveDataElementOptions(a, l.active ? "active" : s),
              u = r.getPointPositionForValue(a, this.getParsed(a).r),
              d = o ? r.xCenter : u.x,
              f = o ? r.yCenter : u.y,
              h = {
                x: d,
                y: f,
                angle: u.angle,
                skip: isNaN(d) || isNaN(f),
                options: c,
              };
            this.updateElement(l, a, h, s);
          }
        }
      }
      I(gl, "id", "radar"),
        I(gl, "defaults", {
          datasetElementType: "line",
          dataElementType: "point",
          indexAxis: "r",
          showLine: !0,
          elements: { line: { fill: "start" } },
        }),
        I(gl, "overrides", {
          aspectRatio: 1,
          scales: { r: { type: "radialLinear" } },
        });
      class ml extends Jt {
        getLabelAndValue(e) {
          const n = this._cachedMeta,
            i = this.chart.data.labels || [],
            { xScale: s, yScale: r } = n,
            o = this.getParsed(e),
            a = s.getLabelForValue(o.x),
            l = r.getLabelForValue(o.y);
          return { label: i[e] || "", value: "(" + a + ", " + l + ")" };
        }
        update(e) {
          const n = this._cachedMeta,
            { data: i = [] } = n,
            s = this.chart._animationsDisabled;
          let { start: r, count: o } = Uv(n, i, s);
          if (
            ((this._drawStart = r),
            (this._drawCount = o),
            Wv(n) && ((r = 0), (o = i.length)),
            this.options.showLine)
          ) {
            const { dataset: a, _dataset: l } = n;
            (a._chart = this.chart),
              (a._datasetIndex = this.index),
              (a._decimated = !!l._decimated),
              (a.points = i);
            const c = this.resolveDatasetElementOptions(e);
            (c.segment = this.options.segment),
              this.updateElement(a, void 0, { animated: !s, options: c }, e);
          }
          this.updateElements(i, r, o, e);
        }
        addElements() {
          const { showLine: e } = this.options;
          !this.datasetElementType &&
            e &&
            (this.datasetElementType = this.chart.registry.getElement("line")),
            super.addElements();
        }
        updateElements(e, n, i, s) {
          const r = "reset" === s,
            {
              iScale: o,
              vScale: a,
              _stacked: l,
              _dataset: c,
            } = this._cachedMeta,
            u = this.resolveDataElementOptions(n, s),
            d = this.getSharedOptions(u),
            f = this.includeOptions(s, d),
            h = o.axis,
            p = a.axis,
            { spanGaps: g, segment: m } = this.options,
            y = As(g) ? g : Number.POSITIVE_INFINITY,
            b = this.chart._animationsDisabled || r || "none" === s;
          let _ = n > 0 && this.getParsed(n - 1);
          for (let v = n; v < n + i; ++v) {
            const D = e[v],
              C = this.getParsed(v),
              x = b ? D : {},
              M = Q(C[p]),
              T = (x[h] = o.getPixelForValue(C[h], v)),
              B = (x[p] =
                r || M
                  ? a.getBasePixel()
                  : a.getPixelForValue(l ? this.applyStack(a, C, l) : C[p], v));
            (x.skip = isNaN(T) || isNaN(B) || M),
              (x.stop = v > 0 && Math.abs(C[h] - _[h]) > y),
              m && ((x.parsed = C), (x.raw = c.data[v])),
              f &&
                (x.options =
                  d ||
                  this.resolveDataElementOptions(v, D.active ? "active" : s)),
              b || this.updateElement(D, v, x, s),
              (_ = C);
          }
          this.updateSharedOptions(d, s, u);
        }
        getMaxOverflow() {
          const e = this._cachedMeta,
            n = e.data || [];
          if (!this.options.showLine) {
            let a = 0;
            for (let l = n.length - 1; l >= 0; --l)
              a = Math.max(a, n[l].size(this.resolveDataElementOptions(l)) / 2);
            return a > 0 && a;
          }
          const i = e.dataset,
            s = (i.options && i.options.borderWidth) || 0;
          if (!n.length) return s;
          const r = n[0].size(this.resolveDataElementOptions(0)),
            o = n[n.length - 1].size(
              this.resolveDataElementOptions(n.length - 1)
            );
          return Math.max(s, r, o) / 2;
        }
      }
      I(ml, "id", "scatter"),
        I(ml, "defaults", {
          datasetElementType: !1,
          dataElementType: "point",
          showLine: !1,
          fill: !1,
        }),
        I(ml, "overrides", {
          interaction: { mode: "point" },
          scales: { x: { type: "linear" }, y: { type: "linear" } },
        });
      var UF = Object.freeze({
        __proto__: null,
        BarController: fl,
        BubbleController: hl,
        DoughnutController: Oi,
        LineController: pl,
        PolarAreaController: Xr,
        PieController: Tf,
        RadarController: gl,
        ScatterController: ml,
      });
      function ki() {
        throw new Error(
          "This method is not implemented: Check that a complete date adapter is provided."
        );
      }
      class Af {
        static override(e) {
          Object.assign(Af.prototype, e);
        }
        constructor(e) {
          this.options = e || {};
        }
        init() {}
        formats() {
          return ki();
        }
        parse() {
          return ki();
        }
        format() {
          return ki();
        }
        add() {
          return ki();
        }
        diff() {
          return ki();
        }
        startOf() {
          return ki();
        }
        endOf() {
          return ki();
        }
      }
      var WF__date = Af;
      function GF(t, e, n, i) {
        const { controller: s, data: r, _sorted: o } = t,
          a = s._cachedMeta.iScale;
        if (a && e === a.axis && "r" !== e && o && r.length) {
          const l = a._reversePixels ? gN : Ln;
          if (!i) return l(r, e, n);
          if (s._sharedOptions) {
            const c = r[0],
              u = "function" == typeof c.getRange && c.getRange(e);
            if (u) {
              const d = l(r, e, n - u),
                f = l(r, e, n + u);
              return { lo: d.lo, hi: f.hi };
            }
          }
        }
        return { lo: 0, hi: r.length - 1 };
      }
      function Zr(t, e, n, i, s) {
        const r = t.getSortedVisibleDatasetMetas(),
          o = n[e];
        for (let a = 0, l = r.length; a < l; ++a) {
          const { index: c, data: u } = r[a],
            { lo: d, hi: f } = GF(r[a], e, o, s);
          for (let h = d; h <= f; ++h) {
            const p = u[h];
            p.skip || i(p, c, h);
          }
        }
      }
      function Pf(t, e, n, i, s) {
        const r = [];
        return (
          (!s && !t.isPointInArea(e)) ||
            Zr(
              t,
              n,
              e,
              function (a, l, c) {
                (!s && !Gr(a, t.chartArea, 0)) ||
                  (a.inRange(e.x, e.y, i) &&
                    r.push({ element: a, datasetIndex: l, index: c }));
              },
              !0
            ),
          r
        );
      }
      function Of(t, e, n, i, s, r) {
        return r || t.isPointInArea(e)
          ? "r" !== n || i
            ? (function KF(t, e, n, i, s, r) {
                let o = [];
                const a = (function qF(t) {
                  const e = -1 !== t.indexOf("x"),
                    n = -1 !== t.indexOf("y");
                  return function (i, s) {
                    const r = e ? Math.abs(i.x - s.x) : 0,
                      o = n ? Math.abs(i.y - s.y) : 0;
                    return Math.sqrt(Math.pow(r, 2) + Math.pow(o, 2));
                  };
                })(n);
                let l = Number.POSITIVE_INFINITY;
                return (
                  Zr(t, n, e, function c(u, d, f) {
                    const h = u.inRange(e.x, e.y, s);
                    if (i && !h) return;
                    const p = u.getCenterPoint(s);
                    if (!r && !t.isPointInArea(p) && !h) return;
                    const m = a(e, p);
                    m < l
                      ? ((o = [{ element: u, datasetIndex: d, index: f }]),
                        (l = m))
                      : m === l &&
                        o.push({ element: u, datasetIndex: d, index: f });
                  }),
                  o
                );
              })(t, e, n, i, s, r)
            : (function YF(t, e, n, i) {
                let s = [];
                return (
                  Zr(t, n, e, function r(o, a, l) {
                    const { startAngle: c, endAngle: u } = o.getProps(
                        ["startAngle", "endAngle"],
                        i
                      ),
                      { angle: d } = Bv(o, { x: e.x, y: e.y });
                    $r(d, c, u) &&
                      s.push({ element: o, datasetIndex: a, index: l });
                  }),
                  s
                );
              })(t, e, n, s)
          : [];
      }
      function N0(t, e, n, i, s) {
        const r = [],
          o = "x" === n ? "inXRange" : "inYRange";
        let a = !1;
        return (
          Zr(t, n, e, (l, c, u) => {
            l[o](e[n], s) &&
              (r.push({ element: l, datasetIndex: c, index: u }),
              (a = a || l.inRange(e.x, e.y, s)));
          }),
          i && !a ? [] : r
        );
      }
      var XF = {
        evaluateInteractionItems: Zr,
        modes: {
          index(t, e, n, i) {
            const s = Ai(e, t),
              r = n.axis || "x",
              o = n.includeInvisible || !1,
              a = n.intersect ? Pf(t, s, r, i, o) : Of(t, s, r, !1, i, o),
              l = [];
            return a.length
              ? (t.getSortedVisibleDatasetMetas().forEach((c) => {
                  const u = a[0].index,
                    d = c.data[u];
                  d &&
                    !d.skip &&
                    l.push({ element: d, datasetIndex: c.index, index: u });
                }),
                l)
              : [];
          },
          dataset(t, e, n, i) {
            const s = Ai(e, t),
              r = n.axis || "xy",
              o = n.includeInvisible || !1;
            let a = n.intersect ? Pf(t, s, r, i, o) : Of(t, s, r, !1, i, o);
            if (a.length > 0) {
              const l = a[0].datasetIndex,
                c = t.getDatasetMeta(l).data;
              a = [];
              for (let u = 0; u < c.length; ++u)
                a.push({ element: c[u], datasetIndex: l, index: u });
            }
            return a;
          },
          point: (t, e, n, i) =>
            Pf(t, Ai(e, t), n.axis || "xy", i, n.includeInvisible || !1),
          nearest: (t, e, n, i) =>
            Of(
              t,
              Ai(e, t),
              n.axis || "xy",
              n.intersect,
              i,
              n.includeInvisible || !1
            ),
          x: (t, e, n, i) => N0(t, Ai(e, t), "x", n.intersect, i),
          y: (t, e, n, i) => N0(t, Ai(e, t), "y", n.intersect, i),
        },
      };
      const F0 = ["left", "top", "right", "bottom"];
      function Qr(t, e) {
        return t.filter((n) => n.pos === e);
      }
      function R0(t, e) {
        return t.filter((n) => -1 === F0.indexOf(n.pos) && n.box.axis === e);
      }
      function Jr(t, e) {
        return t.sort((n, i) => {
          const s = e ? i : n,
            r = e ? n : i;
          return s.weight === r.weight
            ? s.index - r.index
            : s.weight - r.weight;
        });
      }
      function L0(t, e, n, i) {
        return Math.max(t[n], e[n]) + Math.max(t[i], e[i]);
      }
      function B0(t, e) {
        (t.top = Math.max(t.top, e.top)),
          (t.left = Math.max(t.left, e.left)),
          (t.bottom = Math.max(t.bottom, e.bottom)),
          (t.right = Math.max(t.right, e.right));
      }
      function tR(t, e, n, i) {
        const { pos: s, box: r } = n,
          o = t.maxPadding;
        if (!Y(s)) {
          n.size && (t[s] -= n.size);
          const d = i[n.stack] || { size: 0, count: 1 };
          (d.size = Math.max(d.size, n.horizontal ? r.height : r.width)),
            (n.size = d.size / d.count),
            (t[s] += n.size);
        }
        r.getPadding && B0(o, r.getPadding());
        const a = Math.max(0, e.outerWidth - L0(o, t, "left", "right")),
          l = Math.max(0, e.outerHeight - L0(o, t, "top", "bottom")),
          c = a !== t.w,
          u = l !== t.h;
        return (
          (t.w = a),
          (t.h = l),
          n.horizontal ? { same: c, other: u } : { same: u, other: c }
        );
      }
      function iR(t, e) {
        const n = e.maxPadding;
        return (function i(s) {
          const r = { left: 0, top: 0, right: 0, bottom: 0 };
          return (
            s.forEach((o) => {
              r[o] = Math.max(e[o], n[o]);
            }),
            r
          );
        })(t ? ["left", "right"] : ["top", "bottom"]);
      }
      function eo(t, e, n, i) {
        const s = [];
        let r, o, a, l, c, u;
        for (r = 0, o = t.length, c = 0; r < o; ++r) {
          (a = t[r]),
            (l = a.box),
            l.update(a.width || e.w, a.height || e.h, iR(a.horizontal, e));
          const { same: d, other: f } = tR(e, n, a, i);
          (c |= d && s.length), (u = u || f), l.fullSize || s.push(a);
        }
        return (c && eo(s, e, n, i)) || u;
      }
      function yl(t, e, n, i, s) {
        (t.top = n),
          (t.left = e),
          (t.right = e + i),
          (t.bottom = n + s),
          (t.width = i),
          (t.height = s);
      }
      function j0(t, e, n, i) {
        const s = n.padding;
        let { x: r, y: o } = e;
        for (const a of t) {
          const l = a.box,
            c = i[a.stack] || { count: 1, placed: 0, weight: 1 },
            u = a.stackWeight / c.weight || 1;
          if (a.horizontal) {
            const d = e.w * u,
              f = c.size || l.height;
            jt(c.start) && (o = c.start),
              l.fullSize
                ? yl(l, s.left, o, n.outerWidth - s.right - s.left, f)
                : yl(l, e.left + c.placed, o, d, f),
              (c.start = o),
              (c.placed += d),
              (o = l.bottom);
          } else {
            const d = e.h * u,
              f = c.size || l.width;
            jt(c.start) && (r = c.start),
              l.fullSize
                ? yl(l, r, s.top, f, n.outerHeight - s.bottom - s.top)
                : yl(l, r, e.top + c.placed, f, d),
              (c.start = r),
              (c.placed += d),
              (r = l.right);
          }
        }
        (e.x = r), (e.y = o);
      }
      var et = {
        addBox(t, e) {
          t.boxes || (t.boxes = []),
            (e.fullSize = e.fullSize || !1),
            (e.position = e.position || "top"),
            (e.weight = e.weight || 0),
            (e._layers =
              e._layers ||
              function () {
                return [
                  {
                    z: 0,
                    draw(n) {
                      e.draw(n);
                    },
                  },
                ];
              }),
            t.boxes.push(e);
        },
        removeBox(t, e) {
          const n = t.boxes ? t.boxes.indexOf(e) : -1;
          -1 !== n && t.boxes.splice(n, 1);
        },
        configure(t, e, n) {
          (e.fullSize = n.fullSize),
            (e.position = n.position),
            (e.weight = n.weight);
        },
        update(t, e, n, i) {
          if (!t) return;
          const s = Je(t.options.layout.padding),
            r = Math.max(e - s.width, 0),
            o = Math.max(n - s.height, 0),
            a = (function eR(t) {
              const e = (function ZF(t) {
                  const e = [];
                  let n, i, s, r, o, a;
                  for (n = 0, i = (t || []).length; n < i; ++n)
                    (s = t[n]),
                      ({
                        position: r,
                        options: { stack: o, stackWeight: a = 1 },
                      } = s),
                      e.push({
                        index: n,
                        box: s,
                        pos: r,
                        horizontal: s.isHorizontal(),
                        weight: s.weight,
                        stack: o && r + o,
                        stackWeight: a,
                      });
                  return e;
                })(t),
                n = Jr(
                  e.filter((c) => c.box.fullSize),
                  !0
                ),
                i = Jr(Qr(e, "left"), !0),
                s = Jr(Qr(e, "right")),
                r = Jr(Qr(e, "top"), !0),
                o = Jr(Qr(e, "bottom")),
                a = R0(e, "x"),
                l = R0(e, "y");
              return {
                fullSize: n,
                leftAndTop: i.concat(r),
                rightAndBottom: s.concat(l).concat(o).concat(a),
                chartArea: Qr(e, "chartArea"),
                vertical: i.concat(s).concat(l),
                horizontal: r.concat(o).concat(a),
              };
            })(t.boxes),
            l = a.vertical,
            c = a.horizontal;
          ae(t.boxes, (g) => {
            "function" == typeof g.beforeLayout && g.beforeLayout();
          });
          const u =
              l.reduce(
                (g, m) =>
                  m.box.options && !1 === m.box.options.display ? g : g + 1,
                0
              ) || 1,
            d = Object.freeze({
              outerWidth: e,
              outerHeight: n,
              padding: s,
              availableWidth: r,
              availableHeight: o,
              vBoxMaxWidth: r / 2 / u,
              hBoxMaxHeight: o / 2,
            }),
            f = Object.assign({}, s);
          B0(f, Je(i));
          const h = Object.assign(
              { maxPadding: f, w: r, h: o, x: s.left, y: s.top },
              s
            ),
            p = (function JF(t, e) {
              const n = (function QF(t) {
                  const e = {};
                  for (const n of t) {
                    const { stack: i, pos: s, stackWeight: r } = n;
                    if (!i || !F0.includes(s)) continue;
                    const o =
                      e[i] ||
                      (e[i] = { count: 0, placed: 0, weight: 0, size: 0 });
                    o.count++, (o.weight += r);
                  }
                  return e;
                })(t),
                { vBoxMaxWidth: i, hBoxMaxHeight: s } = e;
              let r, o, a;
              for (r = 0, o = t.length; r < o; ++r) {
                a = t[r];
                const { fullSize: l } = a.box,
                  c = n[a.stack],
                  u = c && a.stackWeight / c.weight;
                a.horizontal
                  ? ((a.width = u ? u * i : l && e.availableWidth),
                    (a.height = s))
                  : ((a.width = i),
                    (a.height = u ? u * s : l && e.availableHeight));
              }
              return n;
            })(l.concat(c), d);
          eo(a.fullSize, h, d, p),
            eo(l, h, d, p),
            eo(c, h, d, p) && eo(l, h, d, p),
            (function nR(t) {
              const e = t.maxPadding;
              function n(i) {
                const s = Math.max(e[i] - t[i], 0);
                return (t[i] += s), s;
              }
              (t.y += n("top")), (t.x += n("left")), n("right"), n("bottom");
            })(h),
            j0(a.leftAndTop, h, d, p),
            (h.x += h.w),
            (h.y += h.h),
            j0(a.rightAndBottom, h, d, p),
            (t.chartArea = {
              left: h.left,
              top: h.top,
              right: h.left + h.w,
              bottom: h.top + h.h,
              height: h.h,
              width: h.w,
            }),
            ae(a.chartArea, (g) => {
              const m = g.box;
              Object.assign(m, t.chartArea),
                m.update(h.w, h.h, { left: 0, top: 0, right: 0, bottom: 0 });
            });
        },
      };
      class V0 {
        acquireContext(e, n) {}
        releaseContext(e) {
          return !1;
        }
        addEventListener(e, n, i) {}
        removeEventListener(e, n, i) {}
        getDevicePixelRatio() {
          return 1;
        }
        getMaximumSize(e, n, i, s) {
          return (
            (n = Math.max(0, n || e.width)),
            (i = i || e.height),
            { width: n, height: Math.max(0, s ? Math.floor(n / s) : i) }
          );
        }
        isAttached(e) {
          return !0;
        }
        updateConfig(e) {}
      }
      class sR extends V0 {
        acquireContext(e) {
          return (e && e.getContext && e.getContext("2d")) || null;
        }
        updateConfig(e) {
          e.options.animation = !1;
        }
      }
      const _l = "$chartjs",
        rR = {
          touchstart: "mousedown",
          touchmove: "mousemove",
          touchend: "mouseup",
          pointerenter: "mouseenter",
          pointerdown: "mousedown",
          pointermove: "mousemove",
          pointerup: "mouseup",
          pointerleave: "mouseout",
          pointerout: "mouseout",
        },
        H0 = (t) => null === t || "" === t,
        $0 = !!lF && { passive: !0 };
      function lR(t, e, n) {
        t.canvas.removeEventListener(e, n, $0);
      }
      function bl(t, e) {
        for (const n of t) if (n === e || n.contains(e)) return !0;
      }
      function uR(t, e, n) {
        const i = t.canvas,
          s = new MutationObserver((r) => {
            let o = !1;
            for (const a of r)
              (o = o || bl(a.addedNodes, i)), (o = o && !bl(a.removedNodes, i));
            o && n();
          });
        return s.observe(document, { childList: !0, subtree: !0 }), s;
      }
      function dR(t, e, n) {
        const i = t.canvas,
          s = new MutationObserver((r) => {
            let o = !1;
            for (const a of r)
              (o = o || bl(a.removedNodes, i)), (o = o && !bl(a.addedNodes, i));
            o && n();
          });
        return s.observe(document, { childList: !0, subtree: !0 }), s;
      }
      const to = new Map();
      let z0 = 0;
      function U0() {
        const t = window.devicePixelRatio;
        t !== z0 &&
          ((z0 = t),
          to.forEach((e, n) => {
            n.currentDevicePixelRatio !== t && e();
          }));
      }
      function pR(t, e, n) {
        const i = t.canvas,
          s = i && Ef(i);
        if (!s) return;
        const r = zv((a, l) => {
            const c = s.clientWidth;
            n(a, l), c < s.clientWidth && n();
          }, window),
          o = new ResizeObserver((a) => {
            const l = a[0],
              c = l.contentRect.width,
              u = l.contentRect.height;
            (0 === c && 0 === u) || r(c, u);
          });
        return (
          o.observe(s),
          (function fR(t, e) {
            to.size || window.addEventListener("resize", U0), to.set(t, e);
          })(t, r),
          o
        );
      }
      function kf(t, e, n) {
        n && n.disconnect(),
          "resize" === e &&
            (function hR(t) {
              to.delete(t), to.size || window.removeEventListener("resize", U0);
            })(t);
      }
      function gR(t, e, n) {
        const i = t.canvas,
          s = zv((r) => {
            null !== t.ctx &&
              n(
                (function cR(t, e) {
                  const n = rR[t.type] || t.type,
                    { x: i, y: s } = Ai(t, e);
                  return {
                    type: n,
                    chart: e,
                    native: t,
                    x: void 0 !== i ? i : null,
                    y: void 0 !== s ? s : null,
                  };
                })(r, t)
              );
          }, t);
        return (
          (function aR(t, e, n) {
            t.addEventListener(e, n, $0);
          })(i, e, s),
          s
        );
      }
      class mR extends V0 {
        acquireContext(e, n) {
          const i = e && e.getContext && e.getContext("2d");
          return i && i.canvas === e
            ? ((function oR(t, e) {
                const n = t.style,
                  i = t.getAttribute("height"),
                  s = t.getAttribute("width");
                if (
                  ((t[_l] = {
                    initial: {
                      height: i,
                      width: s,
                      style: {
                        display: n.display,
                        height: n.height,
                        width: n.width,
                      },
                    },
                  }),
                  (n.display = n.display || "block"),
                  (n.boxSizing = n.boxSizing || "border-box"),
                  H0(s))
                ) {
                  const r = f0(t, "width");
                  void 0 !== r && (t.width = r);
                }
                if (H0(i))
                  if ("" === t.style.height) t.height = t.width / (e || 2);
                  else {
                    const r = f0(t, "height");
                    void 0 !== r && (t.height = r);
                  }
              })(e, n),
              i)
            : null;
        }
        releaseContext(e) {
          const n = e.canvas;
          if (!n[_l]) return !1;
          const i = n[_l].initial;
          ["height", "width"].forEach((r) => {
            const o = i[r];
            Q(o) ? n.removeAttribute(r) : n.setAttribute(r, o);
          });
          const s = i.style || {};
          return (
            Object.keys(s).forEach((r) => {
              n.style[r] = s[r];
            }),
            (n.width = n.width),
            delete n[_l],
            !0
          );
        }
        addEventListener(e, n, i) {
          this.removeEventListener(e, n),
            ((e.$proxies || (e.$proxies = {}))[n] = (
              { attach: uR, detach: dR, resize: pR }[n] || gR
            )(e, n, i));
        }
        removeEventListener(e, n) {
          const i = e.$proxies || (e.$proxies = {}),
            s = i[n];
          s &&
            (({ attach: kf, detach: kf, resize: kf }[n] || lR)(e, n, s),
            (i[n] = void 0));
        }
        getDevicePixelRatio() {
          return window.devicePixelRatio;
        }
        getMaximumSize(e, n, i, s) {
          return (function aF(t, e, n, i) {
            const s = ul(t),
              r = Ti(s, "margin"),
              o = cl(s.maxWidth, t, "clientWidth") || nl,
              a = cl(s.maxHeight, t, "clientHeight") || nl,
              l = (function oF(t, e, n) {
                let i, s;
                if (void 0 === e || void 0 === n) {
                  const r = Ef(t);
                  if (r) {
                    const o = r.getBoundingClientRect(),
                      a = ul(r),
                      l = Ti(a, "border", "width"),
                      c = Ti(a, "padding");
                    (e = o.width - c.width - l.width),
                      (n = o.height - c.height - l.height),
                      (i = cl(a.maxWidth, r, "clientWidth")),
                      (s = cl(a.maxHeight, r, "clientHeight"));
                  } else (e = t.clientWidth), (n = t.clientHeight);
                }
                return {
                  width: e,
                  height: n,
                  maxWidth: i || nl,
                  maxHeight: s || nl,
                };
              })(t, e, n);
            let { width: c, height: u } = l;
            if ("content-box" === s.boxSizing) {
              const f = Ti(s, "border", "width"),
                h = Ti(s, "padding");
              (c -= h.width + f.width), (u -= h.height + f.height);
            }
            return (
              (c = Math.max(0, c - r.width)),
              (u = Math.max(0, i ? c / i : u - r.height)),
              (c = dl(Math.min(c, o, l.maxWidth))),
              (u = dl(Math.min(u, a, l.maxHeight))),
              c && !u && (u = dl(c / 2)),
              (void 0 !== e || void 0 !== n) &&
                i &&
                l.height &&
                u > l.height &&
                ((u = l.height), (c = dl(Math.floor(u * i)))),
              { width: c, height: u }
            );
          })(e, n, i, s);
        }
        isAttached(e) {
          const n = Ef(e);
          return !(!n || !n.isConnected);
        }
      }
      class en {
        constructor() {
          I(this, "active", !1);
        }
        tooltipPosition(e) {
          const { x: n, y: i } = this.getProps(["x", "y"], e);
          return { x: n, y: i };
        }
        hasValue() {
          return As(this.x) && As(this.y);
        }
        getProps(e, n) {
          const i = this.$animations;
          if (!n || !i) return this;
          const s = {};
          return (
            e.forEach((r) => {
              s[r] = i[r] && i[r].active() ? i[r]._to : this[r];
            }),
            s
          );
        }
      }
      function vl(t, e, n, i, s) {
        const r = H(i, 0),
          o = Math.min(H(s, t.length), t.length);
        let l,
          c,
          u,
          a = 0;
        for (
          n = Math.ceil(n),
            s && ((l = s - i), (n = l / Math.floor(l / n))),
            u = r;
          u < 0;

        )
          a++, (u = Math.round(r + a * n));
        for (c = Math.max(r, 0); c < o; c++)
          c === u && (e.push(t[c]), a++, (u = Math.round(r + a * n)));
      }
      I(en, "defaults", {}), I(en, "defaultRoutes");
      const W0 = (t, e, n) =>
        "top" === e || "left" === e ? t[e] + n : t[e] - n;
      function G0(t, e) {
        const n = [],
          i = t.length / e,
          s = t.length;
        let r = 0;
        for (; r < s; r += i) n.push(t[Math.floor(r)]);
        return n;
      }
      function ER(t, e, n) {
        const i = t.ticks.length,
          s = Math.min(e, i - 1),
          r = t._startPixel,
          o = t._endPixel,
          a = 1e-6;
        let c,
          l = t.getPixelForTick(s);
        if (
          !(
            n &&
            ((c =
              1 === i
                ? Math.max(l - r, o - l)
                : 0 === e
                ? (t.getPixelForTick(1) - l) / 2
                : (l - t.getPixelForTick(s - 1)) / 2),
            (l += s < e ? c : -c),
            l < r - a || l > o + a)
          )
        )
          return l;
      }
      function no(t) {
        return t.drawTicks ? t.tickLength : 0;
      }
      function q0(t, e) {
        if (!t.display) return 0;
        const n = Ve(t.font, e),
          i = Je(t.padding);
        return (ge(t.text) ? t.text.length : 1) * n.lineHeight + i.height;
      }
      function TR(t, e, n) {
        let i = mf(t);
        return (
          ((n && "right" !== e) || (!n && "right" === e)) &&
            (i = ((t) => ("left" === t ? "right" : "right" === t ? "left" : t))(
              i
            )),
          i
        );
      }
      class Ni extends en {
        constructor(e) {
          super(),
            (this.id = e.id),
            (this.type = e.type),
            (this.options = void 0),
            (this.ctx = e.ctx),
            (this.chart = e.chart),
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
        init(e) {
          (this.options = e.setContext(this.getContext())),
            (this.axis = e.axis),
            (this._userMin = this.parse(e.min)),
            (this._userMax = this.parse(e.max)),
            (this._suggestedMin = this.parse(e.suggestedMin)),
            (this._suggestedMax = this.parse(e.suggestedMax));
        }
        parse(e, n) {
          return e;
        }
        getUserBounds() {
          let {
            _userMin: e,
            _userMax: n,
            _suggestedMin: i,
            _suggestedMax: s,
          } = this;
          return (
            (e = St(e, Number.POSITIVE_INFINITY)),
            (n = St(n, Number.NEGATIVE_INFINITY)),
            (i = St(i, Number.POSITIVE_INFINITY)),
            (s = St(s, Number.NEGATIVE_INFINITY)),
            {
              min: St(e, i),
              max: St(n, s),
              minDefined: Ee(e),
              maxDefined: Ee(n),
            }
          );
        }
        getMinMax(e) {
          let o,
            {
              min: n,
              max: i,
              minDefined: s,
              maxDefined: r,
            } = this.getUserBounds();
          if (s && r) return { min: n, max: i };
          const a = this.getMatchingVisibleMetas();
          for (let l = 0, c = a.length; l < c; ++l)
            (o = a[l].controller.getMinMax(this, e)),
              s || (n = Math.min(n, o.min)),
              r || (i = Math.max(i, o.max));
          return (
            (n = r && n > i ? i : n),
            (i = s && n > i ? n : i),
            { min: St(n, St(i, n)), max: St(i, St(n, i)) }
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
          const e = this.chart.data;
          return (
            this.options.labels ||
            (this.isHorizontal() ? e.xLabels : e.yLabels) ||
            e.labels ||
            []
          );
        }
        getLabelItems(e = this.chart.chartArea) {
          return (
            this._labelItems || (this._labelItems = this._computeLabelItems(e))
          );
        }
        beforeLayout() {
          (this._cache = {}), (this._dataLimitsCached = !1);
        }
        beforeUpdate() {
          pe(this.options.beforeUpdate, [this]);
        }
        update(e, n, i) {
          const { beginAtZero: s, grace: r, ticks: o } = this.options,
            a = o.sampleSize;
          this.beforeUpdate(),
            (this.maxWidth = e),
            (this.maxHeight = n),
            (this._margins = i =
              Object.assign({ left: 0, right: 0, top: 0, bottom: 0 }, i)),
            (this.ticks = null),
            (this._labelSizes = null),
            (this._gridLineItems = null),
            (this._labelItems = null),
            this.beforeSetDimensions(),
            this.setDimensions(),
            this.afterSetDimensions(),
            (this._maxLength = this.isHorizontal()
              ? this.width + i.left + i.right
              : this.height + i.top + i.bottom),
            this._dataLimitsCached ||
              (this.beforeDataLimits(),
              this.determineDataLimits(),
              this.afterDataLimits(),
              (this._range = (function jN(t, e, n) {
                const { min: i, max: s } = t,
                  r = Av(e, (s - i) / 2),
                  o = (a, l) => (n && 0 === a ? 0 : a + l);
                return { min: o(i, -Math.abs(r)), max: o(s, r) };
              })(this, r, s)),
              (this._dataLimitsCached = !0)),
            this.beforeBuildTicks(),
            (this.ticks = this.buildTicks() || []),
            this.afterBuildTicks();
          const l = a < this.ticks.length;
          this._convertTicksToLabels(l ? G0(this.ticks, a) : this.ticks),
            this.configure(),
            this.beforeCalculateLabelRotation(),
            this.calculateLabelRotation(),
            this.afterCalculateLabelRotation(),
            o.display &&
              (o.autoSkip || "auto" === o.source) &&
              ((this.ticks = (function _R(t, e) {
                const n = t.options.ticks,
                  i = (function bR(t) {
                    const e = t.options.offset,
                      n = t._tickSize();
                    return Math.floor(
                      Math.min(t._length / n + (e ? 0 : 1), t._maxLength / n)
                    );
                  })(t),
                  s = Math.min(n.maxTicksLimit || i, i),
                  r = n.major.enabled
                    ? (function DR(t) {
                        const e = [];
                        let n, i;
                        for (n = 0, i = t.length; n < i; n++)
                          t[n].major && e.push(n);
                        return e;
                      })(e)
                    : [],
                  o = r.length,
                  a = r[0],
                  l = r[o - 1],
                  c = [];
                if (o > s)
                  return (
                    (function wR(t, e, n, i) {
                      let o,
                        s = 0,
                        r = n[0];
                      for (i = Math.ceil(i), o = 0; o < t.length; o++)
                        o === r && (e.push(t[o]), s++, (r = n[s * i]));
                    })(e, c, r, o / s),
                    c
                  );
                const u = (function vR(t, e, n) {
                  const i = (function CR(t) {
                      const e = t.length;
                      let n, i;
                      if (e < 2) return !1;
                      for (i = t[0], n = 1; n < e; ++n)
                        if (t[n] - t[n - 1] !== i) return !1;
                      return i;
                    })(t),
                    s = e.length / n;
                  if (!i) return Math.max(s, 1);
                  const r = (function dN(t) {
                    const e = [],
                      n = Math.sqrt(t);
                    let i;
                    for (i = 1; i < n; i++)
                      t % i == 0 && (e.push(i), e.push(t / i));
                    return (
                      n === (0 | n) && e.push(n),
                      e.sort((s, r) => s - r).pop(),
                      e
                    );
                  })(i);
                  for (let o = 0, a = r.length - 1; o < a; o++) {
                    const l = r[o];
                    if (l > s) return l;
                  }
                  return Math.max(s, 1);
                })(r, e, s);
                if (o > 0) {
                  let d, f;
                  const h = o > 1 ? Math.round((l - a) / (o - 1)) : null;
                  for (
                    vl(e, c, u, Q(h) ? 0 : a - h, a), d = 0, f = o - 1;
                    d < f;
                    d++
                  )
                    vl(e, c, u, r[d], r[d + 1]);
                  return vl(e, c, u, l, Q(h) ? e.length : l + h), c;
                }
                return vl(e, c, u), c;
              })(this, this.ticks)),
              (this._labelSizes = null),
              this.afterAutoSkip()),
            l && this._convertTicksToLabels(this.ticks),
            this.beforeFit(),
            this.fit(),
            this.afterFit(),
            this.afterUpdate();
        }
        configure() {
          let n,
            i,
            e = this.options.reverse;
          this.isHorizontal()
            ? ((n = this.left), (i = this.right))
            : ((n = this.top), (i = this.bottom), (e = !e)),
            (this._startPixel = n),
            (this._endPixel = i),
            (this._reversePixels = e),
            (this._length = i - n),
            (this._alignToPixels = this.options.alignToPixels);
        }
        afterUpdate() {
          pe(this.options.afterUpdate, [this]);
        }
        beforeSetDimensions() {
          pe(this.options.beforeSetDimensions, [this]);
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
          pe(this.options.afterSetDimensions, [this]);
        }
        _callHooks(e) {
          this.chart.notifyPlugins(e, this.getContext()),
            pe(this.options[e], [this]);
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
          pe(this.options.beforeTickToLabelConversion, [this]);
        }
        generateTickLabels(e) {
          const n = this.options.ticks;
          let i, s, r;
          for (i = 0, s = e.length; i < s; i++)
            (r = e[i]), (r.label = pe(n.callback, [r.value, i, e], this));
        }
        afterTickToLabelConversion() {
          pe(this.options.afterTickToLabelConversion, [this]);
        }
        beforeCalculateLabelRotation() {
          pe(this.options.beforeCalculateLabelRotation, [this]);
        }
        calculateLabelRotation() {
          const e = this.options,
            n = e.ticks,
            i = this.ticks.length,
            s = n.minRotation || 0,
            r = n.maxRotation;
          let a,
            l,
            c,
            o = s;
          if (
            !this._isVisible() ||
            !n.display ||
            s >= r ||
            i <= 1 ||
            !this.isHorizontal()
          )
            return void (this.labelRotation = s);
          const u = this._getLabelSizes(),
            d = u.widest.width,
            f = u.highest.height,
            h = $e(this.chart.width - d, 0, this.maxWidth);
          (a = e.offset ? this.maxWidth / i : h / (i - 1)),
            d + 6 > a &&
              ((a = h / (i - (e.offset ? 0.5 : 1))),
              (l =
                this.maxHeight -
                no(e.grid) -
                n.padding -
                q0(e.title, this.chart.options.font)),
              (c = Math.sqrt(d * d + f * f)),
              (o = hf(
                Math.min(
                  Math.asin($e((u.highest.height + 6) / a, -1, 1)),
                  Math.asin($e(l / c, -1, 1)) - Math.asin($e(f / c, -1, 1))
                )
              )),
              (o = Math.max(s, Math.min(r, o)))),
            (this.labelRotation = o);
        }
        afterCalculateLabelRotation() {
          pe(this.options.afterCalculateLabelRotation, [this]);
        }
        afterAutoSkip() {}
        beforeFit() {
          pe(this.options.beforeFit, [this]);
        }
        fit() {
          const e = { width: 0, height: 0 },
            {
              chart: n,
              options: { ticks: i, title: s, grid: r },
            } = this,
            o = this._isVisible(),
            a = this.isHorizontal();
          if (o) {
            const l = q0(s, n.options.font);
            if (
              (a
                ? ((e.width = this.maxWidth), (e.height = no(r) + l))
                : ((e.height = this.maxHeight), (e.width = no(r) + l)),
              i.display && this.ticks.length)
            ) {
              const {
                  first: c,
                  last: u,
                  widest: d,
                  highest: f,
                } = this._getLabelSizes(),
                h = 2 * i.padding,
                p = Qt(this.labelRotation),
                g = Math.cos(p),
                m = Math.sin(p);
              a
                ? (e.height = Math.min(
                    this.maxHeight,
                    e.height + (i.mirror ? 0 : m * d.width + g * f.height) + h
                  ))
                : (e.width = Math.min(
                    this.maxWidth,
                    e.width + (i.mirror ? 0 : g * d.width + m * f.height) + h
                  )),
                this._calculatePadding(c, u, m, g);
            }
          }
          this._handleMargins(),
            a
              ? ((this.width = this._length =
                  n.width - this._margins.left - this._margins.right),
                (this.height = e.height))
              : ((this.width = e.width),
                (this.height = this._length =
                  n.height - this._margins.top - this._margins.bottom));
        }
        _calculatePadding(e, n, i, s) {
          const {
              ticks: { align: r, padding: o },
              position: a,
            } = this.options,
            l = 0 !== this.labelRotation,
            c = "top" !== a && "x" === this.axis;
          if (this.isHorizontal()) {
            const u = this.getPixelForTick(0) - this.left,
              d = this.right - this.getPixelForTick(this.ticks.length - 1);
            let f = 0,
              h = 0;
            l
              ? c
                ? ((f = s * e.width), (h = i * n.height))
                : ((f = i * e.height), (h = s * n.width))
              : "start" === r
              ? (h = n.width)
              : "end" === r
              ? (f = e.width)
              : "inner" !== r && ((f = e.width / 2), (h = n.width / 2)),
              (this.paddingLeft = Math.max(
                ((f - u + o) * this.width) / (this.width - u),
                0
              )),
              (this.paddingRight = Math.max(
                ((h - d + o) * this.width) / (this.width - d),
                0
              ));
          } else {
            let u = n.height / 2,
              d = e.height / 2;
            "start" === r
              ? ((u = 0), (d = e.height))
              : "end" === r && ((u = n.height), (d = 0)),
              (this.paddingTop = u + o),
              (this.paddingBottom = d + o);
          }
        }
        _handleMargins() {
          this._margins &&
            ((this._margins.left = Math.max(
              this.paddingLeft,
              this._margins.left
            )),
            (this._margins.top = Math.max(this.paddingTop, this._margins.top)),
            (this._margins.right = Math.max(
              this.paddingRight,
              this._margins.right
            )),
            (this._margins.bottom = Math.max(
              this.paddingBottom,
              this._margins.bottom
            )));
        }
        afterFit() {
          pe(this.options.afterFit, [this]);
        }
        isHorizontal() {
          const { axis: e, position: n } = this.options;
          return "top" === n || "bottom" === n || "x" === e;
        }
        isFullSize() {
          return this.options.fullSize;
        }
        _convertTicksToLabels(e) {
          let n, i;
          for (
            this.beforeTickToLabelConversion(),
              this.generateTickLabels(e),
              n = 0,
              i = e.length;
            n < i;
            n++
          )
            Q(e[n].label) && (e.splice(n, 1), i--, n--);
          this.afterTickToLabelConversion();
        }
        _getLabelSizes() {
          let e = this._labelSizes;
          if (!e) {
            const n = this.options.ticks.sampleSize;
            let i = this.ticks;
            n < i.length && (i = G0(i, n)),
              (this._labelSizes = e = this._computeLabelSizes(i, i.length));
          }
          return e;
        }
        _computeLabelSizes(e, n) {
          const { ctx: i, _longestTextCache: s } = this,
            r = [],
            o = [];
          let c,
            u,
            d,
            f,
            h,
            p,
            g,
            m,
            y,
            b,
            _,
            a = 0,
            l = 0;
          for (c = 0; c < n; ++c) {
            if (
              ((f = e[c].label),
              (h = this._resolveTickFontOptions(c)),
              (i.font = p = h.string),
              (g = s[p] = s[p] || { data: {}, gc: [] }),
              (m = h.lineHeight),
              (y = b = 0),
              Q(f) || ge(f))
            ) {
              if (ge(f))
                for (u = 0, d = f.length; u < d; ++u)
                  (_ = f[u]),
                    !Q(_) &&
                      !ge(_) &&
                      ((y = rl(i, g.data, g.gc, y, _)), (b += m));
            } else (y = rl(i, g.data, g.gc, y, f)), (b = m);
            r.push(y), o.push(b), (a = Math.max(y, a)), (l = Math.max(b, l));
          }
          !(function MR(t, e) {
            ae(t, (n) => {
              const i = n.gc,
                s = i.length / 2;
              let r;
              if (s > e) {
                for (r = 0; r < s; ++r) delete n.data[i[r]];
                i.splice(0, s);
              }
            });
          })(s, n);
          const v = r.indexOf(a),
            D = o.indexOf(l),
            C = (x) => ({ width: r[x] || 0, height: o[x] || 0 });
          return {
            first: C(0),
            last: C(n - 1),
            widest: C(v),
            highest: C(D),
            widths: r,
            heights: o,
          };
        }
        getLabelForValue(e) {
          return e;
        }
        getPixelForValue(e, n) {
          return NaN;
        }
        getValueForPixel(e) {}
        getPixelForTick(e) {
          const n = this.ticks;
          return e < 0 || e > n.length - 1
            ? null
            : this.getPixelForValue(n[e].value);
        }
        getPixelForDecimal(e) {
          this._reversePixels && (e = 1 - e);
          const n = this._startPixel + e * this._length;
          return (function pN(t) {
            return $e(t, -32768, 32767);
          })(this._alignToPixels ? Mi(this.chart, n, 0) : n);
        }
        getDecimalForPixel(e) {
          const n = (e - this._startPixel) / this._length;
          return this._reversePixels ? 1 - n : n;
        }
        getBasePixel() {
          return this.getPixelForValue(this.getBaseValue());
        }
        getBaseValue() {
          const { min: e, max: n } = this;
          return e < 0 && n < 0 ? n : e > 0 && n > 0 ? e : 0;
        }
        getContext(e) {
          const n = this.ticks || [];
          if (e >= 0 && e < n.length) {
            const i = n[e];
            return (
              i.$context ||
              (i.$context = (function IR(t, e, n) {
                return ii(t, { tick: n, index: e, type: "tick" });
              })(this.getContext(), e, i))
            );
          }
          return (
            this.$context ||
            (this.$context = (function SR(t, e) {
              return ii(t, { scale: e, type: "scale" });
            })(this.chart.getContext(), this))
          );
        }
        _tickSize() {
          const e = this.options.ticks,
            n = Qt(this.labelRotation),
            i = Math.abs(Math.cos(n)),
            s = Math.abs(Math.sin(n)),
            r = this._getLabelSizes(),
            o = e.autoSkipPadding || 0,
            a = r ? r.widest.width + o : 0,
            l = r ? r.highest.height + o : 0;
          return this.isHorizontal()
            ? l * i > a * s
              ? a / i
              : l / s
            : l * s < a * i
            ? l / i
            : a / s;
        }
        _isVisible() {
          const e = this.options.display;
          return "auto" !== e ? !!e : this.getMatchingVisibleMetas().length > 0;
        }
        _computeGridLineItems(e) {
          const n = this.axis,
            i = this.chart,
            s = this.options,
            { grid: r, position: o, border: a } = s,
            l = r.offset,
            c = this.isHorizontal(),
            d = this.ticks.length + (l ? 1 : 0),
            f = no(r),
            h = [],
            p = a.setContext(this.getContext()),
            g = p.display ? p.width : 0,
            m = g / 2,
            y = function (le) {
              return Mi(i, le, g);
            };
          let b, _, v, D, C, x, M, T, B, j, K, Te;
          if ("top" === o)
            (b = y(this.bottom)),
              (x = this.bottom - f),
              (T = b - m),
              (j = y(e.top) + m),
              (Te = e.bottom);
          else if ("bottom" === o)
            (b = y(this.top)),
              (j = e.top),
              (Te = y(e.bottom) - m),
              (x = b + m),
              (T = this.top + f);
          else if ("left" === o)
            (b = y(this.right)),
              (C = this.right - f),
              (M = b - m),
              (B = y(e.left) + m),
              (K = e.right);
          else if ("right" === o)
            (b = y(this.left)),
              (B = e.left),
              (K = y(e.right) - m),
              (C = b + m),
              (M = this.left + f);
          else if ("x" === n) {
            if ("center" === o) b = y((e.top + e.bottom) / 2 + 0.5);
            else if (Y(o)) {
              const le = Object.keys(o)[0];
              b = y(this.chart.scales[le].getPixelForValue(o[le]));
            }
            (j = e.top), (Te = e.bottom), (x = b + m), (T = x + f);
          } else if ("y" === n) {
            if ("center" === o) b = y((e.left + e.right) / 2);
            else if (Y(o)) {
              const le = Object.keys(o)[0];
              b = y(this.chart.scales[le].getPixelForValue(o[le]));
            }
            (C = b - m), (M = C - f), (B = e.left), (K = e.right);
          }
          const Ue = H(s.ticks.maxTicksLimit, d),
            ee = Math.max(1, Math.ceil(d / Ue));
          for (_ = 0; _ < d; _ += ee) {
            const le = this.getContext(_),
              Ae = r.setContext(le),
              nn = a.setContext(le),
              tt = Ae.lineWidth,
              Vs = Ae.color,
              Hl = nn.dash || [],
              Hs = nn.dashOffset,
              ho = Ae.tickWidth,
              po = Ae.tickColor,
              go = Ae.tickBorderDash || [],
              mo = Ae.tickBorderDashOffset;
            (v = ER(this, _, l)),
              void 0 !== v &&
                ((D = Mi(i, v, tt)),
                c ? (C = M = B = K = D) : (x = T = j = Te = D),
                h.push({
                  tx1: C,
                  ty1: x,
                  tx2: M,
                  ty2: T,
                  x1: B,
                  y1: j,
                  x2: K,
                  y2: Te,
                  width: tt,
                  color: Vs,
                  borderDash: Hl,
                  borderDashOffset: Hs,
                  tickWidth: ho,
                  tickColor: po,
                  tickBorderDash: go,
                  tickBorderDashOffset: mo,
                }));
          }
          return (this._ticksLength = d), (this._borderValue = b), h;
        }
        _computeLabelItems(e) {
          const n = this.axis,
            i = this.options,
            { position: s, ticks: r } = i,
            o = this.isHorizontal(),
            a = this.ticks,
            { align: l, crossAlign: c, padding: u, mirror: d } = r,
            f = no(i.grid),
            h = f + u,
            p = d ? -u : h,
            g = -Qt(this.labelRotation),
            m = [];
          let y,
            b,
            _,
            v,
            D,
            C,
            x,
            M,
            T,
            B,
            j,
            K,
            Te = "middle";
          if ("top" === s)
            (C = this.bottom - p), (x = this._getXAxisLabelAlignment());
          else if ("bottom" === s)
            (C = this.top + p), (x = this._getXAxisLabelAlignment());
          else if ("left" === s) {
            const ee = this._getYAxisLabelAlignment(f);
            (x = ee.textAlign), (D = ee.x);
          } else if ("right" === s) {
            const ee = this._getYAxisLabelAlignment(f);
            (x = ee.textAlign), (D = ee.x);
          } else if ("x" === n) {
            if ("center" === s) C = (e.top + e.bottom) / 2 + h;
            else if (Y(s)) {
              const ee = Object.keys(s)[0];
              C = this.chart.scales[ee].getPixelForValue(s[ee]) + h;
            }
            x = this._getXAxisLabelAlignment();
          } else if ("y" === n) {
            if ("center" === s) D = (e.left + e.right) / 2 - h;
            else if (Y(s)) {
              const ee = Object.keys(s)[0];
              D = this.chart.scales[ee].getPixelForValue(s[ee]);
            }
            x = this._getYAxisLabelAlignment(f).textAlign;
          }
          "y" === n &&
            ("start" === l ? (Te = "top") : "end" === l && (Te = "bottom"));
          const Ue = this._getLabelSizes();
          for (y = 0, b = a.length; y < b; ++y) {
            (_ = a[y]), (v = _.label);
            const ee = r.setContext(this.getContext(y));
            (M = this.getPixelForTick(y) + r.labelOffset),
              (T = this._resolveTickFontOptions(y)),
              (B = T.lineHeight),
              (j = ge(v) ? v.length : 1);
            const le = j / 2,
              Ae = ee.color,
              nn = ee.textStrokeColor,
              tt = ee.textStrokeWidth;
            let Hl,
              Vs = x;
            if (
              (o
                ? ((D = M),
                  "inner" === x &&
                    (Vs =
                      y === b - 1
                        ? this.options.reverse
                          ? "left"
                          : "right"
                        : 0 === y
                        ? this.options.reverse
                          ? "right"
                          : "left"
                        : "center"),
                  (K =
                    "top" === s
                      ? "near" === c || 0 !== g
                        ? -j * B + B / 2
                        : "center" === c
                        ? -Ue.highest.height / 2 - le * B + B
                        : B / 2 - Ue.highest.height
                      : "near" === c || 0 !== g
                      ? B / 2
                      : "center" === c
                      ? Ue.highest.height / 2 - le * B
                      : Ue.highest.height - j * B),
                  d && (K *= -1),
                  0 !== g &&
                    !ee.showLabelBackdrop &&
                    (D += (B / 2) * Math.sin(g)))
                : ((C = M), (K = ((1 - j) * B) / 2)),
              ee.showLabelBackdrop)
            ) {
              const Hs = Je(ee.backdropPadding),
                ho = Ue.heights[y],
                po = Ue.widths[y];
              let go = K - Hs.top,
                mo = 0 - Hs.left;
              switch (Te) {
                case "middle":
                  go -= ho / 2;
                  break;
                case "bottom":
                  go -= ho;
              }
              switch (x) {
                case "center":
                  mo -= po / 2;
                  break;
                case "right":
                  mo -= po;
              }
              Hl = {
                left: mo,
                top: go,
                width: po + Hs.width,
                height: ho + Hs.height,
                color: ee.backdropColor,
              };
            }
            m.push({
              label: v,
              font: T,
              textOffset: K,
              options: {
                rotation: g,
                color: Ae,
                strokeColor: nn,
                strokeWidth: tt,
                textAlign: Vs,
                textBaseline: Te,
                translation: [D, C],
                backdrop: Hl,
              },
            });
          }
          return m;
        }
        _getXAxisLabelAlignment() {
          const { position: e, ticks: n } = this.options;
          if (-Qt(this.labelRotation)) return "top" === e ? "left" : "right";
          let s = "center";
          return (
            "start" === n.align
              ? (s = "left")
              : "end" === n.align
              ? (s = "right")
              : "inner" === n.align && (s = "inner"),
            s
          );
        }
        _getYAxisLabelAlignment(e) {
          const {
              position: n,
              ticks: { crossAlign: i, mirror: s, padding: r },
            } = this.options,
            a = e + r,
            l = this._getLabelSizes().widest.width;
          let c, u;
          return (
            "left" === n
              ? s
                ? ((u = this.right + r),
                  "near" === i
                    ? (c = "left")
                    : "center" === i
                    ? ((c = "center"), (u += l / 2))
                    : ((c = "right"), (u += l)))
                : ((u = this.right - a),
                  "near" === i
                    ? (c = "right")
                    : "center" === i
                    ? ((c = "center"), (u -= l / 2))
                    : ((c = "left"), (u = this.left)))
              : "right" === n
              ? s
                ? ((u = this.left + r),
                  "near" === i
                    ? (c = "right")
                    : "center" === i
                    ? ((c = "center"), (u -= l / 2))
                    : ((c = "left"), (u -= l)))
                : ((u = this.left + a),
                  "near" === i
                    ? (c = "left")
                    : "center" === i
                    ? ((c = "center"), (u += l / 2))
                    : ((c = "right"), (u = this.right)))
              : (c = "right"),
            { textAlign: c, x: u }
          );
        }
        _computeLabelArea() {
          if (this.options.ticks.mirror) return;
          const e = this.chart,
            n = this.options.position;
          return "left" === n || "right" === n
            ? { top: 0, left: this.left, bottom: e.height, right: this.right }
            : "top" === n || "bottom" === n
            ? { top: this.top, left: 0, bottom: this.bottom, right: e.width }
            : void 0;
        }
        drawBackground() {
          const {
            ctx: e,
            options: { backgroundColor: n },
            left: i,
            top: s,
            width: r,
            height: o,
          } = this;
          n &&
            (e.save(), (e.fillStyle = n), e.fillRect(i, s, r, o), e.restore());
        }
        getLineWidthForValue(e) {
          const n = this.options.grid;
          if (!this._isVisible() || !n.display) return 0;
          const s = this.ticks.findIndex((r) => r.value === e);
          return s >= 0 ? n.setContext(this.getContext(s)).lineWidth : 0;
        }
        drawGrid(e) {
          const n = this.options.grid,
            i = this.ctx,
            s =
              this._gridLineItems ||
              (this._gridLineItems = this._computeGridLineItems(e));
          let r, o;
          const a = (l, c, u) => {
            !u.width ||
              !u.color ||
              (i.save(),
              (i.lineWidth = u.width),
              (i.strokeStyle = u.color),
              i.setLineDash(u.borderDash || []),
              (i.lineDashOffset = u.borderDashOffset),
              i.beginPath(),
              i.moveTo(l.x, l.y),
              i.lineTo(c.x, c.y),
              i.stroke(),
              i.restore());
          };
          if (n.display)
            for (r = 0, o = s.length; r < o; ++r) {
              const l = s[r];
              n.drawOnChartArea &&
                a({ x: l.x1, y: l.y1 }, { x: l.x2, y: l.y2 }, l),
                n.drawTicks &&
                  a(
                    { x: l.tx1, y: l.ty1 },
                    { x: l.tx2, y: l.ty2 },
                    {
                      color: l.tickColor,
                      width: l.tickWidth,
                      borderDash: l.tickBorderDash,
                      borderDashOffset: l.tickBorderDashOffset,
                    }
                  );
            }
        }
        drawBorder() {
          const {
              chart: e,
              ctx: n,
              options: { border: i, grid: s },
            } = this,
            r = i.setContext(this.getContext()),
            o = i.display ? r.width : 0;
          if (!o) return;
          const a = s.setContext(this.getContext(0)).lineWidth,
            l = this._borderValue;
          let c, u, d, f;
          this.isHorizontal()
            ? ((c = Mi(e, this.left, o) - o / 2),
              (u = Mi(e, this.right, a) + a / 2),
              (d = f = l))
            : ((d = Mi(e, this.top, o) - o / 2),
              (f = Mi(e, this.bottom, a) + a / 2),
              (c = u = l)),
            n.save(),
            (n.lineWidth = r.width),
            (n.strokeStyle = r.color),
            n.beginPath(),
            n.moveTo(c, d),
            n.lineTo(u, f),
            n.stroke(),
            n.restore();
        }
        drawLabels(e) {
          if (!this.options.ticks.display) return;
          const i = this.ctx,
            s = this._computeLabelArea();
          s && ol(i, s);
          const r = this.getLabelItems(e);
          for (const o of r) Si(i, o.label, 0, o.textOffset, o.font, o.options);
          s && al(i);
        }
        drawTitle() {
          const {
            ctx: e,
            options: { position: n, title: i, reverse: s },
          } = this;
          if (!i.display) return;
          const r = Ve(i.font),
            o = Je(i.padding),
            a = i.align;
          let l = r.lineHeight / 2;
          "bottom" === n || "center" === n || Y(n)
            ? ((l += o.bottom),
              ge(i.text) && (l += r.lineHeight * (i.text.length - 1)))
            : (l += o.top);
          const {
            titleX: c,
            titleY: u,
            maxWidth: d,
            rotation: f,
          } = (function AR(t, e, n, i) {
            const { top: s, left: r, bottom: o, right: a, chart: l } = t,
              { chartArea: c, scales: u } = l;
            let f,
              h,
              p,
              d = 0;
            const g = o - s,
              m = a - r;
            if (t.isHorizontal()) {
              if (((h = Qe(i, r, a)), Y(n))) {
                const y = Object.keys(n)[0];
                p = u[y].getPixelForValue(n[y]) + g - e;
              } else
                p =
                  "center" === n ? (c.bottom + c.top) / 2 + g - e : W0(t, n, e);
              f = a - r;
            } else {
              if (Y(n)) {
                const y = Object.keys(n)[0];
                h = u[y].getPixelForValue(n[y]) - m + e;
              } else
                h =
                  "center" === n ? (c.left + c.right) / 2 - m + e : W0(t, n, e);
              (p = Qe(i, o, s)), (d = "left" === n ? -Me : Me);
            }
            return { titleX: h, titleY: p, maxWidth: f, rotation: d };
          })(this, l, n, a);
          Si(e, i.text, 0, 0, r, {
            color: i.color,
            maxWidth: d,
            rotation: f,
            textAlign: TR(a, n, s),
            textBaseline: "middle",
            translation: [c, u],
          });
        }
        draw(e) {
          !this._isVisible() ||
            (this.drawBackground(),
            this.drawGrid(e),
            this.drawBorder(),
            this.drawTitle(),
            this.drawLabels(e));
        }
        _layers() {
          const e = this.options,
            n = (e.ticks && e.ticks.z) || 0,
            i = H(e.grid && e.grid.z, -1),
            s = H(e.border && e.border.z, 0);
          return this._isVisible() && this.draw === Ni.prototype.draw
            ? [
                {
                  z: i,
                  draw: (r) => {
                    this.drawBackground(), this.drawGrid(r), this.drawTitle();
                  },
                },
                {
                  z: s,
                  draw: () => {
                    this.drawBorder();
                  },
                },
                {
                  z: n,
                  draw: (r) => {
                    this.drawLabels(r);
                  },
                },
              ]
            : [
                {
                  z: n,
                  draw: (r) => {
                    this.draw(r);
                  },
                },
              ];
        }
        getMatchingVisibleMetas(e) {
          const n = this.chart.getSortedVisibleDatasetMetas(),
            i = this.axis + "AxisID",
            s = [];
          let r, o;
          for (r = 0, o = n.length; r < o; ++r) {
            const a = n[r];
            a[i] === this.id && (!e || a.type === e) && s.push(a);
          }
          return s;
        }
        _resolveTickFontOptions(e) {
          return Ve(this.options.ticks.setContext(this.getContext(e)).font);
        }
        _maxDigits() {
          const e = this._resolveTickFontOptions(0).lineHeight;
          return (this.isHorizontal() ? this.width : this.height) / e;
        }
      }
      class Dl {
        constructor(e, n, i) {
          (this.type = e),
            (this.scope = n),
            (this.override = i),
            (this.items = Object.create(null));
        }
        isForType(e) {
          return Object.prototype.isPrototypeOf.call(
            this.type.prototype,
            e.prototype
          );
        }
        register(e) {
          const n = Object.getPrototypeOf(e);
          let i;
          (function kR(t) {
            return "id" in t && "defaults" in t;
          })(n) && (i = this.register(n));
          const s = this.items,
            r = e.id,
            o = this.scope + "." + r;
          if (!r) throw new Error("class does not have id: " + e);
          return (
            r in s ||
              ((s[r] = e),
              (function PR(t, e, n) {
                const i = jr(Object.create(null), [
                  n ? Se.get(n) : {},
                  Se.get(e),
                  t.defaults,
                ]);
                Se.set(e, i),
                  t.defaultRoutes &&
                    (function OR(t, e) {
                      Object.keys(e).forEach((n) => {
                        const i = n.split("."),
                          s = i.pop(),
                          r = [t].concat(i).join("."),
                          o = e[n].split("."),
                          a = o.pop(),
                          l = o.join(".");
                        Se.route(r, s, l, a);
                      });
                    })(e, t.defaultRoutes),
                  t.descriptors && Se.describe(e, t.descriptors);
              })(e, o, i),
              this.override && Se.override(e.id, e.overrides)),
            o
          );
        }
        get(e) {
          return this.items[e];
        }
        unregister(e) {
          const n = this.items,
            i = e.id,
            s = this.scope;
          i in n && delete n[i],
            s && i in Se[s] && (delete Se[s][i], this.override && delete Ei[i]);
        }
      }
      class NR {
        constructor() {
          (this.controllers = new Dl(Jt, "datasets", !0)),
            (this.elements = new Dl(en, "elements")),
            (this.plugins = new Dl(Object, "plugins")),
            (this.scales = new Dl(Ni, "scales")),
            (this._typedRegistries = [
              this.controllers,
              this.scales,
              this.elements,
            ]);
        }
        add(...e) {
          this._each("register", e);
        }
        remove(...e) {
          this._each("unregister", e);
        }
        addControllers(...e) {
          this._each("register", e, this.controllers);
        }
        addElements(...e) {
          this._each("register", e, this.elements);
        }
        addPlugins(...e) {
          this._each("register", e, this.plugins);
        }
        addScales(...e) {
          this._each("register", e, this.scales);
        }
        getController(e) {
          return this._get(e, this.controllers, "controller");
        }
        getElement(e) {
          return this._get(e, this.elements, "element");
        }
        getPlugin(e) {
          return this._get(e, this.plugins, "plugin");
        }
        getScale(e) {
          return this._get(e, this.scales, "scale");
        }
        removeControllers(...e) {
          this._each("unregister", e, this.controllers);
        }
        removeElements(...e) {
          this._each("unregister", e, this.elements);
        }
        removePlugins(...e) {
          this._each("unregister", e, this.plugins);
        }
        removeScales(...e) {
          this._each("unregister", e, this.scales);
        }
        _each(e, n, i) {
          [...n].forEach((s) => {
            const r = i || this._getRegistryForType(s);
            i || r.isForType(s) || (r === this.plugins && s.id)
              ? this._exec(e, r, s)
              : ae(s, (o) => {
                  const a = i || this._getRegistryForType(o);
                  this._exec(e, a, o);
                });
          });
        }
        _exec(e, n, i) {
          const s = ff(e);
          pe(i["before" + s], [], i), n[e](i), pe(i["after" + s], [], i);
        }
        _getRegistryForType(e) {
          for (let n = 0; n < this._typedRegistries.length; n++) {
            const i = this._typedRegistries[n];
            if (i.isForType(e)) return i;
          }
          return this.plugins;
        }
        _get(e, n, i) {
          const s = n.get(e);
          if (void 0 === s)
            throw new Error('"' + e + '" is not a registered ' + i + ".");
          return s;
        }
      }
      var gn = new NR();
      class FR {
        constructor() {
          this._init = [];
        }
        notify(e, n, i, s) {
          "beforeInit" === n &&
            ((this._init = this._createDescriptors(e, !0)),
            this._notify(this._init, e, "install"));
          const r = s ? this._descriptors(e).filter(s) : this._descriptors(e),
            o = this._notify(r, e, n, i);
          return (
            "afterDestroy" === n &&
              (this._notify(r, e, "stop"),
              this._notify(this._init, e, "uninstall")),
            o
          );
        }
        _notify(e, n, i, s) {
          s = s || {};
          for (const r of e) {
            const o = r.plugin;
            if (!1 === pe(o[i], [n, s, r.options], o) && s.cancelable)
              return !1;
          }
          return !0;
        }
        invalidate() {
          Q(this._cache) ||
            ((this._oldCache = this._cache), (this._cache = void 0));
        }
        _descriptors(e) {
          if (this._cache) return this._cache;
          const n = (this._cache = this._createDescriptors(e));
          return this._notifyStateChanges(e), n;
        }
        _createDescriptors(e, n) {
          const i = e && e.config,
            s = H(i.options && i.options.plugins, {}),
            r = (function RR(t) {
              const e = {},
                n = [],
                i = Object.keys(gn.plugins.items);
              for (let r = 0; r < i.length; r++) n.push(gn.getPlugin(i[r]));
              const s = t.plugins || [];
              for (let r = 0; r < s.length; r++) {
                const o = s[r];
                -1 === n.indexOf(o) && (n.push(o), (e[o.id] = !0));
              }
              return { plugins: n, localIds: e };
            })(i);
          return !1 !== s || n
            ? (function BR(t, { plugins: e, localIds: n }, i, s) {
                const r = [],
                  o = t.getContext();
                for (const a of e) {
                  const l = a.id,
                    c = LR(i[l], s);
                  null !== c &&
                    r.push({
                      plugin: a,
                      options: jR(t.config, { plugin: a, local: n[l] }, c, o),
                    });
                }
                return r;
              })(e, r, s, n)
            : [];
        }
        _notifyStateChanges(e) {
          const n = this._oldCache || [],
            i = this._cache,
            s = (r, o) =>
              r.filter((a) => !o.some((l) => a.plugin.id === l.plugin.id));
          this._notify(s(n, i), e, "stop"), this._notify(s(i, n), e, "start");
        }
      }
      function LR(t, e) {
        return e || !1 !== t ? (!0 === t ? {} : t) : null;
      }
      function jR(t, { plugin: e, local: n }, i, s) {
        const r = t.pluginScopeKeys(e),
          o = t.getOptionScopes(i, r);
        return (
          n && e.defaults && o.push(e.defaults),
          t.createResolver(o, s, [""], {
            scriptable: !1,
            indexable: !1,
            allKeys: !0,
          })
        );
      }
      function Nf(t, e) {
        return (
          ((e.datasets || {})[t] || {}).indexAxis ||
          e.indexAxis ||
          (Se.datasets[t] || {}).indexAxis ||
          "x"
        );
      }
      function wl(t, e) {
        if (
          "x" === t ||
          "y" === t ||
          "r" === t ||
          (t =
            e.axis ||
            (function $R(t) {
              return "top" === t || "bottom" === t
                ? "x"
                : "left" === t || "right" === t
                ? "y"
                : void 0;
            })(e.position) ||
            (t.length > 1 && wl(t[0].toLowerCase(), e)))
        )
          return t;
        throw new Error(
          `Cannot determine type of '${name}' axis. Please provide 'axis' or 'position' option.`
        );
      }
      function Y0(t) {
        const e = t.options || (t.options = {});
        (e.plugins = H(e.plugins, {})),
          (e.scales = (function zR(t, e) {
            const n = Ei[t.type] || { scales: {} },
              i = e.scales || {},
              s = Nf(t.type, e),
              r = Object.create(null);
            return (
              Object.keys(i).forEach((o) => {
                const a = i[o];
                if (!Y(a))
                  return console.error(
                    `Invalid scale configuration for scale: ${o}`
                  );
                if (a._proxy)
                  return console.warn(
                    `Ignoring resolver passed as options for scale: ${o}`
                  );
                const l = wl(o, a),
                  c = (function HR(t, e) {
                    return t === e ? "_index_" : "_value_";
                  })(l, s),
                  u = n.scales || {};
                r[o] = Vr(Object.create(null), [{ axis: l }, a, u[l], u[c]]);
              }),
              t.data.datasets.forEach((o) => {
                const a = o.type || t.type,
                  l = o.indexAxis || Nf(a, e),
                  u = (Ei[a] || {}).scales || {};
                Object.keys(u).forEach((d) => {
                  const f = (function VR(t, e) {
                      let n = t;
                      return (
                        "_index_" === t
                          ? (n = e)
                          : "_value_" === t && (n = "x" === e ? "y" : "x"),
                        n
                      );
                    })(d, l),
                    h = o[f + "AxisID"] || f;
                  (r[h] = r[h] || Object.create(null)),
                    Vr(r[h], [{ axis: f }, i[h], u[d]]);
                });
              }),
              Object.keys(r).forEach((o) => {
                const a = r[o];
                Vr(a, [Se.scales[a.type], Se.scale]);
              }),
              r
            );
          })(t, e));
      }
      function K0(t) {
        return (
          ((t = t || {}).datasets = t.datasets || []),
          (t.labels = t.labels || []),
          t
        );
      }
      const X0 = new Map(),
        Z0 = new Set();
      function Cl(t, e) {
        let n = X0.get(t);
        return n || ((n = e()), X0.set(t, n), Z0.add(n)), n;
      }
      const io = (t, e, n) => {
        const i = ei(e, n);
        void 0 !== i && t.add(i);
      };
      class WR {
        constructor(e) {
          (this._config = (function UR(t) {
            return ((t = t || {}).data = K0(t.data)), Y0(t), t;
          })(e)),
            (this._scopeCache = new Map()),
            (this._resolverCache = new Map());
        }
        get platform() {
          return this._config.platform;
        }
        get type() {
          return this._config.type;
        }
        set type(e) {
          this._config.type = e;
        }
        get data() {
          return this._config.data;
        }
        set data(e) {
          this._config.data = K0(e);
        }
        get options() {
          return this._config.options;
        }
        set options(e) {
          this._config.options = e;
        }
        get plugins() {
          return this._config.plugins;
        }
        update() {
          const e = this._config;
          this.clearCache(), Y0(e);
        }
        clearCache() {
          this._scopeCache.clear(), this._resolverCache.clear();
        }
        datasetScopeKeys(e) {
          return Cl(e, () => [[`datasets.${e}`, ""]]);
        }
        datasetAnimationScopeKeys(e, n) {
          return Cl(`${e}.transition.${n}`, () => [
            [`datasets.${e}.transitions.${n}`, `transitions.${n}`],
            [`datasets.${e}`, ""],
          ]);
        }
        datasetElementScopeKeys(e, n) {
          return Cl(`${e}-${n}`, () => [
            [
              `datasets.${e}.elements.${n}`,
              `datasets.${e}`,
              `elements.${n}`,
              "",
            ],
          ]);
        }
        pluginScopeKeys(e) {
          const n = e.id;
          return Cl(`${this.type}-plugin-${n}`, () => [
            [`plugins.${n}`, ...(e.additionalOptionScopes || [])],
          ]);
        }
        _cachedScopes(e, n) {
          const i = this._scopeCache;
          let s = i.get(e);
          return (!s || n) && ((s = new Map()), i.set(e, s)), s;
        }
        getOptionScopes(e, n, i) {
          const { options: s, type: r } = this,
            o = this._cachedScopes(e, i),
            a = o.get(n);
          if (a) return a;
          const l = new Set();
          n.forEach((u) => {
            e && (l.add(e), u.forEach((d) => io(l, e, d))),
              u.forEach((d) => io(l, s, d)),
              u.forEach((d) => io(l, Ei[r] || {}, d)),
              u.forEach((d) => io(l, Se, d)),
              u.forEach((d) => io(l, _f, d));
          });
          const c = Array.from(l);
          return (
            0 === c.length && c.push(Object.create(null)),
            Z0.has(n) && o.set(n, c),
            c
          );
        }
        chartOptionScopes() {
          const { options: e, type: n } = this;
          return [e, Ei[n] || {}, Se.datasets[n] || {}, { type: n }, Se, _f];
        }
        resolveNamedOptions(e, n, i, s = [""]) {
          const r = { $shared: !0 },
            { resolver: o, subPrefixes: a } = Q0(this._resolverCache, e, s);
          let l = o;
          (function qR(t, e) {
            const { isScriptable: n, isIndexable: i } = t0(t);
            for (const s of e) {
              const r = n(s),
                o = i(s),
                a = (o || r) && t[s];
              if ((r && (ti(a) || GR(a))) || (o && ge(a))) return !0;
            }
            return !1;
          })(o, n) &&
            ((r.$shared = !1),
            (l = Ps(o, (i = ti(i) ? i() : i), this.createResolver(e, i, a))));
          for (const c of n) r[c] = l[c];
          return r;
        }
        createResolver(e, n, i = [""], s) {
          const { resolver: r } = Q0(this._resolverCache, e, i);
          return Y(n) ? Ps(r, n, void 0, s) : r;
        }
      }
      function Q0(t, e, n) {
        let i = t.get(e);
        i || ((i = new Map()), t.set(e, i));
        const s = n.join();
        let r = i.get(s);
        return (
          r ||
            ((r = {
              resolver: wf(e, n),
              subPrefixes: n.filter((a) => !a.toLowerCase().includes("hover")),
            }),
            i.set(s, r)),
          r
        );
      }
      const GR = (t) =>
          Y(t) &&
          Object.getOwnPropertyNames(t).reduce((e, n) => e || ti(t[n]), !1),
        KR = ["top", "bottom", "left", "right", "chartArea"];
      function J0(t, e) {
        return (
          "top" === t || "bottom" === t || (-1 === KR.indexOf(t) && "x" === e)
        );
      }
      function eD(t, e) {
        return function (n, i) {
          return n[t] === i[t] ? n[e] - i[e] : n[t] - i[t];
        };
      }
      function tD(t) {
        const e = t.chart,
          n = e.options.animation;
        e.notifyPlugins("afterRender"), pe(n && n.onComplete, [t], e);
      }
      function XR(t) {
        const e = t.chart,
          n = e.options.animation;
        pe(n && n.onProgress, [t], e);
      }
      function nD(t) {
        return (
          u0() && "string" == typeof t
            ? (t = document.getElementById(t))
            : t && t.length && (t = t[0]),
          t && t.canvas && (t = t.canvas),
          t
        );
      }
      const xl = {},
        iD = (t) => {
          const e = nD(t);
          return Object.values(xl)
            .filter((n) => n.canvas === e)
            .pop();
        };
      function ZR(t, e, n) {
        const i = Object.keys(t);
        for (const s of i) {
          const r = +s;
          if (r >= e) {
            const o = t[s];
            delete t[s], (n > 0 || r > e) && (t[r + n] = o);
          }
        }
      }
      class tn {
        static register(...e) {
          gn.add(...e), sD();
        }
        static unregister(...e) {
          gn.remove(...e), sD();
        }
        constructor(e, n) {
          const i = (this.config = new WR(n)),
            s = nD(e),
            r = iD(s);
          if (r)
            throw new Error(
              "Canvas is already in use. Chart with ID '" +
                r.id +
                "' must be destroyed before the canvas with ID '" +
                r.canvas.id +
                "' can be reused."
            );
          const o = i.createResolver(i.chartOptionScopes(), this.getContext());
          (this.platform = new (i.platform ||
            (function yR(t) {
              return !u0() ||
                (typeof OffscreenCanvas < "u" && t instanceof OffscreenCanvas)
                ? sR
                : mR;
            })(s))()),
            this.platform.updateConfig(i);
          const a = this.platform.acquireContext(s, o.aspectRatio),
            l = a && a.canvas,
            c = l && l.height,
            u = l && l.width;
          (this.id = nN()),
            (this.ctx = a),
            (this.canvas = l),
            (this.width = u),
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
            (this._plugins = new FR()),
            (this.$proxies = {}),
            (this._hiddenIndices = {}),
            (this.attached = !1),
            (this._animationsDisabled = void 0),
            (this.$context = void 0),
            (this._doResize = (function _N(t, e) {
              let n;
              return function (...i) {
                return (
                  e
                    ? (clearTimeout(n), (n = setTimeout(t, e, i)))
                    : t.apply(this, i),
                  e
                );
              };
            })((d) => this.update(d), o.resizeDelay || 0)),
            (this._dataChanges = []),
            (xl[this.id] = this),
            a && l
              ? (Bn.listen(this, "complete", tD),
                Bn.listen(this, "progress", XR),
                this._initialize(),
                this.attached && this.update())
              : console.error(
                  "Failed to create chart: can't acquire context from the given item"
                );
        }
        get aspectRatio() {
          const {
            options: { aspectRatio: e, maintainAspectRatio: n },
            width: i,
            height: s,
            _aspectRatio: r,
          } = this;
          return Q(e) ? (n && r ? r : s ? i / s : null) : e;
        }
        get data() {
          return this.config.data;
        }
        set data(e) {
          this.config.data = e;
        }
        get options() {
          return this._options;
        }
        set options(e) {
          this.config.options = e;
        }
        get registry() {
          return gn;
        }
        _initialize() {
          return (
            this.notifyPlugins("beforeInit"),
            this.options.responsive
              ? this.resize()
              : d0(this, this.options.devicePixelRatio),
            this.bindEvents(),
            this.notifyPlugins("afterInit"),
            this
          );
        }
        clear() {
          return Qv(this.canvas, this.ctx), this;
        }
        stop() {
          return Bn.stop(this), this;
        }
        resize(e, n) {
          Bn.running(this)
            ? (this._resizeBeforeDraw = { width: e, height: n })
            : this._resize(e, n);
        }
        _resize(e, n) {
          const i = this.options,
            o = this.platform.getMaximumSize(
              this.canvas,
              e,
              n,
              i.maintainAspectRatio && this.aspectRatio
            ),
            a = i.devicePixelRatio || this.platform.getDevicePixelRatio(),
            l = this.width ? "resize" : "attach";
          (this.width = o.width),
            (this.height = o.height),
            (this._aspectRatio = this.aspectRatio),
            d0(this, a, !0) &&
              (this.notifyPlugins("resize", { size: o }),
              pe(i.onResize, [this, o], this),
              this.attached && this._doResize(l) && this.render());
        }
        ensureScalesHaveIDs() {
          ae(this.options.scales || {}, (i, s) => {
            i.id = s;
          });
        }
        buildOrUpdateScales() {
          const e = this.options,
            n = e.scales,
            i = this.scales,
            s = Object.keys(i).reduce((o, a) => ((o[a] = !1), o), {});
          let r = [];
          n &&
            (r = r.concat(
              Object.keys(n).map((o) => {
                const a = n[o],
                  l = wl(o, a),
                  c = "r" === l,
                  u = "x" === l;
                return {
                  options: a,
                  dposition: c ? "chartArea" : u ? "bottom" : "left",
                  dtype: c ? "radialLinear" : u ? "category" : "linear",
                };
              })
            )),
            ae(r, (o) => {
              const a = o.options,
                l = a.id,
                c = wl(l, a),
                u = H(a.type, o.dtype);
              (void 0 === a.position ||
                J0(a.position, c) !== J0(o.dposition)) &&
                (a.position = o.dposition),
                (s[l] = !0);
              let d = null;
              l in i && i[l].type === u
                ? (d = i[l])
                : ((d = new (gn.getScale(u))({
                    id: l,
                    type: u,
                    ctx: this.ctx,
                    chart: this,
                  })),
                  (i[d.id] = d)),
                d.init(a, e);
            }),
            ae(s, (o, a) => {
              o || delete i[a];
            }),
            ae(i, (o) => {
              et.configure(this, o, o.options), et.addBox(this, o);
            });
        }
        _updateMetasets() {
          const e = this._metasets,
            n = this.data.datasets.length,
            i = e.length;
          if ((e.sort((s, r) => s.index - r.index), i > n)) {
            for (let s = n; s < i; ++s) this._destroyDatasetMeta(s);
            e.splice(n, i - n);
          }
          this._sortedMetasets = e.slice(0).sort(eD("order", "index"));
        }
        _removeUnreferencedMetasets() {
          const {
            _metasets: e,
            data: { datasets: n },
          } = this;
          e.length > n.length && delete this._stacks,
            e.forEach((i, s) => {
              0 === n.filter((r) => r === i._dataset).length &&
                this._destroyDatasetMeta(s);
            });
        }
        buildOrUpdateControllers() {
          const e = [],
            n = this.data.datasets;
          let i, s;
          for (
            this._removeUnreferencedMetasets(), i = 0, s = n.length;
            i < s;
            i++
          ) {
            const r = n[i];
            let o = this.getDatasetMeta(i);
            const a = r.type || this.config.type;
            if (
              (o.type &&
                o.type !== a &&
                (this._destroyDatasetMeta(i), (o = this.getDatasetMeta(i))),
              (o.type = a),
              (o.indexAxis = r.indexAxis || Nf(a, this.options)),
              (o.order = r.order || 0),
              (o.index = i),
              (o.label = "" + r.label),
              (o.visible = this.isDatasetVisible(i)),
              o.controller)
            )
              o.controller.updateIndex(i), o.controller.linkScales();
            else {
              const l = gn.getController(a),
                { datasetElementType: c, dataElementType: u } = Se.datasets[a];
              Object.assign(l, {
                dataElementType: gn.getElement(u),
                datasetElementType: c && gn.getElement(c),
              }),
                (o.controller = new l(this, i)),
                e.push(o.controller);
            }
          }
          return this._updateMetasets(), e;
        }
        _resetElements() {
          ae(
            this.data.datasets,
            (e, n) => {
              this.getDatasetMeta(n).controller.reset();
            },
            this
          );
        }
        reset() {
          this._resetElements(), this.notifyPlugins("reset");
        }
        update(e) {
          const n = this.config;
          n.update();
          const i = (this._options = n.createResolver(
              n.chartOptionScopes(),
              this.getContext()
            )),
            s = (this._animationsDisabled = !i.animation);
          if (
            (this._updateScales(),
            this._checkEventBindings(),
            this._updateHiddenIndices(),
            this._plugins.invalidate(),
            !1 ===
              this.notifyPlugins("beforeUpdate", { mode: e, cancelable: !0 }))
          )
            return;
          const r = this.buildOrUpdateControllers();
          this.notifyPlugins("beforeElementsUpdate");
          let o = 0;
          for (let c = 0, u = this.data.datasets.length; c < u; c++) {
            const { controller: d } = this.getDatasetMeta(c),
              f = !s && -1 === r.indexOf(d);
            d.buildOrUpdateElements(f), (o = Math.max(+d.getMaxOverflow(), o));
          }
          (o = this._minPadding = i.layout.autoPadding ? o : 0),
            this._updateLayout(o),
            s ||
              ae(r, (c) => {
                c.reset();
              }),
            this._updateDatasets(e),
            this.notifyPlugins("afterUpdate", { mode: e }),
            this._layers.sort(eD("z", "_idx"));
          const { _active: a, _lastEvent: l } = this;
          l
            ? this._eventHandler(l, !0)
            : a.length && this._updateHoverStyles(a, a, !0),
            this.render();
        }
        _updateScales() {
          ae(this.scales, (e) => {
            et.removeBox(this, e);
          }),
            this.ensureScalesHaveIDs(),
            this.buildOrUpdateScales();
        }
        _checkEventBindings() {
          const e = this.options,
            n = new Set(Object.keys(this._listeners)),
            i = new Set(e.events);
          (!kv(n, i) || !!this._responsiveListeners !== e.responsive) &&
            (this.unbindEvents(), this.bindEvents());
        }
        _updateHiddenIndices() {
          const { _hiddenIndices: e } = this,
            n = this._getUniformDataChanges() || [];
          for (const { method: i, start: s, count: r } of n)
            ZR(e, s, "_removeElements" === i ? -r : r);
        }
        _getUniformDataChanges() {
          const e = this._dataChanges;
          if (!e || !e.length) return;
          this._dataChanges = [];
          const n = this.data.datasets.length,
            i = (r) =>
              new Set(
                e
                  .filter((o) => o[0] === r)
                  .map((o, a) => a + "," + o.splice(1).join(","))
              ),
            s = i(0);
          for (let r = 1; r < n; r++) if (!kv(s, i(r))) return;
          return Array.from(s)
            .map((r) => r.split(","))
            .map((r) => ({ method: r[1], start: +r[2], count: +r[3] }));
        }
        _updateLayout(e) {
          if (!1 === this.notifyPlugins("beforeLayout", { cancelable: !0 }))
            return;
          et.update(this, this.width, this.height, e);
          const n = this.chartArea,
            i = n.width <= 0 || n.height <= 0;
          (this._layers = []),
            ae(
              this.boxes,
              (s) => {
                (i && "chartArea" === s.position) ||
                  (s.configure && s.configure(),
                  this._layers.push(...s._layers()));
              },
              this
            ),
            this._layers.forEach((s, r) => {
              s._idx = r;
            }),
            this.notifyPlugins("afterLayout");
        }
        _updateDatasets(e) {
          if (
            !1 !==
            this.notifyPlugins("beforeDatasetsUpdate", {
              mode: e,
              cancelable: !0,
            })
          ) {
            for (let n = 0, i = this.data.datasets.length; n < i; ++n)
              this.getDatasetMeta(n).controller.configure();
            for (let n = 0, i = this.data.datasets.length; n < i; ++n)
              this._updateDataset(n, ti(e) ? e({ datasetIndex: n }) : e);
            this.notifyPlugins("afterDatasetsUpdate", { mode: e });
          }
        }
        _updateDataset(e, n) {
          const i = this.getDatasetMeta(e),
            s = { meta: i, index: e, mode: n, cancelable: !0 };
          !1 !== this.notifyPlugins("beforeDatasetUpdate", s) &&
            (i.controller._update(n),
            (s.cancelable = !1),
            this.notifyPlugins("afterDatasetUpdate", s));
        }
        render() {
          !1 !== this.notifyPlugins("beforeRender", { cancelable: !0 }) &&
            (Bn.has(this)
              ? this.attached && !Bn.running(this) && Bn.start(this)
              : (this.draw(), tD({ chart: this })));
        }
        draw() {
          let e;
          if (this._resizeBeforeDraw) {
            const { width: i, height: s } = this._resizeBeforeDraw;
            this._resize(i, s), (this._resizeBeforeDraw = null);
          }
          if (
            (this.clear(),
            this.width <= 0 ||
              this.height <= 0 ||
              !1 === this.notifyPlugins("beforeDraw", { cancelable: !0 }))
          )
            return;
          const n = this._layers;
          for (e = 0; e < n.length && n[e].z <= 0; ++e)
            n[e].draw(this.chartArea);
          for (this._drawDatasets(); e < n.length; ++e)
            n[e].draw(this.chartArea);
          this.notifyPlugins("afterDraw");
        }
        _getSortedDatasetMetas(e) {
          const n = this._sortedMetasets,
            i = [];
          let s, r;
          for (s = 0, r = n.length; s < r; ++s) {
            const o = n[s];
            (!e || o.visible) && i.push(o);
          }
          return i;
        }
        getSortedVisibleDatasetMetas() {
          return this._getSortedDatasetMetas(!0);
        }
        _drawDatasets() {
          if (
            !1 === this.notifyPlugins("beforeDatasetsDraw", { cancelable: !0 })
          )
            return;
          const e = this.getSortedVisibleDatasetMetas();
          for (let n = e.length - 1; n >= 0; --n) this._drawDataset(e[n]);
          this.notifyPlugins("afterDatasetsDraw");
        }
        _drawDataset(e) {
          const n = this.ctx,
            i = e._clip,
            s = !i.disabled,
            r =
              (function JR(t) {
                const { xScale: e, yScale: n } = t;
                if (e && n)
                  return {
                    left: e.left,
                    right: e.right,
                    top: n.top,
                    bottom: n.bottom,
                  };
              })(e) || this.chartArea,
            o = { meta: e, index: e.index, cancelable: !0 };
          !1 !== this.notifyPlugins("beforeDatasetDraw", o) &&
            (s &&
              ol(n, {
                left: !1 === i.left ? 0 : r.left - i.left,
                right: !1 === i.right ? this.width : r.right + i.right,
                top: !1 === i.top ? 0 : r.top - i.top,
                bottom: !1 === i.bottom ? this.height : r.bottom + i.bottom,
              }),
            e.controller.draw(),
            s && al(n),
            (o.cancelable = !1),
            this.notifyPlugins("afterDatasetDraw", o));
        }
        isPointInArea(e) {
          return Gr(e, this.chartArea, this._minPadding);
        }
        getElementsAtEventForMode(e, n, i, s) {
          const r = XF.modes[n];
          return "function" == typeof r ? r(this, e, i, s) : [];
        }
        getDatasetMeta(e) {
          const n = this.data.datasets[e],
            i = this._metasets;
          let s = i.filter((r) => r && r._dataset === n).pop();
          return (
            s ||
              ((s = {
                type: null,
                data: [],
                dataset: null,
                controller: null,
                hidden: null,
                xAxisID: null,
                yAxisID: null,
                order: (n && n.order) || 0,
                index: e,
                _dataset: n,
                _parsed: [],
                _sorted: !1,
              }),
              i.push(s)),
            s
          );
        }
        getContext() {
          return (
            this.$context ||
            (this.$context = ii(null, { chart: this, type: "chart" }))
          );
        }
        getVisibleDatasetCount() {
          return this.getSortedVisibleDatasetMetas().length;
        }
        isDatasetVisible(e) {
          const n = this.data.datasets[e];
          if (!n) return !1;
          const i = this.getDatasetMeta(e);
          return "boolean" == typeof i.hidden ? !i.hidden : !n.hidden;
        }
        setDatasetVisibility(e, n) {
          this.getDatasetMeta(e).hidden = !n;
        }
        toggleDataVisibility(e) {
          this._hiddenIndices[e] = !this._hiddenIndices[e];
        }
        getDataVisibility(e) {
          return !this._hiddenIndices[e];
        }
        _updateVisibility(e, n, i) {
          const s = i ? "show" : "hide",
            r = this.getDatasetMeta(e),
            o = r.controller._resolveAnimations(void 0, s);
          jt(n)
            ? ((r.data[n].hidden = !i), this.update())
            : (this.setDatasetVisibility(e, i),
              o.update(r, { visible: i }),
              this.update((a) => (a.datasetIndex === e ? s : void 0)));
        }
        hide(e, n) {
          this._updateVisibility(e, n, !1);
        }
        show(e, n) {
          this._updateVisibility(e, n, !0);
        }
        _destroyDatasetMeta(e) {
          const n = this._metasets[e];
          n && n.controller && n.controller._destroy(),
            delete this._metasets[e];
        }
        _stop() {
          let e, n;
          for (
            this.stop(), Bn.remove(this), e = 0, n = this.data.datasets.length;
            e < n;
            ++e
          )
            this._destroyDatasetMeta(e);
        }
        destroy() {
          this.notifyPlugins("beforeDestroy");
          const { canvas: e, ctx: n } = this;
          this._stop(),
            this.config.clearCache(),
            e &&
              (this.unbindEvents(),
              Qv(e, n),
              this.platform.releaseContext(n),
              (this.canvas = null),
              (this.ctx = null)),
            delete xl[this.id],
            this.notifyPlugins("afterDestroy");
        }
        toBase64Image(...e) {
          return this.canvas.toDataURL(...e);
        }
        bindEvents() {
          this.bindUserEvents(),
            this.options.responsive
              ? this.bindResponsiveEvents()
              : (this.attached = !0);
        }
        bindUserEvents() {
          const e = this._listeners,
            n = this.platform,
            i = (r, o) => {
              n.addEventListener(this, r, o), (e[r] = o);
            },
            s = (r, o, a) => {
              (r.offsetX = o), (r.offsetY = a), this._eventHandler(r);
            };
          ae(this.options.events, (r) => i(r, s));
        }
        bindResponsiveEvents() {
          this._responsiveListeners || (this._responsiveListeners = {});
          const e = this._responsiveListeners,
            n = this.platform,
            i = (l, c) => {
              n.addEventListener(this, l, c), (e[l] = c);
            },
            s = (l, c) => {
              e[l] && (n.removeEventListener(this, l, c), delete e[l]);
            },
            r = (l, c) => {
              this.canvas && this.resize(l, c);
            };
          let o;
          const a = () => {
            s("attach", a),
              (this.attached = !0),
              this.resize(),
              i("resize", r),
              i("detach", o);
          };
          (o = () => {
            (this.attached = !1),
              s("resize", r),
              this._stop(),
              this._resize(0, 0),
              i("attach", a);
          }),
            n.isAttached(this.canvas) ? a() : o();
        }
        unbindEvents() {
          ae(this._listeners, (e, n) => {
            this.platform.removeEventListener(this, n, e);
          }),
            (this._listeners = {}),
            ae(this._responsiveListeners, (e, n) => {
              this.platform.removeEventListener(this, n, e);
            }),
            (this._responsiveListeners = void 0);
        }
        updateHoverStyle(e, n, i) {
          const s = i ? "set" : "remove";
          let r, o, a, l;
          for (
            "dataset" === n &&
              ((r = this.getDatasetMeta(e[0].datasetIndex)),
              r.controller["_" + s + "DatasetHoverStyle"]()),
              a = 0,
              l = e.length;
            a < l;
            ++a
          ) {
            o = e[a];
            const c = o && this.getDatasetMeta(o.datasetIndex).controller;
            c && c[s + "HoverStyle"](o.element, o.datasetIndex, o.index);
          }
        }
        getActiveElements() {
          return this._active || [];
        }
        setActiveElements(e) {
          const n = this._active || [],
            i = e.map(({ datasetIndex: r, index: o }) => {
              const a = this.getDatasetMeta(r);
              if (!a) throw new Error("No dataset found at index " + r);
              return { datasetIndex: r, element: a.data[o], index: o };
            });
          !el(i, n) &&
            ((this._active = i),
            (this._lastEvent = null),
            this._updateHoverStyles(i, n));
        }
        notifyPlugins(e, n, i) {
          return this._plugins.notify(this, e, n, i);
        }
        isPluginEnabled(e) {
          return (
            1 === this._plugins._cache.filter((n) => n.plugin.id === e).length
          );
        }
        _updateHoverStyles(e, n, i) {
          const s = this.options.hover,
            r = (l, c) =>
              l.filter(
                (u) =>
                  !c.some(
                    (d) =>
                      u.datasetIndex === d.datasetIndex && u.index === d.index
                  )
              ),
            o = r(n, e),
            a = i ? e : r(e, n);
          o.length && this.updateHoverStyle(o, s.mode, !1),
            a.length && s.mode && this.updateHoverStyle(a, s.mode, !0);
        }
        _eventHandler(e, n) {
          const i = {
              event: e,
              replay: n,
              cancelable: !0,
              inChartArea: this.isPointInArea(e),
            },
            s = (o) =>
              (o.options.events || this.options.events).includes(e.native.type);
          if (!1 === this.notifyPlugins("beforeEvent", i, s)) return;
          const r = this._handleEvent(e, n, i.inChartArea);
          return (
            (i.cancelable = !1),
            this.notifyPlugins("afterEvent", i, s),
            (r || i.changed) && this.render(),
            this
          );
        }
        _handleEvent(e, n, i) {
          const { _active: s = [], options: r } = this,
            a = this._getActiveElements(e, s, i, n),
            l = (function lN(t) {
              return (
                "mouseup" === t.type ||
                "click" === t.type ||
                "contextmenu" === t.type
              );
            })(e),
            c = (function QR(t, e, n, i) {
              return n && "mouseout" !== t.type ? (i ? e : t) : null;
            })(e, this._lastEvent, i, l);
          i &&
            ((this._lastEvent = null),
            pe(r.onHover, [e, a, this], this),
            l && pe(r.onClick, [e, a, this], this));
          const u = !el(a, s);
          return (
            (u || n) && ((this._active = a), this._updateHoverStyles(a, s, n)),
            (this._lastEvent = c),
            u
          );
        }
        _getActiveElements(e, n, i, s) {
          if ("mouseout" === e.type) return [];
          if (!i) return n;
          const r = this.options.hover;
          return this.getElementsAtEventForMode(e, r.mode, r, s);
        }
      }
      function sD() {
        return ae(tn.instances, (t) => t._plugins.invalidate());
      }
      function Ns(t, e, n, i) {
        return { x: n + t * Math.cos(e), y: i + t * Math.sin(e) };
      }
      function El(t, e, n, i, s, r) {
        const { x: o, y: a, startAngle: l, pixelMargin: c, innerRadius: u } = e,
          d = Math.max(e.outerRadius + i + n - c, 0),
          f = u > 0 ? u + i + n + c : 0;
        let h = 0;
        const p = s - l;
        if (i) {
          const Ae = ((u > 0 ? u - i : 0) + (d > 0 ? d - i : 0)) / 2;
          h = (p - (0 !== Ae ? (p * Ae) / (Ae + i) : p)) / 2;
        }
        const m = (p - Math.max(0.001, p * d - n / be) / d) / 2,
          y = l + m + h,
          b = s - m - h,
          {
            outerStart: _,
            outerEnd: v,
            innerStart: D,
            innerEnd: C,
          } = (function nL(t, e, n, i) {
            const s = (function tL(t) {
                return Df(t, [
                  "outerStart",
                  "outerEnd",
                  "innerStart",
                  "innerEnd",
                ]);
              })(t.options.borderRadius),
              r = (n - e) / 2,
              o = Math.min(r, (i * e) / 2),
              a = (l) => {
                const c = ((n - Math.min(r, l)) * i) / 2;
                return $e(l, 0, Math.min(r, c));
              };
            return {
              outerStart: a(s.outerStart),
              outerEnd: a(s.outerEnd),
              innerStart: $e(s.innerStart, 0, o),
              innerEnd: $e(s.innerEnd, 0, o),
            };
          })(e, f, d, b - y),
          x = d - _,
          M = d - v,
          T = y + _ / x,
          B = b - v / M,
          j = f + D,
          K = f + C,
          Te = y + D / j,
          Ue = b - C / K;
        if ((t.beginPath(), r)) {
          const ee = (T + B) / 2;
          if ((t.arc(o, a, d, T, ee), t.arc(o, a, d, ee, B), v > 0)) {
            const tt = Ns(M, B, o, a);
            t.arc(tt.x, tt.y, v, B, b + Me);
          }
          const le = Ns(K, b, o, a);
          if ((t.lineTo(le.x, le.y), C > 0)) {
            const tt = Ns(K, Ue, o, a);
            t.arc(tt.x, tt.y, C, b + Me, Ue + Math.PI);
          }
          const Ae = (b - C / f + (y + D / f)) / 2;
          if (
            (t.arc(o, a, f, b - C / f, Ae, !0),
            t.arc(o, a, f, Ae, y + D / f, !0),
            D > 0)
          ) {
            const tt = Ns(j, Te, o, a);
            t.arc(tt.x, tt.y, D, Te + Math.PI, y - Me);
          }
          const nn = Ns(x, y, o, a);
          if ((t.lineTo(nn.x, nn.y), _ > 0)) {
            const tt = Ns(x, T, o, a);
            t.arc(tt.x, tt.y, _, y - Me, T);
          }
        } else {
          t.moveTo(o, a);
          const ee = Math.cos(T) * d + o,
            le = Math.sin(T) * d + a;
          t.lineTo(ee, le);
          const Ae = Math.cos(B) * d + o,
            nn = Math.sin(B) * d + a;
          t.lineTo(Ae, nn);
        }
        t.closePath();
      }
      I(tn, "defaults", Se),
        I(tn, "instances", xl),
        I(tn, "overrides", Ei),
        I(tn, "registry", gn),
        I(tn, "version", "4.1.2"),
        I(tn, "getChart", iD);
      class Ml extends en {
        constructor(e) {
          super(),
            (this.options = void 0),
            (this.circumference = void 0),
            (this.startAngle = void 0),
            (this.endAngle = void 0),
            (this.innerRadius = void 0),
            (this.outerRadius = void 0),
            (this.pixelMargin = 0),
            (this.fullCircles = 0),
            e && Object.assign(this, e);
        }
        inRange(e, n, i) {
          const s = this.getProps(["x", "y"], i),
            { angle: r, distance: o } = Bv(s, { x: e, y: n }),
            {
              startAngle: a,
              endAngle: l,
              innerRadius: c,
              outerRadius: u,
              circumference: d,
            } = this.getProps(
              [
                "startAngle",
                "endAngle",
                "innerRadius",
                "outerRadius",
                "circumference",
              ],
              i
            ),
            f = this.options.spacing / 2,
            p = H(d, l - a) >= me || $r(r, a, l),
            g = Rn(o, c + f, u + f);
          return p && g;
        }
        getCenterPoint(e) {
          const {
              x: n,
              y: i,
              startAngle: s,
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
              e
            ),
            { offset: l, spacing: c } = this.options,
            u = (s + r) / 2,
            d = (o + a + c + l) / 2;
          return { x: n + Math.cos(u) * d, y: i + Math.sin(u) * d };
        }
        tooltipPosition(e) {
          return this.getCenterPoint(e);
        }
        draw(e) {
          const { options: n, circumference: i } = this,
            s = (n.offset || 0) / 4,
            r = (n.spacing || 0) / 2,
            o = n.circular;
          if (
            ((this.pixelMargin = "inner" === n.borderAlign ? 0.33 : 0),
            (this.fullCircles = i > me ? Math.floor(i / me) : 0),
            0 === i || this.innerRadius < 0 || this.outerRadius < 0)
          )
            return;
          e.save();
          const a = (this.startAngle + this.endAngle) / 2;
          e.translate(Math.cos(a) * s, Math.sin(a) * s);
          const c = s * (1 - Math.sin(Math.min(be, i || 0)));
          (e.fillStyle = n.backgroundColor),
            (e.strokeStyle = n.borderColor),
            (function iL(t, e, n, i, s) {
              const { fullCircles: r, startAngle: o, circumference: a } = e;
              let l = e.endAngle;
              if (r) {
                El(t, e, n, i, l, s);
                for (let c = 0; c < r; ++c) t.fill();
                isNaN(a) || (l = o + (a % me || me));
              }
              El(t, e, n, i, l, s), t.fill();
            })(e, this, c, r, o),
            (function sL(t, e, n, i, s) {
              const {
                  fullCircles: r,
                  startAngle: o,
                  circumference: a,
                  options: l,
                } = e,
                { borderWidth: c, borderJoinStyle: u } = l,
                d = "inner" === l.borderAlign;
              if (!c) return;
              d
                ? ((t.lineWidth = 2 * c), (t.lineJoin = u || "round"))
                : ((t.lineWidth = c), (t.lineJoin = u || "bevel"));
              let f = e.endAngle;
              if (r) {
                El(t, e, n, i, f, s);
                for (let h = 0; h < r; ++h) t.stroke();
                isNaN(a) || (f = o + (a % me || me));
              }
              d &&
                (function eL(t, e, n) {
                  const {
                    startAngle: i,
                    pixelMargin: s,
                    x: r,
                    y: o,
                    outerRadius: a,
                    innerRadius: l,
                  } = e;
                  let c = s / a;
                  t.beginPath(),
                    t.arc(r, o, a, i - c, n + c),
                    l > s
                      ? ((c = s / l), t.arc(r, o, l, n + c, i - c, !0))
                      : t.arc(r, o, s, n + Me, i - Me),
                    t.closePath(),
                    t.clip();
                })(t, e, f),
                r || (El(t, e, n, i, f, s), t.stroke());
            })(e, this, c, r, o),
            e.restore();
        }
      }
      function rD(t, e, n = e) {
        (t.lineCap = H(n.borderCapStyle, e.borderCapStyle)),
          t.setLineDash(H(n.borderDash, e.borderDash)),
          (t.lineDashOffset = H(n.borderDashOffset, e.borderDashOffset)),
          (t.lineJoin = H(n.borderJoinStyle, e.borderJoinStyle)),
          (t.lineWidth = H(n.borderWidth, e.borderWidth)),
          (t.strokeStyle = H(n.borderColor, e.borderColor));
      }
      function rL(t, e, n) {
        t.lineTo(n.x, n.y);
      }
      function oD(t, e, n = {}) {
        const i = t.length,
          { start: s = 0, end: r = i - 1 } = n,
          { start: o, end: a } = e,
          l = Math.max(s, o),
          c = Math.min(r, a);
        return {
          count: i,
          start: l,
          loop: e.loop,
          ilen:
            c < l && !((s < o && r < o) || (s > a && r > a))
              ? i + c - l
              : c - l,
        };
      }
      function aL(t, e, n, i) {
        const { points: s, options: r } = e,
          { count: o, start: a, loop: l, ilen: c } = oD(s, n, i),
          u = (function oL(t) {
            return t.stepped
              ? AN
              : t.tension || "monotone" === t.cubicInterpolationMode
              ? PN
              : rL;
          })(r);
        let h,
          p,
          g,
          { move: d = !0, reverse: f } = i || {};
        for (h = 0; h <= c; ++h)
          (p = s[(a + (f ? c - h : h)) % o]),
            !p.skip &&
              (d ? (t.moveTo(p.x, p.y), (d = !1)) : u(t, g, p, f, r.stepped),
              (g = p));
        return (
          l && ((p = s[(a + (f ? c : 0)) % o]), u(t, g, p, f, r.stepped)), !!l
        );
      }
      function lL(t, e, n, i) {
        const s = e.points,
          { count: r, start: o, ilen: a } = oD(s, n, i),
          { move: l = !0, reverse: c } = i || {};
        let f,
          h,
          p,
          g,
          m,
          y,
          u = 0,
          d = 0;
        const b = (v) => (o + (c ? a - v : v)) % r,
          _ = () => {
            g !== m && (t.lineTo(u, m), t.lineTo(u, g), t.lineTo(u, y));
          };
        for (l && ((h = s[b(0)]), t.moveTo(h.x, h.y)), f = 0; f <= a; ++f) {
          if (((h = s[b(f)]), h.skip)) continue;
          const v = h.x,
            D = h.y,
            C = 0 | v;
          C === p
            ? (D < g ? (g = D) : D > m && (m = D), (u = (d * u + v) / ++d))
            : (_(), t.lineTo(v, D), (p = C), (d = 0), (g = m = D)),
            (y = D);
        }
        _();
      }
      function Ff(t) {
        const e = t.options;
        return t._decimated ||
          t._loop ||
          e.tension ||
          "monotone" === e.cubicInterpolationMode ||
          e.stepped ||
          (e.borderDash && e.borderDash.length)
          ? aL
          : lL;
      }
      I(Ml, "id", "arc"),
        I(Ml, "defaults", {
          borderAlign: "center",
          borderColor: "#fff",
          borderJoinStyle: void 0,
          borderRadius: 0,
          borderWidth: 2,
          offset: 0,
          spacing: 0,
          angle: void 0,
          circular: !0,
        }),
        I(Ml, "defaultRoutes", { backgroundColor: "backgroundColor" });
      const fL = "function" == typeof Path2D;
      class si extends en {
        constructor(e) {
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
            e && Object.assign(this, e);
        }
        updateControlPoints(e, n) {
          const i = this.options;
          (!i.tension && "monotone" !== i.cubicInterpolationMode) ||
            i.stepped ||
            this._pointsUpdated ||
            (tF(
              this._points,
              i,
              e,
              i.spanGaps ? this._loop : this._fullLoop,
              n
            ),
            (this._pointsUpdated = !0));
        }
        set points(e) {
          (this._points = e),
            delete this._segments,
            delete this._path,
            (this._pointsUpdated = !1);
        }
        get points() {
          return this._points;
        }
        get segments() {
          return (
            this._segments ||
            (this._segments = (function mF(t, e) {
              const n = t.points,
                i = t.options.spanGaps,
                s = n.length;
              if (!s) return [];
              const r = !!t._loop,
                { start: o, end: a } = (function pF(t, e, n, i) {
                  let s = 0,
                    r = e - 1;
                  if (n && !i) for (; s < e && !t[s].skip; ) s++;
                  for (; s < e && t[s].skip; ) s++;
                  for (s %= e, n && (r += s); r > s && t[r % e].skip; ) r--;
                  return (r %= e), { start: s, end: r };
                })(n, s, r, i);
              return (function b0(t, e, n, i) {
                return i && i.setContext && n
                  ? (function yF(t, e, n, i) {
                      const s = t._chart.getContext(),
                        r = v0(t.options),
                        {
                          _datasetIndex: o,
                          options: { spanGaps: a },
                        } = t,
                        l = n.length,
                        c = [];
                      let u = r,
                        d = e[0].start,
                        f = d;
                      function h(p, g, m, y) {
                        const b = a ? -1 : 1;
                        if (p !== g) {
                          for (p += l; n[p % l].skip; ) p -= b;
                          for (; n[g % l].skip; ) g += b;
                          p % l != g % l &&
                            (c.push({
                              start: p % l,
                              end: g % l,
                              loop: m,
                              style: y,
                            }),
                            (u = y),
                            (d = g % l));
                        }
                      }
                      for (const p of e) {
                        d = a ? d : p.start;
                        let m,
                          g = n[d % l];
                        for (f = d + 1; f <= p.end; f++) {
                          const y = n[f % l];
                          (m = v0(
                            i.setContext(
                              ii(s, {
                                type: "segment",
                                p0: g,
                                p1: y,
                                p0DataIndex: (f - 1) % l,
                                p1DataIndex: f % l,
                                datasetIndex: o,
                              })
                            )
                          )),
                            _F(m, u) && h(d, f - 1, p.loop, u),
                            (g = y),
                            (u = m);
                        }
                        d < f - 1 && h(d, f - 1, p.loop, u);
                      }
                      return c;
                    })(t, e, n, i)
                  : e;
              })(
                t,
                !0 === i
                  ? [{ start: o, end: a, loop: r }]
                  : (function gF(t, e, n, i) {
                      const s = t.length,
                        r = [];
                      let l,
                        o = e,
                        a = t[e];
                      for (l = e + 1; l <= n; ++l) {
                        const c = t[l % s];
                        c.skip || c.stop
                          ? a.skip ||
                            (r.push({
                              start: e % s,
                              end: (l - 1) % s,
                              loop: (i = !1),
                            }),
                            (e = o = c.stop ? l : null))
                          : ((o = l), a.skip && (e = l)),
                          (a = c);
                      }
                      return (
                        null !== o &&
                          r.push({ start: e % s, end: o % s, loop: i }),
                        r
                      );
                    })(
                      n,
                      o,
                      a < o ? a + s : a,
                      !!t._fullLoop && 0 === o && a === s - 1
                    ),
                n,
                e
              );
            })(this, this.options.segment))
          );
        }
        first() {
          const e = this.segments;
          return e.length && this.points[e[0].start];
        }
        last() {
          const e = this.segments,
            i = e.length;
          return i && this.points[e[i - 1].end];
        }
        interpolate(e, n) {
          const i = this.options,
            s = e[n],
            r = this.points,
            o = _0(this, { property: n, start: s, end: s });
          if (!o.length) return;
          const a = [],
            l = (function cL(t) {
              return t.stepped
                ? cF
                : t.tension || "monotone" === t.cubicInterpolationMode
                ? uF
                : Pi;
            })(i);
          let c, u;
          for (c = 0, u = o.length; c < u; ++c) {
            const { start: d, end: f } = o[c],
              h = r[d],
              p = r[f];
            if (h === p) {
              a.push(h);
              continue;
            }
            const m = l(h, p, Math.abs((s - h[n]) / (p[n] - h[n])), i.stepped);
            (m[n] = e[n]), a.push(m);
          }
          return 1 === a.length ? a[0] : a;
        }
        pathSegment(e, n, i) {
          return Ff(this)(e, this, n, i);
        }
        path(e, n, i) {
          const s = this.segments,
            r = Ff(this);
          let o = this._loop;
          (n = n || 0), (i = i || this.points.length - n);
          for (const a of s) o &= r(e, this, a, { start: n, end: n + i - 1 });
          return !!o;
        }
        draw(e, n, i, s) {
          (this.points || []).length &&
            (this.options || {}).borderWidth &&
            (e.save(),
            (function hL(t, e, n, i) {
              fL && !e.options.segment
                ? (function uL(t, e, n, i) {
                    let s = e._path;
                    s ||
                      ((s = e._path = new Path2D()),
                      e.path(s, n, i) && s.closePath()),
                      rD(t, e.options),
                      t.stroke(s);
                  })(t, e, n, i)
                : (function dL(t, e, n, i) {
                    const { segments: s, options: r } = e,
                      o = Ff(e);
                    for (const a of s)
                      rD(t, r, a.style),
                        t.beginPath(),
                        o(t, e, a, { start: n, end: n + i - 1 }) &&
                          t.closePath(),
                        t.stroke();
                  })(t, e, n, i);
            })(e, this, i, s),
            e.restore()),
            this.animated &&
              ((this._pointsUpdated = !1), (this._path = void 0));
        }
      }
      function aD(t, e, n, i) {
        const s = t.options,
          { [n]: r } = t.getProps([n], i);
        return Math.abs(e - r) < s.radius + s.hitRadius;
      }
      I(si, "id", "line"),
        I(si, "defaults", {
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
        }),
        I(si, "defaultRoutes", {
          backgroundColor: "backgroundColor",
          borderColor: "borderColor",
        }),
        I(si, "descriptors", {
          _scriptable: !0,
          _indexable: (e) => "borderDash" !== e && "fill" !== e,
        });
      class Sl extends en {
        constructor(e) {
          super(),
            (this.options = void 0),
            (this.parsed = void 0),
            (this.skip = void 0),
            (this.stop = void 0),
            e && Object.assign(this, e);
        }
        inRange(e, n, i) {
          const s = this.options,
            { x: r, y: o } = this.getProps(["x", "y"], i);
          return (
            Math.pow(e - r, 2) + Math.pow(n - o, 2) <
            Math.pow(s.hitRadius + s.radius, 2)
          );
        }
        inXRange(e, n) {
          return aD(this, e, "x", n);
        }
        inYRange(e, n) {
          return aD(this, e, "y", n);
        }
        getCenterPoint(e) {
          const { x: n, y: i } = this.getProps(["x", "y"], e);
          return { x: n, y: i };
        }
        size(e) {
          let n = (e = e || this.options || {}).radius || 0;
          return (
            (n = Math.max(n, (n && e.hoverRadius) || 0)),
            2 * (n + ((n && e.borderWidth) || 0))
          );
        }
        draw(e, n) {
          const i = this.options;
          this.skip ||
            i.radius < 0.1 ||
            !Gr(this, n, this.size(i) / 2) ||
            ((e.strokeStyle = i.borderColor),
            (e.lineWidth = i.borderWidth),
            (e.fillStyle = i.backgroundColor),
            vf(e, i, this.x, this.y));
        }
        getRange() {
          const e = this.options || {};
          return e.radius + e.hitRadius;
        }
      }
      function lD(t, e) {
        const {
          x: n,
          y: i,
          base: s,
          width: r,
          height: o,
        } = t.getProps(["x", "y", "base", "width", "height"], e);
        let a, l, c, u, d;
        return (
          t.horizontal
            ? ((d = o / 2),
              (a = Math.min(n, s)),
              (l = Math.max(n, s)),
              (c = i - d),
              (u = i + d))
            : ((d = r / 2),
              (a = n - d),
              (l = n + d),
              (c = Math.min(i, s)),
              (u = Math.max(i, s))),
          { left: a, top: c, right: l, bottom: u }
        );
      }
      function ri(t, e, n, i) {
        return t ? 0 : $e(e, n, i);
      }
      function Rf(t, e, n, i) {
        const s = null === e,
          r = null === n,
          a = t && !(s && r) && lD(t, i);
        return (
          a && (s || Rn(e, a.left, a.right)) && (r || Rn(n, a.top, a.bottom))
        );
      }
      function _L(t, e) {
        t.rect(e.x, e.y, e.w, e.h);
      }
      function Lf(t, e, n = {}) {
        const i = t.x !== n.x ? -e : 0,
          s = t.y !== n.y ? -e : 0;
        return {
          x: t.x + i,
          y: t.y + s,
          w: t.w + ((t.x + t.w !== n.x + n.w ? e : 0) - i),
          h: t.h + ((t.y + t.h !== n.y + n.h ? e : 0) - s),
          radius: t.radius,
        };
      }
      I(Sl, "id", "point"),
        I(Sl, "defaults", {
          borderWidth: 1,
          hitRadius: 1,
          hoverBorderWidth: 1,
          hoverRadius: 4,
          pointStyle: "circle",
          radius: 3,
          rotation: 0,
        }),
        I(Sl, "defaultRoutes", {
          backgroundColor: "backgroundColor",
          borderColor: "borderColor",
        });
      class Il extends en {
        constructor(e) {
          super(),
            (this.options = void 0),
            (this.horizontal = void 0),
            (this.base = void 0),
            (this.width = void 0),
            (this.height = void 0),
            (this.inflateAmount = void 0),
            e && Object.assign(this, e);
        }
        draw(e) {
          const {
              inflateAmount: n,
              options: { borderColor: i, backgroundColor: s },
            } = this,
            { inner: r, outer: o } = (function mL(t) {
              const e = lD(t),
                n = e.right - e.left,
                i = e.bottom - e.top,
                s = (function pL(t, e, n) {
                  const s = t.borderSkipped,
                    r = e0(t.options.borderWidth);
                  return {
                    t: ri(s.top, r.top, 0, n),
                    r: ri(s.right, r.right, 0, e),
                    b: ri(s.bottom, r.bottom, 0, n),
                    l: ri(s.left, r.left, 0, e),
                  };
                })(t, n / 2, i / 2),
                r = (function gL(t, e, n) {
                  const { enableBorderRadius: i } = t.getProps([
                      "enableBorderRadius",
                    ]),
                    s = t.options.borderRadius,
                    r = Ii(s),
                    o = Math.min(e, n),
                    a = t.borderSkipped,
                    l = i || Y(s);
                  return {
                    topLeft: ri(!l || a.top || a.left, r.topLeft, 0, o),
                    topRight: ri(!l || a.top || a.right, r.topRight, 0, o),
                    bottomLeft: ri(
                      !l || a.bottom || a.left,
                      r.bottomLeft,
                      0,
                      o
                    ),
                    bottomRight: ri(
                      !l || a.bottom || a.right,
                      r.bottomRight,
                      0,
                      o
                    ),
                  };
                })(t, n / 2, i / 2);
              return {
                outer: { x: e.left, y: e.top, w: n, h: i, radius: r },
                inner: {
                  x: e.left + s.l,
                  y: e.top + s.t,
                  w: n - s.l - s.r,
                  h: i - s.t - s.b,
                  radius: {
                    topLeft: Math.max(0, r.topLeft - Math.max(s.t, s.l)),
                    topRight: Math.max(0, r.topRight - Math.max(s.t, s.r)),
                    bottomLeft: Math.max(0, r.bottomLeft - Math.max(s.b, s.l)),
                    bottomRight: Math.max(
                      0,
                      r.bottomRight - Math.max(s.b, s.r)
                    ),
                  },
                },
              };
            })(this),
            a = (function yL(t) {
              return t.topLeft || t.topRight || t.bottomLeft || t.bottomRight;
            })(o.radius)
              ? qr
              : _L;
          e.save(),
            (o.w !== r.w || o.h !== r.h) &&
              (e.beginPath(),
              a(e, Lf(o, n, r)),
              e.clip(),
              a(e, Lf(r, -n, o)),
              (e.fillStyle = i),
              e.fill("evenodd")),
            e.beginPath(),
            a(e, Lf(r, n)),
            (e.fillStyle = s),
            e.fill(),
            e.restore();
        }
        inRange(e, n, i) {
          return Rf(this, e, n, i);
        }
        inXRange(e, n) {
          return Rf(this, e, null, n);
        }
        inYRange(e, n) {
          return Rf(this, null, e, n);
        }
        getCenterPoint(e) {
          const {
            x: n,
            y: i,
            base: s,
            horizontal: r,
          } = this.getProps(["x", "y", "base", "horizontal"], e);
          return { x: r ? (n + s) / 2 : n, y: r ? i : (i + s) / 2 };
        }
        getRange(e) {
          return "x" === e ? this.width / 2 : this.height / 2;
        }
      }
      I(Il, "id", "bar"),
        I(Il, "defaults", {
          borderSkipped: "start",
          borderWidth: 0,
          borderRadius: 0,
          inflateAmount: "auto",
          pointStyle: void 0,
        }),
        I(Il, "defaultRoutes", {
          backgroundColor: "backgroundColor",
          borderColor: "borderColor",
        });
      var bL = Object.freeze({
        __proto__: null,
        ArcElement: Ml,
        LineElement: si,
        PointElement: Sl,
        BarElement: Il,
      });
      const Bf = [
          "rgb(54, 162, 235)",
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        cD = Bf.map((t) => t.replace("rgb(", "rgba(").replace(")", ", 0.5)"));
      function uD(t) {
        return Bf[t % Bf.length];
      }
      function dD(t) {
        return cD[t % cD.length];
      }
      function fD(t) {
        let e;
        for (e in t) if (t[e].borderColor || t[e].backgroundColor) return !0;
        return !1;
      }
      var xL = {
        id: "colors",
        defaults: { enabled: !0, forceOverride: !1 },
        beforeLayout(t, e, n) {
          if (!n.enabled) return;
          const {
            options: { elements: i },
            data: { datasets: s },
          } = t.config;
          if (!n.forceOverride && (fD(s) || (i && fD(i)))) return;
          const r = (function CL(t) {
            let e = 0;
            return (n, i) => {
              const s = t.getDatasetMeta(i).controller;
              s instanceof Oi
                ? (e = (function DL(t, e) {
                    return (t.backgroundColor = t.data.map(() => uD(e++))), e;
                  })(n, e))
                : s instanceof Xr
                ? (e = (function wL(t, e) {
                    return (t.backgroundColor = t.data.map(() => dD(e++))), e;
                  })(n, e))
                : s &&
                  (e = (function vL(t, e) {
                    return (
                      (t.borderColor = uD(e)), (t.backgroundColor = dD(e)), ++e
                    );
                  })(n, e));
            };
          })(t);
          s.forEach(r);
        },
      };
      function hD(t) {
        if (t._decimated) {
          const e = t._data;
          delete t._decimated,
            delete t._data,
            Object.defineProperty(t, "data", { value: e });
        }
      }
      function pD(t) {
        t.data.datasets.forEach((e) => {
          hD(e);
        });
      }
      var IL = {
        id: "decimation",
        defaults: { algorithm: "min-max", enabled: !1 },
        beforeElementsUpdate: (t, e, n) => {
          if (!n.enabled) return void pD(t);
          const i = t.width;
          t.data.datasets.forEach((s, r) => {
            const { _data: o, indexAxis: a } = s,
              l = t.getDatasetMeta(r),
              c = o || s.data;
            if (
              "y" === Yr([a, t.options.indexAxis]) ||
              !l.controller.supportsDecimation
            )
              return;
            const u = t.scales[l.xAxisID];
            if (("linear" !== u.type && "time" !== u.type) || t.options.parsing)
              return;
            let p,
              { start: d, count: f } = (function SL(t, e) {
                const n = e.length;
                let s,
                  i = 0;
                const { iScale: r } = t,
                  {
                    min: o,
                    max: a,
                    minDefined: l,
                    maxDefined: c,
                  } = r.getUserBounds();
                return (
                  l && (i = $e(Ln(e, r.axis, o).lo, 0, n - 1)),
                  (s = c ? $e(Ln(e, r.axis, a).hi + 1, i, n) - i : n - i),
                  { start: i, count: s }
                );
              })(l, c);
            if (f <= (n.threshold || 4 * i)) hD(s);
            else {
              switch (
                (Q(o) &&
                  ((s._data = c),
                  delete s.data,
                  Object.defineProperty(s, "data", {
                    configurable: !0,
                    enumerable: !0,
                    get: function () {
                      return this._decimated;
                    },
                    set: function (g) {
                      this._data = g;
                    },
                  })),
                n.algorithm)
              ) {
                case "lttb":
                  p = (function EL(t, e, n, i, s) {
                    const r = s.samples || i;
                    if (r >= n) return t.slice(e, e + n);
                    const o = [],
                      a = (n - 2) / (r - 2);
                    let l = 0;
                    const c = e + n - 1;
                    let d,
                      f,
                      h,
                      p,
                      g,
                      u = e;
                    for (o[l++] = t[u], d = 0; d < r - 2; d++) {
                      let b,
                        m = 0,
                        y = 0;
                      const _ = Math.floor((d + 1) * a) + 1 + e,
                        v = Math.min(Math.floor((d + 2) * a) + 1, n) + e,
                        D = v - _;
                      for (b = _; b < v; b++) (m += t[b].x), (y += t[b].y);
                      (m /= D), (y /= D);
                      const C = Math.floor(d * a) + 1 + e,
                        x = Math.min(Math.floor((d + 1) * a) + 1, n) + e,
                        { x: M, y: T } = t[u];
                      for (h = p = -1, b = C; b < x; b++)
                        (p =
                          0.5 *
                          Math.abs(
                            (M - m) * (t[b].y - T) - (M - t[b].x) * (y - T)
                          )),
                          p > h && ((h = p), (f = t[b]), (g = b));
                      (o[l++] = f), (u = g);
                    }
                    return (o[l++] = t[c]), o;
                  })(c, d, f, i, n);
                  break;
                case "min-max":
                  p = (function ML(t, e, n, i) {
                    let o,
                      a,
                      l,
                      c,
                      u,
                      d,
                      f,
                      h,
                      p,
                      g,
                      s = 0,
                      r = 0;
                    const m = [],
                      b = t[e].x,
                      v = t[e + n - 1].x - b;
                    for (o = e; o < e + n; ++o) {
                      (a = t[o]), (l = ((a.x - b) / v) * i), (c = a.y);
                      const D = 0 | l;
                      if (D === u)
                        c < p
                          ? ((p = c), (d = o))
                          : c > g && ((g = c), (f = o)),
                          (s = (r * s + a.x) / ++r);
                      else {
                        const C = o - 1;
                        if (!Q(d) && !Q(f)) {
                          const x = Math.min(d, f),
                            M = Math.max(d, f);
                          x !== h && x !== C && m.push({ ...t[x], x: s }),
                            M !== h && M !== C && m.push({ ...t[M], x: s });
                        }
                        o > 0 && C !== h && m.push(t[C]),
                          m.push(a),
                          (u = D),
                          (r = 0),
                          (p = g = c),
                          (d = f = h = o);
                      }
                    }
                    return m;
                  })(c, d, f, i);
                  break;
                default:
                  throw new Error(
                    `Unsupported decimation algorithm '${n.algorithm}'`
                  );
              }
              s._decimated = p;
            }
          });
        },
        destroy(t) {
          pD(t);
        },
      };
      function jf(t, e, n, i) {
        if (i) return;
        let s = e[t],
          r = n[t];
        return (
          "angle" === t && ((s = It(s)), (r = It(r))),
          { property: t, start: s, end: r }
        );
      }
      function Vf(t, e, n) {
        for (; e > t; e--) {
          const i = n[e];
          if (!isNaN(i.x) && !isNaN(i.y)) break;
        }
        return e;
      }
      function gD(t, e, n, i) {
        return t && e ? i(t[n], e[n]) : t ? t[n] : e ? e[n] : 0;
      }
      function mD(t, e) {
        let n = [],
          i = !1;
        return (
          ge(t)
            ? ((i = !0), (n = t))
            : (n = (function AL(t, e) {
                const { x: n = null, y: i = null } = t || {},
                  s = e.points,
                  r = [];
                return (
                  e.segments.forEach(({ start: o, end: a }) => {
                    a = Vf(o, a, s);
                    const l = s[o],
                      c = s[a];
                    null !== i
                      ? (r.push({ x: l.x, y: i }), r.push({ x: c.x, y: i }))
                      : null !== n &&
                        (r.push({ x: n, y: l.y }), r.push({ x: n, y: c.y }));
                  }),
                  r
                );
              })(t, e)),
          n.length
            ? new si({
                points: n,
                options: { tension: 0 },
                _loop: i,
                _fullLoop: i,
              })
            : null
        );
      }
      function yD(t) {
        return t && !1 !== t.fill;
      }
      function PL(t, e, n) {
        let s = t[e].fill;
        const r = [e];
        let o;
        if (!n) return s;
        for (; !1 !== s && -1 === r.indexOf(s); ) {
          if (!Ee(s)) return s;
          if (((o = t[s]), !o)) return !1;
          if (o.visible) return s;
          r.push(s), (s = o.fill);
        }
        return !1;
      }
      function OL(t, e, n) {
        const i = (function RL(t) {
          const e = t.options,
            n = e.fill;
          let i = H(n && n.target, n);
          return (
            void 0 === i && (i = !!e.backgroundColor),
            !1 !== i && null !== i && (!0 === i ? "origin" : i)
          );
        })(t);
        if (Y(i)) return !isNaN(i.value) && i;
        let s = parseFloat(i);
        return Ee(s) && Math.floor(s) === s
          ? (function kL(t, e, n, i) {
              return (
                ("-" === t || "+" === t) && (n = e + n),
                !(n === e || n < 0 || n >= i) && n
              );
            })(i[0], e, s, n)
          : ["origin", "start", "end", "stack", "shape"].indexOf(i) >= 0 && i;
      }
      function jL(t, e, n) {
        const i = [];
        for (let s = 0; s < n.length; s++) {
          const r = n[s],
            { first: o, last: a, point: l } = VL(r, e, "x");
          if (!(!l || (o && a)))
            if (o) i.unshift(l);
            else if ((t.push(l), !a)) break;
        }
        t.push(...i);
      }
      function VL(t, e, n) {
        const i = t.interpolate(e, n);
        if (!i) return {};
        const s = i[n],
          r = t.segments,
          o = t.points;
        let a = !1,
          l = !1;
        for (let c = 0; c < r.length; c++) {
          const u = r[c],
            d = o[u.start][n],
            f = o[u.end][n];
          if (Rn(s, d, f)) {
            (a = s === d), (l = s === f);
            break;
          }
        }
        return { first: a, last: l, point: i };
      }
      class _D {
        constructor(e) {
          (this.x = e.x), (this.y = e.y), (this.radius = e.radius);
        }
        pathSegment(e, n, i) {
          const { x: s, y: r, radius: o } = this;
          return (
            e.arc(s, r, o, (n = n || { start: 0, end: me }).end, n.start, !0),
            !i.bounds
          );
        }
        interpolate(e) {
          const { x: n, y: i, radius: s } = this,
            r = e.angle;
          return { x: n + Math.cos(r) * s, y: i + Math.sin(r) * s, angle: r };
        }
      }
      function Hf(t, e, n) {
        const i = (function HL(t) {
            const { chart: e, fill: n, line: i } = t;
            if (Ee(n))
              return (function $L(t, e) {
                const n = t.getDatasetMeta(e);
                return n && t.isDatasetVisible(e) ? n.dataset : null;
              })(e, n);
            if ("stack" === n)
              return (function LL(t) {
                const { scale: e, index: n, line: i } = t,
                  s = [],
                  r = i.segments,
                  o = i.points,
                  a = (function BL(t, e) {
                    const n = [],
                      i = t.getMatchingVisibleMetas("line");
                    for (let s = 0; s < i.length; s++) {
                      const r = i[s];
                      if (r.index === e) break;
                      r.hidden || n.unshift(r.dataset);
                    }
                    return n;
                  })(e, n);
                a.push(mD({ x: null, y: e.bottom }, i));
                for (let l = 0; l < r.length; l++) {
                  const c = r[l];
                  for (let u = c.start; u <= c.end; u++) jL(s, o[u], a);
                }
                return new si({ points: s, options: {} });
              })(t);
            if ("shape" === n) return !0;
            const s = (function zL(t) {
              return (t.scale || {}).getPointPositionForValue
                ? (function WL(t) {
                    const { scale: e, fill: n } = t,
                      i = e.options,
                      s = e.getLabels().length,
                      r = i.reverse ? e.max : e.min,
                      o = (function FL(t, e, n) {
                        let i;
                        return (
                          (i =
                            "start" === t
                              ? n
                              : "end" === t
                              ? e.options.reverse
                                ? e.min
                                : e.max
                              : Y(t)
                              ? t.value
                              : e.getBaseValue()),
                          i
                        );
                      })(n, e, r),
                      a = [];
                    if (i.grid.circular) {
                      const l = e.getPointPositionForValue(0, r);
                      return new _D({
                        x: l.x,
                        y: l.y,
                        radius: e.getDistanceFromCenterForValue(o),
                      });
                    }
                    for (let l = 0; l < s; ++l)
                      a.push(e.getPointPositionForValue(l, o));
                    return a;
                  })(t)
                : (function UL(t) {
                    const { scale: e = {}, fill: n } = t,
                      i = (function NL(t, e) {
                        let n = null;
                        return (
                          "start" === t
                            ? (n = e.bottom)
                            : "end" === t
                            ? (n = e.top)
                            : Y(t)
                            ? (n = e.getPixelForValue(t.value))
                            : e.getBasePixel && (n = e.getBasePixel()),
                          n
                        );
                      })(n, e);
                    if (Ee(i)) {
                      const s = e.isHorizontal();
                      return { x: s ? i : null, y: s ? null : i };
                    }
                    return null;
                  })(t);
            })(t);
            return s instanceof _D ? s : mD(s, i);
          })(e),
          { line: s, scale: r, axis: o } = e,
          a = s.options,
          l = a.fill,
          c = a.backgroundColor,
          { above: u = c, below: d = c } = l || {};
        i &&
          s.points.length &&
          (ol(t, n),
          (function GL(t, e) {
            const {
                line: n,
                target: i,
                above: s,
                below: r,
                area: o,
                scale: a,
              } = e,
              l = n._loop ? "angle" : e.axis;
            t.save(),
              "x" === l &&
                r !== s &&
                (bD(t, i, o.top),
                vD(t, { line: n, target: i, color: s, scale: a, property: l }),
                t.restore(),
                t.save(),
                bD(t, i, o.bottom)),
              vD(t, { line: n, target: i, color: r, scale: a, property: l }),
              t.restore();
          })(t, {
            line: s,
            target: i,
            above: u,
            below: d,
            area: n,
            scale: r,
            axis: o,
          }),
          al(t));
      }
      function bD(t, e, n) {
        const { segments: i, points: s } = e;
        let r = !0,
          o = !1;
        t.beginPath();
        for (const a of i) {
          const { start: l, end: c } = a,
            u = s[l],
            d = s[Vf(l, c, s)];
          r
            ? (t.moveTo(u.x, u.y), (r = !1))
            : (t.lineTo(u.x, n), t.lineTo(u.x, u.y)),
            (o = !!e.pathSegment(t, a, { move: o })),
            o ? t.closePath() : t.lineTo(d.x, n);
        }
        t.lineTo(e.first().x, n), t.closePath(), t.clip();
      }
      function vD(t, e) {
        const { line: n, target: i, property: s, color: r, scale: o } = e,
          a = (function TL(t, e, n) {
            const i = t.segments,
              s = t.points,
              r = e.points,
              o = [];
            for (const a of i) {
              let { start: l, end: c } = a;
              c = Vf(l, c, s);
              const u = jf(n, s[l], s[c], a.loop);
              if (!e.segments) {
                o.push({ source: a, target: u, start: s[l], end: s[c] });
                continue;
              }
              const d = _0(e, u);
              for (const f of d) {
                const h = jf(n, r[f.start], r[f.end], f.loop),
                  p = y0(a, s, h);
                for (const g of p)
                  o.push({
                    source: g,
                    target: f,
                    start: { [n]: gD(u, h, "start", Math.max) },
                    end: { [n]: gD(u, h, "end", Math.min) },
                  });
              }
            }
            return o;
          })(n, i, s);
        for (const { source: l, target: c, start: u, end: d } of a) {
          const { style: { backgroundColor: f = r } = {} } = l,
            h = !0 !== i;
          t.save(),
            (t.fillStyle = f),
            qL(t, o, h && jf(s, u, d)),
            t.beginPath();
          const p = !!n.pathSegment(t, l);
          let g;
          if (h) {
            p ? t.closePath() : DD(t, i, d, s);
            const m = !!i.pathSegment(t, c, { move: p, reverse: !0 });
            (g = p && m), g || DD(t, i, u, s);
          }
          t.closePath(), t.fill(g ? "evenodd" : "nonzero"), t.restore();
        }
      }
      function qL(t, e, n) {
        const { top: i, bottom: s } = e.chart.chartArea,
          { property: r, start: o, end: a } = n || {};
        "x" === r && (t.beginPath(), t.rect(o, i, a - o, s - i), t.clip());
      }
      function DD(t, e, n, i) {
        const s = e.interpolate(n, i);
        s && t.lineTo(s.x, s.y);
      }
      var YL = {
        id: "filler",
        afterDatasetsUpdate(t, e, n) {
          const i = (t.data.datasets || []).length,
            s = [];
          let r, o, a, l;
          for (o = 0; o < i; ++o)
            (r = t.getDatasetMeta(o)),
              (a = r.dataset),
              (l = null),
              a &&
                a.options &&
                a instanceof si &&
                (l = {
                  visible: t.isDatasetVisible(o),
                  index: o,
                  fill: OL(a, o, i),
                  chart: t,
                  axis: r.controller.options.indexAxis,
                  scale: r.vScale,
                  line: a,
                }),
              (r.$filler = l),
              s.push(l);
          for (o = 0; o < i; ++o)
            (l = s[o]), l && !1 !== l.fill && (l.fill = PL(s, o, n.propagate));
        },
        beforeDraw(t, e, n) {
          const i = "beforeDraw" === n.drawTime,
            s = t.getSortedVisibleDatasetMetas(),
            r = t.chartArea;
          for (let o = s.length - 1; o >= 0; --o) {
            const a = s[o].$filler;
            !a ||
              (a.line.updateControlPoints(r, a.axis),
              i && a.fill && Hf(t.ctx, a, r));
          }
        },
        beforeDatasetsDraw(t, e, n) {
          if ("beforeDatasetsDraw" !== n.drawTime) return;
          const i = t.getSortedVisibleDatasetMetas();
          for (let s = i.length - 1; s >= 0; --s) {
            const r = i[s].$filler;
            yD(r) && Hf(t.ctx, r, t.chartArea);
          }
        },
        beforeDatasetDraw(t, e, n) {
          const i = e.meta.$filler;
          !yD(i) ||
            "beforeDatasetDraw" !== n.drawTime ||
            Hf(t.ctx, i, t.chartArea);
        },
        defaults: { propagate: !0, drawTime: "beforeDatasetDraw" },
      };
      const wD = (t, e) => {
        let { boxHeight: n = e, boxWidth: i = e } = t;
        return (
          t.usePointStyle &&
            ((n = Math.min(n, e)), (i = t.pointStyleWidth || Math.min(i, e))),
          { boxWidth: i, boxHeight: n, itemHeight: Math.max(e, n) }
        );
      };
      class CD extends en {
        constructor(e) {
          super(),
            (this._added = !1),
            (this.legendHitBoxes = []),
            (this._hoveredItem = null),
            (this.doughnutMode = !1),
            (this.chart = e.chart),
            (this.options = e.options),
            (this.ctx = e.ctx),
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
        update(e, n, i) {
          (this.maxWidth = e),
            (this.maxHeight = n),
            (this._margins = i),
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
          const e = this.options.labels || {};
          let n = pe(e.generateLabels, [this.chart], this) || [];
          e.filter && (n = n.filter((i) => e.filter(i, this.chart.data))),
            e.sort && (n = n.sort((i, s) => e.sort(i, s, this.chart.data))),
            this.options.reverse && n.reverse(),
            (this.legendItems = n);
        }
        fit() {
          const { options: e, ctx: n } = this;
          if (!e.display) return void (this.width = this.height = 0);
          const i = e.labels,
            s = Ve(i.font),
            r = s.size,
            o = this._computeTitleHeight(),
            { boxWidth: a, itemHeight: l } = wD(i, r);
          let c, u;
          (n.font = s.string),
            this.isHorizontal()
              ? ((c = this.maxWidth), (u = this._fitRows(o, r, a, l) + 10))
              : ((u = this.maxHeight), (c = this._fitCols(o, s, a, l) + 10)),
            (this.width = Math.min(c, e.maxWidth || this.maxWidth)),
            (this.height = Math.min(u, e.maxHeight || this.maxHeight));
        }
        _fitRows(e, n, i, s) {
          const {
              ctx: r,
              maxWidth: o,
              options: {
                labels: { padding: a },
              },
            } = this,
            l = (this.legendHitBoxes = []),
            c = (this.lineWidths = [0]),
            u = s + a;
          let d = e;
          (r.textAlign = "left"), (r.textBaseline = "middle");
          let f = -1,
            h = -u;
          return (
            this.legendItems.forEach((p, g) => {
              const m = i + n / 2 + r.measureText(p.text).width;
              (0 === g || c[c.length - 1] + m + 2 * a > o) &&
                ((d += u), (c[c.length - (g > 0 ? 0 : 1)] = 0), (h += u), f++),
                (l[g] = { left: 0, top: h, row: f, width: m, height: s }),
                (c[c.length - 1] += m + a);
            }),
            d
          );
        }
        _fitCols(e, n, i, s) {
          const {
              ctx: r,
              maxHeight: o,
              options: {
                labels: { padding: a },
              },
            } = this,
            l = (this.legendHitBoxes = []),
            c = (this.columnSizes = []),
            u = o - e;
          let d = a,
            f = 0,
            h = 0,
            p = 0,
            g = 0;
          return (
            this.legendItems.forEach((m, y) => {
              const { itemWidth: b, itemHeight: _ } = (function XL(
                t,
                e,
                n,
                i,
                s
              ) {
                const r = (function ZL(t, e, n, i) {
                    let s = t.text;
                    return (
                      s &&
                        "string" != typeof s &&
                        (s = s.reduce((r, o) => (r.length > o.length ? r : o))),
                      e + n.size / 2 + i.measureText(s).width
                    );
                  })(i, t, e, n),
                  o = (function QL(t, e, n) {
                    let i = t;
                    return "string" != typeof e.text && (i = xD(e, n)), i;
                  })(s, i, e.lineHeight);
                return { itemWidth: r, itemHeight: o };
              })(i, n, r, m, s);
              y > 0 &&
                h + _ + 2 * a > u &&
                ((d += f + a),
                c.push({ width: f, height: h }),
                (p += f + a),
                g++,
                (f = h = 0)),
                (l[y] = { left: p, top: h, col: g, width: b, height: _ }),
                (f = Math.max(f, b)),
                (h += _ + a);
            }),
            (d += f),
            c.push({ width: f, height: h }),
            d
          );
        }
        adjustHitBoxes() {
          if (!this.options.display) return;
          const e = this._computeTitleHeight(),
            {
              legendHitBoxes: n,
              options: {
                align: i,
                labels: { padding: s },
                rtl: r,
              },
            } = this,
            o = ks(r, this.left, this.width);
          if (this.isHorizontal()) {
            let a = 0,
              l = Qe(i, this.left + s, this.right - this.lineWidths[a]);
            for (const c of n)
              a !== c.row &&
                ((a = c.row),
                (l = Qe(i, this.left + s, this.right - this.lineWidths[a]))),
                (c.top += this.top + e + s),
                (c.left = o.leftForLtr(o.x(l), c.width)),
                (l += c.width + s);
          } else {
            let a = 0,
              l = Qe(
                i,
                this.top + e + s,
                this.bottom - this.columnSizes[a].height
              );
            for (const c of n)
              c.col !== a &&
                ((a = c.col),
                (l = Qe(
                  i,
                  this.top + e + s,
                  this.bottom - this.columnSizes[a].height
                ))),
                (c.top = l),
                (c.left += this.left + s),
                (c.left = o.leftForLtr(o.x(c.left), c.width)),
                (l += c.height + s);
          }
        }
        isHorizontal() {
          return (
            "top" === this.options.position ||
            "bottom" === this.options.position
          );
        }
        draw() {
          if (this.options.display) {
            const e = this.ctx;
            ol(e, this), this._draw(), al(e);
          }
        }
        _draw() {
          const { options: e, columnSizes: n, lineWidths: i, ctx: s } = this,
            { align: r, labels: o } = e,
            a = Se.color,
            l = ks(e.rtl, this.left, this.width),
            c = Ve(o.font),
            { padding: u } = o,
            d = c.size,
            f = d / 2;
          let h;
          this.drawTitle(),
            (s.textAlign = l.textAlign("left")),
            (s.textBaseline = "middle"),
            (s.lineWidth = 0.5),
            (s.font = c.string);
          const { boxWidth: p, boxHeight: g, itemHeight: m } = wD(o, d),
            _ = this.isHorizontal(),
            v = this._computeTitleHeight();
          (h = _
            ? {
                x: Qe(r, this.left + u, this.right - i[0]),
                y: this.top + u + v,
                line: 0,
              }
            : {
                x: this.left + u,
                y: Qe(r, this.top + v + u, this.bottom - n[0].height),
                line: 0,
              }),
            h0(this.ctx, e.textDirection);
          const D = m + u;
          this.legendItems.forEach((C, x) => {
            (s.strokeStyle = C.fontColor), (s.fillStyle = C.fontColor);
            const M = s.measureText(C.text).width,
              T = l.textAlign(C.textAlign || (C.textAlign = o.textAlign)),
              B = p + f + M;
            let j = h.x,
              K = h.y;
            l.setWidth(this.width),
              _
                ? x > 0 &&
                  j + B + u > this.right &&
                  ((K = h.y += D),
                  h.line++,
                  (j = h.x = Qe(r, this.left + u, this.right - i[h.line])))
                : x > 0 &&
                  K + D > this.bottom &&
                  ((j = h.x = j + n[h.line].width + u),
                  h.line++,
                  (K = h.y =
                    Qe(r, this.top + v + u, this.bottom - n[h.line].height))),
              (function (C, x, M) {
                if (isNaN(p) || p <= 0 || isNaN(g) || g < 0) return;
                s.save();
                const T = H(M.lineWidth, 1);
                if (
                  ((s.fillStyle = H(M.fillStyle, a)),
                  (s.lineCap = H(M.lineCap, "butt")),
                  (s.lineDashOffset = H(M.lineDashOffset, 0)),
                  (s.lineJoin = H(M.lineJoin, "miter")),
                  (s.lineWidth = T),
                  (s.strokeStyle = H(M.strokeStyle, a)),
                  s.setLineDash(H(M.lineDash, [])),
                  o.usePointStyle)
                ) {
                  const B = {
                      radius: (g * Math.SQRT2) / 2,
                      pointStyle: M.pointStyle,
                      rotation: M.rotation,
                      borderWidth: T,
                    },
                    j = l.xPlus(C, p / 2);
                  Jv(s, B, j, x + f, o.pointStyleWidth && p);
                } else {
                  const B = x + Math.max((d - g) / 2, 0),
                    j = l.leftForLtr(C, p),
                    K = Ii(M.borderRadius);
                  s.beginPath(),
                    Object.values(K).some((Te) => 0 !== Te)
                      ? qr(s, { x: j, y: B, w: p, h: g, radius: K })
                      : s.rect(j, B, p, g),
                    s.fill(),
                    0 !== T && s.stroke();
                }
                s.restore();
              })(l.x(j), K, C),
              (j = ((t, e, n, i) =>
                t === (i ? "left" : "right")
                  ? n
                  : "center" === t
                  ? (e + n) / 2
                  : e)(T, j + p + f, _ ? j + B : this.right, e.rtl)),
              (function (C, x, M) {
                Si(s, M.text, C, x + m / 2, c, {
                  strikethrough: M.hidden,
                  textAlign: l.textAlign(M.textAlign),
                });
              })(l.x(j), K, C),
              _
                ? (h.x += B + u)
                : (h.y += "string" != typeof C.text ? xD(C, c.lineHeight) : D);
          }),
            p0(this.ctx, e.textDirection);
        }
        drawTitle() {
          const e = this.options,
            n = e.title,
            i = Ve(n.font),
            s = Je(n.padding);
          if (!n.display) return;
          const r = ks(e.rtl, this.left, this.width),
            o = this.ctx,
            a = n.position,
            c = s.top + i.size / 2;
          let u,
            d = this.left,
            f = this.width;
          if (this.isHorizontal())
            (f = Math.max(...this.lineWidths)),
              (u = this.top + c),
              (d = Qe(e.align, d, this.right - f));
          else {
            const p = this.columnSizes.reduce(
              (g, m) => Math.max(g, m.height),
              0
            );
            u =
              c +
              Qe(
                e.align,
                this.top,
                this.bottom - p - e.labels.padding - this._computeTitleHeight()
              );
          }
          const h = Qe(a, d, d + f);
          (o.textAlign = r.textAlign(mf(a))),
            (o.textBaseline = "middle"),
            (o.strokeStyle = n.color),
            (o.fillStyle = n.color),
            (o.font = i.string),
            Si(o, n.text, h, u, i);
        }
        _computeTitleHeight() {
          const e = this.options.title,
            n = Ve(e.font),
            i = Je(e.padding);
          return e.display ? n.lineHeight + i.height : 0;
        }
        _getLegendItemAt(e, n) {
          let i, s, r;
          if (Rn(e, this.left, this.right) && Rn(n, this.top, this.bottom))
            for (r = this.legendHitBoxes, i = 0; i < r.length; ++i)
              if (
                ((s = r[i]),
                Rn(e, s.left, s.left + s.width) &&
                  Rn(n, s.top, s.top + s.height))
              )
                return this.legendItems[i];
          return null;
        }
        handleEvent(e) {
          const n = this.options;
          if (
            !(function JL(t, e) {
              return !(
                (("mousemove" !== t && "mouseout" !== t) ||
                  (!e.onHover && !e.onLeave)) &&
                (!e.onClick || ("click" !== t && "mouseup" !== t))
              );
            })(e.type, n)
          )
            return;
          const i = this._getLegendItemAt(e.x, e.y);
          if ("mousemove" === e.type || "mouseout" === e.type) {
            const s = this._hoveredItem,
              r = ((t, e) =>
                null !== t &&
                null !== e &&
                t.datasetIndex === e.datasetIndex &&
                t.index === e.index)(s, i);
            s && !r && pe(n.onLeave, [e, s, this], this),
              (this._hoveredItem = i),
              i && !r && pe(n.onHover, [e, i, this], this);
          } else i && pe(n.onClick, [e, i, this], this);
        }
      }
      function xD(t, e) {
        return e * (t.text ? t.text.length + 0.5 : 0);
      }
      var e2 = {
        id: "legend",
        _element: CD,
        start(t, e, n) {
          const i = (t.legend = new CD({ ctx: t.ctx, options: n, chart: t }));
          et.configure(t, i, n), et.addBox(t, i);
        },
        stop(t) {
          et.removeBox(t, t.legend), delete t.legend;
        },
        beforeUpdate(t, e, n) {
          const i = t.legend;
          et.configure(t, i, n), (i.options = n);
        },
        afterUpdate(t) {
          const e = t.legend;
          e.buildLabels(), e.adjustHitBoxes();
        },
        afterEvent(t, e) {
          e.replay || t.legend.handleEvent(e.event);
        },
        defaults: {
          display: !0,
          position: "top",
          align: "center",
          fullSize: !0,
          reverse: !1,
          weight: 1e3,
          onClick(t, e, n) {
            const i = e.datasetIndex,
              s = n.chart;
            s.isDatasetVisible(i)
              ? (s.hide(i), (e.hidden = !0))
              : (s.show(i), (e.hidden = !1));
          },
          onHover: null,
          onLeave: null,
          labels: {
            color: (t) => t.chart.options.color,
            boxWidth: 40,
            padding: 10,
            generateLabels(t) {
              const e = t.data.datasets,
                {
                  labels: {
                    usePointStyle: n,
                    pointStyle: i,
                    textAlign: s,
                    color: r,
                    useBorderRadius: o,
                    borderRadius: a,
                  },
                } = t.legend.options;
              return t._getSortedDatasetMetas().map((l) => {
                const c = l.controller.getStyle(n ? 0 : void 0),
                  u = Je(c.borderWidth);
                return {
                  text: e[l.index].label,
                  fillStyle: c.backgroundColor,
                  fontColor: r,
                  hidden: !l.visible,
                  lineCap: c.borderCapStyle,
                  lineDash: c.borderDash,
                  lineDashOffset: c.borderDashOffset,
                  lineJoin: c.borderJoinStyle,
                  lineWidth: (u.width + u.height) / 4,
                  strokeStyle: c.borderColor,
                  pointStyle: i || c.pointStyle,
                  rotation: c.rotation,
                  textAlign: s || c.textAlign,
                  borderRadius: o && (a || c.borderRadius),
                  datasetIndex: l.index,
                };
              }, this);
            },
          },
          title: {
            color: (t) => t.chart.options.color,
            display: !1,
            position: "center",
            text: "",
          },
        },
        descriptors: {
          _scriptable: (t) => !t.startsWith("on"),
          labels: {
            _scriptable: (t) =>
              !["generateLabels", "filter", "sort"].includes(t),
          },
        },
      };
      class $f extends en {
        constructor(e) {
          super(),
            (this.chart = e.chart),
            (this.options = e.options),
            (this.ctx = e.ctx),
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
        update(e, n) {
          const i = this.options;
          if (((this.left = 0), (this.top = 0), !i.display))
            return void (this.width =
              this.height =
              this.right =
              this.bottom =
                0);
          (this.width = this.right = e), (this.height = this.bottom = n);
          const s = ge(i.text) ? i.text.length : 1;
          this._padding = Je(i.padding);
          const r = s * Ve(i.font).lineHeight + this._padding.height;
          this.isHorizontal() ? (this.height = r) : (this.width = r);
        }
        isHorizontal() {
          const e = this.options.position;
          return "top" === e || "bottom" === e;
        }
        _drawArgs(e) {
          const { top: n, left: i, bottom: s, right: r, options: o } = this,
            a = o.align;
          let c,
            u,
            d,
            l = 0;
          return (
            this.isHorizontal()
              ? ((u = Qe(a, i, r)), (d = n + e), (c = r - i))
              : ("left" === o.position
                  ? ((u = i + e), (d = Qe(a, s, n)), (l = -0.5 * be))
                  : ((u = r - e), (d = Qe(a, n, s)), (l = 0.5 * be)),
                (c = s - n)),
            { titleX: u, titleY: d, maxWidth: c, rotation: l }
          );
        }
        draw() {
          const e = this.ctx,
            n = this.options;
          if (!n.display) return;
          const i = Ve(n.font),
            r = i.lineHeight / 2 + this._padding.top,
            {
              titleX: o,
              titleY: a,
              maxWidth: l,
              rotation: c,
            } = this._drawArgs(r);
          Si(e, n.text, 0, 0, i, {
            color: n.color,
            maxWidth: l,
            rotation: c,
            textAlign: mf(n.align),
            textBaseline: "middle",
            translation: [o, a],
          });
        }
      }
      var n2 = {
        id: "title",
        _element: $f,
        start(t, e, n) {
          !(function t2(t, e) {
            const n = new $f({ ctx: t.ctx, options: e, chart: t });
            et.configure(t, n, e), et.addBox(t, n), (t.titleBlock = n);
          })(t, n);
        },
        stop(t) {
          et.removeBox(t, t.titleBlock), delete t.titleBlock;
        },
        beforeUpdate(t, e, n) {
          const i = t.titleBlock;
          et.configure(t, i, n), (i.options = n);
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
      const Tl = new WeakMap();
      var i2 = {
        id: "subtitle",
        start(t, e, n) {
          const i = new $f({ ctx: t.ctx, options: n, chart: t });
          et.configure(t, i, n), et.addBox(t, i), Tl.set(t, i);
        },
        stop(t) {
          et.removeBox(t, Tl.get(t)), Tl.delete(t);
        },
        beforeUpdate(t, e, n) {
          const i = Tl.get(t);
          et.configure(t, i, n), (i.options = n);
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
      const so = {
        average(t) {
          if (!t.length) return !1;
          let e,
            n,
            i = 0,
            s = 0,
            r = 0;
          for (e = 0, n = t.length; e < n; ++e) {
            const o = t[e].element;
            if (o && o.hasValue()) {
              const a = o.tooltipPosition();
              (i += a.x), (s += a.y), ++r;
            }
          }
          return { x: i / r, y: s / r };
        },
        nearest(t, e) {
          if (!t.length) return !1;
          let r,
            o,
            a,
            n = e.x,
            i = e.y,
            s = Number.POSITIVE_INFINITY;
          for (r = 0, o = t.length; r < o; ++r) {
            const l = t[r].element;
            if (l && l.hasValue()) {
              const u = pf(e, l.getCenterPoint());
              u < s && ((s = u), (a = l));
            }
          }
          if (a) {
            const l = a.tooltipPosition();
            (n = l.x), (i = l.y);
          }
          return { x: n, y: i };
        },
      };
      function mn(t, e) {
        return e && (ge(e) ? Array.prototype.push.apply(t, e) : t.push(e)), t;
      }
      function jn(t) {
        return ("string" == typeof t || t instanceof String) &&
          t.indexOf("\n") > -1
          ? t.split("\n")
          : t;
      }
      function s2(t, e) {
        const { element: n, datasetIndex: i, index: s } = e,
          r = t.getDatasetMeta(i).controller,
          { label: o, value: a } = r.getLabelAndValue(s);
        return {
          chart: t,
          label: o,
          parsed: r.getParsed(s),
          raw: t.data.datasets[i].data[s],
          formattedValue: a,
          dataset: r.getDataset(),
          dataIndex: s,
          datasetIndex: i,
          element: n,
        };
      }
      function ED(t, e) {
        const n = t.chart.ctx,
          { body: i, footer: s, title: r } = t,
          { boxWidth: o, boxHeight: a } = e,
          l = Ve(e.bodyFont),
          c = Ve(e.titleFont),
          u = Ve(e.footerFont),
          d = r.length,
          f = s.length,
          h = i.length,
          p = Je(e.padding);
        let g = p.height,
          m = 0,
          y = i.reduce(
            (v, D) => v + D.before.length + D.lines.length + D.after.length,
            0
          );
        (y += t.beforeBody.length + t.afterBody.length),
          d &&
            (g +=
              d * c.lineHeight +
              (d - 1) * e.titleSpacing +
              e.titleMarginBottom),
          y &&
            (g +=
              h * (e.displayColors ? Math.max(a, l.lineHeight) : l.lineHeight) +
              (y - h) * l.lineHeight +
              (y - 1) * e.bodySpacing),
          f &&
            (g +=
              e.footerMarginTop + f * u.lineHeight + (f - 1) * e.footerSpacing);
        let b = 0;
        const _ = function (v) {
          m = Math.max(m, n.measureText(v).width + b);
        };
        return (
          n.save(),
          (n.font = c.string),
          ae(t.title, _),
          (n.font = l.string),
          ae(t.beforeBody.concat(t.afterBody), _),
          (b = e.displayColors ? o + 2 + e.boxPadding : 0),
          ae(i, (v) => {
            ae(v.before, _), ae(v.lines, _), ae(v.after, _);
          }),
          (b = 0),
          (n.font = u.string),
          ae(t.footer, _),
          n.restore(),
          (m += p.width),
          { width: m, height: g }
        );
      }
      function a2(t, e, n, i) {
        const { x: s, width: r } = n,
          {
            width: o,
            chartArea: { left: a, right: l },
          } = t;
        let c = "center";
        return (
          "center" === i
            ? (c = s <= (a + l) / 2 ? "left" : "right")
            : s <= r / 2
            ? (c = "left")
            : s >= o - r / 2 && (c = "right"),
          (function o2(t, e, n, i) {
            const { x: s, width: r } = i,
              o = n.caretSize + n.caretPadding;
            if (
              ("left" === t && s + r + o > e.width) ||
              ("right" === t && s - r - o < 0)
            )
              return !0;
          })(c, t, e, n) && (c = "center"),
          c
        );
      }
      function MD(t, e, n) {
        const i =
          n.yAlign ||
          e.yAlign ||
          (function r2(t, e) {
            const { y: n, height: i } = e;
            return n < i / 2
              ? "top"
              : n > t.height - i / 2
              ? "bottom"
              : "center";
          })(t, n);
        return { xAlign: n.xAlign || e.xAlign || a2(t, e, n, i), yAlign: i };
      }
      function SD(t, e, n, i) {
        const { caretSize: s, caretPadding: r, cornerRadius: o } = t,
          { xAlign: a, yAlign: l } = n,
          c = s + r,
          { topLeft: u, topRight: d, bottomLeft: f, bottomRight: h } = Ii(o);
        let p = (function l2(t, e) {
          let { x: n, width: i } = t;
          return "right" === e ? (n -= i) : "center" === e && (n -= i / 2), n;
        })(e, a);
        const g = (function c2(t, e, n) {
          let { y: i, height: s } = t;
          return (
            "top" === e ? (i += n) : (i -= "bottom" === e ? s + n : s / 2), i
          );
        })(e, l, c);
        return (
          "center" === l
            ? "left" === a
              ? (p += c)
              : "right" === a && (p -= c)
            : "left" === a
            ? (p -= Math.max(u, f) + s)
            : "right" === a && (p += Math.max(d, h) + s),
          { x: $e(p, 0, i.width - e.width), y: $e(g, 0, i.height - e.height) }
        );
      }
      function Al(t, e, n) {
        const i = Je(n.padding);
        return "center" === e
          ? t.x + t.width / 2
          : "right" === e
          ? t.x + t.width - i.right
          : t.x + i.left;
      }
      function ID(t) {
        return mn([], jn(t));
      }
      function TD(t, e) {
        const n =
          e && e.dataset && e.dataset.tooltip && e.dataset.tooltip.callbacks;
        return n ? t.override(n) : t;
      }
      const AD = {
        beforeTitle: Fn,
        title(t) {
          if (t.length > 0) {
            const e = t[0],
              n = e.chart.data.labels,
              i = n ? n.length : 0;
            if (this && this.options && "dataset" === this.options.mode)
              return e.dataset.label || "";
            if (e.label) return e.label;
            if (i > 0 && e.dataIndex < i) return n[e.dataIndex];
          }
          return "";
        },
        afterTitle: Fn,
        beforeBody: Fn,
        beforeLabel: Fn,
        label(t) {
          if (this && this.options && "dataset" === this.options.mode)
            return t.label + ": " + t.formattedValue || t.formattedValue;
          let e = t.dataset.label || "";
          e && (e += ": ");
          const n = t.formattedValue;
          return Q(n) || (e += n), e;
        },
        labelColor(t) {
          const n = t.chart
            .getDatasetMeta(t.datasetIndex)
            .controller.getStyle(t.dataIndex);
          return {
            borderColor: n.borderColor,
            backgroundColor: n.backgroundColor,
            borderWidth: n.borderWidth,
            borderDash: n.borderDash,
            borderDashOffset: n.borderDashOffset,
            borderRadius: 0,
          };
        },
        labelTextColor() {
          return this.options.bodyColor;
        },
        labelPointStyle(t) {
          const n = t.chart
            .getDatasetMeta(t.datasetIndex)
            .controller.getStyle(t.dataIndex);
          return { pointStyle: n.pointStyle, rotation: n.rotation };
        },
        afterLabel: Fn,
        afterBody: Fn,
        beforeFooter: Fn,
        footer: Fn,
        afterFooter: Fn,
      };
      function gt(t, e, n, i) {
        const s = t[e].call(n, i);
        return typeof s > "u" ? AD[e].call(n, i) : s;
      }
      class zf extends en {
        constructor(e) {
          super(),
            (this.opacity = 0),
            (this._active = []),
            (this._eventPosition = void 0),
            (this._size = void 0),
            (this._cachedAnimations = void 0),
            (this._tooltipItems = []),
            (this.$animations = void 0),
            (this.$context = void 0),
            (this.chart = e.chart),
            (this.options = e.options),
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
        initialize(e) {
          (this.options = e),
            (this._cachedAnimations = void 0),
            (this.$context = void 0);
        }
        _resolveAnimations() {
          const e = this._cachedAnimations;
          if (e) return e;
          const n = this.chart,
            i = this.options.setContext(this.getContext()),
            s = i.enabled && n.options.animation && i.animations,
            r = new w0(this.chart, s);
          return s._cacheable && (this._cachedAnimations = Object.freeze(r)), r;
        }
        getContext() {
          return (
            this.$context ||
            (this.$context = (function u2(t, e, n) {
              return ii(t, { tooltip: e, tooltipItems: n, type: "tooltip" });
            })(this.chart.getContext(), this, this._tooltipItems))
          );
        }
        getTitle(e, n) {
          const { callbacks: i } = n,
            s = gt(i, "beforeTitle", this, e),
            r = gt(i, "title", this, e),
            o = gt(i, "afterTitle", this, e);
          let a = [];
          return (a = mn(a, jn(s))), (a = mn(a, jn(r))), (a = mn(a, jn(o))), a;
        }
        getBeforeBody(e, n) {
          return ID(gt(n.callbacks, "beforeBody", this, e));
        }
        getBody(e, n) {
          const { callbacks: i } = n,
            s = [];
          return (
            ae(e, (r) => {
              const o = { before: [], lines: [], after: [] },
                a = TD(i, r);
              mn(o.before, jn(gt(a, "beforeLabel", this, r))),
                mn(o.lines, gt(a, "label", this, r)),
                mn(o.after, jn(gt(a, "afterLabel", this, r))),
                s.push(o);
            }),
            s
          );
        }
        getAfterBody(e, n) {
          return ID(gt(n.callbacks, "afterBody", this, e));
        }
        getFooter(e, n) {
          const { callbacks: i } = n,
            s = gt(i, "beforeFooter", this, e),
            r = gt(i, "footer", this, e),
            o = gt(i, "afterFooter", this, e);
          let a = [];
          return (a = mn(a, jn(s))), (a = mn(a, jn(r))), (a = mn(a, jn(o))), a;
        }
        _createItems(e) {
          const n = this._active,
            i = this.chart.data,
            s = [],
            r = [],
            o = [];
          let l,
            c,
            a = [];
          for (l = 0, c = n.length; l < c; ++l) a.push(s2(this.chart, n[l]));
          return (
            e.filter && (a = a.filter((u, d, f) => e.filter(u, d, f, i))),
            e.itemSort && (a = a.sort((u, d) => e.itemSort(u, d, i))),
            ae(a, (u) => {
              const d = TD(e.callbacks, u);
              s.push(gt(d, "labelColor", this, u)),
                r.push(gt(d, "labelPointStyle", this, u)),
                o.push(gt(d, "labelTextColor", this, u));
            }),
            (this.labelColors = s),
            (this.labelPointStyles = r),
            (this.labelTextColors = o),
            (this.dataPoints = a),
            a
          );
        }
        update(e, n) {
          const i = this.options.setContext(this.getContext()),
            s = this._active;
          let r,
            o = [];
          if (s.length) {
            const a = so[i.position].call(this, s, this._eventPosition);
            (o = this._createItems(i)),
              (this.title = this.getTitle(o, i)),
              (this.beforeBody = this.getBeforeBody(o, i)),
              (this.body = this.getBody(o, i)),
              (this.afterBody = this.getAfterBody(o, i)),
              (this.footer = this.getFooter(o, i));
            const l = (this._size = ED(this, i)),
              c = Object.assign({}, a, l),
              u = MD(this.chart, i, c),
              d = SD(i, c, u, this.chart);
            (this.xAlign = u.xAlign),
              (this.yAlign = u.yAlign),
              (r = {
                opacity: 1,
                x: d.x,
                y: d.y,
                width: l.width,
                height: l.height,
                caretX: a.x,
                caretY: a.y,
              });
          } else 0 !== this.opacity && (r = { opacity: 0 });
          (this._tooltipItems = o),
            (this.$context = void 0),
            r && this._resolveAnimations().update(this, r),
            e &&
              i.external &&
              i.external.call(this, {
                chart: this.chart,
                tooltip: this,
                replay: n,
              });
        }
        drawCaret(e, n, i, s) {
          const r = this.getCaretPosition(e, i, s);
          n.lineTo(r.x1, r.y1), n.lineTo(r.x2, r.y2), n.lineTo(r.x3, r.y3);
        }
        getCaretPosition(e, n, i) {
          const { xAlign: s, yAlign: r } = this,
            { caretSize: o, cornerRadius: a } = i,
            { topLeft: l, topRight: c, bottomLeft: u, bottomRight: d } = Ii(a),
            { x: f, y: h } = e,
            { width: p, height: g } = n;
          let m, y, b, _, v, D;
          return (
            "center" === r
              ? ((v = h + g / 2),
                "left" === s
                  ? ((m = f), (y = m - o), (_ = v + o), (D = v - o))
                  : ((m = f + p), (y = m + o), (_ = v - o), (D = v + o)),
                (b = m))
              : ((y =
                  "left" === s
                    ? f + Math.max(l, u) + o
                    : "right" === s
                    ? f + p - Math.max(c, d) - o
                    : this.caretX),
                "top" === r
                  ? ((_ = h), (v = _ - o), (m = y - o), (b = y + o))
                  : ((_ = h + g), (v = _ + o), (m = y + o), (b = y - o)),
                (D = _)),
            { x1: m, x2: y, x3: b, y1: _, y2: v, y3: D }
          );
        }
        drawTitle(e, n, i) {
          const s = this.title,
            r = s.length;
          let o, a, l;
          if (r) {
            const c = ks(i.rtl, this.x, this.width);
            for (
              e.x = Al(this, i.titleAlign, i),
                n.textAlign = c.textAlign(i.titleAlign),
                n.textBaseline = "middle",
                o = Ve(i.titleFont),
                a = i.titleSpacing,
                n.fillStyle = i.titleColor,
                n.font = o.string,
                l = 0;
              l < r;
              ++l
            )
              n.fillText(s[l], c.x(e.x), e.y + o.lineHeight / 2),
                (e.y += o.lineHeight + a),
                l + 1 === r && (e.y += i.titleMarginBottom - a);
          }
        }
        _drawColorBox(e, n, i, s, r) {
          const o = this.labelColors[i],
            a = this.labelPointStyles[i],
            { boxHeight: l, boxWidth: c, boxPadding: u } = r,
            d = Ve(r.bodyFont),
            f = Al(this, "left", r),
            h = s.x(f),
            g = n.y + (l < d.lineHeight ? (d.lineHeight - l) / 2 : 0);
          if (r.usePointStyle) {
            const m = {
                radius: Math.min(c, l) / 2,
                pointStyle: a.pointStyle,
                rotation: a.rotation,
                borderWidth: 1,
              },
              y = s.leftForLtr(h, c) + c / 2,
              b = g + l / 2;
            (e.strokeStyle = r.multiKeyBackground),
              (e.fillStyle = r.multiKeyBackground),
              vf(e, m, y, b),
              (e.strokeStyle = o.borderColor),
              (e.fillStyle = o.backgroundColor),
              vf(e, m, y, b);
          } else {
            (e.lineWidth = Y(o.borderWidth)
              ? Math.max(...Object.values(o.borderWidth))
              : o.borderWidth || 1),
              (e.strokeStyle = o.borderColor),
              e.setLineDash(o.borderDash || []),
              (e.lineDashOffset = o.borderDashOffset || 0);
            const m = s.leftForLtr(h, c - u),
              y = s.leftForLtr(s.xPlus(h, 1), c - u - 2),
              b = Ii(o.borderRadius);
            Object.values(b).some((_) => 0 !== _)
              ? (e.beginPath(),
                (e.fillStyle = r.multiKeyBackground),
                qr(e, { x: m, y: g, w: c, h: l, radius: b }),
                e.fill(),
                e.stroke(),
                (e.fillStyle = o.backgroundColor),
                e.beginPath(),
                qr(e, { x: y, y: g + 1, w: c - 2, h: l - 2, radius: b }),
                e.fill())
              : ((e.fillStyle = r.multiKeyBackground),
                e.fillRect(m, g, c, l),
                e.strokeRect(m, g, c, l),
                (e.fillStyle = o.backgroundColor),
                e.fillRect(y, g + 1, c - 2, l - 2));
          }
          e.fillStyle = this.labelTextColors[i];
        }
        drawBody(e, n, i) {
          const { body: s } = this,
            {
              bodySpacing: r,
              bodyAlign: o,
              displayColors: a,
              boxHeight: l,
              boxWidth: c,
              boxPadding: u,
            } = i,
            d = Ve(i.bodyFont);
          let f = d.lineHeight,
            h = 0;
          const p = ks(i.rtl, this.x, this.width),
            g = function (M) {
              n.fillText(M, p.x(e.x + h), e.y + f / 2), (e.y += f + r);
            },
            m = p.textAlign(o);
          let y, b, _, v, D, C, x;
          for (
            n.textAlign = o,
              n.textBaseline = "middle",
              n.font = d.string,
              e.x = Al(this, m, i),
              n.fillStyle = i.bodyColor,
              ae(this.beforeBody, g),
              h =
                a && "right" !== m
                  ? "center" === o
                    ? c / 2 + u
                    : c + 2 + u
                  : 0,
              v = 0,
              C = s.length;
            v < C;
            ++v
          ) {
            for (
              y = s[v],
                b = this.labelTextColors[v],
                n.fillStyle = b,
                ae(y.before, g),
                _ = y.lines,
                a &&
                  _.length &&
                  (this._drawColorBox(n, e, v, p, i),
                  (f = Math.max(d.lineHeight, l))),
                D = 0,
                x = _.length;
              D < x;
              ++D
            )
              g(_[D]), (f = d.lineHeight);
            ae(y.after, g);
          }
          (h = 0), (f = d.lineHeight), ae(this.afterBody, g), (e.y -= r);
        }
        drawFooter(e, n, i) {
          const s = this.footer,
            r = s.length;
          let o, a;
          if (r) {
            const l = ks(i.rtl, this.x, this.width);
            for (
              e.x = Al(this, i.footerAlign, i),
                e.y += i.footerMarginTop,
                n.textAlign = l.textAlign(i.footerAlign),
                n.textBaseline = "middle",
                o = Ve(i.footerFont),
                n.fillStyle = i.footerColor,
                n.font = o.string,
                a = 0;
              a < r;
              ++a
            )
              n.fillText(s[a], l.x(e.x), e.y + o.lineHeight / 2),
                (e.y += o.lineHeight + i.footerSpacing);
          }
        }
        drawBackground(e, n, i, s) {
          const { xAlign: r, yAlign: o } = this,
            { x: a, y: l } = e,
            { width: c, height: u } = i,
            {
              topLeft: d,
              topRight: f,
              bottomLeft: h,
              bottomRight: p,
            } = Ii(s.cornerRadius);
          (n.fillStyle = s.backgroundColor),
            (n.strokeStyle = s.borderColor),
            (n.lineWidth = s.borderWidth),
            n.beginPath(),
            n.moveTo(a + d, l),
            "top" === o && this.drawCaret(e, n, i, s),
            n.lineTo(a + c - f, l),
            n.quadraticCurveTo(a + c, l, a + c, l + f),
            "center" === o && "right" === r && this.drawCaret(e, n, i, s),
            n.lineTo(a + c, l + u - p),
            n.quadraticCurveTo(a + c, l + u, a + c - p, l + u),
            "bottom" === o && this.drawCaret(e, n, i, s),
            n.lineTo(a + h, l + u),
            n.quadraticCurveTo(a, l + u, a, l + u - h),
            "center" === o && "left" === r && this.drawCaret(e, n, i, s),
            n.lineTo(a, l + d),
            n.quadraticCurveTo(a, l, a + d, l),
            n.closePath(),
            n.fill(),
            s.borderWidth > 0 && n.stroke();
        }
        _updateAnimationTarget(e) {
          const n = this.chart,
            i = this.$animations,
            s = i && i.x,
            r = i && i.y;
          if (s || r) {
            const o = so[e.position].call(
              this,
              this._active,
              this._eventPosition
            );
            if (!o) return;
            const a = (this._size = ED(this, e)),
              l = Object.assign({}, o, this._size),
              c = MD(n, e, l),
              u = SD(e, l, c, n);
            (s._to !== u.x || r._to !== u.y) &&
              ((this.xAlign = c.xAlign),
              (this.yAlign = c.yAlign),
              (this.width = a.width),
              (this.height = a.height),
              (this.caretX = o.x),
              (this.caretY = o.y),
              this._resolveAnimations().update(this, u));
          }
        }
        _willRender() {
          return !!this.opacity;
        }
        draw(e) {
          const n = this.options.setContext(this.getContext());
          let i = this.opacity;
          if (!i) return;
          this._updateAnimationTarget(n);
          const s = { width: this.width, height: this.height },
            r = { x: this.x, y: this.y };
          i = Math.abs(i) < 0.001 ? 0 : i;
          const o = Je(n.padding);
          n.enabled &&
            (this.title.length ||
              this.beforeBody.length ||
              this.body.length ||
              this.afterBody.length ||
              this.footer.length) &&
            (e.save(),
            (e.globalAlpha = i),
            this.drawBackground(r, e, s, n),
            h0(e, n.textDirection),
            (r.y += o.top),
            this.drawTitle(r, e, n),
            this.drawBody(r, e, n),
            this.drawFooter(r, e, n),
            p0(e, n.textDirection),
            e.restore());
        }
        getActiveElements() {
          return this._active || [];
        }
        setActiveElements(e, n) {
          const i = this._active,
            s = e.map(({ datasetIndex: a, index: l }) => {
              const c = this.chart.getDatasetMeta(a);
              if (!c) throw new Error("Cannot find a dataset at index " + a);
              return { datasetIndex: a, element: c.data[l], index: l };
            }),
            r = !el(i, s),
            o = this._positionChanged(s, n);
          (r || o) &&
            ((this._active = s),
            (this._eventPosition = n),
            (this._ignoreReplayEvents = !0),
            this.update(!0));
        }
        handleEvent(e, n, i = !0) {
          if (n && this._ignoreReplayEvents) return !1;
          this._ignoreReplayEvents = !1;
          const s = this.options,
            r = this._active || [],
            o = this._getActiveElements(e, r, n, i),
            a = this._positionChanged(o, e),
            l = n || !el(o, r) || a;
          return (
            l &&
              ((this._active = o),
              (s.enabled || s.external) &&
                ((this._eventPosition = { x: e.x, y: e.y }),
                this.update(!0, n))),
            l
          );
        }
        _getActiveElements(e, n, i, s) {
          const r = this.options;
          if ("mouseout" === e.type) return [];
          if (!s) return n;
          const o = this.chart.getElementsAtEventForMode(e, r.mode, r, i);
          return r.reverse && o.reverse(), o;
        }
        _positionChanged(e, n) {
          const { caretX: i, caretY: s, options: r } = this,
            o = so[r.position].call(this, e, n);
          return !1 !== o && (i !== o.x || s !== o.y);
        }
      }
      I(zf, "positioners", so);
      var d2 = {
          id: "tooltip",
          _element: zf,
          positioners: so,
          afterInit(t, e, n) {
            n && (t.tooltip = new zf({ chart: t, options: n }));
          },
          beforeUpdate(t, e, n) {
            t.tooltip && t.tooltip.initialize(n);
          },
          reset(t, e, n) {
            t.tooltip && t.tooltip.initialize(n);
          },
          afterDraw(t) {
            const e = t.tooltip;
            if (e && e._willRender()) {
              const n = { tooltip: e };
              if (
                !1 ===
                t.notifyPlugins("beforeTooltipDraw", { ...n, cancelable: !0 })
              )
                return;
              e.draw(t.ctx), t.notifyPlugins("afterTooltipDraw", n);
            }
          },
          afterEvent(t, e) {
            t.tooltip &&
              t.tooltip.handleEvent(e.event, e.replay, e.inChartArea) &&
              (e.changed = !0);
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
            boxHeight: (t, e) => e.bodyFont.size,
            boxWidth: (t, e) => e.bodyFont.size,
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
            callbacks: AD,
          },
          defaultRoutes: {
            bodyFont: "font",
            footerFont: "font",
            titleFont: "font",
          },
          descriptors: {
            _scriptable: (t) =>
              "filter" !== t && "itemSort" !== t && "external" !== t,
            _indexable: !1,
            callbacks: { _scriptable: !1, _indexable: !1 },
            animation: { _fallback: !1 },
            animations: { _fallback: "animation" },
          },
          additionalOptionScopes: ["interaction"],
        },
        f2 = Object.freeze({
          __proto__: null,
          Colors: xL,
          Decimation: IL,
          Filler: YL,
          Legend: e2,
          SubTitle: i2,
          Title: n2,
          Tooltip: d2,
        });
      function PD(t) {
        const e = this.getLabels();
        return t >= 0 && t < e.length ? e[t] : t;
      }
      class Uf extends Ni {
        constructor(e) {
          super(e),
            (this._startValue = void 0),
            (this._valueRange = 0),
            (this._addedLabels = []);
        }
        init(e) {
          const n = this._addedLabels;
          if (n.length) {
            const i = this.getLabels();
            for (const { index: s, label: r } of n)
              i[s] === r && i.splice(s, 1);
            this._addedLabels = [];
          }
          super.init(e);
        }
        parse(e, n) {
          if (Q(e)) return null;
          const i = this.getLabels();
          return ((t, e) => (null === t ? null : $e(Math.round(t), 0, e)))(
            (n =
              isFinite(n) && i[n] === e
                ? n
                : (function p2(t, e, n, i) {
                    const s = t.indexOf(e);
                    return -1 === s
                      ? ((t, e, n, i) => (
                          "string" == typeof e
                            ? ((n = t.push(e) - 1),
                              i.unshift({ index: n, label: e }))
                            : isNaN(e) && (n = null),
                          n
                        ))(t, e, n, i)
                      : s !== t.lastIndexOf(e)
                      ? n
                      : s;
                  })(i, e, H(n, e), this._addedLabels)),
            i.length - 1
          );
        }
        determineDataLimits() {
          const { minDefined: e, maxDefined: n } = this.getUserBounds();
          let { min: i, max: s } = this.getMinMax(!0);
          "ticks" === this.options.bounds &&
            (e || (i = 0), n || (s = this.getLabels().length - 1)),
            (this.min = i),
            (this.max = s);
        }
        buildTicks() {
          const e = this.min,
            n = this.max,
            i = this.options.offset,
            s = [];
          let r = this.getLabels();
          (r = 0 === e && n === r.length - 1 ? r : r.slice(e, n + 1)),
            (this._valueRange = Math.max(r.length - (i ? 0 : 1), 1)),
            (this._startValue = this.min - (i ? 0.5 : 0));
          for (let o = e; o <= n; o++) s.push({ value: o });
          return s;
        }
        getLabelForValue(e) {
          return PD.call(this, e);
        }
        configure() {
          super.configure(),
            this.isHorizontal() || (this._reversePixels = !this._reversePixels);
        }
        getPixelForValue(e) {
          return (
            "number" != typeof e && (e = this.parse(e)),
            null === e
              ? NaN
              : this.getPixelForDecimal(
                  (e - this._startValue) / this._valueRange
                )
          );
        }
        getPixelForTick(e) {
          const n = this.ticks;
          return e < 0 || e > n.length - 1
            ? null
            : this.getPixelForValue(n[e].value);
        }
        getValueForPixel(e) {
          return Math.round(
            this._startValue + this.getDecimalForPixel(e) * this._valueRange
          );
        }
        getBasePixel() {
          return this.bottom;
        }
      }
      function OD(t, e, { horizontal: n, minRotation: i }) {
        const s = Qt(i),
          r = (n ? Math.sin(s) : Math.cos(s)) || 0.001;
        return Math.min(e / r, 0.75 * e * ("" + t).length);
      }
      I(Uf, "id", "category"), I(Uf, "defaults", { ticks: { callback: PD } });
      class Pl extends Ni {
        constructor(e) {
          super(e),
            (this.start = void 0),
            (this.end = void 0),
            (this._startValue = void 0),
            (this._endValue = void 0),
            (this._valueRange = 0);
        }
        parse(e, n) {
          return Q(e) ||
            (("number" == typeof e || e instanceof Number) && !isFinite(+e))
            ? null
            : +e;
        }
        handleTickRangeOptions() {
          const { beginAtZero: e } = this.options,
            { minDefined: n, maxDefined: i } = this.getUserBounds();
          let { min: s, max: r } = this;
          const o = (l) => (s = n ? s : l),
            a = (l) => (r = i ? r : l);
          if (e) {
            const l = pn(s),
              c = pn(r);
            l < 0 && c < 0 ? a(0) : l > 0 && c > 0 && o(0);
          }
          if (s === r) {
            let l = 0 === r ? 1 : Math.abs(0.05 * r);
            a(r + l), e || o(s - l);
          }
          (this.min = s), (this.max = r);
        }
        getTickLimit() {
          const e = this.options.ticks;
          let s,
            { maxTicksLimit: n, stepSize: i } = e;
          return (
            i
              ? ((s = Math.ceil(this.max / i) - Math.floor(this.min / i) + 1),
                s > 1e3 &&
                  (console.warn(
                    `scales.${this.id}.ticks.stepSize: ${i} would result generating up to ${s} ticks. Limiting to 1000.`
                  ),
                  (s = 1e3)))
              : ((s = this.computeTickLimit()), (n = n || 11)),
            n && (s = Math.min(n, s)),
            s
          );
        }
        computeTickLimit() {
          return Number.POSITIVE_INFINITY;
        }
        buildTicks() {
          const e = this.options,
            n = e.ticks;
          let i = this.getTickLimit();
          i = Math.max(2, i);
          const o = (function m2(t, e) {
            const n = [],
              {
                bounds: s,
                step: r,
                min: o,
                max: a,
                precision: l,
                count: c,
                maxTicks: u,
                maxDigits: d,
                includeBounds: f,
              } = t,
              h = r || 1,
              p = u - 1,
              { min: g, max: m } = e,
              y = !Q(o),
              b = !Q(a),
              _ = !Q(c),
              v = (m - g) / (d + 1);
            let C,
              x,
              M,
              T,
              D = Fv((m - g) / p / h) * h;
            if (D < 1e-14 && !y && !b) return [{ value: g }, { value: m }];
            (T = Math.ceil(m / D) - Math.floor(g / D)),
              T > p && (D = Fv((T * D) / p / h) * h),
              Q(l) || ((C = Math.pow(10, l)), (D = Math.ceil(D * C) / C)),
              "ticks" === s
                ? ((x = Math.floor(g / D) * D), (M = Math.ceil(m / D) * D))
                : ((x = g), (M = m)),
              y &&
              b &&
              r &&
              (function fN(t, e) {
                const n = Math.round(t);
                return n - e <= t && n + e >= t;
              })((a - o) / r, D / 1e3)
                ? ((T = Math.round(Math.min((a - o) / D, u))),
                  (D = (a - o) / T),
                  (x = o),
                  (M = a))
                : _
                ? ((x = y ? o : x),
                  (M = b ? a : M),
                  (T = c - 1),
                  (D = (M - x) / T))
                : ((T = (M - x) / D),
                  (T = Hr(T, Math.round(T), D / 1e3)
                    ? Math.round(T)
                    : Math.ceil(T)));
            const B = Math.max(Lv(D), Lv(x));
            (C = Math.pow(10, Q(l) ? B : l)),
              (x = Math.round(x * C) / C),
              (M = Math.round(M * C) / C);
            let j = 0;
            for (
              y &&
              (f && x !== o
                ? (n.push({ value: o }),
                  x < o && j++,
                  Hr(Math.round((x + j * D) * C) / C, o, OD(o, v, t)) && j++)
                : x < o && j++);
              j < T;
              ++j
            )
              n.push({ value: Math.round((x + j * D) * C) / C });
            return (
              b && f && M !== a
                ? n.length && Hr(n[n.length - 1].value, a, OD(a, v, t))
                  ? (n[n.length - 1].value = a)
                  : n.push({ value: a })
                : (!b || M === a) && n.push({ value: M }),
              n
            );
          })(
            {
              maxTicks: i,
              bounds: e.bounds,
              min: e.min,
              max: e.max,
              precision: n.precision,
              step: n.stepSize,
              count: n.count,
              maxDigits: this._maxDigits(),
              horizontal: this.isHorizontal(),
              minRotation: n.minRotation || 0,
              includeBounds: !1 !== n.includeBounds,
            },
            this._range || this
          );
          return (
            "ticks" === e.bounds && Rv(o, this, "value"),
            e.reverse
              ? (o.reverse(), (this.start = this.max), (this.end = this.min))
              : ((this.start = this.min), (this.end = this.max)),
            o
          );
        }
        configure() {
          const e = this.ticks;
          let n = this.min,
            i = this.max;
          if ((super.configure(), this.options.offset && e.length)) {
            const s = (i - n) / Math.max(e.length - 1, 1) / 2;
            (n -= s), (i += s);
          }
          (this._startValue = n),
            (this._endValue = i),
            (this._valueRange = i - n);
        }
        getLabelForValue(e) {
          return Ur(e, this.chart.options.locale, this.options.ticks.format);
        }
      }
      class Wf extends Pl {
        determineDataLimits() {
          const { min: e, max: n } = this.getMinMax(!0);
          (this.min = Ee(e) ? e : 0),
            (this.max = Ee(n) ? n : 1),
            this.handleTickRangeOptions();
        }
        computeTickLimit() {
          const e = this.isHorizontal(),
            n = e ? this.width : this.height,
            i = Qt(this.options.ticks.minRotation),
            s = (e ? Math.sin(i) : Math.cos(i)) || 0.001,
            r = this._resolveTickFontOptions(0);
          return Math.ceil(n / Math.min(40, r.lineHeight / s));
        }
        getPixelForValue(e) {
          return null === e
            ? NaN
            : this.getPixelForDecimal(
                (e - this._startValue) / this._valueRange
              );
        }
        getValueForPixel(e) {
          return (
            this._startValue + this.getDecimalForPixel(e) * this._valueRange
          );
        }
      }
      I(Wf, "id", "linear"),
        I(Wf, "defaults", { ticks: { callback: sl.formatters.numeric } });
      const ro = (t) => Math.floor(ni(t)),
        Fi = (t, e) => Math.pow(10, ro(t) + e);
      function kD(t) {
        return t / Math.pow(10, ro(t)) == 1;
      }
      function ND(t, e, n) {
        const i = Math.pow(10, n),
          s = Math.floor(t / i);
        return Math.ceil(e / i) - s;
      }
      class Gf extends Ni {
        constructor(e) {
          super(e),
            (this.start = void 0),
            (this.end = void 0),
            (this._startValue = void 0),
            (this._valueRange = 0);
        }
        parse(e, n) {
          const i = Pl.prototype.parse.apply(this, [e, n]);
          if (0 !== i) return Ee(i) && i > 0 ? i : null;
          this._zero = !0;
        }
        determineDataLimits() {
          const { min: e, max: n } = this.getMinMax(!0);
          (this.min = Ee(e) ? Math.max(0, e) : null),
            (this.max = Ee(n) ? Math.max(0, n) : null),
            this.options.beginAtZero && (this._zero = !0),
            this._zero &&
              this.min !== this._suggestedMin &&
              !Ee(this._userMin) &&
              (this.min =
                e === Fi(this.min, 0) ? Fi(this.min, -1) : Fi(this.min, 0)),
            this.handleTickRangeOptions();
        }
        handleTickRangeOptions() {
          const { minDefined: e, maxDefined: n } = this.getUserBounds();
          let i = this.min,
            s = this.max;
          const r = (a) => (i = e ? i : a),
            o = (a) => (s = n ? s : a);
          i === s && (i <= 0 ? (r(1), o(10)) : (r(Fi(i, -1)), o(Fi(s, 1)))),
            i <= 0 && r(Fi(s, -1)),
            s <= 0 && o(Fi(i, 1)),
            (this.min = i),
            (this.max = s);
        }
        buildTicks() {
          const e = this.options,
            i = (function _2(t, { min: e, max: n }) {
              e = St(t.min, e);
              const i = [],
                s = ro(e);
              let r = (function y2(t, e) {
                  let i = ro(e - t);
                  for (; ND(t, e, i) > 10; ) i++;
                  for (; ND(t, e, i) < 10; ) i--;
                  return Math.min(i, ro(t));
                })(e, n),
                o = r < 0 ? Math.pow(10, Math.abs(r)) : 1;
              const a = Math.pow(10, r),
                l = s > r ? Math.pow(10, s) : 0,
                c = Math.round((e - l) * o) / o,
                u = Math.floor((e - l) / a / 10) * a * 10;
              let d = Math.floor((c - u) / Math.pow(10, r)),
                f = St(
                  t.min,
                  Math.round((l + u + d * Math.pow(10, r)) * o) / o
                );
              for (; f < n; )
                i.push({ value: f, major: kD(f), significand: d }),
                  d >= 10 ? (d = d < 15 ? 15 : 20) : d++,
                  d >= 20 && (r++, (d = 2), (o = r >= 0 ? 1 : o)),
                  (f = Math.round((l + u + d * Math.pow(10, r)) * o) / o);
              const h = St(t.max, f);
              return i.push({ value: h, major: kD(h), significand: d }), i;
            })({ min: this._userMin, max: this._userMax }, this);
          return (
            "ticks" === e.bounds && Rv(i, this, "value"),
            e.reverse
              ? (i.reverse(), (this.start = this.max), (this.end = this.min))
              : ((this.start = this.min), (this.end = this.max)),
            i
          );
        }
        getLabelForValue(e) {
          return void 0 === e
            ? "0"
            : Ur(e, this.chart.options.locale, this.options.ticks.format);
        }
        configure() {
          const e = this.min;
          super.configure(),
            (this._startValue = ni(e)),
            (this._valueRange = ni(this.max) - ni(e));
        }
        getPixelForValue(e) {
          return (
            (void 0 === e || 0 === e) && (e = this.min),
            null === e || isNaN(e)
              ? NaN
              : this.getPixelForDecimal(
                  e === this.min
                    ? 0
                    : (ni(e) - this._startValue) / this._valueRange
                )
          );
        }
        getValueForPixel(e) {
          const n = this.getDecimalForPixel(e);
          return Math.pow(10, this._startValue + n * this._valueRange);
        }
      }
      function qf(t) {
        const e = t.ticks;
        if (e.display && t.display) {
          const n = Je(e.backdropPadding);
          return H(e.font && e.font.size, Se.font.size) + n.height;
        }
        return 0;
      }
      function b2(t, e, n) {
        return (
          (n = ge(n) ? n : [n]),
          { w: TN(t, e.string, n), h: n.length * e.lineHeight }
        );
      }
      function FD(t, e, n, i, s) {
        return t === i || t === s
          ? { start: e - n / 2, end: e + n / 2 }
          : t < i || t > s
          ? { start: e - n, end: e }
          : { start: e, end: e + n };
      }
      function D2(t, e, n, i, s) {
        const r = Math.abs(Math.sin(n)),
          o = Math.abs(Math.cos(n));
        let a = 0,
          l = 0;
        i.start < e.l
          ? ((a = (e.l - i.start) / r), (t.l = Math.min(t.l, e.l - a)))
          : i.end > e.r &&
            ((a = (i.end - e.r) / r), (t.r = Math.max(t.r, e.r + a))),
          s.start < e.t
            ? ((l = (e.t - s.start) / o), (t.t = Math.min(t.t, e.t - l)))
            : s.end > e.b &&
              ((l = (s.end - e.b) / o), (t.b = Math.max(t.b, e.b + l)));
      }
      function C2(t) {
        return 0 === t || 180 === t ? "center" : t < 180 ? "left" : "right";
      }
      function x2(t, e, n) {
        return "right" === n ? (t -= e) : "center" === n && (t -= e / 2), t;
      }
      function E2(t, e, n) {
        return (
          90 === n || 270 === n
            ? (t -= e / 2)
            : (n > 270 || n < 90) && (t -= e),
          t
        );
      }
      function RD(t, e, n, i) {
        const { ctx: s } = t;
        if (n) s.arc(t.xCenter, t.yCenter, e, 0, me);
        else {
          let r = t.getPointPosition(0, e);
          s.moveTo(r.x, r.y);
          for (let o = 1; o < i; o++)
            (r = t.getPointPosition(o, e)), s.lineTo(r.x, r.y);
        }
      }
      I(Gf, "id", "logarithmic"),
        I(Gf, "defaults", {
          ticks: {
            callback: sl.formatters.logarithmic,
            major: { enabled: !0 },
          },
        });
      class oo extends Pl {
        constructor(e) {
          super(e),
            (this.xCenter = void 0),
            (this.yCenter = void 0),
            (this.drawingArea = void 0),
            (this._pointLabels = []),
            (this._pointLabelItems = []);
        }
        setDimensions() {
          const e = (this._padding = Je(qf(this.options) / 2)),
            n = (this.width = this.maxWidth - e.width),
            i = (this.height = this.maxHeight - e.height);
          (this.xCenter = Math.floor(this.left + n / 2 + e.left)),
            (this.yCenter = Math.floor(this.top + i / 2 + e.top)),
            (this.drawingArea = Math.floor(Math.min(n, i) / 2));
        }
        determineDataLimits() {
          const { min: e, max: n } = this.getMinMax(!1);
          (this.min = Ee(e) && !isNaN(e) ? e : 0),
            (this.max = Ee(n) && !isNaN(n) ? n : 0),
            this.handleTickRangeOptions();
        }
        computeTickLimit() {
          return Math.ceil(this.drawingArea / qf(this.options));
        }
        generateTickLabels(e) {
          Pl.prototype.generateTickLabels.call(this, e),
            (this._pointLabels = this.getLabels()
              .map((n, i) => {
                const s = pe(this.options.pointLabels.callback, [n, i], this);
                return s || 0 === s ? s : "";
              })
              .filter((n, i) => this.chart.getDataVisibility(i)));
        }
        fit() {
          const e = this.options;
          e.display && e.pointLabels.display
            ? (function v2(t) {
                const e = {
                    l: t.left + t._padding.left,
                    r: t.right - t._padding.right,
                    t: t.top + t._padding.top,
                    b: t.bottom - t._padding.bottom,
                  },
                  n = Object.assign({}, e),
                  i = [],
                  s = [],
                  r = t._pointLabels.length,
                  o = t.options.pointLabels,
                  a = o.centerPointLabels ? be / r : 0;
                for (let l = 0; l < r; l++) {
                  const c = o.setContext(t.getPointLabelContext(l));
                  s[l] = c.padding;
                  const u = t.getPointPosition(l, t.drawingArea + s[l], a),
                    d = Ve(c.font),
                    f = b2(t.ctx, d, t._pointLabels[l]);
                  i[l] = f;
                  const h = It(t.getIndexAngle(l) + a),
                    p = Math.round(hf(h));
                  D2(
                    n,
                    e,
                    h,
                    FD(p, u.x, f.w, 0, 180),
                    FD(p, u.y, f.h, 90, 270)
                  );
                }
                t.setCenterPoint(e.l - n.l, n.r - e.r, e.t - n.t, n.b - e.b),
                  (t._pointLabelItems = (function w2(t, e, n) {
                    const i = [],
                      s = t._pointLabels.length,
                      r = t.options,
                      o = qf(r) / 2,
                      a = t.drawingArea,
                      l = r.pointLabels.centerPointLabels ? be / s : 0;
                    for (let c = 0; c < s; c++) {
                      const u = t.getPointPosition(c, a + o + n[c], l),
                        d = Math.round(hf(It(u.angle + Me))),
                        f = e[c],
                        h = E2(u.y, f.h, d),
                        p = C2(d),
                        g = x2(u.x, f.w, p);
                      i.push({
                        x: u.x,
                        y: h,
                        textAlign: p,
                        left: g,
                        top: h,
                        right: g + f.w,
                        bottom: h + f.h,
                      });
                    }
                    return i;
                  })(t, i, s));
              })(this)
            : this.setCenterPoint(0, 0, 0, 0);
        }
        setCenterPoint(e, n, i, s) {
          (this.xCenter += Math.floor((e - n) / 2)),
            (this.yCenter += Math.floor((i - s) / 2)),
            (this.drawingArea -= Math.min(
              this.drawingArea / 2,
              Math.max(e, n, i, s)
            ));
        }
        getIndexAngle(e) {
          return It(
            e * (me / (this._pointLabels.length || 1)) +
              Qt(this.options.startAngle || 0)
          );
        }
        getDistanceFromCenterForValue(e) {
          if (Q(e)) return NaN;
          const n = this.drawingArea / (this.max - this.min);
          return this.options.reverse ? (this.max - e) * n : (e - this.min) * n;
        }
        getValueForDistanceFromCenter(e) {
          if (Q(e)) return NaN;
          const n = e / (this.drawingArea / (this.max - this.min));
          return this.options.reverse ? this.max - n : this.min + n;
        }
        getPointLabelContext(e) {
          const n = this._pointLabels || [];
          if (e >= 0 && e < n.length) {
            const i = n[e];
            return (function I2(t, e, n) {
              return ii(t, { label: n, index: e, type: "pointLabel" });
            })(this.getContext(), e, i);
          }
        }
        getPointPosition(e, n, i = 0) {
          const s = this.getIndexAngle(e) - Me + i;
          return {
            x: Math.cos(s) * n + this.xCenter,
            y: Math.sin(s) * n + this.yCenter,
            angle: s,
          };
        }
        getPointPositionForValue(e, n) {
          return this.getPointPosition(
            e,
            this.getDistanceFromCenterForValue(n)
          );
        }
        getBasePosition(e) {
          return this.getPointPositionForValue(e || 0, this.getBaseValue());
        }
        getPointLabelPosition(e) {
          const {
            left: n,
            top: i,
            right: s,
            bottom: r,
          } = this._pointLabelItems[e];
          return { left: n, top: i, right: s, bottom: r };
        }
        drawBackground() {
          const {
            backgroundColor: e,
            grid: { circular: n },
          } = this.options;
          if (e) {
            const i = this.ctx;
            i.save(),
              i.beginPath(),
              RD(
                this,
                this.getDistanceFromCenterForValue(this._endValue),
                n,
                this._pointLabels.length
              ),
              i.closePath(),
              (i.fillStyle = e),
              i.fill(),
              i.restore();
          }
        }
        drawGrid() {
          const e = this.ctx,
            n = this.options,
            { angleLines: i, grid: s, border: r } = n,
            o = this._pointLabels.length;
          let a, l, c;
          if (
            (n.pointLabels.display &&
              (function M2(t, e) {
                const {
                  ctx: n,
                  options: { pointLabels: i },
                } = t;
                for (let s = e - 1; s >= 0; s--) {
                  const r = i.setContext(t.getPointLabelContext(s)),
                    o = Ve(r.font),
                    {
                      x: a,
                      y: l,
                      textAlign: c,
                      left: u,
                      top: d,
                      right: f,
                      bottom: h,
                    } = t._pointLabelItems[s],
                    { backdropColor: p } = r;
                  if (!Q(p)) {
                    const g = Ii(r.borderRadius),
                      m = Je(r.backdropPadding);
                    n.fillStyle = p;
                    const y = u - m.left,
                      b = d - m.top,
                      _ = f - u + m.width,
                      v = h - d + m.height;
                    Object.values(g).some((D) => 0 !== D)
                      ? (n.beginPath(),
                        qr(n, { x: y, y: b, w: _, h: v, radius: g }),
                        n.fill())
                      : n.fillRect(y, b, _, v);
                  }
                  Si(n, t._pointLabels[s], a, l + o.lineHeight / 2, o, {
                    color: r.color,
                    textAlign: c,
                    textBaseline: "middle",
                  });
                }
              })(this, o),
            s.display &&
              this.ticks.forEach((u, d) => {
                if (0 !== d) {
                  l = this.getDistanceFromCenterForValue(u.value);
                  const f = this.getContext(d),
                    h = s.setContext(f),
                    p = r.setContext(f);
                  !(function S2(t, e, n, i, s) {
                    const r = t.ctx,
                      o = e.circular,
                      { color: a, lineWidth: l } = e;
                    (!o && !i) ||
                      !a ||
                      !l ||
                      n < 0 ||
                      (r.save(),
                      (r.strokeStyle = a),
                      (r.lineWidth = l),
                      r.setLineDash(s.dash),
                      (r.lineDashOffset = s.dashOffset),
                      r.beginPath(),
                      RD(t, n, o, i),
                      r.closePath(),
                      r.stroke(),
                      r.restore());
                  })(this, h, l, o, p);
                }
              }),
            i.display)
          ) {
            for (e.save(), a = o - 1; a >= 0; a--) {
              const u = i.setContext(this.getPointLabelContext(a)),
                { color: d, lineWidth: f } = u;
              !f ||
                !d ||
                ((e.lineWidth = f),
                (e.strokeStyle = d),
                e.setLineDash(u.borderDash),
                (e.lineDashOffset = u.borderDashOffset),
                (l = this.getDistanceFromCenterForValue(
                  n.ticks.reverse ? this.min : this.max
                )),
                (c = this.getPointPosition(a, l)),
                e.beginPath(),
                e.moveTo(this.xCenter, this.yCenter),
                e.lineTo(c.x, c.y),
                e.stroke());
            }
            e.restore();
          }
        }
        drawBorder() {}
        drawLabels() {
          const e = this.ctx,
            n = this.options,
            i = n.ticks;
          if (!i.display) return;
          const s = this.getIndexAngle(0);
          let r, o;
          e.save(),
            e.translate(this.xCenter, this.yCenter),
            e.rotate(s),
            (e.textAlign = "center"),
            (e.textBaseline = "middle"),
            this.ticks.forEach((a, l) => {
              if (0 === l && !n.reverse) return;
              const c = i.setContext(this.getContext(l)),
                u = Ve(c.font);
              if (
                ((r = this.getDistanceFromCenterForValue(this.ticks[l].value)),
                c.showLabelBackdrop)
              ) {
                (e.font = u.string),
                  (o = e.measureText(a.label).width),
                  (e.fillStyle = c.backdropColor);
                const d = Je(c.backdropPadding);
                e.fillRect(
                  -o / 2 - d.left,
                  -r - u.size / 2 - d.top,
                  o + d.width,
                  u.size + d.height
                );
              }
              Si(e, a.label, 0, -r, u, { color: c.color });
            }),
            e.restore();
        }
        drawTitle() {}
      }
      I(oo, "id", "radialLinear"),
        I(oo, "defaults", {
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
          ticks: { showLabelBackdrop: !0, callback: sl.formatters.numeric },
          pointLabels: {
            backdropColor: void 0,
            backdropPadding: 2,
            display: !0,
            font: { size: 10 },
            callback: (e) => e,
            padding: 5,
            centerPointLabels: !1,
          },
        }),
        I(oo, "defaultRoutes", {
          "angleLines.color": "borderColor",
          "pointLabels.color": "color",
          "ticks.color": "color",
        }),
        I(oo, "descriptors", { angleLines: { _fallback: "grid" } });
      const Ol = {
          millisecond: { common: !0, size: 1, steps: 1e3 },
          second: { common: !0, size: 1e3, steps: 60 },
          minute: { common: !0, size: 6e4, steps: 60 },
          hour: { common: !0, size: 36e5, steps: 24 },
          day: { common: !0, size: 864e5, steps: 30 },
          week: { common: !1, size: 6048e5, steps: 4 },
          month: { common: !0, size: 2628e6, steps: 12 },
          quarter: { common: !1, size: 7884e6, steps: 4 },
          year: { common: !0, size: 3154e7 },
        },
        mt = Object.keys(Ol);
      function T2(t, e) {
        return t - e;
      }
      function LD(t, e) {
        if (Q(e)) return null;
        const n = t._adapter,
          { parser: i, round: s, isoWeekday: r } = t._parseOpts;
        let o = e;
        return (
          "function" == typeof i && (o = i(o)),
          Ee(o) || (o = "string" == typeof i ? n.parse(o, i) : n.parse(o)),
          null === o
            ? null
            : (s &&
                (o =
                  "week" !== s || (!As(r) && !0 !== r)
                    ? n.startOf(o, s)
                    : n.startOf(o, "isoWeek", r)),
              +o)
        );
      }
      function BD(t, e, n, i) {
        const s = mt.length;
        for (let r = mt.indexOf(t); r < s - 1; ++r) {
          const o = Ol[mt[r]],
            a = o.steps ? o.steps : Number.MAX_SAFE_INTEGER;
          if (o.common && Math.ceil((n - e) / (a * o.size)) <= i) return mt[r];
        }
        return mt[s - 1];
      }
      function jD(t, e, n) {
        if (n) {
          if (n.length) {
            const { lo: i, hi: s } = gf(n, e);
            t[n[i] >= e ? n[i] : n[s]] = !0;
          }
        } else t[e] = !0;
      }
      function VD(t, e, n) {
        const i = [],
          s = {},
          r = e.length;
        let o, a;
        for (o = 0; o < r; ++o)
          (a = e[o]), (s[a] = o), i.push({ value: a, major: !1 });
        return 0 !== r && n
          ? (function O2(t, e, n, i) {
              const s = t._adapter,
                r = +s.startOf(e[0].value, i),
                o = e[e.length - 1].value;
              let a, l;
              for (a = r; a <= o; a = +s.add(a, 1, i))
                (l = n[a]), l >= 0 && (e[l].major = !0);
              return e;
            })(t, i, s, n)
          : i;
      }
      class ao extends Ni {
        constructor(e) {
          super(e),
            (this._cache = { data: [], labels: [], all: [] }),
            (this._unit = "day"),
            (this._majorUnit = void 0),
            (this._offsets = {}),
            (this._normalized = !1),
            (this._parseOpts = void 0);
        }
        init(e, n = {}) {
          const i = e.time || (e.time = {}),
            s = (this._adapter = new WF__date(e.adapters.date));
          s.init(n),
            Vr(i.displayFormats, s.formats()),
            (this._parseOpts = {
              parser: i.parser,
              round: i.round,
              isoWeekday: i.isoWeekday,
            }),
            super.init(e),
            (this._normalized = n.normalized);
        }
        parse(e, n) {
          return void 0 === e ? null : LD(this, e);
        }
        beforeLayout() {
          super.beforeLayout(),
            (this._cache = { data: [], labels: [], all: [] });
        }
        determineDataLimits() {
          const e = this.options,
            n = this._adapter,
            i = e.time.unit || "day";
          let {
            min: s,
            max: r,
            minDefined: o,
            maxDefined: a,
          } = this.getUserBounds();
          function l(c) {
            !o && !isNaN(c.min) && (s = Math.min(s, c.min)),
              !a && !isNaN(c.max) && (r = Math.max(r, c.max));
          }
          (!o || !a) &&
            (l(this._getLabelBounds()),
            ("ticks" !== e.bounds || "labels" !== e.ticks.source) &&
              l(this.getMinMax(!1))),
            (s = Ee(s) && !isNaN(s) ? s : +n.startOf(Date.now(), i)),
            (r = Ee(r) && !isNaN(r) ? r : +n.endOf(Date.now(), i) + 1),
            (this.min = Math.min(s, r - 1)),
            (this.max = Math.max(s + 1, r));
        }
        _getLabelBounds() {
          const e = this.getLabelTimestamps();
          let n = Number.POSITIVE_INFINITY,
            i = Number.NEGATIVE_INFINITY;
          return (
            e.length && ((n = e[0]), (i = e[e.length - 1])), { min: n, max: i }
          );
        }
        buildTicks() {
          const e = this.options,
            n = e.time,
            i = e.ticks,
            s =
              "labels" === i.source
                ? this.getLabelTimestamps()
                : this._generate();
          "ticks" === e.bounds &&
            s.length &&
            ((this.min = this._userMin || s[0]),
            (this.max = this._userMax || s[s.length - 1]));
          const r = this.min,
            a = (function mN(t, e, n) {
              let i = 0,
                s = t.length;
              for (; i < s && t[i] < e; ) i++;
              for (; s > i && t[s - 1] > n; ) s--;
              return i > 0 || s < t.length ? t.slice(i, s) : t;
            })(s, r, this.max);
          return (
            (this._unit =
              n.unit ||
              (i.autoSkip
                ? BD(n.minUnit, this.min, this.max, this._getLabelCapacity(r))
                : (function A2(t, e, n, i, s) {
                    for (let r = mt.length - 1; r >= mt.indexOf(n); r--) {
                      const o = mt[r];
                      if (Ol[o].common && t._adapter.diff(s, i, o) >= e - 1)
                        return o;
                    }
                    return mt[n ? mt.indexOf(n) : 0];
                  })(this, a.length, n.minUnit, this.min, this.max))),
            (this._majorUnit =
              i.major.enabled && "year" !== this._unit
                ? (function P2(t) {
                    for (let e = mt.indexOf(t) + 1, n = mt.length; e < n; ++e)
                      if (Ol[mt[e]].common) return mt[e];
                  })(this._unit)
                : void 0),
            this.initOffsets(s),
            e.reverse && a.reverse(),
            VD(this, a, this._majorUnit)
          );
        }
        afterAutoSkip() {
          this.options.offsetAfterAutoskip &&
            this.initOffsets(this.ticks.map((e) => +e.value));
        }
        initOffsets(e = []) {
          let s,
            r,
            n = 0,
            i = 0;
          this.options.offset &&
            e.length &&
            ((s = this.getDecimalForValue(e[0])),
            (n =
              1 === e.length ? 1 - s : (this.getDecimalForValue(e[1]) - s) / 2),
            (r = this.getDecimalForValue(e[e.length - 1])),
            (i =
              1 === e.length
                ? r
                : (r - this.getDecimalForValue(e[e.length - 2])) / 2));
          const o = e.length < 3 ? 0.5 : 0.25;
          (n = $e(n, 0, o)),
            (i = $e(i, 0, o)),
            (this._offsets = { start: n, end: i, factor: 1 / (n + 1 + i) });
        }
        _generate() {
          const e = this._adapter,
            n = this.min,
            i = this.max,
            s = this.options,
            r = s.time,
            o = r.unit || BD(r.minUnit, n, i, this._getLabelCapacity(n)),
            a = H(s.ticks.stepSize, 1),
            l = "week" === o && r.isoWeekday,
            c = As(l) || !0 === l,
            u = {};
          let f,
            h,
            d = n;
          if (
            (c && (d = +e.startOf(d, "isoWeek", l)),
            (d = +e.startOf(d, c ? "day" : o)),
            e.diff(i, n, o) > 1e5 * a)
          )
            throw new Error(
              n +
                " and " +
                i +
                " are too far apart with stepSize of " +
                a +
                " " +
                o
            );
          const p = "data" === s.ticks.source && this.getDataTimestamps();
          for (f = d, h = 0; f < i; f = +e.add(f, a, o), h++) jD(u, f, p);
          return (
            (f === i || "ticks" === s.bounds || 1 === h) && jD(u, f, p),
            Object.keys(u)
              .sort((g, m) => g - m)
              .map((g) => +g)
          );
        }
        getLabelForValue(e) {
          const i = this.options.time;
          return this._adapter.format(
            e,
            i.tooltipFormat ? i.tooltipFormat : i.displayFormats.datetime
          );
        }
        _tickFormatFunction(e, n, i, s) {
          const r = this.options,
            o = r.ticks.callback;
          if (o) return pe(o, [e, n, i], this);
          const a = r.time.displayFormats,
            l = this._unit,
            c = this._majorUnit,
            d = c && a[c],
            f = i[n];
          return this._adapter.format(
            e,
            s || (c && d && f && f.major ? d : l && a[l])
          );
        }
        generateTickLabels(e) {
          let n, i, s;
          for (n = 0, i = e.length; n < i; ++n)
            (s = e[n]), (s.label = this._tickFormatFunction(s.value, n, e));
        }
        getDecimalForValue(e) {
          return null === e ? NaN : (e - this.min) / (this.max - this.min);
        }
        getPixelForValue(e) {
          const n = this._offsets,
            i = this.getDecimalForValue(e);
          return this.getPixelForDecimal((n.start + i) * n.factor);
        }
        getValueForPixel(e) {
          const n = this._offsets,
            i = this.getDecimalForPixel(e) / n.factor - n.end;
          return this.min + i * (this.max - this.min);
        }
        _getLabelSize(e) {
          const n = this.options.ticks,
            i = this.ctx.measureText(e).width,
            s = Qt(this.isHorizontal() ? n.maxRotation : n.minRotation),
            r = Math.cos(s),
            o = Math.sin(s),
            a = this._resolveTickFontOptions(0).size;
          return { w: i * r + a * o, h: i * o + a * r };
        }
        _getLabelCapacity(e) {
          const n = this.options.time,
            i = n.displayFormats,
            s = i[n.unit] || i.millisecond,
            r = this._tickFormatFunction(
              e,
              0,
              VD(this, [e], this._majorUnit),
              s
            ),
            o = this._getLabelSize(r),
            a =
              Math.floor(
                this.isHorizontal() ? this.width / o.w : this.height / o.h
              ) - 1;
          return a > 0 ? a : 1;
        }
        getDataTimestamps() {
          let n,
            i,
            e = this._cache.data || [];
          if (e.length) return e;
          const s = this.getMatchingVisibleMetas();
          if (this._normalized && s.length)
            return (this._cache.data =
              s[0].controller.getAllParsedValues(this));
          for (n = 0, i = s.length; n < i; ++n)
            e = e.concat(s[n].controller.getAllParsedValues(this));
          return (this._cache.data = this.normalize(e));
        }
        getLabelTimestamps() {
          const e = this._cache.labels || [];
          let n, i;
          if (e.length) return e;
          const s = this.getLabels();
          for (n = 0, i = s.length; n < i; ++n) e.push(LD(this, s[n]));
          return (this._cache.labels = this._normalized
            ? e
            : this.normalize(e));
        }
        normalize(e) {
          return Hv(e.sort(T2));
        }
      }
      function kl(t, e, n) {
        let r,
          o,
          a,
          l,
          i = 0,
          s = t.length - 1;
        n
          ? (e >= t[i].pos &&
              e <= t[s].pos &&
              ({ lo: i, hi: s } = Ln(t, "pos", e)),
            ({ pos: r, time: a } = t[i]),
            ({ pos: o, time: l } = t[s]))
          : (e >= t[i].time &&
              e <= t[s].time &&
              ({ lo: i, hi: s } = Ln(t, "time", e)),
            ({ time: r, pos: a } = t[i]),
            ({ time: o, pos: l } = t[s]));
        const c = o - r;
        return c ? a + ((l - a) * (e - r)) / c : a;
      }
      I(ao, "id", "time"),
        I(ao, "defaults", {
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
          ticks: { source: "auto", callback: !1, major: { enabled: !1 } },
        });
      class Yf extends ao {
        constructor(e) {
          super(e),
            (this._table = []),
            (this._minPos = void 0),
            (this._tableRange = void 0);
        }
        initOffsets() {
          const e = this._getTimestampsForTable(),
            n = (this._table = this.buildLookupTable(e));
          (this._minPos = kl(n, this.min)),
            (this._tableRange = kl(n, this.max) - this._minPos),
            super.initOffsets(e);
        }
        buildLookupTable(e) {
          const { min: n, max: i } = this,
            s = [],
            r = [];
          let o, a, l, c, u;
          for (o = 0, a = e.length; o < a; ++o)
            (c = e[o]), c >= n && c <= i && s.push(c);
          if (s.length < 2)
            return [
              { time: n, pos: 0 },
              { time: i, pos: 1 },
            ];
          for (o = 0, a = s.length; o < a; ++o)
            (u = s[o + 1]),
              (l = s[o - 1]),
              (c = s[o]),
              Math.round((u + l) / 2) !== c &&
                r.push({ time: c, pos: o / (a - 1) });
          return r;
        }
        _getTimestampsForTable() {
          let e = this._cache.all || [];
          if (e.length) return e;
          const n = this.getDataTimestamps(),
            i = this.getLabelTimestamps();
          return (
            (e =
              n.length && i.length
                ? this.normalize(n.concat(i))
                : n.length
                ? n
                : i),
            (e = this._cache.all = e),
            e
          );
        }
        getDecimalForValue(e) {
          return (kl(this._table, e) - this._minPos) / this._tableRange;
        }
        getValueForPixel(e) {
          const n = this._offsets,
            i = this.getDecimalForPixel(e) / n.factor - n.end;
          return kl(this._table, i * this._tableRange + this._minPos, !0);
        }
      }
      I(Yf, "id", "timeseries"), I(Yf, "defaults", ao.defaults);
      const N2 = [
        UF,
        bL,
        f2,
        Object.freeze({
          __proto__: null,
          CategoryScale: Uf,
          LinearScale: Wf,
          LogarithmicScale: Gf,
          RadialLinearScale: oo,
          TimeScale: ao,
          TimeSeriesScale: Yf,
        }),
      ];
      let F2 = (() => {
          class t {
            constructor(n) {
              (this.dataService = n),
                (this.chartData = []),
                (this.labelData = []);
            }
            ngOnInit() {}
            ngAfterViewInit() {
              this.createChart(),
                setTimeout(() => {
                  (this.chartData = []),
                    this.dataService.getChartData().subscribe((n) => {
                      let i = n[n.length - 1];
                      this.chart.data.labels?.push(this.dataService.index),
                        this.chartData.push(i.marketcap),
                        console.log(this.chartData),
                        (this.chart.data.datasets[0] = {
                          yAxisID: "yAxis0",
                          type: "line",
                          tension: 0.3,
                          fill: !1,
                          borderColor: "blue",
                          data: this.chartData,
                        }),
                        (this.chart.options.scales = {
                          yAxis0: {
                            type: "logarithmic",
                            min: 1e8,
                            max: 1e13,
                            grid: { display: !1 },
                            position: "right",
                            title: { display: !1, text: "marketcap" },
                            afterBuildTicks: (s) => {
                              s.ticks = [
                                { value: 1e8 },
                                { value: 1e9 },
                                { value: 1e10 },
                                { value: 1e11 },
                                { value: 1e12 },
                                { value: 1e13 },
                              ];
                            },
                            ticks: {
                              display: !1,
                              callback: (s, r, o) =>
                                s >= 1e12
                                  ? "$" + +s / 1e12 + "T"
                                  : s < 1e12 && s >= 1e9
                                  ? "$" + +s / 1e9 + "B"
                                  : "$" + +s / 1e6 + "M",
                              font: { size: 12 },
                            },
                          },
                          x: {
                            grid: { display: !1 },
                            ticks: { display: !1, font: { size: 10 } },
                          },
                        }),
                        this.chart.update();
                    });
                });
            }
            createChart() {
              console.log("createChart | Chart creado!"),
                (tn.defaults.color = "#000"),
                (this.chart = new tn("main", {
                  data: { labels: [], datasets: [] },
                  options: {
                    animation: { duration: 0 },
                    plugins: { legend: { display: !1 } },
                    responsive: !0,
                    maintainAspectRatio: !1,
                    elements: { point: { radius: 0 } },
                  },
                }));
            }
            ngOnDestroy() {
              this.chart.destroy();
            }
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)(U(of));
            }),
            (t.ɵcmp = ui({
              type: t,
              selectors: [["app-main-chart"]],
              decls: 3,
              vars: 1,
              consts: [
                [1, "chart-container"],
                ["id", "main"],
              ],
              template: function (n, i) {
                1 & n && (Z(0, "div", 0)(1, "canvas", 1), Ce(2), se()()),
                  2 & n && (ze(2), Ft(i.chart));
              },
              styles: [
                ".chart-container[_ngcontent-%COMP%]{padding:16px 0 0;display:flex;justify-content:flex-end;background-color:#111;height:100%}canvas[_ngcontent-%COMP%]{height:562px!important;width:900px!important}",
              ],
            })),
            t
          );
        })(),
        R2 = (() => {
          class t {
            constructor(n) {
              (this.dataService = n),
                (this.daySpentList100Mto1B = []),
                (this.daySpentList1Bto10B = []),
                (this.daySpentList10Bto100B = []),
                (this.daySpentList100Bto1T = []),
                (this.daySpentListAbove1T = []),
                (this.data = [
                  {
                    close: "$0.00000",
                    date: "Sep 24, 2017",
                    epoch: 0,
                    high: "$0.00000",
                    marketcap: 0,
                    open: "$0.00000",
                    volume: "$0.00000",
                  },
                ]);
            }
            ngOnInit() {
              this.subscription = this.dataService
                .getChartData()
                .subscribe((n) => {
                  let i = n[n.length - 1];
                  i.marketcap > 1e8 && i.marketcap <= 1e9
                    ? this.daySpentList100Mto1B.push(i.marketcap)
                    : i.marketcap > 1e9 && i.marketcap <= 1e10
                    ? this.daySpentList1Bto10B.push(i.marketcap)
                    : i.marketcap > 1e10 && i.marketcap <= 1e11
                    ? this.daySpentList10Bto100B.push(i.marketcap)
                    : i.marketcap > 1e11 && i.marketcap <= 1e12
                    ? this.daySpentList100Bto1T.push(i.marketcap)
                    : i.marketcap > 1e12 &&
                      this.daySpentListAbove1T.push(i.marketcap);
                });
            }
            getWidth(n) {
              return 0.08 * n + "%";
            }
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)(U(of));
            }),
            (t.ɵcmp = ui({
              type: t,
              selectors: [["app-side-chart"]],
              decls: 42,
              vars: 15,
              consts: [
                [1, "container"],
                [1, "text-box"],
                [1, "text"],
                [1, "box"],
                [1, "bar-container"],
                [1, "bar"],
                [1, "value"],
                [1, "interval"],
                [1, "empty"],
              ],
              template: function (n, i) {
                1 & n &&
                  (Z(0, "div", 0)(1, "div", 1)(2, "div", 2),
                  Ce(3, "Market Cap Distribution"),
                  se(),
                  Z(4, "div", 2),
                  Ce(5, "(days spent in each price range)"),
                  se()(),
                  Z(6, "div", 3)(7, "div", 4),
                  Mt(8, "div", 5),
                  Z(9, "span", 6),
                  Ce(10),
                  se()(),
                  Z(11, "div", 7),
                  Ce(12, "$1T+"),
                  se()(),
                  Z(13, "div", 3)(14, "div", 4),
                  Mt(15, "div", 5),
                  Z(16, "span", 6),
                  Ce(17),
                  se()(),
                  Z(18, "div", 7),
                  Ce(19, "$100B - $1T"),
                  se()(),
                  Z(20, "div", 3)(21, "div", 4),
                  Mt(22, "div", 5),
                  Z(23, "span", 6),
                  Ce(24),
                  se()(),
                  Z(25, "div", 7),
                  Ce(26, "$10B - $100B"),
                  se()(),
                  Z(27, "div", 3)(28, "div", 4),
                  Mt(29, "div", 5),
                  Z(30, "span", 6),
                  Ce(31),
                  se()(),
                  Z(32, "div", 7),
                  Ce(33, "$1B - $10B"),
                  se()(),
                  Z(34, "div", 3)(35, "div", 4),
                  Mt(36, "div", 5),
                  Z(37, "span", 6),
                  Ce(38),
                  se()(),
                  Z(39, "div", 7),
                  Ce(40, "$100M - $1B"),
                  se(),
                  Mt(41, "div", 8),
                  se()()),
                  2 & n &&
                    (ze(8),
                    Di("width", i.getWidth(i.daySpentListAbove1T.length)),
                    ze(2),
                    Ft(i.daySpentListAbove1T.length),
                    ze(5),
                    Di("width", i.getWidth(i.daySpentList100Bto1T.length)),
                    ze(2),
                    Ft(i.daySpentList100Bto1T.length),
                    ze(5),
                    Di("width", i.getWidth(i.daySpentList10Bto100B.length)),
                    ze(2),
                    Ft(i.daySpentList10Bto100B.length),
                    ze(5),
                    Di("width", i.getWidth(i.daySpentList1Bto10B.length)),
                    ze(2),
                    Ft(i.daySpentList1Bto10B.length),
                    ze(5),
                    Di("width", i.getWidth(i.daySpentList100Mto1B.length)),
                    ze(2),
                    Ft(i.daySpentList100Mto1B.length));
              },
              styles: [
                ".container[_ngcontent-%COMP%]{margin:0;padding:0 8px 0 0;display:flex;flex-direction:column;align-items:center;background-color:#111;color:#ccc;height:100%;width:350px}.text-box[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:flex-end;height:107.5px;width:100%;padding-bottom:16px}.text[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;font-size:18px;font-weight:500;width:75%}.box[_ngcontent-%COMP%]{border:1px solid #ccc;display:flex;width:100%;height:109px}.bar-container[_ngcontent-%COMP%]{display:flex;justify-content:flex-start;align-items:center;width:75%;height:100%}.bar[_ngcontent-%COMP%]{background-color:#00f;height:20px}.value[_ngcontent-%COMP%]{margin-left:16px}.interval[_ngcontent-%COMP%]{display:flex;margin-left:8px;justify-content:flex-start;align-items:center;width:25%}.empty[_ngcontent-%COMP%]{padding:0;margin:0;height:6px}",
              ],
            })),
            t
          );
        })(),
        L2 = (() => {
          class t {
            constructor() {}
            ngOnInit() {}
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)();
            }),
            (t.ɵcmp = ui({
              type: t,
              selectors: [["app-footer"]],
              decls: 2,
              vars: 0,
              consts: [
                [1, "site-footer"],
                [
                  "src",
                  "./assets/img/cardano-6306459_960_720.png",
                  "alt",
                  "cardano",
                  1,
                  "cardano",
                ],
              ],
              template: function (n, i) {
                1 & n && (Z(0, "div", 0), Mt(1, "img", 1), se());
              },
              styles: [
                ".site-footer[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;padding:15px 0;font-size:18px;background-color:#111;color:#ccc}.wrapper[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;flex-direction:column;margin-left:64px}.user[_ngcontent-%COMP%]{font-weight:700}.username[_ngcontent-%COMP%]{color:#bbb}.logoT[_ngcontent-%COMP%]{border-radius:50%;width:48px;margin-left:1rem}.cardano[_ngcontent-%COMP%]{margin-right:64px;display:flex;align-items:center;width:150px}",
              ],
            })),
            t
          );
        })(),
        B2 = (() => {
          class t {
            constructor() {
              this.title = "cardano-mc-anim";
            }
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)();
            }),
            (t.ɵcmp = ui({
              type: t,
              selectors: [["app-root"]],
              decls: 9,
              vars: 0,
              consts: [
                [1, "box"],
                [1, "header"],
                [1, "main-chart"],
                [1, "side-chart"],
                [1, "footer"],
              ],
              template: function (n, i) {
                1 & n &&
                  (Z(0, "div", 0)(1, "div", 1),
                  Mt(2, "app-header"),
                  se(),
                  Z(3, "div", 2),
                  Mt(4, "app-main-chart"),
                  se(),
                  Z(5, "div", 3),
                  Mt(6, "app-side-chart"),
                  se(),
                  Z(7, "div", 4),
                  Mt(8, "app-footer"),
                  se()());
              },
              dependencies: [kk, F2, R2, L2],
              styles: [
                '.box[_ngcontent-%COMP%]{margin-top:80px;width:70vw;height:80vh;display:grid;grid-template-columns:1.4fr .4fr .2fr;grid-template-rows:.5fr 2.9fr .3fr;grid-auto-rows:1fr;gap:0px 0px 0px;grid-auto-flow:row;grid-template-areas:"header side-chart side-chart" "main-chart side-chart side-chart" "footer footer footer"}.footer[_ngcontent-%COMP%]{grid-area:footer}.side-chart[_ngcontent-%COMP%]{grid-area:side-chart}.header[_ngcontent-%COMP%]{grid-area:header}.main-chart[_ngcontent-%COMP%]{grid-area:main-chart}',
              ],
            })),
            t
          );
        })();
      const Nl = function H2(t, e) {
          return t === e || (t != t && e != e);
        },
        Fl = function $2(t, e) {
          for (var n = t.length; n--; ) if (Nl(t[n][0], e)) return n;
          return -1;
        };
      var U2 = Array.prototype.splice;
      function Fs(t) {
        var e = -1,
          n = null == t ? 0 : t.length;
        for (this.clear(); ++e < n; ) {
          var i = t[e];
          this.set(i[0], i[1]);
        }
      }
      (Fs.prototype.clear = function j2() {
        (this.__data__ = []), (this.size = 0);
      }),
        (Fs.prototype.delete = function W2(t) {
          var e = this.__data__,
            n = Fl(e, t);
          return !(
            n < 0 ||
            (n == e.length - 1 ? e.pop() : U2.call(e, n, 1), --this.size, 0)
          );
        }),
        (Fs.prototype.get = function q2(t) {
          var e = this.__data__,
            n = Fl(e, t);
          return n < 0 ? void 0 : e[n][1];
        }),
        (Fs.prototype.has = function K2(t) {
          return Fl(this.__data__, t) > -1;
        }),
        (Fs.prototype.set = function Z2(t, e) {
          var n = this.__data__,
            i = Fl(n, t);
          return i < 0 ? (++this.size, n.push([t, e])) : (n[i][1] = e), this;
        });
      const Rl = Fs,
        HD =
          "object" == typeof global &&
          global &&
          global.Object === Object &&
          global;
      var lB =
        "object" == typeof self && self && self.Object === Object && self;
      const Rs = HD || lB || Function("return this")();
      var uB = Rs.Symbol,
        $D = Object.prototype,
        dB = $D.hasOwnProperty,
        fB = $D.toString,
        lo = uB ? uB.toStringTag : void 0;
      var mB = Object.prototype.toString;
      var zD = uB ? uB.toStringTag : void 0;
      const Bl = function DB(t) {
          return null == t
            ? void 0 === t
              ? "[object Undefined]"
              : "[object Null]"
            : zD && zD in Object(t)
            ? (function hB(t) {
                var e = dB.call(t, lo),
                  n = t[lo];
                try {
                  t[lo] = void 0;
                  var i = !0;
                } catch {}
                var s = fB.call(t);
                return i && (e ? (t[lo] = n) : delete t[lo]), s;
              })(t)
            : (function yB(t) {
                return mB.call(t);
              })(t);
        },
        Ri = function wB(t) {
          var e = typeof t;
          return null != t && ("object" == e || "function" == e);
        },
        Kf = function SB(t) {
          if (!Ri(t)) return !1;
          var e = Bl(t);
          return (
            "[object Function]" == e ||
            "[object GeneratorFunction]" == e ||
            "[object AsyncFunction]" == e ||
            "[object Proxy]" == e
          );
        };
      var t,
        IB = Rs["__core-js_shared__"],
        UD = (t = /[^.]+$/.exec((IB && IB.keys && IB.keys.IE_PROTO) || ""))
          ? "Symbol(src)_1." + t
          : "";
      var OB = Function.prototype.toString;
      var RB = /^\[object .+?Constructor\]$/,
        HB = RegExp(
          "^" +
            Function.prototype.toString
              .call(Object.prototype.hasOwnProperty)
              .replace(/[\\^$.*+?()[\]{}|]/g, "\\$&")
              .replace(
                /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
                "$1.*?"
              ) +
            "$"
        );
      const zB = function $B(t) {
          return (
            !(
              !Ri(t) ||
              (function TB(t) {
                return !!UD && UD in t;
              })(t)
            ) &&
            (Kf(t) ? HB : RB).test(
              (function kB(t) {
                if (null != t) {
                  try {
                    return OB.call(t);
                  } catch {}
                  try {
                    return t + "";
                  } catch {}
                }
                return "";
              })(t)
            )
          );
        },
        Zf = function GB(t, e) {
          var n = (function UB(t, e) {
            return t?.[e];
          })(t, e);
          return zB(n) ? n : void 0;
        },
        WD = Zf(Rs, "Map"),
        co = Zf(Object, "create");
      var tj = Object.prototype.hasOwnProperty;
      var rj = Object.prototype.hasOwnProperty;
      function Ls(t) {
        var e = -1,
          n = null == t ? 0 : t.length;
        for (this.clear(); ++e < n; ) {
          var i = t[e];
          this.set(i[0], i[1]);
        }
      }
      (Ls.prototype.clear = function KB() {
        (this.__data__ = co ? co(null) : {}), (this.size = 0);
      }),
        (Ls.prototype.delete = function ZB(t) {
          var e = this.has(t) && delete this.__data__[t];
          return (this.size -= e ? 1 : 0), e;
        }),
        (Ls.prototype.get = function nj(t) {
          var e = this.__data__;
          if (co) {
            var n = e[t];
            return "__lodash_hash_undefined__" === n ? void 0 : n;
          }
          return tj.call(e, t) ? e[t] : void 0;
        }),
        (Ls.prototype.has = function oj(t) {
          var e = this.__data__;
          return co ? void 0 !== e[t] : rj.call(e, t);
        }),
        (Ls.prototype.set = function cj(t, e) {
          var n = this.__data__;
          return (
            (this.size += this.has(t) ? 0 : 1),
            (n[t] = co && void 0 === e ? "__lodash_hash_undefined__" : e),
            this
          );
        });
      const GD = Ls,
        jl = function gj(t, e) {
          var n = t.__data__;
          return (function hj(t) {
            var e = typeof t;
            return "string" == e ||
              "number" == e ||
              "symbol" == e ||
              "boolean" == e
              ? "__proto__" !== t
              : null === t;
          })(e)
            ? n["string" == typeof e ? "string" : "hash"]
            : n.map;
        };
      function Bs(t) {
        var e = -1,
          n = null == t ? 0 : t.length;
        for (this.clear(); ++e < n; ) {
          var i = t[e];
          this.set(i[0], i[1]);
        }
      }
      (Bs.prototype.clear = function dj() {
        (this.size = 0),
          (this.__data__ = {
            hash: new GD(),
            map: new (WD || Rl)(),
            string: new GD(),
          });
      }),
        (Bs.prototype.delete = function mj(t) {
          var e = jl(this, t).delete(t);
          return (this.size -= e ? 1 : 0), e;
        }),
        (Bs.prototype.get = function _j(t) {
          return jl(this, t).get(t);
        }),
        (Bs.prototype.has = function vj(t) {
          return jl(this, t).has(t);
        }),
        (Bs.prototype.set = function wj(t, e) {
          var n = jl(this, t),
            i = n.size;
          return n.set(t, e), (this.size += n.size == i ? 0 : 1), this;
        });
      const xj = Bs;
      function js(t) {
        var e = (this.__data__ = new Rl(t));
        this.size = e.size;
      }
      (js.prototype.clear = function J2() {
        (this.__data__ = new Rl()), (this.size = 0);
      }),
        (js.prototype.delete = function tB(t) {
          var e = this.__data__,
            n = e.delete(t);
          return (this.size = e.size), n;
        }),
        (js.prototype.get = function iB(t) {
          return this.__data__.get(t);
        }),
        (js.prototype.has = function rB(t) {
          return this.__data__.has(t);
        }),
        (js.prototype.set = function Mj(t, e) {
          var n = this.__data__;
          if (n instanceof Rl) {
            var i = n.__data__;
            if (!WD || i.length < 199)
              return i.push([t, e]), (this.size = ++n.size), this;
            n = this.__data__ = new xj(i);
          }
          return n.set(t, e), (this.size = n.size), this;
        });
      const Ij = js;
      var Tj = (function () {
        try {
          var t = Zf(Object, "defineProperty");
          return t({}, "", {}), t;
        } catch {}
      })();
      const Vl = Tj,
        Qf = function Aj(t, e, n) {
          "__proto__" == e && Vl
            ? Vl(t, e, {
                configurable: !0,
                enumerable: !0,
                value: n,
                writable: !0,
              })
            : (t[e] = n);
        },
        Jf = function Pj(t, e, n) {
          ((void 0 !== n && !Nl(t[e], n)) || (void 0 === n && !(e in t))) &&
            Qf(t, e, n);
        };
      var kj = (function Oj(t) {
        return function (e, n, i) {
          for (var s = -1, r = Object(e), o = i(e), a = o.length; a--; ) {
            var l = o[t ? a : ++s];
            if (!1 === n(r[l], l, r)) break;
          }
          return e;
        };
      })();
      const Nj = kj;
      var qD =
          "object" == typeof exports && exports && !exports.nodeType && exports,
        YD =
          qD &&
          "object" == typeof module &&
          module &&
          !module.nodeType &&
          module,
        KD = YD && YD.exports === qD ? Rs.Buffer : void 0,
        XD = KD ? KD.allocUnsafe : void 0;
      const ZD = Rs.Uint8Array,
        $j = function Hj(t, e) {
          var n = e
            ? (function jj(t) {
                var e = new t.constructor(t.byteLength);
                return new ZD(e).set(new ZD(t)), e;
              })(t.buffer)
            : t.buffer;
          return new t.constructor(n, t.byteOffset, t.length);
        };
      var QD = Object.create,
        Wj = (function () {
          function t() {}
          return function (e) {
            if (!Ri(e)) return {};
            if (QD) return QD(e);
            t.prototype = e;
            var n = new t();
            return (t.prototype = void 0), n;
          };
        })();
      const Gj = Wj;
      var Yj = (function qj(t, e) {
        return function (n) {
          return t(e(n));
        };
      })(Object.getPrototypeOf, Object);
      const JD = Yj;
      var Kj = Object.prototype;
      const ew = function Xj(t) {
          var e = t && t.constructor;
          return t === (("function" == typeof e && e.prototype) || Kj);
        },
        uo = function Jj(t) {
          return null != t && "object" == typeof t;
        },
        tw = function tV(t) {
          return uo(t) && "[object Arguments]" == Bl(t);
        };
      var nw = Object.prototype,
        nV = nw.hasOwnProperty,
        iV = nw.propertyIsEnumerable,
        sV = tw(
          (function () {
            return arguments;
          })()
        )
          ? tw
          : function (t) {
              return uo(t) && nV.call(t, "callee") && !iV.call(t, "callee");
            };
      const eh = sV,
        th = Array.isArray,
        iw = function aV(t) {
          return (
            "number" == typeof t &&
            t > -1 &&
            t % 1 == 0 &&
            t <= 9007199254740991
          );
        },
        nh = function lV(t) {
          return null != t && iw(t.length) && !Kf(t);
        };
      var sw =
          "object" == typeof exports && exports && !exports.nodeType && exports,
        rw =
          sw &&
          "object" == typeof module &&
          module &&
          !module.nodeType &&
          module,
        ow = rw && rw.exports === sw ? Rs.Buffer : void 0;
      const aw =
        (ow ? ow.isBuffer : void 0) ||
        function dV() {
          return !1;
        };
      var lw = Function.prototype.toString,
        bV = Object.prototype.hasOwnProperty,
        vV = lw.call(Object);
      var ye = {};
      (ye["[object Float32Array]"] =
        ye["[object Float64Array]"] =
        ye["[object Int8Array]"] =
        ye["[object Int16Array]"] =
        ye["[object Int32Array]"] =
        ye["[object Uint8Array]"] =
        ye["[object Uint8ClampedArray]"] =
        ye["[object Uint16Array]"] =
        ye["[object Uint32Array]"] =
          !0),
        (ye["[object Arguments]"] =
          ye["[object Array]"] =
          ye["[object ArrayBuffer]"] =
          ye["[object Boolean]"] =
          ye["[object DataView]"] =
          ye["[object Date]"] =
          ye["[object Error]"] =
          ye["[object Function]"] =
          ye["[object Map]"] =
          ye["[object Number]"] =
          ye["[object Object]"] =
          ye["[object RegExp]"] =
          ye["[object Set]"] =
          ye["[object String]"] =
          ye["[object WeakMap]"] =
            !1);
      var cw =
          "object" == typeof exports && exports && !exports.nodeType && exports,
        fo =
          cw &&
          "object" == typeof module &&
          module &&
          !module.nodeType &&
          module,
        ih = fo && fo.exports === cw && HD.process,
        QV = (function () {
          try {
            return (
              (fo && fo.require && fo.require("util").types) ||
              (ih && ih.binding && ih.binding("util"))
            );
          } catch {}
        })(),
        dw = QV && QV.isTypedArray;
      const fw = dw
          ? (function KV(t) {
              return function (e) {
                return t(e);
              };
            })(dw)
          : function qV(t) {
              return uo(t) && iw(t.length) && !!ye[Bl(t)];
            },
        sh = function eH(t, e) {
          if (
            ("constructor" !== e || "function" != typeof t[e]) &&
            "__proto__" != e
          )
            return t[e];
        };
      var nH = Object.prototype.hasOwnProperty;
      const sH = function iH(t, e, n) {
        var i = t[e];
        (!nH.call(t, e) || !Nl(i, n) || (void 0 === n && !(e in t))) &&
          Qf(t, e, n);
      };
      var uH = /^(?:0|[1-9]\d*)$/;
      const hw = function dH(t, e) {
        var n = typeof t;
        return (
          !!(e = e ?? 9007199254740991) &&
          ("number" == n || ("symbol" != n && uH.test(t))) &&
          t > -1 &&
          t % 1 == 0 &&
          t < e
        );
      };
      var hH = Object.prototype.hasOwnProperty;
      const gH = function pH(t, e) {
        var n = th(t),
          i = !n && eh(t),
          s = !n && !i && aw(t),
          r = !n && !i && !s && fw(t),
          o = n || i || s || r,
          a = o
            ? (function aH(t, e) {
                for (var n = -1, i = Array(t); ++n < t; ) i[n] = e(n);
                return i;
              })(t.length, String)
            : [],
          l = a.length;
        for (var c in t)
          (e || hH.call(t, c)) &&
            (!o ||
              !(
                "length" == c ||
                (s && ("offset" == c || "parent" == c)) ||
                (r &&
                  ("buffer" == c || "byteLength" == c || "byteOffset" == c)) ||
                hw(c, l)
              )) &&
            a.push(c);
        return a;
      };
      var bH = Object.prototype.hasOwnProperty;
      const DH = function vH(t) {
          if (!Ri(t))
            return (function mH(t) {
              var e = [];
              if (null != t) for (var n in Object(t)) e.push(n);
              return e;
            })(t);
          var e = ew(t),
            n = [];
          for (var i in t)
            ("constructor" == i && (e || !bH.call(t, i))) || n.push(i);
          return n;
        },
        pw = function wH(t) {
          return nh(t) ? gH(t, !0) : DH(t);
        },
        xH = function CH(t) {
          return (function rH(t, e, n, i) {
            var s = !n;
            n || (n = {});
            for (var r = -1, o = e.length; ++r < o; ) {
              var a = e[r],
                l = i ? i(n[a], t[a], a, n, t) : void 0;
              void 0 === l && (l = t[a]), s ? Qf(n, a, l) : sH(n, a, l);
            }
            return n;
          })(t, pw(t));
        },
        MH = function EH(t, e, n, i, s, r, o) {
          var a = sh(t, n),
            l = sh(e, n),
            c = o.get(l);
          if (c) Jf(t, n, c);
          else {
            var u = r ? r(a, l, n + "", t, e, o) : void 0,
              d = void 0 === u;
            if (d) {
              var f = th(l),
                h = !f && aw(l),
                p = !f && !h && fw(l);
              (u = l),
                f || h || p
                  ? th(a)
                    ? (u = a)
                    : (function cV(t) {
                        return uo(t) && nh(t);
                      })(a)
                    ? (u = (function zj(t, e) {
                        var n = -1,
                          i = t.length;
                        for (e || (e = Array(i)); ++n < i; ) e[n] = t[n];
                        return e;
                      })(a))
                    : h
                    ? ((d = !1),
                      (u = (function Rj(t, e) {
                        if (e) return t.slice();
                        var n = t.length,
                          i = XD ? XD(n) : new t.constructor(n);
                        return t.copy(i), i;
                      })(l, !0)))
                    : p
                    ? ((d = !1), (u = $j(l, !0)))
                    : (u = [])
                  : (function DV(t) {
                      if (!uo(t) || "[object Object]" != Bl(t)) return !1;
                      var e = JD(t);
                      if (null === e) return !0;
                      var n = bV.call(e, "constructor") && e.constructor;
                      return (
                        "function" == typeof n &&
                        n instanceof n &&
                        lw.call(n) == vV
                      );
                    })(l) || eh(l)
                  ? ((u = a),
                    eh(a)
                      ? (u = xH(a))
                      : (!Ri(a) || Kf(a)) &&
                        (u = (function Zj(t) {
                          return "function" != typeof t.constructor || ew(t)
                            ? {}
                            : Gj(JD(t));
                        })(l)))
                  : (d = !1);
            }
            d && (o.set(l, u), s(u, l, i, r, o), o.delete(l)), Jf(t, n, u);
          }
        },
        SH = function gw(t, e, n, i, s) {
          t !== e &&
            Nj(
              e,
              function (r, o) {
                if ((s || (s = new Ij()), Ri(r))) MH(t, e, o, n, gw, i, s);
                else {
                  var a = i ? i(sh(t, o), r, o + "", t, e, s) : void 0;
                  void 0 === a && (a = r), Jf(t, o, a);
                }
              },
              pw
            );
        },
        mw = function IH(t) {
          return t;
        },
        AH = function TH(t, e, n) {
          switch (n.length) {
            case 0:
              return t.call(e);
            case 1:
              return t.call(e, n[0]);
            case 2:
              return t.call(e, n[0], n[1]);
            case 3:
              return t.call(e, n[0], n[1], n[2]);
          }
          return t.apply(e, n);
        };
      var yw = Math.max;
      const NH = function kH(t) {
        return function () {
          return t;
        };
      };
      var FH = Vl
          ? function (t, e) {
              return Vl(t, "toString", {
                configurable: !0,
                enumerable: !1,
                value: NH(e),
                writable: !0,
              });
            }
          : mw,
        jH = Date.now,
        HH = (function VH(t) {
          var e = 0,
            n = 0;
          return function () {
            var i = jH(),
              s = 16 - (i - n);
            if (((n = i), s > 0)) {
              if (++e >= 800) return arguments[0];
            } else e = 0;
            return t.apply(void 0, arguments);
          };
        })(FH);
      const $H = HH,
        UH = function zH(t, e) {
          return $H(
            (function PH(t, e, n) {
              return (
                (e = yw(void 0 === e ? t.length - 1 : e, 0)),
                function () {
                  for (
                    var i = arguments,
                      s = -1,
                      r = yw(i.length - e, 0),
                      o = Array(r);
                    ++s < r;

                  )
                    o[s] = i[e + s];
                  s = -1;
                  for (var a = Array(e + 1); ++s < e; ) a[s] = i[s];
                  return (a[e] = n(o)), AH(t, this, a);
                }
              );
            })(t, e, mw),
            t + ""
          );
        };
      var YH = (function qH(t) {
        return UH(function (e, n) {
          var i = -1,
            s = n.length,
            r = s > 1 ? n[s - 1] : void 0,
            o = s > 2 ? n[2] : void 0;
          for (
            r = t.length > 3 && "function" == typeof r ? (s--, r) : void 0,
              o &&
                (function WH(t, e, n) {
                  if (!Ri(n)) return !1;
                  var i = typeof e;
                  return (
                    !!("number" == i
                      ? nh(n) && hw(e, n.length)
                      : "string" == i && (e in n)) && Nl(n[e], t)
                  );
                })(n[0], n[1], o) &&
                ((r = s < 3 ? void 0 : r), (s = 1)),
              e = Object(e);
            ++i < s;

          ) {
            var a = n[i];
            a && t(e, a, i, r);
          }
          return e;
        });
      })(function (t, e, n) {
        SH(t, e, n);
      });
      const KH = YH,
        XH = [
          [255, 99, 132],
          [54, 162, 235],
          [255, 206, 86],
          [231, 233, 237],
          [75, 192, 192],
          [151, 187, 205],
          [220, 220, 220],
          [247, 70, 74],
          [70, 191, 189],
          [253, 180, 92],
          [148, 159, 177],
          [77, 83, 96],
        ],
        ZH = {
          datasets: {
            line: {
              backgroundColor: (t) => ct(ut(t.datasetIndex), 0.4),
              borderColor: (t) => ct(ut(t.datasetIndex), 1),
              pointBackgroundColor: (t) => ct(ut(t.datasetIndex), 1),
              pointBorderColor: "#fff",
              pointHoverBackgroundColor: "#fff",
              pointHoverBorderColor: (t) => ct(ut(t.datasetIndex), 0.8),
            },
            bar: {
              backgroundColor: (t) => ct(ut(t.datasetIndex), 0.6),
              borderColor: (t) => ct(ut(t.datasetIndex), 1),
              hoverBackgroundColor: (t) => ct(ut(t.datasetIndex), 0.8),
              hoverBorderColor: (t) => ct(ut(t.datasetIndex), 1),
            },
            get radar() {
              return this.line;
            },
            doughnut: {
              backgroundColor: (t) => ct(ut(t.dataIndex), 0.6),
              borderColor: "#fff",
              hoverBackgroundColor: (t) => ct(ut(t.dataIndex), 1),
              hoverBorderColor: (t) => ct(ut(t.dataIndex), 1),
            },
            get pie() {
              return this.doughnut;
            },
            polarArea: {
              backgroundColor: (t) => ct(ut(t.dataIndex), 0.6),
              borderColor: (t) => ct(ut(t.dataIndex), 1),
              hoverBackgroundColor: (t) => ct(ut(t.dataIndex), 0.8),
              hoverBorderColor: (t) => ct(ut(t.dataIndex), 1),
            },
            get bubble() {
              return this.doughnut;
            },
            get scatter() {
              return this.doughnut;
            },
            get area() {
              return this.polarArea;
            },
          },
        };
      function ct(t, e) {
        return "rgba(" + t.concat(e).join(",") + ")";
      }
      function rh(t, e) {
        return Math.floor(Math.random() * (e - t + 1)) + t;
      }
      function ut(t = 0) {
        return (
          XH[t] ||
          (function QH() {
            return [rh(0, 255), rh(0, 255), rh(0, 255)];
          })()
        );
      }
      let _w = (() => {
        class t {}
        return (
          (t.ɵfac = function (n) {
            return new (n || t)();
          }),
          (t.ɵprov = J({ token: t, factory: t.ɵfac, providedIn: "root" })),
          t
        );
      })();
      tn.register(...N2);
      let JH = (() => {
          class t {
            constructor(n) {
              n?.plugins && tn.register(...n?.plugins);
              const i = KH(ZH, n?.defaults || {});
              Se.set(i);
            }
            static forRoot(n) {
              return { ngModule: t, providers: [{ provide: _w, useValue: n }] };
            }
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)(z(_w, 8));
            }),
            (t.ɵmod = $n({ type: t })),
            (t.ɵinj = _n({ imports: [[]] })),
            t
          );
        })(),
        e$ = (() => {
          class t {}
          return (
            (t.ɵfac = function (n) {
              return new (n || t)();
            }),
            (t.ɵmod = $n({ type: t, bootstrap: [B2] })),
            (t.ɵinj = _n({ imports: [JO, Ok, JH] })),
            t
          );
        })();
      (function EA() {
        hb = !1;
      })(),
        QO()
          .bootstrapModule(e$)
          .catch((t) => console.error(t));
    },
  },
  (re) => {
    re((re.s = 766));
  },
]);
