// src/services/api/websocket.service.js
export class WebSocketService {
    constructor() {
      this.ws = null;
      this.reconnectAttempts = 0;
      this.maxReconnectAttempts = 5;
    }
  
    connect() {
      return new Promise((resolve, reject) => {
        this.ws = new WebSocket('ws://localhost:8080/ws/quest');
  
        this.ws.onopen = () => {
          console.log('WebSocket з\'єднання встановлено');
          this.reconnectAttempts = 0;
          resolve();
        };
  
        this.ws.onclose = () => {
          console.log('WebSocket з\'єднання закрито');
          this.tryReconnect();
        };
  
        this.ws.onerror = (error) => {
          console.error('WebSocket помилка:', error);
          reject(error);
        };
  
        this.ws.onmessage = (event) => {
          const data = JSON.parse(event.data);
          // Обробка отриманих даних
          this.handleMessage(data);
        };
      });
    }
  
    disconnect() {
      if (this.ws) {
        this.ws.close();
      }
    }
  
    tryReconnect() {
      if (this.reconnectAttempts < this.maxReconnectAttempts) {
        this.reconnectAttempts++;
        setTimeout(() => {
          console.log(`Спроба переп'єднання ${this.reconnectAttempts}/${this.maxReconnectAttempts}`);
          this.connect();
        }, 5000);
      }
    }
  
    handleMessage(data) {
      // Тут можна додати логіку обробки різних типів повідомлень
      console.log('Отримано повідомлення:', data);
    }
  
    sendMessage(message) {
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify(message));
      } else {
        console.error('WebSocket не підключений');
      }
    }
  }