require('dotenv').config();
const { Telegraf } = require('telegraf');
const util = require('util');
const { search } = require('./helpers/api');
const {main_menu, municipal_area, city_area} = require('./helpers/keyboards');
const {TELEGRAM_BOT_TOKEN} = process.env
const bot = new Telegraf(process.env.BOT_TOKEN);

//команда start
bot.start((ctx) =>{
  ctx.reply('Здравствуйте! 🙂 Вас приветствует чат-бот "Калькулятор субсидии".  Данный расчет носит информативный характер. По вопросам окончательного решения необходимо обратиться в управление социальной поддержки населения по месту жительства.');
  ctx.reply('Для начала опроса используйте команду /subsidy.');
})

//команда subsidy
bot.command('subsidy', (ctx)=>{
  ctx.reply('Выберите муниципальный район или городской округ:', main_menu);
});

//обработка выбранной кнопки 'Муниципальный район'
bot.action('mn', (ctx) =>{
  ctx.deleteMessage();
  ctx.reply('Выберите муниципальный район:', municipal_area);
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
  ctx.reply('Выберите городской округ:', city_area);
})

//обработка выбранной кнопки 'Назад'
bot.action('go-back', (ctx) => {
  ctx.deleteMessage();
  ctx.reply('Выберите муниципальный район или городской округ:', main_menu);
})

// тут был post запрос к api

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
