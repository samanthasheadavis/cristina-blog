import { firebase } from ".";

export const AddArticle = articleObj => {
  return firebase.db
    .collection("articles")
    .add({
      title: articleObj.title,
      author: articleObj.author,
      body: articleObj.body,
      created_at: new Date()
    })
    .then(function(docRef) {
      return docRef.id;
    })
    .catch(function(error) {
      return error;
    });
};
