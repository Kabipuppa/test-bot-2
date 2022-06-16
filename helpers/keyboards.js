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
      [{ text: "Бейский", callback_data: "bei" }],
      [{ text: "Боградский", callback_data: "bog" }],
      [{ text: "Орджоникидзевский", callback_data: "ord" }],
      [{ text: "Таштыпский", callback_data: "tash" }],
      [{ text: "Усть-Абаканский", callback_data: "ust" }],
      [{ text: "Ширинский", callback_data: "shir" }],
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

const as_area = {
  reply_markup: {
    inline_keyboard: [
      [{ text: "рп Аскиз", callback_data: "rp_Askiz" }],
      [{ text: "рп Бискамжа", callback_data: "rp_Biscamzha" }],
      [{ text: "рп Вершина Теи", callback_data: "rp_Thei" }],
      [{ text: "с Аскиз", callback_data: "s_Askiz" }],
      [{ text: "с Балыкса", callback_data: "s_Balyksa" }],
      [{ text: "с Нижняя База", callback_data: "Lower_Base" }],
      [{ text: "с Бельтирское", callback_data: "Beltirskoe" }],
      [{ text: "с Бирикчуль", callback_data: "Birikchul" }],
      [{ text: "с Верх-Аскиз", callback_data: "Upper_Askiz" }],
      [{ text: "с Полтаков", callback_data: "Poltakov" }],
      [{ text: "с Кызлас", callback_data: "Kyzlas" }],
      [{ text: "с Пуланколь", callback_data: "Pulancol" }],
      [{ text: "с Усть-Камышта", callback_data: "Ust_Kamyshta" }],
      [{ text: "с Усть-Чуль", callback_data: "Ust_Chul" }],
    ],
  },
};

const bei_area = {
  reply_markup: {
    inline_keyboard: [
      [{ text: "с Бея", callback_data: "s_Beya" }],
      [{ text: "с Большой Монок", callback_data: "s_Monok" }],
      [{ text: "с Бондарево", callback_data: "s_Bondarevo" }],
      [{ text: "с Кирба", callback_data: "s_Kirba" }],
      [{ text: "с Куйбышево", callback_data: "s_Kuybyshevo" }],
      [{ text: "с Новоенисейка", callback_data: "s_Novoyeniseyka" }],
      [{ text: "с Сабинка", callback_data: "s_Sabinka" }],
      [{ text: "с Табат", callback_data: "s_Tabat" }],
    ],
  },
};

const bog_area = {
  reply_markup: {
    inline_keyboard: [
      [{ text: "с Троицкое", callback_data: "s_Troitskoye" }],
      [{ text: "с Боград", callback_data: "s_Bograd" }],
      [{ text: "с Большая Ерба", callback_data: "s_Erba" }],
      [{ text: "с Бородино", callback_data: "s_Borodino" }],
      [{ text: "с Знаменка", callback_data: "s_Znamenka" }],
      [{ text: "с Первомайское", callback_data: "s_Pervomayskoye" }],
      [{ text: "с Пушное", callback_data: "s_Pushnoye" }],
      [{ text: "с Сарагаш", callback_data: "s_Saragash" }],
      [{ text: "с Советская Хакасия", callback_data: "s_Sovetskaya" }],
      [{ text: "с Сонское", callback_data: "s_Sonskoye" }],
    ],
  },
};

const ord_area = {
  reply_markup: {
    inline_keyboard: [
      [{ text: "п Копьево", callback_data: "p_Kopevo" }],
      [{ text: "п Гайдаровск", callback_data: "p_Gaydarovsk" }],
      [{ text: "с Копьево", callback_data: "s_Kopevo" }],
      [{ text: "с Июс", callback_data: "s_Iyus" }],
      [{ text: "с Новомарьясово", callback_data: "s_Novomaryasovo" }],
      [{ text: "с Орджоникидзевское", callback_data: "s_Ordzhonikidzevskoye" }],
      [{ text: "с Приисковое", callback_data: "s_Priiskovoye" }],
      [{ text: "с Сарала", callback_data: "s_Sarala" }],
      [{ text: "с Устинкино", callback_data: "s_Ustinkino" }],
    ],
  },
};

const tash_area = {
  reply_markup: {
    inline_keyboard: [
      [{ text: "с Анчул", callback_data: "s_Anchul" }],
      [{ text: "с Арбаты", callback_data: "s_Arbaty" }],
      [{ text: "с Большая Сея", callback_data: "s_Seya" }],
      [{ text: "д Бутрахты", callback_data: "d_Butrakhtyo" }],
      [{ text: "с Имек", callback_data: "s_Imek" }],
      [{ text: "с Матур", callback_data: "s_Matur" }],
      [{ text: "с Нижние Сиры", callback_data: "s_Nizhniye_Siry" }],
      [{ text: "с Таштып", callback_data: "s_Tashtyp" }],
    ],
  },
};

const ust_area = {
  reply_markup: {
    inline_keyboard: [
      [{ text: "рп Усть-Абакан", callback_data: "rp_Ust_Abakan" }],
      [{ text: "с Вершино-Биджа", callback_data: "s_Vershino_Bidzha" }],
      [{ text: "с Весеннее", callback_data: "s_Vesenneye" }],
      [{ text: "аал Доможаков", callback_data: "aal_Domozhakov" }],
      [{ text: "с Калинино", callback_data: "s_Kalinino" }],
      [{ text: "с Московское", callback_data: "s_Moskovskoye" }],
      [{ text: "с Зеленое", callback_data: "s_Zelenoye" }],
      [{ text: "аал Райков", callback_data: "aal_Raykov" }],
      [{ text: "п Расцвет", callback_data: "p_Rastsvet" }],
      [{ text: "аал Сапогов", callback_data: "aal_Sapogov" }],
      [{ text: "с Солнечное", callback_data: "s_Solnechnoye" }],
      [{ text: "с Усть-Бюр", callback_data: "s_Ust_Byur" }],
      [{ text: "аал Чарков", callback_data: "aal_Charkov" }],
    ],
  },
};

const shir_area = {
  reply_markup: {
    inline_keyboard: [
      [{ text: "с Коммунар", callback_data: "s_Kommunar" }],
      [{ text: "с Туим", callback_data: "s_Tuim" }],
      [{ text: "с Шира", callback_data: "s_Shira" }],
      [{ text: "п Беренжак", callback_data: "p_Berenzhak" }],
      [{ text: "с Борец", callback_data: "s_Borets" }],
      [{ text: "с Ворота", callback_data: "s_Vorota" }],
      [{ text: "с Джирим", callback_data: "s_Dzhirim" }],
      [{ text: "с Ефремкино", callback_data: "s_Yefremkino" }],
      [{ text: "п Жемчужный", callback_data: "p_Zhemchuzhnyy" }],
      [{ text: "с Сон", callback_data: "s_Son" }],
      [{ text: "с Соленоозерное", callback_data: "s_Solenoozernoye" }],
      [{ text: "аал Малый Спирин", callback_data: "aal_Malyy_Spirin" }],
      [{ text: "с Фыркал", callback_data: "s_Fyrkal" }],
      [{ text: "с Целинное", callback_data: "s_Tselinnoye" }],
      [{ text: "с Черное Озеро", callback_data: "s_Chernoye_Ozero" }],
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
  bei_area,
  bog_area,
  ord_area,
  tash_area,
  ust_area,
  shir_area,
  num_benefit,
  num_season,
  post_btn,
};
