export const defaultState = {
  globalData: {},
  selectedCountry: "Worldwide",
  isSelected: false,
  allCountries: [],
  mapCountries: [],
  casesType: "cases",
  tableData: [],
  infoBox: {},
  mapCenter: { lat: 23.512, lng: 80.329 },
  mapZoom: 4.5,
};

const reducer = (state, action) => {
  console.log(state, action);
  switch (action.type) {
    case "FETCH_COUNTRIES":
      return {
        ...state,
      };
    case "FETCH_GLOBAL":
      return {
        ...state,
      };
    case "COUNTRY_CHANGE":
      return {
        ...state,
      };
    case "SET_CASE_TYPES":
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default reducer;
