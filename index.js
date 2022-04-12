require('dotenv').config();
const { Telegraf } = require('telegraf');
const util = require('util');
const { search } = require('./helpers/api');
const {main_menu, municipal_area, city_area} = require('./helpers/keyboards');
const {
  greeting,
  use_subsidy,
  select_municipal_or_city,
  select_municipal,
  select_city,
} = require('./helpers/msg');
const {TELEGRAM_BOT_TOKEN} = process.env
const bot = new Telegraf(process.env.BOT_TOKEN);

//команда start
bot.start((ctx) =>{
  ctx.reply(greeting);
  ctx.reply(use_subsidy);
})

//команда subsidy
bot.command('subsidy', (ctx)=>{
  ctx.reply(select_municipal_or_city, main_menu);
});

//обработка выбранной кнопки 'Муниципальный район'
bot.action('mn', (ctx) =>{
  ctx.deleteMessage();
  ctx.reply(select_municipal, municipal_area);
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
  ctx.reply(  select_city, city_area);
})

//обработка выбранной кнопки 'Назад'
bot.action('go-back', (ctx) => {
  ctx.deleteMessage();
  ctx.reply(select_municipal_or_city, main_menu);
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
