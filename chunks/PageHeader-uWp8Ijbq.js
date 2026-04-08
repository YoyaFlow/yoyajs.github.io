import { vTopNavbar, getThemeMode, setThemeMode, toast, vSidebar, vstack, vMenuItem, vBody, flex, div } from '../yoya.esm.min.js';

/**
 * TopNavbar 组件
 * 顶部导航栏 - 使用 VTopNavbar
 */


// 主题图标映射
const icons = { auto: '🔄', light: '☀️', dark: '🌙' };

// 主题切换按钮引用
let themeButtonRef = null;
// 标记是否已经初始化过按钮图标
let themeButtonInitialized = false;
// 缓存当前按钮图标，避免重复更新
let currentIcon = null;

// 初始化主题事件监听器（只执行一次）
function initThemeChangeListener() {
  if (typeof window === 'undefined') return;

  window.addEventListener('theme-changed', (e) => {
    // 优先使用 currentMode（auto|light|dark），回退到 mode（light|dark）
    const mode = e.detail?.currentMode || e.detail?.mode || getThemeMode();
    const newIcon = icons[mode];

    // 如果图标没有变化，跳过更新
    if (currentIcon === newIcon) return;
    currentIcon = newIcon;

    if (themeButtonRef) {
      // 更新按钮内容（使用 VButton 的 text() 方法）
      themeButtonRef.text(newIcon);
    }
  });
}

// 立即初始化监听器
initThemeChangeListener();

// 更新按钮图标（在按钮创建后调用，只在首次创建时执行）
function updateThemeButtonIcon() {
  if (themeButtonRef && !themeButtonInitialized) {
    themeButtonInitialized = true;
    // 使用 requestAnimationFrame 确保在下一帧更新，此时按钮已渲染到 DOM
    requestAnimationFrame(() => {
      const currentMode = getThemeMode();
      const newIcon = icons[currentMode];
      currentIcon = newIcon;
      themeButtonRef.text(newIcon);
    });
  }
}

function TopNavbar() {
  return vTopNavbar(navbar => {
    navbar.height('56px');

    // 左侧：品牌 Logo
    navbar.logo('🏝️ YoyaFlow', () => {
      window.location.href = 'index.html';
    });

    // 中间：主导航
    navbar.item('首页', () => {
      window.location.href = 'index.html';
    });

    navbar.item('文档', () => {
      window.location.href = 'button.html';
    });

    // 右侧：主题切换
    navbar.right(right => {
      const mode = getThemeMode();

      const btn = right.button(icons[mode], () => {
        const current = getThemeMode();
        const next = current === 'auto' ? 'light' : current === 'light' ? 'dark' : 'auto';
        setThemeMode(next);
        toast.info(`主题模式：${next === 'auto' ? '跟随系统' : next === 'light' ? '浅色' : '深色'}`);
      });

      btn.ghost();
      btn.type('primary');
      btn.size('small');
      btn.style('cursor', 'pointer');

      // 保存按钮引用用于更新图标（使用按钮实例而非 _boundElement）
      themeButtonRef = btn;

      // 确保按钮图标正确（在页面加载时从 localStorage 恢复主题后）
      updateThemeButtonIcon();
    });
  });
}

/**
 * 统一菜单配置
 * 所有页面共用此菜单定义
 */

