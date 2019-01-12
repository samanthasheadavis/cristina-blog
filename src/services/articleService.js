import { firebase } from ".";

export const AddArticle = async articleObj => {
  return firebase.db
    .collection("articles")
    .add({
      title: articleObj.title,
      author: articleObj.author,
      subtitle: articleObj.subtitle,
      language: articleObj.language,
      body: articleObj.body,
      created_at: new Date(),
      hidden: articleObj.hidden,
      tags: articleObj.tags
      // coverPhoto: articleObj.coverPhoto
    })
    .then(function(docRef) {
      return docRef.id;
    })
    .catch(function(error) {
      return error;
    });
};

const uploadCoverPhoto = async file => {
  // const ref = firebase.db.ref().child(`images/${file.name}`);
  // const snapshot = await ref.put(file);
  // console.log("done");
  // console.log(snapshot);
};

export const UpdateArticle = (articleObj, id) => {
  return uploadCoverPhoto(articleObj.coverPhoto);
  // return firebase.db
  //   .collection("articles")
  //   .doc(id)
  //   .set(
  //     {
  //       title: articleObj.title,
  //       author: articleObj.author,
  //       subtitle: articleObj.subtitle,
  //       language: articleObj.language,
  //       body: articleObj.body,
  //       updated_at: new Date(),
  //       hidden: articleObj.hidden,
  //       tags: articleObj.tags
  //     },
  //     { merge: true }
  //   )
  //   .then(docRef => {
  //     return docRef.id;
  //   })
  //   .catch(error => {
  //     return error;
  //   });
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
