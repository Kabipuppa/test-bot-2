const pm_work = 13286;

const pm_old = 10483;

const pm_kid = 12822;

const city_id = {
  Abakan: "95701000",
  Abaza: "95702000",
  Sayanogorsk: "95708000",
  Sorsk: "95709000",
  Chernogorsk: "95715000",
};

const city_name = {
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

const al_name = {
  Arshanovo: "Аршаново",
  BelyyYar: "Белый Яр",
  Izykhskiye: "Изыхские Копи",
  Kirovo: "Кирово",
  Krasno: "Краснополье",
  Novomikh: "Новомихайловка",
  Novoros: "Новороссийское",
  Ochury: "Очуры",
  Podsineye: "Подсинее",
};

const as_id = {
  rp_Askiz: "95608151",
  rp_Biscamzha: "95608165",
  rp_Thei: "95608169",
  s_Askiz: "95608405",
  s_Balyksa: "95608409",
  Lower_Base: "95608410",
  Beltirskoe: "95608412",
  Birikchul: "95608413",
  Upper_Askiz: "95608415",
  Poltakov: "95608420",
  Kyzlas: "95608430",
  Pulancol: "95608440",
  Ust_Kamyshta: "95608450",
  Ust_Chul: "95608455",
};

const as_name = {
  rp_Askiz: "рп Аскиз",
  rp_Biscamzha: "рп Бискамжа",
  rp_Thei: "рп Вершина Теи",
  s_Askiz: "с Аскиз",
  s_Balyksa: "с Балыкса",
  Lower_Base: "с Нижняя База",
  Beltirskoe: "с Бельтирское",
  Birikchul: "с Бирикчуль",
  Upper_Askiz: "с Верх-Аскиз",
  Poltakov: "с Полтаков",
  Kyzlas: "с Кызлас",
  Pulancol: "с Пуланколь",
  Ust_Kamyshta: "с Усть-Камышта",
  Ust_Chul: "с Усть-Чуль",
};

const bei_id = {
  s_Beya: "95612405",
  s_Monok: "95612410",
  s_Bondarevo: "95612415",
  s_Kirba: "95612425",
  s_Kuybyshevo: "95612430",
  s_Novoyeniseyka: "95612440",
  s_Sabinka: "95612455",
  s_Tabat: "95612460",
};

const bei_name = {
  s_Beya: "с Бея",
  s_Monok: "с Большой Монок",
  s_Bondarevo: "с Бондарево",
  s_Kirba: "с Кирба",
  s_Kuybyshevo: "с Куйбышево",
  s_Novoyeniseyka: "с Новоенисейка",
  s_Sabinka: "с Сабинка",
  s_Tabat: "с Табат",
};

const bog_id = {
  s_Troitskoye: "95615404",
  s_Bograd: "95615410",
  s_Erba: "95615415",
  s_Borodino: "95615420",
  s_Znamenka: "95615430",
  s_Pervomayskoy: "95615440",
  s_Pushnoye: "95615445",
  s_Saragash: "95615450",
  s_Sovetskaya: "95615455",
  s_Sonskoye: "95615460",
};

const bog_name = {
  s_Troitskoye: "с Троицкое",
  s_Bograd: "с Боград",
  s_Erba: "с Большая Ерба",
  s_Borodino: "с Бородино",
  s_Znamenka: "с Знаменка",
  s_Pervomayskoy: "с Первомайское",
  s_Pushnoye: "с Пушное",
  s_Saragash: "с Сарагаш",
  s_Sovetskaya: "с Советская Хакасия",
  s_Sonskoye: "с Сонское",
};

const ord_id = {
  p_Kopevo: "95620403",
  p_Gaydarovsk: "95620405",
  s_Kopevo: "95620420",
  s_Iyus: "95620425",
  s_Novomaryasovo: "95620430",
  s_Ordzhonikidzevskoye: "95620435",
  s_Priiskovoye: "95620437",
  s_Sarala: "95620440",
  s_Ustinkino: "95620450",
};

const ord_name = {
  p_Kopevo: "п Копьево",
  p_Gaydarovsk: "п Гайдаровск",
  s_Kopevo: "с Копьево",
  s_Iyus: "с Июс",
  s_Novomaryasovo: "с Новомарьясово",
  s_Ordzhonikidzevskoye: "с Орджоникидзевское",
  s_Priiskovoye: "с Приисковое",
  s_Sarala: "с Сарала",
  s_Ustinkino: "с Устинкино",
};

const tash_id = {
  s_Anchul: "95625405",
  s_Arbaty: "95625408",
  s_Seya: "95625415",
  d_Butrakhtyo: "95625420",
  s_Imek: "95625422",
  s_Matur: "95625425",
  s_Nizhniye_Siry: "95625430",
  s_Tashtyp: "95625440",
};

const tash_name = {
  s_Anchul: "с Анчул",
  s_Arbaty: "с Арбаты",
  s_Seya: "с Большая Сея",
  d_Butrakhtyo: "д Бутрахты",
  s_Imek: "с Имек",
  s_Matur: "с Матур",
  s_Nizhniye_Siry: "с Нижние Сиры",
  s_Tashtyp: "с Таштып",
};

const ust_id = {
  rp_Ust_Abakan: "95630151",
  s_Vershino_Bidzha: "95630405",
  s_Vesenneye: "95630410",
  aal_Domozhakov: "95630415",
  s_Kalinino: "95630425",
  s_Moskovskoye: "95630430",
  s_Zelenoye: "95630435",
  aal_Raykov: "95630440",
  p_Rastsvet: "95630445",
  aal_Sapogov: "95630455",
  s_Solnechnoye: "95630460",
  s_Ust_Byur: "95630465",
  aal_Charkov: "95630470",
};

const ust_name = {
  rp_Ust_Abakan: "рп Усть-Абакан",
  s_Vershino_Bidzha: "с Вершино-Биджа",
  s_Vesenneye: "с Весеннее",
  aal_Domozhakov: "аал Доможаков",
  s_Kalinino: "с Калинино",
  s_Moskovskoye: "с Московское",
  s_Zelenoye: "с Зеленое",
  aal_Raykov: "аал Райков",
  p_Rastsvet: "п Расцвет",
  aal_Sapogov: "аал Сапогов",
  s_Solnechnoye: "с Солнечное",
  s_Ust_Byur: "с Усть-Бюр",
  aal_Charkov: "аал Чарков",
};

const shir_id = {
  s_Kommunar: "95635401",
  s_Tuim: "95635403",
  s_Shira: "95635404",
  p_Berenzhak: "95635405",
  s_Borets: "95635410",
  s_Vorota: "95635415",
  s_Dzhirim: "95635420",
  s_Yefremkino: "95635425",
  p_Zhemchuzhnyy: "95635430",
  s_Son: "95635435",
  s_Solenoozernoye: "95635438",
  aal_Malyy_Spirin: "95635440",
  s_Fyrkal: "95635450",
  s_Tselinnoye: "95635455",
  s_Chernoye_Ozero: "95635460",
};

const shir_name = {
  s_Kommunar: "с Коммунар",
  s_Tuim: "с Туим",
  s_Shira: "с Шира",
  p_Berenzhak: "п Беренжак",
  s_Borets: "с Борец",
  s_Vorota: "с Ворота",
  s_Dzhirim: "с Джирим",
  s_Yefremkino: "с Ефремкино",
  p_Zhemchuzhnyy: "п Жемчужный",
  s_Son: "с Сон",
  s_Solenoozernoye: "с Соленоозерное",
  aal_Malyy_Spirin: "аал Малый Спирин",
  s_Fyrkal: "с Фыркал",
  s_Tselinnoye: "с Целинное",
  s_Chernoye_Ozero: "с Черное Озеро",
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
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
};

module.exports = {
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
};
