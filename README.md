# TimeKeep-extension 

## お知らせ
この拡張機能は作りかけです。そのため、多くのバグを含んでいます。もし、バグを発見された方は、[こちら](https://github.com/tou-rou2/TimeKeep-extension/issues/2)にお願いします。

## 対応ブラウザ 
google chrome 

## 現在のバージョン 
1.1.4

## 使い方 
1. この拡張機能の導入方法 
    1. このファイルをパソコンにダウンロードする  
    (codeボタンから圧縮ファイルをダウンロード可)
    3. [拡張機能](chrome://extension)ページにアクセスして、「デベロッパーモード」をオンにする 
    4. 「パッケージ化されていない拡張機能を読み込む」をクリックし、このファイルを選択する 
1. 拡張機能内の設定について 
    1. 時刻設定  
    制限の開始時刻と終了時刻を設定することができる機能。制限時間でホワイトリスト(後述)に載っていないサイトにアクセスしようとすると内容が表示されなくなる。 
    3. サイト設定  
    制限時間内でもアクセスできるページを設定する「ホワイトリスト」と制限時間外でもアクセスできない「ブラックリスト」が設定できる。


## バージョン情報
|バージョン|公開/更新日|内容|
|:-:|:-:|:-:|
|1.0.0|2022/10/25||
|1.1.0|2022/12/11|<ul><li>制限時間外の動作変更(about:blankに移動から内容のみが表示されないように)<li>設定変更時の動作変更(変更時に必要のあるページを再読み込みをするように)<li>時間延長の追加<li>変更の反映が遅い問題の修正</ul>|
|1.1.1|2022/12/11|<ul><li>バグ修正</ul>|
|1.1.2|2022/12/22|<ul><li>バグ修正</ul>|
|1.1.3|2022/12/22|<ul><li>バグ修正</ul>|
|1.1.4|2023/11/13|<ul><li>時間延長機能がうまく動作しない問題を修正</ul>|
|1.1.5|2023/11/14|<ul><li>細かいバグ修正</ul>|
|1.2.0|2023/11/29|<ul><li>時間による制限に有効化スイッチを追加<li>すべての設定をリセットするボタンを追加</ul>|

## 今後追加を検討中の機能 
- ブラックリスト内のページの使用時間による制限導入 
- 制限可能な時間帯を複数作ることができるようにする 
- UIの改善
