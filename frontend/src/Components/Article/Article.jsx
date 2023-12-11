import React from 'react';
import { Typography } from '@mui/material';
import './Article.css';

function Article(selectedArticle) {

  if (!selectedArticle) {
    return null;
  }

  return (
    <div className="article">
        <img src={selectedArticle.article.urlToImage} alt={selectedArticle.article.title} />
        <div className='articleDetails'>
        <div>
        <Typography
          fontWeight={100}
          color="rgba(0, 0, 0, 0.582)"
          style={{ alignSelf: "center" }}
        >
          {selectedArticle.article.title}
        </Typography>
        </div>
      <p>{selectedArticle.article.description}</p>
      </div>
    </div>
  );
}

export default Article;
