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

Array.prototype.sortBy = function(conditions) {
    let tempArr = this;

    conditions.forEach((condition) => {
        tempArr = tempArr.sort((a, b) => {
            if (typeof a[condition] === 'string') {
                return a[condition].localeCompare(b[condition]);

            }

            return a[condition] - b[condition]
        });
    })

    return tempArr;
};

Array.prototype.include = function(conditions) {
    let tempArr = [];
    console.log('conditions', conditions);

    conditions.forEach((condition) => {
        const fieldName = Object.keys(condition)[0];
        const value = condition[Object.keys(condition)[0]];
        const filteredByCondition = this.filter((el) => el[fieldName] === value);

        tempArr = tempArr.concat(filteredByCondition);
    })

    console.log('tempArr1', tempArr);

    return tempArr;
};

Array.prototype.exclude = function (conditions) {
    let tempArr = this;

    conditions.forEach((condition) => {
        const fieldName = Object.keys(condition)[0];
        const value = condition[Object.keys(condition)[0]];

        tempArr = tempArr.filter((el) => el[fieldName] !== value);
    })

    return tempArr;
}

async function getData() {
    const response = await fetch("data.json");
    return await response.json();
}

getData().then((data) => {
      let checkedData = data;

      const condition = {
          include: [{ name: 'John' }, { name: 'Greg' }],
          sortBy: ['rating', 'name'],
          exclude: []
      };

        Object.keys(condition).forEach((conditionRule) => {
            checkedData = checkedData[conditionRule](condition[conditionRule]);
            // condition[conditionRule].forEach((item) => {
            //     console.log('typeof item', typeof item)
            //     if (typeof item === 'string') {
            //         checkedData = checkedData[conditionRule](item);
            //     } else {
            //         checkedData = checkedData[conditionRule](item);
                //        // checkedData = checkedData[conditionRule](Object.keys(item)[0], item[Object.keys(item)[0]]);
            //     }
            // });
        })
        console.log('checkedData', checkedData);
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





