import React, { useEffect, useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';

import ArticleForm from '../../components/articleForm';
import useFetch from '../../hooks/useFetch';
import { CurrentUserContext } from '../../contexts/currentUser';

const EditArticle = ({match}) => {
  const [currentUserState] = useContext(CurrentUserContext);
  const slug = match.params.slug;
  const apiUrl = `/articles/${slug}`;
  const [{response: fetchArticleResponse}, doFetchArticle] = useFetch(apiUrl);
  const [
    {response: updateArticleResponse, error: updateArticleError},
    doUpdateArticle
  ] = useFetch(apiUrl);
  const [initialValues, setInitialValues] = useState(null);
  const [isSuccessfulSubmit, setIsSuccessfulSubmit] = useState(false);

  const handleSubmit = article => {
    console.log('handleSubmit', article);
    doUpdateArticle({
      method: 'put',
      data: {
        article
      }
    })
  };

  useEffect(() => {
    doFetchArticle()
  }, [doFetchArticle]);

  useEffect(() => {
    if (!fetchArticleResponse) {
      return
    }

    setInitialValues({
      title: fetchArticleResponse.article.title,
      description: fetchArticleResponse.article.description,
      body: fetchArticleResponse.article.body,
      tagList: fetchArticleResponse.article.tagList
    })
  }, [fetchArticleResponse]);

  useEffect(() => {
    if (!updateArticleResponse) {
      return
    }

    setIsSuccessfulSubmit(true)
  }, [updateArticleResponse]);

  if (currentUserState.isLoggedIn === false) {
    return <Redirect to='/' />
  }

  if (isSuccessfulSubmit) {
    return <Redirect to={`/articles/${slug}`} />
  }

  return (
    <ArticleForm
      onSubmit={handleSubmit}
      errors={(updateArticleError && updateArticleError.errors) || {}}
      initialValues={initialValues}
    />
  )
};

export default EditArticle;
