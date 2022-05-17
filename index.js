require("dotenv").config();
const { Telegraf, Extra } = require("telegraf");
const util = require("util");
const { search } = require("./helpers/api");
const {
  city_id,
  city_name,
  al_id,
  al_name,
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
  next_people_btn,
  num_benefit,
  num_season,
  num_standard,
  num_standard_1,
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
} = require("./helpers/msg");
const { state, subsidy } = require("./helpers/utils");
const { TELEGRAM_BOT_TOKEN } = process.env;
const bot = new Telegraf(process.env.BOT_TOKEN);
let oktomo_code = {};
let selected_city = {};
let selected_al = {};
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
  oktomo_code = null;
  selected_city[ctx.chat.id] = null;
  selected_al[ctx.chat.id] = null;
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
  ctx.reply(`Добро пожаловать ${ctx.chat.first_name}! 🙂`);
  ctx.reply(use_subsidy, start);
});

bot.hears("« Отмена", (ctx) => {
  oktomo_code = null;
  selected_city[ctx.chat.id] = null;
  selected_al[ctx.chat.id] = null;
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
  ctx.reply(cancel_caption, start);
});

bot.hears("Начать опрос", (ctx) => {
  ctx.reply(select_municipal_or_city, main_menu);
});

bot.hears("Муниципальный район", (ctx) => {
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
    ctx.deleteMessage();
    selected_al[ctx.chat.id] = al_id[al];
    oktomo_code = selected_al[ctx.chat.id];
    ctx.reply(`Вы выбрали населенный пункт: ${al_name[al]}`, cancel_btn);
    ctx.reply("Нажмите 👇", next_people_btn);
    console.log("Насел.пункт: ", selected_al);
  });
});

bot.hears("Городской округ", (ctx) => {
  ctx.reply(select_city, city_area);
});

// запомнить значение 'Городской округ'
Object.keys(city_id).forEach((city) => {
  bot.action(city, async (ctx) => {
    ctx.deleteMessage();
    selected_city[ctx.chat.id] = city_id[city];
    oktomo_code = selected_city[ctx.chat.id];
    await ctx.reply(`Вы выбрали город: ${city_name[city]}`, cancel_btn);
    await ctx.reply(select_people);
    console.log("город: ", selected_city);
    step = 1;
  });
});

bot.hears("Да", (ctx) => {
  ctx.deleteMessage();
  ctx.reply(select_benefit_size, cancel_btn);
  step = 8;
});

bot.hears("Нет", (ctx) => {
  selected_benefit[ctx.chat.id] = 0;
  console.log("льгота: ", selected_benefit);
  ctx.reply(select_season, cancel_btn);
  ctx.reply("Нажмите 👇", num_season);
});

bot.on("text", (ctx) => {
  if (step === 1) {
    selected_people[ctx.chat.id] = parseInt(ctx.message.text);
    console.log("люди:", selected_people);
    ctx.reply(select_work);
    step = 2;
  } else if (step === 2) {
    selected_work[ctx.chat.id] = parseInt(ctx.message.text);
    console.log("работяги:", selected_work);
    step = state(
      selected_people[ctx.chat.id],
      selected_work[ctx.chat.id],
      0,
      0,
      ctx,
      step,
      select_salary,
      select_old,
      3,
      2
    );
    console.log(step);
  } else if (step === 3) {
    selected_old[ctx.chat.id] = parseInt(ctx.message.text);
    console.log("старики:", selected_old);
    step = state(
      selected_people[ctx.chat.id],
      selected_work[ctx.chat.id],
      selected_old[ctx.chat.id],
      0,
      ctx,
      step,
      select_salary,
      select_kid,
      4,
      3
    );
  } else if (step === 4) {
    selected_kid[ctx.chat.id] = parseInt(ctx.message.text);
    console.log("дети:", selected_old);
    step = state(
      selected_people[ctx.chat.id],
      selected_work[ctx.chat.id],
      selected_old[ctx.chat.id],
      selected_kid[ctx.chat.id],
      ctx,
      step,
      select_salary,
      select_salary,
      5,
      4
    );
  } else if (step === 5) {
    selected_salary[ctx.chat.id] = parseInt(ctx.message.text);
    console.log("зп:", selected_salary);
    ctx.reply(select_jkh);
    step = 6;
  } else if (step === 6) {
    selected_jkh[ctx.chat.id] = parseInt(ctx.message.text);
    console.log("жкх:", selected_jkh);
    ctx.reply(select_electric);
    step = 7;
  } else if (step === 7) {
    selected_electric[ctx.chat.id] = parseInt(ctx.message.text);
    console.log("электричество':", selected_electric);
    ctx.reply(select_benefit, num_benefit);
  } else if (step === 8) {
    selected_benefit[ctx.chat.id] = parseInt(ctx.message.text);
    console.log("размер льготы:", selected_benefit);
    ctx.reply(select_season, num_season);
  }
});

