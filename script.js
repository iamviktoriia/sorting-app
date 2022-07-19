// const sortBy = function (data) {
//     return data.sort((a, b) => a.rating - b.rating);
// };
//
// const include = function (data, name) {
//     return data.filter((el) => el.name === name);
// };
//
// const exclude = function (data, disabled) {
//         return data.filter((el) => el.disabled === disabled);
// }

Array.prototype.sortBy = function(fieldName) {
    return this.sort((a, b) => {
        if (typeof a[fieldName] === 'string') {
            console.log('string');
            return a[fieldName].localeCompare(b[fieldName]);

        }

        console.log('number');
        return a[fieldName] - b[fieldName]
    });
};

Array.prototype.include = function(fieldName, value) {
    console.log('this', this);
    return this.filter((el) => el[fieldName]=== value);
};

Array.prototype.exclude = function (disabled) {
    return this.filter((el) => el.disabled === disabled);
}

async function getData() {
    const response = await fetch("data.json");
    return await response.json();
}

getData().then((data) => {
      let checkedData = data;

      const condition = {
          include: [{name: 'John'}],
          sort_by: ['rating']
      };
      if (condition.sort_by) {
          condition.sort_by.forEach((item) => {
              console.log('item', item);
              checkedData = checkedData.sortBy(item);
          })
      }

      if (condition.include) {
          condition.include.forEach((item) => {
              // console.log('item', item);
              // console.log('fieldName', Object.keys(item)[0]);
              // console.log('item.value', item[Object.keys(item)[0]]);
              checkedData = checkedData.include(Object.keys(item)[0], item[Object.keys(item)[0]]);
          })

      }

      if (condition.exclude) {
          checkedData = checkedData.exclude('John');
      }

    console.log('checkedData', checkedData);
}
);





