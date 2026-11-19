import extra from './ui-extra.json';
import { defaultLocale, type LocaleCode } from './locales';

export type Messages = {
  siteName: string;
  siteKicker: string;
  skip: string;
  navBrowse: string;
  navFcc: string;
  navCost: string;
  navAbout: string;
  footerFacts: string;
  footerDisclosure: string;
  footerAbout: string;
  langMenu: string;
  shownInEnglish: string;
  homeTitle: string;
  homeDescription: string;
  homeKicker: string;
  homeH1: string;
  homeLede: string;
  searchLabel: string;
  searchPlaceholder: string;
  countAll: string;
  countMatch: string;
  noMatch: string;
  beforeH2: string;
  beforeBefore: string;
  beforeGuide: string;
  beforeMid: string;
  beforeFcc: string;
  beforeAfter: string;
  crumbHome: string;
  makeTitle: string;
  makeDescription: string;
  makeH1: string;
  makeLede: string;
  checked: string;
  matchFcc: string;
  canYou: string;
  safety: string;
  onBoardSteps: string;
  keysH2: string;
  keyType: string;
  fccId: string;
  partNumbers: string;
  battery: string;
  frequency: string;
  pricesH2: string;
  priceDisclaimer: string;
  colChannel: string;
  colPrice: string;
  colCovers: string;
  shopsH2: string;
  unverifiedH2: string;
  noGaps: string;
  sourcesH2: string;
  accessed: string;
  colStep: string;
  usMarket: string;
  fccTitle: string;
  fccDescription: string;
  fccKicker: string;
  fccH1: string;
  fccLede: string;
  colFcc: string;
  colRole: string;
  colFreq: string;
  colVehicle: string;
  seeVehicle: string;
  unverifiedChip: string;
  diyYes: string;
  diyNo: string;
  diyTool: string;
  keyFlip: string;
  keyRemoteHead: string;
  keySmart: string;
  keyTransponder: string;
  keySeparate: string;
  channelDealer: string;
  channelLocksmith: string;
  channelDiy: string;
  roleOem: string;
  roleAftermarket: string;
  roleSeller: string;
  guideTitle: string;
  guideDescription: string;
  guideKicker: string;
  guideH1: string;
  guideLede: string;
  guideByline: string;
  guideH2Published: string;
  guidePublished: string;
  guideCaption: string;
  guideColType: string;
  guideColParts: string;
  guideColProg: string;
  guideColTotal: string;
  rowMechanical: string;
  rowTransponder: string;
  rowSwitchblade: string;
  rowSmart: string;
  na: string;
  guideAfter: string;
  guideReadKbb: string;
  guideH2Use: string;
  guideSilverado: string;
  guideFord: string;
  guideHonda: string;
  guideDifferent: string;
  guideH2Listings: string;
  guideLinkSilverado: string;
  guideLinkFord: string;
  guideLinkCrv4: string;
  guideLinkCrv2: string;
  guideStock: string;
  aboutTitle: string;
  aboutDescription: string;
  aboutKicker: string;
  aboutH1: string;
  aboutP1: string;
  aboutH2Source: string;
  aboutSource: string;
  aboutH2Wont: string;
  aboutWont1: string;
  aboutWont2: string;
  aboutWont3: string;
  aboutWont4: string;
  aboutWarning: string;
  aboutH2Coverage: string;
  aboutCoverage1: string;
  aboutFcc: string;
  aboutCoverage2: string;
  aboutShop: string;
  aboutDiscLink: string;
  discTitle: string;
  discDescription: string;
  discKicker: string;
  discH1: string;
  discLive: string;
  discEmpty: string;
  discConfig: string;
  discSponsored: string;
  discH2: string;
  discSet: string;
  discUnset: string;
  discOther: string;
  notFoundTitle: string;
  notFoundDescription: string;
  notFoundH1: string;
  notFoundBefore: string;
  notFoundBrowse: string;
  notFoundMid: string;
  notFoundFcc: string;
  notFoundAfter: string;
};

