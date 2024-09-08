# Crypto Glance

- GitHub 儲存庫連結
  - [https://github.com/TeddyLin1997/crypto-glance](https://github.com/TeddyLin1997/crypto-glance)

- 自述文件中的設定和運作說明
  -  下載至本地 `git clone https://github.com/TeddyLin1997/crypto-glance`
  -  安裝依賴套件 `yarn`
  -  本地啟動 `yarn dev`

- 簡要技術決策說明文件
  - 1.連接錢包

    支援EIP-6963多錢包，可自行選擇要使用的錢包provider，再使用`window.ethereum.request({ method: "eth_requestAccounts" })`請求錢包權限。

  - 2.顯示連接錢包中的 ERC20 代幣和 ETH（gas）餘額
    - 查詢`ERC-20`合約`balanceOf`獲得代幣餘額。
    - `provider.getBalance(address)`獲得該地址原生代幣餘額。

  - 3.實現資產美元價值的即時更新

    `AAVE Oracle`合約取得個資產美元價值，符合區塊鏈去中心化特性。

  - 4.圓餅圖顯示資產美元價值分佈

    `React-for-echarts` 計算各資產的美元價值，計算出占總資產的份額，以繪製圓餅圖。

  - 5.建立允許ERC-20清單

    給予輸入`ERC-20 Address`並將清單儲存至`Localstorage`，再迭代array請求各ERC20合約中的`name`, `symbol`, `decimals`, `balanceOf`

  - 6.轉移資產

    分為`Native Token`和`ERC-20`的transfer，依照想要傳送的類型執行相應處理。
    - NativeToken: 直接發送交易至鏈上處理。
    - ERC-20: 與`ERC-20`合約互動，使用Transfer方法。

  - 7.交易監控
    - 原生代幣監控：`provider.on('block')` 監聽block，在每次出塊後檢查餘額是否變動已更新資產狀態。
    - ERC-20: 監聽合約`Transfer Event`(ERC20標準), `from` 或 `to` 是否為該地址，獲得資產變動的消息並更新資產狀態。

  - 8.暗/亮模式切換

    透過配置`prefers-color-scheme`屬性，捕獲用戶OS使用的暗/亮色模式，使用相應的樣式。

- 應用程式部署到 Vercel
  - [https://crypto-glance-psi.vercel.app/](https://crypto-glance-psi.vercel.app/)