const menuConfig = [
  {
    group: '开始',
    items: [
      { label: '介绍', page: 'Home', file: 'index.html' },
    ],
  },
  {
    group: '基础组件',
    items: [
      { label: 'Button 按钮', page: 'Button', file: 'button.html' },
      { label: 'Buttons 按钮组', page: 'Buttons', file: 'buttons.html' },
      { label: 'Icons 图标库', page: 'Icons', file: 'icons.html' },
      { label: 'UI Components 基础组件', page: 'UIComponents', file: 'ui-components.html' },
      { label: 'Statistic 统计数值', page: 'Statistic', file: 'statistic.html' },
      { label: 'Interaction 交互组件', page: 'Interaction', file: 'interaction.html' },
      { label: 'Form 表单', page: 'Form', file: 'form.html' },
      { label: 'Card 卡片', page: 'Card', file: 'card.html' },
    ],
  },
  {
    group: '导航组件',
    items: [
      { label: 'Menu 菜单', page: 'Menu', file: 'menu.html' },
      { label: 'Router 路由', page: 'Router', file: 'router.html' },
      { label: 'Tabs 标签页', page: 'Tabs', file: 'tabs.html' },
      { label: 'Pager 分页', page: 'VPager', file: 'pager.html' },
    ],
  },
  {
    group: '反馈组件',
    items: [
      { label: 'Message 消息', page: 'Message', file: 'message.html' },
      { label: 'Modal 弹出框', page: 'Modal', file: 'modal.html' },
      { label: 'Code 代码', page: 'Code', file: 'code.html' },
    ],
  },
  {
    group: '数据展示',
    items: [
      { label: 'Detail 详情', page: 'Detail', file: 'detail.html' },
      { label: 'Field 字段', page: 'Field', file: 'field.html' },
      { label: 'Table 表格', page: 'Table', file: 'table.html' },
      { label: 'VTree 树形控件', page: 'VTree', file: 'vtree.html' },
      { label: 'Echarts 图表', page: 'Echart', file: 'echart.html' },
      { label: 'Dashboard 大屏看板', page: 'Dashboard', file: 'dashboard.html' },
    ],
  },
  {
    group: '布局组件',
    items: [
      { label: 'Body 容器', page: 'Body', file: 'body.html' },
    ],
  },
  {
    group: '工具',
    items: [
      { label: '动态加载', page: 'DynamicLoader', file: 'dynamic-loader.html' },
      { label: '主题系统', page: 'Theme', file: 'theme.html' },
    ],
  },
  {
    group: '高级功能',
    items: [
      { label: 'i18n 国际化', page: 'I18n', file: 'i18n.html' },
      { label: 'VTimer 日期选择器', page: 'VTimer', file: 'vtimer.html' },
    ],
  },
];

/**
 * V2 演示路由配置
 * 用于 VRouterViews 多视图容器的路由配置
 */

