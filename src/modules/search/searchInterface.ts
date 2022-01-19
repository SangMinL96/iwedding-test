export interface MdKeywordItf {
  no: number;
  search_word: string;
}

export interface PopularKeywordItf {
  search_count_date: Date;
  search_word: string;
  search_word_rank: number;
  search_word_status: number;
}


export interface metaDataItf {
    search_count_date: Date;
    search_word: string;
    search_word_rank: number;
    search_word_status: number;
  }
  