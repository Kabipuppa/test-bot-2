require('dotenv').config();
const { Telegraf } = require('telegraf');
const axios = require('axios');
const util = require('util');
const { search } = require('../helpers/api');
const {TELEGRAM_BOT_TOKEN} = process.env
const bot = new Telegraf(process.env.BOT_TOKEN);

//команда start
bot.start((ctx) =>{
  ctx.reply('Здравствуйте! 🙂 Вас приветствует чат-бот "Калькулятор субсидии".  Данный расчет носит информативный характер. По вопросам окончательного решения необходимо обратиться в управление социальной поддержки населения по месту жительства.');
  ctx.reply('Для начала опроса используйте команду /subsidy.');
})

//команда subsidy
bot.command('subsidy', (ctx)=>{
  ctx.reply('Выберите муниципальный район или городской округ:',
  {
      reply_markup:{
          inline_keyboard: [
              [{text:'Муниципальный район', callback_data:'mn'}],
              [{text:'Городской округ', callback_data:'gr'}],  
          ]
      }
  });
});

//обработка выбранной кнопки 'Муниципальный район'
bot.action('mn', (ctx) =>{
  ctx.deleteMessage();
  ctx.reply('Выберите муниципальный район:',
  {
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
  });
})

const city_id = {
  Abakan: '95701000',
  Abaza: '95702000',
  Sayanogorsk: '95708000',
  Sorsk: '95709000',
  Chernogorsk: '95715000',
}

//обработка выбранной кнопки 'Городской округ'
bot.action('gr', (ctx) =>{
  ctx.deleteMessage();
  ctx.reply('Выберите городской округ:',
  {
      reply_markup:{
          inline_keyboard: [
              [{text:'Назад в меню', callback_data:'go-back'}],
              [{text:'город Абакан', callback_data:'Abakan'}],
              [{text:'город Абаза', callback_data:'Abaza'}],
              [{text:'город Саяногорск', callback_data:'Sayanogorsk'}], 
              [{text:'город Сорск', callback_data:'Sorsk'}],
              [{text:'город Черногорск', callback_data:'Chernogorsk'}],
          ]
      }
  });
})

//обработка выбранной кнопки 'Назад'
bot.action('go-back', (ctx) => {
  ctx.deleteMessage();
  ctx.reply('subsidy its true',
  {
      reply_markup:{
          inline_keyboard: [
              [{text:'Муниципальный район', callback_data:'mn'}],
              [{text:'Городской округ', callback_data:'gr'}],  
          ]
      }
  });
})

// тут был post запрос к api

Object.keys(city_id).forEach(city => {
  bot.action(city, async ctx =>{
    const data = await search(city_id[city])
    get_data = data.rates[0];
    calc = get_data.value + 1000;
    console.log(calc);
  })
})


//Запуск бота
bot.launch();
