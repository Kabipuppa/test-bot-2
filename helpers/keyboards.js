const start = {
  reply_markup: {
    keyboard: [[{ text: "Начать опрос" }]],
    resize_keyboard: true,
  },
  parse_mode: "html",
};

const cancel_btn = {
  reply_markup: {
    keyboard: [[{ text: "В начало" }]],
    resize_keyboard: true,
  },
};

const main_menu = {
  reply_markup: {
    keyboard: [
      [{ text: "Муниципальный район" }],
      [{ text: "Городской округ" }],
      [{ text: "В начало" }],
    ],
    resize_keyboard: true,
  },
};

const municipal_area = {
  reply_markup: {
    inline_keyboard: [
      [{ text: "Алтайский", callback_data: "al" }],
      [{ text: "Аскизский", callback_data: "as" }],
      // [{ text: "Бейский", callback_data: "be" }],
      // [{ text: "Боградский", callback_data: "bo" }],
      // [{ text: "Орджоникидзевский", callback_data: "or" }],
      // [{ text: "Таштыпский", callback_data: "ta" }],
      // [{ text: "Усть-Абаканский", callback_data: "ya" }],
      // [{ text: "Ширинский", callback_data: "sr" }],
    ],
  },
};

const al_area = {
  reply_markup: {
    inline_keyboard: [
      [{ text: "Аршаново", callback_data: "Arshanovo" }],
      [{ text: "Белый Яр", callback_data: "BelyyYar" }],
      [{ text: "Изыхские Копи", callback_data: "Izykhskiye" }],
      // [{ text: "Кирово", callback_data: "Kirovo" }],
      [{ text: "Краснополье", callback_data: "Krasno" }],
      [{ text: "Новомихайловка", callback_data: "Novomikh" }],
      [{ text: "Новороссийское", callback_data: "Novoros" }],
      [{ text: "Очуры", callback_data: "Ochury" }],
      [{ text: "Подсинее", callback_data: "Podsineye" }],
    ],
  },
};

const as_area = {
  reply_markup: {
    inline_keyboard: [
      [{ text: "рп Аскиз", callback_data: "rp_Askiz" }],
      [{ text: "рп Бискамжа", callback_data: "rp_Biscamzha" }],
      [{ text: "рп Вершина Теи", callback_data: "rp_Thei" }],
      [{ text: "с Аскиз", callback_data: "s_Askiz" }],
      // [{ text: "с Балыкса", callback_data: "s_Balyksa" }],
      [{ text: "с Нижняя База", callback_data: "Lower_Base" }],
      [{ text: "с Бельтирское", callback_data: "Beltirskoe" }],
      [{ text: "с Бирикчуль", callback_data: "Birikchul" }],
      [{ text: "с Верх-Аскиз", callback_data: "Upper_Askiz" }],
      [{ text: "с Полтаков", callback_data: "Poltakov" }],
      [{ text: "с Кызлас", callback_data: "Kyzlas" }],
      // [{ text: "с Пуланколь", callback_data: "Pulancol" }],
      [{ text: "с Усть-Камышта", callback_data: "Ust_Kamyshta" }],
      [{ text: "с Усть-Чуль", callback_data: "Ust_Chul" }],
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

const num_benefit = {
  reply_markup: {
    keyboard: [[{ text: "Да" }, { text: "Нет" }], [{ text: "« Отмена" }]],
    resize_keyboard: true,
  },
};

const num_season = {
  reply_markup: {
    inline_keyboard: [
      [
        { text: "октябрь - март", callback_data: "hot_period" },
        { text: "апрель - сентябрь", callback_data: "cold_period" },
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
  as_area,
  num_benefit,
  num_season,
  post_btn,
};
