import axiosInstance from './axios-instance';

export const QuestService = {
  getToken() {
    return localStorage.getItem('accessToken');
  },

  getHeaders() {
    const token = this.getToken(); // Отримуємо токен
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  },

  async saveQuest(questData) {
    try {
      // Transform the questions data into the required format
      const formattedTasks = Object.entries(questData.questions || {}).map(([levelId, questions]) => {
        return questions.map((question, index) => {
          // Base task structure that matches API requirements
          const baseTask = {
            title: question.question || `Question ${index + 1}`,
            questionType: 0,
            order: parseInt(levelId),
            taskOptions: [],
            taskWrite: {
              answer: ""
            },
            taskImage: {
              image: "",
              answerX1: 0,
              answerY1: 0,
              answerX2: 0,
              answerY2: 0
            },
            mediaFiles: []
          };
  
          // Set specific fields based on question type
          switch (question.type) {
            case 'test':
              baseTask.questionType = 0;
              baseTask.taskOptions = question.options.map((optionText, idx) => ({
                optionText: optionText || "",
                isCorrect: idx === question.correctOption
              }));
              break;
  
            case 'open':
              baseTask.questionType = 1;
              baseTask.taskWrite = {
                answer: question.answer || ""
              };
              break;
  
            case 'image':
              baseTask.questionType = 2;
              baseTask.taskImage = {
                image: question.image || "",
                answerX1: question.area?.x1 || 0,
                answerY1: question.area?.y1 || 0,
                answerX2: question.area?.x2 || 0,
                answerY2: question.area?.y2 || 0
              };
              break;
          }
  
          return baseTask;
        });
      }).flat();
  
      // Construct the exact request body structure required by the API
      const requestBody = {
        questDTO: {
          Title: questData.questName || "Default Quest Title", // Змінено title на Title
          description: questData.legend || "",
          timeLimit: parseInt(questData.timeLimit) || 0,
          poster: "", // Empty string for now since it's not handled in this version
          isPublished: true,
          tasks: formattedTasks
        }
      };
  
      // Make the request with headers
      const response = await axiosInstance.post('/api/quest-constructor/save', requestBody, {
        headers: this.getHeaders() // Передаємо заголовки
      });
      return response.data;
  
    } catch (error) {
      console.error('Error in saveQuest:', error);
      throw error;
    }
  }
};