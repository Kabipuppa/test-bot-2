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
            [{text:'Следующий вопрос про период', callback_data:'next_season'}],
        ]
    }
}

const num_season = {
    reply_markup:{
        inline_keyboard: [
            [{text:'Назад в меню' , callback_data:'go-back'}],
            [{text:'В отопительный период', callback_data:'hot_period'},
            {text:'Вне отопительного периода', callback_data:'cold_period'}],
            [{text:'Отправить POST запрос', callback_data:'post'}],
        ]
    }
}

// const num_standard = {
//     reply_markup:{
//         inline_keyboard: [
//             [{text:'Назад в меню' , callback_data:'go-back'}],
//             [{text:'Отправить POST запрос', callback_data:'post'}],
//         ]
//     }
// }

module.exports = {
    main_menu,
    municipal_area,
    city_area,
    num_people,
    num_season,
};