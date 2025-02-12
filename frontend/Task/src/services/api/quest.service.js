import axiosInstance from './axios-instance';

export const QuestService = {
  getToken() {
    return localStorage.getItem('accessToken');
  },

  getHeaders() {
    const token = this.getToken();
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'multipart/form-data' // Змінено на multipart/form-data
    };
  },

  async saveQuest(questData) {
    try {
      // Створюємо об'єкт FormData для multipart/form-data
      const formData = new FormData();

      // Додаємо основні поля
      formData.append('Title', questData.questName || "Default Quest Title");
      formData.append('Description', questData.legend || "");
      formData.append('TimeLimit', parseInt(questData.timeLimit) || 0);
      formData.append('IsPublished', true);

      // Додаємо завдання (Tasks)
      const formattedTasks = Object.entries(questData.questions || {}).map(([levelId, questions]) => {
        return questions.map((question, index) => {
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

      // Додаємо завдання до форми
      formData.append('Tasks', JSON.stringify(formattedTasks));

      // Додаємо файли (наприклад, зображення для завдань)
      if (questData.questPoster) {
        formData.append('Poster', questData.questPoster);
      }

      // Відправляємо запит
      const response = await axiosInstance.post('/api/quest-constructor/save', formData, {
        headers: this.getHeaders()
      });

      return response.data;

    } catch (error) {
      console.error('Error in saveQuest:', error);
      throw error;
    }
  }
};