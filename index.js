require('dotenv').config();
const { Telegraf } = require('telegraf');
const util = require('util');
const { search } = require('./helpers/api');
const {
  main_menu,
  municipal_area,
  city_area,
  num_people,
  num_season,
} = require('./helpers/keyboards');
const {
  greeting,
  use_subsidy,
  select_municipal_or_city,
  select_municipal,
  select_city,
  select_people,
  select_season,
} = require('./helpers/msg');
const {TELEGRAM_BOT_TOKEN} = process.env
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) =>{
  ctx.reply(greeting);
  ctx.reply(use_subsidy);
})

bot.command('subsidy', (ctx)=>{
  ctx.reply(select_municipal_or_city, main_menu);
});

const city_id = {
  Abakan: '95701000',
  Abaza: '95702000',
  Sayanogorsk: '95708000',
  Sorsk: '95709000',
  Chernogorsk: '95715000',
}

const people_id = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
}

const season_id = {
  hot_period: 'В отопительный период',
  cold_period: 'Вне отопительного периода',
}

//обработка выбранной кнопки 'Назад'
bot.action('go-back', (ctx) => {
  ctx.deleteMessage();
  ctx.reply(select_municipal_or_city, main_menu);
})

//обработка выбранной кнопки 'Муниципальный район'
bot.action('mn', (ctx) =>{
  ctx.deleteMessage();
  ctx.reply(select_municipal, municipal_area);
})

//обработка выбранной кнопки 'Городской округ'
bot.action('gr', (ctx) =>{
  ctx.deleteMessage();
  ctx.reply(select_city, city_area);
})

// обработка выбранной кнопки 'Кол-во челов'
bot.action('next_people', (ctx)=>{
  ctx.deleteMessage();
  ctx.reply(select_people, num_people);
});

// обработка выбранной кнопки 'Период'
bot.action('next_season', (ctx)=>{
  ctx.deleteMessage();
  ctx.reply(select_season, num_season);
});

let selected_city = {};
let selected_people = {};
let selected_season = {};

// запомнить в каком городе
Object.keys(city_id).forEach(city => {
  bot.action(city, ctx =>{
    selected_city = city_id[city];
    console.log(selected_city);
  })
})

// запомнить сколько человек в семье
Object.keys(people_id).forEach(people => {
  bot.action(people, ctx =>{
    selected_people = people_id[people];
    console.log(selected_people);
  })
})

// запомнить в какой период
Object.keys(season_id).forEach(season => {
  bot.action(season, ctx =>{
    selected_season = season_id[season];
    console.log(selected_season);
  })
})

// // условие
// if (selected_people == 1) {
//   const standard_id = {
//     one: 0,
//     two: 1,
//     three: 2,
//     four: 3,
//     five: 4,
//     six: 5,
//   }
// } else {
//   const standard_id = {
//     one: 0,
//     two: 1,
//     three: 2,
//   }
// }

// кнопка отправить POST
bot.action('post', async ctx =>{
  const data = await search(selected_city, selected_people, selected_season)
  get_data = data.rates[0];
  // get_data = data.rates[вставить встандарт];
  // calc = get_data.value + 1000;
  console.log(get_data);
})

bot.launch();
