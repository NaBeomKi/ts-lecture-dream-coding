{
  class NetworkClient {
    tryConnect(): void {
      throw new Error("no network!");
    }
  }

  class UserService {
    constructor(private client: NetworkClient) {}

    login() {
      this.client.tryConnect();
    }
  }

  class App {
    constructor(private userService: UserService) {}

    run() {
      try {
        this.userService.login();
      } catch (error) {
        // Show dialog to user
      }
      // 에러가 발생했을때 에러를 처리할 수 있는 곳에서 try-catch를 하는 것이 낫다.
    }
  }

  const client = new NetworkClient();
  const service = new UserService(client);
  const app = new App(service);
  app.run();
}
