import React from 'react';

import SearchCardStyled from './SearchCard.styled';
import Image from '../image/Image';
import BlogDetail from '../blogDetail/BlogDetail';

export interface Props {
  className?: string;
  type: string;
  title: string;
  text?: string;
  uri: string;
  imageUri: string;
  imageAlt: string;
  date?: string;
  readTime?: string;
  price?: number[];
}

const SearchCard = ({
  className,
  date,
  imageAlt,
  imageUri,
  price,
  readTime,
  text,
  title,
  type,
  uri,
}: Props) => {
  const SearchCard = (type: string) => {
    switch (type) {
      case 'blog':
        return (
          <>
            <Image
              path={imageUri}
              alt={imageAlt}
              className="search-card__image"
            />
            <div className="search-card__content">
              <h2>{title}</h2>
              <p className="search-card__text">{text}</p>
              <BlogDetail
                className="search-card__detail"
                date={date}
                readTime={readTime}
              />
            </div>
          </>
        );
      case 'product': {
        const priceText = price?.length > 1 ? `${Math.min(...price)}+` : price;
        return (
          <>
            <Image
              path={imageUri}
              alt={imageAlt}
              className="search-card__image"
            />
            <div className="search-card__content">
              <h2>{title}</h2>
              <span className="search-card__detail">£{priceText}</span>
              <p className="search-card__text">{text}</p>
            </div>
          </>
        );
      }
      default:
        return (
          <div className="search-card__content">
            <h2>{title}</h2>
            <p className="search-card__text">{text}</p>
          </div>
        );
    }
  };
  return (
    <SearchCardStyled
      className={className}
      type={type}
      title={title}
      href={uri}
    >
      {SearchCard(type)}
    </SearchCardStyled>
  );
};

export default SearchCard;
