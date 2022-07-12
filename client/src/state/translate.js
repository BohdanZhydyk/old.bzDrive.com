
export const nrErrToTxt = (lang = 'en', nr)=>{
  switch(nr){
    case 1:
      if(lang === 'en'){ return `this field cannot be empty!` }
      if(lang === 'ua'){ return `це поле не може бути пустим!` }
      if(lang === 'pl'){ return `to pole nie może być puste!` }
      if(lang === 'ru'){ return `это поле не может быть пустым!` }
      break
    case 2:
      if(lang === 'en'){ return `must conclude numbers 0-9 and letters of A-Z of a-z!` }
      if(lang === 'ua'){ return `мусить містити цифри 0-9 і літери A-Z a-z!` }
      if(lang === 'pl'){ return `musi zawierać cyfry 0-9 i litery A-Z a-z!` }
      if(lang === 'ru'){ return `должен содержать цифры 0-9 и буквы A-Z a-z!` }
      break
    case 3:
      if(lang === 'en'){ return `must contain from 4 to 8 symbols!` }
      if(lang === 'ua'){ return `повинен містити від 4 до 8 символів!` }
      if(lang === 'pl'){ return `musi zawierać od 4 do 8 symboli!` }
      if(lang === 'ru'){ return `должен содержать од 4 до 8 символов!` }
      break
    case 4:
      if(lang === 'en'){ return `must contain from 8 to 16 symbols!` }
      if(lang === 'ua'){ return `повинен містити від 8 до 16 символів!` }
      if(lang === 'pl'){ return `musi zawierać od 8 do 16 symboli!` }
      if(lang === 'ru'){ return `должен содержать од 8 до 16 символов!` }
      break
    case 5:
      if(lang === 'en'){ return `wrong e-mail is entered!` }
      if(lang === 'ua'){ return `введено неправильний e-mail!` }
      if(lang === 'pl'){ return `wprowadzono nieprawidłowy e-mail!` }
      if(lang === 'ru'){ return `введен неправильный e-mail!` }
      break
    case 6:
      if(lang === 'en'){ return `must conclude numbers 0-9!` }
      if(lang === 'ua'){ return `мусить містити цифри 0-9!` }
      if(lang === 'pl'){ return `musi zawierać cyfry 0-9!` }
      if(lang === 'ru'){ return `должен содержать цифры 0-9!` }
      break
    case 7:
      if(lang === 'en'){ return `must contain 9 symbols!` }
      if(lang === 'ua'){ return `повинен містити 9 символів!` }
      if(lang === 'pl'){ return `musi zawierać od 9 symboli!` }
      if(lang === 'ru'){ return `должен содержать 9 символов!` }
      break
    case 8:
      if(lang === 'en'){ return `such user is not present in a database!` }
      if(lang === 'ua'){ return `такого юзера немає у базі даних!` }
      if(lang === 'pl'){ return `takiego użytkownika nie ma w bazie danych!` }
      if(lang === 'ru'){ return `такого юзера нету в базе данных!` }
      break
    case 9:
      if(lang === 'en'){ return `a wrong password is entered!` }
      if(lang === 'ua'){ return `введено неправильний пароль!` }
      if(lang === 'pl'){ return `wprowadzone nieprawidlowe hasło!` }
      if(lang === 'ru'){ return `введен неправильный пароль!` }
      break
    case 10:
      if(lang === 'en'){ return `such user is already in the database!` }
      if(lang === 'ua'){ return `такий юзер вже є у базі даних!` }
      if(lang === 'pl'){ return `taki użytkownik jest już w bazie danych!` }
      if(lang === 'ru'){ return `такой юзер уже находится в базе данных!` }
      break
    case 11:
      if(lang === 'en'){ return `such e-mail is already in the database!` }
      if(lang === 'ua'){ return `такий e-mail вже є у базі даних!` }
      if(lang === 'pl'){ return `taki e-mail jest już w bazie danych!` }
      if(lang === 'ru'){ return `такой e-mail уже находится в базе данных!` }
      break
    case 12:
      if(lang === 'en'){ return `passwords are empty or non-identical!` }
      if(lang === 'ua'){ return `паролі пусті або неідентичні!` }
      if(lang === 'pl'){ return `hasła są puste lub nieidentyczne!` }
      if(lang === 'ru'){ return `пароли пусты или неидентичны!` }
      break
    case 13:
      if(lang === 'en'){ return `invalid verification code!` }
      if(lang === 'ua'){ return `невірний код підтвердження!` }
      if(lang === 'pl'){ return `nieprawidłowy kod weryfikacyjny!` }
      if(lang === 'ru'){ return `неверный код подтверждения!` }
      break
    default: break
  }
}

