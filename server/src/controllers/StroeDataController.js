// // import mongoose from 'mongoose';
// import sequelize from 'sequelize';
// import { Decimal } from 'decimal.js';
// import Users from '../data/models/mongo/UsersSchema';
// import StoresMongo from '../data/models/mongo/Stores';
// import ConstantMongo from '../data/models/mongo/Constant';

// const dataController = {
//   init: () => {
//     dataController.initUserTable();
//     // StroeDataController.initStoreDataTable();
//     // StroeDataController.initStoresTable();
//     // StroeDataController.insertConstantTable();
//   },
//   initUserTable: () => {
//     let totalDataNum = 0;
//     Users.findOne({}, {}, { sort: { 'orderDate': -1 } }, (error, storeData) => {
//     }
//   }
//   // initStoreDataTable: () => {
//   //   // find lastest record in mongodb
//   //   let totalDataNum = 0;
//   //   StoreDataMongo.findOne({}, {}, { sort: { 'orderDate': -1 } }, (error, storeData) => {
//   //     if (storeData) {
//   //       // append new records
//   //       StoreDataSchema.findAll({
//   //         where: {
//   //           orderDate: {
//   //             [sequelize.Op.gt]: storeData.orderDate
//   //           }
//   //         },
//   //         raw: true
//   //       }).then(storeDataList => {
//   //         StoreDataMongo.insertMany(storeDataList, (error, docs) => {
//   //           if (error) console.log(error);
//   //         });
//   //       })
//   //     } else {
//   //       // sync all records from mssql
//   //       StoreDataSchema.count({}).then(count => {
//   //         let offset = 0, limit = 50000, row = 50000;
//   //         // let offset = 0, limit = 1, row = 1;
//   //         totalDataNum = count;
//   //         // totalDataNum = 3;
//   //         const loopInsert = () => {
//   //           if (offset < totalDataNum) {
//   //             StoreDataSchema.findAll({
//   //               raw: true,
//   //               limit,
//   //               offset
//   //             }).then(storeDataList => {
//   //               // console.log(storeDataList)
//   //               StoreDataMongo.insertMany(storeDataList, (error, docs) => {
//   //                 error ? console.log(error) : loopInsert();
//   //               });
//   //             });
//   //             offset += row;
//   //             // limit += row;
//   //             console.log(offset)
//   //           }
//   //         }
//   //         loopInsert();
//   //       })
//   //       // StoreDataSchema.findAll({
//   //       //   raw: true
//   //       // }).then(storeDataList => {
//   //       //   // console.log(storeDataList);
//   //       //   StoreDataMongo.insertMany(storeDataList, (error, docs) => {
//   //       //     if (error) console.log(error);
//   //       //   });
//   //       // });
//   //     }
//   //   });
//   // },
//   // initStoresTable: () => {
//   //   // find lastest record in mongodb
//   //   StoresMongo.findOne({}, {}, { sort: { 'updateTime': -1 } }, (error, store) => {
//   //     // console.log(store)
//   //     if (store) {
//   //       // append new records
//   //       StoresSchema.findAll({
//   //         where: {
//   //           updateTime: {
//   //             [sequelize.Op.gt]: store.updateTime
//   //           }
//   //         },
//   //         raw: true
//   //       }).then(storesList => {
//   //         storesList.forEach(store => {
//   //           StoresMongo.updateMany({ storeNo: store.storeNo }, {}, { upsert: true }, (error, docs) => {
//   //             if (error) console.log(error);
//   //           });
//   //         })
//   //       })
//   //     } else {
//   //       // sync all records from mssql
//   //       StoresSchema.findAll({
//   //         raw: true
//   //       }).then(storesList => {
//   //         // console.log(storesList);
//   //         StoresMongo.insertMany(storesList, (error, docs) => {
//   //           if (error) console.log(error);
//   //         });
//   //       });
//   //     }
//   //   });
//   // },
//   insertConstantTable: () => {
//     const constantList = [
//       { name: 'pmpCapacity', value: 90.0, desc: 'PM一个比萨完成时间(秒)' },
//       { name: 'pmsCapacity', value: 30.0, desc: 'PM一个副食完成时间(秒)' },
//       { name: 'ctpCapacity', value: 30.0, desc: 'CT一个比萨完成时间(秒)' },
//       { name: 'ctsCapacity', value: 30.0, desc: 'CT一个副食完成时间(秒)' },
//       { name: 'csrCapacity', value: 20.0, desc: 'CSR小时接单数' },
//       { name: 'drinkCapacity', value: 30.0, desc: '一个饮料完成时间(秒)' },
//       { name: 'pickCapacity', value: 15.0, desc: '打包一个产品完成时间(秒)' },
//       { name: 'deliveryCapacity', value: 3.0, desc: 'Delivery小时产能' },
//       { name: 'outsideCapacity', value: 20.0, desc: '小时外场服务产能' },
//       { name: 'ovenCapacity', value: 50.0, desc: '烤炉小时产能(个)' }
//     ]
//     constantList.forEach((constant) => {
//       ConstantMongo.create(constant, (error, docs) => {
//         if (error) console.log(error);
//       });
//     })
    
