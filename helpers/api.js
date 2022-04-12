const axios = require('axios');
//Post запрос
const search = async (code) => {
 
    try{
      url = 'https://dom.gosuslugi.ru/tariff/api/rest/services/public-standards/search'
      const response = await axios.post(url, {
        allOktmoLevels: false,
        elementsPerPage: 21,
        fetchAnnulled: false,
        kinds: [
          "COST"
        ],
        oktmoCodes: [
          code
        ],
        pageIndex: 1,
        tariffEntityType: "public_standarts",
        types: ["REGIONAL", "MUNICIPAL"],
      });
  
      searchDataArr = response.data.items
      filterSearchDataArr = searchDataArr.filter(
          item=> item.seasonalityType.name === "В отопительный период"
            &&
          item.familiesNumber.number === 5
        );
      cases = filterSearchDataArr[0];
  
      return (cases);
  
    } catch (e){
      console.error(e);
    }
};

module.exports = {search};