//проверка первый коммит
require('dotenv').config();
//Подключаем библиотеку для работы с Телеграм ботом в js
const { Telegraf } = require('telegraf');
//Подключаем библиотеку для работы с http js
const axios = require('axios');
//Подключаем модуль Node.JS util.inspect() для красивого вывода
const util = require('util');
//Подключаем токен
const {TELEGRAM_BOT_TOKEN} = process.env
//Создаем бота Телеграм
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

//команда start
bot.start((ctx) =>{
  //Вывод "hello"
  ctx.reply('hello');
})

//Post запрос
const search = async () => {
  try{
    url = 'https://dom.gosuslugi.ru/tariff/api/rest/services/public-standards/search'
    const response = await axios.post(url, {
      allOktmoLevels: false,
      elementsPerPage: 10,
      fetchAnnulled: false,
      kinds: [
        "COST"
      ],
      oktmoCodes: [
        "95701000"
      ],
      pageIndex: 1,
      tariffEntityType: "public_standarts",
      types: ["REGIONAL", "MUNICIPAL"],
    });
    // return util.inspect(searchDataArr.filter(item => item.familiesNumber.number === 5), null, 2);
    //Массив 'search'
    searchDataArr = response.data.items
    filterSearchDataArr = searchDataArr.filter(item => item.familiesNumber.number === 5);

    return (filterSearchDataArr);

  } catch (e){
    console.error(e);
  }
};

//Запуск бота
bot.launch();

// Вывести result
const writeResult = async () => {
  const result = await search();
  
  console.log(result);
}

// Вызов writeResult
writeResult();