//   },
  
//   getPerHourResourceData: (constantData, perHourData) => {
//     const HOUR = 60 * 60;
//     let totalPeoples = 0,
//       csrPeoples = Decimal.div(
//         // store orders + call orders
//         Decimal.add(
//           Decimal.mul(
//             perHourData.tc,
//             Decimal.div(perHourData.storePercent, 100)
//           ),
//           Decimal.mul(
//             perHourData.tc,
//             Decimal.div(perHourData.callPercent, 100)
//           )
//         ),
//         constantData.csrCapacity
//       ).toFixed(2),

//       pmPeoples = Decimal.div(
//         perHourData.tc,
//         Decimal.div(HOUR,
//           Decimal.add(
//             Decimal.mul(constantData.pmsCapacity, perHourData.avgSideFoodQty),
//             Decimal.mul(constantData.pmpCapacity, perHourData.avgPizzaQty)
//           )
//         )
//       ).toFixed(2),

//       ctPeoples = Decimal.div(
//         perHourData.tc,
//         Decimal.div(HOUR,
//           Decimal.add(
//             Decimal.mul(constantData.ctsCapacity, perHourData.avgSideFoodQty),
//             Decimal.mul(constantData.ctpCapacity, perHourData.avgPizzaQty)
//           )
//         )
//       ).toFixed(2),

//       deliveryPeoples = Decimal.div(
//         Decimal.mul(
//           perHourData.tc,
//           Decimal.div(perHourData.deliveryPercent, 100)
//         ),
//         constantData.deliveryCapacity
//       ).toFixed(2),

//       outFieldPeoples = Decimal.div(
//         Decimal.sub(
//           perHourData.tc,
//           Decimal.mul(
//             perHourData.tc,
//             Decimal.div(perHourData.deliveryPercent, 100)
//           )
//         ),
//         constantData.outsideCapacity
//       ).toFixed(2);
//     totalPeoples = new Decimal(csrPeoples).plus(pmPeoples).plus(ctPeoples).plus(deliveryPeoples).plus(outFieldPeoples).toFixed(2);
//     totalPeoples = totalPeoples > 2 ? Decimal.ceil(totalPeoples).toFixed(2) : 2;
//     // console.info(`totalPeoples:${totalPeoples} = csrPeoples:${csrPeoples} + pmPeoples:${pmPeoples} + ctPeoples:${ctPeoples} + deliveryPeoples:${deliveryPeoples} + outFieldPeoples:${outFieldPeoples}`);
//     return { totalPeoples, csrPeoples, pmPeoples, ctPeoples, deliveryPeoples, outFieldPeoples };
//   },
//   getDateOfLastWeek: (date) => {
//     return new Date(new Date(date).setTime(new Date(date).getTime() - (7 * 24 * 60 * 60 * 1000))).toISOString().split('T')[0]
//   }
// }

// export default StroeDataController;