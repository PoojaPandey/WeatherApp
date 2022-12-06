import update from 'immutability-helper';

export default class shared {
  static myInstance = null;
  questionsDta = '';
  questionList = [];
  user = '';
  /**
   * @returns {shared}
   */
  static getInstance() {
    if (shared.myInstance == null) {
      shared.myInstance = new shared();
    }

    return this.myInstance;
  }

  getQuestionsData() {
    return this.questionsDta;
  }

  setQuestionData(data) {
    this.questionsDta = data;
  }

  setSelectedQuestion(questionData) {
    if (this.questionList.length === 0) {
      this.questionList.push(questionData);
    } else {
      let index = -1;
      index = this.questionList.findIndex(
        data => data.question === questionData.question,
      );
      if (index !== -1) {
        const updatedQuestionList = update(this.questionList, {
          $splice: [[index, 1, questionData]],
        });
        this.questionList = updatedQuestionList;
      } else {
        this.questionList.push(questionData);
      }
    }
  }

  getSelectedQuestion() {
    return this.questionList;
  }

  setUser(user) {
    this.user = user;
  }

  getUser() {
    return this.user;
  }

  resetData() {
    this.questionList = [];
  }
}
