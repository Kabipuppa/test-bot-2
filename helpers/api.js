const axios = require("axios");
//Post запрос
const search = async (city, people, season) => {
  try {
    url =
      "https://dom.gosuslugi.ru/tariff/api/rest/services/public-standards/search";
    const response = await axios.post(url, {
      allOktmoLevels: false,
      elementsPerPage: 20,
      fetchAnnulled: false,
      kinds: ["COST"],
      oktmoCodes: [city],
      pageIndex: 1,
      tariffEntityType: "public_standarts",
      types: ["REGIONAL", "MUNICIPAL"],
    });

    searchDataArr = response.data.items;
    let filterSearchDataArr = [];

    filterSearchDataArr = searchDataArr.filter(
      (item) =>
        (item.seasonalityType === null ||
          item.seasonalityType.name === season) &&
        item.familiesNumber.number === people &&
        item.persons[0].name ===
          "Собственники жилых помещений в многоквартирных домах, которые в соответствии с требованиями ЖК РФ обязаны вносить взносы на капитальный ремонт"
    );

    cases = filterSearchDataArr[0];

    return cases;
  } catch (e) {
    console.error(e);
  }
};

module.exports = { search };
