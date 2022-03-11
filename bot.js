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

//команда subsidy
bot.command('subsidy', (ctx)=>{
  //Вывод "subsidy its true"
  ctx.reply('subsidy its true',
  {
      reply_markup:{
          inline_keyboard: [
              [{text:'Муниципальный район', callback_data:'mn'}],
              [{text:'Городской округ', callback_data:'gr'}],  
              [{text:'Запрос к ГИС ЖКХ', callback_data:'gis-response'}],
          ]
      }
  });
});

//обработка выбранной кнопки 'Муниципальный район'
bot.action('mn', (ctx) =>{
  ctx.deleteMessage();
  ctx.reply('Вы выбрали Муниципальный район',
  {
      reply_markup:{
          inline_keyboard: [
              [{text:'Назад', callback_data:'go-back'}],
              [{text:'Алтайский муниципальный район', callback_data:'al'}],
              [{text:'Аскизский муниципальный район', callback_data:'as'}], 
              [{text:'Бейский муниципальный район', callback_data:'be'}],   
              [{text:'Боградский муниципальный район', callback_data:'bo'}], 
          ]
      }
  });
})

//обработка выбранной кнопки 'Назад'
bot.action('go-back', (ctx) => {
  ctx.deleteMessage();
  ctx.reply('subsidy its true',
  {
      reply_markup:{
          inline_keyboard: [
              [{text:'Муниципальный район', callback_data:'mn'}],
              [{text:'Городской округ', callback_data:'gr'}],  
              [{text:'Запрос к ГИС ЖКХ', callback_data:'gis-response'}],
          ]
      }
  });
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


    // return util.inspect(searchDataArr.filter(item => item.familiesNumber.number === 4), null, 2);
    //Массив 'search'
    searchDataArr = response.data.items
    filterSearchDataArr = searchDataArr.filter(item=> item.familiesNumber.number === 2);
    // dataArr = filterSearchDataArr.map(el => ({...el, rates: el.rates.map(r => r.diffCriteria )}));

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
// writeResult()