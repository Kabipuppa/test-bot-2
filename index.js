require("dotenv").config();
const { Telegraf, Extra } = require("telegraf");
const util = require("util");
const { search } = require("./helpers/api");
const axios = require("axios");
const {
  city_id,
  city_name,
  al_id,
  al_name,
  as_id,
  as_name,
  season_id,
  season_name,
  standard_id,
} = require("./helpers/const");
const {
  start,
  cancel_btn,
  main_menu,
  municipal_area,
  city_area,
  al_area,
  as_area,
  num_benefit,
  num_season,
  post_btn,
} = require("./helpers/keyboards");
const {
  cancel_caption,
  info,
  use_subsidy,
  select_municipal_or_city,
  select_municipal,
  select_city,
  select_people,
  select_work,
  select_old,
  select_kid,
  select_salary,
  select_jkh,
  select_electric,
  select_benefit,
  select_benefit_size,
  select_season,
  select_standard,
  nasel_punct,
  pls_wait,
} = require("./helpers/msg");
const { state, subsidy } = require("./helpers/utils");
const { TELEGRAM_BOT_TOKEN } = process.env;
const bot = new Telegraf(process.env.BOT_TOKEN);
let oktomo_code = {};
let selected_city = {};
let selected_al = {};
let selected_as = {};
let selected_people = {};
let selected_work = {};
let selected_old = {};
let selected_kid = {};
let selected_salary = {};
let selected_jkh = {};
let selected_electric = {};
let selected_benefit = {};
let selected_season = {};
let selected_standard = {};
let step = {};

bot.start((ctx) => {
  selected_city[ctx.chat.id] = null;
  selected_al[ctx.chat.id] = null;
  selected_as[ctx.chat.id] = null;
  selected_people[ctx.chat.id] = null;
  selected_work[ctx.chat.id] = null;
  selected_old[ctx.chat.id] = null;
  selected_kid[ctx.chat.id] = null;
  selected_salary[ctx.chat.id] = null;
  selected_jkh[ctx.chat.id] = null;
  selected_electric[ctx.chat.id] = null;
  selected_benefit[ctx.chat.id] = null;
  selected_season[ctx.chat.id] = null;
  selected_standard[ctx.chat.id] = null;
  step[ctx.chat.id] = null;
  ctx.reply(`Добро пожаловать ${ctx.chat.first_name}! 🙂`);
  ctx.reply(use_subsidy, start);
});

bot.hears("В начало", (ctx) => {
  selected_city[ctx.chat.id] = null;
  selected_al[ctx.chat.id] = null;
  selected_as[ctx.chat.id] = null;
  selected_people[ctx.chat.id] = null;
  selected_work[ctx.chat.id] = null;
  selected_old[ctx.chat.id] = null;
  selected_kid[ctx.chat.id] = null;
  selected_salary[ctx.chat.id] = null;
  selected_jkh[ctx.chat.id] = null;
  selected_electric[ctx.chat.id] = null;
  selected_benefit[ctx.chat.id] = null;
  selected_season[ctx.chat.id] = null;
  selected_standard[ctx.chat.id] = null;
  step[ctx.chat.id] = null;
  ctx.reply(cancel_caption, start);
});

bot.hears("Начать опрос", (ctx) => {
  ctx.reply(select_municipal_or_city, main_menu);
});

bot.hears("Муниципальный район", (ctx) => {
  ctx.reply(select_municipal, municipal_area);
});

// обработка выбранной кнопки 'Алтайский'
bot.action("al", async (ctx) => {
  ctx.deleteMessage();
  ctx.reply(nasel_punct, al_area);
});

Object.keys(al_id).forEach((al) => {
  bot.action(al, async (ctx) => {
    ctx.deleteMessage();
    selected_al[ctx.chat.id] = al_id[al];
    oktomo_code = selected_al[ctx.chat.id];
    if (isNaN(selected_al[ctx.chat.id]) === true) {
      ctx.reply("Выберете населенный пункт", {
        parse_mode: "html",
      });
    } else {
      await ctx.reply(
        `Вы выбрали населенный пункт: ${al_name[al]}`,
        cancel_btn
      );
      // await ctx.reply("Нажмите 👇", next_people_btn);
      await ctx.reply(select_people);
      console.log("Насел.пункт: ", selected_al);
      step[ctx.chat.id] = 1;
    }
  });
});

// обработка выбранной кнопки 'Аскизский'
bot.action("as", (ctx) => {
  ctx.deleteMessage();
  ctx.reply(nasel_punct, as_area);
});

Object.keys(as_id).forEach((as) => {
  bot.action(as, async (ctx) => {
    selected_as[ctx.chat.id] = as_id[as];
    oktomo_code = selected_as[ctx.chat.id];
    console.log("октомо: ", oktomo_code);
    if (isNaN(selected_as[ctx.chat.id]) === true) {
      ctx.reply("Выберете город", {
        parse_mode: "html",
      });
    } else {
      ctx.deleteMessage();
      await ctx.reply(
        `Вы выбрали населенный пункт: ${as_name[as]}`,
        cancel_btn
      );
      await ctx.reply(select_people);
      console.log("Насел пункт: ", selected_as);
      step[ctx.chat.id] = 1;
    }
  });
});

