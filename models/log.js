'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Log extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        targetKey: 'id',
        foreignKey: 'userId',
      });
    }
  }
  Log.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      logged_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Log',
      tableName: 'logs',
      timestamps: false,
    }
  );
  return Log;
};
// const Sequelize = require('sequelize');
// class Log extends Sequelize.Model {
//   static initiate(sequelize) {
//     Log.init(
//       {
//         id: {
//           type: Sequelize.INTEGER,
//           allowNull: false,
//           primaryKey: true,
//           autoIncrement: true,
//         },
//         // 전화번호를 문자열롶 설정한 이유는 국가 코드 등을 고려한것.
//         logged_at: {
//           type: Sequelize.DATE,
//           allowNull: false,
//         },
//       },
//       {
//         // super.init 메서드의 두번째 인수가 테이블 자체에 대한 옵션
//         sequelize, // static init 메서드의 매개변수와 연결되는 옵션 db.sequelize 객체를 넣어야함
//         timestamps: false, // 속성값이 true 라면 시퀄라이즈는 createdAt 과 updatedAt 컬럼을 추가해야함.
//         //각각 로우가 생성될때와 수정될때의 시간이 자동으로 입력됨. 자동으로 날짜 컬럼이 추가되는 기능
//         underscored: false, // 시퀄라이즈는 기본적으로 테이블명과 컬럼명을 카멜케이스로 적음(created_at 을 createdAt 으로 표기)
//         // 이를 스네이크 케이스 (createdAt을 created_at 으로 표기)로 바꿔줌
//         modelName: 'Log', // 모델 이름을 설정할 수 있음.
//         tableName: 'logs', // 실제 데이터베이스의 테이블 이름이 됨.
//         //기본적으로 모델이름의 소문자 및 복수형으로 해야함.
//         paranoid: false, //true 로 설정시 deletedAt 이라는 컬럼이 생김.
//         // 로우를 삭제할때 완전히 지워지지 않고 deletedAt 에 지운 시각이 기록됨.
//         // 나중에 로우를 복원해야할 상황이 있다면 true 로 설정
//       }
//     );
//   }
//   static associate(db) {} //static associate 메서드에는 다른 모델과의 관계 다른 모델들과 연결할때 사용
// }
//
// module.exports = Log;
// //
// // module.exports = class Log extends Sequelize.Model {
// //   static init(sequelize) {
// //     // init 메서드에는 테이블에 대한 설정
// //     return super.init(
// //       {
// //         // super.init메서드의 첫번째 인수가 테이블 컬럼에 대한 설정
// //         id: {
// //           type: Sequelize.INTEGER,
// //           allowNull: false,
// //           primaryKey: true,
// //           autoIncrement: true,
// //         },
// //         // 전화번호를 문자열롶 설정한 이유는 국가 코드 등을 고려한것.
// //         logged_at: {
// //           type: Sequelize.DATE,
// //           allowNull: false,
// //         },
// //       },
// //       {
// //         // super.init 메서드의 두번째 인수가 테이블 자체에 대한 옵션
// //         sequelize, // static init 메서드의 매개변수와 연결되는 옵션 db.sequelize 객체를 넣어야함
// //         timestamps: false, // 속성값이 true 라면 시퀄라이즈는 createdAt 과 updatedAt 컬럼을 추가해야함.
// //         //각각 로우가 생성될때와 수정될때의 시간이 자동으로 입력됨. 자동으로 날짜 컬럼이 추가되는 기능
// //         underscored: false, // 시퀄라이즈는 기본적으로 테이블명과 컬럼명을 카멜케이스로 적음(created_at 을 createdAt 으로 표기)
// //         // 이를 스네이크 케이스 (createdAt을 created_at 으로 표기)로 바꿔줌
// //         modelName: 'Log', // 모델 이름을 설정할 수 있음.
// //         tableName: 'logs', // 실제 데이터베이스의 테이블 이름이 됨.
// //         //기본적으로 모델이름의 소문자 및 복수형으로 해야함.
// //         paranoid: false, //true 로 설정시 deletedAt 이라는 컬럼이 생김.
// //         // 로우를 삭제할때 완전히 지워지지 않고 deletedAt 에 지운 시각이 기록됨.
// //         // 나중에 로우를 복원해야할 상황이 있다면 true 로 설정
// //       }
// //     );
// //   }
// //   static associate(db) {} //static associate 메서드에는 다른 모델과의 관계 다른 모델들과 연결할때 사용
// // };
