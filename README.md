# Algorithmic_test_task_TypeScript
Sorting and recursive methods

Создал класс для ноды и общий класс. Так же простенький interface для объектов входящего массива. 
Внутри класса TreeStore реализована коллекция.
На моё усмотрение в рамках данной задачки это оптимальное решение, нежели чем хранить данные в массиве или объекте.


На случай если массив будет использован с другими объектами, можно использовать интерфейс ниже для точного соответствия: 

  interface MainInterface {
      id: number | string,
      parent: number | string,
      children?:Node[],
      type?: any,
  };


Ниже строки по желанию можно использовать для быстрой проверки.

  console.log( ts.getAll() );
  console.log( ts.getItem('2') );
  console.log( ts.getChildren('2') );
  console.log( ts.getAllChildren(2) );
  console.log( ts.getAllParents(1) );
