import { firebase } from ".";

export const AddArticle = articleObj => {
  return firebase.db
    .collection("articles")
    .add({
      title: articleObj.title,
      author: articleObj.author,
      subtitle: articleObj.subtitle,
      language: articleObj.language,
      body: articleObj.body,
      created_at: new Date(),
      hidden: articleObj.hidden
    })
    .then(function(docRef) {
      return docRef.id;
    })
    .catch(function(error) {
      return error;
    });
};

export const UpdateArticle = (articleObj, id) => {
  return firebase.db
    .collection("articles")
    .doc(id)
    .set(
      {
        title: articleObj.title,
        author: articleObj.author,
        subtitle: articleObj.subtitle,
        language: articleObj.language,
        body: articleObj.body,
        updated_at: new Date(),
        hidden: articleObj.hidden
      },
      { merge: true }
    )
    .then(docRef => {
      return docRef.id;
    })
    .catch(error => {
      return error;
    });
};

export const DeleteArticle = id => {
  return firebase.db
    .collection("articles")
    .doc(id)
    .delete()
    .then(() => {
      return null;
    })
    .catch(error => {
      return error;
    });
};
