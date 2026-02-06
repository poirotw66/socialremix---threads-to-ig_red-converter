# SocialRemix

一個強大的 AI 驅動內容轉換工具，可將 Threads/Twitter 內容快速轉換為 Instagram 和小紅書（Xiaohongshu）風格的貼文。

## ✨ 功能特色

- 🤖 **AI 驅動轉換**：使用 Google Gemini AI 智能重寫內容，適配不同平台風格
- 📱 **多平台支援**：支援 Instagram 和小紅書兩種平台格式
- 🎨 **自動圖片生成**：自動為貼文生成配圖（需要付費 API）
- 🏷️ **智能標籤生成**：自動生成 10-15 個相關 hashtags
- 🔥 **熱門話題生成**：內建熱門話題模擬器，快速獲取靈感
- 💾 **本地儲存**：API 金鑰和資料僅儲存在本地瀏覽器，保護隱私
- ⚡ **性能優化**：使用 React Hooks 優化，流暢的使用體驗
- 🔄 **重試機制**：圖片生成失敗時可一鍵重試

## 🛠️ 技術棧

- **前端框架**：React 19 + TypeScript
- **建置工具**：Vite 6
- **AI 服務**：Google Gemini API (@google/genai)
- **樣式**：Tailwind CSS（透過 className）

## 📦 安裝與使用

### 前置需求

- Node.js（建議 18+ 版本）
- Google Gemini API Key（[取得方式](https://aistudio.google.com/apikey)）

### 安裝步驟

1. **安裝依賴套件**
   ```bash
   npm install
   ```

2. **設定 API 金鑰**
   
   有兩種方式設定 API 金鑰：
   
   **方式一：環境變數（推薦開發環境）**
   
   建立 `.env.local` 檔案（如果不存在）：
   ```bash
   VITE_GEMINI_API_KEY=your_api_key_here
   ```
   
   **方式二：應用程式內設定（推薦生產環境）**
   
   啟動應用程式後，點擊右上角的設定圖示，在設定視窗中輸入您的 Gemini API 金鑰。金鑰會儲存在瀏覽器的 localStorage 中。

3. **啟動開發伺服器**
   ```bash
   npm run dev
   ```

4. **建置生產版本**
   ```bash
   npm run build
   ```

5. **預覽生產版本**
   ```bash
   npm run preview
   ```

## 🚀 使用說明

1. **輸入來源內容**
   - 直接貼上 Threads、Twitter 或任何文字內容
   - 或使用「熱門話題模擬器」快速生成範例內容

2. **選擇目標平台**
   - **Instagram**：簡潔、美觀、價值導向的風格
   - **小紅書**：情感豐富、使用表情符號、互動性強的風格

3. **生成貼文**
   - 點擊「Generate Post」按鈕
   - AI 會自動重寫內容並生成 hashtags
   - 如果成功，會自動生成配圖（需要付費 API 計劃）

4. **複製與使用**
   - 點擊「Copy Text」複製完整貼文
   - 點擊個別 hashtag 可複製單個標籤
   - 點擊圖片下載按鈕可下載生成的圖片

## ⚙️ 配置說明

### API 金鑰優先順序

應用程式會按以下順序尋找 API 金鑰：

1. `localStorage` 中的 `gemini_api_key`（應用程式內設定）
2. 環境變數 `VITE_GEMINI_API_KEY`
3. 環境變數 `VITE_API_KEY`

### 圖片生成功能

圖片生成功能使用 Gemini 2.5 Flash Image 模型，需要：
- 付費的 Gemini API 計劃
- 正確的 API 權限設定

如果圖片生成失敗，應用程式會顯示提示訊息，但貼文內容仍可正常使用。

## 🎯 專案結構

```
socialremix---threads-to-ig_red-converter/
├── components/          # React 組件
│   ├── Header.tsx      # 頂部導航欄
│   ├── LandingPage.tsx # 首頁
│   ├── PlatformSelector.tsx # 平台選擇器
│   ├── ResultCard.tsx  # 結果顯示卡片
│   ├── SettingsModal.tsx # 設定視窗
│   └── ErrorToast.tsx  # 錯誤提示組件
├── hooks/              # 自定義 Hooks
│   └── useApiKey.ts   # API 金鑰管理 Hook
├── services/           # 服務層
│   └── geminiService.ts # Gemini API 服務
├── types.ts            # TypeScript 類型定義
├── App.tsx             # 主應用組件
└── package.json        # 專案配置
```

## 🔧 開發說明

### 代碼規範

- 使用 TypeScript 進行類型檢查
- 遵循 React Hooks 規則
- 使用 `useCallback` 和 `useMemo` 進行性能優化
- 所有註解使用英文撰寫

### 主要優化

- ✅ 提取 API 金鑰檢查邏輯為自定義 Hook
- ✅ 改進錯誤處理，使用 Toast 提示取代 alert
- ✅ 優化圖片生成函數，簡化錯誤處理
- ✅ 添加性能優化（useMemo、useCallback）
- ✅ 改進用戶體驗：添加重試機制
- ✅ 加強類型安全性和代碼結構

## 📝 授權

此專案為私有專案。

## 🤝 貢獻

歡迎提交 Issue 和 Pull Request！

## 📧 聯絡方式

如有問題或建議，請透過 GitHub Issues 聯繫。