// запомнить значение 'Период'
Object.keys(season_id).forEach((season) => {
  bot.action(season, async (ctx) => {
    ctx.deleteMessage();
    if (oktomo_code === null) {
      await ctx.reply("Начните опрос заново 👇");
    } else {
      selected_season[ctx.chat.id] = season_id[season];
      await ctx.reply(`Вы выбрали период: ${season_name[season]}`, cancel_btn);
      console.log(selected_season);

      if (selected_people[ctx.chat.id] > 5) {
        selected_people[ctx.chat.id] = 5;
      }
      if (selected_people[ctx.chat.id] === 1) {
        await ctx.reply(select_standard, num_standard_1);
      } else {
        await ctx.reply(select_standard, num_standard);
      }
    }
  });
});

// запомнить значение 'Стандарт'
Object.keys(standard_id).forEach((standard) => {
  bot.action(standard, async (ctx) => {
    ctx.deleteMessage();
    if (oktomo_code === null) {
      ctx.reply("Начните опрос заново 👇");
    } else {
      selected_standard[ctx.chat.id] = standard_id[standard];
      await ctx.reply(
        `Вы выбрали стандарт: ${standard_id[standard]}`,
        cancel_btn
      );
      await ctx.reply("Нажмите 👇", post_btn);
      console.log(selected_standard);
    }
  });
});

// кнопка отправить POST
bot.action("post", async (ctx) => {
  ctx.deleteMessage();
  if (oktomo_code === null) {
    ctx.reply("Начните опрос заново 👇");
  } else {
    ctx.reply("Пожалуйста подождите . . .");
    const data = await search(
      oktomo_code,
      selected_people[ctx.chat.id],
      selected_season[ctx.chat.id]
    );
    let x = {};
    let get_data = [];
    let arr_data = [];
    let word_mas = [];
    let chunk_arr = [];
    let word_for_many = [
      ["продолжительности", "периода"],
      ["12", "года"],
      ["печным", "отоплением"],
    ];
    let word_for_one = [
      ["отопительного", "33"],
      ["отопительного", "42"],
      ["12", "33"],
      ["12", "42"],
      ["печным", "33"],
      ["печным", "42"],
    ];

    if (selected_people[ctx.chat.id] > 1) {
      x = 3;
      chunk_arr = word_for_many[selected_standard[ctx.chat.id]].slice(0, 3);
    } else if (selected_people[ctx.chat.id] === 1) {
      x = 6;
      chunk_arr = word_for_one[selected_standard[ctx.chat.id]].slice(0, 3);
    }
    console.log(chunk_arr);

    for (var i = 0; i < x; i++) {
      arr_data[i] = data.rates[i];
      word_mas[i] = arr_data[i].diffCriteria.split(" ");
      console.log(
        word_mas[i].includes(chunk_arr[0]) && word_mas[i].includes(chunk_arr[1])
      );
    }
    console.log(word_mas);

    if (
      word_mas[0].includes(chunk_arr[0]) &&
      word_mas[0].includes(chunk_arr[1]) === true
    ) {
      get_data = data.rates[0];
    } else if (
      word_mas[1].includes(chunk_arr[0]) &&
      word_mas[1].includes(chunk_arr[1]) === true
    ) {
      get_data = data.rates[1];
    } else if (
      word_mas[2].includes(chunk_arr[0]) &&
      word_mas[2].includes(chunk_arr[1]) === true
    ) {
      get_data = data.rates[2];
    } else if (
      word_mas[3].includes(chunk_arr[0]) &&
      word_mas[3].includes(chunk_arr[1]) === true
    ) {
      get_data = data.rates[3];
    } else if (
      word_mas[4].includes(chunk_arr[0]) &&
      word_mas[4].includes(chunk_arr[1]) === true
    ) {
      get_data = data.rates[4];
    } else if (
      word_mas[5].includes(chunk_arr[0]) &&
      word_mas[5].includes(chunk_arr[1]) === true
    ) {
      get_data = data.rates[5];
    }

    console.log(get_data.diffCriteria);
    console.log(get_data.value);

    jku = get_data.value * selected_people[ctx.chat.id]; // жку
    jkh_total = // жкх итого
      selected_jkh[ctx.chat.id] +
      selected_electric[ctx.chat.id] -
      selected_benefit[ctx.chat.id];
    total_family_sum = selected_salary[ctx.chat.id] / 6; // совоокупный доход
    pm = // прожиточный минимумыы
      selected_work[ctx.chat.id] * 12702 +
      selected_old[ctx.chat.id] * 10022 +
      selected_kid[ctx.chat.id] * 11303;
    max_costs = (total_family_sum / pm) * 0.12 * total_family_sum; // макс.допуст.расх

    // Размер субсидии = Расходы на ЖКХ (ИТОГО)  - Максимально допустимая доля расходов 12%
    sum_subsidy = jkh_total - max_costs * 0.12;

    a = jkh_total > max_costs;
    b = total_family_sum > pm;
    c = jkh_total >= (0.22 * total_family_sum) / 6;
    d = jku - (0.22 * total_family_sum) / 6 > 0;

    result = b && c && d;

    subsidy(a, result, info, ctx);

    console.log(a, b, c, d);
    console.log("Критерий: ", get_data.diffCriteria);
    console.log("Значение критерия: ", get_data.value);
    console.log("Значение ЖКУ равно: ", jku);
    console.log("ЖКХ итого:", jkh_total);
    console.log("Совокупный доход:", total_family_sum);
    console.log("ПМ:", pm);
    console.log("макс.доля.расх:", max_costs);
  }
});

bot.launch();
