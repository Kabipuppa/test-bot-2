const start = {
  reply_markup: {
    keyboard: [[{ text: "Начать опрос" }]],
    resize_keyboard: true,
  },
  parse_mode: "html",
};

const cancel_btn = {
  reply_markup: {
    keyboard: [[{ text: "« Отмена" }]],
    resize_keyboard: true,
  },
};

const main_menu = {
  reply_markup: {
    keyboard: [
      [{ text: "Муниципальный район" }],
      [{ text: "Городской округ" }],
      [{ text: "« Отмена" }],
    ],
    resize_keyboard: true,
  },
};

const municipal_area = {
  reply_markup: {
    inline_keyboard: [
      [{ text: "Алтайский", callback_data: "al" }],
      [{ text: "Аскизский", callback_data: "as" }],
      [{ text: "Бейский", callback_data: "be" }],
      [{ text: "Боградский", callback_data: "bo" }],
      [{ text: "Орджоникидзевский", callback_data: "or" }],
      [{ text: "Таштыпский", callback_data: "ta" }],
      [{ text: "Усть-Абаканский", callback_data: "ya" }],
      [{ text: "Ширинский", callback_data: "sr" }],
    ],
  },
};

const al_area = {
  reply_markup: {
    inline_keyboard: [
      [{ text: "Аршаново", callback_data: "Arshanovo" }],
      [{ text: "Белый Яр", callback_data: "BelyyYar" }],
      [{ text: "Изыхские Копи", callback_data: "Izykhskiye" }],
      [{ text: "Кирово", callback_data: "Kirovo" }],
      [{ text: "Краснополье", callback_data: "Krasno" }],
      [{ text: "Новомихайловка", callback_data: "Novomikh" }],
      [{ text: "Новороссийское", callback_data: "Novoros" }],
      [{ text: "Очуры", callback_data: "Ochury" }],
      [{ text: "Подсинее", callback_data: "Podsineye" }],
    ],
  },
};

const city_area = {
  reply_markup: {
    inline_keyboard: [
      [{ text: "Абакан", callback_data: "Abakan" }],
      [{ text: "Абаза", callback_data: "Abaza" }],
      [{ text: "Саяногорск", callback_data: "Sayanogorsk" }],
      [{ text: "Сорск", callback_data: "Sorsk" }],
      [{ text: "Черногорск", callback_data: "Chernogorsk" }],
    ],
  },
};

const next_people_btn = {
  reply_markup: {
    inline_keyboard: [
      [{ text: "Следующий вопрос", callback_data: "next_people" }],
    ],
  },
};

const num_people = {
  reply_markup: {
    inline_keyboard: [
      [{ text: "🟢 Следующий вопрос »", callback_data: "next_work" }],
    ],
  },
};

const num_work = {
  reply_markup: {
    inline_keyboard: [
      [{ text: "🟢 Следующий вопрос »", callback_data: "next_old" }],
    ],
  },
};

const num_old = {
  reply_markup: {
    inline_keyboard: [
      [{ text: "🟢 Следующий вопрос »", callback_data: "next_kid" }],
    ],
  },
};

const num_kid = {
  reply_markup: {
    inline_keyboard: [
      [{ text: "🟢 Следующий вопрос »", callback_data: "next_salary" }],
    ],
  },
};

const num_salary = {
  reply_markup: {
    inline_keyboard: [
      [{ text: "🟢 Следующий вопрос »", callback_data: "next_jkh" }],
    ],
  },
};

const num_jkh = {
  reply_markup: {
    inline_keyboard: [
      [{ text: "🟢 Следующий вопрос »", callback_data: "next_electric" }],
    ],
  },
  parse_mode: "html",
};

const num_electric = {
  reply_markup: {
    inline_keyboard: [
      [{ text: "🟢 Следующий вопрос »", callback_data: "next_benefit" }],
    ],
  },
  parse_mode: "html",
};

const num_benefit = {
  reply_markup: {
    keyboard: [[{ text: "Да" }, { text: "Нет" }], [{ text: "« Отмена" }]],
    resize_keyboard: true,
  },
};

const num_benefit_size = {
  reply_markup: {
    inline_keyboard: [
      [{ text: "🟢 Следующий вопрос »", callback_data: "next_season" }],
    ],
  },
};

const num_season = {
  reply_markup: {
    inline_keyboard: [
      [
        { text: "Отопительный", callback_data: "hot_period" },
        { text: "Неотопительный", callback_data: "cold_period" },
      ],
    ],
  },
};

const next_standard_btn = {
  reply_markup: {
    inline_keyboard: [
      [{ text: "🟢 Следующий вопрос »", callback_data: "next_standard" }],
    ],
  },
};

const num_standard = {
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "За жилые помещения с печным отоплением",
          callback_data: "a",
        },
      ],
      [
        {
          text: "С учетом продолжительности отопительного периода",
          callback_data: "b",
        },
      ],
      [
        {
          text: "Из расчета 12 месяцев календарного года",
          callback_data: "c",
        },
      ],
    ],
  },
};

const num_standard_1 = {
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "С учетом продолжительности отопительного периода 33 кв.м",
          callback_data: "a",
        },
      ],
      [
        {
          text: "С учетом продолжительности отопительного периода 42 кв.м",
          callback_data: "b",
        },
      ],
      [
        {
          text: "Из расчета 12 месяцев календарного года 33 кв.м",
          callback_data: "c",
        },
      ],
      [
        {
          text: "Из расчета 12 месяцев календарного года 42 кв.м",
          callback_data: "d",
        },
      ],
      [
        {
          text: "За жилые помещения с печным отоплением 33 кв.м",
          callback_data: "e",
        },
      ],
      [
        {
          text: "За жилые помещения с печным отоплением 42 кв.м",
          callback_data: "f",
        },
      ],
    ],
  },
};

const post_btn = {
  reply_markup: {
    inline_keyboard: [
      [{ text: "Отправить ответ о субсидии", callback_data: "post" }],
    ],
  },
  parse_mode: "html",
};

module.exports = {
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
};
