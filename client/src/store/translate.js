
export const nrErrToTxt = (lang, nr, min=false, max=false)=>{
  switch(nr){
    case 0:
      if(lang === 'en'){ return `wrong e-mail is entered!` }
      if(lang === 'ua'){ return `введено неправильний e-mail!` }
      if(lang === 'pl'){ return `wprowadzono nieprawidłowy e-mail!` }
      if(lang === 'ru'){ return `введен неправильный e-mail!` }
      break
    case 1:
      if(lang === 'en'){ return `must conclude numbers 0-9 and letters of A-Z of a-z!` }
      if(lang === 'ua'){ return `мусить містити цифри 0-9 і літери A-Z a-z!` }
      if(lang === 'pl'){ return `musi zawierać cyfry 0-9 i litery A-Z a-z!` }
      if(lang === 'ru'){ return `должен содержать цифры 0-9 и буквы A-Z a-z!` }
      break
    case 2:
      if(lang === 'en'){ return `must contain from ${min} to ${max} symbols!` }
      if(lang === 'ua'){ return `повинен містити від ${min} до ${max} символів!` }
      if(lang === 'pl'){ return `musi zawierać od ${min} do ${max} symboli!` }
      if(lang === 'ru'){ return `должен содержать од ${min} до ${max} символов!` }
      break
    case 3:
      if(lang === 'en'){ return `fill this field!` }
      if(lang === 'ua'){ return `заповни дане поле!` }
      if(lang === 'pl'){ return `wypełnij dane pole!` }
      if(lang === 'ru'){ return `заполни данное поле!` }
      break
    case 4:
      if(lang === 'en'){ return `such user is not present in a database!` }
      if(lang === 'ua'){ return `такого юзера немає у базі даних!` }
      if(lang === 'pl'){ return `takiego użytkownika nie ma w bazie danych!` }
      if(lang === 'ru'){ return `такого юзера нету в базе данных!` }
      break
    case 5:
      if(lang === 'en'){ return `a wrong password is entered!` }
      if(lang === 'ua'){ return `введено неправильний пароль!` }
      if(lang === 'pl'){ return `wprowadzone nieprawidlowe haslo!` }
      if(lang === 'ru'){ return `введен неправильный пароль!` }
      break
    default: break
  }
}

export const translate = (lang, txt)=>{
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
    case "Statistic":
      if(lang === 'en'){ return `Statistic` }
      if(lang === 'ua'){ return `Статистика` }
      if(lang === 'pl'){ return `Statystyka` }
      if(lang === 'ru'){ return `Статистика` }
      break
    case "CV":
      if(lang === 'en'){ return `CV` }
      if(lang === 'ua'){ return `Резюме` }
      if(lang === 'pl'){ return `CV` }
      if(lang === 'ru'){ return `Резюме` }
      break
    case "Office":
      if(lang === 'en'){ return `Office` }
      if(lang === 'ua'){ return `Офіс` }
      if(lang === 'pl'){ return `Biuro` }
      if(lang === 'ru'){ return `Офис` }
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
      if(lang === 'en'){ return `password` }
      if(lang === 'ua'){ return `пароль` }
      if(lang === 'pl'){ return `hasło` }
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
      if(lang === 'en'){ return `Renewal` }
      if(lang === 'ua'){ return `Відновлення` }
      if(lang === 'pl'){ return `Wznowienie` }
      if(lang === 'ru'){ return `Возобновление` }
      break
    default: break
  }
}