bot.hears("Городской округ", (ctx) => {
  ctx.reply(select_city, city_area);
});

Object.keys(city_id).forEach((city) => {
  bot.action(city, async (ctx) => {
    selected_city[ctx.chat.id] = city_id[city];
    oktomo_code = selected_city[ctx.chat.id];
    if (isNaN(selected_city[ctx.chat.id]) === true) {
      ctx.reply("Выберете город", {
        parse_mode: "html",
      });
    } else {
      ctx.deleteMessage();
      await ctx.reply(`Вы выбрали город: ${city_name[city]}`, cancel_btn);
      await ctx.reply(select_people);
      console.log("город: ", selected_city);
      step[ctx.chat.id] = 1;
    }
  });
});

bot.hears("Да", (ctx) => {
  ctx.deleteMessage();
  ctx.reply(select_benefit_size, cancel_btn);
  step[ctx.chat.id] = 8;
});

bot.hears("Нет", async (ctx) => {
  selected_benefit[ctx.chat.id] = 0;
  console.log("льгота: ", selected_benefit);
  await ctx.reply(select_season, cancel_btn);
  await ctx.reply("Нажмите 👇", num_season);
});

bot.on("text", (ctx) => {
  if (step[ctx.chat.id] === 1) {
    selected_people[ctx.chat.id] = parseInt(ctx.message.text);
    if (
      isNaN(selected_people[ctx.chat.id]) === true ||
      selected_people[ctx.chat.id] <= 0
    ) {
      ctx.reply("Введите число <b>цифрой</b> больше нуля:", {
        parse_mode: "html",
      });
      return (step[ctx.chat.id] = 1);
    } else {
      console.log("люди:", selected_people);
      ctx.reply(select_work);
      step[ctx.chat.id] = 2;
    }
  } else if (step[ctx.chat.id] === 2) {
    selected_work[ctx.chat.id] = parseInt(ctx.message.text);
    if (
      isNaN(selected_work[ctx.chat.id]) === true ||
      selected_work[ctx.chat.id] < 0
    ) {
      ctx.reply("Введите положительное <b>число</b>:", {
        parse_mode: "html",
      });
      step[ctx.chat.id] = 2;
    } else {
      console.log("работяги:", selected_work);
      step[ctx.chat.id] = state(
        selected_people[ctx.chat.id],
        selected_work[ctx.chat.id],
        0,
        0,
        ctx,
        step[ctx.chat.id],
        select_salary,
        select_old,
        3,
        2
      );
    }
  } else if (step[ctx.chat.id] === 3) {
    selected_old[ctx.chat.id] = parseInt(ctx.message.text);
    if (
      isNaN(selected_old[ctx.chat.id]) === true ||
      selected_old[ctx.chat.id] < 0
    ) {
      ctx.reply("Введите положительное <b>число</b>:", {
        parse_mode: "html",
      });
      step[ctx.chat.id] = 3;
    } else {
      console.log("старики:", selected_old);
      step[ctx.chat.id] = state(
        selected_people[ctx.chat.id],
        selected_work[ctx.chat.id],
        selected_old[ctx.chat.id],
        0,
        ctx,
        step[ctx.chat.id],
        select_salary,
        select_kid,
        4,
        3
      );
    }
  } else if (step[ctx.chat.id] === 4) {
    selected_kid[ctx.chat.id] = parseInt(ctx.message.text);
    if (
      isNaN(selected_kid[ctx.chat.id]) === true ||
      selected_kid[ctx.chat.id] < 0
    ) {
      ctx.reply("Введите положительное <b>число</b>:", {
        parse_mode: "html",
      });
      step[ctx.chat.id] = 4;
    } else {
      console.log("дети:", selected_old);
      step[ctx.chat.id] = state(
        selected_people[ctx.chat.id],
        selected_work[ctx.chat.id],
        selected_old[ctx.chat.id],
        selected_kid[ctx.chat.id],
        ctx,
        step[ctx.chat.id],
        select_salary,
        select_salary,
        5,
        4
      );
    }
  } else if (step[ctx.chat.id] === 5) {
    selected_salary[ctx.chat.id] = parseInt(ctx.message.text);
    if (
      isNaN(selected_salary[ctx.chat.id]) === true ||
      selected_salary[ctx.chat.id] <= 0
    ) {
      ctx.reply("Введите число <b>цифрой</b> больше нуля:", {
        parse_mode: "html",
      });
      step[ctx.chat.id] = 5;
    } else {
      console.log("зп:", selected_salary);
      ctx.reply(select_jkh);
      step[ctx.chat.id] = 6;
    }
  } else if (step[ctx.chat.id] === 6) {
    selected_jkh[ctx.chat.id] = parseInt(ctx.message.text);
    if (
      isNaN(selected_jkh[ctx.chat.id]) === true ||
      selected_jkh[ctx.chat.id] <= 0
    ) {
      ctx.reply("Введите число <b>цифрой</b> больше нуля:", {
        parse_mode: "html",
      });
      step[ctx.chat.id] = 6;
    } else {
      console.log("жкх:", selected_jkh);
      ctx.reply(select_electric);
      step[ctx.chat.id] = 7;
    }
  } else if (step[ctx.chat.id] === 7) {
    selected_electric[ctx.chat.id] = parseInt(ctx.message.text);
    if (
      isNaN(selected_electric[ctx.chat.id]) === true ||
      selected_electric[ctx.chat.id] <= 0
    ) {
      ctx.reply("Введите число <b>цифрой</b> больше нуля:", {
        parse_mode: "html",
      });
      step[ctx.chat.id] = 7;
    } else {
      console.log("электричество':", selected_electric);
      ctx.reply(select_benefit, num_benefit); // не выводит клаву вот здесь
    }
  } else if (step[ctx.chat.id] === 8) {
    selected_benefit[ctx.chat.id] = parseInt(ctx.message.text);
    if (
      isNaN(selected_benefit[ctx.chat.id]) === true ||
      selected_benefit[ctx.chat.id] <= 0
    ) {
      ctx.reply("Введите число <b>цифрой</b> больше нуля:", {
        parse_mode: "html",
      });
      step[ctx.chat.id] = 8;
    } else {
      console.log("размер льготы:", selected_benefit);
      ctx.reply(select_season, num_season);
    }
  }
});

