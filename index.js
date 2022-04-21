require("dotenv").config();
const { Telegraf } = require("telegraf");
const util = require("util");
const { search } = require("./helpers/api");
const {
  main_menu,
  municipal_area,
  city_area,
  num_people,
  num_season,
  num_standard,
  num_standard_1,
} = require("./helpers/keyboards");
const {
  greeting,
  use_subsidy,
  select_municipal_or_city,
  select_municipal,
  select_city,
  select_people,
  select_season,
  select_standard,
} = require("./helpers/msg");
const { TELEGRAM_BOT_TOKEN } = process.env;
const bot = new Telegraf(process.env.BOT_TOKEN);
let selected_city = {};
let selected_people = {};
let selected_season = {};
let selected_standard = {};

bot.start((ctx) => {
  ctx.reply(greeting);
  ctx.reply(use_subsidy);
});

bot.command("subsidy", (ctx) => {
  ctx.reply(select_municipal_or_city, main_menu);
});

const city_id = {
  Abakan: "95701000",
  Abaza: "95702000",
  Sayanogorsk: "95708000",
  Sorsk: "95709000",
  Chernogorsk: "95715000",
};

const people_id = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
};

const season_id = {
  hot_period: "В отопительный период",
  cold_period: "Вне отопительного периода",
};

const standard_id = {
  a: 0,
  b: 1,
  c: 2,
  d: 3,
  e: 4,
  f: 5,
};

//обработка выбранной кнопки 'Назад'
bot.action("go-back", (ctx) => {
  selected_city[ctx.chat.id] = null;
  selected_people[ctx.chat.id] = null;
  selected_season[ctx.chat.id] = null;
  selected_standard[ctx.chat.id] = null;
  console.log(
    "предыдущие: ",
    selected_city,
    selected_people,
    selected_season,
    selected_standard
  );
  ctx.deleteMessage();
  ctx.reply(select_municipal_or_city, main_menu);
});

// //обработка выбранной кнопки 'Муниципальный район'
// bot.action('mn', (ctx) =>{
//   ctx.deleteMessage();
//   ctx.reply(select_municipal, municipal_area);
// })

//обработка выбранной кнопки 'Городской округ'
bot.action("gr", (ctx) => {
  ctx.deleteMessage();
  ctx.reply(select_city, city_area);
});

// запомнить значение 'Городской округ'
Object.keys(city_id).forEach((city) => {
  bot.action(city, (ctx) => {
    selected_city[ctx.chat.id] = city_id[city];
    console.log(selected_city);
  });
});

// обработка выбранной кнопки 'Кол-во человек'
bot.action("next_people", (ctx) => {
  ctx.deleteMessage();
  ctx.reply(select_people, num_people);
});

// запомнить значение 'Кол-во человек'
Object.keys(people_id).forEach((people) => {
  bot.action(people, (ctx) => {
    selected_people[ctx.chat.id] = people_id[people];
    console.log(selected_people);
  });
});

// обработка выбранной кнопки 'Период'
bot.action("next_season", (ctx) => {
  ctx.deleteMessage();
  ctx.reply(select_season, num_season);
});

// запомнить значение 'Период'
Object.keys(season_id).forEach((season) => {
  bot.action(season, (ctx) => {
    selected_season[ctx.chat.id] = season_id[season];
    console.log(selected_season);
  });
});

// обработка выбранной кнопки 'Стандарт'
bot.action("next_standard", (ctx) => {
  ctx.deleteMessage();
  if (selected_people[ctx.chat.id] === 1) {
    ctx.reply(select_standard, num_standard_1);
    console.log("one");
  } else {
    ctx.reply(select_standard, num_standard);
    console.log("two");
  }
});

// запомнить значение 'Стандарт'
Object.keys(standard_id).forEach((standard) => {
  bot.action(standard, (ctx) => {
    selected_standard[ctx.chat.id] = standard_id[standard];
    console.log(selected_standard);
  });
});

// кнопка отправить POST
bot.action("post", async (ctx) => {
  const data = await search(
    selected_city[ctx.chat.id],
    selected_people[ctx.chat.id],
    selected_season[ctx.chat.id]
  );
  get_data = data.rates[selected_standard[ctx.chat.id]];
  jku = get_data.value * selected_people[ctx.chat.id];
  console.log("Критерий: ", get_data.diffCriteria);
  console.log("Значение критерия: ", get_data.value);
  console.log("Значение ЖКУ равно: ", jku);
});

bot.launch();
