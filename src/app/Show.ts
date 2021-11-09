
export interface Show {
        name: '',
        summary: '',
        image : {
          medium : ''
        },
        rating : {
          average: ''
        }
}
export interface Showdetails {
  showDetails: {
    name: '',
    genres: [],
    image : {
      medium : ''
    },
    rating : {
      average: ''
    },
    network: {
      name: '',
      country : {
        name : ''
      }
    },
    schedule: {
      days: []
    }
  };
}