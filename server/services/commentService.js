const Comments = require('../models/comments');

async function create(comment) {
    return Comments.create(comment);
}


async function destroy(id) {
    return Comments.findOneAndDelete({ _id: id});
}

module.exports = { create, destroy };