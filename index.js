require("dotenv").config();
const { Telegraf, Extra } = require("telegraf");
const util = require("util");
const { search } = require("./helpers/api");
const {
  main_menu,
  municipal_area,
  city_area,
  al_area,
  num_people,
  num_work,
  num_old,
  num_kid,
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
  select_people_completed,
  select_work_completed,
  select_old_completed,
  select_kid_completed,
  select_work,
  select_old,
  select_kid,
  select_season,
  select_standard,
  nasel_punct,
} = require("./helpers/msg");
const { TELEGRAM_BOT_TOKEN } = process.env;
const bot = new Telegraf(process.env.BOT_TOKEN);
let oktomo_code = {};
let selected_city = {};
let selected_al = {};
let selected_people = {};
let selected_work = {};
let selected_old = {};
let selected_kid = {};
let selected_season = {};
let selected_standard = {};
let step = {};

bot.start((ctx) => {
  oktomo_code = null;
  selected_city[ctx.chat.id] = null;
  selected_al[ctx.chat.id] = null;
  selected_people[ctx.chat.id] = null;
  selected_work[ctx.chat.id] = null;
  selected_old[ctx.chat.id] = null;
  selected_kid[ctx.chat.id] = null;
  selected_season[ctx.chat.id] = null;
  selected_standard[ctx.chat.id] = null;
  console.log(
    "предыдущие: ",
    oktomo_code,
    selected_city,
    selected_al,
    selected_people,
    selected_season,
    selected_standard
  );
  ctx.reply(greeting);
  ctx.reply(use_subsidy);
});

bot.command("subsidy", (ctx) => {
  oktomo_code = null;
  selected_city[ctx.chat.id] = null;
  selected_al[ctx.chat.id] = null;
  selected_people[ctx.chat.id] = null;
  selected_season[ctx.chat.id] = null;
  selected_standard[ctx.chat.id] = null;
  console.log(
    "предыдущие: ",
    oktomo_code,
    selected_city,
    selected_al,
    selected_people,
    selected_season,
    selected_standard
  );
  ctx.reply(select_municipal_or_city, main_menu);
});

const city_id = {
  Abakan: "95701000",
  Abaza: "95702000",
  Sayanogorsk: "95708000",
  Sorsk: "95709000",
  Chernogorsk: "95715000",
};

const name_city = {
  Abakan: "Абакан",
  Abaza: "Абаза",
  Sayanogorsk: "Саяногорск",
  Sorsk: "Сорск",
  Chernogorsk: "Черногорск",
};

const al_id = {
  Arshanovo: "95605405",
  BelyyYar: "95605410",
  Izykhskiye: "95605418",
  Kirovo: "95605420",
  Krasno: "95605425",
  Novomikh: "95605430",
  Novoros: "95605435",
  Ochury: "95605440",
  Podsineye: "95605445",
};

const season_id = {
  hot_period: "В отопительный период",
  cold_period: "Вне отопительного периода",
};

const season_name = {
  hot_period: "Отопительный",
  cold_period: "Неотопительный",
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
  oktomo_code = null;
  selected_city[ctx.chat.id] = null;
  selected_al[ctx.chat.id] = null;
  selected_people[ctx.chat.id] = null;
  selected_season[ctx.chat.id] = null;
  selected_standard[ctx.chat.id] = null;
  console.log(
    "предыдущие: ",
    oktomo_code,
    selected_city,
    selected_al,
    selected_people,
    selected_season,
    selected_standard
  );
  ctx.deleteMessage();
  ctx.reply(select_municipal_or_city, main_menu);
});

//обработка выбранной кнопки 'Муниципальный район'
bot.action("mn", (ctx) => {
  ctx.deleteMessage();
  ctx.reply(select_municipal, municipal_area);
});

// обработка выбранной кнопки 'Алтайский'
bot.action("al", (ctx) => {
  ctx.deleteMessage();
  ctx.reply(nasel_punct, al_area);
});

// запомнить значение 'Алтайский'
Object.keys(al_id).forEach((al) => {
  bot.action(al, (ctx) => {
    selected_al[ctx.chat.id] = al_id[al];
    oktomo_code = selected_al[ctx.chat.id];
    console.log(selected_al);
  });
});

