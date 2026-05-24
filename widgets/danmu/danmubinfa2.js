// Metadata merging
WidgetMetadata = {
  id: "danmu_api_Max_binfa_v2",
  title: "并发弹幕 (官方逻辑版)",
  version: "2.0.0",
  requiredVersion: "0.0.2",
  site: "https://t.me/MakkaPakkaOvO",
  description: "基于官方最新逻辑二改：支持繁简互转、数量限制、关键词屏蔽、颜色重写。全局参数支持多个自定义服务器，以换行分割。",
  author: "𝙈𝙖𝙠𝙠𝙖𝙋𝙖𝙠𝙠𝙖 & Forward",
  globalParams: [
    {
      name: "server",
      title: "自定义服务器",
      type: "input",
      description: "多服务器请换行分割，格式如：弹弹play,https://api.dandanplay.net",
      placeholders: [
        {
          title: "弹弹play",
          value: "https://api.dandanplay.net",
        },
      ],
    },
    { 
      name: "maxCount", 
      title: "📊 弹幕数量上限", 
      type: "input", 
      value: "3000",
      description: "填0或留空不限制。超出则按时间全段等比例随机剔除" 
    },
    { 
      name: "searchBlockKeywords", 
      title: "👁️ 搜索结果屏蔽词 (逗号分隔)", 
      type: "input", 
      value: "",
      description: "屏蔽不想看到的搜索结果，如: 动态漫,电视剧,漫画" 
    },
    { 
      name: "convertMode", 
      title: "🔠 弹幕转换", 
      type: "enumeration", 
      value: "none",
      enumOptions: [
          { title: "保持原样", value: "none" },
          { title: "转简体 (繁->简)", value: "t2s" },
          { title: "转繁体 (简->繁)", value: "s2t" }
      ]
    },
    { 
      name: "colorMode", 
      title: "🎨 弹幕颜色", 
      type: "enumeration", 
      value: "none",
      enumOptions: [
          { title: "保持原样", value: "none" },
          { title: "全部纯白", value: "white" },
          { title: "部分彩色 (50%彩色)", value: "partial" },
          { title: "完全彩色 (100%彩色)", value: "all" }
      ]
    },
    { 
      name: "blockKeywords", 
      title: "🚫 弹幕内容屏蔽词 (逗号分隔)", 
      type: "input", 
      value: "" 
    }
  ],
  modules: [
    { id: "searchDanmu", title: "搜索弹幕", functionName: "searchDanmu", type: "danmu", params: [] },
    { id: "getDetail", title: "获取详情", functionName: "getDetailById", type: "danmu", params: [] },
    { id: "getComments", title: "获取弹幕", functionName: "getCommentsById", type: "danmu", params: [] },
  ],
};