const en: Messages = {
  siteName: 'Key Ledger',
  siteKicker: 'US key fob notes',
  skip: 'Skip to content',
  navBrowse: 'Browse',
  navFcc: 'FCC IDs',
  navCost: 'Cost guide',
  navAbout: 'About',
  footerFacts: 'Facts are cited or marked unverified. This site does not publish ratings or testimonials.',
  footerDisclosure: 'Affiliate disclosure',
  footerAbout: 'About the research',
  langMenu: 'Language',
  shownInEnglish: 'English',
  homeTitle: 'Key Ledger: key fob programming by make and year',
  homeDescription: 'US notes on key-fob replacement and programming, browsable by make. FCC IDs, part numbers, and prices are cited or marked unverified.',
  homeKicker: 'United States',
  homeH1: 'What it actually takes to replace a key fob.',
  homeLede: 'Key Ledger is a directory of programming notes, FCC IDs, and part numbers for US cars and trucks. Every procedure and price is tied to a page we opened. If a dealer quote or a chip type was not in those pages, the vehicle file says unverified instead of guessing.',
  searchLabel: 'Search make, model, year, or FCC ID',
  searchPlaceholder: 'Silverado, CWTWB1U793, 2013',
  countAll: '{n} researched vehicles. The list works without JavaScript.',
  countMatch: '{shown} of {total} vehicles match.',
  noMatch: 'No match in the current files. Coverage is still a short list.',
  beforeH2: 'Before you buy a fob',
  beforeBefore: 'Read the ',
  beforeGuide: 'dealer, locksmith, and DIY cost guide',
  beforeMid: ' for published national ranges, then open the vehicle page for the hardware prices we could actually cite. If you already have the remote in your hand, start with the ',
  beforeFcc: 'FCC ID lookup',
  beforeAfter: '.',
  crumbHome: 'Home',
  makeTitle: '{make} key fob notes',
  makeDescription: 'Key fob and remote programming notes for {make} vehicles in the Key Ledger, with FCC IDs and sourced prices.',
  makeH1: '{make} key fobs',
  makeLede: 'Each card is one researched year range. Open it for the programming limit, the FCC ID, and the prices that had a source on the day they were checked.',
  checked: 'Checked {date}.',
  matchFcc: 'Match the FCC ID on your own remote before you order.',
  canYou: 'Can you program it yourself?',
  safety: 'Safety.',
  onBoardSteps: 'On-board steps',
  keysH2: 'Keys that sellers and grants describe',
  keyType: 'Key type',
  fccId: 'FCC ID',
  partNumbers: 'Part numbers',
  battery: 'Battery',
  frequency: 'Frequency',
  pricesH2: 'Price ranges',
  priceDisclaimer: 'A verified row is a price a public page showed on the access date. It is not a quote for your ZIP code. Amounts stay in US dollars, as published.',
  colChannel: 'Channel',
  colPrice: 'Price',
  colCovers: 'What the source actually covers',
  shopsH2: 'Shop links',
  unverifiedH2: 'Unverified / not yet researched',
  noGaps: 'No open gaps were recorded in this file.',
  sourcesH2: 'Sources',
  accessed: 'Accessed {date}.',
  colStep: 'Step',
  usMarket: 'US market',
  fccTitle: 'FCC ID lookup for key fobs',
  fccDescription: 'FCC IDs gathered from Key Ledger vehicle files, with the grant frequency when a source states it and a link back to the vehicle.',
  fccKicker: 'From the vehicle files',
  fccH1: 'FCC ID lookup',
  fccLede: 'This index is generated from the vehicle records. An ID marked as an aftermarket example is one a seller says is printed on the replacement remote, not the original equipment grant. Confirm the string on your own fob before you buy.',
  colFcc: 'FCC ID',
  colRole: 'Role',
  colFreq: 'Frequency in the file',
  colVehicle: 'Vehicle',
  seeVehicle: 'See the vehicle page',
  unverifiedChip: 'Unverified / not yet researched',
  diyYes: 'On-board programming',
  diyNo: 'No on-board programming',
  diyTool: 'Needs a tool',
  keyFlip: 'Flip key',
  keyRemoteHead: 'Remote head key',
  keySmart: 'Smart / proximity key',
  keyTransponder: 'Transponder only',
  keySeparate: 'Separate keyless remote',
  channelDealer: 'Dealer',
  channelLocksmith: 'Locksmith',
  channelDiy: 'Buy online + DIY',
  roleOem: 'OEM grant ID',
  roleAftermarket: 'Printed on an aftermarket remote',
  roleSeller: 'Seller-listed ID',
  guideTitle: 'Dealer vs locksmith vs DIY key fob cost',
  guideDescription: 'Dealer, locksmith, and DIY key-fob costs using Kelley Blue Book figures from July 14, 2025, plus the hardware prices cited on our vehicle pages.',
  guideKicker: 'Cost guide',
  guideH1: 'Dealer, locksmith, or do it yourself.',
  guideLede: 'National ranges below are from one Kelley Blue Book article, not from quotes for the Silverado, F-150, or CR-V in this directory. Those three pages keep their own price rows, and several of those rows are still unverified on purpose.',
  guideByline: 'KBB article by Chris Hardesty, dated July 14, 2025. Accessed November 19, 2026.',
  guideH2Published: 'What KBB published',
  guidePublished: 'The article says replacement often requires a dealership and can run from $150 to $500 or more. KBB says it contacted dealers around the country. The quotes it reports are about $200 to $400 for a 2020 Subaru Forester with push-button start, about the same for a 2020 Toyota Sienna, as little as $150 for a 2017 Honda Accord, and roughly $500 for a 2023 BMW X7. It also mentions an Aston Martin crystal fob around $2,000 as an outlier, which is not a useful budget for a normal US car.',
  guideCaption: 'KBB table of typical costs. Parts and programming are their split. Totals are their total column.',
  guideColType: 'Key type in the KBB table',
  guideColParts: 'Parts',
  guideColProg: 'Programming',
  guideColTotal: 'Total',
  rowMechanical: 'Basic mechanical',
  rowTransponder: 'Transponder key',
  rowSwitchblade: 'Switchblade fob',
  rowSmart: 'Smart key, fob only',
  na: 'n/a',
  guideAfter: 'On locksmiths, KBB says a reputable shop might offer 10% to 25% savings compared with a dealership, often with mobile service. On DIY, it says an aftermarket fob might be $50 to $100 and an OBD-II programmer about $50, with the risk of a failed programming. Every dealer KBB surveyed required a visit and proof of ownership or registration before programming a fob.',
  guideReadKbb: 'Read the KBB article',
  guideH2Use: 'How to use that next to a vehicle page',
  guideSilverado: 'the on-board remote sequence is published. Car and Truck Remotes, USD 29.95, in stock, checked November 19, 2026. NorthCoast Keyless, USD 24.94, out of stock, checked November 19, 2026. Standard Auto Part, USD 30.00, in stock, checked November 19, 2026. Price assumed for 1 remote; pack size not confirmed (SKU ends in -(2)). The CAD 37.00 price is not shown. Dealer and locksmith totals were not found.',
  guideFord: 'on-board programming needs two working keys, and the published hold times disagree. Car and Truck Remotes, USD 29.95, in stock, checked November 19, 2026, hardware only. Installed prices were not found.',
  guideHonda: 'service pages require a scan tool. Tom\'s Key Company, USD 54.95 and USD 60.95, both in stock, checked November 19, 2026. Keys4Less, USD 88.00, out of stock, checked November 19, 2026. Car Keys Express is not given a USD amount: a repeat request returned HTTP 429 and no priceCurrency. Dealer and locksmith totals were not found.',
  guideDifferent: 'A $30 remote plus a free on-board sequence is a different job from a transponder key that has to be cut and registered with a tool. KBB’s switchblade and smart-key rows are closer to the second job. Do not add the KBB total on top of a hardware price from a vehicle page. They are different measurements.',
  guideH2Listings: 'Listings behind the hardware prices',
  guideLinkSilverado: '2005 Silverado remote at {name}',
  guideLinkFord: '2013 F-150 remote at {name}',
  guideLinkCrv4: '2014–2016 CR-V key at {name}',
  guideLinkCrv2: '2012 CR-V key at {name}',
  guideStock: 'Checked November 19, 2026 from product JSON or JSON-LD, including priceCurrency. Car and Truck Remotes and Tom\'s Key are USD and in stock. Keys4Less is USD and out of stock. NorthCoast Keyless is USD and out of stock. Standard Auto Part\'s USD offer is in stock; its CAD price is not shown. Stock and price will move. This guide does not rate the sellers.',
  aboutTitle: 'About Key Ledger',
  aboutDescription: 'How Key Ledger researches key-fob programming: one vehicle file per page, a source URL and access date on every fact, and no invented prices or reviews.',
  aboutKicker: 'About',
  aboutH1: 'A ledger, not a review site.',
  aboutP1: 'Key Ledger is a static directory for people in the United States who need a replacement remote, flip key, remote-head key, or smart key. Each vehicle is one YAML file. The site renders that file. It does not keep a database, and it does not invent a fact to fill a blank.',
  aboutH2Source: 'What counts as a source',
  aboutSource: 'A source is a public page opened on a named date: an equipment-authorization grant, an owner’s guide, a service procedure, or a retailer listing. FCC IDs on this site are taken from grant pages reproduced by FCCID.io when that is what was opened, and the vehicle page says so. Part numbers that appear only on a seller’s page are labeled as seller-listed. A price is the number in that product’s data that day. Stock is taken from a product JSON file or from JSON-LD availability, not from a Sold out label in the theme.',
  aboutH2Wont: 'What this site will not publish',
  aboutWont1: 'Star ratings, testimonials, or “customers say” lines.',
  aboutWont2: 'A dealer or locksmith price that was not printed somewhere we can link.',
  aboutWont3: 'An on-board button sequence when the only procedure we found needs a scan tool.',
  aboutWont4: 'A blended procedure when two sources disagree on the timing. The disagreement stays on the page.',
  aboutWarning: 'Programming steps include a warning that a wrong sequence can leave you needing a locksmith. That warning is required in every vehicle file.',
  aboutH2Coverage: 'Coverage',
  aboutCoverage1: 'The first files are a 2003–2006 Chevrolet Silverado 1500, a 2011–2014 Ford F-150, and a 2012–2016 Honda CR-V. Adding the next vehicle is a new file, described in the README. The ',
  aboutFcc: 'FCC ID index',
  aboutCoverage2: ' rebuilds from those files.',
  aboutShop: 'Shop links are ready for affiliate parameters and currently have none. ',
  aboutDiscLink: 'Read the disclosure',
  discTitle: 'Affiliate disclosure',
  discDescription: 'Key Ledger affiliate disclosure. Retailer links are configured in one file. Affiliate parameters are empty until a program is joined.',
  discKicker: 'Disclosure',
  discH1: 'How shop links work.',
  discLive: 'At least one retailer in the config has an affiliate parameter. A purchase through those links may earn this site a commission. That commission does not raise the price you pay.',
  discEmpty: 'No affiliate program is connected yet. Every affiliate parameter in the config is an empty string, so shop links are ordinary URLs and this site does not earn a commission on them.',
  discConfig: 'The parameter for every retailer lives in src/config/affiliates.json. Vehicle files store the product URL only. Filling in a query string, such as an Amazon tag, updates every link for that retailer the next time the site is built. Do not put a leading ? or & in the config. The site adds the right separator.',
  discSponsored: 'When a parameter is present, those links are marked rel="sponsored". Research pages do not change their prices or their “unverified” labels because a parameter was filled in. We do not publish ratings of these stores.',
  discH2: 'Retailers in the config',
  discSet: 'parameter set',
  discUnset: 'parameter empty',
  discOther: 'Other sites are cited as sources, including FCCID.io, Ford, Kelley Blue Book, and sellers that are not in this list. Those citations are not run through the affiliate config.',
  notFoundTitle: 'Page not found',
  notFoundDescription: 'That page is not in the Key Ledger.',
  notFoundH1: 'That vehicle is not in the ledger yet.',
  notFoundBefore: 'The directory only lists files that have been researched. Browse ',
  notFoundBrowse: 'by make',
  notFoundMid: ' or look up an ',
  notFoundFcc: 'FCC ID',
  notFoundAfter: ' that is already on file.',
};

