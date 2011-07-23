// "Aspect oriented programming" hook function generator.
// @param host_fn
// @requires augment.js
var AOP = function (host_fn) {

        var _attrs = {
            // Attach an event callback to a function to also fire when it fires.
            // @param cb - the callback function.
            // @param when - defaults to "after". if set to "before", cb is called before the host.
            on: function (opts) {
                if (typeof opts === 'function') return this.after(opts);
                this._reg = this._reg || {
                    before: [],
                    after: []
                };
                this._reg[opts.when || 'after'].push({
                    cb: opts.cb,
                    scope: opts.scope,
                    once: opts.once
                });
            },

            before: function (cb) {
                this.on({
                    when: 'before',
                    cb: cb
                });
            },

            after: function (cb) {
                this.on({
                    when: 'after',
                    cb: cb
                });
            },

            purge: function () {
                this._reg = {
                    before: [],
                    after: []
                };
            }
        },
            fnOut = function () {
                var _args = arguments,
                    _this = this,
                    i, _r = arguments.callee._reg = arguments.callee._reg || {
                        before: [],
                        after: []
                    };

                _r.before.filter(function (h) {
                    // prevent instance methods being called for the wrong instance.
                    if (h.scope && h.scope !== this) return true;
                    h.cb.apply(h.scope || _this, _args);
                    return !h.once;
                });

                var rv = host_fn.apply(this, arguments);
                _r.after.filter(function (h) {
                    // prevent instance methods being called for the wrong instance.
                    if (h.scope && h.scope !== this) return true;
                    h.cb.apply(h.scope || _this, _args);
                    return !h.once;
                });

                return rv;
            };
        for (var k in _attrs) {
            fnOut[k] = _attrs[k];
        }
        return fnOut;
    }

AOP.crosscut = function _AOP_crosscut(namespace, pattern, opts) {
    pattern = pattern || /.*/;
    for (var name in namespace) {
        if (namespace.hasOwnProperty(name)) {
            if (typeof namespace[name] == 'function' && pattern.test(name)) {
                namespace[name] = AOP(namespace[name])
                namespace[name].on(opts);
            }
        }
    }
};