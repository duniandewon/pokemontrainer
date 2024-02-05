interface ITable {
  id: number;
}

export function localStorageManager<T>(table: string) {
  const isBrowser = typeof window !== "undefined";

  if (!isBrowser) {
    return {
      getAll() {
        return [];
      },
      insert<T>(data: T) {},
      update<T>(id: number, data: T) {},
      remove<T>(id: number) {},
    };
  }

  const setTable = (value: any) => window.localStorage.setItem(table, value);
  const getTable = () => window.localStorage.getItem(table);

  if (!getTable()) {
    setTable(JSON.stringify([]));
  }

  const allLocal = () => JSON.parse(getTable()!);

  return {
    getAll() {
      return allLocal() as T[];
    },

    insert<T>(data: T) {
      const stringified = JSON.stringify([...allLocal(), data]);
      setTable(stringified);
    },

    update<T extends ITable>(id: number, data: T) {
      const items = this.getAll() as any[];

      const updatedItems = items.map((it: ITable) => {
        if (it.id === id) {
          return { ...it, ...data };
        }

        return it;
      }) as T[];

      setTable(updatedItems);
    },

    remove<T extends ITable>(id: number) {
      const items = this.getAll() as any[];

      const filteredItems = items.filter((it: ITable) => it.id !== id) as T[];

      setTable(filteredItems);
    },
  };
}
