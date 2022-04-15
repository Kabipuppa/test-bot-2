const main_menu = {
    reply_markup:{
        inline_keyboard: [
            [{text:'Муниципальный район', callback_data:'mn'},
            {text:'Городской округ', callback_data:'gr'}],  
        ]
    }
};

const municipal_area = {
    reply_markup:{
        inline_keyboard: [
            [{text:'Назад в меню', callback_data:'go-back'}],
            [{text:'Алтайский муниципальный район', callback_data:'al'}],
            [{text:'Аскизский муниципальный район', callback_data:'as'}], 
            [{text:'Бейский муниципальный район', callback_data:'be'}],   
            [{text:'Боградский муниципальный район', callback_data:'bo'}],
            [{text:'Орджоникидзевский муниципальный район', callback_data:'or'}],
            [{text:'Таштыпский муниципальный район', callback_data:'ta'}],
            [{text:'Усть-Абаканский муниципальный район', callback_data:'ya'}],
            [{text:'Ширинский муниципальный район', callback_data:'sr'}],
        ]
    }
};

const city_area = {
    reply_markup:{
        inline_keyboard: [
            [{text:'Назад в меню', callback_data:'go-back'}],
            [{text:'город Абакан', callback_data:'Abakan'}],
            [{text:'город Абаза', callback_data:'Abaza'}],
            [{text:'город Саяногорск', callback_data:'Sayanogorsk'}], 
            [{text:'город Сорск', callback_data:'Sorsk'}],
            [{text:'город Черногорск', callback_data:'Chernogorsk'}],
            [{text:'Следующий вопрос про людей', callback_data:'next_people'}],
        ]
    }
}

const num_people = {
    reply_markup:{
        inline_keyboard: [
            [{text:'Назад в меню', callback_data:'go-back'}],
            [{text:'1', callback_data:'one'},
            {text:'2', callback_data:'two'}],
            [{text:'3', callback_data:'three'},
            {text:'4', callback_data:'four'}], 
            [{text:'5 и более', callback_data:'five'}],
            [{text:'Следующий вопрос про период', callback_data:'next_season_1'}], // ошибка
        ]
    }
}

const num_season = {
    reply_markup:{
        inline_keyboard: [
            [{text:'Назад в меню' , callback_data:'go-back'}],
            [{text:'В отопительный период', callback_data:'hot_period'},
            {text:'Вне отопительного периода', callback_data:'cold_period'}],
            [{text:'Выбрать стандарт', callback_data:'select_standard'}],
        ]
    }
}

const num_season_1 = {
    reply_markup:{
        inline_keyboard: [
            [{text:'Назад в меню' , callback_data:'go-back'}],
            [{text:'В отопительный период', callback_data:'hot_period'},
            {text:'Вне отопительного периода', callback_data:'cold_period'}],
            [{text:'Выбрать стандарт', callback_data:'select_standard_1'}],
        ]
    }
}

const num_standard = {
    reply_markup:{
        inline_keyboard: [
            [{text:'Назад в меню' , callback_data:'go-back'}],
            [{
                text:'При оплате коммунальных услуг из расчета 12 месяцев календарного года',
                callback_data:'one'
            }],
            [{
                text:'При оплате коммунальных услуг за жилые помещения с печным отоплением',
                callback_data:'two'
            }],
            [{
                text:'При оплате коммунальных услуг с учетом продолжительности отопительного периода',
                callback_data:'three'
            }],
            [{text:'Отправить POST запрос', callback_data:'post'}],
        ]
    }
}

const num_standard_1 = {
    reply_markup:{
        inline_keyboard: [
            [{text:'Назад в меню' , callback_data:'go-back'}],
            [{
                text:'При оплате коммунальных услуг с учетом продолжительности отопительного периода 33 кв.м',
                callback_data:'a'
            }],
            [{
                text:'При оплате коммунальных услуг за жилые помещения с печным отоплением 42 кв.м',
                callback_data:'b'
            }],
            [{
                text:'При оплате коммунальных услуг из расчета 12 месяцев календарного года 33 кв.м',
                callback_data:'c'
            }],
            [{
                text:'При оплате коммунальных услуг за жилые помещения с печным отоплением 33 кв.м',
                callback_data:'d'
            }],
            [{
                text:'При оплате коммунальных услуг с учетом продолжительности отопительного периода 42 кв.м',
                callback_data:'e'
            }],
            [{
                text:'При оплате коммунальных услуг из расчета 12 месяцев календарного года 42 кв.м',
                callback_data:'f'
            }],
            [{text:'Отправить POST запрос', callback_data:'post'}],
        ]
    }
}

module.exports = {
    main_menu,
    municipal_area,
    city_area,
    num_people,
    num_season,
    num_season_1,
    num_standard,
    num_standard_1,
};