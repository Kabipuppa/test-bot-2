require("dotenv").config();
const { Telegraf, Extra } = require("telegraf");
const util = require("util");
const { search } = require("./helpers/api");
const axios = require("axios");
const {
  pm_work,
  pm_old,
  pm_kid,
  city_id,
  city_name,
  al_id,
  al_name,
  as_id,
  as_name,
  bei_id,
  bei_name,
  bog_id,
  bog_name,
  ord_id,
  ord_name,
  tash_id,
  tash_name,
  ust_id,
  ust_name,
  shir_id,
  shir_name,
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
  bei_area,
  bog_area,
  ord_area,
  tash_area,
  ust_area,
  shir_area,
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
let selected_bei = {};
let selected_bog = {};
let selected_ord = {};
let selected_tash = {};
let selected_ust = {};
let selected_shir = {};
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
  oktomo_code[ctx.chat.id] = null;
  selected_city[ctx.chat.id] = null;
  selected_al[ctx.chat.id] = null;
  selected_as[ctx.chat.id] = null;
  selected_bei[ctx.chat.id] = null;
  selected_bog[ctx.chat.id] = null;
  selected_ord[ctx.chat.id] = null;
  selected_tash[ctx.chat.id] = null;
  selected_ust[ctx.chat.id] = null;
  selected_shir[ctx.chat.id] = null;
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
  oktomo_code[ctx.chat.id] = null;
  selected_city[ctx.chat.id] = null;
  selected_al[ctx.chat.id] = null;
  selected_as[ctx.chat.id] = null;
  selected_bei[ctx.chat.id] = null;
  selected_bog[ctx.chat.id] = null;
  selected_ord[ctx.chat.id] = null;
  selected_tash[ctx.chat.id] = null;
  selected_ust[ctx.chat.id] = null;
  selected_shir[ctx.chat.id] = null;
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

bot.action("al", async (ctx) => {
  ctx.deleteMessage();
  ctx.reply(nasel_punct, al_area);
});

Object.keys(al_id).forEach((al) => {
  bot.action(al, async (ctx) => {
    ctx.deleteMessage();
    selected_al[ctx.chat.id] = al_id[al];
    oktomo_code[ctx.chat.id] = selected_al[ctx.chat.id];
    if (isNaN(selected_al[ctx.chat.id]) === true) {
      ctx.reply("Выберете населенный пункт", {
        parse_mode: "html",
      });
    } else {
      await ctx.reply(
        `Вы выбрали населенный пункт: ${al_name[al]}`,
        cancel_btn
      );
      await ctx.reply(select_people);
      step[ctx.chat.id] = 1;
    }
  });
});

bot.action("as", (ctx) => {
  ctx.deleteMessage();
  ctx.reply(nasel_punct, as_area);
});

Object.keys(as_id).forEach((as) => {
  bot.action(as, async (ctx) => {
    selected_as[ctx.chat.id] = as_id[as];
    oktomo_code[ctx.chat.id] = selected_as[ctx.chat.id];
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
      step[ctx.chat.id] = 1;
    }
  });
});

bot.action("bei", async (ctx) => {
  ctx.deleteMessage();
  ctx.reply(nasel_punct, bei_area);
});

Object.keys(bei_id).forEach((bei) => {
  bot.action(bei, async (ctx) => {
    ctx.deleteMessage();
    selected_bei[ctx.chat.id] = bei_id[bei];
    oktomo_code[ctx.chat.id] = selected_bei[ctx.chat.id];
    if (isNaN(selected_bei[ctx.chat.id]) === true) {
      ctx.reply("Выберете населенный пункт", {
        parse_mode: "html",
      });
    } else {
      await ctx.reply(
        `Вы выбрали населенный пункт: ${bei_name[bei]}`,
        cancel_btn
      );
      await ctx.reply(select_people);
      step[ctx.chat.id] = 1;
    }
  });
});

bot.action("bog", async (ctx) => {
  ctx.deleteMessage();
  ctx.reply(nasel_punct, bog_area);
});

Object.keys(bog_id).forEach((bog) => {
  bot.action(bog, async (ctx) => {
    ctx.deleteMessage();
    selected_bog[ctx.chat.id] = bog_id[bog];
    oktomo_code[ctx.chat.id] = selected_bog[ctx.chat.id];
    if (isNaN(selected_bog[ctx.chat.id]) === true) {
      ctx.reply("Выберете населенный пункт", {
        parse_mode: "html",
      });
    } else {
      await ctx.reply(
        `Вы выбрали населенный пункт: ${bog_name[bog]}`,
        cancel_btn
      );
      await ctx.reply(select_people);
      step[ctx.chat.id] = 1;
    }
  });
});

bot.action("ord", async (ctx) => {
  ctx.deleteMessage();
  ctx.reply(nasel_punct, ord_area);
});

Object.keys(ord_id).forEach((ord) => {
  bot.action(ord, async (ctx) => {
    ctx.deleteMessage();
    selected_ord[ctx.chat.id] = ord_id[ord];
    oktomo_code[ctx.chat.id] = selected_ord[ctx.chat.id];
    if (isNaN(selected_ord[ctx.chat.id]) === true) {
      ctx.reply("Выберете населенный пункт", {
        parse_mode: "html",
      });
    } else {
      await ctx.reply(
        `Вы выбрали населенный пункт: ${ord_name[ord]}`,
        cancel_btn
      );
      await ctx.reply(select_people);
      step[ctx.chat.id] = 1;
    }
  });
});

