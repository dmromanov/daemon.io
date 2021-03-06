### resolver # Маршрутизация

Получая запросы демон первым делом должен определить какому приложению он&#160;должен передать обработку.
Для этого служит обработчик запросов [AppResolver](https://github.com/kakserpom/phpdaemon/blob/master/PHPDaemon/Core/AppResolver.php).

Вы&#160;можете определить свой обработчик или использовать пример `:p`[./conf/AppResolver.php](https://github.com/kakserpom/phpdaemon/blob/master/conf/AppResolver.php)`.
Название файла должно совпадать с названием класса обработчика.
Правила описываются в методе `getRequestRoute`.
Он принимает два аргумента:

 - `$req` &#8212; объект `stdClass`, с&#160;параметрами запроса;
 - `$upstream` &#8212; объект сервера, принимающий входящие запросы, например `\PHPDaemon\Servers\HTTP\Connection`.

Результатом работы метода может быть:

 - Имя приложения;
 - `null` для попытки передать запрос приложению по-умолчанию;
 - `false` для завершения обработки запроса.

> Не&#160;забудьте указать&#160;в [конфигурационном файле](#config/variables/pathes) путь до&#160;вашего AppResolver.

В&#160;настройках [сервера](#servers/options), принимающего запросы, с&#160;помощью опции `responder` можно указать имя приложения по-умолчанию, которому будет передан запрос, если `getRequestRoute` вернул `null`.