import { ProductCategoryValue } from '@modules/product/product.interface';
import { fetchRecommendSearchKeyword } from '@modules/product/ProductAPI';
import { useEffect, useState } from 'react';
import { useCategory } from './useCategory';

export const useRecommendKeywords = () => {
  const { category } = useCategory();
  const [recommendKeywords, setRecommendKeywords] = useState<string[]>([]);
  useEffect(() => {
    const fetch = async () => {
      if (category) {
        switch (category) {
          case ProductCategoryValue.STUDIO:
            setRecommendKeywords(studioTags);
            break;
          case ProductCategoryValue.DRESS:
            setRecommendKeywords(dressTags);
            break;
          case ProductCategoryValue.MAKEUP:
            setRecommendKeywords(makeupTags);
            break;
          default:
            try {
              const { data } = await fetchRecommendSearchKeyword(category);
              if (data.length) {
                setRecommendKeywords(data);
              }
            } catch (error) {
              console.log('Error Fetching Recommend-Search-Keywords', error);
            }
        }
      }
    };

    fetch();
  }, [category]);

  return recommendKeywords;
};

// 아래 세개는 민수과장 요청으로 하드코딩으로 넣음.
const studioTags = ['토탈촬영', '세미촬영', '본식스냅', '하이엔드'];
const dressTags = ['리허설+본식', '본식만', '리허설만', '수입드레스샵', '하이엔드'];
const makeupTags = ['리허설+본식', '본식만', '리허설만'];
