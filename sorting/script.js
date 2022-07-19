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
            return a[fieldName].localeCompare(b[fieldName]);

        }

        return a[fieldName] - b[fieldName]
    });
};

Array.prototype.include = function(fieldName, value) {
    return this.filter((el) => el[fieldName] === value);
};

Array.prototype.exclude = function (fieldName, value) {
    return this.filter((el) => el[fieldName] !== value);
}

async function getData() {
    const response = await fetch("data.json");
    return await response.json();
}

getData().then((data) => {
      let checkedData = data;

      const condition = {
          include: [{ name: 'John' }, { name: 'Mike' }],
          sortBy: ['rating'],
          exclude: [{ name: 'John'}]
      };

        Object.keys(condition).forEach((conditionRule) => {
            let tempData = [];
            condition[conditionRule].forEach((item) => {
                console.log('typeof item', typeof item)
                if (typeof item === 'string') {
                    checkedData = checkedData[conditionRule](item);
                } else {
                    checkedData = checkedData[conditionRule](Object.keys(item)[0], item[Object.keys(item)[0]]);
                }
            });
            checkedData = tempData;
        })
        console.log('checkedData', JSON.stringify(checkedData));
      // if (condition.sortBy) {
      //     condition.sort_by.forEach((item) => {
      //         checkedData = checkedData.sortBy(item);
      //     })
      // }
      //
      // if (condition.include) {
      //     condition.include.forEach((item) => {
      //         checkedData = checkedData.include(Object.keys(item)[0], item[Object.keys(item)[0]]);
      //     })
      // }
      //
      // if (condition.exclude) {
      //   condition.exclude.forEach((item) => {
      //       checkedData = checkedData.exclude(Object.keys(item)[0], item[Object.keys(item)[0]]);
      //   })
      // }
}
);





