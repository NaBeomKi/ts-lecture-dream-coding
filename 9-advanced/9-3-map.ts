{
  type Video = {
    title: string;
    author: string;
    description: string;
  };

  type Optional<T> = {
    [P in keyof T]?: T[P]; // for...in
  };

  type ReadOnly<T> = {
    readonly [P in keyof T]: T[P];
  };

  type VideoOptional = Optional<Video>;

  const videoOp: VideoOptional = {
    title: "hey",
  };

  type Animal = {
    name: string;
    age: number;
  };

  const animal: Optional<Animal> = {
    age: 10,
  };

  animal.name = "dog";

  const videoReadOnly: ReadOnly<Video> = {
    title: "readonly",
    author: "ki",
    description: "lorem isum",
  };

  // videoReadOnly.title = "hahah"; // error

  // type VideoOptional = {
  //   title?: string;
  //   author?: string;
  //   description?: string;
  // };

  // type VideoReadOnly = {
  //   readonly title: string;
  //   readonly author: string;
  //   readonly description: string;
  // };

  // example
  type Nullable<T> = { [P in keyof T]: T[P] | null };
  const videoNullable: Nullable<Video> = {
    title: "nullable",
    author: null,
    description: null,
  };

  type Proxy<T> = {
    get(): T;
    set(value: T): void;
  };

  type Proxify<T> = {
    [P in keyof T]: Proxy<T[P]>;
  };

  function proxify<T extends object>(o: T): Proxify<T> {
    const result = {} as Proxify<T>;
    for (let key in o) {
      let rawValue = o[key];
      result[key] = {
        get: () => rawValue,
        set: (value) => {
          rawValue = value;
        },
      };
    }
    return result;
  }

  let props = { rooms: 4 };
  let proxifiedProps = proxify(props);
  proxifiedProps.rooms.set(5);
  console.log(proxifiedProps.rooms.get()); // output 5
}
