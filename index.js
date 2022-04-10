//Подключаем библиотеку для чтения переменных из файла .env (Токен, ГИС ЖКХ)
require('dotenv').config();
//хз
const path = require('path');
//Подключаем библиотеку для работы с Телеграм ботом в js
const { Telegraf } = require('telegraf');
//Подключаем библиотеку для работы с ссылками http js (API ГИС ЖКХ)
const axios = require('axios');
//Подключаем модуль Node.JS util.inspect() для красивого вывода json-массива
const util = require('util');
//Подключаем токен
const {TELEGRAM_BOT_TOKEN} = process.env
//Создаем бота Телеграм
const bot = new Telegraf(process.env.BOT_TOKEN);

//команда start
bot.start((ctx) =>{
  //Вывод "hello"
  ctx.reply('Здравствуйте! 🙂 Вас приветствует чат-бот "Калькулятор субсидии".  Данный расчет носит информативный характер. По вопросам окончательного решения необходимо обратиться в управление социальной поддержки населения по месту жительства.');
  ctx.reply('Для начала опроса используйте команду /subsidy.');
})

//команда subsidy
bot.command('subsidy', (ctx)=>{
  //Вывод "subsidy its true"
  ctx.reply('Выберите муниципальный район или городской округ:',
  {
      reply_markup:{
          inline_keyboard: [
              [{text:'Муниципальный район', callback_data:'mn'}],
              [{text:'Городской округ', callback_data:'gr'}],  
          ]
      }
  });
});

//обработка выбранной кнопки 'Муниципальный район'
bot.action('mn', (ctx) =>{
  ctx.deleteMessage();
  ctx.reply('Выберите муниципальный район:',
  {
      reply_markup:{
          inline_keyboard: [
              [{text:'Назад в меню', callback_data:'go-back'}],
              [{text:'Алтайский муниципальный район', callback_data:'al'}],
              [{text:'Аскизский муниципальный район', callback_data:'as'}], 
              [{text:'Бейский муниципальный район', callback_data:'be'}],   
              [{text:'Боградский муниципальный район', callback_data:'bo'}],
              [{text:'Орджоникидзевский муниципальный район', callback_data:'or'}],
              [{text:'Таштыпский муниципальный район', callback_data:'ta'}],
              [{text:'Усть-Абаканский муниципальный район', callback_data:'ya'}],
              [{text:'Ширинский муниципальный район', callback_data:'sr'}],
          ]
      }
  });
})

const city_id = {
  Abakan: '95701000',
  Abaza: '95702000',
  Sayanogorsk: '95708000',
  Sorsk: '95709000',
  Chernogorsk: '95715000',
}

//обработка выбранной кнопки 'Городской округ'
bot.action('gr', (ctx) =>{
  ctx.deleteMessage();
  ctx.reply('Выберите городской округ:',
  {
      reply_markup:{
          inline_keyboard: [
              [{text:'Назад в меню', callback_data:'go-back'}],
              [{text:'город Абакан', callback_data:'Abakan'}],
              [{text:'город Абаза', callback_data:'Abaza'}],
              [{text:'город Саяногорск', callback_data:'Sayanogorsk'}], 
              [{text:'город Сорск', callback_data:'Sorsk'}],
              [{text:'город Черногорск', callback_data:'Chernogorsk'}],
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
          ]
      }
  });
})

//Post запрос
const search = async (code) => {
 
  try{
    url = 'https://dom.gosuslugi.ru/tariff/api/rest/services/public-standards/search'// API ссылка
    const response = await axios.post(url, {
      allOktmoLevels: false,
      elementsPerPage: 21, // Страницы сколько показать
      fetchAnnulled: false,
      kinds: [
        "COST"
      ],
      oktmoCodes: [
        code
      ],
      pageIndex: 1,
      tariffEntityType: "public_standarts",
      types: ["REGIONAL", "MUNICIPAL"],
    });


    // return util.inspect(searchDataArr.filter(item => item.familiesNumber.number === 4), null, 2);
    //Массив 'search' отфильтрованный
    searchDataArr = response.data.items
    filterSearchDataArr = searchDataArr.filter(item=> item.seasonalityType.name === "В отопительный период" && item.familiesNumber.number === 5);
    cases = filterSearchDataArr[0];

    // dataArr = filterSearchDataArr.map(el => ({...el, rates: el.rates.map(r => r.diffCriteria )}));

    return (cases);

  } catch (e){
    console.error(e);
  }
};

Object.keys(city_id).forEach(city => {
  bot.action(city, async ctx =>{
    const data = await search(city_id[city])
    get_data = data.rates[0];
    calc = get_data.value + 1000;
    console.log(calc);
  })
})


//Запуск бота
bot.launch();

// Вывести result
// const writeResult = async () => {
//   const result = await search();
  
//   console.log(result);
// }

// Вызов writeResult
// writeResult()