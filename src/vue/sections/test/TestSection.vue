<template>
  <SectionTemplate :section-data="props.sectionData">
    <!-- Title -->
    <h1 class="cover-title display-1" v-html="coverTitle" />

    <!-- Divider -->
    <hr class="solid-divider ms-1 me-1" />
    <!-- Info Items -->
    <div id="logo-container" ref="logoContainerRef"></div>
  </SectionTemplate>
</template>

<script setup>
import SectionTemplate from "../_templates/SectionTemplate.vue";
import { computed, onMounted, nextTick, ref } from "vue";
import { useData } from "../../../composables/data.js";
import { useNavigation } from "../../../composables/navigation.js";
import objFile from "./obj.json";
const data = useData();
const navigation = useNavigation();
/**
 * @param subcategory
 * @return {Object[]}
 * @private
 */

/**
 * @property {Object} sectionData
 */
const props = defineProps({
  sectionData: Object,
});

const logoContainerRef = ref(null);

/**
 * @type {ComputedRef<String>}
 */
const coverTitle = computed(() => {
  if (navigation.isAllAtOnceMode()) {
    return props.sectionData.content["locales"]["test"];
  } else {
    return props.sectionData.content["locales"]["test"];
  }
});

onMounted(() => {
  setTimeout(() => {
    // here is the Vue code
    const container = logoContainerRef.value;

    if (container) {
      // Your code here to work with the container
      (function () {
        function e(t, n, r) {
          function s(o, u) {
            if (!n[o]) {
              if (!t[o]) {
                var a = typeof require == "function" && require;
                if (!u && a) return a(o, !0);
                if (i) return i(o, !0);
                var f = new Error("Cannot find module '" + o + "'");
                throw ((f.code = "MODULE_NOT_FOUND"), f);
              }
              var l = (n[o] = { exports: {} });
              t[o][0].call(
                l.exports,
                function (e) {
                  var n = t[o][1][e];
                  return s(n ? n : e);
                },
                l,
                l.exports,
                e,
                t,
                n,
                r
              );
            }
            return n[o].exports;
          }
          var i = typeof require == "function" && require;
          for (var o = 0; o < r.length; o++) s(r[o]);
          return s;
        }
        return e;
      })()(
        {
          1: [
            function (a, b, c) {
              var d = a("../index"),
                viewer = d({
                  width: 0.4,
                  height: 0.4,
                  followMouse: !0,
                  followMotion: !0,
                  eye: [109, 0, 9000],
                });
              document
                .getElementById("logo-container")
                .appendChild(viewer.container);
            },
            { "../index": 3 },
          ],
          2: [
            function (a, b, c) {
              b.exports = objFile;
            },
            {},
          ],
          3: [
            function (j, q, z) {
              function createNode(t) {
                return document.createElementNS(SVG_NS, t);
              }
              function setAttribute(t, e, n) {
                t.setAttributeNS(null, e, n);
              }
              var B = j("gl-mat4/perspective"),
                multiply = j("gl-mat4/multiply"),
                lookAt = j("gl-mat4/lookAt"),
                invert = j("gl-mat4/invert"),
                rotate = j("gl-mat4/rotate"),
                transform = j("gl-vec3/transformMat4"),
                foxJSON = j("./fox.json"),
                SVG_NS = "http://www.w3.org/2000/svg";
              q.exports = function (t) {
                function e(t) {
                  var e = y.getBoundingClientRect();
                  (x.x = 1 - (2 * (t.x - e.left)) / e.width),
                    (x.y = 1 - (2 * (t.y - e.top)) / e.height);
                }
                function n(t, e) {
                  (this.svg = t), (this.indices = e), (this.zIndex = 0);
                }
                function r(t) {
                  for (
                    var e = t[0],
                      n = t[1],
                      r = t[2],
                      i = t[3],
                      o = t[4],
                      a = t[5],
                      l = t[6],
                      u = t[7],
                      s = t[8],
                      f = t[9],
                      h = t[10],
                      c = t[11],
                      d = t[12],
                      w = t[13],
                      v = t[14],
                      g = t[15],
                      m = 0;
                    m < F;
                    ++m
                  ) {
                    var p = N[3 * m],
                      A = N[3 * m + 1],
                      y = N[3 * m + 2],
                      x = p * i + A * u + y * c + g;
                    (M[3 * m] = (p * e + A * o + y * s + d) / x),
                      (M[3 * m + 1] = (p * n + A * a + y * f + w) / x),
                      (M[3 * m + 2] = (p * r + A * l + y * h + v) / x);
                  }
                }
                function i(t, e) {
                  return e.zIndex - t.zIndex;
                }
                function o() {
                  var t,
                    e = y.getBoundingClientRect(),
                    n = e.width,
                    r = e.height;
                  for (b.length = 0, t = 0; t < S.length; ++t) {
                    var o = S[t],
                      a = o.indices,
                      l = a[0],
                      u = a[1],
                      s = a[2],
                      f = M[3 * l],
                      h = M[3 * l + 1],
                      c = M[3 * u],
                      d = M[3 * u + 1],
                      w = M[3 * s];
                    if (
                      !((c - f) * (M[3 * s + 1] - h) - (d - h) * (w - f) < 0)
                    ) {
                      for (
                        var v = [], g = -1 / 0, m = 1 / 0, p = o.svg, A = 0;
                        A < 3;
                        ++A
                      ) {
                        var x = a[A];
                        v.push(
                          0.5 * n * (1 - M[3 * x]) +
                            "," +
                            0.5 * r * (1 - M[3 * x + 1])
                        );
                        var F = M[3 * x + 2];
                        (g = Math.max(g, F)), (m = Math.min(m, F));
                      }
                      o.zIndex = g + 0.25 * m;
                      var N = v.join(" ");
                      -1 === N.indexOf("NaN") && setAttribute(p, "points", N),
                        b.push(o);
                    }
                  }
                  for (b.sort(i), y.innerHTML = "", t = 0; t < b.length; ++t)
                    y.appendChild(b[t].svg);
                }
                function a() {
                  v = !1;
                }
                function l() {
                  v = !0;
                }
                function u(t) {
                  c = t;
                }
                function s(t) {
                  d = t;
                }
                function f() {
                  if (v) {
                    window.requestAnimationFrame(f);
                    var t = 1 - m;
                    y.getBoundingClientRect();
                    (g[0] = t * g[0] + m * x.x * 100),
                      (g[1] = t * g[1] + m * x.y * 100 + 0.085);
                    r(k()), o(), a();
                  }
                }
                var h = t || {},
                  c = !!h.followMouse,
                  d = !!h.followMotion,
                  w = !!h.slowDrift,
                  v = !0,
                  g = [0, 0],
                  m = 0.3,
                  p = 400,
                  A = 400,
                  y = createNode("svg"),
                  x = { x: 0, y: 0 },
                  F = foxJSON.positions.length,
                  N = new Float32Array(3 * F),
                  M = new Float32Array(3 * F),
                  b = [];
                h.pxNotRatio ||
                  ((p = (window.innerWidth * (h.width || 0.25)) | 0),
                  (A = 0 | (window.innerHeight * h.height || p)),
                  "minWidth" in h &&
                    p < h.minWidth &&
                    ((p = h.minWidth), (A = p))),
                  setAttribute(y, "width", p + "px"),
                  setAttribute(y, "height", p + "px"),
                  document.body.appendChild(y),
                  (function () {
                    for (
                      var t = foxJSON.positions, e = 0, n = 0;
                      n < t.length;
                      ++n
                    )
                      for (var r = t[n], i = 0; i < 3; ++i) N[e++] = r[i];
                  })();
                var S = (function () {
                    for (var t = [], e = 0; e < foxJSON.chunks.length; ++e)
                      for (
                        var r = foxJSON.chunks[e],
                          i = "rgb(" + r.color + ")",
                          o = r.faces,
                          a = 0;
                        a < o.length;
                        ++a
                      ) {
                        var l = o[a],
                          u = createNode("polygon");
                        setAttribute(u, "fill", i),
                          setAttribute(u, "stroke", i),
                          setAttribute(u, "points", "0,0, 10,0, 0,10"),
                          y.appendChild(u),
                          t.push(new n(u, l));
                      }
                    return t;
                  })(),
                  k = (function () {
                    var t = new Float32Array(3),
                      e = new Float32Array([0, 1, 0]),
                      n = new Float32Array(16),
                      r = new Float32Array(16),
                      i = lookAt(
                        new Float32Array(16),
                        new Float32Array([0, 0, 400]),
                        t,
                        e
                      ),
                      o = invert(new Float32Array(16), i),
                      a = new Float32Array(16),
                      l = new Float32Array(3),
                      u = new Float32Array(16),
                      s = new Float32Array([1, 0, 0]),
                      f = new Float32Array([0, 1, 0]),
                      h = new Float32Array([0, 0, 1]);
                    return function () {
                      var c = y.getBoundingClientRect(),
                        d = c.width,
                        v = c.height;
                      if (
                        //second argument defines how far camera is away from model
                        (B(n, 0.003, d / v, 100, 1e3),
                        invert(a, n),
                        (l[0] = g[0]),
                        (l[1] = g[1]),
                        (l[2] = 1.2),
                        transform(l, l, a),
                        transform(l, l, o),
                        lookAt(r, t, l, e),
                        w)
                      ) {
                        var m = Date.now() / 1e3;
                        rotate(r, r, 0.1 + 0.2 * Math.sin(m / 3), s),
                          rotate(r, r, 0.03 * Math.sin(m / 2) - 0.1, h),
                          rotate(r, r, 0.5 + 0.2 * Math.sin(m / 3), f);
                      }
                      return multiply(u, n, i), multiply(u, u, r), u;
                    };
                  })();
                return (
                  window.addEventListener("mousemove", function (t) {
                    v || l(), c && (e({ x: t.clientX, y: t.clientY }), f());
                  }),
                  window.addEventListener("deviceorientation", function (t) {
                    if ((v || l(), d)) {
                      const n = event.gamma,
                        r = event.beta;
                      (yOffset = -300),
                        (acceleration = 10),
                        e({
                          x: 200 + n * acceleration,
                          y: yOffset + r * acceleration,
                        }),
                        f();
                    }
                  }),
                  f(),
                  {
                    container: y,
                    lookAt: e,
                    setFollowMouse: u,
                    setFollowMotion: s,
                    stopAnimation: a,
                    startAnimation: l,
                  }
                );
              };
            },
            {
              "./fox.json": 2,
              "gl-mat4/invert": 6,
              "gl-mat4/lookAt": 7,
              "gl-mat4/multiply": 8,
              "gl-mat4/perspective": 9,
              "gl-mat4/rotate": 10,
              "gl-vec3/transformMat4": 11,
            },
          ],
          4: [
            function (a, b, c) {
              "use strict";
              function format(e) {
                var t =
                  (/mac os x/i.test(navigator.userAgent) ? "⌘" : "Ctrl") + "+C";
                return e.replace(/#{\s*key\s*}/g, t);
              }
              var d = a("toggle-selection"),
                defaultMessage = "Copy to clipboard: #{key}, Enter";
              b.exports = copy;
            },
            { "toggle-selection": 12 },
          ],
          5: [
            function (a, b, c) {
              function identity(t) {
                return (
                  (t[0] = 1),
                  (t[1] = 0),
                  (t[2] = 0),
                  (t[3] = 0),
                  (t[4] = 0),
                  (t[5] = 1),
                  (t[6] = 0),
                  (t[7] = 0),
                  (t[8] = 0),
                  (t[9] = 0),
                  (t[10] = 1),
                  (t[11] = 0),
                  (t[12] = 0),
                  (t[13] = 0),
                  (t[14] = 0),
                  (t[15] = 1),
                  t
                );
              }
              b.exports = identity;
            },
            {},
          ],
          6: [
            function (F, G, H) {
              function invert(n, r) {
                var e = r[0],
                  t = r[1],
                  u = r[2],
                  i = r[3],
                  l = r[4],
                  o = r[5],
                  v = r[6],
                  a = r[7],
                  c = r[8],
                  d = r[9],
                  f = r[10],
                  m = r[11],
                  p = r[12],
                  s = r[13],
                  x = r[14],
                  b = r[15],
                  g = e * o - t * l,
                  h = e * v - u * l,
                  j = e * a - i * l,
                  k = t * v - u * o,
                  q = t * a - i * o,
                  w = u * a - i * v,
                  y = c * s - d * p,
                  z = c * x - f * p,
                  A = c * b - m * p,
                  B = d * x - f * s,
                  C = d * b - m * s,
                  D = f * b - m * x,
                  E = g * D - h * C + j * B + k * A - q * z + w * y;
                return E
                  ? ((E = 1 / E),
                    (n[0] = (o * D - v * C + a * B) * E),
                    (n[1] = (u * C - t * D - i * B) * E),
                    (n[2] = (s * w - x * q + b * k) * E),
                    (n[3] = (f * q - d * w - m * k) * E),
                    (n[4] = (v * A - l * D - a * z) * E),
                    (n[5] = (e * D - u * A + i * z) * E),
                    (n[6] = (x * j - p * w - b * h) * E),
                    (n[7] = (c * w - f * j + m * h) * E),
                    (n[8] = (l * C - o * A + a * y) * E),
                    (n[9] = (t * A - e * C - i * y) * E),
                    (n[10] = (p * q - s * j + b * g) * E),
                    (n[11] = (d * j - c * q - m * g) * E),
                    (n[12] = (o * z - l * B - v * y) * E),
                    (n[13] = (e * B - t * z + u * y) * E),
                    (n[14] = (s * h - p * k - x * g) * E),
                    (n[15] = (c * k - d * h + f * g) * E),
                    n)
                  : null;
              }
              G.exports = invert;
            },
            {},
          ],
          7: [
            function (g, j, w) {
              function lookAt(t, a, e, r) {
                var i,
                  o,
                  s,
                  h,
                  n,
                  M,
                  d,
                  q,
                  u,
                  b,
                  l = a[0],
                  y = a[1],
                  k = a[2],
                  v = r[0],
                  A = r[1],
                  c = r[2],
                  f = e[0],
                  m = e[1],
                  p = e[2];
                return Math.abs(l - f) < 1e-6 &&
                  Math.abs(y - m) < 1e-6 &&
                  Math.abs(k - p) < 1e-6
                  ? x(t)
                  : ((d = l - f),
                    (q = y - m),
                    (u = k - p),
                    (b = 1 / Math.sqrt(d * d + q * q + u * u)),
                    (d *= b),
                    (q *= b),
                    (u *= b),
                    (i = A * u - c * q),
                    (o = c * d - v * u),
                    (s = v * q - A * d),
                    (b = Math.sqrt(i * i + o * o + s * s)),
                    b
                      ? ((b = 1 / b), (i *= b), (o *= b), (s *= b))
                      : ((i = 0), (o = 0), (s = 0)),
                    (h = q * s - u * o),
                    (n = u * i - d * s),
                    (M = d * o - q * i),
                    (b = Math.sqrt(h * h + n * n + M * M)),
                    b
                      ? ((b = 1 / b), (h *= b), (n *= b), (M *= b))
                      : ((h = 0), (n = 0), (M = 0)),
                    (t[0] = i),
                    (t[1] = h),
                    (t[2] = d),
                    (t[3] = 0),
                    (t[4] = o),
                    (t[5] = n),
                    (t[6] = q),
                    (t[7] = 0),
                    (t[8] = s),
                    (t[9] = M),
                    (t[10] = u),
                    (t[11] = 0),
                    (t[12] = -(i * l + o * y + s * k)),
                    (t[13] = -(h * l + n * y + M * k)),
                    (t[14] = -(d * l + q * y + u * k)),
                    (t[15] = 1),
                    t);
              }
              var x = g("./identity");
              j.exports = lookAt;
            },
            { "./identity": 5 },
          ],
          8: [
            function (q, w, z) {
              function multiply(l, t, u) {
                var r = t[0],
                  e = t[1],
                  i = t[2],
                  m = t[3],
                  n = t[4],
                  o = t[5],
                  p = t[6],
                  y = t[7],
                  a = t[8],
                  c = t[9],
                  d = t[10],
                  f = t[11],
                  s = t[12],
                  v = t[13],
                  x = t[14],
                  b = t[15],
                  g = u[0],
                  h = u[1],
                  j = u[2],
                  k = u[3];
                return (
                  (l[0] = g * r + h * n + j * a + k * s),
                  (l[1] = g * e + h * o + j * c + k * v),
                  (l[2] = g * i + h * p + j * d + k * x),
                  (l[3] = g * m + h * y + j * f + k * b),
                  (g = u[4]),
                  (h = u[5]),
                  (j = u[6]),
                  (k = u[7]),
                  (l[4] = g * r + h * n + j * a + k * s),
                  (l[5] = g * e + h * o + j * c + k * v),
                  (l[6] = g * i + h * p + j * d + k * x),
                  (l[7] = g * m + h * y + j * f + k * b),
                  (g = u[8]),
                  (h = u[9]),
                  (j = u[10]),
                  (k = u[11]),
                  (l[8] = g * r + h * n + j * a + k * s),
                  (l[9] = g * e + h * o + j * c + k * v),
                  (l[10] = g * i + h * p + j * d + k * x),
                  (l[11] = g * m + h * y + j * f + k * b),
                  (g = u[12]),
                  (h = u[13]),
                  (j = u[14]),
                  (k = u[15]),
                  (l[12] = g * r + h * n + j * a + k * s),
                  (l[13] = g * e + h * o + j * c + k * v),
                  (l[14] = g * i + h * p + j * d + k * x),
                  (l[15] = g * m + h * y + j * f + k * b),
                  l
                );
              }
              w.exports = multiply;
            },
            {},
          ],
          9: [
            function (b, d, f) {
              function perspective(e, t, r, p, n) {
                var a = 1 / Math.tan(t / 2),
                  c = 1 / (p - n);
                return (
                  (e[0] = a / r),
                  (e[1] = 0),
                  (e[2] = 0),
                  (e[3] = 0),
                  (e[4] = 0),
                  (e[5] = a),
                  (e[6] = 0),
                  (e[7] = 0),
                  (e[8] = 0),
                  (e[9] = 0),
                  (e[10] = (n + p) * c),
                  (e[11] = -1),
                  (e[12] = 0),
                  (e[13] = 0),
                  (e[14] = 2 * n * p * c),
                  (e[15] = 0),
                  e
                );
              }
              d.exports = perspective;
            },
            {},
          ],
          10: [
            function (F, G, H) {
              function rotate(t, a, r, e) {
                var o,
                  n,
                  s,
                  h,
                  u,
                  M,
                  l,
                  c,
                  i,
                  b,
                  d,
                  f,
                  m,
                  p,
                  q,
                  v,
                  x,
                  g,
                  j,
                  k,
                  w,
                  y,
                  z,
                  A,
                  B = e[0],
                  C = e[1],
                  D = e[2],
                  E = Math.sqrt(B * B + C * C + D * D);
                return Math.abs(E) < 1e-6
                  ? null
                  : ((E = 1 / E),
                    (B *= E),
                    (C *= E),
                    (D *= E),
                    (o = Math.sin(r)),
                    (n = Math.cos(r)),
                    (s = 1 - n),
                    (h = a[0]),
                    (u = a[1]),
                    (M = a[2]),
                    (l = a[3]),
                    (c = a[4]),
                    (i = a[5]),
                    (b = a[6]),
                    (d = a[7]),
                    (f = a[8]),
                    (m = a[9]),
                    (p = a[10]),
                    (q = a[11]),
                    (v = B * B * s + n),
                    (x = C * B * s + D * o),
                    (g = D * B * s - C * o),
                    (j = B * C * s - D * o),
                    (k = C * C * s + n),
                    (w = D * C * s + B * o),
                    (y = B * D * s + C * o),
                    (z = C * D * s - B * o),
                    (A = D * D * s + n),
                    (t[0] = h * v + c * x + f * g),
                    (t[1] = u * v + i * x + m * g),
                    (t[2] = M * v + b * x + p * g),
                    (t[3] = l * v + d * x + q * g),
                    (t[4] = h * j + c * k + f * w),
                    (t[5] = u * j + i * k + m * w),
                    (t[6] = M * j + b * k + p * w),
                    (t[7] = l * j + d * k + q * w),
                    (t[8] = h * y + c * z + f * A),
                    (t[9] = u * y + i * z + m * A),
                    (t[10] = M * y + b * z + p * A),
                    (t[11] = l * y + d * z + q * A),
                    a !== t &&
                      ((t[12] = a[12]),
                      (t[13] = a[13]),
                      (t[14] = a[14]),
                      (t[15] = a[15])),
                    t);
              }
              G.exports = rotate;
            },
            {},
          ],
          11: [
            function (b, c, d) {
              function transformMat4(r, t, a) {
                var n = t[0],
                  o = t[1],
                  e = t[2],
                  f = a[3] * n + a[7] * o + a[11] * e + a[15];
                return (
                  (f = f || 1),
                  (r[0] = (a[0] * n + a[4] * o + a[8] * e + a[12]) / f),
                  (r[1] = (a[1] * n + a[5] * o + a[9] * e + a[13]) / f),
                  (r[2] = (a[2] * n + a[6] * o + a[10] * e + a[14]) / f),
                  r
                );
              }
              c.exports = transformMat4;
            },
            {},
          ],
          12: [
            function (b, c, d) {
              c.exports = function () {
                var e = document.getSelection();
                if (!e.rangeCount) return function () {};
                for (
                  var n = document.activeElement, t = [], a = 0;
                  a < e.rangeCount;
                  a++
                )
                  t.push(e.getRangeAt(a));
                switch (n.tagName.toUpperCase()) {
                  case "INPUT":
                  case "TEXTAREA":
                    n.blur();
                    break;
                  default:
                    n = null;
                }
                return (
                  e.removeAllRanges(),
                  function () {
                    "Caret" === e.type && e.removeAllRanges(),
                      e.rangeCount ||
                        t.forEach(function (n) {
                          e.addRange(n);
                        }),
                      n && n.focus();
                  }
                );
              };
            },
            {},
          ],
        },
        {},
        [1]
      );
    } else {
      console.warn('Element with id "logo-container" not found.');
    }
  }, 1); // 1 seems to work better for me than 0
});
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";

.cover-title {
  margin-bottom: 1rem;
  text-transform: uppercase;
  font-weight: bold;
}

.solid-divider {
  @include media-breakpoint-up($navigation-sidebar-breakpoint) {
    display: none;
  }
}

.info-list {
  @include generate-dynamic-styles-with-hash(
    (
      xxxl: (
        margin-bottom: 2.5rem,
      ),
      lg: (
        margin-bottom: 2rem,
      ),
      md: (
        margin-bottom: 1.2rem,
      ),
    )
  );
}
#logo-container svg {
  width: 250px;
  height: auto;
}

@media only screen and (max-width: 768px) {
  #logo-container svg {
    width: 150px;
    height: auto;
  }
}
</style>