bot.action("tash", async (ctx) => {
  ctx.deleteMessage();
  ctx.reply(nasel_punct, tash_area);
});

Object.keys(tash_id).forEach((tash) => {
  bot.action(tash, async (ctx) => {
    ctx.deleteMessage();
    selected_tash[ctx.chat.id] = tash_id[tash];
    oktomo_code[ctx.chat.id] = selected_tash[ctx.chat.id];
    if (isNaN(selected_tash[ctx.chat.id]) === true) {
      ctx.reply("Выберете населенный пункт", {
        parse_mode: "html",
      });
    } else {
      await ctx.reply(
        `Вы выбрали населенный пункт: ${tash_name[tash]}`,
        cancel_btn
      );
      await ctx.reply(select_people);
      step[ctx.chat.id] = 1;
    }
  });
});

bot.action("ust", async (ctx) => {
  ctx.deleteMessage();
  ctx.reply(nasel_punct, ust_area);
});

Object.keys(ust_id).forEach((ust) => {
  bot.action(ust, async (ctx) => {
    ctx.deleteMessage();
    selected_ust[ctx.chat.id] = ust_id[ust];
    oktomo_code[ctx.chat.id] = selected_ust[ctx.chat.id];
    if (isNaN(selected_ust[ctx.chat.id]) === true) {
      ctx.reply("Выберете населенный пункт", {
        parse_mode: "html",
      });
    } else {
      await ctx.reply(
        `Вы выбрали населенный пункт: ${ust_name[ust]}`,
        cancel_btn
      );
      await ctx.reply(select_people);
      step[ctx.chat.id] = 1;
    }
  });
});

bot.action("shir", async (ctx) => {
  ctx.deleteMessage();
  ctx.reply(nasel_punct, shir_area);
});

Object.keys(shir_id).forEach((shir) => {
  bot.action(shir, async (ctx) => {
    ctx.deleteMessage();
    selected_shir[ctx.chat.id] = shir_id[shir];
    oktomo_code[ctx.chat.id] = selected_shir[ctx.chat.id];
    if (isNaN(selected_shir[ctx.chat.id]) === true) {
      ctx.reply("Выберете населенный пункт", {
        parse_mode: "html",
      });
    } else {
      await ctx.reply(
        `Вы выбрали населенный пункт: ${shir_name[shir]}`,
        cancel_btn
      );
      await ctx.reply(select_people);
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
    oktomo_code[ctx.chat.id] = selected_city[ctx.chat.id];
    if (isNaN(selected_city[ctx.chat.id]) === true) {
      ctx.reply("Выберете город", {
        parse_mode: "html",
      });
    } else {
      ctx.deleteMessage();
      await ctx.reply(`Вы выбрали город: ${city_name[city]}`, cancel_btn);
      await ctx.reply(select_people);
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
      ctx.reply(select_benefit, num_benefit);
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
      ctx.reply(select_season, num_season);
    }
  }
});

Object.keys(season_id).forEach((season) => {
  bot.action(season, async (ctx) => {
    ctx.deleteMessage();
    if (oktomo_code[ctx.chat.id] === null) {
      await ctx.reply(cancel_caption);
    } else {
      selected_season[ctx.chat.id] = season_id[season];
      await ctx.reply(`Вы выбрали период: ${season_name[season]}`, cancel_btn);
      await ctx.reply(pls_wait, { parse_mode: "HTML" });

      if (selected_people[ctx.chat.id] > 5) {
        selected_people[ctx.chat.id] = 5;
      }

      const data = await search(
        oktomo_code[ctx.chat.id],
        selected_people[ctx.chat.id],
        selected_season[ctx.chat.id]
      );

      const keyboard = data.rates
        .map((r) => r.diffCriteria.split(" ").slice(4).join(" "))
        .map((x, xi) => [
          {
            text: x,
            callback_data: String(xi),
          },
        ]);

      await ctx.reply(select_standard, {
        reply_markup: JSON.stringify({
          inline_keyboard: keyboard,
        }),
      });
    }
  });
});

Object.keys(standard_id).forEach((standard) => {
  bot.action(standard, async (ctx) => {
    ctx.deleteMessage();
    if (oktomo_code[ctx.chat.id] === null) {
      ctx.reply(cancel_caption);
    } else {
      selected_standard[ctx.chat.id] = standard_id[standard];
      await ctx.reply("Нажмите 👇", post_btn);
    }
  });
});

bot.action("post", async (ctx) => {
  ctx.deleteMessage();
  if (oktomo_code[ctx.chat.id] === null) {
    ctx.reply(cancel_caption);
  } else {
    const data = await search(
      oktomo_code[ctx.chat.id],
      selected_people[ctx.chat.id],
      selected_season[ctx.chat.id]
    );
    get_data = data.rates[selected_standard[ctx.chat.id]];
    let Dmax = {};
    let S = {};

    rs = get_data.value * selected_people[ctx.chat.id]; // Регион стандарт
    sd = selected_salary[ctx.chat.id] / 6; // Совоокупный доход семьи
    pm = // Прожиточный минимум
      selected_work[ctx.chat.id] * pm_work +
      selected_old[ctx.chat.id] * pm_old +
      selected_kid[ctx.chat.id] * pm_kid;
    pm_sr = pm / selected_people[ctx.chat.id];
    jkh = // ЖКХ сумма
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
  }
  // console.log(pm);
});

bot.launch();
