У каждого уважающегося себя айтишника и не только должен быть свой персональный сайт, где говорится о его навыках, где можно с ним связаться, почитать его блог или посмотреть портфолио. И я не стал исключением. Я сделал свой персональынй сайт! Но на этот раз в качестве бэка выступал не firebase, а Node Js! То есть, на нем присутствует самая что ни на есть настоящая база данных. Эта база данных включает в себя регистрацию и все аккаунты, которые были зарегестрированны, посты с блога и комментарии (Подробнее об этом всем ниже). Как вы уже поняли, на моем личном сайте присутствует блог, куда я буду выкладывать свои работы и говорить о них, мое портфолио и т.д.

Чему я научился, при создании этого сайта

1. При создании сайта я научился работать с backend и frontend. Получается, это мое первое fullstack приложение! В качестве бэкэнда выступает Node js, а в качестве базы данных - MongoDB.
   В бэкэнде хранятся аккаунты, посты с блога и комментарии к этим постам.

2. Немного научился взаимодействовать с React Redux, что бы получать и передовать данные с фронтэнда на бэнэнд и наоборот. С каждой новой работой мои навыки взаимодействия с React Redux будут становится только лучше конечно же)

//Теперь подробнее про регистрацию, посты и комментарии.\\

3. Сначало я начал разрабатывать регистрацию на бэк энде, а потом уже на фронтэнде. Для хранения введенных пользователем данных выступает MongoDB. При каждой регистрации и при каждом входе в аккаунт выдется специальный токен, в котором хранится id пользователя. Этот token записывается в localStorage, а дальше уже передается на бэкэнд, где он расшифровывается и позволяет понять, существует ли такой пользователя, и если существует, то входим в аккаунт, если нет, то сообщаем ему об этом. Так же, при регистрации каждый пароль хэшируется (шифруется), дабы, если произойдет слив данных, все пароли не попали в открытую сеть. Это правильная практика с точки зрения безопасности и ее необходимо использовать всегда, даже в небольших приложениях.

Были проблемы с сохранением аватарки через библиотеку react hook form, пришлось переписать код на обыные useState'ы. Затем были проблемы с размером файла. Дело в том, что он попросту не давал зарегестрироваться, если картинка весит пару Килобайт. Пришлось капаться в интернете и искать решение, и... я его нашел! Но оно было не оптимально, т.к. если пользователь передаст большое изображение, то оно будет очень долго подгружаться и будет тормозить систему. Я сделал загрузку файлов на бэкэнд. Клиентская часть отправляет файл, а на бэкэнде он уже обрабатывается и сохраняется в папку, а клиент получает путь к этому самому файлу.

4. Вход в аккаунт осуществляется путем вписывние своего email'а и пароля. Далее на фронтенде все введенные данные пользователя отправляются на бэкэнд и там уже сверяются, если такой пользователь существует и пароль введен верно, то он авторизовывается. Если какие-либо данные введены неверно, то возвращается ошибка.

5. Получение пользователя при каждой перезагрузки страницы. Если пользователь не был найден, то мы получаем на старнице с аккаунтом сообщение о том, что мы не авторизованны.

6. На странице Blog был оформлен вывод всех статей вместе с пагинацией, что бы не загромождать страницу. Так же, была сделана функция создания поста. При создании поста есть возможность добавить картинку, заголовок, текст, теги и тематику. Так же оформил маркдаун эдитор при создании поста. Функция создания постов доступна только админу (мне), и другие пользователи не могут создавать посты, только комментировать его

7. Кстати о комментариях! Я оформил комментарии, но при создании комменатрия появляется баг в виде undefined в имени и фамилии. Это связано с тем, что пользователь не рыскрывается по id, а раскрывается он только в том случае, если перезагрузить страницу. Надеюсь я через какое-то время сумею найти решения пофиксить эту проблему. А пока довольствуемся костыльным методом в виде проверки на тип значения в ключе

8. При создании поста у него появляется развернутая версия, то всем текстом и комментариями. При заходе на полную страницу поста увеличивается счетчик просмотров. Это очень классная фишка всего раздела Blog!

9. Сделал возможность удалять статьи! Кликая на кнопку удаления статьи, мы передаем редаксу id этой статьи, а редакс в свою очередь передает полученный id бэкэнду на удаления статьи, и тот удаляет :)

10. Получилось сделать что-то похожее на посты, но это уже проекты. У них есть заголовок, текст, ссылка на гитхаб репозиторий и список технологий, которые использовались при создании этого проекта. Так же я сделал возможность ставить звезды на каждый из проектов Так же, как и для статей, я сделал возможность редактировать проект, изменяя его значения, а так же возможность удалять проект. Теперь поподробнее про звезды (что-то типо лайков). Я старался сделать систему уникального лайка на бэкэнде. Но у меня ничего не удалось :( Поэтому я оформил это на фронтенде. Сначало мы смотрим, нету ли пользовательского id в списке лайкнувших. Затем, если нету, то позволяем ему лайкать. Если есть, то дизлайкать. Минус этого метода состоит в том, что мы не обновляем значение сразу, а только после перезагрузки страницы. Я пытался сделать зависимость для useEffect, что бы он рендерил проект каждый раз, когда они изменялись, но тогда они вообще не рендерятся на странице. Ктому же, вы можете заспамит лайками не обновляя страницу, на бэкэнд это все передастся и будет куча одинаковых элементов. На фронте я это поправил путем удалением одинаковых значений. В общем, метод костыльный, но рабочий.
    P.S. До меня доперло, что можно обновлять значения каждый раз, когда кликаешь, путем вешанья функции dispatch непосредственно на функцию клика (функцию, лайкает или дизлайкает)

Так же сделал возможность выводить проект в топ. Смотря, сколько у него лайков. Пришлось немного порыскать в интернете, то благо я нашел способ так сделать.

Кстати говоря, в этом проекте я так же использовал модульную систему стилей.
Мне показалось странным делать весь сайт на одних дивах, и поэтому я начал использовать структуру html (использовать section, main, article и т.д.)

Для станицы с блогом оформил на этот раз нормальную пагинацию

Страница с личным аккаунтом получилась скудной, на ней представлены только аватарка, имя, фамилия и почта. Но большего и ненадо

На главной старнице оформил плавную анимафию градиент-текста, что бы сайт не казался статиным.

К сожалению, что бы читать почты и получать проекты, а так же писать комментарии, нужно включить впн. Потому что база данных не работает в России

Если найдете какие-либо баги в работе сайта или недоработки, то просьба написась мне об этом