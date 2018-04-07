export default {
  locale: 'en',
  messages: {
    siteTitle: 'MERN Starter Blog',
    addReport: 'Add Report',
    switchLanguage: 'Switch Language',
    twitterMessage: 'We are on Twitter',
    by: 'By',
    deleteReport: 'Delete Report',
    createNewReport: 'Create new report',
    authorName: 'Author\'s Name',
    reportTitle: 'Report Title',
    reportContent: 'Report Content',
    submit: 'Submit',
    comment: `user {name} {value, plural,
    	  =0 {does not have any comments}
    	  =1 {has # comment}
    	  other {has # comments}
    	}`,
    HTMLComment: `user <b style='font-weight: bold'>{name} </b> {value, plural,
    	  =0 {does not have <i style='font-style: italic'>any</i> comments}
    	  =1 {has <i style='font-style: italic'>#</i> comment}
    	  other {has <i style='font-style: italic'>#</i> comments}
    	}`,
    nestedDateComment: `user {name} {value, plural,
    	  =0 {does not have any comments}
    	  =1 {has # comment}
    	  other {has # comments}
    	} as of {date}`,
  },
};