export const translate = (lang = 'en', txt)=>{
  switch(txt){
    case "Workshop":
      if(lang === 'en'){ return `Workshop` }
      if(lang === 'ua'){ return `Майстерня` }
      if(lang === 'pl'){ return `Warsztat` }
      if(lang === 'ru'){ return `Мастерская` }
      break
    case "News":
      if(lang === 'en'){ return `News` }
      if(lang === 'ua'){ return `Новини` }
      if(lang === 'pl'){ return `Aktualności` }
      if(lang === 'ru'){ return `Новости` }
      break
    case "Apps":
      if(lang === 'en'){ return `Apps` }
      if(lang === 'ua'){ return `Додатки` }
      if(lang === 'pl'){ return `Aplikacje` }
      if(lang === 'ru'){ return `Приложения` }
      break
    case "bzStore":
      if(lang === 'en'){ return `bzStore` }
      if(lang === 'ua'){ return `bzМагазин` }
      if(lang === 'pl'){ return `bzSklep` }
      if(lang === 'ru'){ return `bzМагазин` }
      break
    case "CV":
      if(lang === 'en'){ return `CV` }
      if(lang === 'ua'){ return `Резюме` }
      if(lang === 'pl'){ return `CV` }
      if(lang === 'ru'){ return `Резюме` }
      break
    case "Unsplash":
      if(lang === 'en'){ return `Unsplash` }
      if(lang === 'ua'){ return `Unsplash` }
      if(lang === 'pl'){ return `Unsplash` }
      if(lang === 'ru'){ return `Unsplash` }
      break
    case "Statistic":
      if(lang === 'en'){ return `Statistic` }
      if(lang === 'ua'){ return `Статистика` }
      if(lang === 'pl'){ return `Statystyka` }
      if(lang === 'ru'){ return `Статистика` }
      break
    case "Traffic":
      if(lang === 'en'){ return `Statistic` }
      if(lang === 'ua'){ return `Трафік` }
      if(lang === 'pl'){ return `Trafik` }
      if(lang === 'ru'){ return `Трафик` }
      break
    case "Finances":
      if(lang === 'en'){ return `Finances` }
      if(lang === 'ua'){ return `Фінанси` }
      if(lang === 'pl'){ return `Finanse` }
      if(lang === 'ru'){ return `Финансы` }
      break
    case "Office":
      if(lang === 'en'){ return `Office` }
      if(lang === 'ua'){ return `Офіс` }
      if(lang === 'pl'){ return `Biuro` }
      if(lang === 'ru'){ return `Офис` }
      break
    case "ZL":
      if(lang === 'en'){ return `Orders` }
      if(lang === 'ua'){ return `Замовлення` }
      if(lang === 'pl'){ return `Zlecenia` }
      if(lang === 'ru'){ return `Заказы` }
      break
    case "FS":
      if(lang === 'en'){ return `Invoices` }
      if(lang === 'ua'){ return `Рахунки` }
      if(lang === 'pl'){ return `Faktury` }
      if(lang === 'ru'){ return `Cчета` }
      break
    case "FZ":
      if(lang === 'en'){ return `Buy` }
      if(lang === 'ua'){ return `Купівля` }
      if(lang === 'pl'){ return `Zakup` }
      if(lang === 'ru'){ return `Покупка` }
      break
    case "SP":
      if(lang === 'en'){ return `Sellers` }
      if(lang === 'ua'){ return `Продавці` }
      if(lang === 'pl'){ return `Sprzedawcy` }
      if(lang === 'ru'){ return `Продавцы` }
      break
    case "KL":
      if(lang === 'en'){ return `Customers` }
      if(lang === 'ua'){ return `Клієнти` }
      if(lang === 'pl'){ return `Klienci` }
      if(lang === 'ru'){ return `Клиенты` }
      break
    case "TO":
      if(lang === 'en'){ return `Warehouse` }
      if(lang === 'ua'){ return `Склад` }
      if(lang === 'pl'){ return `Magazyn` }
      if(lang === 'ru'){ return `Склад` }
      break
    case "Profile":
      if(lang === 'en'){ return `Profile` }
      if(lang === 'ua'){ return `Профіль` }
      if(lang === 'pl'){ return `Profil` }
      if(lang === 'ru'){ return `Профиль` }
      break
    case "loginInput":
      if(lang === 'en'){ return `login` }
      if(lang === 'ua'){ return `логін` }
      if(lang === 'pl'){ return `login` }
      if(lang === 'ru'){ return `логин` }
      break
    case "emailInput":
      if(lang === 'en'){ return `e-mail` }
      if(lang === 'ua'){ return `e-mail` }
      if(lang === 'pl'){ return `e-mail` }
      if(lang === 'ru'){ return `e-mail` }
      break
    case "passInput":
      if(lang === 'en'){ return `password` }
      if(lang === 'ua'){ return `пароль` }
      if(lang === 'pl'){ return `hasło` }
      if(lang === 'ru'){ return `пароль` }
      break
    case "pass1Input":
      if(lang === 'en'){ return `password 1` }
      if(lang === 'ua'){ return `пароль 1` }
      if(lang === 'pl'){ return `hasło 1` }
      if(lang === 'ru'){ return `пароль 1` }
      break
    case "pass2Input":
      if(lang === 'en'){ return `password 2` }
      if(lang === 'ua'){ return `пароль 2` }
      if(lang === 'pl'){ return `hasło 2` }
      if(lang === 'ru'){ return `пароль 2` }
      break
    case "loginBtn":
      if(lang === 'en'){ return `Authorizing` }
      if(lang === 'ua'){ return `Авторизація` }
      if(lang === 'pl'){ return `Autoryzacja` }
      if(lang === 'ru'){ return `Авторизация` }
      break
    case "signinBtn":
      if(lang === 'en'){ return `Registration` }
      if(lang === 'ua'){ return `Реєстрація` }
      if(lang === 'pl'){ return `Rejestracja` }
      if(lang === 'ru'){ return `Регистрация` }
      break
    case "forgotBtn":
      if(lang === 'en'){ return `Password recovery` }
      if(lang === 'ua'){ return `Відновлення паролю` }
      if(lang === 'pl'){ return `Odzyskiwanie hasła` }
      if(lang === 'ru'){ return `Восстановление пароля` }
      break
    case "logoutBtn":
      if(lang === 'en'){ return `Logout` }
      if(lang === 'ua'){ return `Вийти` }
      if(lang === 'pl'){ return `Wyloguj` }
      if(lang === 'ru'){ return `Выйти` }
      break
    case "created":
      if(lang === 'en'){ return `Web site created by` }
      if(lang === 'ua'){ return `Веб-сайт створений` }
      if(lang === 'pl'){ return `Strona stworzona przez` }
      if(lang === 'ru'){ return `Веб-сайт создан` }
      break
    case "CookiesTxt":
      if(lang === 'en'){ return `Website uses cookies` }
      if(lang === 'ua'){ return `Веб-сайт використовує файли cookie` }
      if(lang === 'pl'){ return `Strona korzysta z plików cookies` }
      if(lang === 'ru'){ return `Веб-сайт использует файлы cookie` }
      break
    case "CookiesLink":
      if(lang === 'en'){ return `More information` }
      if(lang === 'ua'){ return `Більше інформації` }
      if(lang === 'pl'){ return `Więcej informacji` }
      if(lang === 'ru'){ return `Больше информации` }
      break
    case "CookiesBtn":
      if(lang === 'en'){ return `Accept` }
      if(lang === 'ua'){ return `Приймаю` }
      if(lang === 'pl'){ return `Akceptuję` }
      if(lang === 'ru'){ return `Принимаю` }
      break
    case "DayNames":
      if(lang === 'en'){ return ['mo','tu','we','th','fr','sa','su'] }
      if(lang === 'ua'){ return ['пн','вт','ср','чт','пт','сб','нд'] }
      if(lang === 'pl'){ return ['po','wt','śr','cz','pi','so','ni'] }
      if(lang === 'ru'){ return ['пн','вт','ср','чт','пт','сб','нд'] }
      break
    case "MonthNames":
      if(lang === 'en'){ return ['jan','feb','mar','apr','maj','jun','jul','aug','sep','oct','nov','dec'] }
      if(lang === 'ua'){ return ['січ','лют','бер','кві','тра','чер','лип','сер','вер','жов','лис','гру'] }
      if(lang === 'pl'){ return ['sty','lut','mrz','kwi','maj','cze','lip','sie','wrz','paź','lis','gru'] }
      if(lang === 'ru'){ return ['янв','фев','мар','апр','май','июн','июл','авг','сен','окт','ноя','дек'] }
      break
    default: break
  }
}