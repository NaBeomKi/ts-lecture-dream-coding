{
  class TimeoutError extends Error {}

  class OfflineError extends Error {}

  class NetworkClient {
    tryConnect(): void {
      throw new OfflineError("no network!");
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
        if (error instanceof OfflineError) {
          // tsconfig에서 target을 es6이상으로 하면 가능하지만,
          // 그 이전 버전의 경우 TypeScript에서 구현된 catch()에는 어떠한 타입정보도 전달되지 않아서 instanceOf를 사용할 수 없음
        }
      }
      // 에러가 발생했을때 에러를 처리할 수 있는 곳에서 try-catch를 하는 것이 낫다.
    }
  }

  const client = new NetworkClient();
  const service = new UserService(client);
  const app = new App(service);
  app.run();
}
