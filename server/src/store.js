// @ts-check
const db = { flags: { newNav: { enabled: false }, betaSearch: { enabled: true } } };
export const getAll = () => db.flags;
export const setFlag = (key, enabled) => { db.flags[key] = { enabled: !!enabled }; return db.flags[key]; };
