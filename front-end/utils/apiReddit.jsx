import { axiosApiInstance } from '../axios.config';
import { redditUrl } from '../redditUrl';

export async function userInfo() {
  await axiosApiInstance
    .get(`${redditUrl}api/v1/me`)
    .then((data) => data)
    .catch((error) => error);
}

export async function subRedditInfo(subRedditName) {
  await axiosApiInstance
    .get(`${redditUrl}r/${subRedditName}/about`)
    .then((data) => data)
    .catch((error) => error);
}

export async function filter(filterInUrl) {
  await axiosApiInstance
    .get(redditUrl + filterInUrl)
    .then((data) => data)
    .catch((error) => error);
}

export async function search(input) {
  await axiosApiInstance
    .post(`${redditUrl}api/search_subreddits/?query=${input}`)
    .then((data) => data)
    .catch((error) => error);
}

export async function subscribe(subRedditName) {
  await axiosApiInstance
    .post(`${redditUrl}api/subscribe/?query=${subRedditName}`)
    .then((data) => data)
    .catch((error) => error);
}

export async function comments(subRedditName, idArticle) {
  await axiosApiInstance
    .get(`${redditUrl}r/${subRedditName}/comments/${idArticle}`)
    .then((data) => data)
    .catch((error) => error);
}

export async function vote(name, count) {
  await axiosApiInstance
    .post(`${redditUrl}api/vote?id=${name}&dir=${count}`)
    .then((data) => data)
    .catch((error) => error);
}

export async function createComment(text, parentId) {
  await axiosApiInstance
    .post(`${redditUrl}api/comment?text=${text}&thing_id=${parentId}`)
    .then((data) => data)
    .catch((error) => error);
}
