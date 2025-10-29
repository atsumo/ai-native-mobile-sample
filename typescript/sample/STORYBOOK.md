# Storybook for React Native

このプロジェクトにReact Native Storybookを導入しました。

## セットアップ内容

### インストールしたパッケージ
- `@storybook/react-native`
- `@storybook/addon-ondevice-controls`
- `@storybook/addon-ondevice-actions`
- `@storybook/addon-ondevice-backgrounds`

### 設定ファイル
- `.rnstorybook/main.ts` - Storybookのメイン設定
- `.rnstorybook/index.tsx` - StorybookのUIコンポーネント
- `.rnstorybook/preview.tsx` - グローバルデコレーターとパラメータ
- `.rnstorybook/storybook.requires.ts` - Storybook設定の読み込み

### Metro設定
`metro.config.js`にStorybookのラッパーを追加しました。これにより、Metroバンドラーがストーリーファイルを動的にインポートできるようになります。

## 使用方法

### Storybookにアクセス
開発モードでアプリを起動すると、画面上に**オレンジ色の虫アイコン（🐛）のフローティングボタン**が表示されます。

**フローティングデバッグボタンの使い方**:
1. **ボタンの移動**: ボタンをドラッグして好きな位置に移動できます
   - 離すと自動的に画面の端にスナップします
2. **デバッグメニューを開く**: ボタンをタップするとデバッグメニューが表示されます
3. **Storybookを開く**: メニューから「📚 Storybook」を選択

**デバッグメニューの機能**:
- **📚 Storybook**: コンポーネントカタログを開く
- **🗑️ ストレージをクリア**: AsyncStorageの全データを削除
- **ℹ️ アプリ情報**: 開発モード、プラットフォームなどの情報を表示

**注意**:
- フローティングボタンは`__DEV__`環境でのみ表示されます
- 本番ビルドでは表示されません
- ボタンは常に最前面に表示され、すべての画面からアクセス可能です

### ストーリーの作成
ストーリーファイルは`components/**/*.stories.tsx`パターンで検出されます。

#### 例：
```tsx
import type { Meta, StoryObj } from '@storybook/react-native';
import { MyComponent } from './MyComponent';

const meta = {
  title: 'MyComponent',
  component: MyComponent,
} satisfies Meta<typeof MyComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // コンポーネントのprops
  },
};
```

### 既存のストーリー
以下のストーリーファイルが作成されています：
- `components/TodoItem.stories.tsx` - TodoItemコンポーネントのストーリー（5つのバリエーション）
- `components/TodoInput.stories.tsx` - TodoInputコンポーネントのストーリー

### アドオン
以下のオンデバイスアドオンが利用可能です：
- **Controls** - コンポーネントのpropsをインタラクティブに変更
- **Actions** - イベントハンドラーのログを表示
- **Backgrounds** - 背景色を変更してコンポーネントを確認

## 開発ワークフロー
1. コンポーネントを開発
2. `.stories.tsx`ファイルを作成
3. アプリを起動：`npm start`
4. `/storybook`ルートに移動
5. Storybookで各種バリエーションを確認

## 参考リンク
- [Storybook for React Native](https://github.com/storybookjs/react-native)
- [Storybook Documentation](https://storybook.js.org/docs/react-native/get-started/introduction)