//обработка выбранной кнопки 'Городской округ'
bot.action("gr", (ctx) => {
  ctx.deleteMessage();
  ctx.reply(select_city, city_area);
});

// запомнить значение 'Городской округ'
Object.keys(city_id).forEach((city) => {
  bot.action(city, (ctx) => {
    selected_city[ctx.chat.id] = city_id[city];
    oktomo_code = selected_city[ctx.chat.id];
    ctx.answerCbQuery(`Вы выбрали город: ${name_city[city]}`);
    console.log(selected_city);
  });
});

// обработка выбранной кнопки 'Кол-во человек'
bot.action("next_people", (ctx) => {
  ctx.deleteMessage();
  ctx.reply(select_people);
  step = 1;
});

// обработка выбранной кнопки 'Кол-во рабочих'
bot.action("next_work", (ctx) => {
  ctx.deleteMessage();
  ctx.reply(select_work);
  step = 2;
});

// обработка выбранной кнопки 'Кол-во пенсионеров'
bot.action("next_old", (ctx) => {
  ctx.deleteMessage();
  ctx.reply(select_old);
  step = 3;
});

// обработка выбранной кнопки 'Кол-во детей'
bot.action("next_kid", (ctx) => {
  ctx.deleteMessage();
  ctx.reply(select_kid);
  step = 4;
});

function state(a, b, c, d, completed, num, selected, ctx) {
  value = a - b - c - d;
  sum = b + c + d;
  if (value === 0) {
    ctx.reply(completed, num_kid);
    console.log(selected);
  } else if (step === 4 && a != sum) {
    ctx.reply("Введенное число больше количества человек в вашей семье.");
  } else if (value > 0) {
    ctx.reply(completed, num);
    console.log(selected);
  } else {
    ctx.reply("Введенное число больше количества человек в вашей семье.");
    console.log(a, b, c, d);
  }
}

bot.on("text", (ctx) => {
  if (step === 1) {
    selected_people[ctx.chat.id] = parseInt(ctx.message.text);
    console.log("люди:", selected_people);
    ctx.reply(select_people_completed, num_people);
  } else if (step === 2) {
    selected_work[ctx.chat.id] = parseInt(ctx.message.text);
    console.log("работяги:", selected_work);
    state(
      selected_people[ctx.chat.id],
      selected_work[ctx.chat.id],
      0,
      0,
      select_work_completed,
      num_work,
      selected_work,
      ctx
    );
  } else if (step === 3) {
    selected_old[ctx.chat.id] = parseInt(ctx.message.text);
    console.log("старики:", selected_old);
    state(
      selected_people[ctx.chat.id],
      selected_work[ctx.chat.id],
      selected_old[ctx.chat.id],
      0,
      select_old_completed,
      num_old,
      selected_old,
      ctx
    );
  } else if (step === 4) {
    selected_kid[ctx.chat.id] = parseInt(ctx.message.text);
    console.log("дети:", selected_old);
    state(
      selected_people[ctx.chat.id],
      selected_work[ctx.chat.id],
      selected_old[ctx.chat.id],
      selected_kid[ctx.chat.id],
      select_kid_completed,
      num_kid,
      selected_kid,
      ctx
    );
  }
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
    ctx.answerCbQuery(`Вы выбрали: ${season_name[season]} период`);
    console.log(selected_season);
  });
});

// обработка выбранной кнопки 'Стандарт'
bot.action("next_standard", (ctx) => {
  ctx.deleteMessage();
  if (selected_people[ctx.chat.id] > 5) {
    selected_people[ctx.chat.id] = 5;
  }
  if (selected_people[ctx.chat.id] === 1) {
    ctx.reply(select_standard, num_standard_1);
  } else {
    ctx.reply(select_standard, num_standard);
  }
});

// запомнить значение 'Стандарт'
Object.keys(standard_id).forEach((standard) => {
  bot.action(standard, (ctx) => {
    selected_standard[ctx.chat.id] = standard_id[standard];
    console.log(selected_standard);
    console.log(selected_people[ctx.chat.id]);
  });
});

// кнопка отправить POST
bot.action("post", async (ctx) => {
  const data = await search(
    oktomo_code,
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
