const DB_NAME = "testDB";
const STORE_NAME = "userDB";

function openIndexedDB() {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(DB_NAME, 2);

    request.onerror = (e) => {
      reject("IndexedDB 접근 오류", e);
    };

    request.onsuccess = (e) => {
      const db = e.target.result;
      resolve(db);
    };

    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      const objectStore = db.createObjectStore(STORE_NAME, {
        keyPath: "id",
      });
    };
  });
}

export async function addDataToIndexedDB(data) {
  const db = await openIndexedDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const objectStore = transaction.objectStore(STORE_NAME);

    const request = objectStore.put(data);

    request.onsuccess = () => {
      resolve("data added!");
    };

    request.onerror = (e) => {
      console.log("error", e);
    };

    transaction.oncomplete = () => {
      db.close();
    };
  });
}

export async function getDataFromIndexedDB(key) {
  const db = await openIndexedDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readonly");
    const objectStore = transaction.objectStore(STORE_NAME);

    const request = objectStore.get(key);

    request.onsuccess = (e) => {
      const data = e.target.result;
      resolve(data);
    };

    request.onerror = (e) => {
      reject("error", e);
    };

    transaction.oncomplete = () => {
      db.close();
    };
  });
}

export async function deleteDataToIndexedDB(key) {
  const db = await openIndexedDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const objectStore = transaction.objectStore(STORE_NAME);

    const request = objectStore.delete(key);
    console.log(request);
    request.onsuccess = () => {
      resolve("delete ok!");
    };

    request.onerror = (e) => {
      reject("error", e);
    };

    transaction.oncomplete = () => {
      db.close();
    };
  });
}

export async function getAllDataFromIndexedDB() {
  const db = await openIndexedDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readonly");
    const objectStore = transaction.objectStore(STORE_NAME);

    const request = objectStore.getAll();

    request.onsuccess = (e) => {
      const data = e.target.result;
      resolve(data);
    };

    request.onerror = (e) => {
      reject("데이터 조회 중 오류가 발생했습니다.");
    };

    transaction.oncomplete = () => {
      db.close();
    };
  });
}
