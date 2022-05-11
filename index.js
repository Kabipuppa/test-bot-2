require("dotenv").config();
const { Telegraf, Extra } = require("telegraf");
const util = require("util");
const { search } = require("./helpers/api");
const {
  city_id,
  city_name,
  al_id,
  al_name,
  benefit_id,
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
  num_people,
  num_work,
  num_old,
  num_kid,
  num_salary,
  num_jkh,
  num_electric,
  num_benefit,
  num_benefit_size,
  num_season,
  next_standard_btn,
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
  select_people_completed,
  select_work_completed,
  select_old_completed,
  select_kid_completed,
  select_salary_completed,
  select_jkh_completed,
  select_electric_completed,
  select_benefit_completed,
  select_benefit_size_completed,
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
  bot.action(city, (ctx) => {
    ctx.deleteMessage();
    selected_city[ctx.chat.id] = city_id[city];
    oktomo_code = selected_city[ctx.chat.id];
    ctx.reply(`Вы выбрали город: ${city_name[city]}`, cancel_btn);
    ctx.reply("Нажмите 👇", next_people_btn);
    console.log("город: ", selected_city);
  });
});

// обработка выбранной кнопки 'Кол-во человек'
bot.action("next_people", (ctx) => {
  ctx.deleteMessage();
  if (oktomo_code === null) {
    ctx.reply("Начните опрос заново 👇");
  } else {
    ctx.reply(select_people);
    step = 1;
  }
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

// обработка выбранной кнопки 'зп'
bot.action("next_salary", (ctx) => {
  ctx.deleteMessage();
  ctx.reply(select_salary);
  step = 5;
});

bot.action("next_jkh", (ctx) => {
  ctx.deleteMessage();
  ctx.reply(select_jkh);
  step = 6;
});

bot.action("next_electric", (ctx) => {
  ctx.deleteMessage();
  ctx.reply(select_electric);
  step = 7;
});

bot.action("next_benefit", (ctx) => {
  ctx.deleteMessage();
  ctx.reply(select_benefit, num_benefit);
});

bot.hears("Да", (ctx) => {
  ctx.reply(select_benefit_size, cancel_btn);
  step = 8;
});

bot.hears("Нет", (ctx) => {
  selected_benefit[ctx.chat.id] = 0;
  console.log("льгота: ", selected_benefit);
  ctx.reply(select_season, cancel_btn);
  ctx.reply("Нажмите 👇", num_season);
});

function state(a, b, c, d, completed, num, ctx) {
  value = a - b - c - d;
  sum = b + c + d;
  if (value === 0) {
    ctx.reply(completed, num_kid);
  } else if (step === 4 && a != sum) {
    ctx.reply(
      "Введенное число не соответствет количеству человек в вашей семье."
    );
  } else if (value > 0) {
    ctx.reply(completed, num);
  } else {
    ctx.reply(
      "Введенное число не соответствет количеству человек в вашей семье."
    );
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
      ctx
    );
  } else if (step === 5) {
    selected_salary[ctx.chat.id] = parseInt(ctx.message.text);
    console.log("зп:", selected_salary);
    ctx.reply(select_salary_completed, num_salary);
  } else if (step === 6) {
    selected_jkh[ctx.chat.id] = parseInt(ctx.message.text);
    console.log("жкх:", selected_jkh);
    ctx.reply(select_jkh_completed, num_jkh);
  } else if (step === 7) {
    selected_electric[ctx.chat.id] = parseInt(ctx.message.text);
    console.log("электричество':", selected_electric);
    ctx.reply(select_electric_completed, num_electric);
  } else if (step === 8) {
    selected_benefit[ctx.chat.id] = parseInt(ctx.message.text);
    console.log("размер льготы:", selected_benefit);
    ctx.reply(select_benefit_size_completed, num_benefit_size);
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
    ctx.deleteMessage();
    selected_season[ctx.chat.id] = season_id[season];
    ctx.reply(`Вы выбрали период: ${season_name[season]}`, cancel_btn);
    ctx.reply("Нажмите 👇", next_standard_btn);
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
    ctx.deleteMessage();
    selected_standard[ctx.chat.id] = standard_id[standard];
    ctx.reply(`Вы выбрали стандарт: ${standard_id[standard]}`, cancel_btn);
    ctx.reply(
      "Пожалуйста, для получения ответа от бота нажмите <b>«Отправить ответ о субсидии»</b> 👇 и немного подождите . . .",
      post_btn
    );
    console.log(selected_standard);
  });
});

// кнопка отправить POST
bot.action("post", async (ctx) => {
  const data = await search(
    oktomo_code,
    selected_people[ctx.chat.id],
    selected_season[ctx.chat.id]
  );
  get_data = data.rates[selected_standard[ctx.chat.id]]; // ошибка
  jku = get_data.value * selected_people[ctx.chat.id];
  jkh_total =
    selected_jkh[ctx.chat.id] +
    selected_electric[ctx.chat.id] -
    selected_benefit[ctx.chat.id];
  total_family_sum = selected_salary[ctx.chat.id] / 6;
  pm =
    selected_work[ctx.chat.id] * 12702 +
    selected_old[ctx.chat.id] * 10022 +
    selected_kid[ctx.chat.id] * 11303;
  max_costs = (total_family_sum / pm) * 0.12 * total_family_sum;

  a = jkh_total > max_costs;
  b = total_family_sum > pm;
  c = jkh_total >= (0.22 * total_family_sum) / 6;
  d = jku - (0.22 * total_family_sum) / 6 > 0;

  result = b && c && d;

  if (a == true) {
    ctx.reply("Субсидия положена! 🟢", info);
  } else {
    if (result == true) {
      ctx.reply("Субсидия положена! 🟢", info);
    } else {
      ctx.reply("Субсидия не положена! 🟠", info);
    }
  }

  console.log(a, b, c, d);
  console.log("Критерий: ", get_data.diffCriteria);
  console.log("Значение критерия: ", get_data.value);
  console.log("Значение ЖКУ равно: ", jku);
  console.log("ЖКХ итого:", jkh_total);
  console.log("Совокупный доход:", total_family_sum);
  console.log("ПМ:", pm);
  console.log("макс.доля.расх:", max_costs);
});

bot.launch();
