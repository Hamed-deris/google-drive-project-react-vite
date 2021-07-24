import { action, createStore } from "easy-peasy";

export const store = createStore({
  code: JSON.parse(sessionStorage.getItem("code")),
  token: JSON.parse(sessionStorage.getItem("oauth2Token")),
  codeResponse: JSON.parse(sessionStorage.getItem("codeResponse")),
  toggleView: true,
  allFile: [],
  inserted: [],
  searchedFile: [],
  contextFile: {},

  // action ----------- action -----------  action -----------  action -----------

  setToken: action((state, token) => {
    state.token = token;
  }),

  setCode: action((state, code) => {
    state.code = code;
  }),

  setCodeResponse: action((state, codeResponse) => {
    state.codeResponse = codeResponse;
  }),

  setToggleView: action((state, toggleView) => {
    state.toggleView = toggleView;
  }),

  setAllFile: action((state, allFile) => {
    state.allFile = allFile;
  }),
  pushInserted: action((state, insert) => {
    state.inserted.push(insert);
  }),
  popInserted: action((state, insert) => {
    state.inserted = state.inserted.filter((e) => e.id !== insert.id);
  }),
  setInsertedNull: action((state, insert) => {
    state.inserted = [];
  }),
  setSearchedFile: action((state, searchedFile) => {
    state.searchedFile = searchedFile;
  }),
  setContextFile: action((state, file) => {
    state.contextFile = file;
  }),
});