// 演示页面分类配置
const demoRoutes = [
  // 🏠 开始
  {
    category: '开始',
    icon: '🏠',
    items: [
      {
        name: 'home',
        title: '首页',
        icon: '🏠',
        description: '快速开始和介绍',
        loader: () => import('./index-CxlKrn9s.js').then(m => m.createHomePage),
        route: '/home',
        closable: false,
      },
    ],
  },

  // 🔧 基础组件
  {
    category: '基础组件',
    icon: '🔧',
    items: [
      {
        name: 'button',
        title: 'Button 按钮',
        icon: '🔘',
        description: '基础按钮组件',
        loader: () => import('./index-Bgfu9r_B.js').then(m => m.createButtonPage),
        route: '/button',
      },
      {
        name: 'buttons',
        title: 'Buttons 按钮组',
        icon: '🔗',
        description: '按钮组组件',
        loader: () => import('./index-DhV2SLi0.js').then(m => m.createButtonsPage),
        route: '/buttons',
      },
      {
        name: 'form',
        title: 'Form 表单',
        icon: '📝',
        description: '表单组件',
        loader: () => import('./index-Br7VHDUM.js').then(m => m.createFormPage),
        route: '/form',
      },
      {
        name: 'icons',
        title: 'Icons 图标',
        icon: '🎨',
        description: '图标库使用',
        loader: () => import('./index-DhkHqhin.js').then(m => m.createIconsPage),
        route: '/icons',
      },
    ],
  },

  // 📋 数据展示
  {
    category: '数据展示',
    icon: '📋',
    items: [
      {
        name: 'card',
        title: 'Card 卡片',
        icon: '',
        description: '卡片组件',
        loader: () => import('./index-BOxJQRju.js').then(m => m.createCardPage),
        route: '/card',
      },
      {
        name: 'table',
        title: 'Table 表格',
        icon: '📊',
        description: '表格组件',
        loader: () => import('./index-DSLVsBSk.js').then(m => m.createTablePage),
        route: '/table',
      },
      {
        name: 'detail',
        title: 'Detail 详情',
        icon: '📄',
        description: '详情展示组件',
        loader: () => import('./index-FonSNGrs.js').then(m => m.createDetailPage),
        route: '/detail',
      },
      {
        name: 'field',
        title: 'Field 字段',
        icon: '🏷️',
        description: '字段展示组件',
        loader: () => import('./index-DszCNZYT.js').then(m => m.createFieldPage),
        route: '/field',
      },
      {
        name: 'statistic',
        title: 'Statistic 统计数值',
        icon: '📈',
        description: '统计数值组件',
        loader: () => import('./index-DUlq4Tg-.js').then(m => m.createStatisticPage),
        route: '/statistic',
      },
      {
        name: 'code',
        title: 'Code 代码',
        icon: '💻',
        description: '代码展示组件',
        loader: () => import('./index-De59HIag.js').then(m => m.createCodePage),
        route: '/code',
      },
    ],
  },

  // 🧭 导航组件
  {
    category: '导航组件',
    icon: '🧭',
    items: [
      {
        name: 'menu',
        title: 'Menu 菜单',
        icon: '📋',
        description: '菜单组件',
        loader: () => import('./index-433Lxq7F.js').then(m => m.createMenuPage),
        route: '/menu',
      },
      {
        name: 'tabs',
        title: 'Tabs 标签页',
        icon: '📑',
        description: '标签页组件',
        loader: () => import('./index-CvnQjw_z.js').then(m => m.createTabsPage),
        route: '/tabs',
      },
      {
        name: 'pager',
        title: 'Pager 分页',
        icon: '📄',
        description: '分页组件',
        loader: () => import('./index-CCDshA--.js').then(m => m.createVPagerPage),
        route: '/pager',
      },
      {
        name: 'router',
        title: 'Router 路由',
        icon: '',
        description: '路由组件',
        loader: () => import('./index-Bg2eJqzE.js').then(m => m.createRouterPage),
        route: '/router',
      },
    ],
  },

  // 💬 反馈组件
  {
    category: '反馈组件',
    icon: '💬',
    items: [
      {
        name: 'message',
        title: 'Message 消息',
        icon: '💌',
        description: '消息提示组件',
        loader: () => import('./index-C0UAoUTh.js').then(m => m.createMessagePage),
        route: '/message',
      },
      {
        name: 'modal',
        title: 'Modal 弹出框',
        icon: '🪟',
        description: '模态框组件',
        loader: () => import('./index-9qV3_huW.js').then(m => m.createModalPage),
        route: '/modal',
      },
    ],
  },

  // 🛠️ 工具
  {
    category: '工具',
    icon: '🛠️',
    items: [
      {
        name: 'dynamic-loader',
        title: 'DynamicLoader 动态加载',
        icon: '⚡',
        description: '动态组件加载',
        loader: () => import('./index-BbGDGSXZ.js').then(m => m.createDynamicLoaderPage),
        route: '/dynamic-loader',
      },
      {
        name: 'i18n',
        title: 'I18n 国际化',
        icon: '🌐',
        description: '国际化支持',
        loader: () => import('./index-DHuYsDqG.js').then(m => m.createI18nPage),
        route: '/i18n',
      },
      {
        name: 'theme',
        title: 'Theme 主题系统',
        icon: '🎨',
        description: '主题切换系统',
        loader: () => import('./index-CB-G3cf3.js').then(m => m.createThemePage),
        route: '/theme',
      },
    ],
  },

  // 📊 图表和高级组件
  {
    category: '图表和高级',
    icon: '📊',
    items: [
      {
        name: 'echart',
        title: 'Echart 图表',
        icon: '📉',
        description: 'ECharts 图表组件',
        loader: () => import('./index-rwFdw2KE.js').then(m => m.createEchartPage),
        route: '/echart',
      },
      {
        name: 'dashboard',
        title: 'Dashboard 大屏看板',
        icon: '🖥️',
        description: '大屏看板组件',
        loader: () => import('./index-BRgOwR0c.js').then(m => m.createDashboardPage),
        route: '/dashboard',
      },
      {
        name: 'vtree',
        title: 'VTree 树形控件',
        icon: '🌳',
        description: '树形控件组件',
        loader: () => import('./index-BgiAymj0.js').then(m => m.createVTreePage),
        route: '/vtree',
      },
    ],
  },

  // 📐 布局组件
  {
    category: '布局组件',
    icon: '📐',
    items: [
      {
        name: 'body',
        title: 'Body 容器',
        icon: '📦',
        description: '页面容器组件',
        loader: () => import('./index-BJW4TB4i.js').then(m => m.createBodyPage),
        route: '/body',
      },
      {
        name: 'ui-components',
        title: 'UI Components 综合',
        icon: '🧩',
        description: 'UI 组件综合演示',
        loader: () => import('./index-CGyfOk58.js').then(m => m.createUIComponentsPage),
        route: '/ui-components',
      },
      {
        name: 'interaction',
        title: 'Interaction 交互',
        icon: '🎯',
        description: '交互组件演示',
        loader: () => import('./index-DuwhHvmW.js').then(m => m.createInteractionPage),
        route: '/interaction',
      },
      {
        name: 'vtimer',
        title: 'VTimer 日期选择器',
        icon: '📅',
        description: '日期时间选择器',
        loader: () => import('./index-AUr1LSR9.js').then(m => m.createVTimerPage),
        route: '/vtimer',
      },
    ],
  },
];

