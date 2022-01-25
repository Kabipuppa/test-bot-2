//проверка
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

// inline keyboard
const keyboard = () => {
  return Telegraf.Extra
    .markup((m) =>
      m.inlineKeyboard([
        [
          m.callbackButton('Алтайский муниципальный район', '95605000'),
        ],
        [
          m.callbackButton('Аскизский муниципальный район', '95608000'),
        ],
        [
          m.callbackButton('Бейский муниципальный район', '95612000'),
        ],
      ])
    )
};

//При команде /start отвечает 'Hello'
bot.start((ctx) => ctx.reply('hello!'));

// слушаем
bot
  .on('message', (ctx) => {
    ctx.reply("Выберите действие.", keyboard());
  })
  .on('callback_query', (ctx) => {
    // отвечаем телеграму что получили от него запрос
    ctx.answerCbQuery();
    // удаляем сообщение
    ctx.deleteMessage();
    // отвечаем на нажатие кнопки
    ctx.reply('You press ',ctx.callbackQuery.data, keyboard())
  });

//Post запрос
const search = async () => {
  try{
    const response = await axios.post('https://dom.gosuslugi.ru/tariff/api/rest/services/public-standards/search', {
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

    return util.inspect(response.data.items.filter(item => item.familiesNumber.number === 5), null, 2);
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
