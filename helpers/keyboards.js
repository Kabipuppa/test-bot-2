const main_menu = {
  reply_markup: {
    inline_keyboard: [
      [{ text: "Муниципальный район", callback_data: "mn" }],
      [{ text: "Городской округ", callback_data: "gr" }],
    ],
  },
};

const municipal_area = {
  reply_markup: {
    inline_keyboard: [
      [{ text: "« Назад в меню 🟢", callback_data: "go-back" }],
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
      [{ text: "« Назад в меню 🟢", callback_data: "go-back" }],
      [{ text: "Аршаново", callback_data: "Arshanovo" }],
      [{ text: "Белый Яр", callback_data: "BelyyYar" }],
      [{ text: "Изыхские Копи", callback_data: "Izykhskiye" }],
      [{ text: "Кирово", callback_data: "Kirovo" }],
      [{ text: "Краснополье", callback_data: "Krasno" }],
      [{ text: "Новомихайловка", callback_data: "Novomikh" }],
      [{ text: "Новороссийское", callback_data: "Novoros" }],
      [{ text: "Очуры", callback_data: "Ochury" }],
      [{ text: "Подсинее", callback_data: "Podsineye" }],
      [{ text: "🟢 Следующий вопрос »", callback_data: "next_people" }],
    ],
  },
};

const city_area = {
  reply_markup: {
    inline_keyboard: [
      [{ text: "« Назад в меню 🟢", callback_data: "go-back" }],
      [{ text: "Абакан", callback_data: "Abakan" }],
      [{ text: "Абаза", callback_data: "Abaza" }],
      [{ text: "Саяногорск", callback_data: "Sayanogorsk" }],
      [{ text: "Сорск", callback_data: "Sorsk" }],
      [{ text: "Черногорск", callback_data: "Chernogorsk" }],
      [{ text: "🟢 Следующий вопрос »", callback_data: "next_people" }],
    ],
  },
  parse_mode: "html",
};

const num_people = {
  reply_markup: {
    inline_keyboard: [
      [{ text: "« Назад в меню 🟢", callback_data: "go-back" }],
      [{ text: "🟢 Следующий вопрос »", callback_data: "next_work" }],
    ],
  },
};

const num_work = {
  reply_markup: {
    inline_keyboard: [
      [{ text: "« Назад в меню 🟢", callback_data: "go-back" }],
      [{ text: "🟢 Следующий вопрос »", callback_data: "next_old" }],
    ],
  },
};

const num_old = {
  reply_markup: {
    inline_keyboard: [
      [{ text: "« Назад в меню 🟢", callback_data: "go-back" }],
      [{ text: "🟢 Следующий вопрос »", callback_data: "next_kid" }],
    ],
  },
};

const num_kid = {
  reply_markup: {
    inline_keyboard: [
      [{ text: "« Назад в меню 🟢", callback_data: "go-back" }],
      [{ text: "🟢 Следующий вопрос »", callback_data: "next_salary" }],
    ],
  },
};

const num_salary = {
  reply_markup: {
    inline_keyboard: [
      [{ text: "« Назад в меню 🟢", callback_data: "go-back" }],
      [{ text: "🟢 Следующий вопрос »", callback_data: "next_season" }],
    ],
  },
};

const num_season = {
  reply_markup: {
    inline_keyboard: [
      [{ text: "« Назад в меню 🟢", callback_data: "go-back" }],
      [
        { text: "Отопительный", callback_data: "hot_period" },
        { text: "Неотопительный", callback_data: "cold_period" },
      ],
      [{ text: "🟢 Следующий вопрос »", callback_data: "next_standard" }],
    ],
  },
};

const num_standard = {
  reply_markup: {
    inline_keyboard: [
      [{ text: "« Назад в меню 🟢", callback_data: "go-back" }],
      [
        {
          text: "При оплате коммунальных услуг из расчета 12 месяцев календарного года",
          callback_data: "a",
        },
      ],
      [
        {
          text: "При оплате коммунальных услуг за жилые помещения с печным отоплением",
          callback_data: "b",
        },
      ],
      [
        {
          text: "При оплате коммунальных услуг с учетом продолжительности отопительного периода",
          callback_data: "c",
        },
      ],
      [{ text: "Отправить POST запрос", callback_data: "post" }],
    ],
  },
};

const num_standard_1 = {
  reply_markup: {
    inline_keyboard: [
      [{ text: "« Назад в меню 🟢", callback_data: "go-back" }],
      [
        {
          text: "При оплате коммунальных услуг с учетом продолжительности отопительного периода 33 кв.м",
          callback_data: "a",
        },
      ],
      [
        {
          text: "При оплате коммунальных услуг за жилые помещения с печным отоплением 42 кв.м",
          callback_data: "b",
        },
      ],
      [
        {
          text: "При оплате коммунальных услуг из расчета 12 месяцев календарного года 33 кв.м",
          callback_data: "c",
        },
      ],
      [
        {
          text: "При оплате коммунальных услуг за жилые помещения с печным отоплением 33 кв.м",
          callback_data: "d",
        },
      ],
      [
        {
          text: "При оплате коммунальных услуг с учетом продолжительности отопительного периода 42 кв.м",
          callback_data: "e",
        },
      ],
      [
        {
          text: "При оплате коммунальных услуг из расчета 12 месяцев календарного года 42 кв.м",
          callback_data: "f",
        },
      ],
      [{ text: "Отправить POST запрос", callback_data: "post" }],
    ],
  },
};

module.exports = {
  main_menu,
  municipal_area,
  city_area,
  al_area,
  num_people,
  num_work,
  num_old,
  num_kid,
  num_salary,
  num_season,
  num_standard,
  num_standard_1,
};