/**
 * Sidebar 组件
 * 左侧菜单栏，使用统一菜单配置和 vSidebar 组件
 */


/**
 * 根据页面名称查找路由路径
 * @param {string} pageName - 页面名称（如 'UIComponents'）
 * @returns {string|null} 路由路径（如 '/ui-components'）
 */
function findRoutePathByPageName(pageName) {
  for (const category of demoRoutes) {
    for (const item of category.items) {
      // 将路由配置中的 name 转为大写进行比较（如 'ui-components' -> 'uicomponents'）
      const normalizedName = item.name.replace(/-/g, '').toLowerCase();
      if (normalizedName === pageName.toLowerCase()) {
        return item.route;
      }
    }
  }
  return '/' + pageName.toLowerCase();
}

/**
 * Sidebar 主组件
 * @param {string} currentPage - 当前页面文件名（如 'button.html'）
 * @param {boolean} collapsible - 是否可折叠
 * @param {boolean} dark - 是否深色模式
 * @param {boolean} useVRouterViews - 是否使用 VRouterViews 模式（点击菜单切换视图而不是跳转）
 * @param {Object} vRouterInstance - VRouter 实例（用于 VRouterViews 模式下导航）
 * @param {Function} onNavigate - VRouterViews 模式下的导航回调，接收 (routePath) 参数
 */
function Sidebar({ currentPage = '', collapsible = true, dark = false, useVRouterViews = false, vRouterInstance = null, onNavigate = null }) {
  return vSidebar(sidebar => {
    sidebar.width('220px');
    sidebar.collapsedWidth('64px');

    if (dark) sidebar.dark();

    // 头部
    sidebar.header(h => {
      h.styles({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 16px',
      });
      h.span(span => {
        span.styles({
          fontSize: '16px',
          fontWeight: '600',
          color: 'var(--yoya-text-primary, #333)',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
        });
        span.text('🏝️ Yoya.JS');
      });
      // if (collapsible) {
      //   sidebar.showToggleBtn();
      // }
    });

    // 内容区
    sidebar.content(content => {
      menuConfig.forEach(group => {
        // 分组标题
        content.item(group.group, item => {
          item.styles({
            fontSize: '12px',
            fontWeight: '600',
            color: 'var(--yoya-text-secondary, #666)',
            padding: '8px 16px 4px',
            textTransform: 'uppercase',
            pointerEvents: 'none',
          });
        });

        // 分组菜单项
        group.items.forEach(menuItem => {
          // 在 VRouterViews 模式下，根据路由路径判断是否激活
          const isActive = useVRouterViews
            ? (vRouterInstance && vRouterInstance.currentPath() === findRoutePathByPageName(menuItem.page))
            : menuItem.file === currentPage;

          content.item(menuItem.label, item => {
            item.styles({
              fontSize: '14px',
              padding: '8px 16px',
              color: isActive
                ? 'var(--yoya-primary, #2563EB)'
                : 'var(--yoya-text-primary, #333)',
              background: isActive
                ? 'var(--yoya-primary-alpha, rgba(37, 99, 235, 0.1))'
                : 'transparent',
              borderRight: isActive
                ? '3px solid var(--yoya-primary, #2563EB)'
                : '3px solid transparent',
              cursor: 'pointer',
            });
            if (isActive) item.active();
            item.onClick(() => {
              if (useVRouterViews && vRouterInstance) {
                // VRouterViews 模式：切换到对应视图
                const routePath = findRoutePathByPageName(menuItem.page);
                // 使用回调函数添加视图（如果未存在），然后导航
                if (typeof onNavigate === 'function') {
                  onNavigate(routePath);
                } else {
                  vRouterInstance.navigate(routePath);
                }
              } else {
                // 传统模式：跳转到独立页面
                window.location.href = menuItem.file;
              }
            });
          });
        });

        // 分组分割线
        content.divider();
      });
    });

    // 底部
    sidebar.footer(footer => {
      footer.styles({
        fontSize: '12px',
        color: 'var(--yoya-text-secondary, #666)',
        textAlign: 'center',
      });
      footer.text('© 2024 Yoya.Basic');
    });
  });
}

