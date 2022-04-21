const axios = require("axios");
//Post запрос
const search = async (city, people, season) => {
  try {
    url =
      "https://dom.gosuslugi.ru/tariff/api/rest/services/public-standards/search";
    const response = await axios.post(url, {
      allOktmoLevels: false,
      elementsPerPage: 21,
      fetchAnnulled: false,
      kinds: ["COST"],
      oktmoCodes: [city],
      pageIndex: 1,
      tariffEntityType: "public_standarts",
      types: ["REGIONAL", "MUNICIPAL"],
    });

    searchDataArr = response.data.items;
    filterSearchDataArr = searchDataArr.filter(
      (item) =>
        item.seasonalityType.name === season &&
        item.familiesNumber.number === people
    );
    cases = filterSearchDataArr[0];

    return cases;
  } catch (e) {
    console.error(e);
  }
};

module.exports = { search };
