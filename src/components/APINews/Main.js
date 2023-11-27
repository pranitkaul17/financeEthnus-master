import React, { useState } from 'react';
import News from './News';
import axios from 'axios';

const Main = () => {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchNews = async () => {
    try {
      const response = await axios.get(`https://newsapi.org/v2/everything?q=finance&apiKey=22b4c4e6191f45abb125735bb94a1c2d&page=${currentPage}`);
      console.log(response.data.articles[0].url);
      // Set the new articles, replacing the existing ones
      setArticles(response.data.articles.slice(0, 6));
      setCurrentPage(currentPage + 1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='Master'>
      {articles.map((article, index) => (
        <News key={index} title={article.title} author={article.author} sourceName={article.source.name} url={article.url}/>
      ))}
      <button onClick={fetchNews}>Fetch</button>
    </div>
  );
};

export default Main;