/**
 * PageTOC 组件
 * 页面目录导航（带滚动监听和激活状态高亮）
 *
 * 使用方式：
 * const toc = pageTOC({
 *   items: [{ text: '标题', href: '#id', level: 1 }],
 *   title: '本页目录',
 *   contentContainer: scrollContainerEl
 * });
 */


/**
 * 目录项组件
 */
function tocItem(text, href, level = 1, isActive = false) {
  return vMenuItem(text, item => {
    item._tocHref = href;

    const activeStyles = {
      color: 'var(--yoya-primary, #2563EB)',
      fontWeight: '500',
      background: 'var(--yoya-primary-alpha, rgba(37, 99, 235, 0.1))',
      borderRight: '2px solid var(--yoya-primary, #2563EB)',
    };

    const inactiveStyles = {
      fontSize: level === 1 ? '14px' : '13px',
      padding: '6px 12px',
      color: 'var(--yoya-text-secondary, #666)',
      marginLeft: level === 1 ? '0' : '12px',
      cursor: 'pointer',
      borderRight: '2px solid transparent',
    };

    item.styles(isActive ? activeStyles : inactiveStyles);
    item._activeStyles = activeStyles;
    item._inactiveStyles = { ...inactiveStyles, ...(level === 2 ? { marginLeft: '12px' } : {}) };

    item.on('click', (e) => {
      e.preventDefault();
      if (href) {
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
}

/**
 * PageTOC 主组件
 * @param {Object} options
 * @param {Array} options.items - 目录项数组 [{ text, href, level }]
 * @param {string} options.title - 标题
 * @param {HTMLElement} options.contentContainer - 内容容器（用于监听滚动）
 */
function pageTOC({ items = [], title = '本页目录', contentContainer = null }) {
  return vstack(toc => {
    toc.styles({
      width: '200px',
      padding: '32px 16px',
      overflowY: 'auto',
    });

    toc._items = [];
    toc._activeItem = null;
    toc._observer = null;
    toc._contentContainer = contentContainer;
    toc._linksContainer = null; // 缓存链接容器引用

    // 标题
    toc.child(vMenuItem(title, t => {
      t.styles({
        fontWeight: '600',
        fontSize: '14px',
        marginBottom: '12px',
        color: 'var(--yoya-text-primary, #333)',
      });
    }));

    // 目录项列表
    toc.child(vstack(links => {
      links.gap('4px');
      links.addClass('toc-links'); // 添加特定类名便于查找
      toc._linksContainer = links; // 缓存引用
      items.forEach(item => {
        const itemEl = tocItem(item.text, item.href, item.level, false);
        links.child(itemEl);
        toc._items.push(itemEl);
      });
    }));

    // 设置滚动监听
    if (contentContainer) {
      setupScrollObserver(toc, contentContainer, items);
    }
  });
}

/**
 * 设置滚动监听
 */
function setupScrollObserver(tocInstance, contentEl, items) {
  // 清理旧的 observer
  if (tocInstance._observer) {
    tocInstance._observer.disconnect();
    tocInstance._observer = null;
  }

  if (!contentEl || items.length === 0) {
    return;
  }

  // 等待 DOM 元素就绪
  waitForSectionsAndSetupToc(tocInstance, contentEl, items);
}

/**
 * 等待 DOM 元素就绪并设置 TOC
 */
function waitForSectionsAndSetupToc(tocInstance, contentContainer, items) {
  const trySetup = () => {
    const sectionElements = items
      .map(item => item.href)
      .filter(href => href && href.startsWith('#'))
      .map(href => document.querySelector(href))
      .filter(el => el);

    if (sectionElements.length > 0) {
      setupIntersectionObserver(tocInstance, contentContainer, sectionElements);
      return true;
    }
    return false;
  };

  // 立即尝试一次
  if (trySetup()) return;

  // 使用 MutationObserver 等待元素出现
  const observer = new MutationObserver(() => {
    if (trySetup()) {
      observer.disconnect();
    }
  });

  observer.observe(contentContainer, {
    childList: true,
    subtree: true
  });

  // 5 秒超时
  setTimeout(() => {
    observer.disconnect();
  }, 5000);
}

/**
 * 设置 IntersectionObserver
 */
function setupIntersectionObserver(tocInstance, contentEl, sectionElements) {
  tocInstance._observer = new IntersectionObserver((entries) => {
    let visibleSection = null;
    let maxRatio = 0;

    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const ratio = entry.intersectionRatio;
        if (ratio > maxRatio) {
          maxRatio = ratio;
          visibleSection = entry.target.id;
        }
      }
    });

    if (visibleSection) {
      updateActiveState(tocInstance, '#' + visibleSection);
    }
  }, {
    root: contentEl,
    threshold: [0.1, 0.3, 0.5, 0.7]
  });

  sectionElements.forEach(el => {
    tocInstance._observer.observe(el);
  });
}

/**
 * 更新 TOC 激活状态
 */
function updateActiveState(tocInstance, activeHref) {
  const items = tocInstance._items || [];
  items.forEach(itemEl => {
    if (itemEl._tocHref === activeHref) {
      if (itemEl !== tocInstance._activeItem) {
        // 移除旧激活状态
        if (tocInstance._activeItem && tocInstance._activeItem._inactiveStyles) {
          tocInstance._activeItem.styles(tocInstance._activeItem._inactiveStyles);
        }
        // 设置新激活状态
        itemEl.styles(itemEl._activeStyles);
        tocInstance._activeItem = itemEl;
      }
    } else if (itemEl !== tocInstance._activeItem && itemEl._inactiveStyles) {
      itemEl.styles(itemEl._inactiveStyles);
    }
  });
}

/**
 * 更新 TOC 项目
 * @param {Array} items - 新的目录项数组
 */
function updateTOCItems(tocInstance, items, contentContainer = null) {
  if (!tocInstance || !tocInstance._el) return;

  // 清理旧的 observer
  if (tocInstance._observer) {
    tocInstance._observer.disconnect();
    tocInstance._observer = null;
  }

  // 清空现有项目
  tocInstance._items = [];

  // 使用缓存的链接容器引用
  const linksContainer = tocInstance._linksContainer?._el || tocInstance._el.querySelector('.toc-links');
  if (linksContainer) {
    while (linksContainer.firstChild) {
      linksContainer.removeChild(linksContainer.firstChild);
    }

    // 重新添加项目到现有容器
    items.forEach(item => {
      const itemEl = tocItem(item.text, item.href, item.level, false);
      linksContainer.appendChild(itemEl.renderDom());
      tocInstance._items.push(itemEl);
    });
  }

  // 更新内容容器并重新设置监听
  if (contentContainer) {
    tocInstance._contentContainer = contentContainer;
    setupScrollObserver(tocInstance, contentContainer, items);
  }
}

/**
 * AppShell 组件
 * 应用主布局：顶部导航 + 左侧菜单 + 内容区
 */


// 全局 TOC 实例引用
let globalTocInstance = null;
// 滚动容器元素引用（VRouterViews 模式下使用）
let scrollContainerElement = null;

/**
 * 获取当前的滚动容器
 * @returns {HTMLElement|null} 滚动容器元素
 */
function getScrollContainer() {
  return scrollContainerElement;
}

/**
 * 渲染 TOC 到固定容器
 * @param {Array} items - TOC 目录项数组
 * @param {HTMLElement|null} scrollContainer - 滚动容器元素
 */
function renderToc(items, scrollContainer = null) {
  if (!globalTocInstance) return;

  // 延迟渲染，确保 DOM 已经渲染
  setTimeout(() => {
    // 优先使用传入的 scrollContainer，其次使用回调函数获取
    let container = scrollContainer || getScrollContainer();

    updateTOCItems(globalTocInstance, items, container);
  }, 0);
}

/**
 * AppShell 主组件
 * @param {object} options
 * @param {string} options.currentPage - 当前页面文件名（如 'button.html'）
 * @param {function} options.content - 内容区渲染函数
 * @param {Array} options.tocItems - TOC 目录项数组 [{ text, href, level }]
 * @param {boolean} options.useVRouterViews - 是否使用 VRouterViews 模式
 * @param {Object} options.vRouterInstance - VRouter 实例（VRouterViews 模式下使用）
 * @param {Function} options.onNavigate - VRouterViews 模式下的导航回调
 */
function AppShell({ currentPage = '', content, tocItems = [], useVRouterViews = false, vRouterInstance = null, onNavigate = null }) {
  return vBody(layout => {
    // VRouterViews 模式下，限制高度为 100%，覆盖默认的 100vh
    if (useVRouterViews) {
      layout.styles({ height: '100%', minHeight: '0' });
    }
    // ========== 顶部导航栏 ==========
    layout.child(TopNavbar());

    // ========== 主体区域 ==========
    layout.child(flex(main => {
      main.styles({ flex: 1, display: 'flex', minHeight: 0, overflow: 'auto' });
      main.row(); // 水平布局：侧边栏在左，内容在右

      // 左侧菜单
      main.child(Sidebar({ currentPage, useVRouterViews, vRouterInstance, onNavigate }));

      // 中间内容区（主内容 + 右上角固定 TOC）
      main.child(div(contentArea => {
        contentArea.styles({
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: useVRouterViews ? 'hidden' : 'auto', // VRouterViews 模式下让 VRouterViews 自己管理滚动
          position: 'relative',
          minHeight: 0, // 确保 flex 子项可以正确收缩
        });

        // 内容包装器（右侧为 TOC 留出空间）
        contentArea.child(div(contentWrapper => {
          contentWrapper.styles({
            padding: useVRouterViews ? '0' : '32px 24px',
            paddingRight: '220px', // 为右侧固定 TOC 留出空间
            flex: useVRouterViews ? 1 : 0, // VRouterViews 模式下填充父容器
            minHeight: useVRouterViews ? 0 : 'auto',
            overflow: useVRouterViews ? 'hidden' : 'visible',
          });

          if (content) {
            content(contentWrapper);
          }
        }));

        // 固定 TOC 容器（只创建一次）
        if (!globalTocInstance) {
          // 使用 pageTOC 初始化 TOC 组件
          globalTocInstance = pageTOC({
            items: [],
            title: '本页目录',
            contentContainer: null,
          });
          globalTocInstance.styles({
            position: 'fixed',
            top: '80px',
            right: '24px',
            width: '180px',
            zIndex: 10,
          });
          contentArea.child(globalTocInstance);
        }
        // 无论是哪种模式，都直接渲染 TOC
        renderToc(tocItems);
      }));
    }));
  });
}

/**
 * DocSection 组件
 * 文档章节容器
 */


/**
 * 文档章节
 * @param {string} id - 章节 ID（用于锚点）
 * @param {string} title - 章节标题
 * @param {Array} children - 子元素数组
 */
function DocSection(id, title, children = []) {
  return vstack(section => {
    section.gap('16px');
    section.styles({ marginBottom: '40px', scrollMarginTop: '80px' });
    if (id) section.id(id);

    // 章节标题
    section.child(flex(titleRow => {
      titleRow.alignItems('center');
      titleRow.child(vMenuItem(title));
    }));

    // 章节内容
    children.forEach(child => section.child(child));
  });
}

/**
 * PageHeader 组件
 * 页面标题头
 *
 * 注意：不需要手动导入 CSS，主题 CSS 已通过 yoya.theme.min.css 统一引入
 */


/**
 * 页面标题头
 * @param {string} title - 页面标题
 * @param {string} description - 页面描述
 */
function PageHeader({ title, description = '' }) {
  return vstack(header => {
    header.gap('8px');
    header.child(vMenuItem(title));
    if (description) {
      header.child(vMenuItem(description));
    }
  });
}

export { AppShell as A, DocSection as D, PageHeader as P };
//# sourceMappingURL=PageHeader-uWp8Ijbq.js.map