function m(partial: Messages): Messages {
  return partial;
}

const zhHant = m({
  ...en,
  siteKicker: '美國鑰匙遙控器筆記',
  skip: '跳至本文',
  navBrowse: '瀏覽',
  navFcc: 'FCC ID',
  navCost: '費用指南',
  navAbout: '關於',
  footerFacts: '事實都有出處，或標成尚未查證。本站不刊登評分或見證。',
  footerDisclosure: '聯盟行銷揭露',
  footerAbout: '研究方法',
  langMenu: '語言',
  shownInEnglish: '英文',
  homeTitle: 'Key Ledger：依廠牌與年份查鑰匙遙控器編程',
  homeDescription: '美國車鑰匙遙控器更換與編程筆記，可依廠牌瀏覽。FCC ID、零件號與價格都有出處，查不到就標成尚未查證。',
  homeKicker: '美國',
  homeH1: '換一把鑰匙遙控器，實際上要做什麼。',
  homeLede: 'Key Ledger 收錄美國轎車與貨卡的編程筆記、FCC ID 與零件號。每個步驟和價格都對應我們打開過的頁面。經銷商報價或晶片型號若不在那些頁面上，車輛檔會寫「尚未查證」，而不是猜測。',
  searchLabel: '搜尋廠牌、車型、年份或 FCC ID',
  countAll: '已研究 {n} 款車。沒有 JavaScript 也能看這份清單。',
  countMatch: '{total} 款中有 {shown} 款符合。',
  noMatch: '現有檔案裡沒有符合的項目。收錄範圍還很短。',
  beforeH2: '下單之前',
  beforeBefore: '先讀',
  beforeGuide: '經銷商、鎖匠與自行處理的費用指南',
  beforeMid: '，那是公開的全國區間；再到車輛頁看我們確實引用到的硬體價格。遙控器已經在手上的話，從',
  beforeFcc: 'FCC ID 查詢',
  beforeAfter: '開始。',
  crumbHome: '首頁',
  makeTitle: '{make} 鑰匙遙控器筆記',
  makeDescription: 'Key Ledger 裡 {make} 的鑰匙與遙控器編程筆記，含 FCC ID 與有出處的價格。',
  makeH1: '{make} 鑰匙遙控器',
  makeLede: '每張卡片是一個已研究的年份區間。打開後可看編程限制、FCC ID，以及查核當天有出處的價格。',
  checked: '查核日期：{date}。',
  matchFcc: '下單前請核對你手上遙控器的 FCC ID。',
  canYou: '車主可以自己編程嗎？',
  safety: '安全。',
  onBoardSteps: '車上編程步驟',
  keysH2: '賣家與認證文件描述的鑰匙',
  keyType: '鑰匙類型',
  fccId: 'FCC ID',
  partNumbers: '零件號',
  battery: '電池',
  frequency: '頻率',
  pricesH2: '價格區間',
  priceDisclaimer: '已查證的列，是某個公開頁面在查閱日顯示的價格，不是你所在郵遞區號的報價。金額維持來源刊登的美元。',
  colChannel: '通路',
  colPrice: '價格',
  colCovers: '出處實際涵蓋的內容',
  shopsH2: '商店連結',
  unverifiedH2: '尚未查證',
  noGaps: '這份檔案沒有記下未解的缺口。',
  sourcesH2: '出處',
  accessed: '查閱日期：{date}。',
  colStep: '步驟',
  usMarket: '美國市場',
  fccTitle: '鑰匙遙控器 FCC ID 查詢',
  fccDescription: '從 Key Ledger 車輛檔彙整的 FCC ID。若出處寫了認證頻率會一併列出，並連回車輛頁。',
  fccKicker: '來自車輛檔',
  fccH1: 'FCC ID 查詢',
  fccLede: '這份索引由車輛紀錄產生。標成售後範例的 ID，是賣家說印在替換遙控器上的編號，不是原廠認證編號。購買前請核對你自己遙控器上的字串。',
  colFcc: 'FCC ID',
  colRole: '角色',
  colFreq: '檔案中的頻率',
  colVehicle: '車輛',
  seeVehicle: '見車輛頁',
  unverifiedChip: '尚未查證',
  diyYes: '可在車上編程',
  diyNo: '沒有車上編程',
  diyTool: '需要工具',
  keyFlip: '摺疊鑰匙',
  keyRemoteHead: '遙控頭鑰匙',
  keySmart: '智慧／近接鑰匙',
  keyTransponder: '僅晶片鑰匙',
  keySeparate: '分離式免鑰匙遙控器',
  channelDealer: '經銷商',
  channelLocksmith: '鎖匠',
  channelDiy: '線上購買後自行處理',
  roleOem: '原廠認證 ID',
  roleAftermarket: '印在售後遙控器上',
  roleSeller: '賣家列出的 ID',
  guideTitle: '經銷商、鎖匠與自行處理的鑰匙費用',
  guideDescription: '用 Kelley Blue Book 2025 年 7 月 14 日的數字，加上本站車輛頁引用的硬體價格，比較經銷商、鎖匠與自行處理。',
  guideKicker: '費用指南',
  guideH1: '經銷商、鎖匠，或自己來。',
  guideLede: '下面的全國區間來自一篇 Kelley Blue Book 文章，不是本目錄裡 Silverado、F-150 或 CR-V 的報價。那三頁有自己的價格列，其中好幾列故意保持尚未查證。',
  guideByline: 'KBB 文章，作者 Chris Hardesty，日期 2025 年 7 月 14 日。查閱日期 2026 年 11 月 19 日。',
  guideH2Published: 'KBB 刊登了什麼',
  guidePublished: '文章說更換往往要找經銷商，費用可能從 150 美元到 500 美元以上。KBB 說他們聯繫了全美經銷商。報導的報價是：2020 年 Subaru Forester（按鈕啟動）約 200 到 400 美元，2020 年 Toyota Sienna 差不多，2017 年 Honda Accord 低到 150 美元，2023 年 BMW X7 大約 500 美元。文中也提到 Aston Martin 水晶遙控器約 2,000 美元，那是極端例子，不適合作為一般美國車的預算。',
  guideCaption: 'KBB 的典型費用表。零件與編程是他們的拆分，合計是他們的合計欄。',
  guideColType: 'KBB 表中的鑰匙類型',
  guideColParts: '零件',
  guideColProg: '編程',
  guideColTotal: '合計',
  rowMechanical: '基本機械鑰匙',
  rowTransponder: '晶片鑰匙',
  rowSwitchblade: '摺疊遙控鑰匙',
  rowSmart: '智慧鑰匙（僅遙控器）',
  na: '不適用',
  guideAfter: '關於鎖匠，KBB 說可靠的店可能比經銷商便宜 10% 到 25%，而且常常可以到府。關於自行處理，文章說售後遙控器可能是 50 到 100 美元，OBD-II 編程器約 50 美元，但有編程失敗的風險。KBB 問過的每家經銷商都要求本人到場，並出示所有權或行照證明，才願意編程。',
  guideReadKbb: '閱讀 KBB 文章',
  guideH2Use: '怎麼跟車輛頁一起看',
  guideSilverado: '車上遙控器步驟已公開。Car and Truck Remotes，USD 29.95，有貨，2026 年 11 月 19 日查閱。NorthCoast Keyless，USD 24.94，缺貨，同日查閱。Standard Auto Part，USD 30.00，有貨，同日查閱。價格先以 1 只遙控器計算；包裝數量尚未確認（SKU 結尾是 -(2)）。CAD 37.00 不顯示。沒有找到經銷商或鎖匠總價。',
  guideFord: '車上編程需要兩把可用的鑰匙，公開的按住時間彼此不一致。Car and Truck Remotes，USD 29.95，有貨，2026 年 11 月 19 日查閱，只含硬體。沒有找到含安裝的價格。',
  guideHonda: '維修資料要求診斷工具。Tom\'s Key Company，USD 54.95 與 USD 60.95，都有貨，2026 年 11 月 19 日查閱。Keys4Less，USD 88.00，缺貨，同日查閱。Car Keys Express 沒有給出 USD 金額：再次要求得到 HTTP 429，而且沒有 priceCurrency。沒有找到經銷商或鎖匠總價。',
  guideDifferent: '30 美元的遙控器加上免費的車上步驟，和必須切削並用工具登錄的晶片鑰匙，是兩種工作。KBB 的摺疊鑰匙與智慧鑰匙列比較接近後者。不要把 KBB 的合計加到車輛頁的硬體價格上。兩者量的不是同一件事。',
  guideH2Listings: '硬體價格背後的商品頁',
  guideLinkSilverado: '{name} 的 2005 Silverado 遙控器',
  guideLinkFord: '{name} 的 2013 F-150 遙控器',
  guideLinkCrv4: '{name} 的 2014–2016 CR-V 鑰匙',
  guideLinkCrv2: '{name} 的 2012 CR-V 鑰匙',
  guideStock: '2026 年 11 月 19 日依商品 JSON 或 JSON-LD 查閱，含 priceCurrency。Car and Truck Remotes 與 Tom\'s Key 是 USD 且有貨。Keys4Less 是 USD 且缺貨。NorthCoast Keyless 是 USD 且缺貨。Standard Auto Part 的 USD 報價有貨；CAD 價格不顯示。庫存和價格會變。本指南不為賣家評分。',
  aboutTitle: '關於 Key Ledger',
  aboutDescription: 'Key Ledger 如何研究鑰匙編程：每輛車一個檔案，每項事實都有網址與查閱日，不編造價格或評論。',
  aboutKicker: '關於',
  aboutH1: '這是一本帳冊，不是評論站。',
  aboutP1: 'Key Ledger 是給在美國需要更換遙控器、摺疊鑰匙、遙控頭鑰匙或智慧鑰匙的人用的靜態目錄。每輛車是一個 YAML 檔，網站只是把檔案印出來。沒有資料庫，也不會為了填空而發明事實。',
  aboutH2Source: '什麼算得出處',
  aboutSource: '出處是在指名日期打開的公開頁面：設備認證、車主手冊、維修程序，或零售商商品頁。本站的 FCC ID 若來自 FCCID.io 轉載的認證頁，車輛頁會寫明。只出現在賣家頁上的零件號會標成賣家所列。價格是該商品資料當天的數字。庫存取自商品 JSON 或 JSON-LD 的 availability，不是主題裡的 Sold out 標籤。',
  aboutH2Wont: '本站不會刊登的東西',
  aboutWont1: '星等、見證，或「顧客說」這類句子。',
  aboutWont2: '我們無法連結到出處的經銷商或鎖匠價格。',
  aboutWont3: '我們找到的程序需要診斷工具時，仍寫成車上按鍵步驟。',
  aboutWont4: '兩個出處的時間不一致時，把它們揉成一套。不一致會留在頁面上。',
  aboutWarning: '編程步驟都包含一則警告：順序錯了可能得找鎖匠。每個車輛檔都必須有這則警告。',
  aboutH2Coverage: '收錄範圍',
  aboutCoverage1: '第一批檔案是 2003–2006 Chevrolet Silverado 1500、2011–2014 Ford F-150，以及 2012–2016 Honda CR-V。下一輛車是新增一個檔案，做法寫在 README。',
  aboutFcc: 'FCC ID 索引',
  aboutCoverage2: '會依這些檔案重新產生。',
  aboutShop: '商店連結已預留聯盟參數，目前都是空的。',
  aboutDiscLink: '閱讀揭露',
  discTitle: '聯盟行銷揭露',
  discDescription: 'Key Ledger 的聯盟行銷揭露。零售商連結集中在一個設定檔。加入計畫之前，聯盟參數是空的。',
  discKicker: '揭露',
  discH1: '商店連結怎麼運作。',
  discLive: '設定裡至少有一個零售商已填入聯盟參數。經由那些連結購買，本站可能獲得佣金。佣金不會提高你付的價格。',
  discEmpty: '目前還沒有接上任何聯盟計畫。設定裡的聯盟參數都是空字串，所以商店連結是一般網址，本站不會從中獲得佣金。',
  discConfig: '每個零售商的參數都在 src/config/affiliates.json。車輛檔只存商品網址。填入查詢字串（例如 Amazon 的 tag）後，下次建置就會套用到該零售商的每個連結。不要在設定裡加上開頭的 ? 或 &。網站會自己接上正確的分隔符。',
  discSponsored: '有參數時，那些連結會標成 rel="sponsored"。研究頁的價格和「尚未查證」不會因為填了參數而改變。我們不為這些商店評分。',
  discH2: '設定中的零售商',
  discSet: '已設定參數',
  discUnset: '參數為空',
  discOther: '其他網站是當作出處引用，包括 FCCID.io、Ford、Kelley Blue Book，以及不在這份清單上的賣家。那些引用不經過聯盟設定。',
  notFoundTitle: '找不到頁面',
  notFoundDescription: 'Key Ledger 裡沒有這個頁面。',
  notFoundH1: '這輛車還沒有收進帳冊。',
  notFoundBefore: '目錄只列出已經研究過的檔案。可依',
  notFoundBrowse: '廠牌瀏覽',
  notFoundMid: '，或查詢已建檔的',
  notFoundFcc: 'FCC ID',
  notFoundAfter: '。',
});

function overlay(code: string): Messages {
  const add = (extra as Record<string, Partial<Messages>>)[code] ?? {};
  return { ...en, ...add };
}

export const messages: Record<LocaleCode, Messages> = {
  en,
  'zh-hant': zhHant,
  'zh-hans': overlay('zh-hans'),
  ja: overlay('ja'),
  ko: overlay('ko'),
  es: overlay('es'),
  'pt-br': overlay('pt-br'),
  de: overlay('de'),
  fr: overlay('fr'),
};

export function t(locale: string): Messages {
  return messages[(locale as LocaleCode) in messages ? (locale as LocaleCode) : defaultLocale];
}

export function fill(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(vars[key] ?? ''));
}
