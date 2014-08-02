### object-storage # ObjectStorage #> ObjectStorage {tpl-git PHPDaemon/Structures/ObjectStorage.php}

Данный класс наследуется от {tpl-outlink http://php.net/manual/class.splobjectstorage.php SplObjectStorage} и предоставляет хранилище объектов с несколькими дополнительными методами.

> Можно создавать классы-наследники ObjectStorage.
> Класс {tpl-inlink network/pool Network/Pool} наследуется от ObjectStorage

#### methods # Методы

 -.method ```php.inline
 integer public ObjectStorage::each ( string $method, mixed $arg, ... )
 ```
   -.n Проходит по всем объектам, вызывая у каждого из них метод `:hc`$method` c заданными аргументами `:hc`$args` и возвращает количество объектов в хранилище
   -.n.ti `:hc`$method` — вызываемый метод объекта
   -.n `:hc`$arg`, ... — аргументы

 -.method ```php.inline
 void public ObjectStorage::removeAll ( object $obj = null )
 ```
   -.n Удаляет из текущего контейнера все объекты, которых нет в контейнере `:hc`$obj`
   -.n.ti `:hc`$obj` — контейнер, содержащий элементы, которые должны остаться в текущем контейнере

 -.method ```php.inline
 object public ObjectStorage::detachFirst ( )
 ```
   -.n Возвращает первый объект, удалив его из контейнера

 -.method ```php.inline
 object public ObjectStorage::getFirst ( )
 ```
   -.n Возвращает первый объект контейнера