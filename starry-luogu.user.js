// ==UserScript==
// @name         STARRY 洛谷
// @namespace    https://www.luogu.com.cn/
// @version      1.0.0
// @license      MIT
// @homepageURL  https://github.com/Starry-Embrace/starry-luogu
// @supportURL   https://github.com/Starry-Embrace/starry-luogu/issues
// @downloadURL  https://raw.githubusercontent.com/Starry-Embrace/starry-luogu/main/starry-luogu.user.js
// @updateURL    https://raw.githubusercontent.com/Starry-Embrace/starry-luogu/main/starry-luogu.user.js
// @description  洛谷美化 + 可视化背景图设置
// @tag          洛谷,Luogu,洛谷美化,LuoguBeautification
// @author       StarryGrasp
// @match        https://www.luogu.com.cn/*
// @icon         https://cdn.luogu.com.cn/upload/usericon/3.png
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue
// @run-at       document-idle
// ==/UserScript==

(function () {
    'use strict';

    /* ========================================================
     * 背景图配置
     * ====================================================== */
    const DEFAULT_BG = 'https://cdn.luogu.com.cn/upload/image_hosting/ciebmdnk.png';
    const BG_KEY = 'starry_luogu_background';

    function getBackgroundUrl() {
        return GM_getValue(BG_KEY, '') || DEFAULT_BG;
    }

    function applyBackground(url) {
        document.documentElement.style.setProperty('--page-bg', `url("${url}")`);
    }

    /* ========================================================
     * 通用样式（所有洛谷页面）
     * ====================================================== */
    const COMMON_CSS = `
/* Luogu Glass UI - Refactored v2 */

:root {
    --page-bg: url("${DEFAULT_BG}");
    --page-fallback: #142338;
    --nav-glass: rgba(20, 35, 56, 0.28);
    --panel-glass: rgba(255, 255, 255, 0.40);
    --section-glass: rgba(236, 242, 248, 0.27);
    --card-glass: rgba(238, 243, 248, 0.30);
    --feed-glass: rgba(240, 245, 250, 0.55);
    --editor-glass: rgba(236, 242, 248, 0.42);
    --tab-panel-glass: rgba(236, 242, 248, 0.38);
    --profile-card-glass: rgba(238, 243, 248, 0.48);
    --profile-inner-glass: rgba(245, 248, 252, 0.36);
    --profile-frame-glass: rgba(245, 248, 252, 0.16);
    --profile-rating-glass: rgba(238, 243, 248, 0.62);
    --blur-nav: blur(12px);
    --blur-card: blur(18px);
    --radius-card: 8px;
    --radius-panel: 10px;
    --radius-section: 13px;
}

/* 1. 新版页面：基础背景与导航 */

html,
body {
    background: var(--page-fallback) !important;
}

.theme-page {
    background: transparent !important;
}

.theme-page::before {
    position: fixed !important;
    inset: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    background-position: center center !important;
    background-size: cover !important;
    background-repeat: no-repeat !important;
    -webkit-mask-image: none !important;
    mask-image: none !important;
    pointer-events: none !important;
}

.sidebar,
.lside.bar {
    background: var(--nav-glass) !important;
    -webkit-backdrop-filter: var(--blur-nav) !important;
    backdrop-filter: var(--blur-nav) !important;
    border: none !important;
    box-shadow: none !important;
    transform: translate3d(0, 0, 0);
}

top-bar,
.top-bar {
    background: linear-gradient( to bottom, rgba(20, 35, 56, 0.24) 0%, rgba(20, 35, 56, 0.20) 55%, rgba(20, 35, 56, 0.12) 82%, rgba(20, 35, 56, 0.06) 100% ) !important;
    -webkit-backdrop-filter: var(--blur-nav) !important;
    backdrop-filter: var(--blur-nav) !important;
    border: none !important;
    box-shadow: none !important;
}

top-bar::after,
.top-bar::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: -16px;
    height: 16px;
    background: linear-gradient( to bottom, rgba(20, 35, 56, 0.06), transparent );
    pointer-events: none;
}

/* 题库、题目页、个人主页共用同一套右上角玻璃 */

.user-nav {
    background: transparent !important;
    isolation: isolate;
}

.user-nav::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
    background: var(--nav-glass);
    -webkit-backdrop-filter: var(--blur-nav);
    backdrop-filter: var(--blur-nav);
    pointer-events: none;
}

/* 2. 旧版首页：背景与导航 */

html:has(#app-old),
html:has(#app-old) body,
body:has(#app-old) #app {
    background-image: var(--page-bg) !important;
    background-position: center center !important;
    background-size: cover !important;
    background-repeat: no-repeat !important;
    background-attachment: fixed !important;
    background-color: var(--page-fallback) !important;
}

body:has(#app-old) #app-old,
body:has(#app-old) main.lfe-body,
body:has(#app-old) .main-wrapper.lfe-body,
body:has(#app-old) .main-container,
body:has(#app-old) .main-container > main,
body:has(#app-old) .main-container > div,
body:has(#app-old) .background {
    background: transparent !important;
}

body:has(#app-old) .background {
    filter: none !important;
}

body:has(#app-old) #app > nav.lfe-body {
    background: var(--nav-glass) !important;
    -webkit-backdrop-filter: var(--blur-nav) !important;
    backdrop-filter: var(--blur-nav) !important;
    border: none !important;
    box-shadow: none !important;
}

body:has(#app-old) #app > nav.lfe-body > div:first-child {
    background: transparent !important;
}

body:has(#app-old) #app > .top-bar,
body:has(#app-old) > .header,
body:has(#app-old) .header-layout.tiny {
    background: var(--nav-glass) !important;
    -webkit-backdrop-filter: var(--blur-nav) !important;
    backdrop-filter: var(--blur-nav) !important;
    border: none !important;
    outline: none !important;
    box-shadow: none !important;
}

body:has(#app-old) .header,
body:has(#app-old) .header-layout,
body:has(#app-old) header.theme-bg {
    border: none !important;
    outline: none !important;
    box-shadow: none !important;
}

body:has(#app-old) header.theme-bg {
    background-color: transparent !important;
    background-image: none !important;
}

/* 旧首页不使用新版顶栏下方渐隐 */

body:has(#app-old) top-bar::after,
body:has(#app-old) .top-bar::after,
body:has(#app-old) #app > .top-bar::before,
body:has(#app-old) #app > .top-bar::after {
    display: none !important;
}

/* 3. 旧版首页：普通卡片 */

body:has(#app-old) .lg-article,
body:has(#app-old) .lg-summary,
body:has(#app-old) .lg-article-sub,
body:has(#app-old) .card {
    background: var(--panel-glass) !important;
    -webkit-backdrop-filter: blur(12px) !important;
    backdrop-filter: blur(12px) !important;
    border: none !important;
    border-radius: var(--radius-panel) !important;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08) !important;
    overflow: hidden !important;
}

/* 4. 旧版首页：近期比赛 / 最近讨论 */

body:has(#app-old) .lg-article:has(.lg-index-contest.am-panel) {
    background: var(--section-glass) !important;
    -webkit-backdrop-filter: var(--blur-card) saturate(120%) brightness(1) !important;
    backdrop-filter: var(--blur-card) saturate(120%) brightness(1) !important;
    border: none !important;
    border-radius: var(--radius-section) !important;
    box-shadow: 0 5px 18px rgba(0, 0, 0, 0.08) !important;
    overflow: hidden !important;
}

body:has(#app-old) .lg-index-contest {
    background: var(--card-glass) !important;
    -webkit-backdrop-filter: var(--blur-card) saturate(115%) brightness(0.98) !important;
    backdrop-filter: var(--blur-card) saturate(115%) brightness(0.98) !important;
    border: none !important;
    border-radius: var(--radius-card) !important;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.09) !important;
    color: rgba(35, 40, 47, 0.92) !important;
    overflow: hidden !important;
    text-shadow: none !important;
}

body:has(#app-old) .lg-index-contest * {
    text-shadow: none !important;
}

body:has(#app-old) .lg-index-contest .am-panel-bd,
body:has(#app-old) .lg-index-contest .lg-inline-up {
    background: transparent !important;
}

body:has(#app-old) .lg-index-contest .am-panel-bd {
    color: rgba(40, 45, 52, 0.90) !important;
}

body:has(#app-old) .lg-index-contest.am-panel-success .am-panel-hd,
body:has(#app-old) .lg-index-contest.am-panel-danger .am-panel-hd {
    background: rgba(226, 241, 224, 0.48) !important;
}

body:has(#app-old) .lg-index-contest.am-panel-primary .am-panel-hd {
    background: transparent !important;
}

body:has(#app-old) .lg-index-contest .am-text-grey,
body:has(#app-old) .lg-index-contest .am-text-default,
body:has(#app-old) .lg-index-contest small {
    color: rgba(45, 50, 58, 0.82) !important;
}

/* 5. 旧版首页：犇犇 */

body:has(#app-old) .lg-index-benben,
body:has(#app-old) #feed,
body:has(#app-old) #feed > li,
body:has(#app-old) #feed .am-comment {
    background: transparent !important;
    -webkit-backdrop-filter: none !important;
    backdrop-filter: none !important;
    border: none !important;
    box-shadow: none !important;
}

/* 发射犇犇 */

body:has(#app-old) .lg-article:has(#feed-content) {
    background: var(--editor-glass) !important;
    -webkit-backdrop-filter: var(--blur-card) saturate(120%) !important;
    backdrop-filter: var(--blur-card) saturate(120%) !important;
    border: none !important;
    border-radius: var(--radius-section) !important;
    box-shadow: 0 5px 18px rgba(0, 0, 0, 0.08) !important;
    padding: 26px 28px !important;
    overflow: hidden !important;
}

body:has(#app-old) .lg-article:has(#feed-content) > h2 {
    background: transparent !important;
}

body:has(#app-old) #feed-content {
    background: rgba(255, 255, 255, 0.64) !important;
    -webkit-backdrop-filter: blur(10px) !important;
    backdrop-filter: blur(10px) !important;
    border: 1px solid rgba(255, 255, 255, 0.62) !important;
    border-radius: var(--radius-card) !important;
    color: rgba(30, 34, 40, 0.94) !important;
    box-shadow: none !important;
}

body:has(#app-old) #feed-submit {
    border-radius: var(--radius-card) !important;
}

/* 我关注的 / 我发布的 */

body:has(#app-old) .lg-article:has(#home-center-nav) {
    background: var(--tab-panel-glass) !important;
    -webkit-backdrop-filter: var(--blur-card) saturate(120%) !important;
    backdrop-filter: var(--blur-card) saturate(120%) !important;
    border: none !important;
    border-radius: var(--radius-section) !important;
    box-shadow: 0 5px 18px rgba(0, 0, 0, 0.08) !important;
    padding: 18px !important;
    overflow: hidden !important;
}

body:has(#app-old) #home-center-nav {
    background: rgba(255, 255, 255, 0.18) !important;
    -webkit-backdrop-filter: blur(10px) !important;
    backdrop-filter: blur(10px) !important;
    border: none !important;
    border-radius: 11px !important;
    overflow: hidden !important;
}

body:has(#app-old) #home-center-nav > li > a {
    background: transparent !important;
    border: none !important;
    border-radius: var(--radius-card) !important;
}

body:has(#app-old) #home-center-nav > li.am-active > a {
    background: rgba(104, 153, 215, 0.78) !important;
    color: #fff !important;
}

/* 每一条犇犇 */

body:has(#app-old) #feed .am-comment-main {
    background: var(--feed-glass) !important;
    -webkit-backdrop-filter: var(--blur-card) saturate(120%) brightness(0.99) !important;
    backdrop-filter: var(--blur-card) saturate(120%) brightness(0.99) !important;
    border: none !important;
    border-radius: var(--radius-panel) !important;
    box-shadow: 0 5px 18px rgba(0, 0, 0, 0.08) !important;
    overflow: hidden !important;
    text-shadow: none !important;
}

body:has(#app-old) #feed .am-comment-main * {
    text-shadow: none !important;
}

body:has(#app-old) #feed .am-comment-hd,
body:has(#app-old) #feed .am-comment-bd {
    background: transparent !important;
}

body:has(#app-old) #feed .am-comment-hd {
    border-bottom: 1px solid rgba(255, 255, 255, 0.20) !important;
    color: rgba(65, 70, 78, 0.66);
}

body:has(#app-old) #feed .am-comment-hd span {
    color: rgba(65, 70, 78, 0.66);
}

body:has(#app-old) #feed .am-comment-bd {
    color: rgba(32, 37, 44, 0.92) !important;
}

body:has(#app-old) #feed .am-comment-main::before,
body:has(#app-old) #feed .am-comment-main::after {
    display: none !important;
}

/* 6. 个人主页：使用已确认的 main > full-container > l-card > 头图结构识别页面。 */

html:has(:where(main > .full-container.columba-content-wrap > .l-card) > .user-header-top),
html:has(:where(main > .full-container.columba-content-wrap > .l-card) > .user-header-top) body,
body:has(:where(main > .full-container.columba-content-wrap > .l-card) > .user-header-top) #app {
    background-image: var(--page-bg) !important;
    background-position: center center !important;
    background-size: cover !important;
    background-repeat: no-repeat !important;
    background-attachment: fixed !important;
    background-color: var(--page-fallback) !important;
}

body:has(:where(main > .full-container.columba-content-wrap > .l-card) > .user-header-top) main,
body:has(:where(main > .full-container.columba-content-wrap > .l-card) > .user-header-top) .lcolor-bg-grey-1,
body:has(:where(main > .full-container.columba-content-wrap > .l-card) > .user-header-top) .columba-content-wrap,
body:has(:where(main > .full-container.columba-content-wrap > .l-card) > .user-header-top) .full-container {
    background: transparent !important;
}

/* 个人主页头图 / 用户浮窗：仅修改卡片本身，不触发整页样式。 */

body .l-card:has(> .user-header-top) {
    background: var(--profile-frame-glass) !important;
    -webkit-backdrop-filter: blur(18px) saturate(135%) !important;
    backdrop-filter: blur(18px) saturate(135%) !important;
    border: 1px solid rgba(255, 255, 255, 0.32) !important;
    border-radius: 14px !important;
    box-shadow: 0 10px 32px rgba(0, 0, 0, 0.16), inset 0 1px 0 rgba(255, 255, 255, 0.24) !important;
    overflow: hidden !important;
}

/* 封面与用户名区域不额外虚化；不覆盖 user-header-top 的背景图 */

body .l-card > .user-header-top {
    -webkit-backdrop-filter: none !important;
    backdrop-filter: none !important;
    border: none !important;
    box-shadow: none !important;
}

body .l-card:has(> .user-header-top) .user-info {
    background-color: transparent !important;
    -webkit-backdrop-filter: none !important;
    backdrop-filter: none !important;
    border: none !important;
    box-shadow: none !important;
}

/* 主页 / 动态 / 练习 / 关注等底栏 */

body:has(:where(main > .full-container.columba-content-wrap > .l-card) > .user-header-top) .user-header-bottom {
    background: rgba(238, 243, 248, 0.20) !important;
    -webkit-backdrop-filter: blur(18px) saturate(120%) !important;
    backdrop-filter: blur(18px) saturate(120%) !important;
    border: none !important;
    box-shadow: none !important;
}

/* 下方普通内容卡片 */

body:has(:where(main > .full-container.columba-content-wrap > .l-card) > .user-header-top) main .l-card:not(:has(> .user-header-top)) {
    background: var(--profile-card-glass) !important;
    -webkit-backdrop-filter: blur(18px) saturate(115%) brightness(0.99) !important;
    backdrop-filter: blur(18px) saturate(115%) brightness(0.99) !important;
    border: none !important;
    border-radius: 11px !important;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.10) !important;
    overflow: hidden !important;
}

body:has(:where(main > .full-container.columba-content-wrap > .l-card) > .user-header-top) main .inner-card {
    background: var(--profile-inner-glass) !important;
    -webkit-backdrop-filter: blur(12px) saturate(110%) !important;
    backdrop-filter: blur(12px) saturate(110%) !important;
    border: none !important;
    border-radius: var(--radius-card) !important;
    box-shadow: none !important;
}

/* 热度图：提高底色，降低背景干扰 */

body:has(:where(main > .full-container.columba-content-wrap > .l-card) > .user-header-top) main .l-card:has(.heatmap),
body:has(:where(main > .full-container.columba-content-wrap > .l-card) > .user-header-top) main .l-card:has([class*="heatmap"]) {
    background: rgba(248, 250, 252, 0.82) !important;
    -webkit-backdrop-filter: blur(8px) saturate(105%) !important;
    backdrop-filter: blur(8px) saturate(105%) !important;
    color: rgba(40, 44, 50, 0.94) !important;
    border-radius: 11px !important;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08) !important;
}

body:has(:where(main > .full-container.columba-content-wrap > .l-card) > .user-header-top) main .l-card:has(.heatmap) text,
body:has(:where(main > .full-container.columba-content-wrap > .l-card) > .user-header-top) main .l-card:has([class*="heatmap"]) text {
    fill: rgba(70, 74, 82, 0.82) !important;
}

/* 7. 个人主页：Rating 图表专用修复 */

/* Rating 提示框沿用原生坐标系：卡片禁用背景模糊；勿增加 transform / position，勿修改 tooltip 的定位或显隐。 */

body:has(:where(main > .full-container.columba-content-wrap > .l-card) > .user-header-top) main .l-card:has(#rating-chart) {
    background: var(--profile-rating-glass) !important;
    -webkit-backdrop-filter: none !important;
    backdrop-filter: none !important;
    border: none !important;
    border-radius: 11px !important;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.10) !important;
    overflow: visible !important;
}

/* 只提高层级，不碰 tooltip 自己的定位和显隐逻辑 */

body:has(:where(main > .full-container.columba-content-wrap > .l-card) > .user-header-top) #rating-chart + .tooltip {
    z-index: 2147483647 !important;
    pointer-events: none !important;
}

/* 避免上层容器裁剪 tooltip */

body:has(:where(main > .full-container.columba-content-wrap > .l-card) > .user-header-top) main:has(#rating-chart),
body:has(:where(main > .full-container.columba-content-wrap > .l-card) > .user-header-top) .columba-content-wrap:has(#rating-chart),
body:has(:where(main > .full-container.columba-content-wrap > .l-card) > .user-header-top) .full-container:has(#rating-chart) {
    overflow: visible !important;
}

/* 8. Footer */

/* 个人主页 Footer 延续背景图 */

body:has(:where(main > .full-container.columba-content-wrap > .l-card) > .user-header-top) footer {
    background-image: var(--page-bg) !important;
    background-position: center center !important;
    background-size: cover !important;
    background-repeat: no-repeat !important;
    background-attachment: fixed !important;
    background-color: transparent !important;
    border: none !important;
    box-shadow: none !important;
}

body:has(:where(main > .full-container.columba-content-wrap > .l-card) > .user-header-top) footer > * {
    background: transparent !important;
}

/* 其他新版页面去掉 Footer 的额外模糊 */

body:not(:has(#app-old)):not(:has(:where(main > .full-container.columba-content-wrap > .l-card) > .user-header-top)) footer {
    background: transparent !important;
    -webkit-backdrop-filter: none !important;
    backdrop-filter: none !important;
    filter: none !important;
    border: none !important;
    box-shadow: none !important;
}

body:not(:has(#app-old)):not(:has(:where(main > .full-container.columba-content-wrap > .l-card) > .user-header-top)) footer::before,
body:not(:has(#app-old)):not(:has(:where(main > .full-container.columba-content-wrap > .l-card) > .user-header-top)) footer::after {
    content: none !important;
    background: transparent !important;
    -webkit-backdrop-filter: none !important;
    backdrop-filter: none !important;
    filter: none !important;
}

/* 专栏 / 文章页兼容：保留原有匹配范围与覆盖顺序。 */

body:has(:is(.md-blog, .markdown-body, .blog-content)),
body:has(article) {
    background-image: var(--page-bg) !important;
    background-position: center center !important;
    background-size: cover !important;
    background-repeat: no-repeat !important;
    background-attachment: fixed !important;
}

/* 先把专栏页外围各种底板清掉 */

body:has(:is(.md-blog, .markdown-body, .blog-content)) main,
body:has(article) main,
body:has(:is(.md-blog, .markdown-body, .blog-content)) .columba-content-wrap,
body:has(article) .columba-content-wrap,
body:has(:is(.md-blog, .markdown-body, .blog-content)) .l-container,
body:has(article) .l-container,
body:has(:is(.md-blog, .markdown-body, .blog-content)) .container,
body:has(article) .container,
body:has(:is(.md-blog, .markdown-body, .blog-content)) .row,
body:has(article) .row {
    background: transparent !important;
    box-shadow: none !important;
    border: none !important;
}

/* 去掉文章页底部可能残留的深色/模糊块 */

body:has(:is(.md-blog, .markdown-body, .blog-content)) footer,
body:has(article) footer,
body:has(:is(.md-blog, .markdown-body, .blog-content)) .l-footer,
body:has(article) .l-footer,
body:has(:is(.md-blog, .markdown-body, .blog-content)) .l-footer-bg-background,
body:has(article) .l-footer-bg-background {
    background: transparent !important;
    -webkit-backdrop-filter: none !important;
    backdrop-filter: none !important;
    filter: none !important;
    box-shadow: none !important;
    border: none !important;
}

/* 专栏正文主卡片：大气泡 */

body:has(.md-blog) .l-card:has(.md-blog),
body:has(.markdown-body) .l-card:has(.markdown-body),
body:has(.blog-content) .l-card:has(.blog-content),
body:has(article) .l-card:has(article),
body:has(.md-blog) article,
body:has(.markdown-body) article,
body:has(.blog-content) .blog-content {
    background: rgba(248, 251, 255, 0.92) !important;
    -webkit-backdrop-filter: blur(18px) saturate(120%) !important;
    backdrop-filter: blur(18px) saturate(120%) !important;
    border: none !important;
    border-radius: 12px !important;
    box-shadow: 0 8px 28px rgba(0, 0, 0, 0.10) !important;
    overflow: hidden !important;
}

/* 正文内部不要再自己铺底 */

body:has(.md-blog) .l-card:has(.md-blog) > *,
body:has(.markdown-body) .l-card:has(.markdown-body) > *,
body:has(.blog-content) .l-card:has(.blog-content) > *,
body:has(article) .l-card:has(article) > *,
body:has(.md-blog) .md-blog,
body:has(.markdown-body) .markdown-body,
body:has(.blog-content) .blog-content {
    background: transparent !important;
}

/* 正文文字颜色加深，保证可读性 */

body:has(.md-blog) .md-blog,
body:has(.markdown-body) .markdown-body,
body:has(.blog-content) .blog-content,
body:has(article) article {
    color: rgba(32, 36, 42, 0.96) !important;
}

/* 标题和元信息也不要太淡 */

body:has(:is(.md-blog, .markdown-body, .blog-content)) h1,
body:has(article) h1,
body:has(:is(.md-blog, .markdown-body, .blog-content)) h2,
body:has(article) h2,
body:has(:is(.md-blog, .markdown-body, .blog-content)) .header {
    color: rgba(28, 32, 38, 0.96) !important;
}

/* 代码块、引用块单独浅底，否则正文会发飘 */

body:has(:is(.md-blog, .markdown-body, .blog-content)) pre,
body:has(article) pre,
body:has(:is(.md-blog, .markdown-body, .blog-content)) blockquote,
body:has(article) blockquote {
    background: rgba(243, 246, 250, 0.88) !important;
    border-radius: 10px !important;
    border: none !important;
}

/* 行内 code 也稍微补一点底 */

body:has(:is(.md-blog, .markdown-body, .blog-content)) code,
body:has(article) code {
    background: rgba(240, 244, 248, 0.92) !important;
    border-radius: 6px !important;
}

/* 左侧点赞/收藏这一列，也改成小玻璃 */

body:has(:is(.md-blog, .markdown-body, .blog-content)) .side,
body:has(article) .side {
    background: rgba(246, 249, 253, 0.78) !important;
    -webkit-backdrop-filter: blur(14px) saturate(120%) !important;
    backdrop-filter: blur(14px) saturate(120%) !important;
    border: none !important;
    border-radius: 12px !important;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08) !important;
}

/* 右侧栏保持玻璃，但不要比正文更重 */

body:has(:is(.md-blog, .markdown-body, .blog-content)) aside .l-card,
body:has(article) aside .l-card,
body:has(:is(.md-blog, .markdown-body, .blog-content)) .right-wrap .l-card,
body:has(article) .right-wrap .l-card {
    background: rgba(244, 248, 252, 0.82) !important;
    -webkit-backdrop-filter: blur(14px) saturate(118%) !important;
    backdrop-filter: blur(14px) saturate(118%) !important;
    border: none !important;
    border-radius: 12px !important;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08) !important;
}

/* 避免正文区域下方再出现额外深色叠层 */

body:has(:is(.md-blog, .markdown-body, .blog-content)) .l-card::before,
body:has(article) .l-card::before,
body:has(:is(.md-blog, .markdown-body, .blog-content)) .l-card::after,
body:has(article) .l-card::after {
    box-shadow: none !important;
}
`;

    /* ========================================================
     * 专栏样式
     * ====================================================== */
    const ARTICLE_CSS = `
/* 洛谷专栏毛玻璃样式：合并版。所有规则仅在存在 #article-title 时生效。 */

html:has(#article-title),
html:has(#article-title) body {
    background-image: var(--page-bg) !important;
    background-position: center center !important;
    background-size: cover !important;
    background-repeat: no-repeat !important;
    background-attachment: fixed !important;
    background-color: #142338 !important;
}

body:has(#article-title) #app,
body:has(#article-title) .main-container.lside-nav,
body:has(#article-title) main.lcolor-bg-background.main {
    background: transparent !important;
}

body:has(#article-title) main.lcolor-bg-background.main > div[style*="background-color: rgb(255, 255, 255)"] {
    background: transparent !important;
}

body:has(#article-title) .article-banner.columba-content-wrap.wrapper {
    background: rgba(238, 244, 250, 0.32) !important;
    -webkit-backdrop-filter: blur(16px) saturate(120%) !important;
    backdrop-filter: blur(16px) saturate(120%) !important;
    border: none !important;
    border-radius: 13px !important;
    box-shadow: 0 8px 26px rgba(0, 0, 0, 0.10) !important;
    overflow: visible !important;
    margin-bottom: 20px !important;
    margin-top: 16px !important;
}

body:has(#article-title) .article-banner .banner-content {
    background: transparent !important;
}

body:has(#article-title) #article-title {
    color: rgb(25, 28, 33) !important;
    opacity: 1 !important;
    text-shadow: none !important;
}

body:has(#article-title) .article-banner .meta,
body:has(#article-title) .article-banner .meta span,
body:has(#article-title) .article-banner .meta time {
    color: rgb(50, 54, 61) !important;
    opacity: 1 !important;
    text-shadow: none !important;
}

body:has(#article-title) .article-content.columba-content-wrap.wrapper {
    background: transparent !important;
    -webkit-backdrop-filter: none !important;
    backdrop-filter: none !important;
    border: none !important;
    box-shadow: none !important;
    overflow: visible !important;
    box-sizing: border-box !important;
    padding-left: 0 !important;
    padding-right: 0 !important;
    margin-top: 0 !important;
    padding-top: 0 !important;
}

body:has(#article-title) .article-content.columba-content-wrap.wrapper::before,
body:has(#article-title) .article-content.columba-content-wrap.wrapper::after {
    content: none !important;
    display: none !important;
}

body:has(#article-title) .article-content > .lfe-marked-wrap {
    box-sizing: border-box !important;
    padding: 28px 24px !important;
    background: rgba(242, 247, 252, 0.55) !important;
    -webkit-backdrop-filter: blur(18px) saturate(115%) !important;
    backdrop-filter: blur(18px) saturate(115%) !important;
    border: none !important;
    border-radius: 13px 13px 0 0 !important;
    box-shadow: 0 8px 28px rgba(0, 0, 0, 0.09) !important;
    overflow: visible !important;
    width: 100% !important;
    max-width: none !important;
    min-width: 0 !important;
    margin-left: 0 !important;
    margin-right: 0 !important;
    margin-top: 0 !important;
}

body:has(#article-title) .article-content > .lfe-marked-wrap > .lfe-marked {
    background: transparent !important;
    margin: 0 !important;
    width: auto !important;
    max-width: none !important;
    min-width: 0 !important;
}

body:has(#article-title) .article-content > .update-info {
    box-sizing: border-box !important;
    padding: 12px 24px 24px !important;
    background: rgba(242, 247, 252, 0.55) !important;
    -webkit-backdrop-filter: blur(18px) saturate(115%) !important;
    backdrop-filter: blur(18px) saturate(115%) !important;
    border: none !important;
    border-radius: 0 0 13px 13px !important;
    margin-top: -1px !important;
    box-shadow: 0 8px 28px rgba(0, 0, 0, 0.09) !important;
    color: rgb(70, 74, 81) !important;
    text-shadow: none !important;
    width: 100% !important;
    max-width: none !important;
    margin-left: 0 !important;
    margin-right: 0 !important;
}

body:has(#article-title) .article-content .lfe-marked,
body:has(#article-title) .article-content .lfe-marked p,
body:has(#article-title) .article-content .lfe-marked li {
    color: rgb(25, 29, 35) !important;
    opacity: 1 !important;
    text-shadow: none !important;
}

body:has(#article-title) .article-content .lfe-marked h1,
body:has(#article-title) .article-content .lfe-marked h2,
body:has(#article-title) .article-content .lfe-marked h3,
body:has(#article-title) .article-content .lfe-marked h4,
body:has(#article-title) .article-content .lfe-marked h5,
body:has(#article-title) .article-content .lfe-marked h6 {
    color: rgb(20, 23, 28) !important;
    opacity: 1 !important;
    text-shadow: none !important;
}

body:has(#article-title) .article-content > .actions.left-mode {
    z-index: 50 !important;
    translate: -28px 0 !important;
    background: rgba(248, 250, 253, 0.86) !important;
    -webkit-backdrop-filter: blur(12px) saturate(115%) !important;
    backdrop-filter: blur(12px) saturate(115%) !important;
    border: none !important;
    border-radius: 10px !important;
    box-shadow: 0 5px 16px rgba(0, 0, 0, 0.10) !important;
}

body:has(#article-title) .article-content > .actions.left-mode .button-2line {
    background: transparent !important;
    border: none !important;
    box-shadow: none !important;
}

body:has(#article-title) .article-content > .actions:not(.left-mode) {
    display: none !important;
}

body:has(#article-title) .article-content > .toc-wrapper {
    background: transparent !important;
    -webkit-backdrop-filter: none !important;
    backdrop-filter: none !important;
    border: none !important;
    border-radius: 0 !important;
    box-shadow: none !important;
    overflow: visible !important;
    translate: 16px 0 !important;
}

body:has(#article-title) .article-content > .toc-wrapper::before,
body:has(#article-title) .article-content > .toc-wrapper::after {
    content: none !important;
    display: none !important;
}

body:has(#article-title) .article-content > .toc-wrapper > .toc.with-top {
    box-sizing: border-box !important;
    padding: 18px 20px !important;
    background: rgba(241, 246, 251, 0.7) !important;
    -webkit-backdrop-filter: blur(14px) saturate(112%) !important;
    backdrop-filter: blur(14px) saturate(112%) !important;
    border: none !important;
    border-radius: 10px !important;
    box-shadow: 0 5px 18px rgba(0, 0, 0, 0.08) !important;
    color: rgb(45, 49, 56) !important;
    text-shadow: none !important;
    width: calc(100% + 8px) !important;
    max-width: none !important;
}

body:has(#article-title) .article-content > .toc-wrapper > .toc.with-top::before,
body:has(#article-title) .article-content > .toc-wrapper > .toc.with-top::after {
    content: none !important;
    display: none !important;
    box-shadow: none !important;
}

body:has(#article-title) .article-content > .toc-wrapper > .toc.with-top > ul {
    background: transparent !important;
    -webkit-backdrop-filter: none !important;
    backdrop-filter: none !important;
    border: none !important;
    box-shadow: none !important;
    margin: 0 !important;
    padding: 0 !important;
}

body:has(#article-title) .article-content > .toc-wrapper > .toc.with-top li {
    background: transparent !important;
    border: none !important;
    box-shadow: none !important;
    color: rgb(49, 53, 60) !important;
    text-shadow: none !important;
}

body:has(#article-title) .article-content > .toc-wrapper > .toc.with-top li span,
body:has(#article-title) .article-content > .toc-wrapper > .toc.with-top li a {
    color: rgb(49, 53, 60) !important;
    opacity: 1 !important;
    text-shadow: none !important;
}

body:has(#article-title) .article-comment.columba-content-wrap.wrapper {
    background: rgba(242, 247, 252, 0.55) !important;
    -webkit-backdrop-filter: blur(16px) saturate(115%) !important;
    backdrop-filter: blur(16px) saturate(115%) !important;
    border: none !important;
    border-radius: 13px !important;
    box-shadow: 0 8px 28px rgba(0, 0, 0, 0.09) !important;
    margin-top: 20px !important;
}

body:has(#article-title) footer {
    background: transparent !important;
    -webkit-backdrop-filter: none !important;
    backdrop-filter: none !important;
    filter: none !important;
    border: none !important;
    box-shadow: none !important;
}

body:has(#article-title) footer::before,
body:has(#article-title) footer::after {
    content: none !important;
}

body:has(#article-title) footer > * {
    background: transparent !important;
}

body:has(#article-title) {
    overflow-x: auto !important;
}
`;

    /* ========================================================
     * 设置卡片样式
     * ====================================================== */
    const SETTINGS_CSS = `
#starry-settings-mask {
    position: fixed;
    inset: 0;
    z-index: 2147483000;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(20, 35, 56, 0.42);
    -webkit-backdrop-filter: blur(4px);
    backdrop-filter: blur(4px);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.22s ease;
}
#starry-settings-mask.show {
    opacity: 1;
    pointer-events: auto;
}
#starry-settings-card {
    width: 440px;
    max-width: calc(100vw - 32px);
    box-sizing: border-box;
    padding: 22px 26px 20px;
    background: rgba(238, 243, 248, 0.62);
    -webkit-backdrop-filter: blur(18px) saturate(125%);
    backdrop-filter: blur(18px) saturate(125%);
    border: 1px solid rgba(255, 255, 255, 0.38);
    border-radius: 13px;
    box-shadow: 0 12px 36px rgba(0, 0, 0, 0.22), inset 0 1px 0 rgba(255, 255, 255, 0.28);
    color: rgba(28, 32, 38, 0.94);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC",
                 "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
    font-size: 14px;
    transform: translateY(10px) scale(0.98);
    transition: transform 0.24s cubic-bezier(0.22, 1, 0.36, 1);
}
#starry-settings-mask.show #starry-settings-card {
    transform: translateY(0) scale(1);
}
#starry-settings-card h3 {
    margin: 0 0 6px;
    font-size: 17px;
    font-weight: 600;
    color: rgba(20, 24, 30, 0.96);
    letter-spacing: 0.3px;
}
#starry-settings-card .starry-desc {
    margin: 0 0 16px;
    font-size: 12.5px;
    color: rgba(60, 66, 74, 0.78);
    line-height: 1.5;
}
#starry-settings-card .starry-field-label {
    display: block;
    margin-bottom: 6px;
    font-size: 12.5px;
    font-weight: 600;
    color: rgba(45, 50, 58, 0.85);
}
#starry-bg-url {
    width: 100%;
    box-sizing: border-box;
    padding: 9px 12px;
    font-size: 13px;
    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    color: rgba(28, 32, 38, 0.94);
    background: rgba(255, 255, 255, 0.72);
    border: 1px solid rgba(140, 160, 185, 0.45);
    border-radius: 8px;
    outline: none;
    transition: border-color 0.18s, box-shadow 0.18s;
}
#starry-bg-url:focus {
    border-color: rgba(104, 153, 215, 0.9);
    box-shadow: 0 0 0 3px rgba(104, 153, 215, 0.18);
}
#starry-settings-card .starry-actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 20px;
}
#starry-settings-card .starry-btn {
    padding: 8px 16px;
    font-size: 13px;
    font-family: inherit;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    transition: transform 0.12s, background 0.18s, box-shadow 0.18s;
}
#starry-settings-card .starry-btn:active {
    transform: scale(0.97);
}
#starry-settings-card .starry-btn.ghost {
    background: rgba(255, 255, 255, 0.5);
    color: rgba(45, 50, 58, 0.88);
    border: 1px solid rgba(140, 160, 185, 0.35);
}
#starry-settings-card .starry-btn.ghost:hover {
    background: rgba(255, 255, 255, 0.72);
}
#starry-settings-card .starry-btn.primary {
    background: linear-gradient(180deg, rgba(104, 153, 215, 0.96), rgba(84, 133, 200, 0.96));
    color: #fff;
    box-shadow: 0 4px 12px rgba(84, 133, 200, 0.35);
}
#starry-settings-card .starry-btn.primary:hover {
    background: linear-gradient(180deg, rgba(114, 163, 225, 0.98), rgba(94, 143, 210, 0.98));
}
`;

    /* ========================================================
     * 设置卡片
     * ====================================================== */
    let maskEl = null;

    function buildSettingsCard() {
        if (maskEl) return maskEl;

        maskEl = document.createElement('div');
        maskEl.id = 'starry-settings-mask';
        maskEl.innerHTML = `
            <div id="starry-settings-card" role="dialog" aria-modal="true" aria-label="STARRY 洛谷设置">
                <h3>STARRY 洛谷设置</h3>
                <p class="starry-desc">填写背景图片的直链 URL。留空并保存将恢复为默认背景。</p>
                <label class="starry-field-label" for="starry-bg-url">背景图 URL</label>
                <input id="starry-bg-url" type="text" spellcheck="false"
                       placeholder="https://cdn.luogu.com.cn/upload/image_hosting/ciebmdnk.png">
                <div class="starry-actions">
                    <button type="button" class="starry-btn ghost" data-action="reset">恢复默认</button>
                    <button type="button" class="starry-btn ghost" data-action="cancel">取消</button>
                    <button type="button" class="starry-btn primary" data-action="save">保存</button>
                </div>
            </div>
        `;

        maskEl.addEventListener('click', (e) => {
            if (e.target === maskEl) closeSettingsCard();
        });

        maskEl.querySelector('[data-action="cancel"]').addEventListener('click', closeSettingsCard);
        maskEl.querySelector('[data-action="reset"]').addEventListener('click', () => {
            GM_setValue(BG_KEY, '');
            applyBackground(DEFAULT_BG);
            const input = maskEl.querySelector('#starry-bg-url');
            if (input) input.value = DEFAULT_BG;
            closeSettingsCard();
        });
        maskEl.querySelector('[data-action="save"]').addEventListener('click', () => {
            const input = maskEl.querySelector('#starry-bg-url');
            const url = (input?.value || '').trim();
            if (!url) {
                GM_setValue(BG_KEY, '');
                applyBackground(DEFAULT_BG);
            } else {
                GM_setValue(BG_KEY, url);
                applyBackground(url);
            }
            closeSettingsCard();
        });

        maskEl.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                e.stopPropagation();
                closeSettingsCard();
            }
        });

        document.body.appendChild(maskEl);
        return maskEl;
    }

    function openSettingsCard() {
        const el = buildSettingsCard();
        const input = el.querySelector('#starry-bg-url');
        if (input) {
            input.value = GM_getValue(BG_KEY, '') || DEFAULT_BG;
        }
        // 触发重排，确保过渡动画生效
        void el.offsetWidth;
        el.classList.add('show');
        setTimeout(() => input && input.focus(), 80);
    }

    function closeSettingsCard() {
        if (!maskEl) return;
        maskEl.classList.remove('show');
    }

    /* ========================================================
     * 菜单注入
     * ====================================================== */
    const MENU_ITEM_ID = 'starry-luogu-settings-entry';
    let injectTimer = null;

    function tryInjectMenuItem() {
        if (document.getElementById(MENU_ITEM_ID)) return;

        // 精确匹配“工单/反馈”菜单项
        const anchor = document.querySelector('.nav-group li[title="工单/反馈"]');
        if (!anchor) return;

        const newItem = anchor.cloneNode(true);
        newItem.id = MENU_ITEM_ID;
        newItem.title = 'STARRY 洛谷设置';
        newItem.removeAttribute('data-v-71f35d47');
        newItem.removeAttribute('data-v-a119941e');

        const link = newItem.querySelector('a');
        if (link) {
            link.removeAttribute('href');
            link.removeAttribute('target');
            link.style.cursor = 'pointer';
            link.classList.remove('router-link-active', 'router-link-exact-active');

            const titleSpan = link.querySelector('.title');
            if (titleSpan) {
                titleSpan.textContent = 'STARRY 洛谷设置';
                // 保留“minor”样式，使其与同级菜单项一致
            }

            link.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                openSettingsCard();
            });
        }

        anchor.parentElement.appendChild(newItem);
    }

    function startMenuWatcher() {
        tryInjectMenuItem();

        const observer = new MutationObserver(() => {
            clearTimeout(injectTimer);
            injectTimer = setTimeout(tryInjectMenuItem, 250);
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }

    /* ========================================================
     * 启动
     * ====================================================== */
    applyBackground(getBackgroundUrl());

    GM_addStyle(COMMON_CSS);
    GM_addStyle(ARTICLE_CSS);
    GM_addStyle(SETTINGS_CSS);

    startMenuWatcher();

    // 全局 Esc 关闭（防止焦点不在卡片上时无效）
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && maskEl && maskEl.classList.contains('show')) {
            closeSettingsCard();
        }
    });
})();