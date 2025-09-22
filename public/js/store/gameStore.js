class GameStore {
    static #instance = null;
    #state = {};
    static #allowConstruction = false;
    listeners = [];
  
    constructor(character = null, weapon = null, clothes = null, gameProgress = {}, settings = {}) {
      if (!GameStore.#allowConstruction) {
        throw new Error("Use GameStore.getInstance() instead of 'new GameStore()'")
      }
  
      GameStore.#instance = this;
  
      this.#state = {
        character,
        weapon,     
        clothes,
        gameProgress,
        settings
      };
    }
 }