// запомнить значение 'Период'
Object.keys(season_id).forEach((season) => {
  bot.action(season, async (ctx) => {
    ctx.deleteMessage();
    if (oktomo_code === null) {
      await ctx.reply(cancel_caption);
    } else {
      selected_season[ctx.chat.id] = season_id[season];
      await ctx.reply(`Вы выбрали период: ${season_name[season]}`, cancel_btn);
      await ctx.reply(pls_wait, { parse_mode: "HTML" });
      console.log(selected_season);

      if (selected_people[ctx.chat.id] > 5) {
        selected_people[ctx.chat.id] = 5;
      }
      let arr_length = {};
      let num = [];
      let arr_data = [];
      let arr_btn = [];
      let split_arr = [];
      let chunk_arr = [];
      const data = await search(
        oktomo_code,
        selected_people[ctx.chat.id],
        selected_season[ctx.chat.id]
      );
      num = data.rates;
      arr_length = num.length;
      for (var i = 0; i < arr_length; i++) {
        arr_data[i] = data.rates[i];
        split_arr[i] = arr_data[i].diffCriteria.split(" ");
        chunk_arr[i] = split_arr[i].slice(4);
        arr_btn[i] = chunk_arr[i].join(" ");
      }
      await ctx.reply(select_standard, {
        // создать клаву со стандартами
        reply_markup: JSON.stringify({
          inline_keyboard: arr_btn.map((x, xi) => [
            {
              text: x,
              callback_data: String(xi),
            },
          ]),
        }),
      });
    }
  });
});

// запомнить значение 'Стандарт'
Object.keys(standard_id).forEach((standard) => {
  bot.action(standard, async (ctx) => {
    ctx.deleteMessage();
    if (oktomo_code === null) {
      ctx.reply(cancel_caption);
    } else {
      selected_standard[ctx.chat.id] = standard_id[standard];
      await ctx.reply("Нажмите 👇", post_btn);
      console.log(selected_standard);
    }
  });
});

bot.action("post", async (ctx) => {
  ctx.deleteMessage();
  if (oktomo_code === null) {
    ctx.reply(cancel_caption);
  } else {
    const data = await search(
      oktomo_code,
      selected_people[ctx.chat.id],
      selected_season[ctx.chat.id]
    );
    get_data = data.rates[selected_standard[ctx.chat.id]];
    let Dmax = {};
    let S = {};

    rs = get_data.value * selected_people[ctx.chat.id]; // Регион стандарт
    sd = selected_salary[ctx.chat.id] / 6; // совоокупный доход семьи
    pm = // прожиточный минимум
      selected_work[ctx.chat.id] * 13026 +
      selected_old[ctx.chat.id] * 10277 +
      selected_kid[ctx.chat.id] * 11592;
    pm_sr = pm / selected_people[ctx.chat.id];
    jkh = // жкх сумма
      selected_jkh[ctx.chat.id] +
      selected_electric[ctx.chat.id] -
      selected_benefit[ctx.chat.id];

    if (sd > pm) {
      Dmax = 0.22 * sd;
      subsidy(S, rs, Dmax, jkh, ctx, info);
    } else if (sd < pm) {
      Dmax = (sd / pm_sr) * 0.1 * sd;
      subsidy(S, rs, Dmax, jkh, ctx, info);
    }

    console.log("Критерий: ", get_data.diffCriteria);
    console.log("Регион стандарт: ", rs);
    console.log("Совокупный доход:", sd);
    console.log("Прожиточный минимум:", pm);
    console.log("Прожиточный минимум средний:", pm_sr);
    console.log("ЖКХ:", jkh);
    console.log("Дmax", Dmax);
    console.log("Субсидия", S);
  }
});

bot.launch();
