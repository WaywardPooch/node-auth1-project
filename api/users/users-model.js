const db = require("./../../data/db-config");

// resolves to an ARRAY with all users, each user having { user_id, username }
const find = async () => {
  const users = await db("users");
  return users.map(user => {
    return {
      user_id: user.user_id,
      username: user.username
    };
  });
};

// resolves to an ARRAY with all users that match the filter condition
const findBy = (filter) => {

};

// resolves to the user { user_id, username } with the given user_id
const findById = (user_id) => {

};

// resolves to the newly inserted user { user_id, username }
const add = (user) => {

};

// Don't forget to add these to the `exports` object so they can be required in other modules
module.exports = {
  find,
  findBy,
  findById,
  add
};